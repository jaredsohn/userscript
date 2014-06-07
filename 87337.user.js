// ==UserScript==
// @name           Ikariam Offline Hidder
// @namespace      ikariam/offlineHidder
// @version        1.0
// @author         Isgard
// @license        GPL v3
// @description    Show/Hides offline players at alliance list
// @include        http://s*.ikariam.*/index.php*view=diplomacyAdvisorAlly*
// @exclude        http://support*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

var page = document.body.id;

if (page != "diplomacyAdvisorAlly") 
{
	return;
}

var showOffline = true;

function showHideOffline()
{
	showOffline = !showOffline;
	
	var display = (showOffline) ? '' : 'none';
	
	var off = document.getElementsByClassName("offline");
	var i;
	var nodo;
	
	for (i = 0; i < off.length; i++)
	{
		try
		{
			nodo = off[i];
			nodo.parentNode.style.display = display;
		}
		catch (err)
		{
	alert(err.message);
		}
	}
}

try
{	
	var header = document.getElementById("alliance").children[1].getElementsByClassName('header')[0];
	var img = document.createElement('IMG');
	img.src = "/skin/layout/bulb-on.gif";
	img.addEventListener('click', showHideOffline, true);			
	img.height = 14;
	img.style.paddingLeft = "5px";
	img.style.cursor = "pointer";
	header.appendChild(img);
}
catch (err)
{
}
