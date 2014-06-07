// ==UserScript==
// @name        projetAPEBooster
// @namespace   projetAPEBooster
// @description projetAPEBooster
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
		   var ongletAPE = '<div style="width: 50px; height: 33px; float: left; background: none repeat scroll 0% 0% transparent;" onmouseout="$(this).css(\"background\", \"transparent\");" onmouseover="$(this).css(\"background\", \"url(http://static.worldofstargate.fr/wosv2/button_hover.png) no-repeat\");>';
			ongletAPE +='<a href="http://www.worldofstargate.fr/index.php?page=action&type=explore&utype=0&id=21530"><img style="margin-top:13px" src="http://imageshack.com/a/img35/747/qytv.png"></img></a>';  
			ongletAPE += '</div>';
			jQ('#bar_top').append(ongletAPE);
	}

	addJQuery(main);

