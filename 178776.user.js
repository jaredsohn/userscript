// ==UserScript==
// @name       TwitterTest
// @namespace  http://coalcraft.dh-w.net
// @version    0.1
// @description  Test for removing on twitter
// @copyright  2013+, CodingCoal
// @include *twitter.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

/*--- Use the jQuery contains selector to find content to remove.
    Beware that not all whitespace is as it appears.
*/

setInterval(function(){
    $('.has-content').hide();
    $('.trends').hide();
    $('.site-footer').hide();
}, 500 );
