// ==UserScript==
// @name           ChatBox nick-wklejacz v.3
// @author         Baka78
// @created        march 28th 2012
// @description    Klikniecie nicka kopiuje go do pola tekstowego wraz z formatowaniem
// @include        http://precyl.com/forum.php
// @include        http://precyl.com/misc.php?do=cchatbox
// ==/UserScript==

// podaj w cudzysłowie znak poprzedzajšcy cytowany nick
var prefix = "";

(function(){
	document.getElementById("vsacb_messagearea").addEventListener ("DOMNodeInserted", NickDrop, false);
	function NickDrop(){
		document.getElementById("vsacb_messagearea").removeEventListener ("DOMNodeInserted", NickDrop, false);
		for(i=0;i<30;i++)
		{
			var location = document.getElementById("vsacb_messagearea").getElementsByTagName("tr")[i].getElementsByTagName("a")[1];
			var content = location.innerHTML;
			if(location.href!="javascript:void(0);"){
				var data = content.match(/<(span|font)(.*?)color(="|:\s?)(.*?)(;|")(.*?)?>(.*?)<\/(span|font)>/);
				var nick = prefix+data[7];
				if (content.lastIndexOf("line-through") != -1)  { nick = "[s]" + nick + "[/s]"; }
				if (content.lastIndexOf("italic") != -1)  { nick = "[i]" + nick + "[/i]"; }
				if (content.lastIndexOf("underline") != -1)  { nick = "[u]" + nick + "[/u]"; }
				if (content.lastIndexOf("bold") != -1)  { nick = "[b]" + nick + "[/b]"; }
				if (data[4]) { nick = "[color="+ data[4] +"]" + nick + "[/color]"; }
				location.setAttribute("href", "javascript:void(0);");
				location.setAttribute("onclick", "document.getElementById('vsacb_entermessage').focus(); return VSacb_insertSmilie('" + nick + "  ');");
			}
			else
			{
				break;
			}
		}
		document.getElementById("vsacb_messagearea").addEventListener ("DOMNodeInserted", NickDrop, false);
	}
})();

// http://userscripts.org/scripts/show/129441