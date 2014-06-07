// ==UserScript==
// @name           BirthdayGoogle
// @namespace      http://very.weirdly.net
// @description    A birthday hack for my wife's computer
// @include        http://www.google.ca/*
// @include        http://www.boingboing.net/*
// @include        http://boingboing.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// ==/UserScript==

function buildSprites(){
	spriteData = {
		'cake': 'image=>http://weirdly.net/images/robocake.gif;frameRate=>24;frameWidth=>72;frameHeight=>81;frame=>name=0,x=0,y=0;frame=>name=1,x=1,y=0;frame=>name=2,x=2,y=0;frame=>name=3,x=3,y=0;frame=>name=4,x=4,y=0;frame=>name=5,x=5,y=0;frame=>name=6,x=6,y=0;frame=>name=7,x=0,y=1;frame=>name=8,x=1,y=1;frame=>name=9,x=2,y=1;frame=>name=10,x=3,y=1;frame=>name=11,x=4,y=1;frame=>name=12,x=5,y=1;frame=>name=13,x=6,y=1;frame=>name=14,x=0,y=2;frame=>name=15,x=1,y=2;frame=>name=16,x=2,y=2;frame=>name=17,x=3,y=2;frame=>name=18,x=4,y=2;frame=>name=19,x=5,y=2;frame=>name=20,x=6,y=2;frame=>name=21,x=0,y=3;frame=>name=22,x=1,y=3;frame=>name=23,x=2,y=3;frame=>name=24,x=3,y=3;frame=>name=25,x=4,y=3;frame=>name=26,x=5,y=3;frame=>name=27,x=6,y=3;frame=>name=28,x=0,y=4;frame=>name=29,x=1,y=4;frame=>name=30,x=2,y=4;frame=>name=31,x=3,y=4;frame=>name=32,x=4,y=4;frame=>name=33,x=5,y=4;frame=>name=34,x=6,y=4;frame=>name=35,x=0,y=5;frame=>name=36,x=1,y=5;sequence=>name=walk, frames = 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23;sequence=>name=sit, frames = 24 25 26 27 28 29 30 31 32 33 34 35 36, framerate=60;sequence=>name=stand, frames = 36 35 34 33 32 31 30 29 28 27 26 25 24, framerate=60;'
	};
}

function modGoogle(){
	var container, spriteData;
	container = $('#lga');
	if(container){

		buildSprites();
		var fixedHeight = container.height();
		container.css('height', fixedHeight + 'px');
		var logo = $('#hplogo');
		var p = logo.position();
		cssParams = {
			'position' : 'absolute',
			'top' : p.top + 'px',
			'left' : p.left + 'px',
			'border' : 'none'
		};
		logo.css(cssParams);
		container.empty();
		container.append(logo);
		logo.animate({'top':'-' + (logo.height() << 1) + 'px'}, 2000);
		var newImage = $('<img src="http://weirdly.net/images/HappyBirthday.png"/>');
		newImage.css({
			'position':'relative',
			'margin':'auto',
			'border':'none',
			'top': (p.top - logo.parent().position().top) + 'px'
		})
		newImage.insertBefore(logo);

		var cakeSet = new spriteSet();
		cakeSet.load('cake');
		var roboCake = new spriteClass(cakeSet);
		roboCake.appendTo(container);
		roboCake.setFrame(0);
		// 31 is the number of pixels moved with each repetition of the walking sequence
		var docWidth = $(document).width();
		var roboY = newImage.position().top + 36;
		roboCake.position(docWidth, roboY);
		var iterations = Math.floor((docWidth + roboCake.width >> 1) / 31);
		var cakeSit = function(){
			roboCake.startSequence('sit', {
				'iterations' : 1,
				'callback':function(){
					roboCake.element.unbind('click');
					roboCake.element.click(cakeStand);
				}
			});
		}

		var cakeStand = function(){
			roboCake.element.unbind('click');
			roboCake.startSequence('stand', {
				'iterations' : 1,
				'callback':function(){
					iterations = 3 + Math.floor(Math.random() * 5);
					roboCake.startSequence('walk', {
						'iterations' : iterations,
						'stepCallback': cakeStep,
						'callback':function(){
							if(roboCake.x < -(roboCake.width >> 1)){
								docWidth = $(document).width();
								roboCake.position(docWidth, roboY);
								roboCake.startSequence('walk', {
									'iterations' : 2,
									'stepCallback': cakeStep,
									'callback':cakeSit
								});
							}else{
								cakeSit();
							}
						}
					});
				}
			});
		}

		var cakeStep = function(){
			var dx;
			switch(1 * roboCake.currentFrame){
				case 6: case 7: case 17: case 18: dx = 0; break;
				case 0: case 1: case 9: case 10: case 11: case 22: case 23: case 5: case 16: dx = -1; break;
				default: dx = -2;
			}
			if(dx) roboCake.position(roboCake.x + dx, roboCake.y);
		}

		roboCake.startSequence('walk', {
			'iterations' : iterations,
			'stepCallback': cakeStep,
			'callback':cakeSit
		});

	}
}

