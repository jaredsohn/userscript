// ==UserScript==
// @name           Skip Linkbucks /url/
// @namespace      linkbucks.com/url/
// @include        *.linkbucks.com/url/*
// ==/UserScript==
location.href = location.href.replace(/.*linkbucks\.com\/url\//, '');
