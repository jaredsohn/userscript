// ==UserScript==
// @name            HuffNo
// @namespace       fredludd@gmail.com,2011-03-21:hp#v1
// @description     Replaces links to Huffington Post, and other woo sources, with text equivalents.
// @include         *
// ==/UserScript==

function adjust() {
    var re = /(huffingtonpost\.com)|(science20\.com)|(newscientist\.com)/;
    var nodes=document.evaluate("//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for(var j=0; j<nodes.snapshotLength; j++) {
        var tnode = nodes.snapshotItem(j);
        if(tnode.hostname.toLowerCase().search(re) != -1) {
          var tpn = tnode.parentNode;
          var tgt = tnode.href;
          var txt = tnode.firstChild.textContent;
          var sss = document.createElement("span");
          sss.appendChild(document.createTextNode(" [["+tgt+"]->"+txt+"<-] "));
          tpn.replaceChild(sss,tnode);
        }
    }
}

window.onload = adjust();

//huffno.user.js
