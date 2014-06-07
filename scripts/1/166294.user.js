// ==UserScript==
// @name           Feedly - show original in background tab
// @namespace      modrzew
// @description    Shows original item in new background tab. Based on http://userscripts.org/scripts/show/117722
// @include        http://feedly.com/*
// @include        http://www.feedly.com/*
// @include        https://feedly.com/*
// @include        https://www.feedly.com/*
// ==/UserScript==

function GRT_key(event) {
    if ((String.fromCharCode(event.which)=='h' || String.fromCharCode(event.which)=='h') && !event.ctrlKey) {
        var link = null;
        // Is inlineFrame opened?
        var current_element = document.getElementsByClassName('inlineFrame');
        if(current_element.length) { // try selectedEntry
            link = current_element[0].getElementsByClassName('entryTitle')[0].href;
        } else {
            current_element = document.getElementsByClassName('selectedEntry');
            if(current_element.length) {
                link = current_element[0].getElementsByClassName('title')[0].href;
            }
        }
        if(link) {
            GM_openInTab(link);
            try {
                event.preventDefault();
            } catch (e) {}
            return false;
        }
    }
    return true;
}

document.addEventListener("keypress", GRT_key, true);