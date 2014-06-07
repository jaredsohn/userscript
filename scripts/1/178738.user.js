// ==UserScript==
// @name        Highlight Rows
// @namespace   http://*
// @description Highlight rows in tables
// @include     http://192.168.200.7:8085/*
// @version     5
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant  GM_addStyle
// ==/UserScript==
// Append some text to the element with id someText using the jQuery library.

var $highlightColor = "#FFFF00"

GM_addStyle(".myH { background:"+ $highlightColor +"}");

function rgb2hex(rgb){
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
}


 $(".a").css( "background-color","#f0f0f0" );
 $(".a").removeClass("a");


// Invoices Page
var holder;
var haver;
$(".dt tr").not(':first').hover(
  function () {
	if( $(this).css("background-color") != $highlightColor){
		holder = $(this).css("background-color");
	}
    $(this).css("background-color",$highlightColor);
  }, 
  function () {



	if( rgb2hex( $(this).css("background-color") ).toUpperCase() == $highlightColor ){

		$(this).css("background-color", holder); 
	}
	else{
		
	}
	holder = "orange";
	}
);





var $pageToggle
// find out if there is only one page
if( $("#body_GridView1 tr:last-of-type").css("background-color") == "rgb(102, 102, 102)" ){
	$pageToggle = ", :last-of-type"
}
else{
	$pageToggle = ""
}


// Compliance Report
var holder;
$("#body_GridView1 tr").not(':first'+$pageToggle).hover(
  function () {
	if( $(this).css("background-color") != $highlightColor){
		holder = $(this).css("background-color");
	}
    $(this).css("background-color",$highlightColor);
  }, 
  function () {
   $(this).css("background-color", holder); 
   holder = "orange";
   }
 );
  
  
  
  
  
 $(".ts").css({ "font-size": "8pt", "border-top": "1px solid #808080", "border-left": "1px solid #808080", "font-family": "tahoma" });
 $(".ts").removeClass("ts");
 
// Agreement Page

$("#incentive tr td").not(':first').hover(
  function () {
   var idx = $(this).parent().children("td").index( $(this))+1;
   var rdx = $(this).parent().parent().children("tr").length;
	$(this).parent().parent().find('td:nth-child('+idx+')').css("background",$highlightColor);
	if(rdx>2) $(this).parent().children('td').css("background",$highlightColor);
  }, 
  function () {
   var idx = $(this).parent().children("td").index( $(this))+1;
   var rdx = $(this).parent().parent().children("tr").length;
	$(this).parent().parent().find('td:nth-child('+idx+')').css("background","");
	if(rdx>2) $(this).parent().children('td').css("background","");
  }
);
 