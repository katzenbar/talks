import { KafkaClient, ConsumerGroup } from "kafka-node";

const topicName = "olympics-with-replication";
const options = {
  kafkaHost: "kafka1:9091,kafka2:9092,kafka3:9093",
  groupId: "itty-bitty-kitty-committee",
  sessionTimeout: 10000 // Drop the session timeout for demo purposes
};

const consumer = new ConsumerGroup(options, topicName);

console.log(`\n\nConsumer ready to listen to "${topicName}"\n\n`);

consumer.on("message", message => {
  console.log(`=== MESSAGE RECEIVED (${new Date().toISOString()}) =======`);
  console.log(`      Topic: ${message.topic}`);
  console.log(`     Offset: ${message.offset}`);
  console.log(`        Key: ${message.key}`);
  console.log(`  Partition: ${message.partition}`);
  console.log("=======================================================");
  console.log(message.value);
  console.log("=======================================================\n\n");
});
