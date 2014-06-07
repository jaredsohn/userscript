// ==UserScript==
// @name           Sudoc plus
// @author         Sylvain Machefert (@symac)
// @namespace      http://geobib.fr
// @description    Script d'enrichissement du catalogue sudoc (suggestions orthographiques, recherche de localisations automatisée ...)
// @include        http://www.sudoc.abes.fr/*
// @include        http://corail.sudoc.abes.fr/*
// @require       http://www.geobib.fr/sudoc/js/jquery.tools.min.js
// ==/UserScript==

/*
2013-06-03 (0.1.8)
- Correction d'un bug introduit par la fonctionnalité "Voir en ligne" ajoutée au sudoc

2012-01-22 (0.1.7)
- problème sur l'affichage des couvertures suite aux mises à jour sur l'interface publique en novembre/décembre 2011
- création d'icônes pour l'affichage dispo sur liste d'exemplaires (ne passe plus par des icônes externes)
- amélioration sur la création de la carte (utilisation WS Solr + idref)

2011-09-16 (0.1.6)
- correction d'un bug sur l'activation de sudocpluslocal (casser permalien)
- correction d'un bug dans l'utilisation du WS WHERE (pb avec notices n'ayant qu'une localisation)

2011-09-14 (0.1.5)
- Mise à jour pour prendre en compte les changement liés à modification du site du sudoc
- Intégration du web service WHERE pour récpérer la disponibilité d'un exemplaire en direct

2011-03-06 (0.1.4)
- Possibilité de limiter la recherche aux bibliothèques préselectionnées
- Intégration des résumés depuis journaltocs.ac.uk

2011-02-18 (0.1.3)
- Suppression du lien RSS
- Ajout d'un lien vers les revues gratuites à partir web service services.d-nb.de

2010-10-25 (0.1.2)
- Exclusion des pages hors base documentaire (répertoire des bibliothèques)
- Accès direct à une localisation sur la page des localisations, plutôt que retour en début de page

2010-07-27 (0.1.1)
- Correction de l'outil pour répondre aux évolutions du sudoc
- Ajout de la disponibilité depuis les listes de résultat
- Correction de divers bugs signalés

2010-05-25 (0.1.0) : ajout de fonctionnalités avant présentation aux journées ABES : 
- Récupération des couvertures & recommandations Amazon
- Récupération des éditions de librarything
- Géolocalisation des exemplaires

2009-11-16 (0.0.3) : prise en compte des sites corail.sudoc.abes.fr/*
2009-11-13 (0.0.2) : correction de bugs.
2009-11-03 (0.0.1) : première version en ligne du script.
*/

var BASE_URL 	= "http://www.geobib.fr/sudoc/";
var URL_LOC		= "";
var API_TOOLTIP	= "";
var PPN = "";
var ISBN = "";
var ISSN = "";

// On va initialiser le tooltip dès le début
// On commence par regarder sur quel type de page on est
// - 1 : Notice détaillée
// - 2 : Liste de résultats
// - 3 : Recherche sans résultats
// - 4 : Page des localisations
var typePage = getTypePage();
var infos_config = "";
ajoutCocheLocal(typePage);

if (typePage == 4)
{
  var new_position = $('.holding').offset();
  if (new_position)
  {
    window.scrollTo(new_position.left,new_position.top - 25);
  }
}

// On va lancer la fonction init qui ajoute le lien
// et la fenêtre de fonction.
// Avant on ne faisait pas cela si on était sur un typePage = 0 mais maintenant on a quand même besoin de récupérer
// la config pour pouvoir dès le départ limiter aux bibliothèques de l'utilisateur
init(typePage);
GM_xmlhttpRequest({
    method: 'GET',
    url: BASE_URL + 'getInfos.php',
    onload: function(responseDetails) {
			infos_config = JSON.parse(responseDetails.responseText);
			traiteCocheLocal();
			
			if (typePage == 0)
			{
				return;
			}
      // On récupère le PPN (et on en profite pour générer le lien permanent)
      getPPN(typePage);

      // On affiche le lien vers l'affichage sous forme de carte
      geo(typePage);

      // On interroge la page des disponibilités si l'on est sur
			// une notice détaillée seulement.
			getDispo(typePage);
		
			var queryTerm = getQueryTerm();
			
			// On doit définir ce que l'on va devoir ajouter dans le menu SP
//  			rss(queryTerm, typePage);
      
      // On va proposer d'étendre la recherche à partir des informations de Google
			ortho(typePage, queryTerm);
			
			enrichir(typePage);
			accesLibreRevue(typePage);
			tictocPreview(typePage);
    }
});

