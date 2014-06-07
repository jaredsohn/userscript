// ==UserScript==
// @name         Show Qt 5 documentation by default
// @namespace    http://jeremejevs.com/
// @author       Olegs Jeremejevs
// @description  Automatically redirects Qt 4 docs to Qt 5.
// @match        *://qt-project.org/doc/qt-4*
// @version      1.1
// ==/UserScript==

var tmp = document.location.href.split('/');
tmp[4] = 'qt-5';
document.location.replace(tmp.join('/'));
