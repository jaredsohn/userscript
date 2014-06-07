// ==UserScript==
// @name		Symbaloo - Recherche Google
// @namespace		Symbaloo - Recherche Google
// @author		35niavlys
// @description		Remplace le champ de recherche personnalisé par un champ de recherche normal de google.
// @include		http://www.symbaloo.com*
// ==/UserScript==
document.addEventListener('load', function()
{
var gsearchform = document.getElementsByClassName('gsearchform');

gsearchform[0].setAttribute('action', "http://www.google.fr/search");
var input = gsearchform[0].getElementsByTagName('input');
input[3].parentNode.removeChild(input[3]);
input[2].parentNode.removeChild(input[2]);
input[1].parentNode.removeChild(input[1]);

},true);