// version 0.8
// 18 Feb 2007
// Copyright (c) 2007, Guillermo Gutierrez
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Script de compactacion automatica de batallas de ogame

//Looking for transtlators uncle Gobo needs you ;) if you want translate this script please mail me at eldaimon in g m a i l -remove the espaces- . com


// ==UserScript==
// @name Compactador-Ogame
// @namespace http://eldaimon.blogspot.com/
// @author Guillermo Gutierrez
// @description  Compactador de informes de batallas del ogame
// @include     http://*/bericht*php*
// ==/UserScript==

//TODO: Remove repeat tags

//Constant pattern values for search in document, usefull for translate this script
/*
	If you want translate this script you must change the text between begin and end translation coment
	keep the espaces at the beggining and end of a phrase
*/
/* 
	======================
	BEGIN TRANSLATION ZONE
	======================
*/
	const amountag = "Cantidad";
	const damagetag	= "Armas:";
	const resulttag = "batalla";
	const drawtag = "combate";
	const rubbletag = "flotan ahora";
	const metalrubbletag = "Metal y";
	const cristalrubbletag = "Cristal";
	const stolentag = "captura<br>";
	const metaltag = "Metal,";
	const cristaltag = "Cristal y";
	const deuteriumtag = "Deuterio<br>";
	const atackerloosestag = "El atacante ha perdido en total";
	const defenderloosestag = "El defensor ha perdido en total";
	const atacker_result_tag = "atacante";
	const unitstag = "unidades.";
	const destroytag = "Destruido";
	const br = "<br>";
	var endtecnologytag	 	= '<table border="1">';
	var endtecnology2tag 	 	= '<br>Destruido';
	var no_ships_no_defenses_text 	= "Sin naves ni defensas";
	var roundtag			= 'La flota atacante dispara';
	var moon_tag		 	= 'La probabilidad de que una luna surja de los escombros es de';
	var moon_created_tag	 	= 'Las enormes cantidades de metal y de cristal se atraen y forman lentamente un satélite lunar en la órbita del planeta. ';
	var max_rentability	 	= 'Máxima';
	var min_rentability		= 'Mínima';
	var repaired_tag	 	= 'pueden ser reparados.';
	var months 			= new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre','Diciembre');
	var serverShiptsNames		= new Array('P.Carga','Gr.Carga','Cazador L.','Cazador P.','Crucero','Nave de Batalla','Colonizador','Reciclador.','Sonda','Bombardero','Satélite S.','Destructor','Est.Muerte','Acoraz.');
	var userShiptsNames		= new Array('Nave pequeña de carga','Nave grande de carga','Cazador ligero','Cazador pesado','Crucero','Nave de batalla','Colonizador','Recicladores','Sonda de espionaje','Bombardero','Satélite solar','Destructor','Estrella de la muerte','Acorazado');
	var serverDefensesNames		= new Array('Misil','Láser Peq.','Láser Gr.','C.Gauss','C.Iónico','C.Plasma','Cúpula Peq.','Cúpula Gr.');
	var userDefensesNames		= new Array('Lanzamisiles','Láser pequeño','Láser grande','Cañón de gauss','Cañón iónico','Cañón de plasma','Cúpula pequeña de protección','Cúpula grande de protección');
//const strings
	const c_singleAtacker 		= 'Atacante';
	const c_multipleAtacker 	= 'Atacantes';
	const c_singleDefender 	= 'Defensor';
	const c_multipleDefender 	= 'Defensores';
	const c_battleInit		= 'Batalla del día ';
	const c_at			= ' a las ';
	const c_of			= ' de ';
	const c_duration		= 'La batalla duró ';
	const c_rounds			= ' rondas';
	const c_hiddenTecnology	= 'Armas: XXX% Escudos: XXX% Blindaje: XXX%';
	const c_lost			= ' perdió ';
	const c_looses			= 'Pérdidas ';
	const c_units 			= ' unidades.';
	const c_stolen			= 'Captura: ';
	const c_metalInfo		= ' Metal, ';
	const c_cristalInfo		= ' Cristal y ';
	const c_deuteriumInfo		= ' Deuterio';
	const c_consumption		= 'Consumo de deuterio (aproximado) al 100%: ';
	const c_atackerLooses		= 'Pérdidas del Atacante: ';
	const c_defenderLooses		= 'Pérdidas del Defensor: ';
	const c_totalLooses		= 'Pérdidas TOTALES: ';
	const c_rubbles		= 'Escombros';
	const c_metalRubble		= 'Metal: ';
	const c_cristalRubble		= 'Cristal: ';
	const c_deuteriumRubble		= 'Deuterio: ';
	const c_winAndLost		= 'GANANCIAS Y PÉRDIDAS';
	const c_recicleRentability   	= 'Rentabilidad con reciclaje: ';
	const c_notRecicleRentability   = 'Rentabilidad sin reciclaje: ';
	const c_with			= ' Con';
	const c_without		= 'Sin ';
	const c_recicle		= ' Reciclaje: ';
	const c_defenderWithRecicle	= 'Defensor Si Recicla: ';
	const c_showDeuterium		= ' Mostrar el consumo de deuterio <br />';
	const c_showTech		= ' Mostrar las tecnologías &nbsp;&nbsp;&nbsp;';
	const c_showCoords		= ' Mostrar las coordenadas<br>';
	const c_forumSkin		= ' Fondo de foro claro &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	const c_ogameSkin		= ' Fondo de skin claro<br>';
	const c_forumType0		= ' Compactar en html ';
	const c_forumType1		= ' Compactar para foro phpBB ';
	const c_forumType3		= ' Compactar para foro smf ';
	const c_forumType2		= ' Compactar en texto plano<br />';
	const c_showReport		= ' Ocultar el reporte original de batalla<br />';
	const c_old_favour		= ' Ver el reporte "clasico"<br />';
	const c_old_slooses		= 'Perdidas del ';
	const c_old_plooses		= 'Perdidas de los ';
	const c_old_rentabilitysAtacker = 'Rentabilidad del Atacante: ';
	const c_old_rentabilitypAtacker = 'Rentabilidad de los Atacantes: ';
	const c_old_rentabilitysDefender= 'Defensor Si Recicla: ';
	const c_old_rentabilitypDefender= 'Defensores Si Reciclan: ';
	const c_old_atacker		= 'Atacante ';
	const c_old_with		= 'Con';
	const c_old_without		= 'Sin';	


	var added_link		= new Array('','[color=orangered][size=12]Compactado con el [url=http://userscripts.org/scripts/show/3482]Compactador automático de batallas[/url][/size][/color]','','[b][color=orangered]Compactado con el [url=http://userscripts.org/scripts/show/3482]Compactador automático de batallas[/url][/color][/b]');

/* 
	====================
	END TRANSLATION ZONE
	====================
*/

//Shipts properties
	var shiptsConsumption		= new Array('20','50','20','75','300','500','100','300','1','1000','0','1000','1','250');
	var shiptsSpeed			= new Array('10000','7500','12500','10000','15000','10000','2500','2000','100000000','5000','0','5000','100','10000');

	//Shipts costs
	var shiptsMetalCost		= new Array('2000','6000','3000','6000','20000','45000','10000','10000','0','50000','0','60000','5000000','30000');
	var shiptsCristalCost		= new Array('2000','6000','1000','4000','7000','15000','20000','6000','1000','25000','2000','50000','4000000','40000');
	var shiptsDeuteriumCost		= new Array('0','0','0','0','2000','0','10000','2000','0','15000','500','15000','1000000','15000');
	
//Defenses costs
	var defensesMetalCost		= new Array('2000','1500','6000','20000','2000','50000','10000','50000');
	var defensesCristalCost		= new Array('0','500','2000','15000','6000','50000','10000','50000');
	var defensesDeuteriumCost	= new Array('0','0','0','2000','0','30000','0','0');


//Report values conatiners
	//Atackers & Defenders info
	var atackerName 	 = new Array();
	var atackerTecnology     = new Array();
	var defenderName 	 = new Array();
	var defenderTecnology    = new Array();
	var atackerCount	 = 0;
	var defenderCount	 = 0;
	var rounds		 = 1;
	var loosesArr		 = new Array();

	//Rubbles info
	var rubbleMetal	 	 = 0;
	var rubbleCristal	 = 0;

	//looses info
	var defenderLoosesAmount = 0;
	var atackerLoosesAmount  = 0;

	//Stolen info
	var stolenMetal	 	 = 0;
	var stolenCristal	 = 0;
	var stolenDeuterium	 = 0;

	//Result Info
	var result_info		 = "";
	var date		 = "";
	var moon_probability	 = 0;
	var atackerRentability   = "";
	var atackerRentability2   = "";
	var defenderRentability  = "";
	var moon_and_defenses_info	 = "";
	var metalAtackersLooses = 0;
	var cristalAtackersLooses = 0;
	var deuteriumAtackersLooses = 0;
	var metalDefendersLooses = 0;
	var cristalDefendersLooses = 0;
	var deuteriumDefendersLooses = 0;

	//Report
	var original_body = "";

