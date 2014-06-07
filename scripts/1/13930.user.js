// ==UserScript==
// @name           OGame Pantalla de Recursos
// @namespace      http://www.midgar.com.ar/grease/ogame/
// @description    Pantalla de Recursos mejorada
// @include        http://game*.de/game/resources.php?session=*
// @include        http://ogame*.de/game/resources.php?session=*
// @include        http://uni*.ogame.com.es/game/resources.php?session=*
// @include        http://*/game/
// ==/UserScript==
   function formatNmb(numero)
   {
	  var nNmb = String(numero); 
    var sRes = "";
    for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++)
     sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;
    return sRes;
   }
   
if (document.location.href.indexOf('/game/resources.php') == -1) return;
GM_log('Init: '+document.location.href);

var T_Recursos = document.getElementsByTagName("td");
var Metal = T_Recursos[18].innerHTML.replace(/\./g,'');
var Cristal = T_Recursos[19].innerHTML.replace(/\./g,'');
var Deut = T_Recursos[20].innerHTML.replace(/\./g,'');

var PMetal = T_Recursos[40].innerHTML.replace(/\./g,'');
var PCristal = T_Recursos[41].innerHTML.replace(/\./g,'');
var PDeut = T_Recursos[42].innerHTML.replace(/\./g,'');

var AlmM = T_Recursos[35].innerHTML.replace(/\./g,'');
var AlmC = T_Recursos[36].innerHTML.replace(/\./g,'');
var AlmD = T_Recursos[37].innerHTML.replace(/\./g,'');
AlmM = AlmM.replace(/k/,'000');
AlmC = AlmC.replace(/k/,'000');
AlmD = AlmD.replace(/k/,'000');

if (Metal.indexOf('<font color')!=-1) {
	Metal = Metal.substring(22, Metal.indexOf('</font'));
}
if (Cristal.indexOf('<font color')!=-1) {
	Cristal = Cristal.substring(22, Cristal.indexOf('</font'));
}
if (Deut.indexOf('<font color')!=-1) {
	Deut = Deut.substring(22, Deut.indexOf('</font'));
}

if (PMetal.indexOf('<font color')!=-1) {
	PMetal = PMetal.substring(22, PMetal.indexOf('</font'));
}
if (PCristal.indexOf('<font color')!=-1) {
	PCristal = PCristal.substring(22, PCristal.indexOf('</font'));
}
if (PDeut.indexOf('<font color')!=-1) {
	PDeut = PDeut.substring(22, PDeut.indexOf('</font'));
}

if (AlmM.indexOf('<font color')!=-1) {
	AlmM = AlmM.substring(22, AlmM.indexOf('</font'));
}
if (AlmC.indexOf('<font color')!=-1) {
	AlmC = AlmC.substring(22, AlmC.indexOf('</font'));
}
if (AlmD.indexOf('<font color')!=-1) {
	AlmD = AlmD.substring(22, AlmD.indexOf('</font'));
}

var XMetal = new Array(3);
var XCristal = new Array(3);
var XDeut = new Array(3);

XMetal[0] = PMetal * 24;
XCristal[0] = PCristal * 24;
XDeut[0] = PDeut * 24;
XMetal[1] = PMetal * 168;
XCristal[1] = PCristal * 168;
XDeut[1] = PDeut * 168;
XMetal[2] = PMetal * 720;
XCristal[2] = PCristal * 720;
XDeut[2] = PDeut * 720;

// Buscar Formulario de Recursos

var ResFormC, T_Form, ResForm;
ResFormC = document.getElementsByTagName('table');

for (var i = 0; i < ResFormC.length; i++) {
	
	T_Form = ResFormC[i];
	if (T_Form.getAttribute('width') == '550') {
		ResForm = T_Form;
	}
}

// Buscar Factor de Produccion
var T_Factor = /factor(.)*\:(.)*[0-9.]/gi.exec(document.body.innerHTML);

var Factor, FactorPorc;
if (T_Factor.length) {
	Factor=T_Factor[0].split(":");
	Factor=parseFloat(Factor[1]) * 100;
	FactorPorc=parseInt(parseFloat(Factor) * 2.5);
}

