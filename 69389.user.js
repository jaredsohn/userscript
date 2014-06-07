// ==UserScript==
// @name          Test1
// @fullname      Test1
// @author        xxxx
// @include       http://www.google.cz/search*
// ==/UserScript==

 
function modif(){
for (i=1;i<11;i++){
var ehtml = document.getElementsByTagName('h3')[i];
var link = ehtml.getElementsByTagName("a");  
var html = document.getElementsByTagName('h3')[i].innerHTML;
document.getElementsByTagName('h3')[i].innerHTML = html + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://www.google.com/webmasters/tools/removals-request?hl=cs&siteUrl=http://www.effectix.com/&urlt=" + link[0].href + "' target='_blank'>Vymazat</a>";
}
}


window.setTimeout(modif, 2000);