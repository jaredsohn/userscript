// ==UserScript==
// @name         Mustachify for iDNES.cz
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @namespace    http://spaceport.cz/greasemonkey/
// @description  Přidá na obličeje na obrázcích na iDNES.cz mužný knír
// @include      http://*.idnes.cz/*
// ==/UserScript==

GM_addStyle('div.gm-mustachify {background: url(http://g.idnes.cz/u/n4/button-bg.gif) repeat-x #fff; border: 1px solid #000; border-radius: 3px; box-shadow: 0 0 2px #000; cursor: pointer; font-size: 12px; height: 25px; line-height: 23px; position: absolute; right: 5px; text-align: center; top: 5px; width: 90px; z-index: 100;}');
GM_addStyle('div.gm-mustachify:hover {box-shadow: 0 0 4px #000;}');

$('div.opener-foto').each(function (i, el) {
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
    return false;
  });
});

