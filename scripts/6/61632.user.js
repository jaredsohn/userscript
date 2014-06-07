// csemaj's KoL Script
// Copyright (c) 2008, James Cammarata
// Based on code written by Byung Kim (Tard) http://kol.dashida.com and OneTonTomato's scripts
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Hobocode Checker Script
// @namespace      http://www.sngx.net
// @include        *kingdomofloathing.com/questlog.php*
// @include        *127.0.0.1:*/questlog.php*
// @description    Version 0.0.2
// ==/UserScript==


/********************************** Change Log **********************************************
* 8/5/2008 - 0.0.2
- Removed the quest log specific page from the @include section

* 8/4/2008 - 0.0.1
- Released first version, 0.0.1

TODOS:

********************************************************************************************/

//
// Functions
//

function findTable() {
  nodes = document.getElementsByTagName("table");
  if(nodes) return nodes[2];
  else return null;
}

function updateMissingHoboCodes() {
   targetNode = findTable();
   if(targetNode == null) return;

   // Append a new set of nodes before the last pnode.
   // We will append codes that are missing there
   var newnode_ul = document.createElement("ul");
   var newnode_tr = document.createElement("tr");
   var newnode_td = document.createElement("td");
   
   newnode_td.appendChild(document.createTextNode("Here are the hobo glyphs you are missing:"));
   newnode_td.appendChild(newnode_ul);
   newnode_tr.appendChild(newnode_td);

   var missingsome = 0;
   for(i=0;i<hoboCodeLocations.length;i++) {
      // if this is a tattoo gif add a text node after the image node
      if(textBody.indexOf(hoboCodeLocations[i]) < 0) {
         // append a new list item node to the list
         var newnode_li = document.createElement("li");
         newnode_li.appendChild(document.createTextNode(hoboCodeLocations[i]));
         newnode_ul.appendChild(newnode_li);
         missingsome = 1;
      }
   }

   if(!missingsome) {
      // we have them all, tell the user so!
      var newnode_li = document.createElement("li");
      newnode_li.appendChild(document.createTextNode("You have them all!!!"));
      newnode_ul.appendChild(newnode_li);
   }

   //targetNode.parentNode.insertBefore(newPNode,pnode);
   targetNode.appendChild(newnode_tr);
}

//
// Globals
//

var nodeBody   = document.getElementsByTagName("body").item(0);
var textBody   = "";
var baseURL    = "";

hoboCodeLocations = [
  "The Penultimate Fantasy Airship",
  "The \"Fun\" House",
  "The Enormous Greater-Than Sign",
  "The Hippy/Frat Battlefield",
  "The Arid, Extra-Dry Desert",
  "The Sleazy Back Alley",
  "Thugnderdome",
  "Belowdecks",
  "The Bugbear Pen",
  "The Defiled Nook",
  "The Poker Room",
  "The Road to White Citadel",
  "Noob Cave",
  "Cobb's Knob Menagerie, Level 3",
  "The Limerick Dungeon",
  "The Lair of the Ninja Snowmen",
  "The Misspelled Cemetary",
  "The eXtreme Slope",
  "The Cola Wars Battlefield",
  "Camp Logging Camp",
]

//
// Main Body Execution
//

if (nodeBody) {
   if (nodeBody.textContent) {
      textBody = nodeBody.textContent;
   }
   else if (nodeBody.text) {
      textBody = nodeBody.text;
   }

   baseURL = nodeBody.baseURI.substring(0,nodeBody.baseURI.lastIndexOf('/')+1);

   if (textBody.indexOf('You have found hobo glyphs in the following zones') >= 0) {
      updateMissingHoboCodes();
   }
}

