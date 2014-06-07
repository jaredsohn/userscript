// ==UserScript==
// @name       leagueoflegends.com board external link verification bypass
// @version    0.1
// @description  Removes verification on entering external website
// @include    http://*.leagueoflegends.com/board/showthread.php*
// @copyright  2012, fixit
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==
    $(document).ready( function() {
        regexp=/redirect_url=(.*)/
     $("a[href*='board/redirect.php?do=verify&redirect_url=']").each(function(){
        tmphref=$(this).attr('href')
       resultr=regexp.exec(tmphref)
       $(this).attr('href',unescape(resultr[1]))
    })
    });