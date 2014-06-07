// ==UserScript==
// @name        projetLARC
// @namespace   projetLARC
// @description projetLARC
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
		   var ongletRCAlli = '<div style="width: 65px; height: 33px; float: left; background: none repeat scroll 0% 0% transparent;" onmouseout="$(this).css(\"background\", \"transparent\");" onmouseover="$(this).css(\"background\", \"url(http://static.worldofstargate.fr/wosv2/button_hover.png) no-repeat\");>';
			ongletRCAlli +='<a href="http://www.worldofstargate.fr/index.php?page=clan&target=reports"><img style="margin-top:13px" src="http://imageshack.com/a/img839/5894/wre1.png"></img></a>';  
			ongletRCAlli += '</div>';
			jQ('#bar_top').append(ongletRCAlli);
	}

	addJQuery(main);