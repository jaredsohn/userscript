// ==UserScript==
// @name       Stackoverflow Relocator
// @namespace  http://teleport-heisenbug.rhcloud.com/
// @version    0.1
// @description  Tamper all links for stackoverflow.com to its dedicated proxy site.
// @match      *://*.google.com.*/*
// @match      *://teleport-heisenbug.rhcloud.com/*
// @copyright  2013, Parker
// ==/UserScript==
var origin = "stackoverflow.com";
var proxy = "teleport-heisenbug.rhcloud.com";
// process <a/>
var links = document.links;
for(var i=0; i<links.length; i++) {
    var link = links[i];
    var newHref = link.href.replace(origin, proxy);
    if( newHref != link.href ){
        link.href = newHref;
    }
}
//process <img/>
var imgs = document.getElementsByTagName("img");
for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    var newsrc = img.src.replace(origin, proxy);
    if( newsrc != img.src ){
       img.src = newsrc;   
    }    
}