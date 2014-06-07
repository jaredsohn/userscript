// ==UserScript==
// @name           EpicSynchro
// @namespace      *
// @version       0.2.4
// @description    Aide aux synchros pour Epic War
// @include			http://*.epic-war.net/choix_equip_arme.php*
// @include			http://*.epic-war.net/mouv.php*
// @include			http://*.epic-war.net/mouv_fin.php*
// @include			http://*.epic-war.net/att_ench.php*
// @include			http://*.epic-war.net/att_ench_fin.php*
// @include			http://*.epic-war.net/att_p_cac.php*
// @include			http://*.epic-war.net/soigner.php*
// @include			http://*.epic-war.net/att_pet.php*
// @include	 		http://*.epic-war.net/frame_map.php*
// @include			http://*.epic-war.net/frame_warchat.php?type=escouade*
// ==/UserScript==





/*
+-------------------------------------------------------+
|														|
|			Paramètres de EpicSynchro					|
|														|
+-------------------------------------------------------+
Permet de paramètrer l'activation de EpicSynchro sur chaque serveur et les logs que l'on veut envoyer
(Les logs que vous définissez sont ceux que vous envoyez sur le chat, pas ceux que vous recevez)
true : option activée                    false : option désactivée
*/

//Activation/Désactivation de ES par serveur
var ESonV = true ; 	// pour Venice
var ESonX = true ; 		// pour Xaeno
var ESonB = false ; 	// pour Babel

//Activation/Désactivation des logs par action
var attSucc = true ; 	//pour les attaques réussies
var attEch = true ; 	//pour les attaques ratées
var attFat = true ; 	//pour les attaques fatales
var dezSucc = true ; 	//pour les désenchantements réussis
var malaSucc = true ; 	//pour les malédictions réussies
var soinSucc = false ; 	//pour les soins réussis

/*
+----------------------+
|  Fin du paramétrage  |
+----------------------+
*/











//Recherche du nom du serveur
var adServ = document.location.href;
nomServ = adServ.substring(7,adServ.indexOf(".epic"));
	
if (adServ.indexOf("warchat") == -1 && chatOuPas(nomServ) && adServ.indexOf("map") == -1) //Page où il faut charger le chat
{
	//Affichage du chat
	var grdeTable=document.getElementsByTagName('table')[0];
	grdeTable.width='100%';
	var placeChat=grdeTable.insertRow(3).insertCell(0);
	placeChat.colSpan=2;
	var adChat = 'http://' + nomServ + '.epic-war.net/frame_warchat.php?type=escouade';
	placeChat.innerHTML='<div align="center" style="height: 485px;" id="chatbox_bottom"><iframe scrolling="no" height="100%" frameborder="0" width="100%" marginheight="0" marginwidth="0" id="frame_chatbox" src="' + adChat + '"></iframe></div>';

	//Finitions graphiques
	var ESbordure = grdeTable.rows[3].insertCell(1);
	ESbordure.id ="frameFillerHR";
	var ESbordureGB = grdeTable.insertRow(4).insertCell(0);
	ESbordureGB.id ="frameCornerBL";
	var ESbordureB = grdeTable.rows[4].insertCell(1);
	ESbordureB.id ="frameFillerVB";
	var ESbordureDB = grdeTable.rows[4].insertCell(2);
	ESbordureDB.id ="frameCornerBR";
	
	//Ajouter le bouton pour signaler la fin du rush
	if (adServ.indexOf('att_p') != -1)
	{
		document.getElementById('EW_Content_Action').innerHTML += '<form name="fromChat"><input type="button" value="Signaler rush terminé" onclick=finRush() ></form>';
		//Insère la fonction permettant d'annoncer la fin de son rush
		var fctFinRush = 'function finRush () { document.getElementById("frame_chatbox").contentDocument.getElementById("msg").value = "Rush Terminé" ; document.getElementById("frame_chatbox").contentDocument.getElementsByTagName("input")[1].click(); }';
		InsererScript ('EpicSynchro0',fctFinRush);
	}
	
	//Pour renvoyer en haut une fois le script affiché
	setTimeout(recharge,600);
}


/*else if (adServ.indexOf("map") != -1) //Frame principal
	document.getElementById("epicfriend_commandes_joueur").innerHTML += '&nbsp;<a target="f2" href="frame_warchat.php?type=escouade" style="font-size: 10px;" class="EW_LinkLight">EpicSynchro</a>';
	//Retiré car incompatible avec EpicFriend*/

