// ==UserScript==
// @name           SP Tab Renamer
// @namespace      http://userscripts.org/users/434615
// @description    Makes useful tab names for Star Pirates
// @version        1.0
// @license	   GPLv3
// @include        *starpirates.net/*
// @exclude        http://www.starpirates.net/
// @exclude        *starpirates.net/index.php*
// @exclude        *starpirates.net/forums*
// ==/UserScript==

page = window.location.href.replace("http://www.starpirates.net/", "")

//start with static names:
if (page == "city.php") {
    title = "Station"
} else if (page == "travel.php") {
    title = "Navigation"
} else if (page == "questlist.php") {
    title = "Mission"
} else if (page == "buildquest.php") {
    title = "Mission"
} else if (page == "salvage.php") {
    title = "Salvage Foray"
} else if (page == "mini_missions.php") {
    title = "Jobs and Tasks"
} else if (page == "contactlist.php") {
    title = "Contacts"
} else if (page == "journal.php") {
    title = "Captain's Log"
} else if (page == "halloffame.php") { //HoF landing page only
    title = "Hall of Fame"
} else if (page == "gang.php") {
    title = "My Fleet"
} else if (page == "rpsgame.php") {
    title = "ASL"
} else if (page == "gang_list.php") {
    title = "Fleet List"

//then variable names:
} else if (page.match(/viewgang/)) {
    fleetid = "//a[@href='viewgang.php?id=" + page.slice(16) + "']"
    fleetname = document.evaluate(fleetid, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML
    if (fleetname.match(/<b>/)) { //unbold owners
        title = "[" + fleetname.slice(4,-5) + "]"
    } else {
        title = fleetname
    }
} else if (page.match(/equip/)) {
    title = "Inventory"
    //This is only for restoring builds, could be changed to specify which
} else if (page.match(/halloffame/)) {
    title = page.replace("halloffame.php?view=", "")
    title = "HoF: " + title.charAt(0).toUpperCase() + title.slice(1);
    //separate this out for each HoF?
} else if (page.match(/profiles/)) {
    title = document.getElementById("nameT").innerHTML.slice(0,-4).replace(/<a.*"link">/, "")
} else if (page.match(/attack/)) {
    playerid = "//a[@href='profiles.php?id=" + page.replace(/&.*/, "").slice(18) + "']"
    playername = document.evaluate(playerid, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
    if (playername) { //playername is null if not on page
        title = "Attack " + playername.innerHTML
    } else {
        title = "Failed to Attack"  
          //will display if you cannot attack (captcha, out of energy, etc.)
          //does not account for problems with target (cloaked, in shipyard)
    }
} else if (page.match(/npencounter/)) {
    title = "Asteroid Belt"
} else {
    title = page.charAt(0).toUpperCase() + page.slice(1)
    title = title.replace(/\.php.*/, "")
    //handles Research, Inventory (but not equip), Search, Bank, Lottery, Events
}

document.title = title + " | Star Pirates"

