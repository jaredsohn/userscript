// ==UserScript==
// @name           FzzzColoSorter v1.0
// @namespace      none
// @include        http://*.fourmizzz.fr/Membre.php?Pseudo=*
// @include        http://*.antzzz.org/Membre.php?Pseudo=*
// @author         Juju31
// ==/UserScript==

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var colos = document.querySelector('.boite_membre').querySelectorAll('a');
colos = Array.prototype.slice.call(colos, 0);
colos.pop();

if(colos[0].parentElement.previousElementSibling.innerHTML == 'Alliance :'){
    colos.shift();
}
if(colos[0].parentElement.previousElementSibling.innerHTML == 'Etat : '
  || colos[0].parentElement.previousElementSibling.innerHTML == 'State : ' ) {
    colos.shift();
}
if(colos.length == 0){
    return;
}

colos.sort(function(a, b){
 var nameA=a.innerHTML.toLowerCase(), nameB=b.innerHTML.toLowerCase()
 if (nameA < nameB) //sort string ascending
  return -1
 if (nameA > nameB)
  return 1
 return 0 //default return value (no sorting)
});

var div = document.createElement('div');
div.className = 'boite_membre';
div.innerHTML = '<h4>Colonies</h4>';
div.innerHTML += '<a href="#" id="afficherListe" onCLick="document.getElementById(\'listeColo\').style.display=\'\';'
                + 'document.getElementById(\'cacherListe\').style.display=\'\';'
                + 'document.getElementById(\'afficherListe\').style.display=\'none\';'
                + 'return false;">Afficher la liste</a>';
div.innerHTML += '<a href="#" id="cacherListe" onCLick="document.getElementById(\'listeColo\').style.display=\'none\';' 
                + 'document.getElementById(\'cacherListe\').style.display=\'none\';'
                + 'document.getElementById(\'afficherListe\').style.display=\'\';'
                + 'return false;" style= "display:none" >Cacher la liste</a>';
div.innerHTML += '<br/><br/>';
insertAfter(document.querySelectorAll('.boite_membre')[1],div);

var divListe = document.createElement('div');
divListe.id = 'listeColo';
divListe.setAttribute('style', 'display:none;text-align:left; padding-left:15%; padding-bottom:10px; column-count: 3; -moz-column-count:3; -webkit-column-count: 3;');
div.appendChild(divListe);

for(i=0;i<colos.length;i++){
    var br = document.createElement('br');  
    colos[i].parentElement.parentElement.remove();
    divListe.innerHTML +='- ';
    divListe.appendChild(colos[i]);
    divListe.appendChild(br);
}