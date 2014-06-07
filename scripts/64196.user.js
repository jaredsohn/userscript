// ==UserScript==
// @name           1j1p
// @namespace      shawn12
// @include        http://www.1jour1pari.com/*
// ==/UserScript==
function getElementsByClass(searchClass,node,tag) {
    var classElements = new Array();
    if (node == null)
        node = document;
    if (tag == null)
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
        if (pattern.test(els[i].className) ) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}

function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}


/**
 * Fonction qui démarre les paris automatiques
 */
function activer1J1P(){
	GM_deleteValue("modeAnnulation");
    var valeurSaisie = "";
    var valeurInt = 0;
    valeurSaisie = prompt("Nombre de paris à jouer ?");
    
    if (!isNaN(valeurInt = parseInt(valeurSaisie)) && valeurInt > 0){
        GM_setValue("nbParis", valeurInt);
		GM_log(""); // saut d'une ligne
		GM_log("C'est parti !");
        traiterPariSuivant();
    }else{
        alert("Erreur de saisie !");
    }
}

/**
 * Fonction qui désactive les paris automatiques
 */
function desactiver1J1P(){
    GM_deleteValue("nbParis");
    GM_deleteValue("page_liste_paris");
    GM_deleteValue("refresh");
	GM_deleteValue("modeAnnulation");
    alert("1J1P a été désactivé");
	GM_log("1J1P a été désactivé");
}

/**
  Fonction qui lance l'annulation des paris 
 */
function demarrerAnnulation(){
	GM_setValue("modeAnnulation", "oui");
	var valeurSaisie = "";
    var valeurInt = 0;
    valeurSaisie = prompt("Nombre de paris à jouer ?");
    
    if (!isNaN(valeurInt = parseInt(valeurSaisie)) && valeurInt > 0){
        GM_setValue("nbParis", valeurInt);
		GM_log(""); // saut d'une ligne
		GM_log("C'est parti !");
        traiterPariSuivant();
    }else{
        alert("Erreur de saisie !");
    }
}

/**
 * Fonction qui renvoie le nombre de paris à jouer
 */
function nbParis1J1P(){
    nbParis = GM_getValue("nbParis");
    if (nbParis == null){
        return 0;
    }else{
        document.title = "[1j1p] ("+nbParis+") "+document.title;
        return nbParis;
    }
}

/**
 * Décrémentation du nb de paris à jouer
 */
function decrementerNbParis1J1P(){
    nbParis = parseInt(GM_getValue("nbParis")) - 1;

    if (nbParis == 0){
        GM_deleteValue("nbParis");
//		GM_deleteValue("page_liste_paris");
        GM_deleteValue("refresh");
        GM_log("Fin du traitement.");
    }else{
        GM_setValue("nbParis", nbParis);
    }
}

/**
 *Sur la liste des paris, cette fonction recherche le prochain pari à jouer
*/
function traiterPariSuivant(){
	var nbParisRestants = nbParis1J1P();
	
    if (nbParisRestants > 0){
		GM_log("");
		GM_log("Il reste " + nbParisRestants + " pari(s) à traiter");
		GM_log("Recherche du pari suivant à traiter...");
	
/*        // Si on n'est pas sur la bonne page, on y revient
        page_liste_paris = GM_getValue("page_liste_paris");
        if (page_liste_paris != null && window.document.location.href != page_liste_paris){
                //GM_log ("Redirection : Page actuelle : " + window.document.location.href + " / Destination : " + page_liste_paris);
                //window.document.location.href = page_liste_paris;
                //return;
        }
*/
	
        var trouve = false;
        var le_lien = null;
        var nextLien = null;
		var search_array = getElementsByClass("ligne_4", document, "p");
		
		// Si on est en mode annulation, on recherche les paris déjà joués (liens bleus)
		if (GM_getValue("modeAnnulation") != null){
/*			nextLien = getElementsByClass("lien_bleu_ciel", document, "a")[0];
			if (nextLien != undefined){
				trouve = true;
			}
*/
			var search_array = getElementsByClass("det_foz", document, "p");
			for (var n=0; !trouve && n < search_array.length; ++n){
				le_paragraph = search_array[n];
				if (le_paragraph.style.display != "none" && le_paragraph.childNodes[0].className == "lien_bleu_ciel" && le_paragraph.parentNode.style.display != "none"){
					nextLien = le_paragraph.childNodes[0].href;
					trouve = true
				}
			}
		}else{
			var search_array = getElementsByClass("ligne_4", document, "p");
			for (var n=0; !trouve && n < search_array.length; ++n){
				le_lien = search_array[n];
					
				if (le_lien.style.display != "none" && le_lien.childNodes[0].className == "bt_parie" && le_lien.parentNode.style.display != "none"){
					nextLien = le_lien.childNodes[0].href;
					trouve = true
				}
			}
		}
		
        // Si on a trouvé un pari non traité sur la page, on va vers la page du pari sinon on s'arrete
        if (trouve){
			GM_log("Pari trouvé : " + nextLien);
			GM_log("Ouverture de la page...");
            GM_deleteValue("refresh");
            // On stocke l'adresse de la page des paris
            GM_setValue("page_liste_paris", window.document.location.href);
			
            window.document.location.href = nextLien;
        }else{
            recharge = GM_getValue("refresh");
            if (recharge == null){
				// On recharge la page pour tester
				GM_log("Impossible de trouver un pari, nouvelle tentative (rechargement complet de la page actuelle)...");
				GM_setValue("refresh", "o");
				// Rechargement de la page à partir du serveur
				window.document.location.reload(true);
				return;
            }else{
				// On a pas réussi à analyser la page même apres le reload alors on s'arrete
				GM_deleteValue("refresh");
				GM_deleteValue("page_liste_paris");
				alert("Plus de pari à traiter sur cette page !");
				GM_log("Plus de pari à traiter sur cette page !");
				desactiver1J1P();
            }
        }
    }
}

