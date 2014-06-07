// ==UserScript==
// @id             www.flickr.com-b7c44f49-ba0c-4fc7-aebc-4fcd340457bd@scriptish
// @name           Flickr Groups Leecher
// @version        1.0
// @namespace      flickr
// @author         Yansky
// @description    Flickr Groups Leecher
// @include        http://www.flickr.com/groups/*/pool/*
// @run-at         document-end
// @require		   https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// ==/UserScript==



function sResults(textData){
	var textArCheck = document.querySelector('#GM_ScrapeResults');
	if(!textArCheck){
		textArCheck=document.createElement('textarea');
		textArCheck.setAttribute("id", "GM_ScrapeResults");
		textArCheck.setAttribute("cols", "80");
		textArCheck.setAttribute("rows", "20");	
		textArCheck.style.padding="10px"; 	
		document.body.insertBefore(textArCheck, document.body.firstChild);	
		var t=textArCheck.textContent;
		textArCheck.textContent='Running... \r'+t;
	}
	textArCheck.textContent+=textData+'\r';
}

function imgjax(doc,imgLinks,docURL){
	if(GM_getValue("runflickrLeech")){
		$.each(imgLinks, function(i) {
			sResults(this.src.replace('_t.jpg','_z.jpg'));
			if(i+1==imgLinks.length){
				var nextPage=doc.querySelector('a.Next');
				if(nextPage){
					var nextPageHR;
					if(!nextPage.hasAttribute('href')){
						var nextPageNum=(Number(docURL.split('/pool/page')[1].split('/')[0])+1).toString();
						nextPageHR=docURL.split('/page')[0]+'/page'+nextPageNum+'/';
					}
					else{
						nextPageHR=nextPage.href;
					}
					$.get(nextPageHR, function(data){
						var pageDoc = GM_safeHTMLParser(data);
						imgjax(pageDoc, pageDoc.querySelectorAll('#main .HoldPhotos .PoolList .photo_container a img'),nextPageHR);
					});
				}
				else{
					stopLeech();
				}
			}
		});
	}
}

function startLeech(){
	GM_setValue("runflickrLeech",true);
	var iL=document.querySelectorAll('#main .HoldPhotos .PoolList .photo_container a img');
	imgjax(document,iL,null);
}

function stopLeech(){
	GM_setValue("runflickrLeech",false);
	var textArCheck = document.querySelector('#GM_ScrapeResults');
	if(!textArCheck){
		var t=textArCheck.textContent;
		textArCheck.textContent='Finished \r'+t;
	}
}


GM_registerMenuCommand("Start Flickr Leech", startLeech);
GM_registerMenuCommand("Stop Flickr Leech", stopLeech);
