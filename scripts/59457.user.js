// ==UserScript==
// @name           Anti-Registros Plus!
// @namespace      http://userscripts.org/users/JuampiMix
// @author         Juampi_Mix
// @description    Comprueba si hay un usuario registrado para la pagina, en la base de datos de BugMeNot.com, y asi no tener que registrarnos en la pagina.
// @include        http://*
// @include        https://*
// @exclude        *bugmenot.com*
// @url            http://userscripts.org/scripts/show/59457
// @version        3.23
// @icon           http://s3.amazonaws.com/uso_ss/icon/59457/large.jpg?1255145294
// @require        http://userscripts.org/scripts/source/60663.user.js
// @history        3.23 Pequeño retoque en el codigo que me olvide de realizarlo antes de darle a actualizar en la version 3.22
// @history        3.22 Agregado Icono (Compatible con Firefox 4)
// @history        3.21 Reparado el fallo que no dejaba funcionar el Actualizador Automatico.
// @history        3.20 Cambio de versión, para comprobación de rutina del actualizador 
// @history        3.10 Agregado actualizador automático
// @history        3.00 Rediseño y retoque del código
// @History        3.00 Creación del script

// ==/UserScript==

var retrievals = 0;
var BLUR_TIMEOUT = 750;
//phoneRegex = /(?:http://)(.*)/.*?/;
//doma= location.href.match( phoneRegex );
myString = location.href;
domainnameRE = new RegExp("(?:http://)(.*?)/.*?", "i");
domainname = myString.match(domainnameRE)
domainname = domainname[1];
//alert (domainname);
var allInputs = null;
var bmnView = "http://bugmenot.com/view";
var bmnUri = bmnView + "/" + domainname;
var bmnHomeUri = "http://bugmenot.com/";
var DEBUG = false;
var bmnWrappers = new Object();
var Style = {
	menuLink: {
		border: "none",
		backgroundColor: "cornflowerblue", 
		color: "black",
		display: "Block",
		padding: "2px",
		margin: "0px",
		width: "15em",
		fontSize: "8pt",
		fontWeight: "normal",
		textDecoration: "none"
	},
	menuLinkHover: {
		backgroundColor: "aqua",
		color: "black"
	},
	menuLinkWrapper: {
		textAlign: "left",
		padding: "1px",
		margin: 0
	},
	bmnWrapper: {
		display: "none",
		fontFamily: "tahoma, verdana, arial, sans-serif",
		whiteSpace: "nowrap",
		position: "absolute",
		zIndex: 1000,
		padding: "2px",
		border: "1px solid navy",
		backgroundColor: "midnightblue",
		opacity: "0.9",
		filter: "alpha(opacity=90)"
	}
};

function copyProperties(to, from) {
	for (var i in from) {
		to[i] = from[i];
	}
}

function main() {
	processPasswordFields();
}

function getBmnWrapper(pwFieldIndex) {
	return document.getElementById("reify-bugmenot-bmnWrapper" +
		pwFieldIndex);
}

