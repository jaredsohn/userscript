// Author: Blair Hayles
// Name: Direct Linker
// Version: 0.2.1
// Date Updated: 2005.08.08 (yyyy.mm.dd)
// Contact: blair d0t gh @  gmail d0t com
// Copyright Blair Hayles, 2005, All rights reserved.
//
// Changelog:
// 0.1 Initial version 
// 0.2 Added array for known sites
// 0.2.1 Removed copyright symbol to make gm's convert to unicode happy
//
//
// ==UserScript==
// @name        Direct Linker
// @namespace   http://www.geocities.com/blair_g_h/
// @description Makes thumbnails point to their full images, rather than an intermediate page. NB requires settings to be edited. 
// ==/UserScript==

//TODO Loop all children and test for images possibly?
//TODO Handle regular expressions for tn....diff's
//TODO Have array use regex? 
//TODO allow additions aka im....diff's to be added to start or end (necessary?)
//TODO allow override/bypass of known sites?

(function() {

	var knownsites = new Array();

	/*
	 * To add sites, follow array needs to be indexed by the full path to the current index page for the thumbnails
	 * the attributes of the second array are, in order: part of thumnail name being replaced, part of the thumbnail name being replaced,
	 * the replacement string from the image name, the replacement string from the image path.
	 *
	 * For example given an image with the location http://www.asite/img/a_full.jpg
	 * and a thumbnail with the location http://www.asite/tn/a_tn.jpg
	 * the array addition would look like: knownsites['http://www.asite/'] = ['_tn', 'tn/', '_full', 'img/'];
	 * NB the array identifier, in the example http://www.asite/ needs to be the exact path to the index of images,
	 * to make sure it is correct, you can uncomment the alert several lines below this, to show the url required.
	 */

	//template for known sites array
	//knownsites['']= ['', '','',''];
	

	/*
	 * find the absolute path to the current page
	 * eg for the page http://www.test.com/test2/test3.html the result is http://www.test.com/test2/
	 */
	var urlend = (document.location.toString()).lastIndexOf('/');
	var url = (document.location.toString()).substring(0, urlend+1);

	//uncomment this to show the url that is currently trying to be matched.
	//alert(url);

	if(knownsites[url] != null){
		var tnnamediff = knownsites[url][0];
		var tnpathdiff = knownsites[url][1];
		var imnamediff = knownsites[url][2];
		var impathdiff = knownsites[url][3];
		
	
		//loop through all links
		for (var i=0; i<document.links.length; i++) {
	
			var link = document.links[i];
			if(link.hasChildNodes()){
	
				//take the first child of a link and test to make sure it is actually the object we are after
				var im = link.firstChild;
				if(im.nodeValue == Node.ELEMENTNODE){
					if(im.hasAttribute('src')){
						var finalpath = '';
						var finalname = '';
						var tnpath = im.getAttribute('src');
					
						//find last '/' for tn name and path
						var tnend = tnpath.lastIndexOf('/');
			
						//name of thumnail
						var tnname = tnpath.substring(tnend+1);
			
						//path to thumbnail (may be relative)
						tnpath = tnpath.substring(0, tnend + 1);
			
						//test to see if path is relative
						if(tnpath.lastIndexOf('http://') < 0 || tnpath.lastIndexOf('www.') < 0){
							//make absolute path to thumbnail
							tnpath = url + tnpath
						} //end for
					
						//split tnname around tnnamediff
						var tnnamearray = tnname.split(tnnamediff);	
			
						//concatenate imnamediff after each substring (assumes that tnnamediff is always replaced with imnamediff)
						for(var j=0; j<tnnamearray.length; j++){
							finalname += tnnamearray[j] + imnamediff;
						} //end for
			
						//are we just concatenating impathdiff to the end of tnpath, or are we replacing tnpathdiff with impathdiff
						if(tnpathdiff == ''){
							finalpath = tnpath + impathdiff;
						} else {
							//split tnpath around tnpathdiff
							var tnpatharray = tnpath.split(tnpathdiff);
			
							//concatenate impathdiff after each substring (assumes that tnpathdiff is always replaced with impathdiff)
							for(var j=0; j<tnpatharray.length; j++){
								//split can give empty strings if the split item is at the end of the string
								if(tnpatharray[j] != ''){
									finalpath += tnpatharray[j] + impathdiff;
								} //end if
							} //end for
						} //end else
			
						//concatenate the final path and name together and replace the current href with the new one.
						link.href=finalpath + finalname;
					} //end if
				} //end if
			} //end if
		} //end for
	}//end if
})();