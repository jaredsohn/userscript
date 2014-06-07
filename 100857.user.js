// ==UserScript==
// @name           t3 - IggGoldPlus
// @namespace      t3 - IggGoldPlus
// @description    Gold Plus Functions
// @include        http://*.travian.*/build.php?id=39&tt=100*/*
// @include        http://*.travian.*/build.php?gid=16&tt=100*/*
// ==/UserScript==

var o1x = 0
var o1y = 1
var o2x = 0
var o2y = 1

var dd1=7
var dd2=25
var dd3=50
var dd4=75
var dd5=100
var dd6=125



var defx = 0
var defy = 0
//Si no hay mas de 1 aldea...hay que definir current-cords

/* ##########################################################*/
/* ################  Sacar Tabla 2x Off'z ###################*/
/* ##########################################################*/
//SOLOPARAFIREFOX pq usa GM set!!! no disponible para chrome&opera.


var table_men = document.getElementById('textmenu')

var boton = '<input type="submit" value="Guardar Offs" id="off1_off2">'
var agregado = '<br><br><form><table border="0"><tr><td> Off 1 </td><td>X <input type="text" id="v01x" value="-81"></td><td>Y <input type="text" id="v01y" value="-29"></td></tr><tr><td> Off 2</td><td>X <input type="text" id="v02x" value="-93"></td><td>Y <input type="text" id="v02y" value="-72"></td></table></form><br>'+boton


table_men.innerHTML += agregado



function set_offz() {
var cooki_name = "off1_off2"
var mat_string = '';
mat_string =mat_string+''+document.getElementById("v01x").value+','
mat_string =mat_string+''+document.getElementById("v01y").value+','
mat_string =mat_string+''+document.getElementById("v02x").value+','
mat_string =mat_string+''+document.getElementById("v02y").value+'';// [cerrando el corchete]

  GM_setValue(cooki_name,mat_string)

}


document.getElementById("off1_off2").addEventListener("click", set_offz, false)



//###DOS OFENSIVAS###



var mis_offs = GM_getValue('off1_off2');
if(mis_offs){;//si_existe_variable
var new_x = mis_offs.split(",")
o1x = eval(new_x)[0]
o1y = eval(new_x)[1]
o2x = eval(new_x)[2]
o2y = eval(new_x)[3]

document.getElementById("v01x").value=o1x
document.getElementById("v01y").value=o1y 
document.getElementById("v02x").value=o2x
document.getElementById("v02y").value=o2y

} 


/* ##########################################################*/
/* ################  Definimos aldea current ################*/
/* ##########################################################*/
var coordx = '';var coordy = '';
if (document.getElementById('vlist')) {
  var aldeaxx = document.getElementById('vlist').innerHTML
	var buzcado = / *dot hl*([^)]*)*cox*([^)]*)*\)/
  var arrancamoz = buzcado.exec(aldeaxx);
var zacar = arrancamoz[0];
var dondecox = zacar.indexOf('cox', 0)
var lascoordsx = zacar.substr(dondecox,10)
var lascoordsx2 = ((lascoordsx.replace('cox">(','')).replace('<','')).replace('/','')*1
var dondeyox = zacar.indexOf('coy', 0)
var lascoordsy = zacar.substr(dondeyox,12)
var lascoordsy2 = ((lascoordsy.replace('coy">','')).replace('<','')).replace(')','')*1
var coordactual = '[' + lascoordsx2 + '|' + lascoordsy2 + ']';
coordx = lascoordsx2
coordy = lascoordsy2
} else {coordx = defx;coordy = defy}



/* ##########################################################*/
/* ################  Definimos get_distance ################*/
/* ##########################################################*/

