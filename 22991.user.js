// ==UserScript==
// @name           doominsert
// @namespace      http://qqklan.forogratis.es
// @include        http://*game*.*/*
// ==/UserScript==



Metal = 'Metal:';
Cristal = 'Cristal:';
Deuterio = 'Deuterio:';
Requiere = 'Requiere';
Resto = 'Resto:';

function number_format(n) {
  var arr=new Array('0'), i=0; 
  while (n>0) 
    {arr[i]=''+n%1000; n=Math.floor(n/1000); i++;}
  arr=arr.reverse();
  for (var i in arr) if (i>0) //padding zeros
    while (arr[i].length<3) arr[i]='0'+arr[i];
  return arr.join();
}

(function() {
//General Enhacement
 var inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++)
  {
    if (inputs[i].getAttribute('type') == null || inputs[i].getAttribute('type') == 'text' ) //de tipo texto
    {
        var a = document.createElement("a");
        a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs[i].name+"')[0];texto.value=999;var evt=document.createEvent('KeyboardEvent');evt.initKeyEvent('keyup', true, false, null, false, false, false, false, 0, 32);texto.dispatchEvent(evt);texto.onChange();");
        a.appendChild(document.createTextNode('*'));
        a.innerHTML = "&infin;";
        inputs[i].parentNode.insertBefore(a,inputs[i].nextSibling);

        var a = document.createElement("a");
        a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs[i].name+"')[0];texto.value=0;var evt=document.createEvent('KeyboardEvent');evt.initKeyEvent('keyup', true, false, null, false, false, false, false, 0, 32);texto.dispatchEvent(evt);texto.onChange();");
        a.appendChild(document.createTextNode("0"));
        a.innerHTML = "&bull;";
        //a.innerHTML = "0";
        inputs[i].parentNode.insertBefore(a,inputs[i].nextSibling); 

        var a = document.createElement("a");
        a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs[i].name+"')[0];if (texto.value>0){ texto.value--;var evt=document.createEvent('KeyboardEvent');evt.initKeyEvent('keyup', true, false, null, false, false, false, false, 0, 32);texto.dispatchEvent(evt);}texto.onChange();");
        a.appendChild(document.createTextNode('-'));
        a.innerHTML = "&minus;";
        inputs[i].parentNode.insertBefore(a,inputs[i].nextSibling);

        var a = document.createElement("a");
        a.setAttribute("href", "javascript:var texto=document.getElementsByName('"+inputs[i].name+"')[0];texto.value++;var evt=document.createEvent('KeyboardEvent');evt.initKeyEvent('keyup', true, false, null, false, false, false, false, 0, 32);texto.dispatchEvent(evt);texto.onChange();");
        a.appendChild(document.createTextNode('+'));
        inputs[i].parentNode.insertBefore(a,inputs[i].nextSibling);




    }
  }
  var tablas = document.getElementsByTagName('table');
  //for (var i = 0; i < tablas.length; i++)
  //{
  //  if (tablas[i].getAttribute('width') == '519' || tablas[i].getAttribute('width') == '569'|| tablas[i].getAttribute('width') == '530')
  //     tablas[i].setAttribute('width','100%');
  //}
  var imagenes = document.getElementsByTagName('img');
  for (var i = 0; i < imagenes.length; i++)
  {
    if (imagenes[i].getAttribute('width') == '50' || imagenes[i].getAttribute('width') == '30')
    {
       imagenes[i].setAttribute('width','20');
       imagenes[i].setAttribute('height','20');
    }
    else if (imagenes[i].getAttribute('width') == '120')
    {
       imagenes[i].setAttribute('width','60');
       imagenes[i].setAttribute('height','60');
    }
  }

//RS

var hrefer = self.location.href;
	//Lets start!
	if(hrefer.indexOf('techtree.php')!=-1){
		//... Esto es enteramente manual... xP
		color = "#8080C0";
		var tdtg = document.getElementsByTagName('td');
		tdtg[23].style.color = color;
		tdtg[24].style.color = color;
		tdtg[53].style.color = color;
		tdtg[54].style.color = color;
		tdtg[85].style.color = color;
		tdtg[86].style.color = color;
		tdtg[113].style.color = color;
		tdtg[114].style.color = color;
		tdtg[135].style.color = color;
		tdtg[136].style.color = color;
	}else
	if (location.pathname.search('b_building.php') != -1 || location.pathname.search('buildings.php') != -1) {
		var b = 0;
		//obtenemos los recursos
		var tds = document.getElementsByTagName('td');
		var res1 = tds[18].innerHTML.replace('.','','g');
		var res2 = tds[19].innerHTML.replace('.','','g');
		var res3 = tds[20].innerHTML.replace('.','','g');
		//ahora usamos los <b>
		var td = document.getElementsByTagName('td');
		for (var i = td.length - 1; i >= 0; i--) {
			if(td[i].innerHTML.indexOf(Requiere)!=-1){
				var text = '<font color="#7F7F7F">'+Resto+' ';
				//Comprobamos si se requieren los diferentes recursos
				if(td[i].getElementsByTagName('b')[b]&&td[i].innerHTML.indexOf(Metal)!=-1){
					var b1 = td[i].getElementsByTagName('b')[b].innerHTML.replace('.','','g');
					if(eval(res1+'<'+b1)){
					  var number = number_format(eval(b1+'-'+res1));
					  td[i].getElementsByTagName('b')[b].style.color = 'red';
					  td[i].getElementsByTagName('b')[b].innerHTML = '<t title="-'+number+'">' +td[i].getElementsByTagName('b')[b].innerHTML+ '</t>';
					  text += Metal+' <b style="color:#7F5F60">-'+number+'</b> ';
					}else{
					  var number = number_format(eval(res1+'-'+b1));
					  td[i].getElementsByTagName('b')[b].style.color = 'lime';
					  td[i].getElementsByTagName('b')[b].innerHTML = '<t title="+'+number+'">' +td[i].getElementsByTagName('b')[b].innerHTML+ '</t>';
					  text += Metal+' <b style="color:#5F7F6C">'+number+'</b> ';
					}
					b++;
				}
				if(td[i].getElementsByTagName('b')[b]&&td[i].innerHTML.indexOf(Cristal)!=-1){
					var b2 = td[i].getElementsByTagName('b')[b].innerHTML.replace('.','','g');
					if(eval(res2+'<'+b2)){
					  var number = number_format(eval(b2+'-'+res2));
					  td[i].getElementsByTagName('b')[b].style.color = 'red';
					  td[i].getElementsByTagName('b')[b].innerHTML = '<t title="-'+number+'">' +td[i].getElementsByTagName('b')[b].innerHTML+ '</t>';
					  text += Cristal+' <b style="color:#7F5F60">-'+number+'</b> ';
					}else{
					  var number = number_format(eval(res2+'-'+b2));
					  td[i].getElementsByTagName('b')[b].style.color = 'lime';
					  td[i].getElementsByTagName('b')[b].innerHTML = '<t title="+'+number+'">' +td[i].getElementsByTagName('b')[b].innerHTML+ '</t>';
					  text += Cristal+' <b style="color:#5F7F6C">'+number+'</b> ';
					}
					b++;
				}
				if(td[i].getElementsByTagName('b')[b]&&td[i].innerHTML.indexOf(Deuterio)!=-1){
					var b3 = td[i].getElementsByTagName('b')[b].innerHTML.replace('.','','g');
					if(eval(res3+'<'+b3)){
					  var number = number_format(eval(b3+'-'+res3));
					  td[i].getElementsByTagName('b')[b].style.color = 'red';
					  td[i].getElementsByTagName('b')[b].innerHTML = '<t title="-'+number+'">' +td[i].getElementsByTagName('b')[b].innerHTML+ '</t>';
					  text += Deuterio+' <b style="color:#7F5F60">-'+number+'</b> ';
					}else{
					  var number = number_format(eval(res3+'-'+b3));
					  td[i].getElementsByTagName('b')[b].style.color = 'lime';
					  td[i].getElementsByTagName('b')[b].innerHTML = '<t title="+'+number+'">' +td[i].getElementsByTagName('b')[b].innerHTML+ '</t>';
					  text += Deuterio+' <b style="color:#5F7F6C">'+number+'</b> ';
					}
					b++;
				}
				//reseteamos el contador
				b = 0;
				//esto permite saber cuantos recursos me quedan, despues de construir
				td[i].innerHTML += text+'</font>';
				b1 = 0;
				b2 = 0;
				b3 = 0;
				
			}
		}

	}else
	if(hrefer.indexOf('overview.php')!=-1){
		//Coloreado vision general cortesia de http://userscripts.org/scripts/show/2541
		var publi = document.getElementsByTagName('span');
		for (var i = publi.length - 1; i >= 0; i--){
			if( publi[i].className == 'return ownattack'){
				publi[i].style.color="rgb(0,136,0)";
			}
			if( publi[i].className == 'return ownespionage'){
				publi[i].style.color="rgb(176,138,0)";
			}
			if( publi[i].className == 'flight owntransport'){
				publi[i].style.color="rgb(71,163,237)";
			}
			if( publi[i].className == 'return owntransport'){
				publi[i].style.color="rgb(18,114,192)";
			}
			if( publi[i].className == 'flight transport'){
				publi[i].style.color="rgb(9,187,116)";
			}
		}
	}

//Administracion alianza

if (document.location.href.indexOf('/game/leftmenu.php') != -1){
GM_log('Init: '+document.location.href);
	var Session = document.body.innerHTML.substr(document.body.innerHTML.indexOf("session=") + 8,12);

	var trs = document.getElementsByTagName('tr');

	////...Imagen separadora
	trs[trs.length-1].innerHTML ='<tr><td><center><img src="http://img394.imageshack.us/img394/3203/infohelpod1.jpg" width="110" height="19"></center></td></tr>'+
	////...Enviar CC
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=17" target="Hauptframe">Enviar CC.</a></font></div></td></tr>'+
	
	////...Lista de Miembros Ordenados
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=4&sort1=3&sort2=0" target="Hauptframe">Miembros KNIGHTS</a></font></div></td></tr>'+
	
    ////...Foro alianza
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="http://qqklan.forogratis.es" target="newwindow">Foro KNIGHTS</a></font></div></td></tr>'+
	
	////...Admin. Alianza
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=5" target="Hauptframe">Admin. Alianza</a></font></div></td></tr>'+
	////...Ajustar Leyes
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=6" target="Hauptframe">Ajustar Leyes</a></font></div></td></tr>'+
	////...Admin. Miembros
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=7" target="Hauptframe">Admin. Miembros</a></font></div></td></tr>'+
	////...Cambiar Etiqueta
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=9" target="Hauptframe">Etiqueta de Alianza</a></font></div></td></tr>'+
	////...Cambiar Nombre
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=10" target="Hauptframe">Nombre de Alianza</a></font></div></td></tr>'+
	////...Fin de Cadena, no comentar.
	'';
}

//Pantalla de recursos
function formatNmb(numero)
   {
	  var nNmb = String(numero); 
    var sRes = "";
    for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++)
     sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;
    return sRes;
   }
   
