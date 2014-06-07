// ==UserScript==
// @name           ChatBox nick-wklejacz
// @author         Baka78
// @created        march 28th 2012
// @description    Klikniecie nicka kopiuje go do pola tekstowego wraz z formatowaniem
// @include        http://precyl.pl/forum.php
// @include        http://precyl.pl/misc.php?do=cchatbox
// ==/UserScript==
(function(){
	document.getElementById("vsacb_messagearea").addEventListener ("DOMNodeInserted", NickDrop, false);
	function NickDrop(){
		document.getElementById("vsacb_messagearea").removeEventListener ("DOMNodeInserted", NickDrop, false);
		for(i=0;i<30;i++)
		{
			var location = document.getElementById("vsacb_messagearea").getElementsByTagName("tr")[i].getElementsByTagName("a")[1];
			var content = location.innerHTML;
			if(location.href!="javascript:void(0);"){
				var data = content.match(/<(font color="|span style="color: )(.*?);?(font-weight: bold;)?(font-style: italic;)?">(<img .*?>)?(<b>)?(<u>)?(<i>)?(<s>)?(.*?)(<\/s>)?(<\/i>)?(<\/u>)?(<\/b>)?<\/(font|span)>/);
				var nick = data[10];
				if (data[9]) { nick = "[s]" + nick + "[/s]"; }
				if (data[8] || data[4]) { nick = "[i]" + nick + "[/i]"; }
				if (data[7]) { nick = "[u]" + nick + "[/u]"; }
				if (data[6] || data[3]) { nick = "[b]" + nick + "[/b]"; }
				if (data[2]) { nick = "[color="+ data[2] +"]" + nick + "[/color]"; }
				location.setAttribute("href", "javascript:void(0);");
				location.setAttribute("onclick", "document.getElementById('vsacb_entermessage').focus(); return VSacb_insertSmilie('" + nick + "');");
			}
			else
			{
				break;
			}
		}
		document.getElementById("vsacb_messagearea").addEventListener ("DOMNodeInserted", NickDrop, false);
	}
})();