// ==UserScript==
// @name       1672340 - Organized Crime Helper
// @namespace  http://www.torn.com/profiles.php?XID=1672340
// @version    0.1
// @description  Assist with Organized Crimes.
// @include     http://www.torn.com/organisedcrimes.php*
// @require 	ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @copyright  2013, Fumph
// ==/UserScript==

$(document).ready(function(){
	var win = 'http://www.torn.com/organisedcrimes.php';
    if (window.location.href == win) {
        $('tbody tr.bgAlt1').each(function(){
            var urlstr = $(this).find('td form').attr('action');
            if (urlstr != undefined) {
                $.get('http://www.torn.com/'+urlstr, function(data) {
                    var members = $(data).find('table[bgcolor=#DFDFDF] tr font').text();
                    if (/Hospital|Travelling|Federal|Jail/.test(members)) {
                        $('tbody tr.bgAlt1 td form[action]',parent.document).parent().css('background-color','ff5c53');
                    } else {
                        $('tbody tr.bgAlt1 td form[action]',parent.document).parent().css('background-color','6bcc56');
                    }
                });
            }
        });
    }
});