//Paralel arrays for get the flotes
	var atackerInitialShipsType = new Array();
	var atackerFinalShipsType = new Array();
	var atackerInitialShipsNumber = new Array();
	var atackerFinalShipsNumber = new Array();
	var atackerAuxFinalShipsNumber = new Array();
	var defenderInitialShipsType = new Array();
	var defenderFinalShipsType = new Array();
	var defenderInitialShipsNumber = new Array();
	var defenderFinalShipsNumber = new Array();
	var defenderAuxFinalShipsNumber = new Array(); 
	var atackerCoords = new Array();
	var defenderCoords = new Array();

//Colors for forums, we must get and set the options from the Grease monkey
	//For fleets 
	var fleetAtackerColor = new Array('red', 'lime');
	var fleetDefenderColor = new Array('blue', 'orange');
	var infoColor = new Array('purple', 'skyblue');
	//For nicks
	var atackerNameColor = new Array('red', 'lime');
	var defenderNameColor = new Array('blue', 'orange');
	//For looses
	var totalAtackerLoosesColor = new Array('red','lime');
	var partialAtackerLoosesColor = new Array('green','limegreen');
	var totalDefenderLoosesColor = new Array('blue','orange');
	var partialDefenderLoosesColor = new Array('orangered','orangered');
	//For consumption
	var atackerConsumptionColor = new Array('red','lime');
	var defenderConsumptionColor = new Array('blue','orange');
	//For stolen resources
	var stolenColor = new Array('purple', 'skyblue');
	//For rentabilitys
	var atackerWithRecicleColor = new Array('green','yellow');
	var atackerWithOutRecicleColor = new Array('orangered','orangered');
	var defenderWithRecicleColor = new Array('brown','coral');


//Tags for html, forums and plain text and smf :)
	var boldInit 		= new Array('<b>','[b]','','[b]');
	var boldEnd		= new Array('</b>','[/b]','','[/b]');
	var itallyInit		= new Array('<i>','[i]','','[i]');
	var itallyEnd		= new Array('</i>','[/i]','','[/i]');
	var crlf		= new Array('<br>','\n','\n','\n');	
	var sizeInit		= new Array('<font size="#replace">','[size=#replace]','','[size=#replace]');
	var sizeEnd		= new Array('</font>', '[/size]','', '[/size]');
	var colorInit		= new Array('<font color="#replace">','[color=#replace]','','[color=#replace]');
	var colorEnd		= new Array('</font>','[/color]','','[/color]');
	var hr			= new Array('<img src="http://www.science.siu.edu/images/line-hr-eyes.gif" />','[img]http://www.science.siu.edu/images/line-hr-eyes.gif[/img]','','[img]http://www.science.siu.edu/images/line-hr-eyes.gif[/img]');
	var round_size		= new Array('3px','18','','14pt');	
	var nick_size		= new Array('4px','19','','15pt');
	var section_size	= new Array('4px','17','','13pt');
	var resource_size	= new Array('4px','21','','17pt');
	var rentability_size	= new Array('4px','17','','13pt');

//Options of report:)
var color_skin = 1;
var color_forum = 0;

//////////////////////////////////////////////////////////
// Get the text between the begin text and the end text //
//////////////////////////////////////////////////////////


function get_from_to(strLine, begin, end) {

	return strLine.substring(strLine.indexOf(begin) + begin.length , strLine.indexOf(end));
}

////////////////////////////////////////////////////////
// Get the date of the battle and show it more gentle //
////////////////////////////////////////////////////////


function get_battle_date () {
        
        var header = document.getElementsByTagName('td')[0].firstChild.nodeValue;
	var dateArr = new Array();
        dateArr = header.match(/(\d\d)-(\d\d) (\d\d:\d\d:\d\d)/);
        date = dateArr[2] + ' ' + c_of + ' ' + months[parseInt(dateArr[1],10)-1] + c_at + dateArr[3];
        return date;
}

////////////////////////////////////////////////////////
// Get the distance factor from Origin to Destination //
////////////////////////////////////////////////////////


function distance(origin, destination) {
	var dist = 0;
	var originArr = new Array();
	var destinationArr = new Array();
	//Clear the strings
	origin = origin.replace("(","");
	origin = origin.replace(")","");
	destination = destination.replace("(","");
	destination = destination.replace(")","");
	//Convert the cordinates to an array galaxy 0, system 1, planet 2
	originArr = origin.split(":");
	destinationArr = destination.split(":");
	if ( originArr[0] == destinationArr[0]) { 
		//Same galaxy
		if ( originArr[1] == destinationArr[1]) {
			//Same system diferent planet
			dist = Math.abs(originArr[2] - destinationArr[2]) * 5 + 1000;
		}
		else {
			//Diferent System same galaxy
			dist = Math.abs(originArr[1] - destinationArr[1]) * 5 * 19 + 2700;
		}
	}
	else {
		//Diferent Galaxy
		dist = Math.abs(originArr[0] - destinationArr[0]) * 20000;
	}
	return dist;
}
function atackerConsumption (dist, minSpeed, player) {
	var duration = 0;
	var spd = 0;
	var searchPos;
	var basicCosumption = 0;
	var consumption = 0;
	duration = Math.round((35000/10 * Math.sqrt(dist*10/minSpeed) + 10));
	for (var i=0; i<atackerInitialShipsType[player].length; i++) {
		//For each ship in the attack :)
		searchPos = -1;
		for ( var j=0;j<serverShiptsNames.length; j++ ) {
			if (atackerInitialShipsType[player][i] == serverShiptsNames[j]) {
				searchPos = j;	
			 	break;
			}
		}
		if (searchPos != -1) {
			spd = 35000/(duration * 1 - 10) * Math.sqrt(dist*10/shiptsSpeed[searchPos]);
			basicConsumption = shiptsConsumption[searchPos] * atackerInitialShipsNumber[player][i];
			consumption += basicConsumption * dist / 35000 * ((spd / 10) + 1) * ((spd / 10) + 1);
		}
	}
	return Math.round(consumption) + 1;
}
function defenderConsumption (dist, minSpeed, player) {
	var duration = 0;
	var spd = 0;
	var searchPos;
	var basicCosumption = 0;
	var consumption = 0;
	duration = Math.round((35000/10 * Math.sqrt(dist*10/minSpeed) + 10));
	for (var i=0; i<defenderInitialShipsType[player].length; i++) {
		//For each ship in the attack :)
		searchPos = -1;
		for ( var j=0;j<serverShiptsNames.length; j++ ) {
			if (defenderInitialShipsType[player][i] == serverShiptsNames[j]) {
				searchPos = j;	
			 	break;
			}
		}
		if (searchPos != -1) {
			spd = 35000/(duration * 1 - 10) * Math.sqrt(dist*10/shiptsSpeed[searchPos]);
			basicConsumption = shiptsConsumption[searchPos] * defenderInitialShipsNumber[player][i];
			consumption += basicConsumption * dist / 35000 * ((spd / 10) + 1) * ((spd / 10) + 1);
		}
	}
	return Math.round(consumption) + 1;
}



/////////////////////////////////////////////////////////////////
// Get the final flotes from all players and store in a matrix //
/////////////////////////////////////////////////////////////////

