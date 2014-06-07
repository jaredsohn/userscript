// ==UserScript==
// @name		ADL CERCRID
// @namespace		akareup@gmx.com,2012-09-17:vla
// @description		Sur le site l'Appel du livre, indique la présence sur le Sudoc et à la bibliothèque du CERCRID et enrichit les notices par des rebonds
// @include		http://www.appeldulivre.fr/*
// @license		CC-BY
// @updateURL		
// @version		1.4
// ==/UserScript==

/* Ce script recherche sur le site de L'Appel du livre les EANs, et va vérifier si le livre correspondant est présent
sur le Sudoc et à la bibliothèque du CERCRID, et enrichir les notices */


// Récupération de l'URL courante
var url=location.href;

// Les logos à utiliser (en data : pas d'hébergement nécessaire)
var absSUDOC='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QEQDx8JsNcqeQAABANJREFUOMsl0buLXFUcAODf+Z1z7rmPuTOz89hHFrKyEBTZ2GjURjCglhbBB1pIyoiKYoxBYpGoqGHFLkEsRYOVBAlqt5WEKEZDhqBGk4wuu9lJdmbu3Pd5Wvj9Cx8ZDAZCCGs1IcTz/KIo6lohYQS6Ug3b7QViKxDEWNbGxubOZquztHrvas6rSAJaa621S0vLWmutNSEUHHY6nblu2tMkkSOn5hJZNizcxhpjsbp/T22FLz0tQizL2vN83/f37r1nZWVlY2NDaz2dToc3sz/1lmRzFatoYhKTzIZb++9fqysQmFDs6arAfr8vpdRaR1F07ty5S5cuBqGoqmrP/MJqb78e52Q2iYhTM/bIY49WPlSE5T51duv3W9fg8uXfrly5WpblhQvfpmkyGo2cc2VZ13Z7Jp0qZnY3/8c5zcEFgQWhA9AANwZX/7o5wDiOl5YWzp//5suvvmg0wl6vk6aJ5yGSblBOmR+TplzmlKqGLMuK16Zkgx9/nsVe6ZosSSaMwaWfLh48+PjRt94UQvh+IKVktTfxhZ4Oznz2tXUUKVUGIvR/+f4HYkkw4dDcxmazQQiZn5/f3Nxst5uISAgEgS9ibHijM2e/KxCcMRVLIt5Mkut3Yjmyu7JdNdgCC6VOuC2UhQa1RnoT5seiLvO3P1g3WgNDThYN3OY1GHcjqMPI+nmR89zxjsCs6flmscXCbpY6E5hOMLk7fuf9j4zW2l+U2trqts/9kydPSwDGgyzLPM+z1mZZhjInDLLSpIWKBKHeNH1v/VPLwaMcofAwJACnjh+bye3Adse1CcMwjmNK6Xg8RvDNHMtIpk23Y7LiyNl1AOA2LIzyqryA4tS7J0Qx5U5JTHuGlmU5Go0QkRCCHjG3KjTCI5Pd4+unWzUwDFNZhKJFANePvIpaz7hxjng2VsGs1WpZa3u9Xr/fZ1EeQwSBhsOffEwISABjirjRe/mNJxen4TgOhM5qjlS27iBEBRsOh4hYliUhBEtekDo/9uGpeeZTFYSGCIhee/2pPfU+19h3t7iecd5Rc2jTfg1MhBsbG865ra2tPM8ZQb163wMlB1pUDsG54MTJZ+bHy9OwgPTfVbJyV2Wpc4RR6yXEeWtra4cOHdrZ2ZFSEsWh4s2wmikLEPU/P/rK5jjHLnW1AoA0TSmlQRBMJpMoig4cOPDiCy9lWTadTvM8Z0w1qZoRAME6h59+AtUwrH2Xo0qqVqsV+FFRFJMy4Vw89ODDzz37fF3XxhhEFEKQwvcCbcHQ68O/XQviSehaO1wuSFUQQpRSlFLGWJIkVVW1220AMMYYY6y1pAZAj/7x67U5Ncv9ZcRtbftEpURwa61SChGDIHDOaa0ppXmeI+L/z/8BqeJF/prCbH0AAAAASUVORK5CYII=';
var preSUDOCpreBSB='data:image/png;base64,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';
var preSUDOCabsBSB='data:image/png;base64,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';
var prePaniers='data:image/png;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAUABQDAREAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAABQYHAwT/xAAZAQACAwEAAAAAAAAAAAAAAAAEBgADBQj/2gAMAwEAAhADEAAAAatz+4qB7TQ1pR49GKOg0PS8r5XwbeeXBA//xAAZEAADAQEBAAAAAAAAAAAAAAADBAUCAAb/2gAIAQEAAQUCqM6Tn+PpsPi5wGWVfIo4VS4osmHNlLyhd//EACgRAAEDAQUIAwAAAAAAAAAAAAECAxEEABAhMfAFBhIiQUJx0ZGhwf/aAAgBAwEBPwFlAdebaPcpI+SBbeCgYoi0WBE/kaPu7jU3zoMEYjyMRbb9WqpeQCkpAGShGeh4IuxBkWq65+uIU+qY199fV3//xAAjEQABAwMDBQEAAAAAAAAAAAABAgMEBREhABBxEjFBkcGh/9oACAECAQE/AaXHRKlpad7Z/AT81W47bK0rbFuq/G1OeLEttYF8+O5BwQORjVaeWt8IULW4+X2ZeXHWHWjYjUuY5MX1uevA2//EACIQAAICAAYCAwAAAAAAAAAAAAECAxEABBASEyExMkGRsf/aAAgBAQAGPwLMTJW9FsXjMpO/JxkEMfPd6SxP6spBvEzLLHMzvReImuvj9+9GR1DI3RBwyQLW42WPk6f/xAAgEAACAQQBBQAAAAAAAAAAAAABESEAEDFRcUFhgZHh/9oACAEBAAE/IZqxQYdER+ZXB6iOeLKsnAh7pmToSBBMBFksYDtYGZETBFEByFeoPQ6fTb//2gAMAwEAAgADAAAAED9jrt//xAAaEQEBAQEBAQEAAAAAAAAAAAABESExABBR/9oACAEDAQE/EHQQRToOJaUHKJejz0q8olUyB2tR0upXSvqCxiPBKbTEHRP0Tx6eoBXa4roBFqBBH4IERERGImiJojomjp61oQOBwrDKioO4QAe//8QAHREBAQEAAgMBAQAAAAAAAAAAAREhMUEAEGGBof/aAAgBAgEBPxALKxpZZopsWGRliOg3XoAGJoABzszOLb4m7AQXADtRHDXEd8RaTw9l1FBEAopR++uiyn+IjiJiNEURHzDgHAv4VXe1V+wPX//EABsQAQEAAwEBAQAAAAAAAAAAAAERACExQVEQ/9oACAEBAAE/EApXP4cpS4s5N12NfQdU1RYAwGXSMxHaNgduMk3CrAJD6BFR/Cf21xdEwN6/cVp8DB5t2o5//9k=';


	/* ************************************************************************************************************ 
	*                 Utilisation du webservice Multiwhere : recherche de localisation par PPN                    *
	************************************************************************************************************* */

