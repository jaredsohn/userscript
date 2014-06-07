// ==UserScript==
// @name        UFABC++
// @namespace   ufabc
// @include     http://200.133.215.45/cgi-bin/wxis.exe?IsisScript=phl81/003.xis&opc=status_tit*
// @version     0.9
// @grant       none
// ==/UserScript==

window.onload = main();

function main() {
	var posLivros, posEspera;
	for (var i = 0; i < document.getElementsByTagName("table").length; i++) { //verificar posicionamento da lista de livros e de espera
		var search = document.getElementsByTagName("table")[i].getElementsByTagName("caption");
		if (search.length != 0) {
			if (search[0].textContent == "Status do Título") posLivros = i;
			if (search[0].textContent == "Lista de Reservas") posEspera = i;
		}		
	}
	if (checarDisponiveis(posLivros)) {
		exibirResultado("Disponibilidade Imediata");
	} else {
		exibirResultado("Previsão de disponibilidade: " + calculoData(posEspera, posLivros));
	}
}

function checarDisponiveis(pos) {
	var disponiveis = document.getElementsByTagName("table")[(pos + 1)].getElementsByTagName("tbody")[0].getElementsByTagName("td")[2].textContent;
	if (disponiveis != "Total de Disponíveis: 0") {
		return true;
	} else {
		return false;
	}
}

function calculoData(posEspera, posLivros) {
	var datasString = [], datasDate = [], contLivros = 0;
	var contReservas = document.getElementsByTagName("table").length - 1 - posEspera;
	var qdlivros = document.getElementsByTagName("table")[posLivros].getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
	for (var i = 0; i < qdlivros; i++) {
		datasString[i] = document.getElementsByTagName("table")[posLivros].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[5].textContent
		if (datasString[i] != "") contLivros++;
	}
	datasString.sort().reverse();
	//Atribuição de datas
	var numLivros = converteStringData(datasString, contLivros);
	var valor, mes = "0";
	for (var i = 0; i <= contReservas; i++) {
		ordenar(numLivros);
		if (numLivros[0].getMonth() > 8) mes = "";
		data = numLivros[0].getDate() + "/" + mes + parseFloat(numLivros[0].getMonth() + 1) + "/" + numLivros[0].getFullYear().toString().substring(2, 4);
		mes = "0";
		numLivros[0].setDate(numLivros[0].getDate() + 7 );
	}
	return data;
}

function converteStringData(data, cont) {
var datasOrg = [];
for (var i = 0; i < cont; i++) {
		data[i] = data[i].split("/", 3);		
		data[i] = data[i][1] + "/" + data[i][0] + "/" + "20" + data[i][2];
		datasOrg[i] = new Date(data[i]);
	}
	return datasOrg;
}

function ordenar(array) {
	return array.sort(function(a,b){return a-b});
}

function exibirResultado(resultado) {
	var statuslivros = document.getElementsByTagName("table")[0];
	statuslivros.insertAdjacentHTML("afterEnd", "<br><br><table><tr><td>" + resultado + "</td></tr></table>");
}