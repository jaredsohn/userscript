// ==UserScript==
// @name           Add All in mobile Orkut
// @namespace      Mr.x
// @description    Add...!!!
// @include        http://m.orkut.com/Home.aspx
// ==/UserScript==

i=0;
if(document.body.innerHTML.match('Action.acceptFriend')=="Action.acceptFriend"){
add();
}

function add(){
window.setTimeout(function () {document.forms[i].elements[3].click();i++;}, 500);
}