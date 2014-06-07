// ==UserScript==
// @name           Hooligans Gaming
// @version        0.3.6
// @namespace      http://www.hooligans-gaming.net/
// @include        http://www.hooligans-gaming.net/
// @include        http://www.hooligans-gaming.net/index.php*
// @exclude        http://www.hooligans-gaming.net/index.php?action=*
// @exclude        http://www.hooligans-gaming.net/?action=*
// @exclude        http://www.hooligans-gaming.net/index.php/topic*
// ==/UserScript==
 
/* Author: Daniel Baucom 
 * License: GPL2
 * Version: 0.3.6
 */
var tfhack;

function getMessages(item)
{ 
	tfhack=new XMLHttpRequest();
	if (tfhack==null)
	{
		alert ("Browser does not support HTTP Request");
		return;
	}
	var url="http://www.hooligans-gaming.net/index.php?action=pm";
	tfhack.onreadystatechange=function() 
	{ 
		if (tfhack.readyState==4 || tfhack.readyState=="complete")
		{
			var incoming = document.createElement("div");
			incoming.innerHTML = tfhack.responseText;
			var a = incoming.getElementsByTagName('form')[0].childNodes[1];
			var chkbx = a.getElementsByTagName("Input");
			for(var cnt=chkbx.length; cnt>0; cnt=chkbx.length)
			{
				chkbx[cnt-1].parentNode.removeChild(chkbx[cnt-1]);
			}
			var links=a.getElementsByTagName("A");
			var pmurl = "?action=pm#";
			for (var cnt=0; cnt<links.length; cnt++){
				var msg = links[cnt].href.split("#")[1];
				links[cnt].href = pmurl + msg;
			}
			item.appendChild(a);
		}
	};
	tfhack.open("GET",url,true);
	tfhack.send(null);
}
var element = document.getElementById("menubar").childNodes[1].childNodes[0].childNodes[6];
if (element.innerHTML!=undefined && element.innerHTML.match(/Logout/))
{
	var message = document.createElement("div");
	message.setAttribute("class","tborder");
	message.setAttribute("style","margin-top: 0pt;");
	var thead = document.getElementsByTagName('table')[0].nextSibling.nextSibling;
	document.getElementsByTagName('table')[0].parentNode.insertBefore(message, thead);
	getMessages(message);
}