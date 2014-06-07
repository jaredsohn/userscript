// ==UserScript==
// @name           universcience.tv
// @namespace      universcience
// @version        1.1
// @description    Génération automatique de commandes 'wget' pour récupération des vidéos du site universcience.tv
// @include        http://www.universcience.tv/
// @include        http://www.universcience.tv/numero/*
// ==/UserScript==


// Traitement effectué par le script
// affiche une liste de commande wget permettant de récupérer les videos de la semaine  d'universcience.tv
// la page courante connait toutes les videos de la semaine (grace a l'element d'id 'carousel' )
// ce qui permet d'extraire le titre et la categorie de chaque video  ainsi que l'url de la page contenant chaque video
// en récupérant le contenu de chaque page de video, on a acces aux urls directes de la video (plusieurs format définis dans des tags "<sources" d'une variable js)) 
// La dernière url semble toujours être la version HD 
function traitement(){
  /**
   * function utilitaire de creatiin d'objet xmlHttpRequest
   **/
	function makeHttpObject() {
		try {return new XMLHttpRequest();}
		catch (erreur) {}
		try {return new ActiveXObject("Msxml2.XMLHTTP");}
		catch (erreur) {}
		try {return new ActiveXObject("Microsoft.XMLHTTP");}
		catch (erreur) {}

		throw new Error("La création de l'objet pour les requêtes HTTP n'a pas pu avoir lieu.");
	}

	/**
   * function utilitaire de requete ajax
   **/
  function http(url, succes, echec) {
		var requete = makeHttpObject();
		requete.open("GET", url, true);
		requete.send(null);
		requete.onreadystatechange = function() {
		  if (requete.readyState == 4) {
		    if (requete.status == 200)
		      succes(requete.responseText);
		    else if (echec)
		      echec(requete.status, requete.statusText);
		  }
		};
	}

	/**
   * function utilitaire de requete http synchrone (la fonction retourne le texte de la reponse)
   **/
	function httpSync(url) {
		var requete = makeHttpObject();
		requete.open("GET", url, false);
		requete.send(null);
		return requete.responseText;
	}

	/**
   * function utilitaire effectuant la focntion 'action' pour chaque element de 'tableau'
   **/
	function forEach(tableau, action) {
		for (var i = 0; i < tableau.length; i++)
		  action(tableau[i]);
	}

	/**
   * function utilitaire de 'reduction' du contenu d'un 'tableau' vers une 'base' par la fonction 'combiner"
   **/
	function reduce(combiner, base, tableau) {
		forEach(tableau, function (element) {
		  base = combiner(base, element);
		});
		return base;
	}

	/**
   * function utilitaire  getElementById rccourci
   **/
	function id (id){
		return document.getElementById(id);
	}

	/**
   * function utilitaire  elt.getElementsByTagName(tag)   raccourci
   **/
	function tags (elt, tag){
		return elt.getElementsByTagName(tag);
	}

	/**
   * function utilitaire de trim de chaine
   **/
	function trim (str){
		return str.replace(/^\s+/g,'').replace(/\s+$/g,'')
	} 

 /**
  *  Recupere le numero de l'episode de la semaine
  */
 function getNumero(){
   var numero= "<inconnu>"; 
   try{
     var numero = tags(id("editionNumber"),'span')[0].lastChild.nodeValue
   } catch (e) { }
   return numero;
 }


	/**
   * Remplit le tableau "vids" avec les infos des videos
   **/
	function pushVideoInfo(li){
    // recupere l'url directe de la video a partir de l'url de la page contenant la video
		function getUrlVideo(urlPage){
      // recupere l'url directe de la video dans le contenu de la page de la video
      // plusieurs urls sont définies en général dans des tag "<source" sur la page de la video
      // on suppose que l'url de la video HD est celle contenant "HD" dans son nom et de type "mp4"
			function extractionUrlVideo(txtPage){
				var tab=txtPage.match(/<source src=".*HD([^\"]+)".*type="video\/mp4"/ig);
        if (!tab || tab.length==0) throw [typeof tab,"La structure a changé : pas de chaine'<source src=' dans la page :",urlPage].join(" ");
				var urls=[]
				forEach (tab, function (elt){
					var url=(elt.match(/src="(.*)"/))[1];
					urls.push(url);
				});
				if (urls.length==0) throw ["Aucune url de vidéo dans la page :",urlPage].join(" ");
				return urls.pop();
			}
      
      // lance l'extraction en récupérant le contenu de la page de la video par une requete http synchrone
		  return extractionUrlVideo(httpSync(urlPage));
		}
    
    // récupération du titre, categorie et url de la page conteant la video
		try {
      //url de la page video est dans le 'href' du lien du 'li' courant
			var urlPageVideo=trim(tags(li,'a')[0].attributes["href"].value);
      //categorie est dans le 'span' du 'h3' du 'li' courant
			var categorieVideo=trim(tags(tags(li,'h3')[0], 'span')[0].firstChild.nodeValue);
      // titre video est l'element texte du h3
			var titreVideo=trim(tags(li,'h3')[0].lastChild.nodeValue);
	
		  vids.push ({categorie:categorieVideo,titre:titreVideo,url:getUrlVideo(urlPageVideo)});
		} catch (erreur) {
		  alert("Impossible de récupérer les infos d'une des vidéos. exception : "+erreur);
		  throw "Traitement interrompu sur erreur.";
		}
	}



	/**
   * Affiche les commandes wget de récupération des vidéos
   * Les caracteres problémtiques sont traités pour ne pas apparaitre dans le nom du fichier
   **/
	function afficheWgets(vids){
    // traitement des caractères spéciaux des noms de fichier 
		function beautifie(valeur) {
		  valeur = valeur.replace(/[\?\!]/g,"");
		  valeur = valeur.replace(/\s?:/g,",");
		  valeur = trim(valeur)
		  valeur = valeur.replace(/\s+/g,".");
		  return valeur;
		}
    
    //entete (commentaire/aide) a afficher avant les wget
		var entete=[] ;
    entete.push(["### <b>Numéro <font color=\"red\">", getNumero(), "</font></b>"].join(" "));
    entete.push(["###", vids.length ,"vidéos"].join(" "));
    entete.push("### Ouvrir une console, se placer dans le répertoire de destination des vidéos, puis  copier-coller les lignes suivantes :");
    entete.push("<br>")
    //generation de la liste des wget pour chaque video par reduction du tableau des videos
		var corps= reduce(function(base,elt){
      //titre
		  var titreFichier=beautifie([elt.categorie,elt.titre].join(" - "));
		  //wget avec titre + url
      var wget= ["wget -O \"",titreFichier, ".mp4\" ",elt.url].join("")
		  base.push(wget);  
		  return base
		},[],vids).join("<br>");
    //affichage a l'ecran
		document.body.innerHTML=[entete.join(" <br>"),corps,"<br> <br>"].join("");

	}


 /**
  *  Traitement principal : recupere dans la page courante, l'element d'id 'carousel' contenant un 'li' par videos proposées. 
  *  extrait les informations des videos de chaque 'li' puis affiche les vommandes wget pour la récup&ration des videos 
  **/
  try{
		var vids=[];
		var carousel=id('carousel');
		if (carousel){
			forEach(carousel.getElementsByTagName('li'),pushVideoInfo);

			document.body.style.color="white";
			document.body.style.fontSize="medium";
			afficheWgets(vids);
		  return true;

		} else {
			alert ("Impossible de récupérer les vidéos : Pas d'élément d'id \"carousel\" dans la page... la structure a changé ??");
		  return false;
		}
  } catch(e) {
    return false;
  }
	
}


// Ajout d'un element "bouton" au div 'global' de la page courante pour lancer le traitement. Si retour traitement==false, un erreur a eu lieu
var btn = document.createElement("button");
btn.setAttribute("type", "button");
btn.appendChild(document.createTextNode("Générer les commandes 'wget' pour récupérer les vidéos"));
btn.addEventListener("click", function(){
  this.innerHTML="Patientez 15s..."; 
  if (! traitement()) { 
    this.innerHTML="Erreur, traitement interrompu...";
  }
},false);
document.getElementById("global").appendChild(btn);


