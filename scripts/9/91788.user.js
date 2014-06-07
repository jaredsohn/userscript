// ==UserScript==
// @name           directGel
// @namespace      peonza
// @description    direct link to all gelbooru/danbooru images
// @include        http://gelbooru.com/*
// @include        http://danbooru.donmai.us/*
// @version        0.2
// @require        http://sizzlemctwizzle.com/updater.php?id=91788
// ==/UserScript==

try {

  if(document.domain=="danbooru.donmai.us") {
    var elementos = document.getElementsByTagName("span");
    
    for(x in elementos) {
    
      // Selecting only the thumbnails
      if(elementos[x].className=="thumb") {
      
        // Obtaining the final URL of the image
        var dir = elementos[x].childNodes[1].childNodes[1].src;
        dir =  "http://danbooru.donmai.us/data/" + dir.split('preview/')[1];
        
        // Setting the new href
        elementos[x].childNodes[1].href = dir;
        
      }
    }
  }
  else if(document.domain=="gelbooru.com") {
    var elementos = document.getElementsByTagName("span");

    for(x in elementos) {
    
      // Selecting only the thumbnails
      if(elementos[x].className=="thumb") {
      
        // Obtaining the final URL of the image
        var dir = elementos[x].firstChild.firstChild.getAttribute('src');
        dir = dir.split('?')[0].split("thumbs")[1].replace("thumbnail_","");
        dir = "http://img4.gelbooru.com//images/" + dir;
        
        // Setting the new href
        elementos[x].firstChild.href = dir;
        
      }
    }
  }
} catch (err) {
  alert("error");
}