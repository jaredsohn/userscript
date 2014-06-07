// ==UserScript==// @name  WF-QuickLaunch// @namespace       http://unidomcorp.com// @include         http://*.war-facts.com/fleet_navigation.php*// ==/UserScript==/* WF-QuickLaunch 2.0   by William Frye (aka Carabas)   For Warring Factions (http://war-facts.com/)   =========================================================   This script is provided "AS-IS" with no warranties    whatsoever, expressed or implied. USE AT YOUR OWN RISK.   =========================================================   This script will enable you to quickly launch your fleet   from the drop down menus, bypassing the navigation   "confirmation screen." In other words, you will not have   to click "Launch!" anymore!      - Your Colonies   - Rally Points   - Local Locations   - Local Colonies      However, local and global coordinates are not automatically   launched. This was intentional, as you may want to view   distance and course before launching.   CHANGELOG
=========

 - November 2006: Most functions were moved to the global   namespace to allow other scripts to use it    - Sometime 2006: Added Quicklaunch Key.*/	// Lets make sure we're not moving.
	var objTransitCheck = document.evaluate("//b[text()='In Transit']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	objTransitCheck = objTransitCheck.iterateNext();
	if (objTransitCheck) { return }		// Do we have the right form?	var form2	= document.getElementsByName('form2')[0]	if ( !form2 ) { return }	// Let us grab the fields we need.	var tcolony2, tcolony3, rallypoint, tworld2;	tcolony2	= document.getElementsByName('tcolony2')[0];	tcolony3	= document.getElementsByName('tcolony3')[0];	rallypoint	= document.getElementsByName('rallypoint')[0];	tworld2		= document.getElementsByName('tworld2')[0];		unsafeWindow.GM_WF_QuickLaunch_qlcolony = function() {			// If we selected a colony, either distant or local		var tcolony = document.createElement('input');
		tcolony.type = 'hidden';		// The thing is, if we're not orbiting a planet, then tcolony2		// field will not exist. So, we'll have to check that it does 		// exist before trying to access its value.
		tcolony.value = tcolony3.value ? tcolony3.value : ( tcolony2 ? tcolony2.value : null );
		tcolony.name = 'tcolony';
		form2.appendChild(tcolony);				// Launch this fleet		unsafeWindow.GM_WF_QuickLaunch_quicklaunch();		}		//function GM_WF_QuickLaunch_qlworld() {	unsafeWindow.GM_WF_QuickLaunch_qlworld = function() {			// If we selected a local planet
		var tworld = document.createElement('input');
		tworld.type = 'hidden';		// This gets tricky. It appears that if the value is negative,		// then we're looking at a system, not a world.		// ie The system entrance.
		tworld.value = ( tworld2.value >= 0 ) ? tworld2.value : Math.abs(tworld2.value);
		tworld.name = ( tworld2.value >= 0 ) ? 'tworld' : 'tsystem';
		form2.appendChild(tworld);		// Launch this fleet		unsafeWindow.GM_WF_QuickLaunch_quicklaunch();			}		unsafeWindow.GM_WF_QuickLaunch_qlrallypoint = function() {			// Rally Points work as-is			// Launch this fleet		unsafeWindow.GM_WF_QuickLaunch_quicklaunch();		}		//function GM_WF_QuickLaunch_quicklaunch() {	unsafeWindow.GM_WF_QuickLaunch_quicklaunch = function() {			// Finally, without verify, it would not launch!
		var submit = document.createElement('input');
		submit.setAttribute('type', 'submit');
		submit.setAttribute('value', 'Launch!');
		submit.setAttribute('name', 'verify');		submit.setAttribute('class', 'warn');
		form2.appendChild(submit);		// Launch this fleet. Okay, for real this time.		submit.click();		}// Hot Keys - woot!// I'll admit. It's a bit messy, but works quite well.//----------------------------------------------------// Keyboard hot(shortcut) keys as follows/*	Press the letter 'w', then any of these:	` 	= 0 (or system entrance)	1-9	= planets 1-9	0	= planet 10	-	= planet 11	=	= planet 12		If there is more than 12 planets, then you'll have to do it	yourself. Sorry.*/	var keyspressed = 0;
	var doworld = 0;	var worldlength = tworld2.options.length-2;
	
	unsafeWindow.GM_WF_QuickLaunch_qlKeys = function(evt) {		// We don't want to interfere with regular typing		// Shamelessly stolen from another script - Carabas
		if (evt.target && evt.target.nodeName) {
			var targetNodeName = evt.target.nodeName.toLowerCase();
			if (targetNodeName == "textarea" ||
				(targetNodeName == "input" && evt.target.type &&
				 evt.target.type.toLowerCase() == "text")) {
			  return false;
			}
		}		var whichKey = evt.which;		var keypressed = String.fromCharCode(whichKey);
		keyspressed++;
		if (keyspressed == 1) {
		  switch (whichKey) {
			case 87: // 'w' - We're going to select a world.
				doworld=1;				break;
			default : keyspressed = 0;
		  }
		}
		if (keyspressed == 2 && doworld == 1) {
			switch (whichKey) {			  case 192:				keypressed = 0;				break;			  case 48:				keypressed = 10;				break;			  case 109:				keypressed = 11;				break;			  case 61:				keypressed = 12;				break;			  default: null;			}			if ( !isNaN(keypressed) ) {				if (worldlength >= keypressed) {					tworld2.selectedIndex = parseInt(keypressed)+1;					unsafeWindow.GM_WF_QuickLaunch_qlworld();				} else if (worldlength < keypressed) { alert("We're done here."); }			}
		}		// Debug
		GM_log("Pressed: "+keyspressed+" Key: "+keypressed+"/"+whichKey);		// Debug
		if (keyspressed == 2) {keyspressed=0;doworld=0}
	}
	
	//window.qlSetup = function() {		window.addEventListener('keydown', function (evt) {unsafeWindow.GM_WF_QuickLaunch_qlKeys(evt)}, true);				if ( tcolony2 ) {			tcolony2.removeAttribute("onChange");			tcolony2.addEventListener("change", function() {unsafeWindow.GM_WF_QuickLaunch_qlcolony()}, true);		}				if ( tcolony3 ) {			tcolony3.removeAttribute("onChange");			tcolony3.addEventListener("change", function() {unsafeWindow.GM_WF_QuickLaunch_qlcolony()}, true);		}				if ( rallypoint ) {			rallypoint.removeAttribute("onChange");			rallypoint.addEventListener("change", function() {unsafeWindow.GM_WF_QuickLaunch_qlrallypoint()}, true);		}						if ( tworld2 ) {			tworld2.removeAttribute("onChange");			tworld2.addEventListener("change", function() {unsafeWindow.GM_WF_QuickLaunch_qlworld()}, true);		}	//}		//window.addEventListener("load", window.qlSetup, false);// End
