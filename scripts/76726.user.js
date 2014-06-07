// ==UserScript==
// @name          Dla Paskudzi
// @namespace     http://userstyles.org
// @description	  FT mówi NIE - MY mówimy TA
// 

@author        Parlez
// @homepage      http://userstyles.org/styles/10676
// @include       http://www.fotka.pl/*
// @include       

https://www.fotka.pl/*
// @include       http://*.www.fotka.pl/*
// @include       https://*.www.fotka.pl/*
// ==/UserScript==
(function() {
var css = 

"img[src*=\"/img/forum/em/superkupa.gif\"] {background-image: url('http://massiveshemale.com/wp-content/uploads/2008/02/13.jpg') !

important; background-repeat: no-repeat; width: 0 !important; height: 400px !important; padding-left: 533px;}";
if (typeof GM_addStyle != 

"undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof 

addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if 

(heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		

node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
