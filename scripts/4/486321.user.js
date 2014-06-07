// ==UserScript==
// @name        Hello World
// @namespace   http://vhunters.com
// @include     *
// @version     1
// ==/UserScript==

var input=document.createElement("input");
input.type="button";
input.value="GreaseMonkey Button";
input.onclick = showAlert;
document.body.appendChild(input);
 
function showAlert()
{
    alert("Hello World");
}