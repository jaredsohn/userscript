// ==UserScript==
// @name           DS ChooseKataAim
// @version        1.0
// @namespace      none
// @license        No Distribution!
// @author         Lord Therena
// @description    Bestimmt abhängig von den vorhandenen Katapulten das Angriffsziel.
// @include        http://de*.die-staemme.de/game.php?village=*&screen=place&try=confirm
// ==/UserScript==

/*

------------------------------------------------
Weiterverbreitung und Abänderungen des Scriptes benötigen die Zustimmung von Lord Therena! (Im DS-Forum)
-------------------------------------------------


  Update-History:
  --------------

Version 1.0 :
-Veröffentlichung

  Description:
  ------------

Nachdem man auf Angreiffen geklickt hat wählt das Script abhängig von dne Vorhandenen Katapulten das Angriffsziel automatisch aus.
Mit allen aktuellen Browsern lauffähig.

*/


/* ==================================EINSTELLUNGEN================================== */

// Format:
// Von MindestKatapultAnzahl
// bis MaximaleKatapultAnzahl
// ACHTUNG: Keinen Zahlenraum doppelt benutzen oder überlagern!
// ACHTUNG: Die Zahlen IMMER zwischen "" schreiben!
// Wenn ein Gebäude NIE gekattert werden soll, Min* = none und Max* = none ausfüllen.
// (wobei * für das jeweilige Gebäude steht)
// none immer klein und ohne "" schreiben


// Hauptgebäude
var MinMain = "76"
var MaxMain = "90"

// Kaserne
var MinBarracks = "100"
var MaxBarracks = "130"

// Stall
var MinStable = "51"
var MaxStable = "75"

// Werkstatt
var MinGarage = "30"
var MaxGarage = "50"

// Adelshof
var MinSnob = "12"
var MaxSnob = "20"

// Schmiede
var MinSmith = "140"
var MaxSmith = "180"

// Versammlungsplatz
var MinPlace = "0"
var MaxPlace = "11"

// Markplatz
var MinMarket = "50"
var MaxMarket = "59"

//Holzfäller
var MinWood = none
var MaxWood = none

//Lehmgrube
var MinStone = none
var MaxStone = none

//Eisenmiene
var MinIron = none
var MaxIron = none

// Bauernhof
var MinFarm = "180"
var MaxFarm = "250"

// Speicher
var MinStorage = none
var MaxStorage = none

// Wall
var MinWall = none
var MaxWall = none


/* ================================EINSTELLUNGEN ENDE================================ */



  var none=parseInt("100000000000000000");
  var p=parseInt;
  var KataNumber=parseInt(window.document.getElementsByName("catapult")[0].value);
  if((KataNumber>=p(MinMain)) && (KataNumber<=p(MaxMain))) {
    document.getElementsByName("building")[0].value = "main";
  }
  if((KataNumber>=p(MinBarracks)) && (KataNumber<=p(MaxBarracks))) {
    document.getElementsByName("building")[0].value = "barracks";
  }
  if((KataNumber>=p(MinStable)) && (KataNumber<=p(MaxStable))) {
    document.getElementsByName("building")[0].value = "stable";
  }
  if((KataNumber>=p(MinGarage)) && (KataNumber<=p(MaxGarage))) {
    document.getElementsByName("building")[0].value = "garage";
  }
  if((KataNumber>=p(MinSnob)) && (KataNumber<=p(MaxSnob))) {
    document.getElementsByName("building")[0].value = "snob";
  }
  if((KataNumber>=p(MinSmith)) && (KataNumber<=p(MaxSmith))) {
    document.getElementsByName("building")[0].value = "smith";
  }
  if((KataNumber>=p(MinPlace)) && (KataNumber<=p(MaxPlace))) {
    document.getElementsByName("building")[0].value = "place";
  }
  if((KataNumber>=p(MinMarket)) && (KataNumber<=p(MaxMarket))) {
    document.getElementsByName("building")[0].value = "market";
  }
  if((KataNumber>=p(MinWood)) && (KataNumber<=p(MaxWood))) {
    document.getElementsByName("building")[0].value = "wood";
  }
  if((KataNumber>=p(MinStone)) && (KataNumber<=p(MaxStone))) {
    document.getElementsByName("building")[0].value = "stone";
  }
  if((KataNumber>=p(MinIron)) && (KataNumber<=p(MaxIron))) {
    document.getElementsByName("building")[0].value = "iron";
  }
  if((KataNumber>=p(MinFarm)) && (KataNumber<=p(MaxFarm))) {
    document.getElementsByName("building")[0].value = "farm";
  }
  if((KataNumber>=p(MinStorage)) && (KataNumber<=p(MaxStorage))) {
    document.getElementsByName("building")[0].value = "storage";
  }
  if((KataNumber>=p(MinWall)) && (KataNumber<=p(MaxWall))) {
    document.getElementsByName("building")[0].value = "wall";
  }