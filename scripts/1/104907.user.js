// ==UserScript==
// @name          RTVV CONTRASTA
// @description   Permet als ciutadans comentar i contrastar les notícies publicades a la web de la Radiotelevisió Pública Valenciana rtvv.es
// @include       http://www.rtvv.es/*
// ==/UserScript==



var toolbar, newElement;
var disqus_shortname = 'rtvvcontrasta';
toolbar = document.getElementById('pg-toolbar_bottom');
if (toolbar) {
	newElement = document.createElement("div");
	newElement.innerHTML = "<div class='md-title md'><div class='hd hd-l1 hd-c1'><h2 class='htitle htit-big'>Contrasta / Opina</h2></div></div><div id='disqus_thread'></div>";
    toolbar.parentNode.insertBefore(newElement, toolbar.nextSibling);
}
  (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();