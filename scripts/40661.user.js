// ==UserScript==
// @name           auone Mobaoku To Mobaoku
// @namespace      http://kirch.web.fc2.com/
// @description    auオクからモバオクVerの同じページに飛ばします
// @include        http://auok.auone.jp/*
// ==/UserScript==
str = document.URL;
NewWord = str.replace("auok.auone","www.mbok");

window.location.replace(NewWord);
