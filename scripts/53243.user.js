// ==UserScript==
// @name           Spy Report Archive
// @namespace      Spy Report Archive
// @author         Stathis
// @description    This script saves spy reports and stores them in an archive. Be aware that this script is not approved, because it mimics a Ikariam Plus feature. Use is on own risk.
// @version        1.27
// @include        http://s*.ikariam.*/*?view=safehouse*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://ikariamscriptresources.googlecode.com/files/IkariamLanguageDetection.js
// ==/UserScript==

// Spy Report Keeper: version 1.0.0, http://www.no-net.org/miasma/ikariam/SpyReportKeeper.user.js
// 2009-05-05
// Copyright (c) 2009, www.entula.net by miasM
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Great thanks to Miasma, by coding the hard bits.
//
// Spy Report Archive: version 1.1.1
// 2009-06-12
// Copyright (c) 2009, Makomedia
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Version History:
// 0.10: Original Public Release
// 0.20: First code rewrite.
// 0.30: some bug fix
// 1.00: Added display function
//		  Set refresh when data has been deleted
// 1.10: Feature: Added date from spy report to strings 
// 1.11: Overall cleaning of code
//		  Feature: Visual markup
// 1.21: Feature: Adding International Language support, thanks to MartynT0
//		  Feature: Adding config div, for viewing language, and in future updates of script.
// 1.22: Language: Added Spanish
//		  Language: Added French
//		  Bugfix: Resources misspelling
// 1.23: Language: Added German
// 1.24: Language: Added Turkish
//		  Bugfix: 2 Tooltips beginning with same character
// 1.25: Feature: Get version number from userscript.org for updating
// 1.26: Bugfix: Change versionnumber format to support update function
// 1.27: Language: Added Portugese
//		 other icon for config when oud-of-date
var version = "1.27"

/*
*getLanguage() is in IkariamLanguageDetection.js
*
* ltr: Is the language written left to right?
* SRA: Spy Report Archive
* Troops: First character of tooltip when hovering over a spy garrison link in spy reports
* Resources: First character of tooltip when hovering over a spy warehouse link in spy reports
* DelArch: Delete the whole spy report archive!
* DelSpy: Delete this spy report
* Language: Translation of 'language'
* loclang: Local name for this language
* confirmdel: Are you sure to delete the archive?
*/