function multiwhere(ean,ppn,typepage,codvis)
	{
	// Récupération des données du webservice
	GM_xmlhttpRequest({
	method:'GET',
	url: 'http://www.sudoc.fr/services/multiwhere/'+ppn,
	onload: function(response)
		{
		// Comptage des bibliothèques détentrices
		if (response.responseText.match(/<library>/gi))
			{
			var nbBibs=response.responseText.match(/<library>/gi).length;
			if (nbBibs>1)
				{
				nbBibs=nbBibs+' bibliothèques';
				}
			else
				{
				nbBibs=nbBibs+' bibliothèque';
				}
			}
		
		// Vérification de la présence à Sainte-Barbe
		if (response.responseText.match(/422182203/i))
			{
			var bsb='Présent';
			var logoSrc=preSUDOCpreBSB;
			}
		else
			{
			var bsb='Absent';
			var logoSrc=preSUDOCabsBSB;
			}
			
		// Création de l'image
		var logos=document.createElement('img');
		logos.src=logoSrc;
		logos.title='Présent sur le Sudoc ('+nbBibs+') - '+bsb+' à Cercrid';
		logos.align='bottom';
		logos.style.padding='0 5px 0 5px';
		
		// Affichage pour une page de description de livre
		if (typepage=='detail')
			{
			var spPresence=document.createElement('span');
			var tSudoc=document.createTextNode('Présent sur le Sudoc');
			var aSudoc=document.createElement('a');
			aSudoc.href='http://www.sudoc.fr/'+ppn;
			aSudoc.title='Voir la notice';
			aSudoc.target='blank';
			aSudoc.style.textDecoration='none';
			aSudoc.appendChild(tSudoc);
			var tNbBibs=document.createTextNode(' ('+nbBibs+') - ');
			spPresence.appendChild(aSudoc);
			spPresence.appendChild(tNbBibs);
			var tBsb=document.createTextNode(bsb+' à Cercrid');
			if (bsb=='Présent')
				{
				var aBsb=document.createElement('a');
				aBsb.href='https://brisees-opac.univ-st-etienne.fr/cgi-bin/koha/opac-detail.pl?biblionumber='+ppn;
				aBsb.title='Voir la notice';
				aBsb.target='blank';
				aBsb.style.textDecoration='none';
				aBsb.appendChild(tBsb);
				spPresence.appendChild(aBsb);
				}
			else
				{
				spPresence.appendChild(tBsb);
				}
			document.getElementById('presences').appendChild(logos);
			document.getElementById('presences').appendChild(spPresence);
			}
			
		// Affichage pour une page de résultats de recherche
		if (typepage=='liste')
			{
			document.getElementById('cellDispo'+ean).insertBefore(logos,document.getElementById('cellDispo'+ean).getElementsByTagName('img')[0]);
			}
		
		// Lancement de la vérification dans les commandes précédentes
		paniers(ean,typepage,codvis);
		}
		});
	}


	/* ************************************************************************************************************ 
	*       Utilisation du webservice ISBN2PPN : recherche de PPN par ISBN (10 ou 13 - avec ou sans tirets)       *
	************************************************************************************************************* */

