// ==UserScript==
// @name           SocialReaderRedirector
// @namespace      http://www.jeroenvanwarmerdam.nl
// @include        http://www.socialreader.net/comments/*
// ==/UserScript==

location.href = document.getElementById("storybox").getElementsByTagName("a")[0].href;