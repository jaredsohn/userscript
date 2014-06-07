// ==UserScript==
// @name         Cloud to Butte
// @description  Replaces 'the cloud' with 'my butte', and 'cloud' with 'butte'. Why butte? http://steamcommunity.com/profiles/76561197968781961?tscn=1374939000
// @copyright    2014, WTFPL <http://www.wtfpl.net/>
// @version      1.0
// @include      *
// @match        *://*/*
// @run-at       document-end
// ==/UserScript==

/*
 * This is a modification of Cloud to Butt UserScript Version:
 * -> http://userscripts.org/scripts/show/173979
 * Which is a modification of Cloud To Butt:
 * -> https://github.com/panicsteve/butt-to-butt
 */
window.addEventListener('load', function() {
    'use strict';
    /* Prevent from being loaded twice: */
    if (window.cloudToButteIsActive) return;
    window.cloudToButteIsActive = true;
    var walk, running = false, cloudToButte;
    (walk = function (node, cb) {
        // Function adapted from http://is.gd/mwZp7E
        var child, next;
        switch (node.nodeType) {
            case document.ELEMENT_NODE:
            case document.DOCUMENT_NODE:
            case document.DOCUMENT_FRAGMENT_NODE:
                child = node.firstChild;
                while (child) {
                    walk(child, cb);
                    child = child.nextSibling;
                }
                break;
            case document.TEXT_NODE:
                cb(node);
                break;
        }
    })(document.body, cloudToButte = function (node) {
        if (running) return;
        running = true;
        try {
            var node = node.target || node;
            var v = node.nodeValue || node.textContent;
            if (!v) return;
            v = v.replace(/([Tt][Hh][Ee])?(\s+)?([Cc][Ll][Oo][Uu][Dd])/img, function (m, the, ws, cloud) {
                var my = the ? String.fromCharCode(the.charCodeAt(0) - 7) + 'y' : '';
                var butte = String.fromCharCode(cloud.charCodeAt(0) - 1) + 'utte';
                return (my + (ws || '') + butte);
            });
            if (!node.target) {
                node.nodeValue = node.textContent = v;
            } else {
                node.target.textContent = node.target.nodeValue = v;
            }
        } catch (a) {}
        running = false;
    });
    document.body.addEventListener('DOMNodeInserted', function(ev) {
        // console.debug(ev);
        running || cloudToButte(ev);
    });
    document.body.addEventListener('DOMCharacterDataModified', function(ev) {
        // console.debug(ev);
        running || cloudToButte(ev);
    });
});

/*
▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒▒▒▓▓▓▒▒▒▒▒▓▓▓
▓▒▒▒▒▒▒▒▒▓▒▒▒▒▒▒▒▓
▓▒▒▒▒▒▒▒▒▒▓▒▒▒▒▒▒▒▓ COPY & PSTE IF
▓▒▒▒▒▒▒▒▒▒▓▒▒▒▒▒▒▒▓
▓▒▒▒▒▒▒▒▒▒▓▒▒▒▒▒▒▒▓ U LOVE BUTTE
▓▒▒▒▒▒▒▒▒▓▒▒▒▒▒▒▒▓
▓▒▒▒▒▓▓▓▓▒▓▓▓▓▓▓▓
▓▒▒▒▒▓ ▓▒▒▒▒▓
▓▒▒▒▒▓ ▓▒▒▒▒▓
▓▒▒▒▒▓ ▓▒▒▒▒▓
▓▒▒▒▒▓ ▓▒▒▒▒▓
▓▒▒▒▒▓ ▓▒▒▒▒▓
*/