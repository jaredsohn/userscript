// ==UserScript==
// @name        Cennik
// @namespace   http://poligon.luniak.info/monkey/gg_cennik.php
// @description Cennik
// @include     http://www.garbagegarage.pl/*
// @require		http://code.jquery.com/ui/1.10.1/jquery-ui.js
// @version     1
// @grant       none
// ==/UserScript==

var cars = [];
cars[0] = ["Mały samochód", 372, 1, 125, 57, 102, 51, 22, 137, 17];
cars[1] = ["Samochód średniej klasy", 432, 3, 157, 71, 128, 64, 28, 171, 21];
cars[2] = ["Sportowy Coupè", 498, 5, 187, 84, 153, 76, 33, 204, 24];
cars[3] = ["Limuzyna", 552, 7, 219, 99, 178, 89, 39, 239, 29];
cars[4] = ["Miniwan", 612, 9, 251, 114, 205, 102, 45, 274, 34];
cars[5] = ["Pickup", 672, 11, 282, 128, 231, 115, 51, 308, 38];
cars[6] = ["Podrasowane auta", 744, 13, 314, 142, 257, 128, 57, 342, 42];

var ships = [];
ships[0] = ["Motorówka", 750, 15, 314, 157, 251, 141, 62, 377, 47];
ships[1] = ["Łódź luksusowa", 778, 16, 328, 164, 262, 147, 65, 394, 49];
ships[2] = ["Holownik", 795, 17, 342, 171, 274, 154, 68, 411, 51];
ships[3] = ["Jacht", 828, 18, 357, 178, 285, 160, 71, 428, 53];

var trucks = [];
trucks[0] = ["Mały samochód ciężarowy", "N/A", 20, 385, 192, 308, 173, 77, 462, 57];
trucks[1] = ["Ciężarówka z naczepą", "N/A", 21, 400, 200, 320, 180, 80, 480, 60];
trucks[2] = ["Ciężki transporter", "N/A", 22, 414, 207, 331, 186, 82, 497, 62];

var choppers = [];
choppers[0] = ["Helikopter transportowy", "N/A", 24, 442, 221, 354, 199, 88, 531, 66];
choppers[1] = ["Helikopter turystyczny", "N/A", 26, 471, 235, 377, 212, 94, 565, 70];
choppers[2] = ["Helikopter ratunkowy", "N/A", 28, 500, 250, 400, 225, 100, 600, 75];

var planes = [];
planes[0] = ["Chess-Nat", "N/A", 30, 528, 264, 422, 211, 105, 634, 79];
planes[1] = ["Samolot pasażerski", "N/A", 32, 557, 278, 445, 222, 111, 668, 83];
planes[2] = ["Samolot myśliwski", "N/A", 34, 585, 292, 468, 234, 117, 702, 87];

var tanks = [];
tanks[0] = ["Czołg szturmowy", "N/A", 37, 597, 314, 502, 251, 125, 691, 94];
tanks[1] = ["Czołg bojowy", "N/A", 39, 624, 328, 525, 262, 131, 722, 98];
tanks[2] = ["Haubica pancerna", "N/A", 41, 651, 342, 548, 274, 137, 754, 102];
tanks[3] = ["Czarna pantera 1474", "N/A", 43, 678, 357, 571, 285, 142, 785, 107];
tanks[4] = ["Grey Wolf", "N/A", 45, 705, 371, 594, 297, 148, 817, 111];
tanks[5] = ["Tygrys bengalski", "N/A", 47, 732, 385, 617, 308, 154, 848, 115];

var jets = [];
jets[0] = ["Habicht", "N/A", 50, 81, 162, 325, 407, 651, 732, 895];
jets[1] = ["Harpiye", "N/A", 52, 84, 168, 337, 421, 674, 758, 927];
jets[2] = ["Milan", "N/A", 54, 87, 174, 348, 435, 697, 784, 958];
jets[3] = ["Seedadler", "N/A", 56, 90, 180, 360, 450, 720, 810, 990];
jets[4] = ["Karakara", "N/A", 58, 92, 185, 371, 464, 742, 835, 1021];


