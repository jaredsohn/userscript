// ==UserScript==
// @name           OGame Navy Total cost (Greek Edition)
// @description    clear model of Fleet cost
// @include        http://*/game/index.php?page=flotten1*
// ==/UserScript==

function Format(shipValue){

	var result="";
	result+=(shipValue%1000);
	shipValue=Math.floor(shipValue/1000);
	while(shipValue>=1){
		if(result<100) result='0'+result;
		if(result<10) result='0'+result;
		result=(shipValue%1000)+'.'+result;
		shipValue=Math.floor(shipValue/1000);
	}
	
	var temp = result.split(".");

	if(temp.length > 1 && temp[temp.length-1].length < 3 && result.lastIndexOf(".") != -1){
		var index = result.lastIndexOf(".");
		result = result.substring(0, index) + "," + result.substring(index+1);
	}
	
	return result;
	
}

	var rekordy = '';
	var inputs = document.getElementsByTagName('input');
	var ship = new Array();
	var met_ship = new Array();
	var krs_ship = new Array();
	var deu_ship = new Array();
	var total = 0;
	
ship[202] = "Μικρό Μεταγωγικό";
ship[203] = "Μεγάλο Μεταγωγικό";
ship[204] = "Ελαφρύ Μαχητικό";
ship[205] = "Βαρύ Μαχητικό";
ship[206] = "Καταδιωκτικό";
ship[207] = "Καταδρομικό";
ship[208] = "Σκάφος Αποικιοποίησης";
ship[209] = "Ανακυκλωτής";
ship[210] = "Κατασκοπευτικό";
ship[211] = "Βομβαρδιστικό";
ship[212] = "Ηλιακοί Συλλέκτες";
ship[213] = "Destroyer";
ship[214] = "Deathstar";
ship[215] = "Θωρηκτό Αναχαίτισης";

met_ship[202] = 2000;
met_ship[203] = 6000;
met_ship[204] = 3000;
met_ship[205] = 6000;
met_ship[206] = 20000;
met_ship[207] = 45000;
met_ship[208] = 10000;
met_ship[209] = 10000;
met_ship[210] = 0;
met_ship[211] = 50000;
met_ship[212] = 0;
met_ship[213] = 60000;
met_ship[214] = 5000000;
met_ship[215] = 30000;

krs_ship[202] = 2000;
krs_ship[203] = 6000;
krs_ship[204] = 1000;
krs_ship[205] = 4000;
krs_ship[206] = 7000;
krs_ship[207] = 15000;
krs_ship[208] = 20000;
krs_ship[209] = 6000;
krs_ship[210] = 1000;
krs_ship[211] = 25000;
krs_ship[212] = 2000;
krs_ship[213] = 50000;
krs_ship[214] = 4000000;
krs_ship[215] = 40000;

deu_ship[202] = 0;
deu_ship[203] = 0;
deu_ship[204] = 0;
deu_ship[205] = 0;
deu_ship[206] = 2000;
deu_ship[207] = 0;
deu_ship[208] = 10000;
deu_ship[209] = 2000;
deu_ship[210] = 0;
deu_ship[211] = 15000;
deu_ship[212] = 500;
deu_ship[213] = 15000;
deu_ship[214] = 1000000;
deu_ship[215] = 15000;
	
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type=='hidden') {
			if (inputs[i].name.indexOf('maxship') != -1) {
		
				var ship_num = inputs[i].name.replace("maxship", '');
				
				rekordy += '<tr><th>'+ship[ship_num]+'</th><th>'+inputs[i].value+'</th><th>'+Format((met_ship[ship_num]*inputs[i].value))+'</th><th>'+Format((krs_ship[ship_num]*inputs[i].value))+'</th><th>'+Format((deu_ship[ship_num]*inputs[i].value))+'</th><th>'+Format((met_ship[ship_num]*inputs[i].value)+(krs_ship[ship_num]*inputs[i].value)+(deu_ship[ship_num]*inputs[i].value))+'</th><th>'+Format(((met_ship[ship_num]*inputs[i].value)+(krs_ship[ship_num]*inputs[i].value)+(deu_ship[ship_num]*inputs[i].value))/1000)+'</th></tr>';
				total = total + ((met_ship[ship_num]*inputs[i].value)+(krs_ship[ship_num]*inputs[i].value)+(deu_ship[ship_num]*inputs[i].value));
			}
		}
	}
	
	tabela = '<table><th>Όνομα Σκάφους</th><th>Διαθέσιμα</th><th>Μέταλλο</th><th>Κρύσταλλο</th><th>Δευτέριο</th><th>Κόστος</th><th>Πόντοι</th></tr>';
	zakonczenie = '<tr><td class="c" colspan="7">Συνολικά</td></tr><tr><th colspan="6">Συνολικό Κόστος:</th><th>'+Format(total)+'</th></tr><tr><th colspan="6">Πόντοι:</th><th>'+Format(total/1000)+'</th></tr></table>';
	var x = document.getElementById('content');
	x.innerHTML+='<center>'+tabela+rekordy+zakonczenie+'</center>';
