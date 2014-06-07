// ==UserScript==
// @name           Wasting Your Life - Post Image Re-size
// @version        0.1.1
// @description    This script re-sizes images in threads to a width of 650px.

// @date           06/21/2010
// @since          06/21/2010

// @author         chapel
// @credit		   hateradio

// @include        http://metal-torrents.com/YWL/forums/showthread.php*
// @include        http://*.wastingyourlife.com/forums/showthread.php*
// ==/UserScript==

function resize(){

	this.min = 650; // px
	this.img = new Image();
	this.all = document.getElementsByTagName('img');
	this.loc = document.getElementById('poststop');
	this.div = document.createElement("div");
	this.style = document.createElement('style');
	this.css = 0;
	
	this.ar=function(){
		for(i in this.all){
			if(this.all[i].width > this.min){
				this.img.src = this.all[i].src;
				if(this.img.width > this.min){
					if(this.all[i].parentNode.getAttribute('href')){ this.all[i].parentNode.removeAttribute('href'); }
					this.all[i].setAttribute('class','shrink');
					this.all[i].title = 'Click for full-size '; // + this.all.length;
					this.all[i].addEventListener('click', function(){ s.change(this); return false; }, false);
				}
			}
		}
	}
	
	this.change=function(obj){
		obj.getAttribute('class') == 'shrink' ? obj.setAttribute('class','shrunk') : obj.setAttribute('class','shrink');
	}
	
	this.thecss=function(){
		this.css = '\n\n\n/* re-size css */\n#sizer { position: fixed; bottom:0; right: 0; z-index: 1000; cursor: pointer; height: 18px; width: 0px; padding: 4px 0px 0px 22px;background-image: url(http://i46.tinypic.com/2q9a0bc.gif); background-repeat: no-repeat; background-position: 4px 2px; overflow: hidden; font-size: 11px;  }\
		\n#sizer:hover { background-color: #fff; width: 73px; }\
		\n.shrink, .shrunk { display: block; max-width: 650px; cursor: pointer; border: 2px solid #fff; } .shrunk { max-width: 10000px  } \n.shrink:hover, .shrunk:hover { border: 2px solid #666}';
		this.style.setAttribute('type','text/css');
		this.style.appendChild(document.createTextNode(this.css));
		document.body.appendChild(this.style);
	}
	
	this.init=function(){

		this.force();
	
		if(this.all.length <= 75){ this.time(5000); } // 5 secs
		else if(this.all.length > 75 && this.all.length < 120){ this.time(10000); } // 10 secs
		else if(this.all.length >= 120){ this.time(15000); } // 15 secs
		else {	return false; 	}

		this.thecss();
	
	}
	
	this.force=function() {
	
		this.div.id = 'sizer';
		this.div.title = 'Force Re-size';
		this.div.appendChild(document.createTextNode('Force Re-size'));
		this.div.addEventListener('click', function(){ s.ar(); return false; }, false);
		this.loc.parentNode.insertBefore(this.div, this.loc);

	}
	
	this.time=function(n){
	
		/*
		
		Note:

		The re-sizing will start in several seconds (n ms) after the page loads
		so that it allows images to load as well, this is so that more
		images are affected by the script.

		Why?
		
		The forum doesn't put width or height attributes on images.
		
		Instead I'm using Image() to get those values for me.

		If images aren't loaded, their widths are unknown, this makes
		it imposible for the Image() object to tell if an image's width
		is greater than defined.

		*/
	
		window.setTimeout(function() { s.ar(); }, n);
	}

}

var s = new resize();
s.init();