function choose_vehicle(type,id){
	switch(type)
	{
	case 'car':
		$('#gg_cennik_content').html(
		"Nazwa: "+cars[id][0]+"<br />"+
		"Cena kupna: ok. "+cars[id][1]+" G$<br />"+
		"Od lvl: "+cars[id][2]+"<br />"+
		"Karoseria: "+cars[id][3]+" G$<br />"+
		"Felgi: "+cars[id][4]+" G$<br />"+
		"Płyny: "+cars[id][5]+" G$<br />"+
		"Szyby: "+cars[id][6]+" G$<br />"+
		"Hamulce: "+cars[id][7]+" G$<br />"+
		"Silnik: "+cars[id][8]+" G$<br />"+
		"Akumulator: "+cars[id][9]+" G$");
		break;
		
	case 'ship':
		$('#gg_cennik_content').html(
		"Nazwa: "+ships[id][0]+"<br />"+
		"Cena kupna: ok. "+ships[id][1]+" G$<br />"+
		"Od lvl: "+ships[id][2]+"<br />"+
		"Kadłub statku: "+ships[id][3]+" G$<br />"+
		"Turbina statku: "+ships[id][4]+" G$<br />"+
		"Płyny: "+ships[id][5]+" G$<br />"+
		"Szyby: "+ships[id][6]+" G$<br />"+
		"Kotwica: "+ships[id][7]+" G$<br />"+
		"Silnik: "+ships[id][8]+" G$<br />"+
		"Akumulator: "+ships[id][9]+" G$<br /><br />"+
		"Uwagi: Potrzeba specjalistyczne rampy i inny stuff [do uzupelnienia :p ]"
		);
		break;
	case 'truck':
		$('#gg_cennik_content').html(
		"Nazwa: "+trucks[id][0]+"<br />"+
		"Cena kupna: ok. "+trucks[id][1]+" G$<br />"+
		"Od lvl: "+trucks[id][2]+"<br />"+
		"Karoseria: "+trucks[id][3]+" G$<br />"+
		"Felgi: "+trucks[id][4]+" G$<br />"+
		"Płyny: "+trucks[id][5]+" G$<br />"+
		"Szyby: "+trucks[id][6]+" G$<br />"+
		"Hamulce: "+trucks[id][7]+" G$<br />"+
		"Silnik: "+trucks[id][8]+" G$<br />"+
		"Akumulator: "+trucks[id][9]+" G$<br /><br />"+
		"Uwagi: Potrzeba specjalistyczne rampy i inny stuff [do uzupelnienia :p ]"
		);
		break;
		
	case 'chopper':
		$('#gg_cennik_content').html(
		"Nazwa: "+choppers[id][0]+"<br />"+
		"Cena kupna: ok. "+choppers[id][1]+" G$<br />"+
		"Od lvl: "+choppers[id][2]+"<br />"+
		"Karoseria: "+choppers[id][3]+" G$<br />"+
		"Płozy do lądowania: "+choppers[id][4]+" G$<br />"+
		"Płyny: "+choppers[id][5]+" G$<br />"+
		"Szyby: "+choppers[id][6]+" G$<br />"+
		"Skrzynia biegów: "+choppers[id][7]+" G$<br />"+
		"Zespół napędowy: "+choppers[id][8]+" G$<br />"+
		"Łopaty wirnika: "+choppers[id][9]+" G$<br /><br />"+
		"Uwagi: Potrzeba specjalistyczne rampy i inny stuff [do uzupelnienia :p ]"
		);
		break;
	
	case 'plane':
		$('#gg_cennik_content').html(
		"Nazwa: "+planes[id][0]+"<br />"+
		"Cena kupna: ok. "+planes[id][1]+" G$<br />"+
		"Od lvl: "+planes[id][2]+"<br />"+
		"Kadłub: "+planes[id][3]+" G$<br />"+
		"Podwozie: "+planes[id][4]+" G$<br />"+
		"Płyny: "+planes[id][5]+" G$<br />"+
		"Szyby: "+planes[id][6]+" G$<br />"+
		"Ogon samolotu: "+planes[id][7]+" G$<br />"+
		"Zespół napędowy: "+planes[id][8]+" G$<br />"+
		"Śmigło: "+planes[id][9]+" G$<br /><br />"+
		"Uwagi: Potrzeba specjalistyczne rampy i inny stuff [do uzupelnienia :p ]"
		);
		break;
	
	case 'tank':
		$('#gg_cennik_content').html(
		"Nazwa: "+tanks[id][0]+"<br />"+
		"Cena kupna: ok. "+tanks[id][1]+" G$<br />"+
		"Od lvl: "+tanks[id][2]+"<br />"+
		"Karoseria: "+tanks[id][3]+" G$<br />"+
		"Łańcuchy: "+tanks[id][4]+" G$<br />"+
		"Płyny: "+tanks[id][5]+" G$<br />"+
		"Opony: "+tanks[id][6]+" G$<br />"+
		"Hamulce: "+tanks[id][7]+" G$<br />"+
		"Silnik: "+tanks[id][8]+" G$<br />"+
		"Akumulator: "+tanks[id][9]+" G$<br /><br />"+
		"Uwagi: Potrzeba specjalistyczne rampy i inny stuff [do uzupelnienia :p ]"
		);
		break;
		
	case 'jet':
		$('#gg_cennik_content').html(
		"Nazwa: "+jets[id][0]+"<br />"+
		"Cena kupna: ok. "+jets[id][1]+" G$<br />"+
		"Od lvl: "+jets[id][2]+"<br />"+
		"Skrzydła: "+jets[id][3]+" G$<br />"+
		"Szyby: "+jets[id][4]+" G$<br />"+
		"Podwozie samolotu: "+jets[id][5]+" G$<br />"+
		"Zespół napędowy: "+jets[id][6]+" G$<br />"+
		"Radar: "+jets[id][7]+" G$<br />"+
		"Kadłub/ogon: "+jets[id][8]+" G$<br />"+
		"Leitwerk: "+jets[id][9]+" G$<br /><br />"+
		"Uwagi: Potrzeba specjalistyczne rampy i inny stuff [do uzupelnienia :p ]"
		);
		break;
		
	case 'nothing':
		$('#gg_cennik_content').html("");
		break;
	}
}


