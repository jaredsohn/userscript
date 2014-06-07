// ==UserScript==
// @name			iGoogle_Fix
// @author		Credomane
// @namespace		http://userscripts.org/users/260860
// @description	Removes tabs from left side of iGoogle. Based on the old out-of-date [as of ~Dec,7th,2010] userscript http://userscripts.org/scripts/show/36118 Old script in comment block at end of file for historical reasons. :)
// @include		http://www.google.com/*
// ==/UserScript==


function AddStyle(Style) {
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = Style;
  document.getElementsByTagName('head')[0].appendChild(style);
};

//AddStyle(".GFWVH-1BIU {display:none}");//Used Dec 07, 2010 - Jan 05, 2011
//AddStyle(".GL-BX4-BFS {display:none}");//Used Jan 05, 2010 - Jan 14, 2011
//AddStyle("#col1 {display:none}");//Used Jan 14, 2011 - Mar 30, 2011
//AddStyle(".G-LR {display:none}");//Used Mar 30, 2011 - Apr 10, 2011
//AddStyle("#col1 {display:none}");//Used Apr 01, 2011 - May 18, 2011
//AddStyle(".G-KS {display:none}");//Used May 18, 2011 - May 19, 2011
//AddStyle(".G-BT {display:none}");//Used May 19, 2011 - May 26, 2011
//AddStyle(".G-LS {display:none}");//Used May 19, 2011 - ~Jun 6, 2011 
//AddStyle(".G-CU {display:none}");//Used Jun 06, 2011 - Jul 28, 2011
//AddStyle(".G-KS {display:none}");//Used Jul 28, 2011 - Aug 18, 2011
//AddStyle(".G-NS {display:none}");//Used Aug 18, 2011 - Aug 25, 2011
//AddStyle(".G-MS {display:none}");//Used Aug 25, 2011 - Sept 6, 2011
AddStyle(".kdSidebarHolder {display:none}");//Used Sept 6, 2011 -



//Google needs to knock off the random changing of their iGoogle page ids/classes. Really annoying.


/*
// ==UserScript==
// @name			iGoogle_Fix
// @description	Removes tabs from left side of iGoogle.
// @include		http://www.google.com/*
// ==/UserScript==

var main = document.getElementById('col1');
if (main)
{
    document.getElementById('col1').style.display = "none";
}
*/
