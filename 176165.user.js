// ==UserScript==
// @name         stronk
// @version      1.0
// @include      http://*.sofiawars.com/player/*
// @author       Mr_Rage
// @run-at       document-end
// ==/UserScript==

a = Number($('li.stat.odd:eq(0) .label .num').text());
b = Number($('li.stat:eq(0) .label .num').text());
c = Number($('li.stat.odd:eq(1) .label .num').text());
d = Number($('li.stat:eq(1) .label .num').text());
e = Number($('li.stat.odd:eq(2) .label .num').text());
f = Number($('li.stat:eq(2) .label .num').text());
g = Number($('li.stat.odd:eq(3) .label .num').text());


stats =  a+b+c+d+e+f+g;

$(".selected.active div div:contains('Показатели')").append(' - ' + stats + '');