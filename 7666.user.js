// ==UserScript==
// @name          Pajilleros.com
// @description   Bypass ads from pajilleros.com
// @include       http://*.pajilleros.com/verattachment.php?*
// ==/UserScript==

// Pajilleros.com URL: http://videos.pajilleros.com/verattachment.php
// Pajilleros.com IMG: http://videos.pajilleros.com/attachment.php

document.location = document.location.href.substring(0,document.location.href.indexOf("/",8)) + "/attachment.php" + document.location.search