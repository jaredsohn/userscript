/*

Remove Banner from the top when you use Anchor Free Hotspot shield

Version 0.1
(C) 2007 Palaniraja
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html
*/

// ==UserScript==
// @name          AnchorFree banner killer
// @description   Remove Banner from the top when you use Anchor Free Hotspot shield / Please deactivate the script after disconnecting Hotspot shield
// @include       *
// ==/UserScript==
//*[@id="resultright"]

var css = "@namespace url(http://www.w3.org/1999/xhtml); html {margin-top:0px} body{margin-top:-90px;}";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	//console.log("printing heads",heads);
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
		
	}
}

var topBar = document.getElementById('iframe-af-container');
if(topBar) {
 topBar.parentNode.removeChild(topBar);
}

/*document.getElementById('body-af-container').style.position='absolute';
document.getElementById('body-af-container').style.top='0px';
document.getElementById('body-af-container').style.left='0px';*/
//document.getElementById('body-af-container').style.marginTop='-90px';