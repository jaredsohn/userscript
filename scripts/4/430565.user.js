// ==UserScript==
// @name       370chan vi 
// @namespace  wykop.pl
// @version    0.2
// @description  enter something useful
// @match      http://370chan.lt/*
// @copyright  2014, Jurkowski Konrad
// ==/UserScript==



var twojstary = document.getElementsByClassName("boardlist")[0];

twojstary.innerHTML+= " [";
var link = document.createElement("a");
link.href = "/vi/index.html";
link.innerHTML = " vi ";
twojstary.appendChild(link);
twojstary.innerHTML += "]";

twojstary.style.fontSize= "18px";
document.getElementsByClassName("boardlist")[1].innerHTML = document.getElementsByClassName("boardlist")[0].innerHTML
var f5 = document.createElement("div");
f5.innerHTML = "F5";
f5.style.position = "fixed";
f5.style.right = "0px";
f5.style.top = (innerHeight/2 - 15).toString() + "px";
f5.style.fontSize = "30px";
f5.onclick = function() {
    location.reload();
}
document.body.appendChild(f5);
