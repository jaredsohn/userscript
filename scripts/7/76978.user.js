// ==UserScript==
// @name           Twitter Reply Repair
// @namespace      http://blog.metsuke.com/code/
// @description    Genera enlace de Reply Antiguo. Derivada de "old retweet option" by jamespgilbert
// @version 0.2
// @license: GNU/GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include        http://twitter.com/*
// @include        http://twitter.com/*#favorites
// ==/UserScript==

/*
This is a Greasemonkey script. See http://greasemonkey.mozdev.org/ for more info.

Script  Released Under GPL License v3 (http://www.gnu.org/copyleft/gpl.html) 

Genera enlace de Reply Antiguo. Derivada de "old retweet option" by jamespgilbert

v 0.2 2010-05-18 Formato del Link identico al original.
v 0.1 2010-05-17 Version Original.

*/

unsafeWindow.realRT = function(txt)
{
	document.getElementById("status").value = txt.replace("_apos_", "'","g").replace("_quot_", "\"","g");
	window.scroll(0,0);
}


if(document.getElementById("status"))
{
	var tline = document.getElementById("timeline");
	var statuses = tline.getElementsByClassName("hentry");
	for(var s = 0; s < statuses.length; s++)
	{
		var status = statuses[s];
		var uname = status.className.split(' ')[1];
		var statusbody = status.getElementsByClassName("status-body")[0];
		
		var entrycontent = statusbody.getElementsByClassName("entry-content")[0];
		if(!entrycontent)
		{
			var statuscontent = statusbody.getElementsByClassName("status-content")[0];
			entrycontent = statuscontent.getElementsByClassName("entry-content")[0];
		}
		
		var content = entrycontent.textContent;	
		var actions = statusbody.getElementsByTagName("ul")[0];
		
		var realrt = document.createElement("li");
		realrt.id = "rt_" + uname.substr(2) + "_" + Math.ceil(Math.random() * 9999);
		realrt.innerHTML = " <span class='retweet-link'><span class='retweet-icon icon'></span><a title=\"Retweet\" href=\"#\" onclick=\"realRT('RT @" + uname.substr(2) + " " + content.replace("'", "_apos_", "g").replace("\"", "_quot_","g") + "')\">Real RT</a></span>";
		actions.appendChild(realrt);
	}
}