<p align="center">
  <a href="https://github.com/Kibibit/kb-fanatic-overflow/" target="blank"><img src="https://kibibit.io/kibibit-assets/kb-overflow.png" width="200" alt="achievibit Logo" />
  </a>
  <h2 align="center">
    @kibibit/kb-fanatic-overflow
  </h2>
</p>
<p align="center">
  <a href="https://hub.docker.com/repository/docker/kibibitopensrc/kb-fanatic-overflow"><img alt="Docker Image Version (latest by date)" src="https://img.shields.io/docker/v/kibibitopensrc/kb-fanatic-overflow?logo=docker&style=for-the-badge"></a>
</p>
<p align="center">
  Get the stack overflow fanatic achievement with a Docker Container!
</p>
<hr>

## Installation
you need a folder containing a `config.json` file (see `config/config.example.json` for an example). The available options are:

- timezone
- pushbullet (optional) - token for pushbullet for notifications
- hassUrl (optional) - a Home Assistant instance you want to send webhooks notifications to
- scheduledHourOfDay - a comma separated list of hours in a 24hours format to run the task (for example: `16,23` will run once at 4pm, and once at 11pm)
- stackoverflow.email - user email for stackoverflow login
- stackoverflow.password - user password for stackoverflow login
- returnUrl - can be anything you want, but for best results, have it point to your stackoverflow user page. This way, it will actually send the correct data in the notifications.


## Usage

to run in docker use the following commands:
```
docker build -t thatkookooguy/visit-overflow . 
docker run -d --restart unless-stopped --name visit-overflow -v ${pwd}/config:/config thatkookooguy/visit-overflow
```


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://thatkookooguy.kibibit.io/"><img src="https://avatars3.githubusercontent.com/u/10427304?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Neil Kalman</b></sub></a><br /><a href="https://github.com/kibibit/hass-kibibit-theme/commits?author=Thatkookooguy" title="Code">💻</a> <a href="https://github.com/kibibit/kb-fanatic-overflow/commits?author=Thatkookooguy" title="Documentation">📖</a> <a href="#design-Thatkookooguy" title="Design">🎨</a> <a href="#infra-Thatkookooguy" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Thatkookooguy" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Stay in touch

- Author - [Neil Kalman](https://github.com/thatkookooguy)
- Website - [https://github.com/kibibit](https://github.com/kibibit)
- StackOverflow - [thatkookooguy](https://stackoverflow.com/users/1788884/thatkookooguy)
- Twitter - [@thatkookooguy](https://twitter.com/thatkookooguy)
- Twitter - [@kibibit_opensrc](https://twitter.com/kibibit_opensrc)
