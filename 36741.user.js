// ==UserScript==
// @name           Nyit-Nyit
// @description    Deskripsi script
// @include        http://www.nyit-nyit.net/*
// @include        http://nyit-nyit.net/*
// @author        nyit-nyit
// ==/UserScript==

var signature = "i<a href="http://img379.imageshack.us/my.php?image=siggyfe6.jpg" target="_blank"><img src="http://img379.imageshack.us/img379/2979/siggyfe6.th.jpg" border="0" alt="Free Image Hosting at www.ImageShack.us" /></a><br /><br /><a href="http://img604.imageshack.us/content.php?page=blogpost&files=img379/2979/siggyfe6.jpg" title="QuickPost"><img src="http://imageshack.us/img/butansn.png" alt="QuickPost" border="0"></a> Quickpost this image to Myspace, Digg, Facebook, and others!";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature ; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,2000)
