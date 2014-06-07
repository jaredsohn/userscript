// version 1.4.031
// 2008/06/15

// ==UserScript==
// @name           OGame - Calculo de tempo necessário
// @namespace      http://userscripts.org/scripts/show/24597
// @description    Calcula o tempo necessário para construir um edifício, pesquisa, etc.
// @include        http://*ogame.*/*
// ==/UserScript==


// constantes de contrucciones
const br                  = "<br />";
const sp                  = "&nbsp;";
const cRequiereComandante = "<span class=\"noresources\">"
const cBarraB             = "</b>";
const cBarraSpan          = "</span>";

var sMetalName;
var sCristName;
var sDeutName;

var strHTML;
var strTemp;
var omaior;
var strTempNec;
var bComandante;
var iReqM;
var iReqC;
var iReqD;
var iReqTotal;
var iDispM;
var iDispC;
var iDispD;
//var regexCom   = '<a style="cursor: pointer" title="\-\b(\d{1,3}\.)?(\d{3,3}\.){0,2}\d{1,3}\b"><span class="noresources">';
var regexCom1  = /<span [^>]*>/g;
var regexCom2  = /<a [^>]*>/g;
var regexCom3  = /<\/span><\/a>/g;
var regexCom4  = /<font[^>]*>/g;
//Page Parts
var leftmenu  = document.getElementById('leftmenu');
var Vcontent = document.getElementById('content');
var messagebox = document.getElementById('messagebox');
var header_top = document.getElementById('header_top');
var errorbox = document.getElementById('errorbox');

//contentSection
var contentSection = location.href.match(/page=([^&]+)/)[1];
//====================================================================================
//			- Translation Section -
//===============================================================================
// 0 --> Portuguese
// 1 --> English
//===============================================================================
var L_UC_FA = new Array();
  L_UC_FA[0] = "FA->Forcar Actualização";
  L_UC_FA[1] = "FU->Force Update";

var L_UC_Novers = new Array();
  L_UC_Novers[0] = "Uma versão mais recente do script";
  L_UC_Novers[1] = "A more recent version of";

var L_UC_act = new Array();
  L_UC_act[0] = "foi encontrada.\r\nQuer actualiza-lo agora?";
  L_UC_act[1] = "has been found.\r\nWould you like to get it now?";

var L_UC_VmaisR = new Array();
  L_UC_VmaisR[0] = "Voçê tem a versão mais recente do srcipt";
  L_UC_VmaisR[1] = "You have the latest version of";
  
var L_UC_erro = new Array();
  L_UC_erro[0] = "ERRO: Não foi possível encontrar o ficheiro com a versão mais recente.\r\nPor favor reporte este erro ao autor do script (" + script_title + ").";
  L_UC_erro[1] = "Could not locate the version holder file.\r\nThis should be reported to the script (" + script_title + ") author.";

var L_UC_aviso = new Array();
  L_UC_aviso[0] = "Quer ser avisado daqui a 24 horas?\r\n(Cancele para ser avisado daqui a 7 dias)";
  L_UC_aviso[1] = "Would you like to be reminded in 24 hours ?\r\n(Cancel to be reminded next week only)";

var L_Hora = new Array();
  L_Hora[0] = "h";
  L_Hora[1] = "h";

var L_Min = new Array();
  L_Min[0] = "m";
  L_Min[1] = "m";

var L_e = new Array();
  L_e[0] = "e";
  L_e[1] = "and";
  
var L_Falta = new Array();
  L_Falta[0] = "Falta";
  L_Falta[1] = "Left";

var L_TempRest = new Array();
  L_TempRest[0] = "Tempo até estar disponível";
  L_TempRest[1] = "Time to be available";
  
var L_Disp = new Array();
  L_Disp[0] = "Disponível";
  L_Disp[1] = "Available at";

var L_Opcoes = new Array();
  L_Opcoes[0] = "Opções";
  L_Opcoes[1] = "Options";
  
var L_Act = new Array();
  L_Act[0] = "Activa";
  L_Act[1] = "Enable";
  
var L_InAct = new Array();
  L_InAct[0] = "Inactiva";
  L_InAct[1] = "Disable";
  
var L_Opc1 = new Array();
  L_Opc1[0] = "Ver os recursos que faltam só quando o rato está em cima do tempo restante.";
  L_Opc1[1] = "Only see the left resources when the mouse is over the time left.";
  
