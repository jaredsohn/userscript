/* *****************

add 
@include example.com 
to run script on your page

***************** */

// ==UserScript==
// @name          Seafight autologin buttons
// @namespace     http://www.sand-box.pl/scripts/
// @description   Automatically fills up and submit login textboxes 
// @include       http://seafight.pl/*
// @include       http://www.seafight.pl/*
// @include       http://seafight.pl/
// @include       http://www.seafight.pl/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

/* ************************************************
*** logins and pws list
*** example:
*** 	
*** var loginNR = "login1";
*** var pwdNR = "pwd1";
*** where NR = button number	
************************************************ */

$(document).ready(function(){
	
// ***************************************
// ************ LOGINS I PASSWORDS ***********
// ***************************************

	var login1 = "login_first";
	var pwd1 = "pwd1";
	
	var login2 = "login2";
	var pwd2 = "pwd2";

	var login3 = "login3";
	var pwd3 = "pwd3";

	var login4 = "login4";
	var pwd4 = "pwd4";
	
	
//how much buttons?
	var ile_buttonow = 4;
	
// Let's create objects

//main container
	$('<div id="login-buttons-container"></div>').appendTo("body")
	.css({'position' : 'fixed' , 'left' : '10px' , 'top' : '15px' , 'text-align' : 'left' , 'width' : '250px'});
	
//hide/show bar
	$('<div id="login-buttons-controls"></div>').appendTo("#login-buttons-container");
	$('<input type="submit" id="login_buttons_hide" class="login-button font" value="Hide" id="ukryj" />').appendTo("#login-buttons-controls");
	$('<input type="submit" id="login_buttons_show" class="login-button font" value="Show" id="pokaz"  style="display:none" />').appendTo("#login-buttons-controls");
	
	
//buttons container
	$('<div id="login-buttons"></div>').appendTo("#login-buttons-container");
	
//buttons
	for(i=1; i<= ile_buttonow; i++){	
		$('<input type="submit" id="'+ i +'" class="login-button login-button-submit" value="L ' + eval(i) +'" />').appendTo("#login-buttons");
	};

//google font
	$('<link href="http://fonts.googleapis.com/css?family=Junge" rel="stylesheet" type="text/css">').appendTo("#login-buttons-container");
	
// simple css	
	$(".login-button").css({'width' : '45px' , 'font-size' : '0.77em' ,'font-family' : '\'Junge\', serif' , 'background' : '#222222' , 'border' : '2px solid #444444' , 'margin' : '1px' , 'color' : '#FDE966' , 'border-radius' : '3px' });
	$(".font").css({'font-weight' : 'bold'});
	
// automatically fill textboxes, submit button
	$(".login-button-submit").click (function () {	
		var ktory = $(this).attr("id");
		$("#loginForm_default_input_username").val(eval("login"+ktory));
		$("#loginForm_default_input_password").val(eval("pwd"+ktory));	
		$("#loginForm_default_loginButton").click();
	});	

// hide buttons
	$("#login_buttons_hide").click ( function() {
		$("#login-buttons").fadeOut("slow");
		$("#login_buttons_hide").hide();
		$("#login_buttons_show").show();
	});

// show buttons
	$("#login_buttons_show").click ( function() {
		$("#login-buttons").fadeIn("slow");
		$("#login_buttons_hide").show();
		$("#login_buttons_show").hide();
	});	
});
// end