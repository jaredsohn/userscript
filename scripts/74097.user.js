// ==UserScript==
// @name           Pokec.sk - Automaticke zatvaranie okna starej RP
// @namespace      http://userscripts.org/users/merlinsvk
// @description    Zavrie okno starej RP po odoslani na chate pokec.sk
// @include        http://rpx.azet.sk/*
// ==/UserScript== 
var cas = 5000; // cas do zatvorenia RP v milisekundach
var es = document.getElementsByTagName("p");

for(i=0;i<es.length;i++){
        e = es[i];
        if(e.innerHTML.indexOf("uložená do") >= 0 )  
         setTimeout("window.close()",cas);
}