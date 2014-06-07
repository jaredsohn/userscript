// ==UserScript==
// @name 		stnkvcmls Ikariam CR Converter
// @namespace 
// @version		1.0.5
// @description	Converts combat reports for Ikariam browser game
// @license		GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include		http://s*.ikariam.*/*
// @exclude 
// @exclude 
// @require		http://code.jquery.com/jquery-1.7.1.min.js
// @require		http://stnkvcmls.googlecode.com/hg/ikariam_converter/stn_cr_con_data.js
// @require		http://stnkvcmls.googlecode.com/hg/ikariam_converter/stn_cr_con_settings.js
// @require		http://stnkvcmls.googlecode.com/hg/ikariam_converter/jquery.event.drag-1.5.min.js
// @history		1.0.5 Feature: Added new units (for 0.4.5).
// @history		1.0.5 BugFix: Fixed bug where no units were shown.
// @history		1.0.4 BugFix: Fixed bug when defender has units only in last row.
// @history		1.0.3 BugFix: Minor bugfixes.
// @history		1.0.3 BugFix: Fixed bug when there's only allied troops in town.
// @history		1.0.2 Feature: Added button for manual script update.
// @history		1.0.2 BugFix: Unable to use converter settings on small resolutions or small window size.
// @history		1.0.1 BugFix: For some reason, parsing attacker/defenders units isnt working. Back to old code.
// @history		1.0.1 BugFix: Can not convert when there's more then 7 types of units.
// @history		1.0.1 BugFix: Can not convert when there's no defenders.
// @history		1.0.0 Feature: Changed interface.
// @history		1.0.0 Feature: Some changes to the engine.
// @history		1.0.0 Feature: Added color changing option.
// @history		1.0.0 Feature: Changed updater script.
// @history		1.0.0 Feature: Send report with bbcode ingame.
// @history		1.0.0 Feature: Total and round damage in detailed report.
// ==/UserScript==

const lang = getLang();
const crConvVersion = "1.0.5";

//ScriptUpdater.check(58998, crConvVersion);
		    
var settings = new Settings();
var textArea;
			
reportElements = {
	type: null,
	for_near: null,
	place: null,
	time: null,
	attackers: [],
	defenders: [],
	cities: { attackers: [], defenders: []},
	units: {codes: [], attackers: [], defenders: []},
	winners: [],
	losers: [],
	loot: [],
	lootTotal: 0,
	isThereLoot: false
}

reports = {
	bbcode: "",
	plaintext: "",
	htmlcode: ""
}

damageDetail = {
	attacker: [],
	defender: []
}

setGMValues();

setTabEvents = function(){
	$("div.tab_inactive").click(function (){
		if($(this).attr('class') != 'tab tab_active'){
			$('div.tab_active').removeClass('tab_active').addClass('tab_inactive');
			$(this).removeClass('tab_inactive').addClass('tab_active').css('color','#542c0f');
			setTabEvents();
		}
	})
}

setOtherEvents = function(){
	$('div#bbcode').click(function (){
		if($('#wrap1').css('display') == 'none'){
			$('#wrap2').fadeOut(500);
			$('#wrap1 #stnkvcmlsTextArea').val(reports.bbcode);
			$('#wrap1').fadeIn(500);
		}
		else{
			$('#wrap1').fadeOut(500);
			$('#wrap2 #stnkvcmlsTextArea').val(reports.bbcode);
			$('#wrap2').fadeIn(500);
		}
	});
	
	$('div#plaintext').click(function (){
		if($('#wrap1').css('display') == 'none'){
			$('#wrap2').fadeOut(500);
			$('#wrap1 #stnkvcmlsTextArea').val(reports.plaintext);
			$('#wrap1').fadeIn(500);
		}
		else{
			$('#wrap1').fadeOut(500);
			$('#wrap2 #stnkvcmlsTextArea').val(reports.plaintext);
			$('#wrap2').fadeIn(500);
		}
	});

	$('div#htmlcode').click(function (){
		if($('#wrap1').css('display') == 'none'){
			$('#wrap2').fadeOut(500);
			$('#wrap1 #stnkvcmlsTextArea').val(reports.htmlcode);
			$('#wrap1').fadeIn(500);
		}
		else{
			$('#wrap1').fadeOut(500);
			$('#wrap2 #stnkvcmlsTextArea').val(reports.htmlcode);
			$('#wrap2').fadeIn(500);
		}
	});
	
	$('#wrap1 #stnkvcmlsTextArea').click(function (){
		$(this).select();
	});
	
	$('#wrap2 #stnkvcmlsTextArea').click(function (){
		$(this).select();
	});
	
	$('div#bbcode').hover(function(){
		if($(this).attr('class') != 'tab tab_active') $(this).css('color','#FF9933');
	},function(){
		$(this).css('color','#542c0f');
	});
	
	$('div#plaintext').hover(function(){
		if($(this).attr('class') != 'tab tab_active') $(this).css('color','#FF9933');
	},function(){
		$(this).css('color','#542c0f');
	});

	$('div#htmlcode').hover(function(){
		if($(this).attr('class') != 'tab tab_active') $(this).css('color','#FF9933');
	},function(){
		$(this).css('color','#542c0f');
	});	
	
	$('#settings').click(function (){
		settings.show(this);
	});
	
	$('#settings').hover(function (){
		$(this).css('color','#FF9933');
	},function (){
		$(this).css('color','#542c0f');
	});	
	
	$('#update').click(update);
	$('#update').hover(function (){
		$(this).css('color','#FF9933');
	},function (){
		$(this).css('color','#542c0f');
	});		
}

