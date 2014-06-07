// ==UserScript==
// @name Tweet Coloring
// @version 0.2
// @description Gives selected users' tweets custom colors.
// @author P4 (@pe4y)
// @include *twitter.com*
// ==/UserScript==

(function(T,s){for(var n in T){if(T.hasOwnProperty(n)){s.textContent+='.u-%n%{color:%t%;}.u-%n% a.tweet-url,.u-%n% .actions-hover a{color:%l%;}a[href="/%n%"]{color:%l% !important;}\n'.replace(/%n%/g,n).replace(/%t%/g,T[n][0]).replace(/%l%/g,T[n][1]);}}document.getElementsByTagName('head')[0].appendChild(s);})({
//  "username" : ["text", "links"],
    "pe4y" : ["#8c6e54", "#aa880c"]
},document.createElement('style'));