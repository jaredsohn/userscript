// ==UserScript==
// @name           Numerama | Anti-trolls
// @description    Permet de cacher définitivement les commentaires d'un utilisateur
// @namespace      numerama
// @version        1.0
// @include        http://www.numerama.com/magazine/*
// ==/UserScript==

var trolls = GM_getValue("trolls");
if(!trolls)
 trolls = [];
else
 trolls = JSON.parse(trolls);

var rmtrolls = function(){
  var comments = document.getElementsByClassName('bloc_comment_content');
  for(var i=0; i<comments.length; i++){
  for(troll in trolls){
    if(comments[i].children[1].children[0].children[0].children[0].innerHTML == trolls[troll])
    comments[i].parentNode.removeChild(comments[i]);    
  }
 }
}

var add2trolls = function(e){
 trolls[trolls.length] = this.parentNode.children[0].innerHTML;
 GM_setValue("trolls", JSON.stringify(trolls));
 rmtrolls();
 e.preventDefault();
 return;
}

var addtrollbtns = function(){
  var a = document.createElement('a');
  a.href = '#';
  a.innerHTML = ' [Troll]';
  
  var comments = document.getElementsByClassName('bloc_comment_content');
  for(var i=0; i<comments.length; i++){
   ac = a.cloneNode(true);
   comments[i].children[1].children[0].children[0].appendChild(ac);
   ac.addEventListener('click', add2trolls, true);
  }
}

rmtrolls();
addtrollbtns();
