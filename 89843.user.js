// ==UserScript==
// @name        stnkvcmls bitefight converter
// @namespace 
// @version     0.2.2
// @description	Converts combat reports for Bitefight browser game
// @license     GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include     http://s*.bite-fight.*/report/fightreport/*
// @include     http://s*.*.bite-fight.*/report/fightreport/*
// @include     http://s*.bitefight.*/report/fightreport/*
// @include     http://s*.*.bitefight.*/report/fightreport/*
// @exclude     http://support.bitefight.*/*
// @exclude     http://support.bite-fight.*/*
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require     http://userscripts.org/scripts/source/57756.user.js
// @history     0.2.2 BugFix: Fixed spelling.
// @history     0.2.2 Feature: Added support for new board style.
// @history     0.2.2 Feature: Added alliance tags in Bitefight 2.
// @history     0.2.1 Feature: Added Update button.
// @history     0.2.1 Feature: Now works for all servers. Using English if specific words aren't translated.
// @history     0.2.1 Language: Added Greek.
// @history     0.2 Feature: Changed display of skills from "base [+bonus]" to "total [base+bonus]"
// @history     0.2 BugFix: Fixed bug wrong display of skills
// @history     0.1 First working version
// @history     0.0.1 Beta: First release
// ==/UserScript==

const crConvVersion = "0.2.2";
ScriptUpdater.check(89843, crConvVersion);
function update(){
  ScriptUpdater.forceNotice(89843, crConvVersion);
}

language = {
	'rs' : { version: "верзија", created: "Направљено са", convertedReport: "Конвертовани извештај",
        werewolf: "вукодлак", vampire: "вампир", update: "Ажурирај", newBoard: "Нови форум", oldBoard: "Стари форум"
			},
	'ba' : { version: "verzija", created: "Napravljeno sa", convertedReport: "Konvertovani izveštaj",
        werewolf: "vukodlak", vampire: "vampir", update: "Ažuriraj", newBoard: "Novi forum", oldBoard: "Stari forum"
			},
	'en' : { version: "version", created: "Created with", convertedReport: "Converted report",
        werewolf: "werewolf", vampire: "vampire", update: "Update", newBoard: "New board", oldBoard: "Old board"
			},			
  'gr': { version: "έκδοση", created: "Δημιουργήθηκε με", convertedReport: "Τροποποιημένη αναφορά", 
        werewolf: "Λυκάνθρωπος", vampire: "Βρυκόλακας", update: "Update", newBoard: "New board", oldBoard: "Old board"
      },
}

reportElements = {
	attacker: { 
    name: "",
    tag: "",
    race: "",
    level: null,
    vitality: null,
    experience: null,
    strength: null,
    defence: null,
    dexterity: null,
    endurance: null,
    charisma: null,
    damage: null,
    battleValue: null,
    chanceForHit: null,
    chance: null,
    vitalityEnd: null
  },
	defender: { 
    name: "",
    tag: "",
    race: "",
    level: null,
    vitality: null,	
    experience: null,
    strength: null,
    defence: null,
    dexterity: null,
    endurance: null,
    charisma: null,	
    damage: null,
    battleValue: null,
    chanceForHit: null,
    chance: null,
    vitalityEnd: null
  },
	winner: "",
	gold: "",
	exp: "",
	date: "",
	end: ""
}

textForReport = {
	level: "",
	vitality: "",
	experience: "",
	strength: "",
	defence: "",
	dexterity: "",
	endurance: "",
	charisma: "",
	winner: "",
	collected: "",
	vs: "",
	damage: "",
	battleValue: "",
	chanceForHit: "",
	chance: "",
	vitalityEnd: ""
}

var link = "http://userscripts.org/scripts/show/89843";
var name = "stnkvcmls' Bitefight Converter";
var gold = "http://img168.imageshack.us/img168/6571/res2.gif"

var textArea;
var colorNew = { background: "#460146", attacker: "#0ABBF5", defender: "#FF3300", text: "#DAA812", winner: "#000000", end: "#000000"};
var colorOld = { background: "#121212", attacker: "#0066CC", defender: "#FF3300", text: "#DAA812", winner: "#000000", end: "#000000"};
var color;

lang = getLang();
if(language[lang] == null) lang = 'en';
var gameVersion;

function getLang(){
	var url = document.URL.replace("http://","");
	url = url.substring(0,url.indexOf("/")).split('.');
	var length = url.length;
	if(url[3] == "co"){
		if(url[length-1] == "uk") return "en";
		else return url[length-1];
	}
	else{
		if(length == 3){
			if(url[length-1] == "com" || url[length-1] == "org" || url[length-1] == "us") return "en";
			else return url[length-1];
		}
		else{
			if(url[1] == "us") return "en";
			else return url[1];
		}
	}
	return "en";
}