if (document.location.href.indexOf('/game/resources.php') != -1){
GM_log('Init: '+document.location.href);

var T_Recursos = document.getElementsByTagName("td");
var Metal1 = T_Recursos[18].innerHTML.replace(/\./g,'');
var Cristal1 = T_Recursos[19].innerHTML.replace(/\./g,'');
var Deut1 = T_Recursos[20].innerHTML.replace(/\./g,'');

Metal1=eval(Metal1)
Cristal1=eval(Cristal1)
Deut1=eval(Deut1)

var PMetal = T_Recursos[40].innerHTML.replace(/\./g,'');
var PCristal = T_Recursos[41].innerHTML.replace(/\./g,'');
var PDeut = T_Recursos[42].innerHTML.replace(/\./g,'');

var AlmM = T_Recursos[35].innerHTML.replace(/\./g,'');
var AlmC = T_Recursos[36].innerHTML.replace(/\./g,'');
var AlmD = T_Recursos[37].innerHTML.replace(/\./g,'');
AlmM = AlmM.replace(/k/,'000');
AlmC = AlmC.replace(/k/,'000');
AlmD = AlmD.replace(/k/,'000');

if (Metal1.indexOf('<font color')!=-1) {
	Metal1 = Metal1.substring(22, Metal1.indexOf('</font'));
}
if (Cristal1.indexOf('<font color')!=-1) {
	Cristal1 = Cristal1.substring(22, Cristal1.indexOf('</font'));
}
if (Deut1.indexOf('<font color')!=-1) {
	Deut1 = Deut1.substring(22, Deut1.indexOf('</font'));
}

if (PMetal.indexOf('<font color')!=-1) {
	PMetal = PMetal.substring(22, PMetal.indexOf('</font'));
}
if (PCristal.indexOf('<font color')!=-1) {
	PCristal = PCristal.substring(22, PCristal.indexOf('</font'));
}
if (PDeut.indexOf('<font color')!=-1) {
	PDeut = PDeut.substring(22, PDeut.indexOf('</font'));
}

if (AlmM.indexOf('<font color')!=-1) {
	AlmM = AlmM.substring(22, AlmM.indexOf('</font'));
}
if (AlmC.indexOf('<font color')!=-1) {
	AlmC = AlmC.substring(22, AlmC.indexOf('</font'));
}
if (AlmD.indexOf('<font color')!=-1) {
	AlmD = AlmD.substring(22, AlmD.indexOf('</font'));
}

var XMetal = new Array(3);
var XCristal = new Array(3);
var XDeut = new Array(3);

XMetal[0] = PMetal * 24;
XCristal[0] = PCristal * 24;
XDeut[0] = PDeut * 24;
XMetal[1] = PMetal * 168;
XCristal[1] = PCristal * 168;
XDeut[1] = PDeut * 168;
XMetal[2] = PMetal * 720;
XCristal[2] = PCristal * 720;
XDeut[2] = PDeut * 720;

// Buscar Formulario de Recursos

var ResFormC, T_Form, ResForm;
ResFormC = document.getElementsByTagName('table');

for (var i = 0; i < ResFormC.length; i++) {
	
	T_Form = ResFormC[i];
	if (T_Form.getAttribute('width') == '550') {
		ResForm = T_Form;
	}
}

// Buscar Factor de Produccion
var T_Factor = /factor(.)*\:(.)*[0-9.]/gi.exec(document.body.innerHTML);

var Factor, FactorPorc;
if (T_Factor.length) {
	Factor=T_Factor[0].split(":");
	Factor=parseFloat(Factor[1]) * 100;
	FactorPorc=parseInt(parseFloat(Factor) * 2.5);
}

// Agregar tabla de factor de produccion
if (ResForm) {
	// Buscar Produccion Real

	

	// Procesar Tablas
	var ProdFact = document.createElement('div');

	ProdFact.innerHTML = '<table width="550"><tr>'+
'<th>Nivel de Producci&oacute;n</th>'+
'<th>'+Factor+'%</th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div style="background-color: '+(Factor < 100 ? '#C00000' : '#00C000' )+'; width: '+FactorPorc+'px;">&nbsp;</div></div></th>'+
'</tr></table><br />';
	
	var CuentaRec = document.createElement('div');

	CuentaRec.innerHTML = '<br /><table width="550">'+
'<tr><td class="c" colspan="4">Producci&oacute;n extendida</td></tr>'+
'<tr>'+
'<td class="c">&nbsp;</td>'+
'<th>Diaria</th>'+
'<th>Semanal</th>'+
'<th>Mensual</th>'+
'</tr>'+
'<tr>'+
'<td class="c">Metal</td>'+
'<th><font color="#00ff00">'+formatNmb(XMetal[0])+'</font></th>'+
'<th><font color="#00ff00">'+formatNmb(XMetal[1])+'</font></th>'+
'<th><font color="#00ff00">'+formatNmb(XMetal[2])+'</font></th>'+
'</tr>'+
'<tr>'+
'<td class="c">Cristal</td>'+
'<th><font color="#00ff00">'+formatNmb(XCristal[0])+'</font></th>'+
'<th><font color="#00ff00">'+formatNmb(XCristal[1])+'</font></th>'+
'<th><font color="#00ff00">'+formatNmb(XCristal[2])+'</font></th>'+
'</tr>'+
'<tr>'+
'<td class="c">Deuterio</td>'+
'<th><font color="#00ff00">'+formatNmb(XDeut[0])+'</font></th>'+
'<th><font color="#00ff00">'+formatNmb(XDeut[1])+'</font></th>'+
'<th><font color="#00ff00">'+formatNmb(XDeut[2])+'</font></th>'+
'</tr>'+
'</table><br />';

	var EAlmM=(Metal1 / AlmM) * 100;
	var EAlmMPorc=parseInt((Metal1 / AlmM) * 250);
	var EAlmC=(Cristal1 / AlmC) * 100;
	var EAlmCPorc=parseInt((Cristal1 / AlmC) * 250);
	var EAlmD=(Deut1 / AlmD) * 100;
	var EAlmDPorc=parseInt((Deut1 / AlmD) * 250);

	EAlmM = Math.round(EAlmM);
	EAlmC = Math.round(EAlmC);
	EAlmD = Math.round(EAlmD);

	CuentaRec.innerHTML += '<table width="550">'+
'<tr><td class="c" colspan="3">Estado de los Almacenes</td></tr>'+
'<tr>'+
'<th>Metal</th>'+
'<th>'+EAlmM+'%</th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div style="background-color: '+(EAlmM > 100 ? '#C00000' : '#00C000' )+'; width: '+(EAlmMPorc > 250 ? 250 : EAlmMPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'<tr>'+
'<th>Cristal</th>'+
'<th>'+EAlmC+'%</th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div style="background-color: '+(EAlmC > 100 ? '#C00000' : '#00C000' )+'; width: '+(EAlmCPorc > 250 ? 250 : EAlmCPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'<tr>'+
'<th>Deuterio</th>'+
'<th>'+EAlmD+'%</th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div style="background-color: '+(EAlmD > 100 ? '#C00000' : '#00C000' )+'; width: '+(EAlmDPorc > 250 ? 250 : EAlmDPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'</table><br />';


	ResForm.parentNode.insertBefore(CuentaRec, ResForm.nextSibling);
	ResForm.parentNode.insertBefore(ProdFact, ResForm);
	document.body.innerHTML = document.body.innerHTML.replace(/factor de producci(.)+n\:(.)*[0-9.]/gi,'');

}
}

//Lo de la capacidad de las flotas
if (document.location.href.indexOf('/game/flotten1.php') != -1){
GM_log('Init: '+document.location.href);
var element = document.evaluate('/html/body/center/table/tbody/tr/td[3]/table/tbody/tr[3]', document, null, 	XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.getElementsByTagName('td');
	var metal = parseInt(element[1].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	var cristal = parseInt(element[2].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	var deuterio = parseInt(element[3].innerHTML.replace(/.*>(.*)<.*/g,'$1').replace(/\./g, ''));
	var recursos = metal + cristal + deuterio;
	unsafeWindow.calculate = calculate;
	var infoRow = document.getElementsByTagName('tr');
	var as = infoRow[infoRow.length-3].getElementsByTagName('a');
	for (var i=0; i<as.length; i++)
		as[i].setAttribute('onclick', 'setTimeout(calculate, 20)');
	infoRow = infoRow[infoRow.length-1].firstChild;
	calculate();
	for(i=202; i<215; i++){  // quiza se podria reducir los bucles de busqueda cogiendo directamente esa columna
		x=document.getElementsByName("ship"+i);
		if(x.length){
			x[0].addEventListener('keyup',calculate,true);
			x[0].parentNode.previousSibling.previousSibling.firstChild.setAttribute('onclick', 'setTimeout(calculate, 20)');
			x[0].setAttribute('onchange', "this.value=parseInt(Math.min(parseInt('0'+this.value, 10), parseInt(getElementsByName('max'+this.name)[0].value, 10)),10);setTimeout(calculate, 10)");
	}
}	
}

function puntuar(numero) {
	var strNum=String(numero);
	var strNum2='';
	var i=0;
	for(i=strNum.length-4;i>=0;i-=3) {
		strNum2=(strNum[i]=='-'?'':'.')+strNum.substring(i+1, i+4)+strNum2;
	}
	strNum2=strNum.substr(0, i+4)+strNum2;
	return strNum2;
}


function calculate(){
	var capacity=0;
	var speed=0;
	var consumption=0;
		
	for(i=202; i<215; i++){
		x=document.getElementsByName("ship"+i);
		y=document.getElementsByName("capacity"+i);
		u=document.getElementsByName("speed"+i);
		v=document.getElementsByName("consumption"+i);
		if(x.length && y.length && x[0].value!=''){
			shipCount=parseInt(x[0].value, 10);
			shipCapacity=parseInt(y[0].value, 10);
			shipSpeed=parseInt(u[0].value, 10);
			shipConsumption=parseInt(v[0].value, 10);
			capacity+=shipCount*shipCapacity;
			if((speed > shipSpeed || speed == 0) && shipCount>0 ) speed=shipSpeed;
				consumption +=shipCount*shipConsumption;
		}
	}	
	if(recursos>capacity){
		surstr = puntuar(recursos-capacity);
		var cp = 0;
		var cg = 0;
		try {cp = document.getElementsByName('maxship202')[0].value}
			catch (e) {}
		try {cg = document.getElementsByName('maxship203')[0].value}
			catch (e) {}
		surstr += '&nbsp;&nbsp;<font color="orangered" title="Cargueros pequenyos"> CP: ' +
						puntuar(Math.ceil((recursos-capacity)/5000)) +
						(capacity==0?' (' + cp + ')':'') + '</font>' +
						'&nbsp;&nbsp;<font color="orange" title="Cargueros grandes"> CG: ' +
						puntuar(Math.ceil((recursos-capacity)/25000)) +
						(capacity==0?' (' + cg + ')':'') + '</font>';
	}else {
		surstr='0';
	}
	var s=document.getElementsByTagName('th');
	var k=s.length-11;
	s[k].innerHTML='<font color="#9999FF">Recursos restantes: ' + surstr + '</font>' +
						(capacity>0?'&nbsp;&nbsp;<font color="#00FF66">Capacidad: '	+ puntuar(capacity) + '</font>' +
						'<br /><font color="lightblue">Velocidad max: ' + puntuar(speed) + '</font>' +
						'&nbsp;&nbsp;<font color="#77bb22">Consumo: ' + puntuar(consumption) + '</font>':'');		
}

//Espiada de lunas y manda recicladores
if (document.location.href.indexOf('/game/galaxy.php') != -1){
GM_log('Init: '+document.location.href);
element = document.evaluate('/html/body/center/form/table/tbody/tr[1]/td[1]/table/tbody/tr[2]/td[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
galaxy = element.value;
element = document.evaluate('/html/body/center/form/table/tbody/tr[1]/td[2]/table/tbody/tr[2]/td[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
system = element.value;
element = document.evaluate('/html/body/center/form/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
session = element.value;

var tas = document.getElementsByTagName('font');
for (var i = tas.length - 1; i >= 0; i--) {
var ifont = tas[0].innerHTML;
if (tas[i].innerHTML.indexOf(ifont) != -1){
var texts = tas[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML;
var cod = "[" +galaxy+':'+system+":";
var met = texts.indexOf('<th>',texts.indexOf('<th>',texts.indexOf('<th>')+1)+1);
var metal = parseInt(texts.substring(met+4,texts.indexOf('</th>',met+4)).replace(/[s.]/gi,''));
var krs = texts.indexOf('<th>',texts.indexOf('<th>',met+1)+1);
var kristal = parseInt(texts.substring(krs+4,texts.indexOf('</th>',krs+4)).replace(/[s.]/gi,''));
var pos = texts.substr(texts.indexOf(cod) + cod.length,4);
while (pos.indexOf("]") != -1){
pos = pos.substr(0, pos.length -1);
};
if(ifont!="Espiar"){
    tas[i].parentNode.innerHTML = '<a href="#" onclick="doit(8, '+galaxy+', '+system+', '+pos+', 2, '+Math.ceil((kristal+metal)/20000)+')">'+ifont+'</a>';
}else{
    tas[i].parentNode.innerHTML = '<a href="#" onclick="doit(6, '+galaxy+', '+system+', '+pos+', 1, 1)">'+ifont+'</a>';
}
};}}

//Agrega carga independiente de cada lota seleccionada

var textNode;

var vNaves = Array(
  Array(202, 1, 5000, 10000, 10, 5000), //Nave peque�a de carga
  Array(203, 1, 7500, 0, 50, 25000),    //Nave grande de carga
  Array(204, 1, 12500, 0, 20, 50),      //Cazador ligero
  Array(205, 2, 10000, 0, 75, 100),     //Cazador pesado
  Array(206, 2, 15000, 0, 300, 800),    //Crucero
  Array(207, 3, 10000, 0, 500, 1500),   //Nave de batalla
  Array(208, 2, 2500, 0, 1000, 7500),   //Colonizador
  Array(209, 1, 2000, 0, 300, 20000),   //Reciclador
  Array(210, 1, 100000000, 0, 1, 0),    //Sonda de espionaje
  Array(211, 2, 4000, 5000, 1000, 500), //Bombardero
  Array(212, 3, 5000, 0, 1000, 2000),   //Zer
  Array(213, 3, 100, 0, 1, 2000),       //Destructor
  Array(214, 3, 100, 0, 1, 1000000),    //EDLM
  Array(215, 3, 10000, 0, 250, 750)     //Acorazado
);

function addDots(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
};

function removeDots(nStr){
	return parseInt(nStr.replace(/[.]/g,''));
};

function mynoShips (){
	var id;
	
	for (i = 200; i < 220; i++) {
		id = "ship" + i;
		if (document.getElementById(id)) {
			document.getElementsByName(id)[0].value = 0;
			calcStorage(id);
		};
	};
	//calcTotal();
};

function mymaxShips() {
	var id;
	var i;
	
	for (i = 200; i < 220; i++) {
		id = "ship" + i;
		if (document.getElementById(id)) {
			document.getElementsByName(id)[0].value = document.getElementsByName("max" + id)[0].value;
			calcStorage(id);
		};
	};
	//calcTotal();
};

function mymaxShip(){
	var ships;
	var ship;

	ship = document.getElementById(this.id).id;
	if (document.getElementsByName(ship)[0]) {
		ships = document.getElementsByName(ship)[0];
		document.getElementsByName(ship)[0].value = document.getElementsByName("max" + ship)[0].value;
		calcStorage(ships.name);
	};
};

function myKeyUp(){
	calcStorage(this.name);
};

function calcTotal(){
	var id;
	var i;
	var iTotal = 0;
	
	for (i = 200; i < 220; i++) {
		id = "ship" + i;
		if (document.getElementById(id)) {
			iTotal = iTotal + Number(removeDots(document.getElementsByName(id)[0].nextSibling.value));
		};
	};
	textNode.nodeValue = addDots(iTotal);
};

function calcStorage(ship){
	var i;
	var node;
	var ships;
	
	if (ships = document.getElementsByName(ship)[0]) {
		node = ships.nextSibling;
	
		if (isNaN(ships.value)) {
			node.nodeValue = 0;
		} else {
			for (i = 0; i < vNaves.length; i++) {
	    	if (vNaves[i][0] == node.id) {
	    		node.value = addDots(ships.value * vNaves[i][5]);
	    	};
	    };
		};
		calcTotal()
	};
};

function doNothing(){

};

if (document.location.href.indexOf('/game/flotten1.php') != -1){
GM_log('Init: '+document.location.href);
	var i;
	var data;
	var node;
	var nodemax;
	var inputNode;
	var nodeTotal;
	
	if (location.pathname.search("flotten1") != -1 ) {
		for(i = 200; i <= 220; i++){
			data = document.getElementsByName("ship" + i);
			if (data.length > 0) {
				if (nodeTotal == null){
					nodeTotal = data[0]
					nodeTotal = nodeTotal.parentNode;
					nodeTotal = nodeTotal.parentNode;
					nodeTotal = nodeTotal.parentNode;
					nodeTotal = nodeTotal.firstChild;
					nodeTotal = nodeTotal.nextSibling;
					nodeTotal = nodeTotal.nextSibling;
					nodeTotal = nodeTotal.lastChild;
					nodeTotal = nodeTotal.previousSibling;
					nodeTotal.firstChild.nodeValue = 'Total: ';
					textNode = document.createTextNode('0');
					nodeTotal.appendChild(textNode);
				};
			
				node = data[0];
				node.addEventListener("keyup", myKeyUp, false);
				//node.addEventListener("mouseover", mymaxShips, false);

				nodemax = node.parentNode.previousSibling.previousSibling.firstChild;
				nodemax.href = 'javascript:doNothing'; //redefinimos el click en el "m�x"
				nodemax.id = node.name;
				nodemax.addEventListener('click', mymaxShip, false);

				inputNode = document.createElement('INPUT'); // se crea la nueva celda
				inputNode.id = i;
				inputNode.value = '0';
				inputNode.disabled = true;
				inputNode.size = 10;
				node.parentNode.appendChild(inputNode);				
			};	
		};
		// redefinimos el "todas las naves"		
		data = document.getElementsByTagName('a');
		for (i = 0; i < data.length; i++) {
			if (data.item(i).href == "javascript:maxShips();") {
				node = data.item(i);
				node.href = 'javascript:doNothing'; //redefinimos el click 
				//node.id = node.name;
				node.addEventListener('click', mymaxShips, false);	
			};
			
			if (data.item(i).href == "javascript:noShips();") {
				node = data.item(i);
				node.href = 'javascript:doNothing'; //redefinimos el click 
				//node.id = node.name;
				node.addEventListener('click', mynoShips, false);	
			};
		};
	};
}

//Casilla de busqueda en el menu izquierdo
if (document.location.href.indexOf('/game/leftmenu.php') != -1){
GM_log('Init: '+document.location.href);
var reg = /session=([a-z0-9]+)/;
var resultado = reg.exec(document.body.innerHTML);
var sesion=resultado[0];
var formulario = document.createElement('form');
formulario.setAttribute("action","suche.php?"+sesion);
formulario.setAttribute("target","Hauptframe");
formulario.setAttribute("method","post");

var texto = document.createElement('input');
texto.setAttribute("type","text");
texto.setAttribute("name","searchtext");
var boton = document.createElement('input');
boton.setAttribute("type","submit");
boton.setAttribute("value","Buscar");

formulario.innerHTML += '<select name="type"><option value="playername" selected>Nombre del jugador</option>     <option value="planetname" >Nombre del planeta</option>     <option value="allytag" >Etiqueta de la alianza</option>     <option value="allyname" >Nombre de la alianza</option></select>';
formulario.appendChild(texto);
formulario.appendChild(boton);

var p = document.body.appendChild(document.createElement('p'));
p.appendChild(formulario);
document.body.appendChild(p);}
 
})();

//administracion de mensajes
if (document.location.href.indexOf('/game/messages.php') != -1){
GM_log('Init: '+document.location.href);
var adres = document.location;//potrzebne
var reg = /http:\/\/(.*?)\/game\/messages.php\?session=(.*?)/i;
var result = reg.exec(adres);
var server = result[1];//potrzebne

var typy=new Array(1,2,3,4,5,6,7,0,10);
var nazwy=new Array("RS","Flota","Recogida","Defensa","Alineacion","Msjs","Batallas","Entrega y espias","Todo");//categories names

var str = GM_getValue('wiadomosci_'+server);
if(str!=null && str!=''){
	var wiadomosci=str.split('##');
}else{
	var wiadomosci=new Array();
}
il_wiad=wiadomosci.length;

function zapisz(){
	str=wiadomosci.join('##');
	GM_setValue('wiadomosci_'+server,str);
}
	

function zapamietaj(){//save message
	var data=this.parentNode.parentNode.previousSibling.previousSibling.childNodes[3].innerHTML;
	var od=this.parentNode.parentNode.previousSibling.previousSibling.childNodes[5].innerHTML;
	var temat=this.parentNode.parentNode.previousSibling.previousSibling.childNodes[7].innerHTML;
	var tresc=this.parentNode.nextSibling.innerHTML;
	var typ=0;//inne
	if(od.indexOf(unescape("Dow%F3dztwo%20floty"))==0){//fleet other
			typ=2;
			if(temat.indexOf("Raport szpiegowski")!=-1) typ=1;//spy reports
	}
	if(od.indexOf("Flota")==0) typ=3;//recyclers
	if(od.indexOf("Perymetr Obrony")==0) typ=4;//scans
	if(od.indexOf("Sojusz")==0) typ=5;//ally messages
	if(od.indexOf("[")!=-1 && typ!=5) typ=6;//player messages
	temat=escape(temat);	
	tresc=escape(tresc);		
	var wiadomosc=data+"||"+od+"||"+temat+"||"+tresc+"||"+typ;
	wiadomosci[il_wiad++]=wiadomosc;
	zapisz();
}

function zapamietaj_rw(){//save battle report
	var tresc=document.getElementsByTagName("center")[0].innerHTML;
	var z1=tresc.indexOf("<td>")+6;
	var z2=tresc.indexOf("Agresor")+8;//Attacker name start
	var z3=tresc.indexOf("<br>",z2);
	var z4=tresc.indexOf(unescape("Obro%u0144ca"))+8;//Defender name start
	var z5=tresc.indexOf("<br>",z4);
	var data=tresc.substring(z1,z1+15);
	var agresor=tresc.substring(z2,z3);
	var obronca=tresc.substring(z4,z5);
	
	var wiadomosc=data+"|| RW ||"+escape(agresor+" vs. "+obronca)+"||"+escape(tresc)+"||7";
	wiadomosci[il_wiad++]=wiadomosc;
	zapisz();
}

function pokaz_rw(){//show battle report
	var obj=this.parentNode.parentNode.nextSibling.firstChild.firstChild;
	if(obj.style.display=='none'){
		obj.style.display='block';
	}else{
		obj.style.display='none';
	}
}

function usun(){//delete message
	var do_us=parseInt(this.getAttribute('num'));
	var typ_w=parseInt(this.getAttribute('wiadom'));
	wiadomosci.splice(do_us,1);
	il_wiad--;
	zapisz();
	pokaz(typ_w);
	return true;
}

function pokaz(typw){//show category
	var tabela=document.getElementsByTagName("table")[6];
	while(tabela.firstChild) tabela.removeChild(tabela.firstChild);
	//tabela.innerHTML='';
	tbody=document.createElement('tbody');
	
	w=document.createElement('tr');
	x=document.createElement('th');
	x.setAttribute('colspan','4');
	x.setAttribute('width','519');
	x.className='c';
	x.innerHTML="Administrador de mensajes";
	w.appendChild(x);
	tbody.appendChild(w);
	
//wybor typu wiadomosci
	w=document.createElement('tr');
	x=document.createElement('th');
	x.setAttribute('colspan','4');
	x.setAttribute('width','519');
	
	for(i=0;i<typy.length;i++){
		y=document.createElement('input');
		y.setAttribute('type','button');
		y.setAttribute('wiadom',typy[i]);
		y.setAttribute('value',nazwy[i]);
		y.addEventListener('click',pokaz2,true);
		x.appendChild(y);
	}
	w.appendChild(x);
	tbody.appendChild(w);
//	

	w=document.createElement('tr');
	x=document.createElement('th');
	x.innerHTML="Accion";//headers like in message table
	w.appendChild(x);
	x=document.createElement('th');
	x.innerHTML="Fecha";
	w.appendChild(x);
	x=document.createElement('th');
	x.innerHTML="De";
	w.appendChild(x);
	x=document.createElement('th');
	x.innerHTML="Asunto";
	w.appendChild(x);
	tbody.appendChild(w);
	for(i=0;i<il_wiad;i++){
		var wiadomosc=wiadomosci[i].split('||');
		if(!wiadomosc[4]) wiadomosc[4]=0;//kompatybilnosc wstecz
		if(parseInt(wiadomosc[4])==typw || typw==10){
		w=document.createElement('tr');
		x=document.createElement('th');
		
		y=document.createElement('input');
		y.setAttribute('type','button');
		y.setAttribute('num',i);
		y.setAttribute('wiadom',typw);
		y.setAttribute('value','Eliminar');
		y.addEventListener('click',usun,true);
		x.appendChild(y);
		w.appendChild(x);
		
		x=document.createElement('th');
		x.innerHTML=wiadomosc[0];
		w.appendChild(x);
		
		x=document.createElement('th');
		x.innerHTML=wiadomosc[1];
		w.appendChild(x);
		
		x=document.createElement('th');
		if(parseInt(wiadomosc[4])==7){//rw ukryte
			y=document.createElement('font');
			y.setAttribute("color","red");
			y.innerHTML=unescape(wiadomosc[2]);
			y.addEventListener('click',pokaz_rw,true);
			x.appendChild(y);
		}else{
			x.innerHTML=unescape(wiadomosc[2]);
		}
		w.appendChild(x);
		tbody.appendChild(w);

		w=document.createElement('tr');
		x=document.createElement('td');
		x.className='b';
		x.setAttribute('colspan','4');
		x.setAttribute('width','519');
		if(parseInt(wiadomosc[4])==7){//rw ukryte
			y=document.createElement('center');
			y.style.display='none';
			y.innerHTML=unescape(wiadomosc[3]);
			x.appendChild(y);
		}else{
			x.innerHTML=unescape(wiadomosc[3]);
		}
		w.appendChild(x);
		tbody.appendChild(w);
		}
	}
	//tabela.style['position']="relative";
	//tabela.style['top']="1";
	tabela.appendChild(tbody);
	return true;
}

function pokaz2(){
	var do_pok=parseInt(this.getAttribute('wiadom'));
	pokaz(do_pok);
	return true;
}

//if (document.location.href.indexOf('/game/messages.php') != -1){
//GM_log('Init: '+document.location.href);
//adres.href.indexOf

if(document.location.href.indexOf('bericht.php') == -1){
GM_log('Init: '+document.location.href);
	var td=document.getElementsByTagName("td");
	for(i=20;i<td.length;i++){
		if(td[i].className=='b' && td[i].innerHTML==' '){
			w=document.createElement('input');
			w.setAttribute('type','button');
			w.setAttribute('value','Grabar'); //save button
			w.addEventListener('click',zapamietaj,true);
			td[i].appendChild(w);
		}
	}

	var tabela=document.getElementsByTagName("table")[6].childNodes[1];
	w=document.createElement('tr');
	x=document.createElement('th');
	x.setAttribute('colspan','4');
	x.setAttribute('width','519');

	for(i=0;i<typy.length;i++){
		y=document.createElement('input');
		y.setAttribute('type','button');
		y.setAttribute('wiadom',typy[i]);
		y.setAttribute('value',nazwy[i]);
		y.addEventListener('click',pokaz2,true);
		x.appendChild(y);
	}
	w.appendChild(x);
	tabela.insertBefore(w,tabela.firstChild);
		

}else{//zapis RW

	var body=document.getElementsByTagName("body")[0];
	w=document.createElement('input');
	w.setAttribute('type','button');
	w.setAttribute('value','Grabar batalla');//save battle report button
	w.addEventListener('click',zapamietaj_rw,true);
	body.appendChild(w);
	body.insertBefore(w,body.firstChild);
	
}
}

//Reloj de vision general
//Funcion para agregar la fecha y hora de la flotas.
unsafeWindow.t = function (){
   var d = new Date();
   var maxTime = 60;
   for(cn = 1; cn <= unsafeWindow.anz; cn++) {
      bxx = document.getElementById('bxx' + cn);
      segs = bxx.title * 1;
      mins = 0;
      horas = 0;
      if(segs < 0) {
         bxx.innerHTML = "-";
      } 
      else {
         horas = Math.floor(segs/3600);
         mins = Math.floor(segs/60);
         segs -= mins * 60;
         mins -= horas * 60;
         bxx.title = bxx.title - 1;
      	time = bxx.title * 1000;
         textoArrivo = "";
         if(time > maxTime * 60000) {
            arrivo = new Date(time + d.getTime());
            diaArribo = arrivo.getDate();
            mesArribo = arrivo.getMonth();
            horaArribo = arrivo.getHours();
            minArribo = arrivo.getMinutes();
            segArribo = arrivo.getSeconds();
            if(diaArribo == d.getDate() && mesArribo == d.getMonth() && arrivo.getFullYear() == d.getFullYear())
               textoArrivo = "gercek zaman";
            else
               textoArrivo = ((diaArribo < 10) ? '0' : '') + diaArribo + ((++mesArribo < 10) ? '/0' : '/') + mesArribo;
            textoArrivo += " - " + ((horaArribo < 10) ? '0' : '') + horaArribo + ((minArribo < 10) ? ':0' : ':') + minArribo + ((segArribo < 10) ? ':0' : ':') + segArribo;
         }
         bxx.innerHTML = horas + ((mins < 10) ? ':0' : ':') + mins + ((segs < 10) ? ':0' : ':') + segs + "<br>" + textoArrivo;
      }
   }
   window.setTimeout("t();", 999);
}


//Funcion para buscar dentro de un array un valor y devolver su posicion.
function BuscarPos(array, id) {
   for(var i = 0; i < array.length; i++) {
      if(array[i] == id) return i;
	}
   return -1;
}

//Funcion para verificar si un anio es bisiesto o no.
function AnoBisiesto(ano) {
   return (((ano % 4 == 0) && (ano % 100 != 0)) || (ano % 400 == 0)) ? 1 : 0;
}

//Funcion para calcular la cantidad de dias que tiene el mes.
function DiasMes(mes, ano) {
   if(mes == 0 || mes == 2 || mes == 4 || mes == 6 || mes == 7|| mes == 9 || mes == 11)
      return 31;
   if(mes == 3 || mes == 5 || mes == 8 || mes == 10)
      return 30;
   if(mes == 1 && AnoBisiesto(ano) == 0)
      return 28;
   else
      return 29;
}

//Funcion para actualizar los relojes de la vista principal.
function Clock() {
   nodeLocal = document.getElementById("ClockLocal");
   nodeServer = document.getElementById("ClockServer");
   var date = new Date();
   var ano = date.getFullYear();
   var mes = date.getMonth();
   var dia = date.getDay();
   var diaNum = date.getDate();
   var hora = date.getHours();
   var mins = date.getMinutes();
   var segs = date.getSeconds();
   var dias = new Array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
   var meses = new Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
   var fecha = nodeServer.innerHTML.match(/(\S+) (\d+) de (\S+) - (\d{2}):(\d{2}):(\d{2})/);
   nodeLocal.innerHTML = dias[dia] + ' ' + diaNum + ' de ' + meses[mes] + ' - ' + ((hora < 10) ? '0' : '') + hora + ((mins < 10) ? ':0' : ':') + mins + ((segs < 10) ? ':0' : ':') + segs;
   dia = BuscarPos(dias, fecha[1]);
   diaNum = fecha[2] * 1;
   mes = BuscarPos(meses, fecha[3]);
   hora = fecha[4] * 1;
   mins = fecha[5] * 1;
   segs = fecha[6] * 1;
   if(++segs > 59) {
      segs = 0;
      if(++mins > 59) {
         mins = 0;
         if(++hora == 23) {
            hora = 0;
            if(++dia > 6) dia = 0;
            diaNum++;
            if(diaNum > DiasMes(mes, ano)) {
               diaNum = 1;
               if(++mes > 11) mes = 0;
            }
         }
      }
   }
   nodeServer.innerHTML = dias[dia] + ' ' + diaNum + ' de ' + meses[mes] + ' - ' + ((hora < 10) ? '0' : '') + hora + ((mins < 10) ? ':0' : ':') + mins + ((segs < 10) ? ':0' : ':') + segs;
   //Actualizaremos dentro de un 1 segundo si no cambio la pagina.
   if(document.baseURI.indexOf("overview.php") != -1)
      setTimeout(Clock, 1000);
}

//Verificamos si esta abierta en el frame principal la pagina de vision general.
if(document.baseURI.indexOf("overview.php") != -1) {
   //Cambiamos el ancho de la tabla.
   var nodo = document.evaluate("/html/body/center/table[last()]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
   nodo.setAttribute('width', '570');
   //Cambiamos los anchos de las celdas de las colonias para evitar que la tabla varie segun el contenido.
   nodo = document.evaluate("/html/body/center/table[last()]/tbody/tr[last()-4]/th[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
   nodo.setAttribute('width', '110');
   nodo = document.evaluate("/html/body/center/table[last()]/tbody/tr[last()-4]/th[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
   nodo.setAttribute('width', '220');
   //Obtenemos el nodo que contiene la hora del servidor.
   nodo = document.evaluate("/html/body/center/table[last()]/tbody/tr[th[2]]/th[2]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
   var dias = new Array('Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado');
   var meses = new Array('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
   var days = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
   var months = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');

   var date = new Date();
   var mes = date.getMonth();
   var dia = date.getDay();
   var diaNum = date.getDate();
   var hora = date.getHours();
   var mins = date.getMinutes();
   var segs = date.getSeconds();

   var fecha = nodo.innerHTML.match(/(\S\S\S) (\S\S\S) (\d+) (\d+)(:\d\d:\d\d)/);
   var fechaLocal = dias[dia] + " " + diaNum + " de " + meses[mes] + " - " + ((hora < 10) ? "0" : "") + hora + ((mins < 10) ? ":0" : ":") + mins + ((segs < 10) ? ":0" : ":") + segs;
   var fechaServer = dias[BuscarPos(days,fecha[1])] + " " + fecha[3] + " de " + meses[BuscarPos(months, fecha[2])] + " - " + ((fecha[4] < 10) ? "0" : "") + fecha[4] + fecha[5];

   var nodoLocal = nodo.parentNode.cloneNode(true);
   nodo.parentNode.parentNode.insertBefore(nodoLocal, nodo.parentNode.nextSibling);
   nodoLocal.innerHTML = "<th>Hora local</th><th colspan='3' id='ClockLocal'>" + fechaLocal + "</th>";

   nodo.previousSibling.previousSibling.innerHTML='Hora server';
   nodo.innerHTML = fechaServer;
   nodo.setAttribute('id', 'ClockServer');
   setTimeout(Clock, 1000);
}



// version 0.8
// 18 Feb 2007
// Copyright (c) 2007, Guillermo Gutierrez
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Script de compactacion automatica de batallas de ogame

//Looking for transtlators uncle Gobo needs you ;) if you want translate this script please mail me at eldaimon in g m a i l -remove the espaces- . com


// ==UserScript==
// @name Compactador-Ogame
// @namespace http://eldaimon.blogspot.com/
// @author Guillermo Gutierrez
// @description  Compactador de informes de batallas del ogame
// @include     http://*/bericht*php*
// ==/UserScript==

//TODO: Remove repeat tags

//Constant pattern values for search in document, usefull for translate this script
/*
	If you want translate this script you must change the text between begin and end translation coment
	keep the espaces at the beggining and end of a phrase
*/
/* 
	======================
	BEGIN TRANSLATION ZONE
	======================
*/
	const amountag = "Cantidad";
	const damagetag	= "Armas:";
	const resulttag = "batalla";
	const drawtag = "combate";
	const rubbletag = "flotan ahora";
	const metalrubbletag = "Metal y";
	const cristalrubbletag = "Cristal";
	const stolentag = "captura<br>";
	const metaltag = "Metal,";
	const cristaltag = "Cristal y";
	const deuteriumtag = "Deuterio<br>";
	const atackerloosestag = "El atacante ha perdido en total";
	const defenderloosestag = "El defensor ha perdido en total";
	const atacker_result_tag = "atacante";
	const unitstag = "unidades.";
	const destroytag = "Destruido";
	const br = "<br>";
	var endtecnologytag	 	= '<table border="1">';
	var endtecnology2tag 	 	= '<br>Destruido';
	var no_ships_no_defenses_text 	= "Sin naves ni defensas";
	var roundtag			= 'La flota atacante dispara';
	var moon_tag		 	= 'La probabilidad de que una luna surja de los escombros es de';
	var moon_created_tag	 	= 'Las enormes cantidades de metal y de cristal se atraen y forman lentamente un sat�lite lunar en la �rbita del planeta. ';
	var max_rentability	 	= 'M�xima';
	var min_rentability		= 'M�nima';
	var repaired_tag	 	= 'pueden ser reparados.';
	var months 			= new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre','Diciembre');
	var serverShiptsNames		= new Array('P.Carga','Gr.Carga','Cazador L.','Cazador P.','Crucero','Nave de Batalla','Colonizador','Reciclador.','Sonda','Bombardero','Sat�lite S.','Destructor','Est.Muerte','Acoraz.');
	var userShiptsNames		= new Array('Nave peque�a de carga','Nave grande de carga','Cazador ligero','Cazador pesado','Crucero','Nave de batalla','Colonizador','Recicladores','Sonda de espionaje','Bombardero','Sat�lite solar','Destructor','Estrella de la muerte','Acorazado');
	var serverDefensesNames		= new Array('Misil','L�ser Peq.','L�ser Gr.','C.Gauss','C.I�nico','C.Plasma','C�pula Peq.','C�pula Gr.');
	var userDefensesNames		= new Array('Lanzamisiles','L�ser peque�o','L�ser grande','Ca��n de gauss','Ca��n i�nico','Ca��n de plasma','C�pula peque�a de protecci�n','C�pula grande de protecci�n');
//const strings
	const c_singleAtacker 		= 'Atacante';
	const c_multipleAtacker 	= 'Atacantes';
	const c_singleDefender 	= 'Defensor';
	const c_multipleDefender 	= 'Defensores';
	const c_battleInit		= 'Batalla del d�a ';
	const c_at			= ' a las ';
	const c_of			= ' de ';
	const c_duration		= 'La batalla dur� ';
	const c_rounds			= ' rondas';
	const c_hiddenTecnology	= 'Armas: XXX% Escudos: XXX% Blindaje: XXX%';
	const c_lost			= ' perdi� ';
	const c_looses			= 'P�rdidas ';
	const c_units 			= ' unidades.';
	const c_stolen			= 'Captura: ';
	const c_metalInfo		= ' Metal, ';
	const c_cristalInfo		= ' Cristal y ';
	const c_deuteriumInfo		= ' Deuterio';
	const c_consumption		= 'Consumo de deuterio (aproximado) al 100%: ';
	const c_atackerLooses		= 'P�rdidas del Atacante: ';
	const c_defenderLooses		= 'P�rdidas del Defensor: ';
	const c_totalLooses		= 'P�rdidas TOTALES: ';
	const c_rubbles		= 'Escombros';
	const c_metalRubble		= 'Metal: ';
	const c_cristalRubble		= 'Cristal: ';
	const c_deuteriumRubble		= 'Deuterio: ';
	const c_winAndLost		= 'GANANCIAS Y P�RDIDAS';
	const c_recicleRentability   	= 'Rentabilidad con reciclaje: ';
	const c_notRecicleRentability   = 'Rentabilidad sin reciclaje: ';
	const c_with			= ' Con';
	const c_without		= 'Sin ';
	const c_recicle		= ' Reciclaje: ';
	const c_defenderWithRecicle	= 'Defensor Si Recicla: ';
	const c_showDeuterium		= ' Mostrar el consumo de deuterio <br />';
	const c_showTech		= ' Mostrar las tecnolog�as &nbsp;&nbsp;&nbsp;';
	const c_showCoords		= ' Mostrar las coordenadas<br>';
	const c_forumSkin		= ' Fondo de foro claro &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	const c_ogameSkin		= ' Fondo de skin claro<br>';
	const c_forumType0		= ' Compactar en html ';
	const c_forumType1		= ' Compactar para foro phpBB ';
	const c_forumType3		= ' Compactar para foro smf ';
	const c_forumType2		= ' Compactar en texto plano<br />';
	const c_showReport		= ' Ocultar el reporte original de batalla<br />';
	const c_old_favour		= ' Ver el reporte "clasico"<br />';
	const c_old_slooses		= 'Perdidas del ';
	const c_old_plooses		= 'Perdidas de los ';
	const c_old_rentabilitysAtacker = 'Rentabilidad del Atacante: ';
	const c_old_rentabilitypAtacker = 'Rentabilidad de los Atacantes: ';
	const c_old_rentabilitysDefender= 'Defensor Si Recicla: ';
	const c_old_rentabilitypDefender= 'Defensores Si Reciclan: ';
	const c_old_atacker		= 'Atacante ';
	const c_old_with		= 'Con';
	const c_old_without		= 'Sin';	


	var added_link		= new Array('','[color=orangered][size=12]Compactado con el [url=http://userscripts.org/scripts/show/3482]Compactador autom�tico de batallas[/url][/size][/color]','','[b][color=orangered]Compactado con el [url=http://userscripts.org/scripts/show/3482]Compactador autom�tico de batallas[/url][/color][/b]');

/* 
	====================
	END TRANSLATION ZONE
	====================
*/

//Shipts properties
	var shiptsConsumption		= new Array('20','50','20','75','300','500','100','300','1','1000','0','1000','1','250');
	var shiptsSpeed			= new Array('10000','7500','12500','10000','15000','10000','2500','2000','100000000','5000','0','5000','100','10000');

	//Shipts costs
	var shiptsMetalCost		= new Array('2000','6000','3000','6000','20000','45000','10000','10000','0','50000','0','60000','5000000','30000');
	var shiptsCristalCost		= new Array('2000','6000','1000','4000','7000','15000','20000','6000','1000','25000','2000','50000','4000000','40000');
	var shiptsDeuteriumCost		= new Array('0','0','0','0','2000','0','10000','2000','0','15000','500','15000','1000000','15000');
	
//Defenses costs
	var defensesMetalCost		= new Array('2000','1500','6000','20000','2000','50000','10000','50000');
	var defensesCristalCost		= new Array('0','500','2000','15000','6000','50000','10000','50000');
	var defensesDeuteriumCost	= new Array('0','0','0','2000','0','30000','0','0');


//Report values conatiners
	//Atackers & Defenders info
	var atackerName 	 = new Array();
	var atackerTecnology     = new Array();
	var defenderName 	 = new Array();
	var defenderTecnology    = new Array();
	var atackerCount	 = 0;
	var defenderCount	 = 0;
	var rounds		 = 1;
	var loosesArr		 = new Array();

	//Rubbles info
	var rubbleMetal	 	 = 0;
	var rubbleCristal	 = 0;

	//looses info
	var defenderLoosesAmount = 0;
	var atackerLoosesAmount  = 0;

	//Stolen info
	var stolenMetal	 	 = 0;
	var stolenCristal	 = 0;
	var stolenDeuterium	 = 0;

	//Result Info
	var result_info		 = "";
	var date		 = "";
	var moon_probability	 = 0;
	var atackerRentability   = "";
	var atackerRentability2   = "";
	var defenderRentability  = "";
	var moon_and_defenses_info	 = "";
	var metalAtackersLooses = 0;
	var cristalAtackersLooses = 0;
	var deuteriumAtackersLooses = 0;
	var metalDefendersLooses = 0;
	var cristalDefendersLooses = 0;
	var deuteriumDefendersLooses = 0;

	//Report
	var original_body = "";

//Paralel arrays for get the flotes
	var atackerInitialShipsType = new Array();
	var atackerFinalShipsType = new Array();
	var atackerInitialShipsNumber = new Array();
	var atackerFinalShipsNumber = new Array();
	var atackerAuxFinalShipsNumber = new Array();
	var defenderInitialShipsType = new Array();
	var defenderFinalShipsType = new Array();
	var defenderInitialShipsNumber = new Array();
	var defenderFinalShipsNumber = new Array();
	var defenderAuxFinalShipsNumber = new Array(); 
	var atackerCoords = new Array();
	var defenderCoords = new Array();

//Colors for forums, we must get and set the options from the Grease monkey
	//For fleets 
	var fleetAtackerColor = new Array('red', 'lime');
	var fleetDefenderColor = new Array('blue', 'orange');
	var infoColor = new Array('purple', 'skyblue');
	//For nicks
	var atackerNameColor = new Array('red', 'lime');
	var defenderNameColor = new Array('blue', 'orange');
	//For looses
	var totalAtackerLoosesColor = new Array('red','lime');
	var partialAtackerLoosesColor = new Array('green','limegreen');
	var totalDefenderLoosesColor = new Array('blue','orange');
	var partialDefenderLoosesColor = new Array('orangered','orangered');
	//For consumption
	var atackerConsumptionColor = new Array('red','lime');
	var defenderConsumptionColor = new Array('blue','orange');
	//For stolen resources
	var stolenColor = new Array('purple', 'skyblue');
	//For rentabilitys
	var atackerWithRecicleColor = new Array('green','yellow');
	var atackerWithOutRecicleColor = new Array('orangered','orangered');
	var defenderWithRecicleColor = new Array('brown','coral');


//Tags for html, forums and plain text and smf :)
	var boldInit 		= new Array('<b>','[b]','','[b]');
	var boldEnd		= new Array('</b>','[/b]','','[/b]');
	var itallyInit		= new Array('<i>','[i]','','[i]');
	var itallyEnd		= new Array('</i>','[/i]','','[/i]');
	var crlf		= new Array('<br>','\n','\n','\n');	
	var sizeInit		= new Array('<font size="#replace">','[size=#replace]','','[size=#replace]');
	var sizeEnd		= new Array('</font>', '[/size]','', '[/size]');
	var colorInit		= new Array('<font color="#replace">','[color=#replace]','','[color=#replace]');
	var colorEnd		= new Array('</font>','[/color]','','[/color]');
	var hr			= new Array('<img src="http://www.science.siu.edu/images/line-hr-eyes.gif" />','[img]http://www.science.siu.edu/images/line-hr-eyes.gif[/img]','','[img]http://www.science.siu.edu/images/line-hr-eyes.gif[/img]');
	var round_size		= new Array('3px','18','','14pt');	
	var nick_size		= new Array('4px','19','','15pt');
	var section_size	= new Array('4px','17','','13pt');
	var resource_size	= new Array('4px','21','','17pt');
	var rentability_size	= new Array('4px','17','','13pt');

//Options of report:)
var color_skin = 1;
var color_forum = 0;

//////////////////////////////////////////////////////////
// Get the text between the begin text and the end text //
//////////////////////////////////////////////////////////


function get_from_to(strLine, begin, end) {

	return strLine.substring(strLine.indexOf(begin) + begin.length , strLine.indexOf(end));
}

////////////////////////////////////////////////////////
// Get the date of the battle and show it more gentle //
////////////////////////////////////////////////////////


function get_battle_date () {
        
        var header = document.getElementsByTagName('td')[0].firstChild.nodeValue;
	var dateArr = new Array();
        dateArr = header.match(/(\d\d)-(\d\d) (\d\d:\d\d:\d\d)/);
        date = dateArr[2] + ' ' + c_of + ' ' + months[parseInt(dateArr[1],10)-1] + c_at + dateArr[3];
        return date;
}

////////////////////////////////////////////////////////
// Get the distance factor from Origin to Destination //
////////////////////////////////////////////////////////


function distance(origin, destination) {
	var dist = 0;
	var originArr = new Array();
	var destinationArr = new Array();
	//Clear the strings
	origin = origin.replace("(","");
	origin = origin.replace(")","");
	destination = destination.replace("(","");
	destination = destination.replace(")","");
	//Convert the cordinates to an array galaxy 0, system 1, planet 2
	originArr = origin.split(":");
	destinationArr = destination.split(":");
	if ( originArr[0] == destinationArr[0]) { 
		//Same galaxy
		if ( originArr[1] == destinationArr[1]) {
			//Same system diferent planet
			dist = Math.abs(originArr[2] - destinationArr[2]) * 5 + 1000;
		}
		else {
			//Diferent System same galaxy
			dist = Math.abs(originArr[1] - destinationArr[1]) * 5 * 19 + 2700;
		}
	}
	else {
		//Diferent Galaxy
		dist = Math.abs(originArr[0] - destinationArr[0]) * 20000;
	}
	return dist;
}
function atackerConsumption (dist, minSpeed, player) {
	var duration = 0;
	var spd = 0;
	var searchPos;
	var basicCosumption = 0;
	var consumption = 0;
	duration = Math.round((35000/10 * Math.sqrt(dist*10/minSpeed) + 10));
	for (var i=0; i<atackerInitialShipsType[player].length; i++) {
		//For each ship in the attack :)
		searchPos = -1;
		for ( var j=0;j<serverShiptsNames.length; j++ ) {
			if (atackerInitialShipsType[player][i] == serverShiptsNames[j]) {
				searchPos = j;	
			 	break;
			}
		}
		if (searchPos != -1) {
			spd = 35000/(duration * 1 - 10) * Math.sqrt(dist*10/shiptsSpeed[searchPos]);
			basicConsumption = shiptsConsumption[searchPos] * atackerInitialShipsNumber[player][i];
			consumption += basicConsumption * dist / 35000 * ((spd / 10) + 1) * ((spd / 10) + 1);
		}
	}
	return Math.round(consumption) + 1;
}
function defenderConsumption (dist, minSpeed, player) {
	var duration = 0;
	var spd = 0;
	var searchPos;
	var basicCosumption = 0;
	var consumption = 0;
	duration = Math.round((35000/10 * Math.sqrt(dist*10/minSpeed) + 10));
	for (var i=0; i<defenderInitialShipsType[player].length; i++) {
		//For each ship in the attack :)
		searchPos = -1;
		for ( var j=0;j<serverShiptsNames.length; j++ ) {
			if (defenderInitialShipsType[player][i] == serverShiptsNames[j]) {
				searchPos = j;	
			 	break;
			}
		}
		if (searchPos != -1) {
			spd = 35000/(duration * 1 - 10) * Math.sqrt(dist*10/shiptsSpeed[searchPos]);
			basicConsumption = shiptsConsumption[searchPos] * defenderInitialShipsNumber[player][i];
			consumption += basicConsumption * dist / 35000 * ((spd / 10) + 1) * ((spd / 10) + 1);
		}
	}
	return Math.round(consumption) + 1;
}



/////////////////////////////////////////////////////////////////
// Get the final flotes from all players and store in a matrix //
/////////////////////////////////////////////////////////////////

function get_final_flotes () {
	var html = document.getElementsByTagName ('center');
	var strLine;
	var player = defenderCount;
 	var i;
	var j;
	var array_controler = 0;
	for (j=0;j< defenderCount; j++) {
		//Initialize the matrix
		defenderFinalShipsNumber[j] = new Array();	
	}
	for (i=html.length -1; i >= html.length - (defenderCount)  ; i--) {
		array_controler = 0;
		//Get defenders flotes
		strLine = html[i].innerHTML;
		player --;
		if (strLine.search(destroytag) != -1) {
			//The defensor was destroyed
			defenderFinalShipsType[player] = '';
			defenderAuxFinalShipsNumber[player] = '';

		}
		else {
			defenderFinalShipsType[player]=get_flote_type_from_string (strLine);
			defenderAuxFinalShipsNumber[player]=get_flote_number_from_string(strLine);
		}

		for (j=0;j<defenderInitialShipsType[player].length;j++) {
				if (defenderFinalShipsType[player][array_controler] == defenderInitialShipsType[player][j]) {
					//The ship type has survivors :)
					defenderFinalShipsNumber[player][j]=defenderAuxFinalShipsNumber[player][array_controler];
					array_controler++;
				}
				else {
					defenderFinalShipsNumber[player][j] = 0;
				}
		}
		//Check for set the destroyed player flote
		if (defenderAuxFinalShipsNumber[player]=='') {
			defenderFinalShipsType[player] = defenderInitialShipsType[player]
			for (j=0;j<defenderInitialShipsNumber[player].length;j++)
			defenderFinalShipsNumber[player][j] = 0; 
		}
	}
	player = atackerCount;
	for (j=0;j< atackerCount; j++) {
		//Initialize the matrix
		atackerFinalShipsNumber[j] = new Array();	
	}
	
	for (i=html.length-(defenderCount+1);i>=html.length-(defenderCount+atackerCount);i--) {
		//Get atackers flotes
		strLine = html[i].innerHTML;
		player --;
		if (strLine.search(destroytag) != -1) {
			//The defensor was destroyed
			atackerFinalShipsType[player] = '';
			atackerFinalShipsNumber[player] = '';

		}
		else {
			atackerFinalShipsType[player] = get_flote_type_from_string (strLine);
			atackerAuxFinalShipsNumber[player] = get_flote_number_from_string (strLine);
		}
		arrayController = 0;
		for (j = 0; j < atackerInitialShipsType[player].length; j++) {
			if (atackerInitialShipsType[player][j] == atackerFinalShipsType[player][arrayController] ) 	{
				atackerFinalShipsNumber[player][j]=atackerAuxFinalShipsNumber[player][arrayController];
				arrayController++;
			}
			else {
				atackerFinalShipsNumber[player][j] = 0;
			}
		}
		//Check for set the destroyed player flote
		
		if (atackerAuxFinalShipsNumber[player]==undefined) {
			atackerFinalShipsType[player] = atackerInitialShipsType[player];
			atackerFinalShipsNumber[player] = new Array();
			for (j=0;j<atackerInitialShipsNumber[player].length;j++) {
				atackerFinalShipsNumber[player][j] = 0; 
			}
		}
	}
}

/////////////////////////////////////////////////////////////////
// Get the initial info about players: flotes, name, tecnology //
/////////////////////////////////////////////////////////////////

function get_names_and_flotes () {
	//Extract the names of attackers and defenders.
	var html = document.getElementsByTagName ('center');
	var strLine;
	for (var i = 1; i <= html.length - 1; i++) {		
		strLine = html[i].innerHTML;
		if ( strLine.search(c_singleAtacker ) != -1 && strLine.search(br) != -1 && strLine.search(destroytag) == -1) {
			//Get only the atacker first aparition
			atackerName[atackerCount] = get_from_to(strLine,c_singleAtacker ,br);
			atackerInitialShipsType[atackerCount]=get_flote_type_from_string(strLine);
			atackerInitialShipsNumber[atackerCount]=get_flote_number_from_string(strLine);
			atackerTecnology[atackerCount] = get_from_to(strLine,br,endtecnologytag);
			atackerCoords[atackerCount] = get_from_to(strLine,'(',')');
			atackerCount++; 
		}
		else if (strLine.search(c_singleDefender ) != -1 && strLine.search(br) != -1 && strLine.search(destroytag) == -1) {
			//Get only the defender first aparition
			defenderName[defenderCount] = get_from_to(strLine,c_singleDefender,br);
			defenderInitialShipsType[defenderCount]=get_flote_type_from_string (strLine);
			defenderInitialShipsNumber[defenderCount]=get_flote_number_from_string (strLine);
			defenderTecnology[defenderCount] = get_from_to(strLine,br,endtecnologytag);
			defenderCoords[defenderCount] = get_from_to(strLine,'(',')');
			defenderCount++; 
		}
		else if (strLine.search(c_singleDefender) != -1 && strLine.search(br) != -1 && strLine.search(destroytag) != -1 && defenderCount == 0) {
			//Get the defender when s/he didn't have float and defenses
			defenderName[defenderCount] = get_from_to(strLine,c_singleDefender,br);
			defenderInitialShipsType[defenderCount] = no_ships_no_defenses_text;
			defenderInitialShipsNumber[defenderCount] = '';
			defenderTecnology[defenderCount]=get_from_to(strLine,br,endtecnology2tag);
			defenderCoords[defenderCount] = get_from_to(strLine,'(',')');
			defenderCount++; 
		}
	}
}

/////////////////////////////////////////////////////////
// Get the flotes type from one report realy useful :D //
/////////////////////////////////////////////////////////

function get_flote_type_from_string (strLine) {
//Get the flote type from a string
	var storeArray = new Array();
	var floteTypeArray = new Array();
	storeArray = strLine.split('<th>');
	for (var i=0; i < storeArray.length && storeArray[i+2].search(amountag) == -1; i++) {
		//Clean the string before store
		floteTypeArray[i] = storeArray[i+2].replace('</th>','').replace('</tr><tr>','');
	}
	return floteTypeArray;
}

////////////////////////////////////////////////////////////
// Get the flotes number from one report really useful :D //
////////////////////////////////////////////////////////////


function get_flote_number_from_string (strLine) {
//Get the flote number from a string
	var storeArray = new Array();
	var floteNumberArray = new Array();
	var array_controller = 0;
	storeArray = strLine.split('<th>');
	for (var i = 0; i < storeArray.length && storeArray[i].search(amountag) == -1; i++) {
		array_controller++;
	}
	array_controller++;
	for (i=array_controller; i < storeArray.length && storeArray[i].search(damagetag) == -1; i++) {
		//Clean the string before store
		floteNumberArray[i-array_controller] = storeArray[i].replace('</th>','').replace('</tr><tr>','').replace(/[.]/g,'');
	}
	return floteNumberArray;
}

//////////////////////////////
// Get the number of rounds //
//////////////////////////////

function get_rounds() {
	var html = document.getElementsByTagName ('tbody');
	var players = (atackerCount+defenderCount);
	var strLines = html[0].innerHTML;
	rounds = strLines.split(roundtag).length -1;
	if (rounds == 0) {
		rounds++;
	}
}

////////////////////////////////////////////////////////////////////////////
// Get general info about the battle like winner, stolen resources etc... //
////////////////////////////////////////////////////////////////////////////


function get_battle_info_result() {
	var html = document.getElementsByTagName ('p');	
	var strLine; 
	for (var i = 0; i <= html.length - 1; i++) {
		strLine = html[i].innerHTML;
		if ((strLine.search(resulttag) != -1) || (strLine.search(drawtag) != -1)) {	
			//Search for win loose or draw zone to recover winner info		
			result_info = get_from_to(strLine,'',br);
			if (result_info.search('!') != -1) {
				result_info = result_info.replace(' ','�') ;
			} 
		}
		if ((strLine.search(resulttag) != -1) && (strLine.search(atacker_result_tag))) {
			//Search for stolenResources when atacker win
			stolenMetal = get_from_to(strLine,stolentag,metaltag).replace(/[.]/g,'');
			stolenCristal = get_from_to(strLine,metaltag,cristaltag).replace(/[.]/g,'');
			stolenDeuterium = get_from_to(strLine,cristaltag,deuteriumtag).replace(/[.]/g,'');
		}
		if (strLine.search(rubbletag) != -1)  {
			//Search for rubble
			rubbleMetal = get_from_to(strLine,rubbletag,metalrubbletag).replace(/[.]/g,'');
			rubbleCristal=get_from_to(strLine,metalrubbletag,cristalrubbletag).replace(/[.]/g,'');
		}
		if (strLine.search(moon_tag) != -1) {
			moon_probability = parseInt(get_from_to(strLine,moon_tag,'%'));
			strLine = strLine+ '<br>';
			moon_and_defenses_info = strLine.substring(strLine.indexOf(cristalrubbletag) + (cristalrubbletag.length +1),strLine.lastIndexOf(br)).replace('<b>','').replace('</b>','');
		}
		if (strLine.search(moon_created_tag) != -1) {
			moon_info = moon_created_tag;
		}
		//Get atacker looses value
		atackerLoosesAmount =  parseInt(get_from_to(strLine,atackerloosestag,unitstag).replace(/[.]/g,''));
		//Get defender looses value
		defenderLoosesAmount = parseInt(strLine.substring(strLine.indexOf(defenderloosestag) + (defenderloosestag.length +1),strLine.lastIndexOf(unitstag)-1).replace(/[.]/g,''));
					
	}
}

///////////////////////////////////////////////
// Get the rentabilitys from the report data //
///////////////////////////////////////////////


function get_rentabilitys () {
	var rubbleAmount = parseInt(rubbleCristal) + parseInt(rubbleMetal);
	if (isNaN(stolenMetal)) {
		stolenMetal = 0;
	}
	if (isNaN(stolenCristal)) {
		stolenCristal = 0;
	}
	if (isNaN(stolenDeuterium)) {
		stolenDeuterium = 0;
	}
	var stolenAmount = parseInt(stolenMetal) + parseInt(stolenCristal) + parseInt(stolenDeuterium);
	if (isNaN(rubbleAmount)) {
		rubbleAmount = 0;
	}
	if (atackerLoosesAmount == 0) {
		atackerRentability = max_rentability;
		atackerRentability2 = max_rentability;
	}
	else {
		if (isNaN(stolenAmount))
		{
			//This must fix the bug when nothing is stolen
			stolenAmount = 0;
		}
		atackerRentability = ((((rubbleAmount + stolenAmount)- atackerLoosesAmount) / atackerLoosesAmount)*100);
		atackerRentability = Math.round(parseInt(atackerRentability)) + '%';	
		atackerRentability2 = (((stolenAmount- atackerLoosesAmount) / atackerLoosesAmount)*100);
		atackerRentability2 = Math.round(parseInt(atackerRentability2)) + '%';	
	}
	if (defenderLoosesAmount == 0 && stolenAmount == 0) {
		defenderRentability = max_rentability;
	}
	else {
		defenderRentability = ((rubbleAmount - (defenderLoosesAmount + stolenAmount)) / (defenderLoosesAmount + stolenAmount))*100;
		defenderRentability = Math.round(parseInt(defenderRentability)) + '%';		
	}
}

////////////////////////////////////////////////////////////////////////
// based in a function from 					      //
// http://www.forosdelweb.com/showthread.php?postid=265553#post265553 //
// put dot as separator :)					      //
////////////////////////////////////////////////////////////////////////

function formatNmb(num){
    var sRes = "";
    var sign = "";
    if (parseInt(num) < 0) {	
	sign = "-";
	num = parseInt(num) * -1	
    }
    //Convert to string and remove espaces
    nNmb = '' + parseInt(num) + '';

    for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++)
     sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;

    return sign + sRes;
} 

////////////////////////////////////
// create the flotes report zone  //
////////////////////////////////////

function createFloteView (fleetType, fleetInitialNumber, fleetFinalNumber, fleetColor, loosesColor, type_preference) {
	//Initizlize the report
	var fleetReport = '';
	for (var position=0; position < fleetType.length; position++) {
			//Calculate type, initial and final fleet row
			type = fleetType[position];
			initialNumber = formatNmb(fleetInitialNumber[position]);
			lostNumber   = formatNmb((fleetInitialNumber[position]-fleetFinalNumber[position]));
			//Set shipt color for initial representation
			fleetReport = fleetReport + fleetType[position] + ' ' +  colorInit[type_preference].replace('#replace', fleetColor);
			fleetReport = fleetReport + initialNumber + colorEnd[type_preference];
			//Set color for shipt looses
			fleetReport = fleetReport + colorInit[type_preference].replace('#replace', loosesColor) + c_lost + lostNumber + colorEnd[type_preference];
			fleetReport = fleetReport + crlf[type_preference];
	}
	return fleetReport;
}

function createPlayerName (playerName, view_coords, color, size, type) {
	//Initialize the string
	nameCreated = '';
	if (view_coords) {
		nameCreated = colorInit[type].replace('#replace', color) + sizeInit[type].replace('#replace',size);
		nameCreated = nameCreated + playerName.replace('(',sizeEnd[type] + colorEnd[type] + boldInit[type] + '[').replace(')', ']') + boldEnd[type] + crlf[type];
	}
	else {
		nameCreated = colorInit[type].replace('#replace', color) + sizeInit[type].replace('#replace',size);
		nameCreated = nameCreated + playerName.split('(')[0] + sizeEnd[type] + colorEnd[type] + crlf[type];	
	}
	return nameCreated;
}

function createTecnology(tecnology, type) {
	tecnologyArr = tecnology.split(' ');
	tecnologyReport = tecnologyArr[0] + ' ' + boldInit[type] + tecnologyArr[1] + boldEnd[type] + ' ' + tecnologyArr[2] + ' ';
	tecnologyReport = tecnologyReport + boldInit[type] + tecnologyArr[3] + boldEnd[type] + ' ' + tecnologyArr[4] + ' ';
	tecnologyReport = tecnologyReport + boldInit[type] + tecnologyArr[5] + boldEnd[type] +crlf[type];
	return tecnologyReport;
}

function estimateLooses (initialShipsType,initialShipsNumber, finalShipsNumber, type, totalLoosesColor, partialLoosesColor, isAtacker) {
	var metalLoosesPlayer = 0;
	var cristalLoosesPlayer = 0;
	var deuteriumLoosesPlayer = 0;
	for (var i=0; i<initialShipsType.length; i++) {
		//Search for initialShipsType in serverShiptsNames to get shipt values
		searchPos = -1;
		for ( var j=0;j<serverShiptsNames.length; j++ ) {
			if (initialShipsType[i] == serverShiptsNames[j]) {
				searchPos = j;	
				 break;
			}
		}
		if (searchPos == -1) {
			//it's a defense :)
			for ( var j=0;j<serverDefensesNames.length; j++ ) {
				if (initialShipsType[i] == serverDefensesNames[j]) {
					searchPos = j;	
				 	break;
				}
			}
			if (searchPos != -1) {
				metalLoosesPlayer = parseInt(metalLoosesPlayer) + parseInt(defensesMetalCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]));
				cristalLoosesPlayer = cristalLoosesPlayer + defensesCristalCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]);
				deuteriumLoosesPlayer = deuteriumLoosesPlayer + defensesDeuteriumCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]);	
			}
		} 
		else {
			metalLoosesPlayer = metalLoosesPlayer + shiptsMetalCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]);
			cristalLoosesPlayer = cristalLoosesPlayer + shiptsCristalCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]);
			deuteriumLoosesPlayer = deuteriumLoosesPlayer + shiptsDeuteriumCost[searchPos]*(initialShipsNumber[i]-finalShipsNumber[i]);
		}
	}
	totalLoose = formatNmb(metalLoosesPlayer + cristalLoosesPlayer + deuteriumLoosesPlayer);
	estimateReport =  c_looses + boldInit[type] + colorInit[type].replace('#replace', totalLoosesColor) + totalLoose + colorEnd[type] + boldEnd[type] + c_units + crlf[type];
	estimateReport = estimateReport + itallyInit[type] +'(';
	estimateReport = estimateReport + colorInit[type].replace('#replace', partialLoosesColor) + formatNmb(metalLoosesPlayer) + colorEnd[type] + c_metalInfo;
	estimateReport = estimateReport + colorInit[type].replace('#replace', partialLoosesColor) + formatNmb(cristalLoosesPlayer) + colorEnd[type] + c_cristalInfo;
	estimateReport = estimateReport + colorInit[type].replace('#replace', partialLoosesColor) + formatNmb(deuteriumLoosesPlayer) + colorEnd[type] + c_deuteriumInfo;
	estimateReport = estimateReport + ')' + itallyEnd[type] + crlf[type];
	if (isAtacker) {
		metalAtackersLooses += parseInt(metalLoosesPlayer);
		cristalAtackersLooses += parseInt(cristalLoosesPlayer);
	 	deuteriumAtackersLooses += parseInt(deuteriumLoosesPlayer);
	} else {
		metalDefendersLooses += parseInt(metalLoosesPlayer);
		cristalDefendersLooses += parseInt(cristalLoosesPlayer);
	 	deuteriumDefendersLooses += parseInt(deuteriumLoosesPlayer);
	}
	return estimateReport;
}

function deuteriumConsumption (shiptsType, shiptsNumber, origin, destination, type, color) {
	var duration = 0;
	var spd = 0;
	var searchPos = -1;
	var basicCosumption = 0;
	var consumption = 0;
	var dist = distance(origin,destination);
	//Get the minimal velocity
	var minSpeed = 100000000;
	for (var i=0; i<shiptsType.length; i++) {
		searchPos = -1;
		for ( var j=0;j<serverShiptsNames.length; j++ ) {
			if (shiptsType[i] == serverShiptsNames[j]) {
				searchPos = j;	
				break;
			}
		}
		if (searchPos != -1) {
			//Get the slowest ship
			if ( parseInt(shiptsSpeed[searchPos]) < parseInt(minSpeed) ) {
				minSpeed = shiptsSpeed[searchPos]
			}
		}
	}
	duration = Math.round((35000/10 * Math.sqrt(dist*10/minSpeed) + 10));
	for (i=0; i<shiptsType.length; i++) {
		//For each ship in the attack :)
		searchPos = -1;
		for ( var j=0;j<serverShiptsNames.length; j++ ) {
			if (shiptsType[i] == serverShiptsNames[j]) {
				searchPos = j;	
			 	break;
			}
		}
		if (searchPos != -1) {
			spd = 35000/(duration * 1 - 10) * Math.sqrt(dist*10/shiptsSpeed[searchPos]);
			basicConsumption = shiptsConsumption[searchPos] * shiptsNumber[i];
			consumption += basicConsumption * dist / 35000 * ((spd / 10) + 1) * ((spd / 10) + 1);
		}
	}
	consumption = formatNmb(Math.round(consumption) + 1);
	return boldInit[type] + c_consumption +  colorInit[type].replace('#replace', color) + consumption + colorEnd[type] + boldEnd[type] + c_units + crlf[type];
}

function resultAndStolen (type, stolenColor) {
	resultAndStolenReport = boldInit[type] + result_info + boldEnd[type] + crlf[type];
	if ((!isNaN(stolenMetal) || !isNaN(stolenCristal) || !isNaN(stolenDeuterium)) && (stolenMetal != 0 || stolenCristal != 0 || stolenDeuterium != 0) ) {
		resultAndStolenReport = resultAndStolenReport + c_stolen + colorInit[type].replace('#replace', stolenColor);
		resultAndStolenReport = resultAndStolenReport + boldInit[type] + formatNmb(stolenMetal) + boldEnd[type] + colorEnd[type];
		resultAndStolenReport = resultAndStolenReport + c_metalInfo + colorInit[type].replace('#replace', stolenColor);
		resultAndStolenReport = resultAndStolenReport + boldInit[type] + formatNmb(stolenCristal) + boldEnd[type] + colorEnd[type];
		resultAndStolenReport = resultAndStolenReport + c_cristalInfo + colorInit[type].replace('#replace', stolenColor);
		resultAndStolenReport = resultAndStolenReport + boldInit[type] + formatNmb(stolenDeuterium) + boldEnd[type] + colorEnd[type];
		resultAndStolenReport = resultAndStolenReport + c_deuteriumInfo + crlf[type];
	}
	return resultAndStolenReport;
}

function partialRentability (positiveResource, negativeResource) {
	var porcentage = Math.round(((positiveResource - negativeResource)/negativeResource)*100);
	if (isNaN(porcentage)) {
		porcentage = 0+ '%';
	}
	else if (Math.abs(porcentage) == Infinity) {
		if ( porcentage < 0 ) {
			porcentage = min_rentability;
		} 
		else {
			porcentage = max_rentability;
		}
	}
	else {
		porcentage = porcentage + '%';
	}
	return porcentage;
}

function do_old_report (type,color_set, view_tecnology, view_coords, view_partials, view_deuterium) {
	var resultReport = '';
	//Print date
	resultReport = boldInit[type] + c_battleInit + date + boldEnd[type] + crlf[type];
	//Print rounds;
	resultReport = resultReport + c_duration + sizeInit[type].replace('#replace',round_size[type]) + boldInit[type] + rounds + boldEnd[type] + sizeEnd[type] + c_rounds; 
	resultReport = resultReport + crlf[type] + crlf[type];
	resultReport = resultReport + boldInit[type] + sizeInit[type].replace('#replace',section_size[type]);

	//Print atackers section
	if (atackerCount > 1) {
		resultReport = resultReport + c_multipleAtacker;
	}
	else {
		resultReport = resultReport +  c_singleAtacker;
	}
	resultReport = resultReport + ' (' + atackerCount +')'+ sizeEnd[type] + boldEnd[type] + crlf[type];
	//Print atacker fleets
	for (var i=0; i<atackerName.length; i++) {
		resultReport = resultReport + createPlayerName(atackerName[i], view_coords, atackerNameColor[color_set], nick_size[type], type);
		if (view_tecnology) {
			resultReport = resultReport + createTecnology (atackerTecnology[i], type);
		}
		resultReport = resultReport + createFloteView(atackerInitialShipsType[i], atackerInitialShipsNumber[i],atackerFinalShipsNumber[i],fleetAtackerColor[color_set], infoColor[color_set], type);
		resultReport = resultReport + crlf[type];
		if (view_partials) {
			resultReport = resultReport + estimateLooses(atackerInitialShipsType[i],atackerInitialShipsNumber[i], atackerFinalShipsNumber[i], type, totalAtackerLoosesColor[color_set], partialAtackerLoosesColor[color_set], true);
		}
		if (view_deuterium) {
			resultReport = resultReport + deuteriumConsumption(atackerInitialShipsType[i], atackerInitialShipsNumber[i], atackerCoords[i], defenderCoords[0],type, atackerConsumptionColor[color_set]);
		}
		if (view_partials || view_deuterium) {
			resultReport = resultReport + crlf[type];
		}
	}
	
	//Print defenders section
	resultReport = resultReport + boldInit[type] + sizeInit[type].replace('#replace',section_size[type]);
	if (defenderCount > 1) {
		resultReport = resultReport + c_multipleDefender;
	}
	else {
		resultReport = resultReport +  c_singleDefender;
	}
	resultReport = resultReport + ' (' + defenderCount +')'+ sizeEnd[type] + boldEnd[type] + crlf[type];
	//Print defender fleets
	for (var i=0; i<defenderName.length; i++) {
		resultReport = resultReport + createPlayerName(defenderName[i], view_coords, defenderNameColor[color_set], nick_size[type], type);
		if (view_tecnology) {
			resultReport = resultReport + createTecnology (defenderTecnology[i], type);
		}
		if (defenderInitialShipsType[i] != no_ships_no_defenses_text) {
			resultReport = resultReport + createFloteView(defenderInitialShipsType[i], defenderInitialShipsNumber[i],defenderFinalShipsNumber[i],fleetDefenderColor[color_set],infoColor[color_set], type);
		} else {
			//Defender has nothing
			resultReport = resultReport + no_ships_no_defenses_text + crlf[type];
		}
		resultReport = resultReport + crlf[type];
		if (view_partials) {
			resultReport = resultReport + estimateLooses(defenderInitialShipsType[i],defenderInitialShipsNumber[i], defenderFinalShipsNumber[i], type, totalDefenderLoosesColor[color_set], partialDefenderLoosesColor[color_set], false);
		}
		if (view_deuterium && i !=0) {
			resultReport = resultReport + deuteriumConsumption(defenderInitialShipsType[i], defenderInitialShipsNumber[i], defenderCoords[i], defenderCoords[0],type, defenderConsumptionColor[color_set]);
		}
		if (view_partials || (view_deuterium && i !=0)) {
			resultReport = resultReport + crlf[type];
		}
	}
	resultReport = resultReport + hr[type];
	resultReport = resultReport + crlf[type];
	resultReport = resultReport + resultAndStolen(type, stolenColor[color_set]);
	resultReport = resultReport + crlf[type];
	//Looses
	if (atackerCount > 1) {
		resultReport = resultReport + c_old_plooses + c_multipleAtacker;
	} 
	else {
		resultReport = resultReport + c_old_slooses + c_singleAtacker;
	}
	resultReport = resultReport + ': ' + sizeInit[type].replace('#replace', resource_size[type]) + colorInit[type].replace('#replace', totalAtackerLoosesColor[color_set])  + formatNmb(atackerLoosesAmount) + colorEnd[type] + sizeEnd[type] + c_units + crlf[type];
	if (defenderCount > 1) {
		resultReport = resultReport + c_old_plooses + c_multipleDefender;
	} 
	else {
		resultReport = resultReport + c_old_slooses + c_singleDefender;
	}
	resultReport = resultReport + ': ' + sizeInit[type].replace('#replace', resource_size[type]) + colorInit[type].replace('#replace', totalDefenderLoosesColor[color_set])  + formatNmb(defenderLoosesAmount) + colorEnd[type] + sizeEnd[type] + c_units + crlf[type];
	//total looses
	resultReport = resultReport + c_totalLooses + boldInit[type] + sizeInit[type].replace('#replace',rentability_size[type]);
	resultReport = resultReport + formatNmb(atackerLoosesAmount + defenderLoosesAmount);
	resultReport = resultReport + sizeEnd[type] + boldEnd[type] + c_units + crlf[type] + crlf[type];
	//Rubles recicles
	if ((parseInt(rubbleCristal)+parseInt(rubbleMetal)) == 0) {
		resultReport = resultReport + boldInit[type] + c_rubbles + boldEnd[type] + crlf[type];
	}
	else {
		resultReport = resultReport + boldInit[type] + c_rubbles + boldEnd[type] + ' (';
		resultReport = resultReport + formatNmb(Math.floor((20000+parseInt(rubbleMetal)+parseInt(rubbleCristal))/20000));
		resultReport = resultReport + ' ' + serverShiptsNames[7] + ')' + crlf[type];
		
	}
	
	//rubbles partials
	resultReport = resultReport + c_metalRubble +  colorInit[type].replace('#replace', infoColor[color_set])  + boldInit[type];
	resultReport = resultReport + formatNmb(rubbleMetal) + boldEnd[type] + colorEnd[type] + c_units + crlf[type];
	resultReport = resultReport + c_cristalRubble + colorInit[type].replace('#replace', infoColor[color_set]) + boldInit[type];
	resultReport = resultReport + formatNmb(rubbleCristal) + boldEnd[type] + colorEnd[type] + c_units + crlf[type];

	//Win and looses
	resultReport = resultReport + crlf[type] + boldInit[type] + c_winAndLost + boldEnd[type] + crlf[type];
	if (atackerCount == 1) {
		resultReport = resultReport + c_old_rentabilitysAtacker;
	}
	else {
		resultReport = resultReport + c_old_rentabilitypAtacker;
	}
	resultReport = resultReport + sizeInit[type].replace('#replace', rentability_size[type]) + boldInit[type] + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]) + atackerRentability + colorEnd[type] + boldEnd[type] + sizeEnd[type] + crlf[type];
	rentability = formatNmb((parseInt(rubbleMetal)+parseInt(rubbleCristal)+parseInt(stolenMetal)+parseInt(stolenCristal)+parseInt(stolenDeuterium))-atackerLoosesAmount);
	resultReport = resultReport + c_old_atacker + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]) + ' ' + c_old_with + colorEnd[type] + '/' + colorInit[type].replace('#replace', totalAtackerLoosesColor[color_set]) + c_old_without + colorEnd[type] + ' Reciclaje: '  + sizeInit[type].replace('#replace', rentability_size[type]) + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]) + rentability + colorEnd[type] + '/';
	rentability = formatNmb((parseInt(stolenMetal)+parseInt(stolenCristal)+parseInt(stolenDeuterium))-atackerLoosesAmount);
 	resultReport = resultReport + colorInit[type].replace('#replace', totalAtackerLoosesColor[color_set]) + rentability + colorEnd[type] + sizeEnd[type] + c_units + crlf[type];

	if (defenderCount > 1) {
		resultReport = resultReport + c_old_rentabilitypDefender;
	} 
	else {
		resultReport = resultReport + c_old_rentabilitysDefender;
	}
	rentability = formatNmb((parseInt(rubbleMetal) + parseInt(rubbleCristal) - stolenMetal - stolenCristal - stolenDeuterium)-parseInt(defenderLoosesAmount));
	resultReport = resultReport + sizeInit[type].replace('#replace', rentability_size[type]) + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]) + rentability;
	resultReport = resultReport + colorEnd[type] + sizeEnd[type] + c_units + crlf[type];

	//Moon and defenses info :)

	if (moon_probability > 0) {
		resultReport = resultReport + moon_and_defenses_info.replace(moon_probability + ' %', sizeInit[type].replace('#replace',round_size[type]) + boldInit[type] +moon_probability+'%'+boldEnd[type] + sizeEnd[type]).replace(moon_created_tag,boldInit[type] + moon_created_tag + boldEnd[type]).replace(/<br>/g,crlf[type]);
	}
	else {
		resultReport = resultReport + moon_and_defenses_info.replace(/<br>/g,crlf[type]);
	}
	resultReport = resultReport + crlf[type] + crlf[type] + added_link[type];
	for (i = 0; i < userShiptsNames.length; i ++) {
		reg = new RegExp(serverShiptsNames[i], "g")
		resultReport = resultReport.replace(reg,userShiptsNames[i]);
		reg = null;
	}
	for (i = 0; i < userDefensesNames.length; i ++) {
		reg = new RegExp(serverDefensesNames[i], "g")
		resultReport = resultReport.replace(reg,userDefensesNames[i]);
		reg = null;
	}
	//Reset the looses :)
	cristalAtackersLooses = 0;
	metalAtackersLooses = 0;
	deuteriumAtackersLooses = 0;
	metalDefendersLooses = 0;
	cristalDefenderLooses = 0;
	deuteriumDefendersLooses = 0;
	return resultReport;
}

