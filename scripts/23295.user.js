// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Torrentsite Secure
// @description   Force torrentsites to use https
// @include       http://danishbits.org/*
// @include       http//feedthe.net/*
// @include       http://hdbits.org/*
// @include       http://norbits.net/*
// @include       http://*nordic-t.org/
// @include       http//sceneaccess.org/*
// @include       http//scenetorrents.org/*
// @include       http//softmp3.org/*
// @include       http://*swedvdr.org* 
// @include       http://*torrentbytes.net/*
// @include       http://waffles.fm/*
// @include       http://x264.eu/*




// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2008 Galia

END LICENSE BLOCK */

location.href = location.href.replace(/^http:/, 'https:');

//
