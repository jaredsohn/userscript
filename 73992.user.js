// ==UserScript==
// @name           Golem.de Hype-Blocker
// @namespace      http://www.golem.de/
// @description    Block Hype-Articles on Golem.de
// @include        http://www.golem.de/*
// ==/UserScript==

// Hype-Words to block
var hyped = new Array(/iP(ad|hone|od)/);

// No editing required below this line
function removeHyped(node, content)
{
    for (var i = 0; i < hyped.length; i++) {
        if (!content.match(hyped[i])) {
            continue;
        }

        node.parentNode.removeChild(node);
    }
}

var ps       = new Array();
var elements = document.getElementsByTagName('p');

for (var i = 0; i < elements.length; i++) {
    ps.push(elements[i]);
}

for (var i = 0; i < ps.length; i++) {
    p = ps[i];

    if (p.className == 'meldungsmall') {
        var content = p.childNodes[1].firstChild.firstChild.textContent;
        removeHyped(p, content);
    } else if (p.className = 'lmtext') {
        var content = p.firstChild.textContent;
        removeHyped(p, content);
    }
}