function processPasswordFields() {
	var allInputs = document.getElementsByTagName("input");
	//allInputslength = allInputs.length;
	var bmnContainer = document.createElement("div");
	 bmnContainer.id = "reify-bugmenot-container";
	var bodyEl = document.getElementsByTagName("body")[0];
	if (!bodyEl) return;
	for (var i = 0; i < allInputs.length; i++) {
		var pwField = allInputs[i];
		//GM_log (allInputs[i].type.toLowerCase());
		if (!(pwField.type && pwField.type.toLowerCase() == "password")) {
			continue;
		}
		var previousTextFieldInd = getPreviousTextField(i,allInputs);
		if (previousTextFieldInd == -1) {
			if (DEBUG) {
			GM_log("No se pudo encontrar campo de texto antes de contraseñas " +
			   i + ".");
			continue;
			}
		}
		var usernameField = allInputs[previousTextFieldInd];
		usernameField.setAttribute('usernameInputIndex',
					   previousTextFieldInd);
		usernameField.setAttribute('passwordInputIndex', i);
		Utility.addEventHandler(usernameField, "focus",
					usernameField_onfocus);
		Utility.addEventHandler(usernameField, "blur",
					usernameField_onblur);
		Utility.addEventHandler(pwField, "focus", pwField_onfocus);
		Utility.addEventHandler(pwField, "blur", pwField_onblur);
		pwField.setAttribute('usernameInputIndex', previousTextFieldInd);
		pwField.setAttribute('passwordInputIndex', i);
		var getLoginLink = menuLink(bmnUri, "Buscar Usuario para este sitio",
			"Busca una cuenta registrada para este sitio",
			getLoginLink_onclick, Style.menuLink, previousTextFieldInd,
			i, menuLink_onmouseover, menuLink_onmouseout);
		var getLoginLinkWrapper = menuEntry(getLoginLink,
			Style.menuLinkWrapper);
		var fullFormLink = menuLink(bmnUri, "Mas Opciones",
			"Ver mas registros o informacion para este sitio en BugMeNot.com " +
			"(Nueva ventana) ", openMenuLink_onclick,
			Style.menuLink, previousTextFieldInd, i,
			menuLink_onmouseover, menuLink_onmouseout);
		var fullFormLinkWrapper = menuEntry(fullFormLink,
			Style.menuLinkWrapper);
		var visitBmnLink = menuLink(bmnHomeUri, "Visitar BugMeNot.com",
			"Ir a la pagina principal de BugMeNot.com (Nueva ventana)",
			openMenuLink_onclick, Style.menuLink, previousTextFieldInd,
			i, menuLink_onmouseover, menuLink_onmouseout);
		var visitBmnLinkWrapper = menuEntry(visitBmnLink,
			Style.menuLinkWrapper);
		var bmnWrapper = document.createElement("div");
		bmnWrapper.id = "reify-bugmenot-bmnWrapper" + i;
		bmnWrapper.className = "reify-bugmenot-bmnWrapper";
		bmnWrapper.appendChild(getLoginLinkWrapper);
		bmnWrapper.appendChild(fullFormLinkWrapper);
		bmnWrapper.appendChild(visitBmnLinkWrapper);
		copyProperties(bmnWrapper.style, Style.bmnWrapper);
		bmnContainer.appendChild(bmnWrapper);
	}
	if (bmnContainer.hasChildNodes()) {
		bodyEl.appendChild(bmnContainer);
	}
}

function menuEntry(linkEl, styleObj) {
	var p = document.createElement("p");
	copyProperties(p.style, styleObj);	
	p.appendChild(linkEl); 
	return p;
}

function menuLink(href, text, title, onclick, styleObj,
	usernameInputIndex, passwordInputIndex, onmouseover, onmouseout) {
	var newMenuLink = document.createElement("a");
	newMenuLink.href = href;
	newMenuLink.appendChild(document.createTextNode(text));
	newMenuLink.title = title;
	newMenuLink.setAttribute('usernameInputIndex', usernameInputIndex);
	newMenuLink.setAttribute('passwordInputIndex', passwordInputIndex);
	Utility.addEventHandler(newMenuLink, "click", onclick);
	Utility.addEventHandler(newMenuLink, "mouseover", onmouseover);
	Utility.addEventHandler(newMenuLink, "mouseout", onmouseout);
	copyProperties(newMenuLink.style, styleObj);
	return newMenuLink;
}

function menuLink_onmouseover(event) {
	event = event || window.event;
	var target = event.currentTarget || event.srcElement;
	copyProperties(target.style, Style.menuLinkHover);
}

function menuLink_onmouseout(event) {
	event = event || window.event;
	var target = event.currentTarget || event.srcElement;
	copyProperties(target.style, Style.menuLink);
}

function getLoginLink_onclick(event) {
	var allInputs = document.getElementsByTagName("input");
{
		getLogin(bmnUri, this.getAttribute('usernameInputIndex'),
			this.getAttribute('passwordInputIndex'));
	}
	menuLink_onmouseout({currentTarget: this});
	event.preventDefault && event.preventDefault( );
	return false;
}

function openMenuLink_onclick(event) {
	if (typeof GM_openInTab != 'undefined') {
		GM_openInTab(this.href);
	} else {
		window.open(this.href);
	}
	menuLink_onmouseout({currentTarget: this});
	event.preventDefault && event.preventDefault( );
	return false;
}

