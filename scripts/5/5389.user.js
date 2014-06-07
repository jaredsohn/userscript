// ==UserScript==
// @name OGame - Compattatore automatico CR
// @namespace a.galli85@gmail.com
// @author alessandro galli
// @description  Compattatore di Combat Report
// @include     http://*/bericht.php*
// ==/UserScript==

//Constant pattern values for search in document, usefull for translate this script

	var atackertag 		 = "Attaccante";
	var defendertag		 = "Difensore";
	var typetag 		 = "Tipo";
	var amountag 		 = "Quantità";
	var damagetag		 = "Armi:";
	var resulttag   	 = "battaglia";
	var drawtag  		 = "pareggio";
	var loosestag   	 = "perso";
	var rubbletag   	 = "Flotta rimanente";
	var metalrubbletag    	 = "Metallo ";
	var cristalrubbletag	 = "Cristallo";
	var stolentag		 = "cattura<br>";
	var metaltag		 = "Metallo,";
	var cristaltag		 = "Cristallo ";
	var deuteriumtag	 = "Deuterio<br>";
	var atackerloosestag 	 = "L'attaccante ha perso un totale di";
	var defenderloosestag 	 = "Il difensore ha perso un totale di";
	var atacker_result_tag 	 = "attaccante";
	var defender_result_tag = "difensore";
	var unitstag 		 = "unità.";
	var destroytag		 = "Distrutto";
	var br			 = "<br>";
	var endtecnologytag	 = '<table border="1">';
	var endtecnology2tag 	 = '<br>Destruido';
	var no_ships_no_defenses_text = "Nessuna nave de difese";
	var roundtag		 = 'La flotta attaccate spara';
	var moon_tag		 = 'La possibilità che si formi una luna dai detriti è del';
	var moon_created_tag	 = 'Le enormi quantità di metallo e cristallo disperse nello spazio si attraggono fino a fomrare un satellite nell'orbita del pianeta. '
	var max_rentability	 = 'Massima'
	var repaired_tag	 = 'vengono riparati.';

//Report values conatiners
	//Atackers & Defenders info
	var atackerName 	 = new Array();
	var atackerTecnology     = new Array();
	var defenderName 	 = new Array();
	var defenderTecnology     = new Array();
	var atackerCount	 = 0;
	var defenderCount	 = 0;
	var rounds		 = 1;

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
	var defenderRentability  = "";
	var moon_and_defenses_info	 = "";

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

//Colors for forums, we must get and set the options from the Grease monkey
	var atackerColor 	= new Array ('red','lime');
	var defenderColor 	= new Array ('blue','coral');
	var loosesColor		= new Array('purple','cyan');
	var profitColor 	= new Array('green','yellow');
	var textColor 		= new Array('black','white');
	var compactLoosesColor  = new Array('purple', 'coral');


//Tags for html, forums and plain text :)
	var boldInit 		= new Array('<b>','[b]','','[b]');
	var boldEnd		= new Array('</b>','[/b]','','[/b]');
	var crlf		= new Array('<br>','\n','\n','\n');	
	var sizeInit		= new Array('<font size="#replace">','[size=#replace]','','[size=#replace]');
	var sizeEnd		= new Array('</font>', '[/size]','', '[/size]');
	var colorInit		= new Array('<font color="#replace">','[color=#replace]','','[color=#replace]');
	var colorEnd		= new Array('</font>','[/color]','','[/color]');
	var round_size		= new Array('3px','18','','14pt');	
	var nick_size		= new Array('4px','19','','15pt');
	var resource_size	= new Array('4px','21','','17pt');
	var rentability_size	= new Array('4px','17','','13pt');
//you can delete text or change for added to yor post ;)
	var added_link		= new Array('','[color=orange][size=12]Compactado con el [url=http://userscripts.org/scripts/show/3482]Compactador automático de batallas[/url][/size][/color]','','[color=orange][size=13pt]Compactado con el [url=http://userscripts.org/scripts/show/3482]Compactador automático de batallas[/url][/size][/color]');

//Options of report:)
//0 fondo claro 1 fondo oscuro
var color_skin = 1;
var color_forum = 0;

//////////////////////////////////////////////////////////
// Get the text between the begin text and the end text //
//////////////////////////////////////////////////////////


function get_from_to(strLine, begin, end) {

	return strLine.substring(strLine.indexOf(begin) + begin.length , strLine.indexOf(end));
}

