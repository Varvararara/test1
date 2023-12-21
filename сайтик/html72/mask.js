(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"mask_atlas_1", frames: [[0,0,1916,1320]]},
		{name:"mask_atlas_2", frames: [[0,0,1669,1250]]},
		{name:"mask_atlas_3", frames: [[1043,1017,880,512],[1043,1531,880,512],[0,1017,1041,607],[0,0,2023,1015]]},
		{name:"mask_atlas_4", frames: [[133,0,443,228],[0,0,131,992],[133,230,144,144]]}
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



(lib.CachedBmp_70 = function() {
	this.initialize(ss["mask_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["mask_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["mask_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["mask_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(ss["mask_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["mask_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(ss["mask_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["mask_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["mask_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Анимация34 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_70();
	this.instance.setTransform(-110.85,-56.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-110.8,-56.8,221.5,114);


(lib.Анимация33 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_70();
	this.instance.setTransform(-110.85,-56.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-110.8,-56.8,221.5,114);


(lib.Анимация32 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_68();
	this.instance.setTransform(-32.85,-247.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.8,-247.7,65.5,496);


(lib.Анимация31 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_68();
	this.instance.setTransform(-32.85,-247.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.8,-247.7,65.5,496);


(lib.Анимация30 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_68();
	this.instance.setTransform(-32.85,-247.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.8,-247.7,65.5,496);


// stage content:
(lib.зад7маска = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(26));

	// Слой_32
	this.instance = new lib.CachedBmp_56();
	this.instance.setTransform(-131.9,-75,0.5,0.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(22).to({_off:false},0).wait(4));

	// Слой_33
	this.instance_1 = new lib.Анимация33("synched",0);
	this.instance_1.setTransform(-287.95,481.8);

	this.instance_2 = new lib.Анимация34("synched",0);
	this.instance_2.setTransform(81.15,482.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_1}]},18).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},3).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({startPosition:0},18).to({x:421.45,y:406.5},3).to({_off:true,x:81.15,y:482.6},1).wait(4));

	// Слой_30
	this.instance_3 = new lib.Анимация32("synched",0);
	this.instance_3.setTransform(-209.4,310.35);

	this.instance_4 = new lib.Анимация30("synched",0);
	this.instance_4.setTransform(214.15,373.1);
	this.instance_4._off = true;

	this.instance_5 = new lib.Анимация31("synched",0);
	this.instance_5.setTransform(445.6,559.7);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true,x:214.15,y:373.1},2).wait(24));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({_off:false},2).to({x:342.95,y:386.75},8).to({x:437.1,y:386.2},4).to({_off:true,x:445.6,y:559.7},3).wait(9));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(14).to({_off:false},3).to({x:565.25},3).wait(1).to({startPosition:0},0).wait(4).to({startPosition:0},0).wait(1));

	// Слой_36 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AnVGXQjCioAAjvIAAAAQAAjuDCioIAAAAQDDipESAAIAAAAQETAADDCpIAAAAQDCCoAADuIAAAAQAADvjCCoIAAAAQjDCpkTAAIAAAAQkSAAjDipg");
	var mask_graphics_1 = new cjs.Graphics().p("AnUGXQjDioAAjvIAAAAQAAjuDDioIAAAAQDCipESABIAAAAQETgBDDCpIAAAAQDCCoAADuIAAAAQAADvjCCoIAAAAQjDCpkTgBIAAAAQkSABjCipg");
	var mask_graphics_2 = new cjs.Graphics().p("AnUGXQjDipAAjuIAAAAQAAjtDDipIAAAAQDCioESgBIAAAAQETABDCCoIAAAAQDDCpAADtIAAAAQAADujDCpIAAAAQjCCokTABIAAAAQkSgBjCiog");
	var mask_graphics_3 = new cjs.Graphics().p("AnVGXQjCipAAjuIAAAAQAAjtDCipIAAAAQDDioESgBIAAAAQETABDDCoIAAAAQDCCpAADtIAAAAQAADujCCpIAAAAQjDCokTABIAAAAQkSgBjDiog");
	var mask_graphics_4 = new cjs.Graphics().p("AnVGXQjCipAAjuIAAAAQAAjtDCipIAAAAQDDipESAAIAAAAQETAADCCpIAAAAQDDCpAADtIAAAAQAADujDCpIAAAAQjCCokTABIAAAAQkSgBjDiog");
	var mask_graphics_5 = new cjs.Graphics().p("AnVGXQjCioAAjvIAAAAQAAjtDCipIAAAAQDDipESAAIAAAAQETAADDCpIAAAAQDCCpAADtIAAAAQAADvjCCoIAAAAQjDCpkTAAIAAAAQkSAAjDipg");
	var mask_graphics_6 = new cjs.Graphics().p("AnUGXQjDipAAjuIAAAAQAAjtDDipIAAAAQDCioESgBIAAAAQETABDCCoIAAAAQDDCpAADtIAAAAQAADujDCpIAAAAQjCCokTABIAAAAQkSgBjCiog");
	var mask_graphics_7 = new cjs.Graphics().p("AnVGXQjCipAAjuIAAAAQAAjtDCipIAAAAQDDioESgBIAAAAQETABDCCoIAAAAQDDCpAADtIAAAAQAADujDCpIAAAAQjCCokTABIAAAAQkSgBjDiog");
	var mask_graphics_8 = new cjs.Graphics().p("AnUGXQjDioAAjvIAAAAQAAjuDDioIAAAAQDCipESAAIAAAAQETAADCCpIAAAAQDDCoAADuIAAAAQAADvjDCoIAAAAQjCCpkTAAIAAAAQkSAAjCipg");
	var mask_graphics_9 = new cjs.Graphics().p("AnUGXQjDipAAjuIAAAAQAAjtDDipIAAAAQDCioESgBIAAAAQETABDCCoIAAAAQDDCpAADtIAAAAQAADujDCpIAAAAQjCCokTABIAAAAQkSgBjCiog");
	var mask_graphics_10 = new cjs.Graphics().p("AnUGXQjDioAAjvIAAAAQAAjuDDioIAAAAQDCipESABIAAAAQETgBDCCpIAAAAQDDCoAADuIAAAAQAADvjDCoIAAAAQjCCpkTgBIAAAAQkSABjCipg");
	var mask_graphics_11 = new cjs.Graphics().p("AnUGXQjDioAAjvIAAAAQAAjuDDioIAAAAQDCipESAAIAAAAQETAADCCpIAAAAQDDCoAADuIAAAAQAADvjDCoIAAAAQjCCokTABIAAAAQkSgBjCiog");
	var mask_graphics_12 = new cjs.Graphics().p("AnVGXQjCipAAjuIAAAAQAAjuDCioIAAAAQDDipESAAIAAAAQETAADDCpIAAAAQDCCoAADuIAAAAQAADujCCpIAAAAQjDCpkTAAIAAAAQkSAAjDipg");
	var mask_graphics_13 = new cjs.Graphics().p("AnVGXQjCioAAjvIAAAAQAAjuDCioIAAAAQDDipESAAIAAAAQETAADDCpIAAAAQDCCoAADuIAAAAQAADvjCCoIAAAAQjDCpkTAAIAAAAQkSAAjDipg");
	var mask_graphics_14 = new cjs.Graphics().p("AnVGXQjCioAAjvIAAAAQAAjuDCioIAAAAQDDipESAAIAAAAQETAADDCpIAAAAQDCCoAADuIAAAAQAADvjCCoIAAAAQjDCpkTAAIAAAAQkSAAjDipg");
	var mask_graphics_15 = new cjs.Graphics().p("AnVGXQjCioAAjvIAAAAQAAjuDCioIAAAAQDDipESAAIAAAAQETAADDCpIAAAAQDCCoAADuIAAAAQAADvjCCoIAAAAQjDCpkTAAIAAAAQkSAAjDipg");
	var mask_graphics_16 = new cjs.Graphics().p("AnVGXQjCioAAjvIAAAAQAAjuDCioIAAAAQDDipESAAIAAAAQETAADDCpIAAAAQDCCoAADuIAAAAQAADvjCCoIAAAAQjDCpkTAAIAAAAQkSAAjDipg");
	var mask_graphics_17 = new cjs.Graphics().p("AnVGXQjCioAAjvIAAAAQAAjuDCioIAAAAQDDipESAAIAAAAQETAADDCpIAAAAQDCCoAADuIAAAAQAADvjCCoIAAAAQjDCpkTAAIAAAAQkSAAjDipg");
	var mask_graphics_18 = new cjs.Graphics().p("AnVGXQjCioAAjvIAAAAQAAjuDCioIAAAAQDDipESAAIAAAAQETAADDCpIAAAAQDCCoAADuIAAAAQAADvjCCoIAAAAQjDCpkTAAIAAAAQkSAAjDipg");
	var mask_graphics_19 = new cjs.Graphics().p("AnVGXQjCioAAjvIAAAAQAAjuDCioIAAAAQDDipESAAIAAAAQETAADDCpIAAAAQDCCoAADuIAAAAQAADvjCCoIAAAAQjDCpkTAAIAAAAQkSAAjDipg");
	var mask_graphics_20 = new cjs.Graphics().p("AnVGXQjCioAAjvIAAAAQAAjuDCioIAAAAQDDipESAAIAAAAQETAADDCpIAAAAQDCCoAADuIAAAAQAADvjCCoIAAAAQjDCpkTAAIAAAAQkSAAjDipg");
	var mask_graphics_21 = new cjs.Graphics().p("AnVGXQjCioAAjvIAAAAQAAjuDCioIAAAAQDDipESAAIAAAAQETAADDCpIAAAAQDCCoAADuIAAAAQAADvjCCoIAAAAQjDCpkTAAIAAAAQkSAAjDipg");
	var mask_graphics_22 = new cjs.Graphics().p("AnVGXQjCioAAjvIAAAAQAAjuDCioIAAAAQDDipESAAIAAAAQETAADDCpIAAAAQDCCoAADuIAAAAQAADvjCCoIAAAAQjDCpkTAAIAAAAQkSAAjDipg");
	var mask_graphics_23 = new cjs.Graphics().p("AnVGXQjCioAAjvIAAAAQAAjuDCioIAAAAQDDipESAAIAAAAQETAADDCpIAAAAQDCCoAADuIAAAAQAADvjCCoIAAAAQjDCpkTAAIAAAAQkSAAjDipg");
	var mask_graphics_24 = new cjs.Graphics().p("AnVGXQjCioAAjvIAAAAQAAjuDCioIAAAAQDDipESAAIAAAAQETAADDCpIAAAAQDCCoAADuIAAAAQAADvjCCoIAAAAQjDCpkTAAIAAAAQkSAAjDipg");
	var mask_graphics_25 = new cjs.Graphics().p("AnVGXQjCioAAjvIAAAAQAAjuDCioIAAAAQDDipESAAIAAAAQETAADDCpIAAAAQDCCoAADuIAAAAQAADvjCCoIAAAAQjDCpkTAAIAAAAQkSAAjDipg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-17.1999,y:422.4497}).wait(1).to({graphics:mask_graphics_1,x:-1.6002,y:414.9}).wait(1).to({graphics:mask_graphics_2,x:13.9999,y:407.3}).wait(1).to({graphics:mask_graphics_3,x:29.6001,y:399.7499}).wait(1).to({graphics:mask_graphics_4,x:45.2502,y:392.1997}).wait(1).to({graphics:mask_graphics_5,x:60.8499,y:384.6496}).wait(1).to({graphics:mask_graphics_6,x:76.45,y:377.0501}).wait(1).to({graphics:mask_graphics_7,x:92.0502,y:369.4999}).wait(1).to({graphics:mask_graphics_8,x:73.8499,y:378.3496}).wait(1).to({graphics:mask_graphics_9,x:55.6501,y:387.1498}).wait(1).to({graphics:mask_graphics_10,x:37.3999,y:396}).wait(1).to({graphics:mask_graphics_11,x:19.2001,y:404.7997}).wait(1).to({graphics:mask_graphics_12,x:0.9999,y:413.6503}).wait(1).to({graphics:mask_graphics_13,x:-17.1999,y:422.4497}).wait(1).to({graphics:mask_graphics_14,x:-17.1999,y:422.4497}).wait(1).to({graphics:mask_graphics_15,x:-17.1999,y:422.4497}).wait(1).to({graphics:mask_graphics_16,x:-17.1999,y:422.4497}).wait(1).to({graphics:mask_graphics_17,x:-17.1999,y:422.4497}).wait(1).to({graphics:mask_graphics_18,x:-17.1999,y:422.4497}).wait(1).to({graphics:mask_graphics_19,x:-17.1999,y:422.4497}).wait(1).to({graphics:mask_graphics_20,x:-17.1999,y:422.4497}).wait(1).to({graphics:mask_graphics_21,x:-17.1999,y:422.4497}).wait(1).to({graphics:mask_graphics_22,x:-17.1999,y:422.4497}).wait(1).to({graphics:mask_graphics_23,x:-17.1999,y:422.4497}).wait(1).to({graphics:mask_graphics_24,x:-17.1999,y:422.4497}).wait(1).to({graphics:mask_graphics_25,x:-17.1999,y:422.4497}).wait(1));

	// Слой_35
	this.instance_6 = new lib.CachedBmp_57();
	this.instance_6.setTransform(68.4,331.7,0.5,0.5);

	var maskedShapeInstanceList = [this.instance_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(26));

	// Слой_29
	this.instance_7 = new lib.CachedBmp_59();
	this.instance_7.setTransform(-657.45,-80.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(26));

	// Слой_31 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_0 = new cjs.Graphics().p("AqPVOQkPkPAAmAQAAmAEPkPQEQkOF/AAQGAAAEPEOQEPEPABGAQgBGAkPEPQkPEQmAAAQl/AAkQkQg");
	var mask_1_graphics_1 = new cjs.Graphics().p("AncRjQkPkPAAmAQAAmAEPkPQEPkPF/AAQGAAAEPEPQEQEPAAGAQAAGAkQEPQkPEPmAAAQl/AAkPkPg");
	var mask_1_graphics_2 = new cjs.Graphics().p("AgcN3QkPkPAAmAQAAl/EPkPQEOkPGBAAQF/AAEPEPQEQEPAAF/QAAGAkQEPQkPEPl/AAQmBAAkOkPg");
	var mask_1_graphics_3 = new cjs.Graphics().p("AAzN3QkOkPAAmAQAAl/EOkPQEQkPGAAAQGAAAEPEPQEPEPAAF/QAAGAkPEPQkPEPmAAAQmAAAkQkPg");
	var mask_1_graphics_4 = new cjs.Graphics().p("ACEN3QkOkPAAmAQAAl/EOkPQEPkPGAAAQGAAAEPEPQEQEPAAF/QAAGAkQEPQkPEPmAAAQmAAAkPkPg");
	var mask_1_graphics_5 = new cjs.Graphics().p("ADUN3QkOkPAAmAQAAl/EOkPQEQkPF/AAQGBAAEOEPQEQEPAAF/QAAGAkQEPQkOEPmBAAQl/AAkQkPg");
	var mask_1_graphics_6 = new cjs.Graphics().p("AEkN3QkPkPAAmAQAAl/EPkPQEQkPGAAAQGAAAEPEPQEPEPAAF/QAAGAkPEPQkPEPmAAAQmAAAkQkPg");
	var mask_1_graphics_7 = new cjs.Graphics().p("AF1N3QkPkPAAmAQAAl/EPkPQEPkPGAAAQGAAAEPEPQEQEPAAF/QAAGAkQEPQkPEPmAAAQmAAAkPkPg");
	var mask_1_graphics_8 = new cjs.Graphics().p("AHFN3QkPkPAAmAQAAl/EPkPQEQkPGAAAQF/AAEQEPQEPEPAAF/QAAGAkPEPQkQEPl/AAQmAAAkQkPg");
	var mask_1_graphics_9 = new cjs.Graphics().p("AIVN3QkPkPAAmAQAAl/EPkPQEQkPGAAAQGAAAEPEPQEQEPgBF/QABGAkQEPQkPEPmAAAQmAAAkQkPg");
	var mask_1_graphics_10 = new cjs.Graphics().p("AJmN3QkPkPAAmAQAAl/EPkPQEPkPGAAAQGAAAEPEPQEQEPAAF/QAAGAkQEPQkPEPmAAAQmAAAkPkPg");
	var mask_1_graphics_11 = new cjs.Graphics().p("AMEN3QkPkPAAmAQAAl/EPkPQEPkPGAAAQGAAAEPEPQEQEPAAF/QAAGAkQEPQkPEPmAAAQmAAAkPkPg");
	var mask_1_graphics_12 = new cjs.Graphics().p("AOiN3QkPkPAAmAQAAl/EPkPQEPkPGAAAQGAAAEPEPQEQEPAAF/QAAGAkQEPQkPEPmAAAQmAAAkPkPg");
	var mask_1_graphics_13 = new cjs.Graphics().p("ARAN3QkPkPAAmAQAAl/EPkPQEPkPGBAAQF/AAEQEPQEPEPAAF/QAAGAkPEPQkQEPl/AAQmBAAkPkPg");
	var mask_1_graphics_14 = new cjs.Graphics().p("ATeN3QkPkPAAmAQAAl/EPkPQEQkPF/AAQGAAAEQEPQEPEPAAF/QAAGAkPEPQkQEPmAAAQl/AAkQkPg");
	var mask_1_graphics_15 = new cjs.Graphics().p("ATFQ7QkPkPAAl/QAAmBEPkOQEPkPGAAAQGBAAEOEPQEQEOAAGBQAAF/kQEPQkOEQmBAAQmAAAkPkQg");
	var mask_1_graphics_16 = new cjs.Graphics().p("ASsUAQkPkPAAmAQAAmAEPkOQEQkPGAAAQGAAAEPEPQEPEOAAGAQAAGAkPEPQkPEQmAAAQmAAAkQkQg");
	var mask_1_graphics_17 = new cjs.Graphics().p("ASTXFQkPkPAAmAQAAmAEPkQQEQkOGAAAQGAAAEPEOQEPEQAAGAQAAGAkPEPQkPEPmAAAQmAAAkQkPg");
	var mask_1_graphics_18 = new cjs.Graphics().p("ASTXFQkPkPAAmAQAAmAEPkQQEQkOGAAAQGAAAEPEOQEPEQAAGAQAAGAkPEPQkPEPmAAAQmAAAkQkPg");
	var mask_1_graphics_19 = new cjs.Graphics().p("ASTXFQkPkPAAmAQAAmAEPkQQEQkOGAAAQGAAAEPEOQEPEQAAGAQAAGAkPEPQkPEPmAAAQmAAAkQkPg");
	var mask_1_graphics_20 = new cjs.Graphics().p("ASTXFQkPkPAAmAQAAmAEPkQQEQkOGAAAQGAAAEPEOQEPEQAAGAQAAGAkPEPQkPEPmAAAQmAAAkQkPg");
	var mask_1_graphics_21 = new cjs.Graphics().p("ASTXFQkPkPAAmAQAAmAEPkQQEQkOGAAAQGAAAEPEOQEPEQAAGAQAAGAkPEPQkPEPmAAAQmAAAkQkPg");
	var mask_1_graphics_22 = new cjs.Graphics().p("ASTXFQkPkPAAmAQAAmAEPkQQEQkOGAAAQGAAAEPEOQEPEQAAGAQAAGAkPEPQkPEPmAAAQmAAAkQkPg");
	var mask_1_graphics_23 = new cjs.Graphics().p("ASTXFQkPkPAAmAQAAmAEPkQQEQkOGAAAQGAAAEPEOQEPEQAAGAQAAGAkPEPQkPEPmAAAQmAAAkQkPg");
	var mask_1_graphics_24 = new cjs.Graphics().p("ASTXFQkPkPAAmAQAAmAEPkQQEQkOGAAAQGAAAEPEOQEPEQAAGAQAAGAkPEPQkPEPmAAAQmAAAkQkPg");
	var mask_1_graphics_25 = new cjs.Graphics().p("ASTXFQkPkPAAmAQAAmAEPkQQEQkOGAAAQGAAAEPEOQEPEQAAGAQAAGAkPEPQkPEPmAAAQmAAAkQkPg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:mask_1_graphics_0,x:38.65,y:162.975}).wait(1).to({graphics:mask_1_graphics_1,x:110.475,y:139.425}).wait(1).to({graphics:mask_1_graphics_2,x:155.3,y:115.85}).wait(1).to({graphics:mask_1_graphics_3,x:163.325,y:115.85}).wait(1).to({graphics:mask_1_graphics_4,x:171.375,y:115.85}).wait(1).to({graphics:mask_1_graphics_5,x:179.4,y:115.85}).wait(1).to({graphics:mask_1_graphics_6,x:187.425,y:115.85}).wait(1).to({graphics:mask_1_graphics_7,x:195.475,y:115.85}).wait(1).to({graphics:mask_1_graphics_8,x:203.5,y:115.85}).wait(1).to({graphics:mask_1_graphics_9,x:211.55,y:115.85}).wait(1).to({graphics:mask_1_graphics_10,x:219.575,y:115.85}).wait(1).to({graphics:mask_1_graphics_11,x:235.375,y:115.85}).wait(1).to({graphics:mask_1_graphics_12,x:251.175,y:115.85}).wait(1).to({graphics:mask_1_graphics_13,x:267,y:115.85}).wait(1).to({graphics:mask_1_graphics_14,x:282.8,y:115.85}).wait(1).to({graphics:mask_1_graphics_15,x:280.3,y:135.5}).wait(1).to({graphics:mask_1_graphics_16,x:277.825,y:155.175}).wait(1).to({graphics:mask_1_graphics_17,x:275.325,y:174.825}).wait(1).to({graphics:mask_1_graphics_18,x:275.325,y:174.825}).wait(1).to({graphics:mask_1_graphics_19,x:275.325,y:174.825}).wait(1).to({graphics:mask_1_graphics_20,x:275.325,y:174.825}).wait(1).to({graphics:mask_1_graphics_21,x:275.325,y:174.825}).wait(1).to({graphics:mask_1_graphics_22,x:275.325,y:174.825}).wait(1).to({graphics:mask_1_graphics_23,x:275.325,y:174.825}).wait(1).to({graphics:mask_1_graphics_24,x:275.325,y:174.825}).wait(1).to({graphics:mask_1_graphics_25,x:275.325,y:174.825}).wait(1));

	// Слой_26
	this.instance_8 = new lib.CachedBmp_60();
	this.instance_8.setTransform(173.05,69.85,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_61();
	this.instance_9.setTransform(173.05,69.85,0.5,0.5);

	var maskedShapeInstanceList = [this.instance_8,this.instance_9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8}]}).to({state:[{t:this.instance_9}]},25).wait(1));

	// Слой_28
	this.instance_10 = new lib.CachedBmp_63();
	this.instance_10.setTransform(131.3,46.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(26));

	// Слой_27
	this.instance_11 = new lib.CachedBmp_65();
	this.instance_11.setTransform(-101.55,-65.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(26));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-337.5,159.2,1163.6,648.8);
// library properties:
lib.properties = {
	id: '3F946D5821FE1D4C88220CD86F11973C',
	width: 640,
	height: 480,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/mask_atlas_1.png", id:"mask_atlas_1"},
		{src:"images/mask_atlas_2.png", id:"mask_atlas_2"},
		{src:"images/mask_atlas_3.png", id:"mask_atlas_3"},
		{src:"images/mask_atlas_4.png", id:"mask_atlas_4"}
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