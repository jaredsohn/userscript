// ==UserScript==
// @match http://www.stuff.co.nz/*
// @name No Rugby on stuff.co.nz
// @description  Remove rugby related content from stuff.co.nz
// ==/UserScript==

var terms = /rugby|RWC|world-cup/i;

var links = document.getElementsByTagName("a");
var justlink = {'Network-Footer-Headlines':''};
var trailingelm = {'first_headline':'', 'hbox_body_right_caption':'', 'other_headline':'', 'home-slide-left':''};

for(var i = 0;i < links.length; i++) {
    var link = links[i];
    var href = links[i].href;

    if (href.match(terms)) {

        if (link.parentNode.className in justlink) {
            hide(link);
        } else if (link.parentNode.className in trailingelm || link.parentNode.parentNode.className in trailingelm ) {
            var n2 = next(link.parentNode);

            hide(link);
            hide(n2);

            if (n3 = next(n2)) {
                if (n3.tagName == 'P') {
                    hide(n3);
                }
            }
        } else {
            hide(link.parentNode);
        }
    }
}

// Remove score tabs
document.getElementsByClassName('dbltab-strap')[0].style.display = 'none';

function next(elm) {

    do {
        if (!elm)
            return null;
        elm = elm.nextSibling;
    } while (elm && elm.nodeType != 1);

    return elm;
}

function hide(elm) {
    if (elm) {
        if (elm.id == 'home_features') {
            elm.style.visibility = 'hidden';
        } else {
            elm.style.display = 'none';
        }
    }
}
