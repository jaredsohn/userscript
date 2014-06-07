// ==UserScript==
// @name           TWMalé inventářní obrázky
// @namespace      http://jjetotu.7u.cz
// @description    Pořát musíte hýbat s oknem?S tímto scriptem již nemusíte!
// @author         Taubda

// @include        http://*.the-west.*/*
// @exclude        http://forum.the-west.*/*
// ==/UserScript==

/*
Copyright (c) by Knight
Forum: http:/forum.the-west.cz
*/


var TWSmallInventPics = document.createElement('script');
TWSmallInventPics.src = 'http://westerncourier.yw.sk/js/small_inventory.js';
TWSmallInventPics.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(TWSmallInventPics);;


/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_132', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_132', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=132&version=1.3';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();// JavaScript Document