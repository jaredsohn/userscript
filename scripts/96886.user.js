// ==UserScript==
// @name           CIMA Event Price
// @namespace      http://userscripts.org/users/lorriman
// @description    Inserts price in to event lists 
// @include        http://www.cimaglobal.com/*
// @version         .1
// ==/UserScript==

function injectText(node,text){
	node.parentNode.insertBefore(div=document.createElement('div'),node.nextSibling);
	div.innerHTML='<table bordercolor="black" border="1px"><tbody><tr><td>'+text+'</td></tr></tbody></table>';
}


var links = document.links;

for (i = 0; i < links.length; i++) {
	
  if (links[i].href.indexOf("Events-and-cpd-courses\/Events")!=-1) {	
		
		if(false){		

		}else{		
			GM_xmlhttpRequest({
			method: 'get',
			headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Content-type': 'application/x-www-form-urlencoded'
			},
			url: links[i].href,
			onload: function (i) { return function(result) {		
				var link=links[i];
				var price = result.responseText.match(/<td.*?>[\s\S]*?(Price:[\s\S]*?)<\/td>/m);
					
					if(price){
						injectText(link,price[1]);
					}
				}}(i)
			});

		}

	}

}


