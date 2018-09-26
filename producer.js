var kafka = require('kafka-node');
var HighLevelProducer = kafka.HighLevelProducer;
var Client = kafka.Client;
var time = new Date();
var client = new Client();
var argv = require('optimist').argv;
var topic = argv.topic || 'topic1';
var count = 10;
var rets = 0;
var producer = new HighLevelProducer(client, options);

producer.on('ready', function () {
  setInterval(sendMsg, 1000);

});

producer.on('error', function (err) {
  console.log('error', err);
});

function sendMsg() {
    var message = new Date().toString();

    // sending microTrip
    send(microTripMsg);
    // sending eventTrip
    if (rets == count/2)    send(eventMsg);
    // sending trip
    if (rets == count) {
        send(tripMsg);
        process.exit();
    }
};

function send(arg) {
    producer.send([
        {topic: topic, messages: [JSON.stringify(arg)]}
    ], function (err, data) {
        if (err) console.log(err);
        else console.log('send %d messages', ++rets);
    })
};

// Message Definition
var tripMsg = {
    "latestTrip" : {
        "deviceType" : "OBD",
        "id" : "dcae45b0-7650-11e8-96b3-bf7af28e956c"               //[Optiona] id of trip 
    },
    "data" : {
        "deviceType" : "OBD",                                       //[Mandatory] Type of Device
        "companyId" : "dcae45b0-7650-11e8-96b3-bf7af28e956c",       //[Mandatory] Id of Company that a service has registered
        "payload" : {                                               //[Mandatory]    
            "tid":723,
            "stt":1524448067286,
            "edt":1524448070293,
            "dis":1022,
            "stlat":37.509141,
            "stlon":127.063228,
            "edlat":37.520759,
            "edlon":127.056837,
            "hsts":90,
            "mesp":56,
            "fwv":"1.0.1",
            "dtvt":102
        },                                                                                 
        "startTs" : time.getTime(),
        "endTs" : time.getTime(),
        "startDt" : time.getTime(),
        "endDt" : time.getTime(),
        "createdTime" : time.getTime(),
        "tripId" : "dcae45b0-7650-11e8-96b3-bf7af28e956c",
        "vehicleId" : "244bee00-3c7b-11e8-8994-85c175e72d28",
        "userId" : "30345660-b234-11e8-9bf8-956d65b68a0a",
        "sensorId" : "244bee00-3c7b-11e8-8994-85c175e72d28"
    },
    "msgType" : "Trip"
};

var microTripMsg = {

    "data" : {
        "deviceType" : "OBD",
        "companyId" : "dcae45b0-7650-11e8-96b3-bf7af28e956c",
        "payload" : [
            {
                "tid":13,
                "alt":111,
                "sp":59,
                "dop":14,
                "nos":4,
                "clt":1524485489791
            },
            {
                "tid":13,
                "alt":107,
                "sp":68,
                "dop":21,
                "nos":4,
                "clt":1524485489796
            }
        ],
        "ts" : time.getTime(),
        "date" : time.getDate(),
        "createdTime" : time.getTime(),
        "tripId" : "dcae45b0-7650-11e8-96b3-bf7af28e956c",
        "microTripId" : "30345660-b234-11e8-9bf8-956d65b68a0a",
        "vehicleId" : "244bee00-3c7b-11e8-8994-85c175e72d28",
        "sensorId" : "244bee00-3c7b-11e8-8994-85c175e72d28"
    },
    "msgType" : "Microtrip"
};

var eventMsg = {
    "data" : {
        "deviceType" : "OBD",
        "companyId" : "dcae45b0-7650-11e8-96b3-bf7af28e956c",
        "payload" : {
            "event" : 1234
        },
        "eventTs" : time.getTime(),
        "eventDt" : time.getTime(),
        "createdTime" : time.getTime(),
        "tripId" : "dcae45b0-7650-11e8-96b3-bf7af28e956c",
        "vehicleId" : "244bee00-3c7b-11e8-8994-85c175e72d28",
        "sensorId" : "244bee00-3c7b-11e8-8994-85c175e72d28",
        "userId" : "30345660-b234-11e8-9bf8-956d65b68a0a",
        "ty" : 111
    },
    "msgType" : "Event"
};

var options = {
    host: 'zookeeper:2181',  // zookeeper host omit if connecting directly to broker (see kafkaHost below)
    kafkaHost: 'broker:9092', // connect directly to kafka broker (instantiates a KafkaClient)
    zk : undefined,   // put client zk settings if you need them (see Client)
    batch: undefined, // put client batch settings if you need them (see Client)
    ssl: true, // optional (defaults to false) or tls options hash
    groupId: 'ExampleTestGroup',
    sessionTimeout: 15000,
    // An array of partition assignment protocols ordered by preference.
    // 'roundrobin' or 'range' string for built ins (see below to pass in custom assignment protocol)
    protocol: ['roundrobin']
  };
   
