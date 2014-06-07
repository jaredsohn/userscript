// ==UserScript==
// @name           Demons Chat by Pepineitor
// @namespace      http://userscripts.org/users/491961
// @description    Chat para la alianza Demons en Quantum
// @author         Pepineitor
// @include        http://*.ogame.com.es/game/index.php?page=*
// @resource css   http://userstyles.org/styles/78767.css
// @version        1.0
// @downloadURL    http://userscripts.org/scripts/source/152714.user.js
// ==/UserScript==

GM_addStyle(GM_getResourceText("css"));

(function ()
 {var myshoutboxID = "pepineitor";
	 if (document.location.href.indexOf ('/game/index.php?page=') == -1) return;
	 var chatHTML = '<div id="demonschat"><iframe id="chatdemons" src="http://demonsformax.foroactivo.com/chatbox/index.forum?archives=1" width="350" height="300" frameborder="0" allowTransparency="true"></iframe></div>' 
	 var targetElement = document.getElementById('siteFooter');
	 var origHTML = targetElement.innerHTML; 
	 targetElement.innerHTML = chatHTML + origHTML;
 }
) ();