// ==UserScript==
// @name           myProgression
// @namespace      unknown
// @include        http://*.ogame.*/game/index.php?page=overview&session=*
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

var version = '1.3.18' ; // Version du script

var serveur = location.href.split('/')[2]; // recuperation du nom du serveur
var pseudo = document.getElementById('playerName').getElementsByClassName('textBeefy')[0].innerHTML; // récupération du pseudo
var country = location.href.split('ogame.')[1].split('/')[0];

if (navigator.userAgent.indexOf('Firefox')>-1)  // Identification du navigateur
{
	var FireFox = true; 
	var nomScript='';
}
else 											
{
	var FireFox = false;
	var nomScript='myProg';
}
//********
//__________________________
var URL='http://userscripts.org/scripts/show/84119';
var Instal ='http://userscripts.org/scripts/source/84119.user.js';
//__________________________

//------------------------
// Définition des fonctions GM_getValue et GM_setValue pour Google Chrome
//------------------------


	// Google Chrome & Opéra
	if(!FireFox) 
	{
		function GM_getValue(key,defaultVal) // déclaration des fonctions : 
		{
			var retValue = localStorage.getItem(key+nomScript);
			if ( !retValue ) 
			{
				return defaultVal;
			}
			return retValue;
		}

		function GM_setValue(key,value) 
		{
			localStorage.setItem(key+nomScript, value);
		}
	}
//*******

//*********** MISE A JOUR **************//
if ( (location.href.split('&')[location.href.split('&').length-1]) == 'Progression') // si dans la partie 'Progression'
{
		var MaJ = document.createElement("div"); // création d'un élément HTML <div></div>
		MaJ.setAttribute("align","center");
		MaJ.setAttribute("style","font-weight:bold;"); // Affectation des attributs : Gras
		document.getElementById('contentWrapper').insertBefore(MaJ, document.getElementById('inhalt')); // On l'affiche entre la page galaxie et le pied de page.
		checkUpDate();
}	
		
function insertAfter(elem, after) // @copyright Terminator By Lame Noire
{
	var dad = after.parentNode;
	if(dad.lastchild == after)
		dad.appendChild(elem);
	else 
		dad.insertBefore(elem, after.nextSibling);
}		
function getPMCoords() // recupere les coordonées de la PM grace à la taille des planètes, si le diamétre est de 12.800, c'est la PM
{                      // les cas où une autre planète serait de même diamétre sont très rares, ainsi on demande confirmation à chaque changement de pseudo
	var coordPM='';
	var i=0;
	while (coordPM != '12.800') // On recherche la planète de Diamétre 12.800
	{
		coordPM = document.getElementsByClassName('smallplanet')[i].innerHTML ;
		coordPM = coordPM.split('km')[0].split('&gt;')[3];
		i++;
	}
	coordPM=document.getElementsByClassName('planet-koords')[i-1].innerHTML ;
	if (country == 'fr')
	{
		var res =confirm('Les coordonnées de votre Planéte mère sont bien : '+ coordPM + ' ?'); // on vérifies que ce sont les bonnes
	}
	else
	{
		var res =confirm('Is that your mother planet coordinates are : '+ coordPM + ' ?'); // on vérifies que ce sont les bonnes
	}
	if (!res)
	{
		if (country == 'fr')
		{
			coordPM = prompt('Quelles sont les coordonnées de votre Planéte mère ?',coordPM);
		}
		else
		{
			coordPM = prompt('What are your mother planet coordinates ?',coordPM);
		}
	}
	if (country == 'fr')
	{
		alert('Les coordononées sauvegardées de votre planète mére seront : ' + coordPM);
	}
	else
	{
		alert('The saved coordinates of your mother planet will be : ' + coordPM);
	}
	
	
	GM_setValue('coord'+serveur+pseudo , coordPM);
}

function getPoints_And_Rank() // @copyright InfoCompte3 By Vulca 
{	
	var tdnode = document.getElementsByTagName('script');
	


		var sentence1 = "page=highscore";
		var sentence2 = "(";
		var sentence3 = ")";
		var nbJoueur='';
		
		
		for (var i=0 ; i<tdnode.length ; i++)
		{
			var pos1 = (tdnode[i].innerHTML).indexOf(sentence1);
			var pos3 = (tdnode[i].innerHTML).indexOf(sentence2);

			if (pos1>=0)
			{
				var pos2 = (tdnode[i].innerHTML).indexOf(sentence2,pos1+sentence1.length);
				var pos4 = (tdnode[i].innerHTML).indexOf(sentence3 , pos2);
				var points = (tdnode[i].innerHTML).substring(pos1+sentence1.length,pos2);
				var rank = ((tdnode[i].innerHTML).substring(pos2,pos4));
				rank = rank.split('sur')[0].split('Place')[1];
				points = points.split('>')[1];
				//points=parseInt(points.replace( /[^0-9-]/g, ""));
				
				var prog = new Array();
				prog.day =
				{
					points : points,
					rank : rank,
					player : pseudo,
				}
				
				return prog.day;
				
			}
		}
}
function getDaTe() // Récupère et formate la date du jour de la forme xx-xx-xxxx (pas de 0X mais X )
{
	date =new Date(); // recup date actuelle
	date = date.getDate() +'-'+ (date.getMonth()+1) +'-'+ date.getFullYear(); // date formatée
	
	return date;
}

//*******************************

function saveProg()
{
	var prog = getPoints_And_Rank(); // recup point et classement
	var coordPM = GM_getValue('coord'+serveur+pseudo, -1) ; // recup coord de la PM
	var date= new Date(); 
	if (country == 'fr')
	{
		date = date.getDate() +' - '+ (date.getMonth()+1) +' - '+ date.getFullYear() + ' à ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(); // date actuelle formatée avec l'heure
	}
	else
	{
		date = date.getDate() +' - '+ (date.getMonth()+1) +' - '+ date.getFullYear() + ' at ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(); // date actuelle formatée avec l'heure
	}
		GM_setValue('progPoints'+getDaTe()+serveur+coordPM , prog.points); // sauvegarde points du jour
		GM_setValue('progRank'+getDaTe()+serveur+coordPM , prog.rank); // sauvegarde classement du jour
		GM_setValue('progPseudo'+getDaTe()+serveur+coordPM , prog.player); // sauvegarde pseudo du jour
		if ( GM_getValue('progDateEnr'+serveur+coordPM , 0) == 0 ) // si la date d'installation n'a pas encore été définie, on la sauvegarde
		{
		GM_setValue('progDateEnr'+serveur+coordPM , date); // sauvegarde ... 
		}
	
}

//**********************

