// ==UserScript==
// @name 		stnkvcmls Gladiatus Converter
// @namespace 
// @version		0.94
// @description	Converts combat reports for Gladiatus browser game
// @license		GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include		http://s*.*.gladiatus.*/*
// @include		http://s*.gladiatus.*/*
// @exclude		http://suport.*.gladiatus.*
// @exclude		http://suport.gladiatus.*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require		http://userscripts.org/scripts/source/57756.user.js
// @history		0.94 BudFix: Fixed text for combat report in circus turma.
// @history		0.94 BudFix: Fixed bug with wrong dom path to vs text.
// @history		0.93 BudFix: Fixed bug when script blocks browser.
// @history		0.92 BugFix: Script would hang and wont convert properly do to change in page structure.
// @history		0.92 Feature: Changed update script.
// @history		0.92 Feature: Added Update button.
// ==/UserScript==    

var crConvVersion = "0.94";
ScriptUpdater.check(67851, crConvVersion);

function update(){
	ScriptUpdater.forceNotice(67851, crConvVersion);
}

var hostname = window.location.hostname.substring(window.location.hostname.indexOf(".")+1);
var langMap = {
   'ba.gladiatus.org': "ba",
   'gladiatus.fr' : "fr",
   'gladiatus.com' : "en"
}

var lang = langMap[hostname];
if(lang == null) lang = "en";

var language = { 
		en: {preview: "Preview", bbcode: "Gladiatus board",
			plaintext: "Plain text", htmlcode: "HTML", version: "version", created: "Created with",
			battleReport: "Battle report", update: "Update"},
         
		ba: { preview: "Pregled", bbcode: "Gladiatus forum",
			plaintext: "Samo tekst", htmlcode: "HTML",version: "verzija", created: "Napravljeno sa",
			battleReport: "Izvještaj borbe", update: "Ažuriraj"},
      
		rs: { preview: "Преглед", bbcode: "Гладиатус форум",
			plaintext: "Само текст", htmlcode: "HTML", version: "верзија", created: "Направљено са",
			battleReport: "Извештај борбе", update: "Ажурирај"},
			
		fr: {preview: "Preview", bbcode: "Forum",
			plaintext: "Texte seul", htmlcode: "HTML", version: "version", created: "Créé avec",
			battleReport: "Rapport de combat", update: "Mise à jour"},				

		};  
      
var options = {
   align: "center"
}
      
var link = "http://userscripts.org/scripts/show/67851";
var name = "stnkvcmls' Gladiatus Converter";

var textArea;
var color = { background: "#C6B08B", attacker: "#0066CC", defender: "#FF3300", text: "#660000", border: "#A08D63", winner: "#000000"};



var displayNone = "border: medium none ; margin: 0px; padding: 0px; background: transparent none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; display:none;";
var displayBlock = "border: medium none ; margin: 0px; padding: 0px; background: transparent none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; display:block;";

var reportElements = {
   dateTime: "",
   battleReport: "",
   attData: { name: "", title: "", level: "", hitpoints: "", strength: "", skill: "", agility: "", constitution: "", charisma: "", inteligence: "",
               armour: "", damage: "", chanceHit: "", chanceDHit: "", chanceCHit: "", chanceBHit: "", chanceDodgeCHit: "",
			   block: "", criticalHeal: "", criticalDamage: "", resistance: "", extra: "" },
   defData: { name: "", title: "", level: "", hitpoints: "", strength: "", skill: "", agility: "", constitution: "", charisma: "", inteligence: "",
               armour: "", damage: "", chanceHit: "", chanceDHit: "", chanceCHit: "", chanceBHit: "", chanceDodgeCHit: "",
			   block: "", criticalHeal: "", criticalDamage: "", resistance: "", extra: "" },
   attReportData: { alliance: "", hitpoints: 0, health: 0 },
   defReportData: { alliance: "", hitpoints: 0, health: 0 },
   winner: 0,
   gold: 0,
   exp: 0,
   attPnt: 0,
   defPnt: 0
};

var textForReport = {
   level: "",
   hitpoints: "",
   strength: "",
   skill: "",
   agility: "",
   constitution: "",
   charisma: "",
   inteligence: "",
   armour: "",
   damage: "",
   chanceHit: "",
   chanceDHit: "",
   chanceCHit: "",
   chanceBHit: "",
   chanceDodgeCHit: "",
   block: "",
   criticalHeal: "",
   criticalDamage: "",
   resistance: "",
   extraAtt: "",
   extraDef: "",
   health: "",
   winner: "",
   gold: "",
   exp: "",
   vs: "",
   attackerPoints: "",
   defenderPoint: "",
   turma: false
};

function onMouseOver(id){
	$(id).css("backgroundColor",color.background);
}

function onMouseOut(id){
	if($("div#sel").html() != $(id).html())
		$(id).css("backgroundColor",color.border);
}

function onMouseClick(id1, id2, text1, text2){
	if($("div#sel").html() != $(id1).html()){
		$(id1).css("backgroundColor",color.background);
		for( var i = 0; i < id2.length; i++)
			$(id2[i]).css("backgroundColor",color.border);
		$(text1).css("display","block");
		$(text2).css("display","none");
		$("div#sel").html($(id1).html());
	}
}

