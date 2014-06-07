// ==UserScript==
// @name			Slidify
// @namespace		http://dial-a-davidson.net
// @description		Creates a slideshow of every image in the thread
// @version 		1.0.2
// @include                     http://boards.4chan.org/*/res/*
// @include                     http://*.tumblr.com/*
// @include                     https://boards.4chan.org/*/res/*
// @include                     https://*.tumblr.com/*
// @match                       http://*.tumblr.com/*
// @match                       http://boards.4chan.org/*/res/*
// @match                       https://*.tumblr.com/*
// @match                       https://boards.4chan.org/*/res/*
// ==/UserScript==


// the guts of this userscript - all functions and jQuery calls must be inside main
function jQmain() {
	var isInIframe = (window.location != window.parent.location) ? true : false;
	if(isInIframe) { return; }

	var IMG_SITE_SELECTORS = {
		"tumblr.com": {"anchors": false, "selector": "div.post img, div.photo img"},
		"4chan.org": {"anchors": true, "selector": "form[name=delform] a:parent[href$=jpeg], form[name=delform] a[href$=jpg], form[name=delform] a[href$=png], form[name=delform] a[href$=gif]"},
	}

	var baseHost = function(){
		var hostParts = document.location.hostname.split(".");
		return hostParts[hostParts.length - 2] + "." + hostParts[hostParts.length - 1];
	}


	// Image data - sandboxing inhibits local file access
	var playPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAqCAYAAAD4Uag9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkM4MTc5NTQ3RDhGMTFFMDgxMTFCNTYzQUUwREEyQzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkM4MTc5NTU3RDhGMTFFMDgxMTFCNTYzQUUwREEyQzYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozREFCM0FFQjdEODExMUUwODExMUI1NjNBRTBEQTJDNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozREFCM0FFQzdEODExMUUwODExMUI1NjNBRTBEQTJDNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiDTdmcAAAKOSURBVHja7JhNTxNBGIDfTUhIU9OTJwyJVzVBT/4K/4EHD+IFLujRozEx8eDBRCC1BIwKFlpaS0ORGJGQqFjTVFrtsuyyFCqIhVIhQLu77fgObozxI9TutG7JbPJkd97dmczT+a5ACIGjdgmCQAQuxsW4GBfjYlyMi3GxuokBFWMBXk1IJ+JkVUELdWEqNnC5vZ04HA6auIm4jooY2cxtkXlpgXR0dBKn00mDt5DjDS/2eT37A3FeIl1dV4nL5aIvbyOt9RRjNnnQAbuSWfstvrOzDQP9/eB290I+n7+LoXuIVKnYf58VaWGKuvzX93t7uzA0OAi9Pd2Qy232YIiSaAixlKQc+l2hUAC/bxj6PPdhbXX1IYa6kTe2FptLihV/Xy6XYCwUQkE3LC2pw2YXnTkY+HYTexdLVJV3IjKO49ADsrwQMltw8ruXTcRezcYslTH9cgoeoKAops5jMmpFrInlVkbTNEv5T50+A21nz4GiyG91XW+mRVZbFlOxoqZXlW9jIwveocfwLBKGYrF4B0M3rEgxF9P0fxP7lFmB4OgIPJ+cAMMwHmGISqnIrtW6MO6KlYml0yoEfF6YmZ7KYnIc6UMyyBZd8uikaSsx/RCxxUUZAn4vRGdf0y1KGPEg68hXU8hgIVW3riimPkAoMALJxHvaKk/pSQD58osQ04NhTcWSc3EYC/pAkSUZkwHkiSm0jezXQqg2XVE3Du7xWBQi4SAsp9WPmPQjo0jWFCrUUsjy0eAPR4XYxUtXSMuJVpqII9eRNqQFOWb+iEIjHluu4e0CEkRe0OWJnlro8oaUqmkhu2ypTpqP+z8Jla10ObuINZsSJatCthLj/ytyMS7GxbgYF+Ni7MS+CTAAs5aAGPsbqywAAAAASUVORK5CYII=";
	var pausePng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAqCAYAAAD4Uag9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkM4MTc5NTg3RDhGMTFFMDgxMTFCNTYzQUUwREEyQzYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkM4MTc5NTk3RDhGMTFFMDgxMTFCNTYzQUUwREEyQzYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCQzgxNzk1NjdEOEYxMUUwODExMUI1NjNBRTBEQTJDNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQzgxNzk1NzdEOEYxMUUwODExMUI1NjNBRTBEQTJDNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuoETW0AAADfSURBVHja7JnBDcMgDEXtqtswQts1WajtCAwTg+QmPQfwwaqAfks+8Q9+fMeyAqsqrRbMrBdaNAAGMIABDGAAA9jqYPsqE491ppLRqnGpxXNXDCHo8/U+PXvcb5RSYovGY1e8ejp2XFLOpXpm1XiEMxg1irZrBgRTkpy7jvU0APslWJY+WE8zpmMGMBG04kiOicExmQ9sM7TiNl8rUqPN7BoMD4x7TMUKGDWKJjVrxmxFbPeTTcVS+o71NG7FeOUe8fupnGe0ahzqUMYz0j//pQIYwAAGMIABDGA+8RFgAFsPxgZJaDDDAAAAAElFTkSuQmCC";
	// Close icon from NuoveXT Icons by Saki
	var closeButtonPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADkElEQVR42u2XS08TURTHWxIgPPuiAWOhtJ0oCU34Ai4woaxEAZW4MX4A49aNazdujR/AuDGI+MCVECXRL2CCiZjSQqkGKLUt71cYf7dpCdQ+6EzTG5M5m5m2N53/79z/PeeM2fSfh1m2AANAtgADQLYAA0C2AANAtgADQLYAA6ASf2Kz2SypVOppS0vLE65zxdZaLBb/1tbWI673/xDSAZxOpyWRSIy7XK7A6urqQmNj41A8Hv+Rb63D4ejZ2dmZ6ujo8C0vL88CfisWi+mC0AWAeEcymXzV3d3dT/bNBwcHpmAwGG1ubg6sr6+fgciIn/b5fK7a2lp1e3vbvLi4+IWduAlErOoAbW1tVuwyKcQj2GQmxPdAqAsEOzHCTsxlxPsR/wbxSl1dnUklxHqspALxFYgbMCSqBsADrWRw3OPxBIR4Qs0CCHFAmEOhUJBdGRLfbW5uTnm9Xl99ff3Jmux6IEys/dTa2nqLI1E2hCaAmpqa511dXXfxcME1h4eHwk6/hE4yfxHbFFyLDU1LS0vjx8fHd6oCQGZ7EPgWYZfJ6pmMnr7f399P35+2Te4acW5wXIg1o1jyW1UARJB9ZXd3dwYINw/PK67UfUb8b87LIOfluxYduqqQ3W5XOJwfgLgkslxOCPF4P4z461rF6wYQwU70sBMl7ZRjG1WIb2hoGEV82bapKIAI+oFCpTmXnbK24RwNrq2tac58pQF6KYcfAbhQrNqIyABEKJsDAASlA3AO+rDQJOK9xapNbnUC4mdTU9NwobGjKgB02F4O8XualCdfkyp2L5odEPM0wmuMHZp3QjMAme8l8+eyTaHI2omdGGAnNEFobWR9R0dHJW0jqo34WKLZCYh51gzTyMq2k9ZR4qXb7R6jhJaqNlE+mhRFSU+g+QBEMAOpkUjkBaPEvaoAWK1WG1VnAu9fZfv/+T3TpBbwd3qYY216mMvX7MQwFw6HZ9jVMd4rklUBEME4bdvY2HjHOH1FQOSO0zSpETKbHqfZKf/e3t6ZcVo8OzNOz5KQUcbpssXrAshAOIF4LSDI9oltGA8CueWRQ59+ocnaCfHiheYz4m8jPq5Vg+4+AISdcXiis7Ozf2VlRWR+iMznPYwCgso11d7e7otGo9OIH6OEpvQ8vyKdGCF2duIZVnrMSFH0pR6v+3kZesj1AVVHl/iKAcgMA0B2GACywwCQHQaA7DAAZIcBIDv+Aj5kTU+gFpU3AAAAAElFTkSuQmCC";

	// Set jQuery easing library
	jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});
	
	// BrowserDetect from QuirksMode
	var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(a){for(var b=0;b<a.length;b++){var c=a[b].string;var d=a[b].prop;this.versionSearchString=a[b].versionSearch||a[b].identity;if(c){if(c.indexOf(a[b].subString)!=-1)return a[b].identity}else if(d)return a[b].identity}},searchVersion:function(a){var b=a.indexOf(this.versionSearchString);if(b==-1)return;return parseFloat(a.substring(b+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};
	BrowserDetect.init();

	// Determine correct fullscreen command to display
	var fullscreen_key_string;
	if(BrowserDetect.OS === "Mac"){
		fullscreen_key_string = "Shift+Cmd+F";
	}
	else {
		fullscreen_key_string = "F11";
	}

	// Create control HTML and insert immediately
	var slidify_control_html = $('\
		<div id="slidify_control" class="reply">\
			<h2>Slidify</h2>\
			<img id="slidify_control_close_button" src="' + closeButtonPng + '">\
			<input type="checkbox" name="random" id="chan_slideshow_random"/>\
			<label for="chan_slideshow_random">Random</label><br />\
			<input type="checkbox" name="fit_whole_image" id="chan_slideshow_fit_whole" checked/>\
			<label for="chan_slideshow_fit_whole">Shrink image to fit</label><br />\
			<input type="text" name="slide_dur" value="5" size="3" id="chan_slideshow_dur" /> Num seconds per slide<br />\
			<input type="button" id="slidify_start_slideshow" value="Start the show!" />\
			<hr />\
			<b>Play/pause</b>: Space bar<br />\
			<b>Prev image</b>: Z, up/left arrow<br />\
			<b>Next image</b>: X, right/down arrow<br />\
			<b>Quit</b>: Q, Escape\
			<hr />\
			<b>Full screen</b>: ' + fullscreen_key_string + '\
		</div>');
	// $(document.body).append(slidify_control_html);
	$(document.body).append(slidify_control_html);
		
	// Create slideshow HTML and insert immediately
	var slideshow_html = $('\
		<!--Control Bar-->\
		<div id="controls-wrapper" class="load-item">\
			<div id="controls">\
			\
				<a id="play-button"><img id="pauseplay" src="' + pausePng + '"/></a>\
				\
				<!--Slide counter-->\
				<div id="slidecounter">\
					<span class="slidenumber"></span> / <span class="totalslides"></span>\
				</div>\
			\
			</div>\
		</div>\
	');
	// $(document.body).append(slideshow_html);
	$(document.body).append(slideshow_html);

	/*
		Supersized - Fullscreen Slideshow jQuery Plugin
		Version : 3.2.6
		Site	: www.buildinternet.com/project/supersized
		
		Author	: Sam Dunn
		Company : One Mighty Roar (www.onemightyroar.com)
		License : MIT License / GPL License
	*/
	var load_supersized = function($){$(document).ready(function(){$('body').append('<div id="supersized-loader"></div><ul id="supersized"></ul>')});$.supersized=function(options){var el='#supersized',base=this;base.$el=$(el);base.el=el;vars=$.supersized.vars;base.$el.data("supersized",base);api=base.$el.data('supersized');base.init=function(){$.supersized.vars=$.extend($.supersized.vars,$.supersized.themeVars);$.supersized.vars.options=$.extend({},$.supersized.defaultOptions,$.supersized.themeOptions,options);base.options=$.supersized.vars.options;base._build()};base._build=function(){var thisSlide=0,slideSet='',markers='',markerContent,thumbMarkers='',thumbImage;while(thisSlide<=base.options.slides.length-1){switch(base.options.slide_links){case'num':markerContent=thisSlide;break;case'name':markerContent=base.options.slides[thisSlide].title;break;case'blank':markerContent='';break}slideSet=slideSet+'<li class="slide-'+thisSlide+'"></li>';if(thisSlide==base.options.start_slide-1){if(base.options.slide_links)markers=markers+'<li class="slide-link-'+thisSlide+' current-slide"><a>'+markerContent+'</a></li>';if(base.options.thumb_links){base.options.slides[thisSlide].thumb?thumbImage=base.options.slides[thisSlide].thumb:thumbImage=base.options.slides[thisSlide].image;thumbMarkers=thumbMarkers+'<li class="thumb'+thisSlide+' current-thumb"><img src="'+thumbImage+'"/></li>'}}else{if(base.options.slide_links)markers=markers+'<li class="slide-link-'+thisSlide+'" ><a>'+markerContent+'</a></li>';if(base.options.thumb_links){base.options.slides[thisSlide].thumb?thumbImage=base.options.slides[thisSlide].thumb:thumbImage=base.options.slides[thisSlide].image;thumbMarkers=thumbMarkers+'<li class="thumb'+thisSlide+'"><img src="'+thumbImage+'"/></li>'}}thisSlide++}if(base.options.slide_links)$(vars.slide_list).html(markers);if(base.options.thumb_links&&vars.thumb_tray.length){$(vars.thumb_tray).append('<ul id="'+vars.thumb_list.replace('#','')+'">'+thumbMarkers+'</ul>')}$(base.el).append(slideSet);if(base.options.thumbnail_navigation){vars.current_slide-1<0?prevThumb=base.options.slides.length-1:prevThumb=vars.current_slide-1;$(vars.prev_thumb).show().html($("<img/>").attr("src",base.options.slides[prevThumb].image));vars.current_slide==base.options.slides.length-1?nextThumb=0:nextThumb=vars.current_slide+1;$(vars.next_thumb).show().html($("<img/>").attr("src",base.options.slides[nextThumb].image))}base._start()};base._start=function(){if(base.options.start_slide){vars.current_slide=base.options.start_slide-1}else{vars.current_slide=Math.floor(Math.random()*base.options.slides.length)}var linkTarget=base.options.new_window?' target="_blank"':'';if(base.options.performance==3){base.$el.addClass('speed')}else if((base.options.performance==1)||(base.options.performance==2)){base.$el.addClass('quality')}if(base.options.random){arr=base.options.slides;for(var j,x,i=arr.length;i;j=parseInt(Math.random()*i),x=arr[--i],arr[i]=arr[j],arr[j]=x);base.options.slides=arr}if(base.options.slides.length>1){if(base.options.slides.length>2){vars.current_slide-1<0?loadPrev=base.options.slides.length-1:loadPrev=vars.current_slide-1;var imageLink=(base.options.slides[loadPrev].url)?"href='"+base.options.slides[loadPrev].url+"'":"";var imgPrev=$('<img src="'+base.options.slides[loadPrev].image+'"/>');var slidePrev=base.el+' li:eq('+loadPrev+')';imgPrev.appendTo(slidePrev).wrap('<a '+imageLink+linkTarget+'></a>').parent().parent().addClass('image-loading prevslide');imgPrev.load(function(){$(this).data('origWidth',$(this).width()).data('origHeight',$(this).height());base.resizeNow()})}}else{base.options.slideshow=0}imageLink=(api.getField('url'))?"href='"+api.getField('url')+"'":"";var img=$('<img src="'+api.getField('image')+'"/>');var slideCurrent=base.el+' li:eq('+vars.current_slide+')';img.appendTo(slideCurrent).wrap('<a '+imageLink+linkTarget+'></a>').parent().parent().addClass('image-loading activeslide');img.load(function(){base._origDim($(this));base.resizeNow();base.launch();if(typeof theme!='undefined'&&typeof theme._init=="function")theme._init()});if(base.options.slides.length>1){vars.current_slide==base.options.slides.length-1?loadNext=0:loadNext=vars.current_slide+1;imageLink=(base.options.slides[loadNext].url)?"href='"+base.options.slides[loadNext].url+"'":"";var imgNext=$('<img src="'+base.options.slides[loadNext].image+'"/>');var slideNext=base.el+' li:eq('+loadNext+')';imgNext.appendTo(slideNext).wrap('<a '+imageLink+linkTarget+'></a>').parent().parent().addClass('image-loading');imgNext.load(function(){$(this).data('origWidth',$(this).width()).data('origHeight',$(this).height());base.resizeNow()})}base.$el.css('visibility','hidden');$('.load-item').hide()};base.launch=function(){base.$el.css('visibility','visible');$('#supersized-loader').remove();if(typeof theme!='undefined'&&typeof theme.beforeAnimation=="function")theme.beforeAnimation('next');$('.load-item').show();if(base.options.keyboard_nav){$(document.documentElement).keyup(function(event){if(vars.in_animation)return false;if((event.keyCode==37)||(event.keyCode==40)||(event.keyCode==90)||(event.keyCode==122)){clearInterval(vars.slideshow_interval);base.prevSlide()}else if((event.keyCode==39)||(event.keyCode==38)||(event.keyCode==88)||(event.keyCode==120)){clearInterval(vars.slideshow_interval);base.nextSlide()}else if(event.keyCode==32&&!vars.hover_pause){clearInterval(vars.slideshow_interval);base.playToggle()}})}if(base.options.slideshow&&base.options.pause_hover){$(base.el).hover(function(){if(vars.in_animation)return false;vars.hover_pause=true;if(!vars.is_paused){vars.hover_pause='resume';base.playToggle()}},function(){if(vars.hover_pause=='resume'){base.playToggle();vars.hover_pause=false}})}if(base.options.slide_links){$(vars.slide_list+'> li').click(function(){index=$(vars.slide_list+'> li').index(this);targetSlide=index+1;base.goTo(targetSlide);return false})}if(base.options.thumb_links){$(vars.thumb_list+'> li').click(function(){index=$(vars.thumb_list+'> li').index(this);targetSlide=index+1;api.goTo(targetSlide);return false})}if(base.options.slideshow&&base.options.slides.length>1){if(base.options.autoplay&&base.options.slides.length>1){vars.slideshow_interval=setInterval(base.nextSlide,base.options.slide_interval)}else{vars.is_paused=true}$('.load-item img').bind("contextmenu mousedown",function(){return false})}$(window).resize(function(){base.resizeNow()})};base.resizeNow=function(){return base.$el.each(function(){$('img',base.el).each(function(){thisSlide=$(this);var ratio=(thisSlide.data('origHeight')/thisSlide.data('origWidth')).toFixed(2);var browserwidth=base.$el.width(),browserheight=base.$el.height(),offset;if(base.options.fit_always){if((browserheight/browserwidth)>ratio){resizeWidth()}else{resizeHeight()}}else{if((browserheight<=base.options.min_height)&&(browserwidth<=base.options.min_width)){if((browserheight/browserwidth)>ratio){base.options.fit_landscape&&ratio<1?resizeWidth(true):resizeHeight(true)}else{base.options.fit_portrait&&ratio>=1?resizeHeight(true):resizeWidth(true)}}else if(browserwidth<=base.options.min_width){if((browserheight/browserwidth)>ratio){base.options.fit_landscape&&ratio<1?resizeWidth(true):resizeHeight()}else{base.options.fit_portrait&&ratio>=1?resizeHeight():resizeWidth(true)}}else if(browserheight<=base.options.min_height){if((browserheight/browserwidth)>ratio){base.options.fit_landscape&&ratio<1?resizeWidth():resizeHeight(true)}else{base.options.fit_portrait&&ratio>=1?resizeHeight(true):resizeWidth()}}else{if((browserheight/browserwidth)>ratio){base.options.fit_landscape&&ratio<1?resizeWidth():resizeHeight()}else{base.options.fit_portrait&&ratio>=1?resizeHeight():resizeWidth()}}}function resizeWidth(minimum){if(minimum){if(thisSlide.width()<browserwidth||thisSlide.width()<base.options.min_width){if(thisSlide.width()*ratio>=base.options.min_height){thisSlide.width(base.options.min_width);thisSlide.height(thisSlide.width()*ratio)}else{resizeHeight()}}}else{if(base.options.min_height>=browserheight&&!base.options.fit_landscape){if(browserwidth*ratio>=base.options.min_height||(browserwidth*ratio>=base.options.min_height&&ratio<=1)){thisSlide.width(browserwidth);thisSlide.height(browserwidth*ratio)}else if(ratio>1){thisSlide.height(base.options.min_height);thisSlide.width(thisSlide.height()/ratio)}else if(thisSlide.width()<browserwidth){thisSlide.width(browserwidth);thisSlide.height(thisSlide.width()*ratio)}}else{thisSlide.width(browserwidth);thisSlide.height(browserwidth*ratio)}}};function resizeHeight(minimum){if(minimum){if(thisSlide.height()<browserheight){if(thisSlide.height()/ratio>=base.options.min_width){thisSlide.height(base.options.min_height);thisSlide.width(thisSlide.height()/ratio)}else{resizeWidth(true)}}}else{if(base.options.min_width>=browserwidth){if(browserheight/ratio>=base.options.min_width||ratio>1){ thisSlide.height(browserheight);thisSlide.width(browserheight/ratio)}else if(ratio<=1){thisSlide.width(base.options.min_width);thisSlide.height(thisSlide.width()*ratio)}}else{thisSlide.height(browserheight);thisSlide.width(browserheight/ratio)}}};if(thisSlide.parents('li').hasClass('image-loading')){$('.image-loading').removeClass('image-loading')}if(base.options.horizontal_center){$(this).css('left',(browserwidth-$(this).width())/2)}if(base.options.vertical_center){$(this).css('top',(browserheight-$(this).height())/2)}});if(base.options.image_protect){$('img',base.el).bind("contextmenu mousedown",function(){return false})}return false})};base.nextSlide=function(){if(vars.in_animation||!api.options.slideshow)return false;else vars.in_animation=true;clearInterval(vars.slideshow_interval);var slides=base.options.slides,liveslide=base.$el.find('.activeslide');$('.prevslide').removeClass('prevslide');liveslide.removeClass('activeslide').addClass('prevslide');vars.current_slide+1==base.options.slides.length?vars.current_slide=0:vars.current_slide++;var nextslide=$(base.el+' li:eq('+vars.current_slide+')'),prevslide=base.$el.find('.prevslide');if(base.options.performance==1)base.$el.removeClass('quality').addClass('speed');loadSlide=false;vars.current_slide==base.options.slides.length-1?loadSlide=0:loadSlide=vars.current_slide+1;var targetList=base.el+' li:eq('+loadSlide+')';if(!$(targetList).html()){var linkTarget=base.options.new_window?' target="_blank"':'';imageLink=(base.options.slides[loadSlide].url)?"href='"+base.options.slides[loadSlide].url+"'":"";var img=$('<img src="'+base.options.slides[loadSlide].image+'"/>');img.appendTo(targetList).wrap('<a '+imageLink+linkTarget+'></a>').parent().parent().addClass('image-loading').css('visibility','hidden');img.load(function(){base._origDim($(this));base.resizeNow()})};if(base.options.thumbnail_navigation==1){vars.current_slide-1<0?prevThumb=base.options.slides.length-1:prevThumb=vars.current_slide-1;$(vars.prev_thumb).html($("<img/>").attr("src",base.options.slides[prevThumb].image));nextThumb=loadSlide;$(vars.next_thumb).html($("<img/>").attr("src",base.options.slides[nextThumb].image))}if(typeof theme!='undefined'&&typeof theme.beforeAnimation=="function")theme.beforeAnimation('next');if(base.options.slide_links){$('.current-slide').removeClass('current-slide');$(vars.slide_list+'> li').eq(vars.current_slide).addClass('current-slide')}nextslide.css('visibility','hidden').addClass('activeslide');switch(base.options.transition){case 0:case'none':nextslide.css('visibility','visible');vars.in_animation=false;break;case 1:case'fade':nextslide.animate({opacity:0},0).css('visibility','visible').animate({opacity:1,avoidTransforms:false},base.options.transition_speed,function(){base.afterAnimation()});break;case 2:case'slideTop':nextslide.animate({top:-base.$el.height()},0).css('visibility','visible').animate({top:0,avoidTransforms:false},base.options.transition_speed,function(){base.afterAnimation()});break;case 3:case'slideRight':nextslide.animate({left:base.$el.width()},0).css('visibility','visible').animate({left:0,avoidTransforms:false},base.options.transition_speed,function(){base.afterAnimation()});break;case 4:case'slideBottom':nextslide.animate({top:base.$el.height()},0).css('visibility','visible').animate({top:0,avoidTransforms:false},base.options.transition_speed,function(){base.afterAnimation()});break;case 5:case'slideLeft':nextslide.animate({left:-base.$el.width()},0).css('visibility','visible').animate({left:0,avoidTransforms:false},base.options.transition_speed,function(){base.afterAnimation()});break;case 6:case'carouselRight':nextslide.animate({left:base.$el.width()},0).css('visibility','visible').animate({left:0,avoidTransforms:false},base.options.transition_speed,function(){base.afterAnimation()});liveslide.animate({left:-base.$el.width(),avoidTransforms:false},base.options.transition_speed);break;case 7:case'carouselLeft':nextslide.animate({left:-base.$el.width()},0).css('visibility','visible').animate({left:0,avoidTransforms:false},base.options.transition_speed,function(){base.afterAnimation()});liveslide.animate({left:base.$el.width(),avoidTransforms:false},base.options.transition_speed);break}return false};base.prevSlide=function(){if(vars.in_animation||!api.options.slideshow)return false;else vars.in_animation=true;clearInterval(vars.slideshow_interval);var slides=base.options.slides,liveslide=base.$el.find('.activeslide');$('.prevslide').removeClass('prevslide');liveslide.removeClass('activeslide').addClass('prevslide');vars.current_slide==0?vars.current_slide=base.options.slides.length-1:vars.current_slide--;var nextslide=$(base.el+' li:eq('+vars.current_slide+')'),prevslide=base.$el.find('.prevslide');if(base.options.performance==1)base.$el.removeClass('quality').addClass('speed');loadSlide=vars.current_slide;var targetList=base.el+' li:eq('+loadSlide+')';if(!$(targetList).html()){var linkTarget=base.options.new_window?' target="_blank"':'';imageLink=(base.options.slides[loadSlide].url)?"href='"+base.options.slides[loadSlide].url+"'":"";var img=$('<img src="'+base.options.slides[loadSlide].image+'"/>');img.appendTo(targetList).wrap('<a '+imageLink+linkTarget+'></a>').parent().parent().addClass('image-loading').css('visibility','hidden');img.load(function(){base._origDim($(this));base.resizeNow()})};if(base.options.thumbnail_navigation==1){prevThumb=loadSlide;$(vars.prev_thumb).html($("<img/>").attr("src",base.options.slides[prevThumb].image));vars.current_slide==base.options.slides.length-1?nextThumb=0:nextThumb=vars.current_slide+1;$(vars.next_thumb).html($("<img/>").attr("src",base.options.slides[nextThumb].image))}if(typeof theme!='undefined'&&typeof theme.beforeAnimation=="function")theme.beforeAnimation('prev');if(base.options.slide_links){$('.current-slide').removeClass('current-slide');$(vars.slide_list+'> li').eq(vars.current_slide).addClass('current-slide')}nextslide.css('visibility','hidden').addClass('activeslide');switch(base.options.transition){case 0:case'none':nextslide.css('visibility','visible');vars.in_animation=false;base.afterAnimation();break;case 1:case'fade':nextslide.animate({opacity:0},0).css('visibility','visible').animate({opacity:1,avoidTransforms:false},base.options.transition_speed,function(){base.afterAnimation()});break;case 2:case'slideTop':nextslide.animate({top:base.$el.height()},0).css('visibility','visible').animate({top:0,avoidTransforms:false},base.options.transition_speed,function(){base.afterAnimation()});break;case 3:case'slideRight':nextslide.animate({left:-base.$el.width()},0).css('visibility','visible').animate({left:0,avoidTransforms:false},base.options.transition_speed,function(){base.afterAnimation()});break;case 4:case'slideBottom':nextslide.animate({top:-base.$el.height()},0).css('visibility','visible').animate({top:0,avoidTransforms:false},base.options.transition_speed,function(){base.afterAnimation()});break;case 5:case'slideLeft':nextslide.animate({left:base.$el.width()},0).css('visibility','visible').animate({left:0,avoidTransforms:false},base.options.transition_speed,function(){base.afterAnimation()});break;case 6:case'carouselRight':nextslide.animate({left:-base.$el.width()},0).css('visibility','visible').animate({left:0,avoidTransforms:false},base.options.transition_speed,function(){base.afterAnimation()});liveslide.animate({left:0},0).animate({left:base.$el.width(),avoidTransforms:false},base.options.transition_speed);break;case 7:case'carouselLeft':nextslide.animate({left:base.$el.width()},0).css('visibility','visible').animate({left:0,avoidTransforms:false},base.options.transition_speed,function(){base.afterAnimation()});liveslide.animate({left:0},0).animate({left:-base.$el.width(),avoidTransforms:false},base.options.transition_speed);break}return false};base.playToggle=function(){if(vars.in_animation||!api.options.slideshow)return false;if(vars.is_paused){vars.is_paused=false;if(typeof theme!='undefined'&&typeof theme.playToggle=="function")theme.playToggle('play');vars.slideshow_interval=setInterval(base.nextSlide,base.options.slide_interval)}else{vars.is_paused=true;if(typeof theme!='undefined'&&typeof theme.playToggle=="function")theme.playToggle('pause');clearInterval(vars.slideshow_interval)}return false};base.goTo=function(targetSlide){if(vars.in_animation||!api.options.slideshow)return false;var totalSlides=base.options.slides.length;if(targetSlide<0){targetSlide=totalSlides}else if(targetSlide>totalSlides){targetSlide=1}targetSlide=totalSlides-targetSlide+1;clearInterval(vars.slideshow_interval);if(typeof theme!='undefined'&&typeof theme.goTo=="function")theme.goTo();if(vars.current_slide==totalSlides-targetSlide){if(!(vars.is_paused)){vars.slideshow_interval=setInterval(base.nextSlide,base.options.slide_interval)}return false}if(totalSlides-targetSlide>vars.current_slide){vars.current_slide=totalSlides-targetSlide-1;vars.update_images='next';base._placeSlide(vars.update_images)}else if(totalSlides-targetSlide<vars.current_slide){vars.current_slide=totalSlides-targetSlide+1;vars.update_images='prev';base._placeSlide(vars.update_images)}if(base.options.slide_links){$(vars.slide_list+'> .current-slide').removeClass('current-slide');$(vars.slide_list+'> li').eq((totalSlides-targetSlide)).addClass('current-slide')}if(base.options.thumb_links){$(vars.thumb_list+'> .current-thumb').removeClass('current-thumb');$(vars.thumb_list+'> li').eq((totalSlides-targetSlide)).addClass('current-thumb')}};base._placeSlide=function(place){var linkTarget=base.options.new_window?' target="_blank"':'';loadSlide=false;if(place=='next'){vars.current_slide==base.options.slides.length-1?loadSlide=0:loadSlide=vars.current_slide+1;var targetList=base.el+' li:eq('+loadSlide+')';if(!$(targetList).html()){var linkTarget=base.options.new_window?' target="_blank"':'';imageLink=(base.options.slides[loadSlide].url)?"href='"+base.options.slides[loadSlide].url+"'":"";var img=$('<img src="'+base.options.slides[loadSlide].image+'"/>');img.appendTo(targetList).wrap('<a '+imageLink+linkTarget+'></a>').parent().parent().addClass('image-loading').css('visibility','hidden');img.load(function(){base._origDim($(this));base.resizeNow()})};base.nextSlide()}else if(place=='prev'){vars.current_slide-1<0?loadSlide=base.options.slides.length-1:loadSlide=vars.current_slide-1;var targetList=base.el+' li:eq('+loadSlide+')';if(!$(targetList).html()){var linkTarget=base.options.new_window?' target="_blank"':'';imageLink=(base.options.slides[loadSlide].url)?"href='"+base.options.slides[loadSlide].url+"'":"";var img=$('<img src="'+base.options.slides[loadSlide].image+'"/>');img.appendTo(targetList).wrap('<a '+imageLink+linkTarget+'></a>').parent().parent().addClass('image-loading').css('visibility','hidden');img.load(function(){base._origDim($(this));base.resizeNow()})};base.prevSlide()}};base._origDim=function(targetSlide){targetSlide.data('origWidth',targetSlide.width()).data('origHeight',targetSlide.height())};base.afterAnimation=function(){if(base.options.performance==1){base.$el.removeClass('speed').addClass('quality')}if(vars.update_images){vars.current_slide-1<0?setPrev=base.options.slides.length-1:setPrev=vars.current_slide-1;vars.update_images=false;$('.prevslide').removeClass('prevslide');$(base.el+' li:eq('+setPrev+')').addClass('prevslide')}vars.in_animation=false;if(!vars.is_paused&&base.options.slideshow){vars.slideshow_interval=setInterval(base.nextSlide,base.options.slide_interval);if(base.options.stop_loop&&vars.current_slide==base.options.slides.length-1)base.playToggle()}if(typeof theme!='undefined'&&typeof theme.afterAnimation=="function")theme.afterAnimation();return false};base.getField=function(field){return base.options.slides[vars.current_slide][field]};base.init()};$.supersized.vars={thumb_tray:'#thumb-tray',thumb_list:'#thumb-list',slide_list:'#slide-list',current_slide:0,in_animation:false,is_paused:false,hover_pause:false,slideshow_interval:false,update_images:false,options:{}};$.supersized.defaultOptions={slideshow:1,autoplay:1,start_slide:1,stop_loop:0,random:0,slide_interval:5000,transition:1,transition_speed:750,new_window:1,pause_hover:0,keyboard_nav:1,performance:1,image_protect:1,fit_always:0,fit_landscape:0,fit_portrait:1,min_width:0,min_height:0,horizontal_center:1,vertical_center:1,slide_links:1,thumb_links:1,thumbnail_navigation:0};$.fn.supersized=function(options){return this.each(function(){(new $.supersized(options))})}};

	// Forch theme: modified Shutter theme: removed thumb and navigation stuff, used playPng and pausePng data URI vars
	var load_supersized_theme = function($){theme={_init:function(){if(api.options.slide_links)$(vars.slide_list).css('margin-left',-$(vars.slide_list).width()/2);if(api.options.autoplay){}else{if($(vars.play_button).attr('src'))$(vars.play_button).attr("src",vars.image_path+"play.png");if(api.options.progress_bar)$(vars.progress_bar).stop().animate({left:-$(window).width()},0)}if($(vars.slide_total).length){$(vars.slide_total).html(api.options.slides.length)}$(vars.play_button).click(function(){api.playToggle()})},playToggle:function(state){if(state=='play'){if($(vars.play_button).attr('src'))$(vars.play_button).attr("src",pausePng)}else if(state=='pause'){if($(vars.play_button).attr('src'))$(vars.play_button).attr("src",playPng)}},beforeAnimation:function(direction){if(vars.slide_current.length){$(vars.slide_current).html(vars.current_slide+1)}},afterAnimation:function(){}};$.supersized.themeVars={play_button:'#pauseplay',slide_current:'.slidenumber',slide_total:'.totalslides',};$.supersized.themeOptions={}};

	var imageInfo = function(){
		// Parse imgs or anchors to determine img names
		var selectorInfo = IMG_SITE_SELECTORS[baseHost()];

		if(selectorInfo.anchors){
			var imgAnchors = $(selectorInfo.selector).has("img");
			var imgInfo = $.makeArray(imgAnchors.map(function(){
				return {
					image: this.href, 
					thumb: $("img", this).attr("src")
					};
				}));
		}
		else{
			var imgs = $(selectorInfo.selector);
			var imgInfo = $.makeArray(imgs.map(function(){
				return {
					image: this.src
					};
				}));
		}
		
		return imgInfo;
	}

	// // Parse img anchors to determine linked img names
	// var img_anchors = $("form[name=delform] a:parent[href$=jpeg], form[name=delform] a[href$=jpg], form[name=delform] a[href$=png], form[name=delform] a[href$=gif]").has("img");
	// var img_info = $.makeArray(img_anchors.map(function(){
	// 	return {
	// 		image: this.href, 
	// 		thumb: $("img", this).attr("src")
	// 		};
	// 	}));
	var img_info = imageInfo();
	
	var show_slideshow_html = function(callbackfn){
		/* if($.support.fullscreen){
			$(document).fullScreen();
		} */

		$("#supersized").show("fast", callbackfn);
		$("#controls-wrapper").show("fast");
	};

	var hide_slideshow_html = function(){
		$("#supersized").hide("fast");
		$("#controls-wrapper").hide("fast");
	};

	var start_slideshow = function(){
		// Read out slideshow params
		var random_order = $("#chan_slideshow_random").prop("checked");
		var slide_interval = Math.round(Number($("#chan_slideshow_dur").val()) * 1000);
		var fit_always = $("#chan_slideshow_fit_whole").prop("checked");

		// Load Supersized at start time - somewhat redundant, but it was never designed to 
		// be stopped and re-initialized with different params, so I just reload the whole thing 
		// each time.
		load_supersized($);
		load_supersized_theme($);
		show_slideshow_html(function(){

		// Create and start slideshow
		$.supersized({
			random					: 	random_order,
			fit_always				:	fit_always,
			autoplay				: 	true, 
			image_protect			: 	false,
			slide_interval          :   slide_interval,		// Length between transitions
			transition              :   1, 					// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
			transition_speed		:	400,				// Speed of transition
												   
			// Components				
			thumb_links				:	0,			
			slide_links				:	false,	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
			slides 					:  	img_info,
			progress_bar			:	0,
			mouse_scrub				:	0
		});});

		// Attach stop callback
		$(document).on("keydown.slidify", null, null, stop_slideshow);

		// Hide scrollbar
		$(document.body).css("overflow", "hidden"); 
	};

	// Callback to stop slideshow
	var stop_slideshow = function(e){
		var STOP_KEYS = {27:null, 81:null, 113:null}; // escape, q, and Q keycodes
		//console.log("which:" + e.which);
		
		if(e.which in STOP_KEYS) {
			$(document).off("keydown.slidify");

			// Forcibly stop and reset for next slideshow
			clearInterval(vars.slideshow_interval);
			$(vars.play_button).attr("src", pausePng);

			hide_slideshow_html();
			$("ul#supersized li").remove();
			$("#supersized").removeClass("speed quality");
			$(document.body).css("overflow", "auto");
		}
	};

	var toggle_hide_slidify = function(){
		$("#slidify_control").css("overflow", "hidden"); 
		$("#slidify_control").animate({ "left": ($(window).width() - 15) + "px" })
	}

	var close_slidify = function(){
		$("#slidify_control").fadeOut("slow");
	}

	// Attach start callback
	$("#slidify_start_slideshow").click(start_slideshow);
	$("#slidify_control").click(hide_slidify);
	$("#slidify_control_close_button").click(close_slidify);
}

// Check for existence of GM_addStyle, and set if necess
if(typeof GM_addStyle == 'undefined') {
    GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if (!head) {return}
        style.type = 'text/css';
        style.textContent = css;
        head.appendChild(style);
    }
}

