// ==UserScript==
// @name           Ikariam SMS Alerts
// @namespace      www.chemagr.com
// @version	1.1
// @description    Get attack alerts on your mobile phone. SMS are free. Recibe alertas de ataques en tu telefono movil. Los SMS son gratis. 
// @include        http://s*.ikariam.*/*
// ==/UserScript==
//
//
// That program is not legal by the rules of the game, use it
// by your own responsability.
// Any damage by usage of bandwidth by this programm
// is considered your expense and fault and not the auhtors.
//
//    Ikariam SMS Alerts 1.1 
//    Copyright (C) 2010 Chema
//
//    This program is distributed in the hope that it will be useful,
//    but without any warranty; without even the implied warranty of
//    merchantability or fitness for a particular porpouse.  
//
//    You are not allowed to offer this programm for download or redistribute it 
//    in any way.
//    This programm is offered for download only at chemagr.com and userscript.org.
//     If you downloaded this programm from another location please report it 
//     at the chemagr.com website.
//     This programm maybe downloaded automatically by You but only form the location 
//     mentioned above.
//     The code remains as is, no alteration or modification should be done without the 
//     written permission of the auhtor.
//     This script is not permited to be incorporated into any of your program/s or 
//     any proprietary programs.
//     This script will comunicate with chemagr.com to check for upgrades,
//     or for any other means. Any damage by usage of bandwidth by this programm
//     is considered your expense and fault and not the auhtors.
//     Any damage inflicted in general to others (Companies, individuals etc) by use of 
//     this code is your responsibility. 

var version='1.1';
var url = 'http://www.chemagr.com';
var tmin=60;
var tmax=120;
var host = window.location.host;
var titulo =document.title;

//Comprobacion de version

var name=host+".actualizacion";
var fecha=new Date().getTime()+"";
var ultfecha=GM_getValue(name);

if(ultfecha === undefined){ 
	GM_setValue(name,fecha);
}

if((fecha - ultfecha)>86400000){
	GM_setValue(name,fecha);
	GM_xmlhttpRequest({
		method:				"GET",
		url:				"http://userscripts.org/scripts/source/89711.meta.js",
		headers:			{ Accept:"text/javascript; charset=UTF-8" },
		overrideMimeType:	"application/javascript; charset=UTF-8",
		onload:				function(response) { comprobarVersion(response); }
	});
}

function comprobarVersion(response){
	if(response.status==200){
		var newVersion=/\/\/ @version\s+(\d+\.\d+)/.exec(response.responseText);
		if(newVersion[1] != version){
			if(confirm("New version of SMS Alerts available:\n- current Version: "+version+"\n- new version: "+newVersion[1])){
				GM_openInTab('http://userscripts.org/scripts/source/89711.user.js');
			}
		}
	}
}

