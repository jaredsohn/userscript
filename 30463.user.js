// ==UserScript==
// @name           MyHeritage
// @namespace      Aymeric de Pas
// @include        http://*myheritage*/person*/*
// @description    Change link Maps from MyHeritage in link View in tree
// ==/UserScript==
(function() {
  var actions = document.getElementById('actions');
  var links = actions.getElementsByClassName('LineLink');
  var root;
  var s;
  var i=2;
  // if exist photo then not the same number of link 
  while (root === undefined && i<links.length){
    root = links[i].href.split('root=')[1];
    s = links[i].href.split('s=')[1];
    if( s !== undefined) {
      s = s.split('&root')[0];}
    i++;
  }
  //changement of maps link
  if(links[links.length-2].innerHTML=='Cartes'){
    //French language
    links[links.length-2].innerHTML = "Voir dans l'arbre";}
  else {
    //Others
    links[links.length-2].innerHTML = "View in tree";}
  links[links.length-2].href = "../FP/family-tree.php?s="+s+"&rootIndivudalID="+root;
})(); 

