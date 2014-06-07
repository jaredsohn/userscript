// ==UserScript==
// @name           Slime Guard
// @namespace      kol.interface.unfinished
// @description    Adds notices and warnings if you attempt to adventure in the KoL slime tube with insufficient HP.
// @include        http://*.kingdomofloathing.com/charpane.php
// @include        http://*.kingdomofloathing.com/charsheet.php
// @include        http://*.kingdomofloathing.com/fight.php*
// @include        http://*.kingdomofloathing.com/clan_slimetube.php*
// @include        http://*.kingdomofloathing.com/account.php
// @include        http://127.0.0.1:*/charpane.php
// @include        http://127.0.0.1:*/charsheet.php
// @include        http://127.0.0.1:*/fight.php*
// @include        http://127.0.0.1:*/clan_slimetube.php*
// @include        http://127.0.0.1:*/account.php
// @version        1.0.3
// ==/UserScript==

// Version 1.0.3
//  - update to use Charon the Hand's code for a shared account menu option
// Version 1.0.2
//  - fix to better deal with asynchronous load of the combat bar
// Version 1.0.1
//  - minor fix to properly identify resistance names with multiple spaces
//  - minor fix to prevent adventuring for a case I missed
// Version 1.0
//  - added account menu option to set the amount of HP to ensure is 
//    kept as a minumum.  This can be set as a fixed amount or as a
//    percentage of the current maximum HP.
// Version 0.9

// --------------------------------------------
// ------------ charpane code -----------------
// --------------------------------------------

// utility to get player name; hacked/stolen from Antimarty's fortune cookie script
function getPlayerNameFromCharpane() {
    var somef=window.parent.frames;
    var goo;
    for(var j=0;j<somef.length;j++) {
        if (somef[j].name=="charpane") {
            goo=somef[j];
            var username = goo.document.getElementsByTagName("b");
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
            return username;
        }
    }
}

// look for HP cur/base and return it
function checkHP(doc) {
    var snap = doc.evaluate( '//span[@class="black"] | //span[@class="red"]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (snap.singleNodeValue) {
        var hp = snap.singleNodeValue.innerHTML;
        hp = hp.replace(/&nbsp;/g,' ');
        var cur = Number(hp.replace(/[^\d].*/,''));
        var base = Number(hp.replace(/\d*[^\d]*/,''));
        return {cur:cur,base:base};
    }
}

// look for coated in slime effect and return number of adv
function checkSlime(doc) {
    var snap = doc.evaluate( '//font[contains(., "Coated in Slime")]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (snap.singleNodeValue) {
        var slime = snap.singleNodeValue.innerHTML;
        slime = Number(slime.replace(/[^\d]*/g,''));
        return slime;
    }
    return 0;
}

// set global vars according to whether it is currently safe or not
function safeSlime(hp,s) {
    if (hp.base==0 || s>10)
        return;
    // slime damage on turns 0-9
    var r = 0.0;
    var pn = getPlayerNameFromCharpane();
    var basen = 0;
    var basep = 0.0;
    if (pn) {
        // check resistance
        r = Number(GM_getValue("resistance_"+pn,"0.0"));
        var base = getBase(pn);
        if (base.match(/%/)) {
            basep = Number(base.replace(/%/g,''))/100.0;
        } else {
            basen = Number(base);
        }
        GM_setValue("warning_"+pn,"no");
    }

    var dmgtaken = (s==0) ? 0.0 : Math.floor(Math.ceil(hp.base*Math.pow(11-s,2.727)/100)*(1.0-r));

    var buffer = basen+(hp.base*basep);
    
    var diff = dmgtaken - hp.cur + buffer;

    if (diff>=0 && dmgtaken>0) {
        GM_setValue("warning_"+pn,"yes");
        //GM_log('warning set to yes, diff='+diff+', dmgtaken='+dmgtaken);
        diff++;
        if (dmgtaken>=hp.base-buffer) 
            GM_setValue("warningmsg_"+pn,"Danger! up to "+dmgtaken+" damage expected! You need a chamois!");
        else
            GM_setValue("warningmsg_"+pn,"Danger! up to "+dmgtaken+" damage expected! You need "+diff.toFixed(0)+" more HP");
    } 

}

