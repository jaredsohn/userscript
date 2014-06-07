// ==UserScript==
// @name           Familiar Early Warning System
// @namespace      kol.interface.unfinished
// @description    Nags you when you do things without a specified familiar in Kingdom of Loathing (KOL). Select the familiar to lock in from the familar name management page.
// @include        http://*kingdomofloathing.com/*
// @include        http://127.0.0.1:*
// @exclude        forums.kingdomofloathing.com/*
// ==/UserScript==

//Version 1.2.1
// (1.1) fixed a variable scoping problem causing excess nags
// (1.2) much improved: now nags before you do something rather
//       than after.  Doesn't nag for tower familiars, arena, and 
//       noob cave.
// (1.2.1) traps eating black puddings, using a drum machine, and
//       cap'm caronch's map.
// Known Limitations:
//  * Fernswarthy's basement is not trapped by this.
//  * Renaming familiars can be confusing: if you need to rename a
//    familiar: unlock your familiar, rename it, leave the manage
//    familiar names screen and then return to it, then relock your 
//    familiar.

var playerName;

////////////////////////////////////////////////////////////////////////////////
// stolen and adapted from Anti-Marty's fortune cookie script
////////////////////////////////////////////////////////////////////////////////
// parse the char pane for the player name
// revised version! now taken directly from kolpreviousnadventures to handle compact mode
function getPlayerNameFromCharpane() {
    var username = document.getElementsByTagName("b");
    if (!username || username.length < 1) return false;
    username = username[0];
    if (!username) return false;
    username = username.firstChild;
    if (!username) return false;
    // in full mode the link is <a><b>Name</b></a>
    // in compact mode it's <b><a>Name</a></b>
    // so have to handle this, and also can use it to tell
    // whether it's in compact mode or not.
    var fullmode = true;
    while (username && username.nodeType == 1)
    {
        username = username.firstChild;
        fullmode = false;
    }
    if (!username) return false;
    username = username.nodeValue;
    if (!username) return false;
    username = username.toLowerCase();
    //alert("found username " + username + ", fullmode: " + fullmode);
    GM_setValue("currentPlayer", username);  // store for other functions that need to know who's playing
    playerName=username;
    //return {'username': username, 'fullmode': fullmode};
}


function getMyFamiliar() {
    var name = GM_getValue("currentPlayer"); 
    var fam = GM_getValue(name+"__familiar","");
    return fam;
}

function setMyFamiliar(val) {
    var playerName = GM_getValue("currentPlayer");
    GM_setValue(playerName+"__familiar",val);
}

function receiveName() {
    var chosen=this.getAttribute('famName');
    var selected = prompt("Lock in familiar (blank to reset):\n", chosen);
    if (selected!=null) {
        setMyFamiliar(selected);
        top.frames[1].location.reload();
        window.location.reload();
    }
}

function familiarPage() {
    var curFam = getMyFamiliar();
    var addHere = document.getElementsByTagName("input");
    for (var j=0; j<addHere.length; j++) {
        var struct = addHere[j];
        if (struct.getAttribute('type')!='text')
            continue;
        
        var newElement = document.createElement("img");
        var operation='';
        if (struct.getAttribute('value')==curFam) {
            newElement.setAttribute('src','http://images.kingdomofloathing.com/itemimages/padlock.gif');
            operation='un';
        } else {
            newElement.setAttribute('src','http://images.kingdomofloathing.com/itemimages/openpadlock.gif');
        }
        newElement.setAttribute('width','30');
        newElement.setAttribute('height','30');
        newElement.setAttribute("title", 'Click to '+operation+'lock familiar');
        newElement.setAttribute("famName", struct.getAttribute('value'));
        newElement.addEventListener("click", receiveName, true);
        newElement.align = "center";
    
        struct.parentNode.nextSibling.insertBefore(newElement,struct.parentNode.nextSibling.firstChild);
    }
}


function checkFamiliar() {
    var playerName = GM_getValue("currentPlayer");
    var addHere = document.getElementsByTagName("a");
    for (var j=0; j<addHere.length; j++) {
        var cell = addHere[j];
        if (cell.getAttribute('href')=='familiar.php') {
            if (cell.firstChild.firstChild!=null && cell.firstChild.firstChild.firstChild!=null) {
                var curfam = cell.firstChild.firstChild.firstChild.nodeValue;
                //GM_log("curfam is "+curfam);
                var storedfam = getMyFamiliar();
                if (storedfam!='' && curfam!=storedfam) {
                    GM_setValue(playerName+"__familiarStatus","bad");
                    //alert(storedfam+" is not your familiar!");
                } else {
                    GM_setValue(playerName+"__familiarStatus","ok");
                }
                break;
            }
        }
    }
}


function rewriteLinks() {
    var playerName = GM_getValue("currentPlayer");
    if (GM_getValue(playerName+"__familiarStatus","ok")=="ok")
        return;
    var addHere = document.getElementsByTagName("a");
    for (var j=0; j<addHere.length; j++) {
        var link = addHere[j];
        var site = link.getAttribute('href');
        if (!site)
            continue;
        if (site.indexOf('adventure.php?snarfblat=')>=0 || // most adventures
            site.indexOf('hiddencity.php?which=')>=0 || // hidden city
            site.indexOf('dungeon.php')>=0 || // daily dungeon has some combats
            site.indexOf('cyrpt.php')>=0 || // defiled cyrpt
            site.indexOf('barrel.php?smash=')>=0 || // barrels have mimics
            site.indexOf('lair6.php?place=2')>=0 || // shadow (1 is shard)
            site.indexOf('lair6.php?place=5')>=0 || // sorceress (3,4 are familiars)
            site.indexOf('lair6.php?place=6')>=0 || // free the king
            site.indexOf('ascend.php')>=0 || // and ascend that way too!
            site.indexOf('javascript:document.form')>=0 || // thugnerdome, lair, bat cave, etc
            (site.indexOf('inv_eat.php?')>=0 && site.indexOf('&which=1&whichitem=2338')>=0) || // black pudding
            (site.indexOf('inv_use.php?')>=0 && site.indexOf('&which=3&whichitem=2328')>=0) || // drum machine
            (site.indexOf('inv_use.php?')>=0 && site.indexOf('&which=3&whichitem=2950')>=0) // Cap'm Caronch's Map
            ) {
            if (site!='adventure.php?snarfblat=91') // exclude noob cave
                link.addEventListener('click',adventureProtect,false);
        }
    }
}

// event listener for adventure links
function adventureProtect(e) {
    var storedfam = getMyFamiliar();
    if (storedfam!="") {
        alert("Warning: " + storedfam + " is not your familiar!\n(click again to go anyway)");
    }
    this.removeEventListener("click",adventureProtect,false);
    e.preventDefault();
}

if(window.location.pathname=='/charpane.php') {
    getPlayerNameFromCharpane();
    checkFamiliar();
    rewriteLinks();
} else if(window.location.pathname=='/familiarnames.php') {
    familiarPage();
} else {
    rewriteLinks();
}