function createHofElement(){
	$('div#content').append(
		'<div class="btn-left left"><div class="btn-right">'+
				'<a class="btn" id="hof" href="javascript:void(0)">' + language[lang].convertedReport + '</a>'+
		'</div></div><br class="clearfloat">'+
		'<div id="convertedReport" style="display: none">'+
			'<div class="wrap-top-left"><div class="wrap-top-right"><div class="wrap-top-middle"></div></div></div>'+
			'<div class="wrap-left">'+
				'<div class="wrap-content wrap-right">'+
					'<h2> <img alt="" src="/img/symbols/race2small.gif">' + language[lang].convertedReport + '<span id="stnUpd" style="cursor: pointer; float: right;">' + language[lang].update + '</span>' + '</h2>'+
					'<input type="radio" name="radio1" id="newBoard" checked>' + language[lang].newBoard + '</input>' +
          '<input type="radio" name="radio1" id="oldBoard">' + language[lang].oldBoard + '</input>' +
          '<textarea id="stnkvcmlsTextArea" style="width: 90%; height: 150px; resize: none;" readonly></textarea>'+
					'<div id="preview"></div><br>'+
				'</div>'+
			'</div>'+
			'<div class="wrap-bottom-left"><div class="wrap-bottom-right"><div class="wrap-bottom-middle"></div></div></div>'+			
		'</div>'
	);
	
	$('#hof').click(function(){ $('#convertedReport').slideToggle(500); });
	$('#stnkvcmlsTextArea').click(function(){ $(this).select(); });
	$('#stnTitle').click(function(){ $(this).select(); });
  $('#stnUpd').click(function(){ update(); });
	$('#newBoard').click(function(){ color = colorNew; makeReport(); });
  $('#oldBoard').click(function(){ color = colorOld; makeReport(); });
  
  color = colorNew;
	gameVersion = 1;
	parseReport();
}