function pantalla(){
	padre = document.body;

	//Marco principal

	var hijo = document.createElement('div');
	hijo.id="sms_Alerts";
	hijo.setAttribute('style','margin:-20px auto 20px;width:980px;padding:0;clear:both;text-decoration: none; color:#542C0F; background-color: #FEF2DC;border-color: rgb(201, 165, 132) rgb(93, 76, 47) rgb(93, 76, 47) rgb(201, 165, 132); border-style: double; border-width: 3px;');
	padre.appendChild(hijo);

	//Creamos el marco del Banner

	padre=document.getElementById("sms_Alerts");
	hijo=document.createElement('div');
	hijo.id="sms_Alerts_banner";
	hijo.setAttribute('style','margin:5px auto 10px;width:970px;height:90px;padding:10;clear:both;border-color: rgb(201, 165, 132) rgb(93, 76, 47) rgb(93, 76, 47) rgb(201, 165, 132); background-color: #FEF2DC;');

	hijo.innerHTML='<table border="0"><tr><td ><div align="center"></div></td><td rowspan="3"><iframe id="sms_Alerts_iframe" name="sms_Alerts_iframe" src="'+url+'/publicity/banner.html" framespacing="0" frameborder="no" scrolling="no" height="90" width="728" ></iframe></td></tr><tr><td width="252"><div align="center"><h1><strong>Ikariam SMS Alerts '+version+'</strong></h1></div></td></tr><tr><td><div align="center"><a href="'+url+'" target="_blank">Author\'s Webpage</a></div></td></tr></table>';

	padre.appendChild(hijo);

	//Se crea la tabla de opciones

	padre=document.getElementById("sms_Alerts");
	hijo=document.createElement('div');
	hijo.id="sms_Alerts_options";
	hijo.setAttribute('style','margin:0px auto 5px;width:100%;padding:10;clear:both;text-decoration: none; color:#542C0F;background-color: #FEF2DC;');
	padre.appendChild(hijo);
	var tabla='<form id="options" name="options"><table width="100%"><tr><td align="center" bgcolor="#DEAE6C"><h3><strong>Alerts</strong></h3></td><td width="20%" align="center" bgcolor="#DEAE6C"><h3><strong>Status</strong></h3></td><td width="20%" align="center" bgcolor="#DEAE6C"><h3><strong>Options</strong></h3></td><td width="20%" align="center" bgcolor="#DEAE6C"> <h3><strong>Google Calendar</strong></h3></td><td width="20%" align="center" bgcolor="#DEAE6C"><h3><strong>Actions</strong></h3></td></tr><tr height="5"></tr><tr><td align="left" bgcolor="#FEF2DC">&nbsp;<label><input type="checkbox" name="CheckCities" id="CheckCities" value="true"/>Cities / Ciudades</label></td><td id="cell_cities" align="left" bgcolor="#FEF2DC">&nbsp;<SPAN ID="textCities"></SPAN> </td><td align="center" bgcolor="#FEF2DC">Time interval / Intervalo de tiempo</td><td align="center" bgcolor="#FEF2DC">User / Usuario</td><td align="center" bgcolor="#FEF2DC"><SPAN ID="cell_status"></SPAN></td></tr><tr><td align="left" bgcolor="#FEF2DC">&nbsp;<label><input type="checkbox" name="CheckMilitary" id="CheckMilitary" />Military / Milicia</label></td><td id="cell_military" align="left" bgcolor="#FEF2DC">&nbsp;<SPAN ID="textMilitary"></SPAN> </td><td align="center" bgcolor="#FEF2DC"><label>Min. (seconds)&nbsp;<input type="text" name="min" id="min" size="8" value="60"/></label></td><td align="center" bgcolor="#FEF2DC">&nbsp;<label><input type="text" name="user" id="user" /></label></td><td id="cell_reset" align="right" bgcolor="#FEF2DC"></td></tr><tr><td align="left" bgcolor="#FEF2DC">&nbsp;<label><input type="checkbox" name="CheckResearch" id="CheckResearch" />Research / Investigaciones</label></td><td id="cell_research" align="left" bgcolor="#FEF2DC">&nbsp;<SPAN ID="textResearch"></SPAN> </td><td align="center" bgcolor="#FEF2DC"><label>Max.(seconds)&nbsp;<input type="text" name="max" id="max" size="8" value="120"/></label></td><td align="center" bgcolor="#FEF2DC">Password / Clave</td><td  id="cell_test" align="right" bgcolor="#FEF2DC">&nbsp;</td></tr><tr><td align="left" bgcolor="#FEF2DC">&nbsp;<label><input type="checkbox" name="CheckDiplomacy" id="CheckDiplomacy" />Diplomacy / Diplomacia</label></td><td id="cell_diplomacy" align="left" bgcolor="#FEF2DC">&nbsp;<SPAN ID="textDiplomacy"></SPAN> </td><td align="center" bgcolor="#FEF2DC"></td><td align="center" bgcolor="#FEF2DC"><label><input type="password" name="pass" id="pass" /></label></td><td id="cell_save" align="right" bgcolor="#FEF2DC"><label></label></td></tr></table></form>';

	hijo.innerHTML=tabla;

	//Boton Start

	padre = document.getElementById("cell_save");
	hijo=document.createElement('a');
	hijo.setAttribute('class','button');
	hijo.innerHTML='Start/Stop';
	hijo.addEventListener("click",function(){save()},false);
	padre.appendChild(hijo);

	//Boton Prueba

	padre = document.getElementById("cell_test");
	hijo=document.createElement('a');
	hijo.setAttribute('class','button');
	hijo.innerHTML='SMS test';
	hijo.addEventListener("click",function(){smsAlert(5)},false);
	padre.appendChild(hijo);
}


