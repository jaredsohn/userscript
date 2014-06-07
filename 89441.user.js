// ==UserScript==
// @name           alliStat-Redesign
// @namespace      vulca
// @version        1.9c
// @author         Vulca (98% ) & Martineli ( 2% )
// @description    Calcul de progression des membres de l'alliance
// @include       http://*.ogame.*/game/index.php?page=network&*
// @include       http://*.ogame.*/game/index.php?page=alliance*
// ==/UserScript==

	if (document.getElementById('playerName')) // Si c'est un univers Redesign
	{
	
		var Version = '1.9c'
		
		var couleur = new Array();
		var sizeset = new Array();
		if (navigator.userAgent.indexOf('Firefox')>-1)  {var FireFox = true; var nomScript='';}
		else 											{var FireFox = false;var nomScript='alliStat-Redesign';}
		
		var AJours = GM_getValue(nomScript+"aJours",true);
		
		
//******************************************************************************************************/		
//********************************* Options du script modifiable ***************************************/
// *************************** NE MODIFIER QUE CE QUI SUIT ET RIEN D'AUTRE ! ***************************/
//******************************************************************************************************/

								var nbTrie = 1; // Comment trier les joueurs :
												//	-1 : Dans l'ordre de départ
												//  1 : Par points 
												//  6 : par progression en points
												//  7 : par progression dans le classement 
												
												// 8 : par progression en pourcent
												
												
                            // ne modifier que le nom des couleurs, ne pas oublier le # pour les héxadécimaux 
							
									couleur[0]='red';           // Couleur pseudo
									couleur[1]='grey';		// Couleur des fleches
									couleur[2]='#5050FF';		// Couleur des points
									couleur[3]='grey';			// Couleur des mots 
									couleur[4]='white';		    // Couleur du titre, des point et de la place
									couleur[5]='#00FF00';			// Couleur des progressions positives
									couleur[6]='#FF0000';			// Couleur des progressions nï¿½gative
									couleur[7]='red';           // Couleur du classement ( au-dessus des quote ou non selon la var ci-dessous )
									couleur[8]='green';         // Couleur du classement par points ( celui des membres in game )
									couleur[9]='#AA0000';       // Couleur des coordonnées
									couleur[10]='yellow';         // Couleur des progression 
									
									// pour les size
									// none pour aucune size particulière 
									// ne modifier que les chiffres, ne pas toucher aux sizeset[i]
									
									    sizeset[0] = 16; // taille à afficher pour le classement par progression ( au-dessus du quote ou non selon la var )
										sizeset[1] = 20; // taille à afficher pour le premier au classement par points
										sizeset[2] = 16; // taille à afficher pour le deuxième au classement par points
										sizeset[3] = 14; // taille à afficher pour le troisième au classement par points
										sizeset[4] = 14; // taille à afficher pour la progression négative ( histoire lui mettre la honte xD ) => mettre none si aucune taille désirée
										sizeset[5] = 16; // taille à afficher pour la position dans le classement par points		
										sizeset[6] = 20; // taille du "Progression depuis"									
									
							// pour activer l'option mettez true, pour la désactiver remplacez-le par false
							    // options générales
									var baliseCenter = true; // false pour align=center
									var afficherEnQuote = false;// Afficher les progressions en quote (true ou false)
									var centrerlescript = true; // affiche en centrer ( true ou false )								
									var gras = true; // afficher le script en gras ou non
									var souligne = true; // souligner le "progression depuis" ( true ou false )
									
									// pour la légende
									
									var afficherlalegende = false; // afficher la légende ou non ( true ou false )
									var spoile = true; // afficher la légende en spoiler ou non ( true ou false )
									
									// pour les coordonnées
									
									var affichercoordo = true; // affiche les coordonnées de la PM ( true ou false )							
									var italique = false; // mettre les coordonnées en italic ( true ou false )
									var gras_coord = true; // mettre les coordonnées en gras ou non ( true ou false )

									
									// pour les images
									var AfficheAudebut = false; // L'affichage des smiley, debut ou fin
									var image1 = '[IMG]http://membres.lycos.fr/piratland/original/smiley182.gif[/IMG]'; // image du premier au classement progression
									var image2 = '[IMG]http://membres.lycos.fr/piratland/original/smiley183.gif[/IMG]'; // image du deuxième au classement progression
									var image3 = '[IMG]http://membres.lycos.fr/piratland/original/smiley181.gif[/IMG]'; // image du troisième au classement progression
									var image4 = '[IMG]http://membres.lycos.fr/piratland/original/smiley168.gif[/IMG]'; // image moqueuse pour les progressions négatives
									
//******************************************* Fin des option ********************************************/
	// définition des variables ci-dessus
	
	     // variable quote
			var quote = '';
			var finquote='';
		if(afficherEnQuote)
		{
			quote = '[quote]';
			finquote='[/quote]';
		}
		
		// variable centrer
		    var center = '';
			var fincenter='';
	    if(centrerlescript)
		{
			if(baliseCenter)
			{
				center = '[center]';
				fincenter = '[/center]';
			}
			else
			{
				center = '[align=center]';
				fincenter = '[/align]';
			}
	    }
		
		// variable gras
		    var bold = '';
			var finbold = '';
		if(gras)
		{
		    bold = '[b]';
			finbold = '[/b]'
		}
		
		// variable quote
			var underline = '';
			var finunderline='';
		if(souligne)
		{
			underline = '[u]';
			finunderline= '[/u]';
		}
		
		// variable quote
			var spoiler = '';
			var finspoiler='';
		if(spoile)
		{
			spoiler = '[spoiler]';
			finspoiler ='[/spoiler]';
		}
		

		
	//***************************************** Pour les coordonnées ******************************************/

                   //   pour des raisons pratiques la variable sera définie dans l'export BB code > ligne 320
				   
		// variable italic
		   var italic = '';
		   var finitalic = '';
		 if ( italique )
		 {
		    italic = '[i]';
			finitalic = '[/i]';
		}
		
		// variable gras pour coordonnées
		   var bold_c = '';
		   var finbold_c = '';
		 if ( gras_coord )
		 {
		    bold_c = '[b]';
			finbold_c = '[/b]';
		}
	//******************************************* Pour la légende ********************************************/


		// on définit d'abord quelques variables de la légende 

				// couleurs du BB code légende
				// ces variables modifient UNIQUEMENT la LÉGENDE
				// NE RIEN MODIFIER
				
			    var classprog2_leg = '[color='+couleur[0]+']'+bold+'Classement progression'+finbold+'[/color]'; // couleur de "Classement  progression 
				var class_leg = '[color='+couleur[5]+']classement points[/color]'; // couleur du début du quote, le classement par points
				var sepa_leg = '[color='+couleur[3]+']-[/color]'; // couleur du séparateur de la légende
				var pseudo_leg = '[color='+couleur[0]+']pseudo[/color]'; // couleur du pseudo
				var points_leg = '[color='+couleur[2]+']points[/color]'; // couleur des points affichés
				var arrow_leg = '[color='+couleur[1]+']->[/color]'; // on définit la couleur des flèches
				var classement_leg = bold +'[color='+couleur[3]+']Classement :[/color] [color='+couleur[5]+']xx ( +xx[/color] / [color='+couleur[0]+']-xx[/color][color='+couleur[5]+'] )[/color]'+ finbold; // couleur du classement ( et prog dans ce classement )
				var progression_leg = bold +'[color='+couleur[3]+']Progression : [/color] [color='+couleur[5]+']+ xxx[/color]/[color='+couleur[0]+']- xxx[/color]'+ finbold; // couleur de "Progression", du classement positif/négatif et de points
				var pointsoit_leg = '[color='+couleur[3]+']'+ bold +'points soit'+ finbold +'[/color]' // on garde la même variable pour la couleur des mots "points soit"
				var progprcent_leg = '[color='+couleur[4]+']+[/color]/-[color='+couleur[6]+'] xx% [/color]'; // couleur de la progression, exemple +5.51%
				var classprog_leg = bold +'[color='+couleur[3]+']Classement progression : xx[/color]'+ finbold; // couleur classement progression
				
                if (affichercoordo == true ) var coordo_leg = bold_c + italic+'[color='+couleur[9]+'][x:xxx:xx][/color]'+ finitalic + finbold_c;
				else var coordo_leg = '';
			
			   //AFFICHAGE LEGENDE
		    // si on true la variable afficherlalegende alors on affiche la légende
		    if(afficherlalegende == true ) var affiche_leg = center + spoiler + bold +'Légende :'+ finbold +' \n\n '+ classprog2_leg +' \n\n '+quote+ class_leg + ' '+ sepa_leg +' '+' '+ pseudo_leg + ' '+ coordo_leg+' '+arrow_leg +' '+points_leg +' '+arrow_leg +' '+classement_leg+' '+ arrow_leg +' '+ progression_leg +' '+ pointsoit_leg +' '+ progprcent_leg +' '+ arrow_leg +' '+ classprog_leg + finquote + finspoiler + fincenter+' \n\n\n\n\n\n\n ';
            else var affiche_leg = ''; // sinon on n'affiche rien
			
			if (afficherlalegende == false ) var spoile = false;
		
//************************************************************************************************************/		
//******************************************* Fin des définitions ********************************************/
//************************************************************************************************************/
		
	// Google Chrome
		if(!GM_getValue) 
		{
			function GM_getValue(key,defaultVal) 
			{
				var retValue = localStorage.getItem(key);
				if ( !retValue ) 
				{
					return defaultVal;
				}
				return retValue;
			}

			function GM_setValue(key,value) 
			{
				localStorage.setItem(key, value);
			}
			
		}
	
		function addPoints(nombre)
		{
				var signe = '';
				if (nombre<0)
				{
					nombre = Math.abs(nombre);
					signe = '-';
				}
				nombre=parseInt(nombre);
				var str = nombre.toString(), n = str.length;
				if (n <4) {return signe + nombre;} 
				else 
				{
					return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
				}
			
		}
		
		function plus(nb)
		{
			if(nb<0) return addPoints(nb);
			else return '+'+addPoints(nb);
		}
		
		if(!document.getElementById('section12')) var tag = 'member-list';
		else var tag ='section12' ;
		
		function enregistre()
		{
			for (var i =0 ; i< document.getElementById(tag).getElementsByTagName('tbody')[0].getElementsByTagName('tr').length ; i++)
			{
				infoJoueur = document.getElementById(tag).getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i];
				
				points= infoJoueur.getElementsByTagName('span')[0].title.replace( /[^0-9-]/g, "");
				
				if(tag == 'member-list') points = parseInt(points);
				
				coord = infoJoueur.getElementsByTagName('a')[0].innerHTML;
				classement = infoJoueur.getElementsByTagName('span')[0].innerHTML.replace( /[^0-9-]/g, "");
			
				if (parseInt(classement) > 0) GM_setValue(nomScript+'infoJoueur'+serveur+coord , points+';'+classement); // enregistre	
				
			}
		
			var date = new Date()+ '';
			var dates = date.split(/ /);
			GM_setValue(nomScript+'date'+serveur ,dates[2]+' '+dates[1]);
		}
		function afftypeRank()
		{
			if(rankByPoints)
			{
				if (lang_fr) var typeRank = 'classer par %';
				else if(lang_de) var typeRank = 'klicken um nach % zu sortieren';
				else if(lang_pl) var typeRank = 'Ranking punktowy';
				else var typeRank = 'click to Rank by %';
			}
			else
			{
				if (lang_fr) var typeRank = 'classer par points';
				else if(lang_de)  var typeRank = 'klicken um nach Punkten zu sortieren ';
				else if(lang_pl) var typeRank = 'Ranking procentowy';
				else var typeRank = 'click to Rank by points';
			}
			return typeRank;
		} 
			
		var serveur = location.href.split('/')[2];
		
		var infoJoueur=new Array();
		var pseudo=new Array();
		var coord = new Array();
		var points=new Array();
		var oldRang=new Array();
		var RangClassement = new Array();
		var TopPoint = new Array();
		var TopClass = new Array();
		var newRang = new Array();
		var pointsSauvegarde=new Array();
		var classement =new Array();
		var classementSauvegarde=new Array();
		var rankByPoints = GM_getValue(nomScript+'typeClassement'+serveur, true);

		
		var lang_fr = false;var lang_de = false;var lang_pl = false; 
		if (location.href.indexOf('ogame.fr') >-1) lang_fr = true;
		if (location.href.indexOf('ogame.de') >-1) lang_de = true;
		if (location.href.indexOf('ogame.pl') >-1) lang_pl = true; 
		
		var RaZ = 'RaZ les progressions';
		if(! lang_fr) RaZ = 'Restart progressions';
		if(lang_de) RaZ = 'Fortschritt zurücksetzen';
		if(lang_pl) RaZ ='Restart statystyk'; 
		function affichageDuScript()
		{
			if (! document.getElementById(tag) || document.getElementById(tag).getAttribute("done141111") == "done") return;
			else
			{	
				document.getElementById(tag).setAttribute("done141111","done");
				
				// affichage
				var sp1 = document.createElement("span");
				sp1.setAttribute("id", "allistat");
				var sp1_content = document.createTextNode('');
				sp1.appendChild(sp1_content);		
				
				if(document.getElementsByTagName("table")[3]) var sp2 = document.getElementsByTagName("table")[3];
				else var sp2 = document.getElementById(tag);		
				

				var parentDiv = sp2.parentNode;
				parentDiv.insertBefore(sp1, sp2.nextSibling);
				var tableau = document.createElement("span");
				tableau.innerHTML = '<table style="width:675px; margin:auto;"><span style="text-align:center;">'+
									'<input id="enregistre" value="'+RaZ+'" style="background-color:transparent; cursor:pointer; border: solid black 1px; color:#CCCCCC;" />'+
									'<input id="boutonBBcode" value="BBcode" style="cursor:pointer;background-color:transparent; border: solid black 1px; color:#CCCCCC;" />'+
									'<input href="" id="switch" value="'+afftypeRank()+'" style="cursor:pointer;background-color:transparent; border: solid black 1px; color:#CCCCCC;" type="submit" />'+
									'</span><textarea id="affBBAlliStat" style="display:none;" onClick="javascript:this.select();"></textarea><div id="affAlliStat" ></div></table>';
		 
				if (!AJours) tableau.innerHTML += '<br/><a id="MaJ" href="http://userscripts.org/scripts/source/66064.user.js">Il y a une MaJ du script, cliquez ici</a>';
			
				document.getElementById('allistat').insertBefore(tableau, document.getElementById('allistat').firstChild);
			
			
				// enregistrement si clique sur le bouton 
				document.getElementById("enregistre").addEventListener("click", function(event)
				{
					var restart = 'Réinitialiser les progressions ?';
					
					if(! lang_fr) restart = 'Do you want to restart progressions ?';
					if(lang_de) restart = 'Wollen sie den Fortschritt zurücksetzen?';
					if(lang_pl) restart = 'Czy na pewno mam zresetować statystyki? Wszystkie Wszystkie poprzednie dane zostaną utracone!' ;
					if(confirm(restart)) 
					{
						enregistre();
					}
				
				}, true);
				
				document.getElementById("switch").addEventListener("click", function(event)
				{
					if(rankByPoints) 	rankByPoints = false;
					else 				rankByPoints=true;
					GM_setValue(nomScript+'typeClassement'+serveur, rankByPoints);
				}, true); 
				

				//Export BBcode si clique sur le bouton

				document.getElementById("boutonBBcode").addEventListener("click", function(event) 		
				{
						
					if (lang_fr) 		var bbcode = center +'[size='+sizeset[6]+']'+ bold +'[color='+couleur[4]+']' + underline + ' Progressions depuis le ' +GM_getValue(nomScript+'date'+serveur ,'')+ finunderline + '[/color]' + finbold+'[/size] '+fincenter+' \n\n ' +affiche_leg; 			
					else if (lang_de) 	var bbcode = center +'[size='+sizeset[6]+']'+ bold + underline +'[color='+couleur[10]+'] Fortschritt seit dem ' +GM_getValue(nomScript+'date'+serveur ,'')+ '[/color]' + finunderline + finbold+'[/size] '+fincenter+' \n\n ' +affiche_leg; 
					else if (lang_pl) 	var bbcode = center +'[size='+sizeset[6]+']'+ bold + underline +'[color='+couleur[10]+'] wzrost od ' +GM_getValue(nomScript+'date'+serveur ,'')+ '[/color]' + finunderline + finbold+'[/size] '+fincenter+' \n\n ' +affiche_leg; 
					else 				var bbcode = center +'[size='+sizeset[6]+']'+ bold + underline +'[color='+couleur[10]+'] Progressions since ' +GM_getValue(nomScript+'date'+serveur ,'')+ '[/color]' + finunderline + finbold+'[/size] '+fincenter+' \n\n ' +affiche_leg; 
					
					var infoJoueur = new Array();
				/*	infoJoueur[i][0] = new Array(); // Pseudo
					infoJoueur[i][1] = new Array(); // Points
					infoJoueur[i][2] = new Array(); // Coord
					infoJoueur[i][3] = new Array(); // Classement
					infoJoueur[i][4] = new Array(); // points sauvegardé
					infoJoueur[i][5] = new Array(); // Classement sauvegardé
		*/
					for (var i =0 ; i< document.getElementById(tag).getElementsByTagName('tbody')[0].getElementsByTagName('tr').length ; i++)
					{
						infoJoueur[i] = new Array();
						infoJoueur2 = document.getElementById(tag).getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i];
						infoJoueur[i][0] = infoJoueur2.getElementsByTagName('td')[0].innerHTML.replace(/(^\s*)|(\s*$)/g,'');
						infoJoueur[i][1] = parseInt(infoJoueur2.getElementsByTagName('span')[0].title.replace( /[^0-9-]/g, ""));

						if(tag == 'member-list') infoJoueur[i][1] = parseInt(infoJoueur[i][1]);
					
						
						infoJoueur[i][2] = infoJoueur2.getElementsByTagName('a')[0].innerHTML;
						infoJoueur[i][3] = infoJoueur2.getElementsByTagName('span')[0].innerHTML.replace( /[^0-9-]/g, "");
					
						infoJoueur[i][4] = parseInt(GM_getValue(nomScript+'infoJoueur'+serveur+infoJoueur[i][2] , '0;0').split(';')[0]);
						infoJoueur[i][5] = parseInt(GM_getValue(nomScript+'infoJoueur'+serveur+infoJoueur[i][2] , '0;0').split(';')[1]);

						if (infoJoueur[i][4]==0) 
						{
							infoJoueur[i][4] = infoJoueur[i][1];
							infoJoueur[i][5]=infoJoueur[i][3] ; 
							if (infoJoueur[i][3] > 0) GM_setValue(nomScript+'infoJoueur'+serveur+infoJoueur[i][2] , infoJoueur[i][1]+';'+infoJoueur[i][3]); // enregistre	
						}
						
						infoJoueur[i][6] = infoJoueur[i][1]- infoJoueur[i][4] ;
						infoJoueur[i][7] =infoJoueur[i][5]-infoJoueur[i][3];
						infoJoueur[i][8] = (infoJoueur[i][1]- infoJoueur[i][4])/infoJoueur[i][1] ;
						
					}
					
					
					function sort_Info(a,b) { return b[nbTrie]-a[nbTrie]; }
					if( nbTrie > -1) infoJoueur.sort(sort_Info);

					
					for (var i =0 ; i< infoJoueur.length ; i++)
					{
						newRang[i]=1;oldRang[i]=1;RangClassement[i]=1;
						
						if(rankByPoints)
						{ 
							for (var j =0 ; j< infoJoueur.length ; j++)
							{
								if (infoJoueur[i][1]- infoJoueur[i][4] < infoJoueur[j][1]- infoJoueur[j][4]) newRang[i]++;
								if ((infoJoueur[i][5]- infoJoueur[i][3])/infoJoueur[i][1] < (infoJoueur[j][5]- infoJoueur[j][3])/infoJoueur[j][1]) RangClassement[i]++;
								if (infoJoueur[i][1] < infoJoueur[j][1]) oldRang[i]++;
							}
						}
						else
						{
							for (var j =0 ; j< infoJoueur.length ; j++)
							{
								if ((infoJoueur[i][1]- infoJoueur[i][4])/infoJoueur[i][1] < (infoJoueur[j][1]- infoJoueur[j][4])/infoJoueur[j][1]) newRang[i]++;
							    if ((infoJoueur[i][5]- infoJoueur[i][3])/infoJoueur[i][1] < (infoJoueur[j][5]- infoJoueur[j][3])/infoJoueur[j][1]) RangClassement[i]++;
								if (infoJoueur[i][1] < infoJoueur[j][1]) oldRang[i]++;
							}
						}
						if (newRang[i] == 1) TopPoint[1] = '[size='+sizeset[1]+']' + bold + '[color=#FF0000]' + image1 + '  ->  ' + infoJoueur[i][0] + ' ( ' + plus(infoJoueur[i][6]) + ' points )[/color]' + finbold+ '[/size]  \n\n '; 
						else if (newRang[i] == 2) TopPoint[2] = '[size='+sizeset[2]+']' + bold + '[color=orange]' + image2 + '  ->  ' + infoJoueur[i][0] + ' ( ' + plus(infoJoueur[i][6]) + ' points )[/color]' + finbold+ '[/size]  \n\n '; 
						else if (newRang[i] == 3) TopPoint[3] = '[size='+sizeset[3]+'][color=yellow]' + image3 + '  ->  ' + infoJoueur[i][0] + ' ( ' + plus(infoJoueur[i][6]) + ' points )[/color][/size]  \n\n '; 
						
						if (RangClassement[i] == 1) TopClass[1] = '[size='+sizeset[1]+']' + bold + '[color=#FF0000]' + image1 + '  ->  ' + infoJoueur[i][0] + ' ( ' + plus(infoJoueur[i][7]) + ' places )[/color]' + finbold+ '[/size]  \n\n '; 
						else if (RangClassement[i] == 2) TopClass[2] = '[size='+sizeset[2]+']' + bold + '[color=orange]' + image2 + '  ->  ' + infoJoueur[i][0] + ' ( ' + plus(infoJoueur[i][7]) + ' places )[/color]' + finbold+ '[/size]  \n\n '; 
						else if (RangClassement[i] == 3) TopClass[3] = '[size='+sizeset[3]+'][color=yellow]' + image3 + '  ->  ' + infoJoueur[i][0] + ' ( ' + plus(infoJoueur[i][7]) + ' places )[/color][/size]  \n\n '; 
						
						if(infoJoueur[i][5]-infoJoueur[i][3] > 0) var couleur0 = couleur[5];
						else if(infoJoueur[i][5]-infoJoueur[i][3] < 0) var couleur0 = couleur[6];
						else var couleur0 = 'yellow';
						
						if(infoJoueur[i][1]- infoJoueur[i][4] > 0) var couleur2 = couleur[5];
						else if(infoJoueur[i][1]- infoJoueur[i][4] < 0) var couleur2 = couleur[6];
						else var couleur2 = 'yellow';
						
						// SIMPLIFICATIONS DE MODIFICATION DE STYLE PAR MARTINELI
						// TOUTES LES MODIFICATIONS SONT A FAIRE DANS OPTIONS ET NULLE PART AILLEURS
						// Ajout de variables utiles
									
						var ieme = new Array( '', '');
						if (lang_fr) ieme = new Array( 'er', 'éme');
						if (lang_de) ieme = new Array( 'er', 'er');
						// variables conditionnelles BB code
							 
							 // classement progression
						if (newRang[i]== 1) var posrank = center + image1 + fincenter +'\n'; // si le joueur est premier = smiley 1er
						else if (newRang[i]== 2) var posrank = center + image2 + fincenter +'\n'; // si le joueur est deuxième = smiley 2ème
						else if (newRang[i]== 3) var posrank = center + image3 + fincenter +'\n'; // si le joueur est troisième = smiley 3ème ... etc
						else var posrank = center + '[size='+sizeset[0]+'][color='+couleur[7]+']'+ newRang[i]+ieme[1]+'[/color][/size]'+ fincenter +'\n'; // sinon on affiche le classement
						
							 // classement par points
						var ranking = '[color='+couleur[0]+']' + oldRang[i] + '[/color]'; // si le joueur est 1er on affiche "1er" en gros, gras et vert
						

						if ( infoJoueur[i][1]- infoJoueur[i][4] < 0) var progneg = center + image4 +fincenter+'\n\n'; // si la progression est négative on affiche un smiley moqueur :P
						else var progneg = ''; // sinon on n'affiche rien ( normal :p )
						
						
						// couleurs du BB code
						// NE RIEN MODIFIER
						
						var pseudo2 = '[b][color='+couleur[0]+'] - '+ infoJoueur[i][0] +'[/color][/b]'; // couleur du pseudo
						var points2 = ' [color='+couleur[3]+'] points : [b][color='+couleur[4]+']'+ addPoints(infoJoueur[i][1]) +'[/color][/b];  place : [color='+couleur[4]+'][b]'+ infoJoueur[i][3] +'e[/b][/color][/color]'; // classement et point
						var arrow = ' [color='+couleur[1]+']'+bold+' -> '+finbold+'[/color] '; // couleur des flèches ->
						var progression2 = ' [color='+couleur[10]+'] ( [color='+couleur2+']'+ bold + plus(infoJoueur[i][1]- infoJoueur[i][4]) + finbold + '[/color] points; [color='+couleur0+']'+ bold + plus(infoJoueur[i][5]-infoJoueur[i][3]) + finbold +'[/color] places; soit [color='+couleur2+']'+ bold + plus(parseInt((infoJoueur[i][1]-infoJoueur[i][4])/infoJoueur[i][1]*10000)/100) +'%[/color]' + finbold + ' )[/color]'; // couleur du mot Progression


						if (lang_fr)
						{
							
							var classement2 = bold+'[color='+couleur[3]+']Classement : [/color]'+finbold; // couleur du mot Classement
							var pointsoit = '[color='+couleur[3]+']'+bold+'points soit '+finbold+'[/color]'; // couleur des mots "points soit"
							var classprog = bold+'[color='+couleur[3]+']Classement progression : [/color]'+ newRang[i]+''+finbold+''; // couleur de la progression
						}
						else if (lang_de)
						{
							var classement2 = bold+'[color='+couleur[3]+']Platz: [/color]'+finbold; // couleur du mot Classement
							var pointsoit = '[color='+couleur[3]+']'+bold+'Punkte mit '+finbold+'[/color]'; // couleur des mots "points soit"
							var classprog = bold+'[color='+couleur[3]+']Fortschritt: [/color]'+ newRang[i]+''+finbold+''; // couleur de la progression
							progression2 = bold+'[color='+couleur[3]+']Fortschritt: [/color]'+finbold; // couleur du mot Progression
						}
						else if (lang_pl)
						{
						var classement2 = bold+'[color='+couleur[3]+']Miejsce: [/color]'+finbold; // couleur du mot Classement
						var pointsoit = '[color='+couleur[3]+']'+bold+'punktów '+finbold+'[/color]'; // couleur des mots "points soit"
						var classprog = bold+'[color='+couleur[3]+']Wzrost/spadek: [/color]'+ newRang[i]+''+finbold+''; // couleur de la progression
						progression2 = bold+'[color='+couleur[3]+']Wzrost/spadek: [/color]'+finbold; // couleur du mot Progression
						} 
						else
						{
							var classement2 = bold+'[color='+couleur[3]+']Rank : [/color]'+finbold; // couleur du mot Classement
							var pointsoit = '[color='+couleur[3]+']'+bold+'points with '+finbold+'[/color]'; // couleur des mots "points soit"
							var classprog = bold+'[color='+couleur[3]+']Progression rank: [/color]'+ newRang[i]+''+finbold+''; // couleur de la progression
						}
						// coordonnées des options 
							   if (affichercoordo == true ) var coordo = bold_c + italic +'[color='+couleur[9]+']'+ infoJoueur[i][2] +'[/color]' + finitalic + finbold_c;
							   else var coordo = '';
						
							 // on définit maintenant le changement de couleur si la variable "progprcent" est négative
							 // vous pouvez modifier la couleur dans [color=xxx]
								   // comme expliquez si la progression est négative on modifie également la couleur du -x.xx%
										 // dans le if la couleur est le rose si la progression est positive
										 // dans le else if elle est rouge si la progression est négative
										 // sinon bah comme dit plus bas on n'affiche aucune couleur ( pour en afficher rempalcez none par une couleur
							 if ( plus(parseInt((infoJoueur[i][1]-infoJoueur[i][4])/infoJoueur[i][1]*10000)/100) > 0 ) var progprcent = '[color='+couleur[4]+']'+ plus(parseInt((infoJoueur[i][1]-infoJoueur[i][4])/infoJoueur[i][1]*10000)/100) +'%[/color]'; // si c'est négatif, la couleur est rouge
							 else if ( plus(parseInt((infoJoueur[i][1]-infoJoueur[i][4])/infoJoueur[i][1]*10000)/100) < 0 ) var progprcent = '[color='+couleur[1]+'][size='+sizeset[4]+']'+ plus(parseInt((infoJoueur[i][1]-infoJoueur[i][4])/infoJoueur[i][1]*10000)/100) +'%[/size][/color]'; // si c'est négatif, la couleur est rouge
							 else var progprcent = '[color=none]'+ plus(parseInt((infoJoueur[i][1]-infoJoueur[i][4])/infoJoueur[i][1]*10000)/100) +'%[/color] '// sinon on n'affiche aucune couleur
							 
								
						//affichage progression 
						// voilà ce qu'affichera la fenêtre BB code 
						// on utilise nos variables définies plus haut, ne touchez donc en aucun cas aux lignes ci-dessous, contentez-vous de modifier la couleur des variables :)
						
						if (infoJoueur[i][3] > 0 )
						{
							if(AfficheAudebut)
									bbcode += posrank + quote + pseudo2 + progression2 + arrow + points2 + finquote +'\n [hr]' ;
							else 	bbcode += ranking + quote + pseudo2 + progression2 + arrow + points2 + finquote +' \n [hr]' ;
						}
						else bbcode += quote + center +pseudo2+' '+ coordo + arrow + ' [color=red]Joueur bloqué[/color] '+ fincenter + finquote +'\n \n' ;

					}//alert(bbcode);			
					bbcode += '\n\n[size='+sizeset[6]+']' + bold + '[color='+couleur[4]+'][u]Top 3 evolution en points :[/u][/color]' + finbold+ '[/size]  \n\n ' + TopPoint[1] + TopPoint[2] + TopPoint[3] + '\n\n\n';
		  			bbcode += '[size='+sizeset[6]+']' + bold + '[color='+couleur[4]+'][u]Top 3 evolution au classement :[/u][/color]' + finbold+ '[/size]  \n\n ' + TopClass[1] + TopClass[2] + TopClass[3];
		
					
					document.getElementById("affBBAlliStat").innerHTML = bbcode;
					document.getElementById("affBBAlliStat").style.display = "block";
					// document.getElementById("affAlliStat").innerHTML = bbcode.replace(/\n/g, '<br/>').replace(/\[b\]/g, '<strong>').replace(/\[\/b\]/g, '</strong>').replace(/\[\/color\]/g, '</span>').replace(/\[color=/g, '<span style="color:"').replace(/green\]/, '00FF00;">');
				}, true);


			if (!AJours)
			{
				/* ******************************A Jours apres clique ********************************/
				document.getElementById("MaJ").addEventListener("click", function(event) 
				{
					GM_setValue(nomScript+"aJours",true);
					GM_setValue(nomScript+"dateMaJ",Date.parse(new Date()) / 1000);
				}, true);
			}
			
			
			}
		}
		
		if(tag == 'member-list') setInterval(affichageDuScript,500);
		else affichageDuScript();
		
		function enregistreApresChargement()
		{
			var table = document.getElementById(tag);
			if(!table || table.getAttribute("done141111") == "done") return
			table.setAttribute("done141111","done");
			
			enregistre();
		}
		
		if (GM_getValue(nomScript+'date'+serveur ,'') =='')
		{
			setInterval(enregistreApresChargement,500);
		}
		
	function trim(string)
			{return string.replace(/(^\s*)|(\s*$)/g,'');} 
	// recherche des MaJ
		
		if(FireFox) 
			{	
				/* ******************************Recherche des MaJ ********************************/
				if (parseInt(GM_getValue(nomScript+"dateMaJ",0))+23*3600< Date.parse(new Date()) / 1000 ) 
				{
					GM_xmlhttpRequest(
					{
						method: 'GET',
						url: 'http://userscripts.org/scripts/show/660',
						
						onload: function(response) 
						{
							var PageUserScript = response.responseText;
							
							var Derniere_Version = trim(PageUserScript.substring(PageUserScript.indexOf('<b>Version:</b>')+15, PageUserScript.indexOf('<br />', PageUserScript.indexOf('<b>Version:</b>'))));
							
							Version=Version+'';
							
							if (Derniere_Version.length < 10 && Derniere_Version.length > 3 ) 
							{
								if (Derniere_Version != Version ) 
								{						
									GM_setValue(nomScript+"aJours",false);
									GM_setValue(nomScript+"dateMaJ",Date.parse(new Date()) / 1000);
								}
								else 
								{			
									GM_setValue(nomScript+"aJours",true);
									GM_setValue(nomScript+"dateMaJ",Date.parse(new Date()) / 1000);
								}
							}
						}
					});
					
					
				}
			}
	}
	






