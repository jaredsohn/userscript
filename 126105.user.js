// ==UserScript==
// @name           ptMilit
// @namespace      Sylver
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// @include        http://*.ogame.*/game/index.php?page=messages*
// ==/UserScript==

//--------------------------------------------------------------------------------------------------
// CONSTANTES
//--------------------------------------------------------------------------------------------------
var nomScript = "ptMilit";

var version = '1.1.2' ; // Version du script

var serveur = location.href.split('/')[2]; // recuperation du nom du serveur
var country = location.href.split('ogame.')[1].split('/')[0];

if (navigator.userAgent.indexOf('Firefox')>-1)  // Identification du navigateur
{
	var FireFox = true; 
}
else 											
{
	var FireFox = false;
}

//--------------------------------------------------------------------------------------------------
// TEXTES
//--------------------------------------------------------------------------------------------------
var ships_names = new Array("Petit transporteur",
							"Grand transporteur",
							"Chasseur léger",
							"Chasseur lourd",
							"Croiseur",
							"Vaisseau de bataille", 
							"Vaisseau de colonisation", 
							"Recycleur",
							"Sonde d`espionnage",
							"Bombardier",
							"Satellite solaire",
							"Destructeur", 
							"Étoile de la mort",
							"Traqueur");
							
var defense_names = new Array(	"Lanceur de missiles",
								"Artillerie laser légère",
								"Artillerie laser lourde",
								"Canon de Gauss", 
								"Artillerie à ions",
								"Lanceur de plasma",
								"Petit bouclier", 
								"Grand bouclier", 
								"Missile d`interception", 
								"Missile interplanétaire");
		
//--------------------------------------------------------------------------------------------------
// VALEURS
//--------------------------------------------------------------------------------------------------
var ships_points = new Array(4,12,4,10,29,60,40,18,1,90,2.5,125,10000,85);
/*var ships_ress_M = new Array(2000,6000,3000,6000,20000,45000,10000,10000,0,50000,60000,5000000,30000);
var ships_ress_C = new Array(2000,6000,1000,4000,7000,15000,20000,6000,1000,25000,50000,4000000,40000);
var ships_ress_D = new Array(0,0,0,0,2000,0,10000,2000,0,15000,15000,1000000,15000);*/

var defense_points = new Array(2,2,8,37,8,130,20,100,10,25);

//Association noms/valeurs
var ships_data = new Array();
var defense_data = new Array();
var index;
for(index = 0 ; index < 14 ; index++)
{
	ships_data[ships_names[index]] = ships_points[index];
}
for(index = 0 ; index < 10 ; index++)
{
	defense_data[defense_names[index]] = defense_points[index];
}

		
//--------------------------------------------------------------------------------------------------
// FONCTIONS
//--------------------------------------------------------------------------------------------------
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

//Indique si un vaisseau est un vaisseau civil ou non.
function isCivilShip(name)
{
	if(name == ships_names[0]
		|| name == ships_names[1]
		|| name == ships_names[6]
		|| name == ships_names[7]
		|| name == ships_names[8]
		|| name == ships_names[10])
			return true;
			
	return false;
}

// converti un entier de la fome xxxxxx en xxx.xxx, pour personnalisation du nombre de chiffre par paquet, il suffit de remplacer 3 par le nombre voulu dans la ligne suivante : if ( ((lg-1) - i)%3 == 0 && i != (lg-1) )
function parseString(val) 
{
	var nb = String(val); // conversion nombre en chaine de caractère
	var lg = nb.length; // recup longueur de la chaine
	var res='';
	for ( i=0 ; i < lg ; i++)
	{
		res += nb[i]; // ajout du iéme chiffre du nombre
		if ( ((lg-1) - i)%3 == 0 && i != (lg-1) ) // ajout du séparateur '.' si nécessaire
		{
			res +='.';
		}
	}
	return res;	
}

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

