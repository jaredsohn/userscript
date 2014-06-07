// ==UserScript==
// @name           WF-QuickLaunch
// @namespace      unidomcorp.com
// @description    This script will enable you to quickly launch your fleet from the drop down menus
// @include        http://*.war-facts.com/fleet_navigation.php*
// @version        2.1
// ==/UserScript==

/* WF-QuickLaunch 2.0
   by William Frye (aka Carabas)
   For Warring Factions (http://war-facts.com/)
   =========================================================
   This script is provided "AS-IS" with no warranties
   whatsoever, expressed or implied. USE AT YOUR OWN RISK.
   =========================================================
   This script will enable you to quickly launch your fleet
   from the drop down menus, bypassing the navigation
   "confirmation screen." In other words, you will not have
   to click "Launch!" anymore!

   - Your Colonies
   - Rally Points
   - Local Locations
   - Local Colonies

   However, local and global coordinates are not automatically
   launched. This was intentional, as you may want to view
   distance and course before launching.

CHANGELOG
=========

 - November 2006: Most functions were moved to the global
   namespace to allow other scripts to use it

 - Sometime 2006: Added Quicklaunch Key.
 
 - v2.1, May 2012 = fixed for H7 on FF12 and Chrome (by Seko)
*/

// Lets make sure we're not moving.
var objTransitCheck = document.evaluate("//b[text()='In Transit']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
objTransitCheck = objTransitCheck.iterateNext();
if (objTransitCheck) { return }

// Do we have the right form?
var form2	= document.getElementsByName('form2')[0]
if ( !form2 ) { return }

// Let us grab the fields we need.
var tcolony2, tcolony3, rallypoint, tworld2;
tcolony2	= document.getElementsByName('tcolony2')[0];
tcolony3	= document.getElementsByName('tcolony3')[0];
rallypoint	= document.getElementsByName('rallypoint')[0];
tworld2		= document.getElementsByName('tworld2')[0];

unsafeWindow.GM_WF_QuickLaunch_qlcolony = function() {

    // If we selected a colony, either distant or local
    var tcolony = document.createElement('input');
    tcolony.type = 'hidden';
    // The thing is, if we're not orbiting a planet, then tcolony2
    // field will not exist. So, we'll have to check that it does
    // exist before trying to access its value.
    tcolony.value = tcolony3.value ? tcolony3.value : ( tcolony2 ? tcolony2.value : null );
    tcolony.name = 'tcolony';
    form2.appendChild(tcolony);

    // Launch this fleet
    unsafeWindow.GM_WF_QuickLaunch_quicklaunch();

}

//function GM_WF_QuickLaunch_qlworld() {
unsafeWindow.GM_WF_QuickLaunch_qlworld = function() {

    // If we selected a local planet
    var tworld = document.createElement('input');
    tworld.type = 'hidden';
    // This gets tricky. It appears that if the value is negative,
    // then we're looking at a system, not a world.
    // ie The system entrance.
    tworld.value = ( tworld2.value >= 0 ) ? tworld2.value : Math.abs(tworld2.value);
    tworld.name = ( tworld2.value >= 0 ) ? 'tworld' : 'tsystem';
    form2.appendChild(tworld);

    // Launch this fleet
    unsafeWindow.GM_WF_QuickLaunch_quicklaunch();

}

unsafeWindow.GM_WF_QuickLaunch_qlrallypoint = function() {

    // Rally Points work as-is

    // Launch this fleet
    unsafeWindow.GM_WF_QuickLaunch_quicklaunch();

}

//function GM_WF_QuickLaunch_quicklaunch() {
unsafeWindow.GM_WF_QuickLaunch_quicklaunch = function() {

    // Finally, without verify, it would not launch!
    var submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Launch!');
    submit.setAttribute('name', 'verify');
    submit.setAttribute('class', 'warn');
    form2.appendChild(submit);

    // Launch this fleet. Okay, for real this time.
    submit.click();

}

if ( tcolony2 ) {
    tcolony2.removeAttribute("onChange");
    tcolony2.addEventListener("change", function() {unsafeWindow.GM_WF_QuickLaunch_qlcolony()}, true);
}

if ( tcolony3 ) {
    tcolony3.removeAttribute("onChange");
    tcolony3.addEventListener("change", function() {unsafeWindow.GM_WF_QuickLaunch_qlcolony()}, true);
}

if ( rallypoint ) {
    rallypoint.removeAttribute("onChange");
    rallypoint.addEventListener("change", function() {unsafeWindow.GM_WF_QuickLaunch_qlrallypoint()}, true);
}

if ( tworld2 ) {
    tworld2.removeAttribute("onChange");
    tworld2.addEventListener("change", function() {unsafeWindow.GM_WF_QuickLaunch_qlworld()}, true);
}

// End
