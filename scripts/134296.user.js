// ==UserScript==
// @name           InfuzaTopConverter
// @namespace      Sylver
// @include        http://www.infuza.com/*/*/*
// ==/UserScript==

//Si le tableau (top 20) des progressions existe
var tablename="tableTop";

if(document.getElementsByClassName(tablename)[0])
{
	
	
	function processTop20(idx)
	{
		if(!document.getElementById('InfuzaTopConverterOutput'))
		{
			var textarea = document.createElement("textarea");
			textarea.setAttribute("id","InfuzaTopConverterOutput");
			textarea.setAttribute("cols","100");
			textarea.setAttribute("rows","1");
			document.getElementsByClassName('row')[0].insertBefore(textarea, document.getElementsByClassName('linia2')[0]);
		}
		//Ajout du bouton d'export
		if(!document.getElementById('InfuzaTopConverterButtons'))
		{
			var div = document.createElement("div");
			div.setAttribute("id","InfuzaTopConverterButtons");
			div.setAttribute("style",'font-family: "Courier New", Courier, mono;');
			document.getElementsByClassName('row')[0].insertBefore(div, document.getElementsByClassName('linia2')[0]);
		}
		
		var export_text = "";
		var export_title = "";
		var sep_in = "<font style='color:#cccccc;'>--||--</font>";
		var sep_between = "<font style='color:#cccccc;'>|----|</font>";
		switch(idx)
		{
			case 0: export_text =  "(J-Rs-A)"+sep_in; export_title = "Joueurs : Ressources : Accroissement";
				break;
			case 1: export_text = "(J-Rs-P)"+sep_in; export_title = "Joueurs : Ressources : Points";
				break;
			case 2: export_text = "(J-Rs-AM)"+sep_between; export_title = "Joueurs : Ressources : Accroissement par mois";
				break;
			case 3: export_text = "(J-F-A)"+sep_in; export_title = "Joueurs : Flotte : Accroissement";
				break;
			case 4: export_text = "(J-F-P)"+sep_in; export_title = "Joueurs : Flotte : Points";
				break;
			case 5: export_text = "(J-F-AM)<br/>"; export_title = "Joueurs : Flotte : Accroissement par mois";
				break;
			case 6: export_text = "(J-Rc-A)"+sep_in; export_title = "Joueurs : Recherche : Accroissement";
				break;
			case 7: export_text = "(J-Rc-P)"+sep_in; export_title = "Joueurs : Recherche : Points";
				break;
			case 8: export_text = "(J-Rc-AM)"+sep_between; export_title = "Joueurs : Recherche : Accroissement par mois";
				break;
			case 9: export_text = "(J-E-A)"+sep_in; export_title = "Joueurs : Economie : Accroissement";
				break;
			case 10: export_text = "(J-E-P)"+sep_in; export_title = "Joueurs : Economie : Points";
				break;
			case 11: export_text = "(J-E-AM)<br/>"; export_title = "Joueurs : Economie : Accroissement par mois";
				break;
			case 12: export_text =  "(A-Rs-A)"+sep_in; export_title = "Alliances : Ressources : Accroissement";
				break;
			case 13: export_text = "(A-Rs-P)"+sep_in; export_title = "Alliances : Ressources : Points";
				break;
			case 14: export_text = "(A-Rs-AM)"+sep_between; export_title = "Alliances : Ressources : Accroissement par mois";
				break;
			case 15: export_text = "(A-F-A)"+sep_in; export_title = "Alliances : Flotte : Accroissement";
				break;
			case 16: export_text = "(A-F-P)"+sep_in; export_title = "Alliances : Flotte : Points";
				break;
			case 17: export_text = "(A-F-AM)<br/>"; export_title = "Alliances : Flotte : Accroissement par mois";
				break;
			case 18: export_text = "(A-Rc-A)"+sep_in; export_title = "Alliances : Recherche : Accroissement";
				break;
			case 19: export_text = "(A-Rc-P)"+sep_in; export_title = "Alliances : Recherche : Points";
				break;
			case 20: export_text = "(A-Rc-AM)"+sep_between; export_title = "Alliances : Recherche : Accroissement par mois";
				break;
			case 21: export_text = "(A-E-A)"+sep_in; export_title = "Alliances : Economie : Accroissement";
				break;
			case 22: export_text = "(A-E-P)"+sep_in; export_title = "Alliances : Economie : Points";
				break;
			case 23: export_text = "(A-E-AM)"; export_title = "Alliances : Economie : Accroissement par mois";
				break;
			default : export_text = "export"+sep_in; export_title = "export";
			break;
				
		}
		
		//Ajout du bouton d'export
		var button = document.createElement("span");
		button.setAttribute("id","InfuzaTopConverter"+idx);
		button.setAttribute("title",export_title);
		//button.setAttribute("onClick","processTop20(0);");
		button.addEventListener("click",giveConv, false); 
		button.innerHTML = '<font color=black><i>'+export_text+'</i></font>';
		document.getElementById("InfuzaTopConverterButtons").appendChild(button);
		
	
		var enTete = new Array();
		var rank = new Array();
		var prog = new Array();
		var name = new Array();
		var ally = new Array();

		//Titres des colonnes'+
		enTete[0] = trim2(document.getElementsByClassName(tablename)[idx].getElementsByTagName("th")[0].textContent);
		enTete[1] = trim2(document.getElementsByClassName(tablename)[idx].getElementsByTagName("th")[1].textContent);
		enTete[2] = trim2(document.getElementsByClassName(tablename)[idx].getElementsByTagName("th")[2].textContent);
		enTete[3] = trim2(document.getElementsByClassName(tablename)[idx].getElementsByTagName("th")[3].textContent);
		enTete[4] = trim2(document.getElementsByClassName(tablename)[idx].getElementsByTagName("th")[4].textContent);
		
		var i=0;
		//Récupération du contenu du tableau
		while(document.getElementsByClassName(tablename)[idx].getElementsByTagName("tr")[i+1])
		{
			rank[i] = trim2(document.getElementsByClassName(tablename)[idx].getElementsByTagName("tr")[i+1].getElementsByTagName("td")[0].textContent);
			prog[i] = trim2(document.getElementsByClassName(tablename)[idx].getElementsByTagName("tr")[i+1].getElementsByTagName("td")[1].textContent);
			name[i] = trim2(document.getElementsByClassName(tablename)[idx].getElementsByTagName("tr")[i+1].getElementsByTagName("td")[2].textContent);
			ally[i] = trim2(document.getElementsByClassName(tablename)[idx].getElementsByTagName("tr")[i+1].getElementsByTagName("td")[3].textContent);
			fini[i] = trim2(document.getElementsByClassName(tablename)[idx].getElementsByTagName("tr")[i+1].getElementsByTagName("td")[4].textContent);
		
			if(parseInt(rank[i]) < 10)
			{
				rank[i] = '0'+String(rank[i]);
			}
			i++;
		}
		//Conversion en BBCode des données récupérées
		function giveConv()
		{
			var textFinal = "[size=18][b][color=white]"+enTete[0]+" - "+enTete[1]+" - "+enTete[2]+" - "+enTete[3]+"[/color][/b][/size]\n\n[font=Courier New, monospace]";
			//Insertion de chaque ligne
			for(i = 0 ; i < rank.length ; i++)
			{
				textFinal += "[b][color=white]"+rank[i]+"[/color] -- [color=#33FF33]"+prog[i]+"[/color] "+getTirets(prog[0].length,prog[i].length)+" [color=#00CCCC]"+name[i]+"[/color] "+getTirets( maxLength(name), String(name[i]).length)+" [color=#33FF33]"+ally[i]+"["+fini[i]+"][/color][/b]\n";
			}
			textFinal+="[/font]";
			
			//ajout du textarea contenant le texte
			document.getElementById("InfuzaTopConverterOutput").value = textFinal;
		}
		//giveConv();

	
		
	}
	var i = 0;
	for(i=0 ; i< 24 ; i++)
	{
		processTop20(i);
	}
}
//***
if( location.href.indexOf('/Alliances/') > -1 )
{	
	var s = location.href.split("Alliances/")[1];
	
	if( !isNaN(parseInt(s)))
	{
		if(!document.getElementById('InfuzaTopConverterOutput'))
		{
			var textarea = document.createElement("textarea");
			textarea.setAttribute("id","InfuzaTopConverterOutput");
			textarea.setAttribute("cols","100");
			textarea.setAttribute("rows","1");
			document.getElementsByClassName('row')[0].insertBefore(textarea, document.getElementsByClassName('col')[0]);
		}
	
		var i;
		var j = 0;
		
		var enTeteAlly = new Array();
		var bodyAlly = new Array();
		var enTetePlayer = new Array();
		var rankAlly = new Array();
		var name = new Array();
		var totalPoints = new Array();
		var pointsUp = new Array();
		var totalEco = new Array();
		var ecoUp = new Array();
		var totalFleet = new Array();
		var fleetUp = new Array();		
		var totalRes = new Array();
		var resUp = new Array();
		var incrRes = new Array();
		
		var enTete = new Array();
		var bordure = new Array();
		var corps = new Array();
		var playerInfos = new Array();
			
			playerInfos[0] = document.getElementsByClassName("row")[0].getElementsByTagName("h3")[0].textContent;
			
			for(var i = 0 ; i < 3 ; i++)
			{
				bordure[i] = trim2(document.getElementsByClassName("tableTop1")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].textContent);
			}
			for( var i = 0 ; i < 4 ; i++)
			{
				enTete[i]= trim2(document.getElementsByClassName("tableTop1")[0].getElementsByTagName("thead")[0].getElementsByTagName("td")[i+1].textContent);
				for(var j=0; j < 3 ; j++)
				{
					corps[j+(i*3)]= trim2(document.getElementsByClassName("tableTop1")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[i+1].textContent);
				}
			}
			
			// Récupération de l'en-tête générale de l'alliance
		for (i=0 ; i<10 ; i++)
		{
			enTetePlayer[i] = trim2(document.getElementById("alliancePlayers").getElementsByTagName("tr")[0].getElementsByTagName("th")[i].textContent);
		}
			//--> 'corps' organisé par colonnes !!
		// Récupération des détails des membres de l'alliance
		j=0;
		while( document.getElementById("alliancePlayers").getElementsByTagName("tr")[j+1])
		{
			rankAlly[j] = trim2(document.getElementById("alliancePlayers").getElementsByTagName("tr")[j+1].getElementsByTagName("td")[0].getElementsByTagName("span")[1].textContent);
			name[j] = trim2(document.getElementById("alliancePlayers").getElementsByTagName("tr")[j+1].getElementsByTagName("td")[1].getElementsByTagName("span")[1].textContent);
			totalPoints[j] = trim2(document.getElementById("alliancePlayers").getElementsByTagName("tr")[j+1].getElementsByTagName("td")[2].getElementsByTagName("span")[1].textContent);
			pointsUp[j] = trim2(document.getElementById("alliancePlayers").getElementsByTagName("tr")[j+1].getElementsByTagName("td")[3].getElementsByTagName("span")[1].textContent);
			totalEco[j] = trim2(document.getElementById("alliancePlayers").getElementsByTagName("tr")[j+1].getElementsByTagName("td")[4].getElementsByTagName("span")[1].textContent);
			ecoUp[j] = trim2(document.getElementById("alliancePlayers").getElementsByTagName("tr")[j+1].getElementsByTagName("td")[5].getElementsByTagName("span")[1].textContent);
			totalFleet[j] = trim2(document.getElementById("alliancePlayers").getElementsByTagName("tr")[j+1].getElementsByTagName("td")[6].getElementsByTagName("span")[1].textContent);
			fleetUp[j] = trim2(document.getElementById("alliancePlayers").getElementsByTagName("tr")[j+1].getElementsByTagName("td")[7].getElementsByTagName("span")[1].textContent);
			totalRes[j] = trim2(document.getElementById("alliancePlayers").getElementsByTagName("tr")[j+1].getElementsByTagName("td")[8].getElementsByTagName("span")[1].textContent);
			resUp[j] = trim2(document.getElementById("alliancePlayers").getElementsByTagName("tr")[j+1].getElementsByTagName("td")[9].getElementsByTagName("span")[1].textContent);
			j++;
		}
		
		// Chaines trop longues -> On remplace.
		enTetePlayer[0] = 'Rank Ally #';
		enTetePlayer[7] = 'Up -->';
		enTetePlayer[9] = 'Rech. Points';
		enTetePlayer[9] = 'Up -->';
		
		function giveConv()
		{
			var i ;
			var textFinal = '[font=Courier New, monospace][size=12][color=white]';
			//**** PARTIE GENERALE ALLIANCE ****//
			//** Partie Génerake Alliance
			
			var tab1 = new Array("--------", bordure[0],bordure[1],bordure[2]);
			var tab2 = new Array(enTete[0], corps[0],corps[1],corps[2]);
			var tab3 = new Array(enTete[1], corps[3],corps[4],corps[5]);
			var tab4 = new Array(enTete[2], corps[6],corps[7],corps[8]);
			var tab5 = new Array(enTete[3], corps[9],corps[10],corps[11]);
			
			textFinal += "[size=24][b][color=#cc9933]"+playerInfos[0]+"][/color][/b][/size]\n";
			textFinal += "---------"+ getTirets(maxLength(tab1),tab1[0].length)+' '+ "[color=#00CCCC]"+enTete[0] +"[/color]"+ ' '+ getTirets(maxLength(tab2),tab2[0].length)+' '+ "[color=#00CCCC]"+enTete[1] +"[/color]"+  ' '+getTirets(maxLength(tab3),tab3[0].length)+' '+"[color=#00CCCC]"+enTete[2] +"[/color]"+  ' '+getTirets(maxLength(tab4),tab4[0].length)+' '+"[color=#00CCCC]"+enTete[3] +"[/color]"+ '\n';
			textFinal += "[color=#00CCCC]"+ bordure[0] +"[/color]"+ ' '+getTirets(maxLength(tab1),tab1[1].length)+' '+  convDiff(corps[0]) +  ' '+ getTirets(maxLength(tab2),tab2[1].length)+' '+  convDiff(corps[3]) + ' '+getTirets(maxLength(tab3),tab3[1].length)+' '+  convDiff(corps[6]) + ' '+getTirets(maxLength(tab4),tab4[1].length)+' '+ convDiff(corps[9]) + '\n'; 
			textFinal += "[color=#00CCCC]"+bordure[1] +"[/color]"+ ' '+getTirets(maxLength(tab1),tab1[2].length)+' '+  convDiff(corps[1]) +  ' '+ getTirets(maxLength(tab2),tab2[2].length)+' '+  convDiff(corps[4]) +  ' '+getTirets(maxLength(tab3),tab3[2].length)+' '+  convDiff(corps[7]) + ' '+getTirets(maxLength(tab4),tab4[2].length)+' '+ convDiff(corps[10]) + '\n';
			textFinal += "[color=#00CCCC]"+bordure[2] +"[/color]"+ ' '+getTirets(maxLength(tab1),tab1[3].length)+' '+ corps[2] +  ' '+getTirets(maxLength(tab2),tab2[3].length)+' '+ corps[5] +  ' '+getTirets(maxLength(tab3),tab3[3].length)+' '+ corps[8] + ' '+getTirets(maxLength(tab4),tab4[3].length)+' '+ corps[11] + '\n'; 			
			textFinal += "[/font]";
			//--------------------------------------------------------------------------------------
			//**** PARTIE JOUEURS
			//*** Partie Points & eco
			//--- TITRES
			textFinal += '\n\n';
			textFinal += enTetePlayer[0]+' '+getTirets(maxLength(rankAlly),enTetePlayer[0].length)+' '+enTetePlayer[1]+' '+getTirets(maxLength(name),enTetePlayer[1].length)+' '+enTetePlayer[2]+' '+getTirets(maxLength(totalPoints),enTetePlayer[2].length)+' '+enTetePlayer[3]+' '+getTirets(maxLength(pointsUp),enTetePlayer[3].length)+' '+enTetePlayer[4]+' '+getTirets(maxLength(totalEco),enTetePlayer[4].length)+' '+enTetePlayer[5];
			//--- CORPS
			textFinal += '\n';
			for( i = 0 ; i < name.length ; i++)
			{
				textFinal += rankAlly[i] +' '+getTirets(Math.max(enTetePlayer[0].length,maxLength(rankAlly)) ,rankAlly[i].length)+ ' [color=#00CCCC]'+name[i] + '[/color] '+getTirets(Math.max(maxLength(name),enTetePlayer[1].length),name[i].length)+' '+ totalPoints[i] +' '+getTirets(Math.max(enTetePlayer[2].length,maxLength(totalPoints)),totalPoints[i].length)+' '+ convVariation(pointsUp[i]) +' '+getTirets(Math.max(maxLength(pointsUp),enTetePlayer[3].length),pointsUp[i].length)+ ' '+totalEco[i]+' '+getTirets(Math.max(maxLength(totalEco),enTetePlayer[4].length),totalEco[i].length)+ ' '+convVariation(ecoUp[i])+'\n';
			}
			//*** Partie Flotte & recherce
			//--- TITRES
			textFinal += '\n\n';
			textFinal += enTetePlayer[1]+' '+getTirets(maxLength(name),enTetePlayer[1].length)+' '+enTetePlayer[6]+' '+getTirets(maxLength(totalFleet),enTetePlayer[6].length)+' '+enTetePlayer[7]+' '+getTirets(maxLength(fleetUp),enTetePlayer[7].length)+' '+enTetePlayer[8]+' '+getTirets(maxLength(totalRes),enTetePlayer[8].length)+' '+enTetePlayer[9];
			textFinal += '\n';
			//--- CORPS
			for( i = 0 ; i < name.length ; i++)
			{
				textFinal += ' [color=#00CCCC]'+name[i] + '[/color] '+getTirets(Math.max(maxLength(name),enTetePlayer[1].length),name[i].length)+' '+totalFleet[i] + ' '+getTirets(Math.max(maxLength(totalFleet),enTetePlayer[6].length),totalFleet[i].length)+' '+ convVariation(fleetUp[i]) +' '+getTirets(Math.max(enTetePlayer[7].length,maxLength(fleetUp)),fleetUp[i].length)+' '+ totalRes[i] +' '+getTirets(Math.max(maxLength(totalRes),enTetePlayer[8].length),totalRes[i].length)+ ' '+convVariation(resUp[i])+'\n';
			}
			//****
			textFinal +='[/color][/size][/font]';
			//ajout du textarea contenant le texte
			document.getElementById('InfuzaTopConverterOutput').value = textFinal;
		}
		
		var button = document.createElement("div");
		button.setAttribute("id","InfuzaTopConverterExport");
		button.addEventListener("click",giveConv, false); 
		button.innerHTML = '<font style="color:#333333"><i>--> Export</i></font>';
		document.getElementsByClassName('row')[0].insertBefore(button, document.getElementsByClassName('col')[0]);
	}
}
//Si en partie description d'un joueur
if( location.href.indexOf('/Players/') > -1 )
{
	var s = location.href.split("Players/")[1];
	if( !isNaN(parseInt(s)))
	{
	
		
		
		if(!document.getElementById('InfuzaTopConverterOutput'))
		{
			var textarea = document.createElement("textarea");
			textarea.setAttribute("id","InfuzaTopConverterOutput");
			textarea.setAttribute("cols","100");
			textarea.setAttribute("rows","1");
			document.getElementsByClassName('row')[0].insertBefore(textarea, document.getElementsByClassName('col')[0]);
		}
		
		var enTete = new Array();
		var bordure = new Array();
		var corps = new Array();
		var playerInfos = new Array();
		function playerConv()
		{
			
			playerInfos[0] = document.getElementsByClassName("row")[0].getElementsByTagName("h3")[0].textContent;
			playerInfos[1] = document.getElementsByClassName("row")[0].getElementsByTagName("h3")[1].textContent;
			
			for(var i = 0 ; i < 3 ; i++)
			{
				bordure[i] = trim2(document.getElementsByClassName("tableTop1")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].textContent);
			}
			for( var i = 0 ; i < 4 ; i++)
			{
				enTete[i]= trim2(document.getElementsByClassName("tableTop1")[0].getElementsByTagName("thead")[0].getElementsByTagName("td")[i+1].textContent);
				for(var j=0; j < 3 ; j++)
				{
					corps[j+(i*3)]= trim2(document.getElementsByClassName("tableTop1")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[j].getElementsByTagName("td")[i+1].textContent);
				}
			}
			//--> 'corps' organisé par colonnes !!
			
			var textFinal = '';
			var tab1 = new Array("--------", bordure[0],bordure[1],bordure[2]);
			var tab2 = new Array(enTete[0], corps[0],corps[1],corps[2]);
			var tab3 = new Array(enTete[1], corps[3],corps[4],corps[5]);
			var tab4 = new Array(enTete[2], corps[6],corps[7],corps[8]);
			var tab5 = new Array(enTete[3], corps[9],corps[10],corps[11]);

			textFinal = "[font=Courier New, monospace]";
			textFinal += "[size=24][b][color=#cc9933]"+playerInfos[0]+ "["+playerInfos[1]+"][/color][/b][/size]\n";
			textFinal += "---------"+ getTirets(maxLength(tab1),tab1[0].length)+' '+ "[color=#00CCCC]"+enTete[0] +"[/color]"+ ' '+ getTirets(maxLength(tab2),tab2[0].length)+' '+ "[color=#00CCCC]"+enTete[1] +"[/color]"+  ' '+getTirets(maxLength(tab3),tab3[0].length)+' '+"[color=#00CCCC]"+enTete[2] +"[/color]"+  ' '+getTirets(maxLength(tab4),tab4[0].length)+' '+"[color=#00CCCC]"+enTete[3] +"[/color]"+ '\n';
			textFinal += "[color=#00CCCC]"+ bordure[0] +"[/color]"+ ' '+getTirets(maxLength(tab1),tab1[1].length)+' '+  convDiff(corps[0]) +  ' '+ getTirets(maxLength(tab2),tab2[1].length)+' '+  convDiff(corps[3]) + ' '+getTirets(maxLength(tab3),tab3[1].length)+' '+  convDiff(corps[6]) + ' '+getTirets(maxLength(tab4),tab4[1].length)+' '+ convDiff(corps[9]) + '\n'; 
			textFinal += "[color=#00CCCC]"+bordure[1] +"[/color]"+ ' '+getTirets(maxLength(tab1),tab1[2].length)+' '+  convDiff(corps[1]) +  ' '+ getTirets(maxLength(tab2),tab2[2].length)+' '+  convDiff(corps[4]) +  ' '+getTirets(maxLength(tab3),tab3[2].length)+' '+  convDiff(corps[7]) + ' '+getTirets(maxLength(tab4),tab4[2].length)+' '+ convDiff(corps[10]) + '\n';
			textFinal += "[color=#00CCCC]"+bordure[2] +"[/color]"+ ' '+getTirets(maxLength(tab1),tab1[3].length)+' '+ corps[2] +  ' '+getTirets(maxLength(tab2),tab2[3].length)+' '+ corps[5] +  ' '+getTirets(maxLength(tab3),tab3[3].length)+' '+ corps[8] + ' '+getTirets(maxLength(tab4),tab4[3].length)+' '+ corps[11] + '\n'; 			
			textFinal += "[/font]";
			
			//ajout du textarea contenant le texte
			document.getElementById('InfuzaTopConverterOutput').value = textFinal;
		}
		
		var button = document.createElement("div");
		button.setAttribute("id","InfuzaTopConverterExport");
		button.addEventListener("click",playerConv, false); 
		button.innerHTML = '<font style="color:#333333"><i>--> Export</i></font>';
		document.getElementsByClassName('row')[0].insertBefore(button, document.getElementsByClassName('col')[0]);
		
		
	}
}

