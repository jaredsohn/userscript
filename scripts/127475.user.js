// ==UserScript==
// @name           Notes_displayer
// @namespace      https://intranet.ensimag.fr/consultNotes/notes.html
// @description    Améliore l'affichage des notes de l'ensimag
// @include        https://intranet.ensimag.fr/consultNotes/notes.html
// ==/UserScript==


/*
  Notes_displayer v1.4 by Célestin Matte (03/2012, dernière version : 06/2012)
  
  Nouveautés v1.4 :
  - Gestion des nombres à virgule avec virgule (seuls les points étaient gérés)
  - gestion (complète) des sessions
  - bug de l'affichage du "nouveau !" sur toutes les notes réglé.
  - bouton d'enregistrement et de restauration de l'état du tableau, pour pouvoir sauvegarder vos modifications de façon permanente
  - ajout d'un bouton pour ajouter directement la note au rattrapage (ajoute au tableau la ligne pour la session 2), affiché uniquement si la note peut être rattrapée
  - réglage de bugs divers

  Nouveautés v1.3 :
  - bouton pour modifier uniquement la note.
  - bug de l'affichage du "nouveau !" sur toutes les notes potentiellement réglé.


  Ce script améliore l'affichage de la page des notes en lignes https://intranet.ensimag.fr/consultNotes/login.html avec :
  - ajout d'une ligne total affichant la moyenne
  - affiche les nouvelles matières apparues depuis la dernière visite
  - ajout de couleurs au tableau en fonction des notes de chaque lignes (désactivables)
  - permet de désactiver des matières
  - permet d'ajouter des matières
  - permet de modifier des matières
  - permet de supprimer des matières
  - interprète les coeffs null selon la valeur désirée (1 par défaut)
  
  Les couleurs correspondent à :
  - rouge : < 8 (attention : il faut 8 minimum par UE !)
  - orange : 8 ≤ note < 10
  - jaune : 10 ≤ note < 12 (attention : il faut minimum 10 pour redoubler !)
  - vert sapin : 12 ≤ note < 14 (ça passe !)
  - vert citron : 14 (pas à rattraper si redoublement !)
  
  Prochainement :

  To do (éventuellement)
  - modification des valeurs des cellules directement dans le tableau
  - faire des boutons moins moches §§

*/

function ajoutclasse(ligne, note, rattrapee)
{
    /* gestion de la couleur */
    if (rattrapee == false)
    {
	var classe;
	if (note < 8) classe = "inf8";
	else if (note >= 8 && note < 10) classe = "inf10";
	else if (note >= 10 && note < 12) classe = "inf12";
	else if (note >= 12 && note < 14) classe = "inf14";
	else classe = "sup14";
    }
    else
	classe = "rattrapee"
    ligne.setAttribute("class", classe);
}

function ajoutstyle()
{
    /* Ajoute un style css en en-tête (pour les couleurs et les matières désactivées */
    if (document.getElementById("boutoncouleur").value=="Mettre couleur") {
	var style = document.createElement("style");
	style.innerHTML = ".inf8{background-color:red;} \
.inf10{background-color:orange;}\
.inf12{background-color:yellow;}\
.inf14{background-color:#00CD66;}\
.sup14{background-color:lime;}\
.rattrapee{background-color:lightgray;}\
.desact{opacity:0.5;}\
";
	document.getElementsByTagName("Head")[0].appendChild(style);
	document.getElementById("boutoncouleur").value="Enlever la couleur";
    } else {
	var style = document.getElementsByTagName("style")[0];
	style.parentNode.removeChild(style);
	document.getElementById("boutoncouleur").value="Mettre couleur";
    }
}

/*
function parsage_nombre(nombre)
{
    var res = parseFloat(nombre.replace(",","."));
    return res;
}*/

