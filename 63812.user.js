// ==UserScript==
// @name           Gizmodo Fix
// @namespace      http://userscripts.org/users/120469
// @include        http://gizmodo.com/
// @include        http://gizmodo.com/?p=*
// ==/UserScript==

var init = function(){

document.getElementById('wrapper').id='main';
document.body.innerHTML='<center>'+document.getElementById('main').innerHTML+'</center>';

};

init();