// ==UserScript==
// @name		Pfandrechner_HH_B_M_USA
// @description		Pfandflaschenrechner für Hamburg, Berlin, München und Bumrise
// @version		1.2
// @author		dePutaMadre & VCola
// @include		*muenchen.pennergame.de/stock/bottle/*
// @include		*muenchen.pennergame.de/stock/bottle/sell/*
// @include		*http://www.pennergame.de/stock/bottle/*
// @include		*http://www.pennergame.de/stock/bottle/sell/*
// @include		*berlin.pennergame.de/stock/bottle/*
// @include		*berlin.pennergame.de/stock/bottle/sell/*
// @include		*bumrise.com/stock/bottle/*
// @include		*bumrise.com/stock/bottle/sell/*
// ==/UserScript==


function usun( element ) {
	try {
    	element.parentNode.removeChild( element );
	} catch( error ){
		//
	}
}


if(document.URL.match('http://www.pennergame.de/stock/bottle')) {
pennergame_hamburg()
} else {
if(document.URL.match('clodogame.fr/stock/bottle')) {
clodogame()
} else {
if(document.URL.match('muenchen.pennergame.de/stock/bottle')) {
pennergame_muenchen()
} else {
if(document.URL.match('berlin.pennergame.de/stock/bottle')) {
pennergame_berlin()
} else {
if(document.URL.match('serserionline.com/stock/bottle')) {
serserionline()
} else {
if(document.URL.match('bumrise.com/stock/bottle')) {
bumrise()
}
}
}
}
}
}

function pennergame_hamburg() {
var text1 = document.getElementsByClassName('icon money')[0];
var text11 = text1.innerHTML.split(unescape("%u20AC"))[1];
var cash = text11.split("</a>")[0];

cash = cash.replace(/\./g, "");
cash = cash.replace(/,/, ".");
var cash = cash*100;

var kurs1 = document.getElementById('chkval').value;
var kurs11 = kurs1;
var kurs = kurs11;

data = new Object();
data.flaschen = parseInt(document.getElementById("max").value);
var my_kurs_x = document.getElementById('chkval').value;


var kurss = kurs;
if(document.getElementsByTagName('html')[0].innerHTML.indexOf('Wirtschaftswunder ist aktiv') >0) {
	var kurss = 20;
}
var tabelkaa = document.getElementsByClassName('item_list')[0].getElementsByTagName('td');
var tabelka = tabelkaa[1].getElementsByTagName('span');
var newspan = document.createElement('span');
newspan.innerHTML =
'<b>'+ data.flaschen + '</b> Flaschen <font id="wirkung"> für: <b>'+ kurss +'</b> Cent</font>'
tabelkaa[1].insertBefore(newspan, tabelka[0])
usun(tabelka[1])
var newspan = document.createElement('input');
var newspane = document.createElement('input');
newspan.setAttribute("type", "button")
newspan.setAttribute("onclick", "max_flaschen()")
newspan.setAttribute("value", "Max.")
newspane.setAttribute("type", "submit")
newspane.setAttribute("value", "Verkaufen")
tabelkaa[2].insertBefore(newspan, null)
tabelkaa[2].insertBefore(newspane, null)
usun(tabelkaa[2].getElementsByTagName('input')[3])
usun(tabelkaa[2].getElementsByTagName('input')[3])

data.kurs = ''+kurss+'';





var table = document.getElementsByClassName('listshop')[0].getElementsByTagName('table')[0];
var tbody = table.getElementsByTagName('tbody')[0];
var tr = tbody.getElementsByTagName('tr')[0];
tr.getElementsByTagName("input")[3].addEventListener('click',calc,true);

//var cash = '12300';

data.cash =cash;



text = new Array('Flaschen noch verfügbar','Verkaufswert','Gesamt');
textx = new Array(' Stück',' €',' €');
pic = new Array('http://media.pennergame.de/img/inventar/Pfandflasche.png','http://media.pennergame.de/de/img/cash.png','http://media.pennergame.de/de/img/cash.png','http://media.pennergame.de/de/img/cash.png');

var newtr = new Array();
newtr[0] = tbody.getElementsByTagName('tr')[0];

for (x = 0; x <= 3; x++){
		newtr[x+1]=document.createElement('tr');
		tbody.appendChild(newtr[x+1]);
	}

for(x = 0;x<=2;x++) {
		newtr[x+1].innerHTML = '<td><img src="'+pic[x]+'" /></td><td>'+text[x]+'</td><td><input type="text" size="5" id="field'+(x+1)+'" style="width: 60px;"/>'+textx[x]+'</td>';
}
kurs_s = data.kurs;
newtr[4].innerHTML = '<td><img src="'+pic[3]+'" /></td><td>Aktueller Kurs</td><td><input type="text" size="5" id="field4" value="'+kurs_s+'" style="width: 20px;"/> Cent</td>';

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
		tosella = parseInt(val*100-cash)/kurs;
		tosell = Math.ceil(tosella);
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
			alert('Der Verkaufswert übersteigt 1.000.000 €.');
		}
}
}


