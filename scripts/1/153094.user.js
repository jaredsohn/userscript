// ==UserScript==
// @name        Travian Magic Helps
// @namespace   http://userscripts.org/scripts/edit/153094
// @description Utilitário Travian
// @include     http://tc*.travian.com.br/berichte.php*
// @include	http://tc*.travian.com.br/nachrichten.php*
// @include	http://tc*.travian.com.br/*
// @version     1.4
// ==/UserScript== 

function selectAll (a) {
	
	for (var i = 0;i < document.getElementsByClassName('check').length; i++) document.getElementsByClassName('check')[i].checked = a;
}

function itemFila(qtd,tropa) {
	this.qtd = parseInt(qtd);
	this.tropa = tropa;
}

function getTitulo () {
	var titulo = document.getElementsByTagName('h1')[0].innerHTML;
	titulo = titulo.split(' ');
	var retorno = titulo[0];
	
	return retorno;
}

function getTropas(linha) {
	var celula = linha.cells[0];
	var i = 0;
	while(celula.innerHTML[i-2] != '>') i++;
	
	var texto = celula.innerHTML.substring(i);
	texto = texto.split('\t');
	
	var qtde = texto[4];
	var tropa = texto[8].split('\n')[0];
	var retorno = new itemFila(texto[4],tropa);

	return retorno;
}

var titulo = getTitulo();

if(titulo == 'Mensagens' || titulo == 'Relatórios') {
	var btn	=document.createElement("input");
	btn.type = 'button';
	btn.value = '   Apagar Tudo   ';
	btn.style.fontSize = '10px';
	btn.style.fontFamily = 'DejaVu Sans Mono';
	btn.style.fontWeight = 'bold';
	btn.style.paddingTop = '4px';
	btn.style.paddingBottom = '3px';
	

	btn.onclick = function (){

		selectAll(true);
		if(location.href.substring(7,9) == 'ts') {
		document.getElementById('del').click();
		}
		else
			document.getElementById('btn_delete').click();
	};

	var chk = document.createElement('input');
	chk.type = 'checkbox';
	chk.class = 'check';
	chk.onclick = function () {
		selectAll(chk.checked);
	}

	if(location.href.substring(7,9) == 'ts') {
		document.getElementsByClassName("footer")[0].appendChild(btn);
	}
	else {
		document.getElementsByClassName("buttons")[0].appendChild(btn);
		var qtdCelulas = document.getElementsByTagName('table')[0].rows.length;
		var celula = document.getElementsByTagName('table')[0].rows[qtdCelulas-1].cells[0];
		celula.removeChild(celula.childNodes[0]);
		celula.appendChild(chk);
	}
}
else if(titulo == 'Quartel' || titulo == 'Cavalaria') {
	var tabelaEspera = document.getElementsByClassName('under_progress')[0];
	var linhas = tabelaEspera.rows;
	var j = 1;
	var push = true;
	var qtdTotal = 0;	
	var infotropas = getTropas(linhas[j]);
	j++;
	qtdTotal += infotropas.qtd;	

	var totalTropas = new Array(infotropas);
	for(; j < linhas.length-1; j++) {
		var infotropas = getTropas(linhas[j]);
		qtdTotal += infotropas.qtd;
		for( var i = 0; i < totalTropas.length; i++) {
			if(totalTropas[i].tropa == infotropas.tropa) {
				totalTropas[i].qtd += infotropas.qtd;
				push = false;
			}
			else push = true;
		}
		if(push) totalTropas.push(infotropas);
		
	}
	qtdTotal = new itemFila(qtdTotal,"Tropa");
	totalTropas.push(qtdTotal);
	for( i in totalTropas ) {
		var celulaSoma = document.createElement("tr");
		var celula = document.createElement("td");

		celula.innerHTML = totalTropas[i].qtd + " - " + totalTropas[i].tropa;
		if( totalTropas[i].qtd > 1) celula.innerHTML += 's';

		celula.colSpan = "3";
		celula.style.background = "#DDF";
		
		if(i == totalTropas.length-1)
			celula.style.background = "#FDD";

		celulaSoma.appendChild(celula);
		tabelaEspera.appendChild(celulaSoma);
	}

}