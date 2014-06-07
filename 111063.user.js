// ==UserScript==
// @name	AnoChat-SmileyPlus
// @namespace	http://chat.developpez.com/
// @description	Ajoute vos smiley dans la popup des smileys de l'Anochat
// @include        http://chat.developpez.com/*
// @version        1.0
// @author 			Golgotha
// ==/UserScript==
var tabSmiley = new Array();
var i;

//ajouter ici vos smiley si vous en avez d'autre.
tabSmiley.push("http://smileys.sur-la-toile.com/repository/Content/youpi-12.gif");
tabSmiley.push("http://smileys.sur-la-toile.com/repository/Amour/0008.gif");
tabSmiley.push("http://smileys.sur-la-toile.com/repository/Amour/0064.gif");
tabSmiley.push("http://smileys.sur-la-toile.com/repository/Amour/bouquet-de-fleurs-32342.gif");
tabSmiley.push("http://smileys.sur-la-toile.com/repository/Amour/gay-bisou.gif");
tabSmiley.push("http://smileys.sur-la-toile.com/repository/Amour/sadomaso-20060614.gif");
tabSmiley.push("http://smileys.sur-la-toile.com/repository/Combat/0025a.gif");
tabSmiley.push("http://smileys.sur-la-toile.com/repository/Combat/0093.gif");

popup = document.getElementById("listeSmileys").firstChild.nextSibling;

for (var i = 0; i < tabSmiley.length; i++) {
	//creation du lien html
    a = document.createElement("a");
    a.href = "#";
    a.setAttribute("onClick", "ajouterSmiley('[IMG]" + tabSmiley[i] + "[/IMG]'); return false;");
	//creation de l'image
    img = document.createElement("img");
    img.src = tabSmiley[i];
	// ajout de l'image au lien html
    a.appendChild(img);
	// ajout du lien html dans la div de la popup
    popup.appendChild(a);

}