function addButton() // @Copyright Terminator By Lame Noire
{
	var buttonPosition = document.getElementById("links");
	if(!buttonPosition) 
	{
		return;
	}
	
	//buttonPosition = document.getElementById("links").getElementsByTagName("ul")[0].getElementsByTagName("li")[1];    
	// <span class"menu_icon"><img src="http://img808.imageshack.us/img808/23/improgressioncopie.png" /></span>
	
	// URL Image : http://img808.imageshack.us/img808/23/improgressioncopie.png
	var button = document.createElement("li");
	button.innerHTML = '<span class="menu_icon" id="myProgButton"><img src="http://img808.imageshack.us/img808/23/improgressioncopie.png" ></span/><a target="_self" accesskey="" href="' + location.href + "&Progression" + '" class="menubutton "><span class="textlabel">Progression</span></a>';
	buttonPosition = document.getElementById("links").getElementsByTagName("ul")[0].getElementsByTagName("li")[10];
	insertAfter(button, buttonPosition);
}
//*****
function parseNB(value) // converti un nombre de la forme xxx.xxx.xxx en xxxxxxxxx
{
	var result = 0;
	var val=String(value); // récupération de la chaine de caractère corespondant au param
	var tmp;
	if ( val.split('.')[1] == undefined) // si le nombre est inferieur à 1000 ( donc pas de . séparateur)
	{
		result = parseInt(value); // on retourne ce nombre
	}
	else
	{
		for (i=0 ; i<5 ; i++ ) //
		{
			if( val.split('.')[i] != undefined) // récupération du paquet de 3 ciffres à la position i
			{
				tmp=value.split('.')[i]; 
				if (tmp[0] == '0') // si le nombre est de la forme 0XX ( correction nécessaire pour éviter que parseInt() retourne 0
				{
					if (tmp[1] == '0') // si le nombre esy de la forme 00X
					{
						tmp=tmp[2];
					}
					else
					{
						tmp=tmp[1]+tmp[2];
					}
				}
				result = ( 1000* result) + ( parseInt(tmp) ) ; // On multiplie l'existant par 1000 et on rajoute le paquet suivant.
			}
		}
	}
	return ( result );
	
}

//*******************

function MiN(tab) // calcule la valeur minimale du tableau table
{
	var mini = tab[0];
	for ( i=1 ; i< tab.length ; i++ )
	{
		if ( parseInt(tab[i]) < parseInt(mini)) // si le nombre actuel est inférieur au précédent minimum ... 
		mini = tab[i];
	}
	return ( mini );
	
	
}

//******

function MaX(tab) // calcule la valeur maximale du tableau table
{
	var maxi = tab[0];
	for ( i=1 ; i< tab.length ; i++ )
	{
		if ( parseInt(tab[i]) > parseInt(maxi) ) // si le nombre actuel est supérieur au précédent maximum ... 
		maxi = tab[i];
	}
	return ( maxi );
}

//********

function tabPoint(month,year) // Création d'un tableau contenant l'ensembles des points du mois, ceux qui n'existe pas sont remplacés par leur suivant le plus proche, s'il n'y en a pas, par leur précédent.
{
	var date = getDaTe();
	var day ='1';

	date = day+'-'+month+'-'+year; // on part de la date 1-xx-xxxx
	var table = new Array();

	var day2=day; // initialisation de la date de secours (si à la date day il n'y pas de donnée sauvegardée
	
	while (day < (String(nbJoursM(month,year)+1)) ) // tant que l'on est pas à la fin du mois
	{
		
		if ( GM_getValue('progPoints'+date+serveur+coordPM , -1) == -1 || isNaN(parseInt(GM_getValue('progPoints'+date+serveur+coordPM , -1)) )) // si la donnée n'est pas sauvegardée
		{
			day2=day;
		
			while ((GM_getValue('progPoints'+date+serveur+coordPM , -1) == -1 || isNaN(parseInt(GM_getValue('progPoints'+date+serveur+coordPM , -1)) )) && day2 != (String(nbJoursM(month,year)+1)) ) // tant que l'on a pas trouvée une autre donnée valide plus loin
			{
				day2++;
				date = day2+'-'+month+'-'+year;
			}
			if (GM_getValue('progRank'+date+serveur+coordPM , -1) == -1) // si pas de donnée trouvée plus loin, on cherche avant
			{
				day2 == day;
				while ((GM_getValue('progRank'+date+serveur+coordPM , -1) == -1 || isNaN(parseInt(GM_getValue('progPoints'+date+serveur+coordPM , -1)) )) && day2 != '0')
				{
					day2--;
					date = day2+'-'+month+'-'+year;
				}
			}
		
		}
		
		table.push(parseNB(GM_getValue('progPoints'+date+serveur+coordPM , -1)) ); // ajout de la nouvelle donnée
		day++;
		date = day+'-'+month+'-'+year;
	}
	return ( table );
}

//*******

function tabRank(month,year) // idem fonction précédente avec le classement
{
	var date = getDaTe();
	var day ='1';
	date = day+'-'+month+'-'+year;
	var table = new Array();
	var day2=day;
	while (day < (String(nbJoursM(month,year)+1)) )
	{
		if ( GM_getValue('progRank'+date+serveur+coordPM , -1) == -1)
		{
			day2 = day;

			while (GM_getValue('progRank'+date+serveur+coordPM , -1) == -1 && day2 != (String(nbJoursM(month,year)+1)))
			{
				day2++;
				date = day2+'-'+month+'-'+year;
			}
			
			if (GM_getValue('progRank'+date+serveur+coordPM , -1) == -1)
			{
				day2 == day;
				while (GM_getValue('progRank'+date+serveur+coordPM , -1) == -1 && day2 != '0')
				{
					day2--;
					date = day2+'-'+month+'-'+year;
				}
			}
		}
		table.push(parseNB(GM_getValue('progRank'+date+serveur+coordPM , -1) ));
		day++;
		date = day+'-'+month+'-'+year;
	}
	return ( table );
}

//*******

function anBiss(year) // test si l'année est bissextile
{
var biss=false;
var an = parseInt(year); // récupération de l'année en entier
if(eval(an%4)==0)
	{
	if(eval(an%100)==0)
		{

		if(eval(an%400)==0)
			{
			biss = true;
			}
		 else
			{
			biss = false;
			}

		}
    else
		{
			biss = true;
		}

	}
else
	{
		biss = false;
	}
	return ( biss );
}

//******

function nbJoursM(month,year) // retourne le nombre de jour du mois month de l'année year
{

	var listeNbrJours = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	if (anBiss(year)) 
		{
			listeNbrJours[1]++
		}
	return ( listeNbrJours[(parseInt(month)) -1 ]  )
}

//**********************
//**** CREATION DU GRAPHIQUE DES POINTS ET CLASSEMENT
//**********************	
	