function usernameField_onfocus(event) {
	var allInputs = document.getElementsByTagName("input");
	event = event || window.event;
	var target = event.currentTarget || event.srcElement;
	target.setAttribute('hasFocus', true);
	showHideBmnWrapper(target, allInputs[target.
getAttribute('passwordInputIndex')], true);
}

function usernameField_onblur(event) {
	var allInputs = document.getElementsByTagName("input");
	event = event || window.event || this;
	var target = event.currentTarget || event.srcElement;
	target.setAttribute('hasFocus', false);
	var fRef = hideIfNoFocus(allInputs[target.
getAttribute('usernameInputIndex')],
		allInputs[target.getAttribute('passwordInputIndex')]);
	setTimeout(fRef, BLUR_TIMEOUT);
}

function pwField_onfocus(event) {
	var allInputs = document.getElementsByTagName("input");
	event = event || window.event;
	var target = event.currentTarget || event.srcElement;
	target.setAttribute('hasFocus', true);
	showHideBmnWrapper(allInputs[target.getAttribute('usernameInputIndex')],
			target, true);
}

function pwField_onblur(event) {
	var allInputs = document.getElementsByTagName("input");
	event = event || window.event;
	var target = event.currentTarget || event.srcElement;
	target.setAttribute('hasFocus', false);
	var fRef = hideIfNoFocus(allInputs[target.
getAttribute('usernameInputIndex')],
		allInputs[target.getAttribute('passwordInputIndex')]);
	setTimeout(fRef, BLUR_TIMEOUT);

}

function hideIfNoFocus(usernameField, pwField) {
	return (function( ) {
		var bUsernameFocus = usernameField.getAttribute('hasFocus');
		if (typeof bUsernameFocus == 'string') {
			bUsernameFocus = (bUsernameFocus && bUsernameFocus != 'false');
		}
		var bPasswordFocus = pwField.getAttribute('hasFocus');
		if (typeof bPasswordFocus == 'string') {
			bPasswordFocus = (bPasswordFocus && bPasswordFocus != 'false');
		}
		if ((!bUsernameFocus) && (!bPasswordFocus)) {
			showHideBmnWrapper(usernameField, pwField, false);
		}
	});
}

function showHideBmnWrapper(usernameField, pwField, show) {
	var bmnWrapper = getBmnWrapper(pwField.
getAttribute('passwordInputIndex'));
	if (show) {
		bmnWrapper.style.display = "block";
		positionBmnWrapper(bmnWrapper, usernameField, pwField);
	} else {
		//GM_log('hiding bugmenot wrapper');
		bmnWrapper.style.display = "none";
		var menuLinks = bmnWrapper.getElementsByTagName("div");
		for (var i = 0; i < menuLinks.length; i++) {
			copyProperties(menuLinks[i].style, Style.menuLink);
		}
	}
}

function positionBmnWrapper(bmnWrapper, usernameField, pwField) {
	var pwLeft = Utility.elementLeft(pwField);
	if (pwLeft + pwField.offsetWidth + bmnWrapper.offsetWidth +
		Utility.scrollLeft( ) + 10 < Utility.viewportWidth( )) {
		bmnWrapper.style.left = (pwLeft + pwField.offsetWidth + 2) + "px";
		bmnWrapper.style.top = Utility.elementTop(pwField) + "px";
	} else {
		bmnWrapper.style.left = (Utility.elementLeft(usernameField) -
			bmnWrapper.offsetWidth - 2) + "px";
		bmnWrapper.style.top = Utility.elementTop(usernameField) + "px";
	}
}