// Cette fonction va regarder pour une revue si une version électronique
// est librement accessible quelque part
function accesLibreRevue(typePage)
{
  if (typePage != '1')
  {
    return;
  }
  
  ISSN = getISSN();
  if (ISSN != '') 
  {
		GM_xmlhttpRequest ({
			method: 'GET',
			url: BASE_URL + "issn_dnb.php?q=" + ISSN,
			onload: function (responseDetails) 
			{
        var data = eval("(" + responseDetails.responseText + ")");
        var sortie = "";
        
        if (data['dispo'] == '1')
        {
          sortie = "Cette revue est <b>disponible gratuitement en ligne</b> : <a target='_blank' href='" + data['url'] + "'>accès direct</a>";
        }
        else if (data['dispo'] == '2')
        {
          sortie = "Cette revue est <b>partiellement</b> disponible en libre accès : <a target='_blank' href='" + data['url'] + "'>accès direct</a>";
        }
        
        if (sortie != "")
        {
          $($(".rec_lable")[0]).parent().before("<tr><td colspan='2' style='text-align:center; background-color:#E3FF77; padding:10px; font-size:0.8em;'>" + sortie + " <span style='color:#666; font-size:0.8em'>[information issue d'<a style='color:#666;' href='http://ezb.uni-regensburg.de/vascoda/verlinkung/Datenbanken_en.htm'>ezb</a>]</span></td></tr>");
        }
			}
		});
  }
}

// Cette fonction va nous permettre d'attendre que l'appel asynchrone à 
// Google soit terminé pour la récupération des images
function imgAmazWait()
{
  var display_thumb = $("#gbsthumbnail").css("display");
  var url_thumb     = $("#gbsthumbnail").attr("src");
  var display_url   = $("#link_google_books").attr("href");

	var url_thumb = $("#google_books > a > img").attr("src");
  var url_thumb_file;
	if (url_thumb)
	{
		var m = url_thumb.toString().match(/.*\/(.+?)$/);
	
		if (m && m.length > 1)
		{
			url_thumb_file = m[1];
		}		
	}
  
	//  if ( (display_thumb == "inline") && (url_thumb != "") )
  // Mise à jour suite changement interface sudoc nov/déc 2011
	// if ( ( url_thumb != "" ) && (url_thumb != "undefined"))
	if ( ( url_thumb ) && (url_thumb_file != 'google.gif') )
	{
		// On a fini de charger et la couverture Google est présente => On doit la déplacer
    // => 098840770
    deplaceCouvGoogle();
    if (infos_config["amazon_sugg"] == 1)
    {
			console.log("Récup de " + BASE_URL + "couv.php?action=simil_couv&ppn=" + PPN + "&isbn=" + ISBN);
      GM_xmlhttpRequest({
        method: 'GET',
        url: BASE_URL + "couv.php?action=simil_couv&ppn=" + PPN + "&isbn=" + ISBN,
        onload: function(responseDetails) {
          afficheSimil(responseDetails.responseText);
        }
      });
    }
  }
  else if ( (display_thumb == "none") || (url_thumb_file == "google.gif") )
  {
		// Ici on est dans le cas où on a une image google.gif sur le sudoc, la couverture
		// Google Books n'est pas remontée, on doit donc récupérer chez Amazon : Couverture et Suggestions
		
    // On ajoute en dessous les informations fournies par Google pour garder une homogénéïté (ex. 085517828) : 
    deplaceCouvGoogle();
    // On va faire appel à la fonction de récupération des couvertures d'Amazon
    GM_xmlhttpRequest({
      method: 'GET',
      url: BASE_URL + "couv.php?action=couv&isbn=" + ISBN,
      onload: function(responseDetails) {
        if (responseDetails.responseText != "")
        {
          // On ne parse le detail pour mettre en place l'image amazon
          // que si l'on souhaite l'afficher. Mais on la récupère quand même
          // la page couv.php pour avoir les éditions alternatives
          if (infos_config["amazon_couv"] == 1)
          {
            var infos = JSON.parse(responseDetails.responseText);
            if (infos["medium"])
            {
              var medium = infos["medium"][0];
              var large = infos["large"][0];
              $("#couv_sudocplus").before("<div style='text-align:center; padding-top:10px'><a target='_blank' href='" + large + "'><img src='" + medium + "'/></a>"+
              "<br/><span style='font-size:x-small;'>source: <a href='http://www.amazon.fr'>Amazon</a></span></div>");
            }
          }
        }
        
        // On va ajouter sous l'image (si elle est présente)
        // le lien vers Google Books s'il est présent dans la notice : 085517828
        if (infos_config["amazon_sugg"] == 1)
        {
          GM_xmlhttpRequest({
            method: 'GET',
            url: BASE_URL + "couv.php?action=simil&ppn=" + PPN + "&isbn=" + ISBN,
            onload: function(responseDetails) {
              afficheSimil(responseDetails.responseText);
            }
          });						
        }
      }
    });
  }
  else
  {
		// On relance la fonction plus tard le temps que le sudoc ait intégré
		// la couverture
    window.setTimeout(imgAmazWait, 100);
  }
}