function addFunctions(){
   
   $('div#rep').click(function(){
      if($(this).attr("class") == "tab"){
         $('div#hof').removeClass("tab_aktive").addClass("tab");
         $(this).removeClass("tab").addClass("tab_aktive");
         
         $('div#rep').removeAttr("style").attr("style","cursor: pointer;");
         $('div#hof').removeAttr("style").attr("style", "padding-top: 5px; height:25px; cursor: pointer;");         
         
         $('div#battlerep').removeAttr("style").attr("style", displayBlock);
		 $('div#turma').removeAttr("style").attr("style", displayBlock);
         $('div#hof_div').removeAttr("style").attr("style", displayNone);
      }
   });
   
   $('div#hof').click(function(){
      if($(this).attr("class") == "tab"){
         $('div#rep').removeClass("tab_aktive").addClass("tab");
         $(this).removeClass("tab").addClass("tab_aktive");
         
         $('div#hof').removeAttr("style").attr("style","cursor: pointer;");
         $('div#rep').removeAttr("style").attr("style", "padding-top: 5px; height:25px; cursor: pointer;");               
         
         $('div#hof_div').removeAttr("style").attr("style", displayBlock);
         $('div#battlerep').removeAttr("style").attr("style", displayNone);
		 $('div#turma').removeAttr("style").attr("style", displayNone);
      }
   }); 
   
   
	$("div#CRPreview").click(function (){
		onMouseClick('div#CRPreview',['div#BBCode','div#plainText','div#htmlCode'],'div#previewDiv','div#stnkvcmlsTextArea');
		convertReport();
	});			
	$("div#CRPreview").mouseover(function(){onMouseOver('div#CRPreview');});
	$("div#CRPreview").mouseout(function(){onMouseOut('div#CRPreview');});
	
	
	$("div#BBCode").click(function (){
		onMouseClick('div#BBCode',['div#CRPreview','div#plainText','div#htmlCode'],'div#stnkvcmlsTextArea','div#previewDiv');
		convertReport();
	});
	$("div#BBCode").mouseover(function (){onMouseOver('div#BBCode');});
	$("div#BBCode").mouseout(function (){onMouseOut('div#BBCode');});
	
	
	$("div#plainText").click(function (){
		onMouseClick('div#plainText',['div#BBCode','div#CRPreview','div#htmlCode'],'div#stnkvcmlsTextArea','div#previewDiv');
		convertReport();
	});	
	$("div#plainText").mouseover(function (){onMouseOver('div#plainText');});
	$("div#plainText").mouseout(function (){onMouseOut('div#plainText');});	
	
	$("div#htmlCode").click(function (){
		onMouseClick('div#htmlCode',['div#BBCode','div#CRPreview','div#plainText'],'div#stnkvcmlsTextArea','div#previewDiv');
		convertReport();
	});	
	$("div#htmlCode").mouseover(function (){onMouseOver('div#htmlCode');});
	$("div#htmlCode").mouseout(function (){onMouseOut('div#htmlCode');});		

	$("div#update").click(function(){
		update();
	});
	
	$("input#checkbox1").click(function(){
							if(options.cities == null) options.cities = $(this).attr("checked");
							else if(options.cities == false) options.cities = true;
							else options.cities = false;
							convertReport();
							});
	$("input#checkbox2").click(function(){
							if(options.loot == null) options.loot = $(this).attr("checked");
							else if(options.loot == false) options.loot = true;
							else options.loot = false;
							convertReport();
							});		
	$("input").each(function(){
							if($(this).attr("id") == "radio1"){
								$(this).click(function(){
									if($(this).attr("checked") == true){
										options.align = $(this).attr("value");
										convertReport();
									}
								});
								if( options.align == $(this).attr("value") ) $(this).attr("checked",true);
							}
						});	
	$("input").each(function(){
							if($(this).attr("id") == "radio2"){
								$(this).click(function(){
									if($(this).attr("checked") == true){
                              if($(this).attr("value") == "Generals") options.damage2e = true;
                              else options.damage2e = false;
                              $("input#radio3").each(function(){
                                 $(this).attr("disabled",options.damage2e)
                              });
										options.damage = $(this).attr("value");
										convertReport();
									}
								});
								if( options.damage == $(this).attr("value") ) $(this).attr("checked",true);
							}
						});
                  
	$("input").each(function(){
							if($(this).attr("id") == "radio3"){
                        $(this).attr("disabled",options.damage2e);
								$(this).click(function(){
									if($(this).attr("checked") == true){
										options.damage2c = $(this).attr("value");
										convertReport();
									}
								});
								if( options.damage2c == $(this).attr("value") ) $(this).attr("checked",true);
							}
						});  

   textArea = document.getElementById('stnkvcmlsTextArea');	     
   textArea.value = "";
   browser=navigator.appName;
}

