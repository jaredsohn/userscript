// ==UserScript==
// @name           OGame Modified Resource Panel Alpha - German
// @author         Emilio, J.A. y Shuko (modified by Cotonite) (modified again by Fim)
// @date           23-12-2008
// @version        1.0.1
// @namespace      OGame Modified Resource Panel Alpha - German
// @description    Ressourceninformation
// @include        http://*.ogame.de/game/index.php?page=*
// @exclude        http://*.ogame.*/game/index.php?page=notizen*
// @exclude        http://*.ogame.*/game/index.php?page=galaxy*
// @exclude        http://*.ogame.*/game/index.php?page=phalanx*
// ==/UserScript==

// 1.0.1: Only cosmetics for German version, @date value untouched on purpose
// Script original: http://userscripts.org/scripts/show/12003  y /14643
// Modificado por Emilio, J.A. y Shuko.
// Agregado el 28-11-2007
// Pantalla de Ressourcen Ampliada, Muestra una tabla más con el total de ressourcen de todas las colonias.
// Para su uso se debe de pasar por la pantalla de ressourcen de todos los planeta y asi actualizar las cookies que contienen los datos acumulados de las colonias.
// Este script crea tres cookies:
//		Cookie planeten:  el valor de esta cookie es una cadena con todos las coordenadas de los planeten
//		Cookie ressourcen:  contiene el valor de los ressourcen metall, kristall y deuterium, su produccion por hora.
//      Cookie lager: contiene la capacidad de los lager.
// 		Las cookies son idependientes en cada universo, por tanto se puede tener varios universos abiertos perfectamente.

// Agradecimientos a todas aquellas personas que colaboran anonimamente

//Revisado 18-1-2008:  
//			- Compatible con la ultima version, v 0.78c.
//			- Arreglado bug con los lager
//			- Se oculta los ressourcen por mes... del servidor.
//			- Optimizacion del codigo
//Revisado 9-12-2007:  
//			- Modifiacion de las cookies para que no se borren si se cierra el ogame o se acaba la sesion.
//Revisado 29-11-2007:  
//			- Correccion del aumento de ressourcen cuando el almacen esta lleno.
//			- Actualizacion del tiempo de actualizacion de los ressourcen en tiempo real.
//			- Creacion de una nueva cookie lager: contiene la capacidad de los lager.
//Revisado 28-11-2007:  
//			- Correccion del aumento de ressourcen en la Luna (no hay produccion)
//Revisado 27-11-2007:  
//			- Añadido ressourcen en tiempo real en todo OGame
//Revisado 24-11-2007:  
//			- Añadido ressourcen en tiempo real.
//Revisado 4-11-2007: 
//			- Añadido el total de las producciones.
//			- Barra de progreso mas rapida y cambio en la apariencia.
//			- Tiempo en lager cambio en la visualizacion si alguna unidad esta a cero.
//Revisado 3-11-2007: 
//			- Modificacion general en las cookies, siguen siendo dos pero ahora almacenar todos los ressourcen diarios de los planeten.
//			- Modificado para que no incluya lunas.
//			- Arreglado para que no falle cuando no hay nigun planeta agregado o se este en la luna.
//			- Implementado la deteccion del borrado del algun planeta y lo elimina de las estadisticas de produccion.
//			- Actualizacion correcta de los cambios de produccion subida de minas o por cambios de energia o de produccion
//			- Implementada animacion en las barras de porcentajes. (Movimiento)
//Revisado 1-11-2007: 
//			- Corregido el error de los ressourcen sobrelimite.
//			- Formato de % con dos decimales.
//Revisado 31-10-2007: 
//			- Pasa a tener dos cookies; planeten y ressourcen

/*////////////////////////////////////////////FUNCIONES AUXILIARES///////////////////////////////////////////*/

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
		//var expires = (2 < argc) ? argv[2] : null;
		var ahora=new Date(); //fecha actual
		var unAño=new Date(ahora.getTime()+1000*60*60*24*365); //le sumamos un año 
		var expires = unAño;//expira en un año
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


