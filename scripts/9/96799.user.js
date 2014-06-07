// ==UserScript==
// @name           detailsConverter
// @namespace      Sylver
// @include        http://www.war-riders.de/*/*/details/*/*
// ==/UserScript==

//Récupération du type de page
var type = location.href.split('details/')[1].split('/')[0];


	//******* CONSTRUCTION DES OBJETS********//
	//----- PARTIE DETAILS JOUEUR
	var titre = '';						//Titre général : "Details de XXX"
	var titreDetails = '';				//Titre des détails "Statistiques"
	var titrePlanet = '';				//Titre liste des planètes "Planète trouvé (xxxxx)"
	var enTete = new Array();			//Sous titres détails "Points" "Flottes "Recherche"
	var enTeteDetails = new Array();	//Titres colonnes tableau détails "Place" " Nom" ... "Points"
	var enTetePlanet = new Array();		//Titres colonnes tableau planètes "Planète" "Nom"
	
	//Données des détails d'un joueur ou d'une ally
	var data = new Array();
	data = 
	{
		points : new Array(), 	//ligne points
		eco : new Array(),		//ligne économie
		fleet : new Array(),	//ligne flotte
		research : new Array(),	//ligne recherche
	}
//Pour une page de joueur
if(type == 'player')
{
	//Détails des planètes
	var planets = new Array()
	planets = 
	{
		coords : new Array(),
		name : new Array(),
	}
	//-----------------
	//Objet principal
	var player = new Array();
	player = 
	{
		data : data,
		planets : planets,
	}
}
//Pour une page ally
if(type == 'ally')
{
	//Détails des membres d'une ally
	var rankM = new Array();
	rankM = 
	{
		points : new Array(),
		fleet : new Array(),
	}
	//-----------------
	var pointsM = new Array();
	pointsM = 
	{
		points : new Array(),
		fleet : new Array(),
	}
	//-----------------
	var members = new Array();
	members =
	{
		rank : rankM,
		name : new Array(),
		points : pointsM,
	}
	//-----------------
	var player = new Array();
	player = 
	{
		data : data,
		members : members,
	}
}
//***** FIN CONSTRUCTION OBJETS *******//
//***** RENSEIGNEMENT DES OBJETS ******//
//Titre général
titre = document.getElementById('startcontent2').getElementsByTagName('h1')[0].textContent;
//Titre détails
titreDetails = document.getElementById('startcontent2').getElementsByTagName('th')[0].textContent;
//Sous titre détails
for( i = 0 ; i < 3 ; i++)
{
	enTete[i] = document.getElementById('startcontent2').getElementsByTagName('tbody')[0].getElementsByTagName('td')[i*15].textContent;
}
//Titres des colonnes détails
for( i = 0 ; i < 7 ; i++)
{
	enTeteDetails[i] = document.getElementById('startcontent2').getElementsByTagName('tbody')[0].getElementsByTagName('td')[i+1].textContent;
}
//Contenu des détails
for (i = 0 ; i < 7 ; i++)
{
	player.data.points[i] = document.getElementById('startcontent2').getElementsByTagName('tbody')[0].getElementsByTagName('td')[i+8].textContent;
	player.data.eco[i] = document.getElementById('startcontent2').getElementsByTagName('tbody')[0].getElementsByTagName('td')[i+8+15].textContent;
	player.data.fleet[i] = document.getElementById('startcontent2').getElementsByTagName('tbody')[0].getElementsByTagName('td')[i+8+30].textContent;
	player.data.research[i] = document.getElementById('startcontent2').getElementsByTagName('tbody')[0].getElementsByTagName('td')[i+8+45].textContent;
	
}
//Si page joueur
if(type == 'player')
{
	var j = 0;
	//Titre planètes
	titrePlanet = document.getElementById('startcontent2').getElementsByTagName('th')[1].textContent;
	//Titre des colonnes
	enTetePlanet[0] = document.getElementById('startcontent2').getElementsByTagName('tbody')[1].getElementsByTagName('td')[0].textContent;
	enTetePlanet[1] = document.getElementById('startcontent2').getElementsByTagName('tbody')[1].getElementsByTagName('td')[1].textContent;

	//Planètes du joueur
	while(document.getElementById('startcontent2').getElementsByTagName('tbody')[1].getElementsByTagName('tr')[j+2])
	{
		player.planets.coords[j] = document.getElementById('startcontent2').getElementsByTagName('tbody')[1].getElementsByTagName('tr')[j+2].getElementsByTagName('td')[0].textContent;
		player.planets.name[j] = document.getElementById('startcontent2').getElementsByTagName('tbody')[1].getElementsByTagName('tr')[j+2].getElementsByTagName('td')[1].textContent;
		j ++;	
	}
}
//Si page ally
if(type == 'ally')
{
	var j = 0;
	//Titre membres
	titrePlanet = document.getElementById('startcontent2').getElementsByTagName('th')[1].textContent;
	//Titres des colonnes membres
	enTetePlanet[0] = document.getElementById('startcontent2').getElementsByTagName('tbody')[1].getElementsByTagName('td')[0].innerHTML.split('<br>')[0];
	enTetePlanet[1] = document.getElementById('startcontent2').getElementsByTagName('tbody')[1].getElementsByTagName('td')[0].getElementsByTagName('font')[0].textContent;
	enTetePlanet[2] = document.getElementById('startcontent2').getElementsByTagName('tbody')[1].getElementsByTagName('td')[1].textContent;
	enTetePlanet[3] = document.getElementById('startcontent2').getElementsByTagName('tbody')[1].getElementsByTagName('td')[2].innerHTML.split('<br>')[0];
	enTetePlanet[4] = document.getElementById('startcontent2').getElementsByTagName('tbody')[1].getElementsByTagName('td')[2].getElementsByTagName('font')[0].textContent;
	
	//Membres de l'alliance
	while(document.getElementById('startcontent2').getElementsByTagName('tbody')[1].getElementsByTagName('tr')[j+2])
	{
		player.members.rank.points[j] = parseInt(document.getElementById('startcontent2').getElementsByTagName('tbody')[1].getElementsByTagName('tr')[j+2].getElementsByTagName('td')[0].innerHTML.split('<br>')[0]);
		player.members.rank.fleet[j] = document.getElementById('startcontent2').getElementsByTagName('tbody')[1].getElementsByTagName('tr')[j+2].getElementsByTagName('td')[0].getElementsByTagName('font')[0].textContent;
		player.members.name[j] = document.getElementById('startcontent2').getElementsByTagName('tbody')[1].getElementsByTagName('tr')[j+2].getElementsByTagName('td')[1].textContent;
		player.members.points.points[j] = document.getElementById('startcontent2').getElementsByTagName('tbody')[1].getElementsByTagName('tr')[j+2].getElementsByTagName('td')[2].innerHTML.split('<br>')[0];
		player.members.points.fleet[j] = document.getElementById('startcontent2').getElementsByTagName('tbody')[1].getElementsByTagName('tr')[j+2].getElementsByTagName('td')[2].getElementsByTagName('font')[0].textContent;
		j++;
	}
}
//**** FIN DE RENSEIGNEMENT DES OBJETS****//

