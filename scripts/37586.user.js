// ==UserScript==
// @name           index
// @namespace      index
// @description    index delinker
// @include        http://index.hu/*
// @include 	   http://sportgeza.hu/*
// @version        0.2.3
// @copyright      r00t
// ==/UserScript==

function xp(_exp, t, n) {
 var exp = _exp || "//*";
 var type = t || 6;
 var node = n || document;
 return type==9 ? document.evaluate(exp, node, null, 9, null).singleNodeValue:
 document.evaluate(exp, node, null, type, null);
}
function removeId(id_node){
 var n, t = typeof id_node;
 if(t=='object'||t=='string') {
    n = t == 'object' ? id_node : $id(id_node);
    n.parentNode.removeChild(n);
    return true;
 }
 else {return false;}
}

var links = xp("//a[contains(@href,'/x.php?')]")
for (var i=0; i<links.snapshotLength; i++) {
  var link = links.snapshotItem(i);
  var str = link.href.substr(link.href.indexOf('=http')+1);
  link.href = unescape(str);
}
links = xp("//div[contains(@class,'microsite') or contains(@class,'hirdetes') or @id='microsite' or @id='ctravelbox' or @id='booklinebox' or @id='tulelokeszlet_nu' or @id='cikk_bottom_adlink'] | //div[@id='also_bannerek']|//iframe");
for (var i=0; i<links.snapshotLength; i++) {
  removeId(links.snapshotItem(i));
}
