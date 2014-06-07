// ==UserScript==
// @name        Craftinor
// @namespace   http://www.jeuxvideo.com/
// @description Logistique Craftinor
// @include 	http://www.jeuxvideo.com/forums/*
// @version     1.0
// ==/UserScript==

function init()
{
	var urlForum = window.location.href;
	if (urlForum[32] == 0 || urlForum[48] == 2)
	{
		//Verification de la connection a la moderation.
		var moderationActif = document.querySelector("#liste_topics tbody tr").getElementsByTagName('th')[1];
		if (moderationActif.className == "col_moder")
		{
			//Creation de la colonne de lock
			colonneLockTopic();
			//Creation de la colonne de selection
			colonneSelectionTopic();
			//Chargement interface Moderation
			interfaceModeration();
			//Chargement bouton Kick Auteur
			boutonKickAuteur();
			//Chargement bouton DDB Auteur
			boutonDdbAuteur();
			//Chargement bouton Mass Eraze
			boutonMassEraze();
			//Chargement bouton Mass Lock
			boutonMassActionLock();
			//Chargement bouton Mass Delock
			boutonMassActionDelock();
			//Chargement bouton Liste Kick
			boutonListeKick();
			//Chargement bouton Configuration
			boutonConfiguration();
			//Verification du Premier Lancement
			//localStorage['premierLancement'] = "fkopakfaoprkvnvao";
			premierLancement();
		}
	}
};

function premierLancement()
{
	//Initialisation des variables de stockages.
	var premierLancement = localStorage['premierLancement'];
	if (premierLancement != 0)
	{
		alert("Merci d'avoir installé l'utilitaire de modération Craftinor, cet utilitaire a été crée par Komalis pour rendre la modération plus facile, il est pour l'instant en version Alpha.");
		//var idForum = "24777";
		localStorage['idForum'] = "0";
		localStorage['premierLancement'] = 0;
		localStorage['messageLock'] = "";
		localStorage['postAutomatique'] = 0
		localStorage['kickDDB'] = 0;
		eventBoutonConfiguration();
	}
}

function interfaceModeration()
{
	//Creation du menu de moderation
	var boutonInteractif = document.querySelector("#menu_interactif");
	var boutonModeration = document.createElement('div');
	boutonModeration.id = "menu_interactif";
	var boutonModerationH3 = document.createElement('h3');
	var boutonModerationImg = document.createElement('img');
	boutonModerationImg.src = "http://image.jeuxvideo.com/pics/blank.gif";
	boutonModerationImg.alt = "Moderation";
	var boutonModerationUl = document.createElement('ul');
	boutonModerationUl.id = "moderationUl";
	var boutonMassLock = document.createElement('li');
	boutonMassLock.id = "boutonMassLock";
	boutonMassLock.href = "javascript:void(0);";
	boutonMassLock.addEventListener("click", function() {eventBoutonMassActionLock();}, false);
	boutonMassLock.innerHTML = '<a href="javascript:void(0);">Mass Lock</a>';
	document.querySelector("#menu_rubriques").insertBefore(boutonModeration, boutonInteractif).appendChild(boutonModerationH3).appendChild(boutonModerationImg);
	document.querySelector("#menu_interactif").appendChild(boutonModerationUl);
};

function boutonKickAuteur()
{
		//Ajout de bouton de Kick Auteur
		var boutonKickAuteur = document.createElement('li');
		boutonKickAuteur.id = "boutonKickAuteur";
		boutonKickAuteur.href = "javascript:void(0);";
		boutonKickAuteur.addEventListener("click", function() {eventBoutonKickAuteur();}, false);
		boutonKickAuteur.innerHTML = '<a href="javascript:void(0);">Mass Kick</a>';
		document.querySelector("#moderationUl").appendChild(boutonKickAuteur);
};

