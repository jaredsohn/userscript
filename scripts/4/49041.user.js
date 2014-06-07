// ==UserScript==
// @name           Facebook venner
// @namespace      http://userscripts.org/users/90345
// @description    Ændrer "forbindelser" til "venner" på facebook.
// @include        http://www.facebook.com*
// ==/UserScript==



document.body.innerHTML = document.body.innerHTML.replace(/forbindelser/g,"venner");
document.body.innerHTML = document.body.innerHTML.replace(/forbindelse/g,"ven");