update = function(){
	//ScriptUpdater.forceNotice(58998, crConvVersion);
}

createTextArea = function(){
	if( language[lang] == null ){
		alert("Language is not suported. Visit http://userscripts.org/scripts/show/58998 .");
		return 0;
	}

	GM_addStyle(
		'#buttons {	width: 656px; height: 22px; background-color: #FDF7DD; margin-left: 9px; padding-top: 10px; }' +
		'#reportDiv p{ font-size: 14px; font-weight: bold; color: #542C32; background-color: #FDF7DD; }' +
		'.tab{ padding: 4px 10px; background-color: #FDF7DD; height: 14px; /*width: 80px;*/ text-align: center; cursor: pointer; font-weight: bold;}' +
		'.tab_inactive{ background-color: #FDF7DD; float: left; }' + 
		'.tab_active{ background-color: #FEDC9C; float: left; }' +
		'#stnkvcmlsTextArea{ border: solid 2px #FEDC9C; width: 648px; height: 150px; overflow: auto; background-color:#FDF7DD; display: block; margin: 0 auto; }' +
		'#preview{ border: solid 2px #FEDC9C; width: 642px; margin: 0 auto; padding: 5px;}'+
		'#update{ float: right; cursor: pointer; }'
	);

	$("div#mainview").append(
		'<div id="reportDiv" class=contentBox01h>' +
			'<h3 class=header> stnkvcmls Ikariam CR Converter: Greasemonkey Edition, '+language[lang].version+' '+crConvVersion+
			'<div id=update>'+language[lang].update+'</div></h3>'+
			'<div class=content>'+
				'<div id="buttons"> '+
					'<div class="tab tab_active" id=bbcode> '+language[lang].bbcode+' </div>'+
					'<div class="tab tab_inactive" id=plaintext>  '+language[lang].plaintext+'  </div>'+
					'<div class="tab tab_inactive" id=htmlcode>  '+language[lang].htmlcode+'  </div>'+
					'<div class=tab style="float: right;" id="settings"> '+language[lang].settings+' </div>' +
				'</div>	'+
				'<div style="position: relative; margin-left: 9px; height: 170px;">'+
					'<div id=wrap1 style="display: none; position: absolute; top: 0; left: 0; z-index: 90000;"><textarea id="stnkvcmlsTextArea"  style="" name="text2"  id="text2" value="">  </textarea><br></div>'+
					'<div id=wrap2 style="display: block; position: absolute; top: 0; left: 0; z-index: 90001;"><textarea id="stnkvcmlsTextArea"  style="" name="text2"  id="text2" value="">  </textarea><br></div>'+
				'</div>'+
				'<div id="preview"></div><br>'+
			'</div>'+
			'<div class=footer></div>'+
		'</div>'
	);

	setTabEvents();
	setOtherEvents();			
	textArea = $('#wrap2 #stnkvcmlsTextArea');
	parseReport();
	settings.init(convertReport);
}

preview = function(){
	var par = $("div#preview");
	par.html(bbcode2html(textArea.val()));
}

