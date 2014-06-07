// ==UserScript==
// @name Flickr CC Attribution Helper
// @version 0.810
// @namespace http://cogdogblog.com/code/
// @description Generate attributed Flickr for creative commons images
// @include http://www.flickr.com/photos/*/*
// @include http://flickr.com/photos/*/*
// @exclude http://www.flickr.com/photos/*/*#preview
// @exclude http://flickr.com/photos/*/*#preview
// @grant       none
// ==/UserScript==

console.log('This script grants no special privileges, so it runs without security limitations.');


/*

This script generates a creative commons attributed photo link in a text box (both in HTML for blog posts and text) on every Flickr photo page you visit that has CC license applied. Based on original Flickr CC Photo Link by saipal

v 0.1 	2009-05-17 Original release
b 0.2 	2009-05-20 Placed in privacy area, now with 
      	HTML for medium sized img and link to source,
      	field now is selected when clicked
v 0.2b	2009-05-20 Fixed to get 500px image size
v 0.3   2009-08-03 Added a second field for plain text attribution
v 0.4   2010-06-25 Updated for new flickr layout
v 0.5	2011-02-09 Added code to insert license types into output, thanks
        to suggestion by Seccubus (http://userscripts.org/users/273995)
        Also fixed issue for missing placement by inserting after
        License ID
v 0.51	2012-04-17 Adjust license types to echo "SA" instead of flickr's myserious "SD"
		for Share-Alike
v 0.53	2012-02-05 Fixed placement of insert for photos where tags not allowed 
		(now places below additional info, on all pages)
v 0.6	2012-02-14 Looks like flickr changed divs, so new test for div for Owner Settings if
		it fails to find one for License Info. 
v 0.700	2013-04-29 Flickr changed its tempate again, so a new Xpath search for th proper div/class to place
v 0.710	2013-05-13 Better placement of output to hang from div id=sidecard
v 0.800 2013-05-21 Oi! Flickr changes their layout again, find new div to hang the info
v 0.810 2013-05-24 Fixed issue with fetching user name
*/

(function () {
	
	// test for cc attribution by the span in the tag div
	var iscc = document.evaluate("//span[@class='ccIcn ccIcnSmall']",
			document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
			null).singleNodeValue;
		
	if(iscc) {
	
		// get the location to insert the new content after, we will hang it after
       // the maain sidebar div (id=sidecar)
	
	 	var	liscP = document.evaluate("//div[@id='sidebar']",
                       document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
                       null).singleNodeValue;
		
		if (!liscP) {                  
		   // get the location to insert the new content after, we will hang it after
		   // the maain sidebar div (id=sidecar and class=wide-sidebar)
			 
			var	liscP = document.evaluate("//div[@id='sidebar' AND @class='wide-sidebar']",
						   document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
						   null).singleNodeValue;
        }
                     
     
                              
        if (liscP) {

			// link for medium sized image
			photosrc = document.evaluate("//link[@rel='image_src']/@href",
				document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
				null).singleNodeValue.textContent.replace('_m', '');
	
			   
			// title of photo
			var phototitle = document.evaluate("//h1",
				document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
				null).singleNodeValue.innerHTML;		
			
			   
			// get the div that contains user info              
			widget = document.evaluate("//div[@id='photo-story']",
				document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
				null).singleNodeValue;
			
			userstream = /href="(\S+)"/.exec(widget.innerHTML)[1];	
			
			photoid = document.location.href.split('/')[5];
			photolink = 'http://flickr.com' + userstream + photoid + '/';
			userlink ='http://flickr.com' + userstream.replace(/\/photos\//,'/people/');

			// get the link inside the span that contains photo owners name             
			ownername = document.evaluate("//span[@class='photo-name-line-1']/a/text()",
				document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,
				null).singleNodeValue;
			
			// trim white space for user's name
			uname = ownername.textContent.trim();
			
			// get license type (code by Sessubus)
			
			var cc_lic = ""; 
			
			var attr = document.evaluate("//img[@class='f-sprite fs-cc_icon_attribution_small']", 
			document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, 
			null).singleNodeValue; 
			
			var nocomm = document.evaluate("//img[@class='f-sprite fs-cc_icon_noncomm_small']", 
			document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, 
			null).singleNodeValue; 
			
			var noderr = document.evaluate("//img[@class='f-sprite fs-cc_icon_noderivs_small']", 
			document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, 
			null).singleNodeValue; 
			
			var sa = document.evaluate("//img[@class='f-sprite fs-cc_icon_sharealike_small']", 
			document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, 
			null).singleNodeValue; 
			
			if (attr) { 
				cc_lic = cc_lic + "BY "; 
			} 
			if (nocomm) { 
				cc_lic = cc_lic + "NC "; 
			} 
			if (noderr) { 
				cc_lic = cc_lic + "ND "; 
			} else if (sa) { 
				cc_lic = cc_lic + "SA "; 
			} 
			
			var div_attrib = document.createElement('div');
			
			// create content to insert to page
			div_attrib.innerHTML = '<p>&nbsp;</p><h4>CC Attribution Helper</h4>Attribution (HTML)<br /><textarea rows="5" onClick="this.select()" name="ccattweb" style="width:100%"><a title="' + phototitle + '" href="' + photolink + '"><img src="' + photosrc + '" /></a><br /><small><a title="' + phototitle + '" href="' + photolink + '">cc licensed ( ' + cc_lic +')  flickr photo</a> shared by <a href="' + userlink + '">' + uname + '</a></small></textarea><br />Attribution (text)<br /><textarea rows="2" onClick="this.select()" name="ccatttxt" style="width:100%">cc licensed ( ' + cc_lic + ') flickr photo by ' + uname + ': ' + photolink + '</textarea>';
			

			liscP.appendChild(div_attrib);
	
		}
	}
})();