var L_ConfScr = new Array();
  L_ConfScr[0] = "Configurações do Script";
  L_ConfScr[1] = "Script Options";
  
var L_DescrOpc = new Array();
  L_DescrOpc[0] = "Descrição da Opção";
  L_DescrOpc[1] = "Option Description";
  
var L_EstOpc = new Array();
  L_EstOpc[0] = "Estado";
  L_EstOpc[1] = "Current";
  
var L_AltOpc = new Array();
  L_AltOpc[0] = "Alterar";
  L_AltOpc[1] = "Change";
  
var L_ActOpc = new Array();
  L_ActOpc[0] = "Tem a certeza que pretende activar a opção?";
  L_ActOpc[1] = "Do you really want to enable the option?";
  
var L_DesactOpc = new Array();
  L_DesactOpc[0] = "Tem a certeza que pretende desactivar a opção?";
  L_DesactOpc[1] = "Do you really want to disable the option?";
  
var L_predefOpc = new Array();
  L_predefOpc[0] = "Restaurar Opções Predefenidas";
  L_predefOpc[1] = "Reset Options";
  
var L_ActScr = new Array();
  L_ActScr[0] = "Actualizar o Sript";
  L_ActScr[1] = "Update the Script";

//===============================================================================
//			- Translation Section -
//====================================================================================

var ogtitle = window.location.href;
var ogserver = /http\:\/\/([\-\.0-9a-zA-Z]+)\//.exec(ogtitle);
if(ogserver != null){ ogserver = RegExp.$1; } else { ogserver = "0"; }

var langstr = /http\:\/\/[\-\.0-9a-zA-Z]+\.([a-z]+)\//.exec(ogtitle);
if(langstr != null){ langstr = RegExp.$1; }
	
var lang;

switch(langstr){
  case "pt":
    lang = "0";var weekday=new Array(7);weekday[0]="Domingo";weekday[1]="Segunda";weekday[2]="Terça";weekday[3]="Quarta";weekday[4]="Quinta";weekday[5]="Sexta";weekday[6]="Sábado";var month=new Array(12);month[0]="Janeiro";month[1]="Fevereiro";month[2]="Março";month[3]="Abril";month[4]="Maio";month[5]="Junho";month[6]="Julho";month[7]="Agosto";month[8]="Setembro";month[9]="Outubro";month[10]="Novembro";month[11]="Dezembro";
	break;
  case "br":
    lang = "0";var weekday=new Array(7);weekday[0]="Domingo";weekday[1]="Segunda";weekday[2]="Terça";weekday[3]="Quarta";weekday[4]="Quinta";weekday[5]="Sexta";weekday[6]="Sábado";var month=new Array(12);month[0]="Janeiro";month[1]="Fevereiro";month[2]="Março";month[3]="Abril";month[4]="Maio";month[5]="Junho";month[6]="Julho";month[7]="Agosto";month[8]="Setembro";month[9]="Outubro";month[10]="Novembro";month[11]="Dezembro";
	break;
  case "org":
	lang = "1";var weekday=new Array(7);weekday[0]="Sunday";weekday[1]="Monday";weekday[2]="Tuesday";weekday[3]="Wednesday";weekday[4]="Thursday";weekday[5]="Friday";weekday[6]="Saturday";var month=new Array(12);month[0]="January";month[1]="February";month[2]="March";month[3]="April";month[4]="May";month[5]="June";month[6]="July";month[7]="August";month[8]="September";month[9]="October";month[10]="November";month[11]="December";
    break;
  default:
	lang = "1";var weekday=new Array(7);weekday[0]="Sunday";weekday[1]="Monday";weekday[2]="Tuesday";weekday[3]="Wednesday";weekday[4]="Thursday";weekday[5]="Friday";weekday[6]="Saturday";var month=new Array(12);month[0]="January";month[1]="February";month[2]="March";month[3]="April";month[4]="May";month[5]="June";month[6]="July";month[7]="August";month[8]="September";month[9]="October";month[10]="November";month[11]="December";
}

function LZ(x) {return(x<0||x>9?"":"0")+x};

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
}

function locate(xpath, xpres) {
  return document.evaluate(xpath, document, null, xpres, null);
}

