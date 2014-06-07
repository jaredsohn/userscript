// ==UserScript==
// @name           t3 -Igg Roba Vacas
// @namespace      t3 -Igg Roba Vacas
// @description    Igg Roba Vacas del menu de alianza
// @include        http://*.travian.*/berichte.php?id=*

// @include        http://*.travian.*/allianz.php?s=3&f=*
// @include        http://*.travian.*/dorf3.php*
// @include        http://*.travian.*/karte.php*
// @include        http://*.travian.*/dorf1.php*
// @include        http://*.travian.*/dorf2.php*
// @include        http://*.travian.*/spieler.php*

if(document.getElementById('side_navi')){
var textsid = '<p><a href="spieler.php?ig_r_config"><font color="darkcyan">RobaVacas</font></a></p>'

document.getElementById('side_navi').innerHTML+=textsid



}


var res_time = 3
res_time = 60000*res_time
//x minutos
// ==/UserScript==
// Default_offs
var o1x = -93;var o1y = -73;
var o2x = -93;var o2y = -72;
var leyendo  = 0
var leer = 60
var bajax_max = 0
//Preparado para vacas?
var z_rowz = 10
// DATOS
var yo_soy = "Sex ToyS"
var max_dist = "420"

//se puede seguir añadiendo comas y rangos... pero hay q editar los GM values actuales!!!
var rangos = [0,10,20,50,100,200,500,1000,2000,3500,5000,10000]
var prex = 'vvi'
var cada_cuanto = 100;//en milisegundos... default = rapidisimo!

//text

var tx_Borrar = 'Borrar'

//#######################################################################################//
//#################### Carga Vars Si existen ####################//
//#######################################################################################//


if(GM_getValue(prex+'_variables')){
var _is = (GM_getValue(prex+'_variables'))

_is=_is.split('###')
var _n1 = _is[0].split('|')
var _n2 = _is[1].split('|')
var o1x = _n1[0];
var o1y = _n1[1];
var o2x = _n2[0];
var o2y = _n2[1];
res_time =_is[2]*60000
var yo_soy =_is[3]
var max_dist =_is[4]
//Vars_cargadas

	

}



//#######################################################################################//
//#################### REQUEST METHOD ####################//
//#######################################################################################//
function processAjax(yourimportedString,nnk) {

    
    url = "berichte.php?id=" + yourimportedString
    if (window.XMLHttpRequest) { // Non-IE browsers
      req = new XMLHttpRequest();
      req.onreadystatechange = targetDiv;
      try {
        req.open("GET", url, true);
      } catch (e) {
        alert(e);
      }
      req.send(null);
    } else if (window.ActiveXObject) { // IE
      req = new ActiveXObject("Microsoft.XMLHTTP");
      if (req) {
        req.onreadystatechange = targetDiv;
        req.open("GET", url, true);
        req.send();

      }
    }

}

function targetDiv() {

    if (req.readyState == 4) { // Complete
          if (req.status == 200) { // OK response

              document.getElementById("div_creado_"+leyendo).innerHTML = req.responseText;
	leyendo = leyendo +1
		document.getElementById("eztamos").innerHTML = leyendo
          } else {
            alert("Problem: " + req.statusText);
          }
}

	if (req.readyState == 4) { 
		load_vacas()
		clear_ig()
			if(leyendo<leer){
				setTimeout(function(){processAjax(total_ids[leyendo])},cada_cuanto)
			}
		
	}

} 

//#######################################################################################//
//#################### Para cada rango, crear variable si no existe  ####################//
//#######################################################################################//

for (i=0;i<rangos.length;i++){
var k;
if (i>=(rangos.length-1)){
k = 99999;/*para el ultimo... hasta 99k de porras */
} else { k = rangos[i+1] }

	var cooki_naim = prex+'['+rangos[i]+'-'+k+']'
	var temp = GM_getValue(cooki_naim);
	eval('var rangoz_'+i+' = temp')
		if (!(eval('rangoz_'+i))){
			GM_setValue(cooki_naim,"")
		}
}
//#######################################################//
//#################### Aldeas ofensi ####################//
//#######################################################//