function matiere_rattrapee(p)
{
    // p pointe vers la cellule contenant les boutons de la ligne concernée
    var lignes = document.getElementsByTagName("tr");
    var nom = p.parentNode.childNodes[0].innerHTML;
    if (p.parentNode.childNodes[2].innerHTML == '2')
	return true;
    for (var j = 1 ; j < lignes.length ; j++)
    {
	if (lignes[j].childNodes[2].innerHTML == '2' 
	    && lignes[j].childNodes[0].innerHTML == nom
	    && lignes[j].getAttribute("class") != "desact")
	{
	    return true;
	}
    }
    return false;
}

function ajout_moyenne()
{
    var coeffs = 0.0 ;
    var total = 0.0 ;
    var lignes = document.getElementsByTagName("tr");
    var matiere_rattrapee;
    for (var i = 1 ; i < lignes.length ; i++)
    {
	matiere_rattrapee = false;
	var session = lignes[i].childNodes[2].innerHTML;
	var nom = lignes[i].childNodes[0].innerHTML;
	if (session == '1')
	{
	    for (var j = 1 ; j < lignes.length ; j++)
	    {
		if (lignes[j].childNodes[2].innerHTML == '2' 
		    && lignes[j].childNodes[0].innerHTML == nom
		   && lignes[j].getAttribute("class") != "desact")
		{
		    matiere_rattrapee = true;
		    break;
		}
	    }
	    if (matiere_rattrapee == true)
	    {
		if (lignes[i].getAttribute("class") != "desact")
		    ajoutclasse(lignes[i], 0, true);
		continue;
	    }
	}
	/* calcul de la moyenne et ajout de la ligne de tableau */
	if ( (lignes[i].getAttribute("class") != "desact") && (lignes[i].getAttribute("id") != "total"))
	{
	    var coeff_en_cours ;
	    if (lignes[i].childNodes[1].innerHTML == "null") {
		coeff_en_cours = parseFloat(document.getElementById("coeffnull").value) ;
	    }
	    else
	    {		
		coeff_en_cours = parseFloat(lignes[i].childNodes[1].innerHTML.replace(",","."));
		//parsage_nombre(lignes[i].childNodes[1].innerHTML);
	    }
	    var note = parseFloat(lignes[i].childNodes[3].innerHTML.replace(",","."));
	    total += note * coeff_en_cours;
	    coeffs += coeff_en_cours;
	    ajoutclasse(lignes[i], note, false);
	}
    }
    /* Ajout de la ligne du total */
    var moyenne;
    if (coeffs != 0.0) 
	moyenne = Math.round((total/coeffs)*1000)/1000;
    else
	moyenne = '-';
    if (isNaN(moyenne))
	moyenne = 'erreur';
    var nouvcell = document.createElement("tr");
    nouvcell.setAttribute("id","total");
    nouvcell.innerHTML = "<td><b>Total</b></td><td width='40'>" + coeffs + "</td><td>1</td><td width='60'><b>" + moyenne + "</b></td>" ;
    ajoutclasse(nouvcell,(total/coeffs), false);
    nouvcell.setAttribute("style","{font-size:20;}");
    var existant = document.getElementById("total");
    if (existant) existant.parentNode.removeChild(existant);
    document.getElementsByTagName("table")[0].firstChild.appendChild(nouvcell);
}

function ajout_boutoncouleur()
{
    var boutoncouleur = document.createElement("input");
    boutoncouleur.setAttribute("type","submit");
    boutoncouleur.setAttribute("id","boutoncouleur");
    boutoncouleur.addEventListener('click', ajoutstyle, true);
    boutoncouleur.setAttribute("value","Mettre couleur");
    document.getElementsByTagName("body")[0].appendChild(boutoncouleur);
}

function trouver_matiere(tr, table)
{
    for (var i = 0 ; i < table.childNodes[0].childNodes.length ; i++)
    {
	if (table.childNodes[0].childNodes[i].innerHTML == tr.innerHTML)
	    return true;
    }
    return false;
}

