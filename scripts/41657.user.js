// BkpFofo
// Released under the GPL license
// Sous licence GPL: la licence n'est à accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// Ceci est un script Greasemonkey.
//
// Pour l'installer vous avez besoin de Greasemonkey: http://greasemonkey.mozdev.org/
// Après l'installation de Greasemonkey redémarrez Firefox et revenez sur ce script.
// Sous le menu Outils il y aura "Install User Script".
// Accepter la configuration par défaut et installer.
//
// Pour désinstaller, aller dans Outils/Manage User Scripts,
// Choisir "BkpFofo", et cliquer Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BkpFofo
// @namespace     D-
// @description   Pour sauvegarder les sujets du forum: met en une page le sujet en cours.
// @include       http://www.hordes.fr/*
// ==/UserScript==

const DGM_BKPFOFO_VERSION  = '1.4';

//dgm/ unsafeWindow est une variable greaseMonkey qui met en péril la sécurité du script si on tombe sur un site malin
if( typeof(unsafeWindow) == 'undefined' ) {
	var unsafeWindow = window;
}

//
// Fonctions raccourcis, dgm/ piqué de HMUpdater
//
function $(id) { return document.getElementById(id); }

function $xpath(expression, contextNode, type)
{
	return (contextNode.nodeType == 9 ? contextNode : contextNode.ownerDocument)
		.evaluate(expression, contextNode, null, type, null);
}