/**
 * Choisir la cote la plus faible et la jouer (sur une page de paris)
 */
function jouePari(){
	GM_log("On est sur une page de pari.");
	
	var search_array = document.getElementsByTagName("P");
	var min_cote = 0.0;
	
	for (var n=0; n < search_array.length; ++n){
		var paragraphe = search_array[n];

		if (paragraphe.className == "mise"){
			paragraphe_prec = search_array[n-1];
			
			// On récupère le texte de la cote
			texte_cote = paragraphe_prec.textContent;

			var reg = new RegExp(/\((\d*,\d*|-)\)$/);
			
			// On récupère la valeur de la cote
			reg_cote = reg.exec(texte_cote);
/*             
			if (reg_cote == null) {
				GM_log("No match");
			} else {
			  var s = "Match at position " + reg_cote.index + ":\n";
			  for (i = 0; i < reg_cote.length; i++) {
				s = s + reg_cote[i] + "["+i+"]\n";
			  }
			 GM_log(s);
			}
*/             
			GM_log("Choix trouvé : [" + texte_cote + "]");
			if (reg_cote != null){
				cote = reg_cote[1];
				
				// Remplace virgule par point
				var aRemplacer = /\,/g;
				cote = cote.replace(aRemplacer, ".");
				cote = parseFloat(cote);
				if (isNaN(cote)){
					GM_log("Cette cote n'est pas un nombre, on passe...      [" + texte_cote + "]");
					cote = min_cote;
				}else{
					GM_log("Valeur de la cote trouvée : " + cote + "         [" + texte_cote + "]");
				}
			}else{
				// Pattern de l'expression régulière ne correspond pas
				cote = min_cote;
				GM_log("Impossible de comprendre la cote :               [" + texte_cote + "]");
			}
			
			if (cote < min_cote || min_cote == 0){
				GM_log("Cette cote est plus faible que la cote sélectionnée précédemment.");
				min_cote = cote;
				
				// Recherche de la zone de saisie de la mise et sélection de la zone
				enfants = paragraphe.childNodes;
				for (var i=0; i < enfants.length; ++i){
					enf = enfants[i];

					if (enf.className == "input_mise"){
						// On recherche l'action à exécuter sur le focus pour l'exécuter directement
						var attributs = enf.attributes;
						for (var j=0; j<attributs.length ; j++){
							attrib = attributs[j];
							if (attrib.name == "onfocus"){
								// On exécute l'action sur le focus (cocher le bouton radio et mettre le montant à 0)
								contentEval(attrib.value);
								GM_log("Sélection de la cote (focus sur la zone de mise).");
							}
						}
						//var evt = document.createEvent("MouseEvents"); // créer un évènement souris
						//evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); // initialisation de l'évennement déja crée par un click
						//enf.dispatchEvent(evt); // envoyer l'évennement vers l'élement 
					}
				}
			}
		}
	}
	
	// On diminue le compteur de paris
	decrementerNbParis1J1P();
	
	GM_log("On clique sur le bouton 'Je valide'");
	
	// On recherche le bouton de validation sur la page
	bouton_valider = getElementsByClass("bt_valide", document, "a")[0];

	var evt = document.createEvent("MouseEvents"); // créer un évènement souris
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); // initialisation de l'évennement déja crée par un click
	bouton_valider.dispatchEvent(evt); // envoyer l'évennement vers l'élement 
}

function annulePari(){
	// Si on vient d'annuler on repart sur la liste des paris
	if (GM_getValue("annulationEffectuee") != null){
		// On diminue le compteur de paris
		decrementerNbParis1J1P();
			
		GM_deleteValue("annulationEffectuee");
		GM_log("On repart sur la liste des paris");
		document.location.href = GM_getValue("page_liste_paris");
	}else{
		// On recherche le bouton de validation sur la page
		bouton_annuler = getElementsByClass("bt_annuler", document, "a")[0];
		if (bouton_annuler == undefined){
			GM_log("Impossible d'annuler, bouton 'Annuler' non trouvé sur la page");
		}else{
			GM_setValue("annulationEffectuee", "oui");
			GM_log("Annulation effectuée.");
			
			var evt = document.createEvent("MouseEvents"); // créer un évènement souris
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); // initialisation de l'évennement déja crée par un click
			bouton_annuler.dispatchEvent(evt); // envoyer l'évennement vers l'élement 
		}
	}
}

// Si on est sur la page d'un pari
if (window.document.location.href.indexOf("/pari/") != -1){
    GM_registerMenuCommand("Jouer automatiquement le pari", jouePari);
	GM_registerMenuCommand("Annuler ce pari", annulePari);
    
    if (nbParis1J1P() > 0){
		if (GM_getValue("modeAnnulation") != null){
			annulePari();
		}else{
			jouePari();
		}
    }
}

// Si on est sur la liste des paris
if (window.document.location.href.indexOf("/pari/") == -1){

    // Ajout du menu pour activer
    GM_registerMenuCommand("Activer 1J1P", activer1J1P);
	
	// Ajout du menu pour lancer l'annulation des paris
	GM_registerMenuCommand("Annuler des paris en masse", demarrerAnnulation);
    
    traiterPariSuivant();
}

GM_registerMenuCommand("Desactiver 1J1P", desactiver1J1P);