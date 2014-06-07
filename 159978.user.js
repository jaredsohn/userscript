// ==UserScript==
// @name        SteamGifts Private GiveAway Detector
// @namespace   http://userscripts.org/users/503544
// @include     http://www.steamgifts.com/giveaway/*
// @include     http://www.steamgifts.com/forum/*
// @require 	http://userscripts.org/scripts/source/52251.user.js
// @version     0.1
// ==/UserScript==
var type;
var url;
var main = function()
{
	autoUpdate (52251, "0.1");
	if(window.location.href.indexOf("/forum/") > -1)//FORUM
	{
		type = "FORUM";
		url = document.getElementsByClassName("author")[0].getElementsByTagName("a")[1].href;
		if(url != null)	{get_url();}
	}
	else if(window.location.href.indexOf("/giveaway/") > -1)//GIVEAWAY
	{
		type = "GIVEAWAY"
		url = document.getElementsByClassName("hosted_by")[0].getElementsByTagName("a")[0].href;
		if(url != null)	{get_url();}
	}
}

var get_url = function(){
	GM_xmlhttpRequest({
	  method: "GET",
	  url: url,
	  onload: function(response) {
		var count = response.responseText.match(/private_only/g);
		var total;
		if (count){count = count.length;}else{count = 0;}
		//alert(count.length);
		if(type = "FORUM")
		{
			var div = document.getElementsByClassName("author")[0];
			div = div.getElementsByTagName("p")[0];
			div.innerHTML = div.innerHTML + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Found  " + count + " private giveaways!</b>";
		}
		if(type = "GIVEAWAY")
		{
			var div = document.getElementsByClassName("right")[0];
			div.innerHTML = div.innerHTML + "<div class='steam_store'><p><b>Found " + count + " private giveaways!</b></p></div>";
		}
	  }
	});
}
main();