// ==UserScript==
// @name        t.co/z
// @namespace   t.co/z
// @description Tea Cozy
// @include     http://t.co/z
// @version     1
// @grant       none
// ==/UserScript==
var bc=document.getElementsByClassName('body-content')[0];
var tea_guy = document.createElement('img');
bc.innerHTML="";
tea_guy.src = "http://d3j5vwomefv46c.cloudfront.net/photos/large/783273323.png";
tea_guy.style.width = "600px";
tea_guy.style.height = "456px";
bc.appendChild(tea_guy);
document.title = "Tea Cozy (t.co/z)";