// ==UserScript==

// @name           WhatIMG Thumbnails for torrents!

// @namespace      http://amy.com

// @description    Turns all images on torrentpages from WhatIMG.com into thumbnails.

// @include        http://what.cd/torrents.php?id=*

// @include        https://ssl.what.cd/torrents.php?id=*

// ==/UserScript==



var cover = document.getElementsByTagName("p");

var whatIMG = cover[0].innerHTML.split("http://")[1].split("/images")[0];



	if (whatIMG == "whatimg.com") {
		var proof = cover[0].innerHTML.split("_")[1];
		if (!proof) {

			cover[0].innerHTML = cover[0].innerHTML.replace(".jpg", "_thumb.jpg");
		}

	}
