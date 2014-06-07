// ==UserScript==
// @name    		Gaia - Online Mods Highlight
// @author  		Mindset (http://www.gaiaonline.com/p/mindset)
// @description    	Highlights if Gaia forum mods are online or offline by color-coding and adding back the smiley icons.
// @include 		http://www.gaiaonline.com/forum/moderators/*
// @include 		http://gaiaonline.com/forum/moderators/*
// @require 		http://sizzlemctwizzle.com/updater.php?id=67166
// ==/UserScript==

/* Begin deprecated script update checker code - will remove next version */
var version_timestamp = 1296117134470;
/* End Script Update Checker code */

var onhtml = "<span style='background: url(/images/template/icons/ic_status_smile.gif) left 1px no-repeat; padding-left: 19px; color:#008000;'>Online</span>";

var offhtml = "<span style='background: url(/images/template/icons/ic_status_smile.gif) left -15px no-repeat; padding-left: 20px; color:#ff0000;'>Offline</span>";

var modrows=document.getElementsByTagName("td");

for(var i=0;i<modrows.length;i++)
{
	if ( modrows[i].align == "right" )
	{
		var status = modrows[i].innerHTML;
		var newstatus = "";
		if ( status.indexOf("Online") != -1 )
		{
			newstatus = status.replace("Online",onhtml);
		}
		else if ( status.indexOf("Offline") != -1 )
		{
			newstatus = status.replace("Offline",offhtml);
		}
		modrows[i].innerHTML = newstatus;
	}
}
