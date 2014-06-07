// ==UserScript==
// @name           EasyFlog
// @namespace      EasyFlog
// @description    Añade botones, para darle formato a tus posteos de Fotolog
// @include        http://*.fotolog.com/*
// ==/UserScript==

var buttonStyle = "margin: 2px 2px 2px 2px; border: 1px solid #999; "
var textarea = null;
var textarea = document.getElementById("guestbookMessage");
if(textarea==null){
var textarea= document.getElementById("caption");
}

//funciones

function imprimeTag(myField, etiquetaInicio, etiquetaFin){
	
	
	if (myField.selectionStart || myField.selectionStart == '0') 
	{
		var startPos = myField.selectionStart;
		var endPos = myField.selectionEnd;
		var cursorPos = endPos;
		if (startPos != endPos) 
		{
			myField.value = myField.value.substring(0, startPos)
			              +etiquetaInicio
			              + myField.value.substring(startPos, endPos)
			              +etiquetaFin
			              + myField.value.substring(endPos, myField.value.length);
			cursorPos +=etiquetaInicio.length +etiquetaFin.length;
		}
	
		else 
			{
			myField.value = myField.value.substring(0, startPos) 
			              +etiquetaInicio + etiquetaFin
			              + myField.value.substring(endPos, myField.value.length);
	
			cursorPos = startPos +etiquetaInicio.length;
			}
		}
		myField.focus();
		myField.selectionStart = cursorPos;
		myField.selectionEnd = cursorPos;
		
		return false;
}

function formateaEnlace(){
	
	var URL = prompt('Introduce la URL:' ,'http://');
	
	if (URL) {
			imprimeTag( textarea, URL, '');
			
			}
		
		return false;
}
unsafeWindow.formateaEnlace=formateaEnlace
unsafeWindow.imprimeTag=imprimeTag
unsafeWindow.textarea=textarea
//revisando el textarea
if(textarea==null){
}
else{
//creando el toolbar
var toolbarDiv = document.createElement('div');//barra

negrita=window.document.createElement('button');//negrita el boton
cursiva=window.document.createElement('button');
subrayado=window.document.createElement('button');
enlace=window.document.createElement('button');

//atributos		
negrita.setAttribute('style',buttonStyle);
negrita.setAttribute('onClick','return imprimeTag(textarea,"[b]","[/b]")')
negrita.innerHTML ="<b>negrita</b>";


cursiva.setAttribute('style',buttonStyle);
cursiva.setAttribute('onClick','return imprimeTag(textarea,"[i]","[/i]")');
cursiva.innerHTML='<i>cursiva</i>'

subrayado.setAttribute('style',buttonStyle);
subrayado.setAttribute('onClick','return imprimeTag(textarea,"[u]","[/u]")');
subrayado.innerHTML='<u>subrayado</u>'

enlace.setAttribute('style',buttonStyle);
enlace.setAttribute('onClick','return formateaEnlace()');
enlace.innerHTML='<font color="blue"> <u>enlace</u></font>'

//añadir botones a la toolbar
toolbarDiv.appendChild(negrita);
toolbarDiv.appendChild(cursiva);
toolbarDiv.appendChild(subrayado);
toolbarDiv.appendChild(enlace);
document.forms[1].insertBefore(toolbarDiv, document.forms[1].firstChild);
 
}

