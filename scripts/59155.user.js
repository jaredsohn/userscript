// ==UserScript==
// @name    		Gaia - Toggle Signatures
// @author  		Mindset (http://www.gaiaonline.com/p/mindset)
// @description    	Adds a "show/hide signature" toggle button to Gaia forums and guilds.
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
// @require 		http://sizzlemctwizzle.com/updater.php?id=59155
// ==/UserScript==

/* 
getElementsByClassName-1.0.1.js adds support for browsers that do not use it natively. These include FF2 and all forms of IE. 
Format: getElementsByClassName(className, tag, dom element) -- last two parameters are optional.
*/

/* Begin deprecated script update checker code - will remove next version */
var version_timestamp = 1296117134470;
/* End Script Update Checker code */


var sigs = new Array;
var sigIds = new Array;
var loc = document.URL;
 
if (loc.indexOf("/forum/") >=0 ) 
{	
	sigs = getElementsByClassName("post-signature","div");

	for(var i=0; i < sigs.length; i++) 
	{
		sigs[i].style.display = "none";
		sigIds[i] = sigs[i].className.replace(/post-signature /,"");
		sigs[i].id = sigIds[i];
	}
	
	for(var i=0; i < sigs.length; i++) 
	{
		toggleSig = unsafeWindow.document.createElement("div");
		toggleSig.id = "toggle-" + sigIds[i];
		toggleSig.style.textAlign="center";
		toggleSig.style.paddingBottom="10px";
		toggleSig.innerHTML = '<button type="button" style="font-size:10px; padding:2px;" onclick="javascript:sigToggle(\''+ sigIds[i] + '\');">Show Signature</button>';
		sigs[i].parentNode.insertBefore(toggleSig, sigs[i]);
	}
}

//guilds are weird
else 
{
	sigs = getElementsByClassName("gaiaSig","div");	
	
	for(var i=0; i < sigs.length; i++) 
	{
		var sigContent = sigs[i].innerHTML.indexOf('<span class="user-sig gen"></span>');
		var aquariumTable = sigs[i].parentNode.getElementsByTagName("table")[0];		
		if (sigContent == -1 || aquariumTable)		
		{
			sigs[i].style.display = "none";
			sigIds[i] = sigs[i].id;
		}
	}
	
	for(var i=0; i < sigs.length; i++) 
	{
		var sigContent = sigs[i].innerHTML.indexOf('<span class="user-sig gen"></span>');
		var aquariumTable = sigs[i].parentNode.getElementsByTagName("table")[0];
		if (sigContent == -1 || aquariumTable)		
		{
			toggleSig = unsafeWindow.document.createElement("div");
			toggleSig.id = "toggle-" + sigIds[i];
			toggleSig.style.textAlign="center";
			toggleSig.style.paddingBottom="10px";
			toggleSig.innerHTML = '<button type="button" style="font-size:10px; padding:2px;" onclick="javascript:sigToggle(\''+ sigIds[i] + '\');">Show Signature</button>';
			sigs[i].parentNode.insertBefore(toggleSig, sigs[i]);
		}
	}
	
	for(var i=0; i < sigs.length; i++) 
	{	
		var aquariumTable = sigs[i].parentNode.getElementsByTagName("table")[0];		
		if (aquariumTable) 
		{ 
			var aquariumOld = aquariumTable.getElementsByTagName("object")[0];
			var aquarium = aquariumOld.cloneNode(true);
			aquariumNew = unsafeWindow.document.createElement("div");
			aquariumNew.className = "gaia-sig";
			aquariumNew.style.paddingTop="5px";
			aquariumTable.parentNode.removeChild(aquariumTable);
			sigs[i].appendChild(aquariumNew);
			aquariumNew.appendChild(aquarium);
		}	
		
	}
	
}


function sigToggle(divid)
{
	var sig = document.getElementById(divid);
	var toggler = document.getElementById("toggle-" + divid);
	if (sig.style.display == "none")
	{
		sig.style.display = "block";
		toggler.firstChild.innerHTML = "Hide Signature";
	}
	else
	{
		sig.style.display = "none";
		toggler.firstChild.innerHTML = "Show Signature";
	}
}


/*
	Attaches script into page body and executes it via an anonymous function call.
	NOTES:
	Script can therefore reference variables on the page, but likewise cannot use Greasemonkey API methods
*/

var script = document.createElement("script");
script.type = "application/javascript";
script.innerHTML = sigToggle;
document.body.appendChild(script);