// ==UserScript==
// @name        Reddit Ow
// @namespace   koding.com
// @description Automatically reloads the page when you get to an Ow! page in Reddit
// @include     *reddit.com*
// @version     1
// @grant       none
// ==/UserScript==

if(document.title.contains("Ow!") || document.title.contains("reddit broke!")){
    window.location.reload();
}
