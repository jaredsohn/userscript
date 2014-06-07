// ==UserScript==
// @name			Ressourcen anfordern Erweiterung im Marktplatz
// @version			0.1.0
// @include 		http://*.die-staemme.*/game.php?*screen=market&mode=call*
// @include 		http://*.staemme.*/game.php?*screen=market&mode=call*
// ==/UserScript==


//***************************************************************************
//***                       tm4rkus_ress_anfordern.user.js
//**                       -------------------------
//**  author/copyright     : TM4rkuS/samrat
//**  
//***
//***************************************************************************/


(function(){

var version = "0.1.0";

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

function call() { 
	var requestedRess = [];
	for (var prop in settings.ress)
	{
	settings.requestedRess[prop] = document.getElementById("tm4rkus_callRessExtension_Requested_"+prop).value;
	settings.ress[prop] = document.getElementById("tm4rkus_callRessExtension_"+prop).value;
	requestedRess.push(document.getElementById("tm4rkus_callRessExtension_Requested_"+prop).value);
	}
	settings.percent = document.getElementById("tm4rkus_callRessExtension_percent").value;
	settings.storage = document.getElementById("tm4rkus_callRessExtension_storage").value;
	settings.traders = document.getElementById("tm4rkus_callRessExtension_traders").value;
	localStorage.setItem("tm4rkus_callRessExtension_settings", JSON.stringify(settings));
	
	if (document.getElementById("tm4rkus_callRessExtension_percent").value != "max")
	{
	var requestPercent = parseFloat(document.getElementById("tm4rkus_callRessExtension_percent").value);
	if(requestPercent > 100) 
	requestPercent = (confirm("Wirklich mehr als 100% der Ress einfügen, nach denen gefiltert wurde? Dies kann dazu führen, dass manche Anforderungen nicht ausgeführt werden können! Ein Klick auf \"Abbrechen\" setzt die Auswahl temporär auf 100%")) ? requestPercent:100;
	}
	else
	requestPercent = "max";
	var requestText = "Anfordern";
	var sumRequestedinputFields = document.getElementById("ress_sum").getElementsByTagName("tr")[1].getElementsByTagName("INPUT");
	for (var cellIndex = 0; cellIndex < sumRequestedinputFields.length; cellIndex++)
	{
	sumRequestedinputFields[cellIndex].nextSibling.innerHTML = "(0)";
	}
	
	if (location.href.match(/screen=market&mode=call/)) 
	{	
		var villageRessListRows = document.getElementById("village_list").rows;
		var singleRequestedinputFields = villageRessListRows[1].getElementsByTagName("INPUT");
		for (var rowIndex=2; rowIndex < villageRessListRows.length; rowIndex++)
		{	
			if(villageRessListRows[rowIndex].style.display != "none")
			{
				var callButton = villageRessListRows[rowIndex].getElementsByClassName("call_button")[0];
				if ((requestedRess != "0,0,0") && (callButton.value != requestText))
				{
				callButton.click();
				}
				
				if(callButton.value == requestText)
				{
					var ressInputs = villageRessListRows[rowIndex].getElementsByTagName("INPUT");
					for (var inputIndex=0; inputIndex < ressInputs.length - 1; inputIndex++)
					{
						var singleRequestedRess = parseInt(singleRequestedinputFields[inputIndex+4].value,10)
						var availableRess = parseInt(ressInputs[inputIndex].parentNode.title,10);
						if(requestPercent != "max")
						{
							var percentage = Math.round(singleRequestedRess/100*requestPercent);
						}
						else
						{
							percentage = availableRess;
						}
						var requestedRessis = parseInt((requestedRess[inputIndex] > percentage) ? percentage:requestedRess[inputIndex]);
						ressInputs[inputIndex].value = requestedRessis;
						ressInputs[inputIndex].size = requestedRessis.toString().length;
						requestedRess[inputIndex] = (parseInt(requestedRess[inputIndex],10) - requestedRessis);
						var inputField = sumRequestedinputFields[inputIndex].nextSibling;
						inputField.innerHTML = "(" + (parseInt(inputField.innerHTML.match(/\d+/),10) + requestedRessis) + ")";
					}
				}
			}
		
		}
	}
}

function filter() {

	var timeCell = document.getElementById("tm4rkus_callExtension_Distance")
	var time = timeCell.value;
	var hours = time.split(":")[0];
	var minutes = time.split(":")[1];
	if ((time.length == 5 && hours.length == 2 && minutes.length == 2 && parseInt(minutes) < 60) || (time == ""))
	{
		var span = document.getElementById("tm4rkus_callExtension_Distance").parentNode.getElementsByTagName("span")[0];
		span.innerHTML = span.innerHTML.replace(/<font color=\"red\">hh:mm<\/font>$/, "hh:mm")
		var minutes = parseInt(hours)*60 + parseInt(minutes);
		var villageRessListRows = document.getElementById("village_list").rows;
		
		
		var total = villageRessListRows.length-2;
		var relative = 0;
		var imgs = villageRessListRows[0].getElementsByTagName("img");
		var cells = villageRessListRows[2].getElementsByTagName("td");
		var pattern = new RegExp(/(.+) (\(\d+\|\d+\)) (K\d+)/);		
		
		for (var rowIndex = 2; rowIndex < villageRessListRows.length; rowIndex++)
		{
			var rowRessInputs = villageRessListRows[rowIndex].getElementsByTagName("td");
			var visible = "";
			for (var cellIndex = 0; cellIndex < cells.length-1; cellIndex++)
			{
			if (cellIndex == 0)
			{
				for (var i = 1; i <= 3; i++)
				{
					var subStr = villageRessListRows[rowIndex].getElementsByTagName("td")[0].textContent.match(pattern)[i];
					var name = villageRessListRows[1].getElementsByTagName("input")[i-1].value;
					name = (i != 3) ? name.replace(/\|/, "\\|"):name;
					name = (!name == "") ? new RegExp(name):"";
					visible = (((subStr.match(name)) || name == "") ? visible:"none");
				}
			}
			else if(cellIndex == 1)
			{
				var name = minutes;
				var needed_time = villageRessListRows[rowIndex].getElementsByTagName("td")[cellIndex].textContent;
				var needed_hours = parseInt(needed_time.split(":")[0],10);
				var needed_minutes = parseInt(needed_time.split(":")[1],10);
				needed_minutes = needed_hours*60 + needed_minutes;
				visible = ((needed_minutes <= minutes) || time == "") ? visible:"none";
			}
			else
			{	
				var name = villageRessListRows[1].getElementsByTagName("input")[cellIndex+2].value;
				var buttonValue = villageRessListRows[rowIndex].getElementsByTagName("td")[cells.length-1].getElementsByTagName("input")[0].value;
				var value = rowRessInputs[cellIndex].title;
				value = (value != "") ? value.replace(/\./, ""):0;
				visible	= (((parseInt(value)) >= parseInt(name) || name == "") ? visible:"none");
			}
			}
			relativ = (visible == "") ? relative++:relative;
			villageRessListRows[rowIndex].style.display = visible;
		}
		villageRessListRows[1].getElementsByTagName("input")[cells.length+2].value = "Einsetzen (" + relative + "/" + total + ")";
	}
	else
	{
	var span = document.getElementById("tm4rkus_callExtension_Distance").parentNode.getElementsByTagName("span")[0];
	span.innerHTML = span.innerHTML.replace(/hh:mm$/, "<font color=\"red\">hh:mm<\/font>");
	}
}

function createMenu() {

	//Ress-Inputs
	if(!settings.ress["holz"] || !settings.requestedRess["holz"])
	{
		settings.ress["holz"] = 0;
		settings.requestedRess["holz"] = 0;
		settings.ress["lehm"] = 0;
		settings.requestedRess["lehm"] = 0;
		settings.ress["eisen"] = 0;
		settings.requestedRess["eisen"] = 0;
		localStorage.setItem("tm4rkus_callRessExtension_settings", JSON.stringify(settings));
	}
	
	// ************** Tabelle umstellen ************** //
	var content = document.getElementById("content_value");
	var ress_table = content.getElementsByTagName("table")[2];
	//Zeile Menü/gesamte Anforderung erstellen
	var row = ress_table.appendChild(document.createElement("tr"));
	var menu = document.getElementsByClassName("vis modemenu")[0].parentNode;	
	menu.width = "100";
	row.appendChild(menu);
	
	//Zeilenihalt Menü/gesamte Anforderung erstellen
	var total_call = document.createElement("td");
	total_call.vAlign = "top";
	total_call.width = "*"
	var head = total_call.appendChild(document.createElement("h3"));
	head.textContent = "Gesamte Anforderung";
	var div = total_call.appendChild(document.createElement("div"));
	div.classname = "vis";
	div.style.marginBottom = "0px";
	var ress_sum = div.appendChild(document.createElement("table"));
	ress_sum.classname = "vis overview_table";
	//ress_sum.width = "100%";
	ress_sum.id = "ress_sum";
	ress_sum.style.border = "1px solid rgb(125, 81, 15)";
	var head = ress_sum.appendChild(document.createElement("thead"));
	var thead = head.appendChild(document.createElement("tr"));
	var body = ress_sum.appendChild(document.createElement("tbody"));
	var tbody = body.appendChild(document.createElement("tr"));
	for (var prop in settings.requestedRess)
	{
		var hcell = thead.appendChild(document.createElement("th"));
		hcell.style.textAlign = "center";
		var text = hcell.appendChild(document.createElement("span"));
		text.textContent = prop.replace(/./, prop[0].toUpperCase()) + " ";
		var img = text.appendChild(document.createElement("img"));
		img.src = "http://forum.die-staemme.de/staemme/smilies/"+prop+".png";
		
		var bcell = tbody.appendChild(document.createElement("td"));
		bcell.style.backgroundColor = "rgb(244, 228, 188)";
		var input = bcell.appendChild(document.createElement("input"));
		input.id = "tm4rkus_callRessExtension_Requested_"+prop;
		input.size = 6;
		input.value = settings.requestedRess[prop];
		input.addEventListener('blur', function() 
			{
				if(isNaN(this.value) || this.value == "") 
				{
					this.value = 0;
				}
			}, false);
		var insert = bcell.appendChild(document.createElement("td"));
		insert.textContent = "(0)";
	}
	row.appendChild(total_call);
	
	var call_ress = document.getElementsByClassName("vis overview_table")[0].parentNode;
	call_ress.setAttribute("colspan",2);

	//Einzelanforderung/Dörferliste
	var row = ress_table.appendChild(document.createElement("tr"));
	row.appendChild(call_ress);
	
	// ************** Tabellenumstellung Ende ************** //
	
	var villageRessListRows = document.getElementById("village_list").rows;
	
	var row = document.createElement("tr");
	var texts = ["Name:", "Koords:", "Kontinent:"];
	var td = row.appendChild(document.createElement("td"));
	for (var i = 0; i < texts.length; i++)
	{
	var text = td.appendChild(document.createElement("td"));
	text.innerHTML = texts[i];
	var input = text.appendChild(document.createElement("input"));
	input.type = "text";
	input.size = 3;
	input.cell = "0";
	input.id = "tm4rkus_callExtension_"+texts[i];
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
	
	for (var prop in settings.ress)
	{
		var td = row.appendChild(document.createElement("td"));
		td.style.textAlign = "center";
		var input = td.appendChild(document.createElement("input"));
		input.type = "text";
		input.size = 6;
		input.id = "tm4rkus_callRessExtension_"+prop;
		input.value = settings.ress[prop];
		input.addEventListener("keyup", filter, false);
			input.addEventListener('blur', function() 
			{
				if(isNaN(this.value) || this.value == "") 
				{
					this.value = 0;
				}
			}, false);
	}
		
		var td = row.appendChild(document.createElement("td"));
		td.style.textAlign = "center";
		var input = td.appendChild(document.createElement("input"));
		input.type = "text";
		input.size = 6;
		input.id = "tm4rkus_callRessExtension_storage";
		input.value = settings.storage;
		input.addEventListener("keyup", filter, false);
			input.addEventListener('blur', function() 
			{
				if(isNaN(this.value)) 
				{
					this.value = "";
				}
			}, false);
			
		var td = row.appendChild(document.createElement("td"));
		td.style.textAlign = "center";
		var input = td.appendChild(document.createElement("input"));
		input.type = "text";
		input.size = 6;
		input.id = "tm4rkus_callRessExtension_traders";
		input.value = settings.traders;
		input.addEventListener("keyup", filter, false);
			input.addEventListener('blur', function() 
			{
				if(isNaN(this.value)) 
				{
					this.value = "";
				}
			}, false);
	
		var td = row.appendChild(document.createElement("td"));
		var input = td.appendChild(document.createElement("input"));
		input.type = "text";
		input.id = "tm4rkus_callRessExtension_percent";
		input.size = 6;
		input.title = "Bei 100% werden genau so viele Ressourcen eingetragen, wie hier festgelegt.  Bei \"max\" werden so lange alle Ressourcen einer Art aus einem Dorf eingetragen, bis die Anzahl der insgesamt angeforderten Ressourcen für diese Einheit erreicht ist.";
		input.value = (!settings.percent) ? "10":settings.percent;
		var text = td.appendChild(document.createTextNode("% schicken"));
		var button = td.appendChild(document.createElement("input"));
		button.type = "button";
		button.value = "Einsetzen";
		button.title = "Script by TM4rkuS & samrat. Thanks for using it.";
		button.addEventListener("click", call, false);
		
		villageRessListRows[1].parentNode.insertBefore(row, villageRessListRows[1]);
		
		// ****** Titel festlegen ****** //
		
		for (var rowIndex=2; rowIndex < villageRessListRows.length; rowIndex++)
		{
			var ressInputs = villageRessListRows[rowIndex].getElementsByTagName("TD");
			
			for (var inputIndex=2; inputIndex < 7; inputIndex++)
			{
				if(!ressInputs[inputIndex].title) 
				{
					ressInputs[inputIndex].title = ressInputs[inputIndex].textContent.replace(/\./, "");
				}
			}
		}
}





if(checkExistence(localStorage["tm4rkus_callRessExtension_settings"]))
{
	var settings = JSON.parse(localStorage.getItem("tm4rkus_callRessExtension_settings"))
	if (!settings.requestedRess || !settings.ress)
	{
		settings["requestedRess"] = {};
		settings["ress"] = {};
		localStorage.setItem("tm4rkus_callRessExtension_settings", JSON.stringify(settings));
	}
}
else
{
	var settings = 
	{ 
		version: version,
		requestedRess: {},
		ress: {},
		RegExp: "",
		distance: "",
		storage: "",
		traders: "",
		percent: "10",
	}
	localStorage.setItem("tm4rkus_callRessExtension_settings", JSON.stringify(settings));
}

//Main
createMenu();
filter();
})();