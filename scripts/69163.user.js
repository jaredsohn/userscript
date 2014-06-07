// ==UserScript==
// @name           Place des arts preview
// @namespace      tag:neorad,2010-02-16:placedesarts
// @include        http://www.place-des-arts.com/en/listeabc.asp*
// ==/UserScript==

function showImagePreview(){
	var idParts = /n=([^&]+)&p=([^&]+)/.exec(this.href);
	currentLinkId = idParts[1]+'_'+idParts[2];
	currentActiveLink=this;
	currentActiveLink.style.cursor='wait';
	imgOverlay.style.display='none';
	var imgSrc=null;
	if(usePersistence && GM_getValue && GM_getValue('im_'+currentLinkId)!=null)
		imgSrc=GM_getValue('im_'+currentTorrentId);
	else if(imUrlCache[currentLinkId]!=null)
		imgSrc=imUrlCache[currentLinkId];
	loadPage(this.href);
	/*
	if(imgSrc==null || !(/(pics\.cheggit\.nl)/.exec(imgSrc)) || (/[^\s^'^"^>^\)]/.exec(imgSrc))){
		loadPage(this.href);
	}
	else{
		loadImage(imgSrc);
	}
	*/
}

function hideImagePreview(){
	//currentTorrentId=null;
	currentActiveLink.style.cursor='auto';
	imgOverlay.style.display='none';
	xhr.abort();
}

function loadPage(pageUrl){
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			parsePage(xhr.responseText);
		}
	}
	xhr.open("GET",pageUrl,true);
	xhr.send(null);
}

function parsePage(pageHtml){
	var imgSrc=null;
	var matches=/<img.+src="(\/forum\/[^"]+)"/.exec(pageHtml);
	if(!matches){
		return;
	}
	if(matches && matches.length>0){
		var imgUrlParts=matches[1].split('/');
		var imgName=imgUrlParts[imgUrlParts.length-1];
		if(imgName.substr(0,1)=='t') imgName=imgName.substr(1);
		imgUrlParts[imgUrlParts.length-1]=imgName;
		imgSrc=imgUrlParts.join('/');
		imgSrc=imgSrc.split('s.jpg').join('.jpg');
		imUrlCache[currentTorrentId]=imgSrc;
		if(usePersistence && GM_setValue){
			GM_setValue('im_'+currentTorrentId, imgSrc);
			//alert('set im_'+currentTorrentId+': '+imgSrc);
		}
		loadImage(imgSrc);
	}
	else{
		currentActiveLink.style.cursor='auto';
	}
	showTorrentInfo(currentActiveLink, currentTorrentId, sharedTxt, imgSrc);
}

function showTorrentInfo(a, torrentId, sharedTxt, imgUrl){
	var pTag=a.parentNode.tagName;
	if(pTag!='LI'){
		if(donePreviewLinks[torrentId]==null && imgUrl!=null){
			var aElt=document.createElement('a');
			aElt.style.fontSize='10px';
			aElt.style.fontFamily='Arial,Helvetica,sans-serif';
			aElt.href = imgUrl;
			aElt.target = "_blank";
			aElt.innerHTML = " [ image &raquo; ] ";
			a.parentNode.insertBefore(aElt, a.nextSibling);
			donePreviewLinks[torrentId]=true;
		}
		if(doneDates[torrentId]==null){
			var spanElt=document.createElement('span');
			spanElt.style.fontSize='10px';
			spanElt.style.fontFamily='Arial,Helvetica,sans-serif';
			spanElt.innerHTML = " [ "+sharedTxt+" ] ";
			a.parentNode.insertBefore(spanElt, a.nextSibling);
			doneDates[torrentId]=true;
		}
	}
}

function loadImage(imgSrc){
	im.addEventListener('load', function(){showImage(imgSrc)}, true);
	im.src = imgSrc;
}

function showImage(imgSrc){
	var w=im.width;
	var h=im.height;
	if(h > window.innerHeight){
		w=Math.round(w*window.innerHeight/h);
		h=window.innerHeight;
	}
	if(w > window.innerWidth/3){
		h=Math.round(h*(window.innerWidth/3)/w);
		w=window.innerWidth/3;
	}
	imgOverlay.style.top=(window.pageYOffset)+"px";
	imgOverlay.style.left=(window.innerWidth-w-20)+"px";
	imgOverlay.innerHTML = '<img src="'+imgSrc+'" width="'+w+'" height="'+h+'">';
	imgOverlay.style.display='block';
	currentActiveLink.style.cursor='auto';
}

function initLinks(){
	var as = document.getElementsByTagName('a');
	for (var i=0; i<as.length; i++)
	{
		var a = as[i];
		var matches = /liste_art\.asp\?n=([^&]+)&p=([^&]+)/.exec(a.href);
		if(matches && matches.length > 1){
			var linkId = matches[1]+'_'+matches[2];
			a.addEventListener('mouseover', showImagePreview, true);
			a.addEventListener('mouseout', hideImagePreview, true);
			a.addEventListener('click', hideImagePreview, true);
		}
	}
}

function init(){
	var overElt = document.createElement('DIV');
	overElt.style.position = 'absolute';
	overElt.style.left = '0px';
	overElt.style.top = '0px';
	overElt.style.zIndex = 1532;
	overElt.style.display = 'none';
	imgOverlay = document.body.appendChild(overElt);
	initLinks();
}

var usePersistence=true;
var currentActiveLink;
var currentTorrentId;
var im=new Image();
var imUrlCache={};
var xhr=new XMLHttpRequest();
var imgOverlay;
var busy=false;
var doneDates={};
var donePreviewLinks={};

init();