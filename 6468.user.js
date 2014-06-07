// ==UserScript==
// @name                NW Exploration Badge Checklist
// @namespace           
// @description         Scans the profile list of badges and generates a checklist
// @include             http://www.nexuswar.com/characters/view.do?characterID=*
// @include             http://nexuswar.com/characters/view.do?characterID=*
// ==/UserScript==

if (!document.getElementById("profilevitals")) return;

var badgenode = document.getElementById("profilevitals")
                  .childNodes[1] // table
                  .childNodes[1] // tbody
                  .childNodes[0] // tr
                  .childNodes[3] // td
                  .lastChild // [text]
                  .previousSibling // table
                  .childNodes[1] // tbody
                  .lastChild // [text]
                  .previousSibling // tr
                  .childNodes[1];// td
var userbadgelist = badgenode.firstChild.data;

// exploration badge list
var badges = new Array(40);
badges[0]  = "All Hope Abandon";
badges[1]  = "All-Seeing";
badges[2]  = "Big Bang";
badges[3]  = "Boiling Caldera";
badges[4]  = "Bosun's Mate";
badges[5]  = "Bulletridden";
badges[6]  = "Callihan's";
badges[7]  = "Cannonball";
badges[8]  = "Captain Clucky's";
badges[9]  = "Cromahl-Hult";
badges[10] = "Entombed";
badges[11] = "Eresius' Rest";
badges[12] = "Fall of the Watcher";
badges[13] = "Flight 19";
badges[14] = "Fortified";
badges[15] = "Galmath";
badges[16] = "Iron Juggernaut";
badges[17] = "Kafa-El's Fall";
badges[18] = "Land Ho!";
badges[19] = "Liberation";
badges[20] = "Nightengale Murder";
badges[21] = "Prime Ministries";
badges[22] = "Reflective";
badges[23] = "Ridley House";
badges[24] = "Rudolphus";
badges[25] = "Serial Killer";
badges[26] = "Shades of Grey";
badges[27] = "Skull Cult";
badges[28] = "Snowbound";
badges[29] = "The Crypt of Maeval";
badges[30] = "The Dead Juggernaut";
badges[31] = "The End of Haldos";
badges[32] = "The Nephilim";
badges[33] = "The Silent Battlefield";
badges[34] = "The Silent Voice";
badges[35] = "The Swinging Body";
badges[36] = "Thrown From Horseback";
badges[37] = "Uncooked";
badges[38] = "Uriel's Posting";
badges[39] = "Wretched Angel";

var badgecount = 0;
var badgechecklist = "<ul>";

for (i=0;i<badges.length;i++) {
  if (userbadgelist.indexOf(badges[i])!=-1) {
    badgechecklist += "<li style=\"color: #ccc;\"><del>"+badges[i]+"</del></li>";
    badgecount++;
  }
  else {
    badgechecklist += "<li>"+badges[i]+"</li>";
  }
}
badgechecklist += "</ul>"+badgecount+" out of "+badges.length+" Exploration Badges";
badgenode.innerHTML += badgechecklist;