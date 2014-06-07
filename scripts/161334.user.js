// ==UserScript==
// @name			Notificador correo ESPOL
// @namespace		http://dl.dropbox.com/u/24220832/
// @description		¡Recibe notificaciones en tu navegador cada que haya un e-mail nuevo en tu bandeja de entrada del correo ESPOL!
// @author			Chimecho
// @include			*mail.espol.edu.ec*
// @exclude			*mail.espol.edu.ec/horde/imp/login.php*
// @version			1.0
// ==/UserScript==

var refreshTime = 0.5; // Tiempo de actualización en minutos

// --------------- Variables de cotrol ---------------
var anterior = GM_getValue("anterior", 0);
var nuevo = 0;
// --------------- Variables de cotrol ---------------

function verifica() {
	window.console.log("Verificando correos...");
	currentMilis = Date.now();
	secs = (currentMilis - GM_getValue("lastrefresh", 0))/1000;
	if (secs < refreshTime*60) {
		window.console.log("Verificación cancelada, han pasado "+secs+" segundos. El tiempo de actualización es: "+refreshTime*60+" segundos.");
		setTimeout(verifyStatus, refreshTime*60000); // Programar una verificación para saber si el setTimeout está corriendo.
		return;
	}
	
	GM_setValue("lastrefresh", Date.now()+"");
	xmlhttp = new XMLHttpRequest();
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			parse(xmlhttp.responseText);
		}
	}
	
	xmlhttp.open("GET", "https://www.mail.espol.edu.ec/horde/services/portal/sidebar.php", true);
	xmlhttp.send(null);
}

function verifyStatus() {
	currentMilis = Date.now();
	secs = (currentMilis - GM_getValue("lastrefresh", 0))/1000;
	if (secs > (refreshTime+10)) { // Si no han habido actualizaciones por mucho tiempo
		window.console.log("Se detectó que el notificador no está encendido. Encendiendo...");
		verifica(); // Encendemos la verificación nuevamente
	}
}

function parse(txt) {
	pos = txt.search('"Entrada"');
	
	if (pos==-1) {
		pos = txt.search('<strong>Entrada');
		txt = txt.substr(pos+27);
		pos2 = txt.search('\\/');
		txt = txt.substr(0,pos2-1);
		
		if(pos==-1 || pos2==-1) {
			anterior=0;
		} else {
			nuevo = txt;
			
			if(nuevo>anterior) {
				txt = nuevo-anterior;				
				if(txt==1) {
					window.console.log("Tienes "+txt+" mail nuevo");
					alert("Tienes "+txt+" mail nuevo");
				} else {
					window.console.log("Tienes "+txt+" mails nuevos");
					alert("Tienes "+txt+" mails nuevos");
				}
			} else {
				window.console.log("No hay mails nuevos");
			}
			
			anterior = nuevo;
		}
	} else {
		anterior=0;
	}
	
	GM_setValue("anterior", anterior);
	setTimeout(verifica, refreshTime*60000);
}

verifica();