// ==UserScript==
// @name		SFFP
// @description	Safe for Facepunch. Get rid of those terrible avatars.
// @author		ief015
// @namespace	http://facepunch.com
// @include		http://facepunch.com/*
// @include 	http://www.facepunch.com/*
// @version 	1
// ==/UserScript==


var avatarBanURL = "http://raw.github.com/ief015/SFFP/master/avban.png";
var banListURL = "http://raw.github.com/ief015/SFFP/master/banlist.txt";


function banUserAvatars(useridlist)
{
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; ++i)
	{
		var div = divs[i];
		if (div.id === "userdata")
		{
			var banned = false;
			var href = div.getElementsByTagName("a")[0];
			var userid = href.getAttribute("href").split("=")[1];
			
			// Check if user is banned.
			for (var j = 0; j < useridlist.length; ++j)
			{
				var bannedid = useridlist[j];
				if (userid === bannedid)
				{
					banned = true;
					break;
				}
			}
			
			if (banned)
			{
				var img = href.getElementsByTagName("img")[0];
				if (img)
				{
					// Facepunch ban avatar is fine.
					if (img.getAttribute("src") != "/fp/avatar_banned.png")
						img.setAttribute("src", avatarBanURL);
				}
			}
		}
	}
}


function banUserAvatarsFromURL(url)
{
	var req = new XMLHttpRequest();
	req.onreadystatechange = function()
	{
		if(req.readyState === 4)
		{
			if(req.status === 200 || req.status == 0)
			{
				var list = req.responseText.split("\n");
				for (var i = 0; i < list.length; ++i)
				{
					list[i] = list[i].trim();
				}
				banUserAvatars(list)
			}
		}
	}
	req.open("GET", url, true);
	req.send();
}

banUserAvatarsFromURL(banListURL);