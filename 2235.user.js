/*
 * Title: GMail CSS Skin
 * Description: Greasemonkey script for Firefox to change the appearance of GMail
 * Author: Lucas Garcia, www.lgarcia.org
 * Updated: 29/11/2005
 * 
 */

// ==UserScript==
// @name GMail CSS Skin
// @namespace http://www.lgarcia.org/archives/skin-para-gmail
// @description Greasemonkey script for Firefox to change the appearance of GMail
// @include http://gmail.google.com/*
// @include http://mail.google.com/*
// @include https://gmail.google.com/*
// @include https://mail.google.com/*
// ==/UserScript==

(function(){ 
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	var cssStyle = '.p { margin-top: 5px; color: #3366cc; font-weight: bold; } .ct { color: #006633; }  span.lk { text-decoration: none; font-style: italic; font-size: 11pt; font-family: Trebuchet MS, Georgia, Arial;} div.nl { background-color: #E8EEF7} #nb_1{ display: none !important } span.lk#refresh { text-decoration: underline; font-style: normal; font-size: 10pt; } table.tlc tr.ur { background-color: #fff  !important; } table.tlc tr.rr { background-color: #E8EEF7 !important; } table.tlc tr.ur td, table.tlc tr.rr td{	border: 0 !important; line-height: 1.5em} table.tlc tr.rr:hover{ background-color: #B5EDBC !important; } #nb_0 img { display: none } #nb_0 { font-size: 10pt; }  #nb_0 table td.s { padding-top: 2px; padding-bottom: 2px; color: #006633; font-style: italic; font-weight: bold; } input, button { padding: 3px !important} div.h#ds_inbox img { display: none } div.h#ds_inbox { background-image: url(http://static.flickr.com/34/68354073_a68a090fc7_m.jpg) !important; width: 143px !important;	height: 59px !important; background-repeat: no-repeat !important; } span.lk:hover { color: green; text-decoration: underline; } span.lk#prf_g { font-size: 10pt; font-style: normal; text-decoration: underline; } div#nav sup { display: none !important; } div#ft { display: none !important; } #il { display: none !important; } div#nav { margin-top: 5px } #tamu { font-family: Verdana; font-size: 9pt; color: #3366cc; height: 24px; line-height: 1.5em; font-weight: bold; } span.lk#ds_trash { color: #c00 } span.lk#ds_spam { color: #999 }';
	
	addGlobalStyle(cssStyle);
})()



