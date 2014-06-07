// ==UserScript==
// @name		Main# Exterminator
// @description		Xiao
// @include		http://*orkut.*/*
// @copyright		http://www.sandbox.orkut.com/Profile?uid=8304011258785211759
// @version		1.01
// ==/UserScript==

( function () {

	if(!location.href.match(/AlbumZoom/gi)){
		if(location.href.match(/Main#/gi)) location.href = location.href.replace(/Main#/gi,"");

		window.opera.addEventListener('BeforeScript', function (e)
		  {
			e.element.text = e.element.text.replace('_initOrkutPage(true);', '').replace('_initOrkutPage(true, true);','');
		  }, false);
		  
		var InitListeners = function()
		{
			var links = document.links;
			for(x=0;x<links.length;x++){
				links[x].href = links[x].href.replace(/Main#/i, '');
				if(links[x].href.match(/Interstitial/gi,"")) links[x].href = decodeURIComponent(links[x].href.match(/Interstitial\?u=(.*)&t=[A-Z0-9_-]+$/i)[1]);
				if(links[x].parentNode.className!="userimg" && links[x].parentNode.className!="username" && links[x].parentNode.className!="userbutton_text") links[x].href = links[x].href.replace(/Community\?/gi,"CommTopics?");
				if(location.href.match(/(CommM|CommE|Profile|Community|Scrapb|Home)/gi) && links[x].href.substring(0,20).match(/orkut\./gi) && !links[x].href.match(/jpg/gi)) links[x].href=links[x].pathname+links[x].search;
			}
		}
		  
		document.addEventListener('DOMContentLoaded', InitListeners, false);
	}

	var ff = function()
	{
		if(document.body.innerHTML.match(/Community/gi)){
			var links = document.links;
			for(x=0;x<links.length;x++){
				links[x].href = links[x].href.replace(/Main#/i, '');
			}
		}
	}

	document.addEventListener('DOMContentLoaded', ff, false);

})();