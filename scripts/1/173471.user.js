// ==UserScript==
// @name        Fake Kill Script
// @namespace   PaveLow45
// @include     *rpg-city.de/*
// @version     1
// ==/UserScript==

if(document.getElementsByName("threadID")[0].value == 55147)
{	
	for(i = 0; i < document.getElementsByClassName("messageBody").length; i++)
	{
		var post = document.getElementsByClassName("messageBody")[i];
		var li = document.createElement("li");

		document.getElementsByClassName("userName")[i].getElementsByTagName("a")[0].title.search(/Benutzerprofil von »(.*)« aufrufen/);
		var name = RegExp.$1;
		
		li.innerHTML = "<a href='http://rpg-city.de/index.php?page=Thread&threadID="+document.getElementsByName("threadID")[0].value+"&name="+name+"&documentID="+i+"&typ=0'><img src='http://i.epvpimg.com/K1Qbe.png'> <span>Abgelehnt</span></a>";
		post.getElementsByTagName("div")[0].id.search(/postText(\d+)/);
		document.getElementById("postButtons"+RegExp.$1).appendChild(li);
		
		var li2 = document.createElement("li");
		li2.innerHTML = "<a href='http://rpg-city.de/index.php?page=Thread&threadID="+document.getElementsByName("threadID")[0].value+"&name="+name+"&documentID="+i+"&typ=1'><img src='http://i.epvpimg.com/bcLLd.png'> <span>Angenommen</span></a>";
		post.getElementsByTagName("div")[0].id.search(/postText(\d+)/);
		document.getElementById("postButtons"+RegExp.$1).appendChild(li2);
	}
	
	if(document.URL.search(/.*&threadID=(.*)&name=(.*)&documentID=(.*)&typ=(.*)/) != -1)
	{
		var threadID = RegExp.$1;
		var SpielerName = RegExp.$2;
		var documentID = RegExp.$3;
		var typID = RegExp.$4;
		
		if(typID == 0) // Abgelehnt
		{
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://rpg-city.de/index.php?form=PostQuickAdd&threadID="+threadID,
				data: "send=Absenden&text=[align=center][size=12][b]Antrag von "+SpielerName+"[/b][/size] \n \n[/align]Sehr geehrte/r @"+SpielerName+":, \nwir danken Ihnen für ihren Fake Kill Antrag, allerdings müssen wir \nIhnen mitteilen, dass ihr Antrag aus einer der genannten Kritieren \nim ersten Beitrag nicht angenommen werden kann. \n \nWir wünschen Ihnen allerdings noch einen angenehmen Tag und empfehlen \nIhnen sich bei den zuständigen Behörden zu melden um ihre Strafe abzusitzen. \n \nViele Grüße, \nAveXx_ \n[i]Polizeiobermeister[/i]",
				headers: {
				"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(response) {location.href = "http://rpg-city.de/index.php?page=Thread&threadID="+threadID;}
			});
		} 
		else if(typID == 1) // Angenommen 
		{
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://rpg-city.de/index.php?form=PostQuickAdd&threadID="+threadID,
				data: "send=Absenden&text=[align=center][size=12][b]Antrag von "+SpielerName+"[/b][/size] \n \n[/align]Sehr geehrte/r @"+SpielerName+":, \nwir danken Ihnen für ihren Fake Kill Antrag. \nNach einer einhergehenden Prüfung der durch Sie vorgelegten Beweise, \nteilen wir Ihnen an dieser Stelle mit, dass unser Prüfungsausschuss Ihren Antrag für korrekt befunden hat. \n \nBitte melden Sie sich für eine Korrigierung Ihrer Strafakte bei einem Beamten vor Ort. \nWir wünschen Ihnen noch einen schönen Tag. \n \nViele Grüße, \nAveXx_ \n[i]Polizeiobermeister[/i]",
				headers: {
				"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(response) {location.href = "http://rpg-city.de/index.php?page=Thread&threadID="+threadID;}
			});
		}
	}
} 