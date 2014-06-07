// ==UserScript==
// @name           plonk_forumConstruire
// @namespace      http://forumconstruire.com/*
// @description    ne plus afficher les messages des gens qu'on a pas envie de lire...
// @grant       none
// @include        http://www.forumconstruire.com/construire/*
// ==/UserScript==

var tmp = document.getElementsByClassName("postbox_forum"); 
var Exp = new RegExp("labricotier|conducteur01"); // ajouter ici les pseudos séparés par des | 
var toDelete= new Array();

var Pub = new RegExp("Publicité");

var tmp2 = document.getElementsByClassName("forum_pseudo_box_link"); 
for (var i = 0; i < tmp2.length; i++) {
    var aname=tmp2[i].innerHTML;
    if (Exp.test(aname)) {
        toDelete.push(tmp2[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode); 
    }
}
var tmp2 = document.getElementsByClassName("forum_pseudo_box"); 
for (var i = 0; i < tmp2.length; i++) {
    var aname=tmp2[i].innerHTML;
    if (Pub.test(aname)) {
        toDelete.push(tmp2[i].parentNode.parentNode.parentNode.parentNode.parentNode); 
    }
}



for (var i = 0; i < toDelete.length; i++){
    var nn = toDelete[i];
    nn.parentNode.removeChild(nn);
    
}
