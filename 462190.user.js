// ==UserScript==
// @id             Bye2ch.net
// @name           ばいばい２ちょんねる
// @version        0.0.1
// @namespace      redirectSC
// @author         Bird_Alpha
// @description    ２ちょんねるなんてなかった！！
// @include        *.2ch.net/*
// @run-at         document-start
// ==/UserScript==

(function () {

document.location.href = document.URL.replace("2ch.net/","2ch.sc/");

})();