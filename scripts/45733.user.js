// coding: utf-8

// ==UserScript==
// @name           Domz Army Confirm
// @namespace      buildconfirm@ik
// @include        http://*.ikariam.tld/*
// ==/UserScript==

var buildForm = document.getElementById("buildForm");


if(buildForm != undefined)
	buildForm.addEventListener("submit",function(){return confirm('gs2 mu ba tlga gawen ito?? haha.. ^^.. GO BYBS!! ^^');},false);