function get_final_flotes () {
	var html = document.getElementsByTagName ('center');
	var strLine;
	var player = defenderCount;
 	var i;
	var j;
	var array_controler = 0;
	for (j=0;j< defenderCount; j++) {
		//Initialize the matrix
		defenderFinalShipsNumber[j] = new Array();	
	}
	for (i=html.length -1; i >= html.length - (defenderCount)  ; i--) {
		array_controler = 0;
		//Get defenders flotes
		strLine = html[i].innerHTML;
		player --;
		if (strLine.search(destroytag) != -1) {
			//The defensor was destroyed
			defenderFinalShipsType[player] = '';
			defenderAuxFinalShipsNumber[player] = '';

		}
		else {
			defenderFinalShipsType[player]=get_flote_type_from_string (strLine);
			defenderAuxFinalShipsNumber[player]=get_flote_number_from_string(strLine);
		}

		for (j=0;j<defenderInitialShipsType[player].length;j++) {
				if (defenderFinalShipsType[player][array_controler] == defenderInitialShipsType[player][j]) {
					//The ship type has survivors :)
					defenderFinalShipsNumber[player][j]=defenderAuxFinalShipsNumber[player][array_controler];
					array_controler++;
				}
				else {
					defenderFinalShipsNumber[player][j] = 0;
				}
		}
		//Check for set the destroyed player flote
		if (defenderAuxFinalShipsNumber[player]=='') {
			defenderFinalShipsType[player] = defenderInitialShipsType[player]
			for (j=0;j<defenderInitialShipsNumber[player].length;j++)
			defenderFinalShipsNumber[player][j] = 0; 
		}
	}
	player = atackerCount;
	for (j=0;j< atackerCount; j++) {
		//Initialize the matrix
		atackerFinalShipsNumber[j] = new Array();	
	}
	
	for (i=html.length-(defenderCount+1);i>=html.length-(defenderCount+atackerCount);i--) {
		//Get atackers flotes
		strLine = html[i].innerHTML;
		player --;
		if (strLine.search(destroytag) != -1) {
			//The defensor was destroyed
			atackerFinalShipsType[player] = '';
			atackerFinalShipsNumber[player] = '';

		}
		else {
			atackerFinalShipsType[player] = get_flote_type_from_string (strLine);
			atackerAuxFinalShipsNumber[player] = get_flote_number_from_string (strLine);
		}
		arrayController = 0;
		for (j = 0; j < atackerInitialShipsType[player].length; j++) {
			if (atackerInitialShipsType[player][j] == atackerFinalShipsType[player][arrayController] ) 	{
				atackerFinalShipsNumber[player][j]=atackerAuxFinalShipsNumber[player][arrayController];
				arrayController++;
			}
			else {
				atackerFinalShipsNumber[player][j] = 0;
			}
		}
		//Check for set the destroyed player flote
		
		if (atackerAuxFinalShipsNumber[player]==undefined) {
			atackerFinalShipsType[player] = atackerInitialShipsType[player];
			atackerFinalShipsNumber[player] = new Array();
			for (j=0;j<atackerInitialShipsNumber[player].length;j++) {
				atackerFinalShipsNumber[player][j] = 0; 
			}
		}
	}
}

/////////////////////////////////////////////////////////////////
// Get the initial info about players: flotes, name, tecnology //
/////////////////////////////////////////////////////////////////

function get_names_and_flotes () {
	//Extract the names of attackers and defenders.
	var html = document.getElementsByTagName ('center');
	var strLine;
	for (var i = 1; i <= html.length - 1; i++) {		
		strLine = html[i].innerHTML;
		if ( strLine.search(c_singleAtacker ) != -1 && strLine.search(br) != -1 && strLine.search(destroytag) == -1) {
			//Get only the atacker first aparition
			atackerName[atackerCount] = get_from_to(strLine,c_singleAtacker ,br);
			atackerInitialShipsType[atackerCount]=get_flote_type_from_string(strLine);
			atackerInitialShipsNumber[atackerCount]=get_flote_number_from_string(strLine);
			atackerTecnology[atackerCount] = get_from_to(strLine,br,endtecnologytag);
			atackerCoords[atackerCount] = get_from_to(strLine,'(',')');
			atackerCount++; 
		}
		else if (strLine.search(c_singleDefender ) != -1 && strLine.search(br) != -1 && strLine.search(destroytag) == -1) {
			//Get only the defender first aparition
			defenderName[defenderCount] = get_from_to(strLine,c_singleDefender,br);
			defenderInitialShipsType[defenderCount]=get_flote_type_from_string (strLine);
			defenderInitialShipsNumber[defenderCount]=get_flote_number_from_string (strLine);
			defenderTecnology[defenderCount] = get_from_to(strLine,br,endtecnologytag);
			defenderCoords[defenderCount] = get_from_to(strLine,'(',')');
			defenderCount++; 
		}
		else if (strLine.search(c_singleDefender) != -1 && strLine.search(br) != -1 && strLine.search(destroytag) != -1 && defenderCount == 0) {
			//Get the defender when s/he didn't have float and defenses
			defenderName[defenderCount] = get_from_to(strLine,c_singleDefender,br);
			defenderInitialShipsType[defenderCount] = no_ships_no_defenses_text;
			defenderInitialShipsNumber[defenderCount] = '';
			defenderTecnology[defenderCount]=get_from_to(strLine,br,endtecnology2tag);
			defenderCoords[defenderCount] = get_from_to(strLine,'(',')');
			defenderCount++; 
		}
	}
}

/////////////////////////////////////////////////////////
// Get the flotes type from one report realy useful :D //
/////////////////////////////////////////////////////////

function get_flote_type_from_string (strLine) {
//Get the flote type from a string
	var storeArray = new Array();
	var floteTypeArray = new Array();
	storeArray = strLine.split('<th>');
	for (var i=0; i < storeArray.length && storeArray[i+2].search(amountag) == -1; i++) {
		//Clean the string before store
		floteTypeArray[i] = storeArray[i+2].replace('</th>','').replace('</tr><tr>','');
	}
	return floteTypeArray;
}

////////////////////////////////////////////////////////////
// Get the flotes number from one report really useful :D //
////////////////////////////////////////////////////////////


function get_flote_number_from_string (strLine) {
//Get the flote number from a string
	var storeArray = new Array();
	var floteNumberArray = new Array();
	var array_controller = 0;
	storeArray = strLine.split('<th>');
	for (var i = 0; i < storeArray.length && storeArray[i].search(amountag) == -1; i++) {
		array_controller++;
	}
	array_controller++;
	for (i=array_controller; i < storeArray.length && storeArray[i].search(damagetag) == -1; i++) {
		//Clean the string before store
		floteNumberArray[i-array_controller] = storeArray[i].replace('</th>','').replace('</tr><tr>','').replace(/[.]/g,'');
	}
	return floteNumberArray;
}

//////////////////////////////
// Get the number of rounds //
//////////////////////////////

function get_rounds() {
	var html = document.getElementsByTagName ('tbody');
	var players = (atackerCount+defenderCount);
	var strLines = html[0].innerHTML;
	rounds = strLines.split(roundtag).length -1;
	if (rounds == 0) {
		rounds++;
	}
}

////////////////////////////////////////////////////////////////////////////
// Get general info about the battle like winner, stolen resources etc... //
////////////////////////////////////////////////////////////////////////////


function get_battle_info_result() {
	var html = document.getElementsByTagName ('p');	
	var strLine; 
	for (var i = 0; i <= html.length - 1; i++) {
		strLine = html[i].innerHTML;
		if ((strLine.search(resulttag) != -1) || (strLine.search(drawtag) != -1)) {	
			//Search for win loose or draw zone to recover winner info		
			result_info = get_from_to(strLine,'',br);
			if (result_info.search('!') != -1) {
				result_info = result_info.replace(' ','¡') ;
			} 
		}
		if ((strLine.search(resulttag) != -1) && (strLine.search(atacker_result_tag))) {
			//Search for stolenResources when atacker win
			stolenMetal = get_from_to(strLine,stolentag,metaltag).replace(/[.]/g,'');
			stolenCristal = get_from_to(strLine,metaltag,cristaltag).replace(/[.]/g,'');
			stolenDeuterium = get_from_to(strLine,cristaltag,deuteriumtag).replace(/[.]/g,'');
		}
		if (strLine.search(rubbletag) != -1)  {
			//Search for rubble
			rubbleMetal = get_from_to(strLine,rubbletag,metalrubbletag).replace(/[.]/g,'');
			rubbleCristal=get_from_to(strLine,metalrubbletag,cristalrubbletag).replace(/[.]/g,'');
		}
		if (strLine.search(moon_tag) != -1) {
			moon_probability = parseInt(get_from_to(strLine,moon_tag,'%'));
			strLine = strLine+ '<br>';
			moon_and_defenses_info = strLine.substring(strLine.indexOf(cristalrubbletag) + (cristalrubbletag.length +1),strLine.lastIndexOf(br)).replace('<b>','').replace('</b>','');
		}
		if (strLine.search(moon_created_tag) != -1) {
			moon_info = moon_created_tag;
		}
		//Get atacker looses value
		atackerLoosesAmount =  parseInt(get_from_to(strLine,atackerloosestag,unitstag).replace(/[.]/g,''));
		//Get defender looses value
		defenderLoosesAmount = parseInt(strLine.substring(strLine.indexOf(defenderloosestag) + (defenderloosestag.length +1),strLine.lastIndexOf(unitstag)-1).replace(/[.]/g,''));
					
	}
}

///////////////////////////////////////////////
// Get the rentabilitys from the report data //
///////////////////////////////////////////////