function graphM(month,year)
{
	var day = nbJoursM(month,year); // recup du nombre de jour du mois à afficher
	if( getDaTe().split('-')[1] == month && getDaTe().split('-')[2] == year) // si le mois a afficher est l'actuel, on récupère le jour actuel
	{
		
		day = getDaTe().split('-')[0]
	}
	var url = 'http://chart.apis.google.com/chart?chxr=0,'+parseInt(MaX(tabRank(month,year)))+','+parseInt(MiN(tabRank(month,year)))+'|1,'+MiN(tabPoint(month,year))+','+MaX(tabPoint(month,year))+'|2,1,'+day+'&chxs=0,FF0000,11.5,0,lt,FF0000|1,3072F3,11.5,0,lt,3072F3&chxt=r,y,x&chs=666x200&cht=lxy&chco=3072F3,FF0000&chds=1,'+day+','+MiN(tabPoint(month,year))+','+parseNB(MaX(tabPoint(month,year)))+',1,'+day+','+parseInt(MaX(tabRank(month,year)))+','+parseInt(MiN(tabRank(month,year)))+'&chd=t:';
// préparation de l'url du graphique (début)
	
	
	for ( i=1 ; i < ((parseInt(day) )+1) ; i++) // ajout des données correspondant aux jours
	{
		url += i;
		if (i != day)
		{
			url += ',';
		}
		else 
		{
			url+='|';
		}
	}
	
	var table=tabPoint(month,year) // recup du tableau des points
	for ( i=1 ; i < ((parseInt(day) )+1) ; i++) // ajout des données relatives aux points
	{
		url += table[i-1];
		if (i != day)
		{
			url += ',';
		}
		else 
		{
			url+='|';
		}
		
	
	}
	for ( i=1 ; i < ((parseInt(day) )+1) ; i++) // ajout des données correspondants aux jours, encore
	{
		url += i;
		if (i != day)
		{
			url += ',';
		}
		else 
		{
			url+='|';
		}
		
	}
	
	var table2=tabRank(month,year) // recup du tableau du classement
	for ( i=1 ; i < ((parseInt(day) )+1) ; i++) // ajout des données du classement
	{
		url += parseInt(table2[i-1]);
		if (i != day)
		{
			url += ',';
		}
	}
	url +='&chdl=Points|Rank&chdlp=b&chls=2,4,1|1&chma=5,5,5,25&chtt=Progression&chts=BB1010,11.5'; // ajout des derniers élements de l'url

	//result.innerHTML +='<p align=center><img src="'+url+'/><br><i>Progression de '+convMonth2(month)+' '+year+'.</i></p>'; // mise en place du graphique dans le bloc HTML
	return ( url );

}	
	
//****

function affDet(month,year) // affiche le détail des points du mois choisis
{
var dayF = parseInt(nbJoursM(month,year)); // recup du nombre de jour du mois à afficher
	if( getDaTe().split('-')[1] == month && getDaTe().split('-')[2] == year) // si le mois a afficher est l'actuel, on récupère le jour actuel
	{
		
		dayF = getDaTe().split('-')[0]
	}
var day = '1'; 
var date = day+'-'+month+'-'+year;
var tableP = tabPoint(month,year); // recup tableau points
var tableR = tabRank(month,year); // recup tableau rank
var progPTotale = tableP[ dayF-1] - tableP[0]; // calcul progression en points
var progRTotale = parseNB(tableR[ dayF-1]) - parseNB(tableR[0]); // calcul progression au classement
var textP='';
var textR='';
if ( progPTotale == 0) // affection d'une couleur différent selon si positif ( vert )  négatif (rouge) ou nul (blanc)
	{
		textP='<font color=white>'+parseString(progPTotale)+'</font>';
	}
if ( progPTotale > 0)
	{
		textP='<font color=green>+ '+parseString(progPTotale)+'</font>';
	}
if ( progPTotale < 0)
	{
		textP='<font color=red>- '+parseString(-1*progPTotale)+'</font>';
	}
if ( progRTotale == 0)
	{
		textR+='<font color=white>'+parseString(progRTotale)+'</font>';
	}
if ( progRTotale < 0)
	{
		textR='<font color=green>+ '+parseString((-1* progRTotale))+'</font>';
	}
if ( progRTotale > 0)
	{
		textR='<font color=red>- '+parseString(progRTotale)+'</font>';
	}
if (parseInt(dayF) == 1)
{
	var moyenneP = Math.round(progPTotale / dayF); // calcul moyenne progression points
	var moyenneR = progRTotale / dayF; // calcul moyenne progression rank
}
	else
{
	var moyenneP = Math.round(progPTotale / (dayF-1)); // calcul moyenne progression points
	var moyenneR = progRTotale / (dayF-1); // calcul moyenne progression rank
}
var textP2='';
var textR2='';
moyenneR = (parseInt(100*moyenneR))/100;
if ( moyenneP == 0) // affection d'une couleur différent selon si positif ( vert )  négatif (rouge) ou nul (blanc)
	{
		textP2='<font color=white>'+parseString(moyenneP)+'</font>';
	}
if ( moyenneP > 0)
	{
		textP2='<font color=green>+ '+parseString(moyenneP)+'</font>';
	}
if ( moyenneP < 0)
	{
		textP2='<font color=red>- '+parseString(-1*moyenneP)+'</font>';
	}
if ( moyenneR == 0)
	{
		textR2='<font color=white>'+moyenneR+'</font>';
	}
if ( moyenneR < 0)
	{
		textR2='<font color=green>+ '+-1* moyenneR+'</font>';
	}
if ( moyenneR > 0)
	{
		textR2='<font color=red>- '+moyenneR+'</font>';
	}
if (country == 'fr')
	{
	var text='<br><p align=center><u><b>Détails des points de ' + convMonth2(month) + ' ' + year +' </b></u><br><br><u><b>BILAN :</b></u><br><br> <u><b>Points :</b></u><br><b>'+parseString(tableP[0])+'</b><font color=red><b>-></b></font><b>' +parseString(tableP[ (dayF-1)])+' = '+textP+'</b><br><br><u><b> Rank : </b></u><br>'+tableR[0]+'<font color=red><b>-></b></font><b>' +tableR[ dayF - 1]+' = '+textR+'</b><br><b> Moyenne : </b><br><br><b> Points : '+textP2+' pts/jour </b><br><b>Rank : '+textR2+' place/jour </b><br> <center><table>';
	}
	else
	{
		var text='<br><p align=center><u><b>Details of points of ' + convMonth2(month) + ' ' + year +' </b></u><br><br><u><b>RESULTS :</b></u><br><br> <u><b>Points :</b></u><br><b>'+parseString(tableP[0])+'</b><font color=red><b>-></font><b>' +parseString(tableP[ (dayF-1)])+' = '+textP+'</b><br><br><u><b> Rank : </b></u><br><b>'+tableR[0]+'</b><font color=red><b>-></b></font><b>' +tableR[ dayF - 1]+' = '+textR+'</b><br><b> Average : </b><br><br><b> Points : '+textP2+' pts/day </b><br><b>Rank : '+textR2+' place/day </b><br><center><table>';
	}
// Début du bloc HTML des détails des points ( titre + bilan + moyennes )
	while (day < (String(nbJoursM(month,year)+1)) ) // tant que pas à la fin du mois, ajout des données de chaque jour
	{
		if ( GM_getValue('progPoints'+date+serveur+coordPM , -1) == -1 || isNaN(parseInt(GM_getValue('progPoints'+date+serveur+coordPM , -1)))) // si donnée non connue
		{
			if (country == 'fr')
			{
				text+='<tr><td><font color=red>'+ date+ '</font></td> <td><font color=red><i>- ' +'Non défini</i></font></td></tr>';
			}
			else
			{
				text+='<tr><td><font color=red>'+ date+ '</font></td> <td><font color=red><i>- ' +'Not defined</i></font></td></tr>';
			}
		
		}
		else
		{
		if (country == 'fr')
			{
			text += '<tr><td><font color=#cccc00><b>'+date + '</b></font></td> <td><font color=#cccc00><b>- ' + GM_getValue('progPoints'+date+serveur+coordPM , -1) +' </b></font></td><td>'+calcProg(date).split('_')[0]+'</td><td><font color=#cccc00><b>-- '+ GM_getValue('progRank'+date+serveur+coordPM , -1)+ '<sup>ème</sup></b></font></td><td>'+calcProg(date).split('_')[1]+'</td></tr>';
			}
		else
			{
			text += '<tr><td><font color=#cccc00><b>'+date + '</b></font></td> <td><font color=#cccc00><b>- ' + GM_getValue('progPoints'+date+serveur+coordPM , -1) +'</b></font> </td><td>'+calcProg(date).split('_')[0]+'</td><td><font color=#cccc00><b>-- '+ GM_getValue('progRank'+date+serveur+coordPM , -1)+ '<sup>th</sup></b></font></td><td>'+calcProg(date).split('_')[1]+'</td></tr>';
			}
		}
		day++;
		date = day+'-'+month+'-'+year;
		
	}
	text+='</table></center></font>'; // fin du texte
	result.innerHTML +='<b>'+ text+'</b></p>'; // fin du bloc HTML

}

