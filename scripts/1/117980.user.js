// ==UserScript==
// @name       Speedy
// @version    0.1
// @description  Speedyshare
// @include    http://www.speedyshare.com/file*
// @include    http://speedyshare.com/file*
// @include    www.speedyshare.com/file*
// ==/UserScript==

inittimer();
secondscounter(1);
document.getElementById("prem").innerHTML="Wait...";
var sth = setTimeout("document.getElementById('prem').innerHTML='Ready!';", 15000);