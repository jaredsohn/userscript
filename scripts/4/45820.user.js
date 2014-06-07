// ==UserScript==
// @name                    storeimgs | redirect
// @date                    2009.04.04// @namespace               theaulddubliner
// @description             redirects to the image.

// @include                 http://storeimgs.com/show.php/*
// ==/UserScript==


window.location.href = window.location.href.replace(/http:\/\/storeimgs\.com\/show\.php\//, 'http://storeimgs.com/out.php/i');
