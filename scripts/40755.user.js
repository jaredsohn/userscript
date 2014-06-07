// ==UserScript==
// @name           XNova Pantalla Recursos
// @author         STALKER
// @date           18-01-2009
// @version        1.1
// @namespace      OGame xnova Pantalla de Recursos Ampliada
// @description    XNova.es Pantalla Recursos Ampliada. Muestra una nueva tabla al final de la pantalla recursos con la suma de todas las producciones de todos los planetas y muestra en tiempo real los recursos.
// @include        http://s*.xnova.es/overview.php*
// @include        http://s*.xnova.es/buildings.php*
// @include        http://s*.xnova.es/resources.php*
// @include        http://s*.xnova.es/fleet.php*
// @include        http://s*.xnova.es/annonce.php*
// @include        http://s*.xnova.es/techtree.php*
// @include        http://s*.xnova.es/messages.php*
// @include        http://s*.xnova.es/infos.php*
// @include        http://s*.xnova.es/stat.php*
// ==/UserScript==

// Script basado en: http://userscripts.org/scripts/show/13479 (Emilio, J.A. y Shuko)
// Modificado y adaptado para xnova.es por STALKER, 18-Enero-2009



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
	
var XMetal = new Array(3);
var XCristal = new Array(3);
var XDeut = new Array(3);
var metal = 0;
var cristal = 0;
var deu = 0;
var almM,almC,almD;


