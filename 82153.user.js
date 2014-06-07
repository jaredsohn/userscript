// ==UserScript==
// @name			AT Song Summary
// @description		By NatNit
// @include			*kingdomofloathing.com/charpane.php
// @include			*127.0.0.1:*/charpane.php
// @exclude			*forums.kingdomofloathing.com*
// ==/UserScript==

// I have the added the functionality of a short AT buff sumary before all buffs
// that lists how many AT songs you have running, which ones, and the remaining
// turncount for each song.

// Changelog:

var isAT = [];
var nick = [];

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

nick["The Moxious Madrigal"] = "Madrigal";
nick["The Magical Mojomuscular Melody"] = "Mojo";
nick["Cletus's Canticle of Celerity"] = "Canticle";
nick["Power Ballad of the Arrowsmith"] = "Ballad";
nick["Polka of Plenty"] = "Polka";
nick["Jackasses' Symphony of Destruction"] = "Jackasses";
nick["Fat Leon's Phat Loot Lyric"] = "Phat";
nick["Brawnee's Anthem of Absorption"] = "Brawneeee's";
nick["Psalm of Pointiness"] = "Psalm";
nick["Stevedave's Shanty of Superiority"] = "Shanty";
nick["Aloysius' Antiphon of Aptitude"] = "Antiphon";
nick["Ode to Booze"] = "Ode";
nick["The Sonata of Sneakiness"] = "Sonata";
nick["Carlweather's Cantata of Confrontation"] = "Cantata";
nick["Ur-Kel's Aria of Annoyance"] = "Ur-Kel's";
nick["Dirge of Dreadfulness"] = "Dirge";
nick["The Ballad of Richie Thingfinder"] = "Thingfinder";
nick["Benetton's Medley of Diversity"] = "Medley";
nick["Elron's Explosive Etude"] = "Elron's";
nick["Chorale of Companionship"] = "Chorale";
nick["Prelude of Precision"] = "Prelude";
nick["Donho's Bubbly Ballad"] = "Donho's";
nick["Cringle's Curative Carol"] = "Cringle's";
nick["Inigo's Incantation of Inspiration"] = "Inigo's";


if (window.location.pathname == '/charpane.php') {
	var i;
	var replaceText = "";
	var buffs = 0;

    var imgElements = document.getElementsByTagName('img');
	
    for (i = 0; i < imgElements.length; i++) {
	
        curImgElement = imgElements[i];
		
		// Only keep images with an effect onclick attribute
		onclick = curImgElement.getAttribute('onclick');
		if (!onclick || onclick.indexOf('eff') == -1) {
			continue;
		}
		
		// Messy work to parse out buff name and "the rest" (which includes turns of effect)
		buffinfo = curImgElement.parentNode.nextSibling.firstChild.innerHTML;
		start_link = buffinfo.indexOf(' (<a');
		effect_name = buffinfo.substring(0,start_link);
		
		if (!isAT[effect_name]) {
			continue;
		}
		
		// Parse out turns remaining from buff info
		var re = new RegExp('([0-9]+)</a>','ig');
		matches = re.exec(buffinfo);
		turns_left = matches[1];
		
		// Generate list of AT Songs
		buffs++;
		replaceText += "<br>" + nick[effect_name] + " (" + turns_left + ")";
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
	
	// Create new <hr>s
	var divider1 = document.createElement('hr');
	var divider2 = document.createElement('hr');
	divider1.setAttribute('width','50%');
	divider2.setAttribute('width','50%');

	// Modify this to a mafia check perhaps?
	if (noMood || runningMood) {
	
		// Create the new AT summary node
		var after_mood = document.createElement("font");
		after_mood.setAttribute('size',2);
		after_mood.setAttribute('color','black');
		after_mood.innerHTML = replaceText;
	
		var sharedParent = replaceNode.parentNode;
	
		// Add it all to the end
		sharedParent.insertBefore(divider1, replaceNode.nextSibling.nextSibling);
		sharedParent.insertBefore(after_mood, divider1.nextSibling);
		sharedParent.insertBefore(divider2, after_mood.nextSibling);
	}
}