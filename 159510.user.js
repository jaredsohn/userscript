// ==UserScript==
// @name        DeviantArt: Show artist names under thumbnails
// @namespace   da_show_artist
// @description Show the artist's name under thumbnails on the browse and search pages
// @include     http://www.deviantart.com/
// @include     http://www.deviantart.com/?*
// @include     http://browse.deviantart.com/*
// @include     https://www.deviantart.com/
// @include     https://www.deviantart.com/?*
// @include     https://browse.deviantart.com/*
// @version     1.0
// @updateURL   https://userscripts.org/scripts/source/159510.meta.js
// @grant       GM_Log
// ==/UserScript==

function hasClass(ele,cls) {
	if ((typeof(ele) == 'undefined') || (ele == null)) {
		return false;
	}
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function doShowArtist(target) {
    var thumbs = target.querySelectorAll(".tt-a.tt-fh")

    for(var i = 0; i < thumbs.length; i++) {
        thumb_username = thumbs[i].getAttribute("username")
        if (!hasClass(thumbs[i], "da_show_artist__expanded")) {
            cat_span = thumbs[i].querySelector(".category")
            un_span = document.createElement("SPAN")
            artist_link = document.createElement("A")
            artist_link.href = "http://" + thumb_username.toLowerCase() + ".deviantart.com/"
            artist_link.appendChild(document.createTextNode(thumb_username))
            un_span.appendChild(document.createTextNode("by "))
            un_span.appendChild(artist_link)
            cat_span.parentNode.insertBefore(un_span, cat_span)
        }
        thumbs[i].className = thumbs[i].className + " da_show_artist__expanded"
    }
}

function handleInsertion( event ) {
    if ((event.target.tagName == 'DIV') && (hasClass(event.target, "browse-results-page"))) {
        doShowArtist(event.target)
    }
}

doShowArtist(document)

document.body.addEventListener('DOMNodeInserted', handleInsertion, false)
