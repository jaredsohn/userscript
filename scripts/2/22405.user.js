/*
 * Title: Huge forms of uForum
 * Author: monIToringe, monIToringe@gmail.com
 * Updated: 08.02.2008
 * 
 */

// ==UserScript==
// @name           Huge forms of uForum
// @namespace      uForum
// @description    #25;8G8205B @07<5@ D>@<K 22>40 ?>AB0
// @include        http://uforum.uz/*
// @include        http://www.uforum.uz/*
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
	
	var cssStyle = '#vB_Editor_QR_textarea{width:650px !important;height:400px !important;}';
	
	addGlobalStyle(cssStyle);
})()