//*****

function convMonth(month) // Convertit le nom d'un mois (Anglais) en son numéro
{

	if (country == 'fr')
	{
		switch ( month )
		{
			case 'Janvier' : return '1';
				break;
			case 'Fevrier' : return '2';
				break;
			case 'Mars' : return '3';
				break;	
			case 'Avril' : return '4';
				break;
			case 'Mai' : return '5';
				break;
			case 'Juin' : return '6';
				break;
			case 'Juillet' : return '7';
				break;
			case 'Août' : return '8';
				break;
			case 'Septembre' : return '9';
				break;
			case 'Octobre' : return '10';
				break;
			case 'Novembre' : return '11';
				break;
			case 'Decembre' : return '12';
				break;
		}
	}
	else
	{
		switch ( month )
		{
			case 'January' : return '1';
				break;
			case 'February' : return '2';
				break;
			case 'March' : return '3';
				break;	
			case 'April' : return '4';
				break;
			case 'May' : return '5';
				break;
			case 'June' : return '6';
				break;
			case 'July' : return '7';
				break;
			case 'August' : return '8';
				break;
			case 'September' : return '9';
				break;
			case 'October' : return '10';
				break;
			case 'November' : return '11';
				break;
			case 'December' : return '12';
				break;
		}
	}

}

//******

function convMonth2(month) // Convertit le numéro d'un mois en son nom (Anglais)
{

	if (country == 'fr')
	{
		switch ( month )
		{
			case '1': return 'Janvier';
				break;
			case '2' : return 'Fevrier';
				break;
			case '3' : return 'Mars';
				break;	
			case '4' : return 'Avril';
				break;
			case '5' : return 'Mai';
				break;
			case '6' : return 'Juin';
				break;
			case '7' : return 'Juillet';
				break;
			case '8' : return 'Août';
				break;
			case '9' : return 'Septembre';
				break;
			case '10' : return 'Octobre';
				break;
			case '11' : return 'Novembre';
				break;
			case '12' : return 'Decembre';
				break;
		}
	}
	else
	{
		switch ( month )
		{
			case '1': return 'January';
				break;
			case '2' : return 'February';
				break;
			case '3' : return 'March';
				break;	
			case '4' : return 'April';
				break;
			case '5' : return 'May';
				break;
			case '6' : return 'June';
				break;
			case '7' : return 'July';
				break;
			case '8' : return 'August';
				break;
			case '9' : return 'September';
				break;
			case '10' : return 'October';
				break;
			case '11' : return 'November';
				break;
			case '12' : return 'December';
				break;
		}
	}

}

//***

function compareDate(month) // test si la date faite avec le mois ( et la date récupérée) passé en paramètre est compris entre la date d'installation et la date actuelle (signifie donc que en dehors de ces bornes aucune données n'existe ), retourne 3 nombre différents : 1= passé , 2 = futur,  0=Ok
{
	var year = parseInt(document.getElementById('textYear').value); // année saisie dans le champs de texte
	var dateEnr= GM_getValue('progDateEnr'+serveur+coordPM , -1); // recup date installation
	var yearEnr = parseInt(dateEnr.split('-')[2].split(' à')[0]); // recup année instal
	var monthEnr = parseInt(dateEnr.split('-')[1]); // recup moins install
	var monthNow = parseInt(getDaTe().split('-')[1]); // recup mois actuel
	var yearNow = parseInt(getDaTe().split('-')[2]); // recup année actuelle
	if ( yearEnr > year)  // si l'année choisie est avant l'année d'install
	{
		return 1;
	}
	if ( yearEnr == year && monthEnr > month) // si c'est dans l'année actuelle et que le mois choisis est antérieur au moins d'install
	{
		return 1;
	}
	if ( yearNow < year ) // si l'année choisie est postérieure à celle actuelle
	{
		return 2;
	}
	if ( yearNow == year && monthNow < month) // si l'année saisie est celle en cours et que le mois est après celui actuel
	{
		return 2;
	}
	else // si tout est ok
	{
		return 0;
	}
}

//*******

function detYear(year)
{
	var yearNow = getDaTe().split('-')[2];
	var month = '12';
	if ( year == yearNow )
	{
		month = getDaTe().split('-')[1];
	}


}

