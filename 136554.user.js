// ==UserScript==
// @name       fs-respond
// @namespace  formspring
// @version    0.1
// @description  Replaces Respond with pls respond in formspring inbox
// @include    http://www.formspring.me/account/inbox
// ==/UserScript==

var buttons = document.getElementsByClassName('btn btn-primary fright');

for (i=1;i<buttons.length;i++){
    buttons[i].setAttribute('value','Please respond');
}