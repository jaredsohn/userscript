// ==UserScript==
// @name			VW4jrc
// @namespace		Facebook
// @description		Autoplayer for the Vampire Wars game
// @version			2.4.8.7
// @include			http://apps.facebook.com/vampiresgame/*
// @include			http://apps.new.facebook.com/vampiresgame/*
// @exclude      		http://apps.facebook.com/vampiresgame/index.php?cache_hash=*
// @exclude     		http://apps.facebook.com/vampiresgame/index.php?sendbuffkey=*
// @exclude      		http://apps.facebook.com/vampiresgame/index.php?sendStwKey=*
// @exclude     		http://apps.facebook.com/vampiresgame/index.php?zy_track=*
// @exclude      		http://apps.facebook.com/vampiresgame/landing.php?zy_track=recruit*
// @exclude      		http://apps.facebook.com/vampiresgame/track.php*
// @exclude      		http://apps.facebook.com/vampiresgame/hits.php*
// @exclude      		http://apps.facebook.com/vampiresgame/comments.php*
// @exclude      		http://apps.facebook.com/vampiresgame/stats.php?user=*
// @exclude      		http://apps.facebook.com/vampiresgame/jobs.php?helpSocial=*
// @author 			ppakasj
// @contributor		IEF
// @contributor		Zorkfour (G.L. Cadogan)
// @contributor		doc
// @contributor 	Mozbrad 
// @contributor 	zysfryar 
// ==/UserScript==

//Edit 032910 (zysfryar): Added Lines 8 thru 19 - zysfryar: reasons for exclude do the following, without
//initiating the auto-play and let it run in another tab/window. You can accept items from Newsfeed
//or provide assistance You can accept gifts, Use the Hitlist without being empacted. Use the Comments pages
//View other members Pages for commenting, voting, or attack & bite, hitlist or Send gifts.

// 2010_04_19-2.4.8.7a_vampirewars.user.js
//BSF Edit:
// BSF0001 - Added Exp Reserve
// BSF0002 - Added Alert to Log Cleared
// BSF0003 - Added Log entry to record username, ID, Level, Clan Size, Skill of ppl who are attacked
// BSF0004 - Added Parameters to Auto-Fight: Max Skill, Min Level, Min Clan
// BSF0005 - Added Fight Opponent Finder Loop Code from Mafia Wars script
// BSF0006 - Added Window -> fight screen after fight result (Defunct)
// BSF0007 - Added Grab Current Exp, Exp to Lvl
// BSF0008 - Added Display Exp to Lvl in stats box
// BSF0009 - Added Modifications to Auto use Energy Buff (Defunct - Energy boosts now used)
// BSF0010 - Added code to Get the maximum energy
// BSF0011 - Added code to use up all Rage if doing so will likely reach next level (Doesn't work?)
// BSF0012 - Added Avoidance of fighting for known tough opponents (fightListAvoid) and clan members (mySelectClanAvoid)
// BSF0013 - Commented out logging of found items from fights (defunct)
// BSF0014 - Added User changable parameter to include missionExpGain (the average Exp gained per Energy) - used to calculate when to use Energy Buff
// BSF0015 - Added User changable parameter to include fightExpGain (the average Exp gained per rage) - used to calculate when to use Rage Buff
// BSF0016 - Display Job Exp Rate Gain on Missions Page
// BSF0017 - Changed order of mission/fight back to normal (mission, then fight)
// BSF0018 - Capture new fight results (Feb 2010)
// BSF0019 - Added Periodic, Automatic Judging of Random People
// BSF0020 - Created Quicklinks Box
// BSF0021 - Fixed logging of "cannot fight a member of your Clan" message
// BSF0022 - Log receiving items in various ways
// BSF0023 - Fixed logging the spoils from Akem's Gamble:
// BSF0024 - Added Log entry to record gained exp and gained/lost SR when I attack ppl
// BSF0025 - Moved Log to Right and set default to visible
// BSF0026 - Collect number of boosts from Stats page for display in Quick Links box
// BSF0027 - Fixed logging of Blood Magic Spin results
// BSF0028 - Capture and log kills (Not working yet?)
// BSF0029 - Capture Blood Magic to log
// BSF0030 - Automate Special Events
// BSF0031 - Modification of Automatic Periodic Judging to allow for configurable parameters in the settings screens
// BSF0032 - Limit number of repeated attacks on same vamp in fight
// BSF0033 - Added General, Array, and some HTML/DOM methods from MWAP v1.1.25 build 362
// BSF0034 - Automatically add to avoid list vamps I have lost to 
// BSF0035 - Grab and save my current number of clan and Skill Rating 



var settingsOpen = false;
var logOpen      = true;
var delay = 3000;
var blood2Update = 120000;
var debug = true;


//BSF Edit:
// BSF0034 - Automatically add to avoid list vamps I have lost to 
// Initialize the array of vamps I have lost to if necessary
if (isGMUndefined('autoFightLossList')) {
	var autoFightLossList = new Array();
	setSavedList('autoFightLossList', autoFightLossList);
} else {
	var autoFightLossList = GM_getValue('autoFightLossList');
}
//alert('autoFightLossList= '+autoFightLossList);

//BSF Edit:
// BSF0012 - Added Avoidance of fighting for known tough opponents (fightListAvoid) and clan members (mySelectClanAvoid)
var fightListAvoid = new Array(
	123456789,  // Put a comma separated list of IDs you want to avoid here - you can put comments after them so you know who they are.
	234567890   // Make sure the last one in the list doesn't have a comma after it.
);

// BSF0012 - Added Avoidance of fighting for known tough opponents (fightListAvoid) and clan members (mySelectClanAvoid)
var mySelectClanAvoid = new Array(
	345678901,  // Put a comma separated list of IDs who are in your clan so you won't bother trying to fight them.
	456789012   //  Make sure the last one in the list doesn't have a comma after it.
);

// BSF0012 - Added Avoidance of fighting for known tough opponents (fightListAvoid) and clan members (mySelectClanAvoid)
fightListAvoid = fightListAvoid.concat(mySelectClanAvoid);
// BSF0034 - Automatically add to avoid list vamps I have lost to 
fightListAvoid = fightListAvoid.concat(autoFightLossList);
var blacklist = fightListAvoid.toString();
//alert('blacklist= '+blacklist);

var SCRIPT = {
	url: 'http://userscripts.org/scripts/show/74916',
	version: '2.4.8.7',
	name: 'vampiresgame',
	appID: 'app25287267406',
	presentationurl: 'http://userscripts.org/scripts/show/74916'
};

var level;
var clan;
var td;
var blood;
var health;
var energy;
var rage;
var bankpopup;
var bank;
var lottery;
var gameVersion;
var EnergyBuffGain;
var JudgeTimerIndex;

//var missions = new Array(
////Mission Name, Energy , Tab, Order on Tab
//
////BSF Edit: New Missions Array from r83:	
////BSF Edit: 2009.12.01: New Missions Array from r85:	
//	//Fledgling currentTier=0
//	["Feast on a Human's Blood",1,0,0,1],
//	["Eliminate a Street Gang",5,0,2,3],
//	["Raid a Blood Bank",5,0,3,4],
//	["Destroy a Renegade Vampire",3,0,1,2],
//	["Kill a Drug Dealer",3,0,5,6],
//	["Fight a Sewer Wererat",2,0,4,5],
//	["Rescue an Ally From an Insane Asylum",4,0,6,7],
//	
//	//Neophyte currentTier=1
//	["Fight Ghouls in the Deep Woods",3,1,0,8],
//	["Destroy a Circle of Warlocks",3,1,1,9],
//	["Attack a Vampiric Lair",8,1,4,12],
//	["Feed in Central Park",8,1,3,11],
//	["Tame a Shadow Demon",3,1,2,10],
//	["Sneak into Vampires' Nest",5,1,5,13],
//	["Fight a Vampire Slayer",5,1,6,14],
//	["End the Unlife of a Lich",5,1,7,15],
//	
//	//Adept currentTier=2
//	["Challenge a Haitian Voodoo Gang",6,2,0,16],
//	["Fight a Pack of Werewolves",10,2,1,17],
//	["Retrieve a Lost Relic From the High Desert",7,2,2,18],
//	["Fight Another Vampire For Mental Dominance",8,2,4,19],
//	["Take Control of a Neighborhood",14,2,3,20],
//	["Save a Vampire From Hunters",10,2,5,21],
//	["Clear a Laboratory of Hideous Mutants",13,2,6,22],
//	
//	//Savant currentTier=3
//	["Battle a Werewolf Lord",15,3,0,23],
//	["Rescue an Ally from the Underworld",15,3,1,24],
//	["Fight Government Agents in Foundry",18,3,2,25],
//	["Banish Summoned Demon",19,3,3,26],
//	["Face a Rival Clan Alone",20,3,4,27],
//	["Destroy a Demonic Lord",20,3,5,28],
//	["Exterminate A Rival Clan",21,3,6,29],
//	
//	//Stalker currentTier=4
//	["Research the Spider Queen's Lair",35,4,0,43],
//	["Travel through the Moonlit Forest",28,4,1,44],
//	["Uncover the Spider Caverns",37,4,2,45], //31
//	["Eliminate the Spider Guards",39,4,3,46],
//	["Locate the Queen's Nest",40,4,4,47],
//	["Slay the Spider Queen",45,4,5,48],
//	["Imbibe the Spider Queen's blood",42,4,6,49],
//	["Demolish the Spider Caverns",46,4,7,50],
//
//	//Deathbringer currentTier=5
//	["Foresee a Traitor in the Midst",38,5,0,30],
//	["Interrogate a Traitorous Minion",35,5,1,31],
//	["Investigate the Lair of Acanthus",33,5,2,32],
//	["Create a Diversion",42,5,3,33],
//	["Assault Acanthus's Lair",45,5,4,34],
//	["Stand-Off with Acanthus",50,5,5,35],
//	
//	//Vindicator currentTier=6
//	["Uncover Draven's Catacombs",42,6,0,36],
//	["Navigate the Labyrinth",38,6,1,37],
//	["Investigate the Chapel",45,6,2,38],
//	["Clear the Rotting Meat Locker",52,6,3,39],
//	["Meet with Lord Draven",50,6,4,40],
//	["Uncover the Truth",54,6,5,41],
//	["Dispense with Lord Draven",59,6,6,42],
//	
//	//Scion currentTier=7
//	["Receive The Shadow Council's Request",45,7,0,51],
//	["Travel to the Council Ruins",40,7,1,52],
//	["Meet with the Council's Emissary",52,7,2,53],
//	["The Shadow Council's Challenge",60,7,3,54],
//	["Heir to the Council",50,7,4,55],
//	["Prepare the Altar",52,7,5,56],
//	["Summon the Shadow Council",58,7,6,57],
//	["Ascend to the Shadow Council",63,7,7,58]
//);
//	
//var missionTabs = new Array(
//	["Fledgling"],
//	["Neophyte"],
//	["Adept"],
//	["Savant"],
//	["Deathbringer"],
//	["Vindicator"],
//	//Stalker is in between Savant-Deathbringer tabs, but is named as tab 6. Scion is tab 7.
//	["Stalker"],
//	["Scion"]
//);	







var missions = new Array(
//Mission Name, Energy , Tab, Order on Tab, Job Number

  //Fledgling currentTier=0
  ["Feast on a Human's Blood",1,0,0,1],
  ["Eliminate a Street Gang",5,0,1,2],
  ["Raid a Blood Bank",5,0,2,3],
  ["Destroy a Renegade Vampire",3,0,3,4],
  ["Kill a Drug Dealer",3,0,4,5],
  ["Fight a Sewer Wererat",2,0,5,6],
  ["Rescue an Ally From an Insane Asylum",4,0,6,7],

  //Neophyte currentTier=1
  ["Fight Ghouls in the Deep Woods",3,1,0,8],
  ["Destroy a Circle of Warlocks",3,1,1,9],
  ["Attack a Vampiric Lair",8,1,2,12],
  ["Feed in Central Park",8,1,3,11],
  ["Tame a Shadow Demon",3,1,4,10],
  ["Sneak into Vampires' Nest",5,1,5,13],
  ["Fight a Vampire Slayer",5,1,6,14],
  ["End the Unlife of a Lich",5,1,7,15],

  //Adept currentTier=2
  ["Challenge a Haitian Voodoo Gang",6,2,0,16],
  ["Fight a Pack of Werewolves",10,2,1,17],
  ["Retrieve a Lost Relic From the High Desert",7,2,2,18],
  ["Fight Another Vampire For Mental Dominance",8,2,3,19],
  ["Take Control of a Neighborhood",14,2,4,20],
  ["Save a Vampire From Hunters",10,2,5,21],
  ["Clear a Laboratory of Hideous Mutants",13,2,6,22],

  //Savant currentTier=3
  ["Battle a Werewolf Lord",15,3,0,23],
  ["Rescue an Ally from the Underworld",15,3,1,24],
  ["Fight Government Agents in Foundry",18,3,2,25],
  ["Banish Summoned Demon",19,3,3,26],
  ["Face a Rival Clan Alone",20,3,4,27],
  ["Destroy a Demonic Lord",20,3,5,28],
  ["Exterminate A Rival Clan",21,3,6,29],

  //Stalker currentTier=4
  ["Research the Spider Queen's Lair",35,4,0,43],
  ["Travel through the Moonlit Forest",28,4,1,44],
  ["Uncover the Spider Caverns",37,4,2,45], 
  ["Eliminate the Spider Guards",39,4,3,46],
  ["Locate the Queen's Nest",40,4,4,47],
  ["Slay the Spider Queen",45,4,5,48],
  ["Imbibe the Spider Queen's blood",42,4,6,49],
  ["Demolish the Spider Caverns",46,4,7,50],

  //Deathbringer currentTier=5
  ["Foresee a Traitor in the Midst",38,5,0,30],
  ["Interrogate a Traitorous Minion",35,5,1,31],
  ["Investigate the Lair of Acanthus",33,5,2,32],
  ["Create a Diversion",42,5,3,33],
  ["Assault Acanthus's Lair",45,5,4,34],
  ["Stand-Off with Acanthus",50,5,5,35],

  //Vindicator currentTier=6
  ["Uncover Draven's Catacombs",42,6,0,36],
  ["Navigate the Labyrinth",38,6,1,37],
  ["Investigate the Chapel",45,6,2,38],
  ["Clear the Rotting Meat Locker",52,6,3,39],
  ["Meet with Lord Draven",50,6,4,40],
  ["Uncover the Truth",54,6,5,41],
  ["Dispense with Lord Draven",59,6,6,42],

  //Scion currentTier=7
  ["Receive The Shadow Council's Request",45,7,0,51],
  ["Travel to the Council Ruins",40,7,1,52],
  ["Meet with the Council's Emissary",52,7,2,53],
  ["The Shadow Council's Challenge",60,7,3,54],
  ["Heir to the Council",50,7,4,55],
  ["Prepare the Altar",52,7,5,56],
  ["Summon the Shadow Council",58,7,6,57],
  ["Ascend to the Shadow Council",63,7,7,58]
  );

var missionTabs = new Array(
  ["Fledgling"],
  ["Neophyte"],
  ["Adept"],
  ["Savant"],
  ["Stalker"],
  ["Deathbringer"],
  ["Vindicator"],
  ["Scion"]
);


//BSF Edit:
// BSF0030 - Automate Special Events
// Event: Mandyland (Spring 2010)
var eventMissions = new Array(
//Mission Name, Energy , Tab, Order on Tab, Job Number, Number of Event Resources Required (put 0 if resources are not required for event)

  //"The Midway" currentEventTier=0
  ["Explore the Midway",1,0,0,72,1],
  ["Follow Trail of Popcorn",2,0,1,73,2],
  ["Investigate Carnival Games",3,0,2,74,2],
  ["Battle Carnival Clowns",4,0,3,75,2],
  ["Hotwire a Clown Car",5,0,4,76,3],

  //"Ferris Wheel" currentEventTier=1
  ["Locate Source of Attack",1,1,0,77,2],
  ["Ascend the Ferris Wheel",2,1,1,78,2],
  ["Avoid the Jugglers' Assault",3,1,2,79,2],
  ["Battle atop the Ferris Wheel",4,1,3,80,3],
  ["Survive the runaway Ferris Wheel",5,1,4,81,3],

  //"Carousel" currentEventTier=2
  ["Climb from the Wreckage",2,2,0,82,2],
  ["Approach the Carousel",3,2,1,83,2],
  ["Evade the Horse Lady's Attacks",4,2,2,84,3],
  ["Battle the Horse Lady's Animals",5,2,3,85,3],
  ["Steal the Horse Lady's Fiery Horse",6,2,4,86,4],

  //"The Big Top" currentEventTier=3
  ["Search the Circus for the Ringmaster",2,3,0,87,2],
  ["Enter the Big Top",3,3,1,88,3],
  ["Eliminate the Attacking Animals",4,3,2,89,3],
  ["Stand-off with the Ringmaster",5,3,3,90,3],
  ["Question Mandy's Whereabouts",6,3,4,91,4],

  //"House of Mirrors" currentEventTier=4
  ["Decipher Note",4,4,0,92,3],
  ["Make your way to the House of Mirrors",5,4,1,93,3],
  ["Chase Down Shadows",6,4,2,94,3], 
  ["Break mirror to find real culprit",7,4,3,95,4],
  ["Fight Elder Carissa and Edward",8,4,4,96,4],

  //"Haunted House" currentEventTier=5
  ["Enter the Haunted House",5,5,0,97,3],
  ["Break Free from Mandy's Gaze",6,5,1,98,3],
  ["Survive Mandy's Dolls",7,5,2,99,4],
  ["Battle with Mandy",8,5,3,100,4],
  ["Escape Mandyland",9,5,4,101,5]
  );

var eventMissionTabs = new Array(
  ["Chapter 1: The Midway"],
  ["Chapter 2: Ferris Wheel"],
  ["Chapter 3: Carousel"],
  ["Chapter 4: The Big Top"],
  ["Chapter 5: House of Mirrors"],
  ["Chapter 6: Haunted House"]
);


//BSF Edit:
// BSF0030 - Automate Special Events
var eventActive = false;
var eventImageHTML = "<img src='http://facebook6.vampires.static.zynga.com/graphics/items_mandys_curse_round.png' width='31' height='31' align='middle'/>"
var eventWaypoint = "event.php?event=Mandyland"
var eventJobsPage = "eventjobs.php"
var eventName = "Mandyland"
var eventResetPage = "eventjobs.php?eventMasteryReset=1&currentTier="
var eventHasResource = true;
var eventNumResources;


//BSF Edit:
// BSF0032 - Limit number of repeated attacks on same vamp in fight
// Load the array of recent attack targets
//if (!isGMUndefined('autoFightAttackLimitList')) {
//	var autoFightAttackLimitList = GM_getValue('autoFightAttackLimitList');
//} else {
//	var autoFightAttackLimitList = new Array();
//}
////alert('autoFightAttackLimitList= '+autoFightAttackLimitList);

//BSF Edit:
// BSF0032 - Limit number of repeated attacks on same vamp in fight
// Initialize the array of recent attack targets if necessary
if (isGMUndefined('autoFightAttackLimitList')) {
	GM_getValue('autoFightAttackLimitList');
	var autoFightAttackLimitList = new Array();
	setSavedList('autoFightAttackLimitList', autoFightAttackLimitList);
}
//alert('autoFightAttackLimitList= '+GM_getValue('autoFightAttackLimitList'));
	
