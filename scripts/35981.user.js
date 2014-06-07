// ==UserScript==
// @name           Desplegable failsafe
// @namespace      http://meneame.net/sneak.php
// @description    Pos eso, pa la fisgona de menéame
// @include        http://meneame.net/sneak.php
// ==/UserScript==

var js = document.createElement('script');
js.setAttribute('id', 'new-send-chat');
js.setAttribute('type', 'text/javascript');
js.text = 'ch = "#";\nfunction new_send_chat (wut){\nif ((ch != "") && (document.getElementById("comment-input").value.charAt(0) != "#") && (document.getElementById("comment-input").value.charAt(0) != "!") && (document.getElementById("comment-input").value.charAt(0) != "|") && (document.getElementById("comment-input").value.charAt(0) != "@"))\n {\ndocument.getElementById("comment-input").value = ch + document.getElementById("comment-input").value;\n}\nif (document.getElementById("comment-input").value.charAt(0) == "|"){document.getElementById("comment-input").value = document.getElementById("comment-input").value.substring(1);}\n return send_chat(wut);\n}';
document.getElementsByTagName('head')[0].appendChild(js);

var new_form = document.createElement('form');
new_form.setAttribute('name', 'chat-form');
new_form.setAttribute('action', '');
new_form.setAttribute('onsubmit', 'return new_send_chat(this);');
new_form.innerHTML = 'mensaje:&nbsp;<input name="comment" onkeydown="return comment_kd(event);" id="comment-input" value="" size="80" maxlength="230" autocomplete="off" type="text">&nbsp;<input value="enviar" class="button" type="submit"><select name="pestana" style="margin-left:5px;width:100px;" id="pestana" onchange="ch=document.getElementById(\'pestana\').value;"><option value="">todos</option><option value="@">amigos</option><option value="#" selected="admin">admin</option></select>';
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
