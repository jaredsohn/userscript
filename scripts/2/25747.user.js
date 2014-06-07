// ==UserScript==
// @name           muxbows
// @namespace      http://userscripts.org/scripts/source/25747.user.js
// @description    This adds elbo.ws links to muxtape
// @include        http://*.muxtape.com/*
// ==/UserScript==

var lis = document.getElementsByTagName('li');
var j=0;
for(var i=0; i<lis.length; i++)
{
	if(lis[i].getAttribute("class") == "song")
	{
		
		var divs = lis[i].getElementsByTagName('div');
		var artist = '';
		for(var k=0; k<divs.length; k++){
			if(divs[k].getAttribute("class") == "name"){
				artist = divs[k].innerHTML;
				var pos = artist.indexOf(' - ');
				if(pos){
					artist = artist.substring(0,pos);
				}
			}
		}
		var dl_a = document.createElement('a');
		dl_a.setAttribute('href','http://elbo.ws/artist/' + artist + '/');
		dl_a.setAttribute('style',"color: #306EFF; display: inline; padding: 0 4px;");
		dl_a.setAttribute('onclick',"location.href='http://elbo.ws/artist/" + artist + "/'");
		dl_a.innerHTML="Elbows";
		lis[i].appendChild(dl_a);
	}
}