// ==UserScript==
// @name           Qype Badge Progress Meter
// @namespace      net.moeffju
// @include        http://www.qype.tld/mypage/badges
// @include        http://qype.tld/mypage/badges
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$('.BadgeSpriteGreyscale').each(function(i,x) {
  //sorry for the weird mix of jQuery and DOM code, Greasemonkey scoping can be really annoying
  var badge_id = x.parentNode.href.replace(/.*\//, '');
  var s = ['#badge_tooltip_',badge_id,' span.Bar'].join('');
  var w = $(s).slice(0,1).css('width');
  var y = document.createElement('img');
  y.className = x.className.replace(/BadgeSpriteGreyscale/, 'BadgeSpriteMedium');
  y.src = x.src;
  y.alt = x.alt;
  y.style.position = 'absolute';
  y.style.width = w;
  x.parentNode.insertBefore(y, x);
});
