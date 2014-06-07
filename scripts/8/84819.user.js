// ==UserScript==
// @name           warLink
// @namespace      unknown
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==
var country = location.href.split('ogame.')[1].split('/')[0];
var serveur = location.href.split('/')[2]; // recuperation du nom du serveur

if(GM_getValue('warLink'+'-op1'+serveur,-1) == -1 || GM_getValue('warLink'+'-op2'+serveur,-1) == -1) // Si aucun enregistrement n'a été fait : Oui en Galaxie, Non en Classement (pour éviter les problèmes avec OgSpy )
{
	GM_setValue('warLink'+'-op1'+serveur,true);
	GM_setValue('warLink'+'-op2'+serveur,false);
}
var inGal=GM_getValue('warLink'+'-op1'+serveur,-1); // Chargement des paramètres, false = ne s'affiche pas en Vue Galaxie
var inStats = GM_getValue('warLink'+'-op2'+serveur,-1); // false = Ne s'execute pas en Vue stat

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

//**********************

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

function aff() // vérifie si l'affichage est nécessaire
{
for (i=0 ; i<15 ; i++) // on vérifie toutes les positions du système
{

	
	var table = document.getElementById('galaxyheadbg2').getElementsByTagName('th')[1];
	if(document.getElementsByClassName('status_abbr_vacation')[i] || document.getElementsByClassName('status_abbr_active')[i] || document.getElementsByClassName('status_abbr_inactive')[i] || document.getElementsByClassName('status_abbr_strong')[i] || document.getElementsByClassName('status_abbr_noob')[i]) // s'il y a un joueur
	{
		if( document.getElementsByClassName('warRider').length > 0 )// si le lien existe déjà
		{
			return; // ... on ne fait rien. 
		}
	}
}
dataWR();

}

function dataWR() // insère les données
{
	
		var uni = location.href.split('://')[1].split('.')[0]; // recup du numéro de l'univers
		var country = location.href.split('ogame.')[1].split('/')[0]; // récupération de l'extension de l'url pour identifier le pays.

		for( i=0 ; i<15 ; i++) // On parcours toutes les positions
		{
			if(document.getElementById('galaxytable').getElementsByTagName('tr')[i+2].getElementsByTagName('td')[7] )// si le champs du pseudo existe
			{
				if(document.getElementById('galaxytable').getElementsByTagName('tr')[i+2].getElementsByClassName('playername')[0].getElementsByClassName('tipsGalaxy')[0])
				{
					var player=trim(document.getElementById('galaxytable').getElementsByTagName('tr')[i+2].getElementsByClassName('playername')[0].getElementsByClassName('tipsGalaxy')[0].getElementsByTagName('span')[0].textContent); // recup du pseudo du joueur
				}
				else
				{
					var player=trim(document.getElementById('galaxytable').getElementsByTagName('tr')[i+2].getElementsByClassName('playername')[0].getElementsByTagName('span')[0].textContent); // recup du pseudo du joueur
				}
				player = player.replace('...','');
				if ( player != '') // si le pseudo n'est pas vide (cas des planètes non colonisées
				{
				//document.getElementById('galaxytable').getElementsByTagName('tr')[i+2].getElementsByTagName('td')[7].innerHTML +='<span id="warRider"><a href="http://www.war-riders.de/?lang='+country+'&uni='+uni+'&page=search&post=1&type=player&name='+player+'" target="_blank" ><font color=green> W.R </font></a></span>'; // on insère le texte à côte du pseudo/statut.
				//document.getElementsByClassName('spacer02')[i].innerHTML +='<span id="warRider"><a href="http://www.war-riders.de/?lang='+country+'&uni='+uni+'&page=search&post=1&type=player&name='+player+'" target="_blank" ><font color=green size="1">W.R</font></a></span>';
				document.getElementsByClassName('position')[i].innerHTML +='<span class="warRider"><a href="http://www.war-riders.de/?lang='+country+'&uni='+uni+'&page=search&post=1&type=player&name='+player+'" target="_blank" ><font color=green size="1">W.R</font></a></span>';
				}
				
			}
		}
		
		

}

