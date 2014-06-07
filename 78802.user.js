// ==UserScript==
// @name           alliStat-Redesign
// @namespace      vulca
// @version        1.9a
// @author         xSERGE
// @description    Calcul de progression des membres de l'alliance
// @include       http://*.ogame.*/game/index.php?page=network&*
// @include       http://*.ogame.*/game/index.php?page=alliance*
// ==/UserScript==

	if (document.getElementById('playerName')) // Si c'est un univers Redesign
	{

		var Version = '1.9a'
		var AJours = GM_getValue(nomScript+"aJours",true);
		var couleur = new Array();
		var sizeset = new Array();
		if (navigator.userAgent.indexOf('Firefox')>-1)  {var FireFox = true; var nomScript='';}
		else 											{var FireFox = false;var nomScript='alliStat-Redesign';}



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
									couleur[1]='purple';		// Couleur des fleches
									couleur[2]='#5050FF';		// Couleur des points
									couleur[3]='brown';			// Couleur des mots
									couleur[4]='#FE01B2';		// Couleur pourcentage
									couleur[5]='green';			// Couleur des progressions positives
									couleur[6]='red';			// Couleur des progressions nï¿½gative
									couleur[7]='red';           // Couleur du classement ( au-dessus des quote ou non selon la var ci-dessous )
									couleur[8]='green';         // Couleur du classement par points ( celui des membres in game )
									couleur[9]='#AA0000';       // Couleur des coordonnées
									couleur[10]='none';         // Couleur du "progression depuis"

									// pour les size
									// none pour aucune size particulière
									// ne modifier que les chiffres, ne pas toucher aux sizeset[i]

									    sizeset[0] = 16; // taille à afficher pour le classement par progression ( au-dessus du quote ou non selon la var )
										sizeset[1] = 22; // taille à afficher pour le premier au classement par points
										sizeset[2] = 20; // taille à afficher pour le deuxième au classement par points
										sizeset[3] = 18; // taille à afficher pour le troisième au classement par points
										sizeset[4] = 14; // taille à afficher pour la progression négative ( histoire lui mettre la honte xD ) => mettre none si aucune taille désirée
										sizeset[5] = 16; // taille à afficher pour la position dans le classement par points
										sizeset[6] = 18; // taille du "Progression depuis"

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

									var affichercoordo = false; // affiche les coordonnées de la PM ( true ou false )
									var italique = false; // mettre les coordonnées en italic ( true ou false )
									var gras_coord = true; // mettre les coordonnées en gras ou non ( true ou false )


									// pour les images
									var AfficheAudebut = false; // L'affichage des smiley, debut ou fin
									var image1 = '[IMG]http://membres.lycos.fr/piratland/original/smiley182.gif[/IMG]'; // image du premier au classement progression
									var image2 = '[IMG]http://membres.lycos.fr/piratland/original/smiley183.gif[/IMG]'; // image du deuxième au classement progression
									var image3 = '[IMG]http://membres.lycos.fr/piratland/original/smiley181.gif[/IMG]'; // image du troisième au classement progression
									var image4 = '<img src = "http://membres.lycos.fr/piratland/original/smiley168.gif"></img>'; // image moqueuse pour les progressions négatives

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
			if (nombre<1000) {return nombre;}
			else
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
		}

		function plus(nb)
		{
			if(nb<0) return addPoints(nb);
			else return '+'+addPoints(nb);
		}

		function getElementsByClass( searchClass, domNode, tagName) {
			if (domNode == null) domNode = document;
			if (tagName == null) tagName = '*';
			var el = new Array();
			var tags = domNode.getElementsByTagName(tagName);
			var tcl = " "+searchClass+" ";
			for(i=0,j=0; i<tags.length; i++) {
				var test = " " + tags[i].className + " ";
				if (test.indexOf(tcl) != -1)
					el[j++] = tags[i];
			}
			return el;
		}

		if(!document.getElementById('section12')) var tag = 'member-list';
		else var tag ='section12' ;

		function enregistre()
		{
			document.getElementById('allyMemberlist').innerHTML = allyinfo;

			for (var i =0 ; i< document.getElementById(tag).getElementsByTagName('tbody')[0].getElementsByTagName('tr').length ; i++)
			{
				infoJoueur = document.getElementById(tag).getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i];

				points= infoJoueur.getElementsByTagName('span')[0].title.replace( /[^0-9-]/g, "");

				if(tag == 'member-list') points = parseInt(parseInt(points)/1000);

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
				typeRank = 'щелкните для назначения места по %';
			}
			else
			{
				typeRank = 'щелкните для назначения места по очкам';
			}
			return typeRank;
		}

		var serveur = location.href.split('/')[2];

		var infoJoueur=new Array();
		var pseudo=new Array();
		var coord = new Array();
		var points=new Array();
		var oldRang=new Array();
		var newRang = new Array();
		var pointsSauvegarde=new Array();
		var classement =new Array();
		var classementSauvegarde=new Array();
		var rankByPoints = GM_getValue(nomScript+'typeClassement'+serveur, true);
		var ShowStats = GM_getValue(nomScript+'ShowStats'+serveur, false);
		var allyInfo;

		var lang_fr = false;var lang_de = false;
		if (location.href.indexOf('ogame.fr') >-1) lang_fr = true;
		if (location.href.indexOf('ogame.de') >-1) lang_de = true;

		var RaZ = 'Сбросить прогресс';
		var myinfo;

		function arrondi(nombre)
		{
			if (Math.round(nombre) == 0) return 1 ;
			else return Math.round(nombre);
		}

		function UpdateMyTable()
		{



		var mytable;
		if (ShowStats)
		{
		mytable	= '<div align="center"><table><tr><td><input id="ShowStatistics" value="Скрыть статистику и показать список членов" style="background-color:transparent; cursor:pointer; border: solid black 1px; color:#CCCCCC; width:300px;" /></td></tr></table><table><tr><td><input id="enregistre" value="'+RaZ+'" style="background-color:transparent; cursor:pointer; border: solid black 1px; color:#CCCCCC;" /></td>'+'<td><input href="" id="switch" value="'+afftypeRank()+'" style="cursor:pointer;background-color:transparent; border: solid black 1px; color:#CCCCCC;" type="submit" /></td>'+'<td> Последнее обновление: ' +GM_getValue(nomScript+'date'+serveur ,'')+ '</td></tr></table><table id="members_progression" BORDER=20 CELLPADDING=100 style="td {textalign:center;}"> <thead><th>Позиция</th><th>Ник</th><th>Очки</th><th colspan=2>Место</th><th colspan=2>Прогресс</th><th>Место</th></thead>';

					var infoJoueur = new Array();
				/*	infoJoueur[i][0] = new Array(); // Pseudo
					infoJoueur[i][1] = new Array(); // Points
					infoJoueur[i][2] = new Array(); // Coord
					infoJoueur[i][3] = new Array(); // Classement
					infoJoueur[i][4] = new Array(); // points sauvegardé
					infoJoueur[i][5] = new Array(); // Classement sauvegardé
		*/
					var allyplus = 0;
					for (var i =0 ; i< document.getElementById(tag).getElementsByTagName('tbody')[0].getElementsByTagName('tr').length ; i++)
					{
						infoJoueur[i] = new Array();
						infoJoueur2 = document.getElementById(tag).getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i];
						infoJoueur[i][0] = infoJoueur2.getElementsByTagName('td')[0].innerHTML.replace(/(^\s*)|(\s*$)/g,'');
						infoJoueur[i][1] = parseInt(infoJoueur2.getElementsByTagName('span')[0].title.replace( /[^0-9-]/g, ""));
						if(tag == 'member-list') infoJoueur[i][1] = parseInt(infoJoueur[i][1]/1000);
						infoJoueur[i][2] = infoJoueur2.getElementsByTagName('a')[0].innerHTML;
						infoJoueur[i][3] = infoJoueur2.getElementsByTagName('span')[0].innerHTML.replace( /[^0-9-]/g, "");

						var temp = '';
						temp = GM_getValue(nomScript+'infoJoueur'+serveur+infoJoueur[i][2],"0;0");
						infoJoueur[i][4] = parseInt(temp.split(';')[0]);
						infoJoueur[i][5] = parseInt(temp.split(';')[1]);
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
						newRang[i]=1;oldRang[i]=1;
						if(rankByPoints)
						{
							for (var j =0 ; j< infoJoueur.length-1 ; j++)
							{
								if (infoJoueur[i][1]- infoJoueur[i][4] < infoJoueur[j][1]- infoJoueur[j][4]) newRang[i]++;
								if (infoJoueur[i][1] < infoJoueur[j][1]) oldRang[i]++;
							}
						}
						else
						{
							for (var j =0 ; j< infoJoueur.length-1 ; j++)
							{
								if ((infoJoueur[i][1]- infoJoueur[i][4])/infoJoueur[i][1] < (infoJoueur[j][1]- infoJoueur[j][4])/infoJoueur[j][1]) newRang[i]++;
								if (infoJoueur[i][1] < infoJoueur[j][1]) oldRang[i]++;
							}
						}


						if(infoJoueur[i][5]-infoJoueur[i][3] > 0) var couleur0 = 'green';
						else if(infoJoueur[i][5]-infoJoueur[i][3] < 0) var couleur0 = 'red';
						else var couleur0 = 'none';

						if(infoJoueur[i][1]- infoJoueur[i][4] > 0) var couleur2 = 'green';
						else if(infoJoueur[i][1]- infoJoueur[i][4] < 0) var couleur2 = 'red';
						else var couleur2 = 'none';

						var ieme = new Array( '', '');
						if (lang_fr) ieme = new Array( 'er', 'éme');
						if (lang_de) ieme = new Array( 'er', 'er');

						if (newRang[i]== 1) var posrank = center + image1 + fincenter +'\n'; // si le joueur est premier = smiley 1er
						else if (newRang[i]== 2) var posrank = center + image2 + fincenter +'\n'; // si le joueur est deuxième = smiley 2ème
						else if (newRang[i]== 3) var posrank = center + image3 + fincenter +'\n'; // si le joueur est troisième = smiley 3ème ... etc
						else var posrank = center + '[size='+sizeset[0]+'][color='+couleur[7]+']'+ newRang[i]+ieme[1]+'[/color][/size]'+ fincenter +'\n'; // sinon on affiche le classement
						if (oldRang[i]== 1) var ranking = '[color='+couleur[8]+']'+ bold +'[size='+sizeset[1]+']'+ oldRang[i] +ieme[0]+'[/size]'+finbold+'[/color]'; // si le joueur est 1er on affiche "1er" en gros, gras et vert
						else if (oldRang[i]== 2) var ranking = '[color='+couleur[8]+']'+bold+'[size='+sizeset[2]+']'+ oldRang[i] +ieme[1]+'[/size]'+finbold+'[/color]'; // s'il est deuxième, on l'affiche juste en moins gros
						else if (oldRang[i]== 3) var ranking = '[color='+couleur[8]+']'+bold+'[size='+sizeset[3]+']'+ oldRang[i] +ieme[1]+'[/size]'+finbold+'[/color]'; // s'il est troisième, idem
						else var ranking = '[color='+couleur[8]+']'+bold+'[size='+sizeset[5]+']'+ oldRang[i] +ieme[1]+'[/size]'+finbold+'[/color]'; // sinon on l'affiche en taille 16

						if ( infoJoueur[i][1]- infoJoueur[i][4] < 0) var progneg = center + image4+fincenter+'\n\n'; // si la progression est négative on affiche un smiley moqueur :P
						else var progneg = ''; // sinon on n'affiche rien ( normal :p )

						var pseudo2 = bold+'[color='+couleur[0]+']'+ infoJoueur[i][0] +'[/color]'+ finbold; // couleur du pseudo
						var points2 = bold+ '[color='+couleur[2]+']'+ addPoints(infoJoueur[i][1]) +' [/color]'+ finbold;
						var progression2 = bold+'[color='+couleur[3]+']Прогресс: [/color]'+finbold; // couleur du mot Progression
						var classement2 = bold+'[color='+couleur[3]+']Место: [/color]'+finbold; // couleur du mot Classement
						var pointsoit = '[color='+couleur[3]+']'+bold+'pts with '+finbold+'[/color]'; // couleur des mots "points soit"
						var classprog = bold+'[color='+couleur[3]+']Progression rank: [/color]'+ newRang[i]+''+finbold+'';

						if ( plus(parseInt((infoJoueur[i][1]-infoJoueur[i][4])/infoJoueur[i][1]*10000)/100) > 0 ) var progprcent = '[color='+couleur[4]+']'+ plus(parseInt((infoJoueur[i][1]-infoJoueur[i][4])/infoJoueur[i][1]*10000)/100) +'%[/color]';
						else if ( plus(parseInt((infoJoueur[i][1]-infoJoueur[i][4])/infoJoueur[i][1]*10000)/100) < 0 ) var progprcent = '[color='+couleur[1]+'][size='+sizeset[4]+']'+ plus(parseInt((infoJoueur[i][1]-infoJoueur[i][4])/infoJoueur[i][1]*10000)/100) +'%[/size][/color]';
						else var progprcent = '[color=none]'+ plus(parseInt((infoJoueur[i][1]-infoJoueur[i][4])/infoJoueur[i][1]*10000)/100) +'%[/color] '

						if (infoJoueur[i][3] > 0 )
						{
							if(AfficheAudebut)
									mytable += '<tr align="center"><td>'+ posrank + '\n' + progneg +'</td><td>  ' + ranking +'</td><td>  '+ pseudo2+'</td><td>  ' + points2 +'</td><td>  ' + '[color='+couleur0+']'+infoJoueur[i][3]+'</td><td>  '+'	 ( 	'+plus(infoJoueur[i][5]-infoJoueur[i][3])+'	 )[/color] ' +'</td><td>  ' + ' [color='+couleur2+']	 '+'</td><td>  '+ plus(infoJoueur[i][1]- infoJoueur[i][4])+'</td><td>  '+ progprcent +'</td><td align=left>' + classprog + '</td></tr>';
							else 	mytable += '<tr align="center" height=10><td>'+ ranking +'</td><td>  '+ pseudo2+'</td><td>  '+ points2 +'</td><td>  ' + '[color='+couleur0+']'+infoJoueur[i][3]+'</td><td>  '+'	 ( 	'+plus(infoJoueur[i][5]-infoJoueur[i][3])+'	 )[/color] ' +'</td><td>  ' + ' [color='+couleur2+']	 '+ plus(infoJoueur[i][1]- infoJoueur[i][4])+'	[/color]'+'</td><td>  ' + progprcent +'</td><td align=left>  ' + (posrank+progneg).replace(center,'').replace(fincenter,'').replace(center,'').replace(fincenter,'').replace('\n',' ') + '</td></tr>';
						var tmpallyplus = infoJoueur[i][1]- infoJoueur[i][4];
						if (!isNaN(tmpallyplus)){
							allyplus+= tmpallyplus;
						}
						}
						else mytable += '<tr  align="center" height=10><td>'+ pseudo2+'</td><td>  ' + ' [color=red]Ошибка скрипта[/color] '+ '</td></tr>' ;

						//mytable += '<tr><td>'+posrank+'</td><td>  '+pseudo2+'  </td><td>'+points2+'  </td><td>'+' [color='+couleur2+']	 '+ plus(infoJoueur[i][1]- infoJoueur[i][4])+'  </td><td>'+classement2+'  </td><td>'+'[color='+couleur0+']'+infoJoueur[i][3]+'('+plus(infoJoueur[i][5]-infoJoueur[i][3])+' )[/color]'+'  </td><td>'+'[/color]'+'</td><td>'+pointsoit+'  </td><td>' + progprcent +'</td></tr>';

					}
					mytable+='</table>';

			var newdate = new Date()+'';
			newdate = newdate.split(/ /)[3];
			var savedate = GM_getValue(nomScript+'date'+serveur ,'')+' '+newdate;
			var mydate = new Date(savedate);
			newdate = arrondi((Date.parse(new Date())-Date.parse(mydate))/(1000*3600*24));

			if ((newdate == 0) || (isNaN(newdate))) {
				newdate = 1;
			}
			srprogress = addPoints(allyplus/newdate);
			progress = addPoints(allyplus);

			mytable+='<table><tr><td>Средний прогресс альянса:</td><td> &nbsp&nbsp '+srprogress+' &nbsp&nbsp </td><td> очков в сутки</td></tr><tr><td>Общий прогресс альянса:</td><td> &nbsp&nbsp '+progress+' &nbsp&nbsp </td><td>очков за '+newdate+' дней</td></tr></table></div>';

			document.getElementById('allyMemberlist').innerHTML = '';
			document.getElementById('allyMemberlist').insertBefore(myinfo,document.getElementById('allyMemberlist').firstChild);
		}
		else
		{
			mytable = '<div align="center"><table><tr><td><input id="ShowStatistics" value="Скрыть список членов и показать статистику" style="background-color:transparent; cursor:pointer; border: solid black 1px; color:#CCCCCC; width:300px;"/></td></tr></table></div>';
			document.getElementById('allyMemberlist').innerHTML = allyinfo;
			document.getElementById('allyMemberlist').insertBefore(myinfo,document.getElementById('allyMemberlist').firstChild);
		}
				myinfo.innerHTML = mytable.replace(/\n/g, '<br/>').replace(/\[b\]/g, '<strong>').replace(/\[\/b\]/g, '</strong>').replace(/\[u\]/g,'<u>').replace(/\[\/u\]/g,'</u>').replace(/\[\/color\]/g, '</span>').replace(/\[color=([0-9#a-zA0-Z]+)\]/g,'<span style ="color:$1;">').replace(/\[\/center\]/g, '</span>').replace(/\[center\]/g, '<span style="text-align: center;">').replace(/\[size=([0-9]+)\]/g, '<span style="font-size:$1px;">').replace(/\[\/size\]/g, '</span>').replace(/\[IMG\]/g,'<img src="').replace(/\[\/IMG\]/g,'"<\img>');

				if (document.getElementById("switch"))
				document.getElementById("switch").addEventListener("click", function(event)
				{
					if(rankByPoints) 	rankByPoints = false;
					else 				rankByPoints=true;
					GM_setValue(nomScript+'typeClassement'+serveur, rankByPoints);
					UpdateMyTable();
				}, true);

				if (document.getElementById("enregistre"))
				document.getElementById("enregistre").addEventListener("click", function(event)
				{
					var restart = 'Вы уверены, что хотите сбросить данные о прогрессе?';

					if(confirm(restart))
					{
						enregistre();
						UpdateMyTable();
					}

				}, true);

				document.getElementById("ShowStatistics").addEventListener("click", function(event)
				{
					if(ShowStats) 	ShowStats = false;
					else 			ShowStats=true;
					GM_setValue(nomScript+'ShowStats'+serveur, ShowStats);
					UpdateMyTable();
				}, true);
		}

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




				myinfo = document.createElement("span");
				allyinfo = document.getElementById('allyMemberlist').innerHTML;


				UpdateMyTable();

				// enregistrement si clique sur le bouton

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
	}







