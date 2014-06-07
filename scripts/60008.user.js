// Quiditch System V1
// By Justin186 of TCZ
// Hosted by dhez (http://dhezshounee.blogspot.com/) 
 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           quidditch code for zetaboards
// @namespace      http://benerantongsampah.blogspot.com
// @description    tuzkitherabbit

// ==/UserScript==

var forum_number = 459394;
var Game_Name = "Quiditch"

var aTeams = new Array(1); // Creates an Array
aTeams[0]=["Gryffindor","Slytherin","Hufflepuff","Ravenclaw"]

var aPositions = new Array(1); // Creates an Array
aPositions[0]=["Keeper","Chaser","Beater","Seeker"]

var aChaser = new Array(1); // Creates an Array
aChaser[0]=["Pass Quaffle","Intercept Quaffle","Score","Avoid Bludger","Forfeit Turn","Hit by Bludger"]

var aKeeper = new Array(1); // Creates an Array
aKeeper[0]=["Avoid Bludger","Catch Quaffle and pass to team","Block Quaffle","Forfeit Turn","Hit by Bludger","Hit By Bludger"]

var aSeeker = new Array(1) // Creates an Array
aSeeker[0]=["Spot Snitch","Dive for Snitch","Catch Snitch","Avoid Bludger","Forfeit Turn","Hit By Bludger"]

var aBeater = new Array(1); // Creates an Array
aBeater[0]=["Hit Bludger","Block other teams Bludger","Forfeit Turn","Forfeit Turn","Block Bludger","Hit Bludger"]
