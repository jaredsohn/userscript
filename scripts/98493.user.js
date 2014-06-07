// ==UserScript==
// @name           e36club
// @namespace      e36club.ru
// @include        http://e36club.ru/forum/*
// ==/UserScript==

document.body.style.background="url(http://www.valar.ru/gallery/0311/36_bg.gif)";


var abc = document.getElementById("header_right_cell");
if(abc != null){abc.parentNode.removeChild(abc);}

var vbn = document.getElementById("aw0");
if(vbn != null){vbn.parentNode.removeChild(vbn);}

var vbnm = document.getElementById("abgs");
if(vbnm != null){vbnm.parentNode.removeChild(vbnm);}

var top_line1 = document.getElementById("y5_direct1");
if(top_line1 != null){top_line1.parentNode.removeChild(top_line1);}

var top_line2 = document.getElementById("y5_direct2");
if(top_line2 != null){top_line2.parentNode.removeChild(top_line2);}

//--LogoReplace--//


var img = document.evaluate("//img[contains(@src, 'logo_phpBB.gif')]",document,null,9,null).singleNodeValue;
if (img){img.src = "http://cs9531.vkontakte.ru/u5952967/11665673/x_f1e30bd0.jpg"};
img.style.margin='0 0 0 10px';

//--KURILKA--//
but="<div style='position: absolute; left:350px; top:14px;' name='kur' id='kur'>"+
"<a style='color:white;' href='http://e36club.ru/forum/forumdisplay.php?f=127'><img src='http://ik-13th.clan.su/e36/kurilka.gif'></a>"+
"</div>";
var kur = document.createElement("div");
kur.innerHTML = but;
document.body.insertBefore(kur, document.body.firstChild);
 
//--MOSKVA--//
but2="<div style='position: absolute; left:475px; top:14px;' name='mos' id='mos'>"+
"<a style='color:white;' href='http://e36club.ru/forum/forumdisplay.php?f=69'><img src='http://ik-13th.clan.su/e36/moskva.gif'></a>"+
"</div>";
var mos = document.createElement("div");
mos.innerHTML = but2;
document.body.insertBefore(mos, document.body.firstChild);

//--BORTOVIK--//
but3="<div style='position: absolute; left:600px; top:14px;' name='bor' id='bor'>"+
"<a style='color:white;' href='http://e36club.ru/forum/forumdisplay.php?f=136'><img src='http://ik-13th.clan.su/e36/bortovik.gif'></a>"+
"</div>";
var bor = document.createElement("div");
bor.innerHTML = but3;
document.body.insertBefore(bor, document.body.firstChild); 

