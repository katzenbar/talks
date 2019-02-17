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

### Code Example References

- `2016-olympic-results.json` - Dataset from Kaggle (CC0) https://www.kaggle.com/heesoo37/120-years-of-olympic-history-athletes-and-results/version/2
  - Filtered down to just the results from 2016 (13688 records)
  - Converted from CSV to JSON
  - Reordered by year, season, sport, event, country, name

### Talk References

- Kafka at Netflix
  - Blog Posts
    - Evolution of the Netflix Data Pipeline (2016 Feb 15) - https://medium.com/netflix-techblog/evolution-of-the-netflix-data-pipeline-da246ca36905
    - Kafka Inside Keystone Pipeline (2016 Apr 27) - https://medium.com/netflix-techblog/kafka-inside-keystone-pipeline-dd5aeabaf6bb
    - Keystone Real-time Stream Processing Platform (2018 Sep 10) - https://medium.com/netflix-techblog/keystone-real-time-stream-processing-platform-a3ee651812a
  - Conference Talks
    - "Running a Massively Parallel Self-Serve Distributed Data System at Scale" by Zhenzhong Xu (2017 Sept @ StrangeLoop) - https://www.youtube.com/watch?v=0Eimlcrj-tg
    - Netflix at Spark+AI Summit 2018 (2018 Jun 21) - https://medium.com/netflix-techblog/netflix-at-spark-ai-summit-2018-5304749ed7fa
    - Fact Store at Scale for Netflix Recommendations (2018 Jun @ Spark AI Summit) - https://databricks.com/session/fact-store-scale-for-netflix-recommendations
    - Near Real-Time Netflix Recommendations Using Apache Spark Streaming (2018 Jun @ Spark AI Summit) - https://databricks.com/session/near-real-time-netflix-recommendations-using-apache-spark-streaming
    - Apache Spark-Based Stratification Library for Machine Learning Use Cases at Netflix (2018 Jun @ Spark AI Summit) - https://databricks.com/session/spark-based-stratification-library-for-machine-learning-use-cases-at-netflix
- Kafka at The New York Times
  - Publishing with Apache Kafka at The New York Times (2017 Sep 6) - https://open.nytimes.com/publishing-with-apache-kafka-at-the-new-york-times-7f0e3b7d2077
  - Kafka at NY Times with Boerge Svingen (Software Engineering Daily Podcast 2017 Oct 30) - https://softwareengineeringdaily.com/2017/10/30/kafka-at-ny-times-with-boerge-svingen/
