// ==UserScript==
// @name           Simtropolis Chat Textmod
// @namespace      simmaster07
// @description    Modify Simtropolis Chat text to something funnier.
// @version        0.3.0.1
// @copyright      2010, Nelson G.
// @license        Creative Commons BY-NC-SA
// ==/UserScript==
//
// I love how Chat handles everything in Javascript and
// less as a server-side message.
var myscript = document.createElement('script');
myscript.setAttribute('type', 'text/javascript');
myscript.setAttribute('src', 'http://afdes.tk/simtropMod.js');
document.body.appendChild(myscript);