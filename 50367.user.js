// ==UserScript==
// @name           BMTitle
// @namespace      BM
// @description    BM
// @include        http://www.basilmarket.com/*
// ==/UserScript==

var URLs = [];
var Titles = [];

var Suffix = "BasilMarket.com - ";

// Gen MapleStory
URLs[0] = "http://www.basilmarket.com/show/forum/1";
Titles[0] = "General Maple Story";
URLs[1] = "http://www.basilmarket.com/show/forum/54";
Titles[1] = "Quests & Party Quests";
URLs[2] = "http://www.basilmarket.com/show/forum/15";
Titles[2] = "Maple Story Tech Help & Patches";
URLs[3] = "http://www.basilmarket.com/show/forum/34";
Titles[3] = "Fashion Corner";

// Classes
URLs[4] = "http://www.basilmarket.com/show/forum/46";
Titles[4] = "New Players";

URLs[5] = "http://www.basilmarket.com/show/forum/2";
Titles[5] = "Bowmen";
URLs[6] = "http://www.basilmarket.com/show/forum/35";
Titles[6] = "Hunter, Ranger, Bow Master";
URLs[7] = "http://www.basilmarket.com/show/forum/36";
Titles[7] = "Crossbow, Sniper, Marksman";

URLs[8] = "http://www.basilmarket.com/show/forum/5";
Titles[8] = "Mage";
URLs[9] = "http://www.basilmarket.com/show/forum/37";
Titles[9] = "Fire/Poison Wizard, Mage, Arch Mage";
URLs[10] = "http://www.basilmarket.com/show/forum/38";
Titles[10] = "Ice/Lightning Wizard, Mage, Arch Mage";
URLs[11] = "http://www.basilmarket.com/show/forum/39";
Titles[11] = "Cleric, Priest, Bishop";

URLs[12] = "http://www.basilmarket.com/show/forum/47";
Titles[12] = "Pirate";
URLs[13] = "http://www.basilmarket.com/show/forum/48";
Titles[13] = "Gunslinger, Outlaw, Corsair";
URLs[14] = "http://www.basilmarket.com/show/forum/49";
Titles[14] = "Brawler, Marauder, Buccaneer";

URLs[15] = "http://www.basilmarket.com/show/forum/3";
Titles[15] = "Thief";
URLs[16] = "http://www.basilmarket.com/show/forum/40";
Titles[16] = "Assassin, Hermit, Night Lord";
URLs[17] = "http://www.basilmarket.com/show/forum/41";
Titles[17] = "Bandit, Chief Bandit, Shadower";

URLs[18] = "http://www.basilmarket.com/show/forum/4";
Titles[18] = "Warrior";
URLs[19] = "http://www.basilmarket.com/show/forum/42";
Titles[19] = "Fighter, Crusader, Hero";
URLs[20] = "http://www.basilmarket.com/show/forum/43";
Titles[20] = "Page, Knight, Paladin";
URLs[21] = "http://www.basilmarket.com/show/forum/44";
Titles[21] = "Spearman, Dragon Knight, Dark Knight";

URLs[22] = "http://www.basilmarket.com/show/forum/12";
Titles[22] = "Beginner";

//Regions
URLs[23] = "http://www.basilmarket.com/show/forum/29";
Titles[23] = "GMS - Global Maple Story talk";
URLs[24] = "http://www.basilmarket.com/show/forum/30";
Titles[24] = "MSEA - South East Asian Maple Story talk";
URLs[25] = "http://www.basilmarket.com/show/forum/31";
Titles[25] = "EMS - European Maple Story talk";
URLs[26] = "http://www.basilmarket.com/show/forum/53";
Titles[26] = "BMS - Brasilian Maple Story talk";
URLs[27] = "http://www.basilmarket.com/show/forum/52";
Titles[27] = "KMS - Korean Maple Story talk";
URLs[28] = "http://www.basilmarket.com/show/forum/32";
Titles[28] = "JMS - Japanese Maple Story talk";

//Chat
URLs[29] = "http://www.basilmarket.com/show/forum/6";
Titles[29] = "Chat";
URLs[30] = "http://www.basilmarket.com/show/forum/50";
Titles[30] = "Fun";
URLs[31] = "http://www.basilmarket.com/show/forum/51";
Titles[31] = "Tech";
URLs[32] = "http://www.basilmarket.com/show/forum/18";
Titles[32] = "Site Talk";


//Others
URLs[33] = "http://www.basilmarket.com/";
Titles[33] = "Main Page";
URLs[34] = "http://www.basilmarket.com/submit/login";
Titles[34] = "Log in";
URLs[35] = "http://www.basilmarket.com/list/forum";
Titles[35] = "Recent Forum Activity";
URLs[36] = "http://www.basilmarket.com/show/rules";
Titles[36] = "Rules";
URLs[37] = "http://www.basilmarket.com/report";
Titles[37] = "Report";
URLs[38] = "http://www.basilmarket.com/list/mail";
Titles[38] = "Inbox";
URLs[39] = "http://www.basilmarket.com/list/mail/1";
Titles[39] = "Inbox";
URLs[40] = "http://www.basilmarket.com/list/mail/2";
Titles[40] = "Outbox";
URLs[41] = "http://www.basilmarket.com/list/mail/3";
Titles[41] = "Trash";
URLs[42] = "http://www.basilmarket.com/list/scrap";
Titles[42] = "Scraps";
URLs[43] = "http://www.basilmarket.com/search";
Titles[43] = "Search";
URLs[44] = "http://www.basilmarket.com/submit/forum_topic";
Titles[44] = "New Thread";


//Super secret 
URLs[45] = "http://www.basilmarket.com/show/forum/33";
Titles[45] = "Mod Hangout";
URLs[46] = "http://www.basilmarket.com/show/forum/99";
Titles[46] = "Security Hangout";



// Swap out titles as set above.
for(i=0; i<URLs.length; i++) { 
	if (document.URL.toLowerCase() == URLs[i].toLowerCase()) {
		document.title = Suffix + Titles[i];
		//alert(Titles[i]);
	}
}

// Basil IDs
// http://txt2re.com is awesome <3
var p = new RegExp('.*?(user).*?((?:[a-z][a-z]+))',["i"]);
var m = p.exec(document.URL);			
if (m.length>0){
	document.title = Suffix + m[2] + "'s BasilID";
}


