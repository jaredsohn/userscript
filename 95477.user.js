// ==UserScript==
// @name           TopFlopConverter
// @namespace      Sylver
// @include        http://www.war-riders.de/*/*/
// @include        http://www.war-riders.de/*/*/main
// @include		   http://www.war-riders.de/?lang=*
// @include        http://www.war-riders.de/
// ==/UserScript==

//********* CONSTRUCTION DE L'OBJET************
var data = new Array();
data.rank = // Classement des joueurs
{
	tabTop : new Array(),
	tabFlop : new Array(),
}
data.names = // Pseudo des joueurs
{
	tabTop : new Array(),
	tabFlop : new Array(),
}
data.ally = // Alliance des joueurs
{
	tabTop : new Array(),
	tabFlop : new Array(),
}
data.points = // Points finaux des joueurs
{
	tabTop : new Array(),
	tabFlop : new Array(),
}
data.variation = // Variation des joueurs
{
	tabTop : new Array(),
	tabFlop : new Array(),
}
//************* RECUPERATION DES DONNEES***********
//------- CLASSEMENTS
for( i=0 ; i < 3 ; i++)
{
	if(i == 0)
	{
		data.rank.tabTop[i] = parseInt(document.getElementById("innertop").innerHTML.replace(" ","").split('<font class="tops">')[i]);
		data.rank.tabFlop[i] = parseInt(document.getElementById("innerflop").innerHTML.replace(" ","").split('<font class="tops">')[i]);
	}
	else
	{
		data.rank.tabTop[i] = parseInt(document.getElementById("innertop").innerHTML.replace(" ","").split('<font class="tops">')[i*2].split("<br>")[1]);
		data.rank.tabFlop[i] = parseInt(document.getElementById("innerflop").innerHTML.replace(" ","").split('<font class="tops">')[i*2].split("<br>")[1]);
	}
}
//---------- PSEUDOS
for( i=0 ; i < 3 ; i++)
{
	data.names.tabTop[i] = document.getElementById("innertop").getElementsByTagName("a")[i*2].textContent;
	data.names.tabFlop[i] = document.getElementById("innerflop").getElementsByTagName("a")[i*2].textContent;
}
//---------- ALLIANCES
for( i=0 ; i < 3 ; i++)
{
	data.ally.tabTop[i] = document.getElementById("innertop").getElementsByTagName("a")[(i*2)+1].textContent;
	data.ally.tabFlop[i] = document.getElementById("innerflop").getElementsByTagName("a")[(i*2)+1].textContent;
}
//---------- POINTS
for( i=0 ; i < 3 ; i++)
{
	data.points.tabTop[i] = document.getElementById("innertop").innerHTML.split('<font class="tops"><font')[i].split('</a></font> ')[1];
	data.points.tabFlop[i] = document.getElementById("innerflop").innerHTML.split('<font class="tops"><font')[i].split('</a></font> ')[1];
}
//---------- VARIATION
for( i=0 ; i < 3 ; i++)
{
	data.variation.tabTop[i] = document.getElementById("innertop").getElementsByClassName("green")[i].textContent;
	data.variation.tabFlop[i] = document.getElementById("innerflop").getElementsByClassName("red")[i].textContent;
}
//********* FONCTIONS********
// Calcule le pourcentage de progression ou de regression.
function calcRapport( points , variation )
{
	var pointsInit; // Points avant variation
	var pointsFin = parseInt(points.replace(/\./g,"")); //Récupération des points après variation sans les '.'
	var v = parseInt(variation.replace(variation[0] , "").replace(/\./g,"")); // Récupération de la variation sans les '.'
	if( variation[0]  == "+") // Si c'est un top
		pointsInit = pointsFin - v; //On enlève les points gagnés
	else // Si c'est un flop
		pointsInit = pointsFin + v; // On rajoute les points perdus
	var prct = String((Math.round((v / pointsInit)*10000))/100); //Calcul du pourcentage avec 3 décimales
	prct += " %"; 

	return (prct);
}
// Met en forme les données récupérées d'un joueur au format BBCode
// TYPES : Flop : f ou F, Top = t ou T
// num : numéro du joueur dans la liste, varie entre 0 et 2
function miseEnFormeJoueur( type , num )
{
	var text = '';
	// Si c'est un Top
	if( type == 't' || type == 'T')
	{
		text += '[color=white]' + data.rank.tabTop[num] + " [/color]" + '[b][color=#00CCCC] '+ data.names.tabTop[num] +' [/color][color=#33FF33] '+ data.ally.tabTop[num] +' [/color][/b][color=white]'+data.points.tabTop[num] + ' [/color][b][color=#33FF33]'+data.variation.tabTop[num]+' [/color][color=#FF0000]>>[/color] +'+calcRapport(data.points.tabTop[num],data.variation.tabTop[num])+'[/b]\n'; // données du joueur en BBCode
	}
	//Si c'est un Flop
	else
	{
	text += '[color=white]' + data.rank.tabFlop[num] + " [/color]" + '[b][color=#00CCCC] '+ data.names.tabFlop[num] +' [/color][color=#33FF33] '+ data.ally.tabFlop[num] +' [/color][/b][color=white]'+data.points.tabFlop[num] + ' [/color][b][color=#FF0000]'+data.variation.tabFlop[num]+' [/color][color=#FF0000]>>[/color] -'+calcRapport(data.points.tabFlop[num],data.variation.tabFlop[num])+'[/b]\n'; // données du joueur en BBCode
	}
	
	return text;
}
function giveConv()
{
	//Récpération des en-têtes Flop/Top
	var textTop = document.getElementById('top').getElementsByTagName("h3")[0].textContent;
	var textFlop = document.getElementById('flop').getElementsByTagName("h3")[0].textContent;
	// Construction du texte retourné
	//Titre Top
	var textFinal = '[size=18][color=#99FF99][b]'+textTop+':[/b][/color][/size]\n';
	//Contenu Top
	for( i=0 ; i<3 ; i++)
	{
		textFinal += miseEnFormeJoueur( "t" , i );
	}
	//Titre Flop
	textFinal += '\n[size=18][color=#99FF99][b]'+textFlop+':[/b][/color][/size]\n';
	//Contenu Flop
	for( i=0 ; i<3 ; i++)
	{
		textFinal += miseEnFormeJoueur( "f" , i );
	}
	if(!document.getElementById('start2').getElementsByTagName("textarea")[0])
	{
		document.getElementById('start2').innerHTML += '<br><textarea cols="86" rows="3"></textarea>';
	}
	document.getElementById('start2').getElementsByTagName("textarea")[0].value = textFinal;
}
//--------------------------------------------------------------------------------------------------
//                                             SCRIPT
//--------------------------------------------------------------------------------------------------

document.getElementById('flop').innerHTML += '<span id="topFlopConverter"></span>';
var button = document.getElementById('topFlopConverter');
button.addEventListener("click",giveConv, false); 
button.innerHTML = '<i>--> Export</i>';

