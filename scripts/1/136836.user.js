// ==UserScript==
// @author         mahin
// @name           Css changer
// @namespace      test script
// @description    this is for somewhereinblog.net
// @include        www.somewhereinblog.net/*
// ==/UserScript==

var w= $(document)

w.ready(function() {
	$("p").css({"color":"green"})
	$("h1").css({"color":"Blue"})
});

