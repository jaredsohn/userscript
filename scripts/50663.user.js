// ==UserScript==
// @name           snapfiles - show images on page listings
// @namespace      userscripts.org
// @include        http://www.snapfiles.com/*
// @include        http://snapfiles.com/*
// ==/UserScript==

var getProducttables = document.getElementsByClassName('producttable');

if(getProducttables[0]){

	
	[].forEach.call(getProducttables,function(item,index,array){	
	//for each (var item in getProducttables ) {

		var div4Img = item.getElementsByClassName('cattable-footer')[0];
		var ssL = item.getElementsByClassName('sslink')[0];

		if(ssL){
		console.log(ssL);
			var hrefToGet = ssL.getElementsByTagName('a')[0].href;

			GM_xmlhttpRequest({
				method: 'GET',
				url: hrefToGet,
				headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/html'},
				onload: function(responseDetails){
					
					var respT = responseDetails.responseText;
					var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
					var doc = document.implementation.createDocument('', '', dt);
					var html = doc.createElement('html');

					html.innerHTML = responseDetails.responseText;
					doc.appendChild(html);					
					var div4Img = this.htmlCollectionItem;
					var newImgSrc = doc.querySelector('#screenshot-container img').src;
					var picDiv = document.createElement('div');
					picDiv.setAttribute('class','cattable-content');
					picDiv.setAttribute('style','text-align:center;padding-bottom:10px;');
					picDiv.innerHTML='<img src="'+newImgSrc+'" />';
					div4Img.parentNode.insertBefore(picDiv, div4Img);
					
				},
				onerror:function(e){
					var erDiv = document.createElement('div');
					erDiv.innerHTML='<p>There was an error getting the image.</p>';
					div4Img.parentNode.insertBefore(picDiv, erDiv);
				},
				htmlCollectionItem: div4Img
			})	
		
		}
	
	});	
	
}