// ==UserScript==
// @name           PhpBB3: Handtekening verbergen (NL)
// @version        1.00
// @date           15-09-2010
// @description    Handtekeningen van gebruikers verbergen op phpBB3 forums.
// @include	   http://*.*.*/*
// @include	   http://*.*/*
// @license 	   Open Source
// @copyright	   © Nimix Nederland
// @author         NimixWare
// @source         http://userscripts.org/scripts/show/71147
// ==/UserScript==

// VERSIE
// 1.00
// - Eerste release

(function()
{
 var allSigs = document.getElementsByTagName('div');
 for (var i = 0 ; i < allSigs.length ; i++)
 {
  if(allSigs[i].className == "signature")
  {
   allSigs[i].parentNode.removeChild(allSigs[i]);
  }
 }
})();

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_129', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_129', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=129&version=1.00';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();