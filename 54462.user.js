// ==UserScript==
// @name           DeepWiki
// @namespace      kol.interface.unfinished
// @description    Adds an inline display of actual effects to acquired effects in potion and item descriptions on KoL wiki pages.
// @include        http://kol.coldfront.net/thekolwiki*
// @version        1.2
// ==/UserScript==

// Version 1.2
//  - even better matching code
// Version 1.1
// - wiki changes broke matching; changed method
// Version 1.0.2
//  - better matching code
// Version 1.0.1
//  - trivial change to better match malformed effect text on the wiki

function findEffect(acq) {
    var ps = document.evaluate('//td[text()="You '+acq+' an effect: "]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i=ps.snapshotLength-1;i>=0;i--) {
        var p = ps.snapshotItem(i);
        var pps = document.evaluate('b/a[@title]',p,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var j=pps.snapshotLength-1;j>=0;j--) {
            var pp = pps.snapshotItem(j);
            var u = 'http://kol.coldfront.net'+pp.getAttribute('href');
            //GM_log('found effect: '+(pp.innerHTML));
            getUrl(u,p.parentNode);
        }
    }
}

function getUrl(u,p) {
    GM_xmlhttpRequest({
        method: "GET",
        url: u,
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/xml"
        },
        onload: function(response) {
            var m = response.responseText.match(/\<(p|span)\s*style=\"[^\"\>]*color:blue;\s*font-weight:bold;\s*\"\>.*/i);
            if (m) {
                //GM_log('m='+m);
                var t = m[1];
                m = m[0];
                var r = new RegExp('\<(/?'+t+')( |\>)','ig');
                var mm = r.exec(m);
                var count = 0;
                var last = 0;
                while (mm) {
                    if (mm[1]==t) count++;
                    else {
                        count--;
                        if (count==0) {
                            last = r.lastIndex;
                            break;
                        }
                    }
                    mm = r.exec(m);
                }
                var eff = m.substring(0,last);
                //GM_log("found the effect: "+eff);
                
                var f = document.createElement('font');
                f.setAttribute('size','1');
                f.innerHTML='<p style="text-align:center;line-height:12px;">'+eff+'</p>'; 
                //GM_log('creating font with innerHTML: '+f.innerHTML);
                var tr = document.createElement('tr');
                //var tr = tb.insertRow(-1);
                var td = tr.insertCell(-1);
                td.setAttribute('colspan','2');
                td.appendChild(f);
                if (p.nextSibling)
                    p.parentNode.insertBefore(tr,p.nextSibling);
                else
                    p.parentNode.appendChild(tr);
            } else
            GM_log('cannot find effect: '+response.responseText);
        }
    });
}

findEffect('acquire');
findEffect('lose');
