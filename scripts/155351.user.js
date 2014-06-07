// ==UserScript==
// @name        E*PVP Thanks minifier
// @author      Whoknowsit
// @namespace   http://www.elitepvpers.com
// @description Minify the post-thanks box
// @version     0.5
// @run-at      document-end
// @grant       none
//
// @include     /^https?://(www\.)?elitepvpers\.com/forum/.*/
// ==/UserScript==

function getElementsStartsWithId(id) {
    var children = document.body.getElementsByTagName('*'),
        elements = [],
        child,
        i,
        length = 0;

    for (i = 0, length = children.length; i < length; i += 1) {
        child = children[i];
        if (child.id.substr(0, id.length) === id) {
            elements.push(child);
        }
    }
    return elements;
}

var elms = getElementsStartsWithId('post_thanks_box_'),
    i,
    length = 0,
    thanksbox,
    alt2,
    cnt;

for (i = 0, length = elms.length; i < length; i += 1) {
    thanksbox = document.getElementById(elms[i].id);
    alt2 = thanksbox.getElementsByClassName('alt2')[0];

    thanksbox.style.maxHeight = '150px';
    thanksbox.style.overflow = 'auto';

    // Revert the recent changes (Optional)
    if (alt2) {
        cnt = parseInt(document.getElementById(elms[i].id).getElementsByClassName('cwnewsdate')[0].innerHTML, 10);
        alt2.innerHTML = '<strong>The Following ' + cnt + (cnt === 1 ? ' User' : ' Users') + ' Say Thank You For This Useful Post:</strong>';
        alt2.removeAttribute('align', 0);
    }
}