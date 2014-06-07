// ==UserScript==
// @name            WestWars Hide Info by TVE
// @description	    Hides the Info
// @namespace       TVEndingen
// @include         http://fb.westwars.com/game/*
// ==/UserScript==

document.getElementById('hints_container').style.display = "none";
document.getElementById('hints_container').style.height = "0px";

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_180', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_180', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=180&version=1.1';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();