function clodogame() {
var text1 = document.getElementsByClassName('icon money')[0];
var text11 = text1.innerHTML.split('tes finances.">')[1];
var cash = text11.split("</a>")[0];

cash = cash.replace(/\./g, "");
cash = cash.replace(/\n/g, "");
cash = cash.replace(/	/g, "");
cash = cash.replace(/ €/, "");
cash = cash.replace(/,/, ".");
var cash = cash*100;

var kurs1 = document.getElementById('chkval').value;
var kurs11 = kurs1;
var kurs = kurs11;

data = new Object();
data.flaschen = parseInt(document.getElementById("max").value);
var my_kurs_x = document.getElementById('chkval').value;


var kurss = kurs;
if(document.getElementsByTagName('html')[0].innerHTML.indexOf('Miracle économique est actif') >0) {
	var kurss = 40;
}
var tabelkaa = document.getElementsByClassName('item_list')[0].getElementsByTagName('td');
var tabelka = tabelkaa[1].getElementsByTagName('span');
var newspan = document.createElement('span');
newspan.innerHTML =
'<b>'+ data.flaschen + '</b> biletów <font id="wirkung"> po: <b>'+ kurss +'</b> centów</font>'
tabelkaa[1].insertBefore(newspan, tabelka[0])
usun(tabelka[1])
var newspan = document.createElement('input');
var newspane = document.createElement('input');
newspan.setAttribute("type", "button")
newspan.setAttribute("onclick", "max_flaschen()")
newspan.setAttribute("value", "Max.")
newspane.setAttribute("type", "submit")
newspane.setAttribute("value", "Sprzedaj")
tabelkaa[2].insertBefore(newspan, null)
tabelkaa[2].insertBefore(newspane, null)
usun(tabelkaa[2].getElementsByTagName('input')[3])
usun(tabelkaa[2].getElementsByTagName('input')[3])
data.kurs = ''+kurss+'';





var table = document.getElementsByClassName('listshop')[0].getElementsByTagName('table')[0];
var tbody = table.getElementsByTagName('tbody')[0];
var tr = tbody.getElementsByTagName('tr')[0];
tr.getElementsByTagName("input")[3].addEventListener('click',calc,true);

//var cash = '12300';
data.cash =cash;



text = new Array('Biletów zostanie','Zysk z biletów','Razem');
textx = new Array(' sztuk',' €',' €');
pic = new Array('http://static.pennergame.de/img/pv4/shop/fr_FR/inventar/Pfandflasche.png','http://media.pennergame.de/de/img/cash.png','http://media.pennergame.de/de/img/cash.png','http://media.pennergame.de/de/img/cash.png');

var newtr = new Array();
newtr[0] = tbody.getElementsByTagName('tr')[0];

for (x = 0; x <= 3; x++){
		newtr[x+1]=document.createElement('tr');
		tbody.appendChild(newtr[x+1]);
	}

for(x = 0;x<=2;x++) {
		newtr[x+1].innerHTML = '<td><img src="'+pic[x]+'" /></td><td>'+text[x]+'</td><td><input type="text" size="5" id="field'+(x+1)+'" style="width: 60px;"/>'+textx[x]+'</td>';
}
kurs_s = data.kurs;
newtr[4].innerHTML = '<td><img src="'+pic[3]+'" /></td><td>Kurs biletów</td><td><input type="text" size="5" id="field4" value="'+kurs_s+'" style="width: 20px;"/> centów</td>';

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
		tosella = parseInt(val*100-cash)/kurs;
		tosell = Math.ceil(tosella);
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
			alert('Za sprzedaz biletów dostaniesz ponad 1.000.000 €.');
		}
}
}