function eventBoutonKickAuteur()
{
	var lockConfirmation = confirm('Êtes-vous sûr de vouloir kicker tout les pseudonymes sélectionnés ?'); 
	if (lockConfirmation)
	{
		//Ce qui se passe quand on appuit sur le bouton.
		var nombresSujets = document.querySelector("#liste_topics tbody").childElementCount;
		for (var i = 1 ; i < nombresSujets ; i++)
		{
			var checkBoxSelection = document.querySelector("#selec" + i);
			if (checkBoxSelection.checked)
			{
				var imgTopic = document.querySelector("#liste_topics tbody").getElementsByTagName('tr')[i].querySelector("td img").src;
				var urlTopic = checkBoxSelection.parentNode.parentNode.getElementsByTagName("td")[4].getElementsByTagName("a")[0].href;
				ouvrirTopic(urlTopic, 21);
			}
		}
	}
};

function boutonDdbAuteur()
{
	//Ajout de bouton de DDB Auteur
	var boutonDdbAuteur = document.createElement('li');
	boutonDdbAuteur.id = "boutonDDBAuteur";
	boutonDdbAuteur.href = "javascript:void(0);";
	boutonDdbAuteur.addEventListener("click", function() {eventBoutonDdbAuteur();}, false);
	boutonDdbAuteur.innerHTML = '<a href="javascript:void(0);">Mass DDB</a>';
	document.querySelector("#moderationUl").appendChild(boutonDdbAuteur);
};

function eventBoutonDdbAuteur()
{
	var ddbConfirmation = confirm('Êtes-vous sûr de vouloir faire une demande de bannissement de tout les pseudonymes sélectionnés ?\nNB: Les pseudonymes selectionés peuvent être exclus si l\'option dans la configuration de l\'arme est activée.'); 
	if (ddbConfirmation)
	{
		//Ce qui se passe quand on appuit sur le bouton.
		var nombresSujets = document.querySelector("#liste_topics tbody").childElementCount;
		for (var i = 1 ; i < nombresSujets ; i++)
		{
			var checkBoxSelection = document.querySelector("#selec" + i);
			if (checkBoxSelection.checked)
			{
				var imgTopic = document.querySelector("#liste_topics tbody").getElementsByTagName('tr')[i].querySelector("td img").src;
				var urlTopic = checkBoxSelection.parentNode.parentNode.getElementsByTagName("td")[4].getElementsByTagName("a")[0].href;
				ouvrirTopic(urlTopic, 22);
			}
		}
	}
};

function boutonMassEraze()
{
	//Ajout de bouton de Mass Lock
	var boutonMassEraze = document.createElement('li');
	boutonMassEraze.id = "boutonMassEraze";
	boutonMassEraze.href = "javascript:void(0);";
	boutonMassEraze.addEventListener("click", function() {eventBoutonMassEraze();}, false);
	boutonMassEraze.innerHTML = '<a href="javascript:void(0);">Mass Eraze</a>';
	document.querySelector("#moderationUl").appendChild(boutonMassEraze);
};

function eventBoutonMassEraze()
{
	var erazeConfirmation = confirm('Êtes-vous sûr de vouloir supprimer tout les topics sélectionnés ?'); 
	if (erazeConfirmation)
	{
		//Ce qui se passe quand on appuit sur le bouton.;
		var nombresSujets = document.querySelector("#liste_topics tbody").childElementCount;
		for (var i = 1 ; i < nombresSujets ; i++)
		{
			var checkBoxSelection = document.querySelector("#selec" + i);
			if (checkBoxSelection.checked)
			{
				var urlTopic = checkBoxSelection.parentNode.parentNode.getElementsByTagName("td")[2].getElementsByTagName("a")[0].href;
				ouvrirTopic(urlTopic, 4);
			}
		}
	}
};

function boutonMassActionLock()
{
	//Ajout de bouton de Mass Lock
	var boutonMassLock = document.createElement('li');
	boutonMassLock.id = "boutonMassLock";
	boutonMassLock.href = "javascript:void(0);";
	boutonMassLock.addEventListener("click", function() {eventBoutonMassActionLock();}, false);
	boutonMassLock.innerHTML = '<a href="javascript:void(0);">Mass Lock</a>';
	document.querySelector("#moderationUl").appendChild(boutonMassLock);
};

