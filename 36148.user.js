// ==UserScript==
// @name           LightSneak 1.1
// @namespace      fisgona
// @description    REQUIERE ESTILO DE POSVASOS: http://posavasos.googlepages.com/estilo-alternativo-meneame.html - altera la fisgona para hacerla más usable - screen: http://www.fileclick.eu/cache/7457/imagen%202.png)
// @include        http://meneame.net/sneak.php
// ==/UserScript==


navigation_menu = "<li class=\"first\"><a href=\"/\">portada</a></li>&nbsp;<li class=\"second\"><a href=\"/shakeit.php\">pendientes</a></li>&nbsp;<li class=\"third\"><a href=\"/submit.php\">Enviar noticia</a></li>&nbsp;<li class=\"fourth\"><a href=\"/notame/\">nótame</a></li>";
css_margin = "body{margin-top:-120px;} #footthingy,#stdcompliance{display:none;}";
buttons = "<input type=\"text\" name=\"comment\" id=\"comment-input\" value=\"\" size=\"90\" maxlength=\"230\" autocomplete=\"off\" />&nbsp;<input type=\"submit\" value=\"enviar\" class=\"button\" onclick=\"document.getElementById('comment-input').focus();\"/>&nbsp;<input value=\"enviar por amigos\" class=\"button\" type=\"submit\" onclick=\"if(document.getElementById('comment-input').value.length > 3){document.getElementById('comment-input').value='@'+document.getElementById('comment-input').value;}document.getElementById('comment-input').focus();\">";
url = document.location.href;
GM_addStyle(css_margin);
document.getElementById("navigation").innerHTML = navigation_menu;
if(!url.match('friends')) document.getElementsByName("chat_form")[0].innerHTML = buttons;
document.getElementById('comment-input').focus();