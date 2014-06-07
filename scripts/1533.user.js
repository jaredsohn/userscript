// ==UserScript==
// @name          LinuxFR papa
// @namespace     http://arliguy.net/papa
// @description	  [en] : This user script adds action links to each comment in comments tree 
//                of Linuxfr.org website in order to improve navigability. With this
//                script you are able to find easily the parent of a comment and 
//                hide (or display) a part of this tree.
//
//                [fr] : Ce "user script" ajoute des liens actifs ÃÂ  chaque commentaire dans
//                l'arbre des commentaires du site Linuxfr.org dans le but d'amÃÂ©liorer l'expÃÂ©rience
//                de navigation. Avec ce script vous ÃÂªtes capable de trouver facilement le pÃÂ¨re d'un
//                commentaire et de cacher (ou d'afficher) une partie de cet arbre. 
// @include       http://linuxfr.org/*
// @exclude       http://linuxfr.org/my/
// ==/UserScript==
// Notes:
//   version 0.5 - 23/10/2005 - ajout du lien "Troll" sur tous les titres de commentaires, ce qui permet de cacher
//                              le commentaire courant et ses enfants.
//   version 0.4 - 02/12/2005 - correction suite a modification dans le code html de LinuxFR : Le script ne 
//                              s'exÃÂ©cutait plus. Apparement il y a eu des changements dans les pages, et le
//                              onload ne s'exÃÂ©cutait pas, donc le script ne pouvait pas se dÃÂ©rouler. J'ai donc
//                              supprimer l'attachement du script ÃÂ  onload.
//   version 0.3 - 17/08/2005 - ajout licence GPL
//                            - modification de la description
//                            - ajout d'une traduction en anglais
//
//   version 0.2 - 05/06/2005 - quand on clique sur "Masquer" on est positionnÃÂ© sur le commentaire parent
//                            - un seul lien "Masquer" ou "Afficher" est visible. En fonction de ce qui est
//                              possible pour un commentaire, soit l'un soit l'autre est visible.
//
//   version 0.1 - 04/06/2005 - premiere version.
//
//   auteur  : Bruno ARLIGUY
//
//   licence : GPL license - http://www.gnu.org/copyleft/gpl.html


