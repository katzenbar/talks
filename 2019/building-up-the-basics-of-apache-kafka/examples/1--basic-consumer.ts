import { KafkaClient, Consumer } from "kafka-node";

// ----------------------------------------------------------------------------
// Step 1: Create Kafka Client
// ----------------------------------------------------------------------------
const client = new KafkaClient({
  kafkaHost: "kafka1:9091,kafka2:9092,kafka3:9093"
});

// ----------------------------------------------------------------------------
// Step 2: Create Consumer
// ----------------------------------------------------------------------------
const topicName = "ex1-basic";
const consumer = new Consumer(client, [{ topic: topicName, partition: 0 }], {});

// ----------------------------------------------------------------------------
// Step 3: Subscribe to messages
// ----------------------------------------------------------------------------
console.log(`\n\nConsumer ready to listen to "${topicName}"\n\n`);

consumer.on("message", message => {
  console.log(`=== MESSAGE RECEIVED (${new Date().toISOString()}) =======`);
  console.log(`  Topic: ${message.topic}`);
  console.log(`  Offset: ${message.offset}`);
  console.log("=======================================================");
  console.log(message.value);
  console.log("=======================================================\n\n");
});
