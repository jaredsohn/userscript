// ==UserScript==
// @name           Facebook Trip
// @namespace      By Mark
// @description    Make facebook go trippy
// @include        http://*facebook.com*
// @include        https://*facebook.com*
// ==/UserScript==

	function random_color(){
	   var rint = Math.round(0xffffff * Math.random());
	   return ('#0' + rint.toString(16)).replace(/^#0([0-9a-f]{6})$/i, '#$1');
	}
	
	var elements = document.getElementsByTagName("*");
	function doIt(){
	for (i=0;i<elements.length;i++){
	   elements[i].style.background = random_color();
	   elements[i].style.color = random_color();
	   }
	}
	doIt();
	window.setInterval(function(){ doIt(); },1000);