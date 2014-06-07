// ==UserScript==
// @name		Less Compact Mode with AT Buffs
// @description		Version 0.3 - By NatNit
// @include		*127.0.0.1:*/charpane.php
// @exclude		*forums.kingdomofloathing.com*
// ==/UserScript==

// To run this script you must be running the compact character pane on the
// KoLMafia relay browser.
// 
// This script adds shorthand names for effects when running in compact mode
// under mafia. It also includes "effects" given by mafia, such as semirares,
// he-boulder rays, etc. Additionally, above your buffs, it provides a short
// summary of how many and which AT songs you are running, as well as the turns
// remaining of each.
// 
// Many thanks to the clannies that helped with development (especially ZeroBlah,
// Kitzschenius, and KirkPatrick) and Picklish for the original script and concept,
// which I have since hacked to pieces.

// Changelog:
// v0.1 - 20100311 - First version, did not change any buff information, replace mafia mood link, seems to work fine.
// v0.2 - 20100321 - Significant changes, add new buffs (thanks Kitz), fixed issues with intrinsics
// v0.3 - 20100321 - Complete rework. Includes mafia counters, etc. Sexification of AT buff section with KP's help

var effects = [];
var isAT = [];
effects["foo"] = "bar";

// SC
effects["Seal Clubbing Frenzy"] = "Frenzy";
effects["Rage of the Reindeer"] = "Rage";
effects["Musk of the Moose"] = "Musk";
effects["Snarl of the Timberwolf"] = "Snarl";
effects["A Few Extra Pounds"] = "Weight Gain";

// TT
effects["Patience of the Tortoise"] = "Patience";
effects["Tenacity of the Snapper"] = "Tenacity";
effects["Reptilian Fortitude"] = "Fortitude";
effects["Astral Shell"] = "Astral";

// P
effects["Springy Fusilli"] = "Springy";
effects["Leash of Linguini"] = "Leash";
effects["Spirit of Peppermint"] = "Cold Pasta";
effects["Spirit of Cayenne"] = "Hot Pasta";
effects["Spirit of Bacon Grease"] = "Sleazy Pasta";
effects["Spirit of Garlic"] = "Stinky Pasta";
effects["Spirit of Wormwood"] = "Spooky Pasta";

// Sauce
effects["Jabañero Saucesphere"] = "MP Sphere";
effects["Jalapeño Saucesphere"] = "HP Sphere";

// DB
effects["Disco State of Mind"] = "Disco Mind";
effects["Smooth Movements"] = "Smooth";

// AT
effects["The Moxious Madrigal"] = "Madrigal";
effects["The Magical Mojomuscular Melody"] = "Mojo";
effects["Cletus's Canticle of Celerity"] = "Canticle";
effects["Power Ballad of the Arrowsmith"] = "Ballad";
effects["Polka of Plenty"] = "Polka";
effects["Jackasses' Symphony of Destruction"] = "Jackasses";
effects["Fat Leon's Phat Loot Lyric"] = "Phat";
effects["Brawnee's Anthem of Absorption"] = "Brawneeee's";
effects["Psalm of Pointiness"] = "Psalm";
effects["Stevedave's Shanty of Superiority"] = "Shanty";
effects["Aloysius' Antiphon of Aptitude"] = "Antiphon";
effects["Ode to Booze"] = "Ode";
effects["The Sonata of Sneakiness"] = "Sonata";
effects["Carlweather's Cantata of Confrontation"] = "Cantata";
effects["Ur-Kel's Aria of Annoyance"] = "Ur-Kel's";
effects["Dirge of Dreadfulness"] = "Dirge";
effects["The Ballad of Richie Thingfinder"] = "Thingfinder";
effects["Benetton's Medley of Diversity"] = "Medley";
effects["Elron's Explosive Etude"] = "Elron's";
effects["Chorale of Companionship"] = "Chorale";
effects["Prelude of Precision"] = "Prelude";
effects["Donho's Bubbly Ballad"] = "Donho's";
effects["Cringle's Curative Carol"] = "Cringle's";
effects["Inigo's Incantation of Inspiration"] = "Inigo's";

