// ==UserScript==
// @name        GalaxyOnline2 Menu Remover
// @description Removes annoying GalaxyOnline2 menu.
// @include     http://go2kr.igg.com/*
// @version     1.03
// ==/UserScript==

//Parent Element To Menu
grandparent = document.getElementById('container'); 
var removeMenu = function(){
//Menus
document.getElementById('header').style.visibility = 'hidden'; 
document.getElementById('header').style.margin = '0pt auto'; 
document.getElementById('header').style.width = '0px'; 
document.getElementById('header').style.height = '0px'; 
document.getElementById('header').style.background = ''; 
document.getElementById('header').style.position = 'absolute'; 
document.getElementById('header').style.top = '-10000px'; 

document.getElementById('mainWrapper').style.visibility = 'hidden'; 
document.getElementById('mainWrapper').style.margin = '0pt auto'; 
document.getElementById('mainWrapper').style.width = '0px'; 
document.getElementById('mainWrapper').style.height = '0px'; 
document.getElementById('mainWrapper').style.background = ''; 
document.getElementById('mainWrapper').style.position = 'absolute'; 
document.getElementById('mainWrapper').style.top = '-10000px'; 

document.getElementById('game').style.height = '0px'; 
document.getElementById('game').style.width = '1200px'; 
document.getElementById('game').style.background = 'black'; 
document.getElementById('game').style.margin = '0 auto';


document.getElementById('container').style.height = '0px'; 
document.getElementById('container').style.background = 'black'; 



document.getElementById('SnsScSWF').style.width = '1200px'; 

}
grandparent.addEventListener("DOMSubtreeModified", removeMenu, true);

removeMenu();
