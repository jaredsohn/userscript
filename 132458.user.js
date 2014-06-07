// ==UserScript==
// @name           Ikariam Resource Dealer(φασουλάδα)
// @namespace      (φασουλάδα)
// @description    Script that Distributes Resources in Ikariam
// @author         TioJack - bartsb@gmail.com - http://userscripts.org/users/151781 
// @homepage       http://userscripts.org/scripts/show/132458
// @include        http://m*.ikariam.*/*
// @version        4.1
// ==/UserScript==

////GLOBAL VARIABLES////

//Capacity of a ship
var cap = 500;

// Url of the images of the resource dealer
var url_img_wood_dealer = "http://img26.imageshack.us/img26/1121/wooddealer.gif";
var url_img_wine_dealer = "http://img255.imageshack.us/img255/4444/winedealer.gif";
var url_img_marble_dealer = "http://img13.imageshack.us/img13/3452/marbledealer.gif";
var url_img_crystal_dealer = "http://img638.imageshack.us/img638/2848/crystaldealer.gif";
var url_img_sulfur_dealer = "http://img710.imageshack.us/img710/9751/sulfurdealer.gif";

////END GLOBAL VARIABLES////

var actionRequest = 0;
var cityId = new Array();
var cityNombre = new Array();
var cityRec = new Array();
var islaId = new Array();
var ind_cityId = 0;
var minimo; //Minimum for distribute
var maximo; //Maximum for distribute
var min_dep; //Minimum for deposit
var cresource = new Array();
var xresource = new Array();
var mresource = new Array();
var bresource = new Array();
var mate_barco = new Array();
var dest_barco = new Array();
var accion = new Array();
var orig = new Array();
var dest = new Array();
var cant = new Array();
var error = new Array();
var real = new Array();
var ind_accion = 0;
var rec_cityId = 0;
var rec_accion = 0;
var barcos = 0;
var resource = "";
var baseURL = window.location.href.substring(0,window.location.href.indexOf(".php")+4);
var resourcetrad = new Array();
resourcetrad[0] = unsafeWindow.LocalizationStrings['resources']['wood'];
resourcetrad[1] = unsafeWindow.LocalizationStrings['resources']['wine'];
resourcetrad[2] = unsafeWindow.LocalizationStrings['resources']['marble'];
resourcetrad[3] = unsafeWindow.LocalizationStrings['resources']['crystal'];
resourcetrad[4] = unsafeWindow.LocalizationStrings['resources']['sulfur'];
var ocupado = 0;
var name;

setVar("s_h_deals",getVar("s_h_deals",0));
setVar("s_h_inform",getVar("s_h_inform",0));
setVar("s_h_image",getVar("s_h_image",1));

var nodeRef_2 = $("citySelect");
rec_arbol_2(nodeRef_2);

// Default Deal "Wine Dealer"
var dealer_names = getVar("dealer_names");
if(dealer_names==undefined){
	var nombre = "Wine Dealer";
	setVar("dealer_names",nombre+"|");
	setVar(nombre+"_resource","wine");
	setVar(nombre+"_minimo",0);
	setVar(nombre+"_maximo",80000);
	setVar(nombre+"_min_dep",0);
	setVar(nombre+"_repeat",60);
	var cres = "";
	for (var i = 0; i < cityId.length; i++) {
		if(cityRec[i]=="wine"){
			cres += 1 + "|";
		}else{
			cres += 0 + "|";
		}
	}
	setVar(nombre+"_cresource",cres);
	var momentoActual = new Date();
	var fecha = parseInt(momentoActual/(1000*60))+1;
	setVar(nombre+"_fecha",fecha);
	setVar(nombre+"_on",1);
	setVar(nombre+"_estado","");
}

$("GF_toolbar").innerHTML += "<img id='img_wood' src='"+url_img_wood_dealer+"' style='display:none' >";
$("GF_toolbar").innerHTML += "<img id='img_wine' src='"+url_img_wine_dealer+"' style='display:none' >";
$("GF_toolbar").innerHTML += "<img id='img_marble' src='"+url_img_marble_dealer+"' style='display:none' >";
$("GF_toolbar").innerHTML += "<img id='img_crystal' src='"+url_img_crystal_dealer+"' style='display:none' >";
$("GF_toolbar").innerHTML += "<img id='img_sulfur' src='"+url_img_sulfur_dealer+"' style='display:none' >";

var p,h,n1,n2,n3;

p = document.body;
h = document.createElement('div');
h.id = "ResourceDealer";
h.setAttribute('style','margin:-20px auto 20px;width:980px;padding:0;clear:both;');
p.appendChild(h);

p = $("ResourceDealer");
h = document.createElement('div');
h.id = "menu_dealer";
h.setAttribute('style','padding:7px 0px 7px 0px; position:relative;clear:both;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:double;border-width:3px;background:url(http://img156.imageshack.us/img156/8512/fondoz.jpg) repeat;text-decoration:none;width:100%;color:#612d04;font:bold 12px Arial, Helvetica, sans-serif;text-align:left;');
h.innerHTML = '<table align="left" width="100%"><tr><td id="cel_menu_1" align="center"><a href="http://userscripts.org/scripts/show/74562" target="_blank"><b>Ikariam Resource Dealer</b></a></td><td id="cel_menu_2" align="center" width="18%"></td><td id="cel_menu_3" align="center" width="18%"></td><td id="cel_menu_4" align="center" width="18%"></td><td id="cel_menu_5" align="center" width="18%"></td></tr></table>';
p.appendChild(h);

p = $("ResourceDealer");
h = document.createElement('div');
h.id = "form_dealer";
h.setAttribute('style','position:relative;display:none;clear:both;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:double;border-width:3px;background:url(http://img156.imageshack.us/img156/8512/fondoz.jpg) repeat;text-decoration:none;width:100%;color:#612d04;font:bold 12px Arial, Helvetica, sans-serif;text-align:center;');
p.appendChild(h);

