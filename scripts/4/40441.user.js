// ==UserScript==
// @name           Secure Fedora Wiki
// @namespace      http://ianweller.org/#greasemonkey-secure-fedora-wiki-r1
// @description    force Fedora Wiki to use secure connection
// @include        http://fedoraproject.org/wiki/*
// ==/UserScript==

location.href = location.href.replace(/^http:/, 'https:');