function locateFirst(xpath) {
  // gracias SpitFire: http://userscripts.org/scripts/show/8555
  return locate(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
}

function get_from_to(strLine, begin, end) {
  var strTemp;
  
  strTemp = strLine.substring(strLine.indexOf(begin) + begin.length, strLine.length);
  return strTemp.substring(0, strTemp.indexOf(end));
}


function locate(xpath, xpres, where) {
	if (where==null)
		return document.evaluate(xpath, document, null, xpres, null);
	return document.evaluate(xpath, where, null, xpres, null);
}

function locateSnapshot(xpath, where) {
	return locate(xpath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, where);
}

if (header_top) {
	// save current planet coords
	var thisCoords = header_top.getElementsByTagName('select')[0];
	thisCoords = thisCoords.options[thisCoords.selectedIndex];
	var thisPlanetCode = thisCoords.value.split('cp=')[1].split('&')[0];
	thisCoords = thisCoords.innerHTML.split('[')[1].split(']')[0];
}

if (contentSection=='resources') {
	var T_Recursos = locateSnapshot("//div[@id='content']//font[@color]");

	var PMetal = T_Recursos.snapshotItem(T_Recursos.snapshotLength-12).innerHTML.replace(/\./g,'');
	var PCristal = T_Recursos.snapshotItem(T_Recursos.snapshotLength-11).innerHTML.replace(/\./g,'');
	var PDeut = T_Recursos.snapshotItem(T_Recursos.snapshotLength-10).innerHTML.replace(/\./g,'');

	GM_setValue('Metal_'+thisPlanetCode,PMetal);
	GM_setValue('Cristal_'+thisPlanetCode,PCristal);
	GM_setValue('Deut_'+thisPlanetCode,PDeut);
}
//====================================================================================
//			- Weekly Auto-Update Check -
//===============================================================================
// CheckForUpdate() will verify if the time has come to look if an update is available.
// CheckVersion() will verify if this script version is the latest available.
//===============================================================================
var script_title = "OGame - Calculo de tempo necessário";
var source_location = "http://userscripts.org/scripts/source/24597.user.js";
var current_version = "1.4.031";
var latest_version = " ";
var gm_updateparam = "OGame-Calc_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");

// a google document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
var version_holder = "http://docs.google.com/View?docid=d6p6hkj_3fjmckvg9";

//Initiate the download of the new script version.
function GetNewVersion() {
        var today = new Date();
        GM_setValue(gm_updateparam, String(today));
        window.location = source_location;
}

//Verify if it's time to update
function CheckForUpdate()
{
	var today = new Date();
	var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds

	if(lastupdatecheck != "never")
	{
		today = today.getTime(); //Get today's date
		var lastupdatecheck2 = new Date(lastupdatecheck).getTime();
		var interval = (today - lastupdatecheck2) / one_day; //Find out how much days have passed		
		
		//If a week has passed since the last update check, check if a new version is available
		if (interval>=7) {
			CheckVersion();}
	}
	else {
		CheckVersion();}
}

//Make sure we don't have the latest version
function CheckVersion()
{
	GM_xmlhttpRequest({
		    method: 'GET',
		    url: version_holder,
		    headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		    onload: function(responseDetails)
			{
				var line = String(responseDetails.responseText.match(/version=[0-9].[0-9]?[0-9].[0-9]?[0-9]/));				
				
				if(line != null)
				{
					var strSplit = new Array();
					strSplit = line.split('=');					
					latest_version = strSplit[1];
					
					if(current_version != latest_version && latest_version != "undefined")
					{
						if(confirm(L_UC_Novers[lang] + " " + script_title + " (" + latest_version + ") " + L_UC_act[lang]))
							GetNewVersion();
						else
							AskForReminder();
					} 
					else if(current_version == latest_version)
						alert(L_UC_VmaisR[lang] + ": " + script_title + ".");
						SkipWeeklyUpdateCheck();
				}
				else
				{
					alert(L_UC_erro[lang]);
					SkipWeeklyUpdateCheck();
				}
					
		    }
		});
}

//Ask the user to be reminded in 24 hours or only next week.
function AskForReminder()
{
	if(confirm(L_UC_aviso[lang]))
	{
		var today = new Date();
		today = today.getTime();		
		var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
		var sda_ms = today - sixdays_ms;		
		var sixdaysago = new Date(sda_ms)
		
		//Since we check for updates after 7 days, just make it seem like the last check was 6 days ago.
		GM_setValue(gm_updateparam, String(sixdaysago));
	}
	else
		SkipWeeklyUpdateCheck();
}

