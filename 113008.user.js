// ==UserScript==
// @name           Rynok
// @namespace      neverlands.ru
// @include        *neverlands.ru/main.php*
// ==/UserScript==

function badtest() {
 for (var i=1; i < 10; i++) {
  window.setTimeout("input.value += " + i, 900)
 }
}

var form = document.getElementsByTagName('form')[0];
var input = form.getElementsByTagName('input')[9];
input.value = 1;
form.submit();
/*var inp = document.createElement('input');
inp.type = 'button';
inp.value = "Phalvb bsdeu lsc";
inp.onclick= "this.style.display='none';"
inp.className = 'lbut';
form.appendChild(inp);
*/


