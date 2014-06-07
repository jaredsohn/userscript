// ==UserScript==
// @name           Tillychan ULTIMATE GIF ANIMATOR
// @namespace      http://tillychan.org
// @include        http://www.tillychan.org/*
// ==/UserScript==

var thumbs = document.getElementsByTagName("img");
var num = thumbs.length; 

for(i = 0; i < num; i++){
if(thumbs[i].className == "thumb"){
if(thumbs[i].src.match(".gif")){
thumbs[i].src = thumbs[i].src.replace("s", "");
thumbs[i].src = thumbs[i].src.replace("thumb", "src");
}
}
}
