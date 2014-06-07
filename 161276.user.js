// ==UserScript==
// @name ticket
// @namespace http://cartouchemania.com
// @description ticket
// @include http://www.cartouchemania.com/admin/Main.asp*
// ==/UserScript==

if(navigator.userAgent.indexOf("Firefox")>0){


//alert(thisClientId);
window.onload = function() {

    var iframe = document.createElement('iframe');
    iframe.src = "localhost/dalun/ticket.php";
    iframe.id = "ticket";
    iframe.width = 300;
    iframe.height = 1500;
    iframe.scroling = "no";
    iframe.setAttribute("frameborder","0",0);
    document.body.appendChild(iframe);
}