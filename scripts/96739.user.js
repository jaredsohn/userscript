//
// ==UserScript==
// @name          Wall Board
// @namespace     namespace
// @description   increases visibilty on wallboard
// @include       http://navqtc/clmonline3/*
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


$('#DetailsView1 tr:eq(1)').css({"color":"green",
							"font-size":"larger"
						});

$('#DetailsView1 tr:eq(2)').css({"color":"green ",
							"font-size":"larger"
						});

var fontColor;


var subDate = $('#dvProduct tr:eq(5)').find("td:last").html();
var actualDate = new Date(subDate);
var todaysDate = new Date();

if (actualDate < todaysDate) {
		fontColor = 'red';
	} else {
		fontColor = 'green';
	}

$('#dvProduct tr:eq(5)').css({"color":fontColor,
							"font-size":"larger"
						});
$('#ddProducts option:contains(*)').append('*************');