//*******

function afficher() // affiche les données relatives au mois saisi, déclenché par le bouton "GO"
{
	if ( document.getElementById('sel').value != '------------')
	{
		var month = convMonth(document.getElementById('sel').value); // recup mois
	}
	var year = document.getElementById('textYear').value; // recup année
	var res = compareDate(month); // recup validité de la date
	if ( res == 0 ) // si Ok
	{
		if (country == 'fr')
		{
			result.innerHTML='<br><br><h2 align=center>Progression de ' +GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1) +'</h2><br><h6 align=center> Installé le '+dateEnr+'.</h6><br><br>'; // affichage titre
		}
		else
		{
			result.innerHTML='<br><br><h2 align=center>Progression of ' +GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1) +'</h2><br><h6 align=center> Set up on '+dateEnr+'.</h6><br><br>'; // affichage titre
		}
		if ( document.getElementById('sel').value != '------------')
		{
			selectMonth.value=convMonth2(month);
			
			var url=graphM(month,year); // affichage graphique
			if (country == 'fr')
			{
				result.innerHTML +='<p align=center><img src="'+url+'"/><br><i>Progression de '+convMonth2(month)+' '+year+'.</i></p>'; // mise en place du graphique dans le bloc HTML
			}
			else
			{
				result.innerHTML +='<p align=center><img src="'+url+'"/><br><i>Progression of '+convMonth2(month)+' '+year+'.</i></p>'; // mise en place du graphique dans le bloc HTML
			}
			affDet(month,year); // affichage détails du mois
		}
		else
		{
			detYear(year);
		}
			
	}
	if ( res == 1) // si date passée
	{
		if (country == 'fr')
		{
			alert("Date antérieure à l'installation");
		}
		else
		{
			alert("Date prior to the installation");
		}
	}
	if ( res == 2) // Si date future à celel actuelle
	{
		if (country == 'fr')
		{
			alert("Date future"); 
		}
		else
		{
			alert("Future date");
		}
	}

}

//****

function nextPage() // affiche les données relative au mois suivant, idem que afficher() mais pour le mois suivant, déclanché par le bouton >>
{
	var month = String(parseInt(convMonth(document.getElementById('sel').value))+1);
	var year = document.getElementById('textYear').value;
	if ( parseInt(month) > 12)
	{
		month = '1';
		year = String(parseInt(year)+1);
		document.getElementById('textYear').value = year;
	}
	var res = compareDate(month);
	if ( res == 0 )
	{
		if (country == 'fr')
		{
			result.innerHTML='<br><br><h2 align=center>Progression de ' +GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1) +'</h2><br><h6 align=center> Installé le '+dateEnr+'.<br><br>';
		}
		else
		{
			result.innerHTML='<br><br><h2 align=center>Progression of ' +GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1) +'</h2><br><h6 align=center> Set up on '+dateEnr+'.<br><br>';
		}
		selectMonth.value=convMonth2(month);
		document.getElementById('textYear').value=year;
		var url=graphM(month,year); // affichage graphique
		if (country == 'fr')
		{
			result.innerHTML +='<p align=center><img src="'+url+'"/><br><i>Progression de '+convMonth2(month)+' '+year+'.</i></p>'; // mise en place du graphique dans le bloc HTML
		}
		else
		{
			result.innerHTML +='<p align=center><img src="'+url+'"/><br><i>Progression of '+convMonth2(month)+' '+year+'.</i></p>'; // mise en place du graphique dans le bloc HTML
		}
		affDet(month,year);
		
	}
	if ( res == 1) // si date passée
	{
		if (country == 'fr')
		{
			alert("Date antérieure à l'installation");
		}
		else
		{
			alert("Date prior to the installation");
		}
	}
	if ( res == 2) // Si date future à celel actuelle
	{
		if (country == 'fr')
		{
			alert("Date future"); 
		}
		else
		{
			alert("Future date");
		}
	}

}

//******

function prevPage() // affiche les données relative au mois précedant, idem que afficher() mais pour le mois précedant, déclanché par le bouton <<
{
	var month = String(parseInt(convMonth(document.getElementById('sel').value))-1);
	var year = document.getElementById('textYear').value;
	if ( parseInt(month) < 1)
	{
		month = '12';
		year = String(parseInt(year)-1);
		document.getElementById('textYear').value = year;
	}
	var res = compareDate(month);
	if ( res == 0 )
	{
		//alert('OK');
		if (country == 'fr')
		{
			result.innerHTML='<br><br><h2 align=center>Progression de ' +GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1) +'</h2><br><h6 align=center> Installé le '+dateEnr+'.<br><br>';
		}
		else
		{
			result.innerHTML='<br><br><h2 align=center>Progression of ' +GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1) +'</h2><br><h6 align=center> Set up on '+dateEnr+'.<br><br>';
		}
		selectMonth.value=convMonth2(month);
		document.getElementById('textYear').value=year;
		var url=graphM(month,year); // affichage graphique
		if (country == 'fr')
		{
			result.innerHTML +='<p align=center><img src="'+url+'"/><br><i>Progression de '+convMonth2(month)+' '+year+'.</i></p>'; // mise en place du graphique dans le bloc HTML
		}
		else
		{
			result.innerHTML +='<p align=center><img src="'+url+'"/><br><i>Progression of '+convMonth2(month)+' '+year+'.</i></p>'; // mise en place du graphique dans le bloc HTML
		}
		affDet(month,year);
		
	}
	if ( res == 1) // si date passée
	{
		if (country == 'fr')
		{
			alert("Date antérieure à l'installation");
		}
		else
		{
			alert("Date prior to the installation");
		}
	}
	if ( res == 2) // Si date future à celel actuelle
	{
		if (country == 'fr')
		{
			alert("Date future"); 
		}
		else
		{
			alert("Future date");
		}
	}
}

//***

