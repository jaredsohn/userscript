// coding: utf-8

// ==UserScript==
// @name           Army building confirm
// @namespace      buildconfirm@ik
// @include        http://*.ikariam.tld/*
// ==/UserScript==

var buildForm = document.getElementById("buildForm");


if(buildForm != undefined)
	buildForm.addEventListener("submit",function(){return confirm('Are you sure you are building army?');},false);