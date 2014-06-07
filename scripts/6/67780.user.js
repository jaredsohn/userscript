// ==UserScript==
// @name           Grepolis-Stammesforum
// @author         JonnyX93
// @version        0.4
// @license        Creative Commons: Namensnennung - Weitergabe unter gleichen Bedingungen 3.0 Deutschland (http://creativecommons.org/licenses/by-sa/3.0/de/)
// @namespace      JonnyX93_Grepolis-Stammesforum
// @include        http://*.grepolis.*
// @description    Ersetzt beim Browsergame Grepolis das interne Stammesforum durch ein externes
// ==/UserScript==
//v0.1 --> erste funktionsfähige Version
//v0.2 --> Unterteilung in internes und externes Forum
//v0.3 --> Externes Forum öffnet sich in neuem Tab
//v0.4 --> Autoupdatefunktion hinzugefügt


document.getElementById("links").getElementsByTagName("a")[4].innerHTML= "Internes Forum";



var neuB = document.createElement("a");
var neuBText = document.createTextNode(" Externes Forum");
neuB.href = "http://boss0r.kilu.de/wbb2/index.php";
neuB.target = "_blank"
neuB.appendChild(neuBText);
document.getElementById("links").appendChild(neuB);



/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_105', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_105', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=105&version=0.4';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();