function parseReport(){
	
	var tmp = $('#fightreport .wrap-left .wrap-content h2')[0].childNodes[1].nodeValue;
	textForReport.winner = tmp.substring(0,tmp.indexOf(':'));
	reportElements.winner = tmp.substring(tmp.indexOf(':')+2);
	
	var i = 0;
	$('#fightreport .wrap-left .wrap-content div div table tr td').each(function(){
		if(i == 1) textForReport.damage = $(this).html();
		else if(i == 3) reportElements.attacker.name = $(this).html();
		else if(i == 4) reportElements.attacker.damage = $(this).html();
		else if(i == 6) reportElements.defender.name = $(this).html();
		else if(i == 7) reportElements.defender.damage = $(this).html();
		i++;		
	});	
	
	tmp = $('#fightreport .wrap-left .wrap-content div p')[0].childNodes[0].nodeValue.replace(/\s{2}/g,'');
	if(tmp.indexOf(reportElements.attacker.name) != -1) reportElements.end = reportElements.attacker.name;
	else if(tmp.indexOf(reportElements.defender.name) != -1) reportElements.end = reportElements.defender.name;
	tmp = tmp.replace(reportElements.winner,"").replace(reportElements.attacker.name,'').replace(reportElements.defender.name,'');
	textForReport.collected = " " + tmp.substring(1,tmp.indexOf(':')-1)
	tmp = tmp.substring(tmp.indexOf(':')+1).replace(' ','');
	if(tmp.indexOf('+') == -1){
		reportElements.gold = tmp;
		if($('#fightreport .wrap-left .wrap-content div p')[0].childNodes[2] != null){
			tmp = $('#fightreport .wrap-left .wrap-content div p')[0].childNodes[2].nodeValue.replace('\n','').replace(/\s+/g,' ').replace(' , + ','+');
			reportElements.exp = tmp.substring(0,tmp.indexOf(' '));
			textForReport.exp = tmp.substring(tmp.indexOf(' ')+1);
		}
	}
	else{
		tmp = tmp.replace('+ ','+');
		reportElements.exp = tmp.substring(0,tmp.indexOf(' '));
		textForReport.exp = tmp.substring(tmp.indexOf(' ')+1);
	}
	
	tmp = $('#fightreport .wrap-left .wrap-content div h2').html().replace(/\s{2}/g,'');
	tmp = tmp.substring(tmp.indexOf(',')+2);
	reportElements.date = tmp.substring(0,tmp.length-1);
	

	textForReport.vs = $('#battleReport .wrap-left .wrap-content div table tr td').next().html().replace(/&nbsp;/g,'');
	
	textForReport.level = $('#battleReport td.rbg')[0].innerHTML.replace(':','').replace(/\s+/g,'');
	textForReport.strength = $('#battleReport td.rbg')[2].innerHTML.replace(':','').replace(/\s+/g,'');
	textForReport.defence = $('#battleReport td.rbg')[4].innerHTML.replace(':','').replace(/\s+/g,'');
	textForReport.dexterity = $('#battleReport td.rbg')[6].innerHTML.replace(':','').replace(/\s+/g,'');
	textForReport.endurance = $('#battleReport td.rbg')[8].innerHTML.replace(':','').replace(/\s+/g,'');
	textForReport.charisma = $('#battleReport td.rbg')[10].innerHTML.replace(':','').replace(/\s+/g,'');
	textForReport.experience = $('#battleReport td.rbg')[12].innerHTML.replace(':','').replace(/\s+/g,'');
	textForReport.vitality = $('#battleReport td.rbg')[14].innerHTML.replace(':','').replace(/\s+/g,'');
	
	reportElements.attacker.level = $('#battleReport td.rbg')[1].innerHTML.replace(/\s+/g,'');
	reportElements.attacker.strength = $('#battleReport td.rbg')[3].innerHTML.replace(/\s+/g,'').replace('(','[').replace(')',']');
	reportElements.attacker.defence = $('#battleReport td.rbg')[5].innerHTML.replace(/\s+/g,'').replace('(','[').replace(')',']');
	reportElements.attacker.dexterity = $('#battleReport td.rbg')[7].innerHTML.replace(/\s+/g,'').replace('(','[').replace(')',']');
	reportElements.attacker.endurance = $('#battleReport td.rbg')[9].innerHTML.replace(/\s+/g,'').replace('(','[').replace(')',']');
	reportElements.attacker.charisma = $('#battleReport td.rbg')[11].innerHTML.replace(/\s+/g,'').replace('(','[').replace(')',']');
	reportElements.attacker.experience = $('#battleReport td.rbg')[13].innerHTML.replace(/\s+/g,'');
	reportElements.attacker.vitality = $('#battleReport td.rbg')[15].innerHTML.replace(/\s+/g,'').replace('.','');

	reportElements.defender.level = $('#battleReport td.rbg')[17].innerHTML.replace(/\s+/g,'');
	reportElements.defender.strength = $('#battleReport td.rbg')[19].innerHTML.replace(/\s+/g,'').replace('(','[').replace(')',']');
	reportElements.defender.defence = $('#battleReport td.rbg')[21].innerHTML.replace(/\s+/g,'').replace('(','[').replace(')',']');
	reportElements.defender.dexterity = $('#battleReport td.rbg')[23].innerHTML.replace(/\s+/g,'').replace('(','[').replace(')',']');
	reportElements.defender.endurance = $('#battleReport td.rbg')[25].innerHTML.replace(/\s+/g,'').replace('(','[').replace(')',']');
	reportElements.defender.charisma = $('#battleReport td.rbg')[27].innerHTML.replace(/\s+/g,'').replace('(','[').replace(')',']');
	reportElements.defender.experience = $('#battleReport td.rbg')[29].innerHTML.replace(/\s+/g,'');
	reportElements.defender.vitality = $('#battleReport td.rbg')[31].innerHTML.replace(/\s+/g,'').replace('.','');
	
	tmp = $('#battleReport td.no-bg').children().attr('src').replace(/http:\/\/[^[\/]+\//,'').split('/');
	if(tmp[2] == 1 || tmp[1].indexOf('1') != -1) reportElements.attacker.race = language[lang].vampire;
	else if(tmp[2] == 2 || tmp[1].indexOf('2') != -1) reportElements.attacker.race = language[lang].werewolf;
	
	tmp = $('#battleReport td.no-bg').next().next().children().attr('src').replace(/http:\/\/[^[\/]+\//,'').split('/');
	if(tmp[2] == 1 || tmp[1].indexOf('1') != -1) reportElements.defender.race = language[lang].vampire;
	else if(tmp[2] == 2 || tmp[1].indexOf('2') != -1) reportElements.defender.race = language[lang].werewolf;
	
	makeReport();
}

function createHofElementV2(){
	$('div#content').append(
		'<div style="clear:both"></div>'+
		'<h1 id="hof" style="cursor: pointer;">' + language[lang].convertedReport + '</h1>'+
		'<div id="convertedReport" class="clearfix" style="display: none;">'+
			'<div class="wrap-top-left"><div class="wrap-top-right"><div class="wrap-top-middle"></div></div></div>'+
			'<div class="wrap-left">'+
				'<div class="wrap-content wrap-right">'+
					'<h2>' + language[lang].convertedReport + '<span id="stnUpd" style="cursor: pointer; float: right;">' + language[lang].update + '</span>' + '</h2>'+
					'<div class="table-wrap clearfix">'+
            '<input type="radio" name="radio1" id="newBoard" checked>' + language[lang].newBoard + '</input>' +
            '<input type="radio" name="radio1" id="oldBoard">' + language[lang].oldBoard + '</input>' +
						'<textarea id="stnkvcmlsTextArea" style="width: 90%; height: 150px; resize: none;" readonly></textarea>'+
						'<div id="preview"></div><br>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="wrap-bottom-left"><div class="wrap-bottom-right"><div class="wrap-bottom-middle"></div></div></div>'+					
		'</div>'+
		'<script type="text/javascript"> var hidden=true; $(function(){ $("#hof").click(function(){ if(hidden){ $("#convertedReport").show(); hidden=false; } else{ $("#convertedReport").hide(); hidden=true; } }); }); </script>'
	);
	
	$('#stnkvcmlsTextArea').click(function(){ $(this).select(); });
	$('#stnTitle').click(function(){ $(this).select(); });
  $('#stnUpd').click(function(){ update(); });
	$('#newBoard').click(function(){ color = colorNew; makeReport(); });
  $('#oldBoard').click(function(){ color = colorOld; makeReport(); });
  
  color = colorNew;  
	gameVersion = 2;
	parseReportV2();
}

function parseReportV2(){
	var tmp = $('#reportResult .wrap-left .wrap-content h2').html().replace(/\s{2}/g,'');
	tmp = tmp.substring(tmp.indexOf(',')+2);
	reportElements.date = tmp.substring(0,tmp.length);
	
	tmp = $('#reportResult .wrap-left .wrap-content .table-wrap h3').html();
	textForReport.winner = tmp.substring(0,tmp.indexOf(':'));
	reportElements.winner = tmp.substring(tmp.indexOf(':')+2);	
	
	reportElements.attacker.name = $('#fighter_details_attacker td.tdh h3 a').html();
	if(reportElements.attacker.name == null) reportElements.attacker.name = $('#fighter_details_attacker td.tdh h3').html().replace(/\s{2}/g,'');
  if($('#fighter_details_attacker td.tdh h3 a').next() != null) reportElements.attacker.tag = $('#fighter_details_attacker td.tdh h3 a').next().html();
  if(reportElements.attacker.tag == null) reportElements.attacker.tag = "";
	reportElements.defender.name = $('#fighter_details_defender td.tdh h3 a').html();
	if(reportElements.defender.name == null) reportElements.defender.name = $('#fighter_details_defender td.tdh h3').html().replace(/\s{2}/g,'');
	if($('#fighter_details_defender td.tdh h3 a').next() != null) reportElements.defender.tag = $('#fighter_details_defender td.tdh h3 a').next().html();
  if(reportElements.defender.tag == null) reportElements.defender.tag = "";
  
	tmp = $('#reportResult .wrap-left .wrap-content .table-wrap .gold').html();
  if(tmp != null){
    if(tmp.indexOf(reportElements.attacker.name) != -1) reportElements.end = reportElements.attacker.name;
    else if(tmp.indexOf(reportElements.defender.name) != -1) reportElements.end = reportElements.defender.name;
  }
	tmp = tmp.replace(reportElements.winner,"").replace(reportElements.attacker.name,'').replace(reportElements.defender.name,'');
	textForReport.collected = " " + tmp.substring(1,tmp.indexOf(':')+1).replace(/\s+:/,'');
	reportElements.gold = tmp.substring(tmp.indexOf(':')+1,tmp.indexOf("<")-1).replace(' ','');
	tmp = tmp.substring(tmp.indexOf('>')+1).replace(/\s{2}/g,'');
	if(tmp != ''){
		tmp = tmp.substring(tmp.indexOf('+'));
		reportElements.exp = tmp.substring(0,tmp.indexOf(' '));
		textForReport.exp = tmp.substring(tmp.indexOf(' ')+1);
	}
	
	tmp = $('#fighter_details_attacker td.logo img').attr('src').replace(/http:\/\/[^[\/]+\//,'').split('/');
	if(tmp[2] == 1 || tmp[1].indexOf('1') != -1) reportElements.attacker.race = language[lang].vampire;
	else if(tmp[2] == 2 || tmp[1].indexOf('2') != -1) reportElements.attacker.race = language[lang].werewolf;
	
	tmp = $('#fighter_details_defender td.logo img').attr('src').replace(/http:\/\/[^[\/]+\//,'').split('/');
	if(tmp[2] == 1 || tmp[1].indexOf('1') != -1) reportElements.defender.race = language[lang].vampire;
	else if(tmp[2] == 2 || tmp[1].indexOf('2') != -1) reportElements.defender.race = language[lang].werewolf;	
	
	
	textForReport.level = $('#fighter_details_attacker td.rbg')[0].innerHTML.replace(':','').replace(/\s{2}/g,'');
	textForReport.battleValue = $('#fighter_details_attacker td.rbg')[2].innerHTML.replace(':','').replace(/\s{2}/g,'');
	if(textForReport.battleValue == '&nbsp;') textForReport.battleValue = $('#fighter_details_defender td.rbg')[2].innerHTML.replace(':','').replace(/\s{2}/g,'');
	textForReport.strength = $('#fighter_details_attacker td.rbg')[4].innerHTML.replace(':','').replace(/\s{2}/g,'');
	textForReport.defence = $('#fighter_details_attacker td.rbg')[6].innerHTML.replace(':','').replace(/\s{2}/g,'');
	textForReport.dexterity = $('#fighter_details_attacker td.rbg')[8].innerHTML.replace(':','').replace(/\s{2}/g,'');
	textForReport.endurance = $('#fighter_details_attacker td.rbg')[10].innerHTML.replace(':','').replace(/\s{2}/g,'');
	textForReport.charisma = $('#fighter_details_attacker td.rbg')[12].innerHTML.replace(':','').replace(/\s{2}/g,'');
	textForReport.chanceForHit = $('#fighter_details_attacker td.rbg')[14].innerHTML.replace(':','').replace(/\s{2}/g,'');
	textForReport.chance = $('#fighter_details_attacker td.rbg')[16].innerHTML.replace(':','').replace(/\s{2}/g,'');
	textForReport.damage = $('#fighter_details_attacker td.rbg')[18].innerHTML.replace(':','').replace(/\s{2}/g,'');
	textForReport.vitality = $('#fighter_details_attacker td.rbg')[20].innerHTML.replace(':','').replace(/\s{2}/g,'');
	textForReport.vitalityEnd = $('#fighter_details_attacker td.rbg')[22].innerHTML.replace(':','').replace(/\s{2}/g,'');
	
	var tmpArray = new Array();
	var tmpArray2 = new Array();	
	
	reportElements.attacker.level = $('#fighter_details_attacker td.rbg')[1].innerHTML.replace(/\s{2}/g,'');
	reportElements.attacker.battleValue = $('#fighter_details_attacker td.rbg')[3].innerHTML.replace(/\s{2}/g,'');	
	if(reportElements.attacker.battleValue == '&nbsp;') reportElements.attacker.battleValue = '';
    
  $('#fighter_details_attacker td.rbg img[src="/img/b2.gif"]').each(function(){
    var tmp = this.parentNode.getAttribute('onmouseover');
    tmp = tmp.substring(tmp.indexOf("('")+2, tmp.indexOf("')")).replace('<table>','<table id="stn_att_skill" style="display: none;">');
    $('div#content').append(tmp);
  });
  $('#content #stn_att_skill td').each(function(){
    if($(this).attr('align').indexOf('right') != -1) tmpArray.push($(this).html());
  });  
  var j = 1;
  for(i = 0; i < 5; i++){
    tmp = tmpArray[i+j-1];
    tmp2 = parseInt(tmpArray[i+j-1]);
    if(i + j < tmpArray.length){
      while(tmpArray[i+j].indexOf('+') != -1 || tmpArray[i+j].indexOf('-') != -1){
        tmp += tmpArray[i+j];
        tmp2 += parseInt(tmpArray[i+j]);
        j++;
        if(tmpArray[i+j] == null) break;
      }
    }
    if(tmp2 != parseInt(tmp)) tmp = tmp2 + ' [' + tmp + ']';
    tmpArray2.push(tmp);
  }
	reportElements.attacker.strength = tmpArray2[0];
	reportElements.attacker.defence = tmpArray2[1];
	reportElements.attacker.dexterity = tmpArray2[2];
	reportElements.attacker.endurance = tmpArray2[3];
	reportElements.attacker.charisma = tmpArray2[4];
	reportElements.attacker.chanceForHit = $('#fighter_details_attacker td.rbg')[15].innerHTML.replace(/\s{2}/g,'');
	reportElements.attacker.chance = $('#fighter_details_attacker td.rbg')[17].innerHTML.replace(/\s{2}/g,'');	
	reportElements.attacker.damage = $('#fighter_details_attacker td.rbg')[19].innerHTML.replace(/\s{2}/g,'');	
	reportElements.attacker.vitality = $('#fighter_details_attacker td.rbg')[21].innerHTML.replace(/\s{2}/g,'').replace('.','');	
	reportElements.attacker.vitalityEnd = $('#fighter_details_attacker td.rbg')[23].innerHTML.replace(/\s{2}/g,'').replace('.','');	
	
	tmpArray.length = 0;
	tmpArray2.length = 0;
	reportElements.defender.level = $('#fighter_details_defender td.rbg')[1].innerHTML.replace(/\s{2}/g,'');
	reportElements.defender.battleValue = $('#fighter_details_defender td.rbg')[3].innerHTML.replace(/\s{2}/g,'');	
	if(reportElements.defender.battleValue == '&nbsp;') reportElements.defender.battleValue = '';
  
  $('#fighter_details_defender td.rbg img[src="/img/b2.gif"]').each(function(){
    var tmp = this.parentNode.getAttribute('onmouseover');
    tmp = tmp.substring(tmp.indexOf("('")+2, tmp.indexOf("')")).replace('<table>','<table id="stn_def_skill" style="display: none;">');
    $('div#content').append(tmp);
  });
  $('#content #stn_def_skill td').each(function(){
    if($(this).attr('align').indexOf('right') != -1) tmpArray.push($(this).html());
  });  
  var j = 1;
  for(i = 0; i < 5; i++){
    tmp = tmpArray[i+j-1];
    tmp2 = parseInt(tmpArray[i+j-1]);
    if(i + j < tmpArray.length){
      while(tmpArray[i+j].indexOf('+') != -1 || tmpArray[i+j].indexOf('-') != -1){
        tmp += tmpArray[i+j];
        tmp2 += parseInt(tmpArray[i+j]);
        j++;
        if(tmpArray[i+j] == null) break;
      }
    }
    if(tmp2 != parseInt(tmp)) tmp = '[' + tmp + '] ' + tmp2;
    tmpArray2.push(tmp);
  }  
	reportElements.defender.strength = tmpArray2[0];
	reportElements.defender.defence = tmpArray2[1];
	reportElements.defender.dexterity = tmpArray2[2];
	reportElements.defender.endurance = tmpArray2[3];
	reportElements.defender.charisma = tmpArray2[4];
	reportElements.defender.chanceForHit = $('#fighter_details_defender td.rbg')[15].innerHTML.replace(/\s{2}/g,'');
	reportElements.defender.chance = $('#fighter_details_defender td.rbg')[17].innerHTML.replace(/\s{2}/g,'');	
	reportElements.defender.damage = $('#fighter_details_defender td.rbg')[19].innerHTML.replace(/\s{2}/g,'');	
	reportElements.defender.vitality = $('#fighter_details_defender td.rbg')[21].innerHTML.replace(/\s{2}/g,'').replace('.','');	
	reportElements.defender.vitalityEnd = $('#fighter_details_defender td.rbg')[23].innerHTML.replace(/\s{2}/g,'').replace('.','');		
	
	textForReport.vs = 'vs.';
	
	makeReport();
}

function makeReport(){

	var line = "";
	for(i = 0; i < 52; i++) line += "-"; line += "\n"

	var font = "[font='Courier New, Courier, mono']";
	var colorB = "[color=";
	var colorE = "[/color]";

	if(reportElements.winner == reportElements.attacker.name) color.winner = color.attacker;
	else color.winner = color.defender;
	if(reportElements.end == reportElements.attacker.name) color.end = color.attacker;
	else color.end = color.defender;	

	var textDateTime = line + "\n" + reportElements.date + "\n\n";
	
	var textTitle = textDateTime + 
					colorB + color.attacker + "]" + reportElements.attacker.name + " " + reportElements.attacker.tag + colorE + " " +
          textForReport.vs + " " +
          colorB + color.defender + "]" + reportElements.defender.name + " " + reportElements.defender.tag  + colorE + "\n" +
          "\n" + line + "\n";
   
	var textAttDef = "";
	textAttDef += colorB + color.attacker + "]" + reportElements.attacker.name + colorE + colorB + color.background + "]";
	i = 0;
	while(52-reportElements.attacker.name.length-reportElements.defender.name.length-i > 0){ textAttDef += "."; i++; }
	textAttDef += colorE + colorB + color.defender + "]" + reportElements.defender.name + colorE + "\n";	
	textAttDef += reportElements.attacker.race + colorB + color.background + "]";
	i = 0;
	while(52-reportElements.attacker.race.length-reportElements.defender.race.length-i > 0){ textAttDef += "."; i++; }
	textAttDef += colorE + reportElements.defender.race + "\n\n";		
   
	var dots = "";
	var tmpTextAttDef = "";
   
	var array;
	if(gameVersion == 1){
		array = ['level', 'vitality', 'experience', 'strength', 'defence', 'dexterity', 'endurance', 'charisma'];
	}
	else{
		array = ['level', 'battleValue', 'strength', 'defence', 'dexterity', 'endurance', 'charisma', 'chanceForHit', 'chance', 'damage', 'vitality'];
	}
	for(i = 0; i < array.length; i++){
		tmpTextAttDef = textForReport[array[i]];
		var l = textForReport[array[i]].length;
		dots = "";
		
    var len = addCommas(reportElements.attacker[array[i]]).length;
		while(26-l/2-len-dots.length > 0) dots += ".";
		tmpTextAttDef = colorB + color.attacker + "]" + addCommas(reportElements.attacker[array[i]]) +  colorE +
					 colorB + color.background + "]" + dots + colorE + tmpTextAttDef;
		
		var k = l + len + dots.length;
		
    //reportElements.defender[array[i]] = addCommas(reportElements.defender[array[i]]);
		dots = "";
    len = addCommas(reportElements.defender[array[i]]).length;
		while(52-k-len-dots.length > 0) dots += ".";
		tmpTextAttDef += colorB + color.background + "]" + dots + colorE +
					 colorB + color.defender + "]" + addCommas(reportElements.defender[array[i]]) + colorE + "\n";
		
		textAttDef += tmpTextAttDef;
	}   
	textAttDef += "\n" + line + "\n";
	
	var tmpTextDamage = "";
	var textDamage = "";
	tmpTextDamage = textForReport.damage;
	var l = textForReport.damage.length;
	dots = "";
	
	var damageAtt;
	var damageDef;
	if(gameVersion == 1){
		damageAtt = reportElements.attacker.damage;
		damageDef = reportElements.defender.damage;
		vitalityAtt = (reportElements.attacker.vitality - reportElements.defender.damage)+'';
		vitalityDef = (reportElements.defender.vitality - reportElements.attacker.damage)+'';
    vitalityAtt = addCommas(vitalityAtt);
    vitalityDef = addCommas(vitalityDef);
	}
	else{
		damageAtt = (reportElements.defender.vitality - reportElements.defender.vitalityEnd) + '';
		damageDef = (reportElements.attacker.vitality - reportElements.attacker.vitalityEnd) + '';
		vitalityAtt = reportElements.attacker.vitalityEnd + '';
		vitalityDef = reportElements.defender.vitalityEnd + '';
    vitalityAtt = addCommas(vitalityAtt);
    vitalityDef = addCommas(vitalityDef);
	}
	while(26-l/2-damageAtt.length-dots.length > 0) dots += ".";
	tmpTextDamage = colorB + color.attacker + "]" + damageAtt +  colorE +
				 colorB + color.background + "]" + dots + colorE + tmpTextDamage;
	
	var k = l + damageAtt.length + dots.length;
	
	dots = "";
	while(52-k-damageDef.length-dots.length > 0) dots += ".";
	tmpTextDamage += colorB + color.background + "]" + dots + colorE +
				 colorB + color.defender + "]" + damageDef + colorE + "\n";
	
	textDamage += tmpTextDamage;
	
	tmpTextDamage = "";
	if(gameVersion == 1){
		tmpTextDamage = textForReport.vitality;
		l = textForReport.vitality.length;
	}
	else{
		tmpTextDamage = textForReport.vitalityEnd;
		l = textForReport.vitalityEnd.length;		
	}
	dots = "";
	
	while(26-l/2-vitalityAtt.length-dots.length > 0) dots += ".";
	tmpTextDamage = colorB + color.attacker + "]" + vitalityAtt +  colorE +
				 colorB + color.background + "]" + dots + colorE + tmpTextDamage;
	
	var k = l + vitalityAtt.length + dots.length;
	
	dots = "";
	while(52-k-vitalityDef.length-dots.length > 0) dots += ".";
	tmpTextDamage += colorB + color.background + "]" + dots + colorE +
				 colorB + color.defender + "]" + vitalityDef + colorE + "\n";
	
	textDamage += tmpTextDamage;	
	textDamage += "\n" + line + "\n";
	
	var textWinner = textForReport.winner + "\n" + colorB + color.winner + "]" + reportElements.winner + colorE + "\n"	
   
	var end = colorB + color.end + "]" + reportElements.end + colorE;
	textWinner += "\n" + end + "" + textForReport.collected;
	if(reportElements.gold != "" ){
		textWinner +=  ": " + reportElements.gold + "[img]" + gold + "[/img]";
	}
	if(reportElements.exp != "" ){
		if(reportElements.gold != "" ) textWinner += ", ";
		else textWinner += ": ";
		textWinner += reportElements.exp + " " + textForReport.exp + "\n";
	}
	textWinner += "\n" + line;   
	
	
	text = "[align=" + 'center' + "]" + font + colorB + color.text + "]" +
			textTitle+
			textAttDef+
			textDamage+
			textWinner+
			"\n\n\n\n[b][i]" + colorB + color.text + "]" + language[lang].created + " [url='" + link + "']" + name + "\n" + 
			language[lang].version + " " + crConvVersion + "[/url]" + colorE + "[/i][/b]" +
			colorE + "[/font][/align]";
   
	$('#preview').html(bbcode2html(text));
	$('#stnkvcmlsTextArea').val(text);
}

function addCommas(nStr)
{
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

bbcode2html = function(text){
	var i;
	var j;

	while(text.indexOf("[font") != -1){
		i = text.indexOf("[font='Courier New, Courier, mono']");
		if(i != -1) text = text.replace("[font='Courier New, Courier, mono']","<span style='font-family: Courier New, Courier, mono'>");
		else text = text.replace(/\[font=[^\]]+\][^\[]+\[\/font\]/,"");
	}   
	text = text.replace(/\[\/font\]/g,"</span>");
	while(text.indexOf("[size=") != -1){
		i = text.indexOf("[size=10]");
		j = text.indexOf("[size=12]");
		if(i != -1) text = text.replace("[size=10]","<span style='font-size: 10'>");
		else if(j != -1) text = text.replace("[size=12]","<span style='font-size: 12'>");
		else text = text.replace(/\[size=[^\]]+\][^\[]+\[\/size\]/,"");
	}
	text = text.replace(/\[\/size\]/g,"</span>");
	while(text.indexOf("[color=") != -1){	
		i = text.search(/\[color=#([0-9A-Fa-f]{6})\]/);
		if(i != -1){
			var tmp = text.substring(i,i+15);
			tmp = tmp.replace("[color=","<span style='color:").replace("]","'>");
			text = text.replace(/\[color=#([0-9A-Fa-f]{6})\]/,tmp);
		}
		else text = text.replace(/\[color=[^\]]+\][^\[]+\[\/color\]/,"<span>");
	}
	text = text.replace(/\[\/color\]/g,"</span>");
	
	text = text.replace(/\[align=left\]/g,"<div style='text-align: left'>");
	text = text.replace(/\[align=center\]/g,"<div style='text-align: center'>");
	text = text.replace(/\[align=right\]/g,"<div style='text-align: right'>");
	text = text.replace(/\[align=[^\]]+\][^\[]+\[\/align\]/g,"");
	text = text.replace(/\[\/align\]/g,"</div>");
	
	text = text.replace("[url='" + link + "']" + name + "\n" + 
				language[lang].version + " " + crConvVersion + "[/url]","<a href='" + link + "'>" + name + "\n" + 
				language[lang].version + " " + crConvVersion+"</a>");
	text = text.replace(/\[url=[^\]]+\][^\[]+\[\/url\]/g,"");

	text = text.replace("[img]" + gold + "[/img]","<img src='" + gold + "'>");
	text = text.replace(/\[img\][^\[]+\[\/img\]/g,"");
  
	while(text.indexOf("\n") != -1) text = text.replace("\n","<br>");
	while(text.indexOf("[b]") != -1) text = text.replace("[b]","<b>");
	while(text.indexOf("[/b]") != -1) text = text.replace("[/b]","</b>");
	while(text.indexOf("[i]") != -1) text = text.replace("[i]","<i>");
	while(text.indexOf("[/i]") != -1) text = text.replace("[/i]","</i>");

  //text = text.replace(/\[[^\+][^\]]+\]/g,"");
  //text = text.replace(/\[[0-9-+]\]/g,"");
   
  return text;
}

if($('#battleReport').html()) createHofElement();
else createHofElementV2();