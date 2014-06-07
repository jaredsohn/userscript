// ==UserScript==
// @name           Paparazzo Gallery Improve
// @namespace      http://userscripts.com/wilkerlucio/paparazzo_gallery_improve
// @include        http://ego.globo.com/PPZ/*
// ==/UserScript==

document.body.innerHTML = '';

var container = document.createElement("div");
container.style.height = '100%';
container.style.overflow = 'auto';
container.style.textAlign = 'center';

document.body.appendChild(container);

GM_xmlhttpRequest({
	method: "GET",
	url: 'http://ego.globo.com' + unsafeWindow.urlXML,
	onload: function(response) {
		var data = response.responseText;
		var items = data.match(/fg=\".*?\"/g)
		
		for (var i = 0; i < items.length; i++) {
			var url = items[i].match(/fg=\"(.*?)\"/)[1];
			
			var img = document.createElement("img");
			img.src = url;
			img.style.margin = '5px 0';
			img.style.width = '100%';
			
			container.appendChild(img);
		}
	}
});
