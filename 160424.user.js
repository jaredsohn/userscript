// ==UserScript==
// @name Adresse et client affiche en meme temps
// @namespace http://cartouchemania.com
// @description ajouter un iframe sur la page client
// @include http://www.cartouchemania.com/admin/Client.asp?idc=*
// ==/UserScript==

var w = document.body.offsetHeight +1070;
var h = document.body.offsetHeight +300;
self.resizeTo(w,h);

if(navigator.userAgent.indexOf("Firefox")>0){


//alert(thisClientId);
window.onload = function() {
    var thisClientIdSearch = window.location.search;
    var position =thisClientIdSearch.indexOf('=')+1;
    var thisClientId = thisClientIdSearch.substring(position,thisClientIdSearch.length);
    var iframe = document.createElement('iframe');
    iframe.src = "http://www.cartouchemania.com/admin/FacturesSelectRechercher.asp?idc="+thisClientId;
    iframe.id = "client";
    iframe.width = 1115;
    iframe.height = 300;
    iframe.scroling = "no";
    iframe.setAttribute("frameborder","0",0);
    document.body.appendChild(iframe);
}
}else if(navigator.userAgent.indexOf("Chrome")>0) {

window.onload = function() {
    var thisClientIdSearch = window.location.search;
    var position =thisClientIdSearch.indexOf('=')+1;
    var thisClientId = thisClientIdSearch.substring(position,thisClientIdSearch.length);
    var center = document.createElement('center');
    document.body.appendChild(center);
    
    var iframe = document.createElement('iframe');
    iframe.src = "http://www.cartouchemania.com/admin/FacturesSelectRechercher.asp?idc="+thisClientId;
    iframe.id = "client";
    //iframe.algin = center;
    iframe.width = 1200;
    iframe.height = 300;
    iframe.scroling = "no";
    iframe.setAttribute("frameborder","0",0);
    center.appendChild(iframe);
}
}