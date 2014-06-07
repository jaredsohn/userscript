// ==UserScript==
// @name           Bouton a Côt.
// @namespace      bluflonalgul/aAajAx
// @description   Bouton pour répondre "Côt." dans le forum.
// ==/UserScript==
// Auteur: bluflonalgul 2009-03-24, Remix by aAajAx

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html

/////////////////////////////////////////////////////////////////////////////
// Module pour répondre "Côt."
var CotModule = {  
	mcode: "Cot", /// code (nom court) du module. Propriété 'mcode' obligatoire!
	cotbuttonId: "CotId", // identifiant DOM pour le bidule à insérer, penser à en mettre un unique (le changer)
	label: "Répondre Côt.",
	options: {
  	htmldesc: "Ajoute un bouton pour répondre \"Côt.\" dans les sujets ville. Ne pas en abuser !<br><em>(sinon il faudra un module pour ignorer les messages \"Côt.\")</em>",
  	icon: "http://www.hordes.fr/gfx/forum/smiley/h_sick.gif", // icone alcoolique
  	credits: "bluflonalgul & aAajAx."
  },
	cotbutton: null, // bouton cot, initialisé à la première install.
	cotform: null, // formulaire de réponse, recréé à chaque clic de bouton cot
}

CotModule.init = function() {
	ModMan.RegMod(this); // ModMan.modules.Cot => {label: "Module fictif", hide: false}
	ModMan.RegPlug(this,'FVSJ', this.install); // c'est ici qu'on indique les pages où il doit se charger.
}

CotModule.init2 = function() { // initialisations de première install. TODO: à vrai dire une fois le cotbutton installé il ne peut pas être réinstallé ailleurs je pense, vérifier les cas où cela pourrait arriver car une erreur DOM pourrait se produire.
	this.cotbutton= document.createElement('a');
	this.cotbutton.href="#saloon"; // ne servira pas
	this.cotbutton.id=CotModule.cotbuttonId;
	this.cotbutton.addEventListener('click', function(evt) {
		evt.preventDefault();
		CotModule.btnAction();
		}, false);
	//this.cotbutton.class="button"; // ne fonctionne pas
	this.cotbutton.setAttribute('class', 'button');// mimétisme
	this.cotbutton.innerHTML="<img alt=\"\" src=\"http://www.hordes.fr/gfx/forum/smiley/h_arrow.gif\"/> Repondre Côt."; //
}

CotModule.build = function() { // formulaire éclair
	this.cotform= document.createElement('form');
	this.cotform.id="forum";
	var txtarea= document.createElement('textarea');
	txtarea.name="ed_forum_content";
	this.cotform.appendChild(txtarea);
	var sbmt= document.createElement('input');
	sbmt.type="submit";
	sbmt.name="submit";
	sbmt.value="Je VALIDE vite fait";
	sbmt.setAttribute('class', 'button');// TODO enlever si inutile
	this.cotform.appendChild(sbmt);
}

CotModule.install = function() {
	// PAS DE this ICI
	if( $(CotModule.cotbuttonId) != null ) { // impératif: tester si l'ajout est déjà installé.
		//GM_log("CotModule: bidule déjà là"); //DEBUG
		return false;
	}
	var GSnode= $('generic_section');
	var action1;
	var action2= null;
	if ( GSnode == null ) {
		GM_log("CotModule: [bug] generic_section non trouvé"); //DEBUG
		return false;
	}
	try {
		var actions = $xpath("div[@class='thread']/div[@class='actions']", GSnode,XPathResult.ORDERED_NODE_ITERATOR_TYPE); 
		//GM_log("CotModule: pb1"); // DEBUG
		action1 = actions.iterateNext();
		//GM_log("CotModule: pb2"); // DEBUG
		action2 = actions.iterateNext(); // la 2e zone action
		//GM_log("CotModule: pb3"); // DEBUG
		if ( action2 == null )
			throw (new Error("Action2 non trouvée"));
		//GM_log("CotModule: ok try"); // DEBUG
		var btn= $xpath("a[@class='button off']", action2,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
		if ( btn )
		  throw (new Error("Message verrouilé"));
		var suiv= $xpath("div[@class='thread']/div[@class='paginate']/ul/li[@class='next']/a", GSnode,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
    if ( suiv )
      throw (new Error("Pas le dernier message, comment répondre \"Côt.\"!")); 
	}
	catch (e) {
		//GM_log("CotModule: Pas d'action de message valide, exception: "+e.message); // DEBUG ou info...
		return false;
	}
	if ( CotModule.cotbutton == null)
		CotModule.init2(); // créer le bouton
	//var cleardiv= action2.lastChild; // éventuellement le trouver par xpath
	var cleardiv= $xpath("div[@class='clear']", action2, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
	action2.insertBefore(CotModule.cotbutton,cleardiv);
}

CotModule.btnAction = function() {
	//alert("Côt.");
	var testform= $('forum');
	if ( testform != null ) 
		testform.parentNode.removeChild(testform); // refaire le formulaire à neuf
	this.build(); // reconstruit le formulaire
	$('generic_section').appendChild(this.cotform);
	this.cotform.firstChild.innerHTML="Côt."; //  1er élément est TextArea, pas top mais ça marche.
	var nodiscu= HorTools.getCurrentDiscuNo();
	unsafeWindow.js.XmlHttp.post('saloon/thread/'+nodiscu+'/saveReply?sk='+HorTools.getsk(),this.cotform); // finalement fonctionne, bon, bizarre que j'ai eu tant de pb.
	// autres tentatives:
	//this.cotform.setAttribute('onsubmit', "js.XmlHttp.post('saloon/thread/"+HorTools.getCurrentDiscuNo()+"/saveReply?sk="+HorTools.getsk()+"',this); return false;");
	// this.cotform.submit();
}

CotModule.init();

