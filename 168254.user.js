// ==UserScript==
// @name        Benachrichtigungen Tool
// @namespace   PaveLow45
// @include     *rpg-city.de/index.php?page=Index*
// @include     *rpg-city.de
// @include     *rpg-city.de/
// @include     *rpg-city.de/index.php
// @version     1
// ==/UserScript==

var pmContainer = document.getElementById("pmOutstandingNotifications");
var LogAnzahl = 0;
var ActiveBen = 0;

for(var i=0;i<pmContainer.getElementsByTagName("a").length;i++)
{
	if(pmContainer.getElementsByTagName("a")[i].href.search(/pmID=/) != -1 && pmContainer.getElementsByTagName("a")[i].innerHTML == "Benutzer IP-Log Benachrichtung")
	{
		LogAnzahl++;
	}
}

if(ActiveBen == 1)
{
	var benContainer = document.getElementById("outstandingNotificationsContainer");

	for(var i=2;i<benContainer.getElementsByTagName("a").length;i++)
	{
		if(benContainer.getElementsByTagName("a")[i].innerHTML == "Fragen an das Team")
		{
			GM_xmlhttpRequest({
				  method: "GET",
				  url: benContainer.getElementsByTagName("a")[i].href
			});
		}
		i++;
	}
}

function readIPTrash()
{
	for(var i=0;i<pmContainer.getElementsByTagName("a").length;i++)
	{
		if(pmContainer.getElementsByTagName("a")[i].href.search(/pmID=(\d+)/) != -1 && pmContainer.getElementsByTagName("a")[i].innerHTML == "Benutzer IP-Log Benachrichtung")
		{
			GM_xmlhttpRequest({
			  method: "GET",
			  url: "http://www.rpg-city.de/index.php?page=PM&action=delete&pmID="+RegExp.$1+"&t="+unsafeWindow.SECURITY_TOKEN
			});
			
			GM_xmlhttpRequest({
			  method: "GET",
			  url: "http://www.rpg-city.de/index.php?page=PM&action=delete&pmID="+RegExp.$1+"&t="+unsafeWindow.SECURITY_TOKEN
			});
		}
	}
	location.href = location.href;
}

if(LogAnzahl != 0)
{
	var a = document.createElement("a");
	var img = document.createElement("img");
	img.src = "http://www10.pic-upload.de/15.05.13/i7hmbgnj7y35.png";
	a.addEventListener("click", readIPTrash);
	a.setAttribute("style", "float:right;margin-left:10px;ir");
	a.title = "IP-Log-Benachrichtigungen ausblenden";
	a.appendChild(img);
	pmContainer.insertBefore(a, pmContainer.getElementsByTagName("a")[0]);
}