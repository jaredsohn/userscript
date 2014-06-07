// ==UserScript==
// @name           Test
// @namespace      Test
// @description    Test
// @include        http://*ogame.*/game/index.php?page=showmessage*
// @include        http://*ogame.*/game/index.php?page=combatreport*

// ==/UserScript==

var params=document.URL.split("=")[1];
if(params == 'showmessage&session'){
	if(document.getElementsByTagName("div")[3].getElementsByTagName("td")[2].innerHTML == 'Spionageaktion'){
		date = document.getElementsByTagName("div")[3].getElementsByTagName("td")[3].innerHTML;
		fremde = document.getElementsByTagName("div")[6].getElementsByTagName("a")[0].innerHTML;
		eigene = document.getElementsByTagName("div")[6].getElementsByTagName("a")[1].innerHTML;
		
		date = date.replace(" ", "_");
		date = date.replace(/:/g, "_");
		
		fremde = fremde.replace(/\[/g, "");
		fremde = fremde.replace(/\]/g, "");
		fremde = fremde.replace(/:/g, "_");
		
		eigene = eigene.replace(/\[/g, "");
		eigene = eigene.replace(/\]/g, "");
		eigene = eigene.replace(/:/g, "_");
		
		var neuesp = document.createElement("p");
		neuesp.innerHTML = '<br>Diese Werte in eine DB übertagen:<br>Spio-Zeit:'+date+'<br>Fremde Koords:'+fremde+"<br>Eigene Koords:"+eigene;
		var Ausgabebereich = document.getElementsByTagName("div")[7];
		Ausgabebereich.appendChild(neuesp);
		
		var neuesa = document.createElement("a");
		neuesa.innerHTML = 'Spio Bericht eintragen';
		neuesa.href = "http://www.ogame.ramonweber.ch/components/spios_einlesen.php?date="+date+"&fremde="+fremde+"&eigene="+eigene;
		neuesa.target = "_blank";
		var Ausgabebereich = document.getElementsByTagName("div")[7];
		Ausgabebereich.appendChild(neuesa);
	}
}

