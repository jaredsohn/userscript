// ==UserScript==
// @name           DromWithAvatars
// @namespace      su.gornostaev
// @description    Отображает аватары на forums.drom.ru
// @version        1.2
// @author         Sergey TheDeadOne Gornostaev
// @license        BSD
// @include        http://forums.drom.ru/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('body').append($('<div id="ImgPane"></div>').css({
  'position':         'absolute',
  'width':            'auto',
  'border':           '1px #000000 solid',
  'margin':           '5px',
  'padding':          '5px',
  'background-color': '#FFFFFF',
  'z-index':          '999',
}).hide());

var cache = {};

$('a.bigusername').each(function() {
  var uid = $(this).attr('href').split('?')[1].split('=')[1];
  $('<br><img class="upic" id="av_'+uid+'" src="http://forums.drom.ru/image.php?u='+uid+'">').insertAfter(this);
  var cacheImage = document.createElement('img');
  cacheImage.src = 'http://forums.drom.ru/image.php?u='+uid+'&type=profile';
  cache[uid] = cacheImage;
});

$('.upic').hover(function(e) {
  var uid = e.target.id.split('_')[1];
  if(cache[uid].width > 1) {
    $('#ImgPane').html(cache[uid])
    .css({
          'top':($(window).height() - $('#ImgPane').height()) / 2 + $(window).scrollTop() + 'px',
          'left':($(window).width() - $('#ImgPane').width()) / 2 + $(window).scrollLeft() + 'px'
        }).fadeIn();
  }
},
function(e) {
    $('#ImgPane').fadeOut();
});
