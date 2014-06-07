// ==UserScript==
// @name           Cuenta Chatarra mendigogame V4
// @namespace     cuenta chatarra
// @include        *mendigogame.es/stock/bottle/*
// @include        *mendigogame.es/stock/bottle/sell/*
// ==/UserScript==

         GM_xmlhttpRequest({
         method: 'GET',
                url: 'http://www.mendigogame.es/stock/bottle/',
                onload: function(responseDetails) {
                var content = responseDetails.responseText;

var text1 = document.getElementsByClassName('icon money')[0];
var text11 = text1.innerHTML.split(unescape("%u20AC"))[1];
var cash = text11.split("</a>")[0];

cash = cash.replace(/\./g, "");
cash = cash.replace(/,/, ".");
var cash = cash*100;

var kurs1 = document.getElementsByTagName('table')[0];
var kurs11 = kurs1.innerHTML.split('0,')[1];
//var kurs = kurs11.split('<')[0];
var kurs = kurs11.substr(0,2);

data = new Object();
data.flaschen = parseInt(document.getElementById("max").value);
var my_kurs_x = document.getElementById('wirkung').innerHTML.split('0,');


var suche = content.search("Wirtschaftswunder ");
if (suche != -1) {
var kurss ='21';
}else{
var kurss = kurs;
}

data.kurs = ''+kurss+'';





var table = document.getElementsByClassName('listshop')[0].getElementsByTagName('table')[0];
var tbody = table.getElementsByTagName('tbody')[0];
var tr = tbody.getElementsByTagName('tr')[0];
tr.getElementsByTagName("input")[3].addEventListener('click',calc,true);

//var cash = '12300';

data.cash =cash;


text = new Array('Botellas necesarias','Dinero Ganado','Total');
pic = new Array('http://media.pennergame.de/img/inventar/Pfandflasche.png','http://media.pennergame.de/de/img/cash.png','http://media.pennergame.de/de/img/cash.png','http://media.pennergame.de/de/img/cash.png');
var newtr = new Array();
newtr[0] = tbody.getElementsByTagName('tr')[0];

for (x = 0; x <= 3; x++){
		newtr[x+1]=document.createElement('tr');
		tbody.appendChild(newtr[x+1]);
	}

for(x = 0;x<=2;x++) {
		newtr[x+1].innerHTML = '<td><img src="'+pic[x]+'" /></td><td>'+text[x]+'</td><td><input type="text" size="5" id="field'+(x+1)+'" /></td>';
}
kurs_s = data.kurs;
newtr[4].innerHTML = '<td><img src="'+pic[3]+'" /></td><td>Precio Chatarra</td><td><input type="text" size="5" id="field4" value="'+kurs_s+'"/></td>';

field = new Array();
for (x=0;x<=4;x++) {
	input = document.getElementById("field"+x);
	if (!input) {
		input = document.getElementById("menge_verkauf");
	}		
	if (x==4) {
		input.addEventListener('keyup',cashsave,true);
				
	} else {
	input.addEventListener('keyup',calc,true);
	
	}		
	field[x] = input;
}


function cashsave() {
		for(x=0;x<=3;x++) {
		len = field[x].value.length;
		if (len>8) {
			field[x].size = len;
		}
	}
	if(this.value) {
		val = this.value;
		maxf = data.flaschen;
		cash = data.cash;
		data.kurs = this.value;
		field[0].value = maxf;
		field[1].value = 0;
		field[2].value = parseInt(maxf*val)/100;
		field[3].value = (parseInt(cash)+parseInt(maxf*val))/100;
		
	} else {
		data.kurs = kurs;
	}
}


function calc() {
	val = this.value;
	kurs = data.kurs;
	maxf = data.flaschen;
	cash = data.cash;
	field[4].value = kurs;
	for(x=0;x<=3;x++) {
		len = field[x].value.length;
		if (len>8) {
			field[x].size = len;
		}
	}
	if(this.id=="menge_verkauf") {
		field[1].value = parseInt(maxf)-parseInt(val);
		field[2].value = parseInt(val*kurs)/100;
		field[3].value = (parseInt(cash)+parseInt(val*kurs))/100;
		
		}
	else if(this.id=="field1"){
		field[0].value = parseInt(maxf-val);
		field[2].value = parseInt((maxf-val)*kurs)/100;
		field[3].value = (parseInt(cash)+parseInt((maxf-val)*kurs))/100;
		}
	else if(this.id=="field2"){
		tosell = Math.ceil(val/kurs*100);
		field[0].value = tosell;
		field[1].value = parseInt(maxf-tosell);
		field[3].value = (parseInt(cash)+parseInt(tosell)*kurs)/100;
		}
	else if(this.id=="field3"){
		tosell = parseInt(val*100-cash)/kurs;
		field[0].value = tosell;
		field[1].value = parseInt(maxf-tosell);
		field[2].value = tosell*kurs/100;
		}
	else{
		val = maxf;
		field[1].value = parseInt(maxf)-parseInt(val);
		field[2].value = parseInt(val*kurs)/100;
		field[3].value = (parseInt(cash)+parseInt(val*kurs))/100;
		}
		if(field[3].value>1000000) {
			alert('Estás a punto de llegar a más de 1.000.000 EUR a través de la venta de botellas.');
		}
}
}});