// ==UserScript==
// @name           Way of the Surprising Fist Minder
// @namespace      kol.interface.unfinished
// @description    Keeps track of which Teachings of the Fist scroll encounters you find in the Way of the Suprising Fist in Kingdom of Loathing.
// @include        http://*kingdomofloathing.com/adventure.php*
// @include        http://*kingdomofloathing.com/questlog.php?which=2
// @include        http://*kingdomofloathing.com/questlog.php?which=1
// @include        http://*kingdomofloathing.com/afterlife.php*
// @include        http://*kingdomofloathing.com/charpane.php
// @include        http://127.0.0.1:*/adventure.php*
// @include        http://127.0.0.1:*/questlog.php?which=2
// @include        http://127.0.0.1:*/questlog.php?which=1
// @include        http://127.0.0.1:*/afterlife.php*
// @include        http://127.0.0.1:*/charpane.php
// @version        1.0
// ==/UserScript==

//Version 1.0

function checkForAdv() {
    var tofs = { "Five Deadly Syllables":"The Haiku Dungeon",
                 "Kung-Fu Hustler":"The Poker Room",
                 "Drunken Bastard":"A Barroom Brawl",
                 "Dance of the Spooky Mantis":"Haunted Conservatory",
                 "Ong-Bat":"The Bat Hole Entrance",
                 "The Prodigal Clown":'The "Fun" House',
                 "Moose in the Eagle's Shadow":"Menagerie Level 2",
                 "Crouching Tiger, Hidden Demon":"Pandamonium Slums",
                 "37 Chambers":"The Orcish Frat House",
                 "Fist of the White Citadel":"The Road to White Citadel",
                 "Enter the Snowman":"The Lair of the Ninja Snowmen" };
    for (var a in tofs) {
        var snap = document.evaluate( '//b[text()="'+a+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (snap.singleNodeValue) {
            addKnown(a);
        }
    }
}

// add link to the top of the quest log to the new page
function showKnown() {
    var snap = document.evaluate( '//center/a[@href="campground.php"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (snap.singleNodeValue) {
        var k = getKnown();
        var s = snap.singleNodeValue.parentNode;
        var p = document.createElement('p');
        var b = document.createElement('b');
        makeTotFA(b,k.length);
        p.appendChild(b);
        p.appendChild(document.createElement('p'));
        b = document.createElement('blockquote');
        b.setAttribute('id','wotsfadvs');
        var pn=GM_getValue('playername');
        if (pn!="" && GM_getValue('hide_'+pn)) {
            b.setAttribute('style','display:none;');
        }
        for (var i=0;i<k.length;i++) {
            b.appendChild(document.createTextNode(k[i]));
            if (i<k.length-1) {
                b.appendChild(document.createTextNode('; '));
            }
        }
        if (k.length==0) {
            b.appendChild(document.createTextNode('(none)'));
        }
        s.parentNode.insertBefore(p,s);
        s.parentNode.insertBefore(b,s);
    }
}

function makeTotFA(b,n) {
    var t1 = (n>0) ? document.createTextNode(' Adventures: ('+n+'): ') : document.createTextNode(' Adventures: ');
    var t2 = document.createTextNode(' of the ');
    var a1 = document.createElement('a');
    a1.setAttribute('href','http://kol.coldfront.net/thekolwiki/index.php/Teachings_of_the_Fist');
    a1.setAttribute('target','_blank');
    a1.appendChild(document.createTextNode('Teachings'));
    var a2 = document.createElement('a');
    a2.setAttribute('href','http://kol.coldfront.net/thekolwiki/index.php/Way_of_the_Surprising_Fist');
    a2.setAttribute('target','_blank');
    a2.appendChild(document.createTextNode('Fist'));
    var a3 = document.createElement('a');
    a3.setAttribute('href','#');
    a3.setAttribute('style','font-size:8pt;');
    a3.appendChild(document.createTextNode('[hide/show]'));
    a3.addEventListener('click',toggleHide,false);
    b.appendChild(a1);
    b.appendChild(t2);
    b.appendChild(a2);
    b.appendChild(t1);
    b.appendChild(a3);
}

function toggleHide() {
    var pn=GM_getValue('playername');
    if (pn=="")
        return;
    var hide = GM_getValue('hide_'+pn);
    if (hide) hide = '';
    else hide = 'true';
    var adv = document.getElementById('wotsfadvs');
    if (hide) {
        adv.setAttribute('style','display:none;');
        GM_setValue('hide_'+pn,hide);
    } else {
        adv.setAttribute('style','');
        GM_setValue('hide_'+pn,'');
    }
}

// add link to the top of the quest log to the new page
function showUnknown2(tofs,newt) {
    var snap = document.evaluate( '//center/a[@href="campground.php"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (snap.singleNodeValue) {
        var s = snap.singleNodeValue.parentNode;
        var p = document.createElement('p');
        var b = document.createElement('b');
        makeTotFA(b);
        p.appendChild(b);
        p.appendChild(document.createElement('p'));
        b = document.createElement('blockquote');
        b.setAttribute('id','wotsfadvs');
        var pn=GM_getValue('playername');
        if (pn!="" && GM_getValue('hide_'+pn)) {
            b.setAttribute('style','display:none;');
        }
        var count=0;
        for (var i in tofs) {
            var t = document.createElement('a');
            t.addEventListener("click", toggleKnown, true);
            t.appendChild(document.createTextNode(tofs[i]+': '+i));
            t.setAttribute('title','click to toggle known/unknown');
            if (newt[i]=='known') {
                t.setAttribute('style','color:silver;');
            }
            b.appendChild(t);
            b.appendChild(document.createElement('br'));
        }
        s.parentNode.insertBefore(p,s);
        s.parentNode.insertBefore(b,s);
    }
}

function toggleKnown() {
    var s = this.getAttribute('style');
    if (s) {
        this.removeAttribute('style');
        removeKnown(this.innerHTML.replace(/^[^:]*: /,''));
    } else {
        this.setAttribute('style','color:silver;');
        addKnown(this.innerHTML.replace(/^[^:]*: /,''));
    }
}


// add link to the top of the quest log to the new page
function showUnknown() {
    var tofs = { "Five Deadly Syllables":"The Haiku Dungeon",
                 "Kung-Fu Hustler":"The Poker Room",
                 "Drunken Bastard":"A Barroom Brawl",
                 "Dance of the Spooky Mantis":"Haunted Conservatory",
                 "Ong-Bat":"The Bat Hole Entrance",
                 'The Prodigal Clown':'The "Fun" House',
                 "Moose in the Eagle's Shadow":"Menagerie Level 2",
                 "Crouching Tiger, Hidden Demon":"Pandamonium Slums",
                 "37 Chambers":"The Orcish Frat House",
                 "Fist of the White Citadel":"The Road to White Citadel",
                 "Enter the Snowman":"The Lair of the Ninja Snowmen" };
    var newt = {};
    var k = getKnown();
    for (var t in tofs) {
        var i=0;
        for (i=0;i<k.length;i++) {
            if (k[i]==t) {
                newt[t] = 'known';
                break;
            }
        }
        if (i>=k.length) {
            newt[t] = 'unknown';
        }
    }
    showUnknown2(tofs,newt);
}


// retrieve the known list
function getKnown() {
    var pn=GM_getValue('playername');
    if (pn=="")
        return [];
    var known = GM_getValue("known_"+pn,'');
    if (!known)
        return [];
    return known.split(':');
}

// add an adventure if it's not there already
function addKnown(adv) {
    var pn=GM_getValue('playername');
    if (pn=="")
        return;
    var known = GM_getValue('known_'+pn,'');
    var r = new RegExp(adv);
    if (!r.test(known)) {
        if (known) 
            known = known+':'+adv;
        else
            known = adv;
        GM_setValue('known_'+pn,known);
    }
}

// add an adventure if it's not there already
function removeKnown(adv) {
    var pn=GM_getValue('playername');
    if (pn=="")
        return;
    var known = GM_getValue('known_'+pn,'');
    if (known) {
        var r = new RegExp(adv);
        known = known.replace(r,'').replace(/::/,':').replace(/^:/,'').replace(/:$/,'');
    }
    GM_setValue('known_'+pn,known);
}

function resetKnown() {
    var pn=GM_getValue('playername');
    if (pn=="")
        return;
    GM_setValue('known_'+pn,'');
}

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
    while (username && username.nodeType == 1) {
        username = username.firstChild;
    }
    if (!username) return false;
    username = username.nodeValue;
    if (!username) return false;
    username = username.toLowerCase();
    GM_setValue("playername", username);
}



if(window.location.pathname.indexOf('/questlog.php')==0) {
    if (window.location.search=='?which=1')
        showUnknown();
    else
        showKnown();
} else if(window.location.pathname.indexOf('/afterlife.php')==0) {
    resetKnown();
} else if(window.location.pathname.indexOf('/charpane.php')==0) {
    getPlayerNameFromCharpane();
} else {
    if (document.evaluate('//img[@src="http://images.kingdomofloathing.com/adventureimages/wosp_scroll.gif"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue)
        checkForAdv();
}
