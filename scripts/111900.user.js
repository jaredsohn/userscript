// ==UserScript==
// @name           miptgirls
// @namespace      2
// @description    mЫptGRILS
// @include        http://miptgirls.appspot.com/
// ==/UserScript==


var btn1 = document.createElement('button');
btn1.setAttribute('type', 'submit');
btn1.setAttribute('autofocus', '');

var btn1_img = document.createElement('img');
btn1_img.setAttribute('src', 'http://shiitman.lenin.ru/bio/logo1.gif');
var btn1_b = document.createElement('h2');
var btn1_text = document.createTextNode('In Da BioReaktor!!');

btn1_b.appendChild(btn1_text);
btn1.appendChild(btn1_img);
btn1.appendChild(btn1_b);

document.forms[0].elements[3].parentNode.replaceChild(btn1, document.forms[0].elements[3]);