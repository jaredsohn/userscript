// ==UserScript==
// @name           Wikipedia Printable Version
// @namespace      8928
// @description    Redirects every Wikipedia article page to printable version
// @include        http://*.wikipedia.org/wiki/*
// ==/UserScript==
var abc = location.href
location.href=(abc.replace('wikipedia.org/wiki/','wikipedia.org/w/index.php?printable=yes&title='));