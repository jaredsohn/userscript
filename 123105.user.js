// ==UserScript==
// @name       Easy Youtube Login
// @namespace elmundobeek.blogspot.com
// @version    1.0
// @description  Enables you to quickly log into your Youtube Account
// @include    https://accounts.google.com/ServiceLoginAuth*
// @include    https://accounts.google.com/ServiceLogin?uilel=3&service=youtube*
// @copyright  elmundobeek.blogspot.com

// ==/UserScript==

var accounts = [
	//#### CONFIGURACION - EDITA LA INFORMACION DE ABAJO ####
	//EMAIL O USERNAME          CONTRASEÑA        NOMBRE
	['CUENTA_1@CARNE.COM', '000000000000000000', 'CUENTA 1'],
	['CUENTA_2@CARNE.COM',   '000000000000000000', 'CUENTA 2']

],

/*
Copyright 2011 elmundobeek.blogspot.com

#######ENGLISH######## Para español mirar mas abajo

This file is part of Easy Youtube Login.

Easy Youtube Login is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Easy Youtube Login is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Google Bar+.  If not, see <http://www.gnu.org/licenses/>.

######### ESPAÑOL #########

Este archivo forma parte de "Easy Youtube Login".

Easy Youtube Login es software gratis: usted puede redistribuirlo y / o modificar
bajo los términos de la Licencia Pública General de GNU según lo publicado por
la Free Software Foundation, ya sea la versión 3 de la Licencia, o
(a su elección) cualquier versión posterior.

Easy Youtube Login se distribuye con la esperanza de que sea útil,
pero SIN NINGUNA GARANTÍA, incluso sin la garantía implícita de
COMERCIALIZACIÓN O IDONEIDAD PARA UN PROPÓSITO PARTICULAR. ver el
GNU General Public License para más detalles.

Debería haber recibido una copia de la Licencia Pública General de GNU
junto con Easy Youtube Login. Si no es así, consulte <http://www.gnu.org/licenses/>.
*/

    loginForm = document.getElementById('gaia_loginform'),
    loginBox = document.createElement('div');

for (var b = 0; b < accounts.length; b++) loginBox.innerHTML += '<input type="submit" class="g-button g-button-submit" id="acc' + b + '" value="Iniciar sesión como: ' + accounts[b][2] + '">';
loginForm.appendChild(loginBox);
for (var d = 0; d < accounts.length; d++) e();

function e() {
	var a = d,
		c = document.getElementById("acc" + a);
	"function" == typeof GM_setValue ? c.addEventListener("click", function () {
		f(accounts[a][0], accounts[a][1])
	}, !1) : c.onclick = function () {
		f(accounts[a][0], accounts[a][1])
	}
}

function f(a, c) {
	var g = document.getElementById("Passwd");
	document.getElementById("Email").value = a;
	g.value = c
};