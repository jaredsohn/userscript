// ==UserScript==
// @name				Kalkulator czasów ataku
// @author				Szatdafakap
// @namespace			http://aturime.pl
// @description			Wersja dla Plemiona 7.1
// @include			http://pl*.plemiona.pl/game.php*mode=units&screen=overview_villages&type=own_home*
// @include			http://pl*.plemiona.pl/game.php*screen=place*
// @include			http://pl*.plemiona.pl/game.php?*screen=info_village*
// @include         http://pl43.plemiona.pl/game.php?*units&screen=overview_villages&type=own_home&coords*
// ==/UserScript==


var worldType = 1;
const WORLD_ARCHERS = 1;
const WORLD_NONARCHERS = 2;

if (window.opera) {
	unsafeWindow = window;
}

function gid(id) { 
	return document.getElementById(id);
}

function _$(kind) {
	return document.createElement(kind);
}

Date.prototype.format = function(format){
	var returnStr = '';
	var replace = Date.replaceChars;
	for (var i = 0; i < format.length; i++) {
		var curChar=format.charAt(i);
		if (replace[curChar]) { 
			returnStr += replace[curChar].call(this);
		} else { 
			returnStr+=curChar;
		}
	}
	return returnStr;
};

Date.replaceChars={
	d:function(){return(this.getDate()<10?'0':'')+this.getDate();},
	D:function(){return Date.replaceChars.shortDays[this.getDay()];},
	j:function(){return this.getDate();},
	l:function(){return Date.replaceChars.longDays[this.getDay()];},
	N:function(){return this.getDay();},
	S:function(){return(this.getDate()%10==1&&this.getDate()!=11?'st':(this.getDate()%10==2&&this.getDate()!=12?'nd':(this.getDate()%10==3&&this.getDate()!=13?'rd':'th')));},
	w:function(){return this.getDay();},z:function(){return"Not Yet Supported";},
	F:function(){return Date.replaceChars.longMonths[this.getMonth()];},
	m:function(){return(this.getMonth()+1<10?'0':'')+(this.getMonth()+1);},
	M:function(){return Date.replaceChars.shortMonths[this.getMonth()];},
	n:function(){return this.getMonth();},t:function(){return"Not Yet Supported";},
	Y:function(){return this.getFullYear();},y:function(){return(''+this.getFullYear()).substr(2);},
	a:function(){return this.getHours()<12?'am':'pm';},
	A:function(){return this.getHours()<12?'AM':'PM';},
	g:function(){return this.getHours()%12||12;},G:function(){return this.getHours();},
	h:function(){return((this.getHours()%12||12)<10?'0':'')+(this.getHours()%12||12);},
	H:function(){return(this.getHours()<10?'0':'')+this.getHours();},
	i:function(){return(this.getMinutes()<10?'0':'')+this.getMinutes();},
	x:function(){return  (this.getMilliseconds() < 100 ? "0" + (this.getMilliseconds() < 10 ? "0" : "") : "") + this.getMilliseconds()  },
	s:function(){return(this.getSeconds()<10?'0':'')+this.getSeconds();},
	O:function(){return(this.getTimezoneOffset()<0?'-':'+')+(this.getTimezoneOffset()/60<10?'0':'')+(this.getTimezoneOffset()/60)+'00';},
	Z:function(){return this.getTimezoneOffset()*60;},
	r:function(){return this.toString();},
	U:function(){return this.getTime()/1000;}
};

