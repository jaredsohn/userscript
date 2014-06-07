// ==UserScript==
// @name          Pmanager AT and GS counter
// @description	  Work with ONLY Hungarian language
// @include       http://www.pmanager.org/titulares.asp*
// @include       http://pmanager.org/titulares.asp*
// @require       http://code.jquery.com/jquery-1.6.4.min.js
// ==/UserScript==

var masodikra_csak = 0;
$(document).ready(function(){
	$('tr').click(function(){
		if(($(this).html()).substring(6,27) == '<td class="titulares"' || ($(this).html()).substring(6,21) == '<td class="drs"' ){
			if(masodikra_csak == 1){
				masodikra_csak = 0;
				
				kezdo_adat();
				csere_adat();
				kezdo_gs(1);
				csere_gs(1);
				
				taktika_KIIRATAS(1);
			}
			else masodikra_csak = 1;
		}
	});
});

//adatok lementese
var i,j = 0;
kezdo = new Array();
csere = new Array();

//kezdo
function kezdo_adat(){
	for(i=0; i<11; i++){
		kezdo[i] = new Array(18);
		for(j=0; j<18; j++){		
			if(j==3) kezdo[i][j] = parseInt(($('tr[onclick="clicked('+i+','+i+')"]').find('div').eq(j).text()).substring(0,3));
			else if(j==16) kezdo[i][j] = get_Forma($('tr[onclick="clicked('+i+','+i+')"]').find('td').eq(16).html())
			else if(j==17) kezdo[i][j] = get_Tapasztalat($('tr[onclick="clicked('+i+','+i+')"]').find('td').eq(16).html());
			else if(j>3) kezdo[i][j] = parseInt($('tr[onclick="clicked('+i+','+i+')"]').find('div').eq(j).text());
			else if(j==1){
				var segito = $('tr[onclick="clicked('+i+','+i+')"]').find('div').eq(j).text();
				kezdo[i][j] = segito.substr(segito.indexOf(" ") + 1,segito.length);
			}
			else kezdo[i][j] = $('tr[onclick="clicked('+i+','+i+')"]').find('div').eq(j).text();
		}
	}
}
//csere
var jatekos_szam;

function csere_adat(){
	var bool=0;
	i=11;
	while(i<50 && bool==0){
		if( $('tr[onclick="clicked('+i+','+(i+2)+')"]').find('div').eq(1).text() == "") bool = 1;
		else{
			csere[i-11] = new Array(17);
			for(j=0; j<17; j++){
				if(j==2) csere[i-11][j] = parseInt(($('tr[onclick="clicked('+i+','+(i+2)+')"]').find('div').eq(j).text()).substring(0,3));
				else if(j==15) csere[i-11][j] = get_Forma($('tr[onclick="clicked('+i+','+(i+2)+')"]').find('td').eq(16).html());
				else if(j==16) csere[i-11][j] = get_Tapasztalat($('tr[onclick="clicked('+i+','+(i+2)+')"]').find('td').eq(16).html());
				else if(j>2) csere[i-11][j] = parseInt($('tr[onclick="clicked('+i+','+(i+2)+')"]').find('div').eq(j).text());
				else csere[i-11][j] = $('tr[onclick="clicked('+i+','+(i+2)+')"]').find('div').eq(j).text();
			}
			i=i+1;
		}
	}
	jatekos_szam = i;
}

//adatok lementese

function get_Forma(frm){
	frm = frm.substr(frm.indexOf("Forma")+17,8);
	if(frm.substring(0,1) != "N") frm = frm.substr(0,1);
	
	frm = jQuery.trim(frm);
	
	if(frm == "C") return 0;
	else if(frm == "Nagyon g") return 1;
	else if(frm == "Á") return 2;
	else if(frm == "J") return 3;
	else if(frm == "Nagyon j") return 4;
	else return -1;
}

