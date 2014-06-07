// ==UserScript==
// @name           Brak reklam w menu ogame
// @namespace      Brak reklam w menu ogame
// @description    Kasuje oficerów i komandora z lewego menu w ogame by sledziu1
// ==/UserScript==

var trs = document.getElementsByTagName("tr");
for (var i = 0; i < trs.length; i++) 
{
	var tds = trs[i].getElementsByTagName("td");
	for(var j = 0; j < tds.length; j++)
	{
		var links = tds[j].getElementsByTagName("a");
		for(var x = 0; x < links.length; x++)
		{
			if((links[x].getAttribute("href").substr(0,13) == "offiziere.php") || (links[x].getAttribute("href").substr(0,18) == "commander/info.php"))
			{
				trs[i].style.display = "none";
			}
		}
	}
}

document.getElementById("anfang").style.display = "none";
document.getElementById("ende").style.display = "none";
document.getElementById("combox").style.display = "none";
document.getElementById("combox_container").style.display = "none";