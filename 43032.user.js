// ==UserScript==
// @name           LoginAutomatico
// @author         ToNet
// @description    Rellenaria los datos del login de la pagina personalizada de la UMH, cambiar TuDNI y TuPASS por tus datos personales	
// @include        http://umh.es/perfil/est/default.asp
// @include        http://umh.es/frame.asp?url=/perfil/est/default.asp
// @include        http://umh.es/identificado/logon.asp
// @include        http://umh.es/identificado/est/
// @version        1.0.0
// ==/UserScript==

var X='TuDNI'
var Y='TuPASS'

document.forms[0].elements[0].value = X
document.forms[0].elements[1].value = Y
document.forms[0].submit()