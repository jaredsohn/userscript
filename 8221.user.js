// Citibank Unembed Statements
// Version 0.1, az Tue Mar 13 14:00:43 2007
// Copyright 2007 Alexander Zangerl
// Released under the GPL Version 1, http://www.gnu.org/copyleft/gpl.html

// What does this thing do? 
// It changes the embedded-only PDF display of statements 
// back to downloadable PDFs.
// Why the stupid Citibank fellows attempt to force in-brower PDF on you
// is really beyond me...
// The fix is very simple: first we disable the pdf-plugin detection, 
// and then replace the EMBEDded pdf statement with a simple link.

// note that as per http://forums.mozillazine.org/viewtopic.php?t=355715
// it may be a good idea to set plugin.default_plugin_disabled=false
// to avoid the "additional plugins are required..." warning:
// firefox starts displaying things before the page has loaded 
// completely, meaning our scripts run too late to avoid the warning

// ==UserScript==
// @namespace     http://snafu.priv.at/mystuff/citibank-statement
// @name          Unembed Citibank Statement 
// @description   Make Citibank Statements downloadable again
// @include 	  https://www.citibank.com.au/AUGCB/apest/esonline/vstmt/*
// ==/UserScript==

// that takes care of the pdf-plugin detection,
// used on FireListqMsg.do
var inputs = document.getElementsByTagName('input');
for (var i = 0; i < inputs.length; i++) 
{ 
	if (inputs[i].getAttribute('name') == 'pdfSupportedByBrowser') 
	{
		inputs[i].setAttribute('readonly','1');
		inputs[i].setAttribute('value','true');

		// add a proper, normal submit button
		var dlink=document.createElement("input");
		dlink.type="submit";
		inputs[i].parentNode.appendChild(dlink);

		// and fix up the action url.
		inputs[i].parentNode.setAttribute("action","FireVwstqMsg.do");
		
	}
}


// the embedded-to-link stuff, used on FireVwstqMsg.do
var embedded; // = document.getElementsByTagName('embed');
if (embedded) 
{
	for (var i=0; i<embedded.length; i++) 
	{
	   var obj=embedded[i];
	   var src=obj.getAttribute('src');

	   var newlink=document.createElement('a');
	   newlink.href=src;
	   newlink.innerHTML="Download Statement";
	   
	   
	   obj.parentNode.insertBefore(newlink,obj);
	   obj.parentNode.removeChild(obj);
	}
}
	


