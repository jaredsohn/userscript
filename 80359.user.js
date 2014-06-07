// ==UserScript==

// @name           carrera colombiaaprende

// @namespace      carrera colombiaaprende

// @include        *

// ==/UserScript==



if(window.location==window.parent.location)

{

	//===Estilos para la barra flotante===

	var DEFAULT_STYLESHEET ="#carrera_colombiaaprende {	bottom:0; height:50px; margin:0px 0px 0px 0px; position:fixed; width:100%; z-index:99; }";

	styleElem = document.createElement("style");

	styleElem.id = "estilo_carrera";

	styleElem.type = "text/css";

	var head = document.getElementsByTagName("head")[0];

	head.appendChild(styleElem);

	styleElem.appendChild(document.createTextNode(DEFAULT_STYLESHEET)); //inserción de los estilos 

	

	//===Creación del div para la barra flotante===

	var div = document.createElement('div');

	div.id = 'carrera_colombiaaprende';

	document.body.appendChild(div);

		

	var testFrame = document.createElement("iframe");

	testFrame.id = "carrera_colombiaaprende_iframe";

	testFrame.frameborder="0px";

	testFrame.width="100%"; //ancho

	testFrame.height ="50"; // alto

	testFrame.scrolling="no";

	testFrame.src = "http://foro2010-760432773.us-east-1.elb.amazonaws.com/eventos_virtuales/carrera/preguntas?url="+window.location;

	div.appendChild(testFrame);

}

