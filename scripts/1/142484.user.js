// ==UserScript==
// @id             ircz.de-561281a0-8f43-4805-bc51-fbe0dc168ac9@hurrdurr
// @name           Better ircz
// @version        1.0
// @namespace      hurrdurr
// @author         lawl
// @description    
// @include        http://ircz.de/*
// ==/UserScript==

//Copy pasted from http://wiki.greasespot.net/Content_Scope_Runner
//So we can access the "so" object which contains the URL to the config, in which again the plain URL to the MP4 is.
if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";

    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

var m=false;
var galleryImgIds=[], activeGalleryImg=0;
var longclicktimer=0;
var scaled=0;

$(document).ready(function() {	
	loadJqPluginsInline();
	installScroller();
	if(isSingleImagePage()){
		lightboxify();
		hideGui();
		var img = $('p#picp>a>img');
		img.parent().removeAttr('href','');
		showimg(img.attr('src'));
	} else {
		$('.thumbnail').each(function(i,el){
			galleryImgIds.push(el);
			el.parentNode.addEventListener('click',function(e){
				e.preventDefault();
				activeGalleryImg=i;
				lightboxify();
				showimg(getImgFromThumb(el.src));
			},false);
		});
		checkScrollActive();
	}

	
});

function changeImage(forward){
	var loc= !forward ? $('#a-next').attr('href') : $('#a-prev').attr('href');
	if(isSingleImagePage()) {
		document.location = loc;
	} else {
		var direction = forward ? 1 : -1;
		if(typeof(galleryImgIds[activeGalleryImg+direction]) != 'undefined'){
			showimg(getImgFromThumb(galleryImgIds[activeGalleryImg+direction].src));
			activeGalleryImg+=direction;
		}else{
			var loc= !forward ? $('#a-next').attr('href') : $('#a-prev').attr('href');
			if(typeof(loc)=='undefined')
				return;
			if (direction==-1){
				document.location = loc + '#fwd';
			}else{
				document.location = loc + '#rwd';
			}
		}
	}
}

function lightboxify(){
	if($('#lb').exists())return;
	$('body').attr('style','height:100%;');
	var lb= $('<div id="lb" style="position:absolute; width:100%; height:100%; left:0px; top:0px; z-index:12000; background-color:#000;text-align:center;background-color: rgba(0,0,0,0.95);"><table width="100%" height="100%" ><tr><td align="center" valign="middle"><img id="img" src="" /></td></tr></table></div>');
	$('body').append(lb);
	lb.mouseup(function(){clearTimeout(longclicktimer)});
	lb.mousedown(function(){
		if(scaled){
			longclicktimer = setTimeout(function(){
				$('#img').css({ height: '', width: '' });
				scaled=false;
			},300);
		}
	});
	makeImgDraggable();
	window.onscroll = function () { window.scrollTo(0, 0); };
}

function hideGui(){
	$('p#picp>a>img').attr('style','visibility:hidden;');
	$('body').css('overflow','hidden');
}

function showimg(imgurl){
	$('#img').attr('src',imgurl);
	scaleImg($('#img'));
}

function isSingleImagePage() {
	var url = document.location + '';
	return (url.indexOf('/p/') != -1);
}

function getImgFromThumb(img){
	return img.replace('thumbs','pics').replace('thumbnail_','');
}

function installScroller(){
	$('html').bind('mousewheel', function(event, delta) {
			if(m)return;
			changeImage(delta < 0);
			return false;
		});
}

function checkScrollActive(){
	var url = document.location + '';
	var p = url.split('#')[1];
	if(p=='fwd') {
		lightboxify();
		activeGalleryImg=galleryImgIds.length-1;
		showimg(getImgFromThumb(galleryImgIds[galleryImgIds.length-1].src));
	} else if(p=='rwd') {
		lightboxify();
		activeGalleryImg=0;
		showimg(getImgFromThumb(galleryImgIds[0].src));
	}
	return 0;
}

function scaleImg(img){
	if (img.height() > $(window).height()) {
		var h = $(window).height();
		var w = Math.ceil(img.width() / img.height() * $(window).height());
	} else if (img.width() > $(window).width()){
		var w = $(window).width();
		var h = Math.ceil(img.height() / img.width() * $(window).width());
	}else{
		return;
	}
	img.css({ height: h, width: w });
	scaled=true;
}

function makeImgDraggable() {
	//inject jqueryUI
	var fileref=document.createElement('script');
	fileref.setAttribute("type","text/javascript")
	fileref.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js");
	document.getElementsByTagName("head")[0].appendChild(fileref);
	fileref.onload= function() {
		$('#img').draggable();
	}
}


function loadJqPluginsInline(){(function($) {
	
$.fn.exists = function () {
    return this.length !== 0;
}


/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);

}
