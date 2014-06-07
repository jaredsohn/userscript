// ==UserScript==
// @name           Megaupload Sem Espera
// @namespace      http://twitter.com/#!/ThiagoG_Gomes
// @description    Megaupload Sem Espera nem Limite Diário
// @include        *megaupload.com/*d*
// ==/UserScript==
var version = "1.0";

//var downloadlink = document.getElementById('downloadlink');
//downloadlink = downloadlink;
//downloadlink = downloadlink.childNodes[0];
//downloadlink = downloadlink.href;
//window.location(downloadlink);

document.getElementById('downloadlink').style.display = '';				document.getElementById('downloadcounter').style.display = 'none';