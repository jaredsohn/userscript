// ==UserScript==
// @name           handel geno
// @namespace      generalo
// @description    generaB do handlu na desercie
// @include        http://*desert-operations.ae/world*/handel.php*
// @include        http://*desert-operations.ba/world*/handel.php*
// @include        http://*desert-operations.com/world*/handel.php*
// @include        http://*desert-operations.com.br/world*/handel.php*
// @include        http://*desert-operations.com.hr/world*/handel.php*
// @include        http://*desert-operations.com.pt/world*/handel.php*
// @include        http://*desert-operations.de/world*/handel.php*
// @include        http://*desert-operations.es/world*/handel.php*
// @include        http://*desert-operations.fr/world*/handel.php*
// @include        http://*desert-operations.it/world*/handel.php*
// @include        http://*desert-operations.mx/world*/handel.php*
// @include        http://*desert-operations.nl/world*/handel.php*
// @include        http://*desert-operations.pl/world*/handel.php*
// @include        http://*desert-operations.ru/world*/handel.php*
// @include        http://*desert-operations.se/world*/handel.php*
// @include        http://*desert-operations.tr/world*/handel.php*
// @include        http://*desert-operations.us/world*/handel.php*
// ==/UserScript==

/*
handel generał
:D
plan:
1. umieścić oferty w tablicy
2. wyciągnąć z tego ilość produktu i cenę
3. wykonać działanie którego wynikiem będzie procent ceny godziwej
4. wklepać to na stronę - kolorkami rzecz jasna
5. to byłoby chyba wszystko :)
*/

var dc=document;
/*----------------- 
Funkcje pomagające działać z tablicami :)))
-----------------*/
function implode (glue, pieces) {
    var i = '', retVal='', tGlue='';
    if (arguments.length === 1) {        pieces = glue;
        glue = '';
    }
    if (typeof(pieces) === 'object') {
        if (pieces instanceof Array) {            return pieces.join(glue);
        }
        else {
            for (i in pieces) {
                retVal += tGlue + pieces[i];                tGlue = glue;
            }
            return retVal;
        }
    }    else {
        return pieces;
    }
}
function explode(item,delimiter) {
	tempArray=new Array(1);
	var Count=0;
	var tempString=new String(item);

	while (tempString.indexOf(delimiter)>0) {
		tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
		tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
		Count=Count+1
	}

	tempArray[Count]=tempString;
	return tempArray;
} 
/*---------------------
Funkcje Szukające :D:D 
---------------------*/
function StrSeek( Str, arr ) {
  var bck =Str;
  for( var i=0; i != arr.length-1; i++ ) {
    bck = bck.split( arr[i] );
	if( bck.length > 1 ) bck =bck[1];
	else return null;
  }
  bck =bck.split( arr[i] );
  return bck.length > 1 ? bck[0] : null;
}

function BodySeek( gdzie, arr ) { return StrSeek( gdzie, arr ); }
function sreplace(f, r, s){
	var ra = r instanceof Array, sa = s instanceof Array, l = (f = [].concat(f)).length, r = [].concat(r), i = (s = [].concat(s)).length;
	while(j = 0, i--)
		while(s[i] = s[i].split(f[j]).join(ra ? r[j] || "" : r[0]), ++j < l);
	return sa ? s : s[0];
}

/*-------------------------
1
-------------------------*/
function ofertyDoTablicy(){
	var wiersze = dc.getElementsByTagName('tr');
	var tablica = [];
	for(var i=0;i<wiersze.length;i++){
		if(wiersze[i].className == 'odd' && i > 3) tablica.push(wiersze[i]);
		if(wiersze[i].className == 'even' && i > 3) tablica.push(wiersze[i]);
	}
	return tablica; // Done!!! 1-50 to oferty :D
}
/*--------------------
2
--------------------*/

