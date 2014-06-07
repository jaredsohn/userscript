// ==UserScript==
// @name          OpenBC SearchResult ImageSize
// @namespace     http://not.pers3vs.net/userscripts
// @description	  Shows big images in search results in OpenBC.
// @include       *openbc.com/cgi-bin/search.fpl*
// @include       *openbc.com/cgi-bin/contact.fpl
// ==/UserScript==
// OpenBCImageSize.user.js

/*
This is a Greasemonkey user script.

To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
Then restart Firefox and revisit this script.
Under Tools, there will be a new menu item to "Install User Script".
Accept the default configuration and install.

To uninstall, go to Tools/Manage User Scripts,
select "OpenBCImageSize", and click Uninstall.
*/

(function() {
   window.addEventListener("load", function(e) {
    	var imgList = document.getElementsByTagName("img");
	for( i=0; i < imgList.length; i++) {
		var imgName = imgList[i].src;
		var s = imgName.search(/\/img\/users\/.+\_s\.jpg$/);
		if( s != -1) {
			imgList[i].src = imgName.replace(/\_s.jpg$/, ".jpg");
			imgList[i].width = "140";
			imgList[i].height = "185";
		}
	}
	return;
  }, false);
})();
