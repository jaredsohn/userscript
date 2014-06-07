// ==UserScript==
// @name       Legacy U2 Upload Button
// @namespace  http://onee3.org/
// @version    0.2
// @description  Back to the legacy upload button
// @include      *://u2.dmhy.org/*
// @exclude      *://u2.dmhy.org/shoutbox.php*
// @copyright  2014+, Frederick888
// ==/UserScript==

jQuery( "a[href='upload.php?addoffer=1']" ).attr('href','upload.php');