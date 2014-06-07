// ==UserScript==
// @name       HTML JS
// @namespace  http://htmljs.blogspot.com
// @version    0.4
// @description  Script automaticamente seleciiona a opção baixar sem instalador no site do baixaki
// @match      http://www.baixaki.com.br/download/*
// @copyright  2012+, You
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function(){
 
    var bt_install = document.getElementById('chkseminstall');

    if(bt_install)bt_install.click();
    
}, false);