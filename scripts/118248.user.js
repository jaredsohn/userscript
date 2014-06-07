// ==UserScript==
// @name           JimmySmiles
// @version        1.2
// @namespace      22century.livejournal.com
// @author         22century
// @include        *.wikipedia.org/*
// ==/UserScript==

new function(){
	var jimmy = {
		parent: {},
		box   : {},
		image : {},
		eye   : [],
		//
		init: function(){
			this.box = document.createElement('div');
			with (this.box.style) {
				position = 'absolute';
				display  = 'inline-block';
				left     = '0px';
				top      = '0px';
			}
			window.addEventListener('load',setTimeout(this.bind,2000),false);
			delete this.init;
		},
		bind: function(){
			var noctice  = document.getElementById('centralNotice');
			jimmy.parent = noctice.querySelector('div[id^=B11_Donate_Jimmy]');
			if (!jimmy.parent) return false;
			var bgImg = document.defaultView.getComputedStyle(jimmy.parent,null).getPropertyValue('background-image');
			
			if (bgImg.indexOf('Jimmy_kevin_spacey')!=-1) {
				// image1
				jimmy.eye = [35,45,55,72,82,92];
			} else if (bgImg.indexOf('Jimmy_jacket_face')!=-1) {
				// image2
				jimmy.eye = [70,85,100,130,145,160];
			} else {
				// unknown image
				return false;
			}
			
			jimmy.parent.style.position = 'relative';
			jimmy.image = new Image();
			jimmy.image.src = bgImg.match(/(\/\/.*\.(?:png|gif|jpg))/, '$1')[1];
			jimmy.image.addEventListener('load',jimmy.create,false);
			
			var n = 0, v = 0.1, count = 0, limit = 10*100;
			var min = Math.abs(v), max = 1;
			var timerId;
			
			return (function(){
				timerId = setInterval(function(){
					jimmy.smile(n+=v);
					if (n>=max||n<min) v=v*-1;
					if (++count>limit) clearInterval(timerId);
				},25);
			})();
		},
		create: function(){
			var ntlHeight = jimmy.image.naturalHeight;
			var ntlWidth  = jimmy.image.naturalWidth;
			var elm = document.createElement('div');
			
			with (elm.style) {
				display = 'inline-block';
				width   = '1px';
				height  = ntlHeight+'px';
				backgroundImage  = 'url('+jimmy.image.src+')';
				backgroundRepeat = 'no-repeat';
			}
			for (var i=0,l=ntlWidth;i<l;i++) {
				cln = elm.cloneNode(true);
				cln.style.backgroundPosition = (i*-1)+'px 0px'; 
				jimmy.box.appendChild(cln);
			}
			jimmy.parent.appendChild(jimmy.box);
		},
		smile: function(n){
			var elms = jimmy.box.getElementsByTagName('div');
			var x=0,y=0;
			var eye = jimmy.eye;
			for (var i=0,l=elms.length;i<l;i++) {
				x = i*-1;
				if (i>eye[0] && i<=eye[1]) {
					y -= n;
				} else if (i>eye[1] && i<=eye[2]) {
					y += n;
				} else if (i>eye[3] && i<=eye[4]) {
					y -= n;
				} else if (i>eye[4] && i<=eye[5]) {
					y += n;
				} else {
					y = 0;
				}
				elms[i].style.backgroundPosition = x+'px '+y+'px';
			}
		}
	}
	jimmy.init();
}
