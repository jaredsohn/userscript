// ==UserScript==
// @name 		Konwerter RW
// @namespace 
// @version		0.4.3
// @description	Polski konwerter raportów wojennych by Morpheush and stnkvcmls (poprawka dla mojego forum by Gamebyt)
// @license		GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include		http://s*.ikariam.*/*
// @exclude 
// @exclude 
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require		http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamLanguageDetection.js
// @require		http://ikariamscriptresources.googlecode.com/svn/tags/Latest/AutoUpdater.js
// ==/UserScript==

new IkariamUserScriptUpdater( 61115, "Konwerter RW" );

const lang = getLang();
const version = $("li.version span").text().substr(0, 7);

const crConvVersion = "0.4.3";

var language = { 
		pl: {battleLand: "Bitwa morska", forCity: "pod", battleSea: "Bitwa lądowa", nearCity: "w pobliżu", from: " z miasta ",
			attacker: "Atakujący", attackers: "Atakujący", defender: "Obrońca", defenders: "Obrońcy", winner: "Zwycięzca",
			winners: "Zwycięzcy", loser: "Przegrany", losers: "Przegrani", loot: "Łup", wood: "Materiał budowlany",
			wine: "Wino", marble: "Marmur", glass: "Kryształ", sulphur: "Siarka", damageR: "Własne straty", created: "Skonwertowany za pomocą",
			show: "Pokaż", cities: "Miasta", align: "Wyrównanie", left: "Lewa", center: "Środek", right: "Prawa",
			damage: "Szkody", generals: "Generałowie", resources: "Surowce", preview: "Podgląd", bbcode: "BB Code",
			plaintext: "Zwykły tekst", htmlcode: "HTML", damageT: "Całkowite straty", unknownCity: "", version: "wersja",
         army: "Armia", armyLoot: "Armia + Łup", alliedTroops: "Wojska sprzymierzone", finishedBattle: "Bitwa w toku"},
};

var unitsLang = {   
		pl: {slinger: "Procarz", swordsman: "Wojownik", hoplite: "Hoplita", marksman: "Strzelec Siarkowy", mortar: "Moździerz",
			catapult: "Katapulta", batteringRam: "Taran", steamGiant: "Gigant Parowy", balloonBombardier: "Balonowy Bombardier", cook: "Kucharz",
			doctor: "Medyk", gyrocopter: "Żyrokopter", archer: "Łucznik", wall: "Mur", spearThrower: "Oszczepnicy", barbarianAxeSwinger: "Barbarzyńca",
			ramShip: "Okręt z Taranem", lightvessel: "Okręt z Miotaczem ognia", divingBoat: "Okręt Podwodny", ballistaShip: "Balista",
			catapultShip: "Okręt z Katapultą", mortarShip: "Okręt z Moździerzem", paddleWheelRam: "Okręt Parowy z Taranem"},
};
		    
var unitsCost = {
		slinger: { wood: 20, luxuryGoods: 0},
		swordsman: {wood: 30, luxuryGoods: 30},
		hoplite: {wood: 40, luxuryGoods: 30},
		marksman: {wood: 50, luxuryGoods: 150},
		mortar: {wood: 300, luxuryGoods: 1250},
		catapult: {wood: 260, luxuryGoods: 300},
		batteringRam: {wood: 220, luxuryGoods: 0},
		steamGiant: {wood: 130, luxuryGoods: 180},
		balloonBombardier: {wood: 40, luxuryGoods: 250},
		cook: {wood: 50, luxuryGoods: 150},
		doctor: {wood: 350, luxuryGoods: 450},
		gyrocopter: {wood: 25, luxuryGoods: 100},
		archer: {wood: 30, luxuryGoods: 25},
		wall: {wood: 0, luxuryGoods: 0},
		spearThrower: {wood: 30, luxuryGoods: 0},
		barbarianAxeSwinger: {wood: 0, luxuryGoods: 0},
		ramShip: {wood: 220, luxuryGoods: 50},
		lightvessel: {wood: 80, luxuryGoods: 230},
		divingBoat: {wood: 160, luxuryGoods: 750},
		ballistaShip: {wood: 180, luxuryGoods: 160},
		catapultShip: {wood: 180, luxuryGoods: 140},
		mortarShip: {wood: 220, luxuryGoods: 900},
		paddleWheelRam: {wood: 300, luxuryGoods: 1500},
}

var reportElements = {
	type: null,
	for_near: null,
	place: null,
	time: null,
	attackers: [],
	defenders: [],
	attackersCities: createArray(100,15),
	defendersCities: createArray(100,15),
	units: {codes: [], leftAttacker: [], lostAttacker: [], leftDefender: [], lostDefender: []},
	winners: [],
	losers: [],
	loot: createArray(100,5),
	lootTotal: 0
};

