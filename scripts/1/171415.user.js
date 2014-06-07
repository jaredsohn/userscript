// ==UserScript==
// @id             4Shared.com Direct Download
// @name           4Shared.com Direct Download
// @description    Simple and fast
// @icon           http://www4.picturepush.com/photo/a/13263352/220/13263352.png
// @version        1.1
// @namespace      http://www.4shared-direct-download.us.to
// @author         MA DEV
	// @include        http://www.4shared.com/android/*
	// @include        http://www.4shared.com/archive/*
	// @include        http://www.4shared.com/file/*
	// @include        http://www.4shared.com/get/*
	// @include        http://www.4shared.com/mobile/*
	// @include        http://www.4shared.com/mp3/*
	// @include        http://www.4shared.com/music/*
	// @include        http://www.4shared.com/office/*
	// @include        http://www.4shared.com/photo/*
	// @include        http://www.4shared.com/rar/*
	// @include        http://www.4shared.com/video/*
	// @include        http://www.4shared.com/zip/*
	
// @run-at         document-start
// ==/UserScript==


if (window.domain ="www.4shared.com")
    
    window.location.href="http://4shared-direct-download.us.to/download/"+window.location.href;
