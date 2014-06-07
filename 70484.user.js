// ==UserScript==
// @name           Opt Res
// @namespace      http://traviansecrets.ru/
// @description    Помогает сбалансировать выработку ресурсов.
// @include        http://s*.travian.*/dorf1.php*
// ==/UserScript==

var offset = 4;
var vProduccion = new Array(4);
var vProduccionNormalizada = new Array(4);
var vNormal = new Array(10,12,8,5);	// нормальное развитие
//var vNormal = new Array(6,5,9,2);	// производство легионеров
//var vNormal = new Array(15,16,21,8);	// производство империанцев

var colorLimitante = '#FF6A6A';
var colorExcedente = '#66CD00';

var allDivs, thisDiv;

allDivs = document.evaluate("//table[@id='production']/tbody/tr",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);									
var token;
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);   
	token= thisDiv.textContent.split(':')[1].split(' ')[0];
	token = parseInt(token); //.substring(0,token.length-offset);
	vProduccion[i]  = token;
	}

/*
Normalizamos
*/
for ( i=0; i<vProduccion.length;i++){
	vProduccionNormalizada[i] = vProduccion[i] / vNormal[i];
}

/*
Buscamos el mínimo
*/
var minI = 0, maxI = 0;
var minVal = vProduccionNormalizada[0], maxVal = vProduccionNormalizada[0];
for ( i=1; i<vProduccionNormalizada.length;i++){
	if ( minVal > vProduccionNormalizada[i]) {
		minVal = vProduccionNormalizada[i];
		minI = i;
	}
	if ( maxVal < vProduccionNormalizada[i]) {
		maxVal = vProduccionNormalizada[i];
		maxI = i;
	}
}

/*
Resaltar el mínimo para indicar al usuario por donde falla la producción
*/
allDivs.snapshotItem(minI).style.setProperty( "color", colorLimitante, "" );
allDivs.snapshotItem(maxI).style.setProperty( "color", colorExcedente, "" );
