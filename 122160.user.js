// ==UserScript==
// @name           FlickrThreadSlideshow
// @namespace      http://www.flickr.com/alesadam
// @description    Provides a slideshow for images posted in a Discuss threads
// @creator        Alesa Dam (http://flickr.com/alesadam/)
// @date           Jan 3, 2012
// @version        0.4.4
// @modified       Feb 2, 2012
//
// @include        http://www.flickr.com/*
// @match          http://www.flickr.com/*
//
// @exclude        http://www.flickr.com/photos/organize*
//
// @run-at         document-end
//
// @author	   Alesa Dam (http://flickr.com/alesadam/)
// @contributor	   Martin Heimburger (http://vispillo.org/)
// @copyright	2012 Alesa Dam
// @license	GPL v3+
// @licstart	The following is the entire license notice for this script.
/*
 * Copyright (C) 2012 Alesa Dam
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details 
 * at <http://www.gnu.org/licenses/>.
 */
// @licend
//
// ==/UserScript==
//
// slideshow code based on http://javascriptsource.com/miscellaneous/basic-slideshow.html
// fading code based on http://www.switchonthecode.com/tutorials/javascript-tutorial-simple-fade-animation

(function () {
var FTSversion = '0.4.4';

if (document.location.href.match(/https?:\/\/www\.flickr\.com\/groups\/[^\/]+\/discuss\/\d+/)) {
	var storedDelay;
	try {
		storedDelay = GM_getValue('delay',3000);
	} catch (e) {
		function GM_getValue(key,defValue) {
			var retval = window.localStorage.getItem('FlickrThreadSlideshow.' + key);
			if (retval == undefined || retval == null) {
				retval = defValue;
			}
			return retval;
		}
		function GM_setValue(key,value) {
			window.localStorage.setItem('FlickrThreadSlideshow.' + key, value);
		}
		function GM_log(msg) {
			console.log(msg);
		}
	}

	var photos = [];
	function collectPhotos (skipOP) {
		photos = [];
		var images = document.evaluate(skipOP ? "//table[@class='TopicReply']//img[contains(@class,'notsowide')]" : "//td[@class='Said']//img[contains(@class,'notsowide')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (images.snapshotLength > 0) {
			for (var i = 0; i < images.snapshotLength; ++i) {
				var image = images.snapshotItem(i);
				if (image.src.match('buddyicon')) {
					continue;
				}
				if (image.alt && image.alt.match(/FTS-ignore/i)) {
					continue;
				}
				if (image.src.match(/https?:\/\/(farm\d+\.)?static\.?flickr\.com\/\d+\/\d+.*\.jpg/)) {
					photos[photos.length] = image;
				}
			}
		}
	}
	collectPhotos(false); // on start want all images, including the OP ones:
			// looking at challenge A, skipop=true
			// changing to challenge B, which has its images all in the OP (Kanchenjunga e.g.) => no images
	if (photos.length < 2) {
		return;
	}
	// fading code based on http://www.switchonthecode.com/tutorials/javascript-tutorial-simple-fade-animation
	var TimeToFade = 250.0;
	var fader;

	function fade(eid, callback) {
		var element = document.getElementById(eid);
		if(element == null) {
			return;
		}
		if(element.FadeState == null) {
			if(element.style.opacity == null 
			|| element.style.opacity == '' 
			|| element.style.opacity == '1') {
				element.FadeState = 2;
			} else {
				element.FadeState = -2;
			}
		}

		if(element.FadeState == 1 || element.FadeState == -1) {
			element.FadeState = element.FadeState == 1 ? -1 : 1;
			element.FadeTimeLeft = TimeToFade - element.FadeTimeLeft;
		} else {
			element.FadeState = element.FadeState == 2 ? -1 : 1;
			element.FadeTimeLeft = TimeToFade;
			fader = window.setTimeout(function () { animateFade(new Date().getTime(),eid,callback); }, 33);
		}  
	}

	function animateFade(lastTick, eid, callback) {  
		var curTick = new Date().getTime();
		var elapsedTicks = curTick - lastTick;

		var element = document.getElementById(eid);

		if(element.FadeTimeLeft <= elapsedTicks) {
			element.style.opacity = element.FadeState == 1 ? '1' : '0';
			element.style.filter = 'alpha(opacity = ' 
				+ (element.FadeState == 1 ? '100' : '0') + ')';
			element.FadeState = element.FadeState == 1 ? 2 : -2;
			if (callback) {
				callback(element);
			}
			return;
		}

		element.FadeTimeLeft -= elapsedTicks;
		var newOpVal = element.FadeTimeLeft/TimeToFade;
		if(element.FadeState == 1) {
			newOpVal = 1 - newOpVal;
		}
		element.style.opacity = newOpVal;
		element.style.filter = 'alpha(opacity = ' + (newOpVal*100) + ')';

		fader = window.setTimeout(function () { animateFade(curTick,eid,callback); }, 33);
	}

	// slideshow code based on http://javascriptsource.com/miscellaneous/basic-slideshow.html
		var Images = [];
		var ImgNum = 0;

		//Time delay between Slides in milliseconds
		var delay = GM_getValue('delay',3000);
		if (isNaN(delay)) { // fix for a bug in v0.4.3
			delay = 3000;
			GM_setValue('delay',delay);
		}

		var lock = false;
		var run;

	function chgImg(direction) {
		if (document.images) {
			ImgNum = ImgNum + direction;
			if (ImgNum > Images.length - 1) {
				ImgNum = 0;
			}
			if (ImgNum < 0) {
				ImgNum = Images.length - 1;
			}
			// stop any running fader
			if (fader) {
				window.clearTimeout(fader);
			}
			var fading = GM_getValue('fading', false);
			if (fading == true || fading == "true") {
				// make sure to start with an opaque image
				var image = document.getElementById('FTS-image');
				image.FadeState = 2;
				image.style.opacity = '1';
				fade('FTS-image', function (element) {
					element.src = Images[ImgNum].src;
					element.setAttribute('height', Images[ImgNum].height); // only set 1 of width or height: distortion
					document.getElementById('FTS-counter').innerHTML = (ImgNum + 1) + '/' + Images.length;
					fade('FTS-image'); // should be fade-in
				});
			} else {
				var image = document.getElementById('FTS-image');
				image.src = Images[ImgNum].src;
				image.setAttribute('height', Images[ImgNum].height); // only set 1 of width or height: distortion
				image.FadeState = 2;
				image.style.opacity = '1';
				document.getElementById('FTS-counter').innerHTML = (ImgNum + 1) + '/' + Images.length;
			}
		}
	}
	function auto() {
		if (lock == true) {
			lock = false;
			window.clearInterval(run);
		}
		else if (lock == false) {
			lock = true;
			run = window.setInterval(function () { chgImg(1); }, delay);
   		}
	}

	function _loadImages() {
		Images = [];
		photos.forEach(function (photo) {
			Images[Images.length] = {
				src: photo.src, // default
				status: 'loading'
			};
		});
	}

	function loadImages(size) {
		Images = [];
		ImgNum = 0;
		GM_setValue('size',size);
		photos.forEach(function (photo, index) {
			var image = new Image();
			var source = photo.src;
			switch (size) {
				case 'posted':
					image.src = source;
				break;
	 			case 'square':
					image.src = source.replace(/(https?:\/\/(?:farm\d+\.)?static\.?flickr\.com\/\d+\/\d+)_([^_\.]+).*jpg/,"$1_$2_s.jpg");
				break;
	 			case 'thumb':
					image.src = source.replace(/(https?:\/\/(?:farm\d+\.)?static\.?flickr\.com\/\d+\/\d+)_([^_\.]+).*jpg/,"$1_$2_t.jpg");
				break;
				case 'small':
					image.src = source.replace(/(https?:\/\/(?:farm\d+\.)?static\.?flickr\.com\/\d+\/\d+)_([^_\.]+).*jpg/,"$1_$2_m.jpg");
				break;
				case '500':
					image.src = source.replace(/(https?:\/\/(?:farm\d+\.)?static\.?flickr\.com\/\d+\/\d+)_([^_\.]+).*jpg/,"$1_$2.jpg");
				break;
				case '640':
					image.src = source.replace(/(https?:\/\/(?:farm\d+\.)?static\.?flickr\.com\/\d+\/\d+)_([^_\.]+).*jpg/,"$1_$2_z.jpg?zz=1");
				break;
	 			case 'large':
					image.src = source.replace(/(https?:\/\/(?:farm\d+\.)?static\.?flickr\.com\/\d+\/\d+)_([^_\.]+).*jpg/,"$1_$2_b.jpg");
				break;
	 			case 'original':
					image.src = source.replace(/(https?:\/\/(?:farm\d+\.)?static\.?flickr\.com\/\d+\/\d+)_([^_\.]+).*\.(jpg|png|png)$/,"$1_$2_o.$3");
				break;
			}
			image.addEventListener('load', function () {
				Images[index].width = this.width;
				Images[index].height= this.height;
				Images[index].src   = this.src;
				if (index == ImgNum) chgImg(0); // reload current slide
			}, false);
			image.addEventListener('error', function () {
				Images[index].src    = photos[index].src; // reset
			}, false);
			Images[index] = {
				status: 'loading'
			};
		});
		chgImg(0);
	}

	function createSlideshow() {
		_loadImages();
		var topBar = document.getElementById('TopBar');
		var slideshow = document.createElement('div');
		document.getElementsByTagName('body')[0].appendChild(slideshow);
		slideshow.id = 'FTS-Slideshow';
		slideshow.setAttribute('style',
			'height: ' + window.innerHeight + ';' +
                        'width: ' + window.innerWidth + ';' +
            		'top: 0px;' +
            		'left: 0px;' +
            		'padding: 0px 0px;' +
            		'background: black none repeat scroll 0% 0%;' +
            		'display: block;' +
                	'-moz-border-radius: 4px;' +
                	'-webkit-border-radius: 4px;' +
                	'-khtml-border-radius: 4px;' +
                	'border-radius: 4px;' +
                	'border: grey solid 1px;' +
            		'-moz-background-clip: border;' +
            		'-moz-background-origin: padding;' +
            		'-moz-background-inline-policy: continuous;' +
            		'position: fixed;' +
           		'z-index: 1014;' +
			'align: center;');

		var toprowtable = document.createElement('table');
		toprowtable.setAttribute('style', 'width: 100%; border-collapse: collapse;');
		slideshow.appendChild(toprowtable);
		var toprow = document.createElement('tr');
		toprow.setAttribute('style', 'width: 100%;');
		toprowtable.appendChild(toprow);

		var optionscell = document.createElement('td');
		optionscell.setAttribute('style', 'width: 35%;');
		toprow.appendChild(optionscell);

		var versioninfo = document.createElement('span');
		versioninfo.innerHTML = 'v' + FTSversion + '&emsp;';
		versioninfo.setAttribute('style', 'color: white;');
		optionscell.appendChild(versioninfo);

		var interval = document.createElement('input');
		interval.type = 'number';
		interval.min = 1;
		interval.id = 'FTS-delay';
		interval.value = (delay / 1000);
		interval.setAttribute('style', 'width: 35px; height: 15px; font-size: 9px;');
		interval.addEventListener('change', function () {
			delay = this.value;
			if (delay) {
				try {
					delay = parseInt(delay,10) * 1000;
					if (isNaN(delay)) {
						throw "NaN";
					}
					GM_setValue('delay',delay);
				} catch (e) {
					GM_setValue('delay',3000);
					delay = GM_getValue('delay',3000);
				}
			} else {
				delay = GM_getValue('delay',3000);
			}
			this.value = delay / 1000; // show the new value (invalid=>3 * 2.5=>2 * ...)
		}, false);
		optionscell.appendChild(interval);

		var intervallabel = document.createElement('label');
		intervallabel.innerHTML = 'sec.&emsp;';
		intervallabel.setAttribute('style', 'color: white;');
		optionscell.appendChild(intervallabel);

		var sizeselect = document.createElement('select');
		var selectedSize = GM_getValue('size', 'posted');
		sizeselect.id = 'FTS-size';
		[{ value: 'posted',   label: 'as posted'  },
		 { value: 'square',   label: 'square'     },
		 { value: 'thumb' ,   label: 'thumbnail'  },
		 { value: 'small',    label: 'small'      },
		 { value: '500',      label: 'medium 500' },
		 { value: '640',      label: 'medium 600' },
		 { value: 'large',    label: 'large'      },
		 { value: 'original', label: 'original'   }].forEach( function (size) {
			var option = document.createElement('option');
			option.value = size.value;
			option.innerHTML = size.label;
			if (option.value == selectedSize) {
				option.selected = true;
			}
			sizeselect.appendChild(option);
		});
		sizeselect.addEventListener('change', function () {
			loadImages(this.value);
		}, false);
		optionscell.appendChild(sizeselect);

		var fadingcheck = document.createElement('input');
		fadingcheck.type = 'checkbox';
		fadingcheck.id = 'FTS-fading';
		fadingcheck.checked = GM_getValue('fading', false) == "true" || GM_getValue('fading', false) == true;
		fadingcheck.addEventListener('change', function () { GM_setValue('fading',this.checked); }, false);
		optionscell.appendChild(fadingcheck);

		var fadinglabel = document.createElement('label');
		fadinglabel.setAttribute('for', 'FTS-fading');
		fadinglabel.innerHTML = 'fading';
		fadinglabel.setAttribute('style', 'color: white;');
		optionscell.appendChild(fadinglabel);

		var skipopcheck = document.createElement('input');
		skipopcheck.type = 'checkbox';
		skipopcheck.id = 'FTS-skipop';
		skipopcheck.checked = false; // we start of as if we did not have this option set (see remark above)
		skipopcheck.addEventListener('change', function () {
			GM_setValue('skipop',this.checked);
			if (lock == true) {
				document.getElementById('FTS-playbutton').click(); // stop autoplay
			}
			collectPhotos(this.checked);
			loadImages(GM_getValue('size', 'posted'));
			if (Images.length == 0) { // there were only photos in the skipped OP
				document.getElementById('FTS-image').src = "http://l.yimg.com/g/images/spaceout.gif";
			} else {
				ImgNum = 0;
				chgImg(0);
			}
		}, false);
		optionscell.appendChild(skipopcheck);

		var skipoplabel = document.createElement('label');
		skipoplabel.setAttribute('for', 'FTS-skipop');
		skipoplabel.innerHTML = 'skip OP';
		skipoplabel.setAttribute('style', 'color: white;');
		optionscell.appendChild(skipoplabel);

		var controlcell = document.createElement('td');
		controlcell.setAttribute('style', 'width: 30%; align: center;');
		controlcell.setAttribute('align', 'center');
		toprow.appendChild(controlcell);

		function createControlButton(data) {
			button = document.createElement('button');
			button.setAttribute('class', data['class']);
			button.setAttribute('style', 'padding: 0px 15px;');
			if (data.id) button.id = data.id;
			button.innerHTML = data.label;
			button.title = data.title ? data.title : data.label;
			button.addEventListener('click', data.click, false);
			return button;
		}

		controlcell.appendChild(createControlButton({
			'class': 'CancelButt',
			title: 'First',
			label: '|<',
			click: function () { ImgNum = 0; chgImg(0); }
		}));

		controlcell.appendChild(createControlButton({
			'class': 'CancelButt',
			title: 'Previous',
			label: '<<',
			click: function () { chgImg(-1); }
		}));

		controlcell.appendChild(createControlButton({
			'class': 'Butt',
			id: 'FTS-playbutton',
			label: 'Play',
			click: function () { 
				auto();
				document.getElementById('FTS-playbutton').innerHTML = lock ? 'Stop' : 'Play';
				document.getElementById('FTS-playbutton').title = lock ? 'Stop' : 'Play';
			}
		}));

		controlcell.appendChild(createControlButton({
			'class': 'CancelButt',
			title: 'Next',
			label: '>>',
			click: function () { chgImg(1); }
		}));

		controlcell.appendChild(createControlButton({
			'class': 'CancelButt',
			title: 'Last',
			label: '>|',
			click: function () { ImgNum = Images.length-1; chgImg(0); }
		}));

		var space = document.createElement('span');
		space.innerHTML = '&nbsp;';
		controlcell.appendChild(space);

		var counter = document.createElement('span');
		counter.id = 'FTS-counter';
		counter.setAttribute('style', 'color: white;');
		controlcell.appendChild(counter);

		var rightcell = document.createElement('td');
		rightcell.setAttribute('style', 'width: 35%; align: right; padding: 0px 20px;'); // avoid scrollbar
		rightcell.setAttribute('align', 'right');
		toprow.appendChild(rightcell);

		rightcell.appendChild(createControlButton({
			'class': 'DeleteButt',
			label: 'X',
			title: 'Close',
			click: function () { 
				if (lock) { // stop slideshow, if running
					lock = false;
					window.clearInterval(run);
				}
				// reset
				ImgNum = 0;
				slideshow.parentNode.removeChild(slideshow);
			}
		}));

		var imageDiv = document.createElement('div');
		imageDiv.setAttribute('style', 'display: block; width: 100%; height: 100%; align: center;');
		slideshow.appendChild(imageDiv);

		var slideshowImage = document.createElement('img');
		slideshowImage.name = "slideshow";
		slideshowImage.id = 'FTS-image';
		slideshowImage.setAttribute('style', 'max-width: ' + window.innerWidth + '; max-height: ' + ( window.innerHeight - toprowtable.offsetHeight - 2) + ';');
		imageDiv.appendChild(slideshowImage);

		// filter OP
		if (GM_getValue('skipop', false) == "true" || GM_getValue('skipop', false) == true) {
			skipopcheck.click();
		}

		// set the correct size
		if (GM_getValue('size','posted') != 'posted') {
			loadImages(GM_getValue('size', 'posted'));
		}

		chgImg(0);
	}

	if (photos.length > 0) {
		var discussTopic = document.getElementById('DiscussTopic');
		var slideshowbutton = document.createElement('span');
		slideshowbutton.setAttribute('class', 'DisabledButt');
		slideshowbutton.setAttribute('style', 'cursor: pointer;');
		slideshowbutton.addEventListener('click', function () { createSlideshow(); }, false);
		var anchor = document.createElement('a');
		anchor.setAttribute('id', 'SlideshowButton');
		anchor.innerHTML = 'Slideshow';
		var icon = document.createElement('span');
		anchor.appendChild(icon);
		slideshowbutton.appendChild(anchor);
		discussTopic.parentNode.insertBefore(slideshowbutton,discussTopic);
		
	}
}

})();
