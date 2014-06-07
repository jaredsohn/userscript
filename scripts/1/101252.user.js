// ==UserScript==
// @name           KapiworldXtra
// @author         Jano BGC (Janodererste)
// @version        1.03
// @description    Ein kleines Tool welches das Kalkulieren von Produktionsmengen auf Zeit übernimmt, die Ansicht im Lager verbessert und einige kleine aber feine Änderungen mit sich bringt.
// @include        http://s*.kapiworld.de/k.php?page=building&mode=produce&x=*&y=*&product=*
// @include        http://s*.kapiworld.de/k.php?page=storage&mode=prod&start=*&send_pid=*&send_q=*
// @include        http://s*.kapiworld.de/k.php?page=buildings
// @include        http://s*.kapiworld.de/k.php?page=storage&mode=prod&start=*
// @include        http://s*.kapiworld.de/k.php?page=storage
// @include        http://s*.kapiworld.de/k.php?page=buildings&display=list
// @include        http://s*.kapiworld.de/k.php?page=buildings
// @exclude        http://s*.kapiworld.de/k.php?page=building&mode=produce&x=*&y=*&product=*&repeat_prod=*
// @require        http://jano1.bplaced.net/update_check.js
// @history        1.03 'Rohstoffe in Zeit' - Rechnung verbessert (weniger Math.round), verbleibende Prod-Zeit im Lager verlinkt, Script leicht gekürzt, Kleine Änderungen, 'Scriptverschönerung'
// @history        1.02 Bugs beseitigt
// @history        1.01 Bugs beseitigt
// @history        1.00 Bugs beseitigt
// @history        0.50 Erstes Release
// ==/UserScript==



//########################################################################//
// GRUNDFUNKTIONEN #######################################################//
//########################################################################//
//Update Check
try {ScriptUpdater.forceCheck(101252, 1.03);} catch(e) { };

// Befindet sich Item X in Array Y?
function in_array(item,arr) {for(p=0;p<arr.length;p++) if (item == arr[p]) return true;return false;}

// Cookie erstellen.
unsafeWindow.createCookie = function (name,value,days) {if (days) {var date = new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires = "; expires="+date.toGMTString();}else var expires = "";document.cookie = name+"="+value+expires+"; path=/";}

// Cookie auslesen.
function readCookie(name) {var nameEQ = name + "=";var ca = document.cookie.split(';');for(var i=0;i < ca.length;i++) {var c = ca[i];while (c.charAt(0)==' ') c = c.substring(1,c.length);if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);}return null;}

// Cookie löschen.
function eraseCookie(name) {createCookie(name,"",-1);}

// document.getElementsByClassName wird ermöglicht.
document.getElementsByClassName = function(class_name) {var docList = this.all || this.getElementsByTagName('*');var matchArray = new Array();var re = new RegExp("(?:^|\\s)"+class_name+"(?:\\s|$)");for (var i = 0; i < docList.length; i++) {if (re.test(docList[i].className) ) {matchArray[matchArray.length] = docList[i];}}return matchArray;}