//default: 	"engl name lang":	{ltr: true, SRA:"", Troops:"", Resources:"", DelArch:"", DelSpy:"", language:"", loclang:"", confirmdel:""}
const language = {
	"arabic":       { },
    "bulgarian":    { },
    "chinese":      { },
    "czech":        { },
    "danish":       { },
    "dutch":        {	ltr: true,	SRA:"Spionage Rapport Archief",	Troops:"T",	Resources:"Gr",	DelArch:"Verwijder gehele Archief!",	DelSpy:"Verwijder dit spion rapport", 	language:"Taal",		loclang:"Nederlands",	confirmdel:"Weet je zeker dat je het spionage archief wilt verwijderen?"},
    "english":      {	ltr: true,	SRA:"Spy Report Archive",		Troops:"",	Resources:"",	DelArch:"Delete spy report Archive!",	DelSpy:"Delete this spy report", 		language:"Language",	loclang:"English",		confirmdel:"Are you sure to delete the spy archive?"},
    "finish":       { },
    "french":       {	ltr: true, 	SRA:"Rapports d'espions",		Troops:"T", Resources:"Ma", DelArch:"Effacer les archives!", 		DelSpy:"Effacer ce rapport", 			language:"Langue", 		loclang:"Francais", 	confirmdel:"Etes vous sur de vouloir effacer les archives ?"},
    "german":       {	ltr: true, 	SRA:"Spionageberichte Archiv", 	Troops:"T", Resources:"Ro", DelArch:"Gesamtes Archiv löschen", 		DelSpy:"Spionagebericht löschen", 		language:"Sprache", 	loclang:"Deutsch", 		confirmdel:"Sind Sie sicher, dass sie das gesamte Archiv löschen wollen?"},
    "greek":        {	ltr: true,	SRA:"Spy Report Archive",		Stratos:"",	Resources:"",	DelArch:"Diegrapse anafores kataaskopias!",	DelSpy:"Diegrapse authn thn anafora kataaskopias!", 		language:"Glossa",	loclang:"Greek",		confirmdel:"Eisai sigouros oti thes na thn diagrapsis?"},
    "hebrew":       { },
    "hungarian":    { },
    "italian":      {	ltr: true,	SRA:"",							Troops:"T",	Resources:"Ri",	DelArch:"",								DelSpy:"", 								language:"",			loclang:"",				confirmdel:""},
    "norwegian":    { },
    "korean":       { },
    "latvian":      { },
    "lithuanian":   { },
    "pinoy":        { },
    "polish":       { },
    "portugese":    {	ltr: true, 	SRA:"Arquivo de Relatórios de Espionagem", Troops:"Tr", Resources:"Re", DelArch:"Apagar o Arquivo de Relatórios", DelSpy:"Apagar este relatório", language:"Idioma", loclang:"Português brasileiro", confirmdel:"Tem certeza que deseja apagar o Arquivo de Relatórios?"},
    "romanian":     { },
    "russian":      { },
    "serbian":      { },
    "slovak":       { },
    "slovene":      { },
    "spanish":      {	ltr: true,	SRA:"Archivo De Reportes de Espías", Troops:"Tr", Resources:"Ma", DelArch:"Borrar el archivo de reportes", DelSpy:"Borrar este reporte", 	language:"idioma", 		loclang:"Español", 		confirmdel:"¿Estás seguro de borrar el archivo de reportes?"},
    "swedish":      { },
    "turkish":      {	ltr: true,	SRA:"Casusluk Raporlari Arsivi",	 Troops:"As", Resources:"Ka", DelArch:"Casusluk raporlari arsivini sil", DelSpy:"Bu raporu sil",			language:"Dil", 		loclang:"Turkish",		confirmdel:"Casusluk raporlari arsivini silmek istediginize emin misiniz?"},
    "ukranian":     { },
    "urdu":         { },
    "vietnamese":   { }
}[getLanguage()];

const left	= language.ltr?'left':'right';
const right	= language.ltr?'right':'left';

//Check if the needed translation of the spy reports is available in this language
if (language.Troops.length==0 || language.Resources.length==0){
	alert('Spy Report Archive:\nYour ingame language: ' + getLanguage() + ', is not yet supported.\nGo to http://userscripts.org/topics/28811 to help me with translation!');
	}

//Scriptdetails
var id = 51465;
var usurl = "http://userscripts.org/scripts/show/" + id;
//Is there an update?
function Update (){
	//Getting userscript page
	GM_xmlhttpRequest ({
		method: 'GET',
		url: usurl,
		headers: {
					'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
					'Accept': 'text/html',
				 },
		onload: function(responseDetails) {
			var userScripts = document.implementation.createDocument ('', '', null);
			var html = document.createElement ('html');
			html.innerHTML = responseDetails.responseText;
			userScripts.appendChild (html);
			
			//Obtain version number
			var versionNew = userScripts.getElementById ('summary').getElementsByTagName ('b')[1].nextSibling.textContent;
			if( Number(versionNew) != Number(version)){
			document.getElementById('version').innerHTML='There is a new version of this <a href="' + usurl + '" target="_blank">script</a> ('+ versionNew+')<br><a href= "http://userscripts.org/scripts/source/' + id + '.user.js" target="_self">Install latest version!</a>';
			var upimg = document.getElementById('config').getElementsByTagName('img');
			upimg[0].setAttribute('src','http://www.iconfinder.net/data/icons/tango/32x32/status/software-update-available.png');
			}else{
			document.getElementById('version').innerHTML='This scriptversion is the latest.';
			}
		}
	});
}
Update ();

/*
This function lets us access an element by it's class name
Original Author: wphilipw
Edited: ImmortalNights
*/

