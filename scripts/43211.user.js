// ==UserScript==
// @name           IE7 IE8 Browser EBay Forum Content Photo Hover Rip Javascript
// @namespace      http://iescripts.org/view-scripts-566p1.htm
// @description    An IE7 IE8 script to strip out or hide elements on the ebay discussion boards which removes the left and bottom of the boards. It also removes the ebay avatars that they use when a member does not have one. Removes the alt and text if someone has disabled viewing images in the browser. Sets a maximum width for images so when a member adds too large of one it does not break the forums thread.  Also adds a simple but nice scrollbar coloring along with visited links color and sets the body width in on both sides by 2 percent.  The javascript is a combination of using dom xpath element removal and css hiding.
// @include        http://forums.ebay.com/*
// ==/UserScript==

(function() {

/* Disable the hover mouseover. This also better fixes the mysterious date visited links could not modify issue - not perfect */
document.body.innerHTML = document.body.innerHTML.replace(/onmouseover/gi, 'nomouseover');
document.body.innerHTML = document.body.innerHTML.replace(/>a</g, '');

/* Start Css style sheet */
var cssStylesheet  = '';
cssStylesheet += '@namespace url(http://www.w3.org/1999/xhtml);';

/* Hide some elements by id and class to remove the left and bottom with a few top sections */
cssStylesheet += 'lw-navMyTopics,#my-topics-more,#thread-icon-legend,.thread-snippet,.announcement-body,.g-hlp,.g-pipe,.hprcp_e,.hprcp_n,.hprcp_w,.icon-forums,.jive-page-title,.jive-portlet-box,.live-page-description,.live-powered-by,.lw-announcement,.lw-featured-message-author-photo-avatar,.lw-left-nav,.lw-page-description,.mtitle,.pipe,.pnav,.snav,.rotator,.RTRemarQPanel1TD,.sidebar-minimize-control,.topictip {display:none;}';

/* Body background - add the location of the image on your computer between the double quotes and remove the two forward slashes if wanting to use this - could also use body, table, td if using a more plain background */
//cssStylesheet += 'body {background-image: url("C:/");}';

/* Maximum width for images */
cssStylesheet += 'img {max-width:600px;width:expression(this.width > 600 ? 600: true);}';

/* Body width, scrollbar color and do not show bottom horizontal scroll bar */
cssStylesheet += 'body {margin-left:2%;margin-right:2%;overflow-x:hidden;scrollbar-face-color:#808080;scrollbar-arrow-color:#FFFFFF;scrollbar-highlight-color:#FFFBF0;scrollbar-3dlight-color:#808080;scrollbar-shadow-color:#FFFBF0;scrollbar-darkshadow-color:#808080;scrollbar-track-color:#CCCCCC;}';

/* Miscellaneous link colors */
cssStylesheet += '#forum a:link {color:blue !important;}';
cssStylesheet += '#forum a:visited {color:navy !important;font-style:italic !important;font-weight:400 !important;}';
cssStylesheet += '#forum a:hover {color:darkgreen !important;text-decoration:none !important;}';
cssStylesheet += '#forum a:active {color:blue !important;}';

/* Main thread link on topics page */
cssStylesheet += '*html #forum .lw-threadlist-row td a:link h2 {color:#23238E !important;font-family:arial !important;font-size:11pt !important;letter-spacing:1px !important;font-weight:light !important;}';
cssStylesheet += '*html #forum .lw-threadlist-row td a:visited h2 {color:navy !important;font-family:arial !important;font-size:11pt !important;letter-spacing:1px !important;font-style:italic !important;font-weight:400 !important;}';
cssStylesheet += '*html #forum .lw-threadlist-row td a:hover h2 {color:darkgreen !important;font-family:arial !important;font-size:11pt !important;letter-spacing:1px !important;}';

/* Date link section which goes to the last post in the thread */
cssStylesheet += '* html #forum .jive-last-post.lw-text {background:#E6E4E4 !important;border-bottom:1px dotted #A5AEC5 !important;letter-spacing:1px !important;}';

/* Change link colors for Reply and Link in the threads */
cssStylesheet += '.reply-button {color:blue !important;}';
cssStylesheet += '.lw-text a {color:blue !important;}';
cssStylesheet += '.lw-text a:visited {color:navy !important;}';

/* Change background colors for any odd row areas */
cssStylesheet += '.lw-threadlist-topic, .lw-thread-replies, .lw-user-photo, .lw-author-photo-frame, .lw-author-photo-bezel, .lw-photo, .lw-threadlist-row, .lw-threadlist-row-odd, .jive-bullet, .thread-icons, .ebayUpdate-img, .tacked-img, .thread-divider-container, .thread-divider, .lw-threadlist-row .lw-threadlist-row-odd, .lw-thread-body-user, .lw-message-row-odd {background:white !important;}';

/* Use IE7Pro code to implement the above css style sheet - method utilized from http://www.iescripts.org/view-styles-172p1.htm */
PRO_addStyle(cssStylesheet, document);

/* Remove the avatars ebay uses when someone does not have one - method utilized from http://userscripts.org/scripts/review/41290 */
var image, noshow = new Array(
"images/no_photo_thumb.gif",
"images/no_photo.gif",
"pics.ebaystatic.com/aw/pics/community/myWorld/imgBuddyBig1.gif"
);
for(var im=document.images.length-1; im>=0; im--) {
image = document.images[im];
for(var x=noshow.length-1; x>=0; x--) {
if(image.src.indexOf(noshow[x])!=-1) image.parentNode.removeChild(image);
}}

/* Remove the alt and title text (useful when disabling images) - method utilized from http://userscripts.org/scripts/review/30956 */
var imagesa = document.images;
var img;
for (var ia = 0; ia < imagesa.length; ++ia) {
img = imagesa[ia];
img.title = "";
img.alt = "";
}

/* Hide the right column - remove the two forward slashes to hide that column - or could add .sidebar,#sidebar2,#side-bar-column, at beginning of the ccsStylesheet line after the first single quote */
//var RCol=document.getElementById("sidebar-column");RCol.parentNode.removeChild(RCol);

})();