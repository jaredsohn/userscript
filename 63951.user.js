// ==UserScript== 
// @name reddit inline images 
// @description Inlines some images linked in reddit comments 
// @include http://www.reddit.com/r/*/comments/* 
// ==/UserScript==

var links = document.getElementsByTagName('a'); var valid = new RegExp('.(jpe?g|gif|png)'); for(x in links){ var link = links[x]; var url = link.href; if(valid.test(url)){ var img = document.createElement('img'); img.src = url; img.style.display = 'inline'; img.style.verticalAlign = 'top'; link.parentNode.insertBefore(img, link.nextSibling); } }