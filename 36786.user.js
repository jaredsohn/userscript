// Sad Steve Embedded Player 
// version 0.2 BETA
// 2009-01-01
// Copyright (c) 2009, Adam Courtemanche
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name          Sad Steve Embedded Player
// @namespace     http://www.agileadam.com
// @description   Embeds the song player/preview window into the search results page (eliminates the popup) on http://sadsteve.com 
// @include       http://sadsteve.com/search.py*
// @exclude       http://sadsteve.com/preview.py*
// ==/UserScript==

function xpath(query){
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var previewDiv = document.getElementById('previewDiv');
if (previewDiv) {
    // if there is already a div with id "previewDiv", don't create one 
} else {
    //create a div that contains a new iframe element
    //the iframe will serve the song player/preview
    //consider better positioning of this element
    previewDiv = document.createElement("div");
    previewDiv.id = 'previewDiv';
    previewDiv.style.position = 'absolute';
    previewDiv.style.margin = '138px 0px 0px 675px';
    previewDiv.innerHTML = '<iframe id="previewFrame" src="http://sadsteve.com/preview.py" width="348" height="380" scrolling="no" frameborder="0">';
    document.body.insertBefore(previewDiv, document.body.firstChild);
}

//create the new onclick event, which will repopulate the iframe
//with the player/preview for the song the user chose
var link, title, previewFrame
document.addEventListener('click', function(event){
    link = event.target;
    title = link.title;
    //only process links whose title starts with "preview"
    if(title.substring(0,7) == "preview"){
        previewFrame = document.getElementById('previewFrame');
        previewFrame.src="http://sadsteve.com/" + title; 
    }
}, true);

var previewLinks, thisLink, url;
//get all links that [would normally] open the song player/preview window
previewLinks = xpath("//a[@title='Listen to the Audio File']");
for (var i = 0; i < previewLinks.snapshotLength; i++){
    thisLink = previewLinks.snapshotItem(i);
    url = thisLink.getAttribute("onclick");
    //set the link title to the part of the URL needed to preview the song
    thisLink.title = url.slice(20,-25);
    thisLink.removeAttribute("onclick");
}