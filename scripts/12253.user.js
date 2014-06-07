// ==UserScript==
// @name		flickr2big-minus-borken
// @namespace	http://cleoag.ru/labs/greasemonkey/
// @description	scale up flickr images in Google Reader
// @include	http://reader.google.com/*
// @include	http://www.google.com/reader/*
// @include	http://google.com/reader/*
// @include	http://reader.google.ru/*
// @include	http://www.google.ru/reader/*
// @include	http://google.ru/reader/*
// ==/UserScript==


var entries=document.getElementById("entries");
entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);

var flickrRegex = /^(http:\/\/(farm\d{0,3}\.)?static\.flickr\.com\/(\d+)\/(\d+)_(\w+?)((_[stmb])?\.jpg|_o\.(jpg|gif|png))).*$/;

function nodeInserted(event){	
	if (event.target.tagName=="DIV"){
		try{
			item = event.target.getElementsByTagName('INS');
			for (var i = 0; i < item.length; i++) {
				item = item[i];
				allImages = item.getElementsByTagName('img');
				for (var i = 0; i < allImages.length; i++) {
				    imgTag = allImages[i];
				    // do something with thisTextarea
					var p = imgTag.src.replace(flickrRegex, '$2,$3,$4,$5,$6,$7,$8').split(",");
					if (p.length>3){
						var newSrc = "http://"+p[0]+"static.flickr.com/"+p[1]+"/"+p[2]+"_"+p[3]+".jpg";
GM_xmlhttpRequest({
    method: 'GET',
    url: newSrc,
    onload: function(responseDetails) {
if(responseDetails.responseText.length>2764){
						imgTag.src = newSrc;
						imgTag.removeAttribute('width');
						imgTag.removeAttribute('height');
}
    }
});
					}
				}

			}
		}
		catch(e){
			//GM_log(e);
		}
	}
}



