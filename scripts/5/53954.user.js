// ==UserScript==
// @name           NoSolved
// @namespace      griddlers
// @description    Remove Solved from Griddlers list and make puzzles without the reloading page.
// @include        http://griddlers.net/pages/gpuzzles*
// ==/UserScript==

var div = null;
var lel = null;
// Remove a DOM element
function remove(el) {
    el.parentNode.removeChild(el);
}

function load(event) {
    el = event.target;
    while (el.tagName!="TR") el = el.parentNode;
    if (lel!=null) lel.style.background="";
    el.style.background="cyan";
    lel = el;
    url = el.childNodes[1].childNodes[0].href;
    
    GM_xmlhttpRequest({
        'method': 'GET',
        'url': url,
        'onload': function(res) {
            div.innerHTML = res.responseText.match(/<applet[^]*?applet>/im)[0];
        }
    });
    event.stopPropagation();
    event.preventDefault();
}

var res = document.evaluate( "/html/body/table[3]/tbody/tr/td[2]/table[3]/tbody/tr/td[10]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
    
for ( var i=0 ; i < res.snapshotLength; i++ )
{
    el = res.snapshotItem(i);
    c  = el.textContent;
    if (c.match("/")) {
        remove(el.parentNode);
    } else {
        el.parentNode.addEventListener('click', load, true);
    }
}

var res = document.evaluate( "/html/body/table[3]/tbody/tr/td[2]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null );
el = res.singleNodeValue

div = document.createElement("div");
div.style.border="1px solid #000";

el.appendChild(div);