/*
var mis_offs = GM_getValue('off1_off2');
if(mis_offs){;//si_existe_variable
var new_x = mis_offs.split(",")
o1x = eval(new_x)[0]
o1y = eval(new_x)[1]
o2x = eval(new_x)[2]
o2y = eval(new_x)[3]
}
*/

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


//#######################################################//
//#################### Creamos tablas ####################//
//#######################################################//

if (location.href.match('allianz')){

var cc_body = document.getElementById('offs').getElementsByTagName('tbody')[0]
var cc_vacas = cc_body.rows.length

var total_ids = []
for (i=0;i<cc_vacas;i++){
var cc_id = (((cc_body.rows[i].cells[0].getElementsByTagName('a')[1].href).split('='))[1]).split('|')[0]
total_ids[i] = cc_id
}

for(i=0;i<total_ids.length;i++){
document.getElementById('content').innerHTML +='<div id="div_creado_'+i+'" style="display:none;"></div>'
}


document.getElementById('textmenu').innerHTML +='<br><br><a id="nana" href="#">Cargar Vacas.</a>';
document.getElementById('textmenu').innerHTML += '<br> Leidos: <b id="eztamos">0</b><b>/60</b>'


window.onload = setInterval(function(){
var fff=document.getElementById('timeando').innerHTML

ffk = (fff-1)
var ffd = ffk/60
ffd = Math.round(ffd*10)/10

document.getElementById('Needtime').innerHTML=ffd
document.getElementById('timeando').innerHTML=ffk
},1000);


document.getElementById('textmenu').innerHTML +='<br><br><a href="allianz.php?s=3&f=1&re_scan">Reset en: </a></b><b id="Needtime">'+(res_time/60000)+'</b>  <b>min</b>';
document.getElementById('textmenu').innerHTML +=' / <font color="red"><b id="reset_time">'+(res_time/60000)+'</b><b>min</b></font>  ';
document.getElementById('textmenu').innerHTML +='<div id="timeando" style="display:none">'+(res_time/1000)+'</div>'
document.getElementById('textmenu').innerHTML +='<br><a href="dorf3.php?Vacas_Mias">Ver Vacas</a>'




	function clear_ig(){
for(i=0;i<total_ids.length;i++){
document.getElementById('div_creado_'+i).innerHTML = '';
}}


	function cargar_fin(mmm){
			processAjax(mmm,"div_creado")
	}

	function scan_ig(){
		var mmm=0
		//for(i=0;i<total_ids.length;i++){
		//mmm=total_ids[i];//id's a procesar//;
		//setTimeout(function(){
			cargar_fin(total_ids[0])
		//},1)

		//}

	};//fin de scan&for
	document.getElementById("nana").addEventListener("click", scan_ig, false)


if(location.href.match('re_scan')){

	function reset_time(){
	scan_ig()
			setTimeout(function() {

			if(!(location.href.match('re_scan'))){
				location.href = location.href+'&re_scan'
			}else{
				location.href = location.href
			}
		}, res_time);
		/*milisegundos a minutos*/
		
	}
window.onload = reset_time()
}



}//CREo q es fin de alianz?






if (location.href.match('berichte')){
//load_vacas()

}

