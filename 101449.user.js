// ==UserScript==
// @name           for my work
// @namespace      http://userscripts.org/users/ranjitsachin
// @include        *
// ==/UserScript==

window.onload = clickbtn();

function clickbtn() {
if (document.getElementById("mainContent")) {
var z = document.getElementById("mainContent").getElementsByTagName("input")[0].value;

if (document.getElementById("r1").value == z) {
	document.getElementById("r1").checked ='checked';
}

if (document.getElementById("r2").value == z) {
	document.getElementById("r2").checked ='checked';
}

if (document.getElementById("r3").value == z) {
	document.getElementById("r3").checked ='checked';
}

if (document.getElementById("r4").value == z) {
	document.getElementById("r4").checked ='checked';
}

}

document.getElementById("submit").style.display = 'block';
document.getElementById("correct_ans_div").style.display = 'block';
if (document.getElementById("correct_ans_div")) {
var yy = document.getElementById("correct_ans_div");
var anchors = document.getElementById("correct_ans_div").getElementsByTagName("a");
var zz = anchors[0].href;
   ifrm = document.createElement("IFRAME");
   ifrm.setAttribute("src", zz);
   ifrm.style.width = 740+"px";
   ifrm.style.height = 480+"px";
ifrm.id = "myframe";
   yy.appendChild(ifrm); 
}

//document.getElementById("myframe").contentDocument.getElementsByTagName('div')[0].style.display = "none" 

//document.getElementById("myframe").contentDocument.getElementById("header").style.display = "none";

//document.getElementById("myframe").contentDocument.getElementById("submenu").style.display = "none";


}