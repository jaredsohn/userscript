// ==UserScript==
// @name           PÕQ~Forums Auto Mark Forums Read
// @namespace      http://forum.poqclan.com/search.php?search_id=newposts
// @include        http://forum.poqclan.com/search.php?search_id=newposts
// ==/UserScript==
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://forum.poqclan.com/',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
			var response = responseDetails.responseText
			var hash = /hash=[a-z0-9A-Z]+/.exec(response);
			setRead(hash);
    }
});

function setRead(hash){
GM_xmlhttpRequest({
    method: 'HEAD',
    url: 'http://forum.poqclan.com/index.php?' + hash + '&mark=forums',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
});
}
