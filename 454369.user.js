// ==UserScript==
// @name        Non Halal Additive highlighter
// @description A script that highlights meals with non Halal additives
// @namespace   http://userscripts.org
// @include     http://www.studierendenwerk-kaiserslautern.de/kaiserslautern/essen-und-trinken/tu-kaiserslautern/mensa/
// @include     http://www.studierendenwerk-kaiserslautern.de/kaiserslautern-en-US/food-and-beverages/tu-kaiserslautern-en-US/mensa-en-US/
// @version     0.2
// ==/UserScript==

function containsNonHalalAdditive(e){
 a = $(e).text();
 n = ["R", "S", "G", "K", "La", "Gt", "A"];
 for(i=0; i<n.length; i++){
  if (a.indexOf(n[i])>-1)
    return true;
 }
}


$(".counter-meal strong sup a").each(function (index){
  if(containsNonHalalAdditive(this)){
    $(this).closest("strong").css('background-color', "red");
  }
});