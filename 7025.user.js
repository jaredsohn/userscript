// ==UserScript== 
// @name          Flickr Bigger Quicker
// @description	  Adds a 'big' link under each photo in any Detail view which goes directly to fd Flickr Toy's "View On Black" script. Easily customizable to link to whatever external tool you use frequently. v0.2
// @namespace     http://www.carranza-collective/software
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// Based upon the original by Fabricio Zuardi (http://www.mamata.com.br/greasemonkey/)
// By Joel Carranza http://carranza-collective.com/wordpress/joel/software/
// Licensed under GPL (http://www.gnu.org/copyleft/gpl.html)
// ==/UserScript==

(function() {
	/**
	 * Customize the below array to modify the links generated
	 *
	 * photoid - id of photo
	 * username - flickr user who took photo
	 */
	var flickrToolLinks = [
		// [link name, url, link target (optional)]
		['big','http://bighugelabs.com/flickr/onblack.php?id=${photoid}&size=Large','view'],
//		['white','http://bighugelabs.com/flickr/onwhite.php?id=${photoid}&size=Large','view']
	];
	
	//if a photo page
//	if (document.getElementById("button_bar")) {
	function getElementsByClass(searchClass,node,tag) {
		var classElements = new Array();
		if ( node == null )
		node = document;
		if ( tag == null )
		tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	}
		
	var alertMsg = true;
	
	function createLink(context, url) {

		var m = url.match(/\$\{(\w+)\}/);
		if(m)
		{
			if(context[m[1]])
			{
				var left = RegExp.leftContext;
				var center = context[m[1]];
				var right = createLink(context,RegExp.rightContext);
				return right != null ? left+center+right : null;
			} 
			return null;
		}
		return url;
	}
	var links = getElementsByClass('Activity',window.document,'P');
	if(links.length == 0)
		links = getElementsByClass('RecentPhotos',window.document,'P');
	if(links.length == 0)
		links = getElementsByClass('StreamList',window.document,'P');
	
	
	for(var i=0;i<links.length;++i)
	{
		var link = links[i];		
		var context = new Array();
	
		var photolinks = link.getElementsByTagName('A');
		if(photolinks.length > 0) {
		
			var photopage = photolinks[0].getAttribute('href');			
			var match = photopage.match('/photos/(\\w+)/(\\d+)/');
			if(match)
			{
				context['username'] = match[1];
				context['photoid'] = match[2];
			}
			
			for(var j=0;j<flickrToolLinks.length;++j)
			{
				var href = createLink(context,flickrToolLinks[j][1]);
				if(href)
				{				
					link.appendChild(document.createTextNode(' / '));
					var a = document.createElement('A');
					a.setAttribute('href',href);
					a.setAttribute('class','Plain');
					if(flickrToolLinks[j].length > 2)
						a.setAttribute('target',flickrToolLinks[j][2])
					a.innerHTML = flickrToolLinks[j][0];
					
					link.appendChild(a);
				}
			}
		}
	
	}
	
//	}//close if a photo page

})();