// ==UserScript==
// @name          Pikabu Hide Visted News
// @version       1.4
// @include       http://pikabu.ru/*
// @author        Rarex
// ==/UserScript==
try{
var main = function () {
$('<div class="button"><div><a onclick="return false;">Скрыть</a></div></div>').insertBefore( $('.header_bottom_menu').find('.button').eq(-1) ).click(function(){ $('.visited').parents('.story_link').remove()  })
$("<li><a class='no_ch'>Скрыть</a></div>").css('cursor', 'pointer').appendTo('ul.menu').click(function(){$('.visited').parents('.inner_wrap').remove() })

};


var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);
}catch(e){}