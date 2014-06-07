// ==UserScript==
// @name           t4- IggReports
// @namespace      t4- IggReports
// @description    t4- IggReports
// @include        http://*.travian*.*/berichte.php?id=*
// @include        http://*.travian*.*/a2b.php?*
// @include        http://*.travian*.*/a2b.php
// @include        http://*.travian*.*/build.php?*gid=16*tt=99*
// @include        http://*.travian*.*/build.php?*id=39*tt=99*
// @include        http://*.travian*.*/dorf*.php?*
// ==/UserScript==


var att_selected = 4;//3=ataque,2reff,4 atraco

var att_tipo1 = [3,0,0,0,0,0,0,0,0,0,0]
var att_tipo2 = [5,0,0,0,0,0,0,0,0,0,0]
var att_tipo3 = [0,0,0,1,0,0,0,0,0,0,0]

var attt_ico1= "u11"
var attt_ico2= "u11"
var attt_ico3= "u14"


var keys = [
	,,,, ,,,,  'backspace','tab',,, 'gray5','enter',,, //16
	'shift','ctrl','alt','break', 'capsLock',,,,  ,,,'esc', ,,,, //32
	'space','pageUp','pageDown','end', 'home','left','up','right',  'down',,,, 'printScreen','ins','del',, //48
	'n10','n1','n2','n3', 'n4','n5','n6','n7',  'n8','n9',,'semicolon', ,,,, //64
	   ,'a','b','c', 'd','e','f','g',  'h','i','j','k', 'l','m','n','o', //80
	'p','q','r','s', 't','u','v','w',  'x','y','z','leftWin', 'rightWin','menu',,, //96
	'N10','N1','N2','N3', 'N4','N5','N6','N7',  'N8','N9','wildcard','plus', ,'minus','grayDel','graySlash', //112
	'F1','F2','F3','F4', 'F5','F6','F7','F8',  'F9','F10','F11','F12', ,,,, //128
	,,,, ,,,,  ,,,, ,,,, //144
	'numLock','scrollLock',,, ,,,,  ,,,, ,,,, //160
/*	,,,, ,,,,  ,,,'favorites', ,'mute','volumeDown','volumeUp', //176
	'nextTrack','prevTrack','stop','play', ,,,,  ,,,, 'colon',,'dot','slash', //192 */
	,,,, ,,,,  ,,,, ,,,, //176
	,,,, ,,,,  ,,,, 'colon',,'dot','slash', //192 
	'tilde',,,, ,,,,  ,,,, ,,,, //208
	,,,, ,,,,  ,,,'leftbracket', 'backslash','rightbracket','apostrophe',, //224
	,,,, ,,,,  ,,,, ,,, //256
];
for (b = 0; b < 256; b++) {
	if (!keys[b]) keys[b] = "_"+b;
}
var nav_to = function(url) {
	window.location = url;
}
var controller = {
	actions: {
		q: function() { nav_to('dorf1.php') },
	//	k: function() { nav_to('karte.php') }, // Karte
	//	backslash: function() { nav_to('statistiken.php') },
		r: function() {	nav_to('berichte.php') }, // rePorts
	//	i: function() {	nav_to('nachrichten.php') }, // Igm
	//	q: function() {	nav_to('dorf3.php') }, // just dorf3 =P
		
	//	a: function() {	nav_to('a2b.php') },
	//	z: function() {	nav_to('allianz.php') },
	//	f: function() {	nav_to('spieler.php?s=1') }, // proFile
	//	esc: function() { nav_to('login.php') },
		
	//	b: function() { nav_to_gid(19) }, // Barracks
	//	s: function() { nav_to_gid(20) }, // Stable
	//	w: function() { nav_to_gid(21) }, // Workshop
	//	h: function() { nav_to_gid(24) }, // townHall
		m: function() { nav_to_gid(17) }, // Marketplace
	//	e: function() { nav_to_gid(10) }, // warEhouse
	//	g: function() { nav_to_gid(11) }, // Granary
	//	n: function() { nav_to('build.php?gid=17&t=3') }, // Npc-trader
	//	x: function() { nav_to('build.php?id=40') }, // wall
	//	r: function() { nav_to('build.php?id=39') }, // Rally point
	//	v: function() { nav_to_gid(37) }, // taVern
	//	l: function() { nav_to_gid(12) }, // bLacksmith
	//	o: function() { nav_to_gid(13) }, // armOry
	//	t: function() { nav_to_gid(36) }, // Trapper
	//	home: function() { nav_to_gid(15) }, // Main Building
		
		up: function() { if(vil_nums){vil_idx = vil_idx?--vil_idx:vil_nums-1; nav_to(vil_list.getElementsByTagName('a')[vil_idx].href)} },
		down: function() { if(vil_nums){vil_idx = ++vil_idx % vil_nums; nav_to(vil_list.getElementsByTagName('a')[vil_idx].href)} },
		// plus: function() { nav_to('plus.php?id=3') },
	}
}







