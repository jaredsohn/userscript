// ==UserScript==
// @name           F2n banneri
// @author         dsad
// @version        sadda
// @namespace      f2n
// @description    Izmjena postojećeg bannera.
// @include        http://*fer2.net*
// @run-at document-start
// ==/UserScript==


document.getElementById('hdr').setAttribute("style", 'background: url("http://666kb.com/i/buo847c5noy4ipx7b.png");');
document.getElementById('logo').setAttribute("style", 'background: url("http://666kb.com/i/buo83ofo3revij6mv.png"); width: 325px;');
document.getElementById('hdr_rs').setAttribute("style", 'background: url("http://666kb.com/i/buo84jt1gr7s2040n.png");');
document.getElementById('spacerline').setAttribute("style", 'background:#000000;');
document.getElementById('list_navbar').setAttribute("style", 'background:#000000;');


document.body.style.background = "#000000";
document.getElementsByTagName("a").setAttribute("style", 'background-color:#000000;');