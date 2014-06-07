// ==UserScript==
// @name           Multiple Uploads Peach
// @namespace      www.userscripts.org
// @description    Voegt de mogelijkheid meerdere bestanden in een keer te uploaden toe bij het inleveren op Peach3.
// @include        http://peach.win.tue.nl/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

var ADD_DUTCH = 'Voeg toe';
var ADD_MULT_DUTCH = 'Voeg een of meerdere toe';
var ADD_ENGLISH = 'Add';
var ADD_MULT_ENGLISH = 'Add one or more';
var CANCEL_DUTCH = 'Annuleren';
var CANCEL_ENGLISH = 'Cancel';

setInterval(function() {
  // Voeg 'multiple' attribuut toe aan file input
  // Add 'multiple' attribute to file input
  var fileInput = $("input").filter(function() {
	return $(this).attr('name') == 'file';
  });
  if (fileInput.size() > 0) {
	fileInput.each(function() {
	  $(this).attr('multiple', 'multiple');
	  // Maak venstertje iets breder
	  // Widen screen a bit to fit file input in it
	  $(this).parent().parent().css('width', (parseInt($(this).parent().parent().css('width')) + 30) + 'px');
	});
  }
  
  // Verander tekst van submit knop
  // Change text of submit button
  var submitBtnTd = $("td").filter(function() {
	var html = $(this).find("button").first().html();
	var nextHtml = $(this).next().find("button").first().html();
	return ((html == ADD_DUTCH || html == ADD_MULT_DUTCH) && nextHtml == CANCEL_DUTCH) ||
		   ((html == ADD_ENGLISH || html == ADD_MULT_ENGLISH) && nextHtml == CANCEL_ENGLISH);
  });
  if (submitBtnTd.size() > 0) {
	submitBtnTd.each(function() {
	  var html = $(this).find("button").first().html();
	  var newHtml = ADD_MULT_ENGLISH;
	  if (html == ADD_DUTCH || html == ADD_MULT_DUTCH) {
		newHtml = ADD_MULT_DUTCH;
	  }
	  $(this).find("button").first().html(newHtml);
	});
  }
}, 1000);