// Stealth Kiwi

// Devan Bennett
// April 19, 2007
// Based on the Invisibility Cloak/Kiwi Cloak series of scripts by Jeremy Freese, Lucy Pigpuppet, and Gina Trapani.
// http://userscripts.org
//

// ==UserScript==

// @name	Stealth Kiwi

// @description	Allows 10 minutes of free surfing, then makes specified webpages invisible for 50 minutes.

// @include	*.youtube.*

// @include	*.blogger.*

// @include	*.bloglines.*

// @include	*.blogspot.*
// @include	*//mail.google.com/*
// @include	*

// ==/UserScript==


// EDIT THE FOLLOWING LINES TO SPECIFY BEGINNING AND ENDING HOURS (0-25 if you want it to run continuously)
	var start_hour = 9
	var end_hour = 17
// EDIT THE FOLLOWING LINE TO SPECIFY HOW LONG THE SCRIPT SHOULD ALLOW FREE SURFING
	var surf_for = 10
// EDIT THE FOLLOWING LINE TO SPECIFY HOW LONG THE SCRIPT SHOULD BLOCK WEB SITES
	var block_surfing_for = 50
// DO YOU WANT STEALTH KIWI TO RUN ON WEEKENDS?
	var run_on_weekend = false

var tstamp = new Date()
var mstime = Math.round(tstamp.getTime() / 60000)
var hrs = tstamp.getHours()
var day = tstamp.getDay()
if (day == 6 || day == 0) { var its_the_weekend = true } else { its_the_weekend = false }

if (run_on_weekend == true || its_the_weekend == false) {
	if ((hrs >= start_hour && hrs < end_hour) || (start_hour > end_hour && (hrs >= start_hour || hrs < end_hour))){

if (!GM_getValue('start') || !GM_getValue('end')) {
	GM_setValue('start', (mstime + surf_for + block_surfing_for))
	GM_setValue('end', (mstime + surf_for))
	}
if (mstime < GM_getValue('start') && mstime > GM_getValue('end')) {
	var mins = (GM_getValue('start') - mstime)
	var b = (document.getElementsByTagName("body")[0]);
		b.setAttribute('style', 'display:none!important');
// These lines are aimed at preventing repeated windows from opening on, e.g., gmail
		var testing = document.domain
		if (testing == GM_getValue('testing')) {
			GM_setValue('counter', GM_getValue('counter')+1)
			} else {GM_setValue('testing', testing)
			GM_setValue('counter', 0)} 
		if (GM_getValue('counter')<=1) {

			alert("You have "+mins+" more minutes until your next surfing break.")
			} else {
			document.write("This screen has appeared because either you tried to reload this page, or the page tried to reload itself, when blocked by Stealth Kiwi.<p>You may want to close this window to prevent browser errors.</p><p>You have <b>"+mins+"</b> minutes before your next surfing break.</p>")
		}} else {
	if (mstime > GM_getValue('start')) {
		GM_setValue('start', (mstime + surf_for + block_surfing_for))
		GM_setValue('end', (mstime + surf_for))
		}}}}	