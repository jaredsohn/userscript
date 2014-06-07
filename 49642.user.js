// ==UserScript==
// @name           Event
// @namespace      http://fr.beterz.com
// @include        http://fr.beterz.com/Y/Bet/
// ==/UserScript==
	
	function getDId(chaine)
	{
		var reg=new RegExp("[0-9]+","g"); //le "g" signifie que l'expression sera analysée globalement sur l'ensemble de la chaîne.
		dId=reg.exec(chaine);
		return dId;
	}