function createHofTab(){
	GM_addStyle('#top {	overflow: hidden;	height: 140px; width: 508px; }' +
		'#top-naslov{	overflow: hidden;	width: 124px;	padding: 4px 10px;	background-color:' + color.border + ';	font-weight: bold;	color: #542C32;}' +
		'#top-frame{	overflow: hidden;	padding: 4px 10px;	border: solid 2px ' + color.border + ';	width: 120px;	height: 70px;}' +
		'#report {	width: 526px;	height: 820px;	background-color:' + color.background + ';	margin-top: 0px;	margin-right: auto;	margin-bottom: 0px;	margin-left: auto;' +
			'border-color:' + color.border + ';	border-style: solid;	border-top-style: none;	border-left-width: 3px;	border-right-width: 3px;	border-bottom-width: 3px;	overflow: hidden;}'	+
		'#CRPreview {	background-color:' + color.background + ';	height: 14px;	width: 80px;	float: left;	padding: 3px;	text-align: center;	border-right-width: 3px;	border-left-width: 3px;' +
			'border-top-style: none;	border-right-style: solid;	border-bottom-style: none;	border-left-style: solid;	border-top-color:' + color.border + ';	border-right-color:' + color.border + ';' +
			'border-bottom-color:' + color.border + ';	border-left-color:' + color.border + ';	cursor: pointer;}' +
		'#BBCode {	background-color:' + color.border + ';	height: 14px;	width: 120px;	float: left;	padding: 3px;	text-align: center;	border-right-width: 3px;	border-top-style: none;' +
			'border-right-style: solid;	border-bottom-style: none;	border-left-style: none;	border-top-color:' + color.border + ';	border-right-color:' + color.border + ';	border-bottom-color:' + color.border + ';' +
			'border-left-color:' + color.border + ';	cursor: pointer;}	' +
		'#plainText {	background-color:' + color.border + ';	height: 14px;	width: 80px;	float: left;	padding: 3px;	text-align: center;	border-right-width: 3px;	border-top-style: none;' +
			'border-right-style: solid;	border-bottom-style: none;	border-left-style: none;	border-top-color:' + color.border + ';	border-right-color:' + color.border + ';	border-bottom-color:' + color.border + ';' +
			'border-left-color:' + color.border + ';	cursor: pointer;}	' +		
		'#htmlCode {	background-color:' + color.border + ';	height: 14px;	width: 80px;	float: left;	padding: 3px;	text-align: center;	border-right-width: 3px;	border-top-style: none;' +
			'border-right-style: solid;	border-bottom-style: none;	border-left-style: none;	border-top-color:' + color.border + ';	border-right-color:' + color.border + ';	border-bottom-color:' + color.border + ';' +
			'border-left-color:' + color.border + ';	cursor: pointer;}	' +		
		'#update {	background-color:' + color.border + ';	height: 14px;	width: 80px;	float: left;	padding: 3px;	text-align: center;	border-right-width: 3px;	border-top-style: none;' +
			'border-right-style: solid;	border-bottom-style: none;	border-left-style: none;	border-top-color:' + color.border + ';	border-right-color:' + color.border + ';	border-bottom-color:' + color.border + ';' +
			'border-left-color:' + color.border + ';	cursor: pointer;}	' +		
		'#for-buttons {	width: 526px;	height: 20px;	background-color: #' + color.background + ';	margin: 0 auto; 	border: solid 3px ' + color.border + ';	border-bottom: 0px;}' +
		'#for-buttons-left{	height: 20px;	width: 10px;	background-color:' + color.border + ';	float: left;}' +
		'#for-buttons-right{	height: 20px;	width: 28px;	background-color:' + color.border + ';	float: left;}' +
		'#text3{	border: none; 	width: 100%; 	height: 100%;	overflow: auto;}' +
		'#reportDiv p{ font-size: 14px; font-weight: bold; color: #542C32;}');	


		
   var tmp = $("div.tab_empty:first");
   tmp.removeClass("tab_empty").addClass("tab");
   tmp.append("<span>HoF</span>");
   tmp.removeAttr("style");
   tmp.attr("style", "padding-top: 5px; height:25px; cursor: pointer;");
   tmp.attr("id","hof");
   
   tmp = $("td#content");
   tmp.append("<div id='hof_div' style='" + displayNone + "'" +
                  '<div style="margin-top: 0px;">' +
                     '<div id="for-buttons">' +
                        '<div id="for-buttons-left"></div>' +
                        '<div id=CRPreview>' + language[lang].preview + '</div>' +
                        '<div id=BBCode>' + language[lang].bbcode + '</div>' +
                        '<div id=plainText>' + language[lang].plaintext + '</div>' +
                        '<div id=htmlCode>' + language[lang].htmlcode + '</div>' +
						'<div id=update>' + language[lang].update + '</div>' +
                        '<div id="for-buttons-right"></div>' +
                        '<div style="display: none" id=sel>' + language[lang].preview + '</div>' +
                     '</div>' +
      
                     '<div id="report">' +
                        '<div id="previewDiv" style="overflow: auto; height: 100%; width: 100%; background-color:' + color.background + '">' +
                           '<div id="text3" name="text3" style="background-color:' + color.background + '"></div>' +
                        '</div>' +
                        '<textarea readonly style="display: block; border: none; width: 100%; height: 100%; overflow: auto; background-color:' + color.background + ';" name="text2"  id="stnkvcmlsTextArea" value=""></textarea>' +
                     '</div>' +    
                  '</div>' +
               "</div>");
               
   $('div#battlerep').removeAttr("style").attr("style", displayBlock);
   $('div.tab_aktive').attr("id","rep");
   $('div.tab_aktive').attr("style","cursor: pointer;");
               
   textArea = document.getElementById('stnkvcmlsTextArea');	
   
   addFunctions();
}

function createReportTab(){
   var tmp = $("div.tab_empty:first");
   tmp.removeClass("tab_empty").addClass("tab_aktive");
   tmp.append("<span>" + language[lang].battleReport + "</span>");
   tmp.removeAttr("style");
   tmp.attr("style", "padding-top: 5px; height:25px; cursor: pointer;");
   tmp.attr("id","rep");
   
   tmp = $("td#content");
   var tmp2 = tmp.html();
   var tmp3 = tmp2.indexOf("</div>")+6;
   var tmp4 = tmp2.substr(0,tmp3);
   tmp3 = tmp2.substr(tmp3);
   tmp.html(tmp4);
   tmp.append("<div id=turma> </div>");
   tmp = $("div#turma");
   tmp.append(tmp3);
}

parseReport();

function removeBeforeAfterText(text){
   
   text = text.replace(/[\n\r\t]/g,"");
   var len = text.length;
   var i = 0;
   while(text[0] == " " && i++ < len) text = text.substring(1);
   len = text.length;
   i = 0;
   while(text[text.length-1] == " " && i++ < len) text = text.substring(0,text.length-1);

   
   return text;
}

