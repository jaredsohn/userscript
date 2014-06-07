// ==UserScript==
// @name            nusmods.com plugin
// @require       	http://code.jquery.com/jquery-1.10.2.min.js
// @description     Extend the features of nusmods.com
// @author          Jason Poh
// @icon            http://nusmods.com/favicon.ico
// @homepageURL     http://userscripts.org/scripts/show/176362
// @downloadURL     http://userscripts.org/scripts/source/176362.user.js
// @updateURL       http://userscripts.org/scripts/source/176362.meta.js
// @namespace       http://codeit.sg
// @version         1.1
// @include         http*://*.nusmods.com/*
// @include         http*://nusmods.com/*
// ==/UserScript==
//	GitHub
//	=============================================
//  https://github.com/JasonCodeIT/NusModsPlugin
//  =============================================

(function () {

	//Helpers
	$.fn.getHexBackgroundColor = function() {
	    var rgb = $(this).css('background-color');
	    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	    function hex(x) {return ("0" + parseInt(x).toString(16)).slice(-2);}
	    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}

	$.fn.getHexColor = function() {
	    var rgb = $(this).css('color');
	    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	    function hex(x) {return ("0" + parseInt(x).toString(16)).slice(-2);}
	    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}
	//Constants
	var exam_timetable_id = "exam-timetable";//id of exam timetable


	function addColorColumnToExamTimetable(){
		$("#"+exam_timetable_id+" tr:first").append("<th>Color</th>");
		$("#"+exam_timetable_id+" tr:not(:first)").append("<td class='color-box'>Change</td>");	
	}

	function registerColorBoxClickEvent(){
		$('.color-box').click(function(){
			var currentColor = $(this).parent().attr('class');
			var currentBgColorVal = $(this).parent().getHexBackgroundColor();
			var currentFontColorVal = $(this).parent().getHexColor();
			var newBgColorVal = prompt("New Background Color (http://www.colorpicker.com/)", currentBgColorVal);
			var newFontColorVal = prompt("New Font Color (http://www.colorpicker.com/)", currentFontColorVal);
			var stylesheet = document.styleSheets[0];
			stylesheet.insertRule("."+currentColor+" { background-color: "+newBgColorVal+"!important; color: "+newFontColorVal+"!important; }", 0);
		});
	}


	function main(){
		addColorColumnToExamTimetable();
		registerColorBoxClickEvent();

	}
	main();
})();