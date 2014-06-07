// ==UserScript==
// @name        Travian Magic Helps - T4
// @namespace   http://userscripts.org/scripts/edit/153094
// @description Utilitário Travian
// @include     http://t*.travian.com.br/berichte.php*
// @include		http://t*.travian.com.br/nachrichten.php*
// @include		http://t*.travian.com.br/*
// @exclude		http://tc*
// @version     1
// ==/UserScript==

function selectAll (a) {// OK
	
	for (var i = 0;i < document.getElementsByClassName('check').length; i++) document.getElementsByClassName('check')[i].checked = a;
}

function itemFila(qtd,tropa) {
	this.qtd = parseInt(qtd);
	this.tropa = tropa;
}

function getTitulo () {// OK
	var titulo = document.getElementsByTagName('h1')[0].innerHTML;
	if(titulo.indexOf('<') != -1) {
		titulo = titulo.split('<');
		titulo[0] = titulo[0].split('\t');
		var retorno = titulo[0][4].split('\n')[0];
	}
	else retorno = titulo;
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

function criarBotao (valor) {
	var primeiroDiv;
	var a = document.createElement('div');
	a.className = 'btc';
	
	var b = document.createElement('div');
	b.className = 'btr';
	b.appendChild(a);
	a = document.createElement('div');
	a.className = 'btl';
	a.appendChild(b);
	primeiroDiv = a;

	var segundoDiv;
	a = document.createElement('div');
	a.className = 'bmc';
	b = document.createElement('div');
	b.className = 'bmr';
	b.appendChild(a);
	a = document.createElement('div');
	a.className = 'bml';
	a.appendChild(b);
	segundoDiv = a;

	var terceiroDiv;
	var a = document.createElement('div');
	a.className = 'bbc';
	var b = document.createElement('div');
	b.className = 'bbr';
	b.appendChild(a);
	a = document.createElement('div');
	a.className = 'bbl';
	a.appendChild(b);
	terceiroDiv = a;

	var position;
	position = document.createElement('div');
	position.appendChild(primeiroDiv);
	position.appendChild(segundoDiv);
	position.appendChild(terceiroDiv);
	position.className = 'button-position';


	var contents;
	contents = document.createElement('div');
	contents.className = 'button-contents';
	contents.innerHTML = valor;

	var container;
	container = document.createElement('div');
	container.appendChild(position);
	container.appendChild(contents);
	container.className = 'button-container';

	var botao;
	botao = document.createElement('button');
    botao.appendChild(container);
	botao.value = valor;

	return botao;

}

var titulo = getTitulo();
console.log(titulo.length + " " + titulo);


if(titulo == 'Mensagens' || titulo == 'Relatórios') {
	var btn	= criarBotao('Apagar Tudo')

	btn.onclick = function (){

		selectAll(true);
		document.getElementById('del').click();
	};

	var chk = document.createElement('input');
	chk.type = 'checkbox';
	chk.class = 'check';
	chk.onclick = function () {
		selectAll(chk.checked);
	}

	document.getElementsByTagName("form")[0].appendChild(btn);

	var linha = document.createElement('tr');
	document.getElementsByTagName('tbody')[0].appendChild(a);
	var coluna = document.createElement('td');
	coluna.appendChild(chk);
	linha.appendChild
}
else if(titulo == 'Quartel' || titulo == 'Cavalaria') {// OK
	
	var tabelaEspera = document.getElementsByClassName('under_progress')[0];
	if(typeof tabelaEspera != 'undefined') {
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
			 push = true;
			for( var i = 0; i < totalTropas.length; i++) {
				if(totalTropas[i].tropa == infotropas.tropa) {
					totalTropas[i].qtd += infotropas.qtd;
					push = false;
				}
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
			celula.style.textAlign = 'center';
			celula.style.height = '20px';
			
			if(i == totalTropas.length-1)
				celula.style.background = "#FDD";

			celulaSoma.appendChild(celula);
			tabelaEspera.appendChild(celulaSoma);
		}
	}
}