var tabla  = '<form name="form_dealer_add" id="form_dealer_add" ><table align="left" border="1" bordercolor="#c69262" width="100%">';
tabla += '<tr height="22"><td>Name</td><td>Resource</td><td>Min. Deal</td><td>Max. Deal</td><td>Min. Stock</td><td title="(Minutes)">Repeat</td>';
for (var i = 0; i < cityId.length; i++) {
	tabla += '<td title="'+cityNombre[i]+'">C'+(i+1)+'<img height="14" src="skin/resources/icon_'+cityRec[i]+'.gif"/></td>';
}
tabla += '<td id="celda_cancel"></td></tr>';

tabla += '<tr height="22"><td><input id="f_name" type="text" size="10"/></td>';
tabla += '<td><select id="f_resource"><option value="wood">wood</option><option value="wine">wine</option><option value="marble">marble</option><option value="crystal">crystal</option><option value="sulfur">sulfur</option></select></td>';
tabla += '<td><input id="f_minimo" type="text" size="5"/></td>';
tabla += '<td><input id="f_maximo" type="text" size="5"/></td>';
tabla += '<td><input id="f_min_dep" type="text" size="5"/></td>';
tabla += '<td><input id="f_repeat" type="text" size="5"/></td>';
for (var i = 0; i < cityId.length; i++) {
	tabla += '<td><select id="f_func_'+i+'"><option value="0" title="Target">T</option><option value="1" title="Source">S</option><option value="2" title="disabled" selected>d</option></select></td>';
}
tabla += '<td id="celda_save"></td></tr>';
tabla += '</table></form>';

$("form_dealer").innerHTML  = tabla;

p = $("celda_cancel");
h = document.createElement('a');
h.setAttribute('class','button');
h.setAttribute('style','padding:0px 1px');
h.innerHTML = 'Cancel';
h.addEventListener("click",function(){cancel()},false);
p.appendChild(h);

function cancel(){
	$("form_dealer").style.display="none";
}

p = $("celda_save");
h = document.createElement('a');
h.setAttribute('class','button');
h.setAttribute('style','padding:0px 1px');
h.innerHTML = 'Save';
h.addEventListener("click",function(){add()},false);
p.appendChild(h);

function add(){
	var nombre = $("f_name").value;
	if(nombre==""){
		alert("Enter a name");
		return false;
	}
	var minimo = parseInt($("f_minimo").value);
	if(isNaN(minimo)){
		alert("'Min. Deal' must be a number");
		return false;
	}
	var maximo = parseInt($("f_maximo").value);
	if(isNaN(maximo)){
		alert("'Max. Deal' must be a number");
		return false;
	}
	if(minimo>=maximo){
		alert("'Max. Deal' must be greater than 'Min. Deal'");
		return false;
	}
	var min_dep = parseInt($("f_min_dep").value);
	if(isNaN(min_dep)){
		alert("'Min. Stock' must be a number");
		return false;
	}
	var repeat = parseInt($("f_repeat").value);
	if(isNaN(repeat)){
		alert("'Repeat' must be a number");
		return false;
	}
	var hay_target = 0;
	var hay_source = 0;
	for (var i = 0; i < cityId.length; i++) {
		if($("f_func_"+i).value==0)hay_target = 1;
		if($("f_func_"+i).value==1)hay_source = 1;
	}
	if(hay_target == 0){
		alert("There isn't Target City [T]");
		return false;
	}
	if(hay_source == 0){
		alert("There isn't Source City [S]");
		return false;
	}
	
	//Todo Bien
	var dealer_names = getVar("dealer_names","");
	var dealer_name = dealer_names.split('|');
	if(!existe(dealer_name,nombre)){setVar("dealer_names",dealer_names+nombre+"|");}
	setVar(nombre+"_resource",$("f_resource").value);
	setVar(nombre+"_minimo",minimo);
	setVar(nombre+"_maximo",maximo);
	setVar(nombre+"_min_dep",min_dep);
	setVar(nombre+"_repeat",repeat);
	var cres = "";
	for (var i = 0; i < cityId.length; i++) {
		cres += $("f_func_"+i).value + "|";
	}
	setVar(nombre+"_cresource",cres);
	var momentoActual = new Date();
	var fecha = parseInt(momentoActual/(1000*60))+1;
	setVar(nombre+"_fecha",fecha);
	setVar(nombre+"_on",getVar(nombre+"_on",1));
	setVar(nombre+"_estado","");
	$("form_dealer_add").reset();
	cargar_dealers();
	$("form_dealer").style.display="none";
}

function existe(pajar,aguja){
	var e = false;
	for (var i = 0; i < pajar.length; i++) {
		if(pajar[i]==aguja){e = true; break;}
	}
	return e;
}

p = $("ResourceDealer");
h = document.createElement('div');
h.id = "dealers";
h.setAttribute('style','position:relative;clear:both;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:double;border-width:3px;background:url(http://img156.imageshack.us/img156/8512/fondoz.jpg) repeat;text-decoration:none;width:100%;color:#612d04;font:bold 12px Arial, Helvetica, sans-serif;text-align:center;');
p.appendChild(h);
cargar_dealers();