function get_Tapasztalat(tap){
	tap = tap.substr(tap.indexOf("Tapasztalat")+23,8);
	if(tap.substring(0,1) != "N") tap = tap.substr(0,1);
	
	tap = jQuery.trim(tap);
	
	if(tap == "P") return 0;
	else if(tap == "C") return 1;
	else if(tap == "Nagyon g") return 2;
	else if(tap == "G") return 3;
	else if(tap == "M") return 4;
	else if(tap == "J") return 5;
	else if(tap == "Nagyon j") return 6;
	else if(tap == "R") return 7;
	else if(tap == "Nagyszer") return 8;
	else if(tap == "V") return 9;
	else return -1;
}

//**************************************************************
// GS SZAMITAS
//**************************************************************

$('td[height="22"]').eq(16).after('<td align="center" height="22" width="3%" title="Fitnesz - Forma - Tapasztalat" alapjan Csokkentett GS"><b>GS</b></td>');
$('td[height="22"]').eq(34).after('<td align="center" height="22" width="3%" title="Fitnesz - Forma - Tapasztalat" alapjan Csokkentett GS"><b>GS</b></td>');


//kezdo
var kezdo_v, kezdo_k, kezdo_t;
kezdo_v = kezdo_k = kezdo_t = 0;

function kezdo_gs(reloaded){
	for(i=0; i<11; i++){	
		var fos=mes=mas=fis=0;
		if(kezdo[i][0] . substring(kezdo[i][0].length -1 , kezdo[i][0].length) == "K"){
			fos = (kezdo[i][4] + kezdo[i][5]) / 40 * (0.61);
			mes = (kezdo[i][6] + kezdo[i][7]) / 40 * (0.2);
			mas = (kezdo[i][8] + kezdo[i][9] + kezdo[i][10] + kezdo[i][11] + kezdo[i][12] + kezdo[i][13]) / 120 * (0.03);
			fis = (kezdo[i][14] + kezdo[i][15]) / 40 * (0.15);
		}
		else if(kezdo[i][0] . substring(kezdo[i][0].length -1 , kezdo[i][0].length) == "V"){
			fos = (kezdo[i][8] + kezdo[i][9]) / 40 * (0.61);
			mes = (kezdo[i][10] + kezdo[i][11]) / 40 * (0.2);
			mas = (kezdo[i][12] + kezdo[i][13] + kezdo[i][4] + kezdo[i][5] + kezdo[i][6] + kezdo[i][7]) / 120 * (0.03);
			fis = (kezdo[i][14] + kezdo[i][15]) / 40 * (0.15);
			if(reloaded == 0) kezdo_v = kezdo_v+1;
		}
		else if(kezdo[i][0] . substring(kezdo[i][0].length -1 , kezdo[i][0].length) == "P"){
			fos = (kezdo[i][10] + kezdo[i][11]) / 40 * (0.61);
			mes = (kezdo[i][8] + kezdo[i][13]) / 40 * (0.2);
			mas = (kezdo[i][9] + kezdo[i][12] + kezdo[i][4] + kezdo[i][5] + kezdo[i][6] + kezdo[i][7]) / 120 * (0.03);
			fis = (kezdo[i][14] + kezdo[i][15]) / 40 * (0.15);
			if(reloaded == 0) kezdo_k = kezdo_k+1;
		}
		else if(kezdo[i][0] . substring(kezdo[i][0].length -1 , kezdo[i][0].length) == "S" || kezdo[i][0] . substring(kezdo[i][0].length -1 , kezdo[i][0].length) == "T"){
			fos = (kezdo[i][12] + kezdo[i][13]) / 40 * (0.61);
			mes = (kezdo[i][9] + kezdo[i][11]) / 40 * (0.2);
			mas = (kezdo[i][8] + kezdo[i][10] + kezdo[i][4] + kezdo[i][5] + kezdo[i][6] + kezdo[i][7]) / 120 * (0.03);
			fis = (kezdo[i][14] + kezdo[i][15]) / 40 * (0.15);
			if(reloaded == 0) kezdo_t = kezdo_t+1;
		}
		var global_skill = fos+mes+mas+fis;
		
		//oldal csokkentes
		if(i>0){
			var segito = (kezdo[i][0]).substr(0,1);
			if(kezdo[i][1].indexOf(segito) == -1) global_skill = global_skill * 0.95;
		}
		
		
		if(reloaded == 0) $('tr[onclick="clicked('+i+','+i+')"]').find('td').eq(16).after(
			'<td><div style="color:white; background-color:black;" align="center" title="Fitnesz - Forma - Tapasztalat" alapjan Csokkentett GS">&nbsp;'
			+ Math.round(get_MGS(Math.round((global_skill)*1000)/10, kezdo[i][16], kezdo[i][17], kezdo[i][3])*10)/10
			+ '&nbsp;</div></td>');
		else  $('tr[onclick="clicked('+i+','+i+')"]').find('td').eq(17).html(
			'<td><div style="color:white; background-color:black;" align="center" title="Fitnesz - Forma - Tapasztalat" alapjan Csokkentett GS">&nbsp;'
			+ Math.round(get_MGS(Math.round((global_skill)*1000)/10, kezdo[i][16], kezdo[i][17], kezdo[i][3])*10)/10
			+ '&nbsp;</div></td>');
	}
}

