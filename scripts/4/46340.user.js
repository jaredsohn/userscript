// Module qui classe les villes en ordre chronologique pour un script Greasemonkey particulier.


// ==UserScript==
// @name          ChronoVille (module)
// @namespace     D-
// @description   Classement chronologique des villes (case à cocher)
// @include       http://dummy/*
// ==/UserScript==

// Auteur: bluflonalgul

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html

//v1.1
// TP1

/////////////////////////////////////////////////////////////////////////////
// Module pour classer les villes par ordre chronologique dans les âmes

var ChronoVille = {  
	mcode: "chronoville", // code (nom court) du module. Propriété 'mcode' obligatoire!
	nodeId: "ChronoVilleId", // identifiant DOM pour le bidule à insérer, penser à en mettre un unique
	label: "ChronoVille",
	options: {
  	//icon: "XXXurl_iconXXX", // choix d'icone
    htmldesc: "Tri des villes de la plus récente à la plus ancienne, dans l'âme.<br>Voir l'option à côté du \"Masquer les villes V1\".",
    credits: "Bluflonalgul.",
  },
	mainNode: null, 
	checkboxNode: null,
}

ChronoVille.init = function() {
	ModMan.RegMod(this);
	ModMan.RegPlug(this,'LAME', this.install); //  c'est ici qu'on indique les pages où il doit se charger.
	// OU BIEN: ModMan.RegPlug(this,'XXXcodePageXXX', this.install, {icon: this.icon} );
}

ChronoVille.build = function() { // crée l'élément DOM à installer
	this.mainNode= document.createElement('div');
	this.mainNode.id= this.nodeId;
	this.checkboxNode = document.createElement('input');
	this.mainNode.appendChild(this.checkboxNode);
	this.checkboxNode.setAttribute('type','checkbox');
	this.checkboxNode.setAttribute('name','chronosort');
	var label= document.createElement('label');
	label.setAttribute('for','chronosort'); // à voir
	this.mainNode.appendChild(label);
	label.innerHTML= "Tri Chronologique";
	this.LoadPref(); // initialisation de la case à sa valeur cochée ou non  

	// événement clic à gérer:
	this.checkboxNode.addEventListener('change',ChronoVille.SavePref,false);
}

ChronoVille.LoadPref = function() { // charge l'option cochée
	this.checkboxNode.checked= GM_getValue(this.mcode+'_enable', true); // true par défaut.
	// synchro faite lors de l'install
}

ChronoVille.SavePref = function() { // sauve l'option cochée
	// PAS DE this ICI
	GM_setValue(ChronoVille.mcode+'_enable', ChronoVille.checkboxNode.checked);
	ChronoVille.SyncTable(); // synchro faite ici car clic de case à cocher.
}