// Get Variablen aus URL auslesen und abspeichern.
function getUrlVars(){var vars = [], hash;var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');for(var i = 0; i < hashes.length; i++){hash = hashes[i].split('=');vars.push(hash[0]);vars[hash[0]] = hash[1];}return vars;}

//Cookies aktiviert?
if(!navigator.cookieEnabled){alert('Die Cookies sind zurzeit deaktiviert! Bitte aktivieren!');}

//Zahlenformat 0 -> 00
function NumToTwoPlaces(d){var s = ""+d;while (s.length < 2)s = "0"+s;return s;}

//Komma zu Punkt
function commapunkt(s){var n = s.replace(',','.'); return n;}

//Leerzeichen entfernen
function trim(satz){var satz_array = satz.split(" ");var neuer_rsatz = satz_array.join(""); return neuer_rsatz;}

//getId() Verkürzung
function getId(id){return document.getElementById(id);}

//Page?
var test = getUrlVars();var page = test['page']; 

//XMLrequest
function xml_search(url,tag){var xmlhttp=new XMLHttpRequest();xmlhttp.open("GET",url,false);xmlhttp.send();var xmlDoc=xmlhttp.responseXML;var inhalt = xmlDoc.getElementsByTagName(tag);return inhalt;}

//Kleinster Marktpreis (Q0)
function kleinsterPreis(id){var inhalt = xml_search("http://s1.kapiworld.de/k.php?page=market&type=prod&filter=typeid&filterid="+id,'marketproduct');var Preis = inhalt[0].getAttribute('price');return Preis;}




//########################################################################//
// PRODUKTION ############################################################//
//########################################################################//
if(page == 'building'){

unsafeWindow.rechnen = function () {
	var h,a,i;
	h = unsafeWindow.prodspeed;
	a = commapunkt(getId('janoamount_h').value);
	b = commapunkt(getId('janoamount_m').value);
	f = document.getElementsByName('')
	e = parseInt(a*60*60) + parseInt(b*60);
	i = Math.round(e / h);
	getId('prod_amount').value = i;
	var CookieInhalt = "'ProdZeit_h','"+getId('janoamount_h').value+"','14'";
	var CookieInhalt2 = "'ProdZeit_m','"+getId('janoamount_m').value+"','14'";
	getId('janocookie1').setAttribute('onclick','createCookie('+CookieInhalt+');createCookie('+CookieInhalt2+')');
}

getId('prod_amount').parentNode.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Dauer:';

var ZEIT_h = 0; var ZEIT_m = 0;
ZEIT_h = readCookie('ProdZeit_h'); if(ZEIT_h == null){ZEIT_h = 10;}
ZEIT_m = readCookie('ProdZeit_m'); if(ZEIT_m == null){ZEIT_m = 00;}

getId('prod_amount').parentNode.innerHTML += '<input type="text" id="janoamount_h" value="'+NumToTwoPlaces(ZEIT_h)+'" style="width:15px;" title="Stunden"/>';
getId('prod_amount').parentNode.innerHTML += ':';
getId('prod_amount').parentNode.innerHTML += '<input type="text" id="janoamount_m" value="'+NumToTwoPlaces(ZEIT_m)+'" style="width:15px;" title="Minuten"/> (hh:mm)';

getId('janoamount_m').setAttribute("onchange","rechnen();this.value=NumToTwoPlaces(this.value);");
getId('janoamount_m').setAttribute("onkeyup","rechnen();checkProduction(true);");
getId('janoamount_m').setAttribute("onclick","rechnen();checkProduction(true);");
getId('janoamount_h').setAttribute("onchange","rechnen();this.value=NumToTwoPlaces(this.value);");
getId('janoamount_h').setAttribute("onkeyup","rechnen();checkProduction(true);");
getId('janoamount_h').setAttribute("onclick","rechnen();checkProduction(true);");

var CookieInhalt = "'ProdZeit_h','"+getId('janoamount_h').value+"','14'";
var CookieInhalt2 = "'ProdZeit_m','"+getId('janoamount_m').value+"','14'";
getId('prod_amount').parentNode.innerHTML += '<font size="1"><a id="janocookie1" onclick="createCookie('+CookieInhalt+');createCookie('+CookieInhalt2+')">[save]</a></font>';
unsafeWindow.rechnen();
/*PRODUKTION ENDE*/}




//########################################################################//
// BUILDINGS #############################################################//
//########################################################################//
if(page == 'buildings'){


unsafeWindow.rechnen = function () {
	var h,a,i,g;
	h = commapunkt(getId('janoamountges').value);
	a = commapunkt(getId('janomoneya').value);
	i = Math.round(a * h *100)/100;
	
	g = Math.round((i+unsafeWindow.bargeld)*100)/100;
	getId('janomoneyg').setAttribute('title','Umsatz + Barvermögen = '+g+'¢');
	getId('janomoneyg').innerHTML = i+'¢';
}

unsafeWindow.changeProduct = function (id,q) {
	getId('janoamountges').value = XMLGesamtmenge(id,q).menge;
	getId('janomoneya').value = kleinsterPreis(id);
	unsafeWindow.rechnen();
}

window.XMLGesamtmenge = function (id,q) {

	var inhalt = xml_search("http://s1.kapiworld.de/k.php?page=buildings&display=list&filter=production","building");

	var Produktnummer = id;
	var Zaehler = 0; var Gesamtmenge = 0; var Gesamtzeit = new Array(); var Endvariable = new Array();
	var Ende = inhalt.length;
	while (Zaehler != Ende) {
		if(inhalt[Zaehler].getAttribute('action_product') == Produktnummer && inhalt[Zaehler].getAttribute('action') == 'produktion' && inhalt[Zaehler].getAttribute('action_q') == q) {
			Gesamtmenge = parseInt(inhalt[Zaehler].getAttribute('action_menge')) + Gesamtmenge;
			Gesamtzeit[Zaehler] = parseInt(inhalt[Zaehler].getAttribute('action_time'));
		}
		Zaehler++;
	}
	Endzeit = Gesamtzeit.sort(function(a,b){return b - a})[0];
	return Endvariable = {'menge':Gesamtmenge, 'zeit':Endzeit};
}

	var inhalt = xml_search("http://s1.kapiworld.de/k.php?page=buildings&display=list&filter=production","building");
	var ProdukteInProduktion = new Array(); var i = 0; var ProdukteMenge = new Array(); z = 0; var BekannteProdukte = new Array(); 
	var NeueMenge; var AnzahlDerStätten = new Array();

	while(i != inhalt.length){
		if(inhalt[i].getAttribute('action') == 'produktion' && inhalt[i].getAttribute('type') == 'produktion'){
			var Id = 0; Id = inhalt[i].getAttribute('action_product'); if(Id == undefined){Id = 0;}
			var Quali = 0; Quali = inhalt[i].getAttribute('action_q'); if(Quali == undefined){Quali = 0;}
			if(BekannteProdukte[Id+'+'+Quali] == undefined){
					ProdukteInProduktion[z] = {'id':Id, 'quali':Quali, 'menge':window.XMLGesamtmenge(Id,Quali).menge};
					BekannteProdukte[Id+'+'+Quali] = {'set':i, 'q':Quali};
					z++;
			}
		}
		i++;
	}

var number = 0; var options = ''; var primla = ProdukteInProduktion; var optionsgrundstoffe, optionsnonfood, optionsfood, optionsstatus ; var index = 0; var index2 = 0; var index3 = 0; var index4 = 0;
if(primla != undefined){
getId('building_list').innerHTML += '<tr id="janotr"><td colspan="4" id="janotd"><hr>Preis pro Stück:</td></tr>';
getId('janotd').innerHTML += '<input type="text" title="Preis" id="janomoneya" value="'+kleinsterPreis(primla[0].id)+'" style="width:40px;"/>';
getId('janomoneya').setAttribute("onchange","rechnen();");
getId('janomoneya').setAttribute("onkeyup","rechnen();");
getId('janomoneya').setAttribute("onclick","rechnen();");
getId('janotd').innerHTML += '&nbsp;&nbsp;&nbsp;Gesamtmenge:';
getId('janotd').innerHTML += '<input type="text" id="janoamountges" value="'+primla[0].menge+'" style="width:60px;" title="Anzahl gesamt"/>';
getId('janoamountges').setAttribute("onchange","rechnen();");
getId('janoamountges').setAttribute("onkeyup","rechnen();");
getId('janoamountges').setAttribute("onclick","rechnen();");

//Hier werden die Optionen für die Produktauswahl erstellt
	while(number != primla.length){
		if(primla[number].id <= 5){
			optionsgrundstoffe += '<option id="'+primla[number].id+'+'+primla[number].quali+'" value="'+primla[number].id+'" onclick="changeProduct('+primla[number].id+','+primla[number].quali+');rechnen();">'+unsafeWindow.product_name[primla[number].id]+' (Q'+primla[number].quali+')</option>';
			index++;
		}else{
			if(primla[number].id > 5 && primla[number].id < 72){
				optionsnonfood += '<option id="'+primla[number].id+'+'+primla[number].quali+'" value="'+primla[number].id+'" onclick="changeProduct('+primla[number].id+','+primla[number].quali+');rechnen();">'+unsafeWindow.product_name[primla[number].id]+' (Q'+primla[number].quali+')</option>';
				index2++;
			}else{
				if(primla[number].id > 71 && primla[number].id < 110){
					optionsfood += '<option id="'+primla[number].id+'+'+primla[number].quali+'" value="'+primla[number].id+'" onclick="changeProduct('+primla[number].id+','+primla[number].quali+');rechnen();">'+unsafeWindow.product_name[primla[number].id]+' (Q'+primla[number].quali+')</option>';
					index3++;				
				}else{
					optionsstatus += '<option id="'+primla[number].id+'+'+primla[number].quali+'" value="'+primla[number].id+'" onclick="changeProduct('+primla[number].id+','+primla[number].quali+');rechnen();">'+unsafeWindow.product_name[primla[number].id]+' (Q'+primla[number].quali+')</option>';
					index4++;					
				}
			}
		}
		number++;
	}
	if(index >= 1){options = '<optgroup label="Grundstoffe">'+optionsgrundstoffe+'</optgroup>'}
	if(index2 >= 1){options += '<optgroup label="Non-Food">'+optionsnonfood+'</optgroup>'}
	if(index3 >= 1){options += '<optgroup label="Food">'+optionsfood+'</optgroup>'}
	if(index4 >= 1){options += '<optgroup label="Statussymbole">'+optionsstatus+'</optgroup>'}
	if(options == ''){options = 'Lager leer';}
//Hier ist die Erstellung vorbei, sortiert in Grundstoffe und Produkte.

getId('janotd').innerHTML += '<select id="janoselect">'+options+'</select>&nbsp;&nbsp;&nbsp;Gewinn: <span id="janomoneyg" style="width:60px" title="Umsatz"></span>';	
getId(primla[0].id+'+'+primla[0].quali).setAttribute('selected','true');	
unsafeWindow.rechnen();
}else{getId('building_list').innerHTML += '<tr id="janotr"><td colspan="4" id="janotd"><hr>Es wird nichts produziert.</td></tr>';}

/*BUILDINGS ENDE*/}




//########################################################################//
// STORAGE ###############################################################//
//########################################################################//
if(page == 'storage'){

function secondsToTimeString(s)
{
	var ts = s % 60;
	var tm = Math.floor(s/60) % 60;
	var th = Math.floor(s/3600);
	return th+":"+NumToTwoPlaces(tm)+":"+NumToTwoPlaces(ts);
}

window.XMLGesamtmenge = function (id,q) {

	var inhalt = xml_search("http://s1.kapiworld.de/k.php?page=buildings&display=list&filter=production","building");

	var Produktnummer = id;
	var Zaehler = 0; var Gesamtmenge = 0; var Gesamtzeit = new Array(); var Endvariable = new Array(); var Anzahl = 0;
	var Ende = inhalt.length;
	while (Zaehler != Ende) {
		if(inhalt[Zaehler].getAttribute('action_product') == Produktnummer && inhalt[Zaehler].getAttribute('action') == 'produktion' && inhalt[Zaehler].getAttribute('action_q') == q) {
			Gesamtmenge = parseInt(inhalt[Zaehler].getAttribute('action_menge')) + Gesamtmenge;
			Gesamtzeit[Zaehler] = parseInt(inhalt[Zaehler].getAttribute('action_time'));
			Anzahl++;
			Produziert = 0;
		}
		Zaehler++;
	}
	Endzeit = Gesamtzeit.sort(function(a,b){return b - a})[0];
	return Endvariable = {'menge':Gesamtmenge, 'zeit':Endzeit, 'fertig':Produziert, 'anzahl':Anzahl};
}

unsafeWindow.janorechnen = function () {
	var h,a,i,m,mn,e;
	h = commapunkt(getId('janoamountges').value);
	a = commapunkt(getId('janoprice').value);
	i = Math.round(a*h*100)/100;
	
	m = Math.round(i/10*100)/100;
	if(window.bargeld < m){mn = '<font title="Zu wenig Bargeld!" color="red">'+m+'¢</font>';}else{mn = '<font title="Genug Bargeld vorhanden." color="green">'+m+'¢</font>';}
	
	e = Math.round((i-m)*100)/100;
	getId('janogewinn').innerHTML = 'Umsatz: '+i+'¢ - Marktgebühr: '+mn+' = '+e+'¢';
	
	formfill();
}

function formfill() {
	document.getElementsByName('amount')[0].value = commapunkt(getId('janoamountges').value);
	document.getElementsByName('price')[0].value = commapunkt(getId('janoprice').value);
}

unsafeWindow.changeProdukt = function(id,q){
	getId('janoamountges').value = ProdukteMenge[id+'+'+q];
	getId('janoprice').value = kleinsterPreis(id);
	getId('janoq').value = q;
	unsafeWindow.janorechnen();
}
	
unsafeWindow.maximal = function(){
	var minpreis = getId('janoprice').value;
	var maxamount = Math.round(unsafeWindow.bargeld/minpreis);
	getId('janoamountges').value = maxamount;
	if(maxamount > primla[getId('janoselect').selectedIndex].menge){getId('janoamountges').value = primla[getId('janoselect').selectedIndex].menge;}
	
	unsafeWindow.janorechnen();
}

unsafeWindow.changeProductSell = function() {
	var link = 'http://s1.kapiworld.de/k.php?page=storage&mode=prod&start=0&send_pid='+primla[getId('janoselect').selectedIndex].id+'&send_q='+primla[getId('janoselect').selectedIndex].quali;
	getId('janoverkauf').setAttribute('href',link);
}

unsafeWindow.verkaufcookie = function() {
	var a,h;
	h = commapunkt(getId('janoamountges').value);
	a = commapunkt(getId('janoprice').value);
	q = getId('janoq').value;
	unsafeWindow.createCookie("Menge",h,1);
	unsafeWindow.createCookie("Preis",a,1);
	unsafeWindow.createCookie("Quali",q,1);
}

/*FUNKTIONEN ENDE*/
/*BEGINNE MIT CODE*/

	var inhalt = xml_search("http://s1.kapiworld.de/k.php?page=storage","storageproduct");
	var ProdukteImLager = new Array(); var i = 0; var ProdukteMenge = new Array();

	while(i != inhalt.length){
			var Menge = 0; Menge = inhalt[i].getAttribute('amount');
			var Id = 0; Id = inhalt[i].getAttribute('product');
			var Quali = 0; Quali = inhalt[i].getAttribute('q');
			ProdukteImLager[i] = {'menge':Menge, 'id':Id, 'quali':Quali};
			ProdukteMenge[Id+'+'+Quali] = Menge;
			i++;
	}
	
	
	/////////////////////////////////////////////////////////////
	//Hier werden die Optionen für die Produktauswahl erstellt //
	/////////////////////////////////////////////////////////////
	var number = 0; var options = ''; var primla = ProdukteImLager; window.primlaglobal = ProdukteImLager; var optionsgrundstoffe, optionsnonfood, optionsfood, optionsstatus ; var index = 0; var index2 = 0; var index3 = 0; var index4 = 0;
	while(number != primla.length){
		if(primla[number].id <= 5){
			optionsgrundstoffe += '<option value="'+primla[number].id+'" onclick="changeProdukt('+primla[number].id+','+primla[number].quali+');janorechnen();">'+unsafeWindow.product_name[primla[number].id]+' (Q'+primla[number].quali+')</option>';
			index++;
		}else{
			if(primla[number].id > 5 && primla[number].id < 72){
				optionsnonfood += '<option value="'+primla[number].id+'" onclick="changeProdukt('+primla[number].id+','+primla[number].quali+');janorechnen();">'+unsafeWindow.product_name[primla[number].id]+' (Q'+primla[number].quali+')</option>';
				index2++;
			}else{
				if(primla[number].id > 71 && primla[number].id < 110){
					optionsfood += '<option value="'+primla[number].id+'" onclick="changeProdukt('+primla[number].id+','+primla[number].quali+');janorechnen();">'+unsafeWindow.product_name[primla[number].id]+' (Q'+primla[number].quali+')</option>';
					index3++;				
				}else{
					optionsstatus += '<option value="'+primla[number].id+'" onclick="changeProdukt('+primla[number].id+','+primla[number].quali+');janorechnen();">'+unsafeWindow.product_name[primla[number].id]+' (Q'+primla[number].quali+')</option>';
					index4++;					
				}
			}
		}
		number++;
	}
	if(index >= 1){options = '<optgroup label="Grundstoffe">'+optionsgrundstoffe+'</optgroup>'}
	if(index2 >= 1){options += '<optgroup label="Non-Food">'+optionsnonfood+'</optgroup>'}
	if(index3 >= 1){options += '<optgroup label="Food">'+optionsfood+'</optgroup>'}
	if(index4 >= 1){options += '<optgroup label="Statussymbole">'+optionsstatus+'</optgroup>'}
	if(options == ''){options = 'Lager leer';}
	/////////////////////////////////////////////////////////////////////////////////////////////
	//Hier ist die Erstellung vorbei, sortiert in Grundstoffe und Produkte. //
	//////////////////////////////////////////////////////////////////////////
	
	var onclick = 'verkaufcookie()';

	document.getElementsByName('amount')[0].value = readCookie('Menge');
	document.getElementsByName('price')[0].value = readCookie('Preis');
	document.getElementsByName('q')[0].value = readCookie('Quali');
	var url = getUrlVars(); var mode = url['mode'];
	
	
	document.getElementsByClassName('tabcontent3')[0].parentNode.innerHTML += '<hr><br>Menge: <input onchange="janorechnen();" onkeyup="janorechnen();" id="janoamountges" value="'+primla[0].menge+'" type="text" name="amount" size="9">'
	document.getElementsByClassName('tabcontent3')[0].parentNode.innerHTML += '<select onclick="changeProductSell();" id="janoselect">'+options+'</select><a id="janoa" onclick="maximal()" title="Maximale Verkaufsanzahl anhand des Bargeldes berechnen.">[max]</a>'; var i = 1;
	document.getElementsByClassName('tabcontent3')[0].parentNode.innerHTML += '&nbsp;&nbsp;&nbsp;Preis: <input onchange="janorechnen();" onkeyup="janorechnen();" title="Niedrigster, aktueller Markpreis" id="janoprice" value="'+kleinsterPreis(primla[0].id)+'" type="text"  name="price" size="9"><font size="2"> <a id="janoverkauf" onclick="'+onclick+'" href="#">&raquo;Verkaufen</a></font>'
	document.getElementsByClassName('tabcontent3')[0].parentNode.innerHTML += '<input id="janoq" type="hidden" value="'+primla[0].quali+'"><div id="janogewinn"></div>'
	unsafeWindow.janorechnen();
	unsafeWindow.changeProductSell();
	
	getId('send_totalprice').innerHTML = Math.round(readCookie('Preis')*readCookie('Menge')*100)/100+'¢';
	getId('send_marktgebuehr').innerHTML = Math.round(((readCookie('Preis')*readCookie('Menge'))/10)*100)/100;
	
	
	
	
	//////////////////////////////////////////////////
	//In Produktion - Tabelle hinzufügen und füllen.//
	//////////////////////////////////////////////////
	document.getElementsByClassName('tabcontent3')[0].parentNode.innerHTML += '<br><br><br><h1 id="janohead">In Produktion:</h1>';
	var table = document.createElement("table");
	var tbody = document.createElement("tbody");
	tbody.id = "janotableinprod";
		
	document.getElementsByClassName('tabcontent3')[0].parentNode.appendChild(table);
	table.setAttribute('class','tabcontent3');
	table.appendChild(tbody);
	tbody.innerHTML += '<tr class="header"><td align="right">Menge</td><td align="left">Produkt</td><td>Qualität</td><td>Produktionsstätten</td><td align="right">Dauer</td></tr>'
	
		///////////////Ladebalken///////////////////|
		/*/*/getId('janotableinprod').innerHTML += '<tr id="isamladen2"><td>&nbsp;</td></tr><tr class="storagerow2" id="isamladen" style="background-image:url(http://jano1.bplaced.net/ajax-loader.gif);background-repeat:no-repeat;background-position:center;"><td colspan="5"><center>Lädt...</center></td></tr>';	
		////////////////////////////////////////////|

	var inhalt = xml_search("http://s1.kapiworld.de/k.php?page=buildings&display=list&filter=production","building");
	var ProdukteInProduktion = new Array(); var i = 0; z = 0; var BekannteProdukte = new Array(); 
	var NeueMenge; var AnzahlDerStätten = new Array();

	while(i != inhalt.length){
		if(inhalt[i].getAttribute('action') == 'produktion' && inhalt[i].getAttribute('type') == 'produktion'){
			var Id = 0; Id = inhalt[i].getAttribute('action_product'); if(Id == undefined){Id = 0;}
			var Quali = 0; Quali = inhalt[i].getAttribute('action_q'); if(Quali == undefined){Quali = 0;}
			if(BekannteProdukte[Id+'+'+Quali] == undefined){
				var fix = window.XMLGesamtmenge(Id,Quali);
				ProdukteInProduktion[z] = {'id':Id, 'quali':Quali, 'menge':fix.menge, 'zeit':fix.zeit, 'anzahl':fix.anzahl};
				BekannteProdukte[Id+'+'+Quali] = {'set':i, 'q':Quali};
				z++;
			}
		}
		i++;
	}
	
	primla2 = ProdukteInProduktion;
	number = 0; var trid; var trclass, trs, tds, ind, quali; var timer = new Array();
	quali = 0; ind = 1; trs = ''; tds = '';
	var gkosten = 0;
	while(number != primla2.length){
		if(primla2[number].menge > 0 && primla2 != undefined){
			trid = primla2[number].id;
			if(ind == 1){trclass = 'storagerow1';ind=0}else{trclass = 'storagerow2';ind=1;}
			tds = '<td style="padding: 0px 10px 0px 0px;" align="right"><img onmouseout="sek_hide();" onmouseover="sek_producthelp('+primla2[number].id+');" style="margin: 0px 5px; float: left;" alt="" src="static/pic/products/'+primla2[number].id+'_16.gif" height="16" width="16">'+primla2[number].menge+'</td>';
			tds += '<td>'+unsafeWindow.products_name[primla2[number].id]+'</td>';
			tds += '<td align="center"> Q'+quali+'</td>';
			tds += '<td align="center">'+primla2[number].anzahl+'</td>'
			//tds += '<td align="center">'+gkosten+'¢</td>';
			tds += '<td align="right"><div id="janotime_'+primla2[number].id+'_'+primla2[number].quali+'" class="timer"><a href="http://s1.kapiworld.de/k.php?page=buildings&display=list">'+secondsToTimeString(primla2[number].zeit)+'</a></div></td>';
			timer[number] = 'janotime_'+primla2[number].id;
			trs += '<tr id="'+trid+'" class="'+trclass+'">'+tds+'</tr>';
		}else {trs = '<tr class="storagerow1"><td colspan="4"><center>Keine Produktion.</center></td></tr>';}
		number++;
	}
	getId('janotableinprod').innerHTML += trs;
	
	getId('isamladen').style.display = "none";
	getId('isamladen2').style.display = "none";
	///////////////////////////////////////////////////////////////////////////////////////////
	//Tabelle Ende//
	////////////////
	
/*STORAGE ENDE*/}