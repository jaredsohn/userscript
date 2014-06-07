// ==UserScript==
// @name           sa ad remover
// @namespace      sober
// @description    removes ads from the somethingawful forums, for registered users, moves legit menus to the bottom.
// @include 		http://forums.somethingawful.com/*
// ==/UserScript==


(function()
{
	//remove top somethingawful bar (global menu)
	document.getElementById("globalmenu").style.display="none";
	
	//remove amazon.com search box
	document.getElementById("searchboxes").style.display="none";
	
	//remove user ads
	document.getElementById("ad_banner_user").style.display="none";
	
	//move the remaining menu bars to the bottom of the page
	navpurch = document.getElementById("nav_purchase").innerHTML;
	document.getElementById("nav_purchase").style.display="none";
	navi = document.getElementById("navigation").innerHTML;
	document.getElementById("navigation").style.display="none";
	style = "<style type=\"text/css\">li {display: inline;}</style>";
	document.getElementsByTagName("center")[0].innerHTML = style + navi;
	document.getElementById("copyright").innerHTML = navpurch;
})();
