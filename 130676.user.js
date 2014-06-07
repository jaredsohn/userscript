// ==UserScript==
// @name       Google+: Whitespace Filler
// @namespace  http://www.somethingafal.com/
// @version    0.1
// @description  Fills the whitespace on the new G+
// @match      https://plus.google.com/*
// @copyright  2012+, Dafydd "Afal" Francis
// ==/UserScript==

var content = document.getElementById("contentPane").children[0].children[2].children[0];

for (var i = 0; i < content.children.length; i++) {
    content.children[i].className += " zup";
}

content.innerHTML += '<img id="trollfacedotjaypeg" src="http://i.imgur.com/T9tLf.jpg"><style>#trollfacedotjaypeg{position:fixed;top:200px;}.zup{display:none;}</style>';