function pennergame_muenchen() {
var text1 = document.getElementsByClassName('icon money')[0];
var text11 = text1.innerHTML.split(unescape("%u20AC"))[1];
var cash = text11.split("</a>")[0];

cash = cash.replace(/\./g, "");
cash = cash.replace(/,/, ".");
var cash = cash*100;

var kurs1 = document.getElementById('chkval').value;
var kurs11 = kurs1;
var kurs = kurs11;

data = new Object();
data.flaschen = parseInt(document.getElementById("max").value);
var my_kurs_x = document.getElementById('chkval').value;


var kurss = kurs;
if(document.getElementsByTagName('html')[0].innerHTML.indexOf('Wirtschaftswunder ist aktiv') >0) {
	var kurss = 20;
}
var tabelkaa = document.getElementsByClassName('item_list')[0].getElementsByTagName('td');
var tabelka = tabelkaa[1].getElementsByTagName('span');
var newspan = document.createElement('span');
newspan.innerHTML =
'<b>'+ data.flaschen + '</b> Flaschen <font id="wirkung"> für: <b>'+ kurss +'</b> Cent</font>'
tabelkaa[1].insertBefore(newspan, tabelka[0])
usun(tabelka[1])
var newspan = document.createElement('input');
var newspane = document.createElement('input');
newspan.setAttribute("type", "button")
newspan.setAttribute("onclick", "max_flaschen()")
newspan.setAttribute("value", "Max.")
newspane.setAttribute("type", "submit")
newspane.setAttribute("value", "Verkaufen")
tabelkaa[2].insertBefore(newspan, null)
tabelkaa[2].insertBefore(newspane, null)
usun(tabelkaa[2].getElementsByTagName('input')[3])
usun(tabelkaa[2].getElementsByTagName('input')[3])

data.kurs = ''+kurss+'';





var table = document.getElementsByClassName('listshop')[0].getElementsByTagName('table')[0];
var tbody = table.getElementsByTagName('tbody')[0];
var tr = tbody.getElementsByTagName('tr')[0];
tr.getElementsByTagName("input")[3].addEventListener('click',calc,true);

//var cash = '12300';

data.cash =cash;



text = new Array('Flaschen noch verfügbar','Verkaufswert','Gesamt');
textx = new Array(' Stück',' €',' €');
pic = new Array('http://media.pennergame.de/img/inventar/Pfandflasche.png','http://media.pennergame.de/de/img/cash.png','http://media.pennergame.de/de/img/cash.png','http://media.pennergame.de/de/img/cash.png');

var newtr = new Array();
newtr[0] = tbody.getElementsByTagName('tr')[0];

for (x = 0; x <= 3; x++){
		newtr[x+1]=document.createElement('tr');
		tbody.appendChild(newtr[x+1]);
	}

for(x = 0;x<=2;x++) {
		newtr[x+1].innerHTML = '<td><img src="'+pic[x]+'" /></td><td>'+text[x]+'</td><td><input type="text" size="5" id="field'+(x+1)+'" style="width: 60px;"/>'+textx[x]+'</td>';
}
kurs_s = data.kurs;
newtr[4].innerHTML = '<td><img src="'+pic[3]+'" /></td><td>Aktueller Kurs</td><td><input type="text" size="5" id="field4" value="'+kurs_s+'" style="width: 20px;"/> Cent</td>';

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
		tosella = parseInt(val*100-cash)/kurs;
		tosell = Math.ceil(tosella);
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
			alert('Der Verkaufswert übersteigt 1.000.000 €.');
		}
}
}