function calcular_distancia(ax,ay,bx,by){


var Ax = ax
var Ay = ay
var Bx = bx
var By = by//?
//mi aldea = 2,atacante = 1 //modificar corrds id en triangle

var maxx = (401+1)

var addx = 0;//borrar si anda mal paso por end-map
var fix_map = 1
/* ####CREAMOS FUNCION ACOMODAR TIEMPO ###*/

function reducir(module,letra){	
	var newdist = module
	//Si pasa por el mid-map
	if (((eval('A'+letra) > 0) && (eval('B'+letra) < 0))||((eval('A'+letra) < 0) && (eval('B'+letra) > 0))){;//si pasamos por 0/0
		if(module<maxx){
			//eval('mas_'+letra = 1)
				newdist = module + addx
		}
	}
	//Si pasa por end-map
		if (module>=maxx){
			newdist = (((maxx-1)*2)-module)+fix_map
		}
	return newdist
};/* ####FIN FUNCION ACOMODAR TIEMPO ###*/
// BY www.xinocudeiro.com.ar!
var mod_X = Math.sqrt(Math.pow((Ax-Bx),2));/*modulo! en X*/;
var mod_Y = Math.sqrt(Math.pow((Ay-By),2))

var line = Math.sqrt((Math.pow(reducir(mod_X,'x'),2))+(Math.pow(reducir(mod_Y,'y'),2)))
return line
}

/* ##########################################################*/
/* ################  Sacamos variables, etc ################*/
/* ##########################################################*/




var tt = document.getElementById('raidList')
var tt_body = tt.getElementsByTagName('tbody')[0]
var tt_head = tt.getElementsByTagName('thead')[0]
var tt_title = tt_head.getElementsByTagName('th')[0]


var tt_canti = tt_body.rows.length

tt_title.innerHTML += '<font color="red"> -  Vacas: <b>'+tt_canti+'</b></font>';


/* ##########################################################*/
/* ################  Empezamos armando titles ################*/
/* ##########################################################*/

tt_head.rows[0].getElementsByTagName('th')[0].colSpan="9"

tt_head.rows[1].insertCell(6)
tt_head.rows[1].insertCell(7)
tt_head.rows[1].insertCell(8)

var gg = '<a href="build.php?gid=16&tt=100&s='
var g1 = '">'
var g2 = '</a>'

tt_head.rows[1].cells[0].innerHTML = 'X|Y'
tt_head.rows[1].cells[1].innerHTML = gg+'name'+g1+'N'+g2
tt_head.rows[1].cells[2].innerHTML = 'Dist'
tt_head.rows[1].cells[3].innerHTML = gg+'goods'+g1+'<b alt= Robado">R</b>'+g2
tt_head.rows[1].cells[4].innerHTML = gg+'lost'+g1+'<b alt="Bajas">B</b>'+g2
tt_head.rows[1].cells[5].innerHTML = gg+'time'+g1+'<b alt="Hora del ultimo ataque">T</b>'+g2
tt_head.rows[1].cells[6].innerHTML = gg+'raids'+g1+'<b alt="Cantidade de Ataques">A</b>'+g2
tt_head.rows[1].cells[7].innerHTML = 'R'
tt_head.rows[1].cells[8].innerHTML = '+'

/* ##########################################################*/
/* ################  Empezamos armando filas ################*/
/* ##########################################################*/

