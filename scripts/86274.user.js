// ==UserScript==
// @name           build&Search
// @namespace      unknown
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

var version = '2.8' ; // Version du script
var country = location.href.split('ogame.')[1].split('/')[0];

var session="";
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

//-----------------------------------------------------------------------------------
// ADRESSES DES IMAGES DES RESSOURCES
//-----------------------------------------------------------------------------------
var metPic = "http://gf1.geo.gfsrv.net/cdn59/ccdb3fc0cb8f7b4fc8633f5f5eaa86.gif";
var crisPic = "http://gf1.geo.gfsrv.net/cdna9/452d7fd11d754e0f09ec2b2350e063.gif";
var deutPic = "http://gf1.geo.gfsrv.net/cdn9c/e37d45b77518ddf8bbccd5e772a395.gif";
var enPic = "http://gf1.geo.gfsrv.net/cdn0f/0d68fe5d39bbb4c94a2372626ec83f.gif";
//-----------------------------------------------------------------------------------

//-------------- TABLEAUX DES CHAINES DE CARACTERE
	if (country == 'fr')
	{
		var bati = new Array('Mine de Métal','Mine de Cristal' , 'Synthétiseur de Deut', 'Centrale Solaire' , 'Centrale à fusion' , 'Usine de Robots','Usine de Nanites','Chantier Spatial','Labo Recherche','Hangar de métal','Hangar de Cristal','Hangar de Deutérium','Sillo de Missiles','Dépôt Ravit.','Terraformeur','Base Lunaire','Phalange','Porte de Saut'); // tableau texte batiments
		var search = new Array('Energie','Laser','Ion','Tech.Hyperespace','Plasma','Combustion','Impulsion','Prop.Hyperespace','Espionnage','Ordinateur','Astro','Res.Rech.Intergallac','Graviton','Arme','Bouclier','Protection'); // tableau texte recherches
		var ship = new Array('Chasseur Lé.','Chasseur Lo.','Croiseur','V.Bataille','Traqueur','Bombardier','Destructeur','Rip','P.Transpo','G.Transpo','V.Colo','Recycleur','Sonde','Satellite'); // tableau texte vaisseaux
		var def = new Array('Lanc.Missiles','Art.Lé.Laser','Art.Lo.Laser','Canon de Gauss','Art. à Ion','Lanc.Plasma','P.Bouclier','G.Bouclier','Miss.Interception','Miss.Interplanètaire'); // tableau texte defenses
	}
	else
	{
		var bati = new Array('Metal Mine','Crystal Mine' , 'Deuterium Synthesizer', 'Solar Power Plant' , 'Fusion Power Plant' , 'Robot Factory','Nanite Factory','Shipyard','Research Laboratory','Metal Hangar','Crystal Hangar','Deuterium Hangar','Missile Silo','Supplu depot','Terraformer','Lunar Base','Phalanx','Jump Gate'); // tableau texte batiments
		var search = new Array('Energy','Laser','Ion','Hyperspace Tech.','Plasma','Combustion','Impulsion','HyperespaceProp.','Spy','Computer','Astro','IntergallacResNet','Graviton','Weapon','Shield','Protection'); // tableau texte recherches
		var ship = new Array('L.Fighter','H.Fighter','Cruiser','BattleShip','BattleCr','Bomber','Destroyer','DeathStar','S.Cargo','L.Cargo','Colo.Sh','Recycler','Espio','Solar.Sat'); // tableau texte vaisseaux
		var def = new Array('Rocket.L','LightLaser','HeavyLaser','GaussCannon','IonCannon','Plasma','S.Dome','L.Dome','InterceptionMiss.','InterplanetMiss.'); // tableau texte defenses
	}

var serveur = location.href.split('/')[2]; // recuperation du nom du serveur
var pseudo = document.getElementById('playerName').getElementsByClassName('textBeefy')[0].innerHTML; // récupération du pseudo
//__________________________
var URL='http://userscripts.org/scripts/show/86274';
var Instal ='http://userscripts.org/scripts/source/86274.user.js';
//__________________________
if (navigator.userAgent.indexOf('Firefox')>-1)  // Identification du navigateur
{
	var FireFox = true; 
	var nomScript='';
}
else 											
{
	var FireFox = false;
	var nomScript='B&S';
}
//********


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
				if(MaJ && !document.getElementById('majBS'))
				{
					if (country == 'fr')
					{
						MaJ.innerHTML += "<br><a href='"+ Instal +"'><div align=center id='majBS'><font color=orange> Mise à jour disponible  </font></div></a><br>";	
					}
					else
					{
						MaJ.innerHTML += "<br><a href='"+ Instal +"'><div align=center id='majBS'><font color=orange> Update available </font></div></a><br>";	
					}
				}
				if(!document.getElementById('bsMaJAlert'))
				{
					var MaJAlert = document.createElement('a');
					MaJAlert.setAttribute("href",Instal);
					MaJAlert.setAttribute("style",'display:block !important; width:19px !important; position:relative !important; top:-25px !important; left:-25px !important; padding:0 !important; line-height:normal !important; font-family:Verdana !important; font-weight:700 !important; font-size:16px !important; color:orange !important; a:hover color:#FFEE66; a:hover{color:#FFEE66 !important;} ');
					MaJAlert.setAttribute("id","bsMaJAlert");
					MaJAlert.textContent = "[!]"
					
					var myProgButton = document.getElementById('bSButton');
					
					if(myProgButton) myProgButton.parentNode.appendChild(MaJAlert);
				}
			}
		}
	});
}
//---- CHECK DATA
function checkBat() // vérifie que les données saisies sont correctes pour les batiments
{
	var uN = parseInt( document.getElementById('uNanite').value ) ; // Nanite
	var uR = parseInt( document.getElementById('uRobot').value ) ; // Robot
	var speed = parseInt(document.getElementById('Speed').value); // vitesse
	var nb = parseInt(document.getElementById('lvl').value); // niveau
	if(uN<0)  document.getElementById('uNanite').value=0;
	if(uR<0)  document.getElementById('uRobot').value=0;
	if(speed<1) document.getElementById('Speed').value=1;
	if(nb<1) document.getElementById('lvl').value=1;
}
//**
function checkSearch() // vérifie que les données saisies sont correctes pour les recherches
{
	var labo = parseInt( document.getElementById('labo2').value ); // labo
	var speed = parseInt(document.getElementById('Speed').value); // vitesse
	var nb = parseInt(document.getElementById('lvl').value); // niveau
	if(labo<1)  document.getElementById('labo2').value=1;
	if(speed<1) document.getElementById('Speed').value=1;
	if(nb<1) document.getElementById('lvl').value=1;
}
//**
function checkShipDef() // vérifie que les données saisies sont correctes pour les vaisseaux et défenses
{
	var uN = parseInt( document.getElementById('uNanite').value ) ; // Nanite
	var cS = parseInt( document.getElementById('Cspatial2').value ) ; // Chantier Spatial
	var speed = parseInt(document.getElementById('Speed').value); // vitesse
	var nb = parseInt(document.getElementById('lvl').value); // niveau
	if(uN<0)  document.getElementById('uNanite').value=0;
	if(cS<0)  document.getElementById('Cspatial2').value=0;
	if(speed<1) document.getElementById('Speed').value=1;
	if(nb<1) document.getElementById('lvl').value=1;
}
//****
function parseString(val,choice) // converti un entier de la fome xxxxxx en xxx.xxx, pour personnalisation du nombre de chiffre par paquet, il suffit de remplacer 3 par le nombre voulu dans la ligne suivante : if ( ((lg-1) - i)%3 == 0 && i != (lg-1) )   Choice : 1= appliquation de la couleur selon si nulle on non
{
	var nb = String(val); // conversion nombre en chaine de caractère
	var lg = nb.length; // recup longueur de la chaine
	var res='';
	if( parseInt(val) != 0 && choice == 1)
	{
		res ='<b><font color=red>';
	}
	for ( i=0 ; i < lg ; i++)
	{
		res += nb[i]; // ajout du ième chiffre du nombre
		if ( ((lg-1) - i)%3 == 0 && i != (lg-1) ) // ajout du séparateur '.' si nécessaire
		{
			res +='.';
		}
	}
	if(choice == 1)
	res += ' </font></b>';
	return res;	
}
function insertAfter(elem, after) // @copyright Terminator By Lame Noire
{
	var dad = after.parentNode;
	if(dad.lastchild == after)
		dad.appendChild(elem);
	else 
		dad.insertBefore(elem, after.nextSibling);
}		
function addButton() // @Copyright Terminator By Lame Noire
{
	var buttonPosition = document.getElementById("links");
	if(!buttonPosition) 
	{
		return;
	}
	
	
	var button = document.createElement("li");
	var urlLink = location.href.split('page=')[0] + 'page=fleet1&session=' +session+  '&BuildSearch'; 
	button.innerHTML = '<span class="menu_icon" id="bSButton"><img src="http://img243.imageshack.us/img243/3609/imbuildsearch.png" ></span/><a target="_self" accesskey="" href="' + urlLink +'" class="menubutton "><span class="textlabel">Build & Search</span></a>';
	buttonPosition = document.getElementById("links").getElementsByTagName("ul")[0].getElementsByTagName("li")[10];
	insertAfter(button, buttonPosition);
}

