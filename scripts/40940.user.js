// Module Répondre "Gné ?" pour un script Greasemonkey particulier.

// ==UserScript==
// @name          Gné ?
// @namespace     D-
// @description   Bouton pour répondre "Gné ?" dans le forum.
// ==/UserScript==
// Auteur: bluflonalgul 2009-03-24

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html

// TP1

/////////////////////////////////////////////////////////////////////////////
// Module pour répondre "Gné ?"
var GneModule = {  
	mcode: "Gne", /// code (nom court) du module. Propriété 'mcode' obligatoire!
	gnebuttonId: "GneId", // identifiant DOM pour le bidule à insérer, penser à en mettre un unique (le changer)
	label: "Répondre Gné?",
	options: {
  	htmldesc: "Ajoute un bouton pour répondre \"Gné?\" dans les sujets ville. Ne pas en abuser !<br><em>(sinon il faudra un module pour ignorer les messages \"Gné ?\")</em>",
  	icon: "http://www.hordes.fr/gfx/forum/smiley/h_sick.gif", // icone alcoolique
  	credits: "Bluflonalgul."
  },
	gnebutton: null, // bouton gne, initialisé à la première install.
	gneform: null, // formulaire de réponse, recréé à chaque clic de bouton gné
}

GneModule.init = function() {
	ModMan.RegMod(this); // ModMan.modules.Gne => {label: "Module fictif", hide: false}
	ModMan.RegPlug(this,'FVSJ', this.install); // c'est ici qu'on indique les pages où il doit se charger.
}

GneModule.init2 = function() { // initialisations de première install. TODO: à vrai dire une fois le gnebutton installé il ne peut pas être réinstallé ailleurs je pense, vérifier les cas où cela pourrait arriver car une erreur DOM pourrait se produire.
	this.gnebutton= document.createElement('a');
	this.gnebutton.href="#saloon"; // ne servira pas
	this.gnebutton.id=GneModule.gnebuttonId;
	this.gnebutton.addEventListener('click', function(evt) {
		evt.preventDefault();
		GneModule.btnAction();
		}, false);
	//this.gnebutton.class="button"; // ne fonctionne pas
	this.gnebutton.setAttribute('class', 'button');// mimétisme
	this.gnebutton.innerHTML="<img alt=\"\" src=\"http://www.hordes.fr/gfx/forum/smiley/h_arrow.gif\"/> Repondre Gné ?"; //
}

GneModule.build = function() { // formulaire éclair
	this.gneform= document.createElement('form');
	this.gneform.id="forum";
	var txtarea= document.createElement('textarea');
	txtarea.name="ed_forum_content";
	this.gneform.appendChild(txtarea);
	var sbmt= document.createElement('input');
	sbmt.type="submit";
	sbmt.name="submit";
	sbmt.value="Je VALIDE vite fait";
	sbmt.setAttribute('class', 'button');// TODO enlever si inutile
	this.gneform.appendChild(sbmt);
}

GneModule.install = function() {
	// PAS DE this ICI
	if( $(GneModule.gnebuttonId) != null ) { // impératif: tester si l'ajout est déjà installé.
		//GM_log("GneModule: bidule déjà là"); //DEBUG
		return false;
	}
	var GSnode= $('generic_section');
	var action1;
	var action2= null;
	if ( GSnode == null ) {
		GM_log("GneModule: [bug] generic_section non trouvé"); //DEBUG
		return false;
	}
	try {
		var actions = $xpath("div[@class='thread']/div[@class='actions']", GSnode,XPathResult.ORDERED_NODE_ITERATOR_TYPE); 
		//GM_log("GneModule: pb1"); // DEBUG
		action1 = actions.iterateNext();
		//GM_log("GneModule: pb2"); // DEBUG
		action2 = actions.iterateNext(); // la 2e zone action
		//GM_log("GneModule: pb3"); // DEBUG
		if ( action2 == null )
			throw (new Error("Action2 non trouvée"));
		//GM_log("GneModule: ok try"); // DEBUG
		var btn= $xpath("a[@class='button off']", action2,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
		if ( btn )
		  throw (new Error("Message verrouilé"));
		var suiv= $xpath("div[@class='thread']/div[@class='paginate']/ul/li[@class='next']/a", GSnode,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
    if ( suiv )
      throw (new Error("Pas le dernier message, comment répondre \"Gné?\"!")); 
	}
	catch (e) {
		//GM_log("GneModule: Pas d'action de message valide, exception: "+e.message); // DEBUG ou info...
		return false;
	}
	if ( GneModule.gnebutton == null)
		GneModule.init2(); // créer le bouton
	//var cleardiv= action2.lastChild; // éventuellement le trouver par xpath
	var cleardiv= $xpath("div[@class='clear']", action2, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
	action2.insertBefore(GneModule.gnebutton,cleardiv);
}

GneModule.btnAction = function() {
	//alert("Gné?");
	var testform= $('forum');
	if ( testform != null ) 
		testform.parentNode.removeChild(testform); // refaire le formulaire à neuf
	this.build(); // reconstruit le formulaire
	$('generic_section').appendChild(this.gneform);
	this.gneform.firstChild.innerHTML="Gné ?"; //  1er élément est TextArea, pas top mais ça marche.
	var nodiscu= HorTools.getCurrentDiscuNo();
	unsafeWindow.js.XmlHttp.post('saloon/thread/'+nodiscu+'/saveReply?sk='+HorTools.getsk(),this.gneform); // finalement fonctionne, bon, bizarre que j'ai eu tant de pb.
	// autres tentatives:
	//this.gneform.setAttribute('onsubmit', "js.XmlHttp.post('saloon/thread/"+HorTools.getCurrentDiscuNo()+"/saveReply?sk="+HorTools.getsk()+"',this); return false;");
	// this.gneform.submit();
}

GneModule.init();

