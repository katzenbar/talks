import { KafkaClient, ConsumerGroup } from "kafka-node";

// ----------------------------------------------------------------------------
// Step 1: Create Consumer in Group
// ----------------------------------------------------------------------------
const topicName = "ex2-distributed";
const groupId = process.env.GROUP || "default-group";
const options = {
  kafkaHost: "kafka1:9091,kafka2:9092,kafka3:9093",
  // --------------------------------------------------------------------------
  // NEW - Join a consumer group
  // --------------------------------------------------------------------------
  groupId: groupId,
  sessionTimeout: 10000 // Lower the session timeout for demo purposes
};
const consumer = new ConsumerGroup(options, topicName);

console.log(
  `\n\nConsumer ready to listen to "${topicName} in group ${groupId}"\n\n`
);

// ----------------------------------------------------------------------------
// Step 2: Subscribe to messages
// ----------------------------------------------------------------------------
consumer.on("message", message => {
  console.log(`=== MESSAGE RECEIVED (${new Date().toISOString()}) =======`);
  console.log(`      Topic: ${message.topic}`);
  console.log(`     Offset: ${message.offset}`);
  console.log(`  Partition: ${message.partition}`);
  console.log("=======================================================");
  console.log(message.value);
  console.log("=======================================================\n\n");
});
