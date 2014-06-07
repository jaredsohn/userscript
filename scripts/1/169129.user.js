// ==UserScript==
// @name        Multiaccount Sperrung
// @namespace   PaveLow45
// @include     *cp.rpg-city.de*funktion=_suchemultiacc*
// @version     1
// ==/UserScript==

function banAll()
{
	if(confirm("Möchtest du alle aufgelisteten Accounts sperren?"))
	{
		for(var i=0;i<document.getElementsByClassName("content")[0].getElementsByTagName("a").length;i++)
		{
			if(document.getElementsByClassName("content")[0].getElementsByTagName("a")[i].href.search(/sperreusers/) != -1)
				GM_xmlhttpRequest({
				  method: "POST",
				  url: document.getElementsByClassName("content")[0].getElementsByTagName("a")[i].href,
				  data: "grund=Multiaccount&dauer=0&username="+document.getElementsByClassName("content")[0].getElementsByTagName("a")[i-1].innerHTML,
				  headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				  }
				});
		}
		alert("Alle Accounts wurden gesperrt.");
	}
	else
	{
		alert("Die Aktion wurde abgebrochen.");
	}
}

var a = document.createElement("a");
a.innerHTML = "<br><img src='http://wiwi.uni-giessen.de/gi_pics/intranet/pics_11/q/o/lock.gif'>";
a.addEventListener("click", banAll);
a.setAttribute("style", "float:right;");
a.href = "#";

document.getElementsByClassName("content")[0].insertBefore(a, document.getElementsByClassName("content")[0].getElementsByTagName("h1")[0]);