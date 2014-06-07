// ==UserScript==
// @name           Fisgona mejorada
// @namespace      fisgona
// @description    Añade un botón en la fisgona para enviar el mensaje por amigos, mantiene foco (cursor) en el área de mensaje, elimina la coletilla "mensaje" delante del campo, elimina el banner y añade la navegación a las pestañas de la fisgona.
// @include        http://meneame.net/sneak.php
// ==/UserScript==

menu	=	"<li style=\"margin-left:20px\"><a href=\"/\">portada</a></li>" +
			"<li><a href=\"/notame\">nótame</a></li>" +
			"<li><a href=\"/shakeit.php\">pendientes</a></li>";
css	=		".banner-top,#naviwrap{display:none;}.tabmain{margin-top:-100px;}#eli{background:none;height:5px;width:100%;}";
buttons	=	"<input type=\"text\" name=\"comment\" id=\"comment-input\" value=\"\" size=\"90\" maxlength=\"230\" autocomplete=\"off\" />" +
			"&nbsp;" +
			"<input type=\"submit\" value=\"enviar\" class=\"button\" onclick=\"document.getElementById('comment-input').focus();\"/>" +
			"&nbsp;" +
			"<input value=\"enviar por amigos\" class=\"button\" type=\"submit\" " +
			"onclick=\"if(document.getElementById('comment-input').value.length > 3){" +
			"document.getElementById('comment-input').value='@'+document.getElementById('comment-input').value;}" +
			"document.getElementById('comment-input').focus();\">";
if(!document.location.href.match("friends")) document.getElementsByName("chat_form")[0].innerHTML = buttons;
document.getElementById("comment-input").focus();
GM_addStyle(css);
lists = document.getElementsByTagName('ul'); for (i = 0, j = 0; i < lists.length; i++) if(lists[i].className == "tabmain") lists[i].innerHTML += menu;