/*//////////////////////////////////////PANTALLA DE RECURSOS AMPLIADA//////////////////////////////////////*/
	
var padre,ressourcen;
padre = document.getElementById('content');
ressourcen = document.getElementById('resources');
var T_Ressourcen; // iniciamlizado en la parte de ressourcen
var T_Ressourcen2 = ressourcen.getElementsByTagName("td");
var Metall = T_Ressourcen2[10].innerHTML.replace(/\./g,'');
var Kristall = T_Ressourcen2[11].innerHTML.replace(/\./g,'');
var Deuterium = T_Ressourcen2[12].innerHTML.replace(/\./g,'');

var PMetall,PKristall,PDeuterium;
var AlmM,AlmC,AlmD;
var T_Factor;
var Factor, FactorPorc;

//Detectamos pantalla de ressourcen solo para estas variables determinadas
if( location.href.indexOf('resources') != -1 ){
	
	T_Ressourcen = padre.getElementsByTagName("td");
	
	PMetall = T_Ressourcen[10].innerHTML.replace(/\./g,'');
	PKristall = T_Ressourcen[11].innerHTML.replace(/\./g,'');
	PDeuterium = T_Ressourcen[12].innerHTML.replace(/\./g,'');
	
	AlmM = T_Ressourcen[5].innerHTML.replace(/\./g,'');
	AlmC = T_Ressourcen[6].innerHTML.replace(/\./g,'');
	AlmD = T_Ressourcen[7].innerHTML.replace(/\./g,'');
	
	PMetall=eval(PMetall);
	PKristall=eval(PKristall);
	PDeuterium=eval(PDeuterium);
	
	AlmM = AlmM.replace(/k/,'000');
	AlmC = AlmC.replace(/k/,'000');
	AlmD = AlmD.replace(/k/,'000');
	
	if (PMetall.indexOf('<font color')!=-1) {
	PMetall = PMetall.substring(57, PMetall.indexOf('</font'));
	}
	if (PKristall.indexOf('<font color')!=-1) {
		PKristall = PKristall.substring(57, PKristall.indexOf('</font'));
	}
	if (PDeuterium.indexOf('<font color')!=-1) {
		PDeuterium = PDeuterium.substring(57, PDeuterium.indexOf('</font'));
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
	
	// Buscar Factor de Produccion
	T_Factor = /faktor(.)*\:(.)*[0-9.]/gi.exec(document.body.innerHTML);

	if (T_Factor.length) {
		Factor=T_Factor[0].split(":");
		Factor=parseFloat(Factor[1]) * 100;
		FactorPorc=parseInt(parseFloat(Factor) * 2.5);
	}

}else{

	PMetall = 0;
	PKristall = 0;
	PDeuterium = 0;
	Metall=eval(Metall);
	Metall=parseInt(Metall);
	Kristall=eval(Kristall);
	Kristall=parseInt(Kristall);
	Deuterium=eval(Deuterium);
	Deuterium=parseInt(Deuterium);
	AlmM = 0;
	AlmC = 0;
	AlmD = 0;
}

var XMetall = new Array(3);
var XKristall = new Array(3);
var XDeuterium = new Array(3);
var ResFormC, T_Form, ResForm;
//Cálculos unicos de la pantalla de ressourcen, innecesarios si usamos otra página
if( location.href.indexOf('resources') != -1 ){


	XMetall[0] = PMetall * 24;
	XKristall[0] = PKristall * 24;
	XDeuterium[0] = PDeuterium * 24;
	XMetall[1] = PMetall * 168;
	XKristall[1] = PKristall * 168;
	XDeuterium[1] = PDeuterium * 168;
	XMetall[2] = PMetall * 720;
	XKristall[2] = PKristall * 720;
	XDeuterium[2] = PDeuterium * 720;

	// Buscar Formulario de Ressourcen

	ResFormC = document.getElementsByTagName('table');

	for (var i = 0; i < ResFormC.length; i++) {
	
		T_Form = ResFormC[i];
		if (T_Form.getAttribute('width') == '550') {
			ResForm = T_Form;
		}
	}

}//Fin funciones unicas de pantalla de ressourcen

	//Ampliacion
	var header_top = document.getElementById('header_top');
	var planeta_coord = header_top.getElementsByTagName("select");

	//Obtenemos las coordenadas de los planeten actuales
	var planeten_actuales = planeta_coord[0].options;
	var tmp = new Array(planeten_actuales.length);
	for (var i=0; i<planeten_actuales.length; i++){
		tmp[i]= planeta_coord[0].options[i].text;
		tmp[i] = tmp[i].split ("[");
		tmp[i] = tmp[i][1].split ("]");
		tmp[i] = tmp[i][0].split (",");
	}
	planeten_actuales=tmp;
	planeten_actuales= planeten_actuales.sort();

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

	
//Cálculos unicos de la pantalla de ressourcen, innecesarios si usamos otra página
if( location.href.indexOf('resources') != -1 ){

	//Produccion por hora del planeta seleccionado
	var recurso = new Array(3);
	recurso[0] = 1;
	recurso[1] = PMetall;
	recurso[2] = PKristall;
	recurso[3] = PDeuterium;

	//Lager del planeta seleccionado
	var almacen = new Array(3);
	almacen[0] = 1;
	almacen[1] = AlmM;
	almacen[2] = AlmC;
	almacen[3] = AlmD;

	var planeten; //valor de la cookie planeten con un array con todos los planeten añadidos
	var ressourcen; //array con los ressourcen de produccion hora de los planeten añadidos
	var lager; //array con los lager de los planeten añadidos

	//Si no exiten las cookies, las creamos y añadimos el planeta si este no es una luna
	if(GetCookie("planeten") == null){
		// comprobamos que no sea una luna, metall y deuterium a cero
		if(recurso[1]!="0" && recurso[2]!="0"){
			SetCookie ('planeten', planeta);
			SetCookie ('ressourcen', recurso);
			SetCookie ('lager', almacen);
		}
	}else{

		planeten = GetCookie("planeten");
		planeten = planeten.split (",");
		ressourcen = GetCookie("ressourcen");
		ressourcen = ressourcen.split (",");
		lager = GetCookie("lager");
		lager = lager.split (",");

	// varibles temporales para la comparacion de planeten actuales con los guardados en las cookies
	var tmp_planeten;
	var tmp_ressourcen_planeten;
	var tmp_lager_planeten;
	// las cookie comienza con un 1, para qeu siempre se tenga en als cookies arrays
	tmp_planeten = new Array();
	tmp_planeten[0]=1;
	tmp_ressourcen_planeten = new Array(ressourcen.length-3);
	tmp_ressourcen_planeten[0]=1;
	tmp_lager_planeten = new Array(lager.length-3);
	tmp_lager_planeten[0]=1;

	//Poner a los planeten eliminados una cadena eliminar.
	for (var i=1; i<planeten.length; i++){
		for (var j=0; j<planeten_actuales.length; j++){
			if(planeten[i] == planeten_actuales[j]){
				j=planeten_actuales.length;
			}else{
				//si no existe el planeta y ya ha terminado de pasar por todo el array, borramos el planeta
				if((j+1) == planeten_actuales.length){
					planeten[i]="eliminar"; // cambia las coordenas por una cadena con el contenido "elimiar"
				}
			}
		}
	}
	
	//Nuevo array con los planeten correctos y sus ressourcen correctos
	var cont=1;
	for (var i=1; i<planeten.length; i++){
			if(planeten[i]!="eliminar"){
					tmp_planeten[cont]=planeten[i];
					tmp_ressourcen_planeten[cont+((cont-1)*2)]=ressourcen[i+((i-1)*2)];
					tmp_ressourcen_planeten[cont+((cont-1)*2)+1]=ressourcen[i+((i-1)*2)+1];
					tmp_ressourcen_planeten[cont+((cont-1)*2)+2]=ressourcen[i+((i-1)*2)+2];
					tmp_lager_planeten[cont+((cont-1)*2)]=lager[i+((i-1)*2)];
					tmp_lager_planeten[cont+((cont-1)*2)+1]=lager[i+((i-1)*2)+1];
					tmp_lager_planeten[cont+((cont-1)*2)+2]=lager[i+((i-1)*2)+2];
					cont++;
			}
	}

	
	// actualizamos los array planeten y ressourcen
	planeten=tmp_planeten;
	ressourcen=tmp_ressourcen_planeten;
	lager=tmp_lager_planeten;
	
	// Comprobamos los cambios del a producion del planeta seleccionado para una posible actualizacion.
	for (var t=1; t<planeten.length; t++){
		if(planeten[t]==planeta[1]){
			// comprobamos que no sea una luna , metall y kristall a cero
			if(recurso[1]!="0" && recurso[2]!="0"){
				if(ressourcen[t+((t-1)*2)]!=recurso[1]){
					ressourcen[t+((t-1)*2)]=recurso[1];
				}
				if(ressourcen[t+((t-1)*2)+1]!=recurso[2]){
					ressourcen[t+((t-1)*2)+1]=recurso[2];
				}
				if(ressourcen[t+((t-1)*2)+2]!=recurso[3]){
					ressourcen[t+((t-1)*2)+2]=recurso[3];
				}
			}
		}
	}

	for (var t=1; t<lager.length; t++){
		if(planeten[t]==planeta[1]){
			// comprobamos que no sea una luna , metall y kristall a cero
			if(recurso[1]!="0" && recurso[2]!="0"){
				if(lager[t+((t-1)*2)]!=almacen[1]){
					lager[t+((t-1)*2)]=almacen[1];
				}
				if(lager[t+((t-1)*2)+1]!=almacen[2]){
					lager[t+((t-1)*2)+1]=almacen[2];
				}
				if(lager[t+((t-1)*2)+2]!=almacen[3]){
					lager[t+((t-1)*2)+2]=almacen[3];
				}
			}
		}
	}
	
	// guardamos los cambios
	SetCookie ('planeten', planeten);
	SetCookie ('ressourcen', ressourcen);
	SetCookie ('lager', lager);

	planeten = GetCookie("planeten");
	planeten = planeten.split (",");
	ressourcen = GetCookie("ressourcen");
	ressourcen = ressourcen.split (",");
	lager = GetCookie("lager");
	lager = lager.split (",");
	
	//Para añadir un nuevo planeta
		for (var i=1; i<planeten.length; i++){
			//si exite el planeta finalizamos el for
			if(planeten[i] == planeta[1]){
				i=planeten.length;
			}else{
				//si no existe el planeta y ya ha terminado de pasar por todo el array, añadimos el planeta
				if((i+1) == planeten.length){
					// comprobamos que no sea una luna, metall y deuterium a cero
					if(recurso[1]!="0" && recurso[2]!="0"){
					planeten[i+1] = planeta[1];
					ressourcen[i+1+(i*2)]=recurso[1];
					ressourcen[i+1+(i*2)+1]=recurso[2];
					ressourcen[i+1+(i*2)+2]=recurso[3];
					lager[i+1+(i*2)]=almacen[1];
					lager[i+1+(i*2)+1]=almacen[2];
					lager[i+1+(i*2)+2]=almacen[3];
					SetCookie ('planeten', planeten);
					SetCookie ('ressourcen', ressourcen);
					SetCookie ('lager', lager);
					}
				}
			}
		}
	

	}


}
// Si existe ResForm == A la pantalla recurusos pues mostramos las ampliaciones en ressourcen
if (ResForm) {
	
	//Ocultamos tabla generada por server
	los_tr = document.getElementById("ressourcen").getElementsByTagName("table")[0].rows;
	los_tr[los_tr.length-2].style.display="none";
	los_tr[los_tr.length-1].style.display="none";
	if(los_tr[los_tr.length-1].getElementsByTagName("iframe").length==1){
	los_tr[los_tr.length-3].style.display="none";//Maldita publi de comandante xD
	}


	// Procesar Tablas
	var ProdFact = document.createElement('div');

	ProdFact.innerHTML = '<table width="550"><tr>'+'<th>Produktionslevel</th>'+'<th width="100" id="factor_P">'+Factor+'%</th>'+'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div id="factorP" style="background-color: '+(Factor < 100 ? '#C00000' : '#00C000' )+'; width: '+FactorPorc+'px;">&nbsp;</div></div></th>'+'</tr></table><br />';
	
	var CuentaRec = document.createElement('div');

	// comprobamos que no sea una luna, metall y deuterium a cero
	if(recurso[1]!="0" && recurso[2]!="0"){
	// si es una luna, no mostramos la tabla de produccion extendida
	CuentaRec.innerHTML = '<br /><table width="550">'+'<tr><td class="c" colspan="4">Längerfristige Produktion</td></tr>'+'<tr>'+'<td class="c">&nbsp;</td>'+'<th>Täglich</th>'+'<th>Wöchentlich</th>'+'<th>Monatlich</th>'+'</tr>'+'<tr>'+'<td class="c" width="120"><img src="http://uni43.ogame.com.es/evolution/images/metall.gif" width="24" style="margin-right:15px;" /><font color="#F1531E" style="margin-right:15px;font-style:italic;">Metall</font></td>'+'<th><font color="#00ff00">'+formatNmb(XMetall[0])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XMetall[1])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XMetall[2])+'</font></th>'+'</tr>'+'<tr>'+'<td class="c" width="120"><img src="http://uni43.ogame.com.es/evolution/images/kristall.gif" width="24" style="margin-right:15px;" /><font color="#54B0DC" style="margin-right:15px;font-style:italic;">Kristall</font></td>'+'<th><font color="#00ff00">'+formatNmb(XKristall[0])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XKristall[1])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XKristall[2])+'</font></th>'+'</tr>'+'<tr>'+'<td class="c" width="120"><img src="http://uni43.ogame.com.es/evolution/images/deuterium.gif" width="24" style="margin-right:15px;" /><font color="#9AACCB" style="margin-right:15px;font-style:italic;">Deuterium</font></td>'+'<th><font color="#00ff00">'+formatNmb(XDeuterium[0])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XDeuterium[1])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XDeuterium[2])+'</font></th>'+'</tr>'+'</table><br />';

	}else{
		CuentaRec.innerHTML = '<br />';
	}

	Metall=eval(Metall);
	Metall=parseInt(Metall);
	Kristall=eval(Kristall);
	Kristall=parseInt(Kristall);
	Deuterium=eval(Deuterium);
	Deuterium=parseInt(Deuterium);

	
	var EAlmM=(Metall / AlmM) * 100;
	var EAlmMPorc=parseInt((Metall / AlmM) * 250);
	var EAlmC=(Kristall / AlmC) * 100;
	var EAlmCPorc=parseInt((Kristall / AlmC) * 250);
	var EAlmD=(Deuterium / AlmD) * 100;
	var EAlmDPorc=parseInt((Deuterium / AlmD) * 250);


	EAlmM = Math.round(EAlmM*100)/100;
	EAlmC = Math.round(EAlmC*100)/100;
	EAlmD = Math.round(EAlmD*100)/100;


	var LlenoM=0;
	var LlenoC=0;
	var LlenoD=0;
	
	if (Metall>=AlmM) 
		LlenoM=1;
	if (Kristall>=AlmC) 
		LlenoC=1;
	if (Deuterium>=AlmD) 
		LlenoD=1;


	McadaSeg=PMetall/3600;
	CcadaSeg=PKristall/3600;
	DcadaSeg=PDeuterium/3600;


	if ((LlenoM)||(PMetall==0)) segundosM=0
	else segundosM=(AlmM-Metall)/McadaSeg;

	if ((LlenoC)||(PKristall==0)) segundosC=0
	else segundosC=(AlmC-Kristall)/CcadaSeg;

	if ((LlenoD)||(PDeuterium==0)) segundosD=0
	else segundosD=(AlmD-Deuterium)/DcadaSeg;



	minutos=segundosM/60;
	horas=minutos/60;
	dias=horas/24;


	tiemMd=dias-dias%1;
	tiemMh=(horas-horas%1)-((dias-dias%1)*24);
	tiemMm=(minutos-minutos%1)-((horas-horas%1)*60);
	tiemMs=segundosM%60-segundosM%1;
	tiemMetall = "";
	if((tiemMd == 0) && (tiemMh == 0) && (tiemMm == 0) && (tiemMs == 0)){
		tiemMetall = "No production";
	}

	minutos=segundosC/60;
	horas=minutos/60;
	dias=horas/24;


	tiemCd=dias-dias%1;
	tiemCh=(horas-horas%1)-((dias-dias%1)*24);
	tiemCm=(minutos-minutos%1)-((horas-horas%1)*60);
	tiemCs=segundosC%60-segundosC%1;
	tiemKristall = "";
	if((tiemCd == 0) && (tiemCh == 0) && (tiemCm == 0) && (tiemCs == 0)){
		tiemKristall = "No production";
	}


	minutos=segundosD/60;
	horas=minutos/60;
	dias=horas/24;


	tiemDd=dias-dias%1;
	tiemDh=(horas-horas%1)-((dias-dias%1)*24);
	tiemDm=(minutos-minutos%1)-((horas-horas%1)*60);
	tiemDs=segundosD%60-segundosD%1;
	tiemDeuterium = "";
	if((tiemDd == 0) && (tiemDh == 0) && (tiemDm == 0) && (tiemDs == 0)){
		tiemDeuterium = "No production";
	}




	CuentaRec.innerHTML += '<table width="550">'+
