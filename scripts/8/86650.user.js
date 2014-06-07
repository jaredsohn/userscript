// ==UserScript==
// @name           Evitar sitio principal de Yahoo al salir del Correo Yahoo!
// @description    Evita que te redirija a la página principal de Yahoo al cerrar la sesión del correo, Basado en el script http://userscripts.org/scripts/review/12964 
// @include        http://*.*.mail.yahoo.com/*
// ==/UserScript==


for (var i = 0; i < document.links.length; i++) {
  if (document.links[i].innerHTML == 'Sign Out') {
    document.links[i].setAttribute ('href', 'http://login.yahoo.com/config/login?logout=1&.src=ym&.intl=us&.direct=2&.done=http://es.mail.yahoo.com'); break;
  }
}

document.getElementById("_test_sign_out").setAttribute ('onclick', 'location.href = \"http://login.yahoo.com/config/login?logout=1&.src=cdgm&.intl=us&.direct=2&.done=http://es.mail.yahoo.com\"');