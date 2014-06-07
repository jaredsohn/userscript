// ==UserScript==
// @name           kofiko
// @namespace      kofiko
// @description    kofiko next to facebook logo
// @include        http://www.facebook.com*
// @include        http://www.facebook.com/#*
// @copyright      Eran Jerry Peretz ©
// ==/UserScript==


javascript:var o=document.getElementById('pageLogo').getElementsByTagName('a')[0];void(o.style.backgroundImage='url("http://photos-f.ak.fbcdn.net/hphotos-ak-snc3/hs238.snc3/22575_107911629223906_100000152080144_206835_945734_n.jpg")');void(o.style.backgroundPosition='0 0')