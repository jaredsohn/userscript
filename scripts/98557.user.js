// ==UserScript==
// @name		Aumenta Velocidade dos Anuncios em PTCs
// @namespace		DRL
// @description		Velocidade maior no seus anuncios. Só é você clicar no botão.Atualmente pegando nos seguintes ptcs: VcBux,Buxera,nxtbux,nrbux,Buxtooth,Bux1,Leafbux,Lotbux,Incrasebux.
// @version			1.0
// @include			http://*vcbux.com/viewads/*
// @include			http://*buxera.com/viewads/*
// @include			http://*nrbux.com/viewads/*
// @include			http://*buxtooth.com/viewads/*
// @include			http://*bux1.com/viewads/*
// @include			http://*leafbux.com/viewads/*
// @include			http://*lotbux.com/viewads/*
// @include			http://*coolgrand.com/viewads/*
// @include			https://*incrasebux.com/cks.php?k=*
// ==/UserScript==

/********************************************************************

********************************************************************/

var idname, funcname;
var infomation = "";
var host = window.location.host, hostname;
var showletter = true;	// Se você não quer código de verificação exibido direto, mude false
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
else if (host.indexOf("buxera")>=0)
{
	hostname = 'buxera';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("ti");
	error = null;
	completedNum = 0;
}
else if (host.indexOf("nrbux")>=0)
{
	hostname = 'nrbux';
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
else if (host.indexOf("bux1")>=0)
{
	hostname = 'bux1';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("ti");
	error = null;
	completedNum = 0;
}
else if (host.indexOf("leafbux")>=0)
{
	hostname = 'leafbux';
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
else if (host.indexOf("coolgrand")>=0)
{
	hostname = 'coolgrand';
	idname = 'progress';
	funcname = 'fc();';

	document.getElementById("iframe").src="about:blank";
	completed = document.getElementById("ti");
	error = null;
	completedNum = 0;
}
else if (host.indexOf("incrasebux")>=0)
{
	hostname = 'incrasebux';
	idname = 'completedAd';
	funcname = 'startTimer();';

	document.getElementById("pgl").src="about:blank";
	completed = document.getElementById("completedAd");
	error = null;
	completedNum = 0;
}

var progressbar, btn;
progressbar = document.getElementById(idname);
if (progressbar) {
	btn = document.createElement("div");
	btn.innerHTML = '<button onclick="'+funcname+'">Carregamento Rapido - Clique Aqui</button>'+infomation;
	progressbar.parentNode.insertBefore(btn, progressbar.nextSibling);
}

var isalert = false;
window.intervalID = window.setInterval(function(){
	if (hostname == "vcbux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "buxera")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "nrbux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "buxtooth")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "bux1")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "leafbux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "lotbux")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "coolgrand")
	{
		process = document.getElementById("progress").firstChild.alt.slice(0, -1);
	}
	else if (hostname == "incrasebux")
	{
		process = document.getElementById("secs").innerHTML;
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
			else if (hostname == "buxera")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "nrbux")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "buxtooth")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "bux1")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "leafbux")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "lotbux")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "coolgrand")
			{
				window.setTimeout('window.close()', 1000);
			}
			else if (hostname == "incrasebux")
			{
				window.setTimeout('window.close()', 500);
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