// ==UserScript==
// @name	Fast Loader Indonesian Zeus PTC v1.0 - IndoStarBux, Bux7.net
// @namespace		DRL
// @description		Read the support script before using this.
// @version			2011.06.09 v1.1
// @include			http://*bux7.net/viewads/*
// @include			http://*indostarbux.com/viewads/*


// ==/UserScript==

/********************************************************************
2011.06.09:
   1. Include IndoStarBux, Bux7.net
   2. Support me! Be my Refferal ID: intifadha

2011.06.09:
   1. Page opens directly read articles
   2. Automatically shut down after reading articles
   3. Refresh the source of the page
   4. Frame to a blank page ads
********************************************************************/

var idname, funcname;
var infomation = "";
var host = window.location.host, hostname;
var showletter = true;	// 若不想直接显示验证码，请改成false
var completedNum = -1, process, completed = null, error = null;
var checkstatus = true;
var needclick = false;

if (host.indexOf("bux7")>=0)
{
	hostname = 'bux7';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("ti");
	error = null;
	completedNum = 0;
}

else if (host.indexOf("indostarbux")>=0)
{
	hostname = 'indostarbux';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("ti");
	error = null;
	completedNum = 0;
}




var progressbar, btn;
progressbar = document.getElementById(idname);
if (progressbar) {
	btn = document.createElement("div");
	btn.innerHTML = '<button onclick="'+funcname+'">Hajar!!!</button>'+infomation;
	progressbar.parentNode.insertBefore(btn, progressbar.nextSibling);
}

var isalert = false;
window.intervalID = window.setInterval(function(){
	if (hostname == "bux7")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "indostarbux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else
	{
		checkstatus = false;
		window.clearInterval(window.intervalID);
	}
	if (checkstatus)
	{
		if (completed && (completed.style.display == "" || completed.style.display == "display" || completed.style.display == "inline" || completed.style.display == "block"))
		{
			window.clearInterval(window.intervalID);
			window.opener.location.replace(window.opener.location.href);
			window.opener = null;
			if (hostname == "bux7")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "indostarbux")
			{
				window.setTimeout('window.close()', 1000);
			}
			return;
		}
		if (error && (error.style.display == "" || error.style.display == "display" || error.style.display == "inline"))
		{
			window.clearInterval(window.intervalID);
			window.opener.location.replace(window.opener.location.href);
			return;
		}
		if (!isalert && process == completedNum)
		{
			isalert = true;
			if (needclick)
			{
				window.setTimeout('alert("Click Code")', 300);
			}
		}
	}
}, 500);