// ==UserScript==
// @name           Trac wiki edit textarea auto height according to window.
// @namespace      bbtracscripts
// @include	       http*://*/wiki/*?action=edit
// @description    Sets default height of text area in Trac to the window height
// ==/UserScript==

function getScrollTop(){ // http://stackoverflow.com/questions/871399/cross-browser-method-for-detecting-the-scrolltop-of-the-browser-window
    if(typeof pageYOffset!= 'undefined'){ return pageYOffset; }
    else {
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientHeight)? D: B;
        return D.scrollTop;
    }
}

function gih() {
	var h = 0;
	if(!window.innerWidth) { 
	   if(!(document.documentElement.clientWidth == 0)) {h = document.documentElement.clientHeight;}
	   else { h = document.body.clientHeight;}
	}
	else { h = window.innerHeight; }
	return h;
}


function hookEvent(elem, type, eventHandle) {
    if (!elem) return;
    if (elem.addEventListener) {
        elem.addEventListener( type, eventHandle, false );
    } else if (elem.attachEvent) {
        elem.attachEvent( "on" + type, eventHandle );
    }
};

function oftop(element) {
	var topoffset = element.offsetTop;
	var parent = element.offsetParent;
	while (parent) {
		topoffset += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return topoffset;
}

function resizeTextArea(ta) {

	var offsetTop = oftop(ta);
	var innerHeight = gih();
	var scrollTop = getScrollTop();
	var height = 0;
		
	height = (innerHeight - offsetTop) + scrollTop - 20;
	
	ta.style.height = Math.max(Math.min(height, innerHeight), original_ta_height) +'px';
}

var ta_list = document.getElementsByTagName('textarea');
var original_ta_height = 0;
for (var i = 0; i < ta_list.length; i++) {
	var ta = ta_list[i];
	
	if (ta && ta.className && ta.className == 'wikitext') {
		original_ta_height = ta.clientHeight;
		resizeTextArea(ta);
		hookEvent(window, 'resize', function(e) {
			resizeTextArea(ta);
		});
		break;
	}
}
		
