// ==UserScript==

// @name          Oblicz farming

// @namespace     http://www.webmonkey.com

// @description   Skrypt obliczający ilośc wyfarmionego surowca :)

// @include       *.ogame.pl/game/index.php?page=messages

// ==/UserScript==

var mtStr = 'M.transp.';
var dtStr = 'D.transp.';
var lmStr = 'L.myśliw.';
var cmStr = 'C.mysliw.';
var krStr = 'Krazownik';
var owStr = 'O.wojenny.';
var ssStr = 'So.szpieg.';
var boStr = 'Bombowiec';
var niStr = 'Niszcz.';
var pcStr = 'Panc.';
var reStr = 'Rec.';
var koStr = 'Kolon.';
var gsStr = 'Ges.';
var soStr = 'Sonda.';
var defenderRound = "round_defender textCenter";
var attackerRound = "round_attacker textCenter"


var lm = {
	m: 3000,
	k: 1000,
	d: 0
}
var cm = {
	m: 6000,
	k: 4000,
	d: 0
}
var kr = {
	m: 20000,
	k: 7000,
	d: 2000
}
var ow = {
	m: 45000,
	k: 15000,
	d: 0
}
var pc = {
	m: 30000,
	k: 40000,
	d: 15000
}
var bo = {
	m: 50000,
	k: 25000,
	d: 15000
}
var ni = {
	m: 60000,
	k: 50000,
	d: 15000
}
var gs = {
	m: 5000000,
	k: 4000000,
	d: 1000000
}
var mt = {
	m: 2000,
	k: 2000,
	d: 0
}
var dt = {
	m: 6000,
	k: 6000,
	d: 0
}
var ko = {
	m: 10000,
	k: 20000,
	d: 10000
}
var re = {
	m: 10000,
	k: 6000,
	d: 2000
}
var ss = {
	m: 0,
	k: 1000,
	d: 0
}
var so = {
	m: 0,
	k: 2000,
	d: 500
}


setTimeout(function() {
	//console.log("before adding button");
  addButton();
}, 500);
 
function addButton(){
	try{
		var buttonElems = document.getElementById("rechts");
		buttonElems.innerHTML = buttonElems.innerHTML + '<input id="calcData" type="button" class="menubutton " value="Wylicz farming" />'
		addButtonListener();
	}catch(e){
		//console.log(e)	
	}
}
function finalTable(data){
	try{
		var buttonElems = document.getElementById("rechts");
		buttonElems.innerHTML = buttonElems.innerHTML + '<table width="200" border="1"><tr><td>&nbsp;</td><td>suma</td></tr><tr><td>metal</td><td>'+ data.m + '</td></tr><tr><td>kris</td><td>'+ data.k + '</td></tr><tr><td>deu</td><td>'+ data.d + '</td></tr></table>'
		addButtonListener();
	}catch(e){
		//console.log(e)	
	}
}
 
function addButtonListener(){
  var button = document.getElementById("calcData");
  try{
  	button.addEventListener('click',calculateData,true);
  }catch(e){
	//console.log(e)	
  }
}

function calculateData(){

	var messageElements = document.getElementsByClassName("entry trigger");//wyciagniecie elementow strony odpowiedzialnych za przechowywanie zapytania o wiadomosc\
	var sum ={m: 0, k: 0, d: 0};
	for(i = 0; i < messageElements.length; i++){//iterowanie sie po wyszukanych elementach strony
		var message = messageElements[i].getElementsByClassName("subject")[0];
		var m2 = message.getElementsByTagName("a")[0];
		try{
			if(m2.innerHTML.indexOf('Zbiórka szczątków z pola zniszczeń') != -1){
				sum = calcRec(sum, messageElements);
				//console.log("metal + kris sum = " + sum.m + ", " + sum.k);
			}else{
				var m3 = m2.getElementsByTagName("span")[0];
				if(typeof m3 === 'undefined'){
					
				}else{
					if(m3.className.indexOf('combatreport') != -1){
						//console.log("m3 = " + m3.className);
						sum = calcFight(sum, messageElements[i]);
					}	
				}
			}
		}catch(e){
			console.log(e);
		}
	}
	var bramka = true;
	var temmp = 2;
	while(bramka){
		var temp = calcDataInvisible(sum, temmp);
		if(temp == null){
			bramka = false;	
		}else{
			sum = temp;	
			temmp++;
		}
	}
	finalTable(sum);
	//console.log("metal + kris sum = " + sum.m + ", " + sum.k + ", " + sum.d);
}

