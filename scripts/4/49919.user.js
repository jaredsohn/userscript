// ==UserScript==
// @name           neoGAF - Avatar Failures
// @version        1.1

// @namespace      http://www.neogaf.com/
// @include        http://www.neogaf.com/forum/*
// @description    Adds "Fail" To Avatars That Break The Image Size.

// @author         hateradio
// @namespace      http://hateradio.uni.cc

// @date           01/02/2009
// @since          28/05/2010

// Copyright (c) 2009-2010, hateradio

// ==/UserScript==

//<!-- begin hide

function failure(){

	this.im = new Image();
	this.style = document.createElement('style');
	this.css = 0;
	this.failbg = 'http://i7.photobucket.com/albums/y290/UpxR/fail.png';
	this.reg = /Avatar/;
	this.avatars = document.getElementsByTagName('img');
	
	this.thecss=function(){		
		// colors cc0000 or EC933F, image
		this.css = '.fail img { opacity: .1 } .fail { background-color: #cc0000; background-image: url('+this.failbg+'); background-repeat: no-repeat; background-position: center; display: block; width: 90px; cursor: pointer } .fail img:hover { opacity: 1 }';
		this.style.setAttribute('type','text/css');
		this.style.appendChild(document.createTextNode(this.css));
		document.body.appendChild(this.style);
	}

	// spits size out
	this.size=function(el){
		this.im.src = el.getAttribute("src");		
		alert('width: '+this.im.width+' height: '+this.im.height+' (scaled: '+el.width+'x'+el.height+')');
	}
	
	this.fail=function(){
		alert(this.avatars.length);
	}
	
	this.enumerate=function(){
		for(i in this.avatars){
			if(this.avatars[i].width == 90 && this.reg.test(this.avatars[i].getAttribute('title'))){
				if(this.avatars[i].height > 120){
					this.avatars[i].parentNode.setAttribute('class','fail');
					this.avatars[i].parentNode.removeAttribute('href');
					this.avatars[i].addEventListener("click", function() { fail.size(this); return false; }, false);
				}
			}
		}
	}
}

var fail = new failure();
fail.thecss();
fail.enumerate();

	
// end hide -->