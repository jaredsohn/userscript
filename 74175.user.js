// ==UserScript==
// @name The West - Motivation PL by Darius II
// @source namespace http://userscripts.org/users/120392
// @namespace http://userscripts.org/users/128276
// @description Monitorowanie motywacji prac w The-West, Polska wersja językowa. Skrypt oryginalny http://userscripts.org/users/120392 , którego autorem jest JoeSmith
// @source author JoeSmith
// @author Darius II
// @include http://*.the-west.*/game.php*
// ==/UserScript==

function getMoCheckVersion() {
	return "1.00";
}

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today=new Date();GM_setValue('muUpdateParam_137',String(today));}function CheckForUpdate(){var lastupdatecheck=GM_getValue('muUpdateParam_137','never');var updateURL='http://www.monkeyupdater.com/scripts/updater.php?id=137&version='+getMoCheckVersion();var today=new Date();var one_day=24*60*60*1000;if(lastupdatecheck!='never'){today=today.getTime();var lastupdatecheck=new Date(lastupdatecheck).getTime();var interval=(today-lastupdatecheck)/one_day;if(interval>=1){update(updateURL);}}else{update(updateURL);}}CheckForUpdate();