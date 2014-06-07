// ==UserScript==
// @name       2g1m for Eike
// @namespace  http://coalcraft.dh-w.net
// @version    0.2a
// @description  For Eike only
// @copyright  2013+, CodingCoal
// @include *2g1m.net/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

/*--- Use the jQuery contains selector to find content to remove.
    Beware that not all whitespace is as it appears.
*/

setInterval(function(){
    $('<li class="welcomelink">Welcome, <font color="#cc0033"><i><b>Eike_Sky</b></i></font></li>').replaceAll('.welcomelink');

    
}, 500 );