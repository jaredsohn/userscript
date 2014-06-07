// ==UserScript==
// @name www.seloger.com : evolution des prix
// @namespace jda
// @description Ajoute un lien vers le site petitscailloux.com permettant de voir les variations du prix d'un bien.
// @include        http://www.seloger.com/detail.htm*
// @include        http://www.seloger.com/*/detail.htm*
// ==/UserScript==


// la classe du permalien
const PERMALINK_ID="LienPermanent";
// l'url de base du lien vers la page de stat
const PETITSCAILLOUX_EVO_URL="http://www.petitscailloux.com/Histo.aspx?sUrl=";

// Dans la version actuelle du site, le lien permanent est dans un DIV avec un id particulier
var div = document.getElementById(PERMALINK_ID);

// recherche du  permalien dans tous ces liens
if (div != null )
{
	// le lien permanent
	permalink = div.firstChild
	// creation du nouveau lien
	var petitcaillouxLink = document.createElement("a");
	petitcaillouxLink.href = PETITSCAILLOUX_EVO_URL + permalink.href;
	petitcaillouxLink.target = "new";
	const linkText = document.createTextNode("Evolution du prix");
	petitcaillouxLink.appendChild(linkText);
	// on rajoute le lien apres le lien permanent
	div.appendChild(petitcaillouxLink);
	// on regle l'espacement
	permalink.style.margin="15px";
}
