// ==UserScript==
// @name           Khanwars 3.0 autologin
// @namespace      http://userscripts.org/users/booraz
// @include        http://*khanwars.com*
// @version        1.0
// ==/UserScript==

var user = 'username';          // enter your username
var pass = 'password';         // enter your password
var world = 'worldnumber';            // enter world number

window.addEventListener("load", function() { setTimeout(submitForm, 200); }, false);

function submitForm()
{
	document.getElementById('logUser').value = user;
	document.getElementById('logPass').value = pass;
	var d = document.getElementById('world_selection');
	for (i=0;i<d.length;i++) {
		if (d[i].text == 'World '+world) {
			d.value = d[i].value;
			world = d[i].value;
		}
	}
	var c = document.getElementById('login_form');
	c.action = document.getElementById('worldLinks'+world).value + '/login2.php';
	c.submit();
}