function comparer_nouveaux()
{
    /* Enregistre la table de note (cf la doc de GM_setValue()) et compare avec la version précédente pour afficher les changements (nouvelles notes) */
    var table = document.createElement("table");
    table.innerHTML = GM_getValue("tablenotes");
    var table2 = document.getElementsByTagName("table")[0];
    GM_setValue("tablenotes",document.getElementsByTagName("table")[0].innerHTML);

    for (i = table2.getElementsByTagName("tr").length -1 ; i > 0 ; i--) {
	var bool = "false";
	/* l'opérateur "||" n'a pas l'air de se comporter comme un "or else", on utilise donc une double condition pour ne pas déborder */
	if (table.getElementsByTagName("tr").length <= i)
	{
	    bool="true";
	}
	else if ( (table.innerHTML == "undefined") 
		  || 
		  !trouver_matiere(table2.getElementsByTagName("tr")[i], table))
	{
	    bool="true";
	}
	if (bool == "true")
	{
	    var newcell = document.createElement("td");
	    newcell.innerHTML="<font>nouveau !</font>";
	    table2.getElementsByTagName("tr")[i].appendChild(newcell);
	}
    }
}

function creer_cellule()
{
    var cell = document.createElement("td");
    return cell;
}

function ajout_cellule()
{
    // Nécessaire pour appeler les functions d'ajout de boutons suivantes
    var lignes = document.getElementsByTagName("tr");
    for (var i = 1 ; i < lignes.length - 1 ; i++ )
    {
	cell = creer_cellule();
	lignes[i].appendChild(cell);
    }
}

function creer_bouton_desactivation()
{
    var bouton = document.createElement("input");
    bouton.setAttribute("type","submit");
    bouton.setAttribute("value","Désactiver");
    bouton.addEventListener('click', gestion_desactivation, true);
    return bouton;
}

function ajout_bouton_desactivation()
{
    var lignes = document.getElementsByTagName("tr");
    for (var i = 1 ; i < lignes.length - 1 ; i++ )
    {
	bouton = creer_bouton_desactivation();
	lignes[i].childNodes[4].appendChild(bouton);
    }
}

function creer_bouton_suppression()
{
    var bouton = document.createElement("input");
    bouton.setAttribute("type","submit");
    bouton.setAttribute("value","Supprimer");
    bouton.addEventListener('click', gestion_suppression, true);
    return bouton;
}

function ajout_bouton_suppression()
{
    var lignes = document.getElementsByTagName("tr");
    for (var i = 1 ; i < lignes.length - 1 ; i++ )
    {
	bouton = creer_bouton_suppression();
	lignes[i].childNodes[4].appendChild(bouton);
    }
}

function creer_bouton_rattraper()
{
    var bouton = document.createElement("input");
    bouton.setAttribute("type","submit");
    bouton.setAttribute("value","Rattraper");
    bouton.addEventListener('click', gestion_rattrapage, true);
    return bouton;
}

function ajout_bouton_rattraper()
{
    var lignes = document.getElementsByTagName("tr");
    for (var i = 1 ; i < lignes.length - 1 ; i++ )
    {
	if (!matiere_rattrapee(lignes[i].childNodes[4]))
	{
	    bouton = creer_bouton_rattraper();
	    lignes[i].childNodes[4].appendChild(bouton);
	}
    }
}

function gestion_suppression()
{
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    ajout_moyenne();
}

function creer_bouton_modif()
{
    var bouton = document.createElement("input");
    bouton.setAttribute("type","submit");
    bouton.setAttribute("value","Modifier");
    bouton.addEventListener('click', modifier_ligne, true);
    return bouton;
}

function creer_bouton_modif_note()
{
    var bouton = document.createElement("input");
    bouton.setAttribute("type","submit");
    bouton.setAttribute("value","Modifier note");
    bouton.addEventListener('click', modifier_note, true);
    return bouton;
}


function ajout_bouton_modif()
{
    var lignes = document.getElementsByTagName("tr");
    for (var i = 1 ; i < lignes.length - 1 ; i++ )
    {
	bouton = creer_bouton_modif();
	lignes[i].childNodes[4].appendChild(bouton);
    }
}

