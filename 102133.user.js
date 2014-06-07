// ==UserScript==
// @name           ujneptun
// @namespace      https://neptun3r.web.uni-corvinus.hu/*
// @description    Használd a Neptun.NET-et kényelmesebben!
// @include        https://neptun3r.web.uni-corvinus.hu/*
// ==/UserScript==


function fillLogin() {
var changeTTL = document.getElementById('lblModuleType');
var userField = document.getElementById('user');
var pwdField = document.getElementById('pwd');

var username = '';
var password = '';
	
	if (GM_getValue('user')) {
		username = GM_getValue('user');
		password = GM_getValue('pwd');
	}

	function nameChanged(event) {
			username = userField.value;
			GM_setValue('user', username);
	}
	function passChanged(event) {
			password = pwdField.value;
			GM_setValue('pwd', password);
	}
	userField.addEventListener("change", nameChanged, false);
	pwdField.addEventListener("change", passChanged, false);
	changeTTL.innerHTML = 'Hallgatói (GreaseMonkey)';
	userField.value = username;
	pwdField.value = password;
}
fillLogin();

var time;

						time = 0;
						$('#Submit').val( submitval + " (" + time/1000 + ")" );
						inter = setInterval(function(){interval_btn("set", submitval);}, 0);
						t = setTimeout("$('#Submit').click();",time);
					