// Agregar tabla de factor de produccion
if (ResForm) {
	// Buscar Produccion Real

	

	// Procesar Tablas
	var ProdFact = document.createElement('div');

	ProdFact.innerHTML = '<table width="550"><tr>'+
'<th>Nivel de Producci&oacute;n</th>'+
'<th>'+Factor+'%</th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div style="background-color: '+(Factor < 100 ? '#C00000' : '#00C000' )+'; width: '+FactorPorc+'px;">&nbsp;</div></div></th>'+
'</tr></table><br />';
	
	var CuentaRec = document.createElement('div');

	CuentaRec.innerHTML = '<br /><table width="550">'+
'<tr><td class="c" colspan="4">Producci&oacute;n extendida</td></tr>'+
'<tr>'+
'<td class="c">&nbsp;</td>'+
'<th>Diaria</th>'+
'<th>Semanal</th>'+
'<th>Mensual</th>'+
'</tr>'+
'<tr>'+
'<td class="c">Metal</td>'+
'<th><font color="#00ff00">'+formatNmb(XMetal[0])+'</font></th>'+
'<th><font color="#00ff00">'+formatNmb(XMetal[1])+'</font></th>'+
'<th><font color="#00ff00">'+formatNmb(XMetal[2])+'</font></th>'+
'</tr>'+
'<tr>'+
'<td class="c">Cristal</td>'+
'<th><font color="#00ff00">'+formatNmb(XCristal[0])+'</font></th>'+
'<th><font color="#00ff00">'+formatNmb(XCristal[1])+'</font></th>'+
'<th><font color="#00ff00">'+formatNmb(XCristal[2])+'</font></th>'+
'</tr>'+
'<tr>'+
'<td class="c">Deuterio</td>'+
'<th><font color="#00ff00">'+formatNmb(XDeut[0])+'</font></th>'+
'<th><font color="#00ff00">'+formatNmb(XDeut[1])+'</font></th>'+
'<th><font color="#00ff00">'+formatNmb(XDeut[2])+'</font></th>'+
'</tr>'+
'</table><br />';

	var EAlmM=(Metal / AlmM) * 100;
	var EAlmMPorc=parseInt((Metal / AlmM) * 250);
	var EAlmC=(Cristal / AlmC) * 100;
	var EAlmCPorc=parseInt((Cristal / AlmC) * 250);
	var EAlmD=(Deut / AlmD) * 100;
	var EAlmDPorc=parseInt((Deut / AlmD) * 250);

	EAlmM = Math.round(EAlmM);
	EAlmC = Math.round(EAlmC);
	EAlmD = Math.round(EAlmD);

	CuentaRec.innerHTML += '<table width="550">'+
'<tr><td class="c" colspan="3">Estado de los Almacenes</td></tr>'+
'<tr>'+
'<th>Metal</th>'+
'<th>'+EAlmM+'%</th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div style="background-color: '+(EAlmM > 100 ? '#C00000' : '#00C000' )+'; width: '+(EAlmMPorc > 250 ? 250 : EAlmMPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'<tr>'+
'<th>Cristal</th>'+
'<th>'+EAlmC+'%</th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div style="background-color: '+(EAlmC > 100 ? '#C00000' : '#00C000' )+'; width: '+(EAlmCPorc > 250 ? 250 : EAlmCPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'<tr>'+
'<th>Deuterio</th>'+
'<th>'+EAlmD+'%</th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div style="background-color: '+(EAlmD > 100 ? '#C00000' : '#00C000' )+'; width: '+(EAlmDPorc > 250 ? 250 : EAlmDPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'</table><br />';


	ResForm.parentNode.insertBefore(CuentaRec, ResForm.nextSibling);
	ResForm.parentNode.insertBefore(ProdFact, ResForm);
	document.body.innerHTML = document.body.innerHTML.replace(/factor de producci(.)+n\:(.)*[0-9.]/gi,'');
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
	var moon_created_tag	 	= 'Las enormes cantidades de metal y de cristal se atraen y forman lentamente un satÃ©lite lunar en la Ã³rbita del planeta. ';
	var max_rentability	 	= 'MÃ¡xima';
	var min_rentability		= 'MÃ­nima';
	var repaired_tag	 	= 'pueden ser reparados.';
	var months 			= new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre','Diciembre');
	var serverShiptsNames		= new Array('P.Carga','Gr.Carga','Cazador L.','Cazador P.','Crucero','Nave de Batalla','Colonizador','Reciclador.','Sonda','Bombardero','SatÃ©lite S.','Destructor','Est.Muerte','Acoraz.');
	var userShiptsNames		= new Array('Nave pequeÃ±a de carga','Nave grande de carga','Cazador ligero','Cazador pesado','Crucero','Nave de batalla','Colonizador','Recicladores','Sonda de espionaje','Bombardero','SatÃ©lite solar','Destructor','Estrella de la muerte','Acorazado');
	var serverDefensesNames		= new Array('Misil','LÃ¡ser Peq.','LÃ¡ser Gr.','C.Gauss','C.IÃ³nico','C.Plasma','CÃºpula Peq.','CÃºpula Gr.');
	var userDefensesNames		= new Array('Lanzamisiles','LÃ¡ser pequeÃ±o','LÃ¡ser grande','CaÃ±Ã³n de gauss','CaÃ±Ã³n iÃ³nico','CaÃ±Ã³n de plasma','CÃºpula pequeÃ±a de protecciÃ³n','CÃºpula grande de protecciÃ³n');
//const strings
	const c_singleAtacker 		= 'Atacante';
	const c_multipleAtacker 	= 'Atacantes';
	const c_singleDefender 	= 'Defensor';
	const c_multipleDefender 	= 'Defensores';
	const c_battleInit		= 'Batalla del dÃ­a ';
	const c_at			= ' a las ';
	const c_of			= ' de ';
	const c_duration		= 'La batalla durÃ³ ';
	const c_rounds			= ' rondas';
	const c_hiddenTecnology	= 'Armas: XXX% Escudos: XXX% Blindaje: XXX%';
	const c_lost			= ' perdiÃ³ ';
	const c_looses			= 'PÃ©rdidas ';
	const c_units 			= ' unidades.';
	const c_stolen			= 'Captura: ';
	const c_metalInfo		= ' Metal, ';
	const c_cristalInfo		= ' Cristal y ';
	const c_deuteriumInfo		= ' Deuterio';
	const c_consumption		= 'Consumo de deuterio (aproximado) al 100%: ';
	const c_atackerLooses		= 'PÃ©rdidas del Atacante: ';
	const c_defenderLooses		= 'PÃ©rdidas del Defensor: ';
	const c_totalLooses		= 'PÃ©rdidas TOTALES: ';
	const c_rubbles		= 'Escombros';
	const c_metalRubble		= 'Metal: ';
	const c_cristalRubble		= 'Cristal: ';
	const c_deuteriumRubble		= 'Deuterio: ';
	const c_winAndLost		= 'GANANCIAS Y PÃ‰RDIDAS';
	const c_recicleRentability   	= 'Rentabilidad con reciclaje: ';
	const c_notRecicleRentability   = 'Rentabilidad sin reciclaje: ';
	const c_with			= ' Con';
	const c_without		= 'Sin ';
	const c_recicle		= ' Reciclaje: ';
	const c_defenderWithRecicle	= 'Defensor Si Recicla: ';
	const c_showDeuterium		= ' Mostrar el consumo de deuterio <br />';
	const c_showTech		= ' Mostrar las tecnologÃ­as &nbsp;&nbsp;&nbsp;';
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


	var added_link		= new Array('','[color=orangered][size=12]Compactado con el [url=http://userscripts.org/scripts/show/3482]Compactador automÃ¡tico de batallas[/url][/size][/color]','','[b][color=orangered]Compactado con el [url=http://userscripts.org/scripts/show/3482]Compactador automÃ¡tico de batallas[/url][/color][/b]');

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
				result_info = result_info.replace(' ','Â¡') ;
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






}

// version 0.1
// 5 Abril 2006
// Copyright (c) 2006, sinchar
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Adds ally tags and color in galaxy view
// ==UserScript==
// @name ogame-alianza 
// @author sinchar
// @description Relacion con alianzas Ogame - Ogame ally relations. Se aÃ±n etiquetas y colores a las alianzas en la vista de galaxia.
// @include      http://ogame*.de/game/*
// ==/UserScript==

(function(){

		var listado = new Array;

//Para su correcto funcionamiento se deben indicar las etiquetas, colores y listado de alianzas
//se pueden aÃ±n todas las lineas de etiquetas que necesitemos.

//It is necesary set TAGs, colors and list of alliances
//It is posible add any lines like TAGs we need.

//                          Etiqueta   Color      Lista de alianzas
     listado[0] = new Array ("TAG1",   "green",   "ally1","ally2");
     listado[1] = new Array ("TAG2",   "red",     "ally3");
     listado[2] = new Array ("TAG3",   "lime",    "ally4");
     listado[3] = new Array ("TAG4",   "blue",    "ally5");

//    }

	if (location.pathname.search('galaxy.php') != -1 ) {		
		// busca los enlaces activos
		var pagina = document.getElementsByTagName ('a');
		for (var i = pagina.length - 1; i >= 0; i--) {
			alianza = pagina[i].innerHTML;
			alianzac = alianza + "#";
			// busca y resalta las alianzas
			for (var h = listado.length - 1; h >= 0; h--) {
				for (var j = listado[h].length - 1; j > 1; j--) {
					if(alianzac.search(listado[h][j]+" #") != -1 ) {
						if (listado[h][0]!='') {
							pagina[i].innerHTML = alianza+'('+listado[h][0]+')';
						}
						pagina[i].style.color=listado[h][1];
					}
				}			
			}

		}
	}

}) ();

// version 0.2
// 9 agosto 2006
// Bajo Licencia GPL 
// http://www.gnu.org/copyleft/gpl.html
// Visualiza el incremento en las estadisticas.
// Show positions increments in Stats
// ==UserScript==
// @name OGame-IncrementoEstadistica
// @author Lord Mokuba
// @descrizione: Visualiza el incremento en estadisticas
// @include      http://uni*.ogame.it/game/*
// @include      http://ogame*.de/game/*
// ==/UserScript==

(function(){

	if (location.pathname.search('stat.php') != -1 ) {
		// Intenta activar la conexion
		var pagina = document.getElementsByTagName ('th');
		//for (var i = pagina.length - 1; i >= 0; i--) {
		for (var i = 0; i < pagina.length; i++) {
			evento = pagina[i].innerHTML;
			if (evento.substr(0,2) != '<t'){
				//divide jugadores de alianzas
				pos=evento.search('this.T_WIDTH=30;return escape');
				if (pos != -1){
					pos=evento.search('\">');
					if(pos != -1 ) {
						mystring = evento.substr(pos+3,10);
						pos = mystring.search('<');
						if (pos != -1){
							mystring=mystring.substr(0,pos);
							pagina[i].childNodes[1].firstChild.innerHTML += mystring;
						}
					}
				}
			}
		}
		/*
		// Notificador de actualizaciones
	    var d = new Date()
	    var cday=Math.ceil(d.getTime()/1000/3600/24); // dias desde 1/1/1970
	    var lupd=GM_getValue('LastUpd', 0);
	    var delta=cday-lupd;
	    if (delta >= 7){ // revisa la actualizacion...
			GM_xmlhttpRequest({
	       		method: 'GET',
				url: 'http://davidef.altervista.org/userscript/download/StatIncrIt-Org.lastver.txt',
				onload: function(responseDetails) {
					var cver=parseInt(responseDetails.responseText);
					if (cver !=  2){
						alert('hay disponible una nueva version del programa graficador de estadisticas' +
							'Nel caso non venisse aperta, il link Ã¨ il seguente: http://davidef.altervista.org/userscript/script.htm\n'+
							'Questo promemoria verrÃ  visualizzato nuovamente tra 7 giorni se lo script non venisse aggiornato.');
						window.open("http://davidef.altervista.org/userscript/script.htm", "", "");
					}
					//set updated...
					GM_setValue('LastUpd', cday);
	       		}
	    	});
	    }
		//update-notifier end	
	*/
	}

}) ();

// version 0.1.1 BUGFIX
// 7 Aug 2006
// Copyright (c) 2006, GaNoN
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Script de compactacion automatica de espionajes de OGame


// ==UserScript==
// @name Compactador-Espionaje-OGame
// @namespace http://nukezelda.shinranet.com/oscripts/
// @author GaNoN
// @description  Compactador de informes de espionaje del ogame al estilo mecahost
// @include     http://*/bericht.*
// ==/UserScript==

var contenido = '';
var separador = ' | ';

// FUNCTIONS
// Based on http://www.forosdelweb.com/showthread.php?t=412750&highlight=punto+miles


function separarmiles(numero){
	proceso = parseFloat(numero).toString();
	var texto = "";
	contador = 1;
	for(var i = proceso.length-1; i >= 0; i--)
	{
		texto = proceso.charAt(i) + texto;
		contador % 3 == 0 && i > 0 ? texto = "," + texto : texto = texto;
		contador == 3 ? contador = 1 : contador++;
	}
	return texto;
} 

// Copiado de http://dotnet.org.za/danieb/archive/2004/07/27/3020.aspx
function xreplace(checkMe,toberep,repwith)
{
	var temp = checkMe;
	var i = temp.indexOf(toberep);
	while(i > -1)
	{
		temp = temp.replace(toberep, repwith);
		i = temp.indexOf(toberep, i + repwith.length + 1);
	}
	return temp;
}

// Procesar
function hacer_compactacion()
{
	cuerpo = document.body;
	if(cuerpo.innerHTML.search('Recursos en') != -1)
	{
		nuevodiv = document.createElement("div");
		divbotones = document.createElement("div");
		textareacompacta = document.createElement("textarea");
		textareacompacta.style.width = "100%";
		divbotones.innerHTML = 'Foro de destino: <select id="tipoforo"><option value="phpbb" id="phpbb">phpBB</option><option value="ipb" id="ipb">IPB</option><option value="vbulletin" id="vbulletin">vBulletin</option><option value="punbb" id="punbb">punBB</option><option value="noformat" id="noformat">Sin formato</option><option value="html" id="html">HTML</option></select> Skin del foro: <select id="colorforo"><option value="foroclaro" id="foroclaro">Claro</option><option value="forooscuro" id="forooscuro">Oscuro</option></select> Color del skin: <select id="colorskin"><option value="skinclaro" id="skinclaro">Claro</option><option value="skinoscuro" id="skinoscuro">Oscuro</option></select><input type="button" id="buttoncompacta" value="Compactar">';
		cuerpo.appendChild(nuevodiv);
		cuerpo.appendChild(textareacompacta);
		cuerpo.appendChild(divbotones);
		buttoncompacta = document.getElementById("buttoncompacta");
		tipoforo = document.getElementById("tipoforo");
		colorforo = document.getElementById("colorforo");
		colorskin = document.getElementById("colorskin");
		buttoncompacta.addEventListener('click',function () {
			GM_setValue('tipoforospy', tipoforo.value);
			GM_setValue('colorforo', colorforo.value);
			GM_setValue('colorskin', colorskin.value);
			location.href = document.location;
		},false)

		tipoforoausar = GM_getValue('tipoforospy', 'phpbb');
		colorforoausar = GM_getValue('colorforo', 'forooscuro');
		colorskinausar = GM_getValue('colorskin', 'skinoscuro');

		document.getElementById(tipoforoausar).selected = 'selected';
		document.getElementById(colorforoausar).selected = 'selected';
		document.getElementById(colorskinausar).selected = 'selected';

		contenidoweb = document.getElementsByTagName('table');
		recursos = contenidoweb[1].getElementsByTagName('td');

		if (recursos)
		{
			// RECURSOS
			contenido += '[neg]' + recursos[0].innerHTML + '[/neg][br]Metal: [recstyle]' + separarmiles(recursos[2].innerHTML) + '[spanend]' + separador + 'Cristal: [recstyle]' + separarmiles(recursos[4].innerHTML) + '[spanend]' + separador + 'Deuterio: [recstyle]' + separarmiles(recursos[6].innerHTML) + '[spanend]' + separador + 'Energia: [recstyle]' + separarmiles(recursos[8].innerHTML) + '[spanend]';

			// LO PONGO AQUI PORQUE SI HAY INFORME, REPRESENTA Q SIEMPRE SALEN LOS RECURSOS...
			// FLOTA
			if (contenidoweb[2])
			{
				flota = contenidoweb[2].getElementsByTagName('td')
				if (flota.length > '1')
				{
					vecesbucle = (flota.length - 1) / 2;
					contenido += '[br][neg]Flotas[/neg][br]';
					for (i = 0; i < vecesbucle; i++)
					{
						if (i != 0)
						{
							separa = separador;
						}
						else
						{
							separa = '';
						}
						posiciontdcosa = 1 + i * 2;
						posiciontdnum = 2 + i * 2;
						contenido += separa + flota[posiciontdcosa].innerHTML + ' [flotastyle]' + flota[posiciontdnum].innerHTML + '[spanend]';
					}
				}
				else
				{
					contenido += '[br][neg]Flotas[/neg][br](Sin Flotas)';
				}
			}
			
			// DEFENSA
			if (contenidoweb[3])
			{
				defensa = contenidoweb[3].getElementsByTagName('td');
				if (defensa.length > '1')
				{
					vecesbucle = (defensa.length - 1) / 2;
					contenido += '[br][neg]Defensas[/neg][br]';
					for (i = 0; i < vecesbucle; i++)
					{
						if (i != 0)
						{
							separa = separador;
						}
						else
						{
							separa = '';
						}
						posiciontdcosa = 1 + i * 2;
						posiciontdnum = 2 + i * 2;
						contenido += separa + defensa[posiciontdcosa].innerHTML + ' [flotastyle]' + defensa[posiciontdnum].innerHTML + '[spanend]';
					}
				}
				else
				{
					contenido += '[br][neg]Defensas[/neg][br](Sin Defensas)';
				}

				// EDIFICIOS
				if (contenidoweb[4])
				{
					edificios = contenidoweb[4].getElementsByTagName('td');
					if (edificios.length > '1')
					{
						vecesbucle = (edificios.length - 1) / 2;
						contenido += '[br][neg]Edificios[/neg][br]';
						for (i = 0; i < vecesbucle; i++)
						{
							if (i != 0)
							{
								separa = separador;
							}
							else
							{
								separa = '';
							}
							posiciontdcosa = 1 + i * 2;
							posiciontdnum = 2 + i * 2;
							contenido += separa + edificios[posiciontdcosa].innerHTML + ' [edificiostyle]' + edificios[posiciontdnum].innerHTML + '[spanend]';
						}
					}
				}

				// INVESTIGACION
				if (contenidoweb[5])
				{
					investigacion = contenidoweb[5].getElementsByTagName('td');
					if (investigacion.length > '1')
					{
						vecesbucle = (investigacion.length - 1) / 2;
						contenido += '[br][neg]Investigaci&oacute;n[/neg][br]';
						for (i = 0; i < vecesbucle; i++)
						{
							if (i != 0)
							{
								separa = separador;
							}
							else
							{
								separa = '';
							}
							posiciontdcosa = 1 + i * 2;
							posiciontdnum = 2 + i * 2;
							contenido += separa + investigacion[posiciontdcosa].innerHTML + ' [edificiostyle]' + investigacion[posiciontdnum].innerHTML + '[spanend]';
						}
					}
				}
			}
		}

		if (colorforoausar == 'foroclaro')
		{
			recursoscolorforo = '#A144A1';
		}
		else
		{
			recursoscolorforo = '#FE875B';
		}
		if (colorskinausar == 'skinclaro')
		{
			recursoscolorhtml = '#A144A1';
		}
		else
		{
			recursoscolorhtml = '#FE875B';
		}
		var formathtml = Array(
			Array('[neg]', '<span style="font-weight: bold;">'),
			Array('[/neg]', '</span>'),
			Array('[recstyle]', '<span style="font-weight: bold; font-size: 17px; color: ' + recursoscolorhtml + '">'),
			Array('[flotastyle]', '<span style="font-weight: bold; font-size: 17px; color: red;">'),
			Array('[edificiostyle]', '<span style="font-weight: bold; font-size: 17px; color: blue;">'),
			Array('[spanend]', '</span>'),
			Array('[br]', '<br />'),
			Array('[copyright]', '<br /><br />Compactado con el <a href="http://userscripts.org/scripts/show/5118">Compactador autom&aacute;tico de espionajes</a>')		
		);
		if (tipoforoausar == "html")
		{
			var format = Array(
				Array('[neg]', '<span style="font-weight: bold;">'),
				Array('[/neg]', '</span>'),
				Array('[recstyle]', '<span style="font-weight: bold; font-size: 17px; color: ' + recursoscolorforo + '">'),
				Array('[flotastyle]', '<span style="font-weight: bold; font-size: 17px; color: red;">'),
				Array('[edificiostyle]', '<span style="font-weight: bold; font-size: 17px; color: blue;">'),
				Array('[spanend]', '</span>'),
				Array('[br]', '<br />'),
				Array('[copyright]', '<br /><br />Compactado con el <a href="http://userscripts.org/scripts/show/5118">Compactador autom&aacute;tico de espionajes</a>')
			);
		}
		else if (tipoforoausar == "phpbb" || tipoforoausar == "ipb")
		{
			var format = Array(
				Array('[neg]', '[b]'),
				Array('[/neg]', '[/b]'),
				Array('[recstyle]', '[b][size=17][color=' + recursoscolorforo + ']'),
				Array('[flotastyle]', '[b][size=17][color=red]'),
				Array('[edificiostyle]', '[b][size=17][color=blue]'),
				Array('[spanend]', '[/color][/size][/b]'),
				Array('[br]', '\n'),
				Array('[copyright]', '\n\nCompactado con el [url=http://userscripts.org/scripts/show/5118]Compactador autom&aacute;tico de espionajes[/url]')		
			);
		}
		else if (tipoforoausar == 'vbulletin')
		{
			var format = Array(
				Array('[neg]', '[b]'),
				Array('[/neg]', '[/b]'),
				Array('[recstyle]', '[b][size=4][color=' + recursoscolorforo + ']'),
				Array('[flotastyle]', '[b][size=4][color=red]'),
				Array('[edificiostyle]', '[b][size=4][color=blue]'),
				Array('[spanend]', '[/color][/size][/b]'),
				Array('[br]', '\n'),
				Array('[copyright]', '\n\nCompactado con el [url=http://userscripts.org/scripts/show/5118]Compactador autom&aacute;tico de espionajes[/url]')
			);
		}
		else if (tipoforoausar == 'punbb')
		{
			var format = Array(
				Array('[neg]', '[b]'),
				Array('[/neg]', '[/b]'),
				Array('[recstyle]', '[b][color=' + recursoscolorforo + ']'),
				Array('[flotastyle]', '[b][color=red]'),
				Array('[edificiostyle]', '[b][color=blue]'),
				Array('[spanend]', '[/color][/b]'),
				Array('[br]', '\n'),
				Array('[copyright]', '\n\nCompactado con el [url=http://userscripts.org/scripts/show/5118]Compactador autom&aacute;tico de espionajes[/url]')
			);
		}
		else if (tipoforoausar == 'noformat')
		{
			var format = Array(
				Array('[neg]', '-'),
				Array('[/neg]', '-'),
				Array('[recstyle]', '('),
				Array('[flotastyle]', '('),
				Array('[edificiostyle]', '('),
				Array('[spanend]', ')'),
				Array('[br]', '\n'),
				Array('[copyright]', '\n\nCompactado con el compactador autom&aacute;tico de espionajes (url=http://userscripts.org/scripts/show/5118)')	
			);
		}
		// contenido += '[copyright]';
		contenidotextarea = contenido;
		for (i = 0; i < formathtml.length; i++)
		{
			contenido = xreplace(contenido, formathtml[i][0], formathtml[i][1]);
			contenidotextarea = xreplace(contenidotextarea, format[i][0], format[i][1]);
		}
		nuevodiv.innerHTML = contenido;
		textareacompacta.value = contenidotextarea;
	}
}
hacer_compactacion();

// ==UserScript==
// @name CompactadorEscomb-Ogame
// @namespace http://www.loon.com.ar/
// @author Tomas Loon R
// @description  Compactador de informes de campos de escombros
// @include     http://*/messages*php*
// ==/UserScript==

// msg = "Tus 1 recicladores tienen una capacidad total de carga de 20000. En los escombros flotan 0 metal y 90000 cristal en el espacio. Has recolectado 0 metal y 20000 cristal.";
tag_inic = document.indexOf("</td><td colspan="3" class="b">Tus");
tag_fina = document.indexOf(" cristal. </td>");
msg = tag_inic.substring(tag_inic+34, tag_fina);

function obtener_var(){

metal_inicia = msg.indexOf("En los escombros flotan ");
cristal_inic = msg.indexOf(" metal y ");
metal_flotando = msg.substring(metal_inicia+23, cristal_inic);
cristal_fina = msg.indexOf(" cristal en el espacio.");
cristal_flotan = msg.substring(cristal_inic+9, cristal_fina);

metal_recolect = msg.indexOf("Has recolectado ");
cristal_recole = msg.lastIndexOf(" metal y ");
metal_done = msg.substring(metal_recolect+15, cristal_recole);
cristal_final = msg.indexOf(" cristal.");
// cristal_done = "nose";
cristal_done = msg.substring(cristal_recole+9, cristal_final);

metal_falta = metal_flotando - metal_done;
cristal_falta = cristal_flotan - cristal_done;
reci2 = (metal_falta+cristal_falta)/20000+1;
reciclas = Math.floor(reci2);
}


function escribir(){
obtener_var();
document.write("<font face=verdana size=2 color=silver>Flotaban: "+metal_flotando+" metal y "+cristal_flotan+" cristal.<BR>");
document.write("Recolectado: <font color=lime>"+metal_done+"</font> metal y <font color=lime>"+cristal_done+"</font> cristal.<br>");
document.write("Restan: <font color=red>"+metal_falta+"</font> metal y <font color=red>"+cristal_falta+"</font> cristal.");
document.write("(<font color=white>"+reciclas+"</font> recicladores)");
}

escribir();
}

else{
document.write("No se encontraron informes de escombros.");
}
}

// ==UserScript==
// @name           Ogame menu flota
// @author         sylkat
// @date           2007-02-19
// @version        0.1
// @namespace     
// @description    Anyade nuevas funciones al menu flota, sacado de ogame++ funciona con el nuevo Ogame
// @include        http://ogame*.de/game/flotten1.php?*
// ==/UserScript==

(function()
{
	var inputs = document.evaluate("//input[@type='text' or not(@type)]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i=0; i<inputs.snapshotLength; i++) {
			var a = document.createElement("a");
			a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs.snapshotItem(i).name+"')[0];texto.value=999999;texto.onchange();");
			a.innerHTML = "&infin;";
			inputs.snapshotItem(i).parentNode.appendChild(a);

			var a = document.createElement("a");
			a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs.snapshotItem(i).name+"')[0];texto.value++;texto.onchange();");
			a.innerHTML='+';
			inputs.snapshotItem(i).parentNode.appendChild(a);

			var a = document.createElement("a");
			a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs.snapshotItem(i).name+"')[0];if (texto.value>0){ texto.value--;texto.onchange();}");
			a.innerHTML = "&minus;";
			inputs.snapshotItem(i).parentNode.appendChild(a);

			var a = document.createElement("a");
			a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs.snapshotItem(i).name+"')[0];texto.value=0;texto.onchange();");
			a.innerHTML = "&bull;";
			inputs.snapshotItem(i).parentNode.appendChild(a);
		}
	
	var element = document.evaluate('/html/body/center/table/tbody/tr/td[3]/table/tbody/tr[3]', document, null, 	XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.getElementsByTagName('td');
	var metal = parseInt(element[1].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	var cristal = parseInt(element[2].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	var deuterio = parseInt(element[3].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	var recursos = metal + cristal + deuterio;
	unsafeWindow.calculate = calculate;
	var infoRow = document.getElementsByTagName('tr');
	var as = infoRow[infoRow.length-3].getElementsByTagName('a');
	for (var i=0; i<as.length; i++)
		as[i].setAttribute('onclick', 'setTimeout(calculate, 20)');
	infoRow = infoRow[infoRow.length-1].firstChild;
	calculate();
	for(i=202; i<215; i++){  // quiza se podria reducir los bucles de busqueda cogiendo directamente esa columna
		x=document.getElementsByName("ship"+i);
		if(x.length){
			x[0].addEventListener('keyup',calculate,true);
			x[0].parentNode.previousSibling.previousSibling.firstChild.setAttribute('onclick', 'setTimeout(calculate, 20)');
			x[0].setAttribute('onchange', "this.value=parseInt(Math.min(parseInt('0'+this.value, 10), parseInt(getElementsByName('max'+this.name)[0].value, 10)),10);setTimeout(calculate, 10)");
	}
}	


function puntuar(numero) {
	var strNum=String(numero);
	var strNum2='';
	var i=0;
	for(i=strNum.length-4;i>=0;i-=3) {
		strNum2=(strNum[i]=='-'?'':'.')+strNum.substring(i+1, i+4)+strNum2;
	}
	strNum2=strNum.substr(0, i+4)+strNum2;
	return strNum2;
}


function calculate(){
	var capacity=0;
	var speed=0;
	var consumption=0;
		
	for(i=202; i<215; i++){
		x=document.getElementsByName("ship"+i);
		y=document.getElementsByName("capacity"+i);
		u=document.getElementsByName("speed"+i);
		v=document.getElementsByName("consumption"+i);
		if(x.length && y.length && x[0].value!=''){
			shipCount=parseInt(x[0].value, 10);
			shipCapacity=parseInt(y[0].value, 10);
			shipSpeed=parseInt(u[0].value, 10);
			shipConsumption=parseInt(v[0].value, 10);
			capacity+=shipCount*shipCapacity;
			if((speed > shipSpeed || speed == 0) && shipCount>0 ) speed=shipSpeed;
				consumption +=shipCount*shipConsumption;
		}
	}	
	if(recursos>capacity){
		surstr = puntuar(recursos-capacity);
		var cp = 0;
		var cg = 0;
		try {cp = document.getElementsByName('maxship202')[0].value}
			catch (e) {}
		try {cg = document.getElementsByName('maxship203')[0].value}
			catch (e) {}
		surstr += '&nbsp;&nbsp;<font color="orangered" title="Cargueros pequenyos"> CP: ' +
						puntuar(Math.ceil((recursos-capacity)/5000)) +
						(capacity==0?' (' + cp + ')':'') + '</font>' +
						'&nbsp;&nbsp;<font color="orange" title="Cargueros grandes"> CG: ' +
						puntuar(Math.ceil((recursos-capacity)/25000)) +
						(capacity==0?' (' + cg + ')':'') + '</font>';
	}else {
		surstr='0';
	}
	var s=document.getElementsByTagName('th');
	var k=s.length-11;
	s[k].innerHTML='<font color="#9999FF">Recursos restantes: ' + surstr + '</font>' +
						(capacity>0?'&nbsp;&nbsp;<font color="#00FF66">Capacidad: '	+ puntuar(capacity) + '</font>' +
						'<br /><font color="lightblue">Velocidad max: ' + puntuar(speed) + '</font>' +
						'&nbsp;&nbsp;<font color="#77bb22">Consumo: ' + puntuar(consumption) + '</font>':'');		
}
})();

// ==UserScript==
// @name          Inactivos
// @namespace     http://
// @description	  Muestra en rojo los Inactivos
// @include  http://uni*.ogame.*/index.php?page=galaxy  
// ==/UserScript==

var allElements, thisElement;
var cadena, suma;
allElements = document.getElementsByTagName('span');
for (var i = 0; i < allElements.length; i++) {
    thisElement = allElements[i];
    
	if (thisElement.className.substring(0,8)=='inactive')
		{

		thisElement.style.color = "red";
		
		}
	if (thisElement.className.substring(0,12)=='longinactive')
		{

		thisElement.style.color = "red";
		
		}
}
	
//Script creado por Adelsork. 

// Autor: ..:: NU ::..
// Fecha de modificacion: 24/01/07

// ==UserScript==
// @name OGame Salto Cuantico
// @namespace OGame Salto Cuantico
// @description Agrega a la vista de salto cuantico los botones para max de cada nave, toda la flota y ninguna flota.
// @include http://ogame*.de/*
// @include  http://*.gfsrv.*/
// @exclude  
// ==/UserScript==

//Funcion para poner todos los campos en 0.
function noShips() {
	if (document.getElementsByName(id)[0]) {
		document.getElementsByName(id)[0].value = 0;
	}
}

//Verificamos si esta abierta en el frame principal la pagina de vision general.
if(document.baseURI.match(/infos.php\?session=\w{12}&gid=43/) != null) {
   var cantidad = 0;
   var ninguna = "";
   var nombre = "";
   var texto = "";
   var todas = "";
   var table = document.evaluate("/html/body/center[2]/form[1]/table[last()]/tbody", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

   //Le ponemos un nombre al formulario para usarlo mas facilmente.
   table.parentNode.parentNode.setAttribute("name", "salto");
   table.rows[0].cells[0].setAttribute("colspan","4");
   table.rows[table.rows.length - 1].cells[0].setAttribute("colspan","4");

   var nodo = table.rows[0].cloneNode(true);
   table.insertBefore(nodo, table.rows[1]);
   nodo.innerHTML = "<th>Naves</th><th>Disponibles</th><th>-</th><th>-</th>";

   for(var i = 2; i < table.rows.length - 1; i++) {
      cantidad = table.rows[i].cells[0].innerHTML.match(/\((\d+)/)[1];
      texto = table.rows[i].cells[0].innerHTML.match(/>(\S+(\s*\S*)*)</)[1];
      nombre = table.rows[i].cells[1].firstChild.name;

      //Modificamos el nombre de las naves, quedando unicamente el nombre sin la cantidad disponible.
      table.rows[i].cells[0].innerHTML = texto;
      //Agregamos una celda indicando la cantidad disponible.
      nodo = table.rows[i].cells[0].cloneNode(true);
      table.rows[i].insertBefore(nodo, table.rows[i].cells[table.rows[i].cells.length - 1]);
      nodo.innerHTML = cantidad;
      //Agregamos una celda con un boton para seleccionar el maximo.
      nodo = table.rows[i].cells[0].cloneNode(true);
      table.rows[i].insertBefore(nodo, table.rows[i].cells[table.rows[i].cells.length - 1]);
      nodo.innerHTML = "<a href=\"javascript:void();\" onclick=\"salto." + nombre + ".value='" + cantidad + "';\" >m&aacute;x</a>";
      todas = todas + "salto." + nombre + ".value='" + cantidad + "';";
      ninguna = ninguna + "salto." + nombre + ".value='0';";
   }
   nodo = table.rows[0].cloneNode(true);
   table.insertBefore(nodo, table.rows[table.rows.length - 1]);
   nodo.innerHTML = "<th colspan='2'><a href=\"javascript:void();\" onclick=\"" + ninguna + "\">Ninguna nave</a></th><th colspan='2'><a href=\"javascript:void();\" onclick=\"" + todas + "\">Todas las naves</a></th>";
}

// Autor: ..:: NU ::..
// Fecha de modificacion: 24/01/07

// ==UserScript==
// @name OGame Overview Local Time
// @namespace OGame Overview Local Time
// @description AÃ±ade la hora local debajo de la hora del server. 
// @include http://ogame*.de/*
// @include  http://*.gfsrv.*/
// @include http://uni*.ogame.com.es/*
// @exclude  
// ==/UserScript==


//Verificamos si esta abierta en el frame principal la pagina de vision general.
if(document.baseURI.indexOf("overview.php") != -1) {

   var nodo = document.evaluate("/html/body/center/table[last()]/tbody/tr[th[2]]/th[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
   //var dias = new Array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
   //var meses = new Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
   var dias = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
   var meses = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');

   var date = new Date();
   var mes = date.getMonth();
   var dia = date.getDay();
   var diaNum = date.getDate();
   var hora = date.getHours();
   var mins = date.getMinutes();
   var segs = date.getSeconds();

   var fecha = nodo.innerHTML.match(/(\S\S\S) (\S\S\S) (\d+) (\d+)(:\d\d:\d\d)/);
   var fechaLocal = dias[dia] + " " + meses[mes] + " " + diaNum + " " + hora + ((mins < 10) ? ":0" : ":") + mins + ((segs < 10) ? ":0" : ":") + segs;

   var nodoLocal = nodo.parentNode.cloneNode(true);
   nodo.parentNode.parentNode.insertBefore(nodoLocal, nodo.parentNode.nextSibling);
   nodoLocal.innerHTML = "<th>Hora local</th><th colspan='3' id='ClockLocal'>" + fechaLocal + "</th>";
}

// version 0.8
// 2007/09/18

// ==UserScript==
// @name           OGame - Calculo de cargas necesarios
// @namespace      http://userscripts.org/scripts/show/8329
// @description    Calcula los cargas necesarios para llevar recursos a un planeta. 
// @include        http://*ogame*/*
// ==/UserScript==

// constantes de contrucciones
const cMinaMetal          = "Mina de metal";
const br                  = "<br>";
const sp                  = "&nbsp;";
const cRequiereComandante = "<span class=\"noresources\">"
const cBarraB             = "</b>";
const cBarraSpan          = "</span>";

var sMetalName;
var sCristName;
var sDeutName;

var strHTML;
var strTemp;
var bComandante;
var iReqM;
var iReqC;
var iReqD;
var iReqTotal;
var iDispM;
var iDispC;
var iDispD;
//var regexCom   = '<a style="cursor: pointer" title="\-\b(\d{1,3}\.)?(\d{3,3}\.){0,2}\d{1,3}\b"><span class="noresources">';
var regexCom1  = /<span [^>]*>/g;
var regexCom2  = /<a [^>]*>/g;
var regexCom3  = /<\/span><\/a>/g;
var regexCom4  = /<font[^>]*>/g;


function LZ(x) {return(x<0||x>9?"":"0")+x};

function addDots(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '.' + '$2');
  }
  return x1 + x2;
}

function locate(xpath, xpres) {
  return document.evaluate(xpath, document, null, xpres, null);
}

function locateFirst(xpath) {
  // gracias SpitFire: http://userscripts.org/scripts/show/8555
  return locate(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
}

function get_from_to(strLine, begin, end) {
  var strTemp;
  
  strTemp = strLine.substring(strLine.indexOf(begin) + begin.length, strLine.length);
  return strTemp.substring(0, strTemp.indexOf(end));
}

(function(){
  var table;
  
  // nombres de os recursos - multilanguaje
  table = document.getElementById('resources').childNodes[1].childNodes[2];
  for (i=0; i < table.childNodes.length; i++) {
    switch (i) {
      case 1: 
        //Metal
        sMetalName = table.childNodes[i].childNodes[0].childNodes[0].childNodes[0].innerHTML;
        break;
      case 3:
        //Cristal
        sCristName = table.childNodes[i].childNodes[0].childNodes[0].childNodes[0].innerHTML;
        break;
      case 5:
        //Deuterio
        sDeutName = table.childNodes[i].childNodes[0].childNodes[0].childNodes[0].innerHTML;
        break;
    };
  }
  
  //recursos actuales
  table = document.getElementById('resources').childNodes[1].childNodes[4];
  for (i=0; i < table.childNodes.length; i++) {
    switch (i) {
      case 1: 
        //Metal
        iDispM = parseInt(table.childNodes[i].childNodes[0].innerHTML.replace(/[.]/g,''));
        break;
      case 3:
        //Cristal
        iDispC = parseInt(table.childNodes[i].childNodes[0].innerHTML.replace(/[.]/g,''));
        break;
      case 5:
        //Deuterio
        iDispD = parseInt(table.childNodes[i].childNodes[0].innerHTML.replace(/[.]/g,''));
        break;
    };
  }
  
  if (location.href.search("building") != -1 ) {
    for (i=0; i < document.getElementsByTagName("td").length; i++) {
      
      //alert(iDispM + '-' + iDispC + '-' + iDispD);
      if (document.getElementsByTagName("td").item(i).className == "l"){
        strHTML = document.getElementsByTagName("td").item(i).innerHTML;

        //if (i == 53) alert(i + '$$' + strHTML);
        strHTML = strHTML.replace(regexCom1, '');
        strHTML = strHTML.replace(regexCom2, '<b>');
        strHTML = strHTML.replace(regexCom3, cBarraB);

        iReqM = parseInt(get_from_to(strHTML, cRequiereComandante, cBarraSpan).replace(/[.]/g,''));
        iReqM = parseInt(get_from_to(strHTML, sMetalName + ': <b>', cBarraB).replace(/[.]/g,''));
        iReqC = parseInt(get_from_to(strHTML, sCristName + ': <b>', cBarraB).replace(/[.]/g,''));
        iReqD = parseInt(get_from_to(strHTML, sDeutName + ': <b>', cBarraB).replace(/[.]/g,''));
        
        iReqTotal = 0;
        strTemp = "";
        if (!(isNaN(iReqM))) {
          if (iReqM < iDispM) {
            strTemp = strTemp + sMetalName + ": <b>0</b>" + sp;
          } else {
            iReqTotal += iReqM - iDispM;
            strTemp = strTemp + sMetalName + ": <b>" + addDots(iReqM - iDispM) + "</b>" + sp;
          };
        };
        if (!(isNaN(iReqC))) {
          if (iReqC < iDispC) {
            strTemp = strTemp + sCristName + ": <b>0</b>" + sp;
          } else {
            strTemp = strTemp + sCristName + ": <b>" + addDots(iReqC - iDispC) + "</b>" + sp;
            iReqTotal += iReqC - iDispC;
          };
        };
        if (!(isNaN(iReqD))) {
          //alert(iReqD + "-" + iDispD);
          if (iReqD < iDispD) {
            strTemp = strTemp + sDeutName + ": <b>0</b>" + sp;
          } else {
            strTemp = strTemp + sDeutName + ": <b>" + addDots(iReqD - iDispD) + "</b>" + sp;
            iReqTotal += iReqD - iDispD;
          };
        };
        if (iReqTotal != 0) {
          strTemp = strTemp + br + 
            "Cargas Grandes: <b>" + Math.ceil(iReqTotal / 25000) + "</b>"+ sp + sp + 
            "PequeÃ±as: <b>" + Math.ceil(iReqTotal / 25000 * 5) + "</b>";
        }; 
        if (strTemp.length != 0) {
          strTemp = 
            document.getElementsByTagName("td").item(i).innerHTML + 
            br +
            "Falta: " + strTemp;
          strTemp = strTemp.replace(/<br><br>/g, br);
          document.getElementsByTagName("td").item(i).innerHTML = strTemp;
        }
      }
    }
  } else if (location.href.search("flotten1") != -1) {
  
    var iDispT = iDispM + iDispC + iDispD;
    var infoRow = locateFirst('//div[@id="content"]/center/center/form/table[last()]').getElementsByTagName('tr');
    
    infoRow = infoRow[infoRow.length-1].firstChild;
    infoRow.innerHTML =
      '<a title="Cargas grandes necesarias para transportar todos los recursos">' + 
      'Cargas grandes: ' + Math.ceil(iDispT/25000) + '</a>' + '&nbsp;&nbsp;&nbsp;' + 
      '<a title="Cargas chicas necesarias para transportar todos los recursos">' + 
      'Cargas chicas: ' + Math.ceil(iDispT/5000) + '</a>';
  };    
})();

// version 0.3.3
// 2007/09/05
// Autor: FryGuy

// ==UserScript==
// @name           OGame - Almacenamiento de Naves
// @namespace      "http://userscripts.org/scripts/show/9120"
// @description    Agrega a la pantalla de flotas la capacidad de carga total para las naves seleccionadas
// @include        http://*ogame.com.es/*

// ==/UserScript==

var textNode;

var vNaves = Array(
  Array(202, 1, 5000, 10000, 10, 5000), //Nave pequeÃ±a de carga
  Array(203, 1, 7500, 0, 50, 25000),    //Nave grande de carga
  Array(204, 1, 12500, 0, 20, 50),      //Cazador ligero
  Array(205, 2, 10000, 0, 75, 100),     //Cazador pesado
  Array(206, 2, 15000, 0, 300, 800),    //Crucero
  Array(207, 3, 10000, 0, 500, 1500),   //Nave de batalla
  Array(208, 2, 2500, 0, 1000, 7500),   //Colonizador
  Array(209, 1, 2000, 0, 300, 20000),   //Reciclador
  Array(210, 1, 100000000, 0, 1, 0),    //Sonda de espionaje
  Array(211, 2, 4000, 5000, 1000, 500), //Bombardero
  Array(212, 3, 5000, 0, 1000, 2000),   //Zer
  Array(213, 3, 100, 0, 1, 2000),       //Destructor
  Array(214, 3, 100, 0, 1, 1000000),    //EDLM
  Array(215, 3, 10000, 0, 250, 750)     //Acorazado
);

function addDots(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
};

function removeDots(nStr){
	return parseInt(nStr.replace(/[.]/g,''));
};

function mynoShips (){
	var id;
	
	for (i = 200; i < 220; i++) {
		id = "ship" + i;
		if (document.getElementById(id)) {
			document.getElementsByName(id)[0].value = 0;
			calcStorage(id);
		};
	};
	//calcTotal();
};

function mymaxShips() {
	var id;
	var i;
	
	for (i = 200; i < 220; i++) {
		id = "ship" + i;
		if (document.getElementById(id)) {
			document.getElementsByName(id)[0].value = document.getElementsByName("max" + id)[0].value;
			calcStorage(id);
		};
	};
	//calcTotal();
};

function mymaxShip(){
	var ships;
	var ship;

	ship = document.getElementById(this.id).id;
	if (document.getElementsByName(ship)[0]) {
		ships = document.getElementsByName(ship)[0];
		document.getElementsByName(ship)[0].value = document.getElementsByName("max" + ship)[0].value;
		calcStorage(ships.name);
	};
};

function myKeyUp(){
	calcStorage(this.name);
};

function calcTotal(){
	var id;
	var i;
	var iTotal = 0;
	
	for (i = 200; i < 220; i++) {
		id = "ship" + i;
		if (document.getElementById(id)) {
			iTotal = iTotal + Number(removeDots(document.getElementsByName(id)[0].nextSibling.value));
		};
	};
	textNode.nodeValue = addDots(iTotal);
};

function calcStorage(ship){
	var i;
	var node;
	var ships;
	
	if (ships = document.getElementsByName(ship)[0]) {
		node = ships.nextSibling;
	
		if (isNaN(ships.value)) {
			node.nodeValue = 0;
		} else {
			for (i = 0; i < vNaves.length; i++) {
	    	if (vNaves[i][0] == node.id) {
	    		node.value = addDots(ships.value * vNaves[i][5]);
	    	};
	    };
		};
		calcTotal()
	};
};

function doNothing(){

};

(function(){
	var i;
	var data;
	var node;
	var nodemax;
	var inputNode;
	var nodeTotal;
	
	if (location.href.search("flotten1") != -1 ) {
		for(i = 200; i <= 220; i++){
			data = document.getElementsByName("ship" + i);
			if (data.length > 0) {
				if (nodeTotal == null){
					nodeTotal = data[0]
					nodeTotal = nodeTotal.parentNode;
					nodeTotal = nodeTotal.parentNode;
					nodeTotal = nodeTotal.parentNode;
					nodeTotal = nodeTotal.firstChild;
					nodeTotal = nodeTotal.nextSibling;
					nodeTotal = nodeTotal.nextSibling;
					nodeTotal = nodeTotal.lastChild;
					nodeTotal = nodeTotal.previousSibling;
					nodeTotal.firstChild.nodeValue = 'Total: ';
					textNode = document.createTextNode('0');
					nodeTotal.appendChild(textNode);
				};
			
				node = data[0];
				node.addEventListener("keyup", myKeyUp, false);
				//node.addEventListener("mouseover", mymaxShips, false);

				nodemax = node.parentNode.previousSibling.previousSibling.firstChild;
				nodemax.href = 'javascript:doNothing'; //redefinimos el click en el "mÃ¡x"
				nodemax.id = node.name;
				nodemax.addEventListener('click', mymaxShip, false);

				inputNode = document.createElement('INPUT'); // se crea la nueva celda
				inputNode.id = i;
				inputNode.value = '0';
				inputNode.disabled = true;
				inputNode.size = 10;
				node.parentNode.appendChild(inputNode);				
			};	
		};
		// redefinimos el "todas las naves"		
		data = document.getElementsByTagName('a');
		for (i = 0; i < data.length; i++) {
			if (data.item(i).href == "javascript:maxShips();") {
				node = data.item(i);
				node.href = 'javascript:doNothing'; //redefinimos el click 
				//node.id = node.name;
				node.addEventListener('click', mymaxShips, false);	
			};
			
			if (data.item(i).href == "javascript:noShips();") {
				node = data.item(i);
				node.href = 'javascript:doNothing'; //redefinimos el click 
				//node.id = node.name;
				node.addEventListener('click', mynoShips, false);	
			};
		};
	};
})();   

// ==UserScript==
// @version       1.1
// @name          Color Mision Ogame
// @author	  ZEYsoft
// @namespace     
// @description	  Cambia los colores de misiones en VisiÃ³n General de Ogame.
// @include  http://uni*.ogame.*/game/index.php?page=overview*
// @include  http://uni*.ogame.*/game/overview.php*
// ==/UserScript==

var listaElementos, elementoActual; //nos sirven para recorrer

//---La mision:-------- Color en RGB

var esAtacar       = "rgb(000,200,000)";
var eraAtacar      = "rgb(150,150,150)";
var vieneAtaque    = "rgb(200,000,000)";

var esConfed       = "rgb(000,220,159)";
var eraConfed      = "rgb(150,150,150)";
var vieneConfed    = "rgb(200,000,000)";

var esRecolectar   = "rgb(147,164,079)";
var eraRecolectar  = "rgb(150,150,150)";

var esTransportar  = "rgb(000,237,016)";
var eraTransportar = "rgb(150,150,150)";
var vieneTransporte= "rgb(120,244,244)";

var esEspionaje    = "rgb(245,160,075)";
var eraEspionaje   = "rgb(190,120,025)";
var vieneEspionaje = "rgb(255,083,083)";

var esDesplegar    = "rgb(009,208,208)";
var eraDesplegar   = "rgb(150,150,150)";

var esColonizar    = "rgb(255,255,255)";
var eraColonizar   = "rgb(150,150,150)";

var esMantener     = "rgb(000,255,000)";
var eraMantener    = "rgb(150,150,150)";

//  comienza el codigo del script....

if(document.baseURI.indexOf("overview") != -1){
		listaElementos = document.getElementsByTagName('span');
		for (var i = 0; i < listaElementos.length; i++) {
          elementoActual = listaElementos[i];

			//La mision es: Confederacion
          if (elementoActual.className.substring(0,20)=='flight ownfederation')
          {
            elementoActual.style.color = esConfed;
		  }

			//La mision era: Confederacion
          if (elementoActual.className.substring(0,20)=='return ownfederation')
          {
            elementoActual.style.color = eraConfed;
		  }

			//viene ataque de Confederacion
          if (elementoActual.className.substring(0,17)=='flight federation')
          {
            elementoActual.style.color = vieneConfed;
		  }

			//La mision es: Atacar
          if (elementoActual.className.substring(0,16)=='flight ownattack')
          {
            elementoActual.style.color = esAtacar;
		  }

			//La mision era: Atacar
          if (elementoActual.className.substring(0,16)=='return ownattack')		
		  {
            elementoActual.style.color = eraAtacar;
		  }

			//Una flota enemiga te va a atacar
          if (elementoActual.className.substring(0,13)=='flight attack')		
		  {
            elementoActual.style.color = vieneAtaque;
		  }

			//La mision es: Recolectar
          if (elementoActual.className.substring(0,17)=='flight ownharvest')
          {
			elementoActual.style.color = esRecolectar;
          }

			//La mision era: Recolectar 
          if (elementoActual.className.substring(0,17)=='return ownharvest')
          {
            elementoActual.style.color = eraRecolectar;
          }

			//La mision es: Transportar
          if (elementoActual.className.substring(0,19)=='flight owntransport')	
		  {
			elementoActual.style.color = esTransportar;
          }

			//La mision era:Transportar
          if (elementoActual.className.substring(0,19)=='return owntransport')
		  {
			elementoActual.style.color = eraTransportar;
          }

			//Una flota pacifica transporta
          if (elementoActual.className.substring(0,16)=='flight transport')
		  {
			elementoActual.style.color = vieneTransporte;
          }

			//La mision es: Espionaje
          if (elementoActual.className.substring(0,19)=='flight ownespionage')
		  {
			elementoActual.style.color = esEspionaje;
		  }

			//La mision era: Espionaje
          if (elementoActual.className.substring(0,19)=='return ownespionage')
		  {
			elementoActual.style.color = eraEspionaje;
          }

			//Flota enemiga te Espia
          if (elementoActual.className.substring(0,16)=='flight espionage')
		  {
			elementoActual.style.color = vieneEspionaje;
          }

			//La mision es: Desplegar
          if (elementoActual.className.substring(0,16)=='flight owndeploy')
		  {
			elementoActual.style.color = esDesplegar;
		  }

			//La mision era: Desplegar
		  if (elementoActual.className.substring(0,16)=='return owndeploy')
		  {
			elementoActual.style.color = eraDesplegar;
          }

			//La mision es: Colonizar
          if (elementoActual.className.substring(0,16)=='flight owncolony')
		  {
			elementoActual.style.color = esColonizar;
		  }

		  //La mision era: Colonizar
          if (elementoActual.className.substring(0,16)=='return owncolony')
		  {
			elementoActual.style.color = eraColonizar;
          }

			//La flota esta en orbita
          if (elementoActual.className.substring(0,15)=='holding ownhold')
		  {
			elementoActual.style.color = esMantener;
		  }

			//La mision es: Mantener posision
          if (elementoActual.className.substring(0,14)=='flight ownhold')
		  {
			elementoActual.style.color = esMantener;
		  }

			//La mision era:Mantener posicion
          if (elementoActual.className.substring(0,14)=='return ownhold')
		  {
			elementoActual.style.color = eraMantener;
          }

      } //fin del ciclo
}// fin de la funcion

// ==UserScript==
// @name           Calculador de Vuelo OGame
// @versions       V3.0 es
// @description    Calcula el tiempo de vuelo de las naves de ogame.
// @include        http://ogame*.de/game/overview.php*
// @include        http://*.gfsrv.net/game/*overview*
// @include        http://*/game/overview.php*
// @include        http://*/game/index.php?page=overview*
// ==/UserScript==
// Traducido y Modificado para Ogame.com.es por Cibort
// Este Script es legal en ogame.com.es: http://board.ogame.com.es/thread.php?threadid=593198

/*
 *     
 *
 * FÃ“RMULAS USADAS:
 *
 * Tiempo de Vuelo:
 * - A tus propias Coordenadas:
 * (10 + (35.000 / porcentagem) * Raiz((1.000.005) / velocidade))
 *
 * - AL mismo Sistema Solar:
 * (10 + (35.000 / porcentagem) * Raiz((1.000.000 + (Planetas * 5000)) / velocidade))
 * 
 * - A la misma Galaxia:
 * (10 + (35.000 / porcentagem) * Raiz((2.700.000 + (Sistemas * 95000)) / velocidade))
 * 
 * - A otras Galaxias:
 * (10 + (35.000 / porcentagem) * Raiz((Galaxias * 20.000.000) / velocidade))
 *
 *  
 *
 */



/* --------- CONFIGURACOES PESSOAIS --------- */ 

// Texto que aparecera no botao 
var calcTextoBotao  = 'Mostrar Calculador';

// Cor de fundo do calculador
var calcCorFundo = '#081424';

// Cor da borda do calculador;
var calcCorBorda = '#344566';

// Posicao do Calculador (em pixels)
var calcPosTop  = 100;
var calcPosLeft = 0;

// Tamanho do Calculador
var calcTamanho = '260 px';

// Iniciar visivel
var calcVisivel = false;


/* --------- FIM DAS CONFIGURACOES  --------- */




/* ------------- FUNCOES ------------- */

function CriarBotaoCalculador ()
{
	var botao = '';

	botao += '<p><input type="button" value="'+ calcTextoBotao +'" onClick="';
        botao += 'var obj = document.getElementById(\'calculador_transferir\');';
	botao += 'if (obj.style.display == \'none\')';
        botao += '  obj.style.display = \'block\';';
	botao += 'else';
	botao += '  obj.style.display = \'none\';"';
	botao += '></p>';

	return botao;
}

function CriarCalculador ()
{
	
	var dc = '';
	
	// Verifica se inicia visivel ou escondido
	var visivel = 'none';
	if (calcVisivel)
		visivel = 'block';

	// Inicia o DIV 
	dc += '<div id="calculador_transferir" style="background-color: '+ calcCorFundo +'; display: '+ visivel +';';
	dc += 'position: absolute; z-index:2; left:'+ calcPosLeft +'px; top:'+ calcPosTop +'px;">';
	dc += '<table width="'+ calcTamanho +'" style="border: 1px solid '+ calcCorBorda +'" border="1">';

	// Opcao 1
	dc += '<tr><td class="c">Calculador de Vuelo</td></tr>';
	dc += '<tr><th style="text-align: left;"> <a href="#" onClick="var obj = document.getElementById(\'PCD\'); if (obj.style.display == \'none\') obj.style.display = \'block\'; else obj.style.display = \'none\';"> 1. A tus propias Coordenadas </a></th></tr>';

	// CD
	dc += '<tr><th>';
	dc += '<table id="PCD" style="display: none" width="100%" border="0">';
	dc += '<tr><td width="80%">Porcentaje de Velocidad: </td><td><input type="text" id="pcd_porc" size="4"></td></tr>';
	dc += '<tr><td width="80%">Velocidad de la nave mas lenta: </td><td><input type="text" id="pcd_velo" size="4"></td></tr>';
	dc += '<tr><td width="80%">Tiempo de Vuelo<span id="pcd_hor"></span>:<span id="pcd_min"></span>:<span id="pcd_seg"></span></td><td>';
	dc += '<input type="button" value="Calcular" onClick="';
	dc += 'var porcentagem = document.getElementById(\'pcd_porc\').value;';
	dc += 'var velocidade = document.getElementById(\'pcd_velo\').value;';
	
	// Formula
	dc += 'var res = Math.round((10 + ((35000/porcentagem) * Math.sqrt(1000005/velocidade))));';

	// Calculo das horas
	dc += 'var hor = parseInt(res / 3600);';
	dc += 'var min = parseInt((res / 60) - (hor * 60));';
	dc += 'var seg = res - ((hor * 3600) + (min * 60));';

	dc += 'document.getElementById(\'pcd_hor\').innerHTML = hor;';
	dc += 'document.getElementById(\'pcd_min\').innerHTML = min;';
	dc += 'document.getElementById(\'pcd_seg\').innerHTML = seg;';
	dc += '"></td></tr></table>';
	dc += '</th></tr>';


 	// Opcao 2
	dc += '<tr><th style="text-align: left;"><a href="#" onClick="var obj = document.getElementById(\'MSS\'); if (obj.style.display == \'none\') obj.style.display = \'block\'; else obj.style.display = \'none\';"> 2. AL mismo Sistema Solar </a></th></tr>';
	
	// Mesmo Sistema Solar
	dc += '<tr><th>';
	dc += '<table id="MSS" style="display: none" width="100%" border="0">';
	dc += '<tr><td width="80%">Porcentaje de Velocidad:</td><td><input type="text" id="mss_porc" size="4"></td></tr>';
	dc += '<tr><td width="80%">Velocidad de la nave mas lenta:</td><td><input type="text" id="mss_velo" size="4"></td></tr>';
	dc += '<tr><td width="80%">Planetas de Distancias: </td><td><input type="text" id="mss_plan" size="4"></td></tr>';
	dc += '<tr><td width="80%">Tiempo de Vuelo: <span id="mss_hor"></span>:<span id="mss_min"></span>:<span id="mss_seg"></span></td><td>';
	dc += '<input type="button" value="Calcular" onClick="';
	dc += 'var porcentagem = document.getElementById(\'mss_porc\').value;';
	dc += 'var velocidade = document.getElementById(\'mss_velo\').value;';
	dc += 'var planetas = document.getElementById(\'mss_plan\').value;';
	
	// Formula
	dc += 'var res = Math.round((10 + ((35000/porcentagem) * Math.sqrt(((1000000+(planetas*5000))/velocidade)))));';
	

	// Calculo das horas
	dc += 'var hor = parseInt(res / 3600);';
	dc += 'var min = parseInt((res / 60) - (hor * 60));';
	dc += 'var seg = res - ((hor * 3600) + (min * 60));';

	dc += 'document.getElementById(\'mss_hor\').innerHTML = hor;';
	dc += 'document.getElementById(\'mss_min\').innerHTML = min;';
	dc += 'document.getElementById(\'mss_seg\').innerHTML = seg;';
	dc += '"></td></tr></table>';
	dc += '</th></tr>';


	// Opcao 3
	dc += '<tr><th style="text-align: left;"><a href="#" onClick="var obj = document.getElementById(\'MG\'); if (obj.style.display == \'none\') obj.style.display = \'block\'; else obj.style.display = \'none\';"> 3. A la misma Galaxia </a></th></tr>';

	// Mesma Galaxia
	dc += '<tr><th>';
	dc += '<table id="MG" style="display: none" width="100%" border="0">';
	dc += '<tr><td width="80%">Porcentaje de Velocidad: </td><td><input type="text" id="mg_porc" size="4"></td></tr>';
	dc += '<tr><td width="80%">Velocidad de la nave mas lenta: </td><td><input type="text" id="mg_velo" size="4"></td></tr>';
	dc += '<tr><td width="80%">Sistemas de Distancia: </td><td><input type="text" id="mg_sist" size="4"></td></tr>';
	dc += '<tr><td width="80%">Tiempo de Vuelo: <span id="mg_hor"></span>:<span id="mg_min"></span>:<span id="mg_seg"></span></td><td>';
	dc += '<input type="button" value="Calcular" onClick="';
	dc += 'var porcentagem = document.getElementById(\'mg_porc\').value;';
	dc += 'var velocidade = document.getElementById(\'mg_velo\').value;';
	dc += 'var sistemas = document.getElementById(\'mg_sist\').value;';

	// Formula
	dc += 'var res = Math.round((10 + ((35000/porcentagem) * Math.sqrt(((2700000+(sistemas*95000))/velocidade)))));';
	
	// Calculo das horas
	dc += 'var hor = parseInt(res / 3600);';
	dc += 'var min = parseInt((res / 60) - (hor * 60));';
	dc += 'var seg = res - ((hor * 3600) + (min * 60));';

	dc += 'document.getElementById(\'mg_hor\').innerHTML = hor;';
	dc += 'document.getElementById(\'mg_min\').innerHTML = min;';
	dc += 'document.getElementById(\'mg_seg\').innerHTML = seg;';
	dc += '"></td></tr></table>';
	dc += '</th></tr>';


	// Opcao 4
	dc += '<tr><th style="text-align: left;"><a href="#" onClick="var obj = document.getElementById(\'EG\'); if (obj.style.display == \'none\') obj.style.display = \'block\'; else obj.style.display = \'none\';"> 4. A otras Galaxias </a></th></tr>';

	// Entre Galaxias
	dc += '<tr><th>';
	dc += '<table id="EG" style="display: none" width="100%" border="0">';
	dc += '<tr><td width="80%">Porcentaje de Velocidad: </td><td><input type="text" id="eg_porc" size="4"></td></tr>';
	dc += '<tr><td width="80%">Velocidad de la nave mas lenta:  </td><td><input type="text" id="eg_velo" size="4"></td></tr>';
	dc += '<tr><td width="80%">Galaxias de Distancia: </td><td><input type="text" id="eg_gala" size="4"></td></tr>';
	dc += '<tr><td width="80%">Tiempo de Vuelo: <span id="eg_hor"></span>:<span id="eg_min"></span>:<span id="eg_seg"></span></td><td>';
	dc += '<input type="button" value="Calcular" onClick="';
	dc += 'var porcentagem = document.getElementById(\'eg_porc\').value;';
	dc += 'var velocidade = document.getElementById(\'eg_velo\').value;';
	dc += 'var galaxias = document.getElementById(\'eg_gala\').value;';

	// Formula
	dc += 'var res = Math.round((10 + ((35000/porcentagem) * Math.sqrt(((galaxias*20000000))/velocidade))));';

	// Calculo das horas
	dc += 'var hor = parseInt(res / 3600);';
	dc += 'var min = parseInt((res / 60) - (hor * 60));';
	dc += 'var seg = res - ((hor * 3600) + (min * 60));';
	
	dc += 'document.getElementById(\'eg_hor\').innerHTML = hor;';
	dc += 'document.getElementById(\'eg_min\').innerHTML = min;';
	dc += 'document.getElementById(\'eg_seg\').innerHTML = seg;';
	dc += '"></td></tr></table>';
	dc += '</th></tr>';

	// Fecha o DIV 
	dc += '</table></div>';
	
	return dc;
}

function InserirBotaoCalculador ()
{
	// Pega todos os links da pagina
	var a_links = document.getElementsByTagName('a');

	// Para cada link
	for (i in a_links)
	{
		var link = a_links[i];
	
		// Verifica se possui o attributo href	
		if (link.href)
		{
			// Se possuir, verifica se eh o link para renomear o planeta
			// Com isso identificamos um elemento para que posicionemos
			// o botao que ira mostrar o calculador e o proprio calculador
			if (link.href.indexOf('renameplanet') != -1)
			{
				// Pega o conteudo HTML do noh mais acima do link (no caso eh um table cell)
				var html = link.parentNode.innerHTML;
	
				// Adiciona o Botao que mostrarah o Calculador
				html += CriarBotaoCalculador();
				// Adiciona o Calculador
				html += CriarCalculador();
				
				// Insere no HTML
				link.parentNode.innerHTML = html;
			}
		}
	}		
}

// Executa o script 
InserirBotaoCalculador();

// ==UserScript==
// @name            Ogame - Espionajes sin puntos para ORP
// @namespace       http://www.ogame.com.es
// @description     Quita el punto de los reportes de espionaje para poder utilizarlos con el ORP
// @include         http://*/game/bericht.php?session=*

var td_tags = document.getElementsByTagName("td");
for (i=2;i<td_tags.length;i++) {
	if (td_tags[i].innerHTML.indexOf('Actividad') == -1) {
		var td_tag_new_val = td_tags[i].innerHTML.replace(/\./g,'');
		td_tags[i].textContent = td_tag_new_val;
	}	
}	

// ==UserScript==
// @name           OGame Pantalla de Recursos Ampliada de Shuko para la v 0.77c
// @author         Shuko
// @date           03-11-2007
// @namespace      Creada por Emilio, modificada por Shuko, ampliada por Jose y modificada de nuevo por Shuko
// @description    Pantalla de Recursos Ampliada (Produccion Total).
// @include        http://*.ogame.com.es/game/index.php?page=resources*
// ==/UserScript==

// Script original: http://userscripts.org/scripts/show/13479
// Modificado por Shuko para reducir alguna caracteristica
// Agregado el 03-11-2007
// Pantalla de Recursos Ampliada, muestra una tabla mÃ¡s con el total de recursos de todas las colonias.
// Para su uso se debe de pasar por la pantalla de recursos de todos los planeta y asi actualizar las cookies que contienen los datos acumulados de las colonias.
// Este script crea dos cookies:
//		Cookie planetas:  el valor de esta cookie es una cadena con todos las coordenadas de los planetas
//		Cookie recursos:  contiene el valor acumulativo del recurso metal,cristal y deuterio.
// Las cookies son idependientes en cada universo, por tanto se puede tener varios universos abiertos perfectamente.

// Agradecimientos a Jose por la ampliacion del mio

//Revisado por Shuko el 03-11-2007:
//Eliminado el movimiento de las barras y reducidos los porcentajes a enteros (sin los dos decimales que incluye Jose)

//Revisado por Jose 3-11-2007: 
//			- Modificacion general en las cookies, siguen siendo dos pero ahora almacenar todos los recursos diarios de los planetas.
//			- Modificado para que no incluya lunas.
//			- Arreglado para que no falle cuando no hay nigun planeta agregado o se este en la luna.
//			- Implementado la deteccion del borrado del algun planeta y lo elimina de las estadisticas de produccion.
//			- Actualizacion correcta de los cambios de produccion subida de minas o por cambios de energia o de produccion
//			- Implementada animacion en las barras de porcentajes. (Movimiento)
//Revisado por Jose 1-11-2007: 
//			- Corregido el error de los recursos sobrelimite.
//			- Formato de % con dos decimales.
//Revisado por Jose 31-10-2007: 
//			- Pasa a tener dos cookies; planetas y recursos

	function formatNmb(numero){
	   var nNmb = String(numero); 
	   var sRes = "";
	   for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++)
	   		sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;
		return sRes;
	}
   
	function SetCookie (name, value){
		var argv = SetCookie.arguments;
		var argc = SetCookie.arguments.length;
		var expires = (2 < argc) ? argv[2] : null;
		var path = (3 < argc) ? argv[3] : null;
		var domain = (4 < argc) ? argv[4] : null;
		var secure = (5 < argc) ? argv[5] : false;
	
		document.cookie = name + "=" + escape (value) +
		((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
		((path == null) ? "" : ("; path=" + path)) +
		((domain == null) ? "" : ("; domain=" + domain)) +
		((secure == true) ? "; secure" : "");
	}

	function getCookieVal (offset){
		var endstr = document.cookie.indexOf (";", offset);
		if (endstr == -1)
			endstr = document.cookie.length;
		return unescape(document.cookie.substring(offset, endstr));	
	}

	function GetCookie (name){
		var arg = name + "=";
		var alen = arg.length;
		var clen = document.cookie.length;
		var i = 0;
		while (i < clen){
			var j = i + alen;
			if (document.cookie.substring(i, j) == arg)
				return getCookieVal (j);
			i = document.cookie.indexOf(" ", i) + 1;
			if (i == 0) 
				break; 
		}
		return null;
	}


padre = document.getElementById('content');
recursos = document.getElementById('resources');
var T_Recursos = padre.getElementsByTagName("td");
var T_Recursos2 = recursos.getElementsByTagName("td");
var Metal = T_Recursos2[10].innerHTML.replace(/\./g,'');
var Cristal = T_Recursos2[11].innerHTML.replace(/\./g,'');
var Deut = T_Recursos2[12].innerHTML.replace(/\./g,'');

var PMetal = T_Recursos[10].innerHTML.replace(/\./g,'');
var PCristal = T_Recursos[11].innerHTML.replace(/\./g,'');
var PDeut = T_Recursos[12].innerHTML.replace(/\./g,'');

PMetal=eval(PMetal);
PCristal=eval(PCristal);
PDeut=eval(PDeut);

var AlmM = T_Recursos[5].innerHTML.replace(/\./g,'');
var AlmC = T_Recursos[6].innerHTML.replace(/\./g,'');
var AlmD = T_Recursos[7].innerHTML.replace(/\./g,'');

AlmM = AlmM.replace(/k/,'000');
AlmC = AlmC.replace(/k/,'000');
AlmD = AlmD.replace(/k/,'000');

/*
	ELIMINADO DEL CODIGO -  ERROR CUANDO SE PASABA ALGUN RECURSO DEL LIMITE DE ALMACENADO
if (Metal.indexOf('<font color')!=-1) {
	Metal = Metal.substring(57, Metal.indexOf('</font'));
}
if (Cristal.indexOf('<font color')!=-1) {
	Cristal = Cristal.substring(57, Cristal.indexOf('</font'));
}
if (Deut.indexOf('<font color')!=-1) {
	Deut = Deut.substring(57, Deut.indexOf('</font'));
}
*/

if (PMetal.indexOf('<font color')!=-1) {
	PMetal = PMetal.substring(57, PMetal.indexOf('</font'));
}
if (PCristal.indexOf('<font color')!=-1) {
	PCristal = PCristal.substring(57, PCristal.indexOf('</font'));
}
if (PDeut.indexOf('<font color')!=-1) {
	PDeut = PDeut.substring(57, PDeut.indexOf('</font'));
}

if (AlmM.indexOf('<font color')!=-1) {
	AlmM = AlmM.substring(22, AlmM.indexOf('</font'));
}
if (AlmC.indexOf('<font color')!=-1) {
	AlmC = AlmC.substring(22, AlmC.indexOf('</font'));
}
if (AlmD.indexOf('<font color')!=-1) {
	AlmD = AlmD.substring(22, AlmD.indexOf('</font'));
}


var XMetal = new Array(3);
var XCristal = new Array(3);
var XDeut = new Array(3);

XMetal[0] = PMetal * 24;
XCristal[0] = PCristal * 24;
XDeut[0] = PDeut * 24;
XMetal[1] = PMetal * 168;
XCristal[1] = PCristal * 168;
XDeut[1] = PDeut * 168;
XMetal[2] = PMetal * 720;
XCristal[2] = PCristal * 720;
XDeut[2] = PDeut * 720;

// Buscar Formulario de Recursos

var ResFormC, T_Form, ResForm;
ResFormC = document.getElementsByTagName('table');

for (var i = 0; i < ResFormC.length; i++) {
	
	T_Form = ResFormC[i];
	if (T_Form.getAttribute('width') == '550') {
		ResForm = T_Form;
	}
}

// Buscar Factor de Produccion
var T_Factor = /factor(.)*\:(.)*[0-9.]/gi.exec(document.body.innerHTML);

var Factor, FactorPorc;
if (T_Factor.length) {
	Factor=T_Factor[0].split(":");
	Factor=parseFloat(Factor[1]) * 100;
	FactorPorc=parseInt(parseFloat(Factor) * 2.5);
}

//Ampliacion
var header_top = document.getElementById('header_top');
var planeta_coord = header_top.getElementsByTagName("select");

	//Obtenmos las coordenadas de los planetas actuales
var planetas_actuales = planeta_coord[0].options;
var tmp = new Array(planetas_actuales.length);
for (var i=0; i<planetas_actuales.length; i++){
	tmp[i]= planeta_coord[0].options[i].text;
	tmp[i] = tmp[i].split ("[");
	tmp[i] = tmp[i][1].split ("]");
	tmp[i] = tmp[i][0].split (",");
}
planetas_actuales=tmp;
planetas_actuales= planetas_actuales.sort();

	//Obtenemos el planeta seleccionado, las coordenadas
var planeta = new Array(2);
planeta = planeta_coord[0].options[planeta_coord[0].selectedIndex].text;
planeta = planeta.split ("[");
planeta = planeta[1].split ("]");
planeta = planeta[0].split (",");
var tmppp=planeta;
planeta = new Array(2);
planeta[0] = 1;
planeta[1] = tmppp;

	//Produccion por hora del planeta seleccionado
var recurso = new Array(3);
recurso[0] = 1;
recurso[1] = PMetal;
recurso[2] = PCristal;
recurso[3] = PDeut;

var planetas; //valor de la cookie planetas con un array con todos los planetas aÃ±adidos
var recursos; //array con los recursos diarios de los planetas aÃ±adidos

//Si no exiten las cookies, las creamos y aÃ±adimos el planeta si este no es una luna
if(GetCookie("planetas") == null){
	// comprobamos que no sea una luna, metal y deuterio a cero
	if(recurso[1]!="0" && recurso[2]!="0"){
		SetCookie ('planetas', planeta);
		SetCookie ('recursos', recurso);
	}
}else{

	planetas = GetCookie("planetas");
	planetas = planetas.split (",");
	recursos = GetCookie("recursos");
	recursos = recursos.split (",");

// varibles temporales para la comparacion de planetas actuales con los guardados en las cookies
var tmp_planetas;
var tmp_recursos_planetas;
// las cookie comienza con un 1, para qeu siempre se tenga en als cookies arrays
	tmp_planetas = new Array();
	tmp_planetas[0]=1;
	tmp_recursos_planetas = new Array(recursos.length-3);
	tmp_recursos_planetas[0]=1;

	//Poner a los planetas eliminados una cadena eliminar.
	for (var i=1; i<planetas.length; i++){
		for (var j=0; j<planetas_actuales.length; j++){
			if(planetas[i] == planetas_actuales[j]){
				j=planetas_actuales.length;
			}else{
				//si no existe el planeta y ya ha terminado de pasar por todo el array, borramos el planeta
				if((j+1) == planetas_actuales.length){
					planetas[i]="eliminar"; // cambia las coordenas por una cadena con el contenido "elimiar"
				}
			}
		}
	}
	
	//Nuevo array con los planetas correctos y sus recursos correctos
	var cont=1;
	for (var i=1; i<planetas.length; i++){
			if(planetas[i]!="eliminar"){
					tmp_planetas[cont]=planetas[i];
					tmp_recursos_planetas[cont+((cont-1)*2)]=recursos[i+((i-1)*2)];
					tmp_recursos_planetas[cont+((cont-1)*2)+1]=recursos[i+((i-1)*2)+1];
					tmp_recursos_planetas[cont+((cont-1)*2)+2]=recursos[i+((i-1)*2)+2];
					cont++;
			}
	}
	
	// actualizamos los array planetas y recursos
	planetas=tmp_planetas;
	recursos=tmp_recursos_planetas;
	
	// Comprobamos los cambios del a producion del planeta seleccionado para una posible actualizacion.
	for (var t=1; t<planetas.length; t++){
		if(planetas[t]==planeta[1]){
			// comprobamos que no sea una luna, metal y deuterio a cero
			if(recurso[1]!="0" && recurso[2]!="0"){
				if(recursos[t+((t-1)*2)]!=recurso[1]){
					recursos[t+((t-1)*2)]=recurso[1];
				}
				if(recursos[t+((t-1)*2)+1]!=recurso[2]){
					recursos[t+((t-1)*2)+1]=recurso[2];
				}
				if(recursos[t+((t-1)*2)+2]!=recurso[3]){
					recursos[t+((t-1)*2)+2]=recurso[3];
				}
			}
		}
	}
	
	// guardamos los cambios
	SetCookie ('planetas', planetas);
	SetCookie ('recursos', recursos);


	planetas = GetCookie("planetas");
	planetas = planetas.split (",");
	recursos = GetCookie("recursos");
	recursos = recursos.split (",");
	
	//Para aÃ±adir un nuevo planeta
	for (var i=1; i<planetas.length; i++){
		//si exite el planeta finalizamos el for
		if(planetas[i] == planeta[1]){
			i=planetas.length;
		}else{
			//si no existe el planeta y ya ha terminado de pasar por todo el array, aÃ±adimos el planeta
			if((i+1) == planetas.length){
				// comprobamos que no sea una luna, metal y deuterio a cero
				if(recurso[1]!="0" && recurso[2]!="0"){
				planetas[i+1] = planeta[1];
				recursos[i+1+(i*2)]=recurso[1];
				recursos[i+1+(i*2)+1]=recurso[2];
				recursos[i+1+(i*2)+2]=recurso[3];
				SetCookie ('planetas', planetas);
				SetCookie ('recursos', recursos);
				}
			}
		}
	}
	

}

//planetas = GetCookie("planetas");
//planetas = planetas.split (",");
//recursos = GetCookie("recursos");
//recursos = recursos.split (",");

// Agregar tabla de factor de produccion
if (ResForm) {
	// Buscar Produccion Real

	// Procesar Tablas
	var ProdFact = document.createElement('div');

	ProdFact.innerHTML = '<table width="550"><tr>'+'<th>Nivel de Producci&oacute;n</th>'+'<th width="100" id="factor_P">'+Factor+'%</th>'+'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div id="factorP" style="background-color: '+(Factor < 100 ? '#C00000' : '#00C000' )+'; width: '+FactorPorc+'px;">&nbsp;</div></div></th>'+'</tr></table><br />';
	
	var CuentaRec = document.createElement('div');

// comprobamos que no sea una luna, metal y deuterio a cero
	if(recurso[1]!="0" && recurso[2]!="0"){
// si es una luna, no mostramos la tabla de produccion extendida
	CuentaRec.innerHTML = '<br /><table width="550">'+'<tr><td class="c" colspan="4">Producci&oacute;n extendida</td></tr>'+'<tr>'+'<td class="c">&nbsp;</td>'+'<th>Diaria</th>'+'<th>Semanal</th>'+'<th>Mensual</th>'+'</tr>'+'<tr>'+'<td class="c">Metal</td>'+'<th><font color="#00ff00">'+formatNmb(XMetal[0])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XMetal[1])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XMetal[2])+'</font></th>'+'</tr>'+'<tr>'+'<td class="c">Cristal</td>'+'<th><font color="#00ff00">'+formatNmb(XCristal[0])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XCristal[1])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XCristal[2])+'</font></th>'+'</tr>'+'<tr>'+'<td class="c">Deuterio</td>'+'<th><font color="#00ff00">'+formatNmb(XDeut[0])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XDeut[1])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XDeut[2])+'</font></th>'+'</tr>'+'</table><br />';

	}else{
		CuentaRec.innerHTML = '<br />';
	}

	Metal=eval(Metal);
	Metal=parseInt(Metal);
	Cristal=eval(Cristal);
	Cristal=parseInt(Cristal);
	Deut=eval(Deut);
	Deut=parseInt(Deut);

	
	var EAlmM=(Metal / AlmM) * 100;
	var EAlmMPorc=parseInt((Metal / AlmM) * 250);
	var EAlmC=(Cristal / AlmC) * 100;
	var EAlmCPorc=parseInt((Cristal / AlmC) * 250);
	var EAlmD=(Deut / AlmD) * 100;
	var EAlmDPorc=parseInt((Deut / AlmD) * 250);


	EAlmM = Math.round(EAlmM);
	EAlmC = Math.round(EAlmC);
	EAlmD = Math.round(EAlmD);


	var LlenoM=0;
	var LlenoC=0;
	var LlenoD=0;
	
	if (Metal>AlmM) 
		LlenoM=1;
	if (Cristal>AlmC) 
		LlenoC=1;
	if (Deut>AlmD) 
		LlenoD=1;