function enrichir(typePage)
{
  if (typePage != 1)
  {
    return;
  }

	ISBN = getISBN();

	if (ISBN != "")
	{
		var ajout = "";
		if (infos_config["amazon_sugg"] == 1)
		{
			ajout += "<tr><td colspan='2'><div style='border:1px solid #CCC; padding:5px; font-size:0.8em; margin-top:10px; margin-bottom:10px'><span style='font-weight:bold'>Ouvrages susceptibles de vous intéresser :</span><div id='doc_sugg'><img src='" + BASE_URL + "/images/ajax-loader.gif'/></div></div></td></tr>";			
		}
		if (infos_config["librarything"] == 1)
		{
			ajout += "<tr><td colspan='2'><div style='border:1px solid #CCC; padding:5px; font-size:0.8em; margin-top:10px; margin-bottom:10px'><span style='font-weight:bold'>Autres éditions de cet ouvrage :</span><div id='autres_editions'><img src='" + BASE_URL + "/images/ajax-loader.gif'/></div></div></td></tr>";			
		}
		$("#texturlgb").parent().parent().before(ajout);

		// Récupération des éditions associées via XISBN
		if (infos_config["librarything"] == 1)
		{
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.librarything.com/api/thingISBN/' + ISBN,
				onload: function(responseDetails) {
					var texte = responseDetails.responseText;
					// On doit formater le xml envoyé par thingisbn pour en faire une chaine de caractère que l'on pourra
					// passer à notre script personnalisé
					var tab_isbn = texte.split("<isbn>");
					// On va préparer une chaine de caractère à passer en paramètre
					// Cette chaine commence par le PPN car on ne devra pas retourner
					// la notice contenant le PPN dans le tableau JSON qu'on va
					// retourner
					var q_isbn = PPN;
					for (var i = 1; i < tab_isbn.length; i++)
					{
						var isbn_temp = tab_isbn[i];
						isbn_temp = isbn_temp.replace(/<\/?[^>]+>/gi, '');
						q_isbn = q_isbn + "_" + isbn_temp;
					}
	
					GM_xmlhttpRequest({
						method: 'GET',
						url: BASE_URL + "xisbn.php?q=" + q_isbn,
						onload: function(responseDetails) {
							if (responseDetails.responseText == "")
							{
								$("#autres_editions").html("<span style='font-style:italic'>Aucune autre édition connue</span>");
							}
							else
							{
								$("#autres_editions").html(responseDetails.responseText);
							}
						}
					});
				}
			});
		}


		// Récupération de la couverture par Amazon
		// On va commencer par déplacer la couverture de Google Books si elle
		// est présente. Si c'est le cas on n'ira pas en chercher sur Amazon
		imgAmazWait();
	}
}

function deplaceCouvGoogle()
{
	// On va faire le déplacement suite aux changement de nov/déc 2011
	var html_image = $("#google_books");
	$(".ttllist_actions").append("<div style='text-align:center; padding-top:10px' id='couv_sudocplus'>&nbsp;</div>")
  $("#couv_sudocplus").html(html_image);
  return;
	
//  var html_image = $("#link_google_books");
//  $("#gbsthumbnail").parent().parent().parent().remove();
  $(".ttllist_actions").append("<div style='text-align:center; padding-top:10px' id='couv_sudocplus'>&nbsp;</div>")
  $("#couv_sudocplus").html(html_image);
  // On va supprimer la ligne qui contenait la couverture
}

function afficheSimil(texte)
{
	if (texte != "")
	{
		var tab = JSON.parse(texte);
		var liste = "";
		liste = "<ol style='margin:0px'>";
		for (var ppn in tab)
		{
			liste += "<li><a href='http://www.sudoc.abes.fr/DB=2.1/SRCH?IKT=12&TRM=" + ppn + "'>" + tab[ppn]['titre'] + "</a> " + tab[ppn]['sous_titre']+ "</li>\n";
		}
		liste += "</ol>";
		liste += "<span style='float:right; font-style:italic; color:#666'>Informations fournies par Amazon</span><br/>";
		$("#doc_sugg").html(liste);		
	}
	else
	{
		$("#doc_sugg").html("<span style='font-style:italic'>Aucune suggestion trouvée</span>");
	}
}

function getISSN()
{
  var issn = $("table[summary='title presentation']").find("td:contains('ISSN')").next().text();
  // On va nettoyer les champs ISSN qui contiennent trop d'informations.
	// exemple : http://www.sudoc.abes.fr/DB=2.1/SRCH?IKT=12&TRM=038758717
	issn = issn.replace(/^([xX\d\-]*).*/, "$1");
	return issn;
}

function getISBN()
{
  var isbn = $("table[summary='title presentation']").find("td:contains('ISBN')").next().text();
  isbn = isbn.replace(/\n/gi, '');
  isbn = isbn.replace(/^([xX\d\-]*).*/, "$1");  
  return isbn;
}

