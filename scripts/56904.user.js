// ==UserScript==
// @name           Decensoretter
// @namespace      Decensoretter
// @description    ふぁぼったーの検閲された単語を置換します。
// @include        http://favotter.matope.com/*
// ==/UserScript==

　　　　var censoredWord = new Array("mom");

    if(document.getElementsByTagName("html")[0].lang == "ja") {
        censoredWord = new Array("お母さん");
    }

    var censored = document.getElementsByClassName("censored");
    var i = 0;

    for(i in censored){
        censored[i].innerHTML = censoredWord[parseInt(Math.random()*censoredWord.length)];
    }