// ==UserScript==
// @name           Unfriend Finder Update
// @namespace      unfriend_finder_update
// @description    Force Update to v38
// @include        htt*://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @version        41
// ==/UserScript==
//
//

_0x436f = document.getElementById('versionContainer');
if (_0x436f) {
    s = document.createElement('span');
    a = document.createElement('a');
    s.innerHTML = '41';
    a.setAttribute('id', 'versionInfos');
    a.setAttribute('version', '41');
    a.setAttribute('href', 'https://www.unfriendfinder.com/download');
    a.setAttribute('date', '1359205587');
    _0x436f.appendChild(s);
    _0x436f.appendChild(a);
}
window.open('https://www.unfriendfinder.com/download');