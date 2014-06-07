// ==UserScript==
// @name                    Force HTTPS links to Facebook
// @description             Forces HTTP links to Facebook to use HTTPS instead, to get around a filter
// ==/UserScript==

// based on http://userscripts.org/scripts/review/86392

function $(q, root, single) {
    if (root && typeof root == 'string') { root = $(root, null, true); }
    root = root || document;
    if (q[0]=='#') { return root.getElementById(q.substr(1)); }
    else if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
        if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
        return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
    return root.getElementsByTagName(q);
}

function fnEnableHttpsFacebookLinks(){
    var links = $("//a[contains(@href,'facebook.com')]");
//alert(links.snapshotItem(1).href);
    for (var i=0; i<links.snapshotLength; i++) {
        links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/^http:\/\/([^\.]*\.)?facebook\.com\/l\.php\?u\=http\%([^\.]*\.)/,'https://$1facebook.com/l.php?u=https%$2');
        links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/^http:\/\/([^\.]*\.)?facebook\.com\//,'https://$1facebook.com/');
    }
}

document.addEventListener(
  'load',
  function() {
    fnEnableHttpsFacebookLinks(),
    setTimeout(function() { fnEnableHttpsFacebookLinks() }, 1000);
  },
  true
);