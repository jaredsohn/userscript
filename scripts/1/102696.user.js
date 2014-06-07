// ==UserScript==
// @name          IDWS GET Link Donat
// @namespace     http://userscripts.org/scripts/show/69049
// @include       http://*.indowebster.com/*.html
// @include       http://*.indowebster.com/download=*
// @exclude       http://ads.indowebster.com*
// @version       11050721
// @description   (Indowebster) automatically get download link
// @author        idx (http://userscripts.org/users/idx)
//
// Indowebster Link Download
//
// Copyright (c) 2009, Idx
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// Mod By: Idx
// ==============
//
// mod.R-22 : 2011-05-07
//  Deprecate 3rdParty & multi checker (uncleaned)
//  Fix failed get link
//
// mod.R-21 : 2011-03-13
//  Fix adapting FF4.0
//
// mod.R-20 : 2010-10-12
//  switch to generic link onfetch external failed
//  fix css on download page
//
//
// --------------------------------------------------------------------
// ==/UserScript==
var test = document.body.innerHTML;
var regex = new RegExp(input type="hidden" name="file" value="[a-zA-Z0-9./+_-]*);
var res = regex.exec(test);
var fileurl = res[1];
document.getElementById('bingkai_bawah').innerHTML = '<a href="' + fileurl.replace('+',' ') + '">Download</a>';
