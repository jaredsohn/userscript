// ==UserScript==
// @name           Hide STLToday comments
// @include        http://www.stltoday.com/stltoday/*/*.nsf/*
// ==/UserScript==

comment_div = document.getElementById('left-content');
comment_div.innerHTML = '';