function eventBoutonMassActionLock()
{
	var lockConfirmation = confirm('Êtes-vous sûr de vouloir bloquer tout les topics sélectionnés ?\nNB: Aucun message ne sera posté avec la fonction Mass Lock.'); 
	if (lockConfirmation)
	{
		//Ce qui se passe quand on appuit sur le bouton.
		var nombresSujets = document.querySelector("#liste_topics tbody").childElementCount;
		for (var i = 1 ; i < nombresSujets ; i++)
		{
			var checkBoxSelection = document.querySelector("#selec" + i);
			if (checkBoxSelection.checked)
			{
				var imgTopic = document.querySelector("#liste_topics tbody").getElementsByTagName('tr')[i].querySelector("td img").src;
				var urlTopic = checkBoxSelection.parentNode.parentNode.getElementsByTagName("td")[4].getElementsByTagName("a")[0].href;
				if (imgTopic == "http://image.jeuxvideo.com/pics/forums/topic_marque_on.gif" || imgTopic == "http://image.jeuxvideo.com/pics/forums/topic_dossier2.gif" || imgTopic == "http://image.jeuxvideo.com/pics/forums/topic_dossier1.gif") 
				{
					ouvrirTopic(urlTopic, 19);
				}
			}
		}
	}
};

function boutonMassActionDelock()
{
	//Ajout de bouton de Mass Lock
	var boutonMassActionDelock = document.createElement('li');
	boutonMassActionDelock.id = "boutonMassActionDelock";
	boutonMassActionDelock.href = "javascript:void(0);";
	boutonMassActionDelock.addEventListener("click", function() {eventBoutonMassActionDelock();}, false);
	boutonMassActionDelock.innerHTML = '<a href="javascript:void(0);">Mass Délock</a>';
	document.querySelector("#moderationUl").appendChild(boutonMassActionDelock);
};

function eventBoutonMassActionDelock()
{
	var lockConfirmation = confirm('Êtes-vous sûr de vouloir débloquer tout les topics sélectionnés ?'); 
	if (lockConfirmation)
	{
		//Ce qui se passe quand on appuit sur le bouton.
		var nombresSujets = document.querySelector("#liste_topics tbody").childElementCount;
		for (var i = 1 ; i < nombresSujets ; i++)
		{
			var checkBoxSelection = document.querySelector("#selec" + i);
			if (checkBoxSelection.checked)
			{
				var imgTopic = document.querySelector("#liste_topics tbody").getElementsByTagName('tr')[i].querySelector("td img").src;
				var urlTopic = checkBoxSelection.parentNode.parentNode.getElementsByTagName("td")[4].getElementsByTagName("a")[0].href;
				if (imgTopic == "http://image.jeuxvideo.com/pics/forums/topic_cadenas.gif" || imgTopic == "http://image.jeuxvideo.com/pics/forums/topic_marque_off.gif") 
				{
					ouvrirTopic(urlTopic, 20);
				}
			}
		}
	}
};

function boutonTarget()
{
	//Ajout du bouton de Target
	var boutonTarget = document.createElement('li');
	boutonTarget.id = "boutonTarget";
	boutonTarget.innerHTML = '<a href="javascript:void(0);">Target</a>';
	boutonTarget.addEventListener("click", function(){/*eventBoutonTarget();*/}, false);
	document.querySelector("#moderationUl").appendChild(boutonTarget);
}

function boutonListeKick()
{
	//Ajout de bouton de Liste Kick
	var idForum = localStorage['idForum'];
	var boutonListeKick = document.createElement('li');
	boutonListeKick.id = "boutonListeKick";
	boutonListeKick.innerHTML = '<a href="javascript:void(0);">Liste des Kicks</a>';
	boutonListeKick.addEventListener("click", function() 
	{
		window.open("http://www.jeuxvideo.com/cgi-bin/jvforums/kick_user.cgi?forum="+idForum+"", '_blank');
	}, false);
	document.querySelector("#moderationUl").appendChild(boutonListeKick);
};

function boutonConfiguration()
{
	//Ajout du bouton de Configuration
	var boutonConfiguration = document.createElement('li');
	boutonConfiguration.id = "boutonConfiguration";
	boutonConfiguration.href = "javascript:void(0);";
	boutonConfiguration.addEventListener("click", function() {eventBoutonConfiguration();}, false);
	boutonConfiguration.innerHTML = '<a href="javascript:void(0);">Configuration</a>';
	document.querySelector("#moderationUl").appendChild(boutonConfiguration);
};

