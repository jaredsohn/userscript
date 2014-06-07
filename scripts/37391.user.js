// ==UserScript==
// @name          Advertencias 0.1
// @namespace     advertencias
// @description   Script para el futuro envio directo de advertencias a una determinada pagina (En desarrollo).
// @include       http://*.ikariam.*/index.php?page=Thread&*
// ==/UserScript==
//
// Changelog (Vamos, los cambios)
// 0.14 - 21-07-2010 :	Add -> Recoge el ID de Usuario y su Nick (pendiente de revisar para que lo recoja sin simbolitos??) + Vinculo para enviar los parametros.
// 0.11	-	19-07-2010 :	Mod+Fix -> Corregido/Modificad el Include para que funcione en todos los dominios de Ikariam.
// 0.1	-	19-07-2010 :	Primera version funcional.

// Definimos Variables a utilizar.
var losDivs, elDiv;
// Fijamos la plantilla para reconocimiento de PostIDs
var plantillaid = '.*page=Thread&amp;postID=(.*)#post.*';
// Fijamos la plantilla para reconocimiento de UserIDs
var plantillauid = '.*page=User&amp;userID=(.*)" title.*';
// Fijamos la plantilla para reconocimiento de Usernames.
var plantillauname = '.*Ver perfil de  (.*)" class=.*';
// Buscamos los posts del hilo.
losDivs = document.evaluate("//div[@class='userMessenger']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
nombres = document.evaluate("//a[@class='threadStarter']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
// Recorremos todos los posts y colocamos en cada uno el añadido del script
for (var i = 0; i < losDivs.snapshotLength; i++) {
		// Rellenamos la variable temporal "elDiv" con el contenido del resultado en curso
		elDiv = losDivs.snapshotItem(i);
		// Cogemos el valor ID del resultado en curso
		//var name = document.getElementsById('span')[i];
		var postid = document.getElementsByClassName('messageCount')[i].innerHTML.match(plantillaid)[1];
		var uname = document.getElementsByClassName('userName')[i].innerHTML.match(plantillauname)[1];
		var userid = document.getElementsByClassName('userName')[i].innerHTML.match(plantillauid)[1];
		// Creamos un nuevo objeto, tipo div y lo rellenamos
		var bebe = document.createElement("div");
		bebe.innerHTML = '<div style="margin: 0 auto 0 auto; border: 1px solid #000000; margin-bottom: 10px; color: #0000ff;"><p style="margin: 1px 0 1px 0;"><a href="http://elmora1990.es/advtool/receptor.php?postID=' + postid + '&userID=' + userid + '&nick=' + uname +'">ID: ' + postid + ' UserID : ' + userid + ' Nick : ' + uname + '</a></p></div>';
		//bebe.innerHTML = '<div style="margin: 0 auto 0 auto; border: 1px solid #000000; margin-bottom: 10px; color: #0000ff;"><p style="margin: 1px 0 1px 0;">ID: ' + uname + '</p></div>';
		// Insertamos nuestro objeto "antes" del contenido usado para buscar
		elDiv.parentNode.insertBefore(bebe, elDiv);
}