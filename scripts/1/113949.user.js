// ==UserScript==

// @name          dbpushing
// @namespace     thagul
// @description   Evindenzia pushing bianco
// @include       http://s*.gladiatus.it/admin/index.php?action=module&modName=MarketLog*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js

// ==/UserScript==

var nomi_utiliz = new Array();
var prezzi_utiliz = new Array();
var valori_utiliz = new Array();

nomi_utiliz[0]='Mela';
prezzi_utiliz[0]=42;
valori_utiliz[0]=4;

nomi_utiliz[1]='Banane';
prezzi_utiliz[1]=66;
valori_utiliz[1]=6;

nomi_utiliz[2]='Formaggio';
prezzi_utiliz[2]=75;
valori_utiliz[2]=6;

nomi_utiliz[3]='Pagnotta';
prezzi_utiliz[3]=87;
valori_utiliz[3]=7;

nomi_utiliz[4]='Pesce';
prezzi_utiliz[4]=96;
valori_utiliz[4]=8;

nomi_utiliz[5]='Macedonia';
prezzi_utiliz[5]=120;
valori_utiliz[5]=10;

nomi_utiliz[6]='Pane';
prezzi_utiliz[6]=129;
valori_utiliz[6]=11;

nomi_utiliz[7]='Panino con banane';
prezzi_utiliz[7]=150;
valori_utiliz[7]=13;

nomi_utiliz[8]='Cosciotto';
prezzi_utiliz[8]=162;
valori_utiliz[8]=14;

nomi_utiliz[9]='Panino al formaggio';
prezzi_utiliz[9]=162;
valori_utiliz[9]=14;

nomi_utiliz[10]='Pane con banane';
prezzi_utiliz[10]=183;
valori_utiliz[10]=15;

nomi_utiliz[11]='Panino con pesce';
prezzi_utiliz[11]=183;
valori_utiliz[11]=15;

nomi_utiliz[12]='Bistecca';
prezzi_utiliz[12]=195;
valori_utiliz[12]=16;

nomi_utiliz[13]='Pane con formaggio';
prezzi_utiliz[13]=195;
valori_utiliz[13]=16;

nomi_utiliz[14]='Pane con pesce';
prezzi_utiliz[14]=216;
valori_utiliz[14]=18;

nomi_utiliz[15]='Pollo';
prezzi_utiliz[15]=216;
valori_utiliz[15]=18;

nomi_utiliz[16]='Torta';
prezzi_utiliz[16]=228;
valori_utiliz[16]=19;

nomi_utiliz[17]='Piatto della festa';
prezzi_utiliz[17]=249;
valori_utiliz[17]=21;

nomi_utiliz[18]='Panino con bistecca';
prezzi_utiliz[18]=258;
valori_utiliz[18]=22;

nomi_utiliz[19]='Pane con bistecca';
prezzi_utiliz[19]=291;
valori_utiliz[19]=24;

nomi_utiliz[20]='Pozione';
prezzi_utiliz[20]=324;
valori_utiliz[20]=27;

function isUtile(str) {
	for( var i=0;i<nomi_utiliz.length;i++) {
		if (str == nomi_utiliz[i]) {
			return i;
		}
	}
	return -1;
}

function testa(str,val,pvend) {
	for( var i=0;i<nomi_utiliz.length;i++)
		if(str == nomi_utiliz[i] && val == valori_utiliz[i])
			return pvend - prezzi_utiliz[i];
	return -1;
}


$('#content').find('table').children().children().each(function() {	
	tdList = $(this).children();
	nome = tdList.next().next().next().first().text();
	colore = tdList.next().next().next().next().first().css('background-color');
	valore = tdList.next().next().next().next().next().first().text();
	prezzo = tdList.next().next().next().next().next().next().first().text();
	// alert(nome + "-" + valore + "-" + prezzo + "-" + colore);
	id = isUtile(nome)
	if (id < 0 || colore!='rgb(255, 255, 255)' || valore!=valori_utiliz[id]) {
		return;
	}
	
	if (prezzo > prezzi_utiliz[id]) {
		tdList.next().next().next().next().next().next().first().css('background-color','red').css('color','white');
	} else {
		tdList.next().next().next().next().next().next().first().css('background-color','green').css('color','white');
	}
});
