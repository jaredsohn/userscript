// ==UserScript==
// @name           Eveil Kryptos Report import Script
// @description    Eveil Kryptos Report import Script 
// @author         PyPe (+SB)
// @include        http://fr4.grepolis.com/*
// @require	http://userscripts.org/scripts/source/57756.user.js
// @version	1.2.7
// @history	1.2.6	nouvel onglet de visualisation des compos, disponible partout (forum, message, map ...)
// @history	1.2.5	amélioration de l'affichage des unités
// @history	1.2.4	accès aux infos kryptos d'une ville depuis la fiche de la ville
// @history	1.2.3	accès aux infos kryptos depuis le profil d'un joueur
// @history	1.2.2	rapport d'espionnage
// @history	1.2.1	Script autoupdater
// @history	1.2.0	Ajout des rapport de soutien
// @history	1.1.0	Compatibilité firefox
// @history	1.0.0	Ajout des rapport d'attaque : Chrome
// ==/UserScript==
var scriptId = 99628;
var scriptName = "Eveil Kryptos Report import Script";
var scriptVersion = "1.2.7";
var scriptWright = "PyPe";
var scriptWrightEmail = "phperet (at) gmail (dot) com";
ScriptUpdater.check(scriptId, scriptVersion);
var pPNG = "data:image/png;base64,";
var btn_Eveil = "iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAMAAAA4Nk+sAAAAAXNSR0IArs4c6QAAAftQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADxssDxwtEB0uEB0vEB0wEB4vEB4wEB8xEiI2EiI3EyM4EyQ6FCY8FCY9FSY9FSdAFShAFihBFipDFypEFytEFytFGCxGGCxIGC1JGS5JGS5KGS5LGS9MGi9NGjBMGjBNGjBOGzJQGzJRGzNSHDNSHDRTHDRUHDVUHDVVHTVWHTZWHTZXHTZYHjdZHjhZHjhaHzlcHzpdHzpeIDtfIDxgIT1hIT1iIT1jIT5kIj5kIj9lI0FoI0FpJENrJENsJURtJURuJkZxJ0h0J0l1KEt4KUx6Kk59K1CBLFKDLlaLL1eMMCsdMC0iMFmPMVuSMi8jMjAmMjEoMl2VMzIpNTEmNTMoNTYvOWqqOmyuPHCzPHC0QT8zSj8lS05HVk43WEcjWWl/WWuCWmyEW22GXG+IXHGLXXGMYHeVYXqaa1IefmEkg2QlhG06imknj20okolwmXUrmnYsoIFBrIQxrYQxr4Uys4ozt447upRHvp1bvp5cwMbOwZM3wsnTwsrVw5U3w6lww8zYxM3ZxtHfx9PiyNbnyraKytjry9ruz5470aFA0qND0qRF06VH06ZJ2Nzh2rNj3bpz3pod4MB/48eM5MiO5cmR5cuU67FI7r1k78Ju8ch888+N9tyt3MogXQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2wQBCxUk/vJqzQAAAVFJREFUKM91kUtPwkAUhVnirS9EN6gYMboYahQNY22VMhhJDRofcSELN6grqc/F/INGE1+DO5Ouhk75mc5MiRvkJJNJTk6+c29uKjVEYRjyqCd4N+KhkB/ncSxtDgMSKg0/wXun8/XxEgRv35/B6zVE2n4myL28ap1X80vNmwY+1mkO7aM6Y7SvFl7rQ3zTOzAZtS03x+jpxRxwnX5EqN5glDilQoURb1PbAh7Mkx2XUdPBZq22787qygjuqmdYQojHqJNf2F3U6Rj8ckVZSjZCZB7UOj14sizXVpWMYguhLHQ1xJdlJKlEJVxc1nYMt+s1xVaVCK3ubWh2BO2ETbzDbckihf6W9wnbtcs5TCma1gNKCHH+dqe4mFQK8BXb2ZIvL9nlGZ0WsGJMZSeNsYlMJmMYxui4tv85g1qnG0uJSF1NiLgXcx6pSdIjA0oPu/svwGeA5hNWT7QAAAAASUVORK5CYII%3D"; 
var btn_townInfo = "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%3D%3D";

