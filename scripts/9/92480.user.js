// ==UserScript==
// @name           Wiki-banner
// @namespace      Kaktus
// @description    Jimmy Wales to Reimu changer
// Author:         Kaktus
// @include        http://*wikipedia.org/*
// @license        Nothing
// ==/UserScript==

(function() {

function change_bunner() {

    if (document.getElementById("JA1banner3-text")) {
        document.getElementById("JA1banner3-text").innerHTML="Посмотрите на</br>красноволосую няшечку</br>из Touhou-project";
        //document.getElementById("JA1banner3").style.backgroundImage="url(http://img220.imageshack.us/img220/4076/51345177.jpg)";
        document.getElementById("JA1banner3").getElementsByTagName("a")[0].href="http://img98.imageshack.us/img98/9683/mainimages.jpg";
    } else {setTimeout(change_bunner, 300);}
}

document.body.onload = (function() {setTimeout(change_bunner, 100);})();

var css = '#JA1banner3 {background-image: url(http://img220.imageshack.us/img220/4076/51345177.jpg) !important;}';	

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css); //alert('GM_addStyle(css)');
} else if (typeof addStyle != "undefined") {
	addStyle(css); //alert('addStyle(css))');
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node);
		//alert('appendChild');
	}
}


})();