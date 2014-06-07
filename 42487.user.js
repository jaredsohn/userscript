// ==UserScript==
// @name            MTV Music Flash/Ad cleanup
// @namespace       MTV Music Flash/Ad cleanup
// @include         http://www.mtvmusic.com/*
// ==/UserScript==
function do_platypus_script() {
var logo = document.getElementById("lenser");
logo.style.display = "none";

var logo = document.getElementById("top");
logo.style.display = "none";

logo = document.getElementById("ad1");
logo.style.display = "none";

logo = document.getElementById("footer");
logo.style.display = "none";

}; // Ends do_platypus_script

window.addEventListener("load", function() { do_platypus_script() }, false);


//.user.js