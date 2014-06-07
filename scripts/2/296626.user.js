// ==UserScript==
// @name       Embeds do Youtube comem criancinhas
// @namespace  http://gamesfoda.embedkill
// @version    1
// @description	Remove embeds do Youtube do fórum do Gamesfoda, substituindo-os por links para o vídeo e um botão que traz o embed de volta, se for o caso.
// @match      http://www.gamesfoda.net/forum*
// @copyright  2014 @Blekwave
// @require    http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

var s = document.createElement('script');
s.setAttribute('src', 'http://code.jquery.com/jquery-latest.min.js');
if (typeof jQuery == 'undefined') {
    document.getElementsByTagName('head')[0].appendChild(s);
}

$('iframe').replaceWith(function(){
	var videoID = $(this).attr('src').substr(29);
	return '<div class="ytvid"><a href="https://www.youtube.com/watch?v='+videoID+'">Youtube: '+videoID+'</a> <a class="embed" href="javascript:return 0;">[Embed]</a></div>';
});

$('div.ytvid a.embed').click(function(){
	var videoID = $(this).prev().text().substr(9);
	$(this).parent('div').replaceWith(function(){
		return '<iframe width="560" height="315" src="//www.youtube.com/embed/'+videoID+'" frameborder="0" allowfullscreen></iframe>';
	});
});