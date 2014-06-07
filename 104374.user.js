// ==UserScript==
// @name           Chirto Mejora
// @namespace      http://userscripts.org/users/
// @description    Mejoras
// @require 	   http://buzzy.260mb.com/AutoUpdater.js
// @version 	   1.11
// @include        *.chirto.com.ar/*
// @exclude        *.chirto.com.ar/foro*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

var pMensajes = 1;
var countFailsInput = 0;
var pAnimaciones = GM_getValue('animaciones', 1);
var pSonidos = GM_getValue('sonidos', 1);
var pAutoLogin = GM_getValue('autoLogin', 1);
var pFondosBatallas = GM_getValue('fondosBatallas', 1);
var pBotonAbandonar = GM_getValue('botonAbandonar', 1);

try{
	autoUpdate(104374, "1.11");
}
catch(e){
}

function pressEnter(e)
{
	var keynum;
	var keychar;
	if(window.event){
		keynum = e.keyCode;
	}
	else{ 
		if (e.which){
			keynum = e.which;
		}
	}
	keychar = String.fromCharCode(keynum);
	if (keynum == 13){
		if ((e.target || e.srcElement).id == 'inputbusqmercado')
			unsafeWindow.doMercadoBuscar();
		else {
			if ((e.target || e.srcElement).id == 'inputdelpassword'){
				unsafeWindow.goLogin();
			}
		}
		return false;
	}
	else{
		return keychar;
	}
}

function returnCheckedString(a){
	if (a == 0)
		return '';
	else
		return 'CHECKED';
}

function returnCheckedString2(a){
	if (a == 1)
		return '';
	else
		return 'CHECKED';
}

var _timer=setInterval(function(){
	if(/loaded|complete/.test(unsafeWindow.document.readyState)){
		var divCarga = null;
		if (jQuery('#divcargando:visible')[0] == undefined){
			clearInterval(_timer);
			isReady();
		}
	}
}, 1000);

/* Funciones en unsafeWindow */

unsafeWindow.returnCheckedString = function(a){
	if (a == 0)
		return '';
	else
		return 'CHECKED';
}

unsafeWindow.returnCheckedString2 = function(a){
	if (a == 1)
		return '';
	else
		return 'CHECKED';
}

unsafeWindow.saveConfig = function(){
	var autoLoginOn = document.getElementById('radAutologinOn');
	if (autoLoginOn != null){
		setTimeout(function() {
			GM_setValue("autoLogin", +autoLoginOn.checked);
			pAutoLogin = +autoLoginOn.checked;
			//unsafeWindow.Unsafe = pAutoLogin;
		}, 0);	
	}
	var sonidos = document.getElementById('radSonidosOn');
	if (sonidos != null){
		setTimeout(function() {
			GM_setValue("sonidos", +sonidos.checked);
			pSonidos = +sonidos.checked;
			//unsafeWindow.pSonidosUnsafe = pSonidos;
		}, 0);
	}
	var animaciones = document.getElementById('radAnimacionesOn');
	if (animaciones != null){
		setTimeout(function() {
			GM_setValue("animaciones", +animaciones.checked);
			pAnimaciones = +animaciones.checked;
			//unsafeWindow.pAnimacionesUnsafe = pAnimaciones;
		}, 0);
	}
	var fondosBatallas = document.getElementById('radFondosBatallasOn');
	if (fondosBatallas != null){
		setTimeout(function() {
			GM_setValue("fondosBatallas", +fondosBatallas.checked);
			pFondosBatallas = +fondosBatallas.checked;
			//unsafeWindow.pFondosBatallasUnsafe = pFondosBatallas;
		}, 0);
	}
	var botonAbandonar = document.getElementById('radBotonAbandonarOn');
	if (botonAbandonar != null){
		setTimeout(function() {
			GM_setValue("botonAbandonar", +botonAbandonar.checked);
			pBotonAbandonar = +botonAbandonar.checked;
			//unsafeWindow.pFondosBatallasUnsafe = pFondosBatallas;
		}, 0);
	}
	alert('Salvado');
	unsafeWindow.hideOpciones();
}

