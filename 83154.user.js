// ==UserScript==
// @name           OpenLog 3
// @namespace      vulca & modif By Kirua & modif by Sylver
// @include        http://ogame.*/
// @include        http://*.ogame.*/
// @include        http://ogame.*/#*
// @include        http://*.ogame.*/#*
// @exclude        http://ogame.*index*
// @exclude        http://board.ogame.*index*
// ==/UserScript==
if (navigator.userAgent.indexOf('Firefox')>-1)  // Identification du navigateur
{
	var FireFox = true; 
	var nomScript='';
}
else 											
{
	var FireFox = false;
	var nomScript='openLog3';
}

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
	if (typeof uneval === 'undefined') {
		uneval = function(obj) {
			return JSON.stringify(obj);
		}
	}

function getServer(server) // retourne le texte du nom du serveur à partir de son url
{
var uni=server.split('.')[0].split('ni')[1]
var uni= parseInt(uni);
if (uni < 100) // Si uni 1 à 65
{
	return ( 'Uni&nbsp;'+uni);
}
else
	switch ( uni )
	{
		case  101 : return('Andromeda');
		break;
		case  102: return('Barym');
		break;
		case  103: return('Capella');
		break;
		case  104: return('Draco');
		break;
		case  105: return('Electra');
		break;
		case  106: return('Fornax');
		break;
		case  107: return('Gemini');
		break;
		case  108: return('Hydra');
		break;
		case  109: return('Io');
		break;
		case  110: return('Jupiter');
		break;
		case  111: return('Kassiopeia');
		break;
		case  112: return('Leo');
		break;
		case  113: return('Mizar');
		break;
		case  114: return('Nekkar');
		break;
		case  115: return('Orion');
		break;
		case  116: return('Pegasus');
		break;
		case  117: return('Quantum');
		break;
		case  118: return('Rigel');
		break;
		case  119: return('Sirius');
		break;
		case  120: return('Taurus');
		break;
		case  121: return('Ursa');
		break;
		case  122: return('Vega');
		break;
		case  123: return('Wasat');
		break;
		case  124: return('Xalynth');
		break;
		case  125: return('Yakini');
		break;
		case  126: return('Zagrada');
		break;
		default : return('Undefined');
		break;
		}
		
			
}

//*****
function ajouter() // Ajoute un raccourci
{
	var table = eval(GM_getValue('table' , '[]' )); // récupération du tableau des raccourcis
	var server = document.getElementById('serverLogin').value; // récupération de l'url du serveur
	var log = prompt("Quel Login ? "); // demande du login
	if (log != null & log != undefined && log != '') // Teste si on a entré une valeur
	var password = prompt("Quel Mot de Passe ? "); // demande du mdp
	if ( log != null && password != null && log != undefined && password != undefined && log != '' && password != '') // test s'il y a une valeur
	{
	var tableau = new Array(log,password,server); // création d'un tableau
	table.push(tableau); // ajout du tableau aux raccourcis
	GM_setValue('table',uneval(table)); // sauvegarde
	alert('Le raccourci a été rajouté, veuillez recharger la page');
	}
	
}
//*****

function suppr() // Supprime un raccourci, on demande la position dans la liste du raccourci a supprimer
{
	var num = prompt("Quelle est la position de l'élément à supprimer ?"); 
	num = parseInt(num); // conversion en entier
	var table = eval(GM_getValue('table' , '[]' )); // recup tableau raccourcis
	if ( num < table.length+1) // si cette position existe ...
	{
		if ( num != table.length ) // Si ce n'est pas le dernier élement de la liste
		{
			for (i=(num-1) ; i< (table.length -1);i++) // on avance d'une ligne toutes les lignes suivantes (on écrase la ligne à suppr
			{
				
				table[i][0]=table[i+1][0];
				table[i][1]=table[i+1][1];
				table[i][2]=table[i+1][2];
				
			}
		}
		for (i=(table.length-1) ; i>0 ;i--) // on décalle toutes les lignes d'une ligne de plus
		{
			table[i][0]=table[i-1][0];
			table[i][1]=table[i-1][1];
			table[i][2]=table[i-1][2];
			
		}
		table.shift(); // on supprime la première ligne qui ne sert à rien
		GM_setValue('table',uneval(table)); // sauvegarde
		
		var fav = parseInt(GM_getValue('favorite',-1));
		if(fav != -1 && fav == num-1)
		{
			GM_setValue('favorite',-1);
		}
	}
	else // si mauvaise position
	{

		if (!isNaN(num))
		alert('Erreur de position');
	}
	

}

//******

function favorite()
{
	var favorite = prompt("Quelle est la postion de l'Univers que vous souhaitez choisir comme favori ? ");
	var table = eval(GM_getValue('table' , '[]' )); // recup tableau raccourcis
	if ( favorite < table.length+1 && favorite > -1)
	{
		if (favorite != 0)
		{
			if ( getServer(table[favorite-1][2]).split('&nbsp;')[1] != undefined)
			{
				alert("Vous avez choisi l'univers " + getServer(table[favorite-1][2]).split('&nbsp;')[1] );
			}
			else
			{
				alert("Vous avez choisi l'univers " + getServer(table[favorite-1][2]) );
			}
		}
		GM_setValue('favorite',(favorite-1));
	}
	else
	{
		alert('Erreur de position');
	}

}
//***********************************************
//*********************************************

