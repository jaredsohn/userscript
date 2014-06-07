// ==UserScript==
// @name        Namechanges
// @namespace   PaveLow45
// @include     *rpg-city.de/index.php?page=Thread*
// @include 	*cp.rpg-city.de*
// @version     1
// @grant       none
// ==/UserScript==

if(document.URL.search(/page=Thread/) != -1)
{
	var forum = document.getElementById("main").getElementsByTagName("ul")[0].getElementsByTagName("span")[1].innerHTML;
	if(forum == "Namechange Beantragungen")
	{
		id = unsafeWindow.threadID;
		var post = document.getElementsByClassName("messageBody")[0];
		var li = document.createElement("li");
		li.innerHTML = "<a><img src='http://i.epvpimg.com/bcLLd.png'> <span>Namechange bestätigen</span></a>";
		li.addEventListener("click", nameChange);
		post.getElementsByTagName("div")[0].id.search(/postText(\d+)/);
		document.getElementById("postButtons"+RegExp.$1).appendChild(li);
	}
}
if(document.URL.search(/.*rpg-city.de.*&nCode=(.*)/) != -1)
{
	var fName = document.getElementById("userNote").getElementsByTagName("a")[0].innerHTML;
	var nCode = RegExp.$1;
	if(nCode == 1){
		nText = "[align=center][img]http://rpg-city.de/logo.gif[/img] \n[/align]Hallo, \nwir müssen Ihnen mitteilen, dass ihr Namechange Antrag abgelehnt wird. \nDer von Ihnen gewünschte Name, wird bereits verwendet. \n \nViele Grüße, \n"+fName+" \n[i]Head-Administrator[/i]";
	}
	if(nCode == 2){
		nText = "[align=center][img]http://rpg-city.de/logo.gif[/img] \n[/align]Hallo, \nwir müssen Ihnen mitteilen, dass ihr Namechange Antrag abgelehnt wird. \nDer von Ihnen angegebene Account, existiert nicht. \n \nViele Grüße, \n"+fName+" \n[i]Head-Administrator[/i]";
	}
	if(nCode == 3){
		nText = "[align=center][img]http://rpg-city.de/logo.gif[/img] \n[/align]Hallo, \nwir müssen Ihnen mitteilen, dass ihr Namechange Antrag abgelehnt wird. \nSie haben bereits schonmal ihren Namen geändert, somit ist ein weiterer Namechange nicht möglich. \n \nViele Grüße, \n"+fName+" \n[i]Head-Administrator[/i]";
	}
	if(nCode == 4){
		nText = "[align=center][img]http://rpg-city.de/logo.gif[/img][/align]Hallo, \nwir freuen uns Ihnen mitzuteilen, das ihr Namechange statt gegeben wird. \nFalls Sie eine Frage dazu haben, wenden Sie sich an einen zuständigen Supporter. \n \nViele Grüße, \n"+fName+" \n[i]Head-Administrator[/i]";
	}
	document.getElementById("text").value = nText;
	document.getElementsByName("send")[0].click();
}
else if(document.URL.search(/.*cp.rpg-city.de.*action=nameChange&id=(.*)&name=(.*)&split1=(.*)&split2=(.*)&split3=(.*)/) != -1)
{
	var id = RegExp.$1;
	var name = RegExp.$2;
	var split1 = RegExp.$3;
	var split2 = RegExp.$4;
	var split3 = RegExp.$5;
	if(document.body.innerHTML.search(/Du kannst dich hier mit deinen Ingame Account Daten einloggen./) != -1){
		alert("Du musst dich vorher im Control Panel einloggen");
		location.href = "http://rpg-city.de/index.php?page=Thread&threadID="+id+"";
		return;
	} 
	document.getElementsByTagName("a")[2].href.search(/ticket=(.*)/);
	var ticket = RegExp.$1;
	
	if(confirm("Möchtest du den Namechange von "+name+" -> "+split1+""+split2+""+split3+" bestätigen?"))
	{
		location.href = "http://cp.rpg-city.de/index.php?funktion=_namechange_admin&ticket="+ticket+"&id="+id+"&name="+name+"&split1="+split1+"&split2="+split2+"&split3="+split3+"";
	}
	else
	{
		location.href = "http://rpg-city.de/index.php?page=Thread&threadID="+id+"";
	}
}
else if(document.URL.search(/.*cp.rpg-city.de.*funktion=_namechange_admin&ticket=(.*)&id=(.*)&name=(.*)&split1=(.*)&split2=(.*)&split3=(.*)/) != -1)
{
	var ticket = RegExp.$1;
	var id = RegExp.$2;
	if(document.body.innerHTML.search(/Dieser Name wird bereits verwendet./) != -1){
		location.href = "http://rpg-city.de/index.php?page=Thread&threadID="+id+"&nCode=1";
		return;
	} 
	else if(document.body.innerHTML.search(/Der Spieler wurde nicht gefunden./) != -1){
		location.href = "http://rpg-city.de/index.php?page=Thread&threadID="+id+"&nCode=2";
		return;
	}
	else if(document.body.innerHTML.search(/Der Spieler hat seinen Namen bereits geändert./) != -1){
		location.href = "http://rpg-city.de/index.php?page=Thread&threadID="+id+"&nCode=3";
		return;
	}
	else if(document.body.innerHTML.search(/Du hast eine Bestätigung für den Spieler/) != -1){
		location.href = "http://rpg-city.de/index.php?page=Thread&threadID="+id+"&nCode=4";
		return;
	}
	var name = RegExp.$3;
	var split1 = RegExp.$4;
	var split2 = RegExp.$5;
	var split3 = RegExp.$6;
	document.getElementsByName("currentname")[0].value = name;
	document.getElementsByName("firstname")[0].value = split1;
	if(split2 == "_"){
		document.getElementsByName("separated")[0].selectedIndex = 0;
	}
	else if(split2 == "."){
		document.getElementsByName("separated")[0].selectedIndex = 1;
	}
	document.getElementsByName("lastname")[0].value = split3;
	//document.getElementsByClassName("button")[0].click();
	document.getElementsByTagName("form")[0].submit();
}

function nameChange()
{
	var msg = post.innerHTML.replace(/<[^>]*>/g, "").split("\n");
	var name = -1;
	var newName = -1;
	var splitName1;
	var splitName2;
	var splitName3;
	
	for(var i=0; i < msg.length; i++)
	{
		if(msg[i].search(/Name im Spiel: ?(.*)/) != -1)
		{
			name = RegExp.$1;
		}
		if(msg[i].search(/Neuer Name: ?(.*)/) != -1)
		{
			newName = RegExp.$1;
			newName.search(/([^ ]+)([\._])([^ ]+)/);
			splitName1 = RegExp.$1;
			splitName2 = RegExp.$2;
			splitName3 = RegExp.$3;
		}
	}
	if(name == -1){
		alert("Es konnte kein Name ausgelesen werden");
		return;
	} 
	if(newName == -1){
		alert("Der neue Name konnte nicht ausgelesen weden");
		return;
	}
	location.href = "http://cp.rpg-city.de/?action=nameChange&id="+id+"&name="+name+"&split1="+splitName1+"&split2="+splitName2+"&split3="+splitName3+"";
}