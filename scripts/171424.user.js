// ==UserScript==
// @name        LoU LiNO LDC
// @namespace   MioXcio
// @description Connexion automatique au LDC LiNO
// @include     http://prodgame14.lordofultima.com/247/index.aspx
// @version     1
// ==/UserScript==

setTimeout(function(){
window.open('http://lino.netai.net//login.php?s='+encodeURIComponent(window.location+'?sessionId='+SessionId))
},3000);