function cargar_dealers(){
	$("dealers").innerHTML = '';
	var dealer_names = getVar("dealer_names","");
	var dealer_name = dealer_names.split('|');
	if(dealer_name.length-1>0){
		var tabla  = '<table align="left" border="1" bordercolor="#c69262" width="100%">';
		tabla += '<tr><td></td><td></td><td></td><td>Name</td><td>Resource</td><td>Min. Deal</td><td>Max. Deal</td><td>Min. Stock</td><td title="(Minutes)">Every Minutes</td>';
		for (var i = 0; i < cityId.length; i++) {
			tabla += '<td title="'+cityNombre[i]+'">C'+(i+1)+'<img height="14" src="skin/resources/icon_'+cityRec[i]+'.gif"/></td>';
		}
		tabla += '<td>Next Run</td><td colspan="3">Actions</td><td width="68">Status</td></tr>';
	
		for (var i = 0; i < dealer_name.length-1; i++) {
			var nombre=dealer_name[i];
			if (typeof getVar(nombre+"_maximo")=="undefined")setVar(nombre+"_maximo",80000);
			
			// make zebralines 
			var LineStyle = 'style="font-weight:normal'		
			var rem = i%2;  
            if ( rem >0 ) {   // split odd/even lines  
				if(getVar(nombre+"_on")==1){  
					LineStyle = 'style="font-weight:normal;background: #FDF7DD"'  
				}else{  
					LineStyle = 'style="font-weight:normal;background: #FDD4A6"'  
                }  
            } else {  
                if(getVar(nombre+"_on")==1){  
					LineStyle = 'style="font-weight:normal;background: #FBEED1"'  
                }else{  
					LineStyle = 'style="font-weight:normal;background: #EFC287"'  
                }     
            } 
			
			tabla += '<tr height="20">';
			tabla += '  <td ' + LineStyle + '>'+(i+1)+'</td>';
			tabla += '  <td ' + LineStyle + ' id="UP_'+i+'" ></td>';
			tabla += '  <td ' + LineStyle + ' id="DW_'+i+'" ></td>';
			tabla += '  <td ' + LineStyle + '>'+nombre+'</td>';
			tabla += '  <td ' + LineStyle + '>'+getVar(nombre+"_resource")+'</td>';
			tabla += '  <td ' + LineStyle + '>'+getVar(nombre+"_minimo")+'</td>';
			tabla += '  <td ' + LineStyle + '>'+getVar(nombre+"_maximo")+'</td>';
			tabla += '  <td ' + LineStyle + '>'+getVar(nombre+"_min_dep")+'</td>';
			tabla += '  <td ' + LineStyle + '>'+getVar(nombre+"_repeat")+'</td>';
			var cres = getVar(nombre+"_cresource").split("|");
			for (var j = 0; j < cityId.length; j++) {
				tabla += '  <td ' + LineStyle + '>'+num_to_func(cres[j])+'</td>';
			}
			tabla += '  <td ' + LineStyle + '>'+Fecha(getVar(nombre+"_fecha")*1000*60)+'</td>';
			tabla += '  <td id="Mod_'+i+'"></td>';
			tabla += '  <td id="Del_'+i+'"></td>';
			tabla += '  <td id="On_Off_'+i+'"></td>';
			tabla += '  <td align="left" ' + LineStyle + '>'+getVar(nombre+"_estado")+'</td>';
			tabla += '</tr>';
		}
		tabla += '</table>';
		$("dealers").innerHTML  = tabla;
		
		for (var i = 0; i < dealer_name.length-1; i++) {
			var nombre=dealer_name[i];
			
			if(i!=0){
				p = $("UP_"+i);
				h = document.createElement('a');
				h.id = nombre;
				h.setAttribute('class','button');
				h.setAttribute('style','padding:0px 1px');
				h.innerHTML = '&Lambda;';
				h.addEventListener("click",function(){UP(this.id)},false);
				p.appendChild(h);
			}
			
			if(i!=dealer_name.length-2){
				p = $("DW_"+i);
				h = document.createElement('a');
				h.id = nombre;
				h.setAttribute('class','button');
				h.setAttribute('style','padding:0px 1px');
				h.innerHTML = 'V';
				h.addEventListener("click",function(){DW(this.id)},false);
				p.appendChild(h);
			}
			
			p = $("Mod_"+i);
			h = document.createElement('a');
			h.id = nombre;
			h.setAttribute('class','button');
			h.setAttribute('style','padding:0px 1px');
			h.innerHTML = 'Mod';
			h.addEventListener("click",function(){mod(this.id)},false);
			p.appendChild(h);
			
			p = $("Del_"+i);
			h = document.createElement('a');
			h.id = nombre;
			h.setAttribute('class','button');
			h.setAttribute('style','padding:0px 1px');
			h.innerHTML = 'Del';
			h.addEventListener("click",function(){del(this.id)},false);
			p.appendChild(h);
			
			var onoff = "";
			if(getVar(nombre+"_on")==1){
				onoff = 'On';
			}else{
				onoff = 'Off';
			}
			
			p = $("On_Off_"+i);
			h = document.createElement('a');
			h.id = nombre;
			h.setAttribute('class','button');
			h.setAttribute('style','padding:0px 1px');
			h.innerHTML = onoff;
			h.addEventListener("click",function(){On_Off(this.id)},false);
			p.appendChild(h);
			
		}
	}else{
		$("dealers").innerHTML  = "No Deals [Click in 'New Deal' to add one deal]";
	}
}

function num_to_func(num){
	switch(num){
		case "0": return "T"; break;
		case "1": return "S"; break;
		case "2": return "d"; break;
	}
        return "d";  
}


p = $("ResourceDealer");
h = document.createElement('div');
h.id = "dealer_inform";
h.setAttribute('style','text-align:left;position:relative;clear:both;float:left;border-color:#C9A584 #5D4C2F #5D4C2F #C9A584;border-style:double;border-width:3px;background:url(http://img156.imageshack.us/img156/8512/fondoz.jpg) repeat;text-decoration:none;width:100%;color:#612d04;font:normal 12px Arial, Helvetica, sans-serif;');
n1 = document.createElement('table');
n1.id = "tit_inform";
n1.setAttribute('align','left');
n1.setAttribute('width','100%');
n1.setAttribute('style','margin:10px 0px 0px 0px;');
n1.innerHTML = '<tr><td align="left"><h3 style="margin:0px 0px 0px 10px;font-weight:bold;">Inform:</h3></td><td align="right" id="tit_inform_bot" ></td></tr>';
h.appendChild(n1);
n2 = document.createElement('table');
n2.id = "dealer";
n2.setAttribute('align','left');
n2.setAttribute('style','margin:10px 10px 10px 10px;');
h.appendChild(n2);
p.appendChild(h);

$("dealer").innerHTML = getVar("dealer_inform","");

p = $("tit_inform_bot");
h = document.createElement('a');
h.setAttribute('style','margin:5px 5px 5px 5px;');
h.setAttribute('class','button');
h.innerHTML = "Clear";
h.addEventListener("click",function(){Clear()},false);
p.appendChild(h);

