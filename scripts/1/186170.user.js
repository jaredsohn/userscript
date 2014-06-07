// ==UserScript==
// @name			SOF
// @version			0.6.2
// @include 		http://*.die-staemme.*/game.php?*screen=place*
// @include 		http://*.staemme.*/game.php?*screen=place*
// @include 		http://*.plemiona.*/game.php?*screen=place*
// ==/UserScript==


//***************************************************************************
//***                       tm4rkus_truppen_anfordern.user.js
//**                       -------------------------
//**  author/copyright     : TM4rkuS/samrat
//**  
//***
//***************************************************************************/


(function(){

var version = "0.6.2";
var relative = 0;
var win = window.opera?window:unsafeWindow;
var game_data = win.game_data;
var previousRuntime = -1;
if (location.href.split(".")[0].replace(/http:\/\//, "").match(/pl/))
{
	var texts = 
	{
		request: "Wezwij",
		send: "wyślij",
		insert: "wstaw",
		fields: "pola",
	};
}
else
{
	var texts = 
	{
		request: "Anfordern",
		send: "schicken",
		insert: "Einsetzen",
		fields: "Felder",
	};
}

function get_world_config(param,Welt){/*Credits: Jano1*/
		var xmlhttp=new XMLHttpRequest();
		if(Welt.match(/de/))
		var url = 'http://'+Welt+'.die-staemme.de/interface.php?func='+param;
		if(Welt.match(/nl/))
		var url = 'http://'+Welt+'.tribalwars.nl/interface.php?func='+param;
		if(Welt.match(/pl/))
		var url = 'http://'+Welt+'.plemiona.pl/interface.php?func='+param;
		xmlhttp.open("GET",url,false);xmlhttp.send();
		var xmlDoc=xmlhttp.responseXML;	
		
		if(param == 'get_building_info'){
			var data_stand ={main:0,barracks:0,stable:0,garage:0,smith:0,place:0,statue:0,market:0,wood:0,stone:0,iron:0,farm:0,storage:0,hide:0,wall:0,snob:0,church:0,church_f:0};
			var inData_stand = {'max_level':0,'min_level':0,'wood':0,'stone':0,'iron':0,'pop':0,'wood_factor':0,'stone_factor':0,'iron_factor':0,'pop_factor':0,'build_time':0,'build_time_factor':0};
		}
		if(param == 'get_unit_info'){
			var data_stand ={spear:0,sword:0,axe:0,archer:0,spy:0,light:0,marcher:0,heavy:0,ram:0,catapult:0,knight:0,snob:0,miliz:0};
			var inData_stand = {'wood':0,'stone':0,'iron':0,'pop':0,'attack':0,'defense':0,'defense_kav':0,'defense_arch':0,'speed':0,'carry':0,'build_time':0};
		}
		
		var buildings, building, info, name, name_2; var count = 0; 
		var data = data_stand;
		buildings = xmlDoc.firstChild.childNodes;
		
		for (var i = 0; i < buildings.length; i++){
			building = buildings[i].childNodes;
			name = buildings[i].tagName;
			if(name != undefined){	
				if(param == 'get_building_info'){
					var inData = {'max_level':0,'min_level':0,'wood':0,'stone':0,'iron':0,'pop':0,'wood_factor':0,'stone_factor':0,'iron_factor':0,'pop_factor':0,'build_time':0,'build_time_factor':0};
				}
				if(param == 'get_unit_info'){
					var inData = {'wood':0,'stone':0,'iron':0,'pop':0,'attack':0,'defense':0,'defense_kav':0,'defense_arch':0,'speed':0,'carry':0,'build_time':0};
				}
				for (var ii = 0; ii < building.length; ii++){
					name_2 = building[ii].tagName;
					if(name_2 != undefined){
						inData[name_2] = building[ii].firstChild.nodeValue;
					}
				}
				data[name] = inData;
				count++;
			}
		}
		return data;
	} 
	
function getServerRuntimes(server_id) {
	var server_infos = (get_world_config("get_unit_info",server_id));
	var serverRuntimes = {}
	for (var prop in server_infos)
	{
	if (server_infos[prop].speed != undefined && prop != "snob" && prop != "militia")
	serverRuntimes[prop] = Math.round(server_infos[prop].speed);
	}
	return serverRuntimes;
}

function getSlowestUnit() {
var runtime = 0;
for (var prop in server_runtimes)
{
runtime = (parseInt(document.getElementById("tm4rkus_callExtension_"+prop).value,10) > 0 && server_runtimes[prop] > runtime) ? server_runtimes[prop]:runtime;
}
return runtime;
}


function getValue(array, String) {
	for (var i = 0; i < array.length; i++)
	if (array[i].src.match(String)) 
	{
	return (i+2);
	}

}

function checkExistence(object) {
	if (navigator.userAgent.indexOf("Opera") != -1)
	{
		if ((typeof(object) != "undefined") && (typeof(object) != undefined))
		{
			return true;
		}
		else 
			return false;
	}
	else if (navigator.userAgent.indexOf("Firefox") != -1)
	{
		if (object != null)
			return true;
		else
			return false;
	}
}

//Anfordern ausfüllen 
/* ** Thanks to Samrat ** */
function call() {	
	
	var percentField = document.getElementById("tm4rkus_callExtension_percent").value;
	settings["percent"] = percentField;
	save();
	if (!percentField.match(/max|min/))
	{
		requestPercent = parseFloat(percentField);
	}
	else if (percentField.match("max$|min$"))
	{	
		requestPercent = percentField;
	}
	
	var sumRequestedinputFields = document.getElementById("support_sum").getElementsByTagName("tr")[2].getElementsByTagName("INPUT");
	for (var cellIndex = 0; cellIndex < sumRequestedinputFields.length; cellIndex++)
	{
	sumRequestedinputFields[cellIndex].nextSibling.innerHTML = "(0)";
	}
		
	var villageTroupListRows = document.getElementById("village_troup_list").rows;
	var singleRequestedinputFields = villageTroupListRows[1].getElementsByTagName("input");
	var fittingVillages = relative;
	for (var rowIndex=2; rowIndex < villageTroupListRows.length; rowIndex++)
	{	
	
		if(villageTroupListRows[rowIndex].style.display != "none")
		{
			var callButton = villageTroupListRows[rowIndex].getElementsByClassName("call_button")[0];
			if(!callButton.value.match(texts.request))
			{
			callButton.click();
			}
			if(callButton.value.match(texts.request))
			{
				var troupInputs = villageTroupListRows[rowIndex].getElementsByTagName("input");
				for (var inputIndex=0; inputIndex < troupInputs.length - 1; inputIndex++)
				{
					var singleRequesteTroops = parseInt(singleRequestedinputFields[inputIndex+4].value,10)
					var availableTroops = parseInt(troupInputs[inputIndex].parentNode.units);
					if(!requestPercent.toString().match(/max|min/))
					{
						requestPercent = (isNaN(requestPercent)) ? 0:requestPercent;
						var percentage = Math.round(singleRequesteTroops/100*requestPercent);
						percentage = (percentage < availableTroops) ? percentage:availableTroops;
					}
					else
					{
						//+0.499 führt zu (fast) generellem aufrunden.
						//+0.5 würde immer zum aufrunden führen. Wenn man allerdings zum Beispiel 1 hat, würde aus 1 durch das 
						//addieren 1.5 und Math.round macht aus 1.5 eine 2 -> ungewollter Effekt
						var min = Math.round((requestedUnits[inputIndex] / fittingVillages) + 0.499); 
						percentage = (requestPercent == "max" || min > availableTroops) ? availableTroops:min;
					}
					var requestedTroops = (requestedUnits[inputIndex] > percentage) ? percentage:requestedUnits[inputIndex];
					if(!troupInputs[inputIndex].units) 
					{
						troupInputs[inputIndex].units = troupInputs[inputIndex].value;
					}
					troupInputs[inputIndex].value = requestedTroops;
					troupInputs[inputIndex].size = requestedTroops.toString().length;
					requestedUnits[inputIndex] = (requestedUnits[inputIndex] - requestedTroops);
					var inputField = sumRequestedinputFields[inputIndex].nextSibling;
					inputField.innerHTML = "(" + (parseInt(inputField.innerHTML.match(/\d+/), 10) + requestedTroops) + ")";
				}
			}
		fittingVillages--;
		}
	}
}

function filter() {
	var timeCell = document.getElementById("tm4rkus_callExtension_Distance")
	var time = timeCell.value;
	var hours = time.split(":")[0];
	var minutes = time.split(":")[1];
	if ((time.length == 5 && hours.length == 2 && minutes.length == 2 && parseInt(minutes, 10) < 60) || (time == ""))
	{
		getRuntimesByDistance();
		var span = document.getElementById("tm4rkus_callExtension_Distance").parentNode.getElementsByTagName("span")[0];
		span.innerHTML = span.innerHTML.replace(/<font color=\"red\">hh:mm<\/font>$/, "hh:mm")
		var minutes = parseInt(hours, 10)*60 + parseInt(minutes, 10);
		var runtime = getSlowestUnit();
		
		var distance = !isNaN(minutes / runtime) ? minutes / runtime:"";
		var villageTroupListRows = document.getElementById("village_troup_list").rows;
		
		var total = villageTroupListRows.length-2;
		relative = 0;
		var imgs = villageTroupListRows[0].getElementsByTagName("img");
		var cells = villageTroupListRows[2].getElementsByTagName("td");
		var pattern = new RegExp(/(.+) (\(\d+\|\d+\)) (K\d+)/);		
		
		for (var rowIndex = 2; rowIndex < villageTroupListRows.length; rowIndex++)
		{
			var rowTroupInputs = villageTroupListRows[rowIndex].getElementsByTagName("td");
			var visible = "";
			for (var cellIndex = 0; cellIndex < cells.length-1; cellIndex++)
			{
			if (cellIndex == 0)
			{
				for (var i = 1; i <= 3; i++)
				{
					var subStr = villageTroupListRows[rowIndex].getElementsByTagName("td")[0].textContent.match(pattern)[i];
					var name = villageTroupListRows[1].getElementsByTagName("input")[i-1].value;
					name = (i != 3) ? name.replace(/\|/, "\\|"):name;
					name = (!name == "") ? new RegExp(name):"";
					visible = (((subStr.match(name)) || name == "") ? visible:"none");
				}
			}
			else if(cellIndex == 1)
			{
				var selfCoords = game_data.village.coord;
				var selfX = selfCoords.split("|")[0];
				var selfY = selfCoords.split("|")[1];
				var callFromCoords = rowTroupInputs[0].textContent.match(/(.+) \((\d+\|\d+)\) (K\d+)/)[2];
				var callFromX = callFromCoords.split("|")[0];
				var callFromY = callFromCoords.split("|")[1];
				var DiffX = parseFloat(selfX - callFromX);
				var DiffY = parseFloat(selfY - callFromY);
				
				var realDistance = Math.sqrt(DiffX*DiffX+DiffY*DiffY);
				var name = distance;
				visible = (((realDistance <= distance) || distance == "") ? visible:"none");
			}
			else
			{	
				var name = villageTroupListRows[1].getElementsByTagName("input")[cellIndex+2].value;
				var buttonValue = villageTroupListRows[rowIndex].getElementsByTagName("td")[cells.length-1].getElementsByTagName("input")[0].value;
				if (buttonValue.match(texts.request))
				{
					if (!rowTroupInputs[cellIndex].getElementsByTagName("input")[0].units)
					{
						var value = rowTroupInputs[cellIndex].getElementsByTagName("input")[0].value;
					}
					else
					{
						var value = rowTroupInputs[cellIndex].getElementsByTagName("input")[0].units;
						rowTroupInputs[cellIndex].getElementsByTagName("input")[0].value = rowTroupInputs[cellIndex].getElementsByTagName("input")[0].units;
						rowTroupInputs[cellIndex].getElementsByTagName("input")[0].size = rowTroupInputs[cellIndex].getElementsByTagName("input")[0].value.length;
					}
				}
				else
				{
					var value = rowTroupInputs[cellIndex].textContent;
				}
				visible	= (((parseInt(value, 10)) >= parseInt(name, 10) || name == "") ? visible:"none");
			}
			}
			visible == "" ? relative++:relative;
			villageTroupListRows[rowIndex].style.display = visible;
		}
		villageTroupListRows[1].getElementsByTagName("input")[cells.length+2].value = texts.insert + " (" + relative + "/" + total + ")";
	}
	else
	{
	var span = document.getElementById("tm4rkus_callExtension_Distance").parentNode.getElementsByTagName("span")[0];
	span.innerHTML = span.innerHTML.replace(/hh:mm$/, "<font color=\"red\">hh:mm<\/font>");
	}
	insertByPercents();
}

function save() {

	requestedUnits = [];
	for (var prop in settings.units)
	{
	settings.requestedUnits[prop] = document.getElementById("tm4rkus_callExtension_Requested_"+prop).value;
	settings.units[prop] = document.getElementById("tm4rkus_callExtension_"+prop).value;
	requestedUnits.push(document.getElementById("tm4rkus_callExtension_Requested_"+prop).value);
	}
	localStorage.setItem("tm4rkus_callExtension_settings", JSON.stringify(settings));
	insertByPercents();
}

function insertByPercents() {
	
	var value = document.getElementById("tm4rkus_callExtension_percent").value;
	if (!value.match(/max|min/))
	{
		var value = (isNaN(parseFloat(value))) ? 0:parseFloat(value)/100;
		for (var prop in settings.units)
		{
			var inputField = document.getElementById("tm4rkus_callExtension_"+prop);
			inputField.nextSibling.innerHTML = " (" + Math.round((parseInt(inputField.value, 10) * value)) + ")";
		}
	}
	else if (value == "max")
	{
		for (var prop in settings.units)
		{
			var inputField = document.getElementById("tm4rkus_callExtension_"+prop);
			inputField.nextSibling.innerHTML = " (max)";
		}
	}
	else if (value == "min")
	{
		for (var prop in settings.units)
		{
			var inputField = document.getElementById("tm4rkus_callExtension_"+prop);
			inputField.nextSibling.innerHTML = "(" + Math.round((settings.requestedUnits[prop] / relative)+0.499) + ")";
		}
	}
}

function getRuntimesByDistance() {
	var villageTroupListRows = document.getElementById("village_troup_list").rows;
		for (var rowIndex=2; rowIndex < villageTroupListRows.length; rowIndex++)
		{
			var cells = villageTroupListRows[rowIndex].getElementsByTagName("TD");
			var runtime = getSlowestUnit();
			if (previousRuntime != runtime)
			{
				if (runtime != 0)
				{
					var selfCoords = game_data.village.coord;
					var selfX = selfCoords.split("|")[0];
					var selfY = selfCoords.split("|")[1];
					var callFromCoords = cells[0].textContent.match(/(.+) \((\d+\|\d+)\) (K\d+)/)[2];
					var callFromX = callFromCoords.split("|")[0];
					var callFromY = callFromCoords.split("|")[1];
					var DiffX = parseFloat(selfX - callFromX);
					var DiffY = parseFloat(selfY - callFromY);
					
					var realDistance = Math.sqrt(DiffX*DiffX+DiffY*DiffY);
					
					var secs = ("0" + Math.round((realDistance*runtime*60)% 60)).substr(-2);
					var mins = ("0" + Math.floor((realDistance*runtime)% 60)).substr(-2);
					var hours = Math.floor(realDistance*runtime/60);  
					cells[1].textContent = hours + ":" + mins + ":" + secs;
				}
				else
				{
					cells[1].textContent = cells[1].units + " " + texts.fields;
				}
			}
		}
	previousRuntime = runtime;
}

function createMenu() {
	
	//Gruppen-Links modifizieren;
	if (location.href.match(/&page=-1/))
	{
		var vis_item = document.getElementsByClassName("vis_item")[0];
		var links = vis_item.getElementsByTagName("a");
		for (var i = 0; i < links.length; i++)
		{
			links[i].href += "&page=-1";
		}
	}

	var villageTroupListRows = document.getElementById("village_troup_list").rows;
	
	//Einheiten-Inputs
	if(!settings.units["spear"] || !settings.requestedUnits["spear"])
	{
		var imgs = villageTroupListRows[0].getElementsByTagName("img");
		for (var i = 0; i < imgs.length; i++)
		{	
			settings.requestedUnits[imgs[i].src.match(/unit_(.+)\./)[1]] = "0";
			settings.units[imgs[i].src.match(/unit_(.+)\./)[1]] = "0";
			localStorage.setItem("tm4rkus_callExtension_settings", JSON.stringify(settings));
		}
	}
	
	//Gesamt-Request
	var sup_table = document.getElementById("support_sum");
	var row = document.createElement("tr");
	var cellIndex = 0;
	for (var prop in settings.units)
	{
	
		var td = row.appendChild(document.createElement("td"));
		var input = td.appendChild(document.createElement("input"));
		input.type = "text";
		input.size = 4;
		input.id = "tm4rkus_callExtension_Requested_"+prop;
		input.cell = prop;
		input.value = settings.requestedUnits[prop];
		//input.addEventListener("keyup", filter, false);
			input.addEventListener('blur', function() 
			{
				if(isNaN(this.value) || this.value == "") 
				{
					this.value = 0;
				}
			}, false);
			input.addEventListener('keyup', function () 
			{
			this.size = (this.value.length > 4) ? this.value.length:4;
			save();
			}, false);
		var text = td.appendChild(document.createElement("td"));
		text.innerHTML = "(0)";
	}
	sup_table.appendChild(row);
	
	//Einzeldorf-Request
	var row = document.createElement("tr");
	var names = ["Name:", "Koords:", "Kontinent:"];
	var td = row.appendChild(document.createElement("td"));
	for (var i = 0; i < names.length; i++)
	{
	var text = td.appendChild(document.createElement("td"));
	text.innerHTML = names[i];
	var input = text.appendChild(document.createElement("input"));
	input.type = "text";
	input.size = 3;
	input.cell = "0";
	input.id = "tm4rkus_callExtension_"+names[i];
	input.addEventListener("keyup", filter, false);
	}
	
	var td = row.appendChild(document.createElement("td"));
	var text = td.appendChild(document.createElement("td"));
	text.innerHTML = "Max.Laufzeit:";
	var input = td.appendChild(document.createElement("input"));
	input.type = "text";
	input.size = 4;
	input.id = "tm4rkus_callExtension_Distance";
	input.title = "Wenn nichts eingegeben ist, wird die Zeit nicht beachtet. Wenn etwas eingegeben ist, muss die Eingabe in Form von hh:mm erfolgen";
	input.RegExp = "(.+)";
	input.cell = "1"
	input.value = settings.distance;
	var text = td.appendChild(document.createElement("span"));
	text.innerHTML = " hh:mm";
	input.addEventListener("keyup", filter, false);

	for (var prop in settings.units)
	{
		var td = row.appendChild(document.createElement("td"));
		var input = td.appendChild(document.createElement("input"));
		input.type = "text";
		input.size = 4;
		input.id = "tm4rkus_callExtension_"+prop;
		input.cell = prop;
		input.value = settings.units[prop];
		input.addEventListener("keyup", filter, false);
			input.addEventListener('blur', function() 
			{
				if(isNaN(this.value) || this.value == "") 
				{
					this.value = 0;
					filter();
				}
			}, false);
		var span = td.appendChild(document.createElement("span"));
		span.style.fontSize = "xx-small";
	}

	var td = row.appendChild(document.createElement("td"));
	var input = td.appendChild(document.createElement("input"));
	input.type = "text";
	input.id = "tm4rkus_callExtension_percent";
	input.size = 3;
	input.title = "Bei 100% werden genau so viele Truppen eingetragen, wie hier festgelegt. Sobald mehr als 100% hier angegeben werden, wird um den entsprechen Faktor erweitert. Sind nicht genug Truppen im Dorf, wird die maximal-Anzahl eingetragen. Bei \"max\" werden so lange alle Einheiten einer Art aus einem Dorf eingetragen, bis die Anzahl der insgesamt angeforderten Truppen für diese Einheit erreicht ist.";
	input.value = (!settings.percent) ? "10":settings.percent;
	input.addEventListener("keyup", insertByPercents, false);
	input.addEventListener('blur', function() 
			{
				if((isNaN(this.value) || this.value == "") && (!this.value.match(/max|min/))) 
				{
					this.value = 100;
					filter();
				}
			}, false);
	var text = td.appendChild(document.createTextNode("% "+texts.send));
	var button = td.appendChild(document.createElement("input"));
	button.type = "button";
	button.value = texts.insert;
	button.title = "Script by TM4rkuS & samrat. Thanks for using it.";
	button.addEventListener("click", call, false);


	villageTroupListRows[1].parentNode.insertBefore(row, villageTroupListRows[1]);
	
	for (var rowIndex=2; rowIndex < villageTroupListRows.length; rowIndex++)
	{
		var troupInputs = villageTroupListRows[rowIndex].getElementsByTagName("TD");
		var inputIndex = 1;
		for (var prop in settings.units)
		{
			troupInputs[inputIndex].units = troupInputs[inputIndex].textContent;
			inputIndex++;
		}
	}
	
}


if(checkExistence(localStorage["tm4rkus_callExtension_settings"]))
{
	var settings = JSON.parse(localStorage.getItem("tm4rkus_callExtension_settings"))
	if (!settings.requestedUnits)
	{
		settings["requestedUnits"] = {};
		localStorage.setItem("tm4rkus_callExtension_settings", JSON.stringify(settings));
	}
}
else
{
	var settings = 
	{ 
		version: version,
		requestedUnits: {},
		units: {},
		RegExp: "",
		distance: "",
		percent: "100",
	}
	localStorage.setItem("tm4rkus_callExtension_settings", JSON.stringify(settings));
}

var requestedUnits = [];

//Main
if (location.href.match(/mode=call/))
{
	var server_runtimes = getServerRuntimes(location.host.split(".")[0]);
	createMenu();
	filter();
	save();
}

//Anfordern-Link modifizieren
var vis_modemenu = document.getElementsByClassName("vis modemenu")[0];
var links = vis_modemenu.getElementsByTagName("a");
var link = links[links.length-1]
link.href += "&page=-1";
})();