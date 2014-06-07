// ==UserScript==
// @name         Search word highlighter
// @namespace    fgjshaflkjhwejslfkjshfshfklajhasdlfjhsl
// @description  Highlights search words on search result pages
// @include      *
// @version      1
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @downloadURL  http://userscripts.org/scripts/source/179600.user.js
// @updateURL    http://userscripts.org/scripts/source/179600.meta.js
// @homepageURL  http://search-word-highlighter.go-here.nl/
// ==/UserScript==

/* I've adapted se-hilite(2006) by scott Yang: http://scott.yang.id.au/code/se-hilite/ */

Hilite = {
    max_nodes: 1000,         /* Maximum number of DOM nodes to test. */
    style_name: 'hilite',    /* Name of the style to be used.*/
    style_name_suffix: true, /* Use multiple colors */
    maximum_words: 100,      /* Maximum number of words to remember and highlight */
    colors: '#FCF75A#BBFC5A#6BFC5A#5AFCE9#5ACBFC#FC855A#FC5AE9#FC5A5A#B65AFC' /* Colors to use */
}; 

Hilite.colors = (Hilite.colors + Hilite.colors + Hilite.colors).split('#'); 
highlightONcss = "";
highlightOFFcss = "";

/* Make a css for the colors! */

for (x = 1; x <= Hilite.colors.length; x++) {
    highlightONcss += ".hilite" + x + " {background-color:#" + Hilite.colors[x] + ";color:#000;}";
} 

/* Make a css without colors. */

for (x = 1; x <= Hilite.colors.length; x++) {
    highlightOFFcss += ".hilite" + x + " {background-color:transparent;color:inherit;}";
} 
GM_registerMenuCommand("Highlighter ON/OFF", turnOnOff, "H");
GM_registerMenuCommand("Highlighter greedy/exact", beGreedy, "G");

/* Swap the CSS with colours for one without (and back) */

function turnOnOff() {
    var css = document.createElement("style"); 
    css.type = "text/css";
    if (GM_getValue("highlighter", "on") == "on") {
        GM_setValue("highlighter", "off");
        css.innerHTML = highlightOFFcss;
    } else {
        GM_setValue("highlighter", "on");
        css.innerHTML = highlightONcss;
    }
    document.head.appendChild(css);
}

/* Greedy matching. (i.e. if "porn" should be highlighted in "pornography") */

function beGreedy() {
    if (GM_getValue("greedyMatching", "off") == "on") {
        GM_setValue("greedyMatching", "off");
    } 
    else {
        GM_setValue("greedyMatching", "on");
    }
}
var css = document.createElement("style");
css.type = "text/css";
if (GM_getValue("highlighter", "on") == "on") {
    css.innerHTML = highlightONcss;
} /* Use the right css */
else {
    css.innerHTML = highlightOFFcss;
}
document.head.appendChild(css);

/* The legacy code to Highlight a DOM element with a list of keywords. */

Hilite.hiliteElement = function (elm, query) {
    if (!query || elm.childNodes.length == 0) {
        return;
    } 
    var qre = new Array();
    for (var i = 0; i < query.length; i++) {
        query[i] = query[i].toLowerCase();
        if (GM_getValue("greedyMatching", "off") == "off") {
            qre.push('\\b' + query[i] + '\\b');
        } else {
            qre.push(query[i]);
        }
    }
    qre = new RegExp(qre.join("|"), "i");
    var stylemapper = {};
    for (var i = 0; i < query.length; i++) {
        if (Hilite.style_name_suffix) {
            stylemapper[query[i]] = Hilite.style_name + (i + 1);
        } else {
            stylemapper[query[i]] = Hilite.style_name;
        }
    }
    var textproc = function (node) {
        var match = qre.exec(node.data);
        if (match) {
            var val = match[0];
            var k = '';
            var node2 = node.splitText(match.index);
            var node3 = node2.splitText(val.length);
            var span = node.ownerDocument.createElement('SPAN');
            node.parentNode.replaceChild(span, node2);
            span.className = stylemapper[val.toLowerCase()];
            span.appendChild(node2);
            return span;
        } else {
            return node;
        }
    };
    Hilite.walkElements(elm.childNodes[0], 1, textproc);
};

/* Highlight a HTML document. */

Hilite.hilite = function () {
    var e = null; 
    q = GM_getValue("firstQuery", "");
    if (GM_getValue("greedyMatching", "off") == "on" && GM_getValue("secondQuery", "") != "") {
        q = q + "+" + GM_getValue("secondQuery", "");
    }
    q = q.split('+').slice(0, Hilite.maximum_words); /* keyword limit */
    if (q && (e = document.body)) {
        Hilite.hiliteElement(e, q);
    }
}
Hilite.walkElements = function (node, depth, textproc) {
    var skipre = /^(script|style|textarea)/i;
    var count = 0;
    while (node && depth > 0) {
        count++;
        if (count >= Hilite.max_nodes) {
            var handler = function () {
                Hilite.walkElements(node, depth, textproc);
            };
            setTimeout(handler, 50);
            return;
        }
        if (node.nodeType == 1) {
            if (!skipre.test(node.tagName) && node.childNodes.length > 0) {
                node = node.childNodes[0];
                depth++;
                continue;
            }
        } else if (node.nodeType == 3) {
            node = textproc(node);
        }
        if (node.nextSibling) {
            node = node.nextSibling;
        } else {
            while (depth > 0) {
                node = node.parentNode;
                depth--;
                if (node.nextSibling) {
                    node = node.nextSibling;
                    break;
                }
            }
        }
    }
}

/* If we are not on google.com we want the highlighting. */

if (location.href.indexOf('https://www.google.com/search?') != 0) {
    Hilite.hilite();
} 

/* If we are on google.com we dont want the highlighting. */

else {
    foo = ""; 
    theQuery = document.location.search.slice(1).split('&');
    for (x = 0; x < theQuery.length; x++) {
        if (theQuery[x].indexOf('q=') == 0) {
			GM_setValue("secondQuery", GM_getValue("firstQuery",""));
            GM_setValue("firstQuery", theQuery[x].slice(2));
            
        }
    }

/* A newer query (if any) is to be found in the location hash. */

    window.onhashchange = function () {
        theHash = document.location.hash.slice(1).split('&'); 
        for (x = 0; x < theHash.length; x++) {
            if (theHash[x].indexOf('q=') == 0) {
                GM_setValue("secondQuery", GM_getValue("firstQuery",""));
				GM_setValue("firstQuery", theHash[x].slice(2));
            }
        }
    }
}