// ==UserScript==
// @name           AllMusic - clean up TITLE text
// @description    Use in tandem with my Stylish script for re-styling the page. http://userstyles.org/styles/35350
// @author        Dave Cortright
// @namespace      kpao.org
// @version        1.01
// @date            2011-07-04
// @include        http://allmusic.com/*
// @include        http://www.allmusic.com/*
// ==/UserScript==

x = document.getElementsByTagName("title")[0];
x.innerHTML = x.innerHTML.replace('allmusic  ((( ', '');
x.innerHTML = x.innerHTML.replace('  )))', '');