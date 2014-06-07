// ==UserScript==
// @name          Blog.tr.ee frame remover
// @namespace     http://userscripts.org/
// @description	  Removes frame from pages opened on blog.tr.ee and news.tr.ee
// @include       http://blog.tr.ee/freim.php?target=*
// @include       http://news.tr.ee/freim.php?target=*
// ==/UserScript==

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