function load_vacas(){


	//var lmid2 = document.getElementById('content')
	//modificado para andar in!
	//var troops_tables = lmid2.getElementsByTagName('table')[0].rows[3].cells[0].getElementsByTagName('table');
	var troops_tables = document.getElementById('report_surround').getElementsByTagName('table')
	var xcell = troops_tables[0].rows[0].cells[1];
	var url_e = 'a2b.php?z='+xcell.lastChild.href.replace(/^.*d=(\d+).*$/, "$1");
	//xcell.innerHTML += ' <strong>[<a href="'+url_e+'">E</a>]</strong>';
	xcell = troops_tables[1].rows[0].cells[1];
	var url_d = 'a2b.php?z='+xcell.lastChild.href.replace(/^.*d=(\d+).*$/, "$1");
	//xcell.innerHTML += ' <strong>[<a href="'+url_d+'">D</a>]</strong>';


var zcord = xcell.lastChild.href.replace(/^.*d=(\d+).*$/, "$1")
var cc_x = ((zcord % 801) - 401)
var cc_y = (400 - Math.floor(zcord/ 801))


// Distancias a las offs 1 y 2
var dist_1 = Math.round(calcular_distancia(o1x,o1y,cc_x,cc_y))
var dist_2 = Math.round(calcular_distancia(o2x,o2y,cc_x,cc_y))

//xcell.innerHTML += dist_1 +' y ' + dist_2

//#########################
//######## DATOS ########
//#########################
var pasa=2
//PASA1= APROBADO

// Espada_verde = asumimos q el ataque no tiene bajas.

var rr_part_1 = document.getElementById('attacker').getElementsByTagName('tbody')[0]
var rr_part_2 = document.getElementById('attacker').getElementsByTagName('tbody')[1]


var sum = 0;
var sun = 0
// sin_heroe

var rrl = 1;//2--> Bajas.
var rrx = 2

var tropas = [0,0,0,0,0,0,0,0,0]
var loztz = [0,0,0,0,0,0,0,0,0]

	for (i=1;i<=10;i++){

		var tropax = rr_part_1.rows[rrl].cells[i].innerHTML
		if(!((i>0)&&(i<4))){tropax = tropax*3};//caballos_vale_por_tres!
		tropas[i-1] = tropax
		
		var loztzx = rr_part_1.rows[rrx].cells[i].innerHTML
		if(!((i>0)&&(i<4))){loztzx = loztzx*3};//caballos_vale_por_tres!
		loztz[i-1] = loztzx
	}//cierro_for

for (i=0; i<tropas.length; i++){
sum = sum*1 + tropas[i]*1;
sun = sun*1 + loztz[i]*1;
};//Sumamos_tropas_totales



var tropas_usadas = sum
var tropas_perdidas = sun

if(rr_part_2.getElementsByTagName('div')[1]){
var botin = ((rr_part_2.getElementsByTagName('div')[1].innerHTML).split('>')[1]).split('/')[0]
} else {pasa=0};//ej: robos de aliados a sus oasis..conquista de oasis, artefactos...no existe botin!

var jugador = document.getElementById('attacker').getElementsByTagName('thead')[0].getElementsByTagName('a')[0].innerHTML
var jugador2 = document.getElementById('report_surround').getElementsByTagName('a')[2].innerHTML

var cordis = cc_x +'|'+cc_y
var at_cords = cordis

if(((dist_1<=max_dist)||(dist_2<=max_dist))&&(sun<=bajax_max)){//Cumple distancias & bajas = 0
	if((jugador!=yo_soy)&&(jugador!=jugador2)){//no son mis atracos ni auto-atracos
				
			pasa = 1}else{pasa=0

		
	}
}
if (pasa==1){
var donde;
for (j=0;j<=(rangos.length-1);j++){
	var k;if (j>=(rangos.length-1)){k = 99999;
	/*para el ultimo */;
	} else { k = rangos[j+1] }
	if((sum>=rangos[j])&&(sum<k)){
			//donde = Math.round((rangos[j]*1+k*1)/2)	
	var meter = prex+'['+rangos[j]+'-'+k+']'
	

//#########################################################################
//################## Comprobando_existencia ###############################
//#########################################################################

var current_cordz =  (GM_getValue(meter)).split(',')
var current_cuantos = current_cordz.length//-1..pero como usamos < ...

var comx=''
if(current_cordz!=''){comx = ','}
//Si no hay nada escrito, que no agregue coma!!!

	//Comprobamos que no este ya puesta esta aldea
	for (r=0;r<current_cuantos;r++){

	var r_pos = current_cordz[r]

		if(r_pos==cordis){
			cordis =''
		}else{
			cordis = comx+cordis
		}
	}
var final_add = (GM_getValue(meter))


for (i=0;i<50;i++){
final_add = final_add.replace(',,',",")
final_add= final_add.replace(/,,/g,",")

};//SUPER_reemplazar,una y otra vez.

//Si_no_esta_ya_ DENUEVO...el de arriba parece no funcar.
if(!(final_add.match(cordis))){
final_add = final_add+cordis
}

//######################################
	GM_setValue(meter,final_add)

	}}
}//si pasa=1
//meterlo aca mejor, yeah!


//Mostrar datos=
document.getElementById('report_surround').parentNode.innerHTML+= '<b>Distancias</b>: '+dist_1+'/'+dist_2+'<br> <b>Tropas</b>: '+sum+' <br><b>Botin</b>:'+botin+'<br><b>Jugador Att.</b>: '+jugador+'<br><b>Jugador Def.</b>: '+jugador2+'<br><b>Coordenadas</b>: '+at_cords+'<br><b>Tropas</b>: '+sum+'<br>'+'<b>Bajas</b>: '+sun+'<br>'


}//FINAL



