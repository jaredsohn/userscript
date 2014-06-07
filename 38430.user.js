// Hattrick Monkey
// Version 1.7
// Created : 2008-12-09
// Created By : Barsy

// ==UserScript==
// @name           HattrickMonkey
// @namespace      http://userscripts.org/
// @description    Tools for Hattrick
// @description    v0.1 Connexion automatique
// @description    v1.0 Gestion des niveaux de compétence de l'accadémie
// @description    v1.1 Gestion de l'arrêt de l'évolution des niveaux de l'académie
// @description    v1.2 Ajout du logo de Hattrick Monkey
// @description    v1.3 Ajout des étoiles par poste pour les jeunes joueurs
// @description    v1.3.1 Ajout des étoiles par poste pour les jeunes joueurs sur la page de chaque joueur
// @description    v1.4 Ajout de la caractéristique maximum pour les jeunes joueurs
// @description	   v1.5 Ajout de la mise à jour automatique des compétences des jeunes joueurs
// @description	   v1.5.1 Correctif bug
// @description	   v1.6 Suppression de la fonctionnalité des niveaux de jeune
// @description	   v1.7 Suppression de toutes les fonctionnalités, on ne conserve que la connexion automatique. Hattrick Monkey devient triXtool.
// @description    v1.7.1 modification de l'id des champs.
// @description    v1.7.2 Le script fonctionne désormais sur toutes les pages et pas uniquement sur la page d'accueil
// @include        http://www*.hattrick.org/*
// @exclude
// ==/UserScript==


//*******************************************************************************************************************************
//
// GESTION DE LA CONNEXION AUTOMATIQUE
//
//*******************************************************************************************************************************

// Ajouter un élément après un élément existant
function insererApres(currentElement, newElement) 
{
	currentElement.parentNode.insertBefore(newElement, currentElement.nextSibling);
}
// Ajouter un élément avant un élément existant
function insererAvant(currentElement, newElement) 
{
	currentElement.parentNode.insertBefore(newElement, currentElement);
}

// Page d'accueil

var txtPassword = document.getElementById('ctl00_ucSubMenu_ucLogin_txtPassword');

if (txtPassword != null && window.location.href.match(/hattrick.org/))
{
	// S'ils ont été enregistrés, on entre le login et le mot de passe automatiquement et on valide
	var login = GM_getValue("ME_LOGIN", "");
	var password = GM_getValue("ME_PASSWORD", "");
	
	document.getElementById('ctl00_ucSubMenu_ucLogin_txtUserName').value = login;
	document.getElementById('ctl00_ucSubMenu_ucLogin_txtPassword').value = password;
	
	if (login != "" && password != "")
	{
		// Si un login et un mot de passe ont déjà été enregistrés, on valide
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.getElementById("ctl00_ucSubMenu_ucLogin_butLogin").dispatchEvent(evt);
	}
	else
	{
		// Sinon on demande à l'utilisateur s'il souhaite l'enregistrer et on le fait.
		var divSauverPassword = document.createElement('span');
		var txtPassword = document.getElementById("ctl00_ucSubMenu_ucLogin_txtPassword");
		insererApres(txtPassword, divSauverPassword);
		divSauverPassword.innerHTML = "<input type='checkbox' id='cbSauverPassword'>" + "Retenir";
		
		document.getElementById("ctl00_ucSubMenu_ucLogin_butLogin").addEventListener(
			"click",
			function(event)
			{
				var cbSauverPassword = document.getElementById("cbSauverPassword");
				if (cbSauverPassword.checked)
				{
					GM_setValue("ME_LOGIN", document.getElementById('ctl00_ucSubMenu_ucLogin_txtUserName').value);
					GM_setValue("ME_PASSWORD", document.getElementById('ctl00_ucSubMenu_ucLogin_txtPassword').value);
				}
			},
			false);
	}
}

// En cas de mauvaise connexion on efface le mot de passe enregistré
if (window.location.href.match(/Default\.aspx\?authCode=/))
{
	GM_setValue("ME_PASSWORD", "");
	
	var login = GM_getValue("ME_LOGIN", "");
	document.getElementById('ctl00_ucSubMenu_ucLogin_txtUserName').value = login;
	
	var divSauverPassword = document.createElement('span');
	var txtPassword = document.getElementById("ctl00_ucSubMenu_ucLogin_txtPassword");
	insererApres(txtPassword, divSauverPassword);
	divSauverPassword.innerHTML = "<input type='checkbox' id='cbSauverPassword'>" + LANG_SAUVER_MOTDEPASSE;
	
	document.getElementById("ctl00_ucSubMenu_ucLogin_butLogin").addEventListener(
		"click",
		function(event)
		{
			var cbSauverPassword = document.getElementById("cbSauverPassword");
			if (cbSauverPassword.checked)
			{
				GM_setValue("ME_LOGIN", document.getElementById('ctl00_ucSubMenu_ucLogin_txtUserName').value);
				GM_setValue("ME_PASSWORD", document.getElementById('ctl00_ucSubMenu_ucLogin_txtPassword').value);
			}
		},
		false);
}

// En cas de deconnexion, on efface le mot de passe
if (document.getElementById("ctl00_ucMenu_hypLogout"))
{
	document.getElementById("ctl00_ucMenu_hypLogout").addEventListener(
		"click",
		function(event)
		{
			GM_setValue("ME_PASSWORD", "");
		},
		false);
}