// data may have changed; update mainpane if it has any links
function doubleCheckSlime() {
    var somef=window.parent.frames;
    var goo;
    for (var j=0;j<somef.length;j++) {
        if (somef[j].name=="mainpane") {
            goo=somef[j].document;
            //GM_log('double-checking..');
            if (goo.evaluate( '//a[@href="adventure.php?snarfblat=203"]', goo, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)) {
                checkRewrittenLinks(goo);
            }
            break;
        }
    }
}

// --------------------------------------------
// ----------- charsheet code -----------------
// --------------------------------------------

// set slime resistance value
function saveResistance() {
    var resists = { "None":"0", 
                    "Very Low":"10.00",
                    "Low":"20.00",
                    "Moderate":"30.00",
                    "Considerable":"40.00",
                    "High":"48.33",
                    "Very High":"55.28",
                    "Really Very High":"61.06",
                    "Extremely High":"65.89",
                    "Very Extremely High":"69.91",
                    "Really Very Extremely High":"73.26",
                    "Amazingly High":"76.05",
                    "Very Amazingly High":"78.37",
                    "Really Very Amazingly High":"80.31",
                    "Extremely Amazingly High":"81.92",
                    "Very Extremely Amazingly High":"83.27",
                    "Really Very Extremely Amazingly High":"84.39",
                    "Extraordinarily High":"85.33",
                    "Very Extraordinarily High":"86.11",
                    "Really Very Extraordinarily High":"86.75",
                    "Extremely Extraordinarily High":"87.30",
                    "Very Extremely Extraordinarily High":"87.75",
                    "Really Very Extremely Extraordinarily High":"88.12",
                    "Incredibly High":"88.43",
                    "Very Incredibly High":"88.70",
                    "Really Very Incredibly High":"88.91",
                    "Extremely Incredibly High":"89.09",
                    "Very Extremely Incredibly High":"89.25",
                    "Really Very Extremely Incredibly High":"89.37",
                    "Staggeringly High":"89.48",
                    "Very Staggeringly High":"89.56",
                    "Really Very Staggeringly High":"89.64",
                    "Extremely Staggeringly High":"89.70",
                    "Very Extremely Staggeringly High":"89.75",
                    "Really Very Extremely Staggeringly High":"89.79",
                    "Mind-Bogglingly High":"89.82",
                    "Very Mind-Bogglingly High":"89.85",
                    "Really Very Mind-Bogglingly High":"89.88",
                    "Extremely Mind-Bogglingly High":"89.90",
                    "Very Extremely Mind-Bogglingly High":"89.92",
                    "Really Very Extremely Mind-Bogglingly High":"89.93",
                    "Inconceivably High":"89.94",
                    "Very Inconceivably High":"89.95",
                    "Really Very Inconceivably High":"89.96",
                    "Extremely Inconceivably High":"89.97",
                    "Very Extremely Inconceivably High":"89.97",
                    "Really Very Extremely Inconceivably High":"89.98",
                    "Unthinkably High":"89.98",
                    "Very Unthinkably High":"89.98",
                    "Really Very Unthinkably High":"89.98",
                    "Extremely Unthinkably High":"89.98",
                    "Very Extremely Unthinkably High":"89.99"}; 
    var snap = document.evaluate( '//td[text()="Slime Protection:"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    var resistance = 0.0;
    if (snap.singleNodeValue) {
        // GM_log('Found protection');
        var td = snap.singleNodeValue.nextSibling;
        if (td && td.firstChild) {
            var level = td.firstChild.innerHTML;
            if (level) level = level.replace(/\s+/g,' ');
            //GM_log("protect level: "+level);
            var pct = resists[level];
            if (pct)
                resistance = Number(pct)/100.0;
            else
                resistance = 0.8999;
        }
    } 
    var pn = getPlayerNameFromCharpane();
    if (pn) {
        //GM_log("Slime resistance of "+pn+": "+resistance);
        GM_setValue("resistance_"+pn,String(resistance));
    }
}

// --------------------------------------------
// ----- fight and clan_slimetube code --------
// --------------------------------------------

// event listener for adventure links
function adventureProtect(e) {
    var pn = getPlayerNameFromCharpane();
    if (pn && GM_getValue("warning_"+pn,"no")=="yes") {
        alert("You don't have enough HP for the slime tube!");
        //this.removeEventListener("click",adventureProtect,false);
        e.preventDefault();
    }
}

// look for links and add listeners and messages
function rewriteLinks(doc) {
    var addHere = doc.getElementsByTagName("a");
    var count=0;
    var pn = getPlayerNameFromCharpane();
    var mmsg;
    if (pn && GM_getValue("warning_"+pn,"no")=="yes") {
        mmsg = GM_getValue("warningmsg_"+pn,'');
        for (var j=0; j<addHere.length; j++) {
            var link = addHere[j];
            var site = link.getAttribute('href');
            if (!site)
                continue;
            if (site.indexOf('adventure.php?snarfblat=203')>=0) {
                count++;
                link.addEventListener('click',adventureProtect,false);
                if (link.innerHTML.match(/Adventure Again/)) {
                    link.setAttribute('class','slimestopmsg');
                    link.setAttribute('formertext',link.innerHTML);
                    link.innerHTML = mmsg;
                } else {
                    var ctr = createMsg(doc,'Heal first!',mmsg);
                    link.parentNode.appendChild(ctr);
                }
            }
        }
        textUnderButton(doc,mmsg);
    }
}

// utility to create html for message text
function createMsg(doc,msg,mmsg) {
    var ctr = doc.createElement('center');
    ctr.setAttribute('class','slimestopmsg');
    ctr.setAttribute('title',mmsg);
    ctr.setAttribute('style','color:red;font-size:9px;');
    ctr.appendChild(doc.createTextNode(msg));
    return ctr;
}

// verify links
// called from the charpane but operates on these pages
function checkRewrittenLinks(doc) {
    var pn = getPlayerNameFromCharpane();
    if (pn) {
        var addHere = doc.getElementsByClassName("slimestopmsg");
        if (GM_getValue("warning_"+pn,"no")=="yes") {
            //GM_log('found warning to be yes rewritten');
            if (addHere.length==0) {
                return rewriteLinks(doc);
            } else {
                // update title msgs
                var mmsg = GM_getValue("warningmsg_"+pn,'');
                for (var j=addHere.length-1;j>=0; j--) {
                    var ctr = addHere[j];
                    if (ctr.getAttribute('formertext'))
                        ctr.innerHTML=mmsg;
                    else
                        ctr.setAttribute('title',mmsg);
                }
            }
        } else {
            for (var j=addHere.length-1;j>=0; j--) {
                var ctr = addHere[j];
                if (ctr.getAttribute('formertext')) {
                    ctr.innerHTML=ctr.getAttribute('formertext');
                    ctr.removeAttribute('formertext');
                    ctr.removeAttribute('class');
                } else
                    ctr.parentNode.removeChild(ctr);
            }
        }
        
    } 
}

// add text under the button bar adventure again link if found
function textUnderButton(doc,mmsg) {
    var allnulls = true;
    var i;
    for (i=1;i<=12;i++) {
        var b = doc.getElementById('button'+i);
        if (!b) 
            return;
        var t = b.getAttribute('title');
        if (t) allnulls = false;
        if (t=='Adventure Again') {
            // found button
            var q = doc.getElementById('qty'+i);
            if (q) {
                if (!q.firstChild) {
                    var ctr = createMsg(doc,'Heal!',mmsg);
                    q.appendChild(ctr);
                }
            }
            return;
        }
    }
    if (allnulls && i>12) {
        setTimeout(function() {
                for (var i=1;i<=12;i++) {
                    var b = doc.getElementById('button'+i);
                    if (!b) 
                        return;
                    if (b.getAttribute('title')=='Adventure Again') {
                        // found button
                        var q = doc.getElementById('qty'+i);
                        if (q) {
                            if (!q.firstChild) {
                                var ctr = createMsg(doc,'Heal!',mmsg);
                                q.appendChild(ctr);
                            }
                        }
                        return;
                    }
                }
            },200);
    }
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
    var guts = document.body.appendChild(document.createElement('div'));
    guts.id = 'slimeguardprefs';
    var subhead = guts.appendChild(document.createElement('div'));
    subhead.className = 'subhead';
    subhead.textContent = 'Slime Guard';
    var section = guts.appendChild(document.createElement('div'));
    section.className = 'indent';
    //call function in main script to actually make the settings
    section.appendChild(buildSettings());
    return guts;
}

function buildSettings() {
	var curbase = getBase();
    var ul = document.createElement('ul');
    var li = document.createElement('li');
	var ar = document.createElement('a');
	ar.setAttribute('href','javascript:void(0)');
	ar.setAttribute('id','slimeguardaccountmsg');
	ar.innerHTML = 'Keeping a buffer of '+curbase+' HP. Click to change.';
	ar.addEventListener('click',changeBaseHandler,true);
    li.appendChild(ar);
    ul.appendChild(li);
	return ul;
}

// handler for account menu set base
function changeBaseHandler(e) {
    var pn = getPlayerNameFromCharpane();   
    if (pn) {
        var curbase = getBase(pn);
        var newbase = prompt('Set buffer amount (absolute or %):\n',curbase);
        if (!newbase) newbase = '0';
        if (!newbase.match(/[\d]+%?/)) {
            alert('Invalid base amount: '+newbase);
        } else if (newbase!=curbase) {
            setBase(newbase,pn);
            var msg = document.getElementById('slimeguardaccountmsg');
            msg.innerHTML = 'Keeping a buffer of '+newbase+' HP. Click to change.';
            doubleCheckAll();
        }
    }
}

// get base value
function getBase(pn) {
    if (!pn)
        pn = getPlayerNameFromCharpane(); 
    var base = '0';
    if (pn) {
        base = GM_getValue(pn+'_slimeguardbase','0');
    }
    return base;
}

// set base value
function setBase(base,pn) {
    if (!pn)
        pn = getPlayerNameFromCharpane(); 
    if (pn) {
        GM_setValue(pn+'_slimeguardbase',base);
    }
}


// data may have changed; update everything
// can be called from any frame
function doubleCheckAll() {
    var somef=window.parent.frames;
    for (var j=0;j<somef.length;j++) {
        if (somef[j].name=="charpane") {
            var goo=somef[j].document;
            var hp = checkHP(goo);
            var s = checkSlime(goo);
            if (hp)
                safeSlime(hp,s);
            //rewriteLinks(goo);
            checkRewrittenLinks(goo);
            doubleCheckSlime();
            break;
        }
    }
}


// --------------------------------------------
// ---------------- main code -----------------
// --------------------------------------------

if (window.location.pathname=='/charpane.php') {
    var hp = checkHP(document);
    var s = checkSlime(document);
    if (hp)
        safeSlime(hp,s);
    rewriteLinks(document);
    doubleCheckSlime();
} else if (window.location.pathname=='/charsheet.php') {
    saveResistance();
} else if (window.location.pathname.indexOf('/fight.php')==0) {
    rewriteLinks(document);
} else if (window.location.pathname.indexOf('/clan_slimetube.php')==0) {
    rewriteLinks(document);
} else if (window.location.pathname.indexOf('/account.php')==0) {
    buildPrefs();
}
