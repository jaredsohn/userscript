// ==UserScript==
// @name            ASMB Login
// @author          Galaxian
// @namespace       127.0.0.1
// @include         https://www.adultswim.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

$("#password").focus(function(){
    var username = $("#loginId").val().trim();
	var pass;
	var store = GM_getValue("ASLogin"+username);
	if(store == undefined){
		
	} else {
		$("#password").val(store);
	}
});

$("#password").keyup(function(event){
	if(event.keyCode == 13){     
		var username = $("#loginId").val().trim();
		var pass = $("#password").val();
		var store = GM_getValue("ASLogin"+username);
		if(store == undefined){
			GM_setValue("ASLogin"+username, pass);
		}
		unsafeWindow.checkLogin();
	}
});



