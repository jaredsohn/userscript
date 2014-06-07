// ==UserScript==
// @name           Aangepaste grondstoffenpagina voor Ogame Alpha
// @author         Emilio, J.A. y Shuko (modified by Cotonite)
// @date           18-12-2008
// @version        1.0
// @namespace      Aangepaste grondstoffenpagina voor Ogame Alpha
// @description    Grondstoffeninformatie (vertaling van een spaans script)
// @include        http://*.ogame.*/game/index.php?page=*
// @exclude        http://*.ogame.*/game/index.php?page=notizen*
// @exclude        http://*.ogame.*/game/index.php?page=galaxy*
// @exclude        http://*.ogame.*/game/index.php?page=phalanx*
// ==/UserScript==

// Script original: http://userscripts.org/scripts/show/12003  y /14643
// Modificado por Emilio, J.A. y Shuko.
// Agregado el 28-11-2007
// Pantalla de Recursos Ampliada, Muestra una tabla más con el total de recursos de todas las colonias.
// Para su uso se debe de pasar por la pantalla de recursos de todos los planeta y asi actualizar las cookies que contienen los datos acumulados de las colonias.
// Este script crea tres cookies:
//		Cookie planetas:  el valor de esta cookie es una cadena con todos las coordenadas de los planetas
//		Cookie recursos:  contiene el valor de los recursos Metaal, Kristal y Deuterium, su produccion por hora.
//      Cookie almacenes: contiene la capacidad de los almacenes.
// 		Las cookies son idependientes en cada universo, por tanto se puede tener varios universos abiertos perfectamente.

// Agradecimientos a todas aquellas personas que colaboran anonimamente

//Revisado 18-1-2008:  
//			- Compatible con la ultima version, v 0.78c.
//			- Arreglado bug con los almacenes
//			- Se oculta los recursos por mes... del servidor.
//			- Optimizacion del codigo
//Revisado 9-12-2007:  
//			- Modifiacion de las cookies para que no se borren si se cierra el ogame o se acaba la sesion.
//Revisado 29-11-2007:  
//			- Correccion del aumento de recursos cuando el almacen esta lleno.
//			- Actualizacion del tiempo de actualizacion de los recursos en tiempo real.
//			- Creacion de una nueva cookie almacenes: contiene la capacidad de los almacenes.
//Revisado 28-11-2007:  
//			- Correccion del aumento de recursos en la Luna (no hay produccion)
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
	
var padre,recursos;
padre = document.getElementById('content');
recursos = document.getElementById('resources');
var T_Recursos; // iniciamlizado en la parte de recursos
var T_Recursos2 = recursos.getElementsByTagName("td");
var Metaal = T_Recursos2[10].innerHTML.replace(/\./g,'');
var Kristal = T_Recursos2[11].innerHTML.replace(/\./g,'');
var Deuterium = T_Recursos2[12].innerHTML.replace(/\./g,'');

