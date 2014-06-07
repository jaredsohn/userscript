// ==UserScript==
// @name           Generation-nt Anti Boulax
// @namespace      Generation-NT Anti Boulax
// @description    Masque les commentaires des gens habituellement non pertinents de Génération-nt.com
// @include        http://www.generation-nt.com/commenter/*
// ==/UserScript==

// Entrez ici le nom des membres GNT que vous ne souhaitez plus lire.
// Faites des copier/coller pour respecter la casse.
var boulax = ['Luchy','oldjohn','CodeKiller','DMZ','Remic','Céréal Killer'];

// Merci http://snippets.dzone.com/posts/show/2437
[].indexOf || (Array.prototype.indexOf = function(v,n){
  n = (n===null)?0:n;var j;
  for(j = n; j < this.length; j++) {
    if(this[j] === v) { 
       return j;
    }
  }
  return -1;
});

// http://snipplr.com/view/1696/get-elements-by-class-name/ 
function getElementsByClassName(classname, node)  {
    if(!node) { 
        node = document.getElementsByTagName("body")[0];
    }
    var a = [];var i;
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(i=0,j=els.length; i<j; i++) {
        if(re.test(els[i].className)) { a.push(els[i]);}
    }    
    return a;
}

div_auteur_list=getElementsByClassName('auteur');
var i;
for (i = 0; i < div_auteur_list.length; i++) {
	var div_auteur = div_auteur_list[i];
	// var pseudo_auteur=div_auteur.getElementsByTagName("a")[0].innerHTML.split(" ")[1];
        var pseudo_auteur=div_auteur.innerHTML.split(" ");
	pseudo_auteur.splice(0,1);
	pseudo_auteur=pseudo_auteur.join(' ');
	if (boulax.indexOf(pseudo_auteur) !== -1) {
		div_auteur.style.textDecoration="line-through";
		var div_texte=getElementsByClassName('texte',div_auteur.parentNode.parentNode);
		div_texte[0].style.display='none';
	}
}