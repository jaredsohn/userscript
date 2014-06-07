// Module qui rend visible tous les derniers mots d'une ville passée pour un script Greasemonkey particulier.


// ==UserScript==
// @name          DerniersMots (module)
// @namespace     D-
// @description   Afficher les derniers mots des citoyens pour une ville passée.
// @include       http://dummy/*
// ==/UserScript==

// Auteur: Bluflonalgul

// v1.1
// TP1
// v1.2

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html

/////////////////////////////////////////////////////////////////////////////
// Module Afficher les derniers mots des citoyens pour une ville passée.

var DerniersMots = {  
  mcode: "derniersmots", // code (nom court) du module. Propriété 'mcode' obligatoire!
  label: "Derniers Mots", // libellé du module pour la liste
  options: {
    icon: "gfx/forum/smiley/h_chat.gif", // choix d'icone
    htmldesc: "Rend visible tous les derniers mots d'une ville passée.", // description plus longue
    credits: "Bluflonalgul, revue du code: Leedo.",
  },
  tagAttr: "DerniersMotsAttr", // attribut marqueur pour le tbody
  conv: {
"Attaque dehors": "gfx/icons/r_doutsd.gif",
"Attaque en ville": "gfx/icons/r_dcity.gif",
"Déshydratation": "gfx/icons/r_dwater.gif",
"Infection": "gfx/icons/r_dinfec.gif",
"Pendaison": "gfx/icons/r_dhang.gif",
"Pénurie de drogue": "gfx/icons/r_ddrug.gif",
"Cyanure": "gfx/icons/item_cyanure.gif",
"Meurtre (poison) !": "gfx/icons/item_poison.gif",
"Raison inconnue": "gfx/forum/smiley/h_death.gif",
  },

}

DerniersMots.init = function() {
  ModMan.RegMod(this); // inscription du module
  ModMan.RegPlug(this,'VLLE', this.Expand); //  c'est ici qu'on indique les pages où il doit se charger (un seul code de page à la fois)
}

DerniersMots.convert = function(txt) { // change le texte de raison de mort en icone
  var iref= this.conv[txt] || "gfx/forum/smiley/h_middot.gif";
  return "<img alt=\"\" src=\""+iref+"\" title=\""+txt+"\"/>";
}

DerniersMots.Expand = function() { // transforme
  // PAS DE this ICI
  var tbody= $xpath('//div[@id="ghost_pages"]/div[@class="ghistory"]/table/tbody', document, XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
  if( tbody == null ) {
    GM_log("DerniersMots: tbody non trouvé!"); //Avertissement
    return false;
  }
  if (tbody.hasAttribute(DerniersMots.tagAttr)) { // transformation déjà faite.
    //GM_log("DerniersMots.Expand: transformation déjà faite."); // DEBUG 
    return false;
  }
  //=> variables de boucle:
  var tabtr= new Array();
  var trs= $xpath("tr", tbody, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
  var tr= trs.iterateNext(); // init boucle ( les en-têtes )
  //=> en-tête:
  tabtr[0]= tr.cloneNode(true);
  //tabtr[0].innerHTML="<th>Jour</th><th>Score</th><th>Citoyen</th><th>Mort</th><th>Derniers mots</th><th>Commentaire</th>"; // pb: passe pas les balises...
  var trh4= document.createElement('th');
  trh4.innerHTML= "Derniers mots";
  tabtr[0].insertBefore(trh4, $xpath("th[4]", tabtr[0], XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue.nextSibling ); // inséré juste après le 4e th
  //=> variables de boucle, suite:
  tr= trs.iterateNext(); // première ligne de citoyen
  var ind, // indice employé comme indice de tabtr
      mort, // noeud td de mort
      over, // texte de onmouseover sur td
      msg, // message de mort
      newtd, // td créé pour le message
      mort2, // td de mort tronqué
      raison, // raison de la mort
      xxx;
  while ( tr != null ) {
    //var tds = $xpath("td", document,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
    // normalement 5 éléments // TODO: tester ?
    ind=tabtr.length; // ou bien incrémentation, ok aussi.
    tabtr[ind]= tr.cloneNode(true); // ajout délément au tableau, cloné car on fait un iterate.
    mort= $xpath("td[4]", tabtr[ind], XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
    // TODO tester ok?
    over= mort.getAttribute("onmouseover");
    //GM_log("DerniersMots.Expand: mort over=\n"+over);//DEBUG
    msg= over.match(/Son message de mort :<\/strong> (.*?)'\);/);
    if ( msg )
      msg=msg[1].replace(/\\'/,"'"); // chaîne mémorisée, + change \' en '
    else
      msg="";
    //GM_log("DerniersMots.Expand: msg="+msg);//DEBUG
    newtd= document.createElement('td');   
    newtd.innerHTML= "<em>"+msg+"</em>";
    tabtr[ind].insertBefore(newtd,mort.nextSibling); // on ajoute une colonne après la raison de mort
    // Réduire la colonne mort:
    raison= mort.innerHTML;
    raison= GenTools.trimSpace(raison.replace(/<.*/,""));
    mort2= document.createElement('td');
    mort2.innerHTML= DerniersMots.convert(raison);
    tabtr[ind].replaceChild(mort2,mort);
    // ligne suivante !
    tr= trs.iterateNext(); // itération boucle
  }
  var newbody= document.createElement('tbody');
  newbody.setAttribute(DerniersMots.tagAttr,"done"); // marqueur
  for ( var i=0; i<tabtr.length; i++ ) {
    //GM_log("DerniersMots.Expand: construction du nouveau tbody, i="+i);//DEBUG
    newbody.appendChild(tabtr[i]);
  }
  //GM_log("DerniersMots.Expand: Remplacement...");//DEBUG
  tbody.parentNode.replaceChild(newbody,tbody);

}

DerniersMots.init();

