// ==UserScript==
// @name       YOBA DOMEN FIX
// @namespace  http://userscripts.org/scripts/show/185551
// @version    0.1
// @description  OBMAN NO MORE
// @match      http://*/*
// @copyright  TZAR GVYDON
// @run-at document-start
// ==/UserScript==

redirectToPage("http://yoba.vg/", "http://31.31.200.137/");
redirectToPage("http://www.yoba.vg:8080/chat.html", "http://31.31.200.137:8080/chat.html");


function redirectToPage(page1, page2){
if(window.location.href.indexOf(page1) != -1){
    window.location.href = page2;
}
}