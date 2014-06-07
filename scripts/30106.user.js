// ==UserScript==
// @name = Lyrical Accompaniment
// @include http://www.last.fm/music/*/_/*
// ==/UserScript==

document.getElementById("catalogueHead").innerHTML +=
" &nbsp; &nbsp; <A HREF=\"http://lyrics.wikia.org/"
+location.href.split(/\//)[4].replace(/\+/g,"_").replace(/\%2B/g,"_").replace(/\%2526/g,"&")+":"
+location.href.split(/\//)[6].replace(/\+/g,"_").replace(/\%2B/g,"_")+"\"><h1>Lyrics<\/h1></A>";