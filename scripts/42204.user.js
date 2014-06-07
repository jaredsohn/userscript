// Pilote : pilotage du joueur (celui qui exécute ce script) par dialogue sur la case
// version: voir plus bas
// README et DOC: sur AH !
// 2008-12-15 v0.12 Toilettage général du script pour garder l'essentiel
// 2008-12-25 v1.2.0 Première version exploitable en expédition
// 2008-12-29 v1.4.0 Version considérée diffusable.
// Copyright (c) 2008 DGM
// Merci à Aurélien Maille pour les morceaux provenant de HMUpdater, source d'inspiration première pour ce script
// Merci à gmotw pour sa contribution, ses XPATH, ses tests, etc.
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
// Choisir "Pilote", et cliquer Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          iFlote
// @namespace     D-
// @description   Script pour appeler la pluie sur la ville. Rajoute de 30 à 60 rations d'eau dans le puits.
// @include       http://www.hordes.fr/*
// ==/UserScript==

// @ name          Pilote-hordes
// @ namespace     http://userscripts.org/scripts/show/38776

const DGM_PILOTE_VERSION  = '1.4.2';

const DGM_pilotage_actif_key='piloteActif'; // clé GM pour la persistance

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

var Horloge = { //dgm/ idée DGM
	// variables en secondes
	decallage: 0, // fuseau, heure d'été, d'hiver, etc
	ecart: null,  // différence par rapport au serveur hordes, +120 => ajouter 2mn à l'heure locale pour avoir l'heure serveur
	exact: false, // true si on considère l'heure locale est calée sur le serveur
	ajustemin: 0, // précision d'écart par rapport au serveur (à 1mn près, rafraichi toutes les 5s)
	ajustmax: 65  // +60 => le serveur est peut-être déjà 60 secondes plus tard qu'on ne le croit... dangereux!
}

Horloge.sec2txt = function(tps,precis) { // conversion des secondes en texte au format préféré
	var retour="";
	var h, mn, sec;
	if ( tps == null ) {
		return "inconnue";
	}
	if (precis == undefined) {
		precis="s"; // à la seconde près, sinon: m => à la minute près, so => secondes optionnelles (non affichée si 0)
	}

	if ( tps < 0 ) {
		tps= - tps;
		retour="- ";
	}
	h=Math.floor(tps / 3600); //dgm/ recupère le nb d'heure
	if ( h > 0 ) {
		retour= retour + h + "h";
	}
	tps=tps % 3600;
	if ( precis == "m" ) {
		mn=Math.round(tps/60);
	}else{
		mn=Math.floor(tps/60); //dgm/ récupère le nb minute
	}
	if ( h > 0 || mn > 0 ) {
		retour= retour + " " + mn + "mn";
	}
	tps=tps % 60;
	sec=Math.floor(tps);
	if ( precis == "s" || ( precis == 'so' && sec>0 ) ) {
		retour= retour +" " + sec + "s";
	}
	return retour;
}

Horloge.sec2digit = function(tps) { // conversion des secondes du jour en texte au format 05:05
	var retour;
	var h, mn;
	if ( tps == null || tps == undefined ) {
		return "??:??";
	}
	h=Math.floor(tps / 3600); 
	if ( h >= 10 ) {
		retour= h;
	}else{
		retour= "0"+h;
	}
	tps=tps % 3600;
	mn=Math.floor(tps/60);
	if ( mn >= 10 ) {
		retour= retour + ":" + mn;
	}else{
		retour= retour + ":0" + mn;
	}
	return retour;
}

Horloge.readServerTime = function() { // heure serveur affichée sur la page, retournée en secondes
	var srvTime= null;
	var spanSrvTime= $('serverTime');
	if ( spanSrvTime !=null ){
		var srvTimeVal= spanSrvTime.innerHTML.split(':');
		srvTime= 60*(parseInt(srvTimeVal[1]) + 60*parseInt(srvTimeVal[0]));
	}
	return srvTime;
}

Horloge.localTime = function() { // heure locale client en secondes (pour la journée)
	var date_jour=new Date();
	var tps= Math.round(date_jour.getTime()/1000);
	tps=tps % (3600*24); //dgm/ arrondir au jour en secondes
	return tps + this.decallage;
}

Horloge.locMS = function() { // heure locale client en milisecondes (pour la journée)
	var date_jour=new Date();
	var tps= date_jour.getTime();
	tps=tps % (1000*3600*24); //dgm/ arrondir au jour en milisecondes
	return tps + this.decallage*1000;
}

Horloge.effectiveServerTime = function() {// ce qu'on considère comme heure serveur
	if ( this.exact ) {
		return this.localTime();
	}else{
		return this.localTime()+this.ecart;
	}
}

