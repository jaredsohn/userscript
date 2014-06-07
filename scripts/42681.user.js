// ==UserScript==
// @name           Opera browser eBay Forums content photo hover RIP script
// @namespace      http://userscripts.org/scripts/show/42681
// @description    Opera browser eBay Forums content photo hover RIP script
// @include        http://forums.ebay.com/*
// ==/UserScript==

/* See http://lifehacker.com/5180010/enable-user-scripts-in-google-chrome as to how to use with the Google Chrome browser */

(function() {

/* Remove some images - method utilized from http://userscripts.org/scripts/review/41290*/
var image, noshow = new Array(
"images/no_photo_thumb.gif",
"images/no_photo.gif",
"pics.ebaystatic.com/aw/pics/community/myWorld/imgBuddyBig1.gif"
);
for(var im=document.images.length-1; im>=0; im--) {
image = document.images[im];
for(var x=noshow.length-1; x>=0; x--) {
if(image.src.indexOf(noshow[x])!=-1) image.parentNode.removeChild(image);
}
}

/* - method utilized from http://userscripts.org/scripts/review/30956 */
var imagesa = document.images;
var img;
for (var ia = 0; ia < imagesa.length; ++ia)
{
img = imagesa[ia];
img.title = "";
img.alt = "";
}

/* From the Hover In Peace from http://userscripts.org/scripts/show/10849 */
document.addEventListener('mouseover', function(event) {
event.stopPropagation();
event.preventDefault();
}, true);

/* Snip the right column - remove the double forward slashes if wanting to remove that column */
//var RCol=document.getElementById("sidebar-column");RCol.parentNode.removeChild(RCol);

/* Remove the rotator */
$x("//div[@class='rotator']").forEach(function(r1) { r1.parentNode.removeChild(r1); });

/* Remove the announcement */
$x("//div[@class='announcement-body']").forEach(function(r2) { r2.parentNode.removeChild(r2); });

/* Remove a title */
$x("//div[@class='jive-page-title']").forEach(function(r3) { r3.parentNode.removeChild(r3); });

/* Remove the description */
$x("//div[@class='live-page-description lw-page-description']").forEach(function(r4) { r4.parentNode.removeChild(r4); });

/* Remove other elements using full xpath info from YaRIP (Yet Another Remove It Permanently Firefox addon) */
$x("//div[@id='lw-container-white']/table[1][@class='lw-page-wrapper']/tbody/tr/td[1][@class='lw-content-wrapper']/table[3][@class='lw-bottom-padding']/tbody/tr/td[1][@class='lw-left-nav']").forEach(function(Snip) { Snip.parentNode.removeChild(Snip); });
$x("//div[@id='lw-container-white']/div[2][@class='live-powered-by']").forEach(function(Snip) {Snip.parentNode.removeChild(Snip); });
$x("//div[@id='glbfooter']/table/tbody/tr[5][@class='g-hlp']").forEach(function(Snip) {Snip.parentNode.removeChild(Snip); });
$x("//div[@id='glbfooter']/table/tbody/tr[1]").forEach(function(Snip) {Snip.parentNode.removeChild(Snip); });
$x("//div[@id='lw-container-white']/form/table/tbody/tr/td/table/tbody/tr/td[@class='RTRemarQPanel1TD']/table/tbody/tr/td/table/tbody/tr").forEach(function(Snip) { Snip.parentNode.removeChild(Snip); });
$x("//div[@id='lw-container-white']/table[2]/tbody/tr").forEach(function(Snip) { Snip.parentNode.removeChild(Snip); });
$x("//div[@id='sidebar2']/div[1][@class='hprcp_n']/div[@class='hprcp_e']").forEach(function(Snip) { Snip.parentNode.removeChild(Snip); });
$x("//div[@id='sidebar2']/div[2][@class='hprcp_head']").forEach(function(Snip) { Snip.parentNode.removeChild(Snip); });
$x("//div[@id='lw-container-white']/table[1][@class='lw-page-wrapper']/tbody/tr/td[1][@class='lw-content-wrapper']/table[3][@class='lw-bottom-padding']/tbody/tr/td[2][@class='lw-content-col']/div[1][@class='component lw-announcement']").forEach(function(Snip) { Snip.parentNode.removeChild(Snip); });
$x("//div[@id='thread-icon-legend']/div[2][@class='legend-left-middle']/div[@class='legend-right-middle']/div[@class='legend-center-middle']").forEach(function(Snip) { Snip.parentNode.removeChild(Snip); });
$x("//div[@id='thread-icon-legend']/div[3][@class='legend-bottom']").forEach(function(Snip) { Snip.parentNode.removeChild(Snip); });
$x("//div[@id='watch-image-cell']\" style=\"div[id='watch-image-cell']").forEach(function(Snip) { Snip.parentNode.removeChild(Snip); });

/* Method from Greasemonkey Recipe Book at http://userscripts.org/scripts/show/37841 */
function $x(p, context) {
if (!context) context = document;
var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
return arr;
}

})();