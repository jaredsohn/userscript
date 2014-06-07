// ==UserScript==
// @namespace       ajorpheus
// @name            Airtel Speed on Demand 
// @require	    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description     Automatically upgrade speed to 2mbps for bangalore. For other cities, change the ip address below
// @include         http://203.145.184.22:8080/*
// ==/UserScript==
//Put the following three lines in privoxy's user.action file to make this site faster
//### Block all images for Airtel Speed on Demand #######
//{+block{Images on Airtel Speed on Demand}}
//203.145.184.22:8080/images/

$("document").ready(function(){
	// 'Click To Proceed' button
	$("form[name='IPLoginForm']").submit();

	// Select speed as 2048 and submit
	try{
		$("#idBoD-4-2048D").click();
	}catch(err){}
	$("form[action='/confirm.do']").submit();

	// Agree to terms and conditions
	$("form[action='/activate.do']").submit();
	
	// Click the 'Click Here' to activate your sod again
	//if($("a[href='services.do']").attr('href'))
	//	window.location.href = $("a[href='services.do']").attr('href');
});
