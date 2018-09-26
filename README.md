# Smart Fleet Kafka Interworking

본 Repository는 단말로부터 수집한 데이터를 고객사의 서버에서 Smart [Fleet]으로 전송하여 단말 데이터를 분석할 때 사용하는 Kafka interface에 연동하는 Sample Code 입니다.

보다 상세한 연동 방식이나 제약 사항은 [Smart[Fleet] 기술문서](https://smart-fleet-docs.readthedocs.io/ko/latest/miscellaneous/#data-interworking-using-kafka) 을 꼭 확인 해주세요.

## Kafka Producer

고객사 서버에서 Smart[Fleet]로 데이터를 전송하는 방법을 샘플한 코드입니다. 본 코드는 고객사 서버에서 1차로 수집한 단말이 OBD ``On Board Diagnostics`` 인 경우로 총 10회의 차량 데이터를 전송하여 1회의 Trip을 완료한 케이스를 기술합니다.

> 본 코드는 테스터의 Local에 Kafka가 설치 및 구동된 것을 가정하여 구동합니다.  Smart[Fleet]에 직접 연결하기 위해서는 admin@smartfleet.sktelecom.com 또는 사업 담당자와 협의 해주세요.

총 10회의 차량 데이터에 중에는 아래 데이터 분석에 필요한 3가지 데이터 유형을 전송합니다. (아래 링크는 OBD 단말에 국한 합니다.)
1. [Microtrip Data](https://smart-fleet-docs.readthedocs.io/ko/latest/message/#obd-microtrip)
2. [Event Data](https://smart-fleet-docs.readthedocs.io/ko/latest/message/#event-message-format)
3. [Trip Data](https://smart-fleet-docs.readthedocs.io/ko/latest/message/#obd-trip)

```
 hongbeomahn@Hongbeoms-MacBook-Pro  ~/SmartFleetProject/kafka_test   master  node producer.js
send 1 messages
send 2 messages
send 3 messages
send 4 messages
send 5 messages
send 6 messages
send 7 messages
send 8 messages
send 9 messages
send 10 messages
```

## Kafka Consumer

상기 ``Kafka Producer``에 실행 결과가 Kafka Message Queue를 통해서 제대로 인입되었는지를 확인하기 위한 테스트 코드입니다. 
아래와 같이 상기 3가지 유형의 데이터가 제대로 전달되는 것을 확인 할 수 있습니다.

```
hongbeomahn@Hongbeoms-MacBook-Pro  ~/SmartFleetProject/kafka_test   master  node consumer.js
{ topic: 'topic1',
  value: '{"data":{"deviceType":"OBD","companyId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","payload":[{"tid":13,"alt":111,"sp":59,"dop":14,"nos":4,"clt":1524485489791},{"tid":13,"alt":107,"sp":68,"dop":21,"nos":4,"clt":1524485489796}],"ts":1537935246425,"date":26,"createdTime":1537935246425,"tripId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","microTripId":"30345660-b234-11e8-9bf8-956d65b68a0a","vehicleId":"244bee00-3c7b-11e8-8994-85c175e72d28","sensorId":"244bee00-3c7b-11e8-8994-85c175e72d28"},"msgType":"Microtrip"}',
  offset: 15,
  partition: 0,
  highWaterOffset: 16,
  key: null }
{ topic: 'topic1',
  value: '{"data":{"deviceType":"OBD","companyId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","payload":[{"tid":13,"alt":111,"sp":59,"dop":14,"nos":4,"clt":1524485489791},{"tid":13,"alt":107,"sp":68,"dop":21,"nos":4,"clt":1524485489796}],"ts":1537935246425,"date":26,"createdTime":1537935246425,"tripId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","microTripId":"30345660-b234-11e8-9bf8-956d65b68a0a","vehicleId":"244bee00-3c7b-11e8-8994-85c175e72d28","sensorId":"244bee00-3c7b-11e8-8994-85c175e72d28"},"msgType":"Microtrip"}',
  offset: 16,
  partition: 0,
  highWaterOffset: 17,
  key: null }
{ topic: 'topic1',
  value: '{"data":{"deviceType":"OBD","companyId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","payload":[{"tid":13,"alt":111,"sp":59,"dop":14,"nos":4,"clt":1524485489791},{"tid":13,"alt":107,"sp":68,"dop":21,"nos":4,"clt":1524485489796}],"ts":1537935246425,"date":26,"createdTime":1537935246425,"tripId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","microTripId":"30345660-b234-11e8-9bf8-956d65b68a0a","vehicleId":"244bee00-3c7b-11e8-8994-85c175e72d28","sensorId":"244bee00-3c7b-11e8-8994-85c175e72d28"},"msgType":"Microtrip"}',
  offset: 17,
  partition: 0,
  highWaterOffset: 18,
  key: null }
{ topic: 'topic1',
  value: '{"data":{"deviceType":"OBD","companyId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","payload":[{"tid":13,"alt":111,"sp":59,"dop":14,"nos":4,"clt":1524485489791},{"tid":13,"alt":107,"sp":68,"dop":21,"nos":4,"clt":1524485489796}],"ts":1537935246425,"date":26,"createdTime":1537935246425,"tripId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","microTripId":"30345660-b234-11e8-9bf8-956d65b68a0a","vehicleId":"244bee00-3c7b-11e8-8994-85c175e72d28","sensorId":"244bee00-3c7b-11e8-8994-85c175e72d28"},"msgType":"Microtrip"}',
  offset: 18,
  partition: 0,
  highWaterOffset: 19,
  key: null }
{ topic: 'topic1',
  value: '{"data":{"deviceType":"OBD","companyId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","payload":[{"tid":13,"alt":111,"sp":59,"dop":14,"nos":4,"clt":1524485489791},{"tid":13,"alt":107,"sp":68,"dop":21,"nos":4,"clt":1524485489796}],"ts":1537935246425,"date":26,"createdTime":1537935246425,"tripId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","microTripId":"30345660-b234-11e8-9bf8-956d65b68a0a","vehicleId":"244bee00-3c7b-11e8-8994-85c175e72d28","sensorId":"244bee00-3c7b-11e8-8994-85c175e72d28"},"msgType":"Microtrip"}',
  offset: 19,
  partition: 0,
  highWaterOffset: 20,
  key: null }
{ topic: 'topic1',
  value: '{"data":{"deviceType":"OBD","companyId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","payload":[{"tid":13,"alt":111,"sp":59,"dop":14,"nos":4,"clt":1524485489791},{"tid":13,"alt":107,"sp":68,"dop":21,"nos":4,"clt":1524485489796}],"ts":1537935246425,"date":26,"createdTime":1537935246425,"tripId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","microTripId":"30345660-b234-11e8-9bf8-956d65b68a0a","vehicleId":"244bee00-3c7b-11e8-8994-85c175e72d28","sensorId":"244bee00-3c7b-11e8-8994-85c175e72d28"},"msgType":"Microtrip"}',
  offset: 20,
  partition: 0,
  highWaterOffset: 21,
  key: null }
{ topic: 'topic1',
  value: '{"data":{"deviceType":"OBD","companyId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","payload":{"event":1234},"eventTs":1537935246425,"eventDt":1537935246425,"createdTime":1537935246425,"tripId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","vehicleId":"244bee00-3c7b-11e8-8994-85c175e72d28","sensorId":"244bee00-3c7b-11e8-8994-85c175e72d28","userId":"30345660-b234-11e8-9bf8-956d65b68a0a","ty":111},"msgType":"Event"}',
  offset: 21,
  partition: 0,
  highWaterOffset: 22,
  key: null }
{ topic: 'topic1',
  value: '{"data":{"deviceType":"OBD","companyId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","payload":[{"tid":13,"alt":111,"sp":59,"dop":14,"nos":4,"clt":1524485489791},{"tid":13,"alt":107,"sp":68,"dop":21,"nos":4,"clt":1524485489796}],"ts":1537935246425,"date":26,"createdTime":1537935246425,"tripId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","microTripId":"30345660-b234-11e8-9bf8-956d65b68a0a","vehicleId":"244bee00-3c7b-11e8-8994-85c175e72d28","sensorId":"244bee00-3c7b-11e8-8994-85c175e72d28"},"msgType":"Microtrip"}',
  offset: 22,
  partition: 0,
  highWaterOffset: 23,
  key: null }
{ topic: 'topic1',
  value: '{"data":{"deviceType":"OBD","companyId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","payload":[{"tid":13,"alt":111,"sp":59,"dop":14,"nos":4,"clt":1524485489791},{"tid":13,"alt":107,"sp":68,"dop":21,"nos":4,"clt":1524485489796}],"ts":1537935246425,"date":26,"createdTime":1537935246425,"tripId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","microTripId":"30345660-b234-11e8-9bf8-956d65b68a0a","vehicleId":"244bee00-3c7b-11e8-8994-85c175e72d28","sensorId":"244bee00-3c7b-11e8-8994-85c175e72d28"},"msgType":"Microtrip"}',
  offset: 23,
  partition: 0,
  highWaterOffset: 24,
  key: null }
{ topic: 'topic1',
  value: '{"data":{"deviceType":"OBD","companyId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","payload":[{"tid":13,"alt":111,"sp":59,"dop":14,"nos":4,"clt":1524485489791},{"tid":13,"alt":107,"sp":68,"dop":21,"nos":4,"clt":1524485489796}],"ts":1537935246425,"date":26,"createdTime":1537935246425,"tripId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","microTripId":"30345660-b234-11e8-9bf8-956d65b68a0a","vehicleId":"244bee00-3c7b-11e8-8994-85c175e72d28","sensorId":"244bee00-3c7b-11e8-8994-85c175e72d28"},"msgType":"Microtrip"}',
  offset: 24,
  partition: 0,
  highWaterOffset: 25,
  key: null }
{ topic: 'topic1',
  value: '{"data":{"deviceType":"OBD","companyId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","payload":[{"tid":13,"alt":111,"sp":59,"dop":14,"nos":4,"clt":1524485489791},{"tid":13,"alt":107,"sp":68,"dop":21,"nos":4,"clt":1524485489796}],"ts":1537935246425,"date":26,"createdTime":1537935246425,"tripId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","microTripId":"30345660-b234-11e8-9bf8-956d65b68a0a","vehicleId":"244bee00-3c7b-11e8-8994-85c175e72d28","sensorId":"244bee00-3c7b-11e8-8994-85c175e72d28"},"msgType":"Microtrip"}',
  offset: 25,
  partition: 0,
  highWaterOffset: 26,
  key: null }
{ topic: 'topic1',
  value: '{"latestTrip":{"deviceType":"OBD","id":"dcae45b0-7650-11e8-96b3-bf7af28e956c"},"data":{"deviceType":"OBD","companyId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","payload":{"tid":723,"stt":1524448067286,"edt":1524448070293,"dis":1022,"stlat":37.509141,"stlon":127.063228,"edlat":37.520759,"edlon":127.056837,"hsts":90,"mesp":56,"fwv":"1.0.1","dtvt":102},"startTs":1537935246425,"endTs":1537935246425,"startDt":1537935246425,"endDt":1537935246425,"createdTime":1537935246425,"tripId":"dcae45b0-7650-11e8-96b3-bf7af28e956c","vehicleId":"244bee00-3c7b-11e8-8994-85c175e72d28","userId":"30345660-b234-11e8-9bf8-956d65b68a0a","sensorId":"244bee00-3c7b-11e8-8994-85c175e72d28"},"msgType":"Trip"}',
  offset: 26,
  partition: 0,
  highWaterOffset: 27,
  key: null }
  ```
