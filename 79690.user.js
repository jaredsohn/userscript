// ==UserScript==

// @name           WhatIMG Thumbnails!

// @namespace      http://amy.com

// @description    Turns all images from WhatIMG.com into thumbnails.

// @include        http://what.cd/*

// @include        https://ssl.what.cd/*

// ==/UserScript==



var img = document.getElementsByTagName("img");



	for (var i in img) {

		reg = /(\w+)\.jpg$/;	

		var location = img[i].src.split('/')[2]; //checks image host url

		var proof = img[i].alt.split(" ")[1]; //for checking if image is an avatar

		var proof2 = img[i].src.split('/')[4]; //for checking if the image is already a thumbnail
		var proof3 = proof2.split("_")[1];
 //for checking if the image is already a thumbnail


		if (location == "whatimg.com") { //if image host is whatimg.com, proceed

			if (proof != "avatar") { //if image isn't avatar, proceed
				//reg == "iimimimi_thumb.jpg"
				if (proof3 != "thumb.jpg") {
 //if image isn't already a thumbnail
					img[i].src = img[i].src.replace(reg, "$1_thumb.jpg");

					img[i].alt = img[i].alt.replace(reg, '$1_thumb.jpg');
				}

			}

		}





  	}