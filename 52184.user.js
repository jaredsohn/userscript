// ==UserScript==
// @name           Ogame.fr - Réorganisation Empire V0.84
// @namespace      ?
// @include        http://uni*.ogame.fr/game/index.php?page=imperium*
// ==/UserScript==


(function() {

var inner = document.body.innerHTML ;

//Suppression des techno

var pos1 = inner.indexOf("Research-Head", 1)
var pos2 = inner.indexOf("Ships-Head", 1)

var exp = inner.substring(pos1, pos2) ;
var inner = inner.replace(exp,"") ;


//Repotionnement des vaisseaux/défenses en dessous des ressources

var pos1 = inner.indexOf("Ships-Head", 1)
var pos2 = inner.indexOf("Footer", 1)

var exp = inner.substring(pos1, pos2) ;
var inner = inner.replace(exp,"") ;

var pos1 = inner.indexOf("Buildings-Head", 1)

var inner = inner.substring(0, pos1) + exp + inner.substring(pos1);

document.body.innerHTML = inner ;

  }
)(); 


