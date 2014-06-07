// ==UserScript==
// @name        Darken
// @namespace   andysouter.net/userscripts/darken
// @description Darken web pages
// @include     *
// @version     1
// @grant		none
// ==/UserScript==

window.darken = {
	init: function(){
		var darkness = localStorage['darken'];
		if(typeof darkness == "undefined") darkness = 0;
		var cover = document.createElement("div");
		cover.setAttribute("style", "position:fixed; top:0px; left:0px; right:0px; bottom:0px; background:#000000; opacity:" + (darkness *0.8)+ "; z-index:9999998; pointer-events:none");
		var flap = document.createElement("div");
		flap.setAttribute("style", "position:fixed; top:-32px; right:6%; height:38px; background:rgba(0,0,0,0.15); width:180px; -moz-transition:300ms top; -webkit-transition:300ms top; transition:300ms top; z-index:9999999");
		flap.onmouseenter = function(ev){
			this.style.top = "0px";
		};
		flap.onmouseleave = function(ev){
			this.style.top = "-32px";
			this.slider.mouseDown = false;
		};
		var slider = document.createElement("div");
		slider.setAttribute("style", "position:absolute; left:4px; right:4px; top:4px; bottom:8px; background:rgba(255,255,255,0.4)");
		slider.mouseDown = false;
		slider.onmousedown = function(ev){
			this.mouseDown = true;
			this.onmousemove(ev);
			return false;
		};
		slider.onmouseup = function(ev){
			this.mouseDown = false;
		};
		slider.onmousemove = function(ev){
			if(!this.mouseDown) return;
			var x = ev.clientX - (this.offsetLeft + this.offsetParent.offsetLeft);
			x = x / this.clientWidth;
			this.style.boxShadow = "inset " + (x*this.clientWidth) + "px 0px 0px rgba(0,0,0,0.7)";
			cover.style.opacity = x * 0.8;
			localStorage["darken"] = x;
		}
		flap.appendChild(slider);
		flap.slider = slider;
		slider.cover = cover;
		document.body.appendChild(cover);
		document.body.appendChild(flap);
		slider.style.boxShadow = "inset " + (darkness * slider.clientWidth) + "px 0px 0px rgba(0,0,0,0.7)";
	}
}

darken.init();