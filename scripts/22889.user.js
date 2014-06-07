// version 0.3.2
// 2007/05/29
// Autor: FryGuy adaptado por Sey

// ==UserScript==
// @name           UGame - Almacenamiento de Naves
// @namespace      "http://www.ugamela.com/"
// @description    Agrega a la pantalla de flotas la capacidad de carga total para las naves seleccionadas
// @include        http://*/
// @exclude        http://*ogame.de/*
// ==/UserScript==

var textNode;

var vNaves = Array(
  Array(202, 1, 5000, 10000, 10, 5000), //Cargo XS
  Array(203, 1, 7500, 0, 50, 25000),    //Targo Y3A
  Array(204, 1, 12500, 0, 20, 50),      //MIG P36
  Array(205, 2, 10000, 0, 75, 100),     //Hurricane T103
  Array(206, 2, 15000, 0, 300, 800),    //Crucero V10
  Array(207, 3, 10000, 0, 500, 1500),   //SpeedFire SF4
  Array(208, 2, 2500, 0, 1000, 7500),   //Conquistador M44
  Array(209, 1, 2000, 0, 300, 20000),   //Ecolo 23
  Array(210, 1, 100000000, 0, 1, 0),    //Orbe SP14
  Array(211, 2, 4000, 5000, 1000, 500), //Bomber B52
  Array(212, 3, 5000, 0, 1000, 2000),   //Zer
  Array(213, 3, 100, 0, 1, 2000),       //Destructor ZY21
  Array(214, 3, 100, 0, 1, 1000000),    //Ciudad Espacial D10S
  Array(215, 3, 10000, 0, 250, 750)     //Devastador F19
);

function addDots(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
};

function removeDots(nStr){
	return parseInt(nStr.replace(/[.]/g,''));
};

function mynoShips (){
	var id;
	
	for (i = 200; i < 220; i++) {
		id = "ship" + i;
		if (document.getElementById(id)) {
			document.getElementsByName(id)[0].value = 0;
			calcStorage(id);
		};
	};
	//calcTotal();
};

function mymaxShips() {
	var id;
	var i;
	
	for (i = 200; i < 220; i++) {
		id = "ship" + i;
		if (document.getElementById(id)) {
			document.getElementsByName(id)[0].value = document.getElementsByName("max" + id)[0].value;
			calcStorage(id);
		};
	};
	//calcTotal();
};

function mymaxShip(){
	var ships;
	var ship;

	ship = document.getElementById(this.id).id;
	if (document.getElementsByName(ship)[0]) {
		ships = document.getElementsByName(ship)[0];
		document.getElementsByName(ship)[0].value = document.getElementsByName("max" + ship)[0].value;
		calcStorage(ships.name);
	};
};

function myKeyUp(){
	calcStorage(this.name);
};

function calcTotal(){
	var id;
	var i;
	var iTotal = 0;
	
	for (i = 200; i < 220; i++) {
		id = "ship" + i;
		if (document.getElementById(id)) {
			iTotal = iTotal + Number(removeDots(document.getElementsByName(id)[0].nextSibling.value));
		};
	};
	textNode.nodeValue = addDots(iTotal);
};

function calcStorage(ship){
	var i;
	var node;
	var ships;
	
	if (ships = document.getElementsByName(ship)[0]) {
		node = ships.nextSibling;
	
		if (isNaN(ships.value)) {
			node.nodeValue = 0;
		} else {
			for (i = 0; i < vNaves.length; i++) {
	    	if (vNaves[i][0] == node.id) {
	    		node.value = addDots(ships.value * vNaves[i][5]);
	    	};
	    };
		};
		calcTotal()
	};
};

function doNothing(){

};

(function(){
	var i;
	var data;
	var node;
	var nodemax;
	var inputNode;
	var nodeTotal;
	
	if (location.pathname.search("flotten1") != -1 ) {
		for(i = 200; i <= 220; i++){
			data = document.getElementsByName("ship" + i);
			if (data.length > 0) {
				if (nodeTotal == null){
					nodeTotal = data[0]
					nodeTotal = nodeTotal.parentNode;
					nodeTotal = nodeTotal.parentNode;
					nodeTotal = nodeTotal.parentNode;
					nodeTotal = nodeTotal.firstChild;
					nodeTotal = nodeTotal.nextSibling;
					nodeTotal = nodeTotal.nextSibling;
					nodeTotal = nodeTotal.lastChild;
					nodeTotal = nodeTotal.previousSibling;
					nodeTotal.firstChild.nodeValue = 'Total: ';
					textNode = document.createTextNode('0');
					nodeTotal.appendChild(textNode);
				};
			
				node = data[0];
				node.addEventListener("keyup", myKeyUp, false);
				//node.addEventListener("mouseover", mymaxShips, false);

				nodemax = node.parentNode.previousSibling.previousSibling.firstChild;
				nodemax.href = 'javascript:doNothing'; //redefinimos el click en el "máx"
				nodemax.id = node.name;
				nodemax.addEventListener('click', mymaxShip, false);

				inputNode = document.createElement('INPUT'); // se crea la nueva celda
				inputNode.id = i;
				inputNode.value = '0';
				inputNode.disabled = true;
				inputNode.size = 10;
				node.parentNode.appendChild(inputNode);				
			};	
		};
		// redefinimos el "todas las naves"		
		data = document.getElementsByTagName('a');
		for (i = 0; i < data.length; i++) {
			if (data.item(i).href == "javascript:maxShips();") {
				node = data.item(i);
				node.href = 'javascript:doNothing'; //redefinimos el click 
				//node.id = node.name;
				node.addEventListener('click', mymaxShips, false);	
			};
			
			if (data.item(i).href == "javascript:noShips();") {
				node = data.item(i);
				node.href = 'javascript:doNothing'; //redefinimos el click 
				//node.id = node.name;
				node.addEventListener('click', mynoShips, false);	
			};
		};
	};
})();