function createField() {

	var tab = document.getElementById("units_table").getElementsByTagName('thead')[0];

	if (tab.innerHTML.indexOf("Łucznik") >= 0) {
		worldType = WORLD_ARCHERS;
	} else {
		worldType = WORLD_NONARCHERS;
	}
	var row = _$("tr");
	row.setAttribute('width', 'auto');
	tab.insertBefore(row, tab.getElementsByTagName('tr')[0]);
	
	var cell = _$("td");
	cell.setAttribute("colspan", tab.getElementsByTagName("th").length + 1);
	cell.innerHTML = "Cel: ";
	row.appendChild(cell);
	
	var field_filter = _$("input");
	field_filter.type = "text";
	field_filter.id = "filter";
	field_filter.size = "7";
	cell.appendChild(field_filter);
	cell.innerHTML += " Od: ";

	var field_ambit = _$("input");
	field_ambit.type = "text";
	field_ambit.size = "16";
	field_ambit.id = "beginTime";
	cell.appendChild(field_ambit);
	cell.innerHTML += " Do: ";
	
	var field_ambit = _$("input");
	field_ambit.type = "text";
	field_ambit.size = "16";
	field_ambit.id = "endTime";
	cell.appendChild(field_ambit);
	cell.innerHTML += " Wioski: ";

	var select = document.createElement('select');
	select.id = "unitNumber";
	var option1 = document.createElement('option');
	option1.text = "Wszystkie"
	option1.value = null;
	select.add(option1,null);
	var option2 = document.createElement('option');
	option2.text = "Zagrody";
	option2.value = "full";
	select.add(option2, null);
	var option3 = document.createElement('option');
	option3.text = "Fejki";
	option3.value = "fakes";
	select.add(option3, null);
	cell.appendChild(select);
	cell.innerHTML += "  Prędkość:";

	
	var speeds = ["35", "30", "22", "18", "11", "10", "9"];
	var select = document.createElement('select');
	select.id = "unitSpeed";
	for (var i = 0 ; i < 6; i++) {
		var option = document.createElement('option');
		option.text = speeds[i];
		option.value = speeds[i];
		select.add(option,null);
	}
	cell.appendChild(select);
	cell.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;";
	
	var field_ambit = _$("input");
	field_ambit.type = "button";
	field_ambit.id = "confirm";
	field_ambit.value = "Filtruj";
	cell.appendChild(field_ambit);
	cell.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	
	var field_ambit = _$("input");
	field_ambit.type = "button";
	field_ambit.id = "sendTimes";
	field_ambit.value = "Kiedy wysłać";
	cell.appendChild(field_ambit);
	//field_ambit.setAttribute("onclick", "calculateSendTimes();");
	
	window.addEventListener("click", function(event) { 
		if (event.target.id == "confirm") {filter_done = false; filter();}
		else if (event.target.id == "sendTimes") calculateSendTimes(); 
	}, true);
	fillSaved();
}

function calculateSendTimes() {
	var initialTime = GM_getValue("arrivalTime") != null ? GM_getValue("arrivalTime") : "";
	var arrivalTime = unsafeWindow.prompt("Podaj czas dotarcia wojska", initialTime);
	var unitSpeed = gid("unitSpeed").value;
	var tbodies = gid("units_table").tBodies;
	var target = gid("filter").value;
	if (!target.match(/[0-9]+[|,\/ ]{1}[0-9]+/)) return;
	var targetX = parseInt(target.split(/[|,\/ ]/)[0]);
	var targetY = parseInt(target.split(/[|,\/ ]/)[1]);
	
			
	var arrivalTimeArray = arrivalTime.split(/[- :]/g);
	if (arrivalTimeArray.length == 7) {
		var j = 0;
		for (j = 0; j < 7; j++) {
			if (arrivalTimeArray[j] != parseInt(arrivalTimeArray[j])) break;
		}
		if (j == 7) {
			GM_setValue('arrivalTime', arrivalTime);
		} else {
			alert("Zły format czasu");
			return;
		}
	} else {
		alert("Zły format czasu");
		return
	}

	arrivalTime = new Date(arrivalTimeArray[2], arrivalTimeArray[1] - 1, arrivalTimeArray[0]);
	arrivalTime.setHours(arrivalTimeArray[3]);
	arrivalTime.setMinutes(arrivalTimeArray[4]);
	arrivalTime.setSeconds(arrivalTimeArray[5]);
	arrivalTime.setMilliseconds(arrivalTimeArray[6]);
	
	for( i = 0; i < this.tbodies.length; i++ ) {
		if (tbodies[i].style.display != "none") {
			var villageName = tbodies[i].getElementsByTagName('span')[1].textContent;
			var coords = villageName.substring(villageName.lastIndexOf("(") + 1, villageName.lastIndexOf(")"));
			var villageX = coords.split("|")[0];
			var villageY = coords.split("|")[1];
					
			var distance = Math.sqrt(Math.pow(targetX - villageX, 2) + Math.pow( targetY - villageY, 2));
			var travelTime = distance * unitSpeed * 60 * 1000;
			travelTime = travelTime / 1000;
			travelTime = Math.round(travelTime);
			travelTime = travelTime * 1000;
			var launchTime = new Date();
			
			launchTime.setTime(arrivalTime.getTime() - travelTime);

			var row = tbodies[i].getElementsByTagName('tr')[0];
			if (row.lastChild.previousSibling.textContent == "Rozkazy"){
				var cell = document.createElement("td");
				row.appendChild(cell);
			}
			row.lastChild.innerHTML = launchTime.format("d.m\u00a0H:i:s:x");
			tbodies[i].id = -launchTime.getTime();
		} else {
			tbodies[i].id = 0;
		}
	}
}

function fillSaved() {
	gid("beginTime").value = GM_getValue("beginTime") != null ? GM_getValue("beginTime") : "";
	gid("endTime").value = GM_getValue("endTime") != null ? GM_getValue("endTime") : "";
	if (document.URL.match(/coords/)) {
		gid("filter").value = document.URL.substring(document.URL.indexOf("coords") + 7);
	} else {
		gid("filter").value = GM_getValue("calculatorTarget") != null ? GM_getValue("calculatorTarget") : "";
	}
	gid("unitNumber").selectedIndex = GM_getValue("unitNumber") != null ? GM_getValue("unitNumber") : 0;
	gid("unitSpeed").selectedIndex = GM_getValue("unitSpeed") != null ? GM_getValue("unitSpeed") : 0;
}

