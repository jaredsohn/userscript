// ==UserScript==
// @name           pNote
// @namespace      Sylver
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==


//--------------------------------------------------------------------------------------------------
// OPTIONS PERSONNALISABLES
//--------------------------------------------------------------------------------------------------
(function(){
//true : le script classera automatiquement les lignes.
//false : les lignes seront tout simplement ordonnées dans l'ordre d'ajout.
var automaticOrder = true;

//-------------------------

//true : les lignes seront ordonnées dans l'ordre croissant des coordonnées.
//false : les lignes seront ordonnées selon le pseudo du joueur dans l'ordre lexicographique.
var orderByCoords = true;

//--------------------------------------------------------------------------------------------------
// A NE PAS ÉDITER
//--------------------------------------------------------------------------------------------------
var serveur = location.href.split('/')[2]; // recuperation du nom du serveur
var country = location.href.split('ogame.')[1].split('/')[0]; //Langue

if (navigator.userAgent.indexOf('Firefox')>-1)  // Identification du navigateur
{
	var FireFox = true; 
	var nomScript='';
}
else 											
{
	var FireFox = false;
	var nomScript='pNote';
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
//--------------------------------------------------------------------------------------------------
// FONCTIONS
//--------------------------------------------------------------------------------------------------

//Affichage des données.
function display()
{
	//Si le bloc n'a pas encore été affiché, insertion.
	if(!document.getElementById('pNote') )
	{
		var text = document.createElement("span");
		text.setAttribute('id','pNote');
		text.setAttribute('style','position: absolute;	top:20px;	left: 0px;');
		
		document.getElementById("boxBG").insertBefore(text,document.getElementById("box") );
	}
	
	text = document.getElementById("pNote");
	var session = "";
	//Récupération du numéro de session.
	try
	{
		session = document.location.href.match (/\&session=([0-9a-fA-F]{1,12})\&/) [1];
	}
	catch(ex)
	{
		try
		{
			session = document.location.href.match (/\&session=([0-9a-fA-F]{1,12})/) [1];
		}
		catch(ex)
		{
			session = "";
		}
	}
	//Début du texte (boutons).
	textToAdd = "<table align='left' bgcolor='transparent' style='border: 1px solid #606060 !important;'><tr><td><span id='pNoteAdd'></span> - <span id='pNoteDelete'></span></td></tr>";
	
	//Corps du texte.
	table = eval(GM_getValue('tablePNote'+serveur , 0 )); // recup tableau raccourcis
	
	//Permet la prise en compte des changements d'options sans avoir à supprimer/réajouter les liens.
	table = eval(GM_getValue('tablePNote'+serveur , 0 )); // recup tableau raccourcis
	if(table != 0)
	{
		table = sort(table);
		GM_setValue('tablePNote'+serveur,uneval(table)); // sauvegarde
	}
	
	if(table != 0)
	{
		for(var i = 0 ; i < table.length ; i++)
		{
			var url = document.location.href.split("page=")[0] + "page=galaxy"+"&session="+session+"&no_header=1&";
			url += "galaxy="+table[i][1].split(":")[0]+"&";
			url += "system="+table[i][1].split(":")[1]+"&";
			url += "planet="+table[i][1].split(":")[2];
			
			if(automaticOrder && orderByCoords && i > 0)
			{
				if(parseInt(table[i][1].split(":")[0]) > parseInt(table[i-1][1].split(":")[0]) ) 
				{
					textToAdd += "<tr><td style='height:7px'></td></tr>";
				}
			}
			else if(automaticOrder && !orderByCoords && i > 0)
			{
				if(table[i][0] != table[i-1][0]) 
				{
					textToAdd += "<tr><td style='height:7px'></td></tr>";
				}
			}
			
			textToAdd += "<tr><td align='left'><a href='"+url+"'><font size='1'>["+table[i][1]+"] - "+table[i][0]+"</font></a></td></tr>";
			
		}
	}
	
	//Fin du texte.
	textToAdd += "</table>";
	
	//Application.
	text.innerHTML = textToAdd;
	
	//Insertion des boutons
	//Bouton d'ajout
	var add = document.createElement("input"); // création du bouton Add
	add.setAttribute('type','submit');
	add.setAttribute('value','Add');
	add.setAttribute('style','border:2px outset #A6BEDE;cursor:pointer;border-radius: 10px 20px;');
	add.addEventListener("click", ajouter, false ); // Ajout évenement onClick: ajouter
	document.getElementById("pNoteAdd").appendChild(add);
	
	//Bouton de suppression
	var del = document.createElement("input"); // création du bouton Delete
	del.setAttribute('type','submit');
	del.setAttribute('value','Delete');
	del.setAttribute('style','border:2px outset #A6BEDE;cursor:pointer;border-radius: 10px 20px;');
	del.addEventListener("click", supprimer, false ); // Ajout évenement onClick: ajouter
	document.getElementById("pNoteDelete").appendChild(del);
	
	
}

//Ajoute un lien à la liste.
function ajouter()
{
	var name = "";
	var coords = "";
	var gal = "";
	var sys = "";
	var pos = "";
	
	if(country == "fr")
	{
		name = prompt("Quel est le nom du joueur ?","");
		if(name != null)
			coords = prompt("Quelles sont les coordonnées du joueur ? (de la forme xx:xxx:xx)","");
	}
	else
	{
		name = prompt("What's the player name ?","");
		if(name != null)
			coords = prompt("What are his coordinates ? (with the format xx:xxx:xx)","");
	}
	if(name != null && coords != null)
	{
		try
		{	
			//Vérification des coordonnées données.
			gal = parseInt(coords.split(":")[0]);
			sys = parseInt(coords.split(":")[1]);
			pos = parseInt(coords.split(":")[2]);
			if((typeof gal) == "undefined" || (typeof sys) == "undefined" || (typeof pos) == "undefined" 
				|| isNaN(gal) || isNaN(sys) || isNaN(pos))
			{
				if(country == "fr")
				{
					alert("Les coordonnées sont incorrectes.");
				}
				else
				{
					alert("Coordinates are invalid.");
				}
				return;
			}	
		}
		catch(ex)
		{
			if(country == "fr")
			{
				alert("Les coordonnées sont incorrectes.");
			}
			else
			{
				alert("Coordinates are invalid.");
			}
			return;
		}
		
		if(name.length > 10)
			name = name.substring(0,9);
		
		//Ajout dans la tableau.
		table = eval(GM_getValue('tablePNote'+serveur , 0 )); // recup tableau raccourcis
		if(table != 0)
		{
			var ligne = new Array(name , coords);
			table.push(ligne);
			table = sort(table);
			GM_setValue('tablePNote'+serveur,uneval(table)); // sauvegarde
		}
		//Si le tableau n'a pas encore été créé ou a été supprimé.
		else
		{
			var ligne = new Array(name , coords);
			var table = new Array();
			table.push(ligne);
			GM_setValue('tablePNote'+serveur,uneval(table)); // sauvegarde
		}
		//Affichage des nouvelles données.
		display();
	}
}

//Suppression d'un lien.
function supprimer()
{
	var pos = -1;
	
	if(country == "fr")
	{
		pos = prompt("Quelle numéro de ligne à supprimer ? [0=Tout]","");
	}
	else
	{
		pos = prompt("What's the number of the line to delete [0=All] ?","");
	}
	if(pos != null)
	{
		pos = parseInt(pos);
		//Vérification de la position donnée.
		if((typeof pos) == "undefined" || isNaN(pos) )
		{
			if(country == "fr")
			{
				alert("Position invalide.");
			}
			else
			{
				alert("Invalid position.");
			}
			return;
		}
		//Mise à jour du tableau.
		table = eval(GM_getValue('tablePNote'+serveur , 0 )); // recup tableau raccourcis
		if(table != 0)
		{
			if(pos <= table.length)
			{
				if(pos >= 0)
				{
					//Si l'on souhaite tout supprimer.
					if(pos == 0)
					{
						var emptyTable = new Array();
						GM_setValue('tablePNote'+serveur,uneval(emptyTable)); // sauvegarde
					}
					else
					{
						if ( pos != table.length ) // Si ce n'est pas le dernier élement de la liste
						{
							for (i=(pos-1) ; i< (table.length -1);i++) // on avance d'une ligne toutes les lignes suivantes (on écrase la ligne à suppr)
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
						GM_setValue('tablePNote'+serveur,uneval(table)); // sauvegarde
					}
				}
			}
			else
			{
				if(country == "fr")
				{
					alert("Position en dehors du nombre de ligne");
				}
				else
				{
					alert("Position out of range.");
				}
				return;
			}
		}
		//Affichage des nouvelles données.
		display();
	}
}

// vérifie si l'affichage est nécessaire
function aff() 
{
	for (i=0 ; i<15 ; i++) // on vérifie toutes les positions du systéme
	{
		//S'il y a un joueur.
		if(document.getElementsByClassName('status_abbr_vacation')[i] || document.getElementsByClassName('status_abbr_active')[i] || document.getElementsByClassName('status_abbr_inactive')[i] || document.getElementsByClassName('status_abbr_strong')[i] || document.getElementsByClassName('status_abbr_noob')[i]
			|| document.getElementsByClassName('rank_bandit')[i]) 
		{
			if( document.getElementsByClassName('pNoteGal').length > 0 ) // si le lien existe déjà
			{
				return; // ... on ne fait rien. 
			}
		}
	}
	data();
}

//Insère les données en vue galaxie.
function data() 
{
		for( i=0 ; i<15 ; i++) // On parcours toutes les positions
		{
			if(document.getElementById('galaxytable').getElementsByTagName('tr')[i+2].getElementsByTagName('td')[7] )// si le champs du pseudo existe
			{
				if(document.getElementById('galaxytable').getElementsByTagName('tr')[i+2].getElementsByClassName('playername')[0].getElementsByClassName('tipsGalaxy')[0])
				{
					var player=document.getElementById('galaxytable').getElementsByTagName('tr')[i+2].getElementsByClassName('playername')[0].getElementsByClassName('tipsGalaxy')[0].getElementsByTagName('span')[0].textContent; // recup du pseudo du joueur
				}
				else
				{
					var player=document.getElementById('galaxytable').getElementsByTagName('tr')[i+2].getElementsByClassName('playername')[0].getElementsByTagName('span')[0].textContent; // recup du pseudo du joueur
				}
				player = player.replace('...','');
				if ( player != '') // si le pseudo n'est pas vide (cas des planétes non colonisées)
				{
					//Création du symbole.
					var button = document.createElement("span");
					button.setAttribute('class','pNoteGal');
					button.innerHTML = "<img src='http://img594.imageshack.us/img594/7151/pnoteaddicon.png'/>";
					button.addEventListener("click",ajouterFromGal, false);
					
					var gal = document.getElementById("galaxy_input").value;
					var sys = document.getElementById("system_input").value;
					var pos = i+1;
					
					button.setAttribute('title',player + "-"+gal+":"+sys+":"+pos);
					
					//Insertion dans la page.
					document.getElementById('galaxytable').getElementsByTagName('tr')[i+2].getElementsByTagName('td')[3].appendChild(button);
				}
				
			}
		}
}

//Ajoute un lien dans la tableau suite à un click depuis la galaxie.
function ajouterFromGal(event)
{
	var text = event.target.parentNode.title;
	var name = trim(text.split("-")[0]);
	var coords = text.split("-")[text.split("-").length-1];
	if(text.split("-").length > 2)
	{
		for (var i = 1 ; i < text.split("-").length - 1 ; i++)
		{
			name += "-"+text.split("-")[i];
		}
	}
	
	if(name.length > 10)
		name = name.substring(0,9);
	
	table = eval(GM_getValue('tablePNote'+serveur , 0 )); // recup tableau raccourcis
	if(table != 0)
	{
		var ligne = new Array(name , coords);
		table.push(ligne);
		table = sort(table);
		GM_setValue('tablePNote'+serveur,uneval(table)); // sauvegarde
	}
	else
	{
		var ligne = new Array(name , coords);
		var table = new Array();
		table.push(ligne);
		GM_setValue('tablePNote'+serveur,uneval(table)); // sauvegarde
	}
	display();
}

//Tri le tableau selon les coordonnées dans l'ordre croissant. (Tri à bulle)
function sort(table)
{
	var t = table;
	if(automaticOrder)
	{
		for(var i = table.length-1 ; i > -1 ; i--)
		{
			for(var j = 0 ; j < i ; j++)
			{
				if(orderByCoords)
				{
					var gal1 = parseInt(t[j][1].split(":")[0]);
					var sys1 = parseInt(t[j][1].split(":")[1]);
					var pos1 = parseInt(t[j][1].split(":")[2]);
					var gal2 = parseInt(t[j+1][1].split(":")[0]);
					var sys2 = parseInt(t[j+1][1].split(":")[1]);
					var pos2 = parseInt(t[j+1][1].split(":")[2]);

					if(gal1 > gal2) 
						t = soap(t,j,j+1);
					if(gal1 == gal2 && sys1 > sys2)
						t = soap(t,j,j+1);
					if(gal1 == gal2 && sys1 == sys2 && pos1 > pos2)
						t = soap(t,j,j+1);
				}
				else
				{
					if(t[j][0].toLowerCase() > t[j+1][0].toLowerCase())
						t = soap(t,j,j+1);
				}
			}
		}
	}
	
	return t;
}

//Échange les lignes i et j du tableau table.
function soap(table, i , j)
{
	var tmp1 = table[i][0];
	var tmp2 = table[i][1];
	table[i][0] = table[j][0];
	table[i][1] = table[j][1];
	table[j][0] = tmp1;
	table[j][1] = tmp2;
	
	return table;
}

//Nettoie les espaces et retours chariots.
function trim(s)
{
	return s.replace(/\s+$/g,'').replace(/\s{2,}/g,'').replace(/\s+$/g,'');
}

//------------------------
// SCRIPT
//------------------------
var page = location.href.split('?page=')[1].split('&')[0]; // recuperation du type de la page
if( page == 'galaxy')
{
	document.getElementById('showbutton').addEventListener("click", data, false ); // ajout de l'appel en tant qu'évenement lors du click sur le bouton "Afficher"
	var inter = setInterval(aff,1000); // appel de la fonction d'affichage toutes les secondes
}	
display();	
/*var rt = new Date();
alert(rt.getTime());*/
})();