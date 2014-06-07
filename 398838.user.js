// ==UserScript==
// @name         Show Python 3 documentation by default
// @namespace    http://jeremejevs.com/
// @author       Olegs Jeremejevs
// @description  Automatically redirects Python 2 docs to Python 3.
// @match        *://docs.python.org/2*
// @version      1.1
// ==/UserScript==


var tmp = document.location.href.split('/');
tmp[3] = '3';
document.location.replace(tmp.join('/'));
