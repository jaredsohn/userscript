// ==UserScript==
// @name           Trophy Checker
// @namespace      kol.interface.unfinished
// @description    To help in trophy spading; adds a notice to the charpane in KOL of the number of trophies you have can buy, updating after each charpane refresh.
// @include        http://*kingdomofloathing.com/charpane.php*
// @include        http://127.0.0.1:*/charpane.php*
// @version        1.2
// ==/UserScript==

// version 1.2.1
// - fix for sometimes wrongly detecting in-combat or not.
// version 1.2
// - fix for moving trophy hut so it's not alway accessible
// version 1.1
// - added an on/off checkbox
// version 1.0

// id for font element
var TPIDFONT='trophychecker_font';
// id for number of trophies element
var TPIDNUM='trophychecker_num';
// url pathname of trophy hut
var TPURL='/trophy.php';
// text to use when in the process of checking
var TPCHECK='checking...';
// text to use when in the process of not checking
var TPNOTCHECK='(in combat)';
// text to use if the hut is inaccessible
var TPNOHUT='(no hut)';
// suffix (with player name_) of name of global variable for storing state
var TPONOFF='onoff';
// id for off/on toggle
var TPIDOFFON='trophychecker_offon';
// text to use when disabled
var TPDISABLE='off';

// main function to find the anchor point and create
// the notification
function createNotice(numt) {
    if (updateActualNotice(numt))
        return;
    var spot =  document.getElementById('rollover');
    if (spot && spot.nextSibling) {
        var parent = spot.nextSibling.firstChild;
        if (parent)
            createActualNotice(parent,numt);
    }
}

// actually creates the notice assuming it's not there already
function createActualNotice(parent,numt) {
    var x = document.createElement('tr');
    var y = document.createElement('td');
    y.setAttribute("colspan","2");
    y.setAttribute("align","center");
    x.appendChild(y);

    var v = document.createElement('font');
    v.setAttribute('id',TPIDFONT);
    v.setAttribute('size','1');
    y.appendChild(v);

    var offon=document.createElement('input');
    offon.setAttribute('style','vertical-align:middle;');
    offon.setAttribute('id',TPIDOFFON);
    offon.setAttribute('type','checkbox');
    offon.setAttribute('padding','0');
    var pn = GM_getValue("playername");
    if (pn && GM_getValue(pn+'_'+TPONOFF,'true')=='true')
        offon.setAttribute('checked','true');
    offon.addEventListener('click',offonhandler,true);
    v.appendChild(offon);

    var z = document.createElement('a');
    z.addEventListener("click", update, true);
    z.setAttribute('title','Click to update.');
    z.appendChild(document.createTextNode('Trophies'));
    v.appendChild(z);
    v.appendChild(document.createTextNode(': '));

    var w = document.createElement('span');
    w.setAttribute('id',TPIDNUM);
    v.appendChild(w);
    if (numt>0) {
        v.setAttribute('color','red');
        v.setAttribute('size','2');
    } else if (numt==TPCHECK || numt==TPNOTCHECK || numt==TPDISABLE || numt==TPNOHUT)
        v.setAttribute('color','gray');
    w.innerHTML=numt;

    parent.insertBefore(x,parent.firstChild);
}

// update notice instead if it's there already for some reason
function updateActualNotice(numt) {
    var x = document.getElementById(TPIDFONT);
    var y = document.getElementById(TPIDNUM);
    if (!x || !y)
        return false;

    if (numt>0) {
        x.setAttribute('color','red');
        x.setAttribute('size','2');
    } else if(numt==TPCHECK || numt==TPNOTCHECK || numt==TPDISABLE || numt==TPNOHUT) {
        x.setAttribute('color','gray');
        x.setAttribute('size','1');
    } else {
        x.removeAttribute('color');
        x.setAttribute('size','1');
    }
    y.innerHTML=numt;
    return true;
}

// handler for on/off checkbox
function offonhandler(e) {
    var pn = GM_getValue("playername");
    if (!pn)
        return;
    var c = this.getAttribute('checked');
    if (c) {
        this.removeAttribute('checked');
        GM_setValue(pn+'_'+TPONOFF,'false');
    } else {
        this.setAttribute('checked','true');
        GM_setValue(pn+'_'+TPONOFF,'true');
    }
    update();
}

// checks if player is likely in the middle of a fight
function infight() {
    var somef=window.parent.frames;
    var goo = null;
    for(var j=0;j<somef.length;j++) {
        if (somef[j].name=="mainpane")
            goo=somef[j];
    }
    if (goo) {
        var doc = goo.document;
        if (!doc || !doc.body)
            return false;
        var mainframe=doc.body.innerHTML;
        if (mainframe && mainframe.indexOf('Combat!')>=0) {
            // if (doc.evaluate( '//center[contains(.,"You win the fight!")]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue)
            //     return false;
            var x = doc.getElementsByTagName('a');
            for (var i=0;i<x.length;i++) {
                if (x[i].innerHTML && x[i].innerHTML.indexOf('Adventure Again')==0)
                    return false;
            }
            return true;
        }
    } 
    return false;
}

// utility function, stolen from other scripts
function GM_get(dest, callback)
{   GM_xmlhttpRequest({
      method: 'GET',
      url: dest,
        //onerror:function(error) { GM_log("GM_get Error: " + error); },
        onload:function(details) {
            if( typeof(callback)=='function' ){
                callback(details.responseText);
}   }   }); }


// main function to update state
// creates a temporary notice, checks the trophy hut, updates the notice
function update() {
    var pn = GM_getValue("playername");
    if (!pn)
        return;
    if (GM_getValue(pn+'_'+TPONOFF,'true')!='true') {
        createNotice(TPDISABLE); // notice is turned off
    } else {
        createNotice(TPCHECK);
        GM_get('http://'+window.location.host+TPURL,function(response){
                if(response!=''){
                    var f = response.indexOf("You're not currently entitled to any trophies.");
                    if (f>=0) {
                        createNotice(0);
                    } else if (response.indexOf('Trophy Hut')>=0) {
                        var tlist=response.split('name=whichtrophy');
                        createNotice(tlist.length-1);
                    } else
                        createNotice('?');
                } else
                    createNotice(TPNOHUT);
            });
    }
}

// what we do each time the charpane is loaded:
// if not in the middle of combat, then update
// the trophy hut
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
    GM_setValue("playername",username);
    return username;
}


// what we do each time the charpane is loaded:
var firstpn=getPlayerNameFromCharpane();
if(firstpn) {
    if (!infight())
        update();
    else  {
        if (GM_getValue(firstpn+'_'+TPONOFF,'true')=='true') {
            createNotice(TPNOTCHECK);
        } else {
            createNotice(TPDISABLE);
        }
    }
}
