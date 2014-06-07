// ==UserScript==
// @name       Magnet Links
// @version    0.2
// @description  Convert links with BT hash into magnet links.
//
// @match    https://torrentz.eu/*
// ==/UserScript==
//Get all the links in the page.
links=document.getElementsByTagName("a");
for(var i = 0; i < links.length; i++) {
    //Look for 40 character HEX encoded SHA1
    btinfo = links[i].href.match(/([a-f0-9]){40}/i);    
    if(btinfo != null) {
        newlink = 'magnet:?tr=dht://&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.publicbt.com:80&xt=urn:btih:'+btinfo[0]
        //Replace the original link with a magnet URI.
        links[i].href = newlink;
    }
}