// ==UserScript==
// @name           OGame Pantalla de Recursos Ampliada (Produccion Total + Recursos en tiempo real) de Emilio (version 0.77c)
// @author         Emilio
// @date           24-11-2007
// @version        1.0
// @namespace      Ampliada por Emilio de la ampliación de Jose. Por Shuko anteriormente y creada por Emilio.
// @description    Pantalla de Recursos Ampliada (Produccion Total).
// @include        http://*.ogame.com.es/game/index.php?page=*
// @exclude        http://*.ogame.com.es/game/index.php?page=notizen*
// @exclude        http://*.ogame.com.es/game/index.php?page=galaxy*
// @exclude        http://*.ogame.com.es/game/index.php?page=phalanx*
// ==/UserScript==

// Script original: http://userscripts.org/scripts/show/12003
// Modificado por Emilio para ampliar funciones
// Agregado el 24-11-2007
// Pantalla de Recursos Ampliada, Muestra una tabla más con el total de recursos de todas las colonias, y actualiza los recursos en tiempo real en todo OGame.
// Para su uso se debe de pasar por la pantalla de recursos de todos los planeta y asi actualizar las cookies que contienen los datos acumulados de las colonias.
// Este script crea dos cookies:
//		Cookie planetas:  el valor de esta cookie es una cadena con todos las coordenadas de los planetas
//		Cookie recursos:  contiene el valor acumulativo del recurso metal,cristal y deuterio.
// Las cookies son idependientes en cada universo, por tanto se puede tener varios universos abiertos perfectamente.


