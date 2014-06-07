// ==UserScript==
// @name           OGame ressource compatible Ogame 0.77b
// @namespace      http://www.turl.com.ar/ Translate to French by senyl
// @description    Affiche un tableau dans la page ressource, indique utilisation hangars et production.
// @include        http://*.ogame.*/game/index.php?page=resources*
// ==/UserScript==

   function formatNmb(numero)
   {
	  var nNmb = String(numero); 
    var sRes = "";
    for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++)
     sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;
    return sRes;
   }
   

padre = document.getElementById('content');
recursos = document.getElementById('resources');
var T_Recursos = padre.getElementsByTagName("td");
var T_Recursos2 = recursos.getElementsByTagName("td");
var Metal = T_Recursos2[10].innerHTML.replace(/\./g,'');
var Cristal = T_Recursos2[11].innerHTML.replace(/\./g,'');
var Deut = T_Recursos2[12].innerHTML.replace(/\./g,'');


var PMetal = T_Recursos[10].innerHTML.replace(/\./g,'');
var PCristal = T_Recursos[11].innerHTML.replace(/\./g,'');
var PDeut = T_Recursos[12].innerHTML.replace(/\./g,'');

var AlmM = T_Recursos[5].innerHTML.replace(/\./g,'');
var AlmC = T_Recursos[6].innerHTML.replace(/\./g,'');
var AlmD = T_Recursos[7].innerHTML.replace(/\./g,'');
AlmM = AlmM.replace(/k/,'000');
AlmC = AlmC.replace(/k/,'000');
AlmD = AlmD.replace(/k/,'000');


if (Metal.indexOf('<font')!=-1) {
	Metal = Metal.substring(6, Metal.indexOf('</font'));
}
if (Cristal.indexOf('<font')!=-1) {
	Cristal = Cristal.substring(6, Cristal.indexOf('</font'));
}
if (Deut.indexOf('<font')!=-1) {
	Deut = Deut.substring(6, Deut.indexOf('</font'));
}

Metal = eval(Metal);
Cristal = eval(Cristal);
Deut = eval(Deut);

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
var T_Factor = /facteur(.)*\:(.)*[0-9.]/gi.exec(document.body.innerHTML);

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
'<th>Niveau de Production</th>'+
'<th>'+Factor+'%</th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div style="background-color: '+(Factor < 100 ? '#C00000' : '#00C000' )+'; width: '+FactorPorc+'px;">&nbsp;</div></div></th>'+
'</tr></table><br />';
	
	var CuentaRec = document.createElement('div');

	CuentaRec.innerHTML = '<br /><table width="550">'+
'<tr><td class="c" colspan="4">Production</td></tr>'+
'<tr>'+
'<td class="c">&nbsp;</td>'+
'<th>Journali&egrave;re</th>'+
'<th>Hebdomadaire</th>'+
'<th>Mensuel</th>'+
'</tr>'+
'<tr>'+
'<td class="c">Métal</td>'+
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
'<td class="c">Deut&eacute;rium</td>'+
'<th><font color="#00ff00">'+formatNmb(XDeut[0])+'</font></th>'+
'<th><font color="#00ff00">'+formatNmb(XDeut[1])+'</font></th>'+
'<th><font color="#00ff00">'+formatNmb(XDeut[2])+'</font></th>'+
'</tr>'+
'</table><br />';

	var EAlmM=(Metal / AlmM) * 100;
	var EAlmMPorc=parseInt((Metal / AlmM) * 250);
	var EAlmC=(Cristal / AlmC) * 100;
	var EAlmCPorc=parseInt((Cristal / AlmC) * 250);
	var EAlmD=(Deut / AlmD) * 100;
	var EAlmDPorc=parseInt((Deut / AlmD) * 250);

	EAlmM = Math.round(EAlmM);
	EAlmC = Math.round(EAlmC);
	EAlmD = Math.round(EAlmD);

	CuentaRec.innerHTML += '<table width="550">'+
'<tr><td class="c" colspan="3">Utilisation des Hangars</td></tr>'+
'<tr>'+
'<th>Métal</th>'+
'<th>'+EAlmM+'%</th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div style="background-color: '+(EAlmM > 100 ? '#C00000' : '#00C000' )+'; width: '+(EAlmMPorc > 250 ? 250 : EAlmMPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'<tr>'+
'<th>Cristal</th>'+
'<th>'+EAlmC+'%</th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div style="background-color: '+(EAlmC > 100 ? '#C00000' : '#00C000' )+'; width: '+(EAlmCPorc > 250 ? 250 : EAlmCPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'<tr>'+
'<th>Deut&eacute;rium</th>'+
'<th>'+EAlmD+'%</th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div style="background-color: '+(EAlmD > 100 ? '#C00000' : '#00C000' )+'; width: '+(EAlmDPorc > 250 ? 250 : EAlmDPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'</table><br />';


	ResForm.parentNode.insertBefore(CuentaRec, ResForm.nextSibling);
	ResForm.parentNode.insertBefore(ProdFact, ResForm);
	document.body.innerHTML = document.body.innerHTML.replace(/facteur de producti(.)+n\:(.)*[0-9.]/gi,'');

}