McadaSeg=PMetal/3600;
CcadaSeg=PCristal/3600;
DcadaSeg=PDeut/3600;


if ((LlenoM)||(PMetal==0)) segundosM=0
else segundosM=(AlmM-Metal)/McadaSeg;

if ((LlenoC)||(PCristal==0)) segundosC=0
else segundosC=(AlmC-Cristal)/CcadaSeg;

if ((LlenoD)||(PDeut==0)) segundosD=0
else segundosD=(AlmD-Deut)/DcadaSeg;



minutos=segundosM/60;
horas=minutos/60;
dias=horas/24;


tiemMd=dias-dias%1;
tiemMh=(horas-horas%1)-((dias-dias%1)*24);
tiemMm=(minutos-minutos%1)-((horas-horas%1)*60);
tiemMs=segundosM%60-segundosM%1;


minutos=segundosC/60;
horas=minutos/60;
dias=horas/24;


tiemCd=dias-dias%1;
tiemCh=(horas-horas%1)-((dias-dias%1)*24);
tiemCm=(minutos-minutos%1)-((horas-horas%1)*60);
tiemCs=segundosC%60-segundosC%1;


minutos=segundosD/60;
horas=minutos/60;
dias=horas/24;


tiemDd=dias-dias%1;
tiemDh=(horas-horas%1)-((dias-dias%1)*24);
tiemDm=(minutos-minutos%1)-((horas-horas%1)*60);
tiemDs=segundosD%60-segundosD%1;


	CuentaRec.innerHTML += '<table width="550">'+
