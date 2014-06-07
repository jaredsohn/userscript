// ==UserScript==
// @name           Loguearme en PGP Me Hincha Las Pelotas
// @namespace      Market
// @description    Carga Usuario y Password Automaticamente en PGP
// @include        http://localhost/PGP/Login.aspx
// ==/UserScript==

var user = document.getElementById('txtUser_text');
var pass = document.getElementById('txtPassWord_text');

user.focus();
user.value  = 'Admin';

pass.focus();
pass.value  = 'admin';