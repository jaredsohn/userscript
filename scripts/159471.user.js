// ==UserScript==
// @name        addFriend
// @namespace   pyroscript_ajoute_lienAmitie
// @include     http://*.equideow.com/joueur/fiche/?id=*
// @version     1.1.1
// ==/UserScript==
var joueurMonde = document.location.host.split('.')[0] ;
var joueurNom = document.getElementById('sortable').getElementsByTagName('h1')[0].innerHTML ;

var li_style = document.getElementById('sortable').getElementsByTagName('ul')[0].getElementsByTagName('li')[0].getAttribute('style') ;
var lien_add = 'http://'+joueurMonde+'.equideow.com/member/social/friendCreate?login='+joueurNom ;
var lien_ico = 'http://'+joueurMonde+'.equideow.com/media/equideo/image/fonctionnels/20/friend.png' ;

var new_li = document.createElement('li') ;
new_li.setAttribute('style',li_style) ;
new_li.innerHTML = '<a href="'+lien_add+'"><img src="'+lien_ico+'" /> Ajouter &agrave; mes amis</a>' ;
document.getElementById('sortable').getElementsByTagName('ul')[0].appendChild(new_li) ;