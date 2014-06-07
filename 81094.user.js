// ==UserScript==
// @name           PtP - Remove Collage Images
// @namespace      http://userscripts.org/users/brownt0wn
// @description    Remove images in collages to speed page load
// @include        http://passthepopcorn.me/collages.php?id=*
// @author         brownt0wn
// ==/UserScript==



var imgs = document.getElementsByTagName('img');
var len =imgs.length;
var imageLoc=new Array();

//remove links from cover art images
//starts at 1 to show description image
for(var i=0;i<len;i++){
	imageLoc[i]=imgs[i].src;
	imgs[i].src=imgs[i].src.replace(imageLoc[i],"");
}
