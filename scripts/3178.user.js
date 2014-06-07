// ImageVenue Image Focuser
// Version 1.0
// 2006-02-09
// Copyright (c) 2006, BlueMM
//
// ==UserScript==
// @name          ImageVenue Image Focuser
// @author        BlueMM
// @namespace     http://bluemm.blogspot.com/2006/02/imagevenuecom-image-focuser.html
// @description   When viewing an image on imagevenue.com, the script shows only the image so no ads or text is shown, plus avoids the automatic scaling down of large images.
// @include       http://*.imagevenue.com/img.php*
// ==/UserScript==

what = document.getElementById('thepic');
document.location = what.src;
