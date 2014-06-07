// ==UserScript==
// @author	   Ben Knisley
// @name       GoogleBackground
// @namespace  http://benknisley.co.cc
// @version    0.2
// @description  Awesome way to get back your Google background 
// @include		https://www.google.com/
// @include		http://www.google.com/
// @updateURL
// @copyright  None, Free to the world!!!
// ==/UserScript==
//**********************************************//
//To change the background, just change the Url below to your image image of choice
var background = 'http://upload.wikimedia.org/wikipedia/commons/9/97/Paysage_enneige_02.jpg'
//**********************************************//
    
document.getElementById('gstyle').innerText = document.getElementById('gstyle').innerText + "body{background-image:url(" + background + ");background-repeat:no-repeat;background-attachment:fixed;background-position:center; }"
body.innerHTML = body.innerHTML.replace("/images/srpr/logo4w.png","http://upload.wikimedia.org/wikipedia/commons/3/30/Googlelogo.png");