function modBoingBoing(){
	var container = $('#column');
	if(container){
		var afterObj = $('.post:eq(1)');
		var newContent = $('<div class="post"></div>');
		var header = $('<h2 class="headline">Most amazing person in the world has a birthday today, husband goes ga-ga</h2>');
		newContent.append(header);

		var currentTime = new Date();
		var hour = 1 * currentTime.getHours();
		var tag;
		if(hour > 12){hour -= 12; tag = 'pm'}
		else tag = 'am'
		var minute = currentTime.getMinutes();
		var byLine = $('<p class="byline">By <a href="http://weirdly.net">Jacob Ewing</a> at ' + hour + ':' + minute + ' ' + tag + ' Monday, Nov 28</p>');
		newContent.append(byLine);
		var image = $('<img src="http://weirdly.net/images/CelesteAndPenelope.jpg" alt="Celeste and Penelope"/>');
		newContent.append(image);
		var text = '<p>On this day in 1979, a most amazing thing happened.  Agnès Celeste Vachon Tremblay was born, transforming the world from a dreary gallows into a place of joy and wonder.  ';
		text += 'Twenty seven years later, she hunted me down and made me the happiest man on Earth.  In the three years since then, we\'ve moved between ';
		text += 'cities, gotten married, and brought forth a daughter whom we love beyond expression.  I can not possibly begin to convey the true depth of my love for Celeste, ';
		text += 'and can only spend so many words before it gets overly clichéd and mushy.</p>';
		newContent.append($(text));
		text = '<p>I wish you a wonderful birthday Celeste!  <strong>I LOVE YOU!</strong>  I know I say it all the time, but only because there is no other phrase or word ';
		text += 'that says enough.  Nor is that truly enough.  You make my life the best I could ever imagine, and I sincerely hope I can do as much for you.</p>';
		newContent.append($(text));
		newContent.insertAfter(afterObj);
	}
}

