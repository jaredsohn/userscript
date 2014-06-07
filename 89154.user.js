// ==UserScript==
// @name           mafiosi banker
// @namespace      mafiosi banker
// @include        http://mafiosi.nl/bank.php
// @include        http://www.mafiosi.nl/bank.php
// ==/UserScript==

function pin(){
var table = document.getElementsByTagName('tbody')[0];
var bank = table.rows[1].cells[1].textContent;
var bank = bank.replace("$", "");
var bank = bank.replace(".", "");
var bank = bank.replace(".", "");
var bank = bank.replace(".", "");
document.getElementsByName('bedragover')[0].value = bank;
}


function stort(){
var table = document.getElementsByTagName('tbody')[0];
var zak = table.rows[5].cells[1].textContent;
var zak = zak.replace("$", "");
var zak = zak.replace(".", "");
var zak = zak.replace(".", "");
var zak = zak.replace(".", "");
document.getElementsByName('bedragover')[0].value = zak;
}


var button1 = document.createElement("button");
button1.id = 'pin';
var tekst = 'Pin';
var tekst2 = document.createTextNode(tekst);
button1.appendChild(tekst2);
var submit = document.getElementsByTagName('input')[3];
submit.parentNode.insertBefore(button1,submit);


var button2 = document.createElement("button");
button2.id = 'stort';
var tekst3 = 'Stort';
var tekst4 = document.createTextNode(tekst3);
button2.appendChild(tekst4);
var submit2 = document.getElementsByTagName('input')[4];
submit2.parentNode.insertBefore(button2,submit);

var pinbutton = document.getElementById('pin');
pinbutton.addEventListener('click', pin, false);

var stortbutton = document.getElementById('stort');
stortbutton.addEventListener('click', stort, false);