// ==UserScript==
// @author cleverguide
// @name         tribalwars-Resources-Info-PLAPL
// @description  V0.03 | يقوم بي عرض مجموع الموارد و المزارع الخالي في الشكل العام
// @namespace none
// @include   http://*/game.php?*screen=overview_villages*
// ==/UserScript==

/*
V0.03:
- Fehler: Summe von Holz war gleich der Summe Lehm
- Info-Summen-Zeile kann sowohl oben als auch unten (oder beides) dargestellt werden
- Namenskürzung des Dorfnamens von 10 Zeichen auf 20 Zeichen angehoben (bzw. per Variable "villageNameLength" einstellbar)
- Onlick-Event für Images in der Spalte Rekrutierung für Stall und Kaserne
- Abriss nicht für nächsten Bauauftrag werten
- Nächster Rekrutierungsauftrag; Falls der Bauernhof 24000 Einheiten aufnehmen kann und mehr als 23600 Einheiten bereits rekrutiert werden wird dieser Eintrag nicht angegeben (400 frei lassen für 4 AGs).
- Warnungen/Fehler korrigiert

V0.02:
- Logmeldungen in der Fehlerkonsole
- HVM Shortcuts (Hauptgebäude/Versammlungsplatz/Marktplatz) zu jedem Dorf
- Summenzeile listet den zuerst endenen Bau-/Rekrutierungsauftrag auf (mit HVM-Links und Dorflink)
*/

