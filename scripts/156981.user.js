// ==UserScript==
// @name       booru redirection
// @namespace  http://blog.huky.org/
// @version    0.1
// @description  Redirect to source link automatically. Cuttently works in yande.re and/or danbooru.
// @match      http://danbooru.donmai.us/posts/*
// @run-at     document-start
// @copyright  2012+, Diky
// ==/UserScript==

if(history.length>2)return 0;
if(/stay/.test(location.href))return 0;
window.stop();
var r = new XMLHttpRequest();
r.open("GET", location.href);
r.send();
r.onreadystatechange = function (){
    if(r.readyState == 4 && r.status == 200){
        var doc = document.createElement("body");
        doc.innerHTML = r.responseText;
        var url = doc.querySelector("#sidebar section ul li a[href*='http']");
        if(url)url = url.getAttribute("href");
        if(!/(nico|pixiv)/.test(url))url = location.href + "?stay";
        url = url.replace(/mode=manga/, "mode=medium");
        url && (document.location.href = url);
    }
}