var curr_serv =location.host

var lang2="";var lang1="";
var tts_0 = ["travian.cl","hoy","ayer"]
var tts_1 = ["travianteam.com","today","yesterday"]

for (ko=0;ko<2;ko++){
if(curr_serv.match(eval('tts_'+ko)[0])){
lang1=eval('tts_'+ko)[1]
lang2=eval('tts_'+ko)[2]
}}



var z_error = ":00"
var dnn = new Date();var curr_date = dnn.getDate();var curr_month = 1+dnn.getMonth();var curr_year = dnn.getFullYear()-2000;

var order = ['y','m','d']//orden del dia.

var cant_vil = document.getElementById('villageList').getElementsByTagName('ul')[0].getElementsByTagName('li')
for (i=0;i<=cant_vil.length-1;i++){
var vcss = cant_vil[i].getElementsByTagName('a')[0]
//if(vcss.className=="active"){
//(vcss.href)}
}





function calc_hora(HRR){
var mmm='';var nzk='';var tt=0;
if(HRR<60){mmm = HRR;nzk = ' seg'}
if(HRR<3600 && HRR>60){mmm = HRR/60;nzk = ' min'}
if(HRR<3600*24 && HRR>3600){mmm = HRR/3600;nzk = ' hr';tt=1}

return roundNumber(mmm,tt) + nzk}


function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

	/* ### FUNCION */
	function calc_day(d1,d2,m1,m2,y1,y2){var tdf_y;var tdf_m;var tdf_d;
	if(order[0]='y'){tdf_y = parseInt(y1-y2)} else { parseInt(d1-d2) }
	tdf_m = parseInt(m1-m2)
	if(order[0]='d'){tdf_d = parseInt(d1-d2)} else { parseInt(y1-y2) }
	var td_dayz = (tdf_y*365)*(tdf_m*31)+(tdf_d*1);return td_dayz}
	/* ### FUNCION */


	function sacarseg(time1,time2){ 
	var seconds1 = (time1.split(":")[0] * 3600)+(time1.split(":")[1]*60) + (time1.split(":")[2]*1);
	var seconds2 = (time2.split(":")[0] * 3600)+(time2.split(":")[1]*60) + (time2.split(":")[2]*1);
	return (seconds1-seconds2)}
	/*##### Fin de Function ##### */
	function getTimez(minit) {
	var df_hor1 = (parseInt(minit+fix_tt) / 3600); var df_hor2 = parseInt(df_hor1) 
	var df_min1 = (df_hor1 - df_hor2) * 60
	var df_min2 = parseInt(df_min1) 
	var df_sec1 = (df_min1 - df_min2) * 60
	var df_sec2 = Math.round(df_sec1)
	return (df_hor2 + ':' + df_min2 + ':' + df_sec2)
	}
	/* ##### Fin de Function ##### */



