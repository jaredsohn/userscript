// ==UserScript==
// @name           Hobo Binder Tracker
// @namespace      kol.interface.unfinished
// @description    Numbers and lists missing locations in your hobo code binder quest log in KOL.
// @include        http://*kingdomofloathing.com/questlog.php?which=5
// @include        http://127.0.0.1:*/questlog.php?which=5
// ==/UserScript==

//Version 1.1

var locations = 
    new Array(
              {name:'The Arid, Extra-Dry Desert',blat:121,descr:'unhydrated'},
              {name:'Belowdecks',blat:160,descr:''},
              {name:'The Bugbear Pen',blat:47,descr:'pre-Felonia'},
              {name:'Camp Logging Camp',blat:44,descr:''},
              {name:'Cobb\'s Knob Menagerie, Level 3',blat:53,descr:''},
              {name:'The Cola Wars Battlefield',blat:85,descr:'no uniform'},
              {name:'The Defiled Nook',blat:54,descr:''},
              {name:'The Enormous Greater-Than Sign',blat:38,descr:''},
              {name:'The eXtreme Slope',blat:63,descr:''},
              {name:'The "Fun" House',blat:20,descr:''},
              {name:'The Hippy/Frat Battlefield',blat:132,descr:'frat warrior fatigues'},
              {name:'The Lair of the Ninja Snowmen',blat:62,descr:''},
              {name:'The Limerick Dungeon',blat:19,descr:''},
              {name:'The Misspelled Cemetary',blat:21,descr:'pre-cyrpt'},
              {name:'Noob Cave',blat:91,descr:''},
              {name:'The Penultimate Fantasy Airship',blat:81,descr:''},
              {name:'The Poker Room',blat:71,descr:''},
              {name:'The Road to White Citadel',blat:99,descr:''},
              {name:'The Sleazy Back Alley',blat:112,descr:''},
              {name:'Thugnderdome',blat:46,descr:''}
              );

function doPage() {
    var listing = document.getElementsByTagName('td');
    var count=0;
    var existing = new Array();
    var tblnode=null;
    for (var i=0;i<listing.length;i++) {
        tblnode = listing[i];
        if (tblnode.firstChild && tblnode.firstChild.data &&
			tblnode.firstChild.data.indexOf('You have found')==0 &&
			tblnode.firstChild.data.indexOf('in the following zones:')>0) {
            // found the table
            var list = tblnode.firstChild.nextSibling; // ul
            var olist = document.createElement('ol');
            for (var j=0;j<list.childNodes.length;j++) {
                var item = list.childNodes[j];
                if (item.firstChild) {
                    existing[count++] = item.firstChild.data;
                    //GM_log(existing[count-1]);
                    olist.appendChild(item.cloneNode(true));
                    //item.firstChild.data = count+'. '+item.firstChild.data;
                } 
            }
            list.parentNode.replaceChild(olist,list);
            break;
        }
    }
    if (!tblnode)
        return;
    // now to display any missing
    var toprow = document.createElement('tr');
    var topcell = document.createElement('td');
    var missing = locations.length-count;
    if (missing==0) {
        topcell.appendChild(document.createTextNode('You have all the hobo codes'));
    } else {
        topcell.appendChild(document.createTextNode('You are missing '+missing+' hobo code'+
                                                    ((missing==1)? ':':'s:')));
    }
    var newlist = document.createElement('ol');
    newlist.setAttribute('start',count+1);
    for (var i=0;i<locations.length;i++) {
        for (var j=0;j<count;j++) {
            if (existing[j]==locations[i].name)
                break;
        }
        if (j==count) {
            var newitem = document.createElement('li');
            var link = document.createElement('a');
            link.href='adventure.php?snarfblat='+locations[i].blat;
            var text = document.createTextNode(locations[i].name+
                                               ((locations[i].descr!='') ? ' ('+locations[i].descr+')':''));
            link.appendChild(text);
            newitem.appendChild(link);
            newlist.appendChild(newitem);
        }
    }
    topcell.appendChild(newlist);

    // add equip link
    var hash=findPwdhash();
    var elink = document.createElement('a');
    elink.href='inv_equip.php?pwd='+hash+'&which=2&action=equip&whichitem=3220';
    elink.appendChild(document.createTextNode('equip binder'));
    var ctr = document.createElement('center');
    ctr.appendChild(elink);
    //topcell.appendChild(document.createElement('br'));
    topcell.appendChild(ctr);

    toprow.appendChild(topcell);
    tblnode.parentNode.parentNode.appendChild(toprow);
}

function findPwdhash() {
    var somef=window.parent.frames;
    var goo = null;
    for(var j=0;j<somef.length;j++) {
        if (somef[j].name=="charpane") {
            goo=somef[j];
            var page = goo.document.documentElement.innerHTML;
            var find = 'pwdhash = ';
            if (page.indexOf(find) >= 0) {
                var i = page.indexOf(find);
                var j = find.length;
                var ps = page.substr(i+j+2);
                var foundit = page.substr(i+j+1,ps.indexOf('"')+1);
                return foundit;
            }
        }
    }
    return null;
}

doPage();
