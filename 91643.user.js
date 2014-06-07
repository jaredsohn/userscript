// ==UserScript==
// @name           Darkthrone-Addfeats
// @namespace      MarkTraceur
// @description    Add features to Darkthrone beta.
// @version        1.1
// @include        http://beta.darkthrone.com/*
// ==/UserScript==

// This script is released under the GPLv2. Please find it at 
// http://www.gnu.org/licenses/gpl-2.0.html.

// Script originally authored by Mark Holmquist, with some help from the author of 
// DTRecruiter.

function findInside(elename, nodey, skip) {

    if (typeof(skip) == "undefined")
	skip = 0;

    if (typeof(elename) != "string")
        return null;

    for (i in nodey.childNodes) {
	outer = nodey.childNodes[i].outerHTML;
        if (outer && outer.substr(1, elename.length) == elename) {
	    if (skip != 0)
		skip -= 1;
	    else
		return nodey.childNodes[i];
	}
    }
}

function updateClock() {
   setTimeout(updateClock, 60000);
    time = document.getElementsByClassName('menu')[0].childNodes[45];
    hours = time.childNodes[1];
    minutes = time.childNodes[3];
    tmpmin = '';
    min = parseInt(minutes.innerHTML) + 1;
    if (min < 10)
	tmpmin = '0';
    if (min < 60)
	tmpmin += min;
    else {
	tmpmin = '00';
	tmphrs = '';
	hrs = parseInt(hours.innerHTML) + 1;
	if (hrs < 10)
	    tmphrs = '0';
	if (hrs < 24)
	    tmphrs += hrs;
	else
	    tmphrs = '00';
	hours.innerHTML = tmphrs;
    }
    minutes.innerHTML = tmpmin;
}

(

 function()
 {

     // *******************************************************************
     // Add a link to your target's profile on spy results pages.
     // *******************************************************************

     if ((window.location.host == "beta.darkthrone.com") && ((window.location.pathname == "/spylog.dt") || (window.location.pathname == "/infiltrationlog.dt") || (window.location.pathname == "/assassinationlog.dt"))) {
	 ai = document.getElementById("attackinfo");
	 spylink = findInside("a", ai);
	 if (spylink) {
	     theid = spylink.outerHTML.replace(/\D/g, "");
	     theid = theid.substr(0, theid.length - 1);
	     ai.innerHTML += " <a href=\"/viewprofile.dt?id=" + theid + "\"><img src=\"/templates/gray/images/buttons/viewprofile.gif\" border=\"0\" /></a> <a href=\"/assassination.dt?sas=" + theid + "\"><img src=\"/templates/gray/images/buttons/assassinate.gif\" /></a> <a href=\"/infiltration.dt?infil=" + theid + "\"><img src=\"/templates/gray/images/buttons/infiltrate.gif\" /></a>";
	 }
     }

     // *******************************************************************
     // Add a link to your target's profile on attack results pages. This does not currently include attack logs.
     // *******************************************************************

     else if ((window.location.host == "beta.darkthrone.com") && (window.location.pathname == "/attacklog.dt") && (/attack\.gif/.test(document.getElementById("attackinfo").innerHTML))) {
	 ai = document.getElementById("attackinfo");
	 ai = ai.children[ai.childElementCount-1];
	 attacklink = findInside("a", ai);
	 if (attacklink) {
	     theid = attacklink.outerHTML.replace(/\D/g, "");
	     theid = theid.substr(0, theid.length - 1)
		 ai.innerHTML = "<a href=\"/viewprofile.dt?id=" + theid + "\"><img src=\"http://beta.darkthrone.com/templates/gray/images/buttons/viewprofile.gif\" border=\"0\" /></a> " + ai.innerHTML;
	 }
     }

     if ((window.location.host == "beta.darkthrone.com") && (document.getElementsByClassName('menu')[0].childNodes[45] != null)) {
	 setTimeout(updateClock, 1000 * parseInt(document.getElementById('idSec').innerHTML));
     }
 }

 )();