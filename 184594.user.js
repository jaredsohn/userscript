// ==UserScript==
// @name        Donate Dr.  Meth
// @namespace   *
// @include     http://drmeth.com/*
// @version     1.1
// @grant       none
// ==/UserScript==


donButt = document.createElement("input");
donButt.type = "button";
donButt.value = "unlock Donor";
donButt.addEventListener('click',	
						function() {createCookie("donate","2",30);}
						);
placeHolder = document.getElementById("button");
placeHolder.appendChild(donButt);