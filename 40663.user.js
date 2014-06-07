// ==UserScript==
// @name           Mobaoku To auone Mobaoku
// @namespace      http://kirch.web.fc2.com/
// @description    モバオクからauオクVerの同じページに飛ばします
// @include        http://www.mbok.jp/*
// ==/UserScript==
str = document.URL;
NewWord = str.replace("www.mbok","auok.auone");

window.location.replace(NewWord);
