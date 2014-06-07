// ==UserScript==
// @name			Berichte von Angriffen einlesen und an Angreiferdorf anhaengen
// @version			0.2.1
// @include			http://*.die-staemme.*/game.php?*&screen=report*
// @include			http://*.staemme.*/game.php?*&screen=report*
// @include			http://*.die-staemme.*/game.php?*&screen=info_village&id=*
// @include			http://*.staemme.*/game.php?*&screen=info_village&id=*
// ==/UserScript==
//***************************************************************************
//***                                          
//**  author/copyright               : TM4rkuS
//***
//***************************************************************************/

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

function contains(array, obj) {

	if (checkExistence(array))
	{
		var i = array.length;
		while (i--) 
		{
			if (array[i] == obj) {
				return (i+1);
			}
		}
	}
	return false;
}

function getElementsByInnerHTML(element, tag, HTML) {

	var tags = element.getElementsByTagName(tag);
	var elements = [];
	
	for (var i = 0; i < tags.length; i++)
	{
		if (tags[i].textContent == HTML)
		{
			elements.push(tags[i]);
		}
	}
	return elements;

}

function save_report() {
		var table = document.getElementById("attack_info_def");
		var table = document.getElementById("attack_info_att");
		var cell = table.getElementsByTagName("tr")[1].getElementsByTagName("td")[1];
		var link = cell.getElementsByTagName("a")[0].href;
		id = link.match(/id=(\d+)/)[1];
		var view = location.href.match(/view=(\d+)/)[1];
		var html = document.getElementById("label").parentNode.innerHTML;
		var mod1HTML = html.replace("<span id=\"labelText\">", "<span id=\"labelText"+view+"\"><a href="+location.href.replace(/mode=\w+/, "mode=all")+">");
		var mod2HTML = mod1HTML.replace("an</span>", "an </a></span");
		var mod3HTML = mod2HTML.replace("span id=\"label\"", "span id=\"label"+view+"\"");
		var table = document.getElementsByClassName("vis")[2];
		var sent = getElementsByInnerHTML(table, "td", "Gesendet")[0].nextSibling.innerHTML;
		var report = [sent, mod3HTML]
		if (!contains(read_reports["views"], view))
		{
			if (checkExistence(read_reports[id]))
			{
				read_reports[id].push(report);
			}	
			else
			{
				read_reports[id] = [];
				read_reports[id].push(report);
			}	
			read_reports["views"].push(view);
		}
		localStorage.setItem("tm4rkus_read_reports", JSON.stringify(read_reports));
}

function load_reports() {

	var id = location.href.match(/info_village&id=(\d+)/)[1];
	if (checkExistence(read_reports[id]))
	{
		var tables = document.getElementsByClassName("vis");
		var parent = document.getElementById("content_value");
		var table = parent.appendChild(document.createElement("table"));
		table.width = "100%";
		table.style = "margin-top: 10px; clear:both"
		var row = table.appendChild(document.createElement("tr"));
		var toprow = row.appendChild(document.createElement("th"));
		toprow.style.fontWeight = 700;
		toprow.textContent = "Berichte von Angriffen dieses Dorfes - Betreff";
		var toprow = row.appendChild(document.createElement("th"));
		toprow.style.fontWeight = 700;
		toprow.width = 140;
		toprow.textContent = "Empfangen";
		for (var i = 0; i < read_reports[id].length; i++)
		{
			var row = table.appendChild(document.createElement("tr"));
			row.style.backgroundColor = "rgb(244, 228, 188)";
			var cell = row.appendChild(document.createElement("td"));
			cell.innerHTML = read_reports[id][i][1];
			var cell = row.appendChild(document.createElement("td"));
			cell.innerHTML = read_reports[id][i][0];
		}
	}
		

}

var head = document.getElementsByTagName("head")[0];
var gamedata = JSON.parse(head.innerHTML.match(/var game_data = (\{.+\})\;/)[1]);
var playername = gamedata.player.name;
var premium = gamedata.player.premium;

if (premium == true)
{
	if (checkExistence(localStorage["tm4rkus_read_reports"]))
	{
		var read_reports = JSON.parse(localStorage.getItem("tm4rkus_read_reports"));
	}
	else
	{
		var read_reports = {"views":[]};
	}

	if (location.href.match(/&screen=report&mode=\w+&view=\d+/))
	{
		var content = document.getElementById("content_value").innerHTML;
		if (content.match(/greift .+ an/) || content.match(/erobert/))
		{
			save_report();
		}
	}
	else if (location.href.match(/info_village/))
	{
		load_reports();
	}

	if ((location.href.match(/&screen=report/)) && (!location.href.match(/&view=\d+/)))
	{
		var table = document.getElementsByClassName("vis")[3];
		var rows = table.getElementsByTagName("tr");
		var toprow = rows[0];
		var readIn = toprow.appendChild(document.createElement("th"));
		readIn.style.fontWeight = 700;
		readIn.innerHTML = "Angriffs-<br/>Bericht eingelesen";

		for (var i = 1;	i < rows.length-1; i++)
		{
		var report = rows[i].getElementsByTagName("a")[0];
		var view = report.href.match(/&view=(\d+)/)[1];
		var readInSucces = rows[i].appendChild(document.createElement("td"));
		var succesImg = readInSucces.appendChild(document.createElement("img"));
		if (report.innerHTML.match(/greift .+ an/) || report.innerHTML.match(/erobert/))
		{
			if (contains(read_reports["views"], view)) 
				{
					succesImg.src = "http://de60.die-staemme.de/graphic/dots/green.png";
				}
			else
				{
					succesImg.src = "http://de60.die-staemme.de/graphic/dots/red.png";
				}
		}
		else
			{ 
			readInSucces.style = "font-weight: 700; color: red;";
			readInSucces.innerHTML = "x";
			}
		}
	}
}