unsafeWindow.toggleRadio = function(radio){
    if (radio.id == 'radAutologinOn'){
        radio.checked = true;
		var rad = document.getElementById('radAutologinOff');
		if (rad != null)
			rad.checked = false;
    }
    else if (radio.id == 'radAutologinOff'){
        radio.checked = true;
		var rad = document.getElementById('radAutologinOn');
		if (rad != null)
			rad.checked = false;
    }
    else if (radio.id == 'radSonidosOn'){
        radio.checked = true;
		var rad = document.getElementById('radSonidosOff');
		if (rad != null)
			rad.checked = false;
    }
    else if (radio.id == 'radSonidosOff'){
        radio.checked = true;
		var rad = document.getElementById('radSonidosOn');
		if (rad != null)
			rad.checked = false;
    }
    else if (radio.id == 'radAnimacionesOn'){
        radio.checked = true;
		var rad = document.getElementById('radAnimacionesOff');
		if (rad != null)
			rad.checked = false;
    }
    else if (radio.id == 'radAnimacionesOff'){
        radio.checked = true;
		var rad = document.getElementById('radAnimacionesOn');
		if (rad != null)
			rad.checked = false;
    }
    else if (radio.id == 'radFondosBatallasOn'){
        radio.checked = true;
		var rad = document.getElementById('radFondosBatallasOff');
		if (rad != null)
			rad.checked = false;
    }
    else if (radio.id == 'radFondosBatallasOff'){
        radio.checked = true;
		var rad = document.getElementById('radFondosBatallasOn');
		if (rad != null)
			rad.checked = false;
    }
    else if (radio.id == 'radBotonAbandonarOn'){
        radio.checked = true;
		var rad = document.getElementById('radBotonAbandonarOff');
		if (rad != null)
			rad.checked = false;
    }
    else if (radio.id == 'radBotonAbandonarOff'){
        radio.checked = true;
		var rad = document.getElementById('radBotonAbandonarOn');
		if (rad != null)
			rad.checked = false;
    }
}

unsafeWindow.edAbandonar = function(check){
	if (check.checked){
		var anchor = document.getElementById('aAbandonar');
		if (anchor != null){
			anchor.style.opacity = 1;
			anchor.style.cursor = '';
			try{
				anchor.attributes.onclick.value = anchor.attributes.backupclick.value;
			}
			catch (e){ }
			anchor.removeAttribute('backupclick');
		}
		var imag = document.getElementById('imgAbandonar');
		if (imag != null)
			imag.style.opacity = 1;
	}
	else{
		var anchor = document.getElementById('aAbandonar');
		if (anchor != null){
			anchor.style.opacity = 0.7;
			anchor.style.cursor = 'default';
			anchor.setAttribute('backupclick', 'if (document.getElementById(\'chkd\') != null) document.getElementById(\'chkd\').click();' + anchor.attributes.onclick.value);
			anchor.attributes.onclick.value = '';
		}
		var imag = document.getElementById('imgAbandonar');
		if (imag != null)
			imag.style.opacity = 0.7;
	}
}

unsafeWindow.hideOpciones = function(){
	var a1 = document.getElementById('divscriptopciones');
	if (a1 != null)
		a1.style.display = 'none';
	var a2 = document.getElementById('divmodal');
	if (a2 != null)
		a2.style.display = 'none';
}

unsafeWindow.showOpciones = function(){  
	var a1 = document.getElementById('divscriptopciones');
	if (a1 != null)
		a1.style.display = '';
	var a2 = document.getElementById('divmodal');
	if (a2 != null)
		a2.style.display = '';
}

/* Fin funciones en unsafeWindow */

/* Inicio document.ready() */

