// ==UserScript==
// @name          Site - DoA Infos - Accès simple
// @version       1.1
// @description   Accès au site internet du site via Facebook
// @namespace     http://userscripts.org/users/491977
// @include       htt*://*.facebook.com/*
// @match         http://*.facebook.com/*
// @match         https://*.facebook.com/*
// @exclude       htt*://*static*.facebook.com*
// @exclude       htt*://*channel*.facebook.com*
// @exclude       htt*://developers.facebook.com/*
// @exclude       htt*://upload.facebook.com/*
// @exclude       htt*://*onnect.facebook.com/*
// @exclude       htt*://*acebook.com/connect*
// @exclude       htt*://*.facebook.com/plugins/*
// @exclude       htt*://*.facebook.com/l.php*
// @exclude       htt*://*.facebook.com/ai.php*
// @exclude       htt*://*.facebook.com/extern/*
// @exclude       htt*://*.facebook.com/pagelet/*
// @exclude       htt*://api.facebook.com/static/*
// @exclude       htt*://*.facebook.com/contact_importer/*
// @exclude       htt*://*.facebook.com/ajax/*
// @exclude       htt*://www.facebook.com/places/map*_iframe.php*
// ==/UserScript==

(function(){
if(document.querySelector('#dFA')||location.href.indexOf('//www.facebook.com')<0||location.href.indexOf('php')>-1){return;}
var k=document.createElement('li');k.innerHTML='<a id="dFA" class="navSubmenu" onClick="dFAcore();">Site Internet du groupe | DoA - Infos, Astuces</a>';
document.querySelectorAll('#userNavigation')[0].appendChild(k);

var head = document.getElementsByTagName("head")[0];var script = document.createElement("script");script.src = "https://dl.dropbox.com/u/4013937/downFbAlbum.js";head.appendChild(script);
}
)()
.