// SCRIPT
document.getElementById('login').style.display = "block";

var table = new Array();
var favoriteUni = GM_getValue('favorite' , -2);
table = eval(GM_getValue('table' , 0 )); // recup tableau raccourcis
if ( favoriteUni > -1 && location.href.split('/#')[1] == undefined && table != 0)
{
	document.getElementById('usernameLogin').value = table[favoriteUni][0]; // on rempli avec les valeurs
	document.getElementById('passwordLogin').value = table[favoriteUni][1];
	document.getElementById('serverLogin').value = table[favoriteUni][2];
}
if ( favoriteUni == -1 && location.href.split('/#')[1] == undefined && table != 0)
{

	document.getElementById('usernameLogin').value = ''; // on rempli avec les valeurs
	document.getElementById('passwordLogin').value = '';
	document.getElementById('serverLogin').value = 'uni101.ogame.fr';
}
var val=0;
var val1=0;
var val2=0;
var val3=0;
if ( !document.getElementById('stayLoggedIn'))  
{ 
	val = 19;
	val1 = 16;
	val2 = 20;
	val3 = 23;
}



var sp1 = document.createElement("span"); // on crée une balise span
sp1.setAttribute("id", "Affichage"); // on y ajoute un id
var sp1_content = document.createTextNode('');
sp1.appendChild(sp1_content); 
var sp2 = document.getElementById('header').getElementsByTagName('h1')[0]; // Lieu où on veut afficher (A remplacer par ce que vous voulez )
var parentDiv = sp2.parentNode;
parentDiv.insertBefore(sp1, sp2.nextSibling);
var tableau = document.createElement("span");


var pseudo = "";  // You can enter you pseudo/ mdp here (between "  " )
var mdp = "";
var uni = "";


table = eval(GM_getValue('table' , 0 )); // recup tableau raccourcis
if ( location.href.split('fr/#')[1] != undefined && table != 0) // si on se situe sur une page du type ..../#X où X est un nombre
{
	var page = location.href.split('fr/#')[1]-1 ; // récup du chiffre
	if ( table != undefined  && table.length > (page) )
	{
	 document.getElementById('usernameLogin').value = table[page][0]; // on remplie avec les valeurs
	 document.getElementById('passwordLogin').value = table[page][1];
	 document.getElementById('serverLogin').value = table[page][2];
	 }
}
var texte_a_afficher = '<style type=text/css> #Affichage {	position: absolute;	top:' +(15+val) + '%;	right: 28%; z-index: 100;	}</style><span id="Affichage">'; // début de la liste des raccourcis
for ( i = 0 ; i < table.length ; i++) // on rajoute chaque raccourcis
{
	texte_a_afficher += '<a href="#' + (i+1) + '"  target="_blank" >'+getServer(table[i][2])+'</a>';
	if ( i != (table.length-1) ) texte_a_afficher += '<font color=white>--|--</font>'; // si on ne se situe pas au dernier element

}
texte_a_afficher += '</span> '; // fin de la liste

var button = document.createElement("div"); // création du bouton Ajouter
button.addEventListener("click", ajouter, false ); // Ajout évenement onClick: ajouter
button.innerHTML = '<style type=text/css> #Add {	position: absolute;	top:'+ (23+val1) +'%; left:50%; z-index: 1;	}</style><span id="Add"><br><font color = red><b><i>Ajouter&nbsp;</i></b></font></span>' ; // la position ne signifie pas grand chose ==> BIDOUILLAGE


var button2 = document.createElement("div"); // Création du bouton supprimer
button2.addEventListener("click", suppr, false ); // Ajout évenement onClick: supprimer
button2.innerHTML = '<style type=text/css> #Suppr {	position: absolute;	top:'+ (9+val2) + '%; left:57%; z-index: 1;	}</style><span id="Suppr"><br><br><font color = red><b><i>Supprimer&nbsp;</i></b></span>' ; // la position ne signifie pas grand chose ==> BIDOUILLAGE

var button3 = document.createElement("div"); // Création du bouton supprimer
button3.addEventListener("click", favorite, false ); // Ajout évenement onClick: supprimer
button3.innerHTML = '<style type=text/css> #Fav {	position: absolute;	top:' + (-5+ val3) + '%; left:67%; z-index: 1;	}</style><span id="Fav"><br><br><br><font color = red><b><i>Favori&nbsp;</i></b></span>' ; // la position ne signifie pas grand chose ==> BIDOUILLAGE

tableau.innerHTML = texte_a_afficher ; // Ce qu'on veut afficher 
document.getElementById('Affichage').insertBefore(tableau, document.getElementById('Affichage').firstChild); // Affichage
document.getElementById('header').insertBefore(button, document.getElementById('loginBtn'));
document.getElementById('header').insertBefore(button2, document.getElementById('loginBtn'));
document.getElementById('header').insertBefore(button3, document.getElementById('loginBtn'));
