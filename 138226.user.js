// ==UserScript==
// @name        REGEX
// @namespace   R12
// @include     http://www.barafranca.com.pt/game.php
// @include     http://www.barafranca.com.br/game.php
// @version     1
// ==/UserScript==


window.document.getElementsByTagName("frame")[2].addEventListener("load", function () {

	var dayNow = new Date().getDate();
	var lastUpdatedDay = GM_getValue("LAST DAY UPDATED" , 0 );
	//alert("Dia Agora: " + dayNow + " | Ultimo Dia: " + lastUpdatedDay);
	var hourNow = new Date().getHours();
	var lastUpdatedHour = GM_getValue("LAST HOUR UPDATED" , 0 );
	//alert("Hora Agora: " + hourNow + " | Ultima Hora: " + lastUpdatedHour + "\n" + (hourNow-lastUpdatedHour) + " > 12");
	var daysDifference = dayNow - lastUpdatedDay;
	var hourDifference = hourNow + ( daysDifference * 24 ) - lastUpdatedHour;
	alert("Diferença de Horas: " + hourDifference);
	if ( hourDifference > 1 ) {
		alert("if 1");
		var main = window.frames[2];
		if (main.location.pathname+main.location.search == '/BeO/webroot/index.php?module=Launchpad') {
                        alert("Launchpad");
			var div = main.document.getElementById("smsdivcontainer");
			var divChanged = function () {
				if (String(div.innerHTML).length > 1000) {
                                        alert("DIV ready");
					div.removeEventListener("DOMSubtreeModified", divChanged, true);
					unsafeWindow.setTimeout(function () { statusParse(div.innerHTML); }, 100);
				}
			}
			div.addEventListener("DOMSubtreeModified", divChanged, true);
		} else {
                        alert("Not Launchpad");
			GM_xmlhttpRequest({
			method: "GET",
			url: "/information.php",
			onload: function(response) {
				var body = window.document.createElement("body");
				body.innerHTML = response.responseText;
                                alert("XML Request");
				statusParse(body.innerHTML);
				delete(body);
			}
			});
		}
	
	}
	
}, true);


function statusParse(str) {
	//alert(str);
	alert("Parse");
	// INGAME
	var ingame = str.match(/nick=\w+/).toString().replace(/nick=/ , '');
	//alert(ingame);
	
	var log = "Ingame: " + ingame + "\n";
	
	// FAMILIA
	if ( str.match(/fam=\d+"\starget="main"\>\w+/) != null ) {
		var familia = str.match(/fam=\d+"\starget="main"\>\w+/).toString().replace(/fam=\d+"\starget="main"\>/ , '');
	} else { var familia = "Sem Familia"; }
	//alert(familia);
	
	log += "Familia: " + familia + "\n";
	
	// ESTATUTO
	var estatuto = str.match(/Empty-suit|Delivery\sBoy|Delivery\sGirl|Picciotto|Shoplifter|Pickpocket|Thief|Associate|Mobster|Soldier|Swindler|Assassin|Local\sChief|Chief|Bruglione|Capodecina|Godfather|First\sLady/).toString();
	//alert(estatuto);
	
	log += "Estatuto: " + estatuto + "\n";
	
	// RP and KS
	var statusBars = str.match(/>([\d\.]+)%</g);
	var rp = statusBars[0].toString().replace(/[^\d\.]/g , '');
	//alert(rp);
	if ( statusBars[4] != null ) {
		var ks = statusBars[4].toString().replace(/[^\d\.]/g , '');
	} else { var ks = "0"; }
	//alert(ks);
	
	log += "RP: " + rp + "\nKS: " + ks + "\n";
	
	// BALAS 
	var balas = str.match(/bullets2\.php"><b>Balas<\/b><\/a>[\n\s\r]+<\/td>[\n\s\r]+<td>[,\d]+/g).toString().replace(/bullets2\.php"><b>Balas<\/b><\/a>[\n\s\r]+<\/td>[\n\s\r]+<td>/g , '');
	//alert(balas);
	
	log += "Balas: " + balas + "\n";
	
	// DINHEIRO
	var bolso = str.match(/Dinheiro[\n\s\r]+<\/b><\/td>[\n\s\r]+<td>\$[\n\s\r]*[,\d]+/g).toString().replace(/Dinheiro[\n\s\r]+<\/b><\/td>[\n\s\r]+<td>\$[\n\s\r]*/g , '');
	//alert(bolso);
	
	var banco = str.match(/bank\.php">[\n\s\r]*\$[\n\s\r]*[,\d]+/g).toString().replace(/bank\.php">[\n\s\r]*\$[\n\s\r]*/g , '');
	//alert(banco);
	
	log += "Dinheiro Bolso: " + bolso + "\nDinheiro Banco: " + banco;
	
	var rightNow = new Date().getDate();
	GM_setValue("LAST DAY UPDATED" , rightNow);
	var rightNow = new Date().getHours();
	GM_setValue("LAST HOUR UPDATED" , rightNow);
	
	alert(log);
}