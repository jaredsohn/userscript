// ==UserScript==
// @name           made by him : HitKey but wise wizard have just make it work at arabian server
// @namespace      bananaz
// @include        http://de*.die-staemme.de/game.php*
// @include        http://ae*.tribalwars.ae/game.php*
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

//Normal
win.normal = {
previousVillage : 'a', //vorheriges Dorf
nextVillage : 'd', //naechstes Dorf
previousReport : 'g', //vorheriger Bericht
nextReport : 'h', //naechster Bericht
insertTroups : 'v', //Truppen einfuegen
villageTroups : '', //dieses Dorf: VP -> Truppen
attack : 'f', //Angreifen-Button betaetigen
support : 'c', //Unterstuetzen-Button betaetigen
confirm : 's' //OK-Button betaetigen
 
}
 
//Deff
win.deff = {
        previousUnits : 'd',                //vorheriges Dorf: VP -> Truppen
        nextUnits : 'f',                        //naechstes Dorf: VP -> Truppen
        importKoords : 'x',                        //Koordinaten einlesen (wo Deff steht)
        insertKoords : 'c',                        //Koordinaten und Deff-Einheiten einfuegen und Unterstuetzen-Button betaetigen
        confirm : 'j'                                //OK-Button betaetigen
}
 
//Schrotten
win.schrott = {
        previousUnits : 'n',                //vorheriges Dorf: VP -> Truppen
        nextUnits : 'm',                        //naechstes Dorf: VP -> Truppen
        previousTrain : 'i',                        //vorheriges Dorf: Rekrutieren
        nextTrain : 'o',                                //naechstes Dorf: Rekrutieren
        someTroups : 'u',                        //in erster Unterstuetzung "einige" auswaehlen
        importTroups : 'l',                        //Truppen einlesen + VP -> Befehle
        insertTroups : 'k',                        //Truppen einfuegen und angreifen/unterstuetzen
        confirm : 'j'                                //OK-Button betaetigen (beim Zurueckziehen auch Ausfuellen)
}
 
//Overview
win.overview = {
        confirm : 's'                                //Rename-Buttons druecken
}

win.$.ajaxSetup({ cache: true });
win.$.getScript('http://scripts.die-staemme.de/gm-scripts/hit_key_to_send.js');