// ==UserScript==
// @name Oculta Disciplinas Moodle
// @namespace http://www.sitesmundo.net/moodle/
// @version 0.1
// @description Script que permite ocultar disciplinas de semestres anteriores
// @include http://moodle.unipampa.edu.br/*
// ==/UserScript==

//Lista de disciplinas que serão ocultadas do menu. Colocar o texto que aparece no menu, sem espaços.
var blackListDisciplinas = new Array(
	//"Disciplina",
	//"Disciplina",
	//"Disciplina",
	//"Disciplina",
	//"Disciplina",
	//"Disciplina"
);

//Lista de disciplinas que você não deseja que seja ocultada do menu. Colocar o texto que aparece no menu, sem espaços.
var whiteListDisciplinas = new Array(
	//"Disciplina",
	//"Disciplina",
	//"Disciplina",
	//"Disciplina",
	//"Disciplina",
	//"Disciplina"
);


//Terminação do nome das disciplinas. Todas disciplinas terminadas com os itens desta lista serão ocultadas do menu.
var semestresElimina = new Array(
	"01/2010",
	"02/2010",
	"01/2011",
	"02/2011",

	"2010/01",
	"2010/02",
	"2011/01",
	"2011/02"
);

function getElementsByClassName(classname, node) {
	if(!node) 
		node = document.getElementsByTagName("body")[0];

	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");

	for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].className))a.push(els[i]);

	return a;
}

function discardElement(element) {
	var garbageBin = document.getElementById('IELeakGarbageBin');
	if (!garbageBin) {
		garbageBin = document.createElement('DIV');
		garbageBin.id = 'IELeakGarbageBin';
		garbageBin.style.display = 'none';
		document.body.appendChild(garbageBin);
	}
	// move the element to the garbage bin 
	garbageBin.appendChild(element);
	garbageBin.innerHTML = '';
}

function ocultaDisc(nomeDisc){
	var strAux = "";

	for(var k=0; k<whiteListDisciplinas.length; k++){
		if(nomeDisc == whiteListDisciplinas[k]){
			return false;
		}
	}

	for(var i=0; i<semestresElimina.length; i++){
		strAux = nomeDisc.substring(nomeDisc.length-7, nomeDisc.length);
		if(strAux  == semestresElimina[i]){
			return true;
		}
	}

	for(var j=0; j<blackListDisciplinas.length; j++){
		if(nomeDisc == blackListDisciplinas[j]){
			return true;
		}
	
	}
	
	return false;
}

function lookClass(strClass){
	var info=getElementsByClassName(strClass);

	for(var i=0; i<info.length; i++){
		var info2 = info[i].getElementsByTagName("a");
		for(var j=0; j<info2.length; j++){
			if(ocultaDisc(info2[j].innerHTML) == true)
				discardElement(info[i]);
		}
	}
}


lookClass("r0");
lookClass("r1");

