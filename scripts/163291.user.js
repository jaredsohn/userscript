// ==UserScript==
// @name        FT_translate
// @namespace   FT_translate
// @description FT中文网切换到中英对照
// @include     http://www.ftchinese.com/*
// @version     1
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_addStyle
// @grant GM_xmlhttpRequest
// @grant GM_log
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// ==/UserScript==

/* Style */
GM_addStyle('#ft_trans{position:absolute; top: 10px; right: 10px;}');

/* Selector */
function $(select) {
	var name = select.substring(1);
		switch(select.charAt(0)) {
			case '#':
				return document.getElementById(name);
			case '.':
				return document.getElementsByClassName(name);
			case '/':
				return document.getElementsByName(name);
			default: 
				return document.getElementsByTagName(name);
		}
}

/* Btn */
var btn = document.createElement( 'a' );
	btn.id = 'ft_trans';
	btn.href = 'javascript:;';
	btn.textContent = 'Translate';
	btn.addEventListener('click', function(){
		var href = window.location.href,
			hash = window.location.hash;
		if( href.indexOf('ce') !== -1 ){
			window.location.href = href.replace('/ce','');
		}else{
			window.location.href = href + '/ce';
		}

	}, false);

/* Append */
$( '#topadcontainer' ).appendChild(btn)