function save(){
	var acities;
	if(document.getElementById("CheckCities").checked) {
		acities=1;
        }else {
		acities=0;
        }
	var amilitary;
	if(document.getElementById("CheckMilitary").checked) {
		amilitary=1;
        }else {
		amilitary=0;
        }
	var aresearch;
	if(document.getElementById("CheckResearch").checked) {
		aresearch=1;
        }else {
		aresearch=0;
        }
	var adiplomacy;
	if(document.getElementById("CheckDiplomacy").checked) {
		adiplomacy=1;
        }else {
		adiplomacy=0;
        }

	var dmin=parseInt(document.getElementById("min").value);
	var dmax=parseInt(document.getElementById("max").value);
	var duser=document.getElementById("user").value;
	var dpass=document.getElementById("pass").value;

	if(dmin<dmax){

	GM_setValue(host+".advCities",acities);
	GM_setValue(host+".advMilitary",amilitary);
	GM_setValue(host+".advResearch",aresearch);
	GM_setValue(host+".advDiplomacy",adiplomacy);
	GM_setValue(host+".min",dmin);
	GM_setValue(host+".max",dmax);
	GM_setValue(host+".user",duser);
	GM_setValue(host+".pass",dpass);
	GM_setValue(host+".save",1);
	
	status=GM_getValue(host+".status");
	if(status==1){
		GM_setValue(host+".status",0);
		cambiaTexto("Stopped","#FF0000","cell_status");
	}else{
		GM_setValue(host+".status",1);
		cambiaTexto("Working","#00CC00","cell_status");
	}
	
	
	main();
	}else{
		alert("Check if Min < Max");
	}
}

function reset(){
	GM_setValue(host+".cities",0);
	GM_setValue(host+".military",0);
	GM_setValue(host+".research",0);
	GM_setValue(host+".diplomacy",0);
}

function smsAlert(type){
	var text;
	switch(type){
		case 1:
			text="Ikariam SMS Alerts: alert at Cities";
			break;
		case 2:
			text="Ikariam SMS Alerts: You are under attack";
			break;
		case 3:
			text="Ikariam SMS Alerts: alert at Research";
			break;
		case 4:
			text="Ikariam SMS Alerts: alert at Diplomacy";
			break;
		case 5:
			text="Ikariam SMS Alerts works fine";
			alert("sms send");
			break;
		default:
			return false;

	}

	GM_xmlhttpRequest({
  		method: "POST",
  		url: url+"/sms/sms.php",
  		data: "user="+GM_getValue(host+".user")+"&pass="+GM_getValue(host+".pass")+"&texto="+text,
  		headers: {"Content-Type": "application/x-www-form-urlencoded"},
  		onload: function(response) {}
	})
	
}

function check(xhr) {
	
	var ini=xhr.indexOf('id="advCities"',0);
	var ini1=xhr.indexOf('class="',ini);
	ini1=ini1+7;
	var ini2=xhr.indexOf('"',ini1);
	var status=xhr.substring(ini1,ini2);
	if(GM_getValue(host+".advCities") && GM_getValue(host+".cities")!=1 && status != "normal"){
		//Acciones
		GM_setValue(host+".cities",1);
		cambiaTexto("SMS Sent","#FF0000","textCities");
		smsAlert(1);
	}else{

		if(GM_getValue(host+".cities")==1 && status == "normal"){

			GM_setValue(host+".cities",0);

		}

	}
	var ini=xhr.indexOf('id="advMilitary"',0);
	var ini1=xhr.indexOf('class="',ini);
	ini1=ini1+7;
	var ini2=xhr.indexOf('"',ini1);
	var status=xhr.substring(ini1,ini2);
	if(GM_getValue(host+".advMilitary") && GM_getValue(host+".military")!=1 && (status == "normalalert" || status=="premiumalert")){
		//Acciones
		GM_setValue(host+".military",1);
		cambiaTexto("SMS Sent","#FF0000","textMilitary");
		smsAlert(2);
	}else{

		if(GM_getValue(host+".military")==1 && status != "normalalert"){

			GM_setValue(host+".military",0);

		}

	}
	var ini=xhr.indexOf('id="advResearch"',0);
	var ini1=xhr.indexOf('class="',ini);
	ini1=ini1+7;
	var ini2=xhr.indexOf('"',ini1);
	var status=xhr.substring(ini1,ini2);
	if(GM_getValue(host+".advResearch") && GM_getValue(host+".research")!=1 && status != "normal"){
		//Acciones
		GM_setValue(host+".research",1);
		cambiaTexto("SMS Sent","#FF0000","textResearch");
		smsAlert(3);
	}else{

		if(GM_getValue(host+".research")==1 && status == "normal"){

			GM_setValue(host+".research",0);

		}

	}
	var ini=xhr.indexOf('id="advDiplomacy"',0);
	var ini1=xhr.indexOf('class="',ini);
	ini1=ini1+7;
	var ini2=xhr.indexOf('"',ini1);
	var status=xhr.substring(ini1,ini2);
	if(GM_getValue(host+".advDiplomacy") && GM_getValue(host+".diplomacy")!=1 && status != "normal"){
		//Acciones
		GM_setValue(host+".diplomacy",1);
		cambiaTexto("SMS Sent","#FF0000","textDiplomacy");
		smsAlert(4);
	}else{

		if(GM_getValue(host+".diplomacy")==1 && status == "normal"){

			GM_setValue(host+".diplomacy",0);

		}

	}

	main();
}

