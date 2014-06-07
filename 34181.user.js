// coding: utf-8

// ==UserScript==
// @name         	囧囧有神的114投石兵
// @namespace      tsb@ik
// @include        http://*.ikariam.tld/*
// ==/UserScript==

var buildForm = document.getElementById("buildForm");


if(buildForm != undefined)
	buildForm.addEventListener("submit",function(){return confirm('看清楚，别点出114个投石咯。');},false);

