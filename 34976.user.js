// ==UserScript==
// @name           YouTube Double the Vid
// @namespace      doublethevid@snakehole.net
// @description    Opens the current video in YouTube Doubler
// @include        http://*.youtube.*/watch?v=*
// ==/UserScript==
var escapedURL = escape(location.href);
var generatedURL = 'http://www.youtubedoubler.com/?video1=' + escapedURL + '&video2=' + escapedURL;
var target = document.getElementById('watch-comments-stats');
var newDIV = document.createElement('div');
//alert(document.defaultView.getComputedStyle(target, null).width);
newDIV.setAttribute('style', 'text-align:center; clear:both; height:23px;max-width:618px');
newDIV.innerHTML = '<a href="' + generatedURL + '" class="yt-button yt-button-primary" style="margin:auto;width:100%"><span class="action-button-leftcap"></span><span class="action-button-text">Double the Vid</span><span class="action-button-rightcap"></span></a>';
target.parentNode.insertBefore( newDIV, target );
