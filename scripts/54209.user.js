// ==UserScript==
// @name           hm orders
// @namespace      hm12345.uw.hu
// @include        http://ww*.erepublik.com/*
// @version        0.0.2
// @created by     eHero
// ==/UserScript==


GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://hm12345.uw.hu/parancs.txt',

	onload:function(response){

			var responseText = response.responseText;
			var tags = responseText.split('|');
                        var command = tags[0];
			var link1 = tags[1];
                        var news = tags[2];
                        var link2 = tags[3];
                        var battle = tags[4];
                        var link3 = tags[5];

			
                        latest=document.getElementById('latestnews')

                        command_el = document.createElement("h2")
			command_el.textContent=command

			link1_el = document.createElement("a"); 
			link1_el.setAttribute('href',link1)
			link1_el.innerHTML = link1
                        
                        news_el = document.createElement("h2")
			news_el.textContent=news

			link2_el = document.createElement("a"); 
			link2_el.setAttribute('href',link2)
			link2_el.innerHTML = link2

                        latest.parentNode.insertBefore(command_el, latest)
                        latest.parentNode.insertBefore(link1_el, latest)
                        latest.parentNode.insertBefore(news_el, latest)
                        latest.parentNode.insertBefore(link2_el, latest)

shouts=document.getElementById('shouts')

                        battle_el = document.createElement("h2")
			battle_el.textContent=battle
			
			link3_el = document.createElement("a");                        
                        link3_el.setAttribute('href',link3)
			link3_el.innerHTML = link3
			
			shouts.parentNode.insertBefore(battle_el, shouts)
			shouts.parentNode.insertBefore(link3_el, shouts)

		}	
		}
	);