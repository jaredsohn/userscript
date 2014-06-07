// ==UserScript==
// @name         NucleaGame : easyLogin
// @namespace    NucleaGame : easyLogin
// @description	 Auto-remplissages des champs de connexions [NucleaGame's scripts string]
// @author       Benoit485
// @version      0.2
// @date         2013-09-21 19H00
// @include      http://www.nucleagame.fr/uni*/index.php
// @include      http://www.nucleagame.fr/uni*/index.php?code=2
// @include      http://www.nucleagame.fr/uni*/index.php?code=3
// @include      http://www.nucleagame.fr/uni*/index.php?code=4
// ==/UserScript==

var ansa = unsafeWindow.ansa;
eval(ansa.initScript(
{
	id: 'easyLogin', // Id UNIQUE du script
	name: 'Page de login', // Nom du script (Il apparairait dans les options)
	version: '0.2', // Version du script
	url: 'http://userscripts.org/scripts/source/166901.user.js', // Lien pour le dl et verif des MAJs
	options: // Les options
	{
		// idOption: ['type', 'nom apparaissant dans les options', 'valeur par default', 'affichage dans les options']
		nameUser: ['input:text', 'Votre nom d\'utilisateur', 'Pseudo', '1'],
		passUser: ['input:password', 'Votre mot de passe', 'password', '1']
	}
}) );

getId('username').value = ansa.getOp('nameUser');
getId('password').value = ansa.getOp('passUser');
getTagName('input')[2].focus();
getId('login').submit();