function saveForm() {
	GM_setValue( 'beginTime', gid("beginTime").value);
	GM_setValue( 'endTime', gid("endTime").value);
	GM_setValue( 'calculatorTarget', gid("filter").value);
	GM_setValue( 'unitNumber', gid("unitNumber").selectedIndex);
	GM_setValue( 'unitSpeed', gid("unitSpeed").selectedIndex);
}


function checkArmy(tbody ) { 
	
	var cells = tbody.getElementsByTagName('td');
	var spaceSum = 0;
	var machinePresent = false;
	var space;
	if (worldType == WORLD_ARCHERS) {
		var space = [1, 1, 1, 1, 2, 4, 5, 6, 6, 8, 10, 100];
	} else if (worldType == WORLD_NONARCHERS) {
		var space = [1, 1, 1, 2, 4, 6, 6, 8, 100];	
	}
	for (i = 2; i < space.length+2; i++ ) {
		spaceSum += (parseInt(cells[i].textContent) * space[i-2]);
	}
	//alert(spaceSum);
	if (worldType == WORLD_ARCHERS) {
		machinePresent = (parseInt(cells[10].textContent) > 0 || parseInt(cells[11].textContent) > 0)
	} else if (worldType == WORLD_NONARCHERS) {
		machinePresent = (parseInt(cells[8].textContent) > 0 || parseInt(cells[9].textContent) > 0)
	}

	if (gid("unitNumber").value == "full") {
		return (spaceSum > 17500);
	} else if  (gid("unitNumber").value == "fakes") {
		return (spaceSum > 120 && machinePresent); 
	} else {
		return true;
	}
}



function filter() {


	saveForm();
	
	var tbodies = gid("units_table").tBodies;
	var target = gid("filter").value;
	if (!target.match(/[0-9]+[|,\/ ]{1}[0-9]+/)) return;
	var targetX = parseInt(target.split(/[|,\/ ]/)[0]);
	var targetY = parseInt(target.split(/[|,\/ ]/)[1]);
		checkRows(tbodies, targetX, targetY);
	
	
	var th = gid("units_table").getElementsByTagName('thead')[0].getElementsByTagName('th')[0];
	
	if (th.parentNode.textContent.indexOf("Sortuj") == -1) {
		var newTH = document.createElement("th");
		newTH.innerHTML = "<a href='javascript:sort();'>Sortuj</a>";
		th.parentNode.appendChild(newTH);
	}
}


function tBodyRowComparer(a, b) {	
	return a.id > b.id;	
}


unsafeWindow.sort = function sort() {

	var tbodies = gid("units_table").tBodies;
	var tbodiesArray = Array();
	for (var i = 0; i < tbodies.length; i++) tbodiesArray[i] = tbodies[i];
	tbodiesArray.sort(function(a,b){return a.id > b.id;});
	reorderTable(gid("units_table"), tbodiesArray);


}


function Backgrounder( initialFunc ) {
	this.timeout = null;
	
	this.schedule = function( func ) {
		var self = this;
		this.timeout = setTimeout( function() { /*alert('a');*/self.execute( func ); }, 25);
	}
	
	this.execute = function( func ) {
	//	alert('z');
		this.timeout = null;
		func();
	}
	
	this.interrupt = function() {
		clearTimeout( this.timeout );
		this.timeout = null;
	}

	this.finished = function() {
		this.interrupt();
	}
	
	if( initialFunc != undefined ) { 
		initialFunc( this );
	}
}


