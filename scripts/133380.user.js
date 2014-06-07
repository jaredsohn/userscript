// ==UserScript==
// @name	Fast Loader Indonesian Zeus PTC v1.2 - AksenKlik, lancarklik
// @namespace		DRL
// @description		Read the support script before using this.
// @version			2012.05.14 v1.2
// @include			http://*aksenclix.com/viewads/*
// @include			http://*lancarklik.com/viewads/*


// ==/UserScript==

/********************************************************************
2012.05.14:
   1. Include AksenKlik, Lancarklik
   2. Support me! Be my Refferal ID: intifadha

2012.05.14:
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

if (host.indexOf("aksenclix")>=0)
{
	hostname = 'aksenclix';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("ti");
	error = null;
	completedNum = 0;
}


else if (host.indexOf("lancarklik")>=0)
{
	hostname = 'lancarklik';
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
	if (hostname == "aksenclix")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}

	else if (hostname == "lancarklik")
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
			if (hostname == "aksenclix")
			{
				window.setTimeout('window.close()', 1000);
			}

			else if (hostname == "lancarklik")
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