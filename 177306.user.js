// ==UserScript==
// @name        Karachan boardname changer
// @namespace   :) :P :P :D
// @description JP2GMD
// @include     *karachan.org/*
// @include     *64.120.230.218/*
// @version      v1.0
// @author      Marcin95
// ==/UserScript==


var boardTitle = document.querySelector(".boardTitle");
boardTitle.textContent = "Wykop.pl - newsy, aktualności, gry, wiadomości, muzyka, ciekawostki, filmiki";
document.title = "Wykop.pl - newsy, aktualności, gry, wiadomości, muzyka, ciekawostki, filmiki";
