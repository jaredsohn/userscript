// ==UserScript==
// @name           DZ.com Attachment Image Inliner
// @namespace      userscripts.org
// @description    Automatically displays images in attachments on DZ.com
// @include        http://www.dropzone.com/cgi-bin/forum/gforum.cgi*
// ==/UserScript==
//pick out only the links that end in JPG|PNG|GIF using XPaths (bloody XPaths 1.0 makes this a pain)
 // var imageLinks = document.evaluate( "//a[translate(substring(@href,string-length()-2),'JPG','jpg')='jpg'] | //a[translate(substring(@href,string-length()-2),'GIF','gif')='gif'] |//a[translate(substring(@href,string-length()-2),'PNG','png')='png']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
 //var imageLinks = document.evaluate( "//a[contains(@href,'dropzone.com//cgi-bin//forum//gforum.cgi?do=post_attachment')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
 var imageLinks = document.evaluate( "//a[contains(@href,'?do=post_attachment')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
 for(var i = 0; i < imageLinks.snapshotLength; i++) {
	 var link = imageLinks.snapshotItem(i);
	 var text = link.text.toUpperCase();
	 if ((text.indexOf('.JPG')>0) | (text.indexOf('.PNG')>0) | (text.indexOf('.GIF')>0))
	 {
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
 }