// ==UserScript==
// @name          pornCrapFilter++
// @namespace     http://example.com/userscripts/
// @description	  Filter porn sites to only list the interesting stuff (images and/or videos)
//								Only displays images that link to other images.
//                Requires the page be visited with the #pornCrapFilter anchor
//                If used in conjunction with hunFilter or sublimeFilter, this is added automatically.
//                Thanks to the original pornCrapFilter author (ydant)
// @include       http://*/*#pornCrapFilter
// @exclude       http://*.thehun.*/*
// ==/UserScript==


(function() {
	const IMAGENODE 		= 1;
    
    var displayImage = true;
    var displayVideo = true;
    
    var showInline = false; // False = Thumbnail link, true = big image
    
    var showOriginalLink = true; // Will show the "Original Website" link at the bottom of the page
    
	var goodPage = '<html><head><title></title></head><body>';

	// good images are images linked to other images
	// ie, we're looking for thumbnails
	var lnks = document.getElementsByTagName("a");

	for ( var i = 0, lnk; lnk = lnks[i]; i++ ) {
		var good = false;
		var href = lnk.getAttribute("href");
		
        if(!href) {
            continue;
        }
        
        // TODO: Use regexp for fileextension
        // TODO: Insert with DOM instead
        
        // Test for image
		if ( href.toLowerCase().indexOf("jpg") != -1
            || href.toLowerCase().indexOf("jpeg") != -1 ) {
			// does it contain an image?
			for ( var j = 0, child; child = lnks[i].childNodes[j]; j++ ) {
				if ( child.nodeType == IMAGENODE ) {
                    
                    var src = child.getAttribute("src");                   
                    
                    if(showInline) {
                        goodPage += '<img src="'+href+'" alt="" /><br />';
                    }
                    else {
                        
                        goodPage += "<a href='"+href+"'><img src='"+src+"'></a>";
                    }
//					GM_log(href + " - " + src);
				}
			}
		}
        // Test for video. Add any other possible extension (like .asx) if needed.
        if ( href.toLowerCase().indexOf("wmv") != -1 ||  
            href.toLowerCase().indexOf("mpg") != -1 ||  
            href.toLowerCase().indexOf("mpeg") != -1 ||  
            href.toLowerCase().indexOf("avi") != -1 ||
            href.toLowerCase().indexOf("asf") != -1 ) {
            // Show the thumbnail with a link to the video (never show those inline...)
            for ( var j = 0, child; child = lnks[i].childNodes[j]; j++ ) {
				if ( child.nodeType == IMAGENODE ) {
					var src = child.getAttribute("src");
					goodPage += "<a href='"+href+"'><img src='"+src+"' style='border:4px dotted blue'></a>";
//					GM_log(href + " - " + src);
				}
			}
        }
	}
    
    // Add a link so it's possible to see the "original" page
    if(showOriginalLink) {
        var winloc = window.location.toString();
        goodPage += '<p><a href="'+winloc.substring(0, winloc.indexOf("#pornCrapFilter"))+'">View Original Page</a></p>';
    }
    
    goodPage += '</body></html>';

    document.body.innerHTML = goodPage;

})();
