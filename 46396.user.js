// ==UserScript==
// @name           Image Venue Auto
// @namespace      invisghost.com
// @include        http://*.imagevenue.com/*
// ==/UserScript==
window.addEventListener("load",OnLoad,false);
location = unsafeWindow.location.toString();
unsafeWindow.count = 0;
function OnLoad(e){
	if(location.indexOf("imagevenue.com/uploadimg-aff.php") != -1){
		var links = unsafeWindow.document.getElementsByTagName('a');
		for (i=0;i<=links.length-1;i++){
			if(links[i].href.indexOf("imagevenue.com/img.php")){ // http://img13.imagevenue.com/img.php?image=63383_Seren07_123_902lo.jpg&loc=loc902
				unsafeWindow.location = links[i].href;
			}
		}
	}
	else if (location.indexOf("imagevenue.com/img.php") != -1){
		var thepic = unsafeWindow.document.getElementById("thepic");
		unsafeWindow.location = thepic.src.toString();
	}
}