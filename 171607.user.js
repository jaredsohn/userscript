// ==UserScript==
// @name                FLAG FIXER
// @version             1
// @description        Poland -> pokeball & Denmark -> LEGO
// @include             http://www.facepunch.com/*
// @include             http://facepunch.com/*
// @copyright           Call Me Kiwi
// @downloadURL http://fpuiicons.googlecode.com/svn/trunk/PLDKScript.js
// ==/UserScript==


function runS(elem) {
	var allImages = elem.getElementsByTagName("img");

	var types = ["flags"];
	var validC = ["pl", "dk"];
	var bindir = "http://fpuiicons.googlecode.com/svn/trunk/V5_GIF/OTHER_SCRIPT/";
	for (var i = 0; i < allImages.length; i++) {
		var imgsrc = allImages[i].src;
		var strings = imgsrc.split("/");
		var suf = strings[strings.length - 1];
		suf = suf.split(".");
		var sufix = suf[0];
		strings.pop();
		//decide loop
		//mainDecide: 
		for (var j = 0; j < types.length; j++) {
			var type = types[j];
			if (strings[strings.length - 1] == type) {
				if (type == "flags") {
					for (var fLoop = 0; fLoop < validC.length; fLoop++) {
						if (sufix == validC[fLoop]) {
							allImages[i].src = bindir + type + "/" + sufix + ".gif";
							//break flags;
						}
					}
				}
				break;
			}
		}
	}
}
runS(document);