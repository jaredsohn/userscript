// GreaseMonkey Script Update Manager
// version 0.0.6
// 01-17-2009
// Copyright (c) 2009, Matthew Hancock
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Ikariam Transport Countdown", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Version History:
// 0.0.4: Original Public Release
// ==================================================
//
// This script raises awareness of the GreaseMonkey script update service provided
// by MonkeyUpdater.com.
//
// The script used by MonkeyUpdater.com was originally created by matthewaaron with the
// schedule system originally created by psycadelik.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          GreaseMonkey Script Update Manager
// @namespace     http://monkeyupdater.com/
// @description   This script raises awareness of the GreaseMonkey script update service provided by MonkeyUpdater.com.
// @include        http://*.*.*/*
// ==/UserScript==

function openTab (){
	var pageOpened = GM_getValue('gmsumOpened', 'no');
	if(pageOpened == 'no'){
		alert('GreaseMonkey Script Update Manager has some information to share with you on how you can add update notifications to your GreaseMonkey scripts.  Once redirected, you will not see this message again.'); 
		GM_setValue('gmsumOpened', 'yes');
		window.location = "http://www.monkeyupdater.com?ref=gmsum"
	}else{
	}
}
openTab();

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_24', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_24', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=24&version=0.0.6';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();