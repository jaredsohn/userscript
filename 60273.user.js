// ==UserScript==
// @name           Reddit NSFW Thumb Remover
// @namespace      Reddit
// @description    Removes not safe for work thumbnails from reddit.
// @include        http://www.reddit.com/r/pics*
// @include        http://reddit.com/r/pics*
// @include        http://pics.reddit.com*
// ==/UserScript==
	
	// go go gooo!!
	rnsfw_init();
	
	function rnsfw_init() {
		
		// get all the child elements of the site table
		var siteTable = document.getElementById("siteTable");
		var divAll = siteTable.childNodes;
		
		for(i=0; i<=divAll.length; i++) {
			
			// make sure it's a posted item
			if(divAll[i].className.indexOf("thing") >= 0) {
				
				// get the title
				title = rnsfw_getTitle(divAll[i]);
				
				// check title for 'nsfw'
				if(title.toLowerCase().indexOf("nsfw") >= 0) {
				
					// get the thumbnail, and hide it
					rnsfw_getThumb(divAll[i]).style.display = 'none';
					
				}
				
			}
		}
		
	}
	
	function rnsfw_getTitle(e) {
	
		// grab all the 'anchor' elements
		anchors = e.getElementsByTagName("a");
		
		for(j=0; j<=anchors.length; j++) {
			
			// if this link is the title
			if(anchors[j].className.indexOf("title") >= 0) {
				
				// return the inner html (the actual title text)
				return anchors[j].innerHTML;
				
			}
		}
		
		return null;
	}
	
	
	function rnsfw_getThumb(e) {
		
		// grab all the 'anchor' elements
		anchors = e.getElementsByTagName("a");
		
		for(j=0; j<=anchors.length; j++) {
			
			// if it's linking to a thumbnail
			if(anchors[j].className.indexOf("thumbnail") >= 0) {
				
				// return the first child element (the thumbnail image object)
				return anchors[j].childNodes[0];
				
			}
		}
		
		return null;
		
	}
	