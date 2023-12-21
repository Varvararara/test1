(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"wing_atlas_1", frames: [[0,0,1845,1780]]},
		{name:"wing_atlas_2", frames: [[0,0,1845,1780]]},
		{name:"wing_atlas_3", frames: [[0,0,1845,1780]]},
		{name:"wing_atlas_4", frames: [[0,0,1845,1780]]},
		{name:"wing_atlas_5", frames: [[0,0,1749,1873]]},
		{name:"wing_atlas_6", frames: [[0,0,1749,1873]]},
		{name:"wing_atlas_7", frames: [[0,0,1749,1873]]},
		{name:"wing_atlas_8", frames: [[0,0,1749,1873]]},
		{name:"wing_atlas_9", frames: [[0,0,1681,1937]]},
		{name:"wing_atlas_10", frames: [[0,0,1681,1937]]},
		{name:"wing_atlas_11", frames: [[0,0,1681,1937]]},
		{name:"wing_atlas_12", frames: [[0,0,1681,1937]]},
		{name:"wing_atlas_13", frames: [[0,0,1736,1875]]},
		{name:"wing_atlas_14", frames: [[0,0,1736,1875]]},
		{name:"wing_atlas_15", frames: [[0,0,1736,1875]]},
		{name:"wing_atlas_16", frames: [[0,0,1736,1875]]},
		{name:"wing_atlas_17", frames: [[0,0,1931,1676]]},
		{name:"wing_atlas_18", frames: [[0,0,1931,1676]]},
		{name:"wing_atlas_19", frames: [[0,0,1621,1995]]},
		{name:"wing_atlas_20", frames: [[0,0,1621,1995]]},
		{name:"wing_atlas_21", frames: [[0,0,1787,1809]]},
		{name:"wing_atlas_22", frames: [[0,0,1787,1809]]},
		{name:"wing_atlas_23", frames: [[0,0,1787,1809]]},
		{name:"wing_atlas_24", frames: [[0,0,1787,1809]]},
		{name:"wing_atlas_25", frames: [[0,0,1621,1994]]},
		{name:"wing_atlas_26", frames: [[0,0,1621,1994]]},
		{name:"wing_atlas_27", frames: [[0,0,1924,1679]]},
		{name:"wing_atlas_28", frames: [[0,0,1924,1679]]},
		{name:"wing_atlas_29", frames: [[0,0,1924,1679]]},
		{name:"wing_atlas_30", frames: [[0,0,1924,1679]]},
		{name:"wing_atlas_31", frames: [[0,0,1915,1680]]},
		{name:"wing_atlas_32", frames: [[0,0,1915,1680]]},
		{name:"wing_atlas_33", frames: [[0,0,1915,1680]]},
		{name:"wing_atlas_34", frames: [[0,0,1915,1680]]},
		{name:"wing_atlas_35", frames: [[0,0,1642,1953]]},
		{name:"wing_atlas_36", frames: [[0,0,1642,1953]]},
		{name:"wing_atlas_37", frames: [[0,0,1642,1953]]},
		{name:"wing_atlas_38", frames: [[0,0,1642,1953]]},
		{name:"wing_atlas_39", frames: [[0,0,1903,1678]]},
		{name:"wing_atlas_40", frames: [[0,0,1903,1678]]},
		{name:"wing_atlas_41", frames: [[0,0,1903,1678]]},
		{name:"wing_atlas_42", frames: [[0,0,1903,1678]]},
		{name:"wing_atlas_43", frames: [[0,0,1833,1739]]},
		{name:"wing_atlas_44", frames: [[0,0,1833,1739]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_168 = function() {
	this.initialize(img.CachedBmp_168);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_170 = function() {
	this.initialize(img.CachedBmp_170);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_167 = function() {
	this.initialize(img.CachedBmp_167);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_166 = function() {
	this.initialize(img.CachedBmp_166);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_165 = function() {
	this.initialize(img.CachedBmp_165);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_171 = function() {
	this.initialize(img.CachedBmp_171);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_169 = function() {
	this.initialize(img.CachedBmp_169);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_163 = function() {
	this.initialize(img.CachedBmp_163);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2015,1517);


(lib.CachedBmp_161 = function() {
	this.initialize(img.CachedBmp_161);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2013,1500);


(lib.CachedBmp_162 = function() {
	this.initialize(img.CachedBmp_162);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2015,1509);


(lib.CachedBmp_160 = function() {
	this.initialize(img.CachedBmp_160);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2007,1489);


(lib.CachedBmp_157 = function() {
	this.initialize(ss["wing_atlas_35"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_158 = function() {
	this.initialize(img.CachedBmp_158);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1528,2020);


(lib.CachedBmp_156 = function() {
	this.initialize(ss["wing_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_153 = function() {
	this.initialize(ss["wing_atlas_27"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_152 = function() {
	this.initialize(ss["wing_atlas_31"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_151 = function() {
	this.initialize(ss["wing_atlas_39"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_155 = function() {
	this.initialize(ss["wing_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_148 = function() {
	this.initialize(ss["wing_atlas_43"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_149 = function() {
	this.initialize(img.CachedBmp_149);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1873,1666);


(lib.CachedBmp_146 = function() {
	this.initialize(ss["wing_atlas_13"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_147 = function() {
	this.initialize(ss["wing_atlas_21"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_150 = function() {
	this.initialize(img.CachedBmp_150);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1889,1673);


(lib.CachedBmp_144 = function() {
	this.initialize(ss["wing_atlas_19"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_145 = function() {
	this.initialize(ss["wing_atlas_9"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_143 = function() {
	this.initialize(img.CachedBmp_143);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1557,2047);


(lib.CachedBmp_141 = function() {
	this.initialize(img.CachedBmp_141);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1506,2087);


(lib.CachedBmp_138 = function() {
	this.initialize(img.CachedBmp_138);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1542,2051);


(lib.CachedBmp_139 = function() {
	this.initialize(img.CachedBmp_139);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1532,2065);


(lib.CachedBmp_140 = function() {
	this.initialize(img.CachedBmp_140);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1520,2077);


(lib.CachedBmp_131 = function() {
	this.initialize(img.CachedBmp_131);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,285,2541);


(lib.CachedBmp_132 = function() {
	this.initialize(img.CachedBmp_132);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,510,2509);


(lib.CachedBmp_137 = function() {
	this.initialize(img.CachedBmp_137);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1551,2034);


(lib.CachedBmp_135 = function() {
	this.initialize(img.CachedBmp_135);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1160,2284);


(lib.CachedBmp_134 = function() {
	this.initialize(img.CachedBmp_134);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,949,2380);


(lib.CachedBmp_136 = function() {
	this.initialize(img.CachedBmp_136);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1361,2168);


(lib.CachedBmp_133 = function() {
	this.initialize(img.CachedBmp_133);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,732,2455);


(lib.CachedBmp_127 = function() {
	this.initialize(img.CachedBmp_127);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_128 = function() {
	this.initialize(img.CachedBmp_128);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_126 = function() {
	this.initialize(img.CachedBmp_126);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_124 = function() {
	this.initialize(img.CachedBmp_124);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_125 = function() {
	this.initialize(img.CachedBmp_125);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_171копия = function() {
	this.initialize(img.CachedBmp_171копия);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_123 = function() {
	this.initialize(img.CachedBmp_123);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_120 = function() {
	this.initialize(img.CachedBmp_120);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2015,1509);


(lib.CachedBmp_121 = function() {
	this.initialize(img.CachedBmp_121);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2015,1517);


(lib.CachedBmp_119 = function() {
	this.initialize(img.CachedBmp_119);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2013,1500);


(lib.CachedBmp_118 = function() {
	this.initialize(img.CachedBmp_118);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2007,1489);


(lib.CachedBmp_159 = function() {
	this.initialize(img.CachedBmp_159);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1407,2073);


(lib.CachedBmp_116 = function() {
	this.initialize(img.CachedBmp_116);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1528,2020);


(lib.CachedBmp_115 = function() {
	this.initialize(ss["wing_atlas_36"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_114 = function() {
	this.initialize(ss["wing_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_154 = function() {
	this.initialize(ss["wing_atlas_17"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_113 = function() {
	this.initialize(ss["wing_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_109 = function() {
	this.initialize(ss["wing_atlas_40"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_111 = function() {
	this.initialize(ss["wing_atlas_28"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_110 = function() {
	this.initialize(ss["wing_atlas_32"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_105 = function() {
	this.initialize(ss["wing_atlas_22"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_108 = function() {
	this.initialize(img.CachedBmp_108);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1889,1673);


(lib.CachedBmp_107 = function() {
	this.initialize(img.CachedBmp_107);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1873,1666);


(lib.CachedBmp_106 = function() {
	this.initialize(img.CachedBmp_106);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1832,1739);


(lib.CachedBmp_104 = function() {
	this.initialize(ss["wing_atlas_14"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_103 = function() {
	this.initialize(ss["wing_atlas_10"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_102 = function() {
	this.initialize(ss["wing_atlas_25"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(img.CachedBmp_101);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1557,2047);


(lib.CachedBmp_142 = function() {
	this.initialize(img.CachedBmp_142);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1490,2095);


(lib.CachedBmp_99 = function() {
	this.initialize(img.CachedBmp_99);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1505,2087);


(lib.CachedBmp_98 = function() {
	this.initialize(img.CachedBmp_98);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1520,2077);


(lib.CachedBmp_97 = function() {
	this.initialize(img.CachedBmp_97);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1532,2065);


(lib.CachedBmp_91 = function() {
	this.initialize(img.CachedBmp_91);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,732,2455);


(lib.CachedBmp_95 = function() {
	this.initialize(img.CachedBmp_95);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1551,2034);


(lib.CachedBmp_96 = function() {
	this.initialize(img.CachedBmp_96);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1542,2051);


(lib.CachedBmp_94 = function() {
	this.initialize(img.CachedBmp_94);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1361,2168);


(lib.CachedBmp_93 = function() {
	this.initialize(img.CachedBmp_93);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1160,2284);


(lib.CachedBmp_130 = function() {
	this.initialize(img.CachedBmp_130);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,61,2551);


(lib.CachedBmp_92 = function() {
	this.initialize(img.CachedBmp_92);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,950,2380);


(lib.CachedBmp_256 = function() {
	this.initialize(img.CachedBmp_256);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,878,678);


(lib.CachedBmp_89 = function() {
	this.initialize(img.CachedBmp_89);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,285,2541);


(lib.CachedBmp_90 = function() {
	this.initialize(img.CachedBmp_90);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,510,2509);


(lib.CachedBmp_86 = function() {
	this.initialize(img.CachedBmp_86);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3633,678);


(lib.CachedBmp_85 = function() {
	this.initialize(img.CachedBmp_85);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3170,615);


(lib.CachedBmp_508 = function() {
	this.initialize(img.CachedBmp_508);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_507 = function() {
	this.initialize(img.CachedBmp_507);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_506 = function() {
	this.initialize(img.CachedBmp_506);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_505 = function() {
	this.initialize(img.CachedBmp_505);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_503 = function() {
	this.initialize(img.CachedBmp_503);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_504 = function() {
	this.initialize(img.CachedBmp_504);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_499 = function() {
	this.initialize(img.CachedBmp_499);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2013,1500);


(lib.CachedBmp_498 = function() {
	this.initialize(img.CachedBmp_498);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2007,1489);


(lib.CachedBmp_501 = function() {
	this.initialize(img.CachedBmp_501);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2015,1517);


(lib.CachedBmp_500 = function() {
	this.initialize(img.CachedBmp_500);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2015,1509);


(lib.CachedBmp_496 = function() {
	this.initialize(img.CachedBmp_496);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1528,2020);


(lib.CachedBmp_495 = function() {
	this.initialize(ss["wing_atlas_37"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_491 = function() {
	this.initialize(ss["wing_atlas_29"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_493 = function() {
	this.initialize(ss["wing_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_494 = function() {
	this.initialize(ss["wing_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_490 = function() {
	this.initialize(ss["wing_atlas_33"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_488 = function() {
	this.initialize(img.CachedBmp_488);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1889,1673);


(lib.CachedBmp_489 = function() {
	this.initialize(ss["wing_atlas_41"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_487 = function() {
	this.initialize(img.CachedBmp_487);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1873,1666);


(lib.CachedBmp_485 = function() {
	this.initialize(ss["wing_atlas_23"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_486 = function() {
	this.initialize(img.CachedBmp_486);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1832,1739);


(lib.CachedBmp_484 = function() {
	this.initialize(ss["wing_atlas_15"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_341 = function() {
	this.initialize(img.CachedBmp_341);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,5726,2798);


(lib.CachedBmp_482 = function() {
	this.initialize(ss["wing_atlas_26"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_483 = function() {
	this.initialize(ss["wing_atlas_11"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_481 = function() {
	this.initialize(img.CachedBmp_481);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1557,2047);


(lib.CachedBmp_477 = function() {
	this.initialize(img.CachedBmp_477);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1532,2065);


(lib.CachedBmp_479 = function() {
	this.initialize(img.CachedBmp_479);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1505,2087);


(lib.CachedBmp_478 = function() {
	this.initialize(img.CachedBmp_478);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1520,2077);


(lib.CachedBmp_476 = function() {
	this.initialize(img.CachedBmp_476);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1542,2051);


(lib.CachedBmp_474 = function() {
	this.initialize(img.CachedBmp_474);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1361,2168);


(lib.CachedBmp_469 = function() {
	this.initialize(img.CachedBmp_469);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,285,2541);


(lib.CachedBmp_475 = function() {
	this.initialize(img.CachedBmp_475);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1551,2034);


(lib.CachedBmp_470 = function() {
	this.initialize(img.CachedBmp_470);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,510,2509);


(lib.CachedBmp_471 = function() {
	this.initialize(img.CachedBmp_471);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,732,2455);


(lib.CachedBmp_472 = function() {
	this.initialize(img.CachedBmp_472);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,950,2380);


(lib.CachedBmp_473 = function() {
	this.initialize(img.CachedBmp_473);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1160,2284);


(lib.CachedBmp_464 = function() {
	this.initialize(img.CachedBmp_464);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_465 = function() {
	this.initialize(img.CachedBmp_465);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_462 = function() {
	this.initialize(img.CachedBmp_462);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_463 = function() {
	this.initialize(img.CachedBmp_463);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_466 = function() {
	this.initialize(img.CachedBmp_466);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_461 = function() {
	this.initialize(img.CachedBmp_461);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_509 = function() {
	this.initialize(img.CachedBmp_509);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2011,1523);


(lib.CachedBmp_459 = function() {
	this.initialize(img.CachedBmp_459);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2015,1517);


(lib.CachedBmp_457 = function() {
	this.initialize(img.CachedBmp_457);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2013,1500);


(lib.CachedBmp_456 = function() {
	this.initialize(img.CachedBmp_456);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2007,1489);


(lib.CachedBmp_458 = function() {
	this.initialize(img.CachedBmp_458);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2015,1509);


(lib.CachedBmp_497 = function() {
	this.initialize(img.CachedBmp_497);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1407,2073);


(lib.CachedBmp_454 = function() {
	this.initialize(img.CachedBmp_454);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1528,2020);


(lib.CachedBmp_453 = function() {
	this.initialize(ss["wing_atlas_38"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_452 = function() {
	this.initialize(ss["wing_atlas_8"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_448 = function() {
	this.initialize(ss["wing_atlas_34"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_492 = function() {
	this.initialize(ss["wing_atlas_18"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_451 = function() {
	this.initialize(ss["wing_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_449 = function() {
	this.initialize(ss["wing_atlas_30"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_447 = function() {
	this.initialize(ss["wing_atlas_42"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_446 = function() {
	this.initialize(img.CachedBmp_446);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1889,1673);


(lib.CachedBmp_444 = function() {
	this.initialize(ss["wing_atlas_44"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_445 = function() {
	this.initialize(img.CachedBmp_445);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1873,1666);


(lib.CachedBmp_442 = function() {
	this.initialize(ss["wing_atlas_16"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_441 = function() {
	this.initialize(ss["wing_atlas_12"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_443 = function() {
	this.initialize(ss["wing_atlas_24"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_439 = function() {
	this.initialize(img.CachedBmp_439);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1557,2047);


(lib.CachedBmp_440 = function() {
	this.initialize(ss["wing_atlas_20"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_480 = function() {
	this.initialize(img.CachedBmp_480);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1490,2095);


(lib.CachedBmp_437 = function() {
	this.initialize(img.CachedBmp_437);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1506,2087);


(lib.CachedBmp_436 = function() {
	this.initialize(img.CachedBmp_436);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1520,2077);


(lib.CachedBmp_435 = function() {
	this.initialize(img.CachedBmp_435);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1532,2065);


(lib.CachedBmp_434 = function() {
	this.initialize(img.CachedBmp_434);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1542,2051);


(lib.CachedBmp_433 = function() {
	this.initialize(img.CachedBmp_433);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1551,2034);


(lib.CachedBmp_429 = function() {
	this.initialize(img.CachedBmp_429);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,732,2455);


(lib.CachedBmp_427 = function() {
	this.initialize(img.CachedBmp_427);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,285,2541);


(lib.Иллюстрация_без_названия5_0000_Слой14 = function() {
	this.initialize(img.Иллюстрация_без_названия5_0000_Слой14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,290,374);


(lib.CachedBmp_432 = function() {
	this.initialize(img.CachedBmp_432);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1361,2168);


(lib.CachedBmp_431 = function() {
	this.initialize(img.CachedBmp_431);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1160,2284);


(lib.Иллюстрация_без_названия5_0002_Слой17 = function() {
	this.initialize(img.Иллюстрация_без_названия5_0002_Слой17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,113,193);


(lib.Иллюстрация_без_названия5_0005_Слой13 = function() {
	this.initialize(img.Иллюстрация_без_названия5_0005_Слой13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,213,208);


(lib.Иллюстрация_без_названия5_0006_Слой12 = function() {
	this.initialize(img.Иллюстрация_без_названия5_0006_Слой12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,125,267);


(lib.Иллюстрация_без_названия5_0003_Слой16 = function() {
	this.initialize(img.Иллюстрация_без_названия5_0003_Слой16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,819,718);


(lib.Иллюстрация_без_названия5_0009_Слой9 = function() {
	this.initialize(img.Иллюстрация_без_названия5_0009_Слой9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,96,282);


(lib.Иллюстрация_без_названия5_0010_Слой8 = function() {
	this.initialize(img.Иллюстрация_без_названия5_0010_Слой8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,224,235);


(lib.Иллюстрация_без_названия5_0012_Слой6 = function() {
	this.initialize(img.Иллюстрация_без_названия5_0012_Слой6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,497,237);


(lib.Иллюстрация_без_названия5_0013_Слой5 = function() {
	this.initialize(img.Иллюстрация_без_названия5_0013_Слой5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,375,181);


(lib.Иллюстрация_без_названия5_0014_Слой4 = function() {
	this.initialize(img.Иллюстрация_без_названия5_0014_Слой4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,322,445);


(lib.Иллюстрация_без_названия5_0015_Слой3 = function() {
	this.initialize(img.Иллюстрация_без_названия5_0015_Слой3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,153,215);


(lib.Иллюстрация_без_названия5_0016_Слой2 = function() {
	this.initialize(img.Иллюстрация_без_названия5_0016_Слой2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,243,130);


(lib.Иллюстрация_без_названия5_0017_Слой15pngкопия = function() {
	this.initialize(img.Иллюстрация_без_названия5_0017_Слой15pngкопия);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,723,641);


(lib.Иллюстрация_без_названия5_0008_Слой10 = function() {
	this.initialize(img.Иллюстрация_без_названия5_0008_Слой10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,193,257);


(lib.Иллюстрация_без_названия5_0001_Слой17 = function() {
	this.initialize(img.Иллюстрация_без_названия5_0001_Слой17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,113,193);


(lib.Иллюстрация_без_названия5_0007_Слой11 = function() {
	this.initialize(img.Иллюстрация_без_названия5_0007_Слой11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,105,379);


(lib.Иллюстрация_без_названия5_0011_Слой7 = function() {
	this.initialize(img.Иллюстрация_без_названия5_0011_Слой7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,408,160);


(lib.CachedBmp_468 = function() {
	this.initialize(img.CachedBmp_468);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,61,2551);


(lib.CachedBmp_428 = function() {
	this.initialize(img.CachedBmp_428);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,510,2509);


(lib.CachedBmp_430 = function() {
	this.initialize(img.CachedBmp_430);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,949,2380);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Scene_1_Слой_11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_11
	this.instance = new lib.CachedBmp_341();
	this.instance.setTransform(-535.7,-11.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(55));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Слой_9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_9
	this.instance = new lib.CachedBmp_85();
	this.instance.setTransform(230.5,147.1,0.5,0.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(5).to({_off:false},0).wait(37));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Каркас_23___копия = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Каркас_23___копия
	this.instance = new lib.CachedBmp_468();
	this.instance.setTransform(1439.15,-1086.95,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_427();
	this.instance_1.setTransform(1370.2,-1064.6,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_428();
	this.instance_2.setTransform(1300.95,-1031.2,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_429();
	this.instance_3.setTransform(1231.4,-986.95,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_430();
	this.instance_4.setTransform(1161.7,-932.1,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_431();
	this.instance_5.setTransform(1091.8,-867,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_432();
	this.instance_6.setTransform(1021.8,-792,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_433();
	this.instance_7.setTransform(951.7,-707.8,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_434();
	this.instance_8.setTransform(884.1,-708.2,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_435();
	this.instance_9.setTransform(816.45,-707.5,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_436();
	this.instance_10.setTransform(748.85,-705.8,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_437();
	this.instance_11.setTransform(681.25,-703,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_480();
	this.instance_12.setTransform(613.7,-699.1,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_439();
	this.instance_13.setTransform(616.75,-665.2,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_440();
	this.instance_14.setTransform(619.85,-628.8,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_441();
	this.instance_15.setTransform(622.95,-590.05,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_442();
	this.instance_16.setTransform(626.05,-549.05,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_443();
	this.instance_17.setTransform(629.15,-506,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_444();
	this.instance_18.setTransform(632.2,-461.15,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_445();
	this.instance_19.setTransform(635.3,-414.8,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_446();
	this.instance_20.setTransform(641.95,-416.55,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_447();
	this.instance_21.setTransform(648.6,-416.95,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_448();
	this.instance_22.setTransform(655.2,-416,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_449();
	this.instance_23.setTransform(661.8,-413.7,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_492();
	this.instance_24.setTransform(668.5,-410.1,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_451();
	this.instance_25.setTransform(669.9,-465.95,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_452();
	this.instance_26.setTransform(671.3,-516.4,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_453();
	this.instance_27.setTransform(672.65,-560.7,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_454();
	this.instance_28.setTransform(674.05,-598.2,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_497();
	this.instance_29.setTransform(675.45,-628.5,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_456();
	this.instance_30.setTransform(699.8,-342.6,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_457();
	this.instance_31.setTransform(733.7,-361.8,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_458();
	this.instance_32.setTransform(767.65,-380.1,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_459();
	this.instance_33.setTransform(801.6,-397.55,0.5,0.5);

	this.instance_34 = new lib.CachedBmp_509();
	this.instance_34.setTransform(835.55,-414.2,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_461();
	this.instance_35.setTransform(946.2,-436.45,0.5,0.5);

	this.instance_36 = new lib.CachedBmp_462();
	this.instance_36.setTransform(1056.85,-458.65,0.5,0.5);

	this.instance_37 = new lib.CachedBmp_463();
	this.instance_37.setTransform(1167.55,-480.9,0.5,0.5);

	this.instance_38 = new lib.CachedBmp_464();
	this.instance_38.setTransform(1278.2,-503.1,0.5,0.5);

	this.instance_39 = new lib.CachedBmp_465();
	this.instance_39.setTransform(1388.9,-525.35,0.5,0.5);

	this.instance_40 = new lib.CachedBmp_466();
	this.instance_40.setTransform(1499.55,-547.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_33}]},1).to({state:[{t:this.instance_34,p:{x:835.55,y:-414.2}}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_38}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_34,p:{x:1610.25,y:-569.8}}]},1).to({state:[]},1).wait(13));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Каркас_23 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Каркас_23
	this.instance = new lib.CachedBmp_468();
	this.instance.setTransform(1811.4,-860.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_469();
	this.instance_1.setTransform(1737.3,-833.85,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_470();
	this.instance_2.setTransform(1662.85,-796.2,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_471();
	this.instance_3.setTransform(1588.15,-747.7,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_472();
	this.instance_4.setTransform(1513.25,-688.55,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_473();
	this.instance_5.setTransform(1438.2,-619.2,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_474();
	this.instance_6.setTransform(1363.05,-539.95,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_475();
	this.instance_7.setTransform(1287.8,-451.45,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_476();
	this.instance_8.setTransform(1211.75,-438.5,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_477();
	this.instance_9.setTransform(1135.65,-424.5,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_478();
	this.instance_10.setTransform(1059.55,-409.5,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_479();
	this.instance_11.setTransform(983.5,-393.4,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_480();
	this.instance_12.setTransform(907.45,-376.15,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_481();
	this.instance_13.setTransform(910.75,-348,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_482();
	this.instance_14.setTransform(914.1,-317.35,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_483();
	this.instance_15.setTransform(917.4,-284.35,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_484();
	this.instance_16.setTransform(920.75,-249.1,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_485();
	this.instance_17.setTransform(924.1,-211.85,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_486();
	this.instance_18.setTransform(927.45,-172.75,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_487();
	this.instance_19.setTransform(930.75,-132.15,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_488();
	this.instance_20.setTransform(934.45,-138.75,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_489();
	this.instance_21.setTransform(938.1,-144,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_490();
	this.instance_22.setTransform(941.8,-147.9,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_491();
	this.instance_23.setTransform(945.5,-150.45,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_492();
	this.instance_24.setTransform(949.15,-151.7,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_493();
	this.instance_25.setTransform(953.45,-207,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_494();
	this.instance_26.setTransform(957.7,-256.9,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_495();
	this.instance_27.setTransform(961.95,-300.65,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_496();
	this.instance_28.setTransform(966.25,-337.65,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_497();
	this.instance_29.setTransform(970.55,-367.4,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_498();
	this.instance_30.setTransform(961.95,-68.9,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_499();
	this.instance_31.setTransform(1002.3,-87.1,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_500();
	this.instance_32.setTransform(1042.7,-104.35,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_501();
	this.instance_33.setTransform(1083.1,-120.8,0.5,0.5);

	this.instance_34 = new lib.CachedBmp_509();
	this.instance_34.setTransform(1123.5,-136.45,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_503();
	this.instance_35.setTransform(1240.15,-172.2,0.5,0.5);

	this.instance_36 = new lib.CachedBmp_504();
	this.instance_36.setTransform(1356.8,-208,0.5,0.5);

	this.instance_37 = new lib.CachedBmp_505();
	this.instance_37.setTransform(1473.45,-243.75,0.5,0.5);

	this.instance_38 = new lib.CachedBmp_506();
	this.instance_38.setTransform(1590.1,-279.5,0.5,0.5);

	this.instance_39 = new lib.CachedBmp_507();
	this.instance_39.setTransform(1706.75,-315.25,0.5,0.5);

	this.instance_40 = new lib.CachedBmp_508();
	this.instance_40.setTransform(1823.4,-351.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_33}]},1).to({state:[{t:this.instance_34,p:{x:1123.5,y:-136.45}}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_38}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_34,p:{x:1940.1,y:-386.8}}]},1).to({state:[]},1).wait(13));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.шея = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0008_Слой10();
	this.instance.setTransform(0,0,0.583,0.583);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.шея, new cjs.Rectangle(0,0,112.5,149.9), null);


(lib.челка = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0000_Слой14();
	this.instance.setTransform(0,0,0.583,0.583);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.челка, new cjs.Rectangle(0,0,169.1,218.1), null);


(lib.ступняправо = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0015_Слой3();
	this.instance.setTransform(0,0,0.583,0.583);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ступняправо, new cjs.Rectangle(0,0,89.2,125.4), null);


(lib.ступнялево = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0016_Слой2();
	this.instance.setTransform(0,0,0.583,0.583);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ступнялево, new cjs.Rectangle(0,0,141.7,75.8), null);


(lib.плечоправо = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0010_Слой8();
	this.instance.setTransform(10,-15,0.583,0.583);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.плечоправо, new cjs.Rectangle(10,-15,130.6,137), null);


(lib.плечолево = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0007_Слой11();
	this.instance.setTransform(0,0,0.7979,0.583);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.плечолево, new cjs.Rectangle(0,0,83.8,221), null);


(lib.платье = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0003_Слой16();
	this.instance.setTransform(0,0,0.5799,0.4598);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.платье, new cjs.Rectangle(0,0,474.9,330.1), null);


(lib.ноганизправо = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0012_Слой6();
	this.instance.setTransform(0,0,0.583,0.583);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ноганизправо, new cjs.Rectangle(0,0,289.8,138.2), null);


(lib.ноганизлево = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0014_Слой4();
	this.instance.setTransform(0,0,0.583,0.583);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ноганизлево, new cjs.Rectangle(0,0,187.8,259.5), null);


(lib.локотьправо = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0009_Слой9();
	this.instance.setTransform(0,0,0.6129,0.6129);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.локотьправо, new cjs.Rectangle(0,0,58.9,172.9), null);


(lib.локотьлево = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0006_Слой12();
	this.instance.setTransform(0,0,1.1034,0.9619);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.локотьлево, new cjs.Rectangle(0,0,137.9,256.8), null);


(lib.лицо = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0005_Слой13();
	this.instance.setTransform(0,0,0.745,0.745);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.лицо, new cjs.Rectangle(0,0,158.7,155), null);


(lib.ладоньправо = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0002_Слой17();
	this.instance.setTransform(0,0,0.583,0.583);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ладоньправо, new cjs.Rectangle(0,0,65.9,112.5), null);


(lib.ладоньлево = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0001_Слой17();
	this.instance.setTransform(0,0,0.7773,0.6591);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ладоньлево, new cjs.Rectangle(0,0,87.9,127.2), null);


(lib.голеньправо = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0011_Слой7();
	this.instance.setTransform(229.75,151.65,0.583,0.583,-165.0013);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.голеньправо, new cjs.Rectangle(0,0,253.9,151.7), null);


(lib.голеньлево = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0013_Слой5();
	this.instance.setTransform(0,0,0.6274,0.6783);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.голеньлево, new cjs.Rectangle(0,0,235.3,122.8), null);


(lib.Анимация4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_256();
	this.instance.setTransform(468.95,-169.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(469,-169.3,439,339);


(lib.Анимация3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_86();
	this.instance.setTransform(-908.5,-169.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-908.5,-169.4,1816.5,339);


(lib.Анимация2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0017_Слой15pngкопия();
	this.instance.setTransform(-280.95,-242.6,0.7772,0.7569);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-280.9,-242.6,561.9,485.2);


(lib.Анимация1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия5_0017_Слой15pngкопия();
	this.instance.setTransform(-280.95,-242.6,0.7772,0.7569);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-280.9,-242.6,561.9,485.2);


(lib.Scene_1_Layer_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Анимация3("synched",0);
	this.instance.setTransform(953.65,292.4);

	this.instance_1 = new lib.Анимация4("synched",0);
	this.instance_1.setTransform(589.8,397.55);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:806.75,y:354.95},2).to({_off:true,x:589.8,y:397.55},3).wait(37));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({_off:false},3).to({rotation:10.9584,x:94.1,y:369.95},7).to({scaleX:0.9287,rotation:10.9579,x:174.6,y:401.55},6).to({regX:-208.5,regY:40.6,scaleX:0.9168,rotation:10.9584,x:-10.2,y:417.05},1).to({x:10.9,y:424.5},5).to({startPosition:0},5).to({x:161.4,y:371.15},5).to({x:961.35,y:180.6},7).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Слой_8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_8
	this.instance = new lib.платье();
	this.instance.setTransform(1704.75,232.7,0.6628,0.7806,14.9976,0,0,274.4,157.2);

	this.ikNode_16 = new lib.платье();
	this.ikNode_16.name = "ikNode_16";
	this.ikNode_16.setTransform(808.4,431.65,0.6628,0.7806,23.184,0,0,230.3,154.8);
	this.ikNode_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:0.6735,scaleY:0.7912,rotation:19.7723,x:1195.9,y:360.45},7).to({scaleX:0.6766,scaleY:0.7943,rotation:21.1371,x:1050.6,y:394.55},2).to({regX:274.5,scaleX:0.6781,scaleY:0.7958,rotation:21.8198,x:977.9,y:412.65},1).to({regX:284.7,regY:178.1,scaleX:0.6796,scaleY:0.7974,rotation:22.5025,x:905.15,y:448.75},1).to({_off:true,regX:230.3,regY:154.8,scaleX:0.6628,scaleY:0.7806,rotation:23.184,x:808.4,y:431.65},1).wait(30));
	this.timeline.addTween(cjs.Tween.get(this.ikNode_16).wait(11).to({_off:false},1).to({regX:230.5,scaleX:0.6584,scaleY:0.7756,rotation:23.1839,x:807.5,y:431.95},7).to({x:799.9,y:433.75},5).to({rotation:-6.8136,x:840.95,y:493.95},5).to({regX:230.6,regY:154.9,scaleX:0.654,scaleY:0.8304,rotation:23.1856,x:999.85,y:383.65},5).to({x:1752.6,y:177.6},7).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Слой_7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_7
	this.instance = new lib.Анимация1("synched",0);
	this.instance.setTransform(2040.95,150.6);

	this.instance_1 = new lib.Анимация2("synched",0);
	this.instance_1.setTransform(1682.8,180.3,1,1,7.201);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,rotation:7.201,x:1682.8,y:180.3},5).wait(37));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:false},5).to({rotation:19.4422,x:1187.7,y:386.6},7).to({rotation:44.9994,x:1026.2,y:496},7).to({rotation:89.9991,x:937.75,y:505.25},5).to({scaleX:0.9999,scaleY:0.9999,rotation:129.719,x:835.3,y:488.55},5).to({scaleX:1,scaleY:1,rotation:181.4139,x:959.85,y:292.55},5).to({x:1765.2,y:102},7).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.челкаилицо = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.челка();
	this.instance.setTransform(110.8,109,1,1,0,0,0,84.5,109);

	this.instance_1 = new lib.лицо();
	this.instance_1.setTransform(79.4,140.6,1,1,0,0,0,79.4,77.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.челкаилицо, new cjs.Rectangle(0,0,195.4,218.1), null);


(lib.Scene_1_Каркас_5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Каркас_5
	this.ikNode_15 = new lib.челкаилицо();
	this.ikNode_15.name = "ikNode_15";
	this.ikNode_15.setTransform(1839.75,90.45,0.6733,0.6733,7.0511,0,0,91.3,167.7);

	this.ikNode_14 = new lib.ладоньправо();
	this.ikNode_14.name = "ikNode_14";
	this.ikNode_14.setTransform(1717.95,9.9,0.6733,0.6733,15.8475,0,0,42.6,144.6);

	this.ikNode_13 = new lib.локотьправо();
	this.ikNode_13.name = "ikNode_13";
	this.ikNode_13.setTransform(1673.7,93.7,0.6733,0.6733,15.8468,0,0,4.5,187.8);

	this.ikNode_12 = new lib.плечоправо();
	this.ikNode_12.name = "ikNode_12";
	this.ikNode_12.setTransform(1777.85,46.65,0.815,0.7966,78.7936,0,0,-0.1,0.1);

	this.ikNode_11 = new lib.ладоньлево();
	this.ikNode_11.name = "ikNode_11";
	this.ikNode_11.setTransform(1943.05,178.5,0.6728,0.6728,-13.0131,0,0,39.3,103);

	this.ikNode_10 = new lib.локотьлево();
	this.ikNode_10.name = "ikNode_10";
	this.ikNode_10.setTransform(1847.65,309.4,0.6726,0.6726,16.9974,0,0,44.6,238.7);

	this.ikNode_9 = new lib.плечолево();
	this.ikNode_9.name = "ikNode_9";
	this.ikNode_9.setTransform(1841.5,228.05,0.6727,0.6727,16.979,0,0,40,72.5);

	this.ikNode_8 = new lib.ступнялево();
	this.ikNode_8.name = "ikNode_8";
	this.ikNode_8.setTransform(1407.65,428.05,0.6729,0.6729,-6.7168,0,0,71.9,38.1);

	this.ikNode_7 = new lib.ноганизлево();
	this.ikNode_7.name = "ikNode_7";
	this.ikNode_7.setTransform(1454.8,333.25,0.6725,0.6725,-19.4553,0,0,94.7,129.8);

	this.ikNode_6 = new lib.голеньлево();
	this.ikNode_6.name = "ikNode_6";
	this.ikNode_6.setTransform(1491.95,240.95,0.7632,0.4453,163.5819,0,0,189,94.2);

	this.ikNode_5 = new lib.ступняправо();
	this.ikNode_5.name = "ikNode_5";
	this.ikNode_5.setTransform(1712.8,528.8,0.6729,0.6729,-111.3912,0,0,45.2,94.7);

	this.ikNode_4 = new lib.ноганизправо();
	this.ikNode_4.name = "ikNode_4";
	this.ikNode_4.setTransform(1580.1,382.75,0.6729,0.6729,-111.3912,0,0,257.5,13.9);

	this.ikNode_3 = new lib.голеньправо();
	this.ikNode_3.name = "ikNode_3";
	this.ikNode_3.setTransform(1689.4,321.4,0.6729,0.6729,-66.3996,0,0,160.1,172.7);

	this.ikNode_2 = new lib.шея();
	this.ikNode_2.name = "ikNode_2";
	this.ikNode_2.setTransform(1818.65,150.6,0.6729,0.6729,1.4293,0,0,55.8,77.5);

	this.ikNode_1 = new lib.платье();
	this.ikNode_1.name = "ikNode_1";
	this.ikNode_1.setTransform(1676.25,222.7,0.6171,0.8066,19.5431,0,0,238.2,165.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8066,rotation:19.5431,x:1676.25,y:222.7,regX:238.2}},{t:this.ikNode_2,p:{regY:77.5,scaleX:0.6729,scaleY:0.6729,rotation:1.4293,x:1818.65,y:150.6,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6729,scaleY:0.6729,rotation:-66.3996,x:1689.4,y:321.4,regY:172.7}},{t:this.ikNode_4,p:{regX:257.5,scaleX:0.6729,scaleY:0.6729,rotation:-111.3912,x:1580.1,y:382.75,regY:13.9}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6729,scaleY:0.6729,rotation:-111.3912,x:1712.8,y:528.8,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7632,rotation:163.5819,x:1491.95,y:240.95,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-19.4553,x:1454.8,y:333.25,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6729,scaleY:0.6729,rotation:-6.7168,x:1407.65,y:428.05,regY:38.1}},{t:this.ikNode_9,p:{regX:40,scaleX:0.6727,scaleY:0.6727,rotation:16.979,x:1841.5,y:228.05,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.9974,x:1847.65,y:309.4,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6728,scaleY:0.6728,rotation:-13.0131,x:1943.05,y:178.5,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.815,rotation:78.7936,x:1777.85,y:46.65,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6733,scaleY:0.6733,rotation:15.8468,x:1673.7,y:93.7,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.6,scaleX:0.6733,scaleY:0.6733,rotation:15.8475,x:1717.95,y:9.9,regX:42.6}},{t:this.ikNode_15,p:{rotation:7.0511,x:1839.75,y:90.45,regX:91.3,regY:167.7}}]}).to({state:[{t:this.ikNode_1,p:{regY:165.1,scaleY:0.8065,rotation:19.5419,x:1605.05,y:242.25,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.3606,x:1747.85,y:169.8,regX:55.8}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-63.478,x:1609.85,y:344.65,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-102.559,x:1498.05,y:389.1,regY:13.9}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-102.559,x:1605.05,y:563.4,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:168.5079,x:1421.4,y:252.85,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.6,regY:129.9,rotation:-13.2835,x:1391.7,y:342.45,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:-1.7908,x:1337.1,y:418.45,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.9089,x:1770.7,y:247.5,regY:72.5}},{t:this.ikNode_10,p:{regY:238.8,rotation:16.927,x:1776.8,y:328.9,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:102.9,scaleX:0.6727,scaleY:0.6727,rotation:-13.0663,x:1872,y:197.65,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.7159,x:1688.35,y:70.6,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7754,x:1594.8,y:110.3,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:15.7761,x:1639.05,y:26.25,regX:42.6}},{t:this.ikNode_15,p:{rotation:6.981,x:1768.4,y:109.2,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5337,x:1532.5,y:261.35,regX:238.1}},{t:this.ikNode_2,p:{regY:77.7,scaleX:0.6728,scaleY:0.6728,rotation:1.3411,x:1675.5,y:189,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-60.5538,x:1528.8,y:366.7,regY:172.8}},{t:this.ikNode_4,p:{regX:257.5,scaleX:0.6728,scaleY:0.6728,rotation:-93.7228,x:1415.05,y:404.6,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-93.7228,x:1493.4,y:591.8,regY:94.8}},{t:this.ikNode_6,p:{scaleX:0.7632,rotation:173.4339,x:1350.1,y:264.3,regX:189.1,regY:94.2}},{t:this.ikNode_7,p:{regX:94.6,regY:129.9,rotation:-7.1087,x:1308.95,y:350.65,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:3.1096,x:1245.6,y:422,regY:38}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.8925,x:1698.2,y:266.5,regY:72.5}},{t:this.ikNode_10,p:{regY:238.8,rotation:16.9105,x:1704.35,y:347.9,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:102.9,scaleX:0.6727,scaleY:0.6727,rotation:-13.0663,x:1799.45,y:216.75,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.7394,x:1621.75,y:91.95,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7808,x:1517.6,y:128.4,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:15.7802,x:1561.9,y:44.8,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.9614,x:1695.65,y:128.1,regX:91.2,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5343,x:1460.25,y:280.7,regX:238.1}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.3216,x:1603.2,y:208.35,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-57.6255,x:1447.7,y:388.05,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-84.9047,x:1332.5,y:419.2,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-84.9047,x:1380.7,y:615.2,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:178.3486,x:1279.25,y:275.75,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-0.9413,x:1226.9,y:357.45,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:8.0331,x:1155.35,y:423.45,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.8723,x:1625.95,y:285.85,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8904,x:1632.15,y:367.15,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:102.9,scaleX:0.6727,scaleY:0.6727,rotation:-13.0837,x:1727.2,y:236,regX:39.4}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.6911,x:1546.35,y:111.1,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7335,x:1445.65,y:148.1,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.6,scaleX:0.6732,scaleY:0.6732,rotation:15.7329,x:1489.85,y:64.4,regX:42.6}},{t:this.ikNode_15,p:{rotation:6.943,x:1623.45,y:147.35,regX:91.2,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5347,x:1387.95,y:300.2,regX:238.1}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.3164,x:1530.95,y:227.8,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-54.6966,x:1366.7,y:408.8,regY:172.8}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-76.0794,x:1250.45,y:433.2,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-76.0794,x:1267.8,y:633.1,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7632,rotation:-176.739,x:1208.6,y:287.2,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:5.2193,x:1145.75,y:362.9,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:12.9584,x:1066.55,y:422.5,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.8653,x:1553.7,y:305.25,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.885,x:1559.95,y:386.45,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.089,x:1654.95,y:255.5,regX:39.4}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.6498,x:1470.9,y:130.25,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6932,x:1373.8,y:167.75,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:15.6926,x:1418,y:83.85,regX:42.6}},{t:this.ikNode_15,p:{rotation:6.9366,x:1551.25,y:166.65,regX:91.2,regY:167.6}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5357,x:1315.75,y:319.6,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.2878,x:1458.75,y:247.2,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-51.7672,x:1285.75,y:428.95,regY:172.7}},{t:this.ikNode_4,p:{regX:257.5,scaleX:0.6728,scaleY:0.6728,rotation:-67.2546,x:1168.8,y:446.6,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-67.2546,x:1155.35,y:645.45,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7632,rotation:-171.8221,x:1138.25,y:298.9,regX:189,regY:94.1}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:11.3869,x:1065.75,y:367.05,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:17.8827,x:979.45,y:419.3,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.8382,x:1481.5,y:324.65,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8562,x:1487.8,y:405.75,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1171,x:1582.55,y:274.8,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.6205,x:1395.5,y:149.45,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6661,x:1301.95,y:187.45,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:15.6655,x:1346.35,y:103.35,regX:42.8}},{t:this.ikNode_15,p:{rotation:6.9092,x:1479,y:186.1,regX:91.2,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5343,x:1243.35,y:338.85,regX:238.1}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.2813,x:1386.4,y:266.55,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-48.8417,x:1205.3,y:448.55,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-58.4227,x:1088,y:459.35,regY:14}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-58.4227,x:1044.3,y:652.65,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7632,rotation:-166.8981,x:1068.25,y:310.4,regX:189.1,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:17.5625,x:986.9,y:370.15,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:22.8084,x:894.15,y:414.2,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.8328,x:1409.3,y:344,regY:72.5}},{t:this.ikNode_10,p:{regY:238.8,rotation:16.8513,x:1415.55,y:425.15,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1183,x:1510.25,y:294.1,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.616,x:1324.75,y:167.25,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6566,x:1231.15,y:207.1,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:15.6561,x:1275.5,y:122.9,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.9039,x:1406.9,y:205.45,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5326,x:1171.05,y:358.2,regX:238.1}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.2865,x:1314.15,y:285.95,regX:55.9}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-45.9143,x:1124.65,y:467.65,regY:172.7}},{t:this.ikNode_4,p:{regX:257.5,scaleX:0.6728,scaleY:0.6728,rotation:-49.5918,x:1007.55,y:471.6,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-49.5918,x:935,y:654.85,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:-161.9724,x:998.8,y:321.9,regX:189.1,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:23.737,x:909.7,y:372,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:27.7326,x:811.1,y:407.05,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.8382,x:1336.95,y:363.35,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8562,x:1343.25,y:444.45,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1101,x:1437.95,y:313.5,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.632,x:1254.05,y:185.15,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6689,x:1160.4,y:226.75,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:15.6696,x:1204.75,y:142.65,regX:42.8}},{t:this.ikNode_15,p:{rotation:6.9092,x:1334.45,y:224.75,regX:91.2,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5302,x:1098.7,y:377.6,regX:238.1}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.2787,x:1241.8,y:305.3,regX:55.9}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-42.9874,x:1044.25,y:486.3,regY:172.8}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-40.7603,x:927.75,y:483.4,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-40.7603,x:828.4,y:652.3,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:-157.0471,x:929.7,y:333.55,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:29.9142,x:834,y:373.05,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:32.6589,x:730.55,y:398.35,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.8312,x:1264.65,y:382.65,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8497,x:1270.95,y:463.8,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.113,x:1365.6,y:332.9,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.6363,x:1183.35,y:202.95,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6714,x:1089.7,y:246.5,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:15.6721,x:1133.95,y:162.25,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.9013,x:1262.35,y:244.1,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5288,x:1026.4,y:397,regX:238.1}},{t:this.ikNode_2,p:{regY:77.7,scaleX:0.6728,scaleY:0.6728,rotation:1.2709,x:1169.5,y:324.7,regX:55.9}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-40.0608,x:964.1,y:504.35,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-31.9285,x:848.35,y:494.9,regY:13.9}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-31.9285,x:725.05,y:645.6,regY:94.8}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:-152.1221,x:860.9,y:345.15,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:36.089,x:759.9,y:373.4,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:37.5838,x:652.65,y:388.2,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.8234,x:1192.4,y:402,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8427,x:1198.75,y:483.1,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1171,x:1293.3,y:352.25,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.6294,x:1112.65,y:220.85,scaleY:0.7965}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.662,x:1019,y:266.25,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:15.6614,x:1063.3,y:182.05,regX:42.8}},{t:this.ikNode_15,p:{rotation:6.8947,x:1190.05,y:263.4,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5275,x:954.15,y:416.4,regX:238.2}},{t:this.ikNode_2,p:{regY:77.5,scaleX:0.6729,scaleY:0.6729,rotation:1.2514,x:1097.1,y:343.9,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-37.1342,x:884.2,y:522.15,regY:172.8}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-23.0978,x:769.7,y:506.05,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-23.0978,x:625.5,y:635.05,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:-147.1998,x:792.4,y:356.95,regX:189.1,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:42.2658,x:687.65,y:373.3,scaleX:0.6724,scaleY:0.6724}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:42.5092,x:577.55,y:377.1,regY:38}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.8057,x:1120.1,y:421.35,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8262,x:1126.45,y:502.4,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1328,x:1221,y:371.5,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.644,x:1042,y:238.75,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.673,x:948.5,y:285.95,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:15.6725,x:992.65,y:201.7,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.8763,x:1117.75,y:282.7,regX:91.4,regY:167.6}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5254,x:881.8,y:435.65,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6729,scaleY:0.6729,rotation:1.2384,x:1024.7,y:363.3,regX:55.8}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-34.2072,x:804.45,y:539.65,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-14.2676,x:691.7,y:517.15,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-14.2676,x:530.35,y:621.7,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:-142.2736,x:724.4,y:369.05,regX:189,regY:94.1}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:48.4421,x:617.15,y:372.9,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:47.4346,x:505.35,y:365.25,regY:38}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.7934,x:1047.8,y:440.7,regY:72.5}},{t:this.ikNode_10,p:{regY:238.8,rotation:16.8127,x:1054.15,y:521.75,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.141,x:1148.65,y:390.75,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.6373,x:971.35,y:256.7,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6636,x:877.85,y:305.75,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:15.6643,x:922.1,y:221.5,regX:42.8}},{t:this.ikNode_15,p:{rotation:6.8633,x:1045.35,y:302,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5244,x:809.5,y:455,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6729,scaleY:0.6729,rotation:1.2332,x:952.5,y:382.65,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-31.2809,x:725.1,y:556.9,regY:172.8}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-5.4358,x:614.45,y:528.1,regY:14}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-5.4358,x:440,y:606,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:-137.3483,x:656.75,y:381.35,regX:189,regY:94.1}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:54.6189,x:548.55,y:372.55,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:52.359,x:436.2,y:353.2,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.7893,x:975.5,y:460.05,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8086,x:981.95,y:541.05,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1423,x:1076.3,y:410.1,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.6285,x:900.75,y:274.7,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6513,x:807.25,y:325.55,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:15.6507,x:851.35,y:241.25,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.8581,x:973.05,y:321.35,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5234,x:809.5,y:455,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6729,scaleY:0.6729,rotation:1.2384,x:952.4,y:382.65,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-32.828,x:725.6,y:557.3,regY:172.7}},{t:this.ikNode_4,p:{regX:257.5,scaleX:0.6728,scaleY:0.6728,rotation:-11.7151,x:614.1,y:531.45,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-13.6864,x:449.35,y:628.05,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:-144.5132,x:652.1,y:391.95,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:47.7379,x:543.55,y:396.8,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:50.325,x:429.7,y:391,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.7946,x:975.5,y:460.05,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8143,x:981.9,y:540.95,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1357,x:1076.3,y:410.1,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:79.7838,x:900.9,y:276.2,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.673,x:807.2,y:325.45,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:15.6721,x:851.3,y:241.2,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.8633,x:973.1,y:321.3,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.522,x:809.5,y:455.05,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.228,x:952.55,y:382.6,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-34.3755,x:726.1,y:557.65,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-17.9936,x:614,y:534.85,regY:14}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-21.9348,x:460.65,y:648.9,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7632,rotation:-151.676,x:648.05,y:403.2,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:40.8585,x:540.9,y:421.45,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:48.2921,x:427.25,y:429.4,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.7839,x:975.5,y:460,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8032,x:981.95,y:540.95,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1461,x:1076.3,y:410.05,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:80.926,x:901.1,y:277.7,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6784,x:807.15,y:325.3,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:15.6778,x:851.25,y:241.15,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.8528,x:973.15,y:321.25,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8066,rotation:19.5206,x:809.5,y:455.05,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6729,scaleY:0.6729,rotation:1.2332,x:952.5,y:382.6,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-35.9236,x:726.6,y:558.05,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-24.2714,x:613.8,y:538.25,regY:13.9}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-30.1855,x:474.05,y:668.55,regY:94.8}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:-158.8377,x:644.75,y:414.95,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:33.9785,x:540.75,y:446.35,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:46.258,x:428.8,y:467.75,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.7893,x:975.5,y:460,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8086,x:981.95,y:540.95,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1382,x:1076.3,y:410.1,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:82.099,x:901.35,y:279.2,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7149,x:807.15,y:325.2,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.6,scaleX:0.6732,scaleY:0.6732,rotation:15.7144,x:851.25,y:241.2,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.8581,x:973.05,y:321.25,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8066,rotation:19.5206,x:809.45,y:455.05,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6729,scaleY:0.6729,rotation:1.2384,x:952.4,y:382.6,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-37.4707,x:727.15,y:558.4,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-30.5501,x:613.9,y:541.75,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-38.4362,x:489.05,y:686.45,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:-166.0014,x:642.3,y:426.9,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.6,regY:129.9,rotation:27.0988,x:542.95,y:471.05,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:44.2254,x:434.45,y:505.7,regY:38}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.7962,x:975.5,y:459.95,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8143,x:981.9,y:540.85,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1328,x:1076.3,y:410.15,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:83.2408,x:901.55,y:280.7,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7212,x:807.15,y:325.15,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.6,scaleX:0.6732,scaleY:0.6732,rotation:15.7206,x:851.25,y:241.25,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.8633,x:973.05,y:321.25,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8066,rotation:19.5192,x:809.45,y:455.05,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.228,x:952.5,y:382.55,regX:55.9}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-39.0178,x:727.6,y:558.9,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-36.8294,x:613.9,y:545.25,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-46.6863,x:505.7,y:702.65,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7632,rotation:-173.165,x:640.75,y:438.9,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:20.2187,x:547.7,y:495.05,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:42.1919,x:444.1,y:542.6,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.7839,x:975.45,y:459.9,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8032,x:981.95,y:540.85,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1398,x:1076.25,y:410.1,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:84.3979,x:901.75,y:282.2,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7401,x:807.2,y:325.05,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.6,scaleX:0.6732,scaleY:0.6732,rotation:15.7408,x:851.25,y:241.2,regX:42.6}},{t:this.ikNode_15,p:{rotation:6.8515,x:973.1,y:321.2,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5182,x:809.35,y:455.05,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6729,scaleY:0.6729,rotation:1.2436,x:952.4,y:382.6,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-40.5659,x:728.15,y:559.1,regY:172.7}},{t:this.ikNode_4,p:{regX:257.5,scaleX:0.6728,scaleY:0.6728,rotation:-43.1078,x:614.05,y:548.8,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-54.9374,x:523.8,y:717,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7632,rotation:179.678,x:639.9,y:450.95,regX:189.1,regY:94.1}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:13.3381,x:554.65,y:518.25,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:40.1575,x:457.5,y:577.75,regY:38}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.8012,x:975.45,y:459.95,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.818,x:981.9,y:540.85,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.125,x:1076.25,y:410.15,regX:39.4}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:85.546,x:901.95,y:283.7,scaleY:0.7965}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7536,x:807.3,y:325.05,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:15.7531,x:851.4,y:241.1,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.866,x:973.05,y:321.15,regX:91.3,regY:167.6}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5172,x:809.45,y:455.05,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.2306,x:952.5,y:382.55,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-42.1128,x:728.6,y:559.55,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-49.3871,x:614.25,y:552.15,regY:13.9}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-63.188,x:543.1,y:729.35,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:172.5141,x:640.1,y:462.6,regX:189,regY:94.1}},{t:this.ikNode_7,p:{regX:94.6,regY:129.9,rotation:6.4582,x:563.7,y:540,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:38.1234,x:474.45,y:610.7,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.788,x:975.45,y:459.9,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8061,x:981.95,y:540.8,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1357,x:1076.2,y:410.05,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:86.6891,x:902.15,y:285.25,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7606,x:807.35,y:325,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:15.7613,x:851.5,y:241.05,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.8528,x:973.1,y:321.15,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5162,x:809.45,y:455,regX:238.2}},{t:this.ikNode_2,p:{regY:77.7,scaleX:0.6728,scaleY:0.6728,rotation:1.2709,x:952.45,y:381.7,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-45.7176,x:744.75,y:570.15,regY:172.8}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-56.986,x:630.1,y:569.95,regY:13.9}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-71.6933,x:582.95,y:754.95,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7632,rotation:170.702,x:640.7,y:470.9,regX:189,regY:94.1}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:4.2265,x:566.85,y:550.85,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:28.6692,x:480.35,y:624.95,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.7946,x:975.45,y:459.85,regY:72.5}},{t:this.ikNode_10,p:{regY:238.8,rotation:16.8114,x:981.85,y:540.8,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1265,x:1076.25,y:410.05,regX:39.4}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:85.1056,x:903.25,y:284.25,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7606,x:807.3,y:324.85,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:15.7601,x:851.5,y:240.85,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.8594,x:973.05,y:321.1,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5162,x:809.4,y:454.95,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.2995,x:952.3,y:380.7,regX:55.8}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-49.3226,x:763.3,y:578.8,regY:172.7}},{t:this.ikNode_4,p:{regX:257.5,scaleX:0.6728,scaleY:0.6728,rotation:-64.5822,x:649,y:586,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-80.2004,x:626.7,y:775.45,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7632,rotation:168.8903,x:641.55,y:479.35,regX:189.1,regY:94.2}},{t:this.ikNode_7,p:{regX:94.6,regY:129.9,rotation:1.9934,x:570.4,y:561.6,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:19.2136,x:486.9,y:638.9,regY:38}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.788,x:975.45,y:459.8,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8061,x:981.9,y:540.7,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1303,x:1076.2,y:410,regX:39.4}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:83.5095,x:904.4,y:283.25,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.747,x:807.25,y:324.75,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.6,scaleX:0.6732,scaleY:0.6732,rotation:15.7477,x:851.4,y:240.8,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.8528,x:973.1,y:321,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5162,x:809.4,y:454.95,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.3216,x:952.25,y:379.75,regX:55.9}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-52.9271,x:783.7,y:584.45,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-72.181,x:670.1,y:598.8,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-88.7057,x:673,y:789.55,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:167.0776,x:643.05,y:487.7,regX:189.1,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-0.234,x:574.6,y:572.25,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:9.7575,x:494.1,y:652.75,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.7769,x:975.45,y:459.7,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.7925,x:981.85,y:540.65,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1398,x:1076.15,y:409.9,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:81.8994,x:905.5,y:282.3,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7212,x:807.15,y:324.75,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.6,scaleX:0.6732,scaleY:0.6732,rotation:15.7206,x:851.25,y:240.8,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.8411,x:972.95,y:320.85,regX:91.3,regY:167.6}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5151,x:809.3,y:454.9,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.3554,x:952.15,y:378.85,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-56.5316,x:804.3,y:586.85,regY:172.8}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-79.7791,x:691.75,y:608.25,regY:14}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-97.2048,x:719.8,y:797,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7632,rotation:165.2656,x:645,y:496.1,regX:189,regY:94.1}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-2.4671,x:579.05,y:582.6,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6729,scaleY:0.6729,rotation:0.3015,x:501.9,y:666.15,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.7744,x:975.45,y:459.55,regY:72.4}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.7921,x:981.9,y:540.6,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1372,x:1076.05,y:409.8,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:80.3064,x:906.6,y:281.35,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7105,x:807.15,y:324.8,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.6,scaleX:0.6732,scaleY:0.6732,rotation:15.7112,x:851.2,y:240.75,regX:42.6}},{t:this.ikNode_15,p:{rotation:6.8411,x:972.95,y:320.8,regX:91.3,regY:167.6}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5148,x:809.3,y:454.85,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.3827,x:952.1,y:377.9,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-60.1354,x:823.4,y:586.05,regY:172.7}},{t:this.ikNode_4,p:{regX:257.5,scaleX:0.6728,scaleY:0.6728,rotation:-87.3769,x:712.5,y:614.8,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-105.7112,x:765.3,y:797.9,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:163.4529,x:647.25,y:504.1,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-4.6998,x:584.1,y:592.9,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-9.1475,x:510.2,y:679.3,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:16.7691,x:975.4,y:459.45,regY:72.4}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.7855,x:981.9,y:540.5,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:-13.1423,x:1076.05,y:409.75,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.7267,x:907.6,y:280.5,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7149,x:807.2,y:324.95,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.6,scaleX:0.6732,scaleY:0.6732,rotation:15.7144,x:851.3,y:240.85,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.8345,x:972.85,y:320.8,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8066,rotation:19.5113,x:809.25,y:454.8,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.3814,x:952,y:378.55,regX:55.9}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-72.7908,x:826.55,y:585.6,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-101.4353,x:724.75,y:637.8,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-119.7757,x:820.45,y:802.7,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7632,rotation:161.5713,x:655.8,y:526.6,regX:189,regY:94.1}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-7.5546,x:595.8,y:617.4,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-6.7504,x:526.2,y:707.2,regY:38}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:8.9601,x:978.6,y:458.15,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:15.6201,x:996.05,y:537.6,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:12.1154,x:1087.5,y:405.05,regX:39.3}},{t:this.ikNode_12,p:{regY:-0.1,scaleX:0.8149,rotation:78.2968,x:902.4,y:281.2,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:27.5565,x:795.7,y:320.45,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:27.6971,x:856.25,y:247.15,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.8188,x:972.55,y:320.7,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5107,x:809.15,y:454.7,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.3671,x:951.85,y:379.15,regX:55.8}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-85.4461,x:829.8,y:585,regY:172.8}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-115.5004,x:741.85,y:658.35,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-133.8422,x:874.75,y:795,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7632,rotation:159.6859,x:668.6,y:548.9,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-10.4111,x:611.55,y:641.55,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-4.3533,x:546.45,y:734.95,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:1.1388,x:981.7,y:456.65,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:14.4439,x:1009.85,y:532.95,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:37.3674,x:1098.55,y:398.7,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:77.8682,x:896.85,y:282.05,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:39.3989,x:784.65,y:315.8,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:39.6827,x:858.9,y:256.55,regX:42.6}},{t:this.ikNode_15,p:{rotation:6.7915,x:972.2,y:320.45,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5073,x:809.1,y:454.55,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.3762,x:951.85,y:379.8,regX:55.9}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-98.0961,x:833,y:584.4,regY:172.8}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-129.5662,x:763.2,y:675.2,regY:14}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-147.9092,x:925.35,y:775.25,regY:94.8}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:157.8023,x:684.9,y:569.7,regX:189.1,regY:94.1}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-13.2684,x:631.05,y:664,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:-1.9573,x:570.6,y:760.5,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:-6.6508,x:984.85,y:455.05,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:13.2896,x:1023.1,y:526.7,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:62.6445,x:1109,y:390.9,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:77.4402,x:891.7,y:283.1,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:51.2447,x:774.05,y:311.3,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:51.67,x:859.05,y:268.85,regX:42.8}},{t:this.ikNode_15,p:{rotation:6.7874,x:971.9,y:320.25,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.1,scaleY:0.8066,rotation:19.5045,x:809.05,y:454.35,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.3749,x:951.75,y:380.4,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-110.7498,x:836,y:583.6,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-143.6319,x:788,y:687.55,regY:13.9}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-161.9747,x:969.5,y:745.3,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:155.9171,x:703.85,y:587.15,regX:189.1,regY:94.1}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-16.1238,x:653.15,y:683.1,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:0.434,x:597.55,y:782.5,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:-14.4597,x:987.75,y:453.1,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:12.1253,x:1035.55,y:519.05,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:87.9072,x:1118.65,y:381.65,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:77.0158,x:886.55,y:284.3,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:63.0906,x:764,y:306.95,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:63.6586,x:855.95,y:282.85,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.7718,x:971.6,y:320.1,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.1,scaleY:0.8065,rotation:19.5038,x:809,y:454.15,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.3723,x:951.7,y:381.1,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-123.4064,x:839.15,y:582.85,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-157.6979,x:815.2,y:694.7,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-176.0415,x:1005.15,y:706.6,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:154.032,x:723.85,y:600.6,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-18.9805,x:676.25,y:698.2,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:2.8312,x:625.65,y:800.2,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:-22.2685,x:990.7,y:451.15,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.9589,x:1047,y:509.9,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:113.1641,x:1127.35,y:371,regX:39.2}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.6056,x:881.6,y:285.65,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9546,x:754.35,y:302.85,regY:187.9,regX:4.5}},{t:this.ikNode_14,p:{regY:144.6,scaleX:0.6732,scaleY:0.6732,rotation:75.6614,x:849.2,y:298.3,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.7562,x:971.2,y:320,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5018,x:847.15,y:444.65,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.3567,x:989.85,y:371.45,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-110.9023,x:877.45,y:573.15,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-141.698,x:829.85,y:677.3,regY:13.9}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-166.0886,x:1009.1,y:741,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:155.9321,x:737.75,y:573.8,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.6,regY:129.9,rotation:-15.8831,x:687,y:669.9,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:0.2157,x:631,y:769,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:-22.2825,x:1028.85,y:441.45,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.9441,x:1085.1,y:500.2,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:113.1496,x:1165.55,y:361.3,regX:39.2}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.6045,x:919.8,y:276,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9517,x:792.5,y:293.2,regY:187.9,regX:4.5}},{t:this.ikNode_14,p:{regY:144.6,scaleX:0.6732,scaleY:0.6732,rotation:75.6601,x:887.35,y:288.6,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.7417,x:1009.4,y:310.35,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5014,x:885.3,y:435.1,regX:238.2}},{t:this.ikNode_2,p:{regY:77.7,scaleX:0.6728,scaleY:0.6728,rotation:1.3476,x:1028.05,y:361.9,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-98.3967,x:915.75,y:563.6,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-125.7001,x:846.8,y:654.8,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-156.137,x:1001.6,y:765.55,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:157.8296,x:752.95,y:540.55,regX:189,regY:94}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-12.7884,x:699,y:634.7,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:-2.3942,x:637.55,y:730.65,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:-22.2895,x:1067.05,y:431.9,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.9349,x:1123.4,y:490.6,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:113.1414,x:1203.65,y:351.75,regX:39.4}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.6021,x:957.95,y:266.4,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9505,x:830.65,y:283.65,regY:187.9,regX:4.5}},{t:this.ikNode_14,p:{regY:144.6,scaleX:0.6732,scaleY:0.6732,rotation:75.6589,x:925.55,y:278.95,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.7314,x:1047.5,y:300.8,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5,x:923.55,y:425.4,regX:238.2}},{t:this.ikNode_2,p:{regY:77.7,scaleX:0.6728,scaleY:0.6728,rotation:1.3372,x:1066.3,y:352.25,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6729,scaleY:0.6729,rotation:-85.8983,x:954.1,y:553.9,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-109.7002,x:867,y:628.1,regY:14}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-146.1845,x:985.2,y:777.15,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:159.7257,x:772.3,y:501.8,regX:189.1,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-9.6914,x:715.4,y:594.25,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-5.009,x:649.05,y:686.75,regY:38.1}},{t:this.ikNode_9,p:{regX:40,scaleX:0.6726,scaleY:0.6726,rotation:-22.2953,x:1105.2,y:422.3,regY:72.5}},{t:this.ikNode_10,p:{regY:238.8,rotation:10.9255,x:1161.65,y:481.1,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:113.1315,x:1241.85,y:342.1,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5819,x:996.1,y:256.85,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9303,x:868.9,y:274,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:75.64,x:963.8,y:269.45,regX:42.8}},{t:this.ikNode_15,p:{rotation:6.722,x:1085.8,y:291.2,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.499,x:961.75,y:415.85,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.3203,x:1104.45,y:342.6,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-73.3938,x:992.4,y:544.3,regY:172.7}},{t:this.ikNode_4,p:{regX:257.5,scaleX:0.6728,scaleY:0.6728,rotation:-93.7046,x:891.3,y:598,regY:13.9}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-136.2322,x:963.9,y:773.7,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:161.6253,x:798.55,y:461.2,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-6.5969,x:738.6,y:551.85,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-7.624,x:667.3,y:640.5,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:-22.3122,x:1143.35,y:412.6,regY:72.5}},{t:this.ikNode_10,p:{regY:238.8,rotation:10.9097,x:1199.8,y:471.45,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:113.1146,x:1280.05,y:332.35,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5941,x:1034.3,y:247.15,scaleY:0.7965}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9426,x:907.1,y:264.4,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.6,scaleX:0.6732,scaleY:0.6732,rotation:75.6507,x:1001.9,y:259.75,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.7051,x:1123.85,y:281.55,regX:91.2,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.4966,x:999.9,y:406.15,regX:238.2}},{t:this.ikNode_2,p:{regY:77.5,scaleX:0.6728,scaleY:0.6728,rotation:1.332,x:1142.7,y:333,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-60.8906,x:1030.7,y:534.7,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-77.7119,x:920.5,y:565.15,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-126.2797,x:941.75,y:754.15,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:163.5225,x:831.4,y:422.45,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-3.5007,x:768.3,y:510.95,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:-10.2391,x:692.3,y:595.75,regY:38.1}},{t:this.ikNode_9,p:{regX:40,scaleX:0.6726,scaleY:0.6726,rotation:-22.297,x:1181.55,y:403.1,regY:72.5}},{t:this.ikNode_10,p:{regY:238.8,rotation:10.9204,x:1238,y:461.9,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:113.1274,x:1318.2,y:322.85,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5976,x:1072.5,y:237.55,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9467,x:945.35,y:254.8,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.6,scaleX:0.6732,scaleY:0.6732,rotation:75.6548,x:1040.15,y:250.15,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.7156,x:1162.15,y:272.1,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.4966,x:1108.7,y:376.05,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.3125,x:1251.35,y:302.95,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-66.1602,x:1144.25,y:503.35,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-86.5531,x:1037.15,y:543.85,regY:13.9}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-135.1204,x:1087.25,y:727.25,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:159.9555,x:942.5,y:408.7,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-6.02,x:885.15,y:500.85,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-12.7601,x:813,y:588.9,regY:38}},{t:this.ikNode_9,p:{regX:40,scaleX:0.6726,scaleY:0.6726,rotation:-22.3134,x:1290.3,y:372.95,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.9033,x:1346.85,y:431.6,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:113.1088,x:1427.05,y:292.6,regX:39.2}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5941,x:1181.3,y:207.45,scaleY:0.7965}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9439,x:1054.05,y:224.65,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.6,scaleX:0.6732,scaleY:0.6732,rotation:75.6522,x:1148.9,y:220,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.6972,x:1270.9,y:241.85,regX:91.3,regY:167.6}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8066,rotation:19.4963,x:1217.45,y:345.95,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.319,x:1360.3,y:272.9,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-71.4278,x:1257.7,y:471.8,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-95.3901,x:1154.95,y:522,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-143.962,x:1232.55,y:695.55,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:156.3874,x:1055.6,y:395.45,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-8.5394,x:1003.95,y:491.2,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-15.2805,x:935.8,y:582.3,regY:38.1}},{t:this.ikNode_9,p:{regX:40,scaleX:0.6726,scaleY:0.6726,rotation:-22.3064,x:1399,y:342.85,regY:72.5}},{t:this.ikNode_10,p:{regY:238.8,rotation:10.9084,x:1455.6,y:401.65,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:103,scaleX:0.6727,scaleY:0.6727,rotation:113.1146,x:1535.85,y:262.55,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5976,x:1290.15,y:177.4,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9467,x:1162.9,y:194.55,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.6,scaleX:0.6732,scaleY:0.6732,rotation:75.6548,x:1257.7,y:190,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.7038,x:1379.65,y:211.85,regX:91.2,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8066,rotation:19.4952,x:1326.2,y:315.85,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.3021,x:1469,y:242.8,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-76.6974,x:1371.25,y:440.15,regY:172.8}},{t:this.ikNode_4,p:{regX:257.5,scaleX:0.6728,scaleY:0.6728,rotation:-104.2313,x:1273.55,y:499.6,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-152.8027,x:1376.7,y:659.15,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:152.8203,x:1170.55,y:382.4,regX:189,regY:94.1}},{t:this.ikNode_7,p:{regX:94.6,regY:129.9,rotation:-11.0596,x:1124.95,y:481.1,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-17.7997,x:1060.95,y:575,regY:38.1}},{t:this.ikNode_9,p:{regX:40,scaleX:0.6726,scaleY:0.6726,rotation:-22.3216,x:1507.75,y:312.6,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.8928,x:1564.4,y:371.4,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_11,p:{regY:102.9,scaleX:0.6727,scaleY:0.6727,rotation:113.0989,x:1644.75,y:232.45,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5816,x:1398.9,y:147.3,scaleY:0.7965}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9303,x:1271.6,y:164.45,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:75.6387,x:1366.5,y:159.9,regX:42.8}},{t:this.ikNode_15,p:{rotation:6.6868,x:1488.45,y:181.65,regX:91.3,regY:167.6}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.4942,x:1434.9,y:285.7,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.2891,x:1577.85,y:212.7,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-81.9682,x:1484.55,y:408.25,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-113.0727,x:1392.75,y:476.35,regY:14}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-161.6423,x:1519.25,y:618.15,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:149.2517,x:1287.4,y:368.65,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.6,regY:129.8,rotation:-13.58,x:1248,y:469.9,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-20.3214,x:1188.15,y:566.7,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:-22.332,x:1616.55,y:282.4,regY:72.4}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.8793,x:1673.2,y:341.25,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:102.9,scaleX:0.6727,scaleY:0.6727,rotation:113.0849,x:1753.45,y:202.25,regX:39.2}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5808,x:1507.7,y:117.2,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9291,x:1380.3,y:134.35,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:75.6371,x:1475.25,y:129.8,regX:42.8}},{t:this.ikNode_15,p:{rotation:6.6737,x:1597.2,y:151.7,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.4942,x:1543.65,y:255.6,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.2904,x:1686.55,y:182.65,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-87.2378,x:1597.9,y:376.15,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-121.9145,x:1512.75,y:452.5,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-170.4824,x:1659.55,y:573.2,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:145.6853,x:1405.8,y:353.7,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-16.102,x:1372.95,y:457.35,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-22.8405,x:1317.4,y:556.55,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:-22.3274,x:1725.35,y:252.3,regY:72.4}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.8819,x:1782.05,y:311.1,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:102.9,scaleX:0.6727,scaleY:0.6727,rotation:113.0873,x:1862.25,y:172.2,regX:39.2}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5819,x:1616.5,y:87.15,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9316,x:1489.1,y:104.3,regY:187.8,regX:4.6}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:75.64,x:1584.05,y:99.75,regX:42.8}},{t:this.ikNode_15,p:{rotation:6.6763,x:1705.95,y:121.6,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.4932,x:1652.45,y:225.5,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.2917,x:1795.35,y:152.6,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-92.5008,x:1711.1,y:344,regY:172.7}},{t:this.ikNode_4,p:{regX:257.6,scaleX:0.6728,scaleY:0.6728,rotation:-130.7566,x:1633.35,y:427.8,regY:14}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-179.323,x:1796.85,y:524.5,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:142.1181,x:1525.35,y:337.3,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.6,regY:129.9,rotation:-18.6212,x:1498.9,y:442.8,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-25.3621,x:1447.95,y:544.35,regY:38.1}},{t:this.ikNode_9,p:{regX:40,scaleX:0.6726,scaleY:0.6726,rotation:-22.3233,x:1834,y:222.3,regY:72.5}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.8844,x:1890.7,y:281,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{regY:102.9,scaleX:0.6727,scaleY:0.6727,rotation:113.089,x:1971.1,y:142.05,regX:39.2}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5853,x:1725.35,y:57.05,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9332,x:1597.85,y:74.15,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:75.6415,x:1692.75,y:69.55,regX:42.6}},{t:this.ikNode_15,p:{rotation:6.6776,x:1814.7,y:91.65,regX:91.2,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.4918,x:1761.2,y:195.45,regX:238.2}},{t:this.ikNode_2,p:{regY:77.6,scaleX:0.6728,scaleY:0.6728,rotation:1.2852,x:1904.2,y:122.6,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-97.7694,x:1824.25,y:311.55,regY:172.8}},{t:this.ikNode_4,p:{regX:257.5,scaleX:0.6728,scaleY:0.6728,rotation:-139.5991,x:1754.55,y:402.3,regY:14}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:171.8421,x:1931,y:472.65,regY:94.7}},{t:this.ikNode_6,p:{scaleX:0.7631,rotation:138.5523,x:1645.75,y:318.95,regX:189,regY:94.2}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-21.1404,x:1625.85,y:425.9,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-27.8825,x:1579.3,y:529.65,regY:38.1}},{t:this.ikNode_9,p:{regX:40.1,scaleX:0.6726,scaleY:0.6726,rotation:-22.3286,x:1942.85,y:192.05,regY:72.4}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.8783,x:1999.5,y:250.95,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_11,p:{regY:102.9,scaleX:0.6727,scaleY:0.6727,rotation:113.0832,x:2079.85,y:112,regX:39.2}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5853,x:1834.1,y:26.95,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9332,x:1706.65,y:44.05,regY:187.8,regX:4.5}},{t:this.ikNode_14,p:{regY:144.5,scaleX:0.6732,scaleY:0.6732,rotation:75.6428,x:1801.55,y:39.6,regX:42.7}},{t:this.ikNode_15,p:{rotation:6.6711,x:1923.55,y:61.6,regX:91.3,regY:167.7}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.Untitled1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,54];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_1 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_2 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_3 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_4 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_5 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_6 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_7 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_8 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_9 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_10 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_11 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_12 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_16 = this.Слой_8.ikNode_16;
		this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_13 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_14 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_15 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_16 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_17 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_18 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_19 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_16 = undefined;this.ikNode_16 = this.Слой_8.ikNode_16;
		this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_20 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_21 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_22 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_23 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_24 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_16 = undefined;this.ikNode_16 = this.Слой_8.ikNode_16;
		this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_25 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_26 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_27 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_28 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_29 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_16 = undefined;this.ikNode_16 = this.Слой_8.ikNode_16;
		this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_30 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_31 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_32 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_33 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_34 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_16 = undefined;this.ikNode_16 = this.Слой_8.ikNode_16;
		this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_35 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_36 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_37 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_38 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_39 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_40 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_41 = function() {
		this.ikNode_1 = undefined;this.ikNode_2 = undefined;this.ikNode_3 = undefined;this.ikNode_4 = undefined;this.ikNode_5 = undefined;this.ikNode_6 = undefined;this.ikNode_7 = undefined;this.ikNode_8 = undefined;this.ikNode_9 = undefined;this.ikNode_10 = undefined;this.ikNode_11 = undefined;this.ikNode_12 = undefined;this.ikNode_13 = undefined;this.ikNode_14 = undefined;this.ikNode_15 = undefined;this.ikNode_16 = undefined;this.ikNode_16 = this.Слой_8.ikNode_16;
		this.ikNode_1 = this.Каркас_5.ikNode_1;
		this.ikNode_2 = this.Каркас_5.ikNode_2;
		this.ikNode_3 = this.Каркас_5.ikNode_3;
		this.ikNode_4 = this.Каркас_5.ikNode_4;
		this.ikNode_5 = this.Каркас_5.ikNode_5;
		this.ikNode_6 = this.Каркас_5.ikNode_6;
		this.ikNode_7 = this.Каркас_5.ikNode_7;
		this.ikNode_8 = this.Каркас_5.ikNode_8;
		this.ikNode_9 = this.Каркас_5.ikNode_9;
		this.ikNode_10 = this.Каркас_5.ikNode_10;
		this.ikNode_11 = this.Каркас_5.ikNode_11;
		this.ikNode_12 = this.Каркас_5.ikNode_12;
		this.ikNode_13 = this.Каркас_5.ikNode_13;
		this.ikNode_14 = this.Каркас_5.ikNode_14;
		this.ikNode_15 = this.Каркас_5.ikNode_15;
	}
	this.frame_54 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1).call(this.frame_3).wait(1).call(this.frame_4).wait(1).call(this.frame_5).wait(1).call(this.frame_6).wait(1).call(this.frame_7).wait(1).call(this.frame_8).wait(1).call(this.frame_9).wait(1).call(this.frame_10).wait(1).call(this.frame_11).wait(1).call(this.frame_12).wait(1).call(this.frame_13).wait(1).call(this.frame_14).wait(1).call(this.frame_15).wait(1).call(this.frame_16).wait(1).call(this.frame_17).wait(1).call(this.frame_18).wait(1).call(this.frame_19).wait(1).call(this.frame_20).wait(1).call(this.frame_21).wait(1).call(this.frame_22).wait(1).call(this.frame_23).wait(1).call(this.frame_24).wait(1).call(this.frame_25).wait(1).call(this.frame_26).wait(1).call(this.frame_27).wait(1).call(this.frame_28).wait(1).call(this.frame_29).wait(1).call(this.frame_30).wait(1).call(this.frame_31).wait(1).call(this.frame_32).wait(1).call(this.frame_33).wait(1).call(this.frame_34).wait(1).call(this.frame_35).wait(1).call(this.frame_36).wait(1).call(this.frame_37).wait(1).call(this.frame_38).wait(1).call(this.frame_39).wait(1).call(this.frame_40).wait(1).call(this.frame_41).wait(13).call(this.frame_54).wait(1));

	// Каркас_23___копия_obj_
	this.Каркас_23___копия = new lib.Scene_1_Каркас_23___копия();
	this.Каркас_23___копия.name = "Каркас_23___копия";
	this.Каркас_23___копия.setTransform(1454.4,-449.2,1,1,0,0,0,1454.4,-449.2);
	this.Каркас_23___копия.depth = 0;
	this.Каркас_23___копия.isAttachedToCamera = 0
	this.Каркас_23___копия.isAttachedToMask = 0
	this.Каркас_23___копия.layerDepth = 0
	this.Каркас_23___копия.layerIndex = 0
	this.Каркас_23___копия.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Каркас_23___копия).wait(30).to({regX:10815.1,regY:-19176.5,scaleX:0.0502,scaleY:0.0502,depth:10000},0).wait(1).to({regX:1454.4,regY:-449.2,scaleX:1,scaleY:1,depth:0},0).wait(24));

	// Каркас_23_obj_
	this.Каркас_23 = new lib.Scene_1_Каркас_23();
	this.Каркас_23.name = "Каркас_23";
	this.Каркас_23.setTransform(1826.7,-222.8,1,1,0,0,0,1826.7,-222.8);
	this.Каркас_23.depth = 0;
	this.Каркас_23.isAttachedToCamera = 0
	this.Каркас_23.isAttachedToMask = 0
	this.Каркас_23.layerDepth = 0
	this.Каркас_23.layerIndex = 1
	this.Каркас_23.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Каркас_23).wait(55));

	// Слой_8_obj_
	this.Слой_8 = new lib.Scene_1_Слой_8();
	this.Слой_8.name = "Слой_8";
	this.Слой_8.setTransform(1679.5,232.3,1,1,0,0,0,1679.5,232.3);
	this.Слой_8.depth = 0;
	this.Слой_8.isAttachedToCamera = 0
	this.Слой_8.isAttachedToMask = 0
	this.Слой_8.layerDepth = 0
	this.Слой_8.layerIndex = 2
	this.Слой_8.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Слой_8).wait(41).to({_off:true},1).wait(13));

	// Каркас_5_obj_
	this.Каркас_5 = new lib.Scene_1_Каркас_5();
	this.Каркас_5.name = "Каркас_5";
	this.Каркас_5.setTransform(1667.5,244.3,1,1,0,0,0,1667.5,244.3);
	this.Каркас_5.depth = 0;
	this.Каркас_5.isAttachedToCamera = 0
	this.Каркас_5.isAttachedToMask = 0
	this.Каркас_5.layerDepth = 0
	this.Каркас_5.layerIndex = 3
	this.Каркас_5.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Каркас_5).wait(41).to({_off:true},1).wait(13));

	// Layer_1_obj_
	this.Layer_1 = new lib.Scene_1_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.setTransform(953.4,292.5,1,1,0,0,0,953.4,292.5);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 4
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(41).to({_off:true},1).wait(13));

	// Слой_7_obj_
	this.Слой_7 = new lib.Scene_1_Слой_7();
	this.Слой_7.name = "Слой_7";
	this.Слой_7.setTransform(2041,150.6,1,1,0,0,0,2041,150.6);
	this.Слой_7.depth = 0;
	this.Слой_7.isAttachedToCamera = 0
	this.Слой_7.isAttachedToMask = 0
	this.Слой_7.layerDepth = 0
	this.Слой_7.layerIndex = 5
	this.Слой_7.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Слой_7).wait(41).to({_off:true},1).wait(13));

	// Слой_9_obj_
	this.Слой_9 = new lib.Scene_1_Слой_9();
	this.Слой_9.name = "Слой_9";
	this.Слой_9.depth = 0;
	this.Слой_9.isAttachedToCamera = 0
	this.Слой_9.isAttachedToMask = 0
	this.Слой_9.layerDepth = 0
	this.Слой_9.layerIndex = 6
	this.Слой_9.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Слой_9).wait(5).to({_off:true},37).wait(13));

	// Слой_11_obj_
	this.Слой_11 = new lib.Scene_1_Слой_11();
	this.Слой_11.name = "Слой_11";
	this.Слой_11.setTransform(895.8,688.1,1,1,0,0,0,895.8,688.1);
	this.Слой_11.depth = 0;
	this.Слой_11.isAttachedToCamera = 0
	this.Слой_11.isAttachedToMask = 0
	this.Слой_11.layerDepth = 0
	this.Слой_11.layerIndex = 7
	this.Слой_11.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Слой_11).wait(55));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(424.3,-546.9,2521.2999999999997,1934.5);
// library properties:
lib.properties = {
	id: '4560913AEE81BC46B002FCE291DF372E',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_168.png", id:"CachedBmp_168"},
		{src:"images/CachedBmp_170.png", id:"CachedBmp_170"},
		{src:"images/CachedBmp_167.png", id:"CachedBmp_167"},
		{src:"images/CachedBmp_166.png", id:"CachedBmp_166"},
		{src:"images/CachedBmp_165.png", id:"CachedBmp_165"},
		{src:"images/CachedBmp_171.png", id:"CachedBmp_171"},
		{src:"images/CachedBmp_169.png", id:"CachedBmp_169"},
		{src:"images/CachedBmp_163.png", id:"CachedBmp_163"},
		{src:"images/CachedBmp_161.png", id:"CachedBmp_161"},
		{src:"images/CachedBmp_162.png", id:"CachedBmp_162"},
		{src:"images/CachedBmp_160.png", id:"CachedBmp_160"},
		{src:"images/CachedBmp_158.png", id:"CachedBmp_158"},
		{src:"images/CachedBmp_149.png", id:"CachedBmp_149"},
		{src:"images/CachedBmp_150.png", id:"CachedBmp_150"},
		{src:"images/CachedBmp_143.png", id:"CachedBmp_143"},
		{src:"images/CachedBmp_141.png", id:"CachedBmp_141"},
		{src:"images/CachedBmp_138.png", id:"CachedBmp_138"},
		{src:"images/CachedBmp_139.png", id:"CachedBmp_139"},
		{src:"images/CachedBmp_140.png", id:"CachedBmp_140"},
		{src:"images/CachedBmp_131.png", id:"CachedBmp_131"},
		{src:"images/CachedBmp_132.png", id:"CachedBmp_132"},
		{src:"images/CachedBmp_137.png", id:"CachedBmp_137"},
		{src:"images/CachedBmp_135.png", id:"CachedBmp_135"},
		{src:"images/CachedBmp_134.png", id:"CachedBmp_134"},
		{src:"images/CachedBmp_136.png", id:"CachedBmp_136"},
		{src:"images/CachedBmp_133.png", id:"CachedBmp_133"},
		{src:"images/CachedBmp_127.png", id:"CachedBmp_127"},
		{src:"images/CachedBmp_128.png", id:"CachedBmp_128"},
		{src:"images/CachedBmp_126.png", id:"CachedBmp_126"},
		{src:"images/CachedBmp_124.png", id:"CachedBmp_124"},
		{src:"images/CachedBmp_125.png", id:"CachedBmp_125"},
		{src:"images/CachedBmp_171копия.png", id:"CachedBmp_171копия"},
		{src:"images/CachedBmp_123.png", id:"CachedBmp_123"},
		{src:"images/CachedBmp_120.png", id:"CachedBmp_120"},
		{src:"images/CachedBmp_121.png", id:"CachedBmp_121"},
		{src:"images/CachedBmp_119.png", id:"CachedBmp_119"},
		{src:"images/CachedBmp_118.png", id:"CachedBmp_118"},
		{src:"images/CachedBmp_159.png", id:"CachedBmp_159"},
		{src:"images/CachedBmp_116.png", id:"CachedBmp_116"},
		{src:"images/CachedBmp_108.png", id:"CachedBmp_108"},
		{src:"images/CachedBmp_107.png", id:"CachedBmp_107"},
		{src:"images/CachedBmp_106.png", id:"CachedBmp_106"},
		{src:"images/CachedBmp_101.png", id:"CachedBmp_101"},
		{src:"images/CachedBmp_142.png", id:"CachedBmp_142"},
		{src:"images/CachedBmp_99.png", id:"CachedBmp_99"},
		{src:"images/CachedBmp_98.png", id:"CachedBmp_98"},
		{src:"images/CachedBmp_97.png", id:"CachedBmp_97"},
		{src:"images/CachedBmp_91.png", id:"CachedBmp_91"},
		{src:"images/CachedBmp_95.png", id:"CachedBmp_95"},
		{src:"images/CachedBmp_96.png", id:"CachedBmp_96"},
		{src:"images/CachedBmp_94.png", id:"CachedBmp_94"},
		{src:"images/CachedBmp_93.png", id:"CachedBmp_93"},
		{src:"images/CachedBmp_130.png", id:"CachedBmp_130"},
		{src:"images/CachedBmp_92.png", id:"CachedBmp_92"},
		{src:"images/CachedBmp_256.png", id:"CachedBmp_256"},
		{src:"images/CachedBmp_89.png", id:"CachedBmp_89"},
		{src:"images/CachedBmp_90.png", id:"CachedBmp_90"},
		{src:"images/CachedBmp_86.png", id:"CachedBmp_86"},
		{src:"images/CachedBmp_85.png", id:"CachedBmp_85"},
		{src:"images/CachedBmp_508.png", id:"CachedBmp_508"},
		{src:"images/CachedBmp_507.png", id:"CachedBmp_507"},
		{src:"images/CachedBmp_506.png", id:"CachedBmp_506"},
		{src:"images/CachedBmp_505.png", id:"CachedBmp_505"},
		{src:"images/CachedBmp_503.png", id:"CachedBmp_503"},
		{src:"images/CachedBmp_504.png", id:"CachedBmp_504"},
		{src:"images/CachedBmp_499.png", id:"CachedBmp_499"},
		{src:"images/CachedBmp_498.png", id:"CachedBmp_498"},
		{src:"images/CachedBmp_501.png", id:"CachedBmp_501"},
		{src:"images/CachedBmp_500.png", id:"CachedBmp_500"},
		{src:"images/CachedBmp_496.png", id:"CachedBmp_496"},
		{src:"images/CachedBmp_488.png", id:"CachedBmp_488"},
		{src:"images/CachedBmp_487.png", id:"CachedBmp_487"},
		{src:"images/CachedBmp_486.png", id:"CachedBmp_486"},
		{src:"images/CachedBmp_341.png", id:"CachedBmp_341"},
		{src:"images/CachedBmp_481.png", id:"CachedBmp_481"},
		{src:"images/CachedBmp_477.png", id:"CachedBmp_477"},
		{src:"images/CachedBmp_479.png", id:"CachedBmp_479"},
		{src:"images/CachedBmp_478.png", id:"CachedBmp_478"},
		{src:"images/CachedBmp_476.png", id:"CachedBmp_476"},
		{src:"images/CachedBmp_474.png", id:"CachedBmp_474"},
		{src:"images/CachedBmp_469.png", id:"CachedBmp_469"},
		{src:"images/CachedBmp_475.png", id:"CachedBmp_475"},
		{src:"images/CachedBmp_470.png", id:"CachedBmp_470"},
		{src:"images/CachedBmp_471.png", id:"CachedBmp_471"},
		{src:"images/CachedBmp_472.png", id:"CachedBmp_472"},
		{src:"images/CachedBmp_473.png", id:"CachedBmp_473"},
		{src:"images/CachedBmp_464.png", id:"CachedBmp_464"},
		{src:"images/CachedBmp_465.png", id:"CachedBmp_465"},
		{src:"images/CachedBmp_462.png", id:"CachedBmp_462"},
		{src:"images/CachedBmp_463.png", id:"CachedBmp_463"},
		{src:"images/CachedBmp_466.png", id:"CachedBmp_466"},
		{src:"images/CachedBmp_461.png", id:"CachedBmp_461"},
		{src:"images/CachedBmp_509.png", id:"CachedBmp_509"},
		{src:"images/CachedBmp_459.png", id:"CachedBmp_459"},
		{src:"images/CachedBmp_457.png", id:"CachedBmp_457"},
		{src:"images/CachedBmp_456.png", id:"CachedBmp_456"},
		{src:"images/CachedBmp_458.png", id:"CachedBmp_458"},
		{src:"images/CachedBmp_497.png", id:"CachedBmp_497"},
		{src:"images/CachedBmp_454.png", id:"CachedBmp_454"},
		{src:"images/CachedBmp_446.png", id:"CachedBmp_446"},
		{src:"images/CachedBmp_445.png", id:"CachedBmp_445"},
		{src:"images/CachedBmp_439.png", id:"CachedBmp_439"},
		{src:"images/CachedBmp_480.png", id:"CachedBmp_480"},
		{src:"images/CachedBmp_437.png", id:"CachedBmp_437"},
		{src:"images/CachedBmp_436.png", id:"CachedBmp_436"},
		{src:"images/CachedBmp_435.png", id:"CachedBmp_435"},
		{src:"images/CachedBmp_434.png", id:"CachedBmp_434"},
		{src:"images/CachedBmp_433.png", id:"CachedBmp_433"},
		{src:"images/CachedBmp_429.png", id:"CachedBmp_429"},
		{src:"images/CachedBmp_427.png", id:"CachedBmp_427"},
		{src:"images/Иллюстрация_без_названия5_0000_Слой14.png", id:"Иллюстрация_без_названия5_0000_Слой14"},
		{src:"images/CachedBmp_432.png", id:"CachedBmp_432"},
		{src:"images/CachedBmp_431.png", id:"CachedBmp_431"},
		{src:"images/Иллюстрация_без_названия5_0002_Слой17.png", id:"Иллюстрация_без_названия5_0002_Слой17"},
		{src:"images/Иллюстрация_без_названия5_0005_Слой13.png", id:"Иллюстрация_без_названия5_0005_Слой13"},
		{src:"images/Иллюстрация_без_названия5_0006_Слой12.png", id:"Иллюстрация_без_названия5_0006_Слой12"},
		{src:"images/Иллюстрация_без_названия5_0003_Слой16.png", id:"Иллюстрация_без_названия5_0003_Слой16"},
		{src:"images/Иллюстрация_без_названия5_0009_Слой9.png", id:"Иллюстрация_без_названия5_0009_Слой9"},
		{src:"images/Иллюстрация_без_названия5_0010_Слой8.png", id:"Иллюстрация_без_названия5_0010_Слой8"},
		{src:"images/Иллюстрация_без_названия5_0012_Слой6.png", id:"Иллюстрация_без_названия5_0012_Слой6"},
		{src:"images/Иллюстрация_без_названия5_0013_Слой5.png", id:"Иллюстрация_без_названия5_0013_Слой5"},
		{src:"images/Иллюстрация_без_названия5_0014_Слой4.png", id:"Иллюстрация_без_названия5_0014_Слой4"},
		{src:"images/Иллюстрация_без_названия5_0015_Слой3.png", id:"Иллюстрация_без_названия5_0015_Слой3"},
		{src:"images/Иллюстрация_без_названия5_0016_Слой2.png", id:"Иллюстрация_без_названия5_0016_Слой2"},
		{src:"images/Иллюстрация_без_названия5_0017_Слой15pngкопия.png", id:"Иллюстрация_без_названия5_0017_Слой15pngкопия"},
		{src:"images/Иллюстрация_без_названия5_0008_Слой10.png", id:"Иллюстрация_без_названия5_0008_Слой10"},
		{src:"images/Иллюстрация_без_названия5_0001_Слой17.png", id:"Иллюстрация_без_названия5_0001_Слой17"},
		{src:"images/Иллюстрация_без_названия5_0007_Слой11.png", id:"Иллюстрация_без_названия5_0007_Слой11"},
		{src:"images/Иллюстрация_без_названия5_0011_Слой7.png", id:"Иллюстрация_без_названия5_0011_Слой7"},
		{src:"images/CachedBmp_468.png", id:"CachedBmp_468"},
		{src:"images/CachedBmp_428.png", id:"CachedBmp_428"},
		{src:"images/CachedBmp_430.png", id:"CachedBmp_430"},
		{src:"images/wing_atlas_1.png", id:"wing_atlas_1"},
		{src:"images/wing_atlas_2.png", id:"wing_atlas_2"},
		{src:"images/wing_atlas_3.png", id:"wing_atlas_3"},
		{src:"images/wing_atlas_4.png", id:"wing_atlas_4"},
		{src:"images/wing_atlas_5.png", id:"wing_atlas_5"},
		{src:"images/wing_atlas_6.png", id:"wing_atlas_6"},
		{src:"images/wing_atlas_7.png", id:"wing_atlas_7"},
		{src:"images/wing_atlas_8.png", id:"wing_atlas_8"},
		{src:"images/wing_atlas_9.png", id:"wing_atlas_9"},
		{src:"images/wing_atlas_10.png", id:"wing_atlas_10"},
		{src:"images/wing_atlas_11.png", id:"wing_atlas_11"},
		{src:"images/wing_atlas_12.png", id:"wing_atlas_12"},
		{src:"images/wing_atlas_13.png", id:"wing_atlas_13"},
		{src:"images/wing_atlas_14.png", id:"wing_atlas_14"},
		{src:"images/wing_atlas_15.png", id:"wing_atlas_15"},
		{src:"images/wing_atlas_16.png", id:"wing_atlas_16"},
		{src:"images/wing_atlas_17.png", id:"wing_atlas_17"},
		{src:"images/wing_atlas_18.png", id:"wing_atlas_18"},
		{src:"images/wing_atlas_19.png", id:"wing_atlas_19"},
		{src:"images/wing_atlas_20.png", id:"wing_atlas_20"},
		{src:"images/wing_atlas_21.png", id:"wing_atlas_21"},
		{src:"images/wing_atlas_22.png", id:"wing_atlas_22"},
		{src:"images/wing_atlas_23.png", id:"wing_atlas_23"},
		{src:"images/wing_atlas_24.png", id:"wing_atlas_24"},
		{src:"images/wing_atlas_25.png", id:"wing_atlas_25"},
		{src:"images/wing_atlas_26.png", id:"wing_atlas_26"},
		{src:"images/wing_atlas_27.png", id:"wing_atlas_27"},
		{src:"images/wing_atlas_28.png", id:"wing_atlas_28"},
		{src:"images/wing_atlas_29.png", id:"wing_atlas_29"},
		{src:"images/wing_atlas_30.png", id:"wing_atlas_30"},
		{src:"images/wing_atlas_31.png", id:"wing_atlas_31"},
		{src:"images/wing_atlas_32.png", id:"wing_atlas_32"},
		{src:"images/wing_atlas_33.png", id:"wing_atlas_33"},
		{src:"images/wing_atlas_34.png", id:"wing_atlas_34"},
		{src:"images/wing_atlas_35.png", id:"wing_atlas_35"},
		{src:"images/wing_atlas_36.png", id:"wing_atlas_36"},
		{src:"images/wing_atlas_37.png", id:"wing_atlas_37"},
		{src:"images/wing_atlas_38.png", id:"wing_atlas_38"},
		{src:"images/wing_atlas_39.png", id:"wing_atlas_39"},
		{src:"images/wing_atlas_40.png", id:"wing_atlas_40"},
		{src:"images/wing_atlas_41.png", id:"wing_atlas_41"},
		{src:"images/wing_atlas_42.png", id:"wing_atlas_42"},
		{src:"images/wing_atlas_43.png", id:"wing_atlas_43"},
		{src:"images/wing_atlas_44.png", id:"wing_atlas_44"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['4560913AEE81BC46B002FCE291DF372E'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;