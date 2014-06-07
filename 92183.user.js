// ==UserScript==
// @name           Aemet weather animation
// @namespace      http://www.latinsud.com
// @include        http://www.aemet.es/*/eltiempo/observacion/*
// @match          http://www.aemet.es/*/eltiempo/observacion/*
// @version        1.0.4.1
// ==/UserScript==

// helper function to run code in the target
function codeEval(source) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  document.body.appendChild(script);
  document.body.removeChild(script);
}

// helper function to run function bodies in the target
function functionEval(source) {
  source = '(' + source + ')();'  
  codeEval(source);
}

// helper function to find absolute position of the mouse
function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	}
	return [curleft,curtop];
}

// Seek to a specified image
function doSeek(e) {
	if(dragging) {
		e.preventDefault();
		x=e.clientX-myPos[0];
		theFrame=parseInt(x/400*nFrames+0.5);
		if (theFrame < 0)
			theFrame=0;
		if (theFrame > nFrames)
			theFrame = nFrames;
		if (oldFrame == theFrame)
			return;
			
		document.getElementById('div3').style.left=20+theFrame*400/nFrames + "px";

		// this code magically reduces flickering		
		var imagen = construirCadena('imagen', theFrame);
		var objeto_img = getFirstElementChild(document.getElementById(imagen));
		
		boton_click(theFrame);
		oldFrame=theFrame;
	}
}

// Handle cursor keys
function handleCursor(e) {
	if (e.keyCode == 37) {
		e.preventDefault();
		if (idVisible>0) {
			var imagen = construirCadena('imagen', idVisible-1);
			var objeto_img = getFirstElementChild(document.getElementById(imagen));
			boton_click(idVisible-1);
		}
	} else if (e.keyCode == 39) {
		e.preventDefault();
		if (idVisible < nFrames) {
			var imagen = construirCadena('imagen', idVisible+1);
			var objeto_img = getFirstElementChild(document.getElementById(imagen));
			boton_click(idVisible+1);
		}
	} 
}

// (Un)Install cursor key listener
function installCursorListener() {
	if (document.getElementById('habilitarCursorId').checked) {
		document.body.addEventListener("keydown", handleCursor,true);
	} else {
		document.body.removeEventListener("keydown", handleCursor,true);
	}
}




// Run at start: Create the animation bar
function autorun() {
	anim = document.getElementById('animacion');


	// sanity check
	if (!anim) return;

	// some status variables
	dragging=0;
	clickX=0;
	clickY=0;
	myPos=0;
	oldFrame=-1;

	var div1=document.createElement('DIV');
	div1.className="texto_animacion";
	div1.innerHTML="Animaci&oacute;n manual:";

	var div2=document.createElement('DIV');
	div2.title="Arrastre el cursor verde para mover la animacion";
	div2.style.background="url(/imagenes/gif/controles_animacion/barra_desplazadora.gif)";
	div2.style.backgroundRepeat="repeat-x";
	div2.style.boder=0;
	div2.style.width="400px";
	div2.style.height="9px";
	div2.style.padding="0"; 
	div2.style.margin="0.8em auto 1em 1em";
	div2.addEventListener("mousedown", function(e) {
		e.preventDefault();
		dragging=1;
		myPos=findPos(this);
		doSeek(e);
	}, true);
	document.body.addEventListener("mouseup", function(e) {dragging=0;}, true);
	document.body.addEventListener("mousemove", doSeek, true);

	var div3=document.createElement('DIV');
	div3.id="div3";
	div3.style.padding=0;
	div3.style.margin=0;
	div3.style.left="20px";
	div3.style.top="22px";
	div3.style.width="12px";
	div3.style.height="12px";
	div3.style.position="absolute";
	div3.style.background="green";
	div3.className="puntero_mano";
	div2.appendChild(div3);

	var div4=document.createElement('DIV');
	div4.className="texto_animacion";
	div4.title="Use los cursores, es decir las flechas izquierda y derecha para mover la animacion";
	div4.innerHTML="Habilitar cursores:";

	var input1=document.createElement('INPUT');
	input1.type="checkbox";
	input1.id="habilitarCursorId";
	input1.checked=(localStorage['awa_cursor'] != 'false');
	div4.appendChild(input1);


	anim.insertBefore(div4, anim.firstChild);
	anim.insertBefore(div2, anim.firstChild);
	anim.insertBefore(div1, anim.firstChild);

	// get the total number of images available
	nFrames = document.getElementById('adelante').childNodes[0].getAttribute("onclick").match(/[0-9]+/);

	// checkbox handler
	document.getElementById('habilitarCursorId').addEventListener("change", function(e) {
	        localStorage['awa_cursor']=document.getElementById('habilitarCursorId').checked;
	        installCursorListener();
		}, true 
	); 
	installCursorListener();
}


// inject functions and run autorun function :)
codeEval(findPos);
codeEval(doSeek);
codeEval(handleCursor);
codeEval(installCursorListener);
functionEval(autorun);