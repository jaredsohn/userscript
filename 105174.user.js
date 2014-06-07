// ==UserScript==
// @name           nidarun_mizuyari
// @namespace      wgrkh
// @description    nidarun 水やり用
// @include        http://jouro.ula.cc/kakinoki.php?guid=ON
// @include        http://pprof.ula.cc/*/?guid=ON&
// @include        http://jouro.ula.cc/syukaku.php?guid=ON
// ==/UserScript==

if (location.href == "http://jouro.ula.cc/kakinoki.php?guid=ON"){
if(document.body.innerHTML.indexOf("<form") +1){
if(document.forms[0].elements["kakiaction"].value == "もっと水をやる[2]"){
document.forms[0].elements["kakiaction"].click();
}
}
}

if (location.href.indexOf("http://pprof.ula.cc/") +1){
if(document.forms[0].elements["kakiaction"].value == "収穫する[2]"){
document.forms[0].elements["kakiaction"].click();
}
}


if (location.href == "http://jouro.ula.cc/syukaku.php?guid=ON"){
if(document.body.innerHTML.indexOf("収穫しました") +1){
var links = document.getElementsByTagName("a");
if(links[0].innerHTML == "戻る[2]"){
location.href=links[0].href + "&";
// document.getElementsByTagName("a")[0].href += "&";
// document.getElementsByTagName("a")[0].click();
}
}
}