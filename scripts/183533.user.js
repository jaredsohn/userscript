// ==UserScript==
// @name		  TP.org
// @namespace	  http://userscripts.org/users/130612
// @description   Direct image display
// @match         http://*.teenplanet.org/*
// @version       0.5
// ==/UserScript==

if (document.location.href.indexOf("photos.teenplanet.org") >= 0){
    function toArray(nl) {
        for(var a=[], l=nl.length; l--; a[l]=nl[l]);
        return a;
    }
    
    var links = document.getElementsByClassName('thumb-box');
    for (var tbi = 0;tbi<links.length;tbi++){
        var linkElem = links[tbi];
        var imgElem = linkElem.getElementsByTagName('img')[0];
        var aElem = linkElem.getElementsByTagName('a')[0];
        var link = aElem.href;
        
        // load the file 
        var xhr = new XMLHttpRequest();
        xhr.targetElem = aElem;
        xhr.targetImg = imgElem;
        xhr.onreadystatechange = function() { 
            if (this.readyState == 4){
                // create a 'div' element to wrap it
                var elem = document.createElement('div');
                // inject the file in the div
                elem.innerHTML = this.responseText;
                
                var divs = elem.getElementsByTagName('div');
                var arr = toArray(divs);
                var arrFiltered = arr.filter(function(el){ 
                    return el && el.id == "full-size";
                });
                
                var fullImg = arrFiltered[0].getElementsByTagName('a')[0].href;
                
                this.targetElem.href = fullImg;
                this.targetImg.src = fullImg;
            }
        };
        xhr.open( "GET", link, true ); 
        xhr.send(); 
    }
}
else if (document.location.href.indexOf("www.teenplanet.org/images") >= 0){
    var basePath = document.location.href.substr(0, document.location.href.indexOf("index.html")) + "images/";
    var images = document.querySelectorAll("div.thumbnail img");
    for(var i = 0; i < images.length; i++){
        var image = images[i];
        var imagePath = basePath + image.alt;
        image.parentNode.href = imagePath;
    }
}