document.getElementsByClass = function(className) {
    var all = document.getElementsByTagName('*');
    var elements = new Array();
    for (var e = 0; e < all.length; e++) { //
        var searchRegExp = new RegExp(className);
        var htmlObject = all[e].className;
        if (searchRegExp.exec(htmlObject) != null)
          elements[elements.length] = all[e];
    }
    return elements;
}

/*
Delete strings from file
*/
unsafeWindow.cleandata = function(str){
	if(str != null){
		GM_deleteValue(str);
		showReport();
	}else{
		if (confirm(language.confirmdel)){
		saves = GM_listValues();
			for (var d = 0; d < saves.length; d++){
				GM_deleteValue(saves[d]);
				showReport();
			}
		}else{return;}
	}
}


function getIdentifier(objectClass) {
    var logType = objectClass.substr(8, 4)
    return logType;
}

function getLimit(logLength) {
    var processMaximum = 30;
    if (processMaximum != 0) {
        return (logLength > processMaximum ? processMaximum : logLength);
    }
    return logLength;
}

/*
This function runs when the system starts, also does the main funtions of the script
Author: miasM
*/
function WriteFile(str,data)
{
	saves = GM_listValues();
	Saved=false;
	for (var d = 0; d < saves.length; d++){
		if(str==saves[d]){ Saved=true; break;}
	}
	if(!Saved){
		GM_setValue(str, data); // Write the string to a file
	}
	
	//TODO: Sort reports on city name
	//1. Cut strings from file, and paste into arrays
	//2. Swap str and data
	/*
	for( var i =0; i < arr.length; i++)
	{
	var p = arr[i];
	arr[i] = [ p[1], p[0] ];
	}
	*/
	//3. Sort strings on data(cityname)
	//4. Swap back
	//5. Write back into file
}

function showReport(){
	window.location.reload();
}
// TODO: getting archive between buildingupgrade and unitconstructionlist
function whereToShow() {
	if (document.getElementById('information')!=null &&
		document.getElementById('island')==null) return 'information';
	if (document.getElementById('buildingUpgrade')!=null) return 'buildingUpgrade';
	if (document.getElementById('infocontainer')!=null) return 'infocontainer';
	if (document.getElementById('backTo')!=null) return 'backTo';
	if (document.getElementById('viewMilitaryImperium')!=null) return 'viewMilitaryImperium';
	if (document.getElementById('viewDiplomacyImperium')!=null) return 'viewDiplomacyImperium';
	if (document.getElementById('viewResearchImperium')!=null) return 'viewResearchImperium';
	if (document.getElementById('viewCityImperium')!=null) return 'viewCityImperium';
	return null;
}

//open config div
unsafeWindow.divChange = function divChange() {
document.getElementById('lang').style.visibility="visible";
document.getElementById('SpyReportArchiveContent').style.opacity="0.4";
}
unsafeWindow.divChangeBack = function divChangeBack() {
document.getElementById('lang').style.visibility="hidden";
document.getElementById('SpyReportArchiveContent').style.opacity="1.0";
}

//Defining css style

