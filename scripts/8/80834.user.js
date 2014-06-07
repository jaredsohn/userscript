// ==UserScript==
// @name           Minimalist Google
// @namespace      http://bob23646.deviantart.com/
// @description    minimalist version of google
// @include        http*://*google.*/
// @include        http*://*google.*/webhp*
// ==/UserScript==


(function() {
var Logo = document.getElementById('logo');
Logo.id = "Google Logo";
Logo.border = 'no'
//EDIT PICTURE LINK BELOW//
Logo.src = 'http://www.google.com/intl/en_ALL/images/srpr/logo1w.png';
//EDIT PICTURE LINK ABOVE//
})();
(function () {
var css = '#fctr,#ghead,#pmocntr,#tba,#tbe,.fade,.gbh { opacity: 1 !important; 

filter:alpha(opacity=100) !important; }';
if (typeof GM_addStyle != 'undefined') {
GM_addStyle(css);
} else if (typeof PRO_addStyle != 'undefined') {
PRO_addStyle(css);
} else {
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(style);
}
})();
(function () {
var css = '#sbl { opacity: 0 !important; filter:alpha(opacity=0) !important; }';
if (typeof GM_addStyle != 'undefined') {
GM_addStyle(css);
} else if (typeof PRO_addStyle != 'undefined') {
PRO_addStyle(css);
} else {
var style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = css;
document.getElementsByTagName('head')[0].appendChild(style);
}
})();
(function() {
var css = "#footer,#gbe,.gb3  { display:none !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();