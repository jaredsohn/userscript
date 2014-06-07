// ==UserScript==
// @name        Entbannen
// @namespace   PaveLow45
// @include     *rpg-city.de/index.php?page=Thread*
// @include 	*cp.rpg-city.de*
// @version     1
// @grant       none
// ==/UserScript==

if(document.URL.search(/page=Thread/) != -1)
{
	var forum = document.getElementById("main").getElementsByTagName("ul")[0].getElementsByTagName("span")[2].innerHTML;
	if(forum == "Bann Forum")
	{
		id = unsafeWindow.threadID;
		var post = document.getElementsByClassName("messageBody")[0];
		var li = document.createElement("li");
		li.innerHTML = "<a><img src='http://www.saigns.de/forums/images/icons/icon1.gif'> <span>Entsperren</span></a>";
		li.addEventListener("click", unBan);
		post.getElementsByTagName("div")[0].id.search(/postText(\d+)/);
		document.getElementById("postButtons"+RegExp.$1).appendChild(li);
	}
}
if(document.URL.search(/.*rpg-city.de.*&unBan/) != -1)
{
	document.getElementById("text").value = "Hallo,\n wir haben uns hier versammelt um Ihren Fall zu verhandeln.\nWir sind zu dem Entschluss gekommen, Ihrem Antrag stattzugeben.\n\nBevor wir Ihre IP entbannen, starten Sie bitte Ihren Router neu.\nFalls dies zu keinem probaten Ergebnis führt, wenden Sie sich bitte direkt\nper [b][url='http://rpg-city.de/index.php?form=PMNew&userID=5242']PN[/url][/b] an mich.\n\nMit freundlichen Grüßen,\nChubbyBunny\n[i]Head Administrator[/i]";
	document.getElementsByName("send")[0].click();
}
else if(document.URL.search(/.*cp.rpg-city.de.*action=unBan&id=(.*)&name=(.*)/) != -1)
{
	var id = RegExp.$1;
	var name = RegExp.$2;
	document.getElementsByTagName("a")[2].href.search(/ticket=(.*)/);
	var ticket = RegExp.$1;
	
	var request = new XMLHttpRequest();
	request.open("GET", "http://cp.rpg-city.de?funktion=_user_akte&user="+name+"&ticket="+ticket, false);
	request.send(null);
	
	if(request.responseText.search(/Du kannst dich hier mit deinen Ingame Account Daten einloggen/) != -1)
	{
		alert("Du bist nicht eingeloggt!");
		location.href = "http://rpg-city.de/index.php?page=Thread&threadID="+id;
	}
	else
	{
		var akte = request.responseText.replace(/<[^>]*>/g, "").split("\r\n");
		var banText = -1;
		var admin = "";
		for(var i = akte.length-1; i >= 0; i--)
		{
			if(akte[i].search(/^\[Ban\]/) != -1)
			{
				akte[i-1].search(/\| (.*) >>$/);
				admin = RegExp.$1;
				if(akte[i].search(/i\. ?A\.? ?([^ ]*)$/i) != -1) admin = RegExp.$1;
				banText = akte[i-1]+" "+akte[i];
				break;
			}
		}
	}
	
	if(confirm(banText))
	{
		location.href = "http://cp.rpg-city.de/index.php?funktion=_pranger&ticket="+ticket+"&aktion=entsperren&username="+name+"&id="+id+"";
	}
	else
	{
		location.href = "http://rpg-city.de/index.php?page=Thread&threadID="+id+"";
	}
}
else if(document.URL.search(/.*cp.rpg-city.de.*funktion=_pranger&ticket=(.*)&aktion=entsperren&username=(.*)&id=(.*)/) != -1)
{
	var ticket = RegExp.$1;
	var name = RegExp.$2;
	var id = RegExp.$3;
	
	location.href = "http://cp.rpg-city.de/index.php?funktion=_user_akte&user="+name+"&ticket="+ticket+"&id="+id+"";
}
else if(document.URL.search(/.*cp.rpg-city.de.*funktion=_user_akte&user=(.*)&ticket=(.*)&id=(.*)/) != -1)
{
	var id = RegExp.$3;
	var str = document.getElementsByTagName("p")[document.getElementsByTagName("p").length-1].innerHTML;
	var n = str.indexOf("[UnBan] Entsperrt");
	if(n == -1)
	{
		document.getElementsByClassName("formname")[0].value = "[UnBan] Entsperrt";
		document.getElementsByClassName("button")[0].click();
	}
	else
	{
		location.href = "http://rpg-city.de/index.php?page=Thread&threadID="+id+"&unBan";
	}
}

function unBan()
{
	var msg = post.innerHTML.replace(/<[^>]*>/g, "").split("\n");
	var name = -1;

	for(var i=0;i<msg.length;i++)
	{
		if(msg[i].search(/Name im Spiel: ?(.*)/) != -1)
		{
			name = RegExp.$1;
		}
	}
	if(name == -1)
	{
		alert("Der Name konnte nicht ausgelesen werden");
		return;
	}
	location.href = "http://cp.rpg-city.de/?action=unBan&id="+id+"&name="+name;
}