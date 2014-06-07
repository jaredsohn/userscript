// ==UserScript==
// @name           Estudiante Deusto
// @namespace      Estudiante
// @description    Identifica en UDWIFI
// @include       https://oawl-securelogin.deusto.es/cgi-bin/*
// ==/UserScript==



window.document.getElementById('user').value = 'estudiante';

window.document.getElementById('password').value = 'estudiante';



document.forms[0].submit();