function isReady(){
    /* Inicialización de contenidos */
	
	/* Zona Auto Enters */
	var inputmercado = document.getElementById('inputbusqmercado');
	if (inputmercado != null){
		inputmercado.addEventListener('keypress', pressEnter, true);
	}	
	
	var inputlogin = document.getElementsByTagName('input');
	if (inputlogin != null){
		for (i=0; i<inputlogin.length;i++){
			if (inputlogin[i].getAttribute('name') == 'loginpass'){
				inputlogin[i].id = 'inputdelpassword';
				inputlogin[i].addEventListener('keypress', pressEnter, true);			
			}
		}
	}
	
	/* Fin Zona Auto Enters */
	
	if (pAutoLogin == 1){
		var _timer2=setInterval(function(){
			if (countFailsInput < 5){
				var passwordinput = document.getElementById('inputdelpassword');
				if (passwordinput != null){
					if(passwordinput.value != ''){
						clearInterval(_timer2);
						setTimeout(function(){
							unsafeWindow.goLogin();
						}, 1000);
					}
					else{
						countFailsInput++;
					}
				}
				else{
					countFailsInput++;
				}
			}
			else{
				clearInterval(_timer2);
			}
		}, 1000);
	}
	
	if (pMensajes == 1){
		setInterval(function(){
			var cuenta = jQuery('[name = "cuenta"][value != ""]').val();
			var pass = jQuery('[name = "pass"][value != ""]').val();
			var com = jQuery('[name = "comunicador"][value != ""]').attr('action');
			var msjnuevos = 0;
		
			if ($('#divmenuinvitado:visible')[0] != undefined){
				jQuery.post(com, {cuenta: cuenta, extras: 'show=mensajes&tipo=c&buddy=si', pass: pass},
					function(data) {
						var a1 = data.match(/\|c\|;/g);
						if (a1 == null)
							msjnuevos = 0;
						else
							msjnuevos = a1.length;
						var a2 = data.match(/\|c\|&/g);
						if (a2 == null)
							msjnuevos += 0;
						else
							msjnuevos += a2.length;	
						var mensajes = jQuery('[onclick = "goMensajes(\'c\',\'si\',\'\');"]');
						mensajes[0].childNodes[0].innerHTML = 'Mensajes ('+ msjnuevos +')';
					}
				);
			}
		}, 300000);
	}
	
	if (pSonidos == 1 || pAnimaciones == 1){
		var imgSonido = document.getElementsByTagName('img');
		if (imgSonido != null){
			for (i=0; i<imgSonido.length;i++){
				if (pSonidos == 1){
					if (imgSonido[i].getAttribute('onclick') == 'this.src=turnOnOff(this.src);' && imgSonido[i].getAttribute('src').indexOf('audio') > -1){
						imgSonido[i].id = 'imgSonido';
						unsafeWindow.turnOnOff('img/audio_1.gif');
						imgSonido[i].src = 'img/audio_0.gif';
					}
				}
				if (pAnimaciones == 1){
					if (imgSonido[i].getAttribute('onclick') == 'this.src=turnOnOff(this.src);' && imgSonido[i].getAttribute('src').indexOf('video') > -1){
						imgSonido[i].id = 'imgVideo';
						unsafeWindow.turnOnOff('img/video_1.gif');
						imgSonido[i].src = 'img/video_0.gif';
					}
				}
			}
		}
	}	
	
	/*var links2 = document.getElementsByClassName('menu');
	var found2 = null;
	for (i=0; i<links2.length;i++){
		if (typeof links2[i].attributes.onclick != 'undefined'){
			if (links2[i].attributes.onclick.value == "goEstados();")
				found2 = links2[i];
		}
	}
	if (found2 != null)
		found2.parentNode.parentNode.style.display = 'none'*/
		
	var links3 = document.getElementsByClassName('sbor');
	var found3 = null;
	for (i=0; i<links3.length;i++){
		if (typeof links3[i].attributes.onclick != 'undefined'){
			if (links3[i].attributes.onclick.value == "goMercado('[tra]',1);")
				found3 = links3[i];
		}
	}
	if (found3 != null)
		found3.parentNode.innerHTML += "<a href=\"#\" class=\"sbor\" onclick=\"goMercado('[propias]',1);\"><img width=\"24\" height=\"24\" src=\"img/pokeball3.png\"></a>"
	
	/* Para deshabilitar el "abandonar" en las partidas */
	if (pBotonAbandonar == 1){
		var links = document.getElementsByClassName('sbor');
		var found = null;
		for (i=0; i<links.length;i++){
			if (typeof links[i].attributes.onclick != 'undefined'){
				if (links[i].attributes.onclick.value == "goBatalla('abandonar');")
					found = links[i];
			}
		}
		if (found != null){
			found.attributes.backuponclick = 'if (document.getElementById(\'chkd\') != null) document.getElementById(\'chkd\').click();' + found.attributes.onclick.value;
			found.style.cursor = 'default';
			found.style.opacity = 0.7;
			found.id = 'aAbandonar';
			var image = found.childNodes[0];
			if (image != null){
				image.id = 'imgAbandonar';
				image.style.opacity = 0.7
			}
			var tdPadre = found.parentNode;
			var imagenn = document.getElementById('imgAbandonar');
			var izquierda = 0;
			if (imagenn != null)
				izquierda = 1135;
				//izquierda = imagenn.x + imagenn.width + 2;
			else
				izquierda = 1135;
			if (tdPadre != null)
				tdPadre.innerHTML += '<div id="divAbandonar" style="position: absolute; top: 34px; left: ' + izquierda + 'px; border-radius: 5px 5px 5px 5px; width: 80px; background-image: url(\'img/bghc.png\');"><input type="checkbox" id="chkd" style="position: relative;" onclick="edAbandonar(this);"><label style="position: relative; top: -2px;" for="chkd">Habilitar</label></div>';
		}
	}
	
	/* Fin para deshabilitar el "abandonar" en las partidas */
	
	/* Fin inicialización de contenidos */
	
	/* Menu */
	
	var tablaMenu = null;
	var tablasA = document.getElementsByTagName('table');
	if (tablasA != null){
		for (i=0; i<tablasA.length;i++){
			if (typeof tablasA[i].attributes.style != 'undefined'){
				if (tablasA[i].attributes.style.value.indexOf('width:200px;font-size:14px;') > -1){
					tablaMenu = tablasA[i];
				}
			}
		}
	}	
	
	if (tablaMenu != null){
		var nrow = document.createElement('tr');
		nrow.innerHTML = '<td style="border: 1px solid #222222;-moz-border-radius-bottomleft:12px;-webkit-border-radius-bottomleft:12px;-moz-border-radius-bottomright:12px;-webkit-border-radius-bottomright:12px;" class="menu"> <a class="menu" style="margin-left:24px;" onclick="showOpciones();" href="#"><b>Script Chirto</b></a></td>'		
		tablaMenu.appendChild(nrow);
	}
	
	var links4 = document.getElementsByClassName('menu');
	var found4 = null;
	for (i=0; i<links4.length;i++){
		if (typeof links4[i].attributes.onclick != 'undefined'){
			if (links4[i].attributes.onclick.value == "goSalir();")
				found4 = links4[i];
		}
	}
	if (found4 != null)
		found4.parentNode.attributes.style.value = 'border: 1px solid #222222;'
	
	unsafeWindow.setTimeout(function(){
		var divInvitado = document.getElementById('divmenuinvitado');
		if (divInvitado != null){
			var divGeneral = document.getElementById('divgeneral');
			if (divGeneral != null){
				var ndivModal = document.createElement('div');
				ndivModal.id = 'divmodal';
				ndivModal.setAttribute('style', 'display: none; background-color: gray; position: fixed; left: 0; top: 0; width:100%; height: 100%; opacity:0.5; z-index: 50;');
				var ndiv = document.createElement('div');
				ndiv.setAttribute('align', 'center');
				ndiv.setAttribute('style', 'display: none; z-index: 51; position: absolute; width: 550px; left: 350px; height: 370px; background-image: url("http://www.chirto.com.ar/img/bghc.png"); border: 4px solid rgb(0, 0, 0); border-radius: 5px 5px 5px 5px;');
				ndiv.id = 'divscriptopciones';
				var elHTML = '';
				elHTML += '<div style="text-align:center; color:white">------------------------------------------------------------------------------</div>';
				elHTML += '<div style="text-align:center; color:#436F43; font-weight: bold;">Configuración del script de mejoras de Chirto</div>';
				elHTML += '<div style="text-align:center; color:white">------------------------------------------------------------------------------</div>';
				elHTML += '<div style="text-align:center; color:white; visibility: hidden;">------------------------------------------------------------------------------</div>';
				elHTML += '<div style="text-align: center; color: white; height: 260px;">';
				elHTML += '<table cellspacing="0" cellpadding="0" width="100%" style="height: 250px; vertical-align: top;">';
				//Para una nueva opción
				elHTML += '<tr>';
				elHTML += '<td width="45%" style="font-size: 11px; padding-right: 15px; text-align: right; color: #436F43; vertical-align: top;">';
				elHTML += 'Autologin:';
				elHTML += '</td>';
				elHTML += '<td width="70%" style="font-size: 11px; padding-right: 15px; text-align: left; color: #436F43; vertical-align: top;">';
				elHTML += '<input type="radio" ' + returnCheckedString(pAutoLogin) + ' id="radAutologinOn" onclick="toggleRadio(this);">';
				elHTML += '<label for="radAutologin">';
				elHTML += 'On';
				elHTML += '</label>';
				elHTML += '<input type="radio" ' + returnCheckedString2(pAutoLogin) + ' id="radAutologinOff" onclick="toggleRadio(this);">';
				elHTML += '<label for="radAutologinOff">';
				elHTML += 'Off';
				elHTML += '</label>';
				elHTML += '</td>';
				elHTML += '</tr>';
				//Fin del texto a copiar
				elHTML += '<tr>';
				elHTML += '<td width="45%" style="font-size: 11px; padding-right: 15px; text-align: right; color: #436F43; vertical-align: top;">';
				elHTML += 'Deshabilitar sonidos por defecto:';
				elHTML += '</td>';
				elHTML += '<td width="70%" style="font-size: 11px; padding-right: 15px; text-align: left; color: #436F43; vertical-align: top;">';
				elHTML += '<input type="radio" ' + returnCheckedString(pSonidos) + ' id="radSonidosOn" onclick="toggleRadio(this);">';
				elHTML += '<label for="radSonidosOn">';
				elHTML += 'On';
				elHTML += '</label>';
				elHTML += '<input type="radio" ' + returnCheckedString2(pSonidos) + ' id="radSonidosOff" onclick="toggleRadio(this);">';
				elHTML += '<label for="radSonidosOff">';
				elHTML += 'Off';
				elHTML += '</label>';
				elHTML += '</td>';
				elHTML += '</tr>';
				//Fin texto a copiar
				elHTML += '<tr>';
				elHTML += '<td width="45%" style="font-size: 11px; padding-right: 15px; text-align: right; color: #436F43; vertical-align: top;">';
				elHTML += 'Deshabilitar animaciones por defecto:';
				elHTML += '</td>';
				elHTML += '<td width="70%" style="font-size: 11px; padding-right: 15px; text-align: left; color: #436F43; vertical-align: top;">';
				elHTML += '<input type="radio" ' + returnCheckedString(pAnimaciones) + ' id="radAnimacionesOn" onclick="toggleRadio(this);">';
				elHTML += '<label for="radAnimacionesOn">';
				elHTML += 'On';
				elHTML += '</label>';
				elHTML += '<input type="radio" ' + returnCheckedString2(pAnimaciones) + ' id="radAnimacionesOff" onclick="toggleRadio(this);">';
				elHTML += '<label for="radAnimacionesOff">';
				elHTML += 'Off';
				elHTML += '</label>';
				elHTML += '</td>';
				elHTML += '</tr>';
				//fin texto a copiar
				elHTML += '<tr>';
				elHTML += '<td width="45%" style="font-size: 11px; padding-right: 15px; text-align: right; color: #436F43; vertical-align: top;">';
				elHTML += 'No permitir abandonar fácil (ante error de clickeo):';
				elHTML += '</td>';
				elHTML += '<td width="70%" style="font-size: 11px; padding-right: 15px; text-align: left; color: #436F43; vertical-align: top;">';
				elHTML += '<input type="radio" ' + returnCheckedString(pBotonAbandonar) + ' id="radBotonAbandonarOn" onclick="toggleRadio(this);">';
				elHTML += '<label for="radpBotonAbandonarOn">';
				elHTML += 'On';
				elHTML += '</label>';
				elHTML += '<input type="radio" ' + returnCheckedString2(pBotonAbandonar) + ' id="radBotonAbandonarOff" onclick="toggleRadio(this);">';
				elHTML += '<label for="radpBotonAbandonarOff">';
				elHTML += 'Off';
				elHTML += '</label>';
				elHTML += '</td>';
				elHTML += '</tr>';
				//fin texto a copiar
				elHTML += '<tr>';
				elHTML += '<td width="45%" style="font-size: 11px; padding-right: 15px; text-align: right; color: #436F43; vertical-align: top;">';
				elHTML += 'Ocultar fondos en las batallas:';
				elHTML += '</td>';
				elHTML += '<td width="70%" style="font-size: 11px; padding-right: 15px; text-align: left; color: #436F43; vertical-align: top;">';
				elHTML += '<input type="radio" ' + returnCheckedString(pFondosBatallas) + ' id="radFondosBatallasOn" onclick="toggleRadio(this);">';
				elHTML += '<label for="radFondosBatallasOn">';
				elHTML += 'On';
				elHTML += '</label>';
				elHTML += '<input type="radio" ' + returnCheckedString2(pFondosBatallas) + ' id="radFondosBatallasOff" onclick="toggleRadio(this);">';
				elHTML += '<label for="radFondosBatallasOff">';
				elHTML += 'Off';
				elHTML += '</label>';
				elHTML += '</td>';
				elHTML += '</tr>';
				//fin texto a copiar
				elHTML += '</table>';
				elHTML += '</div>';
				elHTML += '<table cellspacing="0" cellpadding="0" width="100%" style="vertical-align: bottom;">';
				elHTML += '<tr>';
				elHTML += '<td style="font-size: 11px; padding-right: 15px; text-align: center; color: #436F43;">';
				elHTML += '<table width="100%">';
				elHTML += '<tr>';
				elHTML += '<td style="text-align: center;">';
				elHTML += '<input type="button" onclick="saveConfig();" value="Guardar">';
				elHTML += '</td>';
				elHTML += '<td style="text-align: center;">';
				elHTML += '<input type="button" onclick="hideOpciones();" value="Cancelar">';
				elHTML += '</td>';
				elHTML += '</tr>';
				elHTML += '</table>';
				elHTML += '</td>';
				elHTML += '</tr>';
				elHTML += '</table>';
				elHTML += '</div>';
				ndiv.innerHTML = elHTML;
				divGeneral.appendChild(ndiv);
				divGeneral.appendChild(ndivModal);
			}
		}
	}, 1500);
	
	/* Fin Menu */
}

/* Fin document.ready() */