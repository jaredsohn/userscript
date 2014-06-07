// ==UserScript==
// @name           Trophy Counter
// @namespace      kol.interface.unfinished
// @description    Counts trophies and shows missing trophies in Kingdom of Loathing.
// @include        http://*kingdomofloathing.com/showplayer.php*
// @include        http://127.0.0.1:*/showplayer.php*
// @include        http://kol.coldfront.net/thekolwiki/index.php/Trophy*
// @version        1.1
// ==/UserScript==

//Version 1.1
// - make impossible trophies dimmer
//Version 1.0

function doPage() {
    // find table root of area interested in
    var yourTrophies = {};
    var count = 0;
    var c = document.evaluate('//center[text()="Trophies:"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    if (c.singleNodeValue) {
        var ts = document.evaluate('.//img',c.singleNodeValue.nextSibling,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var i=0;i<ts.snapshotLength;i++) {
            var t = ts.snapshotItem(i).getAttribute('title');
            yourTrophies[t] = true;
            count++;
        }
        GM_setValue('yourtrophies',JSON.stringify(yourTrophies));
        addButton(c.singleNodeValue,count);
        if (GM_getValue('showmissing',''))
            showMissing();
    }
}

function addButton(c,count) {
    var total = GM_getValue('knowntrophycount','?');
    c.appendChild(document.createTextNode('\u00A0'+count+'/'+total));
    var v = document.createElement('a');
    v.setAttribute('href','#');
    v.setAttribute('id','showmissingtrophybutton');
    v.setAttribute('style','font-size:x-small;vertical-align:middle;');
    fixupButton(v);
    v.addEventListener('click',bHandler,false);
	
    c.appendChild(document.createTextNode('\u00a0\u00a0\u00a0'));
    c.appendChild(v);
	
    var goWiki = document.createElement('a');
    goWiki.setAttribute('title','Click to go to the full list of trophies on the KoL wiki.');
    goWiki.setAttribute('target','_blank');
    goWiki.setAttribute('id','trophywikilink');
    goWiki.setAttribute('style','font-size:x-small;vertical-align:middle;');
    goWiki.setAttribute('href','http://kol.coldfront.net/thekolwiki/index.php/Trophy');
    goWiki.appendChild(document.createTextNode('[Load trophy list]'));
    c.appendChild(document.createTextNode('\u00A0'));
    c.appendChild(goWiki);
}

function fixupButton(v) {
    if (GM_getValue('showmissing','')) {
        v.setAttribute('title','Click to hide all missing trophies.');
        if (v.firstChild)
            v.replaceChild(document.createTextNode('[Hide Missing]'),v.firstChild);
        else
            v.appendChild(document.createTextNode('[Hide Missing]'));
    } else {
        v.setAttribute('title','Click to display all missing trophies.');
        if (v.firstChild)
            v.replaceChild(document.createTextNode('[Show Missing]'),v.firstChild);
        else
            v.appendChild(document.createTextNode('[Show Missing]'));
    }
}

function showMissing() {
    var v = document.getElementById('showmissingtrophybutton');
    if (GM_getValue('showmissing','')) {
        missing();
    } else {
        var xx = document.getElementsByClassName('showmissingaddition');
        for (var i=xx.length-1;i>=0;i--) {
            var x = xx[i];
            x.parentNode.removeChild(x);
        }
    }
    fixupButton(v);
}

function bHandler(e) {
    var b = GM_getValue('showmissing','');
    GM_setValue('showmissing', (b ? '' : 'true'));
    showMissing();
}