var options = {
	pl: { cities: true, loot: true, losers: false, align: "Center", damage: "GeneralsA" },
      	};

if( GM_getValue("options_pl", null) == null ) GM_setValue("options_pl",options['pl'].toSource());



var textArea;
var colors = {attacker: "#182BE8", defender: "#CF15E4", attackerUnits: "#23AAAB",
				defenderUnits: "#DF24D0", deadUnits: "#FF0000", otherNumbers: "#D0A025",
				text: "#342626", title: "#1D6E22"};

var aIndex = 1;
var dIndex = 1;
var aCityIndex = createArray(100);
var dCityIndex = createArray(100);
var unitIndex = 0;
var isThereLoot = false;

function createArray(length) {
    var a = new Array(length || 0);

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < length; i++) {
            a[i] = createArray.apply(this, args);
        }
    }
    return a;
}

function onMouseOver(id){
	$(id).css("backgroundColor","#FDF7DD");
}

function onMouseOut(id){
	if($("div#sel").html() != $(id).html())
		$(id).css("backgroundColor","#FEDC9C");
}

function onMouseClick(id1, id2, text1, text2){
	if($("div#sel").html() != $(id1).html()){
		$(id1).css("backgroundColor","#FDF7DD");
		for( var i = 0; i < id2.length; i++)
			$(id2[i]).css("backgroundColor","#FEDC9C");
		$(text1).css("display","block");
		$(text2).css("display","none");
		$("div#sel").html($(id1).html());
	}
}

