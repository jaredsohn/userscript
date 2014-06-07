// ==UserScript==
// @name          Google Maps Multi-Line Inputs
// @namespace     http://waytoocrowded.com/
// @description	  Creates textareas to paste multiline addesses into Google Maps
// @include       http://maps.google.tld/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us, etc.)

// Author		  Paul Farning
// URL			  http://www.waytoocrowded.com/2006/06/29/google-maps-multiple-line-inputs/
// Created		  06/29/06
// Updated		  01/29/08

if (document.getElementById('q_form')) {
	
	if (document.getElementById('q_d')) {
	
		var theinput = document.getElementById('q_d');
	
		var thetextarea = document.createElement('textarea');      
		thetextarea.setAttribute('id','q_d');
		thetextarea.setAttribute('name','q');         
		thetextarea.setAttribute('tabindex','1');
		thetextarea.setAttribute('cols','15');
	
		var td = theinput.parentNode;
		td.replaceChild(thetextarea,theinput);
		
		document.getElementById('q_d').focus();
	}

}

if (document.getElementById('d_form')) {
	
	if (document.getElementById('d_d')) {
	
		var theinput = document.getElementById('d_d');
	
		var thetextarea = document.createElement('textarea');      
		thetextarea.setAttribute('id','d_d');
		thetextarea.setAttribute('name','saddr');         
		thetextarea.setAttribute('tabindex','5');
		thetextarea.setAttribute('cols','25');
	
		var td = theinput.parentNode;
		td.replaceChild(thetextarea,theinput);

	}

	if (document.getElementById('d_daddr')) {
	
		var theinput = document.getElementById('d_daddr');
	
		var thetextarea = document.createElement('textarea');      
		thetextarea.setAttribute('id','d_daddr');
		thetextarea.setAttribute('name','daddr');         
		thetextarea.setAttribute('tabindex','6');
		thetextarea.setAttribute('cols','25');
	
		var td = theinput.parentNode;
		td.replaceChild(thetextarea,theinput);

	}

}