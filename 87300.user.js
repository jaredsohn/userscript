// ==UserScript==
// @name           Sharejunky Adblock bypass
// @namespace      Gousgounis
// @description    Adds a second button that bypasses Sharejunky adblock check
// @include        http://www.sharejunky.com/*
// ==/UserScript==

if (document.getElementById("msg1"))
SJmessage = document.getElementById("msg1");
NewElement = document.createElement('input');
NewElement.setAttribute('class', 'button');
NewElement.setAttribute('id', 'b1');
NewElement.setAttribute('type', 'submit');
NewElement.setAttribute('name', 'method_free');
NewElement.setAttribute('value', 'Bypass Adblock Check');
SJmessage.parentNode.insertBefore(NewElement, SJmessage);
