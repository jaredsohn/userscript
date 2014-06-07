// ==UserScript==
// @name       makethedifference.org Facebook Soother
// @namespace  http://bpasu.intania85.org/
// @version    0.1
// @description  enter something useful
// @match      https://makethedifference.org/*
// @copyright  2014, bpasu
// ==/UserScript==

var div0 = document.getElementById("facebook-modal");
div0.style.display = "none";
var div1 = document.getElementsByClassName("modal-backdrop");
div1[0].style.display = "none";