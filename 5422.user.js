// ==UserScript==
// @name           Break out of Free6 frame
// @namespace      http://mywebsite.com/myscripts
// @description    Break out of the "rate this gallery" frame on free6
// @include        http://www.free6.com/gallery.php?url=*
// ==/UserScript==


// eg: http://www.free6.com/gallery.php?url=www.finechixxx.com/galleries/701/free6com.html&lid=1987964
var url = location.href;
var urlArray = url.split('=');

var newUrl = urlArray[1];
document.location = 'http://' + newUrl.substring( 0, newUrl.indexOf('&') );