//*Retourne la valeur du select selectId*/
function getSelectValue(selectId)
{
	//*On récupère l'élement html <select>*/
	var selectElmt = document.getElementById(selectId);
	return selectElmt.options[selectElmt.selectedIndex].textContent;
}

function batF() // affiches les données correspondantes aux batiments
{
	checkBat();
	var uni = location.href.split('uni')[1].split('.')[0]; // recup du numéro de l'univers
	var sel = document.getElementById('selectBat').selectedIndex; // numéro de la sélection
	var option = getSelectValue('selectBat'); // texte de la selection
	var uN = parseInt( document.getElementById('uNanite').value ) ;// nanites
	var uR = parseInt( document.getElementById('uRobot').value ) ; // robot
	var temp = parseInt( document.getElementById('labo2').value ); // température ou Tech energie
	var speed = parseInt(document.getElementById('Speed').value); // vitesse
	var nb = parseInt(document.getElementById('lvl').value); // lvl du batiment
	var metal=0;
	var cristal = 0;
	var deut = 0;
	var time=0;
	var text='';
	var prod=0;
	var oldProd=0;
	var conso=0;
	var oldConso=0;
	var capacity=0;
	var oldCapacity=0;
	switch (sel)
	{
		case 0 :	metal= (60)* (Math.pow(1.5,(nb-1))); // mine métal
					cristal= (15)* (Math.pow(1.5,(nb-1)));
					deut=(0)* (Math.pow(1.5,(nb-1)));
					prod = speed * parseInt(Math.round(30 * nb * (Math.pow(1.1,nb))));
					conso=parseInt(Math.round(10 * nb * (Math.pow(1.1,nb))));
					oldConso = parseInt(Math.round(10 * (nb-1) * (Math.pow(1.1,(nb-1)))));
					if (country == 'fr')
					{
						text='<br><img src="'+metPic+'"/> Production : <font color=green><b>' + prod + ' </b></font>métal/heure.<br><img src="'+enPic+'"/> Consommation : <font color=yellow><b>'+conso+' energy.</b></font> Différence : <font color=yellow><b>-'+(conso-oldConso)+'.</b></font>';
					}
					else
					{
						text='<br><img src="'+metPic+'"/> Production : <font color=green><b>' + prod + ' </b></font>metal/hour.<br><img src="'+enPic+'"/> Consumption : <font color=yellow><b>'+conso+' energy.</b></font> Difference : <font color=yellow><b>-'+(conso-oldConso)+'.</b></font>';
					}
				break;
		case 1 :	metal= (48)* (Math.pow(1.6,(nb-1))); // mine cristal
					cristal= (24)* (Math.pow(1.6,(nb-1)));
					deut=(0)* (Math.pow(1.6,(nb-1)));
					prod = speed * parseInt(Math.round(20 * nb * (Math.pow(1.1,nb))));
					conso=parseInt(Math.round(10 * nb * (Math.pow(1.1,nb))));
					oldConso = parseInt(Math.round(10 * (nb-1) * (Math.pow(1.1,(nb-1)))));
					if (country == 'fr')
					{
						text='<br><img src="'+crisPic+'"/> Production : <font color=green><b>' + prod + ' </b></font>cristal/heure.<br><img src="'+enPic+'"/> Consommation : <font color=yellow><b>'+conso+' energy.</b></font> Différence : <font color=yellow><b>-'+(conso-oldConso)+'.</b></font>';
					}
					else
					{
						text='<br><img src="'+crisPic+'"/> Production : <font color=green><b>' + prod + ' </b></font>crystal/hour.<br><img src="'+enPic+'"/> Consumption : <font color=yellow><b>'+conso+' energy.</b></font> Difference : <font color=yellow><b>-'+(conso-oldConso)+'.</b></font>';
					}
				break;
		case 2 :	metal= (225)* (Math.pow(1.5,(nb-1))); // synthé deut
					cristal= (75)* (Math.pow(1.5,(nb-1)));
					deut=(0)* (Math.pow(1.5,(nb-1)));
					//prod = speed * parseInt(Math.round(10 * nb * (Math.pow(1.1,nb) * (-0.002 * temp + 1.28) ))); 	
					/*if ( parseInt(uni)<66) // Astro/Expe
					{*/
						var prod = speed * parseInt(Math.floor(10 * nb * (Math.pow(1.1,nb) * (1.44 - (temp * 0.004) ))));
					/*}
					else
					{
						var prod = speed * parseInt(Math.round(10 * nb * (Math.pow(1.1,nb) * (-0.002 * temp + 1.28) ))); // Ancienne formule
					}*/
					conso=parseInt(Math.round(20 * nb * (Math.pow(1.1,nb))));
					oldConso = parseInt(Math.round(20 * (nb-1) * (Math.pow(1.1,(nb-1)))));
					if (country == 'fr')
					{
						text='<br><img src="'+deutPic+'"/> Production : <font color=green><b>' + prod + ' </b></font>deuterium/heure.<br><img src="'+enPic+'"/> Consommation : <font color=yellow><b>'+conso+' energy.</b></font> Différence : <font color=yellow><b>-'+(conso-oldConso)+'.</b></font>   <img src="http://www.legendra.com/skins_images/common/icones_globales/icone_aide.png" title="Veuillez saisir la température Max.">';
					}
					else
					{
						text='<br><img src="'+deutPic+'"/> Production : <font color=green><b>' + prod + ' </b></font>deuterium/hour.<br><img src="'+enPic+'"/> Consumption : <font color=yellow><b>'+conso+' energy.</b></font> Difference : <font color=yellow><b>-'+(conso-oldConso)+'.</b></font>   <img src="http://www.legendra.com/skins_images/common/icones_globales/icone_aide.png" title="Please, enter your Max. Temperature.">';
					}
					
				break;
		case 3 :	metal= (75)* (Math.pow(1.5,(nb-1))); // centrale solaire
					cristal= (30)* (Math.pow(1.5,(nb-1)));
					deut=0;
					conso=parseInt(Math.round(20 * nb * (Math.pow(1.1,nb)))); // prod
					oldConso = parseInt(Math.round(20 * (nb-1) * (Math.pow(1.1,(nb-1)))));
					if (country == 'fr')
					{
						text='<br><img src="'+enPic+'"/>Production :  <font color=green><b>'+conso+' energy.</b></font> Différence : <font color=green><b>+'+(conso-oldConso)+'.</b></font>';	
					}
					else
					{
						text='<br><img src="'+enPic+'"/>Production :  <font color=green><b>'+conso+' energy.</b></font> Difference : <font color=green><b>+'+(conso-oldConso)+'.</b></font>';
					}
				break;
		case 4 :	metal= (900)* (Math.pow(1.8,(nb-1))); // centrale fusion
					cristal= (360)* (Math.pow(1.8,(nb-1)));
					deut=(180)* (Math.pow(1.8,(nb-1)));
					if(temp < 3)
					{
						temp=3;
					}
					prod = parseInt(Math.round(30 * nb * (Math.pow((1.05 + temp * 0.01),nb)  ))); // Prod energie
					oldProd=parseInt(Math.round(30 * (nb-1) * (Math.pow((1.05 + temp * 0.01),(nb-1))  ))); // Prod energie level précédent
					conso=parseInt(Math.round(10 * nb * (Math.pow(1.1,nb)))); // conso deut
					oldConso = parseInt(Math.round(10 * (nb-1) * (Math.pow(1.1,(nb-1) )))); // conso deut level précedent
					if (country == 'fr')
					{
						text='<br><img src="'+deutPic+'"/> Consommation : <font color=red><b>' + conso + ' </b></font>deuterium/heure. Difference : <font color=red><b>-'+(conso-oldConso)+'</b></font><br><img src="'+enPic+'"/> Production : <font color=green><b>'+prod+' energy.</b></font> Différence : <font color=green><b>+'+(prod-oldProd)+'.</b></font>   <img src="http://www.legendra.com/skins_images/common/icones_globales/icone_aide.png" title="Veuillez saisir le niveau de la technologie Énergie.">';
					}
					else
					{
						text='<br><img src="'+deutPic+'"/> Consumption : <font color=red><b>' + conso + ' </b></font>deuterium/hour. Difference : <font color=red><b>-'+(conso-oldConso)+'</b></font><br><img src="'+enPic+'"/> Production : <font color=green><b>'+prod+' energy.</b></font> Difference : <font color=green><b>+'+(prod-oldProd)+'.</b></font>   <img src="http://www.legendra.com/skins_images/common/icones_globales/icone_aide.png" title="Please, enter your Energy Tech. level.">';
					}
				break;
		case 5 :	metal= (400)* (Math.pow(2,(nb-1))); // usine robot
					cristal= (120)* (Math.pow(2,(nb-1)));
					deut=(200)* (Math.pow(2,(nb-1)));
				break; 
		case 6 :	metal= (1000000)* (Math.pow(2,(nb-1))); // usine nanite
					cristal= (500000)* (Math.pow(2,(nb-1)));
					deut=(100000)* (Math.pow(2,(nb-1)));
				break;
		case 7 :	metal= (400)* (Math.pow(2,(nb-1))); // chantier spatial
					cristal= (200)* (Math.pow(2,(nb-1)));
					deut=(100)* (Math.pow(2,(nb-1)));
				break;
		case 8 :	metal= (200)* (Math.pow(2,(nb-1))); // labo
					cristal= (400)* (Math.pow(2,(nb-1)));
					deut=(200)* (Math.pow(2,(nb-1)));
				break;
		case 9 :	/*if ( parseInt(uni)<66)
						{			
						metal= (2000)* (Math.pow(2,(nb-1))); // HANGAR METAL
						cristal= (0)* (Math.pow(2,(nb-1)));
						deut=(0)* (Math.pow(2,(nb-1)));
						capacity= 100000 + 50000 * Math.floor(Math.pow(1.6,nb));
							if(nb == 1)
							{
								oldCapacity=100000;
							}
							else
							{
								oldCapacity= 100000 + 50000 * Math.floor(Math.pow(1.6,(nb-1)));
							}
						}
						else
						{*/
						metal= (1000)* (Math.pow(2,(nb-1)));  
						cristal= (0)* (Math.pow(2,(nb-1)));
						deut=(0)* (Math.pow(2,(nb-1)));
						capacity= Math.floor((2.5 * Math.exp(20*nb/33))) * 5000;
						oldCapacity= Math.floor((2.5 * Math.exp(20*(nb-1)/33))) * 5000;
						//}
						if (country == 'fr')
						{
							text='Capacité : <font color=orange><b>'+parseString(capacity,0)+' </b></font>Différence : <font color=orange><b>+'+parseString(capacity-oldCapacity,0)+'</b></font>.';
						}
						else
						{
							text='Capacity : <font color=orange><b>'+parseString(capacity,0)+' </b></font>Difference : <font color=orange><b>+'+parseString(capacity-oldCapacity,0)+'</b></font>.';
						}
				break;
		case 10 :	/*if ( parseInt(uni)<66)
						{			
						metal= (2000)* (Math.pow(2,(nb-1))); // HANGAR CRISTAL
						cristal= (1000)* (Math.pow(2,(nb-1)));
						deut=(0)* (Math.pow(2,(nb-1)));
						capacity= 100000 + 50000 * Math.floor(Math.pow(1.6,nb));
							if(nb == 1)
							{
								oldCapacity=100000;
							}
							else
							{
								oldCapacity= 100000 + 50000 * Math.floor(Math.pow(1.6,(nb-1)));
							}
						}
						else
						{*/
						metal= (1000)* (Math.pow(2,(nb-1))); 
						cristal= (500)* (Math.pow(2,(nb-1)));
						deut=(0)* (Math.pow(2,(nb-1)));
						capacity= Math.floor((2.5 * Math.exp(20*nb/33))) * 5000;
						oldCapacity= Math.floor((2.5 * Math.exp(20*(nb-1)/33))) * 5000;
						//}
						if (country == 'fr')
						{
							text='Capacité : <font color=orange><b>'+parseString(capacity,0)+' </b></font>Différence : <font color=orange><b>+'+parseString(capacity-oldCapacity,0)+'</b></font>.';
						}
						else
						{	
							text='Capacity : <font color=orange><b>'+parseString(capacity,0)+' </b></font>Difference : <font color=orange><b>+'+parseString(capacity-oldCapacity,0)+'</b></font>.';
						}
				break;
		case 11 :	/*if ( parseInt(uni)<66)
						{			
						metal= (2000)* (Math.pow(2,(nb-1))); // HANGAR DEUT
						cristal= (2000)* (Math.pow(2,(nb-1)));
						deut=(0)* (Math.pow(2,(nb-1)));
						capacity= 100000 + 50000 * Math.floor(Math.pow(1.6,nb));
							if(nb == 1)
							{
								oldCapacity=100000;
							}
							else
							{
								oldCapacity= 100000 + 50000 * Math.floor(Math.pow(1.6,(nb-1)));
							}
						}
						else
						{*/
						metal= (1000)* (Math.pow(2,(nb-1))); 
						cristal= (1000)* (Math.pow(2,(nb-1)));
						deut=(0)* (Math.pow(2,(nb-1)));
						capacity= Math.floor((2.5 * Math.exp(20*nb/33))) * 5000;
						oldCapacity= Math.floor((2.5 * Math.exp(20*(nb-1)/33))) * 5000;
						//}
						if (country == 'fr')
						{
							text='Capacité : <font color=orange><b>'+parseString(capacity,0)+' </b></font>Différence : <font color=orange><b>+'+parseString(capacity-oldCapacity,0)+'</b></font>.';
						}
						else
						{
							text='Capacity : <font color=orange><b>'+parseString(capacity,0)+' </b></font>Difference : <font color=orange><b>+'+parseString(capacity-oldCapacity,0)+'</b></font>.';
						}
				break;
		case 12 :	metal= (20000)* (Math.pow(2,(nb-1))); // sillo
					cristal= (20000)* (Math.pow(2,(nb-1)));
					deut=(1000)* (Math.pow(2,(nb-1)));
				break;
		case 13 :	metal= (20000)* (Math.pow(2,(nb-1))); // Depot
					cristal= (40000)* (Math.pow(2,(nb-1)));
					deut=(400)* (Math.pow(2,(nb-1)));
				break;
		case 14 :	metal= (0)* (Math.pow(2,(nb-1))); // terra
					cristal= (50000)* (Math.pow(2,(nb-1)));
					deut=(100000)* (Math.pow(2,(nb-1)));
					var energy=  (1000)* (Math.pow(2,(nb-1)));
					text='<img src="'+enPic+'"/><font color=yellow><b>'+energy+'</b></font>';
				break;	
		case 15 :	metal= (20000)* (Math.pow(2,(nb-1)));// base lunaire
					cristal= (40000)* (Math.pow(2,(nb-1)));
					deut=(20000)* (Math.pow(2,(nb-1)));
				break;
		case 16 :	metal= (20000)* (Math.pow(2,(nb-1))); // phallange
					cristal= (40000)* (Math.pow(2,(nb-1)));
					deut=(20000)* (Math.pow(2,(nb-1)));
					var range=(nb)*(nb);
					if (country == 'fr')
					{
						text='Portée : <b>'+range+'<b> Systemes solaires';
					}
					else
					{
						text='Range : <b>'+range+'<b> Solar Systems';
					}
				break;
		case 17 :	metal= (2000000)* (Math.pow(2,(nb-1))); // Porte de saut
					cristal= (4000000)* (Math.pow(2,(nb-1)));
					deut=(2000000)* (Math.pow(2,(nb-1)));
				break;				
	}
	
	time = 3600 *( (metal + cristal) / 5000 ) * ( 2 / ( 1 + uR) * Math.pow(0.5,uN)); // calcul temps de construction
	if (country == 'fr')
	{
		document.getElementById('result').innerHTML = '<div id=textDet" style="width="300"; height="180";" align="center"><h2>Détail</h2><br> <b>'+ option + ' '+nb+'</b> <br><b>Unité: <img src="'+metPic+'"/> </b>'+parseString(parseInt(metal),1)+'<b> <img src="'+crisPic+'"/> </b>'+parseString(parseInt(cristal),1)+'<b> <img src="'+deutPic+'"/> </b>'+parseString(parseInt(deut),1)+'<br><b> Nombre Points : </b>'+parseString(parseInt((metal+cristal+deut)/1000),1)+'<b> Temps : </b><b><font color=#009999>'+convDate(Math.round(time/speed))+' </font></b><br>'+text+' <span id="metCost" style="visibility: hidden">'+metal+'</span><span id="crisCost" style="visibility: hidden">'+cristal+'</span><span id="deutCost" style="visibility: hidden">'+deut+'</span><span id="timeProp" style="visibility: hidden">'+Math.round(time/speed)+'</span>'; // affichage
	}
	else
	{
		document.getElementById('result').innerHTML = '<div id=textDet" style="width="300"; height="180";" align="center"><h2>Detail</h2><br> <b>'+ option + ' '+nb+'</b> <br><b>Single: <img src="'+metPic+'"/> </b>'+parseString(parseInt(metal),1)+'<b> <img src="'+crisPic+'"/> </b>'+parseString(parseInt(cristal),1)+'<b> <img src="'+deutPic+'"/> </b>'+parseString(parseInt(deut),1)+'<br><b> Total points : </b>'+parseString(parseInt((metal+cristal+deut)/1000),1)+'<b> Duration : </b><b><font color=#009999>'+convDate(Math.round(time/speed))+' </font></b><br>'+text+' <span id="metCost" style="visibility: hidden">'+metal+'</span><span id="crisCost" style="visibility: hidden">'+cristal+'</span><span id="deutCost" style="visibility: hidden">'+deut+'</span><span id="timeProp" style="visibility: hidden">'+Math.round(time/speed)+'</span>'; // affichage
	}
}
function searchF() // affiches les données correspondantes aux recherches
{
	checkSearch();
	var uni = location.href.split('uni')[1].split('.')[0]; // recup du numéro de l'univers
	var sel = document.getElementById('selectSearch').selectedIndex; // valeur selection
	var option = getSelectValue('selectSearch'); // texte selection
	var labo = parseInt( document.getElementById('labo2').value ); // niveau labo
	var speed = document.getElementById('Speed').value; // vitesse
	var nb = parseInt(document.getElementById('lvl').value); // lvl techno
	var metal=0;
	var cristal = 0;
	var deut = 0;
	var time=0;
	var text='';
	var range=0;
	switch (sel)
	{
		case 0 :	metal= (0)* (Math.pow(2,(nb-1))); // energie
					cristal= (800)* (Math.pow(2,(nb-1)));
					deut=(400)* (Math.pow(2,(nb-1)));
				break;
		case 1 :	metal= (200)* (Math.pow(2,(nb-1))); // Laser
					cristal= (100)* (Math.pow(2,(nb-1)));
					deut=(0)* (Math.pow(2,(nb-1)));
				break;
		case 2 :	metal= (1000)* (Math.pow(2,(nb-1))); // ion
					cristal= (300)* (Math.pow(2,(nb-1)));
					deut=(100)* (Math.pow(2,(nb-1)));
				break;
		case 3 :	metal= (0)* (Math.pow(2,(nb-1))); //tech hyper
					cristal= (4000)* (Math.pow(2,(nb-1)));
					deut=(2000)* (Math.pow(2,(nb-1)));
				break;				
		case 4 :	metal= (2000)* (Math.pow(2,(nb-1)));// plasma
					cristal= (4000)* (Math.pow(2,(nb-1)));
					deut=(1000)* (Math.pow(2,(nb-1)));
				break;
		case 5 :	metal= (400)* (Math.pow(2,(nb-1))); // combu
					cristal= (0)* (Math.pow(2,(nb-1)));
					deut=(600)* (Math.pow(2,(nb-1)));
				break;
		case 6 :	metal= (2000)* (Math.pow(2,(nb-1))); // impu
					cristal= (4000)* (Math.pow(2,(nb-1)));
					deut=(600)* (Math.pow(2,(nb-1)));
					range= 5 * nb -1;
					if (country == 'fr')
					{
						text='Portée : <b>'+range+'</b> Systemes solaires.';
					}
					else
					{
						text='Range : <b>'+range+'</b> Solar Systems.';
					}
				break;
		case 7 :	metal= (10000)* (Math.pow(2,(nb-1))); // prop Hyper
					cristal= (20000)* (Math.pow(2,(nb-1)));
					deut=(6000)* (Math.pow(2,(nb-1)));
				break;
		case 8 :	metal= (200)* (Math.pow(2,(nb-1))); // espio
					cristal= (1000)* (Math.pow(2,(nb-1)));
					deut=(200)* (Math.pow(2,(nb-1)));
				break;
		case 9 :	metal= (0)* (Math.pow(2,(nb-1))); // ordi
					cristal= (400)* (Math.pow(2,(nb-1)));
					deut=(600)* (Math.pow(2,(nb-1)));
				break;
		case 10 :		/*if ( parseInt(uni)<66) // Astro/Expe
						{
							metal=(4000)* (Math.pow(2,(nb-1)));
							cristal= (8000)* (Math.pow(2,(nb-1)));
							deut=(4000)* (Math.pow(2,(nb-1)));
						}
						else
						{*/
							metal=parseInt( (4000)* (Math.pow(1.75,(nb-1)))); // Depuis mise à jour, seulement Tech Astro
							cristal= parseInt((8000)* (Math.pow(1.75,(nb-1))));
							deut= parseInt((4000)* (Math.pow(1.75,(nb-1))));
						//}
				break;
		case 11 :	metal= (200000)* (Math.pow(2,(nb-1))); // RRI
					cristal= (400000)* (Math.pow(2,(nb-1)));
					deut=(160000)* (Math.pow(2,(nb-1)));
				break;
		/*case 12 :	metal= (800)* (Math.pow(2,(nb-1))); //GRAVITON
					cristal= (0)* (Math.pow(2,(nb-1)));
					deut=(400)* (Math.pow(2,(nb-1)));
				break;*/
		case 13 :	metal= (800)* (Math.pow(2,(nb-1))); // arme
					cristal= (200)* (Math.pow(2,(nb-1)));
					deut=(0)* (Math.pow(2,(nb-1)));
				break;
		case 14 :	metal= (200)* (Math.pow(2,(nb-1))); // bouclier
					cristal= (600)* (Math.pow(2,(nb-1)));
					deut=(0)* (Math.pow(2,(nb-1)));
				break;
		case 15 :	metal= (1000)* (Math.pow(2,(nb-1))); // protec
					cristal= (0)* (Math.pow(2,(nb-1)));
					deut=(0)* (Math.pow(2,(nb-1)));
				break;				
	}
	if(sel == 12) // Si tech Graviton
	{
		if (country == 'fr')
		{
			document.getElementById('result').innerHTML = '<div id=textDet" style="width="300"; height="180";" align="center"><h2>Détail</h2><br> <b>'+ option + ' '+nb+'</b> <br><b>Unité: <img src="'+enPic+'"/><b><font color=red> 300.000 energy </b></font><b> Temps : </b><b><font color=#009999>'+1+'s </font></b><br>'+text; // affichage particulier (temps de recherche = 1 sec
		}
		else
		{
			document.getElementById('result').innerHTML = '<div id=textDet" style="width="300"; height="180";" align="center"><h2>Detail</h2><br> <b>'+ option + ' '+nb+'</b> <br><b>Single: <img src="'+enPic+'"/><b><font color=red> 300.000 energy </b></font><b> Duration : </b><b><font color=#009999>'+1+'s </font></b><br>'+text; // affichage particulier (temps de recherche = 1 sec
		}
	}
	else
	{
		time = 3600 *( metal + cristal ) / ( 1000 * (1 + labo)); // calcul temps recherche
		if (country == 'fr')
		{
			document.getElementById('result').innerHTML = '<div id=textDet" style="width="300"; height="180";" align="center"><h2>Détail</h2><br> <b>'+ option + ' '+nb+'</b> <br><b>Unité: <img src="'+metPic+'"/> </b>'+parseString(metal,1)+'<b> <img src="'+crisPic+'"/> </b>'+parseString(cristal,1)+'<b> <img src="'+deutPic+'"/> </b>'+parseString(deut,1)+'<br><b> Nombre Points : </b>'+parseString(parseInt((metal+cristal+deut)/1000),1)+'<b> Temps : </b><b><font color=#009999>'+convDate(Math.round(time/speed))+' </font></b></b><br>'+text+'<span id="metCost" style="visibility: hidden">'+metal+'</span><span id="crisCost" style="visibility: hidden">'+cristal+'</span><span id="deutCost" style="visibility: hidden">'+deut+'</span><span id="timeProp" style="visibility: hidden">'+Math.round(time/speed)+'</span>'; // affichage
		}
		else
		{
			document.getElementById('result').innerHTML = '<div id=textDet" style="width="300"; height="180";" align="center"><h2>Detail</h2><br> <b>'+ option + ' '+nb+'</b> <br><b>Single: <img src="'+metPic+'"/> </b>'+parseString(metal,1)+'<b> <img src="'+crisPic+'"/> </b>'+parseString(cristal,1)+'<b> <img src="'+deutPic+'"/> </b>'+parseString(deut,1)+'<br><b> Total Points : </b>'+parseString(parseInt((metal+cristal+deut)/1000),1)+'<b> Duration : </b><b><font color=#009999>'+convDate(Math.round(time/speed))+' </font></b></b><br>'+text+'<span id="metCost" style="visibility: hidden">'+metal+'</span><span id="crisCost" style="visibility: hidden">'+cristal+'</span><span id="deutCost" style="visibility: hidden">'+deut+'</span><span id="timeProp" style="visibility: hidden">'+Math.round(time/speed)+'</span>'; // affichage
		}
	}
}
function shipF() // affiches les données correspondantes aux vaisseaux
{
	checkShipDef();
	var uni = location.href.split('uni')[1].split('.')[0]; // recup du numéro de l'univers
	var sel = document.getElementById('selectShip').selectedIndex; // valeur selection
	var temp = parseInt( document.getElementById('labo2').value ); // température
	var tempMin = parseInt( document.getElementById('uRobot').value ) ; // Température minimale
	var option = getSelectValue('selectShip'); // texte selection
	var cs = parseInt( document.getElementById('Cspatial2').value ); // chantier spatial
	var uN = parseInt( document.getElementById('uNanite').value ) ; // usine nanite
	var speed = document.getElementById('Speed').value; // vitesse
	var nb = parseInt(document.getElementById('lvl').value); // nombre vaisseaux commandés
	var metal=0;
	var cristal = 0;
	var deut = 0;
	var time=0;
	switch (sel)
	{
		case 0 : 	metal=3000; // Clé
					cristal=1000;
				break;
		case 1 : 	metal=6000;  // Clo
					cristal=4000;
				break;
		case 2 : 	metal=20000; // Cro
					cristal=7000;
					deut=2000;
				break;			
		case 3 : 	metal=45000; // Vb
					cristal=15000;
				break;	
		case 4 : 	metal=30000; // Traq
					cristal=40000;
					deut=15000;
				break;	
		case 5 : 	metal=50000; // BB
					cristal=25000;
					deut = 15000;
				break;	
		case 6 : 	metal=60000; // Destro
					cristal=50000;
					deut=15000;
				break;
		case 7 : 	metal=5000000; //Rip
					cristal=4000000;
					deut=1000000;
				break;
		case 8 : 	metal=2000; //PT
					cristal=2000;
				break;
		case 9 : 	metal=6000; // GT
					cristal=6000;
				break;
		case 10 : 	metal=10000; //VC
					cristal=20000;
					deut = 10000;
				break;
		case 11 : 	metal=10000; //Cyclo
					cristal=6000;
					deut=2000;
				break;			
		case 12 : 	metal=0; //Sonde
					cristal=1000;
				break;
		case 13 : 	metal=0; // Satellite
					cristal=2000;
					deut = 500;
				break;
	}
	time = 3600 * ( ((cristal + metal) /5000 ) * ( 2 / (1 + cs)) * (Math.pow(0.5,uN)) ); // calcul temps constru à l'unité
	if (country == 'fr')
	{
		document.getElementById('result').innerHTML = '<div id=textDet" style="width="300"; height="180";" align="center"><h2>Détail</h2><br> <b>'+ option +'</b> <br><b>Unité: <img src="'+metPic+'"/> </b>'+parseString(metal,1)+'<b> <img src="'+crisPic+'"/> </b>'+parseString(cristal,1)+'<b> <img src="'+deutPic+'"/> </b>'+parseString(deut,1)+'<br><b> Nombre Points : </b>'+parseString((metal+cristal+deut)/1000, 1)+'<b> Temps : </b><b><font color=#009999>'+convDate(Math.floor(time/speed))+' </font></b><span id="metCost" style="visibility: hidden">'+metal+'</span><span id="crisCost" style="visibility: hidden">'+cristal+'</span><span id="deutCost" style="visibility: hidden">'+deut+'</span><span id="timeProp" style="visibility: hidden">'+Math.floor(time/speed)+'</span>'; // affichage unité
	}
	else
	{
		document.getElementById('result').innerHTML = '<div id=textDet" style="width="300"; height="180";" align="center"><h2>Detail</h2><br> <b>'+ option +'</b> <br><b>Single: <img src="'+metPic+'"/> </b>'+parseString(metal,1)+'<b> <img src="'+crisPic+'"/> </b>'+parseString(cristal,1)+'<b> <img src="'+deutPic+'"/> </b>'+parseString(deut,1)+'<br><b> Total Points : </b>'+parseString((metal+cristal+deut)/1000, 1)+'<b> Duration : </b><b><font color=#009999>'+convDate(Math.floor(time/speed))+' </font></b><span id="metCost" style="visibility: hidden">'+metal+'</span><span id="crisCost" style="visibility: hidden">'+cristal+'</span><span id="deutCost" style="visibility: hidden">'+deut+'</span><span id="timeProp" style="visibility: hidden">'+Math.floor(time/speed)+'</span>'; // affichage unité
	}
	if(sel==13) // Si satellite, unité
		{
			//var prod = ((temp/4)+20);

				var prod = parseInt(Math.floor(((tempMin + temp)/2)+160) / 6); // Nouvelle Formule
		if(prod>51) // Si val calculée >51 (maxi possible)
			prod=51;
		if(prod<0)
			prod=0;
			if (country == 'fr')
			{
				document.getElementById('result').innerHTML +='<b>Production : <img src="'+enPic+'"/><font color=green> '+parseString(parseInt(prod),0)+' Energy</b></font>  <img src="http://www.legendra.com/skins_images/common/icones_globales/icone_aide.png" title="Veuillez saisir les températures min et max.">'; // affichage	
			}
			else
			{
				document.getElementById('result').innerHTML +='<b>Production : <img src="'+enPic+'"/><font color=green> '+parseString(parseInt(prod),0)+' Energy</b></font>  <img src="http://www.legendra.com/skins_images/common/icones_globales/icone_aide.png" title="Please, enter Min and Max Temperatures">'; // affichage
			}
		
		}
	if ( nb > 1 ) // Si commande de plus de 1 vaisseaux
		{
			if (country == 'fr')
			{
				document.getElementById('result').innerHTML += '<br><b>Total(x'+nb+'): <img src="'+metPic+'"/> </b>'+parseString(nb*metal ,1)+'<b> <img src="'+crisPic+'"/> </b>'+parseString(nb*cristal ,1)+'<b> <img src="'+deutPic+'"/> </b>'+parseString(nb*deut,1)+'<br><b> Nombre Points : </b>'+parseString((nb*(metal+cristal+deut))/1000 ,1)+'<b> Temps : </b><b><font color=#009999>'+convDate(Math.floor((time/speed)*nb))+' </font></b><span id="metCostT" style="visibility: hidden">'+nb*metal+'</span><span id="crisCostT" style="visibility: hidden">'+nb*cristal+'</span><span id="deutCostT" style="visibility: hidden">'+nb*deut+'</span><span id="timePropT" style="visibility: hidden">'+nb*Math.floor(time/speed)+'</span>'; // affichage
			}
			else
			{
				document.getElementById('result').innerHTML += '<br><b>Total(x'+nb+'): <img src="'+metPic+'"/> </b>'+parseString(nb*metal ,1)+'<b> <img src="'+crisPic+'"/> </b>'+parseString(nb*cristal ,1)+'<b> <img src="'+deutPic+'"/> </b>'+parseString(nb*deut,1)+'<br><b> Total Points : </b>'+parseString((nb*(metal+cristal+deut))/1000 ,1)+'<b> Duration : </b><b><font color=#009999>'+convDate(Math.floor((time/speed)*nb))+' </font></b><span id="metCostT" style="visibility: hidden">'+nb*metal+'</span><span id="crisCostT" style="visibility: hidden">'+nb*cristal+'</span><span id="deutCostT" style="visibility: hidden">'+nb*deut+'</span><span id="timePropT" style="visibility: hidden">'+nb*Math.floor(time/speed)+'</span>'; // affichage
			}
		if(sel==13) // si sat
		{
			if (country == 'fr')
			{
				document.getElementById('result').innerHTML +='<b>Production : <img src="'+enPic+'"/><font color=green> '+parseString(parseInt(nb*prod),0)+' Energy</b></font>';  // affichage
			}
			else
			{
				document.getElementById('result').innerHTML +='<b>Production : <img src="'+enPic+'"/><font color=green> '+parseString(parseInt(nb*prod),0)+' Energy</b></font>';  // affichage
			}
		}
			
		}
	
	document.getElementById('result').innerHTML +='</div>'; // fermeture balise div
}
function defF() // affiches les données correspondantes aux défenses
{
	checkShipDef();
	var sel = document.getElementById('selectDefense').selectedIndex; // valeur selection
	var option = getSelectValue('selectDefense'); // texte selection
	var cs = parseInt( document.getElementById('Cspatial2').value ); // chantier spatial
	var uN = parseInt( document.getElementById('uNanite').value ) ; // usine nanite
	var speed = document.getElementById('Speed').value; // vitesse
	var nb = parseInt(document.getElementById('lvl').value); // nombre def commandées
	var metal=0; 
	var cristal = 0;
	var deut = 0;
	var time=0;
	switch (sel)
	{
		case 0 : 	metal=2000; // LM
				break;
		case 1 : 	metal=1500; // Llé
					cristal=500;
				break;
		case 2 : 	metal=6000; // LLo
					cristal=2000;
				break;			
		case 3 : 	metal=20000; // CG
					cristal=15000;
					deut = 2000;
				break;	
		case 4 : 	metal=2000; // AI
					cristal=6000;
				break;	
		case 5 : 	metal=50000; // LP
					cristal=50000;
					deut = 30000;
				break;	
		case 6 : 	metal=10000; // PB
					cristal=10000;
				break;
		case 7 : 	metal=50000; //GB
					cristal=50000;
				break;
		case 8 : 	metal=8000; //MI
					cristal=0;
					deut = 2000;
				break;
		case 9 : 	metal=12500; //MIP
					cristal=2500;
					deut = 10000;
				break;
	}
					time = 3600 * ( ((cristal + metal) /5000 ) * ( 2 / (1 + cs)) * (Math.pow(0.5,uN)) ); // calcul temps constru
	if (country == 'fr')
	{
		document.getElementById('result').innerHTML = '<div id=textDet" style="width="300"; height="180";" align="center"><h2>Détail</h2><br> <b>'+ option +'</b> <br><b>Unité: <img src="'+metPic+'"/> </b>'+parseString(metal,1)+' <b> <img src="'+crisPic+'"/> </b>'+parseString(cristal,1)+'<b> <img src="'+deutPic+'"/> </b>'+parseString(deut,1)+'<br><b> Nombre Points : </b>'+parseString((metal+cristal+deut)/1000 ,1)+'<b> Temps : </b><b><font color=#009999>'+convDate(Math.round(time/speed))+' </font></b><span id="metCost" style="visibility: hidden">'+metal+'</span><span id="crisCost" style="visibility: hidden">'+cristal+'</span><span id="deutCost" style="visibility: hidden">'+deut+'</span><span id="timeProp" style="visibility: hidden">'+Math.round(time/speed)+'</span>';
	}
	else
	{
		document.getElementById('result').innerHTML = '<div id=textDet" style="width="300"; height="180";" align="center"><h2>Detail</h2><br> <b>'+ option +'</b> <br><b>Single <img src="'+metPic+'"/> </b>'+parseString(metal,1)+' <b> <img src="'+crisPic+'"/> </b>'+parseString(cristal,1)+'<b> <img src="'+deutPic+'"/> </b>'+parseString(deut,1)+'<br><b> Total Points : </b>'+parseString((metal+cristal+deut)/1000 ,1)+'<b> Duration : </b><b><font color=#009999>'+convDate(Math.round(time/speed))+' </font></b><span id="metCost" style="visibility: hidden">'+metal+'</span><span id="crisCost" style="visibility: hidden">'+cristal+'</span><span id="deutCost" style="visibility: hidden">'+deut+'</span><span id="timeProp" style="visibility: hidden">'+Math.round(time/speed)+'</span>';
	}
	if ( nb > 1 ) // si commande de plus d'une défense
		{
			if (country == 'fr')
			{
				document.getElementById('result').innerHTML += '<br><b>Total(x'+nb+'): <img src="'+metPic+'"/> </b>'+parseString(nb*metal ,1)+'<b> <img src="'+crisPic+'"/> </b>'+parseString(nb*cristal)+'<b> <img src="'+deutPic+'"/> </b>'+parseString(nb*deut ,1)+'<br><b> Nombre Points : </b>'+parseString((nb*(metal+cristal+deut))/1000 ,1)+'<b> Temps : </b><b><font color=#009999>'+convDate(Math.round((time/speed)*nb))+' </font></b><span id="metCostT" style="visibility: hidden">'+nb*metal+'</span><span id="crisCostT" style="visibility: hidden">'+nb*cristal+'</span><span id="deutCostT" style="visibility: hidden">'+nb*deut+'</span><span id="timePropT" style="visibility: hidden">'+nb*Math.round(time/speed)+'</span>'; // affichage
			}
			else
			{
				document.getElementById('result').innerHTML += '<br><b>Total(x'+nb+'): <img src="'+metPic+'"/> </b>'+parseString(nb*metal ,1)+'<b> <img src="'+crisPic+'"/> </b>'+parseString(nb*cristal)+'<b> <img src="'+deutPic+'"/> </b>'+parseString(nb*deut ,1)+'<br><b> Total Points : </b>'+parseString((nb*(metal+cristal+deut))/1000 ,1)+'<b> Duration : </b><b><font color=#009999>'+convDate(Math.round((time/speed)*nb))+' </font></b><span id="metCostT" style="visibility: hidden">'+nb*metal+'</span><span id="crisCostT" style="visibility: hidden">'+nb*cristal+'</span><span id="deutCostT" style="visibility: hidden">'+nb*deut+'</span><span id="timePropT" style="visibility: hidden">'+nb*Math.round(time/speed)+'</span>'; // affichage
			}
		}
	
	document.getElementById('result').innerHTML +='</div>'; // fermeture balise div
}
//***
function convDate(date) // Conversion d'une durée en seconde en une durée selon SEMAINES_JOURS_HEURES_MINUTES_SECONDES
{
	var sem=0;
	var day=0;
	var hour = 0;
	var minute = 0;
	var seconde = 0;
	var date2=parseInt(date);
	sem = Math.floor(date2 / 604800);
	date2 = Math.floor(date2 % 604800);
	day = Math.floor(date2 / 86400);
	date2 = Math.floor(date2 % 86400);
	hour = Math.floor(date2 / 3600);
	date2 = Math.floor(date2 % 3600);
	minute = Math.floor(date2 / 60);
	seconde = Math.floor(date2 % 60);
	var res ='';
	if (country == 'fr')
	{
		if ( sem > 0)
			res += sem + 'sem';
		if ( day > 0 ) 
			res +=day + 'j';
		if ( hour > 0 ) 
			res +=hour + 'h';
		if ( minute > 0 ) 
			res += minute + 'm';
		if ( seconde > 0 )
			res += seconde + 's';
	}
	else
	{
		if ( sem > 0)
			res += sem + 'w';
		if ( day > 0 ) 
			res +=day + 'd';
		if ( hour > 0 ) 
			res +=hour + 'h';
		if ( minute > 0 ) 
			res += minute + 'm';
		if ( seconde > 0 )
			res += seconde + 's';
	}
		
	return res;

}

