// ==UserScript==
// @name       League of Legends wiki external links ad remover
// @version    0.1
// @description  Removes ADs on entering external website
// @include    http://leagueoflegends.wikia.com*
// @include    http://*.leagueoflegends.wikia.com*
// @copyright  2012, fixit
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==
    $(document).ready( function() {
     $("a[class*='external']").removeClass('external')
    });