// ==UserScript==
// @name           Estudiante Deusto
// @namespace      Estudiante
// @description    Identifica en UDWIFI
// @include        https://securelogin.arubanetworks.com/cgi-bin/login?cmd=*
// ==/UserScript==



window.document.getElementById('user').value = 'estudiante';

window.document.getElementById('password').value = 'estudiante';



document.forms[0].submit();