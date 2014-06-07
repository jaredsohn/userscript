// ==UserScript==
// @name           flickr_pic_urls
// @namespace      flick_pic_urls
// @description    shows urls to the pics
// @include        http://www.flickr.com/*
// @version        0.1.4
// ==/UserScript==
  
    
    var pic = document.getElementById("main-photo-container");
    var temp = pic.children[1].innerHTML.split("=");
    var replaceMe = new RegExp("\"","g");
    var temp2 = temp[1].replace(replaceMe, "");
    var urlOut = temp2.split(" ")[0]
    
    var out = document.getElementById("meta");
    
    var link = document.createElement("a");
    link.setAttribute("href", urlOut);
    var text = document.createTextNode(urlOut);
    link.appendChild(text);
    out.insertBefore(link, out.firstChild); //insert link under the picture