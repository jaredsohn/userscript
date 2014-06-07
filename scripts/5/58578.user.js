// ==UserScript==
// @name           NUMA modqueue fix
// @namespace      www.nmaps.net
// @description    fixes empty comment titles
// @include        http://www.nmaps.net/admin/modqueue
// ==/UserScript==

comments = document.getElementsByClassName("comment");
re_mapid = /\/(\d+)#/

document.getElementById("maps").getElementsByTagName("img")[0].src = "/static/spacer.png";

for (i = 0; i < comments.length; i++) {
    map_link = comments[i].getElementsByTagName("a")[0];
    mi = re_mapid.exec(map_link.href)
    if ( !mi ) { comments[i].parentNode.removeChild(comments[i]); i--; }
    else { map_link.innerHTML = "[" + mi[1] + "] " + map_link.innerHTML; }
}

if ( !document.getElementsByClassName("comment")[0] ) {
    body = document.getElementsByClassName("body")[0]
    h2s = body.getElementsByTagName("h2");
    body.removeChild(h2s[h2s.length-1]);
    if ( !document.getElementsByTagName("h3")[0] ) {
        body.innerHTML += "<p>There's nothing to moderate right now. Good job!</p>";
    }
}