// ==UserScript==
// @name                NW Exploration Badge Sorter
// @namespace           
// @description         Scans the list of badges and determines which exploration badges are missing
// @include             http://www.nexuswar.com/characters/view.do?characterID=*
// @include             http://nexuswar.com/characters/view.do?characterID=*
// ==/UserScript==

// exploration badge list
var badgelist = new Array(40);

badgelist[0] = "All Hope Abandon";
badgelist[1] = "All-Seeing";
badgelist[2] = "Big Bang";
badgelist[3] = "Boiling Caldera";
badgelist[4] = "Bosun's Mate";
badgelist[5] = "Bulletridden";
badgelist[6] = "Callihan's";
badgelist[7] = "Cannonball";
badgelist[8] = "Captain Clucky's";
badgelist[9] = "Cromahl-Hult";
badgelist[10] = "Entombed";
badgelist[11] = "Eresius' Rest";
badgelist[12] = "Fall of the Watcher";
badgelist[13] = "Flight 19";
badgelist[14] = "Fortified";
badgelist[15] = "Galmath";
badgelist[16] = "Iron Juggernaut";
badgelist[17] = "Kafa-El's Fall";
badgelist[18] = "Land Ho!";
badgelist[19] = "Liberation";
badgelist[20] = "Nightengale Murder";
badgelist[21] = "Prime Ministries";
badgelist[22] = "Reflective";
badgelist[23] = "Ridley House";
badgelist[24] = "Rudolphus";
badgelist[25] = "Serial Killer";
badgelist[26] = "Shades of Grey";
badgelist[27] = "Skull Cult";
badgelist[28] = "Snowbound";
badgelist[29] = "The Crypt of Maeval";
badgelist[30] = "The Dead Juggernaut";
badgelist[31] = "The End of Haldos";
badgelist[32] = "The Nephilim";
badgelist[33] = "The Silent Battlefield";
badgelist[34] = "The Silent Voice";
badgelist[35] = "The Swinging Body";
badgelist[36] = "Thrown From Horseback";
badgelist[37] = "Uncooked";
badgelist[38] = "Uriel's Posting";
badgelist[39] = "Wretched Angel";

var insertbadgelist;
var badgecount = 0;

// traverse the DOM tree to the table cell with badges
// (1)  table
// (1)  tbody
// (0)  tr
// (3)  td
// (26) table
// (1)  tbody
// (10) tr
// (1)  td
// (0)  text

var badgenode = document.getElementById("profilevitals").childNodes[1].childNodes[1].childNodes[0].childNodes[3].lastChild.previousSibling.childNodes[1].lastChild.previousSibling.childNodes[1];
var userbadgelist = badgenode.firstChild.data;

function checkbadges() {
  // no badges
  if (userbadgelist.search(/None/) != -1) {
    return;
  }

  insertbadgelist = "<ul>";
  for (i=0;i<badgelist.length;i++) {
    if (userbadgelist.indexOf(badgelist[i]) != -1) {
        insertbadgelist += "<li style=\"color: #ccc;\"><del>"+badgelist[i]+"</del></li>";
        badgecount++;
    }
    else {
      insertbadgelist += "<li>"+badgelist[i]+"</li>";
    }
  }
  insertbadgelist += "</ul>"+badgecount+" out of 40 Exploration Badges";
  badgenode.innerHTML += insertbadgelist;

  return;
}

checkbadges();