//Set the next update check in seven days
function SkipWeeklyUpdateCheck()
{
	var today = new Date();
	//As if we've just updated the script, the next check will only be next week.
	GM_setValue(gm_updateparam, String(today));
}
//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand(L_UC_FA[lang], CheckVersion);
//===============================================================================
//			- Weekly Auto-Update Check -
//====================================================================================

function desmult(valor) {
  var valorH = Math.floor(valor);
  var valorMsH = valor - valorH;
  var valorM60 = valorMsH * 60;
  var valorM = Math.round(valorM60);
  var txt = valorH + L_Hora[lang] + " " + L_e[lang] + " " + valorM + L_Min[lang];
  
  return txt;
}

function calcularrec(disp,req,mph,acc) {
  if (!(isNaN(req))) {
	var MF = req - disp;
	var MFph = MF / mph;
	strTempNec = desmult(MFph); 
  }
  if (acc == "med") {
	return MFph;
  }
  else {
	return strTempNec;
  }
}

function quando(ValH) {
  var minutes = 1000*60;
  var hours = minutes*60;
  var days = hours*24;

  var data = new Date();
  var dataMil = data.getTime();
  var ValMil = ValH * hours;
  var somaMil = dataMil + ValMil;
  data.setTime(somaMil);
  
  var dia = data.getDate();
  var diaSemana = data.getDay();
  var mes = data.getMonth();
  var ano = data.getFullYear();
  var horas = data.getHours();
  var min = data.getMinutes();
  var seg = data.getSeconds();
  
  var datatxt = L_Disp[lang] + ": " + weekday[diaSemana] + " " + dia + " " + month[mes] + " " + ano + " " + horas + ":" + min + ":" + seg;
  return datatxt;
}

function maior(a,b,c) {
  if (a>b && a>c) {
    return a;
  }
  if (b>a && b>c) {
    return b;
  }
  if (c>a && c>b) {
    return c;
  }
}

function NovoElemento(Tag, Inhalt)
{
	var Neu = document.createElement(Tag); // erste Zelle (Titel)
	
	if (Inhalt.indexOf('<') + 1 || Inhalt.indexOf('&') + 1) // falls Tags oder &;-Umschreibungen im Text sind
	{
		Neu.innerHTML = Inhalt; // Text als HTML-Code
	}
	else
	{
		if (Inhalt.length > 0) // ansonsten, und falls es ueberhaupt einen Text gibt
		{
			Neu.appendChild(document.createTextNode(Inhalt)); // Text als Attribut
		}
	}
	
	if (NovoElemento.arguments.length > 2) // weitere Argumente der Funktion
	{
		for (var i = 2; i < NovoElemento.arguments.length - 1; i += 2) // alle diese Argumente
		{
			if (!NovoElemento.arguments[i + 1].length) { continue; }
			Neu.setAttribute(NovoElemento.arguments[i], NovoElemento.arguments[i + 1]); // dem Tag zuweisen
		}
	}
	
	return Neu; // zurueckgeben
}

function addEvent(obj, type, func, cap)
{
    if (obj.addEventListener)
    {
        obj.addEventListener(type, func, cap);
    }
    else if (obj.attachEvent)
    {
        obj.attachEvent("on"+type, func);
    }
}

function predefOpc() {
	GM_setValue("Config_1","true");
	Set_Config();
}


function CheckOpc(num) {
	txt = "";
	if (GM_getValue("Config_"+num) == "true") {
		txt = '<p style="color:green">'+L_Act[lang]+'</p>';
	}
	else {
		txt = '<p style="color:red">'+L_InAct[lang]+'</p>';
	}
	return txt;
}

function txtOpc(num) {
	txt = "";
	switch (num) {
		case 1: 
			txt = L_Opc1[lang];
			break;
//		case 2:
//			txt = "Blá";
//			break;
	}
	return txt;
}

