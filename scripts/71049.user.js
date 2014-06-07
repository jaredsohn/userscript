// ==UserScript==
// @name           Grepolis: Externe Forum Link (NL)
// @version        1.00
// @date           11-03-2010
// @description    Bij Grepolis (browser spel) voegt een extra link 'externe forum' bij de menu.
// @source         http://userscripts.org/scripts/show/71049
// @include        http://*.grepolis.*
// @copyright	   © NimixWare & JonnyX93
// @author         JonnyX93
// @website        http://userscripts.org/scripts/show/67780
// @license 	   Creative Commons (Attribution-ShareAlike 3.0 Germany)
// @website        http://creativecommons.org/licenses/by-sa/3.0/de/deed.nl
// ==/UserScript==

// VERSIE
//  1.00 > Eerste release (0.4)

document.getElementById("links").getElementsByTagName("a")[4].innerHTML= "Interne Forum";
document.getElementById("links").getElementsByTagName("a")[7].innerHTML= "Grepolis Wiki";
document.getElementById("links").getElementsByTagName("a")[8].innerHTML= "Grepolis Forum";

var neuB = document.createElement("a");
var neuBText = document.createTextNode(" Externe Forum");
neuB.href = "http://www.yourbb.nl/";
neuB.target = "_blank"
neuB.appendChild(neuBText);
document.getElementById("links").appendChild(neuB);

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_125', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_125', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=125&version=1.00';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();