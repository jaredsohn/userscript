// ==UserScript==
// @name		ADL BSB
// @namespace		akareup@gmx.com,2012-09-17:adl_bsb
// @description		Sur le site l'Appel du livre, indique la présence sur le Sudoc et à la bibliothèque Sainte-Barbe et enrichit les notices par des rebonds
// @include		http://www.appeldulivre.fr/*
// @license		 CC-BY
// @updateURL 		http://userscripts.org/scripts/source/153362.user.js
// @version		 1.5
// ==/UserScript==

/* Ce script recherche sur le site de L'Appel du livre les EANs, et va vérifier si le livre correspondant est présent
sur le Sudoc et à la bibliothèque Sainte-Barbe, et enrichir les notices */


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
		if (response.responseText.match(/751052144/i))
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
		logos.title='Présent sur le Sudoc ('+nbBibs+') - '+bsb+' à Sainte-Barbe';
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
			var tBsb=document.createTextNode(bsb+' à Sainte-Barbe');
			if (bsb=='Présent')
				{
				var aBsb=document.createElement('a');
				aBsb.href='http://saone.univ-paris3.fr/primo_library/libweb/action/search.do?vl(282131580UI0)=any&fn=search&vid=BSB&vl(freeText0)=PPN'+ppn;
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
	document.getElementsByName('NOMLIV')[0].value='Bibliothèque Bainte-Barbe';
	document.getElementsByName('RU1LIV')[0].value='11 impasse Chartière';
	document.getElementsByName('POSLIV')[0].value='75005';
	document.getElementsByName('VILLIV')[0].value='Paris';
	document.getElementsByName('TELLIV')[0].value='01-56-81-76-20';
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
	*   Ajout des liens vers les notices dans le panier                                                     *
	************************************************************************************************************* */
	
	
function liensPanier(codvis)
	{
	var spans=document.getElementsByTagName('span');
	var nbSpans=spans.length;
	for (i=0;i<nbSpans;i++)
		{
		var pnl=spans[i].parentNode.childNodes.length;
		if (spans[i].className=='titreliste'&&spans[i]!=spans[i].parentNode.childNodes[pnl-1])
			{
				if (spans[i].nextSibling.innerHTML.match(/[0-9]{13}/))
				{
				var titre=spans[i].textContent;
				spans[i].textContent='';
				var ean=spans[i].nextSibling.innerHTML.match(/[0-9]{13}/)[0];
				var lien=document.createElement('a');
				lien.href='http://www.appeldulivre.fr/cgi-bin/search/detail?CODVIS='+codvis+'&CODEAN='+ean;
				lien.target="_blank";
				lien.textContent=titre;
				spans[i].appendChild(lien);
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

// Si la page courante est le contenu d'un panier
else if (url.match(/cgi-net\/caddy\/index/i))
	{
	var codvis=document.body.innerHTML.match(/CODVIS=(.{8})/i)[1];
	liensPanier(codvis);
	}
	
// Si la page courante provient d'une alerte, renvoi vers une page "classique" de description d'ouvrage
else if (url.match(/alertes\/ean\?/i))
	{
	var ean=url.match(/CODEAN=([0-9]{13})/)[1];
	window.location.replace('http://www.appeldulivre.fr/cgi-bin/search/detail?CODEAN='+ean);
	}