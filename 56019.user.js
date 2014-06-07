// ==UserScript==
// @name           Chiquwavotter
// @namespace      Chiquwavotter
// @description    ふぁぼったーをちくわにします。
// @include        http://favotter.matope.com/*
// ==/UserScript==

    var chiquwav = "Chikuwaed"
    var regexpvar = /favored\([0-9]*\)/m;

    if(document.getElementsByTagName("html")[0].lang == "ja") {
        chiquwav = "ちくわられ"
        regexpvar = /ふぁぼられ\([0-9]*\)/m;
        
        if (parseInt(Math.random()*16) == 0) chiquwav = "ちくわぶ";
    }

    document.getElementsByTagName("title")[0].innerHTML = document.getElementsByTagName("title")[0].innerHTML.replace(regexpvar , chiquwav);
    document.getElementById("content").innerHTML = document.getElementById("content").innerHTML.replace(regexpvar , chiquwav);