// ==UserScript==
// @name           	Partguide Message Alert
// @namespace      partyguide
// @description 	Refreshes the partyguide message page every 2 minutes
// @include        	http://www.partyguide.ch/msg.php
// ==/UserScript==

var interval;
var intID;

function isNumber(str) {
  return (str*1==str)?true:false;
};

function getSettings()
{
	interval = GM_getValue("partyguideInterval", 180000);
}

function addTimeout()
{
	if (interval == 0)
		return;
		
	intID = window.setTimeout(function(){location.reload();}, interval);
}

function delTimeout()
{
	window.clearTimeout(intID);
}

function setInterval()
{
	var val = prompt("Seitenaktualisierung (Min., 0 = deaktiviert)", interval / (60*1000));
	
	if (val == null)
		return;
	
	if (!isNumber(val))
	{
		alert("Bitte eine Zahl eingeben.");
		return;
	}
		
	GM_setValue("partyguideInterval", val * 60 * 1000);
	
	interval = GM_getValue("partyguideInterval", 180000);
	
	delTimeout();
	
	addTimeout();
}

function checkNewMessages()
{
	var totalNewMessages = 0;
	var images = document.getElementsByTagName("img");
	
	for (var i = 0; i < images.length; i++)
	{
		
		if (images[i].src.match(/email.gif/))
			totalNewMessages++;
	
	}
	
	if (totalNewMessages > 0) 
	{
		delTimeout();
		alert (totalNewMessages + " neue Nachrichten.");
	}
}

/**************************************************************************************/
getSettings();
addTimeout();
checkNewMessages();
GM_registerMenuCommand("Seitenaktualisierung", setInterval);