(function($){
	$('<style></style>').append(
	"div#gg_cennik_wrapper{"+
	"z-index: 1000;"+
	"border: 1px solid #fff;"+
	"background-color: #fff;"+
	"background-color: rgba(255,255,255,0.7);"+
	"position: absolute;"+
	"top: 30px; left: 20px;"+
	"color: #000;"+
	"width: 200px;"+
	"padding: 4px;"+
	"border-radius: 5px;"+
	"}"+
	"div#gg_cennik_wrapper h2{"+
	"margin: 0 0 8px 0;"+
	"text-align: center;"+
	"}"+
	"div#gg_cennik_wrapper select{"+
	"width: 100%;"+
	"border: 1px solid #000;"+
	"border-radius: 5px 5px 0px 0px;"+
	"background-color: #bbb;"+
	"background-color: rgba(200,200,200,0.9);"+
	"}"+
	"div#gg_cennik_wrapper optgroup{"+
	"background-color: #999;"+
	"background-color: rgb(150,150,150);"+
	"}"+
	"div#gg_cennik_wrapper optgroup option{"+
	"outline: none;"+
	"border: none;"+
	"padding-left: 8px;"+
	"background-color: #bbb;"+
	"background-color: rgba(200,200,200,0.9);"+
	"}").appendTo($('body'));
	
	$('<div></div>').attr("id", "gg_cennik_wrapper").appendTo($('body')).draggable();
	
	
	$('#gg_cennik_wrapper').append(
	"<h2>Cennik</h2>"+
	"<select id=\"gg_cennik_select\"><option value=\"nothing;0\">Wybierz z listy</option></select>"+
	"<div id=\"gg_cennik_content\"></div>");
	
	$('#gg_cennik_select').change(function(){
		var tmp = $("#gg_cennik_select option:selected").val().split(";");
		choose_vehicle(tmp[0], tmp[1]);
	});
	
	var i=0;
	var group = $('<optgroup label="Samochody"></optgroup>').appendTo($('#gg_cennik_select'));
	for (i=0;i<cars.length;i++){
		$('<option value="car;'+i+'">'+cars[i][0]+'</option>').appendTo(group);
	}
	
	group = $('<optgroup label="Statki"></optgroup>').appendTo($('#gg_cennik_select'));
	for (i=0;i<ships.length;i++){
		$('<option value="ship;'+i+'">'+ships[i][0]+'</option>').appendTo(group);
	}
	
	group = $('<optgroup label="Ciężarówki"></optgroup>').appendTo($('#gg_cennik_select'));
	for (i=0;i<trucks.length;i++){
		$('<option value="truck;'+i+'">'+trucks[i][0]+'</option>').appendTo(group);
	}
	
	group = $('<optgroup label="Helikoptery"></optgroup>').appendTo($('#gg_cennik_select'));
	for (i=0;i<choppers.length;i++){
		$('<option value="chopper;'+i+'">'+choppers[i][0]+'</option>').appendTo(group);
	}
	
	group = $('<optgroup label="Samoloty"></optgroup>').appendTo($('#gg_cennik_select'));
	for (i=0;i<planes.length;i++){
		$('<option value="plane;'+i+'">'+planes[i][0]+'</option>').appendTo(group);
	}
	
	group = $('<optgroup label="Czołgi"></optgroup>').appendTo($('#gg_cennik_select'));
	for (i=0;i<tanks.length;i++){
		$('<option value="tank;'+i+'">'+tanks[i][0]+'</option>').appendTo(group);
	}
	
	group = $('<optgroup label="Jety"></optgroup>').appendTo($('#gg_cennik_select'));
	for (i=0;i<jets.length;i++){
		$('<option value="jet;'+i+'">'+jets[i][0]+'</option>').appendTo(group);
	}
	
	/**/
	//choose_vehicle('car',0);
})(jQuery);






