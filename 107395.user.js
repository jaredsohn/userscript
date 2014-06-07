// ==UserScript==
// @name           F2n banneri
// @author         Hadriel
// @version        0.1-japanski
// @namespace      f2n
// @description    Izmjena postojećeg bannera.
// @include        http://*fer2.net*
// @run-at document-start
// ==/UserScript==


document.getElementById('hdr').setAttribute("style", 'background: url("http://i65.photobucket.com/albums/h240/Hadriel2006/F2Nskin_JP1/srednje.png");');
document.getElementById('logo').setAttribute("style", 'background: url("http://i65.photobucket.com/albums/h240/Hadriel2006/F2Nskin_JP1/lijevo.png"); width: 344px;');
document.getElementById('hdr_rs').setAttribute("style", 'background: url("http://i65.photobucket.com/albums/h240/Hadriel2006/F2Nskin_JP1/desno.png");');