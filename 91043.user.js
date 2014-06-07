// ==UserScript==
// @name           fleetCalc
// @namespace      Sylver
// @include        http://*.ogame.*/game/index.php?page=fleet*
// @include        http://*.ogame.*/game/index.php?page=movement*
// ==/UserScript==
//************************************************
//************************************************
var country = location.href.split('ogame.')[1].split('/')[0];
var version = '1.3.2' ; // Version du script
var URL='http://userscripts.org/scripts/show/91043'; // url de la page de présentation
var Instal ='http://userscripts.org/scripts/source/91043.user.js'; // url de dl
//******
if (navigator.userAgent.indexOf('Firefox')>-1)  // Identification du navigateur
{
	var FireFox = true; 
	var nomScript='';
}
else 											
{
	var FireFox = false;
	var nomScript='fleetCalc';
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
//--------------- TEXTES ----------------------------
if (country == 'fr')
{
	var ship = new Array('Petit Transp','Grand Transp','Chass. léger','Chass. Lourd','Croiseur','Vaiss de Bataille','Vaiss de Colo','Recycleur','Sonde','Bombardier','Destructeur','Rip','Traqueur'); // Tableau des textes des vaisseaux
}
else
{
	var ship = new Array('Small Cargo','Large Cargo','Light Fighter','Heavy Fighter','Cruiser','BattleShip','ColoShip','Recycler','Espio','Bomber','Destroyer','Death Star','BattleCruiser'); // Tableau des textes des vaisseaux
}
var tabV = new Array(10000,7500,12500,10000,15000,10000,2500,2000,100000000,5000,5000,100,10000); // tableau des vitesses
var tabConso = new Array(20,50,20,75,300,500,1000,300,1,1000,1000,1,250);
var tabPointsV = new Array(4000,12000,4000,10000,29000,60000,40000,18000,1000,90000,125000,10000000,85000);
var tabMV = new Array(2000,6000,3000,6000,20000,45000,10000,10000,0,50000,60000,5000000,30000);
var tabCV = new Array(2000,6000,1000,4000,7000,15000,20000,6000,1000,25000,50000,4000000,40000);
var tabDV = new Array(0,0,0,0,2000,0,10000,2000,0,15000,15000,1000000,15000);
var bloc = '<div id="fleetCalc"><div>'; // bloc de base

var styleButtons = 'style="-moz-border-radius: 7px 7px 7px 7px;'+
	"-o-border-radius: 7px 7px 7px 7px;"+
    "-webkit-border-radius: 7px 7px 7px 7px;"+
    "border-radius: 7px 7px 7px 7px;"+
	"padding:2px 2px 2px 2px;"+
	/*"font-weight:bold;"+*/
	'border:4px black double;"';
var styleButtons2 = 'style="-moz-border-radius: 7px 7px 7px 7px;'+
	"-o-border-radius: 7px 7px 7px 7px;"+
    "-webkit-border-radius: 7px 7px 7px 7px;"+
    "border-radius: 7px 7px 7px 7px;"+
	"padding:2px 2px 2px 2px;"+
	/*"font-weight:bold;"+*/
	"font-size:11px;"+
	"background-color:#ccff66;"+
	'border:1px black solid;"';
if (country == 'fr')
{
	var titre = '<center><span id="titreFC" title="Cliquez ici pour ouvrir le corps du script."><span style="-moz-border-radius: 7px 7px 7px 7px;'+
	"-o-border-radius: 7px 7px 7px 7px;"+
    "-webkit-border-radius: 7px 7px 7px 7px;"+
    "border-radius: 7px 7px 7px 7px	;"+
	
	"background:-moz-linear-gradient(top,#66CC66,#336633); "+
	"background-image: -o-linear-gradient(#66CC66,#336633);"+
	"background:-webkit-gradient(linear, left top, left bottom, from(#66CC66), to(#336633));"+
	"size:8px;"+
	"padding:4px 4px 4px 4px;"+
	"color:white;"+
	"border:4px groove;"+
	"font-weight:bold;"+
	'border-color:#66CC66;">Fleet Calc</span><span></center><br><br>'; // titre du script

	var textBegin = '<center><table bgcolor="#333333" style="border: 1px solid #606060 !important; width:650px;">'; // début du bloc du corps
	var textT = '<tr width="100%"><td align="center"><table width="60%">'+
					'<tbody width="100%">'+
						'<tr width="100%">'+
							'<th>Heure <input type="button" '+styleButtons2+' id="importTimeBut" value="<- Imp. Heure"/></th>'+
						'</tr>'+
						'<tr width="100%">'+
							'<td width="100%" align="center"><input type="text" size="2" id="in1H" value="h"></input>:'+
							'<input type="text" size="2" id="in1M" value="m"></input>:'+
							'<input type="text" size="2" id="in1S" value="s"></input>'+
							'</td>'+
						'</tr>'+
					'</tbody>'+
				'</table></td></tr>'; // Texte correspondant aux champ de saisie de l'heures 
	var textCoordDep ='<tr width="100%"><td width="100%"><table width="100%">'+
							'<tbody width="100%">'+
								'<tr width="100%">'+
									'<th colspan="2" align="center"><b>Coordonnées</b></th>'+
								'</tr>'+
								'<tr width="100%">'+
									'<td align="right"><input type="button" '+styleButtons2+' id="importCoord1But" value="Imp Coords ->"/>  '+
									'<input type="text" size="2" id="in1G" value="1"></input>:'+
									'<input type="text" size="2" id="in1SS" value="1" ></input>:'+
									'<input type="text" size="2" id="in1P" value="1"></input>'+
									'-></td>'; // texte des champs de saisie des coords de depart
	var textCoordArr =				'<td width="50%"><input type="text" size="2" id="in2G" value="1"></input>:'+
										'<input type="text" size="2" id="in2SS" value="1"></input>:'+
										'<input type="text" size="2" id="in2P" value="1"></input>'+
										'  <input type="button" '+styleButtons2+' id="importCoord2But" value="<- Imp Coords"/>'+
									'</td>'+
								'</tr>'+
							'</tbody>'+
						'</table></td></tr>'; // texte des champs de saisie des coords d'arrivée
	var textTech = '<tr width="100%"><td width="100%"><table width="100%">'+
							'<tbody width="100%">'+
								'<tr width="100%">'+
									'<td width="30%"><font color=#339933><b>Combustion : </b></font><input type="text" size="2" id="Tcomb" ></input></td>'+
									'<td width="30%"><font color=#339933><b>Impulsion : </b></font><input type="text" size="2" id="Timp"></input></td>'+
									'<td width="30%"><font color=#339933><b>Hyperespace : </b></font><input type="text" size="2" id="Thyp"></input></td>'+
								'</tr>'+
							'</tbody>'+
						'</table></td></tr>'; // texte de saisie des Technos
	var textOp = '<tr width="100%"><td width="100%"><table width="100%">'+
							'<tbody width="100%">'+
								'<tr width="100%">'+
									'<td><font color=#cc3333><b>Temps de Vol : </b></font><input type="radio" name="grp1fC" value="0" id="fCa"></td>'+
									'<td><font color=#cc3333><b>Retour Cdr : </b></font><input type="radio" name="grp1fC" value="1" id="fCb"></td>'+
									'<td><font color=#cc3333><b>Calc Départ : </b></font><input type="radio" name="grp1fC" value="2" id="fCc"></td>'+
								'</tr>'+
							'</tbody>'+
						'</table></td></tr>'+
						'<tr width="100%"><td width="100%"><table width="100%">'+
							'<tbody width="100%">'+
								'<tr width="100%">'+
									'<td width="25%"><font color=#99ff99><b>Vitesse : </b><font color=#99ff99>'+
									'<input type="text" size="2" id="inSpeed" value="1"></input></td>'+
									'<td width="25%"><input type="submit" '+styleButtons+' value="Calculer" id="gofC"></input></td>'+
									'<td width="25%"><input type="submit" '+styleButtons+' value="Sauver" id="savefC"></input></td>'+
									'<td width="25%"><font color=#99ff99>Ratio Cdr (%) <font color=#99ff99><input type="text" value="30" size="3px" id="ratioCdrfC"></input></td>'+
								'</tr>'+
							'</tbody>'+
						'</table></td></tr>';
	var textShip = '<tr width="100%"><td width="100%"><table width="100%">'+
							'<tbody width="100%">'+
								'<tr width="100%">'+
									'<td width="30%"><font color=#cc0000><b>Vaisseaux</b></font></td>'+
									'<td width="30%"><font color=#cc0000><b>#</b></font></td>'+
									'<td width="30%"><font color=#cc0000><b>Vitesse</b></font></td>'+
								'</tr>'; // texte de saisie des options et de la vitesse et du bouton de validation
	var textValFleet = '<tr width="100%"><td width="100%"><table width="100%" padding="2px">'+
							'<tbody width="100%">'+
								'<tr width="100%">'+
									'<td style="font-weight:bold; font-size:10px; color:#99ff99;">Valeur flotte</td>'+
									'<td style="font-size:10px; color:#99ff99;"><span id="valFM">0</span> <b>Métal</b></td>'+
									'<td style="font-size:10px; color:#99ff99;"><span id="valFC">0</span> <b>Cristal</b></td>'+
									'<td style="font-size:10px; color:#99ff99;"><span id="valFD">0</span> <b>Deutérium</b></td>'+
									'<td style="font-weight:bold;font-size:10px; color:#99ff99;"><span id="valFT">0</span> <b>points</b></td>'+
								'</tr>'+
								'<tr width="100%">'+
									'<td style="font-weight:bold; font-size:10px; color:#99ff99;">Cdr</td>'+
									'<td style="font-size:10px; color:#99ff99;"><span id="cdrFM">0</span> <b>Métal</b></td>'+
									'<td style="font-size:10px; color:#99ff99;"><span id="cdrFC">0</span> <b>Cristal</b></td>'+
									'<td style="font-weight:bold;font-size:10px; color:#99ff99;"><span id="cdrFT">0</span> <b>points</b></td>'+
									'<td style="font-weight:bold;font-size:10px; color:#99ff99;"><span id="cdrNbRec">0</span> <b>recycleur(s)</b></td>'+
								'</tr>'+
							'</tbody>'+
						'</table></td></tr>';
	
	}
else
{
	var titre = '<center><span id="titreFC" title="Click here to open the bloc."><span style="-moz-border-radius: 7px 7px 7px 7px;'+
	"-o-border-radius: 7px 7px 7px 7px;"+
    "-webkit-border-radius: 7px 7px 7px 7px;"+
    "border-radius: 7px 7px 7px 7px	;"+
	
	"background:-moz-linear-gradient(top,#66CC66,#336633); "+
	"background-image: -o-linear-gradient(#66CC66,#336633);"+
	"background:-webkit-gradient(linear, left top, left bottom, from(#66CC66), to(#336633));"+
	"size:8px;"+
	"padding:4px 4px 4px 4px;"+
	"color:white;"+
	"border:4px groove;"+
	"font-weight:bold;"+
	'border-color:#66CC66;">Fleet Calc</span><span></center><br><br>'; // titre du script
	
	var textBegin = '<center><table bgcolor="#333333" style="border: 1px solid #606060 !important; width:650px;">'; // début du bloc du corps
	var textT = '<tr width="100%"><td align="center"><table width="60%">'+
					'<tbody width="100%">'+
						'<tr width="100%">'+
							'<th>Time <input type="button" '+styleButtons2+' id="importTimeBut" value="<- Imp. Time"/></th>'+
						'</tr>'+
						'<tr width="100%">'+
							'<td width="100%" align="center"><input type="text" size="2" id="in1H" value="h"></input>:'+
							'<input type="text" size="2" id="in1M" value="m"></input>:'+
							'<input type="text" size="2" id="in1S" value="s"></input>'+
							'</td>'+
						'</tr>'+
					'</tbody>'+
				'</table></td></tr>'; // Texte correspondant aux champ de saisie de l'heures 
	var textCoordDep ='<tr width="100%"><td width="100%"><table width="100%">'+
							'<tbody width="100%">'+
								'<tr width="100%">'+
									'<th colspan="2" align="center"><b>Coordinates</b></th>'+
								'</tr>'+
								'<tr width="100%">'+
									'<td align="right"><input type="button" '+styleButtons2+' id="importCoord1But" value="Imp Coords ->"/>  '+
									'<input type="text" size="2" id="in1G" value="1"></input>:'+
									'<input type="text" size="2" id="in1SS" value="1" ></input>:'+
									'<input type="text" size="2" id="in1P" value="1"></input>'+
									'-></td>'; // texte des champs de saisie des coords de depart
	var textCoordArr =				'<td width="50%"><input type="text" size="2" id="in2G" value="1"></input>:'+
										'<input type="text" size="2" id="in2SS" value="1"></input>:'+
										'<input type="text" size="2" id="in2P" value="1"></input>'+
										'  <input type="button" '+styleButtons2+' id="importCoord2But" value="<- Imp Coords"/>'+
									'</td>'+
								'</tr>'+
							'</tbody>'+
						'</table></td></tr>'; // texte des champs de saisie des coords d'arrivée
	var textTech = '<tr width="100%"><td width="100%"><table width="100%">'+
							'<tbody width="100%">'+
								'<tr width="100%">'+
									'<td width="30%"><font color=#339933><b>Combustion : </b></font><input type="text" size="2" id="Tcomb" ></input></td>'+
									'<td width="30%"><font color=#339933><b>Impulsion : </b></font><input type="text" size="2" id="Timp"></input></td>'+
									'<td width="30%"><font color=#339933><b>Hyperspace : </b></font><input type="text" size="2" id="Thyp"></input></td>'+
								'</tr>'+
							'</tbody>'+
						'</table></td></tr>'; // texte de saisie des Technos
	var textOp = '<tr width="100%"><td width="100%"><table width="100%">'+
							'<tbody width="100%">'+
								'<tr width="100%">'+
									'<td><font color=#cc3333><b>Flight time : </b></font><input type="radio" name="grp1fC" value="0" id="fCa"></td>'+
									'<td><font color=#cc3333><b>DebrField return : </b></font><input type="radio" name="grp1fC" value="1" id="fCb"></td>'+
									'<td><font color=#cc3333><b>Leaving time : </b></font><input type="radio" name="grp1fC" value="2" id="fCc"></td>'+
								'</tr>'+
							'</tbody>'+
						'</table></td></tr>'+
						'<tr width="100%"><td width="100%"><table width="100%">'+
							'<tbody width="100%">'+
								'<tr width="100%">'+
									'<td width="25%"><font color=#99ff99><b>Vitesse : </b></font>'+
									'<input type="text" size="2" id="inSpeed" value="1"></input></td>'+
									'<td width="25%"><input type="submit" '+styleButtons+' value="Calculate" id="gofC"></input></td>'+
									'<td width="25%"><input type="submit" '+styleButtons+' value="Save" id="savefC"></input></td>'+
									'<td width="25%"><font color=#99ff99>Ratio Dbr. (%) <font color=#99ff99><input type="text" value="30" size="3px" id="ratioCdrfC"></input></td>'+
								'</tr>'+
							'</tbody>'+
						'</table></td></tr>';
	var textShip = '<tr width="100%"><td width="100%"><table width="100%">'+
							'<tbody width="100%">'+
								'<tr width="100%">'+
									'<td width="30%"><font color=#cc0000><b>Ships</b></font></td>'+
									'<td width="30%"><font color=#cc0000><b>#</b></font></td>'+
									'<td width="30%"><font color=#cc0000><b>Speed</b></font></td>'+
								'</tr>'; // texte de saisie des options et de la vitesse et du bouton de validation
	var textValFleet = '<tr width="100%"><td width="100%"><table width="100%" padding="2px">'+
							'<tbody width="100%">'+
								'<tr width="100%">'+
									'<td style="font-weight:bold; font-size:10px; color:#99ff99;">Valeur flotte</td>'+
									'<td style="font-size:10px; color:#99ff99;"><span id="valFM">0</span> <b>Metal</b></td>'+
									'<td style="font-size:10px; color:#99ff99;"><span id="valFC">0</span> <b>Crystal</b></td>'+
									'<td style="font-size:10px; color:#99ff99;"><span id="valFD">0</span> <b>Deuterium</b></td>'+
									'<td style="font-weight:bold;font-size:10px; color:#99ff99;"><span id="valFT">0</span> <b>points</b></td>'+
								'</tr>'+
								'<tr width="100%">'+
									'<td style="font-weight:bold; font-size:10px; color:#99ff99;">Cdr</td>'+
									'<td style="font-size:10px; color:#99ff99;"><span id="cdrFM">0</span> <b>Metal</b></td>'+
									'<td style="font-size:10px; color:#99ff99;"><span id="cdrFC">0</span> <b>Crystal</b></td>'+
									'<td style="font-weight:bold;font-size:10px; color:#99ff99;"><span id="cdrFT">0</span> <b>points</b></td>'+
									'<td style="font-weight:bold;font-size:10px; color:#99ff99;"><span id="cdrNbRec">0</span> <b>recycler(s)</b></td>'+
								'</tr>'+
							'</tbody>'+
						'</table></td></tr>';
}
if (country == 'fr')
{
	for ( var i=0 ; i<13 ; i++) // affichage des champs de saisie des vaisseaux et de la vitesse
	{
		textShip += '<tr><td>' + ship[i] + ' : </td><td><input type="text" size="12px" id="s'+ship[i]+'" value=0></input></td><td><span id="v' + ship[i] + '">'+tabV[i]+'</span></td></tr>';
	}
	
	textShip += '</tbody></table></td></tr>';
	var textV ='<tr width="100%"><td width="100%"><table width="100%">'+
							'<tbody width="100%">'+
								'<tr width="100%">'+
									'<td  width="20%"><font color=#339999><b>%</b></font></td>'+
									'<td  width="20%"><span id="m1"></span></td>'+
									'<td  width="20%"><span id="m2"></span></td>'+
									'<td  width="20%"><font color=#339999><b>Temps de vol</b></font></td>'+
									'<td align="right" width="20%"><font color=#339999><b>Consommation</b></font></td>'+
								'</tr>'; // en-tête de l'affichage des résultats
	for( var j=10 ; j > 0 ; j--)
	{ 
		textV += ' <tr><td> -- '+ (j*10) +'% -- </td><td><span id="a'+(j*10)+'">xj | xx:XX:xx</span></td><td><span id="r'+(j*10)+'">xj | xx:XX:xx</span></td><td><span id="t'+(j*10)+'">xj | xx:XX:xx</span></td><td align="right"><span id="conso'+(j*10)+'">xxx</span></td></tr>';
	}
	textV += '</tbody></table></td></tr>';
	var textEnd = '</table><span id="fCClose" title="Cliquez ici pour fermer le corps du script."><br/><span style="-moz-border-radius: 7px 7px 7px 7px;'+
	"-o-border-radius: 7px 7px 7px 7px;"+
    "-webkit-border-radius: 7px 7px 7px 7px;"+
    "border-radius: 7px 7px 7px 7px	;"+
	
	"background:-moz-linear-gradient(top,#ff0000,#990000); "+
	"background-image: -o-linear-gradient(#ff0000,#990000);"+
	"background:-webkit-gradient(linear, left top, left bottom, from(#ff0000), to(#990000));"+
	"size:8px;"+
	"padding:4px 4px 4px 4px;"+
	"color:white;"+
	"border:4px groove;"+
	"font-weight:bold;"+
	'border-color:#990000;">Fermer</span></span><br/><br/><br/><center> '; // texte de fin du bloc + bouton de fermeture
}
else
{
	for ( var i=0 ; i<13 ; i++) // affichage des champs de saisie des vaisseaux et de la vitesse
	{
		textShip += '<tr><td>' + ship[i] + ' : </td><td><input type="text" size="2" id="s'+ship[i]+'" value=0></input></td><td><span id="v' + ship[i] + '">'+tabV[i]+'</span></td></tr>';
	}
	textShip += '</tbody></table></td></tr>';
	var textV ='<tr width="100%"><td width="100%"><table width="100%">'+
							'<tbody width="100%">'+
								'<tr width="100%">'+
									'<td  width="20%"><font color=#339999><b>%</b></font></td>'+
									'<td  width="20%"><span id="m1"></span></td>'+
									'<td  width="20%"><span id="m2"></span></td>'+
									'<td  width="20%"><font color=#339999><b>Fleet duration</b></font></td>'+
									'<td align="right" width="20%"><font color=#339999><b>Consumption</b></font></td>'+
								'</tr>'; // en-tête de l'affichage des résultats
	for( var j=10 ; j > 0 ; j--)
	{ 
		textV += ' <tr><td> -- '+ (j*10) +'% -- </td><td><span id="a'+(j*10)+'">xj | xx:XX:xx</span></td><td><span id="r'+(j*10)+'">xj | xx:XX:xx</span></td><td><span id="t'+(j*10)+'">xj | xx:XX:xx</span></td><td align="right"><span id="conso'+(j*10)+'">xxx</span></td></tr>';
	}
	var textEnd = '</table><span id="fCClose" title="Click here to close the bloc."><br/><span style="-moz-border-radius: 7px 7px 7px 7px;'+
	"-o-border-radius: 7px 7px 7px 7px;"+
    "-webkit-border-radius: 7px 7px 7px 7px;"+
    "border-radius: 7px 7px 7px 7px	;"+
	
	"background:-moz-linear-gradient(top,#ff0000,#990000); "+
	"background-image: -o-linear-gradient(#ff0000,#990000);"+
	"background:-webkit-gradient(linear, left top, left bottom, from(#ff0000), to(#990000));"+
	"size:8px;"+
	"padding:4px 4px 4px 4px;"+
	"color:white;"+
	"border:4px groove;"+
	"font-weight:bold;"+
	'border-color:#990000;">Close</span></span><br/><br/><br/><center> '; // texte de fin du bloc + bouton de fermeture
}
//--------------- FIN TEXTES -----------
//***************************
//***************************

//***
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
//***
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
function go() // appelé lors de l'appuis sur "Go", teste l'option saisie et appelle la fonction correspondante
{
	calcVit();
	if(document.getElementById('fCa').checked)
	{
		tVol(); // Temps de vol
	}
	if(document.getElementById('fCb').checked)
	{
		rCdr(); // Retour Cdr
	}
	if(document.getElementById('fCc').checked)
	{
		cDep(); // Calcul de l'heure de départ
	}
	
}
//****
function checkT() // verifie la validité des données temporelles
{
	var h = document.getElementById('in1H').value;
	var m = document.getElementById('in1M').value;
	var s = document.getElementById('in1S').value;
	if ( h > -1 && m > -1 && s > -1 && h < 24 && m < 60 && s < 60 )  // si 0 <= h < 24 , 0 <= m & s < 60
	{
		return 0;
	}
	else
	{
		if (country == 'fr')
		{
			alert("Heure Incorrecte.");
		}
		else
		{
			alert("Wrong hour");
		}
		return -1;
	}
}
function checkC() // verifie la validité des coordonées
{
	var gDep = document.getElementById('in1G').value; // Galaxie de départ
	var sDep = document.getElementById('in1SS').value; // système de départ
	var pDep = document.getElementById('in1P').value; // position de départ
	var gArr = document.getElementById('in2G').value; // galaxie d'arrivée
	var sArr = document.getElementById('in2SS').value; // système d'arrivée
	var pArr = document.getElementById('in2P').value; // position d'arrivée
	if( gDep > -1 && sDep > -1 && pDep > -1 && gArr > -1 && sArr > -1 && pArr > -1)
	{
		return 0;
	}
	else
	{
		if (country == 'fr')
		{
			alert("Erreur de coordonées.");
		}
		else
		{
			alert("Coordinates error");
		}
		return -1 ;
	}
}
//**** FONCTIONS DE CALCUL
function tVol()  // Calcul le temps de vol des données saisies
{
	if (country == 'fr')
	{
		document.getElementById('m1').innerHTML = '<font color=#339999><b>Arriv&eacute;e</b></font>';
		document.getElementById('m2').innerHTML = '<font color=#339999><b>Retour</b></font>';
	}
	else
	{
		document.getElementById('m1').innerHTML = '<font color=#339999><b>Arrival</b></font>';
		document.getElementById('m2').innerHTML = '<font color=#339999><b>Return</b></font>';
	}
	if ( checkT() == 0)
	{
		if (checkC() == 0 )
		{
			var h = document.getElementById('in1H').value;
			var m = document.getElementById('in1M').value;
			var s = document.getElementById('in1S').value;
			var d = 0;
			if( minV() != -1)
			{
				for( var j=10 ; j > 0 ; j--)
				{ 
					d = (1 * s) + (60 * m) + (3600 * h); // conversion de l'heure de départ en secondes écoulées depuis 0:0:0
					d += calcT(j*10); // ajout du temps de vold e l'allé
					document.getElementById('a'+(j*10)).innerHTML = convD(d); // affichage
					d += calcT(j*10); // ajout du temps de vol de retour
					document.getElementById('r'+(j*10)).innerHTML = convD(d); // affichage
					document.getElementById('t'+(j*10)).innerHTML = convD(calcT(j*10)); // affichage temps de vol
					document.getElementById('conso'+(j*10)).innerHTML = parseString(getConso(j*10));					
				}
			}
		}
	}
}
//-----
function rCdr() // calcul pour un retour Cdr de l'heure de départ et de retour
{
	if (country == 'fr')
	{
		document.getElementById('m1').innerHTML = '<font color=#339999><b>D&eacute;part</b></font>';
		document.getElementById('m2').innerHTML = '<font color=#339999><b>Retour</b></font>';
	}
	else
	{
		document.getElementById('m1').innerHTML = '<font color=#339999><b>Start</b></font>';
		document.getElementById('m2').innerHTML = '<font color=#339999><b>Return</b></font>';
	}
	if ( checkT() == 0)
	{
		if (checkC() == 0 )
		{
			var h = document.getElementById('in1H').value;
			var m = document.getElementById('in1M').value;
			var s = document.getElementById('in1S').value;
			var d = 0;
			if( minV() != -1)
			{
				for( var j=10 ; j > 0 ; j--)
				{ 
					d = (1 * s) + (60 * m) + (3600 * h); // conversion de l'heure de départ en secondes écoulées depuis 0:0:0
					d -= calcT(j*10); // retrais du temps de vol
					document.getElementById('a'+(j*10)).innerHTML = convD(d); // affichage
					d += (2*calcT(j*10)); // ajout du temps de vol à l'heure de passage ( donc 2 fois par rapport à l'heure de départ )
					document.getElementById('r'+(j*10)).innerHTML = convD(d); // affichage
					document.getElementById('t'+(j*10)).innerHTML = convD(calcT(j*10)); // affichage temps de vol
					document.getElementById('conso'+(j*10)).innerHTML = parseString(getConso(j*10));
				}
			}
		}
	}
}
//-----
function  cDep() // calcul de l'heure de départ et de passage d'une flotte à partir de son heure de retour
{
	if (country == 'fr')
	{
		document.getElementById('m1').innerHTML = '<font color=#339999><b>D&eacute;part</b></font>';
		document.getElementById('m2').innerHTML = '<font color=#339999><b>Arriv&eacute;e</b></font>';
	}
	else
	{
		document.getElementById('m1').innerHTML = '<font color=#339999><b>Start</b></font>';
		document.getElementById('m2').innerHTML = '<font color=#339999><b>Arrival</b></font>';
	}
	if ( checkT() == 0)
	{
		if (checkC() == 0 )
		{
			var h = document.getElementById('in1H').value;
			var m = document.getElementById('in1M').value;
			var s = document.getElementById('in1S').value;
			var d = 0;
			if( minV() != -1)
			{
				for( var j=10 ; j > 0 ; j--)
				{ 
					d = (1 * s) + (60 * m) + (3600 * h); // conversion de l'heure de départ en secondes écoulées depuis 0:0:0
					d -= (2*calcT(j*10)); // retrais de 2 fois le temps de vol ( aller + retour )
					document.getElementById('a'+(j*10)).innerHTML = convD(d); // affichage
					d += calcT(j*10); // ajout du temps de vol -> arrivée
					document.getElementById('r'+(j*10)).innerHTML = convD(d); // affichage
					document.getElementById('t'+(j*10)).innerHTML = convD(calcT(j*10)); //affichage temps de vol
					document.getElementById('conso'+(j*10)).innerHTML = parseString(getConso(j*10));
				}
			}
		}
	}
}
//******
function minV() // calcul de la vitesse minimale de la flotte saisie, retourne -1 si aucun vaisseau n'est saisi
{
	var nb =0; // variable de parcours
	var vit=0; // vitesse actuelle
	var min ; // vitesse minimale
	var n = 0; // indice de parcours
	while ( n < 13 && ( nb == 0 || nb == null) ) // recherche du premier élement non nul
	{
		nb = document.getElementById('s'+ship[n]).value;
		n++;
	}
	n--;
	if( n == 12 && parseNB(document.getElementById('v'+ship[n]).textContent) > 0) // s'il est le dernier, on retourne sa vitesse
	{
		return ( parseNB(document.getElementById('v'+ship[n]).textContent) );
	}
	if( n == 12) // s'il n'y en a pas, on retourne -1
	{
		return ( -1 );
	}
	min = parseNB(document.getElementById('v'+ship[n]).textContent);
	for ( var i = ( n +1 ) ; i < 13 ; i++) // recherche du minimum
	{
		nb = document.getElementById('s'+ship[i]).value;
		if( nb > 0)
		{
			vit = parseNB(document.getElementById('v'+ship[i]).textContent);
			if ( vit < min )
			{
				min = vit;
			}
		}
	}
	return (min);
}
//************************
//----- CALCUL TEMPS DE VOL
//-- FORMULE : 
//-- Sur même coord : 	10 + [ 35 000 / (% vitesse) * Racine (5 000 / vitesse du vaisseau) ]
//-- Sur même Système : 10 + [ 35 000 / (% vitesse) * Racine ((1 000 000 + distance absolue entre les planètes * 5 000) / vitesse du vaisseau) ]
//-- Sur même galaxie : 10 + [ 35 000 / (% vitesse) * Racine ((2 700 000 + (écart de systèmes) * 95 000) / vitesse du vaisseau) ]
//-- Sur autre galaxie : 10 + [ 35 000 / (% vitesse) * Racine (écart de galaxies * 20 000 000 / vitesse du vaisseau) ]
function calcT(prct)
{
	var gDep = document.getElementById('in1G').value; // Galaxie de départ
	var sDep = document.getElementById('in1SS').value; // système de départ
	var pDep = document.getElementById('in1P').value; // position de départ
	var gArr = document.getElementById('in2G').value; // galaxie d'arrivée
	var sArr = document.getElementById('in2SS').value; // système d'arrivée
	var pArr = document.getElementById('in2P').value; // position d'arrivée
	var vit = document.getElementById('inSpeed').value; // vitesse du serveur saisie
	if( vit < 1 || vit == null) // si vitesse incorrecte, correction
	{
		vit = 1;
		document.getElementById('inSpeed').value = 1;
	}
	if( gArr != gDep) // Autre G
	{
		return Math.round( (( 1/vit) * 10 + ( 35000 / (prct)  *  Math.sqrt( Math.abs( (gDep-gArr) * 20000 * 1000) / minV() ) )) /vit);
	}
	else if( sArr == sDep)
	{
		if( pArr == pDep ) // Si même P
		{
			return Math.round(  (10 + ( (35000 /prct) * ( Math.sqrt((5*1000) / minV() )) ) )	 / vit);
		}
		else // si même SS mais pas même P
		{
			return Math.round( (10 + ( (35000 / (prct)) * (Math.sqrt(((1000 + Math.abs(pDep-pArr) * 5))*1000 / minV() )) )) /vit);
		}
	}
	else // si même G mais pas même SS
	{
		return Math.round( ( 10 + ( (35000 / (prct)) * (Math.sqrt((2700 + Math.abs(sDep-sArr) * 95)*1000 / minV()) )) )/vit);
	}
}
//--- Retourne une chaine contenant la date sous la forme j-h:m:s calculée à partir de la date en paramètre en secondes
function convD(date)
{
	var d = date;
	if( date > 0)
	{
		var j = (d-(d%86400))/86400;
		d = d % 86400;
		var h =(d-(d%3600))/3600;
		d = d % 3600;
		var m = (d-(d%60))/60;
		d = d % 60;
		var s = d;
	}
	else
	{
		var j = (d-(d%86400))/86400;
		j--;
		d = d % 86400;
		var h = -1*(d-(d%3600))/3600;
		h = 23 - h; 
		d = d % 3600;
		var m = -1*(d-(d%60))/60;
		m = 59-m;
		d = d % 60;
		var s = -1*d;
		s = 60 - s;
	}
	if( h < 10 )
	{
		h = '0'+h;
	}
	if( m < 10 )
	{
		m = '0'+m;
	}
	if( s < 10 )
	{
		s = '0'+s;
	}
	if (country == 'fr')
	{
		var chaine = j+'j | '+h+':'+m+':'+s ;
	}
	else
	{
		var chaine = j+'d | '+h+':'+m+':'+s ;
	}
	return chaine;
}
//************************
function open() // appellé lors du click sur le titre
{
	var text = textBegin + textT + textCoordDep + textCoordArr + textTech + textOp + textShip + textValFleet + textV + textEnd;
	document.getElementById('fleetCalc').innerHTML += text; // affichage du corps
	document.getElementById('fCa').checked = true; // initialisation des checks box
	var goBut = document.getElementById('gofC');
	goBut.addEventListener("click",go, false); // ajout et écoute du bouton Go
	var saveBut = document.getElementById('savefC');
	saveBut.addEventListener("click",save, false);
	var closeBut = document.getElementById('fCClose');// ajout et écoute du bouton de fermeture
	closeBut.addEventListener("click",close, false );
	var impTimeBut = document.getElementById('importTimeBut');
	impTimeBut.addEventListener("click",importTime, false);
	var impCoord1But = document.getElementById('importCoord1But');
	impCoord1But.addEventListener("click",importCoord1, false);
	var impCoord2But = document.getElementById('importCoord2But');
	impCoord2But.addEventListener("click",importCoord2, false);
	var i;
	var tmp;
	tmp = document.getElementById('ratioCdrfC');
	tmp.addEventListener("change",valFlotte, false);
	for(i=0 ; i < 13 ; i++)
	{
		tmp = document.getElementById('s'+ship[i]);
		tmp.addEventListener("change",valFlotte, false);
	}
	
	loadData();
	checkUpDate();
}

function importCoord1()
{
	if(country == 'fr')
	{
		var coord = prompt("Quelle coordonnées importer (xx:xx:xx)?");
	}
	else
	{
		var coord = prompt("What coordinates to import (xx:xx:xx)?");
	}
	
	try
	{
		if( coord.split(':').length == 3)
		{
			var g = coord.split(':')[0];
			var ss = coord.split(':')[1];
			var p = coord.split(':')[2];
			
			document.getElementById('in1G').value=g;
			document.getElementById('in1SS').value=ss;
			document.getElementById('in1P').value=p;
		}
		else
		{
			if(country == 'fr')
			{
				alert("Coordonnées incorrecte.");
			}
			else
			{
				alert("Invalid coordinates");
			}
		}
	}
	catch(ex)
	{
	
	}
}

function importCoord2()
{
	if(country == 'fr')
	{
		var coord = prompt("Quelle coordonnées importer (xx:xx:xx)?");
	}
	else
	{
		var coord = prompt("What coordinates to import (xx:xx:xx)?");
	}
	
	try
	{
		if( coord.split(':').length == 3)
		{
			var g = coord.split(':')[0];
			var ss = coord.split(':')[1];
			var p = coord.split(':')[2];
			
			document.getElementById('in2G').value=g;
			document.getElementById('in2SS').value=ss;
			document.getElementById('in2P').value=p;
		}
		else
		{
			if(country == 'fr')
			{
				alert("Coordonnées incorrecte.");
			}
			else
			{
				alert("Invalid coordinates");
			}
		}
	}
	catch(ex)
	{
	
	}
}

function importTime()
{
	if(country == 'fr')
	{
		var time = prompt("Quelle heure importer (xx:xx:xx)?");
	}
	else
	{
		var time = prompt("What time to import (xx:xx:xx)?");
	}
	
	try
	{
		if( time.split(':').length == 3)
		{
			var h = time.split(':')[0];
			var m = time.split(':')[1];
			var s = time.split(':')[2];
			
			document.getElementById('in1H').value=h;
			document.getElementById('in1M').value=m;
			document.getElementById('in1S').value=s;
		}
		else
		{
			if(country == 'fr')
			{
				alert("Heure incorrecte.");
			}
			else
			{
				alert("Invalid time.");
			}
		}
	}
	catch(ex)
	{
	
	}
}

function valFlotte()
{
	
	var i = 0;
	var total = 0;
	var totalMV = 0;
	var totalCV = 0;
	var totalDV = 0;
	var ratioCdr;
	try
	{
		ratioCdr = parseInt(document.getElementById('ratioCdrfC').value);
	}
	catch(ex)
	{
		ratioCdr = 30;
	}
	
	for(i=0 ; i < 13 ; i++)
	{
		//alert(document.getElementById('s'+ship[i]));
		tmp = parseInt(document.getElementById('s'+ship[i]).value);
		if(tmp > 0)
		{
			total += tmp * tabPointsV[i];
			totalMV += tabMV[i] * tmp;
			totalCV += tabCV[i] * tmp;
			totalDV += tabDV[i] * tmp;
		}
	}
	document.getElementById('valFT').textContent = parseString(total/1000);
	document.getElementById('valFM').textContent = parseString(totalMV);
	document.getElementById('valFC').textContent = parseString(totalCV);
	document.getElementById('valFD').textContent = parseString(totalDV);
	
	document.getElementById('cdrFT').textContent = parseString(((totalMV*(ratioCdr/100)) + (totalCV*(ratioCdr/100)))/1000);
	document.getElementById('cdrFM').textContent = parseString(totalMV*(ratioCdr/100));
	document.getElementById('cdrFC').textContent = parseString(totalCV*(ratioCdr/100));
	document.getElementById('cdrNbRec').textContent = parseString(((totalMV*(ratioCdr/100)) + (totalCV*(ratioCdr/100)))/20000);
	/*if (country == 'fr')
	{
		alert("Valeur de la flotte : "+parseString(total/1000)+" points ("+parseString(totalMV)+" Métal, "+parseString(totalCV)+" Cristal, "+parseString(totalDV)+" Deutérium)");
	}
	else
	{
		alert("Value of the fleet : "+parseString(total/1000)+" points ("+parseString(totalMV)+" Metal, "+parseString(totalCV)+" Crystal, "+parseString(totalDV)+" Deuterium)");
	}*/
}
function close() // Fermeture du corps
{
	document.getElementById('fleetCalc').innerHTML = titre;
	var openBut = document.getElementById('titreFC');
	openBut.addEventListener("click",open, false );
}
function calcVit() // calcul de la vitesse de chaque vaisseau en fonction des données saisies
{
	var comb = document.getElementById('Tcomb').value; // tech de combustion
	var imp = document.getElementById('Timp').value; // tech d'impulsion
	var hyp = document.getElementById('Thyp').value; // tech de propulsion hyperespace
	if( comb == '' || comb < 0) // Si donneés incorrectes
		comb = 0;
	if( imp == '' || imp < 0 )
		imp = 0;
	if( hyp == '' || hyp < 0)
		hyp = 0;
	// vitesse de base + niveau tech * (vitesse de base * ratio tech / 100) 
	for (var i = 0 ; i < 13 ; i++)
	{
		var s = 'v' + ship[i];
		document.getElementById(s).innerHTML = parseString(vitShip(i));
	}
	
}
//****************
function getConso ( vitesse )
{
	var conso =0;
	var nbVaiss ;
	var d = calcT(vitesse);
	var p = 0;
	var dist = 0;
	
	var c = 0;
	var gDep = document.getElementById('in1G').value; // Galaxie de départ
	var sDep = document.getElementById('in1SS').value; // système de départ
	var pDep = document.getElementById('in1P').value; // position de départ
	var gArr = document.getElementById('in2G').value; // galaxie d'arrivée
	var sArr = document.getElementById('in2SS').value; // système d'arrivée
	var pArr = document.getElementById('in2P').value; // position d'arrivée
	var vit = document.getElementById('inSpeed').value; // vitesse du serveur saisie
	
	if( vit < 1 || vit == null) // si vitesse incorrecte, correction
	{
		vit = 1;
		document.getElementById('inSpeed').value = 1;
	}
	for ( var j=0 ; j<13 ; j++)
	{
		nbVaiss = parseNB(document.getElementById('s'+ship[j]).value);
		if(nbVaiss > 0)
		{
			conso = tabConso[j] * nbVaiss;
			
			if( gArr != gDep) // Autre G
			{
				//Calcul du pourcantage de vitesse du vaisseau correspondant au temps de vol global
				p = (35000*Math.sqrt(Math.abs((gDep-gArr)*20000)*1000/vitShip(j)))/(vit * d - (1/vit)*10);
				//Ajout de la consommation du type de vaisseau
				if( Math.round(p) == vitesse)
					p = Math.round(p);
				c += (conso * (( 4 * Math.abs(gDep-gArr)) / 7 ) * Math.pow( (p/100)+1 , 2) );
			}
			else if( sArr == sDep) // même système
			{
				if( pDep != pArr)
				{
					//Calcul du pourcantage de vitesse du vaisseau correspondant au temps de vol global
					p = (35000 * Math.sqrt((1000 + Math.abs(pDep-pArr)*5)*1000/vitShip(j))) / (vit*d-10);
					//Ajout de la consommation du type de vaisseau
					if( Math.round(p) == vitesse)
						p = Math.round(p);
					c += (conso * (( 1000+ 5 * Math.abs(pDep-pArr)) / 35000 ) * Math.pow( (p/100)+1 , 2) );
				}
				else
				{
					//Calcul du pourcantage de vitesse du vaisseau correspondant au temps de vol global
					p = (35000 * Math.sqrt(5*1000/vitShip(j)))/(vit* d -10);
					//Ajout de la consommation du type de vaisseau
					if( Math.round(p) == vitesse)
						p = Math.round(p);
					c +=(conso * 	( 5 / 35000 ) * Math.pow( (p/100)+1 , 2) );
				}
			}
			else // si même G mais pas même SS
			{
				//Calcul du pourcantage de vitesse du vaisseau correspondant au temps de vol global
				p = (35000 * Math.sqrt((2700 + Math.abs(sDep-sArr)*95)*1000/vitShip(j))) / (vit*d-10);
				//Ajout de la consommation du type de vaisseau
				if( Math.round(p) == vitesse)
					p = Math.round(p);
				c += (conso * (( 2700+ 95 * Math.abs(sDep-sArr)) / 35000 ) * Math.pow( (p/100)+1 , 2) );
			}
		}
	}
	return  Math.round(c+1) ;
}
//*******
//Calcule la vitesse d'un vaisseau de numéro i (correspondant à sa position dans la liste des vaisseaux)
function vitShip (i)
{
	var vit =0;
	var comb = document.getElementById('Tcomb').value; // tech de combustion
	var imp = document.getElementById('Timp').value; // tech d'impulsion
	var hyp = document.getElementById('Thyp').value; // tech de propulsion hyperespace
	if( comb == '' || comb < 0) // Si donneés incorrectes
		comb = 0;
	if( imp == '' || imp < 0 )
		imp = 0;
	if( hyp == '' || hyp < 0)
		hyp = 0;
	switch (i)
	{
		case 0 : if ( imp < 5 ) // PT Si impu >= 5 , on utilise l'impu
					vit = tabV[i] + ( comb * (tabV[i] * 10 /100 ) );
				 else
					vit = tabV[i] + ( imp * (tabV[i] * 20 /100 ) );
				 break;
		case 1 : //GT
		case 2 : // Clé
		case 7 : // Rec
		case 8 : vit = tabV[i] + ( comb * (tabV[i] * 10 /100 ) ); // Sonde
			break;
		case 3 : // Clo
		case 4 : // Cro
		case 6 : vit = tabV[i] + ( imp * (tabV[i] * 20 /100 ) ); // Vc
				break;
		case 9 : if (hyp < 8) // BB
					vit = tabV[i] + ( imp * (tabV[i] * 20 /100 ) );
				 else
					vit = tabV[i] + ( hyp * (tabV[i] * 30 /100 ) );
				break;
		case 5 : // VB
		case 10 : // Des
		case 11 : // Rip
		case 12 : 	vit = tabV[i] + ( hyp * (tabV[i] * 30 /100 ) ); // Tq
				break;
	}
	return vit;
}
//************
function save()
{
	var gDep = document.getElementById('in1G').value; // Galaxie de départ
	var sDep = document.getElementById('in1SS').value; // système de départ
	var pDep = document.getElementById('in1P').value; // position de départ
	var gArr = document.getElementById('in2G').value; // galaxie d'arrivée
	var sArr = document.getElementById('in2SS').value; // système d'arrivée
	var pArr = document.getElementById('in2P').value; // position d'arrivée
	var vit = document.getElementById('inSpeed').value; // vitesse du serveur saisie
	var comb = document.getElementById('Tcomb').value; // tech de combustion
	var imp = document.getElementById('Timp').value; // tech d'impulsion
	var hyp = document.getElementById('Thyp').value; // tech de propulsion hyperespace
	var h = document.getElementById('in1H').value;	// heures saisie
	var m = document.getElementById('in1M').value; // minutes saisie
	var s = document.getElementById('in1S').value; // secondes saisies
	var cdr = document.getElementById('ratioCdrfC').value; //Ratio Cdr
	var nb = 0;
	//Sauvegarde des nombres de vaisseaux
	for( var j = 0 ; j < 13 ; j++)
	{
		nb = parseNB(document.getElementById('s'+ship[j]).value);
		GM_setValue('s'+ship[j]+'fC',nb);
	}
	//Sauvegarde des champs de saisie d'en-tête
	GM_setValue('gDepfC' , gDep);
	GM_setValue('sDepfC' , sDep);
	GM_setValue('pDepfC' , pDep);
	GM_setValue('gArrfC' , gArr);
	GM_setValue('sArrfC' , sArr);
	GM_setValue('pArrfC' , pArr);
	GM_setValue('vitfC' , vit);
	GM_setValue('combfC' , comb);
	GM_setValue('impfC' , imp);
	GM_setValue('hypfC' , hyp);
	GM_setValue('hfC' , h);
	GM_setValue('mfC' , m);
	GM_setValue('sfC' , s);
	GM_setValue('ratioCdrfC' , cdr);

}
//*****
function loadData()
{
	var nb = 0;
	//chargement du nombre de vaisseaux
	for( var j = 0 ; j < 13 ; j++)
	{
		nb = GM_getValue('s'+ship[j]+'fC',-1);
		if (nb > -1)
			document.getElementById('s'+ship[j]).value = nb;
	}
	//----------
	//chargement des champs de saisie d'en-tête
	nb = GM_getValue('gDepfC' , -1);
	if (nb > -1)
		document.getElementById('in1G').value = nb;
	nb = GM_getValue('sDepfC' , -1);
	if (nb > -1)	
		document.getElementById('in1SS').value = nb; 
	nb = GM_getValue('pDepfC' , -1);
	if (nb > -1)
		document.getElementById('in1P').value = nb;
	nb = GM_getValue('gArrfC' , -1);
	if (nb > -1)
		document.getElementById('in2G').value = nb;
	nb = GM_getValue('sArrfC' , -1);
	if (nb > -1)
		document.getElementById('in2SS').value = nb;
	nb = GM_getValue('pArrfC' , -1);		
	if (nb > -1)
		document.getElementById('in2P').value = nb;
	nb = GM_getValue('vitfC' , -1);
	if (nb > -1)
		document.getElementById('inSpeed').value = nb;
	nb = GM_getValue('combfC' , -1);
	if (nb > -1)
		document.getElementById('Tcomb').value = nb; 
	nb = GM_getValue('impfC' , -1);
	if (nb > -1)
		document.getElementById('Timp').value = nb;
	nb = GM_getValue('hypfC' , -1);
	if (nb > -1)	
		document.getElementById('Thyp').value = nb;
	nb = GM_getValue('hfC' , -1);
	if (nb > -1)
		document.getElementById('in1H').value = nb;
	nb = GM_getValue('mfC' , -1);
	if (nb > -1)
		document.getElementById('in1M').value = nb; 
	nb = GM_getValue('sfC' , -1);
	if (nb > -1)
		document.getElementById('in1S').value = nb; 
	nb = GM_getValue('ratioCdrfC' , -1);
	if (nb > -1)
		document.getElementById('ratioCdrfC').value = nb;
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
				if (country == 'fr')
					{
						MaJ.innerHTML += "<br><a href='"+ Instal +"'><div align=center><font color=orange> Mise à jour disponible  </font></div></a><br>";	
					}
					else
					{
						MaJ.innerHTML += "<br><a href='"+ Instal +"'><div align=center><font color=orange> Update available </font></div></a><br>";	
					}
			}
		}
	});
}

//--------------- SCRIPT --------------
var elem = document.createElement("div");
elem.setAttribute("id" , "fleetCalc");
document.getElementById("contentWrapper").insertBefore(elem, document.getElementById('eventboxContent'));
//document.getElementsByClassName('push')[0].innerHTML = bloc; 
document.getElementById('fleetCalc').innerHTML = titre
var openBut = document.getElementById('titreFC');
openBut.addEventListener("click",open, false );

//*********** MISE A JOUR **************//

if (FireFox)
{
	var page =location.href.split('?page=')[1].split('&')[0]; // recuperation du type de la page
	var MaJ = document.createElement("div"); // création d'un élément HTML <div></div>
	MaJ.setAttribute("style","font-weight:bold;"); // Affectation des attributs : Gras
	document.getElementById(page).insertBefore(MaJ, document.getElementById('siteFooter')); // On l'affiche entre la page galaxie et le pied de page.
	//MaJ.innerHTML = '<font color="orange">Test</font>';
	//checkUpDate(); // Se fait dans le open
}