function get_rentabilitys () {
	var rubbleAmount = parseInt(rubbleCristal) + parseInt(rubbleMetal);
	if (isNaN(stolenMetal)) {
		stolenMetal = 0;
	}
	if (isNaN(stolenCristal)) {
		stolenCristal = 0;
	}
	if (isNaN(stolenDeuterium)) {
		stolenDeuterium = 0;
	}
	var stolenAmount = parseInt(stolenMetal) + parseInt(stolenCristal) + parseInt(stolenDeuterium);
	if (isNaN(rubbleAmount)) {
		rubbleAmount = 0;
	}
	if (atackerLoosesAmount == 0) {
		atackerRentability = max_rentability;
		atackerRentability2 = max_rentability;
	}
	else {
		if (isNaN(stolenAmount))
		{
			//This must fix the bug when nothing is stolen
			stolenAmount = 0;
		}
		atackerRentability = ((((rubbleAmount + stolenAmount)- atackerLoosesAmount) / atackerLoosesAmount)*100);
		atackerRentability = Math.round(parseInt(atackerRentability)) + '%';	
		atackerRentability2 = (((stolenAmount- atackerLoosesAmount) / atackerLoosesAmount)*100);
		atackerRentability2 = Math.round(parseInt(atackerRentability2)) + '%';	
	}
	if (defenderLoosesAmount == 0 && stolenAmount == 0) {
		defenderRentability = max_rentability;
	}
	else {
		defenderRentability = ((rubbleAmount - (defenderLoosesAmount + stolenAmount)) / (defenderLoosesAmount + stolenAmount))*100;
		defenderRentability = Math.round(parseInt(defenderRentability)) + '%';		
	}
}

////////////////////////////////////////////////////////////////////////
// based in a function from 					      //
// http://www.forosdelweb.com/showthread.php?postid=265553#post265553 //
// put dot as separator :)					      //
////////////////////////////////////////////////////////////////////////

function formatNmb(num){
    var sRes = "";
    var sign = "";
    if (parseInt(num) < 0) {	
	sign = "-";
	num = parseInt(num) * -1	
    }
    //Convert to string and remove espaces
    nNmb = '' + parseInt(num) + '';

    for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++)
     sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;

    return sign + sRes;
} 

////////////////////////////////////
// create the flotes report zone  //
////////////////////////////////////

function createFloteView (fleetType, fleetInitialNumber, fleetFinalNumber, fleetColor, loosesColor, type_preference) {
	//Initizlize the report
	var fleetReport = '';
	for (var position=0; position < fleetType.length; position++) {
			//Calculate type, initial and final fleet row
			type = fleetType[position];
			initialNumber = formatNmb(fleetInitialNumber[position]);
			lostNumber   = formatNmb((fleetInitialNumber[position]-fleetFinalNumber[position]));
			//Set shipt color for initial representation
			fleetReport = fleetReport + fleetType[position] + ' ' +  colorInit[type_preference].replace('#replace', fleetColor);
			fleetReport = fleetReport + initialNumber + colorEnd[type_preference];
			//Set color for shipt looses
			fleetReport = fleetReport + colorInit[type_preference].replace('#replace', loosesColor) + c_lost + lostNumber + colorEnd[type_preference];
			fleetReport = fleetReport + crlf[type_preference];
	}
	return fleetReport;
}

function createPlayerName (playerName, view_coords, color, size, type) {
	//Initialize the string
	nameCreated = '';
	if (view_coords) {
		nameCreated = colorInit[type].replace('#replace', color) + sizeInit[type].replace('#replace',size);
		nameCreated = nameCreated + playerName.replace('(',sizeEnd[type] + colorEnd[type] + boldInit[type] + '[').replace(')', ']') + boldEnd[type] + crlf[type];
	}
	else {
		nameCreated = colorInit[type].replace('#replace', color) + sizeInit[type].replace('#replace',size);
		nameCreated = nameCreated + playerName.split('(')[0] + sizeEnd[type] + colorEnd[type] + crlf[type];	
	}
	return nameCreated;
}

function createTecnology(tecnology, type) {
	tecnologyArr = tecnology.split(' ');
	tecnologyReport = tecnologyArr[0] + ' ' + boldInit[type] + tecnologyArr[1] + boldEnd[type] + ' ' + tecnologyArr[2] + ' ';
	tecnologyReport = tecnologyReport + boldInit[type] + tecnologyArr[3] + boldEnd[type] + ' ' + tecnologyArr[4] + ' ';
	tecnologyReport = tecnologyReport + boldInit[type] + tecnologyArr[5] + boldEnd[type] +crlf[type];
	return tecnologyReport;
}

function estimateLooses (initialShipsType,initialShipsNumber, finalShipsNumber, type, totalLoosesColor, partialLoosesColor, isAtacker) {
	var metalLoosesPlayer = 0;
	var cristalLoosesPlayer = 0;
	var deuteriumLoosesPlayer = 0;
	for (var i=0; i<initialShipsType.length; i++) {
		//Search for initialShipsType in serverShiptsNames to get shipt values
		searchPos = -1;
		for ( var j=0;j<serverShiptsNames.length; j++ ) {
			if (initialShipsType[i] == serverShiptsNames[j]) {
				searchPos = j;	
				 break;
			}
		}
		if (searchPos == -1) {
			//it's a defense :)
			for ( var j=0;j<serverDefensesNames.length; j++ ) {
				if (initialShipsType[i] == serverDefensesNames[j]) {
					searchPos = j;	
				 	break;
				}
			}
			if (searchPos != -1) {
				metalLoosesPlayer = parseInt(metalLoosesPlayer) + parseInt(defensesMetalCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]));
				cristalLoosesPlayer = cristalLoosesPlayer + defensesCristalCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]);
				deuteriumLoosesPlayer = deuteriumLoosesPlayer + defensesDeuteriumCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]);	
			}
		} 
		else {
			metalLoosesPlayer = metalLoosesPlayer + shiptsMetalCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]);
			cristalLoosesPlayer = cristalLoosesPlayer + shiptsCristalCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]);
			deuteriumLoosesPlayer = deuteriumLoosesPlayer + shiptsDeuteriumCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]);
		}
	}
	totalLoose = formatNmb(metalLoosesPlayer + cristalLoosesPlayer + deuteriumLoosesPlayer);
	estimateReport =  c_looses + boldInit[type] + colorInit[type].replace('#replace', totalLoosesColor) + totalLoose + colorEnd[type] + boldEnd[type] + c_units + crlf[type];
	estimateReport = estimateReport + itallyInit[type] +'(';
	estimateReport = estimateReport + colorInit[type].replace('#replace', partialLoosesColor) + formatNmb(metalLoosesPlayer) + colorEnd[type] + c_metalInfo;
	estimateReport = estimateReport + colorInit[type].replace('#replace', partialLoosesColor) + formatNmb(cristalLoosesPlayer) + colorEnd[type] + c_cristalInfo;
	estimateReport = estimateReport + colorInit[type].replace('#replace', partialLoosesColor) + formatNmb(deuteriumLoosesPlayer) + colorEnd[type] + c_deuteriumInfo;
	estimateReport = estimateReport + ')' + itallyEnd[type] + crlf[type];
	if (isAtacker) {
		metalAtackersLooses += parseInt(metalLoosesPlayer);
		cristalAtackersLooses += parseInt(cristalLoosesPlayer);
	 	deuteriumAtackersLooses += parseInt(deuteriumLoosesPlayer);
	} else {
		metalDefendersLooses += parseInt(metalLoosesPlayer);
		cristalDefendersLooses += parseInt(cristalLoosesPlayer);
	 	deuteriumDefendersLooses += parseInt(deuteriumLoosesPlayer);
	}
	return estimateReport;
}

function deuteriumConsumption (shiptsType, shiptsNumber, origin, destination, type, color) {
	var duration = 0;
	var spd = 0;
	var searchPos = -1;
	var basicCosumption = 0;
	var consumption = 0;
	var dist = distance(origin,destination);
	//Get the minimal velocity
	var minSpeed = 100000000;
	for (var i=0; i<shiptsType.length; i++) {
		searchPos = -1;
		for ( var j=0;j<serverShiptsNames.length; j++ ) {
			if (shiptsType[i] == serverShiptsNames[j]) {
				searchPos = j;	
				break;
			}
		}
		if (searchPos != -1) {
			//Get the slowest ship
			if ( parseInt(shiptsSpeed[searchPos]) < parseInt(minSpeed) ) {
				minSpeed = shiptsSpeed[searchPos]
			}
		}
	}
	duration = Math.round((35000/10 * Math.sqrt(dist*10/minSpeed) + 10));
	for (i=0; i<shiptsType.length; i++) {
		//For each ship in the attack :)
		searchPos = -1;
		for ( var j=0;j<serverShiptsNames.length; j++ ) {
			if (shiptsType[i] == serverShiptsNames[j]) {
				searchPos = j;	
			 	break;
			}
		}
		if (searchPos != -1) {
			spd = 35000/(duration * 1 - 10) * Math.sqrt(dist*10/shiptsSpeed[searchPos]);
			basicConsumption = shiptsConsumption[searchPos] * shiptsNumber[i];
			consumption += basicConsumption * dist / 35000 * ((spd / 10) + 1) * ((spd / 10) + 1);
		}
	}
	consumption = formatNmb(Math.round(consumption) + 1);
	return boldInit[type] + c_consumption +  colorInit[type].replace('#replace', color) + consumption + colorEnd[type] + boldEnd[type] + c_units + crlf[type];
}