var attributes	= new Array(
	["Animalistic Frenzy",4,0],
	["Astral Projection",116,1],
	["Bat Form",15,0],
	["Blood Shield",26,1],
	["Blood to Ashes",5,1],
	["Bloodletting",129,1],
	["Bloody Mess",34,1],
	["Bone Spikes",14,1],
	["Cat's Grace",31,1],
	["Cause Madness",3,1],
	["Claws of the Demon",19,1],
	["Command Rat Swarm",1,1],
	["Command a Wolf Pack",4,1],
	["Control Bear Clans",30,1],
	["Control Mall Santas",37,1],
	["Corrosion",115,1],
	["Create Illusion",24,1],
	["Cross Running Water",132,1],
	["Demon Summoning",21,1],
	["Demonic Familiar",32,1],
	["Dodge Daylight",35,1],
	["Drain Youth",7,1],
	["Eagle Eyes",29,1],
	["Enhanced Senses",3,0],
	["Exsanguinate",38,1],
	["Fangs",1,0],
	["Fast Healing",9,0],
	["Flight",17,0],
	["Glamor",45,0],
	["Gliding",14,0],
	["Grave Touch",121,1],
	["Hellfire",17,1],
	["Horrific Transformation",8,0],
	["Immaterial",23,1],
	["Immunity to Religious Icons",13,1],
	["Immunity to Silver",9,1],
	["Impervious",10,0],
	["Indestructible",18,1],
	["Inhuman Speed",11,0],
	["Intimidation",46,0],
	["Intoxicating Bite",2,1],
	["Invisibility",8,1],
	["Iron Skin",16,1],
	["Ironic Annihilation",33,1],
	["Jaguar's Grace",125,1],
	["Locust Swarm",42,1],
	["Mind Control",6,0],
	["Mist Form",16,0],
	["Mortify",124,1],
	["Move Silently",47,0],
	["Pestilence",27,1],
	["Premonition",130,1],
	["Purge Blood",22,1],
	["Pyrokinesis",44,1],
	["Raise Zombies",10,1],
	["Resistance to Sunlight",11,1],
	["Shadow Conceal",131,1],
	["Shadow Manipulation",6,1],
	["Shadow Transformation",15,1],
	["Spider Climb",119,1],
	["Storm Rage",120,1],
	["Summon Horseman",25,1],
	["Summon Horseman",117,1],
	["Superhuman Strength",5,0],
	["Telepathy",12,1],
	["Unearthly Reflexes",12,0],
	["Vampire Lord",20,1],
	["Vampiric Claws",2,0],
	["Veil of Thorns",114,1],
	["Vertical Ascension",13,0],
	["Winged Guard",39,1],
	["Wolf Form",7,0]
	// ToDo: add rest of attributes
	);
	
var ratings = new Array(["Tasty (+2)"],["Tempting (+1)"],["Toxic (-1)"] );

var menuItems = new Array(
	[["News",null],["Stats",UpdateStats],["Comments",null],["Edit Avatar",null], ["Trophies",null],["Judgement",JudgePeople]], // Coffin
	[["Invite",DoClanAccepts],["My Clan",null],["Clan Comment",UpdateGroupWall]], // Clan
	[["Fledging",DoMissions],["Neophyte",DoMissions],["Adept",DoMissions],["Savant",DoMissions],["Stalker",DoMissions],["Deathbringer",DoMissions],["Vindicator",DoMissions],["Scion",DoMissions]], //Mission 
	[["Fight",DoFights],["Hitlist",null],["Leaderboards",null]], // Combat
	[["Abilities",UpdateAbilityPage],["Minions",UpdateMinionPage],["Shop",null]], // Bazaar
	[["Council",null],["Akem's Gamble",DoAkemsGamble],["Blood Magic",DoBloodMagic],["Crypt",null]], //Elders
	[["Terms",null],["Forum",null],["Support",null]], //Help
	[["Stats",UpdatePlayerPage],["Comments",UpdatePlayerPage]], //Help
	[["Chapter 1: The Midway",DoEventMissions],["Chapter 2: Ferris Wheel",DoEventMissions],["Chapter 3: Carousel",DoEventMissions],["Chapters 4 to 6",null]], //Mandyland Missions (1st screen)
	[["Chapters 1 to 3",null],["Chapter 4: The Big Top",DoEventMissions],["Chapter 5: House of Mirrors",DoEventMissions],["Chapter 6: Haunted House",DoEventMissions]] //Mandyland Missions (2nd screen)
);
	
var XMLHttpFactories = [
    function () {return new XMLHttpRequest()},
    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

String.prototype.toInt = function(){ return parseInt(this.replace(/,/g, ''));}

function getPositionLeft(This){
var el = This;var pL = 0;
while(el){pL+=el.offsetLeft;el=el.offsetParent;}
return pL
}

function getPositionTop(This){
var el = This;var pT = 0;
while(el){pT+=el.offsetTop;el=el.offsetParent;}
return pT
}
var giftbox = 'data:image/gif;base64,R0lGODlhFgAWAPcAAI6BgnBiZJWIilpNUIJwdId1eqOUmFdJTV9SVraqrnpnbq2fpMC1uWZUW7CgplZHTWdWXV9QVsW7v1hFTmFQWFpIUV1LVI10g11FVZd3joptgnZMbE8zSEwyRl8/V1k7UnRRbGxDY1I1TF8/WFA1Sn5VdamMo3ZEbVQzTls4VGxEZFMwTXtJc4hZgHVObodbgIhfgZBnio9qimAsWl0vV0cWQk8bSnhCc3dFcqN1n0sUR0kVRVEbTWYqYmMqX3c4c3lLdohchSoCKDEDL0EFPkMHQEUIQikGJ0kLRnEwbX42e4VAgWMwYbCArkYAREIAQEEAPzIAMTEAMDcBNkUDQ1gGVkgFRkQFQj8FPT0FOz0GPDsGOUQLQlIOUEsNSUQMQmwlaoBAfmIAYWEAYVYAVT4APkMBQmEGYVIFUUoFSUsJS3QQdG4TbmwYa2AbYIApf3gnd4AugIs8ip9NnqxtrOfS52sAbWIAZWEAYloAW1EAUk0ATkoAS0QARnMCdmQCZUkCSlkDWlcGWVEHUoIchHgae5Etk5k3nHMqdJQ9lY07jpJClKUArp4Ap5UAnI8Al44AlIwAk4EAh38AhHIAdnEAdW0Ac2gAbWUAamQAaVwAYKIBq3kBf3cBe2sBb5UCnY0ClGUCaXUDeoYGjXcFfVQEV58Ip2gGbJoKoX8Ig3wJgZALlpMMmmwKcIoNj6EVp3gQfYYSi48clYcsjLA6tqM5qZlHnKUAsJ8ArLE0uqwOurkyxstz07SxrHpybYV6eV1RUX1tbWNXV2xfX2ZaWmVZWWldXWFWVmBVVV9UVFhOToh5eX9xcXZpaXVoaHNmZmxgYGtfX1pQUIN1dYFzc3ptbXFlZW9jY2dcXGZbW1xSUlVMTH1wcGleXlZNTYt9fYR3d3dra2NZWVlQUFFJSYh7e4Z5eVdPT5aJiZ6RkYJ3d5OHh6mdnaaampyRkZuQkJqPj56Tk6ecnJ+VlZ2Tk7OpqbaursW9vb21tcO8vMC5ubu0tMrDw8nCwuXi4v///yH5BAEAAP8ALAAAAAAWABYAAAj/AP8JHEiQYCNJlwoqXMhoE6U+CyMKFCUJj5QoEh2BGhXrx5tXqzABUgNLYidIkThRCrVn0iZPgvyoMjRHoQs9d9zgABOoDB9LmjKlcoXK1CdZOQQ+U+Djy5EhW6YIKfWI1ClEQWLIUERnwbd/14YFoIEmT6tZQOAwosVrly5ctUysC8YMLDRsO6B00bCv15Jbuer4a7JmzAlqzcL9w5bNmI0nNYBFUxeH1SET8y60+cNiGrSB2pCtMKPjmLQDSUBcEJAuA5szIbqdGyhN2wMsXCwkG4DAl7x27WBU4TFBGrKByY5V0JKFhDZtwn6xiwdghpMU3bCJGyiumAUsWTp4ovMmDBy6cgR6kFHhbBhBYtgoGCHCwRs5bczQ0TOgRMyGatcQJI4xDSBxhQjjbJMMAPXYk4AcdpRAjTMEHUMMBF5Y8YE22yADzz36MLBIJS8sYw1BwCQTgRdpeCCMMsi8w08+EtjSSQvcYKMQBkVQMUI3yQjzTj80JmLHDRIVMggK3QiTDT394ONAGIRINBATyBwTTTz4uFOAlQppk40560gUEAA7';

function filterNotifications(elt) {
  // Get all beeps (pop-ups about notifications).
  var beeps = document.evaluate(".//div[@class=\'UIBeep_Title\']", elt, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < beeps.snapshotLength; i++) {
    var beepElt = beeps.snapshotItem(i);
    if (beepElt && beepElt.innerHTML.indexOf('You sent a notification')) {
      // A notification was sent.
      if ((beepElt.innerHTML.indexOf('fought you')!=-1) || (beepElt.innerHTML.indexOf('fought with your help')!=-1)) {
        var undoElt = document.evaluate(".//a[@class=\'undo_link\']", beepElt, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        
        if (undoElt) {
          clickElement(undoElt);
          addToLog('Canceled attack notification.');
        }
      }
    }
  }
}

function clickElement(elt) {
  if (!elt) {
    addToLog('BUG DETECTED: Null element passed to clickElement().');
    return;
  }
  // Simulate a mouse click on the element.
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elt.dispatchEvent(evt);
}

//add popup listener
var modificationTimer;
//document.addEventListener('DOMSubtreeModified', function(e){ setTimeout(function(){ handleDOMSubtreeModified(e); }, 0);}, false);
//document.addEventListener('DOMNodeInserted', function(e){setTimeout(function(){ nodeInserted(e); }, 0);}, false);

// Add event listeners.
setListenContent(true);
resetModificationTimer();

// Turns on/off the high-level event listener for the game.
function setListenContent(on) {
	var elt = document.getElementById('app_content_25287267406');
	if (!elt)
    return;
	
	if (on) {
		elt.addEventListener('DOMSubtreeModified', handleDOMSubtreeModified, false);
    log('Content Event Listener Added!');

	} else {
		elt.removeEventListener('DOMSubtreeModified', handleDOMSubtreeModified, false);
    log('Content Event Listener Removed!');
    
	}
}
function resetModificationTimer() {
	if (modificationTimer)
		window.clearTimeout(modificationTimer);
	
	modificationTimer = window.setTimeout(handleModificationTimer, 500);
}

function handleModificationTimer() {
	// The timer has gone off, so assume that page updates have finished.
	log('Changes finished.');
	
	RefreshGlobalStats();	
	LogEvents();
	doHighPriority();
	
	// Kick off auto-play.
	if(!handlePages())
		doAutoPlay();  
}

function handleDOMSubtreeModified(e) {
  //consoleLogElement(e.target, 'subtree: ');
  var parentElt = e.target.parentNode;
  
  if (!parentElt)
    return;

  // Exclude changes related to countdowns and logging.
  if (ignoreElement(e.target))
    return;
  
  resetModificationTimer();
}

// reload logic
if((GM_getValue('autoClick', '') == "checked")&& (GM_getValue('paused')==0))
{
//BSF Edit:
// BSF0031 - Modification of Automatic Periodic Judging to allow for configurable parameters in the settings screens
	if(GM_getValue('autoPeriodicJudge', '') == "checked") {
//BSF Edit: Go to the Judging page periodically, based on timer variable
// BSF0019 - Added Periodic, Automatic Judging of Random People
		JudgeTimerIndex = parseInt(GM_getValue('judgeTimerIndex', '0')) + 1;
		if(JudgeTimerIndex>=parseInt(GM_getValue('autoJudgeTimerIndexMax', '0'))){
			GM_setValue('judgeTimerIndex',0);
			GM_setValue('JudgeCount',GM_getValue('autoJudgeCount','0'));
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/judge.php";
		} else {
			GM_setValue('judgeTimerIndex',JudgeTimerIndex);
		}
	}

    var timeWait = Math.floor(parseFloat(GM_getValue('r1', '6')) + parseFloat((GM_getValue('r2', '11'))-parseFloat(GM_getValue('r1', '6')))*Math.random())*1000;
      setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+ GM_getValue('refreshPage', "/index.php")+"'", timeWait);
}

// page not loaded correctly... just retrun
if(document.getElementById(SCRIPT.appID+'_stats_table') == null)
	return;

function log(message)
{
	if(debug)
		GM_log(message);
}
	
function RefreshGlobalStats() {

	log('refreshGlobalStats.');

	try{
		gameVersion = parseInt(document.body.innerHTML.split('facebook6.vampires.static.zynga.com/')[1].split('/graphics')[0]);
		level =  parseInt(document.body.innerHTML.split('Level:')[1]);
		clan =  parseInt(document.body.innerHTML.split('my clan (')[1]);
		td = document.getElementById(SCRIPT.appID+'_stats_table').getElementsByTagName('td');
		blood = document.getElementById( SCRIPT.appID+'_current_cash').innerHTML.toInt();
		health = parseInt(document.getElementById( SCRIPT.appID+'_current_health').innerHTML.toInt());
		energy = document.getElementById( SCRIPT.appID+'_current_energy').innerHTML.toInt();
		rage =parseInt(document.getElementById( SCRIPT.appID+'_current_stamina').innerHTML.toInt());
		bankpopup = document.getElementById(SCRIPT.appID+'_bank_popup');
		bank = bankpopup.getElementsByTagName('span')[0].innerHTML;
//BSF Edit: Fixed Display of Bank Value
		if(bank!=undefined){
			var bankStat = makeElement('div', document.body);
			bankStat.setAttribute("style", "position: absolute; left: "+(statsLeft+92)+"px; top: "+(statsTop+163)+"px; font-family: Arial; font-size: 12px; font-weight: 400; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color: white;");
			bankStat.innerHTML = 'Bank: '+bank;
		}
// Commented out per Blannie
//		var giftlink=document.getElementById('app25287267406_stats_table').childNodes[1].childNodes[11].childNodes[1].childNodes[1];
//		giftlink.setAttribute("style","position: relative; left: 125px; top: 34px;");
		

//BSF Edit: (7 lines):
// BSF0007 - Added Grab Current Exp, Exp to Lvl
// Get the Current Exp, Exp for next level:
//		var ExpBlock = document.getElementById(SCRIPT.appID+'_levelupwords').innerHTML.split('return true;">')[1].split('</a>')[0];
		var ExpBlock = document.getElementById(SCRIPT.appID+'_levelupwords').innerHTML.split('return true;" title="Click here to view your stats!">')[1].split('</a>')[0];
		if (ExpBlock!=null) {
			var curExp = ExpBlock.split('/')[0].toInt();
			var lvlExp = ExpBlock.split('/')[1].toInt();
			ExpToNextLevel = lvlExp - curExp;
		} else {
			ExpToNextLevel = 0;
		}

//BSF Edit: (9 lines):    
// BSF0008 - Added Display Exp to Lvl in stats box
//Create Exp to lvl
	 	var ExpToLvlStat = document.evaluate("//div[@class='ExpToLvl']", document,null,9,null).singleNodeValue;
		if(!ExpToLvlStat)
		{
			var ExpToLvlStat = makeElement('div', document.body);
			ExpToLvlStat.setAttribute("class", "ExpToLvl");
//			ExpToLvlStat.setAttribute("style", "position: absolute; left: "+(statsLeft+230)+"px; top: "+(statsTop+18)+"px; font-family: Times,serif; font-size: 12px; font-weight: 400; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color: white;");
			ExpToLvlStat.setAttribute("style", "position: absolute; left: "+(statsLeft+160)+"px; top: "+(statsTop+28)+"px; font-family: Times,serif; font-size: 12px; font-weight: 400; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color: white;");
		}
		ExpToLvlStat.innerHTML = '(-'+ExpToNextLevel+')';

//BSF Edit: (10 lines):
// BSF0010 - Added code to Get the maximum energy
		var statElements = document.getElementById(SCRIPT.appID+'_stats_div').getElementsByTagName('td');
		for (var i=1;i<statElements.length;i++)
			if(statElements[i].innerHTML.indexOf(SCRIPT.appID+'_current_energy')!= -1){
				var MaxEnergy = statElements[i].innerHTML.split('</span>/')[1].split('</a>')[0];
// BSF0009 - Added Modifications to Auto use Energy Buff (Defunct - Energy boosts now used)
// BSF0014 - Added User changable parameter to include missionExpGain (the average Exp gained per Energy) - used to calculate when to use Energy Buff
				EnergyBuffGain = MaxEnergy*GM_getValue('missionExpGain', '1.5');
				i=statElements.length;
			}





//BSF Edit:
// BSF0035 - Grab and save my current number of clan and Skill Rating 
		if(isGMUndefined('myClan')) {
			log('Clan Size Unknown');
			if (GM_getValue('paused')==0 && location.href.indexOf(SCRIPT.name+'/recruit') == -1) {
				log('Going to Clan screen to get Clan Size');
				window.location = "http://apps.facebook.com/"+SCRIPT.name+"/recruit.php";
				return;
			}
		}
		if(isGMUndefined('mySkillRanking')) {
			log('Skill Ranking Unknown');
			if (GM_getValue('paused')==0 && location.href.indexOf(SCRIPT.name+'/stats') == -1 && location.href.indexOf(SCRIPT.name+'/recruit') == -1) {
				log('Going to Stats screen to get Skill Ranking');
				window.location = "http://apps.facebook.com/"+SCRIPT.name+"/stats.php";
				return;
			}
		}



//BSF Edit: (10 lines):
// BSF0030 - Automate Special Events
// If needed, get the number of Event Resource Items
		if(eventActive && eventHasResource) {
			eventNumResources = parseInt(document.getElementById( SCRIPT.appID+'_event_boe').innerHTML.split(';return true;">')[1].split('</a>')[0].toInt());
		}
		
	}
	catch (e){ GM_log(e);}
	
	if (GM_getValue('paused')==undefined) GM_setValue('paused',1);
}

//Get absolute banner position
bannerTop = getPositionTop(document.getElementById(SCRIPT.appID+'_banner_row')); //140
bannerLeft = getPositionLeft(document.getElementById(SCRIPT.appID+'_banner_row')); // 300
var pauseButton = document.createElement("div");

if (GM_getValue('paused')==0) {
	pauseButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+300)+"px; top: "+(bannerTop+150)+"px; font-family: Verdana; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color:green;");
	pauseButton.innerHTML = "Pause Autoplayer";
	pauseButton.addEventListener('click', pausePlayer, false);
	document.body.appendChild(pauseButton);
} else { 
	pauseButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+300)+"px; top: "+(bannerTop+150)+"px; font-family: Verdana; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color:red;");
	pauseButton.innerHTML = "Resume Autoplayer";
	pauseButton.addEventListener('click', resumePlayer, false);
	document.body.appendChild(pauseButton);
}
    
//Create Bank status
statsTop = getPositionTop(document.getElementById(SCRIPT.appID+'_stats_div'));
statsLeft = getPositionLeft(document.getElementById(SCRIPT.appID+'_stats_div'));
    
// menu logic
var settingsButton =  makeElement('div', document.body);
	settingsButton.innerHTML = "open settings";
	settingsButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+10)+"px; top: "+(bannerTop+10)+"px; font-family: Verdana; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color: #AA0000;");
	settingsButton.addEventListener('click', toggleSettings, false);

