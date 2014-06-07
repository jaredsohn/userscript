// ==UserScript==
// @name           Larkinor Asas Elovalaszto
// @namespace      Larkinor
// @author         L4rk1.F4n
// @description    Larkinor jatekban automatikusan kivalasztja az asas funkciot
// @include        http://larkinor.index.hu/*
// @version        1.001
// @last update    2010.07.10
// ==/UserScript==


var x = document.getElementsByTagName('option');
for(var i = 0; i < x.length; i++){if (x[i].value == 'as'){x[i].selected = true;}}