//--------------------------------------------------------------------------------------------------
// OBJETS
//--------------------------------------------------------------------------------------------------
var SpyReport = function()
{
	this.ships = new Array();
	this.defense = new Array();

	//Charge le bloc ayant l'indice donné -1.
	this.loadData = function(blocNumber)
	{
		if( !isNaN(blocNumber) && !(document.getElementsByClassName("fleetdefbuildings spy")[blocNumber-1] == undefined )
				&& document.getElementsByClassName("fleetdefbuildings spy")[blocNumber-1] )
		{
			
			var keys = document.getElementsByClassName("fleetdefbuildings spy")[blocNumber-1].getElementsByClassName("key");
			var values = document.getElementsByClassName("fleetdefbuildings spy")[blocNumber-1].getElementsByClassName("value");
			
			var tab;
			
			if(keys.length > 0)
			{
				tab = new Array();
				var line;
				
				for(var i = 0 ; i < keys.length ; i++)
				{
					line = new Array(keys[i].textContent,values[i].textContent);
					tab.push(line);
				}
			}
			else
			{
				tab = -1;
			}
			
			switch(blocNumber)
			{
				case 1 : this.ships = tab;
							break;
				case 2 : this.defense = tab;
							break;
			}
		}
		
	}
	
	//Charge les blocs vaisseaux et defenses.
	this.loadAllData = function()
	{
		for(var i = 1; i < 3 ; i++)
		{
			this.loadData(i);
		}
	}
	
	//Charge juste le bloc vaisseaux.
	this.loadShips = function()
	{
		this.loadData(1);
	}
	
	//Charge juste le bloc défenses.
	this.loadDefense = function()
	{
		this.loadData(2);
	}

	//Calcule les points militaires du RE et retourne un tableau contenant les points de vaisseaux de combat,
	//des vaisseaux civils et des défenses.
	this.calcMilitaryPoints = function()
	{	
		var sum_ship_combat = 0;
		var sum_ship_civil = 0;
		var sum_defense = 0;
		if(this.ships != -1)
		{
			for(index = 0 ; index < this.ships.length ; index ++)
			{
				if(isCivilShip(this.ships[index][0]))
				{
					sum_ship_civil += (ships_data[this.ships[index][0]]*0.5) * parseInt(parseNB(this.ships[index][1]));
				}
				else
				{
					sum_ship_combat += (ships_data[this.ships[index][0]]*1) * parseInt(parseNB(this.ships[index][1]));
				}
			}
		}
		
		if(this.defense != -1)
		{
			for(index = 0 ; index < this.defense.length ; index ++)
			{
				var factor = 1;
				sum_defense += (defense_data[this.defense[index][0]]*factor) * parseInt(parseNB(this.defense[index][1]));
			}
		}
		
		return new Array(sum_ship_combat,sum_ship_civil,sum_defense);
	}
	
	
	//Affiche les points militaires.
	this.showMilitaryPoints = function()
	{
		var total = sp.calcMilitaryPoints();
		var sum = total[0] + total[1] + total[2];
		var text = 		'<th scope="row">Points Militaires:</th>'+
						'<td original="'+parseString(Math.floor(sum))+'">'+parseString(Math.floor(sum))+
						' <i>(Combat: '+parseString(Math.floor(total[0]))+', Civil: '+parseString(Math.floor(total[1]))+', Défenses: '+parseString(Math.floor(total[2]))+')</i>'
						'</td>';
		
		var elem = document.createElement("tr");
		elem.innerHTML = text;
		
		document.getElementsByClassName('infohead')[0].getElementsByTagName("tbody")[0].appendChild(elem);
	}
}

//--------------------------------------------------------------------------------------------------
// SCRIPT
//--------------------------------------------------------------------------------------------------						
var page = location.href.split("page=")[1].split("&")[0];

if(page == "showmessage")
{
	
	if(document.getElementsByClassName("material spy")[0])
	{
		var sp = new SpyReport();
		sp.loadAllData();
		sp.showMilitaryPoints();		
	}
}