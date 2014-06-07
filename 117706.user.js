// ==UserScript==
// @name           Gir
// @namespace      https://ebeyanname.gib.gov.tr/giris.html
// @description    Gir Kocum
// @include        https://ebeyanname.gib.gov.tr/giris.html
// ==/UserScript==
var elm = document.getElementById("username");
elm.setAttribute('value', 'asari');
var elm = document.getElementById("password2");
elm.setAttribute('value', 'parola');
var elm = document.getElementById("password1");
elm.setAttribute('value', 'sifre');
document.getElementById("loginForm").submit();