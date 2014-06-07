// ==UserScript==
// @name           OCB
// @namespace      Europe 1400: OCB
// @include        *.es.europe1400.com/*dialog=MessageDialog*
// @resource css   http://userstyles.org/styles/49562.css
// @version        1.1
// ==/UserScript==

// version 1.0     Chat a la izquierda
// version 1.1     Movido a la derecha

(function ()
 {var myshoutboxID = "Lop";


	 var chatHTML = '<div id="shoutboxbox" ><iframe id="shoutbox" src="http://' + myshoutboxID + '.freeshoutbox.net/" width="192" style="float:right; margin-top:90px" height="455" frameborder="0" allowTransparency="false"></iframe></div>'
	 var targetElement = document.getElementById('GUI');
	 var origHTML = targetElement.innerHTML;
	 
	 targetElement.innerHTML = chatHTML + origHTML;
 }



) ();