//csere
function csere_gs(reloaded){
	for(i=0; i<(jatekos_szam-11); i++){	
		var fos=mes=mas=fis=0;
		if(csere[i][0] . substring(0,1) == "G"){
			fos = (csere[i][3] + csere[i][4]) / 40 * (0.61);
			mes = (csere[i][5] + csere[i][6]) / 40 * (0.2);
			mas = (csere[i][7] + csere[i][8] + csere[i][10] + csere[i][11] + csere[i][12] + csere[i][9]) / 120 * (0.03);
			fis = (csere[i][13] + csere[i][14]) / 40 * (0.15);
		}
		else if(csere[i][0] . substring(0,1) == "V"){
			fos = (csere[i][7] + csere[i][8]) / 40 * (0.61);
			mes = (csere[i][10] + csere[i][9]) / 40 * (0.2);
			mas = (csere[i][12] + csere[i][11] + csere[i][4] + csere[i][5] + csere[i][6] + csere[i][3]) / 120 * (0.03);
			fis = (csere[i][14] + csere[i][13]) / 40 * (0.15);
		}
		else if(csere[i][0] . substring(0,1) == "K"){
			fos = (csere[i][10] + csere[i][9]) / 40 * (0.61);
			mes = (csere[i][7] + csere[i][12]) / 40 * (0.2);
			mas = (csere[i][8] + csere[i][11] + csere[i][4] + csere[i][5] + csere[i][6] + csere[i][3]) / 120 * (0.03);
			fis = (csere[i][14] + csere[i][13]) / 40 * (0.15);
		}
		else if(csere[i][0] . substring(0,1) == "T"){
			fos = (csere[i][12] + csere[i][11]) / 40 * (0.61);
			mes = (csere[i][8] + csere[i][10]) / 40 * (0.2);
			mas = (csere[i][7] + csere[i][9] + csere[i][4] + csere[i][5] + csere[i][6] + csere[i][3]) / 120 * (0.03);
			fis = (csere[i][14] + csere[i][13]) / 40 * (0.15);
		}
		
		if(reloaded == 0) $('tr[onclick="clicked('+(i+11)+','+(i+13)+')"]').find('td').eq(16).after(
			'<td><div style="color:white; background-color:black;" align="center" title="Fitnesz - Forma - Tapasztalat" alapjan Csokkentett GS">&nbsp;'
			+ Math.round(get_MGS(Math.round((fos+mes+mas+fis)*1000)/10, csere[i][15], csere[i][16], csere[i][2])*10)/10
			+ '&nbsp;</div></td>');
		else $('tr[onclick="clicked('+(i+11)+','+(i+13)+')"]').find('td').eq(17).html(
			'<td><div style="color:white; background-color:black;" align="center" title="Fitnesz - Forma - Tapasztalat" alapjan Csokkentett GS">&nbsp;'
			+ Math.round(get_MGS(Math.round((fos+mes+mas+fis)*1000)/10, csere[i][15], csere[i][16], csere[i][2])*10)/10
			+ '&nbsp;</div></td>');
	}
}