function parseReportTurma(){
	textForReport.turma = true;
	createReportTab();
	createHofTab();
	
	var tmp = $("div.reportHeader")[0].innerHTML;
   textForReport.winner = tmp.substring(0,tmp.indexOf(":"));
   reportElements.winner = removeBeforeAfterText(tmp.substring(tmp.indexOf(":")+1));
   
   
   reportElements.attData.name = removeBeforeAfterText($("span.playername_achievement")[0].innerHTML);
   reportElements.attData.title = $("span.achievementtitle")[0].innerHTML.replace("&lt;","<").replace("&gt;",">");  
   
   reportElements.defData.name = removeBeforeAfterText($("span.playername_achievement")[1].innerHTML);
   reportElements.defData.title = $("span.achievementtitle")[1].innerHTML.replace("&lt;","<").replace("&gt;",">"); 
   
   tmp = $("div.title2_inner");
   
   var flag = 0;
   if(tmp[0].childNodes[1].nodeName != "TABLE"){ flag = 1;}   
   
   tmp = $("div#turma")[0];
   
   if(flag == 0) textForReport.vs = tmp.childNodes[5].childNodes[1].childNodes[0].childNodes[3].childNodes[1].innerHTML; // 5 umesto 4 u skripti?	
   else textForReport.vs = tmp.childNodes[7].childNodes[1].childNodes[0].childNodes[3].childNodes[1].innerHTML;
   
   
   tmp = $("div#attackerstats0 > div.charstats_bg2 > span.charstats_value21");
   textForReport.level = tmp[0].innerHTML;
   textForReport.armour = tmp[1].innerHTML;
   textForReport.damage = tmp[2].innerHTML;
   textForReport.block = tmp[3].innerHTML;
   textForReport.criticalHeal = tmp[4].innerHTML;
   textForReport.criticalDamage = tmp[5].innerHTML;
   textForReport.resistance = tmp[6].innerHTML;
   if(tmp[7] != null) textForReport.extraAtt = tmp[7].innerHTML;
   
   tmp = $("div#defenderstats0 > div.charstats_bg2 > span.charstats_value21");
   if(tmp[7] != null) textForReport.extraDef = tmp[7].innerHTML;
   
   tmp = $("div#attackerstats0 > div.charstats_bg2 > span.charstats_value22");
   reportElements.attData.level = tmp[0].innerHTML;
   reportElements.attData.damage = tmp[1].innerHTML;
   reportElements.attData.block = tmp[2].innerHTML;
   reportElements.attData.criticalHeal = tmp[3].innerHTML;
   reportElements.attData.criticalDamage = tmp[4].innerHTML;
   reportElements.attData.resistance = tmp[5].innerHTML;
   if(tmp[6] != null) reportElements.attData.extra = tmp[6].innerHTML;
   
   tmp = $("div#defenderstats0 > div.charstats_bg2 > span.charstats_value22");
   reportElements.defData.level = tmp[0].innerHTML;
   reportElements.defData.damage = tmp[1].innerHTML;
   reportElements.defData.block = tmp[2].innerHTML;
   reportElements.defData.criticalHeal = tmp[3].innerHTML;
   reportElements.defData.criticalDamage = tmp[4].innerHTML;
   reportElements.defData.resistance = tmp[5].innerHTML; 
   if(tmp[6] != null) reportElements.defData.extra = tmp[6].innerHTML;
   
   tmp = $("div#attackerstats0 > div.charstats_bg2 > span.charstats_text");
   
   textForReport.hitpoints = tmp[0].innerHTML;
   textForReport.strength = tmp[1].innerHTML;
   textForReport.skill = tmp[2].innerHTML;
   textForReport.agility = tmp[3].innerHTML;
   textForReport.constitution = tmp[4].innerHTML;
   textForReport.charisma = tmp[5].innerHTML;
   textForReport.inteligence = tmp[6].innerHTML;   
   
   tmp = $("div#attackerstats0 > div.charstats_bg2 > span.charstats_value3");
   reportElements.attData.hitpoints = tmp[0].innerHTML;
   reportElements.attData.strength = tmp[1].innerHTML;
   reportElements.attData.skill = tmp[2].innerHTML;
   reportElements.attData.agility = tmp[3].innerHTML;
   reportElements.attData.constitution = tmp[4].innerHTML;
   reportElements.attData.charisma = tmp[5].innerHTML;
   reportElements.attData.inteligence = tmp[6].innerHTML;
   if(tmp[7] != null) reportElements.attData.armour = tmp[7].innerHTML;
   
   tmp = $("div#defenderstats0 > div.charstats_bg2 > span.charstats_value3");
   
   reportElements.defData.hitpoints = tmp[0].innerHTML;
   reportElements.defData.strength = tmp[1].innerHTML;
   reportElements.defData.skill = tmp[2].innerHTML;
   reportElements.defData.agility = tmp[3].innerHTML;
   reportElements.defData.constitution = tmp[4].innerHTML;
   reportElements.defData.charisma = tmp[5].innerHTML;
   reportElements.defData.inteligence = tmp[6].innerHTML;    
   if(tmp[7] != null) reportElements.defData.armour = tmp[7].innerHTML;

	tmp = $("div.title2_inner")[0];
	
	textForReport.attackerPoints = removeBeforeAfterText(tmp.childNodes[0].nodeValue);
	textForReport.defenderPoints = removeBeforeAfterText(tmp.childNodes[2].nodeValue);
	
	if(tmp.childNodes[5].childNodes[1].childNodes[0].childNodes[1].childNodes[1] != null){
		textForReport.gold = tmp.childNodes[5].childNodes[1].childNodes[0].childNodes[1].childNodes[1].childNodes[0].nodeValue;
		reportElements.gold = textForReport.gold.substr(textForReport.gold.indexOf(":")+1);
		textForReport.gold = textForReport.gold.substr(0,textForReport.gold.indexOf(":")+1).replace(reportElements.winner+" ","");
	}
	
	reportElements.attPnt = textForReport.attackerPoints.substr(textForReport.attackerPoints.indexOf(":")+1);
	reportElements.defPnt = textForReport.defenderPoints.substr(textForReport.defenderPoints.indexOf(":")+1);
	
	textForReport.attackerPoints = textForReport.attackerPoints.substr(0,textForReport.attackerPoints.indexOf(":")+1);
	textForReport.defenderPoints = textForReport.defenderPoints.substr(0,textForReport.defenderPoints.indexOf(":")+1);
	
	convertReport();
}

