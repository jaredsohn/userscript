// ==UserScript==
// @name           onlinemoviesfreee skipper
// @namespace      http://ilija.neopsindle.com/
// @description    skip all boring stuff on onlinemoviesfreee.com
// @include        http://www.onlinemoviesfreee.com/download/*
// ==/UserScript==
location.href = location.href.replace(/.*onlinemoviesfreee\.com\/download\/\?/, '');

