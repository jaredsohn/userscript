// ==UserScript==
// @name           Find Similar
// @namespace      
// @description	   Link images to find similar images on google image search 
// @include        http://*
// @exclude        http://*.google.tld/*
// ==/UserScript==

for (var i = document.images.length - 1; i >= 0; i--) {
    var elmImage = document.images[i];
    var usFilename = elmImage.src.split('/').pop(  );
    var elmLink = elmImage.parentNode;
    if (elmLink.nodeName != 'A') {
        var elmLink = document.createElement('a');
        elmLink.href = 'http://images.google.com/images?q=' +
            escape(usFilename);
        elmLink.title = 'Find images named ' + usFilename;        
        var elmNewImage = elmImage.cloneNode(false);
        elmLink.appendChild(elmNewImage);
        elmImage.parentNode.replaceChild(elmLink, elmImage);
    }
}