'<tr><td class="c" colspan="3">Lagerfüllung</td></tr>'+'<tr>'+'<th id="alm_M">Metall ('+EAlmM+'%)</th>'+
'<th>'+(tiemMd != 0 ? tiemMd+'d': '')+' '+(tiemMh != 0 ? tiemMh+'h': '')+' '+(tiemMm != 0 ? tiemMm+'m': '')+' '+(tiemMs != 0 ? tiemMs+'s': '')+tiemMetall+' </th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px; text-align: center;"><div id="almM" style="background-color: '+(EAlmM > 99.99 ? '#C00000' : '#00C000')+'; width: '+(EAlmMPorc > 250 ? 250 : EAlmMPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'<tr>'+
'<th id="alm_C">Kristall ('+EAlmC+'%)</th>'+
'<th>'+(tiemCd != 0 ? tiemCd+'d': '')+' '+(tiemCh != 0 ? tiemCh+'h': '')+' '+(tiemCm != 0 ? tiemCm+'m': '')+' '+(tiemCs != 0 ? tiemCs+'s': '')+tiemKristall+' </th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div id="almC" style="background-color: '+(EAlmC > 99.99 ? '#C00000' : '#00C000' )+'; width: '+(EAlmCPorc > 250 ? 250 : EAlmCPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'<tr>'+
'<th id="alm_D">Deuterium ('+EAlmD+'%)</th>'+
'<th>'+(tiemDd != 0 ? tiemDd+'d': '')+' '+(tiemDh != 0 ? tiemDh+'h': '')+' '+(tiemDm != 0 ? tiemDm+'m': '')+' '+(tiemDs != 0 ? tiemDs+'s': '')+tiemDeuterium+' </th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div id="almD" style="background-color: '+(EAlmD > 99.99 ? '#C00000' : '#00C000' )+'; width: '+(EAlmDPorc > 250 ? 250 : EAlmDPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'</table><br />';



	//Tabla de la ampliacion con los ressourcen totales de los planeten sumados

	if(GetCookie("planeten") == null){
	
		// comprobamos que no sea una luna, metall y deuterium a cero
		if(recurso[1]!="0" && recurso[2]!="0"){
			CuentaRec.innerHTML += '<table width="550">'+'<tr><td class="c" colspan="4">Gesamtproduktion von 0 Planeten</td></tr><tr><td  class="c" colspan="4">Keine Planeten vorhanden, besuch alle Resourcenseiten.</td></tr></table><br />';
		}else{
			CuentaRec.innerHTML += '<table width="550">'+'<tr><td class="c" colspan="4">Gesamtproduktion</td></tr><tr><td  class="c" colspan="4">Auf einem Mond gibt\'s keine Produktion.</td></tr></table><br />';
		}
	
	}else{

	planeten_format = GetCookie("planeten");
	planeten_format = planeten_format.split (",");
	planeten_format= planeten_format.sort();
	planeten_format_final="";

	for (var i=1; i<planeten_format.length; i++){
		planeten_format_final+='['+planeten_format[i]+'] ';
	}
	
	planeten_ressourcen = GetCookie("ressourcen");
	planeten_ressourcen = planeten_ressourcen.split (",");
	planeten_ressourcen_metall=0;
	planeten_ressourcen_kristall=0;
	planeten_ressourcen_deuterium=0;
	
	// Suma de los recuros diarios de cada planeta
	for (var i=1; i<planeten_ressourcen.length; i++){
		if(i%3 == 1){
		planeten_ressourcen_metall=planeten_ressourcen_metall+parseInt(planeten_ressourcen[i]);
		}
		if(i%3 == 2){
		planeten_ressourcen_kristall=planeten_ressourcen_kristall+parseInt(planeten_ressourcen[i]);
		}
		if(i%3 == 0){
		planeten_ressourcen_deuterium=planeten_ressourcen_deuterium+parseInt(planeten_ressourcen[i]);
		}
	}
	
	
	CuentaRec.innerHTML += '<table width="550">'+'<tr><td class="c" colspan="4">Gesamtproduktion von '+(planeten_format.length-1)+' Planeten</td></tr><tr><td class="c" width="120" style="text-align:center;">Planets</td><td class="c" colspan="3">'+planeten_format_final+'</td></tr>'+'<tr>'+'<td class="c">&nbsp;</td>'+'<th>Täglich</th>'+'<th>Wöchentlich</th>'+'<th>Monatlich</th>'+'</tr>'+'<tr>'+'<td class="c"><img src="http://uni43.ogame.com.es/evolution/images/metall.gif" width="24" style="margin-right:15px;" /><font color="#F1531E" style="margin-right:15px;font-style:italic;">Metall</font></td>'+'<th><font color="#00ff00">'+formatNmb(planeten_ressourcen_metall*24)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planeten_ressourcen_metall*168)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planeten_ressourcen_metall*720)+'</font></th>'+'</tr>'+'<tr>'+'<td class="c"><img src="http://uni43.ogame.com.es/evolution/images/kristall.gif" width="24" style="margin-right:15px;" /><font color="#54B0DC" style="margin-right:15px;font-style:italic;">Kristall</font></td>'+'<th><font color="#00ff00">'+formatNmb(planeten_ressourcen_kristall*24)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planeten_ressourcen_kristall*168)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planeten_ressourcen_kristall*720)+'</font></th>'+'</tr>'+'<tr>'+'<td class="c"><img src="http://uni43.ogame.com.es/evolution/images/deuterium.gif" width="24" style="margin-right:15px;" /><font color="#9AACCB" style="margin-right:15px;font-style:italic;">Deuterium</td>'+'<th><font color="#00ff00">'+formatNmb(planeten_ressourcen_deuterium*24)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planeten_ressourcen_deuterium*168)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planeten_ressourcen_deuterium*720)+'</font></th>'+'</tr>'+'<tr>'+'<td class="c" style="text-align:center;"><font>Total</td>'+'<th><font color="#00ff00">'+formatNmb((planeten_ressourcen_metall*24)+(planeten_ressourcen_kristall*24)+(planeten_ressourcen_deuterium*24))+'</font></th>'+'<th><font color="#00ff00">'+formatNmb((planeten_ressourcen_metall*168)+(planeten_ressourcen_kristall*168)+(planeten_ressourcen_deuterium*168))+'</font></th>'+'<th><font color="#00ff00">'+formatNmb((planeten_ressourcen_metall*720)+(planeten_ressourcen_kristall*720)+(planeten_ressourcen_deuterium*720))+'</font></th>'+'</tr></table><br />';


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
		setTimeout('document.getElementById("alm_M").innerHTML ="Metall - '+Math.round(((100*i)/250))+' %"', 20*(i+2));
	}
	setTimeout('document.getElementById("alm_M").innerHTML ="Metall - '+EAlmM+'%"', (EAlmMPorc > 250 ? 250 : EAlmMPorc)*20*(i+2));

	for (var i = 0; i <= (EAlmCPorc > 250 ? 250 : EAlmCPorc); i++) {
		setTimeout('document.getElementById("almC").style.width="'+i+'px"', 20*(i+2));
		setTimeout('document.getElementById("alm_C").innerHTML ="Kristall - '+Math.round(((100*i)/250))+' %"', 20*(i+2));
	}
	setTimeout('document.getElementById("alm_C").innerHTML ="Kristall - '+EAlmC+'%"', (EAlmCPorc > 250 ? 250 : EAlmCPorc)*20*(i+2));

	for (var i = 0; i <= (EAlmDPorc > 250 ? 250 : EAlmDPorc); i++) {
		setTimeout('document.getElementById("almD").style.width="'+i+'px"', 20*(i+2));
		setTimeout('document.getElementById("alm_D").innerHTML ="Deuterium - '+Math.round(((100*i)/250))+' %"', 20*(i+2));
	}
	setTimeout('document.getElementById("alm_D").innerHTML ="Deuterium - '+EAlmD+'%"', (EAlmDPorc > 250 ? 250 : EAlmDPorc)*20*(i+2));

	}


