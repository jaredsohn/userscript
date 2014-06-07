// ==UserScript==
// @name        Kongregate space quick fix
// @namespace   spacefix
// @description Quick fix to the kongregate space problem
// @include     http://www.kongregate.com/forums/*
// @version     1.1
// @grant       none
// ==/UserScript==
window.onload = function() {
var author = document.getElementsByClassName("author");
for(var i = 0; i < author.length; i++) {
author[i].style.width = '180px';

}
var quote = document.getElementsByClassName("quote");
for(var i = 0; i < quote.length; i++) {
quote[i].style.float = "";
quote[i].style.cssFloat = "left";





}
var posts = document.getElementsByClassName("posts");
for(var i = 0; i < posts.length; i++) {
posts[i].style.float = "";
posts[i].style.cssFloat = "left";
posts[i].innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";


}
}