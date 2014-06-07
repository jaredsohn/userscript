// ==UserScript==
// @name           Colour Bag
// @namespace      kol.interface.unfinished
// @description    Lets you colour inventory text in KOL.  Click on inventory item text to rotate colours.
// @include        http://*kingdomofloathing.com/inventory.php*
// @include        http://*kingdomofloathing.com/storage.php*
// @include        http://*kingdomofloathing.com/managestore.php*
// @include        http://*kingdomofloathing.com/multiuse.php*
// @include        http://*kingdomofloathing.com/managecollection.php*
// @include        http://*kingdomofloathing.com/town_sellflea.php*
// @include        http://*kingdomofloathing.com/wand.php*
// @include        http://*kingdomofloathing.com/familiar.php*
// @include        http://*kingdomofloathing.com/craft.php*
// @include        http://*kingdomofloathing.com/knoll.php*
// @include        http://*kingdomofloathing.com/hiddencity.php*
// @include        http://*kingdomofloathing.com/closet.php*
// @include        http://*kingdomofloathing.com/clan_stash.php*
// @include        http://*kingdomofloathing.com/lair*
// @include        http://*kingdomofloathing.com/fight.php*
// @include        http://*kingdomofloathing.com/town_right.php?place=untinker*
// @include        http://*kingdomofloathing.com/account.php
// @include        http://127.0.0.1:*/inventory.php*
// @include        http://127.0.0.1:*/storage.php*
// @include        http://127.0.0.1:*/managestore.php*
// @include        http://127.0.0.1:*/multiuse.php*
// @include        http://127.0.0.1:*/managecollection.php*
// @include        http://127.0.0.1:*/town_sellflea.php*
// @include        http://127.0.0.1:*/wand.php*
// @include        http://127.0.0.1:*/familiar.php*
// @include        http://127.0.0.1:*/craft.php*
// @include        http://127.0.0.1:*/knoll.php*
// @include        http://127.0.0.1:*/hiddencity.php*
// @include        http://127.0.0.1:*/closet.php*
// @include        http://127.0.0.1:*/clan_stash.php*
// @include        http://127.0.0.1:*/lair*
// @include        http://127.0.0.1:*/fight.php*
// @include        http://127.0.0.1:*/town_right.php?place=untinker*
// @include        http://127.0.0.1:*/account.php
// @version        2.1
// ==/UserScript==

// Version 2.1
// - now allows colours to be set in Hagnk's
// - added a lock option to avoid accidental re-settings
// Version 2.0.1
//  - added fight page so combat items are coloured (old style combat only)
// Version 2.0
//  - major redesign, now based on item id instead of descitem
//  - now applies to many more lists
//  - now applies when extra drop-downs are created (mall, collection, etc)
//  - now applies to recently equipped list
//  - as a tradeoff, colour does not show up in actual equipped items any more
// Version 1.1
//  - now colours items in many lists (Hagnks, mall, zapping, flea market)
// Version 1.0

// Feel free to add or remove colour names.
// (the first entry is special, don't change it.)
var colourarray = ['','red','green','blue','orange', 'brown', 'purple', 'steelblue', 'silver', 'seagreen', 'SandyBrown', 'crimson' ];

// attribute name for storing colour in clickable entries
var tddcolour='colourbagcolour';
// attribute name for storing item id in clickable entries
var tdditemid='colourbagitem';
// id of script holding inserted css text
var finalcssid='colourbagcssid';
// greasemonkey global var for storing colour list
var clist='colourlist2';

// permanent storage, and update the current css
function saveColourlist(cl) {
    var s = '';
    for (var d in cl) {
        if (cl[d])
            s += d+':'+cl[d]+';';
    }
    GM_setValue(clist,s);
    createCss(cl);
}

// load the colourlist; consists of itemid:colour pairs
function loadColourlist() {
    var colourlist={};
    var s = GM_getValue(clist,'');
    if (s!='') {
        var sp = s.split(';');
        for (var i=0;i<sp.length;i++) {
            var r = sp[i].split(':');
            if (r.length==2) {
                colourlist[r[0]]=r[1];
            }
        }
    }
    return colourlist;
}

// main function to add colour toggling links in the inventory pane
function addEditLinks(page,doc) {
    var colourlist=loadColourlist();
    // look for td's with an id attribute consisting of
    // 'i' followed by numbers
    var elts = document.getElementsByTagName('td');
    for (var i=0;i<elts.length;i++)  {
        var tdd = elts[i];
        var tddid = tdd.getAttribute('id');
        if (tddid && tddid.match(/i[0-9]*/)) {
            // found an entry
            tddid=tddid.substr(1);
            // the text is the first bold therein
            var bref = tdd.getElementsByTagName('b');
            if (bref.length>0) {
                // found text
                var t = bref[0];
                t.title='Click to change colour.';
                t.setAttribute(tdditemid,tddid);
                if (colourlist[tddid]) {
                    t.setAttribute(tddcolour,colourlist[tddid]);
                }
                // add up and down event listeners
                t.addEventListener("click", changeColourUp, true);
                t.addEventListener("contextmenu", changeColourDown, true);
            } 
        }
    }
}

// handler for left clicking
function changeColourUp(e) {
    changeColour(this,false);
}

// handler for right clicking
function changeColourDown(e) {
    changeColour(this,true);
    if (e.stopPropagation) 
        e.stopPropagation();
}

