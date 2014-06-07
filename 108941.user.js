// ==UserScript==
// @name			Doerfer lokal umbenennen
// @version			0.5.0
// @author			TM4rkuS
// @include			http://*.die-staemme.*/game.php?*
// @include			http://*.staemme.*/game.php?*
// ==/UserScript==


//***************************************************************************
//***								 tm4rkus_doerfer_umbenennen.user
//**
//**  author/copyright               : TM4rkuS
//**
//***
//***************************************************************************/

function infoVillage() {
	var id = location.href.match(/&screen=info_village&id=(\d+)/)[1];
	var content = document.getElementById("content_value");
	var th = content.getElementsByTagName("th")[0];
	addEditSymbol(th);
	if(villages.id[id])
	{
		var name = content.getElementsByTagName("h2")[0];
		name.title = name.textContent;
		name.textContent = villages.id[id];
	}
}

function infoCommand(obj) {

	var id = obj.href.match(/screen=info_village&id=(\d+)/)[1];
	var content = document.getElementById("content_value");
	if(villages.id[id])
	{
		var name = content.getElementsByTagName("h2")[0];
		var vilname = name.textContent.match(/(.+ auf|.+ von|.+ für|.+ nach) (.+)/)[2];
		name.title = vilname;
		name.textContent = name.textContent.replace(vilname, villages.id[id]);
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


function loadName(obj) {
	var link = obj;
	var id = link.href.match(/village=\d+&screen=info_village&id=(\d+)$/)[1];
	if(villages.id[id])
	{
		link.title = link.textContent;
		if(link.textContent.match(/\((\d+\|\d+)\) (K\d+)$/))
		{
			var coords = RegExp.$1;
			var con = RegExp.$2;
			link.textContent = villages.id[id] + " (" + coords + ") " + con;
		}
		else
		{
			link.textContent = villages.id[id];
		}
		
		addBackToOriginalSymbol(obj);
	}
}

function loadNameCommands(obj) {
	var name = obj.textContent.match(/(.+ auf|.+ von|.+ für|.+ nach) (.+) \((\d+\|\d+)\) K\d+$/)[2];
	var coords = obj.textContent.match(/(.+ auf|.+ von|.+ für|.+ nach) (.+) \((\d+\|\d+)\) K\d+$/)[3];
	
	if (villages.coords[coords])
	{	
		obj.textContent = obj.textContent.replace(name, villages.coords[coords]);
	}
}

function loadNameReports(obj) {
	var name = obj.textContent.match(/(.+ greift|.+ unterstützt|.+ erobert|.+ nach) (.+) \((\d+\|\d+)\)/)[2];
	var coords = obj.textContent.match(/(.+ greift|.+ unterstützt|.+ erobert|.+ nach)(.+) \((\d+\|\d+)\)/)[3];
	
	if (villages.coords[coords])
	{	
		obj.textContent = obj.textContent.replace(name, "*" + villages.coords[coords] + "*");
	}
}
		
function addEditSymbol(obj)
{
	var edit = document.createElement("img");
	edit.src = "http://de60.die-staemme.de/graphic/rename.png";
	edit.addEventListener("click", rename, false);
	if (location.href.match(/&screen=info_village&id=\d+/))
	{
		obj.innerHTML = "<a href="+location.href+">"+obj.textContent+"</a>";
		obj = obj.getElementsByTagName("a")[0];
	}
		obj.parentNode.insertBefore(edit, obj.nextSibling);
		loadName(obj);
}

function addBackToOriginalSymbol(obj) {
	var back = document.createElement("img");
	back.title = "Originalnamen wiederherstellen";
	back.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sIAhYeINnQBdMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB+0lEQVQoz22QS2gTYRSFz8z8ecxfENpJBN2ohJhGokJLgqUq+MCNKIKgm9hF0aT4KkFKXShFCCJokRA3VWuagkExiN24FYRYSR+oKEWrjQ+qjUnrxqaZJv9cV0lG6Nne83HOPRJMCl+MUHtgV3soeHIaAJLpsbbpiexU7vNs3bNn34GevvPhITMHzeGkvfsPTiUeP23r7jlHmsNJmsNJbk8raQ4nASDOOUUHY1116Er0RheA+lFzOCnYfYbiw8lI7G5iw807Qy845wSAAh2dpJgC33zLzQEAKpUKQhcicLm3XlvV9VEi/AEw//1rLvg7vwBIgFyjJl+/+q/2vfhtrCzlB4QQvbpedgFYz3kTAKC8UgarGUulEtyeVgBAc4sGu6riR76ITXzdnMLYRyHEoy+znwAALZrWAEeePPOv6nqTrpfF8t9lqlYrC6Ja7VcYSyuKsvHXz3nfYrEAAPD6djSqSpI0I8vySwAZm902wZilMNB/KcSYxWDMcjWdGq2/4fFug4Q1FB9OMkMYZJCxWZbkvoeJ++HseAYAEOjoRHY8I8lrgarKhcq5oqrqMTPEOcehw0cAmFY1y2K1SlabbXdq5MGtGgQAp06HYVfV6wAa46TGnvuJ8F6S0AxCXhhiyevbjg/v3mKxWMDR4yewxeX2X+49OxkdjO38Bz/Ow0WkTG6MAAAAAElFTkSuQmCC";
	back.addEventListener("click", eraseFromDataBase, false);
	obj.parentNode.insertBefore(back, obj.nextSibling.nextSibling);
}

function eraseFromDataBase() {
	var link = this.previousSibling.previousSibling;
	if(location.href.match(/&screen=info_village&id=\d+/) || location.href.match(/screen=info_command&id=\d+/))
	{
		var content = document.getElementById("content_value");
		var name = content.getElementsByTagName("h2")[0];
		if (location.href.match(/screen=info_command&id=\d+/))
		{
			name.textContent = name.textContent.match(/(.+ auf |.+ von |.+ für |.+ nach )/)[1] + name.title;
		}
		else
		{
			name.textContent = name.title;
		}
		name.title = "";
	}
	
	this.parentNode.removeChild(this);
	var id = link.href.match(/village=\d+&screen=info_village&id=(\d+)$/)[1];
	delete villages.id[id];
	if(link.textContent.match(/\((\d+\|\d+)\) K\d+$/))
	{
		var coords = RegExp.$1;
	}
	else if (location.href.match(/&screen=info_player&id=\d+/) && (link.parentNode.parentNode.parentNode.parentNode.id == "villages_list"))
	{
		var coords = link.parentNode.nextSibling.textContent;
	}
	else if (location.href.match(/&screen=info_village&id=\d+/))
	{
		var coords = link.parentNode.parentNode.parentNode.getElementsByTagName("tr")[1].firstChild.nextSibling.innerHTML;
	}
	delete villages.coords[coords];
	link.textContent = link.title;
	link.title = "";
	localStorage.setItem("tm4rkus_village_renamer", JSON.stringify(villages));
}

function rename() {	
	var link = this.previousSibling;
	var id = link.href.match(/village=\d+&screen=info_village&id=(\d+)$/)[1];
	link.style.display = "none";
	this.style.display = "none";
	if(this.nextSibling)
	{
		if(this.nextSibling.title == "Originalnamen wiederherstellen")
		{
			this.parentNode.removeChild(this.nextSibling);
		}
	}
	var input = document.createElement("input");
	input.type = "text";
	input.id = id;
	if (link.textContent.match(/(.+) \(\d+\|\d+\) K\d+$/))
	{
		input.value = RegExp.$1;
	}
	else
	{
		input.value = link.textContent;
	}
	input.size = 17;
	this.parentNode.insertBefore(input, this);
	var button = document.createElement("input");
	button.type = "button";
	button.value = "OK";
	button.addEventListener("click", save, false);
	this.parentNode.insertBefore(button, this);
}

function save() {
	var link = this.previousSibling.previousSibling;
	var id = link.href.match(/village=\d+&screen=info_village&id=(\d+)$/)[1];
	var input = document.getElementById(id);
	newName = input.value;
	if(link.textContent.match(/\((\d+\|\d+)\) K\d+$/))
	{
		var coords = RegExp.$1;
	}
	else if (location.href.match(/&screen=info_player&id=\d+/) && (this.parentNode.parentNode.parentNode.parentNode.id == "villages_list"))
	{
		var coords = this.parentNode.nextSibling.textContent;
	}
	else if (location.href.match(/&screen=info_village&id=\d+/))
	{
		var coords = this.parentNode.parentNode.parentNode.getElementsByTagName("tr")[1].firstChild.nextSibling.innerHTML;
	}
	
	if(!villages.id[id])
	{
		link.title = link.textContent;
	}
		
	villages.id[id] = newName;
	villages.coords[coords] = newName;
	
	this.nextSibling.style.display = "";

	if (link.textContent.match(/\((\d+\|\d+)\) (K\d+)$/))
	{
		var con = RegExp.$2;
		link.textContent = newName + " (" + coords + ") " + con;
	}
	else
	{
		link.textContent = newName;
	}
	link.style.display = "";
	addBackToOriginalSymbol(this);
	this.parentNode.removeChild(input);
	this.parentNode.removeChild(this);
	if(location.href.match(/&screen=info_village&id=\d+/))
	{
	var content = document.getElementById("content_value");
	var name = content.getElementsByTagName("h2")[0];
	name.title = name.textContent;
	name.textContent = villages.id[id];
	}
	if(location.href.match(/screen=info_command&id=\d+/))
	{
	var content = document.getElementById("content_value");
	var name = content.getElementsByTagName("h2")[0];
	name.title = name.textContent.match(/(.+ auf|.+ von|.+ für|.+ nach) (.+)/)[2];
	name.textContent = name.textContent.replace(/(.+ auf|.+ von|.+ für|.+ nach) (.+$)/, name.textContent.match(/(.+ auf |.+ von |.+ für |.+ nach )/)[1] + villages.id[id]);
	}
	localStorage.setItem("tm4rkus_village_renamer", JSON.stringify(villages));
}

function exportData() 
{
this.nextSibling.style.display = "none";
this.style.display = "none";
var input = document.createElement("input");
input.value = JSON.stringify(villages);
input.type = "text";
input.size = 3;
var button = document.createElement("input");
button.type = "button";
button.value = "OK";
button.addEventListener("click", function() {
	this.nextSibling.style.display = ""; 
	this.nextSibling.nextSibling.style.display = ""; 
	this.parentNode.removeChild(this.previousSibling);
	this.parentNode.removeChild(this);
	}, false);
this.parentNode.insertBefore(input, this);
this.parentNode.insertBefore(button, this);
}

function importData() 
{
this.previousSibling.style.display = "none";
this.style.display = "none";
var input = document.createElement("input");
input.type = "text";
input.size = 3;
var button = document.createElement("input");
button.type = "button";
button.value = "Importieren";
button.addEventListener("click", function() {
	
	var imported = this.previousSibling.value;
	if(imported.match(/^{.+"id":{.+},"coords":{.+}}$/))
	{
		if(confirm("Wirklich importieren? Doerfer, die du unter einem anderen Namen gespeichert hast, werden hierdurch ueberschrieben! Alle anderen Dorfnamen werden beibehalten"))
		{
			var villages_temp = villages;
			try
			{
					imported = JSON.parse(imported);
					for (var prop in imported.id)
					{
					villages.id[prop] = imported.id[prop];
					}
					for (var prop in imported.coords)
					{
					villages.coords[prop] = imported.coords[prop];
					}
				
				localStorage.setItem("tm4rkus_village_renamer", JSON.stringify(villages));
				location.reload();
			}
			catch(e)
			{
				villages = villages_temp;
				localStorage.setItem("tm4rkus_village_renamer", JSON.stringify(villages));
			}
		}
	}
	else
	{
	alert("Fehler beim Importieren! Vorgang abgebrochen, es wurden keine Daten veraendert.");
	}
}, false);
this.parentNode.insertBefore(input, this);
this.parentNode.insertBefore(button, this);
}
	


var head = document.getElementsByTagName("head")[0];
var gamedata = JSON.parse(head.innerHTML.match(/var game_data = (\{.+\})\;/)[1]);
var playername = gamedata.player.name;
var premium = gamedata.player.premium;
var version = "0.5.0";

if (premium == true)
{
	window.addEventListener("focus", function() {
		if(checkExistence(localStorage["tm4rkus_village_renamer"]))
		{
			villages = JSON.parse(localStorage.getItem("tm4rkus_village_renamer"));
		}
		else
		{
			villages = {"version": version, "id": {}, "coords": {}};
		}
		localStorage.setItem("tm4rkus_village_renamer", JSON.stringify(villages));
	}, false);
	if(checkExistence(localStorage["tm4rkus_village_renamer"]))
	{
		var villages = JSON.parse(localStorage.getItem("tm4rkus_village_renamer"));
		if(!villages.id)
		{
		var villages = {"version": version, "id": {}, "coords": {}};
		localStorage.setItem("tm4rkus_village_renamer", JSON.stringify(villages));
		}
	}
	else
	{
		var villages = {"version": version, "id": {}, "coords": {}};
		localStorage.setItem("tm4rkus_village_renamer", JSON.stringify(villages));
	}
	
	if (villages.version != version)
	{
		villages.version = version;
	}
	
	var nodes = document.getElementById("content_value").getElementsByTagName("a");
	for (var i = 0; i < nodes.length; i++) 
	{
		if (nodes[i].href.match(/village=\d+&screen=info_village&id=\d+$/))
		{
			addEditSymbol(nodes[i]);
			if (location.href.match(/screen=info_command&id=\d+/))
			{
				infoCommand(nodes[i]);
			}
		}
		if (nodes[i].href.match(/screen=info_command&id=\d+/) && nodes[i].textContent.match(/(.+ auf |.+ von |.+ für |.+ nach )/))
		{
			loadNameCommands(nodes[i]);
		}
		else if (nodes[i].textContent.match(/(.+ greift|.+ unterstützt|.+ erobert|.+ nach)(.+) \((\d+\|\d+)\)/))
		{	
			loadNameReports(nodes[i]);
		}
	}

	if (location.href.match(/screen=info_player&id=\d+/))
	{
		var links_added = 0;

		var village_table = document.getElementById("content_value").getElementsByTagName("TABLE")[2];
		var rows = village_table.getElementsByTagName("tr");
		var export_img = rows[0].getElementsByTagName("th")[0].appendChild(document.createElement("img"));
		export_img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sIDBURLLVnnF0AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACLklEQVQ4y52TTUhUURiGnztedXR0JrUg8YekLMugNhGRRBgEQbWtRbUomIWBGkqEQbhQaNFCt6GtImjRImzRQkwsFCsiXLgQEkz8K/9GZ+bOPefe87VQJweypBcOfJxz+Hh5eF9LRADo7H62MfxDD5tuWxkXIkJHV6/sVpt/2TpWZ1ePNEZv0v30+W4McPbMKYZHPtLWdMcCsLdZw/MNKeXhuJqUq5mYnAIgL5jLocr9FIdDzC2uMjzye2Fga4g7Cu35JJIOC4srTE7P8WN5Dcf1OHKgjOJwiGs14Vjp3j2J7Y4CWqm/2j92sIxIQRCA0nggdK+8OHS/4Vb63faNT0v0xh+XrLU38z7LxwLJ1xYmD/uk8bh+OLz0qi4FQapsrVSagW9kg4OrsTC0P2mlzvEBLLIFPHAtuJikxB4KTr08n7psb2eQYwfQ2mN1LU7ZvoivlCvLBdi2MmlXXs4GtnMWlYX9+aM7MphfimUhAbu6OkRVbSFVtYWUV0Q4ESmhtqiIL8pyey4lL9i+8WnagUHAtng9tgndAAL15SHe/kyq3uOJILPUcbf1kawnXRER8Y0RzzeScJR8n1+R/uGvMjWzIFoppZWSq0dzVUtNhWil0mnMyIExgojBcd10DsYmponFU9lAPF9ZM4/HvtHc1pHZhWjjA1lPuqI9X7TnyeLqugx+GpcXb4ak791nGZ+clZVYXLRSMjD4IbMLW208XX9lV20cHejLaGN6wf/qF+Wqchr2NJd/AAAAAElFTkSuQmCC";
		export_img.title = "TM4rkuS \"Alle Doerfer umbenennen\" Daten exportieren";
		export_img.addEventListener("click", exportData, false);
		var import_img = rows[0].getElementsByTagName("th")[0].appendChild(document.createElement("img"));
		import_img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sIDBUNJF3LSTIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB70lEQVQ4y52TP2hTYRTFfy/mxUilDYkpLYEgKAiCoxQRHBzcuoiTaJEKQTokgiClbtKOQusiiDqJYxUqjrWItPhvceiQIZAWEm3TJq/5+77v5V2HJK+J1ho8cOFyv8v5Dod7DBEBYG7hRav5Bx6kJo2egYgwO/9c+kV7l04Zc/PPJJm4ycLTl/0I4OKF86yufWYmddsA8HdJw2m6NJRD3dY0bE06kwXgWPAop+MjhAcHyBdKrK7tE/o6TaWu0E6Taq3Oz0KRzGaerd096rbDmZMxwoMDmFMBRk+EehT5tFKHyj97KsbQ8SDR5DCo1uz+1IT37m+6Te4lbhxIcuXSGPGRCNHkMMUnJYxrYN4KdLQLQWD64SMp12wREXGarjSUI6VyXaxyVbRSEroTEhHk+rdz3eaLCMIE4u/2IOD3obVDaa9CLDrk/Rx5HQcsItn4bxo3/u7Bjx2L7cdbGOPQqBYPLMy2B6lDPNCLCvNqgPBknN03G5ADjHYdAb9WyrsDVwQRsJXDjlUlncmS2y56JIyCftfa95um8ccduK4g4lK3be8Ovqc3sSoN9KKCfGv37sxsbxYSyWkp12zRTlO040ihVJaVL+vy6u0HWXr/VdYzOSlaFdFKyfLKx94sdNI4dnm8rzR+Wl7qSaNH8L/4BZF9aL/ANQlxAAAAAElFTkSuQmCC";
		import_img.title = "TM4rkuS \"Alle Doerfer umbenennen\" Daten importieren";
		import_img.addEventListener("click", importData, false);
		var link = rows[rows.length-1].getElementsByTagName("a")[0];
		link.addEventListener("click", function() { links_added = 1 }, false)
		village_table.addEventListener("DOMNodeRemoved", function() 
		{
			if (links_added == 1)
			{
				var village_table = this;
				var rows = village_table.getElementsByTagName("tr");
				var nodes = village_table.getElementsByTagName("a");
				for(var i = 0; i < nodes.length; i++) 
				{
					if (nodes[i].href.match(/village=\d+&screen=info_village&id=\d+$/))
					{
						var img = nodes[i].parentNode.getElementsByTagName("img")[0];
						if(!img)
						addEditSymbol(nodes[i]);
					}
				}
			links_added = 0;
			}
		}, false);
		
	}

	if (location.href.match(/&screen=info_village&id=\d+/))
	{
	infoVillage();
	}
	
	if (location.href.match(/screen=map/))
	{
		var coords = "";
		setInterval(mapRename, 100);
		function mapRename() {
			var info_title = document.getElementById("info_title").innerHTML;
			
			if (info_title.match(/.+ \((\d+\|\d+)\) K\d+$/))
				{
					coords = RegExp.$1;
					if(villages.coords[coords])
					{
						document.getElementById("info_title").innerHTML = villages.coords[coords] + " <img src=\"http://de60.die-staemme.de/graphic/rename.png\">";
					}
				}
		}
	}
	
	
}