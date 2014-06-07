// ==UserScript==
// @name           cab.vn - meme fullsize viewer
// @namespace      http://cab.vn
// @description    View full size of meme images on cab.vn | (c) Crawler
// @include        http://cab.vn/*
// ==/UserScript==

var Imgs = document.getElementsByTagName('img');

// }
// var contentDiv = document.getElementsByClassName('post-content');
// for(i = 0; i < contentDiv.length; i++){
	// contentDiv[i].removeAttribute('class');
// }
function showContext(img, linkNode, mode){

	var htmlContext = '<div style="width:30px;height:30px;border:solid 1px #cccccc;background:#ff6600;display:block"></div>';
	var postContent = linkNode.parentNode;
	var postClass = postContent.parentNode;
	// go to post-info box
	var postInfo = postClass.getElementsByClassName('post-info');
	
	// add button to h1 tag
	var titleCab = postInfo[0].getElementsByTagName('h1');
	if(mode == 1){
		var aTag = document.createElement('a');
		aTag.setAttribute('href', img.src = img.src.replace('_resized', ''));
		aTag.setAttribute('target', '_blank');
		// this line below is a virus? Bith please, just an image with base 64 encoded :D
		aTag.innerHTML = ' <img width="22" title="Xem ảnh lớn" src="data:image/png;base64,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" />';
		titleCab[0].appendChild(aTag);
	}
	else{
		var childImg;
		for(i = 0; i < titleCab.length; i++){
			childImg = titleCab[i].getElementsByTagName('img');
			titleCab[i].removeChild(childImg[0]);
		}
	}
}
for (i = 0; i < Imgs.length; i++){
	if(Imgs[i].src.indexOf('_resized') != -1){
		showContext(Imgs[i], Imgs[i].parentNode, 1);
	}
	
}