function UP(nombre){
	var dealer_names = getVar("dealer_names","");
	var dealer_name = dealer_names.split('|');
	for (var i = 0; i < dealer_name.length-1; i++) {
		if(dealer_name[i]==nombre)	break;	
	}
	var aux = dealer_name[i-1];
	dealer_name[i-1] = dealer_name[i];
	dealer_name[i] = aux;
	dealer_names = "";
	for (var i = 0; i < dealer_name.length-1; i++) {
		dealer_names += dealer_name[i]+"|";	
	}
	setVar("dealer_names",dealer_names);
	cargar_dealers();
}

function DW(nombre){
	var dealer_names = getVar("dealer_names","");
	var dealer_name = dealer_names.split('|');
	for (var i = 0; i < dealer_name.length-1; i++) {
		if(dealer_name[i]==nombre)	break;	
	}
	var aux = dealer_name[i+1];
	dealer_name[i+1] = dealer_name[i];
	dealer_name[i] = aux;
	dealer_names = "";
	for (var i = 0; i < dealer_name.length-1; i++) {
		dealer_names += dealer_name[i]+"|";	
	}
	setVar("dealer_names",dealer_names);
	cargar_dealers();
}

function mod(nombre){
	$("form_dealer").style.display="inline";
	$("f_name").value = nombre;
	$("f_resource").value = getVar(nombre+"_resource");
	$("f_minimo").value = getVar(nombre+"_minimo");
	$("f_maximo").value = getVar(nombre+"_maximo");
	$("f_min_dep").value = getVar(nombre+"_min_dep");
	$("f_repeat").value = getVar(nombre+"_repeat");
	var cres = getVar(nombre+"_cresource").split("|");
	for (var j = 0; j < cityId.length; j++) {
		$("f_func_"+j).value = cres[j];
	}
}

function del(nombre){
	var dealer_names = getVar("dealer_names","");
	var dealer_name = dealer_names.split('|');
	dealer_names = "";
	for (var i = 0; i < dealer_name.length-1; i++) {
		if(dealer_name[i]!=nombre)	dealer_names += dealer_name[i]+"|";	
	}
	setVar("dealer_names",dealer_names);
	cargar_dealers();
}

function On_Off(nombre){
	if(getVar(nombre+"_on")==1){
		setVar(nombre+"_on",0);
	}else{
		setVar(nombre+"_on",1);
	}
	cargar_dealers();
}

function Clear(){
	$("dealer").innerHTML = "";
	setVar("dealer_inform","");
}

p = $("ResourceDealer");
h = document.createElement('div');
h.id = "ResourceDealerFooter";
h.setAttribute('style','position:relative;clear:both;float:left;text-decoration:none;width:100%;height:15px');
p.appendChild(h);

p = $("cel_menu_2");
h = document.createElement('a');
h.setAttribute('class','button');
h.innerHTML = 'New Deal';
h.addEventListener("click",function(){NewDeal()},false);
p.appendChild(h);

function NewDeal(){
	$("form_dealer").style.display="inline";
}

p = $("cel_menu_3");
h = document.createElement('a');
h.setAttribute('class','button');
h.id = "b_s_h_deals";
if(getVar("s_h_deals")==0){
	h.innerHTML = 'Show Deals';
	$("dealers").style.display="none";
}else{
	h.innerHTML = 'Hide Deals';
	$("dealers").style.display="inline";
}
h.addEventListener("click",function(){f_s_h_deals();},false);
p.appendChild(h);

function f_s_h_deals(){
	if(getVar("s_h_deals")==1){
		setVar("s_h_deals",0);
		$("b_s_h_deals").innerHTML = 'Show Deals';
		$("dealers").style.display="none";
	}else{
		setVar("s_h_deals",1);
		$("b_s_h_deals").innerHTML = 'Hide Deals';
		$("dealers").style.display="inline";
	}
}

p = $("cel_menu_4");
h = document.createElement('a');
h.setAttribute('class','button');
h.id = "b_s_h_inform";
if(getVar("s_h_inform")==0){
	h.innerHTML = 'Show Inform';
	$("dealer_inform").style.display="none";
}else{
	h.innerHTML = 'Hide Inform';
	$("dealer_inform").style.display="inline";
}
h.addEventListener("click",function(){f_s_h_inform();},false);
p.appendChild(h);

function f_s_h_inform(){
	if(getVar("s_h_inform")==1){
		setVar("s_h_inform",0);
		$("b_s_h_inform").innerHTML = 'Show Inform';
		$("dealer_inform").style.display="none";
	}else{
		setVar("s_h_inform",1);
		$("b_s_h_inform").innerHTML = 'Hide Inform';
		$("dealer_inform").style.display="inline";
	}
}

p = $("cel_menu_5");
h = document.createElement('a');
h.setAttribute('class','button');
h.id = "b_s_h_image";
if(getVar("s_h_image")==0){
	h.innerHTML = 'Show Image';
}else{
	h.innerHTML = 'Hide Image';
}
h.addEventListener("click",function(){f_s_h_image();},false);
p.appendChild(h);

function f_s_h_image(){
	if(getVar("s_h_image")==1){
		setVar("s_h_image",0);
		$("b_s_h_image").innerHTML = 'Show Image';
	}else{
		setVar("s_h_image",1);
		$("b_s_h_image").innerHTML = 'Hide Image';
	}
}

function EmpireBoardStyle(){
	if($("EmpireBoard")!=null){
		$("EmpireBoard").setAttribute('style','clear:both;');
	}
}
setTimeout(EmpireBoardStyle,100);

var momentoActual = new Date();
var m_ant = parseInt(momentoActual/(1000*60));

PT();
function PT(){
    PT2();
    setTimeout(PT,40*1000); 	
}

