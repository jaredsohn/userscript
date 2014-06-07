// ==UserScript==
// @name           eRepublik eThai Daily News
// @namespace      tujul.info
// @author         Longfellow (modified by tujul)
// @include        http://ww*.erepublik.com/*
// ==/UserScript==






GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://tujul.info/dailyscript.php',

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