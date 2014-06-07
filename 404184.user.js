// ==UserScript==
// @name         Get High Resolution Android App Icon
// @description  Click on the app icon on google play to download its high resolution copy
// @author       wenLiangcan
// @version      0.1
// @namespace    https://github.com/wenLiangcan
// @homepage     https://github.com/wenLiangcan/Userscripts
// @license      GPL version 3 (http://www.gnu.org/licenses/gpl.txt)
// @copyright    Copyright © 2014 wenLiangcan
// @updateURL    http://userscripts.org/scripts/source/404184.user.js
// @downloadURL  http://userscripts.org/scripts/source/404184.user.js
// @include      http://play.google.com/store/apps/*
// @include      https://play.google.com/store/apps/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    var cover = document.getElementsByClassName('cover-image')[0];
    var h = cover.getAttribute('src').slice(0, -6) + '512-h512';
    var a = document.createElement('a');
    a.setAttribute('href', h);
    a.setAttribute('download', 'icon');
    a.setAttribute('title', 'Download Big Icon');
    var p = cover.parentNode;
    p.insertBefore(a, cover);
    a.appendChild(cover);
})()
