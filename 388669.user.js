// ==UserScript==
// @name			MAD Script
// @version			1.3
// @author			simsekcountr
// @namespace		mad_script
// @description		MAD Messenger
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require			http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @include			http://www.erepublik.com/*
// ==/UserScript==
var $ = jQuery = jQuery.noConflict(true);
function appendStyle() {
    var a = '.mad_open{ display: block; margin: 0 auto; width: 162px; height: 23px; margin-bottom: 10px; margin-top: -6px; font-size: 11px; color: rgba(255,255,255,.9); font-weight: 700; text-shadow: 0 1px 0 rgba(0,0,0,.7); text-align: center; padding-top: 3px; -moz-box-sizing: border-box; box-sizing: border-box; background-image: url(http://i.hizliresim.com/wbopY0.png); background-repeat: no-repeat; }';
    a += '.mad_container{display: none;}';
    a += '.opened{ background-position: 0 -23px; }';
    a += '.mad_title{ background-image: url(http://i.hizliresim.com/eQdN3g.png); background-repeat: no-repeat; text-align: center; display: block; width: 100%;}';
    a += '.mad_middle img{ width: 333px; }';
    a += '.mad_message{ position: absolute; height: 50px; width: 303px; padding-right: 10px; padding-left: 13px; padding-top: 28px; padding-bottom: 10px; } ';
    a += '.mad_bottom{ text-align: center; display: block; width: 100%;}';
    a += '.mad_bottom .img{ width: 333px; }';
    GM_addStyle(a)
}
function checkMessages() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://docs.google.com/spreadsheet/pub?key=0AuhPUBB6TFKsdFZhSTJHV0M3T2N5REFiUVlvdHdzZUE&output=html',
        onload: function (e) {
            var a = e.responseText;
            var b = $(a) .find('#tblMain ') .html();
            if (b !== '') {
                $('.mad_message') .html(b);
                $('.mad_messages') .text('(Mesaj Var)')
            }
            setTimeout(checkMessages, 10000)
        }
    })
}
$(document) .ready(function () {
    if (window.location.href.split('/') .length == 4) {
        appendStyle();
        $('.column:eq(0)') .prepend('<div>' + '<div class="map_border top"></div>' + '<div class="mad_container">' + '<div class="mad_title">' + '<img src="http://i.hizliresim.com/ekMGOJ.png" />' + '</div>' + '<div class="mad_middle">' + '<div class="mad_message"></div>' + '<img src="http://i.hizliresim.com/KdVDA7.png" />' + '</div>' + '<div class="mad_bottom">' + '<a href="http://scemsimsek89.wix.com/mad-headquarters" target="_blank"><img class="img" src="http://i.hizliresim.com/xJVqyB.png" /></a><br />' + '<img src="http://i.hizliresim.com/eyGERM.gif" />' + '</div>' + '</div>' + '<a href="javascript:;" class="mad_open"><div class="mad_text" style="display:inline;">Open</div> <div class="mad_messages" style="display:inline;"></div></a>' + '<div>');
        $('.mad_open') .click(function () {
            $(this) .toggleClass('opened');
            $('.mad_container') .slideToggle();
            if ($(this) .hasClass('opened')) {
                $(this) .find('.mad_text') .text('Kapat')
            } else {
                $(this) .find('.mad_text') .text('Aç')
            }
        })
    }
    checkMessages()
});


