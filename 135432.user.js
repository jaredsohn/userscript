// ==UserScript==
// @name        Kronos MCAnime - Auto Actualizar Notificaciones
// @namespace   Zeyth
// @description Recarga todas las notificaciones [Solicitudes, MPs, Feeds, Foros] automaticamente cada 10 segundos.
// @include     http://kronos.mcanime.net/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant		GM_XMLHttpRequest
// @version     1.5
// ==/UserScript==

//Retrasamos 2 segundos la ejecucion para evitar problemas
setTimeout(function(){
var title= document.title; // Tomamos el Titulo Original
if ($('li#ua-notifications').length > 0) {
function loop()
	{
		var xhr = new XMLHttpRequest();  
				xhr.open("GET", "http://kronos.mcanime.net/not.php", true); //Url Falsa que da error 404, la pagina mas ligera que encontre para sacar informacion de ella
				xhr.onload = function(e) {
				var tid = setTimeout(loop, 10000);
                var respDoc = $(xhr.response);
                var notifications   = $("li#ua-notifications > a > span", respDoc).text();
				var messages   = $("li#ua-messages > a > span", respDoc).text();
				var friend   = $("li#ua-friend-requests > a > span", respDoc).text();
				var forum   = $("li#ua-posts > a > span", respDoc).text();
				//Actualizar Titulo, Gracias a @RCR
				if (notifications<=0){notifications=0;}
				if (messages<=0){messages=0;}
				if (friend<=0){friend=0;}
				if (forum<=0){forum=0;} 
				var sum= parseInt(notifications) + parseInt(messages)+ parseInt(friend) + parseInt(forum); //Sumar notificaciones
				if(sum>0) {
				document.title="["+sum+"] "+title+""; //Si hay notificaciones nuevas las agrega al titulo
				}
				else {
				document.title=""+title+""; //Si no hay notificaciones muestra solo el titulo original
				} 
				//Flojera de hacer una nueva funcion, loop se ha dicho haha
				//Notificaciones
				if (notifications > 0) {
				$("li#ua-notifications > a  > span").html (notifications);
				$("li#ua-notifications > a").addClass ("new");
				}
				if (notifications <= 0) {
				$("li#ua-notifications > a  > span").html (notifications);
				$("li#ua-notifications > a").removeClass ("new");
				}
        		// Mensajes Privados
				if (messages > 0) {
				$("li#ua-messages > a  > span").html (messages);
				$("li#ua-messages > a").addClass ("new");
				}
				if (messages <= 0) {
				$("li#ua-messages > a  > span").html (messages);
				$("li#ua-messages > a").removeClass ("new");
				}
                // Solicitudes de Amistad
				if (friend > 0) {
				$("li#ua-friend-requests > a  > span").html (friend);
				$("li#ua-friend-requests > a").addClass ("new");
				}
        		if (friend <= 0) {
				$("li#ua-friend-requests > a  > span").html (friend);
				$("li#ua-friend-requests > a").removeClass ("new");
				}
				// Grupos y Foro
				if (forum > 0) {
				$("li#ua-posts > a  > span").html (forum);
				$("li#ua-posts > a").addClass ("new");
				}
				if (forum <= 0) {
				$("li#ua-posts > a  > span").html (forum);
				$("li#ua-posts > a").removeClass ("new");
				}
            }
		xhr.send(); 
}
	var tid = setTimeout(loop, 10000);
}
},2000);