// ==UserScript==
// @name           Cleaner
// @namespace      Pacninja
// @include        http://thepiratebay.org/
// ==/UserScript==
document.getElementsByTagName("div")[2].innerHTML="<b>Search Torrents</b>"
document.getElementsByTagName("a")[0].style.display="none"
document.getElementsByTagName("p")[0].style.display="none"
document.getElementsByTagName("p")[1].style.display="none"
document.getElementsByTagName("input")[9].style.display="none"
document.getElementsByTagName("label")[3].innerHTML=document.getElementsByTagName("label")[3].innerHTML.replace("lication","")
document.getElementsByTagName("td")[4].style.display="none"
document.getElementsByTagName("td")[0].style.display="none"
var num = document.getElementsByTagName("a").length
for(var i=2; i<num; i++){
	document.getElementsByTagName("a")[i].style.display="none"
}