// locate all missing recipes
function missing() {
    if (!GM_getValue('knowntrophycount'))
        return;
    var c = document.evaluate('//center[text()="Trophies:"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    if (c.singleNodeValue && c.singleNodeValue.nextSibling) {
        var t = c.singleNodeValue.nextSibling;
        var r = t.insertRow(-1);
        r.setAttribute('class','showmissingaddition');
        var ctr = document.createElement('center');
        ctr.appendChild(document.createTextNode('Missing Trophies'));
        r.insertCell(-1).appendChild(ctr);
		
        r = t.insertRow(-1);
        r.setAttribute('class','showmissingaddition');
        td = r.insertCell(-1);
        td.setAttribute('align','center');
		
        var lastrc = 0;
        var alltrophies = JSON.parse(GM_getValue('knowntrophies','[]'));
        var yourtrophies = JSON.parse(GM_getValue('yourtrophies','{}'));
        var parity = 1;
        for (var i=0;i<alltrophies.length;i++) {
            if (!alltrophies[i])
                continue;
            if (!yourtrophies[alltrophies[i].name]) {
                if (lastrc==0) {
                    td.appendChild(document.createElement('br'));
                    parity = 1-parity;
                }
                lastrc = (lastrc+1) % (5+parity);
                var img = document.createElement('img');
                img.setAttribute('src','http://images.kingdomofloathing.com/otherimages/trophy/'+alltrophies[i].img);
                img.setAttribute('width','100');
                img.setAttribute('height','100');
                img.setAttribute('title',i+'. '+alltrophies[i].name+': '+alltrophies[i].cause);
				if (alltrophies[i].name.match(/^Silver Yeti$/) ||
					alltrophies[i].name.match(/^Golden Yeti$/) ||
					alltrophies[i].name.match(/^This Lousy Trophy$/) ||
					alltrophies[i].name.match(/^Friend of Elves$/) ||
					alltrophies[i].name.match(/^Reindeer Hunter$/) ||
					alltrophies[i].name.match(/^Look, Ma! No Pants!$/)) {
					img.setAttribute('style','opacity:0.4');
					img.setAttribute('title',i+'. '+alltrophies[i].name+': '+alltrophies[i].cause+' [note: no longer obtainable]');
				}
                td.appendChild(img);
            }
        }
        r = t.insertRow(-1);
        r.setAttribute('class','showmissingaddition');
        td = r.insertCell(-1);
        td.setAttribute('bgcolor','black');
        td.setAttribute('height','1');
    }
    return true;
}

// return a new copy of the master list
function retrieveCopy(page) {
    var r = JSON.parse(GM_getValue('knowntrophies','[]'));
    return r;
}

function strip(s) {
    if (!s)
        return '';
    return s.replace(/^\s+/,'').replace(/\s+$/,'');
}

function removeHTML(s) {
    if (!s)
        return '';
    return s.replace(/<[^>]*>/g,'');
}

// gather data from a kol wiki page
function gather() {
    var trophies = [];
    var count=0;
	
    var ts = document.evaluate('//table[@class="sorttable"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    var t = ts.singleNodeValue;
    if (t) {
        for (var i=1;i<t.rows.length;i++) {
            var r = t.rows[i];
            var tnum = Number(r.cells[0].innerHTML);
            if (tnum) {
                if (r.cells[1] && r.cells[1].firstChild) {
                    var tname = strip(r.cells[1].firstChild.innerHTML);
                    var timg = strip(r.cells[3].innerHTML);
                    var tcause = strip(removeHTML(r.cells[4].innerHTML));
                    if (tname && timg) {
                        timg = timg.replace(/ /g,'_')+'.gif';
                        count++;
                        trophies[tnum] = {'name':tname,'img':timg,'cause':tcause};
                        //GM_log('found trophy #'+tnum+': '+tname+', img='+timg+', cause='+tcause);
                    }
                }
            } 
        }
    }
    GM_log('Loaded '+count+' trophies from the wiki');
    if (count>0) {
        GM_setValue('knowntrophycount',count);
        GM_setValue('knowntrophies',JSON.stringify(trophies));
    }
}


if (window.location.href.indexOf('http://kol.coldfront.net/thekolwiki/index.php/')>=0) {    
    gather();
} else {
    doPage();
}
