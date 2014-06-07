// ==UserScript==
// @name          unfollow facebook by Farshad Fallah
// @version       1
// @description   unfollow people in Facebook by one click
// @namespace     http://userscripts.org/users/83150
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

var token = document.getElementsByName('csrf-token')[0];
var links = document.getElementsByClassName('following')[0].getElementsByClassName('avatar');
for(a in links) {
    GM_xmlhttpRequest({
        method: "post",
        url: links[a] + "/unfollow",
        headers: { "Content-type" : "application/x-www-form-urlencoded" },
        data: "utf8="+encodeURIComponent("?")+"&authenticity_token="+encodeURIComponent(token.content),
    });
}
if (links.length == 9)
    setTimeout("location.reload(true);", 4000);