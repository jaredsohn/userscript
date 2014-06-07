// ==UserScript==
// @name		Crude RuneScape Adventure Log Activity Expander
// @namespace	        http://userscripts.org/scripts/show/121164
// @description         Extends the adventure log's recent activity.
// @include		http://services.runescape.com/m=adventurers-log/*/*
// @include		http://services.runescape.com/m=adventurers-log/*
// ==/UserScript==

var playerName = document.getElementById('playerTitle').innerHTML;
var pName = playerName.split('\"')[3];

var activityLog = getElementByClass('block recent-activity', document);
activityLog.innerHTML = "<iframe src='http://services.runescape.com/m=adventurers-log/rssfeed?searchName=" + pName + "' width='100%' height='250'></iframe>";

function getElementByClass(matchClass, content)
{
    var elems = document.getElementsByTagName('*'),i;
	
    for (i in elems)
	{	
        if((" " + elems[i].className + " ").indexOf(" " + matchClass + " ") > -1)
		{
            return elems[i];
		}
	}
}