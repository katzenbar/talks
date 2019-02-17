import { KafkaClient, Producer } from "kafka-node";

import onKeypress from "./utils/onKeypress";
import olympicResults from "../2016-olympic-results.json";

const client = new KafkaClient({
  kafkaHost: "kafka1:9092,kafka2:9092,kafka3:9092"
});
const producer = new Producer(client);

producer.on("ready", () => {
  // Initialize topic, if not already available
  producer.createTopics(["olympics"], false, (error, data) => {
    console.log('\n\nProducer ready to write to topic "olympics"\n\n');
  });

  let index = 0;

  onKeypress((str, key) => {
    // Quit the program on `q` or `Ctrl-C` keypress
    if (key.name === "q" || (key.ctrl && key.name === "c")) {
      process.exit();
    } else {
      // Grab the next olympic result to send to the topic
      const result = olympicResults[index];

      // Print the Message to the console to see the contents in the producer tab
      console.log(`=== SENDING MESSAGE (${new Date().toISOString()}) ========`);
      console.log(JSON.stringify(result, null, 4));
      console.log(
        "=======================================================\n\n"
      );

      // Send the record as a serialized JSON string
      producer.send(
        [{ topic: "olympics", messages: JSON.stringify(result) }],
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
