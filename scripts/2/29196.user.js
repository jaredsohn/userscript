// ==UserScript==
// @name           SuperDickery Archive.org
// @namespace      http://tvtropes.org/pmwiki/pmwiki.php/Main/Fleb
// @description    Inserts the new, only-slightly-changed SuperDickery.com URLs of images hotlinked on Archive.org's Wayback Machine, which mirrors the pages of SuperDickery.com from before it got overhauled in 2008.
// @include        http://web.archive.org/web/*/superdickery.com/*/*.html
// @include        http://web.archive.org/web/*/*www.superdickery.com/*/*.html
// @include        http://web.archive.org/web/*/http://superdickery.com/*/*.html
// ==/UserScript==

var token = '/';
var urlbase = "http://www.superdickery.com/images/stories/";

var images = document.getElementsByTagName('img');

// The last image *seems* to always be the content image
var lastimage = images[images.length - 1];
//Note: This alt text will never be displayed, as archive.org's
//response to hotlinking to something on their server that doesn't
//exist is to provide a one-pixel image in its place --
// http://web.archive.org/images/error_image.gif
lastimage.setAttribute('alt',"This image's new URL couldn't be accessed! It may have been moved, again, or else referrer blocking has been put in place.");

var url = lastimage.getAttribute('src');
if (url.indexOf('superdickery.com/') != -1) {
// double-check this is the right <img> tag
    url = url.split(token);
    url = urlbase + url[url.length - 2] + token + url[url.length - 1];
    lastimage.setAttribute('src',url);
    }

//example result:
//For 
//http://web.archive.org/web/20070315010906/http://www.superdickery.com/other/114.html
//The image URL is now
//http://www.superdickery.com/images/stories/other/1027_4_034.jpg
//

