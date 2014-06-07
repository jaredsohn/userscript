// ==UserScript==
// @name           Gelbooru Direct Image Link
// @namespace      BigEndian
// @description    This is a modified version of Zendillo's Gelbooru Thumb to Image script, which instead places a direct link to the image under the thumbnail, so you can still view the image's comments by clicking on the thumbnail.
// @include        http://gelbooru.com/*
// @include        http://www.gelbooru.com/*
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
        direct_link = document.createElement('a');
        direct_link.setAttribute('href', dir);
        direct_link.setAttribute('style', 'display: block; text-align: center;');
        direct_link.innerHTML = "Direct Link";
        elementos[x].appendChild(direct_link);
        //elementos[x].firstChild.href = dir;
        
      }
    }
 
