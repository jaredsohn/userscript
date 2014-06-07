// ==UserScript==
// @name           WildGunsBoard
// @namespace      http://www.secret.org
// @description    Board WildGuns
// @include        http://s*.wildguns.fr/*
// ==/UserScript==

var cities = new Array();
var boardDiv,copyDiv;


function refreshCities() {
	var liCity = new Array();
	var objList = document.getElementById("vSelectList");
	liCity = objList.getElementsByTagName("li");
	for (var i=0; i<liCity.length; i++) {
		var liChildren = liCity[i].childNodes;
		var cityName = trim(liChildren[1].nodeValue);
		cities.push(cityName);
	}
}

function refreshBoard() {
	var objList = document.getElementById("vSelectList");
	var lis = objList.getElementsByTagName("li");
	// Création de la table + entete
	var boardTable = document.createElement('table');
	boardTable.setAttribute("width", "100%");
	boardTable.setAttribute("bgcolor","#FFFFFF");
	boardTable.setAttribute("border","1");
	boardTable.setAttribute("id","boardtable");
	var rowHeader = boardTable.insertRow(0);
	var cellHNomVille = rowHeader.insertCell(0);
	cellHNomVille.innerHTML = "Nom Ville";
	var cellHCoords = rowHeader.insertCell(1);
	cellHCoords.innerHTML = "Coordonnées";
	var cellHBois = rowHeader.insertCell(2);
	cellHBois.innerHTML = "Bois";
	var cellHArgile = rowHeader.insertCell(3);
	cellHArgile.innerHTML = "Argile";
	var cellHFer = rowHeader.insertCell(4);
	cellHFer.innerHTML = "Fer";	
	var cellHFood = rowHeader.insertCell(5);
	cellHFood.innerHTML = "Nourriture";	
	var cellHConsum = rowHeader.insertCell(6);
	cellHConsum.innerHTML = "Consommation";	
	boardTable.appendChild(rowHeader);
	boardDiv.appendChild(boardTable);
	// Fin de la création
	for (var i=0; i<cities.length; i++) {
		var currentCity = cities[i];
		var url = lis.item(i).getAttribute("onclick");
		url = url.substring(17,url.indexOf("';"));
		var params = url.substring(9);
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(response) {
				var objXML;
				GM_log(response.responseText);
				if (!response.responseXML) {
					objXML = new DOMParser().parseFromString(response.responseText, "application/xml");
				}
				//var resXML = objXML.evaluate('//div', objXML, null, XPathResult.ANY_TYPE,null);
				var evaluator = new XPathEvaluator();
				var resXML = evaluator.evaluate("//div", objXML, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);

				//alert(tmp);
				var actualDiv = resXML.iterateNext ();
				if (actualDiv != null) {
					alert(actualDiv.getAttribute("id"));
				}
				else {
					alert("div nulle");
				}
                /*while (actualDiv) {
                    alert(actualDiv
                    actualSpan = xPathRes.iterateNext ()
                }*/

				
				/*var testCityList = objXML.getElementById("vSelectList");
				var testliCity = new Array();
				testliCity = testCityList.getElementsByTagName("li");
				alet(testliCity);*/
				//var ressources = objXML.getElementById("ressources");
				//alert(ressources);
				
			}
		});
		/*new Ajax.Request("user.php", {method: "post", parameters: params, onComplete: function(resp) {
			alert(resp);
		}});*/
	}
}

/*function refreshBoard() {
		var cityList = document.getElementById("vSelectList");
		var liCity = new Array();
		liCity = cityList.getElementsByTagName("li");
		var boardTable = document.createElement('table');
		boardTable.setAttribute("width", "100%");
		boardTable.setAttribute("bgcolor","#FFFFFF");
		boardTable.setAttribute("border","1");
		var trHeader = document.createElement('tr');
		var tdNomVille = document.createElement('td');
		tdNomVille.appendChild(document.createTextNode('Nom Ville'));
		var tdCoord = document.createElement('td');
		tdCoord.appendChild(document.createTextNode('Coordonnées'));
		var tdbois = document.createElement('td');
		tdbois.appendChild(document.createTextNode('Bois'));
		var tdargile = document.createElement('td');
		tdargile.appendChild(document.createTextNode('Argile'));
		var tdfer = document.createElement('td');
		tdfer.appendChild(document.createTextNode('Fer'));
		var tdFood = document.createElement('td');
		tdFood.appendChild(document.createTextNode('Nourriture'));
		var tdConsum = document.createElement('td');
		tdConsum.appendChild(document.createTextNode('Consommation'));
		trHeader.appendChild(tdNomVille);
		trHeader.appendChild(tdCoord);
		trHeader.appendChild(tdbois);
		trHeader.appendChild(tdargile);
		trHeader.appendChild(tdfer);
		trHeader.appendChild(tdFood);
		trHeader.appendChild(tdConsum);
		boardTable.appendChild(trHeader);
		for (var i=0; i<liCity.length; i++) {
			var currentLi = liCity[i];
			var liChildren = currentLi.childNodes;
            var coord = trim(liChildren[0].innerHTML);
			var cityName = trim(liChildren[1].nodeValue);
			cities.push(cityName);
			var tr = document.createElement('tr_'+cityName);
			var tdname = document.createElement('td');
			tdname.appendChild(document.createTextNode(cityName));
			var tdcoord = document.createElement('td');
			tdcoord.appendChild(document.createTextNode(coord));
			tr.appendChild(tdname);
			tr.appendChild(tdcoord);
			boardTable.appendChild(tr);
		}
		boardDiv.appendChild(boardTable);
		///////////////////////
		for (var i=0; i<cityList.length; i++) {
			var city = cityList[i];
			var currentTr = document.getElementById("tr_"+city);
			var tdCityBois = document.createElement('td');
			tdCityBois.appendChild(document.createTextNode(document.getElementById("ressourceWood").innerHTML));
			var tdCityArgile = document.createElement('td');
			tdCityArgile.appendChild(document.createTextNode(document.getElementById("ressourceBrick").innerHTML));
			var tdCityFer = document.createElement('td');
			tdCityFer.appendChild(document.createTextNode(document.getElementById("ressourceOre").innerHTML));
			var tdCityFood = document.createElement('td');
			tdCityFood.appendChild(document.createTextNode(document.getElementById("ressourceFood").innerHTML));
			var tdCityConsum = document.createElement('td');
			tdCityConsum.appendChild(document.createTextNode(document.getElementById("ressourceFoodConsum").innerHTML));
			currentTr.appendChild(tdCityBois);
			currentTr.appendChild(tdCityArgile);
			currentTr.appendChild(tdCityFer);
			currentTr.appendChild(tdCityFood);
			currentTr.appendChild(tdCityConsum);
		}
		
		///////////////////////
}*/

function addButton() {
	
	copyDiv = document.getElementById("copyright");
	boardDiv = document.createElement('div');
	boardDiv.setAttribute("id", "divBoard");
	boardDiv.setAttribute("width", "100%");
	var newButton = document.createElement('input');
	
	newButton.setAttribute("type", "button");
	newButton.setAttribute("value", "Rafraichir");
	newButton.addEventListener("click",function(e){
		refreshCities();
		refreshBoard();
	},false);
	boardDiv.appendChild(newButton);
	copyDiv.appendChild(boardDiv);
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}


window.addEventListener('load',addButton,true);