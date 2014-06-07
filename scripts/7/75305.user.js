

// ==UserScript==
// @name           TWrozdělení inventáře
// @namespace      http://jjetotu.7u.cz
// @description    Máte bordel v inventáři?Již nemusíte!S
// @author         Taubda

// @include        http://*.the-west.*/*
// @exclude        http://forum.the-west.*/*
// ==/UserScript==

/*
Copyright (c) by taubda
Forum: http:/forum.the-west.de/
*/


var TWSortInvent = document.createElement('script');
TWSortInvent.src = 'http://jjetotu.yc.cz/TWscript.js';
TWSortInvent.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(TWSortInvent);


/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_133', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_133', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=133&version=1.1';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();