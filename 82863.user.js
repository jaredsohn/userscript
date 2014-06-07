// ==UserScript==
// @name           Df homechanger
// @namespace      Dfhc
// @description    Changes the drugs-forum homepage to be a little more user-friendly
// @include        http://www.drugs-forum.com/index.php*
// ==/UserScript==

var marq = document.getElementsByTagName('marquee');
marq[0].setAttribute('scrollamount','5');
var scramt = marq[0].getAttribute('scrollamount');
var marpppp = marq[0].parentNode.parentNode.parentNode.parentNode;
location.href='javascript:void(changeSpeed=function(va){var marq = document.getElementsByTagName("marquee"); var direc = marq[0].getAttribute("direction"); if (direc != "right") { var direc = "left"; } var scramt = marq[0].getAttribute("scrollamount"); var speeds = parseInt(scramt)+parseInt(va); if ((direc == "left") && (speeds < 0)) { var direc = "right"; marq[0].setAttribute("direction",direc); var justdone = 1; } if (direc == "right") { var vat = parseInt(va)-(parseInt(va)*2); var speeds = parseInt(scramt)+parseInt(vat); } if ((direc == "right") && (speeds < 0) && (justdone != 1)) { var direc = "left"; marq[0].setAttribute("direction",direc); var vat = parseInt(va); var speeds = parseInt(scramt)+parseInt(vat); } if (speeds <= 30) { marq[0].setAttribute("scrollamount",speeds); }})';
marpppp.innerHTML += "<a href='#' onclick='changeSpeed(5);'>&lt;&lt;</a>     <a href='#' onclick='changeSpeed(-5);'>&gt;&gt;</a>";
