// ==UserScript==
// @name           sentimente - no window
// @namespace      sentimente
// @include        http://www.sentimente.ro/user/profile/*
// ==/UserScript==


var timi=setTimeout(
	function() {
		var wins = document.getElementsByTagName("div");
		for (i=0; i<wins.length; i++) {

			if ((wins[i].id.indexOf("window") != -1) || (wins[i].id.indexOf("overlay_modal") != -1))  {

//				wins[i].visible = false;
				wins[i].style.display = 'none';
				wins[i].style.zIndex = "1";
				

			}
		}
	}
,1500);
