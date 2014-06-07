// ==UserScript==
// @name           TGP URL Transformer
// @namespace      hehe
// @description    Transform target URL of TGP pages
// @include        http://*.ucgalleries.com/*
// ==/UserScript==

var TGPURLTransformer = function () {

    var transformers = [];
    
    return {
        register: function (f) {
            transformers.push(f);
        },
        transform: function () {
            var links = document.links;
	        for (var i = 0; i < links.length; i++ ) {
		        try {
            		var link = links[i];
            		
            		//find inner img
            		var image = null;
            		for (var k = 0; k < link.childNodes.length; k ++) {
            		    var child = link.childNodes[k];
            		    if (child.src) {
            		        image = child;
            		        break;
            		    }
            		}
            		
            		var href = link.href;
            		var thumbUrl = image ? image.src : null;
            		var pageUrl = window.location.href;
            		
            		var newHref = null;
            		for (var j = 0; j < transformers.length; j ++) {
            		    var transformer = transformers[j];
            		    
            		    try {
            		        newHref = transformer(href, thumbUrl, pageUrl);
            		        if (newHref) break;
            		    } catch (e) {
            		        dump("error: " + e + "\n");
            		    }
            		}
            		
            		if (newHref) {
            		    link.href = newHref;
            		}
		
		        } catch (e) {
		        }
	        }
        }
    };

}();


/*
TGPURLTransformer.register(function (href, thumbUrl, pageUrl) { //ImageFap direct linking
    if (thumbUrl.indexOf("/images/thumb/")) return thumbUrl.replace(/thumb/, "full");
});
*/

TGPURLTransformer.register(function (href, thumbUrl, pageUrl) { //ImageFap direct linking
    if (!thumbUrl) return null;
    if (thumbUrl.match(/^.*imageupper\.com\/[0-9]*_t\/.*$/)) {
        var newHref = thumbUrl.replace(/_t/, "");
        return newHref;
    }
});
TGPURLTransformer.register(function (href, thumbUrl, pageUrl) { //ImageFap direct linking
    if (!thumbUrl) return null;
    if (thumbUrl.match(/^.*imageshost\.ru\/[0-9a-z\/]*\/t\/.*$/)) {
        var newHref = thumbUrl.replace(/\/t/, "/");
        return newHref;
    }
});

/*
TGPURLTransformer.register(function (href, thumbUrl, pageUrl) {
});
*/



TGPURLTransformer.transform();


