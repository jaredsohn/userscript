// ==UserScript==
// @name        IP Entbans
// @namespace   PaveLow45
// @include     *rpg-city.de/index.php?page=Thread*
// @include	*rpg-city.de/index.php?form=PostEdit*
// @version     1
// @grant 	GM_setClipboard
// ==/UserScript==

if(document.URL.search(/page=Thread/) != -1)
{
	var forum = document.getElementById("main").getElementsByTagName("ul")[0].getElementsByTagName("span")[document.getElementById("main").getElementsByTagName("ul")[0].getElementsByTagName("span").length-1].innerHTML;
	if(forum == "IP Entbannanträge")
	{
		var ip = -1;
		id = unsafeWindow.threadID;
		var post = document.getElementsByClassName("messageBody")[0];
		var li = document.createElement("li");
		li.innerHTML = "<a><img src='http://www.systeme-in-aktion.de/pics/tellafriend.gif'> <span>IP entsperren</span></a>";
		li.addEventListener("click", unBan);
		post.getElementsByTagName("div")[0].id.search(/postText(\d+)/);
		document.getElementById("postButtons"+RegExp.$1).appendChild(li);
		ip = document.getElementsByClassName("userMessenger")[0].getElementsByTagName("ul")[0].getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerHTML;
	}
	else if(forum == "Team Forum")
	{
		var threadName = document.getElementsByTagName("h2")[0].getElementsByTagName("a")[0].innerHTML;
		if(threadName == "IP Entbannthread")
		{
			for(i = 0; i < document.getElementsByClassName("messageBody").length; i++)
			{
				var post = document.getElementsByClassName("messageBody")[i];
				var li = document.createElement("li");
				document.getElementsByClassName("messageNumber")[i].href.search(/.*postID=(.*)#.*/);
				var postID = RegExp.$1;
				li.innerHTML = "<a href='http://rpg-city.de/index.php?page=Thread&postID="+postID+"&beitragID="+i+"'><img src='http://www.systeme-in-aktion.de/pics/tellafriend.gif'> <span>IP entsperren</span></a>";
				post.getElementsByTagName("div")[0].id.search(/postText(\d+)/);
				document.getElementById("postButtons"+RegExp.$1).appendChild(li);
			}
			
			if(document.URL.search(/.*&beitragID=(.*)/) != -1)
			{
				var beitragID = RegExp.$1;
				
				document.URL.search(/postID=(.*)&beitragID=.*/);
				var postID = RegExp.$1;
				
				var msg = document.getElementsByClassName("messageBody")[beitragID].innerHTML.replace(/<[^>]*>/g, "").split("\n");
				var ip = -1;

				for(var i=0;i<msg.length;i++)
				{
					if(msg[i].search(/IP: ?(.*)/) != -1)
					{
						ip = RegExp.$1;
					}
				}
				ip = ip.replace(/^\s*/, "").replace(/\s*$/, "");
				GM_setClipboard("/rcon unbanip "+ip+"", 'text');
				location.href = "http://rpg-city.de/index.php?form=PostEdit&postID="+postID+"&deleteIP";
				//alert("Befehl wurde in die Zwischenablage kopiert");
			}
		}
	}
}

if(location.href.search(/&deleteIP$/) != -1)
{
	document.getElementsByClassName("container-1")[0].getElementsByTagName("input")[0].checked = true;
	document.getElementsByClassName("formField")[0].getElementsByTagName("textarea")[0].value = "Bearbeitet";
	document.getElementsByClassName("formField")[1].getElementsByTagName("input")[1].click();
}

if(document.URL.search(/.*rpg-city.de.*&ipUnban/) != -1)
{
	document.getElementById("text").value = IPtext;
	document.getElementsByName("send")[0].click();
}

function unBan()
{
	if(ip == -1)
	{
		alert("Die IP konnte nicht ausgelesen werden.");
	}
	else
	{
		GM_setClipboard("/rcon unbanip"+ip+"", 'text');
		alert("Befehl wurde in die Zwischenablage kopiert");
		location.href = "http://www.rpg-city.de/index.php?page=Thread&threadID="+id+"&ipUnban";
	}
}