// ==UserScript==
// @name           Pierwszy skrypt
// @namespace      test@test.pl
// @description    Skrypt dodaje guzik wyswietlajacy ilosc metalu
// @include        http://umkis.pl/*
// @include        http://www.umkis.pl/*
// ==/UserScript== 

var OldDiv = document.getElementById('content');
OldDiv.style.color = "red";