// common handler function for changing colour
function changeColour(x,dec) {
    // get original colour
    var orgcolour=x.getAttribute(tddcolour);
    // get item id
    var desc=x.getAttribute(tdditemid);
    var newcolour;
    if (!orgcolour) {
        if (!dec)
            newcolour=colourarray[1];
        else
            newcolour=colourarray[colourarray.length-1];
    } else {
        for (var i=0;i<colourarray.length;i++) {
            if (colourarray[i]==orgcolour) {
                if (!dec)
                    newcolour = colourarray[(i+1)%(colourarray.length)];
                else
                    newcolour = colourarray[((i-1)<0) ? (colourarray.length-1) : i-1];
                break;
            }
        }
    }
    var colourlist=loadColourlist();
    if (newcolour=='') {
        colourlist[desc]=null;
        x.removeAttribute(tddcolour);
    } else if (newcolour) {
        colourlist[desc]=newcolour;
        x.setAttribute(tddcolour,newcolour);
    }
    saveColourlist(colourlist);
}

// routine to add or modify our css; heavily modified from Dive Into Greasemonkey
function addGlobalStyle(css,id) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.getElementById(id);
    if (!style) {
        //GM_log("Creating first css");
        style = document.createElement('style');
        style.type = 'text/css';
        style.setAttribute('id',id);
        style.innerHTML = css;
        head.appendChild(style);
    } else {
        //GM_log("Replacing existing css");
        style.innerHTML = css;
    }
}

// main function to create or modify the css for our colours
// idea: have a rule for each colour
// with a big selector, choosing 
//  1) bold elements as first children of a td with the corresponding item id
//  2) option elements with a value of the id
function createCss(cl) {
    var icl={};
    for (var d in cl) {
        var c = cl[d];
        if (!c)
            continue;
        if (icl[c])
            icl[c]=icl[c]+', td[id="i'+d+'"]>b, option[value="'+d+'"]';
        else
            icl[c]='td[id="i'+d+'"]>b, option[value="'+d+'"]';
    }
    var finalcss='';
    for (var c in icl) {
        if (icl[c])
            finalcss += icl[c]+' { color:'+c+'; } ';
    }
    //GM_log("finalcss="+finalcss);
    addGlobalStyle(finalcss,finalcssid);
}


// --------------------------------------------
// ---------- account menu option -------------
// --------------------------------------------


// Charon's code
function buildPrefs() {
    if (!document.querySelector('#privacy'))
        return;
    if (!document.querySelector('#scripts')) {
        //scripts tab is not built, do it here
        var scripts = document.querySelector('ul').appendChild(document.createElement('li'));
        scripts.id = 'scripts';
        var a = scripts.appendChild(document.createElement('a'));
        a.href = '#';
        var img = a.appendChild(document.createElement('img'));
        img.src = 'http://images.kingdomofloathing.com/itemimages/cmonkey1.gif';
        img.align = 'absmiddle';
        img.border = '0';
        img.style.paddingRight = '10px';
        a.appendChild(document.createTextNode('Scripts'));
        a.addEventListener('click', function (e) {
                //make our new tab active when clicked, clear out the #guts div and add our settings to it
                e.stopPropagation();
                document.querySelector('.active').className = '';
                document.querySelector('#scripts').className = 'active';
                document.querySelector('#guts').innerHTML = '<div class="scaffold"></div>';
                document.querySelector('#guts').appendChild(getSettings());
            }, false);
    } else {
        //script tab already exists
         document.querySelector('#scripts').firstChild.addEventListener('click', function (e) {
                //some other script is doing the activation work, just add our settings
                e.stopPropagation();
                document.querySelector('#guts').appendChild(getSettings());
            }, false);
    }
}

function getSettings() {
    //build our settings and return them for appending
    var contents = document.createElement('div');
    contents.id = 'recipecounterprefs';
    var fieldset = contents.appendChild(document.createElement('fieldset'));
    fieldset.setAttribute('style', 'width:33%; margin-top:20px');
    var legend = fieldset.appendChild(document.createElement('legend'));
    legend.className = 'subhead';
    legend.textContent = 'Colour Bag';
    var section = fieldset.appendChild(document.createElement('div'));
    section.className = 'indent';
    section.appendChild(buildSettings());
    return contents;
}

function buildSettings() {
    var d = document.createElement('div');
    d.appendChild(document.createTextNode('Lock colour settings: '));
    var ar = document.createElement('a');
    ar.setAttribute('href','#');
    if (GM_getValue('locked',false)) {
        ar.appendChild(document.createTextNode('now locked'));
        ar.setAttribute('title','Changing text colours is now prevented.  Click to toggle.');
    } else {
        ar.appendChild(document.createTextNode('now unlocked'));
        ar.setAttribute('title','Changing text colours is now allowed.  Click to toggle.');
    }
    ar.addEventListener('click',toggleLock,false);
    ar.setAttribute('id','colourbaglock');
    //li.appendChild(ar);
    //ul.appendChild(li);
    d.appendChild(ar);
    return d;
}

function toggleLock() {
    var ar = document.getElementById('colourbaglock');
    if (GM_getValue('locked',false)) {
        GM_setValue('locked','');
        ar.replaceChild(document.createTextNode('now unlocked'),ar.firstChild);
        ar.setAttribute('title','Changing text colours is now allowed.  Click to toggle.');
    } else {
        GM_setValue('locked','true');
        ar.replaceChild(document.createTextNode('now locked'),ar.firstChild);
        ar.setAttribute('title','Changing text colours is now prevented.  Click to toggle.');
    }
}

// grab the stored colour list
var firstcl = loadColourlist();
// create the css
createCss(firstcl);

// if in inventory frame, add edit links too
if (window.location.pathname.indexOf('/inventory.php')>=0 || window.location.pathname.indexOf('/storage.php')>=0) {
    if (!GM_getValue('locked',false))
        addEditLinks();
} else if (window.location.pathname.indexOf('/account.php')==0) {
    buildPrefs();
}
