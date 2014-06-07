
// ==UserScript==
// @name          Freesoccer - Scroll to the match 
// @namespace     http://browseimages.mozdev.org/
// @description   Scrolls to the clicked match
// @include       http://*freesoccer.us/matches*
//                http://www.freesoccer.us/home.html
// ==/UserScript==

if(document.URL.search(/#/) == -1) {
    
    var link = new Array();
    
    for(var i = 0; i < document.links.length; i++) {
        
        if(document.links[i].href.search(/http:\/\/.*freesoccer\.us\/matches\/.*\//) > -1) {
            
            if(isNaN(link[document.links[i]]))
                link[document.links[i]] = 1;
            
            document.links[i].href += "#" + link[document.links[i]]++;
        }
    }
} else {
    
    var imgNo = 0;
    
    for(var i = 0; i < document.images.length; i++) {
        
        if(document.images[i].src.search(/matchhead\.gif/) > -1) {
            
            imgNo++;
            
            if("#" + imgNo == document.URL.match(/#\d+/)[0]) {
               
               var a = document.createElement("a");
               a.name = imgNo;
               document.images[i].parentNode.appendChild(a);
               window.location.href = document.URL; //scrolls 
            }
        }
    }
}
