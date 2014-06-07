// ==UserScript==
// @name           open fm + 
// @include        http://open.fm/*
// @include        *open.fm/*
// @author         Danone_e
// @version        1.0.1
// @description    tło kurwa 
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace('http://open.fm/player/2.4.16/', 'http://open.fm/player/2.2.14/')
document.title = document.title.replace('OpenFM Najlepsza muzyka w necie!', 'OPENFM PLAYER') 