function tictocPreview(typePage)
{
	// On a déja cherché l'ISSSN dans la fonction qui nous permet d'indiquer si une revue
	// est disponible en libre accès. On a donc normalement ici l'ISSN, on va chercher
	// sur journalTocs si le contenu est disponible
  if (ISSN != "")
  {
    // On va pouvoir récupérer le tictoc preview
		// On ne met que si la config demande cette fonction. Mis par défaut pour tout le monde dans getInfos.php
		if (infos_config["jtocs"] == 1)
		{
			ajout = "<tr><td colspan='2'><div style='border:1px solid #CCC; padding:5px; font-size:0.8em; margin-top:10px; margin-bottom:10px'><span style='font-weight:bold'>Derniers articles de cette revue :</span><div id='doc_jtocs'><img src='" + BASE_URL + "/images/ajax-loader.gif'/></div></div></td></tr>";			
		}
		$("#texturlgb").parent().parent().before(ajout);
		
		var url_toc = BASE_URL + "jtocs.php?q=" + ISSN;    
    GM_xmlhttpRequest({
      method: 'GET',
			url: url_toc,
			onload: function(responseDetails) {
        if (responseDetails.responseText != "")
        {
					var contenu = "";
          var data = eval("(" + responseDetails.responseText + ")");
					
					if (data['nb'] == 0)
					{
						contenu = "Aucun résultat trouvé sur <a href='http://www.journaltocs.ac.uk/'>Journal TOCS</a>";
					}
					else
					{
						contenu = "<dl style='padding-left:20px;'>"
						for (var i = 1; i < data['articles'].length; i++)
						{
							var titre 	= data['articles'][i]['titre'];
							var auteur	= data['articles'][i]['auteur'];
							var desc		= data['articles'][i]['desc'];
							var url			= data['articles'][i]['url'];
							
							contenu += "<dt><a href='" + url + "'>"+ titre + "</a> / " + auteur + "</dt>";
							contenu += "<dd>" + desc + "</dd>";
						}
						
						contenu += "</dl>";
						if (data['nb'] > 10 )
						{
							contenu += "<span style='float:right; font-style:italic'><a href='" + BASE_URL + "jtocs.php?q=" + ISSN + "&action=redirect' target='_blank'>Voir plus d'articles (" + data['nb'] + ")</a></span><br/>";
							contenu += "<hr style='padding:0px; color:rgb(204, 204, 204)'/>";
						}
						contenu += "<span style='float:right; font-style:italic; color:rgb(190, 190, 190)'>Informations fournies par <a style='color:rgb(190, 190, 190)' href='http://www.journaltocs.ac.uk/'>Journal TOCS</a></span><br/>";
					}
					
					$("#doc_jtocs").html(contenu);
        }
			}
		});
  }
}


function geo(typePage)
{
  
  if ( (typePage == 1) || (typePage == 4) )
  {
    $(".tabbar").append("<a target='_blank' href='" + BASE_URL + "carte3.php?ppn=" + PPN + "'><img alt='Voir les localisations sur une carte' title='Voir les localisations sur une carte' style='border:0px' src='" + BASE_URL + "/images/map2.png'/></a>");
  }
}

// Cette fonction initialise le cadre qui va servir à afficher
// les informations de sudoc+
function init(typePage)
{
	// On ajoute les CSS
	initCss();
	// On ajoute le tooltip
}

// Cette fonction analyse le type de page en cours.
// Le résultat sera utile par la suite pour savoir quelles informations
// afficher.
function getTypePage()
{
	// On va regarder l'url courante qui donne des informations.
	// Seules les pages qui contiennent l'élément avec class tab1
	// sont concernées par l'outil.
	if (!document.URL.match(/DB=2.1/))
	{
    // Si l'on n'est pas sur une page marquée DB=2.1 c'est que l'on n'est pas sur 
    // le catalogue, on n'aura donc aucun traitement à faire avec Sudoc+ (pour le moment en tout cas)
    return 0;
	}

	if ($(".tab1").length > 0)
	{
		var titrePage = $(".tab1").text();
		if ( (titrePage == "Notice détaillée") || (titrePage == "title data") )
		{
			// Notice complète
			return 1;
		}
		else if ( (titrePage == "Liste des résultats") || (titrePage == "Results") )
		{
			// Liste de résultats
			return 2;
		}
		else if ( (titrePage == "Où trouver ce document ?") || (titrePage == "Where to find this document ?") )
		{
			return 4;
		}
		else
		{
      
			// Page non concernée par notre outil
			return 0;
		}		
	}
	else
	{
    // On va chercher la page sans résultats (code 3). Deux situations possibles : 
    // - une recherche type "hary potter" ==> Aucun résultat ne correspond à votre requête
    // - une recherche type "harry pottttter" ==> Affichage d'une liste sur l'index
    var queryInfo = $("//table[summary='query info']");
    if (queryInfo.length)
    {
      return 3;
    }
    else
    {
      // Page non concernée par notre outil
      return 0;
    }
	}
}


