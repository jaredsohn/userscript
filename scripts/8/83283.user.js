// ==UserScript==
// @name           Image Hider
// @namespace      http://userscripts.org/users/204122
// @description    Simply removes the images from the page - add in any sites into the include section to remove images from them
// @version        1.0
// ==/UserScript==
var images = document.getElementsByTagName('img');
for (var i=0; i<images.length; i++){
   images[i].src = "";
}