function PT2(){
	var momentoActual = new Date();
	var m = parseInt(momentoActual/(1000*60))
   if(m!=m_ant){
		
		if(name!=undefined){
			var fi = getVar(name+"_fecha");
			if(m-fi>2){
				salida_err();
				name = "";
			}
		}
	
		var dealer_names = getVar("dealer_names","");
		var dealer_name = dealer_names.split('|');
		for (var i = 0; i < dealer_name.length-1; i++) {
			var nombre=dealer_name[i];
			if(getVar(nombre+"_on")==1){
				var f = getVar(nombre+"_fecha");
				if(f==m){
					if(ocupado==0){
						ocupado=1;
						dealer(nombre);
					}
				}
				if((f<m)&&(name!=nombre)){
					setVar(nombre+"_fecha",m+1);
					setVar(nombre+"_estado","");
					cargar_dealers();
				}
			}
		}
		m_ant=m;
	} 	
}

function $(id){
	return document.getElementById(id);
}

function get(url, cb) {
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(xhr) { cb(xhr.responseText) }
    })
}

function post(url, data, cb) {
    GM_xmlhttpRequest({
        method: "POST",
        url: url,
        headers:{'Content-type':'application/x-www-form-urlencoded'},
        data:encodeURI(data),
        onload: function(xhr) { cb(xhr.responseText); }
    });
}

function rec_arbol_1(nodeRef){ 
	for (var i = 0; i < nodeRef.childNodes.length; i++) {
		if (nodeRef.childNodes[i].nodeType == document.ELEMENT_NODE) {
			var name = nodeRef.childNodes[i].getAttribute('name');
			if (name=="actionRequest"){
				actionRequest = nodeRef.childNodes[i].value;
			}
			rec_arbol_1(nodeRef.childNodes[i]);
		}
	}
}

function rec_arbol_2(nodeRef){ 
	for (var i = 0; i < nodeRef.childNodes.length; i++) {
		if (nodeRef.childNodes[i].nodeType == document.ELEMENT_NODE) {
			var tag = nodeRef.childNodes[i].tagName;
			var cls = nodeRef.childNodes[i].className; 
			if ((tag=="OPTION")&&((cls=="coords")||(cls.substring(0,cls.length-1)=="tradegood"))){
				cityId[ind_cityId] = nodeRef.childNodes[i].value;
				cityNombre[ind_cityId] = nodeRef.childNodes[i].innerHTML;
				if(cls=="coords"){
					cityRec[ind_cityId] = nodeRef.childNodes[i].title.substr(nodeRef.childNodes[i].title.lastIndexOf(" ")+1);
					for (var j = 0; j < resourcetrad.length; j++) {
						if(resourcetrad[j].toUpperCase() == cityRec[ind_cityId].toUpperCase()){
							cityRec[ind_cityId] = num_to_resource(j); break;
						}
					}
				}else{
					switch(cls){
						case "tradegood1": cityRec[ind_cityId] = "wine"; break;
						case "tradegood2": cityRec[ind_cityId] = "marble"; break;
						case "tradegood3": cityRec[ind_cityId] = "crystal"; break;
						case "tradegood4": cityRec[ind_cityId] = "sulfur"; break;
					}
				}
				ind_cityId++;
			}
			rec_arbol_2(nodeRef.childNodes[i]);
		}
	}
}

function num_to_resource(num){
	switch(num){
		case 0: return "wood"; break;
		case 1: return "wine"; break;
		case 2: return "marble"; break;
		case 3: return "crystal"; break;
		case 4: return "sulfur"; break;
	}  
}

function rec_arbol_3(nodeRef,valor){ 
	for (var i = 0; i < nodeRef.childNodes.length; i++) {
		if (nodeRef.childNodes[i].nodeType == document.ELEMENT_NODE) {
			var name = nodeRef.childNodes[i].getAttribute('name');
			if (name=="actionRequest"){
				nodeRef.childNodes[i].value = valor;
			}
			rec_arbol_3(nodeRef.childNodes[i],valor);
		}
	}
}

function dealer(nombre){
	cresource = new Array();
	xresource = new Array();
	mresource = new Array();
	bresource = new Array();
	mate_barco = new Array();
	dest_barco = new Array();
	actionRequest = 0;
	accion = new Array();
	orig = new Array();
	dest = new Array();
	cant = new Array();
	error = new Array();
	real = new Array();
	ind_accion = 0;
	rec_cityId = 0;
	rec_accion = 0;
	barcos = 0;
	
	name = nombre;
	setVar(nombre+"_estado","Procesing...");
	cargar_dealers();
	resource = getVar(nombre+"_resource");
	minimo =  parseInt(getVar(nombre+"_minimo"));
	maximo =  parseInt(getVar(nombre+"_maximo"));
	min_dep =  parseInt(getVar(nombre+"_min_dep"));
	cresource = getVar(nombre+"_cresource").split("|");
	for (var i = 0; i < cresource.length; i++) {
		cresource[i] = parseInt(cresource[i]);
	}
	cresource.pop();
	
	if(getVar("s_h_image")==1){$("img_"+resource).style.display="inline";}
	transport();
}

function transport(){
	var data = "view=merchantNavy";
	post(baseURL,data,enviar0);	
}

function enviar0(text){
	barcos = obt_barcos(text);
	if((barcos==0)||((barcos*cap)<minimo)){
		var actionRequest = obt_actionRequest(text);
		salida("");
	}else{
		mate_barco = obt_b1(text);
		dest_barco = obt_b2(text);
		var orig_barco = obt_b3(text);
		var reto_barco = obt_b4(text);
		for (var i = 0; i < reto_barco.length-1; i++) {
			if(reto_barco[i]==1){
				dest_barco[i]=orig_barco[i];
			}
		}	
		var actionRequest = obt_actionRequest(text);
		var data = "action=header&cityId="+cityId[rec_cityId]+"&function=changeCurrentCity&oldView=city&actionRequest="+actionRequest;
		post(baseURL,data,rec_info);
	}
}

