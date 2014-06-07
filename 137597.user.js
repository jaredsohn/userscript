// ==UserScript==
// @name        Kronos MCAnime - Auto Actualizar Feeds [Portada]
// @namespace   Zeyth
// @description Auto actualiza cada 20 segundos los "Ultimos Feeds" en la portada de Kronos [solo si no se esta escribiendo un mensaje].
// @include     http://kronos.mcanime.net/
// @include     http://kronos.mcanime.net/portada
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant		GM_XMLHttpRequest
// @version     1.3
// ==/UserScript==

//Retrasamos 2 segundos la ejecucion para evitar problemas
setTimeout(function(){
if ($('#user-feeds').length > 0) 
{
function main() {

	function loop()
	{
	if ($('div#tab-menu li.main.first.selected').length > 0) 
	{
	var xhr = new XMLHttpRequest();  
	xhr.open('GET', 'http://kronos.mcanime.net/filtrarFeeds/todos', true);    
	xhr.onload = function(e) 
	{
	var tid = setTimeout(loop, 20000);
	var respDoc = xhr.response;
	var mespDoc = $(xhr.response);
	var data = respDoc.split('[|]');
	var actual = $('a.more-feeds.r3').attr('href') + '/todos';
	var writing = $('li.add-pComment > img.pComment-author:not(.hide)').length;
	var viewing = $('div#user-feeds div[id].profile-story').length;
	var replies = $('div#user-feeds div[id].profile-story li[id^=\'comment-\']').length;
	var mirai	= $('li[id^=\'comment-\']', mespDoc).length;
	if (data[0].length > 0 && writing == '0' && viewing <= '14') 
	{
		if (data[0] == actual && replies != mirai) 
		{
			$('.more-feeds').attr('href', data[0].slice(0, -6));
			$('#user-feeds').html(data[1]);
			initInteraction();
		}
		else if (data[0] == actual && replies == mirai) {
			return false;
		}
		else 
		{
			$('.more-feeds').attr('href', data[0].slice(0, -6));
			$('#user-feeds').html(data[1]);
			initInteraction();
		}
	}
	}
	xhr.send();
	}
	}
	var tid = setTimeout(loop, 20000);
}

function addJS(nsrct) {
  var script = document.createElement("script");
    script.textContent = "(" + nsrct.toString() + ")();";
    document.body.appendChild(script);
}

addJS(main);
}
},2000);