const synth = new Tone.MonoSynth({
  "portamento" : 0.01,
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
    "attack" : 0.01,
    "decay" : 0.2,
    "sustain" : 0.1,
    "release" : 0.8,
    "baseFrequency" : 300,
    "octaves" : 4
  },
  "volume": -14
}).toMaster();

const melodyList = [
  'E3', 'B3', 'A3', 'B3',
  'D3', 'B3', 'F#3', 'E3', 'D3', 'E3', 'E4', 'D4','G3','D4','D4','F#4', 'G2', 'G4', 'A2','A2','A2',['B3','D3','E3'],
];


function setPlay(time, note) {
  synth.triggerAttackRelease(note, '8n', time);
}

Tone.Transport.bpm.value = 40;

const melody = new Tone.Sequence(setPlay, melodyList).start();

const reverb = new Tone.Freeverb({
  "roomSize" : 80.2,
  "wet" : 0.8
});

const feedbackDelay = new Tone.PingPongDelay({
  "delayTime" : "1n",
  "feedback" : 0.6,
  "wet" : 0.8
}).toMaster();

// const vol = new Tone.Volume(-4);
// instrument.chain(vol, Tone.Master);

// Connect Synth and feedbackDelay
synth.connect(feedbackDelay);

// Play sound with effect
synth.triggerAttackRelease();
Tone.Transport.start();