function cambiaTexto(newText,color,id){
	var objetoSPAN = document.getElementById(id);
	objetoSPAN.innerHTML = newText;
	objetoSPAN.style.color=color;
}


function getPage(){
	GM_xmlhttpRequest({
  		method: "POST",
  		url: "http://"+host+"/index.php?view=worldmap_iso",
  		data: "",
  		headers: {"Content-Type": "application/x-www-form-urlencoded"},
  		onload: function(xhr) {check(xhr.responseText);}
	})
}

function main(){

	//Estado

	status=GM_getValue(host+".status");
	if(status===undefined || status == 0){
		GM_setValue(host+".status",0);
		cambiaTexto("Stopped","#FF0000","cell_status");
	}else{
		cambiaTexto("Working","#00CC00","cell_status");
	}

	if(GM_getValue(host+".cities")!=1){
		cambiaTexto("Ready!","#00CC00","textCities");
	}else {
		cambiaTexto("SMS Sent","#FF0000","textCities");
	}
	if(GM_getValue(host+".military")!=1){
		cambiaTexto("Ready!","#00CC00","textMilitary");
	}else {
		cambiaTexto("SMS Sent","#FF0000","textMilitary");
	}
	if(GM_getValue(host+".research")!=1){
		cambiaTexto("Ready!","#00CC00","textResearch");
	}else {
		cambiaTexto("SMS Sent","#FF0000","textResearch");
	}
	if(GM_getValue(host+".diplomacy")!=1){
		cambiaTexto("Ready!","#00CC00","textDiplomacy");
	}else {
		cambiaTexto("SMS Sent","#FF0000","textDiplomacy");
	}
	
	//Datos de usuario
	
	if(GM_getValue(host+".save")==1){
		if(GM_getValue(host+".advCities")==1 && !document.getElementById("CheckCities").checked){
			document.getElementById("CheckCities").click();
		}

		if(GM_getValue(host+".advMilitary")==1 && !document.getElementById("CheckMilitary").checked){
			document.getElementById("CheckMilitary").click();
		}

		if(GM_getValue(host+".advResearch")==1 && !document.getElementById("CheckResearch").checked){
			document.getElementById("CheckResearch").click();
		}

		if(GM_getValue(host+".advDiplomacy")==1 && !document.getElementById("CheckDiplomacy").checked){
			document.getElementById("CheckDiplomacy").click();
		}


		var hijo=document.getElementById("min");
		if(GM_getValue(host+".min")!=""){
			hijo.value=GM_getValue(host+".min");
			tmin=GM_getValue(host+".min");
		}

		var hijo=document.getElementById("max");
		if(GM_getValue(host+".max")!=""){
			hijo.value=GM_getValue(host+".max");
			tmax=GM_getValue(host+".max");
		}

		var hijo=document.getElementById("user");
		if(GM_getValue(host+".user")!=""){
			hijo.value=GM_getValue(host+".user");
		}

		var hijo=document.getElementById("pass");
		if(GM_getValue(host+".pass")!=""){
			hijo.value=GM_getValue(host+".pass");
		}
	}

	status=GM_getValue(host+".status");
	if(status==1){
		var time=(parseInt(tmin) + Math.round(Math.random() * (tmax - tmin))) * 1000;
		setTimeout(getPage, time);
	}
}

if (titulo.indexOf('Ikariam Visual Map')==-1) {

	pantalla();
}

main();
