// ==UserScript==
// @name        6R RM
// @namespace   Seiran
// @include     http://bbs.cgyouxi.com/forum.php
// @version     1
// @grant       none
// ==/UserScript==

//让6R的RM区在最显眼位置的脚本
//为了不使用临时脚本这么绕的方式，欢迎来到有爱的9萌，http://bbs.moe9th.com
  
 
(function(){

    var x = new XMLHttpRequest();
    x.open("GET", "http://bbs.cgyouxi.com/forum-75-1.html", false);
    x.send();
    var html = x.responseText;
    
    var insertobj = document.getElementById("category_79");
    var text = /<div id="subforum_75" class="bm_c" style="">([\w\W]*?)<div class="drag">/
    text = html.match(text)[1];
    insertobj.innerHTML = text + insertobj.innerHTML
}())