function rec_info(text){
	mresource[rec_cityId] = obt_mresource(text);
	islaId[rec_cityId] = obt_islaId(text);
	xresource[rec_cityId] = obt_resource(text);
	if(cresource[rec_cityId] == 0){
		for (var i = 0; i < dest_barco.length-1; i++) {
			if(dest_barco[i]==cityId[rec_cityId]){
				xresource[rec_cityId]+=mate_barco[i];
			}
		}
	}
	if(cresource[rec_cityId] == 1){
		if(xresource[rec_cityId]>min_dep){
			xresource[rec_cityId]-=min_dep;
		}else{
			xresource[rec_cityId]=0;
		}
	}
	xresource[rec_cityId] = parseInt(xresource[rec_cityId]/cap);
	rec_cityId++;
	var actionRequest = obt_actionRequest(text);
	if(rec_cityId<ind_cityId){
		var data = "action=header&cityId="+cityId[rec_cityId]+"&function=changeCurrentCity&oldView=city&actionRequest="+actionRequest;
		post(baseURL,data,rec_info);
	}else{
		calcular(text);
	}
}

function calcular(text){
	
	/*
	var str_cresource = "";
	for (var i = 0; i < cresource.length; i++) {
		str_cresource += cresource[i]+"|";
	}
	alert(str_cresource);
	*/
	
		/*
	var str_xresource = "";
	for (var i = 0; i < xresource.length; i++) {
		str_xresource += xresource[i]+"|";
	}
	alert(str_xresource);
	*/
	
	var tot_rep = 0;
	for (var i = 0; i < xresource.length; i++) {
		if(cresource[i]==1)tot_rep +=xresource[i];
	}
	
	if(tot_rep>barcos)tot_rep=barcos;
	var max_cap = parseInt(maximo/cap);
	if(tot_rep>max_cap)tot_rep=max_cap;
	if((tot_rep*cap<minimo)||(tot_rep==0)){
		salida("");
		return null;
	}
	
	var ind = -2;
	var num_rep = 0;
	var num_eq = 0;
	
	while (ind!=-1){
		ind = -1;
		num_rep = 0;
		num_eq = tot_rep;
		for (var i = 0; i < xresource.length; i++) {
			if(cresource[i]==0){
				num_rep++; 
				num_eq = (parseInt(num_eq) + parseInt(xresource[i]));
			}
		}
		
		num_eq = parseInt(num_eq/num_rep);
		
		ind = -1;
		for (var i = 0; i < xresource.length; i++) {
			if((cresource[i]==0)&&(xresource[i]>num_eq)){
				if(ind==-1){
					ind=i;
				}else if(xresource[i]>xresource[ind]){
					ind=i;
				}
			}
		}
		if(ind!=-1){cresource[ind]=3;bresource[ind]=0;}
	}
	
	var arep;
	var arep_ant = 0;
	var fin = false;
	while(!fin){
		fin = true;
		arep = 0;
		for (var i = 0; i < cresource.length; i++) {
			switch(cresource[i]){
				case 0: 
					if(num_eq>mresource[i]){
						arep += num_eq-mresource[i]+1;
						bresource[i]=mresource[i]-xresource[i]-1;
						cresource[i]=4;
						fin = false;
					}else{
						bresource[i]=num_eq-xresource[i];
					}
				break;
				case 1: bresource[i]=xresource[i]; break;
				case 2: bresource[i]=0; break;
				case 3:
					if(num_eq>mresource[i]){
						arep += num_eq-mresource[i]+1;
						bresource[i]=mresource[i]-xresource[i]-1;
						cresource[i]=4;
						fin = false;
					}else{
						bresource[i]+=arep_ant;
						if(bresource[i]>0){cresource[i]=0;}
					}						
				break;
				//case 4: alert(i+" case 4"); break;
			}
		}
		num_rep = 0;
		for (var i = 0; i < xresource.length; i++) {
			if((cresource[i]==0)||(cresource[i]==3)){
				num_rep++; 
			}
		}
		arep_ant = parseInt(arep/num_rep);
		num_eq += parseInt(arep/num_rep);
	}
	
	for (var i = 0; i < xresource.length; i++) {
		if(cresource[i]==4){cresource[i]=0;}
		if(cresource[i]==3){cresource[i]=2;bresource[i]=0;}
	}
		
	/*
	var str_bresource = "";
	for (var i = 0; i < bresource.length; i++) {
		str_bresource += bresource[i]+"|";
	}
	alert(str_bresource);
	*/
	
	fin = false;
	var ant_orig = -1;
	
	while(!fin){
		for (var i = 0; i < bresource.length; i++) {
			if((cresource[i]==1)&&(bresource[i]>0)){
				orig[ind_accion]=i;
				break;
			}
		}
		
		if(orig[ind_accion]!=ant_orig){
			ant_orig = orig[ind_accion];
			accion[ind_accion]="cc";
			ind_accion++;
			orig[ind_accion]=orig[ind_accion-1];
		}
		accion[ind_accion]="rp";
				
		for (var i = 0; i < bresource.length; i++) {
			if((cresource[i]==0)&&(bresource[i]>0)){
				dest[ind_accion]=i;
				break;
			}
		}
		
		if(bresource[orig[ind_accion]]>=bresource[dest[ind_accion]]){
			bresource[orig[ind_accion]] = bresource[orig[ind_accion]] - bresource[dest[ind_accion]];
			cant[ind_accion] = bresource[dest[ind_accion]];
			bresource[dest[ind_accion]] = 0;
		}else{
			bresource[dest[ind_accion]] = bresource[dest[ind_accion]] - bresource[orig[ind_accion]];
			cant[ind_accion] = bresource[orig[ind_accion]];
			bresource[orig[ind_accion]] = 0;
		}
		
		real[rec_accion-1] = 0;
		
		ind_accion++;
		
		fin = true;
		for (var i = 0; i < bresource.length; i++) {
			if((cresource[i]==0)&&(bresource[i]>0)){
				fin = false;
				break;
			}
		}
	}
	
	/*
	for (var i = 0; i < accion.length; i++) {
		switch(accion[i]){
			case "cc": alert(i+": "+accion[i]+" "+orig[i]); break;
			case "rp": alert(i+": "+accion[i]+" "+orig[i]+"-->"+dest[i]+"  cant:"+cant[i]); break;
		}
	}
	*/
	
	//informar(text);
	proc_accion(text);
}

