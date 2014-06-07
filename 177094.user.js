// ==UserScript==
// @name       Gorace for orange
// @description Podmienia "gry" na "Gorące" przekierowywuje na strone z gorących treści na mikroblogu. 
// @namespace  http://www.wykop.pl/ludzie/dadzbog/
// @version    1.1
// @include    http://wykop.pl/*
// @include    http://*.wykop.pl/*
// @copyright  2013
// ==/UserScript==

document.getElementById('header-con').getElementsByClassName('tab')[5].innerHTML = 'Gorące';
document.getElementById('header-con').getElementsByClassName('tab')[5].href = 'http://www.wykop.pl/mikroblog/hot/';
document.getElementById('header-con').getElementsByClassName('tab')[5].title="Gorące dyskusje";