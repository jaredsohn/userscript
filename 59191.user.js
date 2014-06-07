// ==UserScript==
// @name    		Gaia - Toggle Aquarium Signatures
// @author  		Mindset (http://www.gaiaonline.com/p/mindset)
// @description    	Adds a "show/hide aquarium" toggle button to Gaia forums and guilds. Button also shows if aquarium is glowing, including your own.
// @include 		http://gaiaonline.com/forum/*
// @include		http://www.gaiaonline.com/forum/*
// @include 		http://gaiaonline.com/guilds/viewtopic.php*
// @include		http://www.gaiaonline.com/guilds/viewtopic.php*
// @exclude		http://gaiaonline.com/forum/mytopics/*
// @exclude		http://gaiaonline.com/forum/myposts/*
// @exclude		http://gaiaonline.com/forum/subscription/*
// @exclude		http://www.gaiaonline.com/forum/mytopics/*
// @exclude		http://www.gaiaonline.com/forum/myposts/*
// @exclude		http://www.gaiaonline.com/forum/subscription/*
// @require 		http://mindset.99k.org/getElementsByClassName-1.0.1.js
// @require 		http://sizzlemctwizzle.com/updater.php?id=59191
// ==/UserScript==
/*-------------------------------SETTINGS-------------------------------*/
var showtime = "on"; 	// Controls whether Glow Time is displayed. By default it is - if it's causing lag for you, please change "on" to "off". 
			// Note: only displays a few seconds before glow, as of last Gaia code change.
/*-------------------------------SETTINGS-------------------------------*/

/* 
getElementsByClassName-1.0.1.js adds support for browsers that do not use it natively. These include FF2 and all forms of IE. 
Format:  getElementsByClassName(className, tag, dom element) -- last two parameters are optional.
*/

/* Begin deprecated script update checker code - will remove next version */
var version_timestamp = 1296117134470;
/* End Script Update Checker code */

/* find time of Booty Grab -- original version from http://userscripts.org/scripts/show/42598  */
function getGlow(tankId){
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://www.gaiaonline.com/chat/gsi/index.php?'+'v=json&m=[[6500%2C[1]]%2C[6510%2C["'+tankId+'"%2C0%2C1]]%2C[6511%2C["'+tankId+'"%2C0]]%2C[6512%2C["'+tankId+'"%2C0]]%2C[107%2C["null"]]]&X='+(new Date().getTime().toString().substring(0, 10)),
		onload: function(r){
			var txt=r.responseText;
			var glowT=(Number(txt.substr(txt.indexOf('open_time')+11,10)));
			if (glowT) 
			{
				var glowE=new Date(glowT*1000);
				var now = new Date();
				var diff = (now - glowE)/60000; // the difference between the glow time and now in minutes
				var button = document.getElementById("button-" + tankId);
				if ( diff >= -0.1 && diff <= 12) // minus  6 seconds just to give time to open the tank and load it; 12 minutes is current glow length for many tanks 
				{ 
					button.innerHTML = "GLOWING!";
					button.style.color = "red";
					button.style.fontWeight = "bold";
					button.style.fontSize = "14px";
				} 
				if (showtime == "on")
				{ 	
					if ( diff > 12)
					{
						button.innerHTML+=" - glowed " + glowTime(glowT) + ".";
					}
					else
					{
						button.innerHTML+=" - starts " + glowTime(glowT) + "."; 
					}
				}
			}
		}
	});
}

/* this controls the toggle button */
function aqToggle(id)
{
	var sig = document.getElementById(id);
	var toggler = document.getElementById("toggle-" + id);
	var button = document.getElementById("button-" + id);
	if (sig.style.display == "none")
	{
		if ( button.innerHTML.indexOf("GLOWING!") == 0)
		{
			button.style.color = "black";
			button.style.fontWeight = "normal";
			button.style.fontSize = "10px";
		}
		sig.style.display = "block";
		button.innerHTML = "Hide Aquarium";
	}
	else
	{
		sig.style.display = "none";
		button.innerHTML = "Show Aquarium";
	}
}

/* this turns a unix time number into a real time */
function glowTime(timestamp)
{
	var time=new Date(timestamp*1000);
	var M=time.getMonth()+1;
	var d=time.getDate();
	var y=time.getFullYear();
	var h=time.getHours();
	var m=time.getMinutes();
	var s=time.getSeconds();
	if (h<12) 
	{ var u="AM"; }
	else 
	{ var u="PM"; }
	if (M<10) { M = "0" + M; }
	if (d<10) { d = "0" + d; }
	if (h>12) { h = h - 12; }
	if (h==0)
	{ h=12;	}
	else if (h<10)
	{ h = "0" + h; }
	if(m<10) { m = "0" + m; }
	if(s<10) { s = "0" + s; }
	return M + "/" + d + "/" + y + " @ " + h + ":" + m + ":" + s + " " + u;
}


/* Begin code to hide aquariums and add the toggle button */
var aquariums = new Array;
aquariums = getElementsByClassName("forum-flash-sigs","object");

for(var i=0; i < aquariums.length; i++) 
{
	var aqParams = aquariums[i].getElementsByTagName("param");
	var aqID = aqParams[7].value.replace(/userEnvironmentId=/, "");
	var aqTD = aquariums[i].parentNode;
	aqTD.style.display = "none";
	aqTD.id = aqID;
}

for(var i=0; i < aquariums.length; i++) 
{
	var aqTD = aquariums[i].parentNode;
	var aqID = aqTD.id;
	var aqTable = aquariums[i].parentNode.parentNode.parentNode.parentNode;
	toggleSig = unsafeWindow.document.createElement("div");
	toggleSig.id = "toggle-" + aqID;
	toggleSig.style.textAlign="center";
	toggleSig.style.paddingTop="5px";
	toggleSig.style.paddingBottom="10px";
	toggleSig.innerHTML = '<button type="button" style="font-size:10px; padding:2px;" onclick="javascript:aqToggle(\'' + aqID + '\');" id="button-' + aqID + '">Show Aquarium</button>';
	aqTable.parentNode.insertBefore(toggleSig,aqTable);	
	getGlow(aqID);
}
/* End code to hide aquariums and add the toggle button */


/*
	Attaches script into page body and executes it via an anonymous function call.
	NOTES:
	Script can therefore reference variables on the page, but likewise cannot use Greasemonkey API methods
*/

var script = document.createElement("script");
script.type = "application/javascript";
script.innerHTML = aqToggle;
document.body.appendChild(script);