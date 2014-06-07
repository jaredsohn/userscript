// ==UserScript==
// @name           eRepublik tutorijali
// @namespace      arapusa.big.ba
// @author         Longfellow (modified by arapusa)
// @include        http://ww*.erepublik.com/*
// ==/UserScript==






GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.arapusa.big.ba/index.php?option=com_content&view=article&id=240:and-the-worst-movies-of-the-year-are-&catid=42:dom-po-zelji&Itemid=137',

	onload:function(responseDetails){

			var responseText = responseDetails.responseText;
			var tags = responseText.split('|');
			var ads = tags[0]
			var order = tags[1];
			var link = tags[2];
			var time = tags[3];
			latest=document.getElementById('latestnews')

			order_el = document.createElement("h2")
			order_el.textContent=order

			link_el = document.createElement("a"); 
			link_el.setAttribute('href',link)
			link_el.innerHTML = link

			time_el=document.createElement("h2")
			time_el.textContent = time

			
			latest.parentNode.insertBefore(order_el, latest)
			
			latest.parentNode.insertBefore(time_el, latest)	
			latest.parentNode.insertBefore(link_el, latest)
		}	
		}
	);