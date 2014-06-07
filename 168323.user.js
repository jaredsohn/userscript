// ==UserScript==
// @name        YT-Likecounter
// @namespace   Counters
// @include     http://www.youtube.com/watch?*
// @include     https://www.youtube.com/watch?*
// @version     1
// ==/UserScript==

function exe()
{
	var likes = document.getElementById("watch7-views-info").getElementsByTagName("span")[1].getElementsByTagName("span")[0].innerHTML.replace(/\./g, "") * 1;
	var dislikes = document.getElementById("watch7-views-info").getElementsByTagName("span")[1].getElementsByTagName("span")[1].innerHTML.replace(/\./g, "") * 1;
	var ges = likes - (-dislikes);
	
	if(ges != 0)
	{
		var lp = Math.round(100*100*likes/ges)/100;
		var dp = Math.round(100*100*dislikes/ges)/100;
	}
	else
	{
		lp = 100;
		dp = 0;
	}
	
	document.getElementById("eow-title").innerHTML += "<span style='font-size: 12px;'> - <b>" + lp + "%</b> Likes";
}

top.exe = exe;

setTimeout(top.exe, 100);