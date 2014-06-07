// ==UserScript==
// @name           OGame Quadro de Recursos
// @namespace      
// @description    OGame GreaseMonkey Suite. Quadro de Recursos.
// @include        http://ogame*.de/game/*
// @include        http://*.gfsrv.net/game/*
// ==/UserScript==
   function formatNmb(numero)
   {
          var nNmb = String(numero); 
    var sRes = "";
    for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++)
     sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;
    return sRes;
   }

  function CalculateNumber(strNumber)
  {
    //alert(strNumber);
    if(strNumber.indexOf('<font color')!=-1)
    {
      strNumber = strNumber.substring((strNumber.indexOf('>') + 1), strNumber.indexOf('</font'));
      return(strNumber);
    }
  }

if (document.location.href.indexOf('/game/resources.php') == -1) return;
GM_log('Init: '+document.location.href);

var T_Recursos = document.getElementsByTagName("td");

var Metal = T_Recursos[18].innerHTML.replace(/\./g,'');
var Cristal = T_Recursos[19].innerHTML.replace(/\./g,'');
var Deut = T_Recursos[20].innerHTML.replace(/\./g,'');

var Tr_Recursos= document.getElementsByTagName("th");
var PMetal = Tr_Recursos[8].innerHTML.replace(/\./g,'');
var PCristal = Tr_Recursos[16].innerHTML.replace(/\./g,'');
var PDeut = Tr_Recursos[24].innerHTML.replace(/\./g,'');


var AlmM = T_Recursos[35].innerHTML.replace(/\./g,'');
var AlmC = T_Recursos[36].innerHTML.replace(/\./g,'');
var AlmD = T_Recursos[37].innerHTML.replace(/\./g,'');
AlmM = AlmM.replace(/k/,'000');
AlmC = AlmC.replace(/k/,'000');
AlmD = AlmD.replace(/k/,'000');



//AlmM = 1000;


if (Metal.indexOf('<font color')!=-1) {
        Metal = Metal.substring(41, Metal.indexOf('</font'));
        var b='';
        var x=0;
        for (x=0;x<=Metal.length;x++) {
        if ((Metal.substring(x,x+1)>='0')||(Metal.substring(x,x+1)<='9')) b=b+Metal.substring(x,x+1);
        }
        Metal=b;
        
        
}
if (Cristal.indexOf('<font color')!=-1) {
        Cristal = Cristal.substring(22, Cristal.indexOf('</font'));
}
if (Deut.indexOf('<font color')!=-1) {
        Deut = Deut.substring(22, Deut.indexOf('</font'));
}

if (PMetal.indexOf('<font color')!=-1) {
        PMetal = PMetal.substring(41, PMetal.indexOf('</font'));
        var b='';
        var x=0;
        for (x=0;x<=PMetal.length;x++) {
        if ((PMetal.substring(x,x+1)>='0')||(PMetal.substring(x,x+1)<='9')) b=b+PMetal.substring(x,x+1);
        }
        PMetal=b;
}
if (PCristal.indexOf('<font color')!=-1) {
        PCristal = PCristal.substring(41, PCristal.indexOf('</font'));
        var b='';
        var x=0;
        for (x=0;x<=PCristal.length;x++) {
        if ((PCristal.substring(x,x+1)>='0')||(PCristal.substring(x,x+1)<='9')) b=b+PCristal.substring(x,x+1);
        }
        PCristal=b;
}
if (PDeut.indexOf('<font color')!=-1) {
        PDeut = PDeut.substring(41, PDeut.indexOf('</font'));
        var b='';
        var x=0;
        for (x=0;x<=PCristal.length;x++) {
        if ((PDeut.substring(x,x+1)>='0')||(PDeut.substring(x,x+1)<='9')) b=b+PDeut.substring(x,x+1);
        }
        PDeut=b;        
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


XMetal[0] =PMetal * 24;

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
'<th>Nível de Produção</th>'+
'<th>'+Factor+'%</th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div style="background-color: '+(Factor < 100 ? '#C00000' : '#00C000' )+'; width: '+FactorPorc+'px;">&nbsp;</div></div></th>'+
'</tr></table><br />';
        
        var CuentaRec = document.createElement('div');

  var intMetal, intCristal, intDeuterio;

  intMetal = CalculateNumber(T_Recursos[40].innerHTML.replace(/\./g,''))
  intCristal = CalculateNumber(T_Recursos[41].innerHTML.replace(/\./g,''))
  intDeuterio = CalculateNumber(T_Recursos[42].innerHTML.replace(/\./g,''));

        CuentaRec.innerHTML = '<br /><table width="550">'+
'<tr><td class="c" colspan="4">Produção extendida</td></tr>'+
'<tr>'+
'<td class="c">&nbsp;</td>'+
'<th>Diária</th>'+
'<th>Semanal</th>'+
'<th>Mensal</th>'+
'</tr>'+
'<tr>'+
'<td class="c">Metal</td>'+
'<th><font color="#00ff00">' + intMetal * 24 + '</font></th>'+
'<th><font color="#00ff00">' + intMetal * 168 + '</font></th>'+
'<th><font color="#00ff00">' + intMetal * 720 + '</font></th>'+
'</tr>'+
'<tr>'+
'<td class="c">Cristal</td>'+
'<th><font color="#00ff00">' + intCristal * 24 + '</font></th>'+
'<th><font color="#00ff00">' + intCristal * 168 + '</font></th>'+
'<th><font color="#00ff00">' + intCristal * 720 + '</font></th>'+
'</tr>'+
'<tr>'+
'<td class="c">Deutério</td>'+
'<th><font color="#00ff00">' + intDeuterio * 24 + '</font></th>'+
'<th><font color="#00ff00">' + intDeuterio * 168 + '</font></th>'+
'<th><font color="#00ff00">' + intDeuterio * 720 + '</font></th>'+
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
'<tr><td class="c" colspan="3">Estado dos Armazéns</td></tr>'+
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
'<th>Deutério</th>'+
'<th>'+EAlmD+'%</th>'+
'<th width="250"><div style="border: 1px solid #FFFFFF; width: 250px;"><div style="background-color: '+(EAlmD > 100 ? '#C00000' : '#00C000' )+'; width: '+(EAlmDPorc > 250 ? 250 : EAlmDPorc)+'px;">&nbsp;</div></div></th>'+
'</tr>'+
'</table><br />';


        ResForm.parentNode.insertBefore(CuentaRec, ResForm.nextSibling);
        ResForm.parentNode.insertBefore(ProdFact, ResForm);
        document.body.innerHTML = document.body.innerHTML.replace(/factor de producci(.)+n\:(.)*[0-9.]/gi,'');

}