if (GM_getValue('autoLog', '') == 'checked'){		
    var viewLogButton = makeElement('div', document.body);
        viewLogButton.innerHTML = "View Log";
        viewLogButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+450)+"px; top: "+(bannerTop+10)+"px; font-family: Verdana; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;color: #AA0000;");
        viewLogButton.addEventListener('click', toggleLogBox, false);

    var clrLogButton = makeElement('div', document.body);
        clrLogButton.innerHTML = "clear log";
        clrLogButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+450)+"px; top: "+(bannerTop+28)+"px; font-family: Verdana; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;color: #AA0000;");
        clrLogButton.addEventListener('click', clearLog, false);

    var logBox = makeElement('div', document.body);
    	logBox.id = 'logBox';
		logBox.innerHTML = GM_getValue('itemLog', 'log empty');
//BSF Edit:
// BSF0025 - Moved Log to Right and set default to visible
//		logBox.setAttribute("style", "position: absolute; overflow: scroll; left: "+bannerLeft+"px; top: "+(bannerTop+28)+"px;  width: 600px; height: 300px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 10pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 999999;");
		logBox.setAttribute("style", "position: absolute; overflow: scroll; left: "+(bannerLeft+760)+"px; top: "+bannerTop+"px;  width: 520px; height: 700px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 8pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 999999;");
	    if(logOpen == true){
	        viewLogButton.innerHTML = "Hide Log";
	        logBox.style.visibility = "visible";
	    }

//BSF Edit - Quicklinks Box
// BSF0020 - Created Quicklinks Box
// BSF0026 - Collect number of boosts from Stats page for display in Quick Links box
    var quickLinksBox = makeElement('div', document.body);
    	quickLinksBox.id = 'quickLinksBox';
//		quickLinksBox.setAttribute("style", "position: absolute; left: "+(bannerLeft-250)+"px; top: "+bannerTop+"px;  width: 200px; height: 200px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 10pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: visible; z-index: 999999;");
		quickLinksBox.setAttribute("style", "position: absolute; left: "+(bannerLeft+760)+"px; top: "+(bannerTop-85)+"px;  width: 400px; height: 60px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 10pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: visible; z-index: 999999;");
//		quickLinksBox.innerHTML = "Quick Links<br>\
		quickLinksBox.innerHTML = "Quick Links&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Clan: "+GM_getValue('myClan')+"&nbsp;&nbsp;SR: "+GM_getValue('mySkillRanking')+"<br>\
			<a href='http://apps.facebook.com/vampiresgame/stats.php?useBoostCons=251' style='color:#5858FA'><img src='http://facebook6.vampires.static.zynga.com/64458/graphics/boost_rage.gif' alt='' width='20' height='20' title='50% Rage Boost' border='0'>50% Rage Boost</a> ("+GM_getValue('numRageBoosts', '?')+")&nbsp;&nbsp;&nbsp;&nbsp;\
			<a href='http://apps.facebook.com/vampiresgame/stats.php?useBoostCons=249' style='color:#5858FA'><img src='http://facebook6.vampires.static.zynga.com/64458/graphics/deadbull.png' alt='' width='20' height='20' title='50% Energy Boost' border='0'>50% Energy Boost</a> ("+GM_getValue('numFiftyNrgBoosts', '?')+")<br>\
			<a href='http://apps.facebook.com/vampiresgame/stats.php?useBoostCons=252' style='color:#5858FA'><img src='http://facebook6.vampires.static.zynga.com/64458/graphics/boost_health.gif' alt='' width='20' height='20' title='50% Health Boost' border='0'>50% Health Boost</a> ("+GM_getValue('numHealthBoosts', '?')+")&nbsp;&nbsp;&nbsp;&nbsp;\
			<a href='http://apps.facebook.com/vampiresgame/stats.php?useBoostCons=254' style='color:#5858FA'><img src='http://facebook6.vampires.static.zynga.com/64458/graphics/heartcandy_bag.png' alt='' width='20' height='20' title='100% Energy Boost' border='0'>100% Energy Boost</a> ("+GM_getValue('numHundredNrgBoosts', '?')+")";
//		quickLinksBox.innerHTML = 'Quick Links';

//BSF Edit - Temporary text box to display recent attack targets
// BSF0032 - Limit number of repeated attacks on same vamp in fight
//    var recentAttackTargetBox = makeElement('div', document.body);
//    	recentAttackTargetBox.id = 'recentAttackTargetBox';
//		recentAttackTargetBox.setAttribute("style", "position: absolute; left: "+(bannerLeft-175)+"px; top: "+bannerTop+"px;  width: 150px; height: 500px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 10pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: visible; z-index: 999999;");
//		recentAttackTargetBox.innerHTML = "Last Attack Targets:<br>"+GM_getValue('autoFightAttackLimitList');

//BSF Edit - Temporary text box to display ppl I have lost to
// BSF0034 - Automatically add to avoid list vamps I have lost to 
    if(GM_getValue('autoFightAvoidLost', '') == "checked") {
	var fightLossesBox = makeElement('div', document.body);
		fightLossesBox.id = 'fightLossesBox';
			fightLossesBox.setAttribute("style", "position: absolute; left: "+(bannerLeft-200)+"px; top: "+bannerTop+"px;  width: 175px; height: 500px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 8pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: visible; z-index: 999999;");
			fightLossesBox.innerHTML = "Fights Lost:<br>"+GM_getValue('autoFightLossList');
    }


   	
    var clearLostListButton = makeElement('div', fightLossesBox,{'style':'position: absolute; left:125px;  top: 10px; color: #FFFFFF;'});
        clearLostListButton.innerHTML  = "<button>Clear</button>";
        clearLostListButton.addEventListener('click', clearLostList, false);

}

function doHighPriority(){
	//auto-accept gifts
	if(document.body.innerHTML.indexOf("Your pending gifts")!=-1){
		var accept = document.evaluate("//input[@value='Accept All']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if(accept.snapshotLength == 1) {
			accept.snapshotItem(0).click();
			return;
		}
		var acceptsingle = document.evaluate("//input[@value='Accept']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (acceptsingle.snapshotLength == 1) {
			acceptsingle.snapshotItem(0).click();
			return;
		}
	}

	// //autoGamble logic
	// if (location.href.indexOf(SCRIPT.name+'/lottery') != -1){
		// if((GM_getValue('autoGamble', '') != "checked") || (GM_getValue('paused')!=0))
			// return;
		// log('Autoplayer autoGamble');
		
		// if(document.body.innerHTML.indexOf("Or come back in")!=-1){
			// LotteryDue =  parseInt(document.body.innerHTML.split('Or come back in ')[1]);
			// GM_setValue('busy',0);
			// var now = Math.floor(new Date().getTime() / 1000);
			// //time = time + 60 *(1+ parseInt(messagebox.innerHTML.split('hours and')[1]));
			// GM_setValue('LotteryDue',now + 3600 * LotteryDue );
			
			// document.location = 'http://apps.facebook.com/'+SCRIPT.name+ GM_getValue('refreshPage', "/index.php");
		// }
		// else{//Free 24hr gamble
			// if (GM_getValue('rBoxLeft')=='checked') BoxToOpen=1;
			// else if (GM_getValue('rBoxMiddle')=='checked') BoxToOpen=2;
			// else 	BoxToOpen=3;
			// addToLog("Free gamble, opening Chest no. "+BoxToOpen+".");
			// if(GM_getValue('busy', 0) != 1)
				// document.location = 'http://apps.facebook.com/'+SCRIPT.name+'/lottery.php?viewState=openChest&chest='+BoxToOpen+'&useFP=1';
			// GM_setValue('busy',1);
		// }
	// }
	
	// auto gifting logic
	if (location.href.indexOf(SCRIPT.name+'/gift') != -1){
		if((GM_getValue('autoGifting', '') != "checked") || (GM_getValue('paused')!=0) || GM_getValue('giftingCount', 0)<1)
			return;
		log("auto gift " + attributes[GM_getValue('selectAttribute', 'nothing')][0] +" to "+ GM_getValue('giftingUser', 'xxxx')+" x "+ GM_getValue('giftingCount', '0'));
		var hash = document.body.innerHTML.split('hash=')[1].split('"')[0];
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/gift_give.php?target_id="+ GM_getValue('giftingUser', 'xxxx')+"&item_id="+attributes[GM_getValue('selectAttribute', 'nothing')][1]+"&item_type="+attributes[GM_getValue('selectAttribute', 'nothing')][2]+"&do_gift=1&hash="+hash ;
		GM_setValue('giftingCount',GM_getValue('giftingCount', 0)-1);
		return;
	}
	
	// pause feature... dismiss the rest
	if( (GM_getValue('paused')!=0))
		return;
	
	// autoheal
//r83:
	if(GM_getValue('autoHeal', '') == "checked" && health<GM_getValue('healthLevel', '')  && rage>GM_getValue('healthRage', '') ){
		log('Autoplayer autoHeal '+health);
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/index.php?popup_action=Heal";
		return;
	}

	// bank logic here
	if(GM_getValue('autoBank', '') == "checked" && blood>parseInt(GM_getValue('bankConfig', 100000))+10){
		log('Autoplayer autoBank ' + blood);
		document.getElementById(SCRIPT.appID+'_bank_popup').style.display = 'block';
		var sform = document.getElementById(SCRIPT.appID+'_bank_popup').getElementsByTagName('form')[1];
		document.getElementsByName("amount")[1].value = blood-GM_getValue('bankKeep', 50000);
		setTimeout(function(){sform.submit();},delay);
		return;
	}
}

function doAutoPlay (){
	// pause feature... dismiss the rest
	if((GM_getValue('paused', 0) != 0))
		return;

	log('Autoplayer started.');
 
	// buffs logic
	if(GM_getValue('autoBuff', '') == "checked" && Math.floor(new Date().getTime() / 1000) > GM_getValue('spin',0)){
		if (location.href.indexOf(SCRIPT.name+'/buffs') == -1)
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/buffs.php";
		return;
	}
	
	// lottery logic
	if (location.href.indexOf(SCRIPT.name+'/lottery') == -1 && GM_getValue('autoGamble', '') == "checked" && Math.floor(new Date().getTime() / 1000) > GM_getValue('LotteryDue',0)){
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/lottery.php";
		return;
	}



//BSF Edit:
// BSF0030 - Automate Special Events
//	if(eventActive && GM_getValue('autoEventMission', '') == "checked" && energy>=(eventMissions[GM_getValue('selectEventMissionA', 1)][1]+parseInt(GM_getValue('missionExpReserve', 0)))){

	if(eventActive && GM_getValue('autoEventMission', '') == "checked" && energy>=(eventMissions[GM_getValue('selectEventMissionA', 1)][1]+parseInt(GM_getValue('missionExpReserve', 0))) && ((eventHasResource && eventNumResources >= (eventMissions[GM_getValue('selectEventMissionA', 1)][5])) || (eventHasResource == false))){
		if (location.href.indexOf(SCRIPT.name+'/event') == -1)
		{
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/"+eventWaypoint;
		} else {
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/eventjobs.php?currentTier="+eventMissions[GM_getValue('selectEventMissionA', 1)][2];
		}
		return;
	}	



//BSF Edit:
// BSF0017 - Changed order of mission/fight back to normal (mission, then fight)

//edit 032910 (zysfryar) - Added configurable priority (mission vs. fight)
	if(GM_getValue('missionPriority','checked') == 'checked') {
		// automission logic here
//BSF Edit: (add Energy Reserve):
// BSF0001 - Added Exp Reserve
		if(GM_getValue('autoMission', '') == "checked" && energy>=(missions[GM_getValue('selectMission', 1)][1]+parseInt(GM_getValue('missionExpReserve', 0)))){
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php?currentTier="+missions[GM_getValue('selectMission', 1)][2];
			return;
		}	

		// autofight
		if(GM_getValue('autoFight', '') == "checked" && rage>GM_getValue('fightKeepRage', 0) &&health>19){
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/fight.php";
			return;
		}

	} else {
		if(GM_getValue('autoFight', '') == "checked" && rage>GM_getValue('fightKeepRage', 0) &&health>19){
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/fight.php";
			return;
		}
		if(GM_getValue('autoMission', '') == "checked" && energy>=(missions[GM_getValue('selectMission', 1)][1]+parseInt(GM_getValue('missionExpReserve', 0)))){
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php?currentTier="+missions[GM_getValue('selectMission', 1)][2];
			return;
		}
	} 	
	
	// minion cost
	if(GM_getValue('autoMinion', '') == "checked" && blood > GM_getValue('minionCost', 0)*10){
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/properties.php";
		return;
	}
	
	// auto gift
	if (location.href.indexOf(SCRIPT.name+'/gift') == -1 && GM_getValue('autoGifting', '') == "checked" && GM_getValue('giftingCount', 0)>0 ){
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/gift.php?user_id="+ GM_getValue('giftingUser', 'xxxx');
		return;
	}
	
	log('Autoplayer finished.');
	//document.location = 'http://apps.facebook.com/'+SCRIPT.name+ GM_getValue('refreshPage', "/index.php");
}

///////////////////////////////////////////////////////////////////////////////
//   begin of page code.                    Automatic play is kicked off by doAutoPlay().    //
///////////////////////////////////////////////////////////////////////////////

