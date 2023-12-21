(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"wing2_atlas_1", frames: [[0,0,1865,1770]]},
		{name:"wing2_atlas_2", frames: [[0,0,1842,1787]]},
		{name:"wing2_atlas_3", frames: [[0,0,1863,1763]]},
		{name:"wing2_atlas_4", frames: [[0,0,1845,1780]]},
		{name:"wing2_atlas_5", frames: [[0,0,1845,1780]]},
		{name:"wing2_atlas_6", frames: [[0,0,1789,1835]]},
		{name:"wing2_atlas_7", frames: [[0,0,1855,1769]]},
		{name:"wing2_atlas_8", frames: [[0,0,1783,1840]]},
		{name:"wing2_atlas_9", frames: [[0,0,1876,1748]]},
		{name:"wing2_atlas_10", frames: [[0,0,1833,1789]]},
		{name:"wing2_atlas_11", frames: [[0,0,1749,1873]]},
		{name:"wing2_atlas_12", frames: [[0,0,1749,1873]]},
		{name:"wing2_atlas_13", frames: [[0,0,1889,1734]]},
		{name:"wing2_atlas_14", frames: [[0,0,1714,1909]]},
		{name:"wing2_atlas_15", frames: [[0,0,1950,1677]]},
		{name:"wing2_atlas_16", frames: [[0,0,1895,1725]]},
		{name:"wing2_atlas_17", frames: [[0,0,1730,1887]]},
		{name:"wing2_atlas_18", frames: [[0,0,1704,1914]]},
		{name:"wing2_atlas_19", frames: [[0,0,1704,1914]]},
		{name:"wing2_atlas_20", frames: [[0,0,1769,1843]]},
		{name:"wing2_atlas_21", frames: [[0,0,1914,1701]]},
		{name:"wing2_atlas_22", frames: [[0,0,1732,1878]]},
		{name:"wing2_atlas_23", frames: [[0,0,1745,1863]]},
		{name:"wing2_atlas_24", frames: [[0,0,1658,1959]]},
		{name:"wing2_atlas_25", frames: [[0,0,1706,1901]]},
		{name:"wing2_atlas_26", frames: [[0,0,1731,1873]]},
		{name:"wing2_atlas_27", frames: [[0,0,1703,1902]]},
		{name:"wing2_atlas_28", frames: [[0,0,1757,1842]]},
		{name:"wing2_atlas_29", frames: [[0,0,1931,1676]]},
		{name:"wing2_atlas_30", frames: [[0,0,2006,1613]]},
		{name:"wing2_atlas_31", frames: [[0,0,2002,1616]]},
		{name:"wing2_atlas_32", frames: [[0,0,1673,1929]]},
		{name:"wing2_atlas_33", frames: [[0,0,1780,1809]]},
		{name:"wing2_atlas_34", frames: [[0,0,2031,1584]]},
		{name:"wing2_atlas_35", frames: [[0,0,1606,2000]]},
		{name:"wing2_atlas_36", frames: [[0,0,1642,1953]]},
		{name:"wing2_atlas_37", frames: [[0,0,1642,1953]]},
		{name:"wing2_atlas_38", frames: [[0,0,1671,1915]]},
		{name:"wing2_atlas_39", frames: [[0,0,1551,2034]]},
		{name:"wing2_atlas_40", frames: [[0,0,1551,2034]]},
		{name:"wing2_atlas_41", frames: [[0,0,1528,2020]]},
		{name:"wing2_atlas_42", frames: [[0,0,1528,2020]]},
		{name:"wing2_atlas_43", frames: [[0,0,2011,1523]]},
		{name:"wing2_atlas_44", frames: [[0,0,2024,1502]]},
		{name:"wing2_atlas_45", frames: [[0,0,2037,1480]]},
		{name:"wing2_atlas_46", frames: [[0,0,2026,1405]]},
		{name:"wing2_atlas_47", frames: [[0,0,878,678],[1701,447,290,374],[920,1169,113,193],[920,959,213,208],[1557,985,125,267],[1684,1202,113,193],[880,0,819,718],[1684,985,153,215],[1450,903,105,379],[1839,985,96,282],[1601,823,408,160],[0,680,723,641],[1224,720,375,181],[725,959,193,257],[1701,0,322,445],[1224,903,224,235],[725,720,497,237],[1135,1140,243,130]]}
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