ChronoVille.SyncTable = function() {
	ChronoVille.SortReplace(// opérateur ternaire retournant du regexp :
		ChronoVille.checkboxNode.checked?/id=([0-9]*)/:new RegExp('<td class="days">\\s*([0-9]+)\\s*</td>','m')
		); // 1er regexp: pour l'id de ville , 2e : pour le nb de jour.
}
/*
ChronoVille.SaveAsOriginal = function() { // garde la table d'origne (tbody)
// TODO: mémoriser le nom du user, si différent de l'actuel: cloner la table. (tbody)
	var tbody= $xpath('//div[@id="ghost_pages"]/div[@class="guser"]/div[@class="right"]/table/tbody', document, XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue
	if( tbody == null ) {
		GM_log("ChronoVille: tbody non trouvé!"); //Avertissement
		this.sauveOri= null;
		return false;
	}
	this.sauveOri= tbody; // A VOIR si clonage nécessaire...
}
*/
ChronoVille.SortReplace = function(regexpind) {  // parcours la table pour en faire une copie triée et la substituer
	// regexpind est un regexp qui permet de trouver l'indice de tri en 1er match mémorisant
	// TODO: vérifier que regexpind est un regexp
	// regexp pour l'id ville: /id=([0-9]*)/
	var tbody= $xpath('//div[@id="ghost_pages"]/div[@class="guser"]/div[@class="right"]/table/tbody', document, XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
	if( tbody == null ) {
		GM_log("ChronoVille: tbody non trouvé!"); //Avertissement
		return false;
	}
	var trs= $xpath("tr", tbody, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
	var tabtr= new Array();
	var cityno; // id de ville ( ou le nb de jour, suivant le regexp passé...)
	var tr= trs.iterateNext(); // init boucle ( les en-têtes )
	while ( tr != null ) {
		//cityno= regexpind.exec(tr.innerHTML);// A VOIR pour le cas non ingame
		// exec remplacé par un match car j'ai eu des pb avec exec ici: null une fois sur deux dans la boucle !
		cityno= tr.innerHTML.match(regexpind); // 
		if ( cityno == null ) { // en-têtes, restent en tête
			//GM_log("ChronoVille.SortReplace: cityno est null"); //DEBUG
			//GM_log("ChronoVille.SortReplace: innerHTML=\n"+tr.innerHTML); //DEBUG
			tabtr[0]= {node:tr.cloneNode(true),rank:99999999}; // désolé, en l'an 2020 bug !
		}else{
			//GM_log("ChronoVille.SortReplace: cityno="+cityno.toString()); //DEBUG
			tabtr[tabtr.length]= {node:tr.cloneNode(true),rank:cityno[1]}; // cityno[1] car regexp mémorisante
		}
		tr= trs.iterateNext(); // itération boucle
	}
	tabtr.sort(function(a,b){return b.rank - a.rank}) // tri par rang de ville descendant

	var newbody= document.createElement('tbody');
	for ( var i=0; i<tabtr.length; i++ ) {
		newbody.appendChild(tabtr[i].node);
	}
	tbody.parentNode.replaceChild(newbody,tbody);
}

/*
// TODO éventuellement à déplacer dans GenTools =>
ChronoVille.getGhostName = function() {   // renvoie le pseudo affiché pour l'âme ( '_self_' si soi-même
	var strong= $xpath('//div[@id="ghost_pages"]/div[@class="guser"]/div[@class="banner"]/div[@class="side"]/strong', document, XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
	if ( strong != null ) {
		//var pseudo= /<.*?> (.*)/.exec(strong.innerHTML); 
		var pseudo=strong.innerHTML.match(/<.*?> (.*)/);// il y a un <img ...> et un espace avant le nom.
		return pseudo[1];
	}
	var moname= $xpath('//div[@id="ghost_pages"]/div[@class="guser"]/ul[@class="tabs"]/li[@class="selected"]/a', document, XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
	if ( moname != null && moname.innerHTML=="Mon âme") {
		return "_self_"; // à défaut d'avoir trouvé mon nom
	}
	return "";
}
*/
ChronoVille.install = function() { // install un élément
	// PAS DE this ICI
	if( $(ChronoVille.nodeId) != null ) { // impératif: tester si l'ajout est déjà installé.
		//GM_log("ChronoVille: bidule déjà là"); //DEBUG
		return false;
	}

	var tiny= $xpath('//div[@id="ghost_pages"]/div[@class="guser"]/div[@class="right"]/div[@class="tinyAction"]', document, XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue
	if( tiny == null ) {
		GM_log("ChronoVille: tinyAction non trouvé!"); //Avertissement
		return false;
	}
	//GM_log("ChronoVille.install: appel build..."); // DEBUG
	ChronoVille.build();
	//GM_log("ChronoVille.install: appenChild..."); // DEBUG
	tiny.appendChild(ChronoVille.mainNode);
	if (ChronoVille.checkboxNode.checked) 
		ChronoVille.SyncTable(); // trier en chrono
}

ChronoVille.init();

