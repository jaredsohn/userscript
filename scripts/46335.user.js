// Ceci n'est pas vraiment un script Greasemonkey .

// ==UserScript==
// @name          HorTools
// @namespace     D-
// @description   Outils HorTools
// @include       http://dummy/*
// ==/UserScript==

// Auteur bluflonalgul 2008-11 2009-03

// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html

// version 1.2
// TP1

var HorTools = { // jeu d'outils spécifiques hordes
	sk: null, // no de session avec "?sk=xxxxx" !!! ne pas le lire directement !!! mais avec getsk
}

HorTools.getsk = function() {
	if ( this.sk != null )
		return this.sk;
	var logoutNode=$('logout');
	if ( logoutNode != null ) {
		var chtrouv= "js.XmlHttp.get('user/logout?sk=";
		var posstr= logoutNode.innerHTML.indexOf(chtrouv,0);
		if ( posstr >= 0 ) {
			var str= logoutNode.innerHTML.substr( posstr + chtrouv.length );
			this.sk= str.substr( 0, str.indexOf("'",0));
		}else{
			this.sk= null;
			alert("Script GM: Clé de session non trouvée!");
		}
	}else{
		alert("Script GM: Pas encore logué mais script actif: faire shift-reload après login");
	}
	//GM_log("HorTools: " + this.sk); //DEBUG
	return this.sk;
}

HorTools.closeNotif = function() { // ferme la notification, retourne le contenu, chaine vide si rien d'affiché
	var contenu= '';
	if ( $('notification').className == 'showNotif' ) {
		contenu= $('notificationText').innerHTML;
		// équivalent code du bouton Fermer de notif.
		$('body').className=''; $('notification').className=''; unsafeWindow.js.Tutorial.showTutorialStep();
	}
	return contenu;
}

HorTools.pa_disponible = function (){ // by gmotw
	var elements = $("movesCounter");
	var res = -1;
	if (elements!=null){
		elements = elements.childNodes[1].childNodes[2];
		if (elements.nodeName=="#text")
		res = parseInt(elements.nodeValue);
	}
	return res;
}