//Revisado 27-11-2007:  
//			- Añadido recursos en tiempo real en todo OGame
//Revisado 24-11-2007:  
//			- Añadido recursos en tiempo real.
//Revisado 4-11-2007: 
//			- Añadido el total de las producciones.
//			- Barra de progreso mas rapida y cambio en la apariencia.
//			- Tiempo en almacenes cambio en la visualizacion si alguna unidad esta a cero.
//Revisado 3-11-2007: 
//			- Modificacion general en las cookies, siguen siendo dos pero ahora almacenar todos los recursos diarios de los planetas.
//			- Modificado para que no incluya lunas.
//			- Arreglado para que no falle cuando no hay nigun planeta agregado o se este en la luna.
//			- Implementado la deteccion del borrado del algun planeta y lo elimina de las estadisticas de produccion.
//			- Actualizacion correcta de los cambios de produccion subida de minas o por cambios de energia o de produccion
//			- Implementada animacion en las barras de porcentajes. (Movimiento)
//Revisado 1-11-2007: 
//			- Corregido el error de los recursos sobrelimite.
//			- Formato de % con dos decimales.
//Revisado 31-10-2007: 
//			- Pasa a tener dos cookies; planetas y recursos

	function formatNmb(numero){
	   var nNmb = String(numero); 
	   var sRes = "";
	   for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++)
	   		sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;
		return sRes;
	}

	function roundNumber(rnum) {
		var rlength = 0; // The number of decimal places to round to
		if (rnum > 8191 && rnum < 10485) {
			rnum = rnum-5000;
			var newnumber = Math.round(rnum*Math.pow(10,rlength))/Math.pow(10,rlength);
			newnumber = newnumber+5000;
		} else {
			var newnumber = Math.round(rnum*Math.pow(10,rlength))/Math.pow(10,rlength);
		}
		return newnumber;
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

//Detectamos pantalla de recursos
if( location.href.indexOf('resources') != -1 ){

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

/* Producción por segundo para recursos "live" */
//SMetal = PMetal/3600;
//SCristal = PCristal/3600;
//SDeut = PDeut/3600;

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

var planetas; //valor de la cookie planetas con un array con todos los planetas añadidos
var recursos; //array con los recursos diarios de los planetas añadidos

//Si no exiten las cookies, las creamos y añadimos el planeta si este no es una luna
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
	
	//Para añadir un nuevo planeta
	for (var i=1; i<planetas.length; i++){
		//si exite el planeta finalizamos el for
		if(planetas[i] == planeta[1]){
			i=planetas.length;
		}else{
			//si no existe el planeta y ya ha terminado de pasar por todo el array, añadimos el planeta
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


	EAlmM = Math.round(EAlmM*100)/100;
	EAlmC = Math.round(EAlmC*100)/100;
	EAlmD = Math.round(EAlmD*100)/100;


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
tiemMetal = "";
if((tiemMd == 0) && (tiemMh == 0) && (tiemMm == 0) && (tiemMs == 0)){
	tiemMetal = "Completo";
}

minutos=segundosC/60;
horas=minutos/60;
dias=horas/24;


tiemCd=dias-dias%1;
tiemCh=(horas-horas%1)-((dias-dias%1)*24);
tiemCm=(minutos-minutos%1)-((horas-horas%1)*60);
tiemCs=segundosC%60-segundosC%1;
tiemCristal = "";
if((tiemCd == 0) && (tiemCh == 0) && (tiemCm == 0) && (tiemCs == 0)){
	tiemCristal = "Completo";
}


minutos=segundosD/60;
horas=minutos/60;
dias=horas/24;


tiemDd=dias-dias%1;
tiemDh=(horas-horas%1)-((dias-dias%1)*24);
tiemDm=(minutos-minutos%1)-((horas-horas%1)*60);
tiemDs=segundosD%60-segundosD%1;
tiemDeuterio = "";
if((tiemDd == 0) && (tiemDh == 0) && (tiemDm == 0) && (tiemDs == 0)){
	tiemDeuterio = "Completo";
}




	CuentaRec.innerHTML += '<table width="550">'+
'<tr><td class="c" colspan="3">Estado de los Almacenes</td></tr>'+'<tr>'+'<th id="alm_M">Metal ('+EAlmM+'%)</th>'+
'<th>'+(tiemMd != 0 ? tiemMd+'dias': '')+' '+(tiemMh != 0 ? tiemMh+'h': '')+' '+(tiemMm != 0 ? tiemMm+'m': '')+' '+(tiemMs != 0 ? tiemMs+'s': '')+tiemMetal+' </th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div id="almM" style="background-color: '+(EAlmM > 99.99 ? '#C00000' : '#00C000')+'; width: '+(EAlmMPorc > 250 ? 250 : EAlmMPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'<tr>'+
'<th id="alm_C">Cristal ('+EAlmC+'%)</th>'+
'<th>'+(tiemCd != 0 ? tiemCd+'dias': '')+' '+(tiemCh != 0 ? tiemCh+'h': '')+' '+(tiemCm != 0 ? tiemCm+'m': '')+' '+(tiemCs != 0 ? tiemCs+'s': '')+tiemCristal+' </th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div id="almC" style="background-color: '+(EAlmC > 99.99 ? '#C00000' : '#00C000' )+'; width: '+(EAlmCPorc > 250 ? 250 : EAlmCPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'<tr>'+
'<th id="alm_D">Deuterio ('+EAlmD+'%)</th>'+
'<th>'+(tiemDd != 0 ? tiemDd+'dias': '')+' '+(tiemDh != 0 ? tiemDh+'h': '')+' '+(tiemDm != 0 ? tiemDm+'m': '')+' '+(tiemDs != 0 ? tiemDs+'s': '')+tiemDeuterio+' </th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div id="almD" style="background-color: '+(EAlmD > 99.99 ? '#C00000' : '#00C000' )+'; width: '+(EAlmDPorc > 250 ? 250 : EAlmDPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'</table><br />';



//Tabla de la ampliacion con los recursos totales de los planetas sumados

if(GetCookie("planetas") == null){
	
	// comprobamos que no sea una luna, metal y deuterio a cero
	if(recurso[1]!="0" && recurso[2]!="0"){
		CuentaRec.innerHTML += '<table width="550">'+'<tr><td class="c" colspan="4">Producci&oacute;n Total de 0 planetas</td></tr><tr><td  class="c" colspan="4">No tiene añadido ningun planeta, vaya a la pantalla de los recursos de los planetas</td></tr></table><br />';
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
	
	
	CuentaRec.innerHTML += '<table width="550">'+'<tr><td class="c" colspan="4">Producci&oacute;n Total de '+(planetas_format.length-1)+' planetas</td></tr><tr><td class="c" width="110" style="text-align:center;">Planetas</td><td class="c" colspan="3">'+planetas_format_final+'</td></tr>'+'<tr>'+'<td class="c">&nbsp;</td>'+'<th>Diaria</th>'+'<th>Semanal</th>'+'<th>Mensual</th>'+'</tr>'+'<tr>'+'<td class="c"><img src="http://uni43.ogame.com.es/evolution/images/metall.gif" width="24" style="margin-right:15px;" /><font color="#F1531E" style="margin-right:15px;">Metal</font></td>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_metal*24)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_metal*168)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_metal*720)+'</font></th>'+'</tr>'+'<tr>'+'<td class="c"><img src="http://uni48.ogame.com.es/evolution/images/kristall.gif" width="24" style="margin-right:15px;" /><font color="#54B0DC" style="margin-right:15px;">Cristal</font></td>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_cristal*24)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_cristal*168)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_cristal*720)+'</font></th>'+'</tr>'+'<tr>'+'<td class="c"><img src="http://uni48.ogame.com.es/evolution/images/deuterium.gif" width="24" style="margin-right:15px;" /><font color="#9AACCB" style="margin-right:15px;">Deuterio</td>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_deuterio*24)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_deuterio*168)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_deuterio*720)+'</font></th>'+'</tr>'+'<tr>'+'<td class="c" style="text-align:center;"><font>Total</td>'+'<th><font color="#00ff00">'+formatNmb((planetas_recursos_metal*24)+(planetas_recursos_cristal*24)+(planetas_recursos_deuterio*24))+'</font></th>'+'<th><font color="#00ff00">'+formatNmb((planetas_recursos_metal*168)+(planetas_recursos_cristal*168)+(planetas_recursos_deuterio*168))+'</font></th>'+'<th><font color="#00ff00">'+formatNmb((planetas_recursos_metal*720)+(planetas_recursos_cristal*720)+(planetas_recursos_deuterio*720))+'</font></th>'+'</tr></table><br />';


}

	ResForm.parentNode.insertBefore(CuentaRec, ResForm.nextSibling);
	ResForm.parentNode.insertBefore(ProdFact, ResForm);
	document.body.innerHTML = document.body.innerHTML.replace(/factor de producci(.)+n\:(.)*[0-9.]/gi,'');
	

//Movimiento en las barras
for (var i = 0; i <= FactorPorc; i++) {
	setTimeout('document.getElementById("factorP").style.width="'+i+'px"', 20*(i+2));
	setTimeout('document.getElementById("factor_P").innerHTML ="'+Math.round(((100*i)/250))+' %"', 20*(i+2));
}
setTimeout('document.getElementById("factor_P").innerHTML ="'+Factor+'%"', FactorPorc*20*(i+2));

for (var i = 0; i <= (EAlmMPorc > 250 ? 250 : EAlmMPorc); i++) {
	setTimeout('document.getElementById("almM").style.width="'+i+'px"', 20*(i+2));
	setTimeout('document.getElementById("alm_M").innerHTML ="Metal - '+Math.round(((100*i)/250))+' %"', 20*(i+2));
}
setTimeout('document.getElementById("alm_M").innerHTML ="Metal - '+EAlmM+'%"', (EAlmMPorc > 250 ? 250 : EAlmMPorc)*20*(i+2));

for (var i = 0; i <= (EAlmCPorc > 250 ? 250 : EAlmCPorc); i++) {
	setTimeout('document.getElementById("almC").style.width="'+i+'px"', 20*(i+2));
	setTimeout('document.getElementById("alm_C").innerHTML ="Cristal - '+Math.round(((100*i)/250))+' %"', 20*(i+2));
}
setTimeout('document.getElementById("alm_C").innerHTML ="Cristal - '+EAlmC+'%"', (EAlmCPorc > 250 ? 250 : EAlmCPorc)*20*(i+2));

for (var i = 0; i <= (EAlmDPorc > 250 ? 250 : EAlmDPorc); i++) {
	setTimeout('document.getElementById("almD").style.width="'+i+'px"', 20*(i+2));
	setTimeout('document.getElementById("alm_D").innerHTML ="Deuterio - '+Math.round(((100*i)/250))+' %"', 20*(i+2));
}
setTimeout('document.getElementById("alm_D").innerHTML ="Deuterio - '+EAlmD+'%"', (EAlmDPorc > 250 ? 250 : EAlmDPorc)*20*(i+2));


}

//Fin deteccion recursos
}else{



	planetas_format = GetCookie("planetas");
	planetas_format = planetas_format.split (",");

	planetas_recursos = GetCookie("recursos");
	planetas_recursos = planetas_recursos.split (",");


	var header_top = document.getElementById('header_top');
	var planeta_coord = header_top.getElementsByTagName("select");
	planeta = planeta_coord[0].options[planeta_coord[0].selectedIndex].text;
	planeta = planeta.split ("[");
	planeta = planeta[1].split ("]");
	planeta = planeta[0].split (",");

	done=0;
	for (var i=1; i<planetas_format.length; i++){
		if(planetas_format[i]==planeta){
		a = (i*3)-3;
		PMetal = parseInt(planetas_recursos[a+1]);
		PCristal = parseInt(planetas_recursos[a+2]);
		PDeut = parseInt(planetas_recursos[a+3]);
		done=1;
		}
	}
	if(done==0){
	PMetal = 0;
	PCristal = 0;
	PDeut = 0;
	}

	recursos = document.getElementById('resources');
	var T_Recursos2 = recursos.getElementsByTagName("td");
	var Metal = T_Recursos2[10].innerHTML.replace(/\./g,'');
	var Cristal = T_Recursos2[11].innerHTML.replace(/\./g,'');
	var Deut = T_Recursos2[12].innerHTML.replace(/\./g,'');

	if (Metal.indexOf('<font')!=-1) {
		Metal = parseFloat(Metal.substring(6, Metal.indexOf('</font')));
	}
	if (Cristal.indexOf('<font')!=-1) {
		Cristal = parseFloat(Cristal.substring(6, Cristal.indexOf('</font')));
	}
	if (Deut.indexOf('<font')!=-1) {
		Deut = parseFloat(Deut.substring(6, Deut.indexOf('</font')));
	}






//Fin IF grande
}



/* Producción por segundo para recursos "live" */
SMetal = PMetal/3600;
SCristal = PCristal/3600;
SDeut = PDeut/3600;



window.dat = new Date();
window.Mold = Metal;
window.Cold = Cristal;
window.Dold = Deut;



window.setInterval(function() {

var recs = document.getElementById('resources').getElementsByTagName("td");
var dat2 = new Date();
var startime = dat.getTime();
var endtime = dat2.getTime();
var secs = (endtime-startime)/1000;
Mposeido = roundNumber((SMetal*secs)+Metal);
Cposeido = roundNumber((SCristal*secs)+Cristal);
Dposeido = roundNumber((SDeut*secs)+Deut);
recs[10].innerHTML = recs[10].innerHTML.split(formatNmb(window.Mold)).join(formatNmb(Mposeido));
recs[11].innerHTML = recs[11].innerHTML.split(formatNmb(window.Cold)).join(formatNmb(Cposeido));
recs[12].innerHTML = recs[12].innerHTML.split(formatNmb(window.Dold)).join(formatNmb(Dposeido));
window.Mold = Mposeido;
window.Cold = Cposeido;
window.Dold = Dposeido;
},500);