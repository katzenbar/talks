# Building Up the Basics of Apache Kafka

Presented at Momentum Developer Conference - _March 21, 2019_

## Abstract

Apache Kafka is a distributed data streaming platform that has gained popularity over the last few years. Companies like LinkedIn, Netflix, and the New York Times are using Kafka in various ways to process large amounts of data in real-time. After getting to work with this versatile platform in the last year at EBTH, I have enjoyed the development experience and want to share what I have learned. In this session I will discuss how Kafka can be used and explains the basic building blocks of Kafka using a live demonstration.

## Running the Examples

### Prerequisites

- Docker (with `docker-compose`)
- node (developed using 10.15.0 LTS release)
- npm (Comes with node)

### Networking Setup

To enable communicating between the Kafka cluster inside of Docker and my projects running on my local machine, I have done some less-than-optimal configuration. I am not particularly happy with how this is working, but it is much better than not working. If anyone has suggestions on how to make this work more correctly, please reach out!

To route the internal Docker host names back to localhost, I have added the following to my `/etc/hosts` config. IPv6 has worked for me with no issues, but you may want to use `127.0.0.1` to support IPv4.

```
::1             kafka1
::1             kafka2
::1             kafka3
```

### Install Dependencies

All examples are written using Node.js. Run `npm install` to install any Node modules needed to run examples.

### Running Examples

There are several example scripts in the `./examples/` folder. To run these scripts use:

```bash
npx ts-node examples/1--basic-producer.ts
```

`ts-node` allows you to run TypeScript files without compiling beforehand.

## References

- `2016-olympic-results.json` - Dataset from Kaggle (CC0) https://www.kaggle.com/heesoo37/120-years-of-olympic-history-athletes-and-results/version/2
  - Filtered down to just the results from 2016 (13688 records)
  - Converted from CSV to JSON
  - Reordered by year, season, sport, event, country, name
