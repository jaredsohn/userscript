// ==UserScript==
// @name           googleBlank
// @namespace      local
// @description    Removes everything from Google
// @include        http://www.google.com/
// ==/UserScript==
function removeAll(){
document.getElementsByTagName('body')[0].innerHTML = "";
}

removeAll();