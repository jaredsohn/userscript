// ==UserScript==
// @name           Ogame Redesign: Shoutbox
// @namespace      net.smithline
// @include        http://uni101.ogame.us/game/index.php?page=
// ==/UserScript==

(function ()
 {
     // Configuration:
     // 1) Signup for a shoutbox at http://myshoutbox.com
     // 2) Set this variable to the room number of your shoutbox.
     // 3) Tell your friends to install this script and give them your shoutbox number
     var myshoutboxID = "99999999";

	 // The following "if" is not really necessary but with it this script will work for Opera too
	 if (document.location.href.indexOf ('/game/index.php?page=') == -1) return;
	 
	 // var usernameText = document.getElementById('playerName').getElementsByTagName("span")[0].innerHTML;
	 var chatHTML = '<div id="shoutboxbox"><iframe id="shoutbox" src="http://' + myshoutboxID + '.myshoutbox.com/" width="700" height="300" frameborder="0" allowTransparency="true"></iframe></div>'
	 
	 var targetElement = document.getElementById('siteFooter');
	 var origHTML = targetElement.innerHTML;
	 
	 targetElement.innerHTML = chatHTML + origHTML;
 }
) ();