function Set_Config()
{
	body = Vcontent;
	while (body.firstChild)
		body.removeChild(body.firstChild);
	NeuZeile = NovoElemento('tr', '');
	NeuZelle = NovoElemento('th', '', 'colspan', '3');
	
	Code = '<tr><td class="c" colspan="3">'+L_ConfScr[lang]+'</td></tr>';
	Code += '<tr><th>'+L_DescrOpc[lang]+'</th><th>'+L_EstOpc[lang]+'</th><th>'+L_AltOpc[lang]+'</th></tr>';
	NeuTab.innerHTML = Code;
	
	function alterarOpc(num) {
		if (GM_getValue("Config_"+num) == "false") {
			var r=confirm(L_ActOpc[lang]);
			if (r==true) {
				GM_setValue("Config_"+num,"true");
			}
		}
		else if (GM_getValue("Config_"+num) == "true") {
			var r=confirm(L_DesactOpc[lang]);
			if (r==true) {
				GM_setValue("Config_"+num,"false");
			}
		}
		Set_Config();
	}
	
	for (i=1; i <= 1; i++) {
		switch (i) {
			case 1: 
				var func_Opc = function () {alterarOpc(1);};
				break;
//			case 2:
//				var func_Opc = function () {alterarOpc(2);};
//				break;
		}
		NLinha = NovoElemento('tr', '');
		Opc_Descr = NovoElemento('th', txtOpc(i));
		Opc12 = NovoElemento('th', CheckOpc(i));
		Opc13 = NovoElemento('th', '');
		Opc14 = NovoElemento('a', L_AltOpc[lang]);
		addEvent(Opc14,'click', func_Opc, true);
		Opc13.appendChild(Opc14);
		NLinha.appendChild(Opc_Descr);
		NLinha.appendChild(Opc12);
		NLinha.appendChild(Opc13);
		NeuTab.appendChild(NLinha);
	}
	
	var NeuBtn = NovoElemento('input', '', 'type', 'button', 'value', L_predefOpc[lang]);
	addEvent(NeuBtn,'click', predefOpc, true);
	var NeuBtn2 = NovoElemento('input', '', 'type', 'button', 'value', L_ActScr[lang]);
	addEvent(NeuBtn2,'click', CheckVersion, true);
	NeuZelle.appendChild(NeuBtn);
	NeuZelle.appendChild(NeuBtn2);
	NeuZeile.appendChild(NeuZelle);
	NeuTab.appendChild(NeuZeile);
	
	body.appendChild(NeuTab);
}

CheckForUpdate();
//alert("lingua: " + lang);
//====================================================================================
//			- Here Begins The Real Work -
//===============================================================================
if (!(GM_getValue("Config_1") == "false" || GM_getValue("Config_1") == "true")) {
	predefOpc();
}

var table;
  
// nombres de os recursos - multilanguaje
table = document.getElementById('resources').childNodes[1].childNodes[2];
for (i=0; i < table.childNodes.length; i++) {
  switch (i) {
    case 1: 
      //Metal
      sMetalName = table.childNodes[i].childNodes[0].childNodes[0].childNodes[0].innerHTML;
      break;
    case 3:
      //Cristal
      sCristName = table.childNodes[i].childNodes[0].childNodes[0].childNodes[0].innerHTML;
      break;
    case 5:
      //Deuterio
      sDeutName = table.childNodes[i].childNodes[0].childNodes[0].childNodes[0].innerHTML;
      break;
  };
}
  
//recursos actuales
table = document.getElementById('resources').childNodes[1].childNodes[4];
for (i=0; i < table.childNodes.length; i++) {
  switch (i) {
    case 1: 
      //Metal
      iDispM = parseInt(table.childNodes[i].childNodes[0].innerHTML.replace(/[.]/g,''));
      break;
    case 3:
      //Cristal
      iDispC = parseInt(table.childNodes[i].childNodes[0].innerHTML.replace(/[.]/g,''));
      break;
    case 5:
      //Deuterio
      iDispD = parseInt(table.childNodes[i].childNodes[0].innerHTML.replace(/[.]/g,''));
      break;
  };
}

//Produção Total
var MphM = GM_getValue('Metal_'+thisPlanetCode);
var MphC = GM_getValue('Cristal_'+thisPlanetCode);
var MphD = GM_getValue('Deut_'+thisPlanetCode);
  
