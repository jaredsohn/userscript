// ==UserScript==
// @name            LentaCollapsesSections
// @namespace       lentacollapsessections
// @description     Collapses blocks of news you are not interesting in (stores your choice in cookies). Via original Firefox Greasemonkey (or, much better, Scriptish) only.
// @include         http://lenta.ru/
// @include         http://www.lenta.ru/
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require         http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/jquery-ui.min.js
// @require         https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @version         1.0
// @icon            http://img.lenta.ru/i/flag.gif
// ==/UserScript==
alert('1');

  $('head').append('<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.15/themes/base/jquery-ui.css" type="text/css" />');
  $('head').append('<style type="text/css">.collapsed{height:26px;overflow:hidden;}.collapsed .glavnoe2,.collapsed .pravaya{opacity:.15;}</style>');
  $('.rubhead').css('margin-right', '2px');
  
  $('table:has(.rubhead)').wrap('<div class="collapsable" />');
  $('<span class="my_button"></span>').button({'icons': {'primary': 'ui-icon-minus'}, 'text': false}).
                                       css({'width': '18px', 'height': '18px', 'float': 'right'}).appendTo('.rubhead');

  var cookie = $.cookie('hided_sections');
  if (cookie) {
    var hidedSections = cookie.split('fuck');   // 'fuck' is not for fun, but for shurely inexisting sequence
    $('.rubhead').filter(function() {return (hidedSections.indexOf(String($('a[href]', this).get())) != -1)}).
                children('.my_button').each(function() {
                        $('.ui-icon', this).removeClass('ui-icon-minus').addClass('ui-icon-plus');
                        $(this).parents('.collapsable').addClass('collapsed');
                    });
  }

  $('.my_button').click(function() {
        $('.ui-icon', this).toggleClass('ui-icon-minus').toggleClass('ui-icon-plus');
        $(this).parents('.collapsable').toggleClass('collapsed');
    });

  unsafeWindow.onbeforeunload = function() {
        var newCookie = $('.collapsed .rubhead a[href]').toArray().join('fuck');
        if (newCookie != cookie)
            $.cookie('hided_sections', newCookie, { 'expires': 365 });
    };
