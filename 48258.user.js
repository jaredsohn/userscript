// ==UserScript==
// @name          Resaltador de gangas de comercio
// @namespace     http://quimicefa.wordpress.com
// @include       http://*.travian.net/build.php?id=*&t=*
// ==/UserScript==

// Color con el que quedara la fila fila resaltada
var colorOferta = '#007000'; 
var colorRazonable = '#d00000' ; 
var colorIgual =  '#FFFF00'; 

//'#FFFF00'; // = amarillo
//'#FFbb00' ; // = naranja
//'#D0D0D0'; // = gris claro

// Que resaltamos en el panel de compra ?
var resaltarOferta = true;
var resaltarIgual = true;
var resaltarRazonable = true;
var coefRazonable = 0.85;


results = document.evaluate("//table[@id='market_buy']/tbody/tr",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
if (results.snapshotLength == 0) {return;}

var ofrezco;
var busco;
for (var i=1; i<results.snapshotLength; i++) {
//	alert(results.snapshotItem(i).getElementsByTagName('td')[1].innerHTML);
	ofrezco = parseInt(results.snapshotItem(i).getElementsByTagName('td')[1].innerHTML);
	busco = parseInt(results.snapshotItem(i).getElementsByTagName('td')[3].innerHTML);
	//alert("ofrezo: " + ofrezco + " busco: " + busco);
	
	if ( resaltarOferta & ( ofrezco > busco ) )  
	{
		results.snapshotItem(i).style.backgroundColor = colorOferta;
		if ( results.snapshotItem(i).getElementsByTagName('td')[6].innerHTML.toUpperCase().indexOf('HREF') != -1 ) {
			results.snapshotItem(i).getElementsByTagName('td')[6].style.setProperty( "text-decoration", "blink", "" );
		}
	}

	// es igual ?
	if ( resaltarIgual & ( busco == ofrezco )  )
	{
	results.snapshotItem(i).style.backgroundColor = colorIgual;
		if ( results.snapshotItem(i).getElementsByTagName('td')[6].innerHTML.toUpperCase().indexOf('HREF') != -1 ) {
			results.snapshotItem(i).getElementsByTagName('td')[6].style.setProperty( "text-decoration", "blink", "" );
		}
	}

	// es razonable ?
	if ( resaltarRazonable & busco > ofrezco & busco*coefRazonable <= ofrezco  )
	{
	results.snapshotItem(i).style.backgroundColor = colorRazonable;
		if ( results.snapshotItem(i).getElementsByTagName('td')[6].innerHTML.toUpperCase().indexOf('HREF') != -1 ) {
			results.snapshotItem(i).getElementsByTagName('td')[6].style.setProperty( "text-decoration", "blink", "" );
		}
	}
}