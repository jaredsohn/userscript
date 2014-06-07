// ==UserScript==
// @name           uboot-music ripper
// @namespace      http://*.uboot.com/player/
// @description    v.0.0.1
// @include        http://*.uboot.com/player/
// ==/UserScript==

var plisturl = document.embeds[1].src.substr(76);

GM_xmlhttpRequest({
    method: 'GET',
    url: plisturl,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,
            "application/xml");
        var entries = dom.getElementsByTagName('song');
        var tbl = document.getElementById('content').getElementsByTagName("table")[5];
        var td = null;
        for (var i = 0; i < entries.length; i++) {
            td = tbl.getElementsByTagName("tr")[i].getElementsByTagName("td")[4];
            td.innerHTML = '<a href="'+encodeURI(entries[i].getAttribute('file'))+'>download</a>';          
        }
    }
});