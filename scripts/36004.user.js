// ==UserScript==
// @name           Desplegable failsafe v0.2 (by Kartoffel - cookie extras by: SirKeldon )
// @namespace      http://meneame.net/sneak.php
// @description    Desplegable para evitar FAILS tanto por amigos como por admin (en caso de que lo seas)
// @include        http://meneame.net/sneak.php
// @include        http://meneame.net/sneak.php?friends=1
// ==/UserScript==

var js = document.createElement('script');
js.setAttribute('id', 'new-send-chat');
js.setAttribute('type', 'text/javascript');
js.text = 'function GetCookie(name){ \n var cookieValue = ""; \n var search = name + "="; \n if(document.cookie.length > 0) { \n offset = document.cookie.indexOf(search); \n if (offset != -1) { \n offset += search.length; \n end = document.cookie.indexOf(";", offset); \n if (end == -1) end = document.cookie.length; \n cookieValue = unescape(document.cookie.substring(offset, end)) \n } \n } \n return cookieValue; \n } \n function SetCookie(CookieName, CookieValue){ \n ExpiryDate = new Date(); \n ExpiryDate.setTime(ExpiryDate.getTime() + 2000*24*60*60*1000); \n 	var ExpiryDateString = "; expires=" + ExpiryDate.toGMTString(); \n document.cookie = CookieName + "=" + escape(CookieValue) + ExpiryDateString; \n } \n if (!GetCookie("mnm_sneak")) { \n SetCookie("mnm_sneak",1); \n } \n thecookie = GetCookie("mnm_sneak"); \n ch = "#";\nfunction new_send_chat (wut){\nif ((ch != "") && (document.getElementById("comment-input").value.charAt(0) != "#") && (document.getElementById("comment-input").value.charAt(0) != "!") && (document.getElementById("comment-input").value.charAt(0) != "|") && (document.getElementById("comment-input").value.charAt(0) != "@"))\n {\ndocument.getElementById("comment-input").value = ch + document.getElementById("comment-input").value;\n}\nif (document.getElementById("comment-input").value.charAt(0) == "|"){document.getElementById("comment-input").value = document.getElementById("comment-input").value.substring(1);}\n return send_chat(wut);\n}';
document.getElementsByTagName('head')[0].appendChild(js);

var new_form = document.createElement('form');
new_form.setAttribute('name', 'chat-form');
new_form.setAttribute('action', '');
new_form.setAttribute('onsubmit', 'return new_send_chat(this);');
new_form.innerHTML = 'mensaje: <input name="comment" onkeydown="return comment_kd(event);" id="comment-input" value="" size="90" maxlength="230" autocomplete="off" type="text">&nbsp;<input value="enviar" class="button" type="submit"> - <a title="Para prevenir que nuestros mensajes acaben en lugar erróneo, selecciona la pestaña por defecto que desees,a partir de ese momento, en próximos mensajes no deberás añadir símbolos extras (@ o #) y tus mensajes acabarán en la pestaña por defecto escogida, recuerda que en ese caso para escribir todos deberás usar el símbolo «\|»" style="cursor: help; text-size: 8px; color: rgb(255, 100, 0);">por defecto:</a> <select name="pestana" style="margin-left:5px;width:100px;" id="pestana" onchange="ch=document.getElementById(\'pestana\').value; SetCookie(\'mnm_sneak\',document.getElementById(\'pestana\').selectedIndex);"><option value="">todos</option><option value="@">amigos</option><option value="#">admin</option></select>';
fr_orig = document.getElementsByTagName('form')[2];
par = fr_orig.parentNode;
par.removeChild(fr_orig);
par.appendChild(new_form);

// Sí, esto puede ir en el mismo javascript de antes, está ahí por pereza :P

var js2 = document.createElement('script');
js2.setAttribute('id', 'new-send-chat');
js2.setAttribute('type', 'text/javascript');
js2.text = "comment_kd = (function(event) { \
            if(event.keyCode == 9 ||event.which == 9) {\
                event.returnValue = false;\
                event.preventDefault();\
                sneak_autocomplete();\
                return false;\
            } else {\
                return true;\
            }\
\
        }); ";
document.getElementsByTagName('head')[0].appendChild(js2);

var js3 = document.createElement('script');
js3.setAttribute('id','select-cookie-chat');
js3.setAttribute('type','text/javascript');
js3.text = 'document.getElementById("pestana").selectedIndex = GetCookie("mnm_sneak"); ch = document.getElementById("pestana").value;';
document.getElementsByTagName('body')[0].appendChild(js3);