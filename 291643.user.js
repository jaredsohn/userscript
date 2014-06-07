// ==UserScript==
// @name           Kryptowaluty 2
// @namespace      meh
// @include        http://*.wykop.pl/*
// ==/UserScript==


document.getElementById('header-con').getElementsByClassName('tab')[4].innerHTML = '#Kryptowaluty';
document.getElementById('header-con').getElementsByClassName('tab')[4].href = 'http://www.wykop.pl/tag/wpisy/kryptowaluty/wszystkie/';
document.getElementById('header-con').getElementsByClassName('tab')[4].title="tag #kryptowaluty";