// ==UserScript==
// @name         NucleaGame : easyLogin
// @namespace    NucleaGame : easyLogin
// @description	 Auto-remplissages des champs de connexions
// @author       Néo
// @version      0.2
// @date         2013-07-21 18h20
// @include      http://www.nucleagame.fr/uni1
// @include      http://www.nucleagame.fr/uni1/index.php
// @include      http://www.nucleagame.fr/uni1/index.php?code=*
// ==/UserScript==

var ansa = unsafeWindow.ansa;
eval(ansa.initScript(
{
	id: 'easyLogin', // Id UNIQUE du script
	name: 'Page de login', // Nom du script (Il apparait dans les options)
	version: '0.2', // Version du script
	url: 'http://userscripts.org/scripts/source/173842.user.js', // Lien pour le dl et verif des MAJs
	options: // Les options
	{
		// idOption: ['type', 'nom apparaissant dans les options', 'valeur par default', 'affichage dans les options']
		nameUser: ['input:text', 'Votre nom d\'utilisateur', 'Pseudo', '1'],
		passUser: ['input:password', 'Votre mot de passe', 'MDP', '1']
	}
}) );

getId('username').value = ansa.getOp('nameUser');
getId('password').value = ansa.getOp('passUser');
getTagName('input')[2].focus();