(lib.CachedBmp_132 = function() {
	this.initialize(img.CachedBmp_132);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,285,2541);


(lib.CachedBmp_90 = function() {
	this.initialize(img.CachedBmp_90);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,285,2541);


(lib.CachedBmp_131 = function() {
	this.initialize(img.CachedBmp_131);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,61,2551);


(lib.CachedBmp_133 = function() {
	this.initialize(img.CachedBmp_133);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,510,2509);


(lib.CachedBmp_134 = function() {
	this.initialize(img.CachedBmp_134);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,732,2455);


(lib.CachedBmp_135 = function() {
	this.initialize(img.CachedBmp_135);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,949,2380);


(lib.CachedBmp_88 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_136 = function() {
	this.initialize(img.CachedBmp_136);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1160,2284);


(lib.CachedBmp_137 = function() {
	this.initialize(img.CachedBmp_137);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1361,2168);


(lib.CachedBmp_99 = function() {
	this.initialize(ss["wing2_atlas_18"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_257 = function() {
	this.initialize(img.CachedBmp_257);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3170,615);


(lib.CachedBmp_87 = function() {
	this.initialize(img.CachedBmp_87);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3633,678);


(lib.CachedBmp_128 = function() {
	this.initialize(ss["wing2_atlas_45"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_129 = function() {
	this.initialize(ss["wing2_atlas_44"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_126 = function() {
	this.initialize(img.CachedBmp_126);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2062,1436);


(lib.CachedBmp_127 = function() {
	this.initialize(img.CachedBmp_127);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2050,1458);


(lib.CachedBmp_124 = function() {
	this.initialize(img.CachedBmp_124);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2086,1392);


(lib.CachedBmp_125 = function() {
	this.initialize(img.CachedBmp_125);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2074,1414);


(lib.CachedBmp_123 = function() {
	this.initialize(img.CachedBmp_123);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2098,1370);


(lib.CachedBmp_122 = function() {
	this.initialize(img.CachedBmp_122);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2085,1381);


(lib.CachedBmp_121 = function() {
	this.initialize(img.CachedBmp_121);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2069,1391);


(lib.CachedBmp_120 = function() {
	this.initialize(img.CachedBmp_120);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2049,1399);


(lib.CachedBmp_119 = function() {
	this.initialize(ss["wing2_atlas_46"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_258 = function() {
	this.initialize(ss["wing2_atlas_41"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_118 = function() {
	this.initialize(ss["wing2_atlas_36"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_115 = function() {
	this.initialize(ss["wing2_atlas_11"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_114 = function() {
	this.initialize(ss["wing2_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_112 = function() {
	this.initialize(ss["wing2_atlas_21"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_111 = function() {
	this.initialize(ss["wing2_atlas_16"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_110 = function() {
	this.initialize(ss["wing2_atlas_9"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_108 = function() {
	this.initialize(ss["wing2_atlas_10"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_109 = function() {
	this.initialize(ss["wing2_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_107 = function() {
	this.initialize(ss["wing2_atlas_8"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_106 = function() {
	this.initialize(ss["wing2_atlas_17"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_105 = function() {
	this.initialize(ss["wing2_atlas_32"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_104 = function() {
	this.initialize(ss["wing2_atlas_27"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_102 = function() {
	this.initialize(ss["wing2_atlas_28"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_103 = function() {
	this.initialize(ss["wing2_atlas_26"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(ss["wing2_atlas_33"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_100 = function() {
	this.initialize(ss["wing2_atlas_23"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_483 = function() {
	this.initialize(ss["wing2_atlas_19"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_474 = function() {
	this.initialize(img.CachedBmp_474);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,285,2541);


(lib.CachedBmp_98 = function() {
	this.initialize(ss["wing2_atlas_24"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_96 = function() {
	this.initialize(ss["wing2_atlas_39"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(img.CachedBmp_86);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,6938,3187);


(lib.CachedBmp_172 = function() {
	this.initialize(ss["wing2_atlas_43"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_97 = function() {
	this.initialize(ss["wing2_atlas_35"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_169 = function() {
	this.initialize(img.CachedBmp_169);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2188,1262);


(lib.CachedBmp_170 = function() {
	this.initialize(img.CachedBmp_170);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2133,1351);


(lib.CachedBmp_171 = function() {
	this.initialize(img.CachedBmp_171);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2074,1438);


(lib.CachedBmp_165 = function() {
	this.initialize(img.CachedBmp_165);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2369,885);


(lib.CachedBmp_166 = function() {
	this.initialize(img.CachedBmp_166);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2330,982);


(lib.CachedBmp_168 = function() {
	this.initialize(img.CachedBmp_168);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2239,1170);


(lib.CachedBmp_167 = function() {
	this.initialize(img.CachedBmp_167);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2287,1077);


(lib.CachedBmp_164 = function() {
	this.initialize(img.CachedBmp_164);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2232,1266);


(lib.CachedBmp_163 = function() {
	this.initialize(ss["wing2_atlas_30"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_162 = function() {
	this.initialize(ss["wing2_atlas_25"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_161 = function() {
	this.initialize(img.CachedBmp_161);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1349,2110);


(lib.CachedBmp_261 = function() {
	this.initialize(img.CachedBmp_261);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1407,2073);


(lib.CachedBmp_260 = function() {
	this.initialize(ss["wing2_atlas_42"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_160 = function() {
	this.initialize(ss["wing2_atlas_37"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_157 = function() {
	this.initialize(ss["wing2_atlas_12"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_156 = function() {
	this.initialize(ss["wing2_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_155 = function() {
	this.initialize(ss["wing2_atlas_29"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_154 = function() {
	this.initialize(ss["wing2_atlas_13"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_153 = function() {
	this.initialize(ss["wing2_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_152 = function() {
	this.initialize(ss["wing2_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_151 = function() {
	this.initialize(ss["wing2_atlas_22"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_150 = function() {
	this.initialize(ss["wing2_atlas_38"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_149 = function() {
	this.initialize(ss["wing2_atlas_20"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_148 = function() {
	this.initialize(ss["wing2_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_147 = function() {
	this.initialize(ss["wing2_atlas_15"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_146 = function() {
	this.initialize(ss["wing2_atlas_34"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_145 = function() {
	this.initialize(img.CachedBmp_145);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2105,1486);


(lib.CachedBmp_143 = function() {
	this.initialize(img.CachedBmp_143);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2231,1274);


(lib.CachedBmp_144 = function() {
	this.initialize(img.CachedBmp_144);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2172,1382);


(lib.CachedBmp_142 = function() {
	this.initialize(img.CachedBmp_142);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2125,1451);


(lib.CachedBmp_141 = function() {
	this.initialize(ss["wing2_atlas_31"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_140 = function() {
	this.initialize(ss["wing2_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_139 = function() {
	this.initialize(ss["wing2_atlas_14"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_478 = function() {
	this.initialize(img.CachedBmp_478);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1160,2284);


(lib.CachedBmp_479 = function() {
	this.initialize(img.CachedBmp_479);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1361,2168);


(lib.Иллюстрация_без_названия5_0000_Слой14 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_138 = function() {
	this.initialize(ss["wing2_atlas_40"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Иллюстрация_без_названия5_0001_Слой17 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Иллюстрация_без_названия5_0005_Слой13 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Иллюстрация_без_названия5_0006_Слой12 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Иллюстрация_без_названия5_0002_Слой17 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_476 = function() {
	this.initialize(img.CachedBmp_476);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,732,2455);


(lib.Иллюстрация_без_названия5_0003_Слой16 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.Иллюстрация_без_названия5_0015_Слой3 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.Иллюстрация_без_названия5_0007_Слой11 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_477 = function() {
	this.initialize(img.CachedBmp_477);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,949,2380);


(lib.Иллюстрация_без_названия5_0009_Слой9 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.Иллюстрация_без_названия5_0011_Слой7 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.Иллюстрация_без_названия5_0017_Слой15pngкопия = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.Иллюстрация_без_названия5_0013_Слой5 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.Иллюстрация_без_названия5_0008_Слой10 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.Иллюстрация_без_названия5_0014_Слой4 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.Иллюстрация_без_названия5_0010_Слой8 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.Иллюстрация_без_названия5_0012_Слой6 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.Иллюстрация_без_названия5_0016_Слой2 = function() {
	this.initialize(ss["wing2_atlas_47"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_473 = function() {
	this.initialize(img.CachedBmp_473);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,61,2551);


(lib.CachedBmp_432 = function() {
	this.initialize(img.CachedBmp_432);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,285,2541);


(lib.CachedBmp_475 = function() {
	this.initialize(img.CachedBmp_475);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,510,2509);// helper functions:

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
	this.instance = new lib.CachedBmp_86();
	this.instance.setTransform(-1470.8,-11.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(55));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Слой_9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_9
	this.instance = new lib.CachedBmp_257();
	this.instance.setTransform(230.5,147.1,0.5,0.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(5).to({_off:false},0).wait(37));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Каркас_23___копия = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Каркас_23___копия
	this.instance = new lib.CachedBmp_473();
	this.instance.setTransform(1283.3,-1195.95,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_432();
	this.instance_1.setTransform(1215.2,-1058.3,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_475();
	this.instance_2.setTransform(1313.05,-997.75,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_476();
	this.instance_3.setTransform(1241.15,-953.65,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_477();
	this.instance_4.setTransform(1169.05,-899,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_478();
	this.instance_5.setTransform(1096.75,-834.05,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_479();
	this.instance_6.setTransform(1024.3,-775.55,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_138();
	this.instance_7.setTransform(951.7,-707.8,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_139();
	this.instance_8.setTransform(884,-639.05,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_140();
	this.instance_9.setTransform(816.3,-562.9,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_141();
	this.instance_10.setTransform(748.6,-479.9,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_142();
	this.instance_11.setTransform(681.05,-390.75,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_143();
	this.instance_12.setTransform(613.6,-296.35,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_144();
	this.instance_13.setTransform(616.65,-339.85,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_145();
	this.instance_14.setTransform(619.75,-381.1,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_146();
	this.instance_15.setTransform(622.8,-419.8,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_147();
	this.instance_16.setTransform(625.9,-455.65,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_148();
	this.instance_17.setTransform(629,-488.35,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_149();
	this.instance_18.setTransform(632.1,-517.7,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_150();
	this.instance_19.setTransform(635.2,-543.45,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_151();
	this.instance_20.setTransform(641.8,-522.1,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_152();
	this.instance_21.setTransform(648.45,-497.95,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_153();
	this.instance_22.setTransform(655.1,-471.05,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_154();
	this.instance_23.setTransform(661.8,-441.75,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_155();
	this.instance_24.setTransform(668.5,-410.1,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_156();
	this.instance_25.setTransform(669.9,-465.95,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_157();
	this.instance_26.setTransform(671.3,-516.4,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_160();
	this.instance_27.setTransform(672.65,-560.7,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_260();
	this.instance_28.setTransform(674.05,-598.2,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_261();
	this.instance_29.setTransform(675.45,-628.5,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_161();
	this.instance_30.setTransform(699.85,-658,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_162();
	this.instance_31.setTransform(733.85,-567.3,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_163();
	this.instance_32.setTransform(767.85,-437.35,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_164();
	this.instance_33.setTransform(801.9,-277.8,0.5,0.5);

	this.instance_34 = new lib.CachedBmp_165();
	this.instance_34.setTransform(835.9,-101.55,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_166();
	this.instance_35.setTransform(946.4,-171.25,0.5,0.5);

	this.instance_36 = new lib.CachedBmp_167();
	this.instance_36.setTransform(1056.95,-240.15,0.5,0.5);

	this.instance_37 = new lib.CachedBmp_168();
	this.instance_37.setTransform(1167.55,-308.2,0.5,0.5);

	this.instance_38 = new lib.CachedBmp_169();
	this.instance_38.setTransform(1278.15,-375.3,0.5,0.5);

	this.instance_39 = new lib.CachedBmp_170();
	this.instance_39.setTransform(1388.85,-441.3,0.5,0.5);

	this.instance_40 = new lib.CachedBmp_171();
	this.instance_40.setTransform(1499.5,-506.2,0.5,0.5);

	this.instance_41 = new lib.CachedBmp_172();
	this.instance_41.setTransform(1610.25,-569.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_33}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_38}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_41}]},1).to({state:[]},1).wait(13));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Каркас_23 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Каркас_23
	this.instance = new lib.CachedBmp_473();
	this.instance.setTransform(1469.85,-860.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_474();
	this.instance_1.setTransform(1561.15,-824.6,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_475();
	this.instance_2.setTransform(1655.3,-782.6,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_476();
	this.instance_3.setTransform(1588.75,-734.8,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_477();
	this.instance_4.setTransform(1522,-676.45,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_478();
	this.instance_5.setTransform(1455.05,-607.8,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_479();
	this.instance_6.setTransform(1371.5,-534.25,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_96();
	this.instance_7.setTransform(1287.8,-451.45,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_97();
	this.instance_8.setTransform(1211.7,-413.6,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_98();
	this.instance_9.setTransform(1135.6,-372.8,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_483();
	this.instance_10.setTransform(1059.45,-329.3,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_100();
	this.instance_11.setTransform(983.35,-283.45,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_101();
	this.instance_12.setTransform(907.25,-235.65,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_102();
	this.instance_13.setTransform(910.65,-247.15,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_103();
	this.instance_14.setTransform(914.05,-257.55,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_104();
	this.instance_15.setTransform(917.45,-266.75,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_105();
	this.instance_16.setTransform(920.85,-274.7,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_106();
	this.instance_17.setTransform(924.1,-250.6,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_107();
	this.instance_18.setTransform(927.35,-224.35,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_108();
	this.instance_19.setTransform(930.6,-196.1,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_109();
	this.instance_20.setTransform(934.35,-188.4,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_110();
	this.instance_21.setTransform(938.05,-180.1,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_111();
	this.instance_22.setTransform(941.7,-171.25,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_112();
	this.instance_23.setTransform(945.45,-161.75,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_155();
	this.instance_24.setTransform(949.15,-151.7,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_114();
	this.instance_25.setTransform(953.45,-207,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_115();
	this.instance_26.setTransform(957.7,-256.9,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_118();
	this.instance_27.setTransform(961.95,-300.65,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_258();
	this.instance_28.setTransform(966.25,-337.65,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_261();
	this.instance_29.setTransform(970.55,-367.4,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_119();
	this.instance_30.setTransform(962,-25.85,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_120();
	this.instance_31.setTransform(1002.4,-35.5,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_121();
	this.instance_32.setTransform(1042.75,-44.4,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_122();
	this.instance_33.setTransform(1083.1,-52.45,0.5,0.5);

	this.instance_34 = new lib.CachedBmp_123();
	this.instance_34.setTransform(1123.5,-59.8,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_124();
	this.instance_35.setTransform(1240.15,-106.75,0.5,0.5);

	this.instance_36 = new lib.CachedBmp_125();
	this.instance_36.setTransform(1356.8,-153.6,0.5,0.5);

	this.instance_37 = new lib.CachedBmp_126();
	this.instance_37.setTransform(1473.45,-200.35,0.5,0.5);

	this.instance_38 = new lib.CachedBmp_127();
	this.instance_38.setTransform(1590.15,-247.05,0.5,0.5);

	this.instance_39 = new lib.CachedBmp_128();
	this.instance_39.setTransform(1706.8,-293.7,0.5,0.5);

	this.instance_40 = new lib.CachedBmp_129();
	this.instance_40.setTransform(1823.45,-340.3,0.5,0.5);

	this.instance_41 = new lib.CachedBmp_172();
	this.instance_41.setTransform(1940.1,-386.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_33}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_38}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_41}]},1).to({state:[]},1).wait(13));

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
	this.instance = new lib.CachedBmp_88();
	this.instance.setTransform(468.95,-169.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(469,-169.3,439,339);


(lib.Анимация3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_87();
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
	this.instance.setTransform(797.8,183.4);

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
	this.instance.setTransform(1548.9,123.7,0.6628,0.7806,14.9976,0,0,274.4,157.2);

	this.ikNode_16 = new lib.платье();
	this.ikNode_16.name = "ikNode_16";
	this.ikNode_16.setTransform(808.4,431.65,0.6628,0.7806,23.184,0,0,230.3,154.8);
	this.ikNode_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:0.6643,scaleY:0.7821,rotation:15.679,x:1634.05,y:244},1).to({scaleX:0.6735,scaleY:0.7912,rotation:19.7723,x:1195.9,y:360.45},6).to({scaleX:0.6766,scaleY:0.7943,rotation:21.1371,x:1050.6,y:394.55},2).to({regX:274.5,scaleX:0.6781,scaleY:0.7958,rotation:21.8198,x:977.9,y:412.65},1).to({regX:284.7,regY:178.1,scaleX:0.6796,scaleY:0.7974,rotation:22.5025,x:905.15,y:448.75},1).to({_off:true,regX:230.3,regY:154.8,scaleX:0.6628,scaleY:0.7806,rotation:23.184,x:808.4,y:431.65},1).wait(30));
	this.timeline.addTween(cjs.Tween.get(this.ikNode_16).wait(11).to({_off:false},1).to({regX:230.5,scaleX:0.6584,scaleY:0.7756,rotation:23.1839,x:807.5,y:431.95},7).to({x:799.9,y:433.75},5).to({rotation:-6.8136,x:840.95,y:493.95},5).to({regX:230.6,regY:154.9,scaleX:0.654,scaleY:0.8304,rotation:23.1856,x:999.85,y:383.65},5).to({x:1752.6,y:177.6},7).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Слой_7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_7
	this.instance = new lib.Анимация1("synched",0);
	this.instance.setTransform(1885.1,41.6);

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
	this.ikNode_15.setTransform(1683.9,-18.55,0.6733,0.6733,7.0511,0,0,91.3,167.7);

	this.ikNode_14 = new lib.ладоньправо();
	this.ikNode_14.name = "ikNode_14";
	this.ikNode_14.setTransform(1562.1,-99.1,0.6733,0.6733,15.8475,0,0,42.6,144.6);

	this.ikNode_13 = new lib.локотьправо();
	this.ikNode_13.name = "ikNode_13";
	this.ikNode_13.setTransform(1517.85,-15.3,0.6733,0.6733,15.8468,0,0,4.5,187.8);

	this.ikNode_12 = new lib.плечоправо();
	this.ikNode_12.name = "ikNode_12";
	this.ikNode_12.setTransform(1622,-62.35,0.815,0.7966,78.7936,0,0,-0.1,0.1);

	this.ikNode_11 = new lib.ладоньлево();
	this.ikNode_11.name = "ikNode_11";
	this.ikNode_11.setTransform(1787.2,69.5,0.6728,0.6728,-13.0131,0,0,39.3,103);

	this.ikNode_10 = new lib.локотьлево();
	this.ikNode_10.name = "ikNode_10";
	this.ikNode_10.setTransform(1691.8,200.4,0.6726,0.6726,16.9974,0,0,44.6,238.7);

	this.ikNode_9 = new lib.плечолево();
	this.ikNode_9.name = "ikNode_9";
	this.ikNode_9.setTransform(1685.65,119.05,0.6727,0.6727,16.979,0,0,40,72.5);

	this.ikNode_8 = new lib.ступнялево();
	this.ikNode_8.name = "ikNode_8";
	this.ikNode_8.setTransform(1251.8,319.05,0.6729,0.6729,-6.7168,0,0,71.9,38.1);

	this.ikNode_7 = new lib.ноганизлево();
	this.ikNode_7.name = "ikNode_7";
	this.ikNode_7.setTransform(1298.95,224.25,0.6725,0.6725,-19.4553,0,0,94.7,129.8);

	this.ikNode_6 = new lib.голеньлево();
	this.ikNode_6.name = "ikNode_6";
	this.ikNode_6.setTransform(1336.1,131.95,0.7632,0.4453,163.5819,0,0,189,94.2);

	this.ikNode_5 = new lib.ступняправо();
	this.ikNode_5.name = "ikNode_5";
	this.ikNode_5.setTransform(1556.95,419.8,0.6729,0.6729,-111.3912,0,0,45.2,94.7);

	this.ikNode_4 = new lib.ноганизправо();
	this.ikNode_4.name = "ikNode_4";
	this.ikNode_4.setTransform(1424.25,273.75,0.6729,0.6729,-111.3912,0,0,257.5,13.9);

	this.ikNode_3 = new lib.голеньправо();
	this.ikNode_3.name = "ikNode_3";
	this.ikNode_3.setTransform(1533.55,212.4,0.6729,0.6729,-66.3996,0,0,160.1,172.7);

	this.ikNode_2 = new lib.шея();
	this.ikNode_2.name = "ikNode_2";
	this.ikNode_2.setTransform(1662.8,41.6,0.6729,0.6729,1.4293,0,0,55.8,77.5);

	this.ikNode_1 = new lib.платье();
	this.ikNode_1.name = "ikNode_1";
	this.ikNode_1.setTransform(1520.4,113.7,0.6171,0.8066,19.5431,0,0,238.2,165.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8066,rotation:19.5431,x:1520.4,y:113.7,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6729,scaleY:0.6729,rotation:1.4293,x:1662.8,y:41.6,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6729,scaleY:0.6729,rotation:-66.3996,x:1533.55,y:212.4,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6729,scaleY:0.6729,rotation:-111.3912,x:1424.25,y:273.75,regY:13.9,regX:257.5}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6729,scaleY:0.6729,rotation:-111.3912,x:1556.95,y:419.8,regY:94.7}},{t:this.ikNode_6,p:{regY:94.2,scaleX:0.7632,rotation:163.5819,x:1336.1,y:131.95,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-19.4553,x:1298.95,y:224.25,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6729,scaleY:0.6729,rotation:-6.7168,x:1251.8,y:319.05}},{t:this.ikNode_9,p:{scaleX:0.6727,scaleY:0.6727,rotation:16.979,x:1685.65,y:119.05,regX:40}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.9974,x:1691.8,y:200.4,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6728,scaleY:0.6728,rotation:-13.0131,x:1787.2,y:69.5,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.815,rotation:78.7936,x:1622,y:-62.35,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6733,scaleY:0.6733,rotation:15.8468,x:1517.85,y:-15.3}},{t:this.ikNode_14,p:{regX:42.6,scaleX:0.6733,scaleY:0.6733,rotation:15.8475,x:1562.1,y:-99.1,regY:144.6}},{t:this.ikNode_15,p:{rotation:7.0511,x:1683.9,y:-18.55,regX:91.3,regY:167.7}}]}).to({state:[{t:this.ikNode_1,p:{regY:165.1,scaleY:0.8065,rotation:19.5419,x:1605,y:242.3,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3606,x:1747.8,y:169.8,regX:55.8}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-63.478,x:1609.8,y:344.65,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-102.559,x:1498.1,y:389.15,regY:13.9,regX:257.5}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-102.559,x:1605,y:563.35,regY:94.7}},{t:this.ikNode_6,p:{regY:94,scaleX:0.7631,rotation:168.5079,x:1421.4,y:252.85,regX:189}},{t:this.ikNode_7,p:{regX:94.6,regY:129.9,rotation:-13.2835,x:1391.7,y:342.5,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:-1.7908,x:1337.05,y:418.4}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.9089,x:1770.55,y:247.4,regX:40}},{t:this.ikNode_10,p:{regY:238.8,rotation:16.927,x:1776.8,y:328.85,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.0663,x:1871.9,y:197.7,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.7159,x:1688.3,y:70.55,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7754,x:1594.8,y:110.35}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:15.7761,x:1639,y:26.35,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.981,x:1768.35,y:109.15,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5337,x:1532.45,y:261.35,regX:238.1}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3411,x:1675.45,y:188.9,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-60.5538,x:1528.75,y:366.7,regY:172.8}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-93.7228,x:1414.95,y:404.6,regY:13.8,regX:257.5}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-93.7228,x:1493.4,y:591.8,regY:94.8}},{t:this.ikNode_6,p:{regY:94.2,scaleX:0.7632,rotation:173.4339,x:1350.1,y:264.25,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-7.1087,x:1308.95,y:350.55,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:3.1096,x:1245.55,y:422.05}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.8925,x:1698.15,y:266.5,regX:40.1}},{t:this.ikNode_10,p:{regY:238.8,rotation:16.9105,x:1704.3,y:347.85,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.0663,x:1799.4,y:216.75,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.7394,x:1621.75,y:91.95,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7808,x:1517.65,y:128.4}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:15.7802,x:1561.95,y:44.85,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.9614,x:1695.6,y:128.15,regX:91.2,regY:167.8}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5343,x:1460.25,y:280.75,regX:238.1}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3216,x:1603.3,y:208.3,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-57.6255,x:1447.7,y:388.1,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-84.9047,x:1332.5,y:419.35,regY:13.9,regX:257.4}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-84.9047,x:1380.7,y:615.2,regY:94.7}},{t:this.ikNode_6,p:{regY:94.2,scaleX:0.7631,rotation:178.3486,x:1279.15,y:275.7,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-0.9413,x:1226.9,y:357.35,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:8.0331,x:1155.3,y:423.45}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.8723,x:1625.9,y:285.85,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8904,x:1632.15,y:367.1,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.0837,x:1727.15,y:236.15,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.6911,x:1546.3,y:111.1,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7335,x:1445.7,y:148.1}},{t:this.ikNode_14,p:{regX:42.6,scaleX:0.6732,scaleY:0.6732,rotation:15.7329,x:1489.85,y:64.35,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.943,x:1623.45,y:147.4,regX:91.2,regY:167.8}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5347,x:1387.95,y:300.15,regX:238.1}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3164,x:1531,y:227.75,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-54.6966,x:1366.7,y:408.85,regY:172.8}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-76.0794,x:1250.4,y:433.2,regY:13.9,regX:257.5}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-76.0794,x:1267.75,y:633.1,regY:94.7}},{t:this.ikNode_6,p:{regY:94.2,scaleX:0.7632,rotation:-176.739,x:1208.7,y:287.2,regX:188.9}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:5.2193,x:1145.7,y:362.8,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:12.9584,x:1066.6,y:422.5}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.8653,x:1553.75,y:305.25,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.885,x:1559.95,y:386.45,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.089,x:1654.9,y:255.5,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.6498,x:1470.9,y:130.25,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6932,x:1373.75,y:167.75}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:15.6926,x:1418,y:83.85,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.9366,x:1551.3,y:166.75,regX:91.2,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5357,x:1315.7,y:319.55,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.2878,x:1458.7,y:247.2,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-51.7672,x:1285.75,y:428.95,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-67.2546,x:1168.8,y:446.55,regY:13.9,regX:257.5}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-67.2546,x:1155.3,y:645.5,regY:94.7}},{t:this.ikNode_6,p:{regY:94,scaleX:0.7632,rotation:-171.8221,x:1138.3,y:298.85,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:11.3869,x:1065.7,y:367,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:17.8827,x:979.45,y:419.35}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.8382,x:1481.55,y:324.6,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8562,x:1487.85,y:405.7,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1171,x:1582.5,y:274.8,regX:39.2}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.6205,x:1395.5,y:149.45,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6661,x:1302,y:187.45}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:15.6655,x:1346.3,y:103.35,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.9092,x:1479,y:186.1,regX:91.2,regY:167.8}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5343,x:1243.35,y:338.9,regX:238.1}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.2813,x:1386.4,y:266.55,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-48.8417,x:1205.25,y:448.55,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-58.4227,x:1087.9,y:459.35,regY:13.8,regX:257.4}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-58.4227,x:1044.3,y:652.65,regY:94.7}},{t:this.ikNode_6,p:{regY:94.1,scaleX:0.7632,rotation:-166.8981,x:1068.3,y:310.4,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:17.5625,x:986.95,y:370.1,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:22.8084,x:894.2,y:414.2}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.8328,x:1409.25,y:344,regX:40.1}},{t:this.ikNode_10,p:{regY:238.8,rotation:16.8513,x:1415.55,y:425.1,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1183,x:1510.3,y:294.15,regX:39.4}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.616,x:1324.75,y:167.25,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6566,x:1231.2,y:207.15}},{t:this.ikNode_14,p:{regX:42.8,scaleX:0.6732,scaleY:0.6732,rotation:15.6561,x:1275.55,y:122.95,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.9039,x:1406.9,y:205.45,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5326,x:1171.05,y:358.2,regX:238.1}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.2761,x:1314.1,y:285.9,regX:55.9}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-45.9143,x:1124.6,y:467.65,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-49.5918,x:1007.5,y:471.7,regY:13.9,regX:257.4}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-49.5918,x:935,y:654.8,regY:94.7}},{t:this.ikNode_6,p:{regY:94,scaleX:0.7631,rotation:-161.9724,x:998.8,y:322,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:23.737,x:909.75,y:372.1,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:27.7326,x:811.1,y:407.05}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.8287,x:1336.95,y:363.3,regX:40.1}},{t:this.ikNode_10,p:{regY:238.8,rotation:16.8472,x:1343.25,y:444.4,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1209,x:1438.05,y:313.5,regX:39.4}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.6294,x:1254.05,y:185.05,scaleY:0.7965}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6689,x:1160.45,y:226.8}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:15.6684,x:1204.65,y:142.55,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.8986,x:1334.6,y:224.8,regX:91.4,regY:167.8}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5302,x:1098.7,y:377.6,regX:238.1}},{t:this.ikNode_2,p:{scaleX:0.6729,scaleY:0.6729,rotation:1.2631,x:1241.7,y:305.25,regX:55.8}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-42.9874,x:1044.25,y:486.3,regY:172.8}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-40.7603,x:927.65,y:483.45,regY:13.9,regX:257.6}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-40.7603,x:828.35,y:652.3,regY:94.7}},{t:this.ikNode_6,p:{regY:94.2,scaleX:0.7631,rotation:-157.0471,x:929.7,y:333.55,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:29.9142,x:834.05,y:373.1,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:32.6589,x:730.6,y:398.35}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.8152,x:1264.65,y:382.65,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8345,x:1271,y:463.7,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1303,x:1365.6,y:332.75,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.6352,x:1183.4,y:202.9,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6702,x:1089.75,y:246.5}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:15.6696,x:1133.95,y:162.3,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.887,x:1262.3,y:244,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5288,x:1026.4,y:396.95,regX:238.1}},{t:this.ikNode_2,p:{scaleX:0.6729,scaleY:0.6729,rotation:1.2579,x:1169.4,y:324.55,regX:55.8}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-40.0608,x:964,y:504.4,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-31.9285,x:848.35,y:494.9,regY:13.9,regX:257.6}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-31.9285,x:725.05,y:645.55,regY:94.8}},{t:this.ikNode_6,p:{regY:94.1,scaleX:0.7631,rotation:-152.1221,x:860.9,y:345.2,regX:188.9}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:36.089,x:760,y:373.45,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:37.5838,x:652.6,y:388.2}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.8111,x:1192.35,y:402,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8295,x:1198.7,y:483,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1303,x:1293.3,y:352.15,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.6296,x:1112.65,y:220.8,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6607,x:1019.05,y:266.25}},{t:this.ikNode_14,p:{regX:42.8,scaleX:0.6732,scaleY:0.6732,rotation:15.6614,x:1063.3,y:182,regY:144.5}},{t:this.ikNode_15,p:{rotation:6.8817,x:1189.95,y:263.3,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5275,x:954.15,y:416.4,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6729,scaleY:0.6729,rotation:1.2514,x:1097.1,y:343.9,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-37.1342,x:884.15,y:522.2,regY:172.8}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-23.0978,x:769.65,y:506.1,regY:13.8,regX:257.5}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-23.0978,x:625.45,y:635.05,regY:94.7}},{t:this.ikNode_6,p:{regY:94,scaleX:0.7631,rotation:-147.1998,x:792.45,y:357.1,regX:188.9}},{t:this.ikNode_7,p:{regX:94.6,regY:129.8,rotation:42.2658,x:687.7,y:373.25,scaleX:0.6724,scaleY:0.6724}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:42.5092,x:577.55,y:377.15}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.8057,x:1120.1,y:421.35,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8262,x:1126.45,y:502.4,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1328,x:1221,y:371.45,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.644,x:1042,y:238.75,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.673,x:948.4,y:286}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:15.6725,x:992.65,y:201.75,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.8763,x:1117.75,y:282.65,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5254,x:881.8,y:435.65,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6729,scaleY:0.6729,rotation:1.254,x:1024.8,y:363.3,regX:55.8}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-34.2072,x:804.4,y:539.7,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-14.2676,x:691.65,y:517.1,regY:13.8,regX:257.5}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-14.2676,x:530.4,y:621.65,regY:94.7}},{t:this.ikNode_6,p:{regY:94.2,scaleX:0.7631,rotation:-142.2736,x:724.4,y:369.05,regX:189}},{t:this.ikNode_7,p:{regX:94.6,regY:129.9,rotation:48.4421,x:617.15,y:372.9,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:47.4346,x:505.35,y:365.4}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.8098,x:1047.8,y:440.7,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8295,x:1054.15,y:521.7,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.125,x:1148.65,y:390.85,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.6373,x:971.35,y:256.7,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6636,x:877.85,y:305.75}},{t:this.ikNode_14,p:{regX:42.8,scaleX:0.6732,scaleY:0.6732,rotation:15.6643,x:922.05,y:221.5,regY:144.5}},{t:this.ikNode_15,p:{rotation:6.8791,x:1045.55,y:302.05,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5244,x:809.45,y:455.05,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6729,scaleY:0.6729,rotation:1.2462,x:952.5,y:382.65,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-31.2809,x:725.1,y:556.9,regY:172.8}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-5.4358,x:614.35,y:528,regY:13.9,regX:257.5}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-5.4358,x:440.05,y:606,regY:94.7}},{t:this.ikNode_6,p:{regY:94.1,scaleX:0.7631,rotation:-137.3483,x:656.75,y:381.35,regX:188.9}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:54.6189,x:548.55,y:372.5,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:52.359,x:436.25,y:353.15}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.8016,x:975.5,y:460.05,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8209,x:981.9,y:541.1,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1303,x:1076.35,y:410.15,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.6294,x:900.7,y:274.75,scaleY:0.7965}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6541,x:807.3,y:325.6}},{t:this.ikNode_14,p:{regX:42.8,scaleX:0.6732,scaleY:0.6732,rotation:15.6548,x:851.45,y:241.4,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.8712,x:973.2,y:321.3,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5234,x:809.45,y:455.05,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6729,scaleY:0.6729,rotation:1.2384,x:952.45,y:382.55,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-32.828,x:725.6,y:557.3,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-11.7151,x:614.15,y:531.4,regY:13.8,regX:257.6}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-13.6864,x:449.35,y:628.05,regY:94.7}},{t:this.ikNode_6,p:{regY:94,scaleX:0.7631,rotation:-144.5132,x:652,y:391.95,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:47.7379,x:543.6,y:396.75,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:50.325,x:429.7,y:390.95}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.7946,x:975.5,y:460,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8143,x:981.9,y:540.95,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1357,x:1076.3,y:410.1,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:79.7838,x:900.9,y:276.2,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.673,x:807.25,y:325.5}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:15.6721,x:851.3,y:241.25,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.8633,x:973.1,y:321.35,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.522,x:809.5,y:455.1,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.228,x:952.5,y:382.6,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-34.3755,x:726.05,y:557.7,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-17.9936,x:614,y:534.85,regY:13.9,regX:257.6}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-21.9348,x:460.65,y:648.85,regY:94.7}},{t:this.ikNode_6,p:{regY:94.1,scaleX:0.7632,rotation:-151.676,x:648.1,y:403.2,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:40.8585,x:540.95,y:421.45,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:48.2921,x:427.3,y:429.35}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.7839,x:975.45,y:459.9,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8032,x:981.9,y:540.9,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1461,x:1076.3,y:410.1,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:80.926,x:901.15,y:277.65,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.6784,x:807.2,y:325.3}},{t:this.ikNode_14,p:{regX:42.8,scaleX:0.6732,scaleY:0.6732,rotation:15.6778,x:851.35,y:241.2,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.8528,x:973.15,y:321.3,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8066,rotation:19.5206,x:809.5,y:455.05,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6729,scaleY:0.6729,rotation:1.2332,x:952.55,y:382.55,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-35.9236,x:726.6,y:558.05,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-24.2714,x:613.85,y:538.35,regY:13.9,regX:257.6}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-30.1855,x:474,y:668.55,regY:94.8}},{t:this.ikNode_6,p:{regY:94.2,scaleX:0.7631,rotation:-158.8377,x:644.85,y:414.95,regX:188.9}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:33.9785,x:540.75,y:446.4,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:46.258,x:428.8,y:467.75}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.7893,x:975.5,y:459.95,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8086,x:981.95,y:540.9,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1382,x:1076.3,y:410.05,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:82.099,x:901.35,y:279.2,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7149,x:807.2,y:325.2}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:15.7144,x:851.25,y:241.15,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.8581,x:973.1,y:321.25,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8066,rotation:19.5206,x:809.45,y:455.05,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6729,scaleY:0.6729,rotation:1.2384,x:952.45,y:382.5,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-37.4707,x:727.1,y:558.4,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-30.5501,x:613.75,y:541.7,regY:13.8,regX:257.6}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-38.4362,x:489,y:686.4,regY:94.7}},{t:this.ikNode_6,p:{regY:94.2,scaleX:0.7631,rotation:-166.0014,x:642.3,y:426.9,regX:188.9}},{t:this.ikNode_7,p:{regX:94.6,regY:129.9,rotation:27.0988,x:542.95,y:471.05,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:44.2254,x:434.4,y:505.75}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.7962,x:975.5,y:459.95,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8143,x:981.9,y:540.85,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1328,x:1076.3,y:410.1,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:83.2408,x:901.55,y:280.7,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7212,x:807.2,y:325.2}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:15.7206,x:851.3,y:241.2,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.8633,x:973.05,y:321.25,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8066,rotation:19.5192,x:809.45,y:455.05,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.228,x:952.5,y:382.55,regX:55.9}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-39.0178,x:727.6,y:558.9,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-36.8294,x:613.8,y:545.2,regY:13.8,regX:257.5}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-46.6863,x:505.75,y:702.65,regY:94.7}},{t:this.ikNode_6,p:{regY:94,scaleX:0.7632,rotation:-173.165,x:640.75,y:439.05,regX:188.9}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:20.2187,x:547.7,y:495.15,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:42.1919,x:444.1,y:542.6}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.7839,x:975.4,y:459.85,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.8032,x:981.9,y:540.8,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1398,x:1076.25,y:410.05,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:84.3979,x:901.75,y:282.15,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7401,x:807.25,y:325.05}},{t:this.ikNode_14,p:{regX:42.6,scaleX:0.6732,scaleY:0.6732,rotation:15.7408,x:851.25,y:241.15,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.8515,x:973.1,y:321.15,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5182,x:809.4,y:455.05,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6729,scaleY:0.6729,rotation:1.2436,x:952.4,y:382.55,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-40.5659,x:728.15,y:559.15,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-43.1078,x:614,y:548.7,regY:13.8,regX:257.5}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-54.9374,x:523.8,y:717,regY:94.7}},{t:this.ikNode_6,p:{regY:94.1,scaleX:0.7632,rotation:179.678,x:639.95,y:450.9,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:13.3381,x:554.65,y:518.25,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:40.1575,x:457.4,y:577.75}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.8012,x:975.4,y:459.9,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.818,x:981.9,y:540.75,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.125,x:1076.25,y:410.1,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:85.546,x:901.95,y:283.7,scaleY:0.7965}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7536,x:807.35,y:325.05}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:15.7531,x:851.45,y:241.15,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.866,x:973.2,y:321.15,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5172,x:809.4,y:455.05,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6729,scaleY:0.6729,rotation:1.2436,x:952.4,y:382.55,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-42.1128,x:728.55,y:559.55,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-49.3871,x:614.2,y:552.25,regY:13.8,regX:257.4}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-63.188,x:543.1,y:729.35,regY:94.7}},{t:this.ikNode_6,p:{regY:94,scaleX:0.7631,rotation:172.5141,x:640.15,y:462.55,regX:188.9}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:6.4582,x:563.9,y:540,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:38.1234,x:474.45,y:610.75}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.7987,x:975.4,y:459.9,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.818,x:981.9,y:540.7,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1224,x:1076.25,y:410.1,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:86.6957,x:902.15,y:285.25,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7659,x:807.45,y:325}},{t:this.ikNode_14,p:{regX:42.6,scaleX:0.6732,scaleY:0.6732,rotation:15.7654,x:851.45,y:241.15,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.866,x:973.2,y:321.1,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5162,x:809.4,y:455.05,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6729,scaleY:0.6729,rotation:1.2592,x:952.35,y:381.6,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-45.7176,x:744.7,y:570.1,regY:172.8}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-56.986,x:629.95,y:569.9,regY:13.8,regX:257.5}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-71.6933,x:582.95,y:754.95,regY:94.7}},{t:this.ikNode_6,p:{regY:94.1,scaleX:0.7632,rotation:170.702,x:640.8,y:470.95,regX:188.9}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:4.2265,x:566.85,y:550.85,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:28.6692,x:480.4,y:625}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.7823,x:975.45,y:459.8,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.7991,x:981.95,y:540.75,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1398,x:1076.2,y:410,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:85.0934,x:903.3,y:284.2,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.747,x:807.25,y:324.9}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:15.7477,x:851.4,y:240.9,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.8477,x:973.1,y:321.1,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5162,x:809.35,y:455,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.2787,x:952.35,y:380.7,regX:55.9}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-49.3226,x:763.3,y:578.8,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-64.5822,x:649,y:586,regY:13.8,regX:257.4}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-80.2004,x:626.7,y:775.45,regY:94.7}},{t:this.ikNode_6,p:{regY:94,scaleX:0.7632,rotation:168.8903,x:641.75,y:479.45,regX:189}},{t:this.ikNode_7,p:{regX:94.6,regY:129.8,rotation:1.9934,x:570.4,y:561.55,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:19.2136,x:486.85,y:638.95}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.7662,x:975.45,y:459.7,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.7847,x:981.9,y:540.65,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1505,x:1076.15,y:409.85,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:83.4961,x:904.3,y:283.25,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7335,x:807.2,y:324.7}},{t:this.ikNode_14,p:{regX:42.6,scaleX:0.6732,scaleY:0.6732,rotation:15.7329,x:851.2,y:240.75,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.8319,x:972.95,y:320.95,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5162,x:809.35,y:455,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3268,x:952.3,y:379.75,regX:55.9}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-52.9271,x:783.7,y:584.45,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-72.181,x:670.05,y:598.8,regY:13.8,regX:257.5}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-88.7057,x:672.95,y:789.6,regY:94.7}},{t:this.ikNode_6,p:{regY:94.1,scaleX:0.7631,rotation:167.0776,x:643.15,y:487.7,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-0.234,x:574.55,y:572.25,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:9.7575,x:494.15,y:652.75}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.7823,x:975.4,y:459.65,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.7982,x:981.85,y:540.6,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1357,x:1076.15,y:409.9,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:81.8994,x:905.45,y:282.35,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7212,x:807.2,y:324.8}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:15.7206,x:851.25,y:240.8,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.8477,x:973.05,y:321,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5151,x:809.25,y:454.9,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3554,x:952.15,y:378.8,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-56.5316,x:804.3,y:586.8,regY:172.8}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-79.7791,x:691.7,y:608.3,regY:13.8,regX:257.5}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-97.2048,x:719.8,y:796.95,regY:94.7}},{t:this.ikNode_6,p:{regY:94.1,scaleX:0.7632,rotation:165.2656,x:645,y:496.1,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-2.4671,x:579.1,y:582.65,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6729,scaleY:0.6729,rotation:0.3015,x:501.95,y:666.2}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.7744,x:975.45,y:459.6,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.7921,x:981.85,y:540.55,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1372,x:1076.1,y:409.75,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:80.3064,x:906.55,y:281.35,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7105,x:807.2,y:324.8}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:15.7112,x:851.25,y:240.75,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.8411,x:972.95,y:320.8,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5148,x:809.3,y:454.85,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3697,x:952.05,y:377.85,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-60.1354,x:823.4,y:586.05,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-87.3769,x:712.45,y:614.75,regY:13.8,regX:257.4}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-105.7112,x:765.3,y:797.95,regY:94.7}},{t:this.ikNode_6,p:{regY:94.1,scaleX:0.7631,rotation:163.4529,x:647.2,y:504.15,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-4.6998,x:584.1,y:592.9,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-9.1475,x:510.2,y:679.25}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:16.7551,x:975.45,y:459.45,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:16.772,x:981.8,y:540.5,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:-13.1555,x:1076,y:409.65,regX:39.3}},{t:this.ikNode_12,p:{regY:0,scaleX:0.8149,rotation:78.729,x:907.65,y:280.35,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:15.7162,x:807.15,y:324.9}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:15.7169,x:851.35,y:240.85,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.8203,x:972.9,y:320.75,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8066,rotation:19.5113,x:809.25,y:454.75,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3814,x:952.05,y:378.5,regX:55.9}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-72.7908,x:826.55,y:585.65,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-101.4353,x:724.65,y:637.85,regY:13.8,regX:257.5}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-119.7757,x:820.45,y:802.7,regY:94.7}},{t:this.ikNode_6,p:{regY:94,scaleX:0.7632,rotation:161.5713,x:655.8,y:526.7,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-7.5546,x:595.8,y:617.3,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:-6.7504,x:526.05,y:707.3}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:8.9601,x:978.6,y:458.15,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:15.6201,x:996,y:537.55,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:12.1154,x:1087.5,y:405.05,regX:39.3}},{t:this.ikNode_12,p:{regY:-0.1,scaleX:0.8149,rotation:78.2968,x:902.4,y:281.15,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:27.5565,x:795.7,y:320.4}},{t:this.ikNode_14,p:{regX:42.6,scaleX:0.6732,scaleY:0.6732,rotation:27.6971,x:856.15,y:247.15,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.8188,x:972.6,y:320.6,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5107,x:809.15,y:454.7,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3671,x:951.9,y:379.1,regX:55.8}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-85.4461,x:829.8,y:585.05,regY:172.8}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-115.5004,x:741.8,y:658.45,regY:13.8,regX:257.4}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-133.8422,x:874.75,y:794.95,regY:94.7}},{t:this.ikNode_6,p:{regY:94.2,scaleX:0.7632,rotation:159.6859,x:668.55,y:548.9,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-10.4111,x:611.55,y:641.65,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-4.3533,x:546.45,y:734.9}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:1.1388,x:981.7,y:456.6,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:14.4439,x:1009.85,y:532.9,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:37.3674,x:1098.5,y:398.7,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:77.8682,x:896.85,y:282,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:39.3989,x:784.6,y:315.8}},{t:this.ikNode_14,p:{regX:42.6,scaleX:0.6732,scaleY:0.6732,rotation:39.6827,x:858.9,y:256.6,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.7915,x:972.2,y:320.4,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5073,x:809.1,y:454.55,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3762,x:951.9,y:379.75,regX:55.9}},{t:this.ikNode_3,p:{regX:160,scaleX:0.6728,scaleY:0.6728,rotation:-98.0961,x:832.95,y:584.4,regY:172.8}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-129.5662,x:763.25,y:675.25,regY:13.9,regX:257.5}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-147.9092,x:925.3,y:775.25,regY:94.8}},{t:this.ikNode_6,p:{regY:94,scaleX:0.7631,rotation:157.8023,x:684.95,y:569.7,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-13.2684,x:631.05,y:664.05,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-1.9573,x:570.65,y:760.45}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:-6.6508,x:984.8,y:455,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:13.2896,x:1023.1,y:526.7,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:62.6445,x:1109.05,y:391,regX:39.4}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:77.4402,x:891.65,y:283.1,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:51.2447,x:774.1,y:311.35}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:51.67,x:859.05,y:268.75,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.7874,x:971.9,y:320.2,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.1,scaleY:0.8066,rotation:19.5045,x:809.05,y:454.35,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3749,x:951.8,y:380.35,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-110.7498,x:836.05,y:583.6,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-143.6319,x:788.1,y:687.55,regY:13.9,regX:257.5}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-161.9747,x:969.5,y:745.25,regY:94.7}},{t:this.ikNode_6,p:{regY:94.1,scaleX:0.7631,rotation:155.9171,x:703.9,y:587.1,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-16.1238,x:653.15,y:683.1,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:0.434,x:597.55,y:782.5}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:-14.4597,x:987.75,y:453.1,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:12.1253,x:1035.55,y:519,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:87.9072,x:1118.65,y:381.65,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:77.0158,x:886.55,y:284.3,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:63.0906,x:764,y:306.95}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:63.6586,x:855.9,y:282.9,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.7718,x:971.65,y:320.05,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.1,scaleY:0.8065,rotation:19.5038,x:808.95,y:454.2,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3671,x:951.65,y:381,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-123.4064,x:839.15,y:582.85,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-157.6979,x:815.15,y:694.8,regY:13.8,regX:257.5}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-176.0415,x:1005.2,y:706.6,regY:94.7}},{t:this.ikNode_6,p:{regY:94,scaleX:0.7631,rotation:154.032,x:723.85,y:600.6,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-18.9805,x:676.25,y:698.2,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:2.8312,x:625.65,y:800.25}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:-22.2743,x:990.65,y:451.2,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.9533,x:1046.95,y:509.85,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:113.1583,x:1127.25,y:370.95,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.6045,x:881.65,y:285.65,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9521,x:754.4,y:302.85}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:75.6614,x:849.25,y:298.25,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.7509,x:971.25,y:320,regX:91.4,regY:167.8}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5018,x:847.15,y:444.65,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3567,x:989.85,y:371.4,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-110.9023,x:877.45,y:573.15,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-141.698,x:829.95,y:677.3,regY:13.9,regX:257.4}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-166.0886,x:1009.1,y:741.05,regY:94.7}},{t:this.ikNode_6,p:{regY:94.1,scaleX:0.7631,rotation:155.9321,x:737.75,y:573.85,regX:189}},{t:this.ikNode_7,p:{regX:94.6,regY:129.9,rotation:-15.8831,x:687.05,y:669.9,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:0.2157,x:631.05,y:769}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:-22.2825,x:1028.85,y:441.5,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.9441,x:1085.15,y:500.2,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:113.1496,x:1165.55,y:361.3,regX:39.2}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.6045,x:919.75,y:276,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9517,x:792.55,y:293.25}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:75.6601,x:887.4,y:288.6,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.7417,x:1009.4,y:310.3,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5014,x:885.25,y:435.05,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3476,x:1028.05,y:361.75,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-98.3967,x:915.75,y:563.6,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-125.7001,x:846.7,y:654.95,regY:13.8,regX:257.6}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-156.137,x:1001.6,y:765.55,regY:94.7}},{t:this.ikNode_6,p:{regY:94.2,scaleX:0.7631,rotation:157.8296,x:752.85,y:540.45,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-12.7884,x:699,y:634.65,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:-2.3942,x:637.55,y:730.65}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:-22.2895,x:1067.05,y:431.85,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.9349,x:1123.4,y:490.6,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:113.1414,x:1203.75,y:351.65,regX:39.2}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.6021,x:957.95,y:266.4,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9505,x:830.65,y:283.65}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:75.6589,x:925.5,y:278.95,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.7314,x:1047.6,y:300.75,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.5,x:923.5,y:425.4,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3372,x:1066.3,y:352.15,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6729,scaleY:0.6729,rotation:-85.8983,x:954.05,y:553.95,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-109.7002,x:866.95,y:628.2,regY:13.8,regX:257.5}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-146.1845,x:985.2,y:777.15,regY:94.7}},{t:this.ikNode_6,p:{regY:94.1,scaleX:0.7631,rotation:159.7257,x:772.5,y:501.75,regX:188.9}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-9.6914,x:715.4,y:594.2,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-5.009,x:649.05,y:686.7}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:-22.2953,x:1105.15,y:422.3,regX:40}},{t:this.ikNode_10,p:{regY:238.8,rotation:10.9255,x:1161.6,y:481.05,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:113.1315,x:1241.85,y:342.1,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5819,x:996.1,y:256.8,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9303,x:868.9,y:274}},{t:this.ikNode_14,p:{regX:42.8,scaleX:0.6732,scaleY:0.6732,rotation:75.64,x:963.85,y:269.45,regY:144.5}},{t:this.ikNode_15,p:{rotation:6.722,x:1085.85,y:291.15,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.499,x:961.75,y:415.8,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3203,x:1104.55,y:342.55,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-73.3938,x:992.4,y:544.35,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-93.7046,x:891.25,y:597.95,regY:13.8,regX:257.5}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-136.2322,x:963.85,y:773.75,regY:94.7}},{t:this.ikNode_6,p:{regY:94.1,scaleX:0.7631,rotation:161.6253,x:798.6,y:461.2,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-6.5969,x:738.65,y:551.8,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-7.624,x:667.3,y:640.55}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:-22.3122,x:1143.4,y:412.55,regX:40.1}},{t:this.ikNode_10,p:{regY:238.8,rotation:10.9097,x:1199.8,y:471.4,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:113.1146,x:1280.05,y:332.4,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5941,x:1034.25,y:247.15,scaleY:0.7965}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9426,x:907.1,y:264.4}},{t:this.ikNode_14,p:{regX:42.7,scaleX:0.6732,scaleY:0.6732,rotation:75.6507,x:1001.95,y:259.75,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.7051,x:1123.9,y:281.65,regX:91.3,regY:167.8}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.4966,x:999.85,y:406.15,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.332,x:1142.7,y:332.95,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-60.8906,x:1030.7,y:534.7,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-77.7119,x:920.3,y:565.3,regY:13.8,regX:257.5}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-126.2797,x:941.75,y:754.15,regY:94.7}},{t:this.ikNode_6,p:{regY:94.2,scaleX:0.7631,rotation:163.5225,x:831.4,y:422.45,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-3.5007,x:768.35,y:510.9,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.8,scaleX:0.6728,scaleY:0.6728,rotation:-10.2391,x:692.35,y:595.7}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:-22.297,x:1181.55,y:403.05,regX:40}},{t:this.ikNode_10,p:{regY:238.8,rotation:10.9204,x:1238,y:461.85,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:113.1274,x:1318.25,y:322.95,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5976,x:1072.5,y:237.55,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9467,x:945.3,y:254.8}},{t:this.ikNode_14,p:{regX:42.6,scaleX:0.6732,scaleY:0.6732,rotation:75.6548,x:1040.2,y:250.05,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.7156,x:1162.15,y:272.1,regX:91.3,regY:167.8}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.4966,x:1108.65,y:376.05,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3242,x:1251.5,y:302.95,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-66.1602,x:1144.25,y:503.35,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-86.5531,x:1037.1,y:543.85,regY:13.8,regX:257.6}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-135.1204,x:1087.25,y:727.25,regY:94.7}},{t:this.ikNode_6,p:{regY:94.1,scaleX:0.7631,rotation:159.9555,x:942.6,y:408.7,regX:188.9}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-6.02,x:885.2,y:500.9,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-12.7601,x:813,y:588.95}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:-22.3006,x:1290.3,y:372.95,regX:40}},{t:this.ikNode_10,p:{regY:238.8,rotation:10.9148,x:1346.85,y:431.7,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:113.1216,x:1427,y:292.75,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5976,x:1181.3,y:207.45,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9467,x:1054.1,y:224.7}},{t:this.ikNode_14,p:{regX:42.6,scaleX:0.6732,scaleY:0.6732,rotation:75.6548,x:1148.95,y:219.95,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.7104,x:1271,y:242,regX:91.3,regY:167.8}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8066,rotation:19.4963,x:1217.4,y:345.95,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.319,x:1360.35,y:272.85,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-71.4278,x:1257.65,y:471.85,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-95.3901,x:1155,y:522,regY:14,regX:257.6}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-143.962,x:1232.55,y:695.6,regY:94.7}},{t:this.ikNode_6,p:{regY:94.1,scaleX:0.7631,rotation:156.3874,x:1055.6,y:395.5,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-8.5394,x:1003.95,y:491.1,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-15.2805,x:935.8,y:582.3}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:-22.3064,x:1399,y:342.8,regX:40}},{t:this.ikNode_10,p:{regY:238.8,rotation:10.9084,x:1455.65,y:401.6,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:113.1146,x:1535.85,y:262.65,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5976,x:1290.15,y:177.4,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9467,x:1162.85,y:194.6}},{t:this.ikNode_14,p:{regX:42.6,scaleX:0.6732,scaleY:0.6732,rotation:75.6548,x:1257.7,y:189.9,regY:144.6}},{t:this.ikNode_15,p:{rotation:6.7038,x:1379.75,y:211.9,regX:91.3,regY:167.8}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8066,rotation:19.4952,x:1326.2,y:315.85,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.3021,x:1469,y:242.8,regX:55.8}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-76.6974,x:1371.25,y:440.2,regY:172.8}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-104.2313,x:1273.4,y:499.55,regY:13.8,regX:257.6}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-152.8027,x:1376.75,y:659.15,regY:94.7}},{t:this.ikNode_6,p:{regY:94,scaleX:0.7631,rotation:152.8203,x:1170.6,y:382.4,regX:189}},{t:this.ikNode_7,p:{regX:94.6,regY:129.8,rotation:-11.0596,x:1124.95,y:481,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-17.7997,x:1061,y:575}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:-22.3216,x:1507.75,y:312.65,regX:40}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.8928,x:1564.4,y:371.35,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:113.0989,x:1644.6,y:232.4,regX:39.2}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5816,x:1398.9,y:147.3,scaleY:0.7965}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9303,x:1271.55,y:164.45}},{t:this.ikNode_14,p:{regX:42.8,scaleX:0.6732,scaleY:0.6732,rotation:75.6387,x:1366.55,y:159.9,regY:144.5}},{t:this.ikNode_15,p:{rotation:6.6868,x:1488.45,y:181.8,regX:91.3,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.4942,x:1434.95,y:285.7,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.2891,x:1577.8,y:212.7,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-81.9682,x:1484.55,y:408.25,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-113.0727,x:1392.75,y:476.4,regY:13.8,regX:257.6}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-161.6423,x:1519.2,y:618.2,regY:94.7}},{t:this.ikNode_6,p:{regY:94.1,scaleX:0.7631,rotation:149.2517,x:1287.45,y:368.65,regX:189}},{t:this.ikNode_7,p:{regX:94.6,regY:129.8,rotation:-13.58,x:1248,y:469.95,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-20.3214,x:1188.2,y:566.7}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:-22.332,x:1616.55,y:282.45,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.8793,x:1673.2,y:341.2,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:113.0849,x:1753.4,y:202.3,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5808,x:1507.75,y:117.2,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9291,x:1380.3,y:134.35}},{t:this.ikNode_14,p:{regX:42.8,scaleX:0.6732,scaleY:0.6732,rotation:75.6371,x:1475.25,y:129.8,regY:144.5}},{t:this.ikNode_15,p:{rotation:6.6737,x:1597.3,y:151.65,regX:91.4,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.4942,x:1543.65,y:255.6,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.2904,x:1686.6,y:182.65,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-87.2378,x:1597.85,y:376.15,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-121.9145,x:1512.7,y:452.55,regY:13.8,regX:257.6}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:-170.4824,x:1659.55,y:573.2,regY:94.7}},{t:this.ikNode_6,p:{regY:94,scaleX:0.7631,rotation:145.6853,x:1405.75,y:353.8,regX:189}},{t:this.ikNode_7,p:{regX:94.6,regY:129.8,rotation:-16.102,x:1372.75,y:457.25,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-22.8405,x:1317.3,y:556.55}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:-22.3274,x:1725.2,y:252.4,regX:40}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.8819,x:1781.95,y:311.1,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:113.0873,x:1862.2,y:172.25,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5819,x:1616.5,y:87.1,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9316,x:1489.1,y:104.2}},{t:this.ikNode_14,p:{regX:42.8,scaleX:0.6732,scaleY:0.6732,rotation:75.64,x:1584.05,y:99.75,regY:144.5}},{t:this.ikNode_15,p:{rotation:6.6763,x:1705.9,y:121.6,regX:91.2,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.4932,x:1652.35,y:225.5,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.2696,x:1795.4,y:152.55,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-92.5008,x:1711.1,y:344,regY:172.7}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-130.7566,x:1633.35,y:427.85,regY:13.9,regX:257.6}},{t:this.ikNode_5,p:{regX:45.2,scaleX:0.6728,scaleY:0.6728,rotation:-179.323,x:1796.9,y:524.5,regY:94.7}},{t:this.ikNode_6,p:{regY:94,scaleX:0.7631,rotation:142.1181,x:1525.4,y:337.3,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.9,rotation:-18.6212,x:1498.95,y:442.75,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-25.3621,x:1447.85,y:544.3}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:-22.3472,x:1834.1,y:222.2,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.8623,x:1890.7,y:280.9,scaleX:0.6726,scaleY:0.6726}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:113.0663,x:1971,y:141.95,regX:39.2}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5795,x:1725.25,y:57,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9291,x:1597.85,y:74.15}},{t:this.ikNode_14,p:{regX:42.8,scaleX:0.6732,scaleY:0.6732,rotation:75.6359,x:1692.8,y:69.6,regY:144.5}},{t:this.ikNode_15,p:{rotation:6.6554,x:1814.65,y:91.5,regX:91.2,regY:167.7}}]},1).to({state:[{t:this.ikNode_1,p:{regY:165.2,scaleY:0.8065,rotation:19.4918,x:1761.2,y:195.4,regX:238.2}},{t:this.ikNode_2,p:{scaleX:0.6728,scaleY:0.6728,rotation:1.2852,x:1904.15,y:122.5,regX:55.9}},{t:this.ikNode_3,p:{regX:160.1,scaleX:0.6728,scaleY:0.6728,rotation:-97.7694,x:1824.3,y:311.55,regY:172.8}},{t:this.ikNode_4,p:{scaleX:0.6728,scaleY:0.6728,rotation:-139.5991,x:1754.45,y:402.3,regY:13.8,regX:257.5}},{t:this.ikNode_5,p:{regX:45.1,scaleX:0.6728,scaleY:0.6728,rotation:171.8421,x:1931,y:472.65,regY:94.7}},{t:this.ikNode_6,p:{regY:94.2,scaleX:0.7631,rotation:138.5523,x:1645.75,y:318.95,regX:189}},{t:this.ikNode_7,p:{regX:94.7,regY:129.8,rotation:-21.1404,x:1625.9,y:425.9,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_8,p:{regX:71.9,scaleX:0.6728,scaleY:0.6728,rotation:-27.8825,x:1579.3,y:529.65}},{t:this.ikNode_9,p:{scaleX:0.6726,scaleY:0.6726,rotation:-22.3286,x:1942.8,y:192.1,regX:40.1}},{t:this.ikNode_10,p:{regY:238.7,rotation:10.8783,x:1999.5,y:250.9,scaleX:0.6725,scaleY:0.6725}},{t:this.ikNode_11,p:{scaleX:0.6727,scaleY:0.6727,rotation:113.0832,x:2079.8,y:112.05,regX:39.3}},{t:this.ikNode_12,p:{regY:0.1,scaleX:0.8149,rotation:76.5853,x:1834.1,y:26.95,scaleY:0.7966}},{t:this.ikNode_13,p:{scaleX:0.6732,scaleY:0.6732,rotation:74.9332,x:1706.65,y:44}},{t:this.ikNode_14,p:{regX:42.8,scaleX:0.6732,scaleY:0.6732,rotation:75.6428,x:1801.55,y:39.7,regY:144.5}},{t:this.ikNode_15,p:{rotation:6.6711,x:1923.55,y:61.5,regX:91.3,regY:167.7}}]},1).wait(1));

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
	this.Каркас_23___копия.setTransform(1298.5,-558.2,1,1,0,0,0,1298.5,-558.2);
	this.Каркас_23___копия.depth = 0;
	this.Каркас_23___копия.isAttachedToCamera = 0
	this.Каркас_23___копия.isAttachedToMask = 0
	this.Каркас_23___копия.layerDepth = 0
	this.Каркас_23___копия.layerIndex = 0
	this.Каркас_23___копия.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Каркас_23___копия).wait(55));

	// Каркас_23_obj_
	this.Каркас_23 = new lib.Scene_1_Каркас_23();
	this.Каркас_23.name = "Каркас_23";
	this.Каркас_23.setTransform(1485.1,-222.8,1,1,0,0,0,1485.1,-222.8);
	this.Каркас_23.depth = 0;
	this.Каркас_23.isAttachedToCamera = 0
	this.Каркас_23.isAttachedToMask = 0
	this.Каркас_23.layerDepth = 0
	this.Каркас_23.layerIndex = 1
	this.Каркас_23.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Каркас_23).wait(30).to({regX:18242.7,regY:-12012,scaleX:0.0502,scaleY:0.0502,y:-222.75,depth:10000},0).wait(1).to({regX:1485.1,regY:-222.8,scaleX:1,scaleY:1,y:-222.8,depth:0},0).wait(24));

	// Слой_8_obj_
	this.Слой_8 = new lib.Scene_1_Слой_8();
	this.Слой_8.name = "Слой_8";
	this.Слой_8.setTransform(1523.6,123.3,1,1,0,0,0,1523.6,123.3);
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
	this.Каркас_5.setTransform(1511.7,135.3,1,1,0,0,0,1511.7,135.3);
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
	this.Layer_1.setTransform(797.6,183.5,1,1,0,0,0,797.6,183.5);
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
	this.Слой_7.setTransform(1885.1,41.6,1,1,0,0,0,1885.1,41.6);
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
	this.Слой_11.setTransform(263.7,785.3,1,1,0,0,0,263.7,785.3);
	this.Слой_11.depth = 0;
	this.Слой_11.isAttachedToCamera = 0
	this.Слой_11.isAttachedToMask = 0
	this.Слой_11.layerDepth = 0
	this.Слой_11.layerIndex = 7
	this.Слой_11.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Слой_11).wait(55));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-870.8,-795.9,3816.3999999999996,2378);
// library properties:
lib.properties = {
	id: '4560913AEE81BC46B002FCE291DF372E',
	width: 1200,
	height: 800,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_132.png", id:"CachedBmp_132"},
		{src:"images/CachedBmp_90.png", id:"CachedBmp_90"},
		{src:"images/CachedBmp_131.png", id:"CachedBmp_131"},
		{src:"images/CachedBmp_133.png", id:"CachedBmp_133"},
		{src:"images/CachedBmp_134.png", id:"CachedBmp_134"},
		{src:"images/CachedBmp_135.png", id:"CachedBmp_135"},
		{src:"images/CachedBmp_136.png", id:"CachedBmp_136"},
		{src:"images/CachedBmp_137.png", id:"CachedBmp_137"},
		{src:"images/CachedBmp_257.png", id:"CachedBmp_257"},
		{src:"images/CachedBmp_87.png", id:"CachedBmp_87"},
		{src:"images/CachedBmp_126.png", id:"CachedBmp_126"},
		{src:"images/CachedBmp_127.png", id:"CachedBmp_127"},
		{src:"images/CachedBmp_124.png", id:"CachedBmp_124"},
		{src:"images/CachedBmp_125.png", id:"CachedBmp_125"},
		{src:"images/CachedBmp_123.png", id:"CachedBmp_123"},
		{src:"images/CachedBmp_122.png", id:"CachedBmp_122"},
		{src:"images/CachedBmp_121.png", id:"CachedBmp_121"},
		{src:"images/CachedBmp_120.png", id:"CachedBmp_120"},
		{src:"images/CachedBmp_474.png", id:"CachedBmp_474"},
		{src:"images/CachedBmp_86.png", id:"CachedBmp_86"},
		{src:"images/CachedBmp_169.png", id:"CachedBmp_169"},
		{src:"images/CachedBmp_170.png", id:"CachedBmp_170"},
		{src:"images/CachedBmp_171.png", id:"CachedBmp_171"},
		{src:"images/CachedBmp_165.png", id:"CachedBmp_165"},
		{src:"images/CachedBmp_166.png", id:"CachedBmp_166"},
		{src:"images/CachedBmp_168.png", id:"CachedBmp_168"},
		{src:"images/CachedBmp_167.png", id:"CachedBmp_167"},
		{src:"images/CachedBmp_164.png", id:"CachedBmp_164"},
		{src:"images/CachedBmp_161.png", id:"CachedBmp_161"},
		{src:"images/CachedBmp_261.png", id:"CachedBmp_261"},
		{src:"images/CachedBmp_145.png", id:"CachedBmp_145"},
		{src:"images/CachedBmp_143.png", id:"CachedBmp_143"},
		{src:"images/CachedBmp_144.png", id:"CachedBmp_144"},
		{src:"images/CachedBmp_142.png", id:"CachedBmp_142"},
		{src:"images/CachedBmp_478.png", id:"CachedBmp_478"},
		{src:"images/CachedBmp_479.png", id:"CachedBmp_479"},
		{src:"images/CachedBmp_476.png", id:"CachedBmp_476"},
		{src:"images/CachedBmp_477.png", id:"CachedBmp_477"},
		{src:"images/CachedBmp_473.png", id:"CachedBmp_473"},
		{src:"images/CachedBmp_432.png", id:"CachedBmp_432"},
		{src:"images/CachedBmp_475.png", id:"CachedBmp_475"},
		{src:"images/wing2_atlas_1.png", id:"wing2_atlas_1"},
		{src:"images/wing2_atlas_2.png", id:"wing2_atlas_2"},
		{src:"images/wing2_atlas_3.png", id:"wing2_atlas_3"},
		{src:"images/wing2_atlas_4.png", id:"wing2_atlas_4"},
		{src:"images/wing2_atlas_5.png", id:"wing2_atlas_5"},
		{src:"images/wing2_atlas_6.png", id:"wing2_atlas_6"},
		{src:"images/wing2_atlas_7.png", id:"wing2_atlas_7"},
		{src:"images/wing2_atlas_8.png", id:"wing2_atlas_8"},
		{src:"images/wing2_atlas_9.png", id:"wing2_atlas_9"},
		{src:"images/wing2_atlas_10.png", id:"wing2_atlas_10"},
		{src:"images/wing2_atlas_11.png", id:"wing2_atlas_11"},
		{src:"images/wing2_atlas_12.png", id:"wing2_atlas_12"},
		{src:"images/wing2_atlas_13.png", id:"wing2_atlas_13"},
		{src:"images/wing2_atlas_14.png", id:"wing2_atlas_14"},
		{src:"images/wing2_atlas_15.png", id:"wing2_atlas_15"},
		{src:"images/wing2_atlas_16.png", id:"wing2_atlas_16"},
		{src:"images/wing2_atlas_17.png", id:"wing2_atlas_17"},
		{src:"images/wing2_atlas_18.png", id:"wing2_atlas_18"},
		{src:"images/wing2_atlas_19.png", id:"wing2_atlas_19"},
		{src:"images/wing2_atlas_20.png", id:"wing2_atlas_20"},
		{src:"images/wing2_atlas_21.png", id:"wing2_atlas_21"},
		{src:"images/wing2_atlas_22.png", id:"wing2_atlas_22"},
		{src:"images/wing2_atlas_23.png", id:"wing2_atlas_23"},
		{src:"images/wing2_atlas_24.png", id:"wing2_atlas_24"},
		{src:"images/wing2_atlas_25.png", id:"wing2_atlas_25"},
		{src:"images/wing2_atlas_26.png", id:"wing2_atlas_26"},
		{src:"images/wing2_atlas_27.png", id:"wing2_atlas_27"},
		{src:"images/wing2_atlas_28.png", id:"wing2_atlas_28"},
		{src:"images/wing2_atlas_29.png", id:"wing2_atlas_29"},
		{src:"images/wing2_atlas_30.png", id:"wing2_atlas_30"},
		{src:"images/wing2_atlas_31.png", id:"wing2_atlas_31"},
		{src:"images/wing2_atlas_32.png", id:"wing2_atlas_32"},
		{src:"images/wing2_atlas_33.png", id:"wing2_atlas_33"},
		{src:"images/wing2_atlas_34.png", id:"wing2_atlas_34"},
		{src:"images/wing2_atlas_35.png", id:"wing2_atlas_35"},
		{src:"images/wing2_atlas_36.png", id:"wing2_atlas_36"},
		{src:"images/wing2_atlas_37.png", id:"wing2_atlas_37"},
		{src:"images/wing2_atlas_38.png", id:"wing2_atlas_38"},
		{src:"images/wing2_atlas_39.png", id:"wing2_atlas_39"},
		{src:"images/wing2_atlas_40.png", id:"wing2_atlas_40"},
		{src:"images/wing2_atlas_41.png", id:"wing2_atlas_41"},
		{src:"images/wing2_atlas_42.png", id:"wing2_atlas_42"},
		{src:"images/wing2_atlas_43.png", id:"wing2_atlas_43"},
		{src:"images/wing2_atlas_44.png", id:"wing2_atlas_44"},
		{src:"images/wing2_atlas_45.png", id:"wing2_atlas_45"},
		{src:"images/wing2_atlas_46.png", id:"wing2_atlas_46"},
		{src:"images/wing2_atlas_47.png", id:"wing2_atlas_47"}
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