if (document.location.href.match("berichte.php") && document.location.href.match("id=")){
	var table = document.getElementById('report_surround')
	var divz = document.getElementById('time')

	var acomodar = table.getElementsByTagName('thead')[0].getElementsByTagName('div')[2].getElementsByTagName('span')[0]
	if(acomodar){acomodar.innerHTML+=".";};//#Si#es#mi#aldea.

	var t_div1 = divz.getElementsByTagName('div')[1]
	var r_time = divz.getElementsByTagName('div')[1].innerHTML
	var s_time = document.getElementById('tp1').innerHTML;/* ## Server y Report Times ## */;
	r_time = r_time.split(" ")[1]

	var see_day = (divz.getElementsByTagName('div')[1].innerHTML).split(" ")[0]





	var fix_text;
	var fix_day;
	var hoy_1;var hoy_2;var hoy_3;
	if(see_day=="today"){fix_day='NO'} else {
	hoy_1 = see_day.split('/')[0];
	hoy_2 = see_day.split('/')[1];
	hoy_3 = see_day.split('/')[2];
	}

	fix_day = parseInt(calc_day(hoy_3,curr_date,hoy_2,curr_month,hoy_1,curr_year)*24)
	// Calculamos diferencia de dias de report a nuestra pc.

	if((see_day)!="today"){
	if(fix_day==0){fix_text='<a href=\"alert(\'El horario de tu pc es distinto al del servidor. Este ataque fue hecho hoy, pero ayer en 	horario de servidor\')\"> [ Time ¿? ]</a>';}}

	if(see_day=="today"){fix_day='No'};//siii denuevo!

	var fix_tt=0
	var n_dayz;

	if(fix_day==0){n_dayz=1;fix_tt=n_dayz*24*3600}
	if(fix_day<0){n_dayz=fix_day;fix_tt=n*24*3600}




	var x_time = getTimez(sacarseg(s_time, r_time))

	//### Agregado en Punto1 #### //
	/* ##### Oasis no tienen link player #####*/
	var z_ck=0
	var z_ss = table.getElementsByTagName("table")[1].getElementsByTagName("a")[1]
	var z_zz = table.getElementsByTagName("table")[1].getElementsByTagName("a")[0]
	if (z_ss){
	z_ck = z_ss.href.substring(z_ss.href.length-6, z_ss.href.length)} else {
	z_ck = z_zz.href.substring(z_zz.href.length-6, z_zz.href.length)};

	var z_cx = ((z_ck % 801) - 401)
	var z_cy = (400 - Math.floor(z_ck / 801))

	var z_mk = document.getElementById('attacker').getElementsByTagName('a')[1].href
	z_mk = z_mk.substring(z_mk.length-6, z_mk.length);

	var z_mx = ((z_mk % 801) - 401)
	var z_my = (400 - Math.floor(z_mk / 801))


	function getDistanz(mi_x,mi_y,tu_x,tu_y){
		var en_equis = mi_x-tu_x
		if(en_equis>=401){en_equis = en_equis-401} else if (en_equis<=-401){en_equis = en_equis+401}
			var en_ygriega = mi_y-tu_y
		if(en_ygriega>=401){en_ygriega = en_ygriega-401} else if (en_ygriega<=-401){en_ygriega = en_ygriega+401}
			var en_zeta = Math.sqrt((en_equis*en_equis)+(en_ygriega*en_ygriega))
	return Math.round(en_zeta)}


	var z_dist = getDistanz(z_mx,z_my,z_cx,z_cy)

	var r_bounty= document.getElementById('attacker').getElementsByTagName("tbody")[4].getElementsByTagName("div")[6].innerHTML
	r_bounty = r_bounty.split(">")[1]
	r_percent = Math.round((r_bounty.split("/")[0])/(r_bounty.split("/")[1])*100)+'%'





	var r_troop_tbl = document.getElementById('attacker').getElementsByTagName("tbody")[1]
	var r_troopz='&ig&rzn';//#### Ig: Para reenviar automaticamente.
	for (i=0;i<11;i++){
	var n=i+1
	var cant = r_troop_tbl.rows[0].cells[n].innerHTML
	r_troopz=r_troopz+'&t'+n+'='+cant
	}


	var link = 'a2b.php?'+r_troopz+'&c='+att_selected+'&z='+z_ck
	//#### start-Punto1: #### //

	//if (fix_day==0){ x_time = fix_text }

	t_div1.innerHTML += ' - <b><font color="red">[ '+x_time+' ]</b></font>';
	t_div1.innerHTML += ' - <b><font color="blue">[ '+z_dist+'c ]</b></font>';
	t_div1.innerHTML += ' - <b><font color="darkgreen">[ '+r_percent+' ]</b></font>';
	t_div1.innerHTML += ' - <b><a href=\"'+link+'\"><font color="orange">[ Re ]</b></a></font>';
	//#### end-Punto1: #### //
	//#### start-Punto2: #### //

	

	
	var mandar_z1 = 'a2b.php?'+'&t1='+att_tipo1[0]+'&t2='+att_tipo1[1]+'&t3='+att_tipo1[2]+'&t4='+att_tipo1[3]+'&t5='+att_tipo1[4]+'&t6='+att_tipo1[5]+'&t7='+att_tipo1[6]+'&t8='+att_tipo1[7]+'&t9='+att_tipo1[8]+'&t10='+att_tipo1[9]+'&t11='+att_tipo1[10]+'&c='+att_selected+'&z='+z_ck+'&ig&rzn';	
	var mandar_z2 = 'a2b.php?'+'&t1='+att_tipo2[0]+'&t2='+att_tipo2[1]+'&t3='+att_tipo2[2]+'&t4='+att_tipo2[3]+'&t5='+att_tipo2[4]+'&t6='+att_tipo2[5]+'&t7='+att_tipo2[6]+'&t8='+att_tipo2[7]+'&t9='+att_tipo2[8]+'&t10='+att_tipo2[9]+'&t11='+att_tipo2[10]+'&c='+att_selected+'&z='+z_ck+'&ig&rzn';
	var mandar_z3 = 'a2b.php?'+'&t1='+att_tipo3[0]+'&t2='+att_tipo3[1]+'&t3='+att_tipo3[2]+'&t4='+att_tipo3[3]+'&t5='+att_tipo3[4]+'&t6='+att_tipo3[5]+'&t7='+att_tipo3[6]+'&t8='+att_tipo3[7]+'&t9='+att_tipo3[8]+'&t10='+att_tipo3[9]+'&t11='+att_tipo3[10]+'&c='+att_selected+'&z='+z_ck+'&ig&rzn';
 	var mandar_z0 = 'a2b.php?c='+att_selected+'&z='+z_ck;

	var tbl_name = document.getElementById('attacker').getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[1]
	tbl_name.innerHTML += ' <a href=\"'+mandar_z0+'\"><img alt="Atacar" class="iReport iReport1" src="img/x.gif"></a>'

	for (i=1;i<4;i++){

	tbl_name.innerHTML += '<a href=\"'+eval('mandar_z'+i)+'\"><img alt="Theutates Thunder" class="unit '+eval('attt_ico'+i)+'" src="img/x.gif"></a>'

}

	//#### start-Punto2: #### //
	};//### FIN DE PAG DE REPORTES ###//




	/* #### rzn e ig para relanzar ############## */
	if (window.location.href.match('a2b') && window.location.href.match('&ig') && window.location.href.match('&rzn')) {	
	window.onload = setTimeout(function() {document.getElementsByName('s1')[0].click() }, 100);	}
	if (document.referrer.indexOf('&rzn')!= -1) { 
	if (document.referrer.indexOf('&ig')!= -1) { 
	window.onload = setTimeout(function() {document.getElementsByName('s1')[0].click() }, 100);}
	/* #### rzn e ig para relanzar ############## */

}
//### Plaza de reuniones a partir de aca ##//
GM_addStyle("#sssx1 { background-color: #CEFFC2 ; }");
GM_addStyle("#sssx2 { background-color: #FFF594 ; }");
GM_addStyle("#sssx3 { background-color: #FF9E80 ; }"); 
GM_addStyle("#sssx4 { background-color: #357EC7 ; }"); 
/*
if (document.location.href.match("build.php") && document.location.href.match("tt=99")){
if (document.location.href.match("gid=16") || document.location.href.match("id=39")) 
{
	var s_time = document.getElementById('tp1').innerHTML
	var tabla_att = document.getElementById('raidList')
	var raid_div = (tabla_att.getElementsByTagName('table').length)
	var fix_tt = 0;//acomodar el getTimez! aca no funca sino

	for (ij=0;ij<raid_div;ij++){		
		var c_tab_att = tabla_att.getElementsByTagName('table')[ij]
		var cant_rowz = c_tab_att.getElementsByTagName('tbody')[0].getElementsByTagName('tr')

		for (rr=0;rr<cant_rowz.length;rr++){
			var bty = '';var bty2;
			var celda_last = cant_rowz[rr].getElementsByTagName('td')[5]
			var img_repp = celda_last.getElementsByTagName('img')[0]
			var img_bt = celda_last.getElementsByTagName('img')[1]
			cant_rowz[rr].insertCell(7)

			var tipox=4			
			if(img_repp){if(img_repp.className=="iReport iReport1"){tipox=1}}	
			if(img_repp){if(img_repp.className=="iReport iReport2"){tipox=2}}			
			if(img_repp){if(img_repp.className=="iReport iReport3"){tipox=3}}
			var lajide = 'sssx'+tipox
			celda_last.id = lajide
			
			if(img_repp){
				var horario = ((celda_last.innerHTML.split('>')[1].split(' ')[1].split('<')[0]).substring(0,5))+z_error
				var cuando = ((celda_last.innerHTML.split('>')[1].split(' ')[0].split('<')[0]))
				cuando=cuando;//.substring(6,10);//HACER ESTO CON MATCH MAÑANA
		
	var zzz_hoy=cuando.replace(" ","").replace(" ","").replace(" ","").split('/')
					var c_paso = calc_day(zzz_hoy[2],curr_date,zzz_hoy[1],curr_month,zzz_hoy[0],curr_year)


			var sacarsegz=sacarseg(s_time,horario)
			var t_bonus = 0
				if(cuando.match(lang2)||c_paso==0){t_bonus=3600*24;}
	
			var difsegs=parseInt(sacarsegz)+(t_bonus*1)
			difsegs=calc_hora(difsegs)
		

				if (!(cuando.match(lang1))){;// (!) = if not.
				if (!(cuando.match(lang2))){
					
				var ekgj = c_paso*-1

				if (!(ekgj==0)){
					difsegs=c_paso*-1+' Dias'
					}}}
			

			
			celda_last.innerHTML='<a title="'+horario+'">'+difsegs+'</a>'}
			
			if(img_bt){(bty=img_bt.alt)
				bty2=bty.split(' ')[1]+' / '+bty.split(' ')[5]}
			
			cant_rowz[rr].cells[7].innerHTML += bty2


			//Agregar coords
			var celdita = cant_rowz[rr].getElementsByTagName('td')[1]
			if (celdita.innerHTML.match("Oasis")){
				var celd_s = celdita.getElementsByTagName("span")[2].innerHTML
				var celd_x = ((celd_s).replace("(","").replace(")","")).split("|")[0]
				var celd_y = ((celd_s).replace("(","").replace(")","")).split("|")[1]
			//celdita.innerHTML='<a href="position_details.php?x='+celd_x+'&y='+celd_y+'"> Oasis ('+celd_x+'|'+celd_y+') </a>'
			};//fin de si es oasis//
		}
} } }
	*/	
	