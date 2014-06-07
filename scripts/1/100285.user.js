// ==UserScript==
// @name	vcbux,buxera,nxtbux,nrbux,buxtooth,bux1,leafbux,lotbux,CoolGrand,Ujmr,BuxEyes,Amenbux
// @namespace		DRL
// @description		在广告网页无法打开的时候，点击按钮可以开始读条
// @version			2011.04.01 v1.0
// @include			http://*vcbux.com/viewads/*
// @include			http://*buxtooth.com/viewads/*
// ==/UserScript==

/********************************************************************
2011.04.01:
   1. Page opens directly read articles
   2. Automatically shut down after reading articles
   3. Refresh the source of the page
   4. Frame to a blank page ad
********************************************************************/

var idname, funcname;
var infomation = "";
var host = window.location.host, hostname;
var showletter = true;	// 若不想直接显示验证码，请改成false
var completedNum = -1, process, completed = null, error = null;
var checkstatus = true;
var needclick = false;

if (host.indexOf("vcbux")>=0)
{
	hostname = 'vcbux';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("ti");
	error = null;
	completedNum = 0;
}
else if (host.indexOf("buxtooth")>=0)
{
	hostname = 'buxtooth';
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
	if (hostname == "vcbux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "buxtooth")
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
			if (hostname == "vcbux")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "buxtooth")
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