// ==UserScript==
// @name           Zajefajna ChatBox URL Changer
// @description    Zmienia linki w ChatBoksie na takie jak dawniej - po kliku nazwa leci do pola pisania.
// @include        http://www.precyl.pl/
// @include        http://www.precyl.pl/forum.php
// @include        http://www.precyl.pl/misc.php?do=cchatbox
// ==/UserScript==
(function(){
	document.getElementById("vsacb_messagearea").addEventListener ("DOMNodeInserted", ChangeURLs, false);
	function ChangeURLs(){
		document.getElementById("vsacb_messagearea").removeEventListener ("DOMNodeInserted", ChangeURLs, false);
		for(i=0;i<30;i++)
		{
			var location = document.getElementById("vsacb_messagearea").getElementsByTagName("tr")[i].getElementsByTagName("a")[1];
			var content = location.innerHTML;
			if(location.href!="javascript:void(0);"){
				content = content.replace(/<(font color=\"|span style=\"color\:)(.*?);?\">(<img .*?>)?(<b>)?(.*?)(<\/b>)?<\/(font|span)>/i,"$2 , $5");
				var data = content.split(" , ");
				location.setAttribute("href", "javascript:void(0);");
				location.setAttribute("onclick", "document.getElementById('vsacb_entermessage').focus(); return VSacb_insertSmilie('[b][color=" + data[0] + "]" + data[1] + "[\/color][\/b], ');");
			}
			else
			{
				break;
			}
		}
		document.getElementById("vsacb_messagearea").addEventListener ("DOMNodeInserted", ChangeURLs, false);
	}
})();