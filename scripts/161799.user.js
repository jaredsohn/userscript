// ==UserScript==
// @name        Surfingbird-link
// @namespace   mu57di3.net
// @include     http://surfingbird.ru/surf/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1.5
// ==/UserScript==
var link = '';
var short_link = '';

$(document).ready(function()
{
	var page_iframe = $('iframe.b-container__frame');
	link = page_iframe.attr('src');
	var img_type = new RegExp("/fix/image/[\S]*");
	if (img_type.test(link)){
		console.log('Картинка линк моно банально скопировать по правой кнопке.');
	} else {
		console.log(link);
		var par = {
			url: link
		}
		
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://clck.ru/--?url="+link,
			onload: function(response) {
				short_link = response.responseText;
				console.log (short_link);
				doButton();
			}
		});
	}
	
	function doButton(){
		var md_surfer_toolbar = $('div.b-toolbar div.b-toolbar__cont');
		var md_button = $('<div class="i-tooltip "><div class="b-button">'+
		'<i class="b-button__text">Link</i></div></div>');
		md_button.bind('click',function (){
			alert(short_link);
		});
		md_surfer_toolbar.append(md_button);
		var md_button_fix = $('div.b-toolbar div.b-toolbar__cont div.b-toolbar__add');
		md_button_fix.css('float','right');
		md_button_fix.css('margin','5px 200px 0 0');
	}
});