parseReport = function(){
	textArea.val("");
	var tmp = $("#troopsReport h3.header")[0];
	
	/* battle type */
	tmp2 = tmp.childNodes[0].nodeValue;
	if( tmp2.indexOf(language[lang].battleLand) != -1) reportElements.type = language[lang].battleLand;
	else reportElements.type = language[lang].battleSea;
	
	/* for_near / place */
	if( (i = tmp2.indexOf(language[lang].forCity)) != -1) reportElements.for_near = language[lang].forCity;
	else{
	  reportElements.for_near = language[lang].nearCity;
	  i = tmp2.indexOf(language[lang].nearCity);
	}
	reportElements.place = tmp2.substring( i + reportElements.for_near.length + 1, tmp2.length - 1);
	
	/* time */
	reportElements.time = "[" + $('span.date').html().substring( 1, $('span.date').html().length - 1) + "]";
	
	tmp = $("div.attacker")
	if( tmp.html() == $("div.textgreen").html()) attackersReport = 1;
	else attackersReport = 0;

	/* attacker */
	tmp = $('div.attacker span').text().split(',');
	i = 0;
	for(var el in tmp){
		if(( k = tmp[el].indexOf(language[lang].from)) != -1){
			reportElements.attackers.push(tmp[el].substring(0,k));
			if(reportElements.cities.attackers[i] == null) reportElements.cities.attackers[i] = new Array();
			reportElements.cities.attackers[i].push(tmp[el].substring(k+language[lang].from.length));
			i++;
		}
		else{
			reportElements.cities.attackers[i-1].push(tmp[el]);
		}
	}
	
	/* defender */
	tmp = $('div.defender span').text().split(',');
	i = 0;
	for(var el in tmp){
		if(( k = tmp[el].indexOf(language[lang].from)) != -1){
			reportElements.defenders.push(tmp[el].substring(0,k));
			if(reportElements.cities.defenders[i] == null) reportElements.cities.defenders[i] = new Array();
			reportElements.cities.defenders[i].push(tmp[el].substring(k+language[lang].from.length));
			i++;
		}
		else{
			reportElements.cities.defenders[i-1].push(tmp[el]);
		}
	}	
	
	/* units */
	var unitCodes = $("td.headline");
	k = 0;
	for( i = 0; i < unitCodes.length; i++ ){
		if(unitCodes[i].childNodes[0] != null && unitCodes[i].childNodes[0].nodeName == "DIV")
		{
			reportElements.units.codes[k] = unitCodes[i].childNodes[0].className.substring(unitCodes[i].childNodes[0].className.indexOf("s") + 1);
			k++;
		}
	}
	
	/* attacker */
	var units1 = $("tr.textgreen");
	var units2 = $("tr.textred");
	var uNum = 0;
	
	textArea.value = "";
	k = 0;
	var no_def = 1;
	for( i = 0; i < units1.length; i++ ){
		var tr = units1[i];
		if( tr.childNodes[1].childNodes[0].nodeValue != language[lang].alliedTroops) no_def = 0;
	}	
	for( i = 0; i < units1.length; i++ ){
		var tr = units1[i];
		textArea.value += "\n";
		if( tr.childNodes[1].childNodes[0].nodeValue == language[lang].alliedTroops && no_def == 0) k = uNum;		
		
		uNum = k;
		for( j = 3; j < tr.childNodes.length; j+= 2){		
			var td = tr.childNodes[j];
			var left = 0;
			var lost = 0;
			if(td.childNodes.length != 0 ){
				if( reportElements.units.attackers[k] == null ) reportElements.units.attackers[k] = { left: 0, lost: 0 };	
				if( reportElements.units.defenders[k] == null ) reportElements.units.defenders[k] = { left: 0, lost: 0 };					
				if(td.childNodes.length == 1) tmp2 = td.childNodes[0].nodeValue.replace( /\s/g, "" );
				else tmp2 = td.childNodes[1].childNodes[0].nodeValue.replace( /\s/g, "" );
				if( tmp2 != "-" ){
					left = parseFloat(tmp2.substring(0,tmp2.indexOf("(")));
					if( left < 0 ){
					  left = 0;
					  tmp2 = tmp2.substring(1);
					}  
					lost = parseFloat(tmp2.substring(tmp2.indexOf("-")+1,tmp2.indexOf(")")));
				}
				textArea.value += i + "  " + reportElements.units.codes[k] + ": " + left + "(-" + lost + ")\n";
				if( attackersReport == 1 ){
					reportElements.units.attackers[k].left += left;
					reportElements.units.attackers[k].lost += lost;
				}
				else{
					reportElements.units.defenders[k].left += left;
					reportElements.units.defenders[k].lost += lost;
				}
				k++;
			}
			
		}
	}
	
	/* if there's no units (eaven -) in all but last row */
	k = 0;
	var line = $("tr.line");
	var n = 0;
	for( i = 0; i < line.length; i++ ){
		var tmp = line[i].previousSibling.previousSibling.className;
		if( tmp != "textgreen" && tmp != "textred" ){
			for( k = 0; k < 7; k++ ){
				if( reportElements.units.defenders[k] == null ) reportElements.units.defenders[k] = { left: 0, lost: 0 };	
			}
			n = k;
		}
	}	
	
	/* defender */
	no_def = 1;
	for( i = 0; i < units2.length; i++ ){
		var tr = units2[i];
		if( tr.childNodes[1].childNodes[0].nodeValue != language[lang].alliedTroops) no_def = 0;
	}		
	for( i = 0; i < units2.length; i++ ){
		var tr = units2[i];
		textArea.value += "\n";
		if( tr.childNodes[1].childNodes[0].nodeValue == language[lang].alliedTroops && no_def == 0) k = uNum;
		
		uNum = k;
		for( j = 3; j < tr.childNodes.length; j+= 2){	
			var td = tr.childNodes[j];
			var left = 0;
			var lost = 0;
			if(td.childNodes.length != 0 ){
				if( reportElements.units.attackers[k] == null ) reportElements.units.attackers[k] = { left: 0, lost: 0 };	
				if( reportElements.units.defenders[k] == null ) reportElements.units.defenders[k] = { left: 0, lost: 0 };					
				if(td.childNodes.length == 1) tmp2 = td.childNodes[0].nodeValue.replace( /\s/g, "" );
				else tmp2 = td.childNodes[1].childNodes[0].nodeValue.replace( /\s/g, "" );
				if( tmp2 != "-" ){
					left = parseFloat(tmp2.substring(0,tmp2.indexOf("(")));
               if( left < 0 ){
                  left = 0;
                  tmp2 = tmp2.substring(1);
               }  
					lost = parseFloat(tmp2.substring(tmp2.indexOf("-")+1,tmp2.indexOf(")")));
				}
				textArea.value += i + "  " + reportElements.units.codes[k] + ": " + left + "(-" + lost + ")\n";
				if( attackersReport == 0 ){
					reportElements.units.attackers[k].left += left;
					reportElements.units.attackers[k].lost += lost;
				}
				else{
					reportElements.units.defenders[k].left += left;
					reportElements.units.defenders[k].lost += lost;
				}
				k++;
			}
		}
	}		
	
	
	/*$("#troopsReport table.overview tr").each(function() {
		if ($(this).find("th div").size() > 0) {
			unitSide = reportElements.units.attackers;
			unitCountStart = reportElements.units.codes.length;
			$(this).find("th div").each(function() { reportElements.units.codes.push($(this).attr('class').substring($(this).attr('class').indexOf('s')+1)); });
		}
		else if ($(this).find("td[colspan='8'][class^='col1 nobg']").size() == 1) unitSide = reportElements.units.defenders;
		else if ($(this).find("td.numbers").size() == reportElements.units.codes.length) {
			unitCount = unitCountStart;
			$(this).find("td.numbers").each(function() {
				var details = $(this).text();
				if (details.indexOf("(") != -1) {
					if (unitSide[unitCount] == null) { unitSide[unitCount] = { left: 0, lost: 0 } }
					unitSide[unitCount].left += parseInt(details.substr(0, details.indexOf('(')).replace(/\s+/, ''));
					unitSide[unitCount].lost += parseInt(details.substr(details.indexOf('(') + 2).replace(/\s+/, '').replace(/\)/, ''));
				}
				else if (unitSide[unitCount] == null) unitSide[unitCount] = { left: 0, lost: 0 };
				unitCount++
			});
		}
	}); */
	
	/* winners */
	tmp = $("div.winners");
	if( tmp[0] != null ){
		tmp2 = tmp[0].childNodes[2].nodeValue;
		reportElements.winners = tmp2.replace(/^\s+/, '').replace(/\s+$/, '').split(", ");
	}
	
	/* losers */
	tmp = $("div.losers");
	if( tmp[0] != null ){
		tmp2 = tmp[0].childNodes[2].nodeValue;
		reportElements.losers = tmp2.split(", ");
	}		
	
	/* loot */
	isThereLoot = false;
	$("ul.resources").each(function(){
		if( $(this).parent().attr("id") != "cityResources" ){
			isThereLoot = true;
			var length = $(this).contents().length;
					 
			 var par = $(this).parent();
			 var length2 = par.contents().length;
			 
			 var index;
			 
			 if( length2 == 2 ) index = findInArray(reportElements.winners, par.contents()[0].nodeValue);
			 else if( length2 == 4 ) index = findInArray(reportElements.winners, par.contents()[2].nodeValue);
			 else if( length2 == 6 ) index = findInArray(reportElements.winners, par.contents()[3].childNodes[0].nodeValue);
					
			var res = 0;
			for( var i = 0; i < length; i++ ){
				if( $(this).contents()[i].className == "wood" ) res = 0;
				else if( $(this).contents()[i].className == "wine" ) res = 1;
				else if( $(this).contents()[i].className == "marble" ) res = 2;
				else if( $(this).contents()[i].className == "glass" ) res = 3;
				else if( $(this).contents()[i].className == "sulfur" ) res = 4;
				
				if(reportElements.loot[index] == null) reportElements.loot[index] = new Array();
				reportElements.loot[index][res] = $(this).contents()[i].childNodes[1].nodeValue;
				reportElements.lootTotal += parseInt($(this).contents()[i].childNodes[1].nodeValue);
			}
		}
	});	
	
	convertReport();
}