function checkRows(tbodies, targetX, targetY) {
	this.inherits_from = Backgrounder;
	this.inherits_from();


	this.batchSize =10;
	this.tbodies = tbodies;
	this.counter = 0;
	var arrivalTime = new Date();
	var unitSpeed = gid("unitSpeed").value;
	
	var currentTime = document.getElementById("serverTime").textContent;
	var currentDate = document.getElementById("serverDate").textContent;
	var array =  (currentTime+" "+currentDate).split(/[: \/]/);
	var currentTime = new Date(array[5], array[4]-1, array[3], array[0], array[1], array[2], "0");
		
	var beginTime = gid("beginTime").value != "" ? gid("beginTime").value : "01-01-1970 00:00";
	var endTime = gid("endTime").value != "" ? gid("endTime").value : "31-12-2040 23:59";

	var beginTimeArray = beginTime.split(/[- :]/g);
	var endTimeArray = endTime.split(/[- :]/g);
	
	beginTime = new Date(beginTimeArray[2], beginTimeArray[1] - 1, beginTimeArray[0]);
	beginTime.setHours(beginTimeArray[3]);
	beginTime.setMinutes(beginTimeArray[4]);

	endTime = new Date(endTimeArray[2], endTimeArray[1] - 1, endTimeArray[0]);
	endTime.setHours(endTimeArray[3]);
	endTime.setMinutes(endTimeArray[4]);
	tbodies[0].id = -1;
	
	var tidPattern = new RegExp("t=[0-9]+");
	var tid = tidPattern.exec(document.URL);
	if (tid) {
		tid = "&t=" + tid.toString().substring(2);
	}

	this.process = function( i ) {
		if( i < this.tbodies.length -1 ) {
			for( j = i; j < i + this.batchSize && j < this.tbodies.length; j+=1 ) {
				var villageName = tbodies[j].getElementsByTagName('span')[1].textContent;
				var coords = villageName.substring(villageName.lastIndexOf("(") + 1, villageName.lastIndexOf(")"));
				var villageX = coords.split("|")[0];
				var villageY = coords.split("|")[1];

	
				var distance = Math.sqrt(Math.pow(targetX - villageX, 2) + Math.pow( targetY - villageY, 2));
				var travelTime = distance * unitSpeed * 60 * 1000;
				arrivalTime.setTime(currentTime.getTime() + travelTime);
				
				if ( arrivalTime.getTime() >= beginTime.getTime() && arrivalTime.getTime() <= endTime.getTime() && checkArmy(tbodies[j]) ) {
					tbodies[j].removeAttribute('style');
					var link = tbodies[j].getElementsByTagName('a')[2];

					link.href = link.href.replace(/place((&)?[^&]*)+/, "place&coords=" + gid('filter').value);
					if (tid){
						link.href += tid;
					}
					
					var row = tbodies[j].getElementsByTagName('tr')[0];
					if (row.lastChild.previousSibling.textContent == "Rozkazy"){
						var cell = document.createElement("td");
						row.appendChild(cell);
					}
					row.lastChild.innerHTML = arrivalTime.format("d.m\u00a0H:i");
					tbodies[j].id = arrivalTime.getTime();
					this.counter++;
				} else {
					tbodies[j].style.display = "none";
					var row = tbodies[j].getElementsByTagName('tr')[0];
					if (row.lastChild.previousSibling.textContent == "Rozkazy"){
						var cell = document.createElement("td");
						row.appendChild(cell);
					}
					tbodies[j].id = arrivalTime.getTime();
				}	
			}
			var self = this;
			var nextBitOfWork = function() { self.process( i+self.batchSize ) };
			this.schedule( nextBitOfWork );
		} else {
			document.getElementsByTagName('th')[1].innerHTML = ("Wioska (" + this.counter +")");
		}
	}
	this.process( 0 );



}

function reorderTable( table, array1) {
	this.inherits_from = Backgrounder;
	this.inherits_from();

	this.array1 = array1;
	this.batchSize = 25;

	this.process = function( i ) {
		if( i < this.array1.length ) {
			for( j = i; j < i+this.batchSize && j < this.array1.length; ++j ) {
				//alert(j);
				table.appendChild(array1[j]);
			}
			var self = this;
			var nextBitOfWork = function() { self.process( i+self.batchSize ) };
			this.schedule( nextBitOfWork );
		}
	}
	this.process( 0 );
}


// entry point
if (document.URL.match(/screen=place/) && document.URL.match(/coords/)) {
	var coords = document.URL.substring(document.URL.indexOf("coords") + 7);
	var x = coords.split(/[|,\/ ]/)[0];
	var y = coords.split(/[|,\/ ]/)[1];
	document.getElementById("inputx").value = x;
	if (document.URL.indexOf("t=") >= 0){
		document.getElementById("inputy").value = y.substring(0, y.indexOf("&"));			
	} else
		document.getElementById("inputy").value = y;	
} else if (document.URL.match(/screen=info_village/)) {
	var td = document.getElementById('content_value');
	var table = td.getElementsByTagName('table')[0].getElementsByTagName('table')[0];
	var newRow = document.createElement("tr");
	var newCell = document.createElement("td");
	newCell.setAttribute("colspan", "2");
	var coords = table.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].textContent;
	var tidPattern = new RegExp("t=[0-9]+");
	var tid = tidPattern.exec(document.URL);
	if (tid) {
		tid = "&t=" + tid.toString().substring(2);
	} else {
		tid = "";
	}
	newCell.innerHTML = "<a href='/game.php?mode=units&screen=overview_villages&type=own_home"+tid + "&coords=" + coords + "'>» Wpisz do kalkulatora</a>"
	newRow.appendChild(newCell);
	table.getElementsByTagName('tbody')[0].appendChild(newRow);
} else {
	createField();
}

