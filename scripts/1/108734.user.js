// ==UserScript==
// @name           OGame chat ANA alliance
// @namespace      Anatoxin
// @version        1.66
// @date           2012-03-06
// @description    Az A.N.A szovetseg chatje a szovetsegi oldalon
// @include        *.ogame.hu/game/index.php?page=alliance*
// ==/UserScript==

(function ()
 {   
	 //Beallitasok:
	 var chat_a_szovetsegi_oldalon = 'a_chat_pontos_cime';

	 // The following "if" is not really necessary but with it this script will work for Opera too
	 if (document.location.href.indexOf ('/game/index.php?page=') == -1) return;
	 
	 var chatHTML = '<div id="shoutboxbox"><iframe title="chat" width="661" HEIGHT="315" src="' + chat_a_szovetsegi_oldalon + '" frameborder="0" scrolling="auto"></iframe></div>'
	  
	 var targetElement = document.getElementById('inhalt');
	 var origHTML = targetElement.innerHTML;
	 
	 targetElement.innerHTML = chatHTML + origHTML;
 }
) ();