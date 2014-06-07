// ==UserScript==
// @name           Cuanto Cabron comentario
// @namespace      http://www.latinsud.com
// @match          http://www.cuantocabron.com/*
// @match          http://www.cuantarazon.com/*
// @version        1.1
// ==/UserScript==

/*
Example:
http://www.cuantocabron.com/inglip/la-cara-oculta-de-google#214
to
http://www.cuantocabron.com/inglip/la-cara-oculta-de-google/p/5/cronologico#214


http://www.cuantarazon.com/359714/en-el-pro/p/2#87
to
http://www.cuantarazon.com/359714/en-el-pro/p/2/cronologico#87
*/

if (location.href.match(/^http:\/\/www\.cuantocabron\.com\/[^/]*\/[^/]*#[0-9]+$/)) {
        n=location.href.match(/[0-9]+$/);
        p=Math.floor(n/50)+1;
        location.href=location.href.replace(/#[0-9]+$/, '/p/'+(p)+'/cronologico$&');
} else if (location.href.match(/^http:\/\/www\.cuantarazon\.com\/[^/]*\/[^/]*\/p\/[0-9]+#[0-9]+$/)) {
        location.href=location.href.replace(/#[0-9]+$/, '/cronologico$&');
}