if (location.href.search("building") != -1 ) {
    for (i=0; i < document.getElementsByTagName("td").length; i++) {
      
      //alert(iDispM + '-' + iDispC + '-' + iDispD);
      if (document.getElementsByTagName("td").item(i).className == "l"){
        strHTML = document.getElementsByTagName("td").item(i).innerHTML;
		
        //if (i == 53) alert(i + '$$' + strHTML);
        strHTML = strHTML.replace(regexCom1, '');
        strHTML = strHTML.replace(regexCom2, '<b>');
        strHTML = strHTML.replace(regexCom3, cBarraB);
		
        iReqM = parseInt(get_from_to(strHTML, cRequiereComandante, cBarraSpan).replace(/[.]/g,''));
        iReqM = parseInt(get_from_to(strHTML, sMetalName + ': <b>', cBarraB).replace(/[.]/g,''));
        iReqC = parseInt(get_from_to(strHTML, sCristName + ': <b>', cBarraB).replace(/[.]/g,''));
        iReqD = parseInt(get_from_to(strHTML, sDeutName + ': <b>', cBarraB).replace(/[.]/g,''));
        
        iReqTotal = 0;
        strTemp = "";
		
		var calcrecM = calcularrec(iDispM,iReqM,MphM,"med");
		var calcrecC = calcularrec(iDispC,iReqC,MphC,"med");
		var calcrecD = calcularrec(iDispD,iReqD,MphD,"med");
		
		if (iReqM>iDispM && iReqC>iDispC && iReqD>iDispD) {
		  omaior = maior(calcrecM,calcrecC,calcrecD);
		  strTemp3 = desmult(omaior);
		  if (GM_getValue("Config_1") == "false") {
			strTemp = L_Falta[lang] + ": " + sMetalName + ": <b>" + addDots(iReqM - iDispM) + "</b> " + sCristName + ": <b>" + addDots(iReqC - iDispC) +"</b> " + sDeutName + ": <b>" + addDots(iReqD - iDispD) + "</b>" + br;}
		  strTemp += L_TempRest[lang] + ": " + '<a title="' + sMetalName + ": " + addDots(iReqM - iDispM) + "(" + calcularrec(iDispM,iReqM,MphM) + ")" + "; " + sCristName + ": " + addDots(iReqC - iDispC) + "(" + calcularrec(iDispC,iReqC,MphC) + ")" + "; " + sDeutName + ": " + addDots(iReqD - iDispD) + "(" + calcularrec(iDispD,iReqD,MphD) + ")" + '">' + strTemp3 + '</a>' + br + quando(omaior) + sp;
		}
		else {
			if (iReqM>iDispM) {
			  if (iReqC>iDispC || iReqD>iDispD) {
				if (iReqM>iDispM && iReqC>iDispC) {
				  omaior = maior(calcrecM,calcrecC,0);
				  strTemp3 = desmult(omaior);
				  if (GM_getValue("Config_1") == "false") {
					strTemp = L_Falta[lang] + ": " + sMetalName + ": <b>" + addDots(iReqM - iDispM) + "</b> " + sCristName + ": <b>" + addDots(iReqC - iDispC) + "</b>" + br;}
				  strTemp += L_TempRest[lang] + ": " + '<a title="' + sMetalName + ": " + addDots(iReqM - iDispM) + "(" + calcularrec(iDispM,iReqM,MphM) + ")" + "; " + sCristName + ": " + addDots(iReqC - iDispC) + "(" + calcularrec(iDispC,iReqC,MphC) + ")" + '">' + strTemp3 + '</a>' + br + quando(omaior) + sp;
				}
				if (iReqM>iDispM && iReqD>iDispD) {
				  omaior = maior(calcrecM,calcrecD,0);
				  strTemp3 = desmult(omaior);
				  if (GM_getValue("Config_1") == "false") {
					strTemp = L_Falta[lang] + ": " + sMetalName + ": <b>" + addDots(iReqM - iDispM) + "</b> " + sDeutName + ": <b>" + addDots(iReqD - iDispD) + "</b>" + br;}
				  strTemp += L_TempRest[lang] + ": " + '<a title="' + sMetalName + ": " + addDots(iReqM - iDispM) + "(" + calcularrec(iDispM,iReqM,MphM) + ")" + "; " + sDeutName + ": " + addDots(iReqD - iDispD) + "(" + calcularrec(iDispD,iReqD,MphD) + ")" + '">' + strTemp3 + '</a>' + br + quando(omaior) + sp;
				}
			  }
			  else {
				omaior = calcrecM;
				strTemp3 = desmult(omaior);
				if (GM_getValue("Config_1") == "false") {
					strTemp = L_Falta[lang] + ": " + sMetalName + ": <b>" + addDots(iReqM - iDispM) + "</b>" + br;}
				strTemp += L_TempRest[lang] + ": " + '<a title="' + sMetalName + ": " + addDots(iReqM - iDispM) + "(" + calcularrec(iDispM,iReqM,MphM) + ")" + '">' + strTemp3 + '</a>' + br + quando(omaior) + sp;
			  }
			}
			if (iReqC>iDispC) {
			  if (iReqM>iDispM || iReqD>iDispD) {
				if (iReqC>iDispC && iReqD>iDispD) {
				  omaior = maior(calcrecC,calcrecD,0);
				  strTemp3 = desmult(omaior);
				  if (GM_getValue("Config_1") == "false") {
					strTemp = L_Falta[lang] + ": " + sCristName + ": <b>" + addDots(iReqC - iDispC) + "</b> " + sDeutName + ": <b>" + addDots(iReqD - iDispD) + "</b>" + br;}
				  strTemp += L_TempRest[lang] + ": " + '<a title="' + sCristName + ": " + addDots(iReqC - iDispC) + "(" + calcularrec(iDispC,iReqC,MphC) + ")" + "; " + sDeutName + ": " + addDots(iReqD - iDispD) + "(" + calcularrec(iDispD,iReqD,MphD) + ")" + '">' + strTemp3 + '</a>' + br + quando(omaior) + sp;
				}
			  }
			  else {
				omaior = calcrecC;
				strTemp3 = desmult(omaior);
				if (GM_getValue("Config_1") == "false") {
					strTemp = L_Falta[lang] + ": " + sCristName + ": <b>" + addDots(iReqC - iDispC) + "</b>" + br;}
				strTemp += L_TempRest[lang] + ": " + '<a title="' + sCristName + ": " + addDots(iReqC - iDispC) + "(" + calcularrec(iDispC,iReqC,MphC) + ")" + '">' + strTemp3 + '</a>' + br + quando(omaior) + sp;
			  }
			}
			if (iReqD>iDispD) {
			  if (iReqM>iDispM || iReqC>iDispC) {
			  }
			  else {
				omaior = calcrecD;
				strTemp3 = desmult(omaior);
				if (GM_getValue("Config_1") == "false") {
					strTemp = L_Falta[lang] + ": " + sDeutName + ": <b>" + addDots(iReqD - iDispD) + "</b>" + br;}
				strTemp += L_TempRest[lang] + ": " + '<a title="' + sDeutName + ": " + addDots(iReqD - iDispD) + "(" + calcularrec(iDispD,iReqD,MphD) + ")" + '">' + strTemp3 + '</a>' + br + quando(omaior) + sp;
			  }
			}
		}
		
		
        if (strTemp.length != 0) {
          strTemp = 
            document.getElementsByTagName("td").item(i).innerHTML + 
			br + 
            strTemp;
          strTemp = strTemp.replace(/<br><br>/g, br);
          document.getElementsByTagName("td").item(i).innerHTML = strTemp;
        }
      }
    }
}