function isbn2PPN(ean,typepage,codvis)
	{
	// Test de la présence de l'EAN sur le webservice isbn2PPN
	GM_xmlhttpRequest({
	method:'GET',
	url: 'http://www.sudoc.fr/services/isbn2ppn/'+ean,
	onload: function(response)
			{
			// Si un PPN a été trouvé, utilisation du webservice Multiwhere
			if (response.responseText.match(/<ppn>/i))
				{
				var ppn=response.responseText.match(/<ppn>([0-9|X]{9})<\/ppn>/i)[1];
				multiwhere(ean,ppn,typepage,codvis);
				}
			
			// Si l'EAN n'a pas permis de trouver un PPN, calcul de l'ISBN 10, et test de celui-ci
			else
				{
				// Calcul de l'ISBN 10
				var sommeCle=parseInt(ean.substr(3,1),10)*10+parseInt(ean.substr(4,1),10)*9+parseInt(ean.substr(5,1),10)*8+parseInt(ean.substr(6,1),10)*7+parseInt(ean.substr(7,1),10)*6+parseInt(ean.substr(8,1),10)*5+parseInt(ean.substr(9,1),10)*4+parseInt(ean.substr(10,1),10)*3+parseInt(ean.substr(11,1),10)*2;
				var cle=11+Math.floor(sommeCle/11)*11-sommeCle;
				if (cle==11)
					{
					cle='0';
					}
				else if (cle==10)
					{
					cle='X';
					}
				else
					{
					cle=cle.toString();
					}
				var isbn=ean.substr(3,9)+cle;

				// Test de la présence de l'ISBN 10 sur le Sudoc
				GM_xmlhttpRequest({
				method:'GET',
				url: 'http://www.sudoc.fr/services/isbn2ppn/'+isbn,
				onload: function(response)
						{
						// Si un PPN a été trouvé, utilisation du webservice Multiwhere
						if (response.responseText.match(/<ppn>/))
							{
							ppn=response.responseText.match(/<ppn>([0-9|X]{9})<\/ppn>/i)[1];
							multiwhere(ean,ppn,typepage,codvis);
							}
						
						// Si l'ISBN 10 n'a pas permis de trouver un PPN, affichage du résultat
						else
							{
							// Création de l'image
							var logo=document.createElement('img');
							logo.src=absSUDOC;
							logo.title='Absent du Sudoc';
							logo.align='bottom';
							logo.style.padding='0 5px 0 5px';
							
							// Affichage pour une page de description de livre
							if (typepage=='detail')
								{
								var spPresence=document.createElement('span');
								var tPresence=document.createTextNode('Absent du Sudoc');
								spPresence.appendChild(tPresence);
								document.getElementById('presences').appendChild(logo);
								document.getElementById('presences').appendChild(spPresence);
								
								}
							
							// Affichage pour une page de résultats de recherche
							if (typepage=='liste')
								{
								document.getElementById('cellDispo'+ean).insertBefore(logo,document.getElementById('cellDispo'+ean).getElementsByTagName('img')[0]);
								}
							// Lancement de la vérification dans les commandes précédentes
							paniers(ean,typepage,codvis);
							}
						}
					});
				}
			}
		});
	
	}
	
	
	/* ************************************************************************************************************ 
	*                   Recherche dans les commandes précédentes                                                  *
	************************************************************************************************************* */