for (i=0;i<tt_canti;i++) {  

var twn = tt_body.rows[i].cells[1].getElementsByTagName('a')[0].href
var serv= document.location.host.length
var zxxz = twn.substring(18+serv,24+serv);
var ex = ((zxxz % 801) - 401)
var ey = (400 - Math.floor(zxxz / 801))


var aldea_coord = ''+ex+'|'+ey+''
var distance =  Math.round(calcular_distancia(coordx,coordy,ex,ey))
var cant_attaqz = tt_body.rows[i].cells[2].innerHTML
var add_favr = tt_body.rows[i].cells[0].innerHTML
var town_name = tt_body.rows[i].cells[1].getElementsByTagName('a')[0].innerHTML
var town_url = tt_body.rows[i].cells[1].getElementsByTagName('a')[0].href

var bounty = tt_body.rows[i].cells[3].innerHTML
var loss = tt_body.rows[i].cells[4].innerHTML

/* ##########################################################*/
/* ################  Empezamos armando table ################*/
/* ##########################################################*/


tt_body.rows[i].insertCell(6)
tt_body.rows[i].insertCell(7)
tt_body.rows[i].insertCell(8)

var nz ='<font size="0">'
var ns = '</font>'


// Reorganizando:
 
//###########Renombrando aldea
if (town_name.length>9){
town_name = (town_name.substring(0,6)) + '..'} else {
town_name = (town_name.substring(0,6))}
town_name = '[<a href="'+town_url+'">#</a>]'+town_name
//###########Renombrando aldea


var color = '#000000'
function get_color_dist(distancex){

if ((distancex>0)&&(distance<=dd1)){
color = '#74DF00'
}else if ((distancex>dd1)&&(distancex<=dd2)){
color = '#04B4AE'
}else if ((distancex>dd2)&&(distancex<=dd3)){
color = '#0174DF'
}else if ((distancex>dd3)&&(distancex<=dd4)){
color = '#380B61'
}else if ((distancex>dd4)&&(distancex<=dd5)){
color = '#8A084B'
}else if ((distancex>dd5)&&(distancex<=dd6)){
color = '#DF0101'
}else {color = '#610B0B'}

var j_dz = '<b><font color="'+color+'">'
return j_dz
}

var dz = get_color_dist(distance)
var ds = '</font></b>'

/* ##########################################################*/
/* ################  Nuevas_offs ################*/
/* ##########################################################*/


var dsd_off1 = Math.round(calcular_distancia(o1x,o1y,ex,ey))
var dsd_off2 = Math.round(calcular_distancia(o2x,o2y,ex,ey))
var ko1 = get_color_dist(dsd_off1)
var ko2 = get_color_dist(dsd_off2)

var add_d = ko1+dsd_off1+ds+"|"+ko2+dsd_off2+ds+""


/* ##########################################################*/
/* ################  Añadiendo fondos ################*/
/* ##########################################################*/

// segun ultimo reporte y si es atacado ATM

var atacado = 0
if(tt_body.rows[i].cells[1].getElementsByTagName('img')[0]){atacado=1}

GM_addStyle("#sssx1 { background-color: #CEFFC2 ; }");
GM_addStyle("#sssx2 { background-color: #FFF594 ; }");
GM_addStyle("#sssx3 { background-color: #FF9E80 ; }"); 
GM_addStyle("#somosgris { background-color: #C8C8C8 ; }"); 
GM_addStyle("#sssxatacado { background-color: #81BEF7 ; }");

var attbajas = tt_body.rows[i].cells[5].getElementsByTagName('img')[0].className


var attxx1 = 'iReport iReport1'
var attxx2 = 'iReport iReport2'
var attxx3 = 'iReport iReport3'
var attxcolor1 = '"#008D00"';
var attxcolor2 = '"#E09900"';
var attxcolor3 = '"#FF0033"';
var attxcolorused = '';var attxtroops = "Non";var dibujio = '[#]';var tipox=0



	if (attbajas==attxx1){
attxcolorused = attxcolor1;attxtroops = dibujio;tipox=1
} else if (attbajas==attxx2) {
attxcolorused = attxcolor2;attxtroops = dibujio;tipox=2
} else if (attbajas==attxx3) {
attxcolorused = attxcolor3;attxtroops = dibujio;tipox=3
} else if (attbajas=='NoHay'){attxcolorused = '"#FFFFFF"';attxtroops = dibujio;}
var lajide = 'sssx'+tipox


tt_body.rows[i].cells[0].id=lajide

if(atacado==1){tt_body.rows[i].cells[1].id="sssxatacado"}

/* ##########################################################*/
/* ################  Calcular segundos ################*/
/* ##########################################################*/

// sacado de www.xincudeiro.com.ar
function hora_a_sec(l){	
	var n1 = l.split(':')[0]
	var n2 = l.split(':')[1]
	var n3 = l.split(':')[2]
	var sec = ((n1*3600)+(n2*60)+(n3*1))	
	return sec}


// REDONDEAR CON DECIMAL
function round_con_decimal(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function calc_hora(HRR){
var mmm='';var nzk='';var tt=0;
if(HRR<60){mmm = HRR;nzk = ' seg'}
if(HRR<3600 && HRR>60){mmm = HRR/60;nzk = ' min'}
if(HRR<3600*24 && HRR>3600){mmm = HRR/3600;nzk = ' hr';tt=1}
return (round_con_decimal(mmm,tt)) + nzk}

var f_hoy = 'hoy'
var f_ayer = 'ayer'
var nnm = tt_body.rows[i].cells[5].getElementsByTagName('a')[0].innerHTML


//### COMPARANDO HORAS?
var horaserver = document.getElementById('tp1').innerHTML
horaserver=hora_a_sec(horaserver)
var hora_report = tt_body.rows[i].cells[5].getElementsByTagName('a')[0].title
hora_report = hora_a_sec(hora_report)
//### COMPARANDO HORAS?

var hace_secs = 'X'

if(tt_body.rows[i].cells[5].innerHTML.match(f_hoy)){
nnm = horaserver-hora_report
hace_secs = nnm
nnm = calc_hora(nnm)}
if(tt_body.rows[i].cells[5].innerHTML.match(f_ayer)){
nnm = horaserver-hora_report+(24*60*60)
hace_secs = nnm
nnm = calc_hora(nnm)}

var kz = ''
var ks = ''
var rrg=''

if(hace_secs!='X'){
//* Si el ataque fue hoy o ayer?
	if (hace_secs<60){
		rrg = "#D7DF01"
	} else if (hace_secs<(10*60)){
		rrg = "#FF8000"
	} else if (hace_secs<(30*60)){
		rrg = "#FF0000"
	} else if (hace_secs<(60*60)){
		rrg = "#B4045F"
	} else if (hace_secs<(2*60*60)){
		rrg = "#4B088A"
	} else if (hace_secs<(5*60*60)){
		rrg = "#0101DF"
	} else if (hace_secs<(10*60*60)){
		rrg = "#088A85"
	} else if (hace_secs<(20*60*60)){
		rrg = "#01DF74"
	} else {rrg = "#04B404"}
}




if ((nnm.match('min'))||(nnm.match('sec'))||(nnm.match('hr'))){

kz = '<font color="'+rrg+'">'
ks = '</font>'

}


var r_link = tt_body.rows[i].cells[5].getElementsByTagName('a')[0].href
var repp = '<a href="'+  r_link  +'"> R </a>'





// LE SACAMOS LA DIST A LA SELECTED TWN - lo puse de vuelta. switchear estos dos datos. //
var final_dist = nz+dz+distance+ds+'|'+add_d+ns
//var final_dist = nz+add_d+ns

/* ##########################################################*/
/* ################  Dando valores a celdas ################*/
/* ##########################################################*/

tt_body.rows[i].cells[0].innerHTML = nz+'<a href="karte.php\?z\='+zxxz+'">'+aldea_coord+ns+'</a>'
tt_body.rows[i].cells[1].innerHTML = nz+town_name+ns
tt_body.rows[i].cells[2].innerHTML = final_dist
tt_body.rows[i].cells[3].innerHTML = nz+bounty+ns
tt_body.rows[i].cells[4].innerHTML = nz+loss+ns
tt_body.rows[i].cells[5].innerHTML = kz+nz+nnm+ns+ks
tt_body.rows[i].cells[6].innerHTML = nz+cant_attaqz+ns
tt_body.rows[i].cells[7].innerHTML = nz+repp+ns
tt_body.rows[i].cells[8].innerHTML = add_favr


}