function parseReport(){

	
   if($("span.playername_achievement")[1] == null)
      return 0;
	  
   if($("div#battlerep")[0] == null){
      parseReportTurma();
	  return 1;
	}
	
    //if(document.URL.indexOf("report&beid") > 0)
      createHofTab(); 	
	  
   var tmp = $("div.reportHeader")[0].innerHTML;
   
   textForReport.winner = tmp.substring(0,tmp.indexOf(":"));
   reportElements.winner = removeBeforeAfterText(tmp.substring(tmp.indexOf(":")+1));
   
   reportElements.attData.name = removeBeforeAfterText($("span.playername_achievement")[0].innerHTML);
   reportElements.attData.title = $("span.achievementtitle")[0].innerHTML.replace("&lt;","<").replace("&gt;",">");    
   
   reportElements.defData.name = removeBeforeAfterText($("span.playername_achievement")[1].innerHTML);
   reportElements.defData.title = $("span.achievementtitle")[1].innerHTML.replace("&lt;","<").replace("&gt;",">"); 
   
   tmp = $("div.title2_inner");
   
   var flag = 1;
   if(tmp[1].childNodes[1].nodeName != "TABLE"){ flag = 0;}
   
   tmp = $("div#battlerep")[0];
   
   textForReport.vs = $('div#battlerep center').html();

   tmp = $("span.charstats_value21");
   
   textForReport.level = tmp[0].innerHTML;
   textForReport.armour = tmp[1].innerHTML;
   textForReport.damage = tmp[2].innerHTML;
   textForReport.chanceHit = tmp[3].innerHTML;
   textForReport.chanceDHit = tmp[4].innerHTML;
   textForReport.chanceCHit = tmp[5].innerHTML;
   textForReport.chanceBHit = tmp[6].innerHTML;
   textForReport.chanceDodgeCHit = tmp[7].innerHTML;
   
   
   tmp = $("span.charstats_value22");
   
   reportElements.attData.level = tmp[0].innerHTML;
   reportElements.attData.armour = tmp[1].innerHTML;
   reportElements.attData.damage = tmp[2].innerHTML;
   reportElements.attData.chanceHit = tmp[3].innerHTML;
   reportElements.attData.chanceDHit = tmp[4].innerHTML;
   reportElements.attData.chanceCHit = tmp[5].innerHTML;
   reportElements.attData.chanceBHit = tmp[6].innerHTML;
   reportElements.attData.chanceDodgeCHit = tmp[7].innerHTML;
   reportElements.defData.level = tmp[8].innerHTML;
   reportElements.defData.armour = tmp[9].innerHTML;
   reportElements.defData.damage = tmp[10].innerHTML;
   reportElements.defData.chanceHit = tmp[11].innerHTML;
   reportElements.defData.chanceDHit = tmp[12].innerHTML;
   reportElements.defData.chanceCHit = tmp[13].innerHTML;
   reportElements.defData.chanceBHit = tmp[14].innerHTML;
   reportElements.defData.chanceDodgeCHit = tmp[15].innerHTML;
   
   
   tmp = $("span.charstats_text");
   
   textForReport.hitpoints = tmp[0].innerHTML;
   textForReport.strength = tmp[1].innerHTML;
   textForReport.skill = tmp[2].innerHTML;
   textForReport.agility = tmp[3].innerHTML;
   textForReport.constitution = tmp[4].innerHTML;
   textForReport.charisma = tmp[5].innerHTML;
   textForReport.inteligence = tmp[6].innerHTML;
   
   
   tmp = $("span.charstats_value3");
   
   reportElements.attData.hitpoints = tmp[0].innerHTML;
   reportElements.attData.strength = tmp[1].innerHTML;
   reportElements.attData.skill = tmp[2].innerHTML;
   reportElements.attData.agility = tmp[3].innerHTML;
   reportElements.attData.constitution = tmp[4].innerHTML;
   reportElements.attData.charisma = tmp[5].innerHTML;
   reportElements.attData.inteligence = tmp[6].innerHTML;
   reportElements.defData.hitpoints = tmp[7].innerHTML;
   reportElements.defData.strength = tmp[8].innerHTML;
   reportElements.defData.skill = tmp[9].innerHTML;
   reportElements.defData.agility = tmp[10].innerHTML;
   reportElements.defData.constitution = tmp[11].innerHTML;
   reportElements.defData.charisma = tmp[12].innerHTML;
   reportElements.defData.inteligence = tmp[13].innerHTML;  
   
   
   tmp = $("div.title_inner");
   if(flag == 0) reportElements.dateTime = removeBeforeAfterText(tmp[0].innerHTML);
   else reportElements.dateTime = removeBeforeAfterText(tmp[1].innerHTML);
   reportElements.battleReport = reportElements.dateTime;
   i = 0;
   while((isNaN(reportElements.dateTime[0]) || reportElements.dateTime[0] == " ") && i++ < reportElements.dateTime.length) reportElements.dateTime = reportElements.dateTime.substring(1);
   reportElements.battleReport = removeBeforeAfterText(reportElements.battleReport.substring(0,reportElements.battleReport.indexOf(reportElements.dateTime)));
   
   tmp = $("div.title2_inner");
   
   if(tmp[1].childNodes[1].nodeName != "TABLE") tmp2 = tmp[0];
   else tmp2 = tmp[1];
   tmp2 = tmp2.childNodes[1].childNodes[1];
   
   textForReport.health = tmp2.childNodes[0].childNodes[7].childNodes[0].innerHTML.replace("<b>","").replace("</b>","");
   
   if(tmp2.childNodes[2].childNodes[3].innerHTML == "---")
      reportElements.attReportData.alliance = "---";
   else
      reportElements.attReportData.alliance = tmp2.childNodes[2].childNodes[3].childNodes[0].innerHTML;
   reportElements.attReportData.hitpoints = tmp2.childNodes[2].childNodes[5].innerHTML;
   reportElements.attReportData.health = tmp2.childNodes[2].childNodes[7].innerHTML;
   
   if(tmp2.childNodes[4].childNodes[3].innerHTML == "---")
      reportElements.defReportData.alliance = "---";
   else
      reportElements.defReportData.alliance = tmp2.childNodes[4].childNodes[3].childNodes[0].innerHTML;
   reportElements.defReportData.hitpoints = tmp2.childNodes[4].childNodes[5].innerHTML;
   reportElements.defReportData.health = tmp2.childNodes[4].childNodes[7].innerHTML;   
   
   
   tmp2 = tmp[0].childNodes[1];
   if(flag == 1){
      tmp2 = tmp2.childNodes[1].childNodes[0].childNodes[1];
      tmp3 = tmp2.childNodes[0];
	  if($(tmp3).text().indexOf(":") != -1){
		textForReport.gold = removeBeforeAfterText($(tmp3).text());
		reportElements.gold = textForReport.gold.substr(textForReport.gold.indexOf(":")+1);
		textForReport.gold = textForReport.gold.substr(0,textForReport.gold.indexOf(":")+1).replace(reportElements.winner+" ","");
		tmp3 = tmp2.childNodes[1];
	  }
	  if(tmp3 != null){
		textForReport.exp = removeBeforeAfterText($(tmp3).text());
         i = 0;
         while((isNaN(textForReport.exp[i]) || textForReport.exp[i] == " ") && i < textForReport.exp.length) i++;
         j = i;
         while(textForReport.exp[j] != " " && j < textForReport.exp.length) j++;
         reportElements.exp = textForReport.exp.substring(i,j);		
		 textForReport.exp = textForReport.exp.replace(reportElements.winner+" ","").replace(/\s{2,}/g,"\n");
	  }

   }
   else{
      //alert("error");
   }
                  
   convertReport();
   return 0;
   
   /*
      span.class:
      
      charstats_value21 - 16 komada: 0-7 napadac: level, oklop, steta, sansa sa udarac, sansa za dupli udarac, sansa za kriticni udarac, sansa za blokadu udarca, sansa za izbegavanjem kriticnog udarca, 
                                     8-15 odbranioc: -||-           
      charstats_value22 - 16 komada: vrednosti za charstats_value21
      
      charstats_text - 14 komada: 0-6 napadac: zivotni bodovi, snaga, vestina, spretnost, konstitucija, karizma, inteligencija
                                  7-13 odbranioc: -||-
      charstats_value3 - 14 komada: vrednosti za charstats_text
      
      
      div.class
      
      title_inner[0] -    	Izvještaj borbe 01.02.2010 08:49:01	
      
      title2_inner[0] - izvestaj
            childnode 1
               childnode 1
                  childnode 0 - ime, savez, zivotni bodovi, zdravlje
                     childnode 1.innerHTML - ime
                     childnode 3.innerHTML - savez
                     childnode 5.innerHTML - zivotni bodovi
                     childnode 7.innerHTML - zdravlje
                  childnode 2 - napadac
                     childnode 3.innerHTML - savez
                     childnode 5.innerHTML - zivotni bodovi
                     childnode 7.innerHTML - zdravlje
                  childnode 4 - odbranioc
                     childnode 3.innerHTML - savez
                     childnode 5.innerHTML - zivotni bodovi
                     childnode 7.innerHTML - zdravlje

      title2_inner[1] - zlato i exp 
         childnode 1 - mora biti nodeName = TABLE, u suprotnom ovo dole ne postoji
            childnode 1
               childnode 0
                  childnode 1
                     childnode 1 - zlato
                        childnode 1.nodeValue - je pokupio xx
                     childnode 3 - exp
                        childnode 1.nodeValue - je dobio xx bodova iskustva.
      
                                      
   
   */

}

