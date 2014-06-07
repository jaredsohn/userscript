// ==UserScript==
// @name          Frame Killer Plus
// @namespace     http://www.arantius.com/article/arantius/frame+killer+plus/
// @description	  Replaces the current page with the biggest frame.  Use it to remove wrapper frames, include it on any appropriate URL.
// @include       http://www.madville.com/link.php*
// @include       http://www.linkdump.be/framed.php*
// @include       http://www.leenks.com/*
// ==/UserScript==

// The include rules provided above are examples.  Replace those rules
// with the addresses of any sites whose frames you'd like to kill.
// Be careful, do not include * or you will break any site that really
// uses frames.

//
// Originally written by Anthony Lieuallen of http://www.arantius.com/
// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.
//
// If possible, please contact me regarding new features, bugfixes
// or changes that I could integrate into the existing code instead of
// creating a different script.  Thank you
//

(function() {
var i=0,f,bigArea=-1,frameArea,newLoc='';
//done with xpath to circumvent security restrictions that prevent reading the src directly
var frames=document.evaluate("//frame", document, null, XPathResult.ANY_TYPE,null);
while (f = frames.iterateNext()) {
	frameArea=(parseInt(f['offsetWidth'])*parseInt(f['offsetHeight']));
	if (frameArea>bigArea) {
		bigArea=frameArea;
		newLoc=f.src;
	}
}
if (''!=newLoc) document.location.replace(newLoc);
})();
