// ==UserScript==
// @name           Travian4 Troops Movement
// @version        1.1.0
// @author         CADMiUM
// @copyright      cadmium
// @description    Show overall troops movement
// @include        http://*t*.travian.*/dorf1.php
// ==/UserScript==

function ID(id) { return document.getElementById(id) };
function exp(href) { return document.location.href.match(href) };
function C(value) { return parseInt(value) };

function dorfNo(){
var rows = ID('movements').getElementsByTagName('tbody')[0].getElementsByTagName('tr').length, i, Exl = [];

ID('movements').getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].getElementsByTagName('th')[0].innerHTML += '(<span id="Exl">0</span>)';
                    for (i = 0; i < rows; i++) {
                        Exl[i] = ID('movements').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[1].getElementsByTagName('div')[0].getElementsByTagName('span')[0].innerHTML.replace(/\D/, '');
                        ID('Exl').innerHTML = C(C(ID('Exl').innerHTML) + C(Exl[i]));
};
}

if (exp(/dorf1/) && ID('production') && ID('troops')) { dorfNo(); };