isAT["The Moxious Madrigal"] = 1;
isAT["The Magical Mojomuscular Melody"] = 1;
isAT["Cletus's Canticle of Celerity"] = 1;
isAT["Power Ballad of the Arrowsmith"] = 1;
isAT["Polka of Plenty"] = 1;
isAT["Jackasses' Symphony of Destruction"] = 1;
isAT["Fat Leon's Phat Loot Lyric"] = 1;
isAT["Brawnee's Anthem of Absorption"] = 1;
isAT["Psalm of Pointiness"] = 1;
isAT["Stevedave's Shanty of Superiority"] = 1;
isAT["Aloysius' Antiphon of Aptitude"] = 1;
isAT["Ode to Booze"] = 1;
isAT["The Sonata of Sneakiness"] = 1;
isAT["Carlweather's Cantata of Confrontation"] = 1;
isAT["Ur-Kel's Aria of Annoyance"] = 1;
isAT["Dirge of Dreadfulness"] = 1;
isAT["The Ballad of Richie Thingfinder"] = 1;
isAT["Benetton's Medley of Diversity"] = 1;
isAT["Elron's Explosive Etude"] = 1;
isAT["Chorale of Companionship"] = 1;
isAT["Prelude of Precision"] = 1;
isAT["Donho's Bubbly Ballad"] = 1;
isAT["Cringle's Curative Carol"] = 1;
isAT["Inigo's Incantation of Inspiration"] = 1;

// Other
effects["Go Get 'Em, Tiger!"] = "BenGal";
effects["Form of...Bird!"] = "Birdform";
effects["Billiards Belligerence"] = "Pool 1";
effects["Mental A-cue-ity"] = "A-cue-ity";
effects["Brother Corsican's Blessing"] = "Corsican's";
effects["Heart of White"] = "White";
effects["Heart of Green"] = "Green";
effects["Heart of Yellow"] = "Yellow";
effects["Heart of Pink"] = "Pink";
effects["Heart of Lavender"] = "Lavender";
effects["Heart of White"] = "White";
effects["Aspect of the Twinklefairy"] = "Twinkly Wad";
effects["On the Trail"] = " ";

// Mafia Specific
effects["Fortune Cookie"] = "Fortune";

effects["Semirare window begin"] = "SR Begin";
effects["Semirare window end"] = "SR End"; 

effects["Major Red Recharge"] = "<font color = red>Red</red>";
effects["Major Yellow Recharge"] = "<font color = #A6A600>Yellow</red>";
effects["Major Blue Recharge"] = "<font color = blue>Blue</red>";

if (window.location.pathname == "/charpane.php") {
	var i;
	var replaceText = "";
	var buffs = 0;

    var imgElements = document.getElementsByTagName("img");
    for (i = 0; i < imgElements.length; i++) {
        curImgElement = imgElements[i]; 

        var turnsLeft = curImgElement.parentNode.nextSibling;
		var imgTitle = curImgElement.getAttribute('title');

		if (imgTitle && turnsLeft && turnsLeft.innerHTML.indexOf("(") != -1) {
            turnsLeft.innerHTML = (effects[imgTitle] ? effects[imgTitle] : imgTitle) + " " + turnsLeft.innerHTML;
			// Record AT song information
			if (isAT[imgTitle]) {
				buffs++;
				replaceText += "<br>" + effects[imgTitle] + " (" + turnsLeft.firstChild.nextSibling.innerHTML + ")";
			}
        }
    }
	// Finish string modifications
	replaceText = "<font size=1><b>AT (" + buffs + "):</b>" + replaceText + "</font>";

	var linkNodes = document.getElementsByTagName("a");
	var replaceNode;
	
	var noMood = false;
	var runningMood = false;
	
	// Hackish way to see if they are running a mood
	for (i = 0; i < linkNodes.length; i++) {
		if (linkNodes[i].innerHTML.indexOf("save as mood") != -1) {
			noMood = true;
			replaceNode = linkNodes[i].parentNode;
			break;
		} else if (linkNodes[i].innerHTML.indexOf("mood") != -1) {
			runningMood = true;
			replaceNode = linkNodes[i].parentNode;
			break;
		}
	}
	
	// Create new <hr>
	var divider = document.createElement('hr');
	divider.setAttribute('width','50%');
	
	// Stuff to do if there is no mood
	if (noMood) {
		// Find <br><br>
		var firstBR = replaceNode.nextSibling;
		var secondBR = firstBR.nextSibling;
		
		// Delete one <br>
		secondBR.parentNode.removeChild(secondBR);
		
		// Add <hr>, and delete <br>
		firstBR.parentNode.insertBefore(divider, firstBR);
		firstBR.parentNode.removeChild(firstBR);
		
		// Add text
		replaceNode.innerHTML = replaceText;
	}
	
	// Stuff to do if they are running a mood
	else if (runningMood) {
		// Create the new AT summary node
		var afterMood = document.createElement("font");
		afterMood.setAttribute('size',2);
		afterMood.setAttribute('color','black');
		afterMood.innerHTML = replaceText;
	
		var sharedParent = replaceNode.parentNode;
	
		// Add them both after the already included <br><br>
		sharedParent.insertBefore(afterMood, replaceNode.nextSibling.nextSibling.nextSibling);
		sharedParent.insertBefore(divider, afterMood.nextSibling);
	}
}