convertReport = function(){
	var line = "";
	var i;
	var font = "[font='Courier New, Courier, mono']";
	
	options[lang] = eval(GM_getValue("options_"+lang, null));
	colors = eval(GM_getValue("colors_"+lang,null));
	
	for(i = 0; i < 50; i++) line += "-";
	
	if(reportElements.units.defenders == ""){
		for(i = 0; i < reportElements.units.codes.length; i++){
			reportElements.units.defenders[i] = {left: 0, lost: 0 };
		}
	}	

	/* battle for - city */
	var textBattleFor = "[size=10][color=" + colors.text + "]" + line + "[/color][/size]" + "\n";
	if(options[lang].cities == true) textBattleFor += "[b][size=12][color=" + colors.title + "]" + reportElements.type + " " + reportElements.for_near + " " + reportElements.place + "[/color][/size][/b]";
	else textBattleFor += "[b][size=12][color=" + colors.title + "]" + reportElements.type + "[/color][/size][/b]";
	textBattleFor += "\n";
	
	/* battle for - time/date */
	textBattleFor += "[b][size=12][color=" + colors.otherNumbers + "]" + reportElements.time + "[/color][/size][/b]";
	textBattleFor += "\n" + "[size=10][color=" + colors.text + "]" + line + "[/color][/size]" + "\n";	

	/* attacker */
	var counter = 0;
	var attacker;
	if(reportElements.attackers.length > 1) attacker = language[lang].attackers;
	else attacker = language[lang].attacker;
	var textAttacker = "[size=10][color=" + colors.title + "]" + attacker + ":[/color]" + "\n";
	for(i = 0; i < reportElements.attackers.length; i++){
		var length = reportElements.cities.attackers[i].length;
		counter += reportElements.attackers[i].length;
		if(counter > 45) { textAttacker += "\n"; counter -= 45; }
		textAttacker += "[color=" + colors.attacker + "]" +  reportElements.attackers[i];
		if(options[lang].cities == true){
			counter += language[lang].from.length;
			if(counter > 45) { textAttacker += "\n"; counter -= 45; }
			textAttacker += language[lang].from;
			for(j = 0; j < length; j++){
				counter += reportElements.cities.attackers[i][j].length;
				if(counter > 45) { textAttacker += "\n"; counter -= 45; }
				textAttacker += reportElements.cities.attackers[i][j];
				if(j != length-1) { textAttacker += ", "; counter += 2; }
			}
		}
		if(i < reportElements.attackers.length-1) { textAttacker += "; "; counter += 2; }
		textAttacker += "[/color]";
	}
	textAttacker += "\n[color=" + colors.text + "]" + line + "[/color][/size]" + "\n";	
	
	/* defender */
	counter = 0;
	var defender;
	if(reportElements.defenders.length > 1) defender = language[lang].defenders;
	else defender = language[lang].defender;
	var textDefender = "[size=10][color=" + colors.title + "]" + defender + ":[/color]" + "\n";
	for(i = 0; i < reportElements.defenders.length; i++){
		var length = reportElements.cities.defenders[i].length;
		counter += reportElements.defenders[i].length;
		if(counter > 45) { textDefender += "\n"; counter -= 45; }
		textDefender += "[color=" + colors.defender + "]" +  reportElements.defenders[i];
		if(options[lang].cities == true){
			counter += language[lang].from.length;
			if(counter > 45) { textDefender += "\n"; counter -= 45; }
			textDefender += language[lang].from;
			for(j = 0; j < length; j++){
				counter += reportElements.cities.defenders[i][j].length;
				if(counter > 45) { textDefender += "\n"; counter -= 45; }
				textDefender += reportElements.cities.defenders[i][j];
				if(j != length-1) { textDefender += ", "; counter += 2; }
			}
		}
		if(i < reportElements.defenders.length-1) { textDefender += "; "; counter += 2; }
		textDefender += "[/color]";
	}
	textDefender += "\n[color=" + colors.text + "]" + line + "[/color][/size]" + "\n";	
	
	
	/* attacker.........defender */
	var dots = "";
	while(50 - attacker.length - dots.length > defender.length) dots += ".";
	var textUnits = "[size=10][color=" + colors.attacker + "]" + attacker + "[/color]" +
				"[color=#F6EBBD]" + dots +"[/color]" + 
				"[color=" + colors.defender + "]" + defender + "[/color]" + "\n";	
	
	/* units */
	var units = new Array();
	var textUnitsTmp = new Array();
	units[0] = new Array(); units[1] = new Array();
	textUnitsTmp[0] = new Array(); textUnitsTmp[1] = new Array();
	var unitsTmp = "";
	for(i = 0; i < reportElements.units.codes.length; i++){
		units[0][i] = reportElements.units.attackers[i].left + " [-" + reportElements.units.attackers[i].lost + "]";
		textUnitsTmp[0][i] = "[color=" + colors.attackerUnits + "]" + reportElements.units.attackers[i].left + "[/color][color=" + colors.deadUnits + "] [-"  + reportElements.units.attackers[i].lost + "][/color]";
		if(units[0][i] == "0 [-0]"){ units[0][i] = ""; textUnitsTmp[0][i] = "";}
		units[1][i] = reportElements.units.defenders[i].left + " [-" + reportElements.units.defenders[i].lost + "]";
		textUnitsTmp[1][i] = "[color=" + colors.defenderUnits + "]" + reportElements.units.defenders[i].left + "[/color][color=" + colors.deadUnits + "] [-"  + reportElements.units.defenders[i].lost + "][/color]";
		if(units[1][i] == "0 [-0]"){ units[1][i] = ""; textUnitsTmp[1][i] = "";}
	}

	for(i = 0; i < reportElements.units.codes.length; i++){
		unitsTmp = unitsLang[lang][codeToName(parseInt(reportElements.units.codes[i]))];
		var l = unitsTmp.length;
		dots = "";
		while(25-l/2-units[0][i].length - dots.length > 0) dots += ".";
		unitsTmp = units[0][i] + dots + unitsTmp;
		textUnits += textUnitsTmp[0][i] + "[color=#F6EBBD]" + dots +"[/color][color=" + colors.text + "]" + unitsLang[lang][codeToName(parseInt(reportElements.units.codes[i]))] + "[/color]";

		dots = "";
		while(unitsTmp.length + units[1][i].length + dots.length < 50) dots += ".";
		unitsTmp += dots + units[1][i];
		textUnits += "[color=#F6EBBD]" + dots +"[/color]" + textUnitsTmp[1][i] + "\n";
	}
	textUnits += "[color=" + colors.text + "]" + line + "[/color][/size]" + "\n";

	/* winners */
   var textWinner = "";
   var textLoser = "";
   if(reportElements.winners[0] != null){
	var winColor;
	if( findInArray(reportElements.attackers, reportElements.winners[0]) != -1 ) winColor = colors.attacker;
	else winColor = colors.defender;

	counter = 0;
	textWinner = "[size=10][color=" + colors.title + "]";
	if( reportElements.winners.length > 1 ) textWinner +=  language[lang].winners;
	else textWinner += language[lang].winner;
	textWinner += "[/color][color=" + winColor + "]\n";
	for(i = 0; i < reportElements.winners.length; i++){
		counter += reportElements.winners[i].length;
		if( counter > 45 ) { textWinner += "\n"; counter -= 45; }
		textWinner += reportElements.winners[i];
		if(i < reportElements.winners.length-1)  { textWinner += ", "; counter += 2; }
	}
	textWinner += "[/color]\n" + "[color=" + colors.text + "]" + line + "[/color][/size]" + "\n";
   }
	
	/* losers */
   if(reportElements.losers[0] != null){
		var loseColor;
		if( findInArray(reportElements.attackers, reportElements.losers[0]) != -1 ) loseColor = colors.attacker;
		else loseColor = colors.defender;

		counter = 0;
		textLoser = "[size=10][color=" + colors.title + "]";
		if( reportElements.losers.length > 1 ) textLoser +=  language[lang].losers;
		else textLoser += language[lang].loser;
		textLoser += "[/color][color=" + loseColor + "]\n";
		for(i = 0; i < reportElements.losers.length; i++){
			counter += reportElements.losers[i].length;
			if( counter > 45 ) { textLoser += "\n"; counter -= 45; }
			textLoser += reportElements.losers[i];
			if(i < reportElements.losers.length-1)  { textLoser += ", "; counter += 2; }
		}
		textLoser += "[/color]\n" + "[color=" + colors.text + "]" + line + "[/color][/size]" + "\n";   
   }
	
	/* loot */
	var textLoot = ""
	if( options[lang].loot == true && isThereLoot == true ){
		textLoot = "[size=10][color=" + colors.title + "]" + language[lang].loot + "[/color]\n";
		var lootTmp = "";
		var lootNumTmp = 0;
		
		for(i = 0; i < reportElements.attackers.length; i++){
			for( j = 0; j < 5; j++) if( reportElements.loot[i] != null ) break;
			if( j != 5 ){
				textLoot += "[color=" + colors.attacker + "]" + reportElements.attackers[i] + "[/color]\n";
				for(j = 0; j < 5; j++){
					if(reportElements.loot[i][j] != null){
						if( j == 0 ) lootTmp = language[lang].wood;
						else if( j == 1 ) lootTmp = language[lang].wine;
						else if( j == 2 ) lootTmp = language[lang].marble;
						else if( j == 3 ) lootTmp = language[lang].glass;
						else if( j == 4 ) lootTmp = language[lang].sulphur;
						
						lootNumTmp = reportElements.loot[i][j];
						dots = "";
						while( 50 - lootTmp.length - dots.length > lootNumTmp.length ) dots += ".";
						textLoot += "[color=" + colors.text + "]" + lootTmp + "[/color][color=#F6EBBD]" + dots +
								"[/color][color=" + colors.otherNumbers + "]" + lootNumTmp + "[/color]\n";
					}
				}
			}
		}
		textLoot += "[color=" + colors.text + "]" + line + "[/color][/size]" + "\n";	
	}
	

	/* calculate damage */
	var damageAttacker = 0;
	var damageDefender = 0;
	var tmpInt = "";
	var tmpInt2 = 0;
	for(i = 0; i < 22; i++){
		if(reportElements.units.codes[i] != null){
			tmpInt = codeToName(parseInt(reportElements.units.codes[i]));
			
			tmpInt2 = (unitsCost[tmpInt].wood + unitsCost[tmpInt].luxuryGoods)*reportElements.units.attackers[i].lost;
			damageAttacker += tmpInt2;
		
			tmpInt2 = (unitsCost[tmpInt].wood + unitsCost[tmpInt].luxuryGoods)*reportElements.units.defenders[i].lost;
			damageDefender += tmpInt2;
		}
	}
	if(options[lang].damage == "GeneralsA" ){
		damageAttacker /= 50;
		damageDefender /= 50;
	}
   else if(options[lang].damage == "GeneralsAL"){
	  damageAttacker = (damageAttacker - reportElements.lootTotal) / 50;
	  damageDefender = (damageDefender + reportElements.lootTotal) / 50;
   }
	else if(options[lang].damage == "ResourcesAL"){
		damageAttacker -= reportElements.lootTotal;
		damageDefender += reportElements.lootTotal;
	}
	damageAttacker = parseInt(damageAttacker);
	damageDefender = parseInt(damageDefender);
	var damageTotal = damageAttacker + damageDefender + '';
	damageAttacker += '';
	damageDefender += '';

	/* damage */
	var textDamage = "[size=10][color=" + colors.title + "]" + language[lang].damageR + "[/color]\n";
	var tmp = "";
	if(reportElements.attackers.length > 1) tmp = language[lang].attackers;
	else tmp = language[lang].attacker;
	dots = "";
	while(50 - tmp.length - dots.length > damageAttacker.length) dots += ".";
	textDamage += "[color=" + colors.text + "]" + tmp + "[/color][color=#F6EBBD]" + dots +
				"[/color][color=" + colors.otherNumbers + "]" + damageAttacker + "[/color]\n";
	if(reportElements.defenders.length > 1) tmp = language[lang].defenders;
	else tmp = language[lang].defender;
	dots = "";
	while(50 - tmp.length - dots.length > damageDefender.length) dots += ".";
	textDamage += "[color=" + colors.text + "]" + tmp + "[/color][color=#F6EBBD]" + dots +
				"[/color][color=" + colors.otherNumbers + "]" + damageDefender + "[/color]\n";
	textDamage += "[color=" + colors.title + "]" + language[lang].damageT + "[/color]\n" +
				"[color=" + colors.otherNumbers + "]" + damageTotal + "[/color]\n";
	textDamage += "[color=" + colors.text + "]" + line + "[/color][/size]" + "\n";

	var bbCodeText = "";
	var plainTextText = "";
	var htmlCodeText = "";
   
	var finishedBattle = "";
	if( reportElements.winners[0] == null && reportElements.losers[0] == null ) finishedBattle = "\n" + language[lang].finishedBattle + "\n";
	
	bbCodeText = "[align=" + options[lang].align + "]" + font +
				textBattleFor +
				textAttacker +
				textDefender +
				textUnits +
				textLoot +
				textWinner +
				textLoser +
				textDamage +
				finishedBattle +
				"\n\n\n[b][i][color=#999999]" + language[lang].created +
				"\n [url='http://userscripts.org/scripts/show/58998']stnkvcmls\' Ikariam CR Converter: Greasemonkey Edition\n" + 
				language[lang].version + " " + crConvVersion + "[/url]" + "[/i][/b]" +
				"[/font][/align]";
	
	plainTextText = bbCodeText;
	
	var k = 0;
	do{
		i = plainTextText.indexOf("]", k);
		if(i != -1){
			j = plainTextText.indexOf("[", k);
			if((plainTextText[j+1] < '0' || plainTextText[j+1] > '9') && plainTextText[j+1] != '-')
				plainTextText = plainTextText.substring(0, j) + plainTextText.substring(i+1);
			else k = i + 1;
		}
	}while(i != -1);
	
	reports.bbcode = bbCodeText;
	reports.plaintext = plainTextText;
	reports.htmlcode = bbcode2html(bbCodeText);
	
	textArea.val(bbCodeText);
	preview();
}