function proc_accion(text){
	error[rec_accion-1] = obt_error(text);
	rec_accion++;
	var actionRequest = obt_actionRequest(text);
	
	while (((cant[rec_accion-1]==0)||(orig[rec_accion-1]==undefined)||((accion[rec_accion-1]=="rp")&&(dest[rec_accion-1]==undefined)))&&(rec_accion<=ind_accion))rec_accion++;
	
	if(rec_accion<=ind_accion){
		var data = "";
		switch(accion[rec_accion-1]){
			case "cc": 
				data = "action=header&cityId="+cityId[orig[rec_accion-1]]+"&function=changeCurrentCity&oldView=city&actionRequest="+actionRequest;
			break;
			
			case "rp": 
				switch(resource){//wood,wine,marble,crystal,sulfur 
					case "wood":    data = "action=transportOperations&function=loadTransportersWithFreight&actionRequest="+actionRequest+"&id="+islaId[dest[rec_accion-1]]+"&destinationCityId="+cityId[dest[rec_accion-1]]+"&cargo_resource="+(cant[rec_accion-1])*cap+"&cargo_tradegood1=0&cargo_tradegood2=0&cargo_tradegood3=0&cargo_tradegood4=0&transporters="+cant[rec_accion-1]; break;
					case "wine":    data = "action=transportOperations&function=loadTransportersWithFreight&actionRequest="+actionRequest+"&id="+islaId[dest[rec_accion-1]]+"&destinationCityId="+cityId[dest[rec_accion-1]]+"&cargo_resource=0&cargo_tradegood1="+(cant[rec_accion-1])*cap+"&cargo_tradegood2=0&cargo_tradegood3=0&cargo_tradegood4=0&transporters="+cant[rec_accion-1]; break;
					case "marble":  data = "action=transportOperations&function=loadTransportersWithFreight&actionRequest="+actionRequest+"&id="+islaId[dest[rec_accion-1]]+"&destinationCityId="+cityId[dest[rec_accion-1]]+"&cargo_resource=0&cargo_tradegood1=0&cargo_tradegood2="+(cant[rec_accion-1])*cap+"&cargo_tradegood3=0&cargo_tradegood4=0&transporters="+cant[rec_accion-1]; break;
					case "crystal": data = "action=transportOperations&function=loadTransportersWithFreight&actionRequest="+actionRequest+"&id="+islaId[dest[rec_accion-1]]+"&destinationCityId="+cityId[dest[rec_accion-1]]+"&cargo_resource=0&cargo_tradegood1=0&cargo_tradegood2=0&cargo_tradegood3="+(cant[rec_accion-1])*cap+"&cargo_tradegood4=0&transporters="+cant[rec_accion-1]; break;
					case "sulfur":  data = "action=transportOperations&function=loadTransportersWithFreight&actionRequest="+actionRequest+"&id="+islaId[dest[rec_accion-1]]+"&destinationCityId="+cityId[dest[rec_accion-1]]+"&cargo_resource=0&cargo_tradegood1=0&cargo_tradegood2=0&cargo_tradegood3=0&cargo_tradegood4="+(cant[rec_accion-1])*cap+"&transporters="+cant[rec_accion-1]; break;					
				}
			break;
		}
		real[rec_accion-1] = 1;
		post(baseURL,data,proc_accion);
	}else{
		informar(text);
	}
}

function informar(text){
	var str = "";
	for (var i = 0; i < accion.length; i++) {
		if(real[i]==1){
			switch(accion[i]){
				case "rp":
					str += "<tr><td></td><td align='left'>"+cant[i]*cap+" of "+ resource +" from '"+cityNombre[orig[i]]+"' to '"+cityNombre[dest[i]]+"'";
					if((error[i]!=undefined)&&(error[i]!="")){str += " ==> ERROR: "+error[i];}
					str += "</td></tr>"; 
				break;
			}
		}
	}
	salida(str);
}

function salida(msg){
	$("img_"+resource).style.display="none";
	if (msg == ""){
		$("dealer").innerHTML = "<tr><td align='left'>"+FechaActual()+" ==> </td><td align='left'> No '"+name+"' deals.</td></tr>"+$("dealer").innerHTML;
	}else{
		$("dealer").innerHTML = "<tr><td align='left'>"+FechaActual()+" ==> </td><td align='left'> '"+name+"' deals:</td></tr>"+msg+$("dealer").innerHTML;
	}
	setVar("dealer_inform",$("dealer").innerHTML);
	var repeat = getVar(name+"_repeat");
	var momentoActual = new Date();
	var fecha = parseInt(momentoActual/(1000*60))+repeat;
	setVar(name+"_fecha",fecha);
	setVar(name+"_estado","");
	cargar_dealers();
	ocupado=0;
}

function salida_err(){
	$("img_"+resource).style.display="none";
	$("dealer").innerHTML = "<tr><td align='left'>"+FechaActual()+" ==> </td><td align='left'> '"+name+"' deals ABORTED.</td></tr>"+$("dealer").innerHTML;
	setVar("dealer_inform",$("dealer").innerHTML);
	//var momentoActual = new Date();
	//var fecha = parseInt(momentoActual/(1000*60))+1;
	//setVar(name+"_fecha",fecha);
	//setVar(name+"_estado","");
	//cargar_dealers();
	ocupado=0;
}

function obt_actionRequest(text){
	var ini1 =  text.indexOf('name="actionRequest"',0);
	var ini2 = text.indexOf('value="',ini1);
	ini2 = ini2 + 7;
	var fin = text.indexOf('"',ini2);
	var act_req = text.substring(ini2,fin); 
	rec_arbol_3($("changeCityForm"),act_req);
	return act_req;
}

