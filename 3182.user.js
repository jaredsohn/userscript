/*****************************************************************
	SpongeCell Scroll Wheel v0.1
	
	Scrolls the calendar forward/backward in time. Holding the
	spacebar while scrolling will increase/decrease the number
	of days displayed.
******************************************************************/

// ==UserScript==
// @name          SpongeCell Scroll Wheel
// @namespace     http://userscripts.org
// @description	  Adds scroll wheel support to sponge cell
// @include       http://www.spongecell.com/*
// @include		  http://spongecell.com/*
// ==/UserScript==

(function() {
	//Listen for the needed events
	window.addEventListener("DOMMouseScroll", mouseWheelEventHandler, false);
	window.addEventListener("keydown", keydownEventHandler, false);
	window.addEventListener("keyup", keyupEventHandler, false);	
})();

var bAltScroll = false;
var altScrollKeyCode = 32;		//Space

function mouseWheelEventHandler(e)
{
	var d = e.detail;	// Holds the distance the wheel turned
	var i = 0;			// Amount to increment the week view
	var wndCtl = unsafeWindow.WindowController;		//WindowController Object
	var incCal = unsafeWindow.incrementWeekView;	//IncrementWeekView function
	var setWks = unsafeWindow.setWeeksDisplayed;	//SetWeeksDisplayed function
	var gCalMd = unsafeWindow.g_calendarModel;		//Calendar object
	
	//Set the increment... er.. scroll direction.
	i = (d < 0) ? -1 : 1;
	
	//Update the calendar if the page is ready.
	if(wndCtl && incCal){
		if(wndCtl.isCalendarNavigationAllowed()){
			if(!bAltScroll){
				incCal(i);
			}else{
				setWks(gCalMd.weeksDisplayed + i);
			}
		}
	}
}

function keydownEventHandler(e)
{
	bAltScroll = (e.keyCode == altScrollKeyCode);
}

function keyupEventHandler(e)
{
	if(bAltScroll) bAltScroll = (e.keyCode != altScrollKeyCode);
}


