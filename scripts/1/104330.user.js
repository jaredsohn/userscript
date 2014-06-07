// ==UserScript==
// @name	Fast Loader Zeus PTC v1.1 - BananaBux, Lancium, PeakBUx, ArnBUx
// @namespace		DRL
// @description		Read the support script before using this.
// @version			2011.06.09 v1.1
// @include			http://*bananabux.com/viewads/*
// @include			http://*lancium.com/viewads/*
// @include			http://*peakbux.com/viewads/*
// @include			http://*arnbux.com/viewads/*





// ==/UserScript==

/********************************************************************
2011.06.09:
   1. Include BananaBux, Lancium, PeakBUx, ArnBUx
   2. Support me! Be my Refferal ID: intifadha

2011.05.09:
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

if (host.indexOf("bananabux")>=0)
{
	hostname = 'bananabux';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("ti");
	error = null;
	completedNum = 0;
}
else if (host.indexOf("lancium")>=0)
{
	hostname = 'lancium';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("ti");
	error = null;
	completedNum = 0;
}
else if (host.indexOf("peakbux")>=0)
{
	hostname = 'peakbux';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("ti");
	error = null;
	completedNum = 0;
}
else if (host.indexOf("arnbux")>=0)
{
	hostname = 'arnbux';
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
	btn.innerHTML = '<button onclick="'+funcname+'">Fast Loader</button>'+infomation;
	progressbar.parentNode.insertBefore(btn, progressbar.nextSibling);
}

var isalert = false;
window.intervalID = window.setInterval(function(){
	if (hostname == "bananabux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "lancium")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "peakbux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "arnbux")
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
			if (hostname == "bananabux")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "lancium")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "peakbux")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "arnbux")
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