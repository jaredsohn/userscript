// ==UserScript==
// @name        Add a link in the listview on theoldreader.com
// @include     http://theoldreader.com/*
// @namespace   
// @version     1
// @grant       none
// ==/UserScript==
function updateLinks(){
    var posts = document.getElementsByClassName("post listview");
    for (var j=0; j<posts.length; ++j) {
        var url = posts[j].getAttribute("data-relative");
        var link = document.createElement('a');
        var linktext=document.createTextNode("GO")
        var area = posts[j].children[0].children[0];
        if (area.textContent.indexOf("GO") == -1){
            link.setAttribute('href', url);
            link.setAttribute('target', "_blank");
            link.appendChild(linktext);
            area.appendChild(link);
        }
    }
}



updateLinks();

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(updateLinks);
var lookAt = document;
observer.observe(lookAt, { childList: true, subtree: true, attributes: true });