function calcProg(date) // Calcule la progression en point et classement entre la date passée en param et la veille, formaté de la forme " progPoint_ProgRank "
{
	var text = ' _ '; // texte de base si aucune opération à faire
	var datePrev = "";
	if ( parseInt(date.split('-')[0]) > 1 ) // si la date est autre au premier jour
	{
		var datePrev = String(parseInt(date.split('-')[0])-1)+'-'+date.split('-')[1]+'-'+date.split('-')[2]; // création chaine de caractère de la date de la veille
	}
	else
	{
		var day = date.split('-')[0];
		var month = date.split('-')[1];
		var year = date.split('-')[2];

		if(parseInt(month) == 1)
		{
			month = "12";
			year = String(parseInt(year)-1);
		}
		else
		{
			month = String(parseInt(month)-1);
		}
		day = nbJoursM(month, year);
		datePrev = day + "-" + month + "-" + year;
	}
		var point1 = GM_getValue('progPoints'+datePrev+serveur+coordPM , -1);  // recup points du jour précedant
		var point2 = GM_getValue('progPoints'+date+serveur+coordPM , -1); // recup points du jour date
		var rank1 = parseNB(GM_getValue('progRank'+datePrev+serveur+coordPM , -1)); // recup rank du jour précedant
		var rank2 = parseNB(GM_getValue('progRank'+date+serveur+coordPM , -1)); // recup rank du jour date
		
		if ( point1 != -1 && point2 != -1 && rank1 != -1 && rank2 != -1) // si toutes les données existent
		{
			point1 = parseNB(point1); // conversion en entier
			point2 = parseNB(point2);// conversion en entier
			var diff = point2 - point1 ; // calcul progression points
			var diffRank = parseInt(rank2) - parseInt(rank1); // calcul progression classment
			if ( diff == 0) // affection d'une couleur différent selon si positif ( vert )  négatif (rouge) ou nul (blanc)
			{
				text='<font color=white>'+parseString(diff)+'</font>';
			}
			if ( diff > 0)
			{
				text='<font color=green>+ '+parseString(diff)+'</font>';
			}
			if ( diff < 0)
			{
				text='<font color=red>- '+parseString(-1*diff)+'</font>';
			}
			text +='_'; // ajout séparateur
			if ( diffRank == 0)
			{
				text+='<font color=white>'+parseString(diffRank)+'</font>';
			}
			if ( diffRank < 0)
			{
				text+='<font color=green>+ '+parseString((-1* diffRank))+'</font>';
			}
			if ( diffRank > 0)
			{
				text+='<font color=red>- '+parseString(diffRank)+'</font>';
			}
		}
	return (text);

}

//****

function calcProg2(date) // Calcule la progression en point et classement entre la date passée en param et la veille, formaté de la forme " progPoint_ProgRank "
{
	 var text=' _ '; // texte de base si aucune opération à faire
	 if ( parseInt(date.split('-')[0]) > 1 ) // si la date est autre au premier jour
	{
		var datePrev = String(parseInt(date.split('-')[0])-1)+'-'+date.split('-')[1]+'-'+date.split('-')[2]; // création chaine de caractère de la date de la veille
	}
	else
	{
		var day = date.split('-')[0];
		var month = date.split('-')[1];
		var year = date.split('-')[2];

		if(parseInt(month) == 1)
		{
			month = "12";
			year = String(parseInt(year)-1);
		}
		else
		{
			month = String(parseInt(month)-1);
		}
		day = nbJoursM(month, year);
		datePrev = day + "-" + month + "-" + year;
	}
		var point1 = GM_getValue('progPoints'+datePrev+serveur+coordPM , -1);  // recup points du jour précedant
		var point2 = GM_getValue('progPoints'+date+serveur+coordPM , -1); // recup points du jour date
		var rank1 = GM_getValue('progRank'+datePrev+serveur+coordPM , -1); // recup rank du jour précedant
		var rank2 = GM_getValue('progRank'+date+serveur+coordPM , -1); // recup rank du jour date
		
		if ( point1 != -1 && point2 != -1 && rank1 != -1 && rank2 != -1) // si toutes les données existent
		{
			point1 = parseNB(point1); // conversion en entier
			point2 = parseNB(point2);// conversion en entier
			var diff = point2 - point1 ; // calcul progression points
			var diffRank = parseInt(rank2) - parseInt(rank1); // calcul progression classment
			if ( diff == 0) // affection d'une couleur différent selon si positif ( vert )  négatif (rouge) ou nul (blanc)
			{
				text='[color=white]'+parseString(diff)+'[/color]';
			}
			if ( diff > 0)
			{
				text='[color=green]+ '+parseString(diff)+'[/color]';
			}
			if ( diff < 0)
			{
				text='[color=red]- '+parseString(-1*diff)+'[/color]';
			}
			text +='_'; // ajout séparateur
			if ( diffRank == 0)
			{
				text+='[color=white]'+parseString(diffRank)+'[/color]';
			}
			if ( diffRank < 0)
			{
				text+='[color=green]+ '+parseString((-1* diffRank))+'[/color]';
			}
			if ( diffRank > 0)
			{
				text+='[color=red]- '+parseString(diffRank)+'[/color]';
			}

	}
	return (text);

}
//****

function parseString(val) // converti un entier de la fome xxxxxx en xxx.xxx, pour personnalisation du nombre de chiffre par paquet, il suffit de remplacer 3 par le nombre voulu dans la ligne suivante : if ( ((lg-1) - i)%3 == 0 && i != (lg-1) )
{
	var nb = String(val); // conversion nombre en chaine de caractère
	var lg = nb.length; // recup longueur de la chaine
	var res='';
	for ( i=0 ; i < lg ; i++)
	{
		res += nb[i]; // ajout du ième chiffre du nombre
		if ( ((lg-1) - i)%3 == 0 && i != (lg-1) ) // ajout du séparateur '.' si nécessaire
		{
			res +='.';
		}
	}
	return res;	
}

//*******

function exportBBCode()
{
	var month = String(parseInt(convMonth(document.getElementById('sel').value)));
	var year = document.getElementById('textYear').value;
	if (country == 'fr')
	{
		var text= '[center][size=18][color=#009999][i]Progression de ' +GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1)+' de '+convMonth2(month)+' '+year+'.[/i][/color][/size] \n [img]'+graphM(month,year)+'[/img][/center]';
	}
	else
	{
		var text= '[center][size=18][color=#009999][i]Progression of ' +GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1)+' of '+convMonth2(month)+' '+year+'.[/i][/color][/size] \n [img]'+graphM(month,year)+'[/img][/center]';
	}
	
	
var dayF = parseInt(nbJoursM(month,year)); // recup du nombre de jour du mois à afficher
	if( getDaTe().split('-')[1] == month && getDaTe().split('-')[2] == year) // si le mois a afficher est l'actuel, on récupère le jour actuel
	{
		
		dayF = getDaTe().split('-')[0]
	}
var day = '1'; 
var date = day+'-'+month+'-'+year;
var tableP = tabPoint(month,year); // recup tableau points
var tableR = tabRank(month,year); // recup tableau rank
var progPTotale = tableP[ dayF-1] - tableP[0]; // calcul progression en points
var progRTotale = tableR[ dayF-1] - tableR[0]; // calcul progression au classement
var textP='';
var textR='';
if ( progPTotale == 0) // affection d'une couleur différent selon si positif ( vert )  négatif (rouge) ou nul (blanc)
	{
		textP='[color=white]'+parseString(progPTotale)+'[/color]';
	}