// My control panel CSS
GM_addStyle("\
	#slidify_control {\
		/* margin-top: 20px; */\
	    padding: 15px;\
		/* position: absolute; */\
		position: fixed; \
		right: 20px;\
		top: 20px; \
	    border: 6px solid black;\
	    border-radius: 50px 25px;\
	    opacity: .95;\
	    background-color: #ededed;\
	    \
	    font-family: Helvetica, Tahoma, Arial, sans-serif;\
	}\
	\
	#slidify_control div, h2, b { \
		font-family: inherit;\
	}\
	#slidify_control input, hr {\
	    margin: 4px;\
	}\
	\
	#slidify_control_close_button { \
		position: absolute;\
		top: 0px;\
		right: 0px;\
	}\
")

// Image data URI - sandboxing inhibits local file access
var progressgif = "data:image/gif;base64,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";

// Supersized CSS
GM_addStyle("\
	\
	* { margin:0; padding:0; }\
		img { border:none; }\
		\
		#supersized-loader { display: none;}\
		\
		/* #supersized {  display:inline-block; position:fixed; left:0; top:0; overflow:hidden; z-index:1001001; height:100%; width:100%; } */\
		#supersized {  display:none; position:fixed; left:0; top:0; overflow:hidden; z-index:1001001; height:100%; width:100%; }\
			#supersized img { width:auto; height:auto; position:relative; display:none; outline:none; border:none; }\
				#supersized.speed img { -ms-interpolation-mode:nearest-neighbor; image-rendering: -moz-crisp-edges; }	/*Speed*/\
				#supersized.quality img { -ms-interpolation-mode:bicubic; image-rendering: optimizeQuality; }			/*Quality*/\
			\
			#supersized li { display:block; list-style:none; z-index:1001970; position:fixed; overflow:hidden; top:0; left:0; width:100%; height:100%; background:#111; }\
			#supersized a { width:100%; height:100%; display:block; }\
				#supersized li.prevslide { z-index:1001980; }\
				#supersized li.activeslide { z-index:1001990; }\
				#supersized li.image-loading { background:#111 url(" + progressgif + ") no-repeat center center; width:100%; height:100%; }\
					#supersized li.image-loading img{ visibility:hidden; }\
				#supersized li.prevslide img, #supersized li.activeslide img{ display:inline; }\
	\
	/* Controls Bar\
	----------------------------*/\
	#controls-wrapper { display:none; margin:0 auto; height:42px; width:100%; bottom:0px; left:0; z-index:1002004; position:fixed; }\
		#controls { overflow:hidden; height:100%; position:relative; text-align:left; z-index:1002005; }\
			#slidecounter { float:left; color:#999; font:14px \"Helvetica Neue\", Helvetica, Arial, sans-serif; text-shadow:#000 0 -1px 0; margin:0px 10px 0 15px; line-height:42px; }\
			\
			#navigation { float:right; margin:0px 20px 0 0; }\
				#play-button{ float:left; margin-top:1px;border-right:1px solid #333; }\
					#play-button:hover{ background-position:0 1px; cursor:pointer; }\
				\
");


// addJQuery courtesy of Erik Vergobbi Vold
// URL: http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
  	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  	script.addEventListener('load', 
		function() {
    		var script = document.createElement("script");
    		script.textContent = "(" + callback.toString() + ")();";
    		document.body.appendChild(script);
  		}, 
		false);
  document.body.appendChild(script);
}

// load jQuery and execute the main function
addJQuery(jQmain);