function LogEvents(){	

//BSF Edit:
// BSF0018 - Capture new fight results (Feb 2010)
// BSF0003 - Added Log entry to record username, ID, Level, Clan Size, Skill of ppl who are attacked
	try{
		var fightresultbox = document.getElementById(SCRIPT.appID+'_fight_result');
		if(fightresultbox.innerHTML.length==0)
			return;

		var userlink = fightresultbox.innerHTML.split('fighter fighter_right')[1].split('href="')[1].split('"')[0];
//		alert("userlink = "+ userlink);
		var username = fightresultbox.innerHTML.split('fighter fighter_right')[1].split('return true;">')[1].split('</a>')[0];
//		alert("username = "+ username);
		var user = '<a href="'+userlink+'">'+username+'</a>';
//BSF Edit:
// BSF0034 - Automatically add to avoid list vamps I have lost to 
		var userid = fightresultbox.innerHTML.split('fighter fighter_right')[1].split('user=')[1].split('"')[0];
//		alert("userid = "+ userid);

		if(fightresultbox.innerHTML.indexOf('You won the fight') != -1){
//			log("FIGHT "+fightresultbox.innerHTML);	
// BSF0024 - Added Log entry to record gained exp and gained/lost SR when I attack ppl
			var fightexpgained = fightresultbox.innerHTML.split('fight_center_stats')[1].split('You gained ')[1].split(' exp!')[0].toInt();
//			alert("fightexpgained = "+ fightexpgained);
			var srgain = fightresultbox.innerHTML.split('fighter fighter_left')[1].split('Rank:  ')[1].split(' = ')[0];
//			alert("srgain = "+ srgain);
//BSF Edit:
// BSF0035 - Grab and save my current number of clan and Skill Rating
			var mySkillRanking = fightresultbox.innerHTML.split('fighter fighter_left')[1].split('Rank:  ')[1].split(' = ')[1].split('<br>')[0];
//			alert("mySkillRanking = "+ mySkillRanking);
			GM_setValue('mySkillRanking',mySkillRanking);
			addToLog("fought "+ user + " <span style='color:#58FA58'>WON</span>   +"+fightexpgained+" exp  "+srgain+" SR");
		}

		if(fightresultbox.innerHTML.indexOf('You lost the fight.') != -1){
//			log("FIGHT "+fightresultbox.innerHTML);	
// BSF0024 - Added Log entry to record gained exp and gained/lost SR when I attack ppl
			var srgain = fightresultbox.innerHTML.split('fighter fighter_left')[1].split('Rank:  ')[1].split(' = ')[0];
//			alert("srgain = "+ srgain);
//BSF Edit:
// BSF0035 - Grab and save my current number of clan and Skill Rating
			var mySkillRanking = fightresultbox.innerHTML.split('fighter fighter_left')[1].split('Rank:  ')[1].split(' = ')[1].split('<br>')[0];
//			alert("mySkillRanking = "+ mySkillRanking);
			GM_setValue('mySkillRanking',mySkillRanking);
			addToLog("fought "+ user + " <span style='color:#FA5858'>LOST</span>  +0 exp  "+srgain+" SR");

//BSF Edit:
// BSF0034 - Automatically add to avoid list vamps I have lost to 
			if(GM_getValue('autoFightAvoidLost', '') == "checked") {
				// Add the ID to the list
				addSavedListItem('autoFightLossList',userid+',',GM_getValue('autoFightLossListSize',0));
				addToLog("AVOIDING: "+ userid);
			}

		}


	}
	catch(e){}

//BSF Edit:
// BSF0028 - Capture and log kills (Not working yet?)
// BSF0029 - Catching Pop-up messages (Kills, Blood Magic results)
//WORKING
	try{
		var messagepopup0box = document.getElementById(SCRIPT.appID+'_message_popup_0');
		if(messagepopup0box.innerHTML.length==0)
			return;

		if(messagepopup0box.innerHTML.indexOf('You just killed') != -1){
			log("KILL "+messagebox.innerHTML);	
			var killresult = messagebox.innerHTML.split('You just killed')[1].split('</p>')[0];
			addToLog("You just killed " + killresult);
		}
		else if(messagepopup0box.innerHTML.indexOf('The wheel halts suddenly') != -1){
			var bloodmagicresult = document.evaluate("//div[@class='buff_desc']",document,null,9,null).singleNodeValue.innerHTML;
			addToLog("BLOOD MAGIC RESULT: " + bloodmagicresult);
		}
		else if(messagepopup0box.innerHTML.indexOf('ve been promoted to') != -1){
			var levelup = document.evaluate("//div[@id='app25287267406_levBoard']",document,null,9,null).singleNodeValue.innerHTML;
			addToLog("LEVEL-UP: " + levelup);
		}
		else {
			addToLog("POP UP MESSAGE: "+messagepopup0box.innerHTML);
		}


	}
	catch(e){}

	if (document.body.innerHTML.indexOf('message_body') == -1)
		return;

	try{
	var boxes = document.getElementById(SCRIPT.appID+'_content').getElementsByTagName('span');
	if(boxes.length==0)
		return;
	log('Autoplayer autoLog');


	var messagebox = boxes[0];
//	addToLog("messagebox="+messagebox.innerHTML);
	if(boxes.length>=2){
		var messagebox1 = boxes[1];
//		addToLog("messagebox1="+messagebox1.innerHTML);
	}
	if(boxes.length>=3){
		var messagebox2 = boxes[2];
//		addToLog("messagebox2="+messagebox2.innerHTML);
	}
	if(boxes.length>=4){
		var messagebox3 = boxes[3];
//		addToLog("messagebox3="+messagebox3.innerHTML);
	}
	if(boxes.length>=5){
		var messagebox4 = boxes[4];
//		addToLog("messagebox4="+messagebox4.innerHTML);
	}
	
	//alert(messagebox.innerHTML);
	
	if(GM_getValue('autoBuff', '') == "checked"){
		// energy buff

// Blannie orig:
//		if(energy < GM_getValue('buffEnergy', 0) && messagebox.innerHTML.indexOf('free energy refill') != -1){
//BSF Edit: (add limit to only use Energy Buff if it will not level you)
// BSF0009 - Added Modifications to Auto use Energy Buff (Defunct - Energy boosts now used)
		if(energy < GM_getValue('buffEnergy', 0) && (messagebox.innerHTML.indexOf('free energy refill') != -1) && (EnergyBuffGain < ExpToNextLevel)){
// Blannie orig:
//			if (GM_getValue('autoLog', '') == "checked")
//				addToLog('You received a free energy refill');
//BSF Edit: (Include more info in log when using Energy Buff)
// BSF0009 - Added Modifications to Auto use Energy Buff (Defunct - Energy boosts now used)
			if (GM_getValue('autoLog', '') == "checked")
				addToLog("You used an energy buff. Energy = " + energy + '  Exp to next lvl = ' + ExpToNextLevel);
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php?judge_buff=energy";
			return;
		}	
		
		// autorage buff
		if(rage < GM_getValue('buffRage', 0) && messagebox.innerHTML.indexOf('free rage refill') != -1){
			if (GM_getValue('autoLog', '') == "checked")
				addToLog('You received a free rage refill');
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/fight.php?judge_buff=rage";
			return;
		}
	}
	
	if(messagebox.innerHTML.indexOf('To complete this mission you need') != -1){
		var itemMission2 = parseInt(messagebox.innerHTML.split('focus" value="')[1].split('"')[0]);
		if(GM_getValue('itemMission', 1)<0){
			//alert("focus="+ (itemMission2-1));
			GM_setValue('itemMission', itemMission2-1);
		}
		return;
	}
	
	if (GM_getValue('autoLog', '') != "checked")
		return;


	// skip this messagebox... for now
	if(messagebox.innerHTML.indexOf('Someone has invited you to join their Clan') != -1){
		if(GM_getValue('autoClan', '') == "checked")
		{
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/recruit.php";
			return;
			// do something here...
		}
		if(boxes[1].innerHTML.indexOf('New') != -1)
			messagebox = boxes[2];
		else
			messagebox = boxes[1];
	}
	
	if(messagebox.innerHTML.indexOf('You just bought') != -1){
		log("BUY "+messagebox.innerHTML);	
		var item = messagebox.innerHTML.split('You just bought')[1].split('for')[0];
		addToLog("You just bought " + item);
	}
	else if(messagebox.innerHTML.indexOf('You successfully dominated') != -1){
		var minion = messagebox.innerHTML.split('You successfully dominated ')[1];
		minion = minion.split('. <a href')[0];
		addToLog("You successfully dominated " + minion);
	}
	else if(messagebox.innerHTML.indexOf('Rare Ability') != -1){
		log("ABILITY "+messagebox.innerHTML);	
		var ability = boxes[1].innerHTML.split('return true;">')[1].split('</a>')[0];	
		addToLog("acquired Rare Ability " + ability);
	}
	else if(messagebox.innerHTML.indexOf('You withdrew') != -1){
		log("WITHDREW "+messagebox.innerHTML);	
		var deposit	= messagebox.innerHTML.split('blood.gif">')[1];
		addToLog("withrew " + deposit.toInt());
	}
	else if(messagebox.innerHTML.indexOf('deposited and stored safely') != -1){
		log("DEPOSIT "+messagebox.innerHTML);	
		var deposit	= messagebox.innerHTML.split('blood.gif">')[1];
		addToLog("deposit " + deposit.toInt());
	}
	else if(messagebox.innerHTML.indexOf('more health') != -1){
		var addHealth = messagebox.innerHTML.split('You get')[1].split('more health')[0];
		var cost = 0;
		if(messagebox.innerHTML.indexOf('blood.gif">') != -1)
			cost = messagebox.innerHTML.split('blood.gif">')[1];
		addToLog("health +"+ addHealth + " for " + cost.toInt());
	}
//BSF Edit:
// With New Fight Results screen (Feb 2010) the following section is defunct (See fix BSF0018 for new):
//	else if(messagebox.innerHTML.indexOf('You fought with') != -1){
//		log("FIGHT "+messagebox.innerHTML);	
//		var user = messagebox.innerHTML.split('href="')[1].split('"')[0];
//		user = '<a href="'+user+'">'+messagebox.innerHTML.split('return true;">')[1].split('</a>')[0]+'</a>';
//		var battleResult = document.evaluate("//span[@class='good']",document,null,9,null).singleNodeValue;
//		if(battleResult!=null && battleResult.innerHTML.indexOf('blood.gif">') != -1){
//			var cost = battleResult.innerHTML.split('blood.gif">')[1];	
////BSF Edit:
////Added gathering of SR delta:
////			var srgain = messagebox.innerHTML.split('Your skill ranking ')[1].split(' and')[0];
////			addToLog("fought "+ user + " WON " +cost.toInt() + " SR " +srgain);
//			addToLog("fought "+ user + " WON " +cost.toInt());
//		}
//		battleResult = document.evaluate("//span[@class='bad']",document,null,9,null).singleNodeValue;	
//		if(battleResult!=null && battleResult.innerHTML.indexOf('blood.gif">') != -1)
//		{
//			var cost = battleResult.innerHTML.split('blood.gif">')[1];	
////BSF Edit:
////Added gathering of SR delta:
////			var srgain = messagebox.innerHTML.split('Your skill ranking ')[1].split(' and')[0];
////			addToLog("fought "+ user + " LOST " +cost.toInt() + " SR " +srgain);
//			addToLog("fought "+ user + " LOST " +cost.toInt());
//		}
//
//
////BSF Edit:
//// BSF0013 - Commented out logging of found items from fights (defunct)
////		for (var i=1;i<boxes.length;i++)
////			if(boxes[i].innerHTML.indexOf('found')!= -1){
////				addToLog("found "+ boxes[i].innerHTML.split('found ')[1].split('while fighting ')[0]);
////				i=boxes.length;
////			}
//
//		if(GM_getValue('rFightList', '') == "checked")
//			CycleFightList();	
////BSF Edit: (2 lines)
//// BSF0006 - Added Window -> fight screen after fight result
//// Returns to fight window after a battle to speed up auto-fighting.
//		if((GM_getValue('autoFight', '') == "checked") && (GM_getValue('paused')==0))
//			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/fight.php";
//	}
	else if(messagebox.innerHTML.indexOf('too weak to fight') != -1){
		log("Too Weak "+messagebox.innerHTML);	
		if(GM_getValue('rFightList', '') == "checked")
			CycleFightList();	
	}
	else if(messagebox.innerHTML.indexOf('You cannot fight a member of your Clan') != -1){
		log("FIGHT CLAN "+messagebox.innerHTML);	
		if(GM_getValue('rFightList', '') == "checked"){
			var opponents = GM_getValue('fightList', '').split("\n");
			var opponentList="";
			for (var i=1;i<opponents.length;i++)
				opponentList = opponentList+ opponents[i]+"\n";
			GM_setValue('fightList', opponentList);
		}
	}
	else if(messagebox.innerHTML.indexOf('The Wheel and fate has smiled upon you') != -1){
		addToLog(messagebox.innerHTML.split('smiled upon you.<br>')[1].split('Repay the favor')[0]);
	}
	else if(messagebox.innerHTML.indexOf('The wheel halts suddenly') != -1){
		log("WHEEL "+messagebox.innerHTML);	
		addToLog(messagebox.innerHTML.split('<br>')[1]);
		setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+"/buffs.php'", delay);
		return;		
	}
	else if(messagebox.innerHTML.indexOf('hours and') != -1){
		log("CRYPT "+messagebox.innerHTML);	
	
	// index page shows crypt timer
		if (location.href.indexOf(SCRIPT.name+'/index') != -1){
			// do nothing for now
		}
		// buffs page shows buff timer
		if (location.href.indexOf(SCRIPT.name+'/buffs') != -1){
			var now = Math.floor(new Date().getTime() / 1000);
			time = 3600 * parseInt(messagebox.innerHTML.split('hours')[0]);
			time = time + 60 *(1+ parseInt(messagebox.innerHTML.split('hours and')[1]));
			GM_setValue('spin',now + time );
		}
	}
	else if(messagebox.innerHTML.indexOf('Fresh Meat') != -1){
		log("Fresh "+messagebox.innerHTML);	
	// do nothing 
	}
	else if(messagebox.innerHTML.indexOf('icon-blood.gif') != -1){
		//log("BLOOD "+messagebox.innerHTML);	
	// do nothing 
	}
	else if(messagebox.innerHTML.indexOf('received your gift') != -1){
		addToLog(messagebox.innerHTML.split('<br>')[1]);
	}
	else if(messagebox.innerHTML.indexOf('You cannot heal so fast') != -1){
		document.getElementById(SCRIPT.appID+'_health_refill_popup').style.display = 'block';
		setTimeout(function(){document.getElementById(SCRIPT.appID+'_health_refill_popup').getElementsByTagName('form')[0].submit();},delay);
		return;
	}
	else if(messagebox.innerHTML.indexOf('You do not have enough favor points to spin the wheel again') != -1){
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/buffs.php";
		return;
	}
	else if(messagebox.innerHTML.indexOf('You gave') != -1){
		addToLog('You gave ' + messagebox.innerHTML.split('You gave')[1].split('<')[0]);
	}
	else if(messagebox.innerHTML.indexOf('delete all news') != -1){
	//delete all news
	}
	else if(messagebox.innerHTML.indexOf('To complete this mission you need:') != -1){
		GM_setValue('autoMission',0);
		addToLog('Unable to continue auto-Mission, missing a required item.');
		setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+"/index.php'", delay);
	}
//BSF Edit:
// BSF0026 - Collect number of boosts from Stats page for display in Quick Links box:
	else if(messagebox.innerHTML.indexOf('You used a') != -1){
		addToLog(messagebox.innerHTML.split('<br>')[0]);
		if(messagebox.innerHTML.indexOf('You used a 50% Rage Boost') != -1){
			GM_setValue('numRageBoosts',GM_getValue('numRageBoosts', 0)-1);
		}
		if(messagebox.innerHTML.indexOf('You used a 50% Energy Boost') != -1){
			GM_setValue('numFiftyNrgBoosts',GM_getValue('numFiftyNrgBoosts', 0)-1);
		}
		if(messagebox.innerHTML.indexOf('You used a 50% Health Boost') != -1){
			GM_setValue('numHealthBoosts',GM_getValue('numHealthBoosts', 0)-1);
		}
		if(messagebox.innerHTML.indexOf('You used a 100% Energy Boost') != -1){
			GM_setValue('numHundredNrgBoosts',GM_getValue('numHundredNrgBoosts', 0)-1);
		}
	}

//BSF Edit:
// BSF0021 - Fixed logging of "cannot fight a member of your Clan" message
	for (var i=0;i<boxes.length;i++){
		if(boxes[i].innerHTML.indexOf('You cannot fight a member of your Clan')!= -1){
			addToLog("You cannot fight a member of your Clan");
		}
	}


//BSF Edit: (Logging receiving things):
// BSF0022 - Log receiving items in various ways
	for (var i=0;i<boxes.length;i++){
		if(boxes[i].innerHTML.indexOf('You have received')!= -1){
			addToLog("You have received "+ boxes[i].innerHTML.split('You have received ')[1].split('</td>')[0]);
			if(messagebox.innerHTML.indexOf('You have received 1 50% Rage Boost') != -1){
				GM_setValue('numRageBoosts',GM_getValue('numRageBoosts', 0)+1);
			}
			if(messagebox.innerHTML.indexOf('You have received 1 50% Energy Boost') != -1){
				GM_setValue('numFiftyNrgBoosts',GM_getValue('numFiftyNrgBoosts', 0)+1);
			}
			if(messagebox.innerHTML.indexOf('You have received 1 50% Health Boost') != -1){
				GM_setValue('numHealthBoosts',GM_getValue('numHealthBoosts', 0)+1);
			}
			if(messagebox.innerHTML.indexOf('You have received 1 100% Energy Boost') != -1){
				GM_setValue('numHundredNrgBoosts',GM_getValue('numHundredNrgBoosts', 0)+1);
			}
		}
		if(boxes[i].innerHTML.indexOf('You received')!= -1){
			addToLog("You have received "+ boxes[i].innerHTML.split('You received ')[1].split('</td>')[0]);
		}
	}



//BSF Edit: (Logging receiving gifted things):
// BSF0022 - Log receiving items in various ways
	// Receiving gifts...
	for (var i=0;i<boxes.length;i++){
		if(boxes[i].innerHTML.indexOf(' has sent you ')!= -1){
			addToLog(boxes[i].innerHTML.split('<td>')[2].split('</td>')[0]);
		}
	}




//BSF Edit:
// BSF0027 - Fixed logging of Blood Magic Spin results
	for (var i=0;i<boxes.length;i++){
		if(boxes[i].innerHTML.indexOf('Mandy has given you')!= -1){
			addToLog("Mandy has given you "+ boxes[i].innerHTML.split('Mandy has given you ')[1].split('<br>')[0]);
		}
	}




	var missioncompleted = document.evaluate("//div[@class='mission_success']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var missionmastery = document.evaluate("//div[@class='mission_masterybar']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (missioncompleted.snapshotLength > 0) {
		missionName = missioncompleted.snapshotItem(0).innerHTML.substring((missioncompleted.snapshotItem(0).innerHTML.indexOf('You successfully completed: ')+28),missioncompleted.snapshotItem(0).innerHTML.indexOf('!'));
		if (missionmastery.snapshotLength > 0) {
			masterLevel = missionmastery.snapshotItem(0).innerHTML.substring(missionmastery.snapshotItem(0).innerHTML.indexOf('Level'),missionmastery.snapshotItem(0).innerHTML.indexOf('%'))+'%';
			missionName = missionName + ' - ' + masterLevel;
		}
		addToLog('Mission Completed: '+missionName);
	}
	//else
		//alert(messagebox.innerHTML);
	
	}
	catch(e){}
}

