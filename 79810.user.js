// ==UserScript==
// @name           Khanwars autologin
// @namespace      http://userscripts.org/users/booraz
// @include        http://riteriai.draugas.lt/
// @version        1.0
// ==/UserScript==

var user = 'your username';	// enter your username
var pass = 'your password'; // enter your password
var world = '6';			// enter world number
	
window.addEventListener("load", function() { setTimeout(submitForm, 100); }, false);

function submitForm()
{
	document.getElementsByClassName('username')[0].value = user;
	document.getElementsByClassName('password')[0].value = pass;
	document.getElementById('world_selection').value = world;
	var c = document.getElementById('login_form');
	c.action = document.getElementById('worldLinks'+world).value + '/login2.php';
	c.submit();
}