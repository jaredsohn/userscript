// ==UserScript==
// @name           Obama Digg Filter
// @namespace      person.barnes.david
// @include        http://digg.com/
// ==/UserScript==

var node = document.getElementById('topten-list');
if (node.hasChildNodes())
{
    for (var i = 0; i < node.childNodes.length; i++)
    {
        var childNode = node.childNodes[i];
        var text = childNode.firstChild.firstChild.firstChild.nodeValue;
        if (text.toLowerCase().indexOf('obama') != -1)
            childNode.style.display = 'none';
    }
}

for (var i = 0;; i++)
{
    var el = document.getElementById('enclosure' + i);
    if (!el)
        break;
    var text = el.textContent;
    if (text.toLowerCase().indexOf('obama') != -1)
        el.style.display = 'none';
}
