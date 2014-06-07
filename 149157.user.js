// ==UserScript==
// @name       asixpoint blocker
// @namespace  http://yud1z.com/
// @version    0.1
// @description  block some annoying image in asixpoint forum
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==

document.getElementById("ad_global_below_navbar").innerHTML = "";
console.log("tes");
wek = document.getElementsByTagName("div");
wek[0].innerHTML = "";
wek[0].setAttribute("style", "");
wek = document.getElementsByTagName("body");
wek = wek[0]
wek.setAttribute("style", "margin-top: -100px;")