//access to window object cross-browser
	var uW;
	if (typeof unsafeWindow === 'object'){
		uW = unsafeWindow;
	} else {
		uW = window;
	}
//Access jQuery
var $=uW.jQuery;
//Basic game data
var player=uW.Game.player_id;

//stockage de variables
var isGM = (typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined'),
getValue = (isGM ? GM_getValue : (function(name, def) {var s=localStorage.getItem(name); return (s=="undefined" || s=="null") ? def : s})),
setValue = (isGM ? GM_setValue : (function(name, value) {return localStorage.setItem(name, value)})),
deleteValue = (isGM ? GM_deleteValue : (function(name, def) {return localStorage.setItem(name, def)}));

function extractUrlParams () {
	var t = location.search.substring(1).split('&');
	var f = [];
	for (var i=0; i<t.length; i++) {
		var x = t[ i ].split('=');
		f[x[0]]=x[1];
	}
	return f;
}

if (location.search.match(/pass/) && location.search.match(/pseudo/)){
	param = extractUrlParams();
	setValue("pseudo", param['pseudo']);
	setValue("pass", param['pass']);
}

var pseudo=getValue("pseudo");
var pass=getValue("pass");

/**
* Rapports
*/
if(location.href.match(/action=view/)) { 
//alert($('#report_sending_town > ul > .town_name ').html());
// Access to window object cross-browser
var report_sending_town = $('#report_sending_town > ul > .town_name ').html();

if(report_sending_town != null){
	var reg = new RegExp("([0-9]+)");
	var matches = reg.exec(report_sending_town);
	var sending_town=matches[0];
}
var report_receiving_town = $('#report_receiving_town > ul > .town_name ').html();

if(report_receiving_town!=null){
	var reg = new RegExp("([0-9]+)");
	var matches = reg.exec(report_receiving_town);
	var receiving_town=matches[0];
}

var report_type_img = $('#report_arrow > img').attr('src');
if(report_type_img != null){
var reg = new RegExp("([a-zA-Z]+).png");
var matches = reg.exec(report_type_img);
var report_type=matches[1];
}
function sendEveilReport(){
	var unitsArr = "{";
	var reportDate = $('#report_date').html();
	if(report_type=="attack"){
	for(var c = 0; c < document.getElementsByTagName('script').length; c++) {
    	if (document.getElementsByTagName('script')[c].innerHTML.match(/ReportViewer.initialize/)) {
      		var ReportObj = document.getElementsByTagName('script')[c].innerHTML.split('ReportViewer.initialize(')[1].split(')')[0];
		}
	}
	var units = object2String(JSON.parse(ReportObj).result);
	}
	else if(report_type=="support"){
		$(".report_unit").each(function(i){		
		unitsArr += "\""+$(this).attr('class').replace("report_unit unit_","")+"\":\""+$(this).children('.place_unit_black').html()+"\",";
		});
		var units = unitsArr.substring(0,unitsArr.length-1)+"}";
	}
	else if(report_type=="espionage"){
		$(".report_unit").each(function(i){		
			if($(this).parent('#left_side')){
			 unitsArr += "\""+$(this).attr('class').replace("report_unit unit_","")+"\":\""+$(this).children('.place_unit_black').html()+"\",";
			 }
		});
		var units = unitsArr.substring(0,unitsArr.length-1)+"}";
		//alert(units);
	}
	//alert(units);
		$.get("http://peret.info/eveil/ajaxer.php",
		{
		action:"reportFromGrepo",
		units : units,
		reportDate : reportDate,
		sending_town : sending_town,
		receiving_town : receiving_town,
		reporter_id: player,
		report_type: report_type
		},function(data){
	
		   alert(data);
		   }
		);
	  
}

msgb = $('#report_date').parent();

cBt = document.createElement("A");
cBt.setAttribute('href','javascript:void(0);');
cBt.setAttribute('style','float:right');
cBt.setAttribute('class','button');
cBt.addEventListener("click", sendEveilReport, false);
cBt.innerHTML = '<span class="left"><span class="right"><span class="middle" style="min-width:50px">Eveil</span></span></span>';
msgb.append(cBt);
}
/**
fin rapports
**/

/**
*recherche de joueur (lien pour acceder aux infos sur l'outil eveil)
*/
if(location.href.match(/player/)) 
{
	plip = $('#player_buttons');

	plup = document.createElement("A");
	if (location.search.indexOf("&")!=-1) 
		plup.setAttribute('href','http://peret.info/eveil/'+location.search.substr(0, location.search.indexOf("&")));
	else 
		plup.setAttribute('href','http://peret.info/eveil/'+location.search);
	plup.setAttribute('style','float:left; height:23px; width:22px; background:url('+ pPNG + btn_Eveil +') no-repeat;');
	plup.setAttribute('alt','Outil Eveil');
	plup.setAttribute('target','_blank');
	plup.setAttribute('title','Outil Eveil');

	plip.append(plup);
}
/**fin recherche joueur**/

/**recherche ville**/
var EveilTownInfo = (function () {
		var TownInfo;
		var init_old;
		
		var init_new = function () {
			var o=init_old.apply(TownInfo, arguments);
			AppendStatTab();
			return o;
		};

		var AppendStatTab = function () {
      		if (TownInfo.type==='town_info' ){
				$('#info_tab_window_bg').tabs("add", "#town_stats", "<img src='"+ pPNG + btn_townInfo +"' style='position: relative; top: 4px; left: 4px;' />");
				$('#info_tab_window_bg').bind("tabsselect", TabSelect);
			}
		};

		var TabSelect = function (event, ui) {
			if (ui.index == 6) {	
			    var eveil = "<p id='Eveil' style='height:280px;width:460px;margin:5px 10px;overflow:auto;'></p>";
				$(ui.panel).after(eveil);
				getTownInfo(TownInfo.town_id);
			}
			else
			{
				$("#Eveil").remove();
			}
		};

		return function () {
				TownInfo = uW.TownInfo;
				init_old = TownInfo.init;
				TownInfo.init = init_new;
		};
}());

stylesheet = "<link rel=\"kryptos stylesheet\" type=\"text/css\" href=\"http://peret.info/eveil/css/units.css\" title=\"kryptos\">";
$('head').append(stylesheet);
EveilTownInfo();

function getTownInfo(id){
	$.get("http://peret.info/eveil/ajaxer.php",
		{
			action:"townInfoFromGrepo",
			town_id : id,
            user_login : pseudo,
            user_pass : pass
		},function(data){
				$("#Eveil").html(data);
		   }
		);
}

function object2String(obj) {
    var val, output = "";
    if (obj) {    
        output += "{";
        for (var i in obj) {
            val = obj[i];
            switch (typeof val) {
                case ("object"):
                    if (val[0]) {
                        output += '"'+ i + '":' + array2String(val) + ',';
                    } else {
                        output += '"'+ i + '":' + object2String(val) + ',';
                    }
                    break;
                case ("string"):
                    output += '"'+ i + '":"' + escape(val) + '",';
                    break;
                default:
                    output += '"'+ i + '":"' + val + '",';
            }
        }
        output = output.substring(0, output.length-1) + "}";
    }
    return output;
}
function array2String(array) {
    var output = "";
    if (array) {
        output += "[";
        for (var i in array) {
            val = array[i];
            switch (typeof val) {
                case ("object"):
                    if (val[0]) {
                        output += array2String(val) + ",";
                    } else {
                        output += object2String(val) + ",";
                    }
                    break;
                case ("string"):
                    output += '"' + escape(val) + '",';
                    break;
                default:
                    output += '"' + val + '",';
            }
        }
        output = output.substring(0, output.length-1) + "]";
    }
    return output;
}