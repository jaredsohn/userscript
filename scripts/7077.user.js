// ==UserScript==
// @name          Flickr Discussion Images
// @namespace     http://carranza-collective/greasemonkey
// @description	  Allows you to view a flickr discussion thread with images only - Version 0.1
// @include       http://www.flickr.com/groups/*/discuss/*
// ==/UserScript==

/*
 	Script courtesy of Joel Carranza,
	joel.carranza@gmail.com
	http://www.carranza-collective.com/joel/software/flickr-discussion-images/
	Licensed under GPL (http://www.gnu.org/copyleft/gpl.html)
	
	Change Log
	----------
	0.1 - Initial Release (1/11/2007)
    
*/

function addGlobalStyle(css) {
    style = document.createElement('STYLE');
    style.type = 'text/css';
    style.innerHTML = css;
    document.body.appendChild(style);
}

addGlobalStyle(
" .TopicReplyImages img { margin: 3px; border: 1px solid rgb(153, 153, 153) }" +
" .TopicReplyThumbs img { margin: 10px; border: 1px solid rgb(153, 153, 153) }" + 
" .photoblock {  float:left ; width: 275px; height: 285px; text-align:center; }"
);


var load = function() {
	function scrollToElement(theElement){

	  var selectedPosX = 0;
	  var selectedPosY = 0;

	  while(theElement != null){
	    selectedPosX += theElement.offsetLeft;
	    selectedPosY += theElement.offsetTop;
	    theElement = theElement.offsetParent;
	  }

	 window.scrollTo(selectedPosX,selectedPosY);

	}
	
	function getElementByClass(searchClass,node,tag) {
		if ( node == null )
		node = document;
		if ( tag == null )
		tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
				return els[i];
			}
		}
		return null;
	}

	function imageClick(imgEl)
	{
		var src = this.getAttribute('o_src');
		showReplies();
		var discuss = document.getElementById('DiscussTopic');	
		var reply = getElementByClass('TopicReply',discuss,null);
		var els = reply.getElementsByTagName('IMG');
		for(var i=0;i<els.length;++i) 
			if(src == els[i].getAttribute('src'))
			{
				p = els[i];
				// find enclosing comment and display
				while(p != null && p.tagName != 'TR')
				 p = p.parentNode;
				if(p != null)
					scrollToElement(p);
				break;
			}
	}
	function showReplies()
	{

		var discuss = document.getElementById('DiscussTopic');
		getElementByClass('TopicReply',discuss,null).style.display = "block";
		var imagesEl = getElementByClass('TopicReplyImages',discuss,null);
		if(imagesEl)
			imagesEl.style.display = "none";

		var thumbsEl = getElementByClass('TopicReplyThumbs',discuss,null);
		if(thumbsEl)
			thumbsEl.style.display = "none";

		document.getElementById('fdiDiscussion').style.fontWeight = 'bolder';		
		document.getElementById('fdiThumbs').style.fontWeight = 'normal';
		document.getElementById('fdiImages').style.fontWeight = 'normal';		
		GM_setValue('displayMode','replies');
	}
	
	function createAuthor(el)
	{
		while(el != null && el.tagName != 'TD')
		 el = el.parentNode;
		if(el == null)
			return null;
		var alist = el.getElementsByTagName('A');	
		for(var i=0;i<alist.length;++i)
		{
			var a = alist[i];
			var href = a.getAttribute("href");
			if(href != null && href.match("/photos/[^/]+/"))
			{
				return a.cloneNode(true);
			}
		}
		return null;
	}
	
	function clean(el,tagName)
	{
		
	}
	function createCaption(el)
	{
		while(el != null && el.tagName != 'TD')
		 el = el.parentNode;
		if(el == null)
			return null;
		var slist = el.getElementsByTagName('SMALL');	
		if(slist.length == 0)
			return null;
		var ret = slist[0].cloneNode(true);
		// remove <I>edited this post</I>
		var el = ret.getElementsByTagName("I");
		if(el.length > 0)
			ret.removeChild(el[0]);
		// remove trailing BR
		var el = ret.getElementsByTagName("BR");
		if(el.length > 0)
			ret.removeChild(el[el.length-1]);
			
		return ret;
	}

	function showImages(thumb)
	{
		var discuss = document.getElementById('DiscussTopic');	
		var reply = getElementByClass('TopicReply',discuss,null);
		reply.style.display = "none";
		var className = thumb ? 'TopicReplyThumbs' : 'TopicReplyImages';
		var imagesEl = getElementByClass(className,discuss,null);
		if(imagesEl == null)
		{
			els = reply.getElementsByTagName('IMG');		
			var photoList = document.createElement('DIV');	
			photoList.setAttribute('class',className);
			discuss.insertBefore(photoList,reply);			
			var insert = 0;
			for(var i=0;i<els.length;++i) {
				var src = els[i].getAttribute('src');
				if(src != null && /_m\.jpg/.test(src))
				{		
					var img = els[i].cloneNode(true);
					if(thumb && /_[mos]\.jpg/.test(src)) { 
					img.setAttribute("o_src",src);
					img.setAttribute("src",src.replace(/_[mos]\.jpg/,"_s.jpg"));
			 		img.setAttribute("width","75");
					img.setAttribute("height","75");
					}
					else
					img.setAttribute("o_src",src);
					
					if(thumb)
						photoList.appendChild(img);
					else
					{
						var p = document.createElement('P');
						p.setAttribute("class","photoblock");
						var author = createAuthor(els[i]);	
						var caption = createCaption(els[i]);						
						if(author != null) {
							p.appendChild(author);
							p.appendChild(document.createTextNode(' says:'));
							p.appendChild(document.createElement('BR'));
						}
						p.appendChild(img);
						if(caption != null)
						{
							p.appendChild(document.createElement('BR'));						
							p.appendChild(caption);
						}
						photoList.appendChild(p);
						photoList.appendChild(document.createTextNode(' '));
			
					}
					img.addEventListener('click',imageClick,false);
				}

			}
			if(photoList.childNodes.length == 0)
				photoList.innerHTML = '<p><center>Sorry, No images found</center></p>';
			else
			{
				// TODO: append clear left
				var div = document.createElement("DIV");
				photoList.appendChild(div);
				div.style.clear = "left";
			}
			imagesEl = photoList;
		}
		imagesEl.style.display = "block";

		if(thumb) {
		var imagesEl = getElementByClass('TopicReplyImages',discuss,null);
		if(imagesEl)
			imagesEl.style.display = "none";
		}
		else {
		var thumbsEl = getElementByClass('TopicReplyThumbs',discuss,null);
		if(thumbsEl)
			thumbsEl.style.display = "none";
		}
		document.getElementById(thumb ? 'fdiThumbs' : 'fdiImages').style.fontWeight = 'bolder';
		document.getElementById(!thumb ? 'fdiThumbs' : 'fdiImages').style.fontWeight = 'normal';
		document.getElementById('fdiDiscussion').style.fontWeight = 'normal';
		
		GM_setValue('displayMode',thumb ? 'thumbs' : 'images');
	}

	function createLink(parent,text, f,arg,aid)
	{
		var a = document.createElement("A");
		a.setAttribute("href","");
		a.setAttribute("class","fdlink");
		a.setAttribute("id",aid);
	
		a.innerHTML = text;
		a.addEventListener('click', function(event) {
		 	f(arg);
		    event.stopPropagation();
		    event.preventDefault();
		}, true);
		parent.appendChild(a);
		return a;
	}
	
  	var discuss = document.getElementById('DiscussTopic');
	if(discuss == null)
		return;
	var reply = getElementByClass('TopicReply',discuss,null);
	if(reply == null)
		return;
	var insertLinks = discuss.getElementsByTagName('SMALL');
	if(insertLinks.length == 0)
		return;
	// insert links
	var l = createLink(insertLinks[0],'Discussion',showReplies,null,'fdiDiscussion');
	l.style.fontWeight = 'bold';
	insertLinks[0].appendChild(document.createTextNode(" | "));
	createLink(insertLinks[0],'Images Only',showImages,false,'fdiImages');
	insertLinks[0].appendChild(document.createTextNode(" | "));
	createLink(insertLinks[0],'Thumbs',showImages,true,'fdiThumbs');
//	insertLinks[0].appendChild(links,reply);
	
	var displayMode = GM_getValue('displayMode');
	if(displayMode == 'thumbs')
		showImages(true);
	else if(displayMode == 'images')
		showImages(false); 
			
}

load();