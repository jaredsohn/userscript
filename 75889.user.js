// ==UserScript==
// @name           Avalon Forum Link (NL)
// @version        1.04
// @description    Bij (browser spel) voegt een extra link 'Avalon Forum/ Chat' bij de menu onderaan.
// @include        http://*.grepolis.*
// @license 	   Open Source
// @copyright	   © Nimix Nederland
// @author         NimixWare
// @source         http://userscripts.org/scripts/show/71049
// ==/UserScript==

// VERSIE
// 1.00
// - Eerste release


var neuB = document.createElement("a");
var neuBText = document.createTextNode(" Avalon Forum");
neuB.href = "http://spottertrips.eu/Grepolis/index.php?sid=0a3f1960354b0435ddf3bf7113e40e15";
neuB.target = "_blank"
neuB.appendChild(neuBText);
document.getElementById("links").appendChild(neuB);

var neuB = document.createElement("a");
var neuBText = document.createTextNode(" / Chat");
neuB.href = "http://chat.parachat.com/chat/login.html?room=Avalon&width=740&height=500&lang=nl";
neuB.target = "_blank"
neuB.appendChild(neuBText);
document.getElementById("links").appendChild(neuB)

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_125', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_125', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=125&version=1.00';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();