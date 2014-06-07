// ==UserScript==
// @name        heise-remove-summarylink
// @namespace   heise
// @include     http://www.heise.de/*
// @version     2
// ==/UserScript==
links = document.getElementsByTagName("a")
for(i in links){
    if(links[i].getAttribute("class") != null && links[i].getAttribute("class").indexOf("indexlist_text") != -1){
        links[i].removeAttribute("href");
    }
}