function resultAndStolen (type, stolenColor) {
	resultAndStolenReport = boldInit[type] + result_info + boldEnd[type] + crlf[type];
	if ((!isNaN(stolenMetal) || !isNaN(stolenCristal) || !isNaN(stolenDeuterium)) && (stolenMetal != 0 || stolenCristal != 0 || stolenDeuterium != 0) ) {
		resultAndStolenReport = resultAndStolenReport + c_stolen + colorInit[type].replace('#replace', stolenColor);
		resultAndStolenReport = resultAndStolenReport + boldInit[type] + formatNmb(stolenMetal) + boldEnd[type] + colorEnd[type];
		resultAndStolenReport = resultAndStolenReport + c_metalInfo + colorInit[type].replace('#replace', stolenColor);
		resultAndStolenReport = resultAndStolenReport + boldInit[type] + formatNmb(stolenCristal) + boldEnd[type] + colorEnd[type];
		resultAndStolenReport = resultAndStolenReport + c_cristalInfo + colorInit[type].replace('#replace', stolenColor);
		resultAndStolenReport = resultAndStolenReport + boldInit[type] + formatNmb(stolenDeuterium) + boldEnd[type] + colorEnd[type];
		resultAndStolenReport = resultAndStolenReport + c_deuteriumInfo + crlf[type];
	}
	return resultAndStolenReport;
}

function partialRentability (positiveResource, negativeResource) {
	var porcentage = Math.round(((positiveResource - negativeResource)/negativeResource)*100);
	if (isNaN(porcentage)) {
		porcentage = 0+ '%';
	}
	else if (Math.abs(porcentage) == Infinity) {
		if ( porcentage < 0 ) {
			porcentage = min_rentability;
		} 
		else {
			porcentage = max_rentability;
		}
	}
	else {
		porcentage = porcentage + '%';
	}
	return porcentage;
}

function do_old_report (type,color_set, view_tecnology, view_coords, view_partials, view_deuterium) {
	var resultReport = '';
	//Print date
	resultReport = boldInit[type] + c_battleInit + date + boldEnd[type] + crlf[type];
	//Print rounds;
	resultReport = resultReport + c_duration + sizeInit[type].replace('#replace',round_size[type]) + boldInit[type] + rounds + boldEnd[type] + sizeEnd[type] + c_rounds; 
	resultReport = resultReport + crlf[type] + crlf[type];
	resultReport = resultReport + boldInit[type] + sizeInit[type].replace('#replace',section_size[type]);

	//Print atackers section
	if (atackerCount > 1) {
		resultReport = resultReport + c_multipleAtacker;
	}
	else {
		resultReport = resultReport +  c_singleAtacker;
	}
	resultReport = resultReport + ' (' + atackerCount +')'+ sizeEnd[type] + boldEnd[type] + crlf[type];
	//Print atacker fleets
	for (var i=0; i<atackerName.length; i++) {
		resultReport = resultReport + createPlayerName(atackerName[i], view_coords, atackerNameColor[color_set], nick_size[type], type);
		if (view_tecnology) {
			resultReport = resultReport + createTecnology (atackerTecnology[i], type);
		}
		resultReport = resultReport + createFloteView(atackerInitialShipsType[i], atackerInitialShipsNumber[i],atackerFinalShipsNumber[i],fleetAtackerColor[color_set], infoColor[color_set], type);
		resultReport = resultReport + crlf[type];
		if (view_partials) {
			resultReport = resultReport + estimateLooses(atackerInitialShipsType[i],atackerInitialShipsNumber[i], atackerFinalShipsNumber[i], type, totalAtackerLoosesColor[color_set], partialAtackerLoosesColor[color_set], true);
		}
		if (view_deuterium) {
			resultReport = resultReport + deuteriumConsumption(atackerInitialShipsType[i], atackerInitialShipsNumber[i], atackerCoords[i], defenderCoords[0],type, atackerConsumptionColor[color_set]);
		}
		if (view_partials || view_deuterium) {
			resultReport = resultReport + crlf[type];
		}
	}
	
	//Print defenders section
	resultReport = resultReport + boldInit[type] + sizeInit[type].replace('#replace',section_size[type]);
	if (defenderCount > 1) {
		resultReport = resultReport + c_multipleDefender;
	}
	else {
		resultReport = resultReport +  c_singleDefender;
	}
	resultReport = resultReport + ' (' + defenderCount +')'+ sizeEnd[type] + boldEnd[type] + crlf[type];
	//Print defender fleets
	for (var i=0; i<defenderName.length; i++) {
		resultReport = resultReport + createPlayerName(defenderName[i], view_coords, defenderNameColor[color_set], nick_size[type], type);
		if (view_tecnology) {
			resultReport = resultReport + createTecnology (defenderTecnology[i], type);
		}
		if (defenderInitialShipsType[i] != no_ships_no_defenses_text) {
			resultReport = resultReport + createFloteView(defenderInitialShipsType[i], defenderInitialShipsNumber[i],defenderFinalShipsNumber[i],fleetDefenderColor[color_set],infoColor[color_set], type);
		} else {
			//Defender has nothing
			resultReport = resultReport + no_ships_no_defenses_text + crlf[type];
		}
		resultReport = resultReport + crlf[type];
		if (view_partials) {
			resultReport = resultReport + estimateLooses(defenderInitialShipsType[i],defenderInitialShipsNumber[i], defenderFinalShipsNumber[i], type, totalDefenderLoosesColor[color_set], partialDefenderLoosesColor[color_set], false);
		}
		if (view_deuterium && i !=0) {
			resultReport = resultReport + deuteriumConsumption(defenderInitialShipsType[i], defenderInitialShipsNumber[i], defenderCoords[i], defenderCoords[0],type, defenderConsumptionColor[color_set]);
		}
		if (view_partials || (view_deuterium && i !=0)) {
			resultReport = resultReport + crlf[type];
		}
	}
	resultReport = resultReport + hr[type];
	resultReport = resultReport + crlf[type];
	resultReport = resultReport + resultAndStolen(type, stolenColor[color_set]);
	resultReport = resultReport + crlf[type];
	//Looses
	if (atackerCount > 1) {
		resultReport = resultReport + c_old_plooses + c_multipleAtacker;
	} 
	else {
		resultReport = resultReport + c_old_slooses + c_singleAtacker;
	}
	resultReport = resultReport + ': ' + sizeInit[type].replace('#replace', resource_size[type]) + colorInit[type].replace('#replace', totalAtackerLoosesColor[color_set])  + formatNmb(atackerLoosesAmount) + colorEnd[type] + sizeEnd[type] + c_units + crlf[type];
	if (defenderCount > 1) {
		resultReport = resultReport + c_old_plooses + c_multipleDefender;
	} 
	else {
		resultReport = resultReport + c_old_slooses + c_singleDefender;
	}
	resultReport = resultReport + ': ' + sizeInit[type].replace('#replace', resource_size[type]) + colorInit[type].replace('#replace', totalDefenderLoosesColor[color_set])  + formatNmb(defenderLoosesAmount) + colorEnd[type] + sizeEnd[type] + c_units + crlf[type];
	//total looses
	resultReport = resultReport + c_totalLooses + boldInit[type] + sizeInit[type].replace('#replace',rentability_size[type]);
	resultReport = resultReport + formatNmb(atackerLoosesAmount + defenderLoosesAmount);
	resultReport = resultReport + sizeEnd[type] + boldEnd[type] + c_units + crlf[type] + crlf[type];
	//Rubles recicles
	if ((parseInt(rubbleCristal)+parseInt(rubbleMetal)) == 0) {
		resultReport = resultReport + boldInit[type] + c_rubbles + boldEnd[type] + crlf[type];
	}
	else {
		resultReport = resultReport + boldInit[type] + c_rubbles + boldEnd[type] + ' (';
		resultReport = resultReport + formatNmb(Math.floor((20000+parseInt(rubbleMetal)+parseInt(rubbleCristal))/20000));
		resultReport = resultReport + ' ' + serverShiptsNames[7] + ')' + crlf[type];
		
	}
	
	//rubbles partials
	resultReport = resultReport + c_metalRubble +  colorInit[type].replace('#replace', infoColor[color_set])  + boldInit[type];
	resultReport = resultReport + formatNmb(rubbleMetal) + boldEnd[type] + colorEnd[type] + c_units + crlf[type];
	resultReport = resultReport + c_cristalRubble + colorInit[type].replace('#replace', infoColor[color_set]) + boldInit[type];
	resultReport = resultReport + formatNmb(rubbleCristal) + boldEnd[type] + colorEnd[type] + c_units + crlf[type];

	//Win and looses
	resultReport = resultReport + crlf[type] + boldInit[type] + c_winAndLost + boldEnd[type] + crlf[type];
	if (atackerCount == 1) {
		resultReport = resultReport + c_old_rentabilitysAtacker;
	}
	else {
		resultReport = resultReport + c_old_rentabilitypAtacker;
	}
	resultReport = resultReport + sizeInit[type].replace('#replace', rentability_size[type]) + boldInit[type] + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]) + atackerRentability + colorEnd[type] + boldEnd[type] + sizeEnd[type] + crlf[type];
	rentability = formatNmb((parseInt(rubbleMetal)+parseInt(rubbleCristal)+parseInt(stolenMetal)+parseInt(stolenCristal)+parseInt(stolenDeuterium))-atackerLoosesAmount);
	resultReport = resultReport + c_old_atacker + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]) + ' ' + c_old_with + colorEnd[type] + '/' + colorInit[type].replace('#replace', totalAtackerLoosesColor[color_set]) + c_old_without + colorEnd[type] + ' Reciclaje: '  + sizeInit[type].replace('#replace', rentability_size[type]) + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]) + rentability + colorEnd[type] + '/';
	rentability = formatNmb((parseInt(stolenMetal)+parseInt(stolenCristal)+parseInt(stolenDeuterium))-atackerLoosesAmount);
 	resultReport = resultReport + colorInit[type].replace('#replace', totalAtackerLoosesColor[color_set]) + rentability + colorEnd[type] + sizeEnd[type] + c_units + crlf[type];

	if (defenderCount > 1) {
		resultReport = resultReport + c_old_rentabilitypDefender;
	} 
	else {
		resultReport = resultReport + c_old_rentabilitysDefender;
	}
	rentability = formatNmb((parseInt(rubbleMetal) + parseInt(rubbleCristal) - stolenMetal - stolenCristal - stolenDeuterium)-parseInt(defenderLoosesAmount));
	resultReport = resultReport + sizeInit[type].replace('#replace', rentability_size[type]) + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]) + rentability;
	resultReport = resultReport + colorEnd[type] + sizeEnd[type] + c_units + crlf[type];

	//Moon and defenses info :)

	if (moon_probability > 0) {
		resultReport = resultReport + moon_and_defenses_info.replace(moon_probability + ' %', sizeInit[type].replace('#replace',round_size[type]) + boldInit[type] +moon_probability+'%'+boldEnd[type] + sizeEnd[type]).replace(moon_created_tag,boldInit[type] + moon_created_tag + boldEnd[type]).replace(/<br>/g,crlf[type]);
	}
	else {
		resultReport = resultReport + moon_and_defenses_info.replace(/<br>/g,crlf[type]);
	}
	resultReport = resultReport + crlf[type] + crlf[type] + added_link[type];
	for (i = 0; i < userShiptsNames.length; i ++) {
		reg = new RegExp(serverShiptsNames[i], "g")
		resultReport = resultReport.replace(reg,userShiptsNames[i]);
		reg = null;
	}
	for (i = 0; i < userDefensesNames.length; i ++) {
		reg = new RegExp(serverDefensesNames[i], "g")
		resultReport = resultReport.replace(reg,userDefensesNames[i]);
		reg = null;
	}
	//Reset the looses :)
	cristalAtackersLooses = 0;
	metalAtackersLooses = 0;
	deuteriumAtackersLooses = 0;
	metalDefendersLooses = 0;
	cristalDefenderLooses = 0;
	deuteriumDefendersLooses = 0;
	return resultReport;
}

