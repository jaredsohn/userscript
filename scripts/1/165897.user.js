// ==UserScript==
// @name         StarsQuest : easyLogin
// @namespace    StarsQuest : easyLogin
// @description	 Auto-remplissages des champs de connexions [StarsQuest's scripts string]
// @author       Benoit485
// @version      0.3
// @date         2013-10-20 19H20
// @include      http://starsquest.co.uk/*
// @include      http://www.starsquest.co.uk/*
// @include      http://s*.starsquest.co.uk/
// @include      http://s*.starsquest.co.uk/index.php
// ==/UserScript==

/*
	V_0.3 => 2013-10-20 19H20 (Ansaerys devient StarsQuest)
	V_0.2 => 2013-09-26 20H45
	V_0.1 => 2013-04-26 18H15
*/

var ansa = unsafeWindow.ansa;
eval(ansa.initScript(
{
	id: 'easyLogin', // Id UNIQUE du script
	name: 'Page de login', // Nom du script (Il apparairait dans les options)
	version: '0.3', // Version du script
	url: 'http://userscripts.org/scripts/source/165897.user.js', // Lien pour le dl et verif des MAJs
	options: // Les options
	{
		// idOption: ['type', 'nom apparaissant dans les options', 'valeur par default', 'affichage dans les options']
		nameUser: ['input:text', 'Votre nom d\'utilisateur', 'Pseudo', '1'],
		passUser: ['input:password', 'Votre mot de passe', 'password', '1']
	}
}) );

if(ansa.getOp('nameUser') != 'Pseudo')
{
	getId('username').value = ansa.getOp('nameUser');
	getId('password').value = ansa.getOp('passUser');
	getTagName('input')[3].focus();
	if(!document.location.href.match(/\?code=1/) )
		getTagName('form')[0].submit();
}