// Cette fonction interroge la page des localisations
// et affiche l'information de disponibilité pour les localisations
// sélectionnées.
function getDispo(typePage)
{
	var selection = infos_config["selection"];
	if ( (typePage == 1) || (typePage == 4) )
	{
    $(".navbar").append("<div id=\"tooltip_SP\"/>");
		$(".tabbar .tab0:last").after('<span class="tabsep"> | </span>' + "<span id='a_SP' style='color:#05B'>Mes bibs <span id='loading_nb_sites'><img src='" + BASE_URL + "/images/loading-bleu2.gif'/></span></span>");

    // On va ajouter une fonction jquery si on est sur une page 
    API_TOOLTIP = $("#a_SP").tooltip({
    tip : '#tooltip_SP', 
    offset : [-15, 5],
    opacity : 1.0,
    api: true,
    position : "bottom right"}); 
    // On ajoute le style pour les titres dans le tooltip
    $(".titre_SP").css('font-weight', 'bold');
  }
  // Affichage des disponibilités sur une liste de résultats
  // On utilise une variable récupérée du serveur pour pouvoir désactiver
  // cette fonctionnalité au cas où
	else if ( (typePage == 2) && (infos_config["dispo_liste"] == 1) )
	{
		var tableau = $("//table[summary='short title presentation']");
		if (!selection)
		{
			// Ici l'usager n'a sélectionné aucune bib, il n'est donc pas intéressé par la disponibilité au niveau de la liste.
		}
		// On va ensuite devoir interroger une page sur notre serveur qui va aller voir si les ouvrages
		// sont dispos dans notre bibliothèque. On n'a pas besoin de faire cette interrogation si l'usager a 
		// limité sa requête aux bibs préselectionnées. Dans ce cas là, tout ce qui apparaît est dispo.
		else if (document.URL.match(/sudocpluslocal=on/))
    {
      $(tableau).find("tr").each(function(){
          // $(this).find('td').eq(0).after("<td><img id='' src='" + BASE_URL + "/images/ajax-loader.gif''/></td>");
          // On va chercher la valeur du PPN pour mettre une image déjà prête
          // ^= implique qu'on cherche un input dont le name commence par ppn. Sur le sudoc c'est ppn1, ppn2, ppn3 ...
          var ppn = $(this).find("//input[name^=ppn]").attr("value");
          $(this).find('td.rec_title > div').eq(0).append("<img style='margin-left:10px; width:12px;' src='" + BASE_URL + "images/check.png' alt='" + ppn + " : Disponible dans une au moins des bibliothèques présélectionnées' title='" + ppn + " : Disponible dans une au moins des bibliothèques présélectionnées'/>");
      });
    }
    else
    {
      var params = "";
      $(tableau).find("tr").each(function(){
          // $(this).find('td').eq(0).after("<td><img id='' src='" + BASE_URL + "/images/ajax-loader.gif''/></td>");
          // On va chercher la valeur du PPN pour mettre une image déjà prête
          // ^= implique qu'on cherche un input dont le name commence par ppn. Sur le sudoc c'est ppn1, ppn2, ppn3 ...
          var ppn = $(this).find("//input[name^=ppn]").attr("value");
          $(this).find('td.rec_title > div').eq(0).append("<img style='margin-left:10px; width:12px;' id='img_case_dispo_" + ppn + "' src='" + BASE_URL + "/images/ajax-loader-fleche.gif''/>");
          params += ppn + "_";
      });

      GM_xmlhttpRequest ({
        method: 'GET',
        url: BASE_URL + "getDisposListe.php?ppn=" + params,
        onload: function (responseDetails) 
        {
          var data = eval("(" + responseDetails.responseText + ")");
           for (ppn in data)
           {
              if (data[ppn] == 1)
              {
                // $($("//input[value=" + ppn + "]").parent().parent()).find("td").css("background-color", "green");
                $("#img_case_dispo_" + ppn).attr("src", BASE_URL + "/images/check.png");
                $("#img_case_dispo_" + ppn).attr("alt", "Disponible dans une au moins des bibliothèques présélectionnées");
                $("#img_case_dispo_" + ppn).attr("title", "Disponible dans une au moins des bibliothèques présélectionnées");
              }
              else
              {
                $("#img_case_dispo_" + ppn).attr("src", BASE_URL + "/images/delete.png");
                $("#img_case_dispo_" + ppn).attr("alt", "Absent des bibliothèques présélectionnées");
                $("#img_case_dispo_" + ppn).attr("title", "Absent des bibliothèques présélectionnées");
              }
           }
        }
      });
    }
		return;
	}
	else
	{
		return;
	}
  
  var nb_sites = 0;
	var nb_sites_ok = 0;
	
	var dispos = Array();
	for (var code in selection)
	{
		if (selection[code] != '')
		{
				dispos[code] = Array();
				dispos[code]['lib'] = selection[code];
				dispos[code]['dispo'] = 0;
				nb_sites++;
		}
	}

  if (nb_sites == 0)
	{
		// On va proposer à l'utilisateur d'aller configurer ses sites
		$("#tooltip_SP").append("<div id='dispo_SP' style='color:red'>Les bibliothèques ne sont pas présectionnées.<br/>Veuillez le faire sur <a href='http://www.geobib.fr/sudoc/index.php#tabs-2' target='_blank'>http://geobib.fr/sudoc</a></div>");
		$("#loading_nb_sites").html("");
	}
	else
	{
		var localisations;
		localisations = document.evaluate(
				"//div[@class=\"tabbar\"]/span/a",
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null);

		if (!localisations.snapshotLength) 
		{
			return;
		}
		else
		{
				$("#tooltip_SP").append("<div id='dispo_SP'><center>Chargement des disponibilit&eacute;s&nbsp;<img src='" + BASE_URL + "/images/ajax-loader.gif'/></center></div>");
        GM_xmlhttpRequest ({
				method: 'GET',
				url: "http://www.sudoc.fr/services/where/" + PPN + ".json",
				onload: function (responseDetails) 
				{
          var data = eval("(" + responseDetails.responseText + ")");
          for (id in data["sudoc"])
          {
						var une_bib = data["sudoc"][id]["library"];
						if (!une_bib)
						{
							une_bib = data["sudoc"][id];
						}
            if (une_bib != undefined)
            {
              RCR = une_bib["rcr"];
              // Si dispos[RCR] != undefined c'est que l'on a initialisé dispos pour ce RCR
              // parceque l'usager a sélectionné cette bib
              if (dispos[RCR] != undefined)
              {
                dispos[RCR]['dispo'] = 1;
                nb_sites_ok++;
              }
            }
						
          }
					
					// A partir d'ici on a un tableau dispo complet
					var docsDispos = Array();
					var sortie = "<table>";
					for (var code in dispos)
					{
						if (dispos[code]['dispo'] == 1)
						{
							sortie = sortie + "<tr><td>" + dispos[code]['lib'] + "</td><td>";
							sortie = sortie + "<span class='docDispo'>Disponible</span> <span id=\"plus_" + code + "\">[+ d'infos]</span>";
							docsDispos[code] = 1;
							sortie = sortie + "</td></tr>"
						}
						else
						{
//							sortie = sortie + "<span class='docAbsent'>Absent</span>";
						}
					}
					sortie = sortie + "</table>"
					// On teste si l'on n'a trouvé aucun site sur lequel le doc est disponible
					$("#dispo_SP").text("");
					
					if (sortie == "<table></table>")
					{
						sortie = "<div style='text-align:justify; color:#666'>Le document n'est disponible <br/>dans aucune de vos bibliothèques</div>";
					}
					
					sortie += "<center><a target='_blank' href='http://www.geobib.fr/sudoc/index.php#tabs-2'>(Modifier la liste)</a></center>";
					
					$("#dispo_SP").append(sortie);
					$("#loading_nb_sites").html("&nbsp;<b>[" + nb_sites_ok + "/" + nb_sites + "]</b>");
					
					// On doit ajouter le handler sur les span
					for (var code in docsDispos)
					{
						var elmLink = document.getElementById('plus_' + code);
						elmLink.addEventListener("click", getDispo_Detail, true);
					}
				}})
		}
	}
}