//--------------------------------------------------------------------------------------------------
//**** FONCTIONS
//retourne le nombre de tiret correspondant à la différence entre max et actual
function getTirets( max , actual)
{
	var text = '--';
	var n=0
	while(n < (max-actual) )
	{
		text +='-';
		n++;
	}
	return text;
}
//Retourne la longueur de l'élement le plus long du tableau
function maxLength( tab )
{
	max = 0;
	for(j=0 ; j< tab.length ; j++)
	{
		if( String(tab[j]).length > max)
		{
			max = String(tab[j
			]).length;
		}
	}
	return max;
}

//Supprime les espaces d'une chaine avant la première lettre ainsi qu'après à partir du premier \n
function trim3(s)
{
	var i = 0; //Position première lettre
	var j = 0;
	var n = 0;
	var s2 ='';
	// Jusqu'à un caractère autre que espace ou \n
	while( (s[n] == " " || s[n] == "\n") && n < s.length)
	{
		n++;
	}
	// Si la chaine n'est pas vide de caractère
	if(n < s.length)
	{
		i = n;
	}
	n++;
	//Recherche de la fin des caractères (premier \n)
	while(s[n] != '\n' && n < s.length)
	{
		n++;
	}
	//Si il y un \n
	if(n < s.length)
	{
		j = n;
	}
	// Si il y a des caractères trouvés
	if(i != 0)
	{
		if(j == 0)
		{
			j = s.length-1;
		}
		//Création de la nouvelle chaine allant du premier caractère trouvé au dernier
		for (n=i ; n < j+1 ; n++)
		{
			s2 += s[n];
		}
	}
	// S'il n'y a aucune transformation à faire, on ne change rien
	else
	{
		s2 = s;
	}
	return s2;
	
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
		return '[color=#33FF33]' + text +'[/color]';
	}
}

// Convertie un texte de la forme xxxxxx +xxx ou xxxxx -xxx en une forme colorée
function convDiff(s)
{
	var text = '';
	if( s.indexOf('+') > -1 )
	{
		text = s.split('+')[0] + '[color=#00CC33]+' + s.split('+')[1] + '[/color]';
	}
	else if( s.indexOf('-') > -1 )
	{
		
		text = s.split('-')[0] + '[color=#FF0000]-' + s.split('-')[1] + '[/color]';
	}
	else
	{
		text = "  "+s;
	}
	return text.replace('\n',"");
}
function trim2 (s)
{
	return s.replace(/\s+$/g,'').replace(/\s{2,}/g,'').replace(/\s+$/g,'').replace(/^\s+/, '');
}