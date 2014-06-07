// ==UserScript==
// @name           Origins Return - A4O - Cosinus
// @namespace      http://tools4origins.fr.nf/adds4origins/
// @description    Change le design du site.
// @include        http://uniida.origins-return.fr/index.php*
// @include        http://94.23.1.226/unialphaor/index.php*
// @include        http://unipegase.origins-return.fr/index.php*
// @include        http://uniorion.origins-return.fr/index.php*
// @include        http://uniida.origins-return.fr/index.php*
// @include        http://unieridan.origins-return.fr/index.php*
// @include        http://unicentaure.origins-return.fr/index.php*
// @include        http://unitaurus.origins-return.fr/*
// ==/UserScript==


/* A MODIFIER */

//Remplacez les fichiers officiels par l'url pointant vers les votres. Attention au guillemets.

var remplacement= new Array(

"http://tools4origins.fr.nf/adds4origins/design_perso/Cosinus_design.css", //Ce fichier remplacera le fichier design.css
"http://tools4origins.fr.nf/adds4origins/design_perso/Cosinus_style.css", //Ce fichier remplacera le fichier style.css
"http://tools4origins.fr.nf/adds4origins/design_perso/Cosinus_style2.css"); //Ce fichier remplacera le fichier style2.css


/* ---------------------- NE PAS MODIFIER LES LIGNES CI-DESSOUS ---------------------- */



function changeFeuilleDeStyle(ancienneFeuille, nouvelleFeuille)
{ 
	var allsuspects=document.getElementsByTagName("link") //Array de toutes les balises <link>
	for(var i=0; allsuspects[i]; i++) //Parcours tout ces link
		if (allsuspects[i].getAttribute("href")!=null && allsuspects[i].getAttribute("href").indexOf(ancienneFeuille)!=-1) //Si c'est celui qu'on cherche
			allsuspects[i].href=nouvelleFeuille; //On le remplace
}

changeFeuilleDeStyle("design/officiel v3.2/design.css", remplacement[0]); //Remplacement du fichier design.css
changeFeuilleDeStyle("design/officiel v3.2/style.css", remplacement[1]); //Remplace le fichier style.css
changeFeuilleDeStyle("design/officiel v3.2/main/style2.css", remplacement[2]); //Remplace le fichier style2.css
changeFeuilleDeStyle("design/officiel v3.2/main/style.css", remplacement[2]); //Remplace le fichier style2.css

/* ---------------------- NE PAS MODIFIER LES LIGNES CI-DESSUS ---------------------- */