function obt_resource(text){
	var str = "value_" + resource;
	var ini1 =  text.indexOf(str,0);
	var ini2 = text.indexOf('>',ini1);
	ini2 = ini2 + 1;
	var fin = text.indexOf('<',ini2);
	return parseInt((text.substring(ini2,fin).replace(",","").replace(",","").replace(/k\s*$/,'000')));
	//return parseInt((text.substring(ini2,fin).replace(",","").replace(",","").replace(/k\s*$/,'000'))/cap);
}

function obt_cresource(text){
	var ini1 =  text.indexOf('= tradegoodCounter.currentRes',0);
	var ini2 = text.indexOf('.',ini1-10);
	ini2 = ini2 + 1;
	var fin = text.indexOf(' =',ini2);
	if (text.substring(ini2,fin)==resource){
		return 1;
	}else{
		return 0;
	};
}

function obt_islaId(text){
	var ini1 =  text.indexOf('class="viewIsland"',0);
	var ini2 = text.indexOf('id=',ini1);
	ini2 = ini2 + 3;
	var fin = text.indexOf('"',ini2);
	return text.substring(ini2,fin);
}

function obt_cityNombre(text){
	var ini1 =  text.indexOf('class="city"',0);
	var ini2 = text.indexOf('>',ini1);
	ini2 = ini2 + 1;
	var fin = text.indexOf('<',ini2);
	return text.substring(ini2,fin);
}

function obt_barcos(text){
	var ini1 = text.indexOf('li class="transporters"',0);
	var ini2 = text.indexOf('"accountTransporter">',ini1);
	ini2 = ini2 + 21;
	var fin = text.indexOf(' ',ini2);
	return parseInt(text.substring(ini2,fin));
}

function obt_error(text){
	var ini1 =  text.indexOf('class="error"',0);
	if(ini1==-1) return "";
	var ini2 =  text.indexOf('<li>',ini1);
	ini2 += 4;
	var fin = text.indexOf('</li>',ini2);
	return text.substring(ini2,fin);
}

function obt_mresource(text){
	var ini1 =  text.indexOf("maxCapacity",0);
	var str = resource+": ";
	var ini2 = text.indexOf(resource,ini1);
	ini2 = ini2 + str.length;
	var str2 = ',';
	if (resource=="sulfur") str2 = '\t';
	var fin = text.indexOf(str2,ini2);
	return parseInt((text.substring(ini2,fin))/cap);
}

function obt_b1(text){
	var ini = 0;
	var ret = new Array;
	var ind = 0;
	while (ini!=-1){
		var ini1 =  text.indexOf("payload",ini);		
		if(ini1!=-1){ini=ini1+30;}else{ini=-1;}
		if (resource=="crystal"){
			var cmp = "glass";
		}else{
			var cmp = resource;
		}
		var ini2 = text.indexOf(cmp,ini1);
		var aux = text.indexOf("space",ini1);
		if(ini2<aux){
			var ini3 = text.indexOf("title=\"",ini2);
			ini3 = ini3 + 7;
			var fin = text.indexOf(" ",ini3);
			ret[ind] = parseInt((text.substring(ini3,fin).replace(",","").replace(",","").replace(/k\s*$/,'000')));
		}else{
			ret[ind] = 0;
		}
		ind++;
	}
	return ret;
}

function obt_b2(text){
	var ini = 0;
	var ret = new Array;
	var ind = 0;
	while (ini!=-1){
		var str = "<td class=\"target\"><a href=\"?view=island&cityId=";
		var ini1 =  text.indexOf(str,ini);		
		if(ini1!=-1){ini=ini1+str.length;}else{ini=-1;}
		ini1 += str.length; 
		var fin = text.indexOf("\"",ini1);
		ret[ind] = text.substring(ini1,fin);
		ind++;
	}
	return ret;
}


function obt_b3(text){
	var ini = 0;
	var ret = new Array;
	var ind = 0;
	while (ini!=-1){
		var str = "<td class=\"source\"><a href=\"?view=island&cityId=";
		var ini1 =  text.indexOf(str,ini);		
		if(ini1!=-1){ini=ini1+str.length;}else{ini=-1;}
		ini1 += str.length; 
		var fin = text.indexOf("\"",ini1);
		ret[ind] = text.substring(ini1,fin);
		ind++;
	}
	return ret;
}

function obt_b4(text){
	var ini = 0;
	var ret = new Array;
	var ind = 0;
	while (ini!=-1){
		var str1 = "<td class=\"source\"><a href=\"?view=island&cityId=";
		var pos1 =  text.indexOf(str1,ini);
		var str2 = "<td class=\"actions\"></td></tr><tr>";
		var pos2 =  text.indexOf(str2,ini);
		var pos3 =  text.indexOf("payload",ini);
		if(pos1!=-1){
			ini=pos3+8;
			if((pos1<pos2)&&(pos2<pos3)){
				ret[ind] = 1;
			}else{
				ret[ind] = 0;
			}
		}else{
			ini=-1;
			ret[ind] = 0;
		}
		ind++;
	}
	return ret;
}

function FechaActual(){
	var momentoActual = new Date();
	var y = momentoActual.getFullYear();
	var n = momentoActual.getMonth()+1;
	var d = momentoActual.getDate();
	var h = momentoActual.getHours();
	var m = momentoActual.getMinutes();
	return a0(d)+"/"+a0(n)+"/"+a0(y)+" "+a0(h)+":"+a0(m);
}

function a0(str){
	var out = str.toString();
	if (out.length==1) {
		return "0"+out;
	}else{
		return str;
	}
}

function Fecha(time){
	var momentoActual = new Date();
	momentoActual.setTime(time);
	var y = momentoActual.getFullYear();
	var n = momentoActual.getMonth()+1;
	var d = momentoActual.getDate();
	var h = momentoActual.getHours();
	var m = momentoActual.getMinutes();
	return a0(d)+"/"+a0(n)+"/"+a0(y)+" "+a0(h)+":"+a0(m);
}


function getVar(varname, vardefault) {
  var res = GM_getValue(document.location.host+varname);
  if (res == undefined) {
    return vardefault;
  }
  return res;
}

function setVar(varname, varvalue) {
  GM_setValue(document.location.host+varname, varvalue);