if( location.href.indexOf('.xnova.es/resources.php') != -1 ){


   var metal = document.evaluate('/html/body/center/table/tbody/tr[3]/th[2]/font',document,null,XPathResult.STRING_TYPE,null).stringValue.replace(/\./g,'');
   celda = document.evaluate('/html/body/center/table/tbody/tr[3]/th[2]/font',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
   celda.singleNodeValue.innerHTML = formatNmb(metal*3);
   celda = document.evaluate('/html/body/center/table/tbody/tr[3]/th[3]/font',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
   celda.singleNodeValue.innerHTML = formatNmb(metal*3*7);
   celda = document.evaluate('/html/body/center/table/tbody/tr[3]/th[4]/font',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
   celda.singleNodeValue.innerHTML = formatNmb(metal*3*30);

   var cristal = document.evaluate('/html/body/center/table/tbody/tr[4]/th[2]/font',document,null,XPathResult.STRING_TYPE,null).stringValue.replace(/\./g,'');
   celda = document.evaluate('/html/body/center/table/tbody/tr[4]/th[2]/font',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
   celda.singleNodeValue.innerHTML = formatNmb(cristal*3);
   celda = document.evaluate('/html/body/center/table/tbody/tr[4]/th[3]/font',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
   celda.singleNodeValue.innerHTML = formatNmb(cristal*3*7);
   celda = document.evaluate('/html/body/center/table/tbody/tr[4]/th[4]/font',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
   celda.singleNodeValue.innerHTML = formatNmb(cristal*3*30);
   

   var deu = document.evaluate('/html/body/center/table/tbody/tr[5]/th[2]',document,null,XPathResult.STRING_TYPE,null).stringValue.replace(/\./g,'');
   
   if(deu == "0") {
      celda = document.evaluate('/html/body/center/table/tbody/tr[5]/th[2]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
      celda.singleNodeValue.innerHTML = formatNmb(deu*3);
      celda = document.evaluate('/html/body/center/table/tbody/tr[5]/th[3]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
      celda.singleNodeValue.innerHTML = formatNmb(deu*3*7);
      celda = document.evaluate('/html/body/center/table/tbody/tr[5]/th[4]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
      celda.singleNodeValue.innerHTML = formatNmb(deu*3*30);
   } else {
      celda = document.evaluate('/html/body/center/table/tbody/tr[5]/th[2]/font',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
      celda.singleNodeValue.innerHTML = formatNmb(deu*3);
      celda = document.evaluate('/html/body/center/table/tbody/tr[5]/th[3]/font',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
      celda.singleNodeValue.innerHTML = formatNmb(deu*3*7);
      celda = document.evaluate('/html/body/center/table/tbody/tr[5]/th[4]/font',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
      celda.singleNodeValue.innerHTML = formatNmb(deu*3*30);
   }
   
   
   if( location.href.indexOf('s1.xnova.es') != -1 ){
      metal = (metal * 3) / 24;
      cristal = (cristal * 3 ) / 24;
      deu = (deu * 3 ) / 24;
   } else {
      metal = metal / 24;
      cristal = cristal / 24;
      deu = deu / 24;
   }
   
   
	numFilas = document.evaluate('/html/body/center/form/table',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.rows.length;
	numFilas = numFilas - 1;
	
	cadena = '/html/body/center/form/table/tbody/tr[' + numFilas + ']/td/font';
	almM = document.evaluate(cadena,document,null,XPathResult.STRING_TYPE,null).stringValue.replace(/\./g,'').replace(/\k/g,'');
	almM = almM * 1000;
	
	cadena = '/html/body/center/form/table/tbody/tr[' + numFilas + ']/td[2]/font';
	almC = document.evaluate(cadena,document,null,XPathResult.STRING_TYPE,null).stringValue.replace(/\./g,'').replace(/\k/g,'');
	almC = almC * 1000;
	
	cadena = '/html/body/center/form/table/tbody/tr[' + numFilas + ']/td[3]/font';
	almD = document.evaluate(cadena,document,null,XPathResult.STRING_TYPE,null).stringValue.replace(/\./g,'').replace(/\k/g,'');
	almD = almD * 1000;

  
   
   
   if(metal < 0) metal = -1 * metal;
   if(cristal < 0) cristal = -1 * cristal;
   if(deu < 0) deu = -1 * deu;

	XMetal[0] = metal;
	XCristal[0] = cristal;
	XDeut[0] = deu;
	XMetal[1] = metal * 7;
	XCristal[1] = cristal * 7;
	XDeut[1] = deu * 7;
	XMetal[2] = metal * 30;
	XCristal[2] = cristal * 30;
	XDeut[2] = deu * 30;

}

	

   //Obtenemos las coordenadas de los planetas actuales
	var planeta_coord = document.evaluate('/html/body/div/center/table/tbody/tr/td/center/table/tbody/tr/td[2]/select',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	var planetas_actuales = planeta_coord.singleNodeValue.options;
	var tmp = new Array(planetas_actuales.length);
	for (var i=0; i<planetas_actuales.length; i++){
		tmp[i]= planeta_coord.singleNodeValue.options[i].text;
		tmp[i] = tmp[i].split ("[");
		tmp[i] = tmp[i][1].split ("]");
		tmp[i] = tmp[i][0].split (",");
	}
	planetas_actuales=tmp;
	planetas_actuales= planetas_actuales.sort();
		
	
	//Obtenemos el planeta seleccionado, las coordenadas
	var planeta = new Array(2);
	planeta = planeta_coord.singleNodeValue.options[planeta_coord.singleNodeValue.selectedIndex].text;
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
	recurso[1] = metal;
	recurso[2] = cristal;
	recurso[3] = deu;
	
	//Almacenes del planeta seleccionado
	var almacen = new Array(3);
	almacen[0] = 1;
	almacen[1] = almM;
	almacen[2] = almC;
	almacen[3] = almD;


	var planetas; //valor de la cookie planetas con un array con todos los planetas añadidos
	var recursos; //array con los recursos de produccion hora de los planetas añadidos
	var almacenes; //array con los almacenes de los planetas añadidos
	

	//Si no exiten las cookies, las creamos y añadimos el planeta si este no es una luna
	if(GetCookie("planetas") == null){
		// comprobamos que no sea una luna, metal y deuterio a cero
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
			// comprobamos que no sea una luna , metal y cristal a cero
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
			// comprobamos que no sea una luna , metal y cristal a cero
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
					// comprobamos que no sea una luna, metal y deuterio a cero
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
	
if( location.href.indexOf('.xnova.es/resources.php') != -1 ){

	var CuentaRec = document.createElement('div');


	if(GetCookie("planetas") != null){
	

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
	
	
	CuentaRec.innerHTML += '<table width="569">'+'<tr><td class="c" colspan="4">Producci&oacute;n Total de '+(planetas_format.length-1)+' planetas</td></tr><tr><td class="c" width="110" style="text-align:center;">Planetas</td><td class="c" colspan="3">'+planetas_format_final+'</td></tr>'+'<tr>'+'<td class="c">&nbsp;</td>'+'<th>Diaria</th>'+'<th>Semanal</th>'+'<th>Mensual</th>'+'</tr>'+'<tr>'+'<td class="c"><img src="http://uni43.ogame.com.es/evolution/images/metall.gif" width="24" style="margin-right:15px;" /><font color="#F1531E" style="margin-right:15px;font-style:italic;">Metal</font></td>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_metal*24)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_metal*168)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_metal*720)+'</font></th>'+'</tr>'+'<tr>'+'<td class="c"><img src="http://uni43.ogame.com.es/evolution/images/kristall.gif" width="24" style="margin-right:15px;" /><font color="#54B0DC" style="margin-right:15px;font-style:italic;">Cristal</font></td>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_cristal*24)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_cristal*168)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_cristal*720)+'</font></th>'+'</tr>'+'<tr>'+'<td class="c"><img src="http://uni43.ogame.com.es/evolution/images/deuterium.gif" width="24" style="margin-right:15px;" /><font color="#9AACCB" style="margin-right:15px;font-style:italic;">Deuterio</td>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_deuterio*24)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_deuterio*168)+'</font></th>'+'<th><font color="#00ff00">'+formatNmb(planetas_recursos_deuterio*720)+'</font></th>'+'</tr>'+'<tr>'+'<td class="c" style="text-align:center;"><font>Total</td>'+'<th><font color="#00ff00">'+formatNmb((planetas_recursos_metal*24)+(planetas_recursos_cristal*24)+(planetas_recursos_deuterio*24))+'</font></th>'+'<th><font color="#00ff00">'+formatNmb((planetas_recursos_metal*168)+(planetas_recursos_cristal*168)+(planetas_recursos_deuterio*168))+'</font></th>'+'<th><font color="#00ff00">'+formatNmb((planetas_recursos_metal*720)+(planetas_recursos_cristal*720)+(planetas_recursos_deuterio*720))+'</font></th>'+'</tr></table><br />';


	}

	var cen = document.evaluate('/html/body/center',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);

   cen.singleNodeValue.appendChild(CuentaRec);

	
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
		PMetal = parseInt(planetas_recursos[a+1]);
		PCristal = parseInt(planetas_recursos[a+2]);
		PDeut = parseInt(planetas_recursos[a+3]);
		almM = parseInt(planetas_almacenes[a+1]);
		almC = parseInt(planetas_almacenes[a+2]);
		almD = parseInt(planetas_almacenes[a+3]);
		done=1;
		i=planetas_format.length;
		}
	}	
}




if(PMetal!="0" && PCristal!="0"){ // para que sea distinto de una luna

/* Producción por segundo para recursos "live" */
SMetal = PMetal/3600;
SCristal = PCristal/3600;
SDeut = PDeut/3600;



var rm = document.evaluate('/html/body/div/center/table/tbody/tr/td[2]/table/tbody/tr[3]/td/font',document,null,XPathResult.STRING_TYPE,null).stringValue.replace(/\./g,'');
var rc = document.evaluate('/html/body/div/center/table/tbody/tr/td[2]/table/tbody/tr[3]/td[2]/font',document,null,XPathResult.STRING_TYPE,null).stringValue.replace(/\./g,'');
var rd = document.evaluate('/html/body/div/center/table/tbody/tr/td[2]/table/tbody/tr[3]/td[3]/font',document,null,XPathResult.STRING_TYPE,null).stringValue.replace(/\./g,'');


window.dat = new Date();
window.Mold = rm;
window.Cold = rc;
window.Dold = rd;


window.setInterval(function() {

var dat2 = new Date();
var startime = dat.getTime();
var endtime = dat2.getTime();
var secs = (endtime-startime)/1000;

	rec_m = document.evaluate('/html/body/div/center/table/tbody/tr/td[2]/table/tbody/tr[3]/td',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    rec_c = document.evaluate('/html/body/div/center/table/tbody/tr/td[2]/table/tbody/tr[3]/td[2]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    rec_d = document.evaluate('/html/body/div/center/table/tbody/tr/td[2]/table/tbody/tr[3]/td[3]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
   

	
   
	if(window.Mold<almM){
		//alert(window.Mold + "  " + almM + "  " + secs + "  " + SMetal);
		Mposeido = roundNumber(parseInt(rm) + (SMetal*secs));
		rec_m.singleNodeValue.innerHTML = rec_m.singleNodeValue.innerHTML.split(formatNmb(window.Mold)).join(formatNmb(Mposeido));
		window.Mold = Mposeido;
	}
		
	if(window.Cold<almC){
		Cposeido = roundNumber(parseInt(rc) + (SCristal*secs));
		rec_c.singleNodeValue.innerHTML = rec_c.singleNodeValue.innerHTML.split(formatNmb(window.Cold)).join(formatNmb(Cposeido));
		window.Cold = Cposeido;
	}
		
		
	if(window.Dold<almD){
		Dposeido = roundNumber(parseInt(rd) + (SDeut*secs));
		rec_d.singleNodeValue.innerHTML = rec_d.singleNodeValue.innerHTML.split(formatNmb(window.Dold)).join(formatNmb(Dposeido));
		window.Dold = Dposeido;
	}
	
	

},250);
}


