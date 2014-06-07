// ==UserScript==
// @name        JdeG
// @namespace   JdeG
// @description conexión automática para el LDC de JdG
// @include     http://prodgame05.lordofultima.com/255/index.aspx
// @version     0.1
// ==/UserScript==
setTimeout(function(){
window.open('http://louinter.net23.net/LDC v0.928 full/login.php?s='+encodeURIComponent(window.location+'?sessionId='+SessionId))
},3000);