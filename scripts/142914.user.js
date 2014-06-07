// ==UserScript==
// @name           Gelbooru Thumb to Image
// @namespace      Zendillo
// @description    Update of peonza's directGel which works in conjunction with DownloadThemAll!
// @include        http://gelbooru.com/*
// @version        0.1
// ==/UserScript==

    var elementos = document.getElementsByTagName("span");

    for(x in elementos) {
    
      // Selecting only the thumbnails
      if(elementos[x].className=="thumb") {
      
        // Obtaining the final URL of the image
        var dir = elementos[x].firstChild.firstChild.getAttribute('src');
        dir = dir.split('?')[0].replace("http://g","http://cdn1.g").replace("thumbs","images").replace("thumbnail_","");

        // Setting the new href
        elementos[x].firstChild.href = dir;
        
      }
    }
 