function trim(stringToTrim) {
	// make sure it is indeed a string:
	stringToTrim = ' ' + stringToTrim;
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

var spriteClass = function(set){
	var me = this;

	this.set = set;
	this.frame = null;
	this.image = $('<img src="' + set.image + '">');
	this.element = $('<div></div>');
	this.width = this.height = this.x = this.y = 0;
	this.centerx = this.centery = 0;
	this.scale = 1;
	this.currentFrame = null;


	this.image.css({
		'position': 'absolute',
		'left': this.y,
		'top': this.x
	});

	this.element.append(this.image);

	this.element.css({
		'position':'absolute',
		'width': this.width + 'px',
		'height': this.height + 'px',
		'left': this.x + 'px',
		'top': this.y + 'px',
		'overflow': 'hidden'
	});

	this.remove = function(){
		this.image.remove();
		this.element.remove();
	}

	this.setFrame = function(framename){
		framename = trim(framename).toLowerCase();
	
		if(this.set.frames[framename] != undefined){
			this.frame = this.set.frames[framename];
			this.currentFrame = framename;
			this.setFrameSize(this.frame.width * this.scale, this.frame.height * this.scale);
			this.refreshFrame();
		}
	}

	this.setFrameSize = function(w, h){
		this.width = w;
		this.height = h;
		this.element.css({
			width: this.width + 'px',
			height: this.height + 'px'
		});
	}

	this.setScale = function(newScale){
		this.centerx = this.centery = 0;
		if(this.frame != undefined){
			this.centerx = this.frame.centerx;
			this.centery = this.frame.centery;
		}
		this.scale = newScale;
		this.image.css({
			width: (this.set.imageWidth * this.scale) + 'px',
			height: (this.set.imageHeight * this.scale) + 'px'
		});
		// also need to adjust our element's position, as that will be dependent on scale when we have a center point other than 0,0
		this.element.css({
			'left': (this.x - this.centerx * this.scale) + 'px',
			'top': (this.y - this.centery * this.scale) + 'px'
		});
		this.setFrameSize(this.frame.width * this.scale, this.frame.height * this.scale);
		this.refreshFrame();
	}

	this.refreshFrame = function(){
		this.image.css({
			'position': 'absolute',
			'left': -(this.frame.x * this.scale) + 'px',
			'top': -(this.frame.y * this.scale) + 'px'
		});
	}

	this.refreshImage = function(){
		this.image = $('<img src="' + this.set.image + '">');
		this.element.empty();
		this.element.append(this.image);
		this.setScale(this.scale);
	}

	this.draw = this.appendTo = function(target){
		target.append(this.element);
	}

	this.prependTo = function(target){
		target.prepend(this.element);
	}

	this.detach = function(){
		this.element.detach();
	}

	this.move = function(dx, dy){
		this.position(this.x + dx, this.y + dy);
	}

	this.position = function(x, y){
		this.centerx = this.centery = 0;
		if(x != undefined && y != undefined){
			this.x = x;
			this.y = y;
			if(this.frame != undefined){
				this.centerx = this.frame.centerx;
				this.centery = this.frame.centery;
			}
			this.element.css({
				'left': (this.x - this.centerx * this.scale) + 'px',
				'top': (this.y - this.centery * this.scale) + 'px'
			});
		}
		return({'top':this.y, 'left':this.x});
	}


	this.startSequence = function(sequenceName, params){
		var n, callback, frameRate, sequence, iterations, newParams;

		if(this.set.sequences[sequenceName] == undefined) return false;
		newParams = {
			frames: this.set.sequences[sequenceName].frames,
			frameRate: this.set.sequences[sequenceName].frameRate,
			callback: function(){},
			stepCallback: function(){},
			iterations: 1,
			currentFrame: 0,
			stop: false,
			method: 'auto'
		};

		if(params != undefined){
			for(n in params){
				switch(trim(n).toLowerCase()){
					case 'framerate':
						newParams.frameRate = params[n];
						break;
					case 'callback':
						newParams.callback = params[n];
						break;
					case 'iterations':
						newParams.iterations = params[n];
						break;
					case 'stepcallback':
						newParams.stepCallback = params[n];
						break;
					case 'frametimes':
						newParams.frameTimes = params[n];
						newParams.currentFrameTime = 0;
						break;
					case 'method':
						newParams.method = params[n];
						break;
					case 'startframe':
						newParams.currentFrame = params[n];
						break;
				}
			}
		}
		if(newParams.method == 'auto')
			this.doSequenceStep(newParams);
		return newParams;
	}

	// kill the current sequence
	this.stopSequence = function(sequenceParams, docallback){
		sequenceParams.stop = true;
		if(docallback == true){
			sequenceParams.callback();
		}
	}

	// make this iteration of the sequence it's final iteration, adding a new callback if desired
	this.finishSequence = function(sequenceParams, callback){
		sequenceParams.iterations = 1;
		if(callback != undefined){
			var oldCallback = sequenceParams.callback;
			var newCallback = function(){
				oldCallback();
				callback();
			}
			sequenceParams.callback = newCallback;
		}
	}

	this.doSequenceStep = function(params){
		var doNextFrame = (params.method == 'auto');
		var animDelay = params.frameRate;

		if(params.stop == true){
			return;
		}

		if(params.frameTimes != undefined){
			animDelay = params.frameTimes[params.currentFrameTime];
			params.currentFrameTime = (params.currentFrameTime + 1) % params.frameTimes.length;
		}

		this.setFrame(params.frames[params.currentFrame]);
		params.stepCallback();
		params.currentFrame++;
		
		if(params.currentFrame == params.frames.length){
			if(params.iterations == 1){
				doNextFrame = false;
				params.callback();
			}else if(params.iterations == 0){
				params.currentFrame = 0;
			}else{
				params.currentFrame = 0;
				params.iterations--;
			}
		}
		if(doNextFrame){
			setTimeout(function(){me.doSequenceStep(params)}, animDelay);
		}
		return params;
	}
	// finally, some initialization
	this.setFrameSize(this.set.frameWidth, this.set.frameHeight);
}

var spriteSet = function(){
	var me = this;
	this.frames = [];
	this.sequences = {};
	this.defaultFrameRate = 40;
	this.centerx = this.centery = 0;
	this.loadingImage = false;

	this.load = function(dataName, callback){
		var data = spriteData[dataName];
		var lines = data.split(';');
		var parts, n, m;
		for(n in lines){
			if(trim(lines[n]).length){
				parts = lines[n].split('=>');
				switch(trim(parts[0]).toLowerCase()){
					case 'image':
						me.setImage(parts[1]);
						break;
					case 'framewidth':
						me.frameWidth = 1 * trim(parts[1]);
						break;
					case 'frameheight':
						me.frameHeight = 1 * trim(parts[1]);
						break;
					case 'frame':
						me.loadFrame(parts[1]);
						break;
					case 'sequence':
						me.loadSequence(parts[1]);
						break;
					case 'framerate':
						me.defaultFrameRate = 1 * trim(parts[1]);
						break;
					case 'centerx': case 'cx':
						me.centerx = 1 * trim(parts[1]);
						break;
					case 'centery': case 'cy':
						me.centery = 1 * trim(parts[1]);
						break;
				}
			}
		}
		
		if(callback != undefined){
			callback(result);
		}
	}

	this.setFrameSize = function(w, h){
		this.frameWidth = w;
		this.frameHeight = h;
	}

	this.addFrame = function(id, params){
		var parts, arg, val, n;
		var newFrame = {
			'x': 0,
			'y': 0,
			'width': this.frameWidth,
			'height': this.frameHeight,
			'centerx': this.centerx,
			'centery': this.centery
		};
		for(n in params){
			switch(trim(n).toLowerCase()){
				case 'width': case 'height':
					newFrame[n] = 1 * params[n];
					break;
				case 'x': case 'left':
					newFrame['x'] = 1 * newFrame['x'] + 1 * params[n];
					break;
				case 'xoffset':
					newFrame['x'] = 1 * newFrame['x'] + 1 * params[n];
					break;
				case 'y': case 'top':
					newFrame['y'] = 1 * newFrame['y'] + 1 * params[n];
					break;
				case 'yoffset':
					newFrame['y'] = 1 * newFrame['y'] + 1 * params[n];
					break;
				case 'centerx': case 'cx':
					newFrame['centerx'] = 1 * params[n];
					break;
				case 'centery': case 'cy':
					newFrame['centery'] = 1 * params[n];
					break;
			}
		}
		this.frames[id] = newFrame;
	}

	this.loadSequence = function(datastr){
		var sequenceName = undefined;
		var newSequence = {
			'frames':[],
			'frameRate': me.defaultFrameRate
		};
		var params = datastr.split(',');
		var parts, arg, val, n, m;
		for(n in params){
			parts = params[n].split('=');
			arg = trim(parts[0]).toLowerCase();
			val = trim(parts[1]);
			switch(arg){
				case 'name':
					sequenceName = val;
					break;
				case 'frames':
					frameSet = val.split(' ');
					for(m in frameSet){
						newSequence.frames[m] = trim(frameSet[m]);
					}
					break;
				case 'framerate':
					newSequence.frameRate = 1 * val;
					break;
			}

		}
		if(sequenceName != undefined){
			this.sequences[sequenceName] = newSequence;
		}

	}

	this.loadFrame = function(datastr){
		var params = datastr.split(',');
		var parts, arg, val, n;
		var frameName = undefined;
		var newFrame = {
			'x': 0,
			'y': 0,
			'width': this.frameWidth,
			'height': this.frameHeight,
			'centerx': this.centerx,
			'centery': this.centery
		};
		for(n in params){
			parts = params[n].toLowerCase().split('=');
			arg = trim(parts[0]);
			val = trim(parts[1]);
			switch(arg){
				case 'name':
					frameName = val;
					break;
				case 'width': case 'height':
					newFrame[arg] = 1 * val;
					break;
				case 'x':
					newFrame['x'] += this.frameWidth * val;
					break;
				case 'xoffset':
					newFrame['x'] += 1 * val;
					break;
				case 'y':
					newFrame['y'] += this.frameHeight * val;
					break;
				case 'yoffset':
					newFrame['y'] += 1 * val;
					break;
				case 'centerx': case 'cx':
					newFrame['centerx'] = 1 * val;
					break;
				case 'centery': case 'cy':
					newFrame['centery'] = 1 * val;
					break;
			}
		}
		if(frameName != undefined){
			this.frames[frameName] = newFrame;
		}
	}

	// set the image and cache it
	this.setImage = function(file){
		this.loadingImage = true;
		this.image = file;
		var cacheDiv = $('<div><div>');
		cacheDiv.css({
			width:'0px',
			height: '0px',
			position: 'absolute',
			top: '-1px',
			left: '-1px',
			overflow: 'hidden'
		});
		$('body').append(cacheDiv);
		var imgElement = $('<img src="' + file + '">');
		imgElement.load(function(){
			me.loadingImage = false;
		});
		cacheDiv.append(imgElement);

		this.imageWidth = imgElement.width();
		this.imageHeight = imgElement.height();
	}
}

$.extend({
	getUrlVars: function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	},
	getUrlVar: function(name){
		return $.getUrlVars()[name];
	}
});

var currentTime = new Date();
var month = currentTime.getMonth() + 1;
var day = currentTime.getDate();
if((month == 11 && day == 28) || $.getUrlVar('btest') != undefined){
	var url = document.location.href;
	
	if(url.indexOf('.google.') != -1){
		setTimeout(function(){ modGoogle(); }, 2000);
	}
	if(url.indexOf('boingboing.net') != -1){
		modBoingBoing();
	}
}