HorTools.get_etats = function(){ // by gmotw
   var res = new Array();
   var elements = $xpath("//ul[@id='userStatus']/LI/IMG", document,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
   if (elements!=null){
        for ( var i = 0; i < elements.snapshotLength; ++i ) {
         var child = elements.snapshotItem(i);
         var over = child.getAttribute("onmouseover");
         var text = over.substring(over.indexOf("this,'",0)+"this,'".length,
                                 over.indexOf("', '",0));
         res[i] = text;
        }   
   }
   for(var j = 0;j<res.length;j++)
      GM_log(res[j]);
   return res;
}

HorTools.objets_sac = function(){ // by gmotw // QUE DANS LE DESERT
	var res = new Array();
	var elements = $xpath("//*[@class='tools shortTools bagInv']/LI/a[@onclick]", document,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	if (elements!=null){
		for (var i = 0; i < elements.snapshotLength; ++i) {
			var child = elements.snapshotItem(i);
			if (child.getAttribute("class")!="freeSlot"){ // Enlever les espaces vides
				var click = child.getAttribute("onclick");
				var id = click.substring(click.indexOf("tool/",0) + "tool/".length,
												click.indexOf("/remove"));
    		var url= click.match(/'(.+?)'/); // dgm
	     	url=url[1]; //TODO une verif null  // dgm
	     	
				var click2 = child.getAttribute("onmouseover");
				var nom = click2.substring(click2.indexOf("this,'",0) + "this,'".length,
												click2.indexOf("<img"));
				nom=this.trimSpace(nom);
				nom= nom.replace(/\\'/,"'"); // change \' en '
				res[i] = new Array(id,nom,child,url);
			}
  		}	
	}
	//for (var k=0;k<res.length;k++) GM_log('[' + res[k][0] + '] [' + res[k][1]+ ']');
	return res;
}

HorTools.objets_sac_hash = function(){ // voir à changer objets_sac et tous les appelants pour éviter objets_sac_hash 
	var ensac= HorTools.objets_sac();
	var ensac2= new Array();
	for ( var i= 0; i<ensac.length; i++ ) {
		ensac2[i]={id: ensac[i][0],nom: ensac[i][1], child: ensac[i][2], url: ensac[i][3]}
	}
	return ensac2;
}

HorTools.liste_sac = function(){ // sac du haut en barre principale
	var objets = new Array();
	var pNode= $('userBag');
	if ( pNode==null ) {
		//GM_log("HorTools.liste_sac: pNode==null"); //DEBUG
		return objets; // vide car non trouvé (mettre un warning ?)
	}
	var nodes = $xpath("li/img", pNode,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
	if ( nodes == null ) {
		GM_log("HorTools.liste_sac: nodes == null !"); //Avertissement: existe au moins les vêtements de métier
		return objets; // vide car non trouvé
	}
	var obj,overtip,nom;
	//GM_log("HorTools.liste_sac: nodes.snapshotLength="+nodes.snapshotLength); //DEBUG
	for (var i = 1; i < nodes.snapshotLength; ++i) { // début à un car on évite les vêtements de métier
		//GM_log("HorTools.liste_sac: i="+i); //DEBUG
		obj = nodes.snapshotItem(i);
		overtip = obj.getAttribute("onmouseover");
		//GM_log("HorTools.liste_sac: overtip:\n"+overtip); //DEBUG
		nom=overtip.match(/js.HordeTip.showTip\(this,'(.*?)<img/);
		if ( nom == null ) {
			//GM_log("HorTools.liste_sac: nom == null"); //DEBUG
			break; // rien d'autre après.
		}
		nom= GenTools.trimSpace(nom[1]);
		nom= nom.replace(/\\'/,"'");
		//GM_log("HorTools.liste_sac: nom>>>"+nom+"<<<"); //DEBUG
		objets[objets.length]= { nom: nom }; // hash en prévision d'autre détails plus tard
	}
	return objets;
}

HorTools.freeSlot= function (){ // by gmotw (place_libre dans le sac) // QUE DANS LE DESERT
   var res = 0;
   var countSlot = $xpath("count(//*[@class='tools shortTools bagInv']/LI/a[@class='freeSlot'])", document, XPathResult.ANY_TYPE);
   if (countSlot!=null)
      res=countSlot.numberValue;
   return res;
}
HorTools.get_id_objet = function (obj){ // Prend le début du nom de l'objet par terre et retourne l'id et le node
	// by gmotw  (+blu: tableau id,node)
	var res = new Array();
	var elements = $xpath("//*[@class='tools shortTools outInv']/LI/a[@onclick]", document,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	var child, onmouseover, nom, onclick;
	//GM_log("HorTools.get_id_objet: "+obj); //DEBUG

	obj= obj.toLowerCase();
	if (elements!=null){
		for (var i = 0; i < elements.snapshotLength && !('id' in res); ++i) { // trompeur le for avec la condition
			child = elements.snapshotItem(i);
			onmouseover = child.getAttribute("onmouseover");
			nom = onmouseover.substring(onmouseover.indexOf("this,'",0) + "this,'".length, onmouseover.indexOf("<img")).toLowerCase();
			nom = this.mange_blancs(nom);
			GM_log("HorTools.get_id_objet: par terre: <"+nom+">"); //DEBUG
			if (nom.indexOf(obj,0)!=-1){
				onclick = child.getAttribute("onclick");
				res['id'] = onclick.substring(onclick.indexOf("id=",0) + "id=".length, onclick.indexOf("&b=false"));
				res['node']= child; // pour la fn get du js hordes
			}
		}
	}
	//if (res.length==0) res = ""; // pas bon le length sur tableau associatif
	return res;
}

HorTools.liste_prenable_terre = function(){ // liste des objets à terre pouvant être pris
	//GM_log("HorTools.liste_prenable_terre: Début..."); //DEBUG
	var objets = new Array();
	var nodes = $xpath("//ul[@class='tools shortTools outInv']/li/a[@onclick]", document,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	if (nodes==null){
		GM_log("HorTools.liste_terre: nodes==null"); //DEBUG
		return objets; // vide
	}
	//GM_log("HorTools.liste_prenable_terre: nb="+nodes.snapshotLength); //DEBUG
	var obj,overtip,clickjs,nom,id;
	for (var i = 0; i < nodes.snapshotLength; ++i) { 
		//GM_log("HorTools.liste_prenable_terre: i="+i); //DEBUG
		obj = nodes.snapshotItem(i);
		overtip = obj.getAttribute("onmouseover");
		nom=overtip.match(/js.HordeTip.showTip\(this,'(.*?)<img/);
		if ( nom == null ) {
			//GM_log("HorTools.liste_prenable_terre: nom==null"); //DEBUG
			continue; // devrait pas arriver, placer ici un debug en cas de pb
		}
		nom= GenTools.trimSpace(nom[1]);
		nom= nom.replace(/\\'/,"'");
		clickjs= obj.getAttribute("onclick");
		url= clickjs.match(/'(.+?)'/);
		url=url[1]; //TODO une verif comme nom
		id= clickjs.match(/id=([0-9]*)/);
		if ( id==null ) {
			//GM_log("HorTools.liste_prenable_terre: id==null"); //DEBUG
			continue; // devrait pas arriver, placer ici un debug en cas de pb
		}
		id=id[1];
		//GM_log("HorTools.liste_prenable_terre: nom>>>"+nom+"<<< id>>>"+id+"<<<"); //DEBUG
		objets[objets.length]= { nom: nom, id: id, node: nodes.snapshotItem(i), url: url }; 
	}
	return objets;

}

HorTools.get_actions= function(){ // GMOTW
   var res = new Array();
   var elements = $xpath("//div[@id='itemActions']/div[@class='list']/a[@class='toolAction']", document,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
   // GM_log(elements.snapshotLength); // DEBUG
   var child, click,id,click2,nom;
   if (elements!=null){
      for (var i = 0; i < elements.snapshotLength; ++i) {
         child = elements.snapshotItem(i);
         click = child.getAttribute("onclick");
         id = click.substring(click.indexOf("tool/",0) + "tool/".length,
                                    click.indexOf("/use"));
            click2 = child.getAttribute("onmouseover");
            nom = click2.substring(click2.indexOf("this,'",0) + "this,'".length,
                                    click2.indexOf("<img"));
            nom=this.mange_blancs(nom);
            res[i] = new Array(id,nom,child);
       }
   }
   //for (var k=0;k<res.length;k++) GM_log('[' + res[k][0] + '] [' + res[k][1]+ ']');
   return res;
}

HorTools.getLayoutClass = function (){ // retourne la classe du tableau identifié par 'gameLayout'
	var node = $xpath("//table[@id='gameLayout']", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; 
	if ( node==null ) {
		//GM_log("HorTools.getLayoutClass: pas de layout" ); // DEBUG
		return "";
	}
	return node.getAttribute("class");
}

HorTools.isAtGates = function (){ // vrai si on est dehors, à la porte
	var titre = $xpath("//table[@id='gameLayout' and @class='outside']//h1", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; // .singleNodeValue finalement nécessaire...
	if ( titre==null ) {
		//GM_log("HorTools.isAtGates: pas de titre" ); // DEBUG
		return false;
	}
	//GM_log("HorTools.isAtGates: "+( titre.innerHTML == "Les Portes de la Ville")); // DEBUG
	return ( titre.innerHTML == "Les Portes de la Ville");
}

HorTools.getCrossGatesBtn = function (){ // retourne le node du bouton  "Entrer en ville"  si on est dehors à la porte et qu'elle est ouverte, null sinon
	//GM_log("HorTools.getCrossGatesBtn"); // DEBUG
	var mainNode = $('generic_section');
	if ( mainNode == null ) {
		//GM_log("HorTools.getCrossGatesBtn: mainNode == null");// DEBUG
		return null;
	}
	var btn = $xpath("a[@class='button']", mainNode,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
	if ( btn== null ) {
		//GM_log("HorTools.getCrossGatesBtn: btn== null");// DEBUG
		return null;
	}
	var onclick= btn.getAttribute("onclick");
	if ( onclick.indexOf("city/crossDoors") == -1 ) {
		//GM_log("HorTools.getCrossGatesBtn: onclick.indexOf('city/crossDoors') == -1");// DEBUG
		return null;
	}else{
		//GM_log("HorTools.getCrossGatesBtn: btn ok");// DEBUG
		return btn;
	}
}


HorTools.jsReboot = function (){ // rechargement de page façon hordes retour au site !!! re-init de scripts ?
	unsafeWindow.js.Js.reboot();
}

HorTools.getCurrentDiscuNo= function() { // retourne le n° de discusion sur laquelle on est.
	var refArray= window.location.href.split("#");
	if (refArray.length < 2)
		return 0;
	var ref= refArray[1];
	//saloon/?go=saloon/thread/17934809?page=1;tpage=1
	var ind= ref.indexOf("saloon/thread/");
	if ( ind == - 1 )
		return 0;
	ref= ref.substr(ind+14); // 14 longueur de "saloon/thread/"
	refArray= ref.split("?");
	ref= refArray[0];
	return ref;
}

HorTools.lienActualiser = function() { // retourne le noeud du premier lien "Actualiser"
	// je me demande toujours si c'est bien la peine de retrouver ce noeud pour l'appel js.XmlHttp.get
	var texteori= '';
	var node= $('generic_section');
	if ( node == null ) {
		return undefined;
	}
	var lienActu= $xpath('a[@class="refresh"]', node, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
	if ( lienActu== null ) {
		return undefined;
	}
	return lienActu;
}

HorTools.actualiser = function() { // actualise en section générique (initialement pour le désert, pas testé ailleurs)
	window.wrappedJSObject.js.XmlHttp.get('outside/refresh?sk='+this.getsk(),this.lienActualiser());
}

HorTools.showLoading = function() { // affiche le logo loading
  window.wrappedJSObject.js.Block.show(window.wrappedJSObject.js.Utils.getSection(window.wrappedJSObject.js.Js.LOADING_SECTION));
}
HorTools.hideLoading = function() { // cache le logo loading
  window.wrappedJSObject.js.Block.hide(window.wrappedJSObject.js.Utils.getSection(window.wrappedJSObject.js.Js.LOADING_SECTION));
}