if ( progPTotale > 0)
	{
		textP='[color=green]+ '+parseString(progPTotale)+'[/color]';
	}
if ( progPTotale < 0)
	{
		textP='[color=red]- '+parseString(-1*progPTotale)+'[/color]';
	}
if ( progRTotale == 0)
	{
		textR+='[color=white]'+parseString(progRTotale)+'[/color]';
	}
if ( progRTotale < 0)
	{
		textR='[color=green]+ '+parseString((-1* progRTotale))+'[/color]';
	}
if ( progRTotale > 0)
	{
		textR='[color=red]- '+parseString(progRTotale)+'[/color]';
	}
if (parseInt(dayF) == 1)
{
	var moyenneP = Math.round(progPTotale / dayF); // calcul moyenne progression points
	var moyenneR = progRTotale / dayF; // calcul moyenne progression rank
}
	else
{
	var moyenneP = Math.round(progPTotale / (dayF-1)); // calcul moyenne progression points
	var moyenneR = progRTotale / (dayF-1); // calcul moyenne progression rank
}
var textP2='';
var textR2='';
moyenneR = (parseInt(100*moyenneR))/100;
if ( moyenneP == 0) // affection d'une couleur différent selon si positif ( vert )  négatif (rouge) ou nul (blanc)
	{
		textP2='[color=white]'+parseString(moyenneP)+'[/color]';
	}
if ( moyenneP > 0)
	{
		textP2='[color=green]+ '+parseString(moyenneP)+'[/color]';
	}
if ( moyenneP < 0)
	{
		textP2='[color=red]- '+parseString(-1*moyenneP)+'[/color]';
	}
if ( moyenneR == 0)
	{
		textR2='[color=white]'+moyenneR+'[/color]';
	}
if ( moyenneR < 0)
	{
		textR2='[color=green]+ '+-1* moyenneR+'[/color]';
	}
if ( moyenneR > 0)
	{
		textR2='[color=red]- '+moyenneR+'[/color]';
	}
if (country == 'fr')
{
	var text2 ='\n [center][u][b]Détails des points de ' + convMonth2(month) + ' ' + year +' [/b][/u] \n \n [u]BILAN :[/u] \n \n [u]Points :[/u] \n '+parseString(tableP[0])+'[color=red]->[/color]' +parseString(tableP[ (dayF-1)])+' = '+textP+'\n \n [u] Rank : [/u]\n '+tableR[0]+'[color=red]->[/color]' +tableR[ dayF - 1]+' = '+textR+' \n \n Moyenne : \n \n Points : '+textP2+' pts/jour \n Rank : '+textR2+' place/jour \n [color=#cccc00]';
}
else
{
	var text2 ='\n [center][u][b]Details of points of ' + convMonth2(month) + ' ' + year +' [/b][/u] \n \n [u]RESULTS :[/u] \n \n [u]Points :[/u] \n '+parseString(tableP[0])+'[color=red]->[/color]' +parseString(tableP[ (dayF-1)])+' = '+textP+'\n \n [u] Rank : [/u]\n '+tableR[0]+'[color=red]->[/color]' +tableR[ dayF - 1]+' = '+textR+' \n \n Average : \n \n Points : '+textP2+' pts/day \n Rank : '+textR2+' place/day \n [color=#cccc00]';
}
// Début du bloc HTML des détails des points ( titre + bilan + moyennes )
		while (day < (String(nbJoursM(month,year)+1)) ) // tant que pas à la fin du mois, ajout des données de chaque jour
		{
		if ( GM_getValue('progPoints'+date+serveur+coordPM , -1) == -1 || isNaN(parseInt(GM_getValue('progPoints'+date+serveur+coordPM , -1)))) // si donnée non connue
		{
			if (country == 'fr')
			{
				text2 +='[color=red]'+ date+ '[/color][color=red][i]- ' +'Non défini[/i][/color] \n ';
			}
			else
			{
				text2 +='[color=red]'+ date+ '[/color][color=red][i]- ' +'Not defined[/i][/color] \n ';
			}
		
		}
		else
		{
			if (country == 'fr')
			{
				text2 += date + '-- ' + GM_getValue('progPoints'+date+serveur+coordPM , -1) +' -- '+calcProg2(date).split('_')[0]+' -- '+ GM_getValue('progRank'+date+serveur+coordPM , -1)+ 'ème'+calcProg2(date).split('_')[1]+'\n';
			}
			else
			{
				text2 += date + '-- ' + GM_getValue('progPoints'+date+serveur+coordPM , -1) +' -- '+calcProg2(date).split('_')[0]+' -- '+ GM_getValue('progRank'+date+serveur+coordPM , -1)+ 'th'+calcProg2(date).split('_')[1]+'\n';
			}
		}
		day++;
		date = day+'-'+month+'-'+year;
		
	}
	text2 +='[/color]'; // fin du texte
	text +='[b]'+ text2+'[/b][/center]'; // fin du bloc HTML	
	
	
	
	
//------------------------
	BBCode.textContent=text;
	
	
	
	//alert('All Right ! ');
}
//-------------------------------------------------
// MISE A JOUR
//-------------------------------------------------

function checkUpDate() // Copyright Lame Noire(author)
{
	GM_xmlhttpRequest(
	{
		method: 'GET', url: URL, onload: 
		function(answers)
		{
			var page = answers.responseText;
			var versionOfScript = page.substring(page.indexOf('<b>Version</b> : ')+17, page.length);
			versionOfScript = versionOfScript.substring(1, versionOfScript.indexOf("]"));
			if(version != versionOfScript)
			{ 
				if(MaJ && !document.getElementById('majMyProg'))
				{
					if (country == 'fr')
					{
						MaJ.innerHTML = "<br><a href='"+ Instal +"'><font color=orange id='majMyProg'> Mise à jour disponible  </font></a><br>";
					}
					else
					{
						MaJ.innerHTML = "<br><a href='"+ Instal +"'><font color=orange id='majMyProg'> Update available  </font></a><br>";
					}
				}
				if(!document.getElementById('myProgMaJAlert'))
				{
					var MaJAlert = document.createElement('a');
					MaJAlert.setAttribute("href",Instal);
					MaJAlert.setAttribute("style",'display:block !important; width:19px !important; position:relative !important; top:-25px !important; left:-25px !important; padding:0 !important; line-height:normal !important; font-family:Verdana !important; font-weight:700 !important; font-size:16px !important; color:orange !important; a:hover color:#FFEE66; a:hover{color:#FFEE66 !important;} ');
					MaJAlert.setAttribute("id","myProgMaJAlert");
					MaJAlert.textContent = "[!]"
					
					var myProgButton = document.getElementById('myProgButton');
					
					if(myProgButton) myProgButton.parentNode.appendChild(MaJAlert);
				}
			}
		}
	});
}
	

