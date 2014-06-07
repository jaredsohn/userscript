// ==UserScript==
// @id             4Shared.com Premium Download
// @name           4Shared.com Premium Download
// @description    Simple fast and easy "Premium" download using http://4server.info
// @icon            http://www.gravatar.com/avatar/bdb861650cd3b4a7be02052005302d6b.png
// @version        1.0 Final Version
// @namespace      http://4server.info
// @author         Kaum Ndaloe
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
    // @include        http://www.4shared.com/mobile/*

// @run-at         document-start
// ==/UserScript==


if (window.domain ="www.4shared.com")
    
    window.location.href="http://4server.info/download/"+window.location.href;