function eventBoutonConfiguration()
{
	//Ce qui se passe quand on appuit sur le bouton.
	configurationWindow = window.open("options.html", '_blank');
	configurationWindow.onload = function()
	{
		configurationWindow.document.querySelector(".titre_page").innerHTML = "<span>CONFIGURATION DE L'ARME DE MODERATION</span>";
		configurationWindow.document.querySelector(".bloc_inner").style.padding='10px 5px';
		configurationWindow.document.querySelector(".bloc_inner").style.textAlign='center';
		configurationWindow.document.querySelector(".alerte").style.color='#000000';
		configurationWindow.document.querySelector(".alerte").style.fontWeight='bold';
		if (localStorage['postAutomatique'] == 0)
		{
			var affichageActivation = '<select name="postAutomatique"><option value="0">Désactivé</option><option value="1">Activé</option></select>'
		}
		else
		{
			var affichageActivation = '<select name="postAutomatique"><option value="1">Activé</option><option value="0">Désactivé</option></select>'
		}
		if (localStorage['kickDDB'] == 0)
		{
			var affichageDDBActivation = '<select name="kickDDB"><option value="0">Désactivé</option><option value="1">Activé</option></select>'
		}
		else
		{
			var affichageDDBActivation = '<select name="kickDDB"><option value="1">Activé</option><option value="0">Désactivé</option></select>'
		}
		var targetList = localStorage['targetList'];
		configurationWindow.document.querySelector(".lien_base").innerHTML = '<a href="javascript:void(0)">Confirmer les changements</a>';
		configurationWindow.document.querySelector(".alerte").innerHTML = '<p>L\'ID du Forum : <input name="idForum" value='+localStorage["idForum"]+'></p><br><p>Exclure avec le Mass DDB : '+affichageDDBActivation+'</p><br><p>Message Automatique : '+affichageActivation+'</p><br><textarea cols="50" rows="10" name="messageLock">'+localStorage["messageLock"]+'</textarea><br><br><p>Séléction Automatique : </p><br><select multiple="multiple" id="autoselec">'+targetList+'</select><br><br><p>Pseudo : <input id="pseudoAutoSelec" name="pseudo"><p><br><input id="ajouterAutoSelec" name="ajouter"value="Ajouter" type="submit"><input id="supprimerAutoSelec" name="supprimer" value="Supprimer" type="submit">';
		var autoSelec = configurationWindow.document.querySelector("#autoselec");
		configurationWindow.document.querySelector(".lien_base a").addEventListener("click", function() 
		{
			var postAutomatique = configurationWindow.document.getElementsByName("postAutomatique")[0].value;
			var messageLock = configurationWindow.document.getElementsByName("messageLock")[0].value;
			var idForum = configurationWindow.document.getElementsByName("idForum")[0].value
			var kickDDB = configurationWindow.document.getElementsByName("kickDDB")[0].value;
			var targetList = configurationWindow.document.getElementById("autoselec").innerHTML;
			sauvegardeConfiguration(configurationWindow, postAutomatique, messageLock, idForum, kickDDB, targetList);
		}, false);
		configurationWindow.document.querySelector("#supprimerAutoSelec").addEventListener("click", function()
		{
			var pseudoAutoSelec = configurationWindow.document.querySelector("#pseudoAutoSelec").value;
			var pseudoInListe = configurationWindow.document.getElementById(pseudoAutoSelec);
			if (pseudoInListe != null)
			{
				autoSelec.removeChild(pseudoInListe);
			}
			else if (pseudoInListe == null)
			{
				configurationWindow.alert("Le pseudo ne peut pas être supprimé car il n'est pas présent dans la liste");
			}
		}, false);
		configurationWindow.document.querySelector("#ajouterAutoSelec").addEventListener("click", function()
		{
			var pseudoAutoSelec = configurationWindow.document.querySelector("#pseudoAutoSelec").value;
			var pseudoInListe = configurationWindow.document.getElementById(pseudoAutoSelec);
			var pseudoAddListe = configurationWindow.document.createElement("option");
			pseudoAddListe.id = pseudoAutoSelec;
			pseudoAddListe.name = pseudoAutoSelec;
			pseudoAddListe.innerHTML = pseudoAutoSelec;
			if (pseudoInListe != null)
			{
					configurationWindow.alert("Le pseudo ne peut pas être ajouté car il est présent dans la liste");
			}
			else if (pseudoInListe == null)
			{
				autoSelec.appendChild(pseudoAddListe);
			}
		}, false);
		configurationWindow.document.querySelector("#autoselec").addEventListener("click", function()
		{
			configurationWindow.document.querySelector("#pseudoAutoSelec").value = configurationWindow.document.querySelector("#autoselec").value;
		}, false);
	};
};

