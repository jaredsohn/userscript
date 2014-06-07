// ==UserScript==
// @name           OGame Redesign: Chat
// @description    Chat/forum
// @version        0.01
// @date           2010-08-21
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ('/game/index.php?page=') == -1) return;
	var servers = [
		["OGAME.COM.ES", "Chat"],
		["MX.OGAME.ORG", "Chat"],
		["OGAME.ORG",    "Chat"]
	];
	var server = document.location.href.split (/\//) [2];
	var universe = server.split (/\./) [0];
	server = server.replace (universe + ".", "").toUpperCase ();
	
	for (var i = 0; i < servers.length; i++)
		if (server.indexOf (servers [i] [0]) > -1)
		{
			locaPranger = servers [i] [1];
			break;
		}

	var div = document.getElementById ("bar");
	
	var li4 = div.getElementsByTagName ("li") [4];
	var li = document.createElement ("li");
	var a = document.createElement ("a");
	a.setAttribute ("href", "http://recicladores.foroespana.org/chatbox/index.forum?");
	a.setAttribute ("target", "_blank");
	a.appendChild (document.createTextNode (locaPranger));
	li.appendChild (a);
	li4.parentNode.insertBefore (li, li4);
}) ();