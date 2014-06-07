// ==UserScript==
// @name           Conquest Bot
// @version        0.1.0 Alpha
// @namespace      GalaxyWebs
// @homepage       http://userscripts.org/scripts/show/132043
// @include        http://www.clicktaz.com*
// @include        http://www.galaxywebs.com/conquestbot/*
// @description    Bot for Conquest -- Resurgence Within
// ==/UserScript==


//Game Variables as of 4/28/2012 @ 7:40PM EST
//General Info.
var uid; //i've seen this in both koc and conquest and inclined to believe it's a unique user ID #
var gid; //i've seen this in both koc and conquest and inclined to believe it's a unique group ID #
var token; //no clue
var stat; //most likely something involving statistics.
var utop; //no clue
var source; //no clue
var firstLoginDate; //clearly the date you first logged in or gave facebook permissions to let you in.
var lastReport; //something to do with reports
var platUsed;  //Platinum used so far?
var items; //no clue
var researched; //a number code for the research itself followed by the number of the level for that research???
var maxFleets;  //maximum # of fleets.
var maxQuantity;  //maximum quantity of what?
var level; //level of what?
var ms; //no clue
var hints;  //no clue

//Builds
var upgrading;  //no clue
var buildingStation;  //no clue

//Combat
var xp; //no clue
var combat_bonus; //no clue
var rows; //noclue

//Levels
var power; //clearly your level of power
var credits; //clearly how many credits you have.
var energy; //clearly how much energy you have.
var crew; //clearly how much crew you have.
var ore; //clearly how much ore you have.
var platinum; //cleaarly how much platinum you have.

//Messages
var hush; //clearly for ignoring a person in chat and in inbox/sent folders
var lastRead; //clearly for messaging (inbox/sent)

//Shipyards
var fleet_size; //no clue
var use_oldest;  //Use oldest setting in shipyard?

//Tutorials
var tutstarted;  //Started doing the beginner tutorial?
var tutfiniished;  //Finished doing the beginner tutorial?
var tutabandoned;  //Abandoned doing the beginner tutorial?

/*
||------------------------------------------------------------------------||
||                              Start of script                           ||
||------------------------------------------------------------------------||
*/

