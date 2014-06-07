// ==UserScript==
// @name            Principal
// @namespace    http://userscripts.org/scripts/show/111793
// @description     Para entrar en los "primeros" foros con atajo de teclado...
// @version          1.00
// @date              2011-08-30
// @author           jbgg
// @include          http://www.portalhacker.net/index.php*
// ==/UserScript==


function vale(){
	var elem = document.getElementsByTagName("h3");
	for(var i=0; i<elem.length; i++){
		if(elem[i].innerHTML == "Responder al mensaje")
			return false;
	}
	return true;
}

document.wrappedJSObject.onkeyup = function(Evento) {
	var evento = window.event || Evento;
	if(vale()){
		if(evento.shiftKey && evento.keyCode==70) document.location = "http://www.portalhacker.net/index.php/board,8.0.html";
		if(evento.shiftKey && evento.keyCode==85) document.location = "http://www.portalhacker.net/index.php/board,107.0.html";
		if(evento.shiftKey && evento.keyCode==68) document.location = "http://www.portalhacker.net/index.php/board,1.0.html";
		if(evento.shiftKey && evento.keyCode==72) document.location = "http://www.portalhacker.net/index.php/board,2.0.html";
		if(evento.shiftKey && evento.keyCode==83) document.location = "http://www.portalhacker.net/index.php/board,37.0.html";
		if(evento.shiftKey && evento.keyCode==73) document.location = "http://www.portalhacker.net/index.php/board,83.0.html";
		if(evento.shiftKey && evento.keyCode==65) document.location = "http://www.portalhacker.net/index.php/board,69.0.html";
		if(evento.shiftKey && evento.keyCode==84) document.location = "http://www.portalhacker.net/index.php/board,4.0.html";
		if(evento.shiftKey && evento.keyCode==69) document.location = "http://www.portalhacker.net/index.php/board,116.0.html";
		if(evento.shiftKey && evento.keyCode==80) document.location = "http://www.portalhacker.net/index.php/board,24.0.html";
		if(evento.shiftKey && evento.keyCode==86) document.location = "http://www.portalhacker.net/index.php/board,22.0.html";
		if(evento.shiftKey && evento.keyCode==74) document.location = "http://www.portalhacker.net/index.php/board,51.0.html";
		if(evento.shiftKey && evento.keyCode==89) document.location = "http://www.portalhacker.net/index.php/board,112.0.html";
		if(evento.shiftKey && evento.keyCode==67) document.location = "http://www.portalhacker.net/index.php/board,18.0.html";
		if(evento.shiftKey && evento.keyCode==87) document.location = "http://www.portalhacker.net/index.php/board,49.0.html";
		if(evento.shiftKey && evento.keyCode==77) document.location = "http://www.portalhacker.net/index.php/board,25.0.html";
		if(evento.shiftKey && evento.keyCode==82) document.location = "http://www.portalhacker.net/index.php/board,38.0.html";
		if(evento.shiftKey && evento.keyCode==76) document.location = "http://www.portalhacker.net/index.php/board,82.0.html";
		if(evento.shiftKey && evento.keyCode==88) document.location = "http://www.portalhacker.net/index.php/board,91.0.html";
		if(evento.shiftKey && evento.keyCode==78) document.location = "http://www.portalhacker.net/index.php/board,7.0.html";
		if(evento.shiftKey && evento.keyCode==79) document.location = "http://www.portalhacker.net/index.php/board,33.0.html";
		if(evento.shiftKey && evento.keyCode==90) document.location = "http://www.portalhacker.net/index.php/board,36.0.html";
		if(evento.shiftKey && evento.keyCode==75) document.location = "http://www.portalhacker.net/index.php/board,35.0.html";
		if(evento.shiftKey && evento.keyCode==66) document.location = "http://www.portalhacker.net/index.php/board,34.0.html";
		if(evento.shiftKey && evento.keyCode==81) document.location = "http://www.portalhacker.net/index.php/board,5.0.html";
		if(evento.shiftKey && evento.keyCode==71) document.location = "http://www.portalhacker.net/index.php/board,50.0.html";
	}
}

var elemento = document.getElementsByName("b8")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+F</span>';
var elemento = document.getElementsByName("b107")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+U</span>';
var elemento = document.getElementsByName("b1")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+D</span>';
var elemento = document.getElementsByName("b2")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+H</span>';
var elemento = document.getElementsByName("b37")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+S</span>';
var elemento = document.getElementsByName("b83")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+I</span>';
var elemento = document.getElementsByName("b69")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+A</span>';
var elemento = document.getElementsByName("b4")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+T</span>';
var elemento = document.getElementsByName("b116")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+E</span>';
var elemento = document.getElementsByName("b24")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+P</span>';
var elemento = document.getElementsByName("b22")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+V</span>';
var elemento = document.getElementsByName("b51")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+J</span>';
var elemento = document.getElementsByName("b112")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+Y</span>';
var elemento = document.getElementsByName("b18")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+C</span>';
var elemento = document.getElementsByName("b49")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+W</span>';
var elemento = document.getElementsByName("b25")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+M</span>';
var elemento = document.getElementsByName("b38")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+R</span>';
var elemento = document.getElementsByName("b82")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+L</span>';
var elemento = document.getElementsByName("b91")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+X</span>';
var elemento = document.getElementsByName("b7")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+N</span>';
var elemento = document.getElementsByName("b33")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+O</span>';
var elemento = document.getElementsByName("b36")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+Z</span>';
var elemento = document.getElementsByName("b35")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+K</span>';
var elemento = document.getElementsByName("b34")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+B</span>';
var elemento = document.getElementsByName("b5")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+Q</span>';
var elemento = document.getElementsByName("b50")[0];
elemento.innerHTML += '<span style="font-size: 80%; font-weight:normal; margin-left:20px;">SHIFT+G</span>';
