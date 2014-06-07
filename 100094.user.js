// ==UserScript==
// @name	vcbux,buxtooth,leafbux,lotbux,Amenbux,tbmbux,jjbux,nxtbux,peakbux,oebux,homebux,Arnbux
// @namespace		Rajibul Hasan
// @description	       Fast load
// @version			2011.03.29 v1.0
// @include			http://*vcbux.com/viewads/*
// @include			http://*buxtooth.com/viewads/*
// @include			http://*arnbux.com/viewads/*
// @include			http://*lotbux.com/viewads/*
// @include			http://*oebux.com/viewads/*
// @include                     http://*tbmbux.com/viewads/*                 
// @include                     http://*jjbux.com/viewads/*       
// @include                     http://*nxtbux.com/viewads/*
// @include                     http://*peakbux.com/viewads/*
// @include                     http://*Amenbux.com/viewads/*
// @include                     http://*homebux.com/viewads/*
// @include                     http://*buxlord.com/viewads/*
// @include                     http://*bravobux.com/viewads/*

// ==/UserScript==

var idname, funcname;
var infomation = "";
var host = window.location.host, hostname;
var showletter = true;	// Loading.... false
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
else if (host.indexOf("oebux")>=0)
{
	hostname = 'oebux';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("ti");
	error = null;
	completedNum = 0;
}
else if (host.indexOf("tbmbux")>=0)
{
	hostname = 'tbmbux';
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
else if (host.indexOf("jjbux")>=0)
{
	hostname = 'jjbux';
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
else if (host.indexOf("lotbux")>=0)
{
	hostname = 'lotbux';
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
else if (host.indexOf("nxtbux")>=0)
{
	hostname = 'nxtbux';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("ti");
	error = null;
	completedNum = 0;
}
else if (host.indexOf("amenbux")>=0)
{
	hostname = 'amenbux';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("ti");
	error = null;
	completedNum = 0;
}
else if (host.indexOf("homebux")>=0)
{
	hostname = 'homebux';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("ti");
	error = null;
	completedNum = 0;
}
else if (host.indexOf("buxlord")>=0)
{
	hostname = 'buxlord';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("ti");
	error = null;
	completedNum = 0;
}
else if (host.indexOf("bravobux")>=0)
{
	hostname = 'bravobux';
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
	else if (hostname == "oebux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "tbmbux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "buxtooth")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "jjbux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "arnbux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "lotbux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "peakbux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "nxtbux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "amenbux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);

	}
        else if (hostname == "homebux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);

	}
        else if (hostname == "buxlord")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);

	}
        else if (hostname == "bravobux")
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
			else if (hostname == "oebux")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "tbmbux")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "buxtooth")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "jjbux")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "arnbux")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "lotbux")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "peakbux")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "nxtbux")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "amenbux")
			{
                                window.setTimeout('window.close()', 1000);
                        }
                        else if (hostname == "homebux")
			{
				window.setTimeout('window.close()', 1000);
			}
                        else if (hostname == "buxlord")
			{
				window.setTimeout('window.close()', 1000);
			}
                        else if (hostname == "bravobux")
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

