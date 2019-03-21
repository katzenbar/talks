import { KafkaClient, Producer } from "kafka-node";
import onKeypress from "./utils/onKeypress";
import olympicResults from "../2016-olympic-results.json";

// ----------------------------------------------------------------------------
// Step 1: Create Kafka Client
// ----------------------------------------------------------------------------
const client = new KafkaClient({
  kafkaHost: "kafka1:9091,kafka2:9092,kafka3:9093"
});

client.on("ready", () => {
  // --------------------------------------------------------------------------
  // Step 2: Create Topic
  // --------------------------------------------------------------------------
  const topicName = "ex2-distributed";
  const topicsToCreate = [
    {
      topic: topicName,
      // ----------------------------------------------------------------------
      // NEW - Set number of partitions when creating the topic
      // ----------------------------------------------------------------------
      partitions: 5,
      replicationFactor: 1
    }
  ];
  client.createTopics(topicsToCreate, (error, data) => {
    console.log(`\n\nTopic "${topicName}" created\n\n`);

    // ------------------------------------------------------------------------
    // Step 3: Create Producer
    // ------------------------------------------------------------------------
    const producer = new Producer(client, {
      // ----------------------------------------------------------------------
      // NEW - Set how messages are distributed across partitions
      // -  default   0
      // -  random    1   <--
      // -  cyclic    2
      // -  keyed     3
      // -  custom    4
      // ----------------------------------------------------------------------
      partitionerType: 1
    });

    // ------------------------------------------------------------------------
    // Step 4: Send message to topic on key press
    // ------------------------------------------------------------------------
    let index = 0;

    onKeypress((str, key) => {
      // Quit the program on `q` or `Ctrl-C` keypress
      if (key.name === "q" || (key.ctrl && key.name === "c")) {
        process.exit();
      } else {
        // --------------------------------------------------------------------
        // Step 4.1: Get next olympic result
        // --------------------------------------------------------------------
        const result = olympicResults[index];
        index += 1;

        // --------------------------------------------------------------------
        // Step 4.2: Print message to send on console
        // --------------------------------------------------------------------
        console.log(
          `=== SENDING MESSAGE (${new Date().toISOString()}) ========`
        );
        console.log(JSON.stringify(result, null, 4));
        console.log(
          "=======================================================\n\n"
        );

        // --------------------------------------------------------------------
        // Step 4.3: Send the record as a serialized JSON string
        // --------------------------------------------------------------------
        producer.send(
          [
            {
              topic: topicName,
              messages: JSON.stringify(result)
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
      }
    });

    // ------------------------------------------------------------------------
    // Step 5: Print usage instructions to console
    // ------------------------------------------------------------------------
    console.log("Press ENTER to send the next message");
    console.log("Press q to end the program\n\n");
  });
});