function cenaOrazIlosc(){
	var tablicazLiczbami = [];
	var siema = ofertyDoTablicy();
	var wyr3 = /^[\s]+[0-9]+[\s]+M/;
	var wyr4 = /[\s][\s][\s]+[0-9]+[\s]+M/g;
	var ty;
	var yt;
	var ilosc = [];
	var cena = [];
	for(var a = 0;a<siema.length; a++){
		ty = siema[a].innerHTML;
		ty = ty.replace(/<(?:.|\s)*?>/g,'');
		ty = ty.replace(/[\.,]/g,'');
		yt = ty.replace(/^[\s]+[0-9]+[\s]+[A-Za-zŻłó\-0-9]+/, '');
		if(wyr3.test(ty)==true){
			ilosc[a] = ty.match(/^[\s]+[0-9]+[\s]+M/g);
		}else{
			ilosc[a] = ty.match(/^[\s]+[0-9]+/);
		}
		if(wyr4.test(yt)==true){
			cena[a] = yt.match(/[\s]+[0-9]+[\s]+M/);
		}else{
			cena[a] = yt.match(/[\s]+[0-9]+/);
		}
		tablicazLiczbami[a] = 'ilosc:' + ilosc[a] + ',' + cena[a] + 'cena';
	}
	return tablicazLiczbami;
	//tablicazLiczbami; // Done!!! rekordy w postaci ilosc:x,ycena
}

/*-------------------
3
-------------------*/
//funkcja wywołująca cenę jednostki
function ceny(){
	var cojest = window.location.toString();
	cojest = BodySeek(cojest, ['&object_id=','&']);
	switch(cojest)
	{
		case 'r_2': return 1000;
		case 'r_3': return 500;
		case 'r_4': return 7;
	}
	var obj = dc.getElementsByName('object_id')[0];
	obj = obj.options[obj.selectedIndex].text;
	obj = BodySeek(obj, [':', 'P']);
	obj = parseInt(obj.replace(/[\s\.,]/g, ''));
	if(obj) return obj;

	
}
//procent ceny godziwej, koniec operacji na liczbach
function procentCenyGodziwej(){
	var tzL = cenaOrazIlosc();
	var tzP = [];
	var tempil;
	var tempce;
	var rex = /[0-9]+[\s]M/;
	for(var t = 1; t<tzL.length; t++){
		tempil = BodySeek(tzL[t], ['ilosc:', ',']);
		tempce = BodySeek(tzL[t], [',', 'cena']);
		if(rex.test(tempil)){
			tempce = parseInt(tempce) * 100000;
			tempil = parseInt(tempil) * 100000;
		}else{
			tempil=parseInt(tempil);
			if(tempil*ceny() > 1000000000){
				tempce = parseInt(tempce) * 100000;
			}
			if(rex.test(tempce)){
				tempce = parseInt(tempce) * 100000;
			}else{
				tempce=parseInt(tempce);
			}
		}
		tzP[t]= tempce/tempil;
		tzP[t] = Math.round(tzP[t] * 100 / ceny());
		if(tzP[t] < 50) tzP[t] = Math.round( ( (tempce*100000) / tempil ) * 100 / ceny());
		if(tzP[t] > 7999999) tzP[t] = Math.round( ( tempce / (tempil*100000) ) * 100 / ceny());
	}
	return tzP; // Done Procent w formie liczby
	
}
/*-------------------
4
-------------------*/

function wklepNaStrone(){
	var pro = procentCenyGodziwej();
	var wiersze = dc.getElementsByTagName('tr');
	var tablica = [];
	var proc;
	for(var i=0;i<wiersze.length;i++){
		var td = document.createElement('td');
		if(pro[i-13] < 85){
			td.style.color='lime';
		}
		if(pro[i-13] > 85 && pro[i-13] < 95){
			td.style.color='#99FF33';
		}
		if(pro[i-13] > 95 && pro[i-13] < 105){
			td.style.color='#FFFF66';
		}
		if(pro[i-13] > 105 && pro[i-13] < 115){
			td.style.color='#FF9933';
		}
		if(pro[i-13] > 115){
			td.style.color='red';
		}
		td.innerHTML = pro[i-13]+'%';
		if(wiersze[i].className == 'odd' && i > 3) wiersze[i].appendChild(td);
		if(wiersze[i].className == 'even' && i > 3) wiersze[i].appendChild(td);
	}
	//Done!!! Na koncu wiersza wbita komórka z procentem w postaci x% gdzie x to jest liczbą (procent)
}

/******************************KONIEC****************************/
//WYWOŁANIE
wklepNaStrone();
/*Dziękóweczka, Pozdrowienia od lankou*/
