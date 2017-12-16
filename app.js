'use strict';


  Nexus.context = Tone.context;

  Nexus.colors.accent = "#f442a7";

 let drone = new Nexus.Rack('#drone');

 let droneSynth = {
    fm: new Tone.FMOscillator(40, "sine", "sine").start(),
    fm2: new Tone.FMOscillator(160, "square", "sine").start(),
    vol: new Tone.Volume(-Infinity),
    pan: new Tone.Panner(0),
    filter: new Tone.Filter(300, "bandpass"),
		verb: new Tone.Freeverb({
      "roomSize" : 100,
      "wet" : 1.0
    }),
    compressor: new Tone.Compressor(-30, 10),
  }

  droneSynth.fm.connect( droneSynth.filter )
  droneSynth.fm2.connect( droneSynth.filter );
  droneSynth.filter.chain( droneSynth.compressor, droneSynth.vol, droneSynth.pan, droneSynth.verb, Tone.Master)


  droneSynth.fm.harmonicity.value = 4
  droneSynth.fm2.harmonicity.value = 4


  drone.power.on('change',function(v) {
    if (v) {
      droneSynth.vol.volume.rampTo(-20,1)
    } else {
      droneSynth.vol.volume.rampTo(-Infinity,1)
    }
  })

  drone.timbre.min = 5
  drone.timbre.max = 25
  drone.timbre.on('change',function(v) {
    droneSynth.fm.modulationIndex.rampTo(v,0.1)
    droneSynth.fm2.modulationIndex.rampTo(v,0.1)
  })
  drone.timbre.value = 0


  drone.pan.on('change',function(v) {
    droneSynth.pan.pan.value = v.value;
  })


  drone.filter.minX = 0
  drone.filter.maxX = 300
  drone.filter.minY = 0
  drone.filter.maxY = 10

  drone.filter.on('change',function(v) {
    droneSynth.filter.frequency.value = v.x;
    droneSynth.filter.Q.value = v.y;
  })

		droneSynth.verb.wet.value = 0.2


    drone.oscilloscope.connect(Tone.Master);
    drone.oscilloscope.colorize("fill","#FFFFFF")
    drone.oscilloscope.colorize("accent","#f442a7")
