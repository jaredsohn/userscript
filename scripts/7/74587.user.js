// SSL Certificates Pro
// version 2.15
// Started 30-03-2010
//
//
// ==UserScript==
// @name	pmerf votathon2
// @description	votathon for pmerfs vid page



// @include     http://optimus.myspacecdn.com*









// ==/UserScript==



var randomNumber = (Math.round(Math.random()*8999)+1000);
var randomNumber2 = (Math.round(Math.random()*8999)+1000); 
//var randomNumber3 = (Math.round(Math.random()*100000)+9999999);


setTimeout(function() { 
window.location = "http://optimus.myspacecdn.com/apps/myspace/glee/index.html?userId=" + randomNumber + randomNumber2 + "&link=31589223"; } , 5000);  //waits 30 seconds and refresh

