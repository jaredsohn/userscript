// ==UserScript==
// @name           ek$inaap.partial
// @namespace      http://userscripts.org/users/134635/scripts
// @description    ek$isozluk nesil arama aparati (ek$istats icin)
// @author         dandikos
// @version        0.0.3
// @include        http://*.eksistats.com/index.php?*
// ==/UserScript==

window.addEventListener(
	'load',
	function() { 		
		body = document.getElementsByTagName('body')[0];
		innerhtm = body.innerHTML;
		reggen = /nesil=([0-9]{1,})/g.exec(innerhtm)[1];		
		mg = reggen + ". nesil";
		body.innerHTML = "<div align=\"right\"><font style=\"color:red;font-size:10px;\">{"+mg+"}</font></div>";
		body.setAttribute("style","background-color:#CCCCCC;");
	},
false);