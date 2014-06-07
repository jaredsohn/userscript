// ==UserScript==
// @name        weibo_helper
// @namespace   http://www.w3.org/1999/xhtml
// @include     http://weibo.com/garphy*
// @version     1
// ==/UserScript==
GM_addStyle("\
.W_main { background:#fff !important;}\
.W_main_l { position: fixed; left: 0; top:50px; opacity: 0.2;}\
.W_main_a { width:980px;}\
.W_main_c { width:750px;}\
");
var panelLeft = document.getElementById('pl_leftnav_common').parentNode.parentNode;
panelLeft.addEventListener('mouseover', function(){
	this.style.opacity = 1;
}, false);
panelLeft.addEventListener('mouseout', function(){
	this.style.opacity = 0.2;
}, false);