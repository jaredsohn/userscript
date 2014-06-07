// ==UserScript==
// @name           Best Foods Checker
// @namespace      kol.interface.unfinished
// @description    Helps verify entries in the Kingdom of Loathing wiki's Best Foods (adventures) and Best Drinks lists.
// @include        http://kol.coldfront.net/thekolwiki/index.php/Best_Foods_%28adventures%29
// @include        http://kol.coldfront.net/thekolwiki/index.php/Best_Foods_(adventures)
// @include        http://kol.coldfront.net/thekolwiki/index.php/Best_Drinks
// @version        1.1
// ==/UserScript==

// Version 1.1
// - added best drinks too
// Version 1.0

function addButtons() {
    var tbl = document.getElementsByClassName('complextable');
    if (tbl) tbl = tbl[0];
    if (tbl) {
        for (var i=1;i<tbl.rows.length;i++) {
            var r = tbl.rows[i];
            var ancs = null;
            if (r.cells.length>1)
                ancs = document.evaluate( './/a', r.cells[1], null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            if(!ancs || ancs.snapshotLength==0) 
                ancs = document.evaluate( './/a', r.cells[0], null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
            for (var j=ancs.snapshotLength-1;j>=0;j--) {
                var a = ancs.snapshotItem(j);
                var h = a.getAttribute('href');
                var b = document.createElement('input');
                b.setAttribute('style','font-size:x-small;vertical-align:middle;');
                b.setAttribute('type','button');
                b.setAttribute('value','Validate');
                b.setAttribute('href',h);
                b.setAttribute('title','Click to validate '+a.innerHTML);
                b.addEventListener('click',bhandler,'false');
                if (a.nextSibling)
                    a.parentNode.insertBefore(b,a.nextSibling);
                else 
                    a.parentNode.appendChild(b);
            }
        }
    } else
        GM_log('no table');
}

function bhandler() {
    var h = this.getAttribute('href');
    var p = this.parentNode;
    var s = document.createElement('span');
    s.setAttribute('style','font-size:x-small;vertical-align:middle;');
    s.appendChild(document.createTextNode('\u00a0\u00a0checking...'));
    this.parentNode.replaceChild(s,this);
    getUrl(h,s);
}


function getUrl(u,cb) {
    GM_xmlhttpRequest({
            method: "GET",
                url: u,
                headers: {
                "User-Agent": "Mozilla/5.0",
                    "Accept": "text/xml"
                    },
                onload: function(response) {
                if (response.responseText) {
                    var adv = response.responseText.match(/<span\s*title="Adventure range:\s*([0-9.?-]+)">/im);
                    if (!adv) 
                        adv = response.responseText.match(/<td>You gain ([0-9.?-]+)\s*<a\s*href="\/thekolwiki\/index.php\/Adventures"\s*title="Adventures">Adventures?<\/a>/im);
                    var full = response.responseText.match(/You gain ([0-9?-]+)\s*<a href="\/thekolwiki\/index.php\/Fullness"\s*title="Fullness">Fullness<\/a>/im);
                    if (!full)
                        full = response.responseText.match(/You gain ([0-9?-]+)\s*<a href="\/thekolwiki\/index.php\/Drunkenness"\s*title="Drunkenness">Drunkenness<\/a>/im);
                    var level = response.responseText.match(/Level required: <b>([0-9]+)<\/b>/im);
                    var s;
                    if (level) {
                        s = level[1];
                    } else 
                        s = '-';
                    var avg;
                    if (adv) {
                        var low = Number(adv[1].replace(/\s*-.*/,'').replace(/[^0-9.]/g,''));
                        var high = Number(adv[1].replace(/[^-]*-\s*/,'').replace(/[^0-9.]/g,''));
                        avg = (low+high)/2;
                        s = s+' '+avg;
                    } else 
                        s = s+' -';
                    if (full) {
                        s = s+' '+full[1];
                        if (avg) {
                            s = s+' '+(avg/full[1]);
                        } else 
                            s = s+' -';
                    } else 
                        s = s+' - -';
                    s = '\u00a0\u00a0'+s;
                    if (cb.firstChild)
                        cb.replaceChild(document.createTextNode(s),cb.firstChild);
                    else
                        cb.appendChild(document.createTextNode(s));
                }
                
            }
        });
}


addButtons();
