// ==UserScript==
// @name        Biblioteka
// @namespace   alamakota
// @include     http://wbpg.org.pl:8080/*
// @version     1
// ==/UserScript==

var loginEdit = document.getElementById("form1:textField1");
loginEdit.autocomplete = "on";
var passwordEdit = document.getElementById("form1:passwordField1");
passwordEdit.autocomplete = "on";
