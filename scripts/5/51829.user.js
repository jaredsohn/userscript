// ==UserScript==
// @name           PreventBingMapPopUp
// @namespace      http://www.magconcept.com
// @description    This script eliminates the annoying "3D Installation" popup on Bing maps
// @include        http://www.bing.com
// ==/UserScript==




var preventlayer = document.getElementById('__preventLayer__');
if (preventlayer) {
	preventlayer.className = 'boguspreventlayer';

}

var mainpopup = document.getElementById('help');
if (mainpopup) {
	mainpopup.style.display = 'none';
}




var taskarea = document.getElementById('msve_taskArea');
if (taskarea) {
	taskarea.style.width = '1px';
}

var mainmap = document.getElementById('msve_mapArea');
if (mainmap) {
	mainmap.style.marginLeft = '0px';
	mainmap.style.width = '100%';
}



document.addEventListener('DOMNodeInserted',function(){

var sidepopup = document.getElementById('msve_ScratchPad');
if (sidepopup) {
	sidepopup.style.display = 'none';
}

},true);



var footer= document.getElementById('sb_foot');
if (footer) {
	footer.style.height = '0px';
}





window.resizeBy(-1,0);