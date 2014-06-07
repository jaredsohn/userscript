// ==UserScript==
// @name           Blocks eBay Forum No Photo Thumb Avatar Images and Hover
// @namespace      http://userscripts.org/scripts/show/42202
// @description    No Show ebay discussion board images that have no avatar image and stops hover
// @include        http://forums.ebay.com/*
// @copyright      JoeSimmons but modified
// ==/UserScript==
/* Remove the avatars ebay uses when someone does not have one - method utilized from http://userscripts.org/scripts/review/41290 */

var image, noshow = new Array(
"images/no_photo_thumb.gif",
"images/no_photo.gif",
"pics.ebaystatic.com/aw/pics/community/myWorld/imgBuddyBig1.gif"
);
javascript:for(var im=document.images.length-1; im>=0; im--) {
image = document.images[im];
for(var x=noshow.length-1; x>=0; x--) {
if(image.src.indexOf(noshow[x])!=-1) image.parentNode.removeChild(image);
}
}

/* From the Hover In Peace from http://userscripts.org/scripts/show/10849 */

document.addEventListener('mouseover', function(event) {
event.stopPropagation();
event.preventDefault();
}, true);