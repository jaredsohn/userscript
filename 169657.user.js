// ==UserScript==
// @name           Auto-login
// @author         Vladislavs Aleksandrovičs
// @include        https://id2.rtu.lv/openam/UI/Login?module=LDAP&locale=lv
// @version        1.1
// ==/UserScript==

$(document).ready(function() {

	var login = 'vards.uzvards',
	     pass = 'parole';

	$('input[id=IDToken1]').val(login);
	$('input[id=IDToken2]').val(pass);
});
