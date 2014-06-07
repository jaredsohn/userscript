// ==UserScript==
// @name           PirateBay Share on Facebook
// @namespace      Aaron Russell
// @include        http://thepiratebay.org/torrent/*
// ==/UserScript==

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://tinyurl.com/api-create.php?url='+document.location.href,
    onload: function(responseDetails) {
var fb = document.getElementsByClassName('fb_share_link')[0];
fb.setAttribute('href', '#');
fb.removeAttribute('target');
fb.setAttribute("onclick", "window.open('http://www.facebook.com/share.php?u="+responseDetails.responseText+"','sharer','toolbar=0,status=0,width=954,height=436')");
    }
});