function ajout_bouton_modif_note()
{
    var lignes = document.getElementsByTagName("tr");
    for (var i = 1 ; i < lignes.length - 1 ; i++ )
    {
	bouton = creer_bouton_modif_note();
	lignes[i].childNodes[4].appendChild(bouton);
    }
}

function modifier_ligne()
{
    var nom = prompt("Nom ?", 
		     this.parentNode.parentNode.childNodes[0].innerHTML);
    var coeff = prompt("Coeff ?", 
		       this.parentNode.parentNode.childNodes[1].innerHTML);
    var session = prompt("Session ?",
			 this.parentNode.parentNode.childNodes[2].innerHTML);
    var note = prompt("Note ?",
		      this.parentNode.parentNode.childNodes[3].innerHTML);
    this.parentNode.parentNode.childNodes[0].innerHTML = nom ;
    this.parentNode.parentNode.childNodes[1].innerHTML = coeff;
    this.parentNode.parentNode.childNodes[2].innerHTML = session ;
    this.parentNode.parentNode.childNodes[3].innerHTML = note;
    ajout_moyenne();
}

function modifier_note()
{
    var note = prompt("Note ?", 
		      this.parentNode.parentNode.childNodes[3].innerHTML);
    this.parentNode.parentNode.childNodes[3].innerHTML = note;
    ajout_moyenne();
}

function gestion_desactivation()
{
    /* Désactive / réactive une matière */
    if (this.parentNode.parentNode.getAttribute("class") != "desact") {
	this.parentNode.parentNode.setAttribute("class","desact");
	this.setAttribute("value","Réactiver");
    }
    else {
	this.parentNode.parentNode.removeAttribute("class");
	this.setAttribute("value","Désactiver");
    }	
    ajout_moyenne();
}

function gestion_rattrapage()
{
    var nom = this.parentNode.parentNode.childNodes[0].innerHTML;
    var coeff = this.parentNode.parentNode.childNodes[1].innerHTML
    var session = '2';
    var note = prompt("Note au rattrapage ?");
    ajout_matiere_param(nom, coeff, session, note, this.parentNode)
    this.parentNode.removeChild(this);
}

function ajout_form_coeff()
{
    /* Ajoute le formulaire permettant de changer la valeur des coeffs null */
    var formcoeff = document.createElement("form");
    formcoeff.setAttribute("onclick","return false;");
    var labelcoeff = document.createElement("label");
    labelcoeff.setAttribute("for","coeffnull");
    labelcoeff.innerHTML="Considérer les null comme des coeffs : ";
    formcoeff.appendChild(labelcoeff);
    var inputcoeff = document.createElement("input");
    inputcoeff.setAttribute("type","text");
    inputcoeff.setAttribute("value","1");
    inputcoeff.setAttribute("size","3");
    inputcoeff.setAttribute("id","coeffnull");
    formcoeff.appendChild(inputcoeff);
    var validcoeff = document.createElement("input");
    validcoeff.setAttribute("type","submit");
    validcoeff.setAttribute("value","ok");
    validcoeff.addEventListener('click', ajout_moyenne, true);
    formcoeff.appendChild(validcoeff);
    document.body.appendChild(formcoeff);
}

