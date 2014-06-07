// ==UserScript==
// @name           phpmyadmin
// @namespace      http://userscripts.org/scripts/show/61590
// @description    manda un request cada 5 mins para q no timeoutee la sesion. tb se autologinea
// @probando       esta es una prueba
// @include        *phpmyadmin*
// ==/UserScript==

if(document.forms[1].name == 'login_form' && document.getElementById('input_password').value) document.forms[1].submit();
else setTimeout(keepalive, 300000);

function keepalive(){
	var x = new XMLHttpRequest();
	x.onreadystatechange=function(){
		if (x.readyState == 4 && x.status == 200){
			setTimeout(keepalive, 300000);
		}
	};
	x.open('GET', document.URL.match(/^.+\/phpmyadmin\//i)[0], true);
	x.send(null);
}