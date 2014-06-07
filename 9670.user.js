// ==UserScript==
// @name           FixImageScroll
// @namespace      www.hotmathematician.com
// @description    Keeps images loading above your window from scrolling content out of view
// @include        *
// ==/UserScript==


var imgs = document.body.getElementsByTagName("IMG");
var h = document.body.scrollHeight;
var im, imDelta, lastT, timer=null;

window.addEventListener("load", cleanUp, false);
document.addEventListener("DOMAttrModified", fixScroll, false);
document.addEventListener("DOMAttrModified", userScrolled, true);
lastT=(new Date()).getTime(); getNextImgDown();


function getNextImgDown() {
	im = null; imDelta = document.body.scrollHeight - document.documentElement.scrollTop;
	for (var i=0; i<imgs.length; i++) {
		if (imgs[i].y >= document.documentElement.scrollTop) {
			if (im) {
				if (im.y > imgs[i].y) {
					im=imgs[i];
					imDelta = imgs[i].y - document.documentElement.scrollTop;
				}
			} else {
				im=imgs[i];
				imDelta = imgs[i].y - document.documentElement.scrollTop;
			}
		}
	}
}

function userScrolled(e) {
	if (e.attrName == "curpos") {
		var t=(new Date()).getTime();		
		if (t-lastT >= 200) {
			getNextImgDown();	
			lastT=t;
		} else if (t>lastT) { 
			window.setTimeout(getNextImgDown,lastT+200-t);
			lastT+=200;
		}
	}	
}

function fixScroll(e) { 
	if (e.attrName == "maxpos" && document.body.scrollHeight != h) {
		h = document.body.scrollHeight;
		document.documentElement.scrollTop = ((im)?im.y:document.body.scrollHeight) - imDelta;
	}
}

function cleanUp(e) {		
	window.removeEventListener("load", cleanUp, false);
	document.removeEventListener("DOMAttrModified", fixScroll, false);
	document.removeEventListener("DOMAttrModified", userScrolled, true);
	im = null; imgs = null;
}

