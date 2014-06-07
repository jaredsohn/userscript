// ==UserScript==
// @name           Battle Checker
// @namespace      kol.interface.unfinished
// @description    To help monitor the hippy/frat war; adds a notice to the charpane in KOL of the current image numbers, updating after each charpane refresh.
// @include        http://*kingdomofloathing.com/charpane.php*
// @include        http://127.0.0.1:*/charpane.php*
// ==/UserScript==

// version 1.1
// - minor fix to make it show up more consistently below the character data
// version 1.0

// id for font element
var TPIDFONT='battlechecker_font';
// id for number fields
var TPIDNUMF='battlechecker_frat';
var TPIDNUMH='battlechecker_hippy';
// id for off/on toggle
var TPIDOFFON='battlechecker_offon';
// id for event handlers
var TPIDEF='battlechecker_efrat';
var TPIDEH='battlechecker_ehippy';
// suffix (with player name_) of name of global variable for storing state
var TPONOFF='onoff';
// suffix (with player name_) of name of global variable for storing last value
var TPLAST='last';
// suffix (with player name_) of name of global variable for storing last displayed value
var TPLASTDISPLAY='display';
// url pathname to check
var TPURL='/bigisland.php';
// text to use when in the process of checking
var TPCHECK='checking...';
// text to use when in the process of not checking
var TPNOTCHECK='(combat)';
// disabled text
var TPDISABLE='';
// mouseover text for clickable frat/hippy text
var TPMOSTR='Click to force a check now.';
var TPMOBUSYSTR='Busy checking...';

// colours for different entries.  p is a priority
var colours={'31':{c:'green',p:1,s:1},'32':{c:'red',p:1,s:2},'last':{c:'orangered',p:2,s:1}};
colours[TPNOTCHECK]={c:'gray',p:0,s:1};
colours[TPCHECK]={c:'gray',p:0,s:1};
colours[TPDISABLE]={c:'silver',p:1,s:1};

// main function to find the anchor point and create
// the notification
function createNotice(numf,numh) {
    if (updateActualNotice(numf,numh))
        return;
    var spot =  document.getElementById('rollover');
    if (spot && spot.nextSibling) {
        var parent = spot.nextSibling.firstChild;
        if (parent && parent.tagName=='TABLE' && parent.firstChild && parent.firstChild.tagName=='TBODY')
            parent = parent.firstChild;
        if (parent)
            createActualNotice(parent,numf,numh);
    }
}

// actually creates the notice assuming it's not there already
function createActualNotice(parent,numf,numh) {
    // create a new row for a table with 2 columns
    var x = document.createElement('tr');
    var y = document.createElement('td');
    // we'll just span both rows
    y.setAttribute("colspan","2");
    y.setAttribute("align","center");
    x.appendChild(y);
   
    // surround it all with a font so it's small and we can change colour
    var v = document.createElement('font');
    v.setAttribute('id',TPIDFONT);
    v.setAttribute('size','1');
    y.appendChild(v);

    // create the checkbox
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

    // next is a label with everything in it
    var s = document.createElement('label');
    s.setAttribute('style','vertical-align:middle;');
    v.appendChild(s);

    var ts = document.createElement('span');
    ts.appendChild(document.createTextNode('Frat: '));
    ts.addEventListener('click',update,true);
    ts.setAttribute('id',TPIDEF);
    ts.setAttribute('title',TPMOSTR);
    s.appendChild(ts);

    // text we intend to modify later is in a bold
    var w = document.createElement('span');
    w.setAttribute('id',TPIDNUMF);
    s.appendChild(w);
    // set colour
    var cf=colours[numf];
    if (cf) {
        v.setAttribute('color',cf.c);
        v.setAttribute('size',cf.s);
    }
    if (pn && numf==TPNOTCHECK) {
        var lastdisplay=GM_getValue(pn+'_'+TPLASTDISPLAY);
        if (lastdisplay) {
            var ld = lastdisplay.split(',');
            numf=ld[0];
            numh=ld[1];
        }
    }
    w.innerHTML=numf;

    ts = document.createElement('span');
    ts.appendChild(document.createTextNode('  Hippy: '));
    ts.addEventListener('click',update,true);
    ts.setAttribute('id',TPIDEH);
    ts.setAttribute('title',TPMOSTR);
    s.appendChild(ts);

    w = document.createElement('span');
    w.setAttribute('id',TPIDNUMH);
    s.appendChild(w);
    var ch=colours[numh];
    if (ch && (!cf || ch.s<cf.s)) {
        v.setAttribute('color',ch.c);
        v.setAttribute('size',ch.s);
    } 
    w.innerHTML=numh;

    updateColourIfLast(pn,x,numf,numh,cf,ch);

    //parent.insertBefore(x,parent.firstChild);
    parent.appendChild(x);
}

