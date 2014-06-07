// ==UserScript==
// @name           GLB Text to Image
// @namespace      GLB Text to Image 
// @author         wat
// @description    Makes text links to images on GLB forums
// @include         http://goallineblitz.com/game/forum_thread_list.pl?forum_id=*
// @include         http://goallineblitz.com/*
// ==/UserScript==
//pick out only the links that end in JPG|PNG|GIF 

 var imageLinks = document.evaluate( "//a[translate(substring(@href,string-length()-2),'JPG','jpg')='jpg'] | //a[translate(substring(@href,string-length()-2),'GIF','gif')='gif'] |//a[translate(substring(@href,string-length()-2),'PNG','png')='png']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
 for(var i = 0; i < imageLinks.snapshotLength; i++) {
	 var link = imageLinks.snapshotItem(i);
	 var target = link.getAttribute("href");
	 //create new image element
	 var newImg = document.createElement("img");
	 newImg.src = target;
	 newImg.setAttribute('style', 'border-style: none; max-width: 100%; min-width: 10px; min-height: 10px; ');
	 newImg.setAttribute('alt', target);
	 //remove link text
	 link.innerHTML="";
	 //put in link image
	 link.appendChild(newImg);
 }