if(params == 'combatreport&session'){

	var angreifer = new Array();	
	var angreifer_schluss = new Array();		
	var verteidiger = new Array();
	var verteidiger_schluss = new Array();


	angreifer_name = document.getElementsByTagName('span')[0].innerHTML.split(" ");
	angreifer_koords = angreifer_name[7].split("=");
	angreifer.push(angreifer_name[1]);
	angreifer_koords = angreifer_koords[4].split("[")[1];
	angreifer_koords = angreifer_koords.substr(0, angreifer_koords.length-5)
	angreifer_koords = angreifer_koords.replace(/:/g, "_");
	angreifer.push(angreifer_koords);
	
	angreifer_techs = document.getElementsByTagName('span')[1].innerHTML.split(" ");
	for (var i = 1; i <= angreifer_techs.length; i++){
		if(i == 1){
			angreifer.push(angreifer_techs[i].substr(0, angreifer_techs[i].length-1));
		}	
		if(i == 3){
			angreifer.push(angreifer_techs[i].substr(0, angreifer_techs[i].length-1));
		}	
		if(i == 5){
			angreifer.push(angreifer_techs[i].substr(0, angreifer_techs[i].length-1));
		}	

	}
	
	angreifer_schiffe =  document.getElementsByTagName('table')[1].getElementsByTagName('tr')[0].getElementsByTagName('th')
	angreifer_schiffe = angreifer_schiffe.length -1;
	for (var i = 1; i <= angreifer_schiffe; i++){
		angreifer.push(document.getElementsByTagName('table')[1].getElementsByTagName('tr')[0].getElementsByTagName('th')[i].innerHTML)
		angreifer.push(document.getElementsByTagName('table')[1].getElementsByTagName('tr')[2].getElementsByTagName('td')[i].innerHTML)
	}
	//alert("Angreifer Beginn: "+angreifer);


	var Ergebnis = document.getElementsByTagName('span')[2].innerHTML.search(/<\/a>/);
	if (Ergebnis != -1){
		document.getElementsByTagName('span')[2].innerHTML
		verteidiger_name = document.getElementsByTagName('span')[2].innerHTML.split(" ");
		verteidiger_koords = verteidiger_name[7].split("=");
		verteidiger.push(verteidiger_name[1]);
		verteidiger_koords = verteidiger_koords[4].split("[")[1];
		verteidiger_koords = verteidiger_koords.substr(0, verteidiger_koords.length-5)
		verteidiger_koords = verteidiger_koords.replace(/:/g, "_");
		verteidiger.push(verteidiger_koords);
		
		
		verteidiger_techs = document.getElementsByTagName('span')[3].innerHTML.split(" ");
		for (var i = 1; i <= verteidiger_techs.length; i++){
			if(i == 1){
				verteidiger.push(verteidiger_techs[i].substr(0, verteidiger_techs[i].length-1));
			}	
			if(i == 3){
				verteidiger.push(verteidiger_techs[i].substr(0, verteidiger_techs[i].length-1));
			}	
			if(i == 5){
				verteidiger.push(verteidiger_techs[i].substr(0, verteidiger_techs[i].length-1));
			}	
	
		}
		
		verteidiger_schiffe =  document.getElementsByTagName('table')[4].getElementsByTagName('tr')[0].getElementsByTagName('th')
		verteigiger_schiffe = verteidiger_schiffe.length -1;
		for (var i = 1; i <= verteigiger_schiffe; i++){
			verteidiger.push(document.getElementsByTagName('table')[4].getElementsByTagName('tr')[0].getElementsByTagName('th')[i].innerHTML)
			verteidiger.push(document.getElementsByTagName('table')[4].getElementsByTagName('tr')[2].getElementsByTagName('td')[i].innerHTML)
		}
		if(!verteidiger){
			verteidiger.push(0);
		}
	}
	
	
	anzahl_tabellen = document.getElementsByTagName('table').length;
	angreifer_schluss_anzahl = anzahl_tabellen - 3;

	angreifer_schiffe =  document.getElementsByTagName('table')[angreifer_schluss_anzahl].getElementsByTagName('tr')[0].getElementsByTagName('th')
	angreifer_schiffe = angreifer_schiffe.length -1;
	for (var i = 1; i <= angreifer_schiffe; i++){
		angreifer_schluss.push(document.getElementsByTagName('table')[1].getElementsByTagName('tr')[0].getElementsByTagName('th')[i].innerHTML)
		angreifer_schluss.push(document.getElementsByTagName('table')[1].getElementsByTagName('tr')[2].getElementsByTagName('td')[i].innerHTML)
	}
	//alert("Angreifer Schluss: "+angreifer_schluss);
	
	
	anzahl_tabellen = document.getElementsByTagName('table').length;
	verteidiger_schluss_anzahl = anzahl_tabellen - 2;
	
	verteidiger_schiffe =  document.getElementsByTagName('table')[verteidiger_schluss_anzahl].getElementsByTagName('tr')[0].getElementsByTagName('th')
	verteigiger_schiffe = verteidiger_schiffe.length -1;
	for (var i = 1; i <= verteigiger_schiffe; i++){
		verteidiger_schluss.push(document.getElementsByTagName('table')[4].getElementsByTagName('tr')[0].getElementsByTagName('th')[i].innerHTML)
		verteidiger_schluss.push(document.getElementsByTagName('table')[4].getElementsByTagName('tr')[2].getElementsByTagName('td')[i].innerHTML)
	}
	//alert("Verteidiger Schluss: "+verteidiger_schluss);
	
	gewinnanzahl = document.getElementsByTagName('p').length -2;
	gewinn = document.getElementsByTagName('p')[gewinnanzahl].innerHTML;


	tfanzahl = document.getElementsByTagName('p').length -1;
	tf = document.getElementsByTagName('p')[tfanzahl].innerHTML;

	
	document.getElementById('master').innerHTML = document.getElementById('master').innerHTML+"<form action='http://ogame.ramonweber.ch/components/kb.php' method='post' enctype='multipart/form-data'><textarea name='user_eingabe' cols='50' rows='10' style='display:hidden;'>"+angreifer+verteidiger+angreifer_schluss+verteidiger_schluss+","+gewinn+","+tf+"</textarea><input type='submit' value='Eintragen'>";
}