function getLogin(uri, usernameInputIndex, passwordInputIndex) {
	var allInputs = document.getElementsByTagName("input");
	var usernameField = allInputs[usernameInputIndex];
	var pwField = allInputs[passwordInputIndex];
	waitOrRestoreFields(usernameField, pwField, false);
	var hostUri = location.hostname;
	var firstAttempt = retrievals == 0;
	var submitData = "submit=This+login+didn%27t+work&num=" + retrievals +
		"&site=" + encodeURI(location.hostname);
	GM_xmlhttpRequest({
		method: firstAttempt ? "get" : "post",
		headers: firstAttempt ? null :
			{"Content-type": "application/x-www-form-urlencoded"},
		data: firstAttempt ? null : submitData,
		url: firstAttempt ? uri : bmnView,
		onload: function(responseDetails) {
if (responseDetails.status == 200) {
			waitOrRestoreFields(usernameField, pwField, true); 
			decoded = decodeit(responseDetails.responseText);
			var doc = textToXml(decoded);
			 if (!(doc && doc.documentElement)) {
			  return Errors.say(Errors.malformedResponse);
			 }
			var accountInfo = doc.documentElement.getElementsByTagName("td")[0];
			if (!(accountInfo)) {
			return Errors.say(Errors.noLoginAvailable);
			}
			usernameField.value = accountInfo.childNodes[0].nodeValue;
			var pwsField = doc.documentElement.getElementsByTagName("td")[1];		
			pwField.value = pwsField.childNodes[0].nodeValue;
			retrievals++;
		}else{
			return Errors.say(Errors.xmlHttpFailure);
			}
		},
		onerror: function(responseDetails) {
			waitOrRestoreFields(usernameField, pwField, true);
			Errors.say(Errors.xmlHttpFailure);
		}
	});
}

function waitOrRestoreFields(usernameField, pwField, restore) {
	document.documentElement.style.cursor = restore ? "default" : "progress";
	usernameField.value = restore ? "" : "Buscando Usuario...";
	//usernameField.disabled = !restore;
	//pwField.disabled = !restore;
}

function getPreviousTextField(pwFieldIndex,allInputs) {
	//var allInputs = document.getElementsByTagName("input");
	for (var i = pwFieldIndex; i >= 0 && i <allInputs.length; i--)
		if (allInputs[i].type && allInputs[i].type.toLowerCase( ) == "text")
			return i;
	return -1;
}

function decodeit(codedtext){ 
var regexkey = /var key = (.*?)\;/;
var match = regexkey.exec(codedtext);
if (match != null) {
var key = parseInt(match[1]);
} else {
	alert ("clave de descifrado no se puede encontrar cambio el sitio\nBugMeNot  ");
}
var codedtext = codedtext.replace(/<script>d\('(.*?)'\)\;<\/script>/gi, aaa);
//alert (codedtext);
return codedtext;
function aaa(str, strInput, offset, s){
	return d(strInput);
}

function decoder(data){
	var b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var o1,o2,o3,h1,h2,h3,h4,bits,i=0,enc='';do{h1=b64.indexOf(data.charAt(i++));
		h2=b64.indexOf(data.charAt(i++));
		h3=b64.indexOf(data.charAt(i++));
		h4=b64.indexOf(data.charAt(i++));
		bits=h1<<18|h2<<12|h3<<6|h4;o1=bits>>16&0xff;o2=bits>>8&0xff;o3=bits&0xff;
		if(h3==64)enc+=String.fromCharCode(o1);
		else if(h4==64)enc+=String.fromCharCode(o1,o2);
			else enc+=String.fromCharCode(o1,o2,o3)}while(i<data.length);
			return enc;
			}

function d(strInput){
	strInput=decoder(strInput);
	var strOutput="";
	var intOffset=(key+112)/12;
	for(i=4;i<strInput.length;i++){
		thisLetter=strInput.charAt(i);
		thisCharCode=strInput.charCodeAt(i);
		newCharCode=thisCharCode-intOffset;
		strOutput+=String.fromCharCode(newCharCode)
		}
		return strOutput;
		}
}

function textToXml(t) {
	try {
		if (typeof DOMParser != undefined) {
			//t = toString(t);
			//var dp = new DOMParser( );
			//return dp.parseFromString(t, "text/xml");
var parser = new DOMParser();
//var t = t.replace(/<\?xml.*?\?>/g, ""); // strip <?xml ?> tag
//t = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n<rando>" + t + "</rando>";
//t = t.replace(/&(?!\w*;)/g, "&");
//alert(t);
//alert(parser.parseFromString(t, "application/xml"));
return  parser.parseFromString(t, "application/xml");
		}
		else {
			return null;
		}
	}
	catch (e) {
		return null;
	}
}

