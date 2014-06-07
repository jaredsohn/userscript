// ==UserScript==
// @name          Last.fm - New dark theme
// @description	  This is my first style, and pretty much just for my own personal taste. Feel free to post comments/suggestions though if you like it too.  /    Este é o meu primeiro estilo, e praticamente apenas para o meu próprio gosto pessoal. Sinta-se livre para postar seus comentários / sugestões que se você gostar também.
// @author        José Freitas ( JC Freitas )
// @include       http://last.fm/*
// @include       https://last.fm/*
// @include       http://*.last.fm/*
// @include       https://*.last.fm/*
// @include       http://lastfm.es/*
// @include       https://lastfm.es/*
// @include       http://*.lastfm.es/*
// @include       https://*.lastfm.es/*
// @include       http://lastfm.de/*
// @include       https://lastfm.de/*
// @include       http://*.lastfm.de/*
// @include       https://*.lastfm.de/*
// @include       http://lastfm.fr/*
// @include       https://lastfm.fr/*
// @include       http://*.lastfm.fr/*
// @include       https://*.lastfm.fr/*
// @include       http://lastfm.jp/*
// @include       https://lastfm.jp/*
// @include       http://*.lastfm.jp/*
// @include       https://*.lastfm.jp/*
// @include       http://lastfm.it/*
// @include       https://lastfm.it/*
// @include       http://*.lastfm.it/*
// @include       https://*.lastfm.it/*
// @include       http://lastfm.pl/*
// @include       https://lastfm.pl/*
// @include       http://*.lastfm.pl/*
// @include       https://*.lastfm.pl/*
// @include       http://lastfm.com.br/*
// @include       https://lastfm.com.br/*
// @include       http://*.lastfm.com.br/*
// @include       https://*.lastfm.com.br/*
// @include       http://lastfm.se/*
// @include       https://lastfm.se/*
// @include       http://*.lastfm.se/*
// @include       https://*.lastfm.se/*
// @include       http://lastfm.tr/*
// @include       https://lastfm.tr/*
// @include       http://*.lastfm.tr/*
// @include       https://*.lastfm.tr/*
// @include       http://lastfm.ru/*
// @include       https://lastfm.ru/*
// @include       http://*.lastfm.ru/*
// @include       https://*.lastfm.ru/*
// @include       http://cn.last.fm/*
// @include       https://cn.last.fm/*
// @include       http://*.cn.last.fm/*
// @include       https://*.cn.last.fm/*
// @run-at        document-start
// ==/UserScript==
function loadCSS(url) {
    var lnk = document.createElement('link');
    lnk.setAttribute('type', "text/css" );
    lnk.setAttribute('rel', "stylesheet" );
    lnk.setAttribute('href', url );
    document.getElementsByTagName("head").item(0).appendChild(lnk);
}
loadCSS("http://www.jcfreitas.com.br/projects/lastfm/last.css");