const synth = new Tone.MonoSynth({
  "portamento" : 0.05,
  "oscillator" : {
    "type" : "sine"
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

const melodyList = [
  'B4','B4','A4','D4','D4','E4','G4','F#4','F#4','B4','E4','E3','E2','E2','E2','A4','D4','D4','G4','F#4'
];


function setPlay(time, note) {
  synth.triggerAttackRelease(note, '2n', time);
}

Tone.Transport.bpm.value = 23.33;

const melody = new Tone.Sequence(setPlay, melodyList).start();

const reverb = new Tone.Freeverb({
  "roomSize" : 300,
  "wet" : 9.0
});

const feedbackDelay = new Tone.PingPongDelay({
  "delayTime" : "3n",
  "feedback" : 0.4,
  "wet" : 0.3
}).toMaster();


// シンセとエフェクトを接続
synth.connect(feedbackDelay);


// エフェクト付きで発音
synth.triggerAttackRelease();
Tone.Transport.start();

