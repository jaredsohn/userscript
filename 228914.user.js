// ==UserScript==
// @name        Trello Timer
// @namespace   http://blmarket.net/users
// @description Display open time for each cards
// @include     https://trello.com/board/*
// @include     https://trello.com/b/*
// @version     1.2   
// @grant       none
// ==/UserScript==

var lastTitle, lastTimer;

function init($) {
  var $elem = $('body');
  var $timer = $('#trello-timer').length === 1 ? $('#trello-timer') : $('<div id="trello-timer" style="position:fixed;bottom:0;leftj:0;z-index:99999999999;padding:10px 20px;font-size:50px;line-height:1;color:#fff;font-weight:bold;background:#000;opacity:.8"><span data-time="0">00:00</span>').appendTo($elem);
  var $t = $timer.find('span');
  var f = function (n) {
    return n.toString().length >= 2 ? n : '0' + n;
  };

  $timer.css('cursor', 'pointer').on('mouseenter', function () {
    $t.css('color', '#f44');
  }).on('mouseleave', function () {
    $t.css('color', 'inherit');
  }).on('click', function () {
    $timer.css('color', '#fff');
    $timer.css('font-size', '50px');
    $t.data('time', 0).text('00:00');
  });

  setInterval(function () {
    var time = Number($t.data('time')) + 1;
    if (time >= 180) {
      $timer.css('font-size', '100px');
      $timer.css('color', 'yellow');
    }
    $t.data('time', time).text( f(parseInt(time / 60, 10)) + ':' + f(time % 60) );
  }, 1000);
}

setTimeout(function() {
  init(typeof unsafeWindow !== 'undefined' ? unsafeWindow.jQuery : window.jQuery);
}, 1000);