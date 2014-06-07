// ==UserScript==
// @name          Liens
// @description   affiche les liens contenus dans une page dans une boite a gauche, ainsi que les liens des liens
// @include       *
// ==/UserScript==


// fonction qui enleve les doublons dans une liste (ou un tableau) et la renvoie en tant que tableau
function noDoublon(tab) {
	var i;
	var j;
	var tmp = new Array();

	for (i = 0; i < tab.length; i++) {	// on cree un vrai tableau pour pouvoir
		tmp[i] = tab[i];			// utiliser la fonction splice
	}

	tab = tmp;	// la liste devient un tableau

	for (i = 0; i < tab.length; i++) {
		for (j = 0; j < tab.length; j++) {
			if ((i != j) && (String(tab[i]) == String(tab[j]))) {
				tab.splice(j, 1);	// on enleve l'element en double (j l'indice, 1 pour le nombre d'elements a enlever)
				j--;
			}
		}
	}

	return tab;
}

// fonction qui retourne la liste de tous les liens de la page
function linkui() {
	var items = document.getElementsByTagName('a');
	return items;
}

// fonction qui enleve d'un tableau les chaines qui ne contiennent pas site
function filtreDomaine(site, tab) {
	var i;
	for (i = 0; i < tab.length; i++) {
		if ((String(tab[i])).search(site) == -1) {
			tab.splice(i, 1);
			i--;
		}
	}
}

// fonction qui enleve d'un tableau les chaines qui contiennent une ancre (#)
function enleveAncre(tab) {
	var i;
	for (i = 0; i < tab.length; i++) {
		if ((String(tab[i])).search('#') != -1) {
			tab.splice(i, 1);
			i--;
		}
	}
}

// fonction qui utilise css sur la page
function creeCss(css) {
	head = document.getElementsByTagName("head")[0];
	style = document.createElement("style");
	style.setAttribute("type", 'text/css');
	style.innerHTML = css;
	head.appendChild(style);
}

// fonction qui renvoie le nombre de '/' dans une chaine
function nbSlash(chaine) {
	var tab = chaine.split('/');
	return tab.length - 1;
}

// fonction qui retourne une enumeration des sous-pages de url
function afficheParagraphe(url, tab) {

	var parContent = '<a href="' + url + '">' + url + '</a>' + '<br></br>';

	for (var i = 0; i < tab.length; i++) {
		parContent = parContent.concat('<ul>');

/* On n'enumere pas les sous-liens de url de la forme 'url/' (la seule difference est le slash a la fin) mais seulement ceux de la forme url/.../ avec un seul slash dans les '...'. */
		if ((String(tab[i]) != String(url + '/'))
				&& (((String(tab[i])).search(url + '/')) != -1)
				&& (nbSlash(String(url)) == (nbSlash(String(tab[i])) - 1))) {

			var temp = String(tab[i]).split('/');
			parContent = parContent.concat('<li>' + '<a href="' + tab[i] + '">' + temp[temp.length - 1] + '</a></li>');
		// on affiche juste le nom du fichier de la page
		}
		parContent = parContent.concat('</ul>');
	}

	return parContent;
}

// fonction qui fait la recursion pour les sous-liens
function sousliens(tab, site) {
	var xhr_object = null;
	var tab1 = new Array();
	var tab2 = new Array();
	var tabf = new Array();
	xhr_object = new XMLHttpRequest(); 					// objet de la requete
	for (i = 0 ; i < tab.length; i++){ 					// pour chaque lien, on regarde si c'est une page html, xhtml ou htm
		if (((String(tab[i])).search('.html') != -1)
		   || ((String(tab[i])).search('.xhtml') != -1)
               || ((String(tab[i])).search('.htm') != -1)) {
			xhr_object.open("GET", String(tab[i]), false);		// on lance une requete au serveur en mode synchrone
			xhr_object.send(null);
			if (xhr_object.readyState == 4) {					// si ca marche, cela retourne la page au format texte
				tab1 = xhr_object.responseText.split('<a href="'); 	// on split le texte a chaque <a href="
				tab1.splice(0,1);							// on enleve l'element 0, celui avant le premier <a href="
				for (j = 0; j < tab1.length; j++){				// on enleve ce qu'il y a apres la fin du lien
					tab2[j] = tab1[j].substring(0, tab1[j].indexOf('"'));
					if (tab2[j].search('tp://') == -1) {	// s'il s'agit d'un chemin relatif, on concatene avec le lien
						tab2[j] = (String(tab[i])).substring(0, (String(tab[i])).lastIndexOf('/')).concat('/').concat(tab2[j]);
					}
				}

				tabf = tabf.concat(tab2);	// on concatene les sous-liens de chaque lien
			}
		}
	}
	filtreDomaine(site, tabf);
	tabf = noDoublon(tabf);
	enleveAncre(tabf);

	tabf = tabf.concat(setTimeout("sousliens(tabf, site)", 500)); // la recherche recursive sous Mozilla demande un setTimeout

	return tabf;	
}

// MAIN

var site = window.location.host;	// le domaine de la page
site = site.concat(window.location.pathname); // le chemin relatif de l'url par rapport au domaine
site = site.substring(0, (String(site)).lastIndexOf('/'));

var tab = linkui();	// la liste des liens de la page

tab = noDoublon(tab);	// on enleve les doublons

filtreDomaine(site, tab);	// on garde les liens qui ont un
					// rapport avec la page

enleveAncre(tab);		// on enleve les liens qui renvoient a
				// l'interieur du document

tab = tab.concat(sousliens(tab, site));	// on ajoute les sous-liens au tableau de liens

tab = noDoublon(tab);	// on enleve les doublons

filtreDomaine(site, tab);	// on garde les liens qui ont un
					// rapport avec la page

enleveAncre(tab);		// on enleve les liens qui renvoient a
				// l'interieur du document

var tabLiens = new Array();	// ce tableau contiendra des liens parents aux sous-liens

for (var j = 0; j < tab.length; j++) {
	tabLiens.push((String(tab[j])).substring(0, (String(tab[j])).lastIndexOf('/')));
}

tabLiens = noDoublon(tabLiens);	// on enleve les doublons parmi les liens parents

var logo = document.createElement("div");	// on cree un element a mettre en debut de page
logo.setAttribute("id","links");		// d'identifiant links

var temp = '<div>';

for (i = 0; i < tabLiens.length; i++) {	// l'ensemble des liens separes par des retours a la ligne
	temp = temp.concat(afficheParagraphe(tabLiens[i], tab) + '<br></br>');
}

temp = temp.concat('</div>');				// on ferme le div

// css pour l'ensemble des elements de la page
creeCss('body { position: absolute; float:right; height: 700px; left: 450px; overflow: auto; }');


// css pour les liens filtres
with(logo){
	id = "links";
	innerHTML = temp;
	style.float ="top";
	style.position = "fixed";
	style.top = "36px";
	style.left = "15px";
	style.width = "400px";
	style.height = "500px";
	style.border = "5px solid darkgreen";
	style.visibility = "visible";
	style.overflow = "auto"; 
	style.background="lightgreen";
}

// on insere l'element en debut de page
document.body.insertBefore(logo, document.body.firstChild); 