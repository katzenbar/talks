import { KafkaClient, Producer } from "kafka-node";

import onKeypress from "./utils/onKeypress";
import olympicResults from "../2016-olympic-results.json";

const client = new KafkaClient({
  kafkaHost: "kafka1:9091,kafka2:9092,kafka3:9093"
});
const producer = new Producer(client, {
  partitionerType: 3
});
const topicName = "olympics-with-replication";
const topicsToCreate = [
  {
    topic: topicName,
    partitions: 5,
    replicationFactor: 3
  }
];

producer.on("ready", () => {
  // Initialize topic, if not already available
  client.createTopics(topicsToCreate, (error, data) => {
    console.log(`\n\nProducer ready to write to topic "${topicName}"\n\n`);

    let index = 0;

    onKeypress((str, key) => {
      // Quit the program on `q` or `Ctrl-C` keypress
      if (key.name === "q" || (key.ctrl && key.name === "c")) {
        process.exit();
      } else {
        // Grab the next olympic result to send to the topic
        const result = olympicResults[index];

        // Print the Message to the console to see the contents in the producer tab
        console.log(
          `=== SENDING MESSAGE (${new Date().toISOString()}) ========`
        );
        console.log(JSON.stringify(result, null, 4));
        console.log(
          "=======================================================\n\n"
        );

        // Send the record as a serialized JSON string
        producer.send(
          [
            {
              topic: topicName,
              messages: JSON.stringify(result),
              key: result.name
            }
          ],
          (error, data) => {
            console.log(
              `=== MESSAGE ACKNOWLEDGED (${new Date().toISOString()}) ===`
            );
            console.log(data);
            console.log(
              "=======================================================\n\n"
            );
          }
        );
        index += 1;
      }
    });

    // Print instructions to the console once we are ready to send messages
    console.log("Press ENTER to send the next message");
    console.log("Press q to end the program\n\n");
  });
});
