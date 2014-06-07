// ==UserScript==
// @name       get meta descr
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  получаем мета дескрипшен
// @match      *
// @copyright  2012+, You
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function getMetaDescr() {
    var meta  = document.querySelector('meta[name=description]').content;
    var title = document.title; 
    alert("meta: " + meta + "\n\ntitle: " + title);
}
$(function(){
    $(document).keyup(function (e) {
            if (e.keyCode == 71 && e.altKey && e.shiftKey) {
                 e.preventDefault();
                getMetaDescr();
            }
        })
});