codeToName = function(code){
	switch(code){
		case 301: return "slinger";
		case 302: return "swordsman";
		case 303: return "hoplite";
		case 304: return "marksman";
		case 305: return "mortar";
		case 306: return "catapult";
		case 307: return "batteringRam";
		case 308: return "steamGiant";
		case 309: return "balloonBombardier";
		case 310: return "cook";
		case 311: return "doctor";
		case 312: return "gyrocopter";
		case 313: return "archer";
		case 314: return "wall";
		case 315: return "spearThrower";
		case 316: return "barbarianAxeSwinger";
		case 210: return "ramShip";
		case 211: return "lightvessel";
		case 212: return "divingBoat";
		case 213: return "ballistaShip";
		case 214: return "catapultShip";
		case 215: return "mortarShip";
		case 216: return "paddleWheelRam";
	}
	return 0;
}

findInArray = function(array, item){
	if( item != null)
		for( var i = 0; i < array.length; i++){
			if( item.indexOf(array[i]) != -1 ) return i;
		}
	return -1;
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
	
	text = text.replace(/\[align=Left\]/g,"<div style='text-align: left'>");
	text = text.replace(/\[align=Center\]/g,"<div style='text-align: center'>");
	text = text.replace(/\[align=Right\]/g,"<div style='text-align: right'>");
	text = text.replace(/\[align=[^\]]+\][^\[]+\[\/align\]/g,"");
	
	var br = "<br>";
	if($("body").attr("id") == "militaryAdvisorReportView" ) br = "";
	text = text.replace("[url='http://userscripts.org/scripts/show/58998']stnkvcmls' Ikariam CR Converter: Greasemonkey Edition" + br + "\n" + 
				language[lang].version + " " + crConvVersion + "[/url]","<a href="+"'http://userscripts.org/scripts/show/58998'>stnkvcmls\' Ikariam CR Converter: Greasemonkey Edition\n" + 
				language[lang].version + " " + crConvVersion+"</a>");
	text = text.replace(/\[url=[^\]]+\][^\[]+\[\/url\]/g,"");
  
   while(text.indexOf("\n") != -1) text = text.replace("\n","<br>");
   while(text.indexOf("[b]") != -1) text = text.replace("[b]","<b>");
   while(text.indexOf("[/b]") != -1) text = text.replace("[/b]","</b>");
   while(text.indexOf("[i]") != -1) text = text.replace("[i]","<i>");
   while(text.indexOf("[/i]") != -1) text = text.replace("[/i]","</i>");
   
   text = text.replace(/\[[^0-9-][^\]]+\]/g,"");
   //^((?!\[[0-9]{2}.[0-9]{2}.[0-9]{4} [0-9]{1,2}:[0-9]{2}:[0-9]{2}\]).)*$
   
   /*j = -2;
   while(true){
	   j = text.indexOf("]", j+2)-1;
	   if(j == -2) break;
	   i = j;
	   var tmp = text[i];
	   while(text[i] != '[' && i > 1) i--;
	   var tmp2 = text[i+1];

	   if((tmp >= '0' && tmp <= '9') && (tmp2 == '-' || (tmp2 >= '0' && tmp2 <= '9'))){
		 
	   }
	   else
		   if(text[i+1] != '/')
			   text = text.substring(0,j+1) + "'>" + text.substring(j+2);
   }

   
   
   /*text = text.replace("[font='","<span style='font-family: ");
   text = text.replace("[/font]","</span>");
   while(text.indexOf("[size=") != -1){
	  text = text.replace("[size=","<span style='font-size:");
	  text = text.replace("[/size]","</span>");
   }
   while(text.indexOf("[color=") != -1){
	  text = text.replace("[color=","<span style='color:");
	  text = text.replace("[/color]","</span>");
   }
   text = text.replace(/\[align=+\]/,"<div style='text-align: "+options[lang].align+">");
   text = text.replace("[/align]","</div>");
   text = text.replace("[url='http://userscripts.org/scripts/show/58998']stnkvcmls\' Ikariam CR Converter: Greasemonkey Edition\n" + 
				language[lang].version + " " + crConvVersion+"]","<a href="+"'http://userscripts.org/scripts/show/58998']stnkvcmls\' Ikariam CR Converter: Greasemonkey Edition\n" + 
				language[lang].version + " " + crConvVersion+">");
   //text = text.replace("[/url]","</a>");*/
   text = text.replace(/<br><br>/g,"<br>");
   //text = text.replace(/</g,'&lt;').replace(/>/g,'&gt;');
   
   return text;
}

