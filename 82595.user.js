// ==UserScript==
// @name           Fix in alliance messages tag <br>
// @namespace  Joksu65
// @version        1.1
// @date            2010-07-30
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// ==/UserScript==

(function ()
{	
	if (document.location.href.indexOf ('/game/index.php?page=showmessage') == -1)
		return;	
	var theDivs = document.getElementById("wrapper").getElementsByTagName ("div");
		for (var i = 0; i < theDivs.length; i++)
    			if (theDivs [i].className == "note")
        		break;
	var noteDiv = theDivs [i];
	noteDiv.innerHTML = noteDiv.innerHTML.replace(/\&lt;br&gt;/g, "<br>");  
	})();