function add() // 	Ajoutte les données affichées au Total
{
if(document.getElementById('metCost')) 
{
	var metal = parseInt(document.getElementById('metCost').textContent);
	var cristal = parseInt(document.getElementById('crisCost').textContent);
	var deut = parseInt(document.getElementById('deutCost').textContent);
	var time = parseInt(document.getElementById('timeProp').textContent);

if(document.getElementById('metCostT')) // Si une commande multiple est affichée, ce sont ces données là qui sont prisent en compte.
{
	var metal = parseInt(document.getElementById('metCostT').textContent);
	var cristal = parseInt(document.getElementById('crisCostT').textContent);
	var deut = parseInt(document.getElementById('deutCostT').textContent);
	var time = parseInt(document.getElementById('timePropT').textContent);
}

		// VALEUR TOTALES
	var metal2 = parseInt(document.getElementById('invMet').textContent);
	var cristal2 = parseInt(document.getElementById('invCris').textContent);
	var deut2 = parseInt(document.getElementById('invDeut').textContent);
	var time2 = parseInt(document.getElementById('invTime').textContent);
	var total2 = parseInt(document.getElementById('invPoint').textContent);
	// AJOUT
	document.getElementById('totMet').innerHTML = '<font color=red><b>'+parseString(metal2+metal,0)+' &nbsp;&nbsp;&nbsp;&nbsp;</b></font>';
	document.getElementById('invMet').textContent = metal2+metal;
	document.getElementById('totCris').innerHTML = '<font color=red><b>'+parseString(cristal2+cristal,0)+' &nbsp;&nbsp;&nbsp;&nbsp;</b></font>';
	document.getElementById('invCris').textContent = cristal2+cristal;
	document.getElementById('totDeut').innerHTML = '<font color=red><b>'+parseString(deut2+deut,0)+' &nbsp;&nbsp;&nbsp;&nbsp;</b></font>';
	document.getElementById('invDeut').textContent = deut2+deut;
	document.getElementById('totTime').innerHTML = '<font color=#009999><b>'+convDate(time2+time)+' &nbsp;&nbsp;&nbsp;&nbsp;</b></font>';
	document.getElementById('invTime').textContent = time2+time;
	metal2 = parseInt(document.getElementById('invMet').textContent);
	cristal2 = parseInt(document.getElementById('invCris').textContent);
	deut2 = parseInt(document.getElementById('invDeut').textContent);
	document.getElementById('totPoint').innerHTML = '<font color=green><b>'+parseString(parseInt(( metal2 + cristal2 + deut2)/1000) )+' &nbsp;&nbsp;&nbsp;&nbsp;</b></font>';
	document.getElementById('invPoint').textContent = parseInt((metal2 + cristal2 + deut2)/1000);
}	


}

