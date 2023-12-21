(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"символы_HTML5 Canvas_atlas_1", frames: [[0,0,968,717]]}
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



(lib.Иллюстрация_без_названия11 = function() {
	this.initialize(img.Иллюстрация_без_названия11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1620,2160);


(lib.колесо = function() {
	this.initialize(img.колесо);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1620,2160);


(lib.Иллюстрация_без_названия14pngкопия = function() {
	this.initialize(img.Иллюстрация_без_названия14pngкопия);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1620,2160);


(lib._20230302_003449 = function() {
	this.initialize(ss["символы_HTML5 Canvas_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Иллюстрация_без_названия15 = function() {
	this.initialize(img.Иллюстрация_без_названия15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1620,2160);


(lib.крылоправо = function() {
	this.initialize(img.крылоправо);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1620,2160);// helper functions:

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


(lib.Символ3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия14pngкопия();
	this.instance.setTransform(0,0,0.2884,0.272);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ3, new cjs.Rectangle(0,0,467.2,587.5), null);


(lib.Символ2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.колесо();
	this.instance.setTransform(0,0,0.2482,0.2482);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ2, new cjs.Rectangle(0,0,402,536), null);


(lib.Символ1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.крылоправо();
	this.instance.setTransform(0,0,0.196,0.1362);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ1, new cjs.Rectangle(0,0,317.5,294.1), null);


(lib.wing_right = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Символ1();
	this.instance.setTransform(122.3,143.7,1,1,0,0,0,130.8,143.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:158.7,regY:147,rotation:2.7899,x:149.55,y:147.15},0).wait(1).to({rotation:5.5798,x:148.75,y:147.25},0).wait(1).to({rotation:8.3696,x:147.9,y:147.35},0).wait(1).to({rotation:11.1595,x:147.05,y:147.4},0).wait(1).to({rotation:13.9494,x:146.1,y:147.45},0).wait(1).to({rotation:16.7392,x:145.1},0).wait(1).to({rotation:19.5291,x:144,y:147.5},0).wait(1).to({rotation:22.319,x:142.95,y:147.45},0).wait(1).to({rotation:25.1089,x:141.75,y:147.4},0).wait(1).to({rotation:27.8988,x:140.5,y:147.3},0).wait(1).to({rotation:30.6886,x:139.2,y:147.2},0).wait(1).to({rotation:33.4785,x:137.85,y:147},0).wait(1).to({rotation:32.0024,x:138.35,y:146.45},0).wait(1).to({rotation:30.5263,x:138.8,y:145.85},0).wait(1).to({rotation:29.0502,x:139.2,y:145.3},0).wait(1).to({rotation:27.5741,x:139.6,y:144.7},0).wait(1).to({rotation:26.098,x:140.05,y:144.1},0).wait(1).to({rotation:24.6219,x:140.4,y:143.5},0).wait(1).to({rotation:23.1458,x:140.75,y:142.9},0).wait(1).to({rotation:21.6697,x:141.15,y:142.25},0).wait(1).to({rotation:20.1936,x:141.45,y:141.6},0).wait(1).to({rotation:18.7175,x:141.8,y:140.95},0).wait(1).to({rotation:17.2414,x:142.1,y:140.3},0).wait(1).to({rotation:15.7653,x:142.4,y:139.6},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.5,-63.1,427,420.5);


(lib.FORCAR = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Символ2();
	this.instance.setTransform(79.4,489.4,1,1,0,0,0,79.4,489.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:-134.9994,y:489.45},4).to({scaleX:0.9999,scaleY:0.9999,rotation:-237.0025,x:91.05,y:489.55},2).to({regY:489.5,scaleX:1,scaleY:1,rotation:-374.9988,x:79.5,y:489.5},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-494.7,-96.7,1131.4,1123.3);


(lib.car = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия15();
	this.instance.setTransform(0,32,0.2435,0.2373);

	this.instance_1 = new lib.FORCAR();
	this.instance_1.setTransform(425.3,268,1,1,0,0,0,201,268);

	this.instance_2 = new lib.FORCAR();
	this.instance_2.setTransform(201,268,1,1,0,0,0,201,268);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.car, new cjs.Rectangle(0,0,626.3,544.6), null);


(lib.дракон = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия11();
	this.instance.setTransform(55.65,0,0.1447,0.1447);

	this.instance_1 = new lib.wing_right();
	this.instance_1.setTransform(158.8,166.1,1,1,0,0,180,150.2,147.1);

	this.instance_2 = new lib.wing_right();
	this.instance_2.setTransform(187.45,166.1,1,1,0,0,0,158.8,147.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.дракон, new cjs.Rectangle(0,0,337.7,313.1), null);


// stage content:
(lib.символы_HTML5Canvas = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(155));

	// Слой_13
	this.instance = new lib.Символ3();
	this.instance.setTransform(200.85,235.9,1,1,0,0,0,262.8,322.9);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(130).to({_off:false},0).wait(1).to({regX:233.6,regY:293.7,x:153.05,y:205.5},0).wait(1).to({x:134.45,y:204.3},0).wait(1).to({x:115.85,y:203.1},0).wait(1).to({x:97.2,y:201.85},0).wait(1).to({x:78.6,y:200.65},0).wait(1).to({x:60,y:199.45},0).wait(1).to({x:41.35,y:198.2},0).wait(1).to({x:22.75,y:197},0).wait(1).to({x:4.15,y:195.8},0).wait(1).to({x:-14.45,y:194.6},0).wait(1).to({x:-33.1,y:193.35},0).wait(1).to({x:-51.7,y:192.15},0).wait(1).to({x:-70.3,y:190.95},0).wait(1).to({x:-88.95,y:189.7},0).wait(1).to({x:-107.55,y:188.5},0).wait(1).to({x:-126.15,y:187.3},0).wait(1).to({x:-144.75,y:186.1},0).wait(1).to({x:-163.4,y:184.85},0).wait(1).to({x:-182,y:183.65},0).wait(1).to({x:-200.6,y:182.45},0).wait(1).to({x:-219.25,y:181.2},0).wait(1).to({x:-237.85,y:180},0).wait(1).to({x:-256.45,y:178.8},0).wait(1).to({x:-275.1,y:177.55},0).wait(1));

	// Слой_6
	this.instance_1 = new lib.car();
	this.instance_1.setTransform(950.35,143.2,1,1,0,0,0,313.2,272.2);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(68).to({_off:false},0).wait(1).to({regX:137.1,regY:479.9,x:761.75,y:350.9},0).wait(1).to({x:749.25},0).wait(1).to({x:736.75},0).wait(1).to({x:724.25},0).wait(1).to({x:711.75},0).wait(1).to({x:699.25},0).wait(1).to({x:686.75},0).wait(1).to({x:674.3},0).wait(1).to({x:661.8},0).wait(1).to({x:649.3},0).wait(1).to({x:636.8},0).wait(1).to({x:624.3},0).wait(1).to({x:611.8},0).wait(1).to({x:599.3},0).wait(1).to({x:586.85},0).wait(1).to({x:574.35},0).wait(1).to({x:561.85},0).wait(1).to({x:549.35},0).wait(1).to({x:536.85},0).wait(1).to({x:524.35},0).wait(1).to({x:511.85},0).wait(1).to({x:499.4},0).wait(1).to({x:486.9},0).wait(1).to({x:474.4},0).wait(1).to({x:461.9},0).wait(1).to({x:449.4},0).wait(1).to({x:436.9},0).wait(1).to({x:424.4},0).wait(1).to({x:411.9},0).wait(1).to({x:399.45},0).wait(1).to({x:386.95},0).wait(1).to({x:374.45},0).wait(1).to({x:361.95},0).wait(1).to({x:349.45},0).wait(1).to({x:336.95},0).wait(1).to({x:324.45},0).wait(1).to({x:312},0).wait(1).to({x:299.5},0).wait(1).to({x:287},0).wait(1).to({x:274.5},0).wait(1).to({x:262},0).wait(1).to({x:249.5},0).wait(1).to({x:237},0).wait(1).to({x:224.55},0).wait(1).to({x:212.05},0).wait(1).to({x:199.55},0).wait(1).to({x:187.05},0).wait(1).to({x:174.55},0).wait(1).to({x:162.05},0).wait(1).to({x:149.55},0).wait(1).to({x:137.1},0).wait(11).to({x:118.15},0).wait(1).to({x:99.2},0).wait(1).to({x:80.25},0).wait(1).to({x:61.25},0).wait(1).to({x:42.3},0).wait(1).to({x:23.35},0).wait(1).to({x:4.4},0).wait(1).to({x:-14.6},0).wait(1).to({x:-33.55},0).wait(1).to({x:-52.5},0).wait(1).to({x:-71.5},0).wait(1).to({x:-90.45},0).wait(1).to({x:-109.4},0).wait(1).to({x:-128.35},0).wait(1).to({x:-147.35},0).wait(1).to({x:-166.3},0).wait(1).to({x:-185.25},0).wait(1).to({x:-204.25},0).wait(1).to({x:-223.2},0).wait(1).to({x:-242.15},0).wait(1).to({x:-261.1},0).wait(1).to({x:-280.1},0).wait(1).to({x:-299.05},0).wait(1).to({x:-318},0).wait(1).to({x:-337},0).wait(1));

	// Слой_10
	this.instance_2 = new lib.дракон();
	this.instance_2.setTransform(752.75,91.55,0.2964,0.2964,-59.9975,0,0,168.8,156.8);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(9).to({_off:false},0).to({regX:168.7,regY:156.6,rotation:0,guide:{path:[752.8,91.6,715.4,57.4,678,23.2,672.2,17.9,668.7,15.2,663.2,11,658.2,8.9,652.3,6.5,641.8,5.2,632.8,4,623.8,3.2,614.9,2.5,609.4,3,601.5,3.6,595.8,6.7,589.8,9.9,583.2,18.1,572.8,30.9,566.6,46.5,580.8,54.4,594.8,63.4,605.2,70.2,610,74.6,618.1,82.2,626.5,96.3,633.9,108.6,638.3,119.2,643.5,131.9,645,143.8,645.8,149.7,645.9,161.9,646.1,173.9,646.9,180,647.2,182,647.8,186.2,648.2,189.7,648,192.4,647.7,196.3,645.9,200.7,644.6,203.8,641.9,208.3,637.3,216.2,633,221.5,627.7,228.3,621.9,232.7,615.3,237.8,607.7,239.9,599.6,242.2,592.1,240.6,585.9,239.3,578.4,234.6,570.5,229.6,556.3,217.2,542.2,204.7,534.2,199.7,531.4,197.9,525.4,194.7,519.4,191.4,516.5,189.6,511.8,186.6,502.8,179.5,481.7,163,460.7,146.4,453.9,141.1,450.3,138.6,444.4,134.4,439.3,131.7,420.1,121.9,392,123.1,387,123.3,384.6,124.6,382.3,125.8,379.4,129.6,369.7,141.8,364.7,148.6,356.9,159.4,351.6,168.7,347.3,176.7,345,180.5,341.1,187.2,337.1,191.2,331,197.2,319.5,202.3,310.7,206,303.6,207.3,299.3,208,293.9,208.2,290.4,208.3,284.2,208.1,248.9,207.4,213.6,206.6]}},56).to({_off:true},65).wait(25));

	// Слой_8
	this.instance_3 = new lib.дракон();
	this.instance_3.setTransform(625.7,356.75,0.4209,0.4209,-74.9995,0,0,168.8,156.6);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(9).to({_off:false},0).to({regY:156.7,rotation:0,guide:{path:[625.7,356.8,625.9,357.8,624.8,358.4,623.9,358.9,622.6,358.9,591.7,359.4,560.7,360,553.1,360.2,549.2,360.1,542.8,359.9,537.7,359,522,356.4,505.5,345,495.1,337.8,477.8,321.8,467.5,312.3,462.7,307,454.7,298.3,450.2,290.1,445.2,280.9,442.2,268.1,440.4,260.2,438.2,244.7,430.9,192.7,423.5,140.8,397.5,139.1,371.5,133.6,368.2,139.9,364.6,149.4,362.6,154.9,358.7,165.8,351.3,185.3,341.8,194.7,329.3,207.1,308.1,211.3,299.8,212.9,289.2,213.4,282.9,213.7,270.2,213.7,256.6,213.7,243,213.7,217,213.7,204.1,213.6,182.4,213.4,165.2,212.7]}},57).to({_off:true},64).wait(25));

	// Слой_2
	this.instance_4 = new lib.дракон();
	this.instance_4.setTransform(522.4,302.65,1,1,0,0,0,178,166.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({guide:{path:[522.3,302.7,519.6,300.8,516.2,298,497,282.1,487.8,273.1,472.9,258.3,464.1,243.7,463,241.9,462,241,460.7,239.7,459.3,239.9,457.8,240,456,242.3,451.8,247.5,445.2,257.3,437.8,268.3,434.6,272.5,421.1,290.2,406.8,295.5,404.5,281.7,394,268.2,387.2,259.4,372.5,246.1,365.6,239.8,361.5,236.7,355.2,231.7,349.4,229.1,346.4,239,340.2,247.4,334,255.8,325.7,261.2,316.3,266.4,311.8,269.2,303.8,274.1,300.4,279.8,298.4,283.2,297.7,284,295.8,286.2,293.8,286,291.4,285.9,288.9,282,281.4,270.6,280.2,268.9,275,261.7,269.7,257.7,268.1,256.4,264.1,253.8,260.5,251.4,258.5,249.8,256.5,248.2,253.7,245.2,249.8,241.1,249,240.3,243.1,234.6,235.8,231,228.5,227.3,220.7,226.2,218.1,230.2,213.7,233.9,210.6,236.5,205.1,239.8,193.5,246.9,169.4,259.5,166.3,261.2,164.5,261.8,161.7,262.8,159.4,262.7,156,262.5,152.8,260.2,150.1,258.2,147.9,254.8,146.4,252.5,144.4,248.3,142,243.3,141.1,241.7,138.5,236.9,131,228.2,123.9,219.8,121.2,214.6,120.2,212.7,120.2,211.3]}},68).to({_off:true},62).wait(25));

	// Слой_1
	this.instance_5 = new lib._20230302_003449();
	this.instance_5.setTransform(-3,-20,0.6758,0.6971);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(155));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-188.7,111,1452.2,389.5);
// library properties:
lib.properties = {
	id: 'D2AEC6A1F7046745932A48CE2D9CEE52',
	width: 640,
	height: 480,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Иллюстрация_без_названия11.png?1677743127878", id:"Иллюстрация_без_названия11"},
		{src:"images/колесо_.png?1677743127878", id:"колесо"},
		{src:"images/Иллюстрация_без_названия14pngкопия.png?1677743127878", id:"Иллюстрация_без_названия14pngкопия"},
		{src:"images/Иллюстрация_без_названия15.png?1677743127878", id:"Иллюстрация_без_названия15"},
		{src:"images/крылоправо_.png?1677743127878", id:"крылоправо"},
		{src:"images/символы_HTML5 Canvas_atlas_1.png?1677743127757", id:"символы_HTML5 Canvas_atlas_1"}
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
an.compositions['D2AEC6A1F7046745932A48CE2D9CEE52'] = {
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