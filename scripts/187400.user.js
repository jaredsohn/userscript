// ==UserScript==
// @name         CCC CSS
// @namespace    http://userscripts.org/users/zackton
// @description  CSS Hack for Cookie Clicker Cheats
// @include      http://orteil.dashnet.org/cookieclicker/
// @include      orteil.dashnet.org/cookieclicker/
// @updateURL    http://userscripts.org/scripts/source/187400.meta.js
// @run-at       document-start
// @grant        none
// @version      1.4
// ==/UserScript== 

(function() {
var d = new Date();

if (d.getMonth() == 1-1) {

// New Years
var css = ".warning,a.option.warning { \n color:#c00; border-color:#c00; \n } #game { \n top:64px; \n } #topBar { \n height:64px; \n } .row { \n height:112px; \n } .row .content { \n  height:112px; \n } .title,.section { \n color:#c00; text-shadow: 0px 0px 6px #ccc, 0px 0px 1px #ccc; \n }";

} else if (d.getMonth() == 2-1) {

// Valentines
var css = ".warning,a.option.warning { \n color:#ec4965; border-color:#ec4965; \n } #game { \n top:64px; \n } #topBar { \n height:64px; \n } .row { \n height:112px; \n } .row .content { \n  height:112px; \n } .title,.section { \n color:#ec4965; text-shadow: 0px 0px 6px #ccc, 0px 0px 1px #ccc; \n }";

} else if (d.getMonth() == 3-1) {

// St Patrick's Day
var css = ".warning,a.option.warning { \n color:#39ad56; border-color:#39ad56; \n } #game { \n top:64px; \n } #topBar { \n height:64px; \n } .row { \n height:112px; \n } .row .content { \n  height:112px; \n } .title,.section { \n color:#39ad56; text-shadow: 0px 0px 6px #ccc, 0px 0px 1px #ccc; \n }";

} else if (d.getMonth() == 4-1) {

// Easter
var css = ".warning,a.option.warning { \n color:#e1dc3d; border-color:#e1dc3d; \n } #game { \n top:64px; \n } #topBar { \n height:64px; \n } .row { \n height:112px; \n } .row .content { \n  height:112px; \n } .title,.section { \n color:#e1dc3d; text-shadow: 0px 0px 6px #ccc, 0px 0px 1px #ccc; \n }";

} else if (d.getMonth() == 7-1) {

// 4th of July
var css = ".warning,a.option.warning { \n color:#800000; border-color:#800000; \n } #game { \n top:64px; \n } #topBar { \n height:64px; \n } .row { \n height:112px; \n } .row .content { \n  height:112px; \n } .title,.section { \n color:#800000; text-shadow: 0px 0px 6px #ccc, 0px 0px 1px #ccc; \n }";

} else if (d.getMonth() == 10-1) {

// Halloween
var css = ".warning,a.option.warning { \n color:#e58200; border-color:#e58200; \n } #game { \n top:64px; \n } #topBar { \n height:64px; \n } .row { \n height:112px; \n } .row .content { \n  height:112px; \n } .title,.section { \n color:#e58200; text-shadow: 0px 0px 6px #ccc, 0px 0px 1px #ccc; \n }";

} else if (d.getMonth() == 11-1) {

// Thanksgiving
var css = ".warning,a.option.warning { \n color:#b26500; border-color:#b26500; \n } #game { \n top:64px; \n } #topBar { \n height:64px; \n } .row { \n height:112px; \n } .row .content { \n  height:112px; \n } .title,.section { \n color:#b26500; text-shadow: 0px 0px 6px #ccc, 0px 0px 1px #ccc; \n }";

} else if (d.getMonth() == 12-1) {

// Chistmas
var css = ".warning,a.option.warning { \n color:#057d9c; border-color:#057d9c; \n } #game { \n top:64px; \n } #topBar { \n height:64px; \n } .row { \n height:112px; \n } .row .content { \n  height:112px; \n } .title,.section { \n color:#057d9c; text-shadow: 0px 0px 6px #ccc, 0px 0px 1px #ccc; \n }";

} else {

// No special event, just do a general theme
var css = ".warning,a.option.warning { \n color:#424242; border-color:#424242; \n } #game { \n top:64px; \n } #topBar { \n height:64px; \n } .row { \n height:112px; \n } .row .content { \n  height:112px; \n } .title,.section { \n color:#424242; text-shadow: 0px 0px 6px #ccc, 0px 0px 1px #ccc; \n }";

}


if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();