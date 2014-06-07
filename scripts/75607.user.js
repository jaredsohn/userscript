// ==UserScript==
// @author cleverguide
// @name         DS Market-Balancer
// @description  V0.07 Beta | Marktangebote und Rohstoffversand automatisch anhand der verfuegbaren Rohstoffmengen ausbalancieren. Deutsche Version von Lord Therena
// @namespace none
// @include		http://*.*staemme.*/game.php?*screen=market*
// @include   http://*.*staemme.*/game.php?*screen=overview_villages*
// ==/UserScript==

/*
	(c) 2010 cleverguide

	Distributed under the terms of the GNU General Public License
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

//--Deutsche Version von Lord Therena--

// http://de49.die-staemme.de/game.php?screen=market&mode=send&village=p87489
// @include		http://*.*staemme.*/game.php?*screen=market&mode=send*
// @include		http://*.*staemme.*/game.php?*screen=market&mode=own_offer*
// @include		http://*.*staemme.*/game.php?*screen=market&try=confirm_send*
// Freie Tabellensortierung? http://www.kryogenix.org/code/browser/sorttable/sorttable.js

(function(){
	var server = location.host.split('.')[0];
	var res = server.match(/^([a-z]+)(\d+)/);
	if (!res) return
	var lang = res[1];
	var welt = parseInt(res[2]);

	// UV
	res = location.href.match(/[?&]t=(\d+)/)
	var uv = res?res[1]:''
	var uvP=uv?('&t='+uv):''
	var store = server+"_"+uv

	var ressisEN = ["wood", "stone", "iron"]

	// Freie HÃ¤ndler aus Ansicht Kombiniert auswerten
	if (overview_page_free_offerer()) return

	// >>> VARS ####################
	var ratio_default=1.25, max_time_default=5
	var storage_limit = 1
	var storage_max = 150000, storage_max_fill_ratio = 0.8
	var storage_min = 60000, storage_min_fill_ratio = 0.9
	var storage_leave = 1
	var balance_allow = {'wood':1, 'stone':1, 'iron':1 }
	var storage_leave_wood = 150000, storage_leave_stone = 150000, storage_leave_iron = 150000
	var offers_at_once=160
  var sell_type, buy_type, ratio_sell, offers, max_offers=0
	var html_init_done=0, offerers_table
	// table sort array
	var tsort= [], tsort_row = 6

	var village_ressis = new Array()
	// Balancer-Vars
	var ressisDE = ["holz", "lehm", "eisen"]
	var ressType = ["wood", "stone", "iron"]
	var sBase   = { "wood" : 0, "stone" : 0, "iron" : 0 }
	var sTarget = { "wood" : 0, "stone" : 0, "iron" : 0, "storage" : 0 }
	var sFilled = { "wood" : 0, "stone" : 0, "iron" : 0 }
	var sMarket = { "wood" : 0, "stone" : 0, "iron" : 0 }

	var submit_count = 0, submit_type = ""

	var speeds =  {
		// bis Welt 52
		de: { game:  [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1.6,1,1,1,1,1,1,1,1,1.6,1,1,1,1.6,1,1,1,1,1,1,1,1,1,1.6,1,1.6,1,1.6,1,1.6,1,1,1,1,1,1
		// ab 53 ????
		,1,1,1,1,1,1
		],
    units: [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0.625,1,1,1,1,1,1,1,1,0.625,1,1,1,1,0.625,1,1,1,1,1,1,1,1,1,0.625,1,0.625,1,0.625,1,0.625,1,1,1,1,1,1
		// ab 53 ????
		,1,1,1,1,1,1
		] },
		// bis Welt 9
		ch: { game:  [0,1,1,1,1.6,1,1,1,1.6,1.6],
		      units: [0,1,1,1,1,1,1,1,0.625,0.625]  }
	};
	if (welt > speeds[lang].game.length) alert("Welt: "+welt +": Keine Gamespeeds bekannt!")
	var gamespeed = speeds[lang].game[welt];
	var unitspeed = gamespeed*speeds[lang].units[welt]
	var marketspeed = unitspeed*6
	// <<< VARS ############################


	// village id
	var res = location.href.match(/[&?]village=[pn]?(\d+)/)
	if (!res) return
	var village = res[1]

	// village coords
  var container = document.getElementsByTagName("hr")[0];
	var villageX, villageY
	if( container ){
		container = container.nextSibling.nextSibling;
		var menu = container.getElementsByClassName("menu nowrap")[0];
		var tds = menu.getElementsByTagName("td");
    for( var i = 0; i < tds.length; i++ ){
			var res = tds[i].innerHTML.match( /[(>](\d{1,3})\|(\d{1,3})[<)]/ );
			if( res )	{
				villageX = parseInt(res[1]);
				villageY = parseInt(res[2]);
				break
			}
		}
	}
	var villageCoord = villageX+'_'+villageY

	// Modus: An Dorf versenden | Angebot erstellen
	var market_mode='send'
	var res = location.href.match(/[&?]mode=([a-z_]+)/)
	if (res) market_mode = res[1]

	// Letzte(n) Aktion(en) speichern 
	var historyEntries = 10
	var historyStore = 200

	// Rohstoffversandseite / speichere Versand
	if (confirm_send()) return

	var form = document.getElementsByTagName("form")[0];
	if (!form) return
	var inputs = form.getElementsByTagName("input");

	// Button: Versenden an zuletzt verwendetes Dorf
	if (market_mode == 'send') {
		var a = document.createElement("a");
		a.setAttribute("href","#");
		a.appendChild(document.createTextNode("Letztes"));
		a.addEventListener("click",function() {insert_coords();},true);
		inputs[4].parentNode.parentNode.getElementsByTagName("td")[1].appendChild(a);
	}
	
	// Aktuelle Rohstoffmengen und SpeichergrÃ¶ÃŸe ermitteln
  var wood=new Number(document.getElementById('wood').innerHTML);
  var stone=new Number(document.getElementById('stone').innerHTML);
  var iron=new Number(document.getElementById('iron').innerHTML);
	var storage = new Number(document.getElementById('storage').innerHTML);

	// GewÃ¼nschte verbleibende FÃ¼llgrÃ¶ÃŸe der Rohstoffe
	var storageBalance = setStorageBalance(storage)

  var forms=document.getElementsByTagName('form');
  var table
	for(i=0;i<forms.length;i++) {
		if(forms[i].action.indexOf('action=modify_offers')!=-1){
			table=forms[i].getElementsByTagName('table')[0];
			break
		}
	}
	if (table) {
	  for(i=1;i<table.rows.length-1;i++) {
	    child=table.rows[i].cells[1].childNodes;
	    res=child[0].title;
	    var num=0;
	    for(j=0;j<child.length;j++) {
		    value=child[j].nodeValue;
		    if(value != null) num+=value;
	    }
	    num=num.substring(0,num.length-1);
	    num*=new Number(table.rows[i].cells[2].innerHTML);
	    if(res=='Holz')wood+=num;
	    if(res=='Lehm')stone+=num;
	    if(res=='Eisen')iron+=num;
	  }
	}


	// Zahl an freien HÃ¤ndlern
  var tables=document.getElementsByTagName('table');
  for(i=0;i<tables.length;i++) {
		var res = tables[i].rows[0].cells[0].innerHTML.match(/HÃ¤ndler: (\d+)\/(\d+)/)
    if(res) {
			max_offers = res[1]
			var coord = villageX+"_"+villageY
			GM_setValue(store+"_marketInfo"+coord, ""+res[1]+'/'+res[2])
    }
  }
	// Submit-Button: Speicher Event einfÃ¼gen
  inputs=document.getElementsByTagName('input');
  for(i=0;i<inputs.length;i++){
    if(inputs[i].type=='submit'){
      inputs[i].focus();
			inputs[i].addEventListener("click",function() {save_data();},false);
			break
		}
  }

	// Von welchem Rohstoff haben wir zuviel
  if(wood>stone&&wood>iron)sell_type="wood";
  if(stone>wood&&stone>iron)sell_type="stone";
  if(iron>wood&&iron>stone)sell_type="iron";

  if(wood<stone&&wood<iron)buy_type="wood";
  if(stone<wood&&stone<iron)buy_type="stone";
  if(iron<wood&&iron<stone)buy_type="iron";

	if (market_mode == 'own_offer') {
	  document.getElementById('res_sell_wood').checked = sell_type=='wood'?1:0;
	  document.getElementById('res_sell_stone').checked= sell_type=='stone'?1:0;
	  document.getElementById('res_sell_iron').checked = sell_type=='iron'?1:0;
	
	  document.getElementById('res_buy_wood').checked = buy_type=='wood'?1:0;
	  document.getElementById('res_buy_stone').checked= buy_type=='stone'?1:0;
	  document.getElementById('res_buy_iron').checked = buy_type=='iron'?1:0;
	
		document.getElementById('res_sell_wood').addEventListener("click",function() {update_offer();},false);
		document.getElementById('res_sell_stone').addEventListener("click",function() {update_offer();},false);
		document.getElementById('res_sell_iron').addEventListener("click",function() {update_offer();},false);
	
		document.getElementById('res_buy_wood').addEventListener("click",function() {update_offer();},false);
		document.getElementById('res_buy_stone').addEventListener("click",function() {update_offer();},false);
		document.getElementById('res_buy_iron').addEventListener("click",function() {update_offer();},false);

		// Rohstoffe aktuell auf dem Markt einbeziehen
		var table = document.getElementsByClassName("vis")[3];
		if (table) {
			for (var r=0;r<table.rows.length; r++) {
				if (table.rows[r].cells.length < 2) continue
				var res = table.rows[r].cells[1].innerHTML.match(/title="(Holz|Lehm|Eisen)/)
				if (!res) continue
				var buy_type = res[1]
				txt = table.rows[r].cells[1].innerHTML.replace(/(<[^>]*>|\.)/g,"")
				var buy_count = txt.match("([0-9\.]+)")[1]
				if (buy_type = "Holz") wood+=parseInt(buy_count)
				if (buy_type = "Lehm") stone+=parseInt(buy_count)
				if (buy_type = "Eisen") iron+=parseInt(buy_count)
			}
		}

	  wood=Math.round(wood/1000);
	  stone=Math.round(stone/1000);
	  iron=Math.round(iron/1000);
	}

	if (update_offer() == 2) suggest()

	// Koordinaten des letzten Anbebots setzten
//	insert_coords()
	// Rohstoffe eintragen
//	update_offer()


function update_offer_type(){
	if (market_mode == 'own_offer') {
		sell_type = document.getElementById('res_sell_wood').checked
			? 'wood'
			: document.getElementById('res_sell_stone').checked
				? 'stone'
				: 'iron'
		buy_type = document.getElementById('res_buy_wood').checked
			? 'wood'
			: document.getElementById('res_buy_stone').checked
				? 'stone'
				: 'iron'
	}

	offers=0
  if(sell_type=="wood"){
    if(buy_type=="stone"){offers=(wood-stone)/2;}
    if(buy_type=="iron"){offers=(wood-iron)/2;}
  }
  if(sell_type=="stone"){
    if(buy_type=="wood"){offers=(stone-wood)/2;}
    if(buy_type=="iron"){offers=(stone-iron)/2;}
  }
  if(sell_type=="iron"){
    if(buy_type=="wood"){offers=(iron-wood)/2;}
    if(buy_type=="stone"){offers=(iron-stone)/2}
  }
  offers=Math.min(Math.ceil(offers),max_offers);
	if (offers<0) offers=0
}

function update_offer(){
	if (market_mode == 'own_offer') {
		update_offer_type()
		var sell, buy
		ratio_sell = GM_getValue(store + "_ratio_sell_"+sell_type+"_"+buy_type, ratio_default);

		if (ratio_sell>1){
			sell=parseInt(1000/ratio_sell)
			buy=1000
		} else {
			buy=parseInt(1000*ratio_sell)
			sell=1000
		}
		var max_time = GM_getValue(store + "_max_time_"+sell_type+"_"+buy_type,
			GM_getValue(store + "_max_time", max_time_default)
		);
	  document.getElementsByName('max_time')[0].value=max_time;
	  document.getElementsByName('multi')[0].value=(offers>0?offers:"");
	  document.getElementsByName('sell')[0].value=sell;
	  document.getElementsByName('buy')[0].value=buy;
		return 1
	} else {
		if (html_init_done==0){
			html_init_done=1
			html_init()
		}
		return 2
	}
}

function clock(unitTime){
	var h=parseInt(parseInt(unitTime)/60)
	var m=parseInt(unitTime)-(h*60)
	if (h<10)h='0'+h
	if (m<10)m='0'+m
	return h+':'+m
}

//prio: sell | buy
function balanceRessi(prio, balanceTyp, targetStorage){
	var t=offers_at_once<max_offers ? offers_at_once : max_offers
	// Speicher nicht ganz auffÃ¼llen
	if (!targetStorage) {
		targetStorage = parseInt(sTarget["storage"])
		if (targetStorage > storage_max) targetStorage = storage_max
		if (targetStorage < storage_min) {
			targetStorage = parseInt(targetStorage*storage_min_fill_ratio)
		} else {
			targetStorage = parseInt(targetStorage*storage_max_fill_ratio)
		}
	}
	storage_leave = GM_getValue(store+"storage_leave", storage_leave)
	if (storage_leave == 1) {
		sBase['wood'] -= storage_leave_wood
		sBase['stone'] -= storage_leave_stone
		sBase['iron'] -= storage_leave_iron
	}
	for (var r=0; r<ressisEN.length; r++) {
		var ress=ressisEN[r]
		if (sTarget[ress] < 0) sTarget[ress] = 0
		if (sBase[ress] < 0) sBase[ress] = 0
/*
		if (sFilled[ress]) {
			for(var i=0;i < Math.abs(sFilled[ress]); i++){
				if (t>0) {
					--t
					if(sFilled[ress] > 0){
						if (t>0 && sBase[ress] >= 1000 && (sTarget[ress]+1000) < targetStorage){
							sMarket[ress] += 1000
							sTarget[ress] += 1000
							sBase[ress] -= 1000
						}
					}
				}
			}
		}
*/
	}

	// Gleiche Ressis untereinander aus (Maximum eines Rohstoffs ist storage Limit)
	if (balanceTyp != "ALL") {
		var max = 0
		for (var r=0; r<ressisEN.length; r++) {
			var ress=ressisEN[r]
			if (sTarget[ress] > max) max = sTarget[ress]
		}
		// Max eines Rohstoffs soll das Max aller Rohstoffe sein
		if (balanceTyp == "RESS") {
			targetStorage = max
		} else {
			// Falls ein Rohstoff ausgeglichen werden soll, dieser aber auch der maximale Rohstoff ist
			// so fÃ¼lle diesen Rohstoff bis zur tatsÃ¤chlichen Speichergrenze auf.
			// Ansonsten fÃ¼lle einen Rohstoff immer bis zu der Menge auf der maximal bei einem Rohstoff vorhanden
			if (ressType.length == 1 && sTarget[ ressType[0] ] != max && targetStorage > max){
				targetStorage = max
			} else if (ressType.length == 1 && sTarget[ ressType[0] ] >= max) {
			// Sonderfall: Ressi wurde gewÃ¤hlt und soll auf maximale FÃ¼llhÃ¶he des Speichers aufgefÃ¼llt werden
				targetStorage = parseInt(sTarget["storage"])/1.1
			}
		}
	}

var tmp=""
	for (var i=0; i<t; i++) {
		// Min finden
		var min=0, minType=""
		for (var r=0; r<ressType.length; r++) {
			var ress=ressType[r]
			if (!balance_allow[ress]) continue
			// Rohstoff ist vorhanden und Target braucht noch diesen Rohstoff
			if (sBase[ress] >= 1000 && (sTarget[ress]+1000) < targetStorage){
				if (prio == "buy"){
					if (min==0 || sTarget[ress] < min) {
						min = sTarget[ress]
						minType = ress
					}
				} else {
					if (min==0 || sBase[ress] > min) {
						min = sBase[ress]
						minType = ress
					}
				}
			}
//tmp += ress+"/"+sTarget[ress]+"/"+targetStorage+"/"+minType+"/"+min+"\n"
		}
		if (min==0) break
		sMarket[minType] += 1000
		sTarget[minType] += 1000
		sBase[minType] -= 1000
	}
//alert(tmp)

	for (var r=0; r<ressisEN.length; r++) {
		var ress=ressisEN[r]
		if (sFilled[ress]) {
			for(var i=0;i < Math.abs(sFilled[ress]); i++){
				if(sFilled[ress] > 0){
					if (sBase[ress] >= 1000 && (sTarget[ress]+1000) < targetStorage){
						sMarket[ress] += 1000
						sTarget[ress] += 1000
						sBase[ress] -= 1000
					}
				} else {
					if (sMarket[ress]>=1000){
						sMarket[ress] -= 1000
						sTarget[ress] -= 1000
						sBase[ress] += 1000
					}
				}
			}
		}
	}

	// RohstoffeintrÃ¤ge alle durch berechnete ersetzen
	ressType = ["wood", "stone", "iron"]
	var sendAmount=0
	for (var r=0; r<ressType.length; r++) {
		ress=ressType[r]
		sendAmount += sMarket[ress]
	  document.getElementsByName(ress)[0].value = sMarket[ress]
	}
	return sendAmount
}

function balanceVillageRessi(typ, nr){
	nr = nr.match(/(\d+)$/)[1]
	// typ: WOOD, STONE, IRON, ALL, DEST, RESS
	// ALL: gleiche alle Rohstoffe aus (Dest soll ausgeglichen sein)
	// DEST: fÃ¼ge Rohstoffe von Basis ein (Basis soll ausgeglichen sein)
	// RESS: gleiche die vorhandenen Rohstoffe auf das gleiche Level aus (Max eines Rohstoffs ist Max aller anderen)
	// (coordX, coordY, wood, stone, iron, speicher)
	var r = village_ressis[nr]
	if (typ == "WOOD") ressType = ["wood"]
	else if (typ == "STONE") ressType = ["stone"]
	else if (typ == "IRON") ressType = ["iron"]
	else ressType = ["wood", "stone", "iron"]
	
	sBase   = { "wood" : parseInt(wood), "stone" : parseInt(stone), "iron" : parseInt(iron) }
	sTarget = { "wood" : parseInt(r[2]), "stone" : parseInt(r[3]), "iron" : parseInt(r[4]), "storage" : parseInt(r[5]) }
	sMarket = { "wood" : 0, "stone" : 0, "iron" : 0 }

/*
	// future ressis
	var is_full = 0;
	var fTarget = { "wood" : sTarget["wood"], "stone" : sTarget["stone"], "iron" : sTarget["iron"], "storage" : sTarget["storage"] }
	for (var i=0; i<ressisEN.length;i++){
		var cell
		var info
		if (ressi[i] >= fTarget["storage"]) ++is_full;
		if (ressi[i]!=curRessi[i]) {
			var color = ressi[i] >= targetStorage ? color='red' : 'blue'
			info = '<span style="color:'+color+';" title="Bestand: '+curRessi[i]+' / Lieferungen '+(ressi[i]-curRessi[i])+'">'+parseInt(ressi[i]/1000)+'</span>'
		} else {
			var color = ressi[i] >= targetStorage ? color='grey' : 'black'
			info = '<span style="color:'+color+';" title="Bestand: '+curRessi[i]+' / Lieferungen '+(ressi[i]-curRessi[i])+'">'+parseInt(ressi[i]/1000)+'</span>'
		}
	}
*/

	document.getElementById('balanceVillageInfo').innerHTML =
		  '<img src="graphic/holz.png?1" title="Holz" alt="">'+sTarget["wood"]
		+ ' <img src="graphic/lehm.png?1" title="Holz" alt="">'+sTarget["stone"]
		+ ' <img src="graphic/eisen.png?1" title="Holz" alt="">'+sTarget["iron"]
		+ ' <img src="graphic/res.png?1" title="Speicher" alt="">'+sTarget["storage"]


	if (typ == "DEST"){
//, parseInt(sTarget["storage"])
		balanceRessi("sell", "ALL")
	} else {
		balanceRessi("buy", typ)
	}

	return
}

function setStorageBalance(storage){
	if (storage > 100000) return 50000
	else return parseInt(storage/2)
	if (storage>300000) return parseInt(storage/4)
	else if (storage>200000) return parseInt(storage/3)
	else if (storage>100000) return parseInt(storage/1.8)
	else if (storage>50000) return parseInt(storage/1.4)
	else if (storage>30000) return parseInt(storage/1.3)
	else return parseInt(storage/1.2)
}

function save_data() {
	if (market_mode == 'own_offer') {
	  GM_setValue(store + "_max_time", document.getElementsByName('max_time')[0].value);
		// user set ratio
		update_offer_type()
	  var sell = document.getElementsByName('sell')[0].value;
	  var buy = document.getElementsByName('buy')[0].value;
		if (sell != 0 && buy != 0) {
			var ratio_sell = buy/sell
		  GM_setValue(store + "_ratio_sell_"+sell_type+"_"+buy_type, ""+ratio_sell);
		  GM_setValue(store + "_max_time_"+sell_type+"_"+buy_type, document.getElementsByName('max_time')[0].value);
		}
	}
}
	
function insert_coords() {
	if (market_mode == 'send') {
		var coordsList = GM_getValue(store+"_coords","").split(";")
		var last = coordsList[0].split(",")[0].split("_")
		if (last.length > 1) {
			var ix = document.getElementById('inputx')
			var iy = document.getElementById('inputy')
			var iz = document.getElementById('inputz')
			if (iz){
//				if (ix.value == "" && iy.value == "" && iz.value == ""){
					ix.value = last[0]
					iy.value = last[1]
					iz.value = last[2]
//				}
			} else if (ix){
//				if (ix.value == "" && iy.value == ""){
					ix.value=last[0]
					iy.value=last[1]
//				}
			}
		}
	}
}

function html_init(){
	// HTML-Code erweitern
	// Info-Felder (falls Eigenes Dorf gewÃ¤hlt zeige die Daten fÃ¼r das Dorf an)
	var res = document.getElementById('inputx')
	if (res) {
		var infoStr = '<br>Laufende Transporte:<br><table cellspacing=0>'
		var coordsList = GM_getValue(store+"_coords","").split(";")
		historyEntries = GM_getValue(store+"historyEntries", historyEntries)
		for (var t=0; t<coordsList.length;t++){
			if (t > historyEntries-1) break
			var i = coordsList[t].split(",")
			if (i[0] == "") continue
			var vressi = [0,0,0]
			vressi = update_RessiRunning(i[0], vressi)

			var coord = i[0].replace(/_/,"|")
			var coords = coord.split("\|")
			// Ressis fÃ¼r das Dorf summieren
			infoStr += '<tr><td><a id=insert_coord_'+t+' coordx='+coords[0]+' coordy='+coords[1] +' href="javascript:;">'+coord+'</a></td>'
//<a href="/game.php?village='+village+uvP+'screen=info_player&id='+ XXXXX +'>'
			+ '<td>'+i[1]+'</td>'
			+ '<td>: '+i[2]+'</td>'
			+ '<td style="background-color:#EFE4D3">H:</td><td style="background-color:#EFE4D3;text-align:right">'+ parseInt(vressi[0]/1000)+'</td>'
			+ '<td style="background-color:#F5CBAB">L:</td><td style="background-color:#F5CBAB;text-align:right">'+ parseInt(vressi[1]/1000)+'</td>'
			+ '<td style="background-color:#E3E1E1">E:</td><td style="background-color:#E3E1E1;text-align:right">'+ parseInt(vressi[2]/1000)+'</td>'
			+ '<br>'
		}
		infoStr += '</table>'
		var table = res.parentNode.parentNode.parentNode
		var row = table.insertRow(table.rows.length);
    var cell = row.appendChild(document.createElement("td"));
		cell.colSpan = 3
		cell.innerHTML = '<div id=balanceVillageInfo></div><div id=balanceVillageHistory>'+infoStr+'</div>'

		for (var t=0; t<coordsList.length;t++){
			id = document.getElementById('insert_coord_'+t)
			if (!id) continue
			id.addEventListener("click", function(){
					balance_reset()
					balance_update()
					submitForm(this.getAttribute("coordx"), this.getAttribute("coordy"))
					return false;
				},false
			)
		}

		balance_allow['wood'] = GM_getValue(store+"balance_allow_wood", balance_allow['wood'])
		balance_allow['stone'] = GM_getValue(store+"balance_allow_stone", balance_allow['stone'])
		balance_allow['iron'] = GM_getValue(store+"balance_allow_iron", balance_allow['iron'])

		// Balancer-MenÃ¼buttons
		// td -> tr -> table -> td -> tr -> table
		table = cell.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
		offerers_table = table.rows[0].cells[0].getElementsByTagName('table')[0]
		offerers_table.rows[1].cells[0].innerHTML = '<input type=checkbox id=balance_allow_wood value=1'+(balance_allow['wood']?' checked':'')+'>'
			+ '<img src="graphic/holz.png?1" title="Holz" alt=""><input name="wood" tabindex=1 id=balance_offerer_wood value="" size=5 type="text">'
			+'(<a href="javascript:;" id=balance_offerer_M_wood></a>/<a href="javascript:;" id=balance_offerer_P_wood></a>) <span id=balance_offerer_PM_wood></span>'

		offerers_table.rows[2].cells[0].innerHTML = '<input type=checkbox id=balance_allow_stone value=1'+(balance_allow['stone']?' checked':'')+'>'
			+ '<img src="graphic/lehm.png?1" title="Lehm" alt=""><input name="stone" tabindex=2 id=balance_offerer_stone value="" size=5 type="text">'
			+ '(<a href="javascript:;" id=balance_offerer_M_stone></a>/<a href="javascript:;" id=balance_offerer_P_stone></a>) <span id=balance_offerer_PM_stone></span>'

		offerers_table.rows[3].cells[0].innerHTML = '<input type=checkbox id=balance_allow_iron value=1'+(balance_allow['iron']?' checked':'')+'>'
			+ '<img src="graphic/eisen.png?1" title="Eisen" alt=""><input name="iron" tabindex=3 id=balance_offerer_iron value="" size=5 type="text">'
			+ '(<a href="javascript:;" id=balance_offerer_M_iron></a>/<a href="javascript:;" id=balance_offerer_P_iron></a>) <span id=balance_offerer_PM_iron></span>'

		// Tab-Index fÃ¼r OK direkt nach den Rohstoff-Input-Feldern
	  var form = document.getElementsByTagName("form")[0];
	  var inputs = form.getElementsByTagName("input");
	  for( var i= 0; i < inputs.length; i++ ){
			if (inputs[i].type == "submit" && /OK/.test(inputs[i].value)) {
				inputs[i].tabIndex = 4
				break
			}
		}

		var id
		id = document.getElementById('balance_allow_wood')
		id.addEventListener("click", function(){
				balance_allow['wood'] = this.checked ? 1 : 0
				GM_setValue(store+"balance_allow_wood", balance_allow['wood'])
				balance_reset()
				balance_update()
				return false;
			},false
		)
		id = document.getElementById('balance_allow_stone')
		id.addEventListener("click", function(){
				balance_allow['stone'] = this.checked ? 1 : 0
				GM_setValue(store+"balance_allow_stone", balance_allow['stone'])
				balance_reset()
				balance_update()
				return false;
			},false
		)
		id = document.getElementById('balance_allow_iron')
		id.addEventListener("click", function(){
				balance_allow['iron'] = this.checked ? 1 : 0
				GM_setValue(store+"balance_allow_iron", balance_allow['iron'])
				balance_reset()
				balance_update()
				return false;
			},false
		)

		id = document.getElementById('balance_offerer_M_wood')
		id.innerHTML = '-5'
		id.addEventListener("click", function(){
				sFilled["wood"] -= 5
				document.getElementById('balance_offerer_PM_wood').innerHTML = sFilled["wood"]
				balance_update()
				return false;
			},false
		)
		id = document.getElementById('balance_offerer_P_wood')
		id.innerHTML = '+5'
		id.addEventListener("click", function(){
				sFilled["wood"] += 5
				document.getElementById('balance_offerer_PM_wood').innerHTML = sFilled["wood"]
				balance_update()
				return false;
			},false
		)

		id = document.getElementById('balance_offerer_M_stone')
		id.innerHTML = '-5'
		id.addEventListener("click", function(){
				sFilled["stone"] -= 5
				document.getElementById('balance_offerer_PM_stone').innerHTML = sFilled["stone"]
				balance_update()
				return false;
			},false
		)
		id = document.getElementById('balance_offerer_P_stone')
		id.innerHTML = '+5'
		id.addEventListener("click", function(){
				sFilled["stone"] += 5
				document.getElementById('balance_offerer_PM_stone').innerHTML = sFilled["stone"]
				balance_update()
				return false;
			},false
		)

		id = document.getElementById('balance_offerer_M_iron')
		id.innerHTML = '-5'
		id.addEventListener("click", function(){
				sFilled["iron"] -= 5
				document.getElementById('balance_offerer_PM_iron').innerHTML = sFilled["iron"]
				balance_update()
				return false;
			},false
		)
		id = document.getElementById('balance_offerer_P_iron')
		id.innerHTML = '+5'
		id.addEventListener("click", function(){
				sFilled["iron"] += 5
				document.getElementById('balance_offerer_PM_iron').innerHTML = sFilled["iron"]
				balance_update()
				return false;
			},false
		)

		var balance_sort = GM_getValue(store+"balance_sort", "0")
		var balance_hide = GM_getValue(store+"balance_hide", "0")
		var balance_hideBH = GM_getValue(store+"balance_hideBH", "0")
		var balance_match = GM_getValue(store+"balance_match", "0")
		historyEntries = GM_getValue(store+"historyEntries", historyEntries)

		var market_balancer_showSetting = GM_getValue(store+"market_balancer_showSetting", "1")
		offers_at_once = parseInt(GM_getValue(store+"offers_at_once", offers_at_once))

		storage_limit = parseInt(GM_getValue(store+"storage_limit", 1))
		storage_max = parseInt(GM_getValue(store+"storage_max", storage_max))
		storage_min = parseInt(GM_getValue(store+"storage_min", storage_min))
		storage_max_fill_ratio = parseFloat(GM_getValue(store+"storage_max_fill_ratio", storage_max_fill_ratio))
		storage_min_fill_ratio = parseFloat(GM_getValue(store+"storage_min_fill_ratio", storage_min_fill_ratio))


		storage_leave = parseInt(GM_getValue(store+"storage_leave", 1))
		storage_leave_wood = parseInt(GM_getValue(store+"storage_leave_wood", storage_leave_wood))
		storage_leave_stone = parseInt(GM_getValue(store+"storage_leave_stone", storage_leave_stone))
		storage_leave_iron = parseInt(GM_getValue(store+"storage_leave_iron", storage_leave_iron))
		var row = offerers_table.insertRow(offerers_table.rows.length);
    var cell = row.appendChild(document.createElement("td"));
    cell.colSpan=2;
		cell.style.whiteSpace="nowrap"


		var balance_do = GM_getValue(store+"balance_do", "0")
    cell.innerHTML =
			'<input type=button id=balance_adjust value="Ausgleich"> | <input type=button id=balance_reset value="Neu">'
			+ ' | <a href="javascript:;" id=market_balancer_showSetting title="Einstellungen">E</a>'

			+ '<div id="market_balancer_setting"'
				+ (market_balancer_showSetting == "0" ? ' style="display: none;"' : "")
				+'><br><input type=button id="balance_adjust-5" value="-5" title="Reduce offerer">'
			+ '<input type=button id="balance_adjust-1" value="-1" title="Reduce offerer">'
			+ '<input type=text size=3 id="offers_at_once" value="'+offers_at_once+'">'
			+ '<input type=button id="balance_adjust+1" value="+1" title="Add offerer">'
			+ '<input type=button id="balance_adjust+5" value="+5" title="Add offerer">'
			+ '<br><input type=checkbox id=balance_sort value="dist"'+(balance_sort == 'dist'?' checked':'')+'> Nach Entfernung sortieren'

			+ '<br><input type=checkbox id=balance_hide value="full"'+(balance_hide == 'full'?' checked':'')+'> Verstecken voller Speicher'

			+ '<br><input type=checkbox id=balance_hideBH value="full"'+(balance_hideBH == 'full'?' checked':'')+'> Verstecken voller BHs'

			+ '<br><input type=checkbox id=balance_match value="storage"'+(balance_match == 'storage'?' checked':'')+'> Nur bestes Ergebniss'

			+ '<br><input type=checkbox id=storage_limit value="1"'+(storage_limit == 1?' checked':'')+'> Lagerung begrenzen:'
			+ '<br><input type=text size=5 id="storage_max" value="'+storage_max+'"> Max / <input type=text size=3 id="storage_max_fill_ratio" value="'+storage_max_fill_ratio+'"> Ratio' 
			+ '<br><input type=text size=5 id="storage_min" value="'+storage_min+'"> Min / <input type=text size=3 id="storage_min_fill_ratio" value="'+storage_min_fill_ratio+'"> Ratio'

			+ '<br><input type=checkbox id=storage_leave value="1"'+(storage_leave == 1?' checked':'')+'> Lagerungsquelle:'
			+ '<br><img src="graphic/holz.png?1" title="Holz" alt=""><input type=text size=4 id="storage_leave_wood" value="'+storage_leave_wood+'">' 
			+ '<img src="graphic/lehm.png?1" title="Lehm" alt=""><input type=text size=4 id="storage_leave_stone" value="'+storage_leave_stone+'">' 
			+ '<img src="graphic/eisen.png?1" title="Eisen" alt=""><input type=text size=4 id="storage_leave_iron" value="'+storage_leave_iron+'">' 

			+ '<br><input type=text size=2 id="historyEntries" value="'+historyEntries+'"> History-Einträge'
			+ '</div>'



		document.getElementById('market_balancer_showSetting').addEventListener("click", function(){
				if ( GM_getValue(store+"market_balancer_showSetting", "1") == "1") {
					GM_setValue(store+"market_balancer_showSetting", "0")
					document.getElementById('market_balancer_setting').style.display = 'none'
				} else {
					GM_setValue(store+"market_balancer_showSetting", "1")
					document.getElementById('market_balancer_setting').style.display = ''
				}
				return false;
			},false)

		document.getElementById('balance_adjust-5').addEventListener("click", function(){
				balance_adjust(-5)
				return false;
			},false)
		document.getElementById('balance_adjust-1').addEventListener("click", function(){
				balance_adjust(-1)
				return false;
			},false)
		document.getElementById('balance_adjust+1').addEventListener("click", function(){
				balance_adjust(+1)
				return false;
			},false)
		document.getElementById('balance_adjust+5').addEventListener("click", function(){
				balance_adjust(+5)
				return false;
			},false)

		document.getElementById('offers_at_once').addEventListener("change", function(){
				balance_adjust()
				return false;
			},false)

		document.getElementById('storage_limit').addEventListener("click", function(e){
				var box = document.getElementById('storage_limit')
				if (box.checked) {
					GM_setValue(store+"storage_limit", box.value)
				} else {
					GM_setValue(store+"storage_limit", 0)
				}
				return false;
			},false)
		document.getElementById('storage_max').addEventListener("change", function(){
				var id = document.getElementById('storage_max')
				var v = parseInt(id.value)
				if (v<0) v = 0
				GM_setValue(store+"storage_max", v)
				return false;
			},false)
		document.getElementById('storage_min').addEventListener("change", function(){
				var id = document.getElementById('storage_min')
				var v = parseInt(id.value)
				if (v<0) v = 0
				GM_setValue(store+"storage_min", v)
				return false;
			},false)
		document.getElementById('storage_max_fill_ratio').addEventListener("change", function(){
				var id = document.getElementById('storage_max_fill_ratio')
				var v = parseFloat(id.value)
				if (v<0) v = 0.0
				GM_setValue(store+"storage_max_fill_ratio", ""+v)
				return false;
			},false)
		document.getElementById('storage_min_fill_ratio').addEventListener("change", function(){
				var id = document.getElementById('storage_min_fill_ratio')
				var v = parseFloat(id.value)
				if (v<0) v = 0.0
				GM_setValue(store+"storage_min_fill_ratio", ""+v)
				return false;
			},false)


		document.getElementById('balance_adjust').addEventListener("click", function(){
				balance_update()
				return false;
			},false)
		document.getElementById('balance_reset').addEventListener("click", function(){
				balance_reset()
				return false;
			},false)
		document.getElementById('balance_sort').addEventListener("click", function(e){
				var box = document.getElementById('balance_sort')
				if (box.checked) {
					GM_setValue(store+"balance_sort", box.value)
				} else {
					GM_setValue(store+"balance_sort", "0")
				}
				return false;
			},false)
		document.getElementById('balance_hide').addEventListener("click", function(e){
				var box = document.getElementById('balance_hide')
				if (box.checked) {
					GM_setValue(store+"balance_hide", box.value)
				} else {
					GM_setValue(store+"balance_hide", "0")
				}
				return false;
			},false)

		document.getElementById('balance_hideBH').addEventListener("click", function(e){
				var box = document.getElementById('balance_hideBH')
				if (box.checked) {
					GM_setValue(store+"balance_hideBH", box.value)
				} else {
					GM_setValue(store+"balance_hideBH", "0")
				}
				return false;
			},false)

		document.getElementById('balance_match').addEventListener("click", function(e){
				var box = document.getElementById('balance_match')
				if (box.checked) {
					GM_setValue(store+"balance_match", box.value)
				} else {
					GM_setValue(store+"balance_match", "0")
				}
				return false;
			},false)

		document.getElementById('storage_leave').addEventListener("click", function(e){
				var box = document.getElementById('storage_leave')
				if (box.checked) {
					GM_setValue(store+"storage_leave", box.value)
				} else {
					GM_setValue(store+"storage_leave", 0)
				}
				return false;
			},false)
		document.getElementById('storage_leave_wood').addEventListener("change", function(){
				var id = document.getElementById('storage_leave_wood')
				var v = parseInt(id.value)
				if (v<0) v = 0
				GM_setValue(store+"storage_leave_wood", v)
				return false;
			},false)
		document.getElementById('storage_leave_stone').addEventListener("change", function(){
				var id = document.getElementById('storage_leave_stone')
				var v = parseInt(id.value)
				if (v<0) v = 0
				GM_setValue(store+"storage_leave_stone", v)
				return false;
			},false)
		document.getElementById('storage_leave_iron').addEventListener("change", function(){
				var id = document.getElementById('storage_leave_iron')
				var v = parseInt(id.value)
				if (v<0) v = 0
				GM_setValue(store+"storage_leave_iron", v)
				return false;
			},false)

		document.getElementById('historyEntries').addEventListener("keyup", function(){
				var id = document.getElementById('historyEntries')
				var v = parseInt(id.value)
				if (v<0) v = 0
				if (v>100) v = 100
				GM_setValue(store+"historyEntries", v)
				return false;
			},false)
	}

	// Warenausgleichung fÃ¼r Popup-Box Eigene DÃ¶rfer:
	// Popfenster etwas breiter machen
/*
	var setWidth=630
	document.getElementById('inline_popup').style.width=setWidth+"px"
	document.getElementById('inline_popup_main').style.width=(setWidth-5)+"px"
*/

	// Action-Handler integrieren
	var ipop = document.getElementById('inline_popup_content')
//	if (!ipop) return
	var loaded=0
var ttt=""
	ipop.addEventListener("load", function(e){
		if (! ipop.innerHTML.match(/<\/table>/))  return
		loaded=1
		var balance_hide = GM_getValue(store+"balance_hide", "0")
		var balance_hideBH = GM_getValue(store+"balance_hideBH", "0")
		var balance_match = GM_getValue(store+"balance_match", "0")
		offers_at_once = GM_getValue(store+"offers_at_once", offers_at_once)
		storage_limit = GM_getValue(store+"storage_limit", storage_limit)
		storage_max = GM_getValue(store+"storage_max", storage_max)
		storage_min = GM_getValue(store+"storage_min", storage_min)
		storage_max_fill_ratio = GM_getValue(store+"storage_max_fill_ratio", storage_max_fill_ratio)
		storage_min_fill_ratio = GM_getValue(store+"storage_min_fill_ratio", storage_min_fill_ratio)
		var tables = ipop.getElementsByClassName("vis");
		// free: 2. Table / premium: 3. Table
		if (tables[1].width == "100%") tsort_table=tables[1]
		else tsort_table=tables[2]
		for (var r=0;r<tsort_table.rows.length; r++) {
			var row = tsort_table.rows[r]
			if (row.cells.length > 4) return
			if (row.cells.length < 3) continue
			if (row.cells[1].innerHTML.match(/^<a id=/)) return
			var coords=row.cells[0].innerHTML.match(/selectTarget\((\d+), (\d+)\)/)
			var curRessi = row.cells[1].innerHTML.replace(/(<[^>]*>|\.)/g,"").split(" ")
			var speicher = row.cells[2].innerHTML.replace(/(<[^>]*>|\.)/g,"")
			var ressi  = new Array(parseInt(curRessi[0]),parseInt(curRessi[1]),parseInt(curRessi[2]))

			var targetStorage = parseInt(speicher)
			if (storage_limit){
				if (targetStorage > storage_max) targetStorage = storage_max
				if (targetStorage < storage_min) {
					targetStorage = parseInt(targetStorage*storage_min_fill_ratio)
				} else {
					targetStorage = parseInt(targetStorage*storage_max_fill_ratio)
				}
			}
			targetStorage -=1000

			// Waren die bereits auf das Dorf gesendet wurden hervorheben
			var coord = coords[1]+"_"+coords[2]
			ressi = update_RessiRunning(coord,ressi)


			var str = "";
			var is_full = 0;
			var is_match_storage = 1
			for (var i=0; i<ressisEN.length;i++){
				var cell
				var info
				
				var addRess = parseInt(document.getElementsByName(ressisEN[i])[0].value)
				// Speicher kann noch vollstÃ¤ndig Basis-Balance Rohstoffmengen aufnehmen
				if ( addRess > 0 && (ressi[i]+addRess) > targetStorage){
//ttt += ressisEN[0] +":"+(ressi[i]+parseInt(document.getElementsByName(ressisEN[i])[0].value))+"/"+targetStorage+"<br>"
					is_match_storage = 0
				}

				if (ressi[i] >= targetStorage) ++is_full;
				if (ressi[i]!=curRessi[i]) {
					var color = ressi[i] >= targetStorage ? color='red' : 'blue'
					info = '<span style="color:'+color+';" title="Bestand: '+curRessi[i]+' / Lieferungen '+(ressi[i]-curRessi[i])+'">'+parseInt(ressi[i]/1000)+'</span>'
				} else {
					var color = ressi[i] >= targetStorage ? color='grey' : 'black'
					info = '<span style="color:'+color+';" title="Bestand: '+curRessi[i]+' / Lieferungen '+(ressi[i]-curRessi[i])+'">'+parseInt(ressi[i]/1000)+'</span>'
				}

				if (i>0) cell = row.insertCell(1+i)
				else cell = row.cells[1]
				cell.style.whiteSpace="nowrap"
				cell.innerHTML = '<a id="mbalance_'+ ressisEN[i] + r +'" coordx='+coords[1]+' coordy='+coords[2]+' href="javascript:;">'
					+ '<img src="graphic/'+ ressisDE[i] +'.png" title="'+ ressisDE[i] +' ausgleichen">'+'</a>'+info
			}
			var hide = false
			if (balance_hide == "full" && is_full == 3) hide=true
			if (balance_hideBH == "full") {
				var bh = GM_getValue(store+"_bhInfo"+coord,"0/0/0").split("/")
				// kein Bauauftrag und keine BH PlÃ¤tze frei
				if ( (bh[2] == 0) && (bh[1] >=24000 && (bh[1]-bh[0])<1000) ) hide=true
			}

			village_ressis[r] = ( new Array(coords[1], coords[2], ressi[0], ressi[1], ressi[2], speicher) ) 
			// Ressi-Grafiken mit Link versehen
			// <img src="graphic/holz.png?1" title="Holz" alt="">
/*
			row.cells[1].innerHTML = row.cells[1].innerHTML.replace(/(<img src="graphic\/holz[^>]* )title="[^"]*"([^>]*>)/, '<a id="mbalanceWood'+r+'" href="javascript:selectTarget('+coords[1]+', '+coords[2]+')">'+"$1 title=\"Holz ausgleichen\"$2"+'</a>')

			row.cells[1].innerHTML = row.cells[1].innerHTML.replace(/(<img src="graphic\/lehm[^>]* )title="[^"]*"([^>]*>)/, '<a id=mbalanceStone'+r+' href="javascript:selectTarget('+coords[1]+', '+coords[2]+')">'+"$1 title=\"Lehm ausgleichen\"$2"+'</a>')

			row.cells[1].innerHTML = row.cells[1].innerHTML.replace(/(<img src="graphic\/eisen[^>]* )title="[^"]*"([^>]*>)/, '<a id=mbalanceIron'+r+' href="javascript:selectTarget('+coords[1]+', '+coords[2]+')">'+"$1 title=\"Eisen ausgleichen\"$2"+'</a>')
*/

/*
			// Alles ausgleichen
			row.cells[1].innerHTML = '<a id=mbalance'+r+' href="javascript:selectTarget('+coords[1]+', '+coords[2]+')"><img src="/graphic/overview/trader.png" title="Alle Rohstoffe ausgleichen"></a> '
				+row.cells[1].innerHTML

			// Click Events
			var a = document.getElementById('mbalance'+r)
			a.addEventListener("click", function(){
					balanceVillageRessi('ALL',this.id)
					return false;
				},false)
*/
			a = document.getElementById('mbalance_wood'+r)
			a.addEventListener("click", function(){
					balanceVillageRessi('WOOD',this.id)
					submitForm(this.getAttribute("coordx"), this.getAttribute("coordy"),'mbalance_wood')
					return false;
				},false)

			a = document.getElementById('mbalance_stone'+r)
			a.addEventListener("click", function(){
					balanceVillageRessi('STONE',this.id)
					submitForm(this.getAttribute("coordx"), this.getAttribute("coordy"),'mbalance_stone')
					return false;
				},false)

			a = document.getElementById('mbalance_iron'+r)
			a.addEventListener("click", function(){
					balanceVillageRessi('IRON',this.id)
					submitForm(this.getAttribute("coordx"), this.getAttribute("coordy"),'mbalance_iron')
					return false;
				},false)

			// Alles ausgleichen (Speicher-Image)
			row.cells[4].innerHTML ='<a id=mbalance_all'+ r +'  coordx='+coords[1]+' coordy='+coords[2]+' href="javascript:;">'
				+'<img src="graphic/res.png?1" alt="Speicher" title="Speicher ausgleichen"></a>'
				+'<a id=mbalance_ress'+ r +' coordx='+coords[1]+' coordy='+coords[2]+' href="javascript:;" title="Rohstoffe ausgleichen">R</a> '
				+parseInt(speicher/1000)
	
			a = document.getElementById('mbalance_all'+r)
			a.addEventListener("click", function(){
					balanceVillageRessi('ALL',this.id)
					submitForm(this.getAttribute("coordx"), this.getAttribute("coordy"),'mbalance_all')
					return false;
				},false)

			a = document.getElementById('mbalance_ress'+r)
			a.addEventListener("click", function(){
					balanceVillageRessi('RESS',this.id)
					submitForm(this.getAttribute("coordx"), this.getAttribute("coordy"),'mbalance_ress')
					return false;
				},false)

			row.cells[0].innerHTML = row.cells[0].innerHTML.replace(/(<[^>]*)/, "$1 id=mbalance_dest"+r+"  coordx="+coords[1]+" coordy="+coords[2]+" href=\"javascript:;\" title=\"Rohstoffe von Basis eintragen\"")
			a = document.getElementById('mbalance_dest'+r)
			a.addEventListener("click", function(){
					balanceVillageRessi('DEST',this.id)
					submitForm(this.getAttribute("coordx"), this.getAttribute("coordy"),'mbalance_dest')
					return false;
				},false)

			// Distance
			var dist = Math.sqrt(Math.pow(villageX - coords[1], 2) + Math.pow(villageY - coords[2], 2));
			var unitTime=(dist * marketspeed)
      var cell = row.insertCell(row.cells.length);
//			dist = Math.round(dist)
//			if (dist<10)dist='0'+dist
//			cell.innerHTML = dist+'='+clock(unitTime)+" /"+villageX +"-"+ coords[1]
			cell.innerHTML = clock(unitTime)

			if (tsort_row > -1) {
				tsort[r] = [ row.cells[tsort_row].innerHTML, row ]
			}

			// KÃ¶nnen alle Waren von Basis (Balance-Basis) in Dest aufgenommen werden
	    var cell = row.appendChild(document.createElement("td"));
			if (balance_match == "storage" && !is_match_storage){
				hide = true
			} else {
				if (is_match_storage){
			    cell.innerHTML = '<a href="javascript:;" title="Best match">*</a>'
				}
			}
			if (hide) row.style.display = 'none'
		}

//		tsort_table()
		// sort table rows by distance
		if (GM_getValue(store+"balance_sort", "0") == "dist") {
			tsort.sort(sort_numeric)
	    for (var j=0; j<tsort.length; j++) {
	      tsort_table.appendChild(tsort[j][1]);
	    }
		}
if (ttt != "") {
	table.rows[0].cells[0].innerHTML = ttt
}
	}, true)
}

//function tsort_table(){
//}

function update_OffererRunning(coord, market){
	var time = new Date().getTime()
	var offererRunning = GM_getValue(store+"market_"+coord, "")
	if (offererRunning){
		var nrunning = new Array()
		var running = offererRunning.split("#")
		for (var o=0;o<running.length;o++) {
			var dat = running[o].split(";")
			if (!dat.length) continue
			if (parseInt(dat[0]) > time) {
				market+=dat[1]
				nrunning.push(running[o])
			}
		}
		if (nrunning.length) GM_setValue(store+"market_"+coord,nrunning.join("#"))
		else GM_deleteValue(store+"market_"+coord)
	}
	return market
}

function update_RessiRunning(coord, ressi){
	var time = new Date().getTime()
	var future = GM_getValue(store+"ress_"+coord, "")
	if (future != "") {
		future = future.split("#")
		var nfuture = new Array()
		for (var f=0;f<future.length;f++) {
			var dat = future[f].split(";")
			if (!dat.length) continue
			if (parseInt(dat[0]) > time) {
				nfuture.push(future[f])
				for (var i=0; i<ressisEN.length;i++){
					ressi[i] += parseInt(dat[i+1])
				}
			}
		}
		if (nfuture.length) GM_setValue(store+"ress_"+coord,nfuture.join("#"))
		else GM_deleteValue(store+"ress_"+coord)
	}
	return ressi
}


// Freie HÃ¤ndler aus PA-Seite "Kombiniert" auf PA-Seite "Produktion" anzeigen
function overview_page_free_offerer(){
	if(! /screen=overview_villages/.test(location.href) ) return 0
	// PA?
	var premium = false
	var selTab = ""
	var overview = document.getElementById('overview')
	if (overview) {
		selTab = overview.value
		if (selTab != 'combined' && selTab != 'prod') return 1
		var premium = true
	}
	// Table mit Daten finden:
	var tables = document.getElementsByClassName("vis");
	var table
	var dorf = new RegExp('^Dorf')
	for (var t=0; t<tables.length;t++) {
		if (tables[t].rows.length < 2) continue
		if (tables[t].rows[0].cells[0].innerHTML.match( dorf )) {
			table = tables[t]
			break
		}
	}

	if (!table) return 0
	var c = new RegExp('\\((\\d+)\\|(\\d+)\\)')
	if (selTab == 'combined'){
return 1
		var data = new Array()
		var m = new RegExp('(\\d+)/(\\d+)')
		for (var r=1;r<table.rows.length;r++){
			var row = table.rows[r]
			var coords = row.cells[0].innerHTML.match( c )
			if (coords)	{
				var coord=coords[1]+"_"+coords[2]
				var market = row.cells[20].innerHTML.match( m )
				if (market){
					GM_setValue(store+"_marketInfo"+coord,market[1]+"/"+market[2])
				}
			}
		}
	} else if (!premium || selTab == 'prod'){
		var m = new RegExp('(\\d+)/(\\d+)')
		var villages = new Array()
		for (var r=1;r<table.rows.length;r++){
			var row = table.rows[r]
			var coords = row.cells[0].innerHTML.match( c )
			if (coords)	{
				var coord=coords[1]+"_"+coords[2]
				villages.push(coord)
				var villageName = row.cells[0].innerHTML.replace(/[\n\r]/g,"").match(/(<a [^>]*>.*?<\/a>)/)[1].replace(/<\/?span[^>]*>/g,"").replace(/;/g," ")
				var vID = row.cells[0].innerHTML.match(/[&?]village=(\d+)/)[1]

				var freeOfferer = parseInt(row.cells[4].textContent.split("/")[0])
				var resources = row.cells[2].textContent.replace(/\.|\s$|^\s/g, "").split(" ");
				for(var y=0; y<resources.length; y++) {
					resources[y] = parseInt(resources[y], 10);
				}
				var storage = row.cells[3].textContent;
				GM_setValue(store+"_resources"+coord, resources.join(";")+";"+storage+";"+freeOfferer+";"+villageName+';'+vID)

				// BH voll und keine aktiven BauauftrÃ¤ge (dann braucht das Dorf wahrscheinlich
				// keine Ressis
				var bhPos = premium ? 5 : 4
				var bh = row.cells[bhPos].innerHTML.match( m )
				if (bh){
					var builds = 0
					if (premium) builds = (row.cells[bhPos+1].innerHTML==""?0:1)
					GM_setValue(store+"_bhInfo"+coord,bh[1]+"/"+bh[2]+"/"+builds)
				}

//				// HÃ¤ndler unterwegs
//				var market = update_OffererRunning(coord, 0)
//if (coord == '183_390') alert(market)
//				// Ressis inklusive der noch laufenden Lieferungen?
//				var ressi = new Array()
//				update_RessiRunning(coord,ressi)
//
/*
				var info = GM_getValue("_marketInfo"+coord,"/")
				var marketInfo = new Array()
				if (info) marketInfo = info.split("/")
				if (market == 0 && (marketInfo[0] == 0 || marketInfo[0] == marketInfo[1]) ){
					market = marketInfo[0]
				} else {
					market = marketInfo[1]-market
				}
				row.cells[2].innerHTML += '<img src="/graphic/overview/trader.png" title="Freie HÃ¤ndler"> '+market+"/"+marketInfo[1]
*/
			}
		}
		GM_setValue(store+"_villages", villages.join(";"))
	}
	return 1
}
function balance_reset(){
	ressType = ["wood", "stone", "iron"]
	sBase   = { "wood" : parseInt(wood), "stone" : parseInt(stone), "iron" : parseInt(iron) }
	sTarget = { "wood" : parseInt(1), "stone" : parseInt(1), "iron" : parseInt(1), "storage" : parseInt(100000) }
	sMarket = { "wood" : 0, "stone" : 0, "iron" : 0 }
	sFilled = { "wood" : 0, "stone" : 0, "iron" : 0 }

  document.getElementsByName('wood')[0].value = ''
  document.getElementsByName('stone')[0].value= ''
  document.getElementsByName('iron')[0].value = ''
	document.getElementById('balance_offerer_PM_wood').innerHTML = sFilled["wood"]
	document.getElementById('balance_offerer_PM_stone').innerHTML = sFilled["stone"]
	document.getElementById('balance_offerer_PM_iron').innerHTML = sFilled["iron"]
}
function balance_update(){
	balanceRessi("sell", "ALL")
}

function balance_adjust(add){
	var id = document.getElementById('offers_at_once')
	offers_at_once = parseInt(id.value)
	if (add) offers_at_once += add
	if (offers_at_once<0) offers_at_once = 0
	if (add) id.value = offers_at_once
	GM_setValue(store+"offers_at_once", offers_at_once)
	balance_update()
}
function str2Time(str){
	// heute um 21:03 Uhr | morgen um 22:22 Uhr | am 15.01. um 14:07 Uhr
	var res = str.match(/^(heute|morgen|am (\d\d)\.(\d\d)\.) um (\d\d):(\d\d) Uhr/)
	if (!res) return 0
	// Date(year, month, day, hours, minutes, seconds, milliseconds)
	var d = new Date()
	if (res[1] == "heute") {
		var date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), res[4], res[5])
		return date.getTime()
	} else if (res[1] == "morgen"){
		var time = new Date(d.getFullYear(), d.getMonth(), d.getDate(), res[4], res[5]).getTime()
		return time+86400000
	} else {
		var date = new Date(d.getFullYear(), res[3], res[2], res[4], res[5])
		return date.getTime()
	}
}
function sort_numeric(a,b) {
  aa = parseFloat(a[0].replace(/[^0-9.-]/g,''));
  if (isNaN(aa)) aa = 0;
  bb = parseFloat(b[0].replace(/[^0-9.-]/g,'')); 
  if (isNaN(bb)) bb = 0;
  return aa-bb;
}
function sort_alpha(a,b) {
  if (a[0]==b[0]) return 0;
  if (a[0]<b[0]) return -1;
  return 1;
}

function confirm_send(){
	// Rohstoffversand speichern
	if (/&try=confirm_send/.test(location.href)) {
		// Fehlermeldungen => wir befinden uns nicht auf der BestÃ¤tigungsseite!
		if (/Nicht genÃ¼gend Rohstoffe vorhanden/.test(document.body.innerHTML)) return 0

		var table = document.getElementsByClassName("vis")[0];
		if (!table.rows.length > 3) return
		var res = table.rows[1].cells[1].innerHTML.match(/>(.*?) \((\d+)\|(\d+)\) .\d+</)
		if (res) {
			var targetCoord = res[2]+"_"+res[3]
			var targetName = res[1].replace(/[,;]/g,".")
			var targetPlayer = table.rows[2].cells[1].innerHTML.match(/>(.*?)<\/a>/)[1].replace(/[,;]/g,".")
		} else {
			alert('no target info')
		}
		var sendRess = table.rows[3].cells[1].innerHTML.replace(/<img [^>]*(holz|lehm|eisen)[^>]*>(\d+)(?:<span[^>]*>.<\/span>(\d+))/g,"$1 $2$3").replace(/ +$/,"").split(" ")
		var market = table.rows[4].cells[1].innerHTML
		var dur = table.rows[5].cells[1].innerHTML.split(":")
		var duration = parseInt( parseInt(dur[0])*3600+parseInt(dur[1])*60+parseInt(dur[2])) *1000
		var ressA = [0,0,0]
		for (var r=0; r<sendRess.length;r+=2) {
			var i
			for (i=0; i<ressisDE.length;i++) if (ressisDE[i] == sendRess[r]) break
			ressA[i] = parseInt(sendRess[r+1])
		}
		// Versanddorf Koordinaten
		var res = document.title.match(/\((\d+)\|(\d+)\) - Die S/)
		if (res) {
			var coord = res[1]+"_"+res[2]
		  var form = document.getElementsByTagName("form")[0];
			form.addEventListener("submit", function() {
				var time = new Date().getTime()
				// Laufzeiten: Array mit Zeiten und Rohstoffdaten
				// HÃ¤ndler Laufzeit speichern
/*				var dat = GM_getValue(store+"market_"+coord,"").split("#")
				dat.push(""+(time+duration*2)+";"+market)
				GM_setValue(store+"market_"+coord, ""+ dat.join("#"))
*/
				// Rohstofflaufzeit+Menge speichern
				var dat = GM_getValue(store+"ress_"+targetCoord,"").split("#")
				dat.push(""+(time+duration)+";"+ressA.join(";"))
				GM_setValue(store+"ress_"+targetCoord, ""+ dat.join("#"))

				var coordsList = GM_getValue(store+"_coords","").split(";")
				// Letzten Koordinaten schon in Liste?
				var coordReg = new RegExp('^'+targetCoord+',')
				for (var t=0; t<coordsList.length;t++){
					if (coordsList[t].match(coordReg)){
						coordsList.splice(t,1);
						break
					}
				}
				coordsList.unshift(targetCoord+','+targetPlayer+','+targetName)
/*
				//var coordsList = GM_getValue(store + "_coords","").split(";")
				var ix = document.getElementById('inputx')
				var iy = document.getElementById('inputy')
				var iz = document.getElementById('inputz')
				if (iz){
					coordsList.unshift(ix.value+"_"+iy.value+"_"+iz.value)
				} else if (ix){
					coordsList.unshift(ix.value+"_"+iy.value)
				}
*/
				coordsList.length = historyStore
				//GM_setValue( store + "_coords",coordsList.join(";") )
				GM_setValue(store+"_coords",coordsList.join(";") )
			} , true );
	

		  var inputs = form.getElementsByTagName("input");
			for (var i=0;i<inputs.length;i++){
				if (inputs[i].type == 'submit') {
		 			inputs[i].focus()
					break
				}
			}

			return 1
		}
	}
	return 0
}

function submitForm(x,y,btype){
	document.getElementById('inputx').value = x
	document.getElementById('inputy').value = y

	// Rohstoffe eingetragen?
	if (document.getElementsByName('wood')[0].value > 0
		||document.getElementsByName('stone')[0].value > 0
		||document.getElementsByName('iron')[0].value > 0){

/*
		btype = x+'_'+y+'_'+btype
		if (submit_type == btype) submit_count++
		else submit_count = 1
		submit_type = btype
		if (submit_count < 2) return
*/
	  var inputs = form.getElementsByTagName("input");
		for (var i=0;i<inputs.length;i++){
			if (inputs[i].type == 'submit') {
	 			inputs[i].click()
				break
			}
		}
	}
}


// Vorschlag erstellen
// villageX villageY wood stone iron max_offers
function suggest(nr){
	if (!nr || nr < 1) nr = 1
	// keine freien HÃ¤ndler
	if (GM_getValue(store+"_suggest", 0) == 0) {
		balance_reset()
		balance_update()
		insert_coords()
		document.getElementById('balanceVillageInfo').innerHTML =
			'<input type=checkbox id=suggest value=1> Vorschlag'

		document.getElementById('suggest').addEventListener("change", function(){
				if (this.checked)
					GM_setValue(store+"_suggest", 1)
					suggest()
				return false;
			},false
		)
		return
	}
	if (!max_offers) return

	// Gleiche die Warenmengen aus

	// Gleiche Basis aus:
	var typ = 'ALL'

	ressType = ["wood", "stone", "iron"]
	sBase   = { "wood" : parseInt(wood), "stone" : parseInt(stone), "iron" : parseInt(iron) }
	sTarget = { "wood" : parseInt(1), "stone" : parseInt(1), "iron" : parseInt(1), "storage" : parseInt(100000) }
	sMarket = { "wood" : 0, "stone" : 0, "iron" : 0 }

	// Suche die nÃ¤chstliegende Stadt, die Rohstoffe braucht
	var villages = GM_getValue(store+"_villages", "").split(";")
	// Array mit Entfernungen zu StÃ¤dten
	var vdist = []

	for (var v=0;v<villages.length;v++) {
		var coord = villages[v]
		// eigene Stadt nicht beliefern
		if (coord == villageCoord) {
			vdist[v] = [ "9999", v ]
			continue
		}
		var coords = coord.split("_")
		var dist = Math.sqrt(Math.pow(villageX - coords[0], 2) + Math.pow(villageY - coords[1], 2));
		vdist[v] = [ dist.toString(), v ]
	}
	vdist.sort(sort_numeric)

	var ressi = [], dist, coords, dat
	var sendAmount
	var suggestCount=0
	for (var i=0;i<vdist.length;i++){
		if (vdist[i][0] == "9999") continue
		var v = vdist[i][1]
		var coord = villages[v]
		dist = vdist[i][0]
		coords = coord.split("_")

		dat = GM_getValue(store+"_resources"+coord, "-1;0;0;0;0;-").split(";")
		if (dat[0] == -1) continue
		
		if (typ == "WOOD") ressType = ["wood"]
		else if (typ == "STONE") ressType = ["stone"]
		else if (typ == "IRON") ressType = ["iron"]
		else ressType = ["wood", "stone", "iron"]
		
		ressi = [0,0,0]
		ressi = update_RessiRunning(coord,ressi)

		sBase   = { "wood" : parseInt(wood), "stone" : parseInt(stone), "iron" : parseInt(iron) }
		sTarget = { "wood" : parseInt(dat[0])+ressi[0], "stone" : parseInt(dat[1])+ressi[1], "iron" : parseInt(dat[2])+ressi[2], "storage" : parseInt(dat[3]) }
		sMarket = { "wood" : 0, "stone" : 0, "iron" : 0 }

		if (typ == "DEST"){
	//, parseInt(sTarget["storage"])
			sendAmount = balanceRessi("sell", "ALL")
		} else {
			sendAmount = balanceRessi("buy", typ)
		}
		if (sendAmount > 0) {
			suggestCount++
			if (suggestCount != nr) continue
			break
		}
	}

	if (!sendAmount) {
		if (nr > 1) suggest(nr-1)
		else {
			balance_reset()
			balance_update()
			insert_coords()
		}
	} else {
		document.getElementById('inputx').value = coords[0]
		document.getElementById('inputy').value = coords[1]

		var unitTime=(dist * marketspeed)
		document.getElementById('balanceVillageInfo').innerHTML =
				'<input type=checkbox id=suggest value=1 checked> Vorschlag'
				+ (nr>0?'-'+(nr<10?'0'+nr:nr):'')+': '
				+ '<a href="javascript:;" id=suggestPrev>&lt;</a> <a href="javascript:;" id=suggestNext>&gt;</a> '
				+ dat[5] +'('+ clock(unitTime) +') <img src="graphic/res.png?1" title="Speicher" alt="">'+sTarget["storage"]
			+ '<table>'
			+ '</tr><tr><td>Aktuell:</td><td align=right><img src="graphic/holz.png?1" title="Holz" alt="">'+dat[0]+'</td><td align=right><img src="graphic/lehm.png?1" title="Lehm" alt="">'+dat[1]+'</td><td align=right><img src="graphic/eisen.png?1" title="Eisen" alt="">'+dat[2]+'</td>'
			+ '</tr><tr><td>+Lieferung:</td><td align=right>'+ressi[0]+'</td><td align=right>'+ressi[1]+'</td><td align=right>'+ressi[2]+'</td>'
			+ '</tr><tr><td>+Vorschlag:</td><td align=right>'+sMarket["wood"]+'</td><td align=right>'+sMarket["stone"]+'</td><td align=right>'+sMarket["iron"]+'</td>'
			+ '</tr><tr><td>Gesamt:</td><td align=right>'+sTarget["wood"]+'</td><td align=right>'+sTarget["stone"]+'</td><td align=right>'+sTarget["iron"]+'</td>'

			+ '</tr></table>'

		document.getElementById('suggest').addEventListener("change", function(){
				if (!this.checked)
					GM_setValue(store+"_suggest", 0)
					suggest()
				return false;
			},false
		)
		document.getElementById('suggestPrev').addEventListener("click", function(){
				suggest(nr-1)
				return false;
			},false
		)
		document.getElementById('suggestNext').addEventListener("click", function(){
				suggest(nr+1)
				return false;
			},false
		)
	}

}

})();