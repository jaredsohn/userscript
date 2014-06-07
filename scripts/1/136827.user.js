// ==UserScript==
// @name           HitKey
// @namespace      bananaz
// @include        http://nl*.tribalwars.nl/game.php*
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
win.$.getScript('http://dl.dropbox.com/u/64675680/Hitkey2.user.js');