function createTextArea(){

	if( language[lang] == null ){
		alert("Language is not suported. Visit http://userscripts.org/scripts/show/74691 .");
		return 0;
	}
	
	
	GM_addStyle('#top {	overflow: hidden;	height: 140px; width: 628px; }' +
		'#top-naslov{	overflow: hidden;	width: 164px;	padding: 4px 10px;	background-color: #FEDC9C;	font-weight: bold;	color: #542C32;}' +
		'#top-frame{	overflow: hidden;	padding: 4px 10px;	border: solid 2px #FEDC9C;	width: 160px;	height: 70px;}' +
		'#report {	width: 558px;	height: 150px;	background-color: #FDF7DD;	margin-top: 0px;	margin-right: auto;	margin-bottom: 0px;	margin-left: auto;' +
			'border-color: #FEDC9C;	border-style: solid;	border-top-style: none;	border-left-width: 3px;	border-right-width: 3px;	border-bottom-width: 3px;	overflow: hidden;}'	+
		'#CRPreview {	background-color:#FDF7DD;	height: 14px;	width: 80px;	float: left;	padding: 3px;	text-align: center;	border-right-width: 3px;	border-left-width: 3px;' +
			'border-top-style: none;	border-right-style: solid;	border-bottom-style: none;	border-left-style: solid;	border-top-color: #FEDC9C;	border-right-color: #FEDC9C;' +
			'border-bottom-color: #FEDC9C;	border-left-color: #FEDC9C;	cursor: pointer;}' +
		'#BBCode {	background-color:#FEDC9C;	height: 14px;	width: 120px;	float: left;	padding: 3px;	text-align: center;	border-right-width: 3px;	border-top-style: none;' +
			'border-right-style: solid;	border-bottom-style: none;	border-left-style: none;	border-top-color: #FEDC9C;	border-right-color: #FEDC9C;	border-bottom-color: #FEDC9C;' +
			'border-left-color: #FEDC9C;	cursor: pointer;}	' +
		'#plainText {	background-color:#FEDC9C;	height: 14px;	width: 80px;	float: left;	padding: 3px;	text-align: center;	border-right-width: 3px;	border-top-style: none;' +
			'border-right-style: solid;	border-bottom-style: none;	border-left-style: none;	border-top-color: #FEDC9C;	border-right-color: #FEDC9C;	border-bottom-color: #FEDC9C;' +
			'border-left-color: #FEDC9C;	cursor: pointer;}	' +		
		'#htmlCode {	background-color:#FEDC9C;	height: 14px;	width: 80px;	float: left;	padding: 3px;	text-align: center;	border-right-width: 3px;	border-top-style: none;' +
			'border-right-style: solid;	border-bottom-style: none;	border-left-style: none;	border-top-color: #FEDC9C;	border-right-color: #FEDC9C;	border-bottom-color: #FEDC9C;' +
			'border-left-color: #FEDC9C;	cursor: pointer;}	' +							
		'#for-buttons {	width: 558px;	height: 20px;	background-color: #FDF7DD;	margin: 0 auto; 	border: solid 3px #FEDC9C;	border-bottom: 0px;}' +
		'#for-buttons-left{	height: 20px;	width: 10px;	background-color: #FEDC9C;	float: left;}' +
		'#for-buttons-right{	height: 20px;	width: 149px;	background-color: #FEDC9C;	float: left;}' +
		'#text3{	border: none; 	width: 100%; 	height: 100%;	overflow: auto;	background-color:#FDF7DD;}' +
		'#reportDiv p{ font-size: 14px; font-weight: bold; color: #542C32;}');		

	$("p.link").append(
		'<div id="reportDiv">' +
		'<br>' +
			'<div id="top" align="left">' +
				'<div style="float: left; margin: 5px 10px 5px 18px;">' +
					'<div id="top-naslov">' +
						language[lang].show +
					'</div>' +
					'<div id="top-frame">' +
						'<input type="checkbox" id="checkbox1" name="checkbox1" /> ' + language[lang].cities + '<br/>' +
						'<input type="checkbox" id="checkbox2" name="checkbox2" />  ' + language[lang].loot + '<br/>' +
						'<input type="checkbox" id="checkbox3" name="checkbox3" />  ' + "Przegranych" + '<br/>' +
					'</div>' +
				'</div>' +
				'<div style="float: left; margin: 5px 10px 5px 10px;">' +
					'<div id="top-naslov">' +
						language[lang].align +
					'</div>	' +
					'<div id="top-frame">		' +	
						'<input type="radio" id="radio1" name="radio1" value="left"/>  ' + language[lang].left + '<br/>' +
						'<input type="radio" id="radio1" name="radio1" value="center"/>  ' + language[lang].center + '<br/>' +
						'<input type="radio" id="radio1" name="radio1" value="right"/>  ' + language[lang].right +
					'</div>' +
				'</div>' +
				'<div style="float: left; margin: 5px 18px 5px 10px;">' +
					'<div id="top-naslov">' +
						language[lang].damage +
					'</div>	' +
					'<div id="top-frame">			' +
						'<input type="radio" id="radio2" name="radio2" value="GeneralsA"/>  ' + language[lang].generals + '<br/>' +
						'<div style="margin-left: 16px">' + language[lang].resources + '<br/>' +
                     '<input type="radio" id="radio2" name="radio2" value="ResourcesA" style="margin-left: 10px;"/>  ' + language[lang].army + '<br/>' +
                     '<input type="radio" id="radio2" name="radio2" value="ResourcesAL" style="margin-left: 10px;"/>  ' + language[lang].armyLoot + '<br/>' +
					'</div>' +
					'<div id="left">' +
						'<input style="display: none;" class=color value=#FFFF00 type=text>' +
					'</div>	' +				
				'</div>' +		
			'</div>' +
		'</div>' +
		'<div id="for-buttons">' +
			'<div id="for-buttons-left"></div>' +
			'<div id=CRPreview>' + language[lang].preview + '</div>' +
			'<div id=BBCode>' + language[lang].bbcode + '</div>' +
			'<div id=plainText>' + language[lang].plaintext + '</div>' +
			'<div id=htmlCode>' + language[lang].htmlcode + '</div>' +
			'<div id="for-buttons-right"></div>' +
			'<div style="display: none" id=sel>' + language[lang].preview + '</div>' +
		'</div>	' +
		'<div id="report">' +
			'<div id="previewDiv" style="overflow: auto; height: 100%; width: 100%;">' +
				'<div id="text3" name="text3"></div>' +
			'</div>' +
			'<textarea id="stnkvcmlsTextArea" readonly style="border: none; width: 100%; height: 100%; overflow: auto; background-color:#FDF7DD;" name="text2"  id="text2" value=""></textarea>' +
		'</div>' +
		'</div>');

	textArea = document.getElementById('stnkvcmlsTextArea');	
	
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
	
	$("input#checkbox1").click(function(){
							if(options[lang].cities == null) options[lang].cities = $(this).attr("checked");
							else if(options[lang].cities == false) options[lang].cities = true;
							else options[lang].cities = false;
							GM_setValue("options_"+lang,options[lang].toSource());
							convertReport();
							});
	$("input#checkbox2").click(function(){
							if(options[lang].loot == null) options[lang].loot = $(this).attr("checked");
							else if(options[lang].loot == false) options[lang].loot = true;
							else options[lang].loot = false;
							GM_setValue("options_"+lang,options[lang].toSource());
							convertReport();
							});	
	$("input#checkbox3").click(function(){
							if(options[lang].losers == null) options[lang].losers = $(this).attr("checked");
							else if(options[lang].losers == false) options[lang].losers = true;
							else options[lang].losers = false;
							GM_setValue("options_"+lang,options[lang].toSource());
							convertReport();
							});	
	$("input").each(function(){
							if($(this).attr("id") == "radio1"){
								$(this).click(function(){
									if($(this).attr("checked") == true){
										options[lang].align = $(this).attr("value");
										GM_setValue("options_"+lang,options[lang].toSource());
										convertReport();
									}
								});
								options[lang] = eval(GM_getValue("options_"+lang, null));
								if( options[lang].align == $(this).attr("value") ) $(this).attr("checked",true);
							}
						});	
	$("input").each(function(){
							if($(this).attr("id") == "radio2"){
								$(this).click(function(){
									if($(this).attr("checked") == true){
										options[lang].damage = $(this).attr("value");
										GM_setValue("options_"+lang,options[lang].toSource());
										convertReport();
									}
								});
								options[lang] = eval(GM_getValue("options_"+lang, null));
								if( options[lang].damage == $(this).attr("value") ) $(this).attr("checked",true);
							}
						});
                  
	/*$("input").each(function(){
							if($(this).attr("id") == "radio2"){
								$(this).click(function(){
									if($(this).attr("checked") == true){
                              if($(this).attr("value") == "Generals") options[lang].damage2e = true;
                              else options[lang].damage2e = false;
                              $("input#radio3").each(function(){
                                 $(this).attr("disabled",options[lang].damage2e)
                              });
										options[lang].damage = $(this).attr("value");
										GM_setValue("options_"+lang,options[lang].toSource());
										convertReport();
									}
								});
								options[lang] = eval(GM_getValue("options_"+lang, null));
								if( options[lang].damage == $(this).attr("value") ) $(this).attr("checked",true);
							}
						});*/                  
                  
	/*$("input").each(function(){
							if($(this).attr("id") == "radio3"){
                        $(this).attr("disabled",options[lang].damage2e);
								$(this).click(function(){
									if($(this).attr("checked") == true){
										options[lang].damage2c = $(this).attr("value");
										GM_setValue("options_"+lang,options[lang].toSource());
										convertReport();
									}
								});
								options[lang] = eval(GM_getValue("options_"+lang, null));
								if( options[lang].damage2c == $(this).attr("value") ) $(this).attr("checked",true);
							}
						});    */
                  

	options[lang] = eval(GM_getValue("options_"+lang, null));
	$("input#checkbox1").attr("checked",options[lang].cities);
	$("input#checkbox2").attr("checked",options[lang].loot);
	$("input#checkbox1").attr("checked",options[lang].losers);
	
	parseReport();
	convertReport();
}

