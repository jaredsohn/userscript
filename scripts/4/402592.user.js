// ==UserScript==
// @name        Explo
// @namespace   Explo
// @description Explo
// @include     http://www.worldofstargate.fr/*
// @version     1
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.js
// ==/UserScript==   
	function addJQuery(callback) {
	  var script = document.createElement("script");
	  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}
	
	// the guts of this userscript
	function main() {
		   var ongletRAIDS = '<div style="width: 113px; height: 33px; float: left; background: none repeat scroll 0% 0% transparent;" onmouseout="$(this).css(\"background\", \"transparent\");" onmouseover="$(this).css(\"background\", \"url(http://static.worldofstargate.fr/wosv2/button_hover.png) no-repeat\");>';
			ongletRAIDS +='<a href="http://www.worldofstargate.fr/index.php?page=action&type=explore&utype=0&id=24895">Explo</a>';  
			ongletRAIDS += '</div>';
			jQ('#bar_top').append(ongletRAIDS);
	}

	addJQuery(main);