function do_report (type,color_set, view_tecnology, view_coords, view_partials, view_deuterium) {

	var resultReport = '';
	//Print date
	resultReport = boldInit[type] + c_battleInit + date + boldEnd[type] + crlf[type];
	//Print rounds;
	resultReport = resultReport + c_duration + sizeInit[type].replace('#replace',round_size[type]) + boldInit[type] + rounds + boldEnd[type] + sizeEnd[type] + c_rounds; 
	resultReport = resultReport + crlf[type] + crlf[type];
	resultReport = resultReport + boldInit[type] + sizeInit[type].replace('#replace',section_size[type]);

	//Print atackers section
	if (atackerCount > 1) {
		resultReport = resultReport + c_multipleAtacker;
	}
	else {
		resultReport = resultReport +  c_singleAtacker;
	}
	resultReport = resultReport + ' (' + atackerCount +')'+ sizeEnd[type] + boldEnd[type] + crlf[type];
	//Print atacker fleets
	for (var i=0; i<atackerName.length; i++) {
		resultReport = resultReport + createPlayerName(atackerName[i], view_coords, atackerNameColor[color_set], nick_size[type], type);
		if (view_tecnology) {
			resultReport = resultReport + createTecnology (atackerTecnology[i], type);
		}
		resultReport = resultReport + createFloteView(atackerInitialShipsType[i], atackerInitialShipsNumber[i],atackerFinalShipsNumber[i],fleetAtackerColor[color_set], infoColor[color_set], type);
		resultReport = resultReport + crlf[type];
		if (view_partials) {
			resultReport = resultReport + estimateLooses(atackerInitialShipsType[i],atackerInitialShipsNumber[i], atackerFinalShipsNumber[i], type, totalAtackerLoosesColor[color_set], partialAtackerLoosesColor[color_set], true);
		}
		if (view_deuterium) {
			resultReport = resultReport + deuteriumConsumption(atackerInitialShipsType[i], atackerInitialShipsNumber[i], atackerCoords[i], defenderCoords[0],type, atackerConsumptionColor[color_set]);
		}
		if (view_partials || view_deuterium) {
			resultReport = resultReport + crlf[type];
		}
	}
	
	//Print defenders section
	resultReport = resultReport + boldInit[type] + sizeInit[type].replace('#replace',section_size[type]);
	if (defenderCount > 1) {
		resultReport = resultReport + c_multipleDefender;
	}
	else {
		resultReport = resultReport +  c_singleDefender;
	}
	resultReport = resultReport + ' (' + defenderCount +')'+ sizeEnd[type] + boldEnd[type] + crlf[type];
	//Print defender fleets
	for (var i=0; i<defenderName.length; i++) {
		resultReport = resultReport + createPlayerName(defenderName[i], view_coords, defenderNameColor[color_set], nick_size[type], type);
		if (view_tecnology) {
			resultReport = resultReport + createTecnology (defenderTecnology[i], type);
		}
		if (defenderInitialShipsType[i] != no_ships_no_defenses_text) {
			resultReport = resultReport + createFloteView(defenderInitialShipsType[i], defenderInitialShipsNumber[i],defenderFinalShipsNumber[i],fleetDefenderColor[color_set],infoColor[color_set], type);
		} else {
			//Defender has nothing
			resultReport = resultReport + no_ships_no_defenses_text + crlf[type];
		}
		resultReport = resultReport + crlf[type];
		if (view_partials) {
			resultReport = resultReport + estimateLooses(defenderInitialShipsType[i],defenderInitialShipsNumber[i], defenderFinalShipsNumber[i], type, totalDefenderLoosesColor[color_set], partialDefenderLoosesColor[color_set], false);
		}
		if (view_deuterium && i !=0) {
			resultReport = resultReport + deuteriumConsumption(defenderInitialShipsType[i], defenderInitialShipsNumber[i], defenderCoords[i], defenderCoords[0],type, defenderConsumptionColor[color_set]);
		}
		if (view_partials || (view_deuterium && i !=0)) {
			resultReport = resultReport + crlf[type];
		}
	}
	resultReport = resultReport + hr[type];
	resultReport = resultReport + crlf[type];
	resultReport = resultReport + resultAndStolen(type, stolenColor[color_set]);
	resultReport = resultReport + crlf[type];

	//ATACKER
	resultReport = resultReport + sizeInit[type].replace('#replace',rentability_size[type]);
	if (atackerCount > 1) {
		resultReport = resultReport + c_multipleAtacker;
	} 
	else {
		resultReport = resultReport + c_singleAtacker;
	}
	resultReport = resultReport + sizeEnd[type] + crlf[type];
	resultReport = resultReport + boldInit[type] + c_looses + boldEnd[type] + sizeInit[type].replace('#replace',round_size[type]);
	resultReport = resultReport + colorInit[type].replace('#replace', totalAtackerLoosesColor[color_set])  + formatNmb(atackerLoosesAmount) + colorEnd[type];
	resultReport = resultReport + sizeEnd[type] + c_units;
	resultReport = resultReport + crlf[type]; 
	
	//Atackers rentability with recicle
	resultReport = resultReport + boldInit[type] + c_recicleRentability +  ' ' +  sizeInit[type].replace('#replace',rentability_size[type]);
	rentability = formatNmb((parseInt(rubbleMetal)+parseInt(rubbleCristal)+parseInt(stolenMetal)+parseInt(stolenCristal)+parseInt(stolenDeuterium))-atackerLoosesAmount);
	resultReport = resultReport + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]) + rentability + ' (' + atackerRentability  + ') ';
	
	resultReport = resultReport + colorEnd[type] + sizeEnd[type] + boldEnd[type] + c_units + crlf[type];
	if (view_partials) {
			//Metal
			positive = parseInt(stolenMetal)+parseInt(rubbleMetal);
			negative = parseInt(metalAtackersLooses);
			resultReport = resultReport +  itallyInit[type] + c_metalRubble + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(positive-negative)  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Cristal
			positive = parseInt(stolenCristal)+parseInt(rubbleCristal);
			negative = parseInt(cristalAtackersLooses);
			resultReport = resultReport +  itallyInit[type] + c_cristalRubble + colorInit[type].replace('#replace', atackerWithRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(parseInt(positive) - parseInt(negative))  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
	}
	//Atackers rentability without recicle
	resultReport = resultReport + boldInit[type] + c_notRecicleRentability +  ' ' +  sizeInit[type].replace('#replace',rentability_size[type]);
	rentability = formatNmb((parseInt(stolenMetal)+parseInt(stolenCristal)+parseInt(stolenDeuterium))-atackerLoosesAmount);
	resultReport = resultReport + colorInit[type].replace('#replace', atackerWithOutRecicleColor[color_set]) + rentability + ' (' + atackerRentability2  + ') ';
	resultReport = resultReport + colorEnd[type] + sizeEnd[type] + boldEnd[type] + c_units + crlf[type];
	if (view_partials) {
			//Metal
			positive = parseInt(stolenMetal);
			negative = parseInt(metalAtackersLooses);
			resultReport = resultReport +  itallyInit[type] + c_metalRubble + colorInit[type].replace('#replace', atackerWithOutRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(positive-negative)  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Cristal
			positive = parseInt(stolenCristal);
			negative = parseInt(cristalAtackersLooses);
			resultReport = resultReport +  itallyInit[type] + c_cristalRubble + colorInit[type].replace('#replace', atackerWithOutRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(parseInt(positive) - parseInt(negative))  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Deuterium
			positive = parseInt(stolenDeuterium);
			negative = parseInt(deuteriumAtackersLooses);
			resultReport = resultReport +  itallyInit[type] + c_deuteriumRubble + colorInit[type].replace('#replace', atackerWithOutRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(parseInt(positive) - parseInt(negative))  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
	}
	resultReport = resultReport + crlf[type];
	//DEFEDER
	resultReport = resultReport + sizeInit[type].replace('#replace',rentability_size[type]);
	if (defenderCount > 1) {
		resultReport = resultReport + c_multipleDefender;
	} 
	else {
		resultReport = resultReport + c_singleDefender;
	}
	resultReport = resultReport + sizeEnd[type] + crlf[type];
	resultReport = resultReport + boldInit[type] + c_looses + boldEnd[type] + sizeInit[type].replace('#replace',round_size[type]);
	resultReport = resultReport + colorInit[type].replace('#replace', totalDefenderLoosesColor[color_set])  + formatNmb(defenderLoosesAmount) + colorEnd[type];
	resultReport = resultReport + sizeEnd[type] + c_units;
	resultReport = resultReport + crlf[type]; 

	//Defenders rentability with recicle
	resultReport = resultReport + boldInit[type] + c_recicleRentability +  ' ' +  sizeInit[type].replace('#replace',rentability_size[type]);
	rentability = formatNmb((parseInt(rubbleMetal) + parseInt(rubbleCristal) - stolenMetal - stolenCristal - stolenDeuterium)-parseInt(defenderLoosesAmount));
	resultReport = resultReport + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]) + rentability + ' (' + defenderRentability  + ') ';
	resultReport = resultReport + colorEnd[type] + sizeEnd[type] + boldEnd[type] + c_units + crlf[type];
	if (view_partials) {
			//Metal
			positive = 0;
			negative = 0;
			positive = parseInt(rubbleMetal);
			negative = parseInt(stolenMetal)+parseInt(metalDefendersLooses);
			resultReport = resultReport +  itallyInit[type] + c_metalRubble + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(positive-negative)  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Cristal
			positive = 0;
			negative = 0;
			positive = parseInt(rubbleCristal);
			negative = parseInt(stolenCristal)+parseInt(cristalDefendersLooses);
			resultReport = resultReport +  itallyInit[type] + c_cristalRubble + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(positive - negative)  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
			//Deuterium
			positive = 0;
			negative = 0;
			negative = parseInt(deuteriumDefendersLooses)+parseInt(stolenDeuterium);
			resultReport = resultReport +  itallyInit[type] + c_deuteriumRubble + colorInit[type].replace('#replace', defenderWithRecicleColor[color_set]);
			resultReport = resultReport + formatNmb(parseInt(positive) - parseInt(negative))  + ' (' + partialRentability(positive,negative) + ') ';
			resultReport = resultReport + colorEnd[type] + itallyEnd[type] + crlf[type];
	}
	resultReport = resultReport + crlf[type]; 
	
	//Total Looses
	resultReport = resultReport + c_totalLooses + boldInit[type] + sizeInit[type].replace('#replace',rentability_size[type]);
	resultReport = resultReport + formatNmb(atackerLoosesAmount + defenderLoosesAmount);
	resultReport = resultReport + sizeEnd[type] + boldEnd[type] + c_units + crlf[type] 
	resultReport = resultReport + crlf[type];
	
	//Rubles recicles
	if ((parseInt(rubbleCristal)+parseInt(rubbleMetal)) == 0) {
		resultReport = resultReport + boldInit[type] + c_rubbles + boldEnd[type] + crlf[type];
	}
	else {
		resultReport = resultReport + boldInit[type] + c_rubbles + boldEnd[type] + ' (';
		resultReport = resultReport + formatNmb(Math.floor((20000+parseInt(rubbleMetal)+parseInt(rubbleCristal))/20000));
		resultReport = resultReport + ' ' + serverShiptsNames[7] + ')' + crlf[type];
		
	}
	
	//rubbles partials
	resultReport = resultReport + c_metalRubble +  colorInit[type].replace('#replace', infoColor[color_set])  + boldInit[type];
	resultReport = resultReport + formatNmb(rubbleMetal) + boldEnd[type] + colorEnd[type] + c_units + crlf[type];
	resultReport = resultReport + c_cristalRubble + colorInit[type].replace('#replace', infoColor[color_set]) + boldInit[type];
	resultReport = resultReport + formatNmb(rubbleCristal) + boldEnd[type] + colorEnd[type] + c_units + crlf[type];

	//Moon and defenses info :)

	if (moon_probability > 0) {
		resultReport = resultReport + moon_and_defenses_info.replace(moon_probability + ' %', sizeInit[type].replace('#replace',round_size[type]) + boldInit[type] +moon_probability+'%'+boldEnd[type] + sizeEnd[type]).replace(moon_created_tag,boldInit[type] + moon_created_tag + boldEnd[type]).replace(/<br>/g,crlf[type]);
	}
	else {
		resultReport = resultReport + moon_and_defenses_info.replace(/<br>/g,crlf[type]);
	}
	resultReport = resultReport + crlf[type] + crlf[type] + added_link[type];
	for (i = 0; i < userShiptsNames.length; i ++) {
		reg = new RegExp(serverShiptsNames[i], "g")
		resultReport = resultReport.replace(reg,userShiptsNames[i]);
		reg = null;
	}
	for (i = 0; i < userDefensesNames.length; i ++) {
		reg = new RegExp(serverDefensesNames[i], "g")
		resultReport = resultReport.replace(reg,userDefensesNames[i]);
		reg = null;
	}
	//Reset the looses :)
	cristalAtackersLooses = 0;
	metalAtackersLooses = 0;
	deuteriumAtackersLooses = 0;
	metalDefendersLooses = 0;
	cristalDefendersLooses = 0;
	deuteriumDefendersLooses = 0;
	return resultReport;
}

function set_tecnology() {
	GM_setValue("tecnology", document.getElementById("tecnology").checked());
}

/////////////////////////////////////////////////////////////////
// Call parser functions useful to take decisions about report //
// like color, tecnology, and coords			       //
/////////////////////////////////////////////////////////////////


function get_parts_from_web () {
	original_body = document.body.innerHTML;
	date = get_battle_date();
	get_names_and_flotes();
	get_final_flotes ();
	get_rounds();
	get_battle_info_result();
	get_rentabilitys ();
	create_view();
}
function create_view() {
	//Call functions to parse the battle report
	report = "";
	var report_text = "";
	var report_div = document.createElement("div");
	report_div.style.marginLeft = '15px';
	report_div.style.marginTop = '15px';
	var config_div = document.createElement("div");
	var report_input = document.createElement("textarea");
	report_input.id = "forum_compactation";
	report_input.name = "forum_text";
	if (atackerName.length > 0) {
		if (GM_getValue('hide_report')) {
			document.body.innerHTML = '';
		}
		else {
			document.body.innerHTML = original_body;
		}
		try {
			if(GM_getValue('old_favour')) {
				if (GM_getValue('light_forum')) {
					report = do_old_report(GM_getValue('forum_type'),0,GM_getValue('tecnology'),GM_getValue('coords'), GM_getValue('partials') , GM_getValue('deuterium'));
				}
				else {
					report = do_old_report(GM_getValue('forum_type'),1,GM_getValue('tecnology'),GM_getValue('coords'), GM_getValue('partials') , GM_getValue('deuterium'));
				}
			}	
			else {
				if (GM_getValue('light_forum')) {
					report = do_report(GM_getValue('forum_type'),0,GM_getValue('tecnology'),GM_getValue('coords'), GM_getValue('partials') , GM_getValue('deuterium'));
				}
				else {
					report = do_report(GM_getValue('forum_type'),1,GM_getValue('tecnology'),GM_getValue('coords'), GM_getValue('partials'), GM_getValue('deuterium'));
				}
			}
		}
		catch (error) {
			
			report = do_report(1,1,false,false,false, false);
		}
		report_input.color = 'white';
		report_input.innerHTML =report;
		document.body.insertBefore(report_input,  document.body.firstChild);
		// first type, second color
		try {
			if(GM_getValue('old_favour')) {
				if (GM_getValue('light_skin')) {
					report = do_old_report(0,0,true,true, GM_getValue('partials'), GM_getValue('deuterium'));
				}
				else {
					report = do_old_report(0,1,true,true, GM_getValue('partials'), GM_getValue('deuterium'));
				}
			}	
			else {
				if (GM_getValue('light_skin')) {
					report = do_report(0,0,true,true, GM_getValue('partials'), GM_getValue('deuterium'));
				}
				else {
					report = do_report(0,1,true,true, GM_getValue('partials'), GM_getValue('deuterium'));
				}
			}
		}
		catch (error) {
			report = do_report(0,1,true,true, true, true);
		}
		
		report_div.color = 'white';
		report_div.innerHTML = report;
		document.body.insertBefore(report_div,  document.body.firstChild);

		//Show old_flavor check
		var old_favour = document.createElement("input");
		old_favour.type="checkbox";
		try {
			old_favour.checked = GM_getValue('old_favour');
		}
		catch (err) {
			old_favour.checked = false;
		}
		old_favour.addEventListener('click',function(ev) {
			GM_setValue('old_favour',this.checked);
			create_view();
		},true);
		var old_favour_span = document.createElement("span");
		old_favour_span.innerHTML = c_old_favour;
		config_div.appendChild(old_favour);
		config_div.appendChild(old_favour_span);

		//Show partials check
		var view_partials = document.createElement("input");
		view_partials.type="checkbox";
		try {
			view_partials.checked = GM_getValue('partials');
		}
		catch (err) {
			view_partials.checked = true;
		}
		view_partials.addEventListener('click',function(ev) {
			GM_setValue('partials',this.checked);
			create_view();
		},true);
		var partials_span = document.createElement("span");
		partials_span.innerHTML = 'ver parciales<br>';
		config_div.appendChild(view_partials);
		config_div.appendChild(partials_span);

		//Show deuterium check
		var view_deuterium = document.createElement("input");
		view_deuterium.type="checkbox";
		try {
			view_deuterium.checked = GM_getValue('deuterium');
		}
		catch (err) {
			view_deuterium.checked = true;
		}
		view_deuterium.addEventListener('click',function(ev) {
			GM_setValue('deuterium',this.checked);
			create_view();
		},true);
		var deuterium_span = document.createElement("span");
		deuterium_span.innerHTML = c_showDeuterium;
		config_div.appendChild(view_deuterium);
		config_div.appendChild(deuterium_span);


		//Show tech check
		var view_tecnology = document.createElement("input");
		view_tecnology.type="checkbox";
		try {
			view_tecnology.checked = GM_getValue('tecnology');
		}
		catch (err) {
			view_tecnology.checked = true;
		}
		view_tecnology.addEventListener('click',function(ev) {
			GM_setValue('tecnology',this.checked);
			create_view();
		},true);
		var tecnology_span = document.createElement("span");
		tecnology_span.innerHTML = c_showTech;
		config_div.appendChild(view_tecnology);
		config_div.appendChild(tecnology_span);


		var view_coords = document.createElement("input");
		view_coords.type="checkbox";
		try {
			view_coords.checked = GM_getValue('coords');
		}
		catch (err) {
			view_coords.checked = true;
		}
		view_coords.addEventListener('click',function(ev) {
			GM_setValue('coords',this.checked);
			create_view();
		},true);
		var coords_span = document.createElement("span");
		coords_span.innerHTML = c_showCoords;
		config_div.appendChild(view_coords);
		config_div.appendChild(coords_span);
		report_input.parentNode.insertBefore(config_div,report_input.nextSibling);
		var light_forum = document.createElement("input");
		light_forum.type="checkbox";
		try {
			light_forum.checked = GM_getValue('light_forum');
		}
		catch (err) {
			light_forum.checked = true;
		}
		light_forum.addEventListener('click',function(ev) {
			GM_setValue('light_forum',this.checked);
			create_view();
		},true);
		var forum_span = document.createElement("span");
		forum_span.innerHTML = c_forumSkin;
		config_div.appendChild(light_forum);
		config_div.appendChild(forum_span);
		var light_skin = document.createElement("input");
		light_skin.type="checkbox";
		try {
			light_skin.checked = GM_getValue('light_skin');
		}
		catch (err) {
			light_skin.checked = true;
		}
		light_skin.addEventListener('click',function(ev) {
			GM_setValue('light_skin',this.checked);
			create_view();
		},true);
		var skin_span = document.createElement("span");
		skin_span.innerHTML = c_ogameSkin;
		config_div.appendChild(light_skin);
		config_div.appendChild(skin_span);
		var forum_type0 = document.createElement("input");
		forum_type0.type="radio";
		forum_type0.name="forum_type";
		try {
			if (GM_getValue('forum_type') == 0)
				forum_type0.checked = true;
		}
		catch (err) {
			forum_type0.checked = true;
		}
		forum_type0.addEventListener('click',function(ev) {
			GM_setValue('forum_type',0);
			create_view();
		},true);
		var forum_type0_span = document.createElement("span");
		forum_type0_span.innerHTML = c_forumType0;
		config_div.appendChild(forum_type0);
		config_div.appendChild(forum_type0_span);
		var forum_type1 = document.createElement("input");
		forum_type1.type="radio";
		forum_type1.name="forum_type";
		try {
			if (GM_getValue('forum_type') == 1)
				forum_type1.checked = true;
		}
		catch (err) {
			forum_type1.checked = true;
		}
		forum_type1.addEventListener('click',function(ev) {
			GM_setValue('forum_type',1);
			create_view();
		},true);
		var forum_type1_span = document.createElement("span");
		forum_type1_span.innerHTML = c_forumType1;
		config_div.appendChild(forum_type1);
		config_div.appendChild(forum_type1_span);
		var forum_type3 = document.createElement("input");
		forum_type3.type="radio";
		forum_type3.name="forum_type";
		try {
			if (GM_getValue('forum_type') == 3)
				forum_type3.checked = true;
		}
		catch (err) {
			forum_type3.checked = true;
		}
		forum_type3.addEventListener('click',function(ev) {
			GM_setValue('forum_type',3);
			create_view();
		},true);
		var forum_type3_span = document.createElement("span");
		forum_type3_span.innerHTML = c_forumType3;
		config_div.appendChild(forum_type3);
		config_div.appendChild(forum_type3_span);
		var forum_type2 = document.createElement("input");
		forum_type2.type="radio";
		forum_type2.name="forum_type";
		try {
			if (GM_getValue('forum_type') == 2)
				forum_type2.checked = true;
		}
		catch (err) {
			forum_type2.checked = true;
		}
		forum_type2.addEventListener('click',function(ev) {
			GM_setValue('forum_type',2);
			create_view();
		},true);
		var forum_type2_span = document.createElement("span");
		forum_type2_span.innerHTML = c_forumType2;
		config_div.appendChild(forum_type2);
		config_div.appendChild(forum_type2_span);
		var hide_report = document.createElement("input");
		hide_report.type="checkbox";
		hide_report.name="hide_report";
		try {
			hide_report.checked = GM_getValue('hide_report');
		}
		catch (err) {
			hide_report.checked = true;
		}
		hide_report.addEventListener('click',function(ev) {
			GM_setValue('hide_report',this.checked);
			create_view();
		},true);
		var hide_report_span = document.createElement("span");
		hide_report_span.innerHTML = c_showReport;
		config_div.appendChild(hide_report);
		config_div.appendChild(hide_report_span);
		report_input.parentNode.insertBefore(config_div,report_input.nextSibling);
	}
}


////////////////
// BEGIN HERE //
////////////////

get_parts_from_web ();
document.getElementById("forum_compactation").select();