function parseReport(){

	textArea.value = "";
	var attackersReport = 0;
	var tmp = $("#troopsReport h3.header")[0];
	var tmp2;
	var i, j, k;
	
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
	tmp2 = tmp.childNodes[1].lastChild.nodeValue;
	reportElements.time = "[" + tmp2.substring( 1, tmp2.length - 1) + "]";

	/* attacker */
	tmp = $("div.attacker")
	if( tmp.html() == $("div.textgreen").html()) attackersReport = 1;
	else attackersReport = 0;
	tmp = tmp[0].childNodes[3].childNodes;

	for( i = 0, k = 0; i < tmp.length; i++ ){
		tmp2 = tmp[i].nodeName;
		if( tmp2 == "A" ){ reportElements.attackers[k] = tmp[i].childNodes[0].nodeValue; i++; k++; }
		else if( tmp2 == "#text"){ 
			if( tmp[i].nodeValue != ", " ){
				reportElements.attackers[k] = tmp[i].nodeValue.substring(0,tmp[i].nodeValue.indexOf(language[lang].from));
            if(reportElements.attackers[k].indexOf(", ") != -1) reportElements.attackers[k] = reportElements.attackers[k].substring(2);
				k++; 
			}
		}
		else if( tmp2 == "B"){
			aCityIndex[k-1] = 0;
			for( j = 0; j < tmp[i].childNodes.length; j++){
				tmp2 = tmp[i].childNodes[j].nodeName;
				if( tmp2 == "A" ){
               if (tmp[i].childNodes[j].childNodes[0])
                  reportElements.attackersCities[k-1][j] = tmp[i].childNodes[j].childNodes[0].nodeValue;
               else
                  reportElements.attackersCities[k-1][j] = language[lang].unknownCity;
					aCityIndex[k-1] ++;
				}
				else if( tmp2 == "#text"){
               if (tmp[i].childNodes[j])
                  reportElements.attackersCities[k-1][j] = tmp[i].childNodes[j].nodeValue;
               else
                  reportElements.attackersCities[k-1][j] = language[lang].unknownCity;
					aCityIndex[k-1] ++;
				}
			}
		}
      if(tmp[i].nodeName == "#text" && tmp[i].nodeValue.indexOf(language[lang].from, language[lang].from.length + 4) != -1){
         if(tmp[i].nodeValue.indexOf(language[lang].from) == 0){
            tmp2 = tmp[i].nodeValue;
            reportElements.attackers[k] = tmp2.substring(tmp2.indexOf(language[lang].from) + language[lang].from.length + 2,
                                                         tmp2.indexOf(language[lang].from,language[lang].from.length + 4));
            k++;
         }
      }    
	}
	aIndex = k;
	
	/* defender */
	tmp = $("div.defender")
	tmp = tmp[0].childNodes[3].childNodes;	
	
	for( i = 0, k = 0; i < tmp.length; i++ ){
		tmp2 = tmp[i].nodeName;
		if( tmp2 == "A" ){ reportElements.defenders[k] = tmp[i].childNodes[0].nodeValue; i++; k++; }
		else if( tmp2 == "#text"){ 
			if( tmp[i].nodeValue != ", " ){
				reportElements.defenders[k] = tmp[i].nodeValue.substring(0,tmp[i].nodeValue.indexOf(language[lang].from));
            if(reportElements.defenders[k].indexOf(", ") != -1) reportElements.defenders[k] = reportElements.defenders[k].substring(2);
				k++; 
			}
		}
		else if( tmp2 == "B"){
			dCityIndex[k-1] = 0;
			for( j = 0; j < tmp[i].childNodes.length; j++){
				tmp2 = tmp[i].childNodes[j].nodeName;
				if( tmp2 == "A" ){
               if (tmp[i].childNodes[j].childNodes[0])
                  reportElements.defendersCities[k-1][j] = tmp[i].childNodes[j].childNodes[0].nodeValue;
					else
                  reportElements.defendersCities[k-1][j] = language[lang].unknownCity;
               dCityIndex[k-1] ++;
				}
				else if( tmp2 == "#text"){
               if (tmp[i].childNodes[j])
                  reportElements.defendersCities[k-1][j] = tmp[i].childNodes[j].nodeValue;
					else
                  reportElements.defendersCities[k-1][j] = language[lang].unknownCity;                  
					dCityIndex[k-1] ++;
				}
			}
		}
      if(tmp[i].nodeName == "#text" && tmp[i].nodeValue.indexOf(language[lang].from, language[lang].from.length + 4) != -1){
         if(tmp[i].nodeValue.indexOf(language[lang].from) == 0){
            tmp2 = tmp[i].nodeValue;
            reportElements.defenders[k] = tmp2.substring(tmp2.indexOf(language[lang].from) + language[lang].from.length + 2,
                                                         tmp2.indexOf(language[lang].from,language[lang].from.length + 4));
            k++;
         }
      }    
	}	
	dIndex = k;	
	
	/* units */

	/* codes */
	var unitCodes = $("th.col1");
	
	k = 0;
	for( i = 0; i < unitCodes.length; i++ ){
		var next = unitCodes[i].nextSibling;
		while( next != null ){
			if( next.nodeName != "#text" ){
				if( next.childNodes.length != 0 ){
					reportElements.units.codes[k] = next.childNodes[0].className.substring(next.childNodes[0].className.indexOf("s") + 1);
					k++;
				}
			}
			next = next.nextSibling;
		}
	}
	unitIndex = k;
	
	/* attacker */
	var units1 = $("tr.textgreen");
	var units2 = $("tr.textred");
	var uNum = 0;
	
	textArea.value = "";
	k = 0;
	for( i = 0; i < units1.length; i++ ){
		var tr = units1[i];
		textArea.value += "\n";
		if( tr.childNodes[1].childNodes[0].nodeValue == language[lang].alliedTroops) k = uNum;		
		
		uNum = k;
		for( j = 3; j < tr.childNodes.length; j+= 2){		
			var td = tr.childNodes[j];
			var left = 0;
			var lost = 0;
			if(td.childNodes.length != 0 ){
				if( reportElements.units.leftAttacker[k] == null ) reportElements.units.leftAttacker[k] = 0;
				if( reportElements.units.lostAttacker[k] == null ) reportElements.units.lostAttacker[k] = 0;
				if( reportElements.units.leftDefender[k] == null ) reportElements.units.leftDefender[k] = 0;
				if( reportElements.units.lostDefender[k] == null ) reportElements.units.lostDefender[k] = 0;			
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
					reportElements.units.leftAttacker[k] += left;
					reportElements.units.lostAttacker[k] += lost;
				}
				else{
					reportElements.units.leftDefender[k] += left;
					reportElements.units.lostDefender[k] += lost;
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
				reportElements.units.leftDefender[n+k] = 0;
				reportElements.units.lostDefender[n+k] = 0;
			}
			n = k;
		}
	}	
	
	/* defender */
	for( i = 0; i < units2.length; i++ ){
		var tr = units2[i];
		textArea.value += "\n";
		if( tr.childNodes[1].childNodes[0].nodeValue == language[lang].alliedTroops) k = uNum;
		
		uNum = k;
		for( j = 3; j < tr.childNodes.length; j+= 2){	
			var td = tr.childNodes[j];
			var left = 0;
			var lost = 0;
			if(td.childNodes.length != 0 ){
				if( reportElements.units.leftAttacker[k] == null ) reportElements.units.leftAttacker[k] = 0;
				if( reportElements.units.lostAttacker[k] == null ) reportElements.units.lostAttacker[k] = 0;
				if( reportElements.units.leftDefender[k] == null ) reportElements.units.leftDefender[k] = 0;
				if( reportElements.units.lostDefender[k] == null ) reportElements.units.lostDefender[k] = 0;				
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
					reportElements.units.leftAttacker[k] += left;
					reportElements.units.lostAttacker[k] += lost;
				}
				else{
					reportElements.units.leftDefender[k] += left;
					reportElements.units.lostDefender[k] += lost;
				}
				k++;
			}
		}
	}	
	
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
								
								reportElements.loot[index][res] = $(this).contents()[i].childNodes[1].nodeValue;
								reportElements.lootTotal += parseInt($(this).contents()[i].childNodes[1].nodeValue);
							}
						}
					});	
}

