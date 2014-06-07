// ==UserScript==
// @name           Filtre Anpe
// @namespace      anpe
// @description    Mets en valeurs les offres récentes.
// @include        http://anpe.fr/espacecandidat/nicola/ModifierNombreOffresPage.do?nombreOffre=*
// @include	   http://anpe.fr/espacecandidat/nicola/ConsulterToutesLesOffres.do*
// @include	   http://anpe.fr/espacecandidat/nicola/PaginerListeOffres.do*
// @include	   http://anpe.fr/espacecandidat/nicola/TrierOffres.do*
// ==/UserScript==
var doffset = 1; //nombres de jours à mettre en valeurs 
doffset--;
var noffressel = 20; //nombre d'offres max affiché sur la page
var noffresmax = document.getElementsByTagName('select')[0].getElementsByTagName('option'); 
for(i=0; i < noffresmax.length; i++) {
	if( noffresmax[i].selected ){
		noffressel = noffresmax[i].value;	
	}
}

var nresult = document.getElementsByTagName('table')[5].getElementsByTagName('b')[0].innerHTML.split(' offres de type')[0]; //nombre de résultats

var npages = nresult / noffressel; //nombre de pages de résultats
npages = parseInt(npages) + 1;

var pageaff = 1 ; // Numéro de la page affichée
if ( location.href.split('?')[0] == "http://anpe.fr/espacecandidat/nicola/PaginerListeOffres.do" ) {
	pageaff = location.href.split('numPage=')[1].split('&')[0];
}

var trstart;
if ( npages == 1 ) {
	trstart = 6;
}
else {
	trstart = 9;
}

var poffres = noffressel; //nombre d'offres sur la page courante
if( pageaff == npages ){
	poffres = nresult - (npages-1) * noffressel;	
}

toffres = document.getElementsByTagName('table')[8].getElementsByTagName('tr');
today = new Date();
t = new Date(today.getFullYear(), today.getMonth(), today.getDate()-doffset);
ts = t.getTime();
for( i = trstart; i < 3 * poffres + trstart; i += 3 ){
	doffre = toffres[i].getElementsByTagName('td')[5];
	dts = convertDate(doffre.innerHTML);
	if ( dts >= ts ){
		toffres[i].style.background = 'pink';	
	}	
}

/* Fonctions diverses */
function convertDate(d){
	var da = d.split('/');
	var dd = da[0];
	var dm = da[1]-1;
	var dy = da[2];
	var dat = new Date(dy, dm, dd);
	return dat.getTime();
}