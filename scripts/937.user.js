// CivGlossary
// version 0.9.1 BETA!
// 2005-05-04
// Copyright (c) 2005, Michael jervis
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Based in part on "DumbQuotes" by Mark Pilgrim
// http://diveintomark.org/projects/greasemonkey/dumbquotes.user.js
// --------------------------------------------------------------------
//
//
//    INSTALLATION INSTRUCTIONS
//
//    This is a Greasemonkey user script.
//
//    To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
//    Install and then restart Firefox and revisit this script.
//
//    Under Tools, there will be a new menu item to "Install User Script".
//    Accept the default configuration and install.
//
//    To uninstall, go to Tools/Manage User Scripts,
//    select "CivGlossary", and click Uninstall.
//
//
// --------------------------------------------------------------------
//
//	This tooltips any civ glossary term found in the array below on the
//	CivFanatics.com forums. Originally, it worked across the entire site on
//	all text nodes, but, this was incredibly slow and broke some formatting.
//  so i've restricted it to the forums, on the showthread pages.
//
// ==UserScript==
// @name           CivGlossary
// @namespace      http://fuckingbrit.com/greasmonkey
// @description    Tooltips civ glossary terms.
// @include        http://forums.civfanatics.com/showthread*
// ==/UserScript==
(function() {
	var regex, key, textnodes, postenode, node, j, i, s;
	/* Abbreviations to translate: */
	var abbrev = new Array()
	abbrev['AI'] = 'Artificial Intelligence, computer player';
	abbrev['AW'] = 'Always War';
	abbrev['Barbs'] = 'Barbarians';
	abbrev['Beeline'] = 'Going directly towards a technology ignoring others';
	abbrev['BOSOF'] = 'Big Ole Stack O\' Frigates';
	abbrev['C3C'] = 'Civilization 3: Conquests';
	abbrev['Civ'] = 'Civilization';
	abbrev['Commie'] = 'Communism';
	abbrev['CPT'] = 'Culture per turn';
	abbrev['DG'] = 'Demogame/Demi-god';
	abbrev['Flip'] = 'Cultural conversion';
	abbrev['FP'] = 'Forbidden Palace/Flood plain';
	abbrev['GA'] = 'Golden Age/Ginger Ale';
	abbrev['GL'] = 'Great Leader OR Great Library/Great Lighthouse';
	abbrev['GOTM'] = 'Game of the Month';
	abbrev['gov'] = 'Government';
	abbrev['GPT'] = 'Gold per Turn';
	abbrev['HOF'] = 'Hall of Fame';
	abbrev['HP'] = 'Hit Point';
	abbrev['ICS'] = 'Infinite City Sprawl';
	abbrev['IA'] = 'Industrial Age';
	abbrev['JW'] = 'Jaguar Warrior';
	abbrev['Lux'] = 'Luxury resource';
	abbrev['Lux Tax'] = 'The happiness slider';
	abbrev['MA'] = 'Modern Armor/Medieval Age/Modern Age/Military Alliance';
	abbrev['MDI'] = 'Medieval Infantry';
	abbrev['MGL'] = 'Military Great Leader';
	abbrev['MI'] = 'Mechanized Infantry';
	abbrev['Milking'] = 'The tedious art of score maximization';
	abbrev['MOW'] = 'Mounted Oscillating War/Man-o-War ';
	abbrev['MP'] = 'Military Police/Multiplayer';
	abbrev['MPP'] = 'Mutual Protection Pact';
	abbrev['MW'] = 'Mounted Warrior';
	abbrev['NES'] = 'Never Ending Story';
	abbrev['NM'] = 'Numidian Mercenary';
	abbrev['NOW'] = 'Non-oscillating war';
	abbrev['NOT'] = 'No Optional Techs';
	abbrev['OCC'] = 'One City Challenge';
	abbrev['OCP'] = 'Optimal City Placement';
	abbrev['pop'] = 'Population';
	abbrev['poprush'] = 'rushing a project by killing citizens, like in Despotism, Feudalism, Communism, and I think, Fascism.';
	abbrev['pRNG'] = 'Pseudo Random number generator';
	abbrev['PTW'] = 'Play the World';
	abbrev['RCP'] = 'Ring City Placement';
	abbrev['REX'] = 'Rapid Early eXpansion';
	abbrev['RL'] = 'Real life, as opposed to Civ life. ()';
	abbrev['RNG'] = 'Random Number Generator';
	abbrev['ROP'] = 'Right of Passage';
	abbrev['ROP Rape'] = 'Using a Right of Passage agreement to sneak attack your enemy.';
	abbrev['SG'] = 'Succession Game';
	abbrev['SGL'] = 'Scientific Great Leader';
	abbrev['SHOF'] = 'Scenario Hall of Fame';
	abbrev['SOD'] = 'Stack of Doom';
	abbrev['SoZ'] = 'Staue of Zeus';
	abbrev['SPT'] = 'Shields per turn';
	abbrev['SS'] = 'Space Ship';
	abbrev['SW'] = 'Small Wonder';
	abbrev['ToA'] = 'Temple of Artemis';
	abbrev['ToE'] = 'Theory of Evolution';
	abbrev['UU'] = 'Unique Units, Civ-Specific Units';
	abbrev['vanilla'] ='This refers to the plain version of the game, w/o expansion packs. ';
	abbrev['VP'] = 'Victory Point';
	abbrev['VPL'] = 'Victory Point Location';
	abbrev['Whipping'] = 'Rush build using city population (under despotism and communism in Civ3)';
	abbrev['WLTKD'] = 'We love the king day';
	abbrev['WoW'] = 'Wonder of the World';
	abbrev['WW'] = 'War Weariness';
	abbrev['ZOC'] = 'Zone of Control';


    regex = {};
    for (key in abbrev) {
        regex[key] = new RegExp(key, 'g');
    }

    postnodes = document.evaluate(
        "//body//td[@class='alt1']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (i = 0; i < postnodes.snapshotLength; i += 1) {
      postnode = postnodes.snapshotItem(i);

      textnodes = document.evaluate(
      							'.//text()',
      							postnode,
      							null,
      							XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      							null);
      for (j = 0; j < textnodes.snapshotLength; j++)
      {
      	node = textnodes.snapshotItem(j);
      	span = document.createElement('span');
      	s = node.data;
      	if (trim(s) != '')
      	{
	      	for (key in abbrev) {
						s = s.replace(regex[key], '<span title="' + abbrev[key] + '" style="display: inline;background-color: yellow;">' + key + '</span>');
	      	}
	      	span.innerHTML = s;
	      	node.parentNode.replaceChild(span, node);
	      }
      }


    }

    function trim(inputString) {
   // Removes leading and trailing spaces from the passed string. Also removes
   // consecutive spaces and replaces it with one space. If something besides
   // a string is passed in (null, custom object, etc.) then return the input.
   if (typeof inputString != "string") { return inputString; }
   var retValue = inputString;
   var ch = retValue.substring(0, 1);
   while (ch == " ") { // Check for spaces at the beginning of the string
      retValue = retValue.substring(1, retValue.length);
      ch = retValue.substring(0, 1);
   }
   ch = retValue.substring(retValue.length-1, retValue.length);
   while (ch == " ") { // Check for spaces at the end of the string
      retValue = retValue.substring(0, retValue.length-1);
      ch = retValue.substring(retValue.length-1, retValue.length);
   }
   while (retValue.indexOf("  ") != -1) { // Note that there are two spaces in the string - look for multiple spaces within the string
      retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ")+1, retValue.length); // Again, there are two spaces in each of the strings
   }
   return retValue; // Return the trimmed string back to the user
} // Ends the "trim" function
})();