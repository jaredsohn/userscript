// ==UserScript==
// @name           Maximize Gmail Viewable Area
// @namespace      http://0807313570F.googlepags.com/gmail
// @include        http*://mail.google.com/*
// ==/UserScript==

// Google bar - with other services link
var e = document.getElementById("gbar");
e.style.display="none";

// the line under bar
var e = document.getElementById("gbarl");
e.style.display="none";

// space bellow search box
var e = document.getElementById("nt1");
e.style.display="none";

// rhs user info
var u = document.getElementById("guser");
u.style.display="none";

// the logo
var e = document.getElementById("ds_inbox");
e.style.display="none";

// search bar
var s = document.getElementById("mt1");
s.style.display="none";

//the footer
var e = document.getElementById("ft");
//e.style.display="none";
e.innerHTML = s.innerHTML;
//e.appendChild = e.innerHTML + u.innerHTML;

//the invite box
var e = document.getElementById("nb_1");
e.style.display="none";

// ads
//var e = document.getElementById("ra");
//e.style.display="none";
//var e = document.getElementById("rb");
//e.style.display="none";
//var e = document.getElementById("rp");
//e.style.display="none";

// nav - enteri LHS navigation
//nds - inbox box
//nb_0 - label box
//nb_1 - invite box
