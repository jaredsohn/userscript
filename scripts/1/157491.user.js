// ==UserScript==
// @name           Gmail Account
// @version        Ver. 0.1
// @namespace      Gmail
// @description    Update email
// @include        *mail.google.com/mail/?shva=1#settings/accounts
// ==/UserScript==

var updbtns=new Array();
var elements = document.getElementsByTagName('span');
for (var i = 0; i < elements.length; i++) {
     if (elements[i].innerHTML == "Scarica posta ora") {
         updbtns.push(elements[i]);
     }
}

window.setInterval(function(){Update()},3000);

function Update()
{
	alert(updbtns.length);
}
