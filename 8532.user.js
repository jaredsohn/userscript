// ==UserScript==
// @name           RTÉ adbox remover
// @namespace      http://technomancy.org
// @description    Removes the ad box from RTÉ news stories
// @include        http://www.rte.ie/news/*
// ==/UserScript==

s = document.getElementById('story_island');
if( s ) {
    s.parentNode.removeChild( s );
}