function do_report (type,color_set, view_tecnology, view_coords, view_partials, view_deuterium) {

	var resultReport = '';
	//Print date
	resultReport = boldInit[type] + c_battleInit + date + boldEnd[type] + crlf[type];
	//Print rounds;
	resultReport = resultReport + c_duration + sizeInit[type].replace('#replace',round_size[type]) + boldInit[type] + rounds + boldEnd[type] + sizeEnd[type] + c_rounds; 
	resultReport = resultReport + crlf[type] + crlf[type];
	resultReport = resultReport + boldInit[type] + sizeInit[type].replace('#replace',section_size[type]);

	//Print atackers section
	if (atackerCount > 1) {
		resultReport = resultReport + c_multipleAtacker;
	}
	else {
		resultReport = resultReport +  c_singleAtacker;
	}
	resultReport = resultReport + ' (' + atackerCount +')'+ sizeEnd[type] + boldEnd[type] + crlf[type];
	//Print atacker fleets
	for (var i=0; i<atackerName.length; i++) {
		resultReport = resultReport + createPlayerName(atackerName[i], view_coords, atackerNameColor[color_set], nick_size[type], type);
		if (view_tecnology) {
			resultReport = resultReport + createTecnology (atackerTecnology[i], type);
		}
		resultReport = resultReport + createFloteView(atackerInitialShipsType[i], atackerInitialShipsNumber[i],atackerFinalShipsNumber[i],fleetAtackerColor[color_set], infoColor[color_set], type);
		resultReport = resultReport + crlf[type];
		if (view_partials) {
			resultReport = resultReport + estimateLooses(atackerInitialShipsType[i],atackerInitialShipsNumber[i], atackerFinalShipsNumber[i], type, totalAtackerLoosesColor[color_set], partialAtackerLoosesColor[color_set], true);
		}
		if (view_deuterium) {
			resultReport = resultReport + deuteriumConsumption(atackerInitialShipsType[i], atackerInitialShipsNumber[i], atackerCoords[i], defenderCoords[0],type, atackerConsumptionColor[color_set]);
		}
		if (view_partials || view_deuterium) {
			resultReport = resultReport + crlf[type];
		}
	}
	
	//Print defenders section
	resultReport = resultReport + boldInit[type] + sizeInit[type].replace('#replace',section_size[type]);
	if (defenderCount > 1) {
		resultReport = resultReport + c_multipleDefender;
	}
	else {
		resultReport = resultReport +  c_singleDefender;
	}
	resultReport = resultReport + ' (' + defenderCount +')'+ sizeEnd[type] + boldEnd[type] + crlf[type];
	//Print defender fleets
	for (var i=0; i<defenderName.length; i++) {
		resultReport = resultReport + createPlayerName(defenderName[i], view_coords, defenderNameColor[color_set], nick_size[type], type);
		if (view_tecnology) {
			resultReport = resultReport + createTecnology (defenderTecnology[i], type);
		}
		if (defenderInitialShipsType[i] != no_ships_no_defenses_text) {
			resultReport = resultReport + createFloteView(defenderInitialShipsType[i], defenderInitialShipsNumber[i],defenderFinalShipsNumber[i],fleetDefenderColor[color_set],infoColor[color_set], type);
		} else {
			//Defender has nothing
			resultReport = resultReport + no_ships_no_defenses_text + crlf[type];
		}
		resultReport = resultReport + crlf[type];
		if (view_partials) {
			resultReport = resultReport + estimateLooses(defenderInitialShipsType[i],defenderInitialShipsNumber[i], defenderFinalShipsNumber[i], type, totalDefenderLoosesColor[color_set], partialDefenderLoosesColor[color_set], false);
		}
		if (view_deuterium && i !=0) {
			resultReport = resultReport + deuteriumConsumption(defenderInitialShipsType[i], defenderInitialShipsNumber[i], defenderCoords[i], defenderCoords[0],type, defenderConsumptionColor[color_set]);
		}
		if (view_partials || (view_deuterium && i !=0)) {
			resultReport = resultReport + crlf[type];
		}
	}
	resultReport = resultReport + hr[type];
	resultReport = resultReport + crlf[type];
	resultReport = resultReport + resultAndStolen(type, stolenColor[color_set]);
	resultReport = resultReport + crlf[type];

	//ATACKER
	resultReport = resultReport + sizeInit[type].replace('#replace',rentability_size[type]);
	if (atackerCount > 1) {
		resultReport = resultReport + c_multipleAtacker;
	} 
	else {
		resultReport = resultReport + c_singleAtacker;
	}
	resultReport = resultReport + sizeEnd[type] + crlf[type];
	resultReport = resultReport + boldInit[type] + c_looses + boldEnd[type] + sizeInit[type].replace('#replace',round_size[type]);
	resultReport = resultReport + colorInit[type].replace('#replace', totalAtackerLoosesColor[color_set])  + formatNmb(atackerLoosesAmount) + colorEnd[type];
	resultReport = resultReport + sizeEnd[type] + c_units;
	resultReport = resultReport + crlf[type]; 
	
	//Atackers rentability with recicle
	resultReport = resultReport + boldInit[type] + c_recicleRentability +  ' ' +  sizeInit[type].replace('#replace',rentability_size[type]);
	rentability = formatNmb((parseInt(rubbleMetal)+parseInt(rubbleCristal)+parseInt(stolenMetal)+parseInt(stolenCristal)+parseInt(stolenDeuterium))-atackerLoosesAmount);
	resultReport = resultReport + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]) + rentability + ' (' + atackerRentability  + ') ';
	
	resultReport = resultReport + colorEnd[type] + sizeEnd[type] + boldEnd[type] + c_units + crlf[type];
	if (view_partials) {
			//Metal
			positive = parseInt(stolenMetal)+parseInt(rubbleMetal);
			negative = parseInt(metalAtackersLooses);
			resultReport = resultReport +  itallyInit[type] + c_metalRubble + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(positive-negative)  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Cristal
			positive = parseInt(stolenCristal)+parseInt(rubbleCristal);
			negative = parseInt(cristalAtackersLooses);
			resultReport = resultReport +  itallyInit[type] + c_cristalRubble + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(parseInt(positive) - parseInt(negative))  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
	}
	//Atackers rentability without recicle
	resultReport = resultReport + boldInit[type] + c_notRecicleRentability +  ' ' +  sizeInit[type].replace('#replace',rentability_size[type]);
	rentability = formatNmb((parseInt(stolenMetal)+parseInt(stolenCristal)+parseInt(stolenDeuterium))-atackerLoosesAmount);
	resultReport = resultReport + colorInit[type].replace('#replace', atackerWithOutRecicleColor[color_set]) + rentability + ' (' + atackerRentability2  + ') ';
	resultReport = resultReport + colorEnd[type] + sizeEnd[type] + boldEnd[type] + c_units + crlf[type];
	if (view_partials) {
			//Metal
			positive = parseInt(stolenMetal);
			negative = parseInt(metalAtackersLooses);
			resultReport = resultReport +  itallyInit[type] + c_metalRubble + colorInit[type].replace('#replace', atackerWithOutRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(positive-negative)  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Cristal
			positive = parseInt(stolenCristal);
			negative = parseInt(cristalAtackersLooses);
			resultReport = resultReport +  itallyInit[type] + c_cristalRubble + colorInit[type].replace('#replace', atackerWithOutRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(parseInt(positive) - parseInt(negative))  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Deuterium
			positive = parseInt(stolenDeuterium);
			negative = parseInt(deuteriumAtackersLooses);
			resultReport = resultReport +  itallyInit[type] + c_deuteriumRubble + colorInit[type].replace('#replace', atackerWithOutRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(parseInt(positive) - parseInt(negative))  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
	}
	resultReport = resultReport + crlf[type];
	//DEFEDER
	resultReport = resultReport + sizeInit[type].replace('#replace',rentability_size[type]);
	if (defenderCount > 1) {
		resultReport = resultReport + c_multipleDefender;
	} 
	else {
		resultReport = resultReport + c_singleDefender;
	}
	resultReport = resultReport + sizeEnd[type] + crlf[type];
	resultReport = resultReport + boldInit[type] + c_looses + boldEnd[type] + sizeInit[type].replace('#replace',round_size[type]);
	resultReport = resultReport + colorInit[type].replace('#replace', totalDefenderLoosesColor[color_set])  + formatNmb(defenderLoosesAmount) + colorEnd[type];
	resultReport = resultReport + sizeEnd[type] + c_units;
	resultReport = resultReport + crlf[type]; 

	//Defenders rentability with recicle
	resultReport = resultReport + boldInit[type] + c_recicleRentability +  ' ' +  sizeInit[type].replace('#replace',rentability_size[type]);
	rentability = formatNmb((parseInt(rubbleMetal) + parseInt(rubbleCristal) - stolenMetal - stolenCristal - stolenDeuterium)-parseInt(defenderLoosesAmount));
	resultReport = resultReport + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]) + rentability + ' (' + defenderRentability  + ') ';
	resultReport = resultReport + colorEnd[type] + sizeEnd[type] + boldEnd[type] + c_units + crlf[type];
	if (view_partials) {
			//Metal
			positive = 0;
			negative = 0;
			positive = parseInt(rubbleMetal);
			negative = parseInt(stolenMetal)+parseInt(metalDefendersLooses);
			resultReport = resultReport +  itallyInit[type] + c_metalRubble + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(positive-negative)  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Cristal
			positive = 0;
			negative = 0;
			positive = parseInt(rubbleCristal);
			negative = parseInt(stolenCristal)+parseInt(cristalDefendersLooses);
			resultReport = resultReport +  itallyInit[type] + c_cristalRubble + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(positive - negative)  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Deuterium
			positive = 0;
			negative = 0;
			negative = parseInt(deuteriumDefendersLooses)+parseInt(stolenDeuterium);
			resultReport = resultReport +  itallyInit[type] + c_deuteriumRubble + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(parseInt(positive) - parseInt(negative))  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
	}
	resultReport = resultReport + crlf[type]; 
	
	//Total Looses
	resultReport = resultReport + c_totalLooses + boldInit[type] + sizeInit[type].replace('#replace',rentability_size[type]);
	resultReport = resultReport + formatNmb(atackerLoosesAmount + defenderLoosesAmount);
	resultReport = resultReport + sizeEnd[type] + boldEnd[type] + c_units + crlf[type] 
	resultReport = resultReport + crlf[type];
	
	//Rubles recicles
	if ((parseInt(rubbleCristal)+parseInt(rubbleMetal)) == 0) {
		resultReport = resultReport + boldInit[type] + c_rubbles + boldEnd[type] + crlf[type];
	}
	else {
		resultReport = resultReport + boldInit[type] + c_rubbles + boldEnd[type] + ' (';
		resultReport = resultReport + formatNmb(Math.floor((20000+parseInt(rubbleMetal)+parseInt(rubbleCristal))/20000));
		resultReport = resultReport + ' ' + serverShiptsNames[7] + ')' + crlf[type];
		
	}
	
	//rubbles partials
	resultReport = resultReport + c_metalRubble +  colorInit[type].replace('#replace', infoColor[color_set])  + boldInit[type];
	resultReport = resultReport + formatNmb(rubbleMetal) + boldEnd[type] + colorEnd[type] + c_units + crlf[type];
	resultReport = resultReport + c_cristalRubble + colorInit[type].replace('#replace', infoColor[color_set]) + boldInit[type];
	resultReport = resultReport + formatNmb(rubbleCristal) + boldEnd[type] + colorEnd[type] + c_units + crlf[type];

	//Moon and defenses info :)

	if (moon_probability > 0) {
		resultReport = resultReport + moon_and_defenses_info.replace(moon_probability + ' %', sizeInit[type].replace('#replace',round_size[type]) + boldInit[type] +moon_probability+'%'+boldEnd[type] + sizeEnd[type]).replace(moon_created_tag,boldInit[type] + moon_created_tag + boldEnd[type]).replace(/<br>/g,crlf[type]);
	}
	else {
		resultReport = resultReport + moon_and_defenses_info.replace(/<br>/g,crlf[type]);
	}
	resultReport = resultReport + crlf[type] + crlf[type] + added_link[type];
	for (i = 0; i < userShiptsNames.length; i ++) {
		reg = new RegExp(serverShiptsNames[i], "g")
		resultReport = resultReport.replace(reg,userShiptsNames[i]);
		reg = null;
	}
	for (i = 0; i < userDefensesNames.length; i ++) {
		reg = new RegExp(serverDefensesNames[i], "g")
		resultReport = resultReport.replace(reg,userDefensesNames[i]);
		reg = null;
	}
	//Reset the looses :)
	cristalAtackersLooses = 0;
	metalAtackersLooses = 0;
	deuteriumAtackersLooses = 0;
	metalDefendersLooses = 0;
	cristalDefendersLooses = 0;
	deuteriumDefendersLooses = 0;
	return resultReport;
}

