(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"text_atlas_1", frames: [[0,0,1920,976]]},
		{name:"text_atlas_2", frames: [[0,1095,1229,691],[0,0,1469,1093]]},
		{name:"text_atlas_3", frames: [[1921,272,110,171],[1363,415,110,171],[941,0,193,270],[1331,0,192,270],[1136,0,193,270],[1525,0,191,270],[1475,415,110,171],[941,445,110,171],[1718,0,167,270],[941,272,210,171],[1887,0,158,270],[1587,445,110,171],[1699,445,110,171],[1811,445,110,171],[1923,445,110,171],[941,643,134,98],[1153,272,290,97],[1445,272,192,141],[0,861,1500,6],[1277,470,83,98],[0,869,1500,6],[1823,618,136,98],[1188,761,100,98],[1153,371,208,97],[1501,618,166,97],[1502,816,74,97],[1634,717,126,97],[1053,470,110,171],[1578,816,72,97],[1669,618,152,97],[1762,718,124,97],[1501,717,131,97],[1077,742,109,97],[1387,761,88,97],[1165,470,110,171],[1077,643,132,97],[1888,718,120,97],[941,743,107,97],[1290,761,95,97],[1961,618,83,97],[1639,272,139,171],[1277,588,110,171],[1780,272,139,171],[1652,816,71,97],[0,0,939,783],[1389,588,110,171]]}
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



