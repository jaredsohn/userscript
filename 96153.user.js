// ==UserScript==
// @name           F1News gallery
// @namespace      http://*
// @include        http://www.f1news.ru/gallery/*
// ==/UserScript==

var jq = document.createElement('script');
var jQuery, $;
jq.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js');
document.getElementsByTagName('head')[0].appendChild(jq);

var initGallery = function initGallery()
{
  $('#rightBlock').remove();
  var $imgBlock = $('#gsImageView');
  if(!$imgBlock.length) return;

  var $a = $('a', $imgBlock);
  var $img = $('img', $imgBlock);

  $img.removeAttr('width').removeAttr('height').attr({src: $a.attr('onclick').toSource().match(/\/gallery\/.*\.jpg/)[0]});
  var url = $('#gsContent a.next, #gsContent a.first').eq(0).attr('href');
  $a.removeAttr('onclick').attr('href', url);
}

jq.addEventListener('load', function(){
  $ = jQuery = unsafeWindow.jQuery;
  initGallery();
}, false);