'<tr><td class="c" colspan="3">Estado de los Almacenes</td></tr>'+
'<tr>'+
'<th id="alm_M">Metal ('+EAlmM+'%)</th>'+
'<th>'+tiemMd+'dias '+tiemMh+'h '+tiemMm+'m '+tiemMs+'s </th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div id="almM" style="background-color: '+(EAlmM > 99.99 ? '#C00000' : '#00C000')+'; width: '+(EAlmMPorc > 250 ? 250 : EAlmMPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'<tr>'+
'<th id="alm_C">Cristal ('+EAlmC+'%)</th>'+
'<th>'+tiemCd+'dias '+tiemCh+'h '+tiemCm+'m '+tiemCs+'s </th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div id="almC" style="background-color: '+(EAlmC > 99.99 ? '#C00000' : '#00C000' )+'; width: '+(EAlmCPorc > 250 ? 250 : EAlmCPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'<tr>'+
'<th id="alm_D">Deuterio ('+EAlmD+'%)</th>'+
'<th>'+tiemDd+'dias '+tiemDh+'h '+tiemDm+'m '+tiemDs+'s </th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div id="almD" style="background-color: '+(EAlmD > 99.99 ? '#C00000' : '#00C000' )+'; width: '+(EAlmDPorc > 250 ? 250 : EAlmDPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'</table><br />';



//Tabla de la ampliacion con los recursos totales de los planetas sumados

if(GetCookie("planetas") == null){
	
	// comprobamos que no sea una luna, metal y deuterio a cero
	if(recurso[1]!="0" && recurso[2]!="0"){
		CuentaRec.innerHTML += '<table width="550">'+'<tr><td class="c" colspan="4">Producci&oacute;n Total de 0 planetas</td></tr><tr><td  class="c" colspan="4">No tiene aÃ±adido ningun planeta, vaya a la pantalla de los recursos de los planetas</td></tr></table><br />';
	}else{
		CuentaRec.innerHTML += '<table width="550">'+'<tr><td class="c" colspan="4">Producci&oacute;n Total</td></tr><tr><td  class="c" colspan="4">Esta usted en una Luna y esta no produce.</td></tr></table><br />';
	}
	
}else{

	planetas_format = GetCookie("planetas");
	planetas_format = planetas_format.split (",");
	planetas_format= planetas_format.sort();
	planetas_format_final="";

	for (var i=1; i<planetas_format.length; i++){
		planetas_format_final+='['+planetas_format[i]+'] ';
	}
	
	planetas_recursos = GetCookie("recursos");
	planetas_recursos = planetas_recursos.split (",");
	planetas_recursos_metal=0;
	planetas_recursos_cristal=0;
	planetas_recursos_deuterio=0;
	
	// Suma de los recuros diarios de cada planeta
	for (var i=1; i<planetas_recursos.length; i++){
		if(i%3 == 1){
		planetas_recursos_metal=planetas_recursos_metal+parseInt(planetas_recursos[i]);
		}
		if(i%3 == 2){
		planetas_recursos_cristal=planetas_recursos_cristal+parseInt(planetas_recursos[i]);
		}
		if(i%3 == 0){
		planetas_recursos_deuterio=planetas_recursos_deuterio+parseInt(planetas_recursos[i]);
		}
	}
	
	
	CuentaRec.innerHTML += '<table width="550">'+'<tr><td class="c" colspan="4">Producci&oacute;n Total de '+(planetas_format.length-1)+' planetas</td></tr><tr><td class="c">Planetas</td><td class="c" colspan="3">'+planetas_format_final+'</td></tr>'+'<tr>'+'<td class="c">&nbsp;</td>'+'<th>Diaria</th>'+'<th>Semanal</th>'+'<th>Mensual</th>'+'</tr>'+'<tr>'+'<td class="c">Metal</td>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_metal*24)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_metal*168)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_metal*720)+'</font></th>'+'</tr>'+'<tr>'+'<td class="c">Cristal</td>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_cristal*24)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_cristal*168)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_cristal*720)+'</font></th>'+'</tr>'+'<tr>'+'<td class="c">Deuterio</td>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_deuterio*24)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_deuterio*168)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_deuterio*720)+'</font></th>'+'</tr>'+'</table><br />';


}

	ResForm.parentNode.insertBefore(CuentaRec, ResForm.nextSibling);
	ResForm.parentNode.insertBefore(ProdFact, ResForm);
	document.body.innerHTML = document.body.innerHTML.replace(/factor de producci(.)+n\:(.)*[0-9.]/gi,'');

}

