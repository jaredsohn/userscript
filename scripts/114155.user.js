// ==UserScript==
// @name           pony removal
// @namespace 
// @description    yup
// @include        *
// ==/UserScript==

var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    img=ilist[i]
    if(img.src == "http://clericx.net/kurtiss/3dslogoluna.png") {
         img.src = "http://imgur.com/r6reA";
    }
}