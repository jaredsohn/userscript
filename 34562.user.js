// ==UserScript==
// @name           Password Protect Pages
// @namespace      http://userscripts.org/users/23652
// @description    Password protect pages
// @include        http://www.google.com/
// @copyright      JoeSimmons
// ==/UserScript==

function main() {
var uz = document.createElement('div');
uz.setAttribute('style', 'position:fixed;left:0px;top:0px;z-index:50000000;background:#fff;height:100%;width:100%');
uz.setAttribute('id', 'uz_white');
document.body.appendChild(uz);

var password = 'pass';
if(prompt('Password:')!=password) {uz.innerHTML='Incorrect password.';}
else {uz.style.display='none';}
}

setTimeout(main,0);