// Autor: ..:: NU ::.. -- modificado por BlackRaist
// Fecha de modificacion: 24/01/07

// ==UserScript==
// @name OGame Overview Local Time
// @namespace OGame Overview Local Time
// @description AÃ±ade la hora local debajo de la hora del server. 
// @include http://ogame*.de/*
// @include  http://*.gfsrv.*/
// @include http://uni*.ogame.com.es/*
// @exclude  
// ==/UserScript==


//Verificamos si esta abierta en el frame principal la pagina de vision general.
if(document.baseURI.indexOf("/index.php?page=overview") != -1) {

   var nodo = document.evaluate("/html/body/div/center/table[last()]/tbody/tr[th[2]]/th[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
   //var dias = new Array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
   //var meses = new Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
   var dias = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
   var meses = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');

   var date = new Date();
   var mes = date.getMonth();
   var dia = date.getDay();
   var diaNum = date.getDate();
   var hora = date.getHours();
   var mins = date.getMinutes();
   var segs = date.getSeconds();

   var fecha = nodo.innerHTML.match(/(\S\S\S) (\S\S\S) (\d+) (\d+)(:\d\d:\d\d)/);
   var fechaLocal = dias[dia] + " " + meses[mes] + " " + diaNum + " " + hora + ((mins < 10) ? ":0" : ":") + mins + ((segs < 10) ? ":0" : ":") + segs;

   var nodoLocal = nodo.parentNode.cloneNode(true);
   nodo.parentNode.parentNode.insertBefore(nodoLocal, nodo.parentNode.nextSibling);
   nodoLocal.innerHTML = "<th>Hora local</th><th colspan='3' id='ClockLocal'>" + fechaLocal + "</th>";
}

// VersiÃ³n 0.3
// 20070912

// ==UserScript==
// @name           OGame - Ranking en galaxia
// @author				 FryGuy - ogame.com.es - uni7
// @namespace      http://userscripts.org/scripts/show/12154
// @include        http://*.ogame.*/game/*
// ==/UserScript==

const cnst_ranking = ' en el ranking ';
const cnst_posicion = ' en la posiciÃ³n ';

// Removes leading whitespaces
function LTrim( value ) {
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
}

// Removes ending whitespaces
function RTrim( value ) {
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
}

// Removes leading and ending whitespaces
function trim( value ) {return LTrim(RTrim(value))}

function locate(xpath, xpres) {
	return document.evaluate(xpath, document, null, xpres, null);
}

function locateFirst(xpath) {
	// gracias SpitFire: http://userscripts.org/scripts/show/8555
	return locate(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
}

(function(){

	if (location.href.search('galaxy') != -1 ) {
		//agregar el rango como parte del nombre
		var sMember;
		var iRank;
		var sTemp;
		
		var gTable = locateFirst('//div[@id="content"]/center/center/table').childNodes[1];
		//gTable.firstChild.childNodes[1].setAttribute('colSpan', '9');
		
		var p = document.createElement("td");
		p.setAttribute('class', 'c');
		p.innerHTML = 'EstadÃ­sticas';
		gTable.childNodes[2].appendChild(p);
		
		var publi = gTable.getElementsByTagName("tr");
		for (var i = 2; i < publi.length - 2; i++) {
			//alert(publi.length + '<br>' + i + '<br>' + publi[i].innerHTML);
			var p = document.createElement("th");
			p.setAttribute('style', 'white-space: nowrap;');
			publi[i].appendChild(p);
		};
		
		publi = document.getElementsByTagName ('th');
		for (i = 0; i < publi.length; i++) {
			p = publi[i].parentNode.lastChild;
			
			// es el nombre del jugador
			if ((publi[i].width == 150) && (publi[i].innerHTML.length > 100)) {
				sMember = publi[i].getElementsByTagName('span')[0].innerHTML;
				sTemp = publi[i].innerHTML.search(sMember) + sMember.length + cnst_ranking.length;
				iRank = publi[i].innerHTML.slice(sTemp, publi[i].innerHTML.search('</td>'));

				p.innerHTML = 'J: <font color=\'#FFDAB9\'>' + iRank + '</font>';
			}
			
			// es el nombre de la alianza
			if ((publi[i].width == 80) && (publi[i].innerHTML.length > 100)) {
				sMember = LTrim(RTrim(publi[i].getElementsByTagName('a')[0].innerHTML));
				if (sMember.search('class') != -1) sMember = LTrim(RTrim(publi[i].getElementsByTagName('a')[0].childNodes[1].innerHTML));
				// si estÃ¡ instalado algÃºnm script que agrega informaciÃ³n a la alianza entre ()
				if (sMember.search('[\(]') != -1) sMember = RTrim(sMember.substring(0, sMember.search('[\(]')));
				sTemp = publi[i].innerHTML.search(sMember) + sMember.length + cnst_posicion.length;
				iRank = publi[i].innerHTML.slice(sTemp, publi[i].innerHTML.search(' con '));

				p.innerHTML += ' A: <font color=\'#FFDAB9\'>' + iRank + '</font>';
			}
		}
		
		// colspan para los encabezados y pie de la tabla
		publi = document.getElementsByTagName('td');
		for (i = publi.length - 1; i >= 0; i--) {
			if (publi[i].hasAttribute('colspan') && publi[i].hasAttribute('class')){
				if (publi[i].getAttribute('class') == 'c') {
					if (publi[i].getAttribute('colspan') == '8') publi[i].setAttribute('colspan', '9');
					else if (publi[i].getAttribute('colspan') == '2') publi[i].setAttribute('colspan', '3');
				}
			}
		}
		
		// colspan para las filas de estado 
		publi = document.getElementById('fleetstatusrow');
		publi.firstChild.setAttribute('colspan', '9');
		//publi.setAttribute('colspan', '9');
	}

})();

// ==UserScript==
// @name           Ogame manzanasfrescas 2
// @author         mohace
// @date           18-09-2007
// @version        0.3
// @namespace     
// @description    Crea links desde la galaxia ogame (nuevo icono) a manzanasfrescas.
// @include        http://*.ogame.*/game/index.php?page=galaxy*
// ==/UserScript==

// Editar esta instruccion poniendo el universo en el cual jugamos.
var uni = 8
// Editar esta instruccion poniendo la preferencia de las estadisticas a ver en forma predeterminada, 7, 30 o 90 dias (entre las comillas)
var dias = '30'

// Para averiguar el userID de los jugadores
var d_Snapshot = document.evaluate('//th/a/img', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

// Rutina principal
for ( var i=0 ; i < d_Snapshot.snapshotLength; i++ ) {

	if (d_Snapshot.snapshotItem(i).getAttribute('alt') == 'Escribir mensaje') { 

		var temp1 = extraer(d_Snapshot.snapshotItem(i).parentNode.getAttribute('href') + 'lim','&messageziel=','lim')
		var nuevo_a = document.createElement("a");
		nuevo_a.href ='http://www.manzanasfrescas.com/userdetails.php?startrange=0&g=' + dias + 'd&uni=' +  uni + '&id=' + temp1
		var nueva_img = document.createElement("img");
		nueva_img.src = 'http://www.manzanasfrescas.com/favicon.ico';
		nuevo_a.appendChild(nueva_img);
		d_Snapshot.snapshotItem(i).parentNode.parentNode.appendChild(nuevo_a);
		
	}

}

function extraer(texto, etqini, etqfin)
{
var ind0, ind1, parte ="";
ind0 = texto.indexOf(etqini);
if (ind0 >=0)
{
ind1 = texto.indexOf(etqfin);
if (ind1>ind0)
parte = texto.substring(ind0+etqini.length, ind1);
}
return parte;
}

// ==UserScript==

// @name           RecursosVolando_0.77c
// @author         elpeter
// @date           27-10-2007
// @version        0.1.3
// @namespace      http://userscripts.org/scripts/show/13299
// @description    Permite visionar en la Vision General los recursos que se encuentran "volando". (Funciona con la version 0.77c)
// @include  	  	 http://*.ogame.com.es/game/index.php?page=overview*
// ==/UserScript==

// Script original: http://userscripts.org/scripts/show/13070
// Modificado por elpeter para funcionar en la versiÃ³n 0.77c
// Agregado el 26-10-2007
// Solo se muestra cuando las naves vuelven de atacar, cuando hay recursos transportandose o desplegando y cuando los reciclas vuelven con la carga.
//
// Vers. 0.1.1
// Correguido el cartel "Recursos Robados" por "Recursos volando"
// Vers. 0.1.2
// Agregada una nueva fila con el total de recursos volando y cambio de colores en las distintas misiones.
// Vers. 0.1.3
// Modificaciones varias en el front-end del script, reestructuraciÃ³n en columnas para una mejor visiÃ³n de los recursos.

//////////////////////////////////////////////////////////////
/*
12-11-2007
Renombrado el script de "BeneficiosRobos_0.77c" a un nombre mÃ¡s adecuado: "RecursosVolando_0.77c"
*/
//////////////////////////////////////////////////////////////


var allElements, thisElement, overlib;
var allTr, thisTr, header;
var metal=0;
var cristal=0;
var deuterio=0;
var metalE=0;
var cristalE=0;
var deuterioE=0;
var metalT=0;
var cristalT=0;
var deuterioT=0;
var metalD=0;
var cristalD=0;
var deuterioD=0;
var color='#FFFFFF';
var colorE='#FFFFFF';
var colorT='#FFFFFF';
var colorD='#FFFFFF';
var colorA='#ffd700';
var activa=false;
var activaE=false;
var activaT=false;
var activaD=false;
var totalR=false;

allElements = document.getElementsByTagName('a');
for (var i = 0; i < allElements.length; i++){
	thisElement = allElements[i];

// Ataque
	if (thisElement.innerHTML.substring(0,6) == 'Atacar' || thisElement.innerHTML.substring(0,6) == 'Ataque'){
		
		overlib = thisElement.attributes.item(2);
		datos=overlib.textContent.substring(overlib.textContent.indexOf('Metal:')+7,overlib.textContent.indexOf('Cristal:')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		metal=metal+parseInt(dato);
		
		datos=overlib.textContent.substring(overlib.textContent.indexOf('Cristal:')+9,overlib.textContent.indexOf('Deuterio:')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		cristal=cristal+parseInt(dato);

		datos=overlib.textContent.substring(overlib.textContent.indexOf('Deuterio:')+10,overlib.textContent.indexOf('")')).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		deuterio=deuterio+parseInt(dato);
		
	}

// Recolectar

	if (thisElement.innerHTML.substring(0,10) == 'Recolectar'){
		
		overlib = thisElement.attributes.item(2);
		
		datos=overlib.textContent.substring(overlib.textContent.indexOf('Metal:')+7,overlib.textContent.indexOf('Cristal:')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		metalE=metalE+parseInt(dato);
		
		datos=overlib.textContent.substring(overlib.textContent.indexOf('Cristal:')+9,overlib.textContent.indexOf('Deuterio:')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		cristalE=cristalE+parseInt(dato);

		datos=overlib.textContent.substring(overlib.textContent.indexOf('Deuterio:')+10,overlib.textContent.indexOf('")')).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		deuterioE=deuterioE+parseInt(dato);
		
	}
	
//Transportes
	if (thisElement.innerHTML.substring(0,11) == 'Transportar'){
		
		overlib = thisElement.attributes.item(2);
		
		datos=overlib.textContent.substring(overlib.textContent.indexOf('Metal:')+7,overlib.textContent.indexOf('Cristal:')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		metalT=metalT+parseInt(dato);
		
		datos=overlib.textContent.substring(overlib.textContent.indexOf('Cristal:')+9,overlib.textContent.indexOf('Deuterio:')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		cristalT=cristalT+parseInt(dato);

		datos=overlib.textContent.substring(overlib.textContent.indexOf('Deuterio:')+10,overlib.textContent.indexOf('")')).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		deuterioT=deuterioT+parseInt(dato);
		
		
	}
//Despliegues
	if (thisElement.innerHTML.substring(0,9) == 'Desplegar'){
		
		overlib = thisElement.attributes.item(2);
		
		datos=overlib.textContent.substring(overlib.textContent.indexOf('Metal:')+7,overlib.textContent.indexOf('Cristal:')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		metalD=metalD+parseInt(dato);
		
		datos=overlib.textContent.substring(overlib.textContent.indexOf('Cristal:')+9,overlib.textContent.indexOf('Deuterio:')-6).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		cristalD=cristalD+parseInt(dato);

		datos=overlib.textContent.substring(overlib.textContent.indexOf('Deuterio:')+10,overlib.textContent.indexOf('")')).split(".");
		dato="";
		for (j=0; j<datos.length ; j++){
			dato+=datos[j];
		}

		deuterioD=deuterioD+parseInt(dato);
		
	}	

	
// hasta aki la obtencion de datos
}
if (metal>0 || cristal>0 || deuterio>0){
	var color='#FF0000';
	var activa=true;
	var totalR=true;
}
if (metalE>0 || cristalE>0 || deuterioE>0){
	var colorE='#cd853f';
	var activaE=true;
	var totalR=true;
}
//Transportes
if (metalT>0 || cristalT>0 || deuterioT>0){
	var colorT='#87cefa';
	var activaT=true;	
	var totalR=true;
}
//Despliegues
if (metalD>0 || cristalD>0 || deuterioD>0){
	var colorD='#adff2f';
	var activaD=true;	
	var totalR=true;
}

// sumamos los recursos que hay volando
metalA = metal+metalE+metalT+metalD;
cristalA = cristal+cristalE+cristalT+cristalD;
deuterioA = deuterio+deuterioE+deuterioT+deuterioD;

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

// Ahora creamos la tabla

if (metal>0 || cristal>0 || deuterio>0 || metalE>0 || cristalE>0 || deuterioE>0 || metalT>0 || cristalT>0 || deuterioT>0 || metalD>0 || cristalD>0 || deuterioD>0){

    
     allTr = document.getElementsByTagName('tbody');
     thisTr = allTr[5];
     if (thisTr.innerHTML.substring(9,35) == '<td class="c" colspan="4">'){
         thisTr=allTr[5];
     }
     header=thisTr.childNodes.item(4);
     if (thisTr.childNodes.item(2).innerHTML.substring(91,97) == 'Tienes'){
         header=thisTr.childNodes.item(6);
     }

	//Tabla Recursos Volando

	var recTableTd = document.createElement('td');
			recTableTd.setAttribute("colspan","4");
			
	var recTable = document.createElement('table');
			recTable.setAttribute("align","center");
			recTable.setAttribute("width","100%");
			
	var recTitleRow = document.createElement('tr');
	var recTitleCell = document.createElement('th');
	var recTitleCell2 = document.createElement('th');
	var recTitleCell3 = document.createElement('th');
	var recTitleCell4 = document.createElement('th');
	
	recTitleCell.innerHTML='';
	recTitleCell2.innerHTML='Metal';
	recTitleCell3.innerHTML='Cristal';
	recTitleCell4.innerHTML='Deuterio';
	
	var recRow = document.createElement('tr');
	var recCell = document.createElement('td');
			recCell.setAttribute("class","m");
	var recCell2 = document.createElement('th');
	var recCell3 = document.createElement('th');
	var recCell4 = document.createElement('th');
	
	recCell.innerHTML='';
	recCell2.innerHTML='';
	recCell3.innerHTML='';
	recCell4.innerHTML='';
	
	if (activa){
		recCell.innerHTML+='Robos<br>';
		recCell2.innerHTML+='<font color='+color+'>'+formatNmb(metal)+'</font><br>';
		recCell3.innerHTML+='<font color='+color+'>'+formatNmb(cristal)+'</font><br>';
		recCell4.innerHTML+='<font color='+color+'>'+formatNmb(deuterio)+'</font><br>';
	}
	if (activaE){
		recCell.innerHTML+='Escombros<br>';
		recCell2.innerHTML+='<font color='+colorE+'>'+formatNmb(metalE)+'</font><br>';
		recCell3.innerHTML+='<font color='+colorE+'>'+formatNmb(cristalE)+'</font><br>';
		recCell4.innerHTML+='<font color='+colorE+'>'+formatNmb(deuterioE)+'</font><br>';
	}
	if (activaT){
		recCell.innerHTML+='Transportes<br>';
		recCell2.innerHTML+='<font color='+colorT+'>'+formatNmb(metalT)+'</font><br>';
		recCell3.innerHTML+='<font color='+colorT+'>'+formatNmb(cristalT)+'</font><br>';
		recCell4.innerHTML+='<font color='+colorT+'>'+formatNmb(deuterioT)+'</font><br>';
	}
	if (activaD){
		recCell.innerHTML+='Despliegues<br>';
		recCell2.innerHTML+='<font color='+colorD+'>'+formatNmb(metalD)+'</font><br>';
		recCell3.innerHTML+='<font color='+colorD+'>'+formatNmb(cristalD)+'</font><br>';
		recCell4.innerHTML+='<font color='+colorD+'>'+formatNmb(deuterioD)+'</font><br>';
	}

	//Fila total recursos volando
	
	var recTotRow = document.createElement('tr');
	var recTotCell = document.createElement('td');
			recTotCell.setAttribute("class","g");
	var recTotCell2 = document.createElement('th');
	var recTotCell3 = document.createElement('th');
	var recTotCell4 = document.createElement('th');
	
	recTotCell.innerHTML='';
	recTotCell2.innerHTML='';
	recTotCell3.innerHTML='';
	recTotCell4.innerHTML='';

	if (totalR){
		recTotCell.innerHTML+='Total:<br>';
		recTotCell2.innerHTML+='<font color='+colorA+'>'+formatNmb(metalA)+'</font><br>';
		recTotCell3.innerHTML+='<font color='+colorA+'>'+formatNmb(cristalA)+'</font><br>';
		recTotCell4.innerHTML+='<font color='+colorA+'>'+formatNmb(deuterioA)+'</font><br>';
	}
	
	//Pongo las celdas dentro de las filas
	recTableTd.appendChild(recTable);
	
	recTable.appendChild(recTitleCell);
	recTable.appendChild(recTitleCell2);
	recTable.appendChild(recTitleCell3);
	recTable.appendChild(recTitleCell4);
	
	recTable.appendChild(recRow);
	recTable.appendChild(recCell);
	recTable.appendChild(recCell2);
	recTable.appendChild(recCell3);
	recTable.appendChild(recCell4);
	
	recTable.appendChild(recTotRow);
	recTable.appendChild(recTotCell);
	recTable.appendChild(recTotCell2);
	recTable.appendChild(recTotCell3);
	recTable.appendChild(recTotCell4);

	//Pongo la fila en la pï¿½gina
	
	thisTr.insertBefore(recTableTd,header.previousSibling);


	//Barra de titulo
	var myRowT = document.createElement('td');
		myRowT.setAttribute("class","c");
		myRowT.setAttribute("colspan","4");

	//Pongo los enlaces dentro de las celdas
	myRowT.innerHTML = 'Recursos volando';
	//Pongo la fila en la pï¿½gina
	thisTr.insertBefore(myRowT,recTableTd);

}



