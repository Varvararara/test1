(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"gif4_atlas_1", frames: [[1743,204,17,18],[1607,204,77,84],[1719,237,147,29],[1494,203,111,73],[1905,225,129,95],[1905,109,117,114],[1777,109,126,126],[1777,0,158,107],[1627,0,148,127],[1937,0,99,84],[0,0,1229,691],[1686,204,31,140],[1494,0,131,201],[1719,204,22,18],[1627,129,142,73],[1231,0,261,304]]}
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



(lib.CachedBmp_524 = function() {
	this.initialize(ss["gif4_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_525 = function() {
	this.initialize(ss["gif4_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_520 = function() {
	this.initialize(ss["gif4_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_526 = function() {
	this.initialize(ss["gif4_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_519 = function() {
	this.initialize(ss["gif4_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_517 = function() {
	this.initialize(ss["gif4_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_518 = function() {
	this.initialize(ss["gif4_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_516 = function() {
	this.initialize(ss["gif4_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_515 = function() {
	this.initialize(ss["gif4_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_510 = function() {
	this.initialize(ss["gif4_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib._2e6d7347404993e5269d3df1c23abfc0 = function() {
	this.initialize(ss["gif4_atlas_1"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_527 = function() {
	this.initialize(ss["gif4_atlas_1"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_528 = function() {
	this.initialize(ss["gif4_atlas_1"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_509 = function() {
	this.initialize(ss["gif4_atlas_1"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_511 = function() {
	this.initialize(ss["gif4_atlas_1"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_529 = function() {
	this.initialize(ss["gif4_atlas_1"]);
	this.gotoAndStop(15);
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


(lib.Символ15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_511();
	this.instance.setTransform(429.9,253.8,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_510();
	this.instance_1.setTransform(443.1,248.2,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_509();
	this.instance_2.setTransform(452.2,261.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(429.9,248.2,71,42.10000000000002);


(lib.Символ1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_529();
	this.instance.setTransform(0,68.4,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_528();
	this.instance_1.setTransform(25.6,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_527();
	this.instance_2.setTransform(66.2,30.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ1, new cjs.Rectangle(0,0,130.5,220.4), null);


(lib.Анимация6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_526();
	this.instance.setTransform(-27.85,-15.3,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_525();
	this.instance_1.setTransform(-17.55,-20.95,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_524();
	this.instance_2.setTransform(-10.35,-7.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.8,-20.9,55.5,42.099999999999994);


(lib.Анимация5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_526();
	this.instance.setTransform(-27.85,-15.3,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_525();
	this.instance_1.setTransform(-17.55,-20.95,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_524();
	this.instance_2.setTransform(-10.35,-7.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.8,-20.9,55.5,42.099999999999994);


(lib.Анимация2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_520();
	this.instance.setTransform(-28.3,3.8,0.381,0.381);

	this.instance_1 = new lib.CachedBmp_519();
	this.instance_1.setTransform(-24.2,-34.4,0.381,0.381);

	this.instance_2 = new lib.CachedBmp_518();
	this.instance_2.setTransform(-23.8,-20.3,0.381,0.381);

	this.instance_3 = new lib.CachedBmp_517();
	this.instance_3.setTransform(-25,-43.3,0.381,0.381);

	this.instance_4 = new lib.CachedBmp_516();
	this.instance_4.setTransform(-30,3.05,0.381,0.381);

	this.instance_5 = new lib.CachedBmp_515();
	this.instance_5.setTransform(-27.8,-5.2,0.381,0.381);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30,-43.3,60.2,87.1);


(lib.Анимация1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_529();
	this.instance.setTransform(-65.15,-41.45,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_528();
	this.instance_1.setTransform(-39.55,-109.85,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_527();
	this.instance_2.setTransform(1.05,-79.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-65.1,-109.8,130.5,220.39999999999998);


// stage content:
(lib.Безымянный1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(30));

	// chicken
	this.instance = new lib.Анимация2("synched",0);
	this.instance.setTransform(674.9,377.35);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:4,regY:16.2,rotation:-74.9998,x:639.85,y:386.7},3).to({rotation:-134.9994,x:597.05,y:386.65},4).to({regY:16.1,rotation:-194.999,x:574,y:386.7},3).to({regX:20.5,regY:20.6,scaleX:0.7558,scaleY:0.7558,rotation:-284.9989,x:528.7,y:417.8},3).to({rotation:-359.9988,x:528.75,y:402.2},2).to({startPosition:0},1).to({rotation:-269.9988,x:552.1,y:421.6},3).to({regY:20.4,scaleX:1.1845,scaleY:1.1054,rotation:-206.9966,x:571.1,y:415.85},3).to({regX:20.4,regY:20.3,scaleX:1.3124,scaleY:1.2862,rotation:-136.281,x:598,y:425.55},5).to({regX:20.5,regY:20.6,scaleX:0.7558,scaleY:0.7558,rotation:0.0012,x:706.15,y:510.95},2).wait(1));

	// rabbit
	this.instance_1 = new lib.Символ1();
	this.instance_1.setTransform(178.25,370.35,1,1,0,0,0,65.2,110.1);

	this.instance_2 = new lib.Анимация1("synched",0);
	this.instance_2.setTransform(164.95,370.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_1}]},10).to({state:[{t:this.instance_1}]},4).to({state:[{t:this.instance_1}]},7).to({state:[{t:this.instance_2}]},8).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:172.05,y:306.55},10).to({x:169.8,y:329.75},4).to({x:165.9,y:370.35},7).to({_off:true,regX:0,regY:0,x:164.95,y:370.1,mode:"synched",startPosition:0},8).wait(1));

	// fish
	this.instance_3 = new lib.Анимация5("synched",0);
	this.instance_3.setTransform(476,265);

	this.instance_4 = new lib.Анимация6("synched",0);
	this.instance_4.setTransform(473.55,288.9);
	this.instance_4._off = true;

	this.instance_5 = new lib.Символ15("synched",0);
	this.instance_5.setTransform(465.5,269.25,0.4746,0.4746,0,0,0,451.9,134.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3}]}).to({state:[{t:this.instance_4}]},28).to({state:[{t:this.instance_5}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true,guide:{path:[476,265,477.2,264.6,478.4,264.9,478.4,264.9,478.4,265,476.7,266.1,476,266.8,475.4,267.3,475.2,267.9,469.1,266.3,461.9,265.1,455.7,264.1,443.7,262.8,434.2,261.7,429.3,261.9,424.5,262.1,415,263.8,377.8,270,340,269,335.6,268.8,333.3,269,329.6,269.2,326.8,270.1,323.4,271.3,318.2,275.1,312.5,279.4,309.8,280.6,303.8,283.4,295,282.7,293,282.6,279.6,280.5,271.6,279.2,261.5,278.8,255.1,278.5,243.3,278.4,231.5,278.3,225.6,278.7,215.7,279.3,208,281.3,201.8,283.1,198.5,285.7,196.4,287.5,195.2,289.8,194,292.4,194.2,294.9,194.4,297.9,197.1,301.6,198.6,303.7,201.7,307.9,202.5,309.3,203.9,312.2,205.2,314.8,206.8,315.9,208.2,317,210.4,317.5,211.6,317.8,214.3,318.1,219.4,318.7,229.7,320.2,238.7,321.3,245,321.1,249.2,321,257.5,319.8,270.1,318.1,282.7,316.3,290.3,315.3,294.3,314.5,300.7,313.3,305.6,311.5,308.4,310.5,313.7,308.2,318.6,306.2,322,305.5,325.6,304.8,330.8,304.8,333.8,304.8,339.6,304.9,343.2,304.8,345.1,304.2,346.8,303.7,349.1,302.3,352.3,300.3,352.9,300,357.4,297.8,365.7,297.7,375.9,297.7,379.1,297,380.7,296.6,384.6,295.3,388.1,294.1,390.1,293.7,392.7,293.3,395.9,293.4,397.8,293.4,401.6,293.8,410.8,294.8,420,295.7,431.8,296.9,437.5,298.4,440.3,299.2,440.7,299.2,442.6,299.6,444,299.5,445.9,299.4,448,298.3,449.4,297.7,451.7,296.1,455,294,458.3,291.8,461.5,289.7,463.3,289.3,463.9,289.2,465.8,289,467.4,288.8,468.3,288.5,470,287.8,472.5,284.9,474.3,282.9,475.6,281.1,477.2,281.4,478.7,281.4,476.2,285.2,473.6,288.9,473.6,288.9,473.5,288.9]}},28).wait(2));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({_off:false},28).to({_off:true,regX:451.9,regY:134.1,scaleX:0.4746,scaleY:0.4746,guide:{path:[473.5,288.9,473.6,288.9,473.6,288.9,476.2,285.2,478.7,281.4,477.2,281.4,475.6,281.1,474.3,282.9,472.5,284.9,470,287.8,468.3,288.5,467.4,288.8,465.8,289,463.9,289.2,463.3,289.3,461.5,289.7,458.3,291.8,455,294,451.7,296.1,449.4,297.7,448,298.3,445.9,299.4,444,299.5,442.6,299.6,440.7,299.2,440.3,299.2,437.5,298.4,431.8,296.9,420,295.7,410.8,294.8,401.6,293.8,397.8,293.4,395.9,293.4,392.7,293.3,390.1,293.7,388.1,294.1,384.6,295.3,380.7,296.6,379.1,297,375.9,297.7,365.7,297.7,357.4,297.8,352.9,300,352.3,300.3,349.1,302.3,346.8,303.7,345.1,304.2,343.2,304.8,339.6,304.9,333.8,304.8,330.8,304.8,325.6,304.8,322,305.5,318.6,306.2,313.7,308.2,308.4,310.5,305.6,311.5,300.7,313.3,294.3,314.5,290.3,315.3,282.7,316.3,270.1,318.1,257.5,319.8,249.2,321,245,321.1,238.7,321.3,229.7,320.2,219.4,318.7,214.3,318.1,211.6,317.8,210.4,317.5,208.2,317,206.8,315.9,205.2,314.8,203.9,312.2,202.5,309.3,201.7,307.9,198.6,303.7,197.1,301.6,194.4,297.9,194.2,294.9,194,292.4,195.2,289.8,196.4,287.5,198.5,285.7,201.8,283.1,208,281.3,215.7,279.3,225.6,278.7,231.5,278.3,243.3,278.4,255.1,278.5,261.5,278.8,271.6,279.2,279.6,280.5,293,282.6,295,282.7,303.8,283.4,309.8,280.6,312.5,279.4,318.2,275.1,323.4,271.3,326.8,270.1,329.6,269.2,333.3,269,335.6,268.8,340,269,377.8,270,415,263.8,424.5,262.1,429.3,261.9,434.2,261.7,443.7,262.8,455.7,264.1,461.9,265.1,464.1,265.5,466.1,265.9]}},1).wait(1));

	// Слой_10
	this.instance_6 = new lib._2e6d7347404993e5269d3df1c23abfc0();
	this.instance_6.setTransform(-17,-14,0.5343,0.7149);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(30));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(303,226,410.5,302.5);
// library properties:
lib.properties = {
	id: '3F946D5821FE1D4C88220CD86F11973C',
	width: 640,
	height: 480,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/gif4_atlas_1.png", id:"gif4_atlas_1"}
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