function ajout_matiere_param(nom, coeff, session, note, p)
{
    // p pointe vers la cellule contenant les boutons de la ligne concernée
    var tr = document.createElement("tr");
    var tdnom = document.createElement("td");
    var tdcoeff = document.createElement("td");
    var tdsession = document.createElement("td");
    var tdnote = document.createElement("td");
    var tdboutons= document.createElement("td");
    tdnom.innerHTML = nom ;
    tdsession.innerHTML = session ;
    tdcoeff.innerHTML = coeff;
    tdnote.innerHTML = note;
    tr.appendChild(tdnom);
    tr.appendChild(tdcoeff);	
    tr.appendChild(tdsession);
    tr.appendChild(tdnote);
    tdboutons.appendChild(creer_bouton_desactivation());
    tdboutons.appendChild(creer_bouton_modif());
    tdboutons.appendChild(creer_bouton_modif_note());
    tdboutons.appendChild(creer_bouton_suppression());
    if (session != '2' && !matiere_rattrapee(p))
	tdboutons.appendChild(creer_bouton_rattraper());
    tr.appendChild(tdboutons);
    document.getElementsByTagName("table")[0].firstChild.appendChild(tr);
    ajout_moyenne();
}

function ajout_matiere()
{
    var nom = prompt("Nom ?");
    var coeff = prompt("Coeff ?", "1");
    var session = prompt("Session ?" , "1");
    var note = prompt("Note ?");
    ajout_matiere_param(nom, coeff, session, note, this);
}

function ajout_bouton_ajout_matiere()
{
    var boutonajout = document.createElement("input");
    boutonajout.setAttribute("type","submit");
    boutonajout.setAttribute("value","Ajouter une matière");
    boutonajout.addEventListener('click', ajout_matiere, true);
    document.body.appendChild(boutonajout);
}

function sauv_chgts()
{
    GM_setValue("tablenotes_sauv", document.getElementsByTagName("table")[0].innerHTML);
    alert("Sauvegardé.");
}

function ajout_bouton_sauvegarde_chgts()
{
    var boutonsavchgt = document.createElement("input");
    boutonsavchgt.setAttribute("type","submit");
    boutonsavchgt.setAttribute("value","Sauvegarder les changements");
    boutonsavchgt.addEventListener('click', sauv_chgts, true);
    document.body.appendChild(boutonsavchgt);
}


function rest_chgts()
{
    document.getElementsByTagName("table")[0].innerHTML = GM_getValue("tablenotes_sauv");
    // Recréation des hooks
    var lignes = document.getElementsByTagName("tr");
    for (var i = 1 ; i < lignes.length - 1 ; i++)
    {
	var cell = lignes[i].childNodes[4];
	cell.childNodes[0].addEventListener('click', 
					    gestion_desactivation, true);
	cell.childNodes[1].addEventListener('click', 
					    modifier_ligne, true);
	cell.childNodes[2].addEventListener('click',
					    modifier_note, true);
	cell.childNodes[3].addEventListener('click',
					    gestion_suppression, true);
    }
}

function ajout_bouton_restaure_chgts()
{
    var boutonrestchgt = document.createElement("input");
    boutonrestchgt.setAttribute("type","submit");
    boutonrestchgt.setAttribute("value","Restaurer les changements");
    boutonrestchgt.addEventListener('click', rest_chgts, true);
    document.body.appendChild(boutonrestchgt);
}

function ajout_explication_couleurs()
{
    var div = document.createElement("div");
    div.innerHTML = "<br />Les couleurs correspondent à :<br />\
- rouge : < 8 (attention : il faut 8 minimum par UE !)<br />\
- orange : 8 <= note < 10<br />\
- jaune : 10 <= note < 12 (attention : il faut minimum 10 pour redoubler !)<br />\
- vert sapin : 12 (ça passe !)<br />\
- vert citron : 14 (pas à rattraper si redoublement !)<br />\
- gris : matière rattrapée<br /><br />\
<i>Notes_displayer by Célestin Matte</i>" ;
    document.body.appendChild(div);

}

ajout_form_coeff();
ajout_moyenne();
ajout_boutoncouleur();
ajoutstyle();
ajout_cellule();
ajout_bouton_desactivation();
ajout_bouton_modif();
ajout_bouton_modif_note();
ajout_bouton_suppression();
ajout_bouton_rattraper();
comparer_nouveaux();
ajout_bouton_ajout_matiere();
ajout_bouton_sauvegarde_chgts();
ajout_bouton_restaure_chgts();
ajout_explication_couleurs();