var PMetaal,PKristal,PDeuterium;
var AlmM,AlmC,AlmD;
var T_Factor;
var Factor, FactorPorc;
//Detectamos pantalla de recursos solo para estas variables determinadas
if( location.href.indexOf('resources') != -1 ){
	
	T_Recursos = padre.getElementsByTagName("td");
	
	PMetaal = T_Recursos[10].innerHTML.replace(/\./g,'');
	PKristal = T_Recursos[11].innerHTML.replace(/\./g,'');
	PDeuterium = T_Recursos[12].innerHTML.replace(/\./g,'');
	
	AlmM = T_Recursos[5].innerHTML.replace(/\./g,'');
	AlmC = T_Recursos[6].innerHTML.replace(/\./g,'');
	AlmD = T_Recursos[7].innerHTML.replace(/\./g,'');
	
	PMetaal=eval(PMetaal);
	PKristal=eval(PKristal);
	PDeuterium=eval(PDeuterium);
	
	AlmM = AlmM.replace(/k/,'000');
	AlmC = AlmC.replace(/k/,'000');
	AlmD = AlmD.replace(/k/,'000');
	
	if (PMetaal.indexOf('<font color')!=-1) {
	PMetaal = PMetaal.substring(57, PMetaal.indexOf('</font'));
	}
	if (PKristal.indexOf('<font color')!=-1) {
		PKristal = PKristal.substring(57, PKristal.indexOf('</font'));
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
	T_Factor = /factor(.)*\:(.)*[0-9.]/gi.exec(document.body.innerHTML);
	if (T_Factor.length) {
		Factor=T_Factor[0].split(":");
		Factor=parseFloat(Factor[1]) * 100;
		FactorPorc=parseInt(parseFloat(Factor) * 2.5);
	}
	
}else{

	PMetaal = 0;
	PKristal = 0;
	PDeuterium = 0;
	Metaal=eval(Metaal);
	Metaal=parseInt(Metaal);
	Kristal=eval(Kristal);
	Kristal=parseInt(Kristal);
	Deuterium=eval(Deuterium);
	Deuterium=parseInt(Deuterium);
	AlmM = 0;
	AlmC = 0;
	AlmD = 0;
}

var XMetaal = new Array(3);
var XKristal = new Array(3);
var XDeuterium = new Array(3);
var ResFormC, T_Form, ResForm;
//Cálculos unicos de la pantalla de recursos, innecesarios si usamos otra página
if( location.href.indexOf('resources') != -1 ){


	XMetaal[0] = PMetaal * 24;
	XKristal[0] = PKristal * 24;
	XDeuterium[0] = PDeuterium * 24;
	XMetaal[1] = PMetaal * 168;
	XKristal[1] = PKristal * 168;
	XDeuterium[1] = PDeuterium * 168;
	XMetaal[2] = PMetaal * 720;
	XKristal[2] = PKristal * 720;
	XDeuterium[2] = PDeuterium * 720;

	// Buscar Formulario de Recursos

	ResFormC = document.getElementsByTagName('table');

	for (var i = 0; i < ResFormC.length; i++) {
	
		T_Form = ResFormC[i];
		if (T_Form.getAttribute('width') == '550') {
			ResForm = T_Form;
		}
	}

}//Fin funciones unicas de pantalla de recursos

	//Ampliacion
	var header_top = document.getElementById('header_top');
	var planeta_coord = header_top.getElementsByTagName("select");

	//Obtenemos las coordenadas de los planetas actuales
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

	
//Cálculos unicos de la pantalla de recursos, innecesarios si usamos otra página
if( location.href.indexOf('resources') != -1 ){

	//Produccion por hora del planeta seleccionado
	var recurso = new Array(3);
	recurso[0] = 1;
	recurso[1] = PMetaal;
	recurso[2] = PKristal;
	recurso[3] = PDeuterium;

	//Almacenes del planeta seleccionado
	var almacen = new Array(3);
	almacen[0] = 1;
	almacen[1] = AlmM;
	almacen[2] = AlmC;
	almacen[3] = AlmD;

	var planetas; //valor de la cookie planetas con un array con todos los planetas añadidos
	var recursos; //array con los recursos de produccion hora de los planetas añadidos
	var almacenes; //array con los almacenes de los planetas añadidos

	//Si no exiten las cookies, las creamos y añadimos el planeta si este no es una luna
	if(GetCookie("planetas") == null){
		// comprobamos que no sea una luna, Metaal y Deuterium a cero
		if(recurso[1]!="0" && recurso[2]!="0"){
			SetCookie ('planetas', planeta);
			SetCookie ('recursos', recurso);
			SetCookie ('almacenes', almacen);
		}
	}else{

		planetas = GetCookie("planetas");
		planetas = planetas.split (",");
		recursos = GetCookie("recursos");
		recursos = recursos.split (",");
		almacenes = GetCookie("almacenes");
		almacenes = almacenes.split (",");

	// varibles temporales para la comparacion de planetas actuales con los guardados en las cookies
	var tmp_planetas;
	var tmp_recursos_planetas;
	var tmp_almacenes_planetas;
	// las cookie comienza con un 1, para qeu siempre se tenga en als cookies arrays
	tmp_planetas = new Array();
	tmp_planetas[0]=1;
	tmp_recursos_planetas = new Array(recursos.length-3);
	tmp_recursos_planetas[0]=1;
	tmp_almacenes_planetas = new Array(almacenes.length-3);
	tmp_almacenes_planetas[0]=1;

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
					tmp_almacenes_planetas[cont+((cont-1)*2)]=almacenes[i+((i-1)*2)];
					tmp_almacenes_planetas[cont+((cont-1)*2)+1]=almacenes[i+((i-1)*2)+1];
					tmp_almacenes_planetas[cont+((cont-1)*2)+2]=almacenes[i+((i-1)*2)+2];
					cont++;
			}
	}

	
	// actualizamos los array planetas y recursos
	planetas=tmp_planetas;
	recursos=tmp_recursos_planetas;
	almacenes=tmp_almacenes_planetas;
	
	// Comprobamos los cambios del a producion del planeta seleccionado para una posible actualizacion.
	for (var t=1; t<planetas.length; t++){
		if(planetas[t]==planeta[1]){
			// comprobamos que no sea una luna , Metaal y Kristal a cero
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

	for (var t=1; t<almacenes.length; t++){
		if(planetas[t]==planeta[1]){
			// comprobamos que no sea una luna , Metaal y Kristal a cero
			if(recurso[1]!="0" && recurso[2]!="0"){
				if(almacenes[t+((t-1)*2)]!=almacen[1]){
					almacenes[t+((t-1)*2)]=almacen[1];
				}
				if(almacenes[t+((t-1)*2)+1]!=almacen[2]){
					almacenes[t+((t-1)*2)+1]=almacen[2];
				}
				if(almacenes[t+((t-1)*2)+2]!=almacen[3]){
					almacenes[t+((t-1)*2)+2]=almacen[3];
				}
			}
		}
	}
	
	// guardamos los cambios
	SetCookie ('planetas', planetas);
	SetCookie ('recursos', recursos);
	SetCookie ('almacenes', almacenes);

	planetas = GetCookie("planetas");
	planetas = planetas.split (",");
	recursos = GetCookie("recursos");
	recursos = recursos.split (",");
	almacenes = GetCookie("almacenes");
	almacenes = almacenes.split (",");
	
	//Para añadir un nuevo planeta
		for (var i=1; i<planetas.length; i++){
			//si exite el planeta finalizamos el for
			if(planetas[i] == planeta[1]){
				i=planetas.length;
			}else{
				//si no existe el planeta y ya ha terminado de pasar por todo el array, añadimos el planeta
				if((i+1) == planetas.length){
					// comprobamos que no sea una luna, Metaal y Deuterium a cero
					if(recurso[1]!="0" && recurso[2]!="0"){
					planetas[i+1] = planeta[1];
					recursos[i+1+(i*2)]=recurso[1];
					recursos[i+1+(i*2)+1]=recurso[2];
					recursos[i+1+(i*2)+2]=recurso[3];
					almacenes[i+1+(i*2)]=almacen[1];
					almacenes[i+1+(i*2)+1]=almacen[2];
					almacenes[i+1+(i*2)+2]=almacen[3];
					SetCookie ('planetas', planetas);
					SetCookie ('recursos', recursos);
					SetCookie ('almacenes', almacenes);
					}
				}
			}
		}
	

	}


}
// Si existe ResForm == A la pantalla recurusos pues mostramos las ampliaciones en recursos
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

	ProdFact.innerHTML = '<table width="550"><tr>'+'<th>Productie factor</th>'+'<th width="100" id="factor_P">'+Factor+'%</th>'+'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div id="factorP" style="background-color: '+(Factor < 100 ? '#C00000' : '#00C000' )+'; width: '+FactorPorc+'px;">&nbsp;</div></div></th>'+'</tr></table><br />';
	
	var CuentaRec = document.createElement('div');

	// comprobamos que no sea una luna, Metaal y Deuterium a cero
	if(recurso[1]!="0" && recurso[2]!="0"){
	// si es una luna, no mostramos la tabla de produccion extendida
	CuentaRec.innerHTML = '<br /><table width="550">'+'<tr><td class="c" colspan="4">Uitgebreide productie</td></tr>'+'<tr>'+'<td class="c">&nbsp;</td>'+'<th>Dagelijks</th>'+'<th>Wekelijks</th>'+'<th>Maandelijks</th>'+'</tr>'+'<tr>'+'<td class="c" width="110"><img src="http://uni43.ogame.com.es/evolution/images/metall.gif" width="24" style="margin-right:15px;" /><font color="#F1531E" style="margin-right:15px;font-style:italic;">Metaal</font></td>'+'<th><font color="#00ff00">'+formatNmb(XMetaal[0])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XMetaal[1])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XMetaal[2])+'</font></th>'+'</tr>'+'<tr>'+'<td class="c" width="110"><img src="http://uni43.ogame.com.es/evolution/images/kristall.gif" width="24" style="margin-right:15px;" /><font color="#54B0DC" style="margin-right:15px;font-style:italic;">Kristal</font></td>'+'<th><font color="#00ff00">'+formatNmb(XKristal[0])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XKristal[1])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XKristal[2])+'</font></th>'+'</tr>'+'<tr>'+'<td class="c" width="110"><img src="http://uni43.ogame.com.es/evolution/images/deuterium.gif" width="24" style="margin-right:15px;" /><font color="#9AACCB" style="margin-right:15px;font-style:italic;">Deuterium</font></td>'+'<th><font color="#00ff00">'+formatNmb(XDeuterium[0])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XDeuterium[1])+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(XDeuterium[2])+'</font></th>'+'</tr>'+'</table><br />';

	}else{
		CuentaRec.innerHTML = '<br />';
	}

	Metaal=eval(Metaal);
	Metaal=parseInt(Metaal);
	Kristal=eval(Kristal);
	Kristal=parseInt(Kristal);
	Deuterium=eval(Deuterium);
	Deuterium=parseInt(Deuterium);

	
	var EAlmM=(Metaal / AlmM) * 100;
	var EAlmMPorc=parseInt((Metaal / AlmM) * 250);
	var EAlmC=(Kristal / AlmC) * 100;
	var EAlmCPorc=parseInt((Kristal / AlmC) * 250);
	var EAlmD=(Deuterium / AlmD) * 100;
	var EAlmDPorc=parseInt((Deuterium / AlmD) * 250);


	EAlmM = Math.round(EAlmM*100)/100;
	EAlmC = Math.round(EAlmC*100)/100;
	EAlmD = Math.round(EAlmD*100)/100;


	var LlenoM=0;
	var LlenoC=0;
	var LlenoD=0;
	
	if (Metaal>=AlmM) 
		LlenoM=1;
	if (Kristal>=AlmC) 
		LlenoC=1;
	if (Deuterium>=AlmD) 
		LlenoD=1;


	McadaSeg=PMetaal/3600;
	CcadaSeg=PKristal/3600;
	DcadaSeg=PDeuterium/3600;


	if ((LlenoM)||(PMetaal==0)) segundosM=0
	else segundosM=(AlmM-Metaal)/McadaSeg;

	if ((LlenoC)||(PKristal==0)) segundosC=0
	else segundosC=(AlmC-Kristal)/CcadaSeg;

	if ((LlenoD)||(PDeuterium==0)) segundosD=0
	else segundosD=(AlmD-Deuterium)/DcadaSeg;



	minutos=segundosM/60;
	horas=minutos/60;
	dias=horas/24;


	tiemMd=dias-dias%1;
	tiemMh=(horas-horas%1)-((dias-dias%1)*24);
	tiemMm=(minutos-minutos%1)-((horas-horas%1)*60);
	tiemMs=segundosM%60-segundosM%1;
	tiemMetaal = "";
	if((tiemMd == 0) && (tiemMh == 0) && (tiemMm == 0) && (tiemMs == 0)){
		tiemMetaal = "No production";
	}

	minutos=segundosC/60;
	horas=minutos/60;
	dias=horas/24;


	tiemCd=dias-dias%1;
	tiemCh=(horas-horas%1)-((dias-dias%1)*24);
	tiemCm=(minutos-minutos%1)-((horas-horas%1)*60);
	tiemCs=segundosC%60-segundosC%1;
	tiemKristal = "";
	if((tiemCd == 0) && (tiemCh == 0) && (tiemCm == 0) && (tiemCs == 0)){
		tiemKristal = "No production";
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
'<tr><td class="c" colspan="3">Staat van Opslagen</td></tr>'+'<tr>'+'<th id="alm_M">Metaal ('+EAlmM+'%)</th>'+
'<th>'+(tiemMd != 0 ? tiemMd+'d': '')+' '+(tiemMh != 0 ? tiemMh+'h': '')+' '+(tiemMm != 0 ? tiemMm+'m': '')+' '+(tiemMs != 0 ? tiemMs+'s': '')+tiemMetaal+' </th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px; text-align: center;"><div id="almM" style="background-color: '+(EAlmM > 99.99 ? '#C00000' : '#00C000')+'; width: '+(EAlmMPorc > 250 ? 250 : EAlmMPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'<tr>'+
'<th id="alm_C">Kristal ('+EAlmC+'%)</th>'+
'<th>'+(tiemCd != 0 ? tiemCd+'d': '')+' '+(tiemCh != 0 ? tiemCh+'h': '')+' '+(tiemCm != 0 ? tiemCm+'m': '')+' '+(tiemCs != 0 ? tiemCs+'s': '')+tiemKristal+' </th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div id="almC" style="background-color: '+(EAlmC > 99.99 ? '#C00000' : '#00C000' )+'; width: '+(EAlmCPorc > 250 ? 250 : EAlmCPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'<tr>'+
'<th id="alm_D">Deuterium ('+EAlmD+'%)</th>'+
'<th>'+(tiemDd != 0 ? tiemDd+'d': '')+' '+(tiemDh != 0 ? tiemDh+'h': '')+' '+(tiemDm != 0 ? tiemDm+'m': '')+' '+(tiemDs != 0 ? tiemDs+'s': '')+tiemDeuterium+' </th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div id="almD" style="background-color: '+(EAlmD > 99.99 ? '#C00000' : '#00C000' )+'; width: '+(EAlmDPorc > 250 ? 250 : EAlmDPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'</table><br />';



	//Tabla de la ampliacion con los recursos totales de los planetas sumados

	if(GetCookie("planetas") == null){
	
		// comprobamos que no sea una luna, Metaal y Deuterium a cero
		if(recurso[1]!="0" && recurso[2]!="0"){
			CuentaRec.innerHTML += '<table width="550">'+'<tr><td class="c" colspan="4">Total production of 0 planets</td></tr><tr><td  class="c" colspan="4">No planets added, visit all Resources page(s)</td></tr></table><br />';
		}else{
			CuentaRec.innerHTML += '<table width="550">'+'<tr><td class="c" colspan="4">Total production</td></tr><tr><td  class="c" colspan="4">At a moon, no production.</td></tr></table><br />';
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
	planetas_recursos_Metaal=0;
	planetas_recursos_Kristal=0;
	planetas_recursos_Deuterium=0;
	
	// Suma de los recuros diarios de cada planeta
	for (var i=1; i<planetas_recursos.length; i++){
		if(i%3 == 1){
		planetas_recursos_Metaal=planetas_recursos_Metaal+parseInt(planetas_recursos[i]);
		}
		if(i%3 == 2){
		planetas_recursos_Kristal=planetas_recursos_Kristal+parseInt(planetas_recursos[i]);
		}
		if(i%3 == 0){
		planetas_recursos_Deuterium=planetas_recursos_Deuterium+parseInt(planetas_recursos[i]);
		}
	}
	
	
	CuentaRec.innerHTML += '<table width="550">'+'<tr><td class="c" colspan="4">Totale productie van '+(planetas_format.length-1)+' planeten</td></tr><tr><td class="c" width="110" style="text-align:center;">Planeten</td><td class="c" colspan="3">'+planetas_format_final+'</td></tr>'+'<tr>'+'<td class="c">&nbsp;</td>'+'<th>Dagelijks</th>'+'<th>Wekelijks</th>'+'<th>Maandelijks</th>'+'</tr>'+'<tr>'+'<td class="c"><img src="http://uni43.ogame.com.es/evolution/images/metall.gif" width="24" style="margin-right:15px;" /><font color="#F1531E" style="margin-right:15px;font-style:italic;">Metaal</font></td>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_Metaal*24)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_Metaal*168)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_Metaal*720)+'</font></th>'+'</tr>'+'<tr>'+'<td class="c"><img src="http://uni43.ogame.com.es/evolution/images/kristall.gif" width="24" style="margin-right:15px;" /><font color="#54B0DC" style="margin-right:15px;font-style:italic;">Kristal</font></td>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_Kristal*24)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_Kristal*168)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_Kristal*720)+'</font></th>'+'</tr>'+'<tr>'+'<td class="c"><img src="http://uni43.ogame.com.es/evolution/images/deuterium.gif" width="24" style="margin-right:15px;" /><font color="#9AACCB" style="margin-right:15px;font-style:italic;">Deuterium</td>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_Deuterium*24)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_Deuterium*168)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_Deuterium*720)+'</font></th>'+'</tr>'+'<tr>'+'<td class="c" style="text-align:center;"><font>Totaal</td>'+'<th><font color="#00ff00">'+formatNmb((planetas_recursos_Metaal*24)+(planetas_recursos_Kristal*24)+(planetas_recursos_Deuterium*24))+'</font></th>'+'<th><font color="#00ff00">'+formatNmb((planetas_recursos_Metaal*168)+(planetas_recursos_Kristal*168)+(planetas_recursos_Deuterium*168))+'</font></th>'+'<th><font color="#00ff00">'+formatNmb((planetas_recursos_Metaal*720)+(planetas_recursos_Kristal*720)+(planetas_recursos_Deuterium*720))+'</font></th>'+'</tr></table><br />';


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
		setTimeout('document.getElementById("alm_M").innerHTML ="Metaal - '+Math.round(((100*i)/250))+' %"', 20*(i+2));
	}
	setTimeout('document.getElementById("alm_M").innerHTML ="Metaal - '+EAlmM+'%"', (EAlmMPorc > 250 ? 250 : EAlmMPorc)*20*(i+2));

	for (var i = 0; i <= (EAlmCPorc > 250 ? 250 : EAlmCPorc); i++) {
		setTimeout('document.getElementById("almC").style.width="'+i+'px"', 20*(i+2));
		setTimeout('document.getElementById("alm_C").innerHTML ="Kristal - '+Math.round(((100*i)/250))+' %"', 20*(i+2));
	}
	setTimeout('document.getElementById("alm_C").innerHTML ="Kristal - '+EAlmC+'%"', (EAlmCPorc > 250 ? 250 : EAlmCPorc)*20*(i+2));

	for (var i = 0; i <= (EAlmDPorc > 250 ? 250 : EAlmDPorc); i++) {
		setTimeout('document.getElementById("almD").style.width="'+i+'px"', 20*(i+2));
		setTimeout('document.getElementById("alm_D").innerHTML ="Deuterium - '+Math.round(((100*i)/250))+' %"', 20*(i+2));
	}
	setTimeout('document.getElementById("alm_D").innerHTML ="Deuterium - '+EAlmD+'%"', (EAlmDPorc > 250 ? 250 : EAlmDPorc)*20*(i+2));

	}


/*//////////////////////////////////////////RECURSOS EN TIEMPO REAL//////////////////////////////////////////*/
	
if(GetCookie("planetas") == null){

}else{
	planetas_format = GetCookie("planetas");
	planetas_format = planetas_format.split (",");

	planetas_recursos = GetCookie("recursos");
	planetas_recursos = planetas_recursos.split (",");
	
	planetas_almacenes = GetCookie("almacenes");
	planetas_almacenes = planetas_almacenes.split (",");

	done=0;
	for (var i=1; i<planetas_format.length; i++){
		if(planetas_format[i]==planeta[1]){
		a = (i*3)-3;
		PMetaal = parseInt(planetas_recursos[a+1]);
		PKristal = parseInt(planetas_recursos[a+2]);
		PDeuterium = parseInt(planetas_recursos[a+3]);
		AlmM = parseInt(planetas_almacenes[a+1]);
		AlmC = parseInt(planetas_almacenes[a+2]);
		AlmD = parseInt(planetas_almacenes[a+3]);
		done=1;
		i=planetas_format.length;
		}
	}	
}





var Energia=T_Recursos2[14].innerHTML;

if(PMetaal!="0" && PKristal!="0" && Energia!="<font>0</font>/0"){ // para que sea distinto de una luna

/* Producción por segundo para recursos "live" */
SMetaal = PMetaal/3600;
SKristal = PKristal/3600;
SDeuterium = PDeuterium/3600;


window.dat = new Date();
window.Mold = Metaal;
window.Cold = Kristal;
window.Dold = Deuterium;


window.setInterval(function() {

var recs = document.getElementById('resources').getElementsByTagName("td");
var dat2 = new Date();
var startime = dat.getTime();
var endtime = dat2.getTime();
var secs = (endtime-startime)/1000;

	if(Metaal<AlmM){
		Mposeido = roundNumber((SMetaal*secs)+Metaal);
		recs[10].innerHTML = recs[10].innerHTML.split(formatNmb(window.Mold)).join(formatNmb(Mposeido));
		window.Mold = Mposeido;
	}
	
	if(Kristal<AlmC) {
		Cposeido = roundNumber((SKristal*secs)+Kristal);
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