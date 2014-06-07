// ==UserScript==
// @name         Butt To Butt UserScript Version
// @description  Replaces 'the cloud' with 'my butt', and 'cloud' with 'butt'
// @copyright    2013, WTFPL <http://www.wtfpl.net/>
// @url          http://userscripts.org/scripts/show/173979
// @version      1.2
// @include      *
// @match        *://*/*
// @run-at       document-start
// @updateURL    http://userscripts.org/scripts/source/173979.meta.js
// @downloadURL  https://userscripts.org/scripts/source/173979.user.js
// ==/UserScript==

/*
 * This is a modification of Butt To Butt:
 * -> https://github.com/panicsteve/butt-to-butt
 */
window.addEventListener('load', function() {
    'use strict';
    /* Prevent from being loaded twice: */
    if (window.cloudToButtIsActive) return;
    window.cloudToButtIsActive = true;
    var walk, running = false, cloudToButt;
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
    })(document.body, cloudToButt = function (node) {
        if (running) return;
        running = true;
        try {
            var node = node.target || node;
            var v = node.nodeValue || node.textContent;
            if (!v) return;
            v = v.replace(/(the)?(\s+)?(cloud)/img, function (m, the, ws, cloud) {
                var my = the ? String.fromCharCode(the.charCodeAt(0) - 7) + 'y' : '';
                var butt = String.fromCharCode(cloud.charCodeAt(0) - 1) + 'utt';
                return (my + (ws || '') + butt);
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
        running || cloudToButt(ev);
    });
    document.body.addEventListener('DOMCharacterDataModified', function(ev) {
        // console.debug(ev);
        running || cloudToButt(ev);
    });
});
