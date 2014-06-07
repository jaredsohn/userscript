// ==UserScript==
// @name           Quote lightener for dark what.cd stylesheets
// @namespace      http://what.cd
// @description    Lets you read quotes when using dark stylesheets such as Kuro on what.cd
// @include        http*://*what.cd/*
// ==/UserScript==
document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css" charset="utf-8">pre, blockquote {color:#999;}</style>';