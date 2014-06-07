// ==UserScript==
// @name        Trello Timer
// @namespace   http://blmarket.net/users
// @description Display open time for each cards
// @include     https://trello.com/b/*
// @version     1   
// @grant       none
// ==/UserScript==

var lastTitle, lastTimer;

function checkOpeningCard($) {
  var $elem = $('.window-overlay .window .window-title.card-detail-title');
  if ($elem.length === 0) {
    if (lastTitle) {
      console.log(lastTitle, lastTimer);
    }   
    lastTitle = null;
    return;
  }   
  var $timer = $('#trello-timer').length === 1 ? $('#trello-timer') : $('<div id="trello-timer" style="position:fixed;top:0;right:0;z-index:99999999999;padding:30px 20px;font-size:70px;color:#fff;font-weight:bold;background:#000;opacity:.8"><span data-time="0">00:00</span>').appendTo($elem);
  var $t = $timer.find('span');
  var time = Number($t.data('time')) + 1;
  var f = function (n) {
    return n.toString().length >= 2 ? n : '0' + n;
  };
  $t.data('time', time).text( f(parseInt(time / 60, 10)) + ':' + f(time % 60) );
}

setInterval(function() {
  checkOpeningCard(typeof unsafeWindow !== 'undefined' ? unsafeWindow.jQuery : window.jQuery);
}, 1000);