detailedReportDamage = function(){
	var damageAtt = 0.0;
	var damageDef = 0.0;
	
	var ulClassArray = new Array("special", "airfighter", "air", "flankLeft", "flankRight", "main", "longRange", "artillery");
	
	damageDetail = eval(GM_getValue("damageDetail", null));
	
	var rnd = $(".roundNo").html();
	i = 0;
	while(isNaN(rnd[i])) i++;
	j = i;
	while(!isNaN(rnd[j])) j++;
	rnd = parseInt(rnd.substring(i, j+1));
	damageDetail['attacker'][rnd-1] = 0;
	damageDetail['defender'][rnd-1] = 0;	
	
	for(i = 0; i < 8; i++){
		var tmp = $("div#fieldAttacker > ul." + ulClassArray[i] + " > li");
		for(j = 0; j < tmp.length; j++){
			if(tmp[j].innerHTML.indexOf("<div") != -1){
				if(tmp[j].childNodes[0].className != "empty"){
					var tmp2 = tmp[j].childNodes[1].innerHTML;
					var lost = parseInt(tmp2.substring(tmp2.indexOf("-")+1, tmp2.indexOf(")")));
					var unit = codeToName(parseInt(tmp[j].childNodes[0].className.substring(1)));
					damageDetail.attacker[rnd-1] += (unitsCost[unit].wood + unitsCost[unit].luxuryGoods)*lost;
				}
			}
		}
	}
	for(i = 0; i < 8; i++){
		var tmp = $("div#fieldDefender > ul." + ulClassArray[i] + " > li");
		for(j = 0; j < tmp.length; j++){
			if(tmp[j].innerHTML.indexOf("<div") != -1){
				if(tmp[j].childNodes[0].className != "empty"){
					var tmp2 = tmp[j].childNodes[1].innerHTML;
					var lost = parseInt(tmp2.substring(tmp2.indexOf("-")+1, tmp2.indexOf(")")));
					var unit = codeToName(parseInt(tmp[j].childNodes[0].className.substring(1)));
					damageDetail.defender[rnd-1] += (unitsCost[unit].wood + unitsCost[unit].luxuryGoods)*lost;
				}
			}
		}
	}
	
	options[lang] = eval(GM_getValue("options_"+lang, null));
	
	if(options[lang].damage == "GeneralsA" ){
		damageDetail.attacker[rnd-1] = damageDetail.attacker[rnd-1] / 50;
		damageDetail.defender[rnd-1] = damageDetail.defender[rnd-1] / 50;
	}	
	
	var totalAtt = 0;
	var totalDef = 0;
	
	for(i = 0; i < rnd; i++){
		if(!isNaN(damageDetail.attacker[i])) totalAtt += damageDetail.attacker[i];
		if(!isNaN(damageDetail.attacker[i])) totalDef += damageDetail.defender[i];
	}
	GM_setValue("damageDetail", damageDetail.toSource());
	
	$('span#rndAtt').html(parseInt(damageDetail.attacker[rnd-1]));
	$('span#ttlAtt').html(parseInt(totalAtt));
	$('span#rndDef').html(parseInt(damageDetail.defender[rnd-1]));
	$('span#ttlDef').html(parseInt(totalDef));	
}


