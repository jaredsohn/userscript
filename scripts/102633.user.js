// ==UserScript==
// @name           t3 - Resumen Ampliado
// @namespace      t3 - Resumen Ampliado
// @description    t3 - Resumen Ampliado
// @include        http://*.travian.*/dorf3.php
// ==/UserScript==

//porra 11, teuto 16, cata 18.

var fire = navigator.appCodeName
var cargartt = 1000
if(fire=='Mozilla'){
cargartt=0
//Toda la function cargarla lento
}

setTimeout(function(){
//hasta finale.
var text_def1 = ''
var deffs_on = 0; var totalconsumo=0
var allow_ids = 0




if(fire=='Mozilla'){
allow_ids=1
GM_addStyle("#no_party { background-color: #A9E8E2;}");
GM_addStyle("#full_almacen { background-color: #FFB0B0 ; }");
GM_addStyle("#noventacinco_almacen { background-color: #FAAC58 ;};");
GM_addStyle("#noventa_almacen { background-color: #F3F781 ; }");
GM_addStyle("#Esta_es_off { background-color: #EFCCCC ;}");
}




function add_mmg(unit){
var _img = ['<img src="img/x.gif" class="unit u','">']
return _img[0]+unit+_img[1]}

if(document.getElementById('overview')){

document.getElementById('content').parentNode.innerHTML+='<b style="visibility:hidden" id="defenon">0</b>'

var _e = document.getElementById('overview')
var _h = _e.getElementsByTagName('thead')[0]
var _b=  _e.getElementsByTagName('tbody')[0]
var h_l = 6;//filas a crear.

	for (i=0;i<h_l;i++){_h.rows[1].insertCell(_h.rows[1].cells.length)}
	//Creamos 4 filas de titles.
	_h.rows[0].cells[0].colSpan=_h.rows[1].cells.length



var SpecialBuild = '<a id="get_deffs_on">'+'Build'+'</a>'

var nombres = ['Aldea','Att','Raid',add_mmg(12)+' Def',SpecialBuild,'Colas','Merc','PC',add_mmg(11)+add_mmg(13),add_mmg(16),add_mmg(18)]
for (j=0;j<_h.rows[1].cells.length;j++){_h.rows[1].cells[j].innerHTML = nombres[j]}

var _fil = _b.rows.length
for (k=0;k<_fil;k++){
for (i=0;i<h_l;i++){_b.rows[k].insertCell(_b.rows[k].cells.length)}

//#### DEFINIMOS VARIABLES //###
var _build2 = ''
var _build = _b.rows[k].cells[2].getElementsByTagName('img').length
	if(_build>0){for (p=0;p<_build;p++){
		var ta = ' <font color="darkorange" size="0">*';//'<img src="img/x.gif" class="unit ugeb"> '
		_build2 += ta + _b.rows[k].cells[2].getElementsByTagName('img')[p].title + '<br></font>'
	}}

var _merca = _b.rows[k].cells[4].innerHTML;

//###############################
//#### Clasificamos atracos //###
//###############################

var s_attz2='';var s_attz;var s_movis;var s_movis2='';var s_reff;var s_reff2='';var sumk=0
if(_b.rows[k].cells[1].getElementsByTagName('img')[0]){
var e = _b.rows[k].cells[1].getElementsByTagName('img')
for (o=0;o<e.length;o++){
var isimg = e[o]
var cl = isimg.className
var imm = '<img src="img/x.gif" class="'+cl+'">'
if((cl=="att1")||(cl=="att2")||(cl=="def1")||(cl=="def2")){
imm=''}


		if (cl=="att1"){s_attz = isimg.title;s_attz = '<font color="red">'+imm+' »'+s_attz.split('x ')[0]+'<font>';
		s_attz2+=s_attz;}
		if (cl=="att3"){s_attz = isimg.title;s_attz = '<font color="#B500A3">'+imm+' »'+s_attz.split('x ')[0]+'<font>';
		s_attz2+=s_attz;}
		if (cl=="att2"){s_movis = isimg.title;var can = s_movis.split('x ')[0];s_movis = '<font color="#F2C700">'+imm+' «'+can+'<font>';
		sumk=sumk*1+can*1;s_movis2+=s_movis;}
		if (cl=="def1"){s_movis = isimg.title;var can = s_movis.split('x ')[0];s_movis = '<font color="#228B22">'+imm+' »'+can+'<font>';
		sumk=sumk*1+can*1;s_movis2+=s_movis;}
		if (cl=="def2"){s_reff = isimg.title;s_reff = '<font color="#F2C700">'+imm+' «'+s_reff.split('x ')[0]+'<font>';s_reff2+=s_reff}
		if (cl=="def3"){s_reff = isimg.title;s_reff = '<br><font color="#B500A3">'+imm+' «'+s_reff.split('x ')[0]+'<font>';s_reff2+=s_reff}
}}

//###############################
//#### Clasificamos recluta //###
//###############################
var jae = 6;//la aldea cortada en 6 letras max.
var pp_temp
var _colas = _b.rows[k].cells[3].innerHTML


var aldea = _b.rows[k].cells[0].getElementsByTagName('a')[0]
aldea = '<a href="'+aldea.href+'"><font size="0" color="blue">'+(aldea.innerHTML).substr(0,jae)+'</font></a>'

var ek1 = '<font size="0">'
var ek2 = '</font>'

_b.rows[k].cells[0].innerHTML = aldea
_b.rows[k].cells[1].innerHTML = s_attz2
if(fire=="Mozilla"){_b.rows[k].cells[2].innerHTML = s_movis2}
if(sumk!=0){_b.rows[k].cells[2].innerHTML +='<br>('+sumk+')'}

_b.rows[k].cells[4].innerHTML = _build2
_b.rows[k].cells[6].innerHTML = ek1+_merca+ek2
_b.rows[k].cells[5].innerHTML = _colas

//s_reff2

function ver_unit(titl,cl,unidad,color,title,cell){
	pp_temp=''

	if (cl==("unit "+unidad)){pp_temp = titl.split('x ')[0];pp_temp = '<font color="'+color+'">'+pp_temp+'</font>';
		var agregar = '<font size="0" title="'+title+'">'+pp_temp+'</font>';
		eval(cell+'+='+agregar)
	}

}

if(_b.rows[k].cells[3].getElementsByTagName('img')[0]){
var e = _b.rows[k].cells[3].getElementsByTagName('img')

for (o=0;o<e.length;o++){

	var isimg = e[o]
	var cl = isimg.className
var _bsr = "document.getElementById('overview').getElementsByTagName('tbody')[0].rows["+k+"]"

		ver_unit(isimg.title,cl,'u11','#34282C',' Porras ',_bsr+'.cells[8].innerHTML')
		ver_unit(isimg.title,cl,'u13','darkpurple',' Hachas ',_bsr+'.cells[8].innerHTML')
		ver_unit(isimg.title,cl,'u16','darkgrey','Teutones',_bsr+'.cells[9].innerHTML')
		ver_unit(isimg.title,cl,'u18','darkorange','Catas ',_bsr+'.cells[10].innerHTML')
		//ver_unit(isimg.title,cl,'u12','grey','Lanceros','s_reff2')
		//ver_unit(isimg.title,cl,'u15','#C7A317','Paladin','s_reff2')
		ver_unit(isimg.title,cl,'u12','grey','Lanceros',_bsr+'.cells[3].innerHTML')
		ver_unit(isimg.title,cl,'u15','#C7A317','Paladin',_bsr+'.cells[3].innerHTML')
}	}



_b.rows[k].cells[3].innerHTML = s_reff2

//#### Grabamos VARIABLES //###


s_reff2='';s_movis2='';sumk=0
}


var rrf='<div id="divi_almacen" style="visibility:hidden;"></div>'
rrf+='<div id="divi_deffs" style="visibility:hidden;">.</div>'
rrf+='<div id="divi_fiestas" style="visibility:hidden;">.</div>'
rrf+='<div id="produs" style="visibility:hidden;">.</div>'

setTimeout(function(){
document.getElementById('divi_almacen').style.height = 0+'px';
document.getElementById('divi_fiestas').style.height = 0+'px';
document.getElementById('divi_deffs').style.height = 0+'px';
document.getElementById('produs').style.height = 0+'px';
},500)


//Empezar print.
_e.parentNode.innerHTML+=rrf

AbrirPagi('dorf3.php?s=4')

 

}//fin_total if overview
//###############################
//####      DEFENSAS  //###
//###############################
function ver_deffs(){

var inside = document.getElementById('divi_deffs').getElementsByTagName('table')
var fl = ''
	for (k=0;k<_fil;k++){
	fl+='<table id="deffs_ald'+k+'" width="100%">'+inside[k].innerHTML+'</table>'	
	};//fin de for k
document.getElementById('divi_deffs').innerHTML = fl
//Acomodamos el post

function UnitType(imagen){
var ea = imagen.className
ea = (ea.replace('unit u',''))
if(ea.length==2){ea = ea.substr(0,1)} else {ea = 0}
return ea}

//si soy germano es asi  1=germa, 0 =rome, 2= galo.
var get_raza = 1
	if(document.getElementById('overview').getElementsByTagName('img')[5]){
	get_raza = UnitType(document.getElementById('overview').getElementsByTagName('img')[5])
	}
	

//sacamos datos
for (k=0;k<_fil;k++){

var tabletwn = document.getElementById('deffs_ald'+k)
var deffs = (tabletwn.getElementsByTagName('tbody')[0])
var razas = ((deffs.rows.length)/2)-(0.5)


// si yo soy germano
var pp='';var d_lego=pp;var d_preto=pp;var d_laza=pp;var d_pala=pp;var d_falas=pp;var d_druid=pp;

if(razas==3){
var raza1 =  UnitType(deffs.rows[0].cells[1].getElementsByTagName('img')[0])
var raza2 =  UnitType(deffs.rows[2].cells[1].getElementsByTagName('img')[0])
var raza3 =  UnitType(deffs.rows[4].cells[1].getElementsByTagName('img')[0])
	for (i=1;i<=3;i++){
		if((eval('raza'+i))==0){		
			d_lego = deffs.rows[1].cells[1].innerHTML
			d_preto = deffs.rows[1].cells[2].innerHTML
		}
			if((eval('raza'+i))==1){		
			d_laza = deffs.rows[3].cells[2].innerHTML
			d_pala = deffs.rows[3].cells[5].innerHTML
		}
			if((eval('raza'+i))==2){			
			d_falas = deffs.rows[5].cells[1].innerHTML
			d_druid = deffs.rows[5].cells[5].innerHTML
		}
	}
}
if(razas==2){
var raza1 =  UnitType(deffs.rows[0].cells[1].getElementsByTagName('img')[0])
var raza2 =  UnitType(deffs.rows[2].cells[1].getElementsByTagName('img')[0])
	for (i=1;i<=2;i++){;var t=i;if(i=='2'){t=3};
		if((eval('raza'+i))==0){
			d_lego = deffs.rows[t].cells[1].innerHTML
			d_preto = deffs.rows[t].cells[2].innerHTML}
		if((eval('raza'+i))==1){
			d_laza = deffs.rows[t].cells[2].innerHTML
			d_pala = deffs.rows[t].cells[5].innerHTML}		
		if((eval('raza'+i))==2){			
			d_falas = deffs.rows[t].cells[1].innerHTML
			d_druid = deffs.rows[t].cells[5].innerHTML
}	}	}

if(razas==1){
var raza1 =  UnitType(deffs.rows[0].cells[1].getElementsByTagName('img')[0])
		if((eval('raza1'))==0){
			d_lego = deffs.rows[1].cells[1].innerHTML
			d_preto = deffs.rows[1].cells[2].innerHTML}
		if((eval('raza1'))==1){
			d_laza = deffs.rows[1].cells[2].innerHTML
			d_pala = deffs.rows[1].cells[5].innerHTML}		
		if((eval('raza1'))==2){			
			d_falas = deffs.rows[1].cells[1].innerHTML
			d_druid = deffs.rows[1].cells[5].innerHTML
	}	}

var ext=''
var space= ''


var ty1='<br>';var ty2 = '<br>'

if(razas==2){
	if(raza1==0){ty1='<br>';ty2 = '<br>'}
	if(raza1==1){ty1='';ty2 = '<br>'}
}
if(razas==1){ty1='';ty2 = ''}



if(d_lego!=''){ext+=add_mmg(1)+': '+d_lego+space}
if(d_preto!=''){ext+=' '+add_mmg(2)+': '+d_preto+space}

if(d_laza!=''){ext+=ty1+add_mmg(12)+': '+d_laza+space}
if(d_pala!=''){ext+=' '+add_mmg(15)+': '+d_pala+space}

if(d_falas!=''){ext+=ty2+add_mmg(21)+': '+d_falas+space}
if(d_druid!=''){ext+=' '+add_mmg(25)+': '+d_druid+space}




var re ='<a id="tooltip'+k+'">'
var ra = '</a>'
tabletwn.innerHTML+='<tr><td colspan="11">'+re+text_def1+ra+'</td></tr>'







var rext = '\''+ext+'\''

var el = document.getElementById('tooltip'+k)
el = "document.getElementById('overview').getElementsByTagName('tbody')[0].rows["+k+"].cells[4]"

el = document.getElementById('overview').getElementsByTagName('tbody')[0].rows[k].cells[4]

//eval('el.addEventListener ("mouseover",function(){mostar_toolt('+k+','+rext+')}, "false");')
//eval('el.addEventListener ("mouseout",function(){salir_toolt('+k+','+'\''+document.getElementById('overview').getElementsByTagName('tbody')[0].rows[k].cells[4].innerHTML+'\''+')}, "false");')


var consumo = (tabletwn.getElementsByTagName('tbody')[1])
consumo=consumo.rows[0].cells[1].innerHTML
consumo=consumo.split('<img')[0]
var _bd=  document.getElementById('overview').getElementsByTagName('tbody')[0].rows[k].cells[0]
_bd.title='Consumo: '+consumo




totalconsumo=(totalconsumo*1)+consumo*1


}//fin del loop--

document.getElementById('textmenu').parentNode.innerHTML += '<br><br><b>Consumo total:</b> '+'<img title="Cereales" alt="Cereales" src="img/x.gif" class="r4"> -'+totalconsumo

}//FIN FUNCT




//###########################################################################
//##########################     SUPER TOOLTIPS    //##############
//###########################################################################


function get_deffs_ons(){

var deffs_on = document.getElementById('defenon').innerHTML

if(deffs_on==0){deffs_on=1
document.getElementById('defenon').innerHTML = deffs_on
document.getElementById('get_deffs_on').innerHTML = 'Defensas'
} else {deffs_on=0
document.getElementById('defenon').innerHTML = deffs_on
document.getElementById('get_deffs_on').innerHTML = 'Build'

}

}

function mostar_toolt(id,vari){

var deffs_on = document.getElementById('defenon').innerHTML
	if(deffs_on==1){
		//deffs_on=deffs_on+1
		var xel = document.getElementById('tooltip'+id)
		xel=document.getElementById('overview').getElementsByTagName('tbody')[0].rows[id].cells[4]
		xel.innerHTML=vari
	}
}
function salir_toolt(id,restore){

var restore_time = 3000

var deffs_on = document.getElementById('defenon').innerHTML
	if(deffs_on==1){
		var tel = document.getElementById('tooltip'+id)
		tel=document.getElementById('overview').getElementsByTagName('tbody')[0].rows[id].cells[4]
		setTimeout(function(){tel.innerHTML=restore},restore_time)
}}


//###########################################################################
//##########################      FIN DE SUPER TOOLTIPS    //##############
//###########################################################################


//###############################
//####      ALMACENES   //###
//###############################
function ver_almacen(){



	var alma = document.getElementById('warehouse').getElementsByTagName('tbody')[0]
	document.getElementById("divi_almacen").innerHTML = '<table id="warehouse">'+alma.innerHTML+'</table>'
	var neo_alma = document.getElementById('warehouse').getElementsByTagName('tbody')[0]

	var _over = document.getElementById('overview').getElementsByTagName('tbody')[0]

	for (k=0;k<_fil;k++){
		var red = 0
		var rrr_1 = (neo_alma.rows[k].cells[1].innerHTML).replace('%','')
		var rrr_2 = (neo_alma.rows[k].cells[2].innerHTML).replace('%','')
		var rrr_3 = (neo_alma.rows[k].cells[3].innerHTML).replace('%','')
		var rrr_4 = (neo_alma.rows[k].cells[5].innerHTML).replace('%','')
		
		var t1 = [100,101]


//#### CEREAL NEGATIVO!!

if(neo_alma.rows[k].cells[6].getElementsByTagName('span')[0]){
	var faltacere = neo_alma.rows[k].cells[6].getElementsByTagName('span')[0]

	if(faltacere.className=='crit'){
			var maxcer = (faltacere.innerHTML).split(':')
			var miniscere = Math.round(maxcer[0]*60+maxcer[1]*1)
			var imgs = '<img title="Cereales" alt="Cereales" src="img/x.gif" class="r5"> '
			_over.rows[k].cells[7].innerHTML='<font size="1" color="red">'+imgs+miniscere+'m</font>'
			if(allow_ids==1){_over.rows[k].cells[7].id='Esta_es_off'}
}	}		
//#### CEREAL NEGATIVO!!

		if(allow_ids==1){


add_rank(k,rrr_1,rrr_2,rrr_3,rrr_4,t1,'full_almacen')
t1 = [95,100]
add_rank(k,rrr_1,rrr_2,rrr_3,rrr_4,t1,'noventacinco_almacen')
t1 = [90,95]
add_rank(k,rrr_1,rrr_2,rrr_3,rrr_4,t1,'noventa_almacen')


		}
	}
}
//###############################
//####      FIESTAS   //###
//###############################


function add_rank(k,rrr_1,rrr_2,rrr_3,rrr_4,t1,idname){
var _over = document.getElementById('overview').getElementsByTagName('tbody')[0]
if(((rrr_1>=t1[0])&&(rrr_1<t1[1]))||((rrr_2>=t1[0])&&(rrr_2<t1[1]))||((rrr_3>=t1[0])&&(rrr_3<t1[1]))||((rrr_4>=t1[0])&&(rrr_4<t1[1])))
{_over.rows[k].cells[6].id=idname}

}

function ver_fiestas(){
	var cultu = document.getElementById('culture_points').getElementsByTagName('tbody')[0]
	document.getElementById("divi_fiestas").innerHTML = '<table id="culture_points">'+cultu.innerHTML+'</table>'
	var neo_cultu = document.getElementById('culture_points').getElementsByTagName('tbody')[0]
	var _over = document.getElementById('overview').getElementsByTagName('tbody')[0]
	

	for (k=0;k<_fil;k++){
		
		var cc1 = '<font color="darkpurple">'		
		var row = neo_cultu.rows[k].cells[2]
		var rowe = _over.rows[k].cells[7]
		var party = row.innerHTML
		var ayunt = row.getElementsByTagName('span')[0].title
		ayunt=ayunt.split(' ')[2];//dsps del espacio! lvl del ayunta.

		var reu = ' ['+ayunt+']'
		reu='';//no quiero q muestre el lvl del ayunyamiento!!
		if(party.match(':')){party = cc1+party.split(':')[0]+'hs'+ek2+reu}

		_over.rows[k].cells[7].innerHTML = ek1+party+ek2

		if(allow_ids==1){
			if(party.match('dot')){rowe.id="no_party"}
			if(party.match('none')){rowe.id="no_party"}
		}
	}

}

//###############################
//####      atracs   //###
//###############################

function load_atracus(mmmh){

if(document.getElementById('produs').getElementsByTagName('table')[1].getElementsByTagName('tbody')[0]){
var nee = document.getElementById('produs').getElementsByTagName('table')[1].getElementsByTagName('tbody')[0]
var r_prod = nee.rows[0].cells[1].innerHTML
var r_roba = nee.rows[1].cells[1].innerHTML
var r_tora = nee.rows[3].cells[1].innerHTML

var text = ' | <b>Produccion:</b> '+r_prod+' | <b>Atracos:</b> '+r_roba+' | <br><b alt="Sin contar el negativo...hay que restarle el consumo total" title="Sin contar el negativo...hay que restarle el consumo total">Total*: </b>'+r_tora
if(document.getElementById('textmenu').parentNode){document.getElementById('textmenu').parentNode.innerHTML+=text+' materias/hora'
}}}


//###############################
//####      HTTP request    //###
//###############################




function AbrirPagi(yourimportedString) {

var yourimportedStringr = yourimportedString.split('=')[1]

 
    url = yourimportedString
    if (window.XMLHttpRequest) { // Non-IE browsers
      req = new XMLHttpRequest();
     req.onreadystatechange = targetDiv;
      try {
        req.open("GET", url, true);
      } catch (e) {
        alert(e);
      }
      req.send(null);    
    }

function targetDiv() {
    if (req.readyState == 4) { // Complete
          if (req.status == 200) { // OK response
             

		if(yourimportedStringr==4){
			 document.getElementById("divi_fiestas").innerHTML = req.responseText;
		ver_fiestas()
		AbrirPagi('dorf3.php?s=3')
		}

		if(yourimportedStringr==3){
			 document.getElementById("divi_almacen").innerHTML = req.responseText;
		
		ver_almacen()
		AbrirPagi('dorf3.php?s=6')
		}


		if(yourimportedStringr==6){
			document.getElementById("divi_deffs").innerHTML = req.responseText;
		
		ver_deffs()
		AbrirPagi('manual.php?s=1&typ=7')

		}

		if(yourimportedString=='manual.php?s=1&typ=7'){
			document.getElementById("produs").innerHTML = req.responseText;
			load_atracus()
		}
		

          } else {
           //alert("Problem: " + (req).statusText);
          }}
} }

document.getElementById('get_deffs_on').addEventListener("click",get_deffs_ons,false)


},cargartt);//final;