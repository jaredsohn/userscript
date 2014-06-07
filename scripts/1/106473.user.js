// ==UserScript==
// @name           eTR_information
// @namespace      www.erepublik.com
// @description    Governmet Information script for the eTurkey community on eRepublic
// @version        0.2
// @include        http://*.erepublik.com/*
// @require        http://code.jquery.com/jquery-1.6.1.min.js
// @require        http://json-template.googlecode.com/files/json-template.js
// ==/UserScript==
//------------------------------------------------------------------------------
// 	Changelog
//------------------------------------------------------------------------------
// v.0.2
// - Emir HTML için JSON Template kullanıldı (son düzenlemeler yapılana kadar resource olarak tanımlanmayacak)
// - Emir içerik için JSON verisi kullanıldı
//------------------------------------------------------------------------------
// v.0.1
// - Emirleri bir URL'den al (pastebin'e sifreli erisim)
// - JQuery ile sayfa içine yerleştir
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// 	TO-DO
//------------------------------------------------------------------------------
// + Updater script
// + Twitter yayınlama
//------------------------------------------------------------------------------

GM_xmlhttpRequest( {
	method: 'GET',
	url: 'http://pastebin.com/raw.php?i=h2QjBry4',
	onload:function(response)
	{
		var template = jsontemplate.Template(response.responseText);
		GM_xmlhttpRequest( {
			method: 'GET',
			url: 'http://pastebin.com/raw.php?i=KWyXCx1c',
			onload:function(response)
			{
				$("div.zone_news").html(template.expand(JSON.parse(response.responseText)));
				
			}
		});
	}
});