function sauvegardeConfiguration(window, postAutomatique, messageLock, idForum, kickDDB, targetList)
{
	localStorage['postAutomatique'] = postAutomatique;
	localStorage['messageLock'] = messageLock;
	localStorage['idForum'] = idForum;
	localStorage['kickDDB'] = kickDDB;
	localStorage['targetList'] = targetList;
	window.alert("Configuration sauvegardée.");
	window.close();
	document.querySelector("#rafraichir a").click();
}


function colonneSelectionTopic()
{
	//Creation du head pour la colonne.
	var nombresSujets = document.querySelector("#liste_topics tbody").childElementCount;
	var colonneHeadSujet = document.querySelector("#liste_topics tbody tr").getElementsByTagName('th')[0];
	var colonneHeadSelection = document.createElement('th');
	var allSelection = 0;
	colonneHeadSelection.id = "cselect";
	colonneHeadSelection.className = "col_moder";
	document.querySelector("#liste_topics tbody tr").insertBefore(colonneHeadSelection, colonneHeadSujet);
	//Creation du corps de la colonne.
	for (var i = 1 ; i < nombresSujets ; i++)
	{
		var colonneCorpsSujet = document.querySelector("#liste_topics tbody").getElementsByTagName("tr")[i].getElementsByTagName("td")[0];
		var colonneCorpsSelection = document.createElement('td');
		var checkBoxSelection = document.createElement('input');
		var targetList = localStorage['targetList'];
		var pseudoListe = document.createElement("option");
		pseudoListe.id = "autoSelec";
		pseudoListe.name = "autoSelec";
		pseudoListe.innerHTML = targetList;
		var targetNumber = pseudoListe.childElementCount;
		var pseudonyme = document.querySelector("#liste_topics tbody").getElementsByTagName("tr")[i].getElementsByClassName("pseudo")[0].innerHTML;
		checkBoxSelection.id = "selec" + [i];
		checkBoxSelection.name = "selec" + [i];
		checkBoxSelection.type = "checkbox";
		checkBoxSelection.align = "center";
		for (var j = 0 ; j < targetNumber ; j++)
		{
			if (pseudoListe.getElementsByTagName("option")[j].innerHTML == pseudonyme)
			{
				checkBoxSelection.checked = "checked";
			}
		}
		document.querySelector("#liste_topics tbody").getElementsByTagName("tr")[i].insertBefore(colonneCorpsSelection, colonneCorpsSujet).appendChild(checkBoxSelection);
	}
	var headCheckBoxSelection = document.createElement('input');
	headCheckBoxSelection.id = "selec0";
	headCheckBoxSelection.name = "selec0";
	headCheckBoxSelection.type = "checkbox";
	headCheckBoxSelection.align = "center";
	headCheckBoxSelection.addEventListener("click", function()
	{ 
		if (allSelection == 0)
		{
			for ( var i = 1 ; i < nombresSujets ; i++)
			{
				document.querySelector("#selec" + [i]).checked = "checked";
			}
			allSelection = 1;
		}
		else if (allSelection == 1)
		{
			for ( var i = 1 ; i < nombresSujets ; i++)
			{
				document.querySelector("#selec" + [i]).checked = "";
			}
			allSelection = 0;
		}
	}, false);
	document.querySelector("#cselect").appendChild(headCheckBoxSelection);
};

