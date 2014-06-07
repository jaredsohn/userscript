// ==UserScript==
// @name           image change
// @namespace      http://userscripts.org/scripts/show/96584
// @description    kesobb
// @author         [laccy]
// @version        0.5
// @include        http://*.the-west.*/game.php*
// @include        https://www.google.com/
// ==/UserScript==

var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    img=ilist[i]
    if(img.src == "http://www.google.ro/") {
         img.src = "http://i.imgur.com/2JIK5.png";
    }
    if(img.src == "http://www.google.com/intl/en_ALL/images/logo_special.gif") {
         img.src = "file:///C:/windows/web/wallpaper/follow.jpg";
    }
    if(img.src == "http://images.google.co.uk/intl/en_ALL/images/images_hp.gif") {
         img.src = "file:///C:/windows/web/wallpaper/azul.jpg";
    }
}