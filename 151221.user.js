// ==UserScript==
// @name        What.CD Menu Addon
// @namespace   VIP
// @include     *what.cd/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version     1.01
// ==/UserScript==

(function(){
    $('#nav_staff, #nav_irc').hide();
    var elem = $('#menu ul li:first').clone();
    elem.attr('id', 'nav_random')
    elem.children('a').text('Random').attr('href', 'random.php');
    elem.appendTo('#menu ul');
})();