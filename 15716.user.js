// ==UserScript==
// @name           utasuki
// @namespace      utasuki.gm.hakobe.jp
// @description    utasuki on anison utau ko
// @include        http://homepage1.nifty.com/yottoide/hyperjoy.html
// ==/UserScript==

var li = getElementsByXPath('//ul/li/ul/li');

var id_re = new RegExp('([0-9]+)／');
for (var i = 0; i < li.length; i++) {
    if(! li[i].innerHTML.match(id_re)) {
        continue;
    }
    var id = RegExp.$1;
    
    var reg_url = 'http://joysound.com/ex/search/karaoke/_selSongNo_'
                  + id + '_song.htm';
                  
    var reg_node = document.createElement('span');
    reg_node.innerHTML = '<a href="' + reg_url + '" target="blank_"> うたスキで表示 </a>';
    li[i].insertBefore(reg_node, li[i].firstChild);
}

function getElementsByXPath(xpath, node) {
    var node = node || document
    var nodesSnapshot = document.evaluate(xpath, node, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    var data = []
    for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
        data.push(nodesSnapshot.snapshotItem(i))
    }
    return (data.length >= 1) ? data : null
}

function log(message) {
    if (typeof console == 'object') {
        console.log(message)
    }
    else {
        GM_log(message)
    }
}