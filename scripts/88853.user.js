// ==UserScript==
// @name				Kalkulator czasów ataku
// @author				Szatdafakap
// @namespace			http://aturime.pl
// @description			brak opisu	
// @include			http://pl*.plemiona.pl/game.php*screen=overview_villages&mode=units*type=own_home*
// @include			http://pl*.plemiona.pl/game.php*screen=place*
// @include			http://pl*.plemiona.pl/game.php?*screen=info_village*
// ==/UserScript==

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

	var tab = document.getElementById("units_table");

	var row = _$("tr");
	row.setAttribute('width', 'auto');
	tab.insertBefore(row, tab.firstChild);
	
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
	var tbody = gid("units_table").tBodies[0];
	var rows = tbody.getElementsByTagName('tr');
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
	
	for( i = 1; i < this.rows.length-1; i+=2 ) {
		if (rows[i].style.display != "none") {
			var villageName = rows[i].textContent;
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

			if (rows[i+1].lastChild.nodeType == 3) {
				var cell = document.createElement("td");
				rows[i+1].appendChild(cell);
			}
			rows[i+1].lastChild.innerHTML = launchTime.format("d.m\u00a0H:i:s:x");
			rows[i+1].lastChild.id = -launchTime.getTime();
		} else {
			rows[i+1].lastChild.id = 0;
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


function checkArmy(tableRow ) { 
	
	var cells = tableRow.getElementsByTagName('td');
	var spaceSum = 0;
	var machinePresent = false;
	if (cells.length == 15 || cells.length == 14) {
		var space = [1, 1, 1, 1, 2, 4, 5, 6, 6, 8, 10, 100];
		var spaceSum = 0;
		for (i = 0; i < 12; i++ ) {
			spaceSum += (parseInt(cells[1 + i].textContent) * space[i]);
		}
		machinePresent = (parseInt(cells[9].textContent) > 0 || parseInt(cells[10].textContent) > 0)
	} else if (cells.length == 12) {
		var space = [1, 1, 1, 2, 4, 6, 6, 8, 100];
		var spaceSum = 0;
		for (i = 0; i < 9; i++ ) {
			spaceSum += (parseInt(cells[3 + i].textContent) * space[i]);
		}
		machinePresent = (parseInt(cells[9].textContent) > 0 || parseInt(cells[10].textContent) > 0)
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
	
	var tbody = gid("units_table").tBodies[0];
	var rows = tbody.getElementsByTagName('tr');
	var target = gid("filter").value;
	if (!target.match(/[0-9]+[|,\/ ]{1}[0-9]+/)) return;
	var targetX = parseInt(target.split(/[|,\/ ]/)[0]);
	var targetY = parseInt(target.split(/[|,\/ ]/)[1]);
		checkRows(rows, targetX, targetY);
	
	
	var th = tbody.getElementsByTagName('th')[0];
	
	if (th.parentNode.textContent.indexOf("Sortuj") == -1) {
		var newTH = document.createElement("th");
		newTH.innerHTML = "<a href='javascript:sort();'>Sortuj</a>";
		th.parentNode.appendChild(newTH);
	}
}


function rowsComparer(a,b) { 
	return a.lastChild.id > b.lastChild.id;	
}

function nextRowsComparer(a, b) {	
	return a.nextElementSibling.lastChild.id > b.nextElementSibling.lastChild.id;	
}

unsafeWindow.sort = function sort() {

	var tbody = gid("units_table").tBodies[0];
	var rows = tbody.getElementsByTagName('tr');
	var villageNames = Array();
	var villageArmys = Array();

	for (var i = 1; i < rows.length-1; i+=2) villageNames[(i-1)/2] = rows[i];
	for (var i = 2; i < rows.length; i+=2) villageArmys[(i-2)/2] = rows[i];

	villageNames.sort(nextRowsComparer);
	villageArmys.sort(rowsComparer);	
	
	reorderTable(tbody, villageNames, villageArmys);


}


function Backgrounder( initialFunc ) {
	this.timeout = null;
	
	this.schedule = function( func ) {
		var self = this;
		this.timeout = setTimeout( function() { self.execute( func ); }, 25 );
	}
	
	this.execute = function( func ) {
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


function checkRows(rows, targetX, targetY) {
	this.inherits_from = Backgrounder;
	this.inherits_from();


	this.batchSize = 100;
	this.rows = rows;
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
	
	this.process = function( i ) {
		if( i < this.rows.length -1 ) {
			for( j = i; j < i + this.batchSize && j < this.rows.length-1; j+=2 ) {
				var villageName = rows[j].textContent;
				var coords = villageName.substring(villageName.lastIndexOf("(") + 1, villageName.lastIndexOf(")"));
				var villageX = coords.split("|")[0];
				var villageY = coords.split("|")[1];
				
				var distance = Math.sqrt(Math.pow(targetX - villageX, 2) + Math.pow( targetY - villageY, 2));
				var travelTime = distance * unitSpeed * 60 * 1000;
				arrivalTime.setTime(currentTime.getTime() + travelTime);
				
				if ( arrivalTime.getTime() >= beginTime.getTime() && arrivalTime.getTime() <= endTime.getTime() && checkArmy(rows[j+1]) ) {
					rows[j].removeAttribute('style');
					rows[j+1].removeAttribute('style');	
					var link = rows[j+1].getElementsByTagName('a')[0];
					link.href = link.href.replace(/place(&)?[^&]*/, "place&coords=" + gid('filter').value);
					if (rows[j+1].lastChild.nodeType == 3) {
						var cell = document.createElement("td");
						rows[j+1].appendChild(cell);
					}
					rows[j+1].lastChild.innerHTML = arrivalTime.format("d.m\u00a0H:i");
					rows[j+1].lastChild.id = arrivalTime.getTime();
					this.counter++;
				} else {
					rows[j].style.display = "none";
					rows[j+1].style.display = "none";
					if (rows[j+1].lastChild.nodeType == 3) {
						var cell = document.createElement("td");
						rows[j+1].appendChild(cell);
					}
					rows[j+1].lastChild.id = arrivalTime.getTime();
				}	
			}
			var self = this;
			var nextBitOfWork = function() { self.process( i+self.batchSize ) };
			this.schedule( nextBitOfWork );
		} else {
			document.getElementsByTagName('th')[1].innerHTML = ("Wioska (" + this.counter +")");
		}
	}
	this.process( 1 );



}

function reorderTable( tbody, array1, array2 ) {
	this.inherits_from = Backgrounder;
	this.inherits_from();

	this.array1 = array1;
	this.array2 = array2;
	this.batchSize = 25;

	this.process = function( i ) {
		if( i < this.array1.length ) {
			for( j = i; j < i+this.batchSize && j < this.array1.length; ++j ) {
				tbody.appendChild(array1[j]);
				tbody.appendChild(array2[j]);
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
	document.getElementById("inputy").value = y;		
} else if (document.URL.match(/screen=info_village/)) {
	var td = document.getElementById('content_value');
	var table = td.getElementsByTagName('table')[0];
	var newRow = document.createElement("tr");
	var newCell = document.createElement("td");
	newCell.setAttribute("colspan", "2");
	//game.php?screen=overview_villages&mode=units&type=own_home
	var coords = table.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].textContent;
	newCell.innerHTML = "<a href='/game.php?screen=overview_villages&mode=units&type=own_home&coords=" + coords + "'>» Wpisz do kalkulatora</a>"
	newRow.appendChild(newCell);
	table.getElementsByTagName('tbody')[0].appendChild(newRow);
} else {
	createField();
}

