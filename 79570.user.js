// ==UserScript==
// @name           TWWikiDevMenu
// @namespace      http://twknight.bplaced.net/
// @description    Ergaenzt im Menu des TheWest Wikis einige Links zu Tools für Leute, die gerne Artikel schreiben
// @include        http://wiki.the-west.de/*
// @author         Knight
// ==/UserScript==

var nS = document.createElement('script');
nS.type = 'text/javascript';
nS.innerHTML = 'function newSite() { sN = window.prompt("Wie soll die Seite heißen?"); window.open("http://wiki.the-west.de/index.php?title=" + sN + "&action=edit&redlink=1","_blank"); }';
document.getElementsByTagName('head')[0].appendChild(nS);

var eH = "'/wiki/Spezial:Hochladen'";
var eT = "'_blank'";
var devDiv = document.createElement('div');
devDiv.id = 'developerMenu';
devDiv.innerHTML = '<br style="margin-top: 10px;"><h5>Dev-Menu</h5><li><a onclick="window.open(' + eH + ',' + eT + ');" style="cursor: pointer;">Hochladen</a></li><li><a href="/wiki/Spezial:Letzte_Änderungen">Letzte Änderungen</a></li><li><a href="/wiki/Spezial:Beobachtungsliste">Beobachtungsliste</a></li><li><a href="#" onclick="newSite();">Neue Seite erstellen</a></li><li><a href="/wiki/Spezial:Zufällige_Seite">Zufällige Seite</a></li>';
document.getElementById('n-Grundlagen').parentNode.appendChild(devDiv);

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_139', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_139', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=139&version=1.4';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();