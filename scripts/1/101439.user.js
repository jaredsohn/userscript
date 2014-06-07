// ==UserScript==
// @name           Video Sibnet.ru Downloader
// @version        1.0
// @description    Video Sibnet.ru Downloader
// @include        http://video.sibnet.ru*
// @author         NAT
// @namespace      http://userscripts.org/scripts/show/101439
// @homepage       http://games.stbur.ru
// @screenshot     http://img10.imageshack.us/img10/2783/sibnetvideo.png
// ==/UserScript==

(function() {
	var kod = document.getElementById('kodvstavki');
	if (kod != null)
	{
		var flashValues=kod.innerHTML;  
		var videoIdMatches=flashValues.match(/file=(.*)flv/);
		var videoLink = decodeURIComponent(videoIdMatches[1] + 'flv');
		
		var button = document.getElementById('favorite_but');
		var icon_src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAABtUlEQVQokY2RTWsTURhGzzXpTFObrzakNQUNmC5dBH+BFNy4KVbciBQs6N6V27oW7KKKBSsorgQpCN0riEhBxAqhtc1Ha7FTk0zGSZqvmbnXlSL1LvIsH86Bh/cVaHL7GYmQImUm2ek1mJaC2sotnJPcKZ08MkbDh1zH4ZIPOTNJQ8dpZbdOvq8oTWYiD/uKUssmP7CcmhRrHmTrrnzuQTY5wdrAslVXiwFsLl/vLQWwWbVZ1HFCVz55N6visQwKSV92sZ0Kd2fe/seGdXI8niE1nsWTbY79Bi1vRIfpZ/vSRYgO0AL1C0VXK/+dsrBKaio9/dqI9s6ao53s+OgU6eELdIMmrW6Tql2ttJv+j/3DwtzqAhZA6I/8+Q3t/JwsTKSjd0LGgamw8NQhZiiCRw0hhg2rZs0/unFc0M5euuZsHOz1bkbFOT9mGhhhl4Ai4cD0y+Wf8w+uHr3/lw9xIh9eudsXZxPN3JnzlxORMYE8LXf2W/fuXyk/Hehghd29x1vFoRfxoRm2S+bLL1u7yzpO+yrhY3z6+nH92/dirOlU14XUc9pSQTeQcsOxjyooagj9r34DfPq10QlOxDgAAAAASUVORK5CYII%3D';
		
		var tr = document.createElement('tr');
		var td = document.createElement('td');
		td.innerHTML ='<a href="'+videoLink+'"><img src="'+icon_src+'" style="margin-right:5px;">Скачать</a>';
		button.insertBefore(tr, button.nextSibling);
		tr.appendChild(td);
	}
})();