function paniers(ean,typepage,codvis)
	{
	// Récupération du résultat d'une recherche dans les commandes précédentes
	GM_xmlhttpRequest({
	method:'GET',
	url: 'http://www.appeldulivre.fr/cgi-net/Suivicde/index?INIT=1&CODVIS='+codvis+'&SLT_TYPETA=00&SLT_MOTCLE='+ean,
	onload: function(response)
			{
			// Si la requète ne renvoie pas une réponse négative ni une invitation à se connecter
			if (!response.responseText.match(/Il n'y a aucune réponse à votre recherche, vous pouvez la reformuler/g)&&!response.responseText.match(/Veuillez vous identifier, merci/g))
				{
				// Création de l'image
				var logoPanier=document.createElement('img');
				logoPanier.src=prePaniers;
				logoPanier.title='Déjà commandé';
				logoPanier.align='bottom';
				logoPanier.style.padding='0 5px 0 5px';
				
				// Affichage pour une page de description de livre
				if (typepage=='detail')
					{
					var spPaniers=document.createElement('span');
					var separateur=document.createElement('br');;
					var tPaniers=document.createTextNode('Déjà commandé');
					var aPaniers=document.createElement('a');
					aPaniers.href='http://www.appeldulivre.fr/cgi-net/Suivicde/index?INIT=1&CODVIS='+codvis+'&SLT_TYPETA=00&SLT_MOTCLE='+ean;
					aPaniers.title='Voir dans les commandes précédentes';
					aPaniers.target='blank';
					aPaniers.style.textDecoration='none';
					aPaniers.appendChild(tPaniers);
					spPaniers.appendChild(aPaniers);
					document.getElementById('presences').appendChild(separateur);
					document.getElementById('presences').appendChild(logoPanier);
					document.getElementById('presences').appendChild(spPaniers);
					}
				// Affichage pour une page de résultats de recherche
				if (typepage=='liste')
					{
					document.getElementById('cellDispo'+ean).insertBefore(logoPanier,document.getElementById('cellDispo'+ean).getElementsByTagName('img')[0]);
					}
				}
			}
		});
	}

	
	/* ************************************************************************************************************ 
	*                   Ajout des boutons de recherche par rebonds (auteur, éditeur, collection)                  *
	************************************************************************************************************* */
/* FONCTION DÉSACTIVÉE LE 27/06/13
function rebonds(codvis)
	{
	// Repérage du paragraphe contenant les informations bibliographiques bibliographique : seul celui-ci contient
	// toujours un span de classe "auteur" (span vide s'il n'y a pas d'auteur identifié)
	var para=description.getElementsByTagName("p");
	var nbP=para.length;
	for (i=0;i<nbP;i++)
		{
		if (para[i].innerHTML.match(/class="auteur"/i))
			{
			var infosBib=para[i];
			i=nbP;
			}
		}
		
	// Identification (et "nettoyage") du nom de l'auteur
	var auteur=infosBib.innerHTML.match(/class="auteur">([^<]*)<\/span>/i)[1];
	auteur.replace(/\([^\)]*\)/g,'');
	
	// Repérage d'un potentiel éditeur
	var editeur='';
	if (infosBib.innerHTML.match(/Editeur : <b>/i))
		{
		editeur=infosBib.innerHTML.match(/Editeur : <b>([^<]*)<\/b>/i)[1];
		}
		
	// Repérage d'une potentielle collection
	var collection='';
	if (infosBib.innerHTML.match(/Collection : <b>/i))
		{
		collection=infosBib.innerHTML.match(/Collection : <b>([^<]*)<\/b>/i)[1];
		}
	
	// Si un auteur, un éditeur ou une collection est identifié(e), création et ajout d'une zone de rebonds
	if (auteur!=''||editeur!=''||collection!='')
		{
		// Identification du point d'insertion de la zone de rebonds
		var point=infosBib.getElementsByTagName('span')[0];
		
		// Création et ajout d'une zone de rebonds
		var plus=document.createElement('p');
		var tPlus=document.createTextNode('+ de titres');
		plus.appendChild(tPlus);
		
		// Si l'auteur est identifié, création d'un lien de recherche pour cet auteur
		if (auteur!='')
			{
			var tiret1=document.createTextNode(' - ');
			plus.appendChild(tiret1);
			var rechAuteur=document.createElement('span');
			var lienAuteur=document.createElement('a');
			lienAuteur.target='blank';
			lienAuteur.href='http://www.appeldulivre.fr/cgi-bin/search/index?INIT=1&CODVIS='+codvis+'&CODSAI=DMD&CODFRM=DTL&ELECTRE_FMT=L&ELECTRE_NN=2500&ELECTRE_PN=1&TYP_SEARCH=A&RCH_MOT='+auteur;
			var tAuteur=document.createTextNode('de cet auteur');
			lienAuteur.appendChild(tAuteur);
			rechAuteur.appendChild(lienAuteur);
			plus.appendChild(rechAuteur);
			}
			
		// Si l'éditeur est identifié, création d'un lien de recherche chez cet éditeur
		if (editeur!='')
			{
			var tiret2=document.createTextNode(' - ');
			plus.appendChild(tiret2);
			var rechEditeur=document.createElement('span');
			var lienEditeur=document.createElement('a');
			lienEditeur.target='blank';
			lienEditeur.href='http://www.appeldulivre.fr/cgi-bin/search/index?INIT=1&CODVIS='+codvis+'&CODSAI=DMD&CODFRM=DTL&ELECTRE_FMT=L&ELECTRE_NN=2500&ELECTRE_PN=1&TYP_SEARCH=E&RCH_MOT='+editeur;
			var tEditeur=document.createTextNode('chez cet éditeur');
			lienEditeur.appendChild(tEditeur);
			rechEditeur.appendChild(lienEditeur);
			plus.appendChild(rechEditeur);
			}
		
		// Si la collection est identifiée, création d'un lien de recherche dans cette collection
		if (collection!='')
			{
			var tiret3=document.createTextNode(' - ');
			plus.appendChild(tiret3);
			var rechColl=document.createElement('span');
			var lienColl=document.createElement('a');
			lienColl.target='blank';
			lienColl.href='http://www.appeldulivre.fr/cgi-bin/search/index?INIT=1&CODVIS='+codvis+'&CODSAI=DMD&CODFRM=DTL&ELECTRE_FMT=L&ELECTRE_NN=2500&ELECTRE_PN=1&TYP_SEARCH=C&RCH_MOT='+collection;
			var tColl=document.createTextNode('dans cette collection');
			lienColl.appendChild(tColl);
			rechColl.appendChild(lienColl);
			plus.appendChild(rechColl);
			}
		
		plus.style.fontWeight='bold';
		plus.style.textAlign='right';
		plus.style.color='DimGrey';
		plus.style.margin='0 1em -1.2em 0';
		infosBib.insertBefore(plus,point);
		}
	}

	*/
	/* ************************************************************************************************************ 
	*   Affichage du dernier article du panier en cours                                                           *
	************************************************************************************************************* */

function dernierItem(codvis)
	{
	// Si un panier non-vide est ouvert (présence d'un lien vers le contenu du panier)
	if (document.body.innerHTML.match(/href="\/cgi-net\/caddy\/index\?/i))
		{
		// Construction de l'url du panier en cours
		urlPanier='http://www.appeldulivre.fr/cgi-net/caddy/index?INIT=0&CODVIS='+codvis;
		
		// Récupération de la page de contenu du panier
		GM_xmlhttpRequest({
		method:'GET',
		url: urlPanier,
		onload: function(response)
				{
				// Récupération des titres contenus dans le panier (identifiés par la classe "titreliste")
				var titresPanier=response.responseText.match(/class="titreliste">[^<]*<\/span>/gi);
				
				// Récupération du dernier titre
				var dernierTitre=titresPanier[titresPanier.length-1].match(/>([^<]*)</i)[1];
				
				// Repérage du tbody contenant le nom du panier : le codage HTML du site n'est pas très rigoureux, mais seul
				// ce tbody contient un bouton en image nommée panier_votre_panier.gif
				var tbodies=document.getElementsByTagName('tbody');
				var nbTbodies=tbodies.length;
				for (i=0;i<nbTbodies;i++)
					{
					if (tbodies[i].innerHTML.match(/src="\/images\/panier_votre_panier.gif"/i)&&!tbodies[i].innerHTML.match(/<tbody/i))
						{
						var nouvLigne=document.createElement('tr');
						var nouvEspaceur=document.createElement('td');
						nouvEspaceur.style.width='7px';
						var nouvCell=document.createElement('td');
						var nouvP=document.createElement('p');
						var txtDernier=document.createTextNode('Dernier titre ajouté :');
						var nouvBr=document.createElement('br');
						var txtTitre=document.createTextNode(dernierTitre);
						nouvP.appendChild(txtDernier);
						nouvP.appendChild(nouvBr);
						nouvP.appendChild(txtTitre);
						nouvP.style.fontWeight='bold';
						nouvP.style.backgroundColor='Gold';
						nouvP.style.padding='5px';
						nouvCell.appendChild(nouvP);
						nouvLigne.appendChild(nouvEspaceur);
						nouvLigne.appendChild(nouvCell);
						tbodies[i].appendChild(nouvLigne);
						i=nbTbodies;
						}
					}
				}
			});
		}
	}

	
	/* ************************************************************************************************************ 
	*   Remplissage automatique de l'adresse de livraison                                                         *
	************************************************************************************************************* */
	
	
function rempliAdresse()
	{
	document.getElementsByName('CIVLIV')[0].value='S';
	document.getElementsByName('NOMLIV')[0].value='CERCRID Bibliothèque';
	document.getElementsByName('RU1LIV')[0].value='6 rue Basse des Rives';
	document.getElementsByName('POSLIV')[0].value='42023';
	document.getElementsByName('VILLIV')[0].value='Saint-Etienne';
	document.getElementsByName('TELLIV')[0].value='04-77-42-19-02';
	}
	
	
	/* ************************************************************************************************************ 
	*   Mise en forme de la page d'impression du panier                                                      *
	************************************************************************************************************* */
	
	
function imprPanier()
	{
	document.body.style.fontFamily='Tahoma';
	var parag=document.getElementsByTagName('p');
	var nbP=parag.length;
	for (i=1;i<nbP;i++)
		{
		parag[i].style.fontFamily='Tahoma';
		parag[i].style.fontSize='1em';
		}
	var tables=document.getElementsByTagName('table');
	var nbTables=tables.length;
	for (i=0;i<nbTables;i++)
		{
		if (tables[i].innerHTML.match(/class="petit/i)&&!tables[i].innerHTML.match(/<table/i))
			{
			tables[i].style.borderCollapse='collapse';
			var lignes=tables[i].getElementsByTagName('tr');
			var nbLignes=lignes.length;
			for (j=0;j<nbLignes;j++)
				{
				if (lignes[j].innerHTML.match(/class="grisfonce2/i)&&!lignes[j].innerHTML.match(/<tr/i))
					{
					lignes[j].getElementsByTagName('td')[0].style.border='thin solid';
					lignes[j].getElementsByTagName('td')[0].style.width='75%';
					lignes[j].getElementsByTagName('td')[0].style.padding='5px';
					lignes[j].getElementsByTagName('td')[1].style.border='thin solid';
					lignes[j].getElementsByTagName('td')[1].style.width='5%';
					lignes[j].getElementsByTagName('td')[1].style.padding='5px';
					lignes[j].getElementsByTagName('td')[2].style.border='thin solid';
					lignes[j].getElementsByTagName('td')[2].style.width='15%';
					lignes[j].getElementsByTagName('td')[2].style.padding='5px';
					
					lignes[j].getElementsByTagName('td')[3].style.display='none';
					lignes[j].getElementsByTagName('td')[4].style.display='none';
					}
				}
			}
		}
	
	}
	
	
	/* ************************************************************************************************************ 
	*   Au chargement de la page, identification du type de page (description d'un livre ou liste de résultats)   *
	************************************************************************************************************* */

// Si la page courante est une page de description de livre
if (url.match(/detail\?/i)&&url.match(/CODEAN=[0-9]{13}/i))
	{
	// Préparation de la zone d'affichage
	
	// Repérage du tableau contenant la ligne de titre : le codage HTML du site n'est pas très rigoureux, mais seule
	// la ligne de titre contient l'attribut class="titre"
	var tableaux=document.getElementsByTagName('table');
	var nbTableaux=tableaux.length;
	for (i=0;i<nbTableaux;i++)
		{
		if (tableaux[i].innerHTML.match(/class="titre/i)&&!tableaux[i].innerHTML.match(/<table/i))
			{
			// Repérage de la ligne de titre
			var lignes=tableaux[i].getElementsByTagName('tr');
			var nbLignes=lignes.length;
			for (j=0;j<nbLignes;j++)
				{
				if (lignes[j].innerHTML.match(/class="titre/i))
					{
					// Insertion d'une ligne immédiatement après la ligne de titre
					var nouvLigne=document.createElement('tr');
					var nouvCell=document.createElement('td');
					nouvCell.id='presences';
					nouvLigne.appendChild(nouvCell);
					var description=lignes[j+1];
					lignes[j].parentNode.insertBefore(nouvLigne,description);
					j=nbLignes;
					}
				}
			i=nbTableaux;
			}
		}
	// Mise en forme de la cellule créée (c'est là que s'affichera le résultat)
	document.getElementById('presences').colSpan='3';
	document.getElementById('presences').style.fontWeight='bold';
	document.getElementById('presences').style.fontSize='large';
	document.getElementById('presences').style.color='DimGrey';
	
	// Récupération de l'EAN
	var ean=url.match(/CODEAN=([0-9]{13})/)[1];
	
	// Récupération du numéro de session
	if (url.match(/CODVIS=(.{8})/))
		{
		var codvis=url.match(/CODVIS=(.{8})/)[1];
		}
	// S'il est absent de l'url, recherche dans la page
	else if (document.body.innerHTML.match(/CODVIS=(.{8})/))
		{
		var codvis=document.body.innerHTML.match(/CODVIS=(.{8})/)[1];
		}
	// Si aucun numéro de session n'est trouvé, attribution arbitraire
	else
		{
		var codvis="00000001";
		}
	
	// Test de l'EAN sur le webservice ISBN2PPN
	isbn2PPN(ean,'detail',codvis);
	
	// Lancement de l'enrichissement par des liens de rebonds
	/* rebonds(codvis); FONCTION DÉSACTIVÉE LE 27/06/13 */
	
	// Affichage du dernier titre du panier
	dernierItem(codvis);
	}
	
// Si la page courante est une page de résultats de recherche
else if (url.match(/cgi-bin\/search\/index/i))
	{
	// Repérage des lignes de résultats : le codage HTML du site n'est pas très rigoureux, mais seules
	// les lignes de résultats contiennent un lien vers une page commençant par "detail?"
	var lignes=document.getElementsByTagName('tr');
	var nbLignes=lignes.length;
	for (i=0;i<nbLignes;i++)
		{
		if (lignes[i].innerHTML.match(/a href="detail\?[^"]*"/gi)&&!lignes[i].innerHTML.match(/<tr/i))
			{
			// Récupération de l'EAN
			var ean=lignes[i].innerHTML.match(/CODEAN=([0-9]{13})/i)[1];
			
			// Identification et préparation de la cellule de disponibilité (c'est là que s'affichera le résultat)
			var cellules=lignes[i].getElementsByTagName('td');
			var nbCell=cellules.length;
			for (j=0;j<nbCell;j++)
				{
				if (cellules[j].innerHTML.match(/img src="\/images\/dispo/gi)&&!cellules[j].innerHTML.match(/<td/i))
					{
					cellules[j].id='cellDispo'+ean;
					cellules[j].getElementsByTagName('img')[0].align='bottom';
					cellules[j].style.textAlign='right';
					}
				}
			
			// Récupération du numéro de session
			var codvis=lignes[i].innerHTML.match(/CODVIS=(.{8})/i)[1];
			
			// Test de l'EAN sur le webservice ISBN2PPN
			isbn2PPN(ean,'liste',codvis);
			}
		}
	// Affichage du dernier titre du panier
	dernierItem(codvis);
	}
	
// Si la page courante concerne l'adresse de livraison
else if (url==('http://www.appeldulivre.fr/cgi-net/commande/ident'))
	{
	rempliAdresse();
	}

// Si la page courante est la page d'impression du panier
else if (url.match(/cgi-net\/caddy\/imprim/i))
	{
	imprPanier();
	}
	
// Si la page courante provient d'une alerte, renvoi vers une page "classique" de description d'ouvrage
else if (url.match(/alertes\/ean\?/i))
	{
	var ean=url.match(/CODEAN=([0-9]{13})/)[1];
	window.location.replace('http://www.appeldulivre.fr/cgi-bin/search/detail?CODEAN='+ean);
	}