else //Warchat de l'escouade
{
	//Traitement du Log si il y en a un
	if (parent.document.getElementById('EW_Content_Action')!= null)
	{
		var logA = parent.document.getElementById('EW_Content_Action').innerHTML;
		var logAffich = "";
		var typeLogB = -1;
	
		//Si on utilise la chance (réussi du premier coup ne  necessite pas de changement du log)
		if ((logA.indexOf("Veinard") != -1) || (logA.indexOf("Catastrophe") != -1)) 
		{
			var typeLog = logA.length;
			logA = logA.substring((logA.indexOf("<br>"))+2,typeLog);
		}
		
		
		
		typeLogB = logA.indexOf("manqué"); 
		if ((typeLogB != -1) && attEch)//Cas d'une attaque ratée
		{	
			if (logA.indexOf("vous avez")!= -1) //Pour différencier entre attaque du joueur ou de son familier
				var tmp = 10;
			else
				var tmp = 17;
			var typeLog = logA.indexOf(" Vous ne gagnez");
			logAffich = "LOG : " + logA.substring(typeLogB-tmp,typeLog-2);
		}
		
		typeLogB = logA.indexOf("touché");
		if ((typeLogB != -1) && attSucc) //Cas d'une attaque réussie (pas necessaire de differencier attaque du joueur et du familier)
		{
			var typeLog = logA.lastIndexOf("dégât");
			typeLogB = logA.indexOf("vie");
			var logAffich = logA.substring(typeLog+12,typeLogB-11) + "v";
			
			//Cas où on tappe un fam (j'ai pas mieux que race par race)
			//version Homme
			var famHom = logAffich.indexOf("(Humain)");
			if (famHom != -1)
			{
				logAffich = logAffich.substring(famHom+8,50);
				logAffich = "Le fam" + logA.substring( logA.indexOf("(Humain)")+8 , logA.indexOf(" et lui avez")) + logAffich;
			}
			//version Elfe
			var famHom = logAffich.indexOf("(Elfe)");
			if (famHom != -1)
			{
				logAffich = logAffich.substring(famHom+8,50);
				logAffich = "Le fam" + logA.substring( logA.indexOf("(Elfe)")+8 , logA.indexOf(" et lui avez")) + logAffich;
			}
			//version Nain
			var famHom = logAffich.indexOf("(Nain)");
			if (famHom != -1)
			{
				logAffich = logAffich.substring(famHom+8,50);
				logAffich = "Le fam" + logA.substring( logA.indexOf("(Nain)")+8 , logA.indexOf(" et lui avez")) + logAffich;
			}
			//version Orc
			var famHom = logAffich.indexOf("(Orc)");
			if (famHom != -1)
			{
				logAffich = logAffich.substring(famHom+8,50);
				logAffich = "Le fam" + logA.substring( logA.indexOf("(Orc)")+8 , logA.indexOf(" et lui avez")) + logAffich;
			}
			//version MV
			var famHom = logAffich.indexOf("(Mort-vivant)");
			if (famHom != -1)
			{
				logAffich = logAffich.substring(famHom+8,50);
				logAffich = "Le fam" + logA.substring( logA.indexOf("(Mort-vivant)")+8 , logA.indexOf(" et lui avez")) + logAffich;
			}
			
		
			if (logA.indexOf("critique") != -1)
				logAffich = "LOG : CC " + logAffich ; //Cas d'un coup critique
			else
				logAffich = "LOG : " + logAffich ;
		}
	
		typeLogB = logA.indexOf("Vous avez achevé");
		if ((typeLogB != -1) && attFat) //Cas d'un coup fatal
		{
			var typeLog = logA.indexOf("en lui infligeant");
			var typeLogC = logA.indexOf("vie");
			logAffich = "LOG : " + logA.substring(typeLogB,typeLog-1) + " (" + logA.substring(typeLog+17,typeLog-12) + "v enlevés)";
		}
	
		typeLogB = logA.indexOf("Vous avez désenchanté") ;
		if ((typeLogB != -1) && dezSucc)//Cas d'un dez réussi (offensif comme défensif)
		{
			var typeLog = logA.indexOf(" Celui-ci n'a plus");
			logAffich = "LOG : " + logA.substring(typeLogB,typeLog);
		}
	
		typeLogB = logA.indexOf("maudit") ;
		if ((typeLogB != -1) && malaSucc)//Cas d'un enchantement offensif réussi
		{
			var typeLog = logA.indexOf(" Celui-ci");
			logAffich = "LOG : " + logA.substring(typeLogB-10,typeLog);
		}
	
		typeLogB = logA.indexOf("soigner");
		if ((typeLogB != -1) && soinSucc) //Cas d'un soin réussi
		{
			var typeLogC = logA.indexOf("redonné");
			if (typeLogC != -1) //Soin sur un autre joueur (ne marche pas sur les fam)
			{
				var typeLog = logA.indexOf(" ! Vous gagnez");
				var nomSoigné = logA.substring(typeLogB+8,typeLog); //récupération du nom de ce joueur
				typeLog = logA.indexOf("vie");
				logAffich = "LOG:Vous avez " + logA.substring(typeLogC,typeLog-11) + "v à " + nomSoigné;
			}
			else //Soin sur soi
			{
				typeLogB = logA.indexOf ("expérience et");
				var typeLog = logA.indexOf ("vie")
				if (typeLog != -1)
					logAffich = "LOG : Vous vous êtes redonné " + logA.substring(typeLogB+14,typeLog-11) + "v";
			}
		}
		
		
		if (logAffich != "") //Poste le log
		{
			document.getElementById('msg').value = logAffich ;
			document.getElementsByTagName('input')[1].click();
		}
	}
}


//Permet de remonter en haut de page
function recharge ()
{
	var newURL = document.location.href+'#';
	window.location.replace(newURL);
}

//Teste si il faut afficher le chat suivant le serveur
function chatOuPas (serv)
{
	if ((serv=='venice') && ESonV)
		return true;
	else if ((serv=='xaeno') && ESonX)
		return true;
	else if ((serv=='babel') && ESonB)
		return true;
	else
		return false;
}





//Fonction générique d'insertion d'un script Javascript (venant du script de EpicFriend)
function InsererScript(sId, code)
{
	var oScript = document.createElement("script");
	oScript.setAttribute("id", sId);
	if(typeof code == "string")
		oScript.appendChild(document.createTextNode(code));
	else if(typeof code == "function")
		oScript.appendChild(document.createTextNode(code.toSource()));
	if(typeof document.getElementsByTagName("head")[0] == "undefined")
	{
		GM_log("Erreur: élément HEAD introuvable via le DOM!");
		GM_log('Erreur: élément HEAD introuvable via le DOM!');
		return false;
	}
	document.getElementsByTagName("head")[0].appendChild(oScript);
	return true;
}