function colonneLockTopic()
{
	//Creation du head de la colonne.
	var colonneHeadSujet = document.querySelector("#liste_topics tbody tr").getElementsByTagName('th')[2];
	var colonneHeadLock = document.createElement('th');
	colonneHeadLock.id = "clock";
	colonneHeadLock.className = "col_moder";
	document.querySelector("#liste_topics tbody tr").insertBefore(colonneHeadLock, colonneHeadSujet);
	//Creation du corps de la colonne.
	var nombresSujets = document.querySelector("#liste_topics tbody").childElementCount;
	for (var i = 1 ; i < nombresSujets ; i++)
	{
		var colonneCorpsSujet = document.querySelector("#liste_topics tbody").getElementsByTagName("tr")[i].getElementsByTagName("td")[2];
		var colonneCorpsLock = document.createElement('td');
		colonneCorpsLock.id = "lock" + [i];
		var imgTopic = document.querySelector("#liste_topics tbody").getElementsByTagName('tr')[i].querySelector("td img").src;
		if (imgTopic == "http://image.jeuxvideo.com/pics/forums/topic_cadenas.gif" || imgTopic == "http://image.jeuxvideo.com/pics/forums/topic_marque_off.gif") 
		{
			colonneCorpsLock.addEventListener("click", function(){ ouvrirTopic(this, 18); }, false);
			colonneCorpsLock.innerHTML = '<a href="javascript:void(0);" title="Debloquer ce message"><img src="http://image.noelshack.com/fichiers/2012/26/1341119589-bt_forum_bann_48h.gif" alt="Bloquer ce message" height="12" width="11">'
			document.querySelector("#liste_topics tbody").getElementsByTagName("tr")[i].insertBefore(colonneCorpsLock, colonneCorpsSujet);
		}
		else
		{
			colonneCorpsLock.addEventListener("click", function(){ ouvrirTopic(this, 17); }, false);
			colonneCorpsLock.innerHTML = '<a href="javascript:void(0);" title="Bloquer ce message"><img src="http://image.noelshack.com/fichiers/2012/26/1341119589-bt_forum_bann_48h.gif" alt="Bloquer ce message" height="12" width="11">'
			document.querySelector("#liste_topics tbody").getElementsByTagName("tr")[i].insertBefore(colonneCorpsLock, colonneCorpsSujet);
		}
	}
};

function ouvrirTopic(idTopic, operation)
{
	//Fonction de Eraze du Topic
	if (operation == 4)
	{
		var urlErazeTopic = idTopic;
		var craftinorWindow = window.open(urlErazeTopic, '_blank', 'width=640,height=480,scrollbars=no,status=no'); 
	}
	//Fonction de Lock du topic
	if (operation == 17)
	{
		var urlTopic = document.querySelector("#" + idTopic.id).parentNode.getElementsByTagName("td")[4].getElementsByTagName("a")[0].href;
		var craftinorWindow = window.open(urlTopic, '_blank', 'width=640,height=480,scrollbars=no,status=no');
		craftinorWindow.onload = function(){ lockTopic(craftinorWindow, 0); };
	}
	//Fonction de Delock du topic
	if (operation == 18)
	{
		var urlTopic = document.querySelector("#" + idTopic.id).parentNode.getElementsByTagName("td")[4].getElementsByTagName("a")[0].href;
		var craftinorWindow = window.open(urlTopic, '_blank', 'width=640,height=480,scrollbars=no,status=no');
		craftinorWindow.onload = function(){ delockTopic(craftinorWindow); };
	}
	//Fonction de Mass Lock
	if (operation == 19)
	{
		var urlTopic = idTopic;
		var craftinorWindow = window.open(urlTopic, '_blank', 'width=640,height=480,scrollbars=no,status=no');
		craftinorWindow.onload = function(){ lockTopic(craftinorWindow, 1); };
	}
	//Fonction de Mass Delock
	if (operation == 20)
	{
		var urlTopic = idTopic;
		var craftinorWindow = window.open(urlTopic, '_blank', 'width=640,height=480,scrollbars=no,status=no');
		craftinorWindow.onload = function(){ delockTopic(craftinorWindow); };
	}
	//Fonction de Kick Auteur
	if (operation == 21)
	{
		var urlTopic = idTopic;
		var craftinorWindow = window.open(urlTopic, '_blank', 'width=640,height=480,scrollbars=no,status=no');
		craftinorWindow.onload = function(){ kickAuteur(craftinorWindow); };
	}
	//Fonction de DDB Auteur
	if (operation == 22)
	{
		var urlTopic = idTopic;
		var craftinorWindow = window.open(urlTopic, '_blank', 'width=640,height=480,scrollbars=no,status=no');
		craftinorWindow.onload = function(){ ddbAuteur(craftinorWindow); };
	}
};

