// ==UserScript==
// @name        TJBA-Seg Better Login
// @namespace   https://userscripts.org/users/231678
// @description Better Login for TJBA-Seg
// @include     http://10.0.10.20:10080/seg/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @version     1.1.2
// ==/UserScript==

main();

function main() {

	//============ HOME ===============
	if (document.URL.search(/\/home/) != -1) {

		$(".selectedSystem > a")[0].click();
	}

	//============ LOGIN ===============
	if (document.URL.search(/\/login/) != -1) {

		//SET HERE YOUR DEFAULT LOGIN
		var USER = "mag";
		var PASSWD = "123456";

		//SETUP
		$("#homeForm_usuario").val(USER);
		$("#homeForm_senha").val(PASSWD);


		//AUTOMATIC LOGOUT
		if ($(".botao_sair").size() > 0) {

			setTimeout(logout, 100);

		//CHANGE USER AND PRESS ENTER TO LOGIN IN
		} else {

			$("#homeForm_usuario").focus();

			attachUsuarioEnter();

			attachSenhaEnter();

		}
	}
}

function attachSenhaEnter() {
	$("#homeForm_senha").keydown(function(e) {
		if (e.which == 13) {
			login();
		}
	});
}

function attachUsuarioEnter() {
	$("#homeForm_usuario").keydown(function(e) {
		if (e.which == 13) {
			login();
		}
	});
}

function logout() {
	$(".botao_sair").click();
}

function login() {
	$("#homeForm_login").click();
}