function raz() // remet à zéro les champs de Total
{
	document.getElementById('totMet').innerHTML = '<font color=red><b>0 &nbsp;&nbsp;&nbsp;&nbsp;</b></font>';
	document.getElementById('invMet').textContent = '0';
	document.getElementById('totCris').innerHTML = '<font color=red><b>0 &nbsp;&nbsp;&nbsp;&nbsp;</b></font>';
	document.getElementById('invCris').textContent = '0';
	document.getElementById('totDeut').innerHTML = '<font color=red><b>0 &nbsp;&nbsp;&nbsp;&nbsp;</b></font>';
	document.getElementById('invDeut').textContent = '0';
	document.getElementById('totTime').innerHTML = '<font color=#009999><b>0 &nbsp;&nbsp;&nbsp;&nbsp;</b></font>';
	document.getElementById('invTime').textContent = '0';
	document.getElementById('totPoint').innerHTML = '<font color=green><b>0 &nbsp;&nbsp;&nbsp;&nbsp;</b></font>';
	document.getElementById('invPoint').textContent = '0';
	

}

function save() // sauvegarde les paramètre actuellement saisis
{
	var uN = parseInt( document.getElementById('uNanite').value ) ; // Nanite
	var uR = parseInt( document.getElementById('uRobot').value ) ; // Robot
	var speed = parseInt(document.getElementById('Speed').value); // vitesse
	var nb = parseInt(document.getElementById('lvl').value); // niveau
	var labo = parseInt( document.getElementById('labo2').value ); // labo
	var cS = parseInt( document.getElementById('Cspatial2').value ) ; // Chantier Spatial
	GM_setValue(serveur+'nanite',uN);
	GM_setValue(serveur+'robot',uR);
	GM_setValue(serveur+'vitesse',speed);
	GM_setValue(serveur+'level',nb);
	GM_setValue(serveur+'labo',labo);
	GM_setValue(serveur+'cSpatial',cS);

}

