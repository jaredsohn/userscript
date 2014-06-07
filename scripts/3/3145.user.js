/*
 * Title: Photo.net
 * Description: Change the appearance of Photo.net
 * Author: Tim Parkinson
 * Updated: 7/2/06
 * 
 */

// ==UserScript==
// @name Photo.net CSS Skin
// @description Change the appearance of Photo.net
// @include http://photo.net/*
// @include http://www.photo.net/*
// ==/UserScript==

(function(){ 
	function addStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	var cssStyle = 'body, html{font-family:verdana,arial,sans-serif;font-size:10pt}a{font-size:10pt}a:hover{color:grey} .boxtext{font-size:10pt} .boxtitle{color:white;font-size:10px;font-weight:bold}ul,li,ol{font-size:10pt} tr,td{font-size:10pt} #footer{font-size:8pt;padding-bottom:15px;padding-top:5px} #footer a{font-size:8pt;} .content{font-family:verdana,arial, sans-serif;font-size:10pt}';
	
	addStyle(cssStyle);
})() 




