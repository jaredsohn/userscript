// ==UserScript==
// @name           E-Petitions auto filler
// @description    Automatically fill in 10 Downing Street e-petitions with your details for faster sign up.
// @namespace      http://world3.net
// @include        http://petitions.pm.gov.uk/*
// ==/UserScript==

var form = document.forms.namedItem('signForm');
var name = form.elements.namedItem('name');
var email = form.elements.namedItem('email');
var email2 = form.elements.namedItem('email2');
var address = form.elements.namedItem('address');
var postcode = form.elements.namedItem('postcode');

name.value="Your Name";
email.value="you@your.email";
email2.value="you@your.email";
address.value="Your Address\nUse backslash n to insert\nnew lines";
postcode.value="postcode";