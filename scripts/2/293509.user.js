// ==UserScript==
// @name        No tags for /r/teenagers
// @description No tags for /r/teenagers, by Niles Rogoff
// @include     http://*reddit.com/r/teenagers*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('.linkflairlabel{display:none;}');
if (!($(".usertext-edit")[0])){
    window.addEventListener('load', function() {
        'use strict';
        /* Prevent from being loaded twice: */
        if (window.disableRTeenagersTagsIsActive) return;
        window.disableRTeenagersTagsIsActive = true;
        var walk, running = false, disableRTeenagersTags;
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
        })(document.body, disableRTeenagersTags = function (node) {
            if (running) return;
            running = true;
            try {
                var node = node.target || node;
                var v = node.nodeValue || node.textContent;
                if (!v) return;
                v = v.replace(/\[reaction\]|\[gif\]|\[meme\]|\[social\]|\[video\]|\[advice\]|\[rant\]|\[picture\]|\[music\]|\[discussion\]|\[suggestion\]|\[other\]/img, function (m, the, ws, cloud) {
                    return '';
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
            running || disableRTeenagersTags(ev);
        });
        document.body.addEventListener('DOMCharacterDataModified', function(ev) {
            // console.debug(ev);
            running || disableRTeenagersTags(ev);
        });
    });
}