function addGlobalStyle(css) { //dgm/ piqué de diveintogreasemonkey.org
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


var GenTools = { // jeu d'outils génériques hordes
	sk: null, // no de session avec "?sk=xxxxx"

}

GenTools.init = function() {
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
	//GM_log("GenTools: " + this.sk); //DEBUG
}

GenTools.mange_blancs = function (txt){ // sûrement possible de coder avec fn js natives plus rapides
	var i=0;
	var carac = false;
	
	while (!carac && i<txt.length){
		var elem = txt.charAt(i);
		carac = (elem!=' ') && (elem!='	'); // tabulation entre ''
		if (!carac)
			i++;
	}
	txt= txt.substring(i,txt.length);
	i=txt.length-1;
	carac=false;
	while(!carac && i>=0){
		var elem = txt.charAt(i);
		carac = (elem!=' ') && (elem!='	'); // tabulation entre ''
		if (!carac)
			i--;
	}
	return txt.substring(0,i+1);
}


GenTools.closeNotif = function() { // ferme la notification, retourne le contenu, chaine vide si rien d'affiché
	var contenu= '';
	if ( $('notification').className == 'showNotif' ) {
		contenu= $('notificationText').innerHTML;
		// équivalent code du bouton Fermer de notif.
		$('body').className=''; $('notification').className=''; unsafeWindow.js.Tutorial.showTutorialStep();
	}
	return contenu;
}

GenTools.getLayoutClass = function (){ // retourne la classe du tableau identifié par 'gameLayout'
	var node = $xpath("//table[@id='gameLayout']", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; 
	if ( node==null ) {
		//GM_log("GenTools.getLayoutClass: pas de layout" ); // DEBUG
		return "";
	}
	return node.getAttribute("class");
}


GenTools.httpGet= function(url) { // retourne le html de l'url
	//GM_log("GenTools.httpGet: début, "+url); // DEBUG
	
	var morepar= url.indexOf('?') == -1 ? '?' : ';'; // (cond?oui:non)
	if (url.indexOf('sk=') == -1)
	   url += morepar+"sk="+GenTools.sk;
	var rnd= Math.round(Math.random()*10000000);
	url += ";rand=" + rnd; // forcément déjà un paramètre donc pas de test pour '?' ou ';'

	//GM_log("GenTools.httpGet: XMLHttpRequest: "+url); // DEBUG
	var req = new XMLHttpRequest();
	req.open("get", "/"+url, false);
	req.send(null);
  return req.responseText;
  
}

GenTools.removeNodeId = function (nodeId) {
  if (nodeId==undefined )
    return false; // devrait pas arriver mais ne me gêne pas.
  var mainNode = $(nodeId);
	if( mainNode == null ) {
	  GM_log("GenTools.removeNodeId: pas de "+nodeId); //DEBUG
    return false;
	}
	mainNode.parentNode.removeChild(mainNode);
}

GenTools.removeNodeClass = function (nodeType, nodeClass) {
  if (nodeType==undefined )
    return false; // devrait pas arriver mais ne me gêne pas.
  if (nodeClass==undefined )
    return false; // devrait pas arriver mais ne me gêne pas.
  //var nodes = $xpath("//[@class='"+nodeClass+"']", document,XPathResult.UNORDERED_NODE_TYPE); //BUG! pas la bonne expression...
  //GM_log("GenTools.removeNodeClass: snap... "+nodeType+" "+nodeClass); // DEBUG
  var nodesSnap = $xpath("//"+nodeType+"[@class='"+nodeClass+"']", document,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
 	
   if( nodesSnap == null ) {
  	GM_log("GenTools.removeNodeClass: pas de noeud "+nodeType+" "+nodeClass); //INFO
	  return false;
	}
	var node;

  //GM_log("GenTools.removeNodeClass: for ..."); // DEBUG

  for ( var i=0; i < nodesSnap.snapshotLength ; i++ ) {
    //GM_log("GenTools.removeNodeClass: i="+i); // DEBUG
		node= nodesSnap.snapshotItem(i);
	  node.parentNode.removeChild(node);
	}
	return false;
}

GenTools.removeNodeTag = function (nodeTag) { // supprime tous les noeud du type passé (exemple: "script" pour tous les <script>)
  if (nodeTag==undefined )
    return false; // devrait pas arriver mais ne me gêne pas.
  var nodesSnap = $xpath("//"+nodeTag, document,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
 	
  if( nodesSnap == null ) {
  	GM_log("GenTools.removeNodeTag: pas de noeud "+nodeTag); //INFO
	  return false;
	}
	var node;

  //GM_log("GenTools.removeNodeTag: for ..."); // DEBUG

  for ( var i=0; i < nodesSnap.snapshotLength ; i++ ) {
    GM_log("GenTools.removeNodeTag: i="+i); // DEBUG
		node= nodesSnap.snapshotItem(i);
	  node.parentNode.removeChild(node);
	}
	return false;
  
}
var ControlSync = { // scheduler général et coordination pour les appels répétés d'installation des objets pendant que ça charge
	//nbTimers: 0, // combien de timers enregistrés
	stdTimout: 7000, // 7 secondes max pour chaque répétition
	infoStak: '', // liste d'info fournie par les inscrits (chaîne simple)
	interStak: new Array(), // pile de timers à interval
	tmoutStak: new Array(), // pile de timers à timeout pour arrêter les autres
	//### pour le scheduler: ###
}

ControlSync.init = function() {
//  hook pour le scheduler:
  unsafeWindow.js.Js._dgm_updateSectionContents= unsafeWindow.js.Js.updateSectionContents;
  unsafeWindow.js.Js.updateSectionContents = function(url,section,data) {
    unsafeWindow.js.Js._dgm_updateSectionContents(url,section,data);
    ControlSync.refreshDone();
  }
}

ControlSync.register = function(atimer, info) {// pour inscrire un timer de fonction d'install/fin-de-refresh
	this.infoStak= this.infoStak  + info+ '; '; // pour info
	this.interStak[this.interStak.length] = atimer; // le nouveau timer à répétition passé en param
	var newtimout= setTimeout( function(){
		clearInterval(atimer);
		GM_log("ControlSync: timeout de "+ info);//DEBUG
		}, this.stdTimout);// minuterie pour arrêter la répétition
	this.tmoutStak[this.tmoutStak.length] = newtimout; 
	GM_log("ControlSync: pour "+ info + " tmout de timer n°"+ newtimout);//DEBUG
}

ControlSync.stopAll = function(){ // arrête tous les timers enregistrés et minuteries et purge les piles
	for(i=0; i < this.interStak.length; i++) {
		clearInterval(this.interStak[i]);
	}
	for(i=0; i < this.tmoutStak.length; i++) {
		clearTimeout(this.tmoutStak[i]);
	}
	this.infoStak='';
	this.interStak=new Array();
	this.tmoutStak=new Array();
}

var Fofo = { // objet de pilotage du perso dehors par un autre joueur
  foBox: null,   // id=dgm:fobox
  foButton: null, // id=dgm:fobtn
  htmBtnFofo: '<img alt="" src="http://www.hordes.fr/gfx/forum/smiley/h_warning.gif"/>Forum plus!',
  txtAreaNode: null,
}

Fofo.init = function() { // initialisation de l'objet ( PAS démarrage du pilotage ) // TODO: sortir les création DOM/html
	GM_log("Fofo: init ");//DEBUG
	this.foButton = document.createElement('a');
	this.foButton.setAttribute('id',    'dgm:fobtn');
	this.foButton.setAttribute('class', 'button');
	this.foButton.setAttribute('href',  '#city/fofo');
	// CONTENU du bouton: décidé plus bas suivant actif/inactif
	this.foButton.addEventListener('click', function(evt) {
		evt.preventDefault();
		Fofo.actionBtn();
	}, false);

	this.foBox = document.createElement('div');
	this.foBox.setAttribute('id',    'dgm:fobox');
	this.foBox.setAttribute('class', 'block mapBlock'); // mimétisme...
	var divhead= document.createElement('div');
	divhead.setAttribute('class', 'header');// mimétisme...
	this.foBox.appendChild(divhead);
	var divbg= document.createElement('div');
	divbg.setAttribute('class', 'bg');// mimétisme...
	this.foBox.appendChild(divbg);
	var divfooter= document.createElement('div');
	divfooter.setAttribute('class', 'footer');// mimétisme...
	this.foBox.appendChild(divfooter);

	var titreh2= document.createElement('h2');
	var titreh2Txt= document.createTextNode("Fofo");
	titreh2.appendChild(titreh2Txt);
	divbg.appendChild(titreh2);
	var FoInfo=  document.createElement('form');
	FoInfo.setAttribute('class', 'form');// mimétisme...
	divbg.appendChild(FoInfo);
	this.txtAreaNode=  document.createElement('textarea');
	//this.txtAreaNode.setAttribute('class', 'xxxx');// mimétisme...
	FoInfo.appendChild(this.txtAreaNode);

	var divclear=  document.createElement('div');
	divclear.setAttribute('class', 'clear');// mimétisme...
	divbg.appendChild(divclear);

	this.foButton.innerHTML = this.htmBtnFofo + " v"+DGM_BKPFOFO_VERSION;
}

Fofo.installBouton = function(step) {
	//GM_log("Fofo: installBouton "+ step);//DEBUG
	var mainNode = $('saloon_panel_menu');
	if( mainNode == null ) {
		GM_log("Fofo: pas de saloon_panel_menu"); //DEBUG
		return false;
	}
	if( $('dgm:fobtn') != null ) {
		GM_log("Fofo: fobtn déjà là"); //DEBUG
		return false;
	}
/*
	var actionPanel = $xpath('div[@class="left"]', mainNode,
		XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
	var viewPanel   = $xpath('div[@class="right"]', mainNode,
		XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
	
	if( actionPanel == null || viewPanel == null ) {
		if( step == 1 ) {
			GM_log("Fofo: Step 1 et rien pour actionPanel"); //DEBUG
			//hmu/ WorkAround : Parfois, le panneau d'actions n'existe pas encore à ce moment.
			//hmu/ On lance donc un timer pour faire le boulot X millièmes de seconde plus tard
			var timer = setInterval(function() {
				Fofo.install(2);
				if( $('dgm:pilotbtn') != null ) {
					clearInterval(timer);
				}
			}, 500); //dgm/ initialement 50
			ControlSync.register(timer,'Pilote.installBouton');
		}
		
		GM_log("Fofo: rien pour actionPanel"); //DEBUG
		return false;
	}
*/
	//dgm/ Ajout du bouton 
	mainNode.appendChild(this.foButton);

}

Fofo.installBox = function(step) {
	//GM_log("Fofo: installBox "+ step);//DEBUG
	var mainNode = $('saloon_panel_menu');
	if( mainNode == null ) {
		GM_log("Fofo installBox: pas de saloon_panel_menu"); //DEBUG
		return false;
	}
	if( $('dgm:fobox') != null ) {
		GM_log("Fofo: fobox déjà là"); //DEBUG
		return false;
	}
	// Ajout de boite
	mainNode.appendChild(this.foBox);
}

Fofo.install = function(step) {
/*
	if ( GenTools.getLayoutClass() != "outside" ) {
		GM_log("Pilote.install: PAS DEHORS = PAS DE PILOTAGE");
		if ( GM_getValue(DGM_pilotage_actif_key, false) ) {
			Pilote.basculer(); // on désactive
		}
		return false;
	}
	if ( GenTools.isAtGates() ) { // On est aux portes de la ville
		GM_log("Pilote.install: aux portes , pas d'installaton"); //DEBUG 
		//Priorité: rentrer au chaud !
		if ( GenTools.getCrossGatesBtn() != null && GM_getValue(DGM_pilotage_actif_key, false) ) { // rentrée possible et pilotage activé
			Pilote.basculer(); // on désactive
			Pilote.rentrerAuChaud();
		}
		// pas d'autre action possible sur la page de porte dehors, donc fin d'installation
		return false;
	}
	if ( step == undefined ) { // avec le callback: pas d'arg envoyés
		step= 1;
	}
*/
  //GM_log("Fofo.install: deux appels"); //DEBUG
	Fofo.installBouton(step); 
	//Fofo.installBox(step); // Plus la peine, servait pour des tests
  addGlobalStyle('span.userLink { color:#DDAB76 ! important; } #mapInfos { margin-left:298px! important; } '); // le user auteur comme les autres
}

Fofo.actionBtn= function() { // Quand on appuie sur le bouton
  //this.updateTextArea(this.pageDiscu(16495524,2));
  //
  //this.updateTextArea(this.extrMgsDiscu(this.extrDiscu(this.pageDiscu(this.getCurrentDiscuNo(),1))));
  //this.updateTextArea(this.getMaxPageDiscu(this.extrDiscu(this.pageDiscu(this.getCurrentDiscuNo(),1))));
  //this.updateTextArea(this.getSujetDiscu(this.extrDiscu(this.pageDiscu(this.getCurrentDiscuNo(),1))));
  //this.replaceDiscu("<h1>Encore un Test!</h1>");
  this.synthese();
  this.elagageDoc();
}

Fofo.pageDiscu = function( discu, page ) { // retourne le html correspondant à une page de discussion donnée
  if (page==undefined )
    page=1;
  if (discu==undefined) {
    GM_log("ERR! Fofo.pageDiscussion: manque le paramètre de n° discussion en appel"); //DEBUG
    return "";
  }
  return GenTools.httpGet("saloon/thread/"+discu+"?hideLocked=0;page="+page+";tpage=1");
}

Fofo.updateTextArea= function(str) { // stocke le texte dans la zone de saisie, pour des tests
	// PAS DE this ICI
	Fofo.txtAreaNode.value= str; // AV
}

Fofo.elagageDoc= function() { // ne garde que la discussion forum sur la page.
  //<td class="sidePanel">
	GenTools.removeNodeClass("td","sidePanel");
	// <div id="logout"> <div id="banner" <div id="banner" <div id="anims"> <div id="sites"> <div class="infoBar"> <a id="backReboot" <div class="actions"> div class="paginate">
  // <div id="notification"> <div class="box"> <div id="tooltipContent"> <div class="footer"></div> <div id="userBox">
  
	GenTools.removeNodeId("logout");
	GenTools.removeNodeId("banner");
	GenTools.removeNodeId("sites");
	GenTools.removeNodeId("backReboot");
	GenTools.removeNodeId("anims");
	GenTools.removeNodeId("notification");
	GenTools.removeNodeId("userBox");
	GenTools.removeNodeId("footer");
	
	GenTools.removeNodeClass("div","infoBar");
	GenTools.removeNodeClass("div","actions");
	GenTools.removeNodeClass("div","paginate");
	GenTools.removeNodeClass("div","box");
  GenTools.removeNodeClass("div","tooltipContent");

  GenTools.removeNodeTag("script");
}

Fofo.getCurrentDiscuNo= function() { // retourne le n° de discusion sur laquelle on est.
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

Fofo.extrDiscu= function(html) { // retourne le html de la discussion, pourrait être fait avec du parse XML...
	var ind,str;

	str= '<fill id="generic_section">'
	ind=html.indexOf(str);  // répétition : faire en fonction
	if ( ind == -1 )
		return "";
	html= html.substr(ind+str.length);

	str='<![CDATA[';
	ind=html.indexOf(str);
	if ( ind == -1 )
		return "";
	nearEnd=html.indexOf("</div>\n]]>"); // avec saut de ligne...
	if ( nearEnd == -1 )
		return "";
	html= html.substring(ind+str.length, nearEnd+6);

	return html;
}

Fofo.extrMgsDiscu= function(html) { // retourne le html DES MESSAGES de la discussion, à partir du html de la discussion
	var ind1,ind2,str2;

	ind1=html.indexOf('<div class="message');// début du 1er message, on garde la chaîne. On a "message[ ]*" ou "message heroPost"
	if ( ind1 == -1 )
		return "";
	ind2=html.lastIndexOf('<div class="paginate">');// last car il y en a 2...  //quand il n'y a qu'une page: pas de pagination...
	if ( ind2 == -1 ) {
  	ind2=html.lastIndexOf('<div class="actions">'); // last car il y en a 2...  // on utilise la section action dans ce cas
  	if ( ind2 == -1 ) {
  	   return "";
  	}
  }
	html= html.substring(ind1,ind2-1)

	return html;
}

Fofo.getMaxPageDiscu= function(html) { // retourne le nombre de pages que comporte la discussion, à partir du html de la discussion
	var ind;

	ind=html.lastIndexOf('</option>')-2;
	if ( ind == -1 )
		return 1; // à défaut d'avoir trouvé...
	html= html.substring(0,ind);
	ind=html.lastIndexOf('Page ')+5;
	html= html.substr(ind);
	var nb= parseInt(html);
	if ( nb > 0 ) {
		return nb;
	}else{
		return 1;
	}
}

Fofo.getSujetDiscu= function(html) { // retourne le sujet de discussion, à partir du html de la discussion
	var ind1,ind2,str1,str2;

	str1= '<h1>'; 
	ind1=html.indexOf(str1)+4;
	str2= '</h1>'; 
	ind2=html.indexOf(str2);
	if ( ind1 == -1 || ind2 == -1 )
		return "";
	var sujet= html.substring(ind1,ind2)

	return sujet;

}
Fofo.replaceDiscu= function(html) { // remplace le html de la discussion avec celui passé
	var mainNode = $('generic_section');
	if( mainNode == null ) {
		GM_log("Fofo.replaceDiscu: pas de generic_section"); //DEBUG
		return false;
	}
	mainNode.innerHTML= html;
}

Fofo.synthese= function() { // toutes les pages en une pour la discussion courrante
	var noDiscu= this.getCurrentDiscuNo();
	var page1= this.extrDiscu(this.pageDiscu(noDiscu,1));
	var nbPages= this.getMaxPageDiscu(page1);
	var sujet= this.getSujetDiscu(page1);
	var messages= this.extrMgsDiscu(page1);

	GM_log("Fofo.synthese: "+noDiscu+" , "+nbPages+" , "+sujet);//DEBUG

	for ( var p=2; p<=nbPages; p++ ) {
		GM_log("Fofo.synthese: p= "+p); //DEBUG
		messages += this.extrMgsDiscu( this.extrDiscu(this.pageDiscu(noDiscu,p) ));
	}
	//this.updateTextArea(messages);//DEBUG

	//var html=this.templateDiscu(sujet,messages); // fonction buggée
	var codeDiscu="<div style=\"display: none;\" id=\"threadno\">§"+noDiscu+"§</div>";
	var html="<div class=\"thread\">\n"+codeDiscu+"\n<h1>"+sujet+"</h1>\n"+messages+"</div>\n";
	//this.updateTextArea(html);//DEBUG
	this.replaceDiscu(html);
	this.trimDate();
	this.trimUserLink();
	this.trimUserLink2(); // bug mystère :/
}

/* a un bug ... retourne undefined
Fofo.templateDiscu= function(sujet,messages) { // emballe le html dans les balises de discussion
	return
'<div class="thread">'+"\n"+
"<h1>"+sujet+"</h1>\n"+
messages+
"</div>\n";
}
*/

Fofo.trimDate= function () { // enlève le lien signaler avant chaque date (dans le div date)
/*
<div class="date">
[ <a href="#user/reportSaloonMsg?id=17589746;sk=cd275" onclick="if(confirm('Signaler ce message comme étant insultant ?') ) js.XmlHttp.get('user/reportSaloonMsg?id=17589746;sk=cd275',null); return false;" onmouseover="js.HordeTip.showSpecialTip(this,'helpTip','', 'Utilisez cette fonction pour signaler un message abusif (insultes graves).');" onmouseout="js.HordeTip.hide()">Signaler</a> ]
<span onmouseover="js.HordeTip.showSpecialTip(this,'helpTip','', 'ven 02 jan, à 01:15');" onmouseout="js.HordeTip.hide()">le ven 02 jan, à 01:15</span>
</div>
*/
  var nodesSnap = $xpath("//div[@class='date']", document,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  if( nodesSnap == null ) {
  	GM_log("Fofo.trimDate: pas de noeud date"); //INFO
	  return false;
	}
	var node,spanNode;
  for ( var i=0; i < nodesSnap.snapshotLength ; i++ ) {
    //GM_log("Fofo.trimDate: i="+i); // DEBUG
		node= nodesSnap.snapshotItem(i);
		spanNode   = $xpath('span', node,	XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
	  node.innerHTML= "<span>"+spanNode.innerHTML+"</span>"; // normalement on y met "le ven 02 jan, à 01:15"
	}
	return false;

}

Fofo.trimUserLink= function () { // allège les noms de user
/*
<a href="#" onclick="js.UserBox.show(this, 141643, 'Knon','hordes/1/0/e2a1a8e3_141643.jpg','Co leader - Go les défenses temporelles!Quoi?..temp oraires...', 'saloon?go=saloon/thread/17965607?page=2');return false;" class="userLink" onmouseover="js.HordeTip.showSpecialTip(this, 'simpleTip', '', '<p><strong>Knon :</strong> <span class=\'jobName\'><img src=\'/gfx/icons/item_shield.gif\' alt=\'shield\' title=\'\'/> Gardien</span></p> <p><em>Cliquez pour afficher ses informations</em></p>');" onmouseout="js.HordeTip.hide()">
Knon
</a>
*/
  var nodesSnap,node,i;
  nodesSnap = $xpath("//a[@class='userLink']", document,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  if( nodesSnap != null ) {
    for ( i=0; i < nodesSnap.snapshotLength ; i++ ) {
      GM_log("Fofo.trimUserLink-a: i="+i); // DEBUG
		  node= nodesSnap.snapshotItem(i);
	    node.attributes.removeNamedItem('onclick') ;
	    node.attributes.removeNamedItem('onmouseover') ;
	    node.attributes.removeNamedItem('onmouseout') ;
	    }
	}
}

Fofo.trimUserLink2= function () { // allège les noms de user, pour le span //BUG!
  var nodesSnap,node,i;
	// idem pour les span (quand c'est soit-même)
  nodesSnap = $xpath("//span[@class='userLink']", document,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  if( nodesSnap != null ) {
    GM_log("Fofo.trimUserLink nb= "+nodesSnap.snapshotLength); // DEBUG
    for ( i=0; i < nodesSnap.snapshotLength ; i++ ) {
      GM_log("Fofo.trimUserLink-span: i="+i); // DEBUG
		  node= nodesSnap.snapshotItem(i);
		  //alert(node); // DEBUG
      GM_log("Fofo.trimUserLink-span: item"); // DEBUG
	    node.attributes.removeNamedItem('onmouseover') ;
	    node.attributes.removeNamedItem('onmouseout') ;
	    }
	}
}

//
// Initialisation du script
//
GenTools.init();
ControlSync.init();
Fofo.init();

//dgm/ Insertions des éléments au bon moment
if( typeof(unsafeWindow.js) != 'undefined' ) {
	//
	// On s'intercalle devant la méthode js.XmlHttp.get() pour lancer le script au bon moment
	//
	// TODO peut-être s'intercaller aussi sur js.Js.reboot(); 
	unsafeWindow.js.XmlHttp._dgm_get = unsafeWindow.js.XmlHttp.get;
	unsafeWindow.js.XmlHttp.get = function(purl,pobj) {
		ControlSync.stopAll(); // pas la peine qu'ils tentent de s'installer: ça va charger
		this._dgm_get(purl,pobj);
		//var url = this.urlForBack;
		if( /saloon/.test(purl)  ) { // idée: vérifier si sur le forum
			var timerinit2= setTimeout( 
				function(){
					Fofo.install(1);
					//Navigator.installBouton(1); //TEST
				}
				,1000); // le temps de charger les deux panneaux
		}
/**/
	};
	
}

window.addEventListener('load',function(){ControlSync.stopAll(); Fofo.install(1);} ,false); //dgm/ pratique pour tester, utile en cas de d'activation et reload de page

/* espionage d'une fonction js hordes */
/*
unsafeWindow.js.JsMap._dgm_move= unsafeWindow.js.JsMap.move;//DEBUG
unsafeWindow.js.JsMap.move= function(dx,dy) {//DEBUG
	GM_log("DEBUG: Appel de js.JsMap.move dx "+dx+' dy '+dy); //DEBUG
	this._dgm_move(dx,dy);//DEBUG
}//DEBUG
*/
/* test du ControlSync
var timer1 = setInterval(function() {GM_log('Test: timer 1');}, 1000);
ControlSync.register(timer1,'pour timer1');
var timer2 = setInterval(function() {GM_log('Test: timer 2');}, 1000);
ControlSync.register(timer2,'pour timer2');
var minuterie = setTimeout(function() {ControlSync.stopAll();}, 3500);
*/
