// ==UserScript==
// @name           Clean Facebook 2
// @description    Remove Facebook chat and sidepanel. Based on Clean Facebook @ http://userscripts.org/scripts/show/78096
// 
// @author         Accalia de Elementia
// @version        1.0   Initial redesign
// @namespace      http://userscripts.org/scripts/show/112898
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==
/*jslint devel: false, browser: true, eqeq: false, safe: false, maxerr: 50, indent: 4 */
(function (doc) {
    'use strict';
    function getElementsByClass(searchClass) {
        var classElements, els, elsLen, pattern, i, j;
        classElements = [];
        els = doc.getElementsByTagName('*');
        elsLen = els.length;
        pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
        for (i = 0, j = 0; i < elsLen; i += 1) {
            if (pattern.test(els[i].className)) {
                classElements[j] = els[i];
                j += 1;
            }
        }
        return classElements;
    }

    function Clean_FB() {
        var target, targets, parent, i;
        targets = getElementsByClass('fbChatSidebar');
        for (i = 0; i < targets.length; i += 1) {
            target = targets[i];
            if (target) {
                target.parentNode.removeChild(target);
            }
        }
        target = document.getElementById('rightCol');
        if (target) {
            parent = target.parentNode;
            parent.className = parent.className.replace(/\bhasRightCol\b/, '');
            parent.removeChild(target);
        }
    }

    doc.addEventListener("DOMNodeInserted", Clean_FB, true);
}(document));