if (location.href.match('dorf3.php')){



// AGREGADO QUE ESTABA:

if(document.getElementById('textmenu')){;//si existe table...osea es resumen
var add_f = ' | <a href="?Vacas_Mias"> Vacas </a>'
document.getElementById('textmenu').innerHTML += add_f
}
	if (location.href.match('Vacas_Mias')){
	var new_agreagado =''
	var o = ' - '
	for (mk=0;mk<=(rangos.length-1);mk++){
	var k;var l;if (mk>=(rangos.length-1)){k = 99999;l='++ ';o=''
	/*para el ultimo */;
	} else { k = rangos[mk+1];l=k }
		//mismo_fix

		var mis1 = prex+'['+rangos[mk]+'-'+k+']'	
		var mis2 = GM_getValue(mis1)
		var add_img = '[#]'
		var bbx = '<b><font color="green" size="0">'

		for (i=0;i<200;i++){
		mis2=mis2.replace(/,,/g,",")
		};//loop para mergear muchas comas!!

if (mis2[mis2.length-1]==","){
mis2 = mis2.substring(0, mis2.length-1)}



//* AGREGADO nuevo
		//if(mk!=0){z_rowz=Math.round(z_rowz/(mk))};//para que vacas grandes, menos roys.


var boton_clear='  <font size="0">[<font color="red"><b><a href="?Vacas_Mias&delete='+mk+'" id="ig_delete_'+mk+'">'+tx_Borrar+'</a></b></font>]</font>'

boton_clear+=' <font size="0" color="navy"> Vacas: <b id="vacas_c'+mk+'">?</b></font>'
boton_clear+='<font size="0" color="purple"> <haha id="vacas_x'+mk+'">?</haha> Tropas</font>'

//boton_clear+='<font color="red" size="0" id="kre_'+mk+'">'+mk+'</font>'


		new_agreagado = new_agreagado + '<tr><td aling="left">'+bbx+add_img+' Vacas de '+rangos[mk]+o+l+' Tropas</font></b>'+boton_clear+'</td></tr>'
		new_agreagado = new_agreagado + '<tr><td><font size="0"><textarea rows="'+z_rowz+'" cols="70%">'+mis2+'</textarea></font></td></tr>'
	}

	document.getElementById('overview').getElementsByTagName('thead')[0].innerHTML='<tr><th>Vacas Robadas</th></tr>'
	document.getElementById('overview').getElementsByTagName('thead')[0].innerHTML+='<tr><td><font color="red" size="0"><b>Rangos: </b>[<ig id="mizrankz">'+rangos+'</ig>]</font></td></tr>'
	document.getElementById('overview').getElementsByTagName('tbody')[0].innerHTML=new_agreagado
	document.getElementById('overview').parentNode.innerHTML+='<i>Rangos de 0 a </i><i id="ammnm">'+((rangos.length*1)-1)+'</i>'
	}

// AGREGAMOS OPEN COORD
if (location.href.match('Vacas_Mias')){
var pre = document.getElementById('textmenu')
pre.innerHTML+='<br><br><input type="text" id="sacar_z" value="0|0"><input type="submit" id="mandar_z" value="Ver Aldea">'
pre.parentNode.innerHTML+='<br><br><input type="text" id="sacar_z2" value="0|0"><input type="submit" id="mandar_z2" value="Ver Aldea">'




function calcular_cuantas(){

	for (i=0;i<rangos.length;i++){
			var usamos = rangos[i]
			var usamos2 = rangos[i+1]
			var _e_tx=document.getElementsByTagName('textarea')[i]
		if(_e_tx){
			var tx = document.getElementsByTagName('textarea')[i].innerHTML
			tx = (tx.split(','))
			tx = tx.length
			document.getElementById('vacas_c'+i).innerHTML = tx			
			var dda = '('+usamos*tx+' a '+usamos2*tx+')'
			document.getElementById('vacas_x'+i).innerHTML = dda
		}
	}
}

calcular_cuantas()

function z_coord(){
	var tt = document.getElementById('sacar_z').value
	tt=tt.split('|');var x=tt[0];var y=tt[1];
	var z= ((400-(y*1))*801);z=z*1 +((x*1)+401)*1
	var url = 'http://'+location.host+'/karte.php?z='+z+'&openmid'
	window.open(url,"_blank")
}
function z_coord2(){var tt = document.getElementById('sacar_z2').value
	tt=tt.split('|');var x=tt[0];var y=tt[1];
	var z= ((400-(y*1))*801);z=z*1 +((x*1)+401)*1
	var url = 'http://'+location.host+'/karte.php?z='+z+'&openmid'
	window.open(url,"_blank")}

document.getElementById("mandar_z").addEventListener("click", z_coord, false)
document.getElementById("mandar_z2").addEventListener("click", z_coord2, false)
}

// FIN DE OPEN COORD

	function delete_cuuukaa(kfe,rangog){	
			var rangof = rangog
			var kre = kfe
			var ee = document.getElementById('ammnm').innerHTML					
			var misg = prex+'['+rangof[kre]+'-'+rangof[kre+1]+']'
			var vname = 'clear_that_coki'+kre
			alert(kre+':  '+misg)
			//	GM_setValue(misg,'')		
	}
	if (location.href.match('delete')){
		var max_zoz = 99999;//Cantidad usada para maximo el rank maximo... 
		//infinito a fines practicos... mas tropas q eso nadie tiene atracando. ¿?
		var urld = location.href.split('delete');urld = urld[1].replace("=","")
		var m_son_r = document.getElementById('mizrankz').innerHTML
		eval('var ei = ['+m_son_r+','+max_zoz+']')
		var misg = prex+'['+ei[urld]+'-'+ei[urld*1+1]+']' 
		GM_setValue(misg,'')
		location.href = 'http:'+location.host + '/dorf3.php?Vacas_Mias'
	}
	
		
		



}


