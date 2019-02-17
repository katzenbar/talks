import { KafkaClient, Consumer, Producer } from "kafka-node";

const client = new KafkaClient({
  kafkaHost: "kafka1:9092,kafka2:9092,kafka3:9092"
});

const consumer = new Consumer(client, [{ topic: "olympics", partition: 0 }], {
  autoCommit: false
});

consumer.on("message", message => {
  console.log("=== MESSAGE RECEIVED ================================");
  console.log(`  Topic: ${message.topic}`);
  console.log(`  Partition: ${message.partition}`);
  console.log(`  Offset: ${message.offset}`);
  console.log(`  Key: ${message.key}`);
  console.log("=====================================================");
  console.log(message.value);
  console.log("=====================================================\n\n");
});