function convertReport(){

   var line = "";
   for(i = 0; i < 52; i++) line += "-"; line += "\n"
   
   var font = "[font='Courier New, Courier, mono']";
   var colorB = "[color=";
   var colorE = "[/color]";
   
   if(reportElements.winner == reportElements.attData.name) color.winner = color.attacker;
   else color.winner = color.defender;

   var textDateTime = colorB + color.text + "]" + line + "\n" + reportElements.dateTime + colorE + "\n\n";
	
	var textTitle =  colorB + color.attacker + "]" + reportElements.attData.name + colorE + " " +
                     colorB + color.text + "]" + textForReport.vs + colorE + " " +
                     colorB + color.defender + "]" + reportElements.defData.name + colorE + "\n" +
                     colorB + color.text + "]\n" + line + colorE + "\n";
					 
	if(textForReport.turma == false) textTitle = textDateTime + textTitle;
	else textTitle = colorB + color.text + "]" + line + "\n" + textTitle;
   
   var textAttDef = "";
   textAttDef += colorB + color.attacker + "]" + reportElements.attData.name + colorE + colorB + color.background + "]";
   i = 0;
   while(52-reportElements.attData.name.length-reportElements.defData.name.length-i > 0){ textAttDef += "."; i++; }
   textAttDef += colorE + colorB + color.defender + "]" + reportElements.defData.name + colorE + "\n\n";
   
   var dots = "";
   var tmpTextAttDef = "";
   
   var t = 0; 
   var u = 0;   
   for(i = 0; i < 15-u; i++){
	  if(i == 10 && textForReport.turma == true) { t = 5; u = 1; }
      tmpTextAttDef = colorB + color.text + "]" + textForReport[numToElement(i+t)] + colorE;
      var l = textForReport[numToElement(i+t)].length;
      dots = "";
	  
      while(26-l/2-reportElements.attData[numToElement(i+t)].length-dots.length > 0) dots += ".";
      tmpTextAttDef = colorB + color.attacker + "]" + reportElements.attData[numToElement(i+t)] +  colorE +
                     colorB + color.background + "]" + dots + colorE + tmpTextAttDef;
      
      var k = l + reportElements.attData[numToElement(i+t)].length + dots.length;
      dots = "";
      while(52-k-reportElements.defData[numToElement(i+t)].length-dots.length > 0) dots += ".";
      tmpTextAttDef += colorB + color.background + "]" + dots + colorE +
                     colorB + color.defender + "]" + reportElements.defData[numToElement(i+t)] + colorE + "\n";
      
      textAttDef += tmpTextAttDef;
   }
   if(textForReport.turma == true){
		tmpTextAttDef = "";
		if(reportElements.attData.extra != ""){
			tmpTextAttDef = colorB + color.text + "]" + textForReport.extraAtt + colorE;
			var l = textForReport.extraAtt.length;
			dots = "";		
			while(26-l/2-reportElements.attData.extra.length-dots.length > 0) dots += ".";
			tmpTextAttDef = colorB + color.attacker + "]" + reportElements.attData.extra +  colorE +
							colorB + color.background + "]" + dots + colorE + tmpTextAttDef;
		}
		if(textForReport.extraAtt == textForReport.extraDef){
			var k = l + reportElements.attData.extra.length + dots.length;
			dots = "";
			while(52-k-reportElements.defData.extra.length-dots.length > 0) dots += ".";
			tmpTextAttDef += colorB + color.background + "]" + dots + colorE +
							colorB + color.defender + "]" + reportElements.defData.extra + colorE + "\n";		
		}
		else{
			if(reportElements.attData.extra != ""){
				k = l + reportElements.attData.extra.length + dots.length;
				dots = "";
				while(52 - k - dots.length > 0) dots += ".";	
				tmpTextAttDef += colorB + color.background + "]" + dots + colorE + "\n";
				textAttDef += tmpTextAttDef;
				tmpTextAttDef = "";
			}
			if(reportElements.defData.extra != ""){
				tmpTextAttDef += colorB + color.text + "]" + textForReport.extraDef + colorE;
				var l = textForReport.extraDef.length;
				dots = "";
				while(26-l/2-reportElements.defData.extra.length-dots.length > 0) dots += ".";
				tmpTextAttDef += colorB + color.background + "]" + dots + colorE +
								colorB + color.defender + "]" + reportElements.defData.extra + colorE + "\n";	
				k = l + reportElements.defData.extra.length + dots.length;
				dots = "";
				while(52 - k - dots.length > 0) dots += ".";
				tmpTextAttDef = colorB + color.background + "]" + dots + colorE + tmpTextAttDef;    
			}
		}
		textAttDef += tmpTextAttDef;
   }
   textAttDef += colorB + color.text + "]\n" + line +colorE + "\n";
   
   
   var textBattleReport = colorB + color.text + "]" + language[lang].battleReport + colorE + "\n\n";
   var tmpTextBattleReport = "";
   
   if(textForReport.turma == true){
		textBattleReport += colorB + color.text + "]" + textForReport.attackerPoints + colorE;
		textBattleReport += colorB + color.winner + "]" + reportElements.attPnt + colorE + "\n";
		textBattleReport += colorB + color.text + "]" + textForReport.defenderPoints + colorE;
		textBattleReport += colorB + color.winner + "]" + reportElements.defPnt + colorE + "\n";
		textBattleReport += tmpTextBattleReport + colorB + color.text + "]\n" + line + colorE + "\n";      
   }
   else{
	   tmpTextBattleReport = colorB + color.text + "]" + textForReport.hitpoints + colorE;
	   l = textForReport.hitpoints.length;
	   dots = "";
	   while(26-l/2-reportElements.attReportData.hitpoints.length-dots.length > 0) dots += ".";
	   tmpTextBattleReport = colorB + color.attacker + "]" + reportElements.attReportData.hitpoints + colorE +
							colorB + color.background + "]" + dots + colorE + tmpTextBattleReport;
	   
	   k = l + reportElements.attReportData.hitpoints.length + dots.length;
	   dots = "";
	   while(52-k-reportElements.defReportData.hitpoints.length-dots.length > 0) dots += ".";
	   tmpTextBattleReport += colorB + color.background + "]" + dots + colorE +
							colorB + color.defender + "]" + reportElements.defReportData.hitpoints + colorE + "\n";
	   
	   textBattleReport += tmpTextBattleReport;   
	   
	   tmpTextBattleReport = colorB + color.text + "]" + textForReport.health + colorE;
	   l = textForReport.health.length;
	   dots = "";
	   while(26-l/2-reportElements.attReportData.health.length-dots.length > 0) dots += ".";
	   tmpTextBattleReport = colorB + color.attacker + "]" + reportElements.attReportData.health + colorE +
							colorB + color.background + "]" + dots + colorE + tmpTextBattleReport;
	   
	   k = l + reportElements.attReportData.health.length + dots.length;
	   dots = "";
	   while(52-k-reportElements.defReportData.health.length-dots.length > 0) dots += ".";
	   tmpTextBattleReport += colorB + color.background + "]" + dots + colorE +
							colorB + color.defender + "]" + reportElements.defReportData.health + colorE + "\n";
	   
	   textBattleReport += tmpTextBattleReport + colorB + color.text + "]\n" + line + colorE + "\n";      
   }
   
   var tmpWinner = colorB + color.winner + "]" + reportElements.winner + colorE;
   var textWinner = colorB + color.text + "]" +textForReport.winner + colorE + "\n" + tmpWinner + "\n"
	
   
   if(reportElements.gold != "" ){
      textWinner += "\n" + tmpWinner + " " + colorB + color.text + "]" + textForReport.gold + " " + reportElements.gold + 
                     "[img]http://img715.imageshack.us/img715/1465/goldi.gif[/img]" + colorE + "\n";
   }
   if(reportElements.exp != "" ){
      textWinner += "\n" + tmpWinner + " " + colorB + color.text + "]" + textForReport.exp + colorE + "\n";
   }
   textWinner += colorB + color.text + "]\n" + line + colorE;
   
   
	var bbCodeText = "";
	var plainTextText = "";
	var htmlCodeText = "";   

   
   bbCodeText = "[align=" + options.align + "]" + font +
               textTitle +
               textAttDef +
               textBattleReport +
               textWinner + 
               "\n\n\n\n[b][i]" + colorB + color.text + "]" + language[lang].created + " [url='" + link + "']" + name + "\n" + 
               language[lang].version + " " + crConvVersion + "[/url]" + colorE + "[/i][/b]" +
               "[/align][/font]";
	
	plainTextText = bbCodeText;
	htmlCodeText = bbcode2html(bbCodeText);
	textArea.value = bbCodeText;
	
	do{
		i = plainTextText.indexOf("[");
		if(i != -1){
			j = plainTextText.indexOf("]");
			plainTextText = plainTextText.substring(0, i) + plainTextText.substring(j+1);
		}
	}while(i != -1);
	
	var sel = document.getElementById('sel');
	if( sel.innerHTML == language[lang].bbcode ) textArea.value = bbCodeText;
	else if( sel.innerHTML == language[lang].plaintext ) textArea.value = plainTextText;
	else if( sel.innerHTML == language[lang].preview ) document.getElementById("text3").innerHTML = htmlCodeText;
	else if( sel.innerHTML == language[lang].htmlcode ) textArea.value = htmlCodeText;                     
                     
}

