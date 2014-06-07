// ==UserScript==
// @author	Ben Knisley
// @name	Black Google
// @namespace	http://benknisley.co.cc
// @version	0.1
// @description	Make Google dark to match your soul... or just to make it easy on the eyes, and look really cool.    
// @include		https://www.google.com/
// @include		http://www.google.com/
// @updateURL
// @copyright  None, Free to the world!!!
// ==/UserScript==
document.getElementById('gstyle').innerText = document.getElementById('gstyle').innerText + "body{background: black;}"
body.innerHTML = body.innerHTML.replace("/images/srpr/logo4w.png","http://upload.wikimedia.org/wikipedia/commons/3/30/Googlelogo.png");