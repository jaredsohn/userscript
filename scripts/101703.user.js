// ==UserScript==
// @name           mailColoration
// @namespace      Sylver
// @include        http://*.ogame.*/game/index.php?page=*
//
// ==/UserScript==

//Pays de l'utilisateur

//var country = location.href.split('ogame.')[1].split('/')[0];
var z;
var country = 'en';
for(z = 0 ; z < document.getElementsByTagName('meta').length ; z++)
{
	if(document.getElementsByTagName('meta')[z].name == "ogame-language")
	{
		country = document.getElementsByTagName('meta')[z].content;
	}
}
var serveur = location.href.split('/')[2]; // recuperation du nom du serveur

if (navigator.userAgent.indexOf('Firefox')>-1)  // Identification du navigateur
{
	var FireFox = true; 
	var nomScript='';
}
else 											
{
	var FireFox = false;
	var nomScript='warLink';
}
//******
//Définition des couleurs
//******
var name = new Array();
var color = new Array();
//*** VALEUR PAR DEFAUT ***//
name[0] = "Stationnement d`une flotte"; color[name[0]] = "#ccff66";
name[1] = "Retour d`une flotte"; color[name[1]] = "#666633";
name[2] = "Message circulaire"; color[name[2]] = "#009999";
name[3] = "Rapport d`exploitation"; color[name[3]] = "#66cc66";
name[4] = "Rapport d`espionnage"; color[name[4]] = "#ff6600";
name[5] = "Activité d`espionnage"; color[name[5]] = "#ff3300";
name[6] = "a quitté l`alliance"; color[name[6]] = "#330066";
name[7] = "Arrivée sur une planète"; color[name[7]] = "#ffff33";
name[8] = "Résultat de l`expédition"; color[name[8]] = "#666699";
name[9] = "Rapport de colonisation"; color[name[9]] = "#ccffcc";
//si elles n'ont pas encore été chargées
if(GM_getValue('mC-op0',-1) == -1)
{
	for(var z=0 ; z < name.length ; z++)
	{
		//Première sauvegarde
		GM_setValue('mC-op'+z,color[name[z]]);
	}
}
else
{
	for(var z=0 ; z < name.length ; z++)
	{
		//Chargement des sauvegardes
		if(GM_getValue('mC-op'+z,-1) != -1)
			color[name[z]] = GM_getValue('mC-op'+z,-1);
	}
}
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
//Effectue le traitement de coloration
function verify()
{
	var text ;
	var i=0;
	var s = '';
	if(document.getElementById('mailz'))
	{
		while(document.getElementById('mailz').getElementsByTagName('tr')[i+1])
		{
			
					
			text = document.getElementById('mailz').getElementsByTagName('tr')[i+1].getElementsByClassName('subject')[0].getElementsByTagName('a')[0].textContent;
			
			document.getElementById('mailz').getElementsByTagName('tr')[i+1].getElementsByClassName('subject')[0].getElementsByTagName('a')[0].style.color =  getColor(text);
			if( !document.getElementById('mailz').getElementsByTagName('tr')[i+2].getElementsByClassName('subject')[0])
			{
				return ;
			}
			i++;			
		}
	}
	
	document.addEventListener ("DOMNodeInserted", verify, false);
}
//Donne la couleur associée à un message
function getColor(titre)
{
	var text = titre.replace(/\s+$/g,'').replace(/\s{2,}/g,'').replace(/\s+$/g,'');
	for(var i = 0 ; i < name.length ; i++)
	{
		if(text.indexOf(name[i]) > -1)
			return color[name[i]];
	}	
	return -1;
}//*****************************
// --- OPTIONS ----
//*****************************
//Affiche les options du script dans le gestionnaire
function displayOptions()
{
	var textF = '';
	if(!document.getElementById('headGestionScript')) // Si ce script est le script racine (le premier a être traité)
    {
        document.getElementById('inhalt').innerHTML= '<span id="headGestionScript"><center><h2>Gestionnaire des Scripts</h2></center></span>'; // On affiche le titre
		
		textF+='<table bgcolor="#333333" style="border: 1px solid #606060 !important;" ><tr><td><center><img src="http://img852.imageshack.us/img852/8307/logomailcoloration.png" /><br><font size=3 color=#009999><b>Mail Coloration</b></font></center<br><br><table><tr><th align="center"><font color=#cc9900>Texte</font></th><th align="center"><font color=#cc9900>Couleur</font></th></tr>';

		for( var i=0 ; i < name.length ; i++)
		{
			textF += '<tr><td><i><font color="'+color[name[i]]+'">'+name[i]+'</font></i></td><td>: <input type="text" name="grp1mC" value="'+color[name[i]]+'" id="mC'+i+'" size=7><br></td></tr>';
		}
		textF += '</table><br><input type="submit" id="mCsave" value="Save"></input><br><center><font color=#333333>_____________________________________________________________________________________</font></center></td></tr></table>'; // On affiche les options
		document.getElementById('inhalt').innerHTML+= textF;
		document.getElementById("mCsave").addEventListener("click", function(event){save();}, true); // on ajoute l'évenement au bouton Submit
    }
	else
	{
		var text ='<table bgcolor="#333333" style="border: 1px solid #606060 !important;" ><tr><td><center><img src="http://img852.imageshack.us/img852/8307/logomailcoloration.png" /><br><font size=3 color=#009999><b>Mail Coloration</b></font></center<br><br><table><tr><th align="center"><font color=#cc9900>Texte</font></th><th align="center"><font color=#cc9900>Couleur</font></th></tr>'; // On saisie le texte à afficher
		for( var i=0 ; i < name.length ; i++)
		{
			text += '<tr><td><i><font color="'+color[name[i]]+'">'+name[i]+'</font></i></td><td>: <input type="text" name="grp1mC" value="'+color[name[i]]+'" id="mC'+i+'" size=7><br></td></tr>';
		}
		text += '</table><br><input type="submit" id="mCsave" value="Save"></input><br><center><font color=#333333>_____________________________________________________________________________________</font></center></td></tr></table>'; // On affiche les options
		
		// LE BUT EST DE RAJOUTER LE TEXTE SANS TOUCHER AU addEventListener précédent, pour ne pas qu'il soit désactivé = INDISPENSABLE
		 var sp1 = document.createElement("span"); // on crée une balise span
		 sp1.setAttribute("id", "AffichagemC"); // on y ajoute un id
		 var sp1_content = document.createTextNode('');
		 sp1.appendChild(sp1_content); 
		 var sp2 = document.getElementById('headGestionScript') ; // Lieu où on veut afficher (A remplacer par ce que vous voulez 
		 var parentDiv = sp2.parentNode;
		 parentDiv.insertBefore(sp1, sp2.nextSibling);
		 var tableau = document.createElement("span");
		 tableau.innerHTML = text; // Ce qu'on veut afficher 
		 document.getElementById('AffichagemC').insertBefore(tableau, document.getElementById('AffichagemC').firstChild); // Affichage
		  
		 document.getElementById("mCsave").addEventListener("click", function(event){save();}, true); // ajout du nouvel évenement de sauvegarde
	 }
}
//Sauvergarde des options
function save()
{
	for(var i=0 ; i < name.length ; i++)
	{
		GM_setValue('mC-op'+i , document.getElementById('mC'+i).value);
	}
	window.location.reload();
}
//Ajout du bouton Gestion Script
function addButton() // @Copyright Terminator By Lame Noire
{
	var buttonPosition = document.getElementById("links");
	if(!buttonPosition) 
	{
		return;
	}
	
	var button = document.createElement("li");
	if (country == 'fr')
	{
		button.innerHTML = '<span class="menu_icon" id="IconeScript"><img src="http://img810.imageshack.us/img810/3261/imgestionscript.png" ></span/><a target="_self" accesskey="" href="' + location.href + "&Scripts" + '" class="menubutton "><span class="textlabel">Gestion Scripts</span></a>';
	}
	else
	{
		button.innerHTML = '<span class="menu_icon" id="IconeScript"><img src="http://img810.imageshack.us/img810/3261/imgestionscript.png" ></span/><a target="_self" accesskey="" href="' + location.href + "&Scripts" + '" class="menubutton "><span class="textlabel">Scripts Managmnt</span></a>';
	}
	buttonPosition = document.getElementById("links").getElementsByTagName("ul")[0].getElementsByTagName("li")[10];
	insertAfter(button, buttonPosition);
}
//*****
//*******
function insertAfter(elem, after) // @copyright Terminator By Lame Noire
{
	var dad = after.parentNode;
	if(dad.lastchild == after)
		dad.appendChild(elem);
	else 
		dad.insertBefore(elem, after.nextSibling);
}		
//*******
//**** SCRIPT
if(!document.getElementById('IconeScript') )
{
	addButton();
}
if ( (location.href.split('&')[location.href.split('&').length-1]) == 'Scripts') // si dans la partie 'Scripts'
{
	displayOptions(); // affichage des options	
}
else if (location.href.split('page=')[1].split('&')[0] == 'messages')
{
	verify();
}