(function()
{
	//Listener positionnÃÂ© sur chaque lien "Masquer" quand on le "clique".
	// On va masquer le lien "Masquer", afficher le lien "Afficher" et ensuite
	// parcourir tous les commentaires prÃÂ©cÃÂ©dents (ie previousSibling) et les masquer
	//
	// param e : l'ÃÂ©vÃÂ¨nement reÃÂ§u par l'objet auquel est associÃÂ© ce listener
	function hideSibling(e)
	{
		//masquer le lien "masquer"
		e.target.style.display = 'none';
		//afficher le lien "afficher"
		e.target.nextSibling.style.display = 'inline';
		//masquer les commentaires prÃÂ©cÃÂ©dents
		var currentComment = e.target.parentNode.parentNode.parentNode.parentNode;
		if (currentComment)
		{
			for (var sibling = currentComment.previousSibling; sibling.nodeName == 'UL'; sibling = sibling.previousSibling)
			{
				sibling.style.display = 'none';
			}
		}
	}

	//Listener positionnÃÂ© sur chaque lien "Afficher" quand on le "clique".
	// On va masquer le lien "Afficher", afficher le lien "Masquer" et ensuite
	// parcourir tous les commentaires prÃÂ©cÃÂ©dents (ie previousSibling) et les afficher
	//
	// Attention : ceci va re-afficher tous les commentaires prÃÂ©cÃÂ©dents de mÃÂªme niveau,
	// mÃÂªme si ils n'ont pas ÃÂ©tÃÂ© cachÃÂ©s en activant le lien "cacher" correspondant au lien
	// "afficher" actuellement actif. Il faut donc repositionner les liens "Afficher" et "Masquer"
	// de ces commentaires, car certains pourraient ÃÂªtre innapropriÃÂ©s.
	//
	// param e : l'ÃÂ©vÃÂ¨nement reÃÂ§u par l'objet auquel est associÃÂ© ce listener
	function showSibling(e)
	{
		//masquer le lien "afficher"
		e.target.style.display = 'none';
		//afficher le lien "masquer"
		e.target.previousSibling.style.display = 'inline';
		//afficher les commentaires prÃÂ©cÃÂ©dents
		var currentComment = e.target.parentNode.parentNode.parentNode.parentNode;
		var papaBlock      = null;
		if (currentComment)
		{
			for (var sibling = currentComment.previousSibling; sibling.nodeName == 'UL'; sibling = sibling.previousSibling)
			{
				sibling.style.display = 'inline';
				papaBlock = document.evaluate("./li/h1/div", sibling, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
				if (papaBlock != null)
				{
					papaBlock.childNodes[0].style.display = 'inline';
					papaBlock.childNodes[1].style.display = 'none';
				}
			}
		}
	}

	//Listener positionnÃÂ© sur chaque lien "Troll" quand on le "clique".
	// On va masquer le contenu directe du commentaire actuel (ie, le bloc contenant le titre 
	// restera affichÃÂ©) et tous les sous commentaires. 
	//
	// Attention : ceci va re-afficher tous les commentaires prÃÂ©cÃÂ©dents de mÃÂªme niveau,
	// mÃÂªme si ils n'ont pas ÃÂ©tÃÂ© cachÃÂ©s en activant le lien "cacher" correspondant au lien
	// "afficher" actuellement actif. Il faut donc repositionner les liens "Afficher" et "Masquer"
	// de ces commentaires, car certains pourraient ÃÂªtre innapropriÃÂ©s.
	//
	// param e : l'ÃÂ©vÃÂ¨nement reÃÂ§u par l'objet auquel est associÃÂ© ce listener
	function hideTroll(e)
	{
		//masquer le lien "troll", on n'en aura plus besoin
		e.target.style.display = 'none';

		var toggle_pliage_link = e.target.parentNode.parentNode.childNodes[1].childNodes[0];
		var comment_top        = e.target.parentNode.parentNode.parentNode;

		toggle_pliage(toggle_pliage_link);

		//Rechercher parmis les enfants tous les elements UL et les masquer
		for (var child = comment_top.firstChild;  child != undefined; child = child.nextSibling)
		{
			if (child.nodeName == 'UL')
			{
				child.style.display = 'none';
			}
		}
	}

	//Construit un block (div) qui contient les liens "Masquer", "Afficher", "Troll" pour l'UL passÃÂ© en paramÃÂ¨tre.
	//
	// param ul : un objet qui doit reprÃÂ©senter un UL correspondant ÃÂ  
	//            un commentaire (ie rÃÂ©pond au xpath //ul[@class='commentsul'])
	//param needMaskLink : true si le block doit contenir les liens "Masquer" et "Afficher"
	//                     sinon seul le lien "Troll" sera ajoutÃÂ©
	function getPapaBlock(ul, needMaskLink)
	{
		var namedLink  = ul.firstChild.childNodes[1];
		var parentLink = ul.parentNode.childNodes[1];
		var id         = namedLink.name;
		var div        = document.createElement("div");
		var aTroll     = document.createElement("a");

		div.setAttribute("id", "pn" + namedLink.name);
		div.setAttribute("class", "pn");
		div.setAttribute("style", "float: right;");

		aTroll.setAttribute("href", "#" + namedLink.name);
		aTroll.setAttribute("id", "troll" + namedLink.name);
		aTroll.setAttribute("class", "pn");
		aTroll.setAttribute("style", "display: inline");
		aTroll.addEventListener("click", hideTroll, false);
		aTroll.appendChild(document.createTextNode("x Troll"));

		if (needMaskLink)
		{
			var aHide = document.createElement("a");
			var aShow = document.createElement("a");

			//Faire pointer le lien masquant sur le commentaire parent.
			aHide.setAttribute("href", "#" + parentLink.name);
			aHide.setAttribute("id", "hide" + namedLink.name);
			aHide.setAttribute("class", "pn");
			aHide.setAttribute("style", "display: inline");
			aHide.addEventListener("click", hideSibling, false);
			aHide.appendChild(document.createTextNode("- Masquer"));

			aShow.setAttribute("href", "#" + namedLink.name);
			aShow.setAttribute("id", "show" + namedLink.name);
			aShow.setAttribute("class", "pn");
			aShow.setAttribute("style", "display: none");
			aShow.addEventListener("click", showSibling, false);
			aShow.appendChild(document.createTextNode("+ Afficher"));

			div.appendChild(aHide);
			div.appendChild(aShow);
		}

		div.appendChild(aTroll);

		return div;
	}

	try
	{
		//Ajouter la feuille de style : il n'y a pas grand chose.
		var head  = document.getElementsByTagName('head')[0];
		var style = document.createElement("style");

		style.setAttribute('type', 'text/css');
		style.innerHTML = 'a.pn { margin-left: 1em;}';
		head.appendChild(style);

		// RecupÃÂ©rer tous les UL de classe "commentsul". Pour chacun, ajouter un bloc dans sa barre de titre.
		// Ce bloc contiendra deux liens : "Masquer" et "Afficher". Chaque lien appellera un script
		// qui appliquera l'action correspondante (masquer ou afficher) sur tous les "previousSibling" du
		// commentaire associÃÂ©. Le lien en lui mÃÂªme consistera ÃÂ  appeler la mÃÂªme page en la positionnant sur :
		//    - le lien nommÃÂ© correspondant au commentaire parent si l'utilisateur a cliquÃÂ© sur "Masquer"
		//    - le lien nommÃÂ© correspondant au commentaire si l'utilisateur a cliquÃÂ© sur "Afficher".
		// les liens nommÃÂ©s sont ceux de la forme <a name="580185"></a> et qui sont les "childNodes[1]" de chaque //ul[@class='commentsul'].
		var elements = document.evaluate("//ul[@class='commentsul']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null); 
		var uls = new Array();
		var ul  = null;
		//tranferer les ÃÂ©lÃÂ©ments trouvÃÂ©s dans un tableau.
		for (var i = 0; ul = elements.iterateNext(); i++)
		{
			uls[i] = ul;
		}

		var before = null;
		var previous = null;
		var needMaskLink = false;
		for (var i = 0; i < uls.length; i++)
		{
			previous = uls[i].previousSibling;
			while (previous.nodeName == "#text")
			{
				previous = previous.previousSibling;
			}

			needMaskLink = (previous.nodeName == "UL");

			//Selectionner le premier H1 ÃÂ  partir du premier enfant de cet UL. J'utilise une expression xPath car
			// apparement le Html de LinuxFR a tendance ÃÂ  ÃÂ©voluer. Donc un accÃÂ©s relatif comme avant (avec des numÃÂ©ros
			// d'index dans les enfants, par exemple uls[i].firstChild.childNodes[5]) rendait le code trop dÃÂ©pendant des
			// modifications du code.
			before = document.evaluate("./h1", uls[i].firstChild, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.firstChild; 
			before.parentNode.insertBefore(getPapaBlock(uls[i], needMaskLink), before);
		}
	}
	catch (ex)
	{
		GM_log(ex);
	}
})();