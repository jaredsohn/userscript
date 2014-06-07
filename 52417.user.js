// ==UserScript==
// @name           a
// @namespace      a
// @description    a
// @include       http://www.reddit.com/r/*
// ==/UserScript==
//

var links = document.getElementsByTagName('a');
var valid = new RegExp('\.(jpg|gif|png)');
for(x in links){
    var link = links[x];
    var url = link.href;
    if(valid.test(url)){
        var img = document.createElement('img');
        img.src = url;
        img.style.display = 'inline';
        link.parentNode.insertBefore(img, link.nextSibling);
    }
}