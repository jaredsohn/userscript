// ==UserScript==
// @name           Radio
// @namespace      http://www.bungie.net/
// @include        http://www.bungie.net/*
// @include        http://*.bungie.net/*
// ==/UserScript==
var divArray = document.getElementsByTagName("div");
for (var i = 0; i<divArray.length; i++){
    if(divArray[i].getAttribute("class") == "list-db"){
        if(!(divArray[i].innerHTML.match(/>Halo 2<.a><.li/i))){}
        else{
            divArray[i].innerHTML = divArray[i].innerHTML.replace(/>Halo 2<.a><.li/gi, ">Halo 2</a></li> <li>|</li> <li><a href='http://septagon.listen2myradio.com/'target='_blank'style='color:#71CAEF;'>Radio</a></li");
    }
    }
    }