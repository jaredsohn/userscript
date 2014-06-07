// ==UserScript==
// @name       hack
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*chaos.pokemoninfinity.com/pages/members/index.php*
// @copyright  2012+, You
// ==/UserScript==

var a = document.getElementById("battleframetext");
var b = a.innerHTML;
var c = b.match(/Rattata/g);
var iframe = document.getElementById('snavi');
if (c=="Rattata") {
alert("Hello"); 
} else {
navig(this,'north');
}