function handlePages(){
	var menu = document.evaluate("//li[@class='us_tabs'] | //li[@class='selected_tab']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
 	var submenu = document.evaluate("//div[@class='subWrapLeft_active'] | //div[@class='subWrapLeft_inactive']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(menu==null || submenu==null ||submenu.snapshotLength == 0)
		return;
	for (var index = 0 ; index < menu.snapshotLength; index++)
		if( menu.snapshotItem(index).getAttribute('class') == "selected_tab")
			break;
	for (var subindex = 0 ; subindex < submenu.snapshotLength; subindex++)
		if( submenu.snapshotItem(subindex).getAttribute('class') == "subWrapLeft_active")
			break;

//BSF Edit:
// BSF0030 - Automate Special Events
	if (eventActive && location.href.indexOf(SCRIPT.name+'/event') != -1){
		//alert("submenu.snapshotItem(0).parentNode.getAttribute('title') = '"+submenu.snapshotItem(0).parentNode.getAttribute('title')+"'");
		//alert("menuItems[9][0][0] = '"+menuItems[9][0][0]+"'");
		if (submenu.snapshotItem(0).parentNode.getAttribute('title').indexOf(menuItems[9][0][0])!= -1){
			index = 9;
		} else {
			index = 8;
		}
	}

	if(index==0 && submenu.snapshotLength==2)
		index = 7;
	log("found selected tab " + menuItems[index][subindex][0]);
	
	// now we know on what page we are...  trigger a function accoringly
	if( menuItems[index][subindex][1]!=null){
		window.setTimeout(menuItems[index][subindex][1], 500);
		return true;
	}
	return false;
}

function DoBloodMagic(){
	if(GM_getValue('autoBuff', '') != "checked" || GM_getValue('paused')!=0 )
		return;
	var now = Math.floor(new Date().getTime() / 1000);
	if (now > GM_getValue('spin',0)){
		log('Autoplayer Blood Magic');
		var time = document.evaluate("//span[@class='treasure_timer']",document,null,9,null).singleNodeValue;
		if(time==null) // time run out... do the buff
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/buffs.php?doBuff=1";
		else{
			GM_setValue('spin',now + 3600 * parseInt(time.innerHTML.split('hours')[0])+  60 *(1+ parseInt(time.innerHTML.split('hours and')[1])));
			return;
		}
	}
}

function JudgePeople(){
	if(GM_getValue('autoJudge', '') != "checked" | GM_getValue('paused')!=0 | GM_getValue('JudgeCount', 0)<1)
		return;
	log('JudgePeople');
	
	var judgeList = document.evaluate("//div[@class='judge1']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var index = 0 ; index < judgeList.snapshotLength ; index++){
		document.getElementById(SCRIPT.appID+'_vote'+index +'_'+ (1+GM_getValue('JudgeRating', 1))).checked ="checked";
		document.getElementById(SCRIPT.appID+'_comment_textarea'+index).innerHTML = GM_getValue('JudgeComment', "no comment");
	}
	GM_setValue('JudgeCount',GM_getValue('JudgeCount', 0)-1);
	setTimeout(function(){document.getElementById(SCRIPT.appID+'_comment_submit').click();},delay);
}

function DoMissions(){
	if (location.href.indexOf(SCRIPT.name+"/jobs.php") != -1){
		UpdateJobsPage();
	}
//r83:

	var jobs = document.evaluate("//tr[@class='darkRow'] | //tr[@class='lightRow'] | //tr[@class=''] | //tr[@class='aJob']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//	var jobs = document.evaluate("//tr[@class='darkRow'] | //tr[@class='lightRow'] | //tr[@class='']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//	var jobs = document.evaluate("//tr[@class='darkRow'] | //tr[@class='lightRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	
	if(GM_getValue('autoMission', '') != "checked" || GM_getValue('paused')!=0)
		return;
	if (GM_getValue('itemMission')==undefined) GM_setValue('itemMission', -1);

	var missionOnPage = GM_getValue('itemMission', 0);
	//alert("missionOnPage="+missionOnPage);
// Blannie Orig:
//	if(missionOnPage>0 && energy>missions[missionOnPage][1])
//BSF Edit:
// BSF0001 - Added Exp Reserve
	if(missionOnPage>0 && energy>(missions[missionOnPage][1]+parseInt(GM_getValue('missionExpReserve', 0))))
	{
		log("energy "+energy +" itemMission "+missionOnPage+"="+missions[missionOnPage][0]);
		if (location.href.indexOf(SCRIPT.name+"/jobs.php?") == -1 && location.href.indexOf("currentTier="+missions[missionOnPage][2]) == -1){
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php?currentTier="+missions[missionOnPage][2];
			return;
		}
		log('Autoplayer autoMission '+missionOnPage+ " "+ energy);
		var sform =jobs.snapshotItem(missions[missionOnPage][3]).getElementsByTagName('a');
		sform = sform[sform.length-1];
		log('Executing mission '+missions[missionOnPage][3]+' on this tab.');
		setTimeout("document.location = '"+sform.href+"'", delay);
		GM_setValue('itemMission', -1);
		return;
	}
		
	var missionOnPage = GM_getValue('selectMission', 0);
	//alert("missionOnPage="+missionOnPage+"...missionExpReserve="+parseInt(GM_getValue('missionExpReserve', 0)));
// Blannie Orig:
//	if(energy<missions[missionOnPage][1])
//BSF Edit:
// BSF0001 - Added Exp Reserve
	if(energy<(missions[missionOnPage][1]+parseInt(GM_getValue('missionExpReserve', 0))))
		return;	
	log('selectMission '+missionOnPage+'=' +missions[missionOnPage][0]);
	if (location.href.indexOf(SCRIPT.name+"/jobs.php?") == -1 && location.href.indexOf("currentTier="+missions[missionOnPage][2]) == -1){
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php?currentTier="+missions[missionOnPage][2];
		return;
	}
	var sform =jobs.snapshotItem(missions[missionOnPage][3]).getElementsByTagName('a');
	sform = sform[sform.length-1];
	log('Executing mission '+missions[missionOnPage][3]+' on this tab.');
	
	if(GM_getValue('missionMastery', '') == "checked"){
		log('autoMission missionMastery');
	
		var masteryList = document.evaluate("//td[@class='job_desc']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		if(masteryList.snapshotItem(missions[missionOnPage][3]).innerHTML.indexOf('Mission Mastered') != -1){
					if( parseInt(missionOnPage)+1 <  missions.length)
						GM_setValue('selectMission', missionOnPage+1 % missions.length);
					else
						GM_setValue('missionMastery', '');
						
					window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php?currentTier="+missions[missionOnPage][2];
					return;
		}
	}
			setTimeout("document.location = '"+sform.href+"'", delay);
			return;
}


//BSF Edit:
// BSF0030 - Automate Special Events
function DoEventMissions(){
	if (location.href.indexOf(SCRIPT.name+"/"+eventJobsPage) != -1){
		UpdateJobsPage();
	}
	var jobs = document.evaluate("//tr[@class='darkRow'] | //tr[@class='lightRow'] | //tr[@class=''] | //tr[@class='aJob']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	if(GM_getValue('autoEventMission', '') != "checked" || GM_getValue('paused')!=0)
		return;
	if (GM_getValue('itemMission')==undefined) GM_setValue('itemMission', -1);

	// Check to see if Event Stage is completed, and if so, whether the user wants to reset the Event Stage:
	if(document.body.innerHTML.indexOf('Reset Mission Mastery') != -1) {
		//alert('Detected Event Stage Completed');
		if(GM_getValue('autoEventReset','') == 'checked') {
			log('Resetting Event Stage');
			addToLog('Resetting Event Stage');
			// Also start at the first mission in the stage:
			if(GM_getValue('eventMasterOne', '') == "checked") {
				for (var i = 0, iLength=eventMissions.length; i < iLength; ++i) {
					if(eventMissions[i][2] == GM_getValue('selectEventMissionO', '')) {
				    		GM_setValue('selectEventMissionA', i-1);
				    		break;
				    	}
				}
			}

			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/"+eventResetPage+GM_getValue('selectEventMissionO','');
		}
	}


	var missionOnPage = GM_getValue('selectEventMissionA', 0);
	//alert("missionOnPage="+missionOnPage+"...missionExpReserve="+parseInt(GM_getValue('missionExpReserve', 0)));
// Blannie Orig:
//	if(energy<missions[missionOnPage][1])
//BSF Edit:
// BSF0001 - Added Exp Reserve
	if(energy<(eventMissions[missionOnPage][1]+parseInt(GM_getValue('missionExpReserve', 0))))
		return;	
	log('selectEventMissionA '+missionOnPage+'=' +eventMissions[missionOnPage][0]);
	if (location.href.indexOf(SCRIPT.name+"/"+eventJobsPage+"?currentTier="+eventMissions[missionOnPage][2]) == -1){
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/"+eventJobsPage+"?currentTier="+eventMissions[missionOnPage][2];
		return;
	}
	var sform =jobs.snapshotItem(eventMissions[missionOnPage][3]).getElementsByTagName('a');
	sform = sform[sform.length-1];
	log('Executing Event mission '+eventMissions[missionOnPage][3]+' on this tab.');
	
//	if(GM_getValue('missionMastery', '') == "checked"){
		log('Event autoMission missionMastery (assumed)');
	
		var masteryList = document.evaluate("//td[@class='job_desc']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		if(masteryList.snapshotItem(eventMissions[missionOnPage][3]).innerHTML.indexOf('Mission Mastered') != -1){
			if( GM_getValue('eventMasterAll','') == 'checked'){
				if( parseInt(missionOnPage)+1 <  eventMissions.length)
					GM_setValue('selectEventMissionA', missionOnPage+1 % eventMissions.length);
				else
					GM_setValue('autoEventMission', '');

				window.location = "http://apps.facebook.com/"+SCRIPT.name+"/"+eventJobsPage+"?currentTier="+eventMissions[missionOnPage][2];
				return;
			} else {
				if( eventMissions[parseInt(missionOnPage)+1][2] == GM_getValue('selectEventMissionO','')) {
					GM_setValue('selectEventMissionA', missionOnPage+1 % eventMissions.length);
				} else {
					for (var i = 0, iLength=eventMissions.length; i < iLength; ++i) {
						if(eventMissions[i][2] == GM_getValue('selectEventMissionO', '')) {
							GM_setValue('selectEventMissionA', i);
							break;
						}
					}
				}
			}
		}
//	}
	setTimeout("document.location = '"+sform.href+"'", delay);
	return;
}


function DoFights(){


// blannie orig:
//      if(GM_getValue('autoFight', '') != "checked" || rage < GM_getValue('fightKeepRage', 0)|| GM_getValue('paused')!=0){
//BSF Edit: (2 lines) (Will now use up all Rage if doing so will likely reach next level):
// BSF0011 - Added code to use up all Rage if doing so will likely reach next level (Doesn't work?)
// BSF0015 - Added User changable parameter to include fightExpGain (the average Exp gained per rage) - used to calculate when to use Rage Buff
		if(GM_getValue('autoFight', '') != "checked" || rage <= GM_getValue('fightKeepRage', 0) || rage*GM_getValue('fightExpGain', '3')>ExpToNextLevel || (GM_getValue('paused')!=0))
		{
			log('Auto-Fight: ' + GM_getValue('autoFight', ''));	
			log('Fight Keep Rage: ' + GM_getValue('fightKeepRage', 0) + ' of ' + rage);
//BSF Edit: (1 line) (Log the comparison of Exp gained by all rage vs current Exp needed):
// BSF0015 - Added User changable parameter to include fightExpGain (the average Exp gained per rage) - used to calculate when to use Rage Buff
			log('rage*fightExpGain: ' + rage*GM_getValue('fightExpGain', '3') + ' ExpToNextLevel ' + ExpToNextLevel);
			log('Paused: ' + GM_getValue('paused'));
			return;
		}

		log('Autoplayer autoFight ' + rage);	
		if(health>19){
		// log('Autoplayer Health: ' + health);	
		if(GM_getValue('fightRandom', '') == "checked"){
    		// log('Fighting mode: Random');	


// blannie orig:
//			var opponents  = document.evaluate("//input[@name='opponent_id']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
//			//log('Opponents count: ' + opponents.snapshotLength);
//			
//			for (fightIndex=0; fightIndex<opponents.snapshotLength; fightIndex++) {
//        var opponentNode = opponents.snapshotItem(fightIndex);
//        //log('Opponent ID: ' + opponentNode.value);
//        
//        if (opponentNode.value != "x") {
//          try {
//            var fightNode = opponents.snapshotItem(fightIndex).parentNode.parentNode.parentNode; 
//            //log('fightNode: ' + fightNode.innerHTML);
//            var opponentLevel =  parseInt(fightNode.innerHTML.split('Level ')[1]);
//            var opponentRating = fightNode.innerHTML.split('groupsize">')[1];
//            opponentRating = parseInt(opponentRating.replace(",", ""));
//            var opponentClan = parseInt(fightNode.innerHTML.split('groupsize">')[2]);
//            if (opponentLevel <= GM_getValue('fightLevel', '100') 
//              && opponentClan <= GM_getValue('fightClanSize', '502') 
//              && opponentRating >= GM_getValue('fightClanRating', '500')	
//              && opponentRating <= GM_getValue('fightClanMaxRating', '5000')) {              
//              // log('Opponent Level : ' +  opponentLevel);	
//              // log('Opponent Rating: ' +  opponentRating);
//              // log('Opponent Clan  : ' +  opponentClan);
//              // log('Opponent ID    : #' +  opponentNode.value);
//               setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/fight.php?opponent_id="+opponentNode.value+"&action=attack"+"'", 500);
//              return;
//            }
//          }
//          catch (e){}
//        }
//      }
			setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+"/fight.php"+"'", delay);

//BSF Edit:
// Adds fight looping code from Mafia Wars script to gather all valid targets on fight screen.  Also adds additional parameters.
// BSF0005 - Added Fight Opponent Finder Loop Code from Mafia Wars script
			if (location.href.indexOf(SCRIPT.name+'/fight') != -1)
			{
				var opponents  = document.evaluate("//input[@name='opponent_id']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);//.singleNodeValue;
				// (Loop code borrowed from StevenD's Mafia Wars script - Thanks Liquidor for the loop code)

				var validOpponents = [];
				// In the loop, start tmp at 1 instead of 0, because user 0 in Vampire Wars is a Fresh Meat person, and the script doesn't like that (errors out)
				for (tmp = 1; tmp < opponents.snapshotLength; tmp++)
				{
					var fightNode =opponents.snapshotItem(tmp).parentNode.parentNode.parentNode; 
					var opponentLevel =  parseInt(fightNode.innerHTML.split('Level ')[1]);
					var opponentRating = fightNode.innerHTML.split('groupsize">')[1].split('</td>')[0];
					opponentRating = opponentRating.replace(/,/g, '');
					opponentRating = parseInt(opponentRating);
					var opponentId = opponents.snapshotItem(tmp).value
					var opponentClan = parseInt(fightNode.innerHTML.split('groupsize">')[2]);
					var username = fightNode.innerHTML.split('true;">')[1].split('</a>')[0];
//					var username = fightNode.innerHTML.split('true; });">')[1].split('</a>')[0];
// blannie orig:
//					if (opponentLevel<= GM_getValue('fightMaxLevel', '100') && opponentLevel>=GM_getValue('fightMinLevel', '0') && opponentClan<=GM_getValue('fightMaxClan', '502') && opponentClan>=GM_getValue('fightMinClan', '0') && opponentSkill<=GM_getValue('fightMaxSkill', '8000') && opponentSkill>=GM_getValue('fightMinSkill', '0'))
// BSF0004 - Added Parameters to Auto-Fight: Max Skill, Min Level, Min Clan
					if(opponentLevel<= GM_getValue('fightLevel', '100') && opponentLevel>=GM_getValue('fightMinLevel', '0') && opponentClan<=GM_getValue('fightClanSize', '502') && opponentClan>=GM_getValue('fightMinClanSize', '0') && opponentRating<=GM_getValue('fightClanMaxRating', '8000') && opponentRating>=GM_getValue('fightClanRating', '0'))
					{
						if (opponentId)
						{
							var idString = opponentId.toString();
							if (blacklist.indexOf(idString) == -1)
							{
//BSF Edit:
// BSF0032 - Limit number of repeated attacks on same vamp in fight
								if(GM_getValue('autoFightAttackLimit', '') == "checked") {
									// See if I've attacked this target too many times
									var re = "/" + opponentId + "/g";
									re=eval(re);
									var autoFightAttackLimitListStr = GM_getValue('autoFightAttackLimitList', '').replace(/\n/g, ' ');
									var matches = autoFightAttackLimitListStr.match(re);
									if(matches!=null) {
										var previousAttackNum = matches.length;
									} else {
										var previousAttackNum = 0;
									}
								} else {
									var previousAttackNum = 0;
								}
								if(previousAttackNum<=GM_getValue('autoFightAttackLimitMax',0)){
									validOpponents.push(tmp);
								}
					        	}
						}
					}
				}
				if(validOpponents.length > 0)
				{
					var fightIndex = validOpponents[Math.floor(Math.random()*validOpponents.length)];
					var fightNode =opponents.snapshotItem(fightIndex).parentNode.parentNode.parentNode; 
					var opponentLevel =  parseInt(fightNode.innerHTML.split('Level ')[1]);
					var opponentRating = fightNode.innerHTML.split('groupsize">')[1].split('</td>')[0];
					opponentRating = opponentRating.replace(/,/g, '');
					opponentRating = parseInt(opponentRating);
					var opponentClan = parseInt(fightNode.innerHTML.split('groupsize">')[2]);
					var username = fightNode.innerHTML.split('true;">')[1].split('</a>')[0];
//					var username = fightNode.innerHTML.split('true; });">')[1].split('</a>')[0];
// BSF0003 - Added Log entry to record username, ID, Level, Clan Size, Skill of ppl who are attacked
					addToLog("Attacking '" + username + "' ID: " + opponents.snapshotItem(fightIndex).value + "   Level: " + opponentLevel + "   Skill: " + opponentRating + "   Clan: " + opponentClan);


//BSF Edit:
// BSF0032 - Limit number of repeated attacks on same vamp in fight
					if(GM_getValue('autoFightAttackLimit', '') == "checked") {
						// Add the ID to the list
						addSavedListItemFIFOUnlimited('autoFightAttackLimitList',opponents.snapshotItem(fightIndex).value,GM_getValue('autoFightAttackLimitListSize'));
					}

					setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/fight.php?opponent_id="+opponents.snapshotItem(fightIndex).value+"&action=attack"+"'", delay);
				}
				else
					setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+"/fight.php"+"'", delay);
			}
//BSF Edit: END mod BSF0005


		}


//BSF Edit: (must add brackets due to additional line
// Add log to point out fighting by list
		if(GM_getValue('rFightList', '') == "checked")
		{
			log('Fighting mode: List');	
                        setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/fight.php?opponent_id="+parseInt(GM_getValue('fightList', ''))+"&action=attack"+"'", delay);
                }

	}
}

function UpdateStats(){

//BSF Edit:
// BSF0026 - Collect number of boosts from Stats page for display in Quick Links box:
	var BoostsList = document.getElementById(SCRIPT.appID+'_boosts_tab').innerHTML;
	var numRageBoosts = BoostsList.split('50% Rage Boost')[1].split('"amount">× ')[1];
	numRageBoosts = parseInt(numRageBoosts);
	GM_setValue('numRageBoosts', numRageBoosts);

	var numFiftyNrgBoosts = BoostsList.split('50% Energy Boost')[1].split('"amount">× ')[1];
	numFiftyNrgBoosts = parseInt(numFiftyNrgBoosts);
	GM_setValue('numFiftyNrgBoosts', numFiftyNrgBoosts);

	var numHealthBoosts = BoostsList.split('50% Health Boost')[1].split('"amount">× ')[1];
	numHealthBoosts = parseInt(numHealthBoosts);
	GM_setValue('numHealthBoosts', numHealthBoosts);

	var numHundredNrgBoosts = BoostsList.split('100% Energy Boost')[1].split('"amount">× ')[1];
	numHundredNrgBoosts = parseInt(numHundredNrgBoosts);
	GM_setValue('numHundredNrgBoosts', numHundredNrgBoosts);

//BSF Edit:
// BSF0035 - Grab and save my current number of clan and Skill Rating
	// While we're here on the Stats page we might as well grab the Skill Ranking and store it.
	var mySkillRanking = document.getElementById(SCRIPT.appID+'_profile_stats').getElementsByTagName('td')[1].innerHTML.split(',').join('').toInt();
	//alert('mySkillRanking='+mySkillRanking);
	GM_setValue('mySkillRanking',mySkillRanking);



	if(GM_getValue('autoStats', '') != "checked" ||  (GM_getValue('paused')!=0)) //level==GM_getValue('currentlevel', 1) ||
		return;
	
	var skillpoints = document.body.innerHTML.split('You have <span class="good">')[1];
	if(skillpoints==null)
		return;

	skillpoints = parseInt(skillpoints);
	log('Autoplayer UpdateStats '+skillpoints);

	var attributes = document.evaluate("//table[@class='main']",document,null,9,null).singleNodeValue;

	var strength = parseInt(attributes.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerHTML);
	if(GM_getValue('attackStat', 0)>strength && skillpoints>0){
		setTimeout("document.location = '"+attributes.getElementsByTagName('tr')[1].getElementsByTagName('a')[0].href+"'", delay);
		return;
	}
	else if(GM_getValue('attackStat', 0)<strength)
		GM_setValue('attackStat', strength);

	var defence = parseInt(attributes.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerHTML);
	if(GM_getValue('defenceStat', 0)>defence && skillpoints>0)		{
		setTimeout("document.location = '"+attributes.getElementsByTagName('tr')[2].getElementsByTagName('a')[0].href+"'", delay);
		return;
	}
	else if(GM_getValue('defenceStat', 0)<defence)
		GM_setValue('defenceStat', defence);

	var energystat = parseInt(attributes.getElementsByTagName('tr')[3].getElementsByTagName('td')[1].innerHTML);
	if(GM_getValue('energyStat', 0)>energystat && skillpoints>0){
		setTimeout("document.location = '"+attributes.getElementsByTagName('tr')[3].getElementsByTagName('a')[0].href+"'", delay);
		return;
	}
	else if(GM_getValue('energyStat', 0)<energystat)
		GM_setValue('energyStat', energystat);

	var healthstat = parseInt(attributes.getElementsByTagName('tr')[4].getElementsByTagName('td')[1].innerHTML);
	if(GM_getValue('healthStat', 0)>healthstat && skillpoints>0){
		setTimeout("document.location = '"+attributes.getElementsByTagName('tr')[4].getElementsByTagName('a')[0].href+"'", delay);
		return;
	}
	else if(GM_getValue('healthStat', 0)<healthstat)
		GM_setValue('healthStat', healthstat);

	var ragestat = parseInt(attributes.getElementsByTagName('tr')[5].getElementsByTagName('td')[1].innerHTML);
	if(GM_getValue('rageStat', 0)>ragestat && skillpoints>1){
		setTimeout("document.location = '"+attributes.getElementsByTagName('tr')[5].getElementsByTagName('a')[0].href+"'", delay);
		return;
	}
	else if(GM_getValue('rageStat', 0)<ragestat)
		GM_setValue('rageStat', ragestat);
		
	GM_setValue('currentlevel', level);
}

function UpdateAbilityPage(){
	if(GM_getValue('autoAbility', '') != "checked" || GM_getValue('paused')!=0 )
		return;
	log('UpdateAbilityPage');

	for (var index = 1 ; index < 18; index++){
		var ability = document.evaluate("//div[@id='app25287267406_improve_ability_"+index+"']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if(ability.snapshotLength==0)
			continue;
		var forms = ability.snapshotItem(0).getElementsByTagName('form');		
		
		if(forms.length==2){
			setTimeout(function(){forms[0].submit();},delay);
			return;
		}
	}
}

function DoAkemsGamble(){
	//autoGamble logic
	if((GM_getValue('autoGamble', '') != "checked") || (GM_getValue('paused')!=0))
		return;
	log('Autoplayer autoGamble');
		
	if(document.body.innerHTML.indexOf("Or come back in")!=-1){
		LotteryDue =  parseInt(document.body.innerHTML.split('Or come back in ')[1]);
		GM_setValue('busy',0);
		var now = Math.floor(new Date().getTime() / 1000);
		//time = time + 60 *(1+ parseInt(messagebox.innerHTML.split('hours and')[1]));
		GM_setValue('LotteryDue',now + 3600 * LotteryDue );
		document.location = 'http://apps.facebook.com/'+SCRIPT.name+ GM_getValue('refreshPage', "/index.php");
	}
	else{//Free 24hr gamble
		if (GM_getValue('rBoxLeft')=='checked') BoxToOpen=1;
		else if (GM_getValue('rBoxMiddle')=='checked') BoxToOpen=2;
		else 	BoxToOpen=3;
		if(GM_getValue('busy', 0) != 1){
			document.location = 'http://apps.facebook.com/'+SCRIPT.name+'/lottery.php?viewState=openChest&chest='+BoxToOpen+'&useFP=1';
			addToLog("Free gamble, opening Chest no. "+BoxToOpen+".");
		}
		GM_setValue('busy',1);
		
	
//BSF Edit:
// BSF0023 - Fixed logging the spoils from Akem's Gamble:
		var akemsResult = document.evaluate("//td[@class='lotto_flavor']",document,null,9,null).singleNodeValue;
		if(akemsResult!=null && akemsResult.innerHTML.indexOf('The chest creaks open at your touch') != -1){
			var akemsItemWon = akemsResult.innerHTML.split('Akem Manah smiles. ')[1].split('<br>')[0];	
			var akemsItemAtt = akemsResult.innerHTML.split('icon-attack.gif"> ')[1].split(' Attack<br>')[0];	
			var akemsItemDef = akemsResult.innerHTML.split('icon-defense.gif"> ')[1].split(' Defense<br>')[0];	
			addToLog("Free Gamble Result: " +akemsItemWon+" ("+akemsItemAtt+"/"+akemsItemDef+")");
		}
	}
}

function DoClanAccepts(){
//BSF Edit:
// BSF0035 - Grab and save my current number of clan and Skill Rating
	// While we're here on the Clan page we might as well grab the clan size and store it.
	clan =  parseInt(document.body.innerHTML.split('My Clan (')[1]);
	GM_setValue('myClan',clan);

	if(GM_getValue('autoClan', '') != "checked" || GM_getValue('paused')!=0 )
		return;
	var id = parseInt(document.body.innerHTML.split('img uid="')[1]);
	if (isNaN(id)) 
		window.location = "http://apps.facebook.com/"+SCRIPT.name+ GM_getValue('refreshPage', "/index.php");
	else{
		log('DoClanAccepts id='+id);
		addToLog("accepting invitation of "+ id );
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/recruit.php?action=accept&user_id="+ id;
	}
}

// Auto-purchase minions - AJAX (by Zorkfour)
function UpdateMinionPage(){
	log('UpdateMinionPage');
	var minions = document.evaluate("//tr[@class='darkRow'] | //tr[@class='lightRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var minReturn = 9999999;

	// Iterate minions to determine best return on investment
	for (var index = 0 ; index < minions.snapshotLength; index++){
		var hasForm = minions.snapshotItem(index).getElementsByTagName('td')[3].getElementsByTagName('form');
		// Ensure minion is purchasable
		if(hasForm.length>0){
			var minionIncome = parseInt(minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML.split('blood.gif">')[1].split(',').join(''),10);
			var minionCost = parseInt(minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('span')[0].innerHTML.split('blood.gif">')[1].split(',').join(''),10);
			
			if (minionCost / minionIncome < minReturn)
				minReturn = minionCost / minionIncome;
		}
	}
	
	// Iterate minions to display cost per blood and purchase if able
	for (var index = minions.snapshotLength-1; index >=0 ; index--)
	{
		var hasForm = minions.snapshotItem(index).getElementsByTagName('td')[3].getElementsByTagName('form');
		// Ensure minion is purchasable
		if(hasForm.length>0){
			var minionIncome = parseInt(minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML.split('blood.gif">')[1].split(',').join(''),10);
			var minionCost = parseInt(minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('span')[0].innerHTML.split('blood.gif">')[1].split(',').join(''),10);
			var divSpot = minions.snapshotItem(index).getElementsByTagName('td')[1];
			var divbox = document.createElement('div');
			if (minionCost / minionIncome == minReturn){
				GM_setValue('minionCost', minionCost);
				divbox.innerHTML = 'Cost per blood: <strong class="good"><img src="http://facebook.vampires.static.zynga.com/graphics/icon-blood.gif"/>' + (minionCost / minionIncome).toFixed(2) + '</strong>';
				// Auto-purchase minion
				if(GM_getValue('autoMinion', '') == "checked" && blood > minionCost*10 && (GM_getValue('paused')==0)){
					var minionForm = minions.snapshotItem(index).getElementsByTagName('td')[3].getElementsByTagName('form')[0];
					minionForm.getElementsByTagName('select')[0].value =10;
					setTimeout(function(){minionForm.submit();},delay);
					return;
				}
			}
			else
				divbox.innerHTML = 'Cost per blood: <strong class="money"><img src="http://facebook.vampires.static.zynga.com/graphics/icon-blood.gif"/>' + (minionCost / minionIncome).toFixed(2) + '</strong>';
			divSpot.appendChild(divbox);
		}
	}	
}

// Auto-purchase minions - no AJAX  (Zorkfour)
if (location.href.indexOf(SCRIPT.name+'/properties') != -1){
	if(blood==undefined){
		RefreshGlobalStats();
	}
	UpdateMinionPage();
}



//BSF Edit:
// BSF0016 - Display Job Exp Rate Gain on Missions Page
function UpdateJobsPage(){
	log('UpdateJobsPage');
	var jobs = document.evaluate("//tr[@class='darkRow'] | //tr[@class='lightRow'] | //tr[@class=''] | //tr[@class='aJob']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//	var jobs = document.evaluate("//tr[@class='darkRow'] | //tr[@class='lightRow'] | //tr[@class='']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//	var jobs = document.evaluate("//tr[@class='darkRow'] | //tr[@class='lightRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var maxReturn = 0;

	// Iterate jobs to determine best return on investment
	for (var index = 0 ; index < jobs.snapshotLength; index++){
		var jobIncome = parseInt(jobs.snapshotItem(index).getElementsByTagName('td')[2].title.split(' Energy').join(''),10);
		var jobCost = parseInt(jobs.snapshotItem(index).getElementsByTagName('td')[1].innerHTML.split('Exp:&nbsp;+')[1].split('	').join(''),10);

		if (jobCost / jobIncome > maxReturn)
			maxReturn = jobCost / jobIncome;
	}
	
	// Iterate jobs to display Exp gained per Energy spent
	for (var index = jobs.snapshotLength-1; index >=0 ; index--)
	{
		var jobIncome = parseInt(jobs.snapshotItem(index).getElementsByTagName('td')[2].title.split(' Energy').join(''),10);
		var jobCost = parseInt(jobs.snapshotItem(index).getElementsByTagName('td')[1].innerHTML.split('Exp:&nbsp;+')[1].split('	').join(''),10);
		if (jobCost / jobIncome == maxReturn){
			GM_setValue('jobCost', jobCost);
			jobGainText = '<span style="font-size: 10px;">&nbsp;&nbsp;(Pays <strong class="good"><img src="http://facebook.vampires.static.zynga.com/graphics/icon-energy.gif"/>' + (jobCost / jobIncome).toFixed(2) + 'x</strong>)</span>';
		}
		else
			jobGainText = '<span style="font-size: 10px;">&nbsp;&nbsp;(Pays <strong class="money" font-size: 11px><img src="http://facebook.vampires.static.zynga.com/graphics/icon-energy.gif"/>' + (jobCost / jobIncome).toFixed(2) + 'x</strong>)</span>';
		if (jobs.snapshotItem(index).getElementsByTagName('td')[1].innerHTML.indexOf('Rumored ') != -1)
			jobs.snapshotItem(index).getElementsByTagName('td')[1].innerHTML = jobs.snapshotItem(index).getElementsByTagName('td')[1].innerHTML.replace('	<br',jobGainText + '	<br');
		else
			jobs.snapshotItem(index).getElementsByTagName('td')[1].innerHTML = jobs.snapshotItem(index).getElementsByTagName('td')[1].innerHTML + jobGainText;
	}	
}

//BSF Edit: (I can't tell if I need this portion - my Jobs modifications aren't always being added, especially if you manually switch to Jobs page - have to figure out how to do that)
// Modifications to the Missions page
//if (location.href.indexOf(SCRIPT.name+'/jobs') != -1){
//	UpdateJobsPage();
//}


function UpdatePlayerPage(){
	log('UpdatePlayerPage');
	var user = document.evaluate("//div[@class='zy_popup_box_bg']",document,null,9,null).singleNodeValue;
	var newImg = document.createElement("img");
	newImg.setAttribute("src", giftbox);
	newImg.addEventListener('click',giftPlayer(location.href.split('user=')[1]), false);
	user.parentNode.insertBefore(newImg,user);
}

function UpdateGroupWall(){
	log('UpdateGroupWall');
	var users = document.evaluate("//td[@class='collapseCell']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var index = 0 ; index < users.snapshotLength ; index++)
	{
		var img = users.snapshotItem(index).getElementsByTagName('img')[0];
		if(img!=null)
			img.addEventListener('click',statsPlayer(img.getAttribute('uid')), false);
	}
}

///////////////////////////////////////////////////////////////////////////////
//   End of page code.                    Automatic play is kicked off by doAutoPlay().    //
///////////////////////////////////////////////////////////////////////////////

function giftPlayer(mobid){
	return function ()	{ window.location = "http://apps.facebook.com/"+SCRIPT.name+"/gift.php?user_id="+mobid;	}
}

function statsPlayer(mobid){
	return function ()	{ window.location = "http://apps.facebook.com/"+SCRIPT.name+"/comments.php?user="+mobid;}
}

function toggleSettings(){
	var settingsBox = document.getElementById('settingsBox');
	if(!settingsBox)
		settingsBox = createMenu();

	if(settingsOpen == false){
        settingsOpen = true;
        settingsButton.innerHTML = "close settings";
        settingsBox.style.visibility = "visible";
		coffinMenuSelect();
	}
    else{
        settingsOpen = false;
        settingsButton.innerHTML = "open settings";
        settingsBox.style.visibility = "hidden";
		document.getElementById('coffinTab').style.visibility = "hidden";
		document.getElementById('missionTab').style.visibility = "hidden";
		document.getElementById('combatTab').style.visibility = "hidden";
		document.getElementById('bazaarTab').style.visibility = "hidden";
//BSF Edit:
// BSF0030 - Automate Special Events
		if(eventActive)
			document.getElementById('eventTab').style.visibility = "hidden";
    }
}

function createMenu() {
	var settingsBox = makeElement('div', document.body,{'id':'settingsBox'});
		settingsBox.setAttribute("style", "position: absolute; left: "+bannerLeft+"px; top: "+(bannerTop+28)+"px;  width: 748px; height: 365px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 100;");

	var versionBox = makeElement('div', settingsBox,{'style':'position: absolute; left:40px; color: #FFFFFF;'});
        versionBox.innerHTML  = "<img src='http://www.zynga.com/images/games/gameSmall_vampires.jpg'/><strong> "+SCRIPT.version+" (game r." +gameVersion+") </strong>";

	var coffinMenu = makeElement('div', settingsBox,{'style':'position: absolute; left:240px; color: #FFFFFF;', 'id':'coffinMenu'});
        coffinMenu.innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/coffin_se.png'/>";
		coffinMenu.addEventListener('click', coffinMenuSelect, false);

	var missionMenu = makeElement('div', settingsBox,{'style':'position: absolute; left:320px; color: #FFFFFF;', 'id':'missionMenu'});
        missionMenu.innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/missions_us.png'/>";
		missionMenu.addEventListener('click', missionMenuSelect, false);

	var combatMenu = makeElement('div', settingsBox,{'style':'position: absolute; left:400px; color: #FFFFFF;', 'id':'combatMenu'});
        combatMenu.innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/combat_us.png'/>";
		combatMenu.addEventListener('click', combatMenuSelect, false);

	var bazaarMenu = makeElement('div', settingsBox,{'style':'position: absolute; left:480px; color: #FFFFFF;', 'id':'bazaarMenu'});
        bazaarMenu.innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/bazaar_us.png'/>";
		bazaarMenu.addEventListener('click', bazaarMenuSelect, false);

//BSF Edit:
// BSF0030 - Automate Special Events
	if(eventActive) {
		var eventMenu = makeElement('div', settingsBox,{'style':'position: absolute; left:560px; color: #FFFFFF;', 'id':'eventMenu'});
		eventMenu.innerHTML  = "<div style='color:#FFE6E6;background-color:#330000;text-align:center'><table border='0'><tr><td>"+eventImageHTML+"</td><td>Event:<br>"+eventName+"</td></tr></table></div>";
			eventMenu.addEventListener('click', eventMenuSelect, false);
	}

/* Coffin tab*/		
	var coffinTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 365px; color: #FFFFFF; ', 'id':'coffinTab'});
		
	var autoClick = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 0px; color: #FFFFFF;'});
        autoClick.innerHTML  = "<input type='checkbox' id='autoClick' value='checked' "+GM_getValue('autoClick', '')+">enable auto-refresh";

	var refreshTimes = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 25px; color: #FFFFFF;'});
		refreshTimes.innerHTML = "refresh every <input type='text' style='border: none; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('r1', '30') + "' id='r1' size='2'>";
		refreshTimes.innerHTML += " to <input type='text' style='border: none; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('r2', '110') + "'id='r2' size='2'> seconds";

	var refreshPage = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 50px; color: #FFFFFF;'});
		refreshPage.innerHTML = "url: <input type='text' style='border: none; width: 270px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('refreshPage', '/index.php') + "' id='refreshPage' size='200'>";

    var autoLog = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 75px; color: #FFFFFF;'});
        autoLog.innerHTML  = "<input type='checkbox' id='autoLog' value='checked' "+GM_getValue('autoLog', 'checked')+">enable auto logging";

	var autoClan = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 100px; color: #FFFFFF;'});
        autoClan.innerHTML  = "<input type='checkbox' id='autoClan' value='checked' "+GM_getValue('autoClan', 'checked')+">auto accept clan invites";


// edit:032910 (zysfryar) added mission priority checkbox 
	var missionPrio = makeElement('div', coffinTab,{'style':'position: absolute; left:40px; top: 125px; color: #FFFFFF;'});
	missionPrio.innerHTML = "<input type='checkbox' id='missionPriority' value='checked' "+GM_getValue('missionPriority', 'checked')+">Prioritize Missions over Combat";



 		
		//(GM_getValue('LotteryDue',0) - Math.floor(new Date().getTime() / 1000)) + " seconds</strong>";
		
    // var autoTreasure = makeElement('div', coffinTab,{'style':'position: absolute; left:300px;  top: 150px; color: #FFFFFF;'});
        // autoTreasure.innerHTML  = "<input type='checkbox' id='autoTreasure' value='checked' "+GM_getValue('autoTreasure', 'checked')+">enable opening Treasure Chest";
		
    var autoBank = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 175px; color: #FFFFFF;'});
        autoBank.innerHTML  = "<input type='checkbox' id='autoBank' value='checked' "+GM_getValue('autoBank', '')+">enable auto-Bank";

    var bankConfig = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 200px; color: #FFFFFF;'});
		bankConfig.innerHTML = "above: <input type='text' style='border: none; width: 100px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('bankConfig', '100000') + "' id='bankConfig' size='8'>"+" keep: <input type='text' style='border: none; width: 100px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('bankKeep', '50000') + "' id='bankKeep' size='8'>";

   var autoJudge = makeElement('div', coffinTab,{'style':'position: absolute; left:300px;  top: 0px; color: #FFFFFF;'});
        autoJudge.innerHTML  = "<input type='checkbox' id='autoJudge' value='checked' "+GM_getValue('autoJudge', '')+">auto-Judge";
	autoJudge.innerHTML += "#: <input type='text' style='border: none; width: 50px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('JudgeCount', 0) + "' id='JudgeCount' size='20'>";

	var JudgeRating = makeElement('select', coffinTab, {'style':'position: absolute; top: 25px; left:300px;', 'id':'JudgeRating'});
		for each (var rating in ratings )
		{
			var choice = document.createElement('option');
			choice.value = rating;
			choice.appendChild(document.createTextNode(rating));
			JudgeRating.appendChild(choice);
		}
		JudgeRating.selectedIndex = GM_getValue('JudgeRating', 1);

	var JudgeComment  = makeElement('div', coffinTab,{'style':'position: absolute; left:300px;  top: 50px; color: #FFFFFF;'});
//BSF Edit:
// BSF0031 - Modification of Automatic Periodic Judging to allow for configurable parameters in the settings screens
// Making some room for additional parameters, reducing the size of the Judge Comment block (height from 100px to 50px).
//		JudgeComment.innerHTML  = "Comment:<br/><textarea style='border: none; background-color: white; color: #AA0000; width: 180px; height: 100px;' id='JudgeComment'>" + GM_getValue('JudgeComment', 'tasty') + "</textarea>";
		JudgeComment.innerHTML  = "Comment:<br/><textarea style='border: none; background-color: white; color: #AA0000; width: 180px; height: 50px;' id='JudgeComment'>" + GM_getValue('JudgeComment', 'tasty') + "</textarea>";

//BSF Edit:
// BSF0031 - Modification of Automatic Periodic Judging to allow for configurable parameters in the settings screens
   var autoPeriodicJudge = makeElement('div', coffinTab,{'style':'position: absolute; left:300px;  top: 125px; color: #FFFFFF;'});
        autoPeriodicJudge.innerHTML  = "<input type='checkbox' id='autoPeriodicJudge' value='checked' "+GM_getValue('autoPeriodicJudge', '')+">Periodic Auto-Judging";

    var autoJudgeTimerIndexMax = makeElement('div', coffinTab,{'style':'position: absolute; left:300px;  top: 150px; color: #FFFFFF;'});
	autoJudgeTimerIndexMax.innerHTML = "Delay: <input type='text' style='border: none; width: 162px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoJudgeTimerIndexMax', '15') + "' id='autoJudgeTimerIndexMax' size='4'>"+"<br># Judgements: <input type='text' style='border: none; width: 50px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoJudgeCount', '10') + "' id='autoJudgeCount' size='4'>";



    var autoStats = makeElement('div', coffinTab,{'style':'position: absolute; left:500px;  top: 0px; color: #FFFFFF;'});
        autoStats.innerHTML  = "<input type='checkbox' id='autoStats' value='checked' "+GM_getValue('autoStats', '')+">enable auto-Stats";

	var AttackStat = makeElement('div', coffinTab,{'style':'position: absolute; left:520px;  top: 25px; color: #FFFFFF;'});
		AttackStat.innerHTML = "Attack Strength: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('attackStat', '0') + "' id='AttackStat' size='1'>";

	var DefenceStat = makeElement('div', coffinTab,{'style':'position: absolute; left:520px;  top: 50px; color: #FFFFFF;'});
		DefenceStat.innerHTML = "Defense Strength: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('defenceStat', '0') + "' id='DefenceStat' size='1'>";

	var EnergyStat = makeElement('div', coffinTab,{'style':'position: absolute; left:520px;  top: 75px; color: #FFFFFF;'});
		EnergyStat.innerHTML = "Maximum Energy: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('energyStat', '0') + "' id='EnergyStat' size='1'>";

	var HealthStat = makeElement('div', coffinTab,{'style':'position: absolute; left:520px;  top: 100px; color: #FFFFFF;'});
		HealthStat.innerHTML = "Maximum Health: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('healthStat', '0') + "' id='HealthStat' size='1'>";

	var RageStat = makeElement('div', coffinTab,{'style':'position: absolute; left:520px;  top: 125px; color: #FFFFFF;'});
		RageStat.innerHTML = "Maximum Rage: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('rageStat', '0') + "' id='RageStat' size='1'>";

   var autoBuff = makeElement('div', coffinTab,{'style':'position: absolute; left:500px;  top: 150px; color: #FFFFFF;'});
        autoBuff.innerHTML  = "<input type='checkbox' id='autoBuff' value='checked' "+GM_getValue('autoBuff', '')+">enable auto-Buff";
		
    var buffEnergy = makeElement('div', coffinTab,{'style':'position: absolute; left:520px;  top: 175px; color: #FFFFFF;'});
		buffEnergy.innerHTML = "Energy below: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('buffEnergy', '10') + "' id='buffEnergy' size='1'>";

    var buffRage = makeElement('div', coffinTab,{'style':'position: absolute; left:520px;  top: 200px; color: #FFFFFF;'});
		buffRage.innerHTML = "Rage below: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('buffRage', '10') + "' id='buffRage' size='1'>";
		
/* Mission tab*/		
	var missionTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 365px; color: #FFFFFF; visibility:hidden;', 'id':'missionTab'});

	var autoMission = makeElement('div', missionTab,{'style':'position: absolute; left:40px;  top: 0px; color: #FFFFFF;'});
         autoMission.innerHTML  = "<input type='checkbox' id='autoMission' value='checked' "+GM_getValue('autoMission', 'checked')+">enable auto-Mission";

	var selectMission = makeElement('select', missionTab, {'style':'position: absolute; top: 25px; left:40px;', 'id':'selectMission'});
		var missioni=0;
		for each (var mission in missions )
		{
			if (mission[3]==0) {
				//Tab header creation
				var choiceTab = document.createElement('optgroup');
				tabtocreate = mission[2];
				choiceTab.label = missionTabs[tabtocreate];
				choiceTab.setAttribute("style","background-color: #CCCCCC");
				selectMission.appendChild(choiceTab);
			}				
			
			var choice = document.createElement('option');
			choice.value = mission[0];
			choice.appendChild(document.createTextNode(mission[0]));
			selectMission.appendChild(choice);
		}
		selectMission.selectedIndex = GM_getValue('selectMission', 1);

//BSF Edit: (2 lines):
// BSF0014 - Added User changable parameter to include missionExpGain (the average Exp gained per Energy) - used to calculate when to use Energy Buff
	var missionExpGain = makeElement('div', missionTab,{'style':'position: absolute; left:40px;  top: 50px; color: #FFFFFF;'});
		missionExpGain.innerHTML = "Avg. Mission Exp Gain: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('missionExpGain', '1.5') + "' id='missionExpGain' size='1'>";

//BSF Edit: (2 lines):
// BSF0001 - Added Exp Reserve
	var missionExpReserve = makeElement('div', missionTab,{'style':'position: absolute; left:40px;  top: 75px; color: #FFFFFF;'});
		missionExpReserve.innerHTML = "Reserve <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('missionExpReserve', '0') + "' id='missionExpReserve' size='1'> Exp for Manual Play";

	var missionMastery = makeElement('div', missionTab,{'style':'position: absolute; left:300px;  top: 0px; color: #FFFFFF;'});
		missionMastery.innerHTML  = "<input type='checkbox' id='missionMastery' value='checked' "+GM_getValue('missionMastery', 'checked')+">Force mission Mastery";
		
/* Combat tab*/
	var combatTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 365px; color: #FFFFFF; visibility:hidden;', 'id':'combatTab'});

    var autoFight = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 0px; color: #FFFFFF;'});
        autoFight.innerHTML  = "<input type='checkbox' id='autoFight' value='checked' "+GM_getValue('autoFight', '')+">enable auto-Fight";

    var fightKeepRage = makeElement('div', combatTab,{'style':'position: absolute; left:60px;  top: 25px; color: #FFFFFF;'});
		fightKeepRage.innerHTML = "fight above Rage: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightKeepRage', '0') + "' id='fightKeepRage' size='1'>";

//BSF Edit: (2 lines):
// BSF0015 - Added User changable parameter to include fightExpGain (the average Exp gained per rage) - used to calculate when to use Rage Buff
    var fightExpGain = makeElement('div', combatTab,{'style':'position: absolute; left:60px;  top: 50px; color: #FFFFFF;'});
		fightExpGain.innerHTML = "Avg. Fight Exp Gain: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightExpGain', '3') + "' id='fightExpGain' size='1'>";

    var autoHeal = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 75px; color: #FFFFFF;'});
        autoHeal.innerHTML  = "<input type='checkbox' id='autoHeal' value='checked' "+GM_getValue('autoHeal', 'checked')+">enable auto-Heal";

    var healthLevel = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 100px; color: #FFFFFF;'});
		healthLevel.innerHTML = "min. health: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('healthLevel', '50') + "' id='healthLevel' size='1'>";

//BSF Edit:
// BSF0034 - Automatically add to avoid list vamps I have lost to 
    var autoFightAvoidLost = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 125px; color: #FFFFFF;'});
        autoFightAvoidLost.innerHTML  = "<input type='checkbox' id='autoFightAvoidLost' value='checked' "+GM_getValue('autoFightAvoidLost', 'checked')+">Avoid Vamps I have lost to";

    var autoFightLossListSize = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 150px; color: #FFFFFF;'});
		autoFightLossListSize.innerHTML = "Keep list of last <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoFightLossListSize', '50') + "' id='autoFightLossListSize' size='1'> losses";

    var healthRage = makeElement('div', combatTab,{'style':'position: absolute; left:160px;  top: 100px; color: #FFFFFF;'});
		healthRage.innerHTML = "max. Rage: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('healthRage', '5') + "' id='healthRage' size='1'>";
		
    var fightRandom = makeElement('div', combatTab,{'style':'position: absolute; left:300px;  top: 0px; color: #FFFFFF;'});
        fightRandom.innerHTML  = "<input type='radio' name='r1' id='fightRandom' value='checked' "+GM_getValue('fightRandom', '')+"> fight random vampires";

// blannie orig:	
//    var fightMinClanSize = makeElement('div', combatTab,{'style':'position: absolute; left:310px;  top: 50px; color: #FFFFFF;'});
//	fightMinClanSize.innerHTML = "Clan&nbsp;&nbsp;&nbsp;Min: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightMinClanSize', '1') + "' id='fightMinClanSize' size='1'>";
//	
//    var fightClanSize = makeElement('div', combatTab,{'style':'position: absolute; left:430px;  top: 50px; color: #FFFFFF;'});
//	fightClanSize.innerHTML = "Max: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightClanSize', '502') + "' id='fightClanSize' size='1'>";
//	
//    var fightClanRating = makeElement('div', combatTab,{'style':'position: absolute; left:310px;  top: 75px; color: #FFFFFF;'});
//	fightClanRating.innerHTML = "Skill&nbsp;&nbsp;&nbsp;&nbsp;Min: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightClanRating', '1400') + "' id='fightClanRating' size='1'>";
//	
//    var fightClanMaxRating = makeElement('div', combatTab,{'style':'position: absolute; left:430px;  top: 75px; color: #FFFFFF;'});
//	fightClanMaxRating.innerHTML = "Max: <input type='text' style='border: none; width: 40px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightClanMaxRating', '3000') + "' id='fightClanMaxRating' size='1'>";

//BSF Edit:
// BSF0004 - Added Parameters to Auto-Fight: Max Skill, Min Level, Min Clan
// Adds additional parameters to Settings Menu (next 17 lines):
    var fightMinLevel = makeElement('div', combatTab,{'style':'position: absolute; left:310px;  top: 25px; color: #FFFFFF;'});
	fightMinLevel.innerHTML = "Level&nbsp;&nbsp;Min: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightMinLevel', '1') + "' id='fightMinLevel' size='1'>";
	
    var fightLevel = makeElement('div', combatTab,{'style':'position: absolute; left:430px;  top: 25px; color: #FFFFFF;'});
	fightLevel.innerHTML = "Max: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightLevel', '100') + "' id='fightLevel' size='1'>";

    var fightMinClanSize = makeElement('div', combatTab,{'style':'position: absolute; left:310px;  top: 50px; color: #FFFFFF;'});
	fightMinClanSize.innerHTML = "Clan&nbsp;&nbsp;&nbsp;Min: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightMinClanSize', '1') + "' id='fightMinClanSize' size='1'>";
	
    var fightClanSize = makeElement('div', combatTab,{'style':'position: absolute; left:430px;  top: 50px; color: #FFFFFF;'});
	fightClanSize.innerHTML = "Max: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightClanSize', '502') + "' id='fightClanSize' size='1'>";
	
    var fightClanRating = makeElement('div', combatTab,{'style':'position: absolute; left:310px;  top: 75px; color: #FFFFFF;'});
	fightClanRating.innerHTML = "Skill&nbsp;&nbsp;&nbsp;&nbsp;Min: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightClanRating', '1400') + "' id='fightClanRating' size='1'>";
	
    var fightClanMaxRating = makeElement('div', combatTab,{'style':'position: absolute; left:430px;  top: 75px; color: #FFFFFF;'});
	fightClanMaxRating.innerHTML = "Max: <input type='text' style='border: none; width: 40px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightClanMaxRating', '3000') + "' id='fightClanMaxRating' size='1'>";


//BSF Edit:
// BSF0032 - Limit number of repeated attacks on same vamp in fight
    var autoFightAttackLimit = makeElement('div', combatTab,{'style':'position: absolute; left:300px;  top: 100px; color: #FFFFFF;'});
        autoFightAttackLimit.innerHTML  = "<input type='checkbox' id='autoFightAttackLimit' "+GM_getValue('autoFightAttackLimit', 'checked')+">Limit Repeated Attacks<br>&nbsp;&nbsp;&nbsp;&nbsp;on same Vamp";

    var autoFightAttackLimitMax = makeElement('div', combatTab,{'style':'position: absolute; left:300px;  top: 140px; color: #FFFFFF;'});
	autoFightAttackLimitMax.innerHTML = "Max <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoFightAttackLimitMax', '7') + "' id='autoFightAttackLimitMax' size='2'> attacks on same vamp ";

    var autoFightAttackLimitListSize = makeElement('div', combatTab,{'style':'position: absolute; left:300px;  top: 165px; color: #FFFFFF;'});
	autoFightAttackLimitListSize.innerHTML = "in last <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoFightAttackLimitListSize', '20') + "' id='autoFightAttackLimitListSize' size='3'> total attacks.";


	var fightList = makeElement('div', combatTab,{'style':'position: absolute; left:500px;  top: 0px; color: #FFFFFF;'});
		fightList.innerHTML  = "<input type='radio' name='r1' id='rFightList' value='checked' " + GM_getValue('rFightList', '') + "> fight list:<br/><textarea style='border: none; background-color: transparent; color: #AA0000; width: 180px; height: 200px;' id='fightList'>" + GM_getValue('fightList', '') + "</textarea>";

/* Bazaar tab*/
	var bazaarTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 365px; color: #FFFFFF; visibility:hidden;', 'id':'bazaarTab'});

	var autoGifting = makeElement('div', bazaarTab,{'style':'position: absolute; left:40px;  top: 0px; color: #FFFFFF;'});
        autoGifting.innerHTML  = "<input type='checkbox' id='autoGifting' value='checked' "+GM_getValue('autoGifting', '')+">enable auto-Gifting";
	
	var selectAttribute = makeElement('select', bazaarTab, {'style':'position: absolute; top: 25px; left:40px;', 'id':'selectAttribute'});
		for each (var attribute in attributes )
		{
			var choice = document.createElement('option');
			choice.value = attribute[0];
			choice.appendChild(document.createTextNode(attribute[0]));
			selectAttribute.appendChild(choice);
		}
		selectAttribute.selectedIndex = GM_getValue('selectAttribute', 1);

	var giftingCount = makeElement('div', bazaarTab,{'style':'position: absolute; left:40px; top: 50px; color: #FFFFFF;'});
		giftingCount.innerHTML = "Gift count: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('giftingCount', '0') + "' id='giftingCount' size='1'>";
		
	var giftingUser = makeElement('div', bazaarTab,{'style':'position: absolute; left:40px;  top: 75px; color: #FFFFFF;'});
		giftingUser.innerHTML = "Gift to userID: <input type='text' style='border: none; width: 90px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('giftingUser', '0') + "' id='giftingUser' size='3'>";
		
	var autoMinion = makeElement('div', bazaarTab,{'style':'position: absolute; left:300px;  top: 0px; color: #FFFFFF;'});
		autoMinion.innerHTML  = "<input type='checkbox' id='autoMinion' value='checked' "+GM_getValue('autoMinion', '')+'>enable auto minion purchase <br>Next minion cost: <strong class="good"><img src="http://facebook.vampires.static.zynga.com/graphics/icon-blood.gif"/>' + GM_getValue('minionCost', 0)+ '</strong>';

	var autoAbility = makeElement('div', bazaarTab,{'style':'position: absolute; left:300px;  top: 55px; color: #FFFFFF;'});
		autoAbility.innerHTML  = "<input type='checkbox' id='autoAbility' value='checked' "+GM_getValue('autoAbility', '')+">enable auto ability upgrading";
		
    var autoGamble = makeElement('div', bazaarTab,{'style':'position: absolute; left:300px;  top: 100px; color: #FFFFFF;'});
        autoGamble.innerHTML  = "<input type='checkbox' id='autoGamble' value='checked' "+GM_getValue('autoGamble', 'checked')+">enable auto Akem's Gamble";

	var gamblebox1 = makeElement('div', bazaarTab,{'style':'position: absolute; left:300px;  top: 125px; color: #FFFFFF;'});
		gamblebox1.innerHTML  = "<input type='radio' name='rBoxes' id='rBoxLeft' value='checked' " + GM_getValue('rBoxLeft', '') + "> Left ";

	var gamblebox2 = makeElement('div', bazaarTab,{'style':'position: absolute; left:350px;  top: 125px; color: #FFFFFF;'});
		gamblebox2.innerHTML  = "<input type='radio' name='rBoxes' id='rBoxMiddle' value='checked' " + GM_getValue('rBoxMiddle', '') + "> Middle ";

	var gamblebox3 = makeElement('div', bazaarTab,{'style':'position: absolute; left:420px;  top: 125px; color: #FFFFFF;'});
		gamblebox3.innerHTML  = "<input type='radio' name='rBoxes' id='rBoxRight' value='checked' " + GM_getValue('rBoxRight', '') + "> Right ";

	var gambleTime = makeElement('div', bazaarTab,{'style':'position: absolute; left:300px;  top: 150px; color: #FFFFFF;'});
		gambleTime.innerHTML = "<strong>free gamble: " + new Date(1000 *GM_getValue('LotteryDue',0)).format("h:MM:ss TT");








/* Event tab*/
	var eventTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 365px; color: #FFFFFF; visibility:hidden;', 'id':'eventTab'});

	var autoEventMission = makeElement('div', eventTab,{'style':'position: absolute; left:40px;  top: 0px; color: #FFFFFF;'});
         autoEventMission.innerHTML  = "<input type='checkbox' id='autoEventMission' value='checked' "+GM_getValue('autoEventMission', 'checked')+">enable Event auto-Mission";

	var eventMasterAllDiv = makeElement('div', eventTab,{'style':'position: absolute; left:300px;  top: 0px; color: #FFFFFF;'});
		var eventMasterAll = makeElement('input', eventMasterAllDiv, {'type':'radio', 'name':'eventMasterMethod', 'id':'eventMasterAll', 'value':'checked'}, 'eventMasterAll');
		eventMasterAllDiv.appendChild(document.createTextNode(' Master Stages in Order'));
	var eventMasterOneDiv = makeElement('div', eventTab,{'style':'position: absolute; left:500px;  top: 0px; color: #FFFFFF;'});
		var eventMasterOne = makeElement('input', eventMasterOneDiv, {'type':'radio', 'name':'eventMasterMethod', 'id':'eventMasterOne', 'value':'checked'}, 'eventMasterOne');
		eventMasterOneDiv.appendChild(document.createTextNode(' Master One Stage Only'));

	// Master All Event Stages in Order:
	var selectEventMissionA = makeElement('select', eventTab, {'style':'position: absolute; top: 25px; left:40px; ', 'id':'selectEventMissionA'});
	for each (var eventmission in eventMissions )
	{
		if (eventmission[3]==0) {
			//Tab header creation
			var eventChoiceTab = document.createElement('optgroup');
			tabtocreate = eventmission[2];
			eventChoiceTab.label = eventMissionTabs[tabtocreate];
			eventChoiceTab.setAttribute("style","background-color: #CCCCCC");
			selectEventMissionA.appendChild(eventChoiceTab);
		}				

		var eventChoice = document.createElement('option');
		eventChoice.value = eventmission[0];
		eventChoice.appendChild(document.createTextNode(eventmission[0]));
		selectEventMissionA.appendChild(eventChoice);
	}
	selectEventMissionA.selectedIndex = GM_getValue('selectEventMissionA', 1);


	// Master One Event Stage Only:
	var selectEventMissionO = makeElement('select', eventTab, {'style':'position: absolute; top: 25px; left:40px; ', 'id':'selectEventMissionO'});
	for each (var eventmissiontab in eventMissionTabs )
	{
		var eventStageChoice = document.createElement('option');
		eventStageChoice.value = eventmissiontab;
		eventStageChoice.appendChild(document.createTextNode(eventmissiontab));
		selectEventMissionO.appendChild(eventStageChoice);
	}
	selectEventMissionO.selectedIndex = GM_getValue('selectEventMissionO', 1);



	// Handler to change event mastery style (all vs. one)
	var handler = function() {
		if (eventMasterAll.checked) {
			selectEventMissionA.style.display = '';
			selectEventMissionO.style.display = 'none';
		} else {
			selectEventMissionA.style.display = 'none';
			selectEventMissionO.style.display = '';
		}
	}
	handler();

	eventMasterAll.addEventListener('change', handler, false);
	eventMasterOne.addEventListener('change', handler, false);


//BSF Edit: (2 lines):
// BSF0001 - Added Exp Reserve
//	var missionExpReserve = makeElement('div', eventTab,{'style':'position: absolute; left:40px;  top: 75px; color: #FFFFFF;'});
//		missionExpReserve.innerHTML = "Reserve <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('missionExpReserve', '0') + "' id='missionExpReserve' size='1'> Exp for Manual Play";

	var autoEventReset = makeElement('div', eventTab,{'style':'position: absolute; left:40px;  top: 100px; color: #FFFFFF;'});
         autoEventReset.innerHTML  = "<input type='checkbox' id='autoEventReset' value='checked' "+GM_getValue('autoEventReset', 'checked')+">Reset Event Stage when completed";




/* other buttons*/	
	var updateButton = makeElement('div', settingsBox,{'style':'position: absolute; left:150px;  top: 335px;'});
        updateButton.innerHTML  = "<button>check for updates</button>";
        updateButton.addEventListener('click', updateScript, false);
    	
    var saveButton = makeElement('div', settingsBox,{'style':'position: absolute; left:300px;  top: 335px; color: #FFFFFF;'});
        saveButton.innerHTML  = "<button>save settings</button>";
        saveButton.addEventListener('click', saveSettings, false);

    var saveNotification = makeElement('div', settingsBox,{'id':'saveNotification'});
        saveNotification.innerHTML = "<strong>Settings Saved</strong>";
        saveNotification.setAttribute("style","position: absolute;left:450px;top:335px;color:red;visibility:hidden;font-size:14px;");

	return settingsBox;
}

function coffinMenuSelect(){
	document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/coffin_se.png'/>";
	document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/missions_us.png'/>";
	document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/combat_us.png'/>";
	document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/bazaar_us.png'/>";
//BSF Edit:
// BSF0030 - Automate Special Events
	if(eventActive)
	        document.getElementById('eventMenu').innerHTML  = "<div style='color:#FFE6E6;background-color:#330000;text-align:center'><table border='0'><tr><td>"+eventImageHTML+"</td><td>Event:<br>"+eventName+"</td></tr></table></div>";
	document.getElementById('coffinTab').style.visibility = "visible";
	document.getElementById('missionTab').style.visibility = "hidden";
	document.getElementById('combatTab').style.visibility = "hidden";
	document.getElementById('bazaarTab').style.visibility = "hidden";
//BSF Edit:
// BSF0030 - Automate Special Events
	if(eventActive)
		document.getElementById('eventTab').style.visibility = "hidden";
}
function missionMenuSelect(){
	document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/coffin_us.png'/>";
	document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/missions_se.png'/>";
	document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/combat_us.png'/>";
	document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/bazaar_us.png'/>";
//BSF Edit:
// BSF0030 - Automate Special Events
	if(eventActive)
        	document.getElementById('eventMenu').innerHTML  = "<div style='color:#FFE6E6;background-color:#330000;text-align:center'><table border='0'><tr><td>"+eventImageHTML+"</td><td>Event:<br>"+eventName+"</td></tr></table></div>";
	document.getElementById('coffinTab').style.visibility = "hidden";
	document.getElementById('missionTab').style.visibility = "visible";
	document.getElementById('combatTab').style.visibility = "hidden";
	document.getElementById('bazaarTab').style.visibility = "hidden";
//BSF Edit:
// BSF0030 - Automate Special Events
	if(eventActive)
		document.getElementById('eventTab').style.visibility = "hidden";
}
function combatMenuSelect(){
	document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/coffin_us.png'/>";
	document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/missions_us.png'/>";
	document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/combat_se.png'/>";
	document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/bazaar_us.png'/>";
//BSF Edit:
// BSF0030 - Automate Special Events
	if(eventActive)
	        document.getElementById('eventMenu').innerHTML  = "<div style='color:#FFE6E6;background-color:#330000;text-align:center'><table border='0'><tr><td>"+eventImageHTML+"</td><td>Event:<br>"+eventName+"</td></tr></table></div>";
	document.getElementById('coffinTab').style.visibility = "hidden";
	document.getElementById('missionTab').style.visibility = "hidden";
	document.getElementById('combatTab').style.visibility = "visible";
	document.getElementById('bazaarTab').style.visibility = "hidden";
//BSF Edit:
// BSF0030 - Automate Special Events
	if(eventActive)
		document.getElementById('eventTab').style.visibility = "hidden";
}

function bazaarMenuSelect(){
	document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/coffin_us.png'/>";
	document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/missions_us.png'/>";
	document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/combat_us.png'/>";
	document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/bazaar_se.png'/>";
//BSF Edit:
// BSF0030 - Automate Special Events
	if(eventActive)
	        document.getElementById('eventMenu').innerHTML  = "<div style='color:#FFE6E6;background-color:#330000;text-align:center'><table border='0'><tr><td>"+eventImageHTML+"</td><td>Event:<br>"+eventName+"</td></tr></table></div>";
	document.getElementById('coffinTab').style.visibility = "hidden";
	document.getElementById('missionTab').style.visibility = "hidden";
	document.getElementById('combatTab').style.visibility = "hidden";
	document.getElementById('bazaarTab').style.visibility = "visible";
//BSF Edit:
// BSF0030 - Automate Special Events
	if(eventActive)
		document.getElementById('eventTab').style.visibility = "hidden";
}

//BSF Edit:
// BSF0030 - Automate Special Events
function eventMenuSelect(){
	document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/coffin_us.png'/>";
	document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/missions_us.png'/>";
	document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/combat_us.png'/>";
	document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/bazaar_us.png'/>";
        document.getElementById('eventMenu').innerHTML  = "<div style='color:#FFE6E6;background-color:#660000;text-align:center'><table border='0'><tr><td>"+eventImageHTML+"</td><td>Event:<br>"+eventName+"</td></tr></table></div>";
	document.getElementById('coffinTab').style.visibility = "hidden";
	document.getElementById('missionTab').style.visibility = "hidden";
	document.getElementById('combatTab').style.visibility = "hidden";
	document.getElementById('bazaarTab').style.visibility = "hidden";
	document.getElementById('eventTab').style.visibility = "visible";
}

function saveSettings(){
    GM_setValue('autoClick', document.getElementById('autoClick').checked ? 'checked' : '0');
    GM_setValue('autoClan', document.getElementById('autoClan').checked ? 'checked' : '0');
    GM_setValue('autoMission', document.getElementById('autoMission').checked ? 'checked' : '0');
//BSF Edit:
// BSF0014 - Added User changable parameter to include missionExpGain (the average Exp gained per Energy) - used to calculate when to use Energy Buff
    GM_setValue('missionExpGain', document.getElementById('missionExpGain').value);
//BSF Edit:
// BSF0001 - Added Exp Reserve
    GM_setValue('missionExpReserve', document.getElementById('missionExpReserve').value);
    GM_setValue('missionMastery', document.getElementById('missionMastery').checked ? 'checked' : '0');
    GM_setValue('autoBank', document.getElementById('autoBank').checked ? 'checked' : '0');
    GM_setValue('autoHeal', document.getElementById('autoHeal').checked ? 'checked' : '0');
    GM_setValue('autoBuff', document.getElementById('autoBuff').checked ? 'checked' : '0');
    GM_setValue('autoFight', document.getElementById('autoFight').checked ? 'checked' : '0');
    GM_setValue('fightRandom', document.getElementById('fightRandom').checked ? 'checked' : '0');
    GM_setValue('rFightList', document.getElementById('rFightList').checked ? 'checked' : '0');
    GM_setValue('autoLog', document.getElementById('autoLog').checked ? 'checked' : '0');
    GM_setValue('autoGamble', document.getElementById('autoGamble').checked ? 'checked' : '0');
    GM_setValue('autoJudge', document.getElementById('autoJudge').checked ? 'checked' : '0');

//BSF Edit:
// BSF0031 - Modification of Automatic Periodic Judging to allow for configurable parameters in the settings screens
    GM_setValue('autoPeriodicJudge', document.getElementById('autoPeriodicJudge').checked ? 'checked' : '0');
    GM_setValue('autoJudgeTimerIndexMax', document.getElementById('autoJudgeTimerIndexMax').value);
    GM_setValue('autoJudgeCount', document.getElementById('autoJudgeCount').value);

//edit 032910 (zysfryar) added mission priority
    GM_setValue('missionPriority', document.getElementById('missionPriority').checked ? 'checked' : '0'); 

 // GM_setValue('autoTreasure', document.getElementById('autoTreasure').checked ? 'checked' : '0');
    GM_setValue('autoAbility', document.getElementById('autoAbility').checked ? 'checked' : '0');
    GM_setValue('rBoxLeft', document.getElementById('rBoxLeft').checked ? 'checked' : '0');
    GM_setValue('rBoxMiddle', document.getElementById('rBoxMiddle').checked ? 'checked' : '0');
    GM_setValue('rBoxRight', document.getElementById('rBoxRight').checked ? 'checked' : '0');
    GM_setValue('autoStats', document.getElementById('autoStats').checked ? 'checked' : '0');
    GM_setValue('autoMinion', document.getElementById('autoMinion').checked ? 'checked' : '0');
    GM_setValue('refreshPage', document.getElementById('refreshPage').value);
    GM_setValue('selectMission', document.getElementById('selectMission').selectedIndex );
    GM_setValue('bankConfig', document.getElementById('bankConfig').value);
    GM_setValue('bankKeep', document.getElementById('bankKeep').value);
    GM_setValue('r1', document.getElementById('r1').value);
    GM_setValue('r2', document.getElementById('r2').value);
    GM_setValue('JudgeComment', document.getElementById('JudgeComment').value);
    GM_setValue('fightList', document.getElementById('fightList').value);
    GM_setValue('healthLevel', document.getElementById('healthLevel').value);
//BSF Edit:
// BSF0034 - Automatically add to avoid list vamps I have lost to 
    GM_setValue('autoFightAvoidLost', document.getElementById('autoFightAvoidLost').checked ? 'checked' : '0');
    GM_setValue('autoFightLossListSize', document.getElementById('autoFightLossListSize').value);

    GM_setValue('healthRage', document.getElementById('healthRage').value);
    GM_setValue('fightKeepRage', document.getElementById('fightKeepRage').value);
//BSF Edit:
// BSF0015 - Added User changable parameter to include fightExpGain (the average Exp gained per rage) - used to calculate when to use Rage Buff
    GM_setValue('fightExpGain', document.getElementById('fightExpGain').value);
//BSF Edit:
// BSF0004 - Added Parameters to Auto-Fight: Max Skill, Min Level, Min Clan
    GM_setValue('fightMinLevel', document.getElementById('fightMinLevel').value);
    GM_setValue('fightLevel', document.getElementById('fightLevel').value);
//BSF Edit:
// BSF0004 - Added Parameters to Auto-Fight: Max Skill, Min Level, Min Clan
    GM_setValue('fightMinClanSize', document.getElementById('fightMinClanSize').value);
    GM_setValue('fightClanSize', document.getElementById('fightClanSize').value);
    GM_setValue('fightClanRating', document.getElementById('fightClanRating').value);
    GM_setValue('fightClanMaxRating', document.getElementById('fightClanMaxRating').value);	

//BSF Edit:
// BSF0032 - Limit number of repeated attacks on same vamp in fight
    GM_setValue('autoFightAttackLimit', document.getElementById('autoFightAttackLimit').checked ? 'checked' : '0');
    GM_setValue('autoFightAttackLimitMax', document.getElementById('autoFightAttackLimitMax').value);
    GM_setValue('autoFightAttackLimitListSize', document.getElementById('autoFightAttackLimitListSize').value);

    GM_setValue('attackStat', document.getElementById('AttackStat').value);
    GM_setValue('defenceStat', document.getElementById('DefenceStat').value);
    GM_setValue('energyStat', document.getElementById('EnergyStat').value);
    GM_setValue('healthStat', document.getElementById('HealthStat').value);
    GM_setValue('rageStat', document.getElementById('RageStat').value);
			 
    GM_setValue('buffEnergy', document.getElementById('buffEnergy').value);
    GM_setValue('buffRage', document.getElementById('buffRage').value);
    GM_setValue('autoGifting',  document.getElementById('autoGifting').checked ? 'checked' : '0');
    GM_setValue('selectAttribute', document.getElementById('selectAttribute').selectedIndex );
    GM_setValue('JudgeRating', document.getElementById('JudgeRating').selectedIndex );
    GM_setValue('JudgeCount', document.getElementById('JudgeCount').value );    
    GM_setValue('giftingCount', document.getElementById('giftingCount').value);
    GM_setValue('giftingUser', document.getElementById('giftingUser').value);

//BSF Edit:
// BSF0030 - Automate Special Events
    GM_setValue('autoEventMission', document.getElementById('autoEventMission').checked ? 'checked' : '0');
    GM_setValue('selectEventMissionA', document.getElementById('selectEventMissionA').selectedIndex );
    GM_setValue('selectEventMissionO', document.getElementById('selectEventMissionO').selectedIndex );
    GM_setValue('eventMasterAll',  document.getElementById('eventMasterAll').checked ? 'checked' : '0');
    GM_setValue('eventMasterOne',  document.getElementById('eventMasterOne').checked ? 'checked' : '0');
    // If User has selected Master one stage at a time, make sure the mission is the first in that stage
    if(GM_getValue('eventMasterOne', '') == "checked" && eventMissions[GM_getValue('selectEventMissionA', '')][2] != GM_getValue('selectEventMissionO', '')) {
    	for (var i = 0, iLength=eventMissions.length; i < iLength; ++i) {
		if(eventMissions[i][2] == GM_getValue('selectEventMissionO', '')) {
    	    		GM_setValue('selectEventMissionA', i);
    	    		break;
    	    	}
    	}
    }
    GM_setValue('autoEventReset', document.getElementById('autoEventReset').checked ? 'checked' : '0');
   


	// show settings saved notification
	document.getElementById('saveNotification').style.visibility = "visible";
    setTimeout("document.location ='"+ "http://apps.facebook.com/"+SCRIPT.name + "/index.php'",1000);
}

function pausePlayer(){
	GM_setValue('paused',1);
	document.location = location.href;
}

function resumePlayer(){
	GM_setValue('paused',0);
	document.location = location.href;
}

function addToLog(line){
	var currentTime = new Date()
	var month = 1+ parseInt(currentTime.getMonth());
	var timestamp = currentTime.getDate()+ "/" + month+ "/" +currentTime.getFullYear() +" " +currentTime.getHours() + ":" + currentTime.getMinutes()+" ";
	GM_setValue('itemLog', timestamp + line + "<br/>" + GM_getValue('itemLog', ''));
	document.getElementById('logBox').innerHTML = timestamp + line + "<br/>" + document.getElementById('logBox').innerHTML;
}

function ignoreElement(element){
	if(element.id=='')
		return true;
 	if (element.id.indexOf('mainDiv') != -1
	|| element.id.indexOf('tab_handle') != -1)
		return false;
	return true;
}

function CycleFightList(){
	var opponents = GM_getValue('fightList', '').split("\n");
	var opponentList="";
	for (var i=1;i<opponents.length;i++)
		opponentList = opponentList+ opponents[i]+"\n";
	opponentList = opponentList + opponents[0];
	GM_setValue('fightList', opponentList);
}

function clearLog(){
    GM_setValue('itemLog', '');
    logBox.innerHTML = "";
//BSF Edit:
// BSF0002 - Added Alert to Log Cleared
    alert('Log Cleared');
}

function toggleLogBox(){
    if(logOpen == false){
        logOpen = true;
        viewLogButton.innerHTML = "Hide Log";
        logBox.style.visibility = "visible";
    }
    else{
        logOpen = false;
        viewLogButton.innerHTML = "View Log";
        logBox.style.visibility = "hidden";
    }
}





//BSF Edit - Temporary text box to display ppl I have lost to
// BSF0034 - Automatically add to avoid list vamps I have lost to 
function clearLostList(){
	var autoFightLossList = new Array();
	setSavedList('autoFightLossList', autoFightLossList);
//	fightLossesBox.innerHTML = "";
	fightLossesBox.innerHTML = "Fights Lost:<br>"+GM_getValue('autoFightLossList');
	var clearLostListButton = makeElement('div', fightLossesBox,{'style':'position: absolute; left:125px;  top: 10px; color: #FFFFFF;'});
		clearLostListButton.innerHTML  = "<button>Clear</button>";
		clearLostListButton.addEventListener('click', clearLostList, false);
    }





function makeElement(type, appendto, attributes, checked, chkdefault) {
  var element = document.createElement(type);
  if (attributes != null) {
    for (var i in attributes) {
      element.setAttribute(i, attributes[i]);
    }
  }
  if (checked != null) {
    if (GM_getValue(checked, chkdefault) == 'checked') {
      element.setAttribute('checked', 'checked');
    }
  }
  if (appendto) {
    appendto.appendChild(element);
  }
  return element;
}

function createXMLHTTPObject() {
    var xmlhttp = false;
    for (var i=0;i<XMLHttpFactories.length;i++) {
        try {
            xmlhttp = XMLHttpFactories[i]();
        }
        catch (e) {
            continue;
        }
        break;
    }
    return xmlhttp;
}


//BSF Edit:
// BSF0033 - Added General and Array methods from MWAP v1.1.25 build 362
///////////////////////////////////////////////////////////////////////////////
//                           UTILITY METHODS                                 //
///////////////////////////////////////////////////////////////////////////////


/******************************** General ********************************/

function clearSettings() {
  if (typeof GM_listValues == 'function' &&
      typeof GM_deleteValue == 'function') {
    var values = GM_listValues();
    for (var i in values) {
      if (typeof GM_deleteValue == 'function')
        GM_deleteValue(values[i]);
    }
  } else {
    alert('In order to do this you need at least GreaseMonkey version: 0.8.20090123.1. Please upgrade and try again.');
  }
}

/******************************** Array ********************************/

function getArrayDiffs(workingArray) {
  diffArray = [];
  for (var i = 1; i < workingArray.length; i++) {
    if (workingArray[i] - workingArray[i-1] < 0) {
      diffArray.push(0)
    } else {
      diffArray.push(workingArray[i] - workingArray[i-1]);
    }
  }
  diffArray.unshift(0);
  return diffArray;
}

// Save an array of strings. The strings must not contain "\n".
function setSavedList(listName, list) {
  GM_setValue(listName, list.join('\n'));
}

// Get an array of strings that was saved with setSavedList().
function getSavedList(listName) {
  var savedList = GM_getValue(listName, '');
  return savedList? savedList.split('\n') : [];
}

// Add an item to a list saved with setSavedList().
// If the size of the list is greater than the "max"
// parameter, the first item in the list is removed.
function addSavedListItem(listName, item, max) {
  var savedList = getSavedList(listName);

  // Only add if it isn't already there.
  if (savedList.indexOf(item) != -1) {
    return;
  }

  savedList.push(item);
  if (max > 0) {
    while (max < savedList.length) {
      var itm = savedList.shift();
//      DEBUG('Removing ' + itm + ' from ' + listName + '.');
    }
  }
  setSavedList(listName, savedList);
}


//BSF Edit:
//This function is my own, intended to create a FIFO list, adding to the beginning with unshift, and removing from the end with pop
// Add an item to a list saved with setSavedList().
// If the size of the list is greater than the "max"
// parameter, the last item in the list is removed.
function addSavedListItemFIFOUnlimited(listName, item, max) {
  var savedList = getSavedList(listName);

  savedList.unshift(item);
  if (max > 0) {
    while (max < savedList.length) {
      var itm = savedList.pop();
//      DEBUG('Removing ' + itm + ' from ' + listName + '.');
    }
  }
  setSavedList(listName, savedList);
}




// Remove an item from a list saved with setSavedList().
function removeSavedListItem(listName, item) {
  var savedList = getSavedList(listName);
  var idx = savedList.indexOf(item);
  if (idx != -1) {
    savedList.splice(idx, 1);
    setSavedList(listName, savedList);
    return true;
  }
  // No matches.
  return false;
}

function removeJobForItem(jobList, itemName){
  var jobs = getSavedList(jobList, '');
  var i=0;
  if (jobs.length>0){
    var job=jobs[jobs.length-1];
    requirementJob.forEach(
     function(j){
       if (j[1] == job) {
         if (requirementJob[i][0]==itemName) {
           removeSavedListItem(jobList,requirementJob[i][1]);
//           DEBUG('removing job'+requirementJob[i][1]);
         }
       }
       i++;
     }
    );
  }
}

function cycleSavedList(listName) {
  // Move the first item to the end of the list.
  var opponents = GM_getValue(listName, '').split('\n');
  var first = opponents.shift();
  if (first) {
    opponents.push(first);
  }
  GM_setValue(listName, opponents.join('\n'));
}

/******************************** HTML/DOM ********************************/

// Check if a GM value is undefined
function isGMUndefined (gmName) {
  return isUndefined (GM_getValue(gmName));
}

// Check if a value is undefined
function isUndefined(value) {
  return value + '' == 'undefined';
}



//update the script (by Richard Gibson; changed by ms99 and blannie)
function updateScript() {
	try {
		if (!GM_getValue) return;
		GM_xmlhttpRequest({
			method: 'GET',
			url: SCRIPT.url + '?source', // don't increase the 'installed' count; just for checking
			onload: function(result) {
				if (result.status != 200) return;
				if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
				var theOtherVersion = RegExp.$1;
				if (theOtherVersion == SCRIPT.version) {
					alert('you have the latest version' + ' (v ' + SCRIPT.version + ') !');
					return;
				} else if (theOtherVersion < SCRIPT.version) {
					alert('Beta version' + ' (v ' + SCRIPT.version + ') installed ?!');
					return;
				} else {
					if (window.confirm('new version ' + ' (v ' + theOtherVersion + ') available!\n\n' + 'Do you want to update?' + '\n')) {
						window.location.href = SCRIPT.url;
					}
				}
			}
		});
	} catch (ex) {
	}
}

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};