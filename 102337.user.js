// ==UserScript==
// @name           KRUF RETRIEVE
// @namespace      KRUF_RETRIEVE_URL
// @include        http://www.furk.net/*
// @include        http://furk.net/*
// @include        https://www.furk.net/*
// @include        https://furk.net/*
// @include        furk.net/*
// ==/UserScript==

var potentialVideoLink = document.evaluate('//a[@class="button-large button-play"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if(potentialVideoLink.snapshotLength == 1){
	makeAjaxHTTPRequest(potentialVideoLink.snapshotItem(0).href, 'GET') ;
}

function makeAjaxHTTPRequest(url, method) {
	//unsafeWindow.console.log(url);
	GM_xmlhttpRequest({method: method,
		url: url,
		onload: function(response) {
			try {
				//unsafeWindow.console.log('responseText is '+ response.responseText);
				//unsafeWindow.responseText = responseText;
				//var xmlDoc = document.implementation.createDocument("","",null);
				var xmlDoc;
				if (window.DOMParser) {
				xmlDoc=new DOMParser().parseFromString(response.responseText,"text/xml");
				}
				var locations = xmlDoc.getElementsByTagName("location");
				var linksDiv = document.createElement("div");
				linksDiv.id = 'linksDiv';
				linksDiv.style.zIndex = 3;
				linksDiv.style.width = '100%'; 
				linksDiv.style.height = '100px';
				linksDiv.style.position = 'fixed';
				linksDiv.style.bottom = 0;
				linksDiv.style.left = 0;
				linksDiv.style.backgroundColor = 'lightgreen';
				//linksDiv.style.overflow = 'auto';
				var linkMarkup = '';
				for(var i=0; i<locations.length; i++){
					linkMarkup += locations[i].textContent+'\n';
				}
				linksDiv.innerHTML = '<textarea style="margin:10px; height:80px; width:90%" cols="1000" wrap="off" readonly>'+linkMarkup+'</textarea>';
				document.body.appendChild(linksDiv);
			} catch (e) {
				/* unsafeWindow.console.log('Unable to get Availabilty; exception: ' + e); */
				respText =  'Try Again!';
			}
		}
	});
	//unsafeWindow.console.log(url);
}

