// ==UserScript==
// @name          Download FB Album mod
// @version       0.12.11.12
// @description   Download Facebook & Instagram Album by One Click.
// @namespace     http://userscripts.org/users/83150
// @include       htt*://*.facebook.com/*
// @match         http://*.facebook.com/*
// @match         https://*.facebook.com/*
// @include       htt*://instagram.com/*
// @match         http://instagram.com/*
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
if(document.querySelector('#dFA')||(location.href.indexOf('//www.facebook.com')<0&&location.href.indexOf('instagram.com')<0)||location.href.indexOf('php')>-1){return;}
var k=document.createElement('li');k.innerHTML='<a id="dFA" class="navSubmenu" onClick="dFAcore();">DownFbAlbum</a>';
var t=document.querySelector('#userNavigation')||document.querySelector('.dropdown ul');t.appendChild(k);
var head = document.getElementsByTagName("head")[0];var script = document.createElement("script");script.src = "https://dl.dropbox.com/u/4013937/downFbAlbum.js";head.appendChild(script);
}
)()