// update notice instead if it's there already for some reason
function updateActualNotice(numf,numh) {
    var x = document.getElementById(TPIDFONT);
    var y = document.getElementById(TPIDNUMF);
    var z = document.getElementById(TPIDNUMH);
    if (!x || !y || !z)
        return false;

    var cf=colours[numf];
    if (cf) {
        x.setAttribute('color',cf.c);
        x.setAttribute('size',cf.s);
    } else {
        x.removeAttribute('color');
        x.setAttribute('size','1');
    }
    if (numf!=TPNOTCHECK)
        y.innerHTML=numf;

    var ch=colours[numh];
    if (ch && (!cf || ch.s<cf.s)) {
        x.setAttribute('color',ch.c);
        x.setAttribute('size',ch.s);
    }
    if (numf!=TPNOTCHECK)
        z.innerHTML=numh;

    updateColourIfLast(GM_getValue("playername"),x,numf,numh,cf,ch);

    var pn = GM_getValue("playername");

    return true;
}

// check if the current update is an incremental change from the previous
// and if so colour it if it hasn't been coloured already
function updateColourIfLast(pn,x,numf,numh,cf,ch) {
    if (pn) {
        var cur=numf+','+numh;
        if (cur.match(/[0-9]+,[0-9]+/)) {
            var last=GM_getValue(pn+'_'+TPLAST,cur);
            if (last.length>0 && !cf && !ch && last!=cur && cur!='0,0') {
                //GM_log("will update.  last: "+last+", cur: "+cur);
                x.setAttribute('color',colours.last.c);
                x.setAttribute('size',colours.last.s);
            } 
            //else GM_log("overwrite update.  last: "+last+", cur: "+cur);

            GM_setValue(pn+'_'+TPLAST,cur);
        }
        if (numf!=TPNOTCHECK)
            GM_setValue(pn+'_'+TPLASTDISPLAY,cur);
        //else GM_log("will not update last: "+cur);
    } 
    //else GM_log("unknown player name");
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
            var x = doc.getElementsByTagName('a');
            for (var i=0;i<x.length;i++) {
                if (x[i].innerHTML && (x[i].innerHTML.indexOf('Adventure Again')==0 || x[i].innerHTML.indexOf('Go back to Your Inventory')==0))
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
// creates a temporary notice, checks the bigisland, updates the notice
function update() {
    var pn = GM_getValue("playername");
    if (!pn)
        return;
    if (GM_getValue(pn+'_'+TPONOFF,'true')!='true') {
        createNotice(TPDISABLE,TPDISABLE); // notice is turned off
    } else {
        // remove and restore event handlers to avoid concurrency problems
        // nb leave on/off---may cause weirdness if toggled in the middle of checking
        // but at least it still allows someone to always turn it off
        createNotice(TPCHECK,''); // intermediate notice while we load the page
        var ef,eh;
        ef = document.getElementById(TPIDEF);
        eh = document.getElementById(TPIDEH);
        if (ef) {
            ef.removeEventListener('click',update,true);
            ef.setAttribute('title',TPMOBUSYSTR);
        }
        if (eh) {
            eh.removeEventListener('click',update,true);
            eh.setAttribute('title',TPMOBUSYSTR);
        }
        GM_get('http://'+window.location.host+TPURL,function(response){
                if(response!=''){
                    var f = response.indexOf("bigisland/bfleft");
                    var h = response.indexOf("bigisland/bfright");
                    if (f>=0 && h>=0) {
                        var ff = response.substr(f).indexOf('.');
                        var hh = response.substr(h).indexOf('.');
                        f = parseInt(response.substr(f+16,ff-16));
                        h = parseInt(response.substr(h+17,hh-17));
                        createNotice(f,h);
                    } else
                        createNotice('?','?'); // can't find battlefield images
                } else
                    createNotice('?','?'); // can't load bigisland
            });
        if (ef) {
            ef.addEventListener('click',update,true);
            ef.setAttribute('title',TPMOSTR);
        }
        if (eh) {
            eh.addEventListener('click',update,true);
            eh.setAttribute('title',TPMOSTR);
        }
    }
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
    GM_setValue("playername",username);
    return username;
}


// what we do each time the charpane is loaded:
var firstpn=getPlayerNameFromCharpane();
if(firstpn) {
    if (!infight()) {
        update();
    } else {
        if (GM_getValue(firstpn+'_'+TPONOFF,'true')=='true') {
            createNotice(TPNOTCHECK,'');
        } else {
            createNotice(TPDISABLE,TPDISABLE);
        }
    }
}