// Cette fonction va récupérer la disponibilité pour une bib donnée
// On aura ainsi la cote et la disponibilité principalement.
function getDispo_Detail()
{
	// On va aller interroger la page qui contient les informations
	// détaillées de localisation
	this.innerHTML = "<img src='" + BASE_URL + "/images/ajax-loader.gif' style='margin-left:10px;margin-right:10px; '/>";
	var zoneBase = this;
	code = this.id;
	code = code.replace(/plus_/, "");
	GM_xmlhttpRequest ({
			method: 'GET',
			url: BASE_URL + "getDispos.php?op=dispo_ex&ppn=" + PPN + "&rcr=" + code,
			onload: function (responseDetails) 
			{
        var infosOut = "";
        var data = eval("(" + responseDetails.responseText + ")");
				for (var code in data)
				{
          var value = data[code];
          if (code != "Biblioth\u00e8que\u00a0:\u00a0")
          {
            if (infosOut != "")
            {
              infosOut = infosOut + "<br/>";
            }
            infosOut = infosOut + "<b>" + code + "</b> : " + value;
          }
				}

				zoneBase.innerHTML = "<div class='infosDispo'>" + infosOut + "</div>";
			}});
}


// La fonction ortho regarde si la page en cours n'a donné
function ortho(typePage, queryTerm)
{
	// On va étendre la recherche seulement si la l'on est sur une page
	// de recherche sans résultats
	if (typePage == 3)
	{
    // $(".tabline")[1].innerHTML = "<div style='margin-left:30px; margin-bottom:5px; color:red'>Essayez avec cet orthographe : <span id='sugg_orth'>Chargement</span></div>";
    var ajout = "";
		// On ajoute un séparateur après le flux RSS
		// ajout = "<span class='tabstep'> | </span>";
		// ajout += "<span style='color:red'>Essayez avec cet orthographe : </span><span id='sugg_orth' style='font-style:italic; font-weight:bold'><img src='" + BASE_URL + "/images/ajax-loader.gif'/></span>";
		// $("//table[summary='query info']").find("tr").append("&nbsp;<span id='sugg_orth' style='font-size:0.8em;'><img src='" + BASE_URL + "/images/ajax-loader.gif'/></span>");
		$("//table[summary='query info']").find("tbody").append("<tr><td id='sugg_orth' class='result' colspan='4'><img src='" + BASE_URL + "/images/ajax-loader.gif'/></td></tr>");
//		$(".tabbar").append(ajout);

		GM_xmlhttpRequest ({
			method: 'GET',
			url: 'http://www.google.com/search?q='+queryTerm+'&hl=fr',
			onload: function (response) {
        var suggestion = "";
        var url = "";
        
				var data = response.responseText;        
				var match = data.match (/<span class=spell style.+?<\/span>(.+?)&nbsp;&nbsp;/);
				if (match != undefined)
				{
          suggestion = nettoieQueryVar(match[1]);
          // Si on a une suggestion on va l'ajouter
          // On doit relancer l'interrogation de l'url courante
          var url = window.location.href;
          var queryTermUrl = queryTerm.replace(/ /g, "+");
          url = url.replace(queryTermUrl, suggestion);
        }
        
				if (suggestion == "")
				{
					suggestion = "";
	        $("#sugg_orth").html("<i>Pas de suggestion</i>");
				}
				else
				{
http://www.sudoc.abes.fr/xslt/DB=2.1/SET=4/TTL=1/CMD?ACT=SRCHM&ACT0=SRCH&MATCFILTER=Y&MATCSET=Y&NOSCAN=Y&PARSE_MNEMONICS=N&PARSE_OPWORDS=N&PARSE_OLDSETS=N&IMPLAND=Y&IKT0=1004&TRM0=&ACT1=*&IKT1=4&TRM1=wikipedia&ILN_DEP_BIB=DEP&ADI_BIB=17
					$("#sugg_orth").html("<span style='color:#CC0000'>Essayez avec cette orthographe</span> : <a style='font-weight:bold; font-style:italic' href='" + url + "'>" + suggestion + "</a>");
				}
      }
    });
	}
}

