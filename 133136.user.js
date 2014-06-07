// ==UserScript==
// @name           Web Developer Toolbar + Noscript fix
// @description    Enables WDT's visibility toggling at the "Information > View ..." pages
// @namespace      Rob W
// @include        about:blank
// ==/UserScript==

if (document.documentElement.id === 'webdeveloper-generated-content') {
    document.addEventListener('click', function(event) {
        'use strict';
        var pivot = event.target,
            output,
            divElementList, spanElementList, i;
        if (/\bpivot\b/.test(pivot.className)) {
            output = pivot.parentNode.nextElementSibling || pivot.parentNode.nextSibling;
            if (output.className === 'collapsed output') {
                output.className = 'output';
                pivot.className  = 'expanded pivot';
            } else if (output.className === 'output') {
                output.className = 'collapsed output';
                pivot.className  = 'collapsed pivot';
            }
        } else if (pivot.id === 'webdeveloper-generated-tool-collapse-all') {
            event.preventDefault();
            divElementList    = document.querySelectorAll("div[class='output']");
            spanElementList   = document.querySelectorAll("span.expanded.pivot");
            
            for(i = 0; i < divElementList.length; i++) {
                divElementList[i].className = 'collapsed output';
            }
            for(i = 0; i < spanElementList.length; i++) {
                spanElementList[i].className = 'collapsed pivot';
            }
        } else if (pivot.id === 'webdeveloper-generated-tool-expand-all') {
            event.preventDefault();
            divElementList    = document.querySelectorAll("div.collapsed.output");
            spanElementList   = document.querySelectorAll("span.collapsed.pivot");

            for(i = 0; i < divElementList.length; i++) {
                divElementList[i].className = 'output';
            }
            for(i = 0; i < spanElementList.length; i++) {
                spanElementList[i].className = 'expanded pivot';
            }
        }
    }, false);
}