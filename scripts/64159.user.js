// ==UserScript==
// @name           ogame - comandante
// @namespace      ....
// @include        http://*.ogame.*/game/*
// @exclude		   http://board.ogame.*/*
// ==/UserScript==


var NUMERO_DE_SONDAS = 3;

// NO DEBERIAS TOCAR A PARTIR DE AQUI //
var PLANET_TYPE_LUNA = 1;
var ORDEN_ESPIAR =6;


function getGalaxy() {
	var result;
	var re;
	var tmp;
	var galaxy;
	var ss;

	result = document.evaluate('//div[@id="content"]/center/center/table/tbody/tr/td',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	re = new RegExp("[a-z,A-Z, ]", "g");
	tmp = result.snapshotItem(0).innerHTML.replace(re,"");
	galaxy = tmp.substring(0,1);
	ss = tmp.substring(2,tmp.length);
	GM_setValue("galaxy", galaxy); 
	GM_setValue("ss", ss); 
}

function getMoonPosition() {
	var result;
	var retval = null; // null si no hay lunas.
	var node;

	result = document.evaluate('//div[@id="content"]/center/center/table/tbody/tr/th[3]/a',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	//alert(result.snapshotLength);		// -> esto devuelve el nº de lunas en el ss.
	if (result.snapshotLength == 0 ){return retval;};
	// si estamos aqui es porque hay lunas en este sistema. Hay que localizar sus posiciones.
	retval = new Array();
	for (var i=0; i<result.snapshotLength; i++) {
			node = result.snapshotItem(i).parentNode.parentNode.getElementsByTagName('th')[0].getElementsByTagName('a')[0];
			retval[i]=node.innerHTML;
	}
	return retval;
}



function addSpyProbe ( moonPosition ) {
	//alert(moonPosition);
	var result;
	var node;
	var strbuffer;
	
	result = document.evaluate('//div[@id="content"]/center/center/table/tbody/tr/th[3]/a',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i=0; i<result.snapshotLength; i++) {
		node = result.snapshotItem(i).parentNode;		// a.onmouseover.
		/*
		REEMPLAZAR ESTO: <font color=#808080 >Espiar</font>
		CON ESTO: <a href=# onclick=doit(6,3,139,4,1,3) >Espiar</a>  
			doit(order, galaxy, system, planet, planettype, shipcount)
		*/
		strbuffer = node.innerHTML;

		//strbuffer = strbuffer.replace(new RegExp("\xa0": " ", 'g');, " ");
		 
		strbuffer = strbuffer.replace('<font color=#808080 >Espiar</font>','<a href=# onclick=doit('+ORDEN_ESPIAR+','+ GM_getValue('galaxy') + ',' + GM_getValue('ss') + ',' +moonPosition[i]+','+PLANET_TYPE_LUNA +','+NUMERO_DE_SONDAS +') >Espiar</a>');
		//alert(strbuffer);
		//alert('<a href=# onclick=doit('+ORDEN_ESPIAR+','+ GM_getValue('galaxy') + ',' + GM_getValue('ss') + ',' +moonPosition[i]+','+PLANET_TYPE_LUNA +','+NUMERO_DE_SONDAS +') >Espiar</a>');
		
		node.innerHTML=strbuffer;
	}
}


 if ( document.location.href.indexOf("/index.php?page=galaxy") != -1) {	// estamos en vista de galaxia.
	var moonPosition = new Array();
	
	getGalaxy();	// capturamos galaxia y sistema en la cookie.
	moonPosition = getMoonPosition();  // capturamos las posiciones en las que hay luna (y tendremos que cambiar el menu contextual)
	if ( moonPosition != null ) {
		//alert("hay lunas");
		//alert(moonPosition);
		addSpyProbe(moonPosition);
	} else {
		//alert("no hay lunas");
	}
}
