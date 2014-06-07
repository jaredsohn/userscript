// ==UserScript==
// @name        Onliner large images in news
// @version     0.1
// @description Adds links to larger images. Images become clickable. Works at Tech, Auto, Realt and People news pages
// @include     http://tech.onliner.by/*/*/*/*
// @include     http://auto.onliner.by/*/*/*/*
// @include     http://realt.onliner.by/*/*/*/*
// @include     http://people.onliner.by/*/*/*/*
// @copyright   2014, PaWWel_13  <pawwel1993 dog gmail>
// ==/UserScript==

function addLinksToLarge() {
    var text = document.getElementsByClassName('b-posts-1-item__text')[0];
    var images = text.getElementsByTagName('img');

    for( var i = 0; i < images.length; i++ ) {
       if( images[i].parentNode.nodeName.toLowerCase() === 'a') {
            images[i].parentNode.target = "_blank";
            continue;
       }
       var newElement = document.createElement('a');
       newElement.href = images[i].src.replace('default','large');
       newElement.target = "_blank";
       images[i].parentElement.insertBefore(newElement, images[i]);
       newElement.appendChild(images[i]);
    }
};

function waitLoading() {
    if(document.readyState == "complete") {
       addLinksToLarge();
    }
    else
        setTimeout(waitLoading, 100);
}

waitLoading();