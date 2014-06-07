// ==UserScript==
// @name           Remove rss.php in url
// @namespace      http://userscripts.org/users/zbcjackson
// @description    To remove rss.php in url specially for caoliu
// @include        http://caoliu.niubi.us/rss.php/*
// @include        http://c1521.us.to/rss.php/*
// @include        http://cl.ordd.org/rss.php/*
// @include        http://t66y.com/rss.php/*
// ==/UserScript==

window.location.href = window.location.href.replace("rss.php/", "")