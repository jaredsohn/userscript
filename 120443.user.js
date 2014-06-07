// ==UserScript==
// @name           ALI BOX HULK
// @namespace      net.smithline + Danix
// @include        http://uni114.ogame.com.es/game/index.php?page=*
// @resource css   http://userstyles.org/styles/57953.css
// ==/UserScript==


GM_addStyle(GM_getResourceText("css"));

(function ()
 {var myshoutboxID = "hulk";

	 // The following "if" is not really necessary but with it this script will work for Opera too
	 if (document.location.href.indexOf ('/game/index.php?page=') == -1) return;
	 
	 // var usernameText = document.getElementById('playerName').getElementsByTagName("span")[0].innerHTML;
	 var chatHTML = '<div id="shoutboxbox"><iframe id="shoutbox" src="http://' + myshoutboxID + '.freeshoutbox.net/"  width="300" height="300" frameborder="0" allowTransparency="true"></iframe></div>'
	 
	 var targetElement = document.getElementById('siteFooter');
	 var origHTML = targetElement.innerHTML;
	 
	 targetElement.innerHTML = chatHTML + origHTML;
 }



) ();