function pennergame_berlin() {
var text1 = document.getElementsByClassName('icon money')[0];
var text11 = text1.innerHTML.split(unescape("%u20AC"))[1];
var cash = text11.split("</a>")[0];

cash = cash.replace(/\./g, "");
cash = cash.replace(/,/, ".");
var cash = cash*100;

var kurs1 = document.getElementById('chkval').value;
var kurs11 = kurs1;
var kurs = kurs11;

data = new Object();
data.flaschen = parseInt(document.getElementById("max").value);
var my_kurs_x = document.getElementById('chkval').value;


var kurss = kurs;
if(document.getElementsByTagName('html')[0].innerHTML.indexOf('Wirtschaftswunder ist aktiv') >0) {
	var kurss = 20;
}
var tabelkaa = document.getElementsByClassName('item_list')[0].getElementsByTagName('td');
var tabelka = tabelkaa[1].getElementsByTagName('span');
var newspan = document.createElement('span');
newspan.innerHTML =
'<b>'+ data.flaschen + '</b> Flaschen <font id="wirkung"> für: <b>'+ kurss +'</b> Cent</font>'
tabelkaa[1].insertBefore(newspan, tabelka[0])
usun(tabelka[1])
var newspan = document.createElement('input');
var newspane = document.createElement('input');
newspan.setAttribute("type", "button")
newspan.setAttribute("onclick", "max_flaschen()")
newspan.setAttribute("value", "Max.")
newspane.setAttribute("type", "submit")
newspane.setAttribute("value", "Verkaufen")
tabelkaa[2].insertBefore(newspan, null)
tabelkaa[2].insertBefore(newspane, null)
usun(tabelkaa[2].getElementsByTagName('input')[3])
usun(tabelkaa[2].getElementsByTagName('input')[3])

data.kurs = ''+kurss+'';





var table = document.getElementsByClassName('listshop')[0].getElementsByTagName('table')[0];
var tbody = table.getElementsByTagName('tbody')[0];
var tr = tbody.getElementsByTagName('tr')[0];
tr.getElementsByTagName("input")[3].addEventListener('click',calc,true);

//var cash = '12300';

data.cash =cash;



text = new Array('Flaschen noch verfügbar','Verkaufswert','Gesamt');
textx = new Array(' Stück',' €',' €');
pic = new Array('http://media.pennergame.de/img/inventar/Pfandflasche.png','http://media.pennergame.de/de/img/cash.png','http://media.pennergame.de/de/img/cash.png','http://media.pennergame.de/de/img/cash.png');

var newtr = new Array();
newtr[0] = tbody.getElementsByTagName('tr')[0];

for (x = 0; x <= 3; x++){
		newtr[x+1]=document.createElement('tr');
		tbody.appendChild(newtr[x+1]);
	}

for(x = 0;x<=2;x++) {
		newtr[x+1].innerHTML = '<td><img src="'+pic[x]+'" /></td><td>'+text[x]+'</td><td><input type="text" size="5" id="field'+(x+1)+'" style="width: 60px;"/>'+textx[x]+'</td>';
}
kurs_s = data.kurs;
newtr[4].innerHTML = '<td><img src="'+pic[3]+'" /></td><td>Aktueller Kurs</td><td><input type="text" size="5" id="field4" value="'+kurs_s+'" style="width: 20px;"/> Cent</td>';

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
		tosella = parseInt(val*100-cash)/kurs;
		tosell = Math.ceil(tosella);
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
			alert('Der Verkaufswert übersteigt 1.000.000 €.');
		}
}
}

