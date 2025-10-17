# MileReminder
Discord bot that sends scheduled reminders for running sessions and verifies completion.

## Installing

Create `.env` file containing

```
DISCORD_TOKEN=
CHANNEL_ID=
CLIENT_ID=
```
---

### TimeZone

⚠️ This application being cron based, the TimeZone **has** to be defined ⚠️

Create a `.env` file in the docker-compose root folder containing `TZ=Your/TimeZone`

---


## Executing

### Without Docker Compose

Then execute

```sh
npm install
node .
```

### With Docker Compose

```yml
services:
    milereminder:
        container_name: milereminder
        build:
        context: ./milereminder
        args:
            TZ: ${TZ}
        env_file: "./milereminder/.env"
        restart: unless-stopped
        volumes:
        - "./milereminder/img:/discord/img"
```