function calcDataInvisible(sum, num){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", document.URL + '&displayCategory=9&displayPage=' + num + '&ajax=1' , false); //tworzenie zapytania do serwera o wiadomoĹ›Ä‡
	xmlhttp.send();	
	var scriptEnd = '</script>';
	var scriptStart = '<script type';
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var response = xmlhttp.responseText;
		//console.log(response.lastIndexOf(scriptEnd));
		response = response.substring(response.indexOf(scriptEnd) + scriptEnd.length, response.length);
		response = response.substring(0, response.indexOf(scriptStart) );
		//console.log(response);
		var element = document.createElement("div");
		element.innerHTML = response;
		var messageElements = element.getElementsByClassName("entry trigger");
		if(messageElements.length != 0){
			for(i = 0; i < messageElements.length; i++){//iterowanie sie po wyszukanych elementach strony
				var message = messageElements[i].getElementsByClassName("subject")[0];
				var m2 = message.getElementsByTagName("a")[0];
				try{
					if(m2.innerHTML.indexOf('Zbiórka szczątków z pola zniszczeń') != -1){
						sum = calcRec(sum, messageElements);
						//console.log("metal + kris sum = " + sum.m + ", " + sum.k);
					}else{
						var m3 = m2.getElementsByTagName("span")[0];
						if(typeof m3 === 'undefined'){
							
						}else{
							if(m3.className.indexOf('combatreport') != -1){
								//console.log("m3 = " + m3.className);
								sum = calcFight(sum, messageElements[i]);
							}	
						}
					}
				}catch(e){
					console.log(e);
				}
			}
		}else{
			return null;
		}
	}
	return sum;
}

function calcFight(sum, messageElements){
	//console.log("zbiorka z pola zniszczeń");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", messageElements.getElementsByTagName("a")[0].href, false); //tworzenie zapytania do serwera o wiadomoĹ›Ä‡
	xmlhttp.send();	
	var scriptEnd = '<a href="';
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var response = xmlhttp.responseText;
		//console.log(response.lastIndexOf(scriptEnd));
		response = response.substring(response.lastIndexOf(scriptEnd) + scriptEnd.length, response.length);
		response = response.substring(0, response.indexOf('"'));
		var xmlhttpTemp = new XMLHttpRequest();
		xmlhttpTemp.open("GET", response, false); //tworzenie zapytania do serwera o wiadomoĹ›Ä‡
		xmlhttpTemp.send();	
		if (xmlhttpTemp.readyState == 4 && xmlhttpTemp.status == 200) {
			response = xmlhttpTemp.responseText;
			var element = document.createElement("div");
			element.innerHTML = response;
			var defenderRounds = element.getElementsByClassName(defenderRound);
			var attackerRounds = element.getElementsByClassName(attackerRound);
			var firstAttackerTable = attackerRounds[0];
			var lastAttackerTable = attackerRounds[attackerRounds.length-1];
			var firstDefenderTable = defenderRounds[0];
			var lastDefenderTable = defenderRounds[defenderRounds.length-1];
			var sumStart = null;
			try{
				var headerAttacker = firstAttackerTable.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("table")[0].getElementsByTagName("tr");
				sumStart = calcStructSum(headerAttacker)
			}catch(e){
				console.log(e);	
				sumStart = {m:0, k:0, d:0};
			}
			var sumEnd = null;
			var check = true;
			try{
				 headerAttacker = lastAttackerTable.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].getElementsByTagName("table")[0].getElementsByTagName("tr");
				 sumEnd = calcStructSum(headerAttacker);
			}catch(e){
				console.log(e);
				sumEnd	= {m:0, k:0, d:0};
				check = false;
			}
			var divs = element.getElementsByTagName('div');
			//console.log(divs.length)
			var result = "";
			for(tmp = 0; tmp < divs.length; tmp++){
				var div = divs[tmp];
				//console.log("div = " + div)
				try{
					if(div.id == "combat_result"){
						result = div.innerHTML;
					}
				}catch(e){
					console.log(e)
				}
			}
			var startResultMetal = "Przejął ";
			var endResultMetal = " metalu, ";
			var endResultKris = " kryształu i ";
			var endResultDeu = " deuteru.	";
			//console.log("result = " + result);
			//console.log("element to parse = " + result.substring(result.indexOf(startResultMetal) + startResultMetal.length, result.indexOf(endResultMetal)).replace(".", ""));
			if(check){
				if(result.indexOf(startResultMetal) != -1){
					var metal = parseInt(result.substring(result.indexOf(startResultMetal) + startResultMetal.length, result.indexOf(endResultMetal)).replace(".", ""));
					var kris = parseInt(result.substring(result.indexOf(endResultMetal) + endResultMetal.length, result.indexOf(endResultKris)).replace(".", ""));
					var deu = parseInt(result.substring(result.indexOf(endResultKris) + endResultKris.length, result.indexOf(endResultDeu)).replace(".", ""));
					sum.m += metal;
					sum.k += kris;
					sum.d += deu;
				}
			}
			//console.log("metal z result = " + metal);
			//console.log("kris z result = " + kris);
			//console.log("deu z result = " + deu);
			sum.m -= (sumStart.m - sumEnd.m);
			sum.k -= (sumStart.k - sumEnd.k);
			sum.d -= (sumStart.d - sumEnd.d);

		}
		
		
	}
	console.log("metal + kris sum = " + sum.m + ", " + sum.k);
	return sum;
}

