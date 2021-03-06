const nconf = require('nconf');
const cron = require('node-cron');
const puppeteer = require('puppeteer');
const moment = require('moment');
const PushBullet = require('pushbullet');
const { URL } = require('url');
const axios = require('axios').default;

let pusher;

nconf.argv()
  .env({ lowerCase: true })
  .file({ file: '/config/config.json' });

const userEmail = nconf.get('stackoverflow:email');
const userPassword = nconf.get('stackoverflow:password');
const scheduledHourOfDay = nconf.get('scheduledHourOfDay');
const pushbulletApiKey = nconf.get('pushbullet');
const hassInstanceUrl = nconf.get('hassUrl');
const timezone = nconf.get('timezone') || 'Asia/Jerusalem';
const returnUrl = nconf.get('returnUrl') || 'https://stackoverflow.com';
const returnUrlEncoded = encodeURIComponent(returnUrl);
const takeScreenshot = nconf.get('screenshot') || false;

const hassWebhookUrl = hassInstanceUrl ?
  new URL('/api/webhook/visit-stackoverflow', hassInstanceUrl).href :
  null;

if (pushbulletApiKey) {
  pusher = new PushBullet(pushbulletApiKey);
}

(async () => {
  await visitStackOverflow();
})();

cron.schedule(`0 ${ scheduledHourOfDay } * * *`, visitStackOverflow, {
  scheduled: true,
  timezone
});

async function visitStackOverflow() {
  console.log('running stackoverflow task twice a day');

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-gpu',
    ]
  });
  const page = await browser.newPage();
  await page.setViewport({
    height: 700,
    width: 1250
  });

  const loginUrl = 'https://stackoverflow.com/users/login?ssrc=head';
  await page.goto(`${ loginUrl }&returnurl=${ returnUrlEncoded }`);
  await page.type('input#email', userEmail);
  await page.type('input#password', userPassword);
  await page.focus('button#submit-button');
  await page.waitForTimeout(5000);
  await page.click('button#submit-button');
  await page.waitForNavigation();
  await page.waitForTimeout(5000);
  const now = moment().format('YYYY-MM-DD HH[H]');
  const fileName = `${ now }-screenshot.png`;
  let screenshot;
  if (takeScreenshot) {
    screenshot = await page.screenshot({
      path: fileName,
      clip: {
        x: 150,
        y: 150,
        width: 1250 - 150,
        height: 450 - 150
      }
    });
  } else {
    screenshot = await page.screenshot({
      encoding: 'binary',
      clip: {
        x: 150,
        y: 150,
        width: 1250 - 150,
        height: 450 - 150
      }
    });
  }

  const element = await page.$('.days-visited');
  const daysVisited = element ?
    (await page.evaluate(element => element.innerText, element)).trim() :
    'Daily visit';
  const dayVisitedNumber = +daysVisited
    .replace(/Visited \d+ days, /ig, '')
    .replace('consecutive', '')
    .trim();
  const daysLeft = 100 - dayVisitedNumber;

  await browser.close();

  // eslint-disable-next-line no-constant-condition
  if (false && pushbulletApiKey && pusher) {
    pusher.file(
      {},
      screenshot,
      `stackoverflow [${ now }] - ${ daysVisited }`,
      (err, res) => {
        if (err) {
          console.error(err);
          // fail gracefully
          return;
        }

        console.log('sent push notification', res);
      });
  }

  if (hassWebhookUrl) {
    console.log('sending to hass!', hassWebhookUrl);
    await axios.post(
      hassWebhookUrl,
      {
        timestamp: new Date().getTime(),
        title: `stackoverflow [${ now }]`,
        text: daysVisited,
        image: screenshot.toString('base64'),
        daysLeft
      }
    );
  }
}