if($("body").attr("id") == "militaryAdvisorReportView" ){
	createTextArea();
}
else if( $("body").attr("id") == "diplomacyAdvisor" || $("body").attr("id") == "diplomacyAdvisorOutBox"){
	$("td.msgText div").each(function() {
		$(this).html(bbcode2html($(this).html()));
	});
}
else if($("body").attr("id") == "militaryAdvisorDetailedReportView"){
	var att = $('ul.special')[0];
	var top = 155;
	if(att == null){ att = $('ul.air')[0]; top = 205; }
	var divAtt = document.createElement("div");
	divAtt.innerHTML = language[lang].damage + ": <span style='position: absolute; top: 18px; left: 3px; width: 95%'>" + language[lang].round + 
					": <span id='rndAtt'> </span></span> <span style='position:absolute; left: 3px; top: 33px; width: 95%;'>" + language[lang].total + ": <span id='ttlAtt'></span></span>";
	divAtt.style.cssText = "position: absolute; top: "+top+"px; left: 170px; width: 154px; height: 45px; background: #FFF3DB; opacity: 0.7; padding: 3px;";
	att.parentNode.insertBefore(divAtt,att);
	
	var def = $('ul.special')[0];
	top = 340;
	if(def == null){ def = $('ul.air')[0]; top = 360; }
	var divDef = document.createElement("div");
	divDef.innerHTML = language[lang].damage + ": <span style='position: absolute; top: 18px; left: 3px; width: 95%'>" + language[lang].round + 
					": <span id='rndDef'> </span></span> <span style='position:absolute; left: 3px; top: 33px; width: 95%;'>" + language[lang].total + ": <span id='ttlDef'></span></span>";
	divDef.style.cssText = "position: absolute; top: "+top+"px; left: 170px; width: 154px; height: 45px; background: #FFF3DB; opacity: 0.7; padding: 3px;";
	def.parentNode.insertBefore(divDef,def);	
	
	detailedReportDamage();
}
else if($("body").attr("id") != "militaryAdvisorDetailedReportView"){
	if(GM_getValue("damageDetail", null) != null) GM_setValue("damageDetail", damageDetail.toSource());
}