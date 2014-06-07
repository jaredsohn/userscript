// ==UserScript==
// @name       		FlickrPoolDrops
// @author		Ryan Gallagher (http://www.flickr.com/photos/clickykbd)
// @date		06/18/13
// @namespace  		http://www.ryangallagher.name
// @version    		0.3
// @modified 		June 18, 2013
// @description		On Flickr, Add links to the pools on the group list page.  (In the form of a silly water droplet sprite). ;-)
// @copyright		Copyright (c) 2013, Ryan Gallagher <http://mailhide.recaptcha.net/d?k=01s3QDaQrXNmFOMTttoahPPg==&c=45a75vsPJHUAbaWaf7hEep0XEaP0u0DkmwFiSB8MBeM=>
// @downloadURL		https://userscripts.org/scripts/source/171245.user.js
// @updateURL		https://userscripts.org/scripts/source/171245.meta.js

// @include      	http://*.flickr.*/groups
// @match      		http://*.flickr.*/groups/
// @match      		http://*.flickr.*/groups
// @run-at		document-end
// ==/UserScript==

//
// ChangeLog
//
//  v0.1 - initial
//  v0.3 - added a match, was not catching all nav links to that page.
//

// wrapper function
(function() {
    //alert('Running PoolDrops...');
    
    // img uri for droplet sprite.
    var dropImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAMAAABFNRROAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEVQTFRF0u35u+T3zOv54/X6qt31tOH2ccbshM3v8vr+ldXw3vL7+f3+T7fn7Pj9xej4jNDwwOb3/f7/6fb8z+z1EZ7e2PD6////ZU4l6AAAABd0Uk5T/////////////////////////////wDmQOZeAAAAaklEQVR42kzNSxLDIAwDUNvEAQyYT0Luf9Q2Ju1EC2neSnBZuNuA9TjpJX/m9BfknNtPKcZaY3jEh2PedGnsR8PWuJhw35AAFEzRs4II6FJFklImmfQrF8IUU0ImGU76eugC091310eAAQDmigod89QZewAAAABJRU5ErkJggg==';
	
    // get all the group links
    var xp = '//a[@data-track="group-link"]';
	var xpr = document.evaluate(xp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (xpr.snapshotLength < 1) return false; // no groups? whoops?
    
    // append the link nodes for all gorup link parents.
    for (i = 0; i < xpr.snapshotLength; i++) {
        g = xpr.snapshotItem(i);
        
        img = document.createElement('img');
    	img.src = dropImg;
    	img.setAttribute('width', '13');
    	img.setAttribute('height', '13');
    	img.setAttribute('class', 'absmiddle');  
    
    	ln = document.createElement('a');
    	ln.appendChild(img);
    	ln.setAttribute('alt', 'Dive in and get wet...');
        ln.setAttribute('class', 'FlickrPoolDrops');
        
        ln.setAttribute('href', g.href + 'pool/');
        g.parentNode.appendChild(ln);
	}
    
    return;
})();