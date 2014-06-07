// ==UserScript==
// @name           Cityvibe Increase Visible Area
// @namespace      cityvibe_enlarge
// @include        http://*.cityvibe.com/escorts/*
// ==/UserScript==
// ****** start jquery loading ******//
var src = 'http://code.jquery.com/jquery-1.4.2.min.js';
var $;(function(){if (typeof unsafeWindow.jQuery == 'undefined') {var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,GM_JQ = document.createElement('script');GM_JQ.src = src;GM_JQ.type = 'text/javascript';GM_JQ.async = true;GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);}GM_wait();})();function GM_wait() {if (typeof unsafeWindow.jQuery == 'undefined') {window.setTimeout(GM_wait, 100);} else {$ = unsafeWindow.jQuery.noConflict(true);letsJQuery();}}

function letsJQuery() {
  $("listing").ready(function() {
    // utility function to set the class "tallest" on the tallest img
    $.fn.setTallest = function () {var height = 0,highest = 0;return this.each(function () {height = Math.max(height, this.offsetHeight);if (height > highest) {highest = height;$("*").removeClass("tallest");$(this).addClass("tallest");};}).each(function () {var h = this.offsetHeight;});};

    // function to toggle visibility
    $.fn.cvToggleElements = function() {
      var text = ($(this).hasClass('hidden')) ? 'Hide details' : 'Show details';
      $(this).toggleClass('hidden').text(text);
      $('#contact_table').parent().closest('table').attr('width', '100%').prev().toggleClass('cv-js-hidden');
      $('#contact_table').toggleClass('cv-js-hidden');
      $('#contact_table').nextAll(':not(table)').toggleClass('cv-js-hidden');
      $('<ul id="cv-js-list" />').appendTo('.cv-js-imgs');
      $('#contact_table ~ table img').each(function() {
        if (!$('#contact_table').hasClass('init-cv-js')) {
          var that = $(this),src = $(this).attr('src');
          if (src.indexOf('blank.gif') >= 0) $(this).addClass('cv-js-ignore');
          if (!$(this).hasClass('cv-js-ignore')) {
            var li = $('<li />'),src = $(this).attr('src');
            $("<img/>").attr({
              'src': src
            }).addClass('cv-js-enlarger').load(function() {
              $(this).attr({
                'owidth': that.width(),
                'oheight': that.height()
              }).appendTo('#cv-js-list').wrap(li);
              var	owidth = $(this).attr('owidth'),xwidth = owidth/2,oheight = $(this).attr('oheight'),xheight = oheight/2;
              $(this).css({'width': xwidth});
              $(this).parent().css({'width': xwidth,'height': xheight});
              $(this).hover(function() {
                $(this).stop().animate({width: owidth,margin: 0}, 200);
                $(this).addClass('image-popout-shadow');
                },function() {
                  $(this).stop().animate( {width: xwidth,margin: 0}, 200, function() {
                    $(this).removeClass('image-popout-shadow');
                  });
                }
              );
            });
          }
        }
        $(this).toggleClass('cv-js-hidden');
      });
      $('.image-popout img').setTallest();
      $('.image-popout').css({'height': $('.image-popout .tallest').height()});
      if ($('#contact_table').hasClass('init-cv-js')) $('.cv-js-imgs').toggleClass('cv-js-hidden');
    }
    // init only
    $('#contact_table').parent().prepend('<a href="#" class="cv-js-toggle-link">Show details</a><div class="cv-js-imgs image-popout"></div>');
    $('.cv-js-toggle-link').cvToggleElements();
    $('#contact_table').addClass('init-cv-js');
    // live bindings
    $('.cv-js-toggle-link').live('click', function() {
      $(this).cvToggleElements();
    });

    $('<style type="text/css">\
      .cv-js-hidden{display:none;}\
      .image-popout,.image-popout ul,.image-popout li{margin:0;padding:0}\
      .image-popout ul{list-style:none;}\
      .image-popout li{float:left;margin-right:4px;}\
      .image-popout{position:relative;padding:10px;}\
      .image-popout img{position:absolute;border:3px solid #f0f0f0;display:block;}\
      .image-popout-shadow{-moz-box-shadow:0 0 5px #333;-webkit-box-shadow:0 0 5px #333;box-shadow:0 0 5px #333;position:absolute;z-index:2;}\
      </style>').appendTo("head");
  });
}