function set_tecnology() {
	GM_setValue("tecnology", document.getElementById("tecnology").checked());
}

/////////////////////////////////////////////////////////////////
// Call parser functions useful to take decisions about report //
// like color, tecnology, and coords			       //
/////////////////////////////////////////////////////////////////


function get_parts_from_web () {
	original_body = document.body.innerHTML;
	date = get_battle_date();
	get_names_and_flotes();
	get_final_flotes ();
	get_rounds();
	get_battle_info_result();
	get_rentabilitys ();
	create_view();
}
function create_view() {
	//Call functions to parse the battle report
	report = "";
	var report_text = "";
	var report_div = document.createElement("div");
	report_div.style.marginLeft = '15px';
	report_div.style.marginTop = '15px';
	var config_div = document.createElement("div");
	var report_input = document.createElement("textarea");
	report_input.id = "forum_compactation";
	report_input.name = "forum_text";
	if (atackerName.length > 0) {
		if (GM_getValue('hide_report')) {
			document.body.innerHTML = '';
		}
		else {
			document.body.innerHTML = original_body;
		}
		try {
			if(GM_getValue('old_favour')) {
				if (GM_getValue('light_forum')) {
					report = do_old_report(GM_getValue('forum_type'),0,GM_getValue('tecnology'),GM_getValue('coords'), GM_getValue('partials') , GM_getValue('deuterium'));
				}
				else {
					report = do_old_report(GM_getValue('forum_type'),1,GM_getValue('tecnology'),GM_getValue('coords'), GM_getValue('partials') , GM_getValue('deuterium'));
				}
			}	
			else {
				if (GM_getValue('light_forum')) {
					report = do_report(GM_getValue('forum_type'),0,GM_getValue('tecnology'),GM_getValue('coords'), GM_getValue('partials') , GM_getValue('deuterium'));
				}
				else {
					report = do_report(GM_getValue('forum_type'),1,GM_getValue('tecnology'),GM_getValue('coords'), GM_getValue('partials'), GM_getValue('deuterium'));
				}
			}
		}
		catch (error) {
			
			report = do_report(1,1,false,false,false, false);
		}
		report_input.color = 'white';
		report_input.innerHTML =report;
		document.body.insertBefore(report_input,  document.body.firstChild);
		// first type, second color
		try {
			if(GM_getValue('old_favour')) {
				if (GM_getValue('light_skin')) {
					report = do_old_report(0,0,true,true, GM_getValue('partials'), GM_getValue('deuterium'));
				}
				else {
					report = do_old_report(0,1,true,true, GM_getValue('partials'), GM_getValue('deuterium'));
				}
			}	
			else {
				if (GM_getValue('light_skin')) {
					report = do_report(0,0,true,true, GM_getValue('partials'), GM_getValue('deuterium'));
				}
				else {
					report = do_report(0,1,true,true, GM_getValue('partials'), GM_getValue('deuterium'));
				}
			}
		}
		catch (error) {
			report = do_report(0,1,true,true, true, true);
		}
		
		report_div.color = 'white';
		report_div.innerHTML = report;
		document.body.insertBefore(report_div,  document.body.firstChild);

		//Show old_flavor check
		var old_favour = document.createElement("input");
		old_favour.type="checkbox";
		try {
			old_favour.checked = GM_getValue('old_favour');
		}
		catch (err) {
			old_favour.checked = false;
		}
		old_favour.addEventListener('click',function(ev) {
			GM_setValue('old_favour',this.checked);
			create_view();
		},true);
		var old_favour_span = document.createElement("span");
		old_favour_span.innerHTML = c_old_favour;
		config_div.appendChild(old_favour);
		config_div.appendChild(old_favour_span);

		//Show partials check
		var view_partials = document.createElement("input");
		view_partials.type="checkbox";
		try {
			view_partials.checked = GM_getValue('partials');
		}
		catch (err) {
			view_partials.checked = true;
		}
		view_partials.addEventListener('click',function(ev) {
			GM_setValue('partials',this.checked);
			create_view();
		},true);
		var partials_span = document.createElement("span");
		partials_span.innerHTML = 'ver parciales<br>';
		config_div.appendChild(view_partials);
		config_div.appendChild(partials_span);

		//Show deuterium check
		var view_deuterium = document.createElement("input");
		view_deuterium.type="checkbox";
		try {
			view_deuterium.checked = GM_getValue('deuterium');
		}
		catch (err) {
			view_deuterium.checked = true;
		}
		view_deuterium.addEventListener('click',function(ev) {
			GM_setValue('deuterium',this.checked);
			create_view();
		},true);
		var deuterium_span = document.createElement("span");
		deuterium_span.innerHTML = c_showDeuterium;
		config_div.appendChild(view_deuterium);
		config_div.appendChild(deuterium_span);


		//Show tech check
		var view_tecnology = document.createElement("input");
		view_tecnology.type="checkbox";
		try {
			view_tecnology.checked = GM_getValue('tecnology');
		}
		catch (err) {
			view_tecnology.checked = true;
		}
		view_tecnology.addEventListener('click',function(ev) {
			GM_setValue('tecnology',this.checked);
			create_view();
		},true);
		var tecnology_span = document.createElement("span");
		tecnology_span.innerHTML = c_showTech;
		config_div.appendChild(view_tecnology);
		config_div.appendChild(tecnology_span);


		var view_coords = document.createElement("input");
		view_coords.type="checkbox";
		try {
			view_coords.checked = GM_getValue('coords');
		}
		catch (err) {
			view_coords.checked = true;
		}
		view_coords.addEventListener('click',function(ev) {
			GM_setValue('coords',this.checked);
			create_view();
		},true);
		var coords_span = document.createElement("span");
		coords_span.innerHTML = c_showCoords;
		config_div.appendChild(view_coords);
		config_div.appendChild(coords_span);
		report_input.parentNode.insertBefore(config_div,report_input.nextSibling);
		var light_forum = document.createElement("input");
		light_forum.type="checkbox";
		try {
			light_forum.checked = GM_getValue('light_forum');
		}
		catch (err) {
			light_forum.checked = true;
		}
		light_forum.addEventListener('click',function(ev) {
			GM_setValue('light_forum',this.checked);
			create_view();
		},true);
		var forum_span = document.createElement("span");
		forum_span.innerHTML = c_forumSkin;
		config_div.appendChild(light_forum);
		config_div.appendChild(forum_span);
		var light_skin = document.createElement("input");
		light_skin.type="checkbox";
		try {
			light_skin.checked = GM_getValue('light_skin');
		}
		catch (err) {
			light_skin.checked = true;
		}
		light_skin.addEventListener('click',function(ev) {
			GM_setValue('light_skin',this.checked);
			create_view();
		},true);
		var skin_span = document.createElement("span");
		skin_span.innerHTML = c_ogameSkin;
		config_div.appendChild(light_skin);
		config_div.appendChild(skin_span);
		var forum_type0 = document.createElement("input");
		forum_type0.type="radio";
		forum_type0.name="forum_type";
		try {
			if (GM_getValue('forum_type') == 0)
				forum_type0.checked = true;
		}
		catch (err) {
			forum_type0.checked = true;
		}
		forum_type0.addEventListener('click',function(ev) {
			GM_setValue('forum_type',0);
			create_view();
		},true);
		var forum_type0_span = document.createElement("span");
		forum_type0_span.innerHTML = c_forumType0;
		config_div.appendChild(forum_type0);
		config_div.appendChild(forum_type0_span);
		var forum_type1 = document.createElement("input");
		forum_type1.type="radio";
		forum_type1.name="forum_type";
		try {
			if (GM_getValue('forum_type') == 1)
				forum_type1.checked = true;
		}
		catch (err) {
			forum_type1.checked = true;
		}
		forum_type1.addEventListener('click',function(ev) {
			GM_setValue('forum_type',1);
			create_view();
		},true);
		var forum_type1_span = document.createElement("span");
		forum_type1_span.innerHTML = c_forumType1;
		config_div.appendChild(forum_type1);
		config_div.appendChild(forum_type1_span);
		var forum_type3 = document.createElement("input");
		forum_type3.type="radio";
		forum_type3.name="forum_type";
		try {
			if (GM_getValue('forum_type') == 3)
				forum_type3.checked = true;
		}
		catch (err) {
			forum_type3.checked = true;
		}
		forum_type3.addEventListener('click',function(ev) {
			GM_setValue('forum_type',3);
			create_view();
		},true);
		var forum_type3_span = document.createElement("span");
		forum_type3_span.innerHTML = c_forumType3;
		config_div.appendChild(forum_type3);
		config_div.appendChild(forum_type3_span);
		var forum_type2 = document.createElement("input");
		forum_type2.type="radio";
		forum_type2.name="forum_type";
		try {
			if (GM_getValue('forum_type') == 2)
				forum_type2.checked = true;
		}
		catch (err) {
			forum_type2.checked = true;
		}
		forum_type2.addEventListener('click',function(ev) {
			GM_setValue('forum_type',2);
			create_view();
		},true);
		var forum_type2_span = document.createElement("span");
		forum_type2_span.innerHTML = c_forumType2;
		config_div.appendChild(forum_type2);
		config_div.appendChild(forum_type2_span);
		var hide_report = document.createElement("input");
		hide_report.type="checkbox";
		hide_report.name="hide_report";
		try {
			hide_report.checked = GM_getValue('hide_report');
		}
		catch (err) {
			hide_report.checked = true;
		}
		hide_report.addEventListener('click',function(ev) {
			GM_setValue('hide_report',this.checked);
			create_view();
		},true);
		var hide_report_span = document.createElement("span");
		hide_report_span.innerHTML = c_showReport;
		config_div.appendChild(hide_report);
		config_div.appendChild(hide_report_span);
		report_input.parentNode.insertBefore(config_div,report_input.nextSibling);
	}
}


////////////////
// BEGIN HERE //
////////////////

get_parts_from_web ();
document.getElementById("forum_compactation").select();




