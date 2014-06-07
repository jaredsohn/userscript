// ==UserScript==
// @name	    	Megaupload Direct Download
// Last Edited		December 2013

// @include     	http://www.megaupload.com/?d=*
// ==/UserScript==

/*
This script was modified in December 2013.
While the original version is I do not know anymore who the creator.
I'm Sorry...!
*/

show();

function show()
{
	var downloadcounter = document.getElementById("downloadcounter");
	downloadcounter.setAttribute("style", "display:none");

	var downloadlink = document.getElementById("downloadlink");
	downloadlink.setAttribute("style", "display:block");
	downloadlink.childNodes[0].setAttribute("onclick", "");
    document.getElementsByClassName("table_div_b")[4].innerHTML = "<strong style=\"color: green;\">Aucune Pub - No Ads !<br>antipubchrome.org<br> antipubfirefox.org</strong>";
	document.getElementsByClassName("table_div_b")[5].innerHTML = "<strong style=\"color: green;\">Aucun :)</strong>";
}

(function() {document.location = document.getElementById('downloadlink').firstChild.href;})();

