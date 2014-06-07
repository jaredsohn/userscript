// ==UserScript==
// @name           Cout Flotte pour e univers
// @description    Cela vous permet d'etablir le cout et la quantite de points total de votre flotte.
// @include        http://*.e-univers.org/index.php?action=flotte
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
	var tit_ship = new Array();
	var car_ship = new Array();
	var tri_ship = new Array();
	var total = 0;
	
ship[1] = "GT-5";
ship[2] = "GT-50";
ship[3] = "Chasseur";
ship[4] = "Chasseur lance";
ship[5] = "Fregate";
ship[6] = "Destroyer";
ship[7] = "Overlord";
ship[8] = "Forteresse noire";
ship[9] = "Hyperion";
ship[10] = "Collecteur";
ship[11] = "Sonde";
ship[12] = "Satellite solaire";
ship[13] = "Colonisateur";
ship[14] = "Vaisseaux extracteur";


tit_ship[1] = 3000;
tit_ship[2] = 25000;
tit_ship[3] = 3500;
tit_ship[4] = 7000;
tit_ship[5] = 22000;
tit_ship[6] = 45000;
tit_ship[7] = 60000;
tit_ship[8] = 75000;
tit_ship[9] = 10000000;
tit_ship[10] = 12500;
tit_ship[11] = 500;
tit_ship[12] = 0;
tit_ship[13] = 10000;
tit_ship[14] = 50000;

car_ship[1] = 500;
car_ship[2] = 20000;
car_ship[3] = 1000;
car_ship[4] = 5000;
car_ship[5] = 10000;
car_ship[6] = 15000;
car_ship[7] = 25000;
car_ship[8] = 70000;
car_ship[9] = 10000000;
car_ship[10] = 5000;
car_ship[11] = 1000;
car_ship[12] = 2500;
car_ship[13] = 20000;
car_ship[14] = 50000;

tri_ship[1] = 0;
tri_ship[2] = 0;
tri_ship[3] = 0;
tri_ship[4] = 0;
tri_ship[5] = 3500;
tri_ship[6] = 0;
tri_ship[7] = 20000;
tri_ship[8] = 20000;
tri_ship[9] = 2500000;
tri_ship[10] = 1000;
tri_ship[11] = 0;
tri_ship[12] = 500;
tri_ship[13] = 10000;
tri_ship[14] = 25000;
	
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type=='hidden') {
			if (inputs[i].name.indexOf('maxvaisseau') != -1) {
		
				var ship_num = inputs[i].name.replace("maxvaisseau", '');
				
				rekordy += '<tr><th><span style="color:#01F452">'+ship[ship_num]+'</span></th><th>'+inputs[i].value+'</th><th>'+Format((tit_ship[ship_num]*inputs[i].value))+'</th><th>'+Format((car_ship[ship_num]*inputs[i].value))+'</th><th>'+Format((tri_ship[ship_num]*inputs[i].value))+'</th><th><span style="color:yellow">'+Format((tit_ship[ship_num]*inputs[i].value)+(car_ship[ship_num]*inputs[i].value)+(tri_ship[ship_num]*inputs[i].value))+'</span></th><th>'+Format(((tit_ship[ship_num]*inputs[i].value)+(car_ship[ship_num]*inputs[i].value)+(tri_ship[ship_num]*inputs[i].value))/1000)+'</th></tr>';
				total = total + ((tit_ship[ship_num]*inputs[i].value)+(car_ship[ship_num]*inputs[i].value)+(tri_ship[ship_num]*inputs[i].value));
			}
		}
	}
	
	tabela = '<table><th><span style="color:red">Type(s) de vaisseau(x)</span></th><th><span style="color:red">Vaisseau(x) <span style="color:red"></span>disponible</span></th><th><span style="color:red">Titane</span></th><th><span style="color:red">Carbone</span></th><th><span style="color:red">Tritium</span></th><th><span style="color:red">Prix total par type(s) vaisseau(x)</span></th><th><span style="color:red">Points</span></th></tr>';
	zakonczenie = '<tr><td class="c" colspan="7"></td></tr><tr><th colspan="6"><th><span style="color:#10B6E9">'+Format(total/1000)+'</span></th></tr></table>';
	var x = document.getElementById('divpage');
	x.innerHTML+='<center>'+tabela+rekordy+zakonczenie+'</center>';
