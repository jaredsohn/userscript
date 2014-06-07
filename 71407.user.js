// ==UserScript==
// @name           Hot topics & sponser links remover
// @namespace      Google
// @description    구글 핫 토픽과 스폰서 링크를 제거 합니다.
// @include        http://www.google.co.kr/*
// ==/UserScript==

var cssBlock = document.createElement("style");
cssBlock.setAttribute("type", "text/css");
cssBlock.innerHTML = "#ht {display : none;}";

document.getElementsByTagName("head")[0].appendChild(cssBlock);
