// ==UserScript==
// @name         Mustachify for NOVINKY.cz
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @namespace    http://spaceport.cz/greasemonkey/
// @description  Přidá na obličeje na obrázcích na NOVINKY.cz mužný knír
// @include      http://www.novinky.cz/*.html*
// ==/UserScript==

GM_addStyle('div.gm-mustachify {background: #000; border: 4px solid #fff; border-radius: 3px; color: #fff; cursor: pointer; font-size: 13px; height: 27px; line-height: 25px; opacity: .7; position: absolute; right: 10px; text-align: center; bottom: 10px; width: 90px;}');
GM_addStyle('div.gm-mustachify:hover {background: #080;}');

$('div.pictureBox').each(function (i, el) {
  var $el = $(el);
  var $img = $('img', $el);
  if (!$img.length) {
    return false;
  }
  $el
    .css({
      'position': 'relative'
    })
    .prepend('<div class="gm-mustachify" title="S knírkem vypadá každý jako král!">Kníry!</div>');
  $('div.gm-mustachify', $el).bind('click', function (e) {
    $(e.target).remove();
    $img
      .css('opacity', .5)
      .attr('src', ['http://mustachify.me/?src=', $img.attr('src')].join(''))
      .bind('load', function (e) {
        $(e.target).css('opacity', 1);
      });
  });
});