Horloge.init = function() { // à appeler dès le chargement de la page principale qui contient l'heure serveur
	var date_jour=new Date();
	this.decallage= - (60 * date_jour.getTimezoneOffset() );
	// positif = danger (risque d'être en retard si on se fie à l'heure système)
	var srvTm= this.readServerTime();
	if ( srvTm!=null ) {
		this.ecart= srvTm - this.localTime() + 30; // +30s car en moyenne l'heure serveur indiquée à la minute près a justement cette minute entammée
	}
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

GenTools.pa_disponible = function (){ // by gmotw
	var elements = $("movesCounter");
	var res = -1;
	if (elements!=null){
		elements = elements.childNodes[1].childNodes[2];
		if (elements.nodeName=="#text")
		res = parseInt(elements.nodeValue);
	}
	return res;
}

GenTools.get_etats = function(){ // by gmotw
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

GenTools.objets_sac = function(){ // by gmotw
	var res = new Array();
	var elements = $xpath("//*[@class='tools shortTools bagInv']/LI/a[@onclick]", document,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	if (elements!=null){
		for (var i = 0; i < elements.snapshotLength; ++i) {
			var child = elements.snapshotItem(i);
			if (child.getAttribute("class")!="freeSlot"){ // Enlever les espaces vides
				var click = child.getAttribute("onclick");
				var id = click.substring(click.indexOf("tool/",0) + "tool/".length,
												click.indexOf("/remove"));
				var click2 = child.getAttribute("onmouseover");
				var nom = click2.substring(click2.indexOf("this,'",0) + "this,'".length,
												click2.indexOf("<img"));
				nom=this.mange_blancs(nom);
				res[i] = new Array(id,nom,child);
			}
  		}	
	}
	//for (var k=0;k<res.length;k++) GM_log('[' + res[k][0] + '] [' + res[k][1]+ ']');
	return res;
}

GenTools.freeSlot= function (){ // by gmotw (place_libre dans le sac)
   var res = 0;
   var countSlot = $xpath("count(//*[@class='tools shortTools bagInv']/LI/a[@class='freeSlot'])", document, XPathResult.ANY_TYPE);
   if (countSlot!=null)
      res=countSlot.numberValue;
   return res;
}
GenTools.get_id_objet = function (obj){ // Prend le début du nom de l'objet par terre et retourne l'id et le node
	// by gmotw  (+blu: tableau id,node)
	var res = new Array();
	var elements = $xpath("//*[@class='tools shortTools outInv']/LI/a[@onclick]", document,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
	var child, onmouseover, nom, onclick;
	//GM_log("GenTools.get_id_objet: "+obj); //DEBUG

	obj= obj.toLowerCase();
	if (elements!=null){
		for (var i = 0; i < elements.snapshotLength && !('id' in res); ++i) { // trompeur le for avec la condition
			child = elements.snapshotItem(i);
			onmouseover = child.getAttribute("onmouseover");
			nom = onmouseover.substring(onmouseover.indexOf("this,'",0) + "this,'".length, onmouseover.indexOf("<img")).toLowerCase();
			nom = this.mange_blancs(nom);
			GM_log("GenTools.get_id_objet: par terre: <"+nom+">"); //DEBUG
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

GenTools.get_actions= function(){ // GMOTW
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

GenTools.getLayoutClass = function (){ // retourne la classe du tableau identifié par 'gameLayout'
	var node = $xpath("//table[@id='gameLayout']", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; 
	if ( node==null ) {
		//GM_log("GenTools.getLayoutClass: pas de layout" ); // DEBUG
		return "";
	}
	return node.getAttribute("class");
}

GenTools.isAtGates = function (){ // vrai si on est dehors, à la porte
	var titre = $xpath("//table[@id='gameLayout' and @class='outside']//h1", document,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue; // .singleNodeValue finalement nécessaire...
	if ( titre==null ) {
		//GM_log("GenTools.isAtGates: pas de titre" ); // DEBUG
		return false;
	}
	//GM_log("GenTools.isAtGates: "+( titre.innerHTML == "Les Portes de la Ville")); // DEBUG
	return ( titre.innerHTML == "Les Portes de la Ville");
}

GenTools.getCrossGatesBtn = function (){ // retourne le node du bouton  "Entrer en ville"  si on est dehors à la porte et qu'elle est ouverte, null sinon
	//GM_log("GenTools.getCrossGatesBtn"); // DEBUG
	var mainNode = $('generic_section');
	if ( mainNode == null ) {
		//GM_log("GenTools.getCrossGatesBtn: mainNode == null");// DEBUG
		return null;
	}
	var btn = $xpath("a[@class='button']", mainNode,XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
	if ( btn== null ) {
		//GM_log("GenTools.getCrossGatesBtn: btn== null");// DEBUG
		return null;
	}
	var onclick= btn.getAttribute("onclick");
	if ( onclick.indexOf("city/crossDoors") == -1 ) {
		//GM_log("GenTools.getCrossGatesBtn: onclick.indexOf('city/crossDoors') == -1");// DEBUG
		return null;
	}else{
		//GM_log("GenTools.getCrossGatesBtn: btn ok");// DEBUG
		return btn;
	}
}

GenTools.discussion = function() { // lecture des messages 
	//du plus vieux au plus récent
	//retourne un tableau d'objets:
	// msg.heure (temps en seconde à la minute près), msg.pseudo , msg.texte (sans les guillemets)
	var chatMsg = new Array(); // retourné, même vide...
	var mainNode = $('generic_section');
	if( mainNode == null ) {
		GM_log("GenTools: pas de generic_section"); //DEBUG
		return chatMsg;
	}
	// on utilise un cliché [SNAPSHOT] car ça peut recharger pendant l'analyse...
	var logsSnapNodes = $xpath('ul[@class="logs"]/li', mainNode,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
	if( logsSnapNodes == null ) {
		GM_log("GenTools: pas de discussion"); //DEBUG
		return chatMsg;
	}
	if ( logsSnapNodes.snapshotLength == 0 ) {
		chatMsg['full']=true; // rien, mais on a bien tout donc...
		return chatMsg;
	}
	chatMsg['full']= ( (logsSnapNodes.snapshotItem(logsSnapNodes.snapshotLength - 1)).innerHTML.indexOf('outside/refresh?logAll=1') == -1 );  //  vrai si pas de lien pour "voir tous les évènements de cette journée"
	//GM_log("GenTools.discussion: chatMsg['full']="+chatMsg['full']); //DEBUG
	var heureToutPremier= logsSnapNodes.snapshotItem(logsSnapNodes.snapshotLength - 1 -((chatMsg['full'])?0:1)).childNodes[1].innerHTML;
	//GM_log("GenTools.discussion: heureToutPremier="+heureToutPremier); //DEBUG
	chatMsg['firstTime']= 60*(parseInt(heureToutPremier.substring(4,5),10)+60*parseInt(heureToutPremier.substring(1,2),10)); // heure en seconde du premier événement de case
	var details, msg;
	for ( var i=logsSnapNodes.snapshotLength - 1 ; i >=0 ; i-- ) { // lecture du dernier au premier
		if ( logsSnapNodes.snapshotItem(i).getAttribute("class") == 'entry CL_OutsideChat' ) {
			//GM_log( logsSnapNodes.snapshotItem(i).innerHTML );// DEBUG
			details= logsSnapNodes.snapshotItem(i).childNodes;
			msg= new Object();
			msg.heure=details[1].innerHTML; // [13:04]
			msg.heure=60*(parseInt(msg.heure.substring(4,5),10)+60*parseInt(msg.heure.substring(1,2),10)); // temps en secondes, attention à la base 10 (radix) à cause du zéro à gauche si < 10
			msg.pseudo=details[3].innerHTML;
			msg.texte=details[6].nodeValue;
			msg.texte=msg.texte.substr(3,msg.texte.length-6); // on enlève les guillemets, pas compris pourquoi il faut -6
			// TODO nettoyer le texte: pas de double espace, pas d'espace autour des @ et : ### zut, je comprend plus le sens de ce commentaire :(
			chatMsg[chatMsg.length] = msg;
			//GM_log( 'GenTools.discussion: '+Horloge.sec2txt(msg.heure) + ' ' + msg.pseudo + ' ->' + msg.texte +'<-'); // DEBUG
		}
	}
	//GM_log( 'GenTools.discussion: '+Horloge.sec2txt(msg.heure) + ' ' + msg.pseudo + ' ->' + msg.texte +'<-');//DEBUG (le dernier)

	return chatMsg;
}

GenTools.getFormSpeak = function() { // retourne le noeud du formulaire de discussion
	var node= $('generic_section');
	if ( node == null ) {
		return undefined;
	}
	var formulaire= $xpath('form[@class="speak"]', node, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
	if ( formulaire== null ) {
		return undefined;
	}
	return formulaire;
}

GenTools.jsReboot = function (){ // rechargement de page façon hordes retour au site !!! re-init de scripts ?
	unsafeWindow.js.Js.reboot();
}

GenTools.getMapInitData = function (){ // retourne le contenu de "js.JsMap.init( '%21y...3Dt', ';sk=xxxxx' );" (1er argument)
	var mainNode = $('generic_section');
	if ( mainNode == null ) {
		GM_log("GenTools.getMapInitData: appelé hors contexte");// ERRLOG
		return "";
	}
	var script = $xpath("script", mainNode,XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue; // à priori juste un seul de ce type
	if ( script== null ) {
		GM_log("GenTools.getMapInitData: appelé hors contexte (2)");// ERRLOG
		return "";
	}
	var txt= script.innerHTML;
	txt=txt.substr(txt.indexOf("js.JsMap.init")+1);
	txt=txt.substring(txt.indexOf("'")+1, txt.indexOf("'",txt.indexOf("'")+1));
	return txt;
}



var ControlSync = { // scheduler général et coordination pour les appels répétés d'installation des objets pendant que ça charge
	//nbTimers: 0, // combien de timers enregistrés
	stdTimout: 7000, // 7 secondes max pour chaque répétition
	infoStak: '', // liste d'info fournie par les inscrits (chaîne simple)
	interStak: new Array(), // pile de timers à interval
	tmoutStak: new Array(), // pile de timers à timeout pour arrêter les autres
	//### pour le scheduler: ###
	sched: new Array(), // tableau associatif de tableaux associatifs de ...encore. Voir ControlSync.startScheduler
	// en milisecondes de la journée: (pour tous les sched du tableau)
	LRA: 1, // LastRefreshAsked : dernier rafraîchissement demandé (init à 1ms après 0h)
	LRD: 0, // LastRefreshDone: dernier rafraîchissement effectué/constaté (init à 0h)
	// en milisecondes (durées)
	LWT: 0, // LagWaitTime: estimation de lag du serveur (écart requête / réponse) TODO: initialiser à une valeur type
	LWTmax: 12000, // FIXE! borne supérieur pour LWT, pour le limiter (indépendamment de la lenteur du serveur)
	LWTinc: 2000, // FIXE! temps d'attente en plus du LWT pour sa ré-estimation à la hausse (il faut bien attendre plus que LWT pour savoir s'il est plus long encore)
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

ControlSync.startScheduler = function (schedName, params) { // démarre un planificateur
  // -- paramètres passé en tableau associatif --
  // resol: une précision de N milisecondes
  // MAPR: mainActionPeriod: tous les combiens de milisecondes on doit faire l'action principale, ajustable avec this.setMainActionPeriod()
  // RATO: refreshAskedTmout: temps ou bout duquel la demande de refraîchissement peut être considérée en échec si non réalisé.
  // (calculé automatiquement: LWT: lagWaitTime: temps de lag du serveur: 0 à 10s, défaut=0)
  // RDTO: refreshDoneTmout: temps au bout duquel on considère le rafraichissement comme trop vieux pour être utile à l'action
  // maFunc: mainActionFunction: fonction d'action principale appelée, une fois le rafraichissement fait, pour un traitement.
  // rfFunc: refreshFunction: fonction de rafraîchissement standard.
  // tgFunc: tagFunction: fonction de marquage de page, pour tester après si le rafraîchissement est fait
  // ntFunc: notTaggedFunction: fonction qui dit vrai si la page n'est pas reconnue comme marquée
  // inFunc: installFunction: fonction facultative qui permet de ré-installer des boutons, etc, après rafraîchissement (et aussi mise à jour de carte flash)
  // IGT: interactiveGraceTime: heure passé le temps de grace accordé par une interraction utilisateur (évite le refresh pendant une saisie)

	this.stopScheduler(schedName);
	if ( ! (
		params['resol'] > 0 &&
		params['MAPR'] > 0 &&
		typeof(params['maFunc'])=='function' &&
		typeof(params['rfFunc'])=='function' &&
		typeof(params['tgFunc'])=='function' &&
		typeof(params['ntFunc'])=='function'
	) ) {
		GM_log("ControlSync: erreur de paramètres pour startScheduler"); // ERRLOG
		return false;
	}
	if ( ! (params['RATO']>0) ) {
		params['RATO']= 6000; // milisecondes
	}
	if ( ! (params['RDTO']>0) ) {
		params['RDTO']= 4000; // milisecondes TODO essayer de voir là quelle valeur serait adéquate 
	}
	if ( ! (typeof(params['inFunc'])=='function') ) {
		params['inFunc']= function() {} // fonction vide pour pas avoir à tester "elle est là ou pas là?" à chaque fois.
	}
	if ( ! (typeof(params['siFunc'])=='function') ) {
		params['siFunc']= function() {} // fonction vide pour pas avoir à tester "elle est là ou pas là?" à chaque fois.
	}
	this.sched[schedName]= new Array();
	this.sched[schedName]['resol']= params['resol']; // à titre d'info car resol utilisé directement plus bas pour l'essentiel
	this.sched[schedName]['MAPR']= params['MAPR'];
	this.sched[schedName]['maFunc']= params['maFunc'];
	this.sched[schedName]['rfFunc']= params['rfFunc'];
	this.sched[schedName]['tgFunc']= params['tgFunc'];
	this.sched[schedName]['ntFunc']= params['ntFunc'];
	this.sched[schedName]['inFunc']= params['inFunc'];
	this.sched[schedName]['siFunc']= params['siFunc'];
	this.sched[schedName]['RATO']= params['RATO'];
	this.sched[schedName]['RDTO']= params['RDTO'];
	this.sched[schedName]['LMA']=Horloge.locMS(); // dernière action principale: considérée comme juste faite => à jour.
	this.sched[schedName]['LTG']=0; // dernière fois que la page a été taguée pour détecter le rafraîchissement
	this.sched[schedName]['LIN']=0; // dernière fois que l'installation des gadgets a été demandée
	this.sched[schedName]['IGT']=0;
	// en dernier:
	GM_log("ControlSync.startScheduler: "+schedName+'('+(params['resol']/1000)+'s)'); //DEBUG
	this.sched[schedName]['stimer']= setInterval( function() { ControlSync.ticScheduler(schedName) }, params['resol']);
}

ControlSync.stopScheduler = function (schedName) { // arrête un planificateur
	GM_log("ControlSync.stopScheduler: "+schedName); //DEBUG
	if ( typeof(this.sched[schedName]) == 'undefined' ) {
		return false; // rien à faire: n'existe pas.
	}
	clearInterval(this.sched[schedName]['stimer']);
	this.sched[schedName]=undefined; // TODO vérifier si nécessaire / judicieux
}

ControlSync.existsScheduler = function (schedName) { // vrai s'il existe (attention deux 's')
	if ( typeof(this.sched[schedName]) == 'undefined' ) {
		return false;
	}
	return ( typeof(this.sched[schedName]['resol']) == 'number' );
}
ControlSync.ticScheduler = function (schedName) { // tic du scheduler: vérifie ce qu'il y a à faire tous les N secondes, principal programme du sched
	var s=this.sched[schedName]; // variable scheduler racourcie
	var CT= Horloge.locMS(); // heure courante en milisecondes du jour.
	var doIntall= false; // s'il faut appeler l'installation, dans les cas où il n'y a pas de refresh

	//GM_log("ControlSync.ticScheduler: "+Horloge.sec2txt(CT/1000,'s')); //DEBUG

	
	// Détection de rafraîchissement terminé avec le tag
	if ( (this.LRA > this.LRD) && (this.LRA == s['LTG'] ) ) { // refresh demandé pas noté fini et page taggée
		//GM_log("ControlSync.ticScheduler: refresh demandé pas noté fini et page taggée"); //DEBUG
		// on peut constater nous-même si la page est prête (n'est plus taggée)
		if ( s['ntFunc']() ) {
			//GM_log("ControlSync.ticScheduler: la page n'est plus tagguée, màj LRD"); //DEBUG
			this.LRD= CT - s['resol']/2; // temps de refresh le plus probable
		}else{ //DEBUG
			//GM_log("ControlSync.ticScheduler: page tagguée ou non reconnue"); //DEBUG
		}
	}

	// Une ré-installation des gadgets serait-elle utile ? (pas fait impérativement si oui!)
	doIntall = ( this.LRD > s['LIN'] ); // booléen

	// Informations à donner pour affichage...
	var nextTime= Math.max( s['LMA'] + Math.max( s['MAPR'] - this.LWT , this.LWT) , s['IGT'] );
	s['siFunc'](nextTime-CT, nextTime); //### appel de la fonction d'affichage compte à rebour ###

	// Tous les cas de figure des multiples timeout !!!
	//if ( ((CT - s['LMA']) > Math.max( s['MAPR'] - this.LWT , this.LWT)) && CT > s['IGT'] ) { // heure d'action principale atteinte...
	if ( CT > nextTime ) {
	//... et pas de temps de grace en plus.
	//...(déduire le lag et on peut pas aller plus vite que le lag non plus)
		if ( this.LRA > s['LMA'] ) { // raffraîchissement déjà demandé depuis dernière action
			if ( this.LRA > this.LRD ) { // mais bien que raffraîchissement demandé: pas encore fait
				if ( (CT - this.LRA) > Math.max(s['RATO'] , this.LWT + this.LWTinc ) ) { // Trop long à rafraîchir
					GM_log("ControlSync.ticScheduler: refresh en échec par timeout ("+s['RATO']/1000+"s) lag="+this.LWT/1000+"s"); //DEBUG
					// recalcul du LWT: délai actuel déjà majoré (monte vite), borné au LWTmax
					this.LWT= Math.min( this.LWTmax , CT-this.LRA );
					this.LRA= CT; // MAJ temps de dernier rafraîchissement demandé
					s['rfFunc'](); //### appel de la fonction rafraîchissement standard ###
				}else{ // en attente du rafraîchissement en cours, patienter...
					//GM_log("ControlSync.ticScheduler: attente du refresh"); //DEBUG
					// OK rien à faire de concret ici, à part ré-installer des gadgets //TODO: peut-être pas utile là ?
					if ( doIntall) {
						s['LIN']= CT;
						s['inFunc'](); //### appel de la fonction d'installation gadgets ###
					}
				}
			}else{ // raffraîchissement effectué depuis dernière demande
				// recalcul du LWT: moyenne entre délai constaté et LWT actuel (redescend pas vite), toujours borné au LWTmax
				this.LWT= Math.min( this.LWTmax , ((this.LRD-this.LRA)+this.LWT)/2 ); // (this.LRD-this.LRA) est >= 0 d'après le if
				if ( (CT - this.LRD) > s['RDTO'] ) { // le refresh fait est trop vieux, en refaire un
					//GM_log("ControlSync.ticScheduler: le dernier refresh fait est trop vieux"); //DEBUG
					this.LRA= CT;  // MAJ temps de dernier rafraîchissement demandé
					s['rfFunc'](); //### appel de la fonction rafraîchissement standard ###
				}else{ // ouf! refresh terminé récemment, on peut faire l'action principale
					//GM_log("ControlSync.ticScheduler: refresh terminé"); //DEBUG
					if ( doIntall) {
						s['LIN']= CT;
						s['inFunc'](); //### appel de la fonction d'installation gadgets ###
					}
					s['LMA']= CT; // MAJ temps de dernière action principale faite
					s['maFunc'](); //### appel de la fonction d'action principale ###
				}
			}
		}else{ // raffraîchissement à faire, cas ordinaire
			//GM_log("ControlSync.ticScheduler: raffraîchissement à faire, cas ordinaire"); //DEBUG
			this.LRA= CT;  // MAJ temps de dernier rafraîchissement demandé
			s['rfFunc'](); //### appel de la fonction rafraîchissement standard ###
		}
	}else{// pas encore l'heure d'action principale
		//GM_log("ControlSync.ticScheduler: attente de l'heure pour l'action"); //DEBUG
		if ( doIntall) {
			s['LIN']= CT;
			s['inFunc'](); //### appel de la fonction d'installation gadgets ###
		}
	}
	
	
	
}

//ControlSync.lockActionSched = function (schedName,tmout) { // bloque l'action temporairement
//}
/* géré en interne sched: (à priori pas nécessaire...)
ControlSync.mainActionDone = function (schedName) { // MAJ du temps de dernière action principale
}*/

ControlSync.refreshAsked = function (optSchedName) { // MAJ du temps de dernier refraîchissement demandé FACULTATIF: nom de sched
	// pour les cas où le refresh est déclenché par un extérieur au scheduler
	this.LRA= Horloge.locMS();
	if ( typeof(optSchedName) == 'string' ) { // éventuellement le refresh est fait dans un contexte connu
		if ( typeof(this.sched[optSchedName]) == 'undefined' ) {
			GM_log("ERR! ControlSync.refreshAsked: bad sched name: "+optSchedName);//ERRLOG
		}else{
			//GM_log("ControlSync.refreshAsked: appel de taggage et relevé");//DEBUG
			this.sched[optSchedName]['tgFunc'](); // on marque/tag la page
			this.sched[optSchedName]['LTG']= this.LRA; // on note que pour cette fois elle est taggée
		}
	}else{ //DEBUG
		//GM_log("ControlSync.refreshAsked: typeof= "+typeof(optSchedName));//DEBUG
	}
}

ControlSync.refreshDone = function () { // MAJ du temps de dernier refraîchissement fait/constaté
	// appelé depuis l'extérieur du scheduler quand on apprend que le refresh est fait, sans que lui puisse le détecter
	this.LRD= Horloge.locMS();
}

ControlSync.setMainActionPeriod = function (schedName, periode) { // Modifie la périodicité de l'action principale !! milisecondes !!
	if ( ! periode >= 500 ) { // au cas où ...
		GM_log("ControlSync.setMainActionPeriod: BUG d'appel, doit recevoir des milisecondes en 2e arg"); //ERRLOG
		return false;
	}
	this.sched[schedName]['MAPR']= periode; 
}

ControlSync.addGraceTime = function (schedName, delay) {
	//GM_log("ControlSync.addGraceTime: pour "+schedName+", delai= "+delay);
	this.sched[schedName]['IGT']= Horloge.locMS() + delay;
}
//ControlSync.installDone = function (schedName) { // MAJ du temps de dernière installation de bouton,etc, réussit
//}
/*
ControlSync. = function (schedName) { // 
}
*/

var Navigator = { // Objet de déplacement qui peut proposer des boutons de déplacement ou servir à déplacer par script
  navBar: null,
  navSButton: null,
  dxCap: new Array(), // hash table pour donner le dx suivant le cap.
  dyCap: new Array(),
}

Navigator.init = function() {

	this.navSButton = document.createElement('a');
	this.navSButton.setAttribute('id',    'dgm:goS');
	this.navSButton.setAttribute('class', 'button');
	this.navSButton.setAttribute('href',  '#ouside/goS');
	this.navSButton.innerHTML = '<span>Aller au nord</span>';
	this.navSButton.addEventListener('click', function(evt) {
		evt.preventDefault();
		//Navigator.move('N');
		Pilote.parler('je cause'); // DEBUG //TEST
	}, false);

	this.dxCap['N']=  0; this.dyCap['N']= -1;
	this.dxCap['S']=  0; this.dyCap['S']=  1;
	this.dxCap['E']=  1; this.dyCap['E']=  0;
	this.dxCap['O']= -1; this.dyCap['O']=  0;
	this.dxCap['W']= -1; this.dyCap['W']=  0;
}

Navigator.move = function(cap) { // supporte N,S,E,O,W (W=O)
	var dx= this.dxCap[cap];
	var dy= this.dyCap[cap];
	//GM_log("Navigator: cap "+cap+' '+dx+' '+dy); //DEBUG
	if ( (dx==0 || dx==-1 || dx==1) && (dy==0 || dy==-1 || dy==1) ) {
	  unsafeWindow.js.JsMap.move(dx,dy);
	}else{
		GM_log("Navigator: cap non géré:"+cap);// ERRLOG
	}
}

Navigator.syncMap = function() { // Met à jour la carte flash //!!!!!!!!!! N'a pas l'air de fonctionnner...
	var data= GenTools.getMapInitData();
	GM_log("Navigator.syncMap: data= "+data); // DEBUG
	if ( data.length > 0 ) {
		GM_log("Navigator.syncMap: JsMap.init"); // DEBUG
		unsafeWindow.js.JsMap.init(data,';sk='+GenTools.sk);
	}
}

Navigator.installBouton = function(step) {
	var mainNode = $('generic_section');
	if( mainNode == null || $('dgm:goS') != null ) {
		return false;
	}
	var actionPanel = $xpath('div[@class="left"]', mainNode,
		XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
	var viewPanel   = $xpath('div[@class="right"]', mainNode,
		XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
	
	if( actionPanel == null || viewPanel == null ) {
		if( step == 1 ) {
			GM_log("Navigator: Step 1 et rien pour actionPanel"); //DEBUG
			//hmu/ WorkAround : Parfois, le panneau d'actions n'existe pas encore à ce moment.
			//hmu/ On lance donc un timer pour faire le boulot X millièmes de seconde plus tard
			var timer = setInterval(function() {
				Navigator.install(2);
				if( $('dgm:navS') != null ) {
					clearInterval(timer);
				}
			}, 500); //dgm/ initialement 50
			ControlSync.register(timer,'Navigator.installBouton');
		}
		
		GM_log("Navigator: rien pour actionPanel"); //DEBUG
		return false;
	}
	//dgm/ Ajout du bouton 
	actionPanel.appendChild(this.navSButton);
}

Navigator.install = function(step) {
  this.installBouton(step);
}

var Pilote = { // objet de pilotage du perso dehors par un autre joueur
  pilBox: null,   // id=dgm:pilotbox
  pilBoxPseudoTxtNode: null, // noeud texte du pseudo détecté
  pilBoxTmoutTxtNode: null,  // noeud texte du compte à rebour
  pilBoxRTimeTxtNode: null,  // noeud texte de prochaine heure de véfif.
  pilBoxBossTxtNode: null, // noeud texte d'annonce des chefs admis
  pilBoxLogs: null, // noeud de la liste de logs
  pilButton: null, // id=dgm:pilotbtn
  htmBtnPilActiver: '<img alt="" src="http://www.hordes.fr/gfx/forum/smiley/h_arrow.gif"/>Activer le pilotage',
  htmBtnPilDesactiver: '<img alt="" src="http://www.hordes.fr/gfx/forum/smiley/h_warning.gif"/>Pilotage actif! (désactiver)',
  highRefresh: 4000, // rafraichi toutes les n secondes en mode boost
  lowRefresh: 40000, // rafraichi toutes les 1/2 mn en mode stand-by
  schedName: "piloteSched", // non du planificateur ControlSync
  mesActionsTag: "Mes Actions:", // remplace "Mes Actions" pour marquer la page avant rechargement...
  lastCmdTime: 0, // timestamp, temps (en secondes du jour) de la dernière commande reçue depuis l'activation
  lastReadMsgTS: 0, // timestamp, temps (en secondes du jour) du dernier message, tel qu'affiché dans le log de discussion
  lastReadMsgRO: -1, // read offset, décallage par rapport à un temps où plusieurs ont été lu. -1 aucun, 0 premier déjà lu, etc, -2: code pour refaire la purge après déplacement.
  monPseudo: "", // réglé en automatique par dialogue sur case
  validBoss:  new Array (), // les joueurs pilotes autorisés
  aliases:  new Array (), // mes autres noms d'alias
  lastInv: null, // tableau du dernier inventaire demandé
  lastBagAct: null, // tableau des actions de sac (dernier demandé)
  UID: null, // identifiant unique secret (random)
}

Pilote.init = function() { // initialisation de l'objet ( PAS démarrage du pilotage ) // TODO: sortir les création DOM/html
	GM_log("Pilote: init ");//DEBUG
	this.UID= "# "+(Horloge.localTime()+10000)+" / "+(Math.floor( Math.random()*100000)+100000);
	this.pilButton = document.createElement('a');
	this.pilButton.setAttribute('id',    'dgm:pilotbtn');
	this.pilButton.setAttribute('class', 'button');
	this.pilButton.setAttribute('href',  '#ouside/pilote');
	// CONTENU du bouton: décidé plus bas suivant actif/inactif
	this.pilButton.addEventListener('click', function(evt) {
		evt.preventDefault();
		Pilote.basculer();
	}, false);

	this.pilBox = document.createElement('div');
	this.pilBox.setAttribute('id',    'dgm:pilotbox');
	this.pilBox.setAttribute('class', 'block mapBlock'); // mimétisme...
	var divhead= document.createElement('div');
	divhead.setAttribute('class', 'header');// mimétisme...
	this.pilBox.appendChild(divhead);
	var divbg= document.createElement('div');
	divbg.setAttribute('class', 'bg');// mimétisme...
	this.pilBox.appendChild(divbg);
	var divfooter= document.createElement('div');
	divfooter.setAttribute('class', 'footer');// mimétisme...
	this.pilBox.appendChild(divfooter);

	var titreh2= document.createElement('h2');
	var titreh2Txt= document.createTextNode("Pilotage");
	titreh2.appendChild(titreh2Txt);
	divbg.appendChild(titreh2);
	var listInfo=  document.createElement('ul');
	listInfo.setAttribute('class', 'ul');// mimétisme...
	divbg.appendChild(listInfo);
	var listLogs=  document.createElement('ul');
	listLogs.setAttribute('class', 'logs');// mimétisme...
	divbg.appendChild(listLogs);
	var divclear=  document.createElement('div');
	divclear.setAttribute('class', 'clear');// mimétisme...
	divbg.appendChild(divclear);

	listInfo.innerHTML = '<li>Version : <strong>'+DGM_PILOTE_VERSION+'</strong></li>'; // plus court que créer des noeuds DOM
	listLogs.innerHTML = '<li class="date">Journal</li>';
	this.pilBoxLogs= listLogs;

	var elemPseudoInfo= document.createElement('li');
	var labelPseudo= document.createTextNode("Pseudo : ");
	var strongPseudo=  document.createElement('strong');
	this.pilBoxPseudoTxtNode= document.createTextNode("* détection... patienter *"); // compte à rebour
	elemPseudoInfo.appendChild(labelPseudo);
	elemPseudoInfo.appendChild(strongPseudo);
	strongPseudo.appendChild(this.pilBoxPseudoTxtNode);
	listInfo.appendChild(elemPseudoInfo);

	var elemTimeInfo= document.createElement('li');
	var labelTMOUT= document.createTextNode("Vérifie dans : ");
	var strongTMOUT=  document.createElement('strong');
	this.pilBoxTmoutTxtNode= document.createTextNode("-- s"); // compte à rebour
	this.pilBoxRTimeTxtNode= document.createTextNode(" (--h--mn--s)"); // heure de prochain refresh
	elemTimeInfo.appendChild(labelTMOUT);
	elemTimeInfo.appendChild(strongTMOUT);
	strongTMOUT.appendChild(this.pilBoxTmoutTxtNode);
	elemTimeInfo.appendChild(this.pilBoxRTimeTxtNode);
	listInfo.appendChild(elemTimeInfo);

	var elemBossInfo= document.createElement('li');
	this.pilBoxBossTxtNode= document.createTextNode("Pas de chef.");
	elemBossInfo.appendChild(this.pilBoxBossTxtNode);
	listInfo.appendChild(elemBossInfo);

	// Suivant que le pilotage soit actif ou pas:
	// TODO : finalement: peut-être pas une bonne idée de reconduire le pilotage dès l'init ... à voir
	if ( GM_getValue(DGM_pilotage_actif_key, false) ) {
		// true => il est déjà actif 
		this.pilButton.innerHTML = this.htmBtnPilDesactiver;
		this.purgeMsg(); // en cas de reload forcé: ne pas traiter toute la pile de msg. TODO 1) vérifier ici si init pas appelé en d'autres circonstances... TODO 2) vérif si ça bug pas trop quand on n'est pas sur une page sans messages
	}else{  // false => il n'est PAS actif 
		this.pilButton.innerHTML = this.htmBtnPilActiver;
		// à priori pas besoin d'arrêter le tmout (fait avec le bouton...)
	}
}

Pilote.installBouton = function(step) {
	//GM_log("Pilote: installBouton "+ step);//DEBUG
	var mainNode = $('generic_section');
	if( mainNode == null || $('dgm:pilotbtn') != null ) {
		GM_log("Pilote: pas de generic_section ou pilotbtn déjà là"); //DEBUG
		return false;
	}
	var actionPanel = $xpath('div[@class="left"]', mainNode,
		XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
	var viewPanel   = $xpath('div[@class="right"]', mainNode,
		XPathResult.ANY_UNORDERED_NODE_TYPE).singleNodeValue;
	
	if( actionPanel == null || viewPanel == null ) {
		if( step == 1 ) {
			GM_log("Pilote: Step 1 et rien pour actionPanel"); //DEBUG
			//hmu/ WorkAround : Parfois, le panneau d'actions n'existe pas encore à ce moment.
			//hmu/ On lance donc un timer pour faire le boulot X millièmes de seconde plus tard
			var timer = setInterval(function() {
				Pilote.install(2);
				if( $('dgm:pilotbtn') != null ) {
					clearInterval(timer);
				}
			}, 500); //dgm/ initialement 50
			ControlSync.register(timer,'Pilote.installBouton');
		}
		
		GM_log("Pilote: rien pour actionPanel"); //DEBUG
		return false;
	}
	//dgm/ Ajout du bouton 
	actionPanel.appendChild(this.pilButton);

	// Installation de la détection interraction utilisateur // TODO devrait être ailleurs dans le post-refresh
	var frm= GenTools.getFormSpeak();
	if ( frm != undefined ) {
		var saisie= $xpath('input[@class="field"]', frm, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
		if ( saisie != null ) {
			//GM_log("Pilote.installBouton: mise en place détection sur saisie"); //DEBUG
			saisie.addEventListener("focus", Pilote.entreeUtilisateur, false);
			saisie.addEventListener("keydown", Pilote.entreeUtilisateur, false);
		}else{
			GM_log("Pilote.installBouton: pas de zone de saisie trouvée"); //DEBUG
		}
	}else{
		GM_log("Pilote.installBouton: pas de formulaire trouvé"); //DEBUG
	}

	if ( this.lastReadMsgRO == -2 ) {
		GM_log("Pilote.installBouton: nouvelle purge des messages"); //DEBUG
		this.lastReadMsgRO = -1;
		this.purgeMsg();
	}
}

Pilote.installBox = function(step) {
	//GM_log("Pilote: installBox "+ step);//DEBUG
	var mainNode = $('gameLayout');
	if( mainNode == null ) {
		GM_log("Pilote: pas de gameLayout"); //DEBUG
		return false;
	}
	if( $('dgm:pilotbox') != null ) {
		//GM_log("Pilote: pilotbox déjà là"); //DEBUG
		if ( GM_getValue(DGM_pilotage_actif_key, false) ) {
			// à relancer à la recharge de page si on est en pilotage ?
			// TODO-Z pour le moment déactivé: nouveau scheduler
			//this.createSchedule(); 
		}
		return false;
	}

	var mapBlock = $xpath('tbody/tr/td/div', mainNode,
		XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
	if( mapBlock == null ) {
		if( step == 1 ) {
			GM_log("Pilote: Step 1 et rien pour mapBlock"); //DEBUG
			var timer = setInterval(function() {
				Pilote.install(2);
				if( $('dgm:pilotbox') != null ) {
					clearInterval(timer);
				}
			}, 500); //dgm/ initialement 50
			ControlSync.register(timer,'Pilote.installBox');
		}
	
		GM_log("Pilote: rien pour mapBlock"); //DEBUG
		return false;
	}
	//dgm/ Ajout du bouton 
	mapBlock.parentNode.insertBefore(this.pilBox, mapBlock);
}

Pilote.install = function(step) {
	// PAS DE this ICI ! (passée en param)
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
	Pilote.installBouton(step); 
	if ( GM_getValue(DGM_pilotage_actif_key, false) ) {
		Pilote.installBox(step);
		Pilote.createSchedule(); // à relancer à la recharge de page si on est en pilotage
		if ( this.monPseudo=="" ) { // détection pseudo, utile si pilotage laissé activé et qu'on arrive sur le désert, sinon fait par la bascule
			this.parler(this.UID); // pour détecter le pseudo du joueur... (rien trouvé d'autre de mieux encore...)
		}
	}
}
/* PAS utilisé pour le moment
Pilote.postRefresh = function() { // Appelé par le scheduler une fois le rafraîchissement fait. // BUG!!! quand on passe Pilote.postRefresh au lieu de Pilote.install lors du Pilote.createSchedule : bug de boucle en détection de pseudo... (répète les n°)
	Pilote.install();
	//Navigator.syncMap(); // EN TEST
}
*/
Pilote.updateSyncInfo = function(cdown, ntime) { // Appelé par le scheduler pour la mise à jour du compte à rebour, etc
	// PAS DE this ICI
	var tmout= Math.round(cdown/1000); // secondes à rebour
	var nextTime= Math.round(ntime/1000); // moment en secondes du jour
	Pilote.pilBoxTmoutTxtNode.nodeValue= tmout + "s";
	Pilote.pilBoxRTimeTxtNode.nodeValue= " ( "+Horloge.sec2txt(nextTime)+" )"; // heure de prochain refresh
}

Pilote.clearSyncInfo = function() { // efface le compte à rebour, etc
	this.pilBoxTmoutTxtNode.nodeValue= "--s";
	this.pilBoxRTimeTxtNode.nodeValue= " ( --h--mn--s )"; // heure de prochain refresh
}

Pilote.addLogInfo = function(mainInfo, moreInfo) { // ajoute une info dans le journal
	if ( moreInfo == undefined )
		moreInfo= "";
	var onemorelog= document.createElement('li');
	onemorelog.setAttribute('class', 'entry CL_OutsideMessage');// mimétisme...
	onemorelog.innerHTML= "<em>["+Horloge.sec2digit(Horloge.localTime())+"]</em> <strong>"+mainInfo+"</strong> "+moreInfo;
	//this.pilBoxLogs.appendChild(onemorelog);
	this.pilBoxLogs.insertBefore(onemorelog,this.pilBoxLogs.firstChild.nextSibling); // logs inversé comme la discussion
}
Pilote.basculer = function() { // active si inactif et inversement
	if ( GM_getValue(DGM_pilotage_actif_key, false) ) {
		// valeur à true => on Désactive
		this.addLogInfo("Désactivation");
		if ( $('dgm:pilotbox') != null ) {
			this.pilBox.parentNode.removeChild(this.pilBox); 
		}
		GM_setValue(DGM_pilotage_actif_key, false);
		this.pilButton.innerHTML = this.htmBtnPilActiver;
		this.removeSchedule();
		this.clearSyncInfo();
	}else{  // valeur à false => on Active
		GM_setValue(DGM_pilotage_actif_key, true);
		this.pilButton.innerHTML = this.htmBtnPilDesactiver;
		Pilote.installBox(1);
		this.purgeMsg();
		this.createSchedule(); // avant de parler car parler() appelle refreshAsked du ControlSync 
		if ( this.monPseudo=="" ) {
			this.parler(this.UID); // pour détecter le pseudo du joueur... (rien trouvé d'autre de mieux encore...)
		}
		this.lastCmdTime= Horloge.localTime(); // on fait comme si l'activation est un ordre reçu
		this.addLogInfo("Activation");
	}
}

Pilote.removeSchedule = function() { // arrêt du sched de Pilotage
	ControlSync.stopScheduler(this.schedName);
}

Pilote.createSchedule = function() { // démarrage du sched de Pilotage
	var params= new Array();
	params['resol']= 1000;  // en ms le timer du scheduler (résolution) (pas moins de 500 je pense)
	params['MAPR']= this.highRefresh; // on commence en vitesse maxi
	params['maFunc']= Pilote.mainAction; // fonction principale
	params['rfFunc']= Pilote.actualiser; // fonction standard de rafraîchissement
	params['tgFunc']= Pilote.tagSection; // pour marquer la page, autant que possible 
	params['ntFunc']= Pilote.isNotTaggedSection; // savoir si elle n'est pas taggée
	params['inFunc']= Pilote.install;//Pilote.postRefresh; // pour faire réinstaller les boutons par le scheduler et mettre à jour carte flash
	params['siFunc']= Pilote.updateSyncInfo; // pour qu'on sache quoi afficher pour le compte à rebour
	params['RATO']= 6000; // combien de temps on attend le rafraîchissement avant de redemander
	params['RDTO']= 4000; // combien de temps une nouvelle page reste valide pour l'action principale
	if ( GM_getValue(DGM_pilotage_actif_key, false) ) { // on revérifie qd même
		if ( ControlSync.existsScheduler(this.schedName) ) {
			//GM_log("Pilote.createSchedule: schedule déjà présent ");//DEBUG
		}else{
			//GM_log("Pilote.createSchedule: création du schedule ");//DEBUG
			ControlSync.startScheduler(this.schedName, params); // gère lui-même un arrêt si existe déjà
		}
	}
}

Pilote.entreeUtilisateur = function(event) {
	// pas de this ici !!!!!!!!!!
	var delai= 8000; // en milisecondes TODO en réglage de pilote, pas ici (8 secondes) 
	//GM_log("Pilote.addGraceTime...");//DEBUG
	if ( GM_getValue(DGM_pilotage_actif_key, false)  && ControlSync.existsScheduler(Pilote.schedName) ) {
		//GM_log("Pilote.addGraceTime: délai= "+delai);//DEBUG
		ControlSync.addGraceTime(Pilote.schedName,delai);
	}

}

Pilote.lienActualiser = function() { // retourne le noeud du premier lien "Actualiser"
	// sert que pour Pilote.actualiser, c'est vraiment pour fignoler, faire exactement le même appel...
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

Pilote.getTagNode = function() { // retourne un noeud qui sert de support pour un marqueur (détection que la page a chargé)
	var node= $('generic_section');
	if ( node == null ) {
		return null;
	}
	// on utilise le libélé MES OBJETS comme emplacement...
	// var texteMesObjets= $xpath('div[@class="left"]/h2]', node, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
	//var texteMesObjets= node.childNodes[9].childNodes[2];
	var actionPanel= $xpath('div[@class="left"]', node, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
	if ( actionPanel== null ) {
		return null;
	}
	var texteMesActions= $xpath('h2', actionPanel, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
	if ( texteMesActions== null ) {
		return null;
	}
	return texteMesActions;
}
Pilote.tagSection = function() { // met un marqueur sur la partie rechargée de la page, retourne true si fait correctement
	// PAS DE this ICI ! (passée en param)
	var texteMesActions= Pilote.getTagNode();
	if ( texteMesActions != null ) {
		texteMesActions.innerHTML = Pilote.mesActionsTag;
		return true;
	}else{
		return false;
	}
}
Pilote.isNotTaggedSection = function() { // vrai si la section a un Mes Actions non taggé
	// PAS DE this ICI ! (passée en param)
	var texteMesActions= Pilote.getTagNode();
	if ( texteMesActions != null ) {
		if ( texteMesActions.innerHTML == "Mes Actions") {
			return true;
		}
	}
	return false;
}

Pilote.parler = function (blabla) { // parle sur la case
  var frm= GenTools.getFormSpeak();
  if ( frm == undefined ) {
    return false;
  }
  var saisie= $xpath('input[@class="field"]', frm, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
  saisie.value= blabla;
  ControlSync.refreshAsked(this.schedName); // puisqu'on parle...
  unsafeWindow.js.XmlHttp.post('outside/speak?sk='+GenTools.sk, frm);
  //GM_log("Pilote.parler: "+ frm.innerHTML); // 
}

Pilote.actualiser = function() { // actualise la page à droite
	// ATTENTION PAS DE "this" ici car fonction actualiser passée en paramètre à ControlSync
	//GM_log("Pilote: Actualisation ..."); //DEBUG
	ControlSync.stopAll(); 
	ControlSync.refreshAsked(Pilote.schedName);
	//pour la fonction originale, pas celle détournée:
	//unsafeWindow.js.XmlHttp._dgm_get('outside/refresh?sk='+GenTools.sk, Pilote.lienActualiser());
	unsafeWindow.js.XmlHttp._dgm_get('outside/refresh?logAll=1;sk='+GenTools.sk, Pilote.lienActualiser()); // avec le logAll

	//fonction modifiée, elle inclu le ControlSync.refreshAsked et ControlSync.stopAll
	//unsafeWindow.js.XmlHttp.get('outside/refresh?sk='+GenTools.sk, Pilote.lienActualiser());
}

Pilote.isValidBoss = function(unPseudo) { // retourne vrai si le param est un pseudo valide pour commander au script
	if ( this.monPseudo.toLowerCase() == unPseudo.toLowerCase() )
		return true;
	for ( var i=0; i<this.validBoss.length; i++ ){
		if ( this.validBoss[i].toLowerCase() == unPseudo.toLowerCase() ) {
			return true; // je sais: pas bien de quitter une boucle for comme ça
		}
	}
	return false;
}

Pilote.addBoss = function(unPseudo) { // ajoute un pseudo commandeur
	this.validBoss[this.validBoss.length]= unPseudo; // pas de contrôle si existe déjà, de toutes façons ne gênera pas
	if ( this.validBoss.length == 1 ) {
		this.pilBoxBossTxtNode.nodeValue= "Mon chef: "+unPseudo;
	}else{
		var bosslist= "Mes chefs: "+this.validBoss[0];
		for ( var i=1 ; i<this.validBoss.length; i++ ) {
			bosslist= bosslist+", "+this.validBoss[1];
		}
		this.pilBoxBossTxtNode.nodeValue= bosslist;
	}
}

Pilote.addAlias = function(unAlias) { // ajoute un alias pour soi
  this.aliases[this.aliases.length]= unAlias; // pas de contrôle si existe déjà, de toutes façons ne gênera pas
}

Pilote.isOrderForMe = function(leTexte, lePseudo) { // vérifie le texte pour savoir s'il y a un ordre qui est destiné au joueur
	if ( leTexte.charAt(0) != '@' )
		return false;
	var delim= leTexte.indexOf(': ');
	if ( delim == - 1 )
		return false;
	var dest= leTexte.substr(1, delim-1);
	GM_log("Pilote.isOrderForMe: destinataire= "+dest); //DEBUG
	if ( dest.toLowerCase() == this.monPseudo.toLowerCase() || dest.toLowerCase() == "all" || ( dest== "" && lePseudo==this.monPseudo) )
		return true;
	for ( var i=0; i<this.aliases.length; i++ ){
		if ( dest.toLowerCase() == this.aliases[i].toLowerCase() ) {
			return true; // je sais: pas bien de quitter une boucle for comme ça
		}
	}
}

Pilote.parseOrder = function(leTexte) { // lit l'ordre et le retourne (minuscules forcées)
	//var cmd= leTexte.match(/: [a-z]* /);
	//var cmd= leTexte.substr(leTexte.indexOf(': ')+2,leTexte.indexOf(' ',leTexte.indexOf(': ')+3)-1);
	var cmd= leTexte.split(' ')[1].toLowerCase();
	if ( cmd.length >=2 ) {
		return cmd; // plus tard affinage et alias...
	}else{
		return 'nil'; // pas d'ordre repéré
	}
}

Pilote.parseArgs = function(leTexte) { // lit les arguments de l'ordre et les retourne (tableau)
	var params = leTexte.split(' '); // attention: pas d'espace en trop, mais un après le ':' ! "@pseudo: cmd par1 par2"
	params.shift();
	params.shift();
	return params; // TODO à mieux blinder, voir cas limites: pas de commande, etc, mais pas urgent
}

Pilote.purgeMsg  = function() { // considérer tous les messages actuels comme lus (à l'activation du pilotage)
	var chatMsg= GenTools.discussion();
	this.lastReadMsgTS= 0;
	this.lastReadMsgRO= -1;
	GM_log("Pilote.purgeMsg: appelé pour purger."); //DEBUG
	if ( chatMsg.length > 0 ) {
		var nb=0; // combien de la même heure en dernier ?
		var lastTS= chatMsg[chatMsg.length - 1].heure; // heure du dernier
		var i= chatMsg.length - 1; // on se place sur le plus récent message
		while ( i >= 0 && chatMsg[i].heure == lastTS ) {
			this.lastReadMsgRO++; // marqué comme lu à ce rang (parcours à l'envers mais revient au même)
			i--; // on descend dans le tableau du plus récent au plus vieux
		}
		GM_log("Pilote.purgeMsg: seront ignorés ceux de "+Horloge.sec2txt(lastTS)+" rang "+this.lastReadMsgRO); //DEBUG
		this.lastReadMsgTS= lastTS;
	}// pas de else: rien à faire si vide déjà
}

Pilote.getNextValidMsg = function() { // pour traiter UN (éventuel) nouveau message valide (le plus ancien nouveau)
	var chatMsg= GenTools.discussion();
	var nextValidMsg= null;
	var isNew; // vrai si on arrive sur la partie nouvelle / pas lue du tableau
	var offset= 0; // indice de l'éventuel prochain message à considérer sur la même heure (comme en js, 0 = le 1er)
	var i=0; // parcours du tableau de messages renvoyé par discussion()

	if ( (!(chatMsg['full'])) && chatMsg['firstTime']==chatMsg[0].heure && chatMsg[0].heure == this.lastReadMsgTS ) { // On n'a pas tout et les plus anciens sont partiellement lu et perdus... # TODO redemander un refresh avec tous plutôt ? bof: il faudrait vraiment 7 événements de la même minute, suite à un truc qui fait qu'on n'a pas le refresh complet...
		GM_log("Pilote.getNextValidMsg: certains messages de "+Horloge.sec2digit(chatMsg[0].heure)+" sont ignorés!"); // DEBUG
		this.lastReadMsgRO= chatMsg.length; // on fait comme si on les avait tous lus, plutôt que risquer de faire deux fois le même
	}
	while ( i < chatMsg.length && nextValidMsg == null ) {
		if ( this.monPseudo=="" && chatMsg[i].texte == this.UID ) { // mon propre pseudo pas encore déterminé et mon identifiant trouvé
			this.monPseudo= chatMsg[i].pseudo; // on s'est trouvé soi-même
			this.pilBoxPseudoTxtNode.nodeValue= this.monPseudo;
		}
		//GM_log("Pilote.getNextValidMsg: i="+i+" à "+Horloge.sec2txt(chatMsg[i].heure)); //DEBUG
		isNew= false; // pas terrible ce truc... mais évite de doubler du code
		if ( chatMsg[i].heure > this.lastReadMsgTS ) { // du nouveau c'est sûr !
			//GM_log("Pilote.getNextValidMsg: nouveau car plus récent sûr"); //DEBUG
			this.lastReadMsgTS= chatMsg[i].heure; // màj du timestamp, repère de temps
			this.lastReadMsgRO= 0; // réinit: 1er rang lu
			offset= 0; // pas oublier: on a bien lu le premier de la série
			isNew=true; // voilà un nouveau message 
		}else if ( chatMsg[i].heure == this.lastReadMsgTS) { // ah! même heure, utiliser l'offset
			//GM_log("Pilote.getNextValidMsg: même minute... offset="+offset+" MsgRO="+this.lastReadMsgRO); //DEBUG
			if ( offset > this.lastReadMsgRO ) { // nouveau de la même minute
				isNew=true; // voilà un nouveau message 
				//GM_log("Pilote.getNextValidMsg: nouveau de la même minute"); //DEBUG
				// normalement on a ici "this.lastReadMsgRO + 1 = offset" autant vérifier l'algo...
				if ( this.lastReadMsgRO + 1 != offset ) {//ERRLOG
					GM_log("ERR! Pilote.getNextValidMsg: débugger l'algo, truc louche.");//ERRLOG
					GM_log("ERR! MsgRO="+this.lastReadMsgRO+" offset="+offset);//ERRLOG
				}//ERRLOG
				this.lastReadMsgRO= offset; // équivallent à this.lastReadMsgRO++; normalement
			}
			offset++;
		}
		if ( isNew && this.isValidBoss(chatMsg[i].pseudo) && this.isOrderForMe(chatMsg[i].texte, chatMsg[i].pseudo) ) { // nouveau, de la part d'un chef, pour moi
			nextValidMsg= chatMsg[i]; // on sort du 'while' avec le message
		}else{
			i++; // on continue le parcours des messages
		}
	}
	return nextValidMsg;
}


Pilote.updateBagInventory = function() { // simple wrapper pour collecter l'inventaire
  this.lastInv= GenTools.objets_sac();
}

Pilote.updateBagActions = function() { // simple wrapper pour collecter l'inventaire
  this.lastBagAct= GenTools.get_actions();
}

Pilote.lastInv2Text = function() { // retourne texte pour affichage inventaire
	var places= GenTools.freeSlot();
	if ( this.lastInv == null || this.lastInv.length==0 ) {
		return "Mon sac est vide, "+places+" places.";
	}
	var contenu="J'ai: ";
	for (i=0; i < this.lastInv.length; i++) {
		contenu= contenu + (i+1) + ") " + this.lastInv[i][1]+ ". "; // affiché avec des indices débutant à 1 !!!
	}
	if (places==0) {
		contenu= contenu + " (plein)"
	}else if (places==1){
		contenu= contenu + " (1 place)"
	}else{
		contenu= contenu + " ("+places+" places)"
	}
	return contenu;
}

Pilote.lastBagAct2Text = function() { // retourne texte pour affichage actions de sac
	if ( this.lastBagAct == null || this.lastBagAct.length==0 ) {
		return "Rien d'utilisable dans mon sac";
	}
	var contenu="Je peux: ";
	for (i=0; i < this.lastBagAct.length; i++) {
		contenu= contenu + (i+1) + ") " + this.lastBagAct[i][1]+ ". "; // affiché avec des indices débutant à 1 !!!
	}
		return contenu;
}

Pilote.removeFromBag = function(invNo) { // larguer un truc, par numéro d'inventaire fait récemment, premier=1 !!!
	if ( invNo>0 && invNo<=this.lastInv.length ) {
		invNo--; // pour des indices du tableau débutant à 0
		unsafeWindow.js.XmlHttp.get('tool/'+this.lastInv[invNo][0]+'/removeFromBag?sk='+GenTools.sk, this.lastInv[invNo][2]);
	}else{
		this.parler("J'ai rien pour "+invNo+").");
	}
}

Pilote.toolUse = function(actNo) { // utiliser un truc du sac
	//GM_log("Pilote.toolUse: "+actNo); //DEBUG
	if ( actNo>0 && actNo<=this.lastBagAct.length ) {
		actNo--; // pour des indices du tableau débutant à 0
		//GM_log('tool/'+this.lastBagAct[actNo][0]+'/use?sk='+GenTools.sk); //DEBUG
		unsafeWindow.js.XmlHttp.get('tool/'+this.lastBagAct[actNo][0]+'/use?sk='+GenTools.sk, this.lastBagAct[actNo][2]);
	}else{
		this.parler("Rien à faire pour "+actNo+").");
	}
}

Pilote.rentrerAuChaud = function() { 
	var btn= GenTools.getCrossGatesBtn();
	//GM_log("Pilote.rentrerAuChaud appelé."); //DEBUG
	if ( btn == null ) {
		GM_log("ERR! Pilote.rentrerAuChaud appelé alors que le bouton n'est pas trouvé."); //ERRLOG
		return false;
	}
	unsafeWindow.js.XmlHttp.get('city/crossDoors?sk='+GenTools.sk, btn );
}

Pilote.grabItemTxt = function(itemName) { // prend un truc dont le nom commence par... (min/MAJ indif.)
	var idNode = GenTools.get_id_objet(itemName);
	if ( 'id' in idNode ) { // présence de clé du tableau associatif
		//GM_log("Pilote.grabItemTxt: prendre "+idNode['id']); //DEBUG
		unsafeWindow.js.XmlHttp.get('tool/grabItem?id='+idNode['id']+'&b=false;sk='+GenTools.sk,idNode['node']);
	}
}

Pilote.searchGround = function() { // Fouiller // parfois inoppérant ? TODO retester & corriger
	//unsafeWindow.js.XmlHttp.get('outside/searchGround?sk='+GenTools.sk,node); 
	unsafeWindow.js.XmlHttp.get('outside/searchGround?sk='+GenTools.sk); // TODO récupérer le node du bouton...
}

Pilote.move = function(cap) { // 
		this.lastReadMsgRO = -2; // pour ignorer les messages à l'arrivée
		Navigator.move(cap); // TODO faire des vérif avant    
		//this.parler("Déplacements désactivés");// A GARDER si on commente le "move" au dessus
		//GenTools.jsReboot(); // !! pas bon: ré-init...
		unsafeWindow.js.JsMap.dispose(); // ferme le flash, plus de carte car pas à jour... # TODO faire un vrai refresh
		this.addLogInfo("Carte", "Désactivation de la carte");
}

Pilote.mainAction = function() { //
	// !!!!!!!!! ici le 'this' passe pas à cause du callback !!! :-[
	//GM_log("Pilote: Main Action !!!"); //DEBUG
	GenTools.closeNotif();
	var CT= Horloge.localTime(); // secondes du jour

	var nxtMsg= Pilote.getNextValidMsg(); 
	if (nxtMsg != null ){
		GM_log("Traitement de: "+Pilote.parseOrder(nxtMsg.texte)+' params: '+Pilote.parseArgs(nxtMsg.texte).join(";")); //DEBUG
		Pilote.lastCmdTime= CT; // on vient de recevoir un ordre (heure approximative...)
		ControlSync.setMainActionPeriod(Pilote.schedName,Pilote.highRefresh); // on passe à la vitesse maxi de refresh
		Pilote.executeOrder( Pilote.parseOrder(nxtMsg.texte), Pilote.parseArgs(nxtMsg.texte) );
	}else{
		//GM_log("Pas de nouvel ordre.");//DEBUG
		// réduire la vitesse de rafraîchissement: // EN TEST! TODO trouver une formule add-hoc, sortir le calcul de cette fonction
		var newRefreshP;
		var att= CT-Pilote.lastCmdTime; // attente en secondes
		var palierA= 60; // baisse doucement le refresh jusque là
		var palierB= 5*60; // atteinte du low refresh là (5mn d'inactivité)
		var medRefresh= Pilote.highRefresh * 2; // refresh moyen palier A en milisecondes

		if ( att < palierA ) { // dernier ordre encore récent (40s)
			newRefreshP=  Math.round(Pilote.highRefresh + (medRefresh - Pilote.highRefresh)*(att/palierA)) ;  // rampe du high vers med sur les 40 premières secondes
		}else{
			newRefreshP=  medRefresh + Math.round(((att-palierA)/(palierB-palierA))*( Pilote.lowRefresh - medRefresh)) ;
		}
		newRefreshP= Math.max( Pilote.highRefresh, newRefreshP );
		//newRefreshP= Math.min( Pilote.lowRefresh, Pilote.highRefresh + 1000*Math.round((CT-Pilote.lastCmdTime)/5)); // milisecondes
		newRefreshP= Math.min( Pilote.lowRefresh, newRefreshP); // plafond maxi: le lowRefresh
		//GM_log("Pilote.mainAction: pas d'ordre; refresh à "+newRefreshP); // DEBUG
		ControlSync.setMainActionPeriod(Pilote.schedName,newRefreshP);
	}


}

//***** EXECUTION DES ORDRES *****//
Pilote.executeOrder = function(cmd, params) { // exécute et -devrait- renvoie un code retour, 0= ok, sinon =code erreur / statut
	if ( ! cmd.length >= 2 ) {
		GM_log("Pilote.executeOrder: ordre à fournir");
		return -1;
	}
	var ordreCompris= true; // mis à false plus loin

	// TODO compter les arguments de façon fiable (même si pas de 2e param)
	if ( cmd == 'ver' ) {
	  this.parler('Pilote v '+DGM_PILOTE_VERSION);
	}else if ( cmd == 'say' ) {
		this.parler(params.join(' '));
	}else if ( cmd == 'pa' ) {
		//this.parler('PA='+GenTools.pa_disponible());
		var tab = GenTools.get_etats();
		var texte = 'PA= '+GenTools.pa_disponible();
		if (tab.length>0)
			texte = texte + ' etat(s)= ';
		for (i=0;i<tab.length;i++){
			texte = texte + '[' + tab[i] + ']';
		}
		this.parler(texte);
	}else if ( cmd == 'boss' ) { // ajoute un ou des pseudos commandeurs
		if ( params.length>0 ) {
			for(i=0; i < params.length; i++) {
				this.addBoss( params[i] );
			}
		}else{                    // liste les pseudos commandeurs actuels
			this.parler('Mes chefs: '+this.validBoss.join(', '));
		}
	}else if ( cmd == 'alias' ) { // ajoute un ou des pseudos commandeurs
		if ( params.length>0 ) {
			for(i=0; i < params.length; i++) {
				this.addAlias( params[i] );
			}
		}else{                    // liste les pseudos commandeurs actuels
			this.parler('Mes alias: '+this.aliases.join(', '));
		}
	}else if ( cmd == 'inv' ) {
		this.updateBagInventory();
		this.parler(this.lastInv2Text());
	}else if ( cmd == 'act' ) {
		this.updateBagActions();
		this.parler(this.lastBagAct2Text());
	}else if ( cmd == 'test' ) { // TEST (pour des tests )
		this.addLogInfo(params[0], params[1]);
		
	//### Commandes avec conséquences ! ###
	}else if ( cmd == 'go' ) {
		ControlSync.refreshAsked (this.schedName);
		if ( GenTools.pa_disponible() > 0 ) {
			this.move(params[0]);
		}else{
			this.parler("Je n'ai plus de pa pour aller "+params[0]);
		}
	}else if (cmd == 'take'){
		ControlSync.refreshAsked (this.schedName);
		this.grabItemTxt(params[0]);
	}else if ( cmd == 'dig' ) {
		ControlSync.refreshAsked (this.schedName);
		this.searchGround();
	}else if ( cmd == 'drop' ) {
		ControlSync.refreshAsked (this.schedName);
		this.removeFromBag(params[0]);
	}else if ( cmd == 'do' ) {
		ControlSync.refreshAsked (this.schedName);
		this.toolUse(params[0]);
	}else if ( cmd == 'nil' ) {
		//rien, pratique pour copier et ajouter une commande
	}else{ // non prévu
		ordreCompris= false;
		GM_log("Pilote.executeOrder: pas compris l'ordre: "+cmd);
	}
	if ( ordreCompris ) {
		this.addLogInfo("Ordre", cmd+" "+params.join(' '));
	}else{
		this.addLogInfo("Ordre inconnu", cmd+" "+params.join(' '));
	}
}
//

//
// Initialisation du script
//
GenTools.init();
Horloge.init();
ControlSync.init();
Navigator.init();
Pilote.init();

//dgm/ Insertions des éléments au bon moment
if( typeof(unsafeWindow.js) != 'undefined' ) {
	//
	// On s'intercalle devant la méthode js.XmlHttp.get() pour lancer le script au bon moment
	//
	// TODO peut-être s'intercaller aussi sur js.Js.reboot(); 
	unsafeWindow.js.XmlHttp._dgm_get = unsafeWindow.js.XmlHttp.get;
	unsafeWindow.js.XmlHttp.get = function(purl,pobj) {
		ControlSync.refreshAsked(); // prise de date sur la demande de rafraîchissement
		ControlSync.stopAll(); // pas la peine qu'ils tentent de s'installer: ça va charger
		this._dgm_get(purl,pobj);
		//var url = this.urlForBack;
		if( /outside/.test(purl) || !( /outside\/doors/.test(purl) ) ) { //dgm/ idée: vérifier si de la forme outside sinon pas la peine
			var timerinit2= setTimeout( 
				function(){
					Pilote.install(1);
					//Navigator.installBouton(1); //TEST
				}
				,1000); // le temps de charger les deux panneaux
		}
/**/
	};
	
}

window.addEventListener('load',function(){ControlSync.stopAll(); Pilote.install(1);} ,false); //dgm/ pratique pour tester, utile en cas de d'activation et reload de page

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
