// ==UserScript==
// @name        Pictus Genius par Chauvenne Rémi
// @namespace   genius
// @description Take the Stikers every hour
// @include     http://www.mypictus.com/pictus-enghiennoise-2013-2014-1568/shops
// @version     22/12/2013 22:14
// ==/UserScript==

/**
*
*	Ce script a été écrit pour le pictus du blocus de fin 2012.
*	Version finale : 21/12/2012
*	autheur : Rémi Chauvenne, Binchoise :-)
*
*       Code vérifié pour 2013, fonctionne toujours de la même manière.
*
*       Pour le faire fonctionner, il faut installer un add-on sur votre navigateur
*       par exemple GreaseMonkey, pour pouvoir executer des scripts.
*       Ensuite, il suffit de rester sur la page Shop du Pictus et le script fait le reste
*/


/**
*
*   	Fonction pour trouver le parent du lien
*
*/


function getElementsByClass( searchClass, domNode, tagName) { 
        //assert
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';

	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName); //on capture tous les tagName
	var classe = " "+searchClass+" ";

        // on cherche les classes de nom searchClass
	for(i=0,j=0; i<tags.length; i++) { 
		var check = " " + tags[i].className + " ";
		if (check.indexOf(classe) != -1) 
			el[j++] = tags[i];
	} 
return el;
}
 
/**
*
* 	Retourne un nombre random pour choisir un shop
*
*/

function getRandomInt (min, max) 
{
    		
	return Math.floor(Math.random() * (max - min + 1)) + min;
}



var tab = getElementsByClass("buying", null, "p"); //On recupere tous les blocks "p" dans un tableau

if(tab.length>1)
{
	var link = tab[getRandomInt (2, 5)].firstElementChild.href; // on a recupere le lien dans un des shops :D

        window.location.replace(link); //on se redirige vers la fenetre pour recup les stickers
}
else 
{
	var ouin = document.createElement("div"); // On crée un nouvelle élément div
	ouin.innerHTML = 'Ouinouin le compte à rebours nest pas pret';
	document.body.appendChild(ouin); // On l'affiche
}