function ajoutCocheLocal()
{
  var zoneCoche = "<div style='font-size:0.8em'><input id='sudocpluslocal' name='sudocpluslocal' type='checkbox'";
  if (document.URL.match(/sudocpluslocal=on/))
  {
    zoneCoche += " checked";
		// On va aussi rajouter le paramètre dans les liens
		// des facettes pour que la case rester cochée si jamais
		// on rebondit sur les facettes
		$(".link_gen").each(
			function()
			{
				var lien = this.href;
				if (!lien.match(/http:\/\/www.sudoc.fr\//))
				{
					// On n'ajoute pas le lien vers www.sudoc.fr pour ne pas casser le permalien
					// Solution qui fonctionne pour le moment mais pas forcément pérenne le jour
					// où tout sera sur www.sudoc.fr
					this.href = lien + "&sudocpluslocal=on";
				}
			}
   );

		
  }
  zoneCoche += "/>&nbsp;Limiter la recherche à mes bibliothèques&nbsp;<span style='font-weight:bold; color:#FFCC00'>[sudoc+]</span></div>";
  $(".cmdbar").after(zoneCoche);
}

function traiteCocheLocal()
{
	// Si on est sur la page d'accueil, on doit aller récupérer les infos sur getInfos.php
	// parceque d'habitude on fait tout cela 
  $(document).ready(function() {
    $("form[action=CMD]").submit(function() {
      // Ici si l'utilisateur a coché la case 
      if ($("#sudocpluslocal").attr("checked"))
      {
        // Si l'utilisateur a validé cette zone, on doit faire en sorte qu'il puisse limiter
				var listeBibs = "";
				for (var code in infos_config['selection'])
				{
					if (code != "")
					{
						if (listeBibs != "")
						{
							listeBibs += ",";
						}
						listeBibs += code;
					}
				}        

        $('<input />').attr('type', 'hidden').attr('name', "MATCFILTER").attr('value', "Y").appendTo('form[action=CMD]');
				$('<input />').attr('type', 'hidden').attr('name', "MATCSET").attr('value', "Y").appendTo('form[action=CMD]');
				$('<input />').attr('type', 'hidden').attr('name', "ILN_DEP_BIB").attr('value', "LIB").appendTo('form[action=CMD]');
        $('<input />').attr('type', 'hidden').attr('name', "ADI_BIB").attr('value', listeBibs).appendTo('form[action=CMD]');
				
//				$('<input />').attr('type', 'hidden').attr('name', "ILN_DEP_BIB").attr('value', "DEP").appendTo('form[action=CMD]');
//				$('<input />').attr('type', 'hidden').attr('name', "ADI_BIB").attr('value', "17").appendTo('form[action=CMD]');
      }
    });
  });
}

function rss(queryTerm, typePage)
{
	// Si l'on est sur liste de résultats ou une interrogation sans résultats
	// On va afficher les bouton rss
	if ( (typePage != 2) ) // && (typePage != 3) ) // ==> On vire le flux RSS sur les pages sans résultats
	{
		return;
	}
	
	if (infos_config["rss"] != 1)
	{
		return;
	}

  var ajout = "";
	// Si on a déjà un tabstep, c'est que l'on a une page vide mais que les menus Notices abrégés ...
	// sont déjà là. Ex. avec la recherche "hary potttter". Différent d'une recherche wikiepdia
	if ($(".tabbar").find(".tabsep").length)
	{
		ajout = "<span class='tabstep'> | </span>";
	}
	else
	{
		ajout = "<span class='tabstep'>&nbsp;</span>";
	}
	ajout += "<span><a title='Fil RSS pour cette recherche' href='http://pipes.yahoo.com/pipes/pipe.run?_render=rss&_id=hEjNWoX23RGKPI2V_g6H4A&search=" + queryTerm + "'><img  style='border:0px' src='" + BASE_URL + "/images/rss.gif' alt='RSS'/></a></span>";

	$(".tabbar").append(ajout);
}


function getPPN(typePage)
{
	if (typePage == 1)
  {

		var permalien = $("table[summary='title presentation']").find("td:contains('Identifiant\xa0pérenne de\xa0la\xa0notice')").next().text();
		if (permalien == "")
		{
			permalien = $("table[summary='title presentation']").find("td:contains('Persistent identifier of the record')").next().text();
		}

		PPN = permalien.replace(/http:\/\/www\.sudoc\.fr\//, "");
  }
  else if (typePage == 4)
  {
    var valeurs = document.evaluate(
      "/html/body/div[2]/div[2]/span/a",
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null);
    var lien = valeurs.snapshotItem(i).getAttribute("href");
    var match = lien.match(/PPN=([^&]*)/);
		if(match != null)
		{
			PPN = match[1];
    }
  }
	
	console.log("PPN : " + PPN);
}

function getQueryTerm()
{
	var queryTerm	= "";

	var keywords;
	keywords = document.evaluate(
			"//td[@class=\"result_trm\"]",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);

	// On quitte si la ligne "rechercher (et)	(Tous les mots)" n'est pas présente
	if (!keywords.snapshotLength) 
	{ 
		// Si l'on n'a pas la ligne qui reprend la requête, on est sur une page de type 
		// Aucun résultat ne correspond à la requête.

		var url = window.location.href;
		var match = url.match(/TRM=(.*)/);
		if (match != undefined)
		{
				QT = match[1];
				QT = QT.replace("+", " ");
				return QT;
		}
		else
		{
				//alert("ERREUR URL " + url);
				return "";
		}
	}	
	else
	{
		// On récupère la balise qui contient la requête : <queryvar ... ">mot clé</queryvar>
		queryDiv = keywords.snapshotItem(0);
		queryTerm = nettoieQueryVar(queryDiv.innerHTML);
	}
	return queryTerm ;
}



function nettoieQueryVar(text)
{
	reg =new RegExp("<.[^<>]*>", "gi" );
	text = text.replace(reg, "");
	return text;
}

// Cette fonction est utilisée à chaque fois que l'on veut ajouter
// un titre dans la toolbox afin d'avoir un affichage uniformisé
function titreToolbox(texte)
{
	$("#tooltip_SP").append("<div class='titre_SP'>" + texte + "</div>");	
	initCss();
}


// Cette fonction ajoute différentes classes CSS à la page
// en faisant appel à la sous-fonction addGlobalStyle
function initCss()
{
	addGlobalStyle(
		'#tooltip_SP {' + 
		'display: none;' +
		'font-size: 12px;' +
		'background: #FFF;' +
		'border: 2px solid black;' +
		'z-index:1000;' +
		'padding: 5px }');
	
	addGlobalStyle(
		'.titre_SP {' +
		'	text-align:right;' +
		'	font-weight:bold;'+
		'	border-bottom:1px solid black;' + 
		'	padding:0px;' + 
		'	margin-bottom:3px;' +
		'	margin-top:3px' +
		'}');
		
	addGlobalStyle(
		'#tooltip_SP a {text-decoration:none}' +
		'#tooltip_SP a:hover {text-decoration:underline}' +
		'.docDispo {color:green; font-weight:bold}' +
		'.docAbsent {color:red; font-weight:normal}' +
		'.infosDispo {border-left:1px solid black;' +
		'	padding-left:4px;' +
		'	margin-left:4px;' + 
		'}'
	);
	
	
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Gestion des versions du script
var SUC_script_num = 60741; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('Une nouvelle version du script "'+script_name+'." est disponible\nVoulez-vous l\'installer maintenant (conseillé) ?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

updateCheck(0);