function get_MGS(gs,forma,tapasztalat,fittnesz){
	var b,c,d,e,f;
	b = gs*(1+(forma - 2)*0.1)/100;
    c = 1+(tapasztalat-1)*0.02/3*2;
    d = 1+2*0.1;
    e = b*c/d;
    f = 1+6*0.02;
    return (e/f*fittnesz*1.012);
}

//**************************************************************
// GS SZAMITAS
//**************************************************************
////////////////////////////////////////////////////////////////
//**************************************************************
// SPECIALIS TAKTIKAK
//**************************************************************

var seged;

function teljes_gyo(){
	seged=0;
	for(i=0; i<11; i++) seged = seged + kezdo[i][14];
	return seged;
}

function teljes_ero(){
	seged=0;
	for(i=0; i<11; i++) seged = seged + kezdo[i][15];
	return seged;
}

function teljes_pas(){
	seged=0;
	for(i=0; i<11; i++) seged = seged + kezdo[i][10];
	return seged;
}

function teljes_fej(){
	seged=0;
	for(i=0; i<11; i++) seged = seged + kezdo[i][9];
	return seged;
}

function teljes_szer(){
	seged=0;
	for(i=0; i<11; i++) seged = seged + kezdo[i][8];
	return seged;
}

//les
function les_gyo(){
	seged=0;
	for(i=1; i<kezdo_v+1; i++) seged = seged + kezdo[i][14];
	return Math.round(seged/kezdo_v*100)/100;
}
function les_hel(){
	seged=0;
	for(i=1; i<kezdo_v+1; i++) seged = seged + kezdo[i][11];
	return Math.round(seged/kezdo_v*100)/100;
}
//les

//1on1
function egy_on_egy(){
	seged=0;
	for(i=kezdo_v+1; i<11; i++) seged = seged + kezdo[i][15] + kezdo[i][13];
	return Math.round(seged*100/(kezdo_k+kezdo_t)/2)/100;
}
//1on1

//kapus
function gk_kifut(){
	seged=0;
	seged = seged + kezdo[0][5] + kezdo[0][7];
	return Math.round(seged*100/2)/100;
}
function gk_vonal(){
	seged=0;
	seged = seged + kezdo[0][4] + kezdo[0][6];
	return Math.round(seged*100/2)/100;
}
//kapus

//vedekezes
function mrk_ember(){
	seged=0;
	for(i=1; i<kezdo_v+kezdo_k+1; i++) seged = seged + kezdo[i][8] + kezdo[i][15];
	return Math.round(seged*100/(kezdo_v+kezdo_k)/2)/100;
}
function mrk_terul(){
	seged=0;
	for(i=1; i<kezdo_v+kezdo_k+1; i++) seged = seged + kezdo[i][8] + kezdo[i][14];
	return Math.round(seged*100/(kezdo_v+kezdo_k)/2)/100;
}
//vedekezes

//tavoli
function tavoli(){
	seged=0;
	for(i=1+kezdo_v; i<11; i++) seged = seged + kezdo[i][12] + kezdo[i][13];
	return Math.round(seged*100/(kezdo_t+kezdo_k)/2)/100;
}
//tavoli

//kapas
function kapas(){
	seged=0;
	for(i=1+kezdo_k+kezdo_v; i<11; i++){
		seged = seged + kezdo[i][9] + kezdo[i][12];
	}
	if(kezdo_t > 2)	return Math.round(seged*100/(kezdo_t)/2)/100;
	else return "Minimum 3 csatar kell";
}
//kapas

