// ==UserScript==
// @name           img in new post
// @namespace      
// @description    ajouter le lien gestion des images dans le formulaire nouveau billet de dotclear
// @include        */poster.php*
// ==/UserScript==
// version 1.0
// créé par papoo

var retour ='Retour à la liste des billets</a>';
var GestImg = ' | </li><li><img src="images/ico_image.png" alt="" /> <a href="images.php" target="_blank">Gestion des images</a></li>';


document.body.innerHTML = document.body.innerHTML.replace( retour, retour+GestImg );