/*//////////////////////////////////////////RECURSOS EN TIEMPO REAL//////////////////////////////////////////*/
	
if(GetCookie("planeten") == null){

}else{
	planeten_format = GetCookie("planeten");
	planeten_format = planeten_format.split (",");

	planeten_ressourcen = GetCookie("ressourcen");
	planeten_ressourcen = planeten_ressourcen.split (",");
	
	planeten_lager = GetCookie("lager");
	planeten_lager = planeten_lager.split (",");

	done=0;
	for (var i=1; i<planeten_format.length; i++){
		if(planeten_format[i]==planeta[1]){
		a = (i*3)-3;
		PMetall = parseInt(planeten_ressourcen[a+1]);
		PKristall = parseInt(planeten_ressourcen[a+2]);
		PDeuterium = parseInt(planeten_ressourcen[a+3]);
		AlmM = parseInt(planeten_lager[a+1]);
		AlmC = parseInt(planeten_lager[a+2]);
		AlmD = parseInt(planeten_lager[a+3]);
		done=1;
		i=planeten_format.length;
		}
	}	
}





var Energia=T_Ressourcen2[14].innerHTML;

if(PMetall!="0" && PKristall!="0" && Energia!="<font>0</font>/0"){ // para que sea distinto de una luna

/* Producción por segundo para ressourcen "live" */
SMetall = PMetall/3600;
SKristall = PKristall/3600;
SDeuterium = PDeuterium/3600;


window.dat = new Date();
window.Mold = Metall;
window.Cold = Kristall;
window.Dold = Deuterium;


window.setInterval(function() {

var recs = document.getElementById('resources').getElementsByTagName("td");
var dat2 = new Date();
var startime = dat.getTime();
var endtime = dat2.getTime();
var secs = (endtime-startime)/1000;

	if(Metall<AlmM){
		Mposeido = roundNumber((SMetall*secs)+Metall);
		recs[10].innerHTML = recs[10].innerHTML.split(formatNmb(window.Mold)).join(formatNmb(Mposeido));
		window.Mold = Mposeido;
	}
	
	if(Kristall<AlmC) {
		Cposeido = roundNumber((SKristall*secs)+Kristall);
		recs[11].innerHTML = recs[11].innerHTML.split(formatNmb(window.Cold)).join(formatNmb(Cposeido));
		window.Cold = Cposeido;
	}
	
	if(Deuterium<AlmD){
		Dposeido = roundNumber((SDeuterium*secs)+Deuterium);
		recs[12].innerHTML = recs[12].innerHTML.split(formatNmb(window.Dold)).join(formatNmb(Dposeido));
		window.Dold = Dposeido;
	}

},250);
}