function calcStructSum(trs){
	var firstRow = trs[0].getElementsByTagName("th");
	var secondRow = trs[1].getElementsByTagName("td");
	//console.log("trs length = " + trs[1].innerHTML);
	//console.log("trs length = " + trs[0].innerHTML);
	//console.log("second row length = " + secondRow.length);
	var structSummaryAmount = {m:0, k:0, d:0};
	for(j = 1; j < firstRow.length; j++){
		if(firstRow[j].innerHTML == mtStr){
			structSummaryAmount = getStructSummaryAmount(structSummaryAmount, mt, secondRow[j].innerHTML);
		}else if(firstRow[j].innerHTML == dtStr){
			structSummaryAmount = getStructSummaryAmount(structSummaryAmount, dt, secondRow[j].innerHTML);
		}else if(firstRow[j].innerHTML == lmStr){
			structSummaryAmount = getStructSummaryAmount(structSummaryAmount, lm, secondRow[j].innerHTML);
		}else if(firstRow[j].innerHTML == cmStr){
			structSummaryAmount = getStructSummaryAmount(structSummaryAmount, cm, secondRow[j].innerHTML);
		}else if(firstRow[j].innerHTML == krStr){
			structSummaryAmount = getStructSummaryAmount(structSummaryAmount, kr, secondRow[j].innerHTML);
		}else if(firstRow[j].innerHTML == owStr){
			structSummaryAmount = getStructSummaryAmount(structSummaryAmount, ow, secondRow[j].innerHTML);
		}else if(firstRow[j].innerHTML == ssStr){
			structSummaryAmount = getStructSummaryAmount(structSummaryAmount, ss, secondRow[j].innerHTML);
		}else if(firstRow[j].innerHTML == boStr){
			structSummaryAmount = getStructSummaryAmount(structSummaryAmount, bo, secondRow[j].innerHTML);
		}else if(firstRow[j].innerHTML == niStr){
			structSummaryAmount = getStructSummaryAmount(structSummaryAmount, ni, secondRow[j].innerHTML);
		}else if(firstRow[j].innerHTML == pcStr){
			structSummaryAmount = getStructSummaryAmount(structSummaryAmount, pc, secondRow[j].innerHTML);
		}else if(firstRow[j].innerHTML == reStr){
			structSummaryAmount = getStructSummaryAmount(structSummaryAmount, re, secondRow[j].innerHTML);
		}else if(firstRow[j].innerHTML == koStr){
			structSummaryAmount = getStructSummaryAmount(structSummaryAmount, ko, secondRow[j].innerHTML);
		}else if(firstRow[j].innerHTML == gsStr){
			structSummaryAmount = getStructSummaryAmount(structSummaryAmount, gs, secondRow[j].innerHTML);
		}else if(firstRow[j].innerHTML == soStr){
			structSummaryAmount = getStructSummaryAmount(structSummaryAmount, so, secondRow[j].innerHTML);
		}
		
	}
	//console.log("structSummaryAmount.m final = " + structSummaryAmount.m);
	//console.log("structSummaryAmount.k final = " + structSummaryAmount.k);
	//console.log("structSummaryAmount.d final = " + structSummaryAmount.d);
	return structSummaryAmount;
	
}

function getStructSummaryAmount(structSummaryAmount, struct, amount){
	structSummaryAmount.m += struct.m * amount;
	structSummaryAmount.k += struct.k * amount;
	structSummaryAmount.d += struct.d * amount;
	return structSummaryAmount;
}

function calcRec(sum, messageElements){
	//console.log("zbiorka z pola zniszczeń ");
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", messageElements[i].getElementsByTagName("a")[0].href, false); //tworzenie zapytania do serwera o wiadomoĹ›Ä‡
	xmlhttp.send();	
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = xmlhttp.responseText;
			var startMetalIndex = null;
			var endMetalIndex = null;
			var startKrisIndex = null;
			var endKrisIndex = null;
			var startMetalPhrase = "kryształu. Flota odzyskała ";
			var endMetalPhrase = " jednostek metalu";
			var startKrisPhrase = "jednostek metalu i ";
			var endKrisPhrase = " jednostek kryształu.";
			var metalTemp = "";
			var krisTemp = "";
			if(response.indexOf(startMetalPhrase) != -1){
				startMetalIndex = response.indexOf(startMetalPhrase) + startMetalPhrase.length;
				if(response.indexOf(endMetalPhrase) != -1){
					endMetalIndex = response.lastIndexOf(endMetalPhrase);
					if(response.indexOf(startKrisPhrase) != -1){
						startKrisIndex = response.indexOf(startKrisPhrase) + startKrisPhrase.length;
						if(response.indexOf(endKrisPhrase) != -1){
							endKrisIndex = response.indexOf(endKrisPhrase);
							metalTemp = response.substring(startMetalIndex, endMetalIndex).replace(".", "");
							krisTemp = response.substring(startKrisIndex, endKrisIndex).replace(".", "");
							var a = parseInt(metalTemp) + parseInt(krisTemp);
							sum.m += parseInt(metalTemp);
							sum.k += parseInt(krisTemp);
						}
					}
				}
			}
		}
	
	//console.log("metal + kris sum = " + sum.m + ", " + sum.k);
	return sum;
}