var Errors = {
	noLoginAvailable: "Lamentablemente, no hay usuarios para este sitio \n" +
		" Si quieres contribuir, registra un nuevo usuario y clickea en \"More " +
		"options\" para compartir tu cuenta con nuevos visitantes para este sitio.",
	malformedResponse: "Lo sentimos, incorcordancia en la respuesta \n " +
		"de BugMeNot.com El servicio podría no estar disponible.",
	siteBlocked: "Lo sentimos, incorcordancia en la respuesta \n" +
		"de BugMeNot.com El servicio podría no estar disponible.",		
	xmlHttpFailure: "OCURRIO UN ERROR AL CONECTAR CON BUGMENOT.COM \n" +
		"Un Error puede ocurrir cuando: \n" +
		" \n" +
                "Si ya se encontro un usuario para este sitio, y quisiste volver a buscar un nuevo usuario.\n" +
                " \n" +
                "SOLUCION: Si el usuario suministrado por BugMeNot, no pudo iniciar satisfactoriamente \n" +
                "sesion, es por que alguien cambio la contraseña. Clickea en Mas Opciones para comprobar \n" +
                "si alguien compartio otro usuario para este sitio \n" +
                " \n" +
                "Tambien puede salir este mensaje, si el sitio esta bloqueado en la base de datos \n" +
                "de BugMeNot. Para comprobarlo, clickea en Mas Opciones y verifica que este sitio \n" +
                "no aparezca con el texto: SITE BLOCKED \n" +
                " \n" +
                "Otra de las causas por las que pueda aparecerte este error es porque \n" +
                "nadie compartio un usuario para este sitio. \n" +
                " \n" +
                "SOLUCION \n" +
                "Bueno, lamentablemente la unica solucion para este problema es registrar una nueva \n" +
                "cuenta para este sitio.\n" +
                " \n" +
                "RECOMENDACION \n" +
                "Para que otro usuario no pase por este engorroso tramite de registrar una nueva cuenta \n" +
                "puedes compartirla con todos los usuarios de BugMeNot.com \n" +
                "Una vez creada la nueva cuenta para este sitio, clickea en Mas Opciones, y registrala en \n" +
                "la base de datos de BugMeNot.com ",
	say: function(msg) { alert(msg); return false; }
};

var Utility = {
	elementTop: function(el) {
		return Utility.recursiveOffset(el, "offsetTop");
	},
	elementLeft: function(el) {
		return Utility.recursiveOffset(el, "offsetLeft");
	},
	recursiveOffset: function(el, prop) {
		var dist = 0;
		while (el.offsetParent)
		{
			dist += el[prop];
			el = el.offsetParent;
		}
		return dist;
	},
	viewportWidth: function( ) {
		return Utility.detectAndUseAppropriateObj("clientWidth");
	},
	viewportHeight: function( ) {
		return Utility.detectAndUseAppropriateObj("clientHeight");
	},
	scrollLeft: function( ) {
		return Utility.detectAndUseAppropriateObj("scrollLeft");
	},
	scrollTop: function( ) {
		return Utility.detectAndUseAppropriateObj("scrollTop");
	},
	detectAndUseAppropriateObj: function(prop) {
		if (document.documentElement && document.documentElement[prop]) {
			return document.documentElement[prop];
		}
		else if (document.body && document.body[prop]) {
			return document.body[prop];
		} else {
			return -1;
		}
	},
	addEventHandler: function(target, eventName, eventHandler) {
		if (target.addEventListener) {
			target.addEventListener(eventName, eventHandler, false);
		} else if (target.attachEvent) {
			target.attachEvent("on" + eventName, eventHandler);
		}
	}
};
main( );


ScriptUpdater.check(59457, '3.23');
ScriptUpdater.forceNotice(59457, '3.23');
ScriptUpdater.forceCheck(59457, '3.23');

function handleReturnedVersion(v) {
}
ScriptUpdater.check(59457, "3.23", handleReturnedVersion);
