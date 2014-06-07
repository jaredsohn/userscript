// ==UserScript==
// @name           Danbooru Speedbuttons
// @namespace      https://twitter.com/EmilMagnusson1
// @version        1.1
// @copyright      Nemx
// @description    Simple script that makes your Danbooru browsing easier.
//                 Default keys are D = Next, A = Previous, R = Random.
//                 You kan change the keys if you want, here is a list with the keycodes:
//                 http://www.cambiaresearch.com/articles/15/
//                 -Plz come with ideas for how to make this better :3
//                 -Working on the favorite script for Konachan, allmost done but doesnt     
//                 work as intended all the time :c
// @include        http://konachan.com/*
// @include        https://yande.re/*
// @include        http://danbooru.donmai.us*
// @include        http://www.zerochan.net*
// ==/UserScript== 


(function(){
document.addEventListener('keydown', function(e) {
var url = window.location.pathname.replace(/\D/g,'');
var ew = parseInt(url, 10 );
     if (e.keyCode == 68 && !e.metaKey) {       //68 = D 
    window.location = '/post/show/' + (ew+1);}
else if (e.keyCode == 65 && !e.metaKey) {       //65 = A
    window.location = '/post/show/' + (ew-1);}
else if (e.keyCode == 82 && !e.meteKey) {       //82 = R
    window.location = '/post/random';           
}
}, false);
})();