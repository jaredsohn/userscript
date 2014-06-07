// ==UserScript==
// @name          Auto Refresher
// @namespace     InfoMaster
// @description	  Refresh your favorite webpages on a randomly modified schedule
// @include       http://*.*.*
// ==/UserScript==

// Make sure to right click you GM monkey & set the interval.

GM_registerMenuCommand("Set Refresh Interval", function() {var refreshlimittestor = (prompt( "What is your desired MAXIMUM refresh interval", "Enter the MAXIMUM time between refreshes in minutes")-1);GM_setValue("UserEntry", refreshlimittestor);doSomething();});
var ONESEC   = 1000 ;				// One second (in ms)
var ONEMIN   = 60 * ONESEC ;		// One minute (in ms)
var refreshlimit = GM_getValue("UserEntry", 15);
doSomething();
//setInterval ( "doSomething()", (ONEMIN *( refreshlimit + 1 ) ));

function doSomething ( )
{
	var INTERVAL = (((refreshlimit-((refreshlimit/2)-1)*Math.random()) + ((refreshlimit/3)-1))*ONEMIN);
	//alert(INTERVAL);
	//The above line is the random interval generator.  It will create a unique interval between half of the maximum specified interval, and the maximum interval
	//Example:  Maximum interval set to 15 minutes, random interval will be from 7 Minutes 0 Seconds to 14 Minutes 59 Seconds
    window.setTimeout(
	function()
	{
		window.location.reload() ;
		doSomething();
	},
	INTERVAL
) ;
}