function convertReport(){

	var line = "";
	var i;
	var  font = "[font='Courier New, Courier, mono']";
	
	for(i = 0; i < 50; i++) line += "-";

	/* battle for - city */
	var textBattleFor = "[size=14][color=" + colors.text + "]" + line + "[/color][/size]" + "\n";
	if(options[lang].cities == true) textBattleFor += "[b][size=14][color=" + colors.title + "]" + reportElements.type + " " + reportElements.for_near + " " + reportElements.place + "[/color][/size][/b]";
	else textBattleFor += "[b][size=14][color=" + colors.title + "]" + reportElements.type + " " + reportElements.for_near + " " + reportElements.place + "[/color][/size][/b]";
	textBattleFor += "\n";
	
	/* battle for - time/date */
	textBattleFor += "[b][size=14][color=" + colors.otherNumbers + "]" + reportElements.time + "[/color][/size][/b]";
	textBattleFor += "\n" + "[size=14][color=" + colors.text + "]" + line + "[/color][/size]" + "\n";	

	/* attacker */
	var counter = 0;
	var attacker;
	if(aIndex > 1) attacker = language[lang].attackers;
	else attacker = language[lang].attacker;
	var textAttacker = "[size=14][color=" + colors.title + "]" + attacker + ":[/color]" + "\n";
	for(i = 0; i < aIndex; i++){
		counter += reportElements.attackers[i].length;
		if(counter > 45) { textAttacker += "\n"; counter -= 45; }
		textAttacker += "[color=" + colors.attacker + "]" +  reportElements.attackers[i];
		if(options[lang].cities == true){
			counter += language[lang].from.length;
			if(counter > 45) { textAttacker += "\n"; counter -= 45; }
			textAttacker += language[lang].from;
			for(j = 0; j < aCityIndex[i]; j++){
				counter += reportElements.attackersCities[i][j].length;
				if(counter > 45) { textAttacker += "\n"; counter -= 45; }
				textAttacker += reportElements.attackersCities[i][j];
				if(j != aCityIndex[i]-1) { textAttacker += ", "; counter += 2; }
			}
		}
		if(i < aIndex-1) { textAttacker += "; "; counter += 2; }
		textAttacker += "[/color]";
	}
	textAttacker += "\n[color=" + colors.text + "]" + line + "[/color][/size]" + "\n";	
	
	/* defender */
	counter = 0;
	var defender;
	if(dIndex > 1) defender = language[lang].defenders;
	else defender = language[lang].defender;
	var textDefender = "[size=14][color=" + colors.title + "]" + defender + ":[/color]" + "\n";
	for(i = 0; i < dIndex; i++){
		counter += reportElements.defenders[i].length;
		if(counter > 45) { textDefender += "\n"; counter -= 45; }
		textDefender += "[color=" + colors.defender + "]" +  reportElements.defenders[i];
		if(options[lang].cities == true){
			counter += language[lang].from.length;
			if(counter > 45) { textDefender += "\n"; counter -= 45; }
			textDefender += language[lang].from;
			for(j = 0; j < dCityIndex[i]; j++){
				counter += reportElements.defendersCities[i][j].length;
				if(counter > 45) { textDefender += "\n"; counter -= 45; }
				textDefender += reportElements.defendersCities[i][j];
				if(j != dCityIndex[i]-1) { textDefender += ", "; counter += 2; }
			}
		}
		if(i < dIndex-1) { textDefender += "; "; counter += 2; }
		textDefender += "[/color]";
	}
	textDefender += "\n[color=" + colors.text + "]" + line + "[/color][/size]" + "\n";	
	
	
	/* attacker.........defender */
	var dots = "";
	while(50 - attacker.length - dots.length > defender.length) dots += ".";
	var textUnits = "[size=14][color=" + colors.attacker + "]" + attacker + "[/color]" +
				"[color=#F6EBBD]" + dots +"[/color]" + 
				"[color=" + colors.defender + "]" + defender + "[/color]" + "\n";	
	
	/* units */
	var units = createArray(2,44);
	var textUnitsTmp = createArray(2,44);
	var unitsTmp = "";

	for(i = 0; i < unitIndex; i++){
		units[0][i] = reportElements.units.leftAttacker[i] + " [-" + reportElements.units.lostAttacker[i] + "]";
		textUnitsTmp[0][i] = "[color=" + colors.attackerUnits + "]" + reportElements.units.leftAttacker[i] + "[/color][color=" + colors.deadUnits + "] [-"  + reportElements.units.lostAttacker[i] + "][/color]";
		if(units[0][i] == "0 [-0]"){ units[0][i] = ""; textUnitsTmp[0][i] = "";}
		units[1][i] = reportElements.units.leftDefender[i] + " [-" + reportElements.units.lostDefender[i] + "]";
		textUnitsTmp[1][i] = "[color=" + colors.defenderUnits + "]" + reportElements.units.leftDefender[i] + "[/color][color=" + colors.deadUnits + "] [-"  + reportElements.units.lostDefender[i] + "][/color]";
		if(units[1][i] == "0 [-0]"){ units[1][i] = ""; textUnitsTmp[1][i] = "";}
	}

	for(i = 0; i < unitIndex; i++){
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
      textWinner = "[size=14][color=" + colors.title + "]";
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
if( options[lang].losers == false ){
   if(reportElements.losers[0] != null){
      var loseColor;
      if( findInArray(reportElements.attackers, reportElements.losers[0]) != -1 ) loseColor = colors.attacker;
      else loseColor = colors.defender;
      
      counter = 0;
      textLoser = "[size=14][color=" + colors.title + "]";
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
}
	
	/* loot */
	var textLoot = ""
	if( options[lang].loot == true && isThereLoot == true ){
		textLoot = "[size=14][color=" + colors.title + "]" + language[lang].loot + "[/color]\n";
		var lootTmp = "";
		var lootNumTmp = 0;
		
		for(i = 0; i < aIndex; i++){
			for( j = 0; j < 5; j++) if( reportElements.loot[i][j] != null ) break;
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
			
			tmpInt2 = (unitsCost[tmpInt].wood + unitsCost[tmpInt].luxuryGoods)*reportElements.units.lostAttacker[i];
			damageAttacker += tmpInt2;
		
			tmpInt2 = (unitsCost[tmpInt].wood + unitsCost[tmpInt].luxuryGoods)*reportElements.units.lostDefender[i];
			damageDefender += tmpInt2;
		}
	}
	if(options[lang].damage == "GeneralsA" ){
		damageAttacker /= 50;
		damageDefender /= 50;
	}
   else if(options[lang].damage == "GeneralsAL"){
      damageAttacker /= 50;
      damageDefender = (damageDefender + reportElements.lootTotal) / 50;
   }
   	else if(options[lang].damage == "ResourcesAL") damageDefender += reportElements.lootTotal;
   damageAttacker = parseInt(damageAttacker);
   damageDefender = parseInt(damageDefender);
   var damageTotal = damageAttacker + damageDefender + '';
	damageAttacker += '';
	damageDefender += '';

	/* damage */

	var textDamage = "[size=14][color=" + colors.title + "]" + language[lang].damageR + "[/color]\n";
	var tmp = "";
if(options[lang].damage == "GeneralsA" ){
	if(aIndex > 1) tmp = language[lang].attackers;
	else tmp = language[lang].attacker;
	dots = "";
	while(46 - tmp.length - dots.length > damageAttacker.length) dots += ".";
	textDamage += "[color=" + colors.text + "]" + tmp + "[/color][color=#F6EBBD]" + dots +
				"[/color][color=" + colors.otherNumbers + "]" + damageAttacker + " " + "WSG" + "[/color]\n";
	if(dIndex > 1) tmp = language[lang].defenders;
	else tmp = language[lang].defender;
	dots = "";
	while(46 - tmp.length - dots.length > damageDefender.length) dots += ".";
	textDamage += "[color=" + colors.text + "]" + tmp + "[/color][color=#F6EBBD]" + dots +
				"[/color][color=" + colors.otherNumbers + "]" + damageDefender + " " + "WSG" + "[/color]\n";
	textDamage += "[color=" + colors.title + "]" + language[lang].damageT + "[/color]\n" +
				"[color=" + colors.otherNumbers + "]" + damageTotal + " " + "WSG" + "[/color]\n";
	textDamage += "[color=" + colors.text + "]" + line + "[/color][/size]" + "\n";
}
else if(options[lang].damage != "GeneralsA" ){
if(aIndex > 1) tmp = language[lang].attackers;
	else tmp = language[lang].attacker;
	dots = "";
	while(50 - tmp.length - dots.length > damageAttacker.length) dots += ".";
	textDamage += "[color=" + colors.text + "]" + tmp + "[/color][color=#F6EBBD]" + dots +
				"[/color][color=" + colors.otherNumbers + "]" + damageAttacker + "[/color]\n";
	if(dIndex > 1) tmp = language[lang].defenders;
	else tmp = language[lang].defender;
	dots = "";
	while(50 - tmp.length - dots.length > damageDefender.length) dots += ".";
	textDamage += "[color=" + colors.text + "]" + tmp + "[/color][color=#F6EBBD]" + dots +
				"[/color][color=" + colors.otherNumbers + "]" + damageDefender + "[/color]\n";
	textDamage += "[color=" + colors.title + "]" + language[lang].damageT + "[/color]\n" +
				"[color=" + colors.otherNumbers + "]" + damageTotal + "[/color]\n";
	textDamage += "[color=" + colors.text + "]" + line + "[/color][/size]" + "\n";
}

	var bbCodeText = "";
	var plainTextText = "";
	var htmlCodeText = "";
   
   var finishedBattle = "";
   if( reportElements.winners[0] == null && reportElements.losers[0] == null )
      finishedBattle = language[lang].finishedBattle + "\n" + "\n";
	
	bbCodeText = "[align=" + options[lang].align + "]" + font +
		textBattleFor +
		textAttacker +
		textDefender +
		textUnits +
		textWinner +
	   	textLoser +
		textLoot +
		textDamage +
      finishedBattle +
		"[b][i][color=#999999]" + language[lang].created + " [url=http://userscripts.org/scripts/show/61115]Konwerter RW\n" + 
      language[lang].version + " " + crConvVersion + "[/url]" + "[/i][/b][/color]" +
		"[/font][/align]";
	
	plainTextText = bbCodeText;
	htmlCodeText = bbcode2html(bbCodeText);
	textArea.value = bbCodeText;
	
   var k = 0;
	do{
		i = plainTextText.indexOf("]", k);
		if(i != -1){
			j = plainTextText.indexOf("[", k);
         if((plainTextText[j+1] < '0' || plainTextText[j+1] > '9') && plainTextText[j+1] != '-'){
            plainTextText = plainTextText.substring(0, j) + plainTextText.substring(i+1);
         }
         else k = i + 1;
		}
	}while(i != -1);
	
	var sel = document.getElementById('sel');
	if( sel.innerHTML == language[lang].bbcode ) textArea.value = bbCodeText;
	else if( sel.innerHTML == language[lang].plaintext ) textArea.value = plainTextText;
	else if( sel.innerHTML == language[lang].preview ) document.getElementById("text3").innerHTML = htmlCodeText;
	else if( sel.innerHTML == language[lang].htmlcode ) textArea.value = htmlCodeText;
}

function codeToName(code){
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

function findInArray(array, item){
	if( item != null)
		for( var i = 0; i < array.length; i++){
			if( item.indexOf(array[i]) != -1 ) return i;
		}
	return -1;
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
   

   j = -2;
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


   text = text.replace("[font='","<span style='font-family: ");
   text = text.replace("[/font]","</span>");

   while(text.indexOf("[size=") != -1){
      text = text.replace("[size=","<span style='font-size:");
      text = text.replace("[/size]","</span>");
   }
   
   while(text.indexOf("[color=") != -1){
      text = text.replace("[color=","<span style='color:");
      text = text.replace("[/color]","</span>");
   }


   text = text.replace("[align=","<div style='text-align: ");
   text = text.replace("[/align]","</div>");


   text = text.replace("[url=","<a href=");
   text = text.replace("[/url]","</a>");
   

   return text;
}

if($("body").attr("id") == "militaryAdvisorReportView" ){
	createTextArea();
}
else if( $("body").attr("id") == "diplomacyAdvisor" || $("body").attr("id") == "diplomacyAdvisorOutBox"){
	$("td.msgText div").each(function() {
		$(this).html($(this).html().replace(/&lt;/g,'<').replace(/&gt;/g,'>'));
	});
}