// ==UserScript==
// @name           TAB (Tuenti Add Blocker)
// @namespace      http://www.tuenti.com/*
// @include        http://www.tuenti.com/*
// @include        https://www.tuenti.com/*

// ==/UserScript==
setInterval(doStuff, 0);

function doStuff()
{
	if(document.getElementById("canvas_friend_suggestions"))
	{
		

document.getElementById("appointments").style.display="none";


document.getElementById("invitations").style.display="none";
		document.getElementById("canvas_friend_suggestions").style.display="none";

document.getElementById("home_unit_ads_container_id").style.display="none";

document.getElementById("chat_roster_recent_list_container").style.display="none";

document.getElementById("chat_roster_module_search_container").style.display="none";

}
}

