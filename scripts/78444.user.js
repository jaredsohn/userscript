// --------------------------------------------------------------------
//
// ==UserScript==
// @name          SecureSurfer
// @description   Force HTTPS on sites to surf securely! Simply click "Add" to add the site you wish to force to show HTTPS!
// @include       http://userscripts.org*


// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2010 Kyo and PUBLIC DOMAIN

END LICENSE BLOCK */

location.href = location.href.replace(/^http:/, 'https:');

//