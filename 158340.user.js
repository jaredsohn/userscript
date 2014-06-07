// ==UserScript==
// @id             www.facebook.com-ae6e8d1b-d3f4-4d10-ab1f-2e8ebc9235d3@k
// @name           Enable Facebook Videos for flash 10.1
// @version        1.1
// @namespace      faceb
// @author         Yanksy
// @description    Enable Facebook Videos for flash 10.1
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// @run-at         document-end
// ==/UserScript==

if(window.frameElement)
	return;

function replaceFlashVid(url){

	var vidSCon = document.querySelector('.videoStageContainer');

	vidSCon.innerHTML='';

	var newEmbed = document.createElement('embed');

	newEmbed.setAttribute('allowscriptaccess','always');
	newEmbed.setAttribute('wmode','opaque');
	newEmbed.setAttribute('scale','noscale');
	newEmbed.setAttribute('salign','tl');
	newEmbed.setAttribute('width','720');
	newEmbed.setAttribute('height','720');
	newEmbed.setAttribute('bgcolor','#000000');
	newEmbed.setAttribute('type','application/x-shockwave-flash');
	newEmbed.setAttribute('allowfullscreen','true');  

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://www.facebook.com/photo.php?v='+url,
		onload: function (responseDetails) {
		
			var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
			doc = document.implementation.createDocument('', '', dt),
			html = doc.createElement('html');

			html.innerHTML = responseDetails.responseText;
			doc.appendChild(html);
			
			[].forEach.call(doc.querySelectorAll('body>script'), function(item, index, arr){

				if(item.textContent.search(/JSCC.init/) != -1){

					var firstIn = item.textContent.indexOf('=')+1;
					var swfID = item.textContent.slice(firstIn,item.textContent.indexOf(';',firstIn));

					newEmbed.setAttribute('name',swfID);
					newEmbed.setAttribute('id',swfID);
					newEmbed.setAttribute('src','https://fbstatic-a.akamaihd.net/rsrc.php/v1/yF/r/tm_x25S2lIZ.swf');
					
					var paramInd = item.textContent.indexOf('params');
					var firstComma = item.textContent.indexOf(',',paramInd)+1;
					var endPoint = item.textContent.indexOf(']',firstComma);
					var sliceThatShit = JSON.parse(item.textContent.slice(firstComma,endPoint));
					
					newEmbed.setAttribute('flashvars','params='+sliceThatShit);
					
					vidSCon.appendChild(newEmbed);
				
				}
			
			});
		}
	});

}	
	
function urlCheck(){

	if(document.URL.search(/^(http|https)\:\/\/www.facebook.com\/photo.php\?v=/) === 0){

		replaceFlashVid(window.location.href.split('facebook.com/photo.php?v=')[1].split('&')[0]);

	}
	
	var observer = new MutationObserver(function(mutations) {

		mutations.forEach(function(mutation) {

			if(mutation.attributeName === 'class' && mutation.target.classList.contains("_31e")){
				
				window.setTimeout(function(){

					replaceFlashVid(window.location.href.split('facebook.com/photo.php?v=')[1].split('&')[0]);
					
				},3500);
				
			}
				
		}); 
		
	});

	observer.observe(document.querySelector('._li'), { attributes: true });	


}	
	
window.setTimeout(urlCheck,1000);
