// ==UserScript==
// @name        orf tvthek live activator
// @namespace   orf
// @include     *tvthek.orf.at/live/*
// @version     1
// @grant       none
// ==/UserScript==
	
	var live = document.getElementsByTagName('p');
	var text = live[0].innerHTML;
	var anfang = "Der Livestream beginnt um ";
	var ende = " Uhr";
	var uhrzeit = text.substring((text.indexOf(anfang)+anfang.length),text.indexOf(ende));
	var time = timenow();
	var myVar;
	
	if(time2minutes(uhrzeit) >= time2minutes(time)){
		var timediffernz = (time2minutes(uhrzeit) - time2minutes(time));
	}else{
		var timediffernz = (time2minutes("24:00") + time2minutes(uhrzeit) - time2minutes(time));
	}
	

	if(isNumber(timediffernz)){
		myVar = window.setInterval(function(){
			window.location.reload();
			window.clearInterval(myVar);
		},timediffernz);
	}
	/*returns the actual system time*/
	function timenow(){
		var now= new Date(),
		ampm= 'am',
		h= now.getHours(),
		m= now.getMinutes(),
		s= now.getSeconds();
		if(h<10) h= '0'+h;
		if(m<10) m= '0'+m;
		//if(s<10) s= '0'+s;
		return h+':'+m
	}
	/*returns true if n is a number else false*/
	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	/*convert any given time to minutes*/
	function time2minutes(n){
		var a = n.split(":");
		if(a.length == 2){
			var x = a[0]*60;
			var y = a[1]*1;
		}
		return ((x+y)*60000);
	}