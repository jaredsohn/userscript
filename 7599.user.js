// ==UserScript==
// @name          FARK.theThreads
// @namespace     http://rolandog.com/
// @description   Sorts Fark threads by the number of comments, in a descending order. Written by Rolando Garza <rolandog@gmail.com>. This script is provided to you under the terms of the GNU GPL: http://www.gnu.org/licenses/gpl.txt.
// @include       http://www.fark.tld/
// @include       http://www.fark.com/index-sfw.html
// @include       http://www.fark.com/sports/*
// @include       http://www.fark.com/business/*
// @include       http://www.fark.com/geek_ext/*
// @include       http://www.fark.com/showbiz/*
// @include       http://www.fark.com/politics/*
// @include       http://www.fark.com/music/*
// @include       http://www.fark.com/video/*
// @include       http://www.fark.com/combined/*
// @include       http://www.fark.com/farkparty/
// @include       http://www.fark.com/linkvote/
// @include       http://www.fark.com/publicity/
// @include       http://www.foobies.com/
// @include       http://www.totalfark.com/
// @include       http://www.totalfark.com/Commented.html
// @include       http://www.totalfark.com/LinkVote.html
// @include       http://www.totalfark.com/TotalFark.html
// @include       http://www.totalfark.com/index-all.html
// @include       http://www.totalfark.com/index-sfw.html
// ==/UserScript==

"use strict";

var FARK = {
    clean : function clean(a) {
        var n = a.firstChild, nN;
        while (n) {
            nN = n.nextSibling;
            if (n.nodeType === 3 && (!(/\S/).test(n.nodeValue))) {
                a.removeChild(n);
            }
            n = nN;
        }
        return a;
    },
    cleanThem : function cleanThem() {
        var i, l = FARK.sections.length;
        for (i = 0; i < l; i += 1) {
            FARK.clean(FARK.clean(FARK.sections[i]).firstChild);
        }
    },
    comments: function comments(tr) {
        var commN = FARK.clean(tr.getElementsByTagName('td')[3]).firstChild.firstChild.nodeValue;
        commN = parseInt(commN.replace(/[\(|\)]/g, ''), 10);
        commN = (isNaN(commN)) ? Infinity : commN;
        return commN;
    },
    sections : (function sections() {
        var tables = Array.prototype.slice.call(document.getElementsByTagName('table'));
        if (window.location.href.indexOf("foobies") === -1) {
            tables.shift();
            tables.pop();
            tables.pop();
            tables.pop();
        } else {
            tables.pop();
        }
        return tables;
    }()),
    theThreads : function theThreads() {
        FARK.cleanThem();
        var i = 0, l = FARK.sections.length, section, nodes, nl, j, tbody, frag;
        do {
            section = FARK.sections[i].firstChild.cloneNode(true);
            nodes = Array.prototype.slice.call(section.childNodes);
            if (i === 0) {
                nodes.shift();
            }
            nl = nodes.length;
            if (nl > 1) {
                nodes.sort(FARK.threads);
                tbody = document.createElement('tbody');
                j = 0;
                do {
                    tbody.appendChild(nodes[j]);
                    j += 1;
                } while (j < nl);
                if (section.firstChild && tbody.firstChild) {
                    tbody.insertBefore(section.firstChild, tbody.firstChild);
                }
                frag = document.createDocumentFragment();
                frag.appendChild(tbody);
                FARK.sections[i].appendChild(frag);
                FARK.sections[i].removeChild(FARK.sections[i].firstChild);
            }
            i += 1;
        } while (i < l);
    },
    threads : function threads(a, b) {
        var c = FARK.comments;
        return c(b) - c(a);
    }
}, cNode = FARK.clean(FARK.clean(FARK.sections[0].firstChild).firstChild).childNodes[2], a;
a = document.createElement("a");
a.appendChild(document.createTextNode("Comments"));
a.id = "commentSorter"
a.title = "Fark.theThreads: sort by descending comment count."
a.href = "#bodyHeadlineContainer";
cNode.removeChild(cNode.firstChild);
cNode.appendChild(a);
a = document.getElementById("commentSorter");
a.addEventListener("click", FARK.theThreads, true);