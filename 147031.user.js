// ==UserScript==
// @name      OIIBT
// @namespace https://twitter.com/ziqiang_lee
// @include   *://feedly.com/*
// @version   1.2
// ==/UserScript==

function openNewBackgroundTab(url) {
    var anchor = document.createElement('a');
    anchor.href = url;
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
    anchor.dispatchEvent(evt);
}

function T_key(event) {
    if (String.fromCharCode(event.which) == 'V' && !event.ctrlKey) {
        var anchors = document.getElementsByClassName('read');
        var ahchor = null, surfix = '_entry_title', id = null;
        for (var i = 0, len = anchors.length; i < len; i++) {
            anchor = anchors[i];
            id = anchor.id;
            if (id.indexOf(surfix) + surfix.length == id.length) {
                openNewBackgroundTab(anchor.href);
                break;
            }
        }

        try {
            event.preventDefault();
        } catch (e) {
        }
        return false;
    }
    return true;
}

document.addEventListener('keydown', T_key, true);