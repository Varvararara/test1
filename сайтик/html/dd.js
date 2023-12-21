(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"dd_atlas_1", frames: [[0,0,1947,1947]]}
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



(lib.CachedBmp_500 = function() {
	this.initialize(img.CachedBmp_500);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1504,2154);


(lib.CachedBmp_503 = function() {
	this.initialize(img.CachedBmp_503);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1509,2159);


(lib.CachedBmp_502 = function() {
	this.initialize(img.CachedBmp_502);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1507,2158);


(lib.CachedBmp_501 = function() {
	this.initialize(img.CachedBmp_501);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1506,2156);


(lib.CachedBmp_506 = function() {
	this.initialize(img.CachedBmp_506);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1507,2157);


(lib.CachedBmp_508 = function() {
	this.initialize(img.CachedBmp_508);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,10593,379);


(lib.CachedBmp_507 = function() {
	this.initialize(img.CachedBmp_507);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,10593,379);


(lib.CachedBmp_496 = function() {
	this.initialize(img.CachedBmp_496);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1498,2148);


(lib.CachedBmp_495 = function() {
	this.initialize(img.CachedBmp_495);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1497,2146);


(lib.CachedBmp_497 = function() {
	this.initialize(img.CachedBmp_497);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1500,2150);


(lib.CachedBmp_498 = function() {
	this.initialize(img.CachedBmp_498);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1501,2151);


(lib.CachedBmp_499 = function() {
	this.initialize(img.CachedBmp_499);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1503,2153);


(lib.CachedBmp_494 = function() {
	this.initialize(img.CachedBmp_494);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1496,2145);


(lib.CachedBmp_493 = function() {
	this.initialize(img.CachedBmp_493);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1494,2143);


(lib.CachedBmp_489 = function() {
	this.initialize(img.CachedBmp_489);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1488,2137);


(lib.CachedBmp_492 = function() {
	this.initialize(img.CachedBmp_492);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1493,2142);


(lib.CachedBmp_488 = function() {
	this.initialize(img.CachedBmp_488);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1487,2135);


(lib.CachedBmp_491 = function() {
	this.initialize(img.CachedBmp_491);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1491,2140);


(lib.CachedBmp_490 = function() {
	this.initialize(img.CachedBmp_490);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1490,2138);


(lib.CachedBmp_486 = function() {
	this.initialize(img.CachedBmp_486);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1484,2132);


(lib.CachedBmp_487 = function() {
	this.initialize(img.CachedBmp_487);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1485,2134);


(lib.CachedBmp_485 = function() {
	this.initialize(img.CachedBmp_485);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1482,2130);


(lib.CachedBmp_483 = function() {
	this.initialize(img.CachedBmp_483);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1479,2127);


(lib.CachedBmp_484 = function() {
	this.initialize(img.CachedBmp_484);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1481,2129);


(lib.CachedBmp_482 = function() {
	this.initialize(img.CachedBmp_482);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1478,2125);


(lib.CachedBmp_481 = function() {
	this.initialize(img.CachedBmp_481);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1476,2124);


(lib.CachedBmp_480 = function() {
	this.initialize(img.CachedBmp_480);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1475,2122);


(lib.CachedBmp_479 = function() {
	this.initialize(img.CachedBmp_479);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1473,2121);


(lib.CachedBmp_478 = function() {
	this.initialize(img.CachedBmp_478);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1470,2117);


(lib.CachedBmp_462 = function() {
	this.initialize(img.CachedBmp_462);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1477,2127);


(lib.CachedBmp_461 = function() {
	this.initialize(img.CachedBmp_461);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1481,2135);


(lib.CachedBmp_459 = function() {
	this.initialize(img.CachedBmp_459);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1490,2150);


(lib.CachedBmp_460 = function() {
	this.initialize(img.CachedBmp_460);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1486,2142);


(lib.CachedBmp_458 = function() {
	this.initialize(img.CachedBmp_458);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1495,2158);


(lib.CachedBmp_457 = function() {
	this.initialize(img.CachedBmp_457);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1499,2166);


(lib.CachedBmp_456 = function() {
	this.initialize(img.CachedBmp_456);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1504,2173);


(lib.CachedBmp_455 = function() {
	this.initialize(img.CachedBmp_455);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1508,2181);


(lib.CachedBmp_454 = function() {
	this.initialize(img.CachedBmp_454);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1513,2189);


(lib.CachedBmp_453 = function() {
	this.initialize(img.CachedBmp_453);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1517,2197);


(lib.CachedBmp_452 = function() {
	this.initialize(img.CachedBmp_452);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1522,2205);


(lib.CachedBmp_451 = function() {
	this.initialize(img.CachedBmp_451);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1526,2212);


(lib.CachedBmp_450 = function() {
	this.initialize(img.CachedBmp_450);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1531,2220);


(lib.CachedBmp_449 = function() {
	this.initialize(img.CachedBmp_449);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1536,2228);


(lib.CachedBmp_448 = function() {
	this.initialize(img.CachedBmp_448);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1540,2236);


(lib.CachedBmp_447 = function() {
	this.initialize(img.CachedBmp_447);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1545,2243);


(lib.CachedBmp_446 = function() {
	this.initialize(img.CachedBmp_446);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1549,2251);


(lib.CachedBmp_444 = function() {
	this.initialize(img.CachedBmp_444);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1554,2259);


(lib.CachedBmp_445 = function() {
	this.initialize(img.CachedBmp_445);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1553,2259);


(lib.CachedBmp_427 = function() {
	this.initialize(img.CachedBmp_427);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1548,2248);


(lib.CachedBmp_426 = function() {
	this.initialize(img.CachedBmp_426);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1542,2237);


(lib.CachedBmp_425 = function() {
	this.initialize(img.CachedBmp_425);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1536,2226);


(lib.CachedBmp_424 = function() {
	this.initialize(img.CachedBmp_424);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1531,2214);


(lib.CachedBmp_422 = function() {
	this.initialize(img.CachedBmp_422);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1519,2192);


(lib.CachedBmp_421 = function() {
	this.initialize(img.CachedBmp_421);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1513,2181);


(lib.CachedBmp_423 = function() {
	this.initialize(img.CachedBmp_423);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1525,2203);


(lib.CachedBmp_420 = function() {
	this.initialize(img.CachedBmp_420);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1507,2170);


(lib.CachedBmp_419 = function() {
	this.initialize(img.CachedBmp_419);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1502,2159);


(lib.CachedBmp_418 = function() {
	this.initialize(img.CachedBmp_418);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1496,2148);


(lib.CachedBmp_417 = function() {
	this.initialize(img.CachedBmp_417);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1490,2136);


(lib.CachedBmp_414 = function() {
	this.initialize(img.CachedBmp_414);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1473,2103);


(lib.CachedBmp_416 = function() {
	this.initialize(img.CachedBmp_416);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1484,2125);


(lib.CachedBmp_415 = function() {
	this.initialize(img.CachedBmp_415);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1478,2114);


(lib.CachedBmp_413 = function() {
	this.initialize(img.CachedBmp_413);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1467,2092);


(lib.CachedBmp_412 = function() {
	this.initialize(img.CachedBmp_412);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1461,2081);


(lib.CachedBmp_411 = function() {
	this.initialize(img.CachedBmp_411);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1455,2070);


(lib.CachedBmp_407 = function() {
	this.initialize(img.CachedBmp_407);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1432,2025);


(lib.CachedBmp_410 = function() {
	this.initialize(img.CachedBmp_410);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1450,2058);


(lib.CachedBmp_408 = function() {
	this.initialize(img.CachedBmp_408);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1438,2036);


(lib.CachedBmp_409 = function() {
	this.initialize(img.CachedBmp_409);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1444,2047);


(lib.CachedBmp_406 = function() {
	this.initialize(img.CachedBmp_406);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1426,2014);


(lib.CachedBmp_405 = function() {
	this.initialize(img.CachedBmp_405);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_387 = function() {
	this.initialize(img.CachedBmp_387);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_386 = function() {
	this.initialize(img.CachedBmp_386);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_383 = function() {
	this.initialize(img.CachedBmp_383);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_384 = function() {
	this.initialize(img.CachedBmp_384);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_382 = function() {
	this.initialize(img.CachedBmp_382);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_385 = function() {
	this.initialize(img.CachedBmp_385);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_381 = function() {
	this.initialize(img.CachedBmp_381);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_380 = function() {
	this.initialize(img.CachedBmp_380);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_379 = function() {
	this.initialize(img.CachedBmp_379);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_376 = function() {
	this.initialize(img.CachedBmp_376);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_378 = function() {
	this.initialize(img.CachedBmp_378);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_377 = function() {
	this.initialize(img.CachedBmp_377);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_375 = function() {
	this.initialize(img.CachedBmp_375);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_374 = function() {
	this.initialize(img.CachedBmp_374);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_373 = function() {
	this.initialize(img.CachedBmp_373);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_372 = function() {
	this.initialize(img.CachedBmp_372);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_371 = function() {
	this.initialize(img.CachedBmp_371);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_370 = function() {
	this.initialize(img.CachedBmp_370);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_368 = function() {
	this.initialize(img.CachedBmp_368);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_369 = function() {
	this.initialize(img.CachedBmp_369);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_347 = function() {
	this.initialize(img.CachedBmp_347);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,360,303);


(lib.CachedBmp_363 = function() {
	this.initialize(img.CachedBmp_363);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,432,452);


(lib.CachedBmp_345 = function() {
	this.initialize(img.CachedBmp_345);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,361,303);


(lib.CachedBmp_533 = function() {
	this.initialize(img.CachedBmp_533);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,360,300);


(lib.CachedBmp_532 = function() {
	this.initialize(img.CachedBmp_532);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,360,296);


(lib.CachedBmp_367 = function() {
	this.initialize(img.CachedBmp_367);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_531 = function() {
	this.initialize(img.CachedBmp_531);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,360,293);


(lib.CachedBmp_529 = function() {
	this.initialize(img.CachedBmp_529);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,360,286);


(lib.CachedBmp_530 = function() {
	this.initialize(img.CachedBmp_530);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,360,290);


(lib.CachedBmp_527 = function() {
	this.initialize(img.CachedBmp_527);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,361,279);


(lib.CachedBmp_526 = function() {
	this.initialize(img.CachedBmp_526);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,362,276);


(lib.CachedBmp_528 = function() {
	this.initialize(img.CachedBmp_528);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,360,283);


(lib.CachedBmp_525 = function() {
	this.initialize(img.CachedBmp_525);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,364,274);


(lib.CachedBmp_524 = function() {
	this.initialize(img.CachedBmp_524);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,365,275);


(lib.CachedBmp_523 = function() {
	this.initialize(img.CachedBmp_523);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,368,275);


(lib.CachedBmp_366 = function() {
	this.initialize(img.CachedBmp_366);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_521 = function() {
	this.initialize(img.CachedBmp_521);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,372,277);


(lib.CachedBmp_522 = function() {
	this.initialize(img.CachedBmp_522);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,370,276);


(lib.CachedBmp_519 = function() {
	this.initialize(img.CachedBmp_519);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,376,278);


(lib.CachedBmp_520 = function() {
	this.initialize(img.CachedBmp_520);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,374,277);


(lib.CachedBmp_518 = function() {
	this.initialize(img.CachedBmp_518);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,378,278);


(lib.CachedBmp_517 = function() {
	this.initialize(img.CachedBmp_517);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,388,279);


(lib.CachedBmp_516 = function() {
	this.initialize(img.CachedBmp_516);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,398,280);


(lib.CachedBmp_515 = function() {
	this.initialize(img.CachedBmp_515);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,409,280);


(lib.CachedBmp_514 = function() {
	this.initialize(img.CachedBmp_514);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,419,281);


(lib.CachedBmp_513 = function() {
	this.initialize(img.CachedBmp_513);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,429,282);


(lib.CachedBmp_511 = function() {
	this.initialize(img.CachedBmp_511);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,450,283);


(lib.CachedBmp_512 = function() {
	this.initialize(img.CachedBmp_512);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,440,282);


(lib.CachedBmp_365 = function() {
	this.initialize(img.CachedBmp_365);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_364 = function() {
	this.initialize(img.CachedBmp_364);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_302 = function() {
	this.initialize(img.CachedBmp_302);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,441,287);


(lib.CachedBmp_509 = function() {
	this.initialize(img.CachedBmp_509);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,470,284);


(lib.CachedBmp_510 = function() {
	this.initialize(img.CachedBmp_510);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,460,283);


(lib.CachedBmp_304 = function() {
	this.initialize(img.CachedBmp_304);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,461,285);


(lib.CachedBmp_362 = function() {
	this.initialize(img.CachedBmp_362);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1421,2003);


(lib.CachedBmp_303 = function() {
	this.initialize(img.CachedBmp_303);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,451,286);


(lib.CachedBmp_301 = function() {
	this.initialize(img.CachedBmp_301);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,431,288);


(lib.CachedBmp_300 = function() {
	this.initialize(img.CachedBmp_300);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,421,289);


(lib.CachedBmp_299 = function() {
	this.initialize(img.CachedBmp_299);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,411,290);


(lib.CachedBmp_295 = function() {
	this.initialize(img.CachedBmp_295);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,371,294);


(lib.CachedBmp_296 = function() {
	this.initialize(img.CachedBmp_296);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,381,293);


(lib.CachedBmp_294 = function() {
	this.initialize(img.CachedBmp_294);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,361,295);


(lib.CachedBmp_297 = function() {
	this.initialize(img.CachedBmp_297);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,391,292);


(lib.CachedBmp_298 = function() {
	this.initialize(img.CachedBmp_298);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,401,291);


(lib.CachedBmp_293 = function() {
	this.initialize(img.CachedBmp_293);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,351,296);


(lib.CachedBmp_291 = function() {
	this.initialize(img.CachedBmp_291);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,369,298);


(lib.CachedBmp_290 = function() {
	this.initialize(img.CachedBmp_290);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,380,299);


(lib.CachedBmp_288 = function() {
	this.initialize(img.CachedBmp_288);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,403,301);


(lib.CachedBmp_287 = function() {
	this.initialize(img.CachedBmp_287);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,415,302);


(lib.CachedBmp_289 = function() {
	this.initialize(img.CachedBmp_289);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,392,300);


(lib.CachedBmp_287копия = function() {
	this.initialize(img.CachedBmp_287копия);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,415,302);


(lib.CachedBmp_292 = function() {
	this.initialize(img.CachedBmp_292);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,357,297);


(lib.CachedBmp_267 = function() {
	this.initialize(img.CachedBmp_267);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,391,305);


(lib.CachedBmp_264 = function() {
	this.initialize(img.CachedBmp_264);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,375,308);


(lib.CachedBmp_263 = function() {
	this.initialize(img.CachedBmp_263);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,371,309);


(lib.CachedBmp_265 = function() {
	this.initialize(img.CachedBmp_265);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,380,307);


(lib.CachedBmp_266 = function() {
	this.initialize(img.CachedBmp_266);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,384,306);


(lib.CachedBmp_268 = function() {
	this.initialize(img.CachedBmp_268);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,399,304);


(lib.CachedBmp_269 = function() {
	this.initialize(img.CachedBmp_269);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,407,303);


(lib.CachedBmp_261 = function() {
	this.initialize(img.CachedBmp_261);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,363,311);


(lib.CachedBmp_257 = function() {
	this.initialize(img.CachedBmp_257);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,348,315);


(lib.CachedBmp_262 = function() {
	this.initialize(img.CachedBmp_262);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,367,310);


(lib.CachedBmp_260 = function() {
	this.initialize(img.CachedBmp_260);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,359,312);


(lib.CachedBmp_258 = function() {
	this.initialize(img.CachedBmp_258);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,351,314);


(lib.CachedBmp_259 = function() {
	this.initialize(img.CachedBmp_259);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,355,313);


(lib.CachedBmp_256 = function() {
	this.initialize(img.CachedBmp_256);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,344,316);


(lib.CachedBmp_255 = function() {
	this.initialize(img.CachedBmp_255);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,342,317);


(lib.CachedBmp_254 = function() {
	this.initialize(img.CachedBmp_254);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,341,318);


(lib.CachedBmp_251 = function() {
	this.initialize(img.CachedBmp_251);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,339,321);


(lib.CachedBmp_249 = function() {
	this.initialize(img.CachedBmp_249);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,323);


(lib.CachedBmp_252 = function() {
	this.initialize(img.CachedBmp_252);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,339,320);


(lib.CachedBmp_253 = function() {
	this.initialize(img.CachedBmp_253);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,340,319);


(lib.CachedBmp_250 = function() {
	this.initialize(img.CachedBmp_250);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,339,322);


(lib.CachedBmp_246 = function() {
	this.initialize(img.CachedBmp_246);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_248 = function() {
	this.initialize(img.CachedBmp_248);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,325);


(lib.CachedBmp_245 = function() {
	this.initialize(img.CachedBmp_245);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_243 = function() {
	this.initialize(img.CachedBmp_243);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_242 = function() {
	this.initialize(img.CachedBmp_242);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_241 = function() {
	this.initialize(img.CachedBmp_241);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_244 = function() {
	this.initialize(img.CachedBmp_244);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_240 = function() {
	this.initialize(img.CachedBmp_240);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_239 = function() {
	this.initialize(img.CachedBmp_239);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_237 = function() {
	this.initialize(img.CachedBmp_237);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_235 = function() {
	this.initialize(img.CachedBmp_235);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_236 = function() {
	this.initialize(img.CachedBmp_236);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_238 = function() {
	this.initialize(img.CachedBmp_238);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_232 = function() {
	this.initialize(img.CachedBmp_232);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_233 = function() {
	this.initialize(img.CachedBmp_233);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_234 = function() {
	this.initialize(img.CachedBmp_234);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_231 = function() {
	this.initialize(img.CachedBmp_231);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_247 = function() {
	this.initialize(img.CachedBmp_247);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,326);


(lib.CachedBmp_228 = function() {
	this.initialize(img.CachedBmp_228);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,334,323);


(lib.CachedBmp_225 = function() {
	this.initialize(img.CachedBmp_225);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,328,319);


(lib.CachedBmp_226 = function() {
	this.initialize(img.CachedBmp_226);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,330,320);


(lib.CachedBmp_227 = function() {
	this.initialize(img.CachedBmp_227);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,332,322);


(lib.CachedBmp_229 = function() {
	this.initialize(img.CachedBmp_229);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,336,324);


(lib.CachedBmp_224 = function() {
	this.initialize(img.CachedBmp_224);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,318);


(lib.CachedBmp_223 = function() {
	this.initialize(img.CachedBmp_223);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,324,316);


(lib.CachedBmp_222 = function() {
	this.initialize(img.CachedBmp_222);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,322,315);


(lib.CachedBmp_221 = function() {
	this.initialize(img.CachedBmp_221);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,314);


(lib.CachedBmp_220 = function() {
	this.initialize(img.CachedBmp_220);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,318,312);


(lib.CachedBmp_216 = function() {
	this.initialize(img.CachedBmp_216);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,312,307);


(lib.CachedBmp_219 = function() {
	this.initialize(img.CachedBmp_219);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,316,311);


(lib.CachedBmp_217 = function() {
	this.initialize(img.CachedBmp_217);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,312,308);


(lib.CachedBmp_215 = function() {
	this.initialize(img.CachedBmp_215);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,315,306);


(lib.CachedBmp_218 = function() {
	this.initialize(img.CachedBmp_218);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,314,310);


(lib.CachedBmp_213 = function() {
	this.initialize(img.CachedBmp_213);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,319,303);


(lib.CachedBmp_210 = function() {
	this.initialize(img.CachedBmp_210);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,299);


(lib.CachedBmp_209 = function() {
	this.initialize(img.CachedBmp_209);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,329,298);


(lib.CachedBmp_211 = function() {
	this.initialize(img.CachedBmp_211);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,324,301);


(lib.CachedBmp_214 = function() {
	this.initialize(img.CachedBmp_214);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,317,305);


(lib.CachedBmp_212 = function() {
	this.initialize(img.CachedBmp_212);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,322,302);


(lib.CachedBmp_208 = function() {
	this.initialize(img.CachedBmp_208);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,331,297);


(lib.CachedBmp_207 = function() {
	this.initialize(img.CachedBmp_207);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,333,295);


(lib.CachedBmp_205 = function() {
	this.initialize(img.CachedBmp_205);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,293);


(lib.CachedBmp_206 = function() {
	this.initialize(img.CachedBmp_206);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,336,294);


(lib.CachedBmp_184 = function() {
	this.initialize(img.CachedBmp_184);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1700,1700);


(lib.CachedBmp_185 = function() {
	this.initialize(ss["dd_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_186 = function() {
	this.initialize(img.CachedBmp_186);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2193,2193);


(lib.CachedBmp_182 = function() {
	this.initialize(img.CachedBmp_182);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1207,1207);


(lib.CachedBmp_183 = function() {
	this.initialize(img.CachedBmp_183);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1454,1454);


(lib.CachedBmp_187 = function() {
	this.initialize(img.CachedBmp_187);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2440,2440);


(lib.CachedBmp_181 = function() {
	this.initialize(img.CachedBmp_181);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,961,961);


(lib.CachedBmp_180 = function() {
	this.initialize(img.CachedBmp_180);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,942,934);


(lib.CachedBmp_179 = function() {
	this.initialize(img.CachedBmp_179);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,926,913);


(lib.CachedBmp_178 = function() {
	this.initialize(img.CachedBmp_178);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,913,894);


(lib.CachedBmp_188 = function() {
	this.initialize(img.CachedBmp_188);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2687,2686);


(lib.CachedBmp_177 = function() {
	this.initialize(img.CachedBmp_177);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,901,876);


(lib.CachedBmp_176 = function() {
	this.initialize(img.CachedBmp_176);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,890,859);


(lib.CachedBmp_175 = function() {
	this.initialize(img.CachedBmp_175);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,893,844);


(lib.CachedBmp_174 = function() {
	this.initialize(img.CachedBmp_174);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,938,854);


(lib.CachedBmp_189 = function() {
	this.initialize(img.CachedBmp_189);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2933,2933);


(lib.CachedBmp_172 = function() {
	this.initialize(img.CachedBmp_172);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1027,880);


(lib.CachedBmp_173 = function() {
	this.initialize(img.CachedBmp_173);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,982,866);


(lib.CachedBmp_171 = function() {
	this.initialize(img.CachedBmp_171);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1072,896);


(lib.CachedBmp_164 = function() {
	this.initialize(img.CachedBmp_164);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1037,888);


(lib.CachedBmp_170 = function() {
	this.initialize(img.CachedBmp_170);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1072,897);


(lib.CachedBmp_163 = function() {
	this.initialize(img.CachedBmp_163);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1001,881);


(lib.CachedBmp_161 = function() {
	this.initialize(img.CachedBmp_161);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,929,877);


(lib.CachedBmp_162 = function() {
	this.initialize(img.CachedBmp_162);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,965,875);


(lib.CachedBmp_160 = function() {
	this.initialize(img.CachedBmp_160);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,893,879);


(lib.CachedBmp_158 = function() {
	this.initialize(img.CachedBmp_158);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,872,887);


(lib.CachedBmp_159 = function() {
	this.initialize(img.CachedBmp_159);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,882,883);


(lib.CachedBmp_156 = function() {
	this.initialize(img.CachedBmp_156);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,851,896);


(lib.CachedBmp_157 = function() {
	this.initialize(img.CachedBmp_157);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,861,891);


(lib.CachedBmp_190 = function() {
	this.initialize(img.CachedBmp_190);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3179,3179);


(lib.CachedBmp_155 = function() {
	this.initialize(img.CachedBmp_155);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,841,901);


(lib.CachedBmp_152 = function() {
	this.initialize(img.CachedBmp_152);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,815,917);


(lib.CachedBmp_153 = function() {
	this.initialize(img.CachedBmp_153);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,823,911);


(lib.CachedBmp_154 = function() {
	this.initialize(img.CachedBmp_154);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,831,906);


(lib.CachedBmp_148 = function() {
	this.initialize(img.CachedBmp_148);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,789,938);


(lib.CachedBmp_151 = function() {
	this.initialize(img.CachedBmp_151);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,808,922);


(lib.CachedBmp_149 = function() {
	this.initialize(img.CachedBmp_149);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,794,933);


(lib.CachedBmp_150 = function() {
	this.initialize(img.CachedBmp_150);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,801,927);


(lib.CachedBmp_147 = function() {
	this.initialize(img.CachedBmp_147);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,784,944);


(lib.CachedBmp_146 = function() {
	this.initialize(img.CachedBmp_146);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,779,950);


(lib.CachedBmp_144 = function() {
	this.initialize(img.CachedBmp_144);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,770,961);


(lib.CachedBmp_145 = function() {
	this.initialize(img.CachedBmp_145);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,774,955);


(lib.CachedBmp_143 = function() {
	this.initialize(img.CachedBmp_143);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,770,966);


(lib.CachedBmp_142 = function() {
	this.initialize(img.CachedBmp_142);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,797,972);


(lib.CachedBmp_141 = function() {
	this.initialize(img.CachedBmp_141);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,828,978);


(lib.CachedBmp_140 = function() {
	this.initialize(img.CachedBmp_140);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,860,983);


(lib.CachedBmp_123 = function() {
	this.initialize(img.CachedBmp_123);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,865,881);


(lib.CachedBmp_122 = function() {
	this.initialize(img.CachedBmp_122);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,868,830);


(lib.CachedBmp_139 = function() {
	this.initialize(img.CachedBmp_139);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,860,983);


(lib.CachedBmp_124 = function() {
	this.initialize(img.CachedBmp_124);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,863,932);


(lib.CachedBmp_121 = function() {
	this.initialize(img.CachedBmp_121);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,871,779);


(lib.CachedBmp_120 = function() {
	this.initialize(img.CachedBmp_120);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,873,752);


(lib.CachedBmp_119 = function() {
	this.initialize(img.CachedBmp_119);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,876,746);


(lib.CachedBmp_117 = function() {
	this.initialize(img.CachedBmp_117);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,882,734);


(lib.CachedBmp_118 = function() {
	this.initialize(img.CachedBmp_118);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,879,740);


(lib.CachedBmp_114 = function() {
	this.initialize(img.CachedBmp_114);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,892,724);


(lib.CachedBmp_116 = function() {
	this.initialize(img.CachedBmp_116);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,885,729);


(lib.CachedBmp_115 = function() {
	this.initialize(img.CachedBmp_115);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,889,723);


(lib.CachedBmp_113 = function() {
	this.initialize(img.CachedBmp_113);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,897,728);


(lib.CachedBmp_112 = function() {
	this.initialize(img.CachedBmp_112);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,902,734);


(lib.CachedBmp_109 = function() {
	this.initialize(img.CachedBmp_109);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,926,848);


(lib.CachedBmp_111 = function() {
	this.initialize(img.CachedBmp_111);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,909,766);


(lib.CachedBmp_110 = function() {
	this.initialize(img.CachedBmp_110);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,917,807);


(lib.CachedBmp_107копия = function() {
	this.initialize(img.CachedBmp_107копия);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,949,951);


(lib.CachedBmp_108 = function() {
	this.initialize(img.CachedBmp_108);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,937,899);


(lib.CachedBmp_107 = function() {
	this.initialize(img.CachedBmp_107);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,949,951);


(lib.CachedBmp_89 = function() {
	this.initialize(img.CachedBmp_89);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,944,939);


(lib.CachedBmp_88 = function() {
	this.initialize(img.CachedBmp_88);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,940,926);


(lib.CachedBmp_85 = function() {
	this.initialize(img.CachedBmp_85);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,935,889);


(lib.CachedBmp_86 = function() {
	this.initialize(img.CachedBmp_86);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,936,901);


(lib.CachedBmp_87 = function() {
	this.initialize(img.CachedBmp_87);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,938,914);


(lib.CachedBmp_84 = function() {
	this.initialize(img.CachedBmp_84);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,936,877);


(lib.CachedBmp_82 = function() {
	this.initialize(img.CachedBmp_82);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,940,855);


(lib.CachedBmp_83 = function() {
	this.initialize(img.CachedBmp_83);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,937,864);


(lib.CachedBmp_81 = function() {
	this.initialize(img.CachedBmp_81);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,944,845);


(lib.CachedBmp_80 = function() {
	this.initialize(img.CachedBmp_80);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,949,837);


(lib.CachedBmp_79 = function() {
	this.initialize(img.CachedBmp_79);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,953,831);


(lib.CachedBmp_78 = function() {
	this.initialize(img.CachedBmp_78);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,958,825);


(lib.CachedBmp_77 = function() {
	this.initialize(img.CachedBmp_77);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,963,820);


(lib.CachedBmp_76 = function() {
	this.initialize(img.CachedBmp_76);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,968,815);


(lib.CachedBmp_75 = function() {
	this.initialize(img.CachedBmp_75);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,973,810);


(lib.CachedBmp_74 = function() {
	this.initialize(img.CachedBmp_74);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,977,806);


(lib.CachedBmp_73 = function() {
	this.initialize(img.CachedBmp_73);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,982,802);


(lib.CachedBmp_71 = function() {
	this.initialize(img.CachedBmp_71);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,992,794);


(lib.CachedBmp_72 = function() {
	this.initialize(img.CachedBmp_72);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,987,798);


(lib.CachedBmp_70 = function() {
	this.initialize(img.CachedBmp_70);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,997,790);


(lib.CachedBmp_69 = function() {
	this.initialize(img.CachedBmp_69);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1001,786);


(lib.CachedBmp_67 = function() {
	this.initialize(img.CachedBmp_67);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1011,780);


(lib.CachedBmp_68 = function() {
	this.initialize(img.CachedBmp_68);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1006,783);


(lib.CachedBmp_49 = function() {
	this.initialize(img.CachedBmp_49);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,997,759);


(lib.CachedBmp_48 = function() {
	this.initialize(img.CachedBmp_48);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,983,738);


(lib.CachedBmp_45 = function() {
	this.initialize(img.CachedBmp_45);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,942,700);


(lib.CachedBmp_46 = function() {
	this.initialize(img.CachedBmp_46);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,956,708);


(lib.CachedBmp_47 = function() {
	this.initialize(img.CachedBmp_47);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,969,718);


(lib.CachedBmp_44 = function() {
	this.initialize(img.CachedBmp_44);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,929,704);


(lib.CachedBmp_43 = function() {
	this.initialize(img.CachedBmp_43);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,919,711);


(lib.CachedBmp_42 = function() {
	this.initialize(img.CachedBmp_42);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,920,718);


(lib.CachedBmp_38 = function() {
	this.initialize(img.CachedBmp_38);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,941,777);


(lib.CachedBmp_41 = function() {
	this.initialize(img.CachedBmp_41);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,921,728);


(lib.CachedBmp_40 = function() {
	this.initialize(img.CachedBmp_40);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,927,745);


(lib.CachedBmp_39 = function() {
	this.initialize(img.CachedBmp_39);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,934,761);


(lib.CachedBmp_37 = function() {
	this.initialize(img.CachedBmp_37);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,948,795);


(lib.CachedBmp_36 = function() {
	this.initialize(img.CachedBmp_36);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,956,813);


(lib.CachedBmp_35 = function() {
	this.initialize(img.CachedBmp_35);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,964,833);


(lib.CachedBmp_34 = function() {
	this.initialize(img.CachedBmp_34);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,974,856);


(lib.CachedBmp_33 = function() {
	this.initialize(img.CachedBmp_33);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,983,879);


(lib.CachedBmp_32 = function() {
	this.initialize(img.CachedBmp_32);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,992,902);


(lib.CachedBmp_31 = function() {
	this.initialize(img.CachedBmp_31);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1001,925);


(lib.CachedBmp_30 = function() {
	this.initialize(img.CachedBmp_30);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1011,949);


(lib.CachedBmp_29 = function() {
	this.initialize(img.CachedBmp_29);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1020,973);


(lib.CachedBmp_10 = function() {
	this.initialize(img.CachedBmp_10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1167,289);


(lib.CachedBmp_28 = function() {
	this.initialize(img.CachedBmp_28);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1029,997);


(lib.CachedBmp_8 = function() {
	this.initialize(img.CachedBmp_8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1167,289);


(lib.CachedBmp_27 = function() {
	this.initialize(img.CachedBmp_27);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1039,1022);


(lib.CachedBmp_9 = function() {
	this.initialize(img.CachedBmp_9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,648,317);


(lib.CachedBmp_7 = function() {
	this.initialize(img.CachedBmp_7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,648,317);


(lib.CachedBmp_26 = function() {
	this.initialize(img.CachedBmp_26);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1049,1060);


(lib.CachedBmp_6 = function() {
	this.initialize(img.CachedBmp_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1167,289);


(lib.CachedBmp_25 = function() {
	this.initialize(img.CachedBmp_25);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1059,1105);


(lib.CachedBmp_2 = function() {
	this.initialize(img.CachedBmp_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,63,379);


(lib.CachedBmp_5 = function() {
	this.initialize(img.CachedBmp_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,648,317);


(lib.CachedBmp_3 = function() {
	this.initialize(img.CachedBmp_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,648,317);


(lib.CachedBmp_1 = function() {
	this.initialize(img.CachedBmp_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,483,361);


(lib.CachedBmp_4 = function() {
	this.initialize(img.CachedBmp_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1167,289);


(lib.Анимация4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_508();
	this.instance.setTransform(-854.95,-30.5,0.1614,0.1614);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-854.9,-30.5,1709.9,61.2);


(lib.Анимация3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Слой_1
	this.instance = new lib.CachedBmp_507();
	this.instance.setTransform(-854.95,-30.5,0.1614,0.1614);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-854.9,-30.5,1709.9,61.2);


// stage content:
(lib.обложка = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(194));

	// Слой_6
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(391.55,315.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},170).wait(24));

	// Слой_3
	this.instance_1 = new lib.Анимация3("synched",0);
	this.instance_1.setTransform(3332.45,825.2,3.0971,3.0971);

	this.instance_2 = new lib.Анимация4("synched",0);
	this.instance_2.setTransform(2648,825.2,3.0971,3.0971);
	this.instance_2._off = true;

	this.instance_3 = new lib.CachedBmp_2();
	this.instance_3.setTransform(-808.65,655.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},26).to({state:[{t:this.instance_2}]},18).to({state:[{t:this.instance_2}]},17).to({state:[{t:this.instance_2}]},18).to({state:[{t:this.instance_2}]},21).to({state:[{t:this.instance_2}]},29).to({state:[{t:this.instance_2},{t:this.instance_3}]},31).to({state:[]},10).wait(24));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true,x:2648},26).wait(168));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:false},26).to({x:1872.8},18).to({x:1305.05},17).to({x:497.2},18).to({x:-185.2},21).to({x:-823.95},29).to({x:-1670.1},31).to({_off:true},10).wait(24));

	// Слой_4
	this.instance_4 = new lib.CachedBmp_4();
	this.instance_4.setTransform(8.9,19.45,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_3();
	this.instance_5.setTransform(326.15,164,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_6();
	this.instance_6.setTransform(8.9,19.45,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_5();
	this.instance_7.setTransform(326.15,164,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_8();
	this.instance_8.setTransform(8.9,19.45,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_7();
	this.instance_9.setTransform(326.15,164,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_10();
	this.instance_10.setTransform(8.9,19.45,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_9();
	this.instance_11.setTransform(326.15,164,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4}]}).to({state:[{t:this.instance_7},{t:this.instance_6}]},154).to({state:[{t:this.instance_9},{t:this.instance_8}]},6).to({state:[{t:this.instance_11},{t:this.instance_10}]},10).to({state:[]},1).wait(23));

	// Слой_8
	this.instance_12 = new lib.CachedBmp_25();
	this.instance_12.setTransform(62.9,143.25,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_26();
	this.instance_13.setTransform(63.8,156.2,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_27();
	this.instance_14.setTransform(64.6,169.15,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_28();
	this.instance_15.setTransform(65.25,182.05,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_29();
	this.instance_16.setTransform(65.75,195,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_30();
	this.instance_17.setTransform(66.25,207.95,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_31();
	this.instance_18.setTransform(66.75,220.9,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_32();
	this.instance_19.setTransform(67.25,233.85,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_33();
	this.instance_20.setTransform(67.7,246.75,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_34();
	this.instance_21.setTransform(68.15,259.7,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_35();
	this.instance_22.setTransform(68.65,272.15,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_36();
	this.instance_23.setTransform(69.1,283.6,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_37();
	this.instance_24.setTransform(69.55,294.15,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_38();
	this.instance_25.setTransform(69.95,304.2,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_39();
	this.instance_26.setTransform(70.4,313.8,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_40();
	this.instance_27.setTransform(70.85,323.25,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_41();
	this.instance_28.setTransform(71.25,332.65,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_42();
	this.instance_29.setTransform(71.65,339.4,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_43();
	this.instance_30.setTransform(72.1,344.1,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_44();
	this.instance_31.setTransform(72.5,348.75,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_45();
	this.instance_32.setTransform(72.9,352.35,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_46();
	this.instance_33.setTransform(73.35,350.85,0.5,0.5);

	this.instance_34 = new lib.CachedBmp_47();
	this.instance_34.setTransform(73.75,348.6,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_48();
	this.instance_35.setTransform(74.1,342.1,0.5,0.5);

	this.instance_36 = new lib.CachedBmp_49();
	this.instance_36.setTransform(74.55,335.5,0.5,0.5);

	this.instance_37 = new lib.CachedBmp_67();
	this.instance_37.setTransform(74.95,328.9,0.5,0.5);
	this.instance_37._off = true;

	this.instance_38 = new lib.CachedBmp_68();
	this.instance_38.setTransform(75.75,322.65,0.5,0.5);

	this.instance_39 = new lib.CachedBmp_69();
	this.instance_39.setTransform(76.5,321.65,0.5,0.5);

	this.instance_40 = new lib.CachedBmp_70();
	this.instance_40.setTransform(77.3,320.65,0.5,0.5);

	this.instance_41 = new lib.CachedBmp_71();
	this.instance_41.setTransform(78.05,319.65,0.5,0.5);

	this.instance_42 = new lib.CachedBmp_72();
	this.instance_42.setTransform(78.85,318.65,0.5,0.5);

	this.instance_43 = new lib.CachedBmp_73();
	this.instance_43.setTransform(79.6,317.6,0.5,0.5);

	this.instance_44 = new lib.CachedBmp_74();
	this.instance_44.setTransform(80.4,316.55,0.5,0.5);

	this.instance_45 = new lib.CachedBmp_75();
	this.instance_45.setTransform(81.2,315.45,0.5,0.5);

	this.instance_46 = new lib.CachedBmp_76();
	this.instance_46.setTransform(81.95,314.45,0.5,0.5);

	this.instance_47 = new lib.CachedBmp_77();
	this.instance_47.setTransform(82.75,313.35,0.5,0.5);

	this.instance_48 = new lib.CachedBmp_78();
	this.instance_48.setTransform(83.5,312.15,0.5,0.5);

	this.instance_49 = new lib.CachedBmp_79();
	this.instance_49.setTransform(84.25,310.9,0.5,0.5);

	this.instance_50 = new lib.CachedBmp_80();
	this.instance_50.setTransform(84.95,309.6,0.5,0.5);

	this.instance_51 = new lib.CachedBmp_81();
	this.instance_51.setTransform(85.7,307,0.5,0.5);

	this.instance_52 = new lib.CachedBmp_82();
	this.instance_52.setTransform(86.45,304.05,0.5,0.5);

	this.instance_53 = new lib.CachedBmp_83();
	this.instance_53.setTransform(87.2,301.1,0.5,0.5);

	this.instance_54 = new lib.CachedBmp_84();
	this.instance_54.setTransform(87.9,298.15,0.5,0.5);

	this.instance_55 = new lib.CachedBmp_85();
	this.instance_55.setTransform(88.6,295.2,0.5,0.5);

	this.instance_56 = new lib.CachedBmp_86();
	this.instance_56.setTransform(89.3,292.25,0.5,0.5);

	this.instance_57 = new lib.CachedBmp_87();
	this.instance_57.setTransform(90,289.3,0.5,0.5);

	this.instance_58 = new lib.CachedBmp_88();
	this.instance_58.setTransform(90.55,286.35,0.5,0.5);

	this.instance_59 = new lib.CachedBmp_89();
	this.instance_59.setTransform(90.7,283.4,0.5,0.5);

	this.instance_60 = new lib.CachedBmp_107();
	this.instance_60.setTransform(90.6,280.45,0.5,0.5);
	this.instance_60._off = true;

	this.instance_61 = new lib.CachedBmp_107копия();
	this.instance_61.setTransform(90.6,285.85,0.5,0.5);

	this.instance_62 = new lib.CachedBmp_108();
	this.instance_62.setTransform(89.45,297.7,0.5,0.5);

	this.instance_63 = new lib.CachedBmp_109();
	this.instance_63.setTransform(88.3,309.55,0.5,0.5);

	this.instance_64 = new lib.CachedBmp_110();
	this.instance_64.setTransform(87.15,321.4,0.5,0.5);

	this.instance_65 = new lib.CachedBmp_111();
	this.instance_65.setTransform(85.95,333.25,0.5,0.5);

	this.instance_66 = new lib.CachedBmp_112();
	this.instance_66.setTransform(84.8,341.15,0.5,0.5);

	this.instance_67 = new lib.CachedBmp_113();
	this.instance_67.setTransform(83.55,335.85,0.5,0.5);

	this.instance_68 = new lib.CachedBmp_114();
	this.instance_68.setTransform(82.3,329.55,0.5,0.5);

	this.instance_69 = new lib.CachedBmp_115();
	this.instance_69.setTransform(81.05,322.05,0.5,0.5);

	this.instance_70 = new lib.CachedBmp_116();
	this.instance_70.setTransform(79.7,313.65,0.5,0.5);

	this.instance_71 = new lib.CachedBmp_117();
	this.instance_71.setTransform(78.35,305.25,0.5,0.5);

	this.instance_72 = new lib.CachedBmp_118();
	this.instance_72.setTransform(76.85,296.9,0.5,0.5);

	this.instance_73 = new lib.CachedBmp_119();
	this.instance_73.setTransform(75.3,288.5,0.5,0.5);

	this.instance_74 = new lib.CachedBmp_120();
	this.instance_74.setTransform(73.7,279.95,0.5,0.5);

	this.instance_75 = new lib.CachedBmp_121();
	this.instance_75.setTransform(72.15,269.1,0.5,0.5);

	this.instance_76 = new lib.CachedBmp_122();
	this.instance_76.setTransform(70.55,255.4,0.5,0.5);

	this.instance_77 = new lib.CachedBmp_123();
	this.instance_77.setTransform(69,241.55,0.5,0.5);

	this.instance_78 = new lib.CachedBmp_124();
	this.instance_78.setTransform(67.4,227.7,0.5,0.5);

	this.instance_79 = new lib.CachedBmp_139();
	this.instance_79.setTransform(65.85,213.85,0.5,0.5);
	this.instance_79._off = true;

	this.instance_80 = new lib.CachedBmp_140();
	this.instance_80.setTransform(65.85,213.85,0.5,0.5);

	this.instance_81 = new lib.CachedBmp_141();
	this.instance_81.setTransform(72.75,213.25,0.5,0.5);

	this.instance_82 = new lib.CachedBmp_142();
	this.instance_82.setTransform(79.7,212.7,0.5,0.5);

	this.instance_83 = new lib.CachedBmp_143();
	this.instance_83.setTransform(84.1,212.1,0.5,0.5);

	this.instance_84 = new lib.CachedBmp_144();
	this.instance_84.setTransform(86.95,211.5,0.5,0.5);

	this.instance_85 = new lib.CachedBmp_145();
	this.instance_85.setTransform(89.8,210.95,0.5,0.5);

	this.instance_86 = new lib.CachedBmp_146();
	this.instance_86.setTransform(92.6,210.35,0.5,0.5);

	this.instance_87 = new lib.CachedBmp_147();
	this.instance_87.setTransform(95.45,209.8,0.5,0.5);

	this.instance_88 = new lib.CachedBmp_148();
	this.instance_88.setTransform(98.3,209.2,0.5,0.5);

	this.instance_89 = new lib.CachedBmp_149();
	this.instance_89.setTransform(101.1,208.6,0.5,0.5);

	this.instance_90 = new lib.CachedBmp_150();
	this.instance_90.setTransform(103.95,208.05,0.5,0.5);

	this.instance_91 = new lib.CachedBmp_151();
	this.instance_91.setTransform(106.8,207.45,0.5,0.5);

	this.instance_92 = new lib.CachedBmp_152();
	this.instance_92.setTransform(109.6,206.8,0.5,0.5);

	this.instance_93 = new lib.CachedBmp_153();
	this.instance_93.setTransform(112.2,206.1,0.5,0.5);

	this.instance_94 = new lib.CachedBmp_154();
	this.instance_94.setTransform(114.75,205.45,0.5,0.5);

	this.instance_95 = new lib.CachedBmp_155();
	this.instance_95.setTransform(117.15,204.7,0.5,0.5);

	this.instance_96 = new lib.CachedBmp_156();
	this.instance_96.setTransform(119.5,203.95,0.5,0.5);

	this.instance_97 = new lib.CachedBmp_157();
	this.instance_97.setTransform(121.8,203.15,0.5,0.5);

	this.instance_98 = new lib.CachedBmp_158();
	this.instance_98.setTransform(124,202.25,0.5,0.5);

	this.instance_99 = new lib.CachedBmp_159();
	this.instance_99.setTransform(126.2,201.35,0.5,0.5);

	this.instance_100 = new lib.CachedBmp_160();
	this.instance_100.setTransform(127.85,200.4,0.5,0.5);

	this.instance_101 = new lib.CachedBmp_161();
	this.instance_101.setTransform(117.45,199.4,0.5,0.5);

	this.instance_102 = new lib.CachedBmp_162();
	this.instance_102.setTransform(106.95,198.4,0.5,0.5);

	this.instance_103 = new lib.CachedBmp_163();
	this.instance_103.setTransform(96.5,197.35,0.5,0.5);

	this.instance_104 = new lib.CachedBmp_164();
	this.instance_104.setTransform(86.05,196.3,0.5,0.5);

	this.instance_105 = new lib.CachedBmp_170();
	this.instance_105.setTransform(75.6,195.2,0.5,0.5);
	this.instance_105._off = true;

	this.instance_106 = new lib.CachedBmp_171();
	this.instance_106.setTransform(75.6,195.2,0.5,0.5);

	this.instance_107 = new lib.CachedBmp_172();
	this.instance_107.setTransform(75.35,207.8,0.5,0.5);

	this.instance_108 = new lib.CachedBmp_173();
	this.instance_108.setTransform(75.1,219.35,0.5,0.5);

	this.instance_109 = new lib.CachedBmp_174();
	this.instance_109.setTransform(74.9,230.15,0.5,0.5);

	this.instance_110 = new lib.CachedBmp_175();
	this.instance_110.setTransform(74.65,240.45,0.5,0.5);

	this.instance_111 = new lib.CachedBmp_176();
	this.instance_111.setTransform(74.4,238.35,0.5,0.5);

	this.instance_112 = new lib.CachedBmp_177();
	this.instance_112.setTransform(74.15,235.45,0.5,0.5);

	this.instance_113 = new lib.CachedBmp_178();
	this.instance_113.setTransform(73.9,232.45,0.5,0.5);

	this.instance_114 = new lib.CachedBmp_179();
	this.instance_114.setTransform(73.65,229.35,0.5,0.5);

	this.instance_115 = new lib.CachedBmp_180();
	this.instance_115.setTransform(73.45,225.85,0.5,0.5);

	this.instance_116 = new lib.CachedBmp_181();
	this.instance_116.setTransform(73.2,221.1,0.5,0.5);

	this.instance_117 = new lib.CachedBmp_182();
	this.instance_117.setTransform(10.5,169.55,0.5,0.5);

	this.instance_118 = new lib.CachedBmp_183();
	this.instance_118.setTransform(-52.15,118,0.5,0.5);

	this.instance_119 = new lib.CachedBmp_184();
	this.instance_119.setTransform(-114.85,66.4,0.5,0.5);

	this.instance_120 = new lib.CachedBmp_185();
	this.instance_120.setTransform(-177.5,14.8,0.5,0.5);

	this.instance_121 = new lib.CachedBmp_186();
	this.instance_121.setTransform(-240.2,-36.75,0.5,0.5);

	this.instance_122 = new lib.CachedBmp_187();
	this.instance_122.setTransform(-302.85,-88.35,0.5,0.5);

	this.instance_123 = new lib.CachedBmp_188();
	this.instance_123.setTransform(-365.55,-139.95,0.5,0.5);

	this.instance_124 = new lib.CachedBmp_189();
	this.instance_124.setTransform(-428.2,-191.5,0.5,0.5);

	this.instance_125 = new lib.CachedBmp_190();
	this.instance_125.setTransform(-490.85,-243.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_12}]}).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_18}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_24}]},1).to({state:[{t:this.instance_25}]},1).to({state:[{t:this.instance_26}]},1).to({state:[{t:this.instance_27}]},1).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_33}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_38}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_41}]},1).to({state:[{t:this.instance_42}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_44}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_46}]},1).to({state:[{t:this.instance_47}]},1).to({state:[{t:this.instance_48}]},1).to({state:[{t:this.instance_49}]},1).to({state:[{t:this.instance_50}]},1).to({state:[{t:this.instance_51}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_53}]},1).to({state:[{t:this.instance_54}]},1).to({state:[{t:this.instance_55}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_57}]},1).to({state:[{t:this.instance_58}]},1).to({state:[{t:this.instance_59}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_61}]},1).to({state:[{t:this.instance_62}]},1).to({state:[{t:this.instance_63}]},1).to({state:[{t:this.instance_64}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_68}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_72}]},1).to({state:[{t:this.instance_73}]},1).to({state:[{t:this.instance_74}]},1).to({state:[{t:this.instance_75}]},1).to({state:[{t:this.instance_76}]},1).to({state:[{t:this.instance_77}]},1).to({state:[{t:this.instance_78}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_80}]},1).to({state:[{t:this.instance_81}]},1).to({state:[{t:this.instance_82}]},1).to({state:[{t:this.instance_83}]},1).to({state:[{t:this.instance_84}]},1).to({state:[{t:this.instance_85}]},1).to({state:[{t:this.instance_86}]},1).to({state:[{t:this.instance_87}]},1).to({state:[{t:this.instance_88}]},1).to({state:[{t:this.instance_89}]},1).to({state:[{t:this.instance_90}]},1).to({state:[{t:this.instance_91}]},1).to({state:[{t:this.instance_92}]},1).to({state:[{t:this.instance_93}]},1).to({state:[{t:this.instance_94}]},1).to({state:[{t:this.instance_95}]},1).to({state:[{t:this.instance_96}]},1).to({state:[{t:this.instance_97}]},1).to({state:[{t:this.instance_98}]},1).to({state:[{t:this.instance_99}]},1).to({state:[{t:this.instance_100}]},1).to({state:[{t:this.instance_101}]},1).to({state:[{t:this.instance_102}]},1).to({state:[{t:this.instance_103}]},1).to({state:[{t:this.instance_104}]},1).to({state:[{t:this.instance_105}]},1).to({state:[{t:this.instance_105}]},1).to({state:[{t:this.instance_105}]},1).to({state:[{t:this.instance_105}]},1).to({state:[{t:this.instance_105}]},1).to({state:[{t:this.instance_105}]},1).to({state:[{t:this.instance_106}]},1).to({state:[{t:this.instance_107}]},1).to({state:[{t:this.instance_108}]},1).to({state:[{t:this.instance_109}]},1).to({state:[{t:this.instance_110}]},1).to({state:[{t:this.instance_111}]},1).to({state:[{t:this.instance_112}]},1).to({state:[{t:this.instance_113}]},1).to({state:[{t:this.instance_114}]},1).to({state:[{t:this.instance_115}]},1).to({state:[{t:this.instance_116}]},1).to({state:[{t:this.instance_117}]},1).to({state:[{t:this.instance_118}]},1).to({state:[{t:this.instance_119}]},1).to({state:[{t:this.instance_120}]},1).to({state:[{t:this.instance_121}]},1).to({state:[{t:this.instance_122}]},1).to({state:[{t:this.instance_123}]},1).to({state:[{t:this.instance_124}]},1).to({state:[{t:this.instance_125}]},1).to({state:[]},1).wait(14));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(14).to({_off:true},1).wait(179));
	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(39).to({_off:false},0).wait(1).to({y:328.6},0).wait(1).to({y:328.3},0).wait(1).to({y:327.95},0).wait(1).to({y:327.65},0).wait(1).to({y:327.35},0).wait(1).to({y:327.05},0).wait(1).to({y:326.75},0).wait(1).to({y:326.45},0).wait(1).to({y:326.1},0).wait(1).to({y:325.8},0).wait(1).to({y:325.5},0).wait(1).to({y:325.2},0).wait(1).to({y:324.9},0).wait(1).to({y:324.6},0).wait(1).to({y:324.25},0).wait(1).to({y:323.95},0).wait(1).to({y:323.65},0).to({_off:true},1).wait(137));
	this.timeline.addTween(cjs.Tween.get(this.instance_60).wait(79).to({_off:false},0).wait(1).to({y:280.75},0).wait(1).to({y:281.1},0).wait(1).to({y:281.4},0).wait(1).to({y:281.7},0).wait(1).to({y:282.05},0).wait(1).to({y:282.35},0).wait(1).to({y:282.65},0).wait(1).to({y:283},0).wait(1).to({y:283.3},0).wait(1).to({y:283.65},0).wait(1).to({y:283.95},0).wait(1).to({y:284.25},0).wait(1).to({y:284.6},0).wait(1).to({y:284.9},0).wait(1).to({y:285.2},0).wait(1).to({y:285.55},0).to({_off:true},1).wait(98));
	this.timeline.addTween(cjs.Tween.get(this.instance_79).wait(114).to({_off:false},0).wait(14).to({_off:true},1).wait(65));
	this.timeline.addTween(cjs.Tween.get(this.instance_105).wait(154).to({_off:false},0).wait(5).to({_off:true},1).wait(34));

	// Слой_2
	this.instance_126 = new lib.CachedBmp_205();
	this.instance_126.setTransform(446.6,34.35,0.5,0.5);

	this.instance_127 = new lib.CachedBmp_206();
	this.instance_127.setTransform(446.75,33.95,0.5,0.5);

	this.instance_128 = new lib.CachedBmp_207();
	this.instance_128.setTransform(446.9,33.55,0.5,0.5);

	this.instance_129 = new lib.CachedBmp_208();
	this.instance_129.setTransform(447.1,33.15,0.5,0.5);

	this.instance_130 = new lib.CachedBmp_209();
	this.instance_130.setTransform(447.25,32.75,0.5,0.5);

	this.instance_131 = new lib.CachedBmp_210();
	this.instance_131.setTransform(447.4,32.3,0.5,0.5);

	this.instance_132 = new lib.CachedBmp_211();
	this.instance_132.setTransform(447.55,31.9,0.5,0.5);

	this.instance_133 = new lib.CachedBmp_212();
	this.instance_133.setTransform(447.7,31.5,0.5,0.5);

	this.instance_134 = new lib.CachedBmp_213();
	this.instance_134.setTransform(447.9,31.1,0.5,0.5);

	this.instance_135 = new lib.CachedBmp_214();
	this.instance_135.setTransform(448.05,30.7,0.5,0.5);

	this.instance_136 = new lib.CachedBmp_215();
	this.instance_136.setTransform(448.2,30.3,0.5,0.5);

	this.instance_137 = new lib.CachedBmp_216();
	this.instance_137.setTransform(448.35,29.9,0.5,0.5);

	this.instance_138 = new lib.CachedBmp_217();
	this.instance_138.setTransform(448.5,29.5,0.5,0.5);

	this.instance_139 = new lib.CachedBmp_218();
	this.instance_139.setTransform(448.7,29.05,0.5,0.5);

	this.instance_140 = new lib.CachedBmp_219();
	this.instance_140.setTransform(448.85,28.65,0.5,0.5);

	this.instance_141 = new lib.CachedBmp_220();
	this.instance_141.setTransform(449,28.25,0.5,0.5);

	this.instance_142 = new lib.CachedBmp_221();
	this.instance_142.setTransform(449.15,27.85,0.5,0.5);

	this.instance_143 = new lib.CachedBmp_222();
	this.instance_143.setTransform(449.3,27.45,0.5,0.5);

	this.instance_144 = new lib.CachedBmp_223();
	this.instance_144.setTransform(449.5,27.05,0.5,0.5);

	this.instance_145 = new lib.CachedBmp_224();
	this.instance_145.setTransform(449.65,26.65,0.5,0.5);

	this.instance_146 = new lib.CachedBmp_225();
	this.instance_146.setTransform(449.8,26.25,0.5,0.5);

	this.instance_147 = new lib.CachedBmp_226();
	this.instance_147.setTransform(449.95,25.8,0.5,0.5);

	this.instance_148 = new lib.CachedBmp_227();
	this.instance_148.setTransform(450.1,25.4,0.5,0.5);

	this.instance_149 = new lib.CachedBmp_228();
	this.instance_149.setTransform(450.3,25,0.5,0.5);

	this.instance_150 = new lib.CachedBmp_229();
	this.instance_150.setTransform(450.45,24.6,0.5,0.5);

	this.instance_151 = new lib.CachedBmp_247();
	this.instance_151.setTransform(450.6,24.2,0.5,0.5);

	this.instance_152 = new lib.CachedBmp_231();
	this.instance_152.setTransform(450.6,24.2,0.5,0.5);

	this.instance_153 = new lib.CachedBmp_232();
	this.instance_153.setTransform(450.6,24.2,0.5,0.5);

	this.instance_154 = new lib.CachedBmp_233();
	this.instance_154.setTransform(450.6,24.2,0.5,0.5);

	this.instance_155 = new lib.CachedBmp_234();
	this.instance_155.setTransform(450.6,24.2,0.5,0.5);

	this.instance_156 = new lib.CachedBmp_235();
	this.instance_156.setTransform(450.6,24.2,0.5,0.5);

	this.instance_157 = new lib.CachedBmp_236();
	this.instance_157.setTransform(450.6,24.2,0.5,0.5);

	this.instance_158 = new lib.CachedBmp_237();
	this.instance_158.setTransform(450.6,24.2,0.5,0.5);

	this.instance_159 = new lib.CachedBmp_238();
	this.instance_159.setTransform(450.6,24.2,0.5,0.5);

	this.instance_160 = new lib.CachedBmp_239();
	this.instance_160.setTransform(450.6,24.2,0.5,0.5);

	this.instance_161 = new lib.CachedBmp_240();
	this.instance_161.setTransform(450.6,24.2,0.5,0.5);

	this.instance_162 = new lib.CachedBmp_241();
	this.instance_162.setTransform(450.6,24.2,0.5,0.5);

	this.instance_163 = new lib.CachedBmp_242();
	this.instance_163.setTransform(450.6,24.2,0.5,0.5);

	this.instance_164 = new lib.CachedBmp_243();
	this.instance_164.setTransform(450.6,24.2,0.5,0.5);

	this.instance_165 = new lib.CachedBmp_244();
	this.instance_165.setTransform(450.6,24.2,0.5,0.5);

	this.instance_166 = new lib.CachedBmp_245();
	this.instance_166.setTransform(450.6,24.2,0.5,0.5);

	this.instance_167 = new lib.CachedBmp_246();
	this.instance_167.setTransform(450.6,24.2,0.5,0.5);

	this.instance_168 = new lib.CachedBmp_248();
	this.instance_168.setTransform(450,24.95,0.5,0.5);

	this.instance_169 = new lib.CachedBmp_249();
	this.instance_169.setTransform(449.4,25.75,0.5,0.5);

	this.instance_170 = new lib.CachedBmp_250();
	this.instance_170.setTransform(448.8,26.5,0.5,0.5);

	this.instance_171 = new lib.CachedBmp_251();
	this.instance_171.setTransform(448.2,27.25,0.5,0.5);

	this.instance_172 = new lib.CachedBmp_252();
	this.instance_172.setTransform(447.6,28,0.5,0.5);

	this.instance_173 = new lib.CachedBmp_253();
	this.instance_173.setTransform(446.75,28.75,0.5,0.5);

	this.instance_174 = new lib.CachedBmp_254();
	this.instance_174.setTransform(445.85,29.5,0.5,0.5);

	this.instance_175 = new lib.CachedBmp_255();
	this.instance_175.setTransform(444.95,30.25,0.5,0.5);

	this.instance_176 = new lib.CachedBmp_256();
	this.instance_176.setTransform(444.05,31.05,0.5,0.5);

	this.instance_177 = new lib.CachedBmp_257();
	this.instance_177.setTransform(443.15,31.8,0.5,0.5);

	this.instance_178 = new lib.CachedBmp_258();
	this.instance_178.setTransform(442.25,32.55,0.5,0.5);

	this.instance_179 = new lib.CachedBmp_259();
	this.instance_179.setTransform(441.4,33.3,0.5,0.5);

	this.instance_180 = new lib.CachedBmp_260();
	this.instance_180.setTransform(440.5,34.05,0.5,0.5);

	this.instance_181 = new lib.CachedBmp_261();
	this.instance_181.setTransform(439.6,34.85,0.5,0.5);

	this.instance_182 = new lib.CachedBmp_262();
	this.instance_182.setTransform(438.7,35.6,0.5,0.5);

	this.instance_183 = new lib.CachedBmp_263();
	this.instance_183.setTransform(437.8,36.35,0.5,0.5);

	this.instance_184 = new lib.CachedBmp_264();
	this.instance_184.setTransform(436.9,37.1,0.5,0.5);

	this.instance_185 = new lib.CachedBmp_265();
	this.instance_185.setTransform(436,37.85,0.5,0.5);

	this.instance_186 = new lib.CachedBmp_266();
	this.instance_186.setTransform(435.1,38.6,0.5,0.5);

	this.instance_187 = new lib.CachedBmp_267();
	this.instance_187.setTransform(434.25,39.35,0.5,0.5);

	this.instance_188 = new lib.CachedBmp_268();
	this.instance_188.setTransform(433.35,40.15,0.5,0.5);

	this.instance_189 = new lib.CachedBmp_269();
	this.instance_189.setTransform(432.45,40.9,0.5,0.5);

	this.instance_190 = new lib.CachedBmp_287();
	this.instance_190.setTransform(431.55,41.65,0.5,0.5);
	this.instance_190._off = true;

	this.instance_191 = new lib.CachedBmp_287копия();
	this.instance_191.setTransform(431.55,41.65,0.5,0.5);

	this.instance_192 = new lib.CachedBmp_288();
	this.instance_192.setTransform(438.6,41.5,0.5,0.5);

	this.instance_193 = new lib.CachedBmp_289();
	this.instance_193.setTransform(445.7,41.35,0.5,0.5);

	this.instance_194 = new lib.CachedBmp_290();
	this.instance_194.setTransform(452.75,41.2,0.5,0.5);

	this.instance_195 = new lib.CachedBmp_291();
	this.instance_195.setTransform(459.8,41.05,0.5,0.5);

	this.instance_196 = new lib.CachedBmp_292();
	this.instance_196.setTransform(466.85,40.9,0.5,0.5);

	this.instance_197 = new lib.CachedBmp_293();
	this.instance_197.setTransform(471.15,40.75,0.5,0.5);

	this.instance_198 = new lib.CachedBmp_294();
	this.instance_198.setTransform(467.5,40.6,0.5,0.5);

	this.instance_199 = new lib.CachedBmp_295();
	this.instance_199.setTransform(463.85,40.45,0.5,0.5);

	this.instance_200 = new lib.CachedBmp_296();
	this.instance_200.setTransform(460.25,40.35,0.5,0.5);

	this.instance_201 = new lib.CachedBmp_297();
	this.instance_201.setTransform(456.6,40.2,0.5,0.5);

	this.instance_202 = new lib.CachedBmp_298();
	this.instance_202.setTransform(452.95,40.05,0.5,0.5);

	this.instance_203 = new lib.CachedBmp_299();
	this.instance_203.setTransform(449.3,39.9,0.5,0.5);

	this.instance_204 = new lib.CachedBmp_300();
	this.instance_204.setTransform(445.65,39.75,0.5,0.5);

	this.instance_205 = new lib.CachedBmp_301();
	this.instance_205.setTransform(442,39.6,0.5,0.5);

	this.instance_206 = new lib.CachedBmp_302();
	this.instance_206.setTransform(438.35,39.45,0.5,0.5);

	this.instance_207 = new lib.CachedBmp_303();
	this.instance_207.setTransform(434.7,39.3,0.5,0.5);

	this.instance_208 = new lib.CachedBmp_304();
	this.instance_208.setTransform(431.05,39.15,0.5,0.5);

	this.instance_209 = new lib.CachedBmp_509();
	this.instance_209.setTransform(427.4,39,0.5,0.5);
	this.instance_209._off = true;

	this.instance_210 = new lib.CachedBmp_510();
	this.instance_210.setTransform(428.3,39.15,0.5,0.5);

	this.instance_211 = new lib.CachedBmp_511();
	this.instance_211.setTransform(429.2,39.25,0.5,0.5);

	this.instance_212 = new lib.CachedBmp_512();
	this.instance_212.setTransform(430.1,39.4,0.5,0.5);

	this.instance_213 = new lib.CachedBmp_513();
	this.instance_213.setTransform(430.95,39.55,0.5,0.5);

	this.instance_214 = new lib.CachedBmp_514();
	this.instance_214.setTransform(431.85,39.65,0.5,0.5);

	this.instance_215 = new lib.CachedBmp_515();
	this.instance_215.setTransform(432.75,39.8,0.5,0.5);

	this.instance_216 = new lib.CachedBmp_516();
	this.instance_216.setTransform(433.65,39.9,0.5,0.5);

	this.instance_217 = new lib.CachedBmp_517();
	this.instance_217.setTransform(434.55,40.05,0.5,0.5);

	this.instance_218 = new lib.CachedBmp_518();
	this.instance_218.setTransform(435.45,40.2,0.5,0.5);

	this.instance_219 = new lib.CachedBmp_519();
	this.instance_219.setTransform(436.3,40.3,0.5,0.5);

	this.instance_220 = new lib.CachedBmp_520();
	this.instance_220.setTransform(437.2,40.45,0.5,0.5);

	this.instance_221 = new lib.CachedBmp_521();
	this.instance_221.setTransform(438.1,40.6,0.5,0.5);

	this.instance_222 = new lib.CachedBmp_522();
	this.instance_222.setTransform(439,40.7,0.5,0.5);

	this.instance_223 = new lib.CachedBmp_523();
	this.instance_223.setTransform(439.9,40.85,0.5,0.5);

	this.instance_224 = new lib.CachedBmp_524();
	this.instance_224.setTransform(440.8,41,0.5,0.5);

	this.instance_225 = new lib.CachedBmp_525();
	this.instance_225.setTransform(441.65,41.1,0.5,0.5);

	this.instance_226 = new lib.CachedBmp_526();
	this.instance_226.setTransform(442.55,41.25,0.5,0.5);

	this.instance_227 = new lib.CachedBmp_527();
	this.instance_227.setTransform(443.45,41.4,0.5,0.5);

	this.instance_228 = new lib.CachedBmp_528();
	this.instance_228.setTransform(444.35,41.5,0.5,0.5);

	this.instance_229 = new lib.CachedBmp_529();
	this.instance_229.setTransform(445.25,41.65,0.5,0.5);

	this.instance_230 = new lib.CachedBmp_530();
	this.instance_230.setTransform(446.15,41.75,0.5,0.5);

	this.instance_231 = new lib.CachedBmp_531();
	this.instance_231.setTransform(447,41.9,0.5,0.5);

	this.instance_232 = new lib.CachedBmp_532();
	this.instance_232.setTransform(447.9,42.05,0.5,0.5);

	this.instance_233 = new lib.CachedBmp_533();
	this.instance_233.setTransform(448.8,42.15,0.5,0.5);

	this.instance_234 = new lib.CachedBmp_345();
	this.instance_234.setTransform(449.7,42.3,0.5,0.5);

	this.instance_235 = new lib.CachedBmp_347();
	this.instance_235.setTransform(449.7,42.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_126}]}).to({state:[{t:this.instance_126}]},1).to({state:[{t:this.instance_126}]},1).to({state:[{t:this.instance_126}]},1).to({state:[{t:this.instance_126}]},1).to({state:[{t:this.instance_126}]},1).to({state:[{t:this.instance_126}]},1).to({state:[{t:this.instance_126}]},1).to({state:[{t:this.instance_126}]},1).to({state:[{t:this.instance_126}]},1).to({state:[{t:this.instance_126}]},1).to({state:[{t:this.instance_126}]},1).to({state:[{t:this.instance_126}]},1).to({state:[{t:this.instance_126}]},1).to({state:[{t:this.instance_126}]},1).to({state:[{t:this.instance_127}]},1).to({state:[{t:this.instance_128}]},1).to({state:[{t:this.instance_129}]},1).to({state:[{t:this.instance_130}]},1).to({state:[{t:this.instance_131}]},1).to({state:[{t:this.instance_132}]},1).to({state:[{t:this.instance_133}]},1).to({state:[{t:this.instance_134}]},1).to({state:[{t:this.instance_135}]},1).to({state:[{t:this.instance_136}]},1).to({state:[{t:this.instance_137}]},1).to({state:[{t:this.instance_138}]},1).to({state:[{t:this.instance_139}]},1).to({state:[{t:this.instance_140}]},1).to({state:[{t:this.instance_141}]},1).to({state:[{t:this.instance_142}]},1).to({state:[{t:this.instance_143}]},1).to({state:[{t:this.instance_144}]},1).to({state:[{t:this.instance_145}]},1).to({state:[{t:this.instance_146}]},1).to({state:[{t:this.instance_147}]},1).to({state:[{t:this.instance_148}]},1).to({state:[{t:this.instance_149}]},1).to({state:[{t:this.instance_150}]},1).to({state:[{t:this.instance_151}]},1).to({state:[{t:this.instance_152}]},1).to({state:[{t:this.instance_153}]},1).to({state:[{t:this.instance_154}]},1).to({state:[{t:this.instance_155}]},1).to({state:[{t:this.instance_156}]},1).to({state:[{t:this.instance_157}]},1).to({state:[{t:this.instance_158}]},1).to({state:[{t:this.instance_159}]},1).to({state:[{t:this.instance_160}]},1).to({state:[{t:this.instance_161}]},1).to({state:[{t:this.instance_162}]},1).to({state:[{t:this.instance_163}]},1).to({state:[{t:this.instance_164}]},1).to({state:[{t:this.instance_165}]},1).to({state:[{t:this.instance_166}]},1).to({state:[{t:this.instance_167}]},1).to({state:[{t:this.instance_151}]},1).to({state:[{t:this.instance_168}]},1).to({state:[{t:this.instance_169}]},1).to({state:[{t:this.instance_170}]},1).to({state:[{t:this.instance_171}]},1).to({state:[{t:this.instance_172}]},1).to({state:[{t:this.instance_173}]},1).to({state:[{t:this.instance_174}]},1).to({state:[{t:this.instance_175}]},1).to({state:[{t:this.instance_176}]},1).to({state:[{t:this.instance_177}]},1).to({state:[{t:this.instance_178}]},1).to({state:[{t:this.instance_179}]},1).to({state:[{t:this.instance_180}]},1).to({state:[{t:this.instance_181}]},1).to({state:[{t:this.instance_182}]},1).to({state:[{t:this.instance_183}]},1).to({state:[{t:this.instance_184}]},1).to({state:[{t:this.instance_185}]},1).to({state:[{t:this.instance_186}]},1).to({state:[{t:this.instance_187}]},1).to({state:[{t:this.instance_188}]},1).to({state:[{t:this.instance_189}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_191}]},1).to({state:[{t:this.instance_192}]},1).to({state:[{t:this.instance_193}]},1).to({state:[{t:this.instance_194}]},1).to({state:[{t:this.instance_195}]},1).to({state:[{t:this.instance_196}]},1).to({state:[{t:this.instance_197}]},1).to({state:[{t:this.instance_198}]},1).to({state:[{t:this.instance_199}]},1).to({state:[{t:this.instance_200}]},1).to({state:[{t:this.instance_201}]},1).to({state:[{t:this.instance_202}]},1).to({state:[{t:this.instance_203}]},1).to({state:[{t:this.instance_204}]},1).to({state:[{t:this.instance_205}]},1).to({state:[{t:this.instance_206}]},1).to({state:[{t:this.instance_207}]},1).to({state:[{t:this.instance_208}]},1).to({state:[{t:this.instance_209}]},1).to({state:[{t:this.instance_209}]},1).to({state:[{t:this.instance_209}]},1).to({state:[{t:this.instance_209}]},1).to({state:[{t:this.instance_209}]},1).to({state:[{t:this.instance_209}]},1).to({state:[{t:this.instance_209}]},1).to({state:[{t:this.instance_209}]},1).to({state:[{t:this.instance_209}]},1).to({state:[{t:this.instance_209}]},1).to({state:[{t:this.instance_209}]},1).to({state:[{t:this.instance_209}]},1).to({state:[{t:this.instance_209}]},1).to({state:[{t:this.instance_209}]},1).to({state:[{t:this.instance_209}]},1).to({state:[{t:this.instance_209}]},1).to({state:[{t:this.instance_210}]},1).to({state:[{t:this.instance_211}]},1).to({state:[{t:this.instance_212}]},1).to({state:[{t:this.instance_213}]},1).to({state:[{t:this.instance_214}]},1).to({state:[{t:this.instance_215}]},1).to({state:[{t:this.instance_216}]},1).to({state:[{t:this.instance_217}]},1).to({state:[{t:this.instance_218}]},1).to({state:[{t:this.instance_219}]},1).to({state:[{t:this.instance_220}]},1).to({state:[{t:this.instance_221}]},1).to({state:[{t:this.instance_222}]},1).to({state:[{t:this.instance_223}]},1).to({state:[{t:this.instance_224}]},1).to({state:[{t:this.instance_225}]},1).to({state:[{t:this.instance_226}]},1).to({state:[{t:this.instance_227}]},1).to({state:[{t:this.instance_228}]},1).to({state:[{t:this.instance_229}]},1).to({state:[{t:this.instance_230}]},1).to({state:[{t:this.instance_231}]},1).to({state:[{t:this.instance_232}]},1).to({state:[{t:this.instance_233}]},1).to({state:[{t:this.instance_234}]},1).to({state:[{t:this.instance_235}]},6).to({state:[{t:this.instance_235}]},10).to({state:[]},1).wait(23));
	this.timeline.addTween(cjs.Tween.get(this.instance_126).wait(14).to({_off:true},1).wait(179));
	this.timeline.addTween(cjs.Tween.get(this.instance_190).wait(79).to({_off:false},0).wait(16).to({_off:true},1).wait(98));
	this.timeline.addTween(cjs.Tween.get(this.instance_209).wait(114).to({_off:false},0).wait(15).to({_off:true},1).wait(64));

	// Слой_1
	this.instance_236 = new lib.CachedBmp_362();
	this.instance_236.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_237 = new lib.CachedBmp_363();
	this.instance_237.setTransform(383.25,395.15,0.5,0.5);

	this.instance_238 = new lib.CachedBmp_364();
	this.instance_238.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_239 = new lib.CachedBmp_365();
	this.instance_239.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_240 = new lib.CachedBmp_366();
	this.instance_240.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_241 = new lib.CachedBmp_367();
	this.instance_241.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_242 = new lib.CachedBmp_368();
	this.instance_242.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_243 = new lib.CachedBmp_369();
	this.instance_243.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_244 = new lib.CachedBmp_370();
	this.instance_244.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_245 = new lib.CachedBmp_371();
	this.instance_245.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_246 = new lib.CachedBmp_372();
	this.instance_246.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_247 = new lib.CachedBmp_373();
	this.instance_247.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_248 = new lib.CachedBmp_374();
	this.instance_248.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_249 = new lib.CachedBmp_375();
	this.instance_249.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_250 = new lib.CachedBmp_376();
	this.instance_250.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_251 = new lib.CachedBmp_377();
	this.instance_251.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_252 = new lib.CachedBmp_378();
	this.instance_252.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_253 = new lib.CachedBmp_379();
	this.instance_253.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_254 = new lib.CachedBmp_380();
	this.instance_254.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_255 = new lib.CachedBmp_381();
	this.instance_255.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_256 = new lib.CachedBmp_382();
	this.instance_256.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_257 = new lib.CachedBmp_383();
	this.instance_257.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_258 = new lib.CachedBmp_384();
	this.instance_258.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_259 = new lib.CachedBmp_385();
	this.instance_259.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_260 = new lib.CachedBmp_386();
	this.instance_260.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_261 = new lib.CachedBmp_387();
	this.instance_261.setTransform(-25.25,-43.7,0.5,0.5);

	this.instance_262 = new lib.CachedBmp_405();
	this.instance_262.setTransform(-25.25,-43.7,0.5,0.5);
	this.instance_262._off = true;

	this.instance_263 = new lib.CachedBmp_406();
	this.instance_263.setTransform(-25.9,-45.75,0.5,0.5);

	this.instance_264 = new lib.CachedBmp_407();
	this.instance_264.setTransform(-26.5,-47.75,0.5,0.5);

	this.instance_265 = new lib.CachedBmp_408();
	this.instance_265.setTransform(-27.15,-49.8,0.5,0.5);

	this.instance_266 = new lib.CachedBmp_409();
	this.instance_266.setTransform(-27.75,-51.85,0.5,0.5);

	this.instance_267 = new lib.CachedBmp_410();
	this.instance_267.setTransform(-28.4,-53.85,0.5,0.5);

	this.instance_268 = new lib.CachedBmp_411();
	this.instance_268.setTransform(-29,-55.9,0.5,0.5);

	this.instance_269 = new lib.CachedBmp_412();
	this.instance_269.setTransform(-29.65,-57.95,0.5,0.5);

	this.instance_270 = new lib.CachedBmp_413();
	this.instance_270.setTransform(-30.3,-59.95,0.5,0.5);

	this.instance_271 = new lib.CachedBmp_414();
	this.instance_271.setTransform(-30.9,-62,0.5,0.5);

	this.instance_272 = new lib.CachedBmp_415();
	this.instance_272.setTransform(-31.55,-64.05,0.5,0.5);

	this.instance_273 = new lib.CachedBmp_416();
	this.instance_273.setTransform(-32.15,-66.05,0.5,0.5);

	this.instance_274 = new lib.CachedBmp_417();
	this.instance_274.setTransform(-32.8,-68.1,0.5,0.5);

	this.instance_275 = new lib.CachedBmp_418();
	this.instance_275.setTransform(-33.4,-70.1,0.5,0.5);

	this.instance_276 = new lib.CachedBmp_419();
	this.instance_276.setTransform(-34.05,-72.15,0.5,0.5);

	this.instance_277 = new lib.CachedBmp_420();
	this.instance_277.setTransform(-34.65,-74.2,0.5,0.5);

	this.instance_278 = new lib.CachedBmp_421();
	this.instance_278.setTransform(-35.3,-76.2,0.5,0.5);

	this.instance_279 = new lib.CachedBmp_422();
	this.instance_279.setTransform(-35.95,-78.25,0.5,0.5);

	this.instance_280 = new lib.CachedBmp_423();
	this.instance_280.setTransform(-36.55,-80.3,0.5,0.5);

	this.instance_281 = new lib.CachedBmp_424();
	this.instance_281.setTransform(-37.2,-82.3,0.5,0.5);

	this.instance_282 = new lib.CachedBmp_425();
	this.instance_282.setTransform(-37.8,-84.35,0.5,0.5);

	this.instance_283 = new lib.CachedBmp_426();
	this.instance_283.setTransform(-38.45,-86.4,0.5,0.5);

	this.instance_284 = new lib.CachedBmp_427();
	this.instance_284.setTransform(-39.05,-88.4,0.5,0.5);

	this.instance_285 = new lib.CachedBmp_445();
	this.instance_285.setTransform(-39.7,-90.45,0.5,0.5);

	this.instance_286 = new lib.CachedBmp_444();
	this.instance_286.setTransform(-39.7,-90.45,0.5,0.5);
	this.instance_286._off = true;

	this.instance_287 = new lib.CachedBmp_446();
	this.instance_287.setTransform(-40.75,-88.2,0.5,0.5);

	this.instance_288 = new lib.CachedBmp_447();
	this.instance_288.setTransform(-41.85,-86,0.5,0.5);

	this.instance_289 = new lib.CachedBmp_448();
	this.instance_289.setTransform(-42.9,-83.75,0.5,0.5);

	this.instance_290 = new lib.CachedBmp_449();
	this.instance_290.setTransform(-43.95,-81.55,0.5,0.5);

	this.instance_291 = new lib.CachedBmp_450();
	this.instance_291.setTransform(-45.05,-79.35,0.5,0.5);

	this.instance_292 = new lib.CachedBmp_451();
	this.instance_292.setTransform(-46.1,-77.1,0.5,0.5);

	this.instance_293 = new lib.CachedBmp_452();
	this.instance_293.setTransform(-47.15,-74.9,0.5,0.5);

	this.instance_294 = new lib.CachedBmp_453();
	this.instance_294.setTransform(-48.25,-72.65,0.5,0.5);

	this.instance_295 = new lib.CachedBmp_454();
	this.instance_295.setTransform(-49.3,-70.4,0.5,0.5);

	this.instance_296 = new lib.CachedBmp_455();
	this.instance_296.setTransform(-50.35,-68.2,0.5,0.5);

	this.instance_297 = new lib.CachedBmp_456();
	this.instance_297.setTransform(-51.45,-65.95,0.5,0.5);

	this.instance_298 = new lib.CachedBmp_457();
	this.instance_298.setTransform(-52.5,-63.75,0.5,0.5);

	this.instance_299 = new lib.CachedBmp_458();
	this.instance_299.setTransform(-53.55,-61.5,0.5,0.5);

	this.instance_300 = new lib.CachedBmp_459();
	this.instance_300.setTransform(-54.65,-59.3,0.5,0.5);

	this.instance_301 = new lib.CachedBmp_460();
	this.instance_301.setTransform(-55.7,-57.1,0.5,0.5);

	this.instance_302 = new lib.CachedBmp_461();
	this.instance_302.setTransform(-56.75,-54.85,0.5,0.5);

	this.instance_303 = new lib.CachedBmp_462();
	this.instance_303.setTransform(-57.85,-52.65,0.5,0.5);

	this.instance_304 = new lib.CachedBmp_478();
	this.instance_304.setTransform(-58.4,-49.9,0.5,0.5);
	this.instance_304._off = true;

	this.instance_305 = new lib.CachedBmp_479();
	this.instance_305.setTransform(-58.1,-53.2,0.5,0.5);

	this.instance_306 = new lib.CachedBmp_480();
	this.instance_306.setTransform(-57.3,-56,0.5,0.5);

	this.instance_307 = new lib.CachedBmp_481();
	this.instance_307.setTransform(-56.5,-58.8,0.5,0.5);

	this.instance_308 = new lib.CachedBmp_482();
	this.instance_308.setTransform(-55.7,-61.55,0.5,0.5);

	this.instance_309 = new lib.CachedBmp_483();
	this.instance_309.setTransform(-54.95,-64.35,0.5,0.5);

	this.instance_310 = new lib.CachedBmp_484();
	this.instance_310.setTransform(-54.15,-67.15,0.5,0.5);

	this.instance_311 = new lib.CachedBmp_485();
	this.instance_311.setTransform(-53.35,-69.95,0.5,0.5);

	this.instance_312 = new lib.CachedBmp_486();
	this.instance_312.setTransform(-52.55,-72.75,0.5,0.5);

	this.instance_313 = new lib.CachedBmp_487();
	this.instance_313.setTransform(-51.75,-75.55,0.5,0.5);

	this.instance_314 = new lib.CachedBmp_488();
	this.instance_314.setTransform(-50.95,-78.3,0.5,0.5);

	this.instance_315 = new lib.CachedBmp_489();
	this.instance_315.setTransform(-50.15,-81.1,0.5,0.5);

	this.instance_316 = new lib.CachedBmp_490();
	this.instance_316.setTransform(-49.35,-83.9,0.5,0.5);

	this.instance_317 = new lib.CachedBmp_491();
	this.instance_317.setTransform(-48.6,-86.7,0.5,0.5);

	this.instance_318 = new lib.CachedBmp_492();
	this.instance_318.setTransform(-47.8,-89.5,0.5,0.5);

	this.instance_319 = new lib.CachedBmp_493();
	this.instance_319.setTransform(-47,-92.3,0.5,0.5);

	this.instance_320 = new lib.CachedBmp_494();
	this.instance_320.setTransform(-46.2,-95.05,0.5,0.5);

	this.instance_321 = new lib.CachedBmp_495();
	this.instance_321.setTransform(-45.4,-97.85,0.5,0.5);

	this.instance_322 = new lib.CachedBmp_496();
	this.instance_322.setTransform(-44.6,-100.65,0.5,0.5);

	this.instance_323 = new lib.CachedBmp_497();
	this.instance_323.setTransform(-43.8,-103.45,0.5,0.5);

	this.instance_324 = new lib.CachedBmp_498();
	this.instance_324.setTransform(-43,-106.25,0.5,0.5);

	this.instance_325 = new lib.CachedBmp_499();
	this.instance_325.setTransform(-42.25,-109.05,0.5,0.5);

	this.instance_326 = new lib.CachedBmp_500();
	this.instance_326.setTransform(-41.45,-111.8,0.5,0.5);

	this.instance_327 = new lib.CachedBmp_501();
	this.instance_327.setTransform(-40.65,-114.6,0.5,0.5);

	this.instance_328 = new lib.CachedBmp_502();
	this.instance_328.setTransform(-39.85,-117.4,0.5,0.5);

	this.instance_329 = new lib.CachedBmp_503();
	this.instance_329.setTransform(-39.05,-120.2,0.5,0.5);

	this.instance_330 = new lib.CachedBmp_506();
	this.instance_330.setTransform(-38.55,-119.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_236}]}).to({state:[{t:this.instance_236}]},1).to({state:[{t:this.instance_236}]},1).to({state:[{t:this.instance_236}]},1).to({state:[{t:this.instance_236}]},1).to({state:[{t:this.instance_236}]},1).to({state:[{t:this.instance_236}]},1).to({state:[{t:this.instance_236}]},1).to({state:[{t:this.instance_236}]},1).to({state:[{t:this.instance_236}]},1).to({state:[{t:this.instance_236}]},1).to({state:[{t:this.instance_236}]},1).to({state:[{t:this.instance_236}]},1).to({state:[{t:this.instance_236}]},1).to({state:[{t:this.instance_236},{t:this.instance_237}]},1).to({state:[{t:this.instance_238}]},1).to({state:[{t:this.instance_239}]},1).to({state:[{t:this.instance_240}]},1).to({state:[{t:this.instance_241}]},1).to({state:[{t:this.instance_242}]},1).to({state:[{t:this.instance_243}]},1).to({state:[{t:this.instance_244}]},1).to({state:[{t:this.instance_245}]},1).to({state:[{t:this.instance_246}]},1).to({state:[{t:this.instance_247}]},1).to({state:[{t:this.instance_248}]},1).to({state:[{t:this.instance_249}]},1).to({state:[{t:this.instance_250}]},1).to({state:[{t:this.instance_251}]},1).to({state:[{t:this.instance_252}]},1).to({state:[{t:this.instance_253}]},1).to({state:[{t:this.instance_254}]},1).to({state:[{t:this.instance_255}]},1).to({state:[{t:this.instance_256}]},1).to({state:[{t:this.instance_257}]},1).to({state:[{t:this.instance_258}]},1).to({state:[{t:this.instance_259}]},1).to({state:[{t:this.instance_260}]},1).to({state:[{t:this.instance_261}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_262}]},1).to({state:[{t:this.instance_263}]},1).to({state:[{t:this.instance_264}]},1).to({state:[{t:this.instance_265}]},1).to({state:[{t:this.instance_266}]},1).to({state:[{t:this.instance_267}]},1).to({state:[{t:this.instance_268}]},1).to({state:[{t:this.instance_269}]},1).to({state:[{t:this.instance_270}]},1).to({state:[{t:this.instance_271}]},1).to({state:[{t:this.instance_272}]},1).to({state:[{t:this.instance_273}]},1).to({state:[{t:this.instance_274}]},1).to({state:[{t:this.instance_275}]},1).to({state:[{t:this.instance_276}]},1).to({state:[{t:this.instance_277}]},1).to({state:[{t:this.instance_278}]},1).to({state:[{t:this.instance_279}]},1).to({state:[{t:this.instance_280}]},1).to({state:[{t:this.instance_281}]},1).to({state:[{t:this.instance_282}]},1).to({state:[{t:this.instance_283}]},1).to({state:[{t:this.instance_284}]},1).to({state:[{t:this.instance_285}]},1).to({state:[{t:this.instance_286}]},1).to({state:[{t:this.instance_286}]},1).to({state:[{t:this.instance_286}]},1).to({state:[{t:this.instance_286}]},1).to({state:[{t:this.instance_286}]},1).to({state:[{t:this.instance_286}]},1).to({state:[{t:this.instance_286}]},1).to({state:[{t:this.instance_286}]},1).to({state:[{t:this.instance_286}]},1).to({state:[{t:this.instance_286}]},1).to({state:[{t:this.instance_286}]},1).to({state:[{t:this.instance_286}]},1).to({state:[{t:this.instance_286}]},1).to({state:[{t:this.instance_286}]},1).to({state:[{t:this.instance_286}]},1).to({state:[{t:this.instance_286}]},1).to({state:[{t:this.instance_285}]},1).to({state:[{t:this.instance_287}]},1).to({state:[{t:this.instance_288}]},1).to({state:[{t:this.instance_289}]},1).to({state:[{t:this.instance_290}]},1).to({state:[{t:this.instance_291}]},1).to({state:[{t:this.instance_292}]},1).to({state:[{t:this.instance_293}]},1).to({state:[{t:this.instance_294}]},1).to({state:[{t:this.instance_295}]},1).to({state:[{t:this.instance_296}]},1).to({state:[{t:this.instance_297}]},1).to({state:[{t:this.instance_298}]},1).to({state:[{t:this.instance_299}]},1).to({state:[{t:this.instance_300}]},1).to({state:[{t:this.instance_301}]},1).to({state:[{t:this.instance_302}]},1).to({state:[{t:this.instance_303}]},1).to({state:[{t:this.instance_304}]},1).to({state:[{t:this.instance_304}]},1).to({state:[{t:this.instance_304}]},1).to({state:[{t:this.instance_304}]},1).to({state:[{t:this.instance_304}]},1).to({state:[{t:this.instance_304}]},1).to({state:[{t:this.instance_304}]},1).to({state:[{t:this.instance_304}]},1).to({state:[{t:this.instance_304}]},1).to({state:[{t:this.instance_304}]},1).to({state:[{t:this.instance_304}]},1).to({state:[{t:this.instance_304}]},1).to({state:[{t:this.instance_304}]},1).to({state:[{t:this.instance_304}]},1).to({state:[{t:this.instance_304}]},1).to({state:[{t:this.instance_304}]},1).to({state:[{t:this.instance_305}]},1).to({state:[{t:this.instance_306}]},1).to({state:[{t:this.instance_307}]},1).to({state:[{t:this.instance_308}]},1).to({state:[{t:this.instance_309}]},1).to({state:[{t:this.instance_310}]},1).to({state:[{t:this.instance_311}]},1).to({state:[{t:this.instance_312}]},1).to({state:[{t:this.instance_313}]},1).to({state:[{t:this.instance_314}]},1).to({state:[{t:this.instance_315}]},1).to({state:[{t:this.instance_316}]},1).to({state:[{t:this.instance_317}]},1).to({state:[{t:this.instance_318}]},1).to({state:[{t:this.instance_319}]},1).to({state:[{t:this.instance_320}]},1).to({state:[{t:this.instance_321}]},1).to({state:[{t:this.instance_322}]},1).to({state:[{t:this.instance_323}]},1).to({state:[{t:this.instance_324}]},1).to({state:[{t:this.instance_325}]},1).to({state:[{t:this.instance_326}]},1).to({state:[{t:this.instance_327}]},1).to({state:[{t:this.instance_328}]},1).to({state:[{t:this.instance_329}]},1).to({state:[{t:this.instance_330}]},6).to({state:[{t:this.instance_330}]},10).to({state:[{t:this.instance_330}]},9).to({state:[]},1).wait(14));
	this.timeline.addTween(cjs.Tween.get(this.instance_236).wait(14).to({_off:true},1).wait(179));
	this.timeline.addTween(cjs.Tween.get(this.instance_262).wait(39).to({_off:false},0).wait(17).to({_off:true},1).wait(137));
	this.timeline.addTween(cjs.Tween.get(this.instance_286).wait(80).to({_off:false},0).wait(15).to({_off:true},1).wait(98));
	this.timeline.addTween(cjs.Tween.get(this.instance_304).wait(114).to({_off:false},0).wait(15).to({_off:true},1).wait(64));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-3992.4,0,9972.8,1346.4);
// library properties:
lib.properties = {
	id: '83FE0448892C0140BBF530285C7C1A02',
	width: 651,
	height: 920,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_500.png", id:"CachedBmp_500"},
		{src:"images/CachedBmp_503.png", id:"CachedBmp_503"},
		{src:"images/CachedBmp_502.png", id:"CachedBmp_502"},
		{src:"images/CachedBmp_501.png", id:"CachedBmp_501"},
		{src:"images/CachedBmp_506.png", id:"CachedBmp_506"},
		{src:"images/CachedBmp_508.png", id:"CachedBmp_508"},
		{src:"images/CachedBmp_507.png", id:"CachedBmp_507"},
		{src:"images/CachedBmp_496.png", id:"CachedBmp_496"},
		{src:"images/CachedBmp_495.png", id:"CachedBmp_495"},
		{src:"images/CachedBmp_497.png", id:"CachedBmp_497"},
		{src:"images/CachedBmp_498.png", id:"CachedBmp_498"},
		{src:"images/CachedBmp_499.png", id:"CachedBmp_499"},
		{src:"images/CachedBmp_494.png", id:"CachedBmp_494"},
		{src:"images/CachedBmp_493.png", id:"CachedBmp_493"},
		{src:"images/CachedBmp_489.png", id:"CachedBmp_489"},
		{src:"images/CachedBmp_492.png", id:"CachedBmp_492"},
		{src:"images/CachedBmp_488.png", id:"CachedBmp_488"},
		{src:"images/CachedBmp_491.png", id:"CachedBmp_491"},
		{src:"images/CachedBmp_490.png", id:"CachedBmp_490"},
		{src:"images/CachedBmp_486.png", id:"CachedBmp_486"},
		{src:"images/CachedBmp_487.png", id:"CachedBmp_487"},
		{src:"images/CachedBmp_485.png", id:"CachedBmp_485"},
		{src:"images/CachedBmp_483.png", id:"CachedBmp_483"},
		{src:"images/CachedBmp_484.png", id:"CachedBmp_484"},
		{src:"images/CachedBmp_482.png", id:"CachedBmp_482"},
		{src:"images/CachedBmp_481.png", id:"CachedBmp_481"},
		{src:"images/CachedBmp_480.png", id:"CachedBmp_480"},
		{src:"images/CachedBmp_479.png", id:"CachedBmp_479"},
		{src:"images/CachedBmp_478.png", id:"CachedBmp_478"},
		{src:"images/CachedBmp_462.png", id:"CachedBmp_462"},
		{src:"images/CachedBmp_461.png", id:"CachedBmp_461"},
		{src:"images/CachedBmp_459.png", id:"CachedBmp_459"},
		{src:"images/CachedBmp_460.png", id:"CachedBmp_460"},
		{src:"images/CachedBmp_458.png", id:"CachedBmp_458"},
		{src:"images/CachedBmp_457.png", id:"CachedBmp_457"},
		{src:"images/CachedBmp_456.png", id:"CachedBmp_456"},
		{src:"images/CachedBmp_455.png", id:"CachedBmp_455"},
		{src:"images/CachedBmp_454.png", id:"CachedBmp_454"},
		{src:"images/CachedBmp_453.png", id:"CachedBmp_453"},
		{src:"images/CachedBmp_452.png", id:"CachedBmp_452"},
		{src:"images/CachedBmp_451.png", id:"CachedBmp_451"},
		{src:"images/CachedBmp_450.png", id:"CachedBmp_450"},
		{src:"images/CachedBmp_449.png", id:"CachedBmp_449"},
		{src:"images/CachedBmp_448.png", id:"CachedBmp_448"},
		{src:"images/CachedBmp_447.png", id:"CachedBmp_447"},
		{src:"images/CachedBmp_446.png", id:"CachedBmp_446"},
		{src:"images/CachedBmp_444.png", id:"CachedBmp_444"},
		{src:"images/CachedBmp_445.png", id:"CachedBmp_445"},
		{src:"images/CachedBmp_427.png", id:"CachedBmp_427"},
		{src:"images/CachedBmp_426.png", id:"CachedBmp_426"},
		{src:"images/CachedBmp_425.png", id:"CachedBmp_425"},
		{src:"images/CachedBmp_424.png", id:"CachedBmp_424"},
		{src:"images/CachedBmp_422.png", id:"CachedBmp_422"},
		{src:"images/CachedBmp_421.png", id:"CachedBmp_421"},
		{src:"images/CachedBmp_423.png", id:"CachedBmp_423"},
		{src:"images/CachedBmp_420.png", id:"CachedBmp_420"},
		{src:"images/CachedBmp_419.png", id:"CachedBmp_419"},
		{src:"images/CachedBmp_418.png", id:"CachedBmp_418"},
		{src:"images/CachedBmp_417.png", id:"CachedBmp_417"},
		{src:"images/CachedBmp_414.png", id:"CachedBmp_414"},
		{src:"images/CachedBmp_416.png", id:"CachedBmp_416"},
		{src:"images/CachedBmp_415.png", id:"CachedBmp_415"},
		{src:"images/CachedBmp_413.png", id:"CachedBmp_413"},
		{src:"images/CachedBmp_412.png", id:"CachedBmp_412"},
		{src:"images/CachedBmp_411.png", id:"CachedBmp_411"},
		{src:"images/CachedBmp_407.png", id:"CachedBmp_407"},
		{src:"images/CachedBmp_410.png", id:"CachedBmp_410"},
		{src:"images/CachedBmp_408.png", id:"CachedBmp_408"},
		{src:"images/CachedBmp_409.png", id:"CachedBmp_409"},
		{src:"images/CachedBmp_406.png", id:"CachedBmp_406"},
		{src:"images/CachedBmp_405.png", id:"CachedBmp_405"},
		{src:"images/CachedBmp_387.png", id:"CachedBmp_387"},
		{src:"images/CachedBmp_386.png", id:"CachedBmp_386"},
		{src:"images/CachedBmp_383.png", id:"CachedBmp_383"},
		{src:"images/CachedBmp_384.png", id:"CachedBmp_384"},
		{src:"images/CachedBmp_382.png", id:"CachedBmp_382"},
		{src:"images/CachedBmp_385.png", id:"CachedBmp_385"},
		{src:"images/CachedBmp_381.png", id:"CachedBmp_381"},
		{src:"images/CachedBmp_380.png", id:"CachedBmp_380"},
		{src:"images/CachedBmp_379.png", id:"CachedBmp_379"},
		{src:"images/CachedBmp_376.png", id:"CachedBmp_376"},
		{src:"images/CachedBmp_378.png", id:"CachedBmp_378"},
		{src:"images/CachedBmp_377.png", id:"CachedBmp_377"},
		{src:"images/CachedBmp_375.png", id:"CachedBmp_375"},
		{src:"images/CachedBmp_374.png", id:"CachedBmp_374"},
		{src:"images/CachedBmp_373.png", id:"CachedBmp_373"},
		{src:"images/CachedBmp_372.png", id:"CachedBmp_372"},
		{src:"images/CachedBmp_371.png", id:"CachedBmp_371"},
		{src:"images/CachedBmp_370.png", id:"CachedBmp_370"},
		{src:"images/CachedBmp_368.png", id:"CachedBmp_368"},
		{src:"images/CachedBmp_369.png", id:"CachedBmp_369"},
		{src:"images/CachedBmp_347.png", id:"CachedBmp_347"},
		{src:"images/CachedBmp_363.png", id:"CachedBmp_363"},
		{src:"images/CachedBmp_345.png", id:"CachedBmp_345"},
		{src:"images/CachedBmp_533.png", id:"CachedBmp_533"},
		{src:"images/CachedBmp_532.png", id:"CachedBmp_532"},
		{src:"images/CachedBmp_367.png", id:"CachedBmp_367"},
		{src:"images/CachedBmp_531.png", id:"CachedBmp_531"},
		{src:"images/CachedBmp_529.png", id:"CachedBmp_529"},
		{src:"images/CachedBmp_530.png", id:"CachedBmp_530"},
		{src:"images/CachedBmp_527.png", id:"CachedBmp_527"},
		{src:"images/CachedBmp_526.png", id:"CachedBmp_526"},
		{src:"images/CachedBmp_528.png", id:"CachedBmp_528"},
		{src:"images/CachedBmp_525.png", id:"CachedBmp_525"},
		{src:"images/CachedBmp_524.png", id:"CachedBmp_524"},
		{src:"images/CachedBmp_523.png", id:"CachedBmp_523"},
		{src:"images/CachedBmp_366.png", id:"CachedBmp_366"},
		{src:"images/CachedBmp_521.png", id:"CachedBmp_521"},
		{src:"images/CachedBmp_522.png", id:"CachedBmp_522"},
		{src:"images/CachedBmp_519.png", id:"CachedBmp_519"},
		{src:"images/CachedBmp_520.png", id:"CachedBmp_520"},
		{src:"images/CachedBmp_518.png", id:"CachedBmp_518"},
		{src:"images/CachedBmp_517.png", id:"CachedBmp_517"},
		{src:"images/CachedBmp_516.png", id:"CachedBmp_516"},
		{src:"images/CachedBmp_515.png", id:"CachedBmp_515"},
		{src:"images/CachedBmp_514.png", id:"CachedBmp_514"},
		{src:"images/CachedBmp_513.png", id:"CachedBmp_513"},
		{src:"images/CachedBmp_511.png", id:"CachedBmp_511"},
		{src:"images/CachedBmp_512.png", id:"CachedBmp_512"},
		{src:"images/CachedBmp_365.png", id:"CachedBmp_365"},
		{src:"images/CachedBmp_364.png", id:"CachedBmp_364"},
		{src:"images/CachedBmp_302.png", id:"CachedBmp_302"},
		{src:"images/CachedBmp_509.png", id:"CachedBmp_509"},
		{src:"images/CachedBmp_510.png", id:"CachedBmp_510"},
		{src:"images/CachedBmp_304.png", id:"CachedBmp_304"},
		{src:"images/CachedBmp_362.png", id:"CachedBmp_362"},
		{src:"images/CachedBmp_303.png", id:"CachedBmp_303"},
		{src:"images/CachedBmp_301.png", id:"CachedBmp_301"},
		{src:"images/CachedBmp_300.png", id:"CachedBmp_300"},
		{src:"images/CachedBmp_299.png", id:"CachedBmp_299"},
		{src:"images/CachedBmp_295.png", id:"CachedBmp_295"},
		{src:"images/CachedBmp_296.png", id:"CachedBmp_296"},
		{src:"images/CachedBmp_294.png", id:"CachedBmp_294"},
		{src:"images/CachedBmp_297.png", id:"CachedBmp_297"},
		{src:"images/CachedBmp_298.png", id:"CachedBmp_298"},
		{src:"images/CachedBmp_293.png", id:"CachedBmp_293"},
		{src:"images/CachedBmp_291.png", id:"CachedBmp_291"},
		{src:"images/CachedBmp_290.png", id:"CachedBmp_290"},
		{src:"images/CachedBmp_288.png", id:"CachedBmp_288"},
		{src:"images/CachedBmp_287.png", id:"CachedBmp_287"},
		{src:"images/CachedBmp_289.png", id:"CachedBmp_289"},
		{src:"images/CachedBmp_287копия.png", id:"CachedBmp_287копия"},
		{src:"images/CachedBmp_292.png", id:"CachedBmp_292"},
		{src:"images/CachedBmp_267.png", id:"CachedBmp_267"},
		{src:"images/CachedBmp_264.png", id:"CachedBmp_264"},
		{src:"images/CachedBmp_263.png", id:"CachedBmp_263"},
		{src:"images/CachedBmp_265.png", id:"CachedBmp_265"},
		{src:"images/CachedBmp_266.png", id:"CachedBmp_266"},
		{src:"images/CachedBmp_268.png", id:"CachedBmp_268"},
		{src:"images/CachedBmp_269.png", id:"CachedBmp_269"},
		{src:"images/CachedBmp_261.png", id:"CachedBmp_261"},
		{src:"images/CachedBmp_257.png", id:"CachedBmp_257"},
		{src:"images/CachedBmp_262.png", id:"CachedBmp_262"},
		{src:"images/CachedBmp_260.png", id:"CachedBmp_260"},
		{src:"images/CachedBmp_258.png", id:"CachedBmp_258"},
		{src:"images/CachedBmp_259.png", id:"CachedBmp_259"},
		{src:"images/CachedBmp_256.png", id:"CachedBmp_256"},
		{src:"images/CachedBmp_255.png", id:"CachedBmp_255"},
		{src:"images/CachedBmp_254.png", id:"CachedBmp_254"},
		{src:"images/CachedBmp_251.png", id:"CachedBmp_251"},
		{src:"images/CachedBmp_249.png", id:"CachedBmp_249"},
		{src:"images/CachedBmp_252.png", id:"CachedBmp_252"},
		{src:"images/CachedBmp_253.png", id:"CachedBmp_253"},
		{src:"images/CachedBmp_250.png", id:"CachedBmp_250"},
		{src:"images/CachedBmp_246.png", id:"CachedBmp_246"},
		{src:"images/CachedBmp_248.png", id:"CachedBmp_248"},
		{src:"images/CachedBmp_245.png", id:"CachedBmp_245"},
		{src:"images/CachedBmp_243.png", id:"CachedBmp_243"},
		{src:"images/CachedBmp_242.png", id:"CachedBmp_242"},
		{src:"images/CachedBmp_241.png", id:"CachedBmp_241"},
		{src:"images/CachedBmp_244.png", id:"CachedBmp_244"},
		{src:"images/CachedBmp_240.png", id:"CachedBmp_240"},
		{src:"images/CachedBmp_239.png", id:"CachedBmp_239"},
		{src:"images/CachedBmp_237.png", id:"CachedBmp_237"},
		{src:"images/CachedBmp_235.png", id:"CachedBmp_235"},
		{src:"images/CachedBmp_236.png", id:"CachedBmp_236"},
		{src:"images/CachedBmp_238.png", id:"CachedBmp_238"},
		{src:"images/CachedBmp_232.png", id:"CachedBmp_232"},
		{src:"images/CachedBmp_233.png", id:"CachedBmp_233"},
		{src:"images/CachedBmp_234.png", id:"CachedBmp_234"},
		{src:"images/CachedBmp_231.png", id:"CachedBmp_231"},
		{src:"images/CachedBmp_247.png", id:"CachedBmp_247"},
		{src:"images/CachedBmp_228.png", id:"CachedBmp_228"},
		{src:"images/CachedBmp_225.png", id:"CachedBmp_225"},
		{src:"images/CachedBmp_226.png", id:"CachedBmp_226"},
		{src:"images/CachedBmp_227.png", id:"CachedBmp_227"},
		{src:"images/CachedBmp_229.png", id:"CachedBmp_229"},
		{src:"images/CachedBmp_224.png", id:"CachedBmp_224"},
		{src:"images/CachedBmp_223.png", id:"CachedBmp_223"},
		{src:"images/CachedBmp_222.png", id:"CachedBmp_222"},
		{src:"images/CachedBmp_221.png", id:"CachedBmp_221"},
		{src:"images/CachedBmp_220.png", id:"CachedBmp_220"},
		{src:"images/CachedBmp_216.png", id:"CachedBmp_216"},
		{src:"images/CachedBmp_219.png", id:"CachedBmp_219"},
		{src:"images/CachedBmp_217.png", id:"CachedBmp_217"},
		{src:"images/CachedBmp_215.png", id:"CachedBmp_215"},
		{src:"images/CachedBmp_218.png", id:"CachedBmp_218"},
		{src:"images/CachedBmp_213.png", id:"CachedBmp_213"},
		{src:"images/CachedBmp_210.png", id:"CachedBmp_210"},
		{src:"images/CachedBmp_209.png", id:"CachedBmp_209"},
		{src:"images/CachedBmp_211.png", id:"CachedBmp_211"},
		{src:"images/CachedBmp_214.png", id:"CachedBmp_214"},
		{src:"images/CachedBmp_212.png", id:"CachedBmp_212"},
		{src:"images/CachedBmp_208.png", id:"CachedBmp_208"},
		{src:"images/CachedBmp_207.png", id:"CachedBmp_207"},
		{src:"images/CachedBmp_205.png", id:"CachedBmp_205"},
		{src:"images/CachedBmp_206.png", id:"CachedBmp_206"},
		{src:"images/CachedBmp_184.png", id:"CachedBmp_184"},
		{src:"images/CachedBmp_186.png", id:"CachedBmp_186"},
		{src:"images/CachedBmp_182.png", id:"CachedBmp_182"},
		{src:"images/CachedBmp_183.png", id:"CachedBmp_183"},
		{src:"images/CachedBmp_187.png", id:"CachedBmp_187"},
		{src:"images/CachedBmp_181.png", id:"CachedBmp_181"},
		{src:"images/CachedBmp_180.png", id:"CachedBmp_180"},
		{src:"images/CachedBmp_179.png", id:"CachedBmp_179"},
		{src:"images/CachedBmp_178.png", id:"CachedBmp_178"},
		{src:"images/CachedBmp_188.png", id:"CachedBmp_188"},
		{src:"images/CachedBmp_177.png", id:"CachedBmp_177"},
		{src:"images/CachedBmp_176.png", id:"CachedBmp_176"},
		{src:"images/CachedBmp_175.png", id:"CachedBmp_175"},
		{src:"images/CachedBmp_174.png", id:"CachedBmp_174"},
		{src:"images/CachedBmp_189.png", id:"CachedBmp_189"},
		{src:"images/CachedBmp_172.png", id:"CachedBmp_172"},
		{src:"images/CachedBmp_173.png", id:"CachedBmp_173"},
		{src:"images/CachedBmp_171.png", id:"CachedBmp_171"},
		{src:"images/CachedBmp_164.png", id:"CachedBmp_164"},
		{src:"images/CachedBmp_170.png", id:"CachedBmp_170"},
		{src:"images/CachedBmp_163.png", id:"CachedBmp_163"},
		{src:"images/CachedBmp_161.png", id:"CachedBmp_161"},
		{src:"images/CachedBmp_162.png", id:"CachedBmp_162"},
		{src:"images/CachedBmp_160.png", id:"CachedBmp_160"},
		{src:"images/CachedBmp_158.png", id:"CachedBmp_158"},
		{src:"images/CachedBmp_159.png", id:"CachedBmp_159"},
		{src:"images/CachedBmp_156.png", id:"CachedBmp_156"},
		{src:"images/CachedBmp_157.png", id:"CachedBmp_157"},
		{src:"images/CachedBmp_190.png", id:"CachedBmp_190"},
		{src:"images/CachedBmp_155.png", id:"CachedBmp_155"},
		{src:"images/CachedBmp_152.png", id:"CachedBmp_152"},
		{src:"images/CachedBmp_153.png", id:"CachedBmp_153"},
		{src:"images/CachedBmp_154.png", id:"CachedBmp_154"},
		{src:"images/CachedBmp_148.png", id:"CachedBmp_148"},
		{src:"images/CachedBmp_151.png", id:"CachedBmp_151"},
		{src:"images/CachedBmp_149.png", id:"CachedBmp_149"},
		{src:"images/CachedBmp_150.png", id:"CachedBmp_150"},
		{src:"images/CachedBmp_147.png", id:"CachedBmp_147"},
		{src:"images/CachedBmp_146.png", id:"CachedBmp_146"},
		{src:"images/CachedBmp_144.png", id:"CachedBmp_144"},
		{src:"images/CachedBmp_145.png", id:"CachedBmp_145"},
		{src:"images/CachedBmp_143.png", id:"CachedBmp_143"},
		{src:"images/CachedBmp_142.png", id:"CachedBmp_142"},
		{src:"images/CachedBmp_141.png", id:"CachedBmp_141"},
		{src:"images/CachedBmp_140.png", id:"CachedBmp_140"},
		{src:"images/CachedBmp_123.png", id:"CachedBmp_123"},
		{src:"images/CachedBmp_122.png", id:"CachedBmp_122"},
		{src:"images/CachedBmp_139.png", id:"CachedBmp_139"},
		{src:"images/CachedBmp_124.png", id:"CachedBmp_124"},
		{src:"images/CachedBmp_121.png", id:"CachedBmp_121"},
		{src:"images/CachedBmp_120.png", id:"CachedBmp_120"},
		{src:"images/CachedBmp_119.png", id:"CachedBmp_119"},
		{src:"images/CachedBmp_117.png", id:"CachedBmp_117"},
		{src:"images/CachedBmp_118.png", id:"CachedBmp_118"},
		{src:"images/CachedBmp_114.png", id:"CachedBmp_114"},
		{src:"images/CachedBmp_116.png", id:"CachedBmp_116"},
		{src:"images/CachedBmp_115.png", id:"CachedBmp_115"},
		{src:"images/CachedBmp_113.png", id:"CachedBmp_113"},
		{src:"images/CachedBmp_112.png", id:"CachedBmp_112"},
		{src:"images/CachedBmp_109.png", id:"CachedBmp_109"},
		{src:"images/CachedBmp_111.png", id:"CachedBmp_111"},
		{src:"images/CachedBmp_110.png", id:"CachedBmp_110"},
		{src:"images/CachedBmp_107копия.png", id:"CachedBmp_107копия"},
		{src:"images/CachedBmp_108.png", id:"CachedBmp_108"},
		{src:"images/CachedBmp_107.png", id:"CachedBmp_107"},
		{src:"images/CachedBmp_89.png", id:"CachedBmp_89"},
		{src:"images/CachedBmp_88.png", id:"CachedBmp_88"},
		{src:"images/CachedBmp_85.png", id:"CachedBmp_85"},
		{src:"images/CachedBmp_86.png", id:"CachedBmp_86"},
		{src:"images/CachedBmp_87.png", id:"CachedBmp_87"},
		{src:"images/CachedBmp_84.png", id:"CachedBmp_84"},
		{src:"images/CachedBmp_82.png", id:"CachedBmp_82"},
		{src:"images/CachedBmp_83.png", id:"CachedBmp_83"},
		{src:"images/CachedBmp_81.png", id:"CachedBmp_81"},
		{src:"images/CachedBmp_80.png", id:"CachedBmp_80"},
		{src:"images/CachedBmp_79.png", id:"CachedBmp_79"},
		{src:"images/CachedBmp_78.png", id:"CachedBmp_78"},
		{src:"images/CachedBmp_77.png", id:"CachedBmp_77"},
		{src:"images/CachedBmp_76.png", id:"CachedBmp_76"},
		{src:"images/CachedBmp_75.png", id:"CachedBmp_75"},
		{src:"images/CachedBmp_74.png", id:"CachedBmp_74"},
		{src:"images/CachedBmp_73.png", id:"CachedBmp_73"},
		{src:"images/CachedBmp_71.png", id:"CachedBmp_71"},
		{src:"images/CachedBmp_72.png", id:"CachedBmp_72"},
		{src:"images/CachedBmp_70.png", id:"CachedBmp_70"},
		{src:"images/CachedBmp_69.png", id:"CachedBmp_69"},
		{src:"images/CachedBmp_67.png", id:"CachedBmp_67"},
		{src:"images/CachedBmp_68.png", id:"CachedBmp_68"},
		{src:"images/CachedBmp_49.png", id:"CachedBmp_49"},
		{src:"images/CachedBmp_48.png", id:"CachedBmp_48"},
		{src:"images/CachedBmp_45.png", id:"CachedBmp_45"},
		{src:"images/CachedBmp_46.png", id:"CachedBmp_46"},
		{src:"images/CachedBmp_47.png", id:"CachedBmp_47"},
		{src:"images/CachedBmp_44.png", id:"CachedBmp_44"},
		{src:"images/CachedBmp_43.png", id:"CachedBmp_43"},
		{src:"images/CachedBmp_42.png", id:"CachedBmp_42"},
		{src:"images/CachedBmp_38.png", id:"CachedBmp_38"},
		{src:"images/CachedBmp_41.png", id:"CachedBmp_41"},
		{src:"images/CachedBmp_40.png", id:"CachedBmp_40"},
		{src:"images/CachedBmp_39.png", id:"CachedBmp_39"},
		{src:"images/CachedBmp_37.png", id:"CachedBmp_37"},
		{src:"images/CachedBmp_36.png", id:"CachedBmp_36"},
		{src:"images/CachedBmp_35.png", id:"CachedBmp_35"},
		{src:"images/CachedBmp_34.png", id:"CachedBmp_34"},
		{src:"images/CachedBmp_33.png", id:"CachedBmp_33"},
		{src:"images/CachedBmp_32.png", id:"CachedBmp_32"},
		{src:"images/CachedBmp_31.png", id:"CachedBmp_31"},
		{src:"images/CachedBmp_30.png", id:"CachedBmp_30"},
		{src:"images/CachedBmp_29.png", id:"CachedBmp_29"},
		{src:"images/CachedBmp_10.png", id:"CachedBmp_10"},
		{src:"images/CachedBmp_28.png", id:"CachedBmp_28"},
		{src:"images/CachedBmp_8.png", id:"CachedBmp_8"},
		{src:"images/CachedBmp_27.png", id:"CachedBmp_27"},
		{src:"images/CachedBmp_9.png", id:"CachedBmp_9"},
		{src:"images/CachedBmp_7.png", id:"CachedBmp_7"},
		{src:"images/CachedBmp_26.png", id:"CachedBmp_26"},
		{src:"images/CachedBmp_6.png", id:"CachedBmp_6"},
		{src:"images/CachedBmp_25.png", id:"CachedBmp_25"},
		{src:"images/CachedBmp_2.png", id:"CachedBmp_2"},
		{src:"images/CachedBmp_5.png", id:"CachedBmp_5"},
		{src:"images/CachedBmp_3.png", id:"CachedBmp_3"},
		{src:"images/CachedBmp_1.png", id:"CachedBmp_1"},
		{src:"images/CachedBmp_4.png", id:"CachedBmp_4"},
		{src:"images/dd_atlas_1.png", id:"dd_atlas_1"}
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
an.compositions['83FE0448892C0140BBF530285C7C1A02'] = {
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