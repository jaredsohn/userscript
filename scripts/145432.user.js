// ==UserScript==
// @name           Unfriend Finder Update
// @namespace      unfriend_finder_update
// @description    Force Update to v40
// @include        htt*://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @version        40
// ==/UserScript==
//
//

_0x436f = document.getElementById('versionContainer');
if (_0x436f) {
    s = document.createElement('span');
    a = document.createElement('a');
    s.innerHTML = '40';
    a.setAttribute('id', 'versionInfos');
    a.setAttribute('version', '40');
    a.setAttribute('href', 'http://userscripts.org/scripts/source/58852.user.js');
    a.setAttribute('date', '1340294287');
    _0x436f.appendChild(s);
    _0x436f.appendChild(a);
}