//*********************************************************
//******* SCRIPT
//*********************************************************

if ( (location.href.split('page=')[1].split('&')[0]) == 'overview') // Si on est en Vue Gé.
{
	if ( GM_getValue('coord'+serveur+pseudo, -1) == -1) // Si les coord de la PM du compte avec le pseudo donné ne sont pas connues
	{
		getPMCoords();
	}
	//document.getElementsByClassName('planet-koords')[i-1].innerHTML
	var nbColo= parseInt((document.getElementById('countColonies').textContent).split('/')[0]);
	var found=false;
	for (i=0 ; i < nbColo ; i++)
	{
		var coo = GM_getValue('coord'+serveur+pseudo, -1);
		if ( coo == document.getElementsByClassName('planet-koords')[i].innerHTML )
		{
			found = true;
			break;
		}
	}
	if(!found)
	{
		if (country == 'fr')
		{
			alert('Vous avez déplacé votre planéte mère');
		}
		else
		{
			alert('Your mother planet has been moved');
		}
		getPMCoords();
	}

		

	saveProg(); // sauvegarder de la progression du jour
}
var coordPM = GM_getValue('coord'+serveur+pseudo, -1) ; // recup coord de la PM sauvergadées

addButton(); //ajout du bouton dans la colonne de gauche

checkUpDate();	//Vérification de mise à jour en vue générale.


if ( (location.href.split('&')[location.href.split('&').length-1]) == 'Progression') // si dans la partie 'Progression'
{
	//----------- BOUTON GO
	var submit = document.createElement("input");
	submit.setAttribute('type','submit');
	submit.setAttribute('id','submit');
	submit.setAttribute('value','Go');
	submit.addEventListener("click", afficher, false );
	//----------- BOUTON <<
	var prev = document.createElement("input");
	prev.setAttribute('type','submit');
	prev.setAttribute('id','prevP');
	prev.setAttribute('value','<<');
	prev.addEventListener("click", prevPage, false );
	//----------- BOUTON >>
	var next = document.createElement("input");
	next.setAttribute('type','submit');
	next.setAttribute('id','nextP');
	next.setAttribute('value','>>');
	next.addEventListener("click", nextPage, false );
	//----------- CHAMP DE SAISIE DU MOIS ( LISTE DEFILANTE )
	var selectMonth = document.createElement("select");
	selectMonth.setAttribute('name','month');
	if (country == 'fr')
	{
		selectMonth.innerHTML = '<option>Janvier</option><option>Fevrier</option><option>Mars</option><option>Avril</option><option>Mai</option><option>Juin</option><option>Juillet</option><option>Août</option><option>Septembre</option><option>Octobre</option><option>Novembre</option><option>Decembre</option>';
	}
	else
	{
		selectMonth.innerHTML = '<option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option>';
	}
	
	selectMonth.setAttribute('id','sel');
	selectMonth.value=convMonth2(getDaTe().split('-')[1]);
	//----------- // CHAMP DE SAISIE DE L'ANNÉE
	var textYear = document.createElement("input");
	textYear.setAttribute('type','text');
	textYear.setAttribute('id','textYear');
	textYear.setAttribute('value',getDaTe().split('-')[2]);
	//-----------
	
	var dateEnr=GM_getValue('progDateEnr'+serveur+coordPM , -1); // recup date installation
	//----------- ELEMENT HTML COMPORTANT LE GRAPHIQUE ET LES DETAILS
	var result = document.createElement('div');
	result.setAttribute('id','textProg');
	if (country == 'fr')
	{
		result.innerHTML = '<br><br><h2 align=center>Progression de ' +GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1) +'</h2><br><h6 align=center> Installé le '+dateEnr+'.<br><br>';
	}
	else
	{
		result.innerHTML = '<br><br><h2 align=center>Progression of ' +GM_getValue('progPseudo'+getDaTe()+serveur+coordPM , -1) +'</h2><br><h6 align=center> Set up on '+dateEnr+'.<br><br>';
	}
	
	//----------- BOUTON EXPORT BBCode
	var exportBB = document.createElement("div");
	exportBB.addEventListener("click", exportBBCode, false );
	exportBB.innerHTML='<br><p align=center> >> Export BBCode << </p>';
	//----------- TEXTAREA CONTENANT LE BBCODE
	var BBCode = document.createElement('textarea');
	BBCode.setAttribute("cols",83);
	BBCode.setAttribute("rows",10);
	
	
	var url=graphM(getDaTe().split('-')[1],getDaTe().split('-')[2]); // affichage par défaut du graph du mois en cours
	if (country == 'fr')
	{
		result.innerHTML +='<p align=center><img src="'+url+'"/><br><i>Progression de '+convMonth2(getDaTe().split('-')[1])+' '+getDaTe().split('-')[2]+'.</i></p>'; // mise en place du graphique dans le bloc HTML
	}
	else
	{
		result.innerHTML +='<p align=center><img src="'+url+'"/><br><i>Progression of '+convMonth2(getDaTe().split('-')[1])+' '+getDaTe().split('-')[2]+'.</i></p>'; // mise en place du graphique dans le bloc HTML
	}
	affDet(getDaTe().split('-')[1],getDaTe().split('-')[2]); // affichage des détails du mois en cours
	document.getElementById('inhalt').innerHTML=''; // on efface le contenu central de la page

//*** TEXTE PRECEDANT LES CHAMPS DE SAISIE (LEGENDE)
var text1 = document.createElement('div');
result.setAttribute('id','text1');
text1.innerHTML='<font size=1>----Month: --------------- Year------- Submit-Prev-Next</font>';
	
	document.getElementById('inhalt').insertBefore(text1, document.getElementById('planet')); // Affichage de la légende des champs de saisie
	document.getElementById('inhalt').insertBefore(selectMonth, document.getElementById('textProg')); // Affichage de la liste défilantes des mois
	document.getElementById('inhalt').insertBefore(textYear, document.getElementById('textProg')); // Affichage du champ de saisie de l'année
	document.getElementById('inhalt').insertBefore(submit, document.getElementById('textProg')); // Affichage du bouton GO
	document.getElementById('inhalt').insertBefore(prev, document.getElementById('textProg')); // Affichage du bouton <<
	document.getElementById('inhalt').insertBefore(next, document.getElementById('textProg')); // Affichage du bouton >>
	document.getElementById('inhalt').insertBefore(result, document.getElementById('planet')); // Affichage du texte
	document.getElementById('inhalt').insertBefore(exportBB, document.getElementById('textProg')); // Affichage du bouton d'export
	document.getElementById('inhalt').insertBefore(BBCode, document.getElementById('textProg'));



}