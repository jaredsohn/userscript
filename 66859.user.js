// ==UserScript==
// @name           Nun Meat
// @namespace      kol.interface.unfinished
// @description    Keeps track of the amount of meat the nun's have recovered during the island war in Kingdom of Loathing.
// @include        http://*kingdomofloathing.com/fight.php*
// @include        http://*kingdomofloathing.com/charpane.php*
// @include        http://127.0.0.1:*/charpane.php*
// @include        http://127.0.0.1:*/fight.php*
// @version        1.0.1
// ==/UserScript==

//Version 1.0.1
// - make more robust when playername isn't found
//Version 1.0

// get the adventure again url, if found
function getAdvAgain() {
    var links = document.getElementsByTagName('a');
    for (var i=0;i<links.length;i++) {
        var href = links[i].getAttribute('href');
        if (href && href.indexOf('adventure.php?')==0) {
            return href;
        }
    }
}

function checkNuns(doc) {
    var snap = doc.evaluate( '//td[contains(.," approaches you and takes the Meat.")]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (snap.singleNodeValue) 
        return true;
    return false;
}

function getQuarter(doc) {
    var qs = [ "Almost all of the Meat is still in the hands of those bandits",
               "You've recovered a good portion of the stolen Meat, but there's still plenty left." ,
               "You've recovered more than half of what was stolen, Adventurer!  It won't be long now!",
               "You're almost done!  It won't be long now until all of the Meat is recovered!",
               "I think this is the last of it!  However can we repay you for your assistance?" ];
    for (var i=0;i<qs.length;i++) {
        var snap = doc.evaluate( '//td[contains(.,"'+qs[i]+'")]', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (snap.singleNodeValue) {
            return i;
        }
    }
    return -1;
}

function manualMeat() {
    var selected = prompt("Change meat total to:\n", this.getAttribute('amount'));
    if (selected!=null) {
        selected = Number(selected);
        saveMeat(selected);
        if (this.firstChild) {
            this.removeChild(this.firstChild);
            addMeatText(this,selected,this.getAttribute('amount'),this.getAttribute('quarter'));
        }
    }
}

function addMeatText(link,tmeat,mmeat,quarter) {
    var rem = 100000-tmeat;
    mmeat = (mmeat > 0) ? Math.ceil(rem/mmeat) : 0;
    if (quarter==4 || quarter<0)
        link.appendChild(document.createTextNode(tmeat+' Meat.'));
    else
        link.appendChild(document.createTextNode(tmeat+' Meat. ('+rem+' meat, or about '+mmeat+' turn'+((mmeat==1) ? '' : 's')+' left)'));
}

// update amount of meat
function updateMeat(doc,quarter) {
    var ps = doc.evaluate( '//td[contains(., "You gain ")]', doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i=ps.snapshotLength-1;i>=0;i--) {
        var m = ps.snapshotItem(i).innerHTML;
        var mm = m.match(/^You gain ([\d]+) Meat/);
        if (mm) {
            //GM_log('found meat text: '+m+', and meat: '+mm[1]);
            var mmeat = Number(mm[1]);
            var meat =  mmeat + restoreMeat();
            //GM_log('running total: '+meat);
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            var q = ['blue','green','darkorange','red','black'];
            q = q[Math.max(0,Math.min(4,quarter))];
            td.setAttribute('style','color:'+q+';font-size:small;');
            td.setAttribute('colSpan','2');
            td.setAttribute('align','center');

            var link=document.createElement('a');
            link.addEventListener("click", manualMeat, true);
            link.setAttribute("amount", mmeat);
            link.setAttribute("quarter", quarter);
            link.setAttribute("title", 'Click to change the stored total.');

            addMeatText(link,meat,mmeat,quarter);

            td.appendChild(link);
            tr.appendChild(td);

            saveMeat(meat);
            ps.snapshotItem(i).parentNode.parentNode.appendChild(tr);
            return meat;
        }
    }
    return 0;
}

// utility to get player name; hacked/stolen from Antimarty's fortune cookie script
function getPlayerNameFromCharpane() {
    var somef=window.parent.frames;
    var goo;
    for(var j=0;j<somef.length;j++) {
        if (somef[j].name=="charpane") {
            goo=somef[j];
            var username = goo.document.getElementsByTagName("b");
            if (!username || username.length < 1) break;
            username = username[0];
            if (!username) break;
            username = username.firstChild;
            if (!username) break;
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
            if (!username) break;
            username = username.nodeValue;
            if (!username) break;
            username = username.toLowerCase();
            GM_setValue('playername',username);
            return username;
        }
    }
    return GM_getValue('playername','');
}


function saveMeat(meat) {
    var pn = getPlayerNameFromCharpane();
    if (pn) {
        GM_setValue(pn+'_nunmeant',meat);
    }
}

function restoreMeat() {
    var pn = getPlayerNameFromCharpane();
    if (pn) {
        return GM_getValue(pn+'_nunmeant',0);
    }
    return 0;
}

if(window.location.pathname.indexOf('/fight.php')==0) {
    if(checkNuns(document)) {
        var q = getQuarter(document);
        updateMeat(document,q);
        //GM_log('quarter='+q);
        if (q==4)
            saveMeat(0);
    }
} else {
    if (document.evaluate("//img[contains(@src,'http://images.kingdomofloathing.com/otherimages/inf_small.gif')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
        saveMeat(0);
    }
}