function get_battle_date () {
	//define tags for get the battle date and hour.
	var type1 = "Las siguientes flotas se enfrentaron el";
	var type2 = "frente en"
	var battle_end	 = ", y la batalla ha comenzado::";
	var date 	 = "";
	//extract date from string and return
	var header = document.getElementsByTagName('td');
	var strLine = header[0].innerHTML;
	if (strLine.search(type1) != -1) {
		date = get_from_to(strLine,type1,battle_end);
	}
	else {
		date = get_from_to(strLine,type2,battle_end);
	}
	return date;
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
		if ( strLine.search(atackertag) != -1 && strLine.search(br) != -1 && strLine.search(destroytag) == -1) {
			//Get only the atacker first aparition
			atackerName[atackerCount] = get_from_to(strLine,atackertag,br);
			atackerInitialShipsType[atackerCount]=get_flote_type_from_string(strLine);
			atackerInitialShipsNumber[atackerCount]=get_flote_number_from_string(strLine);
			atackerTecnology[atackerCount] = get_from_to(strLine,br,endtecnologytag);
			atackerCount++; 
		}
		else if (strLine.search(defendertag) != -1 && strLine.search(br) != -1 && strLine.search(destroytag) == -1) {
			//Get only the defender first aparition
			defenderName[defenderCount] = get_from_to(strLine,defendertag,br);
			defenderInitialShipsType[defenderCount]=get_flote_type_from_string (strLine);
			defenderInitialShipsNumber[defenderCount]=get_flote_number_from_string (strLine);
			defenderTecnology[defenderCount] = get_from_to(strLine,br,endtecnologytag);
			defenderCount++; 
		}
		else if (strLine.search(defendertag) != -1 && strLine.search(br) != -1 && strLine.search(destroytag) != -1 && defenderCount == 0) {
			//Get the defender when s/he didn't have float and defenses
			defenderName[defenderCount] = get_from_to(strLine,defendertag,br);
			defenderInitialShipsType[defenderCount] = no_ships_no_defenses_text;
			defenderInitialShipsNumber[defenderCount] = '';
			defenderTecnology[defenderCount]=get_from_to(strLine,br,endtecnology2tag);
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
		floteNumberArray[i-array_controller] = storeArray[i].replace('</th>','').replace('</tr><tr>','');
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
		}
		if ((strLine.search(resulttag) != -1) && (strLine.search(atacker_result_tag))) {
			//Search for stolenResources when atacker win
			stolenMetal = get_from_to(strLine,stolentag,metaltag);
			stolenCristal = get_from_to(strLine,metaltag,cristaltag);
			stolenDeuterium = get_from_to(strLine,cristaltag,deuteriumtag);
		}
		if (strLine.search(rubbletag) != -1)  {
			//Search for rubble
			rubbleMetal = get_from_to(strLine,rubbletag,metalrubbletag);
			rubbleCristal=get_from_to(strLine,metalrubbletag,cristalrubbletag);
		}
		if (strLine.search(moon_tag) != -1) {
			moon_probability = parseInt(get_from_to(strLine,moon_tag,'%'));
			strLine = strLine+ '<br>';
			moon_and_defenses_info = strLine.substring(strLine.indexOf(cristalrubbletag) + (cristalrubbletag.length +1),strLine.lastIndexOf(br)).replace('<b>','').replace('</b>','');
			GM_log(moon_and_defenses_info + ' '  + strLine);
		}
		if (strLine.search(moon_created_tag) != -1) {
			moon_info = moon_created_tag;
		}
		//Get atacker looses value
		atackerLoosesAmount =  parseInt(get_from_to(strLine,atackerloosestag,unitstag));
		//Get defender looses value
		defenderLoosesAmount = parseInt(strLine.substring(strLine.indexOf(defenderloosestag) + (defenderloosestag.length +1),strLine.lastIndexOf(unitstag)-1));
					
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
	}
	else {
		if (isNaN(stolenAmount))
		{
			//This must fix the bug when nothing is stolen
			stolenAmount = 0;
		}
		atackerRentability = ((((rubbleAmount + stolenAmount)- atackerLoosesAmount) / atackerLoosesAmount)*100);
		atackerRentability = Math.round(parseInt(atackerRentability)) + '%';		
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
// print the report in the screen //
////////////////////////////////////

function do_report (type_preference,color_set, view_tecnology, view_coords) {
	var resultReport = "";
	//Header of report
	resultReport = boldInit[type_preference] + 'Batalla del día :'+date+crlf[type_preference] + boldEnd[type_preference];
	resultReport = resultReport+'La batalla duró ' + sizeInit[type_preference].replace('#replace',round_size[type_preference]) + boldInit[type_preference] + rounds + boldEnd[type_preference] + sizeEnd[type_preference] + ' rondas' + crlf[type_preference];
	resultReport = resultReport + crlf[type_preference];

	//Atackers section
	if (atackerCount > 1) {
		resultReport = resultReport + boldInit[type_preference] + 'ATACANTES ('+atackerCount+')'+ boldEnd[type_preference] + crlf[type_preference];
	}
	else {
		resultReport = resultReport + boldInit[type_preference] + 'ATACANTE (1)' + boldEnd[type_preference] + crlf[type_preference];
	}
	
	//Atacker flotes
	for (var i=0; i<atackerName.length; i++) {
		if (view_coords) {
			resultReport = resultReport  + colorInit[type_preference].replace('#replace', atackerColor[color_set]) + sizeInit[type_preference].replace('#replace',nick_size[type_preference]) + atackerName[i].replace('(',sizeEnd[type_preference] + '[').replace(')', ']') + colorEnd[type_preference] + crlf[type_preference];
		}
		else {
			resultReport = resultReport + colorInit[type_preference].replace('#replace', atackerColor[color_set]) + sizeInit[type_preference].replace('#replace',nick_size[type_preference]) + atackerName[i].split('(')[0] + sizeEnd[type_preference] + ' [XX:XXX:XX]' + colorEnd[type_preference] + crlf[type_preference];
		}
		if (view_tecnology) {
			resultReport = resultReport + boldInit[type_preference] + atackerTecnology[i] + boldEnd[type_preference] + crlf[type_preference];
		}
		else {
			resultReport = resultReport + boldInit[type_preference] + 'Armas: XXX% Escudos: XXX% Blindaje: XXX%' + boldEnd[type_preference] + crlf[type_preference];
		}
		for (var j=0; j<atackerInitialShipsType[i].length; j++) {
			resultReport = resultReport + atackerInitialShipsType[i][j] + ' ' +  colorInit[type_preference].replace('#replace', atackerColor[color_set]) + formatNmb(atackerInitialShipsNumber[i][j]) + colorEnd[type_preference] + colorInit[type_preference].replace('#replace', loosesColor[color_set]) + ' perdió '+ formatNmb((atackerInitialShipsNumber[i][j]-atackerFinalShipsNumber[i][j])) + colorEnd[type_preference] + crlf[type_preference];
		}
		resultReport = resultReport+crlf[type_preference];
	}

	//Defenders section
	if (defenderCount > 1) {
		resultReport = resultReport + boldInit[type_preference] + 'DEFENSORES (' + defenderCount + ')' + boldEnd[type_preference] + crlf[type_preference];
	}
	else {
		resultReport = resultReport + boldInit[type_preference] + 'DEFENSOR (1)' + boldEnd[type_preference] + crlf[type_preference];
	}
	
	//Defenders flote
	for (var i=0; i<defenderName.length; i++) {
		if (view_coords) {
		resultReport = resultReport + colorInit[type_preference].replace('#replace', defenderColor[color_set]) + sizeInit[type_preference].replace('#replace',nick_size[type_preference]) + defenderName[i].replace('(',sizeEnd[type_preference] + '[').replace(')',']') + colorEnd[type_preference] + crlf[type_preference];
		}
		else {
			resultReport = resultReport + colorInit[type_preference].replace('#replace', defenderColor[color_set]) + sizeInit[type_preference].replace('#replace',nick_size[type_preference]) + defenderName[i].split('(')[0] + sizeEnd[type_preference] + ' [XX:XXX:XX]' + colorEnd[type_preference] + crlf[type_preference];

		}
		if (view_tecnology) {
			resultReport = resultReport + boldInit[type_preference] + defenderTecnology[i]+ boldEnd[type_preference] + crlf[type_preference];
		}
		else {
			resultReport = resultReport + boldInit[type_preference] + 'Armas: XXX% Escudos: XXX% Blindaje: XXX%' + boldEnd[type_preference] + crlf[type_preference];
		}
		if (defenderInitialShipsType[i] != no_ships_no_defenses_text) { 
			for (var j=0; j<defenderInitialShipsType[i].length; j++) {
			resultReport = resultReport + defenderInitialShipsType[i][j] + ' ' +  colorInit[type_preference].replace('#replace', defenderColor[color_set])  + formatNmb(defenderInitialShipsNumber[i][j]) + colorEnd[type_preference] + colorInit[type_preference].replace('#replace', loosesColor[color_set]) + ' perdió ' + formatNmb((defenderInitialShipsNumber[i][j]-defenderFinalShipsNumber[i][j])) + colorEnd[type_preference] + crlf[type_preference];
			}
		}
		else {
			resultReport = resultReport+defenderInitialShipsType[i]+crlf[type_preference];
		}
		resultReport = resultReport + crlf[type_preference];
	}
	
	resultReport = resultReport + boldInit[type_preference] + result_info + boldEnd[type_preference] + crlf[type_preference];
	if (!isNaN(stolenMetal) || !isNaN(stolenCristal) || !isNaN(stolenDeuterium)) {
		resultReport = resultReport+'Captura: ' + colorInit[type_preference].replace('#replace', compactLoosesColor[color_set]) + boldInit[type_preference] + formatNmb(stolenMetal) + boldEnd[type_preference] + colorEnd[type_preference] + ' Metal, ' + colorInit[type_preference].replace('#replace', compactLoosesColor[color_set]) + boldInit[type_preference] + formatNmb(stolenCristal) + boldEnd[type_preference] + colorEnd[type_preference] + ' Cristal y ' + colorInit[type_preference].replace('#replace', compactLoosesColor[color_set]) + boldInit[type_preference] + formatNmb(stolenDeuterium) + boldEnd[type_preference] + colorEnd[type_preference] + ' Deuterio'+crlf[type_preference];
	}
	resultReport = resultReport + 'Pérdidas del Atacante: ' + sizeInit[type_preference].replace('#replace',resource_size[type_preference]) + colorInit[type_preference].replace('#replace', atackerColor[color_set])  + formatNmb(atackerLoosesAmount) + colorEnd[type_preference] + sizeEnd[type_preference] + ' unidades' + crlf[type_preference];
	resultReport = resultReport + 'Pérdidas del Defensor: ' + sizeInit[type_preference].replace('#replace',resource_size[type_preference]) + colorInit[type_preference].replace('#replace', defenderColor[color_set]) + formatNmb(defenderLoosesAmount) + colorEnd[type_preference] + sizeEnd[type_preference] + ' unidades'+crlf[type_preference];
	resultReport = resultReport + 'Pérdidas TOTALES: ' + boldInit[type_preference] +  formatNmb(atackerLoosesAmount + defenderLoosesAmount) + boldEnd[type_preference] + ' unidades'+ crlf[type_preference];
	if ((parseInt(rubbleCristal)+parseInt(rubbleMetal)) == 0) {

		resultReport = resultReport + boldInit[type_preference] + 'Escombros' + boldEnd[type_preference] + crlf[type_preference];
	}
	else {
		resultReport = resultReport + boldInit[type_preference] + 'Escombros' + boldEnd[type_preference] + ' (' + formatNmb(Math.floor((20000+parseInt(rubbleMetal)+parseInt(rubbleCristal))/20000)) + ' recicladores)' + crlf[type_preference];
	}
	
	resultReport = resultReport + 'Metal: ' +  colorInit[type_preference].replace('#replace', compactLoosesColor[color_set])  + formatNmb(rubbleMetal) + colorEnd[type_preference] + ' unidades.' +crlf[type_preference];
	resultReport = resultReport + 'Cristal: ' + colorInit[type_preference].replace('#replace', compactLoosesColor[color_set]) + formatNmb(rubbleCristal) + colorEnd[type_preference] + ' unidades.' +crlf[type_preference];
	resultReport = resultReport +crlf[type_preference];
	resultReport = resultReport + boldInit[type_preference] + 'GANANCIAS Y PÉRDIDAS' + boldEnd[type_preference] + crlf[type_preference];
	resultReport = resultReport + 'Rentabilidad Atacante: ' + sizeInit[type_preference].replace('#replace',rentability_size[type_preference]) + colorInit[type_preference].replace('#replace', profitColor[color_set]) + atackerRentability + colorEnd[type_preference] + sizeEnd[type_preference] + crlf[type_preference];
	resultReport = resultReport + 'Atacante ' + colorInit[type_preference].replace('#replace', profitColor[color_set]) + ' Con' + colorEnd[type_preference] + '/' + colorInit[type_preference].replace('#replace', atackerColor[color_set]) + 'Sin' + colorEnd[type_preference] + ' Reciclaje: '  + sizeInit[type_preference].replace('#replace',rentability_size[type_preference]) + colorInit[type_preference].replace('#replace', profitColor[color_set]) + formatNmb((parseInt(rubbleMetal) + parseInt(rubbleCristal) + parseInt(stolenMetal) + parseInt(stolenCristal) + parseInt(stolenDeuterium))-parseInt(atackerLoosesAmount)) + colorEnd[type_preference] + '/' + colorInit[type_preference].replace('#replace', atackerColor[color_set]) + formatNmb((parseInt(stolenMetal) + parseInt(stolenCristal) + parseInt(stolenDeuterium))-parseInt(atackerLoosesAmount)) + colorEnd[type_preference] + sizeEnd[type_preference] + ' Unidades' +crlf[type_preference];
	resultReport = resultReport + 'Defensor Si Recicla: ' + sizeInit[type_preference].replace('#replace',rentability_size[type_preference]) + colorInit[type_preference].replace('#replace', compactLoosesColor[color_set]) + formatNmb(((parseInt(rubbleMetal) + parseInt(rubbleCristal))-(parseInt(stolenMetal) + parseInt(stolenCristal) + parseInt(stolenDeuterium) + parseInt(defenderLoosesAmount)))) + colorEnd[type_preference] + sizeEnd[type_preference] + ' Unidades' +crlf[type_preference];
	if (moon_probability > 0) {
		resultReport = resultReport + crlf[type_preference];
		resultReport = resultReport + moon_and_defenses_info.replace(moon_probability + ' %', sizeInit[type_preference].replace('#replace',round_size[type_preference]) + boldInit[type_preference] +moon_probability+' %'+boldEnd[type_preference] + sizeEnd[type_preference]).replace(moon_created_tag,boldInit[type_preference] + moon_created_tag + boldEnd[type_preference]).replace(/<br>/g,crlf[type_preference]);
	}
	resultReport = resultReport + crlf[type_preference] + crlf[type_preference] + added_link[type_preference];
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
	//Call functions to parse the battle report
	var report_text = "";
	var report_div = document.createElement("div");
	report_div.style.marginLeft = '15px';
	report_div.style.marginTop = '15px';
	var config_div = document.createElement("div");
	var report_input = document.createElement("textarea");
	report_input.id = "forum_compactation";
	report_input.name = "forum_text";
	date = get_battle_date();
	get_names_and_flotes();
	get_final_flotes ();
	get_rounds();
	get_battle_info_result();
	get_rentabilitys ();
	if (atackerName.length > 0) {
		if (GM_getValue('hide_report')) {
			document.body.innerHTML = '';
		}
		try {
			if (GM_getValue('light_forum')) {
				report = do_report(GM_getValue('forum_type'),0,GM_getValue('tecnology'),GM_getValue('coords'));
			}
			else {
				report = do_report(GM_getValue('forum_type'),1,GM_getValue('tecnology'),GM_getValue('coords'));
			}
		}
		catch (error) {
			report = do_report(1,1,false,false);
		}
		report_input.color = 'white';
		report_input.innerHTML =report;
		document.body.insertBefore(report_input,  document.body.firstChild);
		// first type, second color
		if (GM_getValue('light_skin')) {
			report = do_report(0,0,true,true);
		}
		else {
			report = do_report(0,1,true,true);
		}
		report_div.color = 'white';
		report_div.innerHTML = report;
		document.body.insertBefore(report_div,  document.body.firstChild);	
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
			location.href=document.location;
		},true);
		var tecnology_span = document.createElement("span");
		tecnology_span.innerHTML = " Mostrar las tecnologías &nbsp;&nbsp;&nbsp;";
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
			location.href=document.location;
		},true);
		var coords_span = document.createElement("span");
		coords_span.innerHTML = " Mostrar las coordenadas<br>";
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
			location.href=document.location;
		},true);
		var forum_span = document.createElement("span");
		forum_span.innerHTML = " Fondo de foro claro &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
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
			location.href=document.location;
		},true);
		var skin_span = document.createElement("span");
		skin_span.innerHTML = " Fondo de skin claro<br>";
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
			location.href=document.location;
		},true);
		var forum_type0_span = document.createElement("span");
		forum_type0_span.innerHTML = " Compactar en html ";
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
			location.href=document.location;
		},true);
		var forum_type1_span = document.createElement("span");
		forum_type1_span.innerHTML = " Compactar para foro phpBB ";
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
			location.href=document.location;
		},true);
		var forum_type3_span = document.createElement("span");
		forum_type3_span.innerHTML = " Compactar para foro smf";
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
			location.href=document.location;
		},true);
		var forum_type2_span = document.createElement("span");
		forum_type2_span.innerHTML = " Compactar en texto plano <br>";
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
			location.href=document.location;
		},true);
		var hide_report_span = document.createElement("span");
		hide_report_span.innerHTML = " Ocultar el informe orginal de batalla <br>";
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




