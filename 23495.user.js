// ==UserScript==
// @name           Incruster
// @namespace      http://hacks.wuonm.com
// @description    Make twitter even slower replacing picture urls à la tinyurl with the picture itself.
// @include        *twitter.com*
// ==/UserScript==

const kPhotoDomains = {
    "twitxr.com": { 
        "th": function(u){return 'http://twitxr.com/image/' + u.split("/")[5] + '/th/'},
        "etc": function(e){e.parentNode.innerHTML = e.parentNode.innerHTML.replace(/ - photo at.*/, "")}
    }
}

function setThumbnail(urlElem, fn) {
    var photoUrl = urlElem.href;
    var elemParent = urlElem.parentNode;
    var td = elemParent.parentNode;
    var a = document.createElement('A');
    var img = document.createElement('IMG');
    a.href = photoUrl;
    a.className = 'incruster';
    img.src = fn(photoUrl);
    img.className = 'incruster';
    a.appendChild(img);
    td.appendChild(a);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('a.incruster {display:block; clear:both;}');
addGlobalStyle('img.incruster {display:block;border-right:solid 1px black;border-bottom:solid 1px gray;margin-left:auto; margin-right:auto; padding:4px;}');

var cls;
for(var photoDomain in kPhotoDomains) {
    var xpath = "//a[contains(@href, '" + photoDomain + "')]";
    thFn = kPhotoDomains[photoDomain].th;
    var urlSet = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i=0; i<urlSet.snapshotLength; i++){
        var u = urlSet.snapshotItem(i);
        setThumbnail(u, kPhotoDomains[photoDomain].th);
        kPhotoDomains[photoDomain].etc(u);
    }
}
