// ==UserScript==
// @name        Neopets: Grumpy King Auto-fill
// @namespace   Neopets: Grumpy King Auto-fill
// @description What do you do if fierce Peophins has eaten too much tin of olives?
// @include     http://www.neopets.com/medieval/grumpyking.phtml
// @version     1
// ==/UserScript==

document.getElementById("qp1").value = "What";
document.getElementById("qp2").value = "do";
document.getElementById("qp3").value = "you do if";
document.getElementById("qp4").value = "";
document.getElementById("qp5").value = "fierce";
document.getElementById("qp6").value = "Peophins";
document.getElementById("qp7").value = "";
document.getElementById("qp8").value = "has eaten too much";
document.getElementById("qp9").value = "";
document.getElementById("qp10").value = "tin of olives";


document.getElementById("ap1").selectedIndex = Math.ceil(Math.random()*5);
document.getElementById("ap2").selectedIndex = Math.ceil(Math.random()*5);
document.getElementById("ap3").selectedIndex = Math.ceil(Math.random()*5);
document.getElementById("ap4").selectedIndex = Math.ceil(Math.random()*5);
document.getElementById("ap5").selectedIndex = Math.ceil(Math.random()*5);
document.getElementById("ap6").selectedIndex = Math.ceil(Math.random()*5);
document.getElementById("ap7").selectedIndex = Math.ceil(Math.random()*5);
document.getElementById("ap8").selectedIndex = Math.ceil(Math.random()*5);