//******
function testStats() // Vérifie si les données des statistiques ont été affichées
{
	var player = document.getElementById('ranks').getElementsByTagName('tr')[0].innerHTML ;
	if( player == undefined || document.getElementById('warRider2') ) // Si le premier joueur est affiché
	{
		return;
	}

		dataStats(); // on lance l'affichage
	


}
function dataStats()
{
	var uni = location.href.split('://')[1].split('.')[0]; // recup du numéro de l'univers
	var country = location.href.split('ogame.')[1].split('/')[0]; // récupération de l'extension de l'url pour identifier le pays.
	var player = '';
	if(document.getElementById('categoryButtons').getElementsByClassName('navButton active')[0].id == "player")
	{
		for (i = 0 ; i < 100 ; i++) // on traite les 100 joueurs 
		{
		
			if (document.getElementById('ranks').getElementsByClassName('name')[i].getElementsByTagName('a')[1]) // Si le joueur existe et comporte une alliance
			{
				player=trim(document.getElementById('ranks').getElementsByClassName('name')[i].getElementsByTagName('a')[1].getElementsByTagName('span')[0].textContent);
			}
			else
			{
				if(document.getElementById('ranks').getElementsByClassName('name')[i].getElementsByTagName('a')[0])// SI le joueur existe et ne comporte pas d'alliance
				{
					player=trim(document.getElementById('ranks').getElementsByClassName('name')[i].getElementsByTagName('a')[0].getElementsByTagName('span')[0].textContent);
				}
			}
		document.getElementById('ranks').getElementsByClassName('name')[i].innerHTML += '<span id="warRider'+i+'"><a href="http://www.war-riders.de/?lang='+country+'&uni='+uni+'&page=search&post=1&type=player&name='+player+'" target="_blank" ><font color=green size="1">W.R</font></a></span>'; // affichage
			/*if( !document.getElementById('ranks').getElementsByClassName('sendmsg')[0])
			{
				alert('Page Ally');
			}*/
			

		}
	}
	if(document.getElementById('categoryButtons').getElementsByClassName('navButton active')[0].id == "alliance") // si en stats ally
		{
		var ally='';
		for (i = 0 ; i < 101 ; i++) // on traite les 100 allys
		{
			if(document.getElementById('ranks').getElementsByClassName('name')[2*i].getElementsByTagName('a')[0]) // si existe
			{
				ally = trim(document.getElementById('ranks').getElementsByClassName('name')[2*i].getElementsByTagName('a')[0].textContent); // recup tag ally
				document.getElementById('ranks').getElementsByClassName('name')[2*i].innerHTML +='<span id="warRider'+(i+1)+'"><a href="http://www.war-riders.de/'+country+'/'+uni+'/details/ally/'+ally+'" target="_blank" ><font color=green size="1">  W.R</font></a></span>'; // affichage
			}
		}
		}



}
//*****************************
// --- OPTIONS ----
//*****************************
function displayOptions()
{
	if(!document.getElementById('headGestionScript')) // Si ce script est le script racine (le premier a être traité)
    {
        document.getElementById('inhalt').innerHTML= '<span id="headGestionScript"><center><h2>Gestionnaire des Scripts</h2></center></span>'; // On affiche le titre
		if (country == 'fr')
		{
			document.getElementById('inhalt').innerHTML+='<table bgcolor="#333333" style="border: 1px solid #606060 !important;" ><tr><td><center><img src="http://img832.imageshack.us/img832/3460/iconewarlinkcopie.png" /><br><font size=3 color=#009999><b>War Links</b></font></center<br><br><b><font color=#cc9900>Afficher en vue Galaxie : </font>Oui - <input type="radio" name="grp1wL" value="1" id="wL1a">       Non - <input type="radio" name="grp1wL" value="0" id="wL1b"><br><font color=#cc9900>Afficher en vue Classement : </font>Oui - <input type="radio" name="grp2wL" value="1" id="wL2a">       Non - <input type="radio" name="grp2wL" value="0" id="wL2b"> </b><br><input type="submit" id="wLsave" value="Save"></input><br><center><font color=#333333>_____________________________________________________________________________________</font></center></td></tr></table>'; // On affiche les options
		}
		else
		{
			document.getElementById('inhalt').innerHTML+='<table bgcolor="#333333" style="border: 1px solid #606060 !important;" ><tr><td><center><img src="http://img832.imageshack.us/img832/3460/iconewarlinkcopie.png" /><br><font size=3 color=#009999><b>War Links</b></font></center<br><br><b><font color=#cc9900>Display in Galaxy view : </font>Yes - <input type="radio" name="grp1wL" value="1" id="wL1a">       No - <input type="radio" name="grp1wL" value="0" id="wL1b"><br><font color=#cc9900>Display in Ranking view : </font>Yes - <input type="radio" name="grp2wL" value="1" id="wL2a">       No - <input type="radio" name="grp2wL" value="0" id="wL2b"> </b><br><input type="submit" id="wLsave" value="Save"></input><br><center><font color=#333333>_____________________________________________________________________________________</font></center></td></tr></table>'; // On affiche les options
		}
		document.getElementById("wLsave").addEventListener("click", function(event){save2();}, true); // on ajoute l'évenement au bouton Submit
    }
	else
	{
		if (country == 'fr')
		{
			var text ='<table bgcolor="#333333" style="border: 1px solid #606060 !important;" ><tr><td><center><img src="http://img832.imageshack.us/img832/3460/iconewarlinkcopie.png" /><br><font size=3 color=#009999><b>War Links</b></font></center<br><br><b><font color=#cc9900>Afficher en vue Galaxie : </font>Oui - <input type="radio" name="grp1wL" value="1" id="wL1a">       Non - <input type="radio" name="grp1wL" value="0" id="wL1b"><br><font color=#cc9900>Afficher en vue Classement : </font>Oui - <input type="radio" name="grp2wL" value="1" id="wL2a">       Non - <input type="radio" name="grp2wL" value="0" id="wL2b"> </b><br><input type="submit" id="wLsave" value="Save"></input><br><center><font color=#333333>_____________________________________________________________________________________</font></center></td></tr></table>'; // On saisie le texte à afficher
		}
		else
		{
			var text ='<table bgcolor="#333333" style="border: 1px solid #606060 !important;" ><tr><td><center><img src="http://img832.imageshack.us/img832/3460/iconewarlinkcopie.png" /><br><font size=3 color=#009999><b>War Links</b></font></center<br><br><b><font color=#cc9900>Display in Galaxy view : </font>Yes - <input type="radio" name="grp1wL" value="1" id="wL1a">       No - <input type="radio" name="grp1wL" value="0" id="wL1b"><br><font color=#cc9900>Display in Ranking view : </font>Yes - <input type="radio" name="grp2wL" value="1" id="wL2a">       No - <input type="radio" name="grp2wL" value="0" id="wL2b"> </b><br><input type="submit" id="wLsave" value="Save"></input><br><center><font color=#333333>_____________________________________________________________________________________</font></center></td></tr></table>'; // On saisie le texte à afficher
		}
	// LE BUT EST DE RAJOUTER LE TEXTE SANS TOUCHER AU addEventListener précédent, pour ne pas qu'il soit désactivé = INDISPENSABLE
	 var sp1 = document.createElement("span"); // on crée une balise span
	 sp1.setAttribute("id", "AffichagewL"); // on y ajoute un id
	 var sp1_content = document.createTextNode('');
	 sp1.appendChild(sp1_content); 
	 var sp2 = document.getElementById('headGestionScript') ; // Lieu où on veut afficher (A remplacer par ce que vous voulez 
	 var parentDiv = sp2.parentNode;
	 parentDiv.insertBefore(sp1, sp2.nextSibling);
	 var tableau = document.createElement("span");
	 tableau.innerHTML = text; // Ce qu'on veut afficher 
	 document.getElementById('AffichagewL').insertBefore(tableau, document.getElementById('AffichagewL').firstChild); // Affichage
	  
	 document.getElementById("wLsave").addEventListener("click", function(event){save2();}, true); // ajout du nouvel évenement de sauvegarde
	 }

	var op1=String(GM_getValue('warLink'+'-op1'+serveur,-1)); // recup option 1 = Vue galaxie
	var op2=String(GM_getValue('warLink'+'-op2'+serveur,-1)); // récup option 2 = Vue stats
	// OPTION 1 --------------------------
	if(op1 == -1) // Si pas encore sauvegardée
	{
		document.getElementById('wL1a').checked=true; // bouton oui coché
	}
	else
	{
		if(op1 == 'true') // Si oui sauvé
		{
			document.getElementById('wL1a').checked=true; // bouton oui coché
		}
		if(op1 == 'false') // si non sauvé
		{
			document.getElementById('wL1b').checked=true; // bouton non coché
		}
	}
	// OPTION 1 --------------------------
	if(op2==-1) // Si pas encore sauvegardée
	{
		document.getElementById('wL2b').checked=true; // bouton non coché
	}
	else
	{
		if(op2 == 'true')
		{
			document.getElementById('wL2a').checked=true; // bouton oui coché
		}
		if(op2 == 'false')
		{
			document.getElementById('wL2b').checked=true; // bouton non coché
		}
	}
}
//****
function save2() // sauvegarde des valeurs sélectionné lors de l'appui sur le bouton save
{
	GM_setValue('warLink'+'-op1'+serveur, document.getElementById('wL1a').checked);
	GM_setValue('warLink'+'-op2'+serveur, document.getElementById('wL2a').checked);
	if(FireFox)  
	{
		fadeBoxx("Sauvegardé",0,2000); // affichage d'une fadebox
	}
	else
	{
		alert("Sauvegardé");
	}
}
//function petit rectangle affiché (genre pop up) 0 V , 1 erreur
function fadeBoxx(message, failed, temps){
	
	unsafeWindow.tb_remove();
    	
	if (failed) {
		unsafeWindow.$("#fadeBoxStyle").attr("class", "failed");
	} else {
		unsafeWindow.$("#fadeBoxStyle").attr("class", "success");
	}
	unsafeWindow.$("#fadeBoxContent").html(message);
	unsafeWindow.$("#fadeBox").stop(false, true).show().fadeOut(temps);
}

function trim(s)
{
	return s.replace(/\s+$/g,'').replace(/\s{2,}/g,'').replace(/\s+$/g,'');
}
// --------------------------------- SCRIPT------------------------------
if(!document.getElementById('IconeScript') )
{
	addButton();
}


var page =location.href.split('?page=')[1].split('&')[0].split('#')[0]; // recuperation du type de la page
if( page == 'galaxy')
{
	document.getElementById('showbutton').addEventListener("click", dataWR, false ); // ajout de l'appel en tant qu'évenement lors du click sur le bouton "Afficher"
	if(inGal) var inter = setInterval(aff,1000); // appel de la fonction d'affichage toutes les secondes
}
if ( page == 'highscore')
{
	if(inStats) var intStats = setInterval(testStats,1000);
}
if ( (location.href.split('&')[location.href.split('&').length-1]) == 'Scripts') // si dans la partie 'Scripts'
{
	displayOptions(); // affichage des options
	
}