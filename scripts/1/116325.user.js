// ==UserScript==
// @name           SwitchToAllPosts
// @namespace      difiso's scripts
// @description    Switch link from http://habrahabr.ru/ to http://habrahabr.ru/all/new/
// @include        http://habrahabr.ru/*
// ==/UserScript==

posts = (document.querySelectorAll('html body#main-page div.header ul.panel-nav-top li a')[0] != null)?
			document.querySelectorAll('html body#main-page div.header ul.panel-nav-top li a')[0]:
			document.querySelectorAll('html body div#layout div#header div.main_menu a.active')[0];

posts.href = 'http://habrahabr.ru/all/new/';