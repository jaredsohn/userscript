/*
 * Title:
 * GM_BRAMUS.in.spire.us
 * 
 * Author:
 *      Bramus!
 * 
 * Last Updated:
 *  2008-10-14
 * 
 * Version History:
 *  2008-10-14: Updated script to work with the *new* delicious
 *  2007-03-20: first version
 *
 * Based upon
 *        snap.icio.us (http://userscripts.org/scripts/show/6038)
 */
 
// ==UserScript==
// @name GM_BRAMUS.in.spire.us
// @namespace http://www.bram.us/
// @description A script to add thumbnails previews to the links posted on delicious.com 
// @include http://delicious.com/*
// @exclude http://delicious.com/rss/*
// ==/UserScript==


(function(){

function init() { 
var tags = document.getElementById('bookmarklist').getElementsByClassName('taggedlink');
for (i = 0; i < tags.length; i++) { 
add_thumbnail(tags[i], i);
}
}

// adds the thumbnail preview of the site
function add_thumbnail(link, num) {

var thumb = document.createElement('img');
thumb.src = '';
thumb.style.display = "none";
thumb.style.position = "absolute";
thumb.style.zIndex = "99999";
thumb.style.border = "1px solid black";
thumb.style.width = 180;
thumb.style.height= 150;
thumb.style.backgroundColor = "white";
thumb.alt = "Thumbnail is in queue.";
thumb.id = "gm_bramus_" + num;

link.rel = "gm_bramus_" + num;
// link.parentNode.insertBefore(thumb, link);
document.getElementById('bookmarklist').parentNode.insertBefore(thumb, document.getElementById('bookmarklist'));

link.addEventListener("mouseover", show_thumb, false);
link.addEventListener("mouseout", hide_thumb, false);
link.addEventListener("mousemove", show_thumb, false);
}

//shows the thumbnail on mouseover
function show_thumb(event) {

// get els
var linkEl = event.target;
var imgEl = document.getElementById(event.target.rel);

// update src if needed
if (imgEl.src !== linkEl.href)
{
imgEl.src = "http://85.25.134.149/index.php?url=" + linkEl.href + "&w=180&h=150&sdx=1024&sdy=768&q=90&d=&forceUpdates=";
}
// position imgEl
imgEl.style.left = (event.layerX + 95) + "px";
imgEl.style.top = (linkEl.parentNode.parentNode.parentNode.parentNode.offsetTop + event.layerY + ((window.location.href == 'http://delicious.com/') ? 130 : 60)) + "px";
imgEl.style.display = "block";
}

//hides the thumbnail on mouseover
function hide_thumb(event) {

// get els
var linkEl = event.target;
var imgEl = document.getElementById(event.target.rel);

// hide thumb
imgEl.style.display = "none";
}


init();
}())