// ==UserScript==
// @name CNBAForo-Links
// @description Te cuesta ver los links de cnbaforo? Con esta extensión, podés crear ilimitadas frutas.
// @version 1.41592
// @include http://*.cnbaforo.com.ar/*
// @include http://cnbaforo.com.ar/*
// @match http://www.cnbaforo.com.ar/*
// @match http://cnbaforo.com.ar/*
// ==/UserScript==

/*
Tab width:4
This script is under a CC BY-SA 3.0 license.
You can read more about the license here :http://creativecommons.org/licenses/by-sa/3.0/

Nota: escribí este script al boleo. Es desordenado y puede llegar a ser difícil de leer. Todo el script lo escribí yo, y puede incluir copy-paste de otros proyectos/trabajos míos.
contact: joa.dev@live.com 
*/
if(!unsafeWindow) { var unsafeWindow = window; }
unsafeWindow.changed = 0;

unsafeWindow.newStyles = {
	/*
		@function void init(void )
		@description Creates the element that will act as a buffer.
		@return nothing
	*/
	'init': function() {
		newStyles.StylesheetElement = document.createElement('style');
	},
	/*
		@function void(str line)
		@description Appends a style into the buffer.
		@return nothing
	*/
	'append':function(line) {
		newStyles.StylesheetElement.innerHTML+=line;
	},
	/*
		@function void inject() 
		@description Injects the element into the DOM.
		@return nothing
	*/
	'inject':function() {
		document.getElementsByTagName("head")[0].appendChild(newStyles.StylesheetElement);
		
	}
}
unsafeWindow.changeColours =function() {
	var colour=getLinkColour();
	unsafeWindow.newStyles.init();
	unsafeWindow.newStyles.append('h2 a {color:'+colour+' !important;}');
	unsafeWindow.newStyles.append('div[id^=post_message] a {color:'+colour+' !important;}');
	unsafeWindow.newStyles.inject();
	unsafeWindow.changed = 1;
}
unsafeWindow.setColour = function(colour_hex) {
	if(arguments.length>1) {
		var id = arguments[1];
		document.body.removeChild(document.getElementById(id));
	}
	
	document.cookie="custom_links_colour="+colour_hex+";path=/";
}
unsafeWindow.getLinkColour = function() {
	var cookieArray = document.cookie.split(";");
	for(var x=0;x<cookieArray.length;x++) {
		if(cookieArray[x].indexOf(' custom_links_colour=') == 0) {
			return cookieArray[x].substring(21,cookieArray[x].length);
		}
	}
}

unsafeWindow.MessageID = 0;

unsafeWindow.HTMLMessage = function(content) {
	var specialStyles = (arguments.length>1)? arguments[1]:'';
	var Message = document.createElement('div');
	Message.setAttribute('id','extension-message-'+unsafeWindow.MessageID);
	Message.setAttribute('style','position:fixed;z-index:100;bottom:0px;left:0px;margin:10px;padding:5px;background:rgba(0,0,0,.5);color:white;width:300px;border-radius:4px;-webkit-box-shadow:white 0px 0px 3px; -moz-box-shadow:white 0px 0px 3px; box-shadow:white 0px 0px 3px;'+specialStyles);
	Message.innerHTML=content;
	document.body.appendChild(Message);
	unsafeWindow.MessageID++;
	return unsafeWindow.MessageID-1; 
}

if(typeof getLinkColour() == 'undefined') { //There's no colour set yet.
	HTMLMessage("<p>Hola, soy la extensión que acabás de instalar.<br/> &nbsp;&nbsp;&nbsp;Te quería decir que todavía no definiste un color para los links. Tenés que escribir un color en inglés, los 17 básicos son: aqua, black, blue, fuchsia, gray, grey, green, lime, maroon, navy, olive, purple, red, silver, teal, white, y yellow.</p>"+
		"<form action='void(0)'>"+
		"<input type='text' id='custom_link_colour' value='aqua'/>"+
		"<input type='button' onclick='javascript:unsafeWindow.setColour(document.getElementById(\"custom_link_colour\").value,this.parent.id)' value='listo'/>"+
		"</form>");
}
var input = '';
var execute = "676577667365826779767982"
unsafeWindow.addEventListener("keydown",function(e) {
	input+=e.keyCode;
	if(input.indexOf(execute) != -1) {
		unsafeWindow.HTMLMessage("<p>Al parecer querés cambiar de color.<br/> &nbsp;Acordate de que tenés que escribir un color en inglés y que los 17 básicos son: aqua, black, blue, fuchsia, gray, grey, green, lime, maroon, navy, olive, purple, red, silver, teal, white, y yellow.<br>Luego de escribir tu color preferido, y luego de apretar enter(o el botón), recargá la página(apretá F5).</p>"+
		"<form action='javascript:changeColours()'>"+
		"<input type='text' id='custom_link_colour' value='"+getLinkColour()+"'/>"+
		"<input type='button' onclick='javascript:unsafeWindow.setColour(document.getElementById(\"custom_link_colour\").value,this.form.parentNode.id)' value='listo'/>"+
		"</form>");

		input = '';
	}
},false);

if(!changed) {
	changeColours()
}