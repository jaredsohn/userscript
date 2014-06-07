// ==UserScript==
// @name           Alfa Tool
// @namespace      AlfaTool
// @description    Outil de communication de l'alliance Alfa
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://*.ikariam.fr/*
// @exclude        http://board.ikariam.fr/*
// ==/UserScript==

function getXMLHttpRequest() {
	var xhr = null;
	
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest();
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
	
	return xhr;
}

function request(callback) {
	var xhr = getXMLHttpRequest();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200)) {
			callback(xhr.responseText);
		}
	};

	var message = encodeURIComponent(document.getElementById("message").value);
	xhr.open("GET", "http://www.ktplus13mouscron.be/test.php", true);
	xhr.send(null);
}

function readData(sData) {
	// On peut maintenant traiter les données sans encombrer l'objet XHR.
	if (sData == "Lol") {
		alert("C'est bon");
	} else {
		alert("Y'a eu un problème");
	}
}

function main(){
var entry = document.createElement('div');

entry.setAttribute('class', 'dynamic');
entry.setAttribute('id','AlfaChat');

var html = '<h3 class="header">Alfa Chat</h3>'+
             '<div class="content">'+
               '<div style="background-color:#FCF8E4;border:1px #DA9E48 solid;padding:3px;overflow:auto;width:90%;margin:auto;height:100px;">'+
               'f</div><br />'+
               '<b>Message :</b><br />'+
               '<input type="text" size="20" style="width:90%;margin-left:5px;background-color:#FCF8E4;border:1px #DA9E48 solid;font-size:10px;" id="message" /><br /><br />'+
               '<div class="centerButton" id="centerButton">'+
               '</div>'+
			 '</div>'+
           '<div class="footer"></div>';

entry.innerHTML = html;

var breadcrumbs = $("div#container2 div#breadcrumbs");

breadcrumbs.after(entry);

entry = $("div#container2 div#centerButton");

var input = document.createElement('a');
input.setAttribute("class", "button");
input.style.margin = "10px;"
input.innerHTML = "Envoyer";
input.addEventListener('click', function(){ request(readData); }, false);
entry.append(input);
}

main();