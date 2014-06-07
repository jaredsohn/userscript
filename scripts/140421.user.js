// ==UserScript==
// @name          Grepolis++
// @namespace     http://userscripts.org/users/J08nY
// @description   Will automatically do some things for you on Grepolis
// @include       http://*.grepolis.com/*
// ==/UserScript==

//INIT
var thread;
//alert("test");
document.write("<input type=\"button\" name=\"TryIt\" value=\"Click me and wait!\" onClick=\"startThread(2000)\" >")

function startThread (stepMili) {
  thread=setInterval("run()",stepMili);
}

function stopThread(){
    clearInterval(thread);
}

function run(){
    document.write("Hi there!");
    alert("run run run*");
}
