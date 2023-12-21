(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


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
p.nominalBounds = new cjs.Rectangle(0,0,2160,1620);


(lib.Иллюстрация_без_названия17pngкопия = function() {
	this.initialize(img.Иллюстрация_без_названия17pngкопия);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2160,1620);


(lib.Иллюстрация_без_названия24 = function() {
	this.initialize(img.Иллюстрация_без_названия24);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2160,1620);


(lib.волны = function() {
	this.initialize(img.волны);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3840,2160);


(lib.Иллюстрация_без_названия33 = function() {
	this.initialize(img.Иллюстрация_без_названия33);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2160,1620);


(lib.Иллюстрация_без_названия33pngкопия2 = function() {
	this.initialize(img.Иллюстрация_без_названия33pngкопия2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2160,1620);


(lib.Иллюстрация_без_названия13 = function() {
	this.initialize(img.Иллюстрация_без_названия13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2160,1620);// helper functions:

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


(lib.Символ4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия13();
	this.instance.setTransform(557.7,-44.95,0.3523,0.3523,74.9978);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ4, new cjs.Rectangle(6.4,-44.9,748.3000000000001,882.8), null);


(lib.Символ3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.волны();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ3, new cjs.Rectangle(0,0,3840,2160), null);


(lib.Символ2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия33();
	this.instance.setTransform(0,0,0.5866,0.5866);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ2, new cjs.Rectangle(0,0,1267.1,950.3), null);


(lib.Символ1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия11();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ1, new cjs.Rectangle(0,0,2160,1620), null);


(lib.Анимация12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия17pngкопия();
	this.instance.setTransform(-1080,-810);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1080,-810,2160,1620);


(lib.Анимация10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия33pngкопия2();
	this.instance.setTransform(-665.85,-499.4,0.6166,0.6166);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-665.8,-499.4,1331.6999999999998,998.9);


(lib.Анимация9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия33pngкопия2();
	this.instance.setTransform(-569.05,-606.85,0.6165,0.6165,9.9657);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-741.9,-606.8,1484.4,1214.1);


(lib.Анимация2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.Иллюстрация_без_названия24();
	this.instance.setTransform(520.5,-810);

	this.instance_1 = new lib.Иллюстрация_без_названия24();
	this.instance_1.setTransform(-1046.5,-810);

	this.instance_2 = new lib.Иллюстрация_без_названия24();
	this.instance_2.setTransform(-2680.5,-810);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2680.5,-810,5361,1620);


// stage content:
(lib.анимациядвижения = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(185));

	// Слой_5
	this.instance = new lib.Анимация9("synched",0);
	this.instance.setTransform(657.5,1374);
	this.instance._off = true;

	this.instance_1 = new lib.Анимация10("synched",0);
	this.instance_1.setTransform(3201.45,1935.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(67).to({_off:false},0).to({rotation:29.9992,guide:{path:[657.5,1374,694.8,1401.3,743.4,1452.2,795,1506.2,863.9,1576.6,922.6,1636.6,956.9,1670.2]}},5).to({rotation:0,guide:{path:[956.9,1670.2,963.2,1676.3,968.6,1681.6,1027.8,1738.8,1078.9,1780.4,1205.2,1883.2,1336.9,1929.8,1397.3,1951.2,1455.1,1959.1]}},7).to({rotation:-52.4399,guide:{path:[1455.1,1959.2,1542.8,1971.3,1624.4,1952.5,1700.4,1935,1743.1,1894.3,1758.3,1879.9,1772.4,1859.3,1783.1,1843.8,1796.3,1820.1,1810.3,1794.8,1819.5,1774.5,1831,1749.5,1837.7,1726.7,1838.6,1724,1839.3,1721.1]}},6).to({rotation:0,guide:{path:[1839.4,1721.1,1864.2,1631.8,1837.3,1518.7,1826.1,1471.8,1804.9,1415.4,1790.1,1376.1,1763.5,1315.1,1779.5,1314,1797.5,1329.6,1800.1,1331.9,1812.4,1343.7,1821.6,1352.5,1827.8,1356.9,1831.8,1359.7,1836.4,1362.1]}},6).to({rotation:14.9992,guide:{path:[1836.3,1362.2,1856.3,1372.4,1886.7,1372.9,1897.7,1373.1,1919.1,1371.9,1941.2,1370.7,1951.4,1370.8,1980.6,1371.1,2014.4,1379.5,2039.9,1385.9,2075.4,1399,2079.9,1400.7,2084.5,1402.5]}},3).to({rotation:29.9992,guide:{path:[2084.5,1402.4,2191.7,1443.2,2290.7,1502.5,2300.7,1508.5,2310.5,1514.6]}},3).to({rotation:26.9991,guide:{path:[2310.5,1514.6,2346.3,1536.9,2380.5,1561.4]}},1).to({rotation:0,guide:{path:[2380.4,1561.5,2434,1599.9,2483.5,1643.6,2492.8,1651.9,2511.4,1668.6,2528,1683.4,2539.7,1693,2572.7,1720,2601.5,1734.2,2621,1743.9,2660.4,1756.8,2701.2,1770.2,2719.5,1778.9,2742.8,1789.8,2773.7,1811,2779,1814.7,2799.7,1829.2,2815.6,1840.4,2825.8,1847.1,2908.1,1901.1,3005.9,1924,3019.8,1927.3,3033.8,1929.9]}},9).to({_off:true,guide:{path:[3033.8,1929.8,3117.7,1945.2,3201.5,1935.1,3201.5,1935.1,3201.5,1935.1]}},2).wait(76));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(107).to({_off:false},2).to({startPosition:0},2).to({x:3197.15,y:1908.8},6).to({x:3174.1,y:1768.5},32).to({x:3025.95,y:1768.45},6).wait(7).to({y:1608.8},0).to({x:2831.15,y:713.2},7).to({x:2504.05,y:-508.6},10).to({_off:true},5).wait(1));

	// Слой_4
	this.instance_2 = new lib.Символ2();
	this.instance_2.setTransform(-63.4,-343.8,1,1,0,0,0,633.6,475.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:633.5,x:-3.65,y:-262.8},0).wait(1).to({x:56.2,y:-181.8},0).wait(1).to({x:116.05,y:-100.8},0).wait(1).to({x:175.9,y:-19.8},0).wait(1).to({x:235.75,y:61.2},0).wait(1).to({x:295.6,y:142.2},0).wait(1).to({x:355.45,y:223.2},0).wait(1).to({x:415.3,y:304.15},0).wait(1).to({x:475.15,y:385.15},0).wait(1).to({x:535,y:466.15},0).wait(1).to({x:594.85,y:547.1},0).wait(1).to({x:654.7,y:628.1},0).wait(1).to({x:714.55,y:709.1},0).wait(1).to({x:774.4,y:790.1},0).wait(1).to({x:834.25,y:871.1},0).wait(1).to({x:894.1,y:952.05},0).wait(1).to({x:953.95,y:1033.05},0).wait(1).to({x:1013.8,y:1114.05},0).wait(1).to({x:1073.65,y:1195.05},0).wait(1).to({x:1133.5,y:1276.05},0).wait(1).to({x:1193.35,y:1357.05},0).wait(1).to({x:1253.2,y:1438.05},0).wait(1).to({x:1313.05,y:1519.05},0).wait(1).to({x:1348.5,y:1546.5},0).wait(1).to({rotation:6.4285,x:1383.95,y:1573.9},0).wait(1).to({rotation:12.857,x:1419.4,y:1601.4},0).wait(1).to({rotation:19.2855,x:1454.9,y:1628.85},0).wait(1).to({rotation:25.7141,x:1490.35,y:1656.3},0).wait(1).to({rotation:32.1426,x:1525.85,y:1683.75},0).wait(1).to({rotation:38.5711,x:1561.35,y:1711.2},0).wait(1).to({rotation:44.9996,x:1596.8,y:1738.6},0).wait(1).to({rotation:29.9997,x:1700.45,y:1738.7},0).wait(1).to({rotation:14.9999,x:1804.2},0).wait(1).to({rotation:0,x:1908,y:1738.75},0).wait(1).to({x:1828.3,y:1711.3},0).wait(1).to({x:1748.65,y:1683.85},0).wait(1).to({x:1669,y:1656.4},0).wait(1).to({x:1589.35,y:1628.95},0).wait(1).to({x:1509.7,y:1601.5},0).wait(1).to({x:1430.05,y:1574.05},0).wait(1).to({x:1350.4,y:1546.65},0).wait(1).to({x:1270.75,y:1519.2},0).wait(1).to({x:1191.1,y:1491.75},0).wait(1).to({x:1111.45,y:1464.3},0).wait(1).to({x:1031.8,y:1436.85},0).wait(1).to({x:952.15,y:1409.4},0).wait(1).to({x:872.45,y:1382},0).wait(1).to({x:792.8,y:1354.55},0).wait(1).to({x:713.15,y:1327.1},0).wait(1).to({x:633.5,y:1299.65},0).wait(16).to({_off:true},1).wait(118));

	// MergedLayer_1
	this.instance_3 = new lib.Анимация2("synched",0);
	this.instance_3.setTransform(2256.5,2108.15);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(50).to({_off:false},0).to({y:1383.7},14).to({startPosition:0},1).to({x:2255.3,y:1382.95},1).to({x:2200.95,y:1350},45).to({x:2256.5,y:2235.3},37).to({_off:true},1).wait(36));

	// Слой_3
	this.instance_4 = new lib.Символ1();
	this.instance_4.setTransform(-307.25,243.8,1,1,0,0,0,1080,810);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1).to({x:-246.9,y:324.95},0).wait(1).to({x:-186.6,y:406.05},0).wait(1).to({x:-126.3,y:487.15},0).wait(1).to({x:-65.95,y:568.3},0).wait(1).to({x:-5.65,y:649.4},0).wait(1).to({x:54.65,y:730.5},0).wait(1).to({x:115,y:811.6},0).wait(1).to({x:175.3,y:892.7},0).wait(1).to({x:235.6,y:973.8},0).wait(1).to({x:295.95,y:1054.95},0).wait(1).to({x:356.25,y:1136.05},0).wait(1).to({x:416.55,y:1217.15},0).wait(1).to({x:476.85,y:1298.25},0).wait(1).to({x:537.2,y:1379.4},0).wait(1).to({x:597.5,y:1460.5},0).wait(1).to({x:657.8,y:1541.6},0).wait(1).to({x:718.15,y:1622.75},0).wait(1).to({x:778.45,y:1703.85},0).wait(1).to({x:838.75,y:1784.95},0).wait(1).to({x:899.1,y:1866.1},0).wait(1).to({x:959.4,y:1947.2},0).wait(1).to({x:1019.7,y:2028.3},0).wait(1).to({x:1080,y:2109.45},0).wait(1).to({regX:1079.8,regY:810.2,x:1080.05},0).wait(1).to({regX:1080,regY:810,rotation:5.4235,x:888.05,y:2109.2},0).wait(1).to({rotation:10.847,x:695.9,y:2109.3},0).wait(1).to({rotation:16.2705,x:503.65},0).wait(1).to({rotation:21.6939,x:311.45,y:2109.35},0).wait(1).to({rotation:27.1174,x:119.25},0).wait(1).to({rotation:32.5409,x:-72.95},0).wait(1).to({rotation:37.9644,x:-265.2,y:2109.4},0).wait(1).to({x:-457.4},0).wait(1).to({x:-649.65},0).to({_off:true},1).wait(151));

	// Слой_8
	this.instance_5 = new lib.Символ4();
	this.instance_5.setTransform(-181.7,1738.7,1,1,0,0,0,372.4,809.1);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(61).to({_off:false},0).wait(1).to({regX:380.5,regY:396.5,scaleX:0.6627,scaleY:0.552,rotation:-125.257,x:-358.1,y:1854.65},0).wait(1).to({scaleX:0.6673,scaleY:0.5593,rotation:-119.314,x:-358.7,y:1802.35},0).wait(1).to({scaleX:0.6719,scaleY:0.5666,rotation:-113.3711,x:-355.8,y:1726.9},0).wait(1).to({scaleX:0.6765,scaleY:0.5739,rotation:-107.4281,x:-349.25,y:1629.25},0).wait(1).to({scaleX:0.681,scaleY:0.5812,rotation:-101.4852,x:-338.75,y:1511.3},0).wait(1).to({scaleX:0.6856,scaleY:0.5884,rotation:-95.5422,x:-324.15,y:1375.25},0).wait(1).to({scaleX:0.6901,scaleY:0.5957,rotation:-89.5993,x:-305.35,y:1223.8},0).wait(1).to({scaleX:0.6947,scaleY:0.6029,rotation:-83.6563,x:-282.2,y:1060.35},0).wait(1).to({scaleX:0.6992,scaleY:0.6101,rotation:-77.7133,x:-254.55,y:888.8},0).wait(1).to({scaleX:0.7037,scaleY:0.6172,rotation:-71.7704,x:-222.45,y:713.8},0).wait(1).to({scaleX:0.7082,scaleY:0.6244,rotation:-65.8274,x:-185.8,y:540.85},0).wait(1).to({scaleX:0.7126,scaleY:0.6315,rotation:-59.8845,x:-144.65,y:375.85},0).wait(1).to({scaleX:0.7171,scaleY:0.6386,rotation:-53.9415,x:-99.05,y:225.9},0).wait(1).to({scaleX:0.7215,scaleY:0.6457,rotation:-47.9985,x:-49,y:98.6},0).wait(1).to({scaleX:0.726,scaleY:0.6528,rotation:-42.0556,x:5.3,y:2.5},0).wait(1).to({scaleX:0.7304,scaleY:0.6598,rotation:-36.1126,x:63.8,y:-53.4},0).wait(1).to({scaleX:0.7347,scaleY:0.6668,rotation:-30.1697,x:126.2,y:-59.65},0).wait(1).to({scaleX:0.7391,scaleY:0.6737,rotation:-24.2267,x:192.4,y:-6.3},0).wait(1).to({scaleX:0.7434,scaleY:0.6806,rotation:-18.2838,x:262.1,y:116.2},0).wait(1).to({scaleX:0.7477,scaleY:0.6875,rotation:-12.3408,x:335.05,y:317.15},0).wait(1).to({scaleX:0.7519,scaleY:0.6942,rotation:-3.6601,x:424.5,y:604.1},0).wait(1).to({scaleX:0.7561,scaleY:0.7009,rotation:5.0207,x:517.05,y:988.65},0).wait(1).to({scaleX:0.7602,scaleY:0.7075,rotation:13.7014,x:611.35,y:1476.45},0).wait(1).to({scaleX:0.7642,scaleY:0.7139,rotation:22.3821,x:706.5,y:2071.45},0).wait(1).to({scaleX:0.768,scaleY:0.7201,rotation:200.489,x:532.95,y:1835.3},0).wait(1).to({scaleX:0.7715,scaleY:0.7258,rotation:198.596,x:597.25,y:1318.05},0).wait(1).to({scaleX:0.7738,scaleY:0.7297,rotation:196.703,x:663.8,y:995.95},0).wait(1).to({scaleX:0.887,scaleY:0.8527,rotation:229.7031,x:542.65,y:743.35},0).wait(1).to({scaleX:0.8577,scaleY:0.8335,rotation:262.7032,x:534.65,y:463.95},0).wait(1).to({scaleX:0.8284,scaleY:0.8143,rotation:295.7033,x:639.5,y:247.2},0).wait(1).to({scaleX:0.7991,scaleY:0.7951,rotation:328.7034,x:838.8,y:143.45},0).wait(1).to({scaleX:0.7697,scaleY:0.7759,rotation:361.7035,x:1085.35,y:201.45},0).wait(1).to({scaleX:0.7404,scaleY:0.7567,rotation:367.6804,x:1184.85,y:400.75},0).wait(1).to({scaleX:0.7111,scaleY:0.7375,rotation:378.6577,x:1309.05,y:749.7},0).wait(1).to({scaleX:0.6818,scaleY:0.7183,rotation:389.6351,x:1428.25,y:1304.3},0).wait(1).to({scaleX:0.6525,scaleY:0.6991,rotation:400.6124,x:1540.75,y:2125.95},0).wait(1).to({scaleX:0.6232,scaleY:0.6799,rotation:576.159,x:1253,y:2134.35},0).wait(1).to({scaleX:0.5939,scaleY:0.6607,rotation:547.152,x:1458.95,y:1898.3},0).wait(1).to({scaleX:0.5498,scaleY:0.5117,rotation:622.1514,x:1364.35,y:1494},0).wait(1).to({scaleX:0.6415,scaleY:0.5784,rotation:678.534,x:1497.75,y:1236.1},0).wait(1).to({scaleX:0.8178,scaleY:0.7067,rotation:734.9165,x:1812.45,y:1189.55},0).wait(1).to({scaleX:0.9053,scaleY:0.7504,rotation:750.1189,x:1973.1,y:1364.3},0).wait(1).to({scaleX:0.99,scaleY:0.7928,rotation:765.3213,x:2131.3,y:1686.45},0).wait(1).to({scaleX:1.0713,scaleY:0.8337,rotation:780.5236,x:2279.7,y:2179.75},0).wait(1).to({scaleX:1.1465,scaleY:0.8718,rotation:795.726,x:2410.9,y:2055.55},0).wait(1).to({scaleX:1.2,scaleY:0.9,rotation:810.9284,x:2516.4,y:2031.4},0).wait(1).to({scaleX:0.4835,scaleY:0.5025,rotation:952.13,x:2065.5,y:2100.8},0).wait(1).to({x:2152.85,y:2139.9},0).wait(1).to({x:2241.25,y:2259.5},0).wait(1).to({x:2330.65,y:2465.7},0).wait(1).to({x:2421},0).to({_off:true},1).wait(72));

	// Слой_7
	this.instance_6 = new lib.Анимация12("synched",0);
	this.instance_6.setTransform(4361,-342);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(123).to({_off:false},0).to({x:4101.85,y:251.1},7).to({x:3398.35,y:1861.05},19).to({startPosition:0},12).to({x:2787.35,y:-434.55},18).to({_off:true},1).wait(5));

	// Слой_1
	this.instance_7 = new lib.волны();

	this.instance_8 = new lib.Символ3();
	this.instance_8.setTransform(1920,1080,1,1,0,0,0,1920,1080);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7}]}).to({state:[{t:this.instance_8}]},33).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(33).to({_off:false},0).wait(1).to({scaleX:1.0855,scaleY:1.1246},0).wait(1).to({scaleX:1.1709,scaleY:1.2492},0).wait(1).to({scaleX:1.2564,scaleY:1.3738,y:1080.05},0).wait(1).to({scaleX:1.3419,scaleY:1.4984,y:1080},0).wait(1).to({scaleX:1.4273,scaleY:1.6231,y:1080.05},0).wait(1).to({scaleX:1.5128,scaleY:1.7477,y:1080},0).wait(1).to({scaleX:1.5983,scaleY:1.8723,x:1919.95},0).wait(1).to({scaleX:1.6838,scaleY:1.9969,x:1920},0).wait(1).to({scaleX:1.7692,scaleY:2.1215},0).wait(1).to({scaleX:1.8547,scaleY:2.2461,y:1080.05},0).wait(1).to({scaleX:1.9402,scaleY:2.3707,y:1080},0).wait(1).to({scaleX:2.0256,scaleY:2.4953},0).wait(1).to({scaleX:2.1111,scaleY:2.6199,y:1080.05},0).wait(1).to({scaleX:2.1966,scaleY:2.7445,x:1919.95,y:1080},0).wait(1).to({scaleX:2.282,scaleY:2.8692,x:1920,y:1080.05},0).wait(1).to({scaleX:2.3675,scaleY:2.9938,y:1080},0).wait(1).to({scaleX:2.453,scaleY:3.1184},0).wait(135));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-869.6,-1207.8,7499.3,5655.7);
// library properties:
lib.properties = {
	id: '4560913AEE81BC46B002FCE291DF372E',
	width: 3840,
	height: 2160,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Иллюстрация_без_названия11.png", id:"Иллюстрация_без_названия11"},
		{src:"images/Иллюстрация_без_названия17pngкопия.png", id:"Иллюстрация_без_названия17pngкопия"},
		{src:"images/Иллюстрация_без_названия24.png", id:"Иллюстрация_без_названия24"},
		{src:"images/волны_.jpg", id:"волны"},
		{src:"images/Иллюстрация_без_названия33.png", id:"Иллюстрация_без_названия33"},
		{src:"images/Иллюстрация_без_названия33pngкопия2.png", id:"Иллюстрация_без_названия33pngкопия2"},
		{src:"images/Иллюстрация_без_названия13.png", id:"Иллюстрация_без_названия13"}
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