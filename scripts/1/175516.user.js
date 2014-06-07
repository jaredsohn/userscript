// ==UserScript==
// @name        Random_Script96
// @namespace   http://userscripts.org/users/527858
//@require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @description Complete SOC's with ease.
// @include     https://metime.mcdonalds.com.au/sections/activity/socLauncher.cfm
// @version     1
// ==/UserScript==
$(document).ready(function(){
	$('.sectionTitle').append("<button class='filloutForm'>Fill Out Form</button>");
	$('.filloutForm').click(function(e){
	    e.preventDefault();
	});
	$('.filloutForm').css({
	    "margin-left": "auto", 
	    "margin-right": "auto", 
	    "display": "block",
	    "width": "150px", 
	    "text-align": "center",
	    "color": "#fff",
	    "background-color": "#91bd09",
	    "text-decoration": "none",
	    "-moz-border-radius": "6px",
	    "-moz-box-shadow": "0 1px 3px rgba(0,0,0,0.6)",
	    "text-shadow": "0 -1px 1px rgba(0,0,0,0.25)",
	    "border-bottom": "1px solid rgba(0,0,0,0.25)",
	    "position": "relative",
	    "cursor": "pointer",
	    "padding-top": "5px",
	    "padding-bottom": "6px",
	    "padding-left": "10px",
	    "padding-right": "10px"
	});

	$('.filloutForm').click(function() {
		var feedback= prompt("Please Enter Your Feedback Text:","");
		var opportunities= prompt("Please Enter Your Opportunities Text (if applicable):","");
		
		$('input:radio[value="1088"]').attr('checked', true);
		$('input:radio[value="6"]').attr('checked', true);
		$('textarea').val(feedback);
		$('#field_282').val(opportunities); //B INITIATOR ASSEMBLER
		$('#field_285').val(opportunities); //R GRILL FRIED
		$('#field_1113').val(opportunities);
		$('#field_793').val(opportunities); // DELI PREP
		$('#field_247').val(opportunities); //BFAST GRILL FRIED
	});
});