function initChpSais() //initialisation des champs de saisie.
{
	var uN = GM_getValue(serveur+'nanite',-1);
	var uR = GM_getValue(serveur+'robot',-1);
	var cS = GM_getValue(serveur+'cSpatial',-1);
	var labo = GM_getValue(serveur+'labo',-1);
	var lvl = GM_getValue(serveur+'level',-1);
	var speed = GM_getValue(serveur+'vitesse',-1);
	if(uN != -1)
	{
		document.getElementById('uNanite').value = uN;
	}
	if(uR != -1)
	{
		document.getElementById('uRobot').value = uR;
	}
	if(cS != -1)
	{
		document.getElementById('Cspatial2').value = cS;
	}
	if(labo != -1)
	{
		document.getElementById('labo2').value = labo;
	}
	if(lvl != -1)
	{
		document.getElementById('lvl').value = lvl;
	}
	if(speed != -1)
	{
		document.getElementById('Speed').value = speed;
	}
}
//******************************************************************************************************
//******************************************************************************************************
//******************************************************************************************************
//****** SCRIPT

addButton(); // ajout bouton
checkUpDate();

if ( (location.href.split('&')[location.href.split('&').length-1]) == 'BuildSearch' || (location.href.split('&')[location.href.split('&').length-1]) == 'BuildSearch#') // si dans la partie 'BuildSearch'
{
if (country == 'fr')
{
	document.getElementById('inhalt').innerHTML='<div id="buttonz"><h2>Calculateur de coup et de Temps des recherches/constructions</h2><br><table><tr><td><div id="BatSel" align="middle"></div><td><div id="SearchSel"></div></td><td><div id="ShipSel"></div></td><td><div id="DefSel"</td><td><div id="vitesse"></div></td></tr><tr><td><div id="okBat"><a id="continue" class="on" href="#" ><span>Ok</span></a></div></td><td><div id="okSearch"><a id="continue" class="on" href="#" ><span>Ok</span></a></div></td><td><div id="okShip"><a id="continue" class="on" href="#" ><span>Ok</span></a></div></td><td><div id="okDef"><a id="continue" class="on" href="#" ><span>Ok</span></a></div></td></tr><tr><td><div id="urobot"></div></td><td><div id="unanite"></div></td><td><div id="Cspatial"></div></td><td><div id="labo"></div></td><td><div id="level"></div></td></tr></table><div id="result"></div></div>'; // affichage des divs listes + champs saisie + Bouton
	
	/*var cssProp = 'background-color: #0d1014; border-width:1px; border-style:solid; border-color:black;';
	var cssPropTitleTop = 'background-color: #0d1014; border-width:3px; border-style:double; border-color:black; border-radius:30px 30px 0 0;';
	var cssPropTitleBottom = 'background-color: #0d1014; border-width:3px; border-style:double; border-color:black; border-radius: 0 0 30px 30px;';*/
	
	document.getElementById('inhalt').innerHTML+='<br><span class="secondcol fleft" align=middle><span class="send_all" id="addCost"><a id="sendall" class="tipsStandard" title="Ajouter les données"></a></span><span class="send_none" id="setZero"><a class="tipsStandard" id="zero" title="Remise à zéro"></a></span></span><input type="submit" id="ButSave" value="Save" title="Sauvegarder les paramètres saisis"><span id="textSave"></span></input><div class="fleetStatus"  id="totalText" ><center><h2><b>Total : </b></h2></center></div><div class="fleetStatus"  id="totalMet" ><h3>&nbsp;&nbsp;&nbsp;<b>Métal : </b><div class="slot fright" id="totMet"><font color=red><b>0 &nbsp;&nbsp;&nbsp;&nbsp;</b></font></div></h3><div id="invMet" style="visibility: hidden">0</div></h3></div><div class="fleetStatus"  id="totalCris" ><h3>&nbsp;&nbsp;&nbsp;<b>Cristal : </b><div class="slot fright" id="totCris"><font color=red><b>0 &nbsp;&nbsp;&nbsp;&nbsp;</b></font></div></h3><div id="invCris" style="visibility: hidden">0</div></h3></div><div class="fleetStatus" id="totalDeut" ><h3>&nbsp;&nbsp;&nbsp;<b>Deutérium : </b><div class="slot fright" id="totDeut"><font color=red><b>0 &nbsp;&nbsp;&nbsp;&nbsp;</b></font></div></h3><div id="invDeut" style="visibility: hidden">0</div></h3></div><div class="fleetStatus"  id="totalTime" ><h3>&nbsp;&nbsp;&nbsp;<b>Temps : </b><div class="slot fright" id="totTime">	<font color=#009999><b>0 &nbsp;&nbsp;&nbsp;&nbsp;</b></font></div></h3><div id="invTime" style="visibility: hidden">0</div></div><div class="fleetStatus"  id="totalPoint" ><h3>&nbsp;&nbsp;&nbsp;<b>Total Points : </b><div class="slot fright" id="totPoint">	<font color=green><b>0 &nbsp;&nbsp;&nbsp;&nbsp;</b></font></div></h3><div id="invPoint" style="visibility: hidden">0</div></div>'; // Ajout barre du bas total
}
else
{
	document.getElementById('inhalt').innerHTML='<div id="buttonz"><h2>Duration and cost calcultor for research and constructions</h2><br><table><tr><td><div id="BatSel" align="middle"></div><td><div id="SearchSel"></div></td><td><div id="ShipSel"></div></td><td><div id="DefSel"</td><td><div id="vitesse"></div></td></tr><tr><td><div id="okBat"><a id="continue" class="on" href="#" ><span>Ok</span></a></div></td><td><div id="okSearch"><a id="continue" class="on" href="#" ><span>Ok</span></a></div></td><td><div id="okShip"><a id="continue" class="on" href="#" ><span>Ok</span></a></div></td><td><div id="okDef"><a id="continue" class="on" href="#" ><span>Ok</span></a></div></td></tr><tr><td><div id="urobot"></div></td><td><div id="unanite"></div></td><td><div id="Cspatial"></div></td><td><div id="labo"></div></td><td><div id="level"></div></td></tr></table><div id="result"></div></div>'; // affichage des divs listes + champs saisie + Bouton
	
	/*var cssProp = 'background-color: #0d1014; border-width:1px; border-style:solid; border-color:black;';
	var cssPropTitleTop = 'background-color: #0d1014; border-width:3px; border-style:double; border-color:black; border-radius:30px 30px 0 0;';
	var cssPropTitleBottom = 'background-color: #0d1014; border-width:3px; border-style:double; border-color:black; border-radius: 0 0 30px 30px;';*/
	
	document.getElementById('inhalt').innerHTML+='<br><span class="secondcol fleft" align=middle><span class="send_all" id="addCost"><a id="sendall" class="tipsStandard" title="Add data"></a></span><span class="send_none" id="setZero"><a class="tipsStandard" id="zero" title="Reset"></a></span></span><input type="submit" id="ButSave" value="Save" title="Save parameters"><span id="textSave"></span></input><div class="fleetStatus" style="background-color: #669966;" id="totalText" ><center><h2><b>Total : </b></h2></center></div><div class="fleetStatus" id="totalMet" ><h3>&nbsp;&nbsp;&nbsp;<b>Metal : </b><div class="slot fright" id="totMet"><font color=red><b>0 &nbsp;&nbsp;&nbsp;&nbsp;</b></font></div></h3><div id="invMet" style="visibility: hidden">0</div></h3></div><div class="fleetStatus"  id="totalCris" ><h3>&nbsp;&nbsp;&nbsp;<b>Crystal : </b><div class="slot fright" id="totCris"><font color=red><b>0 &nbsp;&nbsp;&nbsp;&nbsp;</b></font></div></h3><div id="invCris" style="visibility: hidden">0</div></h3></div><div class="fleetStatus"  id="totalDeut" ><h3>&nbsp;&nbsp;&nbsp;<b>Deuterium : </b><div class="slot fright" id="totDeut"><font color=red><b>0 &nbsp;&nbsp;&nbsp;&nbsp;</b></font></div></h3><div id="invDeut" style="visibility: hidden">0</div></h3></div><div class="fleetStatus"  id="totalTime" ><h3>&nbsp;&nbsp;&nbsp;<b>Duration : </b><div class="slot fright" id="totTime">	<font color=#009999><b>0 &nbsp;&nbsp;&nbsp;&nbsp;</b></font></div></h3><div id="invTime" style="visibility: hidden">0</div></div><div class="fleetStatus" id="totalPoint" ><h3>&nbsp;&nbsp;&nbsp;<b>Total Points : </b><div class="slot fright" id="totPoint">	<font color=green><b>0 &nbsp;&nbsp;&nbsp;&nbsp;</b></font></div></h3><div id="invPoint" style="visibility: hidden">0</div></div>'; // Ajout barre du bas total
}

//*** // remplissage select Bati
if (country == 'fr')
{
	var text='<table><tr><th>&nbsp;&nbsp;&nbsp;&nbsp;Batîments</th></tr><tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="selectBat">';
	for (i=0 ; i<bati.length ;i++)
	{
		text+='<option>'+bati[i]+'</option>';
	}
	text+='</select></td></tr></table>';
	document.getElementById('BatSel').innerHTML+=text;
//****** // remplissage select Recherches
 text='<table><tr><th>Recherches</th></tr><tr><td><select id="selectSearch">';
	for (i=0 ; i<search.length ;i++)
	{
		text+='<option>'+search[i]+'</option>';
	}
	text+='</select></td></tr></table>';
	document.getElementById('SearchSel').innerHTML+=text;
//****** // remplissage select Vaisseaux
text='<table><tr><th>Vaisseaux</th></tr><tr><td><select id="selectShip">';
	for (i=0 ; i<ship.length ;i++) 
	{
		text+='<option>'+ship[i]+'</option>';
	}
	text+='</select></td></tr></table>';
	document.getElementById('ShipSel').innerHTML+=text;
//****** // remplissage select Defenses
text='<table><tr><th>Défenses</th></tr><tr><td><select id="selectDefense">';
	for (i=0 ; i<def.length ;i++)
	{
		text+='<option>'+def[i]+'</option>';
	}
	text+='</select></td></tr></table>';
	document.getElementById('DefSel').innerHTML+=text;
//****************
	document.getElementById('vitesse').innerHTML+='<table><tr><th>Vitesse</th></tr><tr><td><input type="text" id="Speed" value="1" size="3"></input></td></tr></table>'; // ajout champ de saisi vitesse
	document.getElementById('urobot').innerHTML+='<table><tr><th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Us. de Robots/T°Min</th></tr><tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="uRobot" value="2" size="3"></input></td></tr></table>';// ajout champ de saisi usine robot
	document.getElementById('unanite').innerHTML+='<table><tr><th>Usine de Nanites</th></tr><tr><td><input type="text" id="uNanite" value="1" size="3"></input></td></tr></table>';// ajout champ de saisi usine nanite
	document.getElementById('Cspatial').innerHTML+='<table><tr><th>Chantier Spatial</th></tr><tr><td><input type="text" id="Cspatial2" value="1" size="3"></input></td></tr></table>'; // ajout champ de saisi Chantier Spatial
	document.getElementById('labo').innerHTML+='<table><tr><th>Labo/T°Max/Energy</th></tr><tr><td align="center"><input type="text" id="labo2" value="2" size="3"></input></td></tr></table>'; // ajout champ de saisi labo + tech Energie + Température
	document.getElementById('level').innerHTML+='<table><tr><th>Niv/Nbr</th></tr><tr><td align="center"><input type="text" id="lvl" value="1" size="5"></input></td></tr></table>';// ajout champ de saisi niveau + Nombre
}
else
{
	var text='<table><tr><th>&nbsp;&nbsp;&nbsp;&nbsp;Buildings</th></tr><tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id="selectBat">';
	for (i=0 ; i<bati.length ;i++)
	{
		text+='<option>'+bati[i]+'</option>';
	}
	text+='</select></td></tr></table>';
	document.getElementById('BatSel').innerHTML+=text;
//****** // remplissage select Recherches
 text='<table><tr><th>Research</th></tr><tr><td><select id="selectSearch">';
	for (i=0 ; i<search.length ;i++)
	{
		text+='<option>'+search[i]+'</option>';
	}
	text+='</select></td></tr></table>';
	document.getElementById('SearchSel').innerHTML+=text;
//****** // remplissage select Vaisseaux
text='<table><tr><th>Ship</th></tr><tr><td><select id="selectShip">';
	for (i=0 ; i<ship.length ;i++) 
	{
		text+='<option>'+ship[i]+'</option>';
	}
	text+='</select></td></tr></table>';
	document.getElementById('ShipSel').innerHTML+=text;
//****** // remplissage select Defenses
text='<table><tr><th>Defense</th></tr><tr><td><select id="selectDefense">';
	for (i=0 ; i<def.length ;i++)
	{
		text+='<option>'+def[i]+'</option>';
	}
	text+='</select></td></tr></table>';
	document.getElementById('DefSel').innerHTML+=text;
//****************
	document.getElementById('vitesse').innerHTML+='<table><tr><th>Speed</th></tr><tr><td><input type="text" id="Speed" value="1" size="3"></input></td></tr></table>'; // ajout champ de saisi vitesse
	document.getElementById('urobot').innerHTML+='<table><tr><th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Robot Fact./T°Min</th></tr><tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="uRobot" value="2" size="3"></input></td></tr></table>';// ajout champ de saisi usine robot
	document.getElementById('unanite').innerHTML+='<table><tr><th>Nanite Fact.</th></tr><tr><td><input type="text" id="uNanite" value="1" size="3"></input></td></tr></table>';// ajout champ de saisi usine nanite
	document.getElementById('Cspatial').innerHTML+='<table><tr><th>Shipyard</th></tr><tr><td><input type="text" id="Cspatial2" value="1" size="3"></input></td></tr></table>'; // ajout champ de saisi Chantier Spatial
	document.getElementById('labo').innerHTML+='<table><tr><th>Labo/T°Max/Energy</th></tr><tr><td align="center"><input type="text" id="labo2" value="2" size="3"></input></td></tr></table>'; // ajout champ de saisi labo + tech Energie + Température
	document.getElementById('level').innerHTML+='<table><tr><th>Lvl/Nbr</th></tr><tr><td align="center"><input type="text" id="lvl" value="1" size="5"></input></td></tr></table>';// ajout champ de saisi niveau + Nombre
}
	
	
	
// AJOUT SUR LES BOUTONS DES EVENEMENTS -> APPEL DE L'AFFICHAGE
	var butonBat = document.getElementById('okBat').getElementsByTagName('a')[0];
	butonBat.addEventListener("click", batF, false );
	var butonSearch = document.getElementById('okSearch').getElementsByTagName('a')[0];
	butonSearch.addEventListener("click", searchF, false );
	var butonShip = document.getElementById('okShip').getElementsByTagName('a')[0];
	butonShip.addEventListener("click", shipF, false );
	var butonDef = document.getElementById('okDef').getElementsByTagName('a')[0];
	butonDef.addEventListener("click", defF, false );
	var butonAdd = document.getElementById('addCost').getElementsByTagName('a')[0];
	butonAdd.addEventListener("click",add, false);
	var butonRaz = document.getElementById('setZero').getElementsByTagName('a')[0];
	butonRaz.addEventListener("click",raz, false);
	var butonSave = document.getElementById('ButSave');
	butonSave.addEventListener("click",save, false);
	
	//** INITIALISATION CHAMPS SAISIE ******//
	initChpSais();
	//*********** MISE A JOUR **************//

		var MaJ = document.createElement("div"); // création d'un élément HTML <div></div>
		MaJ.setAttribute("style","font-weight:bold;"); // Affectation des attributs : Gras
		document.getElementById('contentWrapper').insertBefore(MaJ, document.getElementById('inhalt')); // On l'affiche entre la page galaxie et le pied de page.
		checkUpDate();
	
	
}