//kiiratas
function taktika_KIIRATAS(reloaded){
	
	var zold, piros;
	zold='style="color:#393;"';
	piros='style="color:#933;"';
	
	if( ($('div.comentarios').eq( (1+reloaded)*9).text()).substr(0,12) == "Jelenleg nem") $('div.comentarios').eq( (1+reloaded)*9).html('<div '+piros+' class="comentarios" align="center">Jelenleg nem - <b><u>Kapaslovesek:</u> '+kapas()+'</b></div>');
	else $('div.comentarios').eq( (1+reloaded)*9).html('<div '+zold+' class="comentarios" align="center"><b><u>Kapaslovesek:</u> '+kapas()+'</b></div>');

	if( ($('div.comentarios').eq( (1+reloaded)*8).text()).substr(0,8) == "Most nem") $('div.comentarios').eq( (1+reloaded)*8).html('<div '+piros+' class="comentarios" align="center">Most nem - <b><u>Tavoli lovesek:</u> '+tavoli()+'</b></div>');
	else $('div.comentarios').eq( (1+reloaded)*8).html('<div '+zold+' class="comentarios" align="center"><b><u>Tavoli lovesek:</u> '+tavoli()+'</b></div>');

	if( ($('div.comentarios').eq( (1+reloaded)*7).text()).substr(0,3) == "Nem") $('div.comentarios').eq( (1+reloaded)*7).html('<div '+piros+' class="comentarios" align="center">Nem - <b><u>Emberfogas:</u> '+mrk_ember()+'</b> || <b><u>Teruletvedekezes:</u> '+mrk_terul()+'</b></div>');
	else if( (($('div.comentarios').eq( (1+reloaded)*7).text()).substr(11,5)).toLowerCase() == "ember") $('div.comentarios').eq( (1+reloaded)*7).html('<div '+zold+' class="comentarios" align="center"><b><u>Emberfogas:</u> '+mrk_ember()+'</b></div>');
	else if( (($('div.comentarios').eq( (1+reloaded)*7).text()).substr(0,5)).toLowerCase() == "ember") $('div.comentarios').eq( (1+reloaded)*7).html('<div '+zold+' class="comentarios" align="center"><b><u>Emberfogas:</u> '+mrk_ember()+'</b></div>');
	else $('div.comentarios').eq( (1+reloaded)*7).html('<div '+zold+' class="comentarios" align="center"><b><u>Teruletvedekezes:</u> '+mrk_terul()+'</b></div>');

	if( ($('div.comentarios').eq( (1+reloaded)*6).text()).substr(0,3) == "Nem") $('div.comentarios').eq( (1+reloaded)*6).html('<div '+piros+' class="comentarios" align="center">Nem - <b><u>Vonalon:</u> '+gk_vonal()+'</b> || <b><u>Kifutas:</u> '+gk_kifut()+'</b></div>');
	else if( ($('div.comentarios').eq( (1+reloaded)*6).text()).substr(10,3) == "véd" || ($('div.comentarios').eq( (1+reloaded)*6).text()).substr(0,3) == "Kif") $('div.comentarios').eq( (1+reloaded)*6).html('<div '+zold+' class="comentarios" align="center"><b><u>Kifutas:</u> '+gk_kifut()+'</b></div>');
	else $('div.comentarios').eq( (1+reloaded)*6).html('<div '+zold+' class="comentarios" align="center"><b><u>Vonalon:</u> '+gk_vonal()+'</b></div>');

	if( ($('div.comentarios').eq( (1+reloaded)*5).text()).substr(0,3) == "Nem") $('div.comentarios').eq( (1+reloaded)*5).html('<div '+piros+' class="comentarios" align="center">Nem - <b><u>Egy-az-Egyben:</u> '+egy_on_egy()+'</b></div>');
	else $('div.comentarios').eq( (1+reloaded)*5).html('<div '+zold+' class="comentarios" align="center"><b><u>Egy-az-Egyben:</u> '+egy_on_egy()+'</b></div>');
	
	if( ($('div.comentarios').eq( (1+reloaded)*4).text()).substr(0,3) == "Nem") $('div.comentarios').eq( (1+reloaded)*4).html('<div '+piros+' class="comentarios" align="center">Nem - <b><u>Magas Labdak:</u></b> Fejjatek: <b>'+teljes_fej()+'</b> | Ero: <b>'+teljes_ero()+'</b></div>');
	else $('div.comentarios').eq( (1+reloaded)*4).html('<div '+zold+' class="comentarios" align="center"><b><u>Magas Labdak:</u></b> Fejjatek: <b>'+teljes_fej()+'</b> | Ero: <b>'+teljes_ero()+'</b></div>');
	
	if( ($('div.comentarios').eq( (1+reloaded)*3).text()).substr(0,6) == "Kemeny" || ($('div.comentarios').eq( (1+reloaded)*3).text()).substr(0,6) == "Kemény") $('div.comentarios').eq( (1+reloaded)*3).html('<div '+piros+' class="comentarios" align="center"><b>Kemeny</b> szerelesi stilussal fogsz jatszani.</div>');
	else if( ($('div.comentarios').eq( (1+reloaded)*3).text()).substr(0,7) == "Konnyed" || ($('div.comentarios').eq( (1+reloaded)*3).text()).substr(0,7) == "Könnyed") $('div.comentarios').eq( (1+reloaded)*3).html('<div '+zold+' class="comentarios" align="center"><b>Konnyed</b> szerelesi stilussal fogsz jatszani.</div>');
	
	if( ($('div.comentarios').eq( (1+reloaded)*2).text()).substr(0,3) == "Nem") $('div.comentarios').eq( (1+reloaded)*2).html('<div '+piros+' class="comentarios" align="center">Nem - <b><u>Ellentamadas:</u></b> Gyorsasag: <b>'+teljes_gyo()+'</b> | Passz: <b>'+teljes_pas()+'</b> | Felallas</div>');
	else $('div.comentarios').eq( (1+reloaded)*2).html('<div '+zold+' class="comentarios" align="center"><b><u>Ellentamadas:</u></b> Gyorsasag: <b>'+teljes_gyo()+'</b> | Passz: <b>'+teljes_pas()+'</b> | Felallas</div>');
	
	if( ($('div.comentarios').eq( (1+reloaded)*1).text()).substr(0,6) == "Normal" || ($('div.comentarios').eq( (1+reloaded)*1).text()).substr(0,6) == "Normál") $('div.comentarios').eq( (1+reloaded)*1).html('<div '+piros+' class="comentarios" align="center">Normal - <b><u>Gyenge:</u></b> Gyors(<i>forditva</i>): <b>'+teljes_gyo()+'</b> | Szereles: <b>'+teljes_szer()+'</b> || <b><u>Teljes:</u></b> Gyors: <b>'+teljes_gyo()+'</b> | Passz: <b>'+teljes_pas()+'</b></div>');
	else if( ($('div.comentarios').eq( (1+reloaded)*1).text()).substr(0,6) == "Gyenge") $('div.comentarios').eq( (1+reloaded)*1).html('<div '+zold+' class="comentarios" align="center"><b><u>Gyenge:</u></b> Gyorsasag(<i>forditva</i>): <b>'+teljes_gyo()+'</b> | Szereles: <b>'+teljes_szer()+'</b></div>');
	else $('div.comentarios').eq( (1+reloaded)*1).html('<div '+zold+' class="comentarios" align="center"><b><u>Teljes:</u></b> Gyorsasag: <b>'+teljes_gyo()+'</b> | Passz: <b>'+teljes_pas()+'</b></div>');
	
	if( ($('div.comentarios').eq( (1+reloaded)*0).text()).substr(0,3) == "Nem") $('div.comentarios').eq( (1+reloaded)*0).html('<div '+piros+' class="comentarios" align="center">Nem - <b><u>Lestaktika:</u></b> Gyorsasag: <b>'+les_gyo()+'</b> | Helyezkedes: <b>'+les_hel()+'</b></div>');
	else $('div.comentarios').eq( (1+reloaded)*0).html('<div '+zold+' class="comentarios" align="center"><b><u>Lestaktika:</u></b> Gyorsasag: <b>'+les_gyo()+'</b> | Helyezkedes: <b>'+les_hel()+'</b></div>');
}

//**************************************************************
// SPECIALIS TAKTIKAK
//**************************************************************
////////////////////////////////////////////////////////////////

kezdo_adat();
csere_adat();
kezdo_gs(0);
csere_gs(0);

taktika_KIIRATAS(0);