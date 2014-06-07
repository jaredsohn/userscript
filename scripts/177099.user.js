// ==UserScript==
// @name       Gorace dla bordo
// @description Podmienia "Hity" na "Gorące" przekierowywuje na strone z gorących treści na mikroblogu. 
// @namespace  http://www.wykop.pl/ludzie/dadzbog/
// @version    1.0
// @include    http://wykop.pl/*
// @include    http://*.wykop.pl/*
// @copyright  2013
// ==/UserScript==

document.getElementById('header-con').getElementsByClassName('tab')[2].innerHTML = 'Gorące';
document.getElementById('header-con').getElementsByClassName('tab')[2].href = 'http://www.wykop.pl/mikroblog/hot/';
document.getElementById('header-con').getElementsByClassName('tab')[2].title="Gorące dyskusje";