//MENU PARA SETEAR OFFS

function saiveVars(){
var k = ''

for (i=1;i<=5;i++){
var vars = document.getElementById('vare'+i).value
k=k+'###'+vars}
k=k.replace('###','')

GM_setValue(prex+'_variables',k)
alert('Variables Guardadas')
window.open(location.href,'_self');
}

function load_menu_vars(){

var aster = '<br>[<font color="red"><b>*</b></font>] ' 
var dd_cg = '<center><h1><font color="darkcyan">Configurar Robavacas</font></h1></center><br><br><form>'
dd_cg+=aster+'Ofensiva [1] <input type="text" value="'+o1x+'|'+o1y+'" id="vare1">'
dd_cg+=aster+'Ofensiva [2] <input type="text" value="'+o2x+'|'+o2y+'" id="vare2"><br>'
dd_cg+='<font color="red" size="0">¡Asegurarse de escribir bien las coordenadas, divididas por | !</font><br><br>'
dd_cg+=aster+'Actualizar Cada: <input type="text" value="'+res_time/60000+'" id="vare3"> (minutos)'
dd_cg+=aster+'Mi nick: <input type="text" value="'+yo_soy+'" id="vare4">'
dd_cg+=aster+'Distancia Maxima a Robar.: <input type="text" value="'+max_dist+'" id="vare5"></form>'
dd_cg+='<br><br><br><input type="submit" value="Guardar" id="save_btne"><br>'

dd_cg+='<a href="allianz.php?s=3&f=1&re_scan"><font color="darkcyan" size="0">Empezar</font></a>'
dd_cg+='<br><font color="red" size="0">Hecho por Xinocudeiro.</font>'


	var tb = document.getElementById('content')
	tb.innerHTML=dd_cg

document.getElementById("save_btne").addEventListener("click", saiveVars, false)

}

	




if (location.href.match('karte.php')){
if (location.href.match('openmid')){
//var mapa = document.getElementById('map_links')
var mm_href = document.getElementById('a_3_3').href
window.open(mm_href,"_self")
}}

if (location.href.match('berichte.php')){
if (location.href.match('id')){
if (document.getElementById('report_surround')){;/* Si es report...no de comercio */
load_vacas()}}}

//CREACONFIG
if (location.href.match('spieler.php')){
if (location.href.match('ig_r_config')){
load_menu_vars()
}}