(function(){
// Maximale Länge des Dorfnamens in der Summenzeile
var villageNameLength=20

// Summenzeile oben oder unten anzeigen
var showSumTop=true
var showSumBottom=true

//	// Füllstand Rohstoffe einfärben, wenn Kapazitätzgrenze erreicht:
//	var speicherFullRatio = 0.9

if( /screen=overview_villages/.test(location.href) ){
	var table = overview_production_table()
	if (table){
		overview_table_update(table)
	}
	return
}

function overview_production_table(){
	var selTab = document.getElementById('overview').value
	if (!selTab) GM_log("نظرة عامة على الهوية لا وجود له!")
	if (selTab != 'prod') { GM_log("خسائر الانتاج nicht نشط"); return }
	// Table mit Daten finden:
	var tables = document.body.getElementsByClassName("vis");
	var table
	var dorf = new RegExp('القريه')
	for (var t=0; t<tables.length;t++) {
		if (tables[t].rows.length < 2) continue
		if (tables[t].rows[0].cells[0].innerHTML.match( dorf )) {
			table = tables[t]
			break
		}
	}
	if (!table) {
		GM_log("الجدول مع قرية خلية غير موجود")
		return
	}
	if (table.rows.length <= 1) {
		GM_log("قرية الجدول عدد قليل جدا من مداخل")
	}
//		GM_log("Info-Table gefunden mit Zeilen: "+table.rows.length)
	return table
}

function overview_table_update(table){
	var c = new RegExp('\\((\\d+)\\|(\\d+)\\)')
	var troups = new Array()
	troups[0] = new RegExp('/unit_(axe|sword|spear|archer)')
	troups[1] = new RegExp('/unit_(light|heavy|marcher|spy)')
	//troups[2] = new RegExp('/unit_(ram|katta)')
	//troups[3] = new RegExp('/unit_(snob)')
	var troupsPage = new Array()
	troupsPage[0] = 'barracks'
	troupsPage[1] = 'stable'
	troupsPage[2] = 'garage'
	troupsPage[3] = 'snob'
	var sumAll = [0, 0, 0, 0, 0]
	var villageCount=0
	var villageNameRegex = new RegExp('^([^(]{1,'+villageNameLength+'})')

	// zuerst endender Auftrag
	var bauFirst   = { "time" : 0, "timeStr" : "", "village" : "", "vname" : "" }
	var rekruFirst = { "time" : 0, "timeStr" : "", "village" : "", "vname" : "" }
	for (var r=0;r<table.rows.length;r++){
		var coords = table.rows[r].cells[0].innerHTML.match( c )
		if (coords){
			var res = table.rows[r].cells[0].innerHTML.match(/[?&]village=(\d*)/)
			var villageID = res[1]
			var villageName = document.getElementById('label_text_'+villageID).innerHTML
			++villageCount

			// Freie Bauernhofplätze
			var farm = table.rows[r].cells[4].innerHTML.split("/")
			var farmFree = parseInt(farm[1])-parseInt(farm[0])
			sumAll[4] += farmFree

			// Truppenproduktion in Kaserne/Stall: Datum anzeigen
			var cell = table.rows[r].cells[7]
			var imgs = cell.getElementsByTagName("img")
			var last_troup = new Array()
			var last_match=-1
			var last_img
			if (imgs.length) {
				for (var i=imgs.length-1; i>=0;i--){
					var img = imgs[i]
					for (var t=0; t<troups.length;t++) {
						if (img.src.match(troups[t])) {
							eval ("img.setAttribute('onclick', 'location.href=\"/game.php?village=" + villageID + "&screen="+troupsPage[t]+"\";')");
							if (!last_troup[t]){
								last_troup[t] = img.title.match(/.*?- (.*)/)[1]
								last_match = t
								last_img=i
							}
							break
						}
					}
				}
				if (last_match>-1) {
					cell.innerHTML = last_troup[last_match]+"<br>"+cell.innerHTML
					imgs[last_img].style.borderBottom="inset red 2px"
					var time = str2Time(last_troup[last_match])
					if (time && (farm[1] < 24000 || farmFree >= 400) ) {
						if (!rekruFirst["time"] || rekruFirst["time"] > time) {
							rekruFirst["time"] = time
							rekruFirst["timeStr"] = last_troup[last_match]
							rekruFirst["village"] = villageID
							rekruFirst["vname"] = villageName
						}
					}
				}
			}

			// nächster Bauauftrag
			var cell = table.rows[r].cells[5]
			var res = cell.innerHTML.match(/((?:اليوم|غداً |am)[^>]*)<br>/)
			if (res && !cell.innerHTML.match(/<br>[^<]*<img [^>]*down.png/)){
				var time = str2Time(res[1])
				if (time) {
					if (!bauFirst["time"] || bauFirst["time"] > time) {
						bauFirst["time"] = time
						bauFirst["timeStr"] = res[1]
						bauFirst["village"] = villageID
						bauFirst["vname"] = villageName
					}
				}
			}

			// HVM Shortcuts
		  table.rows[r].cells[1].innerHTML = hvmShortcuts(villageID) + table.rows[r].cells[1].innerHTML

			// Rohstoffe
			var ressi = table.rows[r].cells[2].innerHTML.replace(/(<[^>]*>|\.)/g,"").split(" ")
			sumAll[0] += parseInt(ressi[0])
			sumAll[1] += parseInt(ressi[1])
			sumAll[2] += parseInt(ressi[2])

			// Freie Rohstoffspeicher
			var speicher = parseInt(table.rows[r].cells[3].innerHTML)
/*
			var full = speicherFullRatio*speicher
			for (var r=0; r<ressi.length; r++) {
				if (parseInt(ressi[r]) > full && parseInt(ressi[r]) != speicher){
					table.rows[r].cells[3].getElementsByTagName("span")
				}
			}
*/
			sumAll[3] += speicher-parseInt(ressi[0]) + speicher-parseInt(ressi[1]) + speicher-parseInt(ressi[2])
			}
		}
	var row
	if (showSumTop)
		row = table.insertRow(1);
	else
		row = table.appendChild(document.createElement("tr"));

	var cell = row.appendChild(document.createElement("td"));
	cell.innerHTML = villageCount+"-قريه"+"<a href=http://www.plapl.com/forum.php>>>>>بلابل<<<<</a>"
	cell = row.appendChild(document.createElement("td"));
	cell = row.appendChild(document.createElement("td"));
  cell.innerHTML =
		 '<img src="graphic/holz.png?1" title="Holz" alt="">'+formatNumber(sumAll[0])
		+' <img src="graphic/lehm.png?1" title="Lehm" alt="">'+formatNumber(sumAll[1])
		+' <img src="graphic/eisen.png?1" title="Eisen" alt="">'+formatNumber(sumAll[2])

	cell = row.appendChild(document.createElement("td"));
  cell.innerHTML = formatNumber(sumAll[3]) +'  |خالي| '

	cell = row.appendChild(document.createElement("td"));
  cell.innerHTML = sumAll[4] +' |خالي| '

	cell = row.appendChild(document.createElement("td"));
	cell.innerHTML = '<a href="/game.php?village=' + bauFirst["village"] + '&screen=overview" title="' + bauFirst["vname"] + '">'+bauFirst["timeStr"]+'</a>'
		+'<br>'+hvmShortcuts(bauFirst["village"]) +' '+bauFirst["vname"].match(villageNameRegex)[1]

	cell = row.appendChild(document.createElement("td"));

	cell = row.appendChild(document.createElement("td"));
	cell.innerHTML = '<a href="/game.php?village=' + rekruFirst["village"] + '&screen=overview"  title="' + rekruFirst["vname"] + '">'+rekruFirst["timeStr"]+'</a>'
		+'<br>'+hvmShortcuts(rekruFirst["village"]) +' '+rekruFirst["vname"].match(villageNameRegex)[1]

	// Kopiere Info Zeile nach unten
	if (showSumTop && showSumBottom) {
		row = table.appendChild(document.createElement("tr"));
		var base = table.rows[1]
		for (var c=0; c<base.cells.length; c++) {
			row.appendChild(document.createElement("td")).innerHTML = base.cells[c].innerHTML
		}
	}
}

function str2Time(str){
	// heute um 21:03 Uhr | morgen um 22:22 Uhr | am 15.01. um 14:07 Uhr
	var res = str.match(/^(اليوم|غداً|am (\d\d)\.(\d\d)\.) um (\d\d):(\d\d) Uhr/)
	if (!res) return 0
	// Date(year, month, day, hours, minutes, seconds, milliseconds)
	var d = new Date()
	if (res[1] == "اليوم ") {
		var date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), res[4], res[5])
		return date.getTime()
	} else if (res[1] == "غداً "){
		var time = new Date(d.getFullYear(), d.getMonth(), d.getDate(), res[4], res[5]).getTime()
		return time+86400000
	} else {
		var date = new Date(d.getFullYear(), res[3], res[2], res[4], res[5])
		return date.getTime()
	}
}
function hvmShortcuts(villageID) {
	return	'<a href="/game.php?village=' + villageID + '&screen=main"> م</a>'
					+	'<a href="/game.php?village=' + villageID + '&screen=place"> ن</a>'
					+ '<a href="/game.php?village=' + villageID + '&screen=market"> س</a> '
}

function formatNumber(nr, color){
	if (!color) color="grey"
  if( nr == 0 )
    return "0";
	else if (nr > 1000000) {
		return ""+(Math.round(nr/100000)/10) +" مليون."
	}
  var ret = ""
  do
  {
    var tmp = "00" + nr%1000;
    ret = tmp.substr(tmp.length-3,3) + '<span class="'+color+'">.</span>' + ret;
    nr = Math.floor(nr/1000);
  } while( nr > 0 );
  ret = ret.replace(/^0*/g,"").replace(new RegExp('<span class="'+color+'">.{1}<\/span>$',"g"),"");
  return ret;
}

})();