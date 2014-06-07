// ==UserScript==
// @name           Tribalwars grondstoffen
// @description    Tribalwars grondstoffen per seconde
// @include        http://*tribalwars.nl/game.php?village=*&screen=overview
// ==/UserScript==

var rows = document.getElementsByTagName("tr");
for (r in rows)
{
	if (rows[r].className == "nowrap")
	{
		var amount = GetBetween(rows[r].innerHTML, "<strong>", "</strong>");
		
		rows[r].innerHTML = rows[r].innerHTML.replace("<strong>" + amount + "</strong> per uur", 
		"<strong>" + amount + "</strong> per uur - 1 in ~<strong>" + Math.floor(3600 / amount) + "</strong> seconden");
	}
}

function GetBetween(strToParse, strStart, strFinish)
{
	var str = strToParse.match(strStart + "(.*?)" + strFinish);
	return str[1];
}