// ==UserScript==
// @name        HT-NRG : Hattrick Stadium Percentages
// @author	_eNeRGy_
// @homepage	http://nrgjack.altervista.org
// @namespace	HT-NRG
// @version 	5.6
// @description	Add percentages in arena page
// @copyright	© _eNeRGy_, 2008-2010
// @include	http://*hattrick.*/Club/Arena/Default.aspx?ArenaID=*
// ==/UserScript==

// DATA
var pTerraces = 56.5;
var pBasic  = 23; 		
var pRoof = 18; 		
var pVip = 2.5;
var percentPlus = 0.8;
var percentPlusPlus =0.6;
var style = 'text-align:right;white-space: nowrap; ';
var styleColor = "";
var CostruzioneGradinate= 45;
var CostruzioneTribune	= 75 ;
var CostruzioneTribuneCoperte	= 90;
var CostruzioneVIP= 300;
var MantenimentoGradinate = 0.5;
var MantenimentoTribune = 0.7;
var MantenimentoTribuneCoperte = 1;
var MantenimentoVIP = 2.5;
var IncassoGradinate = 6.5;
var IncassoTribune = 9.5;
var IncassoTribuneCoperte = 18;
var IncassoVIP = 32.5;
// ROOT
var mainBody = document.getElementById('mainBody');
var arenaInfo = document.getElementsByClassName('arenaInfo', mainBody)[0];
var tbody = arenaInfo.getElementsByTagName('tbody');
// TOTALE
var trTot = tbody[0].childNodes[4];
var postiTotali = Number(removeSpaces(trTot.children[1].innerHTML));
var pt = 100;
var td4 = document.createElement("TD");
td4.innerHTML = pt+" %";
td4.setAttribute('style',style);
trTot.appendChild (td4);
// GRADINATE
var trGra = tbody[0].childNodes[6];
var gradinate = Number(removeSpaces(trGra.children[1].innerHTML));
var pg = Math.round(gradinate/postiTotali*10000)/100;
var td6 = document.createElement("TD");
td6.innerHTML =pg+" %";
styleColor = "";
if(Number(pg)<Number(pTerraces*percentPlusPlus)){styleColor = 'color:red';}
else if(Number(pg)<Number(pTerraces*percentPlus)){styleColor = 'color:orange';}
else {styleColor = 'color:green';}
td6.setAttribute('style',style + styleColor);
trGra.appendChild (td6);
// TRIBUNE
var trTri = tbody[0].childNodes[8];
var tribune = Number(removeSpaces(trTri.children[1].innerHTML));
var pt = Math.round(tribune/postiTotali*10000)/100;
var td8 = document.createElement("TD");
td8.innerHTML =pt+" %";
styleColor = "";
if(Number(pt)<Number(pBasic*percentPlusPlus)){styleColor = 'color:red';}
else if(Number(pt)<Number(pBasic*percentPlus)){styleColor = 'color:orange';}
else {styleColor = 'color:green';}
td8.setAttribute('style',style + styleColor);
trTri.appendChild (td8);
// TRIBUNE COPERTE
var trTco = tbody[0].childNodes[10];
var tribunecoperte = Number(removeSpaces(trTco.children[1].innerHTML));
var ptc = Math.round(tribunecoperte/postiTotali*10000)/100;
var td10 = document.createElement("TD");
td10.innerHTML =ptc+" %";
styleColor = "";
if(Number(ptc)<Number(pRoof*percentPlusPlus)){styleColor = 'color:red';}
else if(Number(ptc)<Number(pRoof*percentPlus)){styleColor = 'color:orange';}
else {styleColor = 'color:green';}
td10.setAttribute('style',style + styleColor);
trTco.appendChild (td10);
// VIP
var trVip = tbody[0].childNodes[12];
var vip = Number(removeSpaces(trVip.children[1].innerHTML));
var pv = Math.round(vip/postiTotali*10000)/100;
var td12 = document.createElement("TD");
td12.innerHTML =pv+" %";
styleColor = "";
if(Number(pv)<Number(pVip*percentPlusPlus)){styleColor = 'color:red';}
else if(Number(pv)<Number(pVip*percentPlus)){styleColor = 'color:orange';}
else {styleColor = 'color:green';}
td12.setAttribute('style',style + styleColor);
trVip.appendChild (td12);
// SELECT DESIGN 
var trDesign = tbody[0].childNodes[14];
var tdSelect = trDesign.children[1].setAttribute('colspan',2);
// LINK ECO
var trLink = document.createElement("TR");
var tdLink = document.createElement("TD");
tdLink.setAttribute('colspan',3);
tdLink.innerHTML = "<b><a href='http://nrgjack.altervista.org/eco.php?t="+gradinate+"&b="+tribune+"&r="+tribunecoperte+"&v="+vip+"&p=nrg' target='_blank' style='color:orange'>Enterprise Construction Online </a></b>";
trLink.appendChild (tdLink);
tbody[0].appendChild (trLink);
// TOTAL AMOUNT
var trCost = document.createElement("TR");
var tdCostText = document.createElement("TD");
tdCostText.setAttribute('colspan',2);
tdCostText.innerHTML = "Valore dello stadio :";
trCost.appendChild (tdCostText);
var tdCostValue = document.createElement("TD");
tdCostValue.innerHTML = (gradinate-8000)*CostruzioneGradinate+ (tribune-3000)*CostruzioneTribune+ (tribunecoperte-1000)*CostruzioneTribuneCoperte+vip*CostruzioneVIP+" €";
tdCostValue.setAttribute('style',style);
trCost.appendChild (tdCostValue);
tbody[0].appendChild (trCost);
// MAx income
var trIncome = document.createElement("TR");
var tdIncomeText = document.createElement("TD");
tdIncomeText.setAttribute('colspan',2);
tdIncomeText.innerHTML = "Massimo incasso :";
trIncome.appendChild (tdIncomeText);
var tdIncomeValue = document.createElement("TD");
tdIncomeValue.innerHTML = (gradinate)*IncassoGradinate+ (tribune)*IncassoTribune+ (tribunecoperte)*IncassoTribuneCoperte	+vip*IncassoVIP+" €";
tdIncomeValue.setAttribute('style',style);
trIncome.appendChild (tdIncomeValue);
tbody[0].appendChild (trIncome);
// costo mantenimento
var trMantenimento = document.createElement("TR");
var tdMantenimentoText = document.createElement("TD");
tdMantenimentoText.setAttribute('colspan',2);
tdMantenimentoText.innerHTML = "Costo di mantenimento :";
trMantenimento.appendChild (tdMantenimentoText);
var tdMantenimentoValue = document.createElement("TD");
var costoMantenimento = (gradinate)*MantenimentoGradinate+(tribune)*MantenimentoTribune+ (tribunecoperte)*MantenimentoTribuneCoperte+vip*MantenimentoVIP;
tdMantenimentoValue.innerHTML = Math.round(Number(costoMantenimento)) +" €";
tdMantenimentoValue.setAttribute('style',style);
trMantenimento.appendChild (tdMantenimentoValue);
tbody[0].appendChild (trMantenimento);



function removeSpaces(string) {
 return string.split('&nbsp;').join('');
}


function getElementsByClassName(classname, node) {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
    if(re.test(els[i].className))a.push(els[i]);
    return a;
}