// ==UserScript==
// @name           Neuroticpunk's Dropdown Menu of Crap
// @namespace      http://userscripts.org/users/68287/scripts
// @description    blatant ripoff of Clump's BirdAid script, dropdown menu that includes some inventory items for quick access
// @include        http://*kingdomofloathing.com/charpane.php
// @include        http://127.0.0.1:/charpane.php
// @exclude        http://forums.kingdomofloathing.com/*
// ==/UserScript==

//Version 1.2
//Updates
//1.1 Just a few items added to the list
//1.2 Organized the items into groups and alphabetized them...got rid of the boobie references, I think

//TODO:  Add more items, perhaps groups, or maybe start a 2nd menu to keep them from getting too long.  Find a way to check for version updates.  
       //Reinstate boobie references, find a way to load only the items in inventory
       
var selections = new Array ("Pull my Finger", "***ALTERED STATES***", "Absinthe", "Astral Mushroom", "Gong", "***HP RESTORE***", "Drastic Healing", "***HP/MP RESTORE***", "Magi-Wipes", "Phonics Down", "Tiny House", "Vangoghbitussin", "***MP RESTORE***", "Cloaca-Cola", "Dyspepsi-Cola", "Monsieur Bubble", "Oscus's Soda", "Soda Water", "Superseltzer", "Water Lily", "***MUNCHIES***", "Milk of Magnesium", "Munchies Pill", "***BOOZING***", "Divine Flute" );
var numbers = new Array ("", "", "2655", "1622", "3353", "", "595", "", "2616", "593", "592", "1950", "", "1334", "347", "1965", "3393", "1003", "345", "2600", "", "1650", "1619", "", "3123" );

// heavily modified from an example on a website
function createBox(parent) {
    myform=document.createElement("form");

    select = document.createElement('select');

    for (var i=0; i<selections.length; i++) {
        var option = document.createElement('option');
        var theText=document.createTextNode(selections[i]);
        option.appendChild(theText);
        if (i == 0) option.setAttribute('selected',1);
        option.value = numbers[i];
        select.appendChild(option);
    }
    myform.appendChild(select);

    select.setAttribute('onchange', 'var s = document.getElementById("selectBoobage"); var sid=s.selectedIndex; if (sid>0) {s.selectedIndex=0; if (top.mainpane.focus) top.mainpane.focus(); parent.mainpane.location.href="/inv_use.php?pwd="+pwdhash+"&which=3&whichitem="+s.options[sid].value; }');

    select.setAttribute("border","5px");
    select.setAttribute('style','width:85%;font-size:11px;');
    select.setAttribute("id","selectBoobage");
    myform.setAttribute("id","formBoobage");

    var x = document.createElement('tr');
    var y = document.createElement('td');
    y.setAttribute("colspan","2");
    x.appendChild(y);
    y.appendChild(myform);

    parent.insertBefore(x,parent.firstChild);
}

function fixpage() {
    var spot =  document.getElementById('rollover');
    if (spot && spot.nextSibling && spot.nextSibling.firstChild) {
        createBox(spot.nextSibling.firstChild);
    }
}

fixpage();
