// ==UserScript==
// @name           Tattoo Counter
// @namespace      kol.interface.unfinished
// @description    Counts tattoos and shows missing tattoos in Kingdom of Loathing.
// @include        http://*kingdomofloathing.com/account_tattoos.php*
// @include        http://127.0.0.1:*/account_tattoos.php*
// @include        http://kol.coldfront.net/thekolwiki/index.php/Tattoo
// @include        http://kol.coldfront.net/thekolwiki/index.php/Tattoos
// @version        1.2.1
// ==/UserScript==

//Version 1.2.1
// - fix for minor format editing of wiki page
//Version 1.2
// - update for latest sspd tattoo
//Version 1.1
// - fixed to handle changed html presentation from wiki update
//Version 1.0

function doPage() {
    // find table root of area interested in
    var yourTattoos = {};
    var count = 0;
    var c = document.evaluate('//b[text()="Change Your Tattoo:"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    if (c.singleNodeValue) {
        var ts = document.evaluate('//form[@action="account_tattoos.php"]//img',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var i=0;i<ts.snapshotLength;i++) {
            var t = ts.snapshotItem(i).getAttribute('title');
            var s = ts.snapshotItem(i).getAttribute('src');
            if (s && t) {
                s = s.replace(/.*\//,'');
                yourTattoos[s] = t;
                //GM_log('found tattoo: '+t+' with image '+s);
                count++;
            }
        }
        GM_setValue('yourtattoos',JSON.stringify(yourTattoos));
        addButton(c.singleNodeValue.parentNode,count);
        if (GM_getValue('showmissing',''))
            showMissing();
    } 
}

function addButton(c,count) {
    var total = GM_getValue('knowntattoocount','?');
    c.appendChild(document.createTextNode('\u00A0'+count+'/'+total));
    var v = document.createElement('a');
    v.setAttribute('href','#');
    v.setAttribute('id','showmissingtattoobutton');
    v.setAttribute('style','font-size:x-small;vertical-align:middle;color:white;');
    fixupButton(v);
    v.addEventListener('click',bHandler,false);
	
    c.appendChild(document.createTextNode('\u00a0\u00a0\u00a0'));
    c.appendChild(v);
	
    var goWiki = document.createElement('a');
    goWiki.setAttribute('title','Click to go to the full list of tattoos on the KoL wiki.');
    goWiki.setAttribute('target','_blank');
    goWiki.setAttribute('id','tattoowikilink');
    goWiki.setAttribute('style','font-size:x-small;vertical-align:middle;color:white;');
    goWiki.setAttribute('href','http://kol.coldfront.net/thekolwiki/index.php/Tattoo');
    goWiki.appendChild(document.createTextNode('[Load tattoo list]'));
    c.appendChild(document.createTextNode('\u00A0'));
    c.appendChild(goWiki);
}

function fixupButton(v) {
    if (GM_getValue('showmissing','')) {
        v.setAttribute('title','Click to hide all missing tattoos.');
        if (v.firstChild)
            v.replaceChild(document.createTextNode('[Hide Missing]'),v.firstChild);
        else
            v.appendChild(document.createTextNode('[Hide Missing]'));
    } else {
        v.setAttribute('title','Click to display all missing tattoos.');
        if (v.firstChild)
            v.replaceChild(document.createTextNode('[Show Missing]'),v.firstChild);
        else
            v.appendChild(document.createTextNode('[Show Missing]'));
    }
}

function showMissing() {
    var v = document.getElementById('showmissingtattoobutton');
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

// show all missing tattoos
function missing() {
    if (!GM_getValue('knowntattoocount'))
        return;
	
    var tbl = document.evaluate('//form[@action="account_tattoos.php"]//center/table',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    if (tbl.singleNodeValue) {
        var t = tbl.singleNodeValue;
        var r = t.insertRow(-1);
        r.setAttribute('class','showmissingaddition');
        var c = r.insertCell(-1);
        c.setAttribute('colspan','12');
        c.setAttribute('align','center');
        c.appendChild(document.createTextNode('Missing Tattoos'));
		
        r = t.insertRow(-1);
        r.setAttribute('class','showmissingaddition');
        c = r.insertCell(-1);
        c.setAttribute('align','center');
		
        var lastrc = 0;
        var alltattoos = JSON.parse(GM_getValue('knowntattoos','[]'));
        var eventtattoos = JSON.parse(GM_getValue('knowneventtattoos','[]'));
        var yourtattoos = JSON.parse(GM_getValue('yourtattoos','{}'));
        var parity = 1;
        for (var sigil in alltattoos) {
            if (!yourtattoos[sigil]) {
                if (lastrc==0) {
                    r = t.insertRow(-1);
                    r.setAttribute('class','showmissingaddition');
                }
                r.insertCell(-1);
                c = r.insertCell(-1);
                c.setAttribute('valign','center');
                lastrc = (lastrc+1) % 6;
                var img = document.createElement('img');
                img.setAttribute('src','http://images.kingdomofloathing.com/otherimages/sigils/'+sigil);
                img.setAttribute('width','50');
                img.setAttribute('height','50');
                img.setAttribute('title','Missing tattoo: '+sigil.replace(/\.gif$/,''));
                var lnk = alltattoos[sigil];
                if (lnk!='#') {
                    var a = document.createElement('a');
                    img.setAttribute('border','0');
                    a.setAttribute('href','http://kol.coldfront.net'+lnk);
                    a.setAttribute('target','_blank');
                    a.appendChild(img);
                    img = a;
                }
                c.appendChild(img);
            }
        }
		
        for (var e in eventtattoos) {
            var found = false;
            var lastSigil;
            var yourSigil;
            for (var sigil in eventtattoos[e]) {
                lastSigil = eventtattoos[e][sigil];
                if (yourtattoos[eventtattoos[e][sigil]]) {
                    yourSigil = eventtattoos[e][sigil];
                    found = true;
                }
            }
            if (!found || lastSigil!=yourSigil) {
                if (lastrc==0) {
                    r = t.insertRow(-1);
                    r.setAttribute('class','showmissingaddition');
                }
                r.insertCell(-1);
                c = r.insertCell(-1);
                c.setAttribute('valign','center');
                lastrc = (lastrc+1) % 6;
                var img = document.createElement('img');
                img.setAttribute('src','http://images.kingdomofloathing.com/otherimages/sigils/'+lastSigil);
                img.setAttribute('width','50');
                img.setAttribute('height','50');
                if (!found)
                    img.setAttribute('title','Missing tattoo: '+lastSigil.replace(/\.gif$/,''));
                else
                    img.setAttribute('title','You have tattoo version '+yourSigil.replace(/\.gif$/,'')+', but are still missing tattoo '+lastSigil.replace(/\.gif$/,''));
                c.appendChild(img);
            }
        }
    }
    return true;
}

// gather a section of tattoos
function gatherTattoos(a,tattoos) {
    var count=0;
    var t = a.nextSibling;
    while (t && t.tagName!='TABLE') {
        if (t.tagName=='H2')
            return;
        t = t.nextSibling;
    }
    if (t) {
        var ts = document.evaluate('.//img',t,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var i=0;i<ts.snapshotLength;i++) {
            var tsa = ts.snapshotItem(i).getAttribute('alt');
            if (tsa) {
                tsa = tsa.replace(/Image:/i,'').replace(/ /g,'_').toLowerCase();
                if (tsa=='fratboytat.gif') tsa = 'fratboy.gif';
                else if (tsa=='minertat.gif') tsa = 'miner.gif';
                else if (tsa=='clowntat.gif') tsa = 'clown.gif';
                else if (tsa=='nobeertat.gif') tsa = 'nobeer.gif';
                else if (tsa=='palette2.gif') tsa = 'palette.gif';
                else if (tsa=='martinitat.gif') tsa = 'martini.gif';
                // skip hobotat 
                if (tsa!='hobotat19.gif') {
                    if (ts.snapshotItem(i).parentNode.tagName=='A')
                        tattoos[tsa] = ts.snapshotItem(i).parentNode.getAttribute('href');
                    else
                        tattoos[tsa] = '#';
                    count++;
                }
                //GM_log('wiki tattoo: '+tsa+' ');
            }
        }
        if (t.nextSibling && t.nextSibling.tagName!='H2')
            gatherTattoos(t,tattoos);
    }
}

// gather data from a kol wiki page
function gather() {
    var tattoos = {};
    var eventTattoos = {};
    var count=0;
    var sections = ['Class','Outfit','Ascension'];
	
    for (var i=0;i<sections.length;i++) {
        var ts = document.evaluate('//span[@id="'+sections[i]+'_Tattoos"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
        //GM_log('=============='+sections[i]+'===========');
        if (ts.singleNodeValue)
            gatherTattoos(ts.singleNodeValue.parentNode,tattoos);
        //else
        //  GM_log('====> no tattoos in this section');
    }
	
    var ts = document.evaluate('//span[@id="Miscellaneous_Tattoos"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    if (ts.singleNodeValue) {
        var tempTattoos = [];
        gatherTattoos(ts.singleNodeValue.parentNode,tempTattoos);
        eventTattoos['sspd'] = [];
        for (var s in tempTattoos) {
            var m = s.match(/^sspd.*([0-9]+)\.gif/);
            if (!m)
                m = s.match(/^sspd([0-9]+).*\.gif/);
            if (!m)
                m = s.match(/^sspd[a-z]*([0-9]+)[a-z]*\.gif/);
            if (m) {
                eventTattoos['sspd'][m[1]] = s;
                //GM_log('sspd tattoo '+m[1]+' = '+s);
            } 
        }
    }
	
    var ts = document.evaluate('//span[@id="Event_Tattoos"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    if (ts.singleNodeValue) {
        var tempTattoos = [];
        gatherTattoos(ts.singleNodeValue.parentNode,tempTattoos);
        eventTattoos['aol'] = [];
        for (var s in tempTattoos) {
            var m = s.match(/^aol.*([0-9]+)\.gif/);
            if (m) {
                eventTattoos['aol'][m[1]] = s;
                //GM_log('aol tattoo '+m[1]+' = '+s);
            }
        }
        eventTattoos['hobotat'] = ['hobotat1.gif','hobotat2.gif','hobotat3.gif','hobotat4.gif','hobotat5.gif',
                                   'hobotat6.gif','hobotat7.gif','hobotat8.gif','hobotat9.gif','hobotat10.gif',
                                   'hobotat11.gif','hobotat12.gif','hobotat13.gif','hobotat14.gif','hobotat15.gif',
                                   'hobotat16.gif','hobotat17.gif','hobotat18.gif','hobotat19.gif'];
    }
	
    for (var x in tattoos) 
        count++;
    for (var x in eventTattoos) {
        count++;
    }
	
    GM_log('Loaded '+count+' tattoos from the wiki');
    if (count>0) {
		GM_setValue('knowntattoocount',count);
		GM_setValue('knowntattoos',JSON.stringify(tattoos));
		GM_setValue('knowneventtattoos',JSON.stringify(eventTattoos));
    }
}


if (window.location.href.indexOf('http://kol.coldfront.net/thekolwiki/index.php/')>=0) {    
    gather();
} else {
    doPage();
}
