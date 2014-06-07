// ==UserScript==
// @name           F2n banneri
// @author         Hadriel
// @version        0.1-ljeto
// @namespace      f2n
// @description    Izmjena postojećeg bannera.
// @include        http://*fer2.net*
// @run-at document-start
// ==/UserScript==


document.getElementById('hdr').setAttribute("style", 'background: url("http://www.deviantpics.com/images/srednjtnt.png");');
document.getElementById('logo').setAttribute("style", 'background: url("http://www.deviantpics.com/images/lijevoaga.png"); width: 344px;');
document.getElementById('hdr_rs').setAttribute("style", 'background: url("http://www.deviantpics.com/images/desnoucu.png");');