// ==UserScript==
// @name 	jfords
// ==/UserScript==

if(document.title == "Gallery Not Available - ExHentai.org") {
var param = location.href.split('/');
document.location.href = "http://exhentai.org/codegen.php?gid=" + param[4] + "&t=" + param[5] + "&s=1-m-y&type=html&htmlfw=1";
}

if (document.location.href.indexOf("http://exhentai.org/codegen.php?gid=") != -1) {
document.addEventListener("DOMContentLoaded", display_gal, true);
}

function display_gal() {
var code = document.getElementsByTagName("textarea");
document.open();
document.write(code[0].value);
document.close();
document.releaseEvents();
} 