// ==UserScript==
// @name           YouTube Downloader
// @namespace      http://userscripts.org/users/105501
// @author         Joseph F. | http://www.portaltec.org
// @description    Script para baixar videos do youtube
// @include        *.youtube.com/watch*
// ==/UserScript==

var insere = function()
	{

function acessaPagina(url)
	{
		var ajaxClass = new XMLHttpRequest;
		ajaxClass.open("GET", url, false);
		ajaxClass.send(null);
		return ajaxClass.responseText;	
	}
	
function downloadVideo()
	{
			var id = unescape(document.getElementsByTagName("html")[0].innerHTML.match(/\?v=(.*)\"/i)[1]);
			var url_down = "http://www.youtube.com/get_video_info?video_id=" + id + "&el=&ps=default&eurl=";
			var link;
			url_down = acessaPagina(url_down);
			link = decodeURIComponent(url_down).match(/fmt\_url\_map=\d{2}\|([^\,]+)/i)[1];
			var iframe = document.createElement("iframe");
			iframe.src = link;
			iframe.width = 0;
			iframe.height = 0;
			document.body.appendChild(iframe);
	};
}
insere = String(insere);
insere = insere.substring(13, insere.length - 2);
var script = document.createElement("script");
script.setAttribute("language","JavaScript");
script.innerHTML = insere;
document.body.appendChild(script);

if (location.href.match(/watch/i))
	{
		var btn = document.createElement("input");
		btn.className = "search-button yt-uix-button";
		btn.value = "Baixar v\xeddeo!";
		btn.setAttribute("onClick","downloadVideo()");
		btn.type = "button";
		var span = document.createElement("span");
		var nbsp = "&nbsp;&nbsp;<b>";
		for (x = 0;x < 5;++x)
			nbsp = nbsp + "----";
		nbsp = nbsp + "</b>&nbsp;&nbsp;";
		span.appendChild(btn);
		var titulo = document.getElementById("eow-title");
		if (titulo.innerHTML.length > 30)
			titulo.innerHTML = titulo.innerHTML.substring(0, 30) + "...";
		with(titulo)
			{
				innerHTML += nbsp;
				appendChild(span);
			}
		
	}