//===============================================================================
//			- Options -
//==========================================================================
if (location.href.search("options") != -1)
{
	var ContDiv = Vcontent;
	var ContDivCtr = ContDiv.getElementsByTagName('center')[0];
		ContDivCtr.appendChild(NovoElemento('span', '&nbsp;<br>'+script_title+'<br>&nbsp;', 'style', 'font-size: 12pt; font-weight: bold;'));
		var NeuTab = NovoElemento('table', '', 'align', 'center', 'width', '519');
		var Code = '';
		
		NeuTab.innerHTML = Code;
		
		ContDivCtr.appendChild(document.createElement('br'));
		ContDivCtr.appendChild(document.createElement('br'));
		NeuTab = NovoElemento('table', '', 'align', 'center', 'width', '519');
		Code = '<tr><td class="c" colspan="2">'+L_ConfScr[lang]+'</td></tr>';
		NeuTab.innerHTML = Code;
		ContDivCtr.appendChild(NeuTab);
		
		NeuZeile = NovoElemento('tr', '');
		NeuZelle = NovoElemento('th', '', 'colspan', '3');
		var NeuBtn = NovoElemento('input', '', 'type', 'button', 'value', L_Opcoes[lang]);
		addEvent(NeuBtn,'click', Set_Config, true);
		NeuZelle.appendChild(NeuBtn);
		NeuZeile.appendChild(NeuZelle);
		NeuTab.appendChild(NeuZeile);
		
		ContDivCtr.appendChild(NeuTab);
}
//==========================================================================
//			- Options -
//===============================================================================
//===============================================================================
//			- I Hope You Enjoyed ;) -
//====================================================================================