// ==UserScript==
// @name           WhatStatus.info Dark [No Longer Works!]
// @version        1.1
// @description    Load the Dark theme automatically without a cookie.
// @namespace      hateradio)))
// @description    Dark theme on auto
// @include        http://*whatstatus.info/
// @match          http://*.whatstatus.info/
// ==/UserScript==

(function(){
return;
var c = {
	ss:function(){
		var s = document.getElementsByTagName('link')[0];
		s.href = 'dark.css';
		s = document.getElementById('content');
		s.style.width = '600px';
	}
};
c.ss();
}());