// ==UserScript==
// @name			MSB
// @version			1.1
// @author			simsekcountr
// @namespace		Milli Savunma Bakanlığı
// @description		MAD Messengers
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require			http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @include			http://www.erepublik.com/*
// ==/UserScript==
var $ = jQuery = jQuery.noConflict(true);
function appendStyle() {
    var a = '.mad_open1{ display: block; margin: 0 auto; width: 162px; height: 23px; margin-bottom: 0px; margin-top: 0px; font-size: 10px; color: rgba(255,255,255,.9); font-weight: 800; text-shadow: 0 1px 0 rgba(0,0,0,.7); text-align: center; padding-top: 3px; -moz-box-sizing: border-box; box-sizing:  border-box; background-image: url(http://i.hizliresim.com/KnvQz0.png); background-repeat: repeat; }';
    a += '.mad_container1{display: none;}';
    a += '.opened{ background-position: 5 -23px; }';
    a += '.mad_title1{ background-image: url(http://i.hizliresim.com/K4djOq.jpg); background-repeat: no-repeat; text-align: center; display: block; width: 100%;}';
    a += '.mad_middle1 img{ width:  385px; }';
    a += '.mad_message1{ position: absolute; height: 50px; width: 303px; padding-right: 10px; padding-left: 13px; padding-top: 10px; padding-bottom: 10px; } ';
    a += '.mad_bottom1{ text-align: center; display: block; width: 100%;}';
    a += '.mad_bottom1 .img{ width: 1px; }';
    GM_addStyle(a)
}
function checkMessages() {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://docs.google.com/spreadsheet/pub?key=0AuhPUBB6TFKsdEJQb3lFRUVSck44R24wVTV3dW1yUWc&output=html',
        onload: function (e) {
            var a = e.responseText;
            var b = $(a) .find('#tblMain ') .html();
            if (b !== '') {
                $('.mad_message1') .html(b);
                $('.mad_messages1') .text('(mesaj var)')
            }
            setTimeout(checkMessages, 10000)
        }
    })
}
$(document) .ready(function () {
    if (window.location.href.split('/') .length == 4) {
        appendStyle();
        $('.column:eq(1)') .prepend('<div>' + '<div class="map_border top"></div>' + '<div class="mad_container1">' + '<div class="mad_title1">' + '<img src="http://i.hizliresim.com/e7Oana.png" />' + '</div>' + '<div class="mad_middle1">' + '<div class="mad_message1"></div>' + '<img src="http://i.hizliresim.com/Krq5nM.jpg" />' + '</div>' + '<div class="mad_bottom1">' + '<a href="http://www.erepublik.com/en/citizen/profile/2896296" target="_blank"><img class="img" src="http://static.erepublik.net/uploads/avatars/Citizens/2010/03/06/867a1567d6c345a09f3468fc95d42479_55x55.jpg" /></a><br />' + '<img src="http://static.erepublik.net/uploads/avatars/Citizens/2010/03/06/867a1567d6c345a09f3468fc95d42479_55x55.jpg" />' + '</div>' + '</div>' + '<a href="javascript:;" class="mad_open1"><div class="mad_text1" style="display:inline;">Open</div> <div class="mad_messages1" style="display:inline;"></div></a>' + '<div>');
        $('.mad_open1') .click(function () {
            $(this) .toggleClass('opened');
            $('.mad_container1') .slideToggle();
            if ($(this) .hasClass('opened')) {
                $(this) .find('.mad_text') .text('Kapat')
            } else {
                $(this) .find('.mad_text') .text('Aç')
            }
        })
    }
    checkMessages()
});