function delockTopic(craftinorWindow)
{
	//Delock de Topic.
	var urlLock = craftinorWindow.document.querySelector(".debloquer").href;
	var craftinorLockWindow = window.open(urlLock, '_blank', 'width=640,height=480,scrollbars=no,status=no');
	craftinorWindow.close();
}

function lockTopic(craftinorWindow, massLock)
{
	//Lock de Topic.
	postAutomatique = localStorage['postAutomatique'];
	if (massLock == 1 || postAutomatique == 0)
	{
		var urlLock = craftinorWindow.document.querySelector(".bloquer").href;
		var craftinorLockWindow = window.open(urlLock, '_blank', 'width=640,height=480,scrollbars=no,status=no');
		craftinorWindow.close();
	}
	else
	{
		var urlLock = craftinorWindow.document.querySelector(".bloquer").href;
		var urlReponse = craftinorWindow.document.querySelector(".bt_repondre").href;
		var craftinorLockWindow = window.open(urlLock, '_blank', 'width=640,height=480,scrollbars=no,status=no');
		var craftinorReponseWindow = window.open(urlReponse, '_blank', 'width=640,height=480,scrollbars=no,status=no');
		craftinorReponseWindow.onload = function(){ lockReponse(craftinorReponseWindow); };
		craftinorWindow.close();
	}
};

function lockReponse(craftinorReponseWindow)
{
	//Envois d'une réponse en cas de lock.
	var textArea = craftinorReponseWindow.document.querySelector("textarea");
	textArea.innerHTML = localStorage['messageLock'];
	craftinorReponseWindow.document.querySelector("#bouton_post").click();
	setTimeout(function() {craftinorReponseWindow.close();},2000);
};

function kickAuteur(craftinorWindow)
{
	//Kick Auteur Topic
	urlKick = craftinorWindow.document.querySelector(".msg.msg2 ul").getElementsByTagName("li")[1].querySelector("a").href;
	var craftinorKickWindow = window.open(urlKick, '_blank', 'width=640,height=480,scrollbars=no,status=no');
	setTimeout(function() {craftinorKickWindow.document.querySelector("#motif").getElementsByTagName("option")[0].value = "Autre";},1000);
	setTimeout(function() {craftinorKickWindow.document.querySelector("form div input").click();},1100);
	setTimeout(function() {craftinorWindow.close();},1200);
	setTimeout(function() {
	if (craftinorKickWindow.document.querySelector("p").className == "erreur centrer")
	{
		craftinorKickWindow.close();
	}
	},3000);
};

function ddbAuteur(craftinorWindow)
{
	//Kick Auteur Topic
	urlDdb = craftinorWindow.document.querySelector(".msg.msg2 ul").getElementsByTagName("li")[1].getElementsByTagName("a")[1].href;
	var kickDDB = localStorage['kickDDB'];
	var craftinorDdbWindow = window.open(urlDdb, '_blank', 'width=640,height=480,scrollbars=no,status=no');
	if (kickDDB == 0)
	{
		setTimeout(function() {craftinorDdbWindow.document.querySelector("#motif").getElementsByTagName("option")[0].value = "Autre";},1000);
		setTimeout(function() {craftinorDdbWindow.document.querySelector("#kick").checked = "";},1050);
		setTimeout(function() {craftinorDdbWindow.document.getElementsByClassName("centrer")[2].getElementsByTagName("input")[0].click();},1100);
		setTimeout(function() {craftinorWindow.close();},1200);
		setTimeout(function() {craftinorDdbWindow.close();},2300);
	}
	else if (kickDDB == 1)
	{
		setTimeout(function() {craftinorDdbWindow.document.querySelector("#motif").getElementsByTagName("option")[0].value = "Autre";},1000);
		setTimeout(function() {craftinorDdbWindow.document.getElementsByClassName("centrer")[2].getElementsByTagName("input")[0].click();},1100);
		setTimeout(function() {craftinorWindow.close();},1200);
		setTimeout(function() {craftinorDdbWindow.close();},2300);
	}
};

init();