(lib.CachedBmp_53 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.propertymap_logo_large = function() {
	this.initialize(ss["text_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._2e6d7347404993e5269d3df1c23abfc0 = function() {
	this.initialize(ss["text_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._1 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["text_atlas_3"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["text_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();
// helper functions:

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


(lib._0 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_55();
	this.instance.setTransform(0,0,0.3164,0.3164);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._0, new cjs.Rectangle(0,0,61.1,85.4), null);


(lib.Ц = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_54();
	this.instance.setTransform(0,0,0.3164,0.3164);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Ц, new cjs.Rectangle(0,0,61.1,85.4), null);


(lib.Т = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_53();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Т, new cjs.Rectangle(0,0,55,85.5), null);


(lib.С = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_52();
	this.instance.setTransform(0,0,0.3164,0.3164);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.С, new cjs.Rectangle(0,0,52.9,85.4), null);


(lib.Р = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_51();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Р, new cjs.Rectangle(0,0,55,85.5), null);


(lib.Н = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_50();
	this.instance.setTransform(0,0,0.3164,0.3164);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Н, new cjs.Rectangle(0,0,60.5,85.4), null);


(lib.Л = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_49();
	this.instance.setTransform(0,0,0.3164,0.3164);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Л, new cjs.Rectangle(0,0,60.8,85.4), null);


(lib.Е2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_48();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Е2, new cjs.Rectangle(0,0,55,85.5), null);


(lib.Е1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_47();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Е1, new cjs.Rectangle(0,0,55,85.5), null);


(lib.ЕСОЛГЦА = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_46();
	this.instance.setTransform(0,0,0.3164,0.3164);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ЕСОЛГЦА, new cjs.Rectangle(0,0,50,85.4), null);


(lib.В1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_45();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.В1, new cjs.Rectangle(0,0,55,85.5), null);


(lib.Анимация26 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib._1();
	this.instance.setTransform(101.45,-81,0.2156,0.2068,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-101,-81,202.5,161.9);


(lib.Анимация25 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_44();
	this.instance.setTransform(-37.95,-24.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37.9,-24.3,76,48.5);


(lib.Анимация24 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_43();
	this.instance.setTransform(-33,-24.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33,-24.3,66,48.5);


(lib.Анимация21 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_42();
	this.instance.setTransform(-52.55,-42.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-52.5,-42.7,105,85.5);


(lib.Анимация20 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_41();
	this.instance.setTransform(-27.5,-42.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-42.7,55,85.5);


(lib.Анимация18 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_40();
	this.instance.setTransform(-27.5,-42.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-42.7,55,85.5);


(lib.Анимация16 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_39();
	this.instance.setTransform(-27.5,-42.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-42.7,55,85.5);


(lib.Анимация12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_38();
	this.instance.setTransform(-72.45,-24.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.4,-24.3,145,48.5);


(lib.Анимация11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_38();
	this.instance.setTransform(-72.45,-24.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.4,-24.3,145,48.5);


(lib.Анимация10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_36();
	this.instance.setTransform(-33.5,-24.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.5,-24.5,67,49);


(lib.Анимация9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_35();
	this.instance.setTransform(-33.45,-24.55,0.3491,0.3491);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.4,-24.5,67,49.2);


// stage content:
(lib.зад7текст1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(58));

	// Слой_5
	this.instance = new lib.Р();
	this.instance.setTransform(-46.85,126.1,1,1,0,0,0,27.5,42.7);

	this.instance_1 = new lib.CachedBmp_1();
	this.instance_1.setTransform(465.55,306.4,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2();
	this.instance_2.setTransform(472.7,306.4,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_3();
	this.instance_3.setTransform(472.7,306.4,0.5,0.5);

	this.instance_4 = new lib.Анимация21("synched",0);
	this.instance_4.setTransform(537.9,349.1);
	this.instance_4._off = true;

	this.instance_5 = new lib.Анимация16("synched",0);
	this.instance_5.setTransform(882.7,349.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},14).to({state:[{t:this.instance_2}]},27).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_4}]},2).to({state:[{t:this.instance_4}]},4).to({state:[{t:this.instance_5}]},7).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true,regX:0,regY:0,scaleX:0.5,scaleY:0.5,x:465.55,y:306.4},14).wait(44));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(46).to({_off:false},0).to({x:614.1},4).to({_off:true,x:882.7},7).wait(1));

	// Слой_4
	this.instance_6 = new lib.Е2();
	this.instance_6.setTransform(-94.45,126.1,1,1,0,0,0,27.5,42.7);

	this.instance_7 = new lib.CachedBmp_4();
	this.instance_7.setTransform(422.05,306.4,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_5();
	this.instance_8.setTransform(430.25,327.05,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_6();
	this.instance_9.setTransform(433.65,327.05,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_7();
	this.instance_10.setTransform(437.1,327.05,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_8();
	this.instance_11.setTransform(440.5,327.05,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_9();
	this.instance_12.setTransform(443.95,327.05,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_43();
	this.instance_13.setTransform(447.35,327.05,0.5,0.5);

	this.instance_14 = new lib.Анимация24("synched",0);
	this.instance_14.setTransform(521.3,351.7);
	this.instance_14._off = true;

	this.instance_15 = new lib.Анимация18("synched",0);
	this.instance_15.setTransform(752.75,349.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).to({state:[{t:this.instance_6}]},9).to({state:[{t:this.instance_7}]},11).to({state:[{t:this.instance_8}]},21).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},2).to({state:[{t:this.instance_15}]},9).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(9).to({_off:true,regX:0,regY:0,scaleX:0.5,scaleY:0.5,x:422.05,y:306.4},11).wait(38));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(48).to({_off:false},0).to({_off:true,x:752.75,y:349.1},9).wait(1));

	// Слой_3
	this.instance_16 = new lib.Т();
	this.instance_16.setTransform(-140.75,126.1,1,1,0,0,0,27.5,42.7);

	this.instance_17 = new lib.CachedBmp_11();
	this.instance_17.setTransform(376.6,306.4,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_12();
	this.instance_18.setTransform(379.45,327.05,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_13();
	this.instance_19.setTransform(379.9,327.05,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_14();
	this.instance_20.setTransform(380.4,327.05,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_44();
	this.instance_21.setTransform(380.85,327.05,0.5,0.5);

	this.instance_22 = new lib.Анимация25("synched",0);
	this.instance_22.setTransform(418.8,351.35);
	this.instance_22._off = true;

	this.instance_23 = new lib.Анимация20("synched",0);
	this.instance_23.setTransform(707.3,349.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_16}]}).to({state:[{t:this.instance_16}]},16).to({state:[{t:this.instance_17}]},8).to({state:[{t:this.instance_18}]},17).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},3).to({state:[{t:this.instance_23}]},10).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(16).to({_off:true,regX:0,regY:0,scaleX:0.5,scaleY:0.5,x:376.6,y:306.4},8).wait(34));
	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(47).to({_off:false},0).to({_off:true,x:707.3,y:349.1},10).wait(1));

	// Слой_2
	this.instance_24 = new lib.Е1();
	this.instance_24.setTransform(-188.3,126.1,1,1,0,0,0,27.5,42.7);

	this.instance_25 = new lib.CachedBmp_16();
	this.instance_25.setTransform(328,306.4,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_18();
	this.instance_26.setTransform(336.75,327.05,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_19();
	this.instance_27.setTransform(336.95,327.05,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_20();
	this.instance_28.setTransform(337.95,327.05,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_22();
	this.instance_29.setTransform(337.7,327.05,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_23();
	this.instance_30.setTransform(338.55,327.05,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_27();
	this.instance_31.setTransform(343.35,327.05,0.5,0.5);
	this.instance_31._off = true;

	this.instance_32 = new lib.Анимация11("synched",0);
	this.instance_32.setTransform(518.3,351.1);
	this.instance_32._off = true;

	this.instance_33 = new lib.Анимация12("synched",0);
	this.instance_33.setTransform(837.75,351.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_24}]}).to({state:[{t:this.instance_24}]},21).to({state:[{t:this.instance_24}]},9).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_26}]},9).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_32}]},2).to({state:[{t:this.instance_33}]},5).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(21).to({x:301.1,y:326.8},9).to({_off:true,regX:0,regY:0,scaleX:0.5,scaleY:0.5,x:328,y:306.4},1).wait(27));
	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(47).to({_off:false},0).wait(1).to({x:384.3,y:326.8},0).wait(1).to({x:402.25,y:327.05},0).wait(1).to({x:448.65},0).to({_off:true},2).wait(6));
	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(52).to({_off:false},0).to({_off:true,x:837.75},5).wait(1));

	// Слой_1
	this.instance_34 = new lib.В1();
	this.instance_34.setTransform(-235.45,126.1,1,1,0,0,0,27.5,42.7);

	this.instance_35 = new lib.CachedBmp_28();
	this.instance_35.setTransform(289.9,326.8,0.5,0.5);

	this.instance_36 = new lib.CachedBmp_30();
	this.instance_36.setTransform(290.05,326.8,0.5,0.5);

	this.instance_37 = new lib.CachedBmp_31();
	this.instance_37.setTransform(290.45,326.8,0.5,0.5);

	this.instance_38 = new lib.Анимация9("synched",0);
	this.instance_38.setTransform(310.55,351.65);
	this.instance_38._off = true;

	this.instance_39 = new lib.Анимация10("synched",0);
	this.instance_39.setTransform(673.85,351.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_34}]}).to({state:[{t:this.instance_34}]},30).to({state:[{t:this.instance_34}]},10).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_38}]},2).to({state:[{t:this.instance_38}]},2).to({state:[{t:this.instance_38}]},4).to({state:[{t:this.instance_39}]},5).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(30).to({x:-215.15,y:104.1},0).to({x:309.2,y:349.1},10).to({_off:true},1).wait(17));
	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(46).to({_off:false},0).to({scaleX:1.4323,x:375.55,y:351.4},2).to({regX:-0.1,scaleX:1.403,x:445.85},4).to({_off:true,regX:0,scaleX:1,x:673.85},5).wait(1));

	// Е
	this.instance_40 = new lib.ЕСОЛГЦА();
	this.instance_40.setTransform(434.8,90.05,1,1,0,0,0,24.9,42.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_40).to({rotation:-74.9998,x:366.95,y:69.5},10).to({regX:24.8,regY:42.8,scaleX:0.9999,scaleY:0.9999,rotation:-217.4984,x:319.65,y:55.1},7).to({regX:24.9,regY:42.7,scaleX:1,scaleY:1,rotation:-360,x:271.85,y:26},7).wait(1).to({regY:42.6,scaleX:1.1451,scaleY:1.1451,rotation:-294.5767,x:339.4,y:75.3},8).to({scaleX:1.4128,scaleY:1.4128,rotation:-144.5768,x:218.55,y:214.3},9).to({scaleX:1.5804,scaleY:1.5804,rotation:21.7014,x:307.55,y:57.65},15).wait(1));

	// Ц
	this.instance_41 = new lib.Ц();
	this.instance_41.setTransform(383.6,90.05,1,1,0,0,0,30.6,42.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_41).to({regY:42.6,rotation:127.5013,x:372.2,y:80.65},10).to({regY:42.8,rotation:285.0002,x:360.85,y:71.15},10).to({regX:30.5,rotation:240.0011,x:327.5,y:59.1},4).wait(1).to({scaleX:1.145,scaleY:1.145,rotation:305.4248,x:329.05,y:147.4},8).to({scaleX:1.4127,scaleY:1.4127,rotation:455.4233,x:185.1,y:130.95},9).to({regX:30.4,scaleX:1.5804,scaleY:1.5804,rotation:621.7029,x:370,y:138.9},15).wait(1));

	// Н
	this.instance_42 = new lib.Н();
	this.instance_42.setTransform(327.1,90.05,1,1,0,0,0,30.2,42.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_42).to({regY:42.8,rotation:60.8832,x:327,y:110.15},8).to({regY:42.7,scaleX:0.9999,scaleY:0.9999,rotation:125.4899,x:327.15,y:119.9},4).to({regY:42.6,rotation:168.296,y:124.8},2).to({regX:30.1,regY:42.8,scaleX:1,scaleY:1,rotation:330.0008,x:327,y:132.5},3).to({rotation:300.0016,x:329.15,y:120.85},7).wait(1).to({regX:30.2,scaleX:1.145,scaleY:1.145,rotation:365.4232,x:265.55,y:175.85},8).to({regY:42.6,scaleX:1.4127,scaleY:1.4127,rotation:515.4236,x:235.35,y:61.55},9).to({regX:30.1,regY:42.8,scaleX:1.5804,scaleY:1.5804,rotation:681.7024,x:336.3,y:230.4},15).wait(1));

	// Л
	this.instance_43 = new lib.Л();
	this.instance_43.setTransform(270.65,90.05,1,1,0,0,0,30.4,42.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_43).to({regY:42.6,rotation:150.0008,x:268.7,y:119.85},6).to({rotation:250.7165,x:267.85,y:134.75},3).to({regY:42.7,rotation:360,x:266.45,y:154.4},4).to({y:145.55},11).wait(1).to({regX:30.5,regY:42.6,scaleX:1.1451,scaleY:1.1451,rotation:425.4233,x:212.75,y:121.35},8).to({regX:30.4,scaleX:1.4128,scaleY:1.4128,rotation:575.4232,x:325.5,y:87.05},9).to({regY:42.8,scaleX:1.5804,scaleY:1.5804,rotation:741.7014,x:229.75,y:230.2},15).wait(1));

	// О
	this.instance_44 = new lib._0();
	this.instance_44.setTransform(213.9,90.05,1,1,0,0,0,30.6,42.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_44).to({rotation:165.0002,x:210.65,y:113.1},5).to({regX:30.7,rotation:30,x:207.15,y:135.75},5).to({regX:30.8,scaleX:0.9999,scaleY:0.9999,rotation:59.9995,x:220.2,y:116.7},14).wait(1).to({regY:42.6,scaleX:1.145,scaleY:1.145,rotation:125.4214,x:222.7,y:60.9},8).to({scaleX:1.4127,scaleY:1.4127,rotation:275.4202,x:352.05,y:157.8},9).to({regX:30.9,regY:42.7,scaleX:1.5804,scaleY:1.5804,rotation:441.7004,x:178.8,y:160.85},15).wait(1));

	// С
	this.instance_45 = new lib.С();
	this.instance_45.setTransform(157,90.05,1,1,0,0,0,26.4,42.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_45).to({regX:26.2,regY:42.6,scaleX:0.9999,scaleY:0.9999,rotation:-154.2858,x:166.05,y:82.8},3).to({regX:26.4,scaleX:1,scaleY:1,rotation:-300.0011,x:177.45,y:72.8},4).to({x:209.45,y:50.8},17).wait(1).to({scaleX:1.145,scaleY:1.145,rotation:-234.5774,x:286.65,y:21.1},8).to({scaleX:1.4127,scaleY:1.4127,rotation:-84.5783,x:308.3,y:239.75},9).to({scaleX:1.5804,scaleY:1.5804,rotation:81.7008,x:201.4,y:57.7},15).wait(1));

	// Слой_17
	this.instance_46 = new lib.CachedBmp_32();
	this.instance_46.setTransform(-14.45,426.1,0.5,0.5);

	this.instance_47 = new lib.CachedBmp_33();
	this.instance_47.setTransform(-14.45,426.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_46}]}).to({state:[{t:this.instance_47}]},57).wait(1));

	// Слой_18
	this.instance_48 = new lib.Анимация26("synched",0);
	this.instance_48.setTransform(-75.4,370.35,0.6856,0.6856);

	this.timeline.addTween(cjs.Tween.get(this.instance_48).to({regX:0.1,regY:0.1,scaleX:0.5558,scaleY:0.5558,x:170.3,y:380.35},33).to({scaleX:0.5559,scaleY:0.5559,x:187.6,y:382.7},7).to({regY:0.2,x:188.55,y:381.1},6).to({regY:0.1,scaleX:0.594,scaleY:0.594,x:741.65,y:377.55},11).wait(1));

	// Слой_16
	this.instance_49 = new lib.propertymap_logo_large();
	this.instance_49.setTransform(-89,156,0.4242,0.2341);

	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(58));

	// Слой_6
	this.instance_50 = new lib.CachedBmp_34();
	this.instance_50.setTransform(-10.3,-22.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(58));

	// Слой_10
	this.instance_51 = new lib._2e6d7347404993e5269d3df1c23abfc0();
	this.instance_51.setTransform(-17,-14,0.5343,0.7149);

	this.timeline.addTween(cjs.Tween.get(this.instance_51).to({_off:true},29).wait(29));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(57.1,208,853.1999999999999,316.1);
// library properties:
lib.properties = {
	id: '3F946D5821FE1D4C88220CD86F11973C',
	width: 640,
	height: 480,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/text_atlas_1.png", id:"text_atlas_1"},
		{src:"images/text_atlas_2.png", id:"text_atlas_2"},
		{src:"images/text_atlas_3.png", id:"text_atlas_3"}
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
an.compositions['3F946D5821FE1D4C88220CD86F11973C'] = {
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