//Read reports
function init() {
    var logs = document.getElementsByClass("subject");
	var datam = document.getElementsByClass("date");
	var title = new Array();
    for (var m = 0; m < logs.length;m ++) {
		var pip2 = logs[m].innerHTML.substr(logs[m].innerHTML.lastIndexOf("=")+1);
		var spyMsgID = pip2.slice(0,pip2.lastIndexOf("\""));
		//
		var pip4 = logs[m].innerHTML.indexOf("=");
        var pip3 = logs[m].innerHTML.substr(pip4+2);
		//
		if((pip3.slice(0,language.Troops.length)==language.Troops)||(pip3.slice(0,2)==language.Resources)){
		pip3 = pip3.slice(0,pip3.indexOf("\""));
		pip6 = pip3.substr(pip3.indexOf(" "),pip3.length);
		//alert(pip3.indexOf(" ")+" - "+pip3.length+" - "+pip6);
		var pip7 = datam[m].innerHTML.lastIndexOf(":");
		var date = datam[m].innerHTML.substr(0,5)+datam[m].innerHTML.substr(10,pip7-10);
		//alert(date)
		WriteFile(spyMsgID,"<b>"+pip6+"</b>, "+date+":<br>"+logs[m].innerHTML);
		}
    }
	var baseElements = '<h3 class="header" style="padding-left:8px;"><img src="http://www.iconfinder.net/data/icons/Futurosoft%20Icons%200.5.2/22x22/filesystems/folder_home.png" width="22px" height="22px" align="left">' + language.SRA + '</h3><div id="lang" style="font-size:8pt;visibility:hidden;width:150px;position:absolute;top:230px;left:32px;background-color:#C27000;padding:2px 4px 8px;z-index:2"><div style="display:block;text-align:middle;color:#FFFFFF;font-weight:bold;">' + language.SRA + '</div><div style="display:block;text-align:left;color:#FFFFFF;font-size:8pt;">Author: <a href="http://userscripts.org/users/78455" TARGET="_blank">Makomedia</a> (original <a href="http://userscripts.org/scripts/show/49799" TARGET="_blank">script</a> by <a href="http://userscripts.org/users/91536" TARGET="_blank">Miasma</a>)</div><div style="display:block;text-align:left;color:#FFFFFF;">' + language.language + ': ' + language.loclang + '</div><div style="display:block;text-align:left;color:#FFFFFF;">Your version: ' + version + '</div><div id="version" style="display:block;text-align:left;color:#FFFFFF;"></div><a href="javascript:void(0)" onClick="divChangeBack()"><img src="http://www.iconfinder.net/data/icons/oxygen/16x16/actions/edit-delete.png"></a></div>';
    baseElements += '<div id="SpyReportArchiveContent" class="content" style="font-size:8pt;padding: 0px 6px 0px;z-index:1;"></div>';
    baseElements += '<div class="footer"></div>';

	//need a new div above unitconstructionlist
	if(document.getElementById('SpyReportArchive') == null) {
    var divContainer = document.createElement('div');
    divContainer.setAttribute('id','SpyReportArchive');
	//divContainer.setAttribute('class','dynamic');
	divContainer.innerHTML = baseElements;
	x = document.getElementById(whereToShow());
	x.appendChild(divContainer);
	}

	var foot = document.getElementById("SpyReportArchiveContent");
	//ids.SpyReportKeeperContent.a.display="none";
	//ids.SpyReportKeeperContent.tags.a.fontSize="8pt";
	//ids.SpyReportKeeperContent.tags.a.fontStyle="normal";
	//ids.SpyReportKeeperContent.tags.a.text-align="left";
	
	//Reading out strings, putting in HTML
	var saves = GM_listValues();
	var pip;
	pip="";
		for (var d = 0; d < saves.length; d++){
			pip +="<div id='SpyReport' style='display:block;text-align:left;'>"+GM_getValue(saves[d])+"<a href='javascript:void(0)' title=" + language.DelSpy + " onClick='cleandata("+saves[d]+")'><img src='http://www.iconfinder.net/data/icons/oxygen/16x16/actions/edit-delete.png' height='12px' width='12px' style='display: inline;vertical-align:middle' /></a></div>";
		}
		pip +="<div id='SpyReportClean' style='display:block;position:relative;top:5px;'><a href='javascript:void(0)' title=" + language.DelArch + " onClick='cleandata()'><img src='http://www.iconfinder.net/data/icons/tango/16x16/actions/edit-clear.png' align='left'></a></div><div id='config' style='display: block;position:relative;left:80px;top:0px;'><a href='javascript:void(0)' onClick='divChange()'><img src='http://www.iconfinder.net/data/icons/oxygen/22x22/actions/fileview-detailed.png' style='display: inline;' height='22px' width='22px' /></a></div>";
		pip +="";
	foot.innerHTML=pip;
	//ids.SpyReportKeeperContent.tags.a.color="blue";
}

//Start the Script
init();