// ==UserScript==
// @name        website linkify
// @namespace   org.upsuper.bangumi
// @include     http://bgm.tv/subject/*
// @include     http://chii.in/subject/*
// @include     http://bangumi.tv/subject/*
// @grant       none
// @version     1.0
// ==/UserScript==

function forEach(array, callback) {
  return Array.prototype.forEach.call(array, callback);
}

var $infoitems = document.querySelectorAll('#infobox>li');
forEach($infoitems, function ($item) {
  var $tip = $item.firstElementChild;
  if ($tip.className == 'tip' && $tip.textContent == '官方网站: ') {
    forEach($item.childNodes, function ($node) {
      if ($node.nodeType == Node.TEXT_NODE) {
        var text = $node.textContent.trim();
        if (text.match(/^https?:\/\//)) {
          var $link = document.createElement('a');
          $link.href = text;
          $link.className = 'l';
          $link.target = '_blank';
          $link.title = '官方网站';
          $link.textContent = $node.textContent;
          $item.replaceChild($link, $node);
        }
      }
    });
  }
});