function numToElement(num){
	switch(num){
		case 0: return "level";
		case 1: return "hitpoints";
		case 2: return "strength";
		case 3: return "skill";
		case 4: return "agility";
		case 5: return "constitution";
		case 6: return "charisma";
		case 7: return "inteligence";
		case 8: return "armour";
		case 9: return "damage";
		case 10: return "chanceHit";
		case 11: return "chanceDHit";
		case 12: return "chanceCHit";
		case 13: return "chanceBHit";
		case 14: return "chanceDodgeCHit";
		case 15: return "block";
		case 16: return "criticalHeal";
		case 17: return "criticalDamage";
		case 18: return "resistance";
	}
	return 0;
}

function bbcode2html(text){
   var i;
   var j;


   //text = text.replace(/\r\n|\r|\n/g,'');
   while(text.indexOf("\n") != -1)
          text = text.replace("\n","<br/>");
   text = text.replace("']","'>");


   while(text.indexOf("[b]") != -1) text = text.replace("[b]","<b>");
   while(text.indexOf("[/b]") != -1) text = text.replace("[/b]","</b>");
   while(text.indexOf("[i]") != -1) text = text.replace("[i]","<i>");
   while(text.indexOf("[/i]") != -1) text = text.replace("[/i]","</i>");
   while(text.indexOf("[img]") != -1) text = text.replace("[img]",'<img src="');
   while(text.indexOf("[/img]") != -1) text = text.replace("[/img]",'"/>');   
   
   text = text.replace("[font='","<span style='font-family: ");  
   text = text.replace("[/font]","</span>");

   while((i=text.indexOf("[size=")) != -1){
      text = text.replace("[size=","<span style='font-size:");
      j = text.indexOf("]",i);
      text = text.substring(0,j)+"'>"+text.substring(j+1);      
      text = text.replace("[/size]","</span>");
   }
   
   while((i=text.indexOf("[color=")) != -1){
      text = text.replace("[color=","<span style='color:");
      j = text.indexOf("]",i);
      text = text.substring(0,j)+"'>"+text.substring(j+1);
      text = text.replace("[/color]","</span>");
   }


   i = text.indexOf("[align=","<div style='text-align: ");
   text = text.replace("[align=","<div style='text-align: ");
   j = text.indexOf("]",i);
   text = text.substring(0,j)+"'>"+text.substring(j+1);      
   text = text.replace("[/align]","</div>");

    i = text.indexOf("[url=","<a href=");
   text = text.replace("[url=","<a href=");
   j = text.indexOf("]",i);
   text = text.substring(0,j)+"'>"+text.substring(j+1);    
   text = text.replace("[/url]","</a>");
   
   //while(text.indexOf("]") != -1)
      //text = text.replace("]","'>");
   

   return text;
}