// ==UserScript==
// @name                    Secure Connection - Force Https (SSL)
// @namespace               http://userscripts.org/scripts/show/86392
// @namespace               http://www.maisdisdonc.com/
// @description             Forces all links to use a secure connection (https).
// @version                 1.0
// @date                    10/29/2010
// @author                  Tony White
// @include                 http://*
// @license                 Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
// @license                 http://creativecommons.org/licenses/by-nc-sa/3.0/deed.fr
// ==/UserScript==

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

function fnEnableFacebookHttps() {
    var url = window.location.href;
    if(url.indexOf("http://www.facebook.com")==0 ||
        url.indexOf("http://apps.facebook.com")==0) {
        window.location.replace(location.href.replace(url.substring(0,7), "https://"));
    }
}

function fnEnableHttpsLinks() {
    var url = window.location.href;
    if(url.indexOf("https://")==0) {
        for(var i=0,link; (link=document.links[i]); i++) {
            if(link.href.indexOf("http://")==0)
            link.href = link.href.replace(link.href.substring(0,7), "https://");
        }
    }
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
    fnEnableFacebookHttps(),
    fnEnableHttpsFacebookLinks(),
    setTimeout(function() { fnEnableHttpsFacebookLinks() }, 1000);
  },
  true
);