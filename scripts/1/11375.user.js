// ==UserScript==
// @name           wartosc_floty(0.77mod)
// @namespace      pawkow@pawkow.pl
// @description    Skrypt oblicza wartość floty(0.77mod)
// @include        http://*ogame.onet.pl/game/index.php?page=flotten1*mode=Flotte
// ==/UserScript==

function kropka(wart){
// author: Li-on
	var wynik="";
	wynik+=(wart%1000);
	wart=Math.floor(wart/1000);
	while(wart>=1){
		if(wynik<100) wynik='0'+wynik;
		if(wynik<10) wynik='0'+wynik;
		wynik=(wart%1000)+'.'+wynik;
		wart=Math.floor(wart/1000);
	}
	return wynik;
	
}

	var rekordy = ''; //rekordy tabeli
	var inputs = document.getElementsByTagName('input'); //Wszystkie inputy
	var ship = new Array();
	var met_ship = new Array();
	var krs_ship = new Array();
	var deu_ship = new Array();
	var razem = 0;
	
ship[202] = "Mały transporter";
ship[203] = "Duży transporter";
ship[204] = "Lekki myśliwiec";
ship[205] = "Ciężki myśliwiec";
ship[206] = "Krążownik";
ship[207] = "Okręt wojenny";
ship[208] = "Statek kolonizacyjny";
ship[209] = "Recykler";
ship[210] = "Sonda szpiegowska";
ship[211] = "Bombowiec";
ship[212] = "Satelita słoneczny";
ship[213] = "Niszczyciel";
ship[214] = "Gwiazda Śmierci";
ship[215] = "Pancernik";

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
				// odnajdujemy numer statku
				var ship_num = inputs[i].name.replace("maxship", '');
				// dodajemy rekordy do tabeli
				rekordy += '<tr><th>'+ship[ship_num]+'</th><th>'+inputs[i].value+'</th><th>'+kropka((met_ship[ship_num]*inputs[i].value))+'</th><th>'+kropka((krs_ship[ship_num]*inputs[i].value))+'</th><th>'+kropka((deu_ship[ship_num]*inputs[i].value))+'</th><th>'+kropka((met_ship[ship_num]*inputs[i].value)+(krs_ship[ship_num]*inputs[i].value)+(deu_ship[ship_num]*inputs[i].value))+'</th><th>'+kropka(((met_ship[ship_num]*inputs[i].value)+(krs_ship[ship_num]*inputs[i].value)+(deu_ship[ship_num]*inputs[i].value))/1000)+'</th></tr>';
				razem = razem + ((met_ship[ship_num]*inputs[i].value)+(krs_ship[ship_num]*inputs[i].value)+(deu_ship[ship_num]*inputs[i].value));
			}
		}
	}
	// Nagłówek tabeli
	tabela = '<table><tr><td class="c" colspan="7">Wartość floty (tej na orbicie)</td></tr><tr>	<th>Statek</th><th>Ilość</th><th>Metal</th><th>Krysztal</th><th>Deuter</th><th>Razem</th><th>Punktów</th></tr>';
	zakonczenie = '<tr><td class="c" colspan="7">Razem</td></tr><tr><th colspan="6">surowców:</th><th>'+kropka(razem)+'</th></tr><tr><th colspan="6">punktów:</th><th>'+kropka(razem/1000)+'</th></tr></table>';
	var x = document.getElementById('content');
	x.innerHTML+='<center>'+tabela+rekordy+zakonczenie+'</center>';
