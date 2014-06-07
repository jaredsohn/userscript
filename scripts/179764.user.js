// ==UserScript==
// @name		DBFPA
// @description	dONT Ban Facepunch Anime. Anime is great, love it.
// @author		ief015 (modified by The Freeman(not really modified(get over it))) MODIEFIED BY CREEC
// @namespace	http://facepunch.com
// @include		http://facepunch.com/*
// @include 	http://www.facepunch.com/*
// @version 	2
// ==/UserScript==


var avatarBanURL = "http://horobox.co.uk/u/creec_1381609999.png";
var banListURL = "http://raw.github.com/dragonrobot/BFPA/master/banlist.txt";
var extrabanlist = new Array("116543","307826","254430","53222","238264","275324","204155","185056","71095","151867","291925","494880","54557","97589","17104","177457","246143","85169","289337","142794","221187","183418","510485","554187","399538","210386","262860","151867","291925","130305","73160","401270","148102","69287","72068","44687","457277","151989","43805","56396","141484","123571","397863","196736","136903","132300","439910","44687","221648","79942","220298","121580","134399","138043","146152","149923","156242","158888","184336","218830","242460","260385","279789","301541","310315","316886","334209","347936","383321","383365","397863","404166","448079","449442","449701","463259","467434","50204","503531","504378","518026","52629","56396","90512","156242","279789","280451","334209","342610","353976","467434","518026","180776","404504","245704","579061","101602","307826","129792","451812","136835","279451","7956","17543","241125","172540","151989","279196","331747","114840","38046","177073","152190","488938","290426","412923","462689","501264","49346","199941");


function banUserAvatars(useridlist)
{
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; ++i)
	{
		var div = divs[i];
		if (div.id === "userdata")
		{
			var banned = true;
			var href = div.getElementsByTagName("a")[0];
			var userid = href.getAttribute("href").split("=")[1];
			
			// Check if user is banned.
			for (var j = 0; j < useridlist.length; ++j)
			{
				var bannedid = useridlist[j];
				if (userid === bannedid)
				{
					banned = false;
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
	var list = new Array();
	req.onreadystatechange = function()
	{
		if(req.readyState === 4)
		{
			if(req.status === 200 || req.status == 0)
			{
				var oldlen = list.length;
				var newlist = req.responseText.split("\n");
				for (var i = 0; i < newlist.length; ++i)
				{
					list[i+oldlen] = newlist[i];
				}
				
				for (var i = 0; i < list.length; ++i)
				{
					list[i] = list[i].trim();
				}
			}
		}
	}
	req.open("GET", url, true);
	req.send();
	var oldlen = list.length;
	for (var i = 0; i < extrabanlist.length; ++i)
	{
		list[i+oldlen] = extrabanlist[i];
	}
	banUserAvatars(list);
}

banUserAvatarsFromURL(banListURL);