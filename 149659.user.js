// ==UserScript==
// @name        IPB_LastUnread
// @namespace   IPB
// @include     http://*/index.php?app=core&module=search&do=viewNewContent&search_app=forums*
// @include     https://*/index.php?app=core&module=search&do=viewNewContent&search_app=forums*
// @version     1
// @grant       none
// ==/UserScript==

//Parcours du tableau de résultats
for (var i =0 ; i< document.getElementsByClassName("col_f_post").length ;i++)
{
	var lastpost = document.getElementsByClassName("col_f_post")[i].getElementsByTagName("li")[1].getElementsByTagName("a")[0]; // On récupère le lien vers le dernier post du sujet
	var lastposturl = lastpost.getAttribute("href").replace("page__view__getlastpost","page__view__getnewpost"); //On reconstruit un nouveau lien vers le dernier post non lu
	var newElement = document.createElement("a"); // On crée une nouvelle balise <a>
	newElement.setAttribute("href",lastposturl); // On insère le lien
	newElement.innerHTML = '<img src="http://openclipart.org/image/20px/svg_to_png/30787/go-last.png"/>&nbsp;'; // Ajout d'une image
	var parentDiv = lastpost.parentNode; 
	parentDiv.insertBefore(newElement, lastpost); // On l'affiche
}