function bumrise() {

var text1 = document.getElementsByClassName('icon money')[0];
var text11 = text1.innerHTML.split('>')[1];
var cash = text11.split("</a")[0];

cash = cash.replace(/\,/g, "");
cash = cash.replace(/\n/g, "");
cash = cash.replace(/	/g, "");
cash = cash.replace(/\D/, "");
var cash = cash*100;

var kurs1 = document.getElementById('chkval').value;
var kurs11 = kurs1;
var kurs = kurs11;

data = new Object();
data.flaschen = parseInt(document.getElementById("max").value);
var my_kurs_x = document.getElementById('wirkung').innerHTML.split('0,');
var kurss = kurs;
if(document.getElementsByTagName('html')[0].innerHTML.indexOf('xxxxxxxxxxxxxxxxxxxxxxx') >0) {
	var kurss = 21;
}
var tabelkaa = document.getElementsByClassName('item_list')[0].getElementsByTagName('td');
var tabelka = tabelkaa[1].getElementsByTagName('span');
var newspan = document.createElement('span');
newspan.innerHTML =
'<b>'+ data.flaschen + '</b> Flaschen <font id="wirkung"> für: <b>'+ kurss +'</b> Cent</font>'
tabelkaa[1].insertBefore(newspan, tabelka[0])
usun(tabelka[1])
var newspan = document.createElement('input');
var newspane = document.createElement('input');
newspan.setAttribute("type", "button")
newspan.setAttribute("onclick", "max_flaschen()")
newspan.setAttribute("value", "Max.")
newspane.setAttribute("type", "submit")
newspane.setAttribute("value", "Verkaufen")
tabelkaa[2].insertBefore(newspan, null)
tabelkaa[2].insertBefore(newspane, null)
usun(tabelkaa[2].getElementsByTagName('input')[3])
usun(tabelkaa[2].getElementsByTagName('input')[3])
data.kurs = ''+kurss+'';

var table = document.getElementsByClassName('listshop')[0].getElementsByTagName('table')[0];
var tbody = table.getElementsByTagName('tbody')[0];
var tr = tbody.getElementsByTagName('tr')[0];
tr.getElementsByTagName("input")[3].addEventListener('click',calc,true);

//var cash = '12300';

data.cash =cash;


text = new Array('Flaschen noch verfügbar','Verkaufswert','Gesamt');
textx = new Array(' Stück',' $',' $');
pic = new Array('http://static.pennergame.de/img/pv4/shop/us_EN/inventar/Pfandflasche.png','http://media.pennergame.de/de/img/cash.png','http://media.pennergame.de/de/img/cash.png','http://media.pennergame.de/de/img/cash.png');
var newtr = new Array();
newtr[0] = tbody.getElementsByTagName('tr')[0];

for (x = 0; x <= 3; x++){
		newtr[x+1]=document.createElement('tr');
		tbody.appendChild(newtr[x+1]);
	}

for(x = 0;x<=2;x++) {
		newtr[x+1].innerHTML = '<td><img src="'+pic[x]+'" /></td><td>'+text[x]+'</td><td><input type="text" size="5" id="field'+(x+1)+'" style="width: 60px;"/>'+textx[x]+'</td>';
}
kurs_s = data.kurs;
newtr[4].innerHTML = '<td><img src="'+pic[3]+'" /></td><td>Aktueller Kurs</td><td><input type="text" size="5" id="field4" value="'+kurs_s+'" style="width: 20px;"/> Cent</td>';

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
		tosella = parseInt(val*100-cash)/kurs;
		tosell = Math.ceil(tosella);
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
			alert('Der Verkauf der Flaschen überschreitet 1.000.000 $');
		}
}
}