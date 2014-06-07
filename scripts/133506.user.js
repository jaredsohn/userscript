// ==UserScript==
//
// @version     0.6
// @name        Puntos en defensas y naves - Galaxytool
// @author      Fuck3m
// @date        2012-05-16
// @namespace   Ogame Galaxytool
// @description Contabiliza los puntos existentes en el GalaxyTool para un usuario determinado. 
// @include     http://*/secret/playerinformation.php?*
// ==/UserScript==

function miles (number){
//Eliminamos los decimales que pudiera tener el número
_number = parseInt(""+number);
number = ""+_number;
var result = '';
var decimales = '';
var signo = '';
//Comprueba si si hay simbolo negativo, si lo encuentra lo quita para que funcione correctamente la función
if (number.charAt(0) == '-') {
	signo = '-';
	number = number.substr(1, number.length);
}
while( number.length > 3 ) {
 result = '.' + number.substr(number.length - 3) + result;
 number = number.substring(0, number.length - 3);
}
result = signo + number + result + decimales;
return result;
};

var defensas = 0;

//Obtenemos el colspan, es decir, el número de planetas

var obtener_colspan = document.evaluate( '//div[@id="tab5"]/table/tbody/tr/td/table/tbody/tr[6]/td', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
var n = obtener_colspan.singleNodeValue.colSpan;

var lanzamisiles = document.evaluate( '//div[@id="tab5"]/table/tbody/tr/td/table/tbody/tr[23]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < lanzamisiles.snapshotLength; i++ )  { 
	fila = lanzamisiles.snapshotItem(i);
	_lanzamisiles = fila.innerHTML.replace(".","");
	defensas += 2*_lanzamisiles;
}

var laser = document.evaluate( '//div[@id="tab5"]/table/tbody/tr/td/table/tbody/tr[24]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < laser.snapshotLength; i++ )  { 
	fila = laser.snapshotItem(i);
	_laser = fila.innerHTML.replace(".","");
	defensas += 2*_laser;
}

var laserG = document.evaluate( '//div[@id="tab5"]/table/tbody/tr/td/table/tbody/tr[25]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < laserG.snapshotLength; i++ )  { 
	fila = laserG.snapshotItem(i);
	_laserG = fila.innerHTML.replace(".","");
	defensas += 8*_laserG;
}

var ionico = document.evaluate( '//div[@id="tab5"]/table/tbody/tr/td/table/tbody/tr[26]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < ionico.snapshotLength; i++ )  { 
	fila = ionico.snapshotItem(i);
	_ionico = fila.innerHTML.replace(".","");
	defensas += 8*_ionico;
}

var gauss = document.evaluate( '//div[@id="tab5"]/table/tbody/tr/td/table/tbody/tr[27]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < gauss.snapshotLength; i++ )  { 
	fila = gauss.snapshotItem(i);
	_gauss = fila.innerHTML.replace(".","");
	defensas += 37*_gauss;
}

var plasmas = document.evaluate( '//div[@id="tab5"]/table/tbody/tr/td/table/tbody/tr[28]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < plasmas.snapshotLength; i++ )  { 
	fila = plasmas.snapshotItem(i);
	_plasma = fila.innerHTML.replace(".","");
	defensas += 130*_plasma;
}

var cupulaP = document.evaluate( '//div[@id="tab5"]/table/tbody/tr/td/table/tbody/tr[29]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < cupulaP.snapshotLength; i++ )  { 
	fila = cupulaP.snapshotItem(i);
	_cupulaP = fila.innerHTML.replace(".","");
	defensas += 20*_cupulaP;
}

var cupulaG = document.evaluate( '//div[@id="tab5"]/table/tbody/tr/td/table/tbody/tr[30]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < cupulaG.snapshotLength; i++ )  { 
	fila = cupulaG.snapshotItem(i);
	_cupulaG = fila.innerHTML.replace(".","");
	defensas += 100*_cupulaG;
}

var misilA = document.evaluate( '//div[@id="tab5"]/table/tbody/tr/td/table/tbody/tr[31]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < misilA.snapshotLength; i++ )  { 
	fila = misilA.snapshotItem(i);
	_misilA = fila.innerHTML.replace(".","");
	defensas += 10*_misilA;
}

var misilI = document.evaluate( '//div[@id="tab5"]/table/tbody/tr/td/table/tbody/tr[32]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < misilI.snapshotLength; i++ )  { 
	fila = misilI.snapshotItem(i);
	_misilI = fila.innerHTML.replace(".","");
	defensas += 25*_misilI;
}

//Añade la información
var capa = document.evaluate( '//div[@id="tab5"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
if (capa.snapshotLength != 0) {
	displayOpts =  capa.snapshotItem(0);
}
if (displayOpts) {
	displayDiv = document.createElement("div");
	displayDiv.id = "puntos";
	displayDiv.innerHTML = "<p><br><b>Información</b>: El usuario tiene <b>"+defensas+"</b> puntos en defensas según esta información.";
	displayOpts.appendChild(displayDiv);  
}

//LUNA

var defensasLuna = 0;

var lanzamisiles = document.evaluate( '//div[@id="tab6"]/table/tbody/tr/td/table/tbody/tr[17]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < lanzamisiles.snapshotLength; i++ )  { 
	fila = lanzamisiles.snapshotItem(i);
	_lanzamisiles = fila.innerHTML.replace(".","");
	defensasLuna += 2*_lanzamisiles;
}

var laser = document.evaluate( '//div[@id="tab6"]/table/tbody/tr/td/table/tbody/tr[18]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < laser.snapshotLength; i++ )  { 
	fila = laser.snapshotItem(i);
	_laser = fila.innerHTML.replace(".","");
	defensasLuna += 2*_laser;
}

var laserG = document.evaluate( '//div[@id="tab6"]/table/tbody/tr/td/table/tbody/tr[19]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < laserG.snapshotLength; i++ )  { 
	fila = laserG.snapshotItem(i);
	_laserG = fila.innerHTML.replace(".","");
	defensasLuna += 8*_laserG;
}

var ionico = document.evaluate( '//div[@id="tab6"]/table/tbody/tr/td/table/tbody/tr[20]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < ionico.snapshotLength; i++ )  { 
	fila = ionico.snapshotItem(i);
	_ionico = fila.innerHTML.replace(".","");
	defensasLuna += 8*_ionico;
}

var gauss = document.evaluate( '//div[@id="tab6"]/table/tbody/tr/td/table/tbody/tr[21]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < gauss.snapshotLength; i++ )  { 
	fila = gauss.snapshotItem(i);
	_gauss = fila.innerHTML.replace(".","");
	defensasLuna += 37*_gauss;
}

var plasmas = document.evaluate( '//div[@id="tab6"]/table/tbody/tr/td/table/tbody/tr[22]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < plasmas.snapshotLength; i++ )  { 
	fila = plasmas.snapshotItem(i);
	_plasma = fila.innerHTML.replace(".","");
	defensasLuna += 130*_plasma;
}

var cupulaP = document.evaluate( '//div[@id="tab6"]/table/tbody/tr/td/table/tbody/tr[23]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < cupulaP.snapshotLength; i++ )  { 
	fila = cupulaP.snapshotItem(i);
	_cupulaP = fila.innerHTML.replace(".","");
	defensasLuna += 20*_cupulaP;
}

var cupulaG = document.evaluate( '//div[@id="tab6"]/table/tbody/tr/td/table/tbody/tr[24]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < cupulaG.snapshotLength; i++ )  { 
	fila = cupulaG.snapshotItem(i);
	_cupulaG = fila.innerHTML.replace(".","");
	defensasLuna += 100*_cupulaG;
}

var misilA = document.evaluate( '//div[@id="tab6"]/table/tbody/tr/td/table/tbody/tr[25]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < misilA.snapshotLength; i++ )  { 
	fila = misilA.snapshotItem(i);
	_misilA = fila.innerHTML.replace(".","");
	defensasLuna += 10*_misilA;
}

var misilI = document.evaluate( '//div[@id="tab6"]/table/tbody/tr/td/table/tbody/tr[26]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < misilI.snapshotLength; i++ )  { 
	fila = misilI.snapshotItem(i);
	_misilI = fila.innerHTML.replace(".","");
	defensasLuna += 25*_misilI;
}

// Contabiliza los edificios de la luna
var edificiosLuna = 0;
var phalanx_ = document.evaluate( '//div[@id="tab6"]/table/tbody/tr/td/table/tbody/tr[14]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < phalanx_.snapshotLength; i++ )  { 
	fila = phalanx_.snapshotItem(i);
	_phalanx = 40*Math.pow(2,fila.innerHTML-1);
	edificiosLuna += _phalanx;
}

var saltocuantico_ = document.evaluate( '//div[@id="tab6"]/table/tbody/tr/td/table/tbody/tr[15]/td', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
for ( var i=1 ; i < saltocuantico_.snapshotLength; i++ )  { 
	fila = saltocuantico_.snapshotItem(i);
	_saltocuantico = 4000*Math.pow(2,fila.innerHTML-1);
	edificiosLuna += _saltocuantico;
}

//Añade la información
var capa = document.evaluate( '//div[@id="tab6"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
if (capa.snapshotLength != 0) {
	displayOpts =  capa.snapshotItem(0);
}
if (displayOpts) {
	displayDiv = document.createElement("div");
	displayDiv.id = "puntos";
	displayDiv.innerHTML = "<p><br><b>Información</b>: El usuario tiene <b>"+defensasLuna+"</b> puntos en defensas según esta información.";
	displayOpts.appendChild(displayDiv);  
}

//NAVES

naves = 0;

var peCarga = document.evaluate( '//div[@id="tab3"]/table/tbody/tr/td/table/tbody/tr[2]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
contenido = peCarga.singleNodeValue;
_peCarga = contenido.innerHTML.replace(".","");
naves += 2*_peCarga;

var grCarga = document.evaluate( '//div[@id="tab3"]/table/tbody/tr/td/table/tbody/tr[2]/td[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
contenido = grCarga.singleNodeValue;
_grCarga = contenido.innerHTML.replace(".","");
naves += 6*_grCarga;

var Cligero = document.evaluate( '//div[@id="tab3"]/table/tbody/tr/td/table/tbody/tr[3]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
contenido = Cligero.singleNodeValue;
_Cligero = contenido.innerHTML.replace(".","");
naves += 4*_Cligero;

var CPesado = document.evaluate( '//div[@id="tab3"]/table/tbody/tr/td/table/tbody/tr[3]/td[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
contenido = CPesado.singleNodeValue;
_CPesado = contenido.innerHTML.replace(".","");
naves += 10*_CPesado;

var CR = document.evaluate( '//div[@id="tab3"]/table/tbody/tr/td/table/tbody/tr[4]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
contenido = CR.singleNodeValue;
_CR = contenido.innerHTML.replace(".","");
naves += 29*_CR;

var NB = document.evaluate( '//div[@id="tab3"]/table/tbody/tr/td/table/tbody/tr[4]/td[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
contenido = NB.singleNodeValue;
_NB = contenido.innerHTML.replace(".","");
naves += 60*_NB;

var Colono = document.evaluate( '//div[@id="tab3"]/table/tbody/tr/td/table/tbody/tr[5]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
contenido = Colono.singleNodeValue;
_Colono = contenido.innerHTML.replace(".","");
naves += 20*_Colono;

var Recicla = document.evaluate( '//div[@id="tab3"]/table/tbody/tr/td/table/tbody/tr[5]/td[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
contenido = Recicla.singleNodeValue;
_Recicla = contenido.innerHTML.replace(".","");
naves += 9*_Recicla;

var Sonda = document.evaluate( '//div[@id="tab3"]/table/tbody/tr/td/table/tbody/tr[6]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
contenido = Sonda.singleNodeValue;
_Sonda = contenido.innerHTML.replace(".","");
naves += 0.5*_Sonda;

var bombarder = document.evaluate( '//div[@id="tab3"]/table/tbody/tr/td/table/tbody/tr[6]/td[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
contenido = bombarder.singleNodeValue;
_bombarder = contenido.innerHTML.replace(".","");
naves += 90*_bombarder;

var des = document.evaluate( '//div[@id="tab3"]/table/tbody/tr/td/table/tbody/tr[7]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
contenido = des.singleNodeValue;
_des = contenido.innerHTML.replace(".","");
naves += 125*_des;

var edm = document.evaluate( '//div[@id="tab3"]/table/tbody/tr/td/table/tbody/tr[7]/td[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
contenido = edm.singleNodeValue;
_edm = contenido.innerHTML.replace(".","");
naves += 10000*_edm;

var aco = document.evaluate( '//div[@id="tab3"]/table/tbody/tr/td/table/tbody/tr[8]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
contenido = aco.singleNodeValue;
_aco = contenido.innerHTML.replace(".","");
naves += 85*_aco;

var ss = document.evaluate( '//div[@id="tab3"]/table/tbody/tr/td/table/tbody/tr[8]/td[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
contenido = ss.singleNodeValue;
_ss = contenido.innerHTML.replace(".","");
naves += 1.25*_ss;

//Recuperamos la puntuación actual de militares
var puntos_actuales = document.evaluate( '//div[@id="tab1"]/table/tbody/tr[7]/td[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
cadena_PA = puntos_actuales.singleNodeValue.innerHTML;
pos1 = cadena_PA.indexOf("Puntos ");
cadena_puntos = cadena_PA.substring(pos1+7, cadena_PA.length);
var puntos_militares_actuales = cadena_puntos.replace(/\./g,"");

var puntos_militares_visibles = defensas + defensasLuna + naves + edificiosLuna;

var diferencia = puntos_militares_actuales - puntos_militares_visibles;
diferencia_ = miles(""+diferencia); 

//Añade la información
var capa = document.evaluate( '//div[@id="tab3"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
if (capa.snapshotLength != 0) {
	displayOpts =  capa.snapshotItem(0);
}
if (displayOpts) {
	displayDiv = document.createElement("div");
	displayDiv.id = "puntos";
	displayDiv.innerHTML = "<p><br><b>Información</b>: El usuario tiene <b>"+naves+"</b> puntos en naves según esta información.";
	displayOpts.appendChild(displayDiv);  
}
//Añade la información
var capa = document.evaluate( '//div[@id="tab1"]/table/tbody',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
if (capa.snapshotLength != 0) {
   displayOpts =  capa.snapshotItem(0);
}
if (displayOpts) {
	displayTrPTV = document.createElement("tr");
	displayTrPTV.id = "puntosTotales";
	displayTrPTV.setAttribute("class", "firstcolor");
	cadenaPuntos = miles(""+puntos_militares_visibles) + " puntos ";
	if (diferencia > 0) {
		displayTrPTV.setAttribute("style", "color:red;");
		cadenaPuntos = cadenaPuntos + " - Hay puntos militares desconocidos ("+diferencia_+" puntos)";
	} else
	if (diferencia < 0) {
	displayTrPTV.setAttribute("style", "color:white;");
	//alert("AVISO! La puntuación militar está obsoleta. Por favor, revise la clasificación para que se actualice la puntuación militar.");
	cadenaPuntos = cadenaPuntos + " - PUNTUACION DESACTUALIZADA!!! Sobran ("+diferencia_+" puntos)";
	} else {
		displayTrPTV.setAttribute("style", "color:green;");
		cadenaPuntos = cadenaPuntos + " - La puntuación visible coincide exctamente con la puntuación total"
	} 
	displayTdPTVName = document.createElement("td");
	textoTdPTVName = document.createTextNode("Puntos militares visibles");
	displayTdPTVName.appendChild(textoTdPTVName);
	displayTdPTVPoints = document.createElement("td");
	textoTdPTVPoints = document.createTextNode(cadenaPuntos);
	displayTdPTVPoints.appendChild(textoTdPTVPoints);
	displayTrPTV.appendChild(displayTdPTVName);
	displayTrPTV.appendChild(displayTdPTVPoints); 

	displayTrPlanet = document.createElement("tr");
	displayTrPlanet.id = "puntosPlanet";
	displayTrPlanet.setAttribute("class", "firstcolor");
	displayTrPlanet.setAttribute("style", "color:white;");
	displayTdPlanetName = document.createElement("td"); 
	displayTdPlanetName = document.createElement("td");
	textoTdPlanetName = document.createTextNode("Defensas en planetas");
	displayTdPlanetName.appendChild(textoTdPlanetName);
	displayTdPlanetPoints = document.createElement("td");
	textoTdPlanetPoints = document.createTextNode(miles(""+defensas) + " puntos");
	displayTdPlanetPoints.appendChild(textoTdPlanetPoints);
	displayTrPlanet.appendChild(displayTdPlanetName);
	displayTrPlanet.appendChild(displayTdPlanetPoints);
   
	displayTrMoon = document.createElement("tr");
	displayTrMoon.id = "puntosMoon";
	displayTrMoon.setAttribute("class", "firstcolor");
	displayTrMoon.setAttribute("style", "color:white;");
	displayTdMoonName = document.createElement("td");
	textoTdMoonName = document.createTextNode("Defensas en Lunas");
	displayTdMoonName.appendChild(textoTdMoonName);
	displayTdMoonPoints = document.createElement("td");
	textoTdMoonPoints = document.createTextNode(miles(""+defensasLuna) + " puntos");
	displayTdMoonPoints.appendChild(textoTdMoonPoints);
	displayTrMoon.appendChild(displayTdMoonName);
	displayTrMoon.appendChild(displayTdMoonPoints);

	displayTrFloat = document.createElement("tr");
	displayTrFloat.id = "puntosFloat";
	displayTrFloat.setAttribute("class", "firstcolor");
	displayTrFloat.setAttribute("style", "color:white;");
	displayTdFloatName = document.createElement("td");
	textoTdFloatName = document.createTextNode("Naves");
	displayTdFloatName.appendChild(textoTdFloatName);
	displayTdFloatPoints = document.createElement("td");
	textoTdFloatPoints = document.createTextNode(miles(""+naves) + " puntos");
	displayTdFloatPoints.appendChild(textoTdFloatPoints);
	displayTrFloat.appendChild(displayTdFloatName);
	displayTrFloat.appendChild(displayTdFloatPoints);

	displayOpts.appendChild(displayTrPTV);
	displayOpts.appendChild(displayTrPlanet);
	displayOpts.appendChild(displayTrMoon);
	displayOpts.appendChild(displayTrFloat);
}