//Création du BBCode correspondant aux données récupérées
function giveConvP()
{
	//TITRES
	var textFinal = '[size=24][color=#33FF33][b][u]' + titre + '[/u][/b][/color][/size]\n[font=Courier New, monospace]';

	textFinal += '\n';
	textFinal += processLine(enTeteDetails , player.data.points);
	textFinal += processLine(enTeteDetails , player.data.eco);
	textFinal += processLine(enTeteDetails , player.data.fleet);
	textFinal += processLine(enTeteDetails , player.data.research);
	textFinal += '\n\n';
	
	if(type == 'player')
	{
		// PLANETES
		textFinal += '[color=#cccccc][b][size=18]' + titrePlanet +':[/size][/b][/color]\n';
		textFinal += '[b][color=white]'+enTetePlanet[0]+' ---- '+enTetePlanet[1]+'[/color][/b]\n';
		var tmp;
		var tmp2;
		var tmp3;
		//Contenu
		for( i=0 ; i< player.planets.coords.length ; i++)
		{
			tmp = player.planets.coords[i].split(" ")[0];
			if(parseInt(tmp.split(":")[2]) < 10)
			{
				tmp = tmp.split(":")[0] +':'+tmp.split(":")[1] +':0'+tmp.split(":")[2];
			}
			tmp2 = player.planets.coords[i].split(" ")[1];
			tmp3 = player.planets.name[i].split(" ")[1].split(" ")[0];
			textFinal += '[b][color=#00CCCC]'+tmp+'[/color] [color=white]'+tmp2+' --- '+tmp3+'[/color][/b]\n';
		}
	}
	if(type == 'ally')
	{
		// MEMBRES
		textFinal += '[font=Courier New, monospace][color=#cccccc][b][size=18]' + titrePlanet +':[/size][/b][/color]\n';
		//Titres des colonnes
		textFinal += '[b][color=white]'+enTetePlanet[0]+' '+getTirets(maxLength(player.members.rank.points,String(enTetePlanet[0]).length),String(enTetePlanet[0]).length)+' '+enTetePlanet[1]+' '+getTirets(maxLength(player.members.rank.fleet,String(enTetePlanet[1]).length),String(enTetePlanet[1]).length)+' '+enTetePlanet[2]+' '+getTirets(maxLength(player.members.name,String(enTetePlanet[2]).length),String(enTetePlanet[2]).length)+' '+enTetePlanet[3]+' '+getTirets(maxLength(player.members.points.points,String(enTetePlanet[3]).length),String(enTetePlanet[3]).length)+' '+enTetePlanet[4]+'[/color][/b]\n';
		//Contenu
		for( i=0 ; i< player.members.name.length ; i++)
		{
			textFinal += '[b][color=#ffcc99]'+player.members.rank.points[i]+'[/color] '+getTirets(maxLength(player.members.rank.points,String(enTetePlanet[0]).length),String(player.members.rank.points[i]).length)+' [color=#FFCC99]'+player.members.rank.fleet[i]+'[/color] '+getTirets(maxLength(player.members.rank.fleet,String(enTetePlanet[1]).length),String(player.members.rank.fleet[i]).length)+' [color=#00CCCC]'+player.members.name[i]+'[/color] '+getTirets(maxLength(player.members.name,String(enTetePlanet[2]).length),String(player.members.name[i]).length)+' [color=#33FF33]'+player.members.points.points[i]+'[/color] '+getTirets(maxLength(player.members.points.points,String(enTetePlanet[3]).length),String(player.members.points.points[i]).length)+' [color=#FFCC66]'+player.members.points.fleet[i]+'[/color][/b]\n';
		}
	}
	textFinal +='[/font]';
	if(type == 'player')
	{
		//Insertion sous la pub
		if(!document.getElementById('rectangle').getElementsByTagName("textarea")[0])
		{
			document.getElementById('rectangle').innerHTML += '<br><textarea cols="86" rows="3"></textarea>';
		}
		document.getElementById('rectangle').getElementsByTagName("textarea")[0].value = textFinal;
	}
	if(type == 'ally')
	{
		//Insertion en bas de page
		if(!document.getElementById('startcontent2').getElementsByTagName("p")[0].getElementsByTagName("textarea")[0])
		{
			document.getElementById('startcontent2').getElementsByTagName("p")[0].innerHTML += '<br><textarea cols="86" rows="3"></textarea>';
			document.getElementById('startcontent2').getElementsByTagName("p")[0].getElementsByTagName("textarea")[0].value = textFinal;
		}
	}
	
}
//Donne la couleur appropriée en BBCode de la variation. Vert pour + et rouge pour -
function convVariation(text)
{
	var t = String(text);
	if(t[0] == '-')
	{
		return '[color=red]' + text +'[/color]';
	}
	else
	{
		return '[color=#33FF33]+' + text +'[/color]';
	}
}
//retourne le nombre de tiret correspondant à la différence entre max et actual
function getTirets( v1 , v2)
{
	var text = '--';
	var n=0
	var diff = v1-v2;
	if(diff > 0)
	{
		while(n < diff )
		{
			text +='-';
			n++;
		}
	}
	return text;
}
//Convertit en BBCode une ligne des détails d'un joueur ou d'une ally
function processLine( tab1 , tab2)
{
	var textFinal ='';
	textFinal += '[b][color=white]';
	for(i = 0; i<7 ; i++)
	{
		if(i!=6)
		{
			if( (tab2[i][0] != '-') && (i==4 || i==5))
			{
				textFinal += tab1[i] + ' ' + getTirets(String(tab2[i]).length +1,String(tab1[i]).length )+ ' ';
			}
			else
			{
				textFinal += tab1[i] + ' ' + getTirets(String(tab2[i]).length ,String(tab1[i]).length )+ ' ';
			}
		}
		else
		{
			textFinal += tab1[i];
		}
	}
	textFinal+='\n';
	for(i = 0; i<7 ; i++)
	{
		switch(i)
		{
			case 0 : textFinal += '[color=white]'+tab2[i] + '[/color] ';					//Rang
				break;
			case 1 : textFinal += '[color=#00CCCC]'+tab2[i] + '[/color] ';					//Nom
				break;
			case 2 : textFinal += '[color=#33FF33]'+tab2[i] + '[/color] ';					//Alliance
				break
			case 4 :																		//Accroissement
			case 5 : textFinal += convVariation(tab2[i])+' ';								//par jour
				break;
			case 3 : textFinal += '[color=white][i]'+tab2[i] + '[/i][/color] ';				//Période
				break;
			case 6 : textFinal += '[color=white][size=18]'+tab2[i] + '[/size][/color] ';	//Points
				break;
		}
		if(i!=6)
		{
			if( (tab2[i][0] != '-') && (i==4 || i==5)) //Si Accroissement positif et colonne d'accroissement et par jour
			{
				textFinal += getTirets(String(tab1[i]).length,String(tab2[i]).length+1)+ ' ';
			}
			else
			{
				textFinal += getTirets(String(tab1[i]).length,String(tab2[i]).length)+ ' ';
			}
		}
	}
	textFinal += '[/color][/b]';
	textFinal+='\n';
	
	return textFinal;
}
//Retourne la longueur de l'élement le plus long du tableau
function maxLength( tab , init)
{
	max = init;
	for(j=0 ; j< tab.length ; j++)
	{
		if( String(tab[j]).length > max)
		{
			max = String(tab[j]).length;
		}
	}
	return max;
}

//Ajout bouton d'export
document.getElementById('startcontent2').getElementsByClassName('small')[0].innerHTML += '<br><span id="detailsConverter"></span>';
var button = document.getElementById('detailsConverter');
button.addEventListener("click",giveConvP, false); 
button.innerHTML = '<i>--> Export</i>';