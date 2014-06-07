// ==UserScript==
// @name           Add a link to hatena's logo
// @namespace      http://www.horaguchi.net/
// @description    Add a link to Hatena's logo
// @include        http://d.hatena.ne.jp/*
// @include        http://g.hatena.ne.jp/*
// @include        http://b.hatena.ne.jp/*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace('www.hatena.ne.jp', 'www.hatena.ne.jp/' + location.href.replace(/^.*hatena.ne.jp\/([^\/]*)\/.*/, '$1'));
