// blootupload direct images
// Version 1.0
// 2006-07-21
// Copyright (c) 2006, Prodigy
//
// ==UserScript==
// @name          blootupload direct images
// @namespace     http://userscripts.net/people/5757
// @description   Bypass the individual pages for images hosted by blootupload.nl
// @include       *blootupload.nl/gallery.php*
// ==/UserScript==
(function() {
		function changeLinks() {	
			var objAnchors = document.getElementsByTagName('img');
			var pics=new Array();
			for (var intAnchorsPos = 0; intAnchorsPos < objAnchors.length; intAnchorsPos++) {
				if (objAnchors[intAnchorsPos].src.search(/thumb/) != -1) {
					var strAnchorQueryFile = new String(objAnchors[intAnchorsPos].src.replace("thumb","img"));
					if (strAnchorQueryFile) {
						//If you prefer images instead of links use the following line:
						//pics[pics.length]="<a href=\"" + strAnchorQueryFile + "\"><img src=\"" + strAnchorQueryFile + "\"></a>";
						pics[pics.length]="<a href=\"" + strAnchorQueryFile + "\">" + strAnchorQueryFile + "</a>";
					}
				}
			}
			if(pics.length>0){
				document.write(pics.join("<br>"));
			}
		}
changeLinks();
	
})();
