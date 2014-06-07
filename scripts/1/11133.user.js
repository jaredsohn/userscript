// ==UserScript==
// @name           Flickr Cleaner
// @namespace      by Eric
// @description    Gets rid of worthless stuff on Flickr!
// @include        http://www.flickr.com/photos*
// ==/UserScript==
var javashit = document.body.appendChild(document.createElement('script'));
javashit.type = 'text/javascript';
javashit.innerHTML = "var DiscussPhoto = document.getElementById('DiscussPhoto'); DiscussPhoto.style.display = 'none';function toggle(id){if(id.style.display == 'none') id.style.display = 'block'; else id.style.display = 'none';}";

var controls = document.body.appendChild(document.createElement('div'));
controls.style.position = 'fixed';
controls.style.top = '2px';
controls.style.left = '2px';
controls.style.fontSize = '10px';
controls.style.backgroundColor = '#FFFFFF';
// controls.innerHTML = 'Toggle: <br /> <a href="javascript:toggle(DiscussPhoto);">Comments</a> <br /> ';
