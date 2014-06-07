// ==UserScript==
// @name           Province.ru improver
// @namespace      http://userscripts.org/users/404192
// @include        http://province.ru/kostroma/news*
// @include        http://www.province.ru/kostroma/news*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
(function(){
  function onLoad()
  {  
	$('#left').hide() 
	$('#workarea').css('margin-left', '0px')
	$('.news-extra').hide()
	$('#content').find('h1').html($('#content').find('h1').html() + ':' + $('.news-name').html())
	$('#content h1').css('white-space', 'normal')
	$('.news-name').hide()
	$('.news-main').css('float', 'right')
	$('.news-main').css('margin', '5px')
  }

  onLoad();
})();