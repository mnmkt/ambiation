var synth = new Tone.MonoSynth({
  "portamento" : 0.1,
  "oscillator" : {
    "type" : "square"
  },
  "envelope" : {
    "attack" : 0.005,
    "decay" : 0.2,
    "sustain" : 0.4,
    "release" : 1.4,
  },
  "filterEnvelope" : {
    "attack" : 0.005,
    "decay" : 0.1,
    "sustain" : 0.05,
    "release" : 0.8,
    "baseFrequency" : 300,
    "octaves" : 4
  },
  "volume": -14
}).toMaster();

var melodyList = [
  'E2','E2','E2','D2','E2','G2','A2',['A2','G2'],'F#2','E2','D2',
];


function setPlay(time, note) {
  synth.triggerAttackRelease(note, '2n', time);
}

Tone.Transport.bpm.value = 13;

var melody = new Tone.Sequence(setPlay, melodyList).start();

var reverb = new Tone.Freeverb({
  "roomSize" : 100,
  "wet" : 4.0
});

var feedbackDelay = new Tone.PingPongDelay({
  "delayTime" : "4n",
  "feedback" : 0.2,
  "wet" : 0.3
}).toMaster();



// シンセとエフェクトを接続
synth.connect(feedbackDelay);


// エフェクト付きで発音
synth.triggerAttackRelease();
Tone.Transport.start();


