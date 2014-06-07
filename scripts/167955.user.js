// ==UserScript==
// @name           Mail Ad Remover Beta
// @description    Removes annoying Mail.ru animated and context adverts
// @author         Galchonok Gol
// @include        http://e.mail.ru/*
// @include        https://e.mail.ru/*
// @version        1.2
// ==/UserScript==

//Parent Element To animated and context adverts
grandparent = document.getElementById('ScrollBodyInner'); 
var removeMailAdverts = function(){
//Mail Adverts
document.getElementById('slot-container_2').style.visibility = 'hidden'; 
document.getElementById('slot-container_2').style.display = 'none';
document.getElementById('rb-context-left-slots').style.visibility = 'hidden';
document.getElementById('rb-context-left-slots').style.display = 'none';
document.getElementById('getmov230935510').style.visibility = 'hidden';
document.getElementById('getmov230935510').style.display = 'none';
};
//Below function happens whenever the contents of 
//grandparent change
grandparent.addEventListener("DOMSubtreeModified", removeMailAdverts, true);
//fires off the function to start with
removeMailAdverts();