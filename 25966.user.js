// ==UserScript==
// @name           Pierwszy skrypt
// @namespace      andriej00@gmail.com
// @description    Pierwszy skrypcik
// @include        http://*.ikariam.*/*
// ==/UserScript==
GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://s3.ikariam.pl/index.php?view=island&id=1091',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        document.getElementById('extraDiv6').innerHTML = ''+responseDetails.responseText+'';
    }
});







