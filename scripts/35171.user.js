// Bungie.net Screenshot Download Tool
// version 1.0
// c r e a t e d   b y   the eNeME
// 10-08-08
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Screenshot Download Tool", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Screenshot Download Tool
// @namespace     http://www.bungie.net/Forums/posts.aspx?postID=27428424
// @description   Adds the "Download to Halo 3" button onto screenshots on Bungie.net.
// @include       http://*.bungie.net/Online/Halo3UserContentDetails.aspx?h3fileid=*
// ==/UserScript==



if(!isDownloadButton()) {
	var list;
	var ulArray = new Array();
	ulArray = document.getElementsByTagName("ul");
	for (var i = 0; i < ulArray.length; i++)
		if(ulArray[i].innerHTML.match(/View High Res/)) {
			list = ulArray[i];
		}
	var li1 = document.createElement('li');
	var li2 = document.createElement('li');
	var div1 = document.createElement('div');
	var div2 = document.createElement('div');
	var div3 = document.createElement('div');
	div3.id = "ctl00_ctl00_mainContent_xboxDownloadButtonPanel";
	div2.innerHTML = div3.innerHTML;

	addGlobalScript(
	'function downloadToHalo3()'+
	'{'+
	"__doPostBack('ctl00$mainContent$xboxDownloadButton','')"+
	'}');


	div1.innerHTML = '<a id="ctl00_mainContent_xboxDownloadButton" href="javascript: downloadToHalo3();">Download to Halo 3</a>';

	li2.innerHTML = div2.innerHTML;
	li1.innerHTML = div1.innerHTML;

	list.appendChild(li1);
	list.appendChild(li2);
}


function isDownloadButton() {
	var linkArray = document.getElementsByTagName("a");
	for (var j = 0; j<linkArray.length; j++) {
		if (linkArray[j].getAttribute("id") == "ctl00_mainContent_xboxDownloadButton")
			return true;
	}
	return false;
}

function addGlobalScript(code) {
    var head, funct;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    funct = document.createElement('script');
    funct.innerHTML = code;
    head.appendChild(funct);
}
