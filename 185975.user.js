// ==UserScript==
// @name        NelsonSarmiento
// @namespace   Nelsonsarmiento
// @description conexión automática para el LDC de Nelsonsarmiento
// @include     http://prodgame03.lordofultima.com/283/index.aspx
// @version     0.1
// ==/UserScript==
setTimeout(function(){
javascript:void(window.